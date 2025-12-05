<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>Kartu Stock</strong>
              </h5>
            </template>
            <b-row>
              <b-col cols="3" md="3" lg="3" sm="3">
                  <label>Nama Barang</label>
                  <multiselect
                      id="barang"
                      v-model="data.barang"
                      :options="list_barang"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="nama_barang"
                      track-by="id"
                      placeholder="-- Pilih Barang --"
                      :state="checkValidasi('barang').s"
                  ></multiselect>
                  <span class="text-danger">{{checkValidasi('barang').m}}</span>
              </b-col>
              <b-col cols="3" md="3" lg="3" sm="3">
                  <label>Gudang Farmasi</label>
                  <multiselect
                      id="gudang"
                      v-model="data.gudang"
                      :options="list_gudang"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="nama_gudang"
                      track-by="id"
                      placeholder="-- Pilih Gudang --"
                      :state="checkValidasi('gudang').s"
                  ></multiselect>
                  <span class="text-danger">{{checkValidasi('gudang').m}}</span>
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
                  @click="simpanHeader()"
                  variant="primary"
                  style="margin-right:20px"
                  >Export List
                </b-button>
                <b-button
                  @click="downloadExcel()"
                  variant="warning"
                  style="margin-right:20px"
                  >Export CSV
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
  name: "master_pasien",
  setup() { return { v$: useVuelidate({ $lazy: true, $autoDirty: true }) } },
    data() {
      return {        
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
          ms_barang_id: null,
          tgl_awal: "",
          tgl_akhir: "",
          ms_gudang_id: null,
          barang: null,
          gudang: null,
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
            key: "tgl_transaksinya",
            label: "Tanggal Transaksi",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "tgl_dibuatnya",
            label: "Tanggal Dibuat",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "tipe_transaksi",
            label: "Keterangan",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "nama_barang",
            label: "Nama Barang",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "nama_gudang",
            label: "Nama Gudang",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "stok_masuk",
            label: "Stock Masuk",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "stok_keluar",
            label: "Stock Keluar",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "stok_akhir_per_gudang",
            label: "Stock Akhir",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "user",
            label: "User",
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
      barang: {required},
      gudang: {required},
    },
  },
  watch: {
    currentPage: function (newVal, oldVal) {
      if (oldVal != newVal) {
        console.log(this.currentPage);
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
      vm.tgl_awal = moment(new Date()).format("YYYY-MM-DD")
      vm.tgl_awal_ph = moment(new Date()).format("YYYY-MM-DD")
      vm.tgl_akhir = moment(new Date()).format("YYYY-MM-DD")
      vm.tgl_akhir_ph = moment(new Date()).format("YYYY-MM-DD")
      let list_gudang = await this.$_api.post("msGudang/list");
      vm.list_gudang = list_gudang.status == 200 ? list_gudang.data.map(x => { return x }) : []

      let list_barang = await this.$_api.post("msBarang/list");
      vm.list_barang = list_barang.status == 200 ? list_barang.data.map(x => { return x }) : []
      console.log(vm.list_barang);
      console.log(vm.list_gudang);
      
    },
    async getDataSearch() {
      let vm = this
      await this.v$.$touch();
      if (vm.isValid && vm.isDirty) {
        vm.ms_barang_id = vm.barang.ms_barang_id
        vm.ms_gudang_id = vm.gudang.id
        console.log(vm.data, 'ini datanya');
        axios.post("stock/kartuStok", {
          halaman: vm.currentPage,
          jumlah: vm.perPage,
          ms_barang_id: vm.ms_barang_id,
          ms_gudang_id: vm.ms_gudang_id,
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
                x.tgl_transaksinya = moment(x.tgl_transaksi).format("DD-MM-YYYY HH:mm")
                // x.tgl_dibuatnya = moment(x.createdAt).format("DD-MM-YYYY")
              }
            }
          })
          .catch((err) => {
          console.log(err, 'ini err');
        })
      } else {
        console.log('itikiwir');
        this.showError = true;
      }
      
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
