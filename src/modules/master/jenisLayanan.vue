<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis-layanan',
  data () {
    return {
      config: {
        title: 'Daftar Jenis Layanan',
        model_api: 'jenis-layanan',
        getter: 'msJenisLayanan',
        setter: 'msJenisLayanan',
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
          // nama_jenis_layanan
          {
            id: 'nama_jenis_layanan',
            data: 'nama_jenis_layanan',
            label: 'Nama Jenis Layanan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_bridge
          {
            id: 'kode_bridge',
            data: 'kode_bridge',
            label: 'Kode Bridge',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_jenis_layanan
          {
            id: 'kode_jenis_layanan',
            data: 'kode_jenis_layanan',
            label: 'Kode Jenis layanan',
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
