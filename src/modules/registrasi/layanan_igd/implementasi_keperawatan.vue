<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div v-if="op.registrasi_id" class="card card-custom bgi-no-repeat gutter-b dropright implementasi-keperawatan-active">
          <div class="card-body d-flex align-items-center p-3">
            <div class="py-2 w-100">
              <div class="d-flex flex-row justify-content-start align-items-center" style="gap: 5px">
                <div class="label label-pill label-inline label-warning">{{ registrasi.nama_asuransi || "-" }}</div>
                <p class="text-white font-size-md pb-0 mb-0">{{ registrasi.no_identitas_registrasi || "-" }}</p>
              </div>
              <h3 class="text-white font-weight-bolder">Pasien : {{ registrasi.nama_lengkap || "-" }}</h3>

              <div class="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <p class="text-white font-size-lg pb-0 mb-0">{{ registrasi.nama_jenis_layanan || "-" }}</p>
                </div>
                <div class="label label-pill label-inline label-light-primary">Flow V2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card mb-5">
          <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between h-50px">
            <h5 class="font-weight-bolder text-dark mb-0 pb-0">IMPLEMENTASI KEPERAWATAN</h5>
            <button class="btn btn-primary btn-sm" @click="openImplementasiForm()" :disabled="!hasRegistrasiId">
              <i class="ri-add-circle-line p-0"></i>
              Tambah
            </button>
          </div>
          <div class="card-body p-3">
            <div v-if="!hasRegistrasiId" class="flex-grow-1 bg-danger p-8 rounded-xl bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: auto 70%; background-image: url(https://preview.keenthemes.com/metronic/theme/html/demo10/dist/assets/media/svg/humans/custom-3.svg)">
              <h4 class="text-inverse-danger mt-2 font-weight-bolder">Oooops...</h4>
              <p class="text-inverse-danger my-6">Pilih dulu registrasi terlebih dahulu</p>
            </div>

            <div v-else-if="loadingV2" class="d-flex justify-content-center py-10">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>

            <template v-else-if="listImplementasiKeperawatanV2.length > 0">
              <div v-for="(item, i) in listImplementasiKeperawatanV2" :key="'list-implementasi-v2-' + i" class="card card-custom bgi-no-repeat gutter-b dropright card-list-hover" :class="{ 'card-active': selectedImplementasiId === item.id }">
                <div class="card-body d-flex align-items-start p-3">
                  <div class="py-2 w-100 pointer" @click="selectImplementasi(item)">
                    <div class="d-flex flex-row justify-content-between align-items-start" style="gap: 12px">
                      <div class="w-100">
                        <p class="font-size-md pb-0 mb-2">
                          <strong>{{ getImplementasiPayload(item).waktu_implementasi | parse("longDateTime") }}</strong>
                        </p>
                        <h5 class="font-weight-bolder text-warning mb-1">{{ getDiagnosaText(getImplementasiPayload(item)) }}</h5>
                        <!-- <p class="mb-0"><span class="text-primary">Jenis:</span> {{ getImplementasiPayload(item).jenis_implementasi || "-" }}</p> -->
                        <p class="mb-0"><span class="text-primary">Tindak Lanjut:</span> {{ getImplementasiPayload(item).tindak_lanjut || "-" }}</p>
                      </div>
                      <div class="text-right">
                        <div style="min-width: 70px" class="label label-pill label-inline label-light-primary mb-2">{{ (item.evaluasi || []).length }} Evaluasi</div>
                      </div>
                    </div>
                  </div>

                  <b-dropdown dropright text="Pilih Implementasi" variant="primary" class="ml-2" toggle-class="btn-sm p-1">
                    <b-dropdown-item @click="selectImplementasi(item)">Lihat Detail</b-dropdown-item>
                    <b-dropdown-item @click="openImplementasiForm(item)">Edit</b-dropdown-item>
                    <b-dropdown-item @click="confirmDeleteImplementasi(item)">Hapus</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </template>

            <div v-else class="empty-state-card p-8 text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-200px" alt="" />
              <h4 class="mt-4 font-weight-bolder text-dark">Belum ada implementasi V2</h4>
              <p class="text-muted mb-4">Mulai flow baru dari implementasi, lalu tambahkan evaluasi di detail implementasi.</p>
              <button class="btn btn-light-primary" @click="openImplementasiForm()">Buat Implementasi</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card mb-5">
          <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between h-50px">
            <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ currentPanelTitle }}</h5>
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
                      <s-input
                        v-model="vImplementasi.implementasi_keperawatan_igd.waktu_implementasi"
                        :item="{
                          label: 'Tanggal Implementasi',
                          id: 'waktu_implementasi',
                          data: 'waktu_implementasi',
                          type: 'datetime',
                          validation: ['required'],
                        }"
                        :valuee="vImplementasi.implementasi_keperawatan_igd.waktu_implementasi" />
                    </div>
                    <div class="col-6">
                      <s-input
                        v-model="vImplementasi.implementasi_keperawatan_igd.diagnosa"
                        :item="{
                          label: 'Diagnosa',
                          id: 'diagnosa',
                          data: 'diagnosa',
                          type: 'lookup-radio',
                          validation: ['required'],
                          value: vImplementasi.implementasi_keperawatan_igd.diagnosa,
                          return_object: true,
                          api: 'ms_diagnosa',
                          pointer: {
                            label: 'nama_diagnosa',
                            code: 'id',
                            display: ['nama_diagnosa'],
                          },
                          param: {},
                        }"
                        :valuee="vImplementasi.implementasi_keperawatan_igd.diagnosa" />
                    </div>
                    <!-- <div class="col-12">
                      <s-input
                        v-model="vImplementasi.implementasi_keperawatan_igd.jenis_implementasi"
                        :item="{
                          label: 'Jenis Implementasi',
                          id: 'jenis_implementasi',
                          data: 'jenis_implementasi',
                          type: 'text',
                          validation: [],
                        }"
                        :valuee="vImplementasi.implementasi_keperawatan_igd.jenis_implementasi" />
                    </div> -->
                    <div class="col-12">
                      <s-input
                        v-model="vImplementasi.implementasi_keperawatan_igd.respon_pasien"
                        :item="{
                          label: 'Respon Pasien',
                          id: 'respon_pasien',
                          data: 'respon_pasien',
                          type: 'text',
                          validation: [],
                        }"
                        :valuee="vImplementasi.implementasi_keperawatan_igd.respon_pasien" />
                    </div>
                    <div class="col-12">
                      <s-input
                        v-model="vImplementasi.implementasi_keperawatan_igd.tindak_lanjut"
                        :item="{
                          label: 'Tindak Lanjut',
                          id: 'tindak_lanjut',
                          data: 'tindak_lanjut',
                          type: 'textarea',
                          validation: [],
                        }"
                        :valuee="vImplementasi.implementasi_keperawatan_igd.tindak_lanjut" />
                    </div>
                  </div>

                  <div class="col-12 align-self-center p-0">
                    <button type="submit" class="btn btn-light-primary mr-3">
                      <i class="ri-save-line"></i>
                      {{ implementasiFormMode === "create" ? "Simpan Implementasi" : "Perbarui Implementasi" }}
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </template>

            <template v-else-if="panelMode === 'evaluasi-form'">
              <div class="alert alert-light-primary mb-5" v-if="hasSelectedImplementasi">
                Evaluasi akan tersimpan ke implementasi:
                <strong>{{ getDiagnosaText(selectedImplementasiPayload) }}</strong>
              </div>

              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
                  <div class="row">
                    <div class="col-6">
                      <s-input
                        v-model="vEvaluasi.perawat_id"
                        :item="{
                          label: 'Perawat',
                          id: 'perawat_id',
                          data: 'perawat_id',
                          type: 'lookup-radio',
                          validation: ['required'],
                          value: vEvaluasi.perawat_id,
                          api: 'msDokter',
                          pointer: {
                            label: 'nama_dokter',
                            code: 'ms_dokter_id',
                            display: ['nama_tipe_tenaga_medis', 'nama_dokter', 'nik_dokter', 'npwp_dokter'],
                            headerDisplay: ['Tipe Tenaga Medis', 'Nama dokter', 'NIK', 'NPWP'],
                          },
                          param: {
                            kode_tipe_tenaga_medis: 'PRW',
                          },
                        }"
                        :valuee="vEvaluasi.perawat_id" />
                    </div>
                    <div class="col-6">
                      <s-input
                        v-model="vEvaluasi.waktu_evaluasi"
                        :item="{
                          label: 'Waktu Evaluasi',
                          id: 'waktu_evaluasi',
                          data: 'waktu_evaluasi',
                          value: vEvaluasi.waktu_evaluasi,
                          type: 'datetime',
                          validation: ['required'],
                          formatDateView: 'DD MMM YYYY HH:mm',
                        }"
                        :valuee="vEvaluasi.waktu_evaluasi" />
                    </div>
                    <div class="col-6">
                      <s-input
                        v-model="vEvaluasi.tindak_lanjut"
                        :item="{
                          label: 'Tindak lanjut',
                          id: 'tindak_lanjut',
                          data: 'tindak_lanjut',
                          type: 'select',
                          validation: ['required'],
                          value: vEvaluasi.tindak_lanjut,
                          param: {},
                          pointer: {
                            label: 'label',
                            code: 'code',
                          },
                          api: false,
                          optionList: [
                            { code: 'Lanjut Perawatan', label: 'Lanjut Perawatan' },
                            { code: 'Berhenti Perawatan', label: 'Berhenti Perawatan' },
                          ],
                        }"
                        :valuee="vEvaluasi.tindak_lanjut" />
                    </div>
                    <div class="col-6">
                      <s-input
                        v-model="vEvaluasi.status_evaluasi_keperawatan"
                        :item="{
                          label: 'Status Evaluasi',
                          id: 'status_evaluasi_keperawatan',
                          data: 'status_evaluasi_keperawatan',
                          type: 'select',
                          validation: ['required'],
                          value: vEvaluasi.status_evaluasi_keperawatan,
                          param: {},
                          pointer: {
                            label: 'label',
                            code: 'code',
                          },
                          api: false,
                          optionList: [
                            { code: true, label: 'Aktif' },
                            { code: false, label: 'Tidak Aktif' },
                          ],
                        }"
                        :valuee="vEvaluasi.status_evaluasi_keperawatan" />
                    </div>
                    <div class="col-12">
                      <s-input
                        v-model="vEvaluasi.catatan"
                        :item="{
                          label: 'Catatan',
                          id: 'catatan',
                          data: 'catatan',
                          value: vEvaluasi.catatan,
                          type: 'textarea',
                          validation: ['required'],
                        }"
                        :valuee="vEvaluasi.catatan" />
                    </div>
                  </div>

                  <div class="col-12 align-self-center p-0">
                    <button type="submit" class="btn btn-light-primary mr-3">
                      <i class="ri-save-line"></i>
                      {{ evaluasiFormMode === "create" ? "Simpan Evaluasi" : "Perbarui Evaluasi" }}
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
                      <p class="mb-2">
                        <strong>{{ selectedImplementasiPayload.waktu_implementasi | parse("longDateTime") }}</strong>
                      </p>
                      <h4 class="font-weight-bolder text-warning mb-2">{{ getDiagnosaText(selectedImplementasiPayload) }}</h4>
                      <!-- <p class="mb-1"><span class="text-primary">Jenis Implementasi:</span> {{ selectedImplementasiPayload.jenis_implementasi || "-" }}</p> -->
                      <p class="mb-1"><span class="text-primary">Respon Pasien:</span> {{ selectedImplementasiPayload.respon_pasien || "-" }}</p>
                      <p class="mb-0"><span class="text-primary">Tindak Lanjut:</span> {{ selectedImplementasiPayload.tindak_lanjut || "-" }}</p>
                    </div>
                    <div class="d-flex flex-column align-items-end">
                      <button class="btn btn-primary btn-sm mb-2" @click="openEvaluasiForm()">
                        <i class="ri-add-circle-line p-0"></i>
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
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">EVALUASI</h5>
                <div class="label label-pill label-inline label-light-primary">{{ selectedImplementasiEvaluasi.length }} data</div>
              </div>

              <template v-if="selectedImplementasiEvaluasi.length > 0">
                <div
                  v-for="(item, i) in selectedImplementasiEvaluasi"
                  :key="'list-evaluasi-v2-' + i"
                  class="card card-custom bgi-no-repeat gutter-b dropright card-list-hover"
                  :class="{
                    'implementasi-keperawatan-active': item.status_evaluasi_keperawatan,
                    'bg-gray-500': !item.status_evaluasi_keperawatan,
                    'card-active': selectedEvaluasiId === item.id,
                  }">
                  <div class="card-body d-flex align-items-start p-3">
                    <div class="py-2 w-100 pointer" @click="selectEvaluasi(item)">
                      <div class="d-flex flex-row justify-content-start align-items-center mb-2" style="gap: 5px">
                        <div class="label label-pill label-inline" :class="{ 'label-warning': item.status_evaluasi_keperawatan, 'label-danger': !item.status_evaluasi_keperawatan }">
                          {{ item.status_evaluasi_keperawatan ? "Aktif" : "Tidak Aktif" }}
                        </div>
                        <p class="text-white font-size-md pb-0 mb-0">{{ item.waktu_evaluasi | parse("longDateTime") }}</p>
                      </div>
                      <h5 class="text-white font-weight-bolder mb-1">{{ getPerawatName(item) }}</h5>
                      <p class="text-white font-size-lg pb-0 mb-1">{{ item.tindak_lanjut || "-" }}</p>
                      <p class="text-white font-size-md pb-0 mb-0">{{ item.catatan || "-" }}</p>
                    </div>

                    <div class="d-flex flex-column align-items-end ml-3">
                      <span class="label label-lg label-pill label-inline mb-2 label-success pointer" @click.stop="openEvaluasiForm(item)"> Edit </span>
                      <span class="label label-lg label-pill label-inline label-danger pointer" @click.stop="confirmDeleteEvaluasi(item)"> Hapus </span>
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
              <p class="text-muted mb-0">Flow baru dimulai dari implementasi, lalu evaluasi ditambahkan di detail implementasi.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between">
            <div>
              <h5 class="font-weight-bolder text-dark mb-1 pb-0">HISTORI LEGACY</h5>
              <p class="text-muted mb-0">Flow lama evaluasi -&gt; implementasi dipertahankan sebagai read-only.</p>
            </div>
            <div class="label label-pill label-inline label-light-warning">Read Only</div>
          </div>
          <div class="card-body p-3">
            <div v-if="!hasRegistrasiId" class="empty-state-card p-8 text-center">
              <h4 class="font-weight-bolder text-dark">Belum ada registrasi terpilih</h4>
              <p class="text-muted mb-0">Pilih registrasi untuk melihat histori legacy.</p>
            </div>

            <div v-else-if="loadingLegacy" class="d-flex justify-content-center py-10">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>

            <template v-else-if="listLegacyEvaluasiKeperawatan.length > 0">
              <div v-for="(item, i) in listLegacyEvaluasiKeperawatan" :key="'legacy-evaluasi-' + i" class="card card-custom bgi-no-repeat gutter-b dropright" :class="{ 'implementasi-keperawatan-active': item.status_evaluasi_keperawatan, 'bg-gray-500': !item.status_evaluasi_keperawatan }">
                <div class="card-body p-3">
                  <div class="d-flex flex-row justify-content-start align-items-center mb-2" style="gap: 5px">
                    <div class="label label-pill label-inline" :class="{ 'label-warning': item.status_evaluasi_keperawatan, 'label-danger': !item.status_evaluasi_keperawatan }">
                      {{ item.status_evaluasi_keperawatan ? "Aktif" : "Tidak Aktif" }}
                    </div>
                    <p class="text-white font-size-md pb-0 mb-0">{{ item.waktu_evaluasi | parse("longDateTime") }}</p>
                  </div>
                  <h5 class="text-white font-weight-bolder mb-1">{{ getPerawatName(item) }}</h5>
                  <p class="text-white font-size-lg pb-0 mb-1">{{ item.tindak_lanjut || "-" }}</p>
                  <p class="text-white font-size-md pb-0 mb-4">{{ item.catatan || "-" }}</p>

                  <div class="legacy-wrapper">
                    <h6 class="text-white font-weight-bolder mb-3">Implementasi Legacy</h6>

                    <template v-if="item.implementasi && item.implementasi.length > 0">
                      <div v-for="(legacyImplementasi, j) in item.implementasi" :key="'legacy-implementasi-' + i + '-' + j" class="bg-white rounded p-4 mb-3">
                        <p class="mb-2">
                          <strong>{{ getImplementasiPayload(legacyImplementasi).waktu_implementasi | parse("longDateTime") }}</strong>
                        </p>
                        <h6 class="font-weight-bolder text-warning mb-2">{{ getDiagnosaText(getImplementasiPayload(legacyImplementasi)) }}</h6>
                        <!-- <p class="mb-1"><span class="text-primary">Jenis:</span> {{ getImplementasiPayload(legacyImplementasi).jenis_implementasi || "-" }}</p> -->
                        <p class="mb-1"><span class="text-primary">Respon Pasien:</span> {{ getImplementasiPayload(legacyImplementasi).respon_pasien || "-" }}</p>
                        <p class="mb-0"><span class="text-primary">Tindak Lanjut:</span> {{ getImplementasiPayload(legacyImplementasi).tindak_lanjut || "-" }}</p>
                      </div>
                    </template>

                    <div v-else class="bg-white rounded p-4 text-muted">Implementasi legacy tidak ditemukan.</div>
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
  </div>
