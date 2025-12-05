<template>
  <div>
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal
          </template>
          <b-form-datepicker
            style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            no-flip
            right
            locale="id"
            v-model="catatan_persalinan.tanggal_catatan"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Nama Bidan
          </template>
          <b-form-input
            type="text"
            v-model="catatan_persalinan.nama_bidan"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tempat Persalinan
          </template>
          <b-form-select v-model="catatan_persalinan.tempat_persalinan" :options="tmpt_persalinan"></b-form-select>
        </b-form-group>
        
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Alamat Tempat Persalinan
          </template>
          <b-form-input
            type="text"
            v-model="catatan_persalinan.alamat_tempat_persalinan"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Rujuk Kala
          </template>
          <b-form-select v-model="catatan_persalinan.rujuk_kala" :options="ruju_kala_satu"></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Alasan Rujukan
          </template>
          <b-form-input
            type="text"
            v-model="catatan_persalinan.alasan_rujukan"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tempat Rujukan
          </template>
          <b-form-input
            type="text"
            v-model="catatan_persalinan.tempat_rujukan"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pendamping Saat Merujuk
          </template>
          <b-form-select v-model="catatan_persalinan.pendamping_saat_merujuk" :options="pendamping_rujuk"></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Masalah dalam Kehamilan
          </template>
          <b-form-select v-model="catatan_persalinan.masalah_dalam_kehamilan" :options="masalah_kehamilan"></b-form-select>
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
  name: 'catatan_persalinan',
  components: {
  },
  data() {
    return {
      tmpt_persalinan: [
        {value: "Rumah Bidan", text: "Rumah Bidan"},
        {value: "Rumah Ibu", text: "Rumah Ibu"},
        {value: "Polindes", text: "Polindes"},
        {value: "Puskesmas", text: "Puskesmas"},
        {value: "Klinik Swasta", text: "Klinik Swasta"},
        {value: "Rumah Sakit", text: "Rumah Sakit"},
        {value: "Lainnya", text: "Lainnya"},
      ],
      ruju_kala_satu: [
        {value: "-", text: "-"},
        {value: "I", text: "I"},
        {value: "II", text: "II"},
        {value: "III", text: "III"},
        {value: "IV", text: "IV"},
        {value: "Lainnya", text: "Lainnya"},
      ],
      pendamping_rujuk: [
        {value: "Tidak Ada", text: "Tidak Ada"},
        {value: "Bidan", text: "Bidan"},
        {value: "Dukun", text: "Dukun"},
        {value: "Teman", text: "Teman"},
        {value: "Keluarga", text: "Keluarga"},
        {value: "Suami", text: "Suami"},
      ],
      masalah_kehamilan: [
        {value: "Tidak Ada", text: "Tidak Ada"},
        {value: "Gawat Darurat", text: "Gawat Darurat"},
        {value: "Infeksi", text: "Infeksi"},
        {value: "Pendarahan", text: "Pendarahan"},
        {value: "PMTCT", text: "PMTCT"},
        {value: "HDK", text: "HDK"},
      ],
      // catatan: {
      //   tanggal_catatan: null,
      //   nama_bidan: null,
      //   tempat_persalinan: null,
      //   alamat_tempat_persalinan: null,
      //   rujuk_kala: null,
      //   alasan_rujukan: null,
      //   tempat_rujukan: null,
      //   pendamping_saat_merujuk: null,
      //   masalah_dalam_kehamilan: null
      // }
    }
  },
  props: {
    catatan_persalinan: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  mounted(){
    // this.getData()
  },
  methods: {
    // getData(){
    //   let vm = this
    //   vm.$axios.post("/catatan_persalinan/list", {partograf_id:vm.partograf_id})
    //   .then((res) => {
    //     if(res.data.data.length){
    //       // console.log(res, 'ini catatan');
    //       // vm.catatan = res.data.data[0].catatan
    //       if(res.data.data[0].catatan){
    //         vm.catatan = res.data.data[0].catatan
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
    //   })
    // },
    // simpan(){
    //   let vm = this
    //   vm.$axios.post("/catatan_persalinan/register", {
    //     partograf_id: vm.partograf_id,
    //     catatan: vm.catatan,
    //   })
    //   .then((res) => {
    //     // console.log(res, 'ini responya ui');
    //     if(res.data.status == 200 && res.data.message == "sukses"){
    //       vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
    //     }
    //     else{
    //       vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
    //     }
    //   })
    //   .catch((err) => {
    //     vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
    //   })
    // },
  }
}
</script>

