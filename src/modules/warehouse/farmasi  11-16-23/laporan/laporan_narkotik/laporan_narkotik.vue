<template>
    <div class="w-100">
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" header-bg-variant="dark">
              <template #header>
                <h5 class="mb-0" style="color: #fff">
                  <strong>Laporan History Narkotik</strong>
                </h5>
              </template>
              <b-row>
                <b-col cols="3" md="3" lg="3" sm="3">
                    <label>Nama Barang</label>
                    <b-form-input 
                        v-model="nama_barang"
                        type="text"
                        debounce="500"
                    ></b-form-input>
                </b-col>
                <b-col cols="3" md="3" lg="3" sm="3">
                    <label>Tanggal Awal</label>
                    <date-picker
                        id="tgl_awal"
                        style="width: 100%"
                        format="YYYY-MM-DD"
                        v-model="data.tgl_awal"
                        :placeholder="tgl_awal_ph"
                    ></date-picker>
                </b-col>
                <b-col cols="3" md="3" lg="3" sm="3">
                    <label>Tanggal Akhir</label>
                    <date-picker
                        id="tgl_akhir"
                        style="width: 100%"
                        format="YYYY-MM-DD"
                        v-model="data.tgl_akhir"
                        :placeholder="tgl_akhir_ph"
                    ></date-picker>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  cols="4"
                  md="4"
                  lg="4"
                  offset-lg="9"
                  offset-md="9"
                  style="padding-top: 20px"
                >
                  <b-button
                    @click="downloadExcel()"
                    variant="primary"
                    style="margin-right:20px"
                    >Download Excel
                  </b-button>
                  <b-button
                    @click="getDataSearch()"
                    variant="success"
                    >Cari
                  </b-button>
                </b-col>
              </b-row>
              <hr />
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
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
    import axios from "axios";
    import { ipBackend } from "@/ipBackend";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
    import moment from "moment"
    moment.locale("ID")
    export default {
      components: {
        DatePicker,
      },
    name: "master_pasien",
      data() {
        return {
            nama_barang: "",        
          list_gudang: [],
          list_barang: [],
          showing: false,
          showError: false,
          variant: "success",
          msg: "",
          tgl_awal_ph: "",
          tgl_akhir_ph: "",
          file1: "",
          data: {
            nama_barang: "",
            tgl_awal: "",
            tgl_akhir: "",
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
              key: "nama_barang",
              label: "Nama Obat",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "stok_awal",
              label: "Stok Awal",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "pembelian_tgl_proses",
              label: "Pembelian Tgl Proses",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "pembelian_tgl_faktur",
              label: "Pembelian Tgl Faktur",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "jumlah_penjualan",
              label: "Jumlah Penjualan",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "stok_akhir",
              label: "Stok Akhir",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
          ],
          items: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 10,
          filter: null,
          filterOn: [],
          tableBusy: false,
          disabledDownload: true,
          disabledSimpan: false,
          disabledSimpanData: true,
        };
    },
    watch: {
      currentPage: function (newVal, oldVal) {
        if (oldVal != newVal) {
          console.log(this.currentPage);
          this.getDataSearch()
        }
      },
      nama_barang: function(newVar, oldVar){
        if(newVar != oldVar){
          this.getDataSearch()
        }
      },
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      this.getDatas();
      // this.getDataSearch()
    },
    methods: {
      async getDatas() {
        let vm = this
        vm.tgl_awal = moment().startOf("month").format("YYYY-MM-DD")
        vm.tgl_awal_ph = moment().startOf("month").format("YYYY-MM-DD")
        vm.tgl_akhir = moment(new Date()).format("YYYY-MM-DD")
        vm.tgl_akhir_ph = moment(new Date()).format("YYYY-MM-DD")
      },
      async getDataSearch() {
        let vm = this
          axios.post("stock/laporanNarkotik", {
            halaman: vm.currentPage,
            jumlah: vm.perPage,
            nama_barang: vm.nama_barang,
            tgl_awal: vm.tgl_awal,
            tgl_akhir: vm.tgl_akhir
          })
            .then((res) => {
              console.log(res, 'ini ress');
              if (res.data.length == 0) {
                vm.$store.commit("set_alert", { variant: "warning", msg: "Data Kosong", showing: true });
              } else {
                vm.totalRows = res.count
              if (vm.currentPage == 1) {
                vm.items = res.data
              } else {
                for (let i = 0; i < res.data.length; i++) {
                  let x = res.data[i];
                  vm.items.push(x)
                }
              }
                for (let i = 0; i < vm.items.length; i++) {
                  let x = vm.items[i];
                  x.no = i + 1
                //   x.tgl_transaksinya = moment(x.tgl_transaksi).format("DD-MM-YYYY HH:mm")
                  // x.tgl_dibuatnya = moment(x.createdAt).format("DD-MM-YYYY")
                }
              }
            })
            .catch((err) => {
            console.log(err, 'ini err');
          })
      },
      downloadExcel() {
          let vm = this
          let tgl_awal = vm.tgl_awal
          let tgl_akhir = vm.tgl_akhir
          window.open(`${ipBackend}stock/downloadLaporanNarkotik?tgl_awal=${tgl_awal}&tgl_akhir${tgl_akhir}`,"_blank")
        },
    },
  };
  </script>
  