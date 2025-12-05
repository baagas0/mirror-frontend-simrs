<template>
  <div class="animated">
    <div class="card card-custom mb-5">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column justify-content-center">
          <span class="card-label font-weight-bolder text-dark">Formulir tambah data Daftar Rekam Medis</span>
        </h3>
        <div class="card-toolbar">
          <a class="btn btn-outline-primary btn-icon btn-circle" @click="$router.push({query:{ view: 'list' }})">
            <i class="ri-arrow-go-back-line p-0"></i>
          </a>
        </div>
      </div>
      <div class="card-body py-2 mt-3">
        <!-- <pre>{{ fields }}</pre> -->

        <div class="card mb-7" v-if="!$route.query.id">
          <div class="card-body">
            <div class="row">
              <div class="col-6 mb-4">
                <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                  <template v-slot:label>
                    NIK
                  </template>
                </b-form-group>
                <b-input-group>
                  <b-form-input v-model='no_identitas' type='text' :placeholder="'NIK'" ></b-form-input>

                  <b-input-group-append>
                    <b-button variant="info" @click="getPesertaByNoKartu(no_identitas, 'nik')">Cek BPJS Berdasarkan NIK</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>

            <!-- <pre>{{ peserta }}</pre> -->
          </div>
        </div>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
            <div class="row">
              <!--               
              <div class="col-6 mb-4">
                <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                  <template v-slot:label>
                    NIK
                  </template>
                </b-form-group>
                <b-input-group>
                  <b-form-input v-model='no_identitas' type='text' :placeholder="'NIK'" ></b-form-input>

                  <b-input-group-append>
                    <b-button variant="info" @click="getPesertaByNoKartu(no_identitas, 'nik')">Cari Identitas</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div> -->

              <!-- <div class="col-12">
                <hr>
              </div> -->

              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.no_rm" :item="{
                  'id': 'no_rm',
                  'data': 'no_rm',
                  'label': 'No RM',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'no_rm',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>

              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nik" :item="{
                  'id': 'nik',
                  'data': 'nik',
                  'label': 'NIK',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nik',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': ['required'],
                  'value': null
                }" :disabled="false" />
              </div>
              
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nama_lengkap" :item="{
                  'id': 'nama_lengkap',
                  'data': 'nama_lengkap',
                  'label': 'Nama Lengkap',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nama_lengkap',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.jenis_kelamin" :item="{
                  'id': 'jenis_kelamin',
                  'data': 'jenis_kelamin',
                  'label': 'Jenis Kelamin',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'jenis_kelamin',
                  'permission': 'template-allow-all',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'label',
                      'code': 'code',
                      'list': [
                        {
                          'label': 'Laki-laki',
                          'code': 'L'
                        },
                        {
                          'label': 'Perempuan',
                          'code': 'P'
                        }
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.tempat_lahir" :item="{
                  'id': 'tempat_lahir',
                  'data': 'tempat_lahir',
                  'label': 'Tempat Lahir',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'tempat_lahir',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.alamat_sekarang" :item="{
                  'id': 'alamat_sekarang',
                  'data': 'alamat_sekarang',
                  'label': 'Alamat Sekarang',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'alamat_sekarang',
                  'permission': 'template-allow-all',
                  'type': 'textarea',
                  'class': '',
                  'attr': null,
                  'validation': []
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.alamat_ktp" :item="{
                  'id': 'alamat_ktp',
                  'data': 'alamat_ktp',
                  'label': 'Alamat KTP',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'alamat_ktp',
                  'permission': 'template-allow-all',
                  'type': 'textarea',
                  'class': '',
                  'attr': null,
                  'validation': []
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.agama" :item="{
                  'id': 'agama',
                  'data': 'agama',
                  'label': 'Agama',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'agama',
                  'permission': 'template-allow-all',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'label',
                      'code': 'code',
                      'list': [
                        {
                          'label': 'Islam',
                          'code': 'Islam'
                        },
                        {
                          'label': 'Kristen',
                          'code': 'Kristen'
                        },
                        {
                          'label': 'Hindu',
                          'code': 'Hindu'
                        },
                        {
                          'label': 'Katolik',
                          'code': 'Katolik'
                        },
                        {
                          'label': 'Budha',
                          'code': 'Budha'
                        },
                        {
                          'label': 'Konghucu',
                          'code': 'Konghucu'
                        }
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.npwp" :item="{
                  'id': 'npwp',
                  'data': 'npwp',
                  'label': 'NPWP',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'npwp',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.negara" :item="{
                  'id': 'negara',
                  'data': 'negara',
                  'label': 'Negara',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'negara',
                  'permission': 'template-allow-all',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'label',
                      'code': 'code',
                      'list': [
                        {
                          'label': 'Indonesia',
                          'code': 'Indonesia'
                        },
                        {
                          'label': 'WNA',
                          'code': 'WNA'
                        }
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.bpjs_id" :item="{
                  'id': 'bpjs_id',
                  'data': 'bpjs_id',
                  'label': 'Kelas BPJS',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'bpjs_id',
                  'permission': 'template-allow-all',
                  'value': null,
                  'setter': 'kelasKunjungan',
                  'getter': 'kelasKunjungan',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_kelas_kunjungan',
                      'code': 'nama_kelas_kunjungan',
                      'display': [
                        'nama_kelas_kunjungan',
                        'keterangan_kelas_kunjungan'
                      ],
                      'headerDisplay': [
                        'Nama',
                        'Keterangan'
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.perusahaan_tempat_bekerja" :item="{
                  'id': 'perusahaan_tempat_bekerja',
                  'data': 'perusahaan_tempat_bekerja',
                  'label': 'Perusahaan Tempat Berkerja',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'perusahaan_tempat_bekerja',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nip" :item="{
                  'id': 'nip',
                  'data': 'nip',
                  'label': 'NIP',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nip',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nama_pasangan" :item="{
                  'id': 'nama_pasangan',
                  'data': 'nama_pasangan',
                  'label': 'Nama Pasangan',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nama_pasangan',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nama_ayah" :item="{
                  'id': 'nama_ayah',
                  'data': 'nama_ayah',
                  'label': 'Nama Ayah',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nama_ayah',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nama_ibu" :item="{
                  'id': 'nama_ibu',
                  'data': 'nama_ibu',
                  'label': 'Nama Ibu',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nama_ibu',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.nama_penjamin" :item="{
                  'id': 'nama_penjamin',
                  'data': 'nama_penjamin',
                  'label': 'Nama Penjamin',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nama_penjamin',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.hubungan_penjamin" :item="{
                  'id': 'hubungan_penjamin',
                  'data': 'hubungan_penjamin',
                  'label': 'Hubungan Penjamin',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'hubungan_penjamin',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.sc_whatsapp" :item="{
                  'id': 'sc_whatsapp',
                  'data': 'sc_whatsapp',
                  'label': 'No Whatsapp',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'sc_whatsapp',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.sc_email" :item="{
                  'id': 'sc_email',
                  'data': 'sc_email',
                  'label': 'Email',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'sc_email',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.golongan_darah_id" :item="{
                  'id': 'golongan_darah_id',
                  'data': 'golongan_darah_id',
                  'label': 'Golongan Darah',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'golongan_darah_id',
                  'permission': 'template-allow-all',
                  'setter': 'msGolonganDarah',
                  'getter': 'msGolonganDarah',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_golongan_darah',
                      'code': 'id',
                      'display': [
                        'nama_golongan_darah'
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.pekerjaan_id" :item="{
                  'id': 'pekerjaan_id',
                  'data': 'pekerjaan_id',
                  'label': 'Nama Pekerjaan',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'pekerjaan_id',
                  'permission': 'template-allow-all',
                  'setter': 'msPekerjaan',
                  'getter': 'msPekerjaan',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_pekerjaan',
                      'code': 'id',
                      'display': [
                        'nama_pekerjaan'
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.pendidikan_id" :item="{
                  'id': 'pendidikan_id',
                  'data': 'pendidikan_id',
                  'label': 'Pendidikan',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'pendidikan_id',
                  'permission': 'template-allow-all',
                  'setter': 'msPendidikan',
                  'getter': 'msPendidikan',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_pendidikan',
                      'code': 'id',
                      'display': [
                        'nama_pendidikan'
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.etnis_id" :item="{
                  'id': 'etnis_id',
                  'data': 'etnis_id',
                  'label': 'Suku',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'etnis_id',
                  'permission': 'template-allow-all',
                  'setter': 'msEtnis',
                  'getter': 'msEtnis',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_etnis',
                      'code': 'id',
                      'display': [
                        'nama_etnis'
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
<!--     
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.kunjungan_pertama" :item="{
                  'id': 'kunjungan_pertama',
                  'data': 'kunjungan_pertama',
                  'label': 'Kunjungan pertama',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'kunjungan_pertama',
                  'permission': 'template-allow-all',
                  'type': 'date',
                  'class': '',
                  'attr': null,
                  'validation': []
                }" :disabled="false" />
              </div> -->
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.no_telepon" :item="{
                  'id': 'no_telepon',
                  'data': 'no_telepon',
                  'label': 'No Telepon',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'no_telepon',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.no_asuransi_pasien" :item="{
                  'id': 'no_asuransi_pasien',
                  'data': 'no_asuransi_pasien',
                  'label': 'No Asuransi Pasien',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'no_asuransi_pasien',
                  'permission': 'template-allow-all',
                  'type': 'text',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'value': null
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.tgl_lahir" :item="{
                  'id': 'tgl_lahir',
                  'data': 'tgl_lahir',
                  'label': 'Tanggal Lahir',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'tgl_lahir',
                  'permission': 'template-allow-all',
                  'type': 'date',
                  'class': '',
                  'attr': null,
                  'validation': []
                }" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.provinsi_id" :item="{
                  'id': 'provinsi_id',
                  'data': 'provinsi_id',
                  'label': 'Provinsi',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'nama_provinsi',
                  'permission': 'template-allow-all',
                  'setter': 'provinsi',
                  'getter': 'provinsi',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_provinsi',
                      'code': 'id',
                      'display': [
                        'nama_provinsi'
                      ]
                    }
                  }
                }" @input="handleLocation(1)" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.kota_id" :item="{
                  'id': 'kota_id',
                  'data': 'kota_id',
                  'label': 'Kota',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'kota_id',
                  'permission': 'template-allow-all',
                  'setter': 'kota',
                  'getter': 'kota',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_kota',
                      'code': 'kota_id',
                      'display': [
                        'nama_kota'
                      ]
                    },
                    'get_param': [
                      {
                        'provinsi_id': fields.provinsi_id,
                        'halaman': '1',
                        'jumlah': '10'
                      }
                    ]
                  }
                }" @input="handleLocation(2)" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.kecamatan_id" :item="{
                  'id': 'kecamatan_id',
                  'data': 'kecamatan_id',
                  'label': 'Kecamatan',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'kecamatan_id',
                  'permission': 'template-allow-all',
                  'setter': 'kecamatan',
                  'getter': 'kecamatan',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_kecamatan',
                      'code': 'kecamatan_id',
                      'display': [
                        'nama_kecamatan'
                      ]
                    },
                    'get_param': [
                      {
                        'kota_id': fields.kota_id,
                        'halaman': '1',
                        'jumlah': '10'
                      }
                    ]
                  }
                }" @input="handleLocation(3)" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.kelurahan_id" :item="{
                  'id': 'kelurahan_id',
                  'data': 'kelurahan_id',
                  'label': 'Kelurahan',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'kelurahan_id',
                  'permission': 'template-allow-all',
                  'setter': 'kelurahan',
                  'getter': 'kelurahan',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'nama_kelurahan',
                      'code': 'kelurahan_id',
                      'display': [
                        'nama_kelurahan'
                      ]
                    },
                    'get_param': [
                      {
                        'kecamatan_id': fields.kecamatan_id,
                        'halaman': '1',
                        'jumlah': '10'
                      }
                    ]
                  }
                }" @input="handleLocation(4)" :disabled="false" />
              </div>
    
              <div class="col-12">
                <s-input groupClass="mb-0" v-model="fields.status_pasien" :item="{
                  'id': 'status_pasien',
                  'data': 'status_pasien',
                  'label': 'Status Pasien',
                  'placeholder': null,
                  'hint': null,
                  'show': true,
                  'view_data': 'active',
                  'permission': 'template-allow-all',
                  'type': 'lookup-radio',
                  'class': '',
                  'attr': null,
                  'value': '1',
                  'validation': [],
                  'option': {
                    'list_pointer': {
                      'label': 'label',
                      'code': 'code',
                      'list': [
                        {
                          'label': 'Aktif',
                          'code': 1
                        },
                        {
                          'label': 'Non Aktif',
                          'code': 0
                        }
                      ]
                    }
                  }
                }" :disabled="false" />
              </div>
            </div>

            <div class="d-flex justify-content-between py-5">
              <div>
                <button type="submit" class="btn btn-primary mr-3">
                  <i class="ri-save-line"></i>
                  Simpan
                </button>
              </div> 
            </div>
          </form>
        </ValidationObserver>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'crud-rekam_medis-form',
  props: {
    // fields: {
    //   type: Object, required: false, default() {
    //     return 
    //   }
    // },
  },
  data() {
    return {
      no_identitas: '',
      peserta: {},
      fields: {
        no_rm: '',
        nama_lengkap: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        alamat_sekarang: '',
        alamat_ktp: '',
        agama: '',
        npwp: '',
        negara: '',
        bpjs_id: '',
        nik: '',
        perusahaan_tempat_bekerja: '',
        nip: '',
        nama_pasangan: '',
        nama_ayah: '',
        nama_ibu: '',
        nama_penjamin: '',
        hubungan_penjamin: '',
        sc_whatsapp: '',
        sc_email: '',
        golongan_darah_id: '',
        pekerjaan_id: '',
        pendidikan_id: '',
        etnis_id: '',
        // kunjungan_pertama: null,
        no_telepon: '',
        no_asuransi_pasien: '',
        tgl_lahir: '',
        provinsi_id: '',
        kota_id: '',
        kecamatan_id: '',
        kelurahan_id: '',
        status_pasien: '',
      }
    }
  },
  mounted() {
    if (this.$route.query.id) this.findData()
    else this.findNoRm()
  },
  watch: {
    // 'fields.provinsi_id': {
    //   handler (to, from) {
    //     if (to !== from) this.fields.kota_id = ''
    //   }
    // },

    // 'fields.kota_id': {
    //   handler (to, from) {
    //     if (to !== from) this.fields.kecamatan_id = ''
    //   }
    // },

    // 'fields.kecamatan_id': {
    //   handler (to, from) {
    //     if (to !== from) this.fields.kelurahan_id = ''
    //   }
    // },
  },
  methods: {
    findNoRm() {
      this.$_api.post('pasien/getRmTerakhir').then((res) => {
        let rm_terakhir = res.data.no_rm
        if (rm_terakhir.length !== 8) rm_terakhir = '00-00-00'
        // console.log('rm_terakhir', rm_terakhir, rm_terakhir.length)

        const new_rm = this.incrementNumber(rm_terakhir)
        this.fields.no_rm = new_rm
      }).catch((err) => {
        this.$_alert.error(err)
        console.log(err)
      })
    },
    incrementNumber(previousNumber) {
      // Parsing angka dari parameter sebelumnya
      const [leftDigits, middleDigits, rightDigits] = previousNumber.split('-').map(Number);

      let newLeftDigits = leftDigits;
      let newMiddleDigits = middleDigits;
      let newRightDigits = rightDigits + 1;

      if (newRightDigits > 99) {
        newRightDigits = 0;
        newMiddleDigits++;

        if (newMiddleDigits > 99) {
          newMiddleDigits = 0;
          newLeftDigits++;

          if (newLeftDigits > 99) {
            // Jika angka pada digit kiri melebihi 99, Anda dapat menangani kondisi ini sesuai kebutuhan.
            console.log('Angka pada digit kiri melebihi 99.');
            return;
          }
        }
      }

      // Format angka sesuai dengan kebutuhan (menggunakan fungsi padStart untuk menambahkan nol di depan angka jika kurang dari 10).
      const formattedNumber = `${newLeftDigits.toString().padStart(2, '0')}-${newMiddleDigits.toString().padStart(2, '0')}-${newRightDigits.toString().padStart(2, '0')}`;

      console.log(formattedNumber);
      return formattedNumber
    },
    getPesertaByNoKartu(no_identitas, tipe = 'bpjs') {
      console.log(no_identitas, 'getPesertaByNoKartu');
      let vm = this;
      if (no_identitas) {
        this.$_api.post('bpjs/vclaim/peserta/getPesertaByNoKartu', { noKartu: no_identitas, jenis: tipe }).then( async (res) => {
          if ((res.data && res.data.length === 0 && res.data[0].peserta) || res.status !== 200) {
            // console.error({}, 'Data tidak ditemukan')
            vm.$_alert.confirm('Data tidak ditemukan')
            return
          } else{

          }

          const peserta = res.data[0].peserta
          console.log(peserta)
          this.peserta = peserta

          this.fields.nama_lengkap = peserta.nama
          this.fields.jenis_kelamin = peserta.sex
          this.fields.tempat_lahir = ''
          this.fields.alamat_sekarang = ''
          this.fields.alamat_ktp = ''
          this.fields.agama = ''
          this.fields.npwp = ''
          this.fields.negara = 'Indonesia'
          // this.fields.bpjs_id = peserta.hakKelas.kode
          this.fields.nik = peserta.nik
          this.fields.perusahaan_tempat_bekerja = ''
          this.fields.nip = ''
          this.fields.nama_pasangan = ''
          this.fields.nama_ayah = ''
          this.fields.nama_ibu = ''
          this.fields.nama_penjamin = ''
          this.fields.hubungan_penjamin = ''
          this.fields.sc_whatsapp = peserta.mr.noTelepon
          this.fields.sc_email = ''
          this.fields.golongan_darah_id = null
          this.fields.pekerjaan_id = null
          this.fields.pendidikan_id = null
          this.fields.etnis_id = null
          // this.fields.kunjungan_pertama = ''
          this.fields.no_telepon = peserta.mr.noTelepon
          this.fields.no_asuransi_pasien = peserta.noKartu
          this.fields.tgl_lahir = peserta.tglLahir
          this.fields.provinsi_id = null
          this.fields.kota_id = null
          this.fields.kecamatan_id = null
          this.fields.kelurahan_id = null
          this.fields.status_pasien = 1
          
          console.log(this.fields)

          const res_kelas_kunjungan = await this.$_api.post('kelasKunjungan/list', { kode_kelas_kunjungan: peserta.hakKelas.kode })
          if(res_kelas_kunjungan.data && res_kelas_kunjungan.data.length) this.fields.bpjs_id = res_kelas_kunjungan.data[0].kelas_kunjungan_id

          this.$_alert.success('Identitas berhasil ditemukan.')
        }).catch((err) => {
          this.$_alert.error(err)
          console.error(err)
        })
      }
    },
    handleLocation(level = 0) {
      const el = [
        'provinsi_id',
        'kota_id',
        'kecamatan_id',
        'kelurahan_id',
      ]

      for (let i = level; i < el.length; i++) {
        const f = el[i];
        this.fields[f] = ''
      }
    },
    findData() {
      // console.log('asuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
      this.$_api.single('pasien', {}, this.$route.query.id).then((res) => {
        if(res.data.length) this.fields = { ...res.data[0], id: res.data[0].pasien_id }
      }).catch((res) => {
        this.$_alert.error(res)
      })
    },
    onSubmit() {
      const mode = this.fields.id ? 'update' : 'create';

      this.$_api[mode]('pasien', this.fields).then((res) => {
        // console.log(res)
        this.$router.push({query:{ view: 'list' }})
        this.$_alert.success('Berhasil membuat data pasien')
      }).catch((res) => {
        this.$_alert.error(res)
      })
    }
  }
}
</script>
