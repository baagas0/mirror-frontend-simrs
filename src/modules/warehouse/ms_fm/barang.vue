<template lang="">
  <tas-base-crud :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true"/>
</template>

<script>
export default {
  name: 'crud-barang',
  data() {
    return {
      config: {
        title: 'Daftar Barang',
        model_api: 'msBarang',
        getter: 'msBarang',
        setter: 'msBarang',
        pk_field: 'ms_barang_id',
        frontendPaginate: false,
        filter_api: {
          type: 'OBAT'
        },
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
            label: 'Nama Barang',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_barang
          {
            id: 'nama_barang',
            data: 'nama_barang',
            label: 'Nama Barang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                validation: ['required'],
                class: 'col-8',
              },
              update: {
                validation: ['required'],
                class: 'col-8',
              },
              filter: {
                class: 'col-4',
              }
            }
          },
          // kode_produk
          {
            id: 'kode_produk',
            data: 'kode_produk',
            class: 'col-3', attr: null,
            label: 'Kode Barang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                validation: ['required'],
                class: 'col-4',
              },
              update: {
                validation: ['required'],
                class: 'col-4',
              },
              filter: {
                class: 'col-3'
              }
            }
          },
          // qty_per_rs
          {
            id: 'qty_per_rs',
            data: 'qty_per_rs',
            label: 'QTY/rs',
            placeholder: null,
            methods: {
              list: { transform: 'number' },
              detail: { transform: 'number' },
              create: {
                validation: ['required'],
                class: 'col-4',
                type: 'number'
              },
              update: {
                validation: ['required'],
                class: 'col-4',
                type: 'number'
              },
              filter: false
            }
          },
          // persediaan_medis
          {
            id: 'persediaan_medis',
            data: 'persediaan_medis',
            label: 'Persediaan Medis',
            placeholder: null,
            methods: {
              list: { transform: 'number' },
              detail: { transform: 'number' },
              create: {
                validation: ['required'],
                class: 'col-4',
                type: 'number'
              },
              update: {
                validation: ['required'],
                class: 'col-4',
                type: 'number'
              },
              filter: false
            }
          },
          // qjb
          {
            id: 'qjb',
            data: 'qjb',
            label: 'QJB',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                validation: ['required'],
                class: 'col-4',
                type: 'number'
              },
              update: {
                validation: ['required'],
                class: 'col-4',
                type: 'number'
              },
              filter: false
            }
          },
          // ms_satuan_barang_id
          {
            id: 'ms_satuan_barang_id',
            data: 'ms_satuan_barang_id',
            label: 'Satuan Barang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_satuan' },
              detail: { view_data: 'nama_satuan' },
              create: {
                setter: 'msSatuanBarang',
                getter: 'msSatuanBarang',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_satuan',
                    code: 'id',
                    display: ['nama_satuan']
                  }
                }
              },
              update: {
                setter: 'msSatuanBarang',
                getter: 'msSatuanBarang',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_satuan',
                    code: 'id',
                    display: ['nama_satuan']
                  }
                }
              },
              filter: false
              // filter: {
              //   setter: 'msSatuanBarang',
              //   getter: 'msSatuanBarang',
              //   type: 'lookup-radio',
              //   class: 'col-3',
              //   validation: ['required'],
              //   option: {
              //     list_pointer: {
              //       label: 'nama_satuan',
              //       code: 'id',
              //       display: ['nama_satuan'],
              //       mainParam: 'nama_satuan'
              //     }
              //   }
              // },
            }
          },
          // ms_produsen_id
          {
            id: 'ms_produsen_id',
            data: 'ms_produsen_id',
            label: 'Produsen',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_produsen' },
              detail: { view_data: 'nama_produsen' },
              create: {
                setter: 'msProdusen',
                getter: 'msProdusen',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_produsen',
                    code: 'id',
                    display: ['nama_produsen']
                  }
                }
              },
              update: {
                setter: 'msProdusen',
                getter: 'msProdusen',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_produsen',
                    code: 'id',
                    display: ['nama_produsen']
                  }
                }
              },
              filter: {
                setter: 'msProdusen',
                getter: 'msProdusen',
                type: 'lookup-radio',
                class: 'col-3',
                option: {
                  list_pointer: {
                    label: 'nama_produsen',
                    code: 'id',
                    display: ['nama_produsen'],
                    mainParam: 'nama_produsen'
                  }
                }
              },
            }
          },
          // tarif_cbg_id
          {
            id: 'tarif_cbg_id',
            data: 'tarif_cbg_id',
            label: 'Tarif CBG',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_tarif_cbg' },
              detail: { view_data: 'nama_tarif_cbg' },
              create: {
                setter: 'tarif_cbg',
                getter: 'tarif_cbg',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_tarif_cbg',
                    code: 'id',
                    display: ['nama_tarif_cbg']
                  }
                }
              },
              update: {
                setter: 'tarif_cbg',
                getter: 'tarif_cbg',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_tarif_cbg',
                    code: 'id',
                    display: ['nama_tarif_cbg']
                  }
                }
              },
              filter: {
                setter: 'tarif_cbg',
                getter: 'tarif_cbg',
                type: 'lookup-radio',
                class: 'col-3',
                option: {
                  list_pointer: {
                    label: 'nama_tarif_cbg',
                    code: 'id',
                    display: ['nama_tarif_cbg'],
                    mainParam: 'nama_tarif_cbg'
                  }
                }
              },
            }
          },

          // komposisi
          {
            id: 'komposisi',
            data: 'komposisi',
            label: 'Komposisi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { class: 'col-4', validation: ['required'] },
              update: { class: 'col-4', validation: ['required'] },
              filter: false
            }
          },
          // harga_pokok
          {
            id: 'harga_pokok',
            data: 'harga_pokok',
            label: 'Harga Pokok',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: {
                validation: ['required'],
                class: 'col-4',
                type: 'money'
              },
              update: {
                validation: ['required'],
                class: 'col-4',
                type: 'money'
              },
              filter: false
            }
          },
          // ms_satuan_jual_id
          {
            id: 'ms_satuan_jual_id',
            data: 'ms_satuan_jual_id',
            label: 'Satuan Jual',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_satuan_jual' },
              detail: { view_data: 'nama_satuan_jual' },
              create: {
                setter: 'msSatuanBarang',
                getter: 'msSatuanBarang',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_satuan',
                    code: 'id',
                    display: ['nama_satuan']
                  }
                }
              },
              update: {
                setter: 'msSatuanBarang',
                getter: 'msSatuanBarang',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_satuan',
                    code: 'id',
                    display: ['nama_satuan']
                  }
                }
              },
              filter: false
              // filter: {
              //   setter: 'msSatuanBarang',
              //   getter: 'msSatuanBarang',
              //   type: 'lookup-radio',
              //   class: 'col-3',
              //   validation: ['required'],
              //   option: {
              //     list_pointer: {
              //       label: 'nama_satuan',
              //       code: 'id',
              //       display: ['nama_satuan'],
              //       mainParam: 'nama_satuan'
              //     }
              //   }
              // },
            }
          },
          // harga_tertinggi
          {
            id: 'harga_tertinggi',
            data: 'harga_tertinggi',
            label: 'Harga Tertinggi',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: { validation: ['required'] },
              update: { type: 'money', validation: ['required'] },
              filter: false
            }
          },
          // harga_beli_terahir
          {
            id: 'harga_beli_terahir',
            data: 'harga_beli_terahir',
            label: 'Harga Beli Terakhir',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },
          // ms_kelas_terapi_id
          {
            id: 'ms_kelas_terapi_id',
            data: 'ms_kelas_terapi_id',
            label: 'Kelas Terapi',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kelas_terapi' },
              detail: { view_data: 'nama_kelas_terapi' },
              create: {
                setter: 'msKelasTerapi',
                getter: 'msKelasTerapi',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_kelas_terapi',
                    code: 'id',
                    display: ['nama_kelas_terapi']
                  }
                }
              },
              update: {
                setter: 'msKelasTerapi',
                getter: 'msKelasTerapi',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_kelas_terapi',
                    code: 'id',
                    display: ['nama_kelas_terapi']
                  }
                }
              },
              filter: {
                setter: 'msKelasTerapi',
                getter: 'msKelasTerapi',
                type: 'lookup-radio',
                class: 'col-3',
                option: {
                  list_pointer: {
                    label: 'nama_kelas_terapi',
                    code: 'id',
                    display: ['nama_kelas_terapi'],
                    mainParam: 'nama_kelas_terapi'
                  }
                }
              },
            }
          },
          // ms_golongan_barang_id
          {
            id: 'ms_golongan_barang_id',
            data: 'ms_golongan_barang_id',
            label: 'Golongan Barang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_golongan_barang' },
              detail: { view_data: 'nama_golongan_barang' },
              create: {
                setter: 'msGolonganBarang',
                getter: 'msGolonganBarang',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_golongan_barang',
                    code: 'id',
                    display: ['nama_golongan_barang']
                  }
                }
              },
              update: {
                setter: 'msGolonganBarang',
                getter: 'msGolonganBarang',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_golongan_barang',
                    code: 'id',
                    display: ['nama_golongan_barang']
                  }
                }
              },
              filter: {
                setter: 'msGolonganBarang',
                getter: 'msGolonganBarang',
                type: 'lookup-radio',
                class: 'col-3',
                option: {
                  list_pointer: {
                    label: 'nama_golongan_barang',
                    code: 'id',
                    display: ['nama_golongan_barang'],
                    mainParam: 'nama_golongan_barang'
                  }
                }
              },
            }
          },
          // ms_jenis_obat_id
          {
            id: 'ms_jenis_obat_id',
            data: 'ms_jenis_obat_id',
            label: 'Jenis Obat',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jenis_obat' },
              detail: { view_data: 'nama_jenis_obat' },
              create: {
                setter: 'msJenisObat',
                getter: 'msJenisObat',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_jenis_obat',
                    code: 'id',
                    display: ['nama_jenis_obat']
                  }
                }
              },
              update: {
                setter: 'msJenisObat',
                getter: 'msJenisObat',
                type: 'lookup-radio',
                class: 'col-4',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_jenis_obat',
                    code: 'id',
                    display: ['nama_jenis_obat']
                  }
                }
              },
              filter: {
                setter: 'msJenisObat',
                getter: 'msJenisObat',
                type: 'lookup-radio',
                class: 'col-3',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_obat',
                    code: 'id',
                    display: ['nama_jenis_obat'],
                    mainParam: 'nama_jenis_obat'
                  }
                }
              },
            }
          },
        ]
      },
      hideFilter: false,
      filterView: true
    }
  }
}
</script>