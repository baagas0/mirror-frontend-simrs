<template>
  <div class="w-100 container">
    <!-- {{ embedded ? 'Embedded Mode Active' : '' }} -->
    <div :class="isEmbeddedMode() ? '' : 'card'">
      <div :class="isEmbeddedMode() ? '' : 'card-body'">
        <h4 class="card-title mb-4">
          <i class="ri-user-star-line"></i>
          Expertise Radiologi
        </h4>

        <!-- Filter Section -->
        <div class="row mb-4" v-if="!embedded">
          <div class="col-md-3">
            <label for="status" class="form-label">Status</label>
            <select
              v-model="filters.status"
              class="form-control"
              id="status"
              @change="loadData"
            >
              <option value="">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="second_opinion">Second Opinion</option>
              <option value="peer_review">Peer Review</option>
              <option value="final">Final</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="rad_hasil_id" class="form-label">Hasil Radiologi</label>
            <select
              v-model="filters.rad_hasil_id"
              class="form-control"
              id="rad_hasil_id"
            >
              <option value="">Pilih Hasil Radiologi</option>
              <option v-for="(hasil, index) in radHasilList" :key="`${index}-${hasil.rad_hasil_id}`" :value="hasil.rad_hasil_id">
                {{ hasil.nama_lengkap }} - {{ hasil.nama_penunjang }} - {{ formatDate(hasil.tanggal_pemeriksaan) }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="search" class="form-label">Pencarian</label>
            <input
              type="text"
              v-model="filters.search"
              class="form-control"
              id="search"
              placeholder="Cari berdasarkan pasien/radiolog"
              @keyup.enter="loadData"
            />
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button class="btn btn-primary" @click="loadData" :disabled="isLoading">
              <i class="ri-search-line" :class="{ 'spinner-border spinner-border-sm': isLoading }"></i>
              Cari
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="row mb-3" v-if="!embedded">
          <div class="col-12">
            <button class="btn btn-success mr-2" @click="showCreateModal">
              <i class="ri-add-line"></i>
              Expertise Baru
            </button>
            <button class="btn btn-info mr-2" @click="showDashboardModalNew">
              <i class="ri-dashboard-line"></i>
              Dashboard
            </button>
            <!-- <button class="btn btn-success mr-2" @click="showComprehensiveReportModal" :disabled="!selectedItems.length">
              <i class="ri-file-text-line"></i>
              Laporan Lengkap ({{ selectedItems.length }})
            </button> -->
            <!-- <button class="btn btn-warning mr-2" :disabled="!selectedItems.length" @click="exportMultiplePDF">
              <i class="ri-file-pdf-line"></i>
              Export Multiple ({{ selectedItems.length }})
            </button> -->
            <button class="btn btn-info mr-2" :disabled="!selectedItems.length" @click="printMultipleExpertise">
              <i class="ri-printer-line"></i>
              Cetak Multiple ({{ selectedItems.length }})
            </button>
            <button class="btn btn-secondary" @click="resetFilters">
              <i class="ri-refresh-line"></i>
              Reset
            </button>
          </div>
        </div>

        <!-- Embedded Mode Action Button -->
        <div class="row mb-3" v-if="embedded">
          <div class="col-12">
            <button class="btn btn-success btn-sm" @click="showCreateModal">
              <i class="ri-add-line"></i>
              Expertise Baru
            </button>
          </div>
        </div>

        <!-- Data Table -->
        <div class="table-responsive">
          <table class="table table-hover table-sm">
            <thead class="thead-light">
              <tr>
                <th width="40">
                  <input
                    type="checkbox"
                    @change="toggleSelectAll"
                    :checked="isAllSelected"
                  />
                </th>
                <th>No</th>
                <th>Tanggal</th>
                <th>Pasien</th>
                <th>Penunjang</th>
                <th>Tanggal Permintaan</th>
                <th>Status</th>
                <th>Expertise Type</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading && !data.length">
                <td colspan="9" class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="!data.length">
                <td colspan="9" class="text-center text-muted">
                  <i class="ri-inbox-line"></i>
                  Tidak ada data
                </td>
              </tr>
              <tr v-for="(item, index) in data" :key="item.id">
                <td>
                  <input
                    type="checkbox"
                    v-model="selectedItems"
                    :value="item.id"
                  />
                </td>
                <td>{{ ((currentPage - 1) * perPage) + index + 1 }}</td>
                <td>{{ formatDate(item.createdAt) }}</td>
                <td>
                  <div><strong>{{ item.nama_lengkap }}</strong></div>
                  <small class="text-muted">RM: {{ item.no_rm }}</small>
                </td>
                <td>
                  {{ item.nama_penunjang }}
                </td>
                <td>
                  <div>{{ formatDate(item.tanggal_request) }}</div>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(item.status_expertise)">
                    {{ getStatusText(item.status_expertise) }}
                  </span>
                </td>
                <td>
                  <span class="badge badge-info">{{ item.expertise_type || 'Standard' }}</span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                      class="btn btn-primary"
                      @click="viewDetail(item)"
                      title="Lihat Detail"
                    >
                      <i class="ri-eye-line"></i>
                    </button>
                    <button
                      class="btn btn-warning"
                      @click="editExpertise(item)"
                      title="Edit"
                      :disabled="item.status === 'final'"
                    >
                      <i class="ri-edit-line"></i>
                    </button>
                    <!-- <button
                      class="btn btn-info"
                      @click="exportSinglePDF(item)"
                      title="Export PDF"
                    >
                      <i class="ri-file-pdf-line"></i>
                    </button> -->
                    <button
                      class="btn btn-secondary"
                      @click="printExpertise(item)"
                      title="Cetak"
                    >
                      <i class="ri-printer-line"></i>
                    </button>
                    <button
                      class="btn btn-danger"
                      @click="confirmDelete(item)"
                      title="Hapus"
                      :disabled="item.status === 'final'"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  <div class="btn-group btn-group-sm mt-1">
                    <button
                      v-if="item.status === 'draft'"
                      class="btn btn-success"
                      @click="submitExpertise(item)"
                      title="Submit"
                    >
                      <i class="ri-send-plane-line"></i>
                      Submit
                    </button>
                    <button
                      v-if="item.status === 'submitted'"
                      class="btn btn-info"
                      @click="requestSecondOpinion(item)"
                      title="Request Second Opinion"
                    >
                      <i class="ri-questionnaire-line"></i>
                      2nd Opinion
                    </button>
                    <button
                      v-if="item.status === 'second_opinion' || item.status === 'submitted'"
                      class="btn btn-warning"
                      @click="peerReview(item)"
                      title="Peer Review"
                    >
                      <i class="ri-team-line"></i>
                      Peer Review
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3" v-if="pagination.total > 0">
          <div class="text-muted">
            Menampilkan {{ ((currentPage - 1) * perPage) + 1 }} -
            {{ Math.min(currentPage * perPage, pagination.total) }}
            dari {{ pagination.total }} data
          </div>
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                  <i class="ri-arrow-left-s-line"></i>
                </a>
              </li>
              <li
                v-for="page in getVisiblePages()"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">
                  {{ page }}
                </a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === pagination.totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <i class="ri-arrow-right-s-line"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <!-- @ok="saveExpertise"
      :ok-disabled="isSaving || (isEdit && !hasChanges)"
      :cancel-disabled="isSaving"
      ok-title="Simpan"
      cancel-title="Batal"
      @hide="onModalHide" -->
    <b-modal
      v-model="showModal"
      size="xl"
      :title="isEdit ? 'Edit Expertise' : 'Expertise Baru'"
      hide-footer
    >
      <!-- Close button for embedded mode -->
      <div v-if="embedded" class="text-right p-3 border-bottom">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          @click="$emit('close')"
        >
          <i class="ri-close-line"></i>
          Tutup
        </button>
      </div>
      <div v-if="isEdit && hasChanges" class="alert alert-info mb-3">
        <i class="ri-information-line"></i>
        <strong>Perhatian!</strong> Anda memiliki perubahan yang belum disimpan.
      </div>
      <form @submit.prevent="saveExpertise">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="rad_hasil_id">Hasil Radiologi <span class="text-danger">*</span></label>
              <select
                v-model="formData.rad_hasil_id"
                class="form-control"
                id="rad_hasil_id"
                :disabled="isEdit || embedded"
                required
              >
                <option value="">Pilih Hasil Radiologi</option>
                <option v-for="(hasil, index) in radHasilList" :key="`${index}-${hasil.rad_hasil_id}`" :value="hasil.rad_hasil_id">
                  {{ hasil.nama_lengkap }} - {{ hasil.nama_penunjang }} - {{ formatDate(hasil.tanggal_pemeriksaan) }}
                </option>
              </select>
              <small v-if="isEdit" class="form-text text-muted">Hasil Radiologi tidak dapat diubah setelah dibuat</small>
            </div>

            <div class="form-group">
              <label for="status_expertise">Status Expertise</label>
              <select
                v-model="formData.status_expertise"
                class="form-control"
                id="status_expertise"
                :class="{ 'is-changed': isFieldChanged('status_expertise') }"
              >
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="second_opinion">Second Opinion</option>
                <option value="peer_review">Peer Review</option>
                <option value="final">Final</option>
              </select>
              <small v-if="selectedItem && selectedItem.status_expertise === 'final'" class="form-text text-warning">
                <i class="ri-error-warning-line"></i> Status final tidak dapat diubah
              </small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="urgency_level">Tingkat Urgensi</label>
              <select
                v-model="formData.urgency_level"
                class="form-control"
                id="urgency_level"
                :class="{ 'is-changed': isFieldChanged('urgency_level') }"
              >
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="stat">Stat</option>
              </select>
            </div>

            <div class="form-group">
              <label for="assigned_radiolog">Radiolog yang Ditugaskan *</label>
              <select
                v-model="formData.assigned_radiolog"
                class="form-control"
                id="assigned_radiolog"
                :class="{ 'is-changed': isFieldChanged('assigned_radiolog') }"
              >
                <option value="">Pilih Radiolog</option>
                <option v-for="(radiolog, index) in radiologList" :key="`${index}-${radiolog.ms_dokter_id}`" :value="radiolog.ms_dokter_id">
                  Dr. {{ radiolog.nama_dokter }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="temuan">Temuan <span class="text-danger">*</span></label>
          <textarea
            v-model="formData.temuan"
            class="form-control"
            id="temuan"
            rows="5"
            placeholder="Deskripsikan temuan pemeriksaan radiologi..."
            required
            :class="{ 'is-changed': isFieldChanged('temuan') }"
          ></textarea>
          <small class="form-text text-muted">Minimal 10 karakter</small>
        </div>

        <div class="form-group">
          <label for="kesimpulan">Kesimpulan <span class="text-danger">*</span></label>
          <textarea
            v-model="formData.kesimpulan"
            class="form-control"
            id="kesimpulan"
            rows="4"
            placeholder="Kesimpulan dari hasil pemeriksaan..."
            required
            :class="{ 'is-changed': isFieldChanged('kesimpulan') }"
          ></textarea>
          <small class="form-text text-muted">Minimal 10 karakter</small>
        </div>

        <div class="form-group">
          <label for="saran">Saran/Rekomendasi</label>
          <textarea
            v-model="formData.saran"
            class="form-control"
            id="saran"
            rows="3"
            placeholder="Saran tindakan lebih lanjut..."
            :class="{ 'is-changed': isFieldChanged('saran') }"
          ></textarea>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="technique_used">Teknik yang Digunakan</label>
              <input
                type="text"
                v-model="formData.technique_used"
                class="form-control"
                id="technique_used"
                placeholder="Teknik pemeriksaan yang digunakan"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="report_type">Tipe Laporan</label>
              <select
                v-model="formData.report_type"
                class="form-control"
                id="report_type"
              >
                <option value="preliminary">Preliminary</option>
                <option value="final">Final</option>
                <option value="addendum">Addendum</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="measurements">Pengukuran</label>
          <textarea
            v-model="formData.measurements"
            class="form-control"
            id="measurements"
            rows="3"
            placeholder="Hasil pengukuran radiologi..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="clinical_correlation">Korelasi Klinis</label>
          <textarea
            v-model="formData.clinical_correlation"
            class="form-control"
            id="clinical_correlation"
            rows="3"
            placeholder="Korelasi dengan data klinis pasien..."
          ></textarea>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="comparison_notes">Catatan Perbandingan</label>
              <textarea
                v-model="formData.comparison_notes"
                class="form-control"
                id="comparison_notes"
                rows="3"
                placeholder="Perbandingan dengan pemeriksaan sebelumnya..."
              ></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="technique">Teknik Pemeriksaan</label>
              <input
                type="text"
                v-model="formData.technique"
                class="form-control"
                id="technique"
                placeholder="Deskripsi teknik yang digunakan..."
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="additional_findings">Temuan Tambahan</label>
              <textarea
                v-model="formData.additional_findings"
                class="form-control"
                id="additional_findings"
                rows="3"
                placeholder="Temuan tambahan yang perlu dicatat..."
              ></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="limitations">Keterbatasan Pemeriksaan</label>
              <textarea
                v-model="formData.limitations"
                class="form-control"
                id="limitations"
                rows="3"
                placeholder="Keterbatasan dalam pemeriksaan..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="form-check">
          <input
            type="checkbox"
            v-model="formData.critical_findings"
            class="form-check-input"
            id="critical_findings"
            :class="{ 'is-changed': isFieldChanged('critical_findings') }"
          />
          <label class="form-check-label" for="critical_findings">
            Temuan Kritis
          </label>
          <small v-if="formData.critical_findings" class="form-text text-warning">
            <i class="ri-error-warning-line"></i> Temuan kritis akan memerlukan notifikasi segera
          </small>
        </div>

        <!-- Image Upload Section -->
        <div class="form-group mt-4">
          <label class="font-weight-bold">Upload Gambar Radiologi</label>
          <div class="row">
            <div class="col-md-6">
              <div class="custom-file-upload">
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileUpload"
                  accept="image/*"
                  class="form-control-file"
                  id="file1"
                />
                <label for="file1" class="custom-file-upload-label">
                  <i class="ri-upload-cloud-line"></i>
                  <span v-if="!selectedFileName">Pilih Gambar</span>
                  <span v-else class="text-truncate">{{ selectedFileName }}</span>
                </label>
                <small class="form-text text-muted">
                  Format: JPG, PNG, GIF. Maksimal: 5MB
                </small>
              </div>
            </div>
            <div class="col-md-6" v-if="imageUrl || existingImageUrl">
              <div class="image-preview-container">
                <label class="small text-muted">Preview Gambar:</label>
                <div class="image-preview">
                  <img
                    :src="imageUrl || `${be()}/${existingImageUrl}`"
                    alt="Preview"
                    class="img-thumbnail"
                    @error="handleImageError"
                  />
                  <button
                    type="button"
                    @click="removeImage"
                    class="btn btn-sm btn-danger remove-image-btn"
                    v-if="imageUrl || `${be()}/${existingImageUrl}`"
                  >
                    <i class="ri-close-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="uploadProgress > 0" class="progress mt-2">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{ width: uploadProgress + '%' }"
              :aria-valuenow="uploadProgress"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ uploadProgress }}%
            </div>
          </div>
        </div>

        <!-- Button -->
        <div class="mt-3">
          <button class="btn btn-secondary" type="button" @click="onModalHide">Batal</button>
          <button class="btn btn-primary" type="submit">Simpan</button>
        </div>
      </form>
    </b-modal>

    <!-- Detail Modal -->
    <b-modal
      v-model="showDetailModal"
      size="lg"
      title="Detail Expertise"
      hide-footer
    >
      <div v-if="selectedItem" class="mb-3">
        <button class="btn btn-primary mr-2" @click="printExpertise(selectedItem)">
          <i class="ri-printer-line"></i>
          Cetak Laporan
        </button>
        <button class="btn btn-success mr-2" @click="exportSinglePDF(selectedItem)">
          <i class="ri-file-pdf-line"></i>
          Export PDF
        </button>
        <button class="btn btn-secondary" @click="showDetailModal = false">
          <i class="ri-close-line"></i>
          Tutup
        </button>
      </div>
      <div v-if="selectedItem">
        <!-- Patient and Exam Summary -->
        <div class="row">
          <div class="col-md-7">
            <div class="mb-2">
              <div class="h6 mb-1">
                <i class="ri-user-3-line"></i>
                {{ selectedItem.nama_pasien || '-' }}
              </div>
              <div class="text-muted small">
                RM: <strong>{{ selectedItem.no_rm || '-' }}</strong>
                • JK: {{ formatGender(selectedItem.jenis_kelamin) }}
                • Usia: {{ calcAge(selectedItem.tgl_lahir) }}
              </div>
            </div>
            <div class="text-muted small">
              <i class="ri-stethoscope-line"></i>
              Dokter Pengirim: {{ selectedItem.nama_dokter_pengirim || '-' }}
            </div>
          </div>
          <div class="col-md-5">
            <div class="text-muted small">
              <i class="ri-flask-line"></i>
              Penunjang: <strong>{{ selectedItem.nama_penunjang || '-' }}</strong>
            </div>
            <div class="text-muted small">
              <i class="ri-test-tube-line"></i>
              Pemeriksaan: {{ selectedItem.nama_rad_test || '-' }}
            </div>
            <div class="text-muted small">
              <i class="ri-time-line"></i>
              Tgl Pemeriksaan: {{ formatDateTime(selectedItem.tanggal_pemeriksaan) }}
            </div>
          </div>
        </div>

        <hr/>

        <!-- Status and Meta -->
        <div class="row">
          <div class="col-md-3">
            <div class="small text-muted mb-1">Status Expertise</div>
            <span :class="getStatusBadgeClass(selectedItem.status_expertise)">
              {{ getStatusText(selectedItem.status_expertise) }}
            </span>
          </div>
          <div class="col-md-3">
            <div class="small text-muted mb-1">Radiolog</div>
            <span class="badge badge-info">{{ selectedItem.nama_radiolog || '-' }}</span>
          </div>
          <div class="col-md-3">
            <div class="small text-muted mb-1">Urgensi</div>
            <span class="badge badge-secondary text-uppercase">{{ selectedItem.urgency_level || '-' }}</span>
          </div>
          <div class="col-md-3">
            <div class="small text-muted mb-1">Tipe Laporan / Versi</div>
            <span class="badge badge-light border">{{ (selectedItem.report_type || '-').toUpperCase() }} / v{{ selectedItem.version || 1 }}</span>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-md-3">
            <div class="small text-muted mb-1">Temuan Kritis</div>
            <span :class="selectedItem.critical_findings ? 'badge badge-danger' : 'badge badge-success'">
              {{ selectedItem.critical_findings ? 'Ya' : 'Tidak' }}
            </span>
          </div>
          <div class="col-md-3">
            <div class="small text-muted mb-1">Billing</div>
            <span class="badge badge-light border text-uppercase">{{ selectedItem.billing_status || '-' }}</span>
          </div>
          <div class="col-md-3">
            <div class="small text-muted mb-1">Peer Review</div>
            <span class="badge badge-light border text-uppercase">{{ selectedItem.peer_review_status || 'N/A' }}</span>
          </div>
          <div class="col-md-3">
            <div class="small text-muted mb-1">Dibuat / Diubah</div>
            <span class="small">
              {{ formatDateTime(selectedItem.createdAt) }} / {{ formatDateTime(selectedItem.updatedAt) }}
            </span>
          </div>
        </div>

        <hr/>

        <!-- Image Display Section -->
         {{ selectedItem.primary_image || 'mmmm/a' }}
        <div class="form-group mb-3" v-if="selectedItem.primary_image">
          <label class="font-weight-bold">Gambar Radiologi</label>
          <div class="text-center">
            <img
              :src="`${be()}/${selectedItem.primary_image}`"
              alt="Gambar Radiologi"
              class="img-fluid img-thumbnail"
              style="max-height: 400px; cursor: pointer;"
              @click="openImageModal(selectedItem.primary_image)"
            />
            <br>
            <button
              type="button"
              class="btn btn-sm btn-info mt-2"
              @click="openImageModal(selectedItem.primary_image)"
            >
              <i class="ri-zoom-in-line"></i> Lihat Gambar
            </button>
          </div>
        </div>

        <!-- Report Sections -->
        <div class="form-group mb-2">
          <label class="font-weight-bold">Temuan</label>
          <div class="prewrap">{{ selectedItem.temuan || '-' }}</div>
        </div>

        <div class="form-group mb-2">
          <label class="font-weight-bold">Kesimpulan</label>
          <div class="prewrap">{{ selectedItem.kesimpulan || '-' }}</div>
        </div>

        <div class="form-group mb-3">
          <label class="font-weight-bold">Saran</label>
          <div class="prewrap">{{ selectedItem.saran || '-' }}</div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-2">
              <label class="font-weight-bold">Temuan Tambahan</label>
              <div class="prewrap">{{ selectedItem.additional_findings || '-' }}</div>
            </div>
            <div class="form-group mb-2">
              <label class="font-weight-bold">Pengukuran</label>
              <div class="prewrap">{{ selectedItem.measurements || '-' }}</div>
            </div>
            <div class="form-group mb-2">
              <label class="font-weight-bold">Catatan Perbandingan</label>
              <div class="prewrap">{{ selectedItem.comparison_notes || '-' }}</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-2">
              <label class="font-weight-bold">Teknik</label>
              <div class="prewrap">{{ selectedItem.technique || '-' }}</div>
            </div>
            <div class="form-group mb-2">
              <label class="font-weight-bold">Korelasi Klinis</label>
              <div class="prewrap">{{ selectedItem.clinical_correlation || '-' }}</div>
            </div>
            <div class="form-group mb-2">
              <label class="font-weight-bold">Keterbatasan</label>
              <div class="prewrap">{{ selectedItem.limitations || '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-muted">
        <div class="spinner-border text-primary" role="status"></div>
        <div class="small mt-2">Memuat detail...</div>
      </div>
    </b-modal>


    <!-- Dashboard Modal -->
    <b-modal
      v-model="showDashboardModal"
      size="lg"
      title="Dashboard Expertise"
      hide-footer
    >
      <div v-if="dashboardStats">
        <div class="row mb-4">
          <div class="col-md-3">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Expertise</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardStats.total_expertise || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-file-list-3-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Final</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardStats.final_expertise || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-checkbox-circle-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Second Opinion</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardStats.second_opinion_expertise || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-questionnaire-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Peer Review</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ Number(dashboardStats.peer_review_approved || 0) + Number(dashboardStats.peer_review_pending || 0) }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-team-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Comprehensive Report Modal -->
    <b-modal
      v-model="showComprehensiveModal"
      size="lg"
      title="Laporan Pemeriksaan Radiologi Lengkap"
      hide-footer
    >
      <div v-if="selectedItems.length > 0">
        <div class="alert alert-info">
          <i class="ri-information-line"></i>
          <strong>Informasi:</strong> Anda akan membuat laporan lengkap untuk {{ selectedItems.length }} pemeriksaan radiologi.
        </div>

        <!-- PDF Configuration Options -->
        <div class="card mb-3">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="ri-settings-3-line"></i>
              Opsi Laporan
            </h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    v-model="pdfOptions.includeImages"
                    class="form-check-input"
                    id="includeImages"
                  />
                  <label class="form-check-label" for="includeImages">
                    Sertakan Gambar Pemeriksaan
                  </label>
                  <small class="form-text text-muted">Mungkin akan meningkatkan ukuran file</small>
                </div>

                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    v-model="pdfOptions.includeTechnicalDetails"
                    class="form-check-input"
                    id="includeTechnicalDetails"
                  />
                  <label class="form-check-label" for="includeTechnicalDetails">
                    Sertakan Parameter Teknis
                  </label>
                  <small class="form-text text-muted">kV, mAs, FFD, BSF, INAK, dll.</small>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    v-model="pdfOptions.includeComparison"
                    class="form-check-input"
                    id="includeComparison"
                  />
                  <label class="form-check-label" for="includeComparison">
                    Sertakan Catatan Perbandingan
                  </label>
                  <small class="form-text text-muted">Perbandingan dengan pemeriksaan sebelumnya</small>
                </div>

                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    v-model="pdfOptions.includeSignatures"
                    class="form-check-input"
                    id="includeSignatures"
                  />
                  <label class="form-check-label" for="includeSignatures">
                    Sertakan Tanda Tangan Digital
                  </label>
                  <small class="form-text text-muted">Tanda tangan dokter pengirim dan radiolog</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Report Format Selection -->
        <div class="card mb-3">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="ri-file-list-3-line"></i>
              Format Laporan
            </h6>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="reportFormat">Pilih Format:</label>
              <select
                v-model="pdfOptions.reportFormat"
                class="form-control"
                id="reportFormat"
              >
                <option value="standard">Standard - Laporan Lengkap</option>
                <option value="summary">Ringkasan - Hasil Kesimpulan</option>
                <option value="detailed">Detail - Semua Data Pemeriksaan</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-center">
          <button
            class="btn btn-primary mr-2"
            @click="previewComprehensiveReport"
            :disabled="isGeneratingReport"
          >
            <i class="ri-eye-line"></i>
            <span v-if="isGeneratingReport">
              <i class="ri-loader-4-line spin"></i> Memproses...
            </span>
            <span v-else>Preview Laporan</span>
          </button>

          <button
            class="btn btn-success mr-2"
            @click="downloadComprehensiveReport"
            :disabled="isGeneratingReport"
          >
            <i class="ri-download-line"></i>
            <span v-if="isGeneratingReport">
              <i class="ri-loader-4-line spin"></i> Mengunduh...
            </span>
            <span v-else>Download PDF</span>
          </button>

          <button class="btn btn-secondary" @click="showComprehensiveModal = false">
            <i class="ri-close-line"></i>
            Batal
          </button>
        </div>
      </div>
    </b-modal>

    <!-- Delete Confirmation Modal -->
    <b-modal
      v-model="showDeleteModal"
      size="md"
      title="Konfirmasi Hapus"
      @ok="deleteExpertise"
      :ok-disabled="isDeleting"
      ok-title="Hapus"
      ok-variant="danger"
      cancel-title="Batal"
    >
      <div class="alert alert-warning">
        <i class="ri-error-warning-line"></i>
        <strong>Perhatian!</strong> Tindakan ini akan menghapus data expertise secara permanen.
      </div>
      <p>Apakah Anda yakin ingin menghapus expertise ini?</p>
    </b-modal>

    <!-- Image View Modal -->
    <b-modal
      v-model="showImageModal"
      size="xl"
      title="Gambar Radiologi"
      hide-footer
      centered
    >
      <div class="text-center">
        <img
          :src="`${be()}/${modalImageUrl}`"
          alt="Gambar Radiologi"
          class="img-fluid"
          style="max-height: 80vh;"
          @error="handleImageError"
        />
      </div>
    </b-modal>

    <!-- Print Template for Expertise Radiologi -->
    <div id="cetak-rad-expertise" style="position: relative; display: none">
      <section class="content-print A4">
        <div class="sheet w-100">
          <!-- Header -->
          <div class="w-100">
            <table border="0" class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 15%;vertical-align: middle;padding-left: 1.5mm;padding-right: 1.5mm;">
                    <img :src="$_config.logo.lg" alt="Logo" style="width: 100%;">
                  </td>
                  <td style="width: 70%;vertical-align: middle;">
                    <h6 style="text-align: center;font-weight: bold;margin-bottom: 0;font-size: 16pt;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h6>
                    <h6 style="text-align: center;font-weight: normal;font-size: 10pt;">
                      <span>Jl. Gajah mada kec.batauga kab.buton selatan, sulawesi tenggara Telepon 085257769540</span>
                    </h6>
                    <h6 style="text-align: center;font-weight: normal;font-size: 10pt;">
                      <span>Surat Elektronik : rsudbusel@gmail.com</span>
                    </h6>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="line" style="margin-top: 2.5mm;margin-bottom: 2.5mm;"></div>

          <!-- Title -->
          <div class="w-100" style="margin-top: 5mm;">
            <h6 style="text-align: center;"><strong><u>LAPORAN HASIL PEMERIKSAAN RADIOLOGI</u></strong></h6>
            <h6 style="text-align: center;"><strong>(EXPERTISE RADIOLOGI)</strong></h6>
          </div>

          <!-- Patient Information -->
          <div class="w-100-flex" style="margin-top: 5mm;">
            <div style="width: 50%;">
              <table border="0" class="custom-table">
                <tbody>
                  <tr>
                    <td>Nama Pasien</td>
                    <td>:</td>
                    <td><strong>{{ printData.nama_lengkap || '-' }}</strong></td>
                  </tr>
                  <tr>
                    <td>No. RM</td>
                    <td>:</td>
                    <td>{{ printData.no_rm || '-' }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Lahir</td>
                    <td>:</td>
                    <td>{{ formatDate(printData.tgl_lahir) }}</td>
                  </tr>
                  <tr>
                    <td>Umur</td>
                    <td>:</td>
                    <td>{{ calcAge(printData.tgl_lahir) }}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{{ formatGender(printData.jenis_kelamin) }}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{{ printData.alamat_sekarang || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="width: 50%;">
              <table border="0" class="custom-table">
                <tbody>
                  <tr>
                    <td>No. Registrasi</td>
                    <td>:</td>
                    <td>{{ printData.no_kunjungan || '-' }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Permintaan</td>
                    <td>:</td>
                    <td>{{ formatDateTime(printData.tanggal_request) }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Pemeriksaan</td>
                    <td>:</td>
                    <td>{{ formatDateTime(printData.tanggal_pemeriksaan) }}</td>
                  </tr>
                  <tr>
                    <td>Dokter Pengirim</td>
                    <td>:</td>
                    <td>{{ printData.nama_dokter_pengirim || '-' }}</td>
                  </tr>
                  <tr>
                    <td>Unit/Instalasi</td>
                    <td>:</td>
                    <td>{{ printData.nama_penunjang || '-' }}</td>
                  </tr>
                  <tr>
                    <td>Jenis Pemeriksaan</td>
                    <td>:</td>
                    <td>{{ printData.nama_rad_test || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Clinical Information -->
          <div class="w-100" style="margin-top: 5mm;">
            <table border="0" class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 20%;"><strong>Klinis:</strong></td>
                  <td style="width: 2%;">:</td>
                  <td>{{ printData.klinis || '-' }}</td>
                </tr>
                <tr>
                  <td><strong>Indikasi:</strong></td>
                  <td>:</td>
                  <td>{{ printData.indikasi || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Examination Details -->
          <div class="w-100" style="margin-top: 5mm;">
            <table border="1" class="custom-table">
              <thead>
                <tr style="background-color: #f0f0f0;">
                  <th colspan="2" style="text-align: center; padding: 5px;"><strong>HASIL PEMERIKSAAN</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width: 20%; vertical-align: top; padding: 5px;"><strong>Teknik:</strong></td>
                  <td style="padding: 5px;">{{ printData.technique || printData.technique_used || '-' }}</td>
                </tr>
                <tr>
                  <td style="vertical-align: top; padding: 5px;"><strong>Temuan:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.temuan || '-' }}</td>
                </tr>
                <tr v-if="printData.measurements">
                  <td style="vertical-align: top; padding: 5px;"><strong>Pengukuran:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.measurements }}</td>
                </tr>
                <tr v-if="printData.additional_findings">
                  <td style="vertical-align: top; padding: 5px;"><strong>Temuan Tambahan:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.additional_findings }}</td>
                </tr>
                <tr>
                  <td style="vertical-align: top; padding: 5px;"><strong>Kesimpulan:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.kesimpulan || '-' }}</td>
                </tr>
                <tr v-if="printData.saran">
                  <td style="vertical-align: top; padding: 5px;"><strong>Saran/Rekomendasi:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.saran }}</td>
                </tr>
                <tr v-if="printData.clinical_correlation">
                  <td style="vertical-align: top; padding: 5px;"><strong>Korelasi Klinis:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.clinical_correlation }}</td>
                </tr>
                <tr v-if="printData.comparison_notes">
                  <td style="vertical-align: top; padding: 5px;"><strong>Catatan Perbandingan:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.comparison_notes }}</td>
                </tr>
                <tr v-if="printData.limitations">
                  <td style="vertical-align: top; padding: 5px;"><strong>Keterbatasan:</strong></td>
                  <td style="padding: 5px; white-space: pre-wrap;">{{ printData.limitations }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Status Information -->
          <div class="w-100" style="margin-top: 5mm;">
            <table border="0" class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 20%;"><strong>Status Expertise:</strong></td>
                  <td style="width: 2%;">:</td>
                  <td>
                    <span style="background-color: #e3f2fd; padding: 2px 8px; border-radius: 3px;">
                      {{ getStatusText(printData.status_expertise) }}
                    </span>
                  </td>
                  <td style="width: 20%;"><strong>Tingkat Urgensi:</strong></td>
                  <td style="width: 2%;">:</td>
                  <td>
                    <span style="background-color: #fff3e0; padding: 2px 8px; border-radius: 3px; text-transform: uppercase;">
                      {{ printData.urgency_level || '-' }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Tipe Laporan:</strong></td>
                  <td>:</td>
                  <td style="text-transform: uppercase;">{{ printData.report_type || 'final' }}</td>
                  <td><strong>Temuan Kritis:</strong></td>
                  <td>:</td>
                  <td>
                    <span :style="printData.critical_findings ? 'background-color: #ffebee; color: #c62828;' : 'background-color: #e8f5e8; color: #2e7d32;'"
                          style="padding: 2px 8px; border-radius: 3px;">
                      {{ printData.critical_findings ? 'YA' : 'TIDAK' }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Radiolog:</strong></td>
                  <td>:</td>
                  <td>{{ printData.nama_radiolog || '-' }}</td>
                  <td><strong>Periode Review:</strong></td>
                  <td>:</td>
                  <td>{{ formatDateTime(printData.createdAt) }} - {{ formatDateTime(printData.updatedAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Signatures -->
          <div class="w-100" style="margin-top: 10mm;">
            <table border="0" class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 33%; text-align: center;">
                    <h6 style="margin-bottom: 20px;">Dokter Pengirim</h6>
                    <div style="margin-bottom: 30px; height: 40px;"></div>
                    <h6><u>{{ printData.nama_dokter_pengirim || '-' }}</u></h6>
                    <small style="font-size: 9pt;">Dokter Spesialis</small>
                  </td>
                  <td style="width: 33%; text-align: center;">
                    <h6 style="margin-bottom: 20px;">Radiolog</h6>
                    <div style="margin-bottom: 30px; height: 40px;"></div>
                    <h6><u>{{ printData.nama_radiolog || '-' }}</u></h6>
                    <small style="font-size: 9pt;">Dokter Spesialis Radiologi</small>
                  </td>
                  <td style="width: 33%; text-align: center;">
                    <h6 style="margin-bottom: 20px;">Mengetahui</h6>
                    <div style="margin-bottom: 30px; height: 40px;"></div>
                    <h6><u>_________________________</u></h6>
                    <small style="font-size: 9pt;">Kepala Instalasi Radiologi</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="w-100" style="margin-top: 8mm; text-align: center;">
            <small style="font-size: 8pt; color: #666;">
              * Dokumen ini bersifat rahasia dan hanya untuk kepentingan medis pasien
            </small>
            <br>
            <small style="font-size: 8pt; color: #666;">
              Dicetak pada: {{ formatDateTime(new Date()) }} | RSUD Buton Selatan - Sistem Informasi Rumah Sakit
            </small>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import print from '../../../components/print.js';
import { ipBackend } from '../../../ipBackend.js';

export default {
  name: 'RadExpertise',
  props: {
    rad_hasil_id: {
      type: String,
      default: null
    },
    embedded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Data
      data: [],
      radHasilList: [],
      radiologList: [],
      dashboardStats: null,

      // Selected Items
      selectedItems: [],
      selectedItem: null,
      originalFormData: null, // Store original data for change detection
      printData: {}, // Data for printing

      // Forms
      formData: {
        rad_hasil_id: '',
        temuan: '',
        kesimpulan: '',
        saran: '',
        status_expertise: 'draft',
        additional_findings: '',
        measurements: '',
        comparison_notes: '',
        technique: '',
        clinical_correlation: '',
        limitations: '',
        urgency_level: 'routine',
        report_type: 'final',
        critical_findings: false,
        technique_used: '',
        assigned_radiolog: ''
      },

      // Filters
      filters: {
        status: '',
        rad_hasil_id: '',
        search: ''
      },

      // Loading States
      isLoading: false,
      isSaving: false,
      isDeleting: false,

      // File Upload States
      selectedFile: null,
      selectedFileName: '',
      imageUrl: '',
      existingImageUrl: '',
      uploadProgress: 0,
      modalImageUrl: '',

      // Pagination
      currentPage: 1,
      perPage: 10,
      pagination: {
        total: 0,
        totalPages: 0
      },

      // Modal States
      showModal: false,
      showDashboardModal: false,
      showDeleteModal: false,
      showDetailModal: false,
      showComprehensiveModal: false,
      showImageModal: false,

      // Comprehensive Report Options
      pdfOptions: {
        includeImages: false,
        includeTechnicalDetails: true,
        includeComparison: true,
        includeSignatures: false,
        reportFormat: 'standard'
      },
      isGeneratingReport: false,

      // Form States
      isEdit: false,

      // Status Distribution
      statusDistribution: {}
    }
  },

  mounted() {
    this.loadData()
    this.loadRadHasilList()
    this.loadRadiologList()
  },

  methods: {
    be() {
      return ipBackend;
    },
    isEmbeddedMode() {
      return this.embedded
    },
    async loadData() {
      this.isLoading = true

      try {
        const payload = {
          page: this.currentPage,
          perPage: this.perPage,
          ...this.filters
        }

        // Add rad_hasil_id filter if provided
        if (this.rad_hasil_id) {
          payload.rad_hasil_id = this.rad_hasil_id
        }

        const response = await this.$_api.post('/rad_expertise/list', payload)

        if (response.status === 200) {
          this.data = response.data
          this.pagination = response.pagination
        } else {
          this.$_alert.error(response.message || 'Gagal memuat data')
        }
      } catch (error) {
        console.error('Error loading data:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat data')
      } finally {
        this.isLoading = false
      }
    },

    async loadRadHasilList() {
      try {
        const response = await this.$_api.post('/rad_hasil/list', {
          page: 1,
          perPage: 100
        })
        
        if (response.status === 200) {
          console.log('===> rad_expertise.vue:596 ~ response.status', response);
          this.radHasilList = response.data
        }
      } catch (error) {
        console.error('Error loading rad_hasil:', error)
      }
    },

    async loadRadiologList() {
      try {
        const response = await this.$_api.post('/msDokter/list')

        if (response.status === 200) {
          this.radiologList = response.data || []
        }
      } catch (error) {
        console.error('Error loading radiolog:', error)
      }
    },

    async loadDashboard() {
      try {
        const response = await this.$_api.post('/rad_expertise/statistics', {})

        if (response.status === 200) {
          this.dashboardStats = response.data
          this.statusDistribution = response.data.status_distribution || {}
        } else {
          this.$_alert.error(response.message || 'Gagal memuat dashboard')
        }
      } catch (error) {
        console.error('Error loading dashboard:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat dashboard')
      }
    },

    async saveExpertise() {
      // Validasi form
      if (!this.validateForm()) {
        return
      }

      // Konfirmasi sebelum menyimpan perubahan
      if (this.isEdit) {
        const confirmResult = await this.$_alert.confirm(
          'Apakah Anda yakin ingin menyimpan perubahan pada expertise ini?',
          'Konfirmasi Simpan',
          'Ya, Simpan',
          'Batal'
        )
        
        if (!confirmResult) {
          return
        }
      }

      this.isSaving = true

      try {
        // Upload image if a new file is selected
        // let imageData = null
        // if (this.selectedFile) {
        //   imageData = await this.uploadImage()
        // }

        
        const endpoint = this.isEdit ? '/rad_expertise/update' : '/rad_expertise/register'
        
        const formData = new FormData()
        formData.append('file1', this.selectedFile)
        const payload = {
          ...this.formData,
          ...(this.isEdit ? { id: this.selectedItem.id } : {}),
          // ...(imageData ? { image_url: imageData.url } : {})
        }

        Object.keys(payload).forEach(key => {
          formData.append(key, payload[key])
        })

        const response = await this.$_api.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            if (progressEvent.lengthComputable) {
              this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
          }
        })

        if (response.status === 200) {
          this.$_alert.success(response.message || 'Data berhasil disimpan')
          this.showModal = false
          this.resetForm()
          this.loadData()

          // Emit close event if in embedded mode
          if (this.embedded) {
            this.$emit('close')
          }
        } else {
          this.$_alert.error(response.message || 'Gagal menyimpan data')
        }
      } catch (error) {
        console.error('Error saving expertise:', error)
        this.$_alert.error('Terjadi kesalahan saat menyimpan data')
      } finally {
        this.isSaving = false
      }
    },

    validateForm() {
      // Validasi field wajib
      if (!this.formData.rad_hasil_id) {
        this.$_alert.error('Hasil Radiologi harus dipilih')
        return false
      }

      if (!this.formData.assigned_radiolog || this.formData.assigned_radiolog.trim().length < 10) {
        this.$_alert.error('Radiolog yang Ditugaskan harus dipilih')
        return false
      }

      if (!this.formData.temuan || this.formData.temuan.trim().length < 10) {
        this.$_alert.error('Temuan harus diisi minimal 10 karakter')
        return false
      }

      if (!this.formData.kesimpulan || this.formData.kesimpulan.trim().length < 10) {
        this.$_alert.error('Kesimpulan harus diisi minimal 10 karakter')
        return false
      }

      // Validasi khusus untuk mode edit
      if (this.isEdit) {
        // Validasi perubahan status
        if (this.selectedItem && this.selectedItem.status_expertise === 'final' && this.formData.status_expertise !== 'final') {
          this.$_alert.error('Status final tidak dapat diubah')
          return false
        }

        // Validasi jika status berubah ke final
        if (this.selectedItem && this.selectedItem.status_expertise !== 'final' && this.formData.status_expertise === 'final') {
          if (!this.formData.technique) {
            this.$_alert.error('Teknik pemeriksaan harus diisi sebelum mengubah status ke final')
            return false
          }
        }
      }

      return true
    },

    async deleteExpertise() {
      if (!this.selectedItem) return

      this.isDeleting = true

      try {
        const response = await this.$_api.post('/rad_expertise/delete', {
          id: this.selectedItem.id
        })

        if (response.status === 200) {
          this.$_alert.success(response.message || 'Data berhasil dihapus')
          this.showDeleteModal = false
          this.selectedItem = null
          this.loadData()
        } else {
          this.$_alert.error(response.message || 'Gagal menghapus data')
        }
      } catch (error) {
        console.error('Error deleting expertise:', error)
        this.$_alert.error('Terjadi kesalahan saat menghapus data')
      } finally {
        this.isDeleting = false
      }
    },

    async submitExpertise(item) {
      try {
        const response = await this.$_api.post('/rad_expertise/submit', {
          id: item.id
        })

        if (response.status === 200) {
          this.$_alert.success(response.message || 'Expertise berhasil di-submit')
          this.loadData()
        } else {
          this.$_alert.error(response.message || 'Gagal submit expertise')
        }
      } catch (error) {
        console.error('Error submitting expertise:', error)
        this.$_alert.error('Terjadi kesalahan saat submit expertise')
      }
    },

    async requestSecondOpinion(item) {
      try {
        const response = await this.$_api.post('/rad_expertise/request-second-opinion', {
          id: item.id
        })

        if (response.status === 200) {
          this.$_alert.success(response.message || 'Second opinion berhasil direquest')
          this.loadData()
        } else {
          this.$_alert.error(response.message || 'Gagal request second opinion')
        }
      } catch (error) {
        console.error('Error requesting second opinion:', error)
        this.$_alert.error('Terjadi kesalahan saat request second opinion')
      }
    },

    async peerReview(item) {
      try {
        const response = await this.$_api.post('/rad_expertise/peer-review', {
          id: item.id
        })

        if (response.status === 200) {
          this.$_alert.success(response.message || 'Peer review berhasil diproses')
          this.loadData()
        } else {
          this.$_alert.error(response.message || 'Gagal memproses peer review')
        }
      } catch (error) {
        console.error('Error peer review:', error)
        this.$_alert.error('Terjadi kesalahan saat memproses peer review')
      }
    },

    async viewDetail(item) {
      try {
        const response = await this.$_api.post('/rad_expertise/detailsById', {
          id: item.id
        })

        if (response.status === 200) {
          // Show detail modal or navigate to detail page
          this.selectedItem = response.data
          this.showDetailModal = true
        } else {
          this.$_alert.error(response.message || 'Gagal memuat detail')
        }
      } catch (error) {
        console.error('Error viewing detail:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat detail')
      }
    },

    async exportSinglePDF(item) {
      try {
        await this.$_api.downloadFile('/rad_expertise/export-pdf', {
          id: item.id
        })

        this.$_alert.success('PDF berhasil diunduh')
      } catch (error) {
        console.error('Error exporting PDF:', error)
        this.$_alert.error('Terjadi kesalahan saat export PDF')
      }
    },

    async printExpertise(item) {
      try {
        // Get detailed data for printing
        const response = await this.$_api.post('/rad_expertise/detailsById', {
          id: item.id
        })

        if (response.status === 200) {
          // Prepare print data with additional information from rad_hasil
          const expertiseData = response.data

          // Get related rad_hasil data for complete patient information
          const radHasilResponse = await this.$_api.post('/rad_hasil/list', {
            rad_regis_id: expertiseData.rad_regis_id,
            limit: 1
          })

          const radRegisResponse = await this.$_api.post('/rad_regis/list', {
            id: expertiseData.rad_regis_id,
            limit: 1
          })

          // Combine data for printing
          this.printData = {
            ...expertiseData,
            // Add patient data from rad_regis if available
            ...(radRegisResponse.data && radRegisResponse.data[0] ? {
              no_rm: radRegisResponse.data[0].no_rm,
              alamat_sekarang: radRegisResponse.data[0].alamat_sekarang,
              no_kunjungan: radRegisResponse.data[0].no_kunjungan,
              tgl_registrasi: radRegisResponse.data[0].tgl_registrasi,
              nama_dokter_pengirim: radRegisResponse.data[0].nama_dokter || radRegisResponse.data[0].nama_dokter_pengirim,
              klinis: radRegisResponse.data[0].klinis || radRegisResponse.data[0].anamnesa,
              indikasi: radRegisResponse.data[0].indikasi || radRegisResponse.data[0].diagnosa_klinis
            } : {}),
            // Add examination data from rad_hasil if available
            ...(radHasilResponse.data && radHasilResponse.data[0] ? {
              nama_rad_test: radHasilResponse.data[0].nama_rad_test,
              hasil_pemeriksaan: radHasilResponse.data[0].hasil,
              keterangan_pemeriksaan: radHasilResponse.data[0].keterangan_rad_hasil
            } : {})
          }

          // Print the expertise
          await this.printExpertiseDocument()
        } else {
          this.$_alert.error('Gagal memuat data expertise untuk cetak')
        }
      } catch (error) {
        console.error('Error preparing print data:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat data untuk cetak')
      }
    },

    async printExpertiseDocument() {
      let options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          '/static/assets/cetak/paper-a4.css',
        ],
        timeout: 1000,
        autoClose: true,
        windowTitle: 'Laporan Expertise Radiologi',
      }

      try {
        print('cetak-rad-expertise', options)
        this.$_alert.success('Laporan expertise radiologi berhasil dicetak')
      } catch (error) {
        console.error('Error printing expertise:', error)
        this.$_alert.error('Terjadi kesalahan saat mencetak laporan')
      }
    },

    async printMultipleExpertise() {
      if (!this.selectedItems.length) {
        this.$_alert.error('Pilih setidaknya satu data untuk cetak')
        return
      }

      // Confirm printing multiple documents
      const confirmResult = await this.$_alert.confirm(
        `Apakah Anda yakin ingin mencetak ${this.selectedItems.length} laporan expertise? Setiap laporan akan dibuka di tab baru.`,
        'Konfirmasi Cetak Multiple',
        'Ya, Cetak',
        'Batal'
      )

      if (!confirmResult) {
        return
      }

      let successCount = 0
      let failCount = 0

      for (const itemId of this.selectedItems) {
        try {
          const item = this.data.find(d => d.id === itemId)
          if (item) {
            await this.printExpertise(item)
            successCount++
          }
        } catch (error) {
          console.error(`Error printing item ${itemId}:`, error)
          failCount++
        }
      }

      if (successCount > 0) {
        this.$_alert.success(`${successCount} laporan berhasil dicetak${failCount > 0 ? ` (${failCount} gagal)` : ''}`)
      } else {
        this.$_alert.error('Semua laporan gagal dicetak')
      }
    },

    // Comprehensive Report Functions
    async showComprehensiveReportModal() {
      if (!this.selectedItems.length) {
        this.$_alert.warning('Pilih setidaknya satu data untuk membuat laporan lengkap')
        return
      }

      // Reset options to default
      this.pdfOptions = {
        includeImages: false,
        includeTechnicalDetails: true,
        includeComparison: true,
        includeSignatures: false,
        reportFormat: 'standard'
      }

      this.showComprehensiveModal = true
    },

  
    async previewComprehensiveReport() {
      this.isGeneratingReport = true

      try {
        // Get data first
        const selectedItemData = this.data.find(item => item.id === this.selectedItems[0])
        if (!selectedItemData || !selectedItemData.rad_regis_id) {
          throw new Error('Data registrasi radiologi tidak ditemukan')
        }

        // Generate PDF for preview

        const response = await this.$_api.post('/rad_expertise/comprehensive-report/pdf', {
          rad_regis_id: selectedItemData.rad_regis_id,
          ...this.pdfOptions
        }, {
          responseType: 'blob'
        })

        // Create blob URL for preview
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
        const pdfUrl = URL.createObjectURL(pdfBlob)

        // Open in new tab
        window.open(pdfUrl, '_blank')

        this.$_alert.success('Preview laporan berhasil dibuka')
      } catch (error) {
        console.error('Error previewing comprehensive report:', error)
        this.$_alert.error(error.message || 'Gagal membuat preview laporan lengkap')
      } finally {
        this.isGeneratingReport = false
      }
    },

    async downloadComprehensiveReport() {
      this.isGeneratingReport = true

      try {
        // Validate selection
        if (this.selectedItems.length === 0) {
          throw new Error('Pilih setidaknya satu data untuk diunduh')
        }

        // Confirm for multiple items
        if (this.selectedItems.length > 1) {
          const confirmResult = await this.$_alert.confirm(
            `Anda akan mengunduh ${this.selectedItems.length} laporan lengkap. Proses ini mungkin memakan waktu beberapa saat. Lanjutkan?`,
            'Konfirmasi Download Multiple',
            'Ya, Lanjutkan',
            'Batal'
          )

          if (!confirmResult) {
            this.isGeneratingReport = false
            return
          }
        }

        if (this.selectedItems.length === 1) {
          // Single report download
          const selectedItemData = this.data.find(item => item.id === this.selectedItems[0])

          await this.$_api.downloadFile('/rad_expertise/comprehensive-report/pdf', {
            rad_regis_id: selectedItemData.rad_regis_id,
            ...this.pdfOptions
          })

          this.$_alert.success('Laporan lengkap berhasil diunduh')
        } else {
          // Multiple reports download (download one by one)
          let successCount = 0
          let failCount = 0

          for (const itemId of this.selectedItems) {
            try {
              const itemData = this.data.find(item => item.id === itemId)
              await this.$_api.downloadFile('/rad_expertise/comprehensive-report/pdf', {
                rad_regis_id: itemData.rad_regis_id,
                ...this.pdfOptions
              })
              successCount++
            } catch (error) {
              console.error(`Error downloading report for item ${itemId}:`, error)
              failCount++
            }
          }

          if (successCount > 0) {
            this.$_alert.success(`${successCount} laporan berhasil diunduh${failCount > 0 ? ` (${failCount} gagal)` : ''}`)
          } else {
            throw new Error('Semua laporan gagal diunduh')
          }
        }

        // Close modal and clear selection
        this.showComprehensiveModal = false
        this.selectedItems = []

      } catch (error) {
        console.error('Error downloading comprehensive report:', error)
        this.$_alert.error(error.message || 'Gagal mengunduh laporan lengkap')
      } finally {
        this.isGeneratingReport = false
      }
    },

    async exportMultiplePDF() {
      if (!this.selectedItems.length) {
        this.$_alert.error('Pilih setidaknya satu data untuk export')
        return
      }

      // Konfirmasi sebelum export
      const confirmResult = await this.$_alert.confirm(
        `Apakah Anda yakin ingin mengekspor ${this.selectedItems.length} expertise ke PDF?`,
        'Konfirmasi Export',
        'Ya, Export',
        'Batal'
      )

      if (!confirmResult) {
        return
      }

      this.selectedItems.forEach((id) => {
        this.exportSinglePDF({id});
      })

      // try {
        
      //   console.log('===> rad_expertise.vue:1107 ~ ', );
      //   await this.$_api.downloadFile('/rad_expertise/export-multiple-pdf', {
      //     ids: this.selectedItems
      //   })

        this.$_alert.success(`Berhasil mengekspor ${this.selectedItems.length} expertise ke PDF`)

      //   // Clear selection setelah export berhasil
      //   this.selectedItems = []
      // } catch (error) {
      //   console.error('Error exporting multiple PDF:', error)
      //   this.$_alert.error('Terjadi kesalahan saat export PDF')
      // }
    },

    showCreateModal() {
      this.isEdit = false
      this.resetForm()

      // Pre-select rad_hasil_id if provided
      if (this.rad_hasil_id) {
        this.formData.rad_hasil_id = this.rad_hasil_id
      }

      this.showModal = true
    },

    async editExpertise(item) {
      try {
        // Show loading state
        this.isLoading = true
        
        // Get full expertise data from server
        const response = await this.$_api.post('/rad_expertise/detailsById', {
          id: item.id
        })

        if (response.status === 200) {
          this.isEdit = true
          this.selectedItem = response.data
          this.formData = {
            rad_hasil_id: response.data.rad_hasil_id,
            temuan: response.data.temuan || '',
            kesimpulan: response.data.kesimpulan || '',
            saran: response.data.saran || '',
            status_expertise: response.data.status_expertise || 'draft',
            additional_findings: response.data.additional_findings || '',
            measurements: response.data.measurements || '',
            comparison_notes: response.data.comparison_notes || '',
            technique: response.data.technique || '',
            clinical_correlation: response.data.clinical_correlation || '',
            limitations: response.data.limitations || '',
            urgency_level: response.data.urgency_level || 'routine',
            report_type: response.data.report_type || 'final',
            critical_findings: response.data.critical_findings || false,
            technique_used: response.data.technique_used || '',
            assigned_radiolog: response.data.radiolog_id || ''
          }

          // Handle primary_image from backend response
          this.existingImageUrl = response.data.primary_image || ''
          this.imageUrl = '' // Clear new image preview when editing
          this.selectedFile = null
          this.selectedFileName = ''

          // Store original data for change detection
          this.originalFormData = JSON.parse(JSON.stringify(this.formData))
          this.showModal = true
        } else {
          this.$_alert.error(response.message || 'Gagal memuat data expertise')
        }
      } catch (error) {
        console.error('Error loading expertise data:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat data expertise')
      } finally {
        this.isLoading = false
      }
    },

    confirmDelete(item) {
      this.selectedItem = item
      this.showDeleteModal = true
    },

    showDashboardModalNew() {
      this.loadDashboard()
      this.showDashboardModal = true
    },

    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedItems = []
      } else {
        this.selectedItems = this.data.map(item => item.id)
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.currentPage = page
        this.loadData()
      }
    },

    getVisiblePages() {
      const totalPages = this.pagination.totalPages
      const currentPage = this.currentPage
      const delta = 2

      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages)
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots.filter((item, index, arr) => item !== arr[index - 1])
    },

    resetFilters() {
      this.filters = {
        status: '',
        rad_hasil_id: '',
        search: ''
      }
      this.currentPage = 1
      this.loadData()
    },

    resetForm() {
      this.formData = {
        rad_hasil_id: '',
        temuan: '',
        kesimpulan: '',
        saran: '',
        status_expertise: 'draft',
        additional_findings: '',
        measurements: '',
        comparison_notes: '',
        technique: '',
        clinical_correlation: '',
        limitations: '',
        urgency_level: 'routine',
        report_type: 'final',
        critical_findings: false,
        technique_used: '',
        assigned_radiolog: ''
      }
      this.selectedItem = null
      this.originalFormData = null

      // Reset image upload states
      this.selectedFile = null
      this.selectedFileName = ''
      this.imageUrl = ''
      this.existingImageUrl = ''
      this.uploadProgress = 0

      // Reset file input
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },

    formatDate(date) {
      if (!date) return '-'
      return moment(date).format('DD MMM YYYY')
    },

    formatDateTime(date) {
      if (!date) return '-'
      return moment(date).format('DD MMM YYYY HH:mm')
    },
    formatGender(jk) {
      if (!jk) return '-'
      return jk === 'L' ? 'Laki-laki' : jk === 'P' ? 'Perempuan' : jk
    },
    calcAge(dob) {
      if (!dob) return '-'
      const mDob = moment(dob)
      if (!mDob.isValid()) return '-'
      const years = moment().diff(mDob, 'years')
      return `${years} th`
    },

    getStatusBadgeClass(status) {
      const statusClasses = {
        draft: 'badge badge-secondary',
        submitted: 'badge badge-warning',
        second_opinion: 'badge badge-info',
        peer_review: 'badge badge-warning',
        final: 'badge badge-success'
      }
      return statusClasses[status] || 'badge badge-secondary'
    },

    getStatusText(status) {
      const statusTexts = {
        draft: 'Draft',
        submitted: 'Submitted',
        second_opinion: 'Second Opinion',
        peer_review: 'Peer Review',
        final: 'Final'
      }
      return statusTexts[status] || status
    },

    isFieldChanged(fieldName) {
      if (!this.isEdit || !this.originalFormData) return false
      
      return this.formData[fieldName] !== this.originalFormData[fieldName]
    },

    onModalHide(bvModalEvent) {
      // Check if there are unsaved changes
      if (this.isEdit && this.hasChanges) {
        bvModalEvent.preventDefault()

        this.$_alert.confirm(
          'Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin menutup form ini?',
          'Konfirmasi Tutup',
          'Ya, Tutup',
          'Batal'
        ).then((result) => {
          if (result) {
            this.showModal = false
            this.resetForm()
          }
        })
      }
    },

    // File Upload Methods
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.$_alert.error('File harus berupa gambar (JPG, PNG, GIF)')
        event.target.value = ''
        return
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        this.$_alert.error('Ukuran file maksimal 5MB')
        event.target.value = ''
        return
      }

      this.selectedFile = file
      this.selectedFileName = file.name

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },

    removeImage() {
      this.selectedFile = null
      this.selectedFileName = ''
      this.imageUrl = ''
      this.existingImageUrl = ''
      this.uploadProgress = 0

      // Reset file input
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },

    handleImageError(event) {
      event.target.src = '/static/img/no-image.png'
    },

    async uploadImage() {
      if (!this.selectedFile) return null

      try {
        const formData = new FormData()
        formData.append('file1', this.selectedFile)

        const response = await this.$_api.uploadFile('/rad_expertise/upload-image', formData, {
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        })

        if (response.status === 200) {
          this.uploadProgress = 0
          return response.data
        } else {
          throw new Error(response.message || 'Upload gagal')
        }
      } catch (error) {
        console.error('Upload error:', error)
        this.uploadProgress = 0
        throw error
      }
    },

    openImageModal(imageUrl) {
      this.modalImageUrl = imageUrl
      this.showImageModal = true
    },
  },

  computed: {
    isAllSelected() {
      return this.data.length > 0 && this.selectedItems.length === this.data.length
    },
    hasChanges() {
      if (!this.isEdit || !this.originalFormData) return false
      
      return JSON.stringify(this.formData) !== JSON.stringify(this.originalFormData)
    }
  },
}
</script>

