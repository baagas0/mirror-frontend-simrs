<template>
    <tas-base-crud mock-slave hideFilter hideDetail hideCreate hideDelete hideUpdate :config="initConfig"/>
  </template>

<script>
export default {
  name: 'crud-tcpi_value',
  props: {
    cleanFilter: { required: true, type: Object }
  },
  data () {
    return {
      config: {
        title: 'Schedule Performance Index (SPI)',
        model_api: null,
        getter: 'tcpi_value',
        setter: 'tcpi_value',
        pk_field: 'position',
        permission: {
          create: 'create-tcpi_value',
          read: 'view-tcpi_value',
          update: 'update-tcpi_value',
          delete: 'delete-tcpi_value'
        },
        custom_api: {
          list: 'custom/dashboard/leaderboard/tcpi_value'
        },
        slave: [],
        fields: [
          { id: 'project_name', label: 'Nama Proyek', methods: { list: true } },
          { id: 'score', label: 'TCPI', methods: { list: { transform: 'number2fraction' } } },
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
