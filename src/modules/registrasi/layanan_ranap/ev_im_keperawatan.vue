<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi" />
        <!-- {{ scrollPosition }} -->
      </div>
      <div class="xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <div class="ribbon-target" v-if="tab === 'assesmen_tambahan'" :class="{'bg-warning': !is_validasi_assesmen_tambahan, 'bg-success': is_validasi_assesmen_tambahan}" style="top: 10px; right: 0px;">{{ is_validasi_assesmen_tambahan ? 'Sudah' : 'Belum' }} Validasi</div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && tab === 'assesmen_tambahan' && !is_validasi_assesmen_tambahan" @click="doValidasiAssesmenTambahan()">Validasi Sekarang</button>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="btn-group btn-group-lg mb-4 w-100" role="group" aria-label="Large button group" v-if="dataRegistrasi && dataRegistrasi.id">
          <button type="button" class="btn btn-outline-primary" :class="{ 'bg-primary text-white': tab === 'ev_im' }" @click="tab='ev_im'">Evaluasi & Implementasi</button>
          <button type="button" class="btn btn-outline-primary" :class="{ 'bg-primary text-white': tab === 'assesmen_tambahan' }" @click="tab='assesmen_tambahan'">Assesmen Tambahan</button>
        </div>

        <template v-if="tab === 'ev_im'">
          <div class="card card-custom mb-5" v-if="loadingAssesmen">
            <div class="card-body d-flex justify-content-center">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>
          <template v-else-if="dataRegistrasi && registrasi_id">
            <div class="row">
              <div class="col-5">
                <!-- <tas-base-crud ref="CRUD-cppt" list-card :classes="'s'" :config="configImplementasi" >
                  <template v-slot:card-view="rowData">
                    <div class="card p-3 mb-3 bg-light-warning">
                      <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="w-100">
                          <p class="mb-2"><strong>{{ rowData.rowData.waktu_evaluasi | parse('date') }}</strong></p>
                          <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ rowData.rowData.username || 'Nunggu dijoin ke perawat (BE)' }}</h5>
                          <div class="d-flex justify-content-end justify-content-end mt-2">
                            <span class="label label-lg label-pill label-inline mr-2 label-success pointer" @click="editEvaluasi(rowData.rowData)">Edit</span>
                            <span class="label label-lg label-pill label-inline mr-2 label-danger pointer">Implementasi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </tas-base-crud> -->
                <template v-if="stateEvaluasi === 'list'">
                  <div class="card card-custom mb-5">
                    <div class="card-header border-0 pt-0 pb-0">
                      <div class="card-title flex-fill mr-0">
                        <h4>Evaluasi</h4>
                      </div>
                      <div class="card-toolbar">
                        <a class="btn btn-primary btn-icon btn-circle" @click="selectEvaluasi()">
                          <i class="ri-add-line p-0"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <masonry v-if="listEvaluasi.length > 0" :cols="{ default: 1, 1024: 1, 768: 1, 425: 1 }" :gutter="{ default: '.75rem', 700: '15px' }">
                      <div v-for="(item, i) in listEvaluasi" :key="i + '-item-evaluasi'">
                        <div class="card p-3 mb-3 bg-light-warning">
                          <div class="d-flex flex-row justify-content-between align-items-center">
                            <div class="w-100">
                              <p class="mb-2"><strong>{{ item.waktu_evaluasi | parse('longDateTime') }}</strong></p>
                              <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ item.nama_dokter || '-' }}</h5>
                              <div class="d-flex justify-content-end justify-content-end mt-2">
                                <span class="label label-lg label-pill label-inline mr-2 label-success pointer" @click="selectEvaluasi(item)">Edit</span>
                                <span class="label label-lg label-pill label-inline mr-2 label-danger pointer" @click="deleteEvaluasi(item)">Hapus</span>
                                <span class="label label-lg label-pill label-inline mr-2 label-primary pointer" @click="selectedEvaluasiId = item.id_evaluasi_keperawatan_rinap">Implementasi</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </masonry>
                  </div>
                </template>
                <template v-if="stateEvaluasi === 'form'">
                  <div class="card card-custom mb-5">
                    <div class="card-header border-0 pt-0 pb-0">
                      <div class="card-title flex-fill mr-0">
                        <h4>Form {{ dataEvaluasi.id ? 'Edit' : "Tambah" }} Evaluasi</h4>
                      </div>
                      <div class="card-toolbar">
                        <a class="btn btn-primary btn-icon btn-circle" @click="stateEvaluasi = 'list'">
                          <i class="ri-arrow-go-back-fill p-0"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3">
                    <!-- <pre>{{dataEvaluasi}}</pre> -->
                    <ValidationObserver v-slot="{ handleSubmit }">
                      <form @submit.prevent="handleSubmit(hitEvaluasi)" autocomplete="off">
                        <div class="card-body">
                          <s-input groupClass="mb-0" v-model="dataEvaluasi.registrasi_id" :item="{
                            label: 'Registrasi',
                            id: 'registrasi_id',
                            data: 'registrasi_id',
                            type: 'lookup-radio',
                            api: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                            getter: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                            setter: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                            validation: ['required'],
                            pointer: {
                              label: 'nama_lengkap',
                              code: 'registrasi_id',
                              display: ['no_kunjungan', 'nama_lengkap', 'no_rm', 'nik', 'alamat_sekarang'],
                              headerDisplay: ['No. Kunjungan', 'Nama', 'No. RM', 'NIK', 'Alamat Sekarang'],
                              mainParam: 'nama_lengkap'
                            },
                          }" :valuee="dataEvaluasi.registrasi_id" />
                          <s-input groupClass="mb-0" v-model="dataEvaluasi.perawat_id" :item="{
                            label: 'Perawat',
                            id: 'perawat_id',
                            data: 'perawat_id',
                            type: 'lookup-radio',
                            api: 'msDokter',
                            getter: 'msDokter',
                            setter: 'msDokter',
                            validation: ['required'],
                            pointer: {
                              label: 'nama_dokter',
                              code: 'ms_dokter_id',
                              display: ['nama_tipe_tenaga_medis', 'nama_dokter', 'jk_dokter|kelamin'],
                              headerDisplay: ['Tenaga Medis', 'Nama Tenaga Medis', 'Jenis Kelamin']
                            },
                            param: {
                              kode_tipe_tenaga_medis: 'PRW'
                            }
                          }" :valuee="dataEvaluasi.perawat_id" />
                          
                          <s-input groupClass="mb-0" v-model="dataEvaluasi.waktu_evaluasi" :item="{
                            label: 'Waktu Evaluasi',
                            id: 'waktu_evaluasi',
                            data: 'waktu_evaluasi',
                            type: 'datetime',
                            validation: [],
                          }" :valuee="dataEvaluasi.waktu_evaluasi" />
                          <s-input groupClass="mb-0" v-model="dataEvaluasi.tindak_lanjut" :item="{
                            label: 'Tindak Lanjut',
                            id: 'tindak_lanjut',
                            data: 'tindak_lanjut',
                            type: 'text',
                            validation: [],
                          }" :valuee="dataEvaluasi.tindak_lanjut" />
                          <s-input groupClass="mb-0" v-model="dataEvaluasi.catatan" :item="{
                            label: 'Catatan',
                            id: 'catatan',
                            data: 'catatan',
                            type: 'textarea',
                            validation: [],
                          }" :valuee="dataEvaluasi.catatan" />
                          <s-input groupClass="mb-0" v-model="dataEvaluasi.status_evaluasi_keperawatan" :item="{
                            label: 'Status',
                            id: 'status_evaluasi_keperawatan',
                            data: 'status_evaluasi_keperawatan',
                            type: 'lookup-radio',
                            validation: ['required'],
                            pointer: {
                              label: 'label',
                              code: 'code',
                              list: [
                                { label: 'Data Aktif', code: 'true' },
                                { label: 'Non Aktif', code: 'false' }
                              ]
                            },
                          }" :valuee="dataEvaluasi.status_evaluasi_keperawatan"/>
  
                        </div>
                        <div class="card-footer">
                          <button type="submit" class="btn btn-light-primary btn-sm w-100">Submit Data</button>
                        </div>
                      </form>
                    </ValidationObserver>
                  </div>
                </template>
              </div>
              <div class="col-7">
                <tas-base-crud ref="CRUD-implementasi" v-if="selectedEvaluasiId !== ''" list-card :classes="'s'" :config="{ ...configImplementasi, title: 'Implementasi' }">
                  <template v-slot:card-view="rowData">
                    <div class="card p-3 mb-3 bg-light-warning" >
                      <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="w-100">
                          <div @click="$refs['CRUD-implementasi'].getEvent('detail', rowData.rowData)">
                            <p class="mb-2"><strong>{{ rowData.rowData.waktu_implementasi | parse('longDateTime') }}</strong></p>
                            <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ rowData.rowData.nama_diagnosa || '-' }} ({{ rowData.rowData.kode_diagnosa || '-' }})</h5>
                            <p class="mb-0"><span class="text-primary">Jenis Implementasi:</span> {{ rowData.rowData.jenis_implementasi }}</p>
                            <p class="mb-0"><span class="text-primary">Tindak Lanjut:</span> {{ rowData.rowData.tindak_lanjut }}</p>
                          </div>
                          <div class="d-flex justify-content-end justify-content-end mt-2">
                            <!-- <span class="label label-lg label-pill label-inline mr-2 label-danger pointer" @click="$refs['CRUD-implementasi'].$children[1].deleteData({ id:rowData.rowData.id_implementasi_keperawatan_rinap })">Hapus</span> -->
                            <span class="label label-lg label-pill label-inline mr-2 label-success pointer" @click="$refs['CRUD-implementasi'].getEvent('update', rowData.rowData)">Edit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </tas-base-crud>
                <template v-else>
                  <div class="card card-custom">
                    <div class="card-body text-center ">
                      <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
                      <h3 class="mt-3 font-weight-bolder text-dark">Pilih Evaluasi Dulu yuk...</h3>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="card card-custom">
              <div class="card-body text-center ">
                <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
                <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
                <button class="btn btn-light-primary" v-if="info_alert.includes('Assesmen keperawatan')"
                  @click="$router.push({ name: 'Layanan RJalan Keperawatan', query: { registrasi_id: registrasi_id } })">Assesmen
                  Keperawatan <i class="ri-arrow-right-line"></i></button>
              </div>
            </div>
          </template>
          
        </template>
        <template v-else-if="tab === 'assesmen_tambahan'">

          <div class="card">
            <div class="card-header ribbon ribbon-top ribbon-ver">
              <!-- <div class="ribbon-target bg-warning" style="top: 10px; right: -2px;">Belum Validasi</div> -->

              <!-- <h5 class="font-weight-bolder text-dark mb-0 pb-0">Assesmen Tambahan</h5> -->
            </div>
            <div class="card-body p-0">
              <KesehatanIbuAnak
                v-if="dataAssesmenTambahan && dataAssesmenTambahan.kesehatan_ibu_anak"
                :dataRegistrasi="dataRegistrasi"
                :assesmen="dataAssesmenTambahan.kesehatan_ibu_anak"
                :activeTab="activeTabKIA"
                :dataAssesmenTambahan="dataAssesmenTambahan"
                :is_validasi_assesmen_tambahan="is_validasi_assesmen_tambahan"
              />
            </div>
          </div>
          <!-- <pre>{{ dataAssesmenTambahan }}</pre> -->
        </template>
      </div>
    </div>
  </div>
