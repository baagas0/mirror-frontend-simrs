<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-rjalan @selected="selectRegistrasi"/>
      </div>
      <div class="xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <div class="ribbon-target" :class="{'bg-warning': !is_validasi, 'bg-success': is_validasi}" style="top: 10px; right: 0px;">{{ is_validasi ? 'Sudah' : 'Belum' }} Validasi</div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && !is_validasi" @click="doValidasi()">Validasi Sekarang</button>
                <button class="btn btn-success mt-3" @click="$bvModal.show('modal-pasien')">Riwayat Kunjungan</button>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-custom mb-5" v-if="loadingAssesmen">
          <div class="card-body d-flex justify-content-center">
            <div class="spinner spinner-track spinner-primary"></div>
          </div>
        </div>
        <template v-else-if="dataRegistrasi && registrasi_id && dataAssesmen && dataAssesmen.subjective && dataAssesmen.objective && dataAssesmen.assesment && dataAssesmen.planning">
          <!-- <pre>{{dataAssesmen.planning}}</pre>
          <pre>{{dataAssesmen.di_rujuk}}</pre> -->
          <div class="row no-gutters mb-5 nav nav-primary nav-pills gap-8">
            <a @click="switchActiveTab('subjective')" :class="activeTab==='subjective'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Subjective</a>
            <a @click="switchActiveTab('objective')" :class="activeTab==='objective'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Objective</a>
            <a @click="switchActiveTab('assesment')" :class="activeTab==='assesment'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Assessment</a>
            <a @click="switchActiveTab('planning')" :class="activeTab==='planning'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Planning</a>

            <a @click="switchActiveTab('di_rujuk')" :class="activeTab==='di_rujuk'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Di Rujuk</a>
            <!-- <a @click="switchActiveTab('gizi')" :class="activeTab==='gizi'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Gizi</a>
            <a @click="switchActiveTab('status_psikolog')" :class="activeTab==='status_psikolog'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Status Psikolog</a>
            <a @click="switchActiveTab('sosial_ekonomi')" :class="activeTab==='sosial_ekonomi'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Sosial & Ekonomi</a>
            <a @click="switchActiveTab('status_fungsional')" :class="activeTab==='status_fungsional'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Status Fungsional</a> -->
          </div>
          <template v-if="activeTab==='subjective'">
            <keperawatan-subjective v-if="dataAssesmen && dataAssesmen.subjective" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.subjective" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-subjective>
          </template>
          <template v-if="activeTab==='objective'">
            <keperawatan-objective v-if="dataAssesmen && dataAssesmen.objective" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.objective" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-objective>
          </template>
          <template v-if="activeTab==='assesment'">
            <keperawatan-assesment v-if="dataAssesmen && dataAssesmen.assesment" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.assesment" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-assesment>
          </template>
          <template v-if="activeTab==='planning'">
            <keperawatan-planning v-if="dataAssesmen && dataAssesmen.planning" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.planning" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-planning>
          </template>

          <template v-if="activeTab==='di_rujuk'">
            <keperawatan-di-rujuk v-if="dataAssesmen && dataAssesmen.di_rujuk" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.di_rujuk" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-di-rujuk>
          </template>
          <template v-if="activeTab==='gizi'">
            <keperawatan-gizi v-if="dataAssesmen && dataAssesmen.gizi" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.gizi" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-gizi>
          </template>
          <template v-if="activeTab==='status_psikolog'">
            <keperawatan-status-psikolog v-if="dataAssesmen && dataAssesmen.status_psikolog" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.status_psikolog" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-status-psikolog>
          </template>
          <template v-if="activeTab==='sosial_ekonomi'">
            <keperawatan-sosial-ekonomi v-if="dataAssesmen && dataAssesmen.sosial_ekonomi" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.sosial_ekonomi" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-sosial-ekonomi>
          </template>
          <template v-if="activeTab==='status_fungsional'">
            <keperawatan-status-fungsional v-if="dataAssesmen && dataAssesmen.status_fungsional" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.status_fungsional" @submit="updateAssesmen" @dataChange="dataChange"></keperawatan-status-fungsional>
          </template>
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
            </div>
          </div>
        </template>
      </div>
    </div>

    <ModalPasien 
      :dataRegistrasi="dataRegistrasi"
    />
  </div>
