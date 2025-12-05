<template lang="">
  <div class="w-100">
    <tas-base-crud ref="crud-lab_regis" :config="buildConfig" @after-create="handleAfterCreate" :classes="registrasi_id ? '-' : 'container-fluid'" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" :mockSlave="false">
      <template v-slot:list-diagnosa="rowData">
        <ul>
          <li v-for="(item,a) in rowData.rowData.diagnosa" :key="'a123eA'+item.id+a">{{ item.nama_diagnosa }}</li>
        </ul>
      </template>
      <template v-slot:list-list_lab_paket="rowData">
        <ul>
          <li v-for="(item,a) in rowData.rowData.list_lab_paket" :key="'bAWQ3R'+item.id+a">{{ item.nama_lab_paket }}</li>
        </ul>
      </template>
  
      <template v-slot:detail-diagnosa="rowData">
        <ul>
          <li v-for="(item,a) in rowData.rowData.diagnosa" :key="'cAsr321'+item.id+a">{{ item.nama_diagnosa }}</li>
        </ul>
      </template>
      <template v-slot:detail-list_lab_paket="rowData">
        <ul>
          <li v-for="(item,a) in rowData.rowData.list_lab_paket" :key="'d124zswd'+item.id+a">{{ item.nama_lab_paket }}</li>
        </ul>
      </template>
  
      <template v-slot:list-action-append="rowData">
        <button
          class="btn btn-success mr-2"
          @click="exportPDF"
          :disabled="isExporting"
        >
          <i class="ri-file-pdf-line" :class="{ 'spinner-border spinner-border-sm': isExporting }"></i>
          Export PDF
        </button>
      </template>
    </tas-base-crud>
  </div>
</template>

<script>

import moment from 'moment'
moment.locale('id')

