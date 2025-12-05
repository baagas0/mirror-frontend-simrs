<template>
    <div class="w-100">
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" header-bg-variant="dark">
              <template #header>
                <h5 class="mb-0" style="color: #fff">
                  <strong>Pembayaran Pembelian</strong>
                </h5>
              </template>
              <b-row>
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>No. Faktur</label>
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
                        :state="checkValidasi('pembelian').s"
                        placeholder="-- Pilih No Pembelian --"
                    ></multiselect>
                    <span class="text-danger">{{checkValidasi('pembelian').m}}</span>
                </b-col>
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>No. Transaksi</label>
                    <b-form-input 
                        v-model="data.no_transaksi"
                        type="text"
                        :state="checkValidasi('no_transaksi').s"
                    ></b-form-input>
                    <span class="text-danger">{{checkValidasi('no_transaksi').m}}</span>
                </b-col>
              </b-row>
              <b-row style="margin-top:10px">
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>Tanggal</label>
                    <date-picker
                        id="tgl_masuk"
                        style="width: 100%"
                        format="YYYY-MM-DD"
                        v-model="data.tanggal_pembayaran"
                        :placeholder="tanggal_pembayaran_ph"
                    ></date-picker>
                </b-col>
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>Tipe Pembayaran</label>
                    <b-form-select
                        v-model="data.tipe_bayar"
                        :options="optionsPembayaran"
                    ></b-form-select>
                </b-col>
              </b-row>
              <b-row v-if="data.tipe_bayar == 2" style="margin-top:10px">
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>Tipe Kartu</label>
                    <b-form-select
                        v-model="data.tipe_kartu"
                        :options="optionsKartu"
                        :state="checkValidasi('tipe_kartu').s"
                    ></b-form-select>
                    <span class="text-danger">{{checkValidasi('tipe_kartu').m}}</span>
                </b-col>
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>No. Kartu</label>
                    <b-form-input 
                        v-model="data.no_kartu"
                        type="number"
                        :state="checkValidasi('no_kartu').s"
                    ></b-form-input>
                    <span class="text-danger">{{checkValidasi('no_kartu').m}}</span>
                </b-col>
              </b-row>
              <b-row style="margin-top:10px">
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>Kas</label>
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
                        placeholder="-- Pilih Kas --"
                        :state="checkValidasi('kas').s"
                    ></multiselect>
                    <span class="text-danger">{{checkValidasi('kas').m}}</span>
                </b-col>
                <b-col cols="6" md="6" lg="6" sm="6">
                    <label>Pembayaran</label>
                    <b-form-input
                        type="text"
                        v-model="data.jumlah_bayar"
                        :formatter="formater"
                        :state="checkValidasi('jumlah_bayar').s"
                    ></b-form-input>
                    <span class="text-danger">{{checkValidasi('jumlah_bayar').m}}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  cols="4"
                  md="4"
                  lg="4"
                  offset-lg="10"
                  offset-md="10"
                  style="padding-top: 20px"
                >
                  <b-button
                    @click="simpan()"
                    variant="primary"
                    style="margin-right:20px"
                    
                    >Simpan
                  </b-button>
                </b-col>
              </b-row>
              <hr />
              <b-row>
                <b-col cols="12" md="12" lg="12" sm="12">
                    <table>
                        <tr>
                            <td>Total Pembelian</td>
                            <td>: {{ total_pembelian }}</td>
                        </tr>
                        <tr>
                            <td>Total Pembayaran</td>
                            <td>: {{ total_pembayaran }}</td>
                        </tr>
                        <tr>
                            <td>Sisa Pembayaran</td>
                            <td>: {{ sisa_pembayaran }}</td>
                        </tr>
                    </table>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="12" lg="12" sm="12">
                  <b-card>
                    <h5><strong>Daftar Pembayaran by Pembelian</strong></h5>
                      <hr />
                      <b-table
                        :items="items"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        responsive
                        show-empty
                        hover
                        class="bg-light"
                      >
                      </b-table>
                      <b-row>
                        <b-col md="8" offset-md="4">
                          <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            size="sm"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                  </b-card>
                </b-col>
              </b-row>
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
            jumlah_bayar: "",
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
            {value: 3, text: "Client / Clientas"},
          ],
          optionsKartu: [
            {value: 1, text: "Debet"},
            {value: 2, text: "Kredit"},
          ],
          fields: [
            {
              key: "no",
              label: "No",
              sortDirection: "desc",
              sortable: true,
              class: "table-number text-center",
            },
  
            {
              key: "no_faktur",
              label: "No. Faktur",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "nama_supplier",
              label: "Nama Supllier",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "tanggal",
              label: "Tanggal",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },

            {
              key: "jumlah_bayar",
              label: "Jumlah Bayar",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },

            {
              key: "tipeBayar",
              label: "Tipe Pembayaran",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
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
        return !this.v$.$invalid;
        },
        isDirty() {
        return this.v$.$anyDirty;
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
                return this.tipe_bayar != 2 ? true : false
              }
            },
            tipe_kartu: {
              required: function() {
                return this.tipe_bayar != 2 ? true : false
              }
            },
        },
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
        async getDatas() {
          let vm = this
          
          vm.tanggal_pembayaran = moment(new Date()).format("YYYY-MM-DD HH:mm")
          vm.tanggal_pembayaran_ph = moment(new Date()).format("YYYY-MM-DD HH:mm")
          let list_kas = await this.$_api.post("kas/list");
          vm.list_kas = list_kas.status == 200 ? list_kas.data.map(x => { return x }) : []
          
          let list_pembelian = await this.$_api.post("pembelian/listClosedPembelian");
          vm.list_pembelian = list_pembelian.status == 200 ? list_pembelian.data.map(x => { return x }) : []

          console.log(vm.list_pembelian, 'pembelian');
          console.log(vm.list_kas, 'kas');
        },
        
        listPembayaranByPembelianId(id){
            let vm = this
            console.log(id, 'ini id');
            vm.pembelian_id = id
            axios.post("pembayaranPembelian/listPembayaranByPembelianId", {pembelian_id : id})
            .then((res) => {
                console.log(res);
                vm.totalPembayaran = 0
                vm.items = res.data
                vm.total_pembelian = numeral(res.total_pembelian).format("0,0")
                vm.totalPembelian = res.total_pembelian
                for (let i = 0; i < vm.items.length; i++) {
                    let x = vm.items[i];
                    x.no = i+1
                    vm.totalPembayaran += x.jumlah_bayar
                    x.jumlah_bayar = numeral(x.jumlah_bayar).format("0,0")
                    x.tanggal = moment(x.tanggal_pembayaran).format("DD-MM-YYYY")
                    if(x.tipe_bayar == 1){
                        x.tipeBayar = "TUNAI"
                    }else if(x.tipe_bayar == 2){
                        x.tipeBayar = "Debit/Kredit"
                    }else if(x.tipe_bayar == 3){
                        x.tipeBayar = "Client/Clientas"
                    }
                }
                vm.total_pembayaran = numeral(vm.totalPembayaran).format("0,0")
                let sisa = vm.totalPembelian - vm.totalPembayaran
                vm.sisa_pembayaran = numeral(sisa).format("0,0")
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async simpan(){
            let vm = this
            await this.v$.$touch();
            if (vm.isValid && vm.isDirty) {
                let angka = numeral(vm.jumlah_bayar)
                vm.jumlah_bayar = angka.value()
                vm.kas_id = vm.kas.id
                let totalBayar = vm.jumlah_bayar + vm.totalPembayaran
                let totalBeli = vm.totalPembelian
                if(totalBayar >= totalBeli){
                  vm.$store.commit("set_alert", {
                      variant: "warning",
                      msg: "TOTAL PEMBAYARAN MELEBIHI TOTAL PEMBELIAN. MOHON CEK LAGI",
                    });
                }else {
                  axios.post("pembayaranPembelian/register", vm.data)
                  .then((res) => {
                      console.log(res, 'ini ress');
                  if (res.message == "sukses") {
                      vm.busy = false;
                      vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: "BERHASIL MENAMBAHKAN PEMBAYARAN PEMBELIAN",
                      });
                      vm.listPembayaranByPembelianId(vm.pembelian_id)
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
        reset(){
            let vm = this
            vm.no_transaksi = ""
            vm.jumlah_bayar = ""
            vm.no_kartu = null
            vm.tipe_kartu = null
            vm.kas = ""
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
  