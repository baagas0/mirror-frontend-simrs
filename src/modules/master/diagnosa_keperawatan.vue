<template lang="">
  <tas-base-crud ref="crud-diagnosa_keperawatan" :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" />
</template>

<script>
export default {
  name: 'crud-diagnosa_keperawatan',
  data() {
    return {
      config: {
        title: 'Daftar Diagnosa Keperawatan',
        model_api: 'diagnosa_keperawatan',
        getter: 'diagnosa_keperawatan',
        setter: 'diagnosa_keperawatan',
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
          // id_diagnosa
          {
            id: 'id_diagnosa',
            data: 'id_diagnosa',
            label: 'Nama Diagnosa',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_diagnosa
          {
            id: 'nama_diagnosa',
            data: 'nama_diagnosa',
            label: 'Nama Diagnosa',
            placeholder: 'Ketik Nama Diagnosa',
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // kode_diagnosa
          {
            id: 'kode_diagnosa',
            data: 'kode_diagnosa',
            label: 'Kode Diagnosa',
            placeholder: 'Ketik Kode Diagnosa',
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          }
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,
    }
  },
}
</script>
