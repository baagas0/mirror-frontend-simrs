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
          <button type="button" class="btn btn-primary" @click="$parent.updateAssesmen()">
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
                    <div class="col-6">
                      <s-input v-model="mData.sistolik" :item="{
                        label: 'Sistolik',
                        id: 'sistolik',
                        data: 'sistolik',
                        value: mData.sistolik,
                        type: 'number',
                        suffix: 'mmhg',
                        class: '',
                        validation: ['required'],
                      }" :disabled="is_validasi" :valuee="mData.sistolik" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="mData.diastolik" :item="{
                        label: 'Diastolik',
                        id: 'diastolik',
                        data: 'diastolik',
                        value: mData.diastolik,
                        type: 'number',
                        suffix: 'mmhg',
                        class: '',
                        validation: ['required'],
                      }" :disabled="is_validasi" :valuee="mData.diastolik" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="mData.nadi" :item="{
                        label: 'Nadi',
                        id: 'nadi',
                        data: 'nadi',
                        value: mData.nadi,
                        type: 'number',
                        suffix: 'x/menit',
                        class: '',
                        validation: ['required'],
                      }" :disabled="is_validasi" :valuee="mData.nadi" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="mData.pernafasan" :item="{
                        label: 'Pernafasan',
                        id: 'pernafasan',
                        data: 'pernafasan',
                        value: mData.pernafasan,
                        type: 'number',
                        suffix: 'x/menit',
                        class: '',
                        validation: ['required'],
                      }" :disabled="is_validasi" :valuee="mData.pernafasan" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="mData.suhu" :item="{
                        label: 'Suhu',
                        id: 'suhu',
                        data: 'suhu',
                        value: mData.suhu,
                        type: 'number',
                        suffix: '&deg;C',
                        class: '',
                        validation: ['required'],
                      }" :disabled="is_validasi" :valuee="mData.suhu" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="mData.saturasi_oksigen" :item="{
                        label: 'Saturasi Oksigen',
                        id: 'saturasi_oksigen',
                        data: 'saturasi_oksigen',
                        value: mData.saturasi_oksigen,
                        type: 'number',
                        suffix: '%',
                        class: '',
                        validation: ['required'],
                      }" :disabled="is_validasi" :valuee="mData.saturasi_oksigen" />
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
                      }" :disabled="is_validasi" :valuee="mData.skrining_nyeri" /> -->

                      <!-- Scale Pain - Skala Nyeri -->
                      <div class="row bordered p-2" style="border: solid 1px #c8c8c8;">
                        <div class="col-12 bg-light-warning text-center mb-2">
                          <p class="font-weight-bolder mt-2 mb-2">Skala Nyeri</p>
                        </div>
                        
                        <div class="col-12 d-flex align-items-center justify-content-center mb-2">
                          <img :src="'./static/img/icon/'+(mData.skrining_nyeri_pain_img || 'pain1')+'.png'" class="" style="width: 75px !important;" alt="">
                        </div>
                        <div class="col-12">
                          <img :src="'./static/img/icon/ScalePain.png'" class="w-100" alt="">
                        </div>
                        <div class="col-12">
                          <vue-slider :disabled="is_validasi" v-bind="config_slider_skrining_nyeri" v-model="mData.skrining_nyeri_pain" />
                        </div>
                      </div>
                    </div>
                    <div class="col-12" v-if="mData.skrining_nyeri === 'Ada'">
                      <s-input v-model="mData.keterangan_skrining_nyeri" :item="{
                        label: 'Keterangan Skrining',
                        id: 'keterangan_skrining_nyeri',
                        data: 'keterangan_skrining_nyeri',
                        value: mData.keterangan_skrining_nyeri,
                        type: 'textarea',
                        class: '',
                        validation: [],
                      }" :disabled="is_validasi" :valuee="mData.keterangan_skrining_nyeri" />
                    </div>
                    <div class="col-12">
                        <s-input v-model="mData.pemeriksaan_fisik" :item="{
                          label: 'Pemeriksaan Fisik',
                          id: 'pemeriksaan_fisik',
                          data: 'pemeriksaan_fisik',
                          value: mData.pemeriksaan_fisik,
                          type: 'textarea',
                          class: '',
                          validation: ['required'],
                        }" :disabled="is_validasi" :valuee="mData.pemeriksaan_fisik" />
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-12">
                        <p class="font-weight-bolder">Pemeriksaan Lain Lain</p>
                    </div>
                    <div class="col-12">
                      <s-input v-model="mData.kesadaran" :key="'kesadaran'" :id="'kesadaran'" :item="{
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
                          ]
                        },
                        param: {},
                      }" :disabled="is_validasi" :valuee="mData.kesadaran" />
                    </div>
                    <div class="col-12">
                        <s-input v-model="mData.tinggi_badan" :item="{
                          label: 'Tinggi Badan',
                          id: 'tinggi_badan',
                          data: 'tinggi_badan',
                          value: mData.tinggi_badan,
                          type: 'number',
                          suffix: 'cm',
                          class: '',
                          validation: ['required'],
                        }" :disabled="is_validasi" :valuee="mData.tinggi_badan" />
                    </div>
                    <div class="col-12">
                        <s-input v-model="mData.berat_badan" :item="{
                          label: 'Berat Badan',
                          id: 'berat_badan',
                          data: 'berat_badan',
                          value: mData.berat_badan,
                          type: 'number',
                          suffix: 'kg',
                          class: '',
                          validation: ['required'],
                        }" :disabled="is_validasi" :valuee="mData.berat_badan" />
                    </div>
                    <div class="col-12">
                        <s-input v-model="mData.index_masa_tubuh" :item="{
                          label: 'Index Masa Tubuh',
                          id: 'index_masa_tubuh',
                          data: 'index_masa_tubuh',
                          value: mData.index_masa_tubuh,
                          type: 'text',
                          class: '',
                          validation: ['required'],
                        }"  :disabled="true" :valuee="mData.index_masa_tubuh" />
                    </div>
                    <div class="col-12">
                        <s-input v-model="mData.kebutuhan_oksigen" :item="{
                          label: 'Kebutuhan Oksigen',
                          id: 'kebutuhan_oksigen',
                          data: 'kebutuhan_oksigen',
                          type: 'lookup-button',
                          validation: ['required'],
                          value: mData.kebutuhan_oksigen,
                          pointer: {
                            label: 'label',
                            code: 'code',
                            display: ['label'],
                            list: [
                              { label: 'Ada', code: 'Ada' },
                              { label: 'Tidak', code: 'Tidak' },
                            ]
                          },
                          param: {},
                        }" :disabled="is_validasi" :valuee="mData.lingkar_kepala" />
                    </div>
                </div>
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
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'

  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'medis_objective',
    components: {
      VueSlider,
    },
    props: {
      is_validasi: {
				type: Boolean,
				required: true,
				default () {
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
			dataRegistrasi: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
      mData: {
        type: Object,
        required: true,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        // mData: {}
        config_slider_skrining_nyeri: {
          breakpoints: [1,2,5,8,10],
          dotSize: 14,
          width: 'auto',
          height: 4,
          contained: false,
          direction: 'ltr',
          data: null,
          dataLabel: 'label',
          dataValue: 'value',
          min: 0,
          max: 10,
          interval: 1,
          disabled: false,
          clickable: true,
          duration: 0.5,
          adsorb: false,
          lazy: false,
          tooltip: 'active',
          tooltipPlacement: 'top',
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
        }
      }
    },
    watch: {
      mData: {
        deep: true,
        immediate: false,
        handler (to, from) {
          this.$emit('dataChange', true)
        }
      },
      'mData.tinggi_badan': function (newVal, oldVal){
        console.log('te', this.mData)
        let bb = this.mData.berat_badan
        let tb = this.mData.tinggi_badan/100
        let v = bb && tb ? (bb/(tb*tb)) : 0
        this.mData.index_masa_tubuh = v.toFixed(2)
      },
      'mData.berat_badan': function (newVal, oldVal){
        console.log('te1', this.mData)
        let bb = this.mData.berat_badan
        let tb = this.mData.tinggi_badan/100
        let v = bb && tb ? (bb/(tb*tb)) : 0
        this.mData.index_masa_tubuh = v.toFixed(2)
      },
      'mData.skrining_nyeri_pain': function (to, oldVal){
        let pain_img = 'pain_1'

        if (to < 1) pain_img = 'pain1'
        else if (to >= 1 && to < 3) pain_img = 'pain2'
        else if (to >= 3 && to < 5) pain_img = 'pain3'
        else if (to >= 5 && to < 7) pain_img = 'pain4'
        else if (to >= 7 && to < 9) pain_img = 'pain5'
        else if (to >= 9) pain_img = 'pain6'


        this.mData.skrining_nyeri_pain_img = pain_img 
      }
    },
    mounted () {
      console.log('OBJECTIVE MOUNTED')
      this.initData()
    },
    methods: {
      onSubmitEvaluasi (data) {
        // console.log(data)
        this.$emit('submit', { key: 'objective', data: this.mData })
      },
      async initData() {
        try {
          const triage_id = this.dataRegistrasi.triage_id
          const triages = await this.$_api.list('triage', { id: triage_id })
          if (!triages.data || triages.data.length === 0) {
            this.$_alert.error({}, 'Data triage tidak ditemukan')
            return
          }
          const json_triage = triages.data[0].asesmen
          console.log('masuk triage', json_triage)
          if(!this.mData.sistolik         && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.sistolik)         this.mData.sistolik = json_triage.pemeriksaan_vital.sistolik
          if(!this.mData.diastolik        && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.diastolik)        this.mData.diastolik = json_triage.pemeriksaan_vital.diastolik
          if(!this.mData.nadi             && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.nadi)             this.mData.nadi = json_triage.pemeriksaan_vital.nadi
          if(!this.mData.pernafasan       && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.pernafasan)       this.mData.pernafasan = json_triage.pemeriksaan_vital.pernafasan
          if(!this.mData.suhu             && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.suhu)             this.mData.suhu = json_triage.pemeriksaan_vital.suhu
          if(!this.mData.kesadaran        && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.kesadaran_pasien) this.mData.kesadaran = json_triage.pemeriksaan_vital.kesadaran_pasien
          if(!this.mData.tinggi_badan     && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.tinggi_badan)     this.mData.tinggi_badan = json_triage.pemeriksaan_vital.tinggi_badan
          if(!this.mData.berat_badan      && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.berat_badan)      this.mData.berat_badan = json_triage.pemeriksaan_vital.berat_badan
          if(!this.mData.index_masa_tubuh && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.index_masa_tubuh) this.mData.index_masa_tubuh = json_triage.pemeriksaan_vital.index_masa_tubuh

          if(!this.mData.skrining_nyeri_pain      && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.skrining_nyeri_pain)     this.mData.skrining_nyeri_pain = json_triage.pemeriksaan_vital.skrining_nyeri_pain
          if(!this.mData.skrining_nyeri_pain_img  && json_triage && json_triage.pemeriksaan_vital && json_triage.pemeriksaan_vital.skrining_nyeri_pain_img) this.mData.skrining_nyeri_pain_img = json_triage.pemeriksaan_vital.skrining_nyeri_pain_img

          console.log(this.mData)
        } catch (error) {
          this.$_alert.error(error, 'Terjadi Kesalahan')
        }

      }
    }
  }
</script>