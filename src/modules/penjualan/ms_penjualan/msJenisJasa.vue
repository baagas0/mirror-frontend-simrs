<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis_jasa',
  data() {
    return {
      config: {
        title: 'Daftar Jenis Jasa',
        model_api: 'jenis_jasa',
        getter: 'msJenisJasa',
        setter: 'msJenisJasa',
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
            label: 'Nama Jenis Jasa',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jenis_jasa
          {
            id: 'nama_jenis_jasa',
            data: 'nama_jenis_jasa',
            label: 'Nama Jenis Jasa',
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
