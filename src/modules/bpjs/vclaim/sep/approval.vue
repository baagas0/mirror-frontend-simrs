<template>
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong>Form {{ modeSubmit == modes.add ? 'Pengajuan' : 'Persetujuan' }} SEP</strong></h3>
        </b-col>
      </b-row>
      <!-- <pre>{{ fields }}</pre> -->
      <!-- <pre>{{ dataRegistrasi }}</pre> -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)" autocomplete="off">
          <b-row class="mb-2">
            <b-col cols="4">
              <s-input groupClass="mb-0" v-model="fields.noKartu" :item="{
                label: 'No. BPJS',
                id: 'noKartu',
                data: 'noKartu',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noKartu" :disabled="modeSubmit == modes.edit" />
            </b-col>

            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.registrasi_id" :item="{
                label: 'Registrasi',
                id: 'registrasi_id',
                data: 'registrasi_id',
                type: 'lookup-radio',
                api: 'registrasi/listPerHalamanBypassUri',
                getter: 'registrasi',
                setter: 'registrasi',
                validation: [''],
                pointer: {
                  label: 'nama_lengkap',
                  code: 'registrasi_id',
                  display: ['nama_lengkap', 'no_identitas_registrasi', 'tgl_registrasi', 'no_sep', 'no_asuransi_registrasi'],
                  headerDisplay: ['Nama Pasien', 'NIK', 'Tanggal Registrasi', 'No SEP', 'No BPJS'],
                  mainParam: 'nama'
                },
              }" :valuee="fields.registrasi_id" />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="3">
              <s-input v-model="fields.jnsPelayanan" :item="{
                label: 'Jenis Pelayanan',
                id: 'jnsPelayanan',
                data: 'jnsPelayanan',
                type: 'select',
                validation: ['required'],
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                },
                optionList: list.jnsPelayanan,
                placeholder: 'Pilih Jenis Pelayanan',
              }" :valuee="fields.jnsPelayanan" />
            </b-col>
            <b-col cols="3">
              <s-input v-model="fields.jnsPengajuan" :item="{
                label: 'Jenis Pengajuan',
                id: 'jnsPengajuan',
                data: 'jnsPengajuan',
                type: 'select',
                validation: ['required'],
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                },
                optionList: list.jnsPengajuan,
                placeholder: 'Pilih Jenis Pelayanan',
              }" :valuee="fields.jnsPengajuan" />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="6">
              <s-input groupClass="mb-0" v-model="fields.keterangan" :item="{
                label: 'Keterangan',
                id: 'keterangan',
                data: 'keterangan',
                type: 'textarea',
                placeholder: 'Isikan Keterangan',
                validation: ['required'],
                rows: 2
              }" :valuee="fields.keterangan" />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.tglSep" :item="{
                label: 'Tanggal SEP',
                id: 'tglSep',
                data: 'tglSep',
                type: 'date',
                validation: ['required'],
              }" :valuee="dateDefault.start" />
            </b-col>

            <b-col cols="12" sm="12" md="12" lg="12">
              <div class="row align-self-end mt-2">
                <b-col cols="12" sm="12" md="12" lg="12" style="gap: 10px;display: flex;">
                  <button type="submit" class="btn btn-primary">
                    <i class="ri-save-line"></i>
                    Simpan
                  </button>
                  <div @click="resetForm" class="btn btn-danger">
                    <i class="ri-loop-right-line"></i>
                    Reset
                  </div>
                </b-col>
              </div>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </b-card>

    <DaftarApprovalSEP class="mt-4" @selectPengajuan="handleSelectPengajuan" :isCreatedOrUpdated="isCreatedOrUpdated"
      @isCreatedOrUpdated="isCreatedOrUpdated = false" />
  </div>
</template>

<script>
import moment from 'moment'
import DaftarApprovalSEP from './daftarApprovalSEP.vue'
moment.locale('id')

