<template>
  <div id="page-antenatal">
    <b-card>
        <b-row>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                <h6 class="custom-title">Data Pemeriksaan Resiko Ibu Hamil</h6>
            </b-col>
        </b-row>
        <b-row>
            <!-- <b-col cols="12" sm="12" md="12" lg="3" xl="2">
                <label>ID Antenatal</label>
                <b-form-input type="text" placeholder="Otomatis" disabled></b-form-input>
            </b-col> -->
            <!-- <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                <label>Tanggal </label>
                <b-form-input type="text" placeholder="Otomatis" disabled></b-form-input>
            </b-col> -->
            <!-- <b-col cols="12" sm="12" md="12" lg="3" xl="4">
                <label>Nama Pasien </label>
                <b-form-input type="text" placeholder="Otomatis" disabled v-model="kunjungan.nama_lengkap"></b-form-input>
            </b-col> -->
            <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                <label>Tribulan Ke - </label>
                <b-form-input type="text" placeholder="Otomatis" disabled v-model="tribulan"></b-form-input>
            </b-col>
        </b-row>

        <b-row style="margin-top:30px">
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                <h6 class="custom-title">Skrining/Deteksi Dini Ibu Resiko Tinggi</h6>
            </b-col>
        </b-row>

        <b-row >
            <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="custom-table-kspr">
                <b-table-simple class="table-sm">
                    <b-thead>
                        <b-tr>
                            <b-th>No</b-th>
                            <b-th>Masalah / Faktor Resiko</b-th>
                            <b-th>Skor</b-th>
                            <b-th>Tribulan Ke - {{ tribulan }}</b-th>
                        </b-tr>
                    </b-thead>

                    <b-tbody>
                        <b-tr>
                            <b-td>&nbsp;</b-td>
                            <b-td>Skor Awal Ibu Hamil</b-td>
                            <b-td style="text-align:center">2</b-td>
                            <b-td></b-td>
                        </b-tr>
                        <b-tr v-for="(item, idx) in skrining" :key="idx" :class="item.background">
                            <b-td>{{ item.no }}</b-td>
                            <b-td>{{ item.faktor_resiko }}</b-td>
                            <b-td style="text-align:center">{{ item.skor }}</b-td>
                            <b-td>
                                <b-form-checkbox
                                    v-model="item.tribulan"
                                    :value="true"
                                    :unchecked-value="false"
                                    @change="set_jumlah(item)"
                                    >
                                </b-form-checkbox>
                            </b-td>
                        </b-tr>

                        <b-tr>
                            <b-td>&nbsp;</b-td>
                            <b-td colspan="2"><strong>JUMLAH SKOR</strong></b-td>
                            <b-td><strong>{{ jumlah_skor }}</strong></b-td>
                            
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h4><b :class="kelas">{{ resiko }}</b></h4>
            </b-col>
        </b-row>
        <b-row style="margin-top: 15px;">
            <b-col cols="12" sm="12" md="12" lg="12">
            <div style="width:100%;display: flex;justify-content: flex-end;">
                <b-button v-if="update" @click="updateData()" :disabled="busy" variant="warning" class="mr-2">Update</b-button>
                <b-button v-else @click="simpanData()" :disabled="busy" variant="success">Simpan</b-button>
                <!-- <b-button :disabled="busy" @click="simpanData()" variant="success" class="mr-2">Simpan</b-button> -->
            </div>
            </b-col>
        </b-row>
    </b-card>
    
  </div>
