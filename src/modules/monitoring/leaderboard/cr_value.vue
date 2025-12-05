<template>
    <tas-base-crud mock-slave hideFilter hideDetail hideCreate hideDelete hideUpdate :config="initConfig"/>
  </template>

<script>
export default {
  name: 'crud-cr_value',
  props: {
    cleanFilter: { required: true, type: Object }
  },
  data () {
    return {
      config: {
        title: 'Critical Ratio (CR)',
        model_api: null,
        getter: 'cr_value',
        setter: 'cr_value',
        pk_field: 'position',
        permission: {
          create: 'create-cr_value',
          read: 'view-cr_value',
          update: 'update-cr_value',
          delete: 'delete-cr_value'
        },
        custom_api: {
          list: 'custom/dashboard/leaderboard/cr_value'
        },
        slave: [],
        fields: [
          { id: 'project_name', label: 'Nama Proyek', methods: { list: true } },
          { id: 'score', label: 'Critical Ratio (CR)', methods: { list: { transform: 'number2fraction' } } },
          { id: 'cpi_value', label: 'Cost Performance Index (CPI)', methods: { list: { transform: 'number2fraction' } } },
          { id: 'spi_value', label: 'Schedule Performance Index (SPI)', methods: { list: { transform: 'number2fraction' } } },
          { id: 'tcpi_value', label: 'To-Complete Performance Index (TCPI)', methods: { list: { transform: 'number2fraction' } } },
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
