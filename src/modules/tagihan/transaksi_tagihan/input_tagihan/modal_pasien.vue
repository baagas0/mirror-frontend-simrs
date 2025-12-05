<template>
  <b-modal
    id="modal-pasien"
    size="xl"
    title="List Pasien"
    header-bg-variant="success"
    header-text-variant="light"
    @show="openModal()"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="no_rm">No RM</label>
              <b-form-input
                id="no_rm"
                v-model="filter.no_rm"
                :disabled="tableBusy"
                @keydown.prevent.enter="getDataSearch()"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="nama_lengkap">Nama Pasien</label>
              <b-form-input
                id="nama_lengkap"
                v-model="filter.nama_lengkap"
                :disabled="tableBusy"
                @keydown.prevent.enter="getDataSearch()"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="nik">NIK</label>
              <b-form-input
                id="nik"
                v-model="filter.nik"
                :disabled="tableBusy"
                @keydown.prevent.enter="getDataSearch()"
              ></b-form-input>
            </b-col>
            <b-col cols="3" md="3" lg="3">
              <label>Status Pasien</label>
              <b-form-select
                v-model="filter.status_pasien"
                :options="optionsStatusPasien"
                :disabled="tableBusy"
                @change="getDataSearch()"
              ></b-form-select>
            </b-col>
          </b-row>

          <b-row align-h="end" align-v="center" class="mt-3 mb-4 mr-2">
            <b-col cols="auto">
              <b-row>
                <b-col cols="auto" class="m-0 p-0 mr-2">
                  <router-link :to="'../../pasien/rekam_medis'">
                    <b-button variant="success">
                      Buat Rekam Medis Baru
                    </b-button>
                  </router-link>
                </b-col>
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
                    v-b-tooltip.hover title="'Pilih Data'"
                    @click="$emit('pilihPasien', item.item), $bvModal.hide('modal-pasien')"
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
export default {
  emit: ['pilihPasien'],
  data () {
    return {
      filter: {
        no_rm: null,
        nama_lengkap: null,
        nik: null,
        status_pasien: null
      },
      optionsStatusPasien: [
        {value: '0', text: 'Tidak Aktif'},
        {value: '1', text: 'Aktif'}
      ],
      // tabel
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
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
          key: 'nama_status_pasien',
          label: 'Status',
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'nama_jenis_kelamin',
          label: 'Jenis Kelamin',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_tanggal_lahir',
          label: 'Tanggal Lahir',
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
    }
  },
  methods: {
    async openModal () {
      this.getDataSearch()
    },
    getDataSearch () {
      const vm = this
      // console.log(vm.filter)
      vm.tableBusy = true
      this.$_api.post('pasien/listPerhalaman', {...vm.filter, halaman: vm.currentPage, jumlah: vm.perPage})
        .then((res) => {
          // console.log(res, "ini ress");
          vm.items = res.status === 200 ? res.data.map((item, idx) => {
            return {
              no: idx + 1 + (this.currentPage - 1) * this.perPage,
              nama_tanggal_lahir: item.tgl_lahir ? moment(item.tgl_lahir).format('YYYY-MM-DD') : '-',
              nama_jenis_kelamin: item.jenis_kelamin === 'L' ? 'Laki Laki' : 'Perempuan',
              nama_status_pasien: item.status_pasien === 1 ? 'Aktif' : 'Tidak Aktif',
              ...item
            }
          }) : []
          // console.log(vm.items)
          // vm.totalRows = parseInt(res.data.count)
          vm.totalRows = parseInt(res.count)
          vm.tableBusy = false
        })
    },
    refresh () {
      this.filter = {
        no_rm: null,
        nama_lengkap: null,
        nik: null,
        status_pasien: null
      }
      this.getDataSearch()
    }
  }
}
</script>
