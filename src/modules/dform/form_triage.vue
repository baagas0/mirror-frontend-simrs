<template>
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h3 for="">Form Triage</h3>
        </div>
        <div class="card-body">
          <tas-base-form-custom :field="res" v-model="v"></tas-base-form-custom>
        </div>

        <pre>{{ v }}</pre>
      </div>

    </div>
</template>

<script>

export default {
  name: 'form_triage_test',
  data () {
    return {
      configAPI: {
        submit: 'registrasi/rawat_inap'
      },
      result: {},
      v: {},
      vFinal: {},
      res: [
        {
          position: 'root',
          id: 'detail',
          child: [
            {
              position: 'field',
              id: 'id_asuransi',
              label: 'asuransi',
              type: 'lookup-radio',
              api: 'msAsuransi',
              option: {
                list_pointer: {
                  label: 'nama_asuransi',
                  code: 'id',
                  display: ['nama_asuransi']
                }
              }
              // value: ''
            },
            {
              position: 'field',
              id: 'date',
              label: 'Tangal',
              type: 'date'
              // value: ''
            },
            {
              position: 'root',
              id: 'parent',
              child: [
                {
                  position: 'field',
                  id: 'parent_name',
                  label: 'Nama Orang Tua',
                  type: 'text'
                },
                {
                  position: 'field',
                  id: 'parent_address',
                  label: 'Alamat Orang Tua',
                  type: 'text'
                }
              ]
            }
          ]
        }
      ],
      fields: [
      ]
    }
  },
  computed: {
  },
  mounted () {
    this.fields.push({
      position: 'root',
      id: 'name',
      data: 'name',
      show: true,
      class: 'col-3',
      attr: null,
      disabled: false,
      value: null,
      label: 'nama',
      permission: 'template-allow-all',
      placeholder: 'Isikan nama',
      type: 'text',
      validation: ['required']
    })
  },
  methods: {
    onSuccessForm (formType, data) {
      this.result = data
    }
  }
}
</script>
