<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-dform_triage_options',
  data () {
    return {
      config: {
        title: 'Dynamic form option triage',
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
