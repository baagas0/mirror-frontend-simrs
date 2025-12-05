<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-layanan',
  data () {
    return {
      config: {
        title: 'Daftar Layanan',
        model_api: 'layanan',
        getter: 'msLayanan',
        setter: 'msLayanan',
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
          // nama_layanan
          {
            id: 'nama_layanan',
            data: 'nama_layanan',
            label: 'Nama Layanan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_layanan
          {
            id: 'kode_layanan',
            data: 'kode_layanan',
            label: 'Kode Layanan',
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
