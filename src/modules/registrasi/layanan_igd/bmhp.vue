<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-igd @selected="selectRegistrasi"/>
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ123</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>

        <template v-if="dataRegistrasi && registrasi_id">
          <Bmhp :dataRegistrasi="dataRegistrasi" />
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <!-- <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3> -->
            </div>
          </div>
        </template>
        
      </div>
    </div>
  </div>
</template>
  
<script>
  import CardRegistrasiIgd from './_components/card_registrasi_igd.vue'
  import Bmhp from '../_components/bmhp/bmhp.vue'

  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_rjalan_medis',
    components: { CardRegistrasiIgd, Bmhp },
    data () {
      return {
        loading: false,

        dataRegistrasi: {},
        registrasi_id: '',

        dateToday: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        activeView: 'list',
        activeID: null,
        fBarangEdit: false,
        fBarang: {
          index: null,
          id: null,
          barang: {},
          ms_barang_id: '',
          qty_barang: '',
          nama_barang: '',
          harga_barang: '',
          harga_barang_custom: '',
          harga_pokok_barang: '',
        },
        fields: {
          is_bmhp: true,
          is_external: false,
          jenis_rawat: 'RJALAN',
          harga_total_barang: 0,
          harga_total_jasa: 0,
          harga_total_fasilitas: 0,
          discount: 0,
          tax: 0,
          total_penjualan: 0,
          status_penjualan: 1,

          ms_gudang_id: '', // Gudang Utama

          tgl_penjualan: '',
          NIK: '',
          nama: '',
          registrasi_id: '',
          kelas_kunjungan_id: '',
          ms_asuransi_id: '',
          ms_dokter_id: '',
          ms_jenis_layanan_id: '',

          ms_harga_id: '',
          ms_tarif_id: '',
          
          remark: '',
          // no_kunjungan: '',
          // no_rm: '',
          
          // nama_penjualan_external: '',
          // alamat_penjualan_external: '',
          // keterangan_penjualan_external: '',
          // pasien_id: '',

          bulk_fasilitas: [],
          bulk_jasa: [],
          bulk_barang: [],
          bulk_penunjang: []
        },
        data: []
      }
    },
    watch: {
      registrasi_id: {
        async handler(to, from) {
        }
      },
      activeView: {
        deep: false,
        immediate: false,
        handler(to) {
          if(to === 'create' || to === 'update') this.initForm()
          if (to && this.$route.query.view !== to) {
            this.$router.push({ name: this.$route.name, query: { 'view': to, id: this.activeID }, params: { id: this.activeID } }).catch(() => { })
          }
        }
      },
      '$route': {
        deep: true,
        immediate: true,
        handler(to) {
          if (to.query.view) {
            this.activeView = to.query.view
            this.activeID = to.query.id
          } else {
            this.activeView = 'list'
            this.activeID = null
          }

          if(to.query.view === 'create' || to.query.view === 'update') this.initForm()
          if(to.query.view === 'list') this.getData()
        }
      },
      // 'fBarang.barang': {
      //   handler(to, from) {

      //     // this.fBarang.barang = to
          
      //   }
      // }
    },
    computed: {
      total_barang () {
        if (this.fields && this.fields.bulk_barang && this.fields.bulk_barang.length) return this.fields.bulk_barang.reduce((acc, curr) => acc + parseFloat(curr.total_harga_barang), 0)
        else return 0
      }
    },
    mounted() {
    },
    methods: {
      async selectRegistrasi (e, switch_tab = true) {
        this.dataRegistrasi = e
        this.registrasi_id = e.registrasi_id || ''
        if (!this.registrasi_id) return

        this.getData()
        this.$router.push({ name: this.$route.name, query: { 'view': 'list' } }).catch(() => { })
      },
      async initForm() {
        if(this.activeView === 'update') return

        const pasien_request = await this.$_api.single('pasien', {}, this.dataRegistrasi.pasien_id);
        if (pasien_request.data.length === 0) {
          this.$_alert.error('Pasien Tidak Ditemukan | Penjualan tidak dapat dibuat')
          return
        }

        this.fields.ms_harga_id = this.dataRegistrasi.ms_harga_id
        this.fields.ms_tarif_id = this.dataRegistrasi.ms_tarif_id
        
        this.fields.bulk_barang = []
        this.harga_total_barang = 0
        this.total_penjualan = 0

        const pasien = pasien_request.data[0]
        delete this.fields.id
        this.fields.tgl_penjualan = this.dataRegistrasi.tgl_registrasi
        this.fields.NIK = pasien.nik
        this.fields.nama = pasien.nama_lengkap
        this.fields.ms_gudang_id = ''
        this.fields.remark = ''
        this.fields.registrasi_id = this.dataRegistrasi.registrasi_id
        this.fields.kelas_kunjungan_id = this.dataRegistrasi.kelas_kunjungan_id
        this.fields.ms_asuransi_id = this.dataRegistrasi.ms_asuransi_id
        this.fields.ms_dokter_id = this.dataRegistrasi.ms_dokter_id
        this.fields.ms_jenis_layanan_id = this.dataRegistrasi.ms_jenis_layanan_id

        this.resetBarang()
      },
      editForm(item) {
        // console.log('editForm', item)
        // console.log(item.remark)
        this.activeView = 'update',
        this.fields = JSON.parse(JSON.stringify({ ...item }))
        console.log('fields', this.fields)
        // this.fields.is_bmhp = item.is_bmhp
        // this.fields.is_external = item.is_external
        // this.fields.jenis_rawat = item.jenis_rawat
        // this.fields.harga_total_barang = item.harga_total_barang
        // this.fields.harga_total_jasa = item.harga_total_jasa
        // this.fields.harga_total_fasilitas = item.harga_total_fasilitas
        // this.fields.discount = item.discount
        // this.fields.tax = item.tax
        // this.fields.total_penjualan = item.total_penjualan
        // this.fields.status_penjualan = item.status_penjualan
        // this.fields.ms_gudang_id = item.ms_gudang_id
        // this.fields.tgl_penjualan = item.tgl_penjualan
        // this.fields.NIK = item.NIK
        // this.fields.nama = item.nama
        // this.fields.registrasi_id = item.registrasi_id
        // this.fields.kelas_kunjungan_id = item.kelas_kunjungan_id
        // this.fields.ms_asuransi_id = item.ms_asuransi_id
        // this.fields.ms_dokter_id = item.ms_dokter_id
        // this.fields.ms_jenis_layanan_id = item.ms_jenis_layanan_id
        // this.fields.ms_harga_id = item.ms_harga_id
        // this.fields.ms_tarif_id = item.ms_tarif_id
        // this.fields.remark = item.remark
        // this.fields.bulk_barang = item.bulk_barang
      },
      handleBarang(to) {
        if(to.id) this.fBarang.id = to.id
        if(to.ms_barang_id) this.fBarang.ms_barang_id = to.ms_barang_id
        if(!this.fBarang.qty_barang) this.fBarang.qty_barang = 1
        if(to.nama_barang) this.fBarang.nama_barang = to.nama_barang
        if(to.harga_barang) this.fBarang.harga_barang =  to.harga_barang || 0
        if(to.harga_barang) this.fBarang.harga_barang_custom =  to.harga_barang || 0
        if(to.harga_pokok) this.fBarang.harga_pokok_barang =  to.harga_pokok || 0
      },
      async fetchBarang(penjualan_id) {
        const res = await this.$_api.post('penjualanBarang/listPenjualanBarangByPenjualanId', { penjualan_id, order: 'ASC' })

        let bulk_barang = []
        for (const item of res.data) {
          bulk_barang.push({
            id: item.penjualan_barang_id,
            qty_barang: item.qty_barang,
            nama_barang: item.nama_barang,
            harga_barang: item.harga_barang,
            ms_barang_id: item.ms_barang_id,
            harga_pokok_barang: item.harga_pokok_barang,
            harga_barang_custom: item.harga_barang_custom,
            total_harga_barang: item.qty_barang * item.harga_barang
          });
        }

        this.fields.bulk_barang = bulk_barang
      },
      resetBarang() {
        this.fBarang = {
          index: null,
          barang: {},
          ms_barang_id: '',
          qty_barang: 0,
          nama_barang: '',
          harga_barang: 0,
          harga_barang_custom: 0,
          harga_pokok_barang: 0,
        }
        this.fBarangEdit = false
      },
      submitBarang() {

        // CEK BARANG
        let isValid = this.fields.bulk_barang.filter((x) => x.ms_barang_id == this.fBarang.ms_barang_id)
        if(isValid.length && !this.fBarang.id) {
          this.$_alert.error({}, 'Barang sudah ditambahkan!');
          return
        }

        delete this.fBarang.barang
        this.fBarang.total_harga_barang = this.fBarang.qty_barang & this.fBarang.harga_barang
        
        if (this.activeView == 'update') {
          // Langsung kirim (pada saat update penjualan)
          let payload = {
            id: this.fBarang.id || null, 
            qty_barang: this.fBarang.qty_barang, 
            harga_barang: this.fBarang.harga_barang, 
            harga_barang_custom: this.fBarang.harga_barang_custom, 
            harga_pokok_barang: this.fBarang.harga_pokok_barang, 
            keterangan_penjualan_barang: this.fBarang.keterangan_penjualan_barang, 
            status_penjualan_barang: this.fBarang.status_penjualan_barang, 
            penjualan_id: this.fields.id, 
            ms_barang_id: this.fBarang.ms_barang_id, 
            harga_total_barang: this.fBarang.total_harga_barang, 
            discount: 0, 
            tax: 0, 
            total_penjualan: this.fBarang.total_harga_barang + this.total_barang,
            ms_gudang_id: this.fields.ms_gudang_id
          }
          const mode = payload.id ? 'update': 'create'
          this.$_api[mode]('penjualanBarang', payload).then((res) => {
            console.log('res', res)
            this.fetchBarang(this.fields.id)
            this.$_alert.success('Barang berhasil diproses.');
          }).catch((err) => {
            console.log(err)
            this.fetchBarang(this.fields.id)
            this.$_alert.error(err, 'Gagal menambahkan barang.');
          })
        } else {
          // Tampung (pada saat register bulk penjualan)
          if(this.fBarang.i != null) {
            this.fields.bulk_barang[this.fBarang.i] = JSON.parse(JSON.stringify({ ...this.fBarang, i: null }))
          } else {
            this.fields.bulk_barang.push(this.fBarang)
          }
        }

        this.resetBarang()
      },
      editBarang (item, index) {
        this.fBarang = {
          ...item,
          i: index,
          tes: index,
          barang: {
            ms_barang_id: item.ms_barang_id,
            nama_barang: item.nama_barang,
          }
        }
        this.fBarangEdit = true
      },
      deleteBarang(index) {
        this.$_alert.confirm('Yakin ingin menghapus?', 'Data yang telah dihapus tidak dapat dikembalikan').then((res) => {
          console.log(res)
          if (res.isConfirmed) {
            this.fields.bulk_barang.splice(index, 1)
          }
        })
      },
      async onSubmit() {
        console.log(this.fields)
        let harga_total_barang = 0
        for (const item of this.fields.bulk_barang) {
          const sub_total = item.harga_barang * item.qty_barang
          console.log('sub total ', sub_total)
          harga_total_barang += sub_total
        }

        this.fields.harga_total_barang = harga_total_barang
        this.fields.total_penjualan = harga_total_barang


        console.log('this.fields', this.fields)

        if(this.activeView === 'update') {
          const res_penjualan = await this.$_api.post('penjualan/updateBulk', this.fields);
          if (res_penjualan.status != 200) this.$_alert.error(res_penjualan, '', res_penjualan.message)
          else this.$_alert.success('BMHP kunjungan ini berhasil dibuat')
        } else if(this.activeView === 'create') {
          const res_penjualan = await this.$_api.post('penjualan/registerBulk', this.fields);
          if (res_penjualan.status != 200) this.$_alert.error(res_penjualan, '', res_penjualan.message)
          else this.$_alert.success('BMHP kunjungan ini berhasil dibuat')
        }
        this.initForm()
        // console.log('penjualan', res_penjualan)
        this.$_alert.success('BMHP kunjungan ini berhasil dibuat')
        this.activeView = 'list'
      },
      getData() {
        this.loading = true
        this.$_api.post('penjualan/listPenjualanBmhp', { registrasi_id: this.registrasi_id }).then((res) => {
          this.data = res.data
          this.loading = false
        }).catch((err) => {
          this.$_alert.error(err, "Terjadi kesalahan server")
          // consol.elog(err)
        })
      },
      deleteForm(item) {
        this.$_alert.confirm('Yakin ingin menghapus?', 'Data yang telah dihapus tidak dapat dikembalikan').then((res) => {
          if(res.isConfirmed) {
            this.$_api.post('penjualan/delete', { id:  item.id }).then(()=>{
              this.getData();
              this.$_alert.success("Berhasil menghapus data");
            });
          }
        });
      }
    }
    
  }
</script>
