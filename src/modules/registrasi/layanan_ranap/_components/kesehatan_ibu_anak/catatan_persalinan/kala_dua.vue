<template>
  <div>
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Episiotomi
          </template>
          <b-form-radio-group id="" v-model="kala_dua.episiotomi">
            <b-form-radio value="Ya" class="mt-1">
              <span>Ya</span>
            </b-form-radio>
            <b-form-radio value="Tidak">
              <span>Tidak</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pendampingan Persalinan
          </template>
          <b-form-select v-model="kala_dua.pendamping_persalinan" :options="pendamping_persalinan"></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Gawat Janin
          </template>
          <b-form-select v-model="kala_dua.gawat_janin" :options="gawat_janin"></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tindakan
          </template>
          <b-form-input type="text" v-model="kala_dua.tindakan"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Distorsia Bahu
          </template>
          <b-form-radio-group id="" v-model="kala_dua.distorsia_bahu">
            <b-form-radio value="Ya" class="mt-1">
              <span>Ya</span>
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
          <b-form-input type="text" v-model="kala_dua.tindakan_bahu"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Masalah Lain
          </template>
          <b-form-input placeholder="Masalah lain yang terkait" type="text"
            v-model="kala_dua.masalah_lain"></b-form-input>
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
  name: 'kala_ii',
  components: {
  },
  data() {
    return {
      pendamping_persalinan: [
        { value: "Tidak Ada", text: "Tidak Ada" },
        { value: "Bidan", text: "Bidan" },
        { value: "Dukun", text: "Dukun" },
        { value: "Teman", text: "Teman" },
        { value: "Keluarga", text: "Keluarga" },
        { value: "Suami", text: "Suami" },
      ],
      gawat_janin: [
        { value: "Tidak Ada", text: "Tidak Ada" },
        { value: "Ya", text: "Ya" },
        { value: "Pemantauan DDJ Setiap 5-10 menit", text: "Pemantauan DDJ Setiap 5-10 menit" },
      ],
      kala_ii: {
        episiotomi: null,
        pendamping_persalinan: null,
        gawat_janin: null,
        tindakan: null,
        distorsia_bahu: null,
        tindakan_bahu: null,
        masalah_lain: null,
      }
    }
  },
  props: {
    kala_dua: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  mounted() {
    // this.getData()
  },
  methods: {
  }
}
</script>

  