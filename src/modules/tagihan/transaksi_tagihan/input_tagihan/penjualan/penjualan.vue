<template>
  <div class="w-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
              <b-row>
                <b-col class="align-self-center">
              <h2 class="mb-0">
                <strong>Penjualan</strong>
              </h2>
            </b-col>
            </b-row>
      </template>
      <b-row style="row-gap: 25px;">
        <b-col cols="12" md="12" lg="12">
          <b-table :items="listPenjualan" :fields="fields" :current-page="currentPage" :per-page="perPage"
            :filter="filter" :filter-included-fields="filterOn" responsive show-empty small @filtered="onFiltered"
            bordered striped hover :busy="busy" style="white-space:nowrap;" class="">
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(no_rm)="item">
              {{ isInternal ? item.item.no_rm : item.item.no_rm_penjualan_external }}
            </template>
            <template #cell(is_external)="item">
              <!-- <b-button v-if="item.item.is_external" type="button" class="btn btn-info" title="'External'"></b-button>
              <b-button v-else type="button" class="btn btn-success" title="'Internal'"></b-button> -->
              <span class="badge badge-primary" v-if="item.item.is_external">External</span>
              <span class="badge badge-success" v-else>Internal</span>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
        </b-col>
        <b-col md="5" offset-md="5">
          <b-pagination class="m-0 p-0" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
            size="sm"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal id="modal-open-delete-penjualan" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning"
      header-text-variant="light">
      <p>Apakah anda yakin ingin menghapus penjualan ini?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-delete-penjualan')">
          Tidak
        </b-button>
        <b-button variant="warning" @click="deletePenjualan(data)" :disabled="busy">
          Ya
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'master_etnis',
  emits: ['resetData', 'changeVar'],
  props: ['dataHeader', 'dataTagihan', 'listPenjualan', 'listBarang', 'listJasa', 'listFasilitas', 'isInternal'],
  data() {
    return {
      showing: false,
      variant: 'success',
      msg: '',
      busy: false,
      fields: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          sortable: false,
          class: 'table-number text-center'
        },
        {
          key: 'kode_penjualan',
          label: 'No Penjualan',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'no_rm',
          label: 'No Rm',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'no_kunjungan',
          label: 'No Kunjungan',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama',
          label: 'Pasien',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'NIK',
          label: 'NIK',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_jenis_layanan',
          label: 'Jenis Layanan',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_kelas_kunjungan',
          label: 'Kelas Kunjungan',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_asuransi',
          label: 'Asuransi',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_total_penjualan',
          label: 'Total',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'is_external',
          label: 'Pasien',
          class: 'table-option-2 text-center'
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      pageOptions: [10, 25, 50, 100]
    }
  },
  watch: {
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getDatas() {
      // const vm = this
      // console.log()
    },
    triggerAlert(event) {
      let vm = this
      vm.$store.commit('set_alert', event)
    },
    toNumeric(number, type) {
      let data = {}
      if (type === 'no-idr') {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number).slice(3)
      } else {
        if (type === 'idr') data = { style: 'currency', currency: 'IDR' }
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    }
  }
}
</script>
