<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-loket',
  data() {
    return {
      config: {
        title: 'Daftar Loket',
        model_api: 'loket',
        getter: 'msLoket',
        setter: 'msLoket',
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
          // nama_loket
          {
            id: 'nama_loket',
            data: 'nama_loket',
            label: 'Nama Loket',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'number',
                validation: ['required'],
                placeholder: 'Isikan nomor loket'
              },
              update: {
                type: 'number',
                validation: ['required'],
                placeholder: 'Isikan nomor loket'
              },
              filter: true
            }
          },
          // status_loket
          {
            id: 'status_loket',
            data: 'status_loket',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: 1 },
                      { label: 'Non Aktif', code: 0 }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: 1 },
                      { label: 'Non Aktif', code: 0 }
                    ]
                  }
                }
              },
              filter: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: 1 },
                      { label: 'Non Aktif', code: 0 }
                    ]
                  }
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>
