<template lang="">
  <div class="d-flex flex-column w-100">
    <div class="w-100 py-4 px-8">

      <div class="nav flex-row nav-pills bg-white rounded justify-content-center py-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <div v-for="(item, index) in tab" :key="index" :class="['nav-link', currentTab === item.index ? 'active' : '']" :id="'v-pills-' + item.name + '-tab'" data-toggle="pill" role="tab" aria-controls="'v-pills-' + item.name" aria-selected="true" @click="changeTab(item)" class="cursor-pointer">
          {{ item.name }}
        </div>
      </div>
    </div>
    <tas-base-crud :config="configRefDiagnosa" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 0" />
    <tas-base-crud :config="configRefPoliklinik" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 1" />
    <tas-base-crud :config="configRefFaskes" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 2" />
    <tas-base-crud :config="configDokterDPJP" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 3" />
    <tas-base-crud :config="configDiagnosaProgramPRB" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 4" />
    <tas-base-crud :config="configObatGenerikProgramPRB" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 5" />
    <tas-base-crud :config="configRefTindakan" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 6" />
    <tas-base-crud :config="configKelasRawat" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 7" />
    <tas-base-crud :config="configRefDokter" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 8" />
    <tas-base-crud :config="configRefProvinsi" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 9" />
    <tas-base-crud :config="configRefKabupaten" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 10" />
    <tas-base-crud :config="configRefKecamatan" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" v-if="currentTab === 11" />
    <tas-base-crud :config="configRefSpesialistik" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 12" />
    <tas-base-crud :config="configRefRuangRawat" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 13" />
    <tas-base-crud :config="configRefCaraKeluar" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 14" />
    <tas-base-crud :config="configRefPascapulang" :filterView="false" :hideFilter="true" :hideGlobalSearch="true" v-if="currentTab === 15" />
    <tas-base-crud :config="configRefSpesialistikRujukan" :filterView="true" :hideFilter="false" :hideGlobalSearch="true" v-if="currentTab === 16" />
    <tas-base-crud :config="configRefSaranaRujukan" :filterView="true" :hideFilter="false" :hideGlobalSearch="true" v-if="currentTab === 17" />
  </div>
</template>

