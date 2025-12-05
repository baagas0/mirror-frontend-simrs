<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-ruang_layanan',
  data() {
    return {
      config: {
        title: 'Data Ruang Layanan',
        model_api: 'ruang_layanan',
        getter: 'layananRuang',
        setter: 'layananRuang',
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
          // nama_layanan_ruang
          {
            id: 'nama_layanan_ruang',
            data: 'nama_layanan_ruang',
            label: 'Nama Layanan Ruang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // initial_layanan_ruang
          {
            id: 'initial_layanan_ruang',
            data: 'initial_layanan_ruang',
            label: 'Initial Layanan Ruang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // nama_layanan
          {
            id: 'nama_layanan',
            data: 'nama_layanan',
            label: 'Nama Layanan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: true
            }
          },
          // status_layanan_ruang
          {
            id: 'status_layanan_ruang',
            data: 'status_layanan_ruang',
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
          },
          // keterangan_layanan_ruang
          {
            id: 'keterangan_layanan_ruang',
            data: 'keterangan_layanan_ruang',
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