</template>

<style>
.card-active {
  border-left: 4.5px solid #dfd429 !important;
}

.implementasi-keperawatan-active {
  background-color: #4ab58e !important;
  background-position: calc(100% + 1rem) bottom;
  background-size: 20% auto;
  background-image: url(https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/humans/custom-1.svg);
}

.empty-state-card {
  border: 1px dashed #e4e6ef;
  border-radius: 0.75rem;
}

.legacy-wrapper {
  border-left: 3px solid rgba(255, 255, 255, 0.35);
  padding-left: 1rem;
}

.card-list-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-list-hover:hover {
  transform: translateY(-1px);
}

.pointer {
  cursor: pointer;
}
</style>

<script>
import moment from "moment";
moment.locale("id");

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

const cloneValue = (value) => JSON.parse(JSON.stringify(value || {}));

const formatDateTimeValue = (value) => {
  if (value && moment(value).isValid()) return moment(value).format(DEFAULT_DATE_FORMAT);
  return moment().format(DEFAULT_DATE_FORMAT);
};

const toBoolean = (value, fallback = false) => {
  if (value === true || value === "true" || value === 1 || value === "1") return true;
  if (value === false || value === "false" || value === 0 || value === "0") return false;
  return fallback;
};

const createDefaultImplementasiForm = (registrasiId = "") => ({
  registrasi_id: registrasiId || "",
  implementasi_keperawatan_igd: {
    waktu_implementasi: formatDateTimeValue(),
    diagnosa: null,
    jenis_implementasi: "",
    respon_pasien: "",
    tindak_lanjut: "",
  },
});

