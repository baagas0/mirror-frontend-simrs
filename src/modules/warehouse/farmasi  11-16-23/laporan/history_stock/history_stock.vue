<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>History Stock</strong>
              </h5>
            </template>
            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-button variant="primary" v-b-modal.modal-form @click="is_data = ''"
                  ><i class="ri-add-circle-line p-0"></i> Tambah Data</b-button
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="12" lg="12">
                <hr />
              </b-col>
            </b-row>

            <b-alert dismissible fade :show="showing" :variant="variant">{{ msg }}</b-alert>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  class=""
                  label=""
                  label-for="filter-input"
                  label-cols-md="0"
                  label-align-md="right"
                  label-size="xl"
                >
                  <div class="d-flex">
                    <div class="mr-2 w-100">
                      <date-picker
                        id="tgl_awal"
                        style="width: 100%"
                        format="DD-MM-YYYY"
                        placeholder="awal"
                        v-model="filter.tgl_awal"
                      ></date-picker>
                    </div>
                    <div class="mr-2 w-100">
                      <date-picker
                        id="tgl_akhir"
                        style="width: 100%"
                        format="DD-MM-YYYY"
                        placeholder="akhir"
                        v-model="filter.tgl_akhir"
                      ></date-picker>
                    </div>
                    <div class="mr-2 w-100">
                      <multiselect
                        id="gudang"
                        v-model="filter.gudang"
                        :options="list_gudang"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="nama_gudang"
                        track-by="id"
                        placeholder="gudang"
                      ></multiselect>
                    </div>
                    <!-- <div class="w-100">
                      <b-form-input
                        id="nama_gudang"
                        placeholder="gudang"
                        v-model="filter.nama_gudang"
                        debounce="500"
                      ></b-form-input>
                    </div> -->
                    <!-- <div class="w-100">
                      <multiselect
                        id="barang"
                        v-model="filter.barang"
                        :options="list_barang"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="nama_barang"
                        track-by="id"
                        placeholder="barang"
                      ></multiselect>
                    </div> -->
                    <div class="w-100">
                      <b-form-input
                        id="nama_barang"
                        placeholder="barang"
                        v-model="filter.nama_barang"
                        debounce="500"
                      ></b-form-input>
                    </div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col>
                <div class="d-flex justify-content-end">
                  <b-button
                    size="sm"
                    variant="danger"
                    class="mx-1"
                    v-b-tooltip.hover="'reset'"
                    @click="filter = {}"
                  >Reset</b-button>
                  <!-- <CIcon name="cil-trash"/></b-button> -->
                </div>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col md="3">
                <b-form-group
                  label="Per Halaman"
                  label-for="per-page-select"
                  label-cols-md="6"
                  label-align-md="left"
                  label-size="md"
                  style="background-color: "
                >
                  <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="md"
                  ></b-form-select>
                </b-form-group>
              </b-col>

              <!-- <b-col md="9">
                
              </b-col> -->
            </b-row>

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-table
                  :items="items"
                  :fields="fields"
                  responsive
                  show-empty
                  small
                  bordered
                  striped
                  hover
                  :busy="tableBusy"
                  style="white-space:nowrap;"
                >
                  <template #cell(actions)="item">
                    <div class="text-nowrap">
                      <b-button
                        variant="primary"
                        class="mx-1"
                        v-b-tooltip.hover="'Detail'"
                        v-b-modal.modal-delete
                        @click="is_data = item.item"
                        ><i class="ri-information-line"></i> {{ item.actions }}</b-button
                      >
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="5" offset-md="7">
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
    </b-container>
  </div>
</template>
  
