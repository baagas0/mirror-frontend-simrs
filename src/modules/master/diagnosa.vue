<template lang="">
  <tas-base-crud :config="config" :hideFilter="hideFilter" :filterView="filterView" :hideGlobalSearch="true"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-diagnosa',
  data() {
    return {
      config: {
        title: 'Daftar Diagnosa',
        model_api: 'diagnosa',
        getter: 'ms_diagnosa',
        setter: 'ms_diagnosa',
        pk_field: null,
        export: true,
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
            placeholder: null,
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
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // non_spesialis
          {
            id: 'non_spesialis',
            data: 'non_spesialis',
            label: 'Non Spesialis',
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
          },
          // is_bpjs
          {
            id: 'is_bpjs',
            data: 'is_bpjs',
            label: 'BPJS',
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
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ],
                  }
                }
              },
              update: false,
              filter: false
            }
          },
          // keterangan_diagnosa
          {
            id: 'keterangan_diagnosa',
            data: 'keterangan_diagnosa',
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
      },
      hideFilter: false,
      filterView: true
    }
  }
}
</script>
