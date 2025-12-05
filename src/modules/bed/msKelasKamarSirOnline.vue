<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kelas_kamar_sironline',
  data () {
    return {
      config: {
        title: 'Daftar Kelas Kamar Sir Online',
        model_api: 'kelas_kamar_sironline',
        getter: 'msKelasKamarSirOnline',
        setter: 'msKelasKamarSirOnline',
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
            label: 'ID Kelas Kamar Sir Online',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_kelas_kamar_sironline
          {
            id: 'nama_kelas_kamar_sironline',
            data: 'nama_kelas_kamar_sironline',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_bridging_sirs
          {
            id: 'kode_bridging_sirs',
            data: 'kode_bridging_sirs',
            label: 'Kode Bridging',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_kamar_sironline
          {
            id: 'keterangan_kamar_sironline',
            data: 'keterangan_kamar_sironline',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
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
