<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis_penunjang',
  data() {
    return {
      tesAsyncData: {},
      config: {
        title: 'Daftar Jenis Penunjang',
        model_api: 'jenis_penunjang',
        getter: 'jenis_penunjang',
        setter: 'jenis_penunjang',
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
          // id_jenis_penunjang
          {
            id: 'id_jenis_penunjang',
            data: 'id_jenis_penunjang',
            label: 'ID Jenis Penunjang',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jenis_penunjang
          {
            id: 'nama_jenis_penunjang',
            data: 'nama_jenis_penunjang',
            label: 'Nama Jenis Penunjang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validations: ['required'] },
              update: { validations: ['required'] },
              filter: true
            }
          },
          // keterangan_jenis_penunjang
          {
            id: 'keterangan_jenis_penunjang',
            data: 'keterangan_jenis_penunjang',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: true
            }
          }
        ]
      }
    }
  },
  // mounted () {
  //   console.log('BEFORE 1')
  //   setTimeout(async () => {
  //     console.log('BEFORE 2')
  //     let xx = await this.tesAsync()
  //     console.log('AFER 1')
  //     console.log(xx)
  //   }, 3000);
  // },
  // methods: {
  //   async tesAsync () {
  //     console.log('INIT')
  //     return this.$_api.list('jenis_penunjang', {}).then((res) => {
  //       return res
  //     })
  //   }
  // }
}
</script>
