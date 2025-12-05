<template lang="">
  <tas-base-crud :config="config">
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-dform_triage',
  data () {
    return {
      config: {
        title: 'Dynamic form triage',
        model_api: 'dform_triage',
        getter: 'dform_triage',
        setter: 'dform_triage',
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
          {
            name: 'Daftar Option',
            module: 'dform/triage_options',
            as_param: 'dform_triage_id',
            key_field: 'id',
            overwrite: {
              fields: [
                { rule: '1.methods.list', value: false },
                { rule: '1.methods.filter', value: false }
              ]
            }
          }
        ],
        fields: [
          // id_dform_triage
          {
            id: 'id_dform_triage',
            data: 'id_dform_triage',
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
          // position
          {
            id: 'position',
            data: 'position',
            label: 'Posisi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'radio',
                value: 'field',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Root', code: 'root' },
                      { label: 'Field', code: 'field' }
                    ]
                  },
                  toggle_field: [
                    { id: 'parent_id', item: 'show', toggle: [true, false], value: 'root' },
                  ]
                }
              },
              update: {
                type: 'radio',
                value: 'field',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Root', code: 'root' },
                      { label: 'Field', code: 'field' }
                    ]
                  },
                  toggle_field: [
                    { id: 'parent_id', item: 'show', toggle: [true, false], value: 'root' },
                  ]
                }
              },
              filter: true
            }
          },
          // parent_id
          {
            id: 'parent_id',
            data: 'parent_id',
            label: 'Induk',
            placeholder: null,
            methods: {
              list: { transform: 'default' },
              detail: { transform: 'default' },
              create: {
                type: 'lookup-radio',
                setter: 'dform_triage',
                getter: 'dform_triage',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'id',
                    display: ['label']
                  }
                }
              },
              update: {
                type: 'lookup-radio',
                setter: 'dform_triage',
                getter: 'dform_triage',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'id',
                    display: ['label']
                  }
                }
              },
              filter: false
            }
          },
          // required
          {
            id: 'required',
            data: 'required',
            label: 'Required',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: '1' },
                      { label: 'Tidak', code: '0' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: '1' },
                      { label: 'Tidak', code: '0' }
                    ]
                  }
                }
              },
              filter: true
            }
          },
          // show
          {
            id: 'show',
            data: 'show',
            label: 'Tampil',
            placeholder: null,
            methods: {
              list: { transform: 'ynBool' },
              detail: { transform: 'ynBool' },
              create: {
                type: 'radio',
                value: true,
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
                type: 'radio',
                value: '1',
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
              filter: true
            }
          },
          // class_dform_triage
          {
            id: 'class_dform_triage',
            data: 'class_dform_triage',
            label: 'Lebar',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'radio',
                value: 'col-md-12',
                option: {
                  list_pointer: {
                    value: 'col-md-12',
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: '100%', code: 'col-md-12' },
                      { label: '75%', code: 'col-md-9' },
                      { label: '50%', code: 'col-md-6' },
                      { label: '25%', code: 'col-md-3' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                value: 'col-md-12',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: '100%', code: 'col-md-12' },
                      { label: '75%', code: 'col-md-9' },
                      { label: '50%', code: 'col-md-6' },
                      { label: '25%', code: 'col-md-3' }
                    ]
                  }
                }
              },
              filter: true
            }
          },
          // label
          {
            id: 'label',
            data: 'label',
            label: 'Label',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // placeholder
          {
            id: 'placeholder',
            data: 'placeholder',
            label: 'Placeholder',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // value
          {
            id: 'value',
            data: 'value',
            label: 'Nilai Default',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // key
          {
            id: 'key',
            data: 'key',
            label: 'Kunci Objek',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // type_dform_triage
          {
            id: 'type_dform_triage',
            data: 'type_dform_triage',
            label: 'Tipe Form',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Input', code: 'text' },
                      { label: 'Mata Uang', code: 'money' },
                      { label: 'Angka', code: 'number' },
                      { label: 'Tanggal', code: 'date' },
                      { label: 'Text Panjang', code: 'textarea' },
                      { label: 'Lookup Modal', code: 'lookup-radio' },
                      { label: 'Select', code: 'select' },
                      { label: 'Radio', code: 'radio' }
                    ]
                  },
                  toggle_field: [
                    { id: 'api_options', item: 'show', toggle: [true, false], value: ['lookup-radio', 'select', 'radio'] }
                  ]
                }
              },
              update: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Input', code: 'text' },
                      { label: 'Mata Uang', code: 'money' },
                      { label: 'Angka', code: 'number' },
                      { label: 'Tanggal', code: 'date' },
                      { label: 'Text Panjang', code: 'textarea' },
                      { label: 'Lookup Modal', code: 'lookup-radio' },
                      { label: 'Select', code: 'select' },
                      { label: 'Radio', code: 'radio' }
                    ]
                  },
                  toggle_field: [
                    { id: 'api_options', item: 'show', toggle: [true, false], value: 'lookup-radio' },
                  ]
                }
              },
              filter: true
            }
          },
          // api_options
          {
            id: 'api_options',
            data: 'api_options',
            label: 'Sumber Api',
            hint: 'Apakah data source dari api atau statik?',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                // value: '0',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  },
                  toggle_field: [
                    { id: 'getter', item: 'show', toggle: [true, false], value: true },
                  ]
                }
              },
              update: {
                type: 'radio',
                // value: '0',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  },
                  toggle_field: [
                    { id: 'getter', item: 'show', toggle: [true, false], value: true },
                  ]
                }
              },
              filter: true
            }
          },
          // getter
          {
            id: 'getter',
            data: 'getter',
            label: 'URI Getter',
            hint: 'url endpoint (msAsuransi)',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // lock
          {
            id: 'lock',
            data: 'lock',
            label: 'Kunci Form',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: false,
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
                type: 'radio',
                value: false,
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
              filter: true
            }
          },
          // urutan
          {
            id: 'urutan',
            data: 'urutan',
            label: 'Urutan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'number', value: 1 },
              update: { type: 'number', value: 1 },
              filter: true
            }
          },
          // keterangan
          {
            id: 'keterangan',
            data: 'keterangan',
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
          // is_array
          {
            id: 'is_array',
            data: 'is_array',
            label: 'Tipe Data Array',
            hint: 'Apakah tipe data array',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: '0',
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
                type: 'radio',
                value: '0',
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
              filter: true
            }
          }
        ]
      },
      configOptions: {
        title: 'Dynamic form triage',
        model_api: 'dform_triage_options',
        getter: 'dform_triage_options',
        setter: 'dform_triage_options',
        pk_field: null,
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
          // dform_triage_id
          {
            id: 'dform_triage_id',
            data: 'dform_triage_id',
            label: 'Form',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'lookup-radio',
                setter: 'dform_triage',
                getter: 'dform_triage',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'id',
                    display: ['label']
                  }
                }
              },
              update: {
                type: 'lookup-radio',
                setter: 'dform_triage',
                getter: 'dform_triage',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'id',
                    display: ['label']
                  }
                }
              },
              filter: false
            }
          },
          // label_options
          {
            id: 'label_options',
            data: 'label_options',
            label: 'Label',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // code_options
          {
            id: 'code_options',
            data: 'code_options',
            label: 'Kode',
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
