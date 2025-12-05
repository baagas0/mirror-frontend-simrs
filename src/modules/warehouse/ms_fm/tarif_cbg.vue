<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-tarif_cbg',
  data () {
    return {
      config: {
        title: 'Daftar Tarif CBG',
        model_api: 'tarif_cbg',
        getter: 'tarif_cbg',
        setter: 'tarif_cbg',
        // custom_api: {
        //   list: 'tarif_cbg/listWithParamBypassUri'
        // },
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
          // kode_bridge
          {
            id: 'kode_bridge',
            data: 'kode_bridge',
            label: 'Kode Bridge',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },
          // nama_tarif_cbg
          {
            id: 'nama_tarif_cbg',
            data: 'nama_tarif_cbg',
            label: 'Nama Tarif CBG',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },
          // keterangan_tarif_cbg
          {
            id: 'keterangan_tarif_cbg',
            data: 'keterangan_tarif_cbg',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: ['required'] },
              update: { type: 'textarea', validation: ['required'] },
              filter: false
            }
          },
          // status_tarif_cbg
          {
            id: 'status_tarif_cbg',
            data: 'status_tarif_cbg',
            label: 'Status Tarif CBG',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                validation: ['required'],
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
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
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  }
                }
              },
              filter: false
            }
          },
        ]
      }
    }
  }
}
</script>
