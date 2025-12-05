<template>
  <div class="container-fluid">
    <div class="card card-custom mb-3">
      <div class="card-body">
        <!-- <main-filter @change="cleansingFilter($event)" :project="true" :department="true" singlePeriode :allDepartemen="false" :allProject="false" /> -->
        <main-filter @change="cleansingFilter($event)" :project="true" :department="true" singlePeriode :allDepartemen="true" :allProject="true" />
      </div>
    </div>
    <div v-if="!unselectedProject" class="card card-custom mb-3">
      <div v-if="globalFilter" class="card-header border-0 py-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label font-weight-bolder text-primary">Leaderboard</span>
          <span class="text-muted mt-3 font-weight-bold font-size-sm">
            <span v-if="globalFilter.territory_id.code">Division {{ globalFilter.territory_id.label }},</span>
            <span v-if="globalFilter.is_jo.code">Type {{ globalFilter.is_jo.label }},</span>
            <span v-if="globalFilter.project_id.code">Project {{ globalFilter.project_id.label }},</span>
            <span v-if="globalFilter.periode_month">{{ globalFilter.periode_month }}</span>
          </span>
        </h3>
        <div class="card-toolbar">
          <ul class="nav nav-pills nav-pills-sm nav-dark-75">
            <li v-for="(t, i) in Object.keys(tabs)" :key="i+'-tabs'" class="nav-item">
              <a @click="activeTabs = t;keys++" class="nav-link py-2 px-4 pointer font-weight-bold" :class="{'active': activeTabs === t }">{{ tabs[t] }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-custom alert-light-info fade show mb-5" role="alert">
      <div class="alert-icon"><i class="flaticon-clock-2"></i></div>
      <div class="alert-text">
        <span class="font-weight-bold font-size-lg">Proyek belum dipilih</span>
        <p class="mb-0">
          Silahkan pilih salah satu proyek untuk menampilkan data
          <b>Leaderboard</b>
        </p>
      </div>
    </div>
    <component v-if="cleanFilter" :key="keys" :cleanFilter="cleanFilter" :is="componentLoader"></component>
  </div>
</template>
<script>
export default {
  name: 'dashboard-monitoring',
  components: {
    mainFilter: () => import('./main-filter.vue')
  },
  data () {
    return {
      isLoading: true,
      globalFilter: null,
      cleanFilter: {},
      config: {
        permission: {
          create: 'create-dashboard-monitoring',
          read: 'view-dashboard-monitoring',
          update: 'update-dashboard-monitoring',
          delete: 'delete-dashboard-monitoring'
        }
      },
      tabs: {
        cr_value: 'Critical Ratio (CR)',
        cpi_value: 'Cost Performance Index (CPI)',
        spi_value: 'Schedule Performance Index (SPI)'
      },
      activeTabs: 'cr_value',
      unselectedProject: false,
      keys: 0
    }
  },
  computed: {
    componentLoader () {
      let loader = this.activeTabs
      return () => import(`./leaderboard/${loader}.vue`)
    }
  },
  methods: {
    cleansingFilter (e) {
      const filter = JSON.parse(JSON.stringify(e))
      this.globalFilter = filter
      this.cleanFilter = Object.assign({}, {
        territory_id: filter.territory_id.code,
        is_jo: filter.is_jo.code,
        project_id: filter.project_id.code,
        periode_month: filter.periode_month_parsed
      })
      this.keys++
      // this.getAllData(this.cleanFilter)
      // if (filter.project_id.code) {
      //   this.unselectedProject = false
      //   this.getAllData(this.cleanFilter)
      // } else this.unselectedProject = true
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

      this.isLoading = false
    }
  }
}
</script>
<style></style>
