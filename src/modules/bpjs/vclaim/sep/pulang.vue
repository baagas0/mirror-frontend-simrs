<template>
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong>Form Update Pulang SEP</strong></h3>
        </b-col>
      </b-row>
      <!-- <pre>{{ fields }}</pre> -->
      <!-- <pre>{{ dataRegistrasi }}</pre> -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)" autocomplete="off">
          <b-row class="mb-2">
            <b-col cols="4">
              <s-input groupClass="mb-0" v-model="fields.noSep" :item="{
                label: 'No. SEP',
                id: 'noSep',
                data: 'noSep',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noSep" :disabled="modeSubmit == modes.edit" />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="3">
              <s-input v-model="fields.statusPulang" :item="{
                label: 'Jenis Pulang',
                id: 'statusPulang',
                data: 'statusPulang',
                type: 'select',
                validation: ['required'],
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                },
                optionList: list.statusPulang,
                placeholder: 'Pilih status pulang',
              }" :valuee="fields.statusPulang" />
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.tglPulang" :item="{
                label: 'Tanggal Pulang',
                id: 'tglPulang',
                data: 'tglPulang',
                type: 'date',
                validation: ['required'],
              }" :valuee="dateDefault.start" />
            </b-col>
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.tglMeninggal" :item="{
                label: 'Tanggal Meninggal',
                id: 'tglMeninggal',
                data: 'tglMeninggal',
                type: 'date',
                validation: [],
                placeholder: 'Pilih Tanggal Meninggal',
              }" :valuee="fields.statusPulang == statusPulang.meninggal ? dateDefault.start : ''"
                :disabled="fields.statusPulang != statusPulang.meninggal" />
            </b-col>
          </b-row>
          <b-row>

            <b-col cols="4">
              <s-input groupClass="mb-0" v-model="fields.noSuratMeninggal" :item="{
                label: 'No. Surat Meninggal',
                id: 'noSuratMeninggal',
                data: 'noSuratMeninggal',
                type: 'text',
                validation: [],
              }" :valuee="fields.noSuratMeninggal" :disabled="fields.statusPulang != statusPulang.meninggal" />
            </b-col>
            <b-col cols="4">
              <s-input groupClass="mb-0" v-model="fields.noLPManual" :item="{
                label: 'No. LP Manual',
                id: 'noLPManual',
                data: 'noLPManual',
                type: 'text',
                validation: [],
              }" :valuee="fields.noLPManual" :disabled="!kll" />
            </b-col>

            <b-col cols="12" sm="12" md="12" lg="12">
              <div class="row align-self-end mt-2">
                <b-col cols="12" sm="12" md="12" lg="12" style="gap: 10px;display: flex;">
                  <button type="submit" class="btn btn-primary">
                    <i class="ri-save-line"></i>
                    Simpan
                  </button>
                  <button @click="resetForm" class="btn btn-danger">
                    <i class="ri-loop-right-line"></i>
                    Reset
                  </button>
                </b-col>
              </div>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </b-card>

    <DaftarPulangSEP class="mt-4" @selectPulang="handleSelectPulang" :isCreatedOrUpdated="isCreatedOrUpdated"
      @isCreatedOrUpdated="isCreatedOrUpdated = false" />
  </div>
</template>

<script>
import moment from 'moment'
import DaftarPulangSEP from './daftarPulangSEP.vue'
moment.locale('id')

export default {
  name: 'vclaim-sep-pulang',
  components: {
    DaftarPulangSEP
  },
  data() {
    return {
      dateNow: moment(),
      modes: {
        add: 'add',
        edit: 'edit',
      },
      configAPI: {
        updateTanggalPulang: 'sep/updateTanggalPulang',
      },
      modeSubmit: 'add',
      dateDefault: {
        start: moment().startOf('day').format('YYYY-MM-DD'),
        end: moment().endOf('day').format('YYYY-MM-DD')
      },
      list: {
        statusPulang: [
          { label: 'Atas Persetujuan Dokter', code: '1' },
          { label: 'Atas Permintaan Sendiri', code: '3' },
          { label: 'Meninggal', code: '4' },
          { label: 'Lain - lain', code: '5' },
        ],
      },
      fields: {
        noSep: '',
        tglPulang: moment().startOf('day').format('YYYY-MM-DD'),
        statusPulang: '1',
        noSuratMeninggal: '',
        tglMeninggal: '',
        noLPManual: '',
        user: '',
      },
      statusPulang: {
        meninggal: '4',
      },
      filters: {
        param: {
        },
      },
      selectedApproval: {},
      isCreatedOrUpdated: false,
      isLoadingSubmit: false,

      dataRegistrasi: {},
      kll: false
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY HH:mm')
    },
    submitForm() {
      if (this.isLoadingSubmit) return

      this.isLoadingSubmit = true
      let param = JSON.parse(JSON.stringify(this.fields))

      param.user = 'Coba W'

      this.$_alert.confirm('Simpan Data', `SEP akan diubah, ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed) {
          this.$_api.post(this.configAPI.updateTanggalPulang, param).then((res) => {
            if (res.status == 200) {
              this.$_alert.success('Status Pulang SEP berhasil diubah')
              this.resetForm()
              this.isCreatedOrUpdated = true
            } else {
              this.$_alert.error(res, `Status SEP gagal diubah`, res.message)
            }
          }).catch((error) => {
            console.log(error);
            this.$_alert.error(error, `Status SEP gagal diubah`, error.message)
          })
        }
      }).finally(() => {
        this.isLoadingSubmit = false
      })
    },
    handleSelectPulang(data) {
      console.log(data, 'handleSelectApproval');

      this.selectedPulang = data.item
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
        noSep: '',
        tglPulang: moment().startOf('day').format('YYYY-MM-DD'),
        statusPulang: '1',
        noSuratMeninggal: '',
        tglMeninggal: '',
        noLPManual: '',
        user: '',
      }

      this.filters = {}
    },

  },
  mounted() {
  },
  watch: {
    'fields': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
      },
    },
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
