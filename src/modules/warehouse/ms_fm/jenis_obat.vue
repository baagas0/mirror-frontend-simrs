<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis_obat',
  data () {
    return {
      config: {
        title: 'Daftar Jenis obat',
        model_api: 'jenis_obat',
        getter: 'msJenisObat',
        setter: 'msJenisObat',
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
            label: 'Nama Jenis obat',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jenis_obat
          {
            id: 'nama_jenis_obat',
            data: 'nama_jenis_obat',
            label: 'Nama Jenis obat',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
