<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" class="card-custom">
            <template #header>
              <div class="d-flex w-100 justify-content-between align-items-center py-3">
                <div class="d-flex align-items-start flex-column">
                  <h3 class="mb-2 font-weight-bolder text-dark">
                    <i class="ri-wallet-3-line mr-2 text-primary"></i>
                    Pembayaran Pembelian
                  </h3>
                  <span class="text-muted font-size-sm">Manajemen Pembayaran Pembelian Farmasi</span>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center mr-4">
                    <div class="bullet bullet-bar bg-success align-self-stretch mr-2"></div>
                    <span class="text-success font-weight-bold font-size-sm">{{ items.length }} Transaksi</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="bullet bullet-bar bg-warning align-self-stretch mr-2"></div>
                    <span class="text-warning font-weight-bold font-size-sm">{{ formatRupiah(sisa_pembayaran) }} Sisa</span>
                  </div>
                </div>
              </div>
            </template>
            <!-- Form Section -->
            <div class="card-body pt-0">
              <form @submit.prevent="simpan">
                <!-- First Row -->
                <div class="row">
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="pembelian" class="font-weight-bold text-dark mb-2">
                      <i class="ri-file-list-3-line mr-1"></i>
                      No. Faktur
                    </label>
                    <multiselect
                      id="pembelian"
                      v-model="data.pembelian"
                      :options="list_pembelian"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="no_faktur"
                      track-by="pembelian_id"
                      @input="listPembayaranByPembelianId(data.pembelian.pembelian_id)"
                      :class="{'is-invalid': checkValidasi('pembelian').s === false}"
                      placeholder="Pilih No. Pembelian"
                      class="multiselect-solid"
                    ></multiselect>
                    <div class="invalid-feedback d-block" v-if="checkValidasi('pembelian').s === false">
                      {{ checkValidasi('pembelian').m }}
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="no_transaksi" class="font-weight-bold text-dark mb-2">
                      <i class="ri-hashtag mr-1"></i>
                      No. Transaksi
                    </label>
                    <b-form-input
                      id="no_transaksi"
                      v-model="data.no_transaksi"
                      type="text"
                      :state="checkValidasi('no_transaksi').s"
                      class="form-control-solid"
                      placeholder="Masukkan No. Transaksi"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                      {{ checkValidasi('no_transaksi').m }}
                    </b-form-invalid-feedback>
                  </b-col>
                </div>

                <!-- Second Row -->
                <div class="row">
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="tanggal" class="font-weight-bold text-dark mb-2">
                      <i class="ri-calendar-line mr-1"></i>
                      Tanggal Pembayaran
                    </label>
                    <date-picker
                      id="tanggal"
                      style="width: 100%"
                      format="YYYY-MM-DD"
                      v-model="data.tanggal_pembayaran"
                      :placeholder="tanggal_pembayaran_ph"
                      class="form-control-solid"
                    ></date-picker>
                  </b-col>
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="tipe_bayar" class="font-weight-bold text-dark mb-2">
                      <i class="ri-bank-card-line mr-1"></i>
                      Tipe Pembayaran
                    </label>
                    <b-form-select
                      id="tipe_bayar"
                      v-model="data.tipe_bayar"
                      :options="optionsPembayaran"
                      class="form-control-solid"
                    ></b-form-select>
                  </b-col>
                </div>

                <!-- Payment Method Details (Conditional) -->
                <div v-if="data.tipe_bayar == 2" class="row mb-4">
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="tipe_kartu" class="font-weight-bold text-dark mb-2">
                      <i class="ri-bank-card-2-line mr-1"></i>
                      Tipe Kartu
                    </label>
                    <b-form-select
                      id="tipe_kartu"
                      v-model="data.tipe_kartu"
                      :options="optionsKartu"
                      :state="checkValidasi('tipe_kartu').s"
                      class="form-control-solid"
                    ></b-form-select>
                    <b-form-invalid-feedback>
                      {{ checkValidasi('tipe_kartu').m }}
                    </b-form-invalid-feedback>
                  </b-col>
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="no_kartu" class="font-weight-bold text-dark mb-2">
                      <i class="ri-credit-card-line mr-1"></i>
                      No. Kartu
                    </label>
                    <b-form-input
                      id="no_kartu"
                      v-model="data.no_kartu"
                      type="number"
                      :state="checkValidasi('no_kartu').s"
                      class="form-control-solid"
                      placeholder="Masukkan No. Kartu"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                      {{ checkValidasi('no_kartu').m }}
                    </b-form-invalid-feedback>
                  </b-col>
                </div>

                <!-- Third Row -->
                <div class="row">
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="kas" class="font-weight-bold text-dark mb-2">
                      <i class="ri-safe-2-line mr-1"></i>
                      Kas
                    </label>
                    <multiselect
                      id="kas"
                      v-model="data.kas"
                      :options="list_kas"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="name"
                      track-by="id"
                      placeholder="Pilih Kas"
                      :class="{'is-invalid': checkValidasi('kas').s === false}"
                      class="multiselect-solid"
                    ></multiselect>
                    <div class="invalid-feedback d-block" v-if="checkValidasi('kas').s === false">
                      {{ checkValidasi('kas').m }}
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" lg="6" class="mb-4">
                    <label for="jumlah_bayar" class="font-weight-bold text-dark mb-2">
                      <i class="ri-money-dollar-circle-line mr-1"></i>
                      Jumlah Pembayaran
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-primary text-white">
                          <i class="ri-money-dollar-circle-line"></i>
                        </span>
                      </div>
                      <b-form-input
                        id="jumlah_bayar"
                        type="number"
                        v-model="data.jumlah_bayar"
                        :state="checkValidasi('jumlah_bayar').s"
                        @input="setPembayaran()"
                        class="form-control-solid border-left-0"
                        placeholder="0"
                      ></b-form-input>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                      <small class="text-muted">Format: {{ $numberFormat(data.jumlah_bayar, 'idr') }}</small>
                      <b-form-invalid-feedback class="d-block">
                        {{ checkValidasi('jumlah_bayar').m }}
                      </b-form-invalid-feedback>
                    </div>
                  </b-col>
                </div>

                <!-- Form Actions -->
                <div class="d-flex justify-content-end mt-6">
                  <b-button
                    type="submit"
                    variant="primary"
                    class="btn p-0 px-3"
                    v-b-tooltip.hover
                    title="Proses Pembayaran"
                  >
                    <i class="ri-save-line mr-2"></i>
                    Simpan Pembayaran
                  </b-button>
                </div>
              </form>
            </div>
            <!-- Payment Summary Section -->
            <div class="card-body bg-light rounded mb-6">
              <div class="d-flex align-items-center mb-4">
                <i class="ri-bar-chart-2-line text-primary font-size-h4 mr-3"></i>
                <h5 class="mb-0 font-weight-bolder text-dark">Ringkasan Pembayaran</h5>
              </div>

              <div class="row">
                <b-col cols="12" md="4" class="mb-4">
                  <div class="card card-custom bg-white border-0 shadow-sm">
                    <div class="card-body p-4">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="text-dark-75 font-weight-bold font-size-h6 mb-1">Total Pembelian</div>
                          <div class="text-primary font-weight-bolder font-size-h4">
                            Rp {{ total_pembelian }}
                          </div>
                        </div>
                        <div class="bg-light-primary rounded p-3">
                          <i class="ri-shopping-cart-line text-primary font-size-h3"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>

                <b-col cols="12" md="4" class="mb-4">
                  <div class="card card-custom bg-white border-0 shadow-sm">
                    <div class="card-body p-4">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="text-dark-75 font-weight-bold font-size-h6 mb-1">Total Pembayaran</div>
                          <div class="text-success font-weight-bolder font-size-h4">
                            Rp {{ total_pembayaran }}
                          </div>
                        </div>
                        <div class="bg-light-success rounded p-3">
                          <i class="ri-check-double-line text-success font-size-h3"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>

                <b-col cols="12" md="4" class="mb-4">
                  <div class="card card-custom bg-white border-0 shadow-sm">
                    <div class="card-body p-4">
                      <div class="d-flex align-items-center justify-content-between">
                        <div>
                          <div class="text-dark-75 font-weight-bold font-size-h6 mb-1">Sisa Pembayaran</div>
                          <div class="text-warning font-weight-bolder font-size-h4">
                            Rp {{ sisa_pembayaran }}
                          </div>
                        </div>
                        <div class="bg-light-warning rounded p-3">
                          <i class="ri-exchange-line text-warning font-size-h3"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>
              </div>
            </div>
            <!-- Payment History Section -->
            <div class="card-body pt-0">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="d-flex align-items-center">
                  <i class="ri-history-line text-primary font-size-h4 mr-3"></i>
                  <h5 class="mb-0 font-weight-bolder text-dark">Riwayat Pembayaran</h5>
                </div>
                <div class="text-muted font-size-sm">
                  <i class="ri-information-line mr-1"></i>
                  Menampilkan {{ items.length }} transaksi
                </div>
              </div>

              <div class="table-responsive">
                <b-table
                  :items="items"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  responsive
                  show-empty
                  hover
                  :busy="tableBusy"
                  class="table table-head-custom table-vertical-center"
                >
                  <!-- Empty State -->
                  <template #empty>
                    <div class="text-center py-8">
                      <div class="mb-4">
                        <i class="ri-inbox-line font-size-h4 text-muted"></i>
                      </div>
                      <h5 class="font-weight-bolder text-dark mb-2">Belum Ada Pembayaran</h5>
                      <p class="text-muted">Belum ada riwayat pembayaran untuk pembelian ini</p>
                    </div>
                  </template>

                  <!-- Custom Cell Formatting -->
                  <template #cell(no)="data">
                    <div class="text-center">
                      <span class="font-weight-bolder text-muted">{{ data.item.no }}</span>
                    </div>
                  </template>

                  <template #cell(no_faktur)="data">
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-40 symbol-light-primary mr-3">
                        <div class="symbol-label">
                          <i class="ri-file-list-3-line text-primary"></i>
                        </div>
                      </div>
                      <div>
                        <div class="font-weight-bold text-dark">{{ data.item.no_faktur }}</div>
                        <div class="text-muted font-size-sm">ID: {{ data.item.pembayaran_pembelian_id }}</div>
                      </div>
                    </div>
                  </template>

                  <template #cell(nama_supplier)="data">
                    <div class="font-weight-bolder text-dark">
                      {{ data.item.nama_supplier }}
                    </div>
                  </template>

                  <template #cell(tanggal)="data">
                    <div class="d-flex align-items-center">
                      <i class="ri-calendar-check-line text-muted mr-2"></i>
                      <div>
                        <div class="font-weight-bold text-dark">{{ data.item.tanggal }}</div>
                        <div class="text-muted font-size-sm">{{ getTimeFormat(data.item.tanggal_pembayaran) }}</div>
                      </div>
                    </div>
                  </template>

                  <template #cell(jumlah_bayar)="data">
                    <div class="d-flex align-items-center">
                      <div class="bg-light-success rounded p-2 mr-3">
                        <i class="ri-money-dollar-circle-line text-success"></i>
                      </div>
                      <div>
                        <div class="font-weight-bolder text-success">Rp {{ data.item.jumlah_bayar }}</div>
                      </div>
                    </div>
                  </template>

                  <template #cell(tipeBayar)="data">
                    <span
                      v-if="data.item.tipe_bayar == 1"
                      class="badge badge-primary badge-pill px-4 py-2 font-weight-bold"
                    >
                      <i class="ri-money-dollar-circle-line mr-1"></i>
                      {{ data.item.tipeBayar }}
                    </span>
                    <span
                      v-else-if="data.item.tipe_bayar == 2"
                      class="badge badge-info badge-pill px-4 py-2 font-weight-bold"
                    >
                      <i class="ri-bank-card-line mr-1"></i>
                      {{ data.item.tipeBayar }}
                    </span>
                    <span
                      v-else
                      class="badge badge-warning badge-pill px-4 py-2 font-weight-bold"
                    >
                      <i class="ri-exchange-line mr-1"></i>
                      {{ data.item.tipeBayar }}
                    </span>
                  </template>

                  <template #cell(actions)="data">
                    <div class="d-flex justify-content-center">
                      <b-button
                        @click="hapusTagihan(data)"
                        variant="danger"
                        size="sm"
                        class="btn-icon p-2"
                        v-b-tooltip.hover
                        title="H Pembayaran"
                      >
                        <i class="ri-delete-bin-6-line font-size-lg"></i>
                      </b-button>
                    </div>
                  </template>
                </b-table>
              </div>

              <!-- Pagination -->
              <div class="d-flex flex-wrap justify-content-between align-items-center mt-6">
                <div class="text-muted font-size-sm">
                  Menampilkan {{ items.length }} dari {{ totalRows }} data
                </div>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="right"
                  first-number
                  last-number
                  class="mb-0"
                >
                  <template #first-text>
                    <i class="ri-skip-back-line"></i>
                  </template>
                  <template #prev-text>
                    <i class="ri-arrow-left-s-line"></i>
                  </template>
                  <template #next-text>
                    <i class="ri-arrow-right-s-line"></i>
                  </template>
                  <template #last-text>
                    <i class="ri-skip-forward-line"></i>
                  </template>
                </b-pagination>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
  
