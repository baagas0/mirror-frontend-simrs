<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-tarif',
  data() {
    return {
      config: {
        title: 'Daftar Tarif',
        model_api: 'tarif',
        getter: 'msTarif',
        setter: 'msTarif',
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
            label: 'Nama Tarif',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_tarif
          {
            id: 'nama_tarif',
            data: 'nama_tarif',
            label: 'Nama Tarif',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan
          {
            id: 'keterangan',
            data: 'keterangan',
            label: 'Keterangan',
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
