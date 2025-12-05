<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kualifikasi',
  data () {
    return {
      config: {
        title: 'Daftar Kualifikasi',
        model_api: 'kualifikasi',
        getter: 'msKualifikasi',
        setter: 'msKualifikasi',
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
          // nama_kualifikasi
          {
            id: 'nama_kualifikasi',
            data: 'nama_kualifikasi',
            label: 'Nama Kualifikasi',
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
