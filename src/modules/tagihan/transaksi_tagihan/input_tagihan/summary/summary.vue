<template>
  <div class="w-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>Summary</strong>
        </h5>
      </template>
      <b-row>
        <b-col cols="12" class="mt-4 my-3 btn-group w-100">
          <button @click="tab = 1" class="btn" :class="tab === 1 ? 'btn-success' : 'btn-outline-success' " type="button">Barang</button>
          <button @click="tab = 2" class="btn" :class="tab === 2 ? 'btn-success' : 'btn-outline-success' " type="button">Jasa</button>
          <button @click="tab = 3" class="btn" :class="tab === 3 ? 'btn-success' : 'btn-outline-success' " type="button">Fasilitas</button>
          <button @click="tab = 4" class="btn" :class="tab === 4 ? 'btn-success' : 'btn-outline-success' " type="button">Penunjang</button>
        </b-col>
      </b-row>
      <div v-if="tab === 1">
        <!-- {{listBarang}} -->
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-table
              :items="listBarang"
              :fields="fields_barang"
              :current-page="current_page_barang"
              :per-page="per_page_barang"
              :filter="filter_barang"
              :filter-included-fields="filter_on_barang"
              responsive
              show-empty
              small
              @filtered="on_filtered_barang"
              bordered
              striped
              hover
              :busy="busy"
              style="white-space:nowrap;"
              class=""
            >
              <template #cell(no)="item">
                {{item.index+1}}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b-form-select
              id="per-page-select"
              v-model="per_page_barang"
              :options="page_options_barang"
              size="sm"
            ></b-form-select>
          </b-col>
          <b-col md="5" offset-md="5">
            <b-pagination
              class="m-0 p-0"
              v-model="current_page_barang"
              :total-rows="total_rows_barang"
              :per-page="per_page_barang"
              align="fill"
              size="sm"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>
      <div v-else-if="tab === 2">
        <!-- {{listJasa}} -->
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-table
              :items="listJasa"
              :fields="fields_jasa"
              :current-page="current_page_jasa"
              :per-page="per_page_jasa"
              :filter="filter_jasa"
              :filter-included-fields="filter_on_jasa"
              responsive
              show-empty
              small
              @filtered="on_filtered_jasa"
              bordered
              striped
              hover
              :busy="busy"
              style="white-space:nowrap;"
              class=""
            >
              <template #cell(no)="item">
                {{item.index+1}}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b-form-select
              id="per-page-select"
              v-model="per_page_jasa"
              :options="page_options_jasa"
              size="sm"
            ></b-form-select>
          </b-col>
          <b-col md="5" offset-md="5">
            <b-pagination
              class="m-0 p-0"
              v-model="current_page_jasa"
              :total-rows="total_rows_jasa"
              :per-page="per_page_jasa"
              align="fill"
              size="sm"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>
      <div v-else-if="tab === 3">
        <!-- {{listFasilitas}} -->
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-table
              :items="listFasilitas"
              :fields="fields_fasilitas"
              :current-page="current_page_fasilitas"
              :per-page="per_page_fasilitas"
              :filter="filter_fasilitas"
              :filter-included-fields="filter_on_fasilitas"
              responsive
              show-empty
              small
              @filtered="on_filtered_fasilitas"
              bordered
              striped
              hover
              :busy="busy"
              style="white-space:nowrap;"
              class=""
            >
              <template #cell(no)="item">
                {{item.index+1}}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b-form-select
              id="per-page-select"
              v-model="per_page_fasilitas"
              :options="page_options_fasilitas"
              size="sm"
            ></b-form-select>
          </b-col>
          <b-col md="5" offset-md="5">
            <b-pagination
              class="m-0 p-0"
              v-model="current_page_fasilitas"
              :total-rows="total_rows_fasilitas"
              :per-page="per_page_fasilitas"
              align="fill"
              size="sm"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>
      <div v-else-if="tab === 4">
        <!-- {{listPenunjang}} -->
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-table
              :items="listPenunjang"
              :fields="fields_penunjang"
              :current-page="current_page_penunjang"
              :per-page="per_page_penunjang"
              :filter="filter_penunjang"
              :filter-included-fields="filter_on_penunjang"
              responsive
              show-empty
              small
              @filtered="on_filtered_penunjang"
              bordered
              striped
              hover
              :busy="busy"
              style="white-space:nowrap;"
              class=""
            >
              <template #cell(no)="item">
                {{item.index+1}}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b-form-select
              id="per-page-select"
              v-model="per_page_penunjang"
              :options="page_options_penunjang"
              size="sm"
            ></b-form-select>
          </b-col>
          <b-col md="5" offset-md="5">
            <b-pagination
              class="m-0 p-0"
              v-model="current_page_penunjang"
              :total-rows="total_rows_penunjang"
              :per-page="per_page_penunjang"
              align="fill"
              size="sm"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