export default {
  name: 'vclaim-sep-approval',
  components: {
    DaftarApprovalSEP
  },
  data() {
    return {
      dateNow: moment(),
      modes: {
        add: 'add',
        edit: 'edit',
      },
      configAPI: {
        pengajuan: 'sep/pengajuan',
        approvalPengajuanSEP: 'sep/approvalPengajuanSEP',
      },
      modeSubmit: 'add',
      dateDefault: {
        start: moment().startOf('day').format('YYYY-MM-DD'),
        end: moment().endOf('day').format('YYYY-MM-DD')
      },
      list: {
        jnsPelayanan: [
          { label: 'Rawat Inap', code: '1' },
          { label: 'Rawat Jalan', code: '2' },
        ],
        jnsPengajuan: [
          { label: 'Backdate', code: '1' },
          { label: 'Finger Print', code: '2' },
        ],
      },
      // noKartu, tglSep, jnsPelayanan, jnsPengajuan, user, keterangan, registrasi_id
      fields: {
        noKartu: '',
        tglSep: moment().startOf('day').format('YYYY-MM-DD'),
        jnsPelayanan: '2',
        jnsPengajuan: '1',
        user: '',
        keterangan: '',
        registrasi_id: '',
      },
      jnsPelayanan: {
        rawatInap: '1',
        rawatJalan: '2',
      },
      jnsPengajuan: {
        backdate: '1',
        fingerprint: '2',
      },
      filters: {
        param: {
        },
      },
      selectedApproval: {},
      isCreatedOrUpdated: false,
      isLoadingSubmit: false,

      dataRegistrasi: {},
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY HH:mm')
    },
    submitForm() {
      if (this.isLoadingSubmit) return
      // noKartu, tglSep, jnsPelayanan, jnsPengajuan, user, keterangan, registrasi_id

      let param = JSON.parse(JSON.stringify(this.fields))

      let createOrUpdate = this.modeSubmit === this.modes.add ? 'DIAJUKAN' : 'RESPON'

      let authUser = JSON.parse(localStorage.getItem('profile'))
      param.user = 'Coba W'
      if (authUser) {
        this.authUser = authUser
        this.user = authUser.username
        param.user = authUser.username
      }

      this.isLoadingSubmit = true
      this.$_alert.confirm('Simpan Data', `SEP akan ${createOrUpdate}, ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed) {
          if (res.value && this.modeSubmit === this.modes.add) {

            this.$_api.post(this.configAPI.pengajuan, param).then((res) => {
              if (res.status == 200) {
                this.$_alert.success(`Pengajuan gerhasil ${createOrUpdate}`, 'Data berhasil disimpan')
                this.resetForm()
                this.isCreatedOrUpdated = true
              } else {
                this.$_alert.error(res, `Pengajuan gagal ${createOrUpdate}`, res.message)
              }
            }).catch((error) => {
              console.log(error);
              this.$_alert.error(error, `Pengajuan gagal ${createOrUpdate}`, error.message)
            }).finally(() => {
              this.isLoadingSubmit = false
            })

          } else if (res.value && this.modeSubmit === this.modes.edit) {
            this.$_api.post(this.configAPI.approvalPengajuanSEP, param).then((res) => {
              if (res.status == 200) {
                this.$_alert.success(`Pengajuan gerhasil ${createOrUpdate}`, 'Data berhasil disimpan')
                this.resetForm()
                this.isCreatedOrUpdated = true
              } else {
                this.$_alert.error(res, `Pengajuan gagal ${createOrUpdate}`, res.message)
              }
            }).catch((error) => {
              console.log(error);
              this.$_alert.error(error, `Pengajuan gagal ${createOrUpdate}`, error.message)
            }).finally(() => {
              this.isLoadingSubmit = false
            })
          }
        } else {
          this.isLoadingSubmit = false
        }
      })
    },
    handleSelectPengajuan(data) {
      console.log(data, 'handleSelectApproval');

      this.selectedPengajuan = data.item
      this.modeSubmit = this.modes.edit
    },
    onSelect(selectedArray, variableName) {
      this.filter[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filter[variableName] = '';
    },
    resetSelected() {
    },
    resetForm() {
      this.modeSubmit = this.modes.add
      this.fields = {
        noKartu: '',
        tglSep: moment().startOf('day').format('YYYY-MM-DD'),
        jnsPelayanan: '2',
        jnsPengajuan: '1',
        user: '',
        keterangan: '',
        registrasi_id: '',
      }

      this.filters = {}
    },

  },
  mounted() {
    // this.getSepList()
    // this.getPoliPengajuan()
  },
  watch: {
    'fields': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
      },
    },
    'fields.registrasi_id': {
      deep: true,
      immediate: true,
      handler(to, from) {
        if (to) {
          this.$_api.single('registrasi', {}, to).then((res) => {
            if (res.data.length > 0) this.dataRegistrasi = res.data[0]
          });
        }
      }
    },
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
