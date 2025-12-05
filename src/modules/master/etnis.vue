<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-etnis',
  data () {
    return {
      config: {
        title: 'Daftar Etnis',
        model_api: 'etnis',
        getter: 'msEtnis',
        setter: 'msEtnis',
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // nama_etnis
          {
            id: 'nama_etnis',
            data: 'nama_etnis',
            label: 'Nama Etnis',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                // validation: ['required']
              },
              update: true,
              filter: true
            }
          },
          // keterangan_etnis
          {
            id: 'keterangan_etnis',
            data: 'keterangan_etnis',
            label: 'Keterangan Etnis',
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
