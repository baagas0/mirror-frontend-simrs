<template lang="">
  <b-container fluid>
    <div class="row items-center w-max self-center">
      <b-col cols='12' lg='12' md='12' class="flex flex-col gap-4 mx-auto">
        <b-form-input v-model="no_rm" placeholder="Masukkan no rekam medis / KTP anda" style='font-size:2rem'/>
        <div class="mt-3">
          <div class="row">
            <div v-for="number in numbers" :key="number" class="col-4 mb-4">
              <b-button @click="appendNumber(number)" variant="primary" class="w-100" style='height: 5rem; font-size:2rem'>
                {{ number }}
              </b-button>
            </div>
          </div>
          <div class="row mb-8">
            <div class="col-8">
              <b-button @click="appendNumber(0)" variant="primary" class="w-100" style='height: 5rem; font-size:2rem'>
                0
              </b-button>
            </div>
            <div class="col-4">
              <b-button @click="backspace" variant="danger" class="w-100" style='height: 5rem; font-size:2rem'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
              </b-button>
            </div>
          </div>
        </div>
        <b-button variant='success' size='lg' style='width:100%; font-size:2rem' @click="getDataPasien(no_rm)">Cek Data</b-button>
      </b-col>
    </div>
    <!-- MODAL -->
    <b-modal id='modal-konfirmasiIdentitas' ref='modal' title='Selesai Antrian' size='md' centered hide-footer hide-header>
      <h2 class='text-center' style='margin-bottom:10px;'>{{title}}</h2>
      <div v-if="!!detail_pasien">
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            No RM
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.no_rm }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            NIK
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.nik }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Nama
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.nama_lengkap }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Jenis Kelamin
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.jenis_kelamin }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Tanggal Lahir
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : <span v-if="detail_pasien.tgl_lahir">{{ moment(detail_pasien.tgl_lahir).format('LL') }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Umur
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : <span v-if="detail_pasien.tgl_lahir">{{ moment(detail_pasien.tgl_lahir).fromNow().split(' ')[0] }} Tahun</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Alamat Pasien
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.alamat_sekarang }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            No HP
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.sc_whatsapp }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            No Telepon
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.no_telepon }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Nama Penanggung
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.nama_penjamin }}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='5' lg='5' md='5' class='mt-2'>
            Hub. Penanggung
          </b-col>
          <b-col cols='7' lg='7' md='7' class='mt-2'>
            : {{ detail_pasien.hubungan_penjamin }}
          </b-col>
        </b-row>
        <b-row class='mt-6'>
          <b-col cols='12' lg='12' md='12'>
            <h6>Apakah data identitas diatas milik anda?</h6>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='4' lg='4' md='4' class='mt-2'>
            <b-button variant='outline-danger' size='lg' style='width:100%' @click='resetDetailPasien()'>Bukan</b-button>
          </b-col>
          <b-col cols='8' lg='8' md='8' class='mt-2'>
            <b-button variant='success' size='lg' style='width:100%' @click='konfirmasi()'>Ya</b-button>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col cols='12' lg='12' md='12' class='mt-2'>
            <b-button variant='outline-danger' size='lg' style='width:100%' @click='resetDetailPasien()'>Tutup</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'antrian_input_rm',
  data() {
    return {
      config: 'abc',
      no_rm: '',
      numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3],
      detail_pasien: [],
      title: 'Konfirmasi identitas',
      moment: moment
    }
  },
  props: {
    no_rm_param: { type: String, required: false, default: '' }
  },
  methods: {
    async getDataPasien(no) {
      if (no) {
        this.$_api.post('member/cekPasien', {
          no: no
        })
          .then((res) => {
            console.log(res, 'ini res pasien');
            console.log(no, 'no rm')
            this.detail_pasien = res.data[0]
            if (res.data.length == 0) {
              this.title = 'Data tidak ditemukan'
            }
            this.$bvModal.show('modal-konfirmasiIdentitas')
          })
          .catch((err) => {
            this.title = 'Data tidak ditemukan'
            console.log(err)
          })

      }
    },
    appendNumber(number) {
      this.no_rm += number;
    },
    backspace() {
      this.no_rm = this.no_rm.slice(0, -1);
    },
    konfirmasi() {
      this.$emit('sendDetailPasien', this.detail_pasien, this.no_rm);
      this.$bvModal.hide('modal-konfirmasiIdentitas')
    },
    resetDetailPasien() {
      this.detail_pasien = []
      this.$bvModal.hide('modal-konfirmasiIdentitas')
    }
  },
  mounted() {
    this.no_rm = this.no_rm_param
  }
}
</script>
