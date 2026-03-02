<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Form Objective <i class="mr-2"></i>
          <small class="">{{ dataRegistrasi.nama_lengkap }}</small>
        </h3>
      </div>
      <div class="card-toolbar">
        <!-- <button class="btn btn-light-primary mr-2" @click="$parent.doValidasi()" v-if="!objectDataAssesmen.is_validasi">
          <i class="ki ki-check icon-sm"></i>
          Validasi Assesmen
        </button> -->
        <div class="btn-group">
          <button type="button" class="btn btn-primary" @click="$parent.updateAssesmen()" :disabled="objectDataAssesmen.is_validasi">
            <i class="ri-save-line"></i>
            Simpan
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <p class="font-weight-bolder">Tanda-Tanda Vital</p>
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.keadaan_umum"
                    :key="'keadaan_umum'"
                    :id="'keadaan_umum'"
                    :item="{
                      label: 'Keadaan Umum',
                      id: 'keadaan_umum',
                      data: 'keadaan_umum',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.keadaan_umum,
                      pointer: {
                        label: 'label',
                        code: 'code',
                        display: ['label'],
                        list: [
                          { label: 'Baik', code: 'baik' },
                          { label: 'Tampak Sakit Ringan', code: 'tampak sakit ringan' },
                          { label: 'Tampak Sakit Sedang', code: 'tampak sakit sedang' },
                          { label: 'Tampak Sakit Berat', code: 'tampak sakit berat' },
                        ],
                      },
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.keadaan_umum" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.sistolik"
                    :item="{
                      label: 'Sistolik',
                      id: 'sistolik',
                      data: 'sistolik',
                      value: mData.sistolik,
                      type: 'number',
                      suffix: 'mmhg',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.sistolik" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.diastolik"
                    :item="{
                      label: 'Diastolik',
                      id: 'diastolik',
                      data: 'diastolik',
                      value: mData.diastolik,
                      type: 'number',
                      suffix: 'mmhg',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.diastolik" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.nadi"
                    :item="{
                      label: 'Nadi',
                      id: 'nadi',
                      data: 'nadi',
                      value: mData.nadi,
                      type: 'number',
                      suffix: 'x/menit',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.nadi" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.pernafasan"
                    :item="{
                      label: 'Pernafasan',
                      id: 'pernafasan',
                      data: 'pernafasan',
                      value: mData.pernafasan,
                      type: 'number',
                      suffix: 'x/menit',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.pernafasan" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.suhu"
                    :item="{
                      label: 'Suhu',
                      id: 'suhu',
                      data: 'suhu',
                      value: mData.suhu,
                      type: 'number',
                      suffix: '&deg;C',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.suhu" />
                </div>
                <div class="col-12">
                  <!-- <s-input v-model="mData.skrining_nyeri" :key="'skrining_nyeri'" :id="'skrining_nyeri'" :item="{
                    label: 'Skrining Nyeri',
                    id: 'skrining_nyeri',
                    data: 'skrining_nyeri',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: mData.skrining_nyeri,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Ada', code: 'Ada' },
                        { label: 'Tidak Ada', code: 'Tidak Ada' },
                      ]
                    },
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.skrining_nyeri" /> -->

                  <!-- Scale Pain - Skala Nyeri -->
                  <div class="row bordered p-2" style="border: solid 1px #c8c8c8">
                    <div class="col-12 bg-light-warning text-center mb-2">
                      <p class="font-weight-bolder mt-2 mb-2">Skala Nyeri</p>
                    </div>
                    <div class="col-12 d-flex align-items-center justify-content-center mb-2">
                      <img :src="'./static/img/icon/' + (mData.skrining_nyeri_pain_img || 'pain1') + '.png'" class="" style="width: 75px !important" alt="" />
                    </div>
                    <div class="col-12">
                      <img :src="'./static/img/icon/ScalePain.png'" class="w-100" alt="" />
                    </div>
                    <div class="col-12">
                      <vue-slider v-bind="config_slider_skrining_nyeri" v-model="mData.skrining_nyeri_pain" :disabled="objectDataAssesmen.is_validasi" />
                    </div>
                  </div>
                </div>
                <div class="col-12" v-if="mData.skrining_nyeri === 'Ada'">
                  <s-input
                    v-model="mData.keterangan_skrining_nyeri"
                    :item="{
                      label: 'Keterangan Skrining',
                      id: 'keterangan_skrining_nyeri',
                      data: 'keterangan_skrining_nyeri',
                      value: mData.keterangan_skrining_nyeri,
                      type: 'textarea',
                      class: '',
                      validation: [],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.keterangan_skrining_nyeri" />
                </div>
                <div class="col-12">
                  <!-- <s-input v-model="mData.pemeriksaan_fisik" :item="{
                    label: 'Pemeriksaan Fisik',
                    id: 'pemeriksaan_fisik',
                    data: 'pemeriksaan_fisik',
                    value: mData.pemeriksaan_fisik,
                    type: 'textarea',
                    class: '',
                    validation: ['required'],
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.pemeriksaan_fisik" /> -->

                  <!-- START DARI COPY SIMPUS -->
                  <div class="col-12 mt-3">
                    <p class="font-weight-bolder">Pemeriksaan Fisik</p>
                  </div>

                  <div class="row">
                    <b-col cols="6">
                      <div class="">
                        <div class="mt-2">
                          <b-form-checkbox id="kulit" :disabled="is_validasi" v-model="mData.pemeriksaan_kulit.status" name="kulit" :value="true" :unchecked-value="false">Pemeriksaan kulit</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_kulit.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kulit.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kulit.palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="kuku" :disabled="is_validasi" v-model="mData.pemeriksaan_kuku.status" name="kuku" :value="true" :unchecked-value="false">Pemeriksaan kuku</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_kuku.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kuku.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kuku.palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="kepala" :disabled="is_validasi" v-model="mData.pemeriksaan_kepala.status" name="kepala" :value="true" :unchecked-value="false">Pemeriksaan kepala</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_kepala.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kepala.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kepala.palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="wajah" :disabled="is_validasi" v-model="mData.pemeriksaan_wajah.status" name="wajah" :value="true" :unchecked-value="false">Pemeriksaan wajah</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_wajah.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_wajah.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_wajah.palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="mata" :disabled="is_validasi" v-model="mData.pemeriksaan_mata.status" name="mata" :value="true" :unchecked-value="false">Pemeriksaan mata</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_mata.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_mata.inspeksi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="telinga" :disabled="is_validasi" v-model="mData.pemeriksaan_telinga.status" name="telinga" :value="true" :unchecked-value="false">Pemeriksaan telinga</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_telinga.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_telinga.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_telinga.palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="hidung_sinus" :disabled="is_validasi" v-model="mData.pemeriksaan_hidung_dan_sinus.status" name="hidung_sinus" :value="true" :unchecked-value="false">Pemeriksaan hidung dan sinus</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_hidung_dan_sinus.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_hidung_dan_sinus.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_hidung_dan_sinus.palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="mulut_bibir" :disabled="is_validasi" v-model="mData.pemeriksaan_mulut_dan_bibir.status" name="mulut_bibir" :value="true" :unchecked-value="false">Pemeriksaan mulut dan bibir</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_mulut_dan_bibir.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_mulut_dan_bibir.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_mulut_dan_bibir.palpasi"></b-form-textarea>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="6">
                      <div class="">
                        <div class="mt-2">
                          <b-form-checkbox id="leher" :disabled="is_validasi" v-model="mData.pemeriksaan_leher.status" name="leher" :value="true" :unchecked-value="false">Pemeriksaan leher</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_leher.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi leher</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_leher.inspeksi"></b-form-textarea>
                            <label for="inspeksi_aukultasi" class="mt-1 mb-0 p-0">inspeksi dan auskultasi arteri karotis</label>
                            <b-form-textarea id="inspeksi_aukultasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_leher.inspeksi_aukultasi"></b-form-textarea>
                            <label for="inspeksi_palpas" class="mt-1 mb-0 p-0">inspeksi dan palpasi kelenjer tiroid</label>
                            <b-form-textarea id="inspeksi_palpas" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_leher.inspeksi_palpas"></b-form-textarea>
                            <label for="akultulasi" class="mt-1 mb-0 p-0">auskultasi (bising pembuluh darah)</label>
                            <b-form-textarea id="akultulasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_leher.akultulasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="dada_punggung" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.status" name="dada_punggung" :value="true" :unchecked-value="false">Pemeriksaan dada punggung</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_dada_dan_punggung.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.palpasi"></b-form-textarea>
                            <label for="perkusi" class="mt-1 mb-0 p-0">perkusi</label>
                            <b-form-textarea id="perkusi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.perkusi"></b-form-textarea>
                            <label for="auskultasi" class="mt-1 mb-0 p-0">auskultasi</label>
                            <b-form-textarea id="auskultasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.auskultasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="kardiovaskuler" :disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.status" name="kardiovaskuler" :value="true" :unchecked-value="false">Pemeriksaan kardiovaskuler</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_kardiovaskuler.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.palpasi"></b-form-textarea>
                            <label for="perkusi" class="mt-1 mb-0 p-0">perkusi</label>
                            <b-form-textarea id="perkusi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.perkusi"></b-form-textarea>
                            <label for="auskultasi" class="mt-1 mb-0 p-0">auskultasi</label>
                            <b-form-textarea id="auskultasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.auskultasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="dada_aksila" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.status" name="dada_aksila" :value="true" :unchecked-value="false">Pemeriksaan dada aksila</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_dada_dan_aksila.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi dada</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi dada</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.palpasi"></b-form-textarea>
                            <label for="inspeksi_palpasi" class="mt-1 mb-0 p-0">inspeksi dan palpasi aksila</label>
                            <b-form-textarea id="inspeksi_palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.inspeksi_palpasi"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="abdomen_perut" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.status" name="abdomen_perut" :value="true" :unchecked-value="false">Pemeriksaan abdomen perut</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_abdomen_perut.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.inspeksi"></b-form-textarea>
                            <label for="auskultasi" class="mt-1 mb-0 p-0">auskultasi</label>
                            <b-form-textarea id="auskultasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.auskultasi"></b-form-textarea>
                            <label for="perkusi_semua_kuadran" class="mt-1 mb-0 p-0">perkusi semua kuadran</label>
                            <b-form-textarea id="perkusi_semua_kuadran" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_semua_kuadran"></b-form-textarea>
                            <label for="perkusi_hepar" class="mt-1 mb-0 p-0">perkusi hepar</label>
                            <b-form-textarea id="perkusi_hepar" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_hepar"></b-form-textarea>
                            <label for="perkusi_limfa" class="mt-1 mb-0 p-0">perkusi limfa</label>
                            <b-form-textarea id="perkusi_limfa" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_limfa"></b-form-textarea>
                            <label for="perkusi_ginjal" class="mt-1 mb-0 p-0">perkusi ginjal</label>
                            <b-form-textarea id="perkusi_ginjal" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_ginjal"></b-form-textarea>
                            <label for="palpasi_semua_kuadran" class="mt-1 mb-0 p-0">palpasi semua kuadran</label>
                            <b-form-textarea id="palpasi_semua_kuadran" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.palpasi_semua_kuadran"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="ekstermitas_atas" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.status" name="ekstermitas_atas" :value="true" :unchecked-value="false">Pemeriksaan ekstermitas atas</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_ekstermitas_atas.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi struktur muskuloskletal</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.palpasi"></b-form-textarea>
                            <label for="tes_reflex" class="mt-1 mb-0 p-0">tes reflex</label>
                            <b-form-textarea id="tes_reflex" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.tes_reflex"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2">
                          <b-form-checkbox id="ekstermitas_bawah" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.status" name="ekstermitas_bawah" :value="true" :unchecked-value="false">Pemeriksaan ekstermitas bawah</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_ekstermitas_bawah.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi struktur muskuloskletal</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.inspeksi"></b-form-textarea>
                            <label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
                            <b-form-textarea id="palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.palpasi"></b-form-textarea>
                            <label for="tes_reflex" class="mt-1 mb-0 p-0">tes reflex</label>
                            <b-form-textarea id="tes_reflex" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.tes_reflex"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2" v-if="dataRegistrasi.jenis_kelamin == 'L'">
                          <b-form-checkbox id="genitalia_pria" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.status" name="genitalia_pria" :value="true" :unchecked-value="false">Pemeriksaan genitalia pria</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_genitalia_pria.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi dan palpasi penis</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.inspeksi"></b-form-textarea>
                            <label for="inspeksi_palpasi" class="mt-1 mb-0 p-0">inspeksi dan palpasi skrotum</label>
                            <b-form-textarea id="inspeksi_palpasi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.inspeksi_palpasi"></b-form-textarea>
                            <label for="pemeriksaan_anus_rectum" class="mt-1 mb-0 p-0">pemeriksaan anus dan rectum</label>
                            <b-form-textarea id="pemeriksaan_anus_rectum" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.pemeriksaan_anus_rectum"></b-form-textarea>
                          </div>
                        </div>
                        <div class="mt-2" v-if="dataRegistrasi.jenis_kelamin == 'P'">
                          <b-form-checkbox id="genitalia_wanita" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.status" name="genitalia_wanita" :value="true" :unchecked-value="false">Pemeriksaan genitalia wanita</b-form-checkbox>
                          <div v-if="mData.pemeriksaan_genitalia_wanita.status" class="ml-4">
                            <label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi genitalia eksternal</label>
                            <b-form-textarea id="inspeksi" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.inspeksi"></b-form-textarea>
                            <label for="inspeksi_vagina_servik" class="mt-1 mb-0 p-0">inspeksi vagina dan servik</label>
                            <b-form-textarea id="inspeksi_vagina_servik" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.inspeksi_vagina_servik"></b-form-textarea>
                            <label for="inspeksi_vagina_uterus_ovarium" class="mt-1 mb-0 p-0">palpasi vagina, uterus, dan ovarium</label>
                            <b-form-textarea id="inspeksi_vagina_uterus_ovarium" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.inspeksi_vagina_uterus_ovarium"></b-form-textarea>
                            <label for="pemeriksaan_anus_rectum" class="mt-1 mb-0 p-0">pemeriksaan anus dan rectum</label>
                            <b-form-textarea id="pemeriksaan_anus_rectum" type="text" :disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.pemeriksaan_anus_rectum"></b-form-textarea>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </div>
                  <!-- END DARI COPY SIMPUS -->
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <p class="font-weight-bolder">Pemeriksaan Lain Lain</p>
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.kesadaran"
                    :key="'kesadaran'"
                    :id="'kesadaran'"
                    :item="{
                      label: 'Kesadaran',
                      id: 'kesadaran',
                      data: 'kesadaran',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.kesadaran,
                      pointer: {
                        label: 'label',
                        code: 'code',
                        display: ['label'],
                        list: [
                          { label: 'Compos Mentis', code: 'Compos Mentis' },
                          { label: 'Somnolen', code: 'Somnolen' },
                          { label: 'Sopor', code: 'Sopor' },
                          { label: 'Coma', code: 'Coma' },
                          { label: 'Apatis', code: 'Apatis' },
                        ],
                      },
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.kesadaran" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.tinggi_badan"
                    :item="{
                      label: 'Tinggi Badan',
                      id: 'tinggi_badan',
                      data: 'tinggi_badan',
                      value: mData.tinggi_badan,
                      type: 'number',
                      suffix: 'cm',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.tinggi_badan" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.berat_badan"
                    :item="{
                      label: 'Berat Badan',
                      id: 'berat_badan',
                      data: 'berat_badan',
                      value: mData.berat_badan,
                      type: 'decimal',
                      suffix: 'kg',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.berat_badan" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.index_masa_tubuh"
                    :item="{
                      label: 'Index Masa Tubuh',
                      id: 'index_masa_tubuh',
                      data: 'index_masa_tubuh',
                      value: mData.index_masa_tubuh,
                      type: 'text',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="true"
                    :valuee="mData.index_masa_tubuh" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.lingkar_kepala"
                    :item="{
                      label: 'Lingkar Kepala',
                      id: 'lingkar_kepala',
                      data: 'lingkar_kepala',
                      value: mData.lingkar_kepala,
                      type: 'number',
                      suffix: 'cm',
                      class: '',
                      validation: ['required'],
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.lingkar_kepala" />
                </div>
                <div class="col-12">
                  <b-form-group label="Status Gizi Pediatri:" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      size="lg"
                      id="radio-group-1"
                      v-model="mData.status_gizi"
                      :disabled="objectDataAssesmen.is_validasi"
                      :options="[
                        { text: 'Gizi Kurang', value: 'gizi_kurang' },
                        { text: 'Gizi Cukup', value: 'gizi_cukup' },
                        { text: 'Gizi Lebih', value: 'gizi_lebih' },
                      ]"
                      :aria-describedby="ariaDescribedby"
                      name="status_gizi"></b-form-radio-group>
                  </b-form-group>
                </div>
              </div>
            </div>

            <div class="col-12">
              <h5 class="">Hasil Laboratorium</h5>
              <table class="table table-bordered">
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
                <tbody>
                  <tr v-for="(item, i) in lab_hasil" :key="'hasil-pem-penunjang-lab_hasil' + i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.tanggal_request | parse("date") }}</td>
                    <td>{{ item.nama_penunjang }}</td>
                    <td>{{ item.hasil || "-" }}</td>
                    <td>{{ item.satuan || "-" }}</td>
                    <td>{{ item.parameter_normal || "-" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12">
              <h5 class="">Hasil Radiologi</h5>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tanggal</th>
                    <th>Nama Tes</th>
                    <th>Hasil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in radiologi_hasil" :key="'hasil-pem-penunjang-lab_hasil' + i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.tanggal_request | parse("date") }}</td>
                    <td>{{ item.nama_penunjang }}</td>
                    <td>{{ item.hasil || "-" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <template>
            <div class="col-12 align-self-center p-0">
              <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                <i class="ri-save-line"></i>
                {{ $t('global.submit') }}
              </button>
            </div>
          </template> -->
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

import moment from "moment";
moment.locale("id");

export default {
  name: "medis_objective",
  components: {
    VueSlider,
  },
  props: {
    is_validasi: {
      type: Boolean,
      required: true,
      default() {
        return false;
      },
    },
    objectDataAssesmen: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    mData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // mData: {}
      lab_hasil: [],
      radiologi_hasil: [],

      map: null,
      config_slider_skrining_nyeri: {
        breakpoints: [1, 2, 5, 8, 10],
        dotSize: 14,
        width: "auto",
        height: 4,
        contained: false,
        direction: "ltr",
        data: null,
        dataLabel: "label",
        dataValue: "value",
        min: 0,
        max: 10,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: "active",
        tooltipPlacement: "top",
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },
      defaultValue: {
        pemeriksaan_kulit: {
          inspeksi: "Normal : kulit tidak ada ikterik/pucat/sianosis",
          palpasi: "Normal : lembab, turgor baik/elastic, tidak ada edema",
        },
        pemeriksaan_kuku: {
          inspeksi: "Normal : bersih, bentuk normal tidak ada tanda-tanda jari tabuh (clubbing finger), tidak ikterik/sianosis",
          palpasi: "Normal : aliran darah kuku akan kembali < 3 detik",
        },
        pemeriksaan_kepala: {
          inspeksi: "Normal : simetris, bersih, tidak ada lesi, tidak menunjukkan tanda-tanda kekurangan gizi(rambut jagung dan kering)",
          palpasi: "Normal : tidak ada penonjolan /pembengkakan, rambut lebat dan kuat/tidak rapuh",
        },
        pemeriksaan_wajah: {
          inspeksi: "Normal : warna sama dengan bagian tubuh lain,  tidak pucat/ikterik, simetris",
          palpasi: "Normal : tidak ada nyeri tekan dan edema",
        },
        pemeriksaan_mata: {
          inspeksi: "Normal : simetris mata kika, simetris bola mata kika, warna konjungtiva pink, dan sclera berwarna putih",
        },
        pemeriksaan_telinga: {
          inspeksi: "Normal : bentuk dan posisi simetris kika, integritas kulit bagus, warna sama dengan kulit lain, tidak ada tanda-tanda infeksi, dan alat bantu dengar",
          palpasi: "Normal : tidak ada nyeri tekan",
        },
        pemeriksaan_hidung_dan_sinus: {
          inspeksi: "Normal : simetris kika, warna sama dengan warna kulit lain, tidak ada lesi, tidak ada sumbatan, perdarahan dan tanda-tanda infeksi",
          palpasi: "Normal : tidak ada bengkak dan nyeri tekan",
        },
        pemeriksaan_mulut_dan_bibir: {
          inspeksi: "Normal : warna mukosa mulut dan bibir pink, lembab, tidak ada lesi dan stomatitis ",
          palpasi: "Normal : gigi lengkap, tidak ada tanda-tanda gigi berlobang atau kerusakan gigi, tidak ada perdarahan atau radang gusi, lidah simetris, warna pink, langit2 utuh dan tidak ada tanda infeksi",
        },
        pemeriksaan_leher: {
          inspeksi: "Normal : warna sama dengan kulit lain, integritas kulit baik, bentuk simetris, tidak ada pembesaran kelenjer gondok",
          inspeksi_aukultasi: "Normal : arteri karotis terdengar",
          inspeksi_palpas: "Normal : tidak teraba pembesaran kel.gondok, tidak ada nyeri, tidak ada  pembesaran kel.limfe, tidak ada nyeri",
          akultulasi: "Normal",
        },
        pemeriksaan_dada_dan_punggung: {
          inspeksi: "Normal : simetris, bentuk dan postur normal, tidak ada tanda-tanda distress pernapasan, warna kulit sama dengan warna kulit lain, tidak ikterik/sianosis, tidak ada pembengkakan/penonjolan/edema",
          palpasi: "Normal : integritas kulit baik, tidak ada nyeri tekan/massa/tanda-tanda peradangan, ekspansi simetris, taktil vremitus cendrung sebelah kanan lebih teraba jelas",
          perkusi: "Normal : resonan (“dug dug dug”), jika bagian padat lebih daripada bagian udara = pekak (“bleg bleg bleg”), jika bagian udara lebih besar dari bagian padat=hiperesonan (“deng deng deng”), batas jantung=bunyi rensonan----hilang>>redup",
          auskultasi: "Normal : bunyi napas vesikuler, bronchovesikuler, brochial, tracheal ",
        },
        pemeriksaan_kardiovaskuler: {
          inspeksi: "Normal : denyutan aorta teraba",
          palpasi: "Normal : denyutan aorta teraba",
          perkusi: "Normal : batas jantung, tidak lebih dari 4,7,10 cm ke arah kiri dari garis mid sterna, pada RIC 4,5,dan 8",
          auskultasi: "Normal : terdengar bunyi jantung I/S1 (lub) dan bunyi jantung II/S2 (dub), tidak ada bunyi jantung tambahan (S3 atau S4)",
        },
        pemeriksaan_dada_dan_aksila: {
          inspeksi: "Normal",
          palpasi: "Normal",
          inspeksi_palpasi: "Normal",
        },
        pemeriksaan_abdomen_perut: {
          inspeksi: "Normal : simetris kika, warna dengan warna kulit lain, tidak ikterik tidak terdapat ostomy, distensi, tonjolan, pelebaran vena, kelainan umbilicus",
          auskultasi: "Normal :  suara peristaltic terdengar setiap 5-20x/dtk, terdengar denyutan arteri renalis, arteri iliaka dan aorta",
          perkusi_semua_kuadran: "Normal",
          perkusi_hepar: "Normal",
          perkusi_limfa: "Normal",
          perkusi_ginjal: "Normal",
          palpasi_semua_kuadran: "Normal : tidak teraba penonjolan tidak ada nyeri tekan, tidak ada massa dan penumpukan cairan",
        },
        pemeriksaan_ekstermitas_atas: {
          inspeksi: "Normal : simetris kika, integritas kulit baik, ROM aktif, kekuatan otot penuh",
          palpasi: "Normal : teraba jelas",
          tes_reflex: "Normal : reflek bisep dan trisep positif",
        },
        pemeriksaan_ekstermitas_bawah: {
          inspeksi: "Normal : simetris kika, integritas kulit baik, ROM aktif, kekuatan otot penuh",
          palpasi: "Normal : teraba jelas",
          tes_reflex: "Normal : reflex patella dan archiles positif",
        },
        pemeriksaan_genitalia_pria: {
          inspeksi: "Normal : integritas kulit baik, tidak ada masa atau pembengkakan, tidak ada pengeluaran pus atau darah",
          inspeksi_palpasi: "Normal ",
          pemeriksaan_anus_rectum: "Normal :  tidak ada nyeri , tidak terdapat edema / hemoroid / polip/ tanda-tanda infeksi dan pendarahan",
        },
        pemeriksaan_genitalia_wanita: {
          inspeksi: "Normal : bersih, mukosa lembab, integritas kulit baik, semetris tidak ada edema dan tanda-tanda infeksi (pengeluaran pus /bau)",
          inspeksi_vagina_servik: "Normal ",
          inspeksi_vagina_uterus_ovarium: "Normal ",
          pemeriksaan_anus_rectum: "Normal : tidak ada nyeri, tidak terdapat edema / hemoroid / polip/ tanda-tanda infeksi dan pendarahan",
        },
      },
    };
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        // this.$emit('dataChange', true)
        // this.set_map()
      },
    },
    "mData.tinggi_badan": function (newVal, oldVal) {
      console.log("te", this.mData);
      let bb = this.mData.berat_badan;
      let tb = this.mData.tinggi_badan / 100;
      let v = bb && tb ? bb / (tb * tb) : 0;
      this.mData.index_masa_tubuh = v.toFixed(2);
    },
    "mData.berat_badan": function (newVal, oldVal) {
      console.log("te1", this.mData);
      let bb = this.mData.berat_badan;
      let tb = this.mData.tinggi_badan / 100;
      let v = bb && tb ? bb / (tb * tb) : 0;
      this.mData.index_masa_tubuh = v.toFixed(2);
    },
  },
  async mounted() {
    // INIT DEFAULT VALUE
    console.log("start init value multiorgan");
    for (const lv1 of Object.keys(this.defaultValue)) {
      for (const lv2 of Object.keys(this.defaultValue[lv1])) {
        if (!this.mData[lv1][lv2]) this.mData[lv1][lv2] = this.defaultValue[lv1][lv2];
      }
    }
    console.log("end init value multiorgan");

    await this.getData().then(() => {
      console.log("simpan objectiveeeeeeeeeeeeeeeee");
      this.$emit("submit", { key: "objective", data: this.mData, silent: true });
    });
  },
  methods: {
    onSubmitEvaluasi(data) {
      // console.log(data)
      this.$emit("submit", { key: "objective", data: this.mData });
    },

    async getData() {
      return new Promise(async (resolve, reject) => {
        let l = await this.$_api.list("lab_hasil", { registrasi_id: this.objectDataAssesmen.registrasi_id });
        this.lab_hasil = l.data;
        this.mData.lab_hasil = l.data;

        let r = await this.$_api.list("rad_hasil", { registrasi_id: this.objectDataAssesmen.registrasi_id });
        this.radiologi_hasil = r.data;
        this.mData.radiologi_hasil = r.data;

        resolve();
      });
    },
  },
};
</script>
