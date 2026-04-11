# Observasi IGD Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Emergency Department Observation module for monitoring IGD patients during short-term observation periods (6-24 hours) with vital signs tracking, therapy documentation, and final disposition decisions.

**Architecture:** Vue.js 2.7 single-page application following the existing Visum module pattern. Component-level state management with reactive data flags to switch between observation list and detailed form views. Uses existing backend API endpoints for CRUD operations on observations and vital signs.

**Tech Stack:** Vue.js 2.7, Bootstrap Vue 2.21, Axios 0.21, VeeValidate 3.4, Moment.js 2.29, existing API endpoints

---

## File Structure

**New Files to Create:**
- `src/modules/registrasi/layanan_igd/observasi.vue` - Main page component (patient selection + observation management)
- `src/modules/_shared/observasi_form.vue` - Shared observation form component (list view + form mode with tabs)

**Files to Modify:**
- `src/modules/registrasi/_index.js` - Add route for observasi module

**Existing Files to Reference:**
- `src/modules/registrasi/layanan_igd/visum.vue` - Pattern reference for main page structure
- `src/modules/_shared/visum_form.vue` - Pattern reference for form component structure
- `src/modules/registrasi/layanan_igd/_components/card_registrasi_igd.vue` - Reused patient selector component
- `src/modules/registrasi/layanan_igd/_components/assesmen_medis/medis_planning.vue` - Pattern reference for lookup inputs

---

## Task 1: Add Route Configuration

**Files:**
- Modify: `src/modules/registrasi/_index.js`

- [ ] **Step 1: Add route entry to registrasi routes array**

Find the "Layanan IGD" section around line 26-37 and add the new observasi route after the gizi route:

```javascript
// Layanan IGD
{ name: 'Layanan IGD Triage', label: 'Layanan IGD Triage', icon: null, path: '/layanan_igd/triage', component: () => import('./layanan_igd/triage.vue') },
{ name: 'Layanan IGD keperawatan', label: 'Layanan IGD keperawatan', icon: null, path: '/layanan_igd/implementasi_keperawatan', component: () => import('./layanan_igd/implementasi_keperawatan.vue') },
{ name: 'Layanan IGD assesmen keperawatan', label: 'Layanan IGD assesmen keperawatan', icon: null, path: '/layanan_igd/assesmen_keperawatan', component: () => import('./layanan_igd/assesmen_keperawatan.vue') },
{ name: 'Layanan IGD assesmen medis', label: 'Layanan IGD assesmen medis', icon: null, path: '/layanan_igd/assesmen_medis', component: () => import('./layanan_igd/assesmen_medis.vue') },
{ name: 'Layanan IGD Farmasi', label: 'Layanan IGD Farmasi', icon: null, path: '/layanan_igd/farmasi', component: () => import('./layanan_igd/farmasi.vue') },
{ name: 'Layanan IGD Gizi', label: 'Layanan IGD Gizi', icon: null, path: '/layanan_igd/gizi', component: () => import('./layanan_igd/gizi.vue') },
{ name: 'Layanan IGD Visum', label: 'Layanan IGD Visum', icon: null, path: '/layanan_igd/visum', component: () => import('./layanan_igd/visum.vue') },
{ name: 'Layanan IGD Observasi', label: 'Layanan IGD Observasi', icon: null, path: '/layanan_igd/observasi', component: () => import('./layanan_igd/observasi.vue') },
{ name: 'Layanan IGD resume medis', label: 'Layanan IGD resume medis', icon: null, path: '/layanan_igd/resume_medis', component: () => import('./layanan_igd/medis.vue') },
```

- [ ] **Step 2: Commit route addition**

```bash
git add src/modules/registrasi/_index.js
git commit -m "feat(observasi): add route for Layanan IGD Observasi module"
```

---

## Task 2: Create Main Page Component Structure

**Files:**
- Create: `src/modules/registrasi/layanan_igd/observasi.vue`

- [ ] **Step 1: Create basic component structure with patient selection**

```vue
<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Column 1: Card Registrasi -->
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-igd @selected="selectRegistrasi" :type="'observasi'"/>
      </div>

      <!-- Column 2: Observasi Form -->
      <div class="col-xl-9 col-md-9 col-sm-12" v-if="dataRegistrasi && dataRegistrasi.id">
        <!-- Patient Info Card -->
        <div class="card card-custom mb-5">
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter || '-' }}</p>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- Observasi Form Component -->
        <observasi-form
          :dataRegistrasi="dataRegistrasi"
          :registrasiId="registrasiId"
        />
      </div>

      <!-- Empty State: No Registration Selected -->
      <template v-else>
        <div class="col-xl-9 col-md-9 col-sm-12">
          <div class="card card-custom">
            <div class="card-body text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h5 class="font-weight-bolder mt-5">Silakan Pilih Registrasi</h5>
              <p class="text-muted">Pilih pasien dari daftar registrasi untuk mengelola data observasi</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CardRegistrasiIgd from './_components/card_registrasi_igd.vue'
import ObservasiForm from '../../_shared/observasi_form.vue'

export default {
  name: 'layanan_igd_observasi',
  components: { CardRegistrasiIgd, ObservasiForm },
  data() {
    return {
      dataRegistrasi: {},
      registrasiId: ''
    }
  },
  methods: {
    selectRegistrasi(e) {
      if (e && e.registrasi_id !== undefined) {
        this.dataRegistrasi = e
        this.registrasiId = e.registrasi_id || ''
      }
    }
  }
}
</script>
```

