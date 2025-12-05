<template>
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Form</span> {{ modeSubmit == modes.add ? 'Pembuatan' : 'Edit' }}
              Rujukan <span @click="customAlert('success')">Khusus</span></strong></h3>
        </b-col>
      </b-row>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)" autocomplete="off">
          <b-row class="mb-2">
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
                  mainParam: 'nama',
                },
              }" />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.noRujukan" :item="{
                label: 'No. Rujukan',
                id: 'noRujukan',
                data: 'noRujukan',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noRujukan" />
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col cols="4">
              <ValidationProvider mode="eager" :name="'Diagnosa'" :rules="'required'">
                <label for="diagnosa">Diagnosa <span class="text-danger">*</span></label>
                <multiselect id="diagnosa" v-model="filters.diagnosa" :options="list.diagnosa" :multiple="true"
                  :internal-search="false" :searchable="true" :close-on-select="false" :show-labels="false" label="nama"
                  track-by="kode" @search-change="getDiagnosa" placeholder="Ketik kode / nama diagnosa" size="sm"
                  class="vs-style" />
              </ValidationProvider>
            </b-col>
            <b-col cols="4">
              <ValidationProvider mode="eager" :name="'Prosedur'" :rules="'required'">
                <label for="procedure">Prosedur <span class="text-danger">*</span></label>
                <multiselect id="procedure" v-model="filters.procedure" :options="list.procedure" :multiple="true"
                  :internal-search="false" :searchable="true" :close-on-select="false" :show-labels="false" label="nama"
                  track-by="kode" @search-change="getProsedur" placeholder="Ketik kode / nama procedure" size="sm"
                  class="vs-style" />
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
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

    <DaftarRujukanKhusus class="mt-4" @selectKontrol="handleSelectRujukan" :isCreatedOrUpdated="isCreatedOrUpdated"
      @isCreatedOrUpdated="isCreatedOrUpdated = false" />
  </div>
</template>

<script>
import moment from 'moment'
import DaftarRujukanKhusus from './daftarRujukanKhusus.vue'
moment.locale('id')

