<template>
  <div class="card card-custom">
    <!-- page: {{ page }}
    totalPage: {{ totalPage }} -->
    <div class="card-header p-4">
      <div class="card-toolbar my-0 justify-content-between align-items-center w-100">
        <div class="input-icon" style="width: 80%;">
          <input v-model.lazy.trim="paramAPI.nama" autocomplete="off" name="nama" type="text"
            class="form-control seach-form" :placeholder="$t('global.search') + ' pasien'">
          <span>
            <i class="ri-search-line text-primary"></i>
          </span>
        </div>
        <a class="btn btn-light-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.filter')" @click="$bvModal.show('filter-modal')">
          <i class="ri-filter-2-line p-0"></i>
        </a>
      </div>
      
    </div>
    <div class="card-body p-3">
      <div class="d-flex justify-content-center mt-3"  v-if="loading">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>
      <template v-if="mymoduleList.length === 0 && this.page === 1">
        <p class="text-danger">Tidak ada kunjungan dari {{ paramAPI.tanggal_awal | parse('date') }} s/d {{ paramAPI.tanggal_akhir | parse('date') }}</p>
      </template>
      <div class="offcanvas-content pr-5 mr-n5 ps infinite flex-fill" :class="{ 'mt-6': loading }" v-infinite-scroll="getMyAction" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="navi navi-icon-circle">
          <sequential-entrance fromBottom delay="80">
            <div v-for="(m, i) in mymoduleList" :key="i + '-my-action'" @click="selectData(m)" class="card p-3 pointer mb-3" :class="{ 'bg-light-warning': activeData  && activeData.registrasi_id !== m.registrasi_id, 'bg-light-success': activeData  && activeData.registrasi_id === m.registrasi_id }">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ m.nama_lengkap || '-' }}</h5>
                  <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ m.no_rm || '-' }} / {{ m.tgl_registrasi | parse('date') }}</p>
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ m.jenis_kelamin | parse('kelamin') }} / {{ m.tgl_lahir | parse('old') }}th</p>
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ m.nama_dokter || '-' }}</p>
                </div>
                <div class="text-center">
                  <h6 class="font-weight-bolder text-dark">KNJ</h6>
                  <h5 class="font-weight-bolder text-dark">{{ m.no_kunjungan }}</h5>
                </div>
              </div>
            </div>
          </sequential-entrance>
        </div>
      </div>
    </div>

    <b-modal ref="filter-modal" id="filter-modal" :centered="true" :hide-footer="true" :hide-header="true" :size="'xl'">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Filter Kunjungan Rawat Inap</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$bvModal.hide('filter-modal')">
          <i aria-hidden="true" class="ki ki-close"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          
          <div class="col-6">
            <s-input v-model="paramAPI.tanggal_awal" :item="{
              label: 'Tanggal Awal',
              id: 'tanggal_awal',
              data: 'tanggal_awal',
              value: paramAPI.tanggal_awal,
              type: 'date',
              class: '',
              validation: [],
            }" :valuee="paramAPI.tanggal_awal" />
          </div>
          <div class="col-6">
            <s-input v-model="paramAPI.tanggal_akhir" :item="{
              label: 'Tanggal Akhir',
              id: 'tanggal_akhir',
              data: 'tanggal_akhir',
              value: paramAPI.tanggal_akhir,
              type: 'date',
              class: '',
              validation: [],
            }" :valuee="paramAPI.tanggal_akhir" />
          </div>
          <div class="col-12">
            <s-input v-model="paramAPI.nama" :item="{
              label: 'Nama Lengkap',
              id: 'nama',
              data: 'nama',
              value: paramAPI.nama,
              type: 'text',
              class: '',
              validation: [],
            }" :valuee="paramAPI.nama" />
          </div>
          <div class="col-12">
            <s-input v-model="paramAPI.no_rm" :item="{
              label: 'No. RM',
              id: 'no_rm',
              data: 'no_rm',
              value: paramAPI.no_rm,
              type: 'text',
              class: '',
              validation: [],
            }" :valuee="paramAPI.no_rm" />
          </div>
          <div class="col-12">
            <s-input v-model="paramAPI.no_kunjungan" :item="{
              label: 'No. Kunjungan',
              id: 'no_kunjungan',
              data: 'no_kunjungan',
              value: paramAPI.no_kunjungan,
              type: 'text',
              class: '',
              validation: [],
            }" :valuee="paramAPI.no_kunjungan" />
          </div>
          <div class="col-12">
            <s-input v-model="paramAPI.no_asuransi" :item="{
              label: 'No. Asuransi',
              id: 'no_asuransi',
              data: 'no_asuransi',
              value: paramAPI.no_asuransi,
              type: 'text',
              class: '',
              validation: [],
            }" :valuee="paramAPI.no_asuransi" />
          </div>
          <div class="col-12">
            <s-input v-model="paramAPI.dokter_id" :item="{
              label: 'Dokter',
              id: 'dokter_id',
              data: 'dokter_id',
              type: 'lookup-radio',
              validation: ['required'],
              value: paramAPI.dokter_id,
              api: 'msDokter',
              pointer: {
                label: 'nama_dokter',
                code: 'dokter_id',
                display: ['nama_dokter']
              },
              param: {},
            }" :valuee="paramAPI.dokter_id" />
          </div>

          <div class="col-12">
            <button class="btn btn-light-primary" @click="$bvModal.hide('filter-modal')">Terapkan Filter</button>
            <button class="btn btn-light-danger" @click="reset()">Reset</button>
          </div>
        </div>
      </div>
    </b-modal>

  </div>
</template>
  
<script>
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'card_registrasi_ranap',
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
        paramAPI: {
          status: 'Belum Pulang',
          // tgl_registrasi: moment().format('yyyy-MM-DD'),
          tanggal_awal: moment().format('yyyy-MM-DD'),
          tanggal_akhir: moment().format('yyyy-MM-DD'),
          nama: '',
          status_registrasi: '1,2,9',
        },

        mymoduleList: [],
        loading: false,
        page: 0,
        totalPage: 1,
        activeData: {},
        filter: {
          project_id: null,
          periode_date: null,
          modul_name: null
        },
      }
    },
    watch: {
      paramAPI: {
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

      if (this.$route && this.$route.query && this.$route.query.registrasi_id) {
        this.$_api.single('registrasi', {}, this.$route.query.registrasi_id).then((res) => {
          if (res.data.length) this.selectData(res.data[0])
        })
      }
    },
    methods: {
      reset () {
        this.paramAPI = {}
        this.$bvModal.hide('filter-modal')
      },
      getMyAction (reset = false) {
        if (this.page < this.totalPage || reset) {
          this.page++
          let filter = {
            page: this.page,
            limit: 10,
            nama: '',
            no_rm: ''
          }
          this.loading = true
          this.$_api
            .list('/registrasi/listKunjunganInapPerHalamanBypassUri', { ...filter, ...this.paramAPI })
            .then((res) => {
              this.loading = false
              if (!reset) this.mymoduleList = [...this.mymoduleList, ...res.data]
              else this.mymoduleList = res.data
              this.totalPage = Math.ceil(parseInt(res.count) / filter.limit)
              this.$store.commit('set', ['my-action-count', res.totalMyActions, true])
            })
            .catch((err) => {
              this.loading = false
              this.$_alert.error(err)
            })
        }
      },
      selectData (data) {
        this.activeData = data
        this.emitEvent('selected', data)
      },
      emitEvent (e, data = null) {
        // const value = data || true
        this.$emit(e, data)
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
  .pointer {
    cursor: pointer;
  }
  .infinite {
    height: 85vh;
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