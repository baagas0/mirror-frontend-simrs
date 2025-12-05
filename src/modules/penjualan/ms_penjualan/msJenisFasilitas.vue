<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis_fasilitas',
  data() {
    return {
      config: {
        title: 'Daftar Jenis Fasilitas',
        model_api: 'jenis_fasilitas',
        getter: 'msJenisFasilitas',
        setter: 'msJenisFasilitas',
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
          // id_jenis_fasilitas
          {
            id: 'id',
            data: 'id',
            label: 'id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jenis_fasilitas
          {
            id: 'nama_jenis_fasilitas',
            data: 'nama_jenis_fasilitas',
            label: 'Nama Jenis Fasilitas',
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
