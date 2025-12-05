<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kamar',
  data () {
    return {
      config: {
        title: 'Daftar Kamar',
        model_api: 'kamar',
        getter: 'ruangAplicares',
        setter: 'ruangAplicares',
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
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_ruang_aplicares
          {
            id: 'nama_ruang_aplicares',
            data: 'nama_ruang_aplicares',
            label: 'Nama Kamar',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_ruang_aplicares
          {
            id: 'kode_ruang_aplicares',
            data: 'kode_ruang_aplicares',
            label: 'Kode Ruang',
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
