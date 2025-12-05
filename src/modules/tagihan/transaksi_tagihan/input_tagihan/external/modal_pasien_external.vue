<template>
  <b-modal id="modal-pasien-external" size="xl" title="List Penjualan External" header-bg-variant="success"
    header-text-variant="light" @show="getDatas()">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="2" sm="2" md="2" lg="2">
              <label for="kode_penjualan">No. Penjualan</label>
              <b-form-input id="kode_penjualan" v-model="filter.kode_penjualan" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="2" sm="2" md="2" lg="2">
              <label for="no_rm_penjualan_external">No. Rm</label>
              <b-form-input id="no_rm_penjualan_external" v-model="filter.no_rm_penjualan_external"
                debounce="500"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nik">NIK</label>
              <b-form-input id="nik" v-model="filter.NIK" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nama">Nama Pasien</label>
              <b-form-input id="nama" v-model="filter.nama" debounce="500"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="jenis_layanan">Jenis Layanan</label>
              <multiselect id="jenis_layanan" v-model="filter.jenis_layanan" :options="list_jenis_layanan"
                :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false"
                label="nama_jenis_layanan" track-by="id" placeholder="Jenis Layanan" size="sm"></multiselect>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="tgl_awal">Tanggal Penjualan Awal</label>
              <date-picker id="tgl_awal" style="width: 100%" format="DD-MM-YYYY" placeholder="awal"
                v-model="filter.tgl_awal"></date-picker>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="tgl_akhir">Tanggal Penjualan Akhir</label>
              <date-picker id="tgl_akhir" style="width: 100%" format="DD-MM-YYYY" placeholder="akhir"
                v-model="filter.tgl_akhir"></date-picker>
            </b-col>
          </b-row>

          <b-row align-h="end" align-v="center" class="mt-3 mb-4 mr-2">
            <b-col cols="auto">
              <b-row>
                <b-col cols="auto" class="m-0 p-0 mr-2">
                  <b-button @click="resetData()" :disabled="tableBusy" variant="danger">
                    Reset
                  </b-button>
                </b-col>
                <b-col cols="auto" class="m-0 p-0">
                  <b-button @click="getDatas()" :disabled="tableBusy" variant="success">
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
                :busy="tableBusy" style="white-space:nowrap;">
                <template #cell(actions)="item">
                  <b-button v-if="dataHeader.pilih == 'pilihExternalHeader'" variant="success" v-b-tooltip.hover
                    title="'Pilih Data'" @click="pilihHeader(item.item)">
                    <i class="ri-checkbox-circle-line"></i> {{ item.actions }}
                  </b-button>
                  <b-button v-else-if="dataHeader.pilih == 'pilihExternal'" variant="success" v-b-tooltip.hover
                    title="'Tambah Data'" @click="pilih(item.item)">
                    <i class="ri-checkbox-circle-line"></i> {{ item.actions }}
                  </b-button>
                </template>
              </b-table>
            </b-col>

            <b-col md="2">
              <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
            </b-col>

            <b-col md="5" offset-md="5">
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
moment.locale('id')

