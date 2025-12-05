<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-penunjang',
  data() {
    return {
      tesAsyncData: {},
      config: {
        title: 'Daftar Penunjang',
        model_api: 'penunjang',
        getter: 'penunjang',
        setter: 'penunjang',
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
          // id_penunjang
          {
            id: 'id_penunjang',
            data: 'id_penunjang',
            label: 'Nama Penunjang',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // jenis_penunjang_id
          {
            id: 'jenis_penunjang_id',
            data: 'jenis_penunjang_id',
            label: 'Jenis Penunjang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jenis_penunjang' },
              detail: { view_data: 'nama_jenis_penunjang' },
              create: {
                setter: 'jenis_penunjang',
                getter: 'jenis_penunjang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_jenis_penunjang',
                    code: 'id',
                    display: ['nama_jenis_penunjang', 'keterangan_jenis_penunjang']
                  }
                }
              },
              update: {
                setter: 'jenis_penunjang',
                getter: 'jenis_penunjang',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_penunjang',
                    code: 'id',
                    display: ['nama_jenis_penunjang', 'keterangan_jenis_penunjang']
                  }
                }
              },
              filter: true
            }
          },
          // tarif_cbg_id
          {
            id: 'tarif_cbg_id',
            data: 'tarif_cbg_id',
            label: 'Tarif CBG',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_tarif' },
              detail: { view_data: 'nama_tarif' },
              create: {
                setter: 'msTarif',
                getter: 'msTarif',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_tarif',
                    code: 'id',
                    display: ['nama_tarif', 'keterangan']
                  }
                }
              },
              update: {
                setter: 'msTarif',
                getter: 'msTarif',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_tarif',
                    code: 'id',
                    display: ['nama_tarif', 'keterangan']
                  }
                }
              },
              filter: true
            }
          },
          // nama_penunjang
          {
            id: 'nama_penunjang',
            data: 'nama_penunjang',
            label: 'Nama Penunjang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // parameter_normal
          {
            id: 'parameter_normal',
            data: 'parameter_normal',
            label: 'Parameter Normal',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // satuan
          {
            id: 'satuan',
            data: 'satuan',
            label: 'Satuan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_penunjang
          {
            id: 'keterangan_penunjang',
            data: 'keterangan_penunjang',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: true
            }
          },
          // status_penunjang
          {
            id: 'status_penunjang',
            data: 'status_penunjang',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: true },
                      { label: 'Non Aktif', code: false }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: true },
                      { label: 'Non Aktif', code: false }
                    ]
                  }
                }
              },
              filter: false
            }
          },
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
  //     return this.$_api.list('penunjang', {}).then((res) => {
  //       return res
  //     })
  //   }
  // }
}
</script>
