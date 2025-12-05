<template>
  <div id="page-pengamatan-nifas">
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <!-- <b-button variant="success" class="mr-2">Buat Baru Kehamilan</b-button> -->
          <!-- <b-button variant="success">Cetak Kartu Ibu</b-button> -->
        </div>
      </b-col>
    </b-row>
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Data Pengamatan Nifas</h6>
      </b-col>

      <!-- <b-col cols="12" sm="12" md="3" lg="3">
        <label>ID </label>
        <b-form-input type="text" placeholder="Otomatis" disabled></b-form-input>
      </b-col>

      <b-col cols="12" sm="12" md="3" lg="3">
        <label>Tanggal</label>
        <b-form-input type="text" placeholder="Otomatis" disabled v-model="mData.tanggal_pengamatan_nifas"></b-form-input>
      </b-col> -->

      <b-col cols="12" sm="12" md="6" lg="6">
        <label>Nama Pasien</label>
        <b-form-input type="text" placeholder="Otomatis" disabled v-model="mData.nama_pasien"></b-form-input>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Pemeriksaan PNC</h6>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal
          </template>
          <b-form-datepicker
            style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            v-model="mData.pemeriksaan_pnc.tanggal_pnc"
            no-flip
            locale="id"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            TD
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
              type="text"
              class="custom-input-text"
              v-model="mData.pemeriksaan_pnc.tekanan_darah"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>mmHg</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Suhu
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
              type="text"
              class="custom-input-text"
              v-model="mData.pemeriksaan_pnc.suhu"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6><sup>o</sup>C</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Komplikasi
          </template>
          <b-form-select
            :options="option_komplikasi_nifas"
            v-model="mData.pemeriksaan_pnc.komplikasi"
            placeholder="-- Pilih --"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Resp Rate
          </template>
          <b-form-input
            type="text"
            v-model="mData.pemeriksaan_pnc.respirasi"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Heart Rate
          </template>
          <b-form-input
            type="text"
            v-model="mData.pemeriksaan_pnc.nadi"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pendarahan Pervaginam
          </template>
          <b-form-textarea
            v-model="mData.pemeriksaan_pnc.pendarahan_pervaginam"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Kondisi Perineum
          </template>
          <b-form-textarea
            v-model="mData.pemeriksaan_pnc.kondisi_perineum"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Kontraksi Uteri
          </template>
          <b-form-textarea
            v-model="mData.pemeriksaan_pnc.kontraksi_uteri"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pemeriksaan Jalan Lahir
          </template>
          <b-form-textarea
            v-model="mData.pemeriksaan_pnc.pemeriksaan_jalan_lahir"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pemeriksaan Payudara
          </template>
          <b-form-textarea
            type="text"
            v-model="mData.pemeriksaan_pnc.pemeriksaan_payudara"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Produksi ASI
          </template>
          <b-form-textarea
            v-model="mData.pemeriksaan_pnc.produksi_asi"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Penanganan Resiko Tinggi dan Komplikasi pada Nifas
          </template>
          <b-form-textarea
            v-model="mData.pemeriksaan_pnc.penanganan_resiko"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Buang Air Besar (BAB)
          </template>
          <b-form-input
            type="text"
            v-model="mData.pemeriksaan_pnc.buang_air_besar"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Buang Air Kecil
          </template>
          <b-form-input
            type="text"
            v-model="mData.pemeriksaan_pnc.buang_air_kecil"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Hari ke - / KF
          </template>
          <b-form-input
            type="text"
            v-model="mData.pemeriksaan_pnc.hari_ke"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Catatan Dibuku KIA
          </template>
          <b-form-radio-group
            id=""
            v-model="mData.pemeriksaan_pnc.catatan_dibuku"
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
            FE (Tab/Botol)
          </template>
          <b-form-input
            type="text"
            v-model="mData.pemeriksaan_pnc.fe"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Vit.a<sup>*</sup>
          </template>
          <b-form-radio-group
            id=""
            class="mt-1"
            v-model="mData.pemeriksaan_pnc.vit_a"
          >
            <b-form-radio value="Ya">
              <span>Ya</span>
            </b-form-radio>
            <b-form-radio value="Tidak">
              <span>Tidak</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Rujukan
          </template>
          <b-form-select
            :options="option_rujukan_nifas"
            v-model="mData.pemeriksaan_pnc.rujukan"
            placeholder="-- Pilih --"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <h6 class="custom-title">Integrasi Program</h6>
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            ART +/-
          </template>
          <b-form-radio-group
            id=""
            class="mt-1"
            v-model="mData.integrasi_program.art"
          >
            <b-form-radio value="Plus">
              <span>Plus (+)</span>
            </b-form-radio>
            <b-form-radio value="Minus">
              <span>Minus (-)</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Anti Malaria<sup>***</sup>
          </template>
          <b-form-input
            v-model="mData.integrasi_program.anti_malaria"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Anti TBC<sup>**</sup>
          </template>
          <b-form-input
            v-model="mData.integrasi_program.anti_tbc"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Foto Thorax
          </template>
          <b-form-radio-group
            id=""
            class="mt-1"
            v-model="mData.integrasi_program.foto_thorax"
          >
            <b-form-radio value="Plus">
              <span>Plus (+)</span>
            </b-form-radio>
            <b-form-radio value="Minus">
              <span>Minus (-)</span>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            CD4 (komplikasi)
          </template>
          <b-form-input
            v-model="mData.integrasi_program.cd4"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Keadaan Tiba
          </template>
          <b-form-select
            :options="option_tiba_nifas"
            v-model="mData.integrasi_program.keadaan_tiba"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Keadaan Pulang
          </template>
          <b-form-select
            :options="option_pulang_nifas"
            v-model="mData.integrasi_program.keadaan_pulang"
            size="sm"
          ></b-form-select>
        </b-form-group>
        
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <h6 class="custom-title">Metode Kontrasepsi</h6>
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Metode Kontrasepsi
          </template>
          <b-form-select
            :options="option_metode_kontra_nifas"
            v-model="mData.metode_kontrasepsi.metode"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Rencana
          </template>
          <b-form-datepicker
            style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            no-flip
            v-model="mData.metode_kontrasepsi.rencana"
            locale="id"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pelaksanaan
          </template>
          <b-form-datepicker
            style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            no-flip
            v-model="mData.metode_kontrasepsi.pelaksanaan"
            locale="id"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <b-button variant="light" style="margin-right:10px">Reset</b-button>
          <b-button v-if="update" @click="updateData()" :disabled="busy" variant="warning" class="mr-2">Update</b-button>
          <b-button v-else @click="simpanData()" :disabled="busy" variant="success">
            <b-spinner v-if="busy" variant="light" label="Spinning"></b-spinner>
            <span v-else>Simpan</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>

