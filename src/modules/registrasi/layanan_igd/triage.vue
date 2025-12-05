<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-triage @selected="selectRegistrasi" :refreshKey="refreshKeyList"/>
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12">
        <!-- Susunan Baru -->
        <template v-if="state === '' || state === null">
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- DETAIL TRIAGE -->
          <div class="card card-custom mb-5 card-sticky" v-if="objectTriage && objectTriage.id">
            <div class="card-body ribbon ribbon-right">
              <div class="ribbon-target" :class="{'bg-warning': !is_validasi, 'bg-success': is_validasi}" v-if="this.objectTriage.is_validasi" style="top: 10px; right: 0px;">{{ is_validasi ? 'Sudah' : 'Belum' }} Validasi</div>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ objectTriage.nama || '-' }}</h5>
                  <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">{{ objectTriage.nik || '-' }}</p>
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ objectTriage.tgl_lahir | parse('date') }}</p>

                  <button class="btn btn-primary mt-3" v-if="true" @click="cetakTriage('cetak-triage-igd')"><i class="ri-printer-line"></i> Cetak Triage</button>

                </div>
                <div class="text-center">
                  <!-- <i class="ri-checkbox-circle-line" v-if="objectTriage.is_registrasi" v-b-tooltip="'Telah memiliki registrasi'"></i>
                  <i class="ri-checkbox-blank-circle-line" v-else v-b-tooltip="'Belum memiliki registrasi'"></i> -->
                  <button class="btn btn-light-primary" @click="state = 'form-update'" :disabled="state === 'form-update'">
                    <i class="ri-edit-2-line"></i>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- COMPONENT TRIAGE -->
          <div class="card card-custom mb-5" v-if="loadingAssesmen">
            <div class="card-body d-flex justify-content-center">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>
          <template v-else>

            <template v-if="state.includes('form')">
              <div class="card card-custom">
                <div class="card-header">
                  <h3 class="card-title">
                    Buat Triage Layanan IGD
                  </h3>
                  <div class="card-toolbar">
                    <a class="btn btn-outline-primary btn-icon btn-circle" @click="state = objectTriage.id ? 'assesmen' : ''">
                      <i class="ri-arrow-go-back-line p-0"></i>
                    </a>
                  </div>
                </div>
                <div class="card-body">
                  <!--begin::Form-->
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form ref="assesmenForm" @submit.prevent="handleSubmit(submitTriage)" autocomplete="off">
                      <div class="card-body">
                        <div class="form-group mb-8">
                          <div class="alert alert-custom alert-default" role="alert">
                            <div class="alert-icon"><i class="flaticon-warning text-primary"></i></div>
                            <div class="alert-text">
                              Isi form dibawah ini untuk membuat triage layanan IGD.
                            </div>
                          </div>
                        </div>

                        <div class="col-12" v-if="state === 'form-create'">
                          <s-input v-model="objectTriage.input_source" :item="{
                            label: 'Data Dari?',
                            id: 'input_source',
                            data: 'input_source',
                            type: 'radio',
                            validation: ['required'],
                            value: objectTriage.input_source,
                            return_object: true,
                            pointer: {
                              label: 'label',
                              code: 'code',
                              list: [
                                { code: 'input', label: 'Input Manual' },
                                { code: 'rekam_medis', label: 'Rekam Medis' },
                              ]
                            },
                            param: {},
                          }" :valuee="objectTriage.input_source" />
                        </div>
                        
                        <div class="col-12" v-if="objectTriage.input_source && objectTriage.input_source === 'rekam_medis'">
                          <s-input v-model="objectTriage.pasien" :item="{
                            label: 'Rekam Medis',
                            id: 'pasien',
                            data: 'pasien',
                            type: 'lookup-radio',
                            validation: ['required'],
                            value: objectTriage.pasien,
                            return_object: true,
                            api: 'pasien/listPerHalamanBypassUri',
                            pointer: {
                              label: 'nama_lengkap',
                              code: 'pasien_id',
                              display: ['no_rm', 'nik', 'nama_lengkap', 'jenis_kelamin|kelamin', 'tempat_lahir', 'tgl_lahir|date'],
                              headerDisplay: ['No. RM', 'NIK','Nama Lengkap', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir']
                            },
                            param: {},
                          }" :valuee="objectTriage.pasien" />
                        </div>
                        
                        <div class="col-12">
                          <s-input v-model="objectTriage.nama" :key="'nama'" :id="'nama'" :item="{
                            label: 'Nama',
                            id: 'nama',
                            data: 'nama',
                            type: 'text',
                            validation: ['required'],
                            value: objectTriage.nama,
                            param: {},
                          }" :valuee="objectTriage.nama" />
                        </div>

                        <div class="col-12">
                          <s-input v-model="objectTriage.nik" :key="'nik'" :id="'nik'" :item="{
                            label: 'NIK',
                            id: 'nik',
                            data: 'nik',
                            type: 'text',
                            validation: ['required'],
                            value: objectTriage.nik,
                            param: {},
                          }" :valuee="objectTriage.nik" />
                        </div>

                        <div class="col-12">
                          <s-input v-model="objectTriage.tgl_lahir" :key="'tgl_lahir'" :id="'tgl_lahir'" :item="{
                            label: 'Tanggal Lahir',
                            id: 'tgl_lahir',
                            data: 'tgl_lahir',
                            type: 'date',
                            validation: ['required'],
                            value: objectTriage.tgl_lahir,
                            param: {},
                          }" :valuee="objectTriage.tgl_lahir" />
                        </div>
      
                      </div>
                      <div class="card-footer">
                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                      </div>
                    </form>
                  </ValidationObserver>
                  <!--end::Form-->
                </div>
              </div>
            </template>
            <template v-else>
              <div class="accordion mb-5" role="tablist"> 
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(submitTriage)" autocomplete="off">
                    <!-- Anamnesa -->
                    <triage-triage :objectDataAssesmen="objectTriage" :mData="dataAssesmen.triage"></triage-triage>

                    <!-- Anamnesa -->
                    <triage-death-on-arrival :objectDataAssesmen="objectTriage" :mData="dataAssesmen.death_on_arrival"></triage-death-on-arrival>

                    <!-- Anamnesa -->
                    <triage-pemeriksaan-vital :objectDataAssesmen="objectTriage" :mData="dataAssesmen.pemeriksaan_vital"></triage-pemeriksaan-vital>

                    <!-- Anamnesa -->
                    <triage-kategori-triage :objectDataAssesmen="objectTriage" :mData="dataAssesmen.kategori_triage"></triage-kategori-triage>

                    <!-- Anatomi -->
                    <triage-anatomi :is_validasi="false" :objectDataAssesmen="objectTriage" :mData="dataAssesmen.anatomi"></triage-anatomi>

                    <!-- Submit -->
                    <template>
                      <div class="col-12 align-self-center p-0 mt-3">
                        <button type="submit" class="btn btn-primary mr-3 w-100">
                          <i class="ri-save-line"></i>
                          {{ $t('global.submit') }} 
                        </button>
                      </div>
                    </template>
                  </form>
                </ValidationObserver>
              </div>
            </template>

          </template>

        </template>
        
      </div>
    </div>

    <div id="cetak-triage-igd" style="position: relative; display: none">
      <div size="A4">
        <div class="" style=" align-items: center; width: 99%; margin-bottom: 10px;">
            <!-- KOP -->
            <table class="custom-table" v-if="dataAssesmen">
              <tr>
                  <td rowspan="2" style="height: 60px;"><img :src="$_config.logo.lg" alt="" height="70px"></td>
                  <td style="height: 25px; align-items: center;vertical-align: middle;">
                      <h5 style="font-weight: 600; font-size: 25px; line-height: 35px;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h5>
                  </td>
                  
              </tr>
              <tr>
                  <td style="height: 15px;">
                      Jl. Gajah mada kec.batauga kab.buton selatan, sulawesi tenggara
                  </td>
              </tr>

              <tr class="bg-dark">
                <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Pasien</td>
              </tr>
              <tr>
                  <td colspan="3">
                      <table class="custom-table">
                          <tr>
                              <td>NIK</td>
                              <td>:</td>
                              <td>{{ objectTriage.nik || '-' }}</td>
                          </tr>
                          <tr>
                              <td>Nama</td>
                              <td>:</td>
                              <td>{{ objectTriage.nama || '-' }}</td>
                          </tr>
                          <tr>
                              <td>Tanggal Lahir</td>
                              <td>:</td>
                              <td>{{ objectTriage.tgl_lahir | parse('date') }}</td>
                          </tr>
                      </table>
                  </td>
              </tr>

              <tr class="bg-dark">
                  <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Triage IGD</td>
              </tr>
              <tr>
                  <td colspan="3">
                      <table class="custom-table">
                          <tr>
                              <td>Dikirim Oleh</td>
                              <td>:</td>
                              <td>{{ dataAssesmen.triage && dataAssesmen.triage.dikirim_oleh ? dataAssesmen.triage.dikirim_oleh : '-' }}</td>
                          </tr>
                          <tr>
                              <td>Cara Datang</td>
                              <td>:</td>
                              <td>{{ dataAssesmen.triage && dataAssesmen.triage.cara_datang ? dataAssesmen.triage.cara_datang : '-' }}</td>
                          </tr>
                          <tr>
                              <td>Kasus Polisi</td>
                              <td>:</td>
                              <td>{{ dataAssesmen.triage && dataAssesmen.triage.kasus_polisi ? dataAssesmen.triage.kasus_polisi : '-' }}</td>
                          </tr>
                          <tr>
                            <td>Pasien</td>
                            <td>:</td>
                            <td>{{ dataAssesmen.triage && dataAssesmen.triage.pasien ? dataAssesmen.triage.pasien : '-' }}</td>
                        </tr>
                      </table>
                  </td>
              </tr>

              <tr class="bg-dark">
                <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Death On Arrival</td>
              </tr>
              <tr>
                  <td colspan="3">
                      <table class="custom-table">
                        <tr>
                          <td>Death On Arrival</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.death_on_arrival && dataAssesmen.death_on_arrival.death_on_arrival ? dataAssesmen.death_on_arrival.death_on_arrival : '-' }}</td>
                        </tr>
                      </table>
                  </td>
              </tr>

              <tr class="bg-dark">
                <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;"> Pemeriksaan Tanda Tanda Vital </td>
              </tr>
              <tr>
                  <td colspan="3">
                      <table class="custom-table">
                          <tr>
                              <td>
                                  <table class="custom-table">
                                      <tr>
                                          <td>Kesadaran Pasien</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.kesadaran_pasien ? dataAssesmen.pemeriksaan_vital.kesadaran_pasien : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Sistolik</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.sistolik ? dataAssesmen.pemeriksaan_vital.sistolik : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Diastolik</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.diastolik ? dataAssesmen.pemeriksaan_vital.diastolik : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Nadi</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.nadi ? dataAssesmen.pemeriksaan_vital.nadi : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Pernafasan</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.pernafasan ? dataAssesmen.pemeriksaan_vital.pernafasan : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Suhu</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.suhu ? dataAssesmen.pemeriksaan_vital.suhu : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Pemeriksaan Fisik</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.pemeriksaan_fisik ? dataAssesmen.pemeriksaan_vital.pemeriksaan_fisik : '-' }}</td>
                                      </tr>
                                      <tr>
                                        <td>SP02</td>
                                        <td>:</td>
                                        <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.sp02 ? dataAssesmen.pemeriksaan_vital.sp02 : '-' }}</td>
                                      </tr>
                                      <tr>
                                        <td>Pupil</td>
                                        <td>:</td>
                                        <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.pupil ? dataAssesmen.pemeriksaan_vital.pupil : '-' }}</td>
                                      </tr>
                                  </table>
                              </td>
                              <td>
                                  <table class="custom-table">
                                      <tr>
                                          <td>Reaksi Cahaya </td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.reaksi_cahaya ? dataAssesmen.pemeriksaan_vital.reaksi_cahaya : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Tinggi Badan</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.tinggi_badan ? dataAssesmen.pemeriksaan_vital.tinggi_badan : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Berat Badan</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.berat_badan ? dataAssesmen.pemeriksaan_vital.berat_badan : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Index Masa Tubuh</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.index_masa_tubuh ? dataAssesmen.pemeriksaan_vital.index_masa_tubuh : '-' }}</td>
                                      </tr>
                                      <tr>
                                          <td>Skala Nyeri</td>
                                          <td>:</td>
                                          <td>{{ dataAssesmen.pemeriksaan_vital && dataAssesmen.pemeriksaan_vital.skrining_nyeri_pain ? dataAssesmen.pemeriksaan_vital.skrining_nyeri_pain : '-' }}</td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>

              <tr class="bg-dark">
                <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Kategori Triage</td>
              </tr>
              <tr>
                <td colspan="3">
                    <table class="custom-table">
                      <tr>
                        <td>Kategori Triage</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.kategori_triage && dataAssesmen.kategori_triage.kategori_triage ? dataAssesmen.kategori_triage.kategori_triage : '-' }}</td>
                      </tr>
                      <tr>
                        <td>Jalan Nafas</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.kategori_triage && dataAssesmen.kategori_triage.jalan_nafas_kategori ? dataAssesmen.kategori_triage.jalan_nafas_kategori : '-' }}</td>
                      </tr>
                      <tr>
                        <td>Ke Tidak Mampuan Fisik</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.kategori_triage && dataAssesmen.kategori_triage.ketidakmampuan_fisik_kategori ? dataAssesmen.kategori_triage.ketidakmampuan_fisik_kategori : '-' }}</td>
                      </tr>
                      <tr>
                        <td>Pengecekan Nadi Carotis</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.kategori_triage && dataAssesmen.kategori_triage.nadi_carotis_kategori ? dataAssesmen.kategori_triage.nadi_carotis_kategori : '-' }}</td>
                      </tr>
                      <tr>
                        <td>Pernafasan</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.kategori_triage && dataAssesmen.kategori_triage.pernafasan_kategori ? dataAssesmen.kategori_triage.pernafasan_kategori : '-' }}</td>
                      </tr>
                    </table>
                </td>
              </tr>
              
            </table>

            <!-- <div style="padding-bottom: 10px"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import CardTriage from './_components/card_triage.vue'
  import TriageTriage from './_components/triage/triage.vue'
  import TriageDeathOnArrival from './_components/triage/death-on-arrival.vue'
  import TriagePemeriksaanVital from './_components/triage/pemeriksaan-vital.vue'
  import TriageKategoriTriage from './_components/triage/kategori-triage.vue'
  import TriageAnatomi from './_components/triage/anatomi.vue'

  import print from '../../../components/print.js';
  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_igd_medis',
    components: { CardTriage, TriageTriage, TriageDeathOnArrival, TriagePemeriksaanVital, TriageKategoriTriage, TriageAnatomi },
    data () {
      return {
        info_alert: '',
        loadingAssesmen: false,

        state: null,
        endpoint: 'triage',
        refreshKeyList: 0,

        objectTriage: {
          pasien: {}
        },
        dataAssesmen: {
          triage: {},
          death_on_arrival: {},
          pemeriksaan_vital: {},
          kategori_triage: {},
          anatomi: {},
        },
      }
    },
    watch: {
      state: {
        deep: true,
        immediate: true,
        handler(to, from) {
          if (to === 'form-create') {
            this.objectTriage = {
              pasien: {},
              input_source: 'input'
            }
            this.$children[0].activeData = {}

            // Hapus ID
            if (this.objectTriage.id) delete this.objectTriage.id
          } else if (to === 'form-update') {
            this.objectTriage.input_source = 'input'
          }
        }
      },
      'objectTriage.pasien': {
        deep: true,
        immediate: true,
        handler(to, from) {
          const pasien = to
          if (pasien && pasien.pasien_id) {
            this.objectTriage.nama = pasien.nama_lengkap
            this.objectTriage.nik = pasien.nik
            this.objectTriage.tgl_lahir = pasien.tgl_lahir

          }
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.updateScroll);
    },
    methods: {
      async selectRegistrasi (e) {
        this.objectTriage = e
        this.state = 'assesmen'

        if(!e.asesmen) e.asesmen = {}
        let asesmen = e.asesmen
        console.log('asssssssesmen', asesmen)
        this.dataAssesmen.triage = asesmen.triage
        if (!this.dataAssesmen.triage) this.dataAssesmen.triage = {}

        this.dataAssesmen.death_on_arrival = asesmen.death_on_arrival
        if (!this.dataAssesmen.death_on_arrival) this.dataAssesmen.death_on_arrival = {}

        this.dataAssesmen.pemeriksaan_vital = asesmen.pemeriksaan_vital
        if (!this.dataAssesmen.pemeriksaan_vital) this.dataAssesmen.pemeriksaan_vital = {}

        this.dataAssesmen.kategori_triage = asesmen.kategori_triage
        if (!this.dataAssesmen.kategori_triage) this.dataAssesmen.kategori_triage = {}
        if (!this.dataAssesmen.kategori_triage.kategori_triage) this.dataAssesmen.kategori_triage.kategori_triage = 'Dewasa'

        const default_anatomi = {
          data_anatomi: asesmen.anatomi && asesmen.anatomi.data_anatomi ? asesmen.anatomi.data_anatomi : []
        }
        this.dataAssesmen.anatomi = default_anatomi
        // if (!this.dataAssesmen.anatomi) this.dataAssesmen.anatomi = {}
        // if (!this.dataAssesmen.anatomi.data_anatomi) this.dataAssesmen.anatomi.data_anatomi = []

        this.objectTriage = { ...this.objectTriage, asesmen: this.dataAssesmen }
      },
      submitTriage () {
        const mode = this.objectTriage.id ? 'update' : 'create'

        this.$_api[mode](this.endpoint, this.objectTriage).then((res) => {
          this.$_alert.success('Berhasil')
          if (mode === 'create') this.$children[0].selectData(res.data)
          else if(this.objectTriage) this.$children[0].selectData(this.objectTriage)

          this.refreshKeyList++
        })
      },
      async cetakTriage(el) {
          let optionsss = {
            name: '_blank',
            specs: [
              'fullscreen=yes',
              'titlebar=yes',
              'scrollbars=yes'
            ],
            styles: [
              '/static/assets/cetak/cetak-resume-medis.css',
            ],
            timeout: 1000, // default timeout before the print window appears
            autoClose: true, // if false, the window will not close after printing
            windowTitle: window.document.title, // override the window title
          }
  
          //  this.$htmlToPaper(el, optionsss)
          print(el, optionsss);
        }
    }
    
  }
</script>

<style scoped>
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
  }

  .sticky2 {
    z-index: 90; top: 119px; left: 290px; right: 25px;
  }
  header .header-inner {
    transition: all 250ms cubic-bezier(0.33, 1, 0.68, 1);
    max-height: auto;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
</style>