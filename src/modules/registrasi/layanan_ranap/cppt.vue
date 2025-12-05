<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi"/>
        <!-- {{ scrollPosition }} -->
      </div>
      <div class="xl-9 col-md-9 col-sm-12">
        <div class="card card-custom mb-5 card-sticky" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <!-- <div class="ribbon-target" :class="{'bg-warning': !is_validasi, 'bg-success': is_validasi}" style="top: 10px; right: 0px;">{{ is_validasi ? 'Sudah' : 'Belum' }} Validasi</div> -->
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || '-' }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || '-' }} / {{ dataRegistrasi.tgl_registrasi | parse('date') }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse('kelamin') }} / {{ dataRegistrasi.tgl_lahir | parse('old') }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && !is_validasi && objectDataAssesmen.assesment_medis_ranap_id" @click="doValidasi()">Validasi Sekarang</button>

                
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">BJ</h6>
                <h5 class="font-weight-bolder text-dark">{{dataRegistrasi.no_kunjungan}}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-custom mb-5" v-if="loadingAssesmen">
          <div class="card-body d-flex justify-content-center">
            <div class="spinner spinner-track spinner-primary"></div>
          </div>
        </div>
        <template v-else-if="dataRegistrasi && registrasi_id">
          <tas-base-crud ref="CRUD-cppt" list-card :classes="'s'" :config="configCppt" :hideDetail="true">
            <template v-slot:list-action="rowData">
              <button class="btn btn-warning" @click="viewAllCppt(registrasi_id)">Lihat Semua CPPT</button>
            </template>
            <template v-slot:card-view="rowData">
              <div class="card p-3  mb-3 bg-light-warning">
                <!-- <pre>{{rowData.rowData}}</pre> -->
                <div class="d-flex flex-row justify-content-between align-items-center">
                  <div class="pointer" @click="assignData(rowData.rowData.cppt_id)">
                    <p class="mb-2"><strong>{{ rowData.rowData.tanggal_cppt | parse('longDateTime') }}</strong></p>
                    <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ rowData.rowData.nama_dokter }}</h5>
                  </div>
                  <div>
                    <p style="text-align: end;"><strong>{{ rowData.rowData.nama_tenaga_medis }} ({{ rowData.rowData.nama_tipe_tenaga_medis }})</strong></p>
                    <!-- <p style="text-align: end;"><strong>{{ rowData.rowData.nama_dokter }}</strong></p> -->
                   
                    <div class="d-flex justify-content-end">
                      <!-- <span class="label label-lg label-pill label-inline mr-2 label-success">Terverifikasi</span> -->
                      <!-- <span class="label label-lg label-pill label-inline mr-2 label-danger">Koreksi</span> -->
                      <span class="label label-lg label-pill label-inline mr-2 label-primary pointer" @click="$refs['CRUD-cppt'].getEvent('update', rowData.rowData)"><i class="ri-pencil-line text-white"></i> Edit</span>
                      <span class="label label-lg label-pill label-inline mr-2 label-danger pointer" @click="deleteData(rowData.rowData)"><i class="ri-delete-bin-line text-white"></i> Hapus</span>
                    </div>
                  </div>
                  <!-- <div>
                    <a href="#" class="btn btn-success">
                      <i class="ri-pencil-line"></i> Edit
                    </a>
                  </div> -->
                </div>
              </div>
            </template>
            <template v-slot:detail-footer="rowData">
              <!-- <pre>{{rowData}}</pre> -->
              <!-- <pre>{{objectDataAssesmen}}</pre> -->
              <!-- <pre>{{dataAssesmenDokter}}</pre> -->
              <div class="accordion accordion-toggle-arrow mb-6" id="accordionExample1">
                <div class="card">
                  <div class="card-header">
                      <div class="card-title" :class="{ 'collapsed': cpptTypeActive !== 'dokter' }" @click="cpptTypeActive === 'dokter' ? (cpptTypeActive = '') : (cpptTypeActive = 'dokter')">
                          Dokter
                      </div>
                  </div>
                  <div class="collapse" :class="{ 'show': cpptTypeActive === 'dokter' }" data-parent="#accordionExample1">
                    <div class="card-body">
                      <cppt-dokter :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen" :dataAssesmen="dataAssesmenDokter"></cppt-dokter>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header">
                      <div class="card-title" :class="{ 'collapsed': cpptTypeActive !== 'perawat' }" @click="cpptTypeActive === 'perawat' ? (cpptTypeActive = '') : (cpptTypeActive = 'perawat')">
                          Perawat
                      </div>
                  </div>
                  <div class="collapse" :class="{ 'show': cpptTypeActive === 'perawat' }" data-parent="#accordionExample1">
                    <div class="card-body">
                      <cppt-perawat :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen" :dataAssesmen="dataAssesmenPerawat"></cppt-perawat>
                    </div>
                  </div>
                </div>
              </div>

            </template>
          </tas-base-crud>
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center ">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3>
              <button class="btn btn-light-primary" v-if="info_alert.includes('Assesmen keperawatan')" @click="$router.push({ name: 'Layanan RJalan Keperawatan', query: { registrasi_id: registrasi_id } })">Assesmen Keperawatan <i class="ri-arrow-right-line"></i></button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <b-modal id="modal-assesmen" :title="`Form Assesmen ${objectDataAssesmen.nama_tipe_tenaga_medis}`" size="xl" hide-footer>
      <template v-slot:modal-header-close>
        <a class="btn btn-outline-primary btn-icon"><i class="ri-close-fill p-0" style="font-size: 20px;"></i></a>
      </template>
      <template v-if="objectDataAssesmen.kode_tipe_tenaga_medis === 'dokter' || objectDataAssesmen.kode_tipe_tenaga_medis === 'Dr'">
        <cppt-dokter :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen" :dataAssesmen="dataAssesmen"></cppt-dokter>
      </template>
      <template v-else-if="objectDataAssesmen.kode_tipe_tenaga_medis === 'perawat' || objectDataAssesmen.kode_tipe_tenaga_medis === 'PRW'">
        <cppt-perawat :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen" :dataAssesmen="dataAssesmen"></cppt-perawat>
      </template>
      <template v-else-if="objectDataAssesmen.kode_tipe_tenaga_medis === 'gizi' || objectDataAssesmen.kode_tipe_tenaga_medis === 'GZ'">
        <cppt-gizi :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen" :dataAssesmen="dataAssesmen"></cppt-gizi>
      </template>
      <template v-else-if="objectDataAssesmen.kode_tipe_tenaga_medis === 'fisio' || objectDataAssesmen.kode_tipe_tenaga_medis === 'FS'">
        <cppt-fisio :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="objectDataAssesmen" :dataAssesmen="dataAssesmen"></cppt-fisio>
      </template>
      <template v-else>
        <h5>Form Assesmen tidak ditemukan</h5>
      </template>
  
    </b-modal>

    <b-modal id="modal-view-all-cppt" :title="`Daftar Semua CPPT`" ok-only ok-variant="secondary" ok-title="Tutup" size="xl">
      <template v-slot:modal-header-close>
        <a class="btn btn-outline-primary btn-icon"><i class="ri-close-fill p-0" style="font-size: 20px;"></i></a>
      </template>

      <div class="d-flex flex-column align-items-center justify-content-center" v-if="loadingCppt == true">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>

      <template v-else>
        <b-card no-body class="card-custom mb-1" v-for="item in dataCppt" :key="'view-cppt'+item.cppt_id" style="border-radius: 10px 10px 0px 0px;">
          <b-card-header header-tag="div" class="p-1 bg-success" role="tab" v-b-toggle="'collapse-'+item.cppt_id" style="min-height: 0px; border-radius: 10px 10px 0px 0px;">
            <div class="card-title" style="padding: 0.7rem 1rem; width: 95%">
              
              <div class="d-flex flex-row justify-content-between align-items-center w-100">
                <div class="">
                  <p class="mb-2"><strong>{{ item.tanggal_cppt | parse('longDateTime') }}</strong></p>
                  <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ item.nama_dokter }}</h5>
                </div>
                <div class="d-flex align-items-center">
                  <p class="mb-0" style="text-align: end;"><strong>{{ item.nama_tenaga_medis }} ({{ item.nama_tipe_tenaga_medis }})</strong></p>
                </div>
              </div>
              
            </div>
            <div class="card-toolbar" style="margin: .5rem 1rem;">
              <i class="ri-arrow-down-double-line text-white" v-if="collapseCppt[item.cppt_id]"></i>
              <i class="ri-arrow-right-double-line text-white" v-else></i>
          </div>
          </b-card-header>
          <b-collapse :id="'collapse-'+item.cppt_id" v-model="collapseCppt[item.cppt_id]" :accordion="'collapse-'+item.cppt_id" role="tabpanel">
            <b-card-body class="bg-light-success">
              
              <template v-if="item.kode_tipe_tenaga_medis === 'dokter' || item.kode_tipe_tenaga_medis === 'Dr'">
                <cppt-dokter :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="item" :dataAssesmen="item.dataAssesmen"></cppt-dokter>
              </template>
              <template v-else-if="item.kode_tipe_tenaga_medis === 'perawat' || item.kode_tipe_tenaga_medis === 'PRW'">
                <cppt-perawat :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="item" :dataAssesmen="item.dataAssesmen"></cppt-perawat>
              </template>
              <template v-else-if="item.kode_tipe_tenaga_medis === 'gizi' || item.kode_tipe_tenaga_medis === 'GZ'">
                <cppt-gizi :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="item" :dataAssesmen="item.dataAssesmen"></cppt-gizi>
              </template>
              <template v-else-if="item.kode_tipe_tenaga_medis === 'fisio' || item.kode_tipe_tenaga_medis === 'FS'">
                <cppt-fisio :dataRegistrasi="dataRegistrasi" :objectDataAssesmen="item" :dataAssesmen="item.dataAssesmen"></cppt-fisio>
              </template>
              <template v-else>
                <h5>Form Assesmen tidak ditemukan</h5>
              </template>

            </b-card-body>
          </b-collapse>
        </b-card>

        <div class="card card-custom" v-if="dataCppt.length === 0">
          <div class="card-body text-center ">
            <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
            <h3 class="mt-3 font-weight-bolder text-dark">Data Cppt tidak ditemukan</h3>
            
          </div>
        </div>
      </template>


    </b-modal>

  </div>