export default {
  name: 'vclaim-rujukan-khusus',
  components: {
    DaftarRujukanKhusus
  },
  data() {
    return {
      dateNow: moment(),
      modes: {
        add: 'add',
        edit: 'edit',
      },
      configAPI: {
        insert: 'rujukan/registerKhusus',
        update: 'rujukan/updateKhusus',
      },
      modeSubmit: 'add',
      dateDefault: {
        start: moment().startOf('day').format('YYYY-MM-DD'),
        end: moment().endOf('day').format('YYYY-MM-DD')
      },
      params: {
        nomor: '',
      },
      list: {
        kodeDokter: [],
        poliKontrol: [],
        jnsPelayanan: [
          { label: 'Rawat Inap', code: '1' },
          { label: 'Rawat Jalan', code: '2' },
        ],
        tipeRujukan: [
          { label: 'Penuh', code: '0' },
          { label: 'Partial', code: '1' },
          { label: 'Balik PRB', code: '2' },
        ],
        diagnosa: [],
        procedure: [],
        registrasi_id: [],
      },
      fields: {
        noRujukan: '',
        diagnosa: [],
        procedure: [],
        user: 'user ws',
        registrasi_id: '',
      },
      jnsPelayanan: {
        rawatInap: '1',
        rawatJalan: '2',
      },
      tipeRujukan: {
        penuh: '0',
        partial: '1',
        balikPRB: '2',
      },
      filters: {
        param: {
          diagnosa: '',
          procedure: '',
        },
        diagnosa: [],
        procedure: [],
      },
      selected: {
        registrasi_id: {},
        rujukanKhusus: {},
      },
      isCreatedOrUpdated: false,
      isLoadingSubmit: false,
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

      let createOrUpdate = this.modeSubmit === this.modes.add ? 'DIBUAT' : 'DIPERBARUI'

      let authUser = JSON.parse(localStorage.getItem('profile'))
      param.user = 'Coba W'
      if (authUser) {
        this.authUser = authUser
        this.user = authUser.username
        param.user = authUser.username
      }

      this.$_alert.confirm('Simpan Data', `Rujukan akan ${createOrUpdate}, ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed && res.value) {
          param.diagnosa = this.filters.diagnosa.map((item) => {
            return {
              kode: item.kode,
            }
          })

          param.procedure = this.filters.procedure.map((item) => {
            return {
              kode: item.kode,
            }
          })

          let api = this.modeSubmit === this.modes.add ? this.configAPI.insert : this.configAPI.update
          this.$_api.post(api, param).then((res) => {
            if (res.status == 200) {
              this.$_alert.success(`Rujukan Berhasil ${createOrUpdate}`, 'Data berhasil disimpan')
              this.isCreatedOrUpdated = true
              this.resetForm()
            } else {
              this.$_alert.error(res, `Rujukan Gagal ${createOrUpdate}`, res.message)
            }
          }).catch((error) => {
            console.log(error);
            this.$_alert.error(error, `Rujukan Gagal ${createOrUpdate}`, error.message)
          })
        }
      }).finally(() => {
        this.isLoadingSubmit = false
      })
    },
    handleSelectRujukan(data) {
      console.log(data, 'handleSelectRujukan');
      // "idrujukan": "98866",
      // "norujukan": "0301U0331019P003283",
      // "nokapst": "0000016553957",
      // "nmpst": "MUZNI MUKHTAR",
      // "diagppk": "N18",
      // "tglrujukan_awal": "2021-03-22",
      // "tglrujukan_berakhir": "2021-06-19"
      this.selected.rujukanKhusus = data
      this.fields.noRujukan = data.noRujukan
      this.fields.registrasi_id = data.registrasi_id

      this.modeSubmit = this.modes.edit
    },
    onSelect(selectedArray, variableName) {
      this.filter[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filter[variableName] = '';
    },
    resetForm() {
      this.modeSubmit = this.modes.add
      this.fields = {
        noSep: '',
        tglRujukan: moment().startOf('day').format('YYYY-MM-DD'),
        tglRencanaKunjungan: moment().startOf('day').format('YYYY-MM-DD'),
        ppkDirujuk: '',
        jnsPelayanan: '',
        catatan: '',
        diagnosa: '',
        tipeRujukan: '',
        procedure: '',
        user: 'user ws',
        registrasi_id: '',

        noRujukan: '', // update
      }

      this.filters = {
        param: {
          diagnosa: '',
          procedure: '',
        },
        diagnosa: [],
        procedure: [],
      }

      this.list.kodeDokter = []
      this.list.poliKontrol = []
      this.list.registrasi_id = []

      this.selected = {
        registrasi_id: {},
        rujukanKhusus: {},
      }
    },
    onRemove(variableName) {
      this.filters[variableName] = [];
      this.filters.param[variableName] = '';
      this.fields[variableName] = '';
    },
    getDiagnosa(data) {
      this.$_api.post('bpjs/vclaim/refrensi/getDiagnosa', {
        kode: data,
      }).then((res) => {
        if (res.status == 200) {
          this.list.diagnosa = res.data
          this.$_alert.success('Berhasil mengambil data diagnosa', res.message)
        } else {
          this.list.diagnosa = []
          this.$_alert.success(res.message)
        }
      }).catch((err) => {
        this.list.diagnosa = []
        this.$_alert.success(res.message)
        console.log(err);
      })
    },
    onSelectPoliRujukan(selected) {
      this.filters.param.procedure = selected.kode
      this.filters.procedure = selected
      this.fields.procedure = selected.kode
    },
    getProsedur(data) {
      this.$_api.post('bpjs/vclaim/refrensi/getTindakan', {
        kode: data,
      }).then((res) => {
        if (res.status == 200) {
          this.list.procedure = res.data
          this.$_alert.success('Berhasil mengambil data poliklinik', res.message)
        } else {
          this.list.procedure = []
          this.$_alert.success(res.message)
        }
      }).catch((err) => {
        this.list.procedure = []
        this.$_alert.success(res.message)
        console.log(err);
      })
    },
    getSelectedRegistrasi() {
      this.$_api.single('registrasi', null, this.fields.registrasi_id).then((res) => {
        if (res.status == 200) {
          let data = res.data[0]
          console.log(res, 'getSelectedRegistrasi');
          this.fields.noRujukan = data.no_rujukan

          if (data.no_rujukan) {
            this.$_alert.success('No rujukan tersedia')
          }
        } else {
          this.$_alert.error(res, 'Gagal mengambil data registrasi', res.message)
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal mengambil data registrasi', err.message)
        console.log(err);
      })
    },
    getSelectedRujukan() {
      this.$_api.post('bpjs/vclaim/rujukan/getDataRujukanKhususberdasarkanNoRujukan', {
        noRujukan: this.fields.noRujukan,
        tipe: 'PCARE'
      }).then((res) => {
        if (res.status == 200) {
          let data = res.data[0]
          console.log(res, 'getSelectedRujukan');
          this.selected.rujukanKhusus = data
        } else {
          this.$_alert.error(res, 'Gagal mengambil data rujukan', res.message)
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal mengambil data rujukan', err.message)
        console.log(err);
      })
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
  },
  watch: {
    'fields.tipeRujukan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue == this.tipeRujukan.balikPRB) {
          this.fields.procedure = ''
          this.filters.procedure = []
          this.filters.param.procedure = ''
        }
      },
    },
    'fields.registrasi_id': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.getSelectedRegistrasi()
        }
      },
    },
    'fields.noRujukan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.getSelectedRujukan()
        }
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
