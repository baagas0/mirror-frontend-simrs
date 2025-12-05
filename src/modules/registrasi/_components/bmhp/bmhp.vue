<template>
  <div>
    <div class="card card-custom mb-5" v-if="loading">
      <div class="card-body d-flex justify-content-center">
        <div class="spinner spinner-track spinner-primary"></div>
      </div>
    </div>

    <template v-else-if="activeView == 'list'">
      <div class="card card-custom mb-5">
        <div class="card-header border-0 pt-0 pb-0">
          <div class="card-title flex-fill mr-0">
            <h4>Input BMHP</h4>
          </div>
          <div class="card-toolbar">
            <div class="mx-3"></div>
            <a class="btn btn-primary btn-icon btn-circle" @click="activeView = 'create'">
              <i class="ri-add-line p-0"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="card mb-5 bg-light-warning" v-for="(item, index) in data" :key="index">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div>
              <p class="mb-2"><strong>{{ item.tgl_penjualan | parse('longDateTime') }}</strong></p>
              <p class="mb-0"><strong>Total: {{ item.bulk_barang.length }} barang</strong></p>
              <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ item.nama_gudang }}</h5>
              <p class="mb-2"><strong>Kode BMHP: {{ item.kode_penjualan }}</strong></p>
              <p class="mb-2" :class="{ 'text-danger text-sm': !item.remark }"><strong>{{ item.remark || '[tanpa keterangan]' }}</strong></p>
            </div>
            <div>
              <button class="btn btn-primary btn-sm" @click="editForm({...item })"><i class="ri-edit-2-line"></i> Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteForm({...item })"><i class="ri-delete-bin-line"></i> Hapus</button>
            </div>
          </div>
        </div>
      </div>
      <template v-if="data.length == 0">
        <div class="card card-custom">
          <div class="card-body text-center ">
            <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
            <h3 class="mt-3 font-weight-bolder text-dark">Data tidak ditemukan.</h3>
          </div>
        </div>
      </template>
    </template>

    <div class="animated" v-else-if="activeView == 'create' || activeView == 'update'">
      <!-- <pre>{{ fields }}</pre> -->
      <div class="card card-custom mb-5">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column justify-content-center">
            <span class="card-label font-weight-bolder text-dark">Formulir input BMHP</span>
          </h3>
          <div class="card-toolbar">
            <a class="btn btn-outline-primary btn-icon btn-circle" @click="activeView = 'list'">
              <i class="ri-arrow-go-back-line p-0"></i>
            </a>
          </div>
        </div>
        <div class="card-body py-2 mt-3">
          
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-12">
                  <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert" v-if="activeView == 'update'">
                    <div class="alert-icon"><i class="ri-error-warning-line"></i></div>
                    <div class="alert-text">Anda hanya dapat mengubah daftar barang.</div>
                  </div>
                </div>
                <div class="col-4">
                  <s-input groupClass="mb-0" v-model="fields.tgl_registrasi" :item="{
                    label: 'Tanggal',
                    id: 'tgl_registrasi',
                    data: 'tgl_registrasi',
                    type: 'datetime',
                    validation: ['required'],
                    formatDateView: 'DD MMM YYYY HH:mm',
                  }" :valuee="dateToday" :disabled="activeView == 'update'" />
                </div>

                <!-- <div class="col-8">
                  <s-input v-model="fields.registrasi_id" :item="{
                    label: 'Kunjungan',
                    id: 'registrasi_id',
                    data: 'registrasi_id',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: fields.registrasi_id,
                    api: 'registrasi/listPerHalamanBypassUri',
                    pointer: {
                      label: 'nama_lengkap',
                      code: 'registrasi_id',
                      display: ['tgl_registrasi|date', 'nama_jenis_layanan', 'no_kunjungan','no_rm','nama_lengkap'],
                      headerDisplay: ['Tanggal Registrasi', 'Layanan', 'No Kunjungan', 'no_rm','Nama Lengkap']
                    },
                    param: {},
                  }" :valuee="fields.registrasi_id" />
                </div> -->
                <div class="col-8">
                  <s-input v-model="fields.ms_gudang_id" :item="{
                    label: 'Gudang',
                    id: 'ms_gudang_id',
                    data: 'ms_gudang_id',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: fields.ms_gudang_id,
                    api: 'msGudang',

                    pointer: {
                      label: 'nama_gudang',
                      code: 'id',
                      display: ['nama_gudang', 'tipe_gudang'],
                      headerDisplay: ['Nama Gudang', 'Tipe Gudang']
                    },
                    param: {},
                  }" :valuee="fields.ms_gudang_id" :disabled="activeView == 'update'" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.NIK" :item="{
                    label: 'NIK',
                    id: 'NIK',
                    data: 'NIK',
                    type: 'text',
                    validation: [],
                  }" :disabled="true" :valuee="fields.NIK" />
                </div>
                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.nama" :item="{
                    label: 'Nama',
                    id: 'nama',
                    data: 'nama',
                    type: 'text',
                    validation: [],
                  }" :disabled="true" :valuee="fields.nama" />
                </div>
                <div class="col-12">
                  <s-input groupClass="mb-0" v-model="fields.remark" :item="{
                    label: 'Keterangan',
                    id: 'remark',
                    data: 'remark',
                    type: 'textarea',
                    validation: [],
                  }" :disabled="activeView == 'update'" :valuee="fields.remark" />
                </div>

                <div class="col-12" >
                  <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert" v-if="!fields.ms_gudang_id">
                    <div class="alert-icon"><i class="ri-error-warning-line"></i></div>
                    <div class="alert-text">Harap memilih gudang terlebih dahulu.</div>
                  </div>
                  <!-- <button type="button" class="btn btn-primary" v-if="fields.id" @click="fetchBarang(fields.id)">fetchBarang</button> -->
                  <table class="table table-bordered" v-if="fields.ms_gudang_id ">
                    <thead>
                      <tr>
                        <!-- <th>#</th> -->
                        <th>Barang</th>
                        <!-- <th>Satuan</th> -->
                        <th>Qty</th>
                        <th>Harga</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- <pre>{{ fields.bulk_barang }}</pre> -->
                      <!-- <pre>{{ fBarang }}</pre> -->

                      <tr v-for="(item, index) in fields.bulk_barang" :key="index" :class="{ 'bg-light-warning': fBarangEdit }">
                        <td>{{ item.nama_barang }}</td>
                        <td>{{ item.qty_barang }}</td>
                        <td>{{ item.harga_barang | parse('money') }}</td>
                        <td style="white-space: nowrap;width: 1%;">
                          <button type="button" class="btn btn-sm btn-warning" :disabled="fBarangEdit" @click="editBarang(item, index)"><i class="ri-pencil-line"></i> Edit</button>
                          <button type="button" class="btn btn-sm btn-danger" :disabled="fBarangEdit" @click="deleteBarang(index)"><i class="ri-delete-bin-line"></i></button>
                        </td>
                      </tr>

                      <tr class="bg-light-success">
                        <!-- <td></td> -->
                        <td>
                          <s-input v-model="fBarang.barang" :item="{
                            label: '',
                            id: 'barang',
                            data: 'barang',
                            type: 'lookup-radio',
                            validation: ['required'],
                            value: fBarang.barang,
                            api: 'stock/listStockBarangJualPerHalamanBypassUri',
                            groupClass: 'mb-0',
                            return_object: true,
                            pointer: {
                              label: 'nama_barang',
                              code: 'ms_barang_id',
                              display: ['kode_produk', 'nama_barang', 'qty', 'harga_barang|money'],
                              headerDisplay: ['Kode', 'Nama Barang', 'QTY', 'Harga']
                            },
                            param: {
                              ms_gudang_id: fields.ms_gudang_id,
                              ms_harga_id: fields.ms_harga_id,
                              ms_tarif_id: fields.ms_tarif_id,
                            },
                          }" :valuee="fBarang.barang" @input="handleBarang(fBarang.barang)" />
                        </td>
                        <!-- <td>{{ fBarang.barang.nama_satuan }}</td> -->
                        <td>
                          <s-input groupClass="mb-0" v-model="fBarang.qty_barang" :item="{
                            label: '',
                            id: 'qty_barang',
                            data: 'qty_barang',
                            type: 'number',
                            groupClass: 'mb-0',
                            validation: [],
                          }"  />
                        </td>
                        <td>{{ fBarang.harga_barang | parse('money') }}</td>
                        <td style="white-space: nowrap;width: 1%;">
                          <button type="button" class="btn btn-sm btn-primary" @click="submitBarang()"><i class="" :class="{ 'ri-send-plane-2-line': fBarangEdit, 'ri-add-line': !fBarangEdit }"></i></button>
                          <button type="button" class="btn btn-sm btn-danger" @click="resetBarang()"><i class="ri-restart-line"></i>Reset</button>
                        </td>
                      </tr>

                      
                    </tbody>
                  </table>

                  <p>Total Harga <span class="text-danger">{{ total_barang | parse('money') }}</span></p>
                </div>
                
              </div>
  
              <div class="d-flex justify-content-between py-5" v-if="!fBarangEdit">
                <div>
                  <button type="submit" class="btn btn-primary mr-3">
                    <i class="ri-save-line"></i>
                    Simpan
                  </button>
                </div> 
              </div>
            </form>
          </ValidationObserver>
        </div>
  
      </div>
    </div>
  </div>  
