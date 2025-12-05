<template>
  <div class="container-fluid">
    <!-- <pre>{{ oResep }}</pre> -->
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi" :type="'farmasi'"/>
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12" v-if="dataRegistrasi && dataRegistrasi.id">
        <div class="card card-custom mb-5">
          <div class="card-body ribbon ribbon-right">
            <div class="ribbon-target bg-danger" style="top: 10px; right: 0px;" v-if="oResep.tahap_resep > 4">Sudah diserahkan</div>
            <div class="d-flex flex-row justify-content-between align-items-center" v-if="dataRegistrasi">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
            <div class="row" v-if="oResep && oResep.id">
              <div class="col-xl-10 md-10 sm-12">
                <div class="stepper-wrapper">
                  <div class="stepper-item" :class="{ 'completed': oResep.tahap_resep >= 0, 'active': oResep.tahap_resep == 0  }">
                    <div class="step-counter">1</div>
                    <div class="step-name text-center">Resep Dokter</div>
                  </div>
                  <div class="stepper-item" :class="{ 'completed': oResep.tahap_resep >= 1, 'active': oResep.tahap_resep == 1  }">
                    <div class="step-counter">2</div>
                    <div class="step-name text-center">Telaah Resep</div>
                  </div>
                  <div class="stepper-item" :class="{ 'completed': oResep.tahap_resep >= 2, 'active': oResep.tahap_resep == 2  }">
                    <div class="step-counter">3</div>
                    <div class="step-name text-center">Persiapan</div>
                  </div>
                  <div class="stepper-item" :class="{ 'completed': oResep.tahap_resep >= 3, 'active': oResep.tahap_resep == 3  }">
                    <div class="step-counter">4</div>
                    <div class="step-name text-center">Pengecekan</div>
                  </div>
                  <div class="stepper-item" :class="{ 'completed': oResep.tahap_resep >= 4, 'active': oResep.tahap_resep == 4  }">
                    <div class="step-counter">5</div>
                    <div class="step-name text-center">Penyerahan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-3  mb-3 bg-light-warning" v-if="cppt_obj && cppt_obj.cppt_id">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div class="">
              <p class="mb-0"><strong>{{ cppt_obj.tanggal_cppt | parse('longDateTime') }}</strong></p>
              <p class="mb-2"><strong>{{ cppt_obj.nama_tenaga_medis }} ({{ cppt_obj.nama_tipe_tenaga_medis }})</strong></p>
              <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ cppt_obj.nama_dokter }}</h5>
            </div>
            <div>
             
              <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-icon btn-danger" @click="releaseCppt()"><i class="ri-close-line"></i></button>
                <!-- <span class="label label-lg label-pill label-inline mr-2 label-primary pointer" @click="selectCppt(cppt_obj)"><i class="ri-install-line text-white mr-3"></i> Pilih CPPT</span> -->
              </div>
            </div>
          </div>
        </div>

        <div class="card card-custom" v-if="oResep && oResep.id">
          <div class="card-header p-3 pb-0">
            <div class="col-12 d-flex justify-content-between align-items-center">
              <ul class="nav nav-tabs nav-tabs-line mb-5">
                <li class="nav-item" v-if="oResep.tahap_resep === 0">
                  <a class="nav-link pointer active">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Draft Dokter</span>
                  </a>
                </li>
                <li class="nav-item" v-else-if="oResep.tahap_resep === 1">
                  <a class="nav-link pointer active">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Telaah Resep</span>
                  </a>
                </li>
                <li class="nav-item" v-else-if="oResep.tahap_resep === 2">
                  <a class="nav-link pointer active">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Persiapan</span>
                  </a>
                </li>
                <li class="nav-item" v-else-if="oResep.tahap_resep === 3">
                  <a class="nav-link pointer active">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Pengecekan</span>
                  </a>
                </li>
                <li class="nav-item" v-else>
                  <a class="nav-link pointer active">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Penyerahan</span>
                  </a>
                </li>
              </ul>
              <p>ID Resep <span class="font-size-xl font-weight-bolder">{{ oResep.id }}</span></p>
            </div>
          </div>
          <div class="card-body p-4">
            <farmasi-draft-dokter v-if="oResep.tahap_resep === 0" :oResep="oResep" :aResepDetail="aResepDetail" :dataRegistrasi="dataRegistrasi" @updateResepData="updateResep" @reloadData="selectRegistrasi(dataRegistrasi)"></farmasi-draft-dokter>
            <farmasi-telaah v-else-if="oResep.tahap_resep === 1" :oResep="oResep" :objectPenjualan="objectPenjualan" :aResepDetail="aResepDetail" :dataRegistrasi="dataRegistrasi" @updateResepData="updateResep" @reloadData="selectRegistrasi(dataRegistrasi)"></farmasi-telaah>
            <farmasi-persiapan v-else-if="oResep.tahap_resep === 2" :oResep="oResep" :aResepDetail="aResepDetail" :dataRegistrasi="dataRegistrasi" @updateResepData="updateResep" @reloadData="selectRegistrasi(dataRegistrasi)"></farmasi-persiapan>
            <farmasi-pengecekan v-else-if="oResep.tahap_resep === 3" :oResep="oResep" :aResepDetail="aResepDetail" :dataRegistrasi="dataRegistrasi" @updateResepData="updateResep" @reloadData="selectRegistrasi(dataRegistrasi)"></farmasi-pengecekan>
            <farmasi-penyerahan v-else :oResep="oResep" :aResepDetail="aResepDetail" :dataRegistrasi="dataRegistrasi" @updateResepData="updateResep" @reloadData="selectRegistrasi(dataRegistrasi)"></farmasi-penyerahan>
          </div>
        </div>
        <template v-else-if="cppt_id === ''">
          <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
            <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.cppt style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
              <div class="card-title" style="padding: 0rem 1rem;">
                <h4 class="card-label">
                  Pilih CPPT
                </h4>
              </div>
              <div class="card-toolbar" style="margin: .5rem 1rem;">
                <i class="ri-arrow-down-double-line text-white" v-if="collapse.cppt"></i>
                <i class="ri-arrow-right-double-line text-white" v-else></i>
            </div>
            </b-card-header>
            <b-collapse id="cppt" v-model="collapse.cppt" accordion="accordion-cppt" role="tabpanel">
              <b-card-body class="bg-light-primary">
                
                <div class="spinner spinner-track spinner-primary" v-if="cppt_loading"></div>

                <div class="d-flex flex-column align-items-center justify-content-center" v-else-if="data_cppt.length === 0">
                  <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
                  <h5 class="font-weight">CPPT Tidak tersedia untuk kunjungan ini.</h5>
                </div>

                <div class="card p-3  mb-3 bg-light-warning" v-for="item in data_cppt" :key="'cppt'+item.cppt_id">
                  <div class="d-flex flex-row justify-content-between align-items-center">
                    <div class="">
                      <p class="mb-2"><strong>{{ item.tanggal_cppt | parse('longDateTime') }}</strong></p>
                      <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ item.nama_dokter }}</h5>
                    </div>
                    <div>
                      <p style="text-align: end;"><strong>{{ item.nama_tenaga_medis }} ({{ item.nama_tipe_tenaga_medis }})</strong></p>
                     
                      <div class="d-flex justify-content-end">
                        <span class="label label-lg label-pill label-inline mr-2 label-primary pointer" @click="selectCppt(item)"><i class="ri-install-line text-white mr-3"></i> Pilih CPPT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

        </template>
        <div class="card card-custom" v-else>
          <div class="card-body d-flex flex-column align-items-center justify-content-center">
            <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
            <h5 class="font-weight">Resep tidak ditemukan</h5>
            
            <div class="spinner spinner-track spinner-primary mr-15 mt-3" v-if="loading"></div>

            <div class="mt-3" v-else>
              <button class="btn btn-warning" @click="syncResepWithAssesmen()"><i class="ri-loop-right-line"></i> Sync dengan CPPT</button>
              <button class="btn btn-primary" v-if="false" @click="createResep()"><i class="ri-save-line"></i> Buat resep baru</button>
            </div>
          </div>
        </div>

      </div>
      <template v-else>
        <div class="xl-9 col-md-9 col-sm-12">

          <div class="card card-custom">
            <div class="card-body text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h5 class="font-weight">Pilih Registrasi Dahulu</h5>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
  
