<template lang="">
  <tas-base-crud :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch"/>
</template>

<script>
export default {
  name: 'crud-ms-jadwal-dokter',
  data() {
    return {
      config: {
        title: 'Daftar Master Jadwal Dokter',
        model_api: 'msJadwalDokter',
        getter: 'msJadwalDokter',
        setter: 'msJadwalDokter',
        // custom_api: {
        //   list: 'msJadwalDokter/listPerHalaman'
        // },
        pk_field: 'ms_jadwal_dokter_id',
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
          // ms_dokter_id
          {
            id: 'ms_dokter_id',
            data: 'ms_dokter_id',
            label: 'ms dokter id',
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
          // hari_master
          {
            id: 'hari_master',
            data: 'hari_master',
            label: 'Hari',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'lookup-radio',
                getter: '',
                setter: '',
                option: {
                  list_pointer: {
                    label: 'code',
                    code: 'code',
                    list: [
                      { label: 'Senin', code: 'Senin' },
                      { label: 'Selasa', code: 'Selasa' },
                      { label: 'Rabu', code: 'Rabu' },
                      { label: 'Kamis', code: 'Kamis' },
                      { label: 'Jumat', code: 'Jumat' },
                      { label: 'Sabtu', code: 'Sabtu' },
                      { label: 'Minggu', code: 'Minggu' },
                    ],
                    display: ['label'],
                  }
                }
              },
              update: {
                type: 'lookup-radio',
                getter: '',
                setter: '',
                option: {
                  list_pointer: {
                    label: 'code',
                    code: 'code',
                    list: [
                      { code: 'Senin' },
                      { code: 'Selasa' },
                      { code: 'Rabu' },
                      { code: 'Kamis' },
                      { code: 'Jumat' },
                      { code: 'Sabtu' },
                      { code: 'Minggu' },
                    ]
                  }
                }
              },
              filter: false
              // filter: {
              // class: 'col-12 col-lg-3 col-md-6',
              //   type: 'lookup-radio',
              //   getter: '',
              //   setter: '',
              //   option: {
              //     list_pointer: {
              //       label: 'code',
              //       code: 'code',
              //       list: [
              //         { code: 'Senin' },
              //         { code: 'Selasa' },
              //         { code: 'Rabu' },
              //         { code: 'Kamis' },
              //         { code: 'Jumat' },
              //         { code: 'Sabtu' },
              //         { code: 'Minggu' },
              //       ]
              //     }
              //   }
              // }
            }
          },
          // waktu_mulai_master
          {
            id: 'waktu_mulai_master',
            data: 'waktu_mulai_master',
            label: 'Waktu Mulai',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'time',
              },
              update: {
                type: 'time',
              },
              filter: false
            }
          },
          // waktu_selesai_master
          {
            id: 'waktu_selesai_master',
            data: 'waktu_selesai_master',
            label: 'Waktu Selesai',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'time',
              },
              update: {
                type: 'time',
              },
              filter: false
            }
          },
          // quota_master
          {
            id: 'quota_master',
            data: 'quota_master',
            label: 'Quota Keseluruhan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'number',
              },
              update: {
                type: 'number',
              },
              filter: false
            }
          },
          // quota_jkn_master
          {
            id: 'quota_jkn_master',
            data: 'quota_jkn_master',
            label: 'Quota JKN',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'number',
              },
              update: {
                type: 'number',
              },
              filter: false
            }
          },
          // quota_booking_master
          {
            id: 'quota_booking_master',
            data: 'quota_booking_master',
            label: 'Quota Booking',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'number',
              },
              update: {
                type: 'number',
              },
              filter: false
            }
          },
          // initial_master
          {
            id: 'initial_master',
            data: 'initial_master',
            label: 'Initial',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // ms_poliklinik_id
          {
            id: 'ms_poliklinik_id',
            data: 'ms_poliklinik_id',
            label: 'Poliklinik',
            placeholder: 'Cari nama poliklinik',
            methods: {
              list: { view_data: 'nama_poliklinik' },
              detail: { view_data: 'nama_poliklinik' },
              create: {
                setter: 'msPoliklinik',
                getter: 'msPoliklinik',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_poliklinik',
                    code: 'id',
                    display: ['nama_poliklinik'],
                    mainParam: 'nama_poliklinik'
                  }
                }
              },
              update: {
                setter: 'msPoliklinik',
                getter: 'msPoliklinik',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_poliklinik',
                    code: 'id',
                    display: ['nama_poliklinik'],
                    mainParam: 'nama_poliklinik'
                  }
                }
              },
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                setter: 'msPoliklinik',
                getter: 'msPoliklinik',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_poliklinik',
                    code: 'id',
                    display: ['nama_poliklinik'],
                    mainParam: 'nama_poliklinik'
                  },
                },
              }
            }
          },
          // ms_dokter_id
          {
            id: 'ms_dokter_id',
            data: 'ms_dokter_id',
            label: 'Dokter',
            placeholder: 'Cari nama dokter',
            methods: {
              list: { view_data: 'nama_dokter' },
              detail: { view_data: 'nama_dokter' },
              create: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter'],
                    mainParam: 'nama_dokter'
                  }
                }
              },
              update: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter'],
                    mainParam: 'nama_dokter'
                  }
                }
              },
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter'],
                    mainParam: 'nama_dokter'
                  }
                }
              }
            }
          },
          // ms_jenis_layanan_id
          {
            id: 'ms_jenis_layanan_id',
            data: 'ms_jenis_layanan_id',
            label: 'Jenis Layanan',
            placeholder: 'Cari nama jenis layanan',
            methods: {
              list: { view_data: 'nama_jenis_layanan' },
              detail: { view_data: 'nama_jenis_layanan' },
              create: {
                setter: 'msJenisLayanan',
                getter: 'msJenisLayanan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_layanan',
                    code: 'id',
                    display: ['nama_jenis_layanan'],
                    mainParam: 'nama_jenis_layanan'
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
                    display: ['nama_jenis_layanan'],
                    mainParam: 'nama_jenis_layanan'
                  }
                }
              },
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                setter: 'msJenisLayanan',
                getter: 'msJenisLayanan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_layanan',
                    code: 'id',
                    display: ['nama_jenis_layanan'],
                    mainParam: 'nama_jenis_layanan'
                  }
                }
              }
            }
          }
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true
    }
  }
}
</script>
