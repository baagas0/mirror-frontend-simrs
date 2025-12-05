<template>
  <div class="card card-custom mb-5">
    <div class="card-header min-h-50px">
      <div class="card-title">
        <h3 class="card-label">
          Form Objective <i class="mr-2"></i>
          <small class="">{{ dataRegistrasi.nama_lengkap }}</small>
        </h3>
      </div>
      <div class="card-toolbar mx-5">
        <!-- <button class="btn btn-light-primary mr-2" @click="$parent.doValidasi()">
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
                    }" :valuee="mData.sistolik" />
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
                    }" :valuee="mData.diastolik" />
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
                    }" :valuee="mData.nadi" />
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
                    }" :valuee="mData.pernafasan" />
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
                    }" :valuee="mData.suhu" />
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
                    }" :valuee="mData.saturasi_oksigen" />
                  </div>
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                  <div class="col-12">
                    <s-input v-model="mData.kesadaran_pasien" :key="'kesadaran_pasien'" :id="'kesadaran_pasien'" :item="{
                      label: 'Kesadaran Pasien',
                      id: 'kesadaran_pasien',
                      data: 'kesadaran_pasien',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.kesadaran_pasien,
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
                    }" :valuee="mData.kesadaran_pasien" />
                  </div>
                  <div class="col-12">
                    <s-input v-model="mData.kebutuhan_oksigen" :key="'kebutuhan_oksigen'" :id="'kebutuhan_oksigen'" :item="{
                      label: 'Kebutuhan Oksigen',
                      id: 'kebutuhan_oksigen',
                      data: 'kebutuhan_oksigen',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.kebutuhan_oksigen,
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
                    }" :valuee="mData.kebutuhan_oksigen" />
                  </div>
                </div>
            </div>

          </div>
          <!-- <template>
            <div class="col-12 align-self-center p-0">
              <button type="submit" class="btn btn-light-primary mr-3">
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
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'medis_objective',
    props: {
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
    },
    mounted () {
    },
    methods: {
      onSubmitEvaluasi (data) {
        // console.log(data)
        this.$emit('submit', { key: 'objective', data: this.mData })
      }
    }
  }
</script>