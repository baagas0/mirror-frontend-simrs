<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis_antrian',
  data() {
    return {
      config: {
        title: 'Data Jenis Antrian',
        model_api: 'jenis_antrian',
        getter: 'jenisAntrian',
        setter: 'jenisAntrian',
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
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jenis_antrian
          {
            id: 'nama_jenis_antrian',
            data: 'nama_jenis_antrian',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // kode_jenis_antrian
          {
            id: 'kode_jenis_antrian',
            data: 'kode_jenis_antrian',
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
          // status_jenis_antrian
          {
            id: 'status_jenis_antrian',
            data: 'status_jenis_antrian',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: '1' },
                      { label: 'Tidak', code: '0' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: '1' },
                      { label: 'Tidak', code: '0' }
                    ]
                  }
                }
              },
              filter: true
            }
          }
        ]
      }
    }
  }
}
</script>
