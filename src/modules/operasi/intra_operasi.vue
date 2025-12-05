<template>
  <div>
    <div class="card card-custom mb-5" v-if="loading">
      <div class="card-body d-flex justify-content-center">
        <div class="spinner spinner-track spinner-primary"></div>
      </div>
    </div>

    <div class="animated" v-else>
      <div class="card card-custom mb-5">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column justify-content-center">
            <span class="card-label font-weight-bolder text-dark">{{ title }}</span>
          </h3>
          <div class="card-toolbar my-0 align-items-center">
            <button class="btn btn-primary btn-circle" v-if="view === 'detail' && ![0, 1].includes(status)" @click="setView('formulir')">
              <i class="ri-edit-line p-0"></i> Perbarui
            </button>
            <!-- <button class="btn btn-outline-danger btn-icon btn-circle ml-2" v-if="view === 'detail' && fields.id" @click="onDelete">
              <i class="ri-delete-bin-2-line p-0"></i>
            </button> -->
            <button class="btn btn-outline-primary btn-icon btn-circle" v-else-if="view !== 'form' && ![0, 1].includes(status)" @click="setView('detail')">
              <i class="ri-arrow-go-back-line p-0"></i>
            </button>
          </div>
        </div>

        <div class="card-body py-2 mt-3 pb-3">
          <div class="alert alert-custom alert-light-primary fade show mb-5" role="alert" v-if="[0, 1].includes(status)">
            <div class="alert-icon">
              <i class="ri-error-warning-line"></i>
            </div>
            <div class="alert-text">Tidak dapat input intra operasi, jadwal {{ status === 0 ? 'telah dibatalkan' : 'belum diproses' }}!</div>
            <div class="alert-close">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="ki ki-close"></i></span>
              </button>
            </div>
          </div>

          <div v-else-if="status === 3 && hasil">
            <div class="row">
              <div class="col-6">
                <div class="table-responsive">
                  <table class="table table-detail">
                    <tbody>
                      <tr><td>Posisi Operasi</td><td>:</td><td>{{ hasil.posisi_operasi }}</td></tr>
                      <tr><td>Jenis Anestesi</td><td>:</td><td>{{ hasil.jenis_anestesi }}</td></tr>
                      <tr><td>Tekanan Darah Awal</td><td>:</td><td>{{ hasil.tekanan_darah_awal }}</td></tr>
                      <tr><td>Tekanan Darah Akhir</td><td>:</td><td>{{ hasil.tekanan_darah_akhir }}</td></tr>
                      <tr><td>Nadi Awal</td><td>:</td><td>{{ hasil.nadi_awal }}</td></tr>
                      <tr><td>Nadi Akhir</td><td>:</td><td>{{ hasil.nadi_akhir }}</td></tr>
                      <tr><td>Saturasi O2</td><td>:</td><td>{{ hasil.saturasi_o2 }}</td></tr>
                      <tr><td>Suhu Tubuh</td><td>:</td><td>{{ hasil.suhu_tubuh }}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6">
                <div class="table-responsive">
                  <table class="table table-detail">
                    <tbody>
                      <tr><td class="min-w-180px">Volume Cairan Masuk</td><td>:</td><td>{{ hasil.volume_cairan_masuk }}</td></tr>
                      <tr><td>Volume Cairan Keluar</td><td>:</td><td>{{ hasil.volume_cairan_keluar }}</td></tr>
                      <tr><td>Jumlah Darah (ml)</td><td>:</td><td>{{ hasil.jumlah_darah }}</td></tr>
                      <!-- <tr><td>Operator Utama</td><td>:</td><td>{{ hasil.operator_utama?.nama_dokter ?? hasil.operator_utama_nama }}</td></tr> -->
                      <tr><td>Komplikasi Intra</td><td>:</td><td>{{ hasil.komplikasi_intra }}</td></tr>
                      <tr><td>Tindakan Intra</td><td>:</td><td>{{ hasil.tindakan_intra }}</td></tr>
                      <tr><td>Catatan Perawat</td><td>:</td><td>{{ hasil.catatan_perawat }}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <ValidationObserver v-slot="{ handleSubmit }" v-else>
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-6">
                  <s-input v-model="fields.waktu_mulai" :item="{
                    label: 'Waktu Mulai',
                    type: 'datetime',
                    validation: ['required'],
                    formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                  }" :valuee="fields.waktu_mulai" />
                </div>
                <div class="col-6">
                  <s-input v-model="fields.waktu_selesai" :item="{
                    label: 'Waktu Selesai',
                    type: 'datetime',
                    validation: [],
                    formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                  }" :valuee="fields.waktu_selesai" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.posisi_operasi" :item="{
                    label: 'Posisi Operasi',
                    id: 'posisi_operasi',
                    data: 'posisi_operasi',
                    type: 'select',
                    validation: [],
                    value: fields.posisi_operasi,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Supine', code: 'Supine' },
                        { label: 'Prone', code: 'Prone' },
                        { label: 'Lithotomy', code: 'Lithotomy' },
                        { label: 'Lateral', code: 'Lateral' },
                      ]
                    },
                    param: {},
                  }" :valuee="fields.posisi_operasi" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.jenis_anestesi" :item="{
                    label: 'Jenis Anestesi',
                    type: 'text',
                    validation: [],
                  }" :valuee="fields.jenis_anestesi" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.tekanan_darah_awal" :item="{
                    label: 'Tekanan Darah Awal',
                    type: 'text',
                    validation: [],
                  }" :valuee="fields.tekanan_darah_awal" />
                </div>
                <div class="col-6">
                  <s-input v-model="fields.tekanan_darah_akhir" :item="{
                    label: 'Tekanan Darah Akhir',
                    type: 'text',
                    validation: [],
                  }" :valuee="fields.tekanan_darah_akhir" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.nadi_awal" :item="{
                    label: 'Nadi Awal',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.nadi_awal" />
                </div>
                <div class="col-6">
                  <s-input v-model="fields.nadi_akhir" :item="{
                    label: 'Nadi Akhir',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.nadi_akhir" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.saturasi_o2" :item="{
                    label: 'Saturasi O2',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.saturasi_o2" />
                </div>
                <div class="col-6">
                  <s-input v-model="fields.suhu_tubuh" :item="{
                    label: 'Suhu Tubuh (°C)',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.suhu_tubuh" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.volume_cairan_masuk" :item="{
                    label: 'Volume Cairan Masuk (ml)',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.volume_cairan_masuk" />
                </div>
                <div class="col-6">
                  <s-input v-model="fields.volume_cairan_keluar" :item="{
                    label: 'Volume Cairan Keluar (ml)',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.volume_cairan_keluar" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.jumlah_darah" :item="{
                    label: 'Jumlah Darah (ml)',
                    type: 'number',
                    validation: ['numeric'],
                  }" :valuee="fields.jumlah_darah" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.operator_utama_id" :item="{
                    label: 'Operator Utama',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                    },
                    param: {  }
                  }" :valuee="fields.operator_utama_id" />
                </div>

                <div class="col-12">
                  <s-input v-model="fields.komplikasi_intra" :item="{
                    label: 'Komplikasi Intra',
                    type: 'textarea',
                    validation: [],
                  }" :valuee="fields.komplikasi_intra" />
                </div>

                <div class="col-12">
                  <s-input v-model="fields.tindakan_intra" :item="{
                    label: 'Tindakan Intra',
                    type: 'textarea',
                    validation: [],
                  }" :valuee="fields.tindakan_intra" />
                </div>

                <div class="col-12">
                  <s-input v-model="fields.catatan_perawat" :item="{
                    label: 'Catatan Perawat',
                    type: 'textarea',
                    validation: [],
                  }" :valuee="fields.catatan_perawat" />
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-12 d-flex">
                  <button type="submit" class="btn btn-primary mr-2">{{ fields.id ? 'Update' : 'Simpan' }}</button>
                  <button type="button" class="btn btn-secondary" v-if="fields.id" @click="setView('detail')">Batal</button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>

        <div v-if="loading_form" class="blockUI blockOverlay" style="z-index: 10; border: medium; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(255, 255, 255); opacity: 0.3; cursor: wait; position: absolute;"></div>
        <div v-if="loading_form" class="blockUI blockMsg blockElement d-flex align-items-center justify-content-center w-100" style="z-index: 1011; position: absolute; padding: 0px; margin: auto; width: auto; top: 0; bottom: 0; left: 0; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">
          <span class="spinner spinner-loader spinner-primary spinner-lg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'intra_operasi',
  props: {
    jadwal_operasi_id: { type: String, required: true },
    status: { type: Number, required: true },
  },
  data() {
    return {
      loading: false,
      loading_form: false,
      title: 'Intra Operasi',
      fields: this.emptyFields(),
      hasil: {}
    }
  },
  watch: {
    jadwal_operasi_id: {
      handler(to, from) { if (to !== from) this.fetchIntraOperasi() }
    }
  },
  computed: {
    view() { return this.title.toLowerCase().includes('formulir') ? 'form' : 'detail' }
  },
  mounted() { this.fetchIntraOperasi() },
  methods: {
    emptyFields() {
      return {
        id: null,
        jadwal_operasi_id: '',
        waktu_mulai: null,
        waktu_selesai: null,
        posisi_operasi: null,
        jenis_anestesi: '',
        tekanan_darah_awal: '',
        tekanan_darah_akhir: '',
        nadi_awal: null,
        nadi_akhir: null,
        saturasi_o2: null,
        suhu_tubuh: null,
        volume_cairan_masuk: null,
        volume_cairan_keluar: null,
        jumlah_darah: null,
        komplikasi_intra: '',
        tindakan_intra: '',
        operator_utama_id: null,
        catatan_perawat: ''
      }
    },
    setView(view) {
      this.title = view === 'detail' ? 'Detail Intra Operasi' : 'Formulir Intra Operasi'
      if (view === 'form' && !this.fields.jadwal_operasi_id) this.fields.jadwal_operasi_id = this.jadwal_operasi_id
    },
    formatDate(v) { return v ? moment(v).format('DD MMM YYYY, HH:mm') : '-' },
    async fetchIntraOperasi() {
      try {
        this.loading = true
        this.fields = this.emptyFields()
        this.hasil = {}
        if (!this.jadwal_operasi_id) {
          this.title = 'Formulir Intra Operasi'
          return
        }
        const res = await this.$_api.post('intra_operasi/list', {
          halaman: 1, jumlah: 1,
          jadwal_operasi_id: this.jadwal_operasi_id
        })
        const rows = res.data || []
        if (rows.length) {
          const row = rows[0]
          this.hasil = row
          this.fields = {
            id: row.id,
            jadwal_operasi_id: row.jadwal_operasi_id,
            waktu_mulai: row.waktu_mulai ? moment(row.waktu_mulai).format('YYYY-MM-DD HH:mm:ss') : null,
            waktu_selesai: row.waktu_selesai ? moment(row.waktu_selesai).format('YYYY-MM-DD HH:mm:ss') : null,
            posisi_operasi: row.posisi_operasi,
            jenis_anestesi: row.jenis_anestesi,
            tekanan_darah_awal: row.tekanan_darah_awal,
            tekanan_darah_akhir: row.tekanan_darah_akhir,
            nadi_awal: row.nadi_awal,
            nadi_akhir: row.nadi_akhir,
            saturasi_o2: row.saturasi_o2,
            suhu_tubuh: row.suhu_tubuh,
            volume_cairan_masuk: row.volume_cairan_masuk,
            volume_cairan_keluar: row.volume_cairan_keluar,
            jumlah_darah: row.jumlah_darah,
            komplikasi_intra: row.komplikasi_intra,
            tindakan_intra: row.tindakan_intra,
            operator_utama_id: row.operator_utama_id,
            catatan_perawat: row.catatan_perawat
          }
          this.title = 'Detail Intra Operasi'
        } else {
          this.fields.jadwal_operasi_id = this.jadwal_operasi_id
          this.title = 'Formulir Intra Operasi'
        }
      } catch (e) {
        console.log(e)
        this.$_alert.error('Gagal memuat data intra operasi')
      } finally {
        this.loading = false
      }
    },
    async onSubmit() {
      try {
        this.loading_form = true
        const payload = { ...this.fields, jadwal_operasi_id: this.jadwal_operasi_id }
        // validasi minimal
        if (!payload.waktu_mulai) {
          this.$_alert.error('Waktu mulai wajib diisi')
          this.loading_form = false
          return
        }
        const url = this.fields.id ? 'intra_operasi/update' : 'intra_operasi/register'
        const res = await this.$_api.post(url, payload)
        console.log('===> intra_operasi.vue:375 ~ res', res);
        if (res.status === 200) {
          console.log('===> intra_operasi.vue:378 ~ ', );
          this.$_alert.success(null, 'Intra operasi telah disimpan')
          await this.fetchIntraOperasi()
        } else {
          this.$_alert.error(res.message || 'Gagal menyimpan')
        }
      } catch (e) {
        console.log(e)
        this.$_alert.error('Terjadi kesalahan saat menyimpan')
      } finally {
        this.loading_form = false
      }
    },
    async onDelete() {
      try {
        if (!this.fields.id) return
        this.loading_form = true
        const res = await this.$_api.post('intra_operasi/delete', { id: this.fields.id })
        if (res.status === 200) {
          this.$_alert.success('Data dihapus')
          this.fields = this.emptyFields()
          this.hasil = {}
          this.title = 'Formulir Intra Operasi'
        } else {
          this.$_alert.error(res.message || 'Gagal menghapus')
        }
      } catch (e) {
        console.log(e)
        this.$_alert.error('Terjadi kesalahan saat menghapus')
      } finally {
        this.loading_form = false
      }
    }
  }
}
</script>