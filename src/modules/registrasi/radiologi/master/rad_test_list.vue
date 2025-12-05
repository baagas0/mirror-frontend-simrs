<template lang="">
  <tas-base-crud ref="crud-rad_test_list" :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" />
</template>

<script>
export default {
  name: 'crud-rad_test_list',
  data() {
    return {
      config: {
        title: 'Daftar List Tes Radiologi',
        model_api: 'rad_test_list',
        getter: 'rad_test_list',
        setter: 'rad_test_list',
        pk_field: 'rad_test_list_id',
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
          // rad_test_id
          {
            id: 'rad_test_id',
            data: 'rad_test_id',
            label: 'Tes Radiologi',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_rad_test' },
              detail: { view_data: 'nama_rad_test' },
              create: {
                setter: 'rad_test',
                getter: 'rad_test',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_rad_test',
                    code: 'rad_test_id',
                    display: ['nama_rad_test', 'keterangan_rad_test']
                  }
                }
              },
              update: {
                setter: 'rad_test',
                getter: 'rad_test',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_rad_test',
                    code: 'rad_test_id',
                    display: ['nama_rad_test', 'keterangan_rad_test']
                  }
                }
              },
              filter: true
            }
          },
          // penunjang_id
          {
            id: 'penunjang_id',
            data: 'penunjang_id',
            label: 'Penunjang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_penunjang' },
              detail: { view_data: 'nama_penunjang' },
              create: {
                setter: 'penunjang',
                getter: 'penunjang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_penunjang',
                    code: 'penunjang_id',
                    display: ['nama_jenis_penunjang', 'nama_penunjang', 'parameter_normal', 'satuan', 'keterangan_penunjang'],
                    headerDisplay: ['Jenis Penunjang', 'Nama Penunjang', 'Parameter Normal', 'Satuan', 'Keterangan']
                  },
                  filterAPI: {
                    nama_jenis_penunjang: 'RADIOLOGI'
                  }
                }
              },
              update: {
                setter: 'penunjang',
                getter: 'penunjang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_penunjang',
                    code: 'penunjang_id',
                    display: ['nama_jenis_penunjang', 'nama_penunjang', 'parameter_normal', 'satuan', 'keterangan_penunjang'],
                    headerDisplay: ['Jenis Penunjang', 'Nama Penunjang', 'Parameter Normal', 'Satuan', 'Keterangan']
                  },
                  filterAPI: {
                    nama_jenis_penunjang: 'RADIOLOGI'
                  }
                }
              },
              filter: true
            }
          },
          // queue
          {
            id: 'queue',
            data: 'queue',
            label: 'No Urut Tampilan',
            placeholder: 'Ketik Urutan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'number', validation: ['required'] },
              update: { type: 'number', validation: ['required'] },
              filter: true
            }
          },
          // keterangan_rad_test_list
          {
            id: 'keterangan_rad_test_list',
            data: 'keterangan_rad_test_list',
            label: 'Keterangan',
            placeholder: 'Ketik Keterangan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea',validation: ['required'] },
              update: { type: 'textarea',validation: ['required'] },
              filter: true
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
