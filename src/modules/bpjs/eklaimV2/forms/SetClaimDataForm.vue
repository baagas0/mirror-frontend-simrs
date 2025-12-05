<template>
  <div>
    <b-card>
      <b-card-body>
        <h5 class="card-title">Set Data Klaim</h5>
        <form @submit.prevent="handleSubmit">
          <b-row>
            <b-col cols="4">
              <s-input v-model="formData.nomor_kartu" :item="{
                label: 'No. Kartu BPJS',
                id: 'nomor_kartu',
                data: 'nomor_kartu',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nomor_kartu" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.nomor_sep" :item="{
                label: 'No. SEP',
                id: 'nomor_sep',
                data: 'nomor_sep',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nomor_sep" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.nomor_rm" :item="{
                label: 'No. RM',
                id: 'nomor_rm',
                data: 'nomor_rm',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nomor_rm" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.nama_pasien" :item="{
                label: 'Nama Pasien',
                id: 'nama_pasien',
                data: 'nama_pasien',
                type: 'text',
                validation: ['required'],
              }" :valuee="formData.nama_pasien" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.tgl_lahir" :item="{
                id: 'tgl_lahir',
                show: true,
                class: '', attr: null,
                value: null,
                label: 'Tanggal Lahir',
                placeholder: 'Isikan tanggal lahir',
                type: 'datetime',
                formatDateView: 'DD MMMM YYYY',
                validation: ['required']
              }" :valuee="formData.tgl_lahir" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.gender" :key="'gender'" :id="'gender'" :item="{
                label: 'Jenis Kelamin',
                id: 'gender',
                data: 'gender',
                type: 'lookup-radio',
                validation: ['required'],
                value: formData.gender,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Laki-laki', code: '1' },
                    { label: 'Perempuan', code: '2' },
                  ]
                },
                param: {},
              }" :valuee="formData.gender" />
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.tgl_masuk" :item="{
                id: 'tgl_masuk',
                show: true,
                class: '', attr: null,
                value: null,
                label: 'Tanggal Masuk',
                placeholder: 'Isikan tanggal masuk',
                type: 'datetime',
                formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                validation: ['required']
              }" :valuee="formData.tgl_masuk" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.tgl_pulang" :item="{
                id: 'tgl_pulang',
                show: true,
                class: '', attr: null,
                value: null,
                label: 'Tanggal Pulang',
                placeholder: 'Isikan tanggal pulang',
                type: 'datetime',
                formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                validation: ['required'],
              }" :valuee="formData.tgl_pulang" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.cara_masuk" :key="'cara_masuk'" :id="'cara_masuk'" :item="{
                label: 'Cara Masuk',
                id: 'cara_masuk',
                data: 'cara_masuk',
                type: 'lookup-radio',
                validation: ['required'],
                value: formData.cara_masuk,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Rujukan FKTP', code: 'gp' },
                    { label: 'Rujukan FKRTL', code: 'hosp-trans' },
                    { label: 'Rujukan Spesialis', code: 'mp' },
                    { label: 'Dari Rawat Jalan', code: 'outp' },
                    { label: 'Dari Rawat Inap', code: 'inp' },
                    { label: 'Dari Rawat Darurat', code: 'emd' },
                    { label: 'Lahir di RS', code: 'born' },
                    { label: 'Rujukan Panti Jompo', code: 'nursing' },
                    { label: 'Rujukan dari RS Jiwa', code: 'psych' },
                    { label: 'Rujukan Fasilitas Rehab', code: 'rehab' },
                    { label: 'Lain-lain', code: 'other' },
                  ]
                },
                param: {},
              }" :valuee="formData.cara_masuk" />
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.discharge_status" :key="'discharge_status'" :id="'discharge_status'" :item="{
                label: 'Cara Pulang',
                id: 'discharge_status',
                data: 'discharge_status',
                type: 'lookup-radio',
                validation: ['required'],
                value: formData.discharge_status,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Atas persetujuan dokter', code: '1' },
                    { label: 'Dirujuk', code: '2' },
                    { label: 'Atas permintaan sendiri', code: '3' },
                    { label: 'Meninggal', code: '4' },
                    { label: 'Lain-lain', code: '5' },
                  ]
                },
                param: {},
              }" :valuee="formData.discharge_status" />
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.jenis_rawat" :key="'jenis_rawat'" :id="'jenis_rawat'" :item="{
                label: 'Jenis Rawat',
                id: 'jenis_rawat',
                data: 'jenis_rawat',
                type: 'lookup-radio',
                validation: ['required'],
                value: formData.jenis_rawat,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Rawat Inap', code: '1' },
                    { label: 'Rawat Jalan', code: '2' },
                    { label: 'Rawat IGD', code: '3' },
                  ]
                },
                param: {},
              }" :valuee="formData.jenis_rawat" />
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.kelas_rawat" :key="'kelas_rawat'" :id="'kelas_rawat'" :item="{
                label: 'Kelas Rawat',
                id: 'kelas_rawat',
                data: 'kelas_rawat',
                type: 'lookup-radio',
                validation: ['required'],
                value: formData.kelas_rawat,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Kelas 1', code: '1' },
                    { label: 'Kelas 2', code: '2' },
                    { label: 'Kelas 3', code: '3' },
                  ]
                },
                param: {},
              }" :valuee="formData.kelas_rawat" />
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.adl_sub_acute" :item="{
                label: 'ADL Sub Acute',
                id: 'adl_sub_acute',
                data: 'adl_sub_acute',
                type: 'number',
                validation: ['required'],
              }" :valuee="formData.adl_sub_acute" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.adl_chronic" :item="{
                label: 'ADL Chronic',
                id: 'adl_chronic',
                data: 'adl_chronic',
                type: 'number',
                validation: ['required'],
              }" :valuee="formData.adl_chronic" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.birth_weight" :item="{
                label: 'Berat Lahir (gr)',
                id: 'birth_weight',
                data: 'birth_weight',
                type: 'number',
                validation: [],
              }" :valuee="formData.birth_weight" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.sistole" :item="{
                label: 'Sistole',
                id: 'sistole',
                data: 'sistole',
                type: 'number',
                validation: ['required'],
              }" :valuee="formData.sistole" :disabled="false"></s-input>
            </b-col>
            <b-col cols="4">
              <s-input v-model="formData.diastole" :item="{
                label: 'Diastole',
                id: 'diastole',
                data: 'diastole',
                type: 'number',
                validation: ['required'],
              }" :valuee="formData.diastole" :disabled="false"></s-input>
            </b-col>
            <b-col cols="12">
              <label>Informasi Tarif RS</label>
              <b-row>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.prosedur_non_bedah" :item="{
                    label: 'Prosedur Non Bedah',
                    id: 'prosedur_non_bedah',
                    data: 'prosedur_non_bedah',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.prosedur_non_bedah" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.prosedur_bedah" :item="{
                    label: 'Prosedur Bedah',
                    id: 'prosedur_bedah',
                    data: 'prosedur_bedah',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.prosedur_bedah" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.konsultasi" :item="{
                    label: 'Konsultasi',
                    id: 'konsultasi',
                    data: 'konsultasi',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.konsultasi" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.tenaga_ahli" :item="{
                    label: 'Tenaga Ahli',
                    id: 'tenaga_ahli',
                    data: 'tenaga_ahli',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.tenaga_ahli" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.keperawatan" :item="{
                    label: 'Keperawatan',
                    id: 'keperawatan',
                    data: 'keperawatan',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.keperawatan" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.penunjang" :item="{
                    label: 'Penunjang',
                    id: 'penunjang',
                    data: 'penunjang',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.penunjang" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.radiologi" :item="{
                    label: 'Radiologi',
                    id: 'radiologi',
                    data: 'radiologi',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.radiologi" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="formData.tarif_rs.laboratorium" :item="{
                    label: 'Laboratorium',
                    id: 'laboratorium',
                    data: 'laboratorium',
                    type: 'money',
                    validation: [],
                  }" :valuee="formData.tarif_rs.laboratorium" :disabled="false"></s-input>
                </b-col>
              </b-row>
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
                  {{ busy ? 'Memproses...' : 'Set Data Klaim' }}
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
        nomor_sep: '',
        nomor_rm: '',
        nama_pasien: '',
        tgl_lahir: '',
        gender: '1',
        tgl_masuk: '',
        tgl_pulang: '',
        cara_masuk: 'other',
        discharge_status: '1',
        jenis_rawat: '2',
        kelas_rawat: '',
        adl_sub_acute: '0',
        adl_chronic: '0',
        birth_weight: '0',
        sistole: 120,
        diastole: 80,
        tarif_rs: {
          prosedur_non_bedah: 0,
          prosedur_bedah: 0,
          konsultasi: 0,
          tenaga_ahli: 0,
          keperawatan: 0,
          penunjang: 0,
          radiologi: 0,
          laboratorium: 0,
          pelayanan_darah: 0,
          rehabilitasi: 0,
          kamar: 0,
          rawat_intensif: 0,
          obat: 0,
          obat_kronis: 0,
          obat_kemoterapi: 0,
          alkes: 0,
          bmhp: 0,
          sewa_alat: 0,
        }
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
          ...this.formData,
          nomor_kartu: this.registrasi.no_asuransi_registrasi || '',
          nomor_sep: this.registrasi.no_sep || '',
          nomor_rm: this.registrasi.no_rm || '',
          nama_pasien: this.registrasi.nama_lengkap || '',
          tgl_lahir: this.$moment(this.registrasi.tgl_lahir).format('YYYY-MM-DD'),
          gender: this.registrasi.jenis_kelamin === 'P' ? '2' : '1',
          tgl_masuk: this.$moment(this.registrasi.tgl_registrasi).format('YYYY-MM-DD HH:mm:ss'),
          tgl_pulang: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
          jenis_rawat: this.registrasi.kode_jenis_layanan === '1' ? '1' :
                      this.registrasi.kode_jenis_layanan === '2' ? '3' : '2'
        }
      }
    },
    async handleSubmit() {
      this.busy = true
      try {
        // Format data for API
        const submitData = {
          ...this.formData,
          tgl_lahir: this.$moment(this.formData.tgl_lahir).format('YYYY-MM-DD HH:mm:ss'),
          tgl_masuk: this.$moment(this.formData.tgl_masuk).format('YYYY-MM-DD HH:mm:ss'),
          tgl_pulang: this.$moment(this.formData.tgl_pulang).format('YYYY-MM-DD HH:mm:ss')
        }
        await this.$emit('submit', submitData)
      } catch (error) {
        console.error('Submit error:', error)
      } finally {
        this.busy = false
      }
    }
  }
}
</script>