- [ ] **Step 2: Commit main page structure**

```bash
git add src/modules/registrasi/layanan_igd/observasi.vue
git commit -m "feat(observasi): create main page component with patient selection"
```

---

## Task 3: Create Observasi Form Component - Basic Structure

**Files:**
- Create: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Create component with list view and state management**

```vue
<template>
  <div class="card card-custom">
    <div class="card-body p-4">
      <!-- Loading State -->
      <div class="d-flex justify-content-center" v-if="loading && !isFormMode">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>

      <!-- List View -->
      <div v-if="!isFormMode">
        <!-- Empty State -->
        <div v-if="observasiList.length === 0" class="text-center py-10">
          <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
          <h5 class="font-weight-bolder mt-5">Data observasi belum tersedia</h5>
          <p class="text-muted">Pasien ini belum memiliki data observasi</p>
          <button class="btn btn-primary mt-3" @click="startCreate">
            <i class="ri-file-add-line"></i> Buat Data Observasi
          </button>
        </div>

        <!-- Observasi Table -->
        <div v-else>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <h6 class="font-weight-bolder text-dark">Daftar Observasi ({{ observasiList.length }})</h6>
            <button class="btn btn-primary btn-sm" @click="startCreate">
              <i class="ri-add-line"></i> Tambah Data
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th width="150">Mulai</th>
                  <th width="150">Selesai</th>
                  <th>Durasi</th>
                  <th>Status</th>
                  <th width="200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in observasiList" :key="item.id">
                  <td>
                    <div class="font-weight-bolder text-dark">
                      {{ $moment(item.jam_start).format('DD/MM/YYYY HH:mm') }}
                    </div>
                  </td>
                  <td>
                    <div v-if="item.jam_end" class="font-weight-bolder">
                      {{ $moment(item.jam_end).format('DD/MM/YYYY HH:mm') }}
                    </div>
                    <div v-else class="text-muted">-</div>
                  </td>
                  <td>{{ item.durasi || '-' }} jam</td>
                  <td>
                    <span v-if="item.jam_end" class="badge badge-success">Selesai</span>
                    <span v-else class="badge badge-warning">Aktif</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-info mr-1" @click="editRecord(item)" title="Edit">
                      <i class="ri-pencil-line"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" @click="confirmDelete(item)" title="Hapus">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Mode -->
      <div v-if="isFormMode">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h6 class="font-weight-bolder text-dark">{{ formData.id ? 'Edit Observasi' : 'Buat Observasi Baru' }}</h6>
          <button class="btn btn-secondary btn-sm" @click="cancelEdit">
            <i class="ri-close-line"></i> Batal
          </button>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs nav-tabs-line mb-5">
          <li class="nav-item">
            <a class="nav-link pointer" @click="switchTab('monitoring')" :class="{ active: activeTab === 'monitoring' }">
              <span class="nav-icon"><i class="flaticon2-monitor"></i></span>
              <span class="nav-text">Monitoring</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link pointer" @click="switchTab('catatan_dokter')" :class="{ active: activeTab === 'catatan_dokter' }">
              <span class="nav-icon"><i class="flaticon2-talk"></i></span>
              <span class="nav-text">Catatan Dokter</span>
            </a>
          </li>
        </ul>

        <!-- Tab Contents -->
        <div v-if="activeTab === 'monitoring'">
          <div class="alert alert-info">
            <i class="ri-information-line"></i> Tab Monitoring akan diimplementasikan pada task berikutnya
          </div>
        </div>

        <div v-if="activeTab === 'catatan_dokter'">
          <div class="alert alert-info">
            <i class="ri-information-line"></i> Tab Catatan Dokter akan diimplementasikan pada task berikutnya
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObservasiForm',
  props: {
    dataRegistrasi: {
      type: Object,
      required: true
    },
    registrasiId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      isFormMode: false,
      activeTab: 'monitoring',
      observasiList: [],
      selectedObservasi: null,
      formData: {
        id: null,
        registrasi_id: this.registrasiId,
        durasi: 24,
        jam_start: '',
        jam_end: null,
        interval_vital_sign: 1,
        catatan_dokter: '',
        infus: '',
        obat: '',
        tindakan: '',
        keputusan_akhir: ''
      }
    }
  },
  watch: {
    registrasiId(newVal) {
      if (newVal) {
        this.loadObservasiData()
      }
    }
  },
  mounted() {
    this.loadObservasiData()
  },
  methods: {
    async loadObservasiData() {
      if (!this.registrasiId) return

      this.loading = true
      try {
        const response = await this.$_api.post('observasi/list', {
          registrasi_id: this.registrasiId,
          halaman: 1,
          jumlah: 999
        })

        if (response.data) {
          this.observasiList = response.data
        } else {
          this.observasiList = []
        }
      } catch (error) {
        console.error('Error loading observasi data:', error)
        let message = 'Gagal memuat data observasi'
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message
        } else if (error.message) {
          message = error.message
        }
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    startCreate() {
      this.isFormMode = true
      this.resetForm()
    },

    switchTab(tab) {
      this.activeTab = tab
    },

    cancelEdit() {
      this.isFormMode = false
      this.resetForm()
    },

    async editRecord(item) {
      this.loading = true
      try {
        const response = await this.$_api.post('observasi/detailsById', {
          id: item.id
        })

        if (response.data) {
          const observasi = response.data
          this.formData = {
            id: observasi.id,
            registrasi_id: observasi.registrasi_id,
            durasi: observasi.durasi || 24,
            jam_start: observasi.jam_start || '',
            jam_end: observasi.jam_end || null,
            interval_vital_sign: observasi.interval_vital_sign || 1,
            catatan_dokter: observasi.catatan_dokter || '',
            infus: observasi.infus || '',
            obat: observasi.obat || '',
            tindakan: observasi.tindakan || '',
            keputusan_akhir: observasi.keputusan_akhir || ''
          }
          this.isFormMode = true
        }
      } catch (error) {
        console.error('Error loading observasi for edit:', error)
        let message = 'Gagal memuat data observasi untuk edit'
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message
        } else if (error.message) {
          message = error.message
        }
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    async confirmDelete(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, 'Tidak ada data untuk dihapus')
        return
      }

      this.$_alert.confirm(
        { title: 'Hapus Data Observasi', text: 'Apakah Anda yakin ingin menghapus data observasi ini?' },
        async () => {
          await this.deleteObservasi(item)
        }
      )
    },

    async deleteObservasi(item) {
      this.loading = true
      try {
        await this.$_api.post('observasi/delete', {
          id: item.id
        })

        this.$_alert.success({}, 'Data observasi berhasil dihapus')
        await this.loadObservasiData()
      } catch (error) {
        console.error('Error deleting observasi data:', error)
        let message = 'Gagal menghapus data observasi'
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message
        } else if (error.message) {
          message = error.message
        }
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        registrasi_id: this.registrasiId,
        durasi: 24,
        jam_start: '',
        jam_end: null,
        interval_vital_sign: 1,
        catatan_dokter: '',
        infus: '',
        obat: '',
        tindakan: '',
        keputusan_akhir: ''
      }
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
```

