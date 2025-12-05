<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <label for="" class="font-weight-boldest">{{ tableLabel }}</label>
    </div>

    <div class="table-responsive">
      <table class="table table-custom table-bordered table-header-bg table-input v-center">
        <thead class="bg-light-primary">
          <th class="nowrap-table">
            <span class=" font-weight-bolder">No.</span>
          </th>
          <template v-for="(h,i) in label">
            <th :class="[i===0? 'sticky-left': '']" :key="i+'-header-table'" class="">
              <span :class=" h.type === 'label'? '': ''" class=" font-weight-bolder">{{ h.label }}</span>
            </th>
          </template>
          <th class="nowrap-table" v-if="!disableDelete">
            <span class=" font-weight-bolder">Aksi</span>
          </th>
        </thead>
        <template v-if="mainData.length">
          <tbody>
            <template v-for="(v,i) in mainData">
              <tr :key="i+'-tr-table'">
                <td class="nowrap-table" :key="i+'-numbering-table'">
                  <span class="">{{ i+1 }}.</span>
                </td>
                <template v-for="(h,j) in label">
                  <td :class="j===0? 'sticky-left': ''" :key="j+'-td-table'">
                    <template v-if="h.type === 'label'">
                      <span @click="setFullWidth(h.id)" class="" style="line-height: 1.6;">
                        <div :class="fullwidthColumns.includes(h.id) ? 'nowrap-table': 'text-line-1'">{{ v[h.id] ? v[h.id] : "-" }} </div>
                      </span>
                    </template>
                    <template v-else-if="h.type === 'text'">
                      <div class="form-group mb-0">
                        <input v-model.lazy="v[h.id]" @change="changedValue(v)" type="text" class="form-control form-control-sm">
                      </div>
                    </template>
                    <template v-else>
                      <vue-numeric v-model.lazy="v[h.id]" @change="changedValue(v)" separator="." :empty-value="0" :currency="h.type==='money'? 'Rp.': null" :precision="h.precision ? h.precision : 0" class="form-control form-control-sm" />
                    </template>
                  </td>
                </template>
                <td class="nowrap-table" :key="i+'-action-table'" v-if="!disableDelete">
                  <button class="btn btn-icon btn-light-danger btn-sm" @click="mainData.splice(i, 1)"><i class="ri-delete-bin-2-line"></i></button>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>

    <div class="d-flex justify-content-between"  v-if="!disableAdd">
      <button class="btn btn-sm btn-primary" @click="addRow()">
        <i class="ri-menu-add-line"></i>
        Tambah Baris Baru
      </button>
    </div>
  </div>
</template>
<style>
  .sticky-left {
    background-color: transparent !important;;
  }
  .no-border {
    border: 0 !important;
  }
</style>
<script>
export default {
  name: 'table-input',
  props: {
    tableLabel: { type: String, required: false, default () { return 'Daftar' } },
    label: { type: Array, required: true },
    list: { type: Array, required: false },
    getter: { type: String, required: true },
    disableDelete: { type: Boolean, required: false, default () { return false } },
    disableAdd: { type: Boolean, required: false, default () { return false } }
  },
  data () {
    return {
      isLoading: false,
      inputSearch: null,
      mainData: [],
      fullwidthColumns: []
    }
  },
  computed: {
  },
  mounted () {
    this.getListData()
  },
  watch: {
    list: {
      deep: false,
      immediate: false,
      handler (to) {
        this.getListData()
      }
    },
    inputSearch: {
      deep: false,
      immediate: false,
      handler (to) {
        let param = Object.assign({}, this.paramAPI)
        param.page = 1
        param.search = to
        this.paramAPI = Object.assign({}, param)
      }
    },
    mainData: {
      deep: false,
      immediate: false,
      handler (to) {
        this.$emit('input', this.mainData)
      }
    }
  },
  methods: {
    // STARTTT CUSTOMMMMMMMMM
    addRow () {
      let obj = {}

      for (const item of this.label) {
        obj[item.id] = ''
      }

      this.mainData.push(obj)
    },
    // ENDDDDD CUSTOMMMMMMMMM
    setFullWidth (field) {
      if (this.fullwidthColumns.includes(field)) {
        this.fullwidthColumns = this.fullwidthColumns.filter(x => x !== field)
      } else this.fullwidthColumns.push(field)
    },
    async changedValue (val) {
      this.isLoading = true
      this.$emit('input', this.mainData)
      await console.log(val)
      this.isLoading = false
    },
    async getListData (filter) {
      this.isLoading = true
      const data = await this.sendAPI('list', this.getter, filter)
      if (data.data.length) {
        this.total = data.total
        this.mainData = data.data
      } else this.$emit('empty-list', true)
      this.isLoading = false
    },
    sendAPI (method, api, param) {
      return {
        data: this.list ? this.list : [],
        total: 2
      }
      return this.$_api[method](api, param).then(res => {
        return res
      }).catch((err) => {
        this.$_alert.error(err)
      })
    }
  }
}
</script>

<style>
  .w-fit-content {
    width: 100%;
  }
  .table.input-table th,
  .table.input-table td {
    width: 170px;
    min-width: 170px;
    border: 0 !important;
    padding: 0;
  }
  .table.input-table td {
    padding: 0;
  }
  .table.input-table th .form-control,
  .table.input-table td .form-control{
    border-color: #E4E6EF
  }
  .table.input-table th .form-control:focus,
  .table.input-table td .form-control:focus{
    background-color: #F4F1FE;
  }
  .table.input-table th .form-control {
    border-width: 1px;
    border-top-width: 2px;
  }
  .table.input-table th:first-child .form-control,
  .table.input-table td:first-child .form-control{
    border-left-width: 2px;
  }
  .table.input-table th:last-child .form-control,
  .table.input-table td:last-child .form-control{
    border-right-width: 2px;
  }
  .table.input-table tr:last-of-type td .form-control{
    border-bottom-width: 2px;
  }
  .table.input-table .form-control {
    border-radius: 0;
    height: auto;
  }
  /* .table.input-table td .form-control:focus {
    border: 1px solid var(--primary-color);
  } */
  .sticky-left {
    position: sticky !important;
    left: -1px !important;
    background-color: #ffffff;
    z-index: 2;
    max-width: 250px;
    min-width: 170px;
  }
  .scrolling-table {
    display: block;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .scrolling-table thead th {
    position: sticky !important;
    top: 0;
    background-color: #ffffff;
    z-index: 3;
  }
  .scrolling-table tfoot th {
    position: sticky !important;
    bottom: 0;
    background-color: #ffffff;
    z-index: 3;
  }
  .scrolling-table tfoot th.sticky-left,
  .scrolling-table thead th.sticky-left {
    z-index: 4;
  }
  .limit-table .vs__dropdown-toggle {
    border: 1px solid #e4e6ef;
  }
  .limit-table .vs__open-indicator {
    fill: #d3d6e2;
  }
  .v-separator {
    border-right: 2px solid #e4e6ef;
    height: 100%;
  }
  .pagination-text {
    width: 80px;
    text-align: center;
  }
</style>
