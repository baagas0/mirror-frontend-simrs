<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:detail-footer="data">
      <mapping-input v-if="data.rowData" :title="mappingRole.title" :getter="mappingRole.getter" :setter="mappingRole.setter" :params="{ 'user_id': data.rowData.id }" :readonly="mappingRole.readonly" :display="mappingRole.display" :setter_id="mappingRole.setter_id" :key_value="mappingRole.key_value" />
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-user',
  data () {
    return {
      config: {
        title: 'Daftar Pengguna',
        model_api: 'user',
        getter: 'users',
        setter: 'users',
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
            label: 'Nama Pengguna',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // username
          {
            id: 'username',
            data: 'username',
            label: 'Nama Pengguna',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // password
          {
            id: 'password',
            data: 'password',
            label: 'Kata Sandi',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: { type: 'password' },
              update: { type: 'password' },
              filter: false
            }
          }
        ]
      },
      mappingRole: {
          title: 'Hak Akses Pengguna',
          getter: 'users/mappingRoleUser',
          setter: 'users/mappingRoleUser',
          display: ['name'],
          key_value: 'active',
          setter_id: 'role_id',
          readonly: false
      }
    }
  }
}
</script>