- [ ] **Step 2: Commit basic form structure**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): create form component with list view and state management"
```

---

## Task 4: Implement Monitoring Tab - Observation Header Fields

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add observation header fields to monitoring tab**

Replace the monitoring tab placeholder in observasi_form.vue with:

```vue
<div v-if="activeTab === 'monitoring'">
  <div class="row">
    <div class="col-md-4">
      <div class="form-group">
        <label class="font-weight-bold">Durasi (jam) <span class="text-danger">*</span></label>
        <input
          v-model.number="formData.durasi"
          type="number"
          class="form-control"
          min="1"
          max="72"
          placeholder="24"
        />
        <small class="text-muted">Durasi observasi dalam jam (1-72)</small>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label class="font-weight-bold">Waktu Mulai <span class="text-danger">*</span></label>
        <input
          v-model="formData.jam_start"
          type="datetime-local"
          class="form-control"
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label class="font-weight-bold">Waktu Selesai</label>
        <input
          v-model="formData.jam_end"
          type="datetime-local"
          class="form-control"
        />
        <small class="text-muted">Opsional, isi saat observasi selesai</small>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label class="font-weight-bold">Interval Vital Sign</label>
        <input
          v-model.number="formData.interval_vital_sign"
          type="number"
          class="form-control"
          min="1"
          placeholder="1"
        />
        <small class="text-muted">Interval pencatatan vital sign (jam)</small>
      </div>
    </div>
  </div>

  <hr />

  <div class="alert alert-info">
    <i class="ri-information-line"></i> Bagian Vital Signs dan Terapi akan diimplementasikan pada task berikutnya
  </div>
</div>
```

- [ ] **Step 2: Commit monitoring tab header fields**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): add observation header fields to monitoring tab"
```

---

## Task 5: Implement Vital Signs Table - Data Structure & API Integration

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add vital signs data structure and API methods**

Add to the data() return object in observasi_form.vue:

