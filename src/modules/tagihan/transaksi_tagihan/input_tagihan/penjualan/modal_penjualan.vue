<template>
  <b-modal
    id="modal-penjualan"
    size="xl"
    title="List Penjualan"
    header-bg-variant="success"
    header-text-variant="light"
    @show="openModal()"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="kelas_kunjungan">Kelas Kunjungan</label>
              <multiselect
                id="kelas_kunjungan"
                v-model="filter.kelas_kunjungan"
                :options="list_kelas_kunjungan"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_kelas_kunjungan"
                track-by="kelas_kunjungan_id"
                placeholder="Kelas Kunjungan"
                size="sm"
              ></multiselect>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="gudang">Gudang</label>
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
                placeholder="Gudang"
                size="sm"
              ></multiselect>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="jenis_layanan">Jenis Layanan</label>
              <multiselect
                id="jenis_layanan"
                v-model="filter.jenis_layanan"
                :options="list_jenis_layanan"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_jenis_layanan"
                track-by="id"
                placeholder="Jenis Layanan"
                size="sm"
              ></multiselect>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="asuransi">Asuransi</label>
              <multiselect
                id="asuransi"
                v-model="filter.asuransi"
                :options="list_asuransi"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_asuransi"
                track-by="id"
                placeholder="Asuransi"
                size="sm"
              ></multiselect>
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
                <template #cell(is_external)="item">
                  <b-button v-if="item.item.is_external" type="button" class="btn btn-info" v-b-tooltip.hover title="'External'"></b-button>
                  <b-button v-else type="button" class="btn btn-success" v-b-tooltip.hover title="'Internal'"></b-button>
                </template>
                <template #cell(actions)="item">
                  <b-button
                    variant="success"
                    v-b-tooltip.hover title="'Pilih Data'"
                    @click="pilihPenjualan(item.item), $bvModal.hide('modal-penjualan')"
                  >
                    <i class="ri-checkbox-circle-line"></i> {{ item.actions }}
                  </b-button>
                </template>
              </b-table>
            </b-col>

            <b-col md="2">
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-col>

            <b-col md="5" offset-md="5">
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
moment.locale('id')
// import DatePicker from "vue2-datepicker";
// import 'vue2-datepicker/index.css';

