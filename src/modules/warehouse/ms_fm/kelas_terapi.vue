<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kelas_terapi',
  data() {
    return {
      config: {
        title: 'Daftar Kelas Terapi',
        model_api: 'kelas_terapi',
        getter: 'msKelasTerapi',
        setter: 'msKelasTerapi',
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
            label: 'Nama Kelas Terapi',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_kelas_terapi
          {
            id: 'nama_kelas_terapi',
            data: 'nama_kelas_terapi',
            label: 'Nama Kelas Terapi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },

          // tipe_kelas_terapi
          // {
          //   id: 'tipe_kelas_terapi',
          //   data: 'tipe_kelas_terapi',
          //   label: 'Tipe Kelas Terapi',
          //   placeholder: null,
          //   methods: {
          //     list: {
          //       class: { 'true': 'badge badge-danger', 'false': 'badge badge-primary' },
          //       transform: 'yn'
          //     },
          //     detail: {
          //       class: { 'true': 'badge badge-danger', 'false': 'badge badge-primary' },
          //       transform: 'yn'
          //     },
          //     create: {
          //       type: 'radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Ya', code: 'true' },
          //             { label: 'Tidak', code: 'false' }
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
          //             { label: 'Ya', code: 'true' },
          //             { label: 'Tidak', code: 'false' }
          //           ]
          //         }
          //       }
          //     },
          //     filter: true
          //   }
          // },
          // is_utama
          // {
          //   id: 'is_utama',
          //   data: 'is_utama',
          //   label: 'Jenis Kelas Terapi',
          //   placeholder: null,
          //   methods: {
          //     list: { tranform: 'primaryNm' },
          //     detail: { tranform: 'primaryNm' },
          //     create: {
          //       type: 'radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Utama', code: '0' },
          //             { label: 'Bukan', code: '1' }
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
          //             { label: 'Utama', code: '0' },
          //             { label: 'Bukan', code: '1' }
          //           ]
          //         }
          //       }
          //     },
          //     filter: false
          //   }
          // }
          {
            id: 'is_narkotik',
            data: 'is_narkotik',
            label: 'Narkotik',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                validation: ['required'],
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  }
                }
              },
              update: {
                validation: ['required'],
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  }
                }
              },
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
<!-- 
{
  setter: 'menu',
  getter: 'menu',
  type: 'lookup-radio',
  validation: ['required'],
  option: {
    list_pointer: {
      label: 'name',
      code: 'code',
      display: ['name']
    }
  }
} -->