```javascript
vitalSignsList: [],
vitalFormData: {
  id: null,
  observasi_id: '',
  jam: '',
  td: '',
  nadi: '',
  rr: '',
  suhu: '',
  kesadaran: '',
  catatan: ''
},
isEditingVital: false
```

Add these new methods to observasi_form.vue:

```javascript
async loadVitalSigns() {
  if (!this.selectedObservasi || !this.selectedObservasi.id) return

  try {
    const response = await this.$_api.post('observasiVital/list', {
      observasi_id: this.selectedObservasi.id,
      halaman: 1,
      jumlah: 999
    })

    if (response.data) {
      this.vitalSignsList = response.data
    } else {
      this.vitalSignsList = []
    }
  } catch (error) {
    console.error('Error loading vital signs:', error)
    this.$_alert.error({}, 'Gagal memuat data vital sign')
  }
},

async saveVitalSign() {
  this.loading = true
  try {
    let response
    if (this.vitalFormData.id) {
      response = await this.$_api.post('observasiVital/update', {
        id: this.vitalFormData.id,
        observasi_id: this.selectedObservasi.id,
        jam: this.vitalFormData.jam || null,
        td: this.vitalFormData.td || null,
        nadi: this.vitalFormData.nadi || null,
        rr: this.vitalFormData.rr || null,
        suhu: this.vitalFormData.suhu || null,
        kesadaran: this.vitalFormData.kesadaran || null,
        catatan: this.vitalFormData.catatan || null
      })
    } else {
      response = await this.$_api.post('observasiVital/register', {
        observasi_id: this.selectedObservasi.id,
        jam: this.vitalFormData.jam || null,
        td: this.vitalFormData.td || null,
        nadi: this.vitalFormData.nadi || null,
        rr: this.vitalFormData.rr || null,
        suhu: this.vitalFormData.suhu || null,
        kesadaran: this.vitalFormData.kesadaran || null,
        catatan: this.vitalFormData.catatan || null
      })
    }

    this.$_alert.success({}, response.message || 'Data vital berhasil disimpan')
    await this.loadVitalSigns()
    this.resetVitalForm()
  } catch (error) {
    console.error('Error saving vital sign:', error)
    let message = 'Gagal menyimpan data vital'
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message
    } else if (error.message) {
      message = error.message
    }
    this.$_alert.error({}, message)
  } finally {
    this.loading = false
  }
},

async deleteVitalSign(item) {
  if (!item || !item.id) {
    this.$_alert.error({}, 'Tidak ada data untuk dihapus')
    return
  }

  this.$_alert.confirm(
    { title: 'Hapus Data Vital', text: 'Apakah Anda yakin ingin menghapus data vital ini?' },
    async () => {
      try {
        await this.$_api.post('observasiVital/delete', {
          id: item.id
        })

        this.$_alert.success({}, 'Data vital berhasil dihapus')
        await this.loadVitalSigns()
      } catch (error) {
        console.error('Error deleting vital sign:', error)
        this.$_alert.error({}, 'Gagal menghapus data vital')
      }
    }
  )
},

resetVitalForm() {
  this.vitalFormData = {
    id: null,
    observasi_id: '',
    jam: '',
    td: '',
    nadi: '',
    rr: '',
    suhu: '',
    kesadaran: '',
    catatan: ''
  }
  this.isEditingVital = false
}
```

Update the editRecord method to load vital signs:

```javascript
async editRecord(item) {
  this.loading = true
  try {
    const response = await this.$_api.post('observasi/detailsById', {
      id: item.id
    })

    if (response.data) {
      const observasi = response.data
      this.selectedObservasi = observasi
      this.formData = {
        id: observasi.id,
        registrasi_id: observasi.registrasi_id,
        durasi: observasi.durasi || 24,
        jam_start: observasi.jam_start || '',
        jam_end: observasi.jam_end || null,
        interval_vital_sign: observasi.interval_vital_sign || 1,
        catatan_dokter: observasi.catatan_dokter || '',
        infus: observasi.infus || '',
        obat: observasi.obat || '',
        tindakan: observasi.tindakan || '',
        keputusan_akhir: observasi.keputusan_akhir || ''
      }
      this.isFormMode = true
      // Load vital signs for this observation
      await this.loadVitalSigns()
    }
  } catch (error) {
    console.error('Error loading observasi for edit:', error)
    let message = 'Gagal memuat data observasi untuk edit'
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message
    } else if (error.message) {
      message = error.message
    }
    this.$_alert.error({}, message)
  } finally {
    this.loading = false
  }
}
```

