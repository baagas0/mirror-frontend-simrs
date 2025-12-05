<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-gudang',
  data () {
    return {
      config: {
        title: 'Daftar Gudang',
        model_api: 'gudang',
        getter: 'msGudang',
        setter: 'msGudang',
        custom_api: {
          list: 'msGudang/listWithParamBypassUri'
        },
        pk_field: 'ms_gudang_id',
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
            label: 'Nama Gudang',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_gudang
          {
            id: 'nama_gudang',
            data: 'nama_gudang',
            label: 'Nama Gudang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },
          // tipe_gudang
          {
            id: 'tipe_gudang',
            data: 'tipe_gudang',
            label: 'Tipe Gudang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },
          // is_utama
          {
            id: 'is_utama',
            data: 'is_utama',
            label: 'Jenis Gudang',
            placeholder: null,
            methods: {
              list: { 
                order: true,
                class: {'0': 'badge badge-primary', '1': 'badge badge-warning'},
                transform: 'primaryNm'
              },
              detail: { 
                order: true,
                class: {'0': 'badge badge-primary', '1': 'badge badge-warning'},
                transform: 'primaryNm'
              },
              create: {
                validation: ['required'],
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Utama', code: '0' },
                      { label: 'Bukan', code: '1' }
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
                      { label: 'Utama', code: '0' },
                      { label: 'Bukan', code: '1' }
                    ]
                  }
                }
              },
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
