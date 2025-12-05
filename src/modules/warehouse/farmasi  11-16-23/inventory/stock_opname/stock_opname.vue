<template>
    <div class="w-100">
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" header-bg-variant="dark">
              <template #header>
                <h5 class="mb-0" style="color: #fff">
                  <strong>Stock Opname</strong>
                </h5>
              </template>
              <b-row>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <label>ID</label>
                    <b-form-input 
                        v-model="data.kode_stock_opname"
                        disabled
                        type="text"
                    ></b-form-input>
                </b-col>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <label>Tanggal</label>
                    <date-picker
                        id="tgl_stockopname"
                        style="width: 100%"
                        format="YYYY-MM-DD HH:mm"
                        type="datetime"
                        v-model="data.tgl_stock_opname"
                        :placeholder="tgl_stock_opname_ph"
                    ></date-picker>
                </b-col>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <label>Gudang</label>
                    <multiselect
                        id="gudang"
                        v-model="gudang"
                        :options="list_gudang"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="nama_gudang"
                        track-by="id"
                        placeholder="-- Pilih Gudang --"
                    ></multiselect>
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
                    @click="simpanHeader()"
                    variant="primary"
                    style="margin-right:20px"
                    :disabled="disabledSimpan"
                    >Simpan
                  </b-button>
                  <b-button
                    @click="downloadExcel()"
                    variant="success"
                    :disabled="disabledDownload"
                    >Download
                  </b-button>
                </b-col>
              </b-row>
              <hr />
              <b-row>
                <b-col cols="4" md="4" lg="4" sm="4">
                  <b-form-group
                    label="File Excel"
                    label-cols-md="2"
                    label-align-md="left"
                    label-size="md"
                    style="background-color: "
                  >
                  <b-form-file 
                      ref="file1"
                      type="file"
                      @input="handleFile()"
                  ></b-form-file>
                  </b-form-group>
                </b-col>
                <b-col cols="4" md="4" lg="4" sm="4">
                  <label> </label>
                  <b-button
                    @click="uploadExcel()"
                    variant="success"
                    >Upload
                  </b-button>
                </b-col>
              </b-row>
              <hr />
              <b-row>
                <b-col cols="6" md="6" lg="6" sm="6">
                  <b-card>
                    <h5><strong>Tidak ditemukan di Excel</strong></h5>
                      <hr />
                      <b-table
                        :items="itemsTidak"
                        :fields="fieldsTidak"
                        :current-page="currentPageTidak"
                        :per-page="perPageTidak"
                        responsive
                        show-empty
                        hover
                        class="bg-light"
                      >
                      </b-table>
                      <b-row>
                        <b-col md="8" offset-md="4">
                          <b-pagination
                            v-model="currentPageTidak"
                            :total-rows="totalRowsTidak"
                            :per-page="perPageTidak"
                            align="fill"
                            size="sm"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                  </b-card>
                </b-col>

                <b-col cols="6" md="6" lg="6" sm="6">
                  <b-card>
                    <h5><strong>Gagal Upload</strong></h5>
                      <hr />
                      <b-table
                        :items="itemsGagal"
                        :fields="fieldsGagal"
                        :current-page="currentPageGagal"
                        :per-page="perPageGagal"
                        responsive
                        show-empty
                        hover
                        class="bg-light"
                      >
                      </b-table>
                      <b-row>
                        <b-col md="8" offset-md="4">
                          <b-pagination
                            v-model="currentPageGagal"
                            :total-rows="totalRowsGagal"
                            :per-page="perPageGagal"
                            align="fill"
                            size="sm"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                  </b-card>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="12" lg="12" sm="12">
                  <b-card>
                    <h5><strong>List Item</strong></h5>
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
              <b-row>
                <b-col
                  cols="2"
                  md="2"
                  lg="2"
                  offset-lg="10"
                  offset-md="10"
                >
                  <b-button
                    @click="simpanDataStockOpname()"
                    variant="success"
                    :disabled="disabledSimpanData"
                    >Simpan Data
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
    import axios from "axios";
    import { ipBackend } from "@/ipBackend";
    import Multiselect from "vue-multiselect";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
    import moment from "moment"
    moment.locale("ID")
    export default {
      components: {
        Multiselect,
        DatePicker,
      },
      name: "master_pasien",
      data() {
        return {
          gudang: "",
          list_gudang: [],
          showing: false,
          variant: "success",
          msg: "",
          tgl_stock_opname_ph: "",
          file1: "",
          data: {
            stock_opname_id: null,
            kode_stock_opname: "",
            tgl_stock_opname: "",
            ms_gudang_id: "",
          },
          fields: [
            {
              key: "no",
              label: "No",
              sortDirection: "desc",
              sortable: true,
              class: "table-number text-center",
            },
  
            {
              key: "stock_id",
              label: "ID",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
              thStyle: { width: "30%" },
            },
  
            {
              key: "nama_barang",
              label: "Nama",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "qty",
              label: "QTY",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
          ],
          items: [],

          fieldsTidak: [
            {
              key: "no",
              label: "No",
              sortDirection: "desc",
              sortable: true,
              class: "table-number text-center",
            },
  
            {
              key: "stock_id",
              label: "ID",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "nama_barang",
              label: "Nama",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "qty",
              label: "QTY",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
          ],
          itemsTidak: [],

          fieldsGagal: [
            {
              key: "no",
              label: "No",
              sortDirection: "desc",
              sortable: true,
              class: "table-number text-center",
            },
  
            {
              key: "stock_id",
              label: "ID",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "nama_barang",
              label: "Nama",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "qty",
              label: "QTY",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
            {
              key: "keterangan",
              label: "Keterangan",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
          ],
          itemsGagal: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,

          totalRowsTidak: 1,
          currentPageTidak: 1,
          perPageTidak: 5,

          totalRowsGagal: 1,
          currentPageGagal: 1,
          perPageGagal: 5,
          filter: null,
          filterOn: [],
          tableBusy: false,
          disabledDownload: true,
          disabledSimpan: false,
          disabledSimpanData: true,
        };
      },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.getDatas();
      },
      methods: {
        async getDatas() {
          let vm = this
          vm.stock_opname_id = this.$store.state.stock_opname_id
          vm.tgl_stock_opname = moment(new Date()).format("YYYY-MM-DD HH:mm")
          vm.tgl_stock_opname_ph = moment(new Date()).format("YYYY-MM-DD HH:mm")
          let list_gudang = await this.$_api.post("msGudang/list");
          vm.list_gudang = list_gudang.status == 200 ? list_gudang.data.map(x => { return x }) : []

          if (vm.stock_opname_id != null) {
            let detail = await this.$_api.post("stockOpname/detailsById/" + vm.stock_opname_id);
            console.log(detail, 'ini detail');
            vm.ms_gudang_id = detail.data[0].ms_gudang_id
            vm.kode_stock_opname = detail.data[0].kode_stock_opname
            for (let i = 0; i < vm.list_gudang.length; i++) {
              let x = vm.list_gudang[i];
              if (x.id == vm.ms_gudang_id) {
                vm.gudang = x
                // vm.disabledSimpan = true
                vm.disabledDownload = false
              }
            }
          }
        },
        simpanHeader() {
          let vm = this
          vm.ms_gudang_id = vm.gudang.id
          console.log(vm.tgl_stock_opname, 'ini tgl');
          axios.post("stockOpname/register", {
            tgl_stock_opname: vm.tgl_stock_opname,
            ms_gudang_id: vm.ms_gudang_id            
          })
          .then((res) => {
            console.log(res, 'ini responya');
            vm.stock_opname_id = res.data.id
            vm.kode_stock_opname = res.data.kode_stock_opname
            vm.disabledDownload = false
            this.$store.commit("set_stockOpname_id", res.data.id);
          })
          .catch((err) => {
            console.log(err);
          });
        },
        downloadExcel() {
          let vm = this
          let gudang_id = vm.ms_gudang_id
          let tgl = vm.tgl_stock_opname
          window.open(`${ipBackend}stockOpname/downloadStockByGudangId?ms_gudang_id=${gudang_id}&tgl_stock_opname${tgl}`,"_blank")
        },
        uploadExcel() {
          let vm = this
          let formData = new FormData()
          formData.append("stock_opname_id", vm.stock_opname_id);
          formData.append("gudang_id", vm.ms_gudang_id);
          formData.append("file1", vm.file1)
          axios.post("stockOpname/uploadExcel", formData)
          .then((res) => {
            console.log(res, 'ini respon upload nya ui');
            vm.items = res.data
            vm.itemsGagal = res.dataGagal
            vm.itemsTidak = res.dataSelisih
              if (vm.itemsGagal.length != 0 || vm.itemsTidak.length != 0) {
                vm.disabledSimpanData = true
                } else if (vm.items.length != 0) {
                vm.disabledSimpanData = false
              }
              for (let i = 0; i < this.items.length; i++) {
                let x = this.items[i];
                x.no = i + 1;
              }
              for (let i = 0; i < this.itemsTidak.length; i++) {
                let x = this.itemsTidak[i];
                x.no = i + 1;
              }
              for (let i = 0; i < this.itemsGagal.length; i++) {
                let x = this.itemsGagal[i];
                x.no = i + 1;
              }
          })
          .catch((err) => {
            console.log(err);
          });
        },
        simpanDataStockOpname() {
          let vm = this
          axios.post("stockOpname/simpanStockOpname", {
            stock_opname_id : vm.stock_opname_id
          })
          .then((res) => {
            console.log(res, 'ini respon simpan data');
            if (res.message == "sukses" && res.status == 200) {
              this.$store.commit("set_stockOpname_id", null);
              vm.stock_opname_id = null
              vm.ms_gudang_id = ""
              vm.gudang = ""
              vm.disabledDownload = true
              vm.disabledSimpanData = true
              vm.items = []
              let alert = {
                variant: "success",
                msg: "BERHASIL MENYIMPAN DATA STOCK OPNAME",
              }
              vm.$store.commit("set_alert", alert)
            }
            else {
              let alert = {
                variant: "danger",
                msg: res.message,
              }
              vm.$store.commit("set_alert", alert)
            }
          })
          .catch((err) => {
            console.log(err);
          });
        },
        handleFile() {
          this.file1 = this.$refs.file1.files[0];
          console.log(this.$refs.file1.files[0].name, "iki2");
        },
    },
  };
  </script>
  