<template>
  <div class="lookup-wrapper">
    <template v-if="type === 'lookup-modal'">
      <button type="button" @click="openModal()" class="btn btn-block text-truncate"
        :class="classes[1] || ' btn-light-info'" :disabled="disabled">
        <i v-if="disabled" class="ri-forbid-2-line"></i>
        <span v-if="(!disabled && (selectedLabel || !selectedLabel))
          || (disabled && selectedLabel)
          ">{{ caption | parse(pipeLabel) }}</span>
      </button>
      <template v-if="multiple">
        <div v-if="selectedLabel.length === 0 && errors.length" class="invalid-feedback">{{ errors[0] }}</div>
      </template>
      <template v-else>
        <div v-if="!selectedLabel && errors.length" class="invalid-feedback">{{ errors[0] }}</div>
      </template>
      <b-modal ref="lookup-modal" id="lookup-modal" :centered="true" :hide-footer="true" :hide-header="true" :size="'xl'"
        @hide="$emit('input', revertValue(modelData))">
        <!-- <h3 class="mb-3">{{ placeholder || multiple? $t('global.select_multiple') : $t('global.select_single') }} {{ title }}</h3> -->
        <h3 class="mb-3">{{ title }}</h3>
        <div class="row">
          <div :class="multiple ? 'col-lg-8' : 'col-lg-12'" class="mb-lg-0 mb-md-3">
            <small class="text-danger">* Tekan enter untuk mencari</small>
            <div class="input-icon w-100 mb-3">
              <input v-model.lazy.trim="inputSearch" autocomplete="off" name="search" type="text"
                class="form-control seach-form"
                :placeholder="placeholder ? placeholder + ', tekan enter' : $t('global.search') + ' ' + title + ', tekan enter'">
              <span>
                <i class="ri-search-line text-primary"></i>
              </span>
            </div>

            <!-- FILTER -->
            <div class="row" v-if="filter.length">
              <div class="col-xl-3 col-md-4 col-sm-12" v-for="(item, i) in filter" :key="i+'filterrr-field'">
                <s-input groupClass="mb-0" v-model="filterValue[item.key]" :item="{
                  label: item.label || '',
                  id: item.key,
                  data: item.key,
                  type: item.type,
                  validation: [],
                }" :disabled="false" />
              </div>

              <div class="col-12 mb-7">
                <button class="btn btn-primary" type="button" @click="applyFilter()"><i class="ri-save-line"></i> Terapkan Filter</button>
              </div>
            </div>

            <div class="table-responsive mb-2">
              <table class="table table-hover table-lookup">
                <thead v-if="multiple && tableHeader">
                  <tr @click="selectAll()" class="pointer">
                    <th>
                      <label class="checkbox">
                        <input type="checkbox" :checked="hasCheckedAll" name="select-all" ref="select-all" />
                        <span></span>&nbsp;</label>
                    </th>
                    <th :colspan="tableHeader.length"> {{ $t('global.select_all') }} </th>
                  </tr>
                </thead>
                <thead v-if="pointer.display && pointer.headerDisplay">
                  <tr class="pointer">
                    <th></th>
                    <th v-for="(h, i) in tableHeaderDisplay" :key="i">
                      <span> {{ h }} </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(d, j) in dataList" :key="j" @click="addValue(d)" class="pointer bg-transparent">
                    <td style="width:1%">
                      <label :class="multiple ? 'checkbox' : 'radio'">
                        <input :disabled="!multiple" :type="multiple ? 'checkbox' : 'radio'" :name="'lookup-item-' + j"
                          :value="multiple ? d : { [pointer.label]: d[pointer.label], [pointer.code]: d[pointer.code] }"
                          v-model="modelData" @click="addValue(d)" />
                        <span></span>&nbsp;</label>
                    </td>
                    <td v-for="(h, i) in tableHeader" :key="i"
                      :class="(i === 0 && tableHeader.length > 1) ? 'nowrap-table' : ''">
                      <span v-if="h.search('|') != -1"> {{ d[h.split('|')[0]] | parse(h.split('|')[1]) }} </span>
                      <span v-else> {{ d[h] }} </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table class="w-100" v-if="!isLoading && dataList.length === 0 && no_data_message">
                <tr class="text-center w-100">
                  <td>{{ no_data_message }}</td>
                </tr>
              </table>
            </div>
            <div class="d-flex justify-content-between">
              <div class="d-flex mt-5 mb-1">
                <button v-if="!multiple" @click="$bvModal.hide('lookup-modal')"
                  class="btn btn-sm btn-primary">{{ $t('global.select_save') }}</button>
              </div>
  
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center py-3 mt-5">
                  <div v-if="isLoading" class="d-flex align-items-center">
                    <div class="mr-2 text-muted">{{ $t('global.loading') }} ...</div>
                    <div class="spinner spinner-primary mr-10"></div>
                  </div>
                </div>
                <div class="pagination d-flex flex-wrap justify-content-end align-content-end mt-5">
                  <button @click="goPage('first')" :disabled="paramAPI.page === 1"
                    class="btn btn-icon btn-sm btn-outline-primary mr-1 my-1">
                    <i class="ri-skip-back-mini-line"></i>
                  </button>
                  <button @click="goPage('prev')" :disabled="paramAPI.page === 1"
                    class="btn btn-sm btn-outline-primary mr-1 my-1"> {{ $t('global.prev') }} </button>
                  <input @change="goPage('input')" v-model.lazy="temp_page" type="text" name="pagination" autocomplete="off"
                    class="form-control form-control-sm pagination-text mr-1 my-1" :placeholder="$t('global.goto')">
                  <button @click="goPage('next')" :disabled="paramAPI.page === maxPage"
                    class="btn btn-sm btn-outline-primary mr-1 my-1"> {{ $t('global.next') }} </button>
                  <button @click="goPage('last')" :disabled="paramAPI.page === maxPage"
                    class="btn btn-icon btn-sm btn-outline-primary mr-1 my-1">
                    <i class="ri-skip-forward-mini-line"></i>
                  </button>
                </div>
              </div>
  
            </div>
          </div>
          <div v-if="multiple" class="col-lg-4">
            <div class="d-flex flex-column flex-fill h-100">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <label class="mb-0">{{ $t('global.selected') }} :</label>
                  <span v-if="multiple"
                    class="label label-md label-rounded label-success ml-1">{{ selectedLabel.length }}</span>
                  <a @click="modelData = []" v-if="multiple && selectedLabel.length > 0"
                    class="text-danger ml-2 pointer">Hapus Semua</a>
                </div>
                <div v-if="multiple" class="d-flex">
                  <button :disabled="!hasPrevPaginSelected" @click="selectedOffset -= 8"
                    class="btn btn-icon btn-sm btn-outline-primary mr-2">
                    <i class="ri-skip-back-mini-line"></i>
                  </button>
                  <button :disabled="!hasNextPaginSelected" @click="selectedOffset += 8"
                    class="btn btn-icon btn-sm btn-outline-primary">
                    <i class="ri-skip-forward-mini-line"></i>
                  </button>
                </div>
              </div>
              <div class="flex-fill">
                <template v-if="multiple">
                  <template v-if="paginSelected.length != 0">
                    <ul class="list-unstyled selected-lookup mt-3">
                      <li v-for="(s, i) in paginSelected" :key="i">
                        <!-- {{ s[pointer.label] }} -->
                        <div v-html="pointer && pointer.render_view ? pointer.render_view(s[pointer.label], s) : s[pointer.label]"></div>
                        <!-- {{ pointer && pointer.render_view ? pointer.render_view(s[pointer.label], s) : s[pointer.label] }} -->
                        <i @click="removeValue(s)" class="ri-close-circle-fill text-danger pointer"></i>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <div class="alert alert-custom alert-light-primary fade show mb-5 py-2 px-4 mt-5" role="alert">
                      <div class="alert-icon">
                        <i style="font-size: 1.5rem;" class="flaticon-warning"></i>
                      </div>
                      <div class="alert-text">
                        <span class="d-block font-size-sm"> {{ $t('global.unselected') }}</span>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <template v-if="selectedLabel">
                    <ul class="list-unstyled selected-lookup mt-3">
                      <li> {{ selectedLabel }} <i class="ri-close-circle-fill text-danger pointer"
                          @click="removeValue(selectedLabel)"></i> </li>
                    </ul>
                  </template>
                  <template v-else>
                    <div class="alert alert-custom alert-light-primary fade show mb-5 py-2 px-4 mt-5" role="alert">
                      <div class="alert-icon">
                        <i style="font-size: 1.5rem;" class="flaticon-warning"></i>
                      </div>
                      <div class="alert-text">
                        <span class="d-block font-size-sm"> {{ $t('global.unselected') }}</span>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
              <div class="d-flex justify-content-end">
                <button @click="$bvModal.hide('lookup-modal')"
                  class="btn btn-sm btn-primary">{{ $t('global.select_save') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </template>
    <template v-else-if="type === 'lookup-button'">
      <div class="row no-gutters mb-5 nav nav-primary nav-pills gap-7" style="">
        <div class="btn btn-primary h-auto " style="flex-grow: 1" v-for="(d, j) in list" :key="j+'as'" @click="pickValue(d)" :class="{ 'disabled': disabled, 'btn-primary': d[pointer.code] == modelData[pointer.code], 'btn-outline-primary': d[pointer.code] != modelData[pointer.code] }">
          {{ d[pointer.label] }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: 'Lookup-input',
  props: {
    type: { type: String, required: false, default: 'lookup-modal' },
    title: { type: String, required: false, default: '' },
    no_data_message: { type: String, required: false, default: '' },
    value: { required: true },
    valuee: { required: false },
    multiple: { type: Boolean, required: false, default: true },
    endpoint: { type: String, required: true },
    param: { type: Object, required: false, default() { return {} } },
    placeholder: { type: String, required: false },
    pointer: { type: Object, required: false },
    errors: { type: Array, required: false, default() { return [] } },
    classes: { required: false, default() { return [] } },
    defaultCaption: { type: String, required: false, default: null },
    list: { required: false, default() { return [] } },
    disabled: { type: Boolean, required: false, default: false },
    return_object: { type: Boolean, required: false, default: false },
    filter: { type: Array, required: false, default() { return [] } },
  },
  data() {
    return {
      isLoading: false,
      dataList: [],
      tableHeader: null,
      tableHeaderDisplay: [],
      filterValue: {},
      paramAPI: {
        search: null,
        page: 1,
        limit: 10
      },
      hasInputSearch: '',
      inputSearch: null,
      maxPage: 0,
      temp_page: 1,
      modelData: this.multiple ? [] : {},
      selectedOffset: 0,
      errorList: false,
      flagParam: null
    }
  },
  computed: {
    selectedLabel: function () {
      if (this.multiple) {
        if (this.modelData.length === 0) return []
        // else return this.modelData.map(x => x[this.pointer.label])
        else return this.modelData.map(x => { return { ...x, [this.pointer.label]: x[this.pointer.label], [this.pointer.code]: x[this.pointer.code] } })
      } else {
        if (!Object.keys(this.modelData).length === 0) return null
        else {
          const label = this.pointer.label.search('|') !== -1 ? this.pointer.label.split('|')[0] : this.pointer.label
          const r = this.modelData[label]
          return r
        }
      }
    },
    pipeLabel: function () {
      return this.pointer.label.search('|') !== -1 ? this.pointer.label.split('|')[1] : null
    },
    paginSelected: function () {
      if (this.multiple) return this.selectedLabel.slice(this.selectedOffset, 8 + this.selectedOffset)
      else return []
    },
    hasNextPaginSelected() {
      const nextOffset = this.selectedOffset + 8
      if (this.multiple) return Boolean(this.selectedLabel.slice(nextOffset, 8 + nextOffset).length)
      else return false
    },
    hasPrevPaginSelected() {
      const prevOffset = this.selectedOffset - 8
      if (this.multiple) return Boolean(this.selectedLabel.slice(prevOffset, 8 + prevOffset).length)
      else return false
    },
    hasCheckedAll() {
      if (this.modelData instanceof Array && this.dataList) {
        const sameOption = this.modelData.filter(x => this.dataList.some(y => x[this.pointer.label] === y[this.pointer.label]))
        return Boolean(sameOption.length === this.dataList.length)
      } else return false
    },
    caption() {
      if (this.multiple) {
        return this.selectedLabel.length === 0 ? this.$t('global.select_multiple') : this.selectedLabel.length + ' Terpilih'
      } else return this.selectedLabel ? this.selectedLabel : this.defaultCaption || this.$t('global.select_single')
    }
  },
  watch: {
    param: {
      immediate: true,
      deep: true,
      handler(to, from) {
        if (JSON.stringify(to || {}) != JSON.stringify(from || {})) {
          this.getList(null)
        }
      }
    },
    paramAPI: {
      immediate: false,
      deep: true,
      handler(to, from) {
        this.getList(to)
      }
    },
    inputSearch: {
      deep: false,
      immediate: false,
      handler(to) {
        let param = Object.assign({}, this.paramAPI)
        param.page = 1
        param.search = to
        this.temp_page = 1
        this.paramAPI = Object.assign({}, param)
      }
    },
    paginSelected(val) {
      if (val.length === 0 && this.hasPrevPaginSelected) this.selectedOffset -= 8
    },
    value: {
      immediate: true,
      deep: true,
      handler(to, from) {
        if (this.multiple) {
          if (Array.isArray(to) && to.length) this.convertValue(to)
          else this.modelData = []
        } else {
          if (to) this.convertValue(to)
          else this.modelData = {}
        }
      }
    },
    valuee: {
      immediate: true,
      deep: true,
      handler(to, from) {
        // if (to && this.return_object) this.addValue(to)
      }
    },
    tableHeaderDisplay: {
      immediate: true,
      deep: true,
      handler(to) {
        if (to.length > 0 && this.pointer.display.length !== to.length) {
          this.tableHeaderDisplay.splice(this.pointer.display.length, this.pointer.headerDisplay.length - this.pointer.display.length)
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    applyFilter() {
      let param = Object.assign({}, this.paramAPI, this.filterValue)
      param.page = 1
      param.search = this.inputSearch
      this.temp_page = 1
      this.paramAPI = Object.assign({}, param)
    },
    pickValue (d) {
      if(this.disabled) return
      // this.addValue(d)
      this.modelData = { [this.pointer.label]: d[this.pointer.label], [this.pointer.code]: d[this.pointer.code] }
      this.$emit('input', this.revertValue(this.modelData))
    },
    revertValue(data) {
      if (data) {
        // if (this.multiple) return data.map(x => { return { [this.pointer.label]: x[this.pointer.label], [this.pointer.code]: x[this.pointer.code] } })
        if (this.multiple) return data
        else {
          if (this.return_object) return this.dataList.filter((x) => x[this.pointer.code] === data[this.pointer.code])[0]
          else return data[this.pointer.code]
          // return data[this.pointer.code]
        }
      } else return this.multiple ? [] : null
    },
    convertValue(data) {
      if (!this.dataList.length && !this.errorList) this.getList().then(e => { if (!this.errorList) this.convertValue(data) })
      else {
        if (data) {
          if (this.multiple) {
            this.modelData = data.concat(this.modelData).filter((v, i, a) => a.findIndex(v2 => [this.pointer.code].every(k => v2[k] === v[k])) === i)
          } else {
            const newData = this.dataList.filter(x => data === x[this.pointer.code])[0]
            if (newData) {
              if (this.return_object) {
              } else {
                this.$set(this.modelData, this.pointer.code, newData[this.pointer.code])
                this.$set(this.modelData, this.pointer.label, newData[this.pointer.label])
              }
            } else {
              if (this.pointer.customDetailApi) {
                this.customDetailFindValue(data).then(res => {
                  this.$set(this.modelData, this.pointer.code, res[this.pointer.code])
                  this.$set(this.modelData, this.pointer.label, res[this.pointer.label])
                })
              } else if (this.pointer.isExternalFetch) {
                let data = {}
                this.pointer.list.forEach(element => {
                  if (element[this.pointer.code] === data) {
                    data = element

                    this.$set(this.modelData, this.pointer.code, data[this.pointer.code])
                    this.$set(this.modelData, this.pointer.label, data[this.pointer.label])

                  }
                });
              } else {

                if (this.return_object) {
                  this.$set(this.modelData, this.pointer.code, data[this.pointer.code])
                  this.$set(this.modelData, this.pointer.label, data[this.pointer.label])
                } else {
                  this.findValue(data).then(res => {
                    this.$set(this.modelData, this.pointer.code, res[this.pointer.code])
                    this.$set(this.modelData, this.pointer.label, res[this.pointer.label])
                  })
                }
              }
            }
          }
        }
      }
    },
    openModal() {
      if (!this.disabled) {
        this.$refs['lookup-modal'].show()
        this.getList()
        // if (!this.dataList.length && !this.errorList) this.getList()
      }
    },
    findValue(id) {
      const keyId = this.pointer.code ? this.pointer.code : 'id'
      if (typeof id === 'object' && !id[keyId]) {
        let res = {}
        res[this.pointer.code] = ''
        res[this.pointer.label] = ''
        return Promise.resolve(res)
      } else if(typeof id === 'object' && id[keyId]) id = id[keyId]

      return this.getList({ limit: 9999999999999 }).then(e => { 
        const newData = this.dataList.filter(x => id === x[this.pointer.code])[0]
        return  newData || {}
        // if(newData && !this.return_object) {
        //   this.$set(this.modelData, this.pointer.code, newData[this.pointer.code])
        //   this.$set(this.modelData, this.pointer.label, newData[this.pointer.label])
        // }
       })

      // return this.$_api.single(this.endpoint, null, id).then(res => {
      //   if (!!res && res.data.length) return res.data[0]
      // }).catch((err) => {
      //   // this.$_alert.error(err, 'Value tidak ditemukan')
      // })
    },
    customDetailFindValue(id) {

      let params = []
      if (this.pointer.customDetailApi.param) {
        params = {
          [this.pointer.customDetailApi.param]: id
        }
      }

      if (this.pointer.customDetailApi.params) {
        params = {
          ...params,
          ...this.pointer.customDetailApi.params
        }
      }

      return this.$_api.post(this.pointer.customDetailApi.api, {
        halaman: 1,
        jumlah: 1,
        ...params
      }).then(res => {
        if (res.data.length) return res.data[0]
      }).catch((err) => {
        // this.$_alert.error(err, 'Value di custom detail tidak ditemukan')
      })
    },
    addValue(val) {
      if (this.multiple) {
        let index = this.modelData.findIndex(x => JSON.stringify(x) === JSON.stringify(val))
        index !== -1 ? this.modelData.splice(index, 1) : this.modelData.unshift(val)
      } else {
        // if (!val) return
        const checkVal = this.modelData[this.pointer.code] === val[this.pointer.code]
        if (!checkVal) {
          this.$set(this.modelData, this.pointer.code, val[this.pointer.code])
          this.$set(this.modelData, this.pointer.label, val[this.pointer.label])
        } else {
          this.removeValue(val)
        }
      }

      // if (this.type === 'lookup-button') this.$emit('input', this.revertValue(this.modelData))
    },
    removeValue(val) {
      if (this.multiple) this.modelData.splice(this.modelData.indexOf(this.modelData.filter(x => x[this.pointer.label] === val[this.pointer.label])[0]), 1)
      else this.modelData = {}
    },
    selectAll() {
      if (this.$refs['select-all'].checked) {
        this.$refs['select-all'].checked = false
        this.modelData = this.modelData.filter(x => !this.dataList.some(y => x[this.pointer.label] === y[this.pointer.label]))
      } else {
        this.$refs['select-all'].checked = true
        const unSelected = this.dataList.filter(x => !this.modelData.some(y => x[this.pointer.label] === y[this.pointer.label]))
        this.modelData = unSelected.concat(this.modelData)
      }
    },
    goPage(e, event = null) {
      switch (e) {
        case 'first':
          this.paramAPI.page = 1
          break
        case 'last':
          this.paramAPI.page = Number(this.maxPage)
          break
        case 'next':
          this.paramAPI.page = this.paramAPI.page < this.maxPage ? Number(this.paramAPI.page) + 1 : this.paramAPI.page
          break
        case 'prev':
          this.paramAPI.page = this.paramAPI.page === 1 ? this.paramAPI.page : Number(this.paramAPI.page) - 1
          break
        case 'input':
          if (!isNaN(this.temp_page)) {
            if (this.temp_page > this.maxPage) this.paramAPI.page = this.maxPage
            else if (this.temp_page < 1) this.paramAPI.page = 1
            else this.paramAPI.page = this.temp_page
          }
          break
      }
      this.temp_page = this.paramAPI.page
    },
    async getList(localParam = null) {
      this.isLoading = true
      this.getTableHeaderDisplay()
      if (this.pointer.list) {
        let res = { data: this.pointer.list }
        this.errorList = !res.data.length
        this.dataList = res.data
        this.maxPage = Math.ceil(res.total / 10)
        if (this.pointer.display) this.tableHeader = this.pointer.display
        else this.tableHeader = Object.keys(res.data[0])

        this.filterStaticList()
        this.isLoading = false
        return
      }

      if (!localParam) {
        localParam = {
          search: this.paramAPI.search,
          page: this.paramAPI.page,
          limit: 10,
          active: 1
        }
      }


      if (this.pointer.mainParam) {
        localParam[this.pointer.mainParam] = localParam.search
      }

      // let newParam = { ...localParam, ...this.param }
      let newParam = { ...this.param, ...localParam }

      await this.$_api.dataset(this.endpoint, newParam).then(res => {
        this.errorList = !res.data.length
        this.dataList = res.data
        this.maxPage = Math.ceil(parseInt(res.count) / 10)
        if (this.pointer.display) this.tableHeader = this.pointer.display
        else this.tableHeader = Object.keys(res.data[0])
        this.isLoading = false
      }).catch((err) => {
        this.errorList = true
        this.$_alert.error(err, 'Daftar pilihan tidak ditemukan')
        this.isLoading = false
      })
    },
    filterStaticList() {
      if(!this.paramAPI.search) return
      if(!this.paramAPI.search) return

      const list = this.list
      let newList = []

      for (const item of list) {
        const stringItem = JSON.stringify(item)
        if (stringItem.toLowerCase().includes(this.paramAPI.search.toLowerCase())) newList.push(item)
      }

      this.dataList = newList
    },
    getTableHeaderDisplay() {
      this.tableHeaderDisplay = []
      if (this.pointer.display && this.pointer.headerDisplay) {
        for (let i = 0; i < this.pointer.display.length; i++) {
          const element = this.pointer.headerDisplay[i];
          if (!element) {
            this.tableHeaderDisplay.push('')
          } else {
            this.tableHeaderDisplay.push(element)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.lookup-wrapper {
  /*max-width: 250px;*/
  width: 100%;
}

/* .lookup-value-wrapper {
                                              display: flex;
                                              align-self: center;
                                              margin-left: 1rem;
                                            } */
.pagination-text {
  width: 80px;
  text-align: center;
}

.table-lookup tr:first-child td {
  border-top: none !important;
}

.selected-lookup li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ebedf3;
  border-radius: 0.42rem;
}

.label.label-rounded {
  border-radius: 50%;
}
</style>
