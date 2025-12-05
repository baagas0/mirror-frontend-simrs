<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-specialist',
  data() {
    return {
      config: {
        title: 'Daftar Specialist',
        model_api: 'specialist',
        getter: 'msSpecialist',
        setter: 'msSpecialist',
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
          // nama_specialist
          {
            id: 'nama_specialist',
            data: 'nama_specialist',
            label: 'Nama Specialist',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_specialist
          {
            id: 'kode_specialist',
            data: 'kode_specialist',
            label: 'Kode Specialist',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          }
        ]
      }
    }
  }
}
</script>
