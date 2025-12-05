<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-bank',
  data() {
    return {
      tesAsyncData: {},
      config: {
        title: 'Daftar Bank',
        model_api: 'bank',
        getter: 'msBank',
        setter: 'msBank',
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
          // id_bank
          {
            id: 'id_bank',
            data: 'id_bank',
            label: 'Nama Bank',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_bank
          {
            id: 'nama_bank',
            data: 'nama_bank',
            label: 'Nama Bank',
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
  //     return this.$_api.list('bank', {}).then((res) => {
  //       return res
  //     })
  //   }
  // }
}
</script>
