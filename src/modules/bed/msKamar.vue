<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kamar',
  data() {
    return {
      config: {
        title: 'Daftar Kamar',
        model_api: 'kamar',
        getter: 'msKamar',
        setter: 'msKamar',
        pk_field: 'ms_kamar_id',
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
          // ms_kamar_id
          {
            id: 'ms_kamar_id',
            data: 'ms_kamar_id',
            label: 'ID Kamar',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_kamar
          {
            id: 'nama_kamar',
            data: 'nama_kamar',
            label: 'Nama Kamar',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // ms_ruang_id
          {
            id: 'ms_ruang_id',
            data: 'ms_ruang_id',
            label: 'Nama Ruang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_ruang' },
              detail: { view_data: 'nama_ruang' },
              create: {
                setter: 'msRuang',
                getter: 'msRuang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_ruang',
                    code: 'id',
                    display: ['nama_ruang']
                  }
                }
              },
              update: {
                setter: 'msRuang',
                getter: 'msRuang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_ruang',
                    code: 'id',
                    display: ['nama_ruang']
                  }
                }
              },
              filter: true
            }
          },
          // keterangan_kamar
          {
            id: 'keterangan_kamar',
            data: 'keterangan_kamar',
            label: 'Keterangan Kamar',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
        ]
      }
    }
  }
}
</script>
