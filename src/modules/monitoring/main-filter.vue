<template>
  <div class="form-group row mb-0">
    <div v-if="department" class="col-auto min-w-400px">
      <div class="form-group d-flex align-items-center mb-0">
        <span class="font-weight-bolder font-size-lg pr-3" for="">Division</span>
        <div class="flex-fill">
          <v-select @input="reloadProject(mainFilter.territory_id.code, mainFilter.is_jo.code)" :clearable="false" v-model="mainFilter.territory_id" :appendToBody="true" class="vs-style custom" :options="dataset.territorys.data" :placeholder="'Choose Division'">
            <slot name="no-options">{{ $t('error.no_data') }}</slot>
          </v-select>
        </div>
      </div>
    </div>
    <div v-if="department" class="col-auto min-w-200px">
      <div class="form-group d-flex align-items-center mb-0">
        <span class="font-weight-bolder font-size-lg pr-3" for="">Project Type</span>
        <div class="flex-fill">
          <v-select @change="reloadProject(mainFilter.territory_id.code, mainFilter.is_jo.code)" :clearable="false" v-model="mainFilter.is_jo" :appendToBody="true" class="vs-style custom" :options="[ { label: 'All', code: null }, { label: 'JO', code: true }, { label: 'NJO', code: false }, ]" :placeholder="'Choose Type'">
            <slot name="no-options">{{ $t('error.no_data') }}</slot>
          </v-select>
        </div>
      </div>
    </div>
    <div v-if="project" class="col">
      <div class="form-group d-flex align-items-center mb-0">
        <span class="font-weight-bolder font-size-lg pr-3" for="">Project</span>
        <div class="flex-fill">
          <v-select :clearable="false" v-model="mainFilter.project_id" :appendToBody="true" class="vs-style custom" :options="dataset.projects.data" :placeholder="'Choose Project'">
            <slot name="no-options">{{ $t('error.no_data') }}</slot>
          </v-select>
        </div>
      </div>
    </div>
    <template v-if="!hidePeriode">
      <template v-if="rangePeriode">
        <div class="col-auto">
          <div class="form-group d-flex align-items-center mb-0">
            <span class="font-weight-bolder font-size-lg pr-3" for="">Mulai Periode</span>
            <div class="flex-fill">
              <date-picker :disabled-date="disablePeriodAfter" :clearable="false" :input-attr="{ autocomplete: 'off' }" v-model="mainFilter.start_periode" type="month" :input-class="'form-control custom'" class="w-100" :value-type="formatDate('month')" :formatter="periodFormat" />
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-group d-flex align-items-center mb-0">
            <span class="font-weight-bolder font-size-lg pr-3" for="">Sampai Periode</span>
            <div class="flex-fill">
              <date-picker :disabled-date="disablePeriodBefore" :clearable="false" :input-attr="{ autocomplete: 'off' }" v-model="mainFilter.end_periode" type="month" :input-class="'form-control custom'" class="w-100" :value-type="formatDate('month')" :formatter="periodFormat" />
            </div>
          </div>
        </div>
      </template>
      <template v-if="singlePeriode">
        <div class="col-auto">
          <div class="form-group d-flex align-items-center mb-0">
            <span class="font-weight-bolder font-size-lg pr-3" for="">Period</span>
            <div class="flex-fill">
              <date-picker :clearable="false" :input-attr="{ autocomplete: 'off' }" v-model="mainFilter.periode_month" type="month" :input-class="'form-control custom'" class="w-100" :value-type="formatDate('month')" :formatter="periodFormat" />
            </div>
          </div>
        </div>
      </template>
    </template>
    <slot name="filter-action"></slot>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')
