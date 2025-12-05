<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-msTipeGl',
  data () {
    return {
      config: {
        title: 'Daftar Tipe General Ledger',
        model_api: 'msTipeGl',
        getter: 'msTipeGl',
        setter: 'msTipeGl',
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
            label: 'id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // code
          {
            id: 'code',
            data: 'code',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // name
          {
            id: 'name',
            data: 'name',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // sequence
          {
            id: 'sequence',
            data: 'sequence',
            label: 'Urutan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'number' },
              update: { type: 'number' },
              filter: true
            }
          },
          // remark
          {
            id: 'remark',
            data: 'remark',
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