// import axios from "axios";
// // import { ipBackend } from "@/ipBackend";
// // import Multiselect from "vue-multiselect";
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";

export default {
  components: {
    // // Multiselect,
    // DatePicker,
  },
  name: 'master_etnis',
  emits: [ 'resetData', 'changeVar' ],
  props: [ 'dataHeader', 'listPenjualan', 'listBarang', 'listJasa', 'listFasilitas', 'listPenunjang' ],
  data () {
    return {
      showing: false,
      variant: 'success',
      msg: '',
      busy: false,
      tab: 1,
      // barang
      fields_barang: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          class: 'table-number text-center'
        },
        {
          key: 'kode_penjualan',
          label: 'ID. Penjualan',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_barang',
          label: 'Barang',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_satuan',
          label: 'Satuan',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_harga_barang_custom',
          label: 'Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_qty_barang',
          label: 'Quantity',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_total_harga_barang',
          label: 'Total Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        }
      ],
      total_rows_barang: 1,
      current_page_barang: 1,
      per_page_barang: 10,
      filter_barang: null,
      filter_on_barang: [],
      page_options_barang: [10, 25, 50, 100],
      fields_fasilitas: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          class: 'table-number text-center'
        },
        {
          key: 'kode_penjualan',
          label: 'ID. Penjualan',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_fasilitas',
          label: 'Fasilitas',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_harga_fasilitas_custom',
          label: 'Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_qty_fasilitas',
          label: 'Quantity',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_total_harga_fasilitas',
          label: 'Total Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        }
      ],
      total_rows_fasilitas: 1,
      current_page_fasilitas: 1,
      per_page_fasilitas: 10,
      filter_fasilitas: null,
      filter_on_fasilitas: [],
      page_options_fasilitas: [10, 25, 50, 100],
      fields_penunjang: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          class: 'table-number text-center'
        },
        {
          key: 'kode_penjualan',
          label: 'ID. Penjualan',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_penunjang',
          label: 'Penunjang',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_harga_custom_penjualan_penunjang',
          label: 'Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_qty_penjualan_penunjang',
          label: 'Quantity',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_total_harga_penjualan_penunjang',
          label: 'Total Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        }
      ],
      total_rows_penunjang: 1,
      current_page_penunjang: 1,
      per_page_penunjang: 10,
      filter_penunjang: null,
      filter_on_penunjang: [],
      page_options_penunjang: [10, 25, 50, 100],
      fields_jasa: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          class: 'table-number text-center'
        },
        {
          key: 'kode_penjualan',
          label: 'ID. Penjualan',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_jasa',
          label: 'Jasa',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_harga_jasa_custom',
          label: 'Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_qty_jasa',
          label: 'Quantity',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_total_harga_jasa',
          label: 'Total Harga',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        }
      ],
      total_rows_jasa: 1,
      current_page_jasa: 1,
      per_page_jasa: 10,
      filter_jasa: null,
      filter_on_jasa: [],
      page_options_jasa: [10, 25, 50, 100]
    }
  },
  watch: {
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    on_filtered_barang (filteredItems) {
      this.total_rows_barang = filteredItems.length
      this.current_page_barang = 1
    },
    on_filtered_fasilitas (filteredItems) {
      this.total_rows_fasilitas = filteredItems.length
      this.current_page_fasilitas = 1
    },
    on_filtered_penunjang (filteredItems) {
      this.total_rows_penunjang = filteredItems.length
      this.current_page_penunjang = 1
    },
    on_filtered_jasa (filteredItems) {
      this.total_rows_jasa = filteredItems.length
      this.current_page_jasa = 1
    },
    getDatas () {
      // const vm = this
      // console.log()
    },
    triggerAlert (event) {
      let vm = this
      vm.$store.commit('set_alert', event)
    },
    toNumeric (number, type) {
      let data = {}
      if (type === 'no-idr') {
        return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(number).slice(3)
      } else {
        if (type === 'idr') data = {style: 'currency', currency: 'IDR'}
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    }
  }
}
</script>
