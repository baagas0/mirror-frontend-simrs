<template>
  <div class="container-fluid">
    <div class="card card-custom mb-3">
      <div class="card-body">
        <main-filter @change="cleansingFilter($event)" :project="true" :department="true" singlePeriode :allDepartemen="true" :allProject="true" />
      </div>
    </div>
    <div class="card card-custom mb-3">
      <div v-if="globalFilter" class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-primary">Projects Monitoring Submission</span>
          <span class="text-muted mt-3 font-weight-bold font-size-sm">
            <span v-if="globalFilter.territory_id.code">Division {{ globalFilter.territory_id.label }},</span>
            <span v-if="globalFilter.is_jo.code">Type {{ globalFilter.is_jo.label }},</span>
            <span v-if="globalFilter.project_id.code">Project {{ globalFilter.project_id.label }},</span>
            <span v-if="globalFilter.periode_month">{{ globalFilter.periode_month }}</span>
          </span>
        </h3>
      </div>
      <div class="card-body">
        <b-overlay :show="isLoading" no-wrap></b-overlay>
        <table class="table">
          <tr>
            <td class="nowrap-table border-0 py-1 bg-muted"><i class="ri-checkbox-blank-circle-fill text-dark"></i></td>
            <td class="nowrap-table border-0 py-1 pr-8 font-weight-bolder v-center font-size-lg">Belum Melakukan Pengisian</td>
            <td class="nowrap-table border-0 py-1 bg-light-info"><i class="ri-checkbox-blank-circle-fill text-info"></i></td>
            <td class="nowrap-table border-0 py-1 pr-8 font-weight-bolder v-center font-size-lg">Status Draft</td>
            <td class="nowrap-table border-0 py-1 bg-light-primary"><i class="ri-checkbox-blank-circle-fill text-primary"></i></td>
            <td class="nowrap-table border-0 py-1 pr-8 font-weight-bolder v-center font-size-lg">Status Permintaan Penilaian</td>
            <td class="nowrap-table border-0 py-1 bg-light-danger"><i class="ri-checkbox-blank-circle-fill text-danger"></i></td>
            <td class="nowrap-table border-0 py-1 pr-8 font-weight-bolder v-center font-size-lg">Status Ditolak</td>
            <td class="nowrap-table border-0 py-1 bg-light-warning"><i class="ri-checkbox-blank-circle-fill text-warning"></i></td>
            <td class="nowrap-table border-0 py-1 pr-8 font-weight-bolder v-center font-size-lg">Status Diterima dengan Catatan</td>
            <td class="nowrap-table border-0 py-1 bg-light-success"><i class="ri-checkbox-blank-circle-fill text-success"></i></td>
            <td class="nowrap-table border-0 py-1 pr-8 font-weight-bolder v-center font-size-lg">Status Diterima</td>
            <td class="border-0 py-1"></td>
          </tr>
        </table>
        <div v-if="monitoring.length" class="table-responsive">
          <table class="table table-custom table-bordered table-header-bg v-center">
            <thead class="">
                <tr>
                    <td class="v-center">No</td>
                    <td class="v-center">Nama Proyek</td>
                    <td v-for="(a, i) in monitoring[0].series" :key="i+'header-monitoring'" class="v-center nowrap-table text-center">{{ a.periode_month | parse('shortperiod') }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(b, i) in monitoring" :key="i+'body-monitoring'">
                    <td class="nowrap-table v-center">{{ i+1 }}</td>
                    <td class="v-center">{{ b.project_name }}</td>
                    <td v-for="(c, i) in b.series" :key="i+'sub-body-monitoring'"
                    :class="{
                        'bg-muted': c.status_code === 'pending',
                        'bg-light-info': c.status_code === 'draft',
                        'bg-light-primary': c.status_code === 'appraisal_request',
                        'bg-light-danger': c.status_code === 'rejected',
                        'bg-light-warning': c.status_code === 'approved_with_note',
                        'bg-light-success': c.status_code === 'approved',
                        }"
                    class="v-center nowrap-table text-center">
                        <i v-if="c.status_code === 'pending'" class="ri-checkbox-blank-circle-fill text-dark"></i>
                        <i v-else-if="c.status_code === 'draft'" class="ri-checkbox-blank-circle-fill text-info"></i>
                        <i v-else-if="c.status_code === 'appraisal_request'" class="ri-checkbox-blank-circle-fill text-primary"></i>
                        <i v-else-if="c.status_code === 'rejected'" class="ri-checkbox-blank-circle-fill text-danger"></i>
                        <i v-else-if="c.status_code === 'approved_with_note'" class="ri-checkbox-blank-circle-fill text-warning"></i>
                        <i v-else class="ri-checkbox-blank-circle-fill text-success"></i>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'monitoring-submission',
  components: {
    mainFilter: () => import('./main-filter.vue')
  },
  data () {
    return {
      isLoading: true,
      globalFilter: null,
      cleanFilter: null,
      config: {
        permission: {
          create: 'create-monitoring-submission',
          read: 'view-monitoring-submission',
          update: 'update-monitoring-submission',
          delete: 'delete-monitoring-submission'
        }
      },
      monitoring: []
    }
  },
  methods: {
    cleansingFilter (e) {
      const filter = JSON.parse(JSON.stringify(e))
      this.globalFilter = filter
      this.cleanFilter = {
        territory_id: filter.territory_id.code,
        is_jo: filter.is_jo.code,
        project_id: filter.project_id.code,
        start_periode: filter.start_periode_parsed,
        end_periode: filter.periode_month_parsed
      }
      this.getAllData(this.cleanFilter)
    },
    getAPI (method, api, param, obj = null) {
      return this.$_api[method](api, param)
        .then((res) => {
          return obj ? res.data[obj] || res.data : res.data
        })
        .catch((err) => {
          this.$_alert.error(err)
        })
    },
    async getAllData (filter) {
      this.isLoading = true
      let mainData = await this.getAPI('get', 'custom/monitoring/submission', filter)
      this.monitoring = mainData
      this.isLoading = false
    }
  }
}
</script>
<style></style>