<script>
    const numeral = require("numeral")
    import _ from "lodash"
    import axios from "axios";
    import { ipBackend } from "@/ipBackend";
    import Multiselect from "vue-multiselect";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
    import moment from "moment"
    import { required } from "vuelidate/lib/validators";
    import useVuelidate from '@vuelidate/core';
    moment.locale("ID")
    export default {
      components: {
        Multiselect,
        DatePicker,
      },
      name: "pembayaran",
      setup() { return { v$: useVuelidate({ $lazy: true, $autoDirty: true }) } },
      data() {
        return {
          gudang: "",
          isKartu: false,
          showError: false,
          list_kas: [],
          list_pembelian: [],
          total_pembayaran: 0,
          total_pembelian: 0,
          totalPembayaran: 0,
          totalPembelian: 0,
          sisa_pembayaran: 0,
          tanggal_pembayaran_ph: "",
          data: {
            tanggal_pembayaran: null,
            jumlah_bayar: 0,
            tipe_bayar: "1",
            tipe_kartu: null,
            no_kartu: null,
            no_transaksi: "",
            kas_id: "",
            pembelian_id: "",
            pembelian: "",
            kas: "",
          },
          optionsPembayaran: [
            {value: 1, text: "Tunai"},
            {value: 2, text: "Debet / Kredit"},
            // {value: 3, text: "Client / Clientas"},
          ],
          optionsKartu: [
            {value: 1, text: "Debet"},
            {value: 2, text: "Kredit"},
          ],
          fields: [
            {
              key: "no",
              label: "No",
              sortable: false,
              thClass: "text-center font-weight-bolder text-dark",
              tdClass: "text-center align-middle",
            },
            {
              key: "no_faktur",
              label: "No. Faktur",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "nama_supplier",
              label: "Supplier",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "tanggal",
              label: "Tanggal & Waktu",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "jumlah_bayar",
              label: "Jumlah Bayar",
              sortable: true,
              thClass: "font-weight-bolder text-dark text-right",
              tdClass: "align-middle text-right",
            },
            {
              key: "tipeBayar",
              label: "Metode",
              sortable: true,
              thClass: "font-weight-bolder text-dark text-center",
              tdClass: "align-middle text-center",
            },
            {
              key: "actions",
              label: "Aksi",
              thClass: "text-center font-weight-bolder text-dark",
              tdClass: "align-middle text-center",
            },
          ],
          items: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,
          filter: null,
          filterOn: [],
          tableBusy: false,
        };
      },
    computed: {
        formString() {
        return JSON.stringify(this.data, null, 4);
        },
        isValid() {
        return !this.v$.data.$invalid;
        },
        isDirty() {
        return this.v$.data.$anyDirty;
        },
    },
    validations: {
        data: {
            kas: {required},
            pembelian: {required},
            no_transaksi: {required},
            jumlah_bayar: {required},
            no_kartu: {
              required: function() {
                return this.data.tipe_bayar != 2 ? true : this.data.no_kartu ? true : false
              }
            },
            tipe_kartu: {
              required: function() {
                return this.data.tipe_bayar != 2 ? true : this.data.tipe_kartu ? true : false
              }
            },
        },
    },
    watch: {
      // 'data.jumlah_bayar'(newVal, oldVal){
      //   if(newVal != oldVal){
      //     const vm = this
      //     console.log('jalan', vm.data)
      //     if(vm.data.jumlah_bayar > vm.totalPembelian - vm.totalPembayaran) {
      //       vm.data.jumlah_bayar = vm.totalPembelian - vm.totalPembayaran
      //     }
      //   }
      // },
    },
      mounted() {

        // Set the initial number of items
        this.totalRows = this.items.length;
        this.getDatas();
      },
      methods: {
        formater(value){
            let x = numeral(value).format('0,0')
            return value == '0' ? '' : x
        },
        async setPembayaran() {
          const vm = this
          await new Promise(resolve => setTimeout(resolve, 1));
          console.log('jalan', vm.data)
          if(vm.data.jumlah_bayar > vm.totalPembelian - vm.totalPembayaran) {
            vm.data.jumlah_bayar = vm.totalPembelian - vm.totalPembayaran
          }
        },
        async getDatas() {
          let vm = this
          
          vm.data.tanggal_pembayaran = moment(new Date()).format("YYYY-MM-DD HH:mm")
          vm.tanggal_pembayaran_ph = moment(new Date()).format("YYYY-MM-DD HH:mm")
          let list_kas = await this.$_api.post(ipBackend + "/kas/list");
          vm.list_kas = list_kas.status == 200 ? list_kas.data.map(x => { return x }) : []
          
          let list_pembelian = await this.$_api.post(ipBackend + "/pembelian/listClosedPembelian");
          vm.list_pembelian = list_pembelian.status == 200 ? list_pembelian.data.map(x => { return x }) : []

          console.log(vm.list_pembelian, 'pembelian');
          console.log(vm.list_kas, 'kas');
        },
        
        listPembayaranByPembelianId(id){
            let vm = this
            console.log(id, 'ini id');
            vm.data.pembelian_id = id
            this.$_api.post(ipBackend + "/pembayaranPembelian/listPembayaranByPembelianId", {pembelian_id : id})
            .then((res) => {
                console.log('pembayaranPembelian/listPembayaranByPembelianId', res);
                vm.totalPembayaran = 0
                vm.items = res.data
                vm.total_pembelian = numeral(res.total_pembelian).format("0,0.00")
                console.log('total_pembelian', vm.total_pembelian)
                vm.totalPembelian = res.total_pembelian
                for (let i = 0; i < vm.items.length; i++) {
                    let x = vm.items[i];
                    x.no = i+1
                    vm.totalPembayaran += x.jumlah_bayar
                    x.jumlah_bayar = numeral(x.jumlah_bayar).format("0,0.00")
                    x.tanggal = moment(x.tanggal_pembayaran).format("DD-MM-YYYY")
                    if(x.tipe_bayar == 1){
                        x.tipeBayar = "TUNAI"
                    }else if(x.tipe_bayar == 2){
                        x.tipeBayar = "Debit/Kredit"
                    }else if(x.tipe_bayar == 3){
                        x.tipeBayar = "Client/Clientas"
                    }
                }
                vm.total_pembayaran = numeral(vm.totalPembayaran).format("0,0.00")
                let sisa = vm.totalPembelian - vm.totalPembayaran
                vm.sisa_pembayaran = numeral(sisa).format("0,0.00")
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async simpan(){
            let vm = this
            await this.v$.$touch();
            if (vm.isValid && vm.isDirty) {
                let angka = numeral(vm.data.jumlah_bayar)
                vm.data.jumlah_bayar = angka.value()
                vm.data.kas_id = vm.data.kas.id
                let totalBayar = vm.data.jumlah_bayar + vm.totalPembayaran
                let totalBeli = vm.totalPembelian
                console.log(`totalBayar: ${totalBayar}; totalBeli: ${totalBeli}`)
                console.log('vm.data', vm.data)
                if(totalBayar > totalBeli){
                  vm.$store.commit("set_alert", {
                    variant: "warning",
                    msg: "TOTAL PEMBAYARAN MELEBIHI TOTAL PEMBELIAN. MOHON CEK LAGI",
                  });
                }else {
                  this.$_api.post(ipBackend + "/pembayaranPembelian/register", vm.data)
                  .then((res) => {
                    console.log(res, 'ini ress');
                    if (res.status == 200) {
                      vm.busy = false;
                      vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: "BERHASIL MENAMBAHKAN PEMBAYARAN PEMBELIAN",
                      });
                      vm.listPembayaranByPembelianId(vm.data.pembelian_id)
                      vm.reset()
                    } else {
                      vm.button = "Simpan";
                      vm.busy = false;
                      vm.$store.commit("set_alert", {
                        variant: "warning",
                        msg: _.toUpper(res.message),
                      });
                    }
                    })
                  .catch((err) => {
                      console.log(err);
                      vm.button = "Simpan";
                      vm.busy = false;
                      vm.$emit("alertFromChild", {
                          variant: "danger",
                          msg: "TERJADI KESALAHAN PADA SERVER",
                          showing: true,
                      });
                  });
                }
                
            } else {
                console.log('itikiwir');
                this.showError = true;
            }
        },
        hapusTagihan(item) {
          console.log(item, 'hapusKunjungan');
          this.$_alert.confirm('Hapus Data', `Data Pembayaran Tagihan akan dihapus. Ingin melanjutkan?`).then((res) => {
            if (res.isConfirmed) {
              this.$_api.post('pembayaranPembelian/delete', {
                id: item.item.pembayaran_pembelian_id,
              }).then((res) => {
                if (res.status == 200) {
                  this.$_alert.success(res.message)
                  this.listPembayaranByPembelianId(this.data.pembelian_id)
                } else {
                  this.$_alert.error(res, 'Gagal menghapus data Pembayaran Tagihan', res.message)
                }
              }).catch((error) => {
                console.log(error);
                this.$_alert.error(error, 'Gagal menghapus data Pembayaran Tagihan', error.message)
              })
            }
          })
        },
        formatRupiah(value) {
            return numeral(value).format('0,0')
        },
        getTimeFormat(dateTime) {
            return moment(dateTime).format('HH:mm')
        },
        reset(){
            let vm = this
            vm.data.no_transaksi = ""
            vm.data.jumlah_bayar = ""
            vm.data.no_kartu = null
            vm.data.tipe_kartu = null
            vm.data.kas = ""
        },
        checkValidasi(fieldName) {
            const field = this.v$.data[fieldName];
            const x = field.$error === true && field.$errors.length ? field.$errors[0].$validator : '' ;
            // console.log(fieldName, ' - ', x)
            if (this.showError) {
                // console.log('sampe sini');
                if (x == 'required') {
                return { b: false, s: false, m: '* Data wajib diisi' }
                } else if (x == 'email') {
                return { b: false, s: false, m: '* Data harus berbentuk email' }
                } else if (x == 'numeric') {
                return { b: false, s: false, m: '* Data harus terdiri hanxa dari angka' }
                } else if (x == 'minLength') {
                return { b: false, s: false, m: `* Data belum mencapai minimal digits` }
                } else if (x == 'maxLength') {
                return { b: false, s: false, m: `* Data melebihi maksimal digits` }
                } else if (x == 'alphaNum') {
                return { b: false, s: false, m: `* Data tidak boleh mengandung spasi atau simbol` }
                } else if (x == 'official') {
                return { b: false, s: false, m: `* Data tidak boleh mengandung spasi atau simbol` }
                } else if (x == 'validasiNoKontrolRujukan'){
                return { b: false, s: false, m: '* Isi no rujukan / no kontrol' }
                } else if (x == 'validasiPoliLayanan'){
                return { b: false, s: false, m: '* Isi Layanan / Poliklinik' }
                } else if (x == 'validasiNoAsuransi'){
                return { b: false, s: false, m: '* No Asuransi Tidak Valid' }
                } else if (x == 'validasiNoAntrian'){
                return { b: false, s: false, m: '* No Antrian Tidak Valid' }
                } else if (x == 'validasiNoRujukan'){
                return { b: false, s: false, m: '* No Rujukan Tidak Valid' }
                } else if (x == 'validasiNoKontrol'){
                return { b: false, s: false, m: '* No Kontrol Tidak Valid' }
                } else if (x == 'kuotaDokter'){
                return { b: false, s: false, m: '* Kuota Habis' }
                } else {
                return { b: true, s: null, m: null }
                }
            } else {
                return { b: true, s: null, m: null }
            }
        },
    },
  };
</script>

<style scoped>
/* Custom Card Styles */
.card-custom {
  border: none;
  box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05);
  border-radius: 1rem;
}

