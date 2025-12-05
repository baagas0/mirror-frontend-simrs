<template>
  <div class="card card-custom">
    <div class="card-body pt-4">
      
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs nav-tabs-line mb-5">
            <li class="nav-item">
              <a class="nav-link pointer" @click="switchTab('diagnosa')"
                :class="{ 'active': tabActive === 'diagnosa' }">
                <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                <span class="nav-text">Diagnosa</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link pointer" @click="switchTab('kebidanan')"
                :class="{ 'active': tabActive === 'kebidanan' }">
                <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                <span class="nav-text">Kebidanan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link pointer" @click="switchTab('odontogram')"
                :class="{ 'active': tabActive === 'odontogram' }">
                <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                <span class="nav-text">Odontogram</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link pointer" @click="switchTab('kejiwaan')"
                :class="{ 'active': tabActive === 'kejiwaan' }">
                <span class="nav-icon"><i class="ri-brain-line"></i></span>
                <span class="nav-text">Kejiwaan</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
        
      <div class="row" v-if="tabActive === 'diagnosa'">
        
        <div class="col-12" >
          <ValidationObserver v-slot="{ handleSubmit }">
            <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
              <div class="row">
                <div class="col-6">
                  <s-input v-model="fData.tipe_diagnosa" :key="'tipe_diagnosa'" :id="'tipe_diagnosa'" :item="{
                    label: 'Tipe Diagnosa',
                    id: 'tipe_diagnosa',
                    data: 'tipe_diagnosa',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: fData.tipe_diagnosa,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'ICD', code: 'ICD' },
                        { label: 'Non ICD', code: 'Non ICD' },
                      ]
                    },
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.tipe_diagnosa" />
                </div>
                <div class="col-6" v-if="fData.tipe_diagnosa === 'ICD'">
                  <s-input v-model="fData.diagnosa" :key="'diagnosa'" :id="'diagnosa'" :item="{
                    label: 'Diagnosa',
                    id: 'diagnosa',
                    data: 'diagnosa',
                    type: 'lookup-radio',
                    validation: fData.tipe_diagnosa === 'ICD' ? ['required'] : [],
                    value: fData.diagnosa,
                    return_object: true,
                    api: 'ms_diagnosa',
                    pointer: {
                      label: 'nama_diagnosa',
                      code: 'nama_diagnosa',
                      display: ['kode_diagnosa', 'nama_diagnosa'],
                      headerDisplay: ['Kode', 'Nama'],
                    },
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.diagnosa_medis" />
                </div>
                <div class="col-6" v-else>
                  <s-input v-model="fData.diagnosa" :key="'diagnosa'" :id="'diagnosa'" :item="{
                    label: 'Diagnosa',
                    id: 'diagnosa',
                    data: 'diagnosa',
                    type: 'text',
                    validation: ['required'],
                    value: fData.diagnosa,
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.diagnosa" />
                </div>
                <div class="col-12">
                  <s-input v-model="fData.keterangan" :key="'keterangan'" :id="'keterangan'" :item="{
                    label: 'Keterangan',
                    id: 'keterangan',
                    data: 'keterangan',
                    type: 'text',
                    validation: ['required'],
                    value: fData.keterangan,
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.keterangan" />
                </div>
                <div class="col-12 align-self-center">
                  <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                    <i class="ri-loop-right-fill"></i>
                    Reset
                  </button>
                  <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                    <i class="ri-save-line"></i>
                    {{ $t('global.submit') }}
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="col-12">
          <hr>
        </div>
        <div class="col-12">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipe Diagnosa</th>
                <th>Diagnosa</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in mData[tabActive]" :key="'table'+tabActive+i">
                <td>              
                  <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ 'disabled': objectDataAssesmen.is_validasi }">
                    <i class="ri-delete-bin-line"></i>
                  </a>
                </td>
                <td>{{ item.tipe_diagnosa || '-'  }}</td>
                <td>{{ typeof item.diagnosa == 'object' ? (item.diagnosa && item.diagnosa.nama_diagnosa ? item.diagnosa.nama_diagnosa : '-') : item.diagnosa }}</td>
                <td>{{ item.keterangan || '-'  }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        
      <div class="row" v-if="tabActive === 'kebidanan'">
        <KesehatanIbuAnak
          v-if="mData && mData.kesehatan_ibu_anak"
          :dataRegistrasi="{}"
          :assesmen="mData.kesehatan_ibu_anak"
          :activeTab="'pengamatan_kehamilan'"
          :dataAssesmenTambahan="mData"
          :is_validasi_assesmen_tambahan="false"
        />
      </div>

      <div class="row" v-if="tabActive === 'odontogram'">
        <Odontogram :kunjunganSelesai="false" :dataAnamnesa="mData.odontogram" @submit="updateOdontogram()" ref="odonto"/>
      </div>

      <div class="row" v-if="tabActive === 'kejiwaan'">
        <div class="col-12">
          <div class="">
            <div class="">
              <h3 class="card-title">
                <i class="ri-brain-line mr-2"></i>
                ASESMEN PASIEN KELAINAN EMOSIONAL/GANGGUAN KEJIWAAN
              </h3>
            </div>
          </div>
          <div class="">
            <div class="">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmitKejiwaan)" autocomplete="off">
                  <!-- Informasi Umum -->
                  <div class="mb-6">
                    <h5 class="mb-4">Informasi Umum</h5>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">1. Tanggal asesmen dilakukan</label>
                          <input type="datetime-local" class="form-control" v-model="kejiwaanData.tanggal_assesmen" required>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">2. Sumber informasi diperoleh dari</label>
                          <select class="form-control" v-model="kejiwaanData.sumber_informasi" required>
                            <option value="">Pilih Sumber</option>
                            <option value="pasien">Pasien</option>
                            <option value="keluarga">Keluarga</option>
                            <option value="teman">Teman</option>
                            <option value="tenaga_kesehatan">Tenaga Kesehatan</option>
                            <option value="lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Riwayat Penyakit -->
                  <div class="mb-6">
                    <h5 class="mb-4">3. Riwayat Penyakit</h5>
                    <div class="form-group">
                      <label class="form-label">Apakah ada penyakit menular yang diderita saat ini?</label>
                      <textarea class="form-control" v-model="kejiwaanData.riwayat_penyakit_menular" rows="3"></textarea>
                    </div>
                  </div>

                  <!-- Pengobatan Sebelumnya -->
                  <div class="mb-6">
                    <h5 class="mb-4">4. Pengobatan Sebelumnya</h5>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="form-label">Apakah pernah mendapat pengobatan?</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.pernah_pengobatan" value="tidak" class="mr-2">
                              Tidak Pernah
                            </label>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.pernah_pengobatan" value="pernah" class="mr-2">
                              Pernah
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12" v-if="kejiwaanData.pernah_pengobatan === 'pernah'">
                        <div class="form-group">
                          <label class="form-label">Alasan dan hasil pengobatan:</label>
                          <textarea class="form-control" v-model="kejiwaanData.hasil_pengobatan" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Pengalaman Masa Lalu -->
                  <div class="mb-6">
                    <h5 class="mb-4">5. Pengalaman Masa Lalu</h5>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">Riwayat psikis:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.riwayat_psikis" value="tidak" class="mr-2">
                              Tidak Pernah
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.riwayat_psikis" value="pernah" class="mr-2">
                              Pernah
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">Riwayat seksual:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.riwayat_seksual" value="tidak" class="mr-2">
                              Tidak Pernah
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.riwayat_seksual" value="pernah" class="mr-2">
                              Pernah
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">Penolakan keluarga:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.penolakan_keluarga" value="tidak" class="mr-2">
                              Tidak Pernah
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.penolakan_keluarga" value="pernah" class="mr-2">
                              Pernah
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Dukungan Keluarga -->
                  <div class="mb-6">
                    <h5 class="mb-4">6. Dukungan Keluarga</h5>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">Hubungan dalam keluarga:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.hubungan_keluarga" value="baik" class="mr-2">
                              Baik
                            </label>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.hubungan_keluarga" value="kurang" class="mr-2">
                              Kurang
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">Tindakan kriminal:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.tindakan_kriminal" value="tidak" class="mr-2">
                              Tidak Pernah
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.tindakan_kriminal" value="pernah" class="mr-2">
                              Pernah
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">Anggota keluarga dengan gangguan jiwa:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.anggota_keluarga_gangguan" value="tidak" class="mr-2">
                              Tidak Ada
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.anggota_keluarga_gangguan" value="ada" class="mr-2">
                              Ada
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="kejiwaanData.anggota_keluarga_gangguan === 'ada'">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="form-label">Diagnosa dan treatment:</label>
                          <textarea class="form-control" v-model="kejiwaanData.diagnosa_anggota" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Konsep Diri -->
                  <div class="mb-6">
                    <h5 class="mb-4">7. Konsep Diri</h5>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="form-label">a. Sifat tuhan:</label>
                          <textarea class="form-control" v-model="kejiwaanData.sifat_tuhan" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="form-label">b. Identitas diri:</label>
                          <textarea class="form-control" v-model="kejiwaanData.identitas_diri" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="form-label">c. Peran dalam hidup:</label>
                          <textarea class="form-control" v-model="kejiwaanData.peran_hidup" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="form-label">d. Ideal diri:</label>
                          <textarea class="form-control" v-model="kejiwaanData.ideal_diri" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">e. Nilai-nilai hidup:</label>
                          <textarea class="form-control" v-model="kejiwaanData.nilai_hidup" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">f. Gambaran diri:</label>
                          <textarea class="form-control" v-model="kejiwaanData.gambaran_diri" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Dukungan Sosial -->
                  <div class="mb-6">
                    <h5 class="mb-4">8. Dukungan Sosial</h5>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">a. Orang terdekat:</label>
                          <textarea class="form-control" v-model="kejiwaanData.orang_terdekat" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">b. Peran serta dalam kelompok masyarakat:</label>
                          <textarea class="form-control" v-model="kejiwaanData.peran_kelompok" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">c. Hubungan dengan orang lain:</label>
                          <textarea class="form-control" v-model="kejiwaanData.hubungan_orang_lain" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">d. Kepercayaan dan penilaian diri:</label>
                          <div>
                            <label class="radio-inline mr-3">
                              <input type="radio" v-model="kejiwaanData.kepercayaan_diri" value="baik" class="mr-2">
                              <i class="ri-checkbox-circle-line text-success mr-1"></i> Baik
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.kepercayaan_diri" value="kurang" class="mr-2">
                              <i class="ri-close-circle-line text-danger mr-1"></i> Kurang
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Pemeriksaan Fisik -->
                  <div class="mb-6">
                    <h5 class="mb-4">9. Pemeriksaan Fisik</h5>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">a. Penampilan umum:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.penampilan" value="rapi" class="mr-2">
                              Rapi
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.penampilan" value="tidak_rapi" class="mr-2">
                              Tidak Rapi
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.penampilan" value="sangat_tidak_rapi" class="mr-2">
                              Sangat Tidak Rapi
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">b. Pemeliharaan diri:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.pemeliharaan" value="baik" class="mr-2">
                              Baik
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.pemeliharaan" value="kurang" class="mr-2">
                              Kurang
                            </label>
                            <label class="radio-inline">
                              <input type="radio" v-model="kejiwaanData.pemeliharaan" value="tidak_mampu" class="mr-2">
                              Tidak Mampu
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">c. Aktivitas motorik:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.aktivitas_motorik" value="normal" class="mr-2">
                              Normal
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.aktivitas_motorik" value="terbatas" class="mr-2">
                              Terbatas
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.aktivitas_motorik" value="lompat" class="mr-2">
                              Lompat
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">d. Perilaku khusus:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.perilaku_khusus" value="tidak" class="mr-2">
                              Tidak Ada
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.perilaku_khusus" value="ada" class="mr-2">
                              Ada
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Status Mental -->
                  <div class="mb-6">
                    <h5 class="mb-4">10. Status Mental</h5>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">a. Status mood afekt:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_mood" value="normal" class="mr-2">
                              Normal
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_mood" value="terganggu" class="mr-2">
                              Terganggu
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_mood" value="depresi" class="mr-2">
                              Depresi
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">b. Status komunikasi:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_komunikasi" value="baik" class="mr-2">
                              Baik
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_komunikasi" value="terbatas" class="mr-2">
                              Terbatas
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_komunikasi" value="tidak" class="mr-2">
                              Tidak
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="form-label">c. Status interaksi:</label>
                          <div>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_interaksi" value="baik" class="mr-2">
                              Baik
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_interaksi" value="kurang" class="mr-2">
                              Kurang
                            </label>
                            <label class="radio-inline mr-2">
                              <input type="radio" v-model="kejiwaanData.status_interaksi" value="tidak" class="mr-2">
                              Tidak
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Mekanisme Koping -->
                  <div class="mb-6">
                    <h5 class="m-b4">11. Mekanisme Koping</h5>
                    <div class="form-group">
                      <label class="form-label">Strategi koping yang digunakan:</label>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="kejiwaanData.mekanisme_koping" value="olahraga">
                            <label class="custom-control-label">Olahraga</label>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="kejiwaanData.mekanisme_koping" value="alkohol">
                            <label class="custom-control-label">Alkohol</label>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="kejiwaanData.mekanisme_koping" value="relokasi">
                            <label class="custom-control-label">Teknik Relokasi</label>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="kejiwaanData.mekanisme_koping" value="reaksi">
                            <label class="custom-control-label">Reaksi Berlebih</label>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="kejiwaanData.mekanisme_koping" value="menghindar">
                            <label class="custom-control-label">Menghindar</label>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="kejiwaanData.mekanisme_koping" value="menyerah">
                            <label class="custom-control-label">Menyerah</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Lainnya (sebutkan):</label>
                            <textarea class="form-control" v-model="kejiwaanData.mekanisme_koping_lain" rows="2"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Masalah Psikososial -->
                  <div class="mb-6">
                    <h5 class="mb-4">12. Masalah Psikososial dan Lingkungan</h5>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">Masalah dengan dukungan:</label>
                          <textarea class="form-control" v-model="kejiwaanData.masalah_dukungan" rows="3"></textarea>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="form-label">Masalah dengan lingkungan:</label>
                          <textarea class="form-control" v-model="kejiwaanData.masalah_lingkungan" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Catatan Tambahan -->
                  <div class="mb-6">
                    <h5 class="mb-4">13. Catatan Tambahan</h5>
                    <div class="form-group">
                      <label class="form-label">Catatan penting lainnya:</label>
                      <textarea class="form-control" v-model="kejiwaanData.catatan_tambahan" rows="4"></textarea>
                    </div>
                  </div>

                  <!-- Rekomendasi -->
                  <div class="mb-6">
                    <h5 class="mb-4">14. Rekomendasi Tindak Lanjut</h5>
                    <div class="form-group">
                      <label class="form-label">Rekomendasi:</label>
                      <textarea class="form-control" v-model="kejiwaanData.rekomendasi" rows="4"></textarea>
                    </div>
                  </div>

                  <!-- Buttons -->
                  <div class="form-group text-right">
                    <button type="button" class="btn btn-secondary mr-3" @click="resetFormKejiwaan()">
                      <i class="ri-refresh-line"></i>
                      Reset Form
                    </button>
                    <button type="submit" class="btn btn-primary" :disabled="is_validasi">
                      <i class="ri-save-line"></i>
                      Simpan Asesmen Kejiwaan
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import KesehatanIbuAnak from "../../layanan_ranap/_components/kesehatan_ibu_anak/kesehatan_ibu_anak.vue";
import Odontogram from "../../_components/odontogram/odontogram.vue"
import moment from 'moment'
moment.locale('id')