const createDefaultEvaluasiForm = (implementasiId = "") => ({
  implementasi_id: implementasiId || "",
  evaluasi_keperawatan: {},
  perawat_id: "",
  waktu_evaluasi: formatDateTimeValue(),
  tindak_lanjut: "",
  catatan: "",
  status_evaluasi_keperawatan: true,
});

const normalizeEvaluasiItem = (item = {}) => ({
  ...item,
  evaluasi_keperawatan: item.evaluasi_keperawatan || {},
  status_evaluasi_keperawatan: toBoolean(item.status_evaluasi_keperawatan, true),
  waktu_evaluasi: item.waktu_evaluasi ? formatDateTimeValue(item.waktu_evaluasi) : "",
});

const normalizeImplementasiItem = (item = {}) => ({
  ...item,
  implementasi_keperawatan_igd: item.implementasi_keperawatan_igd || {},
  evaluasi: Array.isArray(item.evaluasi)
    ? item.evaluasi.map((evaluasi) =>
        normalizeEvaluasiItem({
          ...evaluasi,
          implementasi_id: evaluasi.implementasi_id || item.id,
          registrasi_id: evaluasi.registrasi_id || item.registrasi_id,
        }),
      )
    : [],
});

const normalizeLegacyEvaluasiItem = (item = {}) => ({
  ...item,
  evaluasi_keperawatan: item.evaluasi_keperawatan || {},
  implementasi: Array.isArray(item.implementasi)
    ? item.implementasi.map((legacyImplementasi) => ({
        ...legacyImplementasi,
        implementasi_keperawatan_igd: legacyImplementasi.implementasi_keperawatan_igd || {},
      }))
    : [],
  status_evaluasi_keperawatan: toBoolean(item.status_evaluasi_keperawatan, true),
  waktu_evaluasi: item.waktu_evaluasi ? formatDateTimeValue(item.waktu_evaluasi) : "",
});

