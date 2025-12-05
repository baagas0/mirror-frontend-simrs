<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-satuan',
  data () {
    return {
      config: {
        title: 'Daftar Satuan',
        model_api: 'satuan',
        getter: 'msSatuanBarang',
        setter: 'msSatuanBarang',
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
            label: 'Nama Satuan',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nama_satuan
          {
            id: 'nama_satuan',
            data: 'nama_satuan',
            label: 'Nama Satuan',
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
