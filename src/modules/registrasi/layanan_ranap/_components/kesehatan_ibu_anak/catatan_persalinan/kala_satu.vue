<template>
  <div>
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Temuan Pada Fase Laten
          </template>
          <b-form-input
            type="text"
            v-model="kala_satu.temuan_fase_laten"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Perlu Intervensi
          </template>
          <b-form-radio-group
            id=""
            v-model="kala_satu.perlu_intervensi"
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
            Partograf Melewati Garis Waspada
          </template>
          <b-form-radio-group
            id=""
            v-model="kala_satu.partograf_melewati_garis_waspada"
          >
            <b-form-radio value="Ya" class="mt-1">
              <span >Ya</span>
            </b-form-radio>
            <b-form-radio value="Tidak">
              <span>Tidak</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Penatalaksanaan Masalah
          </template>
          <b-form-input
            type="text"
            v-model="kala_satu.penatalaksanaan_masalah"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
           Hasilnya
          </template>
          <b-form-input
            type="text"
            v-model="kala_satu.hasilnya"
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
  name: 'kala_i',
  components: {
  },
  data() {
    return {
      kala_i: {
        temuan_fase_laten: null,
        perlu_intervensi: null,
        partograf_melewati_garis_waspada: null,
        penatalaksanaan_masalah: null,
        hasilnya: null,
      }
    }
  },
  props: {
    kala_satu: {
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