export default {
  name: "crud-triage",
  data() {
    return {
      panelMode: "detail",
      implementasiFormMode: "create",
      evaluasiFormMode: "create",

      selectedImplementasiId: "",
      selectedImplementasiData: {},
      selectedEvaluasiId: "",
      selectedEvaluasiData: {},

      listImplementasiKeperawatanV2: [],
      listLegacyEvaluasiKeperawatan: [],

      op: { registrasi_id: "" },

      vEvaluasi: createDefaultEvaluasiForm(),
      vImplementasi: createDefaultImplementasiForm(),
      registrasi: {},

      loadingV2: false,
      loadingLegacy: false,
    };
  },
  computed: {
    hasRegistrasiId() {
      return !!this.op.registrasi_id;
    },
    hasSelectedImplementasi() {
      return !!this.selectedImplementasiId && !!this.selectedImplementasiData.id;
    },
    selectedImplementasiPayload() {
      return this.getImplementasiPayload(this.selectedImplementasiData);
    },
    selectedImplementasiEvaluasi() {
      return this.selectedImplementasiData.evaluasi || [];
    },
    currentPanelTitle() {
      if (this.panelMode === "implementasi-form") return `${this.implementasiFormMode === "create" ? "FORM TAMBAH" : "FORM EDIT"} IMPLEMENTASI`;
      if (this.panelMode === "evaluasi-form") return `${this.evaluasiFormMode === "create" ? "FORM TAMBAH" : "FORM EDIT"} EVALUASI`;
      return "DETAIL IMPLEMENTASI KEPERAWATAN";
    },
  },
  watch: {
    "$route.query.registrasi_id": {
      immediate: true,
      handler(value) {
        this.resetPageState();
        this.op.registrasi_id = value || "";
      },
    },
    "op.registrasi_id": {
      immediate: false,
      async handler(value) {
        this.vImplementasi = createDefaultImplementasiForm(value);
        this.vEvaluasi = createDefaultEvaluasiForm();
        this.registrasi = {};

        if (!value) return;

        await Promise.allSettled([this.getRegistrasi(), this.getImplementasiKeperawatanV2(), this.getLegacyEvaluasiKeperawatan()]);
      },
    },
  },
  mounted() {
    this.$root.$emit("openCanvas");
  },
  methods: {
    resetPageState() {
      this.panelMode = "detail";
      this.implementasiFormMode = "create";
      this.evaluasiFormMode = "create";
      this.selectedImplementasiId = "";
      this.selectedImplementasiData = {};
      this.selectedEvaluasiId = "";
      this.selectedEvaluasiData = {};
      this.listImplementasiKeperawatanV2 = [];
      this.listLegacyEvaluasiKeperawatan = [];
      this.vEvaluasi = createDefaultEvaluasiForm();
      this.vImplementasi = createDefaultImplementasiForm(this.op.registrasi_id);
    },
    getImplementasiPayload(item = {}) {
      if (item && item.implementasi_keperawatan_igd && Object.keys(item.implementasi_keperawatan_igd).length > 0) return item.implementasi_keperawatan_igd;
      return item || {};
    },
    getDiagnosaText(source = {}) {
      const diagnosa = source.diagnosa || source;
      if (!diagnosa) return "-";
      if (typeof diagnosa === "string") return diagnosa;

      const namaDiagnosa = diagnosa.nama_diagnosa || source.nama_diagnosa || "-";
      const kodeDiagnosa = diagnosa.kode_diagnosa || source.kode_diagnosa || "";

      return kodeDiagnosa ? `${namaDiagnosa} (${kodeDiagnosa})` : namaDiagnosa;
    },
    getPerawatName(item = {}) {
      console.log("🔍 ~ getPerawatName ~ simrs-fe/src/modules/registrasi/layanan_igd/implementasi_keperawatan.vue:648 ~ item:", item);
      // return (item.ms_dokter && item.ms_dokter.nama_dokter) || (item.perawat && item.perawat.nama_dokter) || item.nama_dokter || "-";
      return item.ms_dokter ? item.ms_dokter.nama_dokter : "-";
    },
    buildImplementasiForm(item = {}) {
      const payload = this.getImplementasiPayload(item);
      return {
        id: item.id || "",
        registrasi_id: item.registrasi_id || this.op.registrasi_id,
        implementasi_keperawatan_igd: {
          ...createDefaultImplementasiForm(this.op.registrasi_id).implementasi_keperawatan_igd,
          ...cloneValue(payload),
          waktu_implementasi: formatDateTimeValue(payload.waktu_implementasi),
        },
      };
    },
    buildEvaluasiForm(item = {}, implementasiId = "") {
      return {
        ...createDefaultEvaluasiForm(implementasiId),
        id: item.id || "",
        evaluasi_keperawatan: cloneValue(item.evaluasi_keperawatan),
        perawat_id: item.perawat_id || "",
        waktu_evaluasi: formatDateTimeValue(item.waktu_evaluasi),
        tindak_lanjut: item.tindak_lanjut || "",
        catatan: item.catatan || "",
        status_evaluasi_keperawatan: toBoolean(item.status_evaluasi_keperawatan, true),
      };
    },
    applySelection(preferredImplementasiId = "", preferredEvaluasiId = "") {
      const selectedImplementasi = this.listImplementasiKeperawatanV2.find((item) => item.id === preferredImplementasiId) || this.listImplementasiKeperawatanV2.find((item) => item.id === this.selectedImplementasiId) || this.listImplementasiKeperawatanV2[0] || {};

      this.selectedImplementasiId = selectedImplementasi.id || "";
      this.selectedImplementasiData = selectedImplementasi.id ? selectedImplementasi : {};

      const evaluasiList = selectedImplementasi.evaluasi || [];
      const selectedEvaluasi = evaluasiList.find((item) => item.id === preferredEvaluasiId) || evaluasiList.find((item) => item.id === this.selectedEvaluasiId) || evaluasiList[0] || {};

      this.selectedEvaluasiId = selectedEvaluasi.id || "";
      this.selectedEvaluasiData = selectedEvaluasi.id ? selectedEvaluasi : {};
    },
    selectImplementasi(item = {}, preferredEvaluasiId = "") {
      const normalizedItem = normalizeImplementasiItem(item);
      this.selectedImplementasiId = normalizedItem.id || "";
      this.selectedImplementasiData = normalizedItem.id ? normalizedItem : {};
      this.panelMode = "detail";

      const evaluasiList = normalizedItem.evaluasi || [];
      const selectedEvaluasi = evaluasiList.find((evaluasi) => evaluasi.id === preferredEvaluasiId) || evaluasiList.find((evaluasi) => evaluasi.id === this.selectedEvaluasiId) || evaluasiList[0] || {};

      this.selectedEvaluasiId = selectedEvaluasi.id || "";
      this.selectedEvaluasiData = selectedEvaluasi.id ? selectedEvaluasi : {};
      this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId);
    },
    selectEvaluasi(item = {}) {
      this.selectedEvaluasiId = item.id || "";
      this.selectedEvaluasiData = item.id ? normalizeEvaluasiItem(item) : {};
    },
    openImplementasiForm(item = null) {
      if (item && item.id) {
        this.selectImplementasi(item);
        this.implementasiFormMode = "update";
        this.vImplementasi = this.buildImplementasiForm(item);
      } else {
        this.implementasiFormMode = "create";
        this.vImplementasi = createDefaultImplementasiForm(this.op.registrasi_id);
      }

      this.panelMode = "implementasi-form";
    },
    openEvaluasiForm(item = null) {
      if (!this.hasSelectedImplementasi) {
        this.$_alert.error({ message: "Pilih implementasi terlebih dahulu" }, "Terjadi kesalahan");
        return;
      }

      if (item && item.id) {
        this.selectEvaluasi(item);
        this.evaluasiFormMode = "update";
        this.vEvaluasi = this.buildEvaluasiForm(item, this.selectedImplementasiId);
      } else {
        this.evaluasiFormMode = "create";
        this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId);
      }

      this.panelMode = "evaluasi-form";
    },
    closeFormPanel() {
      this.panelMode = "detail";
      this.vImplementasi = createDefaultImplementasiForm(this.op.registrasi_id);
      this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId);
    },
    async getRegistrasi() {
      try {
        const res = await this.$_api.single("registrasi", {}, this.op.registrasi_id);
        if (res.status === 200 && res.data.length > 0) this.registrasi = res.data[0];
      } catch (err) {
        this.$_alert.error(err, "Registrasi tidak ditemukan");
      }
    },
    async getImplementasiKeperawatanV2(preferredImplementasiId = "", preferredEvaluasiId = "") {
      if (!this.op.registrasi_id) return;

      this.loadingV2 = true;
      try {
        const res = await this.$_api.post("implementasi_keperawatan_igd/getWithEvaluasiV2", { registrasi_id: this.op.registrasi_id });

        if (res.status !== 200) {
          this.listImplementasiKeperawatanV2 = [];
          this.applySelection();
          this.$_alert.error({ message: res.message || "Data implementasi tidak berhasil dimuat" }, "Terjadi kesalahan");
          return;
        }

        this.listImplementasiKeperawatanV2 = Array.isArray(res.data) ? res.data.map((item) => normalizeImplementasiItem(item)) : [];
        this.applySelection(preferredImplementasiId, preferredEvaluasiId);
      } catch (err) {
        this.listImplementasiKeperawatanV2 = [];
        this.applySelection();
        this.$_alert.error(err, "Data implementasi tidak berhasil dimuat");
      } finally {
        this.loadingV2 = false;
      }
    },
    async getLegacyEvaluasiKeperawatan() {
      if (!this.op.registrasi_id) return;

      this.loadingLegacy = true;
      try {
        const res = await this.$_api.post("evaluasi_keperawatan/getWithImplementasi", {
          halaman: 1,
          jumlah: 999999,
          registrasi_id: this.op.registrasi_id,
        });

        if (res.status !== 200) {
          this.listLegacyEvaluasiKeperawatan = [];
          this.$_alert.error({ message: res.message || "Histori legacy tidak berhasil dimuat" }, "Terjadi kesalahan");
          return;
        }

        this.listLegacyEvaluasiKeperawatan = Array.isArray(res.data) ? res.data.map((item) => normalizeLegacyEvaluasiItem(item)) : [];
      } catch (err) {
        this.listLegacyEvaluasiKeperawatan = [];
        this.$_alert.error(err, "Histori legacy tidak berhasil dimuat");
      } finally {
        this.loadingLegacy = false;
      }
    },
    async onSubmitImplementasi() {
      if (!this.op.registrasi_id) {
        this.$_alert.error({ message: "Silahkan pilih registrasi" }, "Terjadi kesalahan");
        return;
      }

      const payload = {
        implementasi_keperawatan_igd: cloneValue(this.vImplementasi.implementasi_keperawatan_igd),
      };
      payload.implementasi_keperawatan_igd.waktu_implementasi = formatDateTimeValue(payload.implementasi_keperawatan_igd.waktu_implementasi);

      const endpoint = this.implementasiFormMode === "create" ? "implementasi_keperawatan_igd/registerV2" : "implementasi_keperawatan_igd/updateV2";

      if (this.implementasiFormMode === "create") payload.registrasi_id = this.op.registrasi_id;
      else payload.id = this.vImplementasi.id;

      try {
        const res = await this.$_api.post(endpoint, payload);
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || "Data implementasi tidak berhasil disimpan" }, "Terjadi kesalahan");
          return;
        }

        const selectedImplementasiId = (res.data && res.data.id) || payload.id || this.selectedImplementasiId;
        await this.getImplementasiKeperawatanV2(selectedImplementasiId, "");
        this.panelMode = "detail";
        this.implementasiFormMode = "create";
        this.vImplementasi = createDefaultImplementasiForm(this.op.registrasi_id);
        this.$_alert.success({ message: res.message || "Data implementasi berhasil disimpan" }, "Berhasil");
      } catch (err) {
        this.$_alert.error(err, "Data implementasi tidak berhasil disimpan");
      }
    },
    async onSubmitEvaluasi() {
      if (!this.hasSelectedImplementasi) {
        this.$_alert.error({ message: "Pilih implementasi terlebih dahulu" }, "Terjadi kesalahan");
        return;
      }

      const payload = {
        evaluasi_keperawatan: cloneValue(this.vEvaluasi.evaluasi_keperawatan),
        perawat_id: this.vEvaluasi.perawat_id,
        waktu_evaluasi: formatDateTimeValue(this.vEvaluasi.waktu_evaluasi),
        tindak_lanjut: this.vEvaluasi.tindak_lanjut,
        catatan: this.vEvaluasi.catatan,
        status_evaluasi_keperawatan: toBoolean(this.vEvaluasi.status_evaluasi_keperawatan, true),
      };

      const endpoint = this.evaluasiFormMode === "create" ? "evaluasi_keperawatan/registerV2" : "evaluasi_keperawatan/updateV2";

      if (this.evaluasiFormMode === "create") payload.implementasi_id = this.selectedImplementasiId;
      else payload.id = this.vEvaluasi.id;

      try {
        const res = await this.$_api.post(endpoint, payload);
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || "Data evaluasi tidak berhasil disimpan" }, "Terjadi kesalahan");
          return;
        }

        const selectedEvaluasiId = (res.data && res.data.id) || payload.id || this.selectedEvaluasiId;
        await this.getImplementasiKeperawatanV2(this.selectedImplementasiId, selectedEvaluasiId);
        this.panelMode = "detail";
        this.evaluasiFormMode = "create";
        this.vEvaluasi = createDefaultEvaluasiForm(this.selectedImplementasiId);
        this.$_alert.success({ message: res.message || "Data evaluasi berhasil disimpan" }, "Berhasil");
      } catch (err) {
        this.$_alert.error(err, "Data evaluasi tidak berhasil disimpan");
      }
    },
    async confirmDeleteImplementasi(item = {}) {
      const result = await this.$_alert.confirm("Hapus Permanen", "Data implementasi akan dihapus. Backend akan menolak jika masih ada evaluasi child. Lanjutkan?");

      if (!result.isConfirmed) return;

      try {
        const res = await this.$_api.post("implementasi_keperawatan_igd/deleteV2", { id: item.id });
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || "Data implementasi tidak berhasil dihapus" }, "Terjadi kesalahan");
          return;
        }

        const fallbackImplementasi = this.listImplementasiKeperawatanV2.find((implementasi) => implementasi.id !== item.id);
        await this.getImplementasiKeperawatanV2(fallbackImplementasi ? fallbackImplementasi.id : "", "");
        this.$_alert.success(null, res.message || "Data implementasi berhasil dihapus");
      } catch (err) {
        this.$_alert.error(err, "Data implementasi tidak berhasil dihapus");
      }
    },
    async confirmDeleteEvaluasi(item = {}) {
      const result = await this.$_alert.confirm("Hapus Permanen", "Data evaluasi yang sudah dihapus tidak dapat dikembalikan. Lanjutkan?");

      if (!result.isConfirmed) return;

      try {
        const res = await this.$_api.post("evaluasi_keperawatan/deleteV2", { id: item.id });
        if (res.status !== 200) {
          this.$_alert.error({ message: res.message || "Data evaluasi tidak berhasil dihapus" }, "Terjadi kesalahan");
          return;
        }

        await this.getImplementasiKeperawatanV2(this.selectedImplementasiId, "");
        this.$_alert.success(null, res.message || "Data evaluasi berhasil dihapus");
      } catch (err) {
        this.$_alert.error(err, "Data evaluasi tidak berhasil dihapus");
      }
    },
  },
};
</script>
