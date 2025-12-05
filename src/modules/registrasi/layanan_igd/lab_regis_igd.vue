<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-igd @selected="selectRegistrasi"/>
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>


              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-custom mb-5" v-if="false">
          <div class="card-body d-flex justify-content-center">
            <div class="spinner spinner-track spinner-primary"></div>
          </div>
        </div>
        <template v-else-if="dataRegistrasi && registrasi_id">
          <!-- HERE -->
          <lab :registrasi_id="registrasi_id"></lab>
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
            </div>
          </div>
        </template>

      </div>
    </div>

  </div>
</template>
  
<script>
  import CardRegistrasiIgd from './_components/card_registrasi_igd.vue'
  import Lab from '../lab/lab_regis.vue'

  import print from '../../../components/print.js';
  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_igd_medis',
    components: { CardRegistrasiIgd, Lab },
    data () {
      return {
        info_alert: '',

        scrollPosition: 0,
        endpoint: 'lab_regis_igd',

        dataRegistrasi: {},
        registrasi_id: '',
      }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
      async selectRegistrasi (e, switch_tab = true) {
        this.dataRegistrasi = e
        this.registrasi_id = e.registrasi_id || ''
        if (!this.registrasi_id) return

      },
    }
    
  }
</script>
