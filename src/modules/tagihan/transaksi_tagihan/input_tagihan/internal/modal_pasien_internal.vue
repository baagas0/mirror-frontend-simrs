<template>
  <b-modal id="modal-pasien-internal" size="xl" title="List Kunjungan (Pasien Internal)" header-bg-variant="success"
    header-text-variant="light" @show="getDataSearch()">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="2" sm="2" md="2" lg="2">
              <label for="no_rm">No. RM</label>
              <b-form-input id="no_rm" v-model="filter.no_rm" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="2" sm="2" md="2" lg="2">
              <label for="no_kunjungan">No. Kunjungan</label>
              <b-form-input id="no_kunjungan" v-model="filter.no_kunjungan" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nik">NIK</label>
              <b-form-input id="nik" v-model="filter.nik" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nama">Nama Pasien</label>
              <b-form-input id="nama" v-model="filter.nama" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="jenis_layanan">Jenis Layanan</label>
              <multiselect id="jenis_layanan" v-model="filter.jenis_layanan" :options="list_jenis_layanan"
                :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false"
                label="nama_jenis_layanan" track-by="id" placeholder="Jenis Layanan"></multiselect>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="tanggal_awal">Awal</label>
              <date-picker id="tanggal_awal" style="width: 100%" format="DD-MM-YYYY" placeholder="akhir"
                v-model="filter.tanggal_awal"></date-picker>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="tanggal_akhir">Akhir</label>
              <date-picker id="tanggal_akhir" style="width: 100%" format="DD-MM-YYYY" placeholder="akhir"
                v-model="filter.tanggal_akhir"></date-picker>
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
              <b-table :items="items" :fields="fields" responsive show-empty small bordered striped hover
                :busy="tableBusy">
                <template #cell(actions)="item">
                  <b-button v-if="dataHeader.pilih == 'pilihPasienInternalHeader'" variant="success"
                    :title="'Pilih Pasien'" @click="pilihHeader(item.item)">
                    <i class="ri-checkbox-circle-line"></i> {{ item.actions }}
                  </b-button>
                  <b-button v-if="dataHeader.pilih == 'pilihPasienInternal'" variant="success" :title="'Tambah Pasien'"
                    @click="pilih(item.item)">
                    <i class="ri-checkbox-circle-line"></i> {{ item.actions }}
                  </b-button>
                </template>
              </b-table>
            </b-col>
            <b-col md="5" offset-md="7">
              <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                size="sm"></b-pagination>
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
  components: {
  },
  emit: ['changeVar', 'resetData', 'auto'],
  props: ['dataHeader', 'list_jenis_layanan', 'list_asuransi', 'list_kelas_kunjungan'],
  data() {
    return {
      optionsStatusPasien: [
        { value: '0', text: 'Tidak Aktif' },
        { value: '1', text: 'Aktif' }
      ],
      // tabel
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: {
        no_rm: null,
        no_kunjungan: null,
        nama: null,
        nik: null,
        jenis_layanan: null,
        ms_jenis_layanan_id: null,
        tanggal_awal: null,
        tanggal_akhir: null
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
          key: 'nama_jenis_layanan',
          label: 'Jenis Layanan',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_tgl_registrasi',
          label: 'Tanggal Kunjungan',
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'table-option-2 text-center'
        }
      ]
    }
  },
  watch: {
    'currentPage'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    },
    'perPage'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDataSearch()
      }
    },
    // 'filter.no_rm'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.getDataSearch()
    //   }
    // },
    // 'filter.no_kunjungan'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.getDataSearch()
    //   }
    // },
    // 'filter.nama'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.getDataSearch()
    //   }
    // },
    // 'filter.nik'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.getDataSearch()
    //   }
    // },
    // 'filter.tanggal_awal'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.getDataSearch()
    //   }
    // },
    // 'filter.tanggal_akhir'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.getDataSearch()
    //   }
    // },
    // 'filter.jenis_layanan'(newVar, oldVar) {
    //   if (newVar !== oldVar) {
    //     this.filter.ms_jenis_layanan_id = newVar.id
    //     this.getDataSearch()
    //   }
    // }
  },
  methods: {
    async openModal() {
      this.getDataSearch()
    },
    async getDataSearch() {
      const vm = this
      vm.tableBusy = true
      this.$_api.post('registrasi/listRegistrasiNonTagihanPerHalaman', {
        ...vm.filter,
        // ms_jenis_layanan_id: vm.dataHeader.jenis_layanan ? vm.dataHeader.jenis_layanan.id : null,
        // ms_asuransi_id: vm.dataHeader.asuransi ? vm.dataHeader.asuransi.id : null,
        jumlah: vm.perPage,
        halaman: vm.currentPage
      }).then((registrasi) => {
        console.log(registrasi);
        if (registrasi.status === 200) {
          vm.items = registrasi.data.map((item, idx) => {
            return {
              no: idx + 1 + (this.currentPage - 1) * this.perPage,
              nama_tgl_registrasi: item.tgl_registrasi ? moment(item.tgl_registrasi).format('YYYY-MM-DD') : '-',
              nama_jenis_kelamin: item.jenis_kelamin === 'L' ? 'Laki Laki' : 'Perempuan',
              nama_status_pasien: item.status_pasien === 1 ? 'Aktif' : 'Tidak Aktif',
              ...item
            }
          })
          vm.totalRows = parseInt(registrasi.count)
        }
        vm.tableBusy = false
      })
    },
    async pilihHeader(data) {
      // console.log('========== pilih pasien internal header ==========')
      const vm = this
      vm.busy = true
      // vm.$emit('resetData')
      const dataHeader = vm.parse(vm.dataHeader)
      dataHeader.no_rm = data.no_rm
      dataHeader.ms_asuransi_id = data.ms_asuransi_id
      dataHeader.kelas_kunjungan_id = data.kelas_kunjungan_id
      dataHeader.ms_jenis_layanan_id = data.ms_jenis_layanan_id
      dataHeader.no_asuransi = data.no_asuransi_registrasi
      dataHeader.no_npwp_tagihan = data.npwp
      dataHeader.no_sep_tagihan = data.no_sep
      dataHeader.nama_tagihan = data.nama_lengkap
      dataHeader.tgl_lahir = new Date(data.tgl_lahir)
      dataHeader.pasien_id = data.pasien_id
      dataHeader.registrasi_id = data.registrasi_id
      dataHeader.tgl_tagihan = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      dataHeader.usia_pasien_tagihan = moment.duration(moment().diff(data.tgl_lahir)).years()
      // jenis
      if (dataHeader.ms_jenis_layanan_id) {
        const index = vm.list_jenis_layanan.findIndex(x => x.id === dataHeader.ms_jenis_layanan_id)
        if (index !== -1) dataHeader.jenis_layanan = vm.list_jenis_layanan[index]
      }
      // asuransi
      if (dataHeader.ms_asuransi_id) {
        const index = vm.list_asuransi.findIndex(x => x.id === dataHeader.ms_asuransi_id)
        if (index !== -1) dataHeader.asuransi = vm.list_asuransi[index]
      }
      // kelas kunjungan
      if (dataHeader.kelas_kunjungan_id) {
        const index = vm.list_kelas_kunjungan.findIndex(x => x.kelas_kunjungan_id === dataHeader.kelas_kunjungan_id)
        if (index !== -1) dataHeader.kelas_kunjungan = vm.list_kelas_kunjungan[index]
      }
      // console.log(dataHeader)
      vm.$emit('changeVar', { to: 'dataHeader', data: dataHeader })
      // internal
      vm.$emit('changeVar', { to: 'listInternal', data: [data] })

      console.log(data, 'data pilihheader');
      console.log(dataHeader, 'dataHeader pilihheader');

      // penjualan
      this.$_api.post('penjualan/list', { registrasi_id: data.registrasi_id }).then((penjualan) => {
        console.log(penjualan, 'penjualan list');
        if (penjualan.status === 200) {
          vm.$emit('changeVar', {
            to: 'listPenjualan',
            data: penjualan.data.map(x => {
              return {
                ...x,
                nama_total_penjualan: vm.toNumeric(x.total_penjualan, 'idr'),
                jumlah: x.total_penjualan + x.discount - x.tax
              }
            })
          })
        } else {
          this.$_alert.error({}, penjualan.message)
        }
        vm.$bvModal.hide('modal-pasien-internal')
        vm.busy = false
      })
    },
    async pilih(data) {
      console.log('pilihPasienInternalHeader', data)
      const vm = this
      // console.log('pilihInternal', data)
      this.$_api.post('poolRegistrasi/register', {
        registrasi_id: data.registrasi_id,
        tagihan_id: vm.dataHeader.tagihan_id
      }).then((register) => {
        if (register.status === 200) {
          this.$_alert.success('Berhasil Menambahkan Internal Pada Tagihan')
          vm.$bvModal.hide('modal-pasien-internal')
          vm.$emit('auto', { reset: false })
        }
      })
    },
    refresh() {
      this.filter = {
        no_rm: null,
        no_kunjungan: null,
        nama: null,
        nik: null,
        jenis_layanan: null,
        ms_jenis_layanan_id: null,
        tanggal_awal: null,
        tanggal_akhir: null
      }
      this.getDataSearch()
    },
    parse(data) {
      return JSON.parse(JSON.stringify(data))
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
