<template>
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong>Form {{ modeSubmit == modes.add ? 'Pembuatan' : 'Edit' }}
              {{ fields.jnsKontrol == jnsKontrol.spri ? 'SPRI' : 'Rencana Kontrol' }}</strong></h3>
        </b-col>
      </b-row>
      <!-- <pre>{{ fields }}</pre> -->
      <!-- <pre>{{ dataRegistrasi }}</pre> -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)" autocomplete="off">
          <b-row class="mb-2">
            <b-col cols="12">
              <b-form-group cols="3" label="Jenis Kontrol">
                <b-form-radio-group v-model="fields.jnsKontrol" :options="list.jnsKontrol" name="radio-inline"
                  @change="resetSelected" :disabled="modeSubmit == modes.edit"></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              <s-input groupClass="mb-0" v-model="fields.noKartu" :item="{
                label: 'No. BPJS',
                id: 'noKartu',
                data: 'noKartu',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noKartu" v-if="fields.jnsKontrol == jnsKontrol.spri" @input="getPoliKontrol"
                :disabled="modeSubmit == modes.edit" />

              <s-input groupClass="mb-0" v-model="fields.noSEP" :item="{
                label: 'No. SEP',
                id: 'noSEP',
                data: 'noSEP',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noSEP" v-if="fields.jnsKontrol == jnsKontrol.rencanaKontrol" @input="getPoliKontrol"
                :disabled="modeSubmit == modes.edit" />
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
                  display: ['nama_lengkap', 'nama_jenis_layanan', 'no_identitas_registrasi', 'tgl_registrasi', 'no_sep', 'no_asuransi_registrasi'],
                  headerDisplay: ['Nama Pasien', 'Jenis Layanan', 'NIK', 'Tanggal Registrasi', 'No SEP', 'No BPJS'],
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
          </b-row>
          <b-row class="mb-2" v-if="modeSubmit == modes.edit">
            <b-col cols="4">
              <s-input groupClass="mb-0" v-model="fields.noSuratKontrol" :item="{
                label: fields.jnsKontrol == jnsKontrol.spri ? 'No. SPRI' : 'No. Surat Kontrol',
                id: 'noSuratKontrol',
                data: 'noSuratKontrol',
                type: 'text',
                validation: ['required'],
              }" :valuee="fields.noSuratKontrol" v-if="fields.jnsKontrol == jnsKontrol.rencanaKontrol"
                :disabled="true" />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <s-input groupClass="mb-0" v-model="fields.tglRencanaKontrol" :item="{
                label: 'Tanggal Rencana Kontrol',
                id: 'tglRencanaKontrol',
                data: 'tglRencanaKontrol',
                type: 'date',
                validation: ['required'],
              }" :valuee="dateDefault.start" @input="getReference" />
            </b-col>
            <b-col cols="3">
              <s-input v-model="fields.poliKontrol" :key="'kodePoli'" :id="'kodePoli'" :item="{
                label: 'Poliklinik',
                id: 'poliKontrol',
                data: 'poliKontrol',
                type: 'lookup-radio',
                validation: ['required'],
                value: fields.poliKontrol,
                pointer: {
                  label: 'namaPoli',
                  code: 'kodePoli',
                  display: ['namaPoli', 'kodePoli', 'kapasitas', 'jmlRencanaKontroldanRujukan', 'persentase'],
                  headerDisplay: ['Nama Poli', 'Kode Poli', 'Kapasitas', 'Jumlah Rencana Kontrol dan Rujukan', 'Persentase'],
                  list: list.poliKontrol,
                  customDetailApi: {
                    api: 'bpjs/vclaim/rencanaKontrol/getDataPoli',
                    params: {
                      jenisKontrol: fields.jnsKontrol,
                      nomor: fields.jnsKontrol == jnsKontrol.spri ? fields.noKartu : fields.noSEP,
                      tglRencanaKontrol: fields.tglRencanaKontrol,
                    },
                  }
                },
                param: {},
              }" :disabled="list.poliKontrol.length === 0" :valuee="fields.poliKontrol" @input="getDokter" />
            </b-col>
            <b-col cols="3">
              <s-input v-model="fields.kodeDokter" :key="'kodeDokter'" :id="'kodeDokter'" :item="{
                label: 'Dokter',
                id: 'kodeDokter',
                data: 'kodeDokter',
                type: 'lookup-radio',
                validation: ['required'],
                value: fields.kodeDokter,
                pointer: {
                  label: 'namaDokter',
                  code: 'kodeDokter',
                  display: ['namaDokter', 'kodeDokter', 'kapasitas', 'jadwalPraktek'],
                  headerDisplay: ['Nama Dokter', 'Kode Dokter', 'Kapasitas', 'Jadwal Praktek'],
                  list: list.kodeDokter,
                  customDetailApi: {
                    api: 'bpjs/vclaim/rencanaKontrol/getDataDokter',
                    params: {
                      jenisKontrol: fields.jnsKontrol,
                      kodePoli: fields.poliKontrol,
                      tglRencanaKontrol: fields.tglRencanaKontrol,
                    },
                  }
                },
                param: {},
              }" :disabled="list.kodeDokter.length === 0" :valuee="fields.kodeDokter" />
            </b-col>

            <b-col cols="12" sm="12" md="12" lg="12">
              <div class="row align-self-end mt-2">
                <b-col cols="12" sm="12" md="12" lg="12" style="gap: 10px;display: flex;">
                  <button type="button" class="btn btn-success" :disabled="modeSubmit == modes.add"
                    @click="cetakSurat(fields.jnsKontrol === '1' ? 'cetak-spri' : 'cetak-rencana-kontrol')">Cetak Surat <i
                      class="ri-printer-line"></i></button>
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
    
    <DaftarRencanaKontrol class="mt-4" @selectKontrol="handleSelectKontrol" :isCreatedOrUpdated="isCreatedOrUpdated"
      @isCreatedOrUpdated="isCreatedOrUpdated = false" />
    <div style="position: relative; display: none" id="cetak-rencana-kontrol">
      <div size="A4">
        <div class="w-100" style="display: flex; flex-direction: column; align-items: center;">
          <!-- KOP -->
          <table class="custom-table">
            <tr style="border-bottom: 1px solid #000">
              <td align="center">
                <img :src="$_config.logo.lg" alt="Logo" style="max-height: 60px;" />
              </td>
              <td align="center">
                <span class="text-center" style="display: flex; flex-direction: column; align-items: center;">
                  <h1 style="margin-bottom: 0; font-weight: 700; font-size: 25px;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h1>
                  <p style="margin-bottom: 0; margin-top: 10px">Jl. Gajah mada kec.batauga kab.buton selatan</p>
                  <p style="margin-bottom: 0; margin-top: 10px">Tlp. 085257769540</p>
                </span>
              </td>
              <td align="center">
                <img src="https://madania.co.id/wp-content/uploads/2023/08/photo.jpg" alt="Logo"
                  style="max-height: 60px;" />
              </td>
            </tr>
          </table>
          <hr>
          <!-- HEADER -->
          <table style="width: 45%; margin-top: 3rem">
            <tr>
              <td align="center">
                <h3 style="font-weight: 600; border-bottom: 2px solid #000;width: max-content;padding-bottom: 12px;">
                  SURAT KETERANGAN KONTROL RAWAT JALAN
                </h3>
              </td>
            </tr>
            <tr>
              <td align="center">Nomor Surat : {{ selectedKontrol.noSuratKontrol || '-' }}</td>
            </tr>
          </table>

          <!-- CONTENT 1 -->
          <table style="width: 100%; margin-top: 3rem">
            <tr>
              <td style="" rowspan="2">
                Kepada Yth
              </td>
              <td>
                <span>
                  {{ selectedRegistrasi.nama_dokter }}
                </span>
                <br>
                <span style="padding-top: 15px;">
                  Sp. {{ selectedRegistrasi.nama_specialist }}
                </span>
              </td>
            </tr>
            <tr>
            </tr>
          </table>

          <!-- CONTENT 2 -->
          <table class="custom-table">
            <tr class="tr-h-35">
              <td colspan="3">Mohon Pemeriksaan dan Penanganan Lebih Lanjut:</td>
            </tr>
            <tr class="tr-h-35">
              <td style="width: 25%;">No. RM</td>
              <td style="width: 5px;">:</td>
              <td>{{ selectedKontrolLog.no_rm || '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>No. Kartu</td>
              <td>:</td>
              <td>{{ selectedKontrolLog.no_asuransi_registrasi || '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Nama Peserta</td>
              <td>:</td>
              <td>{{ selectedKontrolLog.nama_lengkap }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Jenis Kelamin</td>
              <td>:</td>
              <td>{{ selectedKontrolLog.jenis_kelamin | parse('kelamin') }}</td>
            </tr>
            <!-- <tr class="tr-h-35">
                      <td>Diagnosa</td>
                      <td>:</td>
                      <td>-</td>
                  </tr> -->
            <tr class="tr-h-35">
              <td>Tanggal Kontrol</td>
              <td>:</td>
              <td>{{ selectedKontrol.tglRencanaKontrol | parse('date') }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Poli Tujuan</td>
              <td>:</td>
              <td>{{ list.poliKontrol.length && list.poliKontrol[0] ? list.poliKontrol[0].namaPoli : '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Tanggal Kontrol</td>
              <td>:</td>
              <td>{{ selectedKontrolLog && selectedKontrolLog.response_kontrol && selectedKontrolLog.response_kontrol.namaDiagnosa ? selectedKontrolLog.response_kontrol.namaDiagnosa : '-' }}</td>
            </tr>
          </table>

          <!-- CONTENT 3 -->
          <table class="custom-table" style="margin-top: 5rem">
            <tr>
              <td style="width: 25%;" class="fs-12">Dokter</td>
              <td style="width: 5px;" class="fs-12">:</td>
              <td class="fs-12">{{ selectedRegistrasi.nama_dokter }}</td>
            </tr>
            <tr>
              <td style="width: 25%;" class="fs-12">Dibuat di</td>
              <td style="width: 5px;" class="fs-12">:</td>
              <td class="fs-12">Bau Bau</td>
            </tr>
            <tr>
              <td style="width: 25%;" class="fs-12">Tanggal</td>
              <td style="width: 5px;" class="fs-12">:</td>
              <td class="fs-12">{{ dateNow | parse('date') }}</td>
            </tr>
            <tr>
              <td class="fs-12" colspan="3">Surat Kontrol Elektronik ini Syah Tanpa Tanda Tangan, UU Pradok No 29/2004
                Penjelasan Ps 46 (3)</td>
            </tr>
          </table>

        </div>
      </div>
    </div>

    <div style="position: relative; display: none" id="cetak-spri">
      <div size="A4">
        <div class="w-100" style="display: flex; flex-direction: column; align-items: center;">
          <!-- KOP -->
          <table class="custom-table">
            <tr style="border-bottom: 1px solid #000">
              <td align="center">
                <img :src="$_config.logo.lg" alt="Logo" style="max-height: 60px;" />
              </td>
              <td align="center" colspan="2">
                <span class="text-center" style="display: flex; flex-direction: column; align-items: center;">
                  <h1 style="margin-bottom: 0; font-weight: 700; font-size: 25px;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h1>
                  <p style="margin-bottom: 0; margin-top: 10px">Jl. Gajah mada kec.batauga kab.buton selatan</p>
                  <p style="margin-bottom: 0; margin-top: 10px">Tlp. 085257769540</p>
                </span>
              </td>
            </tr>
          </table>
          <hr>
          <!-- HEADER -->
          <table style="width: 45%; margin-top: 3rem">
            <tr>
              <td align="center">
                <h3 style="font-weight: 600; border-bottom: 2px solid #000;width: max-content;padding-bottom: 12px;">
                  SURAT PENGANTAR RAWAT INAP
                </h3>
              </td>
            </tr>
            <tr>
              <td align="center" style="text-wrap:nowrap;">Nomor Surat : {{ fields.noSuratKontrol || '-' }}</td>
            </tr>
          </table>

          <!-- CONTENT 1 -->


          <!-- CONTENT 2 -->
          <table class="custom-table">
            <tr class="tr-h-35">
              <td colspan="3">Yang bertanda tangan dibawah ini, memberikan pengantar rawat inap kepada pasien: </td>
            </tr>
            <tr class="tr-h-35">
              <td style="width: 25%;">No. RM</td>
              <td style="width: 5px;">:</td>
              <td>{{ selectedKontrolLog.no_rm || selectedNoKartu.mr.noMR || '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>No. Kartu</td>
              <td>:</td>
              <td>{{ selectedKontrol.noKartu || '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Jenis Kartu</td>
              <td>:</td>
              <td>{{ selectedNoKartu && selectedNoKartu.jenisPeserta ? selectedNoKartu.jenisPeserta.keterangan : '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Hak Kelas</td>
              <td>:</td>
              <td>{{ selectedNoKartu && selectedNoKartu.hakKelas ? selectedNoKartu.hakKelas.keterangan : '-' }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Nama Peserta</td>
              <td>:</td>
              <td>{{ selectedKontrolLog.nama_lengkap ? selectedKontrolLog.nama_lengkap : selectedKontrol.nama }}</td>
            </tr>
            <tr class="tr-h-35">
              <td>Jenis Kelamin</td>
              <td>:</td>
              <td>
                {{ (selectedKontrolLog.jenis_kelamin ? selectedKontrolLog.jenis_kelamin : selectedNoKartu.sex) | parse('kelamin') }}
              </td>
            </tr>
            <tr class="tr-h-35">
              <td>Umur</td>
              <td>:</td>
              <td>{{ selectedNoKartu && selectedNoKartu.umur ? selectedNoKartu.umur.umurSekarang : '-' }}</td>
            </tr>
            <!-- <tr class="tr-h-35">
                      <td>Diagnosa</td>
                      <td>:</td>
                      <td>-</td>
                  </tr>
                  <tr class="tr-h-35">
                      <td>Tanggal Kontrol</td>
                      <td>:</td>
                      <td>{{ fields.tglRencanaKontrol | parse('date') }}</td>
                  </tr> -->
          </table>

          <!-- CONTENT 3 -->
          <table class="custom-table" style="margin-top: 5rem" align="center">
            <tr>
              <td style="width: 70%;"></td>
              <td style="width: 30%; height: 5rem;" class="fs-12" align="center">Dokter yang memeriksa</td>
            </tr>
            <tr align="center">
              <td></td>
              <td class="fs-12" align="center">(............................)</td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DaftarRencanaKontrol from './daftarRencanaKontrol.vue'
import print from '../../../components/print.js';
moment.locale('id')

export default {
  name: 'vclaim-kontrol',
  components: {
    DaftarRencanaKontrol
  },
  data() {
    return {
      dateNow: moment(),
      modes: {
        add: 'add',
        edit: 'edit',
      },
      configAPI: {
        insertSPRI: 'spri/register',
        insertRencanaKontrol: 'rencanaKontrol/register',
        updateSPRI: 'spri/update',
        updateRencanaKontrol: 'rencanaKontrol/update',
        deleteRencanaKontrol: 'rencanaKontrol/deleteRencanaKontrol',
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
        jnsKontrol: [
          { text: 'SPRI', value: '1' },
          { text: 'Rencana Kontrol', value: '2' },
        ],
        kodeDokter: [],
        poliKontrol: [],
      },
      fields: {
        jnsKontrol: '1',
        noKartu: '',
        kodeDokter: '',
        poliKontrol: '',
        tglRencanaKontrol: moment().startOf('day').format('YYYY-MM-DD'),
        user: '',
        noSuratKontrol: '',
        noSEP: '',
        noSPRI: '',
        registrasi_id: '',
      },
      jnsKontrol: {
        spri: '1',
        rencanaKontrol: '2',
      },
      filters: {
        param: {
          kodeDokter: '',
          poliKontrol: '',
        },
        kodeDokter: '',
        poliKontrol: '',
      },
      selectedKontrol: {},
      selectedNoKartu: {
        mr: {
          noMR: '',
        }
      },
      selectedPasien: {},
      selectedRegistrasi: {},
      selectedKontrolLog: {},
      isCreatedOrUpdated: false,
      isLoadingSubmit: false,

      dataRegistrasi: {},

      dataSuratKontrol: {},
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY HH:mm')
    },
    submitForm() {
      if (this.isLoadingSubmit) return
      let param = JSON.parse(JSON.stringify(this.fields))

      let createOrUpdate = this.modeSubmit === this.modes.add ? 'DIBUAT' : 'DIPERBARUI'
      let jenisKontrol = this.fields.jnsKontrol == this.jnsKontrol.spri ? 'SPRI' : 'Rencana Kontrol'

      let authUser = JSON.parse(localStorage.getItem('profile'))
      param.user = 'Coba W'
      if (authUser) {
        this.authUser = authUser
        this.user = authUser.username
        param.user = authUser.username
      }

      this.$_alert.confirm('Simpan Data', `${jenisKontrol} akan ${createOrUpdate}, ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed) {
          if (res.value && this.modeSubmit === this.modes.add) {
            if (this.fields.jnsKontrol == this.jnsKontrol.spri) {
              delete param.jnsKontrol
              delete param.noSEP
              delete param.noSPRI
              delete param.noSuratKontrol

              this.$_api.post(this.configAPI.insertSPRI, param).then((res) => {
                if (res.status == 200) {
                  this.$_alert.success(`${jenisKontrol} Berhasil ${createOrUpdate}`, 'Data berhasil disimpan')
                  this.isCreatedOrUpdated = true
                  this.resetForm()
                } else {
                  this.$_alert.error(res, `${jenisKontrol} Gagal ${createOrUpdate}`, res.message)
                }
              }).catch((error) => {
                this.$_alert.error(error, `${jenisKontrol} Gagal ${createOrUpdate}`, error.message)
              })
            } else if (this.fields.jnsKontrol == this.jnsKontrol.rencanaKontrol) {
              delete param.jnsKontrol
              delete param.noKartu
              delete param.noSPRI
              delete param.noSuratKontrol

              this.$_api.post(this.configAPI.insertRencanaKontrol, param).then((res) => {
                if (res.status == 200) {
                  this.$_alert.success(`${jenisKontrol} Berhasil ${createOrUpdate}`, 'Data berhasil disimpan')
                  this.isCreatedOrUpdated = true
                  this.resetForm()
                } else {
                  this.$_alert.error(res, `${jenisKontrol} Gagal ${createOrUpdate}`, res.message)
                }
              }).catch((error) => {
                this.$_alert.error(error, `${jenisKontrol} Gagal ${createOrUpdate}`, error.message)
              })
            }
          } else if (res.value && this.modeSubmit === this.modes.edit) {
            if (this.fields.jnsKontrol == this.jnsKontrol.spri) {
              param.noSPRI = param.noSuratKontrol
              delete param.jnsKontrol
              delete param.noSEP
              delete param.noKartu
              delete param.noSuratKontrol

              this.$_api.post(this.configAPI.updateSPRI, param).then((res) => {
                if (res.status == 200) {
                  this.$_alert.success(`${jenisKontrol} Berhasil ${createOrUpdate}`, 'Data berhasil disimpan')
                  this.isCreatedOrUpdated = true
                  this.resetForm()
                } else {
                  this.$_alert.error(res, `${jenisKontrol} Gagal ${createOrUpdate}`, res.message)
                }
              }).catch((error) => {
                this.$_alert.error(error, `${jenisKontrol} Gagal ${createOrUpdate}`, error.message)
              })
            } else if (this.fields.jnsKontrol == this.jnsKontrol.rencanaKontrol) {
              delete param.jnsKontrol
              delete param.noKartu
              delete param.noSPRI
              delete param.noSEP

              this.$_api.post(this.configAPI.updateRencanaKontrol, param).then((res) => {
                if (res.status == 200) {
                  this.$_alert.success(`${jenisKontrol} Berhasil ${createOrUpdate}`, 'Data berhasil disimpan')
                  this.isCreatedOrUpdated = true
                  this.resetForm()
                } else {
                  this.$_alert.error(res, `${jenisKontrol} Gagal ${createOrUpdate}`, res.message)
                }
              }).catch((error) => {
                this.$_alert.error(error, `${jenisKontrol} Gagal ${createOrUpdate}`, error.message)
              })
            }
          }
        }
      }).finally(() => {
        this.isLoadingSubmit = false
      })
    },
    getRencanaKontrolByNoKontrol() {
      this.$_api.post('rencanaKontrol/list', {
        no_surat_kontrol: this.selectedKontrol.noSuratKontrol,
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selectedKontrolLog = res.data[0]
          this.getRegistrasiById(res.data[0].registrasi_id)
          this.$_alert.success(res.message)
        } else {
          this.$_alert.success(res.message)
          this.selectedKontrolLog = {}
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
        this.selectedKontrolLog = {}
      })
    },
    handleSelectKontrol(data) {

      this.selectedKontrol = data.item
      this.fields.jnsKontrol = data.item.jnsKontrol
      this.fields.noKartu = data.item.noKartu
      this.fields.kodeDokter = data.item.kodeDokter
      this.fields.poliKontrol = data.item.poliAsal
      this.fields.tglRencanaKontrol = data.item.tglRencanaKontrol

      if (data.item.jnsKontrol == this.jnsKontrol.spri) {
        this.params.nomor = data.item.noKartu
        // this.getPoliKontrol(data.item.noKartu)
      } else if (data.item.jnsKontrol == this.jnsKontrol.rencanaKontrol) {
        this.params.nomor = data.item.noSepAsalKontrol
        // this.getPoliKontrol(data.item.noSepAsalKontrol)
        // this.getDokter(data.item.poliAsal)
      }

      this.fields.user = data.item.user
      this.fields.noSuratKontrol = data.item.noSuratKontrol
      this.fields.noSEP = data.item.noSepAsalKontrol

      if (data.item.jnsKontrol == this.jnsKontrol.spri) {
        this.params.nomor = data.item.noKartu
      } else if (data.item.jnsKontrol == this.jnsKontrol.rencanaKontrol) {
        this.params.nomor = data.item.noSepAsalKontrol
      }

      this.getRencanaKontrolByNoKontrol()

      this.modeSubmit = this.modes.edit
    },
    onSelect(selectedArray, variableName) {
      this.filter[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filter[variableName] = '';
    },
    getPoliKontrol(nomor) {

      let no = nomor === undefined ? this.params.nomor : nomor
      this.$_api.post('bpjs/vclaim/rencanaKontrol/getDataPoli', {
        jenisKontrol: this.fields.jnsKontrol,
        nomor: no,
        tglRencanaKontrol: this.fields.tglRencanaKontrol,
      }).then((res) => {
        if (res.status == 200) {
          this.list.poliKontrol = res.data
          this.$_alert.success(res.message)
        } else {
          this.list.poliKontrol = []
          this.fields.poliKontrol = ''
          this.$_alert.success(res.message)
        }
      }).catch((error) => {
        this.list.poliKontrol = []
        this.fields.poliKontrol = ''
      })
    },
    getDokter(kodePoli) {
      let poli = kodePoli ? kodePoli : this.fields.poliKontrol

      if (poli) {
        this.$_api.post('bpjs/vclaim/rencanaKontrol/getDataDokter', {
          jenisKontrol: this.fields.jnsKontrol,
          kodePoli: poli,
          tglRencanaKontrol: this.fields.tglRencanaKontrol,
        }).then((res) => {
          if (res.status == 200) {
            this.list.kodeDokter = res.data
            this.$_alert.success(res.message)
          } else {
            this.list.kodeDokter = []
            this.fields.kodeDokter = ''
            this.$_alert.success(res.message)
          }
        }).catch((error) => {
          this.list.kodeDokter = []
          this.fields.kodeDokter = ''
        })
      }
    },
    resetSelected() {
      this.fields.kodeDokter = ''
      this.fields.poliKontrol = ''

      this.list.kodeDokter = []
      this.list.poliKontrol = []
    },
    resetForm() {
      this.modeSubmit = this.modes.add
      this.fields = {
        jnsKontrol: '1',
        noKartu: '',
        kodeDokter: '',
        poliKontrol: '',
        tglRencanaKontrol: moment().startOf('day').format('YYYY-MM-DD'),
        user: '',
        noSuratKontrol: '',
        noSEP: '',
        noSPRI: '',
        registrasi_id: '',
      }

      this.filters = {
        param: {
          kodeDokter: '',
          poliKontrol: '',
        },
        kodeDokter: '',
        poliKontrol: '',
      }

      this.list.kodeDokter = []
      this.list.poliKontrol = []
    },
    getReference() {
      this.getPoliKontrol()
      this.getDokter()
    },
    getPesertaByNoKartu() {
      let noKartu = this.selectedKontrol.noKartu
      this.$_api.post('bpjs/vclaim/peserta/getPesertaByNoKartu', {
        noKartu: noKartu,
        jenis: 'bpjs'
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selectedNoKartu = res.data[0].peserta
          this.$_alert.success(res.message)
        } else {
          this.$_alert.success(res.message)
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
      })
    },
    getRegistrasiById() {
      this.$_api.single('registrasi', {}, this.selectedKontrolLog.registrasi_id).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selectedRegistrasi = res.data[0]
          this.fields.registrasi_id = res.data[0].registrasi_id
          this.fields.noKartu = res.data[0].no_asuransi_registrasi
          this.fields.noSEP = res.data[0].no_sep
        } else {
          this.$_alert.success(res.message)
          this.selectedRegistrasi = {}
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
        this.selectedRegistrasi = {}
      })
    },
    // getRegistrasiByNoKartu() {
    //   this.$_api.post('registrasi/list', {
    //     no_asuransi_registrasi: this.selectedKontrol.noKartu,
    //     no_kontrol: this.selectedKontrol.noSuratKontrol,
    //   }).then((res) => {
    //     if (res.status === 200 && res.data.length > 0) {
    //       this.selectedRegistrasi = res.data[0]
    //       this.fields.registrasi_id = res.data[0].registrasi_id
    //     } else {
    //       this.$_alert.success(res.message)
    //       this.selectedRegistrasi = {}
    //     }
    //   }).catch((err) => {
    //     this.$_alert.error(err, 'Gagal', err.message)
    //     this.selectedRegistrasi = {}
    //   })
    // },
    getPasienByPasienId() {
      this.$_api.single('pasien', {}, this.selectedRegistrasi.pasien_id).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selectedPasien = res.data[0]
        } else {
          this.$_alert.success(res.message)
          this.selectedPasien = {}
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
        this.selectedPasien = {}
      })
    },

    async cetakSurat(el) {

      // if (el === 'cetak-surat-kontrol') {
      //   if (!this.dataRegistrasi.registrasi_id || !this.fields.noSEP) {
      //     this.$_alert.error({}, 'Data registrasi atau no sep kosong')
      //     return
      //   }
      // } else {
      //   if (el === 'cetak-spri') {
      //     if (!this.dataRegistrasi.registrasi_id || !this.fields.noKartu) {
      //       this.$_alert.error({}, 'Data registrasi atau no kartu kosong')
      //       return
      //     }
      //   }
      // }

      const options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          '/static/assets/cetak/cetak-surat-kontrol.css',
          '/static/assets/cetak/cetak-sep.css',
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
    'fields': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.jnsKontrol == this.jnsKontrol.spri) {
          this.params.nomor = this.fields.noKartu
        } else if (newValue.jnsKontrol == this.jnsKontrol.rencanaKontrol) {
          this.params.nomor = this.fields.noSEP
        }
      },
    },
    'fields.registrasi_id': {
      deep: true,
      immediate: true,
      handler(to, from) {
        if (to) {
          this.$_api.single('registrasi', {}, to).then((res) => {
            if (res.data.length > 0) {
              this.dataRegistrasi = res.data[0]
              this.fields.noKartu = res.data[0].no_asuransi_registrasi
              this.fields.noSEP = res.data[0].no_sep
              this.selectedRegistrasi = res.data[0]
            }
          });
        }
      }
    },
    'fields.noSuratKontrol': {
      deep: true,
      immediate: true,
      handler(to, from) {
        if (to) {
          // this.$_api.list('rencanaKontrol', {  })
        }
      }
    },
    'fields.jnsKontrol': {
      deep: true,
      immediate: true,
      handler(to, from) {
        if (to && this.fields.registrasi_id && this.selectedRegistrasi) {
          if (to == this.jnsKontrol.spri) {
            this.params.nomor = this.selectedRegistrasi.no_asuransi_registrasi
            this.fields.noKartu = this.selectedRegistrasi.no_asuransi_registrasi
          } else {
            this.params.nomor = this.selectedRegistrasi.no_sep
            this.fields.noSEP = this.selectedRegistrasi.no_sep
          }
        }
      }
    },
    'params': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
      },
    },
    'selectedKontrol': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.noKartu) {
          this.getPesertaByNoKartu()
          // this.getRegistrasiById()
        }
      },
    },
    'selectedRegistrasi': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.pasien_id) {
          this.getPasienByPasienId()
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