</template>
<script>
export default {
  components:{
  },
//   props: [
//   'dataAnamnesa',
//   'kunjungan',
//   ],
	props: {
    assesmen: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    mData: {
      type: Object,
      required: true,
      default () {
        return {
        }
      }
    }
  },
  data() {
    return {
      skrining: [
        {no: 1, faktor_resiko: "Terlalu muda, hamil <= 16 th", skor: 4, tribulan: false, background:"putih"},
        {no: 2, faktor_resiko: "a. Terlalu lambat hamil I kawin >= 4 Th", skor: 4, tribulan: false, background:"putih"},
        {no: null, faktor_resiko: "b. Terlalu tua hamil I >= 35 Th", skor: 4, tribulan: false, background:"putih"},
        {no: 3, faktor_resiko: "Terlalu cepat hamil lagi (<2 th)", skor: 4, tribulan: false, background:"putih"},
        {no: 4, faktor_resiko: "Terlalu lama hamil lagi (>= 10 th)", skor: 4, tribulan: false, background:"putih"},
        {no: 5, faktor_resiko: "Terlalu banyak anak, 4/lebih", skor: 4, tribulan: false, background:"putih"},
        {no: 6, faktor_resiko: "Terlalu tua, umur >=35 Th", skor: 4, tribulan: false, background:"putih"},
        {no: 7, faktor_resiko: "Terlalu pendek <= 145 cm", skor: 4, tribulan: false, background:"putih"},
        {no: 8, faktor_resiko: "Pernah gagal kehamilan", skor: 4, tribulan: false, background:"putih"},
        {no: 9, faktor_resiko: "Pernah Melahirkan dengan. a. Tarikan Tang/Vakum", skor: 4, tribulan: false, background:"putih"},
        {no: null, faktor_resiko: "b. Uri dirogoh", skor: 4, tribulan: false, background:"putih"},
        {no: null, faktor_resiko: "Diberi infus/Transfusi", skor: 4, tribulan: false, background:"putih"},
        {no: 10, faktor_resiko: "Pernah Operasi Sesar", skor: 8, tribulan: false, background:"merah"},
        {no: 11, faktor_resiko: "a. Kurang Darah / Malaria", skor: 4, tribulan: false, background:"kuning"},
        {no: null, faktor_resiko: "b. TBC Parud / Payah Jantung", skor: 4, tribulan: false, background:"kuning"},
        {no: null, faktor_resiko: "c. Kencing Manis (Diabetes)", skor: 4, tribulan: false, background:"kuning"},
        {no: null, faktor_resiko: "d. Penyakit Menular Seksual", skor: 4, tribulan: false, background:"kuning"},
        {no: 12, faktor_resiko: "Bengkak pada muka/tungkai dan tekanan darah tinggi", skor: 4, tribulan: false, background:"kuning"},
        {no: 13, faktor_resiko: "Hamil kembar 2 atau lebih", skor: 4, tribulan: false, background:"kuning"},
        {no: 14, faktor_resiko: "Hamil kembar air (Hydramnion)", skor: 4, tribulan: false, background:"kuning"},
        {no: 15, faktor_resiko: "Bayi mati dalam kandungan", skor: 4, tribulan: false, background:"kuning"},
        {no: 16, faktor_resiko: "Kehamilan lebih bulan", skor: 4, tribulan: false, background:"kuning"},
        {no: 17, faktor_resiko: "Letak Sungsang", skor: 8, tribulan: false, background:"merah"},
        {no: 18, faktor_resiko: "Letak Lintang", skor: 8, tribulan: false, background:"merah"},
        {no: 19, faktor_resiko: "Pendarahan dalam kehamilan ini", skor: 8, tribulan: false, background:"merah"},
        {no: 20, faktor_resiko: "Pre-eklampsia berat/Kejang-kejang", skor: 8, tribulan: false, background:"merah"},
      ],
      jumlah_skor: 2,
      resiko: null,
      kelas: null,
      busy: false,
      update: false,
      kspr_id: null,
    }
  },
  computed: {
    tribulan(){
      if (this.assesmen.kia && this.assesmen.kia.pemeriksaan_bidan && this.assesmen.kia.pemeriksaan_bidan.tanggal_hpht) {
        const hpht = this.assesmen.kia.pemeriksaan_bidan.tanggal_hpht;
        const selisihMinggu = this.$moment().diff(this.$moment(hpht), 'weeks');
        console.log('selisihMinggu', selisihMinggu)
        if (selisihMinggu >= 1 && selisihMinggu <= 12) {
          return "1";
        } else if (selisihMinggu >= 13 && selisihMinggu <= 27) {
          return "2";
        } else if (selisihMinggu >= 28 && selisihMinggu <= 40) {
          return "3";
        } else {
          this.$_alert.error({}, 'Di luar rentang kehamilan yang valid')
          return "-";
        }
      } else {
        return '-'
      }
    },
    // antenatal_id(){
    //     return this.$store.state.antenatal_id
    // }
  },
  watch: {
    // antenatal_id(newVal, oldVal){
    //     if(newVal != oldVal){
    //         if(newVal){
    //             this.getData()
                
    //         }
    //     }
    // },
    // kunjungan(newVal, oldVal){
    //     if(newVal != oldVal){
    //         this.getData()
            
    //     }
    // },
  },
	mounted() {
		console.log('INIT KSPR', this.mData)

		for (let item of this.skrining) {
			const s = this.mData.skrining.filter((x) => x.faktor_resiko === item.faktor_resiko)
			if(s.length) item.tribulan = s[0].tribulan
			else item.tribulan = false
		}

		this.set_jumlah()
	},
  methods: {
    set_jumlah(){
        let vm = this
        vm.jumlah_skor = 2
        for (let i = 0; i < vm.skrining.length; i++) {
            let x = vm.skrining[i];
            if(x.tribulan == true){
                vm.jumlah_skor += x.skor
            }
        }
        if(vm.jumlah_skor < 6){
            vm.kelas = 'ijo'
            vm.resiko = "Kehamilan Resiko Rendah (KRR)."
        }else if(vm.jumlah_skor <= 10){
            vm.kelas = 'yellow'
            vm.resiko = "Kehamilan Resiko Tinggi (KRT)."
        }else if(vm.jumlah_skor >= 10){
            vm.kelas = 'red'
            vm.resiko = "Kehamilan Resiko Sangat Tinggi (KRST)."
        }
    },
		simpanData() {
    	console.log('simpanData')
			this.mData.skrining = this.skrining
			this.mData.jumlah_skor = this.jumlah_skor
			this.mData.kelas = this.kelas
			this.mData.resiko = this.resiko
			this.$parent.$parent.$parent.updateAssesmenTambahan();
		},
    // async getData(){
    //   let vm = this
    //   try {
    //     let detail = await vm.$axios.post("/kspr/list", {
    //       pemeriksaan_antenatal_id: vm.antenatal_id
    //     })
    //     // console.log(detail, 'ini kspr');
    //     if(detail.data.status == 200 && detail.data.data.length){
    //         vm.update = true
    //         let data = detail.data.data[0]
    //         vm.kspr_id = data.kspr_id
    //         if(data.skrining){
    //             vm.skrining = data.skrining
    //         }
    //         if(data.poin_risiko){
    //             vm.jumlah_skor = data.poin_risiko
    //             if(this.jumlah_skor < 6){
    //                 this.kelas = 'ijo'
    //                 this.resiko = "Kehamilan Resiko Rendah (KRR)."
    //             }else if(this.jumlah_skor <= 10){
    //                 this.kelas = 'yellow'
    //                 this.resiko = "Kehamilan Resiko Tinggi (KRT)."
    //             }else if(this.jumlah_skor >= 10){
    //                 this.kelas = 'red'
    //                 this.resiko = "Kehamilan Resiko Sangat Tinggi (KRST)."
    //             }
    //         }
    //     }
    //   } catch (error) {
    //       console.log(error)
    //   }
    // },
    // simpanData(){
    //     let vm = this
    //     vm.busy = true
    //     let datanya = {}
    //     datanya.triwulan_ke = vm.tribulan
    //     datanya.skrining = vm.skrining
    //     datanya.tanggal_kspr = vm.$moment(new Date()).format("YYYY-MM-DD HH:mm")
    //     datanya.poin_risiko = vm.jumlah_skor
    //     datanya.pemeriksaan_antenatal_id = vm.antenatal_id
    //     // console.log(datanya, 'datanya');
    //     vm.$axios.post("/kspr/register", datanya)
    //     .then((res) => {
    //         // console.log(res, 'ini responya ui');
    //         if(res.data.status == 200 && res.data.message == "sukses"){
    //             vm.busy = false
    //             vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
    //             vm.getData()
    //         }else {
    //             vm.busy = false
    //             vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
    //         }
    //     })
    //     .catch((err) => {
    //         vm.busy = false
    //         vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
    //     })
    // },
    // updateData(){
    //     let vm = this
    //     vm.busy = true
    //     let datanya = {}
    //     datanya.triwulan_ke = vm.tribulan
    //     datanya.skrining = vm.skrining
    //     datanya.tanggal_kspr = vm.$moment(new Date()).format("YYYY-MM-DD HH:mm")
    //     datanya.poin_risiko = vm.jumlah_skor
    //     datanya.pemeriksaan_antenatal_id = vm.antenatal_id
    //     datanya.id = vm.kspr_id
    //     // console.log(datanya, 'datanya');
    //     vm.$axios.post("/kspr/register", datanya)
    //     .then((res) => {
    //         console.log(res, 'ini responya ui');
    //         if(res.data.status == 200 && res.data.message == "sukses"){
    //             vm.busy = false
    //             vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL UPDATE DATA", showing: true})
    //             vm.getData()
    //         }else {
    //             vm.busy = false
    //             vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
    //         }
    //     })
    //     .catch((err) => {
    //         vm.busy = false
    //         vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
    //     })
    // }
  },
}
</script>

<style scoped>
.random-card .card{
  background-color: #FAFAFA;
  border:1px solid #D3D3D3
}
.merah{
    background-color: red;
    color: #FAFAFA;
}
.kuning{
    background-color: orange;
    color: #FAFAFA;
}
.putih{
    background-color: #FAFAFA;
}
.card-integrasi-prog .card-body{
  padding:10px;
}
.ijo{
    color: green;
}
.yellow{
    color: orange;
}
.red{
    color: red;
}
.card-integrasi-prog-sub .card-body{
  padding:1.25rem;
}


.custom-table-kspr th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
}

.custom-table-kspr th, td{
 border:1px solid #F1F1F1 !important
}

.custom-table-kspr th:nth-child(1) {
  border-top-left-radius: 8px;
}

.custom-table-kspr th:nth-child(4) {
  border-top-right-radius: 8px;
}

</style>