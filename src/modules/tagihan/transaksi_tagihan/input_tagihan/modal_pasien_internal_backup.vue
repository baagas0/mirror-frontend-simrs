<template>
  <b-modal
    id="modal-pasien-internal"
    size="xl"
    title="List Kunjungan (Pasien Internal)"
    header-bg-variant="success"
    header-text-variant="light"
    @show="openModal()"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="4" sm="4" md="4" lg="4">
              <s-input v-model="filter.no_rm" :item="{
                label: 'No. RM',
                id: 'no_rm',
                data: 'no_rm',
                type: 'text',
                validation: []
              }" :valuee="no_rm"></s-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <s-input v-model="filter.no_kunjungan" :item="{
                label: 'No. Kunjungan',
                id: 'no_kunjungan',
                data: 'no_kunjungan',
                type: 'text',
                validation: []
              }" :valuee="no_kunjungan"></s-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <s-input v-model="filter.nama" :item="{
                label: 'Nama Pasien',
                id: 'nama',
                data: 'nama',
                type: 'text',
                validation: []
              }" :valuee="nama"></s-input>
              <label for="nama">Nama Pasien</label>
            </b-col>
          </b-row>

          <b-row align-h="end" align-v="center" class="mt-3 mb-4 mr-2">
            <b-col cols="auto">
              <b-row>
                <b-col cols="auto" class="m-0 p-0 mr-2">
                  <b-button @click="refresh()" :disabled="tableBusy" variant="danger">
                    Reset
                  </b-button>
                </b-col>
                <b-col cols="auto" class="m-0 p-0">
                  <b-button @click="getDataSearch()" :disabled="tableBusy" variant="success">
                    Cari
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <hr>
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
              >
                <template #cell(actions)="item">
                  <b-button
                    variant="success"
                    v-b-tooltip.hover title="'Pilih Pasien'"
                    @click="$emit(dataHeader.pilih, item.item), $bvModal.hide('modal-pasien-internal')"
                  >
                    <i class="ri-checkbox-circle-line"></i> {{ item.actions }}
                  </b-button>
                </template>
              </b-table>
            </b-col>
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
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import moment from 'moment'
import Multiselect from 'vue-multiselect'
export default {
  emit: ['pilihPasienInternal', 'pilihPasienInternalHeader'],
  props: ['dataHeader'],
  components: {
    Multiselect
  },
  data () {
    return {
      optionsStatusPasien: [
        {value: '0', text: 'Tidak Aktif'},
        {value: '1', text: 'Aktif'}
      ],
      // tabel
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: {
        no_rm: null,
        no_kunjungan: null,
        nama: null
      },
      pageOptions: [10, 25, 50, 100],
      tableBusy: false,
      fields: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          class: 'table-number text-center'
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'table-option-2 text-center'
        },
        {
          key: 'no_rm',
          label: 'No. RM',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'no_kunjungan',
          label: 'No. Kunjungan',
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
          key: 'nama_tgl_registrasi',
          label: 'Tanggal Kunjungan',
          sortDirection: 'desc',
          class: 'text-left'
        }
      ]
    }
  },
  watch: {
    'currentPage' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    },
    'perPage' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    },
    'filter.no_rm' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    },
    'filter.no_kunjungan' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    },
    'filter.nama' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    }
  },
  methods: {
    async openModal () {
      this.getDataSearch()
    },
    getDataSearch () {
      const vm = this
      vm.tableBusy = true
      this.$_api.post('registrasi/listPerHalaman', {
        ...vm.filter,
        ms_jenis_layanan_id: vm.dataHeader.jenis_layanan ? vm.dataHeader.jenis_layanan.id : null,
        ms_asuransi_id: vm.dataHeader.asuransi ? vm.dataHeader.asuransi.id : null,
        jumlah: vm.perPage,
        halaman: vm.currentPage
      })
        .then((res) => {
          // console.log('registrasi/listPerHalaman', res);
          vm.items = res.status === 200 ? res.map((item, idx) => { return {
            no: idx + 1 + (this.currentPage - 1) * this.perPage,
            nama_tgl_registrasi: item.tgl_registrasi ? moment(item.tgl_registrasi).format('YYYY-MM-DD') : '-',
            nama_jenis_kelamin: item.jenis_kelamin === 'L' ? 'Laki Laki' : 'Perempuan',
            nama_status_pasien: item.status_pasien === 1 ? 'Aktif' : 'Tidak Aktif',
            ...item
          }}) : []
          vm.totalRows = parseInt(res.count)
          vm.tableBusy = false
        })
    },
    refresh () {
      this.filter = {
        no_rm: null,
        no_kunjungan: null,
        nama: null
      }
      this.getDataSearch()
      // listRegistrasiNonTagihanPerHalaman
    }
  }
}
</script>