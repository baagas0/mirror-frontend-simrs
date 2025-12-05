<template>
  <div class="w-100 container">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4">
          <i class="ri-file-list-3-line"></i>
          Laporan Pasien Laboratorium
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
              <option value="3">Selesai</option>
            </select>
          </div>
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
              Export Pasien Lab PDF
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

        <!-- Data Table -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th>No</th>
                <th>Tanggal Permintaan</th>
                <th>No. RM</th>
                <th>Nama Pasien</th>
                <th>Jenis Kelamin</th>
                <th>Dokter</th>
                <th>Paket Lab</th>
                <th>Status</th>
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
                <td>{{ item.no_rm }}</td>
                <td>{{ item.nama_lengkap }}</td>
                <td>
                  <span class="badge badge-info">
                    {{ item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}
                  </span>
                </td>
                <td>{{ item.nama_dokter || '-' }}</td>
                <td>
                  <small>{{ item.nama_paket || '-' }}</small>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(item.status)">
                    {{ item.status_text }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="viewDetail(item.lab_regis_id)"
                    title="Lihat Detail"
                  >
                    <i class="ri-eye-line"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-success"
                    @click="exportDetailPDF(item.lab_regis_id)"
                    title="Export PDF Detail"
                  >
                    <i class="ri-file-pdf-line"></i>
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
                v-for="page in Math.min(5, pagination.totalPages)"
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

    <!-- Detail Modal -->
    <b-modal
      v-model="showDetailModal"
      size="xl"
      hide-footer
      title="Detail Laporan Pasien Laboratorium"
    >
      <div v-if="selectedData">
        <!-- Informasi Pasien -->
        <div class="row mb-4">
          <div class="col-12">
            <h5 class="border-bottom pb-2">Informasi Pasien</h5>
          </div>
          <div class="col-md-6">
            <table class="table table-sm table-borderless">
              <tr>
                <td width="150"><strong>No. RM:</strong></td>
                <td>{{ selectedData.registrasi.no_rm }}</td>
              </tr>
              <tr>
                <td><strong>Nama:</strong></td>
                <td>{{ selectedData.registrasi.nama_lengkap }}</td>
              </tr>
              <tr>
                <td><strong>Jenis Kelamin:</strong></td>
                <td>{{ selectedData.registrasi.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Lahir:</strong></td>
                <td>{{ formatDate(selectedData.registrasi.tgl_lahir) }}</td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="table table-sm table-borderless">
              <tr>
                <td width="150"><strong>Dokter:</strong></td>
                <td>{{ selectedData.registrasi.nama_dokter }}</td>
              </tr>
              <tr>
                <td><strong>Tgl. Registrasi:</strong></td>
                <td>{{ formatDate(selectedData.registrasi.tgl_registrasi) }}</td>
              </tr>
              <tr>
                <td><strong>Tgl. Permintaan:</strong></td>
                <td>{{ formatDate(selectedData.registrasi.tanggal_request) }}</td>
              </tr>
              <tr>
                <td><strong>Tgl. Ambil Sampel:</strong></td>
                <td>{{ formatDate(selectedData.registrasi.tanggal_ambil_sampel) || '-' }}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Paket Laboratorium -->
        <div class="row mb-4">
          <div class="col-12">
            <h5 class="border-bottom pb-2">Paket Laboratorium</h5>
          </div>
          <div class="col-12">
            <div class="row">
              <div
                v-for="paket in selectedData.paket"
                :key="paket.id"
                class="col-md-4 mb-2"
              >
                <span class="badge badge-primary p-2">
                  {{ paket.nama_paket }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hasil Pemeriksaan -->
        <div class="row mb-4">
          <div class="col-12">
            <h5 class="border-bottom pb-2">Hasil Pemeriksaan</h5>
          </div>
          <div class="col-12">
            <div v-for="(hasil) in selectedData.hasil" :key="hasil.id" class="mb-3">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title mb-3">
                    {{ hasil.nama_paket }} - {{ hasil.nama_penunjang || hasil.nama_jenis_pemeriksaan }}
                  </h6>
                  <div class="row">
                    <div class="col-md-3">
                      <strong>Hasil:</strong>
                      <p class="mb-1">{{ hasil.hasil || '-' }} {{ hasil.satuan || '' }}</p>
                    </div>
                    <div class="col-md-3">
                      <strong>Normal:</strong>
                      <p class="mb-1">{{ hasil.parameter_normal || '-' }}</p>
                    </div>
                    <div class="col-md-3">
                      <strong>Status:</strong>
                      <p class="mb-1">
                        <span :class="hasil.is_normal ? 'badge badge-success' : 'badge badge-warning'">
                          {{ hasil.is_normal ? 'Normal' : 'Abnormal' }}
                        </span>
                      </p>
                    </div>
                    <div class="col-md-3" v-if="hasil.nama_penunjang">
                      <strong>Jenis Pemeriksaan:</strong>
                      <p class="mb-1">{{ hasil.nama_penunjang }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-right">
          <button
            class="btn btn-success"
            @click="exportDetailPDF(selectedData.registrasi.lab_regis_id)"
            :disabled="isExporting"
          >
            <i class="ri-file-pdf-line" :class="{ 'spinner-border spinner-border-sm': isExporting }"></i>
            Export PDF
          </button>
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
  name: 'LabLaporan',
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
        search: ''
      },

      // Data
      data: [],
      selectedData: null,

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
      showDetailModal: false,

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
        const response = await this.$_api.post('/lab_laporan/list', {
          page: this.currentPage,
          perPage: this.perPage,
          ...this.filters
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

    async loadDetail(id) {
      try {
        const response = await this.$_api.post('/lab_laporan/detail', { id })

        if (response.status === 200) {
          this.selectedData = response.data
        } else {
          this.$_alert.error(response.message || 'Gagal memuat detail')
        }
      } catch (error) {
        console.error('Error loading detail:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat detail')
      }
    },

    async exportPDF() {
      if (!this.data.length) {
        this.$_alert.warning('Tidak ada data untuk diekspor')
        return
      }

      this.isExporting = true

      try {
        console.log('===> lab_laporan.vue:424 ~');
        await this.$_api.downloadFile('/lab_laporan/exportPdf', {
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

    async exportDetailPDF(id) {
      this.isExporting = true

      try {
        await this.$_api.downloadFile('/lab_laporan/exportPdf', { id }, {
          responseType: 'blob'
        });

        this.$_alert.success('PDF detail berhasil diunduh')
      } catch (error) {
        console.error('Error exporting detail PDF:', error)
        this.$_alert.error('Terjadi kesalahan saat mengekspor PDF detail')
      } finally {
        this.isExporting = false
      }
    },

    async viewDetail(id) {
      await this.loadDetail(id)
      this.showDetailModal = true
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.currentPage = page
        this.loadData()
      }
    },

    resetFilters() {
      this.filters = {
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        status: '',
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

.modal .card {
  box-shadow: none;
  border: 1px solid #dee2e6;
}

.modal .card-body {
  padding: 1rem;
}
</style>