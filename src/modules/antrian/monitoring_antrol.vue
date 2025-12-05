<template>
  <div class="container-fluid">

    <h3>
      <strong>Monitoring Antrian Online BPJS</strong>
    </h3>
    
    <!-- Filter Section -->
    <div class="card card-custom shadow-sm mb-5">
      <div class="card-body p-4">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(fetchData)" autocomplete="off">
            <div class="row gy-3">
              <div class="col-md-3 mr-2">
                <label class="font-weight-bold">Tanggal</label>
                <s-input
                  v-model="filters.tanggal"
                  :item="{
                    id: 'tanggal',
                    label: '',
                    type: 'date',
                    validation: ['required'],
                  }"
                />
              </div>
              <div class="col-md-3">
                <label class="font-weight-bold">Kode Booking</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="filters.kode_booking" 
                  placeholder="Masukkan Kode Booking"
                />
              </div>
              <div class="col-md-3 d-flex gap-2 align-items-end form-group">
                <button type="submit" class="btn btn-primary">
                  <i class="ri-search-line mr-2"></i>Cari
                </button>
                <button type="button" @click="resetFilters" class="btn btn-light-danger">
                  <i class="ri-refresh-line mr-2"></i>Reset
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card card-custom shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th class="text-center align-middle">No</th>
                <th class="align-middle">Tanggal</th>
                <th class="align-middle">Kode Booking</th>
                <th class="text-center align-middle">Task 1</th>
                <th class="text-center align-middle">Task 2</th>
                <th class="text-center align-middle">Task 3</th>
                <th class="text-center align-middle">Task 4</th>
                <th class="text-center align-middle">Task 5</th>
                <th class="text-center align-middle">Task 6</th>
                <th class="text-center align-middle">Task 7</th>
                <th class="text-center align-middle">Task 99</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableData.length > 0">
                <tr v-for="(item, index) in tableData" :key="index">
                  <td class="text-center">{{ calculateRowNumber(index) }}</td>
                  <td class="font-weight-bold">{{ item.createdAt }}</td>
                  <td
                    class="font-weight-bold"
                    :class="getCreateAntrol(item.history).class"
                    @click="showTaskDetails(item.history, getCreateAntrol(item.history).id)"
                  >{{ item.kode_booking }}</td>
                  <td 
                    v-for="taskId in [1, 2, 3, 4, 5, 6, 7, 99]" 
                    :key="taskId"
                    class="text-center align-middle"
                    :class="getTaskStatusClass(item.history, taskId)"
                    @click="showTaskDetails(item.history, taskId)"
                  >
                    {{ getTaskTime(item.history, taskId) }}
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="10" class="text-center py-4 text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="ri-information-line mb-2" style="font-size: 2rem;"></i>
                    <span>Tidak ada data antrian yang tersedia</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center flex-wrap p-4">
          <div class="d-flex align-items-center">
            <span class="text-muted mr-2">Menampilkan</span>
            <select v-model="filters.jumlah" class="form-control form-control-sm" style="width: 65px" @change="fetchData()">
              <option v-for="size in [10, 25, 50, 100]" :key="size" :value="size">{{ size }}</option>
            </select>
            <span class="text-muted ml-2">dari total {{ pagination.total }} data</span>
          </div>
          
          <div class="d-flex">
            <button 
              @click="goToPage(1)" 
              class="btn btn-icon btn-sm btn-light mr-2"
              :disabled="pagination.halaman === 1"
            >
              <i class="ri-skip-back-mini-line"></i>
            </button>
            <button 
              @click="goToPage(pagination.halaman - 1)" 
              class="btn btn-sm btn-light mr-2"
              :disabled="pagination.halaman === 1"
            >
              <i class="ri-arrow-left-s-line mr-1"></i>Prev
            </button>
            
            <div class="d-flex align-items-center mx-2">
              <span>Halaman</span>
              <input 
                type="number" 
                class="form-control form-control-sm mx-2" 
                style="width: 60px"
                v-model.number="pagination.halaman"
                min="1"
                :max="pagination.total_halaman"
                @change="goToPage(pagination.halaman)"
              />
              <span>dari {{ pagination.total_halaman }}</span>
            </div>
            
            <button 
              @click="goToPage(pagination.halaman + 1)" 
              class="btn btn-sm btn-light ml-2"
              :disabled="pagination.halaman >= pagination.total_halaman"
            >
              Next<i class="ri-arrow-right-s-line ml-1"></i>
            </button>
            <button 
              @click="goToPage(pagination.total_halaman)" 
              class="btn btn-icon btn-sm btn-light ml-2"
              :disabled="pagination.halaman >= pagination.total_halaman"
            >
              <i class="ri-skip-forward-mini-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <b-modal 
      id="task-detail-modal" 
      v-model="showModal" 
      title="Detail Task" 
      size="lg" 
      centered
      header-bg-variant="light"
      header-text-variant="dark"
      hide-footer
    >
      <div v-if="selectedTask">
        <div class="mb-4">
          <h5 class="text-primary mb-3">Informasi Task</h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th style="width: 150px">ID</th>
                  <td>{{ selectedTask.id }}</td>
                </tr>
                <tr>
                  <th style="width: 150px">URL</th>
                  <td>{{ selectedTask.url }}</td>
                </tr>
                <tr>
                  <th style="width: 150px">Task ID</th>
                  <td>{{ selectedTask.task_id }}</td>
                </tr>
                <tr>
                  <th>Kode Booking</th>
                  <td>{{ selectedTask.kode_booking }}</td>
                </tr>
                <tr>
                  <th>Waktu</th>
                  <td>{{ formatDateTime(selectedTask.waktu) }}</td>
                </tr>
                <tr>
                  <th>Status Code</th>
                  <td>
                    <span 
                      class="label label-pill"
                      style="width: 27px;"
                      :class="selectedTask.status_code === 200 ? 'label-success' : 'label-danger'"
                    >
                      {{ selectedTask.status_code }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-4">
          <h5 class="text-primary mb-3">Payload</h5>
          <pre class="bg-light p-3 rounded" style="max-height: 200px; overflow-y: auto">{{ formatJson(selectedTask.payload) }}</pre>
        </div>
        
        <div>
          <h5 class="text-primary mb-3">Response</h5>
          <pre class="bg-light p-3 rounded" style="max-height: 200px; overflow-y: auto">{{ formatJson(selectedTask.response) }}</pre>
        </div>
      </div>
      <div v-else-if="!hasTaskData">
        <div class="alert alert-warning text-center">
          <i class="ri-information-line mr-2"></i>
          Tidak ada data task yang tersedia
        </div>
      </div>
      <div v-else class="text-center py-3">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      
      <template #modal-footer>
        <div class="w-100 text-right">
          <b-button variant="secondary" @click="closeModal">Tutup</b-button>
        </div>
      </template>
    </b-modal>
    
  </div>
</template>

<script>
export default {
  name: 'monitoring-antrian-bpjs',
  data() {
    return {
      tableData: [],
      loading: false,
      filters: {
        tanggal: new Date().toISOString().split('T')[0],
        kode_booking: '',
        halaman: 1,
        jumlah: 10
      },
      pagination: {
        halaman: 1,
        jumlah: 10,
        total: 0,
        total_halaman: 0
      },

      showModal: false,
      selectedTask: null,
      hasTaskData: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const response = await this.$_api.post('bpjs/antrean_rs/monitorAntrean', {
          tanggal: this.filters.tanggal,
          kode_booking: this.filters.kode_booking,
          halaman: this.filters.halaman,
          jumlah: this.filters.jumlah
        })

        if (response.status === 200) {
          this.tableData = response.data || []
          this.pagination = {
            halaman: response.halaman,
            jumlah: response.jumlah,
            total: response.total,
            total_halaman: response.total_halaman
          }
        } else {
          this.$_alert.error('Terjadi kesalahan saat mengambil data antrian')
        }
      } catch (error) {
        console.error('Error fetching queue data:', error)
        this.$_alert.error('Terjadi kesalahan saat mengambil data antrian')
      } finally {
        this.loading = false
      }
    },

    resetFilters() {
      this.filters = {
        tanggal: new Date().toISOString().split('T')[0],
        kode_booking: '',
        halaman: 1,
        jumlah: 10
      }
      this.fetchData()
    },

    goToPage(page) {
      if (page < 1) page = 1
      if (page > this.pagination.total_halaman) page = this.pagination.total_halaman
      
      this.filters.halaman = page
      this.pagination.halaman = page
      this.fetchData()
    },

    calculateRowNumber(index) {
      return (this.pagination.halaman - 1) * this.pagination.jumlah + index + 1
    },

    getCreateAntrol(history) {
      const createdAntrol = history.find(item => item && item.url && item.url.includes('/antrean/add'));
      return {
        id: createdAntrol ? createdAntrol.id : null,
        class: {
          'bg-success text-white': createdAntrol && createdAntrol.status_code === 200,
          'bg-warning text-white': !createdAntrol || createdAntrol.status_code !== 200
        }
      }
    },

    getTaskStatusClass(history, taskId) {
      const taskIdStr = String(taskId)
      const taskExists = history.some(item => item.task_id === taskIdStr && item.status_code === 200)
      
      return {
        'bg-success text-white': taskExists,
        'bg-danger text-white': !taskExists
      }
    },

    getTaskTime(history, taskId) {
      if (!history) return '-'
      
      const taskIdStr = String(taskId)
      const task = history.find(item => item.task_id === taskIdStr && item.status_code === 200)
      
      if (!task) return '-'
      
      // Format time to HH:mm
      const taskDate = new Date(task.waktu)
      const hours = taskDate.getHours().toString().padStart(2, '0')
      const minutes = taskDate.getMinutes().toString().padStart(2, '0')
      
      return `${hours}:${minutes}`
    },
    showTaskDetails(history, taskId) {
      if (!history) {
        this.hasTaskData = false
        this.selectedTask = null
        this.showModal = true
        return
      }
      
      const taskIdStr = String(taskId)
      const task = history.find(item => item.task_id === taskIdStr || item.id === taskIdStr)
      
      if (!task) {
        this.hasTaskData = false
        this.selectedTask = null
      } else {
        this.hasTaskData = true
        this.selectedTask = task
      }
      
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
      this.selectedTask = null
    },
    
    formatDateTime(dateStr) {
      if (!dateStr) return '-'
      
      const date = new Date(dateStr)
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      
      return date.toLocaleString('id-ID', options)
    },
    formatJson(json) {
      if (!json) return '{}'
      return JSON.stringify(json, null, 2)
    }
  },

}
</script>

<style scoped>
.bg-success {
  background-color: #1bc5bd !important;
}

.bg-danger {
  background-color: #f64e60 !important;
}

.thead-light th {
  background-color: #f3f6f9;
  color: #3f4254;
  font-weight: 600;
}

.table td, .table th {
  vertical-align: middle;
  padding: 0.75rem;
}

.table-hover tbody tr:hover {
  background-color: #f3f6f9;
}


.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  opacity: 0.9;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.4;
}

.label {
  display: inline-block;
  padding: 0.25em 0.5em;
  font-size: 0.85em;
  font-weight: bold;
  border-radius: 0.25rem;
}

.label-success {
  background-color: #1bc5bd;
  color: #fff;
}

.label-danger {
  background-color: #f64e60;
  color: #fff;
}
</style>