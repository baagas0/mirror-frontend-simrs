<template lang="">
  <tas-base-crud ref="crud-ms_tipe_tenaga_medis" :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" />
</template>

<script>
export default {
  name: 'crud-ms_tipe_tenaga_medis',
  data() {
    return {
      config: {
        title: 'Daftar Tipe Tenaga Medis',
        model_api: 'ms_tipe_tenaga_medis',
        getter: 'ms_tipe_tenaga_medis',
        setter: 'ms_tipe_tenaga_medis',
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
            label: 'ID Tipe Tenaga Medis',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // kode_tipe_tenaga_medis
          {
            id: 'kode_tipe_tenaga_medis',
            data: 'kode_tipe_tenaga_medis',
            label: 'Kode Tipe Tenaga Medis',
            placeholder: 'Ketik Kode Tipe',
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // nama_tipe_tenaga_medis
          {
            id: 'nama_tipe_tenaga_medis',
            data: 'nama_tipe_tenaga_medis',
            label: 'Nama Tipe Tenaga Medis',
            placeholder: 'Ketik Nama Tipe',
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // status_tipe_tenaga_medis
          {
            id: 'status_tipe_tenaga_medis',
            data: 'status_tipe_tenaga_medis',
            label: 'Status Tipe Tenaga Medis',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 'false': 'badge badge-danger', 'true': 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 'false': 'badge badge-danger', 'true': 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                validation: ['required'],
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Data Aktif', code: 'true' },
                      { label: 'Non Aktif', code: 'false' }
                    ]
                  }
                }
              },
              update: {
                validation: ['required'],
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Data Aktif', code: 'true' },
                      { label: 'Non Aktif', code: 'false' }
                    ]
                  }
                }
              },
              filter: false
            }
          },
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,
    }
  },
}
</script>
