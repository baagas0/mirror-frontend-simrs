<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-golongan_obat',
  data() {
    return {
      config: {
        title: 'Daftar Golongan Obat',
        model_api: 'golongan_obat',
        getter: 'msGolonganBarang',
        setter: 'msGolonganBarang',
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
            label: 'Nama Golongan Obat',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_golongan_obat
          {
            id: 'nama_golongan_barang',
            data: 'nama_golongan_barang',
            label: 'Nama Golongan Obat',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