</template>
  
<script>
  import CardRegistrasiRanap from './_components/card_registrasi_ranap.vue'
  import CpptDokter from './_components/cppt_dokter.vue'
  import CpptPerawat from './_components/cppt_perawat.vue'
  import CpptGizi from './_components/cppt_gizi.vue'
  import CpptFisio from './_components/cppt_fisio.vue'
  
  import SatuSehat  from '../_components/satu_sehat/satu_sehat.vue'

  import moment from 'moment'
  moment.locale('id')

  export default {
    name: 'layanan_ranap_cppt',
    components: { CardRegistrasiRanap, CpptDokter, CpptPerawat, CpptGizi, CpptFisio, SatuSehat },
    data () {
      return {
        info_alert: '',
        loadingAssesmen: false,

        scrollPosition: 0,
        endpoint: 'cppt',

        dataRegistrasi: {},
        registrasi_id: '',

        dataKeperawatan: {},
        validasiKeperawatan: false, 

        is_validasi: false,
        objectDataAssesmen: {},
        dataAssesmen: {
          subjective: {},
          objective: {},
          assesment: {},
          planning: {}
        },
        // dataAssesmenDokter: {
        //   subjective: {},
        //   objective: {},
        //   assesment: {},
        //   planning: {}
        // },
        dataAssesmenPerawat: {
          subjective: {},
          objective: {},
          assesment: {},
          planning: {}
        },

        dataChangeStatus: false,
        activeTab: 'subjective',

        collapseCppt: {},
        loadingCppt: false,
        dataCppt: [],

        showFormCppt: false,
        configCppt: {
          title: 'Daftar CPPT',
          model_api: '',
          getter: 'cppt',
          setter: 'cppt',
          pk_field: 'cppt_id',
          frontendPaginate: false,
          filter_api: {},
          permission: {
            create: 'template-allow-all',
            read: false,
            update: 'template-allow-all',
            delete: 'template-allow-all'
          },
          slave: [
          ],
          fields: [
            // id_jenis_harga
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
            {
              id: 'tanggal_cppt',
              data: 'tanggal_cppt',
              label: 'Tanggal',
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
              id: 'assesmen',
              data: 'assesmen',
              label: 'Assesmen',
              placeholder: null,
              methods: {
                list: false,
                detail: false,
                create: { type: 'hidden' },
                update: { type: 'hidden' },
                filter: false
              }
            },
            // Registrasi
            {
              id: 'registrasi_id',
              data: 'registrasi_id',
              label: 'Registrasi',
              placeholder: null,
              methods: {
                list: { view_data: 'nama_lengkap' }, // rung di join ke ning nama pasien
                detail: { view_data: 'nama_lengkap' },
                create: {
                  setter: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                  getter: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                  value: '',
                  type: 'hidden',
                  option: {
                    list_pointer: {
                      label: 'nama_lengkap',
                      code: 'registrasi_id',
                      display: ['no_kunjungan', 'nama_lengkap', 'tgl_registrasi|date'],
                      headerDisplay: ['No Kunjungan', 'Nama Lengkap', 'Tanggal Registrasi'],
                    }
                  }
                },
                update: {
                  setter: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                  getter: 'registrasi/listKunjunganInapPerHalamanBypassUri',
                  type: 'hidden',
                  option: {
                    list_pointer: {
                      label: 'nama_lengkap',
                      code: 'registrasi_id',
                      display: ['no_kunjungan', 'nama_lengkap']
                    }
                  }
                },
                filter: false
              }
            },
            // Dokter
            {
              id: 'ms_dokter_id',
              data: 'ms_dokter_id',
              label: 'Dokter',
              placeholder: null,
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
                      headerDisplay: ['Tipe Tenaga Medis', 'Nama Tenaga Medis'],
                      display: ['nama_tipe_tenaga_medis', 'nama_dokter']
                    },
                    filterAPI: {
                      'kode_tipe_tenaga_medis': 'Dr',
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
                      headerDisplay: ['Tipe Tenaga Medis', 'Nama Tenaga Medis'],
                      display: ['nama_tipe_tenaga_medis', 'nama_dokter']
                    },
                    filterAPI: {
                      'kode_tipe_tenaga_medis': 'Dr',
                    }
                    
                  }
                },
                filter: false
              }
            },
            // Tipe Tenaga Medis
            {
              id: 'ms_tipe_tenaga_medis_id',
              data: 'ms_tipe_tenaga_medis_id',
              label: 'Tipe Tenaga Medis',
              placeholder: null,
              methods: {
                list: { view_data: 'nama_tipe_tenaga_medis' },
                detail: { view_data: 'nama_tipe_tenaga_medis' },
                create: {
                  // setter: 'ms_tipe_tenaga_medis',
                  // getter: 'ms_tipe_tenaga_medis',
                  type: 'lookup-radio',
                  option: {
                    list_pointer: {
                      label: 'nama_tipe_tenaga_medis',
                      code: 'id',
                      display: ['kode_tipe_tenaga_medis', 'nama_tipe_tenaga_medis'],
                      list: [
                        {
                          id                      : '44583559-a282-4727-aba2-fa95e253a201',
                          kode_tipe_tenaga_medis  : 'FRM',
                          nama_tipe_tenaga_medis  : 'FARMASI',
                        },
                        {
                          id                      : '3d85725e-2046-4996-ad17-859344627160',
                          kode_tipe_tenaga_medis  : 'Dr',
                          nama_tipe_tenaga_medis  : 'DOKTER',
                        },
                        {
                          id                      : 'a69afca0-7690-4546-8de3-cef96f3c2c25',
                          kode_tipe_tenaga_medis  : 'PRW',
                          nama_tipe_tenaga_medis  : 'PERAWAT',
                        },
                        {
                          id                      : 'ecd658bc-298e-4d42-a511-dc71dff659a6',
                          kode_tipe_tenaga_medis  : 'GZ',
                          nama_tipe_tenaga_medis  : 'Gizi',
                        },
                        {
                          id                      : 'a1f893de-9c0f-44e8-8bb6-d5c9a5edfccb',
                          kode_tipe_tenaga_medis  : 'FS',
                          nama_tipe_tenaga_medis  : 'FISIO',
                        },
                      ]
                    }
                  }
                },
                update: {
                  // setter: 'ms_tipe_tenaga_medis',
                  // getter: 'ms_tipe_tenaga_medis',
                  type: 'lookup-radio',
                  option: {
                    list_pointer: {
                      label: 'nama_tipe_tenaga_medis',
                      code: 'id',
                      display: ['kode_tipe_tenaga_medis', 'nama_tipe_tenaga_medis'],
                      list: [
                        {
                          id                      : '44583559-a282-4727-aba2-fa95e253a201',
                          kode_tipe_tenaga_medis  : 'FRM',
                          nama_tipe_tenaga_medis  : 'FARMASI',
                        },
                        {
                          id                      : '3d85725e-2046-4996-ad17-859344627160',
                          kode_tipe_tenaga_medis  : 'Dr',
                          nama_tipe_tenaga_medis  : 'DOKTER',
                        },
                        {
                          id                      : 'a69afca0-7690-4546-8de3-cef96f3c2c25',
                          kode_tipe_tenaga_medis  : 'PRW',
                          nama_tipe_tenaga_medis  : 'PERAWAT',
                        },
                        {
                          id                      : 'ecd658bc-298e-4d42-a511-dc71dff659a6',
                          kode_tipe_tenaga_medis  : 'GZ',
                          nama_tipe_tenaga_medis  : 'Gizi',
                        },
                        {
                          id                      : 'a1f893de-9c0f-44e8-8bb6-d5c9a5edfccb',
                          kode_tipe_tenaga_medis  : 'FS',
                          nama_tipe_tenaga_medis  : 'FISIO',
                        },
                      ]
                    }
                  }
                },
                filter: false
              }
            },
            // Nama Tenaga Medis
            {
              id: 'nama_tenaga_medis',
              data: 'nama_tenaga_medis',
              label: 'Nama Tenaga Medis',
              placeholder: null,
              methods: {
                list: true,
                detail: true,
                create: {
                  setter: 'msDokter',
                  getter: 'msDokter',
                  type: 'lookup-radio',
                  validation: ['required'],
                  option: {
                    list_pointer: {
                      label: 'nama_dokter',
                      code: 'nama_dokter',
                      headerDisplay: ['Tipe Tenaga Medis', 'Nama Tenaga Medis'],
                      display: ['nama_tipe_tenaga_medis', 'nama_dokter']
                    },
                    get_param: [
                      {
                        'id': 'ms_tipe_tenaga_medis_id',
                      }
                    ]
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
                      code: 'nama_dokter',
                      headerDisplay: ['Tipe Tenaga Medis', 'Nama Tenaga Medis'],
                      display: ['nama_tipe_tenaga_medis', 'nama_dokter']
                    },
                    get_param: [
                      {
                        'id': 'ms_tipe_tenaga_medis_id',
                      }
                    ]
                  }
                },
                filter: false
              }
            },
          ]
        },

        cpptTypeActive: 'dokter', 
        // cpptTypeTransition: 0 
      }
    },
    watch: {
      '$route.query': {
        deep: true,
        immediate: true,
        handler: function (val) {
          if (val.view === 'detail') {
            // this.assignData(val.id)
            // this.$route.replace({ 'name': this.$route.name, query: { view: 'list', id: '' }});
          }
        }
      }
    },
    mounted() {
      if (this.$route.query.view !== 'list') this.$router.push({ name: this.$route.name, query: { view: 'list' } })
    },
    methods: {
      viewAllCppt(registrasi_id) {
        this.$bvModal.show('modal-view-all-cppt')
        this.dataCppt = []
        this.loadingCppt = true;

        this.$_api.list(this.endpoint, { registrasi_id: registrasi_id }).then((res) => {
          console.log(res);
          this.loadingCppt = false;
          this.dataCppt = res.data.map((x) => {
            let dataAssesmen = {}

            console.log('x', x)

            let soap = ['subjective', 'objective', 'assesment', 'planning', 'lainnya']
            for (let e of soap) {
              if (x.asesmen && x.asesmen[e]) dataAssesmen[e] = x.asesmen[e]
              else dataAssesmen[e] = {}
            }
            
            return { ...x, dataAssesmen: dataAssesmen }
          })
        });
      },
      assignData (id) {
        console.log(id)
        this.$nextTick(() => {
          this.$bvModal.show('modal-assesmen')
          this.$_api.single(this.endpoint, { }, id).then((res) => {
            if (res.data.length > 0) {
              let data = res.data[0]
              this.activeTab = 'subjective'
              this.objectDataAssesmen = data
              
              let json_assesment_medis_rjalan = {
                subjective: {},
                objective: {},
                assesment: {},
                planning: {}
              }

              // let json_keperawatan = this.objectDataAssesmen.asesmen || {}
              // if (json_keperawatan.subjective) json_assesment_medis_rjalan.subjective = json_keperawatan.subjective
              // else json_assesment_medis_rjalan.subjective = {}
              // if (json_keperawatan.objective) json_assesment_medis_rjalan.objective = json_keperawatan.objective
              // else json_assesment_medis_rjalan.objective = {}
              // if (json_keperawatan.assesment) json_assesment_medis_rjalan.assesment = json_keperawatan.assesment
              // else json_assesment_medis_rjalan.assesment = {}
              // if (json_keperawatan.planning) json_assesment_medis_rjalan.planning = json_keperawatan.planning
              // else json_assesment_medis_rjalan.planning = {}
              // this.dataAssesmen = json_assesment_medis_rjalan

              // this.dataAssesmenDokter = { subjective: {}, objective: {}, assesment: {}, planning: {} }
              // this.dataAssesmenPerawat = { subjective: {}, objective: {}, assesment: {}, planning: {} }
              
              // let soap = ['planning',]
              // for (let e of soap) {
              //   if (data.asesmen && data.asesmen[e]) this.dataAssesmen[e] = this.objectDataAssesmen.asesmen[e]
              //   else this.dataAssesmen[e] = {}
                // if(data.asesmen && data.asesmen.dokter && data.asesmen.dokter[e]) this.dataAssesmenDokter[e] = data.asesmen.dokter[e]
                // else this.dataAssesmenDokter[e] = {}
                
                // if(data.asesmen && data.asesmen.perawat && data.asesmen.perawat[e]) this.dataAssesmenPerawat[e] = data.asesmen.perawat[e]
                // else this.dataAssesmenPerawat[e] = {}
              // }

              let a = this.objectDataAssesmen.asesmen || this.dataAssesmenPerawat

              if (!a.assesment) a.assesment = {}
              if (!a.lainnya) a.lainnya = {}
              if (!a.assesment.diagnosa) a.assesment.diagnosa = []
              if (!a.assesment.keperawatan) a.assesment.keperawatan = []
              if (!a.assesment.kebidanan) a.assesment.kebidanan = []

              if (!a.planning) a.planning = {}
              if (!a.planning.prosedur) a.planning.prosedur = []
              if (!a.planning.prosedur_yang_sudah_dilakukan) a.planning.prosedur_yang_sudah_dilakukan = []
              if (!a.planning.obat_jadi) a.planning.obat_jadi = []
              if (!a.planning.obat_racikan) a.planning.obat_racikan = []

              console.log('a', a)

              this.dataAssesmen = a
              
              // this.objectDataAssesmen.asesmen.dokter = this.dataAssesmenDokter
              // this.objectDataAssesmen.asesmen.perawat = this.dataAssesmenPerawat
  
            } else this.$_alert.error({}, 'Data CPPT tidak ditemukan!1')
          }).catch((err) => {
            console.log(err)
            this.$_alert.error({}, 'Terjadi Kesalahan CPPT2!')
          })
        });
      },
      async selectRegistrasi (e, moveToList = true) {
        if (this.registrasi_id !== e.registrasi_id) {
        }

        this.dataRegistrasi = e
        this.registrasi_id = e.registrasi_id || ''
        if (!this.registrasi_id) return

        // RESET DATA CPPT
        this.dataCppt = []

        this.configCppt.filter_api = { registrasi_id: this.registrasi_id }
        let field_registrasi_id = this.configCppt.fields.filter((x) => x.id == 'registrasi_id')
        if (field_registrasi_id.length) field_registrasi_id[0].methods.create.value = this.registrasi_id
        if (this.$route.query !== 'list' && moveToList) this.$router.push({ name: this.$route.name, query: { view: 'list' } })

        
        // this.$nextTick(() => {
        // });
      },
      updateAssesmen (data = {}) {
        // console.log('updateAssesmen', this.objectDataAssesmen)
        let payload = this.objectDataAssesmen
        payload.id = payload.cppt_id
        payload.asesmen = this.dataAssesmen
        
        this.$_api.update(this.endpoint, payload).then(() => {
          this.$_alert.success('Berhasil memperbarui data')
          // this.$router.push({query: { view: 'detail', id: payload.id }})
          // this.selectRegistrasi(this.dataRegistrasi, false)
          this.assignData(payload.id)
        }).catch((err) => {
          this.$_alert.error(err)
        })
      },
      deleteData (data) {
        console.log(this.$refs['CRUD-cppt']);
        // this.$bvModal.hide('modal-assesmen')
        this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
          if (result.isConfirmed) {
            this.$_api.delete(this.endpoint, { id: data.cppt_id }).then(res => {
              // this.getData(this.paramAPI, true)
              this.$refs['CRUD-cppt'].$children[1].getData({ limit: 1, page: 1, registrasi_id: this.registrasi_id }, true)
              this.$_alert.success(null, res.message)
            }).catch(err => {
              this.$refs['CRUD-cppt'].$children[1].getData({ limit: 1, page: 1, registrasi_id: this.registrasi_id }, true)
              this.$_alert.error(err)
            })
          }
        })
      }
    },
    watch: {
      '$route.query': {
        deep: true,
        immediate: true,
        handler: function (val) {
          if (val.view === 'detail') {
            // this.assignData(val.id)
            this.$route.push({ 'name': this.$route.name, query: { view: 'list', id: '' }})
          }
        }
      }
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
    z-index: 90; top: 119px; left: 290px; right: 25px;
  }
  header .header-inner {
    transition: all 250ms cubic-bezier(0.33, 1, 0.68, 1);
    max-height: auto;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
</style>