</template>
  
<script>
  import CardRegistrasiRjalan from './_components/card_registrasi_rjalan.vue'
  import KeperawatanSubjective from './_components/keperawatan_subjective.vue'
  import KeperawatanObjective from './_components/keperawatan_objective.vue'
  import KeperawatanAssesment from './_components/keperawatan_assesment.vue'
  import KeperawatanPlanning from './_components/keperawatan_planning.vue'
  
  import KeperawatanDiRujuk  from './_components/keperawatan_di_rujuk.vue'
  import KeperawatanGizi  from './_components/keperawatan_gizi.vue'
  import KeperawatanStatusPsikolog  from './_components/keperawatan_status_psikolog.vue'
  import KeperawatanSosialEkonomi  from './_components/keperawatan_sosial_ekonomi.vue'
  import KeperawatanStatusFungsional  from './_components/keperawatan_status_fungsional.vue'
  import ModalPasien  from '../modal_pasien.vue'

  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_rjalan_keperawatan',
    components: { CardRegistrasiRjalan, KeperawatanSubjective, KeperawatanObjective, KeperawatanAssesment, KeperawatanPlanning, KeperawatanDiRujuk, KeperawatanGizi, KeperawatanStatusPsikolog, KeperawatanSosialEkonomi, KeperawatanStatusFungsional, ModalPasien },
    data () {
      return {
        info_alert: '',
        loadingAssesmen: false,
        endpoint: 'assesment_keperawatan_rjalan',

        dataRegistrasi: {},
        registrasi_id: '',

        is_validasi: false,
        objectDataAssesmen: {},
        dataAssesmen: {
        //   subjective: {},
        //   objective: {},
        //   assesment: {},
        //   planning: {}
          subjective: {},
          objective: {},
          assesment: {},
          planning: {},
          di_rujuk: {},
          gizi: {},
          status_psikolog: {},
          sosial_ekonomi: {},
          status_fungsional: {},
        },
        json_assesment_keperawatan_rjalan: {},
        

        dataChangeStatus: false,
        activeTab: 'subjective'
      }
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      selectRegistrasi (e) {
        // if (this.dataRegistrasi && this.dataRegistrasi.registrasi_id && this.dataRegistrasi.registrasi_id === e.registrasi_id) {
        //   this.dataRegistrasi = {}
        //   this.registrasi_id = ''
        //   this.objectDataAssesmen = {}
        //   this.dataAssesmen = {}
        //   this.json_assesment_keperawatan_rjalan = {}
        //   return
        // }
        this.dataRegistrasi = e
        this.registrasi_id = e.registrasi_id || ''
        if (!this.registrasi_id) return

        this.loadingAssesmen = true

        this.$_api.list(this.endpoint, { registrasi_id: e.registrasi_id } ).then((res) => {
          // if (res.data.length) this.dataAssesmen = res.data[0]
          // else this.createAssesmen()

          let json_assesment_keperawatan_rjalan = {
            subjective: {},
            objective: {},
            assesment: {},
            planning: {},
            di_rujuk: {},
            gizi: {},
            status_psikolog: {},
            sosial_ekonomi: {},
            status_fungsional: {},
          }
          this.json_assesment_keperawatan_rjalan = json_assesment_keperawatan_rjalan

          let assesmen = res.data.filter((x) => x.registrasi_id === e.registrasi_id )
          if(assesmen.length) {
            const a = assesmen[0].json_assesment_keperawatan_rjalan ? assesmen[0].json_assesment_keperawatan_rjalan : json_assesment_keperawatan_rjalan
            this.dataAssesmen = a

            // KALO RESPON API JSON_ASSESMEN NYA OBJECT NYA NGGA ADA BIKIN ERROR, JADI DI ASSIGN OBJECT NYA
            for (const key in json_assesment_keperawatan_rjalan) {
              if (Object.hasOwnProperty.call(json_assesment_keperawatan_rjalan, key)) {
                const e = json_assesment_keperawatan_rjalan[key];
                if (!this.dataAssesmen[key]) {
                  this.dataAssesmen[key] = e
                }
              }
            }

            this.objectDataAssesmen = assesmen[0]
            this.objectDataAssesmen.json_assesment_keperawatan_rjalan = a

            this.is_validasi = assesmen[0].is_validasi
            // this.dataChange = false
          }
          else this.createAssesmen()
          setTimeout(() => {
            this.loadingAssesmen = false
          }, 500);
        }).catch((err) => {
          this.loadingAssesmen = false
          this.$_alert.error({}, 'Tidak dapat mengambil data assesmen!')
        })
      },
      createAssesmen () {
        let param = {
          registrasi_id: this.registrasi_id,
          is_validasi: false,
          json_assesment_keperawatan_rjalan: this.json_assesment_keperawatan_rjalan
        }

        this.$_api.create(this.endpoint, param).then((res) => {
          // this.dataAssesmen = res.data.json_assesment_keperawatan_rjalan
          // this.dataAssesmen = param.json_assesment_keperawatan_rjalan
          this.selectRegistrasi(this.dataRegistrasi)
        })
      },
      updateAssesmen (data) {
        
        let payload = this.objectDataAssesmen
        payload.json_assesment_keperawatan_rjalan[data.key] = data.data
        this.$_api.update(this.endpoint, payload).then((res) => {
          this.selectRegistrasi(this.dataRegistrasi)
          this.dataChangeStatus = false
          this.$_alert.success('Berhasil memperbarui data')
          // if (data.open_tab) this.switchActiveTab(data.open_tab)
          // else this.switchActiveTab('subjective')
        }).catch((err) => {
          this.dataChangeStatus = false
        })
      },
      doValidasi () {
        if (this.objectDataAssesmen.is_validasi) {
          this.$_alert.error({}, 'Data sudah divalidasi!')
          return
        }

        const validation = [
          { tab: 'subjective', key: 'keluhan_utama', required: true, type: 'string', message: 'Subjective - Keluhan Utama tidak boleh kosong.' },
          { tab: 'subjective', key: 'tujuan_kunjungan', required: true, type: 'string', message: 'Subjective - Tujuan Kunjugan tidak boleh kosong.' },
          { tab: 'subjective', key: 'riwayat_kesehatan_saat_ini', required: true, type: 'string', message: 'Subjective - Riwayat Kesehatan tidak boleh kosong.' },

          { tab: 'objective', key: 'nadi', required: true, type: 'string', message: 'Objective - Nadi tidak boleh kosong.' },
          { tab: 'objective', key: 'suhu', required: true, type: 'string', message: 'Objective - Suhu tidak boleh kosong.' },
          { tab: 'objective', key: 'sistolik', required: true, type: 'string', message: 'Objective - Sistolik tidak boleh kosong.' },
          { tab: 'objective', key: 'diastolik', required: true, type: 'string', message: 'Objective - Diastolik tidak boleh kosong.' },
          { tab: 'objective', key: 'kesadaran', required: true, type: 'string', message: 'Objective - Kesadaran tidak boleh kosong.' },
          { tab: 'objective', key: 'pernafasan', required: true, type: 'string', message: 'Objective - Pernafasan tidak boleh kosong.' },
          { tab: 'objective', key: 'berat_badan', required: true, type: 'string', message: 'Objective - Berat Badan tidak boleh kosong.' },
          { tab: 'objective', key: 'keadaan_umum', required: true, type: 'string', message: 'Objective - Keadaan Umum tidak boleh kosong.' },
          { tab: 'objective', key: 'tinggi_badan', required: true, type: 'string', message: 'Objective - Tinggi Badan tidak boleh kosong.' },
          { tab: 'objective', key: 'lingkar_kepala', required: true, type: 'string', message: 'Objective - Lingkar Kepala tidak boleh kosong.' },
          // { tab: 'objective', key: 'skrining_nyeri', required: true, type: 'string', message: 'Objective - Skrining Nyeri tidak boleh kosong.' },
          { tab: 'objective', key: 'index_masa_tubuh', required: true, type: 'string', message: 'Objective - IMT tidak boleh kosong.' },
          { tab: 'objective', key: 'pemeriksaan_fisik', required: true, type: 'string', message: 'Objective - Pemeriksaan Fisik tidak boleh kosong.' },

          // { tab: 'assesment', key: 'kebidanan', required: true, type: 'array', message: 'Assesment - Kebidanan tidak boleh kosong.' },
          // { tab: 'assesment', key: 'keperawatan', required: true, type: 'array', message: 'Assesment - Keperawatan tidak boleh kosong.' },

          // { tab: 'planning', key: 'rencana', required: false, type: 'string', message: 'Planning - Rencana tidak boleh kosong.' },

          // { tab: 'di_rujuk', key: 'rujuk', required: false, type: 'string', message: 'Planning - Rencana tidak boleh kosong.' },
          
          // { tab: 'gizi', key: 'status_gizi', required: false, type: 'string', message: 'Planning - Rencana tidak boleh kosong.' },

          // { tab: 'status_psikolog', key: 'perasaan', required: false, type: 'string', message: 'Psikolog - Perasaan tidak boleh kosong.' },
          // { tab: 'status_psikolog', key: 'perasaan_lain_lain', required: false, type: 'string', message: 'Psikolog - Rencana tidak boleh kosong.' },
          // { tab: 'status_psikolog', key: 'kecenderungan_bunuh_diri', required: false, type: 'string', message: 'Psikolog - Rencana tidak boleh kosong.' },
          // { tab: 'status_psikolog', key: 'masalah_perilaku', required: false, type: 'string', message: 'Psikolog - Masalah Perilaku tidak boleh kosong.' },
          // { tab: 'status_psikolog', key: 'masalah_perilaku_text', required: false, type: 'string', message: 'Psikolog - Rencana tidak boleh kosong.' },
          
          // { tab: 'sosial_ekonomi', key: 'status_pernikahan', required: false, type: 'string', message: 'Sosial dan Ekonomi - Status Pernikahan tidak boleh kosong.' },
          // { tab: 'sosial_ekonomi', key: 'hubungan_keluarga', required: false, type: 'string', message: 'Sosial dan Ekonomi - Hubungan Keluarga tidak boleh kosong.' },
          // { tab: 'sosial_ekonomi', key: 'tempat_tinggal', required: false, type: 'string', message: 'Sosial dan Ekonomi - Tempat Tinggal tidak boleh kosong.' },
          // { tab: 'sosial_ekonomi', key: 'tempat_tinggal_lain_lain', required: false, type: 'string', message: 'Sosial dan Ekonomi - Rencana tidak boleh kosong.' },
          
          // { tab: 'status_fungsional', key: 'penggunaan_alat_bantu', required: false, type: 'string', message: 'Status Fungsional - Rencana tidak boleh kosong.' },
          // { tab: 'status_fungsional', key: 'cacat_tubuh', required: false, type: 'string', message: 'Status Fungsional - Rencana tidak boleh kosong.' },
          // { tab: 'status_fungsional', key: 'cacat_tubuh_lain_lain', required: false, type: 'string', message: 'Status Fungsional - Rencana tidak boleh kosong.' },


        ]

        // CHECK VALIDASI
        for (const v of validation) {
          if (v.required) {
            if (this.dataAssesmen[v.tab] && this.dataAssesmen[v.tab][v.key]) {
              const value = this.dataAssesmen[v.tab][v.key]
              if (v.type === 'string') {
                if (!value || value == undefined || value === '') {
                  this.$_alert.error({}, v.message+'1')
                  return
                }
              } else if(v.type === 'array') {
                if (!Array.isArray(value) || value.length === 0) {
                  this.$_alert.error({}, v.message+'2')
                  return
                }
              }
            } else {
              this.$_alert.error({}, v.message+'3 ')
              return
            }
          }
        }

        this.$_alert.confirm('Validasi data', 'apakah anda yakin ingin menvalidasi data assesmen?').then((status) => {
          if (status.isDismissed) return
          else {
            this.objectDataAssesmen.is_validasi = true
            this.updateAssesmen(this.dataAssesmen)
          }
        });
      },
      dataChange (status) {
        this.dataChangeStatus = status
      },
      switchActiveTab (e) {
        this.dataAssesmen[e] = this.objectDataAssesmen.json_assesment_keperawatan_rjalan[e]
        this.dataChangeStatus = false
        this.activeTab = e
        if (e === 'assesment') {
            if (!this.dataAssesmen[e].keperawatan) this.dataAssesmen[e].keperawatan = []
            if (!this.dataAssesmen[e].kebidanan) this.dataAssesmen[e].kebidanan = []
        }
        // this.$nextTick().then(res => {
        //   this.getAllData()
        // })
      },
    }
  }
</script>
  