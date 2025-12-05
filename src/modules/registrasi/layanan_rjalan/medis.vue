<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-rjalan @selected="selectRegistrasi"/>
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

                <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && !is_validasi && objectDataAssesmen.assesment_medis_rjalan_id" @click="doValidasi()">Validasi Sekarang</button>

                <button class="btn btn-primary mt-3" v-if="!loadingAssesmen && objectDataAssesmen.assesment_medis_rjalan_id" @click="cetakResumeMedis('cetak-resume-medis')"><i class="ri-printer-line"></i> Cetak Resume Medis</button>

                <!-- SATU SEHAT -->
                <SatuSehat :dataRegistrasi="dataRegistrasi" :disabled="!is_validasi" :heart_rates="[{ value: dataAssesmen.objective.nadi, date: objectDataAssesmen.updatedAt }]" v-if="!loadingAssesmen && objectDataAssesmen.assesment_medis_rjalan_id"></SatuSehat>

                <button class="btn btn-success mt-3" @click="$bvModal.show('modal-pasien')">Riwayat Kunjungan</button>

                <!-- <pre>{{dataAssesmen.objective.nadi}}</pre> -->
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ123</h6>
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
        <template v-else-if="dataRegistrasi && registrasi_id && objectDataAssesmen.assesment_medis_rjalan_id && dataAssesmen && dataAssesmen.subjective && dataAssesmen.objective && dataAssesmen.planning">
          <div class="row no-gutters mb-5" >
            <a @click="switchActiveTab('subjective')" :class="activeTab==='subjective'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2">Subjective</a>
            <a @click="switchActiveTab('objective')" :class="activeTab==='objective'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2">Objective</a>
            <a @click="switchActiveTab('assesment')" :class="activeTab==='assesment'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2">Assessment</a>
            <a @click="switchActiveTab('planning')" :class="activeTab==='planning'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2">Planning</a>
            <a @click="switchActiveTab('anatomi')" :class="activeTab==='anatomi'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2">Anatomi</a>

            <a @click="switchActiveTab('di_rujuk')" :class="activeTab==='di_rujuk'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Di Rujuk</a>
            <!-- <a @click="switchActiveTab('gizi')" :class="activeTab==='gizi'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Gizi</a>
            <a @click="switchActiveTab('status_psikolog')" :class="activeTab==='status_psikolog'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Status Psikolog</a>
            <a @click="switchActiveTab('sosial_ekonomi')" :class="activeTab==='sosial_ekonomi'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Sosial & Ekonomi</a>
            <a @click="switchActiveTab('status_fungsional')" :class="activeTab==='status_fungsional'? 'btn-primary': 'btn-outline-primary'" class="col btn mb-0 mr-2" style="flex-grow: 1">Status Fungsional</a> -->
          </div>
          <!-- <pre>{{dataAssesmen[activeTab]}}</pre> -->
          <!-- <pre>{{objectDataAssesmen}}</pre> -->
          <template v-if="activeTab==='subjective'">
            <medis-subjective v-if="dataAssesmen && dataAssesmen.subjective" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.subjective" @submit="updateAssesmen" @dataChange="dataChange"></medis-subjective>
          </template>
          <template v-if="activeTab==='objective'">
            <medis-objective ref="medis-objective" v-if="dataAssesmen && dataAssesmen.objective" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.objective" @submit="updateAssesmen" @dataChange="dataChange"></medis-objective>
          </template>
          <template v-if="activeTab==='assesment'">
            <medis-assesment v-if="dataAssesmen && dataAssesmen.assesment" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.assesment" @submit="updateAssesmen" @dataChange="dataChange"></medis-assesment>
          </template>
          <template v-if="activeTab==='planning'">
            <medis-planning v-if="dataAssesmen && dataAssesmen.planning" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :objectPenjualan="objectPenjualan" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.planning" @submit="updateAssesmen" @dataChange="dataChange"></medis-planning>
          </template>
          <template v-if="activeTab==='anatomi'">
            <medis-anatomi v-if="dataAssesmen && dataAssesmen.anatomi" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :objectPenjualan="objectPenjualan" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.anatomi" @submit="updateAssesmen" @dataChange="dataChange"></medis-anatomi>
          </template>

          <template v-if="activeTab==='di_rujuk'">
            <medis-di-rujuk v-if="dataAssesmen && dataAssesmen.di_rujuk" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.di_rujuk" @submit="updateAssesmen" @dataChange="dataChange"></medis-di-rujuk>
          </template>
          <template v-if="activeTab==='gizi'">
            <medis-gizi v-if="dataAssesmen && dataAssesmen.gizi" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.gizi" @submit="updateAssesmen" @dataChange="dataChange"></medis-gizi>
          </template>
          <template v-if="activeTab==='status_psikolog'">
            <medis-status-psikolog v-if="dataAssesmen && dataAssesmen.status_psikolog" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.status_psikolog" @submit="updateAssesmen" @dataChange="dataChange"></medis-status-psikolog>
          </template>
          <template v-if="activeTab==='sosial_ekonomi'">
            <medis-sosial-ekonomi v-if="dataAssesmen && dataAssesmen.sosial_ekonomi" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.sosial_ekonomi" @submit="updateAssesmen" @dataChange="dataChange"></medis-sosial-ekonomi>
          </template>
          <template v-if="activeTab==='status_fungsional'">
            <medis-status-fungsional v-if="dataAssesmen && dataAssesmen.status_fungsional" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.status_fungsional" @submit="updateAssesmen" @dataChange="dataChange"></medis-status-fungsional>
          </template>

        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
              <button class="btn btn-light-primary" v-if="info_alert.includes('Assesmen keperawatan')" @click="$router.push({ name: 'Layanan RJalan Keperawatan', query: { registrasi_id: registrasi_id } })">Assesmen Keperawatan <i class="ri-arrow-right-line"></i></button>
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
                                <td>Installasi Rawat Jalan</td>
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
                            <tr>
                              <td>Riwayat Penyakit Dahulu & Pengobatan </td>
                              <td>:</td>
                              <td>{{ dataAssesmen.subjective && dataAssesmen.subjective.riwayat_penyakit_dahulu_pengobatan ? dataAssesmen.subjective.riwayat_penyakit_dahulu_pengobatan : '-' }}</td>
                            </tr>
                            <tr>
                              <td>Riwayat Alergi </td>
                              <td>:</td>
                              <td>{{ dataAssesmen.subjective && dataAssesmen.subjective.riwayat_alergi ? dataAssesmen.subjective.riwayat_alergi : '-' }}</td>
                            </tr>
                            <tr>
                              <td>Riwayat Pembedahan </td>
                              <td>:</td>
                              <td>{{ dataAssesmen.subjective && dataAssesmen.subjective.riwayat_pembedahan ? dataAssesmen.subjective.riwayat_pembedahan : '-' }}</td>
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

                <tr style="background-color: #FFF4DE">
                  <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Hasil Laboratorium :</td>
                </tr>
                <tr>
                  <td colspan="3">
                    <table class="custom-table" style="margin: 2px;">
                      <tr>
                        <td>#</td>
                        <td>Tanggal</td>
                        <td>Nama Tes</td>
                        <td>Hasil</td>
                        <td>Satuan</td>
                        <td>Nilai Normal</td>
                      </tr>
                      <tr v-if="dataAssesmen.objective && dataAssesmen.objective.lab_hasil" v-for="(item, i) in dataAssesmen.objective.lab_hasil" :key="'hasil-pem-penunjang-lab_hasil-cetak'+i">
                        <td>{{ i+1 }}</td>
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
                  <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Hasil Radiologi :</td>
                </tr>
                <tr>
                  <td colspan="3">
                    <table class="custom-table" style="margin: 2px;">
                      <tr>
                        <td>#</td>
                        <td>Tanggal</td>
                        <td>Nama Tes</td>
                        <td>Hasil</td>
                      </tr>
                      <tr v-if="dataAssesmen.objective && dataAssesmen.objective.radiologi_hasil" v-for="(item, i) in dataAssesmen.objective.radiologi_hasil" :key="'hasil-pem-penunjang-radiologi_hasil-cetak'+i">
                        <td>{{ i+1 }}</td>
                        <td>{{ item.tanggal_request | parse('date') }}</td>
                        <td>{{ item.nama_penunjang }}</td>
                        <td>{{ item.hasil || '-' }}</td>
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
                                <td>{{ item.diagnosa && item.diagnosa.nama_diagnosa ? item.diagnosa.nama_diagnosa : (item.diagnosa || '-') }}</td>
                                <!-- <td>{{ item.diagnosa }}</td> -->
                                <td>{{ item.keterangan || '-' }}</td>
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
                              <td>{{ item.procedure && item.procedure.nama_prosedur ? item.procedure.nama_prosedur : item.procedure }}</td>
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

    <ModalPasien 
      :dataRegistrasi="dataRegistrasi"
    />

    
  </div>
