<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-periode',
  data () {
    return {
      config: {
        title: 'Daftar periode',
        model_api: 'periode',
        getter: 'periode',
        setter: 'periode',
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
          // is_periode_pertama
          {
            id: 'is_periode_pertama',
            data: 'is_periode_pertama',
            label: 'Periode Pertama',
            placeholder: null,
            methods: {
              list: {
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { code: true, label: 'Ya' },
                      { code: false, label: 'Tidak' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { code: true, label: 'Ya' },
                      { code: false, label: 'Tidak' }
                    ]
                  }
                }
              },
              filter: false
            }
          },
          // tgl_sync
          {
            id: 'tgl_sync',
            data: 'tgl_sync',
            label: 'Tanggal Singkron',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: false
            }
          },
          // tahun
          {
            id: 'tahun',
            data: 'tahun',
            label: 'Tahun',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: false
            }
          },
          // bulan
          {
            id: 'bulan',
            data: 'bulan',
            label: 'Bulan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_bulan' },
              detail: { view_data: 'nama_bulan' },
              create: {
                type: 'select',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { code: '1', label: 'Januari' }, { code: '2', label: 'Febuari' }, { code: '3', label: 'Maret' }, { code: '4', label: 'April' }, { code: '5', label: 'Mei' }, { code: '6', label: 'Juni' }, { code: '7', label: 'Juli' }, { code: '8', label: 'Agustus' }, { code: '9', label: 'September' }, { code: '10', label: 'Oktober' }, { code: '11', label: 'November' }, { code: '12', label: 'Desember' }
                    ]
                  }
                }
              },
              update: {
                type: 'select',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { code: '1', label: 'Januari' }, { code: '2', label: 'Febuari' }, { code: '3', label: 'Maret' }, { code: '4', label: 'April' }, { code: '5', label: 'Mei' }, { code: '6', label: 'Juni' }, { code: '7', label: 'Juli' }, { code: '8', label: 'Agustus' }, { code: '9', label: 'September' }, { code: '10', label: 'Oktober' }, { code: '11', label: 'November' }, { code: '12', label: 'Desember' }
                    ]
                  }
                }
              },
              filter: false
            }
          },
          // remark
          {
            id: 'remark',
            data: 'remark',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
