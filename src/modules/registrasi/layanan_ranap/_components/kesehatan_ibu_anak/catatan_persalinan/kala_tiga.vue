<template>
  <div>
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Inisiasi Menyusui Dini
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.inisiasi_menyusui_dini"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_inisiasi"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Lama Kala III
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.lama_kala_iii"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Pemberian Oksitosin
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.pemberian_oksitosin"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_pemberian"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Waktu Oksitosin
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.waktu_oksitosin"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Pemberian Ulang Oksitosin
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.pemberian_ulang"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_pemberian_ulang"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Waktu Ulang Oksitosin
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.waktu_ulang"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Masase Fundus Uteri
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.masase_fundus_uteri"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_masase"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Penegangan Tali Pusar
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.penegangan_tali"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_penegangan_tali"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Plasenta Lahir Lengkap
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.plasenta_lahir_lengkap"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Tindakan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.tindakan_plasenta"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Plasenta Tidak Lahir  > 30 menit
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.plasenta_tidak_lahir"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_plasenta_tidak_lahir"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Laserisasi
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.laserisasi"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Jika Laserisasi Parenium, derajat
            </template>
            <b-form-select v-model="kala_tiga.laserisasi_parenium" :options="laserisasi_parenium"></b-form-select>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Tindakan
            </template>
            <b-form-select v-model="kala_tiga.tindakan_laserisasi" :options="tindakan_laserisasi"></b-form-select>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Atoni Uteri
            </template>
            <b-form-radio-group
              id=""
              v-model="kala_tiga.atoni_uteri"
            >
              <b-form-radio value="Ya" class="mt-1">
                <span >Ya</span>
              </b-form-radio>
              <b-form-radio value="Tidak">
                <span>Tidak</span>
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Alasan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.alasan_atoni_uteri"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Pendarahan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.pendarahan"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Masalah Penatalaksanaan
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.masalah_penatalaksanaan"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="4">
            <template v-slot:label>
              Hasilnya
            </template>
            <b-form-input
            type="text"
            v-model="kala_tiga.hasilnya"
            ></b-form-input>
          </b-form-group>
        </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <!-- <b-button @click="simpan()" variant="primary">Simpan</b-button> -->
      </b-col>
    </b-row>
  </div>  
</template>

<script>


export default {
  name: 'kala_iii',
  components: {
  },
  data() {
    return {
      laserisasi_parenium: [
        {value: 1, text: "1"},
        {value: 2, text: "2"},
        {value: 3, text: "3"},
        {value: 4, text: "4"},
      ],
      tindakan_laserisasi: [
        {value: "Penjahitan Dengan Anestesi", text: "Penjahitan Dengan Anestesi"},
        {value: "Penjahitan Tanpa Anestesi", text: "Penjahitan Tanpa Anestesi"},
        {value: "Tidak Dijahit", text: "Tidak Dijahit"},
      ],
      kala_iii: {
        inisiasi_menyusui_dini: null,
        alasan_inisiasi: null,
        lama_kala_iii: null,
        pemberian_oksitosin: null,
        alasan_pemberian: null,
        waktu_oksitosin: null,
        pemberian_ulang: null,
        alasan_pemberian_ulang: null,
        waktu_ulang: null,
        masase_fundus_uteri: null,
        alasan_masase: null,
        penegangan_tali: null,
        alasan_penegangan_tali: null,
        plasenta_lahir_lengkap: null,
        tindakan_plasenta: null,
        plasenta_tidak_lahir: null,
        alasan_plasenta_tidak_lahir: null,
        laserisasi: null,
        laserisasi_parenium: null,
        tindakan_laserisasi: null,
        atoni_uteri: null,
        alasan_atoni_uteri: null,
        pendarahan: null,
        masalah_penatalaksanaan: null,
        hasilnya: null,
      },
      
    }
  },
  props: {
    kala_tiga: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  mounted(){
  },
  methods: {
  }
}
</script>