</template>
    
  <script>
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'bahan_medis_habis_pakai',
    props: {
      dataRegistrasi: { type: Object, required: false, default() { return { registrasi_id: 'wasyu' } } }
    },
    data () {
      return {
        loading: false,

        // dataRegistrasi: {},
        // registrasi_id: '',

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
      // registrasi_id: {
      //   async handler(to, from) {
      //   }
      // },
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
      dataRegistrasi: {
        handler(to, from) {
          this.getData()
          this.$router.push({ name: this.$route.name, query: { 'view': 'list' } }).catch(() => { })
        }
      }
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
        this.activeID = item.id
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
        if(to == null) return

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
        if (!this.fBarang.barang) {
          this.$_alert.error({}, 'Barang tidak ditemukan');
          return
        }

        // CEK QTY STOK
        if (this.fBarang.qty_barang > this.fBarang.barang.qty) {
          this.$_alert.error({}, 'Stok tidak mencukupi');
          return
        }

        // CEK QTY
        if (this.fBarang.qty_barang < 1) {
          this.$_alert.error({}, 'Stok tidak boleh <1');
          return
        }

        // CEK BARANG EXIST
        let isValid = this.fields.bulk_barang.filter((x) => x.ms_barang_id == this.fBarang.ms_barang_id)
        if(isValid.length && !this.fBarang.id) {
          this.$_alert.error({}, 'Barang sudah ditambahkan!');
          return
        }

        delete this.fBarang.barang
        this.fBarang.total_harga_barang = this.fBarang.qty_barang * this.fBarang.harga_barang
        
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
        // this.$_alert.success('BMHP kunjungan ini berhasil dibuat')
        this.activeView = 'list'
      },
      getData() {
        this.loading = true
        this.$_api.post('penjualan/listPenjualanBmhp', { registrasi_id: this.dataRegistrasi.registrasi_id }).then((res) => {
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
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  </style>