</template>
  
<script>
  import CardRegistrasiRjalan from './_components/card_registrasi_rjalan.vue'
  import MedisSubjective from './_components/medis_subjective.vue'
  import MedisObjective from './_components/medis_objective.vue'
  import MedisAssesment from './_components/medis_assesment.vue'
  import MedisPlanning from './_components/medis_planning.vue'
  import MedisAnatomi from './_components/medis_anatomi.vue'

  import MedisDiRujuk  from './_components/medis_di_rujuk.vue'
  import MedisGizi  from './_components/medis_gizi.vue'
  import MedisStatusPsikolog  from './_components/medis_status_psikolog.vue'
  import MedisSosialEkonomi  from './_components/medis_sosial_ekonomi.vue'
  import MedisStatusFungsional  from './_components/medis_status_fungsional.vue'

  import SatuSehat  from '../_components/satu_sehat/satu_sehat.vue'
  
  import ModalPasien  from '../modal_pasien.vue'

  import print from '../../../components/print.js';
  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_rjalan_medis',
    components: { CardRegistrasiRjalan, MedisSubjective, MedisObjective, MedisAssesment, MedisPlanning, MedisAnatomi, MedisDiRujuk, MedisGizi, MedisStatusPsikolog, MedisSosialEkonomi, MedisStatusFungsional, ModalPasien, SatuSehat },
    data () {
      return {
        info_alert: '',
        loadingAssesmen: false,

        scrollPosition: 0,
        endpoint: 'assesment_medis_rjalan',

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
        activeTab: 'subjective',

        
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

        let dataKeperawatan = await this.$_api.list('assesment_keperawatan_rjalan', { registrasi_id: e.registrasi_id, page: 1, limit: 99999 })
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

        this.loadingAssesmen = true
        let json_assesment_medis_rjalan = {
          subjective: {},
          objective: {},
          assesment: {
            kejiwaan: {}
          },
          planning: {}
        }

        let json = this.dataKeperawatan.json_assesment_keperawatan_rjalan

        // HANDLE KIA
        // if (!json.assesment) json.assesment = {}
        json.assesment.kesehatan_ibu_anak = {}

        // END HANDLE KIA

        if (json.subjective) json_assesment_medis_rjalan.subjective = json.subjective
        if (json.objective) json_assesment_medis_rjalan.objective = json.objective
        if (json.assesment) json_assesment_medis_rjalan.assesment = json.assesment
        if (json.anatomi) json_assesment_medis_rjalan.anatomi = json.anatomi

        if (json.di_rujuk) json_assesment_medis_rjalan.di_rujuk = json.di_rujuk
        if (json.gizi) json_assesment_medis_rjalan.gizi = json.gizi
        if (json.status_psikolog) json_assesment_medis_rjalan.status_psikolog = json.status_psikolog
        if (json.sosial_ekonomi) json_assesment_medis_rjalan.sosial_ekonomi = json.sosial_ekonomi
        if (json.status_fungsional) json_assesment_medis_rjalan.status_fungsional = json.status_fungsional

        console.log(json_assesment_medis_rjalan)
        this.dataAssesmen = json_assesment_medis_rjalan

        await this.$_api.list(this.endpoint, { registrasi_id: e.registrasi_id, page: 1, limit: 99999 } ).then(async (res) => {
          // if (res.data.length) this.dataAssesmen = res.data[0]
          // else this.createAssesmen()

          let penjualan = await this.$_api.post('penjualan/list', { registrasi_id: e.registrasi_id })
          if (penjualan.data.length === 0) {
            // BUAT PENJUALAN
            await this.createPenjualan(this.dataRegistrasi);
            
            penjualan = await this.$_api.post('penjualan/list', { registrasi_id: e.registrasi_id })
          }
          this.objectPenjualan = penjualan.data[0]

          let assesmen = res.data.filter((x) => x.registrasi_id === e.registrasi_id )
          if(assesmen.length) {
            const a = assesmen[0].json_assesment_medis_rjalan ? assesmen[0].json_assesment_medis_rjalan : json_assesment_medis_rjalan
            let hasilAssesmen = await this.buildAssesmenDataKIA(a);

            // PEMERIKSAAN FISIK
            // if(!hasilAssesmen.objective.pemeriksaan_fisik) hasilAssesmen.objective.pemeriksaan_fisik = {}
            // if (typeof hasilAssesmen.objective.pemeriksaan_fisik == 'string') {
            //   // cek tipe nya, gaboleh string (karna form sebelumnya free text jadi ada kemungkinan string)
            //   hasilAssesmen.objective.pemeriksaan_fisik = {}
            // }

            if(!hasilAssesmen.objective.pemeriksaan_kulit) hasilAssesmen.objective.pemeriksaan_kulit = {}
            if(!hasilAssesmen.objective.pemeriksaan_kuku) hasilAssesmen.objective.pemeriksaan_kuku = {}
            if(!hasilAssesmen.objective.pemeriksaan_kepala) hasilAssesmen.objective.pemeriksaan_kepala = {}
            if(!hasilAssesmen.objective.pemeriksaan_wajah) hasilAssesmen.objective.pemeriksaan_wajah = {}
            if(!hasilAssesmen.objective.pemeriksaan_mata) hasilAssesmen.objective.pemeriksaan_mata = {}
            if(!hasilAssesmen.objective.pemeriksaan_telinga) hasilAssesmen.objective.pemeriksaan_telinga = {}
            if(!hasilAssesmen.objective.pemeriksaan_hidung_dan_sinus) hasilAssesmen.objective.pemeriksaan_hidung_dan_sinus = {}
            if(!hasilAssesmen.objective.pemeriksaan_mulut_dan_bibir) hasilAssesmen.objective.pemeriksaan_mulut_dan_bibir = {}
            if(!hasilAssesmen.objective.pemeriksaan_leher) hasilAssesmen.objective.pemeriksaan_leher = {}
            if(!hasilAssesmen.objective.pemeriksaan_dada_dan_punggung) hasilAssesmen.objective.pemeriksaan_dada_dan_punggung = {}
            if(!hasilAssesmen.objective.pemeriksaan_kardiovaskuler) hasilAssesmen.objective.pemeriksaan_kardiovaskuler = {}
            if(!hasilAssesmen.objective.pemeriksaan_dada_dan_aksila) hasilAssesmen.objective.pemeriksaan_dada_dan_aksila = {}
            if(!hasilAssesmen.objective.pemeriksaan_abdomen_perut) hasilAssesmen.objective.pemeriksaan_abdomen_perut = {}
            if(!hasilAssesmen.objective.pemeriksaan_ekstermitas_atas) hasilAssesmen.objective.pemeriksaan_ekstermitas_atas = {}
            if(!hasilAssesmen.objective.pemeriksaan_ekstermitas_bawah) hasilAssesmen.objective.pemeriksaan_ekstermitas_bawah = {}
            if(!hasilAssesmen.objective.pemeriksaan_genitalia_pria) hasilAssesmen.objective.pemeriksaan_genitalia_pria = {}
            if(!hasilAssesmen.objective.pemeriksaan_genitalia_wanita) hasilAssesmen.objective.pemeriksaan_genitalia_wanita = {}

            if (!hasilAssesmen.assesment.odontogram) hasilAssesmen.assesment.odontogram = {}

            if (!hasilAssesmen.assesment.kejiwaan) hasilAssesmen.assesment.kejiwaan = {}

            // Start Fisioterapi
            if (!hasilAssesmen.planning.fisioterapi) hasilAssesmen.planning.fisioterapi = []
            // if (!hasilAssesmen.planning.fisioterapi.data_fisioterapi) hasilAssesmen.planning.fisioterapi.data_fisioterapi = []
            // End Fisioterapi

            console.log('hasilAssesmen', hasilAssesmen)
            
            this.dataAssesmen = hasilAssesmen

            this.objectDataAssesmen = assesmen[0]
            this.objectDataAssesmen.json_assesment_medis_rjalan = this.dataAssesmen

            this.is_validasi = assesmen[0].is_validasi
            // this.dataChange = false
            // if (switch_tab) this.switchActiveTab('subjective')
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
      // async buildAssesmenDataPemeriksaanFisik() {

      // },
      async buildAssesmenDataKIA(json) {
        return new Promise((resolve) => {
          if(!json.assesment.kesehatan_ibu_anak) json.assesment.kesehatan_ibu_anak = {}
          if(!json.assesment.kesehatan_ibu_anak.kia) json.assesment.kesehatan_ibu_anak.kia = {}
          if(!json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal) json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal = {}
          if(!json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal) json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal = {}
          if(!json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.ksrp) json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.ksrp = {}
          if(!json.assesment.kesehatan_ibu_anak.pengamatan_persalinan) json.assesment.kesehatan_ibu_anak.pengamatan_persalinan = {}
          if(!json.assesment.kesehatan_ibu_anak.pengamatan_nifas) json.assesment.kesehatan_ibu_anak.pengamatan_nifas = {}
          if(!json.assesment.kesehatan_ibu_anak.patograf) json.assesment.kesehatan_ibu_anak.patograf = {}
          if(!json.assesment.kesehatan_ibu_anak.surat_ket_lahir) json.assesment.kesehatan_ibu_anak.surat_ket_lahir = {}

          // ASSIGN DATA KIA
          const kesehatan_ibu_anak = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.kia) ? json.assesment.kesehatan_ibu_anak.kia : {}
          // const kesehatan_ibu_anak = {}
          json.assesment.kesehatan_ibu_anak['kia'] = {
            pengamatan_kehamilan: kesehatan_ibu_anak.pengamatan_kehamilan ? kesehatan_ibu_anak.pengamatan_kehamilan : {},
            riwayat_pasien: kesehatan_ibu_anak.riwayat_pasien ? kesehatan_ibu_anak.riwayat_pasien : {},
            riwayat_obstetrik: kesehatan_ibu_anak.riwayat_obstetrik ? kesehatan_ibu_anak.riwayat_obstetrik : {},
            rencana_persalinan: kesehatan_ibu_anak.rencana_persalinan ? kesehatan_ibu_anak.rencana_persalinan : {},
            pemeriksaan_bidan: kesehatan_ibu_anak.pemeriksaan_bidan ? kesehatan_ibu_anak.pemeriksaan_bidan : {},
            risiko_kehamilan: kesehatan_ibu_anak.risiko_kehamilan ? kesehatan_ibu_anak.risiko_kehamilan : {},
          }
          if (!json.assesment.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.golongan_darah) {
            json.assesment.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.golongan_darah = this.dataRegistrasi.nama_golongan_darah
          }
          if (!json.assesment.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.no_telp) {
            json.assesment.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.no_telp = this.dataRegistrasi.no_telepon
          }
          // ASSIGN DATA ANANTENATAL
          const anantenatal = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal && json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal) ? json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal : {}
          // const anantenatal = {}
          json.assesment.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'] = {
            register_antenatal: anantenatal.register_antenatal ? anantenatal.register_antenatal : {},
            pemeriksaan_bayi: anantenatal.pemeriksaan_bayi ? anantenatal.pemeriksaan_bayi : {},
            pelayanan: anantenatal.pelayanan ? anantenatal.pelayanan : {},
            risiko: anantenatal.risiko ? anantenatal.risiko : {},
            pemeriksaan_ibu: anantenatal.pemeriksaan_ibu ? anantenatal.pemeriksaan_ibu : {},
            laboratorium_antenatal: anantenatal.laboratorium_antenatal ? anantenatal.laboratorium_antenatal : {},
            pencegahan_ppia: anantenatal.pencegahan_ppia ? anantenatal.pencegahan_ppia : {},
            kecacingan_kehamilan: anantenatal.kecacingan_kehamilan ? anantenatal.kecacingan_kehamilan : {},
            pencegahan_malaria: anantenatal.pencegahan_malaria ? anantenatal.pencegahan_malaria : {},
            pencegahan_ims: anantenatal.pencegahan_ims ? anantenatal.pencegahan_ims : {},
            keadaan_ibu: anantenatal.keadaan_ibu ? anantenatal.keadaan_ibu : {},
            tb_kehamilan: anantenatal.tb_kehamilan ? anantenatal.tb_kehamilan : {},
            pencegahan_hepatitis: anantenatal.pencegahan_hepatitis ? anantenatal.pencegahan_hepatitis : {},
            konseling_ibu_hamil: anantenatal.konseling_ibu_hamil ? anantenatal.konseling_ibu_hamil : {},

            keterangan: anantenatal.keterangan ? anantenatal.keterangan : ''
          }
          json.assesment.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.tinggi_badan = json.objective.tinggi_badan
          json.assesment.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.berat_badan = json.objective.berat_badan
          json.assesment.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.tekanan_darah = `${json.objective.sistolik}/${json.objective.diastolik}`
          json.assesment.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.anamnesis = json.subjective.keluhan_utama

          // ASSIGN DATA KSPR
          const kspr = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal && json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr) ? json.assesment.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr : {}
          // const kspr = {}
          json.assesment.kesehatan_ibu_anak['pemeriksaan_antenatal']['kspr'] = {
            skrining: kspr.skrining ? kspr.skrining : []
          }

          // ASSIGN DATA PENGAMATAN PERSALINAN
          const pengamatan_persalinan = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.pengamatan_persalinan) ? json.assesment.kesehatan_ibu_anak.pengamatan_persalinan : {}
          // const pengamatan_persalinan = {}
          json.assesment.kesehatan_ibu_anak['pengamatan_persalinan'] = {
            ...pengamatan_persalinan,
            data_persalinan: pengamatan_persalinan.data_persalinan ? pengamatan_persalinan.data_persalinan : {},
            bulk_observasi: pengamatan_persalinan.bulk_observasi ? pengamatan_persalinan.bulk_observasi : []
          };
          if (!json.assesment.kesehatan_ibu_anak['pengamatan_persalinan'].nama_pasien) {
            json.assesment.kesehatan_ibu_anak['pengamatan_persalinan'].nama_pasien = this.dataRegistrasi.nama_lengkap
          }

          // ASSIGN DATA PENGAMATAN NIFAS
          const nifas = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.pengamatan_nifas) ? json.assesment.kesehatan_ibu_anak.pengamatan_nifas : {}
          // const nifas = {}
          json.assesment.kesehatan_ibu_anak['pengamatan_nifas'] = {
            ...nifas,
            pemeriksaan_pnc: nifas.pemeriksaan_pnc ? nifas.pemeriksaan_pnc : {},
            integrasi_program: nifas.integrasi_program ? nifas.integrasi_program : {},
            metode_kontrasepsi: nifas.metode_kontrasepsi ? nifas.metode_kontrasepsi : {}
          }
          if (!json.assesment.kesehatan_ibu_anak['pengamatan_nifas'].nama_pasien) {
            json.assesment.kesehatan_ibu_anak['pengamatan_nifas'].nama_pasien = this.dataRegistrasi.nama_lengkap
          }

          // ASSIGN DATA PATOGRAF
          const patograf = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.patograf) ? json.assesment.kesehatan_ibu_anak.patograf : {}
          // const nifas = {}
          json.assesment.kesehatan_ibu_anak['patograf'] = {
            ...patograf,
            pembukaan_serviks: patograf.pembukaan_serviks ? patograf.pembukaan_serviks : [],
            kontraksi_uterus: patograf.kontraksi_uterus ? patograf.kontraksi_uterus : [],

            detak_jantung_janin: patograf.detak_jantung_janin ? patograf.detak_jantung_janin : [],
            penyusupan: patograf.penyusupan ? patograf.penyusupan : [],
            warna_air: patograf.warna_air ? patograf.warna_air : [],

            nadi: patograf.nadi ? patograf.nadi : [],
            tekanan_darah: patograf.tekanan_darah ? patograf.tekanan_darah : [],
            suhu: patograf.suhu ? patograf.suhu : [],
            urine: patograf.urine ? patograf.urine : [],
            makan_minum: patograf.makan_minum ? patograf.makan_minum : [],

            obat: patograf.obat ? patograf.obat : [],
            cairan: patograf.cairan ? patograf.cairan : [],

            catatan_persalinan: patograf.catatan_persalinan ? patograf.catatan_persalinan : {},
            kala_satu: patograf.kala_satu ? patograf.kala_satu : {},
            kala_dua: patograf.kala_dua ? patograf.kala_dua : {},
            kala_tiga: patograf.kala_tiga ? patograf.kala_tiga : {},
            kala_empat: patograf.kala_empat ? patograf.kala_empat : {},
            bayi_lahir: patograf.bayi_lahir ? patograf.bayi_lahir : {},

            kala_lima: patograf.kala_lima ? patograf.kala_lima : [],
          }
          // console.log("json.assesment.kesehatan_ibu_anak['patograf']", json.assesment.kesehatan_ibu_anak['patograf'])
          json.assesment.kesehatan_ibu_anak['patograf'].nama_pasien = this.dataRegistrasi.nama_lengkap
          json.assesment.kesehatan_ibu_anak['patograf'].gravida = json.assesment.kesehatan_ibu_anak['kia'].riwayat_obstetrik.gravida
          json.assesment.kesehatan_ibu_anak['patograf'].paritas = json.assesment.kesehatan_ibu_anak['kia'].riwayat_obstetrik.partus
          json.assesment.kesehatan_ibu_anak['patograf'].abortus = json.assesment.kesehatan_ibu_anak['kia'].riwayat_obstetrik.abortus

          // ASSIGN DATA SURAT KETERANGAN LAHIR
          const surat_ket_lahir = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.surat_ket_lahir) ? json.assesment.kesehatan_ibu_anak.surat_ket_lahir : {}
          console.log('json', json)
          console.log('surat_ket_lahir', surat_ket_lahir)
          // const surat_ket_lahir = {}
          json.assesment.kesehatan_ibu_anak['surat_ket_lahir'] = {
            data: surat_ket_lahir.data ? surat_ket_lahir.data : []
          };
          return resolve(json)
        })
      },
      createAssesmen () {
        let param = {
          registrasi_id: this.registrasi_id,
          is_validasi: false,
          json_assesment_medis_rjalan: this.dataAssesmen
        }

        this.$_api.create(this.endpoint, param).then((res) => {
          // this.dataAssesmen = res.data.json_assesment_medis_rjalan
          // this.dataAssesmen = param.json_assesment_medis_rjalan
          this.selectRegistrasi(this.dataRegistrasi)
        })
      },
      updateAssesmen (data) {
        // console.log('key', key)
        console.log('data', data)
        console.log('updateAssesment silent', data)
        
        let payload = this.objectDataAssesmen
        // payload.json_assesment_medis_rjalan[data.key] = data.data
        payload.id = payload.assesment_medis_rjalan_id
        this.$_api.update(this.endpoint, payload).then(() => {
          if (data && data.silent === true) {
            console.log('assesmen updated with silent mode.')
          } else {
            this.$_alert.success('Berhasil memperbarui data')
            this.selectRegistrasi(this.dataRegistrasi, false)
          }
          // this.dataChangeStatus = false
        }).catch((err) => {
          this.dataChangeStatus = false
          this.$_alert.error(err)
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
          // { tab: 'objective', key: 'kesadaran', required: true, type: 'string', message: 'Objective - Kesadaran tidak boleh kosong.' },
          { tab: 'objective', key: 'pernafasan', required: true, type: 'string', message: 'Objective - Pernafasan tidak boleh kosong.' },
          { tab: 'objective', key: 'berat_badan', required: true, type: 'string', message: 'Objective - Berat Badan tidak boleh kosong.' },
          { tab: 'objective', key: 'keadaan_umum', required: true, type: 'string', message: 'Objective - Keadaan Umum tidak boleh kosong.' },
          { tab: 'objective', key: 'tinggi_badan', required: true, type: 'string', message: 'Objective - Tinggi Badan tidak boleh kosong.' },
          { tab: 'objective', key: 'lingkar_kepala', required: true, type: 'string', message: 'Objective - Lingkar Kepala tidak boleh kosong.' },
          // { tab: 'objective', key: 'skrining_nyeri', required: true, type: 'string', message: 'Objective - Skrining Nyeri tidak boleh kosong.' },
          { tab: 'objective', key: 'index_masa_tubuh', required: true, type: 'string', message: 'Objective - IMT tidak boleh kosong.' },
          { tab: 'objective', key: 'pemeriksaan_fisik', required: true, type: 'string', message: 'Objective - Pemeriksaan Fisik tidak boleh kosong.' },

          { tab: 'assesment', key: 'diagnosa', required: true, type: 'array', message: 'Assesment - Diagnosa tidak boleh kosong.' },

          // { tab: 'planning', key: 'prosedur', required: true, type: 'array', message: 'Planning - Prosedur tidak boleh kosong.' },
          // { tab: 'planning', key: 'obat_jadi', required: true, type: 'array', message: 'Planning - Obat Jadi tidak boleh kosong.' },
          { tab: 'planning', key: 'tindak_lanjut_kontrol', required: true, type: 'string', message: 'Planning - Tindak Lanjut Kontrol tidak boleh kosong.' },
        ]

        // CHECK VALIDASI
        for (const v of validation) {
          if (v.required) {
            if (this.dataAssesmen[v.tab] && this.dataAssesmen[v.tab][v.key]) {
              const value = this.dataAssesmen[v.tab][v.key]
              const type = typeof value
              if (v.type === 'string') {
                if (!value || value == undefined || value == '') {
                  console.log(`${v.tab} ${v.key}`, {type: type, value: value})
                  this.$_alert.error({}, v.message)
                  return
                }
              } else if(v.type === 'array') {
                if (!Array.isArray(value) || value.length === 0) {
                  console.log(`${v.tab} ${v.key}`, {type: type, length: v.length, value: value})
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
            this.objectDataAssesmen.is_validasi = true
            this.updateAssesmen(this.dataAssesmen)
          }
        });
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
          jenis_rawat: 'RAJAL',
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
      dataChange (status) {
        this.dataChangeStatus = status
      },
      switchActiveTab (e) {
        this.dataAssesmen[e] = this.objectDataAssesmen.json_assesment_medis_rjalan[e]
        this.dataChangeStatus = false
        this.activeTab = e
        if (e === 'assesment') {
            if (!this.dataAssesmen[e].diagnosa) this.dataAssesmen[e].diagnosa = []
            if (!this.dataAssesmen[e].kejiwaan) this.dataAssesmen[e].kejiwaan = {}
        } else if (e === 'planning') {
            if (!this.dataAssesmen[e].prosedur) this.dataAssesmen[e].prosedur = []
            if (!this.dataAssesmen[e].obat_jadi) this.dataAssesmen[e].obat_jadi = []
            if (!this.dataAssesmen[e].obat_racikan) this.dataAssesmen[e].obat_racikan = []
        } else if (e === 'anatomi') {
            if (!this.dataAssesmen[e]) this.dataAssesmen[e] = {}
            if (!this.dataAssesmen[e].data_anatomi) this.dataAssesmen[e].data_anatomi = []
        }
        // this.$nextTick().then(res => {
        //   this.getAllData()
        // })

        if(e === 'objective') {
          console.log('Tab Objective: Active')
          // console.log(this.$refs['medis-objective'])
          // if(this.$refs['medis-objective']) this.$refs['medis-objective'].set_map()
          // this.$children[1].set_map()
        }
      },
      updateScroll() {
        this.scrollPosition = window.scrollY
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