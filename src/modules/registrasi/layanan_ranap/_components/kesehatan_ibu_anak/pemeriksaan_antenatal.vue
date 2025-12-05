<template>
  <div id="page-antenatal" class="w-100">
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <!-- <b-button variant="success" class="mr-2">Buat Baru Kehamilan</b-button> -->
          <!-- <b-button variant="success" class="mb-3">Cetak Kartu Ibu--</b-button> -->
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div class="row no-gutters mb-5 nav nav-warning nav-pills gap-8">
          <a @click="switchActiveTab('pemeriksaan_antenatal')" :class="activeTab==='pemeriksaan_antenatal'? 'btn-warning': 'btn-outline-warning'" class="btn" style="flex-grow: 1">Antenatal</a>
          <a @click="switchActiveTab('kspr')" :class="activeTab==='kspr'? 'btn-warning': 'btn-outline-warning'" class="btn" style="flex-grow: 1">KSPR</a>
        </div>
        <template v-if="activeTab==='pemeriksaan_antenatal'">
          <Antenatal :mData="mData.anantenatal" :assesmen="assesmen"/>
        </template>
        <template v-if="activeTab==='kspr'">
          <kspr :mData="mData.kspr" :assesmen="assesmen"/>
        </template>

      </b-col>
    </b-row>
    
  </div>
</template>
<script>
import Antenatal from "../kesehatan_ibu_anak/antenatal/antenatal.vue";
import Kspr from "../kesehatan_ibu_anak/antenatal/kspr.vue";
export default {
  components:{
   Antenatal,
   Kspr
  },
  props: {
    assesmen: {
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
    },
  },
  data() {
    return {
      disable_kspr: true,
      register_antenatal: null,
      activeTab: 'pemeriksaan_antenatal'
    }
  },
  mounted() {
    if (!this.mData.antenatal) this.mData.antenatal = {}
    if (!this.mData.kspr) this.mData.kspr = {}
  },
  methods: {
    set_disable(event){
      let vm = this
      vm.disable_kspr = event
    },
    set_register(event){
      let vm = this
      vm.register_antenatal = event
    },
    switchActiveTab(e) {
      this.$nextTick(() => {
        this.activeTab = e
      })
    }
 },
}
</script>

<style scoped>
.random-card .card{
  background-color: #FAFAFA;
  border:1px solid #D3D3D3
}


</style>