<script>
  import axios from "axios";
  import moment from 'moment';
  moment.locale('id');
  import { ipBackend } from "@/ipBackend";
  import Multiselect from "vue-multiselect";
  import DatePicker from "vue2-datepicker";
  import 'vue2-datepicker/index.css';
  
  export default {
    components: {
      Multiselect,
      DatePicker,
    },
    name: "master_etnis",
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        is_data: "",
        fields: [
          {
            key: "no",
            label: "No",
            sortDirection: "desc",
            sortable: false,
            class: "table-number text-center",
          },
          {
            key: "nama_barang",
            label: "Barang",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_gudang",
            label: "Gudang",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "kode_batch",
            label: "Kode Batch",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "tipe_transaksi",
            label: "Tipe Transaksi",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          // {
          //   key: "debit_kredit",
          //   label: "Debit Kredit",
          //   sortable: false,
          //   sortDirection: "desc",
          //   class: "text-left",
          // },
          {
            key: "nama_stok_awal_per_gudang",
            label: "Stok Awal Gudang",
            sortable: false,
            sortDirection: "desc",
            class: "text-right",
          },
          {
            key: "nama_stok_akhir_per_gudang",
            label: "Stok Akhir Gudang",
            sortable: false,
            sortDirection: "desc",
            class: "text-right",
          },
          {
            key: "nama_stok_awal_per_batch",
            label: "Stok Awal Batch",
            sortable: false,
            sortDirection: "desc",
            class: "text-right",
          },
          {
            key: "nama_stok_akhir_per_batch",
            label: "Stok Akhir Batch",
            sortable: false,
            sortDirection: "desc",
            class: "text-right",
          },
          {
            key: "nama_qty",
            label: "QTY",
            sortable: false,
            sortDirection: "desc",
            class: "text-right",
          },
          {
            key: "nama_harga_pokok_awal",
            label: "HPP Awal",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_pokok_akhir",
            label: "HPP Akhir",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_tgl_transaksi",
            label: "Tanggal",
            sortable: false,
            sortDirection: "desc",
            class: "text-left",
          },
          // {
          //   key: "actions",
          //   label: "Actions",
          //   class: "text-center",
          // },
        ],
        items: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: {},
        filterOn: [],
        tableBusy: false,
        list_gudang: [],
        list_supplier: [],
        list_barang: [],
        list_satuan_barang: [],
      };
    },
    computed: {
    },
    watch: {
      currentPage(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.getDatas()
        }
      },
      perPage(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.getDatas()
        }
      },
      'filter.tgl_awal'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.tgl_akhir'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.gudang'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.barang'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.nama_gudang'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.nama_barang'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      this.getDatas();
    },
    methods: {
      // onFiltered(filteredItems) {
      //   // Trigger pagination to update the number of buttons/pages due to filtering
      //   this.totalRows = filteredItems.length;
      //   this.currentPage = 1;
      // },
      async openPembelian(x){
        const vm = this
        vm.is_data = x
        // console.log(x)
        await new Promise(resolve => setTimeout(resolve, 100));
        !x.tgl_faktur ? vm.$bvModal.show('modal-accept-pembelian') : vm.$bvModal.show('modal-form-pembelian')
      },
      havePembelian(x){
        //jika sudah dibuatkan pembelian
        return x && x.tgl_faktur ? true : false
      },
      async getDatas() {
        const vm = this
        vm.tableBusy = true;
        vm.filter.ms_barang_id = vm.filter.barang ? vm.filter.barang.id : null
        vm.filter.ms_gudang_id = vm.filter.gudang ? vm.filter.gudang.id : null
        let historyInventory = await this.$_api.post("historyInventory/listPerHalaman", {
          jumlah: vm.perPage, 
          halaman: vm.currentPage, 
          ...vm.filter,
          // tgl_awal: vm.filter.tgl_awal ? moment(vm.filter.tgl_awal).format('YYYY-MM-DD'):undefined,
          tgl_akhir: vm.filter.tgl_akhir ? moment(vm.filter.tgl_akhir).add(23, 'hours').add(59, 'minutes'):undefined,
        });
        vm.totalRows = Number.parseInt(historyInventory.count)
        console.log('historyInventory ', historyInventory)
        this.items = historyInventory.data;
        for (let i = 0; i < this.items.length; i++) {
          let x = this.items[i];
          x.no = i + 1 + (vm.perPage * (vm.currentPage - 1));
          x.nama_tgl_po = moment(x.tgl_po).format('dddd, DD-MM-YYYY')

          x.nama_tgl_transaksi = moment(x.tgl_transaksi).format('DD-MM-YYYY')
          // x.nama_tgl_transaksi = moment(x.tgl_transaksi).format('dddd, DD-MM-YYYY')
          x.nama_harga_pokok_awal = vm.toNumeric(x.harga_pokok_awal, 'idr')
          x.nama_harga_pokok_akhir = vm.toNumeric(x.harga_pokok_akhir, 'idr')
          x.nama_qty = vm.toNumeric(x.qty)
          x.nama_stok_awal_per_gudang = vm.toNumeric(x.stok_awal_per_gudang)
          x.nama_stok_akhir_per_gudang = vm.toNumeric(x.stok_akhir_per_gudang)
          x.nama_stok_awal_per_batch = vm.toNumeric(x.stok_awal_per_batch)
          x.nama_stok_akhir_per_batch = vm.toNumeric(x.stok_akhir_per_batch)
        }
        //gudang
        let list_gudang = await this.$_api.post("msGudang/list");
        this.list_gudang = list_gudang.status == 200 ? list_gudang.data.map(x => { return x }) : []
        //barang
        let list_barang = await this.$_api.post("msBarang123123/list");
        this.list_barang = list_barang.status == 200 ? list_barang.data.map(x => { return x }) : []
        this.tableBusy = false;
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
      toNumeric(number, type){
        let data = {}
        if(type == 'idr') data = {style: 'currency', currency: 'IDR'}
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    },
  };
</script>

<style scoped>
  .visible {
    visibility: visible !important;
  }
  .invisible {
    visibility: hidden !important;
  }

</style>
  