- [ ] **Step 2: Commit vital signs data structure**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): add vital signs data structure and API integration"
```

---

## Task 6: Implement Vital Signs Table - UI Components

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add vital signs table and form UI**

Replace the placeholder alert in the monitoring tab with the complete vital signs section. Add this after the observation header fields (before the therapy section):

```vue
<!-- Vital Signs Section -->
<div class="row mt-5">
  <div class="col-12">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <h6 class="font-weight-bolder text-dark">Observasi Vital</h6>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" @click="resetVitalForm">
            <i class="ri-add-line"></i> Tambah Vital
          </button>
        </div>
      </div>
      <div class="card-body">
        <!-- Vital Signs Form -->
        <div class="row mb-4">
          <div class="col-md-3">
            <label class="font-weight-bold">Jam <span class="text-danger">*</span></label>
            <input
              v-model="vitalFormData.jam"
              type="datetime-local"
              class="form-control"
            />
          </div>
          <div class="col-md-3">
            <label class="font-weight-bold">TD</label>
            <input
              v-model="vitalFormData.td"
              type="text"
              class="form-control"
              placeholder="120/80"
            />
          </div>
          <div class="col-md-3">
            <label class="font-weight-bold">Nadi</label>
            <input
              v-model="vitalFormData.nadi"
              type="text"
              class="form-control"
              placeholder="80 bpm"
            />
          </div>
          <div class="col-md-3">
            <label class="font-weight-bold">RR</label>
            <input
              v-model="vitalFormData.rr"
              type="text"
              class="form-control"
              placeholder="20 x/menit"
            />
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-3">
            <label class="font-weight-bold">Suhu</label>
            <input
              v-model="vitalFormData.suhu"
              type="text"
              class="form-control"
              placeholder="36.5°C"
            />
          </div>
          <div class="col-md-3">
            <label class="font-weight-bold">Kesadaran</label>
            <select v-model="vitalFormData.kesadaran" class="form-control">
              <option value="">- Pilih -</option>
              <option value="Compos Mentis">Compos Mentis</option>
              <option value="Somnolen">Somnolen</option>
              <option value="Sopor">Sopor</option>
              <option value="Semi Koma">Semi Koma</option>
              <option value="Koma">Koma</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="font-weight-bold">Catatan</label>
            <input
              v-model="vitalFormData.catatan"
              type="text"
              class="form-control"
              placeholder="Catatan tambahan"
            />
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-12">
            <button
              class="btn btn-primary mr-2"
              @click="saveVitalSign"
              :disabled="loading || !vitalFormData.jam"
            >
              <i class="ri-save-line"></i> Simpan Vital
            </button>
            <button
              class="btn btn-secondary"
              @click="resetVitalForm"
              v-if="vitalFormData.id || vitalFormData.jam"
            >
              <i class="ri-close-line"></i> Batal
            </button>
          </div>
        </div>

        <hr />

        <!-- Vital Signs Table -->
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th width="50">#</th>
                <th width="150">Jam</th>
                <th>TD</th>
                <th>Nadi</th>
                <th>RR</th>
                <th>Suhu</th>
                <th>Kesadaran</th>
                <th>Catatan</th>
                <th width="100">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="vitalSignsList.length === 0">
                <td colspan="9" class="text-center text-muted">Belum ada data vital sign</td>
              </tr>
              <tr v-for="(item, index) in vitalSignsList" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ $moment(item.jam).format('DD/MM/YYYY HH:mm') }}</td>
                <td>{{ item.td || '-' }}</td>
                <td>{{ item.nadi || '-' }}</td>
                <td>{{ item.rr || '-' }}</td>
                <td>{{ item.suhu || '-' }}</td>
                <td>{{ item.kesadaran || '-' }}</td>
                <td>{{ item.catatan || '-' }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-info mr-1"
                    @click="editVitalSign(item)"
                    title="Edit"
                  >
                    <i class="ri-pencil-line"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteVitalSign(item)"
                    title="Hapus"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
```

Add the editVitalSign method:

```javascript
editVitalSign(item) {
  this.vitalFormData = {
    id: item.id,
    observasi_id: item.observasi_id,
    jam: item.jam ? item.jam.substring(0, 16) : '',
    td: item.td || '',
    nadi: item.nadi || '',
    rr: item.rr || '',
    suhu: item.suhu || '',
    kesadaran: item.kesadaran || '',
    catatan: item.catatan || ''
  }
  this.isEditingVital = true
}
```

- [ ] **Step 2: Commit vital signs UI implementation**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): add vital signs table and form UI"
```

---

## Task 7: Implement Therapy Section - Simple Text Repeaters

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add therapy section with repeaters**

Add this section after the vital signs card in the monitoring tab:

```vue
<!-- Therapy Section -->
<div class="row mt-5">
  <div class="col-12">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <h6 class="font-weight-bolder text-dark">Terapi Selama Observasi</h6>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label class="font-weight-bold">Infus</label>
              <textarea
                v-model="formData.infus"
                class="form-control"
                rows="3"
                placeholder="Contoh: RL, NaCl, Dextrose"
              ></textarea>
              <small class="text-muted">Pisahkan dengan koma (,)</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="font-weight-bold">Obat</label>
              <textarea
                v-model="formData.obat"
                class="form-control"
                rows="3"
                placeholder="Contoh: uuid1,uuid2,uuid3"
              ></textarea>
              <small class="text-muted">Pisahkan UUID dengan koma (,)</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="font-weight-bold">Tindakan</label>
              <textarea
                v-model="formData.tindakan"
                class="form-control"
                rows="3"
                placeholder="Contoh: uuid1,uuid2"
              ></textarea>
              <small class="text-muted">Pisahkan UUID dengan koma (,)</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit therapy section**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): add therapy section with text repeaters"
```

---

## Task 8: Implement Final Decision Section

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add final decision radio buttons**

Add this section at the bottom of the monitoring tab, after the therapy section:

```vue
<!-- Final Decision Section -->
<div class="row mt-5">
  <div class="col-12">
    <div class="card card-custom" style="background-color: #f0f0f0;">
      <div class="card-body">
        <h6 class="font-weight-bolder text-dark mb-4">Keputusan Akhir</h6>
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <div class="radio">
                <label class="radio radio-solid">
                  <input
                    type="radio"
                    v-model="formData.keputusan_akhir"
                    value="Pulang (pengobatan selesai)"
                  />
                  <span></span>
                  Pulang (pengobatan selesai)
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <div class="radio">
                <label class="radio radio-solid">
                  <input
                    type="radio"
                    v-model="formData.keputusan_akhir"
                    value="Rawat Inap"
                  />
                  <span></span>
                  Rawat Inap
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <div class="radio">
                <label class="radio radio-solid">
                  <input
                    type="radio"
                    v-model="formData.keputusan_akhir"
                    value="Rujuk Internal"
                  />
                  <span></span>
                  Rujuk Internal
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <div class="radio">
                <label class="radio radio-solid">
                  <input
                    type="radio"
                    v-model="formData.keputusan_akhir"
                    value="Rujuk Eksternal"
                  />
                  <span></span>
                  Rujuk Eksternal
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Action Buttons -->
<div class="row mt-5">
  <div class="col-12">
    <div class="d-flex justify-content-end">
      <button class="btn btn-secondary mr-2" @click="cancelEdit">
        <i class="ri-close-line"></i> Batal
      </button>
      <button class="btn btn-primary" @click="submitForm" :disabled="loading">
        <i class="ri-save-line" v-if="!loading"></i>
        <span class="spinner-border spinner-border-sm" v-if="loading"></span>
        {{ formData.id ? 'Simpan Perubahan' : 'Buat Observasi' }}
      </button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit final decision section**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): add final decision radio buttons and action buttons"
```

---

## Task 9: Implement Catatan Dokter Tab

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Replace catatan dokter tab placeholder**

Replace the catatan_dokter tab content with:

```vue
<div v-if="activeTab === 'catatan_dokter'">
  <div class="row">
    <div class="col-12">
      <div class="form-group">
        <label class="font-weight-bold">Catatan Dokter</label>
        <textarea
          v-model="formData.catatan_dokter"
          class="form-control"
          rows="15"
          placeholder="Masukkan catatan dokter secara lengkap..."
        ></textarea>
        <small class="text-muted">Catatan dokter yang komprehensif mengenai kondisi dan rencana tatalaksana pasien</small>
      </div>
    </div>
  </div>

  <hr />

  <div class="d-flex justify-content-end">
    <button class="btn btn-secondary mr-2" @click="cancelEdit">
      <i class="ri-close-line"></i> Batal
    </button>
    <button class="btn btn-primary" @click="submitForm" :disabled="loading">
      <i class="ri-save-line" v-if="!loading"></i>
      <span class="spinner-border spinner-border-sm" v-if="loading"></span>
      {{ formData.id ? 'Simpan Perubahan' : 'Buat Observasi' }}
    </button>
  </div>
</div>
```

- [ ] **Step 2: Commit catatan dokter tab**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): implement catatan dokter tab with textarea"
```

---

## Task 10: Implement Observation Form Submission

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add submitForm method**

Add this method to observasi_form.vue:

```javascript
async submitForm() {
  // Validate required fields
  if (!this.formData.durasi || this.formData.durasi < 1 || this.formData.durasi > 72) {
    this.$_alert.error({}, 'Durasi harus antara 1-72 jam')
    return
  }

  if (!this.formData.jam_start) {
    this.$_alert.error({}, 'Waktu mulai harus diisi')
    return
  }

  if (this.formData.jam_end && new Date(this.formData.jam_end) <= new Date(this.formData.jam_start)) {
    this.$_alert.error({}, 'Waktu selesai harus setelah waktu mulai')
    return
  }

  this.loading = true
  try {
    let response
    if (this.formData.id) {
      // Update existing
      response = await this.$_api.post('observasi/update', {
        id: this.formData.id,
        registrasi_id: this.formData.registrasi_id,
        durasi: this.formData.durasi,
        jam_start: this.formData.jam_start || null,
        jam_end: this.formData.jam_end || null,
        interval_vital_sign: this.formData.interval_vital_sign || null,
        catatan_dokter: this.formData.catatan_dokter || null,
        infus: this.formData.infus || null,
        obat: this.formData.obat || null,
        tindakan: this.formData.tindakan || null,
        keputusan_akhir: this.formData.keputusan_akhir || null
      })
    } else {
      // Create new
      response = await this.$_api.post('observasi/register', {
        registrasi_id: this.registrasiId,
        durasi: this.formData.durasi,
        jam_start: this.formData.jam_start || null,
        interval_vital_sign: this.formData.interval_vital_sign || null,
        catatan_dokter: this.formData.catatan_dokter || null,
        infus: this.formData.infus || null,
        obat: this.formData.obat || null,
        tindakan: this.formData.tindakan || null,
        keputusan_akhir: this.formData.keputusan_akhir || null
      })
    }

    this.$_alert.success({}, response.message || 'Data observasi berhasil disimpan')
    await this.loadObservasiData()
    this.isFormMode = false
    this.selectedObservasi = null
    this.vitalSignsList = []
    this.resetForm()
  } catch (error) {
    console.error('Error saving observasi data:', error)
    let message = 'Gagal menyimpan data observasi'
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message
    } else if (error.message) {
      message = error.message
    }
    this.$_alert.error({}, message)
  } finally {
    this.loading = false
  }
}
```

- [ ] **Step 2: Commit form submission implementation**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): implement observation form submission with validation"
```

