<template>
  <div class="dashboard-executive">
    <!-- Header Section -->
    <div class="row mb-6">
      <div class="col-md-12">
        <div class="card card-custom">
          <div class="card-header border-0 py-5">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h3 class="card-title align-items-start flex-column">
                  <span class="card-label font-weight-bolder text-dark"
                    >Dashboard Executive</span
                  >
                  <span class="text-muted mt-1 font-weight-bold font-size-sm"
                    >RSUD Buton Selatan - Overview Manajemen</span
                  >
                </h3>
              </div>
              <div class="dropdown dropdown-inline">
                <button
                  type="button"
                  class="btn btn-light-primary font-weight-bolder dropdown-toggle px-6"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="ri-calendar-line mr-2"></i>
                  {{ selectedPeriod }}
                </button>
                <div
                  class="dropdown-menu dropdown-menu-sm dropdown-menu-right p-0 m-0"
                >
                  <a
                    href="#"
                    class="dropdown-item px-6 py-3"
                    @click="setPeriod('Hari Ini')"
                    >Hari Ini</a
                  >
                  <a
                    href="#"
                    class="dropdown-item px-6 py-3"
                    @click="setPeriod('7 Hari Terakhir')"
                    >7 Hari Terakhir</a
                  >
                  <a
                    href="#"
                    class="dropdown-item px-6 py-3"
                    @click="setPeriod('30 Hari Terakhir')"
                    >30 Hari Terakhir</a
                  >
                  <a
                    href="#"
                    class="dropdown-item px-6 py-3"
                    @click="setPeriod('Bulan Berjalan')"
                    >Bulan Berjalan</a
                  >
                  <a
                    href="#"
                    class="dropdown-item px-6 py-3"
                    @click="setPeriod('Tahun Berjalan')"
                    >Tahun Berjalan</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Early Warning Alert Section -->
    <div class="row mb-6" v-if="hasAlerts">
      <div class="col-md-12">
        <div
          class="alert alert-custom alert-light-danger fade show"
          role="alert"
        >
          <div class="alert-icon">
            <i class="ri-alert-line text-danger"></i>
          </div>
          <div class="alert-text">
            <h5 class="alert-title text-danger">Early Warning Alert</h5>
            <div class="row">
              <div
                class="col-md-6"
                v-for="alert in criticalAlerts"
                :key="alert.id"
              >
                <div class="d-flex align-items-center mb-2">
                  <i :class="alert.icon" class="mr-2"></i>
                  <span>{{ alert.message }}</span>
                  <button
                    class="btn btn-sm btn-danger ml-auto"
                    @click="handleAlert(alert)"
                  >
                    <i class="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="alert-close">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true"><i class="ri-close-line"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Executive Overview Stats -->
    <div class="row mb-6">
      <!-- Hospital Statistics -->
      <div class="col-md-12">
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-hospital-line mr-2"></i>
                Statistik Rumah Sakit
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Total Kunjungan Pasien -->
              <div class="col-md-3">
                <div class="bg-light-primary rounded p-4 text-center">
                  <div class="symbol symbol-45 mr-3 mb-3">
                    <div class="symbol-label bg-primary">
                      <i class="ri-user-heart-line text-white"></i>
                    </div>
                  </div>
                  <div class="font-weight-bolder text-primary font-size-h2">
                    {{ formatNumber(hospitalStats.totalKunjungan) }}
                  </div>
                  <div class="text-muted font-weight-bold">Total Kunjungan</div>
                  <div class="text-muted font-size-sm">
                    {{ selectedPeriod }}
                  </div>
                  <div class="mt-2">
                    <span
                      class="label label-inline label-light-success font-weight-bold"
                    >
                      <i class="ri-arrow-up-line"></i>
                      {{ hospitalStats.kunjunganGrowth }}%
                    </span>
                  </div>
                </div>
              </div>

              <!-- BOR Realtime -->
              <div class="col-md-3">
                <div class="bg-light-success rounded p-4 text-center">
                  <div class="symbol symbol-45 mr-3 mb-3">
                    <div class="symbol-label bg-success">
                      <i class="ri-home-4-line text-white"></i>
                    </div>
                  </div>
                  <div class="font-weight-bolder text-success font-size-h2">
                    {{ hospitalStats.bor }}%
                  </div>
                  <div class="text-muted font-weight-bold">BOR Realtime</div>
                  <div class="text-muted font-size-sm">Tren 30 hari</div>
                  <div class="mt-2">
                    <div class="progress progress-xs mt-2 mb-2">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="{ width: hospitalStats.bor + '%' }"
                      ></div>
                    </div>
                    <span class="text-muted">
                      {{ hospitalStats.tempatTidurTerisi }}/{{ hospitalStats.totalTempatTidur }}
                      Tempat Tidur Terisi
                    </span>
                  </div>
                </div>
              </div>

              <!-- Antrian IGD -->
              <div class="col-md-3">
                <div
                  :class="
                    getIgdAlertClass(hospitalStats.antrianIgdStatus) +
                    ' rounded p-4 text-center'
                  "
                >
                  <div class="symbol symbol-45 mr-3 mb-3">
                    <div
                      :class="getIgdSymbolClass(hospitalStats.antrianIgdStatus)"
                    >
                      <i class="ri-first-aid-kit-line text-white"></i>
                    </div>
                  </div>
                  <div class="font-weight-bolder font-size-h2">
                    {{ hospitalStats.antrianIgd }}
                  </div>
                  <div class="text-muted font-weight-bold">Antrian IGD</div>
                  <div class="text-muted font-size-sm">
                    Status: {{ hospitalStats.antrianIgdStatus }}
                  </div>
                  <div class="mt-2">
                    <span
                      :class="getIgdLabelClass(hospitalStats.antrianIgdStatus)"
                    >
                      {{ getIgdStatusText(hospitalStats.antrianIgdStatus) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Idle Capacity -->
              <div class="col-md-3">
                <div class="bg-light-warning rounded p-4 text-center">
                  <div class="symbol symbol-45 mr-3 mb-3">
                    <div class="symbol-label bg-warning">
                      <i class="ri-tools-line text-white"></i>
                    </div>
                  </div>
                  <div class="font-weight-bolder text-warning font-size-h2">
                    {{ hospitalStats.idleCapacity }}
                  </div>
                  <div class="text-muted font-weight-bold">Idle Capacity</div>
                  <div class="text-muted font-size-sm">Ruang Kosong</div>
                  <div class="mt-2">
                    <button
                      class="btn btn-sm btn-warning"
                      @click="showEfficiencyRecommendations"
                    >
                      <i class="ri-lightbulb-line mr-1"></i> Rekomendasi
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- BOR Trend Chart -->
            <div class="row mt-6">
              <div class="col-md-12">
                <h4 class="mb-4">Trend BOR 30 Hari</h4>
                <apexchart
                  type="line"
                  height="200"
                  :options="borTrendOptions"
                  :series="borTrendSeries"
                ></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Financial Overview -->
    <div class="row mb-6">
      <div class="col-md-8">
        <div class="card card-custom">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-money-dollar-circle-line mr-2"></i>
                Overview Finansial
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5>Pendapatan vs Biaya Operasional</h5>
                <apexchart
                  type="bar"
                  height="250"
                  :options="revenueCostOptions"
                  :series="revenueCostSeries"
                ></apexchart>
              </div>
              <div class="col-md-6">
                <h5>Pendapatan per Layanan</h5>
                <div class="row">
                  <div
                    class="col-md-6"
                    v-for="service in revenuePerService"
                    :key="service.name"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <span class="font-weight-bold">{{ service.name }}</span>
                      <span class="text-muted">{{
                        formatCurrency(service.amount)
                      }}</span>
                    </div>
                    <div class="progress progress-xs mb-3">
                      <div
                        class="progress-bar"
                        :class="service.color"
                        :style="{ width: service.percentage + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card card-custom">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-shield-check-line mr-2"></i>
                Klaim BPJS
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold">Outstanding</span>
                <span
                  class="label label-inline label-light-warning font-weight-bold"
                  >{{ bpjsClaims.outstanding }}</span
                >
              </div>
            </div>
            <div class="mb-4">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold">In Progress</span>
                <span
                  class="label label-inline label-light-info font-weight-bold"
                  >{{ bpjsClaims.inProgress }}</span
                >
              </div>
            </div>
            <div class="mb-4">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold">Potensi Reject</span>
                <span
                  class="label label-inline label-light-danger font-weight-bold"
                  >{{ bpjsClaims.potensiReject }}</span
                >
              </div>
            </div>
            <div class="mt-4">
              <h5>Cost per Pasien (Trend)</h5>
              <apexchart
                type="line"
                height="120"
                :options="costPerPatientOptions"
                :series="costPerPatientSeries"
              ></apexchart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Operational Dashboard -->
    <div class="row mb-6">
      <div class="col-md-6">
        <div class="card card-custom">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-user-3-line mr-2"></i>
                Pelayanan dan Kunjungan
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div
                class="col-md-4"
                v-for="visit in pelayananStats"
                :key="visit.type"
              >
                <div class="text-center mb-4">
                  <div class="font-weight-bolder font-size-h3 text-primary">
                    {{ visit.total }}
                  </div>
                  <div class="text-muted">{{ visit.type }}</div>
                  <div class="text-muted font-size-sm">
                    {{ visit.averageTime }} menit
                  </div>
                </div>
              </div>
            </div>
            <div class="separator separator-dashed my-4"></div>
            <h5>Kepuasan Pasien</h5>
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <div class="progress progress-xs">
                  <div class="progress-bar bg-success" style="width: 89%"></div>
                </div>
              </div>
              <div class="ml-4">
                <span class="font-weight-bolder">89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card card-custom">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-team-line mr-2"></i>
                SDM & Tenaga Medis
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h6>Kehadiran Hari Ini</h6>
                <div class="d-flex align-items-center mb-3">
                  <div class="symbol symbol-40 symbol-light mr-3">
                    <div class="symbol-label">
                      <span class="font-weight-bolder"
                        >{{ sdmStats.presence }}%</span
                      >
                    </div>
                  </div>
                  <div class="d-flex flex-column flex-grow-1">
                    <div class="progress progress-xs mt-2 mb-2">
                      <div
                        class="progress-bar bg-success"
                        :style="{ width: sdmStats.presence + '%' }"
                      ></div>
                    </div>
                    <span class="text-muted"
                      >{{ sdmStats.present }}/{{ sdmStats.total }} Hadir</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h6>Rasio Tenaga : Pasien</h6>
                <div class="text-center">
                  <div class="font-weight-bolder font-size-h2">
                    1:{{ sdmStats.ratio }}
                  </div>
                  <div class="text-muted">Dokter : Pasien per Shift</div>
                </div>
              </div>
            </div>
            <div class="separator separator-dashed my-4"></div>
            <h6>Shift Kosong / Lembur</h6>
            <div class="row">
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <i class="ri-user-unfollow-line text-danger mr-2"></i>
                  <span>Shift Kosong: {{ sdmStats.emptyShift }}</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <i class="ri-time-line text-warning mr-2"></i>
                  <span>Lembur: {{ sdmStats.overtime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Assistant Section -->
    <div class="row">
      <div class="col-md-12">
        <div class="card card-custom">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-robot-line mr-2"></i>
                AI Assistant Monitoring
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div
                class="col-md-3"
                v-for="aiRecommendation in aiRecommendations"
                :key="aiRecommendation.id"
              >
                <div class="d-flex align-items-start mb-4">
                  <div class="symbol symbol-35 mr-3">
                    <div class="symbol-label bg-light-primary">
                      <i
                        :class="aiRecommendation.icon"
                        class="text-primary"
                      ></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div class="font-weight-bold text-dark">
                      {{ aiRecommendation.title }}
                    </div>
                    <div class="text-muted font-size-sm">
                      {{ aiRecommendation.description }}
                    </div>
                    <button
                      class="btn btn-sm btn-primary mt-2"
                      @click="implementAIRecommendation(aiRecommendation)"
                    >
                      <i class="ri-check-line mr-1"></i> Terapkan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row mt-6">
      <div class="col-md-12">
        <div class="card card-custom">
          <div class="card-header">
            <div class="card-title">
              <h3 class="card-label">
                <i class="ri-flashlight-line mr-2"></i>
                One-Click Commands
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div
                class="col-md-3 mb-3"
                v-for="action in quickActions"
                :key="action.id"
              >
                <button
                  class="btn btn-block"
                  :class="action.class"
                  @click="executeQuickAction(action)"
                >
                  <i :class="action.icon" class="mr-2"></i>
                  {{ action.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

moment.locale('id')

export default {
  name: 'dashboard-executive',
  data() {
    return {
      selectedPeriod: 'Hari Ini',
      hasAlerts: true,
      hospitalStats: {
        totalKunjungan: 1247,
        kunjunganGrowth: 12.5,
        bor: 78,
        totalTempatTidur: 200,
        tempatTidurTerisi: 156,
        antrianIgd: 23,
        antrianIgdStatus: 'normal',
        idleCapacity: 5
      },
      criticalAlerts: [
        {
          id: 1,
          type: 'bor',
          icon: 'ri-home-4-line text-danger',
          message: 'BOR ICU mencapai 92% - Rekomendasi buka ruang tambahan',
          action: 'open_room'
        },
        {
          id: 2,
          type: 'obat',
          icon: 'ri-medicine-bottle-line text-warning',
          message: 'Stok Paracetamol tersisa 3 hari - Perlu penambahan stok',
          action: 'order_medicine'
        },
        {
          id: 3,
          type: 'igd',
          icon: 'ri-first-aid-kit-line text-danger',
          message: 'Antrian IGD meningkat 45% dalam 2 jam terakhir',
          action: 'add_doctor'
        }
      ],
      revenuePerService: [
        { name: 'Rawat Jalan', amount: 450000000, percentage: 35, color: 'bg-primary' },
        { name: 'Rawat Inap', amount: 520000000, percentage: 40, color: 'bg-success' },
        { name: 'IGD', amount: 180000000, percentage: 14, color: 'bg-warning' },
        { name: 'Lab', amount: 95000000, percentage: 7, color: 'bg-info' },
        { name: 'Radiologi', amount: 55000000, percentage: 4, color: 'bg-danger' }
      ],
      bpjsClaims: {
        outstanding: 234,
        inProgress: 156,
        potensiReject: 12
      },
      pelayananStats: [
        { type: 'Rawat Jalan', total: 456, averageTime: 15 },
        { type: 'Rawat Inap', total: 178, averageTime: 8 },
        { type: 'IGD', total: 89, averageTime: 25 }
      ],
      sdmStats: {
        presence: 87,
        present: 174,
        total: 200,
        ratio: 8,
        emptyShift: 3,
        overtime: 15
      },
      aiRecommendations: [
        {
          id: 1,
          title: 'Buka Ruang Tambahan',
          description: 'Prediksi BOR akan mencapai 85% besok, rekomendasi buka 2 ruang kelas 3',
          icon: 'ri-home-add-line',
          action: 'open_room'
        },
        {
          id: 2,
          title: 'Prediksi Kunjungan',
          description: 'Besok diprediksi terjadi lonjakan 15% kunjungan IGD',
          icon: 'ri-line-chart-line',
          action: 'prepare_staff'
        },
        {
          id: 3,
          title: 'Kebutuhan Obat',
          description: 'Antibiotik Ciprofloxacin diprediksi habis dalam 7 hari',
          icon: 'ri-capsule-line',
          action: 'order_medicine'
        },
        {
          id: 4,
          title: 'Beban IGD',
          description: 'Berdasarkan pola historis, IGD akan padat jam 19-22',
          icon: 'ri-time-line',
          action: 'add_igd_staff'
        }
      ],
      quickActions: [
        {
          id: 1,
          title: 'Kirim Instruksi',
          icon: 'ri-message-3-line',
          class: 'btn-primary',
          action: 'send_instruction'
        },
        {
          id: 2,
          title: 'Dispatch Tenaga Medis',
          icon: 'ri-user-add-line',
          class: 'btn-success',
          action: 'dispatch_staff'
        },
        {
          id: 3,
          title: 'Approval Buka Ruang',
          icon: 'ri-home-add-line',
          class: 'btn-warning',
          action: 'approve_room'
        },
        {
          id: 4,
          title: 'Penanganan Outbreak',
          icon: 'ri-shield-virus-line',
          class: 'btn-danger',
          action: 'outbreak_response'
        }
      ],
      borTrendOptions: {
        chart: {
          type: 'line',
          height: 200,
          toolbar: { show: false }
        },
        xaxis: {
          categories: [
              "19/10",
              "20/10",
              "21/10",
              "22/10",
              "23/10",
              "24/10",
              "25/10",
              "26/10",
              "27/10",
              "28/10",
              "29/10",
              "30/10",
              "31/10",
              "01/11",
              "02/11",
              "03/11",
              "04/11",
              "05/11",
              "06/11",
              "07/11",
              "08/11",
              "09/11",
              "10/11",
              "11/11",
              "12/11",
              "13/11",
              "14/11",
              "15/11",
              "16/11",
              "17/11"
          ]
        },
        yaxis: {
          max: 100,
          labels: {
            formatter: (val) => val + '%'
          }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        colors: ['#3699FF'],
        tooltip: {
          y: {
            formatter: (val) => val + '%'
          }
        }
      },
      borTrendSeries: [{
        name: 'BOR %',
        data: [
            90,
            81,
            91,
            83,
            77,
            67,
            72,
            86,
            78,
            78,
            89,
            76,
            79,
            77,
            84,
            79,
            93,
            93,
            71,
            67,
            70,
            74,
            68,
            68,
            72,
            67,
            80,
            83,
            82,
            85
        ]
      }],
      revenueCostOptions: {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: { show: false }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']
        },
        colors: ['#3699FF', '#F64E60']
      },
      revenueCostSeries: [
        {
          name: 'Pendapatan',
          data: [1200, 1350, 1100, 1450, 1300, 1550]
        },
        {
          name: 'Biaya Operasional',
          data: [900, 950, 850, 1000, 920, 1050]
        }
      ],
      costPerPatientOptions: {
        chart: {
          type: 'line',
          height: 120,
          toolbar: { show: false }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']
        },
        colors: ['#F64E60']
      },
      costPerPatientSeries: [{
        name: 'Cost per Pasien',
        data: [850000, 920000, 880000, 950000, 980000, 1020000]
      }]
    }
  },
  mounted() {
    // Initialize chart data
    // this.borTrendOptions.xaxis.categories = this.generateDateLabels(30)
    // this.borTrendSeries[0].data = this.generateBorData(30)

    // this.refreshData()
  },
  methods: {
    setPeriod(period) {
      this.selectedPeriod = period
      this.refreshData()
    },

    formatNumber(num) {
      return num.toLocaleString('id-ID')
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount)
    },

    getIgdAlertClass(status) {
      switch (status) {
        case 'normal': return 'bg-light-success'
        case 'padat': return 'bg-light-warning'
        case 'kritis': return 'bg-light-danger'
        default: return 'bg-light-primary'
      }
    },

    getIgdSymbolClass(status) {
      switch (status) {
        case 'normal': return 'symbol-label bg-success'
        case 'padat': return 'symbol-label bg-warning'
        case 'kritis': return 'symbol-label bg-danger'
        default: return 'symbol-label bg-primary'
      }
    },

    getIgdLabelClass(status) {
      switch (status) {
        case 'normal': return 'label label-inline label-light-success font-weight-bold'
        case 'padat': return 'label label-inline label-light-warning font-weight-bold'
        case 'kritis': return 'label label-inline label-light-danger font-weight-bold'
        default: return 'label label-inline label-light-primary font-weight-bold'
      }
    },

    getIgdStatusText(status) {
      switch (status) {
        case 'normal': return 'Normal ✓'
        case 'padat': return 'Padat ⚠'
        case 'kritis': return 'Kritis ⚠'
        default: return status
      }
    },

    generateDateLabels(days) {
      const labels = []
      for (let i = days - 1; i >= 0; i--) {
        labels.push(moment().subtract(i, 'days').format('DD/MM'))
      }
      console.log('===> dashboard_executive.vue:860 ~ generateDateLabels', labels);
      return labels
    },

    generateBorData(days) {
      const data = []
      for (let i = 0; i < days; i++) {
        data.push(Math.floor(Math.random() * 30) + 65) // Random BOR between 65-95
      }
      console.log('===> dashboard_executive.vue:835 ~ data', data);
      return data
    },

    refreshData() {
      // Simulate data refresh
      console.log('Refreshing data for period:', this.selectedPeriod)
    },

    handleAlert(alert) {
      console.log('Handling alert:', alert)
    },

    showEfficiencyRecommendations() {
      this.$_alert.info(
        'Rekomendasi Efisiensi',
        'Berdasarkan analisis, 5 ruang kosong dapat dioptimalkan:\n\n• 2 ruang VIP dapat dialihkan ke kelas 3\n• 1 ruang rawat jalan dapat digabung\n• 2 ruang admin dapat sharing'
      )
    },

    implementAIRecommendation(recommendation) {
      this.$_alert.confirm(
        'Terapkan Rekomendasi AI',
        `Apakah Anda ingin menerapkan rekomendasi: "${recommendation.title}"?`
      ).then((result) => {
        if (result.isConfirmed) {
          console.log('Implementing AI recommendation:', recommendation)
          this.$_alert.success('Rekomendasi AI berhasil diterapkan')
        }
      })
    },

    executeQuickAction(action) {
      this.$_alert.confirm(
        action.title,
        `Apakah Anda yakin ingin ${action.title.toLowerCase()}?`
      ).then((result) => {
        if (result.isConfirmed) {
          console.log('Executing quick action:', action)
          this.$_alert.success(`${action.title} berhasil dieksekusi`)
        }
      })
    }
  }
}
</script>

<style scoped>
.dashboard-executive {
  padding: 20px;
}

.symbol-label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.progress-xs {
  height: 4px;
}

.font-size-h2 {
  font-size: 2.5rem !important;
}

.font-size-h3 {
  font-size: 2rem !important;
}

.font-size-sm {
  font-size: 0.85rem !important;
}

.card-custom {
  box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05);
}

.alert-custom {
  border-left: 4px solid;
}

.alert-light-danger {
  background-color: #fff5f5;
  border-color: #f64e60;
  color: #721c24;
}

.alert-light-warning {
  background-color: #fffbf0;
  border-color: #ffa800;
  color: #856404;
}

.alert-light-success {
  background-color: #f1faf2;
  border-color: #1bc5bd;
  color: #0f5132;
}

.alert-light-info {
  background-color: #f0f7ff;
  border-color: #3699ff;
  color: #0c5460;
}

.alert-light-primary {
  background-color: #f5f8ff;
  border-color: #6993ff;
  color: #004085;
}

.separator {
  height: 1px;
  background: #ebedf2;
}

.separator-dashed {
  background: #ebedf2;
  background-image: linear-gradient(to right, #ebedf2 50%, transparent 50%);
  background-size: 8px 1px;
  background-repeat: repeat-x;
}

.bg-light-primary {
  background-color: #f5f8ff !important;
}

.bg-light-success {
  background-color: #f1faf2 !important;
}

.bg-light-warning {
  background-color: #fffbf0 !important;
}

.bg-light-danger {
  background-color: #fff5f5 !important;
}

.bg-light-info {
  background-color: #f0f7ff !important;
}

.label {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}

.label-inline {
  display: inline-flex;
  align-items: center;
}

.label-light-success {
  color: #1bc5bd;
  background-color: #f1faf2;
}

.label-light-warning {
  color: #ffa800;
  background-color: #fffbf0;
}

.label-light-danger {
  color: #f64e60;
  background-color: #fff5f5;
}

.label-light-info {
  color: #3699ff;
  background-color: #f0f7ff;
}

.label-light-primary {
  color: #6993ff;
  background-color: #f5f8ff;
}
</style>
