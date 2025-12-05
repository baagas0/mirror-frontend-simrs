<template>
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Form</span> {{ modeSubmit == modes.add ? 'Pembuatan' : 'Edit' }}
              Rujukan Keluar <span @click="customAlert('error')">RS</span></strong></h3>
        </b-col>
      </b-row>
      <!-- <pre>{{ fields }}</pre> -->
      <!-- <pre>{{ dataRegistrasi }}</pre> -->
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
                  // customDetailApi: {
                  //   // api: selectedKontrol.jnsKontrol == jnsKontrol.spri ? 'registrasi/listKunjunganInapPerHalaman' : 'registrasi/listKunjunganRajalPerHalaman',
                  //   api: 'registrasi/detailsById',
                  //   params: {
                  //     id: selectedRegistrasi.registrasi_id,
                  //   },
                  // }
                },
              }" />
            </b-col>
            <b-col cols="3">
              <s-input v-model="fields.jnsPelayanan" :item="{
                label: 'Jenis Pelayanan',
                id: 'jnsPelayanan',
                data: 'jnsPelayanan',
                type: 'select',
                validation: [''],
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                },
                optionList: list.jnsPelayanan,
                placeholder: 'Pilih Jenis Pelayanan',
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
                validation: [],
              }" :valuee="fields.noRujukan" v-if="modeSubmit == modes.edit" />

              <s-input groupClass="mb-0" v-model="fields.noSep" :item="{
                label: 'No. SEP',
                id: 'noSEP',
                data: 'noSEP',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noSep" />
            </b-col>
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.ppkDirujuk" :item="{
                label: 'Kode PPK Dirujuk',
                id: 'ppkDirujuk',
                data: 'ppkDirujuk',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.ppkDirujuk" />
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.tglRujukan" :item="{
                label: 'Tanggal Rujukan',
                id: 'tglRujukan',
                data: 'tglRujukan',
                type: 'date',
                validation: ['required'],
              }" :valuee="dateDefault.start" />
            </b-col>
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.tglRencanaKunjungan" :item="{
                label: 'Tanggal Rencana Kunjungan',
                id: 'tglRencanaKunjungan',
                data: 'tglRencanaKunjungan',
                type: 'date',
                validation: ['required'],
              }" :valuee="dateDefault.start" />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              <ValidationProvider mode="eager" :name="'Diagnosa'" :rules="'required'">
                <label for="diagRujukan">Diagnosa <span class="text-danger">*</span></label>
                <multiselect id="diagRujukan" v-model="filters.diagRujukan" :options="list.diagRujukan" :multiple="false"
                  :internal-search="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama"
                  track-by="kode" @remove="onRemove('diagRujukan')" @select="onSelectDiagRujukan"
                  @search-change="getDiagnosa" placeholder="Ketik kode / nama diagnosa" size="sm" class="vs-style" />
              </ValidationProvider>
            </b-col>
            <b-col cols="3">
              <s-input v-model="fields.tipeRujukan" :item="{
                label: 'Tipe Rujukan',
                id: 'tipeRujukan',
                data: 'tipeRujukan',
                type: 'select',
                validation: [''],
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                },
                optionList: list.tipeRujukan,
                placeholder: 'Pilih Tipe Rujukan',
              }" />
            </b-col>
            <b-col cols="4">
              <!-- <ValidationProvider mode="eager" :name="'Poliklinik'"
                :rules="fields.tipeRujukan != tipeRujukan.balikPRB ? 'required' : ''"> -->
              <label for="poliRujukan">Poliklinik Rujukan
                <!-- <span v-if="fields.tipeRujukan != tipeRujukan.balikPRB"
                    class="text-danger">*</span> -->
              </label>
              <multiselect id="poliRujukan" v-model="filters.poliRujukan" :options="list.poliRujukan" :multiple="false"
                :internal-search="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama"
                track-by="kode" @remove="onRemove('poliRujukan')" @select="onSelectPoliRujukan"
                @search-change="getPoliklinik" placeholder="Ketik kode / nama poli" size="sm" class="vs-style"
                :disabled="fields.tipeRujukan == tipeRujukan.balikPRB" />
              <!-- </ValidationProvider> -->
            </b-col>

            <b-col cols="4">
              <s-input v-model="fields.catatan" :key="'catatan'" :id="'catatan'" :item="{
                label: 'Catatan',
                id: 'catatan',
                data: 'catatan',
                type: 'textarea',
                validation: ['required'],
                placeholder: 'Berikan catatan bila perlu',
                rows: 2
              }" :valuee="fields.catatan" />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" sm="12" md="12" lg="12">
              <div class="row align-self-end mt-2">
                <b-col cols="12" sm="12" md="12" lg="12" style="gap: 10px;display: flex;">

                  <button type="button" class="btn btn-success" @click="cetakSurat('cetak-rujukan-keluar-rs')">Cetak Surat
                    <i class="ri-printer-line"></i></button>
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

    <RujukanByNoRujukan class="mt-4" @sendNoRujukan="handleSendNoRujukan" />

    <div id="cetak-rujukan-keluar-rs" style="position: relative; display: none;">
      <div size="A4">
        <div class="w-100" style="display: flex; flex-direction: column; align-items: center; padding: 2rem;">
          <!-- KOP -->
          <table class="custom-table">
            <tr>
              <td align="center">
                <div style="display: flex;">
                  <div>
                    <img src="https://madania.co.id/wp-content/uploads/2023/08/photo.jpg" alt="Logo"
                      style="max-height: 60px;" />
                  </div>
                  <div style="display: flex; height: 60px;">
                    <span class=" text-left" style="align-self: center">
                      <div style="display: flex; flex-direction: column; text-align: left !important; max-height: 60px;">
                        <h4 style="margin-bottom: 0; margin-left: 1rem;">SURAT RUJUKAN</h4>
                        <h4 style="margin-bottom: 0; margin-left: 1rem;">RSUD BUTON SELATAN
                        </h4>
                      </div>
                    </span>
                  </div>
                </div>
              </td>
              <td align="right">
                <div style="display: flex; height: 60px;">
                  <span class=" text-left" style="align-self: center">
                    <div style="display: flex; flex-direction: column; text-align: left !important;">
                      <h4 style="margin-bottom: 0;">No. {{ selected.rujukanKeluarRS.noRujukan }}</h4>
                      <h4 style="margin-bottom: 0;">Tgl. {{ formatTranslatedDate(selected.rujukanKeluarRS.tglRujukan) }}
                      </h4>
                    </div>
                  </span>
                </div>
              </td>
            </tr>
          </table>
          <hr>

          <!-- CONTENT 2 -->
          <div style="width:100%; display: flex; justify-content: space-between;">
            <div style="width: 50%; align-self: flex-start;">
              <table class="custom-table" style="width:100%">
                <tr>
                  <td style="white-space: nowrap;">Kepada Yth</td>
                  <td>:</td>
                  <td>
                    {{ selected.rujukanKeluarRS.namaPoliRujukan ? selected.rujukanKeluarRS.namaPoliRujukan : selected.rujukanKeluarRS.namaPpkDirujuk }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>{{ selected.rujukanKeluarRS.namaPoliRujukan ? selected.rujukanKeluarRS.namaPpkDirujuk : '' }}</td>
                </tr>
              </table>
            </div>
            <table class="custom-table" style="width: 30%; align-self: flex-end;">
              <tr>
                <td style="white-space: nowrap;">== {{ selected.rujukanKeluarRS.namaTipeRujukan }} ==</td>
              </tr>
              <tr>
                <td>{{ selected.rujukanKeluarRS.jnsPelayanan == '1' ? 'Rawat Inap' : 'Rawat Jalan' }}</td>
              </tr>
            </table>
          </div>
          <table class="custom-table" style="width: 50%; align-self: flex-start;">
            <tr class="tr-h-35">
              <td colspan="3" style="white-space: nowrap;">Mohon Pemeriksaan dan Penanganan Lebih Lanjut: </td>
            </tr>
            <tr class="tr-h-35">
              <td style="white-space: nowrap;">No. Kartu</td>
              <td>:</td>
              <td>{{ selected.rujukanKeluarRS.noKartu }}</td>
            </tr>
            <tr class="tr-h-35">
              <td style="white-space: nowrap;">Nama Peserta</td>
              <td>:</td>
              <td>{{ selected.rujukanKeluarRS.nama }}</td>
            </tr>
            <tr class="tr-h-35">
              <td style="white-space: nowrap;">Tgl.Lahir</td>
              <td>:</td>
              <td>{{ formatTranslatedDate(selected.rujukanKeluarRS.tglLahir) }}</td>
            </tr>
            <tr class="tr-h-35">
              <td style="white-space: nowrap;">Diagnosa</td>
              <td>:</td>
              <td>{{ selected.rujukanKeluarRS.namaDiagRujukan }}</td>
            </tr>
            <tr class="tr-h-35">
              <td style="white-space: nowrap;">Keterangan</td>
              <td>:</td>
              <td>{{ selected.rujukanKeluarRS.catatan }}</td>
            </tr>
          </table>

          <div style="width:100%; display: flex;">

            <table class="custom-table" style="width: 60%; align-self: flex-start; margin-top: 1rem;">
              <tr class="tr-h-35">
                <td colspan="3" style="white-space: nowrap;">Demikian atas bantuannya, diucapkan banyak terima kasih.</td>
              </tr>
              <tr class="tr-h-35">
                <td colspan="3" style="white-space: nowrap;">- Rujukan Berlaku Sampai Dengan Tgl.
                  {{ formatTranslatedDate(addedThreeMonth(selected.rujukanKeluarRS.tglRujukan)) }}</td>
              </tr>
              <tr class="tr-h-35">
                <td colspan="3" style="white-space: nowrap;">- Tgl.Rencana Berkunjung
                  {{ formatTranslatedDate(selected.rujukanKeluarRS.tglRencanaKunjungan) }}</td>
              </tr>
            </table>

            <table class="custom-table" style="width:40%" align="center">
              <tr>
                <td style=""></td>
                <td style=" height: 5rem;" class="fs-12" align="center">Mengetahui</td>
              </tr>
              <tr align="center">
                <td></td>
                <td class="fs-12" align="center">(............................)</td>
              </tr>
            </table>
          </div>


          <table class="custom-table" style="width: 60%; align-self: flex-start; margin-top: 1rem;">
            <tr class="tr-h-35">
              <td colspan="3" style="white-space: nowrap;">Tgl cetak {{ formatTranslatedDateTime(dateNow) }}</td>
            </tr>
          </table>


        </div>
      </div>
    </div>
    <DaftarRujukanKeluarRS class="mt-4" @selectKontrol="handleSelectRujukan" :isCreatedOrUpdated="isCreatedOrUpdated"
      @isCreatedOrUpdated="isCreatedOrUpdated = false" />
  </div>
</template>

<script>
import moment from 'moment'
import DaftarRujukanKeluarRS from './daftarRujukanKeluarRS.vue'
import RujukanByNoRujukan from './rujukanByNoRujukan.vue'
import print from '../../../components/print.js';
moment.locale('id')

export default {
  name: 'vclaim-rujukan-keluar',
  components: {
    DaftarRujukanKeluarRS,
    RujukanByNoRujukan,
  },
  data() {
    return {
      dateNow: moment(),
      modes: {
        add: 'add',
        edit: 'edit',
      },
      configAPI: {
        insert: 'rujukan/register',
        update: 'rujukan/update',
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
        diagRujukan: [],
        poliRujukan: [],
        registrasi_id: [],
      },
      fields: {
        noSep: '',
        tglRujukan: moment().startOf('day').format('YYYY-MM-DD'),
        tglRencanaKunjungan: moment().startOf('day').format('YYYY-MM-DD'),
        ppkDirujuk: '',
        jnsPelayanan: '',
        catatan: '',
        diagRujukan: '',
        tipeRujukan: '',
        poliRujukan: '',
        user: 'user ws',
        registrasi_id: '',

        noRujukan: '', // update
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
          diagRujukan: '',
          poliRujukan: '',
        },
        diagRujukan: [],
        poliRujukan: [],
      },
      selected: {
        registrasi_id: {},
        rujukanKeluarRS: {},
        rujukanByNoRujukan: {},
      },
      isCreatedOrUpdated: false,
      isLoadingSubmit: false,
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY')
    },
    addedThreeMonth() {
      return moment().add(3, 'month').format('YYYY-MM-DD')
    },
    formatTranslatedDateTime(paramDate) {
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
        if (res.isConfirmed) {
          param.tipeRujukan = param.tipeRujukan ? param.tipeRujukan : ''
          param.poliRujukan = param.jnsPelayanan == this.jnsPelayanan.rawatInap ? '' : param.poliRujukan
          if (res.value && this.modeSubmit === this.modes.add) {
            delete param.noRujukan

            this.$_api.post(this.configAPI.insert, param).then((res) => {
              console.log(res, 'insertSPRI');
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
          } else if (res.value && this.modeSubmit === this.modes.edit) {
            this.$_api.post(this.configAPI.update, param).then((res) => {
              console.log(res, 'insertRencanaKontrol');
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
        }
      }).finally(() => {
        this.isLoadingSubmit = false
      })
    },
    handleSelectRujukan(data) {
      console.log(data, 'handleSelectRujukan');

      this.selected.rujukanKeluarRS = data
      this.fields.noRujukan = data.noRujukan
      this.fields.tglRujukan = data.tglRujukan
      this.fields.jnsPelayanan = data.jnsPelayanan
      this.fields.noSep = data.noSep
      this.fields.ppkDirujuk = data.ppkDirujuk
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
        diagRujukan: '',
        tipeRujukan: '',
        poliRujukan: '',
        user: 'user ws',
        registrasi_id: '',

        noRujukan: '', // update
      }

      this.filters = {
        param: {
          diagRujukan: '',
          poliRujukan: '',
        },
        diagRujukan: [],
        poliRujukan: [],
      }

      this.list.kodeDokter = []
      this.list.poliKontrol = []
      this.list.registrasi_id = []

      this.selected = {
        registrasi_id: {},
        rujukanKeluarRS: {},
      }
    },
    onRemove(variableName) {
      this.filters[variableName] = [];
      this.filters.param[variableName] = '';
      this.fields[variableName] = '';
    },
    onSelectDiagRujukan(selected) {
      this.filters.param.diagRujukan = selected.kode
      this.filters.diagRujukan = selected
      this.fields.diagRujukan = selected.kode
    },
    async getDiagnosa(data) {
      this.$_api.post('bpjs/vclaim/refrensi/getDiagnosa', {
        kode: data,
      }).then((res) => {
        if (res.status == 200) {
          this.list.diagRujukan = res.data
          this.$_alert.success('Berhasil mengambil data diagnosa', res.message)
        } else {
          this.list.diagRujukan = []
          this.$_alert.success(res.message)
        }
      }).catch((err) => {
        this.list.diagRujukan = []
        this.$_alert.success(res.message)
        console.log(err);
      })
    },
    onSelectPoliRujukan(selected) {
      this.filters.param.poliRujukan = selected.kode
      this.filters.poliRujukan = selected
      this.fields.poliRujukan = selected.kode
    },
    getPoliklinik(data) {
      this.$_api.post('bpjs/vclaim/refrensi/getPoli', {
        kode: data,
      }).then((res) => {
        if (res.status == 200) {
          this.list.poliRujukan = res.data
          this.$_alert.success('Berhasil mengambil data poliklinik', res.message)
        } else {
          this.list.poliRujukan = []
          this.$_alert.success(res.message)
        }
      }).catch((err) => {
        this.list.poliRujukan = []
        this.$_alert.success(res.message)
        console.log(err);
      })
    },
    getSelectedRegistrasi() {
      this.$_api.single('registrasi', null, this.fields.registrasi_id).then((res) => {
        if (res.status == 200) {
          let data = res.data[0]
          console.log(res, 'getSelectedRegistrasi');
          this.fields.noSep = data.no_sep

          this.fields.jnsPelayanan = data.kode_jenis_layanan == 'RAJAL' ? this.jnsPelayanan.rawatJalan : this.jnsPelayanan.rawatInap
          this.fields.catatan = data.keterangan_registrasi
        } else {
          this.$_alert.error(res, 'Gagal mengambil data registrasi', res.message)
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal mengambil data registrasi', err.message)
        console.log(err);
      })
    },
    getSelectedRujukan() {
      this.$_api.post('bpjs/vclaim/rujukan/getDataRujukanKeluarRSberdasarkanNoRujukan', {
        noRujukan: this.fields.noRujukan,
        tipe: 'PCARE'
      }).then((res) => {
        if (res.status == 200) {
          this.modeSubmit = this.modes.edit
          this.$_alert.success('Berhasil mengambil data rujukan', res.message)
          let data = res.data
          console.log(res, 'getSelectedRujukan');
          this.selected.rujukanKeluarRS = data
          this.fields.noRujukan = data.noRujukan
          this.fields.noSep = data.noSep
          this.fields.tglRujukan = data.tglRujukan
          this.fields.tglRencanaKunjungan = data.tglRencanaKunjungan
          this.fields.ppkDirujuk = data.ppkDirujuk
          this.fields.jnsPelayanan = data.jnsPelayanan
          this.fields.catatan = data.catatan
          this.fields.diagRujukan = data.diagRujukan
          this.fields.tipeRujukan = data.tipeRujukan
          this.fields.poliRujukan = data.poliRujukan

          this.filters.param.diagRujukan = data.diagRujukan

          this.getDiagnosa(data.namaDiagRujukan)

          if (data.namaPoliRujukan) {
            this.getPoliklinik(data.namaPoliRujukan)
          }
        } else {
          this.$_alert.error(res, 'Gagal mengambil data rujukan', res.message)
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal mengambil data rujukan', err.message)
        console.log(err);
      })
    },
    handleSendNoRujukan(noRujukan) {
      this.fields.noRujukan = noRujukan
      this.getSelectedRujukan()
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
    async cetakSurat(el) {
      console.log(el, 'cetakSurat');

      const options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          '/static/assets/cetak/cetak-surat-rujukan-keluar-rs.css',
        ],
        timeout: 100000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }

      // await this.$htmlToPaper(el, options)
      print(el, options);
    }
  },
  mounted() {
    // this.getSepList()
    // this.getPoliKontrol()
  },
  watch: {
    'fields.tipeRujukan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue == this.tipeRujukan.balikPRB) {
          this.fields.poliRujukan = ''
          this.filters.poliRujukan = []
          this.filters.param.poliRujukan = ''
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
    'list.diagRujukan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue && newValue.length > 0 && this.fields.diagRujukan) {
          let data = newValue.find((item) => item.kode == this.fields.diagRujukan)
          this.filters.diagRujukan = data
        }
      },
    },
    'list.poliRujukan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue && newValue.length > 0 && this.fields.poliRujukan) {
          let data = newValue.find((item) => item.kode == this.fields.poliRujukan)
          this.filters.poliRujukan = data
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