<script>
export default {
  name: 'vclaim-referensi',
  data() {
    return {
      configRefDiagnosa: {
        title: 'Referensi Diagnosa',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getDiagnosaBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama diagnosa',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                validation: ['required'],
              }
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefPoliklinik: {
        title: 'Referensi Poliklinik',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getPoliBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama poliklinik',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
              }
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefFaskes: {
        title: 'Referensi Fasilitas Kesehatan',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getFaskesKesehatanBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama faskes',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
              }
            }
          },
          // kode
          {
            id: 'jenisFaskes',
            data: 'jenisFaskes',
            label: 'Jenis Faskes',
            placeholder: '1 / 2',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Puskesmas / Klinik', code: '1' },
                      { label: 'Rumah Sakit', code: '2' }
                    ],
                    display: ['label', 'code'],
                    headerDisplay: ['Nama', 'Kode']
                  }
                }
              },
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configDokterDPJP: {
        title: 'Referensi Dokter DPJP',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getDokterDPJPBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // jenisPelayanan
          {
            id: 'jenisPelayanan',
            data: 'jenisPelayanan',
            label: 'Jenis Pelayanan',
            placeholder: '1: Rawat Inap / 2: Rawat Jalan',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Rawat Inap', code: '1' },
                      { label: 'Rawat Jalan', code: '2' }
                    ],
                    display: ['label', 'code'],
                    headerDisplay: ['Nama', 'Kode']
                  }
                }
              },
            }
          },
          // tglPelayanan
          {
            id: 'tglPelayanan',
            data: 'tglPelayanan',
            label: 'Tanggal Pelayanan',
            placeholder: 'Pilih Tanggal Pelayanan',
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                type: 'date',
              }
            }
          },
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama dokter',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
              }
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configDiagnosaProgramPRB: {
        title: 'Referensi Diagnosa Program PRB',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getDiagnosaProgramPRBBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama diagnosa',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configObatGenerikProgramPRB: {
        title: 'Referensi Obat Generik Program PRB',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getObatGenerikProgramPRBBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'namaObat',
            data: 'namaObat',
            label: 'Nama Obat',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
              }
            }
          },
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama obat',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefTindakan: {
        title: 'Referensi Tindakan',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getTindakanBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama prosedur tindakan',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
              }
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configKelasRawat: {
        title: 'Referensi Kelas Rawat',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getKelasRawatBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: 'Kode / nama kelas rawat',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefDokter: {
        title: 'Referensi Dokter',
        model_api: 'rekam_medis',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getDokterBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama dokter',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
              }
            }
          },
        ]
      },
      configRefProvinsi: {
        title: 'Referensi Provinsi',
        getter: 'wilayah',
        setter: 'wilayah',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getPropinsiBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama provinsi',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefKabupaten: {
        title: 'Referensi Kabupaten',
        getter: 'wilayah',
        setter: 'wilayah',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getKabupatenBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // kode
          {
            id: 'kodePropinsi',
            data: 'kodePropinsi',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                setter: 'bpjs/vclaim/refrensi/getPropinsiBypassUri',
                getter: 'bpjs/vclaim/refrensi/getPropinsiBypassUri',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama',
                    code: 'kode',
                    display: ['nama', 'kode'],
                    headerDisplay: ['Nama', 'Kode']
                  },
                }
              }
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama kabupaten',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefKecamatan: {
        title: 'Referensi Kecamatan',
        getter: 'wilayah',
        setter: 'wilayah',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getKecamatanBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // kode
          {
            id: 'kodePropinsi',
            data: 'kodePropinsi',
            label: 'Provinsi',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                setter: 'bpjs/vclaim/refrensi/getPropinsiBypassUri',
                getter: 'bpjs/vclaim/refrensi/getPropinsiBypassUri',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama',
                    code: 'kode',
                    display: ['nama', 'kode'],
                    headerDisplay: ['Nama', 'Kode']
                  },
                }
              }
            }
          },
          // kode
          {
            id: 'kodeKabupaten',
            data: 'kodeKabupaten',
            label: 'Kabupaten',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                validation: ['required'],
                setter: 'bpjs/vclaim/refrensi/getKabupatenBypassUri',
                getter: 'bpjs/vclaim/refrensi/getKabupatenBypassUri',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama',
                    code: 'kode',
                    display: ['nama', 'kode'],
                    headerDisplay: ['Nama', 'Kode']
                  },
                  get_param: [
                    {
                      'id': 'kodePropinsi',
                    }
                  ]
                }
              }
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama kecamatan',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefSpesialistik: {
        title: 'Referensi Spesialistik',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getSpesialistikBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: true,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama spesialistik',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefRuangRawat: {
        title: 'Referensi Ruang Rawat',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getRuangrawatBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: true,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama ruang rawat',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefCaraKeluar: {
        title: 'Referensi Cara Keluar',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getCarakeluarBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: true,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama cara keluar',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefPascapulang: {
        title: 'Referensi Pascapulang',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/refrensi/getPascapulangBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: true,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          {
            id: 'kode',
            data: 'kode',
            label: 'Kode',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: 'Nama pascapulang',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      configRefSpesialistikRujukan: {
        title: 'Referensi Spesialistik',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/rujukan/getSpesialistikRujukanBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: true,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          // kode
          // kodePPK, tglrujukan
          {
            id: 'kodePPK',
            data: 'kodePPK',
            label: 'Kode PPK Rujukan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                validation: ['required'],
                class: 'col-12 col-lg-3 col-md-6',
                type: 'text'
              }
            }
          },
          {
            id: 'tglrujukan',
            data: 'tglrujukan',
            label: 'Tanggal Rujukan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                validation: ['required'],
                class: 'col-12 col-lg-3 col-md-6',
                type: 'date',
              }
            }
          },
          {
            id: 'kodeSpesialis',
            data: 'kodeSpesialis',
            label: 'Kode Spesialistik',
            placeholder: 'Kode Spesialistik',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
          {
            id: 'namaSpesialis',
            data: 'namaSpesialis',
            label: 'Nama Spesialistik',
            placeholder: 'Nama Spesialistik',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
          {
            id: 'kapasitas',
            data: 'kapasitas',
            label: 'Kapasitas',
            placeholder: 'Kapasitas',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
          {
            id: 'jumlahRujukan',
            data: 'jumlahRujukan',
            label: 'Jumlah Rujukan',
            placeholder: 'Jumlah Rujukan',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
          {
            id: 'persentase',
            data: 'persentase',
            label: 'Persentase',
            placeholder: 'Persentase',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
        ]
      },
      configRefSaranaRujukan: {
        title: 'Referensi Sarana Rujukan',
        getter: 'bpjs',
        setter: 'bpjs',
        custom_api: {
          list: 'bpjs/vclaim/rujukan/getSaranaBypassUri'
        },
        pk_field: 'kode',
        frontendPaginate: false,
        optionalProps: {
          isNotifiedGet: true,
        },
        permission: {
          create: false,
          read: true,
          update: false,
          delete: false
        },
        slave: [],
        fields: [
          {
            id: 'kodePPKrujuk',
            data: 'kodePPKrujuk',
            label: 'Kode PPK Rujukan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                validation: ['required'],
                class: 'col-12 col-lg-3 col-md-6',
                type: 'text'
              }
            }
          },
          {
            id: 'kodeSarana',
            data: 'kodeSarana',
            label: 'Kode Sarana',
            placeholder: 'Kode Sarana',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
          {
            id: 'namaSarana',
            data: 'namaSarana',
            label: 'Nama Sarana',
            placeholder: 'Nama Sarana',
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            },
          },
        ]
      },
      filterView: true,
      hideFilter: false,
      currentTab: 0,
      tab: [
        {
          index: 0,
          name: 'Diagnosa',
        },
        {
          index: 1,
          name: 'Poliklinik',
        },
        {
          index: 2,
          name: 'Faskes Kesehatan',
        },
        {
          index: 3,
          name: 'Dokter DPJP',
        },
        {
          index: 4,
          name: 'Diagnosa Program PRB',
        },
        {
          index: 5,
          name: 'Obat Generik Program PRB',
        },
        {
          index: 6,
          name: 'Tindakan',
        },
        {
          index: 7,
          name: 'Kelas Rawat',
        },
        {
          index: 8,
          name: 'Dokter',
        },
        {
          index: 9,
          name: 'Provinsi',
        },
        {
          index: 10,
          name: 'Kabupaten',
        },
        {
          index: 11,
          name: 'Kecamatan',
        },
        {
          index: 12,
          name: 'Spesialistik',
        },
        {
          index: 13,
          name: 'Ruang Rawat',
        },
        {
          index: 14,
          name: 'Cara Keluar',
        },
        {
          index: 15,
          name: 'Pascapulang',
        },
        {
          index: 16,
          name: 'Spesialistik Rujukan',
        },
        {
          index: 17,
          name: 'Sarana Rujukan',
        },
      ]
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab.index
    }
  }
}
</script>