<template>
  <div>
    <div v-for="(f, i1) in field" :key="'t1'+i1">
      <div v-if="f.position === 'root'" v-for="(ff, i2) in f.child" :key="'t2'+i2">
        <div v-if="ff.position === 'root'" v-for="(fff, i3) in ff.child" :key="'t3'+i3">
          <s-input v-if="fff.position === 'field'" v-model="v[`${f.id}.${ff.id}.${fff.id}`]" :item="{
            label: fff.label,
            id: fff.id,
            data: fff.id,
            type: fff.type,
            validation: ['required'],
            api: fff.api || null,
            value: fff.value,
            pointer: fff.option && fff.option.list_pointer ? {
              label: fff.option.list_pointer.label || null,
              code: fff.option.list_pointer.code || null,
              display: [fff.option.list_pointer.label || null]
            } : {},
            param: {},
          }" :valuee="fff.value"></s-input>
        </div>
        
        <s-input v-if="ff.position === 'field'" v-model="v[`${f.id}.${ff.id}`]" :item="{
          label: ff.label,
          id: ff.id,
          data: ff.id,
          type: ff.type,
          validation: ['required'],
          api: ff.api || null,
          value: ff.value,
          pointer: ff.pointer,
          param: {},
        }" :valuee="ff.value"></s-input>
      </div>

      <s-input v-if="f.position === 'field'" v-model="v[`${f.id}`]" :item="{
        label: f.label,
        id: f.id,
        data: f.id,
        type: f.type,
        validation: ['required'],
        api: f.api || null,
        value: f.value,
        pointer: f.pointer,
        param: {},
      }" :valuee="f.value"></s-input>
      
    </div>

    <table-input-array v-if="false" v-model="v['obat.detail']" :label="[
      {type: 'text', id: 'coba', label: 'Coba'},
      {type: 'text', id: 'in', label: 'Input Text'},
    ]" :getter="'s'" :tableLabel="'Daftar Racun Tikus'"></table-input-array>

  </div>
</template>

<script>
export default {
  name: 'main-form-custom',
  props: {
    field: { type: Array, required: true }
  },
  data () {
    return {
      v: {},
      vFinal: {}
    }
  },
  watch: {
    v: {
      immediate: true,
      deep: true,
      handler (to) {
        this.vFinal = this.convertToLeveling(this.v)
        this.$emit('input', this.vFinal)
      }
    },
    field: {
      immediate: true,
      deep: true,
      handler (to) {
        console.log(to)
      } 
    }
  },
  mounted () {
    console.log('dynamic-json start')
    console.log(this.field)
  },
  methods: {
    convertToLeveling (data) {
      const result = {}

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const keys = key.split('.')
          let current = result

          keys.forEach((subKey, index) => {
            if (index === keys.length - 1) {
              current[subKey] = data[key]
            } else {
              current[subKey] = current[subKey] || {}
              current = current[subKey]
            }
          })
        }
      }

      return result
    }
  }
}
</script>
