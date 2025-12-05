<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-kelas-kunjungan',
  data() {
    return {
      config: {
        title: 'Daftar Kelas Kunjungan',
        model_api: 'kelas-kunjungan',
        getter: 'kelasKunjungan',
        setter: 'kelasKunjungan',
        pk_field: 'kelas_kunjungan_id',
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
          // nama_kelas_kunjungan
          {
            id: 'nama_kelas_kunjungan',
            data: 'nama_kelas_kunjungan',
            label: 'Nama Kelas Kunjungan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_kelas_kunjungan
          {
            id: 'kode_kelas_kunjungan',
            data: 'kode_kelas_kunjungan',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_kelas_kunjungan
          {
            id: 'keterangan_kelas_kunjungan',
            data: 'keterangan_kelas_kunjungan',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // ms_tarif_id
          {
            id: 'ms_tarif_id',
            data: 'ms_tarif_id',
            label: 'Tarif',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: {
                setter: 'msTarif',
                getter: 'msTarif',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tarif',
                    code: 'id',
                    display: ['nama_tarif']
                  }
                }
              },
              update: {
                setter: 'msTarif',
                getter: 'msTarif',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tarif',
                    code: 'id',
                    display: ['nama_tarif']
                  }
                }
              },
              filter: false
            }
          },
          // nama_tarif
          {
            id: 'nama_tarif',
            data: 'nama_tarif',
            label: 'Nama Tarif',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // status_kelas_kunjungan
          {
            id: 'status_kelas_kunjungan',
            data: 'status_kelas_kunjungan',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                view_data: 'active',
                type: 'radio',
                value: '1',
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
              },
              update: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: 1 },
                      { label: 'Non Aktif', code: 0 }
                    ]
                  }
                }
              },
              filter: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: 1 },
                      { label: 'Non Aktif', code: 0 }
                    ]
                  }
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>
