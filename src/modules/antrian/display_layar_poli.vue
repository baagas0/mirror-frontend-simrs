<template>
  <div>
    <div v-if="listPoliklinik.length === 0" class="text-center m-auto d-flex align-content-center flex-wrap">

      <div class="text-end bg-primary p-6 text-light" style="width:100%; text-align: right !important;">
        <h2>{{ tgl_antrian_id }}</h2>
      </div>
      <div class="mx-auto w-lg">
        <b-row class="mb-4 mt-6">
          <b-col>
            <b-button @click="backStep" variant="outline-primary" v-if="step != step_pilih_poliklinik">
              <i class="ri-arrow-left-line"></i> Kembali
            </b-button>
          </b-col>
          <b-col cols="6">
            <h1><strong>{{ title }}</strong></h1>
            <h5>Silahkan pilih poli untuk melihat antrian</h5>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
    </div>
    <div v-else class="text-center m-auto d-flex align-content-center flex-wrap">

      <div class="d-flex justify-content-between align-items-center flex-wrap bg-primary p-6 text-light"
        style="width:100%">
        <b-button @click="backStep" variant="outline-light" class="text-light" v-if="step != step_pilih_poliklinik">
          <i class="ri-arrow-left-line text-light"></i> Kembali
        </b-button>
        <h2 class="ml-auto">{{ tgl_antrian_id }}</h2>
      </div>
      <div class="mx-auto w-lg">
        <b-col cols="12" v-if="step == step_pilih_poliklinik" class="mt-6">
          <h1><strong>{{ title }}</strong></h1>
          <h5>Silahkan pilih poli untuk melihat antrian</h5>
        </b-col>

        <div v-if="step == step_pilih_poliklinik" class="mx-auto w-lg p-6">

          <div class="d-flex flex-row justify-content-center" style="width: 100%">
            <b-row class="p-0">
              <b-col cols="6" md="4" v-for="(poliklinik, index) in listPoliklinik" :key="index" class="flex flex-row"
                @click="selectPoliklinik(poliklinik.value)">
                <div style="background-color: white;">
                  <b-button variant="outline-primary" size='lg' style='width:100%; height: 100px; font-size: 1.5rem;'>
                    <h2>{{ poliklinik.text }}</h2>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>

        </div>

        <div v-if="step == step_display_antrian" class="p-8">
          <div class="p-0 row row justify-content-around align-items-start">
            <div class="col-6 border border-primary p-0" style="background-color: white">
              <b-row class="d-flex justify-content-center align-items-center flex-wrap p-4">
                <h1>Daftar Antrian</h1>
              </b-row>
              <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" show-empty striped
                hover class="bg-light" head-variant="dark">
                <template #cell(actions)="item" class="p-0">
                  <b-button variant="success" class="" :disabled="sedang_proses" @click="update(item.item)">
                    Pilih
                  </b-button>
                </template>
              </b-table>
            </div>
            <div class="col-5 border border-primary" style="background-color: white">
              <b-row class="d-flex justify-content-center align-items-center flex-wrap p-4">
                <h1>Poli <strong>{{ nama_poliklinik }}</strong></h1>
              </b-row>
              <b-row>
                <div class="col-6 border-right border-light bg-primary text-light p-4">
                  <h1>Nomor Antrian</h1>
                </div>
                <div class="col-6 bg-primary text-light p-4">
                  <h1>Sisa Antrian</h1>
                </div>
              </b-row>
              <b-row>
                <div class="col-6 border-right border-primary bg-light p-4 py-8">
                  <h1 style="font-size: 8rem;">{{ callback_refresh_layar.antrian_no }}</h1>
                </div>
                <div class="col-6 bg-light p-4 py-8">
                  <h1 style="font-size: 8rem;">{{ totalRows }}</h1>
                </div>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'display_layar_poli',
  data() {
    return {
      config: 'display_layar_poli',
      ms_poliklinik_id: '',
      nama_poliklinik: '',
      tgl_antrian_id: moment(new Date()).format('dddd, DD MMMM YYYY'),
      tgl_antrian: moment(new Date()).format('YYYY-MM-DD'),
      initial_poli: '',
      status_antrian_loket: 1,
      listPoliklinik: [],
      step: 1,
      step_pilih_poliklinik: 1,
      step_display_antrian: 2,
      title: 'Display Antrian Poli',
      room: 'antrian_loket',
      callback_refresh_layar: {
        antrian_no: '-',
        sisa_antrian: '-',
        nama_dokter: '',
        nama_layanan_ruang: '',
      },
      room_id: 'antrian_loket',
      status_antrian: {
        dibuat: 1,
        proses: 2,
        selesai: 9
      },
      poli_layanan: {
        loket: 1,
        poli: 2,
        layanan: 3,
        farmasi: 4,
        kasir: 5,
      },
      listAntrianDibuat: [],
      listAntrianProses: [],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      itemsProses: [],
      totalRowsProses: 1,
      currentPageProses: 1,
      perPageProses: 15,
      tableBusy: false,
      fields: [
        {
          key: 'no_antrian',
          label: 'No. Antrian',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-center h3 display-4',
          variant: 'light'
        },

        {
          key: 'nama_lengkap',
          label: 'Nama Pasien',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left h3 display-4',
          variant: 'light'
        },
      ],
      called_antrian_id: '',
      listAntrianSelesai: [],
      intervalWaktu: null,
      waktu: 0,
      sedang_manggil: false,
      antrian_aktif: {
        no_proses: '-',
        loketnya: '-',
        initial: '',
        antrian_no: '',
        nama_poliklinik: '',
      },
    };
  },
  computed: {
  },
  mounted() {
    // this.$socket.emit('joinRoom', 'antrian_loket')
    this.getData()
  },
  methods: {
    selectPoliklinik(ms_poliklinik_id) {
      this.ms_poliklinik_id = ms_poliklinik_id;
      this.$_api.post('msPoliklinik/detailsById', { id: ms_poliklinik_id }).then((poli) => {
        let x = poli.data[0]
        this.initial_poli = x.kode_poliklinik
        this.nama_poliklinik = x.nama_poliklinik
        this.ms_poliklinik_id = x.id
        // vm.listPoli = poli.data
        this.$socket.emit('joinRoom', this.ms_poliklinik_id)
        this.getAntrianList()
        console.log(poli, 'ini poli by id')
      })
      this.step = this.step_display_antrian
    },
    getData() {
      this.getMsPoliklinik()
    },
    getMsPoliklinik() {
      this.$_api.post('msPoliklinik/list').then((poli) => {
        for (let i = 0; i < poli.data.length; i++) {
          let x = poli.data[i]
          let y = {}
          y.text = x.nama_poliklinik
          y.value = x.id

          this.listPoliklinik.push(y)
        }
        // vm.listPoli = poli.data
        console.log(poli, 'ini list poli')
      })
    },
    backStep() {
      if (this.step != 1) {
        this.step -= 1
      }
    },
    resetRegistrasi() {
      this.step = this.step_pilih_poliklinik
    },
    getAntrianList() {
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: this.tgl_antrian,
          status_antrian: this.status_antrian.dibuat,
          poli_layanan: this.poli_layanan.poli,
          ms_poliklinik_id: this.ms_poliklinik_id,
        })
        .then((res) => {
          this.items = res.data
          for (let i = 0; i < this.items.length; i++) {
            let x = this.items[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
          }
          this.totalRows = this.items.length
          console.log(res, 'ini antrian dibuat list');
        })
        .catch((err) => {
          console.log(err)
        })
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: this.tgl_antrian,
          status_antrian: this.status_antrian.proses,
          poli_layanan: this.poli_layanan.poli,
          ms_poliklinik_id: this.ms_poliklinik_id
        })
        .then((res) => {
          this.itemsProses = res.data
          this.listAntrianProses = res.data[0]

          for (let i = 0; i < this.itemsProses.length; i++) {
            let x = this.itemsProses[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
          }

          this.totalRowsProses = this.itemsProses.length

          console.log(this.listAntrianProses, 'ini list antrian proses');
          if (this.itemsProses.length > 0) {
            this.callback_refresh_layar.antrian_no = this.itemsProses[0].no_antrian
          } else {
            this.getAntrianSelesai()
          }

          console.log(res, 'ini antrian proses list');
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAntrianSelesai() {
      this.$_api.post('antrianList/list', {
        tgl_antrian: this.tgl_antrian,
        status_antrian: this.status_antrian.selesai,
        poli_layanan: this.poli_layanan.poli,
        ms_poliklinik_id: this.ms_poliklinik_id,
      })
        .then((res) => {
          this.listAntrianSelesai = res.data
          for (let i = 0; i < this.listAntrianSelesai.length; i++) {
            let x = this.listAntrianSelesai[i]
            x.no = i + 1
            x.no_antrian = `${x.kode_poliklinik}${x.antrian_no}`
          }
          console.log(res, 'ini antrian selesai list');
          if (this.listAntrianSelesai.length > 0) {
            this.callback_refresh_layar.antrian_no = this.listAntrianSelesai[this.listAntrianSelesai.length - 1].no_antrian
          } else {
            this.callback_refresh_layar.antrian_no = '-'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    panggil(data) {
      // let waktu = this.panggil_suara(this.waktu, this.antrian_aktif.no_proses, 'loket', this.antrian_aktif.loketnya)
      // this.waktu = waktu
      console.log('dipangilllllll---------')
      this.getAntrianDetail(data.id)
    },
    panggil_suara(waktu_mulai = 0, nomor, ke = 'loket', tujuan) {

      this.sedang_manggil = true

      let input = nomor
      let output = ''

      const match = input.match(/([A-Za-z]+)([0-9]+)/);
      const letterPart = match[1];
      const numberPart = parseInt(match[2]);

      output = letterPart + ' ' + this.convertToWords(numberPart);

      if (ke && tujuan) output = output + ` ${ke} ${tujuan}`
      // if (match) {
      //   const letterPart = match[1];
      //   const numberPart = parseInt(match[2]);

      //   output = letterPart + ' ' + this.convertToWords(numberPart);

      //   if (ke && tujuan) output = output + ` ${ke} ${tujuan}`
      // }
      // else {
      //   output = `Format input tidak valid: ${input}`;
      //   this.$_alert.error({}, output)
      //   return
      // }


      let show_error = false
      let waktu = waktu_mulai
      for (const file of output.split(' ')) {
        let filepath = require(`../../assets/sound/sound/${file}.wav`)
        let audio = new Audio(filepath);

        setTimeout(() => {
          audio.play()
            .catch((err) => {
              if (show_error === false) {
                this.$_alert.error({}, 'Error Play', err)
                show_error = true
              }
            })
        }, waktu)
        waktu = waktu + 1200
      }

      setTimeout(() => {
        this.sedang_manggil = false
        // this.sedang_proses = false
      }, (waktu + 500));

      // this.waktu = this.waktu - waktu
      // console.log(`END WAKTU: ${waktu}`)
      return waktu
    },
    convertToWords: function (number) {
      const words = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const teens = ['10', '11', '2 belas', '3 belas', '4 belas', '5 belas', '6 belas', '7 belas', '8 belas', '9 belas'];
      const tens = ['', '10', '2 puluh', '3 puluh', '4 puluh', '5 puluh', '6 puluh', '7 puluh', '8 puluh', '9 puluh'];

      let result = '';

      if (number === 0) {
        return 'nol';
      }

      if (number < 10) {
        result = words[number];
      } else if (number < 20) {
        result = teens[number - 10];
      } else if (number < 100) {
        const tensDigit = Math.floor(number / 10);
        const onesDigit = number % 10;

        result = tens[tensDigit];
        if (onesDigit !== 0) {
          result += ' ' + words[onesDigit];
        }
      } else if (number < 1000) {
        const hundredsDigit = Math.floor(number / 100);
        const remainder = number % 100;

        result = (words[hundredsDigit] == 1 ? 'se' : words[hundredsDigit] + ' ') + 'ratus';
        if (remainder !== 0) {
          result += ' ' + this.convertToWords(remainder);
        }
      } else {
        result = 'angka terlalu besar untuk diubah';
      }

      return result;
    },
    getAntrianDetail(antrian_list_id) {
      console.log('getAntrianDetail', antrian_list_id)
      this.$_api.post('antrianList/list', {
        antrian_list_id: antrian_list_id
      })
        .then((res) => {
          console.log('getAntrianDetail', res.data[0])
          console.log('this.poli_layanan', this.poli_layanan)
          let antrian_detail_response = res.data[0]

          this.antrian_aktif.nama_poliklinik = res.data[0].nama_poliklinik
          this.antrian_aktif.initial = res.data[0].kode_poliklinik
          this.antrian_aktif.antrian_no = res.data[0].antrian_no
          this.antrian_aktif.no_proses = `${this.antrian_aktif.initial}${this.antrian_aktif.antrian_no}`

          if (antrian_detail_response.poli_layanan == this.poli_layanan.poli) {
            console.log('panggil_suara',this.waktu, this.antrian_aktif.no_proses, 'poli', this.antrian_aktif.nama_poliklinik)
            let waktu = this.panggil_suara(this.waktu, this.antrian_aktif.no_proses, 'poli', this.antrian_aktif.nama_poliklinik)
            this.waktu = waktu
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  watch: {
    step(newVar, oldVar) {
      if (newVar == this.step_pilih_poliklinik) {
        this.title = 'Pilih poliklinik'
      } else if (newVar == this.step_display_antrian) {
        this.title = 'Antrian'
      }
    },
  },
  created() {
    this.$socket.off('refresh_pindah_antrian')
    this.$socket.on('refresh_pindah_antrian', (data) => {
      console.log(data, 'refresh pindah antrian')
      this.getAntrianList()
      // this.callback_refresh_layar.antrian_no = data.antrian_no
    }, this.room_id)
    this.$socket.off('refresh_layar')
    this.$socket.on('refresh_layar', (data) => {
      console.log(data, 'refresh layarrrrrrrrrrrr')
      this.callback_refresh_layar.sisa_antrian = data.data.sisa_antrian
      // this.getAntrianList()
      this.getAntrianDetail(data.data.antrian_list_id)
      // this.callback_refresh_layar.antrian_no = data.antrian_no
    }, this.room_id)
    this.$socket.off('refresh_register_apm')
    this.$socket.on('refresh_register_apm', (data) => {
      console.log(data, 'refresh register apm')
      this.getAntrianList()
      // this.callback_refresh_layar.antrian_no = data.antrian_no
    }, this.room_id)
    this.$socket.off('refresh_admin')
    this.$socket.on('refresh_admin', (data) => {
      console.log(data, 'refresh admin')
      // this.getAntrian(data)
      this.getAntrianList()
      this.panggil(data.data)
      // this.callback_refresh_layar.antrian_no = data.antrian_no
    }, this.room_id)
  }
};
</script>

<style scoped>
.card-select-jenis-pasien {
  cursor: pointer;
}

.card-select-jenis-pasien:hover {
  background-color: #e0f2fc;
  transition: all 0.25s;
}

.w-screen {
  width: 100vw;
}

.w-lg {
  width: 100%;
}

.fs-5 {
  font-size: 5rem;
}
</style>
