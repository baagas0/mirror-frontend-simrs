<template>
  <div class="cppt-dokter">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(updateAssesmen)" autocomplete="off">
        <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
          <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.assesmen style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
            <div class="card-title" style="padding: 0.7rem 1rem;">
              <h4 class="card-label">
                Assesmen
              </h4>
            </div>
            <div class="card-toolbar" style="margin: .5rem 1rem;">
              <i class="ri-arrow-down-double-line text-white" v-if="collapse.assesmen"></i>
              <i class="ri-arrow-right-double-line text-white" v-else></i>
          </div>
          </b-card-header>
          <b-collapse id="assesmen" v-model="collapse.assesmen" accordion="accordion-assesmen" role="tabpanel">
            <b-card-body class="bg-light-primary">
              <div class="row">
                <div class="col-12">
                  <s-input v-model="dataAssesmen.lainnya.assesmen" :item="{
                    label: 'Assesmen',
                    id: 'assesmen',
                    data: 'assesmen',
                    value: dataAssesmen.lainnya.assesmen,
                    type: 'textarea',
                    placeholder: 'Subjective',
                    validation: [],
                  }" :valuee="dataAssesmen.lainnya.assesmen" />
                </div>
              </div>

            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
          <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.diagnosis style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
            <div class="card-title" style="padding: 0.7rem 1rem;">
              <h4 class="card-label">
                Diagnosis
              </h4>
            </div>
            <div class="card-toolbar" style="margin: .5rem 1rem;">
              <i class="ri-arrow-down-double-line text-white" v-if="collapse.diagnosis"></i>
              <i class="ri-arrow-right-double-line text-white" v-else></i>
          </div>
          </b-card-header>
          <b-collapse id="diagnosis" v-model="collapse.diagnosis" accordion="accordion-diagnosis" role="tabpanel">
            <b-card-body class="bg-light-primary">
              <div class="row">
                <div class="col-12">
                  <s-input v-model="dataAssesmen.lainnya.diagnosis" :item="{
                    label: 'Diagnosis',
                    id: 'diagnosis',
                    data: 'diagnosis',
                    value: dataAssesmen.lainnya.diagnosis,
                    type: 'textarea',
                    placeholder: 'Subjective',
                    validation: [],
                  }" :valuee="dataAssesmen.lainnya.diagnosis" />
                </div>
              </div>

            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
          <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.intervensi style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
            <div class="card-title" style="padding: 0.7rem 1rem;">
              <h4 class="card-label">
                Intervensi
              </h4>
            </div>
            <div class="card-toolbar" style="margin: .5rem 1rem;">
              <i class="ri-arrow-down-double-line text-white" v-if="collapse.intervensi"></i>
              <i class="ri-arrow-right-double-line text-white" v-else></i>
          </div>
          </b-card-header>
          <b-collapse id="intervensi" v-model="collapse.intervensi" accordion="accordion-intervensi" role="tabpanel">
            <b-card-body class="bg-light-primary">
              <div class="row">
                <div class="col-12">
                  <s-input v-model="dataAssesmen.lainnya.intervensi" :item="{
                    label: 'Intervensi',
                    id: 'intervensi',
                    data: 'intervensi',
                    value: dataAssesmen.lainnya.intervensi,
                    type: 'textarea',
                    placeholder: 'Subjective',
                    validation: [],
                  }" :valuee="dataAssesmen.lainnya.intervensi" />
                </div>
              </div>

            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
          <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.monitoring_evaluasi style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
            <div class="card-title" style="padding: 0.7rem 1rem;">
              <h4 class="card-label">
                Monitoring dan Evaluasi
              </h4>
            </div>
            <div class="card-toolbar" style="margin: .5rem 1rem;">
              <i class="ri-arrow-down-double-line text-white" v-if="collapse.monitoring_evaluasi"></i>
              <i class="ri-arrow-right-double-line text-white" v-else></i>
          </div>
          </b-card-header>
          <b-collapse id="monitoring_evaluasi" v-model="collapse.monitoring_evaluasi" accordion="accordion-monitoring_evaluasi" role="tabpanel">
            <b-card-body class="bg-light-primary">
              <div class="row">
                <div class="col-12">
                  <s-input v-model="dataAssesmen.lainnya.monitoring_evaluasi" :item="{
                    label: 'Monitoring dan Evaluasi',
                    id: 'monitoring_evaluasi',
                    data: 'monitoring_evaluasi',
                    value: dataAssesmen.lainnya.monitoring_evaluasi,
                    type: 'textarea',
                    placeholder: 'Monitoring dan Evaluasi',
                    validation: [],
                  }" :valuee="dataAssesmen.lainnya.monitoring_evaluasi" />
                </div>
                <div class="col-12">
                  <s-input v-model="dataAssesmen.lainnya.tindak_lanjut" :key="'tindak_lanjut'" :id="'tindak_lanjut'" :item="{
                    label: 'Tindak Lanjut',
                    id: 'tindak_lanjut',
                    data: 'tindak_lanjut',
                    type: 'lookup-button',
                    validation: [],
                    value: dataAssesmen.lainnya.tindak_lanjut,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [{ label: '7 Hari', code: '7_hari' }, { label: '3 Hari', code: '3_hari' }, ]
                    },
                    param: {},
                  }" :valuee="dataAssesmen.lainnya.tindak_lanjut" />
                </div>
              </div>


            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
          <b-card-header header-tag="div" class="p-1 bg-primary" role="tab" v-b-toggle.rencana_pemulangan_pasien style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
            <div class="card-title" style="padding: 0.7rem 1rem;">
              <h4 class="card-label">
                Rencana Pemulangan Pasien
              </h4>
            </div>
            <div class="card-toolbar" style="margin: .5rem 1rem;">
              <i class="ri-arrow-down-double-line text-white" v-if="collapse.rencana_pemulangan_pasien"></i>
              <i class="ri-arrow-right-double-line text-white" v-else></i>
          </div>
          </b-card-header>
          <b-collapse id="rencana_pemulangan_pasien" v-model="collapse.rencana_pemulangan_pasien" accordion="accordion-rencana_pemulangan_pasien" role="tabpanel">
            <b-card-body class="bg-light-primary">
              <div class="row">
                <div class="col-12 text-center">
                  <b-form-checkbox v-model="dataAssesmen.lainnya.rencana_kepulangan" name="rencana-kepulangan" size="lg" switch>
                    Rencana Kepulangan
                  </b-form-checkbox>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        
        <template>
          <div class="col-12 align-self-center p-0">
            <button type="submit" class="btn btn-light-primary mr-3 w-100">
              <i class="ri-save-line"></i>
              {{ $t('global.submit') }}
            </button>
          </div>
        </template>
      </form>
    </ValidationObserver>
  </div>