export default {
  name: 'medis_assesment',
  components: { KesehatanIbuAnak, Odontogram },
  props: {
    is_validasi: {
      type: Boolean,
      required: true,
      default() {
        return false
      }
    },
    objectDataAssesmen: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    mData: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // mData: {}
      tabActive: 'diagnosa',
      fData: {},
      kejiwaanData: {
        // Informasi Pengkajian Awal
        tanggal_assesmen: moment().format('YYYY-MM-DD'),
        sumber_informasi: [],
        sumber_informasi_lain: '',

        // Keluhan Utama dan Riwayat
        keluhan_utama: '',
        keluhan_kejiwaan: '',
        riwayat_kejiwaan: '',
        riwayat_penyakit_menular: '',

        // Riwayat Pengobatan
        pernah_pengobatan: '',
        keteraturan_pengobatan: '',
        efek_samping: '',
        hasil_pengobatan: '',

        // Pengalaman dan Dukungan
        pengalaman_negatif: '',
        pengalaman_positif: '',
        dukungan_keluarga: '',
        riwayat_psikis: '',
        riwayat_seksual: '',
        penolakan_keluarga: '',
        hubungan_keluarga: '',
        tindakan_kriminal: '',
        anggota_keluarga_gangguan: '',
        diagnosa_anggota: '',

        // Konsep Diri
        konsep_diri: '',
        harga_diri: '',
        citra_tubuh: '',
        identitas_peran: '',
        sifat_tuhan: '',
        identitas_diri: '',
        peran_hidup: '',
        ideal_diri: '',
        nilai_hidup: '',
        gambaran_diri: '',
        orang_terdekat: '',

        // Dukungan Sosial
        dukungan_pasangan: '',
        dukungan_teman: '',
        dukungan_organisasi: '',
        peran_kelompok: '',
        hubungan_orang_lain: '',
        kepercayaan_diri: '',

        // Pemeriksaan Fisik
        td: '',
        n: '',
        rr: '',
        suhu: '',
        gcs: '',
        kesadaran: 'Compos Mentis',
        orientasi: [],
        orientasi_lain: '',
        penampilan: '',
        pemeliharaan: '',
        aktivitas_motorik: '',
        perilaku_khusus: '',
        status_mood: '',
        status_komunikasi: '',
        status_interaksi: '',

        // Status Mental
        penampilan: '',
        bicara: '',
        mood: '',
        afek: '',
        proses_pikir: '',
        isi_pikir: '',
        waham: '',
        halusinasi: '',
        daya_ingat: '',
        orientasi_waktu: '',
        orientasi_tempat: '',
        orientasi_orang: '',
        kemampuan_penilaian: '',
        wawasan_diri: '',

        // Mekanisme Koping
        mekanisme_koping: [],
        mekanisme_koping_lain: '',

        // Masalah Psikososial
        masalah_dukungan: '',
        masalah_lingkungan: '',

        // Catatan dan Rekomendasi
        catatan_tambahan: '',
        rekomendasi: ''
      }
    }
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        
        console.log('===> medis_assesment.vue:834 ~ to', to);
        this.handleData()
        // this.$emit('dataChange', true)
      }
    },
    'fData.tipe_diagnosa': {
      handler(to, from) {
        console.log(to)
        if (to !== from) {
          if (to === 'ICD') this.fData.diagnosa = {}
          else if (to === 'Non ICD') this.fData.diagnosa = ''
        }
      }
    }
  },
  mounted() {
    // kia: {}, // ini data pengamat_kehamilan
    // pemeriksaan_antenatal: {
    //   anantenatal: {},
    //   ksrp: {},
    // },
    // pengamatan_persalinan: {},
    // pengamatan_nifas: {},
    // patograf: {},
    // surat_ket_lahir: {}
    const layanan_rjalan_medis_tabActive = localStorage.getItem('layanan_rjalan_medis_tabActive') || null
    if(layanan_rjalan_medis_tabActive) this.tabActive = layanan_rjalan_medis_tabActive

    this.handleData()
  },
  methods: {
    updateOdontogram(tes) {
      console.log(this.mData.odontogram)
      this.$emit('submit', { key: 'assesment', open_tab: 'assesment', data: this.mData })
    },
    updateAssesmenTambahan (silent = false) {
      console.log('silent', silent)
      this.$emit('submit', { key: 'assesment', open_tab: 'assesment', data: this.mData, silent })
    },
    resetForm () {
      this.fData = {}
      this.$refs.assesmenForm.reset();
    },
    handleData() {
      console.log('handleData')
      if (!this.mData.medis) this.mData.medis = []
      if (!this.mData.kebidanan) this.mData.kebidanan = []
      if (!this.mData.kejiwaan) this.mData.kejiwaan = {}

      
      console.log('===> medis_assesment.vue:880 ~ this.mData.kejiwaan', this.mData.kejiwaan);
      Object.keys(this.kejiwaanData).forEach(key => {
        if (this.mData.kejiwaan[key] !== undefined) {
          this.kejiwaanData[key] = this.mData.kejiwaan[key]
        }
      })
    },
    switchTab(key) {
      localStorage.setItem('layanan_rjalan_medis_tabActive', key)
      this.tabActive = key
    },
    onDelete (index) {
      this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
        if (status.isDismissed) return
        else {
          this.mData[this.tabActive].splice(index, 1)
          this.$emit('submit', { key: 'assesment', open_tab: 'assesment', data: this.mData })
        }
      });
    },
    onSubmitEvaluasi() {
      this.fData.evaluasi_diagnosa = 'Belum Teratasi'

      this.mData[this.tabActive].push(this.fData)
      this.resetForm()
      this.$emit('submit', { key: 'assesment', open_tab: 'assesment', data: this.mData })
    },

    // Methods for psychiatric assessment form
    onSubmitKejiwaan() {
      // Add kejiwaan data to mData structure
      if (!this.mData.kejiwaan) {
        this.mData.kejiwaan = {}
      }

      // Create a copy of the current form data
      const kejiwaanSubmission = {
        ...this.kejiwaanData,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        created_by: this.$user ? this.$user.name : 'User'
      }

      // Add to the assessments array
      // this.mData.kejiwaan.push(kejiwaanSubmission)
      this.mData.kejiwaan = kejiwaanSubmission

      // Emit data change event
      this.$emit('submit', {
        key: 'assesment',
        open_tab: 'kejiwaan',
        data: this.mData
      })

      // Show success message
      this.$_alert.success('Asesmen kejiwaan berhasil disimpan')

      // Reset form after successful submission
      // this.resetFormKejiwaan()
    },

    resetFormKejiwaan() {
      // Reset the psychiatric assessment form to default values
      this.kejiwaanData = {
        // Informasi Pengkajian Awal
        tanggal_assesmen: moment().format('YYYY-MM-DD'),
        sumber_informasi: [],
        sumber_informasi_lain: '',

        // Keluhan Utama dan Riwayat
        keluhan_utama: '',
        keluhan_kejiwaan: '',
        riwayat_kejiwaan: '',
        riwayat_penyakit_menular: '',

        // Riwayat Pengobatan
        pernah_pengobatan: '',
        keteraturan_pengobatan: '',
        efek_samping: '',
        hasil_pengobatan: '',

        // Pengalaman dan Dukungan
        pengalaman_negatif: '',
        pengalaman_positif: '',
        dukungan_keluarga: '',
        riwayat_psikis: '',
        riwayat_seksual: '',
        penolakan_keluarga: '',
        hubungan_keluarga: '',
        tindakan_kriminal: '',
        anggota_keluarga_gangguan: '',
        diagnosa_anggota: '',

        // Konsep Diri
        konsep_diri: '',
        harga_diri: '',
        citra_tubuh: '',
        identitas_peran: '',
        sifat_tuhan: '',
        identitas_diri: '',
        peran_hidup: '',
        ideal_diri: '',
        nilai_hidup: '',
        gambaran_diri: '',
        orang_terdekat: '',

        // Dukungan Sosial
        dukungan_pasangan: '',
        dukungan_teman: '',
        dukungan_organisasi: '',
        peran_kelompok: '',
        hubungan_orang_lain: '',
        kepercayaan_diri: '',

        // Pemeriksaan Fisik
        td: '',
        n: '',
        rr: '',
        suhu: '',
        gcs: '',
        kesadaran: 'Compos Mentis',
        orientasi: [],
        orientasi_lain: '',
        penampilan: '',
        pemeliharaan: '',
        aktivitas_motorik: '',
        perilaku_khusus: '',
        status_mood: '',
        status_komunikasi: '',
        status_interaksi: '',

        // Status Mental
        penampilan: '',
        bicara: '',
        mood: '',
        afek: '',
        proses_pikir: '',
        isi_pikir: '',
        waham: '',
        halusinasi: '',
        daya_ingat: '',
        orientasi_waktu: '',
        orientasi_tempat: '',
        orientasi_orang: '',
        kemampuan_penilaian: '',
        wawasan_diri: '',

        // Mekanisme Koping
        mekanisme_koping: [],
        mekanisme_koping_lain: '',

        // Masalah Psikososial
        masalah_dukungan: '',
        masalah_lingkungan: '',

        // Catatan dan Rekomendasi
        catatan_tambahan: '',
        rekomendasi: ''
      }

      // Reset form validation
      if (this.$refs.kejiwaanForm) {
        this.$refs.kejiwaanForm.reset()
      }
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>