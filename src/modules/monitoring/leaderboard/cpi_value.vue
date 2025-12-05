<template>
    <tas-base-crud mock-slave hideFilter hideDetail hideCreate hideDelete hideUpdate :config="initConfig"/>
  </template>

<script>
export default {
  name: 'crud-cpi_value',
  props: {
    cleanFilter: { required: true, type: Object }
  },
  data () {
    return {
      config: {
        title: 'Cost Performance Index (CPI)',
        model_api: null,
        getter: 'cpi_value',
        setter: 'cpi_value',
        pk_field: 'position',
        permission: {
          create: 'create-cpi_value',
          read: 'view-cpi_value',
          update: 'update-cpi_value',
          delete: 'delete-cpi_value'
        },
        custom_api: {
          list: 'custom/dashboard/leaderboard/cpi_value'
        },
        slave: [],
        fields: [
          { id: 'project_name', label: 'Nama Proyek', methods: { list: true } },
          { id: 'score', label: 'Cost Performance Index (CPI)', methods: { list: { transform: 'number2fraction' } } },
          { id: 'position', label: 'Peringkat', methods: { list: { transform: 'number' } } }
        ]
      }
    }
  },
  computed: {
    initConfig () {
      let newConfig = this.config
      newConfig.filter_api = this.cleanFilter
      return newConfig
    }
  }
}
</script>
