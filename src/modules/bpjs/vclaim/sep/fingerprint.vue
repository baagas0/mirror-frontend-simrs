<template lang="">
  <div class="d-flex flex-column w-100">
    <tas-base-crud :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" />
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'vclaim-sep-fingerprint',
  data() {
    return {
      config: {
        title: 'Fingerprint',
        model_api: 'fingerprint',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/sep/getFingerPrintBypassUri',
        },
        frontendPaginate: false,
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        optionalProps: {
          isNotifiedGet: true,
        },
        slave: [
        ],
        fields: [
          // tglPelayanan
          {
            id: 'tanggal',
            data: 'tanggal',
            label: 'Tanggal Pelayanan',
            placeholder: 'Pilih Tanggal Pelayanan',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                type: 'date',
                validation: ['required'],
                value: moment().format('YYYY-MM-DD'),
              }
            }
          },
          {
            id: 'noKartu',
            data: 'noKartu',
            label: 'No Kartu',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                validation: ['required'],
              }
            }
          },
          {
            id: 'status',
            data: 'status',
            label: 'Status',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'user',
            data: 'user',
            label: 'user',
            placeholder: null,
            value: 'cccccc',
            methods: {
              list: {
                type: 'text',
                value: 'abcadasdasd'
              },
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      filterView: true,
      hideFilter: false,
    }
  },
  methods: {
  }
}
</script>