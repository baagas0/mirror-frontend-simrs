<template>
  <div class="w-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>Internal</strong>
        </h5>
      </template>
      <b-row style="row-gap: 25px;">
        <b-col cols="12" v-if="isDraft == 1">
          <div class="d-flex justify-content-end">
            <b-button variant="success"
              @click="dataHeader.pilih = 'pilihPasienInternal', $bvModal.show('modal-pasien-internal')">Tambah
              Internal</b-button>
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="12">
          <b-table :items="listInternal" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
            :filter-included-fields="filterOn" responsive show-empty small @filtered="onFiltered" bordered striped hover
            :busy="busy" style="white-space:nowrap;" class="">
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(is_external)="item">
              <b-button v-if="item.item.is_external" type="button" class="btn btn-info" v-b-tooltip.hover
                title="'External'"></b-button>
              <b-button v-else type="button" class="btn btn-success" v-b-tooltip.hover title="'Internal'"></b-button>
            </template>
            <template #cell(actions)="item">
              <div v-if="item.item.pool_registrasi_id">
                <b-button @click="$bvModal.show('modal-open-ismain-internal'), data = item.item"
                  :variant="item.item.is_main ? 'primary' : 'success'" size="sm" class="mr-2"
                  :disabled="item.item.is_main || isDraft > 1"><i class="ri-checkbox-circle-line"></i></b-button>
                <b-button @click="$bvModal.show('modal-open-delete-internal'), data = item.item" variant="danger"
                  size="sm" :disabled="isDraft > 1"><i class="ri-delete-bin-2-line"></i></b-button>
              </div>
            </template>
            <template #cell(tgl_registrasi)="item">
              <div>
                {{ item.item.tgl_registrasi ? moment(item.item.tgl_registrasi).format('DD MMM YYYY') : '' }}
              </div>
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
    <b-modal id="modal-open-ismain-internal" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning"
      header-text-variant="light">
      <p>Apakah anda yakin ingin mengubah internal ini menjadi yang utama?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-ismain-internal')">
          Tidak
        </b-button>
        <b-button variant="warning" @click="ismainInternal(data)" :disabled="busy">
          Ya
        </b-button>
      </template>
    </b-modal>
    <b-modal id="modal-open-delete-internal" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning"
      header-text-variant="light">
      <p>Apakah anda yakin ingin menghapus internal ini?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-delete-internal')">
          Tidak
        </b-button>
        <b-button variant="warning" @click="deleteInternal(data)" :disabled="busy">
          Ya
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  components: {
    // // Multiselect,
    // DatePicker,
  },
  name: 'master_etnis',
  emits: ['resetData', 'changeVar', 'auto'],
  props: ['dataHeader', 'isDraft', 'dataTagihan', 'listInternal', 'listBarang', 'listJasa', 'listFasilitas'],
  data() {
    return {
      moment: moment,
      showing: false,
      variant: 'success',
      msg: '',
      busy: false,
      fields: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          class: 'table-number text-center'
        },
        {
          key: 'no_rm',
          label: 'No RM',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'no_kunjungan',
          label: 'No Kunjungan',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_jenis_layanan',
          label: 'Jenis Layanan',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nik',
          label: 'NIK',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_lengkap',
          label: 'Nama Pasien',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'tgl_registrasi',
          label: 'Tanggal Kunjungan',
          sortDirection: 'desc',
          class: 'text-left',
        },
        {
          key: 'actions',
          label: 'Actions',
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
      // //console.log()
    },
    async deleteInternal(data) {
      const vm = this
      // console.log('deleteInternal', data)
      this.$_api.post('poolRegistrasi/delete', { id: data.pool_registrasi_id }).then((register) => {
        if (register.status === 200) {
          this.$_alert.success('Berhasil Menghapus Internal')
          vm.$bvModal.hide('modal-open-delete-internal')
          vm.$emit('auto', { reset: false })
        }
      })
    },
    async ismainInternal(data) {
      const vm = this
      // console.log('ismainInternal', data)
      // id, registrasi_id, tagihan_id, is_main
      this.$_api.post('poolRegistrasi/changeMain', { id: data.pool_registrasi_id, registrasi_id: data.registrasi_id, tagihan_id: data.tagihan_id, is_main: true }).then((register) => {
        if (register.status === 200) {
          this.$_alert.success('Berhasil Mengubah Internal Utama')
          vm.$bvModal.hide('modal-open-ismain-internal')
          vm.$emit('auto', { reset: false })
        }
      })
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
