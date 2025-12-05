<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-lab_paket',
  data() {
    return {
      tesAsyncData: {},
      config: {
        title: 'Daftar Lab Paket',
        model_api: 'lab_paket',
        getter: 'lab_paket',
        setter: 'lab_paket',
        pk_field: 'id_lab_paket',
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
          // id_lab_paket
          {
            id: 'id_lab_paket',
            data: 'id_lab_paket',
            label: 'ID Lab Paket',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_lab_paket
          {
            id: 'nama_lab_paket',
            data: 'nama_lab_paket',
            label: 'Nama Lab Paket',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'kode_loinc',
            data: 'kode_loinc',
            label: 'Kode LOINC',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'kode_kptl',
            data: 'kode_kptl',
            label: 'Kode KPTL',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_lab_paket
          {
            id: 'keterangan_lab_paket',
            data: 'keterangan_lab_paket',
            label: 'Keterangan Lab Paket',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // status_lab_paket
          // {
          //   id: 'status_lab_paket',
          //   data: 'status_lab_paket',
          //   label: 'Status',
          //   placeholder: null,
          //   methods: {
          //     list: {
          //       class: { false: 'badge badge-danger', true: 'badge badge-primary' },
          //       transform: 'active'
          //     },
          //     detail: {
          //       class: { false: 'badge badge-danger', true: 'badge badge-primary' },
          //       transform: 'active'
          //     },
          //     create: {
          //       type: 'radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Aktif', code: true },
          //             { label: 'Non Aktif', code: false }
          //           ]
          //         }
          //       }
          //     },
          //     update: {
          //       type: 'radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Aktif', code: true },
          //             { label: 'Non Aktif', code: false }
          //           ]
          //         }
          //       }
          //     },
          //     filter: false
          //   }
          // },
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
  //     return this.$_api.list('lab_paket', {}).then((res) => {
  //       return res
  //     })
  //   }
  // }
}
</script>
