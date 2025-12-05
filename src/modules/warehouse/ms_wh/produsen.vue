<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-produsen',
  data () {
    return {
      config: {
        title: 'Daftar Produsen',
        model_api: 'produsen',
        getter: 'msProdusen',
        setter: 'msProdusen',
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
            label: 'Nama Produsen',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_produsen
          {
            id: 'nama_produsen',
            data: 'nama_produsen',
            label: 'Nama Produsen',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
