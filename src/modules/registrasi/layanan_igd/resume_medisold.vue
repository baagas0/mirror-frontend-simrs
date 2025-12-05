<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:list-json_resume_medis_igd="data">
      <p v-for="(value, field, i) in data.rowData.json_resume_medis_igd" :key="field+i" class="pb-0 mb-0">
        <i class="ri-arrow-drop-right-fill"></i>
        {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
      </p>
    </template>
    <template v-slot:detail-json_resume_medis_igd="data">
      <p v-for="(value, field, i) in data.rowData.json_resume_medis_igd" :key="field+i" class="pb-0 mb-0">
        <i class="ri-arrow-drop-right-fill"></i>
        {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
      </p>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-resume_medis',
  data () {
    return {
      config: {
        title: 'Daftar Resume Medis',
        model_api: 'resume_medis',
        getter: 'resume_medis_igd',
        setter: 'resume_medis_igd',
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
          // registrasi_id
          {
            id: 'registrasi_id',
            data: 'registrasi_id',
            label: 'Registrasi',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_lengkap' },
              detail: { view_data: 'nama_lengkap' },
              create: {
                setter: 'registrasi/listKunjunganIGDPerHalamanBypassUri',
                getter: 'registrasi/listKunjunganIGDPerHalamanBypassUri',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_lengkap',
                    code: 'registrasi_id',
                    display: ['nama_lengkap']
                  }
                }
              },
              update: {
                setter: 'registrasi/listKunjunganIGDPerHalamanBypassUri',
                getter: 'registrasi/listKunjunganIGDPerHalamanBypassUri',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_lengkap',
                    code: 'registrasi_id',
                    display: ['nama_lengkap']
                  }
                }
              },
              filter: true
            }
          },
          // validasi_dokter
          {
            id: 'validasi_dokter',
            data: 'validasi_dokter',
            label: 'Validasi Dokter',
            placeholder: null,
            methods: {
              list: {
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
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
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  }
                }
              },
              filter: false
            }
          },
          // json_resume_medis_igd
          {
            id: 'json_resume_medis_igd',
            data: 'json_resume_medis_igd',
            label: 'JSON ASSESMEN',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: { type: 'dynamic-json' },
              update: { type: 'dynamic-json' },
              filter: true
            }
          }
        ]
      }
    }
  }
}
</script>