</template>
  
<script>
import CardRegistrasiRanap from './_components/card_registrasi_ranap.vue'
import KesehatanIbuAnak from "./_components/kesehatan_ibu_anak/kesehatan_ibu_anak.vue";
// import KesehatanIbuAnakReal from "./_components/kesehatan_ibu_anak_real/kesehatan_ibu_anak.vue";

import moment from 'moment'
moment.locale('id')

export default {
  name: 'layanan_ranap_cppt',
  components: { CardRegistrasiRanap, KesehatanIbuAnak },
  data() {
    return {
      tab: 'ev_im',
      info_alert: '',
      loadingAssesmen: false,

      scrollPosition: 0,

      endpointEvaluasi: 'evaluasi_keperawatan_rinap',
      stateEvaluasi: 'list',
      paramEvaluasi: {},
      listEvaluasi: [], // LIST
      dataEvaluasi: {}, // DATA SINGLE

      endpointImplementasi: 'implementasi_keperawatan_rinap',
      selectedEvaluasiId: '',
      dataRegistrasi: {},
      registrasi_id: '',

      activeTab: 'subjective',

      showFormCppt: false,
      configImplementasi: {
        title: 'Implementasi',
        model_api: '',
        getter: 'implementasi_keperawatan_rinap',
        setter: 'implementasi_keperawatan_rinap',
        pk_field: 'id_implementasi_keperawatan_rinap',
        frontendPaginate: true,
        filter_api: {},
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // implementasi_keperawatan_rinap_id
          {
            id: 'implementasi_keperawatan_rinap_id',
            data: 'implementasi_keperawatan_rinap_id',
            label: 'implementasi_keperawatan_rinap_id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'evaluasi_id',
            data: 'evaluasi_id',
            label: 'Evaluasi',
            placeholder: null,
            methods: {
              list: { view_data: 'evaluasi_id' }, // rung di join ke ning nama pasien
              detail: false,
              create: {
                setter: 'evaluasi_keperawatan_rinap',
                getter: 'evaluasi_keperawatan_rinap',
                value: '',
                type: 'hidden',
                option: {
                  list_pointer: {
                    label: 'tindak_lanjut',
                    code: 'id_evaluasi_keperawatan_rinap',
                    display: ['nama_lengkap', 'tgl_registrasi|date', 'tindak_lanjut', 'catatan'],
                    headerDisplay: ['Nama Lengkap', 'Tgl Registrasi', 'Tindak Lanjut', 'Catatan'],
                  }
                }
              },
              update: {
                setter: 'evaluasi_keperawatan_rinap',
                getter: 'evaluasi_keperawatan_rinap',
                value: '',
                type: 'hidden',
                option: {
                  list_pointer: {
                    label: 'tindak_lanjut',
                    code: 'id_evaluasi_keperawatan_rinap',
                    display: ['nama_lengkap', 'tgl_registrasi|date', 'tindak_lanjut', 'catatan'],
                    headerDisplay: ['Nama Lengkap', 'Tgl Registrasi', 'Tindak Lanjut', 'Catatan'],
                  }
                }
              },
              filter: false
            }
          },
          // {
          //   id: 'perawat_id',
          //   data: 'perawat_id',
          //   label: 'Perawat',
          //   placeholder: null,
          //   methods: {
          //     list: { view_data: 'perawat_id' },
          //     detail: { view_data: 'perawat_id' },
          //     create: {
          //       setter: 'msDokter',
          //       getter: 'msDokter',
          //       type: 'lookup-radio',
          //       option: {
          //         list_pointer: {
          //           label: 'nama_dokter',
          //           code: 'ms_dokter_id',
          //           display: ['nama_dokter']
          //         }
          //       }
          //     },
          //     update: {
          //       setter: 'msDokter',
          //       getter: 'msDokter',
          //       type: 'lookup-radio',
          //       option: {
          //         list_pointer: {
          //           label: 'nama_dokter',
          //           code: 'ms_dokter_id',
          //           display: ['nama_dokter']
          //         }
          //       }
          //     },
          //     filter: false
          //   }
          // },
          {
            id: 'waktu_implementasi',
            data: 'waktu_implementasi',
            label: 'Waktu Implementasi',
            placeholder: null,
            methods: {
              list: { transform: 'longDateTime' },
              detail: { transform: 'longDateTime' },
              create: { type: 'datetime' },
              update: { type: 'datetime' },
              filter: true
            }
          },
          {
            id: 'diagnosa',
            data: 'diagnosa',
            label: 'Diagnosa',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_diagnosa' },
              detail: { view_data: 'nama_diagnosa' },
              create: {
                setter: 'ms_diagnosa',
                getter: 'ms_diagnosa',
                value: '',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_diagnosa',
                    code: 'id',
                    display: ['kode_diagnosa', 'nama_diagnosa'],
                    headerDisplay: ['Kode', 'Nama Diagnosa'],
                  }
                }
              },
              update: {
                setter: 'ms_diagnosa',
                getter: 'ms_diagnosa',
                value: '',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_diagnosa',
                    code: 'id',
                    display: ['kode_diagnosa', 'nama_diagnosa'],
                    headerDisplay: ['Kode', 'Nama Diagnosa'],
                  }
                }
              },
              filter: true
            }
          },
          {
            id: 'jenis_implementasi',
            data: 'jenis_implementasi',
            label: 'Jenis Implementasi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'respon_pasien',
            data: 'respon_pasien',
            label: 'Respon Pasien',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'implementasi',
            data: 'implementasi',
            label: 'Implementasi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: false
            }
          },
          // status_evaluasi_keperawatan
          // {
          //   id: 'status_evaluasi_keperawatan',
          //   data: 'status_evaluasi_keperawatan',
          //   label: 'Status Evaluasi',
          //   placeholder: null,
          //   methods: {
          //     list: {
          //       order: true,
          //       class: { false: 'badge badge-danger', true: 'badge badge-primary' },
          //       transform: 'active'
          //     },
          //     detail: {
          //       order: true,
          //       class: { false: 'badge badge-danger', true: 'badge badge-primary' },
          //       transform: 'active'
          //     },
          //     create: {
          //       validation: ['required'],
          //       type: 'lookup-radio',
          //       value: true,
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Data Aktif', code: true },
          //             { label: 'Non Aktif', code: false }
          //           ]
          //         }
          //       }
          //     },
          //     update: {
          //       validation: ['required'],
          //       type: 'lookup-radio',
          //       option: {
          //         list_pointer: {
          //           label: 'label',
          //           code: 'code',
          //           list: [
          //             { label: 'Data Aktif', code: true },
          //             { label: 'Non Aktif', code: false }
          //           ]
          //         }
          //       }
          //     },
          //     filter: false
          //   }
          // },
        ]
      },

      activeTabKIA: 'pengamatan_kehamilan',
      is_validasi_assesmen_tambahan: true,
      objAssesmenTambahan: {},
      dataAssesmenTambahan: {
        kesehatan_ibu_anak: {
          kia: {}, // ini data pengamat_kehamilan
          pemeriksaan_antenatal: {
            anantenatal: {},
            ksrp: {},
          },
          pengamatan_persalinan: {},
          pengamatan_nifas: {},
          patograf: {},
          surat_ket_lahir: {}
        }
      }
    }
  },
  watch: {
    paramEvaluasi: {
      deep: true,
      immediate: true,
      handler(to, from) {
        console.log('kecekel')
        this.getEvaluasi()
      }
    },
    selectedEvaluasiId: {
      deep: true,
      immediate: true,
      handler(to, from) {
        this.$nextTick(() => {
          // this.selectedEvaluasiId
          let field_evaluasi_id = this.configImplementasi.fields.filter((x) => x.id == 'evaluasi_id')
          if (field_evaluasi_id.length) field_evaluasi_id[0].methods.create.value = this.selectedEvaluasiId
          this.configImplementasi.filter_api = { evaluasi_id: to }
          // this.$refs['CRUD-implementasi'].$children[1].getData({ evaluasi_id: to })
        })
      }
    },
    tab: {
      handler(to, from) {
        if (to !== from && this.dataRegistrasi) {
          if (to === 'ev_im') this.selectRegistrasi(this.dataRegistrasi);
          else if (to === 'assesmen_tambahan') this.selectRegistrasi(this.dataRegistrasi);
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    if (this.$route.query.view !== 'list') this.$router.push({ name: this.$route.name, query: { view: 'list' } })
  },
  methods: {
    // START ASSESMEN TAMBAHAN
    async findAssesmenTambahan(param = {}) {
      const res = await this.$_api.post('assesment_tambahan_rnap/list', param);

      if (res.data && res.data.length) return res.data[0]
      else return {}
    },
    async createAssesmenTambahan(param = {}) {
      const staticParam = {
        "is_validasi_askep":false,
        "json_askep":{},
        "is_validasi_asmed":false,
        "json_asmed":{}
      };
      const res = await this.$_api.create('assesment_tambahan_rnap', { ...staticParam, ...param })

      if (res.status === 200) return res.data
      else {
        this.$_alert.error({}, 'Tidak dapat membuat assesmen')
        return false
      }
    },
    async initAssesmenTambahan(registrasi_id) {
      let ass = await this.findAssesmenTambahan({ registrasi_id });
      console.log('ass', ass)
      if (!ass.id) ass = this.createAssesmenTambahan({ registrasi_id });
      if(ass === false) return; // GAGAL BUAT ASSESMEN

      this.objAssesmenTambahan = ass
      this.is_validasi_assesmen_tambahan = this.objAssesmenTambahan.is_validasi_askep
      await this.buildAssesmenTambahan(this.objAssesmenTambahan.json_askep)
    },
    async buildAssesmenTambahan(json) {
      console.log('buildAssesmenTambahan')
      
      // ASSIGN DATA KIA
      const kesehatan_ibu_anak = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.kia) ? json.kesehatan_ibu_anak.kia : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['kia'] = {
        pengamatan_kehamilan: kesehatan_ibu_anak.pengamatan_kehamilan ? kesehatan_ibu_anak.pengamatan_kehamilan : {},
        riwayat_pasien: kesehatan_ibu_anak.riwayat_pasien ? kesehatan_ibu_anak.riwayat_pasien : {},
        riwayat_obstetrik: kesehatan_ibu_anak.riwayat_obstetrik ? kesehatan_ibu_anak.riwayat_obstetrik : {},
        rencana_persalinan: kesehatan_ibu_anak.rencana_persalinan ? kesehatan_ibu_anak.rencana_persalinan : {},
        pemeriksaan_bidan: kesehatan_ibu_anak.pemeriksaan_bidan ? kesehatan_ibu_anak.pemeriksaan_bidan : {},
        risiko_kehamilan: kesehatan_ibu_anak.risiko_kehamilan ? kesehatan_ibu_anak.risiko_kehamilan : {},
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.golongan_darah) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.golongan_darah = this.dataRegistrasi.nama_golongan_darah
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.no_telp) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].pengamatan_kehamilan.no_telp = this.dataRegistrasi.no_telepon
      }

      // ASSIGN DATA ANANTENATAL
      const anantenatal = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pemeriksaan_antenatal && json.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal) ? json.kesehatan_ibu_anak.pemeriksaan_antenatal.anantenatal : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pemeriksaan_antenatal']['anantenatal'] = {
        register_antenatal: anantenatal.register_antenatal ? anantenatal.register_antenatal : {},
        pemeriksaan_bayi: anantenatal.pemeriksaan_bayi ? anantenatal.pemeriksaan_bayi : {},
        pelayanan: anantenatal.pelayanan ? anantenatal.pelayanan : {},
        risiko: anantenatal.risiko ? anantenatal.risiko : {},
        pemeriksaan_ibu: anantenatal.pemeriksaan_ibu ? anantenatal.pemeriksaan_ibu : {},
        laboratorium_antenatal: anantenatal.laboratorium_antenatal ? anantenatal.laboratorium_antenatal : {},
        pencegahan_ppia: anantenatal.pencegahan_ppia ? anantenatal.pencegahan_ppia : {},
        kecacingan_kehamilan: anantenatal.kecacingan_kehamilan ? anantenatal.kecacingan_kehamilan : {},
        pencegahan_malaria: anantenatal.pencegahan_malaria ? anantenatal.pencegahan_malaria : {},
        pencegahan_ims: anantenatal.pencegahan_ims ? anantenatal.pencegahan_ims : {},
        keadaan_ibu: anantenatal.keadaan_ibu ? anantenatal.keadaan_ibu : {},
        tb_kehamilan: anantenatal.tb_kehamilan ? anantenatal.tb_kehamilan : {},
        pencegahan_hepatitis: anantenatal.pencegahan_hepatitis ? anantenatal.pencegahan_hepatitis : {},
        konseling_ibu_hamil: anantenatal.konseling_ibu_hamil ? anantenatal.konseling_ibu_hamil : {},

        keterangan: anantenatal.keterangan ? anantenatal.keterangan : ''
      }
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.tinggi_badan = json.objective.tinggi_badan
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.berat_badan = json.objective.berat_badan
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.tekanan_darah = `${json.objective.sistolik}/${json.objective.diastolik}`
      // this.dataAssesmenTambahan.kesehatan_ibu_anak['pemeriksaan_antenatal']['anantenatal'].pemeriksaan_ibu.anamnesis = json.subjective.keluhan_utama


      // ASSIGN DATA KSPR
      const kspr = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pemeriksaan_antenatal && json.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr) ? json.kesehatan_ibu_anak.pemeriksaan_antenatal.kspr : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pemeriksaan_antenatal']['kspr'] = {
        skrining: kspr.skrining ? kspr.skrining : []
      }

      // ASSIGN DATA PENGAMATAN PERSALINAN
      const pengamatan_persalinan = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pengamatan_persalinan) ? json.kesehatan_ibu_anak.pengamatan_persalinan : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pengamatan_persalinan'] = {
        ...pengamatan_persalinan,
        data_persalinan: pengamatan_persalinan.data_persalinan ? pengamatan_persalinan.data_persalinan : {},
        bulk_observasi: pengamatan_persalinan.bulk_observasi ? pengamatan_persalinan.bulk_observasi : []
      };
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_persalinan'].nama_pasien) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_persalinan'].nama_pasien = this.dataRegistrasi.nama_lengkap
      }

      // ASSIGN DATA PENGAMATAN NIFAS
      const nifas = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.pengamatan_nifas) ? json.kesehatan_ibu_anak.pengamatan_nifas : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['pengamatan_nifas'] = {
        ...nifas,
        pemeriksaan_pnc: nifas.pemeriksaan_pnc ? nifas.pemeriksaan_pnc : {},
        integrasi_program: nifas.integrasi_program ? nifas.integrasi_program : {},
        metode_kontrasepsi: nifas.metode_kontrasepsi ? nifas.metode_kontrasepsi : {}
      }
      if (!this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_nifas'].nama_pasien) {
        this.dataAssesmenTambahan.kesehatan_ibu_anak['pengamatan_nifas'].nama_pasien = this.dataRegistrasi.nama_lengkap
      }

      // ASSIGN DATA PATOGRAF
      const patograf = (json && json.assesment.kesehatan_ibu_anak && json.assesment.kesehatan_ibu_anak.patograf) ? json.assesment.kesehatan_ibu_anak.patograf : {}
      // const nifas = {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['patograf'] = {
        ...patograf,
        pembukaan_serviks: patograf.pembukaan_serviks ? patograf.pembukaan_serviks : [],
        kontraksi_uterus: patograf.kontraksi_uterus ? patograf.kontraksi_uterus : [],

        detak_jantung_janin: patograf.detak_jantung_janin ? patograf.detak_jantung_janin : [],
        penyusupan: patograf.penyusupan ? patograf.penyusupan : [],
        warna_air: patograf.warna_air ? patograf.warna_air : [],

        nadi: patograf.nadi ? patograf.nadi : [],
        tekanan_darah: patograf.tekanan_darah ? patograf.tekanan_darah : [],
        suhu: patograf.suhu ? patograf.suhu : [],
        urine: patograf.urine ? patograf.urine : [],
        makan_minum: patograf.makan_minum ? patograf.makan_minum : [],

        obat: patograf.obat ? patograf.obat : [],
        cairan: patograf.cairan ? patograf.cairan : [],

        catatan_persalinan: patograf.catatan_persalinan ? patograf.catatan_persalinan : {},
        kala_satu: patograf.kala_satu ? patograf.kala_satu : {},
        kala_dua: patograf.kala_dua ? patograf.kala_dua : {},
        kala_tiga: patograf.kala_tiga ? patograf.kala_tiga : {},
        kala_empat: patograf.kala_empat ? patograf.kala_empat : {},
        bayi_lahir: patograf.bayi_lahir ? patograf.bayi_lahir : {},

        kala_lima: patograf.kala_lima ? patograf.kala_lima : [],
      }
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].nama_pasien = this.dataRegistrasi.nama_lengkap
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].gravida = this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].riwayat_obstetrik.gravida
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].paritas = this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].riwayat_obstetrik.partus
      this.dataAssesmenTambahan.kesehatan_ibu_anak['patograf'].abortus = this.dataAssesmenTambahan.kesehatan_ibu_anak['kia'].riwayat_obstetrik.abortus

      // ASSIGN DATA SURAT KETERANGAN LAHIR
      const surat_ket_lahir = (json && json.kesehatan_ibu_anak && json.kesehatan_ibu_anak.surat_ket_lahir) ? json.kesehatan_ibu_anak.surat_ket_lahir : {}
      this.dataAssesmenTambahan['kesehatan_ibu_anak']['surat_ket_lahir'] = {
        data: surat_ket_lahir.data ? surat_ket_lahir.data : []
      };

      return true;
    },
    updateAssesmenTambahan() {
      let param  = { ...this.objAssesmenTambahan }
      param.id = param.assesment_tambahan_rnap_id
      param.json_askep = this.dataAssesmenTambahan
      console.log('param', param)
      this.$_api.update('assesment_tambahan_rnap', param).then((res) => {
        console.log(res)
        this.$_alert.success('Assesmen Tambahan berhasil diperbarui.')
      })
    },
    doValidasiAssesmenTambahan () {
      console.log('cok')
      this.$_alert.confirm('Yakin ingin memvalidasi assesmen ini?').then((res) => {
        console.log(res)
        if (res.isConfirmed) {
          this.objAssesmenTambahan.is_validasi_askep = true
          this.is_validasi_assesmen_tambahan = this.objAssesmenTambahan.is_validasi_askep
          this.updateAssesmenTambahan()
          console.log('asu')
        }
      })
    },
    // END ASSESMEN TAMBAHAN
    getEvaluasi(param = {}) {
      // this.paramEvaluasi = { ...this.paramEvaluasi, ...param }
      const payload = { ...this.paramEvaluasi, ...param };
      if (!payload.registrasi_id) {
        this.listEvaluasi = []
        return
      }
      this.$_api.list(this.endpointEvaluasi, payload).then((res) => {
        this.listEvaluasi = []
        this.listEvaluasi = res.data
        this.stateEvaluasi = 'list'
      })
    },
    selectEvaluasi (data = {}) {
      this.dataEvaluasi = data

      let method = this.dataEvaluasi.id_evaluasi_keperawatan_rinap ? 'update' : 'create'
      
      if (method === 'update') this.dataEvaluasi.status_evaluasi_keperawatan = ''+this.dataEvaluasi.status_evaluasi_keperawatan
      else {
        this.dataEvaluasi.status_evaluasi_keperawatan = 'true'
        this.dataEvaluasi.registrasi_id = this.registrasi_id
        this.dataEvaluasi.perawat_id = ''
      }
      this.stateEvaluasi = 'form'
    },
    hitEvaluasi() {
      let data = this.dataEvaluasi
      let method = data.id_evaluasi_keperawatan_rinap ? 'update' : 'create'
      data.id = data.id_evaluasi_keperawatan_rinap

      this.$_api[method](this.endpointEvaluasi, data).then((res) => {
        this.$_alert.success({}, 'Berhasil menambahkan data')
        this.dataEvaluasi = {}
        this.stateEvaluasi = 'list'
        this.getEvaluasi()
      }).catch(() => {
        this.$_alert.success({}, 'Gagal menambahkan data')
      })
    },
    deleteEvaluasi(data) {
      this.$_alert.confirm('Yakin ingin menghapus data?').then((status) => {
        if(status.isConfirmed) {
          this.$_api.delete(this.endpointEvaluasi, { id: data.id_evaluasi_keperawatan_rinap }).then(() => {
            this.$_alert.success({}, 'Berhasil menghapus data')
            this.getEvaluasi()
          }).catch(() => {
            this.$_alert.error({}, 'Gagal menghapus data')
          })
        }
      })
    },
    async selectRegistrasi(e, moveToList = true, open_tab = 'subjective') {
      if(e.registrasi_id === this.dataRegistrasi.registrasi_id) return
      this.dataRegistrasi = e
      this.registrasi_id = e.registrasi_id || ''
      if (!this.registrasi_id) return
      
      // if(this.$refs['CRUD-cppt']) 
      
      this.$nextTick(() => {
        
        this.paramEvaluasi = {
          registrasi_id: this.registrasi_id
        }
        if (this.$route.query && this.$route.query.view !== 'list' && moveToList) this.$router.push({ name: this.$route.name, query: { view: 'list' } })
        this.activeTab = open_tab
        this.dataEvaluasi.registrasi_id = this.registrasi_id

        this.tab = 'ev_im';
        this.initAssesmenTambahan(this.registrasi_id);
      });
    },
    

    updateScroll() {
      this.scrollPosition = window.scrollY
    },
  }

}
</script>

<style scoped>
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}

.pointer {
  cursor: pointer;
}

.sticky2 {
  z-index: 90;
  top: 119px;
  left: 290px;
  right: 25px;
}

header .header-inner {
  transition: all 250ms cubic-bezier(0.33, 1, 0.68, 1);
  max-height: auto;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}</style>