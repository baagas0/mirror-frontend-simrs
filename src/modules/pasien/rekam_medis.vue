<template lang="">
  <div class="w-100">
    <tas-base-crud ref="base-crud-rekam-medis" :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true">
      <template v-slot:create-form>
        <form-rm />
      </template>
      <template v-slot:update-form="rowData">
        <form-rm />
      </template>

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
      <b-progress class="mt-3" :value="syncCount" :max="1" animated></b-progress>
    </b-toast>
  </div>
</template>

<script>
import FormRm from './rekam_medis_form.vue'
import moment from 'moment'
moment.locale('id')

export default {
  name: 'crud-rekam_medis',
  components: { FormRm },
  data() {
    return {
      config: {
        title: 'Daftar Rekam Medis',
        model_api: 'rekam_medis',
        getter: 'pasien',
        setter: 'pasien',
        custom_api: {
          list: 'pasien/listPerHalamanBypassUri'
        },
        pk_field: 'pasien_id',
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
          // pasien_id
          {
            id: 'pasien_id',
            data: 'pasien_id',
            label: 'pasien_id',
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
          // nama_lengkap
          {
            id: 'nama_lengkap',
            data: 'nama_lengkap',
            label: 'Nama Lengkap',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: {
                class: 'col-12 col-lg-3 col-md-6'
              }
            }
          },
          // jenis_kelamin
          {
            id: 'jenis_kelamin',
            data: 'jenis_kelamin',
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
                type: 'lookup-radio',
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
                type: 'lookup-radio',
                setter: '',
                getter: '',
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
              filter: false
            }
          },
          // tempat_lahir
          {
            id: 'tempat_lahir',
            data: 'tempat_lahir',
            label: 'Tempat Lahir',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // alamat_sekarang
          {
            id: 'alamat_sekarang',
            data: 'alamat_sekarang',
            label: 'Alamat Sekarang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: true
            }
          },
          // alamat_ktp
          {
            id: 'alamat_ktp',
            data: 'alamat_ktp',
            label: 'Alamat KTP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: true
            }
          },
          // agama
          {
            id: 'agama',
            data: 'agama',
            label: 'Agama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
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
                type: 'lookup-radio',
                setter: '',
                getter: '',
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
          // npwp
          {
            id: 'npwp',
            data: 'npwp',
            label: 'NPWP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // createdAt
          {
            id: 'createdAt',
            data: 'createdAt',
            label: 'Nama',
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
            label: 'Nama',
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
            label: 'Nama',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // negara
          {
            id: 'negara',
            data: 'negara',
            label: 'Negara',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'lookup-radio',
                // value: 'Laki-laki',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Indonesia', code: 'Indonesia' },
                    ]
                  }
                }
              },
              update: {
                type: 'lookup-radio',
                setter: '',
                getter: '',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Indonesia', code: 'Indonesia' },
                    ]
                  }
                }
              },
              filter: false
            }
          },
          // bpjs_id
          {
            id: 'bpjs_id',
            data: 'bpjs_id',
            label: 'Kelas BPJS',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { value: 'Kelas 1' },
              update: true,
              filter: false
            }
          },
          // nik
          {
            id: 'nik',
            data: 'nik',
            label: 'NIK',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: {
                class: 'col-12 col-lg-3 col-md-6'
              }
            }
          },
          // perusahaan_tempat_bekerja
          {
            id: 'perusahaan_tempat_bekerja',
            data: 'perusahaan_tempat_bekerja',
            label: 'Perusahaan Tempat Berkerja',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nip
          {
            id: 'nip',
            data: 'nip',
            label: 'NIP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nama_pasangan
          {
            id: 'nama_pasangan',
            data: 'nama_pasangan',
            label: 'Nama Pasangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nama_ayah
          {
            id: 'nama_ayah',
            data: 'nama_ayah',
            label: 'Nama Ayah',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nama_ibu
          {
            id: 'nama_ibu',
            data: 'nama_ibu',
            label: 'Nama Ibu',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: {
                class: 'col-12 col-lg-3 col-md-6'
              }
            }
          },
          // nama_penjamin
          {
            id: 'nama_penjamin',
            data: 'nama_penjamin',
            label: 'Nama Penjamin',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // hubungan_penjamin
          {
            id: 'hubungan_penjamin',
            data: 'hubungan_penjamin',
            label: 'Hubungan Penjamin',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // sc_whatsapp
          {
            id: 'sc_whatsapp',
            data: 'sc_whatsapp',
            label: 'No Whatsapp',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // sc_email
          {
            id: 'sc_email',
            data: 'sc_email',
            label: 'Email',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // dibuat_oleh
          {
            id: 'dibuat_oleh',
            data: 'dibuat_oleh',
            label: 'Dibuat Oleh',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // diperbarui_oleh
          {
            id: 'diperbarui_oleh',
            data: 'diperbarui_oleh',
            label: 'Diperbui Oleh',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // golongan_darah_id
          {
            id: 'golongan_darah_id',
            data: 'golongan_darah_id',
            label: 'Golongan Darah',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_golongan_darah' },
              detail: { view_data: 'nama_golongan_darah' },
              create: {
                setter: 'msGolonganDarah',
                getter: 'msGolonganDarah',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_golongan_darah',
                    code: 'id',
                    display: ['nama_golongan_darah']
                  }
                }
              },
              update: {
                setter: 'msGolonganDarah',
                getter: 'msGolonganDarah',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_golongan_darah',
                    code: 'id',
                    display: ['nama_golongan_darah']
                  }
                }
              },
              filter: false
            }
          },
          // nama_golongan_darah
          {
            id: 'nama_golongan_darah',
            data: 'nama_golongan_darah',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // keterangan_golongan_darah
          {
            id: 'keterangan_golongan_darah',
            data: 'keterangan_golongan_darah',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // pekerjaan_id
          {
            id: 'pekerjaan_id',
            data: 'pekerjaan_id',
            label: 'Nama Pekerjaan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_pekerjaan' },
              detail: { view_data: 'nama_pekerjaan' },
              create: {
                setter: 'msPekerjaan',
                getter: 'msPekerjaan',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_pekerjaan',
                    code: 'id',
                    display: ['nama_pekerjaan']
                  }
                }
              },
              update: {
                setter: 'msPekerjaan',
                getter: 'msPekerjaan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_pekerjaan',
                    code: 'id',
                    display: ['nama_pekerjaan']
                  }
                }
              },
              filter: false
            }
          },
          // pendidikan_id
          {
            id: 'pendidikan_id',
            data: 'pendidikan_id',
            label: 'Pendidikan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_pendidikan' },
              detail: { view_data: 'nama_pendidikan' },
              create: {
                setter: 'msPendidikan',
                getter: 'msPendidikan',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_pendidikan',
                    code: 'id',
                    display: ['nama_pendidikan']
                  }
                }
              },
              update: {
                setter: 'msPendidikan',
                getter: 'msPendidikan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_pendidikan',
                    code: 'id',
                    display: ['nama_pendidikan']
                  }
                }
              },
              filter: false
            }
          },
          // etnis_id
          {
            id: 'etnis_id',
            data: 'etnis_id',
            label: 'Suku',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_etnis' },
              detail: { view_data: 'nama_etnis' },
              create: {
                setter: 'msEtnis',
                getter: 'msEtnis',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_etnis',
                    code: 'id',
                    display: ['nama_etnis']
                  }
                }
              },
              update: {
                setter: 'msEtnis',
                getter: 'msEtnis',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_etnis',
                    code: 'id',
                    display: ['nama_etnis']
                  }
                }
              },
              filter: false
            }
          },
          // nama_etnis
          {
            id: 'nama_etnis',
            data: 'nama_etnis',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // kunjungan_pertama
          {
            id: 'kunjungan_pertama',
            data: 'kunjungan_pertama',
            label: 'Kunjungan pertama',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: false
            }
          },
          // no_rm
          {
            id: 'no_rm',
            data: 'no_rm',
            label: 'No Rekam Medis',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6'
              }
            }
          },
          // no_telepon
          {
            id: 'no_telepon',
            data: 'no_telepon',
            label: 'No Telepon',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // no_asuransi_pasien
          {
            id: 'no_asuransi_pasien',
            data: 'no_asuransi_pasien',
            label: 'No Asuransi Pasien',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: {
                class: 'col-12 col-lg-3 col-md-6'
              }
            }
          },
          // tgl_lahir
          {
            id: 'tgl_lahir',
            data: 'tgl_lahir',
            label: 'Tanggal Lahir',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: false
            }
          },
          // provinsi_id
          {
            id: 'provinsi_id',
            data: 'provinsi_id',
            label: 'Provinsi',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_provinsi' },
              detail: { view_data: 'nama_provinsi' },
              create: {
                view_data: 'nama_provinsi',
                setter: 'provinsi',
                getter: 'provinsi',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_provinsi',
                    code: 'id',
                    display: ['nama_provinsi']
                  }
                }
              },
              update: {
                setter: 'provinsi',
                getter: 'provinsi',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_provinsi',
                    code: 'id',
                    display: ['nama_provinsi']
                  }
                }
              },
              filter: false
            }
          },
          // kota_id
          {
            id: 'kota_id',
            data: 'kota_id',
            label: 'Kota',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kota' },
              detail: { view_data: 'nama_kota' },
              create: {
                setter: 'kota',
                getter: 'kota',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_kota',
                    code: 'kota_id',
                    display: ['nama_kota']
                  },
                  get_param: [
                    {
                      'id': 'provinsi_id',
                      'halaman': '1',
                      'jumlah': '10'
                    }
                  ]
                }
              },
              update: {
                setter: 'kota',
                getter: 'kota',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kota',
                    code: 'kota_id',
                    display: ['nama_kota']
                  },
                  get_param: [
                    {
                      'id': 'provinsi_id',
                      'halaman': '1',
                      'jumlah': '10'
                    }
                  ]
                }
              },
              filter: false
            }
          },
          // kecamatan_id
          {
            id: 'kecamatan_id',
            data: 'kecamatan_id',
            label: 'Kecamatan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kecamatan' },
              detail: { view_data: 'nama_kecamatan' },
              create: {
                setter: 'kecamatan',
                getter: 'kecamatan',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_kecamatan',
                    code: 'kecamatan_id',
                    display: ['nama_kecamatan']
                  },
                  get_param: [
                    {
                      'id': 'kota_id',
                      'halaman': '1',
                      'jumlah': '10'
                    }
                  ]
                }
              },
              update: {
                setter: 'kecamatan',
                getter: 'kecamatan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kecamatan',
                    code: 'kecamatan_id',
                    display: ['nama_kecamatan']
                  },
                  get_param: [
                    {
                      'id': 'kota_id',
                      'halaman': '1',
                      'jumlah': '10'
                    }
                  ]
                }
              },
              filter: false
            }
          },
          // kelurahan_id
          {
            id: 'kelurahan_id',
            data: 'kelurahan_id',
            label: 'Kelurahan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_kelurahan' },
              detail: { view_data: 'nama_kelurahan' },
              create: {
                setter: 'kelurahan',
                getter: 'kelurahan',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_kelurahan',
                    code: 'kelurahan_id',
                    display: ['nama_kelurahan']
                  },
                  get_param: [
                    {
                      'id': 'kecamatan_id',
                      'halaman': '1',
                      'jumlah': '10'
                    }
                  ]
                }
              },
              update: {
                setter: 'kelurahan',
                getter: 'kelurahan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_kelurahan',
                    code: 'kelurahan_id',
                    display: ['nama_kelurahan']
                  },
                  get_param: [
                    {
                      'id': 'kecamatan_id',
                      'halaman': '1',
                      'jumlah': '10'
                    }
                  ]
                }
              },
              filter: false
            }
          },
          // keterangan_etnis
          {
            id: 'keterangan_etnis',
            data: 'keterangan_etnis',
            label: 'Keterangan Etnis',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_pekerjaan
          {
            id: 'nama_pekerjaan',
            data: 'nama_pekerjaan',
            label: 'Nama Pekerjaan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // keterangan_pekerjaan
          {
            id: 'keterangan_pekerjaan',
            data: 'keterangan_pekerjaan',
            label: 'Keterangan Pekerjaan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_pendidikan
          {
            id: 'nama_pendidikan',
            data: 'nama_pendidikan',
            label: 'Nama Pendidikan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // keterangan_pendidikan
          {
            id: 'keterangan_pendidikan',
            data: 'keterangan_pendidikan',
            label: 'Keterangan Pendidikan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // status_pasien
          {
            id: 'status_pasien',
            data: 'status_pasien',
            label: 'Status Pasien',
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
                type: 'lookup-radio',
                value: '1',
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
              update: {
                type: 'lookup-radio',
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
                view_data: 'active',
                type: 'lookup-radio',
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
      },
      filterView: true,
      hideFilter: false,
      isLoadingIhsSync: false,
      syncCount: 0,
    }
  },
  methods: {
    async syncIhs(data) {
      try {
        const vm = this
        this.isLoadingIhsSync = true
        let payload = {}
  
        payload = {
          uri: 'Patient',
          params: {
            identifier: `https://fhir.kemkes.go.id/id/nik|${data.nik}`
          }
        }
        const find_ihs = await this.$_api.post('ihs/request', payload)
        console.log(find_ihs)
  
        const entry = find_ihs.data.entry
        if (entry && entry.length) {
          // Data exist on satu sehat
          const satu_sehat_id = entry[0].resource.id
          await this.$_api.post('pasien/update', {
            ...data,
            id: data.pasien_id,
            satu_sehat_id: satu_sehat_id
          })
  
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false
  
          // Refresh data
          vm.$refs['base-crud-rekam-medis'].$children[1].getData()
          this.$_alert.success('Data telah sync dengan satu sehat')
        } else {
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false
          this.$_alert.error({}, 'Terjadi Kesalahan', "Rekam medis tidak ditemukan pada satu sehat")
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
