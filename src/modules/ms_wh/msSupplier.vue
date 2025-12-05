<template lang="">
  <tas-base-crud :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" />
</template>

<script>
export default {
  name: 'crud-supplier',
  data() {
    return {
      config: {
        title: 'Daftar Supplier',
        model_api: 'supplier',
        getter: 'msSupplier',
        setter: 'msSupplier',
        pk_field: null,
        frontendPaginate: false,
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
            label: 'Nama Supplier',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nama_supplier
          {
            id: 'nama_supplier',
            data: 'nama_supplier',
            label: 'Nama Supplier',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // no_hp_supplier
          {
            id: 'no_hp_supplier',
            data: 'no_hp_supplier',
            label: 'No Hp',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // alamat_supplier
          {
            id: 'alamat_supplier',
            data: 'alamat_supplier',
            label: 'Alamat',
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
      },
      filterView: true,
      hideFilter: false,
      hideGlobalSearch: true,
    }
  }
}
</script>
