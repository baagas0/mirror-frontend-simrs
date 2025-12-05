<template>
  <div>
    <div class="card card-custom mb-5" v-if="loading">
      <div class="card-body d-flex justify-content-center">
        <div class="spinner spinner-track spinner-primary"></div>
      </div>
    </div>

    <div class="animated" v-else>
      <div class="card card-custom mb-5">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column justify-content-center">
            <span class="card-label font-weight-bolder text-dark">{{title === 'Hasil Operasi' ? 'Post Operasi' : title}}</span>
          </h3>
          <div class="card-toolbar my-0 align-items-center">
            <button class="btn btn-success btn-circle mr-2" v-if="view === 'detail' && status === 3" @click="goToBmhp">
              <i class="ri-shopping-bag-3-line p-0"></i> Input BMHP
            </button>

            <button class="btn btn-primary btn-circle" v-if="view === 'detail'" @click="setView('formulir')">
              <i class="ri-edit-line p-0"></i> Perbarui Hasil
            </button>

            <button class="btn btn-outline-primary btn-icon btn-circle" v-else-if="view !== 'form'" @click="setView('detail')">
              <i class="ri-arrow-go-back-line p-0"></i>
            </button>
          </div>
        </div>
        <div class="card-body py-2 mt-3 pb-3">
          <div class="alert alert-custom alert-light-primary fade show mb-5" role="alert" v-if="[0, 1].includes(status)">
            <div class="alert-icon">
              <i class="ri-error-warning-line"></i>
            </div>
            <div class="alert-text">Tidak dapat input hasil operasi, jadwal {{ status === 0 ? 'telah dibatalkan' : 'belum diproses' }}!</div>
            <div class="alert-close">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><i class="ki ki-close"></i></span>
                </button>
            </div>
          </div>

          <div v-else-if="view === 'detail' || status === 3">
            
            <div class="row">
              <div class="col-6">
                <div class="table-responsive">
                  <table class="table table-detail">
                    <tbody>
                      <tr>
                        <td class="min-w-150px">Kategori</td>
                        <td>:</td>
                        <td>{{ hasil.kategori }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Eksisi/Ensisi</td>
                        <td>:</td>
                        <td>{{ hasil.eksisi_ensisi }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Operator 1</td>
                        <td>:</td>
                        <td>{{ hasil.operator_1_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Operator 2</td>
                        <td>:</td>
                        <td>{{ hasil.operator_2_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Operator 3</td>
                        <td>:</td>
                        <td>{{ hasil.operator_3_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Dokter Anestesi</td>
                        <td>:</td>
                        <td>{{ hasil.dokter_anastesi_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Dokter Anak</td>
                        <td>:</td>
                        <td>{{ hasil.dokter_anak_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Bidan 1</td>
                        <td>:</td>
                        <td>{{ hasil.bidan_1_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Bidan 2</td>
                        <td>:</td>
                        <td>{{ hasil.bidan_2_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Bidan 3</td>
                        <td>:</td>
                        <td>{{ hasil.bidan_3_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Prw. Luar</td>
                        <td>:</td>
                        <td>{{ hasil.perawat_luar_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Instrumen</td>
                        <td>:</td>
                        <td>{{ hasil.instrumen_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Dr. PJ Anak</td>
                        <td>:</td>
                        <td>{{ hasil.dokter_pj_anak_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Dokter Umum</td>
                        <td>:</td>
                        <td>{{ hasil.dokter_umum_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Pre Diagnosa</td>
                        <td>:</td>
                        <td>{{ hasil.pre_diagnosa_kode }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Laporan Operasi</td>
                        <td>:</td>
                        <td>{{ hasil.laporan_operasi }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6">
                <div class="table-responsive">
                  <table class="table table-detail">
                    <tbody>
                      <tr>
                        <td class="min-w-150px">Jenis Anestesi</td>
                        <td>:</td>
                        <td>{{ hasil.jenis_anasthesi }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Pemeriksaan PA</td>
                        <td>:</td>
                        <td>{{ hasil.pemeriksaan_pa }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Ast. Operator 1</td>
                        <td>:</td>
                        <td>{{ hasil.ast_operator_1_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Ast. Operator 2</td>
                        <td>:</td>
                        <td>{{ hasil.ast_operator_2_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Ast. Operator 3</td>
                        <td>:</td>
                        <td>{{ hasil.ast_operator_3_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Ast. Anestesi 1</td>
                        <td>:</td>
                        <td>{{ hasil.ast_anastesi_1_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Ast. Anestesi 2</td>
                        <td>:</td>
                        <td>{{ hasil.ast_anastesi_2_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Prw. Resusitasi</td>
                        <td>:</td>
                        <td>{{ hasil.prw_resusitasi_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Onloop 1</td>
                        <td>:</td>
                        <td>{{ hasil.onloop_1_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Onloop 2</td>
                        <td>:</td>
                        <td>{{ hasil.onloop_2_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Onloop 3</td>
                        <td>:</td>
                        <td>{{ hasil.onloop_3_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Onloop 4</td>
                        <td>:</td>
                        <td>{{ hasil.onloop_4_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Onloop 5</td>
                        <td>:</td>
                        <td>{{ hasil.onloop_5_nama }}</td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Waktu Selesai</td>
                        <td>:</td>
                        <td><span v-if="hasil.tanggal_selesai">{{ hasil.tanggal_selesai || parse('longDate') }}</span></td>
                      </tr>
                      <tr>
                        <td class="min-w-150px">Post Diagnosa</td>
                        <td>:</td>
                        <td>{{ hasil.post_diagnosa_kode }}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <ValidationObserver v-slot="{ handleSubmit }" v-else>
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-6">
                  <s-input v-model="fields.kategori" :item="{
                    label: 'Kategori',
                    id: 'kategori',
                    data: 'kategori',
                    type: 'select',
                    validation: [],
                    value: fields.kategori,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Besar', code: 'Besar' },
                        { label: 'Kecil', code: 'Kecil' },
                      ]
                    },
                    param: {},
                  }" :valuee="fields.kategori" />
                </div>
                <div class="col-6">
                  <s-input v-model="fields.jenis_anasthesi" :item="{
                    label: 'Jenis Anestesi',
                    type: 'text',
                    validation: [],                    
                    param: {},
                  }" :valuee="fields.jenis_anasthesi" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.eksisi_ensisi" :item="{
                    label: 'Eksisi/Ensisi',
                    id: 'eksisi_ensisi',
                    data: 'eksisi_ensisi',
                    type: 'select',
                    validation: [],
                    value: fields.eksisi_ensisi,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Eksisi', code: 'Eksisi' },
                        { label: 'Ensisi', code: 'Ensisi' },
                      ]
                    },
                    param: {},
                  }" :valuee="fields.eksisi_ensisi" />
                </div>

                <div class="col-6">
                  <s-input v-model="fields.pemeriksaan_pa" :item="{
                    label: 'Pemeriksaan PA',
                    id: 'pemeriksaan_pa',
                    data: 'pemeriksaan_pa',
                    type: 'select',
                    validation: [],
                    value: fields.pemeriksaan_pa,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Ya', code: 'Ya' },
                        { label: 'Tidak', code: 'Tidak' },
                      ]
                    },
                    param: {},
                  }" :valuee="fields.pemeriksaan_pa" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.operator_1_id" :item="{
                    label: 'Operator 1',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: ['required'],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.ast_operator_1_id" :item="{
                    label: 'Ast. Operator 1',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis_array: ['Dr', 'Prw']
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.operator_2_id" :item="{
                    label: 'Operator 2',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.ast_operator_2_id" :item="{
                    label: 'Ast. Operator 2',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist', 'nama_tipe_tenaga_medis'],
                      headerDisplay: ['Nama', 'Spesialis', 'Tipe'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis_array: ['Dr', 'Prw']
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.operator_3_id" :item="{
                    label: 'Operator 3',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.ast_operator_3_id" :item="{
                    label: 'Ast. Operator 3',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis_array: ['Dr', 'Prw']
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.dokter_anastesi_id" :item="{
                    label: 'Dokter Anestesi',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: ['required'],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.ast_anastesi_1_id" :item="{
                    label: 'Ast. Anastesi 1',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis_array: ['Dr', 'Prw']
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.dokter_anak_id" :item="{
                    label: 'Dokter Anak',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.ast_anastesi_2_id" :item="{
                    label: 'Ast. Anastesi 2',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis_array: ['Dr', 'Prw']
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.bidan_1_id" :item="{
                    label: 'Bidan 1',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'BDN'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.prw_resusitasi_id" :item="{
                    label: 'Prw. Resusitasi',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist', 'nama_tipe_tenaga_medis'],
                      headerDisplay: ['Nama', 'Spesialis', 'Tipe'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.bidan_2_id" :item="{
                    label: 'Bidan 2',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'BDN'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.onloop_1_id" :item="{
                    label: 'Onloop 1',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.bidan_3_id" :item="{
                    label: 'Bidan 3',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.onloop_2_id" :item="{
                    label: 'Onloop 2',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.perawat_luar_id" :item="{
                    label: 'Prw. Luar',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.onloop_3_id" :item="{
                    label: 'Onloop 3',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.instrumen_id" :item="{
                    label: 'Instrumen',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.onloop_4_id" :item="{
                    label: 'Onloop 4',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.dokter_pj_anak_id" :item="{
                    label: 'Dr. PJ Anak',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.onloop_5_id" :item="{
                    label: 'Onloop 5',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'PRW'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.dokter_umum_id" :item="{
                    label: 'Dokter Umum',
                    type: 'lookup-radio',
                    api: 'msDokter',
                    validation: [''],
                    pointer: {
                      label: 'nama_dokter',
                      code: 'ms_dokter_id',
                      display: ['nama_dokter', 'nama_specialist'],
                      headerDisplay: ['Nama', 'Spesialis'],
                      
                    },
                    param: {
                      kode_tipe_tenaga_medis: 'Dr'
                    }
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.tanggal_selesai" :item="{
                    label: 'Waktu Selesai',
                    type: 'datetime',
                    validation: [''],
                  }" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.pre_diagnosa_id" :item="{
                    label: 'Pre Diagnosa',
                    type: 'lookup-radio',
                    api: 'ms_diagnosa',
                    validation: [''],
                    pointer: {
                      label: 'nama_diagnosa',
                      code: 'id',
                      display: ['nama_diagnosa', 'kode_diagnosa'],
                      headerDisplay: ['Nama', 'Kode'],
                    },
                    param: {

                    }
                  }" />

                  <s-input groupClass="mb-0" v-model="fields.post_diagnosa_id" :item="{
                    label: 'Post Diagnosa',
                    type: 'lookup-radio',
                    api: 'ms_diagnosa',
                    validation: [''],
                    pointer: {
                      label: 'nama_diagnosa',
                      code: 'id',
                      display: ['nama_diagnosa', 'kode_diagnosa'],
                      headerDisplay: ['Nama', 'Kode'],
                    },
                    param: {

                    }
                  }" :valuee="fields.post_diagnosa_id" />
                </div>

                <div class="col-6">
                  <s-input groupClass="mb-0" v-model="fields.laporan_operasi" :item="{
                    label: 'Laporan Selesai',
                    type: 'textarea',
                    api: 'msDokter',
                    validation: [''],
                  }" />
                </div>


              </div>
              <div class="row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>

        <div v-if="loading_form" class="blockUI blockOverlay" style="z-index: 10; border: medium; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(255, 255, 255); opacity: 0.3; cursor: wait; position: absolute;"></div>
        <div v-if="loading_form" class="blockUI blockMsg blockElement d-flex align-items-center justify-content-center w-100" style="z-index: 1011; position: absolute; padding: 0px; margin: auto; width: auto; top: 0; bottom: 0; left: 0; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">
          <span class="spinner spinner-loader spinner-primary spinner-lg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'bahan_medis_habis_pakai',
  props: {
    jadwal_operasi_id: { type: String, required: true },
    status: { type: Number, required: true },
  },
  data() {
    return {
      loading: false,
      loading_form: false,
      title: 'Formulir hasil operasi',
      fields: {
        jadwal_operasi_id: '',
        kategori: '',
        jenis_anasthesi: '',
        operator_1_id: null,
        operator_2_id: null,
        operator_3_id: null,
        dokter_anastesi_id: null,
        dokter_anak_id: null,
        bidan_1_id: null,
        bidan_2_id: null,
        bidan_3_id: null,
        perawat_luar_id: null,
        instrumen_id: null,
        dokter_umum_id: null,
        pre_diagnosa_id: null,
        post_diagnosa_id: null,
        eksisi_ensisi: null,
        pemeriksaan_pa: '',
        ast_operator_1_id: null,
        ast_operator_2_id: null,
        ast_operator_3_id: null,
        ast_anastesi_1_id: null,
        ast_anastesi_2_id: null,
        prw_resusitasi_id: null,
        onloop_1_id: null,
        onloop_2_id: null,
        onloop_3_id: null,
        onloop_4_id: null,
        onloop_5_id: null,
        dokter_pj_anak_id: null,
        tanggal_selesai: null,
        laporan_operasi: '',
      },
      hasil: {}
    }
  },
  watch: {
    jadwal_operasi_id: {
      handler(to, from) {
        if (to !== from) this.findHasilOperasi()
      }
    }
  },
  computed: {
    view() {
      return this.title.toLocaleLowerCase().includes('formulir') ? 'form' : 'detail'
    },
    action_label() {
      return 'perbaui'
    }
  },
  mounted() {
    this.findHasilOperasi()
    console.log(
      moment('2024-03-24T22:04:04.000Z').format('YYYY-MM-DD HH:mm:ss')
    )
  },
  methods: {
    setView(view) {
      console.log(view)
      // 'detail' | 'formulir'
      if (view === 'detail') this.title = 'Hasil Operasi'
      else this.title = 'Formulir hasil operasi'
    },
    goToBmhp() {
      if (this.hasil && this.hasil.id) {
        this.$router.push(`/operasi/input_bmhp?hasil_id=${this.hasil.id}`)
      }
    },
    findHasilOperasi() {
      // loading
      this.loading = true
      this.$_api.post('hasil_operasi/detailsByJadwalOperasiId', { jadwal_operasi_id: this.jadwal_operasi_id }).then((res) => {
        console.log(res)
        this.loading = false
        if (res.data && res.data.length) {
          this.hasil = res.data[0]
          this.fields = { ...res.data[0], tanggal_selesai: moment(res.data[0].tanggal_selesai).format('YYYY-MM-DD HH:mm:ss') }
          this.title = 'Hasil Operasi'
        } else {
          this.hasil = {}
          // this.fields = { jadwal_operasi_id: this.jadwal_operasi_id }
          if (this.jadwal_operasi_id) this.fields.jadwal_operasi_id = this.jadwal_operasi_id
          this.title = 'Formulir hasil operasi'
        }
      })
    },
    onSubmit() {
      this.loading_form = true
      this.fields.jadwal_operasi_id = this.jadwal_operasi_id

      this.$_api.post('hasil_operasi/upsert', this.fields).then((res) => {
        setTimeout(() => {
          this.findHasilOperasi()
          this.$_alert.success('Hasil operasi telah disimpan');
          this.loading_form = false
        }, 1000)
      }).catch((error) => {
        console.log(error)
        this.$_alert.error(error)
      })
    }
  }
}
</script>