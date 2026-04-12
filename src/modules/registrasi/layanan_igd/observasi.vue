<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Column 1: Card Registrasi -->
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-igd @selected="selectRegistrasi" :type="'observasi'" />
      </div>

      <!-- Column 2: Loading State -->
      <div class="col-xl-9 col-md-9 col-sm-12" v-if="loading">
        <div class="card card-custom mb-5">
          <div class="card-body d-flex justify-content-center">
            <div class="spinner spinner-track spinner-primary"></div>
          </div>
        </div>
      </div>

      <!-- Column 2: Error State -->
      <div class="col-xl-9 col-md-9 col-sm-12" v-else-if="errorMessage">
        <div class="card card-custom mb-5">
          <div class="card-body text-center">
            <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
            <h3 class="mt-3 font-weight-bolder text-dark">{{ errorMessage || "-" }}</h3>
            <button class="btn btn-light-primary mt-3" v-if="errorMessage.includes('Assesmen Medis')" @click="$router.push({ name: 'Layanan IGD assesmen medis', query: { registrasi_id: registrasiId } })">Assesmen Medis <i class="ri-arrow-right-line"></i></button>
          </div>
        </div>
      </div>

      <!-- Column 2: Observasi Form -->
      <div class="col-xl-9 col-md-9 col-sm-12" v-else-if="dataRegistrasi && dataRegistrasi.id && !errorMessage">
        <!-- Patient Info Card -->
        <div class="card card-custom mb-5">
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || "-" }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || "-" }} / {{ dataRegistrasi.tgl_registrasi | parse("date") }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse("kelamin") }} / {{ dataRegistrasi.tgl_lahir | parse("old") }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter || "-" }}</p>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- Observasi Form Component -->
        <observasi-form :dataRegistrasi="dataRegistrasi" :registrasiId="registrasiId" />
      </div>

      <!-- Empty State: No Registration Selected -->
      <template v-else>
        <div class="col-xl-9 col-md-9 col-sm-12">
          <div class="card card-custom">
            <div class="card-body text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h5 class="font-weight-bolder mt-5">Silakan Pilih Registrasi</h5>
              <p class="text-muted">Pilih pasien dari daftar registrasi untuk mengelola data observasi</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CardRegistrasiIgd from "./_components/card_registrasi_igd.vue";
import ObservasiForm from "../../_shared/observasi_form.vue";

export default {
  name: "layanan_igd_observasi",
  components: { CardRegistrasiIgd, ObservasiForm },
  data() {
    return {
      dataRegistrasi: {},
      registrasiId: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async selectRegistrasi(e) {
      if (e && e.registrasi_id !== undefined) {
        this.dataRegistrasi = e;
        this.registrasiId = e.registrasi_id || "";

        if (!this.registrasiId) return;

        this.loading = true;
        this.errorMessage = "";

        try {
          // CEK 1: Cek apakah assesmen medis sudah ada
          // const assesmenMedis = await this.$_api.list('assesment_medis_igd', {
          //   registrasi_id: e.registrasi_id,
          //   page: 1,
          //   limit: 99999
          // })
          // if (assesmenMedis.data.length === 0) {
          //   this.errorMessage = 'Assesmen medis tidak ditemukan!'
          //   this.$_alert.error({}, 'Assesmen medis tidak ditemukan!')
          //   this.dataRegistrasi = {}
          //   this.registrasiId = ''
          //   return
          // }
          // const dataAssesmenMedis = assesmenMedis.data[0]
          // // CEK 2: Cek apakah assesmen medis sudah divalidasi
          // if (dataAssesmenMedis.is_validasi === false) {
          //   this.errorMessage = 'Assesmen medis belum divalidasi!'
          //   this.$_alert.error({}, 'Assesmen medis belum divalidasi!')
          //   this.dataRegistrasi = {}
          //   this.registrasiId = ''
          //   return
          // }
          // // Jika semua cek OK, tampilkan form observasi
          // console.log('Assesmen medis valid, menampilkan form observasi')
        } catch (error) {
          console.error("Error checking assesmen medis:", error);
          this.errorMessage = "Gagal memvalidasi data assesmen medis";
          this.$_alert.error({}, "Gagal memvalidasi data assesmen medis");
          this.dataRegistrasi = {};
          this.registrasiId = "";
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
