<template>
    <div class="w-100">
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" class="card-custom">
              <template #header>
                <div class="d-flex justify-content-between w-100 align-items-center py-3">
                  <div class="d-flex align-items-start flex-column">
                    <h3 class="mb-2 font-weight-bolder text-dark">
                      <i class="ri-file-excel-2-line mr-2 text-success"></i>
                      Service Tutup Pembelian
                    </h3>
                    <span class="text-muted font-size-sm">Import pembayaran massal dari Excel dan kelola service</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center mr-4">
                      <div class="bullet bullet-bar bg-success align-self-stretch mr-2"></div>
                      <span class="text-success font-weight-bold font-size-sm">{{ items.length }} Services</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="bullet bullet-bar bg-primary align-self-stretch mr-2"></div>
                      <span class="text-primary font-weight-bold font-size-sm">{{ itemsExcel.length }} Excel Data</span>
                    </div>
                  </div>
                </div>
              </template>
              <!-- Form and Excel Preview Section -->
              <div class="card-body pt-0 pl-0 pr-0">
                <div class="row">
                  <!-- Left Column - Form -->
                  <b-col cols="12" lg="4" class="mb-4">
                    <div class="card card-custom border-0 shadow-sm">
                      <div class="card-header bg-light-primary border-0 py-4">
                        <div class="d-flex align-items-center">
                          <i class="ri-upload-cloud-2-line text-primary font-size-h3 mr-3"></i>
                          <div>
                            <h5 class="font-weight-bolder text-dark mb-0">Upload Excel</h5>
                            <span class="text-muted font-size-sm">Import data pembayaran</span>
                          </div>
                        </div>
                      </div>
                      <div class="card-body p-4">
                        <form @submit.prevent="simpan">
                          <!-- Service ID -->
                          <b-col cols="12" class="mb-4">
                            <label for="kode_serv_pembelian" class="font-weight-bold text-dark mb-2">
                              <i class="ri-hashtag mr-1"></i>
                              ID Service
                            </label>
                            <b-form-input
                              id="kode_serv_pembelian"
                              v-model="data.kode_serv_pembelian"
                              type="text"
                              disabled
                              class="form-control-solid"
                              placeholder="Auto-generated"
                            ></b-form-input>
                          </b-col>

                          <!-- Tanggal -->
                          <b-col cols="12" class="mb-4">
                            <label for="tanggal" class="font-weight-bold text-dark mb-2">
                              <i class="ri-calendar-line mr-1"></i>
                              Tanggal Service
                            </label>
                            <date-picker
                              id="tanggal"
                              style="width: 100%"
                              format="YYYY-MM-DD"
                              v-model="data.tanggal_serv_pembelian"
                              :placeholder="tanggal_serv_pembelian_ph"
                              class="form-control-solid"
                            ></date-picker>
                          </b-col>

                          <!-- Tipe Pembayaran -->
                          <b-col cols="12" class="mb-4">
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

                          <!-- Kas -->
                          <b-col cols="12" class="mb-4">
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

                          <!-- Keterangan -->
                          <b-col cols="12" class="mb-4">
                            <label for="keterangan" class="font-weight-bold text-dark mb-2">
                              <i class="ri-text mr-1"></i>
                              Keterangan
                            </label>
                            <b-form-textarea
                              id="keterangan"
                              v-model="data.keterangan"
                              class="form-control-solid"
                              placeholder="Masukkan keterangan..."
                              rows="3"
                            ></b-form-textarea>
                          </b-col>

                          <!-- File Upload -->
                          <b-col cols="12" class="mb-4">
                            <label for="file_excel" class="font-weight-bold text-dark mb-2">
                              <i class="ri-file-excel-2-line mr-1 text-success"></i>
                              File Excel
                            </label>
                            <div class="file-upload-area">
                              <input
                                id="file_excel"
                                ref="file1"
                                type="file"
                                @input="handleFile()"
                                accept=".xlsx,.xls"
                                class="d-none"
                              >
                              <label for="file_excel" class="file-upload-label">
                                <div class="text-center">
                                  <i class="ri-upload-cloud-line font-size-h3 text-success mb-2"></i>
                                  <div class="font-weight-bold text-dark mb-1">
                                    {{ data.file1 ? data.file1.name : 'Pilih File Excel' }}
                                  </div>
                                  <div class="text-muted font-size-sm">
                                    Drag & drop atau klik untuk memilih
                                  </div>
                                  <div class="text-muted font-size-sm mt-1">
                                    Format: .xlsx, .xls
                                  </div>
                                </div>
                              </label>
                            </div>
                          </b-col>

                          <!-- Actions -->
                          <b-col cols="12" class="mt-4">
                            <div class="d-flex justify-content-end gap-2">
                              <b-button
                                @click="reset"
                                variant="light"
                                class="p-0 px-3"
                              >
                                <i class="ri-refresh-line mr-2"></i>
                                Reset
                              </b-button>
                              <b-button
                                type="submit"
                                variant="success"
                                class="p-0 px-3"
                                v-b-tooltip.hover
                                title="Proses Excel"
                              >
                                <i class="ri-save-line mr-2"></i>
                                Simpan
                              </b-button>
                            </div>
                          </b-col>
                        </form>
                      </div>
                    </div>
                  </b-col>
                  <!-- Right Column - Excel Data Preview -->
                  <b-col cols="12" lg="8" class="mb-4">
                    <div class="card card-custom border-0 shadow-sm">
                      <div class="card-header bg-light-success border-0 py-4">
                        <div class="d-flex justify-content-between w-100 align-items-center">
                          <div class="d-flex align-items-center">
                            <i class="ri-table-line text-success font-size-h3 mr-3"></i>
                            <div>
                              <h5 class="font-weight-bolder text-dark mb-0">Preview Excel Data</h5>
                              <span class="text-muted font-size-sm">Data pembayaran yang akan diimport</span>
                            </div>
                          </div>
                          <div class="badge badge-success badge-pill px-4 py-2 font-weight-bold">
                            {{ itemsExcel.length }} Records
                          </div>
                        </div>
                      </div>
                      <div class="card-body p-4">
                        <div class="table-responsive">
                          <b-table
                            :items="itemsExcel"
                            :fields="fieldsExcel"
                            :current-page="currentPageExcel"
                            :per-page="perPageExcel"
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
                                  <i class="ri-file-excel-2-line font-size-h4 text-muted"></i>
                                </div>
                                <h5 class="font-weight-bolder text-dark mb-2">Belum Ada Data</h5>
                                <p class="text-muted">Upload file Excel untuk melihat preview data</p>
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
                                <div class="symbol symbol-40 symbol-light-success mr-3">
                                  <div class="symbol-label">
                                    <i class="ri-file-list-3-line text-success"></i>
                                  </div>
                                </div>
                                <div>
                                  <div class="font-weight-bold text-dark">{{ data.item.no_faktur }}</div>
                                </div>
                              </div>
                            </template>

                            <template #cell(nama_supplier)="data">
                              <div class="font-weight-bolder text-dark">
                                {{ data.item.nama_supplier }}
                              </div>
                            </template>

                            <template #cell(nama_gudang)="data">
                              <div class="d-flex align-items-center">
                                <div class="symbol symbol-30 symbol-light-primary mr-2">
                                  <div class="symbol-label">
                                    <i class="ri-home-4-line text-primary font-size-sm"></i>
                                  </div>
                                </div>
                                <span class="font-weight-bold">{{ data.item.nama_gudang }}</span>
                              </div>
                            </template>

                            <template #cell(keterangan)="data">
                              <div class="text-muted">
                                <small>{{ data.item.keterangan || '-' }}</small>
                              </div>
                            </template>
                          </b-table>
                        </div>

                        <!-- Pagination for Excel Data -->
                        <div class="d-flex flex-wrap justify-content-between align-items-center mt-6" v-if="itemsExcel.length > 0">
                          <div class="text-muted font-size-sm">
                            Menampilkan {{ itemsExcel.length }} dari {{ totalRowsExcel }} data
                          </div>
                          <b-pagination
                            v-model="currentPageExcel"
                            :total-rows="totalRowsExcel"
                            :per-page="perPageExcel"
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
                    </div>
                  </b-col>
                </div>
              </div>
              <!-- Filter Section -->
              <div class="card-body bg-light rounded mb-6">
                <div class="d-flex align-items-center mb-4">
                  <i class="ri-filter-3-line text-primary font-size-h4 mr-3"></i>
                  <h5 class="mb-0 font-weight-bolder text-dark">Filter Service</h5>
                </div>

                <div class="row">
                  <b-col cols="12" md="4" lg="4" class="mb-4">
                    <label for="filter_id" class="font-weight-bold text-dark mb-2">
                      <i class="ri-hashtag mr-1"></i>
                      ID Service
                    </label>
                    <b-form-input
                      id="filter_id"
                      v-model="dataFilter.kode_serv_pembelian"
                      type="text"
                      class="form-control-solid"
                      placeholder="Masukkan ID Service"
                    ></b-form-input>
                  </b-col>

                  <b-col cols="12" md="4" lg="4" class="mb-4">
                    <label for="filter_tipe" class="font-weight-bold text-dark mb-2">
                      <i class="ri-bank-card-line mr-1"></i>
                      Tipe Pembayaran
                    </label>
                    <b-form-select
                      id="filter_tipe"
                      v-model="dataFilter.tipe_pembayaran"
                      :options="optionsPembayaran"
                      class="form-control-solid"
                    ></b-form-select>
                  </b-col>

                  <b-col cols="12" md="4" lg="4" class="mb-4">
                    <label for="filter_kas" class="font-weight-bold text-dark mb-2">
                      <i class="ri-safe-2-line mr-1"></i>
                      Kas
                    </label>
                    <multiselect
                      id="filter_kas"
                      v-model="dataFilter.kas"
                      :options="list_kas"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="name"
                      track-by="id"
                      placeholder="Pilih Kas"
                      class="multiselect-solid"
                    ></multiselect>
                  </b-col>
                </div>

                <div class="d-flex flex-wrap gap-2 mt-4">
                  <button
                    @click="getDataFilter"
                    class="btn btn-light-success py-0 px-3"
                  >
                    <i class="ri-search-line mr-2"></i>
                    Terapkan Filter
                  </button>
                  <button
                    @click="dataFilter = { kode_serv_pembelian: null, tipe_pembayaran: '1', kas_id: null, kas: '' }"
                    class="btn btn-light-warning py-0 px-3"
                  >
                    <i class="ri-refresh-line mr-2"></i>
                    Reset
                  </button>
                </div>
              </div>
              <!-- Service List Section -->
              <div class="card-body pt-0 pl-0 pr-0">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="d-flex align-items-center">
                    <i class="ri-history-line text-primary font-size-h4 mr-3"></i>
                    <h5 class="mb-0 font-weight-bolder text-dark">Riwayat Service</h5>
                  </div>
                  <div class="text-muted font-size-sm">
                    <i class="ri-information-line mr-1"></i>
                    Menampilkan {{ items.length }} service
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
                        <h5 class="font-weight-bolder text-dark mb-2">Belum Ada Service</h5>
                        <p class="text-muted">Belum ada data service tutup pembelian</p>
                      </div>
                    </template>

                    <!-- Custom Cell Formatting -->
                    <template #cell(no)="data">
                      <div class="text-center">
                        <span class="font-weight-bolder text-muted">{{ data.item.no }}</span>
                      </div>
                    </template>

                    <template #cell(kode_serv_pembelian)="data">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-light-primary mr-3">
                          <div class="symbol-label">
                            <i class="ri-hashtag text-primary"></i>
                          </div>
                        </div>
                        <div>
                          <div class="font-weight-bold text-dark">{{ data.item.kode_serv_pembelian }}</div>
                          <div class="text-muted font-size-sm">Service ID</div>
                        </div>
                      </div>
                    </template>

                    <template #cell(tipe_bayar)="data">
                      <span
                        v-if="data.item.tipe_pembayaran == 1"
                        class="badge badge-primary badge-pill px-4 py-2 font-weight-bold"
                      >
                        <i class="ri-money-dollar-circle-line mr-1"></i>
                        {{ data.item.tipe_bayar }}
                      </span>
                      <span
                        v-else-if="data.item.tipe_pembayaran == 2"
                        class="badge badge-info badge-pill px-4 py-2 font-weight-bold"
                      >
                        <i class="ri-bank-card-line mr-1"></i>
                        {{ data.item.tipe_bayar }}
                      </span>
                      <span
                        v-else
                        class="badge badge-warning badge-pill px-4 py-2 font-weight-bold"
                      >
                        <i class="ri-exchange-line mr-1"></i>
                        {{ data.item.tipe_bayar }}
                      </span>
                    </template>

                    <template #cell(nama_kas)="data">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-30 symbol-light-success mr-2">
                          <div class="symbol-label">
                            <i class="ri-safe-2-line text-success font-size-sm"></i>
                          </div>
                        </div>
                        <span class="font-weight-bold">{{ data.item.nama_kas }}</span>
                      </div>
                    </template>

                    <template #cell(keterangan)="data">
                      <div class="text-muted">
                        <small>{{ data.item.keterangan || '-' }}</small>
                      </div>
                    </template>

                    <template #cell(actions)="data">
                      <div class="d-flex justify-content-center">
                        <b-button
                          variant="warning"
                          class="btn-icon btn-sm p-2"
                          v-b-tooltip.hover
                          title="Lihat Detail"
                          @click="setItem(data.item)"
                        >
                          <i class="ri-eye-line font-size-lg"></i>
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
          showError: false,
          list_kas: [],
          list_pembelian: [],
          file1: "",
          tanggal_serv_pembelian_ph: "",
          dataFilter: {
            kode_serv_pembelian: null,
            tipe_pembayaran: "1",
            kas_id: null,
            kas: "",
          },
          data: {
            tanggal_serv_pembelian: null,
            tipe_bayar: "1",
            keterangan: "",
            kas_id: "",
            kas: "",
            kode_serv_pembelian: "",
            file1: "",
          },
          optionsPembayaran: [
            {value: 1, text: "Tunai"},
            {value: 2, text: "Debet / Kredit"},
            {value: 3, text: "Client / Clientas"},
          ],
          fieldsExcel: [
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
              key: "nama_gudang",
              label: "Gudang",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "keterangan",
              label: "Keterangan",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
          ],
          items: [],

          fields: [
            {
              key: "no",
              label: "No",
              sortable: false,
              thClass: "text-center font-weight-bolder text-dark",
              tdClass: "text-center align-middle",
            },
            {
              key: "kode_serv_pembelian",
              label: "Service ID",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "tipe_bayar",
              label: "Metode Pembayaran",
              sortable: true,
              thClass: "font-weight-bolder text-dark text-center",
              tdClass: "align-middle text-center",
            },
            {
              key: "nama_kas",
              label: "Kas",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "keterangan",
              label: "Keterangan",
              sortable: true,
              thClass: "font-weight-bolder text-dark",
              tdClass: "align-middle",
            },
            {
              key: "actions",
              label: "Aksi",
              thClass: "text-center font-weight-bolder text-dark",
              tdClass: "align-middle text-center",
            },
          ],
          itemsExcel: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,
          totalRowsExcel: 1,
          currentPageExcel: 1,
          perPageExcel: 5,
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
        handleFile() {
          this.data.file1 = this.$refs.file1.files[0];
          console.log(this.$refs.file1.files[0].name, "iki2");
          console.log(this.data.file1, 'ini filenya oi');
        },
        setItem(x){
            let vm = this
            console.log(x);
            let kas = x.kas_id
            vm.data.kode_serv_pembelian = x.kode_serv_pembelian
            vm.data.tipe_pembayaran = x.tipe_pembayaran
            for (let i = 0; i < vm.list_kas.length; i++) {
                let y = vm.list_kas[i];
                if(y.id == kas){
                    vm.data.kas = y
                }
            }
            axios.post(ipBackend + "/servPembelian/listPembelianByKodeServPembelian", {kode_serv_pembelian:x.kode_serv_pembelian})
            .then((res) => {
                console.log(res, 'ini ress');
                vm.itemsExcel = res.data.data
                for (let i = 0; i < vm.itemsExcel.length; i++) {
                    let x = vm.itemsExcel[i];
                    x.no = i+1
                }
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async getDataFilter(){
            let vm = this
            let list_pembelian = await axios.post(ipBackend + "/servPembelian/list", vm.dataFilter);
            vm.items = list_pembelian.data.status == 200 ? list_pembelian.data.data.map(x => { return x }) : []
            for (let i = 0; i < vm.items.length; i++) {
                let x = vm.items[i];
                x.no = i+1
                if(x.tipe_pembayaran == 1){
                    x.tipe_bayar = "TUNAI"
                }else if(x.tipe_pembayaran == 2){
                    x.tipe_bayar = "Debit/Kredit"
                }else if(x.tipe_pembayaran == 3){
                    x.tipe_bayar = "Client/Clientas"
                }
            }
        },
        async getDatas() {
          let vm = this
          
          vm.data.tanggal_serv_pembelian = moment(new Date()).format("YYYY-MM-DD HH:mm")
          vm.tanggal_serv_pembelian_ph = moment(new Date()).format("YYYY-MM-DD HH:mm")
          let list_kas = await axios.post(ipBackend + "/kas/list");
          vm.list_kas = list_kas.data.status == 200 ? list_kas.data.data.map(x => { return x }) : []
          
          let list_pembelian = await axios.post(ipBackend + "/servPembelian/list", vm.dataFilter);
          vm.items = list_pembelian.data.status == 200 ? list_pembelian.data.data.map(x => { return x }) : []
            for (let i = 0; i < vm.items.length; i++) {
                let x = vm.items[i];
                x.no = i+1
                if(x.tipe_pembayaran == 1){
                    x.tipe_bayar = "TUNAI"
                }else if(x.tipe_pembayaran == 2){
                    x.tipe_bayar = "Debit/Kredit"
                }else if(x.tipe_pembayaran == 3){
                    x.tipe_bayar = "Client/Clientas"
                }
            }

          console.log(vm.list_pembelian, 'pembelian');

        },
        async simpan(){
            let vm = this
            await this.v$.$touch();
            console.log(vm.isValid && vm.isDirty)
            if (vm.isValid && vm.isDirty) {
                let formData = new FormData()
                formData.append("tanggal_serv_pembelian", vm.data.tanggal_serv_pembelian);
                formData.append("tipe_pembayaran", vm.data.tipe_bayar);
                formData.append("kas_id", vm.data.kas.id);
                formData.append("keterangan", vm.data.keterangan);
                formData.append("file1", vm.data.file1)
                axios.post(ipBackend + "/servPembelian/registerPembayaranExcel", formData)
                .then((res) => {
                    console.log(res, 'ini ress');
                if (res.data.message == "sukses") {
                    vm.data.kode_serv_pembelian = res.data.data[0].data_pembayaran.kode_serv_pembelian
                    vm.itemsExcel = res.data.data[0].data_pembelian
                    for (let i = 0; i < vm.itemsExcel.length; i++) {
                        let x = vm.itemsExcel[i];
                        x.no = i+1
                    }
                    vm.totalRowsExcel = res.data.data[0].data_pembelian.length
                    vm.busy = false;
                    vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: "BERHASIL MENAMBAHKAN PEMBAYARAN PEMBELIAN",
                    });
                    vm.getDataFilter()
                } else {
                    vm.button = "Simpan";
                    vm.busy = false;
                    vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: _.toUpper(res.data.message),
                    });
                }
                })
                .catch((err) => {
                    console.log(err);
                    vm.button = "Simpan";
                    vm.busy = false;
                    vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: "TERJADI KESALAHAN PADA SERVER",
                    });
                });
            } else {
                console.log('itikiwir');
                this.showError = true;
            }
        },
        reset(){
            let vm = this
            vm.data.kode_serv_pembelian = ""
            vm.data.kas = ""
            vm.data.keterangan = null
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

.form-control-solid:disabled {
  background-color: #f8f9fa;
  border-color: #e9ecef;
  color: #6c757d;
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

/* File Upload Area */
.file-upload-area {
  position: relative;
  width: 100%;
}

.file-upload-label {
  display: block;
  padding: 2rem 1rem;
  border: 2px dashed #e9ecef;
  border-radius: 0.42rem;
  background-color: #f8f9fc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-label:hover {
  border-color: #3699ff;
  background-color: #f1f8ff;
}

.file-upload-label i {
  font-size: 2rem;
  color: #1bc5bd;
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

.symbol-30 {
  width: 30px;
  height: 30px;
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

/* Gap utility */
.gap-2 {
  gap: 0.5rem;
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

  .font-size-h3 {
    font-size: 1.1rem !important;
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

  .file-upload-label {
    padding: 1.5rem 0.75rem;
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

  .file-upload-label {
    padding: 1rem 0.5rem;
  }

  .file-upload-label i {
    font-size: 1.5rem;
  }

  .card-header .font-size-h3 {
    font-size: 1.25rem !important;
  }

  .card-header .font-size-h4 {
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

/* Custom Card Sub Headers */
.bg-light-primary {
  background: linear-gradient(135deg, #e1f0ff 0%, #f8f9fc 100%) !important;
  border-bottom: 1px solid #e1f0ff;
}

.bg-light-success {
  background: linear-gradient(135deg, #e8fdf5 0%, #f8f9fc 100%) !important;
  border-bottom: 1px solid #e8fdf5;
}

.justify-content-between {
    justify-content: space-between !important;
}
</style>
  