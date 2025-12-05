<template>
  <div>
    <b-card>
      <b-card-body>
        <h5 class="card-title">Buat Klaim Baru</h5>
        <form @submit.prevent="handleSubmit">
          <b-row>
            <b-col cols="6">
              <s-input v-model="formData.nomor_kartu" :item="{
                label: 'No. Kartu BPJS',
                id: 'nomor_kartu',
                data: 'nomor_kartu',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nomor_kartu" :disabled="true"></s-input>
            </b-col>
            <b-col cols="6">
              <s-input v-model="formData.nomor_rm" :item="{
                label: 'No. RM',
                id: 'nomor_rm',
                data: 'nomor_rm',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nomor_rm" :disabled="true"></s-input>
            </b-col>
            <b-col cols="6">
              <s-input v-model="formData.nama_pasien" :item="{
                label: 'Nama Pasien',
                id: 'nama_pasien',
                data: 'nama_pasien',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nama_pasien" :disabled="true"></s-input>
            </b-col>
            <b-col cols="6">
              <s-input v-model="formData.tgl_lahir" :item="{
                label: 'Tanggal Lahir',
                id: 'tgl_lahir',
                data: 'tgl_lahir',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.tgl_lahir" :disabled="true"></s-input>
            </b-col>
            <b-col cols="6">
              <s-input v-model="formData.gender_text" :item="{
                label: 'Jenis Kelamin',
                id: 'gender_text',
                data: 'gender_text',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.gender_text" :disabled="true"></s-input>
            </b-col>
            <b-col cols="6">
              <s-input v-model="formData.nomor_sep" :item="{
                label: 'No. SEP',
                id: 'nomor_sep',
                data: 'nomor_sep',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nomor_sep" :disabled="true"></s-input>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col cols="12">
              <div class="d-flex justify-content-between">
                <b-button variant="secondary" @click="$emit('cancel')">
                  <i class="ri-close-line"></i> Batal
                </b-button>
                <b-button type="submit" variant="primary" :disabled="busy">
                  <i class="ri-check-line"></i>
                  {{ busy ? 'Memproses...' : 'Buat Klaim' }}
                </b-button>
              </div>
            </b-col>
          </b-row>
        </form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    registrasi: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      busy: false,
      formData: {
        nomor_kartu: '',
        nomor_rm: '',
        nama_pasien: '',
        tgl_lahir: '',
        gender: 1,
        gender_text: '',
        nomor_sep: ''
      }
    }
  },
  watch: {
    registrasi: {
      immediate: true,
      handler(newVal) {
        this.initializeFormData()
      }
    }
  },
  methods: {
    initializeFormData() {
      if (this.registrasi) {
        this.formData = {
          nomor_kartu: this.registrasi.no_asuransi_registrasi || '',
          nomor_rm: this.registrasi.no_rm || '',
          nama_pasien: this.registrasi.nama_lengkap || '',
          tgl_lahir: this.$moment(this.registrasi.tgl_lahir).format('YYYY-MM-DD HH:mm:ss'),
          gender: this.registrasi.jenis_kelamin === 'P' ? 2 : 1,
          gender_text: this.registrasi.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-laki',
          nomor_sep: this.registrasi.no_sep || this.registrasi.no_kontrol || this.registrasi.no_rujukan || ''
        }
      }
    },
    async handleSubmit() {
      this.busy = true
      try {
        await this.$emit('submit', this.formData)
      } catch (error) {
        console.error('Submit error:', error)
      } finally {
        this.busy = false
      }
    }
  }
}
</script>