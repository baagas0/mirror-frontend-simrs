<template>
  <div id="page-antenatal">
    <b-card>
      <b-row class="random-card">
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <b-card-group columns>
            <b-card>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <h6 class="custom-title">Register</h6>
                </b-col>
              </b-row>
              <b-row style="margin-top: 15px;">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <!-- <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      ID <span class="text-danger">*</span>
                    </template>
                    <b-form-input
                      type="text"
                      placeholder="Otomatis"
                      disabled
                    ></b-form-input>
                  </b-form-group> -->

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Tanggal
                    </template>
                    <b-form-datepicker style="width: 100%"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" no-flip locale="id"
                      v-model="mData.register_antenatal.tanggal_register"></b-form-datepicker>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Nama Pasien
                    </template>
                    <b-form-input type="text" v-model="mData.register_antenatal.nama_pasien" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Kunjungan
                    </template>
                    <b-form-select :options="option_kunjungan" v-model="mData.register_antenatal.kunjungan"
                      size="sm"></b-form-select>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Cara Masuk <sup>1)</sup>
                    </template>
                    <b-form-select :options="option_cara_masuk" v-model="mData.register_antenatal.cara_masuk"
                      size="sm"></b-form-select>
                  </b-form-group>

                  <!-- jika field cara masuk = sendiri, maka field nama faskes tidak ada -->
                  <b-form-group v-if="mData.register_antenatal.cara_masuk != 'Sendiri'" label-cols-md="4">
                    <template v-slot:label>
                      Nama Faskes
                    </template>
                    <b-form-input type="text" v-model="mData.register_antenatal.nama_faskes"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Usia Kehamilan
                    </template>
                    <div style="width:100%;display: flex;">
                      <b-form-input type="number" v-model="mData.register_antenatal.usia_kehamilan"
                        class="custom-input-text"></b-form-input>
                      <div class="custom-box-satuan">
                        <h6>Minggu</h6>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Trisemester Ke -
                    </template>
                    <b-form-select :options="option_trisemester" v-model="mData.register_antenatal.trisemester"
                      size="sm"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <h6 class="custom-title">Pemeriksaan Ibu</h6>
                </b-col>
              </b-row>

              <b-row style="margin-top: 15px;">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Anamnesis
                    </template>
                    <b-form-input type="text" v-model="mData.pemeriksaan_ibu.anamnesis"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Tinggi Badan
                    </template>
                    <div style="width:100%;display: flex;">
                      <b-form-input type="number" class="custom-input-text"
                        v-model="mData.pemeriksaan_ibu.tinggi_badan"></b-form-input>
                      <div class="custom-box-satuan">
                        <h6 style="margin:0;font-weight: normal;font-size: 12px;">cm</h6>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Berat Badan
                    </template>
                    <div style="width:100%;display: flex;">
                      <b-form-input type="number" class="custom-input-text"
                        v-model="mData.pemeriksaan_ibu.berat_badan"></b-form-input>
                      <div class="custom-box-satuan">
                        <h6 style="margin:0;font-weight: normal;font-size: 12px;">kg</h6>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Tekanan Darah
                    </template>
                    <div style="width:100%;display: flex;">
                      <b-form-input type="text" class="custom-input-text"
                        v-model="mData.pemeriksaan_ibu.tekanan_darah"></b-form-input>
                      <div class="custom-box-satuan">
                        <h6 style="margin:0;font-weight: normal;font-size: 12px;">mmHg</h6>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Lila
                    </template>
                    <div style="width:100%;display: flex;">
                      <b-form-input type="number" class="custom-input-text" v-model="mData.pemeriksaan_ibu.lila"
                        @input="set_gizi(mData.pemeriksaan_ibu.lila)"></b-form-input>
                      <div class="custom-box-satuan">
                        <h6 style="margin:0;font-weight: normal;font-size: 12px;">cm</h6>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Status Gizi <sup>2)</sup>
                    </template>
                    <b-form-input type="text" v-model="mData.pemeriksaan_ibu.status_gizi" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Tinggi Fundus
                    </template>
                    <div style="width:100%;">
                      <b-form-radio-group id="" v-model="mData.pemeriksaan_ibu.satuan_fundus" class="mt-1">
                        <b-form-radio value="cm">
                          <span>cm</span>
                        </b-form-radio>
                        <b-form-radio value="Jari">
                          <span>Jari</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </div>
                    <div style="width:100%;display: flex;" class="mt-1">
                      <b-form-input style="width:50%" type="number"
                        v-model="mData.pemeriksaan_ibu.tinggi_fundus"></b-form-input>

                      <div class="custom-box-satuan">
                        <h6>{{ pemeriksaan_ibu.satuan_fundus }}</h6>
                      </div>
                      <b-form-input v-if="pemeriksaan_ibu.satuan_fundus == 'Jari'" type="text"
                        v-model="mData.pemeriksaan_ibu.ket_fundus"></b-form-input>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Refleks Pattela
                    </template>
                    <b-form-radio-group id="" v-model="mData.pemeriksaan_ibu.refleks_patela" class="mt-1">
                      <b-form-radio value="Positif">
                        <span>Positif (+)</span>
                      </b-form-radio>
                      <b-form-radio value="Negatif">
                        <span>Negatif (-)</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <h6 class="custom-title">Resiko</h6>
                </b-col>
              </b-row>

              <b-row style="margin-top: 15px;">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Resiko Terdeteksi Pertama Kali Oleh <sup>**</sup>
                    </template>
                    <b-form-select :options="option_deteksi_resiko" v-model="mData.risiko.resiko_pertama"
                      size="sm"></b-form-select>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Komplikasi <sup>**</sup>
                    </template>
                    <b-form-select :options="option_komplikasi" v-model="mData.risiko.komplikasi"
                      size="sm"></b-form-select>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Dirujuk Ke <sup>**</sup>
                    </template>
                    <b-form-select :options="option_rujuk" v-model="mData.risiko.dirujuk_ke" size="sm"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <h6 class="custom-title">Pelayanan</h6>
                </b-col>
              </b-row>

              <b-row style="margin-top: 15px;">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Status Imunisasi Td
                    </template>
                    <b-form-select :options="option_imunisasi" v-model="mData.pelayanan.status_imunisasi"
                      size="sm"></b-form-select>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Injeksi TD
                    </template>
                    <b-form-radio-group id="" v-model="mData.pelayanan.injeksi" class="mt-1">
                      <b-form-radio value="Ya">
                        <span>Ya</span>
                      </b-form-radio>
                      <b-form-radio value="Tidak">
                        <span>Tidak</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Catat di Buku KIA
                    </template>
                    <b-form-radio-group id="" v-model="mData.pelayanan.catat_dibuku" class="mt-1">
                      <b-form-radio value="Ya">
                        <span>Ya</span>
                      </b-form-radio>
                      <b-form-radio value="Tidak">
                        <span>Tidak</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Stiker P4K
                    </template>
                    <b-form-radio-group id="" v-model="mData.pelayanan.stiker_p4k" class="mt-1">
                      <b-form-radio value="Ya">
                        <span>Ya</span>
                      </b-form-radio>
                      <b-form-radio value="Tidak">
                        <span>Tidak</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4" class="mt-3">
                    <template v-slot:label>
                      FE (tab/botol)
                    </template>
                    <b-form-input type="text" v-model="mData.pelayanan.fe"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      PMT
                    </template>
                    <b-form-radio-group id="" v-model="mData.pelayanan.pmt" class="mt-1">
                      <b-form-radio value="Ya">
                        <span>Ya</span>
                      </b-form-radio>
                      <b-form-radio value="Tidak">
                        <span>Tidak</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <h6 class="custom-title">Pemeriksaan Bayi</h6>
                </b-col>
              </b-row>

              <b-row style="margin-top: 15px;">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      DJJ (x/menit)
                    </template>
                    <b-form-input type="text" v-model="mData.pemeriksaan_bayi.djj"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Kepala terhadap PAP <sup>3)</sup>
                    </template>
                    <b-form-radio-group id="" v-model="mData.pemeriksaan_bayi.kepala_pap" class="mt-1">
                      <b-form-radio value="Masuk">
                        <span>Masuk</span>
                      </b-form-radio>
                      <b-form-radio value="Belum Masuk">
                        <span>Belum Masuk</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      TBJ
                    </template>
                    <div style="width:100%;display: flex;">
                      <b-form-input type="number" v-model="mData.pemeriksaan_bayi.tbj"
                        class="custom-input-text"></b-form-input>
                      <div class="custom-box-satuan">
                        <h6>gram</h6>
                      </div>
                    </div>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Presentasi <sup>4)</sup>
                    </template>
                    <b-form-select :options="option_presentasi" v-model="mData.pemeriksaan_bayi.presentasi"
                      size="sm"></b-form-select>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Jumlah Janin<sup>5)</sup>
                    </template>
                    <b-form-radio-group id="" v-model="mData.pemeriksaan_bayi.jumlah_janin" class="mt-1">
                      <b-form-radio value="Tunggal">
                        <span>Tunggal</span>
                      </b-form-radio>
                      <b-form-radio value="Ganda">
                        <span>Ganda</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <!-- jika field jumlah janin = ganda -->
                  <div v-if="pemeriksaan_bayi.jumlah_janin == 'Ganda'">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        DJJ (x/menit)
                      </template>
                      <b-form-input type="text" v-model="mData.pemeriksaan_bayi.djj_ganda"></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Kepala terhadap PAP <sup>3)</sup>
                      </template>
                      <b-form-radio-group id="" v-model="mData.pemeriksaan_bayi.kepala_pap_ganda" class="mt-1">
                        <b-form-radio value="Masuk">
                          <span>Masuk</span>
                        </b-form-radio>
                        <b-form-radio value="Belum Masuk">
                          <span>Belum Masuk</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        TBJ
                      </template>
                      <div style="width:100%;display: flex;">
                        <b-form-input type="number" v-model="mData.pemeriksaan_bayi.tbj_ganda"
                          class="custom-input-text"></b-form-input>
                        <div class="custom-box-satuan">
                          <h6>gram</h6>
                        </div>
                      </div>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Presentasi <sup>4)</sup>
                      </template>
                      <b-form-select :options="option_presentasi" v-model="mData.pemeriksaan_bayi.presentasi_ganda"
                        size="sm"></b-form-select>
                    </b-form-group>
                  </div>

                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <h6 class="custom-title">Laboratorium</h6>
                </b-col>
              </b-row>

              <b-row style="margin-top: 15px;">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      HB
                    </template>
                    <b-form-input type="text" v-model="mData.laboratorium_antenatal.hb"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Anemia (+/-)
                    </template>
                    <b-form-radio-group id="" v-model="mData.laboratorium_antenatal.anemia" class="mt-1">
                      <b-form-radio value="Positif">
                        <span>Positif (+)</span>
                      </b-form-radio>
                      <b-form-radio value="Negatif">
                        <span>Negatif (-)</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Proteinuria
                    </template>
                    <b-form-input type="text" v-model="mData.laboratorium_antenatal.proteinuria"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Reduksi
                    </template>
                    <b-form-input type="text" v-model="mData.laboratorium_antenatal.reduksi"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Gula Darah
                    </template>
                    <b-form-input type="text" v-model="mData.laboratorium_antenatal.gula_darah"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Thalasemia (+/-)
                    </template>
                    <b-form-radio-group id="" v-model="mData.laboratorium_antenatal.thalasemia" class="mt-1">
                      <b-form-radio value="Positif">
                        <span>Positif (+)</span>
                      </b-form-radio>
                      <b-form-radio value="Negatif">
                        <span>Negatif (-)</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      Sifilis (+/-)
                    </template>
                    <b-form-radio-group id="" v-model="mData.laboratorium_antenatal.sifilis" class="mt-1">
                      <b-form-radio value="Positif">
                        <span>Positif (+)</span>
                      </b-form-radio>
                      <b-form-radio value="Negatif">
                        <span>Negatif (-)</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      HBsAg (+/-)
                    </template>
                    <b-form-radio-group id="" v-model="mData.laboratorium_antenatal.hbsag" class="mt-1">
                      <b-form-radio value="Positif">
                        <span>Positif (+)</span>
                      </b-form-radio>
                      <b-form-radio value="Negatif">
                        <span>Negatif (-)</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label-cols-md="4">
                    <template v-slot:label>
                      HIV (+/-)
                    </template>
                    <b-form-radio-group id="" v-model="mData.laboratorium_antenatal.hiv" class="mt-1">
                      <b-form-radio value="Positif">
                        <span>Positif (+)</span>
                      </b-form-radio>
                      <b-form-radio value="Negatif">
                        <span>Negatif (-)</span>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>

      <b-row class="random-card">
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <b-card class="card-integrasi-prog">
            <h6 class="custom-title">Integrasi Program</h6>
            <b-card-group columns class="card-integrasi-prog-sub">
              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Pencegahan Penularan HIV dari Ibu ke Anak (PPIA)</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Datang dengan HIV (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.hiv" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Persalinan Pervaginam
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.pervaginam" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Persalinan Perapdoinam (SC)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.perapdoinam" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Ditawarkan Tes
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.ditawarkan_tes" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Dilakukan Tes
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.dilakukan_tes" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Hasil Text HIV (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.hasil_text_hiv" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Mendapatkan ART
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.mendapatkan_art" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        VCT (PICT)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.vct" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Periksa Darah
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.periksa_darah" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Serologi (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ppia.serologi" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        ARV Profilaksis
                      </template>
                      <b-form-select :options="option_arv" v-model="mData.pencegahan_ppia.arv_profilaksis"
                        size="sm"></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Kecacingan Dalam Kehamilan</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diperiksa Ankylostoma
                      </template>
                      <b-form-input type="text" v-model="mData.kecacingan_kehamilan.ankylostoma"></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Hasil Tes (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.kecacingan_kehamilan.hasil_tes" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diobati
                      </template>
                      <b-form-radio-group id="" v-model="mData.kecacingan_kehamilan.diobati" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Pencegahan Malaria Dalam Kehamilan</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diberikan Kelambu Berinsteksida
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_malaria.diberikan_kelambu" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <h6 style="font-size:12px;color:#d52f65">Darah malaria diperiksa ibu hamil</h6>
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        RDT
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_malaria.rdt_darah" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Mikroskopis
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_malaria.mikroskopis_darah" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <h6 style="font-size:12px;color:#d52f65">Ibu hamil malaria</h6>
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        RDT
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_malaria.rdt_ibu" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Mikroskopis
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_malaria.mikoskopis_ibu" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Hasil Tes Darah Malaria (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_malaria.hasil_tes" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Obat KINA / ACT<sup>***</sup>
                      </template>
                      <b-form-select :options="option_obat_kina" v-model="mData.pencegahan_malaria.obat_kina"
                        size="sm"></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Pencegahan IMS Dalam Kehamilan</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diperiksa IMS
                      </template>
                      <b-form-input type="text" v-model="mData.pencegahan_ims.diperiksa_ims"></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Hasil test (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_ims.hasil_test" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diterapi
                      </template>
                      <b-form-input type="text" v-model="mData.pencegahan_ims.diterapi"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Keadaan</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Tiba (H/M)
                      </template>
                      <b-form-select :options="option_keadaan_tiba" v-model="mData.keadaan_ibu.tiba"
                        size="sm"></b-form-select>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Pulang (H/M)
                      </template>
                      <b-form-select :options="option_keadaan_pulang" v-model="mData.keadaan_ibu.pulang"
                        size="sm"></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">TB Dalam Kehamilan</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diperiksa dahak
                      </template>
                      <b-form-radio-group id="" v-model="mData.tb_kehamilan.diperiksa_dahak" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        TBC (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.tb_kehamilan.tbc" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Obat<sup>***</sup>
                      </template>
                      <b-form-select :options="option_obat_imunisasi" v-model="mData.tb_kehamilan.obat"
                        size="sm"></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Pencegahan Hepatitis Dalam Kehamilan</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diperiksa Hepatitis
                      </template>
                      <b-form-input type="text" v-model="mData.pencegahan_hepatitis.diperiksa_hepatitis"></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Hasil Tes (+/-)
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_hepatitis.hasil_tes" class="mt-1">
                        <b-form-radio value="Positif">
                          <span>Positif (+)</span>
                        </b-form-radio>
                        <b-form-radio value="Negatif">
                          <span>Negatif (-)</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Diobati
                      </template>
                      <b-form-radio-group id="" v-model="mData.pencegahan_hepatitis.diobati" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Konseling dan Kelas Ibu Hamil</h6>
                  </b-col>
                </b-row>

                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Konseling
                      </template>
                      <b-form-radio-group id="" v-model="mData.konseling_ibu_hamil.konseling" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Materi
                      </template>
                      <b-form-textarea rows="3" v-model="mData.konseling_ibu_hamil.materi"></b-form-textarea>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Rekomendasi Berdasarkan Hasil Pemeriksaan dan Laboratorium
                      </template>
                      <b-form-textarea rows="5" v-model="mData.konseling_ibu_hamil.rekomendasi"></b-form-textarea>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Mengikuti Kelas Ibu Hamil
                      </template>
                      <b-form-radio-group id="" v-model="mData.konseling_ibu_hamil.mengikuti_kelas" class="mt-1">
                        <b-form-radio value="Ya">
                          <span>Ya</span>
                        </b-form-radio>
                        <b-form-radio value="Tidak">
                          <span>Tidak</span>
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Jika Ya, Sejak Usia Kehamilan (Minggu)
                      </template>
                      <b-form-input type="number" v-model="mData.konseling_ibu_hamil.usia_kehamilan"></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Frekuensi
                      </template>
                      <b-form-input type="text" v-model="mData.konseling_ibu_hamil.frekuensi"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>

              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 style="font-size:14px;font-weight:600">Keterangan</h6>
                    <b-form-textarea rows="5" v-model="mData.keterangan"></b-form-textarea>
                  </b-col>
                </b-row>
              </b-card>

            </b-card-group>
            <b-row style="margin-top: 15px;">
              <b-col cols="12" sm="12" md="12" lg="12">
                <div style="width:100%;display: flex;justify-content: flex-end;">
                  <b-button variant="light" class="mr-2">Reset</b-button>
                  <b-button v-if="update" @click="updateData()" variant="warning">Update</b-button>
                  <b-button v-else @click="simpanData()" variant="success">Simpan</b-button>
                </div>
              </b-col>
            </b-row>
          </b-card>

        </b-col>
      </b-row>
    </b-card>

  </div>
</template>
<script>
export default {
  components: {
  },
  // props: [
  // 'dataAnamnesa',
  // 'kunjungan',
  // ],
  // register_antenatal
  // pemeriksaan_bayi
  // pelayanan
  // risiko
  // pemeriksaan_ibu
  // laboratorium_antenatal
  // pencegahan_ppia
  // kecacingan_kehamilan
  // pencegahan_malaria
  // pencegahan_ims
  // keadaan_ibu
  // tb_kehamilan
  // pencegahan_hepatitis
  // konseling_ibu_hamil
  watch: {
    mData: {
      deep: true,
      intermediate: true,
      handler(to, from) {
        console.log('jancokkkkkkkk')
      }
    },
  },
  props: {
    mData: {
      type: Object,
      required: true,
      default() {
        return {
          register_antenatal: {},
          pemeriksaan_bayi: {},
          pelayanan: {},
          risiko: {},
          pemeriksaan_ibu: {},
          laboratorium_antenatal: {},
          pencegahan_ppia: {},
          kecacingan_kehamilan: {},
          pencegahan_malaria: {},
          pencegahan_ims: {},
          keadaan_ibu: {},
          tb_kehamilan: {},
          pencegahan_hepatitis: {},
          konseling_ibu_hamil: {},
        }
      }
    },
    assesmen: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      option_kunjungan: [
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
        { value: "6", text: "6" },
        { value: "7", text: "7" },
        { value: "8", text: "8" },
        { value: "9", text: "9" },
        { value: "10", text: "10" },
        { value: "11", text: "11" },
        { value: "12", text: "12" },
        { value: "13", text: "13" },
        { value: "14", text: "14" },
        { value: "15", text: "15" },
      ],
      option_cara_masuk: [
        { value: "Sendiri", text: "Sendiri" },
        { value: "Dokter", text: "Dokter" },
        { value: "Bidan", text: "Bidan" },
        { value: "Mantri", text: "Mantri" },
        { value: "Perawat", text: "Perawat" },
        { value: "Klinik", text: "Klinik" },
        { value: "Puskesmas", text: "Puskesmas" },
        { value: "Lainnya", text: "Lainnya" },
        { value: "Rujuk Balik", text: "Rujuk Balik" },
        { value: "Klinik Rinja", text: "Klinik Rinja" },
        { value: "UKS", text: "UKS" },
        { value: "Kelp Sebaya", text: "Kelp Sebaya" },
      ],
      option_trisemester: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
      ],
      option_deteksi_resiko: [
        { value: "Pasien", text: "Pasien" },
        { value: "Keluarga", text: "Keluarga" },
        { value: "Masyarakat", text: "Masyarakat" },
        { value: "Dukun", text: "Dukun" },
        { value: "Kader", text: "Kader" },
        { value: "Bidan", text: "Bidan" },
        { value: "Perawat", text: "Perawat" },
        { value: "Dokter", text: "Dokter" },
        { value: "Sp. OG", text: "Sp. OG" },
      ],
      option_komplikasi: [
        { value: "Hipertensi Dalam Kehamilan", text: "Hipertensi Dalam Kehamilan" },
        { value: "Abortus", text: "Abortus" },
        { value: "Pendarahan", text: "Pendarahan" },
        { value: "Infeksi", text: "Infeksi" },
        { value: "Preeklampsia", text: "Preeklampsia" },
        { value: "Ketuban Pecah Dini", text: "Ketuban Pecah Dini" },
        { value: "Anemia", text: "Anemia" },
        { value: "Hipermesis Gravidarum", text: "Hipermesis Gravidarum" },
        { value: "Plasenta Previa", text: "Plasenta Previa" },
        { value: "Diabetes Gestasional", text: "Diabetes Gestasional" },
        { value: "Lainnya", text: "Lainnya" },
      ],
      option_rujuk: [
        { value: "Puskesmas", text: "Puskesmas" },
        { value: "RB", text: "RB" },
        { value: "RSIA", text: "RSIA" },
        { value: "RSUD", text: "RSUD" },
        { value: "RSU", text: "RSU" },
        { value: "Lainnya", text: "Lainnya" },
      ],
      option_imunisasi: [
        { value: "T0", text: "T0" },
        { value: "T1", text: "T1" },
        { value: "T2", text: "T2" },
        { value: "T3", text: "T3" },
        { value: "T4", text: "T4" },
        { value: "T5", text: "T5" },
      ],
      option_presentasi: [
        { value: "Kepala", text: "Kepala" },
        { value: "Bokong/sungsang", text: "Bokong/sungsang" },
        { value: "Letak lintang/oblique", text: "Letak lintang/oblique" },
        { value: "Ballotement", text: "Ballotement" },
      ],
      option_presentasi_ganda: [],
      option_arv: [
        { value: "Zidovudin", text: "Zidovudin" },
        { value: "Nevirapin", text: "Nevirapin" },
        { value: "Lamivudin", text: "Lamivudin" },
      ],
      option_obat_kina: [
        { value: "Artesunat", text: "Artesunat" },
        { value: "Amoksisilin", text: "Amoksisilin" },
        { value: "Kina", text: "Kina" },
      ],
      option_keadaan_tiba: [
        { value: "Hidup", text: "Hidup" },
        { value: "Mati", text: "Mati" },
      ],
      option_keadaan_pulang: [
        { value: "Hidup", text: "Hidup" },
        { value: "Mati", text: "Mati" },
      ],
      option_obat_imunisasi: [
        { value: "Rifampisin", text: "Rifampisin" },
        { value: "INH", text: "INH" },
        { value: "Pyrazinamid", text: "Pyrazinamid" },
        { value: "Ethambutol", text: "Ethambutol" },
      ],
      register_antenatal: {
        tanggal_register: null,
        nama_pasien: null,
        kunjungan: null,
        cara_masuk: null,
        nama_faskes: null,
        usia_kehamilan: null,
        trisemester: null,
      },
      pemeriksaan_bayi: {
        djj: null,
        kepala_pap: null,
        tbj: null,
        presentasi: null,
        jumlah_janin: null,
        djj_ganda: null,
        kepala_pap_ganda: null,
        tbj_ganda: null,
        presentasi_ganda: null
      },
      pelayanan: {
        status_imunisasi: null,
        injeksi: null,
        catat_dibuku: null,
        stiker_p4k: null,
        fe: null,
        pmt: null,
      },
      risiko: {
        resiko_pertama: null,
        komplikasi: null,
        dirujuk_ke: null,
      },
      pemeriksaan_ibu: {
        anamnesis: null,
        tinggi_badan: null,
        berat_badan: null,
        tekanan_darah: null,
        lila: null,
        status_gizi: null,
        tinggi_fundus: null,
        satuan_fundus: 'cm',
        ket_fundus: null,
        refleks_patela: null,
      },
      laboratorium_antenatal: {
        hb: null,
        anemia: null,
        proteinuria: null,
        reduksi: null,
        gula_darah: null,
        thalasemia: null,
        sifilis: null,
        hbsag: null,
        hiv: null,
      },
      pencegahan_ppia: {
        hiv: null,
        pervaginam: null,
        perapdoinam: null,
        ditawarkan_tes: null,
        dilakukan_tes: null,
        hasil_text_hiv: null,
        mendapatkan_art: null,
        vct: null,
        periksa_darah: null,
        serologi: null,
        arv_profilaksis: null,
      },
      kecacingan_kehamilan: {
        ankylostoma: null,
        hasil_tes: null,
        diobati: null,
      },
      pencegahan_malaria: {
        diberikan_kelambu: null,
        rdt_darah: null,
        mikroskopis_darah: null,
        rdt_ibu: null,
        mikoskopis_ibu: null,
        hasil_tes: null,
        obat_kina: null,
      },
      pencegahan_ims: {
        diperiksa_ims: null,
        hasil_test: null,
        diterapi: null,
      },
      keadaan_ibu: {
        tiba: null,
        pulang: null,
      },
      tb_kehamilan: {
        diperiksa_dahak: null,
        tbc: null,
      },
      pencegahan_hepatitis: {
        diperiksa_hepatitis: null,
        hasil_tes: null,
        diobati: null
      },
      konseling_ibu_hamil: {
        konseling: null,
        materi: null,
        rekomendasi: null,
        mengikuti_kelas: null,
        usia_kehamilan: null,
        frekuensi: null,
      },
      keterangan: "",
      update: false,
    }
  },
  computed: {
    usia_kehamilan() {
      return this.$store.state.usia_kehamilan
    },
    kia_id() {
      return this.$store.state.kia_id
    },
  },
  watch: {
    kia_id(newVal, oldVal) {
      if (newVal != oldVal) {
        if (newVal) {
          this.getData()
        }
      }
    },
    usia_kehamilan(newVal, oldVal) {
      // console.log(newVal, oldVal, 'awjfiocawhifhcawiofhcuawigfuiawshfcuashfuka');
      if (newVal != oldVal) {
        if (!this.register_antenatal.usia_kehamilan) {
          this.register_antenatal.usia_kehamilan = this.usia_kehamilan
          // console.log(this.register_antenatal.usia_kehamilan, 'usiaaaaaaaaaaaaaa');
          if (this.register_antenatal.usia_kehamilan <= 12) {
            // console.log('masuk 1');
            this.register_antenatal.trisemester = 1
          } else if (this.register_antenatal.usia_kehamilan <= 27) {
            // console.log('masuk 2');
            this.register_antenatal.trisemester = 2
          } else if (this.register_antenatal.usia_kehamilan <= 40) {
            // console.log('masuk 3');
            this.register_antenatal.trisemester = 3
          }
        }
      }
    },
    kunjungan(newVal, oldVal) {
      if (newVal != oldVal) {
        // console.log(this.dataAnamnesa, 'agduawgbgukcfagsukchbasikkhcdawwgbduka');
        // console.log(this.kunjungan, 'afguiashfasshfliashilas');
        this.register_antenatal.nama_pasien = this.kunjungan.nama_lengkap
        // this.getData()
        // if(!this.register_antenatal.usia_kehamilan){
        //   this.register_antenatal.usia_kehamilan = this.usia_kehamilan
        //   // console.log(this.register_antenatal.usia_kehamilan, 'usiaaaaaaaaaaaaaa');
        //   if(this.register_antenatal.usia_kehamilan <= 12){
        //     // console.log('masuk 1');
        //     this.register_antenatal.trisemester = 1
        //   }else if(this.register_antenatal.usia_kehamilan <= 27){
        //     // console.log('masuk 2');
        //     this.register_antenatal.trisemester = 2
        //   }else if(this.register_antenatal.usia_kehamilan <= 40){
        //     // console.log('masuk 3');
        //     this.register_antenatal.trisemester = 3
        //   }
        // }
      }
    },
    // assesmen: {
    //   handler(data) {
    //     const vm = this
    //     console.log(data, 'brrrrrrrrrrrrrrrrrrrrrrrrr');
    //     vm.mData.pemeriksaan_ibu.tinggi_badan = data.tinggi_badan
    //     vm.mData.pemeriksaan_ibu.berat_badan = data.berat_badan
    //     vm.mData.pemeriksaan_ibu.tekanan_darah = `${data.sistole}/${data.diastole}`
    //     vm.mData.pemeriksaan_ibu.anamnesis = data.keluhan_utama
    //   },
    //   deep: true
    // },
  },
  methods: {
    set_gizi(x) {
      let vm = this
      if (x <= 23.5) {
        vm.mData.pemeriksaan_ibu.status_gizi = 'KEK'
      } else if (x > 23.5) {
        vm.mData.pemeriksaan_ibu.status_gizi = 'Normal'
      }
    },
    async getData() {
      let vm = this
      try {
        if (vm.$store.state.kia_id != null) {
          let detail = await vm.$axios.post("/pemeriksaan_antenatal/list", {
            kia_id: vm.$store.state.kia_id
          })
          // console.log(detail, 'ini anenatal');
          // console.log(this.usia_kehamilan, 'ini usiaa kehamilan ante');
          if (detail.data.status == 200 && detail.data.data.length) {
            let data = detail.data.data[0]
            vm.$store.commit('set_antenatal', data.pemeriksaan_antenatal_id)
            vm.$store.commit('set_tribulan', data.register_antenatal.trisemester)
            vm.$emit('disabled', false)
            vm.$emit('register_antenatal', data.register_antenatal)
            vm.update = true
            if (data.keadaan_ibu) {
              vm.keadaan_ibu = data.keadaan_ibu
            }
            if (data.kecacingan_kehamilan) {
              vm.kecacingan_kehamilan = data.kecacingan_kehamilan
            }
            if (data.konseling_ibu_hamil) {
              vm.konseling_ibu_hamil = data.konseling_ibu_hamil
            }
            if (data.laboratorium_antenatal) {
              vm.laboratorium_antenatal = data.laboratorium_antenatal
            }
            if (data.pelayan) {
              vm.pelayan = data.pelayan
            }
            if (data.pemeriksaan_bayi) {
              vm.pemeriksaan_bayi = data.pemeriksaan_bayi
            }
            if (data.register_antenatal) {
              vm.register_antenatal = data.register_antenatal
            }
            if (data.pemeriksaan_ibu) {
              vm.mData.pemeriksaan_ibu = data.pemeriksaan_ibu
            }
            if (data.pencegahan_hepatitis) {
              vm.pencegahan_hepatitis = data.pencegahan_hepatitis
            }
            if (data.pencegahan_ims) {
              vm.pencegahan_ims = data.pencegahan_ims
            }
            if (data.pencegahan_malaria) {
              vm.pencegahan_malaria = data.pencegahan_malaria
            }
            if (data.pencegahan_ppia) {
              vm.pencegahan_ppia = data.pencegahan_ppia
            }
            if (data.risiko) {
              vm.risiko = data.risiko
            }
            if (data.tb_kehamilan) {
              vm.tb_kehamilan = data.tb_kehamilan
            }
            if (data.keterangan) {
              vm.keterangan = data.keterangan
            }
          }
        }

      } catch (error) {
        console.log(error)
      }
    },
    simpanData() {
      console.log('simpanData')
      this.$parent.$parent.$parent.updateAssesmenTambahan();
    },
    // simpanData(){
    //   let vm = this
    //   let datanya = {}
    //   datanya.register_antenatal = vm.register_antenatal
    //   datanya.pemeriksaan_bayi = vm.pemeriksaan_bayi
    //   datanya.pelayanan =  vm.pelayanan
    //   datanya.risiko = vm.risiko
    //   datanya.pemeriksaan_ibu = vm.mData.pemeriksaan_ibu
    //   datanya.laboratorium_antenatal = vm.laboratorium_antenatal
    //   datanya.pencegahan_ppia = vm.pencegahan_ppia
    //   datanya.kecacingan_kehamilan = vm.kecacingan_kehamilan
    //   datanya.pencegahan_malaria =  vm.pencegahan_malaria
    //   datanya.pencegahan_ims = vm.pencegahan_ims
    //   datanya.keadaan_ibu = vm.keadaan_ibu
    //   datanya.tb_kehamilan = vm.tb_kehamilan
    //   datanya.pencegahan_hepatitis = vm.pencegahan_hepatitis
    //   datanya.konseling_ibu_hamil = vm.konseling_ibu_hamil
    //   datanya.keterangan = vm.keterangan
    //   datanya.kia_id = vm.$store.state.kia_id
    //   datanya.rm_id = vm.kunjungan.rm_id
    //   // console.log(datanya, 'ini final data');
    //   vm.$axios.post("/pemeriksaan_antenatal/register", datanya)
    //   .then((res) => {
    //     // console.log(res, 'ini responya ui');
    //     if(res.data.status == 200 && res.data.message == "sukses"){
    //       vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
    //       vm.$store.commit('set_antenatal', res.data.data.id)
    //       vm.$store.commit('set_tribulan', datanya.register_antenatal.trisemester)
    //       vm.$emit('disabled', false)
    //       vm.$emit('register_antenatal', res.data.data.register_antenatal)
    //       vm.getData()
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // },
    updateData() {
      let vm = this
      let datanya = {}
      datanya.register_antenatal = vm.register_antenatal
      datanya.pemeriksaan_bayi = vm.pemeriksaan_bayi
      datanya.pelayanan = vm.pelayanan
      datanya.risiko = vm.risiko
      datanya.pemeriksaan_ibu = vm.mData.pemeriksaan_ibu
      datanya.laboratorium_antenatal = vm.laboratorium_antenatal
      datanya.pencegahan_ppia = vm.pencegahan_ppia
      datanya.kecacingan_kehamilan = vm.kecacingan_kehamilan
      datanya.pencegahan_malaria = vm.pencegahan_malaria
      datanya.pencegahan_ims = vm.pencegahan_ims
      datanya.keadaan_ibu = vm.keadaan_ibu
      datanya.tb_kehamilan = vm.tb_kehamilan
      datanya.pencegahan_hepatitis = vm.pencegahan_hepatitis
      datanya.konseling_ibu_hamil = vm.konseling_ibu_hamil
      datanya.keterangan = vm.keterangan
      datanya.kia_id = vm.$store.state.kia_id
      datanya.rm_id = vm.kunjungan.rm_id
      datanya.id = vm.$store.state.antenatal_id
      console.log(datanya, 'ini final data');
      vm.$axios.post("/pemeriksaan_antenatal/register", datanya)
        .then((res) => {
          console.log(res, 'ini responya ui');
          if (res.data.status == 200 && res.data.message == "sukses") {
            vm.$store.commit('set_alert', { variant: 'success', msg: "BERHASIL UPDATE DATA", showing: true })
            vm.getData()
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
}
</script>

<style scoped>
.random-card .card {
  background-color: #FAFAFA;
  border: 1px solid #D3D3D3
}

.card-integrasi-prog .card-body {
  padding: 10px;
}

.card-integrasi-prog-sub .card-body {
  padding: 1.25rem;
}
</style>