export default {
  name: 'global-filter',
  props: {
    department: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    project: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    allDepartemen: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    allProject: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    singlePeriode: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    rangePeriode: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    yearPeriode: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    datePeriode: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    hidePeriode: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      mainFilter: {
        territory_id: { label: 'All Divisions', code: null },
        is_jo: { label: 'All', code: null },
        project_id: { label: 'All Projects', code: null },
        start_periode: moment()
          .set('date', 1)
          .set('month', 0)
          .format('MMMM YYYY'),
        end_periode: moment()
          .set('date', 1)
          .format('MMMM YYYY'),
        periode_month: moment()
          .set('date', 1)
          .format('MMMM YYYY'),
        periode_date: moment()
          .set('date', 1)
          .format('MMMM YYYY'),
        periode_year: moment()
          .set('date', 1)
          .set('month', 0)
          .format('MMMM YYYY')
      },
      dataset: {
        territorys: { keyProps: 'allDepartemen', name: 'Division', label: 'territory_name', code: 'id', data: [] },
        projects: { keyProps: 'allProject', name: 'Project', label: 'project_name', code: 'id', data: [] }
      },
      periodFormat: {
        stringify: (date) => {
          return date ? moment(date).format('MMMM YYYY') : ''
        },
        parse: (value) => {
          return value ? moment(value, 'MMMM YYYY').toDate() : null
        }
      }
    }
  },
  watch: {
    mainFilter: {
      deep: true,
      immediate: false,
      handler (e) {
        const filter = JSON.parse(JSON.stringify(e))
        filter.start_periode_parsed = moment(filter.start_periode, 'MMMM YYYY').format('YYYY-MM-DD')
        filter.end_periode_parsed = moment(filter.end_periode, 'MMMM YYYY').format('YYYY-MM-DD')
        filter.periode_month_parsed = moment(filter.periode_month, 'MMMM YYYY').format('YYYY-MM-DD')
        filter.periode_date_parsed = moment(filter.periode_date, 'MMMM YYYY').format('YYYY-MM-DD')
        filter.periode_year_parsed = moment(filter.periode_year, 'MMMM YYYY').format('YYYY-MM-DD')
        this.$emit('change', filter)
        this.$store.commit('set', ['globalFilter', filter, true])
      }
    }
  },
  mounted () {
    this.getDataset()
  },
  methods: {
    disablePeriodBefore (date) {
      let start = moment(moment(this.mainFilter.start_periode, 'MMMM YYYY').toDate())
      return date < start
    },
    disablePeriodAfter (date) {
      let end = moment(moment(this.mainFilter.end_periode, 'MMMM YYYY').toDate())
      return date > end
    },
    formatDate (type) {
      let _format
      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'YYYY-MM-DD'
          break
        case 'datetime':
        case 'datetime-range':
          _format = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY'
          break
        case 'month':
        case 'month-range':
          _format = 'YYYY-MM-DD'
          break
        case 'time':
        case 'time-range':
          _format = 'HH:mm:ss'
          break
        case 'week':
        case 'week-range':
          _format = 'DD'
          break
      }
      return _format
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
    async getDataset () {
      let divData = await this.getAPI('dataset', 'territorys')
      if (this.allDepartemen) {
        divData.unshift({ [this.dataset.territorys.label]: 'All Divisions', [this.dataset.territorys.code]: null })
      }
      const finalDept = divData.map((x) => {
        return { label: x[this.dataset.territorys.label], code: x[this.dataset.territorys.code] }
      })
      this.$set(this.dataset['territorys'], 'data', finalDept)
      // this.reloadProject(finalDept[0].code, finalDept[0])
      let replaceFilter = {}
      if (this.$route.query.replace) {
        replaceFilter = Object.assign({}, JSON.parse(this.$route.query.replace))
      } else {
        if (this.$store.state.globalFilter) {
          replaceFilter = this.$store.state.globalFilter
          if (!replaceFilter.territory_id.code && !this.allDepartemen) replaceFilter.territory_id = finalDept[0]
          if (!replaceFilter.project_id.code && !this.allProject) replaceFilter.project_id = { label: 'All Projects', code: null }
          if (replaceFilter.territory_id.code || replaceFilter.is_jo.code) {
            this.reloadProject(replaceFilter.territory_id.code, replaceFilter.is_jo.code)
          }
        } else {
          replaceFilter = Object.assign({}, {
            territory_id: this.dataset.territorys.length ? this.dataset.territorys.data[0] : { label: 'All Divisions', code: null },
            project_id: this.allProject ? { label: 'All Projects', code: null } : this.dataset.projects.length ? this.dataset.projects.data[0] : { label: 'All Projects', code: null }
          })
        }
      }
      this.mainFilter = Object.assign(this.mainFilter, replaceFilter)
    },
    async reloadProject (e, f) {
      // if (!e) return
      let filter = {
        territory_id: e,
        is_jo: f,
        sorting_fields: [
          { field: 'id', sort: 'ASC' },
          { field: 'project_name', sort: 'ASC' }
        ]
      }
      let projData = await this.getAPI('dataset', 'projects', filter)
      this.$emit('project', projData)
      const finalProj = JSON.parse(JSON.stringify(projData)).map((x) => {
        return { label: x[this.dataset.projects.label] + ' | No. ' + x.project_number, code: x[this.dataset.projects.code] }
      })
      if (this.allProject) {
        finalProj.unshift({ label: 'All Projects', code: null })
      }
      this.$set(this.dataset['projects'], 'data', finalProj)
      if (!projData.map(x => x.id).includes(this.mainFilter.project_id.code) && this.mainFilter.project_id.code) {
        this.$set(this.mainFilter, 'project_id', { label: 'All Projects', code: null })
      }
    }
  }
}
</script>

<style></style>
