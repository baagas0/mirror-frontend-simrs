<template lang="">
  <tas-base-crud ref="crud-rad_test" :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" />
</template>

<script>
export default {
  name: 'crud-rad_test',
  data() {
    return {
      config: {
        title: 'Daftar Tes Radiologi',
        model_api: 'rad_test',
        getter: 'rad_test',
        setter: 'rad_test',
        pk_field: 'rad_test_id',
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
            label: 'ID Diagnosa',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_rad_test
          {
            id: 'nama_rad_test',
            data: 'nama_rad_test',
            label: 'Nama Tes Radiologi',
            placeholder: 'Ketik Nama Tes Radiologi',
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // ms_gudang_id
          {
            id: 'ms_gudang_id',
            data: 'ms_gudang_id',
            label: 'Gudang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_gudang' },
              detail: { view_data: 'nama_gudang' },
              create: {
                setter: 'msGudang',
                getter: 'msGudang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_gudang',
                    code: 'id',
                    display: ['nama_gudang', 'tipe_gudang']
                  }
                }
              },
              update: {
                setter: 'msGudang',
                getter: 'msGudang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_gudang',
                    code: 'id',
                    display: ['nama_gudang', 'tipe_gudang']
                  }
                }
              },
              filter: false
            }
          },
          // keterangan_rad_test
          {
            id: 'keterangan_rad_test',
            data: 'keterangan_rad_test',
            label: 'Keterangan',
            placeholder: 'Ketik Keterangan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea',validation: ['required'] },
              update: { type: 'textarea',validation: ['required'] },
              filter: false
            }
          }
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,
    }
  },
}
</script>