<style scoped>
.card {
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.table th {
  border-top: none;
  font-weight: 600;
  font-size: 0.85rem;
}

.table td {
  font-size: 0.85rem;
}

.badge {
  font-size: 0.75rem;
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

/* Border left colors for stat cards */
.border-left-primary {
  border-left: 0.25rem solid #4e73df !important;
}

.border-left-success {
  border-left: 0.25rem solid #1cc88a !important;
}

.border-left-info {
  border-left: 0.25rem solid #36b9cc !important;
}

.border-left-warning {
  border-left: 0.25rem solid #f6c23e !important;
}

.text-xs {
  font-size: 0.7rem;
}

.font-weight-bold {
  font-weight: 700 !important;
}

.text-gray-800 {
  color: #5a5c69 !important;
}

.text-gray-300 {
  color: #dddfeb !important;
}

.card.text-center {
  min-height: 80px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.alert {
  border-left: 4px solid #f6c23e;
}

.prewrap {
  white-space: pre-wrap;
  word-break: break-word;
}

/* Style for changed fields */
.is-changed {
  border-color: #f6c23e !important;
  background-color: #fff8e1 !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25) !important;
}

.is-changed:focus {
  border-color: #f6c23e !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25) !important;
}

/* Animation for changed fields */
.is-changed {
  transition: all 0.3s ease;
}

/* Loading spinner animation */
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Comprehensive Report Modal Styles */
.card-header {
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
}

.card-header h6 {
  color: #5a5c69;
  font-weight: 600;
}

.form-check-input:checked {
  background-color: #4e73df;
  border-color: #4e73df;
}

.form-check-label {
  font-weight: 500;
  color: #5a5c69;
}

.btn-primary {
  background-color: #4e73df;
  border-color: #4e73df;
}

.btn-primary:hover {
  background-color: #2e59d9;
  border-color: #2653d4;
}

.btn-success {
  background-color: #1cc88a;
  border-color: #1cc88a;
}

.btn-success:hover {
  background-color: #17a673;
  border-color: #149b6a;
}

/* Modal body scrolling */
.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}

/* Report format select styling */
select.form-control:focus {
  border-color: #bac8f3;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

/* Image Upload Styles */
.custom-file-upload {
  position: relative;
  display: inline-block;
  width: 100%;
}

.custom-file-upload input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.custom-file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 60px;
}

.custom-file-upload-label:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

.custom-file-upload-label i {
  font-size: 1.5rem;
  color: #6c757d;
  margin-right: 8px;
}

.custom-file-upload-label span {
  color: #495057;
  font-weight: 500;
}

.custom-file-upload-label .text-truncate {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-preview-container {
  position: relative;
}

.image-preview {
  position: relative;
  display: inline-block;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.remove-image-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Progress bar styling */
.progress {
  height: 6px;
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar {
  background-color: #4e73df;
  transition: width 0.3s ease;
}

/* Modal image styling */
.modal-body {
  padding: 1rem;
  text-align: center;
}

.modal-body img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* Print Styles for Expertise Radiologi */
#cetak-rad-expertise {
  font-family: 'Times New Roman', Times, serif;
  font-size: 12pt;
  line-height: 1.5;
}

#cetak-rad-expertise .custom-table {
  border-collapse: collapse;
  width: 100%;
}

#cetak-rad-expertise .custom-table td {
  padding: 3px 5px;
  border: 1px solid #ddd;
  vertical-align: top;
}

#cetak-rad-expertise .custom-table th {
  padding: 5px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-weight: bold;
  text-align: center;
}

#cetak-rad-expertise .line {
  border-bottom: 2px solid #000;
}

#cetak-rad-expertise .w-100-flex {
  display: flex;
  width: 100%;
}

#cetak-rad-expertise h6 {
  margin: 5px 0;
  font-size: 12pt;
}

#cetak-rad-expertise strong {
  font-weight: bold;
}

#cetak-rad-expertise u {
  text-decoration: underline;
}

@media print {
  #cetak-rad-expertise {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.4;
  }

  #cetak-rad-expertise .custom-table {
    page-break-inside: avoid;
  }

  #cetak-rad-expertise .w-100-flex {
    display: flex;
    width: 100%;
  }

  #cetak-rad-expertise h6 {
    margin: 3px 0;
    font-size: 11pt;
  }

  #cetak-rad-expertise .content-print {
    margin: 0;
    padding: 0;
  }

  #cetak-rad-expertise .sheet {
    padding: 15mm;
  }

  /* Hide footer elements in print */
  #cetak-rad-expertise .small:last-child {
    display: none;
  }
}
</style>