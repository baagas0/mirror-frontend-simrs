<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kas',
  data() {
    return {
      config: {
        title: 'Daftar kas',
        model_api: 'kas',
        getter: 'kas',
        setter: 'kas',
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
          // coa_code
          {
            id: 'coa_code',
            data: 'coa_code',
            label: 'Kode COA',
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
                    { 'id': 'name', 'key': 'name' }
                  ]
                }
              },
              update: false,
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
          // no_rek
          {
            id: 'no_rek',
            data: 'no_rek',
            label: 'Rekening',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // contact_person
          {
            id: 'contact_person',
            data: 'contact_person',
            label: 'Kontak',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // telp
          {
            id: 'telp',
            data: 'telp',
            label: 'Telpon',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // hp
          {
            id: 'hp',
            data: 'hp',
            label: 'HP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
