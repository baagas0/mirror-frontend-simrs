<template>
  <div class="cppt-dokter">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(updateAssesmen)" autocomplete="off">
        
        <div class="row">

          <div class="col-12">
            <s-input v-model="dataAssesmen.planning.tanggal" :item="{
              label: 'Tanggal',
              id: 'tanggal',
              data: 'tanggal',
              type: 'datetime',
              validation: ['required'],
              value: dataAssesmen.planning.tanggal,
              param: {},
            }" :disabled="objectDataAssesmen.is_validasi" :valuee="dataAssesmen.planning.tanggal" />
          </div>

          <div class="col-6">
            <s-input v-model="dataAssesmen.planning.intervensi" :item="{
              label: 'Intervensi',
              id: 'intervensi',
              data: 'intervensi',
              type: 'textarea',
              validation: ['required'],
              value: dataAssesmen.planning.intervensi,
              param: {},
            }" :disabled="objectDataAssesmen.is_validasi" :valuee="dataAssesmen.planning.intervensi" />
          </div>

          <div class="col-6">
            <s-input v-model="dataAssesmen.planning.area_terapi" :item="{
              label: 'Tempat / Area yang diterapi',
              id: 'area_terapi',
              data: 'area_terapi',
              type: 'textarea',
              validation: ['required'],
              value: dataAssesmen.planning.area_terapi,
              param: {},
            }" :disabled="objectDataAssesmen.is_validasi" :valuee="dataAssesmen.planning.area_terapi" />
          </div>

          <hr>

          <div class="col-12">
            <s-input v-model="dataAssesmen.planning.evaluasi_fisioterapi" :item="{
              label: 'Evaluasi',
              id: 'evaluasi_fisioterapi',
              data: 'evaluasi_fisioterapi',
              type: 'textarea',
              validation: [],
              value: dataAssesmen.planning.evaluasi_fisioterapi,
              param: {},
            }" :disabled="objectDataAssesmen.is_validasi" :valuee="dataAssesmen.planning.evaluasi_fisioterapi" />
          </div>
          <!-- <div class="col-12 align-self-center">
            <button type="reset" class="btn btn-light-danger mr-3">
              <i class="ri-loop-right-fill"></i>
              Reset
            </button>
            <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
              <i class="ri-save-line"></i>
              {{ $t('global.submit') }}
            </button>
          </div> -->
        </div>
        
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