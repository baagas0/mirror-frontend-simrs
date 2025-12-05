<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header">
            <template #header>
              <b-row class="d-flex align-items-center">
                <b-col>
                  <h3 class="mb-0">
                    <strong>Dashboard Permintaan Alat Steril</strong>
                  </h3>
                </b-col>
                <b-col class="text-right">
                  <b-button variant="primary" @click="refreshData">
                    <i class="ri-refresh-line"></i> Refresh
                  </b-button>
                </b-col>
              </b-row>
            </template>
            <div v-if="!busy && dashboardData">
              <!-- Dashboard Stats -->
              <b-row class="mb-4">
                <b-col cols="6" md="3" class="mb-3">
                  <b-card class="text-center dashboard-card" bg-variant="primary" text-variant="white">
                    <b-card-body>
                      <i class="ri-file-list-3-line dashboard-icon"></i>
                      <h2 class="mb-2">{{ dashboardData.total || 0 }}</h2>
                      <p class="mb-0">Total Permintaan</p>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col cols="6" md="3" class="mb-3">
                  <b-card class="text-center dashboard-card" bg-variant="warning" text-variant="white">
                    <b-card-body>
                      <i class="ri-time-line dashboard-icon"></i>
                      <h2 class="mb-2">{{ dashboardData.menunggu || 0 }}</h2>
                      <p class="mb-0">Menunggu</p>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col cols="6" md="3" class="mb-3">
                  <b-card class="text-center dashboard-card" bg-variant="info" text-variant="white">
                    <b-card-body>
                      <i class="ri-truck-line dashboard-icon"></i>
                      <h2 class="mb-2">{{ dashboardData.diambil || 0 }}</h2>
                      <p class="mb-0">Diambil</p>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col cols="6" md="3" class="mb-3">
                  <b-card class="text-center dashboard-card" bg-variant="secondary" text-variant="white">
                    <b-card-body>
                      <i class="ri-loader-4-line dashboard-icon"></i>
                      <h2 class="mb-2">{{ dashboardData.proses_sterilisasi || 0 }}</h2>
                      <p class="mb-0">Proses Sterilisasi</p>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col cols="6" md="3" class="mb-3">
                  <b-card class="text-center dashboard-card" bg-variant="success" text-variant="white">
                    <b-card-body>
                      <i class="ri-check-line dashboard-icon"></i>
                      <h2 class="mb-2">{{ dashboardData.selesai || 0 }}</h2>
                      <p class="mb-0">Selesai</p>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col cols="6" md="3" class="mb-3">
                  <b-card class="text-center dashboard-card" bg-variant="light" text-variant="dark">
                    <b-card-body>
                      <i class="ri-calendar-2-line dashboard-icon"></i>
                      <h2 class="mb-2">{{ dashboardData.total_today || 0 }}</h2>
                      <p class="mb-0">Hari Ini</p>
                    </b-card-body>
                  </b-card>
                </b-col>
              </b-row>

              <!-- Charts Section -->
              <b-row class="mb-4">
                <b-col cols="12" md="6">
                  <b-card>
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-bar-chart-line"></i> Statistik Status
                      </h5>
                    </template>
                    <div class="text-center py-5">
                      <canvas id="statusChart" width="400" height="300"></canvas>
                    </div>
                  </b-card>
                </b-col>
                <b-col cols="12" md="6">
                  <b-card>
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-line-chart-line"></i> Tren 7 Hari Terakhir
                      </h5>
                    </template>
                    <div class="text-center py-5">
                      <canvas id="trendChart" width="400" height="300"></canvas>
                    </div>
                  </b-card>
                </b-col>
              </b-row>

              <!-- Recent Requests -->
              <b-row class="mb-4">
                <b-col cols="12">
                  <b-card>
                    <template #header>
                      <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                          <i class="ri-history-line"></i> Permintaan Terbaru
                        </h5>
                        <b-button variant="outline-primary" size="sm" @click="viewAll">
                          Lihat Semua
                        </b-button>
                      </div>
                    </template>
                    <b-table
                      :items="recentRequests"
                      :fields="recentFields"
                      responsive
                      show-empty
                      small
                      bordered
                      striped
                      hover
                    >
                      <template #cell(tanggal_permintaan)="data">
                        {{ $moment(data.item.tanggal_permintaan).format('LL') }}
                      </template>
                      <template #cell(status_permintaan)="data">
                        <b-badge
                          :variant="getStatusVariant(data.item.status_permintaan)"
                          class="mr-1"
                        >
                          {{ getStatusText(data.item.status_permintaan) }}
                        </b-badge>
                      </template>
                      <template #cell(actions)="data">
                        <b-button
                          @click="viewDetail(data.item)"
                          variant="info"
                          size="sm"
                          title="Lihat Detail"
                        >
                          <i class="ri-eye-line"></i>
                        </b-button>
                      </template>
                      <template #empty>
                        <div class="text-center py-3">
                          <p class="text-muted">Tidak ada permintaan terbaru</p>
                        </div>
                      </template>
                    </b-table>
                  </b-card>
                </b-col>
              </b-row>

              <!-- Top Units -->
              <b-row>
                <b-col cols="12" md="6">
                  <b-card>
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-hospital-line"></i> Unit Terbanyak
                      </h5>
                    </template>
                    <div v-if="topUnits.length > 0">
                      <div v-for="(unit, index) in topUnits" :key="index" class="mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{{ index + 1 }}. {{ unit.nama_unit }}</strong>
                            <p class="mb-0 text-muted small">{{ unit.jumlah }} permintaan</p>
                          </div>
                          <b-badge variant="primary" pill>{{ unit.jumlah }}</b-badge>
                        </div>
                        <b-progress
                          :value="(unit.jumlah / Math.max(...topUnits.map(u => u.jumlah))) * 100"
                          height="6px"
                          class="mt-2"
                        ></b-progress>
                      </div>
                    </div>
                    <div v-else class="text-center py-3">
                      <p class="text-muted">Belum ada data unit</p>
                    </div>
                  </b-card>
                </b-col>
                <b-col cols="12" md="6">
                  <b-card>
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-alert-line"></i> Status Menunggu
                      </h5>
                    </template>
                    <div v-if="waitingRequests.length > 0">
                      <div v-for="(request, index) in waitingRequests" :key="index" class="mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 class="mb-1">{{ request.kode_permintaan }}</h6>
                            <p class="mb-0"><strong>{{ request.nama_unit }}</strong></p>
                            <p class="mb-0 text-muted small">{{ $moment(request.tanggal_permintaan).fromNow() }}</p>
                          </div>
                          <div class="text-right">
                            <b-badge variant="warning">Menunggu</b-badge>
                            <p class="mb-0 small text-muted mt-1">{{ request.items_count }} item</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-3">
                      <p class="text-muted">Tidak ada permintaan yang menunggu</p>
                    </div>
                  </b-card>
                </b-col>
              </b-row>
            </div>

            <!-- Loading State -->
            <div v-if="busy" class="text-center py-5">
              <b-spinner variant="primary" label="Loading..."></b-spinner>
              <p class="mt-2">Memuat data dashboard...</p>
            </div>

            <!-- Empty State -->
            <div v-if="!busy && !dashboardData" class="text-center py-5">
              <i class="ri-dashboard-line" style="font-size: 3rem; color: #ccc;"></i>
              <h5 class="mt-3">Data tidak tersedia</h5>
              <p class="text-muted">Tidak dapat memuat data dashboard.</p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busy: true,
      dashboardData: null,
      recentRequests: [],
      topUnits: [],
      waitingRequests: [],
      recentFields: [
        {
          key: 'kode_permintaan',
          label: 'Kode',
          class: 'align-middle text-left',
        },
        {
          key: 'nama_unit',
          label: 'Unit',
          class: 'align-middle text-left',
        },
        {
          key: 'tanggal_permintaan',
          label: 'Tanggal',
          class: 'align-middle text-left',
        },
        {
          key: 'status_permintaan',
          label: 'Status',
          class: 'align-middle text-center',
        },
        {
          key: 'actions',
          label: 'Aksi',
          class: 'align-middle text-center',
        },
      ],
      statusChart: null,
      trendChart: null
    }
  },
  async mounted() {
    await this.getDashboardData()
    await this.getRecentRequests()
    await this.getWaitingRequests()
    await this.getTopUnits()
    this.initCharts()
  },
  methods: {
    async getDashboardData() {
      try {
        const res = await this.$_api.post('permintaan_kotor/dashboard')
        if (res.status == 200) {
          this.dashboardData = res.data
        } else {
          this.$_alert.error(res.message)
        }
      } catch (error) {
        console.error('Error getting dashboard data:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat data dashboard')
      }
    },
    async getRecentRequests() {
      try {
        const res = await this.$_api.post('permintaan_kotor/list', {
          halaman: 1,
          jumlah: 5
        })
        if (res.status == 200) {
          this.recentRequests = res.data
        }
      } catch (error) {
        console.error('Error getting recent requests:', error)
      }
    },
    async getWaitingRequests() {
      try {
        const res = await this.$_api.post('permintaan_kotor/list', {
          halaman: 1,
          jumlah: 5,
          status_permintaan: '1'
        })
        if (res.status == 200) {
          this.waitingRequests = res.data.map(item => ({
            ...item,
            items_count: item.items ? item.items.length : 0
          }))
        }
      } catch (error) {
        console.error('Error getting waiting requests:', error)
      }
    },
    async getTopUnits() {
      try {
        const res = await this.$_api.post('permintaan_kotor/list', {
          halaman: 1,
          jumlah: 100
        })
        if (res.status == 200) {
          const unitCounts = {}
          res.data.forEach(request => {
            unitCounts[request.nama_unit] = (unitCounts[request.nama_unit] || 0) + 1
          })
          this.topUnits = Object.entries(unitCounts)
            .map(([nama_unit, jumlah]) => ({ nama_unit, jumlah }))
            .sort((a, b) => b.jumlah - a.jumlah)
            .slice(0, 5)
        }
      } catch (error) {
        console.error('Error getting top units:', error)
      }
    },
    getStatusVariant(status) {
      const variants = {
        1: 'warning',
        2: 'info',
        3: 'secondary',
        4: 'success'
      }
      return variants[status] || 'secondary'
    },
    getStatusText(status) {
      const texts = {
        1: 'Menunggu',
        2: 'Diambil',
        3: 'Proses Sterilisasi',
        4: 'Selesai'
      }
      return texts[status] || 'Unknown'
    },
    async refreshData() {
      this.busy = true
      try {
        await Promise.all([
          this.getDashboardData(),
          this.getRecentRequests(),
          this.getWaitingRequests(),
          this.getTopUnits()
        ])
        this.updateCharts()
        this.$_alert.success('Data berhasil diperbarui')
      } catch (error) {
        this.$_alert.error('Gagal memperbarui data')
      } finally {
        this.busy = false
      }
    },
    viewDetail(data) {
      this.$router.push({
        name: 'detail-permintaan-kotor',
        query: { id: data.id }
      })
    },
    viewAll() {
      this.$router.push({ name: 'daftar-permintaan-kotor' })
    },
    initCharts() {
      this.$nextTick(() => {
        this.initStatusChart()
        this.initTrendChart()
      })
    },
    initStatusChart() {
      const canvas = document.getElementById('statusChart')
      if (!canvas || !this.dashboardData) return

      const ctx = canvas.getContext('2d')

      // Simple chart implementation using canvas
      const data = [
        { label: 'Menunggu', value: this.dashboardData.menunggu || 0, color: '#ffc107' },
        { label: 'Diambil', value: this.dashboardData.diambil || 0, color: '#17a2b8' },
        { label: 'Proses', value: this.dashboardData.proses_sterilisasi || 0, color: '#6c757d' },
        { label: 'Selesai', value: this.dashboardData.selesai || 0, color: '#28a745' }
      ]

      const total = data.reduce((sum, item) => sum + item.value, 0)
      const centerX = 200
      const centerY = 150
      const radius = 80

      ctx.clearRect(0, 0, 400, 300)

      let currentAngle = -Math.PI / 2
      data.forEach(item => {
        if (item.value > 0) {
          const sliceAngle = (item.value / total) * 2 * Math.PI

          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
          ctx.lineTo(centerX, centerY)
          ctx.fillStyle = item.color
          ctx.fill()

          // Draw label
          const labelX = centerX + Math.cos(currentAngle + sliceAngle / 2) * (radius / 2)
          const labelY = centerY + Math.sin(currentAngle + sliceAngle / 2) * (radius / 2)

          ctx.fillStyle = 'white'
          ctx.font = 'bold 12px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          if (item.value > 0) {
            ctx.fillText(`${item.value}`, labelX, labelY)
          }

          currentAngle += sliceAngle
        }
      })

      // Draw legend
      let legendY = 250
      data.forEach(item => {
        ctx.fillStyle = item.color
        ctx.fillRect(20, legendY, 15, 15)

        ctx.fillStyle = 'black'
        ctx.font = '12px Arial'
        ctx.textAlign = 'left'
        ctx.fillText(`${item.label}: ${item.value}`, 45, legendY + 12)

        legendY += 20
      })
    },
    initTrendChart() {
      const canvas = document.getElementById('trendChart')
      if (!canvas) return

      const ctx = canvas.getContext('2d')

      // Generate sample trend data (last 7 days)
      const labels = []
      const data = []

      for (let i = 6; i >= 0; i--) {
        const date = this.$moment().subtract(i, 'days')
        labels.push(date.format('DD/MM'))
        data.push(Math.floor(Math.random() * 10) + 1) // Sample data
      }

      ctx.clearRect(0, 0, 400, 300)

      const maxValue = Math.max(...data)
      const padding = 40
      const chartWidth = 400 - (padding * 2)
      const chartHeight = 300 - (padding * 2)

      // Draw axes
      ctx.strokeStyle = '#ddd'
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, 300 - padding)
      ctx.lineTo(400 - padding, 300 - padding)
      ctx.stroke()

      // Draw data points and lines
      ctx.strokeStyle = '#007bff'
      ctx.fillStyle = '#007bff'
      ctx.lineWidth = 2

      ctx.beginPath()
      data.forEach((value, index) => {
        const x = padding + (index * (chartWidth / (data.length - 1)))
        const y = 300 - padding - ((value / maxValue) * chartHeight)

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        // Draw point
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fill()
        ctx.restore()

        // Draw label
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.font = '10px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(labels[index], x, 300 - padding + 15)
        ctx.fillText(value, x, y - 10)
        ctx.restore()
      })
      ctx.stroke()
    },
    updateCharts() {
      if (this.dashboardData) {
        this.initStatusChart()
        this.initTrendChart()
      }
    }
  }
}
</script>

<style scoped>
.dashboard-card {
  transition: transform 0.2s ease-in-out;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.dashboard-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.card-body h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.card-body p {
  font-size: 1rem;
  margin: 0;
}

.progress {
  background-color: #e9ecef;
}

#statusChart,
#trendChart {
  max-width: 100%;
  height: auto;
}
</style>