<template>
    <tas-base-crud mock-slave hideFilter hideDetail hideCreate hideDelete hideUpdate :config="initConfig"/>
  </template>

<script>
export default {
  name: 'crud-spi_value',
  props: {
    cleanFilter: { required: true, type: Object }
  },
  data () {
    return {
      config: {
        title: 'Schedule Performance Index (SPI)',
        model_api: null,
        getter: 'spi_value',
        setter: 'spi_value',
        pk_field: 'position',
        permission: {
          create: 'create-spi_value',
          read: 'view-spi_value',
          update: 'update-spi_value',
          delete: 'delete-spi_value'
        },
        custom_api: {
          list: 'custom/dashboard/leaderboard/spi_value'
        },
        slave: [],
        fields: [
          { id: 'project_name', label: 'Nama Proyek', methods: { list: true } },
          { id: 'score', label: 'Schedule Performance Index (SPI)', methods: { list: { transform: 'number2fraction' } } },
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
