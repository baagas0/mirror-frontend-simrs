<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi" />
      </div>
      <div class="xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <div
              v-if="tab === 'assesmen_tambahan'"
              class="ribbon-target"
              :class="{ 'bg-warning': !is_validasi_assesmen_tambahan, 'bg-success': is_validasi_assesmen_tambahan }"
              style="top: 10px; right: 0px;"
            >
              {{ is_validasi_assesmen_tambahan ? 'Sudah' : 'Belum' }} Validasi
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button
                  class="btn btn-warning mt-3"
                  v-if="!loadingAssesmen && tab === 'assesmen_tambahan' && !is_validasi_assesmen_tambahan"
                  @click="doValidasiAssesmenTambahan()"
                >
                  Validasi Sekarang
                </button>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="btn-group btn-group-lg mb-4 w-100" role="group" aria-label="Large button group" v-if="dataRegistrasi && dataRegistrasi.id">
          <button type="button" class="btn btn-outline-primary" :class="{ 'bg-primary text-white': tab === 'ev_im' }" @click="tab = 'ev_im'">Evaluasi & Implementasi</button>
          <button type="button" class="btn btn-outline-primary" :class="{ 'bg-primary text-white': tab === 'assesmen_tambahan' }" @click="tab = 'assesmen_tambahan'">Assesmen Tambahan</button>
        </div>

        <template v-if="tab === 'ev_im'">
          <div class="card card-custom mb-5" v-if="loadingAssesmen">
            <div class="card-body d-flex justify-content-center">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>
          <template v-else-if="dataRegistrasi && registrasi_id">
            <div class="row">
              <div class="col-lg-5">
                <div class="card mb-5">
                  <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between">
                    <div>
                      <h4 class="mb-0">Implementasi V2</h4>
                      <small class="text-muted">Flow baru: implementasi dulu, lalu evaluasi.</small>
                    </div>
                    <button class="btn btn-primary btn-sm" @click="openImplementasiForm()">
                      <i class="ri-add-line p-0"></i>
                      Tambah
                    </button>
                  </div>
                  <div class="card-body p-3">
                    <div v-if="loadingV2" class="d-flex justify-content-center py-10">
                      <div class="spinner spinner-track spinner-primary"></div>
                    </div>

                    <template v-else-if="listImplementasiKeperawatanV2.length > 0">
                      <div
                        v-for="(item, i) in listImplementasiKeperawatanV2"
                        :key="'implementasi-v2-' + i"
                        class="card p-3 mb-3 bg-light-warning card-list-hover"
                        :class="{ 'card-active': selectedImplementasiId === item.id }"
                      >
                        <div class="d-flex flex-row justify-content-between align-items-start">
                          <div class="w-100 pointer" @click="selectImplementasi(item)">
                            <p class="mb-2"><strong>{{ item.waktu_implementasi | parse('longDateTime') }}</strong></p>
                            <h5 class="font-weight-bolder text-warning mb-1">{{ getDiagnosaText(item) }}</h5>
                            <p class="mb-0"><span class="text-primary">Jenis:</span> {{ item.jenis_implementasi || '-' }}</p>
                            <p class="mb-0"><span class="text-primary">Implementasi:</span> {{ item.implementasi || '-' }}</p>
                            <p class="mb-0"><span class="text-primary">Respon Pasien:</span> {{ getResponPasienText(item.respon_pasien) }}</p>
                          </div>
                          <div class="d-flex flex-column align-items-end ml-3">
                            <div class="label label-pill label-inline label-light-primary mb-2">{{ (item.evaluasi || []).length }} Evaluasi</div>
                            <span class="label label-lg label-pill label-inline mb-2 label-success pointer" @click.stop="openImplementasiForm(item)">Edit</span>
                            <span class="label label-lg label-pill label-inline label-danger pointer" @click.stop="confirmDeleteImplementasi(item)">Hapus</span>
                          </div>
                        </div>
                      </div>
                    </template>

                    <div v-else class="empty-state-card p-8 text-center">
                      <img :src="'./static/img/default/no_data_table.svg'" class="max-w-200px" alt="" />
                      <h4 class="mt-4 font-weight-bolder text-dark">Belum ada implementasi</h4>
                      <p class="text-muted mb-4">Mulai flow baru rawat inap dari implementasi, lalu tambahkan evaluasi di bawah implementasi terpilih.</p>
                      <button class="btn btn-light-primary" @click="openImplementasiForm()">Buat Implementasi</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-7">
                <div class="card mb-5">
                  <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between">
                    <h4 class="mb-0">{{ currentPanelTitle }}</h4>
                    <a class="btn btn-sm btn-outline-primary btn-icon btn-circle" v-if="panelMode !== 'detail'" @click="closeFormPanel()">
                      <i class="ri-arrow-go-back-line p-0"></i>
                    </a>
                  </div>
                  <div class="card-body p-3">
                    <template v-if="panelMode === 'implementasi-form'">
                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(onSubmitImplementasi)" autocomplete="off">
                          <div class="row">
                            <div class="col-12">
                              <s-input v-model="vImplementasi.waktu_implementasi" :item="{
                                label: 'Waktu Implementasi',
                                id: 'waktu_implementasi',
                                data: 'waktu_implementasi',
                                type: 'datetime',
                                validation: ['required'],
                              }" :valuee="vImplementasi.waktu_implementasi" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vImplementasi.diagnosa" :item="{
                                label: 'Diagnosa',
                                id: 'diagnosa',
                                data: 'diagnosa',
                                type: 'lookup-radio',
                                validation: ['required'],
                                value: vImplementasi.diagnosa,
                                return_object: true,
                                api: 'ms_diagnosa',
                                pointer: {
                                  label: 'nama_diagnosa',
                                  code: 'id',
                                  display: ['kode_diagnosa', 'nama_diagnosa'],
                                  headerDisplay: ['Kode', 'Nama Diagnosa']
                                },
                                param: {},
                              }" :valuee="vImplementasi.diagnosa" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vImplementasi.jenis_implementasi" :item="{
                                label: 'Jenis Implementasi',
                                id: 'jenis_implementasi',
                                data: 'jenis_implementasi',
                                type: 'text',
                                validation: [],
                              }" :valuee="vImplementasi.jenis_implementasi" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vImplementasi.implementasi" :item="{
                                label: 'Implementasi',
                                id: 'implementasi',
                                data: 'implementasi',
                                type: 'textarea',
                                validation: [],
                              }" :valuee="vImplementasi.implementasi" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vImplementasi.respon_pasien" :item="{
                                label: 'Respon Pasien',
                                id: 'respon_pasien',
                                data: 'respon_pasien',
                                type: 'textarea',
                                validation: [],
                                hint: 'Nilai existing object akan ditampilkan sebagai JSON string.',
                              }" :valuee="vImplementasi.respon_pasien" />
                            </div>
                          </div>

                          <div class="col-12 align-self-center p-0">
                            <button type="submit" class="btn btn-light-primary mr-3">
                              <i class="ri-save-line"></i>
                              {{ implementasiFormMode === 'create' ? 'Simpan Implementasi' : 'Perbarui Implementasi' }}
                            </button>
                          </div>
                        </form>
                      </ValidationObserver>
                    </template>

                    <template v-else-if="panelMode === 'evaluasi-form'">
                      <div class="alert alert-light-primary mb-5" v-if="hasSelectedImplementasi">
                        Evaluasi akan ditambahkan ke implementasi:
                        <strong>{{ getDiagnosaText(selectedImplementasiData) }}</strong>
                      </div>

                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
                          <div class="row">
                            <div class="col-12">
                              <s-input v-model="vEvaluasi.perawat_id" :item="{
                                label: 'Perawat',
                                id: 'perawat_id',
                                data: 'perawat_id',
                                type: 'lookup-radio',
                                validation: ['required'],
                                value: vEvaluasi.perawat_id,
                                api: 'msDokter',
                                getter: 'msDokter',
                                setter: 'msDokter',
                                pointer: {
                                  label: 'nama_dokter',
                                  code: 'ms_dokter_id',
                                  display: ['nama_tipe_tenaga_medis', 'nama_dokter', 'jk_dokter|kelamin'],
                                  headerDisplay: ['Tenaga Medis', 'Nama Tenaga Medis', 'Jenis Kelamin']
                                },
                                param: {
                                  kode_tipe_tenaga_medis: 'PRW'
                                }
                              }" :valuee="vEvaluasi.perawat_id" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vEvaluasi.waktu_evaluasi" :item="{
                                label: 'Waktu Evaluasi',
                                id: 'waktu_evaluasi',
                                data: 'waktu_evaluasi',
                                type: 'datetime',
                                validation: ['required'],
                              }" :valuee="vEvaluasi.waktu_evaluasi" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vEvaluasi.tindak_lanjut" :item="{
                                label: 'Tindak Lanjut',
                                id: 'tindak_lanjut',
                                data: 'tindak_lanjut',
                                type: 'text',
                                validation: [],
                              }" :valuee="vEvaluasi.tindak_lanjut" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vEvaluasi.catatan" :item="{
                                label: 'Catatan',
                                id: 'catatan',
                                data: 'catatan',
                                type: 'textarea',
                                validation: [],
                              }" :valuee="vEvaluasi.catatan" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="vEvaluasi.status_evaluasi_keperawatan" :item="{
                                label: 'Status',
                                id: 'status_evaluasi_keperawatan',
                                data: 'status_evaluasi_keperawatan',
                                type: 'lookup-radio',
                                validation: ['required'],
                                pointer: {
                                  label: 'label',
                                  code: 'code',
                                  list: [
                                    { label: 'Data Aktif', code: true },
                                    { label: 'Non Aktif', code: false }
                                  ]
                                },
                              }" :valuee="vEvaluasi.status_evaluasi_keperawatan" />
                            </div>
                          </div>

                          <div class="col-12 align-self-center p-0">
                            <button type="submit" class="btn btn-light-primary mr-3">
                              <i class="ri-save-line"></i>
                              {{ evaluasiFormMode === 'create' ? 'Simpan Evaluasi' : 'Perbarui Evaluasi' }}
                            </button>
                          </div>
                        </form>
                      </ValidationObserver>
                    </template>

                    <template v-else-if="hasSelectedImplementasi">
                      <div class="card card-custom bg-light-success mb-5">
                        <div class="card-body p-4">
                          <div class="d-flex flex-row justify-content-between align-items-start" style="gap: 16px">
                            <div class="w-100">
                              <p class="mb-2"><strong>{{ selectedImplementasiData.waktu_implementasi | parse('longDateTime') }}</strong></p>
                              <h4 class="font-weight-bolder text-warning mb-2">{{ getDiagnosaText(selectedImplementasiData) }}</h4>
                              <p class="mb-1"><span class="text-primary">Jenis Implementasi:</span> {{ selectedImplementasiData.jenis_implementasi || '-' }}</p>
                              <p class="mb-1"><span class="text-primary">Implementasi:</span> {{ selectedImplementasiData.implementasi || '-' }}</p>
                              <p class="mb-0"><span class="text-primary">Respon Pasien:</span> {{ getResponPasienText(selectedImplementasiData.respon_pasien) }}</p>
                            </div>
                            <div class="d-flex flex-column align-items-end">
                              <button class="btn btn-primary btn-sm mb-2" @click="openEvaluasiForm()">
                                <i class="ri-add-line p-0"></i>
                                Tambah Evaluasi
                              </button>
                              <button class="btn btn-light-success btn-sm mb-2" @click="openImplementasiForm(selectedImplementasiData)">
                                <i class="ri-edit-line p-0"></i>
                                Edit Implementasi
                              </button>
                              <button class="btn btn-light-danger btn-sm" @click="confirmDeleteImplementasi(selectedImplementasiData)">
                                <i class="ri-delete-bin-line p-0"></i>
                                Hapus Implementasi
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-row justify-content-between align-items-center mb-4">
                        <h5 class="font-weight-bolder text-dark mb-0 pb-0">Evaluasi</h5>
                        <div class="label label-pill label-inline label-light-primary">{{ selectedImplementasiEvaluasi.length }} data</div>
                      </div>

                      <template v-if="selectedImplementasiEvaluasi.length > 0">
                        <div
                          v-for="(item, i) in selectedImplementasiEvaluasi"
                          :key="'evaluasi-v2-' + i"
                          class="card p-3 mb-3"
                          :class="{
                            'implementasi-keperawatan-active': item.status_evaluasi_keperawatan,
                            'bg-gray-500': !item.status_evaluasi_keperawatan,
                            'card-active': selectedEvaluasiId === item.id
                          }"
                        >
                          <div class="d-flex flex-row justify-content-between align-items-start">
                            <div class="w-100 pointer" @click="selectEvaluasi(item)">
                              <div class="d-flex flex-row justify-content-start align-items-center" style="gap: 5px">
                                <div class="label label-pill label-inline" :class="{ 'label-warning': item.status_evaluasi_keperawatan, 'label-danger': !item.status_evaluasi_keperawatan }">
                                  {{ item.status_evaluasi_keperawatan ? 'Aktif' : 'Non Aktif' }}
                                </div>
                                <p class="text-white font-size-md pb-0 mb-0">{{ item.waktu_evaluasi | parse('longDateTime') }}</p>
                              </div>
                              <h5 class="text-white font-weight-bolder mt-2 mb-1">{{ getPerawatName(item) }}</h5>
                              <p class="text-white mb-1">{{ item.tindak_lanjut || '-' }}</p>
                              <p class="text-white mb-0">{{ item.catatan || '-' }}</p>
                            </div>
                            <div class="d-flex flex-column align-items-end ml-3">
                              <span class="label label-lg label-pill label-inline mb-2 label-success pointer" @click.stop="openEvaluasiForm(item)">Edit</span>
                              <span class="label label-lg label-pill label-inline label-danger pointer" @click.stop="confirmDeleteEvaluasi(item)">Hapus</span>
                            </div>
                          </div>
                        </div>
                      </template>

                      <div v-else class="empty-state-card p-8 text-center">
                        <img :src="'./static/img/default/no_data_table.svg'" class="max-w-200px" alt="" />
                        <h4 class="mt-4 font-weight-bolder text-dark">Belum ada evaluasi</h4>
                        <p class="text-muted mb-4">Tambahkan evaluasi sebagai child dari implementasi yang sedang dipilih.</p>
                        <button class="btn btn-light-primary" @click="openEvaluasiForm()">Buat Evaluasi</button>
                      </div>
                    </template>

                    <div v-else class="empty-state-card p-8 text-center">
                      <img :src="'./static/img/default/no_data_table.svg'" class="max-w-200px" alt="" />
                      <h4 class="mt-4 font-weight-bolder text-dark">Pilih implementasi dulu</h4>
                      <p class="text-muted mb-0">Flow baru rawat inap dimulai dari implementasi, lalu evaluasi ditambahkan di detail implementasi.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card">
                  <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between">
                    <div>
                      <h4 class="mb-1">Histori Legacy</h4>
                      <p class="text-muted mb-0">Flow lama evaluasi -&gt; implementasi dipertahankan sebagai read-only.</p>
                    </div>
                    <div class="label label-pill label-inline label-light-warning">Read Only</div>
                  </div>
                  <div class="card-body p-3">
                    <div v-if="loadingLegacy" class="d-flex justify-content-center py-10">
                      <div class="spinner spinner-track spinner-primary"></div>
                    </div>

                    <template v-else-if="listLegacyEvaluasiKeperawatan.length > 0">
                      <div
                        v-for="(item, i) in listLegacyEvaluasiKeperawatan"
                        :key="'legacy-evaluasi-' + i"
                        class="card p-3 mb-3"
                        :class="{ 'implementasi-keperawatan-active': item.status_evaluasi_keperawatan, 'bg-gray-500': !item.status_evaluasi_keperawatan }"
                      >
                        <div class="d-flex flex-row justify-content-start align-items-center mb-2" style="gap: 5px">
                          <div class="label label-pill label-inline" :class="{ 'label-warning': item.status_evaluasi_keperawatan, 'label-danger': !item.status_evaluasi_keperawatan }">
                            {{ item.status_evaluasi_keperawatan ? 'Aktif' : 'Non Aktif' }}
                          </div>
                          <p class="text-white font-size-md pb-0 mb-0">{{ item.waktu_evaluasi | parse('longDateTime') }}</p>
                        </div>
                        <h5 class="text-white font-weight-bolder mb-1">{{ getPerawatName(item) }}</h5>
                        <p class="text-white mb-1">{{ item.tindak_lanjut || '-' }}</p>
                        <p class="text-white mb-4">{{ item.catatan || '-' }}</p>

                        <div class="legacy-wrapper">
                          <h6 class="text-white font-weight-bolder mb-3">Implementasi Legacy</h6>
                          <template v-if="item.implementasi && item.implementasi.length > 0">
                            <div
                              v-for="(legacyImplementasi, j) in item.implementasi"
                              :key="'legacy-implementasi-' + i + '-' + j"
                              class="bg-white rounded p-4 mb-3"
                            >
                              <p class="mb-2"><strong>{{ legacyImplementasi.waktu_implementasi | parse('longDateTime') }}</strong></p>
                              <h6 class="font-weight-bolder text-warning mb-2">{{ getDiagnosaText(legacyImplementasi) }}</h6>
                              <p class="mb-1"><span class="text-primary">Jenis:</span> {{ legacyImplementasi.jenis_implementasi || '-' }}</p>
                              <p class="mb-1"><span class="text-primary">Implementasi:</span> {{ legacyImplementasi.implementasi || '-' }}</p>
                              <p class="mb-0"><span class="text-primary">Respon Pasien:</span> {{ getResponPasienText(legacyImplementasi.respon_pasien) }}</p>
                            </div>
                          </template>
                          <div v-else class="bg-white rounded p-4 text-muted">
                            Implementasi legacy tidak ditemukan.
                          </div>
                        </div>
                      </div>
                    </template>

                    <div v-else class="empty-state-card p-8 text-center">
                      <img :src="'./static/img/default/no_data_table.svg'" class="max-w-200px" alt="" />
                      <h4 class="mt-4 font-weight-bolder text-dark">Histori legacy tidak ditemukan</h4>
                      <p class="text-muted mb-0">Belum ada data flow lama evaluasi -&gt; implementasi untuk registrasi ini.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="card card-custom">
              <div class="card-body text-center ">
                <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
                <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
                <button class="btn btn-light-primary" v-if="info_alert.includes('Assesmen keperawatan')"
                  @click="$router.push({ name: 'Layanan RJalan Keperawatan', query: { registrasi_id: registrasi_id } })">Assesmen
                  Keperawatan <i class="ri-arrow-right-line"></i></button>
              </div>
            </div>
          </template>
        </template>

        <template v-else-if="tab === 'assesmen_tambahan'">
          <div class="card">
            <div class="card-header ribbon ribbon-top ribbon-ver"></div>
            <div class="card-body p-0">
              <KesehatanIbuAnak
                v-if="dataAssesmenTambahan && dataAssesmenTambahan.kesehatan_ibu_anak"
                :dataRegistrasi="dataRegistrasi"
                :assesmen="dataAssesmenTambahan.kesehatan_ibu_anak"
                :activeTab="activeTabKIA"
                :dataAssesmenTambahan="dataAssesmenTambahan"
                :is_validasi_assesmen_tambahan="is_validasi_assesmen_tambahan"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
  