</template>
    
<script>
import Subjective from './cppt_dokter/subjective.vue'

import moment from 'moment'
moment.locale('id')

export default {
  name: 'cppt_dokter',
  components: { Subjective },
  props: {
    dataRegistrasi: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    objectDataAssesmen: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    dataAssesmen: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      activeTab: 'subjective',
      collapse: {}
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    updateAssesmen() {
      this.$parent.$parent.$parent.updateAssesmen(this.dataAssesmen)
    },
    
    switchActiveTab(e) {
      console.log('called switchActiveTab', e)
      this.activeTab = e
      if (e === 'assesment') {
        if (!this.dataAssesmen[e].diagnosa) this.dataAssesmen[e].diagnosa = []
      } else if (e === 'planning') {
        if (!this.dataAssesmen[e].prosedur) this.dataAssesmen[e].prosedur = []
        if (!this.dataAssesmen[e].prosedur_yang_sudah_dilakukan) this.dataAssesmen[e].prosedur_yang_sudah_dilakukan = []
        if (!this.dataAssesmen[e].obat_jadi) this.dataAssesmen[e].obat_jadi = []
        if (!this.dataAssesmen[e].obat_racikan) this.dataAssesmen[e].obat_racikan = []
      }
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

.pointer {
  cursor: pointer;
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
}
</style>