export default {
  components:{
  
  },
  // props: [
  // 'dataAnamnesa',
  // 'kunjungan',
  // ],
  props: {
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
      option_komplikasi_nifas: [
        {value: "PPP", text: "PPP"},
        {value: "Infeksi", text: "Infeksi"},
        {value: "HDK", text: "HDK"},
        {value: "Lainnya", text: "Lainnya"},
      ],
      option_rujukan_nifas: [
        {value: "Puskesmas", text: "Puskesmas"},
        {value: "RB", text: "RB"},
        {value: "RSIA/RSB", text: "RSIA/RSB"},
        {value: "RS", text: "RS"},
        {value: "Lainnya", text: "Lainnya"},
      ],
      option_metode_kontra_nifas: [
        {value: "IUD", text: "IUD"},
        {value: "MOP", text: "MOP"},
        {value: "MOW", text: "MOW"},
        {value: "Metode Amenore Laktasi", text: "Metode Amenore Laktasi"},
        {value: "Kondom", text: "Kondom"},
        {value: "Implant", text: "Implant"},
        {value: "Sutikan", text: "Sutikan"},
        {value: "Pil", text: "Pil"},
        {value: "Konseling", text: "Konseling"},
      ],
      option_tiba_nifas: [
        {value: "Hidup", text: "Hidup"},
        {value: "Mati", text: "Mati"},
      ],
      option_pulang_nifas: [
        {value: "Hidup", text: "Hidup"},
        {value: "Mati", text: "Mati"},
      ],
      pemeriksaan_pnc: {
        tekanan_darah: null,
        tanggal_pnc: null,
        suhu: null,
        komplikasi: null,
        respirasi: null,
        nadi: null,
        pendarahan_pervaginam: null,
        kondisi_perineum: null,
        kontraksi_uteri: null,
        pemeriksaan_jalan_lahir: null,
        pemeriksaan_payudara: null,
        produksi_asi: null,
        penanganan_resiko: null,
        buang_air_besar: null,
        buang_air_kecil: null,
        hari_ke: null,
        catatan_dibuku: null,
        fe: null,
        vit_a: null,
        rujukan: null,
      },
      integrasi_program: {
        art: null,
        anti_malaria: null,
        anti_tbc: null,
        foto_thorax: null,
        cd4: null,
        keadaan_tiba: null,
        keadaan_pulang: null
      },
      metode_kontrasepsi: {
        metode: null,
        rencana: null,
        pelaksanaan: null,
      },
      tanggal_pengamatan_nifas: null,
      nama_pasien: null,
      busy: false,
      update: false,
      nifas_id: null,
      data_anamnesa: null,
    }
  },
  computed: {
    kia_id(){
      return this.$store.state.kia_id
    },
  },
  watch: {
    kunjungan(newVal, oldVal){
      if(newVal != oldVal){
        // console.log(this.dataAnamnesa, 'agduawgbgukcfagsukchbasikkhcdawwgbduka');
        this.nama_pasien = this.kunjungan.nama_lengkap
      }
    },
    kia_id(newVal, oldVal){
      if(newVal != oldVal){
        if(newVal){
          this.getData()
        }
      }
    },
    dataAnamnesa: {
      handler(data) {
        const vm = this
        // console.log(data, 'brrrrrrrrrrrrrrrrrrrrrrrrr');
        vm.data_anamnesa = data
        vm.pemeriksaan_pnc.suhu = data.suhu
        vm.pemeriksaan_pnc.respirasi = data.resp_rate
        vm.pemeriksaan_pnc.tekanan_darah = `${data.sistole}/${data.diastole}`
        vm.pemeriksaan_pnc.nadi = data.heart_rate
      },
       deep: true
    },
  },
  methods: {
    simpanData() {
      console.log('simpanData')
      this.$parent.$parent.updateAssesmenTambahan();
    },
    simpan(){
      let vm = this
      let datanya = {}
      vm.busy = true
      datanya.pemeriksaan_pnc = vm.pemeriksaan_pnc
      datanya.integrasi_program = vm.integrasi_program
      datanya.metode_kontrasepsi = vm.metode_kontrasepsi
      datanya.tanggal_pengamatan_nifas = vm.tanggal_pengamatan_nifas
      datanya.kia_id = vm.$store.state.kia_id
      console.log(datanya);
      vm.$axios.post("/pengamatan_nifas/register", datanya)
      .then((res) => {
        // console.log(res, 'ini responya ui');
        if(res.data.status == 200 && res.data.message == "sukses"){
          vm.busy = false
          vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
          vm.getData()
        }
        else{
          vm.busy = false
          vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
        }
      })
      .catch((err) => {
        vm.busy = false
        vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
      })
    },
    updateData(){
      let vm = this
      let datanya = {}
      vm.busy = true
      datanya.pemeriksaan_pnc = vm.pemeriksaan_pnc
      datanya.integrasi_program = vm.integrasi_program
      datanya.metode_kontrasepsi = vm.metode_kontrasepsi
      datanya.tanggal_pengamatan_nifas = vm.tanggal_pengamatan_nifas
      datanya.kia_id = vm.$store.state.kia_id
      datanya.id = vm.nifas_id
      console.log(datanya);
      vm.$axios.post("/pengamatan_nifas/register", datanya)
      .then((res) => {
        // console.log(res, 'ini responya ui');
        if(res.data.status == 200 && res.data.message == "sukses"){
          vm.busy = false
          vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL UPDATE DATA", showing: true})
          vm.getData()
        }
        else{
          vm.busy = false
          vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
        }
      })
      .catch((err) => {
        vm.busy = false
        vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
      })
    },
    async getData(){
      let vm = this
      try {
        if(vm.$store.state.kia_id != null){
          let detail = await vm.$axios.post("/pengamatan_nifas/list", {
          kia_id: vm.$store.state.kia_id
        })
          // console.log(detail, 'ini nifas');
          if(detail.data.status == 200 && detail.data.data.length){
              let data = detail.data.data[0]
              vm.update = true
              vm.nifas_id = data.pengamatan_nifas_id
              if(data.pemeriksaan_pnc){
                  vm.pemeriksaan_pnc = data.pemeriksaan_pnc
              }
              if(data.integrasi_program){
                  vm.integrasi_program = data.integrasi_program
              }
              if(data.metode_kontrasepsi){
                  vm.metode_kontrasepsi = data.metode_kontrasepsi
              }
              if(data.tanggal_pengamatan_nifas){
                  vm.tanggal_pengamatan_nifas = this.$moment(data.tanggal_pengamatan_nifas).format("YYYY-MM-DD HH:mm")
              }
          }
        }
        
      } catch (error) {
          console.log(error)
      }
    },
    resetData(){
      let vm = this
      vm.pemeriksaan_pnc = {
        tanggal_pnc: null,
        komplikasi: null,
        pendarahan_pervaginam: null,
        kondisi_perineum: null,
        kontraksi_uteri: null,
        pemeriksaan_jalan_lahir: null,
        pemeriksaan_payudara: null,
        produksi_asi: null,
        penanganan_resiko: null,
        buang_air_besar: null,
        buang_air_kecil: null,
        hari_ke: null,
        catatan_dibuku: null,
        fe: null,
        vit_a: null,
        rujukan: null,
      }
      vm.integrasi_program = {
        art: null,
        anti_malaria: null,
        anti_tbc: null,
        foto_thorax: null,
        cd4: null,
        keadaan_tiba: null,
        keadaan_pulang: null
      }
      vm.metode_kontrasepsi = {
        metode: null,
        rencana: null,
        pelaksanaan: null,
      }
      vm.tanggal_pengamatan_nifas = null
      vm.pemeriksaan_pnc.suhu = vm.data_anamnesa.suhu
      vm.pemeriksaan_pnc.respirasi = vm.data_anamnesa.resp_rate
      vm.pemeriksaan_pnc.tekanan_darah = `${vm.data_anamnesa.sistole}/${vm.data_anamnesa.diastole}`
      vm.pemeriksaan_pnc.nadi = vm.data_anamnesa.heart_rate
    }
  },
}
</script>

<style scoped>
.table-radio-text-check table tr, td{
  border:none !important
}
</style>