export default {
  components: {
  },
  name: 'daftar_penjualan',
  emits: [ 'changeVar' ],
  props: [ 'listPenjualan', 'listBarang', 'listJasa', 'listFasilitas' ],
  data () {
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
          key: 'no_rm',
          label: 'No. Rm',
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
      filter: {},
      filterOn: [],
      tableBusy: false,
      list_gudang: [],
      list_jenis_layanan: [],
      list_asuransi: [],
      list_kelas_kunjungan: []
    }
  },
  computed: {
  },
  watch: {
    currentPage (newVar, oldVar) {
      if (newVar !== oldVar && newVar) {
        this.getDatas()
      }
    },
    perPage (newVar, oldVar) {
      if (newVar !== oldVar && newVar) {
        this.getDatas()
      }
    },
    'filter.kelas_kunjungan' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.gudang' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.jenis_layanan' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    },
    'filter.asuransi' (newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getDatas()
      }
    }
  },
  mounted () {
    this.getDatas()
  },
  methods: {
    openModal () {

    },
    async pilihPenjualan (data) {
      const vm = this
      const listPenjualan = JSON.parse(JSON.stringify(vm.listPenjualan))
      // penjualan
      const index = listPenjualan.findIndex(item => item.penjualan_id === data.penjualan_id)
      if (index >= 0) {
        // jika penjualan sudah ada di list jual
        this.$_alert.error({}, 'Sudah Terdapat Pada Daftar Penjualan')
      } else {
        listPenjualan.push(data)
        vm.$emit('changeVar', {to: 'listPenjualan', data: listPenjualan})
        this.$_api.post('penjualan/detailsById', { id: data.penjualan_id }).then((penjualan) => {
          if (penjualan.status === 200) {
            const dataPenjualan = penjualan.data[0]
            // fasilitas
            vm.$emit('changeVar', {to: 'listFasilitas', data: vm.listFasilitas.concat(dataPenjualan.fasilitas.map(x => {return {
              ...x, 
              nama_harga: vm.toNumeric(x.harga_fasilitas, 'idr'),
              total_harga_fasilitas: x.harga_fasilitas_custom * x.qty_fasilitas,
              nama_qty_fasilitas: vm.toNumeric(x.qty_fasilitas),
              nama_harga_fasilitas: vm.toNumeric(x.harga_fasilitas, 'idr'),
              nama_harga_fasilitas_custom: vm.toNumeric(x.harga_fasilitas_custom, 'idr'),
              nama_total_harga_fasilitas: vm.toNumeric(x.harga_fasilitas_custom * x.qty_fasilitas, 'idr')
            }}))})
            // jasa
            vm.$emit('changeVar', {to: 'listJasa', data: vm.listJasa.concat(dataPenjualan.jasa.map(x => {return {
              ...x, 
              total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
              nama_qty_jasa: vm.toNumeric(x.qty_jasa),
              nama_harga_jasa: vm.toNumeric(x.harga_jasa, 'idr'),
              nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, 'idr'),
              nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, 'idr')
            }}))})
            // barang
            vm.$emit('changeVar', {to: 'listBarang', data: vm.listBarang.concat(dataPenjualan.barang.map(x => {
              return {
                ...x, 
                total_harga_barang: x.harga_barang_custom * x.qty_barang,
                qty_barang_total: x.total_stock_barang,
                nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
                nama_qty_barang: vm.toNumeric(x.qty_barang),
                nama_harga_barang: vm.toNumeric(x.harga_barang, 'idr'),
                nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, 'idr'),
                nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, 'idr')
              }}))})
          }
        })
      }
      // console.log('pilihPenjualan', data)
    },
    async getDatas () {
      const vm = this
      this.tableBusy = true
      this.$_api.post('penjualan/listPerhalaman', {
        jumlah: vm.perPage, 
        halaman: vm.currentPage, 
        // ...vm.filter,
        kelas_kunjungan_id: vm.filter.kelas_kunjungan ? vm.filter.kelas_kunjungan.kelas_kunjungan_id : null,
        ms_gudang_id: vm.filter.gudang ? vm.filter.gudang.id : null,
        ms_asuransi_id: vm.filter.asuransi ? vm.filter.asuransi.id : null,
        ms_jenis_layanan_id: vm.filter.jenis_layanan ? vm.filter.jenis_layanan.id : null
      }).then((penjualan) => {
        if (penjualan.status == 200) {
          vm.totalRows = Number.parseInt(penjualan.count)
          this.items = penjualan.map((x, i) => { return {
            ...x,
            no: i + 1 + (vm.perPage * (vm.currentPage - 1)),
            nama_total_penjualan: vm.toNumeric(x.total_penjualan, 'idr'),
            jumlah: x.total_penjualan + x.discount - x.tax
          }})
        }
        this.tableBusy = false
      })
      // console.log('penjualan', penjualan)
      
      // //gudang
      // let list_gudang = await this.$_api.post("msGudang/list");
      // vm.list_gudang = list_gudang.status == 200 ? list_gudang.map(x => { return x }) : []
      // //jenis layanan
      // let list_jenis_layanan = await this.$_api.post("msJenisLayanan/list");
      // vm.list_jenis_layanan = list_jenis_layanan.status == 200 ? list_jenis_layanan.map(x => { return x }) : []
      // //asuransi
      // let list_asuransi = await this.$_api.post("msAsuransi/list");
      // this.list_asuransi = list_asuransi.status == 200 ? list_asuransi.data : []
      // //kelas kunjungan
      // let list_kelas_kunjungan = await this.$_api.post("KelasKunjungan/list");
      // this.list_kelas_kunjungan = list_kelas_kunjungan.status == 200 ? list_kelas_kunjungan.map(x => { return {...x, nama_kelas: `${x.nama_kelas_kunjungan} - ${x.nama_tarif}`} }) : []
    },
    resetData () {
      const vm = this
      vm.filter = {}
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