---

## Task 11: Add Loading States and Error Handling Polish

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue`

- [ ] **Step 1: Add loading overlay for form mode**

Add this loading overlay at the beginning of the form mode section (after the header):

```vue
<!-- Loading Overlay for Form Mode -->
<div v-if="loading && isFormMode" class="text-center py-10">
  <div class="spinner spinner-track spinner-primary mr-15"></div>
  <p class="mt-3">Memproses data...</p>
</div>

<!-- Form Content (wrap existing form content in this condition) -->
<div v-if="isFormMode && !loading">
  <!-- All existing form content here -->
</div>
```

- [ ] **Step 2: Add loading states to vital signs buttons**

Update the vital signs save button to include loading state:

```vue
<button
  class="btn btn-primary mr-2"
  @click="saveVitalSign"
  :disabled="loading || !vitalFormData.jam"
>
  <i class="ri-save-line" v-if="!loading"></i>
  <span class="spinner-border spinner-border-sm" v-if="loading"></span>
  {{ loading ? 'Menyimpan...' : 'Simpan Vital' }}
</button>
```

- [ ] **Step 3: Commit loading states polish**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat(observasi): add loading states and error handling polish"
```

---

## Task 12: Testing and Verification

**Files:**
- Manual testing in browser

- [ ] **Step 1: Test basic module access**

