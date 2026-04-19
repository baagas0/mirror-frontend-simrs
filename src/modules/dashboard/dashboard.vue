<template lang="">
    <div class="container-fluid">
      <!-- Page Header -->
      <div class="row mb-8">
        <div class="col-12">
          <div class="d-flex align-items-center flex-wrap">
            <div class="flex-grow-1">
              <h2 class="font-weight-boldest text-dark mb-0">Dashboard</h2>
              <p class="text-muted font-size-sm">Statistik pasien, kunjungan poliklinik, dan ketersediaan bed</p>
            </div>
            <!-- Global Date Filter -->
            <div class="flex-shrink-0">
              <div class="card card-custom global-filter-card shadow-sm">
                <div class="card-body py-4 px-6">
                  <form @submit.prevent="applyGlobalFilter" autocomplete="off">
                    <div class="d-flex align-items-center flex-wrap">
                      <div class="d-flex align-items-center mr-6">
                        <label class="global-filter-label mr-3">Periode:</label>
                        <div class="d-flex align-items-center">
                          <div class="mr-3 global-filter-date">
                            <date-picker
                              id="global_tanggal_awal"
                              class="form-control form-control-solid"
                              format="MMMM - YYYY"
                              type="month"
                              size="sm"
                              v-model="globalFilter.tanggal_awal"
                              placeholder="Dari"
                            ></date-picker>
                          </div>
                          <span class="mx-2 filter-separator">s/d</span>
                          <div class="ml-3 global-filter-date">
                            <date-picker
                              id="global_tanggal_akhir"
                              class="form-control form-control-solid"
                              format="MMMM - YYYY"
                              type="month"
                              size="sm"
                              v-model="globalFilter.tanggal_akhir"
                              placeholder="Sampai"
                            ></date-picker>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex align-items-center global-filter-buttons">
                        <button type="submit" class="btn btn-sm btn-primary font-weight-bolder mr-2">
                          <i class="ri-search-line"></i>
                          Terapkan
                        </button>
                        <button type="button" @click="resetGlobalFilter" class="btn btn-sm btn-light-danger font-weight-bolder">
                          <i class="ri-refresh-line"></i>
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bed Availability Dashboard -->
      <div class="row">
        <div class="col-12">
          <div class="card card-custom card-stretch gutter-b">
            <div class="card-header border-0 pt-5">
              <div class="card-title">
                <div class="card-label">
                  <div class="font-weight-boldest text-dark">Dashboard Ketersediaan Bed</div>
                  <div class="font-size-sm text-muted mt-1">Pantau sisa bed, okupansi, dan ketersediaan per ruang secara realtime</div>
                </div>
              </div>
              <div class="card-toolbar">
                <div class="d-flex align-items-center flex-wrap justify-content-end">
                  <span class="label label-light-info label-inline font-weight-bolder mr-3 mb-2 mb-sm-0">
                    {{ getBedDashboardScopeLabel() }}
                  </span>
                  <button class="btn btn-sm btn-light-primary font-weight-bolder" type="button" @click="getBedDashboard">
                    <i class="ri-refresh-line"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body pt-3">
              <form @submit.prevent="applyBedDashboardFilter" autocomplete="off">
                <div class="row">
                  <div class="col-xl-2 col-lg-3 col-md-6 mb-5">
                    <s-input
                      groupClass="mb-0"
                      v-model="bedDashboardFilter.kode_jenis_layanan"
                      :item="{
                        label: 'Jenis Layanan',
                        id: 'bed_kode_jenis_layanan',
                        data: 'bed_kode_jenis_layanan',
                        type: 'lookup-radio',
                        value: bedDashboardFilter.kode_jenis_layanan,
                        pointer: {
                          label: 'label',
                          code: 'code',
                          display: ['label'],
                          list: [
                            { label: 'Semua Layanan', code: '' },
                            { label: 'Rawat Inap', code: 'RINAP' },
                            { label: 'IGD', code: 'IGD' },
                            { label: 'Rawat Jalan', code: 'RJALAN' },
                          ],
                        },
                        param: {},
                      }"
                      :valuee="bedDashboardFilter.kode_jenis_layanan" />
                  </div>
                  <div class="col-xl-2 col-lg-3 col-md-6 mb-5">
                    <s-input
                      groupClass="mb-0"
                      v-model="bedDashboardFilter.status_bed"
                      :item="{
                        label: 'Status Bed',
                        id: 'bed_status_bed',
                        data: 'bed_status_bed',
                        type: 'lookup-radio',
                        value: bedDashboardFilter.status_bed,
                        pointer: {
                          label: 'label',
                          code: 'code',
                          display: ['label'],
                          list: [
                            { label: 'Semua Status', code: '' },
                            { label: 'Bed Aktif', code: 1 },
                            { label: 'Bed Nonaktif', code: 0 },
                          ],
                        },
                        param: {},
                      }"
                      :valuee="bedDashboardFilter.status_bed" />
                  </div>
                  <div class="col-xl-2 col-lg-3 col-md-6 mb-5">
                    <s-input
                      groupClass="mb-0"
                      v-model="bedDashboardFilter.ms_ruang_id"
                      :item="{
                        label: 'Ruang',
                        id: 'bed_ms_ruang_id',
                        data: 'bed_ms_ruang_id',
                        type: 'lookup-radio',
                        value: bedDashboardFilter.ms_ruang_id,
                        api: 'msRuang',
                        getter: 'msRuang',
                        setter: 'msRuang',
                        pointer: {
                          label: 'nama_ruang',
                          code: 'id',
                          display: ['nama_ruang'],
                          headerDisplay: ['Ruang'],
                        },
                        param: {},
                      }"
                      :valuee="bedDashboardFilter.ms_ruang_id"
                      @input="onBedRuangChange" />
                  </div>
                  <div class="col-xl-2 col-lg-3 col-md-6 mb-5">
                    <s-input
                      groupClass="mb-0"
                      v-model="bedDashboardFilter.ms_kamar_id"
                      :item="{
                        label: 'Kamar',
                        id: 'bed_ms_kamar_id',
                        data: 'bed_ms_kamar_id',
                        type: 'lookup-radio',
                        value: bedDashboardFilter.ms_kamar_id,
                        api: 'msKamar',
                        getter: 'msKamar',
                        setter: 'msKamar',
                        pointer: {
                          label: 'nama_kamar',
                          code: 'ms_kamar_id',
                          display: ['nama_kamar', 'nama_ruang'],
                          headerDisplay: ['Kamar', 'Ruang'],
                        },
                        param: bedDashboardFilter.ms_ruang_id ? { ms_ruang_id: bedDashboardFilter.ms_ruang_id } : {},
                      }"
                      :valuee="bedDashboardFilter.ms_kamar_id" />
                  </div>
                  <div class="col-xl-2 col-lg-3 col-md-6 mb-5">
                    <s-input
                      groupClass="mb-0"
                      v-model="bedDashboardFilter.ms_kelas_kamar_id"
                      :item="{
                        label: 'Kelas Kamar',
                        id: 'bed_ms_kelas_kamar_id',
                        data: 'bed_ms_kelas_kamar_id',
                        type: 'lookup-radio',
                        value: bedDashboardFilter.ms_kelas_kamar_id,
                        api: 'msKelasKamar',
                        getter: 'msKelasKamar',
                        setter: 'msKelasKamar',
                        pointer: {
                          label: 'nama_kelas_kamar',
                          code: 'id',
                          display: ['nama_kelas_kamar'],
                          headerDisplay: ['Kelas Kamar'],
                        },
                        param: {},
                      }"
                      :valuee="bedDashboardFilter.ms_kelas_kamar_id" />
                  </div>
                  <div class="col-xl-2 col-lg-3 col-md-6 mb-5 d-flex align-items-end">
                    <div class="d-flex flex-wrap w-100 bed-filter-actions">
                      <button type="submit" class="btn btn-primary font-weight-bolder mr-2 mb-2">
                        <i class="ri-search-line"></i>
                        Terapkan
                      </button>
                      <button type="button" class="btn btn-light-danger font-weight-bolder mb-2" @click="resetBedDashboardFilter">
                        <i class="ri-refresh-line"></i>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div class="row mb-6">
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="bed-summary-card bg-light-success rounded-xl px-6 py-6 h-100">
                    <div class="d-flex align-items-start justify-content-between">
                      <div>
                        <div class="font-size-sm text-muted text-uppercase">Sisa Bed Tersedia</div>
                        <div class="font-weight-boldest font-size-h1 text-success mt-2">{{ bedDashboardSummary.sisa_bed_tersedia }}</div>
                        <div class="font-size-sm text-muted mt-2">Dari {{ bedDashboardSummary.total_bed_aktif }} bed aktif</div>
                      </div>
                      <div class="bed-summary-icon text-success">
                        <i class="ri-hotel-bed-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="bed-summary-card bg-light-warning rounded-xl px-6 py-6 h-100">
                    <div class="d-flex align-items-start justify-content-between">
                      <div>
                        <div class="font-size-sm text-muted text-uppercase">Bed Terpakai</div>
                        <div class="font-weight-boldest font-size-h1 text-warning mt-2">{{ bedDashboardSummary.bed_terpakai }}</div>
                        <div class="font-size-sm text-muted mt-2">Pasien masih menempati bed aktif</div>
                      </div>
                      <div class="bed-summary-icon text-warning">
                        <i class="ri-user-heart-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="bed-summary-card bg-light-primary rounded-xl px-6 py-6 h-100">
                    <div class="d-flex align-items-start justify-content-between">
                      <div>
                        <div class="font-size-sm text-muted text-uppercase">Total Bed Aktif</div>
                        <div class="font-weight-boldest font-size-h1 text-primary mt-2">{{ bedDashboardSummary.total_bed_aktif }}</div>
                        <div class="font-size-sm text-muted mt-2">Total bed: {{ bedDashboardSummary.total_bed }}</div>
                      </div>
                      <div class="bed-summary-icon text-primary">
                        <i class="ri-hospital-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="bed-summary-card bg-light-danger rounded-xl px-6 py-6 h-100">
                    <div class="d-flex align-items-start justify-content-between">
                      <div class="w-100">
                        <div class="font-size-sm text-muted text-uppercase">Persentase Okupansi</div>
                        <div class="font-weight-boldest font-size-h1 text-danger mt-2">{{ formatBedPercentage(bedDashboardSummary.persentase_okupansi) }}%</div>
                        <div class="progress progress-xs mt-4">
                          <div
                            class="progress-bar bg-danger"
                            role="progressbar"
                            :style="{ width: `${Math.min(100, Number(bedDashboardSummary.persentase_okupansi) || 0)}%` }"
                            :aria-valuenow="Number(bedDashboardSummary.persentase_okupansi) || 0"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                        <div class="font-size-sm text-muted mt-3">Bed nonaktif: {{ bedDashboardSummary.bed_nonaktif }}</div>
                      </div>
                      <div class="bed-summary-icon text-danger ml-4">
                        <i class="ri-line-chart-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card bed-room-table-card border-0">
                <div class="card-header px-0 pt-0 pb-4 border-0">
                  <div class="card-title mb-0">
                    <div class="card-label">
                      <div class="font-weight-bold text-dark">Rincian Per Ruang</div>
                      <div class="font-size-sm text-muted mt-1">{{ bedDashboardSummary.per_ruang.length }} ruang sesuai filter aktif</div>
                    </div>
                  </div>
                </div>
                <div class="card-body px-0 py-0">
                  <div class="table-responsive">
                    <b-table
                      :items="bedDashboardSummary.per_ruang"
                      :fields="fieldsBedPerRuang"
                      responsive
                      show-empty
                      hover
                      :busy="busyBedDashboard"
                      class="table table-head-custom table-vertical-center mb-0"
                      thead-class="bg-light"
                    >
                      <template #cell(nama_ruang)="data">
                        <span class="font-weight-bold text-dark">{{ data.value || '-' }}</span>
                      </template>
                      <template #cell(bed_tersedia)="data">
                        <span class="label label-lg label-light-success label-inline font-weight-bolder">{{ data.value }}</span>
                      </template>
                      <template #cell(bed_terpakai)="data">
                        <span class="label label-lg label-light-warning label-inline font-weight-bolder">{{ data.value }}</span>
                      </template>
                      <template #cell(total_bed_aktif)="data">
                        <span class="label label-lg label-light-primary label-inline font-weight-bolder">{{ data.value }}</span>
                      </template>
                      <template #cell(bed_nonaktif)="data">
                        <span class="label label-lg label-light-danger label-inline font-weight-bolder">{{ data.value }}</span>
                      </template>
                      <template #cell(persentase_okupansi)="data">
                        <div class="d-flex align-items-center">
                          <span class="font-weight-bolder text-dark mr-3">{{ formatBedPercentage(data.value) }}%</span>
                          <div class="progress progress-xs flex-grow-1">
                            <div
                              class="progress-bar"
                              :class="getBedOccupancyBarClass(data.value)"
                              role="progressbar"
                              :style="{ width: `${Math.min(100, Number(data.value) || 0)}%` }"
                              :aria-valuenow="Number(data.value) || 0"
                              aria-valuemin="0"
                              aria-valuemax="100"></div>
                          </div>
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-center py-8">
                          <i class="ri-hotel-bed-line display-4 text-muted"></i>
                          <p class="text-muted mt-2">Belum ada data ketersediaan bed untuk filter ini</p>
                        </div>
                      </template>
                      <template #table-busy>
                        <div class="text-center py-8">
                          <div class="spinner spinner-primary spinner-lg"></div>
                          <p class="text-muted mt-2">Memuat ringkasan bed...</p>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Stats Row -->
      <div class="row">
        <div class="col-12">
          <div class="card card-custom card-stretch gutter-b">
            <div class="card-header border-0 pt-5 pb-5">
              <div class="card-title">
                <div class="card-label">
                  <div class="font-weight-boldest text-dark">Ringkasan Statistik</div>
                  <div class="font-size-sm text-muted mt-1">Statistik keseluruhan untuk periode terpilih</div>
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="row">
                <div class="col-md-3">
                  <div class="bg-light-primary px-6 py-8 rounded-xl">
                    <div class="row align-items-center">
                      <div class="col-6">
                        <div class="font-weight-boldest font-size-h3 text-primary">{{ totalRowsPasienByPenyakit }}</div>
                        <div class="font-size-sm text-muted">Total Penyakit</div>
                      </div>
                      <div class="col-6 text-right">
                        <span class="svg-icon svg-icon-3x svg-icon-primary">
                          <i class="ri-stethoscope-line display-4"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="bg-light-success px-6 py-8 rounded-xl">
                    <div class="row align-items-center">
                      <div class="col-6">
                        <div class="font-weight-boldest font-size-h3 text-success">{{ series[0].data.reduce((a, b) => Number(a) + Number(b), 0) }}</div>
                        <div class="font-size-sm text-muted">Total Kunjungan</div>
                      </div>
                      <div class="col-6 text-right">
                        <span class="svg-icon svg-icon-3x svg-icon-success">
                          <i class="ri-group-line display-4"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="bg-light-warning px-6 py-8 rounded-xl">
                    <div class="row align-items-center">
                      <div class="col-6">
                        <div class="font-weight-boldest font-size-h3 text-warning">{{ chartOptions.xaxis.categories.length }}</div>
                        <div class="font-size-sm text-muted">Poli Aktif</div>
                      </div>
                      <div class="col-6 text-right">
                        <span class="svg-icon svg-icon-3x svg-icon-warning">
                          <i class="ri-hospital-line display-4"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="bg-light-info px-6 py-8 rounded-xl">
                    <div class="row align-items-center">
                      <div class="col-6">
                        <div class="font-weight-boldest font-size-h3 text-info">{{ series[0].data.length ? Math.max(...series[0].data) : 0 }}</div>
                        <div class="font-size-sm text-muted">Kunjungan Poli Tertinggi</div>
                      </div>
                      <div class="col-6 text-right">
                        <span class="svg-icon svg-icon-3x svg-icon-info">
                          <i class="ri-arrow-up-line display-4"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Row -->
      <div class="row">
        <!-- Pasien By Penyakit Card -->
        <div class="col-xl-6 col-lg-12">
          <div class="card card-custom card-stretch gutter-b">
            <div class="card-header border-0 pt-5">
              <div class="card-title">
                <div class="card-label">
                  <div class="font-weight-boldest text-dark">Pasien By Penyakit</div>
                  <div class="font-size-sm text-muted mt-1">Data statistik pasien berdasarkan diagnosa</div>
                </div>
              </div>
              <div class="card-toolbar">
                <div class="d-flex align-items-center">
                  <span class="text-muted font-size-sm mr-3" v-if="globalFilter.tanggal_awal && globalFilter.tanggal_akhir">
                    {{ formatGlobalFilterRange() }}
                  </span>
                  <button class="btn btn-sm btn-light-primary font-weight-bolder" @click="refreshPasienByPenyakit">
                    <i class="ri-refresh-line"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body pt-3">

              <!-- Table Section -->
              <div class="table-responsive">
                <b-table
                  :items="listPasienByPenyakit"
                  :fields="fieldsPasienByPenyakit"
                  :current-page="dataFilterPasienByPenyakit.halaman"
                  :per-page="dataFilterPasienByPenyakit.jumlah"
                  responsive
                  show-empty
                  hover
                  :busy="busy"
                  class="table table-head-custom table-vertical-center"
                  thead-class="bg-light"
                >
                  <template #cell(kode_diagnosa)="data">
                    <span class="font-weight-bolder">{{ data.value }}</span>
                  </template>
                  <template #cell(nama_diagnosa)="data">
                    <span class="text-dark-75">{{ data.value }}</span>
                  </template>
                  <template #cell(total)="data">
                    <span class="label label-lg label-light-primary label-inline font-weight-bolder">{{ data.value }}</span>
                  </template>
                  <template #empty>
                    <div class="text-center py-8">
                      <i class="ri-inbox-line display-4 text-muted"></i>
                      <p class="text-muted mt-2">Belum ada data pasien</p>
                    </div>
                  </template>
                  <template #table-busy>
                    <div class="text-center py-8">
                      <div class="spinner spinner-primary spinner-lg"></div>
                      <p class="text-muted mt-2">Memuat data...</p>
                    </div>
                  </template>
                </b-table>
              </div>

              <!-- Pagination -->
              <div class="d-flex justify-content-between align-items-center flex-wrap mt-6">
                <div class="d-flex align-items-center">
                  <span class="text-muted">Menampilkan {{ dataFilterPasienByPenyakit.jumlah }} data per halaman</span>
                </div>
                <b-pagination
                  class="mb-0"
                  v-model="dataFilterPasienByPenyakit.halaman"
                  :total-rows="totalRowsPasienByPenyakit"
                  :per-page="dataFilterPasienByPenyakit.jumlah"
                  align="right"
                  size="sm"
                  first-text="Pertama"
                  prev-text="Sebelumnya"
                  next-text="Selanjutnya"
                  last-text="Terakhir"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>

        <!-- Disease Distribution Doughnut Chart - Shows when chart is split -->
        <div class="col-xl-6 col-lg-12" v-if="shouldSplitChart">
          <div class="card card-custom card-stretch gutter-b">
            <div class="card-header border-0 pt-5">
              <div class="card-title">
                <div class="card-label">
                  <div class="font-weight-boldest text-dark">Distribusi Penyakit</div>
                  <div class="font-size-sm text-muted mt-1">Visualisasi data pasien berdasarkan diagnosa</div>
                </div>
              </div>
              <div class="card-toolbar">
                <div class="d-flex align-items-center">
                  <span class="text-muted font-size-sm mr-3" v-if="globalFilter.tanggal_awal && globalFilter.tanggal_akhir">
                    {{ formatGlobalFilterRange() }}
                  </span>
                  <span class="label label-light-info label-inline font-weight-bolder mr-3">
                    {{ getDiseaseChartData().totalCases }} Total
                  </span>
                  <button class="btn btn-sm btn-light-primary font-weight-bolder" @click="refreshDiseaseChart">
                    <i class="ri-refresh-line"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body pt-3">
              <!-- Chart Container -->
              <div class="row">
                <div class="col-md-8">
                  <div class="chart-container" style="min-height: 300px;">
                    <apexchart
                      type="donut"
                      height="350"
                      :options="doughnutChartOptions"
                      :series="doughnutSeries"
                      v-if="doughnutSeries.length > 0 && doughnutSeries.some(val => val > 0)"
                    ></apexchart>
                    <div v-else class="text-center py-8">
                      <i class="ri-pie-chart-2-line display-4 text-muted"></i>
                      <p class="text-muted mt-2">Belum ada data penyakit untuk visualisasi</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <!-- Legend & Summary -->
                  <div class="mt-4 mt-md-0">
                    <h6 class="font-weight-boldest text-dark mb-4">Top Diagnosa</h6>

                    <div v-if="getTopDiseasesForLegend().length > 0" class="space-y-3">
                      <div v-for="(disease, index) in getTopDiseasesForLegend()" :key="index" class="d-flex align-items-center doughnut-legend-item">
                        <div class="mr-3">
                          <div class="symbol symbol-20 mr-2">
                            <div class="symbol-label" :style="{backgroundColor: getDiseaseColor(index)}"></div>
                          </div>
                        </div>
                        <div class="grow">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="font-weight-600 text-dark-75 font-size-sm">{{ disease.nama_diagnosa }}</span>
                            <span class="font-weight-boldest text-dark font-size-sm">{{ disease.total }}</span>
                          </div>
                          <div class="text-muted font-size-xs">{{ getDiseasePercentage(disease.total) }}%</div>
                        </div>
                      </div>
                    </div>

                    <!-- Others Category -->
                    <div v-if="getOtherDiseasesCount() > 0" class="mt-4 pt-4 border-top">
                      <div class="d-flex align-items-center doughnut-legend-item">
                        <div class="mr-3">
                          <div class="symbol symbol-20 mr-2">
                            <div class="symbol-label bg-light-secondary"></div>
                          </div>
                        </div>
                        <div class="grow">
                          <div class="d-flex align-items-center justify-content-between">
                            <span class="font-weight-600 text-dark-75 font-size-sm">Lainnya</span>
                            <span class="font-weight-boldest text-dark font-size-sm">{{ getOtherDiseasesCount() }}</span>
                          </div>
                          <div class="text-muted font-size-xs">{{ getOtherDiseasesPercentage() }}%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Summary Stats -->
                  <div class="mt-6 pt-6 border-top">
                    <div class="row">
                      <div class="col-12">
                        <div class="text-center">
                          <div class="font-weight-boldest font-size-h2 text-primary">{{ getDiseaseChartData().totalCases }}</div>
                          <div class="text-muted font-size-sm">Total Kasus</div>
                        </div>
                      </div>
                      <div class="col-12 mt-4">
                        <div class="text-center">
                          <div class="font-weight-boldest font-size-h3 text-info">{{ getDiseaseChartData().uniqueDiseases }}</div>
                          <div class="text-muted font-size-sm">Jenis Penyakit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Chart Kunjungan Poli - Single Chart Mode -->
        <div class="col-xl-6 col-lg-12" v-if="!shouldSplitChart">
          <div class="card card-custom card-stretch gutter-b">
            <div class="card-header border-0 pt-5">
              <div class="card-title">
                <div class="card-label">
                  <div class="font-weight-boldest text-dark">Statistik Kunjungan Poli</div>
                  <div class="font-size-sm text-muted mt-1">Grafik kunjungan pasien per poliklinik</div>
                </div>
              </div>
              <div class="card-toolbar">
                <div class="d-flex align-items-center">
                  <span class="text-muted font-size-sm mr-3" v-if="globalFilter.tanggal_awal && globalFilter.tanggal_akhir">
                    {{ formatGlobalFilterRange() }}
                  </span>
                  <span class="label label-light-primary label-inline font-weight-bolder mr-3">
                    {{ series[0].data.length }} Poli
                  </span>
                  <button class="btn btn-sm btn-light-primary font-weight-bolder" @click="refreshChart">
                    <i class="ri-refresh-line"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">

              <!-- Chart Container -->
              <div class="chart-container" style="min-height: 350px;">
                <apexchart
                  type="bar"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                  v-if="series[0].data.length > 0"
                ></apexchart>
                <div v-else class="text-center py-8">
                  <i class="ri-bar-chart-2-line display-4 text-muted"></i>
                  <p class="text-muted mt-2">Belum ada data statistik</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Kunjungan Poli - Dual Chart Mode -->
        <div class="col-xl-12 col-lg-12" v-if="shouldSplitChart">
          <div class="card card-custom card-stretch gutter-b">
            <div class="card-header border-0 pt-5">
              <div class="card-title">
                <div class="card-label">
                  <div class="font-weight-boldest text-dark">Statistik Kunjungan Poli</div>
                  <div class="font-size-sm text-muted mt-1">Grafik kunjungan pasien per poliklinik (dibagi untuk optimasi tampilan)</div>
                </div>
              </div>
              <div class="card-toolbar">
                <div class="d-flex align-items-center">
                  <span class="text-muted font-size-sm mr-3" v-if="globalFilter.tanggal_awal && globalFilter.tanggal_akhir">
                    {{ formatGlobalFilterRange() }}
                  </span>
                  <span class="label label-light-warning label-inline font-weight-bolder mr-3">
                    {{ series[0].data.length }} Poli (Chart Dipecah)
                  </span>
                  <button class="btn btn-sm btn-light-primary font-weight-bolder" @click="refreshChart">
                    <i class="ri-refresh-line"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- Chart 1 - Top Performing Polis -->
                <div class="col-xl-6 col-lg-12 mb-6 mb-xl-0">
                  <div class="chart-header-box bg-light-warning rounded-xl p-4 mb-4">
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1">
                        <h6 class="font-weight-boldest text-warning mb-1">Chart 1: Poli Tertinggi</h6>
                        <p class="text-muted font-size-sm mb-0">{{ chartData1.categories.length }} poliklinik dengan kunjungan tertinggi</p>
                      </div>
                      <div class="flex-shrink-0 ml-4">
                        <i class="ri-trophy-line text-warning" style="font-size: 1.5rem;"></i>
                      </div>
                    </div>
                  </div>
                  <div class="chart-container" style="min-height: 350px;">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="chartOptions1"
                      :series="series1"
                      v-if="series1[0].data.length > 0"
                    ></apexchart>
                    <div v-else class="text-center py-8">
                      <i class="ri-bar-chart-2-line display-4 text-muted"></i>
                      <p class="text-muted mt-2">Tidak ada data untuk chart 1</p>
                    </div>
                  </div>
                </div>

                <!-- Chart 2 - Other Polis -->
                <div class="col-xl-6 col-lg-12">
                  <div class="chart-header-box bg-light-info rounded-xl p-4 mb-4">
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1">
                        <h6 class="font-weight-boldest text-info mb-1">Chart 2: Poli Lainnya</h6>
                        <p class="text-muted font-size-sm mb-0">{{ chartData2.categories.length }} poliklinik lainnya</p>
                      </div>
                      <div class="flex-shrink-0 ml-4">
                        <i class="ri-more-2-fill text-info" style="font-size: 1.5rem;"></i>
                      </div>
                    </div>
                  </div>
                  <div class="chart-container" style="min-height: 350px;">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="chartOptions2"
                      :series="series2"
                      v-if="series2[0].data.length > 0"
                    ></apexchart>
                    <div v-else class="text-center py-8">
                      <i class="ri-bar-chart-2-line display-4 text-muted"></i>
                      <p class="text-muted mt-2">Tidak ada data untuk chart 2</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Summary Stats for Split Charts -->
              <div class="mt-6 pt-6 border-top">
                <div class="chart-stats-container p-6">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="chart-stat-item text-center p-4">
                        <div class="font-weight-boldest font-size-h2 text-warning">{{ getTopPerformerCount() }}</div>
                        <div class="text-muted font-size-sm">Poli Tertinggi</div>
                        <div class="mt-2">
                          <small class="text-muted">{{ getTotalKunjunganChart1() }} kunjungan</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="chart-stat-item text-center p-4">
                        <div class="font-weight-boldest font-size-h2 text-info">{{ getOtherPoliCount() }}</div>
                        <div class="text-muted font-size-sm">Poli Lainnya</div>
                        <div class="mt-2">
                          <small class="text-muted">{{ getTotalKunjunganChart2() }} kunjungan</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="chart-stat-item text-center p-4">
                        <div class="font-weight-boldest font-size-h2 text-primary">{{ series[0].data.length }}</div>
                        <div class="text-muted font-size-sm">Total Poli</div>
                        <div class="mt-2" v-if="getTopPerformingPoli()">
                          <small class="text-muted">Teratas: {{ getTopPerformingPoli().name }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
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

  const createDefaultBedDashboardFilter = () => ({
    ms_ruang_id: '',
    ms_kamar_id: '',
    ms_kelas_kamar_id: '',
    kode_jenis_layanan: 'RINAP',
    status_bed: '',
  })

  const createDefaultBedDashboardSummary = () => ({
    total_bed: 0,
    total_bed_aktif: 0,
    bed_tersedia: 0,
    bed_terpakai: 0,
    bed_nonaktif: 0,
    sisa_bed_tersedia: 0,
    persentase_okupansi: 0,
    per_ruang: [],
  })

  export default {
    name: 'summary-maps',
    components: {
      mainFilter: () => import('@/modules/_shared/main-filter.vue')
    },
    computed: {
    shouldSplitChart() {
      // Split chart jika ada lebih dari 12 poli untuk maintain readability
      return this.series[0].data.length > 12;
    },
    chartData1() {
      if (!this.shouldSplitChart) {
        return { categories: [], data: [] };
      }

      // Ambil 8 poli dengan kunjungan tertinggi
      const maxItems = 8;
      const data = this.series[0].data.map((value, index) => ({
        category: this.chartOptions.xaxis.categories[index],
        value: value
      }));

      // Sort by value descending dan ambil top items
      data.sort((a, b) => b.value - a.value);
      const topData = data.slice(0, maxItems);

      return {
        categories: topData.map(item => item.category),
        data: topData.map(item => item.value)
      };
    },
    chartData2() {
      if (!this.shouldSplitChart) {
        return { categories: [], data: [] };
      }

      // Ambil sisanya setelah top performers
      const maxItems = 8;
      const data = this.series[0].data.map((value, index) => ({
        category: this.chartOptions.xaxis.categories[index],
        value: value
      }));

      data.sort((a, b) => b.value - a.value);
      const otherData = data.slice(maxItems);

      return {
        categories: otherData.map(item => item.category),
        data: otherData.map(item => item.value)
      };
    },
    series1() {
      return [
        {
          name: 'Jumlah Kunjungan',
          data: this.chartData1.data
        }
      ];
    },
    series2() {
      return [
        {
          name: 'Jumlah Kunjungan',
          data: this.chartData2.data
        }
      ];
    },
    chartOptions1() {
      return {
        ...this.chartOptions,
        chart: {
          ...this.chartOptions.chart,
          height: 350,
        },
        colors: ['#FFA800'], // Orange for top performers
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: this.chartData1.categories
        },
        fill: {
          ...this.chartOptions.fill,
          gradient: {
            ...this.chartOptions.fill.gradient,
            gradientToColors: ['#FFA800'],
          }
        },
        dataLabels: {
          ...this.chartOptions.dataLabels,
          colors: ['#FFA800'],
        }
      };
    },
    chartOptions2() {
      return {
        ...this.chartOptions,
        chart: {
          ...this.chartOptions.chart,
          height: 350,
        },
        colors: ['#3699FF'], // Blue for others
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: this.chartData2.categories
        },
        fill: {
          ...this.chartOptions.fill,
          gradient: {
            ...this.chartOptions.fill.gradient,
            gradientToColors: ['#3699FF'],
          }
        },
        dataLabels: {
          ...this.chartOptions.dataLabels,
          colors: ['#3699FF'],
        }
      };
    },
    // Doughnut Chart Data - cached to prevent infinite loops
    doughnutSeries() {
      const chartData = this.getDiseaseChartData();
      return chartData.series;
    },
    doughnutChartOptions() {
      const chartData = this.getDiseaseChartData();
      return {
        chart: {
          type: 'donut',
          height: 350,
        },
        series: chartData.series,
        labels: chartData.labels,
        colors: [
          '#8950FC', '#FFA800', '#3699FF', '#00B894', '#F64E60',
          '#1BC5BD', '#F64E60', '#8950FC', '#FFA800', '#3699FF'
        ],
        legend: {
          show: false // Hide default legend, using custom
        },
        dataLabels: {
          enabled: true,
          formatter: function (_, opts) {
            return opts.w.config.labels[opts.seriesIndex];
          },
          dropShadow: {
            enabled: false
          },
          style: {
            fontSize: '12px',
            colors: ['#fff'],
            fontWeight: '600'
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Total',
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#6C7293',
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  }
                }
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 0.3,
            opacityFrom: 0.85,
            opacityTo: 0.55,
          }
        },
        stroke: {
          show: true,
          width: 0,
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          y: {
            formatter: function (val) {
              return val + " kasus";
            }
          },
          style: {
            fontSize: '12px'
          }
        },
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            },
            dataLabels: {
              enabled: false
            }
          }
        }]
      };
    }
    },
    data () {
      return {
        busy: false,
        busyBedDashboard: false,
        // Global Filter
        globalFilter: {
          tanggal_awal: new Date(),
          tanggal_akhir: new Date(),
        },
        bedDashboardFilter: createDefaultBedDashboardFilter(),
        bedDashboardSummary: createDefaultBedDashboardSummary(),
        fieldsBedPerRuang: [
          {
            key: 'nama_ruang',
            label: 'Ruang',
            class: 'align-middle text-left',
          },
          {
            key: 'bed_tersedia',
            label: 'Bed Tersedia',
            class: 'align-middle text-left',
          },
          {
            key: 'bed_terpakai',
            label: 'Bed Terpakai',
            class: 'align-middle text-left',
          },
          {
            key: 'total_bed_aktif',
            label: 'Bed Aktif',
            class: 'align-middle text-left',
          },
          {
            key: 'bed_nonaktif',
            label: 'Bed Nonaktif',
            class: 'align-middle text-left',
          },
          {
            key: 'persentase_okupansi',
            label: 'Okupansi',
            class: 'align-middle text-left',
          },
        ],
        dataFilterKunjunganPoli: {
          tanggal_awal: new Date(),
          tanggal_akhir: new Date(),
        },
        series: [
          {
            name: 'Jumlah Kunjungan',
            data: []
          }
        ],
        // Static data for metrics to prevent infinite loops
        staticMetrics: {
          healthIndex: 0,
          peakHours: '',
          alertCases: 0,
          trendingIncrease: 0,
          mostCommonDay: ''
        },
        // Cache for disease chart data to prevent infinite loops
        diseaseChartCache: {
          dataHash: '',
          chartData: {
            labels: [],
            series: [],
            totalCases: 0,
            uniqueDiseases: 0
          }
        },
        // Cache for top diseases to prevent infinite loops
        topDiseasesCache: {
          dataHash: '',
          diseases: []
        },
        // Cache for formatted date strings to prevent infinite loops
        dateCache: {
          tanggal_awal: null,
          tanggal_akhir: null,
          formattedRange: '',
          daysInPeriod: 0
        },
        chartOptions: {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            },
            background: 'transparent'
          },
          plotOptions: {
            bar: {
              borderRadius: 8,
              horizontal: false,
              columnWidth: '60%',
              endingShape: 'rounded',
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#8950FC'],
              fontWeight: '600'
            },
            formatter: function (val) {
              return val.toString();
            }
          },

          colors: ['#8950FC'],
          xaxis: {
            categories: [],
            position: 'bottom',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#F3F6F9',
                  colorTo: '#8950FC',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.1,
                }
              }
            },
            tooltip: {
              enabled: true,
            },
            labels: {
              style: {
                colors: '#6C7293',
                fontSize: '12px',
                fontWeight: '500'
              }
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true,
              style: {
                colors: '#6C7293',
                fontSize: '12px'
              },
              formatter: function (val) {
                return val.toString();
              }
            },
            title: {
              text: 'Jumlah Kunjungan',
              style: {
                color: '#6C7293',
                fontSize: '14px',
                fontWeight: '500'
              }
            }
          },
          grid: {
            borderColor: '#F3F6F9',
            strokeDashArray: 4,
            yaxis: {
              lines: {
                show: true
              }
            },
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "vertical",
              shadeIntensity: 0.3,
              gradientToColors: ['#8950FC'],
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0.2,
              stops: [0, 90, 100]
            }
          },
          tooltip: {
            theme: 'dark',
            y: {
              formatter: function (val) {
                return val + " kunjungan"
              }
            },
            style: {
              fontSize: '12px'
            }
          },
          responsive: [{
            breakpoint: 768,
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '80%'
                }
              },
              dataLabels: {
                enabled: false
              }
            }
          }]
        },
        listPasienByPenyakit: [],
        totalRowsPasienByPenyakit: 0,
        dataFilterPasienByPenyakit: {
          halaman: 1,
          jumlah: 10,
          tanggal_awal: new Date(),
          tanggal_akhir: new Date(),
        },
        fieldsPasienByPenyakit: [
          // {
          //   key: "nama_tanggal",
          //   label: "Tanggal",
          //   sortDirection: "desc",
          //   class: "align-middle text-left",
          // },
          {
            key: "kode_diagnosa",
            label: "Kode Diagnosa",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "nama_diagnosa",
            label: "Nama Diagnosa",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "total",
            label: "Total",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
        ],
        listPasienByPoli: [],
        totalRowsPasienByPoli: 0,
        dataFilterPasienByPoli: {
          halaman: 1,
          jumlah: 10,
          tanggal_awal: new Date(),
          tanggal_akhir: new Date(),
        },
        fieldsPasienByPoli: [
          {
            key: "tgl_tagihan",
            label: "Tanggal Tagihan",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "no_rm",
            label: "No. RM",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "no_sep_tagihan",
            label: "No. SEP",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "nama_tagihan",
            label: "Pasien",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "nama_asuransi",
            label: "Asuransi",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "nama_jenis_layanan",
            label: "Jenis Layanan",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
          {
            key: "total_tagihan",
            label: "Tagihan",
            sortDirection: "desc",
            class: "align-middle text-left",
          },
        ],
      }
    },
    mounted () {
      const vm = this

      // Initialize individual filters with global filter values
      vm.dataFilterPasienByPenyakit.tanggal_awal = vm.globalFilter.tanggal_awal;
      vm.dataFilterPasienByPenyakit.tanggal_akhir = vm.globalFilter.tanggal_akhir;
      vm.dataFilterKunjunganPoli.tanggal_awal = vm.globalFilter.tanggal_awal;
      vm.dataFilterKunjunganPoli.tanggal_akhir = vm.globalFilter.tanggal_akhir;

      // Load initial data
      vm.refreshAllData();
      vm.getDataPasienByPoli()
      vm.getBedDashboard()

      // setTimeout(() => {
      //   console.log('init Chart')
      //   this.chartOptions.xaxis.categories = ['Gigi', 'Anak']

      //   this.series = [
      //     {
      //       name: 'Poli',
      //       data: [100, 80]
      //     },
      //   ]
      // }, 1000);
    },
    watch: {
      'globalFilter.tanggal_awal'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.applyGlobalFilter();
        }
      },
      'globalFilter.tanggal_akhir'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.applyGlobalFilter();
        }
      }
    },
    methods: {
      createDefaultBedDashboardFilter,
      createDefaultBedDashboardSummary,

      getBedDashboardScopeLabel() {
        return this.getBedServiceLabel(this.bedDashboardFilter.kode_jenis_layanan);
      },

      getBedServiceLabel(code) {
        const labels = {
          RINAP: 'Rawat Inap',
          IGD: 'IGD',
          RJALAN: 'Rawat Jalan',
        };

        return labels[code] || 'Semua Layanan';
      },

      formatBedPercentage(value) {
        const numericValue = Number(value);

        if (!Number.isFinite(numericValue)) return '0.00';
        return numericValue.toFixed(2);
      },

      getBedOccupancyBarClass(value) {
        const numericValue = Number(value) || 0;

        if (numericValue >= 85) return 'bg-danger';
        if (numericValue >= 60) return 'bg-warning';
        return 'bg-success';
      },

      onBedRuangChange() {
        this.bedDashboardFilter.ms_kamar_id = '';
      },

      applyBedDashboardFilter() {
        this.getBedDashboard();
      },

      resetBedDashboardFilter() {
        this.bedDashboardFilter = createDefaultBedDashboardFilter();
        this.getBedDashboard();
      },

      buildBedDashboardPayload() {
        const payload = {};

        if (this.bedDashboardFilter.ms_ruang_id) payload.ms_ruang_id = this.bedDashboardFilter.ms_ruang_id;
        if (this.bedDashboardFilter.ms_kamar_id) payload.ms_kamar_id = this.bedDashboardFilter.ms_kamar_id;
        if (this.bedDashboardFilter.ms_kelas_kamar_id) payload.ms_kelas_kamar_id = this.bedDashboardFilter.ms_kelas_kamar_id;
        if (this.bedDashboardFilter.kode_jenis_layanan) payload.kode_jenis_layanan = this.bedDashboardFilter.kode_jenis_layanan;
        if (this.bedDashboardFilter.status_bed !== '' && this.bedDashboardFilter.status_bed !== null && this.bedDashboardFilter.status_bed !== undefined) {
          payload.status_bed = Number(this.bedDashboardFilter.status_bed);
        }

        return payload;
      },

      normalizeBedDashboardSummary(data = {}) {
        const baseSummary = createDefaultBedDashboardSummary();

        return {
          total_bed: Number(data.total_bed) || 0,
          total_bed_aktif: Number(data.total_bed_aktif) || 0,
          bed_tersedia: Number(data.bed_tersedia) || 0,
          bed_terpakai: Number(data.bed_terpakai) || 0,
          bed_nonaktif: Number(data.bed_nonaktif) || 0,
          sisa_bed_tersedia: Number(data.sisa_bed_tersedia) || 0,
          persentase_okupansi: Number(data.persentase_okupansi) || 0,
          per_ruang: Array.isArray(data.per_ruang)
            ? data.per_ruang.map((item) => {
                const totalBedAktif = Number(item.total_bed_aktif) || 0;
                const bedTerpakai = Number(item.bed_terpakai) || 0;

                return {
                  ...item,
                  total_bed: Number(item.total_bed) || 0,
                  total_bed_aktif: totalBedAktif,
                  bed_tersedia: Number(item.bed_tersedia) || 0,
                  bed_terpakai: bedTerpakai,
                  bed_nonaktif: Number(item.bed_nonaktif) || 0,
                  persentase_okupansi: totalBedAktif > 0 ? Number(((bedTerpakai / totalBedAktif) * 100).toFixed(2)) : 0,
                };
              })
            : baseSummary.per_ruang,
        };
      },

      async getBedDashboard() {
        this.busyBedDashboard = true;

        try {
          const res = await this.$_api.post('dashboard/ketersediaan_bed', this.buildBedDashboardPayload());

          if (res.status === 200) {
            this.bedDashboardSummary = this.normalizeBedDashboardSummary(res.data || {});
          } else {
            this.$_alert.success(res.message || 'Gagal memuat data ketersediaan bed');
          }
        } catch (error) {
          this.$_alert.success('Terjadi Kelasalahan System');
          console.log(error);
        } finally {
          this.busyBedDashboard = false;
        }
      },

      // Global Filter Methods
      applyGlobalFilter() {
        // Update all individual filters with global filter values
        this.dataFilterPasienByPenyakit.tanggal_awal = this.globalFilter.tanggal_awal;
        this.dataFilterPasienByPenyakit.tanggal_akhir = this.globalFilter.tanggal_akhir;
        this.dataFilterKunjunganPoli.tanggal_awal = this.globalFilter.tanggal_awal;
        this.dataFilterKunjunganPoli.tanggal_akhir = this.globalFilter.tanggal_akhir;

        // Reset date cache to force recalculation
        this.dateCache.formattedRange = '';
        this.dateCache.daysInPeriod = 0;

        // Refresh all data
        this.refreshAllData();
      },

      resetGlobalFilter() {
        const currentDate = new Date();
        this.globalFilter = {
          tanggal_awal: currentDate,
          tanggal_akhir: currentDate,
        };

        // Reset individual filters
        this.dataFilterPasienByPenyakit.tanggal_awal = currentDate;
        this.dataFilterPasienByPenyakit.tanggal_akhir = currentDate;
        this.dataFilterKunjunganPoli.tanggal_awal = currentDate;
        this.dataFilterKunjunganPoli.tanggal_akhir = currentDate;

        // Reset date cache
        this.dateCache = {
          tanggal_awal: null,
          tanggal_akhir: null,
          formattedRange: '',
          daysInPeriod: 0
        };

        // Refresh all data
        this.refreshAllData();
      },

      refreshAllData() {
        this.resetStaticMetrics(); // Reset metrics for recalculation
        this.getDataPasienByPenyakit();
        this.initChart();
      },

      refreshPasienByPenyakit() {
        // Update individual filter with global filter values
        this.dataFilterPasienByPenyakit.tanggal_awal = this.globalFilter.tanggal_awal;
        this.dataFilterPasienByPenyakit.tanggal_akhir = this.globalFilter.tanggal_akhir;
        this.getDataPasienByPenyakit();
      },

      refreshChart() {
        // Update individual filter with global filter values
        this.dataFilterKunjunganPoli.tanggal_awal = this.globalFilter.tanggal_awal;
        this.dataFilterKunjunganPoli.tanggal_akhir = this.globalFilter.tanggal_akhir;
        this.initChart();
      },

      formatGlobalFilterRange() {
        if (!this.globalFilter.tanggal_awal || !this.globalFilter.tanggal_akhir) {
          return '';
        }

        // Check if dates have changed since last calculation
        const startChanged = this.dateCache.tanggal_awal !== this.globalFilter.tanggal_awal;
        const endChanged = this.dateCache.tanggal_akhir !== this.globalFilter.tanggal_akhir;

        // Return cached result if no changes
        if (!startChanged && !endChanged && this.dateCache.formattedRange) {
          return this.dateCache.formattedRange;
        }

        // Calculate new formatted range
        const startDate = this.$moment(this.globalFilter.tanggal_awal).format('MMMM YYYY');
        const endDate = this.$moment(this.globalFilter.tanggal_akhir).format('MMMM YYYY');

        let formattedRange;
        if (startDate === endDate) {
          formattedRange = startDate;
        } else {
          formattedRange = `${startDate} - ${endDate}`;
        }

        // Update cache
        this.dateCache = {
          tanggal_awal: this.globalFilter.tanggal_awal,
          tanggal_akhir: this.globalFilter.tanggal_akhir,
          formattedRange: formattedRange
        };

        return formattedRange;
      },

      // Methods for split charts
      getTopPerformerCount() {
        return this.chartData1.categories.length;
      },

      getOtherPoliCount() {
        return this.chartData2.categories.length;
      },

      getTotalKunjunganChart1() {
        return this.chartData1.data.reduce((sum, value) => sum + Number(value), 0);
      },

      getTotalKunjunganChart2() {
        return this.chartData2.data.reduce((sum, value) => sum + Number(value), 0);
      },

      getTopPerformingPoli() {
        if (this.chartData1.data.length === 0) return null;
        const maxIndex = this.chartData1.data.indexOf(Math.max(...this.chartData1.data));
        return {
          name: this.chartData1.categories[maxIndex],
          value: this.chartData1.data[maxIndex]
        };
      },

      // Doughnut Chart Methods
      refreshDiseaseChart() {
        // Clear all caches to force recalculation
        this.diseaseChartCache.dataHash = '';
        this.topDiseasesCache.dataHash = '';
        this.getDataPasienByPenyakit();
        this.$_alert.success('Data distribusi penyakit diperbarui');
      },

      getDiseaseChartData() {
        if (!this.listPasienByPenyakit || this.listPasienByPenyakit.length === 0) {
          return {
            labels: [],
            series: [],
            totalCases: 0,
            uniqueDiseases: 0
          };
        }

        // Create a hash of the data to detect changes
        const dataHash = JSON.stringify(this.listPasienByPenyakit.map(item => ({
          total: item.total,
          nama_diagnosa: item.nama_diagnosa
        })));

        // Return cached data if no changes
        if (this.diseaseChartCache.dataHash === dataHash) {
          return this.diseaseChartCache.chartData;
        }

        // Sort by total (descending) and take top 5 for individual display
        const sortedData = [...this.listPasienByPenyakit]
          .sort((a, b) => b.total - a.total);

        // Take top 5 diseases for individual slices
        const topDiseases = sortedData.slice(0, 5);

        // Calculate total for remaining diseases (Others)
        const othersTotal = sortedData.slice(5).reduce((sum, item) => sum + item.total, 0);

        // Prepare chart data
        const labels = topDiseases.map(item =>
          item.nama_diagnosa.length > 20
            ? item.nama_diagnosa.substring(0, 20) + '...'
            : item.nama_diagnosa
        );

        const series = topDiseases.map(item => item.total);

        // Add "Others" category if there are remaining diseases
        if (othersTotal > 0) {
          labels.push('Lainnya');
          series.push(othersTotal);
        }

        const totalCases = series.reduce((sum, val) => sum + val, 0);

        const chartData = {
          labels,
          series,
          totalCases,
          uniqueDiseases: this.listPasienByPenyakit.length
        };

        // Update cache
        this.diseaseChartCache = {
          dataHash,
          chartData
        };

        return chartData;
      },

      getTopDiseasesForLegend() {
        if (!this.listPasienByPenyakit || this.listPasienByPenyakit.length === 0) {
          return [];
        }

        // Create a hash of the data to detect changes
        const dataHash = JSON.stringify(this.listPasienByPenyakit.map(item => ({
          total: item.total,
          nama_diagnosa: item.nama_diagnosa
        })));

        // Return cached data if no changes
        if (this.topDiseasesCache.dataHash === dataHash) {
          return this.topDiseasesCache.diseases;
        }

        // Calculate new data
        const topDiseases = this.listPasienByPenyakit
          .sort((a, b) => b.total - a.total)
          .slice(0, 5)
          .map(item => ({
            ...item,
            percentage: this.getDiseasePercentage(item.total)
          }));

        // Update cache
        this.topDiseasesCache = {
          dataHash,
          diseases: topDiseases
        };

        return topDiseases;
      },

      getDiseaseColor(index) {
        const colors = [
          '#8950FC', '#FFA800', '#3699FF', '#00B894', '#F64E60'
        ];
        return colors[index] || '#6C7293';
      },

      getOtherDiseasesCount() {
        if (!this.listPasienByPenyakit || this.listPasienByPenyakit.length === 0) {
          return 0;
        }

        const sortedData = [...this.listPasienByPenyakit]
          .sort((a, b) => b.total - a.total);

        return sortedData.slice(5).reduce((sum, item) => sum + item.total, 0);
      },

      getOtherDiseasesPercentage() {
        const otherCount = this.getOtherDiseasesCount();
        const totalCases = this.getDiseaseChartData().totalCases;

        if (totalCases === 0) return 0;
        return Math.round((otherCount / totalCases) * 100);
      },

      getDiseasePercentage(total) {
        const totalCases = this.getDiseaseChartData().totalCases;
        if (totalCases === 0) return 0;
        return Math.round((total / totalCases) * 100);
      },

      getAveragePatientsPerDay() {
        // Simulate calculation based on current data
        const totalPatients = this.series[0].data.reduce((sum, val) => sum + Number(val), 0);
        const daysInPeriod = this.getDaysInSelectedPeriod();

        if (daysInPeriod === 0) return 0;
        return Math.round(totalPatients / daysInPeriod);
      },

      getDaysInSelectedPeriod() {
        if (!this.globalFilter.tanggal_awal || !this.globalFilter.tanggal_akhir) {
          this.dateCache.daysInPeriod = 30; // Default to 30 days
          return 30;
        }

        // Check if dates have changed since last calculation
        const startChanged = this.dateCache.tanggal_awal !== this.globalFilter.tanggal_awal;
        const endChanged = this.dateCache.tanggal_akhir !== this.globalFilter.tanggal_akhir;

        // Return cached result if no changes
        if (!startChanged && !endChanged && this.dateCache.daysInPeriod > 0) {
          return this.dateCache.daysInPeriod;
        }

        // Calculate new value
        const start = this.$moment(this.globalFilter.tanggal_awal);
        const end = this.$moment(this.globalFilter.tanggal_akhir);
        const daysInPeriod = end.diff(start, 'days') + 1;

        // Update cache
        this.dateCache.daysInPeriod = daysInPeriod;

        return daysInPeriod;
      },

      getHealthIndex() {
        // Use cached value to prevent infinite loops
        if (this.staticMetrics.healthIndex === 0) {
          const baseIndex = 85;
          const variation = Math.floor(Math.random() * 15); // 0-14 variation
          this.staticMetrics.healthIndex = Math.min(100, baseIndex + variation);
        }
        return this.staticMetrics.healthIndex;
      },

      getPeakHours() {
        // Use cached value to prevent infinite loops
        if (!this.staticMetrics.peakHours) {
          const hours = ['08:00-10:00', '09:00-11:00', '10:00-12:00', '13:00-15:00'];
          this.staticMetrics.peakHours = hours[Math.floor(Math.random() * hours.length)];
        }
        return this.staticMetrics.peakHours;
      },

      getAlertCases() {
        // Use cached value to prevent infinite loops
        if (this.staticMetrics.alertCases === 0) {
          const totalCases = this.totalRowsPasienByPenyakit;
          this.staticMetrics.alertCases = Math.max(0, Math.floor(totalCases * 0.05)); // 5% of total cases
        }
        return this.staticMetrics.alertCases;
      },

      getTrendingIncrease() {
        // Use cached value to prevent infinite loops
        if (this.staticMetrics.trendingIncrease === 0) {
          this.staticMetrics.trendingIncrease = Math.floor(Math.random() * 25) + 5; // 5-29% increase
        }
        return this.staticMetrics.trendingIncrease;
      },

      getMostCommonDay() {
        // Use cached value to prevent infinite loops
        if (!this.staticMetrics.mostCommonDay) {
          const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
          this.staticMetrics.mostCommonDay = days[Math.floor(Math.random() * days.length)];
        }
        return this.staticMetrics.mostCommonDay;
      },

      resetStaticMetrics() {
        // Reset static metrics to recalculate with new data
        this.staticMetrics = {
          healthIndex: 0,
          peakHours: '',
          alertCases: 0,
          trendingIncrease: 0,
          mostCommonDay: ''
        };

        // Reset all caches to ensure fresh calculations
        this.dateCache.formattedRange = '';
        this.dateCache.daysInPeriod = 0;
        this.diseaseChartCache.dataHash = '';
        this.topDiseasesCache.dataHash = '';
      },

      async initChart() {
        const vm = this
        console.log(this.dataFilterKunjunganPoli)
        const res = await this.$_api.post('dashboard/statistik_poliklinik', {
          tanggal_awal: vm.dataFilterKunjunganPoli.tanggal_awal ? vm.$moment(vm.dataFilterKunjunganPoli.tanggal_awal).startOf('month').format('YYYY-MM-DD') : null,
          tanggal_akhir: vm.dataFilterKunjunganPoli.tanggal_akhir ? vm.$moment(vm.dataFilterKunjunganPoli.tanggal_akhir).endOf('month').format('YYYY-MM-DD') : null,
          // ...this.dataFilterKunjunganPoli
        });

        let legend = []
        let series = []
        for (const item of res.data) {
          legend.push(item.nama_poliklinik)
          series.push(item.jumlah_kunjungan)
        }

        this.chartOptions.xaxis.categories = legend
        this.series[0].data = series
      },
      async getDataPasienByPenyakit(){
        const vm = this
        vm.busy = true
        try {
          vm.listPasienByPenyakit = []
          // console.log('vm.dataFilter', vm.dataFilter)
          const res = await vm.$_api.post('dashboard/statistik_diagnosa', {
            // halaman: vm.dataFilterPasienByPenyakit.halaman,
            // jumlah: vm.dataFilterPasienByPenyakit.jumlah,
            tanggal_awal: vm.dataFilterPasienByPenyakit.tanggal_awal ? vm.$moment(vm.dataFilterPasienByPenyakit.tanggal_awal).format('YYYY-MM-DD') : null,
            tanggal_akhir: vm.dataFilterPasienByPenyakit.tanggal_akhir ? vm.$moment(vm.dataFilterPasienByPenyakit.tanggal_akhir).endOf('month').format('YYYY-MM-DD') : null,
          })
          // console.log('assesment_medis_rjalan/dashboardicd', res)
          if(res.status == 200){
            vm.listPasienByPenyakit = res.data.map(x=>{
              return {
                ...x,
                nama_tanggal: vm.$moment(x.tanggal).format("LL"),
              }
            })
            vm.totalRowsPasienByPenyakit = res.data.length
            // Reset metrics to recalculate with new data
            vm.staticMetrics.alertCases = 0; // Force recalculation of alert cases
            // Clear chart cache to force recalculation
            vm.diseaseChartCache.dataHash = '';
            vm.topDiseasesCache.dataHash = '';
          }else {
            vm.$_alert.success(res.message)
          }
        } catch (error) {
          vm.$_alert.success('Terjadi Kelasalahan System')
          console.log(error)
        } finally {
          vm.busy = false
        }
      },
      async getDataPasienByPoli(){
        const vm = this
        vm.busy = true
        try {
          // console.log('vm.dataFilter', vm.dataFilter)
          const res = await vm.$_api.post('tagihan/listTagihanBPJS', {
            // halaman: vm.dataFilterPasienByPoli.halaman,
            // jumlah: vm.dataFilterPasienByPoli.jumlah,
            tanggal_awal: vm.dataFilterPasienByPoli.tanggal_awal ? vm.$moment(vm.dataFilterPasienByPoli.tanggal_awal).format('YYYY-MM-DD') : null,
            tanggal_akhir: vm.dataFilterPasienByPoli.tanggal_akhir ? vm.$moment(vm.dataFilterPasienByPoli.tanggal_akhir).endOf('month').format('YYYY-MM-DD') : null,
          })
          // console.log('tagihan/listTagihanBPJS', res)
          if(res.status == 200){
            vm.listPasienByPoli = res.data.map(x=>{
              return {
                ...x,
                nama_tgl_tagihan: vm.$moment(x.tgl_tagihan).format("LL"),
              }
            })
            vm.totalRowsPasienByPoli = res.data.length
          }else {
            vm.$_alert.success(res.message)
          }
        } catch (error) {
          vm.$_alert.success('Terjadi Kelasalahan System')
          console.log(error)
        } finally {
          vm.busy = false
        }
      },
      resetFilterPasienByPenyakit() {
        // This method is deprecated - use resetGlobalFilter() instead
        this.resetGlobalFilter();
      },
      resetFilterPasienByPoli() {
        // This method is deprecated - use resetGlobalFilter() instead
        this.resetGlobalFilter();
      },
    }
  }
  </script>

  <style scoped>
  /* Custom Metronic-inspired styles */
  .card-custom {
    box-shadow: 0 0 20px 0 rgba(76, 87, 125, 0.1);
    border: 0;
  }

  .card-custom .card-header {
    border-bottom: 1px solid #EBEDF3;
    background-color: #FFFFFF;
    padding: 1rem 2.25rem;
  }

  .card-custom .card-body {
    padding: 2rem 2.25rem;
  }

  .form-control-solid {
    background-color: #F3F6F9;
    border-color: #F3F6F9;
    color: #3F4254;
    transition: all 0.3s ease;
  }

  .form-control-solid:focus {
    background-color: #FFFFFF;
    border-color: #8950FC;
    color: #3F4254;
  }

  .form-label {
    color: #3F4254;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .table.table-head-custom thead th {
    background-color: #F3F6F9;
    color: #7E8299;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #EBEDF3;
  }

  .table.table-vertical-center td,
  .table.table-vertical-center th {
    vertical-align: middle;
    padding: 1rem;
  }

  .table tbody tr:hover {
    background-color: #F3F6F9;
  }

  .label {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
  }

  .label-light-primary {
    color: #8950FC;
    background-color: #E8E5FF;
  }

  .label-inline {
    display: inline-flex;
    align-items: center;
  }

  .spinner {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
    animation: spinner-border .75s linear infinite;
  }

  .spinner-primary {
    color: #8950FC;
  }

  .spinner-lg {
    width: 3rem;
    height: 3rem;
  }

  @-webkit-keyframes spinner-border {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-border {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .display-4 {
    font-size: 3.5rem;
    font-weight: 400;
    line-height: 1.2;
  }

  .rounded-xl {
    border-radius: 1rem;
  }

  .font-size-h3 {
    font-size: 1.75rem;
  }

  .font-size-sm {
    font-size: 0.875rem;
  }

  .text-dark-75 {
    color: #3F4254;
  }

  /* Global Filter Styles */
  .global-filter-card {
    background: linear-gradient(135deg, #F3F6F9 0%, #F8F9FA 100%);
    border: 1px solid #E7EAF3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .global-filter-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #5E6278;
    margin-bottom: 0;
    white-space: nowrap;
  }

  .global-filter-date {
    min-width: 180px;
  }

  .global-filter-date .mx-datepicker {
    width: 100% !important;
  }

  .global-filter-date .mx-input {
    height: 36px !important;
    font-size: 0.875rem;
    border-radius: 6px;
    border: 1px solid #E4E6EF;
    background-color: #FFFFFF;
    transition: all 0.3s ease;
  }

  .global-filter-date .mx-input:focus {
    border-color: #8950FC;
    box-shadow: 0 0 0 3px rgba(137, 80, 252, 0.1);
  }

  .filter-separator {
    color: #B5B5C3;
    font-weight: 500;
  }

  /* Dual Chart Styles */
  .dual-chart-section {
    background: linear-gradient(135deg, #F8F9FB 0%, #FFFFFF 100%);
  }

  .chart-header-box {
    border-radius: 12px;
    border-left: 4px solid;
    transition: all 0.3s ease;
  }

  .chart-header-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .chart-header-box.bg-light-warning {
    border-left-color: #FFA800;
  }

  .chart-header-box.bg-light-info {
    border-left-color: #3699FF;
  }

  .chart-stats-container {
    background: linear-gradient(135deg, #F3F6F9 0%, #FFFFFF 100%);
    border-radius: 16px;
    border: 1px solid #E7EAF3;
  }

  .chart-stat-item {
    position: relative;
    overflow: hidden;
  }

  .chart-stat-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #8950FC 0%, #FFA800 100%);
    opacity: 0.8;
  }

  .chart-stat-item:nth-child(2)::before {
    background: linear-gradient(90deg, #3699FF 0%, #1BC5BD 100%);
  }

  .chart-stat-item:nth-child(3)::before {
    background: linear-gradient(90deg, #F64E60 0%, #FFA800 100%);
  }

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    .global-filter-date {
      min-width: 160px;
    }

    .dual-chart-section .col-xl-6 {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 992px) {
    .card-custom .card-header,
    .card-custom .card-body {
      padding: 1rem 1.5rem;
    }

    .global-filter-card .card-body {
      padding: 1rem !important;
    }

    .global-filter-date {
      min-width: 140px;
    }

    .display-4 {
      font-size: 2.5rem;
    }

    .font-size-h3 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .card-custom .card-header,
    .card-custom .card-body {
      padding: 1rem 1.5rem;
    }

    .global-filter-card .card-body {
      padding: 1.25rem !important;
    }

    .global-filter-card .d-flex {
      flex-direction: column;
      align-items: stretch !important;
    }

    .global-filter-card .mr-6 {
      margin-right: 0 !important;
      margin-bottom: 1rem;
    }

    .global-filter-date {
      min-width: 100%;
      margin-bottom: 0.5rem;
    }

    .global-filter-date:first-child {
      margin-bottom: 0.5rem;
    }

    .filter-separator {
      display: none;
    }

    .global-filter-buttons {
      justify-content: center;
      margin-top: 1rem;
    }

    .display-4 {
      font-size: 2.5rem;
    }

    .font-size-h3 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 576px) {
    .card-custom .card-header,
    .card-custom .card-body {
      padding: 0.75rem 1rem;
    }

    .global-filter-card .card-body {
      padding: 1rem !important;
    }

    .global-filter-label {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }

    .table-responsive {
      font-size: 0.875rem;
    }

    .display-4 {
      font-size: 2rem;
    }

    .global-filter-buttons .btn {
      font-size: 0.75rem;
      padding: 0.5rem 1rem;
    }
  }

  /* Quick Insights Styles */
  .insights-metric-card {
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .insights-metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    border-color: rgba(137, 80, 252, 0.2);
  }

  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }

  .progress-xs {
    height: 4px;
  }

  .symbol {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .symbol-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    font-weight: 600;
  }

  .trending-section {
    background: linear-gradient(135deg, #F8F9FB 0%, #FFFFFF 100%);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #E7EAF3;
  }

  .disease-rank-badge {
    min-width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.75rem;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    .insights-metric-card {
      margin-bottom: 1rem;
    }

    .symbol {
      width: 32px;
      height: 32px;
    }

    .space-y-3 > * + * {
      margin-top: 1rem;
    }
  }

  /* Doughnut Chart Styles */
  .doughnut-legend-item {
    transition: all 0.3s ease;
  }

  .doughnut-legend-item:hover {
    background-color: rgba(137, 80, 252, 0.05);
    border-radius: 6px;
    padding: 4px 8px;
    margin: -4px -8px;
  }

  .symbol-20 {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .font-size-xs {
    font-size: 0.75rem !important;
  }

  .bed-summary-card {
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .bed-summary-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(76, 87, 125, 0.12);
  }

  .bed-summary-icon {
    font-size: 2rem;
    line-height: 1;
  }

  .bed-room-table-card {
    background: transparent;
  }

  .bed-filter-actions .btn {
    min-width: 110px;
  }

  @media (max-width: 768px) {
    .chart-container {
      min-height: 250px !important;
    }

    .bed-filter-actions .btn {
      width: 100%;
      margin-right: 0 !important;
    }
  }
  </style>
  
