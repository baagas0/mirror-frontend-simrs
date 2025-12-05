<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-bed',
  data() {
    return {
      config: {
        title: 'Daftar Bed',
        model_api: 'msBed',
        getter: 'msBed',
        setter: 'msBed',
        pk_field: 'ms_bed_id',
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
          // ms_bed_id
          {
            id: 'ms_bed_id',
            data: 'ms_bed_id',
            label: 'ms bed id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // id
          {
            id: 'id',
            data: 'id',
            label: 'id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // ms_kamar_id
          {
            id: 'ms_kamar_id',
            data: 'ms_kamar_id',
            label: 'Kamar',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kamar' },
              detail: { view_data: 'nama_kamar' },
              create: {
                setter: 'msKamar',
                getter: 'msKamar',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_kamar',
                    code: 'ms_kamar_id',
                    display: ['nama_kamar', 'nama_ruang'],
                    headerDisplay: ['Nama Kamar', 'Nama Ruang']
                  },
                  assign_value: [
                    { 'id': 'nama_bed', 'key': 'nama_ruang' }
                  ]
                }
              },
              update: {
                setter: 'msKamar',
                getter: 'msKamar',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kamar',
                    code: 'ms_kamar_id',
                    display: ['nama_kamar']
                  }
                }
              },
              filter: true
            }
          },
          // nama_bed
          {
            id: 'nama_bed',
            data: 'nama_bed',
            label: 'Nama Bed',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                validation: ['required']
              },
              update: {
                validation: ['required']
              },
              filter: true
            }
          },
          // ms_kelas_kamar_id
          {
            id: 'ms_kelas_kamar_id',
            data: 'ms_kelas_kamar_id',
            label: 'Kelas Kamar',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kelas_kamar' },
              detail: { view_data: 'nama_kelas_kamar' },
              create: {
                setter: 'msKelasKamar',
                getter: 'msKelasKamar',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_kelas_kamar',
                    code: 'id',
                    display: ['nama_kelas_kamar']
                  }
                }
              },
              update: {
                setter: 'msKelasKamar',
                getter: 'msKelasKamar',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kelas_kamar',
                    code: 'id',
                    display: ['nama_kelas_kamar']
                  }
                }
              },
              filter: true
            }
          },
          // ruang_aplicares_id
          {
            id: 'ruang_aplicares_id',
            data: 'ruang_aplicares_id',
            label: 'Applicares',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_ruang_aplicares' },
              detail: { view_data: 'nama_ruang_aplicares' },
              create: {
                setter: 'ruangAplicares',
                getter: 'ruangAplicares',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_ruang_aplicares',
                    code: 'id',
                    display: ['nama_ruang_aplicares']
                  }
                }
              },
              update: {
                setter: 'ruangAplicares',
                getter: 'ruangAplicares',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_ruang_aplicares',
                    code: 'id',
                    display: ['nama_ruang_aplicares']
                  }
                }
              },
              filter: true
            }
          },
          // golongan_kelas_aplicares_id
          {
            id: 'golongan_kelas_aplicares_id',
            data: 'golongan_kelas_aplicares_id',
            label: 'Golongan Applicares',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_golongan_kelas_applicares' },
              detail: { view_data: 'nama_golongan_kelas_applicares' },
              create: {
                setter: 'msGolonganKelasAplicares',
                getter: 'msGolonganKelasAplicares',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_golongan_kelas_applicares',
                    code: 'id',
                    display: ['nama_golongan_kelas_applicares']
                  }
                }
              },
              update: {
                setter: 'msGolonganKelasAplicares',
                getter: 'msGolonganKelasAplicares',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_golongan_kelas_applicares',
                    code: 'id',
                    display: ['nama_golongan_kelas_applicares']
                  }
                }
              },
              filter: true
            }
          },
          // kelas_kamar_sirsonline_id
          {
            id: 'kelas_kamar_sirsonline_id',
            data: 'kelas_kamar_sirsonline_id',
            label: 'Sir Online',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kelas_kamar_sironline' },
              detail: { view_data: 'nama_kelas_kamar_sironline' },
              create: {
                setter: 'msKelasKamarSirOnline',
                getter: 'msKelasKamarSirOnline',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_kelas_kamar_sironline',
                    code: 'id',
                    display: ['nama_kelas_kamar_sironline']
                  }
                }
              },
              update: {
                setter: 'msKelasKamarSirOnline',
                getter: 'msKelasKamarSirOnline',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kelas_kamar_sironline',
                    code: 'id',
                    display: ['nama_kelas_kamar_sironline']
                  }
                }
              },
              filter: true
            }
          },
          // ms_jenis_layanan_id
          {
            id: 'ms_jenis_layanan_id',
            data: 'ms_jenis_layanan_id',
            label: 'Jenis Layanan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jenis_layanan' },
              detail: { view_data: 'nama_jenis_layanan' },
              create: {
                setter: 'msJenisLayanan',
                getter: 'msJenisLayanan',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_jenis_layanan',
                    code: 'id',
                    display: ['nama_jenis_layanan']
                  }
                }
              },
              update: {
                setter: 'msJenisLayanan',
                getter: 'msJenisLayanan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_layanan',
                    code: 'id',
                    display: ['nama_jenis_layanan']
                  }
                }
              },
              filter: true
            }
          },
          // cek_bridging
          {
            id: 'cek_bridging',
            data: 'cek_bridging',
            label: 'Bridging',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: '1' },
                      { label: 'Tidak', code: '0' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: '1' },
                      { label: 'Tidak', code: '0' }
                    ]
                  }
                }
              },
              filter: {
                view_data: 'active',
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
          // status_bed
          {
            id: 'status_bed',
            data: 'status_bed',
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
              filter: {
                view_data: 'active',
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
          }
        ]
      }
    }
  }
}
</script>
