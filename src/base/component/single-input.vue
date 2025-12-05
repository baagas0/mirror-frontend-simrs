<template>
  <div class="form-group" :class="item.nm ? item.groupClass || 'mb-0' : item.groupClass || ''">
    <ValidationProvider mode="eager" :name="item.label" :rules="item.validation.join('|')" v-slot="{ classes, errors }"
      :class="[item.suffix || item.prefix ? '' : '', item.rowclass]">
      <label v-if="item.type != 'hidden' && item.label != null && item.label != ''"
        :class="dateType.includes(item.type) ? 'd-block' : item.suffix || item.prefix ? '' : ''">{{ item.label }} <span
          v-if="item.validation.includes('required')" class="text-danger">*</span></label>

          <template v-if="item.suffix || item.prefix">
        <div class="input-group" :class="[item.validation.length === 0 ? '' : classes]">
          <span class="input-group-text" v-if="item.prefix">{{ item.prefix }}</span>
          <input v-on="item.event" v-bind:value="value" v-bind="item.attr"
            v-on:input="$emit('input', $event.target.value)" :disabled="disabled" :type="item.type" class="form-control"
            :class="[item.validation.length === 0 ? '' : classes, item.class]" :placeholder="item.placeholder" />
          <div class="input-group-append" v-if="item.suffix">
            <span class="input-group-text" v-html="item.suffix"></span>
          </div>
        </div>
      </template>
      <template v-else>
        <label :class="item.classLabel ? item.classLabel : 'col-auto'" class="col-form-label"
          v-if="item.prefix">{{ item.prefix }}</label>
        <input :disabled="disabled" v-if="defaultType.includes(item.type)" v-bind:value="value" v-bind="item.attr"
          v-on:input="$emit('input', $event.target.value)" :type="item.type" class="form-control"
          :class="[item.validation.length > 0 ? classes : '', item.suffix || item.prefix ? 'col' : '', item.ic]"
          :placeholder="item.placeholder ? item.placeholder : 'Ketikkan ' + (item.label || '') + ' disini...'" />
        <!-- <vue-numeric v-else-if="numberType.includes(item.type)" :disabled="disabled" v-model="tmp_value" separator="."
          :empty-value="0" v-bind="item.attr" :currency="item.type === 'money' ? 'Rp.' : null"
          v-on:input="$emit('input', tmp_value)" class="form-control"
          :class="[item.validation.length > 0 ? classes : '', item.suffix || item.prefix ? 'col' : '', item.ic]"
          :placeholder="item.placeholder ? item.placeholder : 'Ketikkan ' + (item.label || '') + ' disini...'" /> -->
        <vue-numeric
          v-else-if="numberType.includes(item.type)"
          :disabled="disabled"
          v-model="tmp_value"
          separator=","
          decimal-separator="."
          :precision="numberPrecision(item.type)"
          :empty-value="null"
          :currency="item.type === 'money' ? 'Rp.' : null"
          v-on:input="$emit('input', tmp_value)"
          class="form-control"
          :class="[item.validation.length > 0 ? classes : '', item.suffix || item.prefix ? 'col' : '', item.ic]"
          :placeholder="item.placeholder ? item.placeholder : 'Ketikkan ' + (item.label || '') + ' disini...'"
        />
        <date-picker :disabled="disabled" v-bind="item.attr" :inline="item.inline"
          v-else-if="dateType.includes(item.type)" :input-attr="{ autocomplete: 'off' }" v-model="tmp_value"
          v-on:input="$emit('input', $event)" :type="item.type" :input-class="'form-control ' + item.ic"
          :class="[item.validation.length > 0 ? classes : '']" :placeholder="item.placeholder || null"
          :value-type="formatDate(item.type)" :formatter="item.formatter || null" :format="formatDateView(item.type)"
          :lang="monthLang" />
        <v-select :disabled="disabled" v-bind="item.attr" v-else-if="item.type === 'select'" v-model="tmp_value"
          v-on:input="$emit('input', $event)" :reduce="x => x.code" :appendToBody="item.notAppendToBody ? false : true"
          class="vs-style" :options="tmp_option" :placeholder="item.placeholder || null"
          :class="[item.validation.length > 0 ? classes : item.nm ? 'mb-0' : 'mb-3', item.ic]">
          <slot name="no-options">{{ $t('error.no_data') }}</slot>
        </v-select>
        <div class="form-group" v-else-if="item.type === 'radio'">
          <div class="radio-inline">
              <label class="radio" v-for="(opt, i) in tmp_option" :key="'radio-option-' + i">
                  <input type="radio" :name="item.label" :value="opt.code" v-model="tmp_value" v-on:input="$emit('input', opt.code)"/>
                  <span></span>
                  {{ opt.label }}
              </label>
          </div>
          <span class="form-text text-muted" v-if="item.hint">{{ item.hint }}</span>
        </div>
        <!-- <textarea :disabled="disabled" v-else-if="item.type === 'textarea'" v-on:input="$emit('input', $event.target.value)" :input-attr="{ autocomplete:'off' }" class="form-control" :class="item.validation.length>0? classes : ''" :placeholder="item.placeholder || null" :rows="item.rows || 5"></textarea> -->
        <textarea :disabled="disabled" v-else-if="item.type === 'textarea'" v-model="tmp_value"
          @change="$emit('input', $event.target.value)" :input-attr="{ autocomplete: 'off' }" class="form-control"
          :class="item.validation.length > 0 ? classes : item.ic" :placeholder="item.placeholder || null"
          :rows="item.rows || 5"></textarea>
        <div v-else-if="item.type === 'file'" class="d-flex align-items-center">
          <a @click="$refs.inputFile.click()" class="btn btn-sm btn-light-primary mr-3">Pilih File</a>
          <input ref="inputFile" v-bind="item.attr" type="file" hidden @change="handleFile($event)">
          <template v-if="!tmp_value">
            <span v-if="uploadLimitExceed" class="ml-2">Ukuran maksimal file yang diperbolehkan
              {{ item.limit || 5 }}mb</span>
            <span v-else class="ml-2">Belum ada file yang dipilih</span>
          </template>
          <template v-else>
            <a :href="tmp_value.url" target="_blank" class="ml-2">{{ tmp_value.filename }}</a>
            <i @click="tmp_value = null; $emit('input', null)" class="ri-delete-bin-2-line ml-3 text-danger pointer"></i>
          </template>
        </div>
        <lookup-input v-else-if="lookupType.includes(item.type)" :title="item.label" :disabled="disabled"
          :defaultCaption="item.defaultCaption" :return_object="item.return_object ? item.return_object : false"
          v-model="tmp_value" v-on:input="$emit('input', $event || null)" :endpoint="item.getter ? item.getter : (item.api ? item.api : '')"
          :no_data_message="item.no_data_message || `Data ${item.label} tidak ditemukan.`"

          :valuee="valuee"
          :pointer="item.pointer ? item.pointer : (item.option ? item.option.list_pointer : {})" 
          :list="item.pointer ? item.pointer.list : (item.option ? item.option.list_pointer.list : [])" 
          :param="item.param ? item.param : (item.option && item.option.get_param && item.option.get_param.length ? item.option.get_param[0] : {})"
          
          :placeholder="item.placeholder || null" :classes="[item.validation.length > 0 ? classes : {}, item.ic]"
          :errors="errors" :multiple="item.type === 'lookup-checkbox'" :type="item.type === 'lookup-button' ? 'lookup-button' : 'lookup-modal'" />
        <span v-else>Tipe konfig tidak ditemukan | {{ item.type }}</span>
        <label class="col-auto col-form-label" v-if="item.suffix">{{ item.suffix }}</label>

        <div class="invalid-feedback" style="display: flex;" v-if="errors.length">{{ errors[0] }}</div>
      </template>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: 'minimalize-input',
  props: {
    item: { type: Object, required: true },
    value: { required: false, default: '' },
    valuee: { required: false },
    disabled: {
      // type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      defaultType: ['text', 'email', 'hidden', 'password', 'tel', 'url', 'color'],
      dateType: ['date', 'datetime', 'year', 'month', 'time', 'week'],
      numberType: ['number', 'money', 'decimal'],
      lookupType: ['lookup-button', 'lookup-radio', 'lookup-checkbox'],
      tmp_value: null,
      tmp_option: [],
      uploadLimitExceed: false,
      monthLang: {
        formatLocale: {
          months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        }
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(to) {
        if (!this.defaultType.includes(this.item.type)) this.tmp_value = to
      }
    },
    valuee: {
      immediate: true,
      deep: true,
      handler(to) {
        if (to) {
          this.tmp_value = this.valuee
          this.$emit('input', this.tmp_value)
        }
      }
    },
    'item.param': {
      immediate: true,
      deep: true,
      handler(to) {
        // console.log('Param Single Input', this.item)
        // this.tmp_value = this.valuee
      }
    },
    'item.optionList': {
      handler(to) {
        if (this.item.optionList && this.item.pointer && this.item.pointer.label) {
          let list = this.item.optionList.map((e) => { return { label: e[this.item.pointer.label], code: e[this.item.pointer.code] } })
          this.tmp_option = list
        } else this.tmp_option = this.item.optionList
      }
    },
    'item.pointer.list': {
      handler(to) {
        if (this.item.pointer.list && this.item.pointer && this.item.pointer.label) {
          let list = this.item.pointer.list.map((e) => { return { label: e[this.item.pointer.label], code: e[this.item.pointer.code] } })
          this.tmp_option = list
        } else this.tmp_option = this.item.pointer.list
      }
    }
  },
  mounted() {
    if (this.valuee) {
      this.tmp_value = this.valuee
      this.$emit('input', this.tmp_value)
    }
    // console.log(this.item)
    // this.beforeMount()
  },
  beforeMount() {
    if (!this.defaultType.includes(this.item.type)) this.tmp_value = this.value
    if (this.item.type === 'select' || this.item.type === 'radio') {
      if (this.item.api) this.getDataOption(this.item.api, this.item.pointer)
      else {
        if ((this.item.optionList || (this.item.pointer && this.item.pointer.list)) && this.item.pointer && this.item.pointer.label) {
          if (this.item.optionList) {
            let list = this.item.optionList.map((e) => { return { label: e[this.item.pointer.label], code: e[this.item.pointer.code] } })
            this.tmp_option = list
          } else if (this.item.pointer && this.item.pointer.list) {
            let list = this.item.pointer.list.map((e) => { return { label: e[this.item.pointer.label], code: e[this.item.pointer.code] } })
            this.tmp_option = list
          }
        } else this.tmp_option = this.item.optionList
      }
    }
  },
  methods: {
    numberPrecision(type) {
      if (this.item && this.item.precision != null) return this.item.precision
      if (type === 'money') return 2
      if (type === 'decimal') return 2
      return 0
    },
    formatDate(type) {
      let _format
      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'YYYY-MM-DD'
          break
        case 'datetime':
          _format = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'datetime-range':
          _format = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY-MM-DD'
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
    formatDateView(type) {
      let _format

      if (this.item.formatDateView) return _format = this.item.formatDateView

      switch (type) {
        case 'date':
        case 'date-range':
          _format = 'DD MMMM YYYY'
          break
        case 'datetime':
        case 'datetime-range':
          _format = 'DD MMMM YYYY HH:mm:ss ZZ'
          break
        case 'year':
        case 'year-range':
          _format = 'YYYY'
          break
        case 'month':
        case 'month-range':
          _format = 'MMMM YYYY'
          break
        case 'time':
        case 'time-range':
          _format = 'HH : mm : ss'
          break
        case 'week':
        case 'week-range':
          _format = 'DD'
          break
      }
      return _format
    },
    getDataOption(api, pointer) {
      let filter = {
        limit: 1000
      }
      if (this.item.param) filter = { ...filter, ...this.item.param }
      this.$_api.dataset(api, filter).then(res => {
        this.tmp_option = res.data.map(function (x) { return { 'label': x[pointer.label], 'code': x[pointer.code] } })
      })
    },
    handleFile(e) {
      let limit = this.item.limit || 5
      if ((e.target.files[0].size / 1000000).toFixed(2) < limit) {
        this.uploadLimitExceed = false
        let file = e.target.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        this.$_api.fileUpload(file, event => {
          this.tmp_value = file
          this.uploadPercentage = Math.round((100 * event.loaded) / event.total)
        }).then(res => {
          this.$emit('input', res.data)
          e.target.value = null
        }).catch((err) => {
          this.$emit('input', null)
          e.target.value = null
          console.log(err)
        })
      } else this.uploadLimitExceed = true
    },
    revertNumberType(value) {
      const numberPattern = /\d+/g
      if (value) this.$emit('input', Number(value[0].toString().match(numberPattern).join('')))
      else this.$emit('input', 0)
    }
  }
}
</script>

<style scoped>
/* .mx-datepicker { */
/* display: block !important; */
/* } */
</style>
