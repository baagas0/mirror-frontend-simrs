<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:list-tgl_mulai="rowData">
        {{ formatTranslatedDate(rowData.rowData.tgl_mulai) }}
    </template>
    <template v-slot:list-tgl_selesai="rowData">
        {{ rowData.rowData.tgl_selesai ? formatTranslatedDate(rowData.rowData.tgl_selesai) : '-' }}
    </template>
  </tas-base-crud>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'crud-history_bed',
  data () {
    return {
      config: {
        title: 'History Bed',
        model_api: 'history_bed',
        getter: 'historyBed',
        setter: 'historyBed',
        pk_field: null,
        frontendPaginate: false,
        export: true,
        permission: {
          create: false,
          read: 'template-allow-all',
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // id
          {
            id: 'id',
            data: 'id',
            label: 'ID Ruang',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: true,
              update: true,
              filter: false
            }
          },
          {
            id: 'nama_kamar',
            data: 'nama_kamar',
            label: 'Nama Kamar',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'nama_bed',
            data: 'nama_bed',
            label: 'Nama Bed',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'diff_day',
            data: 'diff_day',
            label: 'Selama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'tgl_mulai',
            data: 'tgl_mulai',
            label: 'Tanggal Mulai',
            placeholder: null,
            methods: {
              list: { type: "row-slot" },
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'tgl_selesai',
            data: 'tgl_selesai',
            label: 'Tanggal Selesai',
            placeholder: null,
            methods: {
              list: { type: "row-slot" },
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'status_checkout',
            data: 'status_checkout',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'checkout_status'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'checkout_status'
              },
              create: true,
              update: true,
              filter: {
                view_data: 'checkout_status',
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              }
            }
          },
          // {
          //   id: 'nama_ruang_aplicares',
          //   data: 'nama_ruang_aplicares',
          //   label: 'Nama Ruang Appllicares',
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: true
          //   }
          // },
          // {
          //   id: 'nama_golongan_kelas_applicares',
          //   data: 'nama_golongan_kelas_applicares',
          //   label: 'Nama Golongan Applicares',
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: true
          //   }
          // },
          // {
          //   id: 'nama_kelas_kamar_sironline',
          //   data: 'nama_kelas_kamar_sironline',
          //   label: 'Nama Kelas Kamar Sironline',
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: true
          //   }
          // }
        ]
      }
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY HH:mm')
    },
  }
}
</script>
