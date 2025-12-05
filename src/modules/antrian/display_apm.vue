<template>
  <div class="w-100 h-100 container mt-6 d-flex align-items-center justify-content-center bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 25%; background-image: url(&quot;https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/humans/custom-10.svg&quot;);">
    <!-- <div data-v-74396468="" class="flex-grow-1 p-20 pb-40 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 50%; background-image: url(&quot;https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/humans/custom-10.svg&quot;);"> -->

      <div class="w-100">
        <b-row class="mb-4">
          <b-col>
            <b-button @click="backStep" variant="outline-primary" v-if="step != step_pilih_jenis_pasien">
              <i class="ri-arrow-left-line"></i> Kembali
            </b-button>
          </b-col>
          <b-col cols="6" class="text-center">
            <h1><strong>Anjungan</strong></h1>
            <h1><strong>Pendaftaran Mandiri</strong></h1>
          </b-col>
          <b-col></b-col>
        </b-row>
  
        <div v-if="step == step_pilih_jenis_pasien">
          <div>
            <div class="d-flex flex-row justify-content-center gap-10" style="width: 100%; margin-bottom: 10px">
              <div>
                <b-card @click="selectJenisPasien(pasien_baru)" style="width: 20rem;border: 1px solid #cecece;"
                  class="mb-0 text-center cursor-pointer card-select-jenis-pasien">
                  <h3 class="mb-4"><strong>Pasien Baru</strong></h3>
                  <b-card-text>
                    Untuk pasien yang data diri <strong class="text-danger">belum terdaftar</strong>.
                  </b-card-text>
                </b-card>
              </div>
              <div>
                <b-card @click="selectJenisPasien(pasien_baru)" style="width: 20rem;border: 1px solid #cecece;"
                  class="mb-0 text-center cursor-pointer card-select-jenis-pasien">
                  <h3 class="mb-4"><strong>Pasien Lama</strong></h3>
                  <b-card-text>
                    Untuk pasien yang data diri <strong class="text-success">sudah terdaftar</strong>.
                  </b-card-text>
                </b-card>
              </div>
              
              <!-- <div>
                <b-card @click="selectJenisPasien(pasien_lama)" style="width: 20rem;border: 1px solid #cecece;"
                  class="mb-0 text-center cursor-pointer card-select-jenis-pasien">
                  <h3 class="mb-4"><strong>Pasien Lama</strong></h3>
                  <b-card-text>
                    Untuk pasien yang data diri <strong class="text-success">sudah terdaftar</strong>.
                  </b-card-text>
                </b-card>
              </div> -->
            </div>
            <div class="d-flex flex-row justify-content-center" style="width: 100%">
              <div>
                <b-card @click="selectJenisPasien(pasien_baru)" style="width: 40rem; border: 1px solid #cecece;"
                  class="mb-0 text-center cursor-pointer card-select-jenis-pasien">
                  <h3 class="mb-4"><strong>Pasien Lama BPJS</strong></h3>
                  <b-card-text>
                    Untuk pasien yang data diri <strong class="text-success">sudah terdaftar pada BPJS</strong>.
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </div>
          <!-- <div class="flex flex-row" @click="selectJenisPasien(pasien_baru)">
          <b-button variant="outline-primary" size='lg' style='width:100%'>Pasien Baru</b-button>
        </div> -->
          <!-- <div class="flex flex-row mt-2" @click="selectJenisPasien(pasien_lama)">
          <b-button variant="outline-primary" size='lg' style='width:100%'>Pasien Lama</b-button>
        </div> -->
        </div>
  
        <div v-if="step == step_pilih_poli">
          <div class="poliklinik-container" style="max-height: 60vh; overflow-y: auto; padding: 1rem; border-radius: 5px;">
            <b-row class="p-0">
              <b-col cols="6" md="4" v-for="(poliklinik, index) in listPoliklinik" :key="index" class="flex flex-row" style="margin-bottom: 1rem"
                @click="selectPoliklinik(poliklinik.value)">
                <div style="background-color: white;">
                  <b-button variant="outline-primary" size='lg'
                    style='width:100%; height: 100px; font-size: 1.5rem;'>{{ poliklinik.text }}</b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
  
        <InputRM v-if="step == step_input_rm" class="text-center mb-2 mx-auto" @sendDetailPasien="getDetailPasien"
          :no_rm_param="no_rm" />
  
  
        <div v-if="step == step_pilih_jadwal">
  
          <b-table :items='listJadwal' :fields='fields' :current-page='table.currentPage' :per-page='table.perPage'
            show-empty hover class='bg-light'>
            <template #cell(actions)='item'>
              <b-button variant='success' @click='selectJadwal(item)'>Pilih Jadwal</b-button>
            </template>
          </b-table>
        </div>
  
        <!-- MODAL -->
        <b-modal id='modal-receiveAntrian' ref='modal' title='Selesai Antrian' size='md' centered hide-footer hide-header>
          <h2 class='text-center' style='margin-bottom:10px;'>{{ callback_title }} <strong
              class="h1">{{ antrian_no }}</strong>
          </h2>
          <p class='text-center h6' style="font-weight: normal;">{{ callback_message }}.</p>
          <div>
            <b-row>
              <b-col cols='12' lg='12' md='12' class='mt-2'>
                <b-button variant='outline-danger' size='lg' style='width:100%'
                  @click='closeModalAPMLoket()'>Tutup</b-button>
              </b-col>
            </b-row>
          </div>
        </b-modal>
  
        <b-modal id='modal-konfirmasiJadwal' ref='modal' title='Selesai Antrian' size='md' centered hide-footer hide-header>
          <h2 class='text-center' style='margin-bottom:10px;'>Konfirmasi jadwal terpilih</h2>
          <div v-if="!!detail_jadwal">
            <b-row>
              <b-col cols='5' lg='5' md='5' class='mt-2'>
                Waktu Mulai
              </b-col>
              <b-col cols='7' lg='7' md='7' class='mt-2'>
                : {{ detail_jadwal.waktu_mulai }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols='5' lg='5' md='5' class='mt-2'>
                Waktu Selesai
              </b-col>
              <b-col cols='7' lg='7' md='7' class='mt-2'>
                : {{ detail_jadwal.waktu_selesai }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols='5' lg='5' md='5' class='mt-2'>
                Nama Dokter
              </b-col>
              <b-col cols='7' lg='7' md='7' class='mt-2'>
                : {{ detail_jadwal.nama_dokter }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols='5' lg='5' md='5' class='mt-2'>
                Jenis Kelamin
              </b-col>
              <b-col cols='7' lg='7' md='7' class='mt-2'>
                : {{ detail_jadwal.jk_dokter }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols='5' lg='5' md='5' class='mt-2'>
                Poliklinik
              </b-col>
              <b-col cols='7' lg='7' md='7' class='mt-2'>
                : {{ nama_poliklinik }}
              </b-col>
            </b-row>
            <b-row class='mt-6'>
              <b-col cols='12' lg='12' md='12'>
                <h6>Apakah anda yakin ingin memilih jadwal ini?</h6>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols='4' lg='4' md='4' class='mt-2'>
                <b-button variant='outline-danger' size='lg' style='width:100%' @click='closeModalAPMUmum()'>Jadwal
                  lain</b-button>
              </b-col>
              <b-col cols='8' lg='8' md='8' class='mt-2'>
                <b-button variant='success' size='lg' style='width:100%' @click='konfirmasiJadwal()'>Ya</b-button>
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <b-row>
              <b-col cols='12' lg='12' md='12' class='mt-2'>
                <b-button variant='outline-danger' size='lg' style='width:100%'
                  @click='closeModalAPMUmum()'>Tutup</b-button>
              </b-col>
            </b-row>
          </div>
        </b-modal>
      </div>
      
      <!-- CETAK ANTRIAN -->
      <div style="position: relative; display: none;" id="cetak_antrian_loket">
        <section class="content-print paper-58">
          <div class="sheet">
            <div class="w-100">
              <h6 style="text-align: center;"><strong>RSUD BUTON SELATAN</strong></h6>
              <h6 style="font-size: 10pt;text-align: center;">Jl. Gajah mada Kec.Batauga Kab.Buton Selatan</h6>
  
              <h6 style="font-size: 50px;text-align: center;margin-top: 5mm;"><strong>{{ antrian_no }}</strong></h6>
              <h6 style="text-align: center;margin-bottom: 5mm;">LOKET</h6>
              <h6 style="text-align: center;font-size: 10pt;margin-top: 5mm;">{{ tglnya }}</h6>
              <h6 style="text-align: center;font-size: 10pt;">Sisa Antrian : {{ sisa_antrian }}</h6>
            </div>
          </div>
        </section>
      </div>
  
      <div style="position: relative; display: none;" id="cetak_antrian_poli">
        <section class="content-print paper-58">
          <div class="sheet">
            <div class="w-100">
              <h6 style="text-align: center;"><strong>RSUD BUTON SELATAN</strong></h6>
              <h6 style="font-size: 10pt;text-align: center;">Jl. Gajah mada Kec.Batauga Kab.Buton Selatan</h6>
  
              <h6 style="font-size: 50px;text-align: center;margin-top: 5mm;"><strong>{{ antrian_no }}</strong></h6>
              <h6 style="text-align: center;margin-bottom: 5mm;">{{ nama_poli }}</h6>
              <h6 style="text-align: center;font-size: 10pt;margin-top: 5mm;">{{ tglnya }}</h6>
              <h6 style="text-align: center;font-size: 10pt;">Sisa Antrian : {{ sisa_antrian }}</h6>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import InputRM from '../antrian/apm/input_rm.vue'
import print from '../../components/print.js';
moment.locale('id')

export default {
  name: 'display_apm',
  components: {
    InputRM
  },
  data() {
    return {
      config: 'abc',
      ms_poliklinik_id: '',
      nama_poliklinik: '',
      jenis_pasien: '',
      pasien_lama: 1,
      pasien_baru: 2,
      tgl_antrian: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      tglnya: moment(new Date()).format('LL'),
      initial_poli: '',
      status_antrian_loket: 1,
      jenis_antrian_id: 1,
      booking_id: null,
      listPoliklinik: [],
      poli_layanan: 1,
      poli_layanan_loket: 1,
      poli_layanan_umum: 2,
      kode_jenis_antrian_rajal: 'J',
      step: 1,
      step_pilih_jenis_pasien: 1,
      step_input_rm: 2,
      step_pilih_poli: 3,
      step_pilih_jadwal: 4,
      title: 'Anjungan Pendaftaran Mandiri',
      detail_pasien: [],
      no_rm: '',
      antrian_no: '',
      listJadwal: [],
      detail_jadwal: [],
      room: 'antrian_loket',
      testData: 'test',
      callback_title: 'NO. ANTREAN ANDA:',
      callback_message: 'Harap tunggu hingga giliran antrean Anda tiba',
      nama_poli: '',
      sisa_antrian: '',
      fields: [
        {
          key: 'waktu_mulai',
          label: 'Waktu Mulai',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'waktu_selesai',
          label: 'Waktu Selesai',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'nama_dokter',
          label: 'Nama Dokter',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'jk_dokter',
          label: 'JK Dokter',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'quota',
          label: 'Quota Keseluruhan',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'quota_jkn',
          label: 'Quota JKN',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'quota_booking',
          label: 'Quota Booking',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'actions',
          label: 'Aksi',
          class: 'table-option-2 text-center'
        }
      ],
      table: [{
        items: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
      }],
    };
  },
  computed: {
  },
  mounted() {
    this.$socket.emit('joinRoom', 'antrian_loket')
    this.getData()
  },
  methods: {
    selectJenisPasien(jenis_pasien) {
      this.jenis_pasien = jenis_pasien;

      if (this.jenis_pasien == this.pasien_baru) {
        this.simpanAntrian()
      } else {
        this.step = this.step_input_rm
      }
    },
    selectPoliklinik(ms_poliklinik_id) {
      this.ms_poliklinik_id = ms_poliklinik_id;
      this.$_api.post('msPoliklinik/detailsById', { id: ms_poliklinik_id }).then((poli) => {
        let x = poli.data[0]
        this.initial_poli = x.kode_poliklinik
        this.nama_poliklinik = x.nama_poliklinik
        this.title = `Pilih Jadwal Dokter Tersedia (${this.nama_poliklinik})`
        // vm.listPoli = poli.data
        console.log(poli, 'ini poli by id')
      })
      this.step = this.step_pilih_jadwal
      this.getJadwal()
    },
    selectJadwal(detail_jadwal) {
      this.detail_jadwal = detail_jadwal.item
      this.$bvModal.show('modal-konfirmasiJadwal')
      console.log(detail_jadwal, 'ini detail jadwal');
    },
    getData() {
      this.getMsPoliklinik()
      this.getJenisAntrianRawatJalan()
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
    getJenisAntrianRawatJalan() {
      this.$_api.post('jenisAntrian/list', { kode_jenis_antrian: this.kode_jenis_antrian_rajal }).then((jenisAntrian) => {
        for (let i = 0; i < jenisAntrian.data.length; i++) {
          let x = jenisAntrian.data[i]
          this.jenis_antrian_id = x.id

          // vm.listPoli = jenisAntrian.data
          console.log(jenisAntrian, 'ini list jenis antrian')
        }
      })
    },
    getJadwal() {
      this.$_api.post('jadwalDokter/listJadwalDokterByMsPoliId', {
        ms_poliklinik_id: this.ms_poliklinik_id,
        tanggal: this.tgl_antrian
      }).then((res) => {
        this.listJadwal = res.data
        console.log(res, 'ini res jadwal by poli id')
      })
      console.log('get jadwal');
    },
    getMsPoliklinikByMsPoli() {
      this.$_api.post('msPoliklinik/list', { id: this.detail_jadwal.ms_poliklinik_id }).then((poli) => {
        let x = poli.data[0]
        this.initial_poli = x.kode_poliklinik
      })
    },
    simpanAntrian() {
      if (this.jenis_pasien == this.pasien_baru) {
        this.$socket.emit('registerApmLoket', {
          tgl_antrian: this.tgl_antrian,
          poli_layanan: this.poli_layanan_loket,
          initial: this.kode_jenis_antrian_rajal,
          status_antrian: this.status_antrian_loket,
          jenis_antrian_id: this.jenis_antrian_id,
          booking_id: this.booking_id
        }, this.room)
        this.resetRegistrasi()
      }
    },
    konfirmasiJadwal() {
      this.poli_layanan = 2
      console.log('save jadwal');
      this.$socket.emit('registerApmUmum', {
        tgl_antrian: this.tgl_antrian,
        // poli_layanan: this.poli_layanan_umum,
        poli_layanan: 1,
        initial: this.initial_poli,
        status_antrian: this.status_antrian_loket,
        jenis_antrian_id: this.jenis_antrian_id,
        booking_id: this.booking_id,
        jadwal_dokter_id: this.detail_jadwal.jadwal_dokter_id,
        no_identitas_registrasi: this.detail_pasien.nik,
        no_hp_registrasi: this.detail_pasien.sc_whatsapp,
        no_asuransi_registrasi: this.detail_pasien.no_asuransi_pasien,
        no_kontrol: null,
        keterangan_registrasi: null,
        ms_jenis_layanan_id: this.detail_jadwal.ms_jenis_layanan_id,
        pasien_id: this.detail_pasien.pasien_id,
        ms_dokter_id: this.detail_jadwal.ms_dokter_id,
        ms_spesialis_id: this.detail_jadwal.ms_specialist_id,
        ms_asuransi_id: this.detail_pasien.ms_asuransi_id
      }, this.room)
      this.resetRegistrasi()
      this.$bvModal.hide('modal-konfirmasiJadwal')
    },
    backStep() {
      if (this.step != 1) {
        this.step -= 1
      }
    },
    closeModalAPMLoket() {
      this.$bvModal.hide('modal-receiveAntrian')
    },
    closeModalAPMUmum() {
      this.$bvModal.hide('modal-konfirmasiJadwal')
    },
    getDetailPasien(detail_pasien, no_rm) {
      this.detail_pasien = detail_pasien
      this.no_rm = no_rm
      this.step = this.step_pilih_poli
    },
    resetRegistrasi() {
      this.step = this.step_pilih_jenis_pasien
      this.detail_pasien = []
      this.no_rm = ''
      this.detail_jadwal = [],
        this.no_antrian = ''
      this.poli_layanan = 1
    },
    async cetakLoket(x){
      // if(x == this.data_print){
      //   await this.$htmlToPaper("resep_sederhana");
      // }
      const options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
        '/style-paper-58mm.css',
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }
      // console.log(x);
      // await this.$htmlToPaper(x, options);
      print(x, options);
    },
    async cetakPoli(x){
      // if(x == this.data_print){
      //   await this.$htmlToPaper("resep_sederhana");
      // }
      const options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
        '/style-paper-58mm.css',
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }
      // console.log(x);
      // await this.$htmlToPaper(x, options);
      print(x, options);
    },
  },
  watch: {
    step(newVar, oldVar) {
      console.log(newVar, 'ini new var');
      if (newVar == this.step_input_rm) {
        this.title = 'Cek identitas pasien'
      } else if (newVar == this.step_pilih_poli) {
        this.title = 'Pilih poliklinik'
      } else if (newVar == this.step_pilih_jenis_pasien) {
        this.title = 'Pendaftaran Pasien'
      }
    },
    antrian_no(newVar, oldVar) {
      console.log(newVar, 'ini new var');
      if (newVar) {
        this.callback_message = 'Harap tunggu hingga giliran antrean Anda tiba.'
      }
    },
  },
  created() {
    this.$socket.off('refresh_apm_loket')
    this.$socket.on('refresh_apm_loket', (callback) => {
      console.log(callback, 'ini cb refresh_apm_loket');
      if (callback.status == 200) {
        this.callback_title = 'NO. ANTREAN ANDA:'
        this.antrian_no = `${callback.data.initial}${callback.data.antrian_no}`
        this.sisa_antrian = callback.data.sisa_antrian
        setTimeout(() => {
          this.cetakLoket('cetak_antrian_loket')
        }, 2000);
      } else {
        this.antrian_no = ''
        this.callback_title = 'Gagal Mendapatkan Antrian'
        this.callback_message = callback.message
      }
      this.$bvModal.show('modal-receiveAntrian')
      setTimeout(() => {
        this.$bvModal.hide('modal-receiveAntrian')
      }, 2000);
    })
    this.$socket.off('refresh_register_apm')
    this.$socket.on('refresh_register_apm', (callback) => {
      console.log(callback, 'ini refresh_register_apm')
      if (callback.status == 200) {
        this.callback_title = 'NO. ANTREAN ANDA:'
        this.antrian_no = `${callback.data.initial}${callback.data.antrian_no}`
        this.sisa_antrian = callback.data.sisa_antrian
        this.nama_poli = callback.data.nama_poliklinik
        setTimeout(() => {
          this.cetakPoli('cetak_antrian_poli')
        }, 2000);
      } else {
        this.antrian_no = ''
        this.callback_title = 'Gagal Mendapatkan Antrian'
        this.callback_message = callback.message
      }
      this.$bvModal.show('modal-receiveAntrian')
      setTimeout(() => {
        this.$bvModal.hide('modal-receiveAntrian')
      }, 2000);
    })
    this.$socket.off('error')
    this.$socket.on('error', (callback) => {
      console.log(callback, 'ini error')
      this.callback_title = 'Gagal Mendapatkan Antrian'
      this.callback_message = callback.message
      this.$bvModal.show('modal-receiveAntrian')
    })
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

.h-screen {
  height: 100vh;
}

.w-screen {
  width: 100vw;
}

.w-lg {
  width: 100%;
}
.poliklinik-container {
  max-height: 60vh;
  overflow-y: auto;
  background-color: #f8f9fa;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
}

.poliklinik-container::-webkit-scrollbar {
  width: 8px;
}

.poliklinik-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.poliklinik-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 8px;
}

.poliklinik-container::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>
