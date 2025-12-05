<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:detail-footer="data">
      <mapping-input v-if="data.rowData" :title="mappingRole.title" :getter="mappingRole.getter" :setter="mappingRole.setter" :params="{ 'role_id': data.rowData.id }" :readonly="mappingRole.readonly" :display="mappingRole.display" :setter_id="mappingRole.setter_id" :key_value="mappingRole.key_value" />
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-role',
  data () {
    return {
      config: {
        title: 'Daftar Role',
        model_api: 'role',
        getter: 'roles',
        setter: 'roles',
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
            label: 'Nama Role',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // name
          {
            id: 'name',
            data: 'name',
            label: 'Nama Role',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          }
        ],
      },
      mappingRole: {
          title: 'Hak Akses Menu',
          getter: 'roles/mappingRoleMenu',
          setter: 'roles/mappingRoleMenu',
          display: ['code', 'name', 'route'],
          key_value: 'active',
          setter_id: 'menu_id',
          readonly: false
      }
    }
  }
}
</script>
