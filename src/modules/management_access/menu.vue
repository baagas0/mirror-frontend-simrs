<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-menu',
  data () {
    return {
      config: {
        title: 'Daftar Menu',
        model_api: 'menu',
        getter: 'menu',
        setter: 'menu',
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
          // parent_code
          {
            id: 'parent_code',
            data: 'parent_code',
            label: 'Kode Induk',
            placeholder: null,
            methods: {
              list: { transform: 'default' },
              detail: true,
              create: {
                setter: 'menu',
                getter: 'menu',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'code',
                    display: ['name', 'route']
                  },
                  assign_value: [
                    { 'id': 'code', 'key': 'code', setThisValue: true, appendText: '_' },
                    { 'id': 'route', 'key': 'route', setThisValue: true, appendText: '/' }
                  ]
                }
              },
              update: {
                setter: 'menu',
                getter: 'menu',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'code',
                    display: ['name', 'route']
                  },
                  assign_value: [
                    { 'id': 'code', 'key': 'code', setThisValue: true, appendText: '_' },
                    { 'id': 'route', 'key': 'route', setThisValue: true, appendText: '/' }
                  ]
                }
              },
              filter: true
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
              create: { type: 'text' }, update: true, filter: true }
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
              create: { type: 'text' }, update: true, filter: true }
          },
          // type
          {
            id: 'type',
            data: 'type',
            label: 'Tipe',
            placeholder: null,
            methods: {
              // 1 parent menu
              // 2 menu
              // 3 function
              list: {
                class: { 1: 'badge badge-danger', 2: 'badge badge-primary', 3: 'badge badge-warning' },
                transform: 'menu_type'
              },
              detail: true,
              create: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Menu Induk', code: '1' },
                      { label: 'Menu', code: '2' },
                      { label: 'Function', code: '3' }
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
                      { label: 'Menu Induk', code: '1' },
                      { label: 'Menu', code: '2' },
                      { label: 'Function', code: '3' }
                    ]
                  }
                }
              },
              filter: true
            }
          },
          // route
          {
            id: 'route',
            data: 'route',
            label: 'Route',
            placeholder: null,
            methods: { list: true, detail: true, create: true, update: true, filter: true }
          },
          // sequence
          {
            id: 'seq',
            data: 'seq',
            label: 'Sequence',
            placeholder: null,
            methods: { list: true, detail: true, create: true, update: true, filter: true }
          }
        ]
      }
    }
  }
}
</script>
