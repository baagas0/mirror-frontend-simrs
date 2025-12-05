<template>
  <div>
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Kondisi Ibu KU
          </template>
          <b-form-input
            placeholder="Kondisi Ibu KU"
            type="text"
            v-model="kala_empat.kondisi_ibu"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tekanan Darah 
          </template>
          <div style="width: 100%;display: flex;justify-content:space-between">
            <div style="width:49%">
              <b-form-input
                placeholder="mm"
                v-model="kala_empat.sistole"
                type="number"
                ></b-form-input>
            </div>
            <div style="width:49%">
              <b-form-input
              placeholder="Hg"
              v-model="kala_empat.diastole"
                type="number"
                ></b-form-input>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Nadi
          </template>
          <b-form-input
            placeholder="x/menit"
            v-model="kala_empat.nadi"
            type="number"
          ></b-form-input>
        </b-form-group>
        
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pernapasan
          </template>
          <b-form-input
            placeholder="x/menit"
            v-model="kala_empat.pernapasan"
            type="number"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Masalah dan Penatalaksanaan
          </template>
          <b-form-input
            placeholder="x/menit"
            v-model="kala_empat.masalah_penatalaksanaan"
            type="text"
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
  name: 'App',
  components: {
  },
  data() {
    return {
      kala_iv: {
        kondisi_ibu: null,
        sistole: null,
        diastole: null,
        nadi: null,
        pernapasan: null,
        masalah_penatalaksanaan: null,
      }
    }
  },
  props: {
    kala_empat: {
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

