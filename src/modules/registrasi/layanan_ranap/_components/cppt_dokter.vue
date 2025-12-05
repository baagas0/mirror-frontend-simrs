<template>
  <div class="cppt-dokter">
    <div class="row no-gutters mb-5">
      <a @click="switchActiveTab('subjective')" :class="activeTab === 'subjective' ? 'btn-primary' : 'btn-outline-primary'" class="col btn mb-0 mr-2">Subjective</a>
      <a @click="switchActiveTab('objective')" :class="activeTab === 'objective' ? 'btn-primary' : 'btn-outline-primary'" class="col btn mb-0 mr-2">Objective</a>
      <a @click="switchActiveTab('assesment')" :class="activeTab === 'assesment' ? 'btn-primary' : 'btn-outline-primary'" class="col btn mb-0 mr-2">Assesment</a>
      <a @click="switchActiveTab('planning')" :class="activeTab === 'planning' ? 'btn-primary' : 'btn-outline-primary'" class="col btn mb-0 mr-2">Planning</a>
    </div>
    <template v-if="activeTab === 'subjective' && dataAssesmen.subjective">
      <subjective :objectDataAssesmen="{}" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.subjective"
        @submit="updateAssesmen"></subjective>
    </template>
    <template v-if="activeTab === 'objective' && dataAssesmen.objective">
      <objective :objectDataAssesmen="{}" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.objective"
        @submit="updateAssesmen"></objective>
    </template>
    <template v-if="activeTab === 'assesment' && dataAssesmen.assesment">
      <assesment :objectDataAssesmen="{}" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.assesment"
        @submit="updateAssesmen"></assesment>
    </template>
    <template v-if="activeTab === 'planning' && dataAssesmen.planning">
      <planning :objectDataAssesmen="{}" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.planning"
        @submit="updateAssesmen"></planning>
    </template>
  </div>
</template>
    
<script>
import Subjective from './cppt_dokter/subjective.vue'
import Objective from './cppt_dokter/objective.vue'
import Assesment from './cppt_dokter/assesment.vue'
import Planning from './cppt_dokter/planning.vue'

import moment from 'moment'
moment.locale('id')

export default {
  name: 'cppt_dokter',
  components: { Subjective, Objective, Assesment, Planning },
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
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    updateAssesmen(data = {}) {
      console.log('updateAssesmen cppt_dokter')
      if (data.open_tab) this.switchActiveTab(data.open_tab)
      console.log(data)
      this.$parent.$parent.$parent.updateAssesmen(data)
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
}</style>