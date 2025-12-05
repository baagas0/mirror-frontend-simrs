<template>
  <div class="w-100 container">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4">
          <i class="ri-file-list-line"></i>
          Laporan Pembatalan Laboratorium
        </h4>

        <!-- Filter Section -->
        <div class="row mb-4">
          <div class="col-md-3">
            <label for="startDate" class="form-label">Tanggal Awal (Dibatalkan)</label>
            <date-picker
              v-model="filters.startDate"
              :config="datePickerConfig"
              class=""
              placeholder="Pilih tanggal awal"
            />
          </div>
          <div class="col-md-3">
            <label for="endDate" class="form-label">Tanggal Akhir (Dibatalkan)</label>
            <date-picker
              v-model="filters.endDate"
              :config="datePickerConfig"
              class=""
              placeholder="Pilih tanggal akhir"
            />
          </div>
          <div class="col-md-2">
            <label for="alasan_batal" class="form-label">Alasan Pembatalan</label>
            <input
              type="text"
              v-model="filters.alasan_batal"
              class="form-control"
              id="alasan_batal"
              placeholder="Filter alasan"
            />
          </div>
          <div class="col-md-2">
            <label for="user_batal" class="form-label">User Pembatal</label>
            <input
              type="text"
              v-model="filters.user_batal"
              class="form-control"
              id="user_batal"
              placeholder="Filter user"
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

        <!-- Additional Filter -->
        <div class="row mb-4">
          <div class="col-md-3">
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
          <div class="col-md-9 d-flex align-items-end">
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
            <button
              class="btn btn-info ml-2"
              @click="$router.push('/registrasi/lab/lab_pembatalan')"
            >
              <i class="ri-close-circle-line"></i>
              Pembatalan Pemeriksaan
            </button>
          </div>
        </div>

        <!-- Statistik Cards -->
        <div class="row mb-4" v-if="statistik">
          <div class="col-md-3">
            <div class="card border-left-danger shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Total Pembatalan</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ statistik.total_pembatalan || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-close-circle-line fa-2x text-gray-300"></i>
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
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Batal Karena Pasien</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ statistik.total_batal_karena_pasien || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-user-unfollow-line fa-2x text-gray-300"></i>
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
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Batal Karena Alat</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ statistik.total_batal_karena_alat || 0 }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-tools-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-left-secondary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-secondary text-uppercase mb-1">Rata-rata Waktu</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ Math.round(statistik.rata_waktu_sebelum_batal || 0) }} menit</div>
                  </div>
                  <div class="col-auto">
                    <i class="ri-timer-line fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistik Hari -->
        <div class="row mb-4" v-if="statistik">
          <div class="col-12">
            <h6>Distribusi Pembatalan per Hari:</h6>
            <div class="row">
              <div class="col-md-2 col-4 mb-2" v-for="(day, index) in hariListWithCount" :key="index">
                <div class="card text-center">
                  <div class="card-body p-2">
                    <small class="text-muted">{{ day.name }}</small>
                    <h6 class="mb-0">{{ day.count }}</h6>
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
                <th>Tanggal Batal</th>
                <th>No. RM</th>
                <th>Nama Pasien</th>
                <th>Tanggal Request</th>
                <th>Status Awal</th>
                <th>Waktu ke Batal</th>
                <th>Alasan Pembatalan</th>
                <th>User Pembatal</th>
                <th>CITO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading && !data.length">
                <td colspan="10" class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="!data.length">
                <td colspan="10" class="text-center text-muted">
                  <i class="ri-inbox-line"></i>
                  Tidak ada data
                </td>
              </tr>
              <tr v-for="(item, index) in data" :key="item.lab_regis_id">
                <td>{{ ((currentPage - 1) * perPage) + index + 1 }}</td>
                <td>
                  <strong>{{ formatDate(item.tanggal_hapus) }}</strong>
                  <br>
                  <small class="text-muted">{{ formatTime(item.tanggal_hapus) }}</small>
                </td>
                <td>
                  <strong>{{ item.no_rm }}</strong>
                </td>
                <td>
                  <div>{{ item.nama_lengkap }}</div>
                  <small class="text-muted">{{ item.jenis_kelamin === 'L' ? 'L' : 'P' }}</small>
                </td>
                <td>
                  <div>{{ formatDate(item.tanggal_request) }}</div>
                  <small class="text-muted">{{ formatTime(item.tanggal_request) }}</small>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(item.status_sebelum_batal)">
                    {{ getStatusText(item.status_sebelum_batal) }}
                  </span>
                </td>
                <td>
                  <span v-if="item.menit_request_batal" :class="getWaktuBadgeClass(item.menit_request_batal)">
                    {{ formatWaktu(item.menit_request_batal) }}
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>
                <td>
                  <div>
                    <small>{{ truncateText(item.alasan_pembatalan, 30) }}</small>
                    <button
                      v-if="item.alasan_pembatalan && item.alasan_pembatalan.length > 30"
                      class="btn btn-sm btn-link p-0 ml-1"
                      @click="showFullAlasan(item.alasan_pembatalan)"
                      title="Lihat alasan lengkap"
                    >
                      <i class="ri-eye-line"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <small>{{ item.user_batal || '-' }}</small>
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

    <!-- Alasan Lengkap Modal -->
    <b-modal
      v-model="showAlasanModal"
      size="md"
      title="Alasan Pembatalan Lengkap"
      ok-only
      ok-title="Tutup"
    >
      <div>
        <p>{{ fullAlasan }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'LabLaporanPembatalan',
  components: {
    DatePicker
  },
  data() {
    return {
      // Filters
      filters: {
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        alasan_batal: '',
        user_batal: '',
        search: ''
      },

      // Data
      data: [],
      statistik: null,
      fullAlasan: '',

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

      // Modal
      showAlasanModal: false,

      // Configs
      datePickerConfig: {
        format: 'YYYY-MM-DD',
        locale: 'id',
        useCurrent: false
      },

      hariList: [
        { name: 'Minggu', key: 'pembatalan_minggu' },
        { name: 'Senin', key: 'pembatalan_senin' },
        { name: 'Selasa', key: 'pembatalan_selasa' },
        { name: 'Rabu', key: 'pembatalan_rabu' },
        { name: 'Kamis', key: 'pembatalan_kamis' },
        { name: 'Jumat', key: 'pembatalan_jumat' },
        { name: 'Sabtu', key: 'pembatalan_sabtu' }
      ]
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {
    async loadData() {
      this.isLoading = true

      try {
        const response = await this.$_api.post('/lab_laporan/pembatalan', {
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
        await this.$_api.downloadFile('/lab_laporan/pembatalan/exportPdf', {
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
        alasan_batal: '',
        user_batal: '',
        search: ''
      }
      this.currentPage = 1
      this.loadData()
    },

    showFullAlasan(alasan) {
      this.fullAlasan = alasan
      this.showAlasanModal = true
    },

    formatDate(date) {
      if (!date) return '-'
      return moment(date).format('DD MMM YYYY')
    },

    formatTime(date) {
      if (!date) return '-'
      return moment(date).format('HH:mm')
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

    getStatusText(status) {
      switch(status) {
        case 0: return 'Baru'
        case 1: return 'Proses'
        case 2: return 'Sampel Diambil'
        case 3: return 'Selesai'
        default: return 'Tidak Diketahui'
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

    formatWaktu(menit) {
      if (!menit) return '-'
      const jam = Math.floor(menit / 60)
      const sisaMenit = Math.round(menit % 60)
      return jam > 0 ? `${jam}j ${sisaMenit}m` : `${sisaMenit}m`
    },

    truncateText(text, length) {
      if (!text) return '-'
      return text.length > length ? text.substring(0, length) + '...' : text
    }
  },

  computed: {
    hariListWithCount() {
      return this.hariList.map(hari => ({
        ...hari,
        count: this.statistik ? (this.statistik[hari.key] || 0) : 0
      }))
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

.border-left-danger {
  border-left: 0.25rem solid #e74a3b !important;
}

.border-left-secondary {
  border-left: 0.25rem solid #858796 !important;
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
</style>