.card-custom .card-header {
  background: linear-gradient(to right, #ffffff, #f8f9fc);
  border-bottom: 1px solid #ebedf3;
  border-radius: 1rem 1rem 0 0 !important;
}

/* Custom Form Controls */
.form-control-solid {
  background-color: #f3f6f9;
  border-color: #f3f6f9;
  color: #3f4254;
  transition: all 0.3s ease;
  border-radius: 0.42rem;
  padding: 0.75rem 1rem;
  font-weight: 500;
}

.form-control-solid:focus {
  background-color: #ffffff;
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
}

.form-control-solid::placeholder {
  color: #b5b5c3;
}

/* Custom MultiSelect Styles */
.multiselect-solid .multiselect__tags {
  background-color: #f3f6f9;
  border: 1px solid #f3f6f9;
  border-radius: 0.42rem;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  font-weight: 500;
}

.multiselect-solid .multiselect__tags:hover {
  background-color: #ffffff;
  border-color: #e9ecef;
}

.multiselect-solid .multiselect__single {
  color: #3f4254;
  font-weight: 500;
}

.multiselect-solid .multiselect__placeholder {
  color: #b5b5c3;
  font-weight: 500;
}

/* Custom Badge Styles */
.badge {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Custom Button Styles */
.btn {
  font-weight: 600;
  border-radius: 0.42rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
}

.btn-icon {
  padding: 0.5rem;
  border-radius: 0.42rem;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Custom Input Group */
.input-group .input-group-text {
  border: none;
  background-color: #3699ff;
  color: #ffffff;
  font-weight: 600;
  border-radius: 0.42rem 0 0 0.42rem;
}

.input-group .form-control.border-left-0 {
  border-left: none !important;
  border-radius: 0 0.42rem 0.42rem 0;
}

/* Custom Table Styles */
.table-head-custom th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  padding: 1rem 0.75rem;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fc;
  transition: background-color 0.3s ease;
}

/* Custom Symbol Styles */
.symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.42rem;
  font-size: 1rem;
  font-weight: 600;
}

.symbol-40 {
  width: 40px;
  height: 40px;
}

.symbol-light-primary {
  background-color: #e1f0ff;
  color: #3699ff;
}

.symbol-light-success {
  background-color: #e8fdf5;
  color: #1bc5bd;
}

.symbol-light-warning {
  background-color: #fff4de;
  color: #ffa800;
}

.symbol-light-danger {
  background-color: #ffe2e5;
  color: #f64e60;
}

.symbol-light-info {
  background-color: #e8f5ff;
  color: #8950fc;
}

/* Custom Label Styles */
label {
  font-weight: 600;
  color: #3f4254;
  margin-bottom: 0.5rem;
}

label i {
  color: #3699ff;
}

/* Custom Card Header Styles */
.card-header .font-weight-bolder {
  font-weight: 700 !important;
}

.card-header .text-primary {
  color: #3699ff !important;
}

.card-header .text-success {
  color: #1bc5bd !important;
}

.card-header .text-warning {
  color: #ffa800 !important;
}

/* Custom Alert Styles */
.invalid-feedback {
  font-size: 0.875rem;
  font-weight: 500;
  color: #f64e60;
}

.invalid-feedback.d-block {
  display: block !important;
}

/* Custom Background Classes */
.bg-light-primary {
  background-color: #e1f0ff !important;
}

.bg-light-success {
  background-color: #e8fdf5 !important;
}

.bg-light-warning {
  background-color: #fff4de !important;
}

.bg-light-danger {
  background-color: #ffe2e5 !important;
}

.bg-light-info {
  background-color: #e8f5ff !important;
}

/* Custom Text Classes */
.text-dark {
  color: #3f4254 !important;
}

.text-dark-75 {
  color: #3f4254 !important;
  opacity: 0.75;
}

.text-muted {
  color: #b5b5c3 !important;
}

/* Custom Bullet Styles */
.bullet {
  display: inline-block;
  width: 4px;
  height: 16px;
  border-radius: 2px;
}

.bullet-bar {
  width: 3px;
  height: 16px;
  border-radius: 2px;
}

/* Custom Pagination Styles */
.pagination .page-link {
  border: none;
  margin: 0 2px;
  border-radius: 0.42rem;
  color: #3f4254;
  background-color: #f3f6f9;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.pagination .page-link:hover {
  background-color: #3699ff;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(54, 153, 255, 0.3);
}

.pagination .page-item.active .page-link {
  background-color: #3699ff;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(54, 153, 255, 0.3);
}

/* Custom Background Gradient */
.bg-light {
  background: linear-gradient(135deg, #f8f9fc 0%, #e9ecef 100%) !important;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-header .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .card-header .d-flex > div:last-child {
    margin-top: 1rem;
  }

  .table-responsive {
    font-size: 0.875rem;
  }

  .btn-icon {
    padding: 0.25rem 0.5rem !important;
  }

  .badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  .symbol-40 {
    width: 32px;
    height: 32px;
  }

  .font-size-h4 {
    font-size: 1.25rem !important;
  }

  .font-size-h6 {
    font-size: 0.875rem !important;
  }

  .pagination {
    justify-content: center !important;
    margin-top: 1rem;
  }

  .multiselect-solid .multiselect__tags {
    min-height: 2.75rem;
    padding: 0.5rem 0.75rem;
  }

  .form-control-solid {
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    padding: 0 15px !important;
  }

  .bg-light {
    padding: 1rem !important;
  }

  .table-responsive {
    font-size: 0.8rem;
  }

  .btn-icon i {
    font-size: 1rem !important;
  }

  .card-header h3 {
    font-size: 1.5rem;
  }

  .card-body.p-4 {
    padding: 1rem !important;
  }

  .font-size-h3 {
    font-size: 1.25rem !important;
  }

  .font-size-h4 {
    font-size: 1.1rem !important;
  }
}

/* Animation Classes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Custom Hover Effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Custom Focus States */
.form-control-solid:focus,
.multiselect-solid.multiselect--active .multiselect__tags {
  border-color: #3699ff !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25) !important;
}

/* Custom Validation States */
.is-invalid .form-control-solid,
.is-invalid .multiselect__tags {
  border-color: #f64e60 !important;
  background-color: #fff5f5 !important;
}

.is-valid .form-control-solid,
.is-valid .multiselect__tags {
  border-color: #1bc5bd !important;
  background-color: #f8fffe !important;
}
</style>
  