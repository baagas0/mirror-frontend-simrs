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
          <button class="btn btn-primary mt-3" @click="startCreate"><i class="ri-file-add-line"></i> Buat Data Observasi</button>
        </div>

        <!-- Observasi Table -->
        <div v-else>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <h6 class="font-weight-bolder text-dark">Daftar Observasi ({{ observasiList.length }})</h6>
            <button class="btn btn-primary btn-sm" @click="startCreate"><i class="ri-add-line"></i> Tambah Data</button>
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
                      {{ $moment(item.jam_start).format("DD/MM/YYYY HH:mm") }}
                    </div>
                  </td>
                  <td>
                    <div v-if="item.jam_end" class="font-weight-bolder">
                      {{ $moment(item.jam_end).format("DD/MM/YYYY HH:mm") }}
                    </div>
                    <div v-else class="text-muted">Waktu berjalan</div>
                  </td>
                  <td>{{ item.durasi || "-" }} jam</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <select
                        v-model="item.status"
                        @change="updateStatus(item)"
                        :disabled="item.updatingStatus"
                        class="form-control form-control-sm status-dropdown"
                      >
                        <option v-for="status in statusOptions" :key="status" :value="status">
                          {{ status }}
                        </option>
                      </select>
                      <span v-if="item.updatingStatus" class="spinner-border spinner-border-sm ml-2"></span>
                    </div>
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
          <h6 class="font-weight-bolder text-dark">{{ formData.id ? "Edit Observasi" : "Buat Observasi Baru" }}</h6>
          <button class="btn btn-secondary btn-sm" @click="cancelEdit"><i class="ri-close-line"></i> Batal</button>
        </div>

        <!-- Create New Form (Simple) -->
        <div v-if="!formData.id">
          <div class="card card-custom bg-light">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="font-weight-bold">Durasi (jam) <span class="text-danger">*</span></label>
                    <input v-model.number="formData.durasi" type="number" class="form-control" min="1" max="72" placeholder="24" />
                    <small class="text-muted">Durasi observasi dalam jam (1-72)</small>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="font-weight-bold">Waktu Mulai <span class="text-danger">*</span></label>
                    <input v-model="formData.jam_start" type="datetime-local" class="form-control" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="font-weight-bold">Waktu Selesai</label>
                    <input v-model="formData.jam_end" type="datetime-local" class="form-control" />
                    <small class="text-muted">Opsional, isi saat observasi selesai</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="font-weight-bold">Interval Vital Sign</label>
                    <input v-model.number="formData.interval_vital_sign" type="number" class="form-control" min="1" placeholder="1" />
                    <small class="text-muted">Interval pencatatan vital sign (jam)</small>
                  </div>
                </div>
              </div>
              <hr />
              <div class="alert alert-info">
                <i class="ri-information-line"></i>
                Data lainnya (infus, obat, tindakan, vital sign, catatan dokter, keputusan akhir) dapat diupdate setelah observasi dibuat melalui tombol Edit.
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-secondary mr-2" @click="cancelEdit"><i class="ri-close-line"></i> Batal</button>
                <button class="btn btn-primary" @click="submitForm" :disabled="loading">
                  <i class="ri-save-line" v-if="!loading"></i>
                  <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                  {{ loading ? "Menyimpan..." : "Buat Observasi" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Form (Complete with Tabs) -->
        <div v-if="formData.id">
          <!-- Tabs -->
          <ul class="nav nav-tabs nav-tabs-line mb-5">
            <li class="nav-item">
              <a class="nav-link pointer" @click="switchTab('monitoring')" :class="{ active: activeTab === 'monitoring' }">
                <span class="nav-icon"><i class="flaticon2-dashboard"></i></span>
                <span class="nav-text">Monitoring</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link pointer" @click="switchTab('implementasi_keperawatan')" :class="{ active: activeTab === 'implementasi_keperawatan' }">
                <span class="nav-icon"><i class="flaticon2-nurse"></i></span>
                <span class="nav-text">Implementasi Keperawatan</span>
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
                  <input v-model.number="formData.durasi" type="number" class="form-control" min="1" max="72" placeholder="24" />
                  <small class="text-muted">Durasi observasi dalam jam (1-72)</small>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="font-weight-bold">Waktu Mulai <span class="text-danger">*</span></label>
                  <input v-model="formData.jam_start" type="datetime-local" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="font-weight-bold">Waktu Selesai</label>
                  <input v-model="formData.jam_end" type="datetime-local" class="form-control" />
                  <small class="text-muted">Opsional, isi saat observasi selesai</small>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Interval Vital Sign</label>
                  <input v-model.number="formData.interval_vital_sign" type="number" class="form-control" min="1" placeholder="1" />
                  <small class="text-muted">Interval pencatatan vital sign (jam)</small>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Status Observasi <span class="text-danger">*</span></label>
                  <select v-model="formData.status" class="form-control">
                    <option value="">- Pilih Status -</option>
                    <option v-for="status in statusOptions" :key="status" :value="status">
                      {{ status }}
                    </option>
                  </select>
                  <small class="text-muted">Status observasi saat ini</small>
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
                    <div class="d-flex justify-content-end align-items-center">
                      <button class="btn btn-primary btn-sm" @click="resetVitalForm"><i class="ri-add-line"></i> Tambah Vital</button>
                    </div>
                  </div>
                  <div class="card-body">
                    <!-- Vital Signs Form -->
                    <div class="row mb-4">
                      <div class="col-md-3">
                        <label class="font-weight-bold">Jam <span class="text-danger">*</span></label>
                        <input v-model="vitalFormData.jam" type="datetime-local" class="form-control" />
                      </div>
                      <div class="col-md-3">
                        <label class="font-weight-bold">TD</label>
                        <input v-model="vitalFormData.td" type="text" class="form-control" placeholder="120/80" />
                      </div>
                      <div class="col-md-3">
                        <label class="font-weight-bold">Nadi</label>
                        <input v-model="vitalFormData.nadi" type="text" class="form-control" placeholder="80 bpm" />
                      </div>
                      <div class="col-md-3">
                        <label class="font-weight-bold">RR</label>
                        <input v-model="vitalFormData.rr" type="text" class="form-control" placeholder="20 x/menit" />
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col-md-3">
                        <label class="font-weight-bold">Suhu</label>
                        <input v-model="vitalFormData.suhu" type="text" class="form-control" placeholder="36.5°C" />
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
                        <input v-model="vitalFormData.catatan" type="text" class="form-control" placeholder="Catatan tambahan" />
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col-12">
                        <button class="btn btn-primary mr-2" @click="saveVitalSign" :disabled="loading || !vitalFormData.jam">
                          <i class="ri-save-line" v-if="!loading"></i>
                          <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                          {{ loading ? "Menyimpan..." : "Simpan Vital" }}
                        </button>
                        <button class="btn btn-secondary" @click="resetVitalForm" v-if="vitalFormData.id || vitalFormData.jam"><i class="ri-close-line"></i> Batal</button>
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
                            <td>{{ $moment(item.jam).format("DD/MM/YYYY HH:mm") }}</td>
                            <td>{{ item.td || "-" }}</td>
                            <td>{{ item.nadi || "-" }}</td>
                            <td>{{ item.rr || "-" }}</td>
                            <td>{{ item.suhu || "-" }}</td>
                            <td>{{ item.kesadaran || "-" }}</td>
                            <td>{{ item.catatan || "-" }}</td>
                            <td>
                              <button class="btn btn-sm btn-info mr-1" @click="editVitalSign(item)" title="Edit">
                                <i class="ri-pencil-line"></i>
                              </button>
                              <button class="btn btn-sm btn-danger" @click="deleteVitalSign(item)" title="Hapus">
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
                      <!-- Infus Repeater -->
                      <div class="col-md-4">
                        <label class="font-weight-bold mb-3">Infus</label>
                        <div class="card card-custom bg-light">
                          <div class="card-body">
                            <!-- Infus Input Form -->
                            <div class="form-group mb-3">
                              <input v-model="infusInput" type="text" class="form-control" placeholder="Contoh: RL, NaCl, Dextrose" @keyup.enter="addInfus" />
                            </div>
                            <button class="btn btn-sm btn-primary mb-3" @click="addInfus" :disabled="!infusInput.trim()"><i class="ri-add-line"></i> Tambah</button>

                            <!-- Infus List -->
                            <div v-if="infusList.length > 0" class="mt-3">
                              <div class="mb-2" style="max-height: 150px; overflow-y: auto">
                                <div v-for="(item, index) in infusList" :key="'infus-' + index" class="d-flex align-items-center mb-2">
                                  <span class="flex-grow-1">{{ item }}</span>
                                  <button class="btn btn-sm btn-danger" @click="removeInfus(index)">
                                    <i class="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div v-else class="text-muted text-center py-2">
                              <small>Belum ada data infus</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Obat Repeater -->
                      <div class="col-md-4">
                        <label class="font-weight-bold mb-3">Obat</label>
                        <div class="card card-custom bg-light">
                          <div class="card-body">
                            <!-- Obat Input Form -->
                            <div class="form-group mb-3">
                              <s-input
                                v-model="obatInput"
                                :key="'obat_input'"
                                :id="'obat_input'"
                                :item="{
                                  label: '',
                                  id: 'obat_input',
                                  data: 'obat_input',
                                  type: 'lookup-radio',
                                  validation: [],
                                  value: obatInput,
                                  api: 'msBarang',
                                  return_object: true,
                                  pointer: {
                                    label: 'nama_barang',
                                    code: 'ms_barang_id',
                                    display: ['nama_barang'],
                                  },
                                  param: {
                                    type: 'OBAT',
                                  },
                                }"
                                :valuee="obatInput" />
                            </div>
                            <button class="btn btn-sm btn-primary mb-3" @click="addObat" :disabled="!obatInput || !obatInput.ms_barang_id"><i class="ri-add-line"></i> Tambah</button>

                            <!-- Obat List -->
                            <div v-if="obatList.length > 0" class="mt-3">
                              <div class="mb-2" style="max-height: 150px; overflow-y: auto">
                                <div v-for="(item, index) in obatList" :key="'obat-' + index" class="d-flex align-items-center mb-2">
                                  <span class="flex-grow-1">{{ item.nama_barang }}</span>
                                  <button class="btn btn-sm btn-danger" @click="removeObat(index)">
                                    <i class="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div v-else class="text-muted text-center py-2">
                              <small>Belum ada data obat</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Tindakan Repeater -->
                      <div class="col-md-4">
                        <label class="font-weight-bold mb-3">Tindakan</label>
                        <div class="card card-custom bg-light">
                          <div class="card-body">
                            <!-- Tindakan Input Form -->
                            <div class="form-group mb-3">
                              <s-input
                                v-model="tindakanInput"
                                :key="'tindakan_input'"
                                :id="'tindakan_input'"
                                :item="{
                                  label: '',
                                  id: 'tindakan_input',
                                  data: 'tindakan_input',
                                  type: 'lookup-radio',
                                  validation: [],
                                  value: tindakanInput,
                                  api: 'msJasa',
                                  return_object: true,
                                  pointer: {
                                    label: 'nama_jasa',
                                    code: 'ms_jasa_id',
                                    display: ['nama_jasa'],
                                  },
                                  param: {},
                                }"
                                :valuee="tindakanInput" />
                            </div>
                            <button class="btn btn-sm btn-primary mb-3" @click="addTindakan" :disabled="!tindakanInput || !tindakanInput.ms_jasa_id"><i class="ri-add-line"></i> Tambah</button>

                            <!-- Tindakan List -->
                            <div v-if="tindakanList.length > 0" class="mt-3">
                              <div class="mb-2" style="max-height: 150px; overflow-y: auto">
                                <div v-for="(item, index) in tindakanList" :key="'tindakan-' + index" class="d-flex align-items-center mb-2">
                                  <span class="flex-grow-1">{{ item.nama_jasa }}</span>
                                  <button class="btn btn-sm btn-danger" @click="removeTindakan(index)">
                                    <i class="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div v-else class="text-muted text-center py-2">
                              <small>Belum ada data tindakan</small>
                            </div>
                          </div>
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
                <div class="card card-custom" style="background-color: #ffffff">
                  <div class="card-body">
                    <h6 class="font-weight-bolder text-dark mb-4">Keputusan Akhir</h6>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <div class="radio">
                            <label class="radio radio-solid">
                              <input type="radio" v-model="formData.keputusan_akhir" value="Pulang (pengobatan selesai)" />
                              <span></span>
                              &ensp;Pulang (pengobatan selesai)
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <div class="radio">
                            <label class="radio radio-solid">
                              <input type="radio" v-model="formData.keputusan_akhir" value="Rawat Inap" />
                              <span></span>
                              &ensp;Rawat Inap
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <div class="radio">
                            <label class="radio radio-solid">
                              <input type="radio" v-model="formData.keputusan_akhir" value="Rujuk Internal" />
                              <span></span>
                              &ensp;Rujuk Internal
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <div class="radio">
                            <label class="radio radio-solid">
                              <input type="radio" v-model="formData.keputusan_akhir" value="Rujuk Eksternal" />
                              <span></span>
                              &ensp;Rujuk Eksternal
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
                  <button class="btn btn-secondary mr-2" @click="cancelEdit"><i class="ri-close-line"></i> Batal</button>
                  <button class="btn btn-primary" @click="submitForm" :disabled="loading">
                    <i class="ri-save-line" v-if="!loading"></i>
                    <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                    {{ formData.id ? "Simpan Perubahan" : "Buat Observasi" }}
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
                  <textarea v-model="formData.catatan_dokter" class="form-control" rows="15" placeholder="Masukkan catatan dokter secara lengkap..."></textarea>
                  <small class="text-muted">Catatan dokter yang komprehensif mengenai kondisi dan rencana tatalaksana pasien</small>
                </div>
              </div>
            </div>

            <hr />

            <div class="d-flex justify-content-end">
              <button class="btn btn-secondary mr-2" @click="cancelEdit"><i class="ri-close-line"></i> Batal</button>
              <button class="btn btn-primary" @click="submitForm" :disabled="loading">
                <i class="ri-save-line" v-if="!loading"></i>
                <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                {{ formData.id ? "Simpan Perubahan" : "Buat Observasi" }}
              </button>
            </div>
          </div>

          <div v-if="activeTab === 'implementasi_keperawatan'">
            <div class="row">
              <!-- Left Panel: Implementasi List -->
              <div class="col-md-6">
                <div class="card card-custom">
                  <div class="card-header">
                    <div class="card-title">
                      <h6 class="font-weight-bolder text-dark">Daftar Implementasi ({{ implementasiList.length }})</h6>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                      <button class="btn btn-primary btn-sm" @click="showImplementasiModal()" :disabled="!selectedObservasi || !selectedObservasi.id"><i class="ri-add-line"></i> Tambah Implementasi</button>
                    </div>
                  </div>
                  <div class="card-body">
                    <!-- Loading State -->
                    <div v-if="implementasiLoading" class="text-center py-5">
                      <div class="spinner spinner-track spinner-primary mr-15"></div>
                      <p class="mt-3">Memuat data...</p>
                    </div>

                    <div v-else-if="!selectedObservasi || !selectedObservasi.id" class="text-center py-5">
                      <i class="ri-save-line" style="font-size: 48px; color: #ccc"></i>
                      <p class="text-muted mt-3">Simpan observasi terlebih dahulu untuk menambah implementasi</p>
                    </div>

                    <!-- Empty State -->
                    <div v-else-if="implementasiList.length === 0" class="text-center py-5">
                      <i class="ri-task-line" style="font-size: 48px; color: #ccc"></i>
                      <p class="text-muted mt-3">Belum ada data implementasi</p>
                    </div>

                    <!-- Implementasi List -->
                    <div v-else class="implementasi-list">
                      <div v-for="item in implementasiList" :key="item.id" class="implementasi-item mb-3 p-3 border rounded" :class="{ 'active-implementasi': selectedImplementasi && selectedImplementasi.id === item.id }" @click="selectImplementasi(item)" style="cursor: pointer; transition: all 0.2s">
                        <div class="d-flex justify-content-between align-items-start">
                          <div class="flex-grow-1">
                            <div class="font-weight-bolder text-dark mb-1">
                              {{ item.jenis_implementasi || "Implementasi Keperawatan" }}
                            </div>
                            <div class="text-muted small mb-2">
                              <i class="ri-stethoscope-line"></i>
                              {{ getDiagnosaName(item) || "-" }}
                            </div>
                            <div v-if="item.respon_pasien" class="mb-1">
                              <span class="badge badge-info">Respon:</span>
                              <span class="ml-1">{{ item.respon_pasien }}</span>
                            </div>
                            <div v-if="item.implementasi" class="text-muted small mt-2"><i class="ri-file-text-line"></i> {{ item.implementasi.substring(0, 120) }}{{ item.implementasi.length > 120 ? "..." : "" }}</div>
                          </div>
                          <div class="ml-2">
                            <span class="badge badge-primary">
                              {{ Array.isArray(item.evaluasi) ? item.evaluasi.length : 0 }} Evaluasi
                            </span>
                          </div>
                        </div>
                        <div class="mt-2 d-flex justify-content-end">
                          <button class="btn btn-sm btn-info mr-1" @click.stop="editImplementasi(item)" title="Edit">
                            <i class="ri-pencil-line"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click.stop="confirmDeleteImplementasi(item)" title="Hapus">
                            <i class="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Panel: Implementasi -->
              <div class="col-md-6">
                <div class="card card-custom">
                  <div class="card-header">
                    <div class="card-title">
                      <h6 class="font-weight-bolder text-dark">
                        Evaluasi Keperawatan
                        <span v-if="selectedImplementasi" class="text-muted">({{ selectedImplementasi.jenis_implementasi || "Implementasi Terpilih" }})</span>
                        <span v-else class="text-muted">( Pilih implementasi terlebih dahulu )</span>
                      </h6>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                      <button class="btn btn-primary btn-sm" @click="showEvaluasiModal()" :disabled="!selectedImplementasi"><i class="ri-add-line"></i> Tambah Evaluasi</button>
                    </div>
                  </div>
                  <div class="card-body">
                    <!-- Empty State - No Implementasi Selected -->
                    <div v-if="!selectedImplementasi" class="text-center py-5">
                      <i class="ri-cursor-line" style="font-size: 48px; color: #ccc"></i>
                      <p class="text-muted mt-3">Pilih implementasi dari daftar di sebelah kiri</p>
                    </div>

                    <!-- Loading State -->
                    <div v-else-if="evaluasiLoading" class="text-center py-5">
                      <div class="spinner spinner-track spinner-primary mr-15"></div>
                      <p class="mt-3">Memuat data...</p>
                    </div>

                    <div v-else>
                      <div class="selected-implementasi mb-4 p-3 border rounded bg-light">
                        <div class="mb-2">
                          <span class="badge badge-primary">Jenis:</span>
                          <span class="ml-1 font-weight-bold">{{ selectedImplementasi.jenis_implementasi || "-" }}</span>
                        </div>
                        <div v-if="getDiagnosaName(selectedImplementasi)" class="mb-2">
                          <span class="badge badge-secondary">Diagnosa:</span>
                          <span class="ml-1">{{ getDiagnosaName(selectedImplementasi) }}</span>
                        </div>
                        <div v-if="selectedImplementasi.respon_pasien" class="mb-2">
                          <div class="font-weight-bold">Respon Pasien:</div>
                          <div class="text-muted">{{ selectedImplementasi.respon_pasien }}</div>
                        </div>
                        <div v-if="selectedImplementasi.implementasi" class="mb-0">
                          <div class="font-weight-bold">Implementasi:</div>
                          <div class="text-muted">{{ selectedImplementasi.implementasi }}</div>
                        </div>
                      </div>

                      <div v-if="evaluasiList.length === 0" class="text-center py-5">
                        <i class="ri-clipboard-line" style="font-size: 48px; color: #ccc"></i>
                        <p class="text-muted mt-3">Belum ada data evaluasi untuk implementasi ini</p>
                      </div>

                      <div v-else class="evaluasi-list">
                        <div v-for="item in evaluasiList" :key="item.id" class="evaluasi-child-item mb-3 p-3 border rounded bg-white">
                          <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                              <div class="font-weight-bolder text-dark mb-1">
                                {{ item.waktu_evaluasi ? $moment(item.waktu_evaluasi).format("DD/MM/YYYY HH:mm") : "-" }}
                              </div>
                              <div class="text-muted small mb-2"><i class="ri-user-nurse-line"></i> {{ getEvaluasiPerawatName(item) }}</div>
                              <div v-if="item.tindak_lanjut" class="mb-1">
                                <span class="badge badge-info">Tindak Lanjut:</span>
                                <span class="ml-1">{{ item.tindak_lanjut }}</span>
                              </div>
                              <div v-if="item.catatan" class="text-muted small mt-2"><i class="ri-file-text-line"></i> {{ item.catatan.substring(0, 120) }}{{ item.catatan.length > 120 ? "..." : "" }}</div>
                            </div>
                            <div class="ml-2">
                              <span class="badge" :class="item.status === 'aktif' ? 'badge-success' : 'badge-secondary'">
                                {{ item.status === "aktif" ? "Aktif" : "Non-Aktif" }}
                              </span>
                            </div>
                          </div>
                          <div class="mt-2 d-flex justify-content-end">
                            <button class="btn btn-sm btn-info mr-1" @click="editEvaluasi(item)" title="Edit">
                              <i class="ri-pencil-line"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" @click="confirmDeleteEvaluasi(item)" title="Hapus">
                              <i class="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div class="d-flex justify-content-end">
              <button class="btn btn-secondary mr-2" @click="cancelEdit"><i class="ri-close-line"></i> Batal</button>
              <button class="btn btn-primary" @click="submitForm" :disabled="loading">
                <i class="ri-save-line" v-if="!loading"></i>
                <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                {{ formData.id ? "Simpan Perubahan" : "Buat Observasi" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay for Form Mode -->
      <div v-if="loading && isFormMode" class="text-center py-10">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
        <p class="mt-3">Memproses data...</p>
      </div>

      <!-- Evaluasi Modal -->
      <b-modal ref="evaluasiModal" id="evaluasiModal" size="lg" :title="evaluasiFormData.id ? 'Edit Evaluasi' : 'Tambah Evaluasi'" hide-footer>
        <div class="form-group">
          <label class="font-weight-bold">Perawat <span class="text-danger">*</span></label>
          <s-input
            v-model="evaluasiFormData.perawat"
            :key="'evaluasi_perawat'"
            :id="'evaluasi_perawat'"
            :item="{
              label: '',
              id: 'evaluasi_perawat',
              data: 'evaluasi_perawat',
              type: 'lookup-radio',
              validation: [],
              value: evaluasiFormData.perawat,
              api: 'msDokter',
              return_object: true,
              pointer: {
                label: 'nama_dokter',
                code: 'ms_dokter_id',
                display: ['nama_dokter'],
              },
              param: {
                type: 'PERAWAT',
              },
            }"
            :valuee="evaluasiFormData.perawat" />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Waktu Evaluasi <span class="text-danger">*</span></label>
          <input v-model="evaluasiFormData.waktu_evaluasi" type="datetime-local" class="form-control" />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Tindak Lanjut</label>
          <input v-model="evaluasiFormData.tindak_lanjut" type="text" class="form-control" placeholder="Tindak lanjut evaluasi" />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Catatan</label>
          <textarea v-model="evaluasiFormData.catatan" class="form-control" rows="5" placeholder="Catatan evaluasi"></textarea>
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Status</label>
          <select v-model="evaluasiFormData.status" class="form-control">
            <option value="aktif">Aktif</option>
            <option value="non-aktif">Non-Aktif</option>
          </select>
        </div>

        <hr />
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary mr-2" @click="closeEvaluasiModal()"><i class="ri-close-line"></i> Batal</button>
          <button class="btn btn-primary" @click="saveEvaluasi" :disabled="loading || evaluasiSaving">
            <i class="ri-save-line" v-if="!loading && !evaluasiSaving"></i>
            <span class="spinner-border spinner-border-sm" v-if="loading || evaluasiSaving"></span>
            {{ evaluasiSaving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </b-modal>

      <!-- Implementasi Modal -->
      <b-modal ref="implementasiModal" id="implementasiModal" size="lg" :title="implementasiFormData.id ? 'Edit Implementasi' : 'Tambah Implementasi'" hide-footer>
        <div class="form-group">
          <label class="font-weight-bold">Diagnosa</label>
          <s-input
            v-model="implementasiFormData.diagnosa"
            :key="'implementasi_diagnosa'"
            :id="'implementasi_diagnosa'"
            :item="{
              label: '',
              id: 'implementasi_diagnosa',
              data: 'implementasi_diagnosa',
              type: 'lookup-radio',
              validation: [],
              api: 'ms_diagnosa',
              return_object: true,
              pointer: {
                label: 'nama_diagnosa',
                code: 'id',
                display: ['nama_diagnosa'],
              },
              param: {},
            }"
            :valuee="implementasiFormData.diagnosa" />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Jenis Implementasi</label>
          <input v-model="implementasiFormData.jenis_implementasi" type="text" class="form-control" placeholder="Contoh: Pemberian obat, Perawatan luka, dll" />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Respon Pasien</label>
          <input v-model="implementasiFormData.respon_pasien" type="text" class="form-control" placeholder="Respon pasien terhadap tindakan" />
        </div>

        <div class="form-group">
          <label class="font-weight-bold">Implementasi</label>
          <textarea v-model="implementasiFormData.implementasi" class="form-control" rows="8" placeholder="Detail implementasi keperawatan"></textarea>
        </div>

        <hr />
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary mr-2" @click="closeImplementasiModal()"><i class="ri-close-line"></i> Batal</button>
          <button class="btn btn-primary" @click="saveImplementasi" :disabled="loading || implementasiSaving">
            <i class="ri-save-line" v-if="!loading && !implementasiSaving"></i>
            <span class="spinner-border spinner-border-sm" v-if="loading || implementasiSaving"></span>
            {{ implementasiSaving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObservasiForm",
  props: {
    dataRegistrasi: {
      type: Object,
      required: true,
    },
    registrasiId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      isFormMode: false,
      activeTab: "monitoring",
      observasiList: [],
      selectedObservasi: null,
      vitalSignsList: [],
      statusOptions: [
        'Belum Selesai',
        'Berjalan',
        'Perlu Evaluasi',
        'Selesai'
      ],
      vitalFormData: {
        id: null,
        observasi_id: "",
        jam: "",
        td: "",
        nadi: "",
        rr: "",
        suhu: "",
        kesadaran: "",
        catatan: "",
      },
      isEditingVital: false,
      formData: {
        id: null,
        registrasi_id: this.registrasiId,
        durasi: 3,
        jam_start: "",
        jam_end: null,
        interval_vital_sign: 1,
        catatan_dokter: "",
        infus: "",
        obat: "",
        tindakan: "",
        keputusan_akhir: "",
        status: "Belum Selesai",
      },
      // Therapy repeater data
      infusInput: "",
      infusList: [],
      obatInput: null,
      obatList: [],
      tindakanInput: null,
      tindakanList: [],
      // Evaluasi data
      evaluasiList: [],
      evaluasiLoading: false,
      evaluasiSaving: false,
      selectedImplementasi: null,
      evaluasiFormData: {
        id: null,
        observasi_evaluasi_implementasi_id: "",
        perawat_id: "",
        perawat: null,
        waktu_evaluasi: "",
        tindak_lanjut: "",
        catatan: "",
        status: "aktif",
      },
      // Implementasi data
      implementasiList: [],
      implementasiLoading: false,
      implementasiSaving: false,
      implementasiFormData: {
        id: null,
        observasi_id: "",
        ms_diagnosa_id: "",
        diagnosa: null,
        jenis_implementasi: "",
        respon_pasien: "",
        implementasi: "",
      },
    };
  },
  watch: {
    registrasiId(newVal) {
      if (newVal) {
        this.loadObservasiData();
      }
    },
  },
  mounted() {
    this.loadObservasiData();
  },
  methods: {
    async loadObservasiData() {
      if (!this.registrasiId) return;

      this.loading = true;
      try {
        const response = await this.$_api.post("observasi/list", {
          registrasi_id: this.registrasiId,
          halaman: 1,
          jumlah: 999,
        });

        if (response.data) {
          this.observasiList = response.data;
        } else {
          this.observasiList = [];
        }
      } catch (error) {
        console.error("Error loading observasi data:", error);
        let message = "Gagal memuat data observasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.loading = false;
      }
    },

    async loadVitalSigns() {
      if (!this.selectedObservasi || !this.selectedObservasi.id) return;

      try {
        const response = await this.$_api.post("observasiVital/list", {
          observasi_id: this.selectedObservasi.id,
          halaman: 1,
          jumlah: 999,
        });

        if (response.data) {
          this.vitalSignsList = response.data;
        } else {
          this.vitalSignsList = [];
        }
      } catch (error) {
        console.error("Error loading vital signs:", error);
        this.$_alert.error({}, "Gagal memuat data vital sign");
      }
    },

    async updateStatus(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, "Tidak ada data untuk diperbarui");
        return;
      }

      // Store previous value for rollback
      const previousStatus = item.status;
      item.updatingStatus = true;

      try {
        const response = await this.$_api.post("observasi/updateStatus", {
          id: item.id,
          status: item.status
        });

        this.$_alert.success({}, response.message || "Status berhasil diperbarui");

        // Refresh list to get updated data
        await this.loadObservasiData();
      } catch (error) {
        console.error("Error updating status:", error);

        // Rollback to previous value
        item.status = previousStatus;

        let message = "Gagal memperbarui status";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }

        this.$_alert.error({}, message);
      } finally {
        item.updatingStatus = false;
      }
    },

    startCreate() {
      this.isFormMode = true;
      this.selectedObservasi = null;
      this.vitalSignsList = [];
      this.resetForm();
      this.resetTherapyLists();
      this.resetImplementasiEvaluasiState();
    },

    switchTab(tab) {
      this.activeTab = tab;
    },

    cancelEdit() {
      this.isFormMode = false;
      this.selectedObservasi = null;
      this.vitalSignsList = [];
      this.resetForm();
      this.resetTherapyLists();
      this.resetImplementasiEvaluasiState();
    },

    async editRecord(item) {
      this.loading = true;
      try {
        const response = await this.$_api.post("observasi/detailsById", {
          id: item.id,
        });

        if (response.data) {
          const observasi = response.data;
          this.selectedObservasi = observasi;
          this.formData = {
            id: observasi.id,
            registrasi_id: observasi.registrasi_id,
            durasi: observasi.durasi || 24,
            jam_start: (observasi.jam_start || "").replace(":00.000Z", ""),
            jam_end: (observasi.jam_end || "").replace(":00.000Z", ""),
            interval_vital_sign: observasi.interval_vital_sign || 1,
            catatan_dokter: observasi.catatan_dokter || "",
            infus: observasi.infus || "",
            obat: observasi.obat || "",
            tindakan: observasi.tindakan || "",
            keputusan_akhir: observasi.keputusan_akhir || "",
            status: observasi.status || "Belum Selesai",
          };
          this.isFormMode = true;
          // Load vital signs for this observation
          await this.loadVitalSigns();
          // Parse therapy data from backend
          await this.parseTherapyFromBackend(observasi.infus, observasi.obat, observasi.tindakan);
          // Load implementasi dan evaluasi child
          await this.loadImplementasiList();
        }
      } catch (error) {
        console.error("Error loading observasi for edit:", error);
        let message = "Gagal memuat data observasi untuk edit";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.loading = false;
      }
    },

    async confirmDelete(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, "Tidak ada data untuk dihapus");
        return;
      }

      this.$_alert.confirm({ title: "Hapus Data Observasi", text: "Apakah Anda yakin ingin menghapus data observasi ini?" }, async () => {
        await this.deleteObservasi(item);
      });
    },

    async deleteObservasi(item) {
      this.loading = true;
      try {
        await this.$_api.post("observasi/delete", {
          id: item.id,
        });

        this.$_alert.success({}, "Data observasi berhasil dihapus");
        await this.loadObservasiData();
      } catch (error) {
        console.error("Error deleting observasi data:", error);
        let message = "Gagal menghapus data observasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.loading = false;
      }
    },

    async saveVitalSign() {
      this.loading = true;
      try {
        let response;
        if (this.vitalFormData.id) {
          response = await this.$_api.post("observasiVital/update", {
            id: this.vitalFormData.id,
            observasi_id: this.selectedObservasi.id,
            jam: this.vitalFormData.jam || null,
            td: this.vitalFormData.td || null,
            nadi: this.vitalFormData.nadi || null,
            rr: this.vitalFormData.rr || null,
            suhu: this.vitalFormData.suhu || null,
            kesadaran: this.vitalFormData.kesadaran || null,
            catatan: this.vitalFormData.catatan || null,
          });
        } else {
          response = await this.$_api.post("observasiVital/register", {
            observasi_id: this.selectedObservasi.id,
            jam: this.vitalFormData.jam || null,
            td: this.vitalFormData.td || null,
            nadi: this.vitalFormData.nadi || null,
            rr: this.vitalFormData.rr || null,
            suhu: this.vitalFormData.suhu || null,
            kesadaran: this.vitalFormData.kesadaran || null,
            catatan: this.vitalFormData.catatan || null,
          });
        }

        this.$_alert.success({}, response.message || "Data vital berhasil disimpan");
        await this.loadVitalSigns();
        this.resetVitalForm();
      } catch (error) {
        console.error("Error saving vital sign:", error);
        let message = "Gagal menyimpan data vital";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.loading = false;
      }
    },

    editVitalSign(item) {
      this.vitalFormData = {
        id: item.id,
        observasi_id: item.observasi_id,
        jam: item.jam ? item.jam.substring(0, 16) : "",
        td: item.td || "",
        nadi: item.nadi || "",
        rr: item.rr || "",
        suhu: item.suhu || "",
        kesadaran: item.kesadaran || "",
        catatan: item.catatan || "",
      };
      this.isEditingVital = true;
    },

    async deleteVitalSign(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, "Tidak ada data untuk dihapus");
        return;
      }

      this.$_alert.confirm({ title: "Hapus Data Vital", text: "Apakah Anda yakin ingin menghapus data vital ini?" }, async () => {
        try {
          await this.$_api.post("observasiVital/delete", {
            id: item.id,
          });

          this.$_alert.success({}, "Data vital berhasil dihapus");
          await this.loadVitalSigns();
        } catch (error) {
          console.error("Error deleting vital sign:", error);
          this.$_alert.error({}, "Gagal menghapus data vital");
        }
      });
    },

    resetVitalForm() {
      this.vitalFormData = {
        id: null,
        observasi_id: "",
        jam: "",
        td: "",
        nadi: "",
        rr: "",
        suhu: "",
        kesadaran: "",
        catatan: "",
      };
      this.isEditingVital = false;
    },

    // Therapy repeater methods
    addInfus() {
      if (this.infusInput && this.infusInput.trim()) {
        this.infusList.push(this.infusInput.trim());
        this.infusInput = "";
        this.updateFormDataFromLists();
      }
    },

    removeInfus(index) {
      this.infusList.splice(index, 1);
      this.updateFormDataFromLists();
    },

    async addObat() {
      if (this.obatInput && this.obatInput.ms_barang_id) {
        // Check if already exists
        const exists = this.obatList.find((item) => item.ms_barang_id === this.obatInput.ms_barang_id);
        if (!exists) {
          this.obatList.push({ ...this.obatInput });
          this.obatInput = null;
          this.updateFormDataFromLists();
        } else {
          this.$_alert.error({}, "Obat sudah ada dalam daftar");
        }
      }
    },

    removeObat(index) {
      this.obatList.splice(index, 1);
      this.updateFormDataFromLists();
    },

    async addTindakan() {
      if (this.tindakanInput && this.tindakanInput.ms_jasa_id) {
        // Check if already exists
        const exists = this.tindakanList.find((item) => item.ms_jasa_id === this.tindakanInput.ms_jasa_id);
        if (!exists) {
          this.tindakanList.push({ ...this.tindakanInput });
          this.tindakanInput = null;
          this.updateFormDataFromLists();
        } else {
          this.$_alert.error({}, "Tindakan sudah ada dalam daftar");
        }
      }
    },

    removeTindakan(index) {
      this.tindakanList.splice(index, 1);
      this.updateFormDataFromLists();
    },

    updateFormDataFromLists() {
      // Convert arrays to comma-separated strings
      this.formData.infus = this.infusList.join(",");
      this.formData.obat = this.obatList.map((item) => item.ms_barang_id).join(",");
      this.formData.tindakan = this.tindakanList.map((item) => item.ms_jasa_id).join(",");
    },

    async parseTherapyFromBackend(infusStr, obatStr, tindakanStr) {
      // Parse infus (simple comma-separated text)
      if (infusStr && infusStr.trim()) {
        this.infusList = infusStr
          .split(",")
          .filter((item) => item.trim())
          .map((item) => item.trim());
      } else {
        this.infusList = [];
      }

      // Parse obat (comma-separated IDs) - need to fetch details
      if (obatStr && obatStr.trim()) {
        const obatIds = obatStr.split(",").filter((id) => id.trim());
        if (obatIds.length > 0) {
          try {
            const response = await this.$_api.post("msBarang/list", {
              ms_barang_ids: obatIds.join(","),
              halaman: 1,
              jumlah: 999,
            });
            if (response.data && response.data.length > 0) {
              this.obatList = response.data;
            } else {
              this.obatList = [];
            }
          } catch (error) {
            console.error("Error loading obat details:", error);
            this.obatList = [];
          }
        } else {
          this.obatList = [];
        }
      } else {
        this.obatList = [];
      }

      // Parse tindakan (comma-separated IDs) - need to fetch details
      if (tindakanStr && tindakanStr.trim()) {
        const tindakanIds = tindakanStr.split(",").filter((id) => id.trim());
        if (tindakanIds.length > 0) {
          try {
            const response = await this.$_api.post("msJasa/list", {
              ms_jasa_ids: tindakanIds.join(","),
              halaman: 1,
              jumlah: 999,
            });
            if (response.data && response.data.length > 0) {
              this.tindakanList = response.data;
            } else {
              this.tindakanList = [];
            }
          } catch (error) {
            console.error("Error loading tindakan details:", error);
            this.tindakanList = [];
          }
        } else {
          this.tindakanList = [];
        }
      } else {
        this.tindakanList = [];
      }
    },

    resetTherapyLists() {
      this.infusList = [];
      this.obatList = [];
      this.tindakanList = [];
      this.infusInput = "";
      this.obatInput = null;
      this.tindakanInput = null;
    },

    async submitForm() {
      // Validate required fields
      if (!this.formData.durasi || this.formData.durasi < 1 || this.formData.durasi > 72) {
        this.$_alert.error({}, "Durasi harus antara 1-72 jam");
        return;
      }

      if (!this.formData.jam_start) {
        this.$_alert.error({}, "Waktu mulai harus diisi");
        return;
      }

      if (this.formData.jam_end && new Date(this.formData.jam_end) <= new Date(this.formData.jam_start)) {
        this.$_alert.error({}, "Waktu selesai harus setelah waktu mulai");
        return;
      }

      // Update formData from therapy lists before submitting
      this.updateFormDataFromLists();

      this.loading = true;
      try {
        let response;
        if (this.formData.id) {
          // Update existing
          response = await this.$_api.post("observasi/update", {
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
            keputusan_akhir: this.formData.keputusan_akhir || null,
            status: this.formData.status || null,
          });
        } else {
          // Create new
          response = await this.$_api.post("observasi/register", {
            registrasi_id: this.registrasiId,
            durasi: this.formData.durasi,
            jam_start: this.formData.jam_start || null,
            interval_vital_sign: this.formData.interval_vital_sign || null,
            catatan_dokter: this.formData.catatan_dokter || null,
            infus: this.formData.infus || null,
            obat: this.formData.obat || null,
            tindakan: this.formData.tindakan || null,
            keputusan_akhir: this.formData.keputusan_akhir || null,
            status: this.formData.status || "Belum Selesai",
          });
        }

        this.$_alert.success({}, response.message || "Data observasi berhasil disimpan");
        await this.loadObservasiData();
        this.isFormMode = false;
        this.selectedObservasi = null;
        this.vitalSignsList = [];
        this.resetForm();
        this.resetTherapyLists();
      } catch (error) {
        console.error("Error saving observasi data:", error);
        let message = "Gagal menyimpan data observasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        registrasi_id: this.registrasiId,
        durasi: 24,
        jam_start: "",
        jam_end: null,
        interval_vital_sign: 1,
        catatan_dokter: "",
        infus: "",
        obat: "",
        tindakan: "",
        keputusan_akhir: "",
        status: "Belum Selesai",
      };
    },

    // ========== Implementasi & Evaluasi Methods ==========
    resetImplementasiEvaluasiState() {
      this.implementasiList = [];
      this.evaluasiList = [];
      this.selectedImplementasi = null;
      this.resetEvaluasiForm();
      this.resetImplementasiForm();
    },

    getDiagnosaLookupValue(item) {
      if (!item) return null;

      const diagnosa = item.ms_diagnosa || item.diagnosa || {};
      const diagnosaId = item.ms_diagnosa_id || diagnosa.id || diagnosa.ms_diagnosa_id || "";
      const diagnosaNama = item.diagnosa_nama || diagnosa.nama_diagnosa || "";

      if (!diagnosaId && !diagnosaNama) return null;

      return {
        ...diagnosa,
        id: diagnosa.id || diagnosaId,
        ms_diagnosa_id: diagnosa.ms_diagnosa_id || diagnosaId,
        nama_diagnosa: diagnosaNama,
      };
    },

    getDiagnosaId(item) {
      const diagnosa = item && item.diagnosa ? item.diagnosa : item;
      return (diagnosa && (diagnosa.id || diagnosa.ms_diagnosa_id)) || "";
    },

    getDiagnosaName(item) {
      if (!item) return "";
      return item.diagnosa_nama || (item.ms_diagnosa && item.ms_diagnosa.nama_diagnosa) || (item.diagnosa && item.diagnosa.nama_diagnosa) || "";
    },

    getPerawatLookupValue(item) {
      if (!item) return null;

      const perawat = item.perawat || item.ms_dokter || {};
      const perawatId = item.perawat_id || perawat.ms_dokter_id || perawat.id || "";
      const perawatNama = item.perawat_nama || perawat.nama_dokter || "";

      if (!perawatId && !perawatNama) return null;

      return {
        ...perawat,
        id: perawat.id || perawatId,
        ms_dokter_id: perawat.ms_dokter_id || perawatId,
        nama_dokter: perawatNama,
      };
    },

    getPerawatId(item) {
      const perawat = item && item.perawat ? item.perawat : item;
      return (perawat && (perawat.ms_dokter_id || perawat.id || perawat.perawat_id)) || "";
    },

    getEvaluasiPerawatName(item) {
      if (!item) return "-";
      return item.perawat_nama || (item.ms_dokter && item.ms_dokter.nama_dokter) || (item.perawat && item.perawat.nama_dokter) || "-";
    },

    async loadEvaluasiList(selectedId = null) {
      await this.loadImplementasiList(selectedId);
    },

    async loadImplementasiList(selectedId = null) {
      if (!this.selectedObservasi || !this.selectedObservasi.id) {
        this.resetImplementasiEvaluasiState();
        return;
      }

      this.implementasiLoading = true;
      this.evaluasiLoading = true;
      try {
        const response = await this.$_api.post("observasi_evaluasi_implementasi/list", {
          observasi_id: this.selectedObservasi.id,
          halaman: 1,
          jumlah: 999,
        });

        this.implementasiList = Array.isArray(response.data) ? response.data : [];

        if (this.implementasiList.length === 0) {
          this.selectedImplementasi = null;
          this.evaluasiList = [];
          return;
        }

        const preferredId = selectedId || (this.selectedImplementasi && this.selectedImplementasi.id);
        const selectedItem = (preferredId && this.implementasiList.find((item) => item.id === preferredId)) || this.implementasiList[0];
        this.selectImplementasi(selectedItem);
      } catch (error) {
        console.error("Error loading implementasi data:", error);
        this.implementasiList = [];
        this.selectedImplementasi = null;
        this.evaluasiList = [];
        this.$_alert.error({}, "Gagal memuat data implementasi");
      } finally {
        this.implementasiLoading = false;
        this.evaluasiLoading = false;
      }
    },

    selectImplementasi(item) {
      this.selectedImplementasi = item || null;
      this.evaluasiList = item && Array.isArray(item.evaluasi) ? item.evaluasi : [];
    },

    showEvaluasiModal() {
      if (!this.selectedImplementasi || !this.selectedImplementasi.id) {
        this.$_alert.error({}, "Pilih implementasi terlebih dahulu");
        return;
      }

      this.resetEvaluasiForm();
      this.evaluasiFormData.observasi_evaluasi_implementasi_id = this.selectedImplementasi.id;
      this.$refs.evaluasiModal.show();
    },

    closeEvaluasiModal() {
      this.$refs.evaluasiModal.hide();
      this.resetEvaluasiForm();
    },

    editEvaluasi(item) {
      this.evaluasiFormData = {
        id: item.id,
        observasi_evaluasi_implementasi_id: item.observasi_evaluasi_implementasi_id || (this.selectedImplementasi && this.selectedImplementasi.id) || "",
        perawat_id: item.perawat_id || this.getPerawatId(item),
        perawat: this.getPerawatLookupValue(item),
        waktu_evaluasi: item.waktu_evaluasi ? item.waktu_evaluasi.substring(0, 16) : "",
        tindak_lanjut: item.tindak_lanjut || "",
        catatan: item.catatan || "",
        status: item.status || "aktif",
      };
      this.$refs.evaluasiModal.show();
    },

    async saveEvaluasi() {
      const perawatId = this.getPerawatId(this.evaluasiFormData);
      const implementasiId = this.evaluasiFormData.observasi_evaluasi_implementasi_id || (this.selectedImplementasi && this.selectedImplementasi.id);

      // Validation
      if (!implementasiId) {
        this.$_alert.error({}, "Implementasi harus dipilih");
        return;
      }

      if (!perawatId) {
        this.$_alert.error({}, "Perawat harus dipilih");
        return;
      }

      if (!this.evaluasiFormData.waktu_evaluasi) {
        this.$_alert.error({}, "Waktu evaluasi harus diisi");
        return;
      }

      this.evaluasiSaving = true;
      try {
        let response;
        if (this.evaluasiFormData.id) {
          // Update existing
          response = await this.$_api.post("observasi_evaluasi/update", {
            id: this.evaluasiFormData.id,
            observasi_evaluasi_implementasi_id: implementasiId,
            perawat_id: perawatId,
            waktu_evaluasi: this.evaluasiFormData.waktu_evaluasi || null,
            tindak_lanjut: this.evaluasiFormData.tindak_lanjut || null,
            catatan: this.evaluasiFormData.catatan || null,
            status: this.evaluasiFormData.status || "aktif",
          });
        } else {
          // Create new
          response = await this.$_api.post("observasi_evaluasi/register", {
            observasi_evaluasi_implementasi_id: implementasiId,
            perawat_id: perawatId,
            waktu_evaluasi: this.evaluasiFormData.waktu_evaluasi || null,
            tindak_lanjut: this.evaluasiFormData.tindak_lanjut || null,
            catatan: this.evaluasiFormData.catatan || null,
            status: this.evaluasiFormData.status || "aktif",
          });
        }

        this.$_alert.success({}, response.message || "Data evaluasi berhasil disimpan");
        this.closeEvaluasiModal();
        await this.loadImplementasiList(implementasiId);
      } catch (error) {
        console.error("Error saving evaluasi data:", error);
        let message = "Gagal menyimpan data evaluasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.evaluasiSaving = false;
      }
    },

    async confirmDeleteEvaluasi(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, "Tidak ada data untuk dihapus");
        return;
      }

      this.$_alert.confirm({ title: "Hapus Data Evaluasi", text: "Apakah Anda yakin ingin menghapus data evaluasi ini?" }, async () => {
        await this.deleteEvaluasi(item);
      });
    },

    async deleteEvaluasi(item) {
      this.evaluasiLoading = true;
      try {
        await this.$_api.post("observasi_evaluasi/delete", {
          id: item.id,
        });

        this.$_alert.success({}, "Data evaluasi berhasil dihapus");
        await this.loadImplementasiList((this.selectedImplementasi && this.selectedImplementasi.id) || item.observasi_evaluasi_implementasi_id || null);
      } catch (error) {
        console.error("Error deleting evaluasi data:", error);
        let message = "Gagal menghapus data evaluasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.evaluasiLoading = false;
      }
    },

    resetEvaluasiForm() {
      this.evaluasiFormData = {
        id: null,
        observasi_evaluasi_implementasi_id: "",
        perawat_id: "",
        perawat: null,
        waktu_evaluasi: "",
        tindak_lanjut: "",
        catatan: "",
        status: "aktif",
      };
    },

    showImplementasiModal() {
      this.resetImplementasiForm();
      this.implementasiFormData.observasi_id = (this.selectedObservasi && this.selectedObservasi.id) || "";
      this.$refs.implementasiModal.show();
    },

    closeImplementasiModal() {
      this.$refs.implementasiModal.hide();
      this.resetImplementasiForm();
    },

    editImplementasi(item) {
      this.implementasiFormData = {
        id: item.id,
        observasi_id: item.observasi_id || (this.selectedObservasi && this.selectedObservasi.id) || "",
        ms_diagnosa_id: item.ms_diagnosa_id,
        diagnosa: this.getDiagnosaLookupValue(item),
        jenis_implementasi: item.jenis_implementasi || "",
        respon_pasien: item.respon_pasien || "",
        implementasi: item.implementasi || "",
      };
      this.$refs.implementasiModal.show();
    },

    async saveImplementasi() {
      if (!this.selectedObservasi || !this.selectedObservasi.id) {
        this.$_alert.error({}, "Data observasi belum dipilih");
        return;
      }

      const diagnosaId = this.getDiagnosaId(this.implementasiFormData);

      this.implementasiSaving = true;
      try {
        let response;
        if (this.implementasiFormData.id) {
          // Update existing
          response = await this.$_api.post("observasi_evaluasi_implementasi/update", {
            id: this.implementasiFormData.id,
            ms_diagnosa_id: diagnosaId || null,
            jenis_implementasi: this.implementasiFormData.jenis_implementasi || null,
            respon_pasien: this.implementasiFormData.respon_pasien || null,
            implementasi: this.implementasiFormData.implementasi || null,
          });
        } else {
          // Create new
          response = await this.$_api.post("observasi_evaluasi_implementasi/register", {
            observasi_id: this.selectedObservasi.id,
            ms_diagnosa_id: diagnosaId || null,
            jenis_implementasi: this.implementasiFormData.jenis_implementasi || null,
            respon_pasien: this.implementasiFormData.respon_pasien || null,
            implementasi: this.implementasiFormData.implementasi || null,
          });
        }

        this.$_alert.success({}, response.message || "Data implementasi berhasil disimpan");
        const preferredId = (response.data && response.data.id) || this.implementasiFormData.id || (this.selectedImplementasi && this.selectedImplementasi.id) || null;
        this.closeImplementasiModal();
        await this.loadImplementasiList(preferredId);
      } catch (error) {
        console.error("Error saving implementasi data:", error);
        let message = "Gagal menyimpan data implementasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.implementasiSaving = false;
      }
    },

    async confirmDeleteImplementasi(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, "Tidak ada data untuk dihapus");
        return;
      }

      this.$_alert.confirm({ title: "Hapus Data Implementasi", text: "Apakah Anda yakin ingin menghapus data implementasi ini?" }, async () => {
        await this.deleteImplementasi(item);
      });
    },

    async deleteImplementasi(item) {
      this.implementasiLoading = true;
      try {
        await this.$_api.post("observasi_evaluasi_implementasi/delete", {
          id: item.id,
        });

        this.$_alert.success({}, "Data implementasi berhasil dihapus");
        await this.loadImplementasiList(this.selectedImplementasi && this.selectedImplementasi.id !== item.id ? this.selectedImplementasi.id : null);
      } catch (error) {
        console.error("Error deleting implementasi data:", error);
        let message = "Gagal menghapus data implementasi";
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        }
        this.$_alert.error({}, message);
      } finally {
        this.implementasiLoading = false;
      }
    },

    resetImplementasiForm() {
      this.implementasiFormData = {
        id: null,
        observasi_id: "",
        ms_diagnosa_id: "",
        diagnosa: null,
        jenis_implementasi: "",
        respon_pasien: "",
        implementasi: "",
      };
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.status-dropdown {
  min-width: 150px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-dropdown:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #80bdff;
}

.status-dropdown:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.active-implementasi {
  background-color: #e8f4ff;
  border-color: #007bff !important;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
}

.implementasi-item {
  transition: all 0.2s ease;
}

.implementasi-item:hover {
  background-color: #f8f9fa !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.evaluasi-child-item {
  transition: all 0.2s ease;
}

.evaluasi-child-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
