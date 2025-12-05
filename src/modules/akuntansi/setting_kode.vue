<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-settingKodeAkun',
  data () {
    return {
      config: {
        title: 'Setting COA',
        model_api: 'settingKodeAkun',
        getter: 'settingKodeAkun',
        setter: 'settingKodeAkun',
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
          // kode_kategori
          {
            id: 'kode_kategori',
            data: 'kode_kategori',
            label: 'kategori',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // setting_1
          {
            id: 'setting_1',
            data: 'setting_1',
            label: 'Setting 1',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                setter: 'msCoa',
                getter: 'msCoa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'code',
                    display: ['name']
                  }
                }
              },
              update: false,
              filter: false
            }
          },
          // setting_2
          {
            id: 'setting_2',
            data: 'setting_2',
            label: 'Setting 2',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                setter: 'msCoa',
                getter: 'msCoa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'code',
                    display: ['name']
                  }
                }
              },
              update: false,
              filter: false
            }
          },
          // setting_3
          {
            id: 'setting_3',
            data: 'setting_3',
            label: 'Setting 3',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                setter: 'msCoa',
                getter: 'msCoa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'code',
                    display: ['name']
                  }
                }
              },
              update: false,
              filter: false
            }
          },
          // d_k
          {
            id: 'd_k',
            data: 'd_k',
            label: 'Kredit/Debit',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'radio',
                option: {
                  list_pointer: {
                    code: 'code',
                    label: 'label',
                    list: [
                      { code: 'd', label: 'Debit' },
                      { code: 'k', label: 'Kredit' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                option: {
                  list_pointer: {
                    code: 'code',
                    label: 'label',
                    list: [
                      { code: 'd', label: 'Debit' },
                      { code: 'k', label: 'Kredit' }
                    ]
                  }
                }
              },
              filter: false
            }
          },
          // remark
          {
            id: 'remark',
            data: 'remark',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: { transform: 'default' },
              detail: { transform: 'default' },
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