<script>
  import CardRegistrasiRanap from './_components/card_registrasi_ranap.vue'
  import FarmasiDraftDokter from './_components/farmasi/farmasi_draft_dokter.vue'
  import FarmasiTelaah from './_components/farmasi/farmasi_telaah.vue'
  import FarmasiPersiapan from './_components/farmasi/farmasi_persiapan.vue'
  import FarmasiPengecekan from './_components/farmasi/farmasi_pengecekan.vue'
  import FarmasiPenyerahan from './_components/farmasi/farmasi_penyerahan.vue'
  
  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_rnap_farmasi',
    components: { CardRegistrasiRanap, FarmasiDraftDokter, FarmasiTelaah, FarmasiPersiapan, FarmasiPengecekan, FarmasiPenyerahan },
    data () {
      return {
        endpoint: 'resep_rnap',
        hasResep: false,
        loading: false,

        dataRegistrasi: {},
        registrasi_id: '',

        collapse: {},

        data_cppt: [],
        cppt_loading: false,
        cppt_obj: {},
        cppt_id: '',

        is_validasi: false,
        oResep: {},
        aResepDetail: [],
        dataResep: {
        //   subjective: {},
        //   objective: {},
        //   assesment: {},
        //   planning: {}
        },
        

        dataChangeStatus: false,
        activeTab: 'subjective',

        objectPenjualan: {}
      }
    },
    watch: {
      registrasi_id: {
        deep: true,
        intermediate: true,
        handler: function(to, from) {
          this.releaseCppt()
          if( to !== from) {
            this.findCppt();
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      async selectRegistrasi (e) {
        if(e && e.registrasi_id !== undefined) {
            this.dataRegistrasi = e
            this.registrasi_id = e.registrasi_id || ''
        }
        if (!this.registrasi_id) return

        // RESET CPPT
        // this.cppt_id = ''
        if(this.cppt_id === '') {
          return;
        }
        
        // START CODING LAMA
        // this.$_api.post('penjualan/list', { registrasi_id: e.registrasi_id, cppt_id: this.cppt_id }).then((res) => {

        //   if (res.data.length === 0) {
        //     this.$_alert.error({}, 'Penjualan tidak ditemukan')
        //     return
        //   }
        //   this.objectPenjualan = res.data[0]
        //   console.log('objectPenjualannnnnnnnnnnnnnnnn', this.objectPenjualan)
        // })
        // END CODING LAMA

        let penjualan = await this.$_api.post('penjualan/list', { registrasi_id: e.registrasi_id })
        if (penjualan.data.length === 0) {
          // BUAT PENJUALAN
          await this.createPenjualan(this.dataRegistrasi);
          
          penjualan = await this.$_api.post('penjualan/list', { registrasi_id: e.registrasi_id })
        }
        this.objectPenjualan = penjualan.data[0]

        this.$_api.post(`${this.endpoint}/listWithParam`, { registrasi_id: e.registrasi_id, cppt_id: this.cppt_id, page: 1, limit: 99999 } ).then((res) => {
          console.log('listWithParam', res.data)  
          // if (!res.data.length) this.createResep()
          if (!res.data.length) {
            this.hasResep = false
            this.oResep = {}
          }
          else {
            this.hasResep = true
            this.oResep = res.data[0]
            this.findDetailResep()
          }
        })
      },
      findDetailResep () {
        this.$_api.post('resep_detail_rnap/list', { resep_rnap_id: this.oResep.id, is_racik: 0, page: 1, limit: 99999 }).then((res) => {
          // this.aResepDetail = res.data.filter((x) => x.resep_id === this.oResep.id)
          this.aResepDetail = res.data
        })
      },
      syncResepWithAssesmen () {
        
        if (!this.registrasi_id) {
          this.$_alert.error({}, 'Registrasi tidak ditemukan')
          return
        }

        if (!this.cppt_id) {
          this.$_alert.error({}, 'CPPT tidak ditemukan')
          return
        }
        
        this.loading = true
        
        let param = {
          registrasi_id: this.registrasi_id,
          cppt_id: this.cppt_id,
        }

        this.$_api.post(`${this.endpoint}/syncWithAssesmenIgd`, param).then((res) => {
            // this.oResep = res.data
            this.loading = false
            this.selectRegistrasi(this.dataRegistrasi)
        })
        .catch((err) => {
          this.$_alert.error(err)
          this.loading = false  
        })
      },
      createResep () {
        if (!this.registrasi_id) {
          this.$_alert.error({}, 'Registrasi tidak ditemukan')
          return
        }
        
        this.loading = true

        let param = {
          registrasi_id: this.registrasi_id,
          cppt_id: this.cppt_id,
          "tepat_obat": false,
          "tepat_dosis": false,
          "tepat_rute": false,
          "tepat_waktu": false,
          "duplikasi": false,
          "alergi": false,
          "interaksi_obat": false,
          "kontra_indikasi_lain": false,
          "kesesuaian_fornas": false,
          "tahap_resep": 0,
        }

        this.$_api.create(this.endpoint, param).then((res) => {
            this.oResep = res.data
            this.loading = false
            this.findDetailResep()
        })
      },
      updateResep (data) {
        // console.log('key', key)
        // console.log('data', data)
        console.log('data.disabledConfirm', data.disabledConfirm)
        if (data.disabledConfirm === true) {
          this.$_api.update(this.endpoint, data).then((res) => {
            this.selectRegistrasi(this.dataRegistrasi)
          }).catch((err) => {
            this.$_alert.error(err)
          })
        } else {
          this.$_alert.confirm('Konfirmasi', 'anda yakin ingin melanjutkan?').then((status) => {
            if (status.isDismissed) {
              this.selectRegistrasi(this.dataRegistrasi)
            }
            else {
              this.$_api.update(this.endpoint, data).then((res) => {
                this.selectRegistrasi(this.dataRegistrasi)
              }).catch((err) => {
                this.$_alert.error(err)
              })
            }
          })
        }
        
      },
      dataChange (status) {
        this.dataChangeStatus = status
      },
      switchActiveTab (e) {
        if (this.dataChangeStatus) this.$_alert.confirm('Data belum disimpan!', 'Yakin ingin melanjutkan?').then((status) => {
            if (status.isDismissed) return
            else {
              // this.$set(this.dataResep, e , this.oResep.json_assesment_farmasi_rnap[e])
              this.dataResep[e] = this.oResep.json_assesment_farmasi_rnap[e]
              this.dataChangeStatus = false
              this.activeTab = e
              if (e === 'assesment') {
                if (!this.dataResep[e].keperawatan) this.dataResep[e].keperawatan = []
                if (!this.dataResep[e].kebidanan) this.dataResep[e].kebidanan = []
              } else if (e === 'planning') {
                if (!this.dataResep[e].obat_jadi) this.dataResep[e].obat_jadi = []
                if (!this.dataResep[e].obat_racikan) this.dataResep[e].obat_racikan = []
              }
            }
        })
        else {
            this.dataResep[e] = this.oResep.json_assesment_farmasi_rnap[e]
            this.dataChangeStatus = false
            this.activeTab = e
            if (e === 'assesment') {
                if (!this.dataResep[e].keperawatan) this.dataResep[e].keperawatan = []
                if (!this.dataResep[e].kebidanan) this.dataResep[e].kebidanan = []
            } else if (e === 'planning') {
                if (!this.dataResep[e].obat_jadi) this.dataResep[e].obat_jadi = []
                if (!this.dataResep[e].obat_racikan) this.dataResep[e].obat_racikan = []
              }
        }
        // this.$nextTick().then(res => {
        //   this.getAllData()
        // })
      },
      findCppt() {
        const registrasi_id = this.registrasi_id;
        
        this.cppt_id = ''
        this.cppt_loading = true;
        this.collapse.cppt = true;

        this.$_api.post(`cppt/list`, { registrasi_id: registrasi_id, kode_tipe_tenaga_medis: 'Dr' }).then((res) => {
          this.cppt_loading = false;
          this.data_cppt = res.data;
        })
        .catch((err) => {
          this.cppt_loading = false;
          console.log(err);
          this.$_alert.error(err);
        });
      },
      selectCppt(item) {
        this.cppt_obj = item
        this.cppt_id = item.cppt_id
        this.collapse.cppt = false

        this.selectRegistrasi(this.dataRegistrasi)
      },
      releaseCppt() {
        this.cppt_obj = {}
        this.cppt_id = ''
        this.collapse.cppt = true

        // RELEASE DATA RESEP JUGA
        this.oResep = {}
      },
      async createPenjualan(registrasi) {
        console.log('registrasi', registrasi)
        // PENJUALAN
        let penjualan = {
          tgl_penjualan: registrasi.tgl_registrasi,
          NIK: registrasi.nik,
          nama: registrasi.nama_lengkap,
          registrasi_id: registrasi.registrasi_id,
          kelas_kunjungan_id: registrasi.kelas_kunjungan_id,
          ms_asuransi_id: registrasi.ms_asuransi_id,
          ms_dokter_id: registrasi.ms_dokter_id,
          ms_jenis_layanan_id: registrasi.ms_jenis_layanan_id,

          is_external: false,
          jenis_rawat: 'RANAP',
          harga_total_barang: 0,
          harga_total_jasa: 0,
          harga_total_fasilitas: 0,
          discount: 0,
          tax: 0,
          total_penjualan: 0,
          status_penjualan: 1,

          ms_gudang_id: '0fd76213-f360-4851-9ddb-6ee684fafb63', // Gudang Utama

          // tgl_penjualan: '',
          // NIK: '',
          // nama: '',
          // registrasi_id: '',
          // kelas_kunjungan_id: '',
          // ms_asuransi_id: '',
          // ms_dokter_id: '',
          // ms_jenis_layanan_id: '',
          // no_kunjungan: '',
          // no_rm: '',
          
          // nama_penjualan_external: '',
          // alamat_penjualan_external: '',
          // keterangan_penjualan_external: '',
          // pasien_id: '',

          bulk_fasilitas: [],
          bulk_jasa: [],
          bulk_barang: [],
          bulk_penunjang: [],
        };
        
        const res = this.$_api.post('penjualan/registerBulk', penjualan);

        return res.data
      },
      submit (data) {
        console.log('submit', data)
      },
    }
  }
</script>
  
<style scope>
.pointer {
  cursor: pointer;
}
</style>