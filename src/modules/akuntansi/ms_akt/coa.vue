<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-coa',
  data () {
    return {
      config: {
        title: 'Daftar Coa',
        model_api: 'msCoa',
        getter: 'msCoa',
        setter: 'msCoa',
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
          // level
          {
            id: 'level',
            data: 'level',
            label: 'Level',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                'type': 'radio',
                option: {
                  list_pointer: {
                    disable_revert: true,
                    code: 'code',
                    label: 'label',
                    list: [
                      { code: '1', label: 'Level 1' },
                      { code: '2', label: 'Level 2' },
                      { code: '3', label: 'Level 3' },
                      { code: '4', label: 'Level 4' }
                    ]
                  },
                  toggle_field: [
                    { id: 'parent_code', item: 'show', toggle: [true, false], value: ['2', '3', '4'] }
                  ]
                }
              },
              update: { type: 'number' },
              filter: false
            }
          },
          // parent_code
          {
            id: 'parent_code',
            data: 'parent_code',
            label: 'Kode Induk',
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
                  },
                  assign_value: [
                    { 'id': 'code', 'key': 'code', setThisValue: true }
                  ]
                }
              },
              update: {
                setter: 'msCoa',
                getter: 'msCoa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'code',
                    display: ['name']
                  },
                  assign_value: [
                    { 'id': 'code', 'key': 'code', setThisValue: true }
                  ]
                }
              },
              filter: false
            }
          },
          // code
          {
            id: 'code',
            data: 'code',
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
          // saldo_awal
          {
            id: 'saldo_awal',
            data: 'saldo_awal',
            label: 'Saldo Awal',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: { type: 'money' },
              update: { type: 'money' },
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