export default {
  components: {
  },
  name: 'daftar_penjualan',
  emits: ['changeVar', 'resetData', 'auto'],
  props: ['dataHeader', 'listExternal', 'listPenjualan', 'listBarang', 'listJasa', 'listFasilitas', 'list_jenis_layanan', 'list_asuransi', 'list_kelas_kunjungan'],
  data() {
    return {
      showing: false,
      variant: 'success',
      msg: '',
      is_data: '',
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
          label: 'No. Penjualan',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'no_rm_penjualan_external',
          label: 'No. Rm',
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
          key: 'nama',
          label: 'Pasien',
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
          key: 'nama_tgl_penjualan',
          label: 'Tanggal Penjualan',
          class: 'table-option-2 text-center'
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'table-option-2 text-center'
        }
      ],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: {
        no_rm_penjualan_external: null,
        nama: null,
        NIK: null,
        tgl_awal: null,
        tgl_akhir: null,
        jenis_layanan: null
      },
      filterOn: [],
      tableBusy: false,
      list_gudang: []
    }
  },
  computed: {
  },
  watch: {
    currentPage(newVar, oldVar) {
      if (newVar !== oldVar && newVar) {
        this.getDatas()
      }
    },
    perPage(newVar, oldVar) {
      if (newVar !== oldVar && newVar) {
        this.getDatas()
      }
    },
    'filter.kelas_kunjungan'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.gudang'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.jenis_layanan'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.asuransi'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.no_rm_penjualan_external'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.no_penjualan'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.NIK'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.nama'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.kode_penjualan'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.tgl_awal'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.tgl_akhir'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    }
  },
  mounted() {
    this.getDatas()
  },
  methods: {
    openModal() {

    },
    async pilihHeader(data) {
      // console.log('pilihHeader', data)
      const vm = this
      const listPenjualan = JSON.parse(JSON.stringify(vm.listPenjualan))
      const dataHeader = JSON.parse(JSON.stringify(vm.dataHeader))
      // penjualan
      const index = listPenjualan.findIndex(item => item.penjualan_id == data.penjualan_id)
      if (index >= 0) {
        // jika penjualan sudah ada di list jual
        this.$_alert.error({}, 'Sudah Terdapat Pada Daftar Penjualan')
      } else {
        // header
        dataHeader.tgl_tagihan = new Date()
        dataHeader.nama_tagihan = data.nama
        dataHeader.no_rm = data.no_rm_penjualan_external
        dataHeader.ms_asuransi_id = data.ms_asuransi_id
        dataHeader.kelas_kunjungan_id = data.kelas_kunjungan_id
        dataHeader.ms_jenis_layanan_id = data.ms_jenis_layanan_id
        dataHeader.no_asuransi = data.no_asuransi_registrasi
        dataHeader.no_npwp = data.npwp
        dataHeader.no_sep_tagihan = data.no_sep
        dataHeader.pasien_id = data.pasien_id
        dataHeader.registrasi_id = data.registrasi_id
        // jenis layanan
        if (dataHeader.ms_jenis_layanan_id) {
          const indexJenisLayanan = vm.list_jenis_layanan.findIndex(x => x.id == dataHeader.ms_jenis_layanan_id)
          if (indexJenisLayanan != -1) dataHeader.jenis_layanan = vm.list_jenis_layanan[indexJenisLayanan]
        }
        // asuransi
        if (dataHeader.ms_asuransi_id) {
          const index = vm.list_asuransi.findIndex(x => x.id == dataHeader.ms_asuransi_id)
          if (index != -1) dataHeader.asuransi = vm.list_asuransi[index]
          // console.log(index)
        }
        // kelas kunjungan
        if (dataHeader.kelas_kunjungan_id) {
          const index = vm.list_kelas_kunjungan.findIndex(x => x.kelas_kunjungan_id == dataHeader.kelas_kunjungan_id)
          if (index != -1) dataHeader.kelas_kunjungan = vm.list_kelas_kunjungan[index]
        }
        // console.log('dataHeader pilihHeader', dataHeader)
        vm.$emit('changeVar', { to: 'dataHeader', data: dataHeader })
        // list external
        vm.$emit('changeVar', { to: 'listExternal', data: [data] })
        // list penjualan
        vm.$emit('changeVar', { to: 'listPenjualan', data: [data] })
        // summary
        this.$_api.single('penjualan', {}, data.penjualan_id).then((penjualan) => {
          if (penjualan.status === 200) {
            const dataPenjualan = penjualan.data[0]
            // fasilitas
            vm.$emit('changeVar', {
              to: 'listFasilitas', data: dataPenjualan.fasilitas.map(x => {
                return {
                  ...x,
                  nama_harga: vm.toNumeric(x.harga_fasilitas, 'idr'),
                  total_harga_fasilitas: x.harga_fasilitas_custom * x.qty_fasilitas,
                  nama_qty_fasilitas: vm.toNumeric(x.qty_fasilitas),
                  nama_harga_fasilitas: vm.toNumeric(x.harga_fasilitas, 'idr'),
                  nama_harga_fasilitas_custom: vm.toNumeric(x.harga_fasilitas_custom, 'idr'),
                  nama_total_harga_fasilitas: vm.toNumeric(x.harga_fasilitas_custom * x.qty_fasilitas, 'idr'),
                  kode_penjualan: data.kode_penjualan
                }
              })
            })
            // jasa
            vm.$emit('changeVar', {
              to: 'listJasa', data: dataPenjualan.jasa.map(x => {
                return {
                  ...x,
                  total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
                  nama_qty_jasa: vm.toNumeric(x.qty_jasa),
                  nama_harga_jasa: vm.toNumeric(x.harga_jasa, 'idr'),
                  nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, 'idr'),
                  nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, 'idr'),
                  kode_penjualan: data.kode_penjualan
                }
              })
            })
            // barang
            vm.$emit('changeVar', {
              to: 'listBarang', data: dataPenjualan.barang.map(x => {
                return {
                  ...x,
                  total_harga_barang: x.harga_barang_custom * x.qty_barang,
                  qty_barang_total: x.total_stock_barang,
                  nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
                  nama_qty_barang: vm.toNumeric(x.qty_barang),
                  nama_harga_barang: vm.toNumeric(x.harga_barang, 'idr'),
                  nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, 'idr'),
                  nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, 'idr'),
                  kode_penjualan: data.kode_penjualan
                }
              })
            })
          }
        })
      }
      vm.$bvModal.hide('modal-pasien-external')
    },
    async pilih(data) {
      const vm = this
      // console.log('pilihExternal', data)
      vm.$bvModal.hide('modal-pasien-external')
      this.$_api.post('poolExternal/register', {
        penjualan_id: data.penjualan_id,
        tagihan_id: vm.dataHeader.tagihan_id
      }).then((register) => {
        if (register.status == 200) {
          this.$_alert.success('Berhasil Menambahkan External Pada Tagihan')
          vm.$bvModal.hide('modal-pasien-external')
          vm.$emit('auto', { reset: false })
        }
      })
    },
    async getDatas() {
      const vm = this
      this.tableBusy = true
      this.$_api.post('penjualan/listPenjualanNonTagihanPerHalaman', {
        jumlah: vm.perPage,
        halaman: vm.currentPage,
        ...vm.filter,
        ms_jenis_layanan_id: vm.filter.jenis_layanan ? vm.filter.jenis_layanan.id : null,
        is_external: '1'
      }).then((penjualan) => {
        if (penjualan.status === 200) {
          vm.totalRows = Number.parseInt(penjualan.count)
          this.items = penjualan.data
          for (let i = 0; i < this.items.length; i++) {
            let x = this.items[i]
            x.no = i + 1 + (vm.perPage * (vm.currentPage - 1))
            x.nama_tgl_penjualan = moment(x.tgl_penjualan).format('dddd, DD-MM-YYYY')
            x.nama_total_penjualan = vm.toNumeric(x.total_penjualan, 'idr')
            x.jumlah = x.total_penjualan + x.discount - x.tax
          }
        }

        this.tableBusy = false
      })

      // gudang
      this.$_api.post('msGudang/list', {}).then((list_gudang) => {
        vm.list_gudang = list_gudang.status === 200 ? list_gudang.data.map(x => { return x }) : []
      })
    },
    resetData() {
      const vm = this
      vm.filter = {
        no_rm_penjualan_external: null,
        nama: null,
        NIK: null,
        tgl_awal: null,
        tgl_akhir: null,
        jenis_layanan: null
      }
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
