<template lang="">
  <div class="w-100">
    <tas-base-crud ref="base-crud-tenaga-medis" :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch">
      <template v-slot:list-satu_sehat_id="rowData">
        <div class="w-100">
          <i class="ri-refresh-fill" :class="[{ 'text-success': rowData.rowData.satu_sehat_id }, { 'text-danger': !rowData.rowData.satu_sehat_id }]"></i>
        </div>
      </template>
  
      <template v-slot:list-table-action="rowData">
        <button class="btn btn-primary btn-circle mr-2" @click="syncIhs(rowData.rowData)">
          <i class="ri-loop-left-line"></i>
          Sync IHS
        </button>
      </template>
    </tas-base-crud>
  
    <b-toast id="toast-detail-syncIhs" variant="info" solid no-auto-hide no-close-button :visible="isLoadingIhsSync">
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-center pt-2">
          <b-spinner label="Spinning" small></b-spinner>
          <strong class="mr-auto pl-3">Indonesia Health System ...</strong>
          <small class="text-muted mr-2">
            <time-ago locale="id"></time-ago>
          </small>
        </div>
      </template>
      Sedang sync dengan IHS.
      <b-progress class="mt-3" :value="0" :max="1" animated></b-progress>
    </b-toast>
  </div>
</template>

<script>
export default {
  name: 'crud-dokter',
  data() {
    return {
      config: {
        title: 'Daftar Dokter',
        model_api: 'msDokter',
        getter: 'msDokter',
        setter: 'msDokter',
        pk_field: 'ms_dokter_id',
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
          // satu_sehat_id
          {
            id: 'satu_sehat_id',
            data: 'satu_sehat_id',
            label: 'Satu Sehat',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: false,
              update: false,
              filter: false
            }
          },
          // ms_tipe_tenaga_medis_id
          {
            id: 'ms_tipe_tenaga_medis_id',
            data: 'ms_tipe_tenaga_medis_id',
            label: 'Tipe Tenaga Medis',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_tipe_tenaga_medis' },
              detail: { view_data: 'nama_tipe_tenaga_medis' },
              create: {
                validation: ['required'],
                setter: 'ms_tipe_tenaga_medis',
                getter: 'ms_tipe_tenaga_medis',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tipe_tenaga_medis',
                    code: 'id',
                    display: ['nama_tipe_tenaga_medis']
                  }
                }
              },
              update: {
                validation: ['required'],
                setter: 'ms_tipe_tenaga_medis',
                getter: 'ms_tipe_tenaga_medis',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tipe_tenaga_medis',
                    code: 'id',
                    display: ['nama_tipe_tenaga_medis']
                  }
                }
              },
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3',
                setter: 'ms_tipe_tenaga_medis',
                getter: 'ms_tipe_tenaga_medis',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tipe_tenaga_medis',
                    code: 'id',
                    display: ['nama_tipe_tenaga_medis']
                  }
                },
              }
            }
          },
          // nama_dokter
          {
            id: 'nama_dokter',
            data: 'nama_dokter',
            label: 'Nama Dokter',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3'
              }
            }
          },

          // nik_dokter
          {
            id: 'nik_dokter',
            data: 'nik_dokter',
            label: 'NIK',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3'
              }
            }
          },
          // npwp_dokter
          {
            id: 'npwp_dokter',
            data: 'npwp_dokter',
            label: 'NPWP',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3'
              }
            }
          },
          // kode_bpjs
          {
            id: 'kode_bpjs',
            data: 'kode_bpjs',
            label: 'Kode BPJS',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // tempat_lahir_dokter
          {
            id: 'tempat_lahir_dokter',
            data: 'tempat_lahir_dokter',
            label: 'Tempat Lahir',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: false
            }
          },
          // tgl_lahir_dokter
          {
            id: 'tgl_lahir_dokter',
            data: 'tgl_lahir_dokter',
            label: 'Tanggal Lahir',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date', validation: ['required'] },
              update: { type: 'date', validation: ['required'] },
              filter: false
            }
          },
          // agama_dokter
          {
            id: 'agama_dokter',
            data: 'agama_dokter',
            label: 'Agama',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: { 
                validation: ['required'],
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Islam', code: 'Islam' },
                      { label: 'Kristen', code: 'Kristen' },
                      { label: 'Hindu', code: 'Hindu' },
                      { label: 'Katolik', code: 'Katolik' },
                      { label: 'Budha', code: 'Budha' },
                      { label: 'Konghucu', code: 'Konghucu' },
                    ]
                  }
                }
              },
              update: { 
                validation: ['required'],
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Islam', code: 'Islam' },
                      { label: 'Kristen', code: 'Kristen' },
                      { label: 'Hindu', code: 'Hindu' },
                      { label: 'Katolik', code: 'Katolik' },
                      { label: 'Budha', code: 'Budha' },
                      { label: 'Konghucu', code: 'Konghucu' },
                    ]
                  }
                }
              },
              filter: false
            }
          },
          // jk_dokter
          {
            id: 'jk_dokter',
            data: 'jk_dokter',
            label: 'Jenis Kelamin',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 'L': 'badge badge-primary', 'P': 'badge badge-warning' },
                transform: 'kelamin'
              },
              detail: {
                order: true,
                class: { 'L': 'badge badge-primary', 'P': 'badge badge-warning' },
                transform: 'kelamin'
              },
              create: {
                validation: ['required'],
                // view_data: 'active',
                type: 'radio',
                // value: 'Laki-laki',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Laki-laki', code: 'L' },
                      { label: 'Perempuan', code: 'P' }
                    ]
                  }
                }
              },
              update: {
                validation: ['required'],
                // view_data: 'active',
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Laki-laki', code: 'L' },
                      { label: 'Perempuan', code: 'P' }
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
                      { label: 'Laki-laki', code: 'L' },
                      { label: 'Perempuan', code: 'P' }
                    ]
                  }
                }
              }
            }
          },
          // no_hp_dokter
          {
            id: 'no_hp_dokter',
            data: 'no_hp_dokter',
            label: 'No Telepon',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3'
              }
            }
          },
          // email_dokter
          {
            id: 'email_dokter',
            data: 'email_dokter',
            label: 'Email',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: { type: 'email', validation: ['required'] },
              update: { validation: ['required'] },
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3'
              }
            }
          },
          // edu_bachelor
          {
            id: 'edu_bachelor',
            data: 'edu_bachelor',
            label: 'Pendidikan Sarjana',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // edu_diploma
          {
            id: 'edu_diploma',
            data: 'edu_diploma',
            label: 'Diploma',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // edu_doctor
          {
            id: 'edu_doctor',
            data: 'edu_doctor',
            label: 'Pendidikan Dokter',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: { 
                validation: ['required'],
                setter: 'msPendidikan',
                getter: 'msPendidikan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_pendidikan',
                    code: 'nama_pendidikan',
                    display: ['nama_pendidikan']
                  }
                }
              },
              update: { 
                validation: ['required'],
                setter: 'msPendidikan',
                getter: 'msPendidikan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_pendidikan',
                    code: 'nama_pendidikan',
                    display: ['nama_pendidikan']
                  }
                }
              },
              filter: false
            }
          },
          // keahlian_khusus
          {
            id: 'keahlian_khusus',
            data: 'keahlian_khusus',
            label: 'Keahlian Khusus',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // kj_str_number
          {
            id: 'kj_str_number',
            data: 'kj_str_number',
            label: 'Nomor KJ',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // kj_bpjs
          {
            id: 'kj_bpjs',
            data: 'kj_bpjs',
            label: 'Nomor BPJS',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // tgl_surat
          {
            id: 'tgl_surat',
            data: 'tgl_surat',
            label: 'Tanggal Surat',
            placeholder: null,
            methods: {
              list: false,
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: false
            }
          },
          // tgl_kadaluarsa_surat
          {
            id: 'tgl_kadaluarsa_surat',
            data: 'tgl_kadaluarsa_surat',
            label: 'Tanggal Kadaluarsa Surat',
            placeholder: null,
            methods: {
              list: false,
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: false
            }
          },
          // createdAt
          {
            id: 'createdAt',
            data: 'createdAt',
            label: 'Dokter',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // updatedAt
          {
            id: 'updatedAt',
            data: 'updatedAt',
            label: 'Dokter',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // deletedAt
          {
            id: 'deletedAt',
            data: 'deletedAt',
            label: 'Dokter',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // ms_kualifikasi_id
          {
            id: 'ms_kualifikasi_id',
            data: 'ms_kualifikasi_id',
            label: 'Kualifikasi',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kualifikasi' },
              detail: { view_data: 'nama_kualifikasi' },
              create: {
                setter: 'msKualifikasi',
                getter: 'msKualifikasi',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kualifikasi',
                    code: 'id',
                    display: ['nama_kualifikasi']
                  }
                }
              },
              update: {
                setter: 'msKualifikasi',
                getter: 'msKualifikasi',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kualifikasi',
                    code: 'id',
                    display: ['nama_kualifikasi']
                  }
                }
              },
              filter: {
                class: 'col-12 col-sm-12 col-md-6 col-lg-3',
                setter: 'msKualifikasi',
                getter: 'msKualifikasi',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kualifikasi',
                    code: 'id',
                    display: ['nama_kualifikasi']
                  }
                },
              }
            }
          },
          // ms_specialist_id
          {
            id: 'ms_specialist_id',
            data: 'ms_specialist_id',
            label: 'Spesialis',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_specialist' },
              detail: { view_data: 'nama_specialist' },
              create: {
                setter: 'msSpecialist',
                getter: 'msSpecialist',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_specialist',
                    code: 'id',
                    display: ['nama_specialist']
                  }
                }
              },
              update: {
                setter: 'msSpecialist',
                getter: 'msSpecialist',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_specialist',
                    code: 'id',
                    display: ['nama_specialist']
                  }
                },
              },
              filter: {
                setter: 'msSpecialist',
                getter: 'msSpecialist',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_specialist',
                    code: 'id',
                    display: ['nama_specialist']
                  }
                },
                class: 'col-12 col-sm-12 col-md-6 col-lg-3'
              }
            }
          },
          // ms_bank_id
          {
            id: 'ms_bank_id',
            data: 'ms_bank_id',
            label: 'Bank',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_bank' },
              detail: { view_data: 'nama_bank' },
              create: {
                setter: 'msBank',
                getter: 'msBank',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_bank',
                    code: 'id',
                    display: ['nama_bank']
                  }
                }
              },
              update: {
                setter: 'msBank',
                getter: 'msBank',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_bank',
                    code: 'id',
                    display: ['nama_bank']
                  }
                }
              },
              filter: false
            }
          },
          // norek_bank
          {
            id: 'norek_bank',
            data: 'norek_bank',
            label: 'No Rekening',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // foto_dokter
          {
            id: 'foto_dokter',
            data: 'foto_dokter',
            label: 'Foto Dokter',
            placeholder: null,
            methods: {
              list: {
                type: 'image',
                view_data: 'foto_dokter'
              },
              detail: {
                type: 'image',
                view_data: 'foto_dokter'
              },
              create: { type: 'file' },
              update: { type: 'file' },
              filter: false
            }
          },
          // tanda_tangan
          {
            id: 'tanda_tangan',
            data: 'tanda_tangan',
            label: 'Tanda Tangan Dokter',
            placeholder: null,
            methods: {
              list: {
                type: 'image',
                view_data: 'tanda_tangan'
              },
              detail: {
                type: 'image',
                view_data: 'tanda_tangan'
              },
              create: { type: 'file' },
              update: { type: 'file' },
              filter: false
            }
          }
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,
      isLoadingIhsSync: false,
    }
  },
  methods: {
    async syncIhs(data) {
      try {
        const vm = this
        this.isLoadingIhsSync = true
        let payload = {}
  
        payload = {
          uri: 'Practitioner',
          params: {
            identifier: `https://fhir.kemkes.go.id/id/nik|${data.nik_dokter}`
          }
        }
        const find_ihs = await this.$_api.post('ihs/request', payload)
        console.log(find_ihs)
  
        const entry = find_ihs.data.entry
        if (entry && entry.length) {
          // Data exist on satu sehat
          const satu_sehat_id = entry[0].resource.id
          await this.$_api.post('msDokter/update', {
            ...data,
            id: data.ms_dokter_id,
            satu_sehat_id: satu_sehat_id
          })
  
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false
  
          // Refresh data
          vm.$refs['base-crud-tenaga-medis'].$children[1].getData()
          this.$_alert.success('Data telah sync dengan satu sehat')
        } else {
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false
          this.$_alert.error({}, 'Terjadi Kesalahan', "Tenaga medis tidak ditemukan pada satu sehat")
        }
      } catch (error) {
        console.log(error)
        
        // HIDE IHS TOAST
        this.isLoadingIhsSync = false

        this.$_alert.error(error.data, 'Terjadi Kesalahan', error.data.message)
      }
    }
  }
}
</script>
