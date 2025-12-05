<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-pekerjaan',
  data () {
    return {
      config: {
        title: 'Daftar Pekerjaan',
        model_api: 'pekerjaan',
        getter: 'msPekerjaan',
        setter: 'msPekerjaan',
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
          // nama_pekerjaan
          {
            id: 'nama_pekerjaan',
            data: 'nama_pekerjaan',
            label: 'Nama Pekerjaan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_pekerjaan
          {
            id: 'keterangan_pekerjaan',
            data: 'keterangan_pekerjaan',
            label: 'Keterangan Pekerjaan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: true
            }
          }
        ]
      }
    }
  }
}
</script>
