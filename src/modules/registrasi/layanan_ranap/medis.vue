<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi" />
        <!-- {{ scrollPosition }} -->
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <!-- <pre>{{ objectDataAssesmen }}</pre> -->
            <div class="ribbon-target" :class="{ 'bg-warning': !is_validasi, 'bg-success': is_validasi }"
              v-if="this.objectDataAssesmen.is_validasi" style="top: 10px; right: 0px;">{{ is_validasi ? 'Sudah' : 'Belum'
              }} Validasi</div>
            <!-- <div class="ribbon-target" v-if="tab === 'assesmen_tambahan'" :class="{'bg-warning': !is_validasi_assesmen_tambahan, 'bg-success': is_validasi_assesmen_tambahan}" style="top: 10px; right: 0px;">{{ is_validasi_assesmen_tambahan ? 'Sudah' : 'Belum' }} Validasi</div> -->
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{
                  dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin |
                  parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button class="btn btn-warning mt-3"
                  v-if="!loadingAssesmen && !is_validasi && objectDataAssesmen.resume_medis_ranap_id && this.objectDataAssesmen.is_validasi"
                  @click="doValidasi()">Validasi Sekarang</button>

                <!-- SATU SEHAT -->
                <SatuSehat :dataRegistrasi="dataRegistrasi" :disabled="loading_heart_rates" :heart_rates="heart_rates"></SatuSehat>

                <!-- <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && tab === 'assesmen_tambahan' && !is_validasi_assesmen_tambahan" @click="doValidasiAssesmenTambahan()">Validasi Sekarang</button> -->
                <button class="btn btn-primary mt-3" v-if="!loadingAssesmen && objectDataAssesmen.resume_medis_ranap_id"
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

        <div class="btn-group btn-group-lg mb-4 w-100" role="group" aria-label="Large button group"
          v-if="dataRegistrasi && dataRegistrasi.id">
          <button type="button" class="btn btn-outline-primary" :class="{ 'bg-primary text-white': tab === 'medis' }"
            @click="tab = 'medis'">Resume Medis</button>
          <button type="button" class="btn btn-outline-primary"
            :class="{ 'bg-primary text-white': tab === 'assesmen_tambahan' }" @click="tab = 'assesmen_tambahan'">Assesmen
            Tambahan</button>
        </div>

        <template v-if="tab === 'medis'">
          <div class="card card-custom mb-5" v-if="loadingAssesmen">
            <div class="card-body d-flex justify-content-center">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>
          <template v-else-if="stateAssesmen === 'create' && dataRegistrasi && registrasi_id">
            <div class="card card-custom">
              <div class="card-header">
                <h3 class="card-title">
                  Buat Resume Medis Rawat Inap
                </h3>
              </div>
              <div class="card-body">
                <!--begin::Form-->
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form ref="assesmenForm" @submit.prevent="handleSubmit(createAssesmen)" autocomplete="off">
                    <div class="card-body">
                      <div class="form-group mb-8">
                        <div class="alert alert-custom alert-default" role="alert">
                          <div class="alert-icon"><i class="flaticon-warning text-primary"></i></div>
                          <div class="alert-text">
                            Isi form dibawah ini untuk membuat resume medis layanan Rawat Inap.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <s-input v-model="param_create_assesmen.tanggal" :key="'tanggal'" :id="'tanggal'" :item="{
                          label: 'Tanggal',
                          id: 'tanggal',
                          data: 'tanggal',
                          type: 'date',
                          validation: ['required'],
                          value: param_create_assesmen.tanggal,
                          param: {},
                        }" :valuee="param_create_assesmen.tanggal" />
                      </div>

                      <div class="col-12">
                        <s-input v-model="param_create_assesmen.ms_tipe_tenaga_medis_id" :key="'ms_tipe_tenaga_medis_id'"
                          :id="'ms_tipe_tenaga_medis_id'" :item="{
                            label: 'Tipe Tenaga Medis',
                            id: 'ms_tipe_tenaga_medis_id',
                            data: 'ms_tipe_tenaga_medis_id',
                            type: 'lookup-radio',
                            validation: ['required'],
                            value: param_create_assesmen.ms_tipe_tenaga_medis_id,
                            return_object: false,
                            pointer: {
                              label: 'nama_tipe_tenaga_medis',
                              code: 'id',
                              display: ['kode_tipe_tenaga_medis', 'nama_tipe_tenaga_medis'],
                              list: [
                                {
                                  id: '44583559-a282-4727-aba2-fa95e253a201',
                                  kode_tipe_tenaga_medis: 'FRM',
                                  nama_tipe_tenaga_medis: 'FARMASI',
                                },
                                {
                                  id: '3d85725e-2046-4996-ad17-859344627160',
                                  kode_tipe_tenaga_medis: 'Dr',
                                  nama_tipe_tenaga_medis: 'DOKTER',
                                },
                                {
                                  id: 'a69afca0-7690-4546-8de3-cef96f3c2c25',
                                  kode_tipe_tenaga_medis: 'PRW',
                                  nama_tipe_tenaga_medis: 'PERAWAT',
                                },
                                {
                                  id: 'ecd658bc-298e-4d42-a511-dc71dff659a6',
                                  kode_tipe_tenaga_medis: 'GZ',
                                  nama_tipe_tenaga_medis: 'Gizi',
                                },
                              ]
                            },
                            param: {},
                          }" :valuee="param_create_assesmen.ms_tipe_tenaga_medis_id" />
                      </div>
                      <div class="col-12">
                        <s-input v-model="param_create_assesmen.ms_dokter_id" :key="'ms_dokter_id'" :id="'ms_dokter_id'"
                          :item="{
                            label: 'Tenaga Medis',
                            id: 'ms_dokter_id',
                            data: 'ms_dokter_id',
                            type: 'lookup-radio',
                            validation: ['required'],
                            value: param_create_assesmen.ms_dokter_id,
                            return_object: true,
                            api: 'msDokter',
                            pointer: {
                              label: 'nama_dokter',
                              code: 'ms_dokter_id',
                              display: ['nama_tipe_tenaga_medis', 'nama_dokter', 'tgl_lahir_dokter|date', 'jk_dokter|kelamin', 'no_hp_dokter', 'nama_specialist'],
                              headerDisplay: ['Tipe Tenaga Medis', 'Nama Dokter', 'Tanggal Lahir', 'Jenis Kelamin', 'No HP', 'Spesialis']
                            },
                            param: {
                              ms_tipe_tenaga_medis_id: param_create_assesmen.ms_tipe_tenaga_medis_id
                            },
                          }" :valuee="param_create_assesmen.ms_dokter_id" />
                      </div>
                      <div class="col-12" v-if="false">
                        <s-input v-model="param_create_assesmen.nama_tenaga_medis" :key="'nama_tenaga_medis'"
                          :id="'nama_tenaga_medis'" :item="{
                            label: 'Nama Tenaga Medis',
                            id: 'nama_tenaga_medis',
                            data: 'nama_tenaga_medis',
                            type: 'text',
                            validation: ['required'],
                            value: param_create_assesmen.nama_tenaga_medis,
                            param: {},
                          }" :disabled="true" :valuee="param_create_assesmen.nama_tenaga_medis" />
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
          <template
            v-else-if="stateAssesmen === 'update' && dataRegistrasi && registrasi_id && objectDataAssesmen.resume_medis_ranap_id && dataAssesmen">
            <div class="alert alert-secondary d-flex flex-row align-items-center" role="alert">
              <i class="ri-information-line"></i>
              <div>
                <p class="mb-0 mt-1 ml-3"> Tanggal : {{ objectDataAssesmen.tanggal | parse('date') }}</p>
                <!-- <p class="mb-0 mt-1 ml-3"> Tipe Tenaga : {{ objectDataAssesmen.nama_tipe_tenaga_medis }}</p> -->
                <p class="mb-0 mt-1 ml-3"> Tenaga Medis : {{ objectDataAssesmen.nama_dokter }}</p>
              </div>
            </div>

            <div class="alert alert-secondary d-flex flex-row align-items-center" role="alert">
              <i class="ri-information-line"></i>
              <div>
                <p class="mb-0 mt-1 ml-3"> Status Casemix : {{ objectDataAssesmen.validasi_casemix ? 'Sudah Validasi' :
                  'Belum Validasi' }}</p>
              </div>
            </div>

            <div class="accordion mb-5" role="tablist">
              <!-- <pre>{{ objectDataAssesmen }}</pre> -->
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateAssesmen)" autocomplete="off">

                  <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
                    <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.subjective
                      style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
                      <div class="card-title" style="padding: 0.7rem 1rem;">
                        <h4 class="card-label">
                          Subjective
                        </h4>
                      </div>
                      <div class="card-toolbar" style="margin: .5rem 1rem;">
                        <i class="ri-arrow-down-double-line text-white" v-if="collapse.subjective"></i>
                        <i class="ri-arrow-right-double-line text-white" v-else></i>
                      </div>
                    </b-card-header>
                    <b-collapse id="subjective" v-model="collapse.subjective" accordion="accordion-subjective"
                      role="tabpanel">
                      <b-card-body class="bg-light-primary">
                        <!-- Anamnesa -->
                        <anamnesa :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.anamnesa"></anamnesa>
                      </b-card-body>
                    </b-collapse>
                  </b-card>

                  <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
                    <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.objective
                      style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
                      <div class="card-title" style="padding: 0.7rem 1rem;">
                        <h4 class="card-label">
                          Objective
                        </h4>
                      </div>
                      <div class="card-toolbar" style="margin: .5rem 1rem;">
                        <i class="ri-arrow-down-double-line text-white" v-if="collapse.objective"></i>
                        <i class="ri-arrow-right-double-line text-white" v-else></i>
                      </div>
                    </b-card-header>
                    <b-collapse id="objective" v-model="collapse.objective" accordion="accordion-objective"
                      role="tabpanel">
                      <b-card-body class="bg-light-primary">
                        <!-- Pemeriksaan Fisik -->
                        <pemeriksaan-fisik class="mt-3" :dataRegistrasi="dataRegistrasi"
                          :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.pemeriksaan_fisik"></pemeriksaan-fisik>

                        <!-- Hasil Pemeriksaan Penunjang -->
                        <!-- <pre>{{ dataAssesmen.hasil_pemeriksaan_penunjang }}</pre> -->
                        <hasil-pemeriksaan-penunjang class="mt-3" :dataRegistrasi="dataRegistrasi"
                          :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.hasil_pemeriksaan_penunjang"></hasil-pemeriksaan-penunjang>

                        <!-- Indikasi Rawat Inap -->
                        <indikasi-rawat-inap class="mt-3" :dataRegistrasi="dataRegistrasi"
                          :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.indikasi_rawat_inap"></indikasi-rawat-inap>

                      </b-card-body>
                    </b-collapse>
                  </b-card>

                  <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
                    <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.assesmen1
                      style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
                      <div class="card-title" style="padding: 0.7rem 1rem;">
                        <h4 class="card-label">
                          Assesmen
                        </h4>
                      </div>
                      <div class="card-toolbar" style="margin: .5rem 1rem;">
                        <i class="ri-arrow-down-double-line text-white" v-if="collapse.assesmen1"></i>
                        <i class="ri-arrow-right-double-line text-white" v-else></i>
                      </div>
                    </b-card-header>
                    <b-collapse id="assesmen1" v-model="collapse.assesmen1" accordion="accordion-assesmen1"
                      role="tabpanel">
                      <b-card-body class="bg-light-primary">
                        <!-- Assesmen -->
                        <assesmen class="mt-3" :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.assesmen"></assesmen>
                      </b-card-body>
                    </b-collapse>
                  </b-card>

                  <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
                    <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.planning
                      style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
                      <div class="card-title" style="padding: 0.7rem 1rem;">
                        <h4 class="card-label">
                          Planning
                        </h4>
                      </div>
                      <div class="card-toolbar" style="margin: .5rem 1rem;">
                        <i class="ri-arrow-down-double-line text-white" v-if="collapse.planning"></i>
                        <i class="ri-arrow-right-double-line text-white" v-else></i>
                      </div>
                    </b-card-header>
                    <b-collapse id="planning" v-model="collapse.planning" accordion="accordion-planning" role="tabpanel">
                      <b-card-body class="bg-light-primary">
                        <!-- Planning -->
                        <tindakan class="mt-3" :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.tindakan" v-if="dataAssesmen.tindakan && dataAssesmen.tindakan.prosedur">
                        </tindakan>

                        <!-- Terapi -->
                        <terapi class="mt-3" :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.terapi"></terapi>

                        <!-- Instruksi Tindak Lanjut -->
                        <instruksi-tindak-lanjut class="mt-3" :dataRegistrasi="dataRegistrasi"
                          :objectDataAssesmen="objectDataAssesmen"
                          :mData="dataAssesmen.instruksi_tindak_lanjut"></instruksi-tindak-lanjut>
                      </b-card-body>
                    </b-collapse>
                  </b-card>

                  <!-- Submit -->
                  <template>
                    <div class="col-12 p-0 mt-6 d-flex gap-7 mb-6">
                      <button type="button" class="btn btn-warning w-100"
                        :class="{ 'btn-danger': objectDataAssesmen.validasi_dokter }" @click="doValidasi()"
                        :disabled="objectDataAssesmen.validasi_casemix">
                        <i class="ri-rotate-lock-line"></i>
                        {{ objectDataAssesmen.validasi_dokter ? 'Batalkan Validasi' : 'Validasi' }}
                      </button>
                      <button type="submit" class="btn btn-primary w-100" :disabled="objectDataAssesmen.validasi_dokter">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </template>
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
        </template>
        <template v-else-if="tab === 'assesmen_tambahan'">
          <!-- {{ dataAssesmenTambahan.kesehatan_ibu_anak }} -->
          <!-- BELUM VALIDASI ASSESMEN TAMBAHAN KEPERAWATAN -->
          <div class="card card-custom"
            v-if="objAssesmenTambahan && objAssesmenTambahan.assesment_tambahan_rnap_id && objAssesmenTambahan.is_validasi_askep === false">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 class="mt-3 font-weight-bolder text-dark">Assesmen tambahan keperawatan belum divalidasi. silahkan
                validasi sebelum menuju assesmen tambahan medis.</h3>
            </div>
          </div>

          <KesehatanIbuAnak v-else-if="dataAssesmenTambahan && dataAssesmenTambahan.kesehatan_ibu_anak"
            :dataRegistrasi="dataRegistrasi" :assesmen="dataAssesmenTambahan.kesehatan_ibu_anak" :activeTab="activeTabKIA"
            :dataAssesmenTambahan="dataAssesmenTambahan" :is_validasi_assesmen_tambahan="is_validasi_assesmen_tambahan" />
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">-</h3>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div id="cetak-resume-medis" style="position: relative; display: none">
      <div size="A4">
        <div class="" style=" align-items: center; width: 99%; margin-bottom: 10px;">
          <!-- KOP -->
          <table class="custom-table"
            v-if="dataRegistrasi && registrasi_id && objectDataAssesmen.resume_medis_ranap_id && dataAssesmen">
            <tr>
              <td rowspan="2" style="height: 60px;"><img :src="$_config.logo.lg" alt="" height="70px"></td>
              <td style="height: 25px; align-items: center;vertical-align: middle;">
                <h5 style="font-weight: 600; font-size: 25px; line-height: 35px;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN
                </h5>
              </td>

            </tr>
            <tr>
              <td style="height: 15px;">
                Jl. Gajah mada kec.batauga kab.buton selatan, sulawesi tenggara
              </td>
            </tr>

            <tr class="bg-dark">
              <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Resume
                Medis</td>
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
                    <td>Installasi Rawat Inap</td>
                  </tr>
                  <tr>
                    <td>Nama / JK</td>
                    <td>:</td>
                    <td>{{ dataRegistrasi.nama_lengkap || '-' }} / {{ dataRegistrasi.jenis_kelamin | parse('kelamin') }}
                    </td>

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
                Subjective</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="custom-table">
                  <tr>
                    <td>Anamnesa</td>
                    <td>:</td>
                    <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.anamnesa  ?
                      dataAssesmen.anamnesa.anamnesa  : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Keluhan Utama</td>
                    <td>:</td>
                    <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.keluhan_utama ?
                      dataAssesmen.anamnesa.keluhan_utama : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Riwayat Kesehatan Sekarang</td>
                    <td>:</td>
                    <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.riwayat_penyakit_saat_ini  ?
                      dataAssesmen.anamnesa.riwayat_penyakit_saat_ini  : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Riwayat Kesehatan </td>
                    <td>:</td>
                    <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.riwayat_kesehatan ?
                      dataAssesmen.anamnesa.riwayat_kesehatan : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Riwayat Perjalanan Penyakit</td>
                    <td>:</td>
                    <td>{{ dataAssesmen.anamnesa && dataAssesmen.anamnesa.riwayat_perjalanan_penyakit ?
                      dataAssesmen.anamnesa.riwayat_perjalanan_penyakit : '-' }}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="bg-dark">
              <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Objective
              </td>
            </tr>
            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Pemeriksaan Fisik :</td>
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
                      </table>
                    </td>
                    <td>
                      <table class="custom-table">
                        <tr>
                          <td>Tanda Tanda Vital </td>
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

            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Hasil Pemeriksaan Penunjang :</td>
            </tr>
            
            <tr>
              <td colspan="3">
                <table class="custom-table">
                  <tr>
                    <td>
                      <table class="custom-table">
                        <tr>
                          <td>Hasil Laboratorium</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.pemeriksaan_fisik ?
                            dataAssesmen.hasil_pemeriksaan_penunjang.pemeriksaan_fisik : '-' }}</td>
                        </tr>
                        <tr>
                          <td>Radiologi</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.tanda_tanda_vital ?
                            dataAssesmen.hasil_pemeriksaan_penunjang.tanda_tanda_vital : '-' }}</td>
                        </tr>
                        <tr>
                          <td>Penunjang Luar</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.penunjang_luar  ?
                            dataAssesmen.hasil_pemeriksaan_penunjang.penunjang_luar  : '-' }}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Hasil Laborat :</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="custom-table w-100">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tanggal</th>
                      <th>Nama Tes</th>
                      <th>Hasil</th>
                      <th>Satuan</th>
                      <th>Nilai Normal</th>
                    </tr>
                  </thead>
                  <tbody v-if="dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.lab_hasil">
                    <tr v-for="(item, i) in dataAssesmen.hasil_pemeriksaan_penunjang.lab_hasil" :key="'hasil-pem-penunjang-lab_hasil'+i">
                      <td>{{ i+1 }}</td>
                      <td>{{ item.tanggal_request | parse('date') }}</td>
                      <td>{{ item.nama_penunjang }}</td>
                      <td>{{ item.hasil || '-' }}</td>
                      <td>{{ item.satuan || '-' }}</td>
                      <td>{{ item.parameter_normal || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Hasil Radiologi :</td>
            </tr>
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
                  <tbody v-if="dataAssesmen.hasil_pemeriksaan_penunjang && dataAssesmen.hasil_pemeriksaan_penunjang.hasil_radiologi">
                    <tr v-for="(item, i) in dataAssesmen.hasil_pemeriksaan_penunjang.hasil_radiologi" :key="'hasil-pem-penunjang-lab_hasil'+i">
                      <td>{{ i+1 }}</td>
                      <td>{{ item.tanggal_request | parse('date') }}</td>
                      <td>{{ item.nama_penunjang }}</td>
                      <td>{{ item.hasil || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Indikasi Rawat Inap :</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="custom-table">
                  <tr>
                    <td>
                      <table class="custom-table">
                        <tr>
                          <td>Hasil Laboratorium</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.indikasi_rawat_inap && dataAssesmen.indikasi_rawat_inap.indikasi_ranap_inap ?
                            dataAssesmen.indikasi_rawat_inap.indikasi_ranap_inap : '-' }}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="bg-dark">
              <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Assesmen
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="custom-table" style="margin: 2px;">
                  <tr>
                    <td>Tipe Diagnosa</td>
                    <td>Diagnosa</td>
                    <td>Keterangan</td>
                  </tr>
                  <tr v-if="dataAssesmen.assesmen && dataAssesmen.assesmen.diagnosa"
                    v-for="(item, i) in dataAssesmen.assesmen.diagnosa" :key="'asdasd' + i">
                    <td>{{ item.tipe_diagnosa || '-' }}</td>
                    <td>{{ item.diagnosa && item.diagnosa.nama_diagnosa ? item.diagnosa.nama_diagnosa : (item.diagnosa ||
                      '-') }}</td>
                    <td>{{ item.keterangan || '-' }}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="bg-dark">
              <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Planning
              </td>
            </tr>

            <!-- <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Prosedur :</td>
            </tr> -->
            <!-- <tr>
              <td colspan="3">
                <table class="custom-table" style="margin: 2px;">
                  <tr>
                    <td>Tipe Prosedur</td>
                    <td>Prosedur</td>
                    <td>Tindakan</td>
                    <td>Keterangan</td>
                  </tr>
                  <tr v-if="dataAssesmen.planning && dataAssesmen.planning.prosedur"
                    v-for="(item, i) in dataAssesmen.planning.prosedur" :key="'asdasdasd' + i">
                    <td>{{ item.tipe_procedure || '-' }}</td>
                    <td>{{ item.procedure && item.procedure.nama_prosedur ? item.procedure.nama_prosedur : item.procedure
                    }}</td>
                    <td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : '-' }}</td>
                    <td>{{ item.keterangan || '-' }}</td>
                  </tr>
                </table>
              </td>
            </tr> -->

            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Tindakan :</td>
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
                  <tr v-if="dataAssesmen.tindakan && dataAssesmen.tindakan.prosedur"
                    v-for="(item, i) in dataAssesmen.tindakan.prosedur" :key="'asdasdasds' + i">
                    <td>{{ item.tipe_procedure || '-' }}</td>
                    <td>{{ item.procedure && item.procedure.nama_prosedur ? item.procedure.nama_prosedur : item.procedure
                    }}</td>
                    <td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : '-' }}</td>
                    <td>{{ item.keterangan || '-' }}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Terapi :</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="custom-table">
                  <tr>
                    <td>
                      <table class="custom-table">
                        <tr>
                          <td>Terapi Obat Jadi</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.terapi && dataAssesmen.terapi.terapi_obat_jadi  ?
                            dataAssesmen.terapi.terapi_obat_jadi  : '-' }}</td>
                        </tr>
                        <tr>
                          <td>Terapi Obat Racik</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.terapi && dataAssesmen.terapi.terapi_obat_racik ?
                            dataAssesmen.terapi.terapi_obat_racik : '-' }}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style="background-color: #FFF4DE">
              <td colspan="3" style="vertical-align: middle;font-weight: 600; height: 20px;">Instruksi Tindak Lanjut :</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="custom-table">
                  <tr>
                    <td>
                      <table class="custom-table">
                        <tr>
                          <td>Terapi</td>
                          <td>:</td>
                          <td>{{ dataAssesmen.instruksi_tindak_lanjut && dataAssesmen.instruksi_tindak_lanjut.instruksi_tindak_lanjut   ?
                            dataAssesmen.instruksi_tindak_lanjut.instruksi_tindak_lanjut   : '-' }}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
          <div v-else>
            <p>Assesmen tidak ditemukan</p>
          </div>
          <!-- <div style="padding-bottom: 10px"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import CardRegistrasiRanap from './_components/card_registrasi_ranap.vue'
