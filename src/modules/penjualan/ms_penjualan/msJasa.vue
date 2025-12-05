<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jasa',
  data() {
    return {
      config: {
        title: 'Daftar Jasa',
        model_api: 'jenis_jasa',
        getter: 'msJasa',
        setter: 'msJasa',
        pk_field: 'ms_jasa_id',
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
            label: 'Nama Jasa',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jasa
          {
            id: 'nama_jasa',
            data: 'nama_jasa',
            label: 'Nama  Jasa',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // ms_jenis_jasa_id
          {
            id: 'ms_jenis_jasa_id',
            data: 'ms_jenis_jasa_id',
            label: 'Nama Jenis Jasa',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jenis_jasa' },
              detail: { view_data: 'nama_jenis_jasa' },
              create: {
                setter: 'msJenisJasa',
                getter: 'msJenisJasa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_jenis_jasa',
                    code: 'id',
                    display: ['nama_jenis_jasa']
                  }
                }
              },
              update: {
                setter: 'msJenisJasa',
                getter: 'msJenisJasa',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_jasa',
                    code: 'id',
                    display: ['nama_jenis_jasa']
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
