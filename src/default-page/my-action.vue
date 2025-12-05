<template>
  <div class="d-flex flex-fill flex-column">
    <div class="my-action-filter position-relative">
      <b-overlay :show="loading" rounded="sm" no-wrap />
      <s-input v-model="filter.project_id" :item="{ classLabel: 'col pl-0', rowclass: 'mx-0', label: '', prefix: 'Proyek', type: 'lookup-radio', validation: [], placeholder: '', api: 'projects', pointer: { label: 'project_name', code: 'id', display: ['rel_department_id', 'project_name'] }, nm: true }" />
      <s-input class="mt-3" v-model="filter.modul_name" :item="{ notAppendToBody: true, type: 'select', validation: [], placeholder: 'Action', optionList: moduleList, formatter: momentFormat, nm: true }" />
      <s-input v-model="filter.periode_date" :item="{ type: 'month', validation: [], placeholder: 'Periode', api: '', formatter: momentFormat, ic: 'w-100 mt-3' }" />
      <hr />
    </div>
    <div class="offcanvas-content pr-5 mr-n5 ps infinite flex-fill" v-infinite-scroll="getMyAction" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="navi navi-icon-circle">
        <sequential-entrance fromBottom delay="100">
          <div v-for="(m, i) in mymoduleList" @click="goto(m)" :key="i + '-my-action'" class="mb-4 pointer">
            <!--begin::Section-->
            <div class="d-flex align-items-center">
              <!--begin::Symbol-->
              <div class="symbol symbol-45 symbol-light mr-5">
                <span class="symbol-label">
                  <span class="svg-icon svg-icon-primary svg-icon-2x">
                    <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo3/dist/../src/media/svg/icons/Code/Info-circle.svg-->
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10" />
                        <rect fill="#000000" x="11" y="10" width="2" height="7" rx="1" />
                        <rect fill="#000000" x="11" y="7" width="2" height="2" rx="1" />
                      </g>
                    </svg>
                    <!--end::Svg Icon-->
                  </span>
                </span>
              </div>
              <!--end::Symbol-->

              <!--begin::Text-->
              <div class="d-flex flex-column flex-grow-1">
                <a href="#" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">{{ m.description }}</a>
                <span class="text-muted font-weight-bold">{{ m.periode_month | parse('period') }}</span>
              </div>
              <!--end::Text-->
            </div>
            <!--end::Section-->

            <!--begin::Desc-->
            <p class="text-dark-50 m-0 pt-3 font-weight-normal">
              {{ m.project_name }}
            </p>
            <!--end::Desc-->
          </div>
        </sequential-entrance>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'my-action',
  props: {
    refreshKey: {
      type: Number,
      required: false,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      mymoduleList: [],
      loading: false,
      page: 0,
      totalPage: 1,
      activeData: null,
      filter: {
        project_id: null,
        periode_date: null,
        modul_name: null
      },
      actionList: [
        { label: 'Mengunci Template Kualitatif', code: 'do-lock-qualitatif-template', level: 0 },
        { label: 'Lengkapi dan Ajukan Verifikasi', code: 'do-verification-request', level: 3 },
        { label: 'Permintaan Revisi', code: 'do-revision-request', level: 0 },
        { label: 'Permintaan Verifikasi', code: 'do-verify', level: 1 }
      ],
      moduleList: [
        { title: 'Semua Action', label: 'Semua Action', code: null, route: null, view: null },
        { title: 'Data Transaksi', label: 'Data Transaksi', code: 'project_forms', route: 'data-input', view: null }
      ],
      momentFormat: {
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
    filter: {
      deep: true,
      immediate: false,
      handler (to) {
        this.page = 0
        this.totalPage = 1
        this.getMyAction(true)
      }
    },
    refreshKey: {
      deep: false,
      immediate: false,
      handler () {
        this.page = 0
        this.totalPage = 1
        this.getMyAction(true)
      }
    }
  },
  mounted () {
    this.getMyAction()
  },
  methods: {
    getMyAction (reset = false) {
      if (this.page < this.totalPage) {
        let date = this.filter.periode_date
        if (date) date = moment(moment(date, 'MMMM YYYY').toDate()).format('YYYY-MM-DD')
        else date = null
        this.page++
        let filter = {
          page: this.page,
          modul_name: this.filter.modul_name,
          project_id: this.filter.project_id,
          periode_date: date,
          limit: 15
        }
        this.loading = true
        this.$_api
          .list('/custom/my_actions', filter)
          .then((res) => {
            this.loading = false
            if (!reset) this.mymoduleList = [...this.mymoduleList, ...res.data]
            else this.mymoduleList = res.data
            this.totalPage = res.totalPage
            this.$store.commit('set', ['my-action-count', res.totalMyActions, true])
          })
          .catch((err) => {
            this.loading = false
            this.$_alert.error(err)
          })
      }
    },
    goto (data) {
      if (this.activeData !== data) {
        this.activeData = JSON.parse(JSON.stringify(data))
        const selectedModule = this.moduleList.filter((x) => x.code === data.modul_name)[0]
        let param = null
        if (data.project_form_id) {
          param = {
            rtn: new Date().getTime(),
            id: data.project_form_id,
            view: 'detail'
          }
        } else {
          param = {
            rtn: new Date().getTime(),
            act: 'create-new',
            view: 'list',
            forms: {
              project_id: data.project_id,
              periode_month: data.periode_month
            }
          }
        }
        this.$router.push({
          name: selectedModule.route,
          query: { ...{ dts: new Date().getTime() }, ...param }
        })
      }
    }
  }
}
</script>

<style scoped>
  .infinite {
    height: 76vh;
    position: relative;
    overflow: auto;
  }
  .mx-datepicker {
    width: 100%;
  }
  .card-activity {
    display: block;
    border: 1px;
    border-top: 6px;
    border-radius: 8px;
    border-style: solid;
    margin-bottom: 1.25rem;
    padding: 0 1em !important;
  }
  /* =================================== */
  .card-activity.level-0 {
    border-color: #faedec;
  }
  .card-activity.level-0 .symbol .symbol-label {
    background-color: #faedec;
  }
  .card-activity.level-0 .symbol .symbol-label i {
    color: var(--danger-theme);
  }
  .card-activity.level-0 .status-text {
    color: var(--danger-theme);
  }
  .card-activity:hover.level-0 {
    background-color: #faedec;
  }
  .card-activity:hover.level-0 .symbol .symbol-label {
    background-color: var(--danger-theme);
  }
  .card-activity:hover.level-0 .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.level-1 {
    border-color: #faf6ec;
  }
  .card-activity.level-1 .symbol .symbol-label {
    background-color: #faf6ec;
  }
  .card-activity.level-1 .symbol .symbol-label i {
    color: var(--warning-theme);
  }
  .card-activity.level-1 .status-text {
    color: var(--warning-theme);
  }
  .card-activity:hover.level-1 {
    background-color: #faf6ec;
  }
  .card-activity:hover.level-1 .symbol .symbol-label {
    background-color: var(--warning-theme);
  }
  .card-activity:hover.level-1 .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.level-2 {
    border-color: #ddf1f6;
  }
  .card-activity.level-2 .symbol .symbol-label {
    background-color: #ddf1f6;
  }
  .card-activity.level-2 .symbol .symbol-label i {
    color: var(--info-theme);
  }
  .card-activity.level-2 .status-text {
    color: var(--info-theme);
  }
  .card-activity:hover.level-2 {
    background-color: #ddf1f6;
  }
  .card-activity:hover.level-2 .symbol .symbol-label {
    background-color: var(--info-theme);
  }
  .card-activity:hover.level-2 .symbol .symbol-label i {
    color: #fff;
  }
  /* =================================== */
  .card-activity.level-3 {
    border-color: #e1f8e9;
  }
  .card-activity.level-3 .symbol .symbol-label {
    background-color: #e1f8e9;
  }
  .card-activity.level-3 .symbol .symbol-label i {
    color: var(--success-theme);
  }
  .card-activity.level-3 .status-text {
    color: var(--success-theme);
  }
  .card-activity:hover.level-3 {
    background-color: #e1f8e9;
  }
  .card-activity:hover.level-3 .symbol .symbol-label {
    background-color: var(--success-theme);
  }
  .card-activity:hover.level-3 .symbol .symbol-label i {
    color: #fff;
  }
</style>
