<template>
  <tas-base-crud :config="config" hide-filter>
    <template v-slot:list-table-action="data">
      <a v-if="data.rowData && $_sys.isAllowed('reset-password-default')" @click="changeUserPassword(data.rowData)" class="btn btn-icon btn-warning btn-sm" v-b-tooltip.viewport="'Reset Password pengguna'"> <i class="ri-key-fill"></i> </a>
    </template>
    <!-- <template v-slot:detail-footer="data" v-if="$_sys.isAllowed('update-mapping-users-equipment-inspections')">
      <template v-if="data.rowData">
        <mapping-input v-if="data.rowData.data_role_id.filter(x=> x.id === 104).length" :title="mappingInspection.title" :getter="mappingInspection.getter" :setter="mappingInspection.setter" :params="{ 'user_id': data.rowData.id }" :readonly="mappingInspection.readonly" :display="mappingInspection.display" :setter_id="mappingInspection.setter_id" :key_value="mappingInspection.key_value" />
      </template>
    </template> -->
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-users',
  data () {
    return {
      config: {
        title: 'Daftar Pengguna',
        model_api: 'users',
        getter: 'users',
        setter: 'users',
        pk_field: 'fullname',
        export: true,
        permission: {
          create: 'create-users',
          read: 'view-users',
          update: 'update-users',
          delete: 'delete-users'
        },
        fields: [
          { id: 'password', label: 'Password', methods: { list: false, detail: false, create: true, update: false, filter: false } },
          {
            id: 'role_id',
            label: 'Role',
            methods: {
              create: {
                setter: 'roles',
                getter: 'roles',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  },
                  toggle_field: [
                    { id: 'project_id', item: 'show', toggle: [true, false], value: 3 }
                  ]
                }
              },
              update: {
                setter: 'roles',
                getter: 'roles',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'role_name', code: 'id', display: ['role_name']
                  },
                  toggle_field: [
                    { id: 'project_id', item: 'show', toggle: [true, false], value: 3 }
                  ]
                }
              },
              filter: false,
              list: {
                class: 'min-w-250px',
                order: false
              },
              detail: true
            }
          },
          // disabled Temp Field
          {
            id: 'fullname',
            label: 'Nama Lengkap',
            methods: {
              list: {
                type: ['file', 'text'],
                order: [false, true],
                view_data: ['img_photo_user.url', 'fullname'],
                class: ['mr-2', 'col p-0'],
                transform: []
              },
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          { id: 'email', label: 'Email', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          {
            id: 'img_photo_user',
            label: 'Foto Pengguna',
            methods: {
              list: false,
              detail: { view_data: 'img_photo_user.url', type: 'link' },
              create: { type: 'file', attr: [{ accept: 'image/*,application/pdf' }, { limit: 5, max: 5 }] },
              update: { type: 'file', attr: [{ accept: 'image/*,application/pdf' }, { limit: 5, max: 5 }] },
              filter: false
            }
          },
          {
            id: 'project_id',
            label: 'Proyek',
            methods: {
              create: {
                show: false,
                validation: ['required'],
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'project_name', code: 'id', display: ['project_number', 'project_name']
                  }
                }
              },
              update: {
                show: false,
                validation: ['required'],
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'project_name', code: 'id', display: ['project_number', 'project_name']
                  }
                }
              },
              filter: {
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'project_name', code: 'id', display: ['project_number', 'project_name']
                  }
                }
              }
            }
          },
          { id: 'job_position', label: 'Jabatan', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          // { id: 'username', label: 'Username', methods: { list: true, detail: true, create: false, update: false, filter: false } },
          // disabled Field
          { id: 'status_code', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'email_verified_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'last_login_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'approval_at', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'approval_by', methods: { list: false, detail: false, create: false, update: false, filter: false } }
        ]
      },
      mappingInspection: {
        title: 'Jenis Inspeksi',
        getter: 'custom/mapping-users-equipment-inspection',
        setter: 'custom/mapping-users-equipment-inspection',
        display: ['equipment_type_name', 'rel_equipment_category_id'],
        key_value: 'active',
        setter_id: 'equipment_type_id',
        readonly: false
      }
    }
  },
  methods: {
    changeUserPassword (e) {
      this.$_alert.confirm('Reset Password Pengguna', 'Password Pengguna ini akan diubah ke 123456 , lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api.post('auth/reset-password-default', e).then(res => {
            this.$_alert.success(null, res.message)
            this.$children[0].$children[1].getData(null)
          }).catch((err) => {
            this.$_alert.error(err)
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
