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
              detail: false,
              create: false,
              update: false,
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
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // no_hp_supplier
          {
            id: 'no_hp_supplier',
            data: 'no_hp_supplier',
            label: 'No HP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // alamat_supplier
          {
            id: 'alamat_supplier',
            data: 'alamat_supplier',
            label: 'Alamat Supplier',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: ['required'] },
              update: { type: 'textarea', validation: ['required'] },
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
