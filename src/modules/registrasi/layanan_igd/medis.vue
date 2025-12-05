<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-igd @selected="selectRegistrasi" />
        <!-- {{ scrollPosition }} -->
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <!-- <pre>{{ objectDataAssesmen }}</pre> -->
            <div class="ribbon-target" :class="{ 'bg-warning': !is_validasi, 'bg-success': is_validasi }"
              v-if="this.objectDataAssesmen.is_validasi" style="top: 10px; right: 0px;">{{ is_validasi ? 'Sudah' : 'Belum'
              }} Validasi</div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{
                  dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin |
                  parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button class="btn btn-warning mt-3"
                  v-if="!loadingAssesmen && !is_validasi && objectDataAssesmen.resume_medis_igd_id && this.objectDataAssesmen.is_validasi"
                  @click="doValidasi()">Validasi Sekarang</button>

                <button class="btn btn-primary mt-3" v-if="!loadingAssesmen && objectDataAssesmen.resume_medis_igd_id"
                  @click="cetakResumeMedis('cetak-resume-medis')"><i class="ri-printer-line"></i> Cetak Resume
                  Medis</button>
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
        <template
          v-else-if="dataRegistrasi && registrasi_id && validasiKeperawatan === false">

          <div class="card card-custom bgi-no-repeat gutter-b"
            style="height: 250px; background-color: #1B283F; background-position: calc(100% + 0.5rem) calc(100% + 0.5rem); background-size: 100% auto; background-image: url(https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/patterns/rhone-2.svg)">
            <!--begin::Body-->
            <div class="card-body">
              <h3 class="text-white font-weight-bolder">!!! Assesmen Medis</h3>
              <p class="text-muted font-size-lg mt-5 mb-10">
                Mohon Validasi assesmen medis terlebih dahulu.
              </p>
              <router-link to="/registrasi/layanan_igd/assesmen_medis" class="btn btn-link btn-link-warning font-weight-bold">
                Validasi Sekarang
                <span
                  class="svg-icon svg-icon-lg svg-icon-warning"><!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                    height="24px" viewBox="0 0 24 24" version="1.1">
                    <title>Stockholm-icons / Navigation / Arrow-right</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"></polygon>
                      <rect fill="#000000" opacity="0.3"
                        transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) "
                        x="11" y="5" width="2" height="14" rx="1"></rect>
                      <path
                        d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                        fill="#000000" fill-rule="nonzero"
                        transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) ">
                      </path>
                    </g>
                  </svg><!--end::Svg Icon-->
                </span> 
              </router-link>
            </div>
            <!--end::Body-->
          </div>
        </template>
        <template v-else-if="dataRegistrasi && registrasi_id && objectDataAssesmen.resume_medis_igd_id && dataAssesmen">
          <div class="accordion mb-5" role="tablist">
            <!-- <pre>{{ objectDataAssesmen }}</pre> -->
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(updateAssesmen)" autocomplete="off">
                <!-- {{ 'Validasi: '+objectDataAssesmen.validasi_dokter }} -->
                <fieldset :disabled="objectDataAssesmen.validasi_dokter">

                  <!-- Anamnesa -->
                  <anamnesa :objectDataAssesmen="objectDataAssesmen" :mData="dataAssesmen.anamnesa"></anamnesa>

                  <!-- Pemeriksaan Fisik -->
                  <pemeriksaan-fisik class="mt-3" :objectDataAssesmen="objectDataAssesmen"
                    :mData="dataAssesmen.pemeriksaan_fisik"></pemeriksaan-fisik>

                  <!-- Hasil Pemeriksaan Penunjang -->
                  <hasil-pemeriksaan-penunjang class="mt-3" :objectDataAssesmen="objectDataAssesmen"
                    :mData="dataAssesmen.hasil_pemeriksaan_penunjang"></hasil-pemeriksaan-penunjang>

                  <!-- Assesmen -->
                  <assesmen class="mt-3" :objectDataAssesmen="objectDataAssesmen" :mData="dataAssesmen.assesmen">
                  </assesmen>

                  <!-- Planning -->
                  <planning class="mt-3" :objectDataAssesmen="objectDataAssesmen" :mData="dataAssesmen.planning">
                  </planning>

                  <!-- Submit -->
                  <template>
                    <div class="col-12 p-0 mt-6 d-flex gap-7 mb-6">
                      <button type="button" class="btn btn-warning w-100" @click="doValidasi()"
                        :disabled="objectDataAssesmen.validasi_casemix">
                        <i class="ri-rotate-lock-line"></i>
                        Validasi
                      </button>
                      <button type="submit" class="btn btn-primary mr-3 w-100">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </template>

                </fieldset>

              </form>
            </ValidationObserver>
          </div>

        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
            </div>
          </div>
        </template>

        <div id="cetak-resume-medis" style="position: relative; display: none">

          <div size="A4">
            <div class="" style=" align-items: center; width: 99%; margin-bottom: 10px;">
              <!-- KOP -->
              <table class="custom-table"
                v-if="dataRegistrasi && registrasi_id && objectDataAssesmen.resume_medis_igd_id && dataAssesmen">
                <tr>
                  <td rowspan="2" style="height: 60px;"><img :src="$_config.logo.lg" alt="" height="70px"></td>
                  <td style="height: 25px; align-items: center;vertical-align: middle;">
                    <h5 style="font-weight: 600; font-size: 25px; line-height: 35px;">RUMAH SAKIT UMUM DAERAH BUTON
                      SELATAN</h5>
                  </td>

                </tr>
                <tr>
                  <td style="height: 15px;">
                    Jl. Gajah mada kec.batauga kab.buton selatan, sulawesi tenggara
                  </td>
                </tr>

                <tr class="bg-dark">
                  <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">
                    Resume Medis</td>
                </tr>
                <tr>
                  <td colspan="3">
                    <table class="custom-table">
                      <tr>
                        <td>No. Rm</td>
                        <td>:</td>
                        <td>{{ dataRegistrasi.no_rm || '-' }}</td>

                        <td>Installasi</td>
                        <td>:</td>
                        <td>Installasi Rawat Jalan</td>
                      </tr>
                      <tr>
                        <td>Nama / JK</td>
                        <td>:</td>
                        <td>{{ dataRegistrasi.nama_lengkap || '-' }} / {{ dataRegistrasi.jenis_kelamin | parse('kelamin')
                        }}</td>

                        <td>Tanggal Lahir</td>
                        <td>:</td>
                        <td>{{ dataRegistrasi.tgl_lahir | parse('date') }}</td>
                      </tr>
                      <tr>
                        <td>DPJP</td>
                        <td>:</td>
                        <td>{{ dataRegistrasi.nama_dokter || '-' }}</td>

                        <td>Umur</td>
                        <td>:</td>
                        <td>{{ dataRegistrasi.tgl_lahir | parse('oldLong') }}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Registrasi Kunjungan </td>
                        <td>:</td>
                        <td>{{ dataRegistrasi.tgl_registrasi | parse('date') }}</td>

                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr class="bg-dark">
                  <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">
                    Anamnesa</td>
                </tr>
                <tr>
                  <td colspan="3">

                    <table class="custom-table">
                      <tr>
                        <td>Anamnesa</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.anamnesa ? dataAssesmen.anamnesa.anamnesa :
                          '-' }}</td>
                      </tr>
                      <tr>
                        <td>Keluhan Utama</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.keluhan_utama ?
                          dataAssesmen.anamnesa.keluhan_utama : '-' }}</td>
                      </tr>
                      <tr>
                        <td>Riwayat Penyakit Sekarang</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.riwayat_penyakit_saat_ini ?
                          dataAssesmen.anamnesa.riwayat_penyakit_saat_ini : '-' }}</td>
                      </tr>
                      <tr>
                        <td>Riwayat Kesehatan</td>
                        <td>:</td>
                        <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.riwayat_kesehatan ?
                          dataAssesmen.anamnesa.riwayat_kesehatan : '-' }}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr class="bg-dark">
                  <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">
                    Pemeriksaan Fisik</td>
                </tr>
                <tr>
                  <td colspan="3">
                    <table class="custom-table">
                      <tr>
                        <td>
                          <table class="custom-table">
                            <tr>
                              <td>Pemeriksaan Fisik</td>
                              <td>:</td>
                              <td>{{ dataAssesmen.pemeriksaan_fisik && dataAssesmen.pemeriksaan_fisik.pemeriksaan_fisik ?
                                dataAssesmen.pemeriksaan_fisik.pemeriksaan_fisik : '-' }}</td>
                            </tr>
                            <tr>
                              <td>Sistolik</td>
                              <td>:</td>
                              <td>{{ dataAssesmen.pemeriksaan_fisik && dataAssesmen.pemeriksaan_fisik.tanda_tanda_vital ?
                                dataAssesmen.pemeriksaan_fisik.tanda_tanda_vital : '-' }}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr class="bg-dark">
                  <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Hasil
                    Pemeriksaan Penunjang </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <table class="custom-table table table-bordered" style="margin: 2px;">
                      <tr>
                        <td>#</td>
                        <td>Tanggal</td>
                        <td>Nama Tes</td>
                        <td>Hasil</td>
                        <td>Satuan</td>
                        <td>Nilai Normal</td>
                      </tr>
                      <tr v-for="(item, i) in dataAssesmen.hasil_pemeriksaan_penunjang.lab_hasil"
                        :key="'hasil-pem-penunjang-lab_hasil' + i">
                        <td>{{ i + 1 }}</td>
                        <td>{{ item.tanggal_request | parse('date') }}</td>
                        <td>{{ item.nama_penunjang }}</td>
                        <td>{{ item.hasil || '-' }}</td>
                        <td>{{ item.satuan || '-' }}</td>
                        <td>{{ item.parameter_normal || '-' }}</td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <tr style="background-color: #FFF4DE">
                  <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Radiologi</td>
                </tr>
                <!-- <tr
                  v-if="dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.radiologi_array"
                  v-for="(item, i) in dataAssesmen.hasil_pemeriksaan_penunjang.radiologi_array" :key="'asdasdasd' + i">
                  <td colspan="3" style="vertical-align: middle; height: 10px;">
                    {{ i + 1 }}. {{ item.nama_rad_test || '-' }} : {{ item.hasil }}
                  </td>
                </tr> -->
                <tr>
                  <td colspan="3">
                    <table class="custom-table w-100">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tanggal</th>
                          <th>Nama Tes</th>
                          <th>Hasil</th>
                        </tr>
                      </thead>
                      <tbody
                        v-if="dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.hasil_radiologi">
                        <tr v-for="(item, i) in dataAssesmen.hasil_pemeriksaan_penunjang.hasil_radiologi"
                          :key="'hasil-pem-penunjang-lab_hasil' + i">
                          <td>{{ i + 1 }}</td>
                          <td>{{ item.tanggal_request | parse('date') }}</td>
                          <td>{{ item.nama_penunjang }}</td>
                          <td>{{ item.hasil || '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr style="background-color: #FFF4DE">
                  <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Diagnostik Medis</td>
                </tr>
                <tr>
                  <td>{{ dataAssesmen.hasil_pemeriksaan_penunjang.diagnostik_medis }}</td>
                </tr>

                <tr style="background-color: #FFF4DE">
                  <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Penunjang Luar</td>
                </tr>
                <tr>
                  <td>{{ dataAssesmen.hasil_pemeriksaan_penunjang.penunjang_luar }}</td>
                </tr>

              </table>

              <!-- <div style="padding-bottom: 10px"></div> -->
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
  
<script>
import CardRegistrasiIgd from './_components/card_registrasi_igd.vue'
import Anamnesa from './_components/resume_medis/anamnesa.vue'
import PemeriksaanFisik from './_components/resume_medis/pemeriksaan-fisik.vue'
import HasilPemeriksaanPenunjang from './_components/resume_medis/hasil-pemeriksaan-penunjang.vue'
import Assesmen from './_components/resume_medis/assesmen.vue'
import Planning from './_components/resume_medis/planning.vue'

import print from '../../../components/print.js';
import moment from 'moment'
moment.locale('id')

export default {
  name: 'layanan_igd_medis',
  components: { CardRegistrasiIgd, Anamnesa, PemeriksaanFisik, HasilPemeriksaanPenunjang, Assesmen, Planning },
  data() {
    return {
      info_alert: '',
      loadingAssesmen: false,

      scrollPosition: 0,
      endpoint: 'resume_medis_igd',

      dataRegistrasi: {},
      registrasi_id: '',

      dataKeperawatan: {},
      validasiKeperawatan: false,

      is_validasi: false,
      objectDataAssesmen: {},
      dataAssesmen: {
        anamnesa: {},
        pemeriksaan_fisik: {},
        hasil_pemeriksaan_penunjang: {},
        assesmen: {},
        planning: {},
      },
      objectPenjualan: {},

      dataChangeStatus: false,
      activeTab: 'subjective',
    }
  },
  watch: {
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  computed: {
    
  },
  methods: {
    async selectRegistrasi(e, switch_tab = true) {

      try {
        
        this.dataRegistrasi = e
        this.registrasi_id = e.registrasi_id || ''
        if (!this.registrasi_id) return
  
        this.loadingAssesmen = true
  
        // Start Handle json
        let payload = { registrasi_id: e.registrasi_id, page: 1, limit: 99999 }
        const res = await this.$_api.list(this.endpoint, payload)
        if (res.data.length === 0) {
          console.log('Assesmen medis belum dibuat.')
          this.createAssesmen()
        } else {
          const medis = await this.$_api.list('assesment_medis_igd', payload)

          // Data assesmen medis tidak ditemukan
          if (!medis.data.length) {
            this.validasiKeperawatan = false
            this.loadingAssesmen = false
            return
          }

          // data ada tetapi belum validasi
          const medis_obj = medis.data[0]
          const medis_json = medis_obj.json_assesment_medis_igd
          if (!medis_obj.is_validasi) {
            this.validasiKeperawatan = false
            this.loadingAssesmen = false
            return;
          } else {
            this.validasiKeperawatan = true
          }
          console.log('medis_json',medis_json)

          let resume_medis_igd = res.data[0]
          
          let json_resume_medis_igd = await this.compareKeperawatanWithResume(resume_medis_igd.json_resume_medis_igd, medis_json)
          if (!json_resume_medis_igd.assesmen) json_resume_medis_igd.assesmen = {}
          if (!json_resume_medis_igd.assesmen.diagnosa) json_resume_medis_igd.assesmen.diagnosa = []

          if (!json_resume_medis_igd.planning) json_resume_medis_igd.planning = {}
          if (!json_resume_medis_igd.planning.prosedur) json_resume_medis_igd.planning.prosedur = []
          if (!json_resume_medis_igd.planning.obat_jadi) json_resume_medis_igd.planning.obat_jadi = []

          if (!json_resume_medis_igd.hasil_pemeriksaan_penunjang) json_resume_medis_igd.hasil_pemeriksaan_penunjang = {}
          if (!json_resume_medis_igd.hasil_pemeriksaan_penunjang.lab_hasil) json_resume_medis_igd.hasil_pemeriksaan_penunjang.lab_hasil = []
          if (!json_resume_medis_igd.hasil_pemeriksaan_penunjang.hasil_radiologi) json_resume_medis_igd.hasil_pemeriksaan_penunjang.hasil_radiologi = []

          this.dataAssesmen.anamnesa = json_resume_medis_igd.anamnesa
          if (!this.dataAssesmen.anamnesa) this.dataAssesmen.anamnesa = {}

          this.dataAssesmen.pemeriksaan_fisik = json_resume_medis_igd.pemeriksaan_fisik
          if (!this.dataAssesmen.pemeriksaan_fisik) this.dataAssesmen.pemeriksaan_fisik = {}

          this.dataAssesmen.pemeriksaan_fisik = json_resume_medis_igd.pemeriksaan_fisik
          if (!this.dataAssesmen.pemeriksaan_fisik) this.dataAssesmen.pemeriksaan_fisik = {}

          this.dataAssesmen.hasil_pemeriksaan_penunjang = json_resume_medis_igd.hasil_pemeriksaan_penunjang
          if (!this.dataAssesmen.hasil_pemeriksaan_penunjang) this.dataAssesmen.hasil_pemeriksaan_penunjang = {}
          // Custom Assesmen
          if (!this.dataAssesmen.hasil_pemeriksaan_penunjang.lab_hasil) this.dataAssesmen.hasil_pemeriksaan_penunjang.lab_hasil = []
          if (!this.dataAssesmen.hasil_pemeriksaan_penunjang.radiologi_array) this.dataAssesmen.hasil_pemeriksaan_penunjang.radiologi_array = []

          this.dataAssesmen.assesmen = json_resume_medis_igd.assesmen
          if (!this.dataAssesmen.assesmen) this.dataAssesmen.assesmen = {}
          // Custom Assesmen
          if (!this.dataAssesmen.assesmen.diagnosa) this.dataAssesmen.assesmen.diagnosa = []

          this.dataAssesmen.planning = json_resume_medis_igd.planning
          if (!this.dataAssesmen.planning) this.dataAssesmen.planning = {}
          // Custom Planning
          if (!this.dataAssesmen.planning.prosedur) this.dataAssesmen.planning.prosedur = []
          if (!this.dataAssesmen.planning.obat_jadi) this.dataAssesmen.planning.obat_jadi = []

          this.objectDataAssesmen = { ...resume_medis_igd, json_resume_medis_igd: this.dataAssesmen }
        }
        // End Handle json

        setTimeout(() => {
          this.loadingAssesmen = false
        }, 500);
        
      } catch (error) {
        this.loadingAssesmen = false
        this.$_alert.error({}, 'Tidak dapat mengambil data assesmen!')
      }
    },
    async compareKeperawatanWithResume(resume, medis) {
      return new Promise((resolve, reject) => {
        console.log('Start compareKeperawatanWithResume')
        
        let json = JSON.parse(JSON.stringify(resume))
        // console.log(this.printKey(medis))

        if(!json.anamnesa) json.anamnesa = {}
        if(!json.anamnesa.anamnesa) json.anamnesa.anamnesa = medis.subjective.anamnesa
        if(!json.anamnesa.keluhan_utama) json.anamnesa.keluhan_utama = medis.subjective.keluhan
        if(!json.anamnesa.riwayat_kesehatan) json.anamnesa.riwayat_kesehatan = medis.subjective.riwayat_penyakit
        if(!json.anamnesa.riwayat_penyakit_saat_ini) json.anamnesa.riwayat_penyakit_saat_ini = medis.subjective.riwayat_penyakit_saat_ini

        if(!json.assesmen) json.assesmen = {}
        if(!json.assesmen.diagnosa || json.assesmen.diagnosa.length) json.assesmen.diagnosa = medis.assesment.diagnosa

        if(!json.planning) json.planning = {}
        if(!json.planning.prosedur || json.planning.prosedur.length) json.planning.prosedur = medis.planning.prosedur
        if(!json.planning.obat_jadi || json.planning.obat_jadi.length) json.planning.obat_jadi = medis.planning.obat_jadi

        if(!json.pemeriksaan_fisik) json.pemeriksaan_fisik = {}
        if(!json.pemeriksaan_fisik.pemeriksaan_fisik) json.pemeriksaan_fisik.pemeriksaan_fisik = medis.objective.pemeriksaan_fisik
        
        let ttv = ''
        
        ttv += `nadi: ${medis.objective.nadi}\n`
        ttv += `suhu: ${medis.objective.suhu}\n`
        ttv += `sistolik: ${medis.objective.sistolik}\n`
        ttv += `diastolik: ${medis.objective.diastolik}\n`
        ttv += `kesadaran: ${medis.objective.kesadaran}\n`
        ttv += `pernafasan: ${medis.objective.pernafasan}\n`
        ttv += `berat badan: ${medis.objective.berat_badan}\n`
        ttv += `tinggi badan: ${medis.objective.tinggi_badan}\n`
        ttv += `index masa tubuh: ${medis.objective.index_masa_tubuh}\n`
        if(!json.pemeriksaan_fisik.tanda_tanda_vital) json.pemeriksaan_fisik.tanda_tanda_vital = ttv

        // if(!json.hasil_pemeriksaan_penunjang) json.hasil_pemeriksaan_penunjang = {}
        // if(!json.hasil_pemeriksaan_penunjang.lab_hasil) json.hasil_pemeriksaan_penunjang.lab_hasil = medis
        // if(!json.hasil_pemeriksaan_penunjang.penunjang_luar) json.hasil_pemeriksaan_penunjang.penunjang_luar = medis
        // if(!json.hasil_pemeriksaan_penunjang.hasil_radiologi) json.hasil_pemeriksaan_penunjang.hasil_radiologi = medis
        // if(!json.hasil_pemeriksaan_penunjang.radiologi_array) json.hasil_pemeriksaan_penunjang.radiologi_array = medis
        // if(!json.hasil_pemeriksaan_penunjang.diagnostik_medis) json.hasil_pemeriksaan_penunjang.diagnostik_medis = medis

        resolve(json)
      })
    },
    createAssesmen() {
      let param = {
        registrasi_id: this.registrasi_id,
        is_validasi: false,
        json_resume_medis_igd: {
          // subjective: {},
          // objective: {},
          // assesment: {},
          // planning: {}
        }
      }

      this.$_api.create(this.endpoint, param).then((res) => {
        this.selectRegistrasi(this.dataRegistrasi)
      })
    },
    updateAssesmen(data) {
      console.log('data', data)

      const payload = { ...this.objectDataAssesmen, id: this.objectDataAssesmen.resume_medis_igd_id }
      // payload.id = payload.resume_medis_igd_id
      this.$_api.update(this.endpoint, payload).then(() => {
        this.selectRegistrasi(this.dataRegistrasi, false)
        this.$_alert.success('Resume Medis berhasil diperbarui.')
      }).catch((err) => {
        this.dataChangeStatus = false
        this.$_alert.error(err)
      })
    },
    doValidasi() {
      if (this.objectDataAssesmen.validasi_dokter) {
        // this.$_alert.error({}, 'Data sudah divalidasi!')
        // return
      }

      const validation = [
      ]

      // CHECK VALIDASI
      for (const v of validation) {
        if (v.required) {
          if (this.dataAssesmen[v.tab] && this.dataAssesmen[v.tab][v.key]) {
            const value = this.dataAssesmen[v.tab][v.key]
            const type = typeof value
            if (v.type === 'string') {
              if (!value || value == undefined || value == '') {
                console.log(`${v.tab} ${v.key}`, { type: type, value: value })
                this.$_alert.error({}, v.message)
                return
              }
            } else if (v.type === 'array') {
              if (!Array.isArray(value) || value.length === 0) {
                console.log(`${v.tab} ${v.key}`, { type: type, length: v.length, value: value })
                this.$_alert.error({}, v.message)
                return
              }
            }
          } else {
            this.$_alert.error({}, v.message)
            return
          }
        }
      }

      this.$_alert.confirm('Validasi data', 'apakah anda yakin ingin menvalidasi data assesmen?').then((status) => {
        if (status.isDismissed) return
        else {
          this.objectDataAssesmen.validasi_dokter = !this.objectDataAssesmen.validasi_dokter
          this.updateAssesmen(this.dataAssesmen)
        }
      });
    },
    dataChange(status) {
      this.dataChangeStatus = status
    },
    async cetakResumeMedis(el) {
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
    },
    printKey(data) {
      let text = ''

      for (const key1 in data) {
        let y = ''
        if (typeof data[key1] === 'object' && data[key1] !== null) {
          for (const key2 in data[key1]) {
            y += `if(${key1}.${key2})\n`
          }
        }

        text += `${y}\n`
      }

      return text
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
  z-index: 90;
  top: 119px;
  left: 290px;
  right: 25px;
}

header .header-inner {
  transition: all 250ms cubic-bezier(0.33, 1, 0.68, 1);
  max-height: auto;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}</style>