export default {
  name: 'crud-lab_regis',
  props: {
    registrasi_id: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
  },
  data() {
    return {
      isExporting: false,
      config: {
        title: 'Rekap Pemeriksaan',
        model_api: 'lab_regis',
        getter: 'lab_regis',
        setter: 'lab_regis',
        pk_field: 'id_lab_regis',
        frontendPaginate: false,
        permission: {
          create: false,
          // read: 'template-allow-all',
          read: false,
          update: false,
          delete: false
        },
        filter_api: {
          registrasi_id: ''
        },
        slave: [
        ],
        fields: [
          // id_lab_regis
          {
            id: 'id_lab_regis',
            data: 'id_lab_regis',
            label: 'ID Diagnosa',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // tanggal_request
          {
            id: 'tanggal_request',
            data: 'tanggal_request',
            label: 'Tanggal Request',
            placeholder: 'Ketik Tanggal Request',
            methods: {
              list: { transform: 'datetime' },
              detail: { transform: 'datetime' },
              create: { type: 'datetime', validation: ['required'], value: moment(new Date).format('YYYY-MM-DD HH:mm:ss') },
              update: { type: 'datetime', validation: ['required'], value: moment(new Date).format('YYYY-MM-DD HH:mm:ss') },
              filter: { type: 'datetime' }
            }
          },
          // status
          {
            id: 'status',
            data: 'status',
            label: 'Status',
            placeholder: 'Pilih Status',
            methods: {
              list: {
                class: { 0: 'badge badge-success', 1: 'badge badge-warning', 2: 'badge badge-primary', 3: 'badge badge-info' },
                transform: 'statusPenunjang'
              },
              detail: {
                class: { 0: 'badge badge-success', 1: 'badge badge-warning', 2: 'badge badge-primary', 3: 'badge badge-info' },
                transform: 'statusPenunjang'
              },
              create: false,
              update: false,
              filter: false
            }
          },
          // is_registrasi
          {
            id: 'is_registrasi',
            data: 'is_registrasi',
            label: 'Sudah Registrasi Kunjungan?',
            placeholder: 'Pilih Registrasi',
            methods: {
              list: {
                class: { true: 'badge badge-success', false: 'badge badge-danger' },
                transform: 'ynBool'
              },
              detail: {
                class: { true: 'badge badge-success', false: 'badge badge-danger' },
                transform: 'ynBool'
              },
              create: {
                type: 'lookup-radio',
                value: false,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [{ label: 'Ada Kunjungan', code: true }, { label: 'Belum ada kunjungan', code: false }]
                  },
                  toggle_field: [
                    { id: 'registrasi_id', item: 'show', toggle: [true, false], value: true },
                  ]
                }
              },
              update: false,
              // update: {
              //   type: 'lookup-radio',
              //   option: {
              //     list_pointer: {
              //       label: 'label',
              //       code: 'code',
              //       display: ['label'],
              //       list: [{ label: 'Ada Kunjungan', code: true }, { label: 'Belum ada kunjungan', code: false }]
              //     }
              //   }
              // },
              filter: false
            }
          },
          // no_rm
          {
            id: 'no_rm',
            data: 'no_rm',
            label: 'No RM',
            placeholder: 'Ketik No RM',
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: true
            }
          },
          // registrasi_id
          {
            id: 'registrasi_id',
            data: 'registrasi_id',
            label: 'Kunjungan',
            placeholder: 'Ketik Kunjungan',
            methods: {
              list: { view_data: 'nama_lengkap' },
              detail: { view_data: 'nama_lengkap' },
              create: {
                setter: 'registrasi/listPerHalamanBypassUri',
                getter: 'registrasi/listPerHalamanBypassUri',
                type: 'lookup-radio',
                validation: ['required'],
                // value: '9414ac24-f9c1-455d-9ffb-c186124e033e',
                option: {
                  list_pointer: {
                    label: 'nama_lengkap',
                    code: 'registrasi_id',
                    display: ['tgl_registrasi|date', 'nama_jenis_layanan', 'no_kunjungan','no_rm','nama_lengkap'],
                    headerDisplay: ['Tanggal Registrasi', 'Layanan', 'No Kunjungan', 'No. RM','Nama Lengkap']
                  },
                  filter: [
                    { type: 'date', label: 'Tanggal Awal', key: 'tanggal_awal' },
                    { type: 'date', label: 'Tanggal Akhir', key: 'tanggal_akhir' },
                    // { type: 'text', label: 'No Kunjungan', key: 'no_kunjungan' },
                    { type: 'text', label: 'Nama Lengkap', key: 'nama_lengkap' },
                  ]
                }
              },
              update: false,
              // update: {
              //   setter: 'registrasi/listPerHalamanBypassUri',
              //   getter: 'registrasi/listPerHalamanBypassUri',
              //   type: 'lookup-radio',
              //   validation: ['required'],
              //   option: {
              //     list_pointer: {
              //       label: 'nama_lengkap',
              //       code: 'registrasi_id',
              //       display: ['tgl_registrasi|date', 'nama_jenis_layanan', 'no_kunjungan','no_rm','nama_lengkap'],
              //       headerDisplay: ['Tanggal Registrasi', 'Layanan', 'No Kunjungan', 'no_rm','Nama Lengkap']
              //     },
              //     filter: [
              //       { type: 'date', label: 'Tanggal Awal', key: 'tanggal_awal' },
              //       { type: 'date', label: 'Tanggal Akhir', key: 'tanggal_akhir' },
              //       // { type: 'text', label: 'No Kunjungan', key: 'no_kunjungan' },
              //       { type: 'text', label: 'Nama Lengkap', key: 'nama_lengkap' },
              //     ] 
              //   }
              // },
              filter: {
                setter: 'registrasi/listPerHalamanBypassUri',
                getter: 'registrasi/listPerHalamanBypassUri',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_lengkap',
                    code: 'registrasi_id',
                    display: ['tgl_registrasi|date', 'nama_jenis_layanan', 'no_kunjungan','no_rm','nama_lengkap'],
                    headerDisplay: ['Tanggal Registrasi', 'Layanan', 'No Kunjungan', 'No. RM','Nama Lengkap']
                  },
                  filter: [
                    { type: 'date', label: 'Tanggal Awal', key: 'tanggal_awal' },
                    { type: 'date', label: 'Tanggal Akhir', key: 'tanggal_akhir' },
                    // { type: 'text', label: 'No Kunjungan', key: 'no_kunjungan' },
                    { type: 'text', label: 'Nama Lengkap', key: 'nama_lengkap' },
                  ]
                }
              }
            }
          },
          // no_kunjungan
          {
            id: 'no_kunjungan',
            data: 'no_kunjungan',
            label: 'No Kunjungan',
            placeholder: 'Ketik No Kunjungan',
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_jenis_layanan
          {
            id: 'nama_jenis_layanan',
            data: 'nama_jenis_layanan',
            label: 'Jenis Layanan',
            placeholder: 'Ketik Jenis Layanan',
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // dokter_id
          {
            id: 'dokter_id',
            data: 'dokter_id',
            label: 'Dokter',
            placeholder: 'Ketik Dokter',
            methods: {
              list: { view_data: 'nama_dokter' },
              detail: { view_data: 'nama_dokter' },
              create: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter']
                  }
                }
              },
              update: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter']
                  }
                }
              },
              filter: false
            }
          },
          // diagnosa
          {
            id: 'diagnosa',
            data: 'diagnosa',
            label: 'Daftar Diagnosa',
            placeholder: 'Ketik Diagnosa',
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: {
                setter: 'ms_diagnosa',
                getter: 'ms_diagnosa',
                type: 'lookup-checkbox',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'kode_diagnosa',
                    code: 'id',
                    display: ['kode_diagnosa', 'nama_diagnosa']
                  }
                }
              },
              update: {
                setter: 'ms_diagnosa',
                getter: 'ms_diagnosa',
                type: 'lookup-checkbox',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'kode_diagnosa',
                    code: 'id',
                    display: ['kode_diagnosa', 'nama_diagnosa']
                  }
                }
              },
              filter: false
            }
          },
          // list_lab_paket
          {
            id: 'list_lab_paket',
            data: 'list_lab_paket',
            label: 'Daftar Lab Paket',
            placeholder: 'Pilih Daftar Lab Paket',
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: {
                setter: 'lab_paket',
                getter: 'lab_paket',
                type: 'lookup-checkbox',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_lab_paket',
                    code: 'id_lab_paket',
                    display: ['nama_lab_paket', 'keterangan_lab_paket'],
                    headerDisplay: ['Nama LAB Test'],
                    render_view: (data, rowData) => {
                      let child = ''
                      if (rowData.penunjang) {
                        for (const item of rowData.penunjang) {
                          child += `<li>${item.nama_penunjang}</li>`
                        }
                      } else {
                        // child += `<li>-</li>`
                      }
                      return `
                        <p class="mb-0">${data}</p>
                        <ul>
                          ${child}
                        </ul>
                      `
                    }
                  },
                  filter: [
                    { type: 'text', label: 'Nama Penunjang', key: 'nama_penunjang' },
                  ]
                }
              },
              update: {
                setter: 'lab_paket',
                getter: 'lab_paket',
                type: 'lookup-checkbox',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_lab_paket',
                    code: 'id_lab_paket',
                    display: ['nama_lab_paket', 'keterangan_lab_paket']
                  }
                }
              },
              filter: false
            }
          },
          
          // klinis
          {
            id: 'klinis',
            data: 'klinis',
            label: 'Klinis',
            placeholder: 'Ketik Klinis',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: ['required'] },
              update: { type: 'textarea', validation: ['required'] },
              filter: false
            }
          },
          // is_cito
          {
            id: 'is_cito',
            data: 'is_cito',
            label: 'Cito',
            placeholder: 'Ketik Cito',
            methods: {
              list: {
                class: { true: 'badge badge-success', false: 'badge badge-secondary' },
                transform: 'ynBool'
              },
              detail: {
                class: { true: 'badge badge-success', false: 'badge badge-secondary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: false,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  },
                }
              },
              update: {
                type: 'radio',
                value: false,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  },
                }
              },
              filter: false
            }
          },
          // is_puasa
          {
            id: 'is_puasa',
            data: 'is_puasa',
            label: 'Puasa',
            placeholder: 'Ketik Puasa',
            methods: {
              list: {
                class: { true: 'badge badge-success', false: 'badge badge-danger' },
                transform: 'ynBool'
              },
              detail: {
                class: { true: 'badge badge-success', false: 'badge badge-danger' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                value: false,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  },
                }
              },
              update: {
                type: 'radio',
                value: false,
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [{ label: 'Ya', code: true }, { label: 'Tidak', code: false }]
                  },
                }
              },
              filter: false
            }
          },
          // keterangan_lab_regis
          {
            id: 'keterangan_lab_regis',
            data: 'keterangan_lab_regis',
            label: 'Keterangan',
            placeholder: 'Ketik Keterangan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: ['required'] },
              update: { type: 'textarea', validation: ['required'] },
              filter: false
            }
          },
          
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,

      dataObject: {
        registrasi_id: ''
      },
      objHasRegistrasi: false,
      showToastServerLis: false,

      intervalStatistic: null,
      statistic: {
        new: 0
      }
    }
  },
  computed: {
    buildConfig() {
      const fields = JSON.parse(JSON.stringify(this.config.fields))
      if (this.registrasi_id) {
        fields[3] = {
          id: 'is_registrasi',
          data: 'is_registrasi',
          label: 'Sudah Registrasi Kunjungan?',
          placeholder: 'Pilih Registrasi',
          methods: {
            list: {
              class: { true: 'badge badge-success', false: 'badge badge-danger' },
              transform: 'ynBool'
            },
            detail: {
              class: { true: 'badge badge-success', false: 'badge badge-danger' },
              transform: 'ynBool'
            },
            create: {
              type: 'hidden',
              value: true,
            },
            update: false,
            filter: false
          }
        };
        fields[5] = {
          id: 'registrasi_id',
          data: 'registrasi_id',
          label: 'Kunjungan',
          placeholder: 'Ketik Kunjungan',
          methods: {
            list: { view_data: 'nama_lengkap' },
            detail: { view_data: 'nama_lengkap' },
            create: {
              type: 'hidden',
              validation: [],
              // value: '9414ac24-f9c1-455d-9ffb-c186124e033e',
              value: this.registrasi_id
            },
            update: false,
            filter: false
          }
        };
      }
      return { ...this.config, filter_api: { registrasi_id: this.registrasi_id }, fields: fields }
    }
  },
  watch: {
    '$route.query.view': {
      handler: function(val) {
        let query = this.$route.query
        if(val && query.view && query.view === 'detail' && query.id) {
          this.objHasRegistrasi = false
          this.handleSlaveOverride(query.id)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getStatistic()

    this.intervalStatistic = setInterval(() => {
      this.getStatistic()
    }, 10000);
  },
  beforeDestroy(){ // destroyed  in Vue 2
   clearInterval(this.intervalStatistic)
  },
  methods: {
    async exportPDF() {
      this.isExporting = true

      try {
        await this.$_api.downloadFile('/lab_regis/rekap_pemeriksaan', {
        }, 'laporan_rekap_pemeriksaan_laboratorium.xlsx')

        this.$_alert.success('Excel berhasil diunduh')
      } catch (error) {
        console.error('Error exporting Excel:', error)
        this.$_alert.error('Terjadi kesalahan saat mengekspor Excel')
      } finally {
        this.isExporting = false
      }
    },
  }
}
</script>

