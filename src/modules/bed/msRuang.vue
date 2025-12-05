<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-ruang',
  data () {
    return {
      config: {
        title: 'Daftar Ruang',
        model_api: 'ruang',
        getter: 'msRuang',
        setter: 'msRuang',
        pk_field: null,
        frontendPaginate: true,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // id
          {
            id: 'id',
            data: 'id',
            label: 'ID Ruang',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: true,
              update: true,
              filter: false
            }
          },
          // nama_ruang
          {
            id: 'nama_ruang',
            data: 'nama_ruang',
            label: 'Nama Ruang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          }
        ]
      }
    }
  }
}
</script>
