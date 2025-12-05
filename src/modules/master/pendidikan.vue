<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-pendidikan',
  data () {
    return {
      config: {
        title: 'Daftar Pendidikan',
        model_api: 'pendidikan',
        getter: 'msPendidikan',
        setter: 'msPendidikan',
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
          // nama_pendidikan
          {
            id: 'nama_pendidikan',
            data: 'nama_pendidikan',
            label: 'Nama Pendidikan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_pendidikan
          {
            id: 'keterangan_pendidikan',
            data: 'keterangan_pendidikan',
            label: 'Keterangan Pendidikan',
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
