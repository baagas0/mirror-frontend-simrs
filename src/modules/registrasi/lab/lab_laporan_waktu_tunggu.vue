<template>
  <div class="w-100 container">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4">
          <i class="ri-time-line"></i>
          Laporan Waktu Tunggu Laboratorium
        </h4>

        <!-- Filter Section -->
        <div class="row mb-4">
          <div class="col-md-3">
            <label for="startDate" class="form-label">Tanggal Awal</label>
            <date-picker
              v-model="filters.startDate"
              :config="datePickerConfig"
              class="form-control"
              placeholder="Pilih tanggal awal"
            />
          </div>
          <div class="col-md-3">
            <label for="endDate" class="form-label">Tanggal Akhir</label>
            <date-picker
              v-model="filters.endDate"
              :config="datePickerConfig"
              class="form-control"
              placeholder="Pilih tanggal akhir"
            />
          </div>
          <div class="col-md-2">
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
              <option value="3">Selesai</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="is_cito" class="form-label">CITO</label>
            <select
              v-model="filters.is_cito"
              class="form-control"
              id="is_cito"
            >
              <option value="">Semua</option>
              <option value="true">Ya</option>
              <option value="false">Tidak</option>
            </select>
          </div>
          <div class="col-md-2">
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
        </div>

        <!-- Action Buttons -->
        <div class="row mb-3">
          <div class="col-12">
            <button
              class="btn btn-primary mr-2"
              @click="loadData"
              :disabled="isLoading"
            >
              <i class="ri-search-line" :class="{ 'spinner-border spinner-border-sm': isLoading }"></i>
              Cari Data
            </button>
            <button
              class="btn btn-success mr-2"
              @click="exportPDF"
              :disabled="isLoading || !data.length"
            >
              <i class="ri-file-pdf-line" :class="{ 'spinner-border spinner-border-sm': isExporting }"></i>
              Export PDF
            </button>
            <button
              class="btn btn-secondary"
              @click="resetFilters"
            >
              <i class="ri-refresh-line"></i>
              Reset
            </button>
          </div>
        </div>

        <!-- Statistik Cards -->
        <div class="row mb-4" v-if="statistik">
          <div class="col-md-3">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Data</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ statistik.total_data || 0 }}</div>
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
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Selesai</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ statistik.total_selesai || 0 }}</div>
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
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">CITO</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ statistik.total_cito || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-alarm-warning-line fa-2x text-gray-300"></i>
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
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Rata-rata Waktu</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ Math.round(statistik.rata_total || 0) }} menit</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-timer-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="table-responsive">
          <table class="table table-hover table-sm">
            <thead class="thead-light">
              <tr>
                <th>No</th>
                <th>Tanggal Permintaan</th>
                <th>No. RM</th>
                <th>Nama Pasien</th>
                <th>Request → Ambil</th>
                <th>Ambil → Selesai</th>
                <th>Total Waktu</th>
                <th>Status</th>
                <th>CITO</th>
                <th>Dokter</th>
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
                <td>
                  <strong>{{ item.tanggal_request | parse('date') }}</strong>
                </td>
                <td>
                  <strong>{{ item.no_rm }}</strong>
                </td>
                <td>
                  <div>{{ item.nama_lengkap }}</div>
                  <small class="text-muted">{{ item.jenis_kelamin === 'L' ? 'L' : 'P' }}</small>
                </td>
                <td>
                  <span v-if="item.waktu_request_ambil" :class="getWaktuBadgeClass(item.waktu_request_ambil.totalMenit)">
                    <i class="ri-timer-line"></i>
                    {{ item.waktu_request_ambil.formatted }}
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>
                <td>
                  <span v-if="item.tanggal_ambil_sampel && item.status === 3" :class="getWaktuBadgeClass(calculateWaktuAmbilSelesai(item))">
                    <i class="ri-timer-line"></i>
                    {{ calculateWaktuAmbilSelesaiFormatted(item) }}
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>
                <td>
                  <span v-if="item.waktu_total" :class="getWaktuBadgeClass(item.waktu_total.totalMenit)">
                    <strong>{{ item.waktu_total.formatted }}</strong>
                  </span>
                  <span v-else class="text-muted">-</span>
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
                  <small>{{ item.nama_dokter || '-' }}</small>
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
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'LabLaporanWaktuTunggu',
  components: {
    DatePicker
  },
  data() {
    return {
      // Filters
      filters: {
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        status: '',
        is_cito: '',
        search: ''
      },

      // Data
      data: [],
      statistik: null,

      // Loading states
      isLoading: false,
      isExporting: false,

      // Pagination
      currentPage: 1,
      perPage: 10,
      pagination: {
        total: 0,
        totalPages: 0
      },

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
        const response = await this.$_api.post('/lab_laporan/waktu-tunggu', {
          page: this.currentPage,
          perPage: this.perPage,
          ...this.filters
        })

        if (response.status === 200) {
          this.data = response.data
          this.statistik = response.statistik
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

    async exportPDF() {
      if (!this.data.length) {
        this.$_alert.warning('Tidak ada data untuk diekspor')
        return
      }

      this.isExporting = true

      try {
        await this.$_api.downloadFile('/lab_laporan/waktu-tunggu/exportPdf', {
          ...this.filters
        })

        this.$_alert.success('PDF berhasil diunduh')
      } catch (error) {
        console.error('Error exporting PDF:', error)
        this.$_alert.error('Terjadi kesalahan saat mengekspor PDF')
      } finally {
        this.isExporting = false
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
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        status: '',
        is_cito: '',
        search: ''
      }
      this.currentPage = 1
      this.loadData()
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
    },

    getWaktuBadgeClass(menit) {
      if (!menit) return 'text-muted'

      if (menit <= 30) {
        return 'badge badge-success'
      } else if (menit <= 60) {
        return 'badge badge-warning'
      } else {
        return 'badge badge-danger'
      }
    },

    calculateWaktuAmbilSelesai(item) {
      if (!item.tanggal_ambil_sampel || item.status !== 3) return null

      const ambil = new Date(item.tanggal_ambil_sampel)
      const selesai = new Date()
      const selisihMs = selesai - ambil

      return Math.floor(selisihMs / (1000 * 60))
    },

    calculateWaktuAmbilSelesaiFormatted(item) {
      const menit = this.calculateWaktuAmbilSelesai(item)
      if (!menit) return '-'

      const jam = Math.floor(menit / 60)
      const sisaMenit = menit % 60

      return jam > 0 ? `${jam}j ${sisaMenit}m` : `${menit}m`
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
  font-size: 0.85rem;
}

.table td {
  font-size: 0.85rem;
}

.badge {
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
</style>