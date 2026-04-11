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
      <div v-if="isFormMode && !loading">
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
          <!-- Observation Header Fields -->
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
                        <i class="ri-save-line" v-if="!loading"></i>
                        <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                        {{ loading ? 'Menyimpan...' : 'Simpan Vital' }}
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
        </div>

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
      </div>

      <!-- Loading Overlay for Form Mode -->
      <div v-if="loading && isFormMode" class="text-center py-10">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
        <p class="mt-3">Memproses data...</p>
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
      isEditingVital: false,
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

    startCreate() {
      this.isFormMode = true
      this.selectedObservasi = null
      this.vitalSignsList = []
      this.resetForm()
    },

    switchTab(tab) {
      this.activeTab = tab
    },

    cancelEdit() {
      this.isFormMode = false
      this.selectedObservasi = null
      this.vitalSignsList = []
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
    },

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