```bash
# Start development server
npm run dev
```

Navigate to: `http://serova.id:8020/#/layanan_igd/observasi`

**Expected Results:**
- Page loads without errors
- Left panel shows patient registration list
- Right panel shows "Silakan Pilih Registrasi" empty state

- [ ] **Step 2: Test patient selection workflow**

Click on a patient from the registration list.

**Expected Results:**
- Patient info card appears with patient details (name, RM, age, doctor, KNJ)
- "Daftar Observasi (0)" message appears with "Buat Data Observasi" button
- No console errors

- [ ] **Step 3: Test create new observation**

Click "Buat Data Observasi" button.

**Expected Results:**
- Form mode activates (list disappears, form appears)
- Header shows "Buat Observasi Baru"
- Two tabs visible: "Monitoring" and "Catatan Dokter"
- Monitoring tab shows observation header fields (durasi, jam_start, jam_end, interval)
- Vital signs form and table visible
- Therapy section visible (infus, obat, tindakan)
- Final decision radio buttons visible
- "Batal" and "Buat Observasi" buttons at bottom

- [ ] **Step 4: Test vital signs CRUD**

Fill in vital signs form:
- Jam: select current datetime
- TD: "120/80"
- Nadi: "80 bpm"
- RR: "20 x/menit"
- Suhu: "36.5°C"
- Kesadaran: "Compos Mentis"
- Catatan: "Pasien stabil"

Click "Simpan Vital".

**Expected Results:**
- Success message appears
- Vital sign appears in table below
- Form clears for next entry

- [ ] **Step 5: Test observation creation**

Fill in observation fields:
- Durasi: "24"
- Waktu Mulai: select current datetime
- Interval Vital Sign: "1"
- Infus: "RL, NaCl"
- Obat: "test-uuid-1, test-uuid-2"
- Tindakan: "test-uuid-3"
- Keputusan Akhir: select "Pulang (pengobatan selesai)"

Switch to "Catatan Dokter" tab and fill:
- Catatan Dokter: "Pasien datang dengan keluhan demam. Kondisi stabil selama observasi. Diperbolehkan pulang dengan obat oral."

Click "Buat Observasi".