import Anamnesa from './_components/medis/anamnesa.vue'
import PemeriksaanFisik from './_components/medis/pemeriksaan-fisik.vue'
import HasilPemeriksaanPenunjang from './_components/medis/hasil-pemeriksaan-penunjang.vue'
import IndikasiRawatInap from './_components/medis/indikasi-rawat-inap.vue'
import Assesmen from './_components/medis/assesmen.vue'
import Tindakan from './_components/medis/tindakan.vue'
import InstruksiTindakLanjut from './_components/medis/instruksi-tindak-lanjut.vue'
import Terapi from './_components/medis/terapi.vue'

import KesehatanIbuAnak from "./_components/kesehatan_ibu_anak/kesehatan_ibu_anak.vue";

import SatuSehat  from '../_components/satu_sehat/satu_sehat.vue'

import print from '../../../components/print.js';
import moment from 'moment'
moment.locale('id')

export default {
  name: 'layanan_ranap_medis',
  components: { CardRegistrasiRanap, Anamnesa, PemeriksaanFisik, HasilPemeriksaanPenunjang, IndikasiRawatInap, Assesmen, Tindakan, InstruksiTindakLanjut, Terapi, KesehatanIbuAnak, SatuSehat },
  data() {
    return {
      tab: 'medis',
      info_alert: '',
      loadingAssesmen: false,

      scrollPosition: 0,
      endpoint: 'resume_medis_ranap',

      dataRegistrasi: {},
      registrasi_id: '',

      dataKeperawatan: {},
      validasiKeperawatan: false,

      is_validasi: false,
      objectDataAssesmen: {},
      dataAssesmen: {
        anamnesa: {
          data_anatomi: []
        },
        pemeriksaan_fisik: {},
        hasil_pemeriksaan_penunjang: {},
        assesmen: {
          diagnosa: []
        },
        planning: {},
        tindakan: { prosedur: [] }
      },
      objectPenjualan: {},

      dataChangeStatus: false,
      activeTab: 'subjective',
      stateAssesmen: 'update',
      param_create_assesmen: {
        validasi_dokter: false,
        json_resume_medis_ranap: {},
        tanggal: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        registrasi_id: '',

        ms_tipe_tenaga_medis_id: '',
        ms_dokter_id: '',
        nama_tenaga_medis: '',
      },

      loading_heart_rates: false,
      heart_rates: [],

      collapse: {},

      // Start Assesmen Tambahan
      activeTabKIA: 'pengamatan_kehamilan',
      is_validasi_assesmen_tambahan: true,
      objAssesmenTambahan: {},
      dataAssesmenTambahan: {
        kesehatan_ibu_anak: {
          kia: {}, // ini data pengamat_kehamilan
          pemeriksaan_antenatal: {
            anantenatal: {},
            ksrp: {},
          },
          pengamatan_persalinan: {},
          pengamatan_nifas: {},
          patograf: {},
          surat_ket_lahir: {}
        }
      },
      // End Assesmen Tambahan
    }
  },
  watch: {
    tab: {
      async handler(to, from) {
        if (to !== from && this.dataRegistrasi) {
          console.error(`Tab Change! ${to} = ${from}`);

          if (to === 'medis') await this.selectRegistrasi(this.dataRegistrasi);
          else if (to === 'assesmen_tambahan') {
            // await this.selectRegistrasi(this.dataRegistrasi);
            if (this.objAssesmenTambahan && this.objAssesmenTambahan.is_validasi_askep === false) this.$_alert.error({}, 'Assesmen tambahan keperawatan belum divalidasi. silahkan validasi sebelum menuju assesmen tambahan medis.')
          }
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  methods: {
    // START ASSESMEN TAMBAHAN
    async findAssesmenTambahan(param = {}) {
      const res = await this.$_api.post('assesment_tambahan_rnap/list', param);

      if (res.data && res.data.length) return res.data[0]
      else return {}
    },
    async createAssesmenTambahan(param = {}) {
      const staticParam = {
        "is_validasi_askep": false,
        "json_askep": {},
        "is_validasi_asmed": false,
        "json_asmed": {}
      };
      const res = await this.$_api.create('assesment_tambahan_rnap', { ...staticParam, ...param })

      if (res.status === 200) return res.data
      else {
        this.$_alert.error({}, 'Tidak dapat membuat assesmen')
        return false
      }
    },
    async initAssesmenTambahan(registrasi_id) {
      let ass = await this.findAssesmenTambahan({ registrasi_id });
      this.objAssesmenTambahan = ass
      console.log('ass', ass)

      // console.error('END INIT ASSESMEN TAMBAHAN=========')
      // return
      if (!ass.id) ass = this.createAssesmenTambahan({ registrasi_id });
      // if(ass === false) return; // GAGAL BUAT ASSESMEN

      // CEK VALIDASI ASSESMEN TAMBAHAN KEPERAWATAN
      if (ass.is_validasi_askep === false) {
        return
      }

      // this.objAssesmenTambahan = ass

      if (this.objAssesmenTambahan && Object.keys(this.objAssesmenTambahan.json_asmed).length === 0) {
        const tempJsonAskep = JSON.parse(JSON.stringify(this.objAssesmenTambahan.json_askep))
        this.objAssesmenTambahan.json_asmed = tempJsonAskep
        this.dataAssesmenTambahan = this.objAssesmenTambahan.json_asmed
        // this.updateAssesmenTambahan();
      }

      this.is_validasi_assesmen_tambahan = this.objAssesmenTambahan.is_validasi_asmed

      await this.buildAssesmenTambahan(this.objAssesmenTambahan.json_asmed)
    },
    async buildAssesmenTambahan(json) {
      console.log('buildAssesmenTambahan', json)
      console.log('this.dataRegistrasi.nama_lengkap', this.dataRegistrasi.nama_lengkap)

      // ASSIGN DATA KIA
      const kesehatan_ibu_anak = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.kia) ? json.kesehatan_ibu_anak.kia : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['kia'] = {
        pengamatan_kehamilan: kesehatan_ibu_anak.pengamatan_kehamilan ? kesehatan_ibu_anak.pengamatan_kehamilan : {},
        riwayat_pasien: kesehatan_ibu_anak.riwayat_pasien ? kesehatan_ibu_anak.riwayat_pasien : {},
        riwayat_obstetrik: kesehatan_ibu_anak.riwayat_obstetrik ? kesehatan_ibu_anak.riwayat_obstetrik : {},
        rencana_persalinan: kesehatan_ibu_anak.rencana_persalinan ? kesehatan_ibu_anak.rencana_persalinan : {},
        pemeriksaan_bidan: kesehatan_ibu_anak.pemeriksaan_bidan ? kesehatan_ibu_anak.pemeriksaan_bidan : {},
        risiko_kehamilan: kesehatan_ibu_anak.risiko_kehamilan ? kesehatan_ibu_anak.risiko_kehamilan : {},
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.golongan_darah) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.golongan_darah = this.dataRegistrasi.nama_golongan_darah
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.no_telp) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.no_telp = this.dataRegistrasi.no_telepon
      }

      // ASSIGN DATA ANANTENATAL
      const anantenatal = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pemeriksaan_antenatal && json.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal) ? json.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pemeriksaan_antenatal']['anantenatal'] = {
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
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.tinggi_badan = json.objective.tinggi_badan
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.berat_badan = json.objective.berat_badan
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.tekanan_darah = `${json.objective.sistolik}/${json.objective.diastolik}`
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.anamnesis = json.subjective.keluhan_utama


      // ASSIGN DATA KSPR
      const kspr = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pemeriksaan_antenatal && json.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr) ? json.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pemeriksaan_antenatal']['kspr'] = {
        skrining: kspr.skrining ? kspr.skrining : []
      }

      // ASSIGN DATA PENGAMATAN PERSALINAN
      const pengamatan_persalinan = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pengamatan_persalinan) ? json.kesehatan_ibu_anak.pengamatan_persalinan : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pengamatan_persalinan'] = {
        ...pengamatan_persalinan,
        data_persalinan: pengamatan_persalinan.data_persalinan ? pengamatan_persalinan.data_persalinan : {},
        bulk_observasi: pengamatan_persalinan.bulk_observasi ? pengamatan_persalinan.bulk_observasi : []
      };
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_persalinan'].nama_pasien) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_persalinan'].nama_pasien = this.dataRegistrasi.nama_lengkap
      }

      // ASSIGN DATA PENGAMATAN NIFAS
      const nifas = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pengamatan_nifas) ? json.kesehatan_ibu_anak.pengamatan_nifas : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pengamatan_nifas'] = {
        ...nifas,
        pemeriksaan_pnc: nifas.pemeriksaan_pnc ? nifas.pemeriksaan_pnc : {},
        integrasi_program: nifas.integrasi_program ? nifas.integrasi_program : {},
        metode_kontrasepsi: nifas.metode_kontrasepsi ? nifas.metode_kontrasepsi : {}
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_nifas'].nama_pasien) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_nifas'].nama_pasien = this.dataRegistrasi.nama_lengkap
      }

      // ASSIGN DATA PATOGRAF
      const patograf = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.patograf) ? json.kesehatan_ibu_anak.patograf : {}
      // const nifas = {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['patograf'] = {
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
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].nama_pasien = this.dataRegistrasi.nama_lengkap
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].gravida = this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].riwayat_obstetrik.gravida
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].paritas = this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].riwayat_obstetrik.partus
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].abortus = this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].riwayat_obstetrik.abortus

      // ASSIGN DATA SURAT KETERANGAN LAHIR
      const surat_ket_lahir = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.surat_ket_lahir) ? json.kesehatan_ibu_anak.surat_ket_lahir : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['surat_ket_lahir'] = {
        data: surat_ket_lahir.data ? surat_ket_lahir.data : []
      };

      return true;
    },
    updateAssesmenTambahan() {
      let param = { ...this.objAssesmenTambahan }
      param.id = param.assesment_tambahan_rnap_id
      param.json_asmed = this.dataAssesmenTambahan
      console.log('param', param)
      this.$_api.update('assesment_tambahan_rnap', param).then((res) => {
        console.log(res)
        this.$_alert.success('Assesmen Tambahan berhasil diperbarui.')
      })
    },
    doValidasiAssesmenTambahan() {
      console.log('cok')
      this.$_alert.confirm('Yakin ingin memvalidasi assesmen ini?').then((res) => {
        console.log(res)
        if (res.isConfirmed) {
          this.objAssesmenTambahan.is_validasi_asmed = true
          this.is_validasi_assesmen_tambahan = this.objAssesmenTambahan.is_validasi_asmed
          this.updateAssesmenTambahan()
          console.log('asu')
        }
      })
    },
    // END ASSESMEN TAMBAHAN
    async selectRegistrasi(e, switch_tab = true) {
      this.dataRegistrasi = e
      this.registrasi_id = e.registrasi_id || ''
      if (!this.registrasi_id) return

      await this.$_api.list(this.endpoint, { registrasi_id: e.registrasi_id, page: 1, limit: 99999 }).then(async (res) => {

        console.log('res.data[0]', this.endpoint, res.data)
        // Init Assesmen Tambahan
        this.tab = 'medis';
        await this.initAssesmenTambahan(this.registrasi_id);

        // Start Handle json
        if (res.data.length === 0) {
          console.log('Assesmen medis belum dibuat.')
          // this.createAssesmen()
          this.objectDataAssesmen = {}
          this.stateAssesmen = 'create'
        } else {
          this.stateAssesmen = 'update'
          let resume_medis_ranap = res.data[0]
          let json_resume_medis_ranap = resume_medis_ranap.json_resume_medis_ranap
          if (!json_resume_medis_ranap.assesmen) json_resume_medis_ranap.assesmen = {}
          if (!json_resume_medis_ranap.assesmen.diagnosa) json_resume_medis_ranap.assesmen.diagnosa = []

          if (!json_resume_medis_ranap.planning) json_resume_medis_ranap.planning = {}
          if (!json_resume_medis_ranap.planning.prosedur) json_resume_medis_ranap.planning.prosedur = []
          if (!json_resume_medis_ranap.planning.obat_jadi) json_resume_medis_ranap.planning.obat_jadi = []

          console.log('json_resume_medis_ranap', json_resume_medis_ranap)
          // Anamnesa
          this.dataAssesmen.anamnesa = json_resume_medis_ranap.anamnesa
          if (!this.dataAssesmen.anamnesa) this.dataAssesmen.anamnesa = {}
          // Custom Assesmen
          if (!this.dataAssesmen.anamnesa.data_anatomi) this.dataAssesmen.anamnesa.data_anatomi = []
          if (!this.dataAssesmen.assesmen.data_anatomi) this.dataAssesmen.assesmen.data_anatomi = []

          // Hasil Pemeriksaan Penunjang
          if (!json_resume_medis_ranap.hasil_pemeriksaan_penunjang) json_resume_medis_ranap.hasil_pemeriksaan_penunjang = {}
          if (!json_resume_medis_ranap.hasil_pemeriksaan_penunjang.lab_hasil) json_resume_medis_ranap.hasil_pemeriksaan_penunjang.lab_hasil = []
          if (!json_resume_medis_ranap.hasil_pemeriksaan_penunjang.lab_hasil) json_resume_medis_ranap.hasil_pemeriksaan_penunjang.hasil_radiologi = []
          this.dataAssesmen.hasil_pemeriksaan_penunjang = json_resume_medis_ranap.hasil_pemeriksaan_penunjang

          // Pemeriksaan Fisik
          this.dataAssesmen.pemeriksaan_fisik = json_resume_medis_ranap.pemeriksaan_fisik
          if (!this.dataAssesmen.pemeriksaan_fisik) this.dataAssesmen.pemeriksaan_fisik = {}

          // Indikasi Rawat Inap
          this.dataAssesmen.indikasi_rawat_inap = json_resume_medis_ranap.indikasi_rawat_inap
          if (!this.dataAssesmen.indikasi_rawat_inap) this.dataAssesmen.indikasi_rawat_inap = {}

          // Assesmen
          this.dataAssesmen.assesmen = json_resume_medis_ranap.assesmen
          // if (!this.dataAssesmen.assesmen) this.dataAssesmen.assesmen = {}
          // Custom Assesmen
          if (!this.dataAssesmen.assesmen.diagnosa) this.dataAssesmen.assesmen.diagnosa = []

          // Tindakan
          if (json_resume_medis_ranap && json_resume_medis_ranap.tindakan && !json_resume_medis_ranap.tindakan.prosedur) {
            json_resume_medis_ranap.tindakan.prosedur = []
          }
          console.log('json_resume_medis_ranap.tindakan', json_resume_medis_ranap.tindakan)
          this.dataAssesmen.tindakan = json_resume_medis_ranap.tindakan
          if (!this.dataAssesmen.tindakan) this.dataAssesmen.tindakan = {}
          // Custom Planning
          if (!this.dataAssesmen.tindakan.prosedur) this.dataAssesmen.tindakan.prosedur = []

          // Instruksi Tindak lanjut
          this.dataAssesmen.instruksi_tindak_lanjut = json_resume_medis_ranap.instruksi_tindak_lanjut
          if (!this.dataAssesmen.instruksi_tindak_lanjut) this.dataAssesmen.instruksi_tindak_lanjut = {}

          // Terapi
          this.dataAssesmen.terapi = json_resume_medis_ranap.terapi
          if (!this.dataAssesmen.terapi) this.dataAssesmen.terapi = {}

          // CARI HEART RATE UNTUK SYNC KE SATU SEHAT
          await this.getNadiOnCppt()

          this.objectDataAssesmen = { ...resume_medis_ranap, json_resume_medis_ranap: this.dataAssesmen }
          this.collapse.subjective = true
        }
        // End Handle json

        setTimeout(() => {
          this.loadingAssesmen = false
        }, 500);
      }).catch((err) => {
        console.log(err)
        this.loadingAssesmen = false
        this.$_alert.error({}, 'Tidak dapat mengambil data assesmen!')
      })
    },
    createAssesmen() {
      const tenaga_medis = this.param_create_assesmen.ms_dokter_id

      const def = {
        registrasi_id: this.registrasi_id,
        ms_dokter_id: tenaga_medis.ms_dokter_id,
        nama_tenaga_medis: tenaga_medis.nama_dokter,
        json_resume_medis_ranap: {
          anamnesa: {},
          hasil_pemeriksaan_penunjang: {},
          pemeriksaan_fisik: {},
          indikasi_rawat_inap: {},
          assesmen: {},
          tindakan: {},
          instruksi_tindak_lanjut: {},
          terapi: {},
        }
      }

      let param = { ...this.param_create_assesmen, ...def }

      this.$_api.create(this.endpoint, param).then((res) => {
        this.selectRegistrasi(this.dataRegistrasi)
      })
    },
    updateAssesmen(data = {}) {
      // console.log('data', data)
      // console.log('objectDataAssesmen', this.objectDataAssesmen)
      // return

      let payload = this.objectDataAssesmen
      payload.id = payload.resume_medis_ranap_id
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
    async getNadiOnCppt() {
      this.loading_heart_rates = true
      const res = await this.$_api.post('cppt/list', { registrasi_id: this.dataRegistrasi.registrasi_id })
      this.heart_rates = []

      for (const item of res.data) {
        const asesmen = item.asesmen;

        if (asesmen && asesmen.objective && asesmen.objective.nadi) {
          this.heart_rates.push({
            value: asesmen.objective.nadi,
            date: item.updatedAt ? item.updatedAt : moment().format('YYYY-MM-DDTHH:mm:ssZ')
          })
        }
      }

      this.loading_heart_rates = false
    }
  }

}
</script>

<style scoped>.sticky {
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