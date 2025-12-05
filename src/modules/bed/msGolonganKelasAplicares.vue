<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-golongan_kelas_aplicares',
  data() {
    return {
      config: {
        title: 'Daftar Golongan Kelas Aplicares',
        model_api: 'golongan_kelas_aplicares',
        getter: 'msGolonganKelasAplicares',
        setter: 'msGolonganKelasAplicares',
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
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_golongan_kelas_applicares
          {
            id: 'nama_golongan_kelas_applicares',
            data: 'nama_golongan_kelas_applicares',
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
          // kode_ruang
          {
            id: 'kode_ruang',
            data: 'kode_ruang',
            label: 'Kode Ruang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_bridging
          {
            id: 'kode_bridging',
            data: 'kode_bridging',
            label: 'Kode Briding',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_golongan_kelas_applicares
          {
            id: 'keterangan_golongan_kelas_applicares',
            data: 'keterangan_golongan_kelas_applicares',
            label: 'Keterangan Golongan Kelas Applicares',
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