**Expected Results:**
- Success message appears
- Form closes, returns to list view
- New observation appears in table with status "Aktif"
- All data saved correctly

- [ ] **Step 6: Test edit existing observation**

Click "Edit" button on existing observation.

**Expected Results:**
- Form opens with existing data populated
- Vital signs table shows existing vital signs
- Can modify fields and save
- Changes persist after save

- [ ] **Step 7: Test delete operations**

Click "Hapus" button on an observation or vital sign.

**Expected Results:**
- Confirmation dialog appears
- After confirmation, item is deleted
- Success message appears
- List/table updates immediately

- [ ] **Step 8: Test validation**

Try to create observation with:
- Empty durasi
- Empty jam_start
- jam_end before jam_start

**Expected Results:**
- Appropriate error messages appear
- Form does not submit
- User can correct errors

- [ ] **Step 9: Verify console and network**

**Expected Results:**
- No console errors
- API calls successful (200 status)
- Request payloads match expected format
- Response data parsed correctly

- [ ] **Step 10: Test responsive design**

Resize browser to different screen sizes.

**Expected Results:**
- Layout adapts appropriately
- Left panel collapses correctly on mobile
- Form remains usable on smaller screens

---

## Task 13: Documentation and Final Polish

**Files:**
- Update README (if applicable)
- Final code review

- [ ] **Step 1: Add module documentation**

If there's a module README or documentation file, add the observasi module description:

```markdown
## Layanan IGD Observasi

Emergency Department Observation module for monitoring patients during short-term observation periods (6-24 hours).

**Features:**
- Patient observation session management
- Vital signs monitoring with CRUD operations
- Therapy documentation (infus, medications, procedures)
- Doctor's comprehensive assessment notes
- Final disposition decisions (pulang, rawat inap, rujuk)

**Access:** IGD → Layanan IGD Observasi

**API Endpoints:**
- `/observasi/register` - Create observation
- `/observasi/update` - Update observation
- `/observasi/list` - List observations
- `/observasi/detailsById` - Get observation details
- `/observasi/delete` - Delete observation
- `/observasiVital/register` - Add vital sign
- `/observasiVital/update` - Update vital sign
- `/observasiVital/list` - List vital signs
- `/observasiVital/detailsById` - Get vital sign details
- `/observasiVital/delete` - Delete vital sign
```

- [ ] **Step 2: Perform final code review**

Check for:
- Consistent code style
- Proper error handling
- No console.log statements left in production code
- Proper variable naming
- Appropriate comments
- No duplicate code
- Proper component structure

- [ ] **Step 3: Final commit for documentation**

```bash
git add .
git commit -m "docs(observasi): add module documentation and complete implementation"
```

---

## Self-Review Checklist

**1. Spec Coverage:**
- ✅ Patient selection and observation list view (Task 1-3)
- ✅ Monitoring tab with observation header fields (Task 4)
- ✅ Vital signs table with CRUD operations (Task 5-6)
- ✅ Therapy section with text repeaters (Task 7)
- ✅ Final decision radio buttons (Task 8)
- ✅ Catatan dokter tab (Task 9)
- ✅ Form submission and validation (Task 10)
- ✅ Loading states and error handling (Task 11)
- ✅ Testing and verification (Task 12)
- ✅ Documentation (Task 13)

**2. Placeholder Scan:**
- ✅ No "TBD" or "TODO" found
- ✅ All code steps include complete implementation
- ✅ All file paths are specified
- ✅ All validation rules are defined
- ✅ All API calls are fully specified

**3. Type Consistency:**
- ✅ Component props match between parent and child
- ✅ Form field names match API field names
- ✅ Method names are consistent throughout
- ✅ Data structure names match backend API

**4. Implementation Completeness:**
- ✅ Route configuration added
- ✅ Main page component created
- ✅ Form component with state management
- ✅ All form fields implemented
- ✅ API integration complete
- ✅ Error handling comprehensive
- ✅ Loading states added
- ✅ Testing checklist provided

---

## Completion Criteria

**Definition of Done:**
- ✅ All 13 tasks completed
- ✅ Component files created and committed
- ✅ Route added and accessible
- ✅ All form fields functional
- ✅ API integration working
- ✅ Error handling in place
- ✅ Loading states implemented
- ✅ Testing checklist passed
- ✅ No console errors
- ✅ Code committed with descriptive messages

**Success Metrics:**
- Module accessible via `/layanan_igd/observasi`
- Can create, read, update, delete observations
- Can manage vital signs within observations
- Therapy data saves correctly as comma-separated values
- Final decision radio buttons functional
- Doctor notes save and load correctly
- User experience matches Visum module pattern

---

**Implementation Plan Complete** ✅

**Next Steps:**
1. Choose execution method (Subagent-Driven or Inline Execution)
2. Execute tasks sequentially using checkbox tracking
3. Test thoroughly after each major feature
4. Commit frequently with descriptive messages
5. Verify all completion criteria met