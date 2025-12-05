<template>
  <div>
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Berat Badan
          </template>
          <b-form-input
            type="text"
            v-model="bayi_lahir.berat_badan"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Panjang Badan
          </template>
          <b-form-input
            type="text"
            v-model="bayi_lahir.panjang_badan"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Jenis Kelamin
          </template>
          <b-form-radio-group
            id=""
            v-model="bayi_lahir.jenis_kelamin"
          >
            <b-form-radio value="Laki-laki" class="mt-1">
              <span >Laki-laki</span>
            </b-form-radio>
            <b-form-radio value="Perempuan">
              <span>Perempuan</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Penilaian Bayi Baru Lahir
          </template>
          <b-form-radio-group
            id=""
            v-model="bayi_lahir.penilaian_bayi"
          >
            <b-form-radio value="Ya" class="mt-1">
              <span >Baik</span>
            </b-form-radio>
            <b-form-radio value="Tidak">
              <span>Ada Penyulit</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Bayi Lahir
          </template>
          <b-form-select v-model="bayi_lahir.bayi_lahir" :options="kondisi_bayi_lahir"></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tindakan
          </template>
          <b-form-checkbox-group 
            id=""
            v-model="bayi_lahir.tindakan"
            class="mt-1"
          >
            <b-form-checkbox value="Mengeringkan">Mengeringkan</b-form-checkbox>
            <b-form-checkbox value="Menghangatkan">Menghangatkan</b-form-checkbox>
            <b-form-checkbox value="Rangsang Taktil">Rangsang Taktil</b-form-checkbox>
            <b-form-checkbox value="Pakaian/Selimut Bayi">Pakaian/Selimut Bayi</b-form-checkbox>
            <b-form-checkbox value="Tindakan Pencegahan Infeksi Mata">Tindakan Pencegahan Infeksi Mata</b-form-checkbox>
          </b-form-checkbox-group>
          <!-- <b-form-radio-group
            id=""
            v-model="bayi_lahir.tindakan"
          >
            <b-form-radio value="Mengeringkan" class="mt-1">
              <span >Mengeringkan</span>
            </b-form-radio>
            <b-form-radio value="Menghangatkan">
              <span>Menghangatkan</span>
            </b-form-radio>
            <b-form-radio value="Rangsang_Taktil">
              <span>Rangsang Taktil</span>
            </b-form-radio>
            <b-form-radio value="Pakaian">
              <span>Pakaian/Selimut Bayi</span>
            </b-form-radio>
            <b-form-radio value="tindakan_pencegahan">
              <span>Tindakan Pencegahan Infeksi Mata</span>
            </b-form-radio>
          </b-form-radio-group> -->
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="6" xl="6" >
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pemberian ASI
          </template>
          <b-form-radio-group
            id=""
            v-model="bayi_lahir.pemberian_asi"
          >
            <b-form-radio value="Baik" class="mt-1">
              <span >Baik</span>
            </b-form-radio>
            <b-form-radio value="Ada Penyulit">
              <span>Ada Penyulit</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
           Alasan
          </template>
          <b-form-input
            placeholder="Alasan Tidak Memberi ASI"
            v-model="bayi_lahir.alasan"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
           Masalah Lain
          </template>
          <b-form-input
            v-model="bayi_lahir.masalah_lain"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
           Hasil
          </template>
          <b-form-input
            placeholder="Hasil"
            v-model="bayi_lahir.hasilnya"
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
  name: 'bayi_lahir',
  components: {
  },
  data() {
    return {
      kondisi_bayi_lahir: [
        {value: "Normal", text: "Normal"},
        {value: "Asfiksia", text: "Asfiksia"},
        {value: "Hipotermia", text: "Hipotermia"},
        {value: "Cacat Bawaan", text: "Cacat Bawaan"},
      ],
      bayi_baru_lahir: {
        berat_badan: null,
        panjang_badan: null,
        jenis_kelamin: null,
        penilaian_bayi: null,
        bayi_lahir: null,
        tindakan: [],
        pemberian_asi: null,
        alasan: null,
        masalah_lain: null,
        hasilnya: null,
      }
    }
  },
  props: {
    bayi_lahir: {
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
  }
}
</script>