<script>
import CardRegistrasiRanap from './_components/card_registrasi_ranap.vue'
import KesehatanIbuAnak from "./_components/kesehatan_ibu_anak/kesehatan_ibu_anak.vue"

import moment from 'moment'
moment.locale('id')

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const cloneValue = (value) => JSON.parse(JSON.stringify(value || {}))

const formatDateTimeValue = (value) => {
  if (value && moment(value).isValid()) return moment(value).format(DEFAULT_DATE_FORMAT)
  return moment().format(DEFAULT_DATE_FORMAT)
}

const toBoolean = (value, fallback = false) => {
  if (value === true || value === 'true' || value === 1 || value === '1') return true
  if (value === false || value === 'false' || value === 0 || value === '0') return false
  return fallback
}

const normalizeResponPasienForForm = (value) => {
  if (value === null || value === undefined || value === '') return ''
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

const normalizeResponPasienForPayload = (value) => {
  if (typeof value !== 'string') return value || {}
  if (!value.trim()) return ''

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

const createDefaultImplementasiForm = (registrasiId = '') => ({
  id: '',
  registrasi_id: registrasiId || '',
  waktu_implementasi: formatDateTimeValue(),
  diagnosa: null,
  jenis_implementasi: '',
  implementasi: '',
  respon_pasien: ''
})

const createDefaultEvaluasiForm = (implementasiId = '') => ({
  id: '',
  implementasi_id: implementasiId || '',
  perawat_id: '',
  waktu_evaluasi: formatDateTimeValue(),
  tindak_lanjut: '',
  catatan: '',
  status_evaluasi_keperawatan: true
})

const normalizeEvaluasiItem = (item = {}) => ({
  ...item,
  status_evaluasi_keperawatan: toBoolean(item.status_evaluasi_keperawatan, true),
  waktu_evaluasi: item.waktu_evaluasi ? formatDateTimeValue(item.waktu_evaluasi) : ''
})

const normalizeImplementasiItem = (item = {}) => ({
  ...item,
  waktu_implementasi: item.waktu_implementasi ? formatDateTimeValue(item.waktu_implementasi) : '',
  evaluasi: Array.isArray(item.evaluasi)
    ? item.evaluasi.map((evaluasi) => normalizeEvaluasiItem({
      ...evaluasi,
      implementasi_id: evaluasi.implementasi_id || item.id,
      registrasi_id: evaluasi.registrasi_id || item.registrasi_id
    }))
    : []
})

const normalizeLegacyEvaluasiItem = (item = {}) => ({
  ...item,
  status_evaluasi_keperawatan: toBoolean(item.status_evaluasi_keperawatan, true),
  waktu_evaluasi: item.waktu_evaluasi ? formatDateTimeValue(item.waktu_evaluasi) : '',
  implementasi: Array.isArray(item.implementasi)
    ? item.implementasi.map((legacyImplementasi) => normalizeImplementasiItem(legacyImplementasi))
    : []
})

export default {
  name: 'layanan_ranap_cppt',
  components: { CardRegistrasiRanap, KesehatanIbuAnak },
  data() {
    return {
      tab: 'ev_im',
      info_alert: '',
      loadingAssesmen: false,

      dataRegistrasi: {},
      registrasi_id: '',

      panelMode: 'detail',
      implementasiFormMode: 'create',
      evaluasiFormMode: 'create',

      selectedImplementasiId: '',
      selectedImplementasiData: {},
      selectedEvaluasiId: '',
      selectedEvaluasiData: {},

      listImplementasiKeperawatanV2: [],
      listLegacyEvaluasiKeperawatan: [],

      vEvaluasi: createDefaultEvaluasiForm(),
      vImplementasi: createDefaultImplementasiForm(),

      loadingV2: false,
      loadingLegacy: false,

      activeTabKIA: 'pengamatan_kehamilan',
      is_validasi_assesmen_tambahan: true,
      objAssesmenTambahan: {},
      dataAssesmenTambahan: {
        kesehatan_ibu_anak: {
          kia: {},
          pemeriksaan_antenatal: {
            anantenatal: {},
            ksrp: {},
          },
          pengamatan_persalinan: {},
          pengamatan_nifas: {},
          patograf: {},
          surat_ket_lahir: {}
        }
      }
    }
  },
  computed: {
    hasSelectedImplementasi() {
      return !!this.selectedImplementasiId && !!this.selectedImplementasiData.id
    },
    selectedImplementasiEvaluasi() {
      return this.selectedImplementasiData.evaluasi || []
    },
    currentPanelTitle() {
      if (this.panelMode === 'implementasi-form') return `${this.implementasiFormMode === 'create' ? 'Form Tambah' : 'Form Edit'} Implementasi`
      if (this.panelMode === 'evaluasi-form') return `${this.evaluasiFormMode === 'create' ? 'Form Tambah' : 'Form Edit'} Evaluasi`
      return 'Detail Implementasi'
    }
  },
  watch: {
    tab(to, from) {
      if (to !== from && to === 'assesmen_tambahan' && this.registrasi_id) {
        this.initAssesmenTambahan(this.registrasi_id)
      }
    }
  },
  mounted() {
    if (this.$route.query.view !== 'list') {
      this.$router.push({
        name: this.$route.name,
        query: { ...this.$route.query, view: 'list' }
      })
    }
  },
  methods: {
    resetEvImState() {
      this.panelMode = 'detail'
      this.implementasiFormMode = 'create'
      this.evaluasiFormMode = 'create'
      this.selectedImplementasiId = ''
      this.selectedImplementasiData = {}
      this.selectedEvaluasiId = ''
      this.selectedEvaluasiData = {}
      this.listImplementasiKeperawatanV2 = []
      this.listLegacyEvaluasiKeperawatan = []
      this.vImplementasi = createDefaultImplementasiForm(this.registrasi_id)
      this.vEvaluasi = createDefaultEvaluasiForm()
    },
    getDiagnosaText(item = {}) {
      const diagnosa = item.ms_diagnosa || (typeof item.diagnosa === 'object' ? item.diagnosa : null)
      if (!diagnosa) {
        if (typeof item.nama_diagnosa === 'string' && item.nama_diagnosa) {
          return item.kode_diagnosa ? `${item.nama_diagnosa} (${item.kode_diagnosa})` : item.nama_diagnosa
        }
        return typeof item.diagnosa === 'string' && item.diagnosa ? item.diagnosa : '-'
      }

      const namaDiagnosa = diagnosa.nama_diagnosa || item.nama_diagnosa || '-'
      const kodeDiagnosa = diagnosa.kode_diagnosa || item.kode_diagnosa || ''
      return kodeDiagnosa ? `${namaDiagnosa} (${kodeDiagnosa})` : namaDiagnosa
    },
    getDiagnosaId(value) {
      if (!value) return ''
      if (typeof value === 'string') return value
      return value.id || value.diagnosa || ''
    },
    getPerawatName(item = {}) {
      return (item.ms_dokter && item.ms_dokter.nama_dokter) || item.nama_dokter || '-'
    },
    getResponPasienText(value) {
      if (value === null || value === undefined || value === '') return '-'
      if (typeof value === 'string') return value
      return JSON.stringify(value)
    },
    buildImplementasiForm(item = {}) {
      return {
        id: item.id || item.id_implementasi_keperawatan_rinap || '',
        registrasi_id: item.registrasi_id || this.registrasi_id,
        waktu_implementasi: formatDateTimeValue(item.waktu_implementasi),
        diagnosa: item.ms_diagnosa ? cloneValue(item.ms_diagnosa) : item.diagnosa || null,
        jenis_implementasi: item.jenis_implementasi || '',
        implementasi: item.implementasi || '',
        respon_pasien: normalizeResponPasienForForm(item.respon_pasien)
      }
    },
    buildEvaluasiForm(item = {}, implementasiId = '') {
      return {
        ...createDefaultEvaluasiForm(implementasiId),
        id: item.id || item.id_evaluasi_keperawatan_rinap || '',
        perawat_id: item.perawat_id || '',
        waktu_evaluasi: formatDateTimeValue(item.waktu_evaluasi),
        tindak_lanjut: item.tindak_lanjut || '',
        catatan: item.catatan || '',
        status_evaluasi_keperawatan: toBoolean(item.status_evaluasi_keperawatan, true)
      }
    },
    applySelection(preferredImplementasiId = '', preferredEvaluasiId = '') {
      const selectedImplementasi = this.listImplementasiKeperawatanV2.find((item) => item.id === preferredImplementasiId)
        || this.listImplementasiKeperawatanV2.find((item) => item.id === this.selectedImplementasiId)
        || this.listImplementasiKeperawatanV2[0]
        || {}

      this.selectedImplementasiId = selectedImplementasi.id || ''
      this.selectedImplementasiData = selectedImplementasi.id ? selectedImplementasi : {}

      const evaluasiList = selectedImplementasi.evaluasi || []
      const selectedEvaluasi = evaluasiList.find((item) => item.id === preferredEvaluasiId)
        || evaluasiList.find((item) => item.id === this.selectedEvaluasiId)
        || evaluasiList[0]
        || {}

      this.selectedEvaluasiId = selectedEvaluasi.id || ''
      this.selectedEvaluasiData = selectedEvaluasi.id ? selectedEvaluasi : {}
    },
    selectImplementasi(item = {}, preferredEvaluasiId = '') {
      const normalizedItem = normalizeImplementasiItem(item)
      this.selectedImplementasiId = normalizedItem.id || ''
      this.selectedImplementasiData = normalizedItem.id ? normalizedItem : {}
      this.panelMode = 'detail'

      const evaluasiList = normalizedItem.evaluasi || []
      const selectedEvaluasi = evaluasiList.find((evaluasi) => evaluasi.id === preferredEvaluasiId)
        || evaluasiList.find((evaluasi) => evaluasi.id === this.selectedEvaluasiId)
        || evaluasiList[0]
        || {}

      this.selectedEvaluasiId = selectedEvaluasi.id || ''
      this.selectedEvaluasiData = selectedEvaluasi.id ? selectedEvaluasi : {}
      this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId)
    },
    selectEvaluasi(item = {}) {
      this.selectedEvaluasiId = item.id || ''
      this.selectedEvaluasiData = item.id ? normalizeEvaluasiItem(item) : {}
    },
    openImplementasiForm(item = null) {
      if (item && item.id) {
        this.selectImplementasi(item)
        this.implementasiFormMode = 'update'
        this.vImplementasi = this.buildImplementasiForm(item)
      } else {
        this.implementasiFormMode = 'create'
        this.vImplementasi = createDefaultImplementasiForm(this.registrasi_id)
      }

      this.panelMode = 'implementasi-form'
    },
    openEvaluasiForm(item = null) {
      if (!this.hasSelectedImplementasi) {
        this.$_alert.error({ message: 'Pilih implementasi terlebih dahulu' }, 'Terjadi kesalahan')
        return
      }

      if (item && item.id) {
        this.selectEvaluasi(item)
        this.evaluasiFormMode = 'update'
        this.vEvaluasi = this.buildEvaluasiForm(item, this.selectedImplementasiId)
      } else {
        this.evaluasiFormMode = 'create'
        this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId)
      }

      this.panelMode = 'evaluasi-form'
    },
    closeFormPanel() {
      this.panelMode = 'detail'
      this.vImplementasi = createDefaultImplementasiForm(this.registrasi_id)
      this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId)
    },
    async getImplementasiKeperawatanV2(preferredImplementasiId = '', preferredEvaluasiId = '') {
      if (!this.registrasi_id) return

      this.loadingV2 = true
      try {
        const res = await this.$_api.post('implementasi_keperawatan_rinap/getWithEvaluasiV2', { registrasi_id: this.registrasi_id })

        if (res.status !== 200) {
          this.listImplementasiKeperawatanV2 = []
          this.applySelection()
          this.$_alert.error({ message: res.message || 'Data implementasi tidak berhasil dimuat' }, 'Terjadi kesalahan')
          return
        }

        this.listImplementasiKeperawatanV2 = Array.isArray(res.data) ? res.data.map((item) => normalizeImplementasiItem(item)) : []
        this.applySelection(preferredImplementasiId, preferredEvaluasiId)
      } catch (err) {
        this.listImplementasiKeperawatanV2 = []
        this.applySelection()
        this.$_alert.error(err, 'Data implementasi tidak berhasil dimuat')
      } finally {
        this.loadingV2 = false
      }
    },
    async getLegacyEvaluasiKeperawatan() {
      if (!this.registrasi_id) return

      this.loadingLegacy = true
      try {
        const res = await this.$_api.post('evaluasi_keperawatan_rinap/getWithImplementasi', {
          halaman: 1,
          jumlah: 999999,
          registrasi_id: this.registrasi_id
        })

        if (res.status !== 200) {
          this.listLegacyEvaluasiKeperawatan = []
          this.$_alert.error({ message: res.message || 'Histori legacy tidak berhasil dimuat' }, 'Terjadi kesalahan')
          return
        }

        this.listLegacyEvaluasiKeperawatan = Array.isArray(res.data)
          ? res.data.map((item) => normalizeLegacyEvaluasiItem(item))
          : []
      } catch (err) {
        this.listLegacyEvaluasiKeperawatan = []
        this.$_alert.error(err, 'Histori legacy tidak berhasil dimuat')
      } finally {
        this.loadingLegacy = false
      }
    },
    async onSubmitImplementasi() {
      if (!this.registrasi_id) {
        this.$_alert.error({ message: 'Silahkan pilih registrasi' }, 'Terjadi kesalahan')
        return
      }

      const payload = {
        waktu_implementasi: formatDateTimeValue(this.vImplementasi.waktu_implementasi),
        diagnosa: this.getDiagnosaId(this.vImplementasi.diagnosa),
        jenis_implementasi: this.vImplementasi.jenis_implementasi,
        implementasi: this.vImplementasi.implementasi,
        respon_pasien: normalizeResponPasienForPayload(this.vImplementasi.respon_pasien)
      }

      const endpoint = this.implementasiFormMode === 'create'
        ? 'implementasi_keperawatan_rinap/registerV2'
        : 'implementasi_keperawatan_rinap/updateV2'

      if (this.implementasiFormMode === 'create') payload.registrasi_id = this.registrasi_id
      else payload.id = this.vImplementasi.id

      try {
        const res = await this.$_api.post(endpoint, payload)
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || 'Data implementasi tidak berhasil disimpan' }, 'Terjadi kesalahan')
          return
        }

        const preferredImplementasiId = (res.data && res.data.id) || payload.id || this.selectedImplementasiId
        await this.getImplementasiKeperawatanV2(preferredImplementasiId, '')
        this.panelMode = 'detail'
        this.implementasiFormMode = 'create'
        this.vImplementasi = createDefaultImplementasiForm(this.registrasi_id)
        this.$_alert.success({ message: res.message || 'Data implementasi berhasil disimpan' }, 'Berhasil')
      } catch (err) {
        this.$_alert.error(err, 'Data implementasi tidak berhasil disimpan')
      }
    },
    async onSubmitEvaluasi() {
      if (!this.hasSelectedImplementasi) {
        this.$_alert.error({ message: 'Pilih implementasi terlebih dahulu' }, 'Terjadi kesalahan')
        return
      }

      const payload = {
        perawat_id: this.vEvaluasi.perawat_id,
        waktu_evaluasi: formatDateTimeValue(this.vEvaluasi.waktu_evaluasi),
        tindak_lanjut: this.vEvaluasi.tindak_lanjut,
        catatan: this.vEvaluasi.catatan,
        status_evaluasi_keperawatan: toBoolean(this.vEvaluasi.status_evaluasi_keperawatan, true)
      }

      const endpoint = this.evaluasiFormMode === 'create'
        ? 'evaluasi_keperawatan_rinap/registerV2'
        : 'evaluasi_keperawatan_rinap/updateV2'

      if (this.evaluasiFormMode === 'create') payload.implementasi_id = this.selectedImplementasiId
      else payload.id = this.vEvaluasi.id

      try {
        const res = await this.$_api.post(endpoint, payload)
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || 'Data evaluasi tidak berhasil disimpan' }, 'Terjadi kesalahan')
          return
        }

        const preferredEvaluasiId = (res.data && res.data.id) || payload.id || this.selectedEvaluasiId
        await this.getImplementasiKeperawatanV2(this.selectedImplementasiId, preferredEvaluasiId)
        this.panelMode = 'detail'
        this.evaluasiFormMode = 'create'
        this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId)
        this.$_alert.success({ message: res.message || 'Data evaluasi berhasil disimpan' }, 'Berhasil')
      } catch (err) {
        this.$_alert.error(err, 'Data evaluasi tidak berhasil disimpan')
      }
    },
    async confirmDeleteImplementasi(item = {}) {
      const result = await this.$_alert.confirm(
        'Hapus Permanen',
        'Data implementasi akan dihapus. Backend akan menolak jika masih ada evaluasi child. Lanjutkan?'
      )

      if (!result.isConfirmed) return

      try {
        const res = await this.$_api.post('implementasi_keperawatan_rinap/deleteV2', { id: item.id })
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || 'Data implementasi tidak berhasil dihapus' }, 'Terjadi kesalahan')
          return
        }

        const fallbackImplementasi = this.listImplementasiKeperawatanV2.find((implementasi) => implementasi.id !== item.id)
        await this.getImplementasiKeperawatanV2(fallbackImplementasi ? fallbackImplementasi.id : '', '')
        this.$_alert.success(null, res.message || 'Data implementasi berhasil dihapus')
      } catch (err) {
        this.$_alert.error(err, 'Data implementasi tidak berhasil dihapus')
      }
    },
    async confirmDeleteEvaluasi(item = {}) {
      const result = await this.$_alert.confirm(
        'Hapus Permanen',
        'Data evaluasi yang sudah dihapus tidak dapat dikembalikan. Lanjutkan?'
      )

      if (!result.isConfirmed) return

      try {
        const res = await this.$_api.post('evaluasi_keperawatan_rinap/deleteV2', { id: item.id })
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || 'Data evaluasi tidak berhasil dihapus' }, 'Terjadi kesalahan')
          return
        }

        await this.getImplementasiKeperawatanV2(this.selectedImplementasiId, '')
        this.$_alert.success(null, res.message || 'Data evaluasi berhasil dihapus')
      } catch (err) {
        this.$_alert.error(err, 'Data evaluasi tidak berhasil dihapus')
      }
    },
    // START ASSESMEN TAMBAHAN
    async findAssesmenTambahan(param = {}) {
      const res = await this.$_api.post('assesment_tambahan_rnap/list', param)

      if (res.data && res.data.length) return res.data[0]
      else return {}
    },
    async createAssesmenTambahan(param = {}) {
      const staticParam = {
        is_validasi_askep: false,
        json_askep: {},
        is_validasi_asmed: false,
        json_asmed: {}
      }
      const res = await this.$_api.create('assesment_tambahan_rnap', { ...staticParam, ...param })

      if (res.status === 200) return res.data
      else {
        this.$_alert.error({}, 'Tidak dapat membuat assesmen')
        return false
      }
    },
    async initAssesmenTambahan(registrasi_id) {
      let ass = await this.findAssesmenTambahan({ registrasi_id })
      if (!ass.id) ass = await this.createAssesmenTambahan({ registrasi_id })
      if (ass === false) return

      this.objAssesmenTambahan = ass
      this.is_validasi_assesmen_tambahan = this.objAssesmenTambahan.is_validasi_askep
      await this.buildAssesmenTambahan(this.objAssesmenTambahan.json_askep)
    },
    async buildAssesmenTambahan(json) {
      const kesehatan_ibu_anak = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.kia) ? json.kesehatan_ibu_anak.kia : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.kia = {
        pengamatan_kehamilan: kesehatan_ibu_anak.pengamatan_kehamilan ? kesehatan_ibu_anak.pengamatan_kehamilan : {},
        riwayat_pasien: kesehatan_ibu_anak.riwayat_pasien ? kesehatan_ibu_anak.riwayat_pasien : {},
        riwayat_obstetrik: kesehatan_ibu_anak.riwayat_obstetrik ? kesehatan_ibu_anak.riwayat_obstetrik : {},
        rencana_persalinan: kesehatan_ibu_anak.rencana_persalinan ? kesehatan_ibu_anak.rencana_persalinan : {},
        pemeriksaan_bidan: kesehatan_ibu_anak.pemeriksaan_bidan ? kesehatan_ibu_anak.pemeriksaan_bidan : {},
        risiko_kehamilan: kesehatan_ibu_anak.risiko_kehamilan ? kesehatan_ibu_anak.risiko_kehamilan : {},
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.pengamatan_kehamilan.golongan_darah) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.pengamatan_kehamilan.golongan_darah = this.dataRegistrasi.nama_golongan_darah
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.pengamatan_kehamilan.no_telp) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.pengamatan_kehamilan.no_telp = this.dataRegistrasi.no_telepon
      }

      const anantenatal = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pemeriksaan_antenatal && json.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal) ? json.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal = {
        register_antenatal: anantenatal.register_antenatal ? anantenatal.register_antenatal : {},
        pemeriksaan_bayi: anantenatal.pemeriksaan_bayi ? anantenatal.pemeriksaan_bayi : {},
        pelayanan: anantenatal.pelayanan ? anantenatal.pelayanan : {},
        risiko: anantenatal.risiko ? anantenatal.risiko : {},
        pemeriksaan_ibu: anantenatal.pemeriksaan_ibu ? anantenatal.pemeriksaan_ibu : {},
        laboratorium_antenatal: anantenatal.laboratorium_antenatal ? anantenatal.laboratorium_antenatal : {},
        pencegahan_ppia: anantenatal.pencegahan_ppia ? anantenatal.pencegahan_ppia : {},
        kecacingan_kehamilan: anantenatal.kecacingan_kehamilan ? anantenatal.kecacingan_kehamilan : {},
        pencegahan_malaria: anantenatal.pencegahan_malaria ? anantenatal.pencegahan_malaria : {},
        pencegahan_ims: anantenatal.pencegahan_ims ? anantenatal.pencegahan_ims : {},
        keadaan_ibu: anantenatal.keadaan_ibu ? anantenatal.keadaan_ibu : {},
        tb_kehamilan: anantenatal.tb_kehamilan ? anantenatal.tb_kehamilan : {},
        pencegahan_hepatitis: anantenatal.pencegahan_hepatitis ? anantenatal.pencegahan_hepatitis : {},
        konseling_ibu_hamil: anantenatal.konseling_ibu_hamil ? anantenatal.konseling_ibu_hamil : {},

        keterangan: anantenatal.keterangan ? anantenatal.keterangan : ''
      }

      const kspr = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pemeriksaan_antenatal && json.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr) ? json.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr = {
        skrining: kspr.skrining ? kspr.skrining : []
      }

      const pengamatan_persalinan = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pengamatan_persalinan) ? json.kesehatan_ibu_anak.pengamatan_persalinan : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.pengamatan_persalinan = {
        ...pengamatan_persalinan,
        data_persalinan: pengamatan_persalinan.data_persalinan ? pengamatan_persalinan.data_persalinan : {},
        bulk_observasi: pengamatan_persalinan.bulk_observasi ? pengamatan_persalinan.bulk_observasi : []
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak.pengamatan_persalinan.nama_pasien) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak.pengamatan_persalinan.nama_pasien = this.dataRegistrasi.nama_lengkap
      }

      const nifas = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pengamatan_nifas) ? json.kesehatan_ibu_anak.pengamatan_nifas : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.pengamatan_nifas = {
        ...nifas,
        pemeriksaan_pnc: nifas.pemeriksaan_pnc ? nifas.pemeriksaan_pnc : {},
        integrasi_program: nifas.integrasi_program ? nifas.integrasi_program : {},
        metode_kontrasepsi: nifas.metode_kontrasepsi ? nifas.metode_kontrasepsi : {}
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak.pengamatan_nifas.nama_pasien) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak.pengamatan_nifas.nama_pasien = this.dataRegistrasi.nama_lengkap
      }

      const patograf = (json && json.assesment && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.patograf) ? json.assesment.kesehatan_ibu_anak.patograf : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.patograf = {
        ...patograf,
        pembukaan_serviks: patograf.pembukaan_serviks ? patograf.pembukaan_serviks : [],
        kontraksi_uterus: patograf.kontraksi_uterus ? patograf.kontraksi_uterus : [],

        detak_jantung_janin: patograf.detak_jantung_janin ? patograf.detak_jantung_janin : [],
        penyusupan: patograf.penyusupan ? patograf.penyusupan : [],
        warna_air: patograf.warna_air ? patograf.warna_air : [],

        nadi: patograf.nadi ? patograf.nadi : [],
        tekanan_darah: patograf.tekanan_darah ? patograf.tekanan_darah : [],
        suhu: patograf.suhu ? patograf.suhu : [],
        urine: patograf.urine ? patograf.urine : [],
        makan_minum: patograf.makan_minum ? patograf.makan_minum : [],

        obat: patograf.obat ? patograf.obat : [],
        cairan: patograf.cairan ? patograf.cairan : [],

        catatan_persalinan: patograf.catatan_persalinan ? patograf.catatan_persalinan : {},
        kala_satu: patograf.kala_satu ? patograf.kala_satu : {},
        kala_dua: patograf.kala_dua ? patograf.kala_dua : {},
        kala_tiga: patograf.kala_tiga ? patograf.kala_tiga : {},
        kala_empat: patograf.kala_empat ? patograf.kala_empat : {},
        bayi_lahir: patograf.bayi_lahir ? patograf.bayi_lahir : {},

        kala_lima: patograf.kala_lima ? patograf.kala_lima : [],
      }
      this.dataAssesmenTambahan.kesehatan_ibu_anak.patograf.nama_pasien = this.dataRegistrasi.nama_lengkap
      this.dataAssesmenTambahan.kesehatan_ibu_anak.patograf.gravida = this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.riwayat_obstetrik.gravida
      this.dataAssesmenTambahan.kesehatan_ibu_anak.patograf.paritas = this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.riwayat_obstetrik.partus
      this.dataAssesmenTambahan.kesehatan_ibu_anak.patograf.abortus = this.dataAssesmenTambahan.kesehatan_ibu_anak.kia.riwayat_obstetrik.abortus

      const surat_ket_lahir = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.surat_ket_lahir) ? json.kesehatan_ibu_anak.surat_ket_lahir : {}
      this.dataAssesmenTambahan.kesehatan_ibu_anak.surat_ket_lahir = {
        data: surat_ket_lahir.data ? surat_ket_lahir.data : []
      }

      return true
    },
    updateAssesmenTambahan() {
      let param = { ...this.objAssesmenTambahan }
      param.id = param.assesment_tambahan_rnap_id
      param.json_askep = this.dataAssesmenTambahan
      this.$_api.update('assesment_tambahan_rnap', param).then(() => {
        this.$_alert.success('Assesmen Tambahan berhasil diperbarui.')
      })
    },
    doValidasiAssesmenTambahan() {
      this.$_alert.confirm('Yakin ingin memvalidasi assesmen ini?').then((res) => {
        if (res.isConfirmed) {
          this.objAssesmenTambahan.is_validasi_askep = true
          this.is_validasi_assesmen_tambahan = this.objAssesmenTambahan.is_validasi_askep
          this.updateAssesmenTambahan()
        }
      })
    },
    // END ASSESMEN TAMBAHAN
    async selectRegistrasi(e = {}, moveToList = true) {
      this.dataRegistrasi = e || {}
      this.registrasi_id = e.registrasi_id || ''
      if (!this.registrasi_id) return

      this.resetEvImState()

      if (this.$route.query && this.$route.query.view !== 'list' && moveToList) {
        this.$router.push({
          name: this.$route.name,
          query: { ...this.$route.query, view: 'list', registrasi_id: this.registrasi_id }
        })
      }

      await Promise.allSettled([
        this.getImplementasiKeperawatanV2(),
        this.getLegacyEvaluasiKeperawatan(),
        this.initAssesmenTambahan(this.registrasi_id)
      ])
    },
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.card-active {
  border-left: 4.5px solid #dfd429 !important;
}

.implementasi-keperawatan-active {
  background-color: #4AB58E !important;
  background-position: calc(100% + 1rem) bottom;
  background-size: 20% auto;
  background-image: url(https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/humans/custom-1.svg);
}

.legacy-wrapper {
  border-left: 3px solid rgba(255, 255, 255, 0.35);
  padding-left: 1rem;
}

.empty-state-card {
  border: 1px dashed #E4E6EF;
  border-radius: 0.75rem;
}

.card-list-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-list-hover:hover {
  transform: translateY(-1px);
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}

.sticky2 {
  z-index: 90;
  top: 119px;
  left: 290px;
  right: 25px;
}

header .header-inner {
  transition: all 250ms cubic-bezier(0.33, 1, 0.68, 1);
  max-height: auto;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
</style>
