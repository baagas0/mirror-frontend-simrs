<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Column 1: Card Registrasi -->
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi" :type="'gizi'"/>
      </div>

      <!-- Column 2: Gizi Form -->
      <div class="col-xl-9 col-md-9 col-sm-12" v-if="dataRegistrasi && dataRegistrasi.id">
        <!-- Patient Info Card -->
        <div class="card card-custom mb-5">
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter || '-' }}</p>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- Gizi Form Component -->
        <gizi-form
          :dataRegistrasi="dataRegistrasi"
          :registrasiId="registrasiId"
        />
      </div>

      <!-- Empty State: No Registration Selected -->
      <template v-else>
        <div class="col-xl-9 col-md-9 col-sm-12">
          <div class="card card-custom">
            <div class="card-body text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h5 class="font-weight-bolder mt-5">Silakan Pilih Registrasi</h5>
              <p class="text-muted">Pilih pasien dari daftar registrasi untuk mengelola data gizi</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CardRegistrasiRanap from './_components/card_registrasi_ranap.vue'
import GiziForm from '../../_shared/gizi_form.vue'

export default {
  name: 'layanan_ranap_gizi',
  components: { CardRegistrasiRanap, GiziForm },
  data() {
    return {
      dataRegistrasi: {},
      registrasiId: ''
    }
  },
  methods: {
    selectRegistrasi(e) {
      if (e && e.registrasi_id !== undefined) {
        this.dataRegistrasi = e
        this.registrasiId = e.registrasi_id || ''
      }
    }
  }
}
</script>
