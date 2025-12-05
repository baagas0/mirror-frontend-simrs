<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-3 col-sm-12">
          <card-registrasi-igd @selected="selectRegistrasi"/>
          <!-- {{ scrollPosition }} -->
        </div>
        <div class="col-xl-9 col-md-9 col-sm-12">
          <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
            <div class="card-body ribbon ribbon-right">
              <!-- <pre>{{ objectDataAssesmen }}</pre> -->
              <div class="ribbon-target" :class="{'bg-warning': !is_validasi, 'bg-success': is_validasi}" style="top: 10px; right: 0px;">{{ is_validasi ? 'Sudah' : 'Belum' }} Validasi</div>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                  <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>
  
                  <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && !is_validasi && objectDataAssesmen.assesment_medis_igd_id" @click="doValidasi()">Validasi Sekarang</button>
  
                  <!-- SATU SEHAT -->
                  <SatuSehat :dataRegistrasi="dataRegistrasi" :disabled="!is_validasi" :heart_rates="[{ value: dataAssesmen.objective.nadi, date: objectDataAssesmen.updatedAt }]" v-if="!loadingAssesmen && objectDataAssesmen.assesment_medis_igd_id"></SatuSehat>

                  <button class="btn btn-primary mt-3" v-if="!loadingAssesmen && objectDataAssesmen.assesment_medis_igd_id" @click="cetakResumeMedis('cetak-resume-medis')"><i class="ri-printer-line"></i> Cetak Resume Medis1</button>
                </div>
                <div class="text-center">
                  <h6 class="font-weight-bolder text-dark">KNJ</h6>
                  <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row" >
            <div class="col-6">
              <p class="font-weight-bolder">Keperawatan</p>
              <pre>{{ dataKeperawatan.json_assesment_keperawatan_igd }}</pre>
            </div>
            <div class="col-6">
              <p class="font-weight-bolder">Medis</p>
              <pre>{{ dataAssesmen }}</pre>
            </div>
          </div> -->
          <div class="card card-custom mb-5" v-if="loadingAssesmen">
            <div class="card-body d-flex justify-content-center">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>
          <template v-else-if="dataRegistrasi && registrasi_id && objectDataAssesmen.assesment_medis_igd_id && dataAssesmen && dataAssesmen.subjective && dataAssesmen.objective && dataAssesmen.planning">
            <div class="row no-gutters mb-5 nav nav-primary nav-pills gap-8">
              <a @click="switchActiveTab('subjective')" :class="activeTab==='subjective'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Subjective</a>
              <a @click="switchActiveTab('objective')" :class="activeTab==='objective'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Objective</a>
              <a @click="switchActiveTab('gcs')" :class="activeTab==='gcs'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">GCS</a>
              <a @click="switchActiveTab('ews')" :class="activeTab==='ews'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Early Warning System</a>
              <a @click="switchActiveTab('pemeriksaan_multiorgan')" :class="activeTab==='pemeriksaan_multiorgan'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pemeriksaan Multiorgan</a>
              <a @click="switchActiveTab('assesment')" :class="activeTab==='assesment'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Assesment</a>
              <a @click="switchActiveTab('planning')" :class="activeTab==='planning'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Planning</a>
              <a @click="switchActiveTab('lapor_dpjb')" :class="activeTab==='lapor_dpjb'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Lapor DPJP</a>
              <a @click="switchActiveTab('tindak_lanjut')" :class="activeTab==='tindak_lanjut'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Tindak Lanjut</a>
            </div>
            
            <template v-if="activeTab==='subjective'">
              <medis-subjective v-if="dataAssesmen && dataAssesmen.subjective" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.subjective" @submit="updateAssesmen"></medis-subjective>
            </template>
            <template v-if="activeTab==='objective'">
              <medis-objective v-if="dataAssesmen && dataAssesmen.objective" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.objective" @submit="updateAssesmen"></medis-objective>
            </template>
            <template v-if="activeTab==='gcs'">
              <medis-gcs v-if="dataAssesmen && dataAssesmen.gcs" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.gcs" @submit="updateAssesmen"></medis-gcs>
            </template>
            <template v-if="activeTab==='ews'">
              <medis-ews v-if="dataAssesmen && dataAssesmen.ews" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.ews" @submit="updateAssesmen"></medis-ews>
            </template>
            <template v-if="activeTab==='pemeriksaan_multiorgan'">
              <medis-pemeriksaan-multiorgan v-if="dataAssesmen && dataAssesmen.pemeriksaan_multiorgan" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.pemeriksaan_multiorgan" @submit="updateAssesmen"></medis-pemeriksaan-multiorgan>
            </template>
            <template v-if="activeTab==='assesment'">
              <medis-assesment v-if="dataAssesmen && dataAssesmen.assesment" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.assesment" @submit="updateAssesmen"></medis-assesment>
            </template>
            <template v-if="activeTab==='planning'">
              <medis-planning v-if="dataAssesmen && dataAssesmen.planning" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.planning" :objectPenjualan="objectPenjualan" @submit="updateAssesmen"></medis-planning>
            </template>
            <template v-if="activeTab==='lapor_dpjb'">
              <medis-lapor-dpjb v-if="dataAssesmen && dataAssesmen.lapor_dpjb" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.lapor_dpjb" @submit="updateAssesmen"></medis-lapor-dpjb>
            </template>
            <template v-if="activeTab==='tindak_lanjut'">
              <medis-tindak-lanjut v-if="dataAssesmen && dataAssesmen.tindak_lanjut" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.tindak_lanjut" @submit="updateAssesmen"></medis-tindak-lanjut>
            </template>
          </template>
          <template v-else>
            <div class="card card-custom">
              <div class="card-body text-center ">
                <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
                <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
                <button class="btn btn-light-primary" v-if="info_alert.includes('Assesmen keperawatan')" @click="$router.push({ name: 'Layanan IGD keperawatan', query: { registrasi_id: registrasi_id } })">Assesmen Keperawatan <i class="ri-arrow-right-line"></i></button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div id="cetak-resume-medis" style="position: relative; display: none">
        <div size="A4">
          <div class="" style=" align-items: center; width: 99%; margin-bottom: 10px;">
              <!-- KOP -->
              <table class="custom-table" v-if="dataAssesmen && dataAssesmen.subjective && dataAssesmen.objective && dataAssesmen.assesment && dataAssesmen.planning">
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
                      <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Resume Medis</td>
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
                                  <td>Installasi IGD</td>
                              </tr>
                              <tr>
                                  <td>Nama / JK</td>
                                  <td>:</td>
                                  <td>{{ dataRegistrasi.nama_lengkap || '-' }} / {{ dataRegistrasi.jenis_kelamin | parse('kelamin') }}</td>
  
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
                      <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Subjective</td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <table class="custom-table">
                              <tr>
                                  <td>Tujuan Kunjungan</td>
                                  <td>:</td>
                                  <td>{{ dataAssesmen.subjective && dataAssesmen.subjective.tujuan_kunjungan ? dataAssesmen.subjective.tujuan_kunjungan : '-' }}</td>
                              </tr>
                              <tr>
                                  <td>Keluhan Utama</td>
                                  <td>:</td>
                                  <td>{{ dataAssesmen.subjective && dataAssesmen.subjective.keluhan_utama ? dataAssesmen.subjective.keluhan_utama : '-' }}</td>
                              </tr>
                              <tr>
                                  <td>Riwayat Kesehatan Saat Ini</td>
                                  <td>:</td>
                                  <td>{{ dataAssesmen.subjective && dataAssesmen.subjective.riwayat_kesehatan_saat_ini ? dataAssesmen.subjective.riwayat_kesehatan_saat_ini : '-' }}</td>
                              </tr>
                          </table>
                      </td>
                  </tr>
  
                  <tr class="bg-dark">
                      <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Objective</td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <table class="custom-table">
                              <tr>
                                  <td>
                                      <table class="custom-table">
                                          <tr>
                                              <td>Keadaan Umum</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.keadaan_umum ? dataAssesmen.objective.keadaan_umum : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Sistolik</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.sistolik ? dataAssesmen.objective.sistolik : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Diastolik</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.diastolik ? dataAssesmen.objective.diastolik : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Nadi</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.nadi ? dataAssesmen.objective.nadi : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Pernafasan</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.pernafasan ? dataAssesmen.objective.pernafasan : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Keterangan Skrining</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.keterangan_skrining_nyeri ? dataAssesmen.objective.keterangan_skrining_nyeri : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Pemeriksaan Fisik</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.pemeriksaan_fisik ? dataAssesmen.objective.pemeriksaan_fisik : '-' }}</td>
                                          </tr>
                                      </table>
                                  </td>
                                  <td>
                                      <table class="custom-table">
                                          <tr>
                                              <td>Kesadaran</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.kesadaran ? dataAssesmen.objective.kesadaran : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Tinggi Badan</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.tinggi_badan ? dataAssesmen.objective.tinggi_badan : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Berat Badan</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.berat_badan ? dataAssesmen.objective.berat_badan : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Index Masa Tubuh</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.index_masa_tubuh ? dataAssesmen.objective.index_masa_tubuh : '-' }}</td>
                                          </tr>
                                          <tr>
                                              <td>Lingkar Kepala</td>
                                              <td>:</td>
                                              <td>{{ dataAssesmen.objective && dataAssesmen.objective.lingkar_kepala ? dataAssesmen.objective.lingkar_kepala : '-' }}</td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
  
                  <tr class="bg-dark">
                      <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Assesmen</td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <table class="custom-table" style="margin: 2px;">
                              <tr>
                                  <td>Tipe Diagnosa</td>
                                  <td>Diagnosa</td>
                                  <td>Keterangan</td>
                              </tr>
                              <tr v-if="dataAssesmen.assesment && dataAssesmen.assesment.diagnosa" v-for="(item, i) in dataAssesmen.assesment.diagnosa" :key="'asdasd'+i">
                                  <td>{{ item.tipe_diagnosa || '-' }}</td>
                                  <td>{{ item.diagnosa && item.diagnosa.nama_diagnosa ? item.diagnosa.nama_diagnosa : '-' }}</td>
                                  <td>{{ item.evaluasi_diagnosa || '-' }}</td>
                              </tr>
                          </table>
                      </td>
                  </tr>
  
                  <tr class="bg-dark">
                      <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Planning</td>
                  </tr>
  
                  <tr style="background-color: #FFF4DE">
                      <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Prosedur :</td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <table class="custom-table" style="margin: 2px;">
                              <tr>
                                  <td>Tipe Prosedur</td>
                                  <td>Prosedur</td>
                                  <td>Tindakan</td>
                                  <td>Keterangan</td>
                              </tr>
                              <tr v-if="dataAssesmen.planning && dataAssesmen.planning.prosedur" v-for="(item, i) in dataAssesmen.planning.prosedur" :key="'asdasdasd'+i">
                                <td>{{ item.tipe_procedure || '-' }}</td>
                                <!-- <td>{{ item.procedure || '-' }}</td> -->
                                <td>
                                  {{ typeof item.procedure == 'object' ? (item.procedure && item.procedure.nama_prosedur ? `${item.procedure.kode_prosedur} - ${item.procedure.nama_prosedur}` : '-') : item.procedure }}
                                </td>
                                <td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : '-' }}</td>
                                <td>{{ item.keterangan || '-' }}</td>
                            </tr>
                          </table>
                      </td>
                  </tr>
  
                  <tr style="background-color: #FFF4DE">
                      <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Obat Jadi :</td>
                  </tr>
                  <tr v-if="dataAssesmen.planning && dataAssesmen.planning.obat_jadi" v-for="(item, i) in dataAssesmen.planning.obat_jadi" :key="'asdasdasd'+i">
                      <td colspan="3" style="vertical-align: middle; height: 10px;">
                          1. {{ item.nama_obat && item.nama_obat.nama_barang ? item.nama_obat.nama_barang : '-' }} ({{ item.signa || '-' }} {{ item.satuan_jual}} {{ item.aturan_pakai}})
                      </td>
                  </tr>
  
                  <tr style="background-color: #FFF4DE">
                      <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Obat Racik :</td>
                  </tr>
                  <tr v-if="dataAssesmen.planning && dataAssesmen.planning.obat_racikan" v-for="(item, i) in dataAssesmen.planning.obat_racikan" :key="'asdasdasdasdad'+i">
                      <td colspan="3" style="vertical-align: middle; height: 10px;">
                          1. {{ item.nama_obat || '-' }} ({{ item.signa || '-' }} {{ item.satuan_jual || '-' }} {{ item.aturan_pakai || '-' }})
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
    import CardRegistrasiIgd from './_components/card_registrasi_igd.vue'
    import MedisSubjective from './_components/assesmen_medis/medis_subjective.vue'
    import MedisObjective from './_components/assesmen_medis/medis_objective.vue'
    import MedisAssesment from './_components/assesmen_medis/medis_assesment.vue'
    import MedisPlanning from './_components/assesmen_medis/medis_planning.vue'

    import MedisGcs from './_components/assesmen_medis/gcs.vue'
    import MedisEws from './_components/assesmen_medis/ews.vue'
    import MedisPemeriksaanMultiorgan from './_components/assesmen_medis/pemeriksaan_multiorgan.vue'
    import MedisLaporDpjb from './_components/assesmen_medis/lapor_dpjb.vue'
    import MedisTindakLanjut from './_components/assesmen_medis/tindak_lanjut.vue'

    import SatuSehat  from '../_components/satu_sehat/satu_sehat.vue'

    import print from '../../../components/print.js';
    import moment from 'moment'
    moment.locale('id')
  
    export default {
      name: 'layanan_igd_medis',
      components: { CardRegistrasiIgd, MedisSubjective, MedisObjective, MedisAssesment, MedisPlanning, MedisGcs, MedisEws, MedisPemeriksaanMultiorgan, MedisLaporDpjb, MedisTindakLanjut, SatuSehat },
      data () {
        return {
          info_alert: '',
          loadingAssesmen: false,
  
          scrollPosition: 0,
          endpoint: 'assesment_medis_igd',
  
          dataRegistrasi: {},
          registrasi_id: '',
  
          dataKeperawatan: {},
          validasiKeperawatan: false, 
  
          is_validasi: false,
          objectDataAssesmen: {},
          dataAssesmen: {
          //   subjective: {},
          //   objective: {},
          //   assesment: {},
          //   planning: {}
          },
          objectPenjualan: {},
  
          dataChangeStatus: false,
          activeTab: 'subjective'
        }
      },
      watch: {
      },
      mounted() {
        window.addEventListener('scroll', this.updateScroll);
      },
      methods: {
        async selectRegistrasi (e, switch_tab = true) {
          this.dataRegistrasi = e
          this.registrasi_id = e.registrasi_id || ''
          if (!this.registrasi_id) return
  
          let dataKeperawatan = await this.$_api.list('assesment_keperawatan_igd', { registrasi_id: e.registrasi_id, page: 1, limit: 99999 })
          if (dataKeperawatan.data.length > 0) this.dataKeperawatan = dataKeperawatan.data[0]
          else {
            this.info_alert = 'Assesmen keperawatan tidak ditemukan!'
            this.$_alert.error({}, 'Assesmen keperawatan tidak ditemukan!')
            this.dataAssesmen = {}
            this.objectDataAssesmen = {}
            return
          }
  
          if (this.dataKeperawatan.is_validasi === false) {
            this.info_alert = 'Assesmen keperawatan belum divalidasi!'
            this.$_alert.error({}, 'Assesmen keperawatan belum divalidasi!')
            this.dataAssesmen = {}
            this.objectDataAssesmen = {}
            return
          }

          const penjualan = await this.$_api.post('penjualan/list', { registrasi_id: e.registrasi_id });
          if (penjualan.data.length === 0) {
            this.info_alert = 'Penjualan tidak ditemukan!'
            this.$_alert.error({}, 'Penjualan tidak ditemukan')
            this.dataAssesmen = {}
            this.objectDataAssesmen = {}
            return
          }
          this.objectPenjualan = penjualan.data[0]
          console.log('objectPenjualannnnnnnnnnnnnnnnn', this.objectPenjualan)

          this.loadingAssesmen = true
          let json_assesment_medis_igd = {
            subjective: {},
            objective: {},
            gcs: {},
            ews: {},
            pemeriksaan_multiorgan: {},
            assesment: {},
            planning: {

            },
            lapor_dpjb: {},
            tindak_lanjut: {},
          }
  
          let json_keperawatan = this.dataKeperawatan.json_assesment_keperawatan_igd
          if (json_keperawatan.subjective) json_assesment_medis_igd.subjective = json_keperawatan.subjective
          if (json_keperawatan.objective) json_assesment_medis_igd.objective = json_keperawatan.objective
          if (json_keperawatan.planning) json_assesment_medis_igd.planning = json_keperawatan.planning
          
          if (json_keperawatan.gcs) json_assesment_medis_igd.gcs = json_keperawatan.gcs
          if (json_keperawatan.gcs) json_assesment_medis_igd.pemeriksaan_multiorgan = json_keperawatan.pemeriksaan_fisik

          // MAPPING DATA JSON MEDIS DARI PERAWAT
          if(json_keperawatan.anamnesa) json_assesment_medis_igd.subjective = json_keperawatan.anamnesa
          // if(json_keperawatan.anamnesa.riwayat_penyakit_saat_ini) json_assesment_medis_igd.subjective.riwayat_penyakit = json_keperawatan.anamnesa.riwayat_penyakit_saat_ini
  
          await this.$_api.list(this.endpoint, { registrasi_id: e.registrasi_id, page: 1, limit: 99999 } ).then(async (res) => {
  
            let assesmen = res.data.filter((x) => x.registrasi_id === e.registrasi_id )
            if(assesmen.length) {
              // console.log('assesmen[0]', assesmen[0])
              let a = assesmen[0].json_assesment_medis_igd ? assesmen[0].json_assesment_medis_igd : json_assesment_medis_igd

              // INIT PEMERIKSAAN MULTIORGAN
              if(!a.pemeriksaan_multiorgan) a.pemeriksaan_multiorgan = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_kulit) a.pemeriksaan_multiorgan.pemeriksaan_kulit = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_kuku) a.pemeriksaan_multiorgan.pemeriksaan_kuku = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_kepala) a.pemeriksaan_multiorgan.pemeriksaan_kepala = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_wajah) a.pemeriksaan_multiorgan.pemeriksaan_wajah = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_mata) a.pemeriksaan_multiorgan.pemeriksaan_mata = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_telinga) a.pemeriksaan_multiorgan.pemeriksaan_telinga = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_hidung_dan_sinus) a.pemeriksaan_multiorgan.pemeriksaan_hidung_dan_sinus = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_mulut_dan_bibir) a.pemeriksaan_multiorgan.pemeriksaan_mulut_dan_bibir = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_leher) a.pemeriksaan_multiorgan.pemeriksaan_leher = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_dada_dan_punggung) a.pemeriksaan_multiorgan.pemeriksaan_dada_dan_punggung = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_kardiovaskuler) a.pemeriksaan_multiorgan.pemeriksaan_kardiovaskuler = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_dada_dan_aksila) a.pemeriksaan_multiorgan.pemeriksaan_dada_dan_aksila = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_abdomen_perut) a.pemeriksaan_multiorgan.pemeriksaan_abdomen_perut = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_ekstermitas_atas) a.pemeriksaan_multiorgan.pemeriksaan_ekstermitas_atas = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_ekstermitas_bawah) a.pemeriksaan_multiorgan.pemeriksaan_ekstermitas_bawah = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_genitalia_pria) a.pemeriksaan_multiorgan.pemeriksaan_genitalia_pria = {}
              if(!a.pemeriksaan_multiorgan.pemeriksaan_genitalia_wanita) a.pemeriksaan_multiorgan.pemeriksaan_genitalia_wanita = {}

              // INIT EWS
              if(!a.ews) a.ews = {}
              if(!a.ews.data_ews) a.ews.data_ews = []

              // INIT PLANNING FISIOTERAPI
              if (!a.planning) a.planning = {}
              if (!a.planning.fisioterapi) a.planning.fisioterapi = []

              this.dataAssesmen = a
  
              this.objectDataAssesmen = assesmen[0]
              this.objectDataAssesmen.json_assesment_medis_igd = this.dataAssesmen
              // console.log('123123', this.objectDataAssesmen);
              this.is_validasi = assesmen[0].is_validasi !== null ? assesmen[0].is_validasi : false
              // this.dataChange = false
              // if (switch_tab) this.switchActiveTab('subjective')
            }
            else this.createAssesmen(json_assesment_medis_igd)
            setTimeout(() => {
              this.loadingAssesmen = false
            }, 500);
          }).catch((err) => {
            this.loadingAssesmen = false
            this.$_alert.error({}, 'Tidak dapat mengambil data assesmen!')
          })
        },
        createAssesmen (json = {}) {
          let param = {
            registrasi_id: this.registrasi_id,
            json_assesment_medis_igd: json
          }
  
          this.$_api.create(this.endpoint, param).then((res) => {
            // this.dataAssesmen = res.data.json_assesment_medis_igd
            // this.dataAssesmen = param.json_assesment_medis_igd
            this.selectRegistrasi(this.dataRegistrasi)
          })
        },
        updateAssesmen (data) {
          console.log('data', data)
          
          let payload = this.objectDataAssesmen
          // payload.json_assesment_medis_igd[data.key] = data.data
          payload.id = payload.assesment_medis_igd_id
          this.$_api.update(this.endpoint, payload).then(() => {
            if(data && data.silent) return
            this.selectRegistrasi(this.dataRegistrasi, false)
            // this.dataChangeStatus = false
            this.$_alert.success('Berhasil memperbarui data')
          }).catch((err) => {
            this.$_alert.error(err)
          })
        },
        doValidasi() {
          if (this.objectDataAssesmen.is_validasi) {
            this.$_alert.error({}, 'Data sudah divalidasi!')
            return
          }

          this.$_alert.confirm('Validasi data', 'apakah anda yakin ingin menvalidasi data assesmen?').then((status) => {
            if (status.isDismissed) return
            else {
              this.objectDataAssesmen.is_validasi = true
              this.updateAssesmen(this.dataAssesmen)
            }
          });
        },
        switchActiveTab (e) {
          this.dataAssesmen[e] = this.objectDataAssesmen.json_assesment_medis_igd[e]
          this.activeTab = e
          if (e === 'assesment') {
              if (!this.dataAssesmen[e].diagnosa) this.dataAssesmen[e].diagnosa = []
          } else if (e === 'planning') {
              if (!this.dataAssesmen[e].prosedur) this.dataAssesmen[e].prosedur = []
              if (!this.dataAssesmen[e].obat_jadi) this.dataAssesmen[e].obat_jadi = []
              if (!this.dataAssesmen[e].obat_racikan) this.dataAssesmen[e].obat_racikan = []
          }
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