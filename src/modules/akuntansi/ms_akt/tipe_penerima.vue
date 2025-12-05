<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-tipePenerima',
  data () {
    return {
      config: {
        title: 'Daftar Tipe Penerima',
        model_api: 'tipePenerima',
        getter: 'tipePenerima',
        setter: 'tipePenerima',
        pk_field: 'tipe_penerima_id',
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
          // tipe_penerima_id
          {
            id: 'tipe_penerima_id',
            data: 'tipe_penerima_id',
            label: 'tipe_penerima_id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // initial
          {
            id: 'initial',
            data: 'initial',
            label: 'Inisial',
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
          // status
          {
            id: 'status',
            data: 'status',
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
