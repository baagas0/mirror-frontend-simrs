<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:list-json_assesment_medis_igd="data">
      <p v-for="(value, field, i) in data.rowData.json_assesment_medis_igd" :key="field+i" class="pb-0 mb-0">
        <i class="ri-arrow-drop-right-fill"></i>
        {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
      </p>
    </template>
    <template v-slot:detail-json_assesment_medis_igd="data">
      <p v-for="(value, field, i) in data.rowData.json_assesment_medis_igd" :key="field+i" class="pb-0 mb-0">
        <i class="ri-arrow-drop-right-fill"></i>
        {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
      </p>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-assesmen_medis',
  data () {
    return {
      config: {
        title: 'Daftar Asesmen Medis',
        model_api: 'assesmen_medis',
        getter: 'assesment_medis_igd',
        setter: 'assesment_medis_igd',
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
          // json_assesment_medis_igd
          {
            id: 'json_assesment_medis_igd',
            data: 'json_assesment_medis_igd',
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
