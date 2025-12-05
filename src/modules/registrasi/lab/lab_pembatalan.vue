<template>
  <div class="w-100 container">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4">
          <i class="ri-close-circle-line"></i>
          Pembatalan Pemeriksaan Laboratorium
        </h4>

        <!-- Filter Section -->
        <div class="row mb-4">
          <div class="col-md-4">
            <label for="search" class="form-label">Cari Pasien</label>
            <input
              type="text"
              v-model="filters.search"
              class="form-control"
              id="search"
              placeholder="Nama atau No. RM"
              @keyup.enter="loadData"
            />
          </div>
          <div class="col-md-3">
            <label for="status" class="form-label">Status</label>
            <select
              v-model="filters.status"
              class="form-control"
              id="status"
            >
              <option value="">Semua Status</option>
              <option value="0">Baru</option>
              <option value="1">Proses</option>
              <option value="2">Sampel Diambil</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="startDate" class="form-label">Tanggal Request</label>
            <date-picker
              v-model="filters.startDate"
              :config="datePickerConfig"
              class=""
              placeholder="Tanggal awal"
            />
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button
              class="btn btn-primary btn-block"
              @click="loadData"
              :disabled="isLoading"
            >
              <i class="ri-search-line" :class="{ 'spinner-border spinner-border-sm': isLoading }"></i>
              Cari
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="row mb-3">
          <div class="col-12">
            <button
              class="btn btn-secondary mr-2"
              @click="resetFilters"
            >
              <i class="ri-refresh-line"></i>
              Reset Filter
            </button>
            <button
              class="btn btn-info"
              @click="$router.push('/registrasi/lab/lab_laporan_pembatalan')"
            >
              <i class="ri-file-list-line"></i>
              Lihat Laporan Pembatalan
            </button>
          </div>
        </div>

        <!-- Data Table -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th>No</th>
                <th>Tanggal Request</th>
                <th>No. RM</th>
                <th>Nama Pasien</th>
                <th>Dokter</th>
                <th>Paket Lab</th>
                <th>Status</th>
                <th>CITO</th>
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
              <tr v-for="(item, index) in data" :key="item.lab_regis_id">
                <td>{{ ((currentPage - 1) * perPage) + index + 1 }}</td>
                <td>{{ formatDate(item.tanggal_request) }}</td>
                <td>
                  <strong>{{ item.no_rm }}</strong>
                </td>
                <td>
                  <div>{{ item.nama_lengkap }}</div>
                  <small class="text-muted">{{ item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</small>
                </td>
                <td>
                  <small>{{ item.nama_dokter || '-' }}</small>
                </td>
                <td>
                  <small>{{ item.nama_paket || '-' }}</small>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(item.status)">
                    {{ item.status_text }}
                  </span>
                </td>
                <td>
                  <span v-if="item.is_cito" class="badge badge-danger">
                    <i class="ri-alarm-warning-line"></i>
                    YA
                  </span>
                  <span v-else class="badge badge-secondary">
                    TIDAK
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="showConfirmDialog(item)"
                    title="Batalkan Pemeriksaan"
                    :disabled="item.status === 3"
                  >
                    <i class="ri-close-line"></i>
                    Batal
                  </button>
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

    <!-- Confirmation Modal -->
    <b-modal
      v-model="showModal"
      size="md"
      title="Konfirmasi Pembatalan"
      @ok="prosesPembatalan"
      :ok-disabled="!alasanPembatalan || isProcessing"
      ok-title="Batalkan Pemeriksaan"
      ok-variant="danger"
      cancel-title="Tutup"
    >
      <div v-if="selectedItem">
        <div class="alert alert-warning">
          <i class="ri-error-warning-line"></i>
          <strong>Perhatian!</strong> Tindakan ini akan membatalkan pemeriksaan laboratorium untuk pasien berikut:
        </div>

        <!-- Informasi Pasien -->
        <div class="row mb-3">
          <div class="col-12">
            <h6>Informasi Pasien:</h6>
            <table class="table table-sm table-borderless">
              <tr>
                <td width="150"><strong>No. RM:</strong></td>
                <td>{{ selectedItem.no_rm }}</td>
              </tr>
              <tr>
                <td><strong>Nama:</strong></td>
                <td>{{ selectedItem.nama_lengkap }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Request:</strong></td>
                <td>{{ formatDate(selectedItem.tanggal_request) }}</td>
              </tr>
              <tr>
                <td><strong>Dokter:</strong></td>
                <td>{{ selectedItem.nama_dokter || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Paket Lab:</strong></td>
                <td>{{ selectedItem.nama_paket || '-' }}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Alasan Pembatalan -->
        <div class="row">
          <div class="col-12">
            <label for="alasanPembatalan" class="form-label">
              <strong>Alasan Pembatalan <span class="text-danger">*</span></strong>
            </label>
            <textarea
              id="alasanPembatalan"
              v-model="alasanPembatalan"
              class="form-control"
              rows="4"
              placeholder="Masukkan alasan pembatalan pemeriksaan..."
              required
            ></textarea>
            <small class="form-text text-muted">
              Contoh: Pasien menolak, alat rusak, sampel tidak memadai, dll.
            </small>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'LabPembatalan',
  components: {
    DatePicker
  },
  data() {
    return {
      // Filters
      filters: {
        search: '',
        status: '',
        startDate: null
      },

      // Data
      data: [],
      selectedItem: null,
      alasanPembatalan: '',

      // Loading states
      isLoading: false,
      isProcessing: false,

      // Pagination
      currentPage: 1,
      perPage: 10,
      pagination: {
        total: 0,
        totalPages: 0
      },

      // Modal
      showModal: false,

      // Configs
      datePickerConfig: {
        format: 'YYYY-MM-DD',
        locale: 'id',
        useCurrent: false
      }
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {
    async loadData() {
      this.isLoading = true

      try {
        // Gunakan endpoint list lab_regis untuk menampilkan data yang bisa dibatalkan
        const response = await this.$_api.post('/lab_laporan/list', {
          page: this.currentPage,
          perPage: this.perPage,
          ...this.filters,
          // Exclude status 3 (Selesai) karena tidak bisa dibatalkan
          ...(this.filters.status === '' ? { status: '0,1,2' } : {})
        })

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

    async prosesPembatalan() {
      if (!this.selectedItem || !this.alasanPembatalan) {
        return
      }

      this.isProcessing = true

      try {
        const response = await this.$_api.post('/lab_laporan/pembatalan/proses', {
          id: this.selectedItem.lab_regis_id,
          alasan_pembatalan: this.alasanPembatalan
        })

        if (response.status === 200) {
          this.$_alert.success(response.message || 'Pemeriksaan berhasil dibatalkan')
          this.showModal = false
          this.resetForm()
          this.loadData() // Refresh data
        } else {
          this.$_alert.error(response.message || 'Gagal membatalkan pemeriksaan')
        }
      } catch (error) {
        console.error('Error pembatalan:', error)
        this.$_alert.error('Terjadi kesalahan saat membatalkan pemeriksaan')
      } finally {
        this.isProcessing = false
      }
    },

    showConfirmDialog(item) {
      this.selectedItem = item
      this.alasanPembatalan = ''
      this.showModal = true
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
        search: '',
        status: '',
        startDate: null
      }
      this.currentPage = 1
      this.loadData()
    },

    resetForm() {
      this.selectedItem = null
      this.alasanPembatalan = ''
    },

    formatDate(date) {
      if (!date) return '-'
      return moment(date).format('DD MMM YYYY')
    },

    getStatusBadgeClass(status) {
      switch(status) {
        case 0: return 'badge badge-secondary'
        case 1: return 'badge badge-warning'
        case 2: return 'badge badge-info'
        case 3: return 'badge badge-success'
        default: return 'badge badge-secondary'
      }
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.table th {
  border-top: none;
  font-weight: 600;
}

.badge {
  font-size: 0.75rem;
}

.alert {
  border-left: 4px solid #f6c23e;
}

.form-control[required] {
  border-color: #ddd;
}
</style>