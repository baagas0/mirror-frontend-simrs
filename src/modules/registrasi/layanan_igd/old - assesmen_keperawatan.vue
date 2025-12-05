<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:list-json_assesment_keperawatan_igd="data">
      <p v-for="(value, field, i) in data.rowData.json_assesment_keperawatan_igd" :key="field+i" class="pb-0 mb-0">
        <i class="ri-arrow-drop-right-fill"></i>
        {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
      </p>
    </template>
    <template v-slot:detail-json_assesment_keperawatan_igd="data">
      <p v-for="(value, field, i) in data.rowData.json_assesment_keperawatan_igd" :key="field+i" class="pb-0 mb-0">
        <i class="ri-arrow-drop-right-fill"></i>
        {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
      </p>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-assesmen_keperawatan',
  data () {
    return {
      config: {
        title: 'Daftar Asesmen Keperawatan IGD',
        model_api: 'assesmen_keperawatan',
        getter: 'assesment_keperawatan_igd',
        setter: 'assesment_keperawatan_igd',
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
          // judul_diagnosa
          {
            id: 'judul_diagnosa',
            data: 'judul_diagnosa',
            label: 'Judul Diagnosa',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
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
          // ms_diagnosa_id
          {
            id: 'ms_diagnosa_id',
            data: 'ms_diagnosa_id',
            label: 'Diagnosa',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_diagnosa' },
              detail: { view_data: 'nama_diagnosa' },
              create: {
                setter: 'ms_diagnosa',
                getter: 'ms_diagnosa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_diagnosa',
                    code: 'id',
                    display: ['nama_diagnosa']
                  }
                }
              },
              update: {
                setter: 'ms_diagnosa',
                getter: 'ms_diagnosa',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_diagnosa',
                    code: 'id',
                    display: ['nama_diagnosa']
                  }
                }
              },
              filter: true
            }
          },
          // json_assesment_keperawatan_igd
          {
            id: 'json_assesment_keperawatan_igd',
            data: 'json_assesment_keperawatan_igd',
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
