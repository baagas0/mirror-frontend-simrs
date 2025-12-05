<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-golongan-darah',
  data() {
    return {
      config: {
        title: 'Daftar Golongan Darah',
        model_api: 'golongan-darah',
        getter: 'msGolonganDarah',
        setter: 'msGolonganDarah',
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
          // nama_golongan_darah
          {
            id: 'nama_golongan_darah',
            data: 'nama_golongan_darah',
            label: 'Nama Golongan Darah',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_golongan_darah
          {
            id: 'keterangan_golongan_darah',
            data: 'keterangan_golongan_darah',
            label: 'Keterangan Golongan Darah',
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
