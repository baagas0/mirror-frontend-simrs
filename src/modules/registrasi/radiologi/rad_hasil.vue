<template lang="">

  <div class="w-100">
    <tas-base-crud ref="BASE-CRUD-rad_hasil" :config="config" >
      <template v-slot:list-action>
        <button 
          class="btn btn-primary mr-2" 
          :class="{ cetakLoading: 'spinner spinner-white spinner-right' }"
          @click="printRad()" 
          :disabled="dataRegis.status < 2"
        >
          <i class="ri-printer-line"></i>
          Cetak Radiologi
        </button>
  
        <button class="btn btn-info btn-circle mr-2" v-b-modal.modal-sampel :disabled="dataRegis.status < 1" v-if="dataRegis.status != 4">
          <i class="ri-contrast-drop-2-line"></i>
          Pengambilan Citra        
        </button>
  
        <button class="btn btn-warning btn-circle mr-2" @click="createRadHasil()" :disabled="dataRegis.status < 2" v-if="dataRegis.status != 4">
          <i class="ri-refresh-line p-0"></i>
          Buat Radiologi Hasil
        </button>
        
        <b-modal id="modal-sampel" title="Pengambilan Sampel" hide-footer>
          <s-input groupClass="mb-0" v-model="dataRegis.tanggal_ambil_sampel" :item="{
            label: 'Tanggal',
            id: 'tanggal_ambil_sampel',
            data: 'tanggal_ambil_sampel',
            type: 'datetime',
            validation: ['required'],
            formatDateView: 'DD MMM YYYY HH:mm',
          }" :valuee="dataRegis.tanggal_ambil_sampel" />
  
          <div class="d-flex gap-10">
            <button type="submit" class="btn btn-primary mr-3 w-100" @click="updateSampel()">
              <i class="ri-save-line"></i>
              Simpan
            </button>
  
            <!-- <button type="submit" class="btn btn-primary mr-3 w-100">
              <i class="ri-save-line"></i>
              Cetak Barcode
            </button> -->
          </div>

          <div id="print-barcode" style="position: relative; display: none">
            <div size="A4">
              <div class="" style=" align-items: center; width: 99%; margin-bottom: 10px;">
                  <!-- KOP -->
                  <table class="custom-table" >
                      <tr>
                          <td rowspan="2" style="height: 60px;"><img :src="$_config.logo.lg" alt="" height="70px"></td>
                          <td style="height: 25px; align-items: center;vertical-align: middle;">
                              <h5 style="font-weight: 600; font-size: 25px; line-height: 35px;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h5>
                          </td>
                          
                      </tr>
                      <tr>
                          <td style="height: 15px;">
                              Jl. Gajah mada kec.batauga kab.buton selatan, sulawesi tenggara
                          </td>
                      </tr>
      
                      <tr class="bg-dark">
                          <td colspan="3" style="text-align: center; vertical-align: middle;font-weight: 600; height: 20px;">Barcode</td>
                      </tr>
                      <tr>
                          <td colspan="3" class="text-center">
                            <img :src="'https://api.qrserver.com/v1/create-qr-code?color=000000&bgcolor=FFFFFF&data='+ dataRegis.tanggal_ambil_sampel +'&qzone=1&margin=0&size=250x250&ecc=L'" alt="">
                          </td>
                      </tr>
                  </table>
              </div>
            </div>
          </div>
          
        </b-modal>
  
        <b-toast id="toast-detail-createRadHasil" variant="info" solid no-auto-hide no-close-button :visible="isLoadingSync">
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-center pt-2">
              <b-spinner Radiologiel="Spinning" small></b-spinner>
              <strong class="mr-auto pl-3">Radiologi Hasil ...</strong>
              <small class="text-muted mr-2">
                <time-ago locale="id"></time-ago>
              </small>
            </div>
          </template>
          Sedang membuat radiologi hasil
          <b-progress class="mt-3" :value="syncCount" :max="1" animated></b-progress>
        </b-toast>
      </template>
      <template v-slot:list-table-action="rowData">
        <button
          class="btn btn-sm btn-primary mr-1"
          @click="openExpertiseModal(rowData)"
          title="Lihat Expertise Radiologi"
        >
          <i class="ri-file-list-3-line"></i>
          Expertise
        </button>
      </template>
    </tas-base-crud>

    <!-- Expertise Modal -->
    <b-modal
      v-model="showExpertiseModal"
      size="xl"
      title="Expertise Radiologi"
      hide-footer
      no-fade
    >
      <RadExpertise
        :rad_hasil_id="selectedRadHasilId"
        :embedded="true"
        @close="closeExpertiseModal"
      />
    </b-modal>

    <div id="cetak-rad-hasil" style="position: relative; display: none;">
      <section class="content-print A4">
        <div class="sheet w-100">
            <div class="w-100">
                <table border="0" class="custom-table">
                    <tbody>
                        <tr>
                            <td style="width: 15%;vertical-align: middle;padding-left: 1.5mm;padding-right: 1.5mm;"><img :src="$_config.logo.lg" alt="" style="width: 100%;"></td>
                            <td style="width: 70%;vertical-align: middle;">
                                <h6 style="text-align: center;font-weight: bold;margin-bottom: 0;font-size: 16pt;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h6>
                                <h6 style="text-align: center;font-weight: normal;font-size: 10pt;"><span>Jl. Gajah mada kec.batauga kab.buton selatan, sulawesi tenggara Telepon 085257769540</span></h6>
                                <h6 style="text-align: center;font-weight: normal;font-size: 10pt;"><span>Surat Elektronik : rsudbusel@gmail.com</span> </h6>
                            </td>
                            <!-- <td style="width: 15%;vertical-align: middle;padding-left: 1.5mm;padding-right: 1.5mm;"><img src="https://via.placeholder.com/80" alt="" style="width: 100%;"></td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
  
            <div class="line" style="margin-top: 2.5mm;margin-bottom: 2.5mm;"></div>
  
            <div class="w-100" style="margin-top: 5mm;">
                <h6 style="text-align: center;"><strong><u>HASIL PEMERIKSAAN RADIOLOGI</u></strong></h6>
            </div>
            <!-- <pre>{{ dataRegis }}</pre> -->
            <div class="w-100-flex" style="margin-top: 5mm;">
                <div style="width: 50%;">
                    <table border="0" class="custom-table">
                        <tbody>
                            <!-- <tr>
                                <td style="width: 50mm;">Dokter Penanggung Jawab</td>
                                <td style="width: 2.5mm;">:</td>
                                <td></td>
                            </tr> -->
    
                            <tr>
                              <td>Nama Pasien</td>
                              <td>:</td>
                              <td>{{ dataRegis.nama_lengkap || '-' }}</td>
                            </tr>
    
                            <tr>
                                <td>No. RM</td>
                                <td>:</td>
                                <td>{{ dataRegis.no_rm || '-' }}</td>
                            </tr>
    
                            <tr>
                                <td>Tanggal Radiologi</td>
                                <td>:</td>
                                <td>{{ dataRegis.tanggal_request | parse('longDateTime') }}</td>
                            </tr>
    
                            <tr>
                              <td>Alamat</td>
                              <td>:</td>
                              <td>{{ dataRegis.alamat_sekarang || '-' }}</td>
                            </tr>
    
                            <!-- <tr>
                                <td>Alamat </td>
                                <td>:</td>
                                <td>{{ dataRegis.alamat_sekarang || '-' }}</td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
                <div style="width: 50%;">
                    <table border="0" class="custom-table">
                        <tbody>
                            <!-- <tr>
                                <td style="width: 50mm;">Penanggung</td>
                                <td style="width: 2.5mm;">:</td>
                                <td></td>
                            </tr> -->
    
                            <tr>
                                <td>Dokter Penanggung Jawab</td>
                                <td>:</td>
                                <td>{{ dataRegis.nama_dokter || '-' }}</td>
                            </tr>
    
                            <tr>
                                <td>ID Kun / Tgl Kun</td>
                                <td>:</td>
                                <td>{{ dataRegis.no_kunjungan || '-' }}/{{ dataRegis.tgl_registrasi | parse('longDateTime') }}</td>
                            </tr>
    
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>:</td>
                                <td>{{ dataRegis.jenis_kelamin | parse('kelamin') }}</td>
                            </tr>
    
                            <tr>
                                <td>Tgl Lahir / Umur</td>
                                <td>:</td>
                                <td>{{ dataRegis.tgl_lahir | parse('old') }}/{{ dataRegis.tgl_lahir | parse('longDate') }}</td>
                            </tr>
    
                            <tr>
                                <td>Telepon </td>
                                <td>:</td>
                                <td>{{ dataRegis.no_telepon || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
  
            <div class="w-100" style="margin-top: 5mm; width: 100%">
                <table border="1" class="custom-table">
                    <thead>
                        <tr>
                            <th>Pemeriksaan</th>
                            <th>Hasil</th>
                            <th>Nilai Rujukan</th>
                            <th>Satuan</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
  
                    <tbody>
                      <tr v-for="(h, i) in hasilTree" :key="i+'-rad-hasil'">
                        <td style="padding-left: 5mm;text-align: center;">{{h.nama_penunjang  }}</td>
                        <td style="text-align: center;"><strong>{{ h.hasil }}</strong></td>
                        <td style="text-align: center;">{{ h.parameter_normal }}</td>
                        <td style="text-align: center;">{{ h.satuan }}</td>
                        <td style="text-align: center;">{{ h.keterangan_rad_hasil }}</td>
                      </tr>
                      <!-- <pre>{{item}}</pre> -->
                    </tbody>
                </table>
            </div>

            <div v-for="(itemExpertise, index) in hasilExpertise" :key="index" class="w-100" style="margin-top: 5mm;">
              <table border="1" class="custom-table">
                <thead>
                  <tr style="background-color: #f0f0f0;">
                    <th colspan="2" style="text-align: center; padding: 5px;"><strong>HASIL EXPERTISE {{ itemExpertise.nama_penunjang }}</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 20%; vertical-align: top; padding: 5px;"><strong>Teknik:</strong></td>
                    <td style="padding: 5px;">{{ itemExpertise.technique || itemExpertise.technique_used || '-' }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; padding: 5px;"><strong>Temuan:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.temuan || '-' }}</td>
                  </tr>
                  <tr v-if="itemExpertise.measurements">
                    <td style="vertical-align: top; padding: 5px;"><strong>Pengukuran:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.measurements }}</td>
                  </tr>
                  <tr v-if="itemExpertise.additional_findings">
                    <td style="vertical-align: top; padding: 5px;"><strong>Temuan Tambahan:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.additional_findings }}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; padding: 5px;"><strong>Kesimpulan:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.kesimpulan || '-' }}</td>
                  </tr>
                  <tr v-if="itemExpertise.saran">
                    <td style="vertical-align: top; padding: 5px;"><strong>Saran/Rekomendasi:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.saran }}</td>
                  </tr>
                  <tr v-if="itemExpertise.clinical_correlation">
                    <td style="vertical-align: top; padding: 5px;"><strong>Korelasi Klinis:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.clinical_correlation }}</td>
                  </tr>
                  <tr v-if="itemExpertise.comparison_notes">
                    <td style="vertical-align: top; padding: 5px;"><strong>Catatan Perbandingan:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.comparison_notes }}</td>
                  </tr>
                  <tr v-if="itemExpertise.limitations">
                    <td style="vertical-align: top; padding: 5px;"><strong>Keterbatasan:</strong></td>
                    <td style="padding: 5px; white-space: pre-wrap;">{{ itemExpertise.limitations }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
  
            <div class="w-100" style="margin-top: 5mm;">
                <table border="0" class="custom-table">
                    <tbody>
                        <tr>
                            <td style="width: 50%;"></td>
                            <td style="width: 50%;">
                                <h6 style="text-align: center;"><span>Busel, {{ dateToday | parse('longDate') }}</span></h6>
                                <h6 style="text-align: center;">Dokter yang memeriksa,</h6>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <h6 style="text-align: center;"><span>{{ dataRegis.nama_dokter || '-' }}</span></h6>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </section>
    </div>
  </div>

  
</template>

<script>
import print from '../../../components/print.js';
import RadExpertise from './rad_expertise.vue';

import moment from 'moment'
moment.locale('id')

export default {
  name: 'crud-rad_hasil',
  components: {
    RadExpertise
  },
  data() {
    return {
      dateToday: moment(new Date).format('YYYY-MM-DD'),
      isLoadingSync: false,
      syncCount: 0,
      cetakLoading: false,
      dataRegis: {},
      hasilTree: [],
      hasilExpertise: [],

      // Expertise Modal
      showExpertiseModal: false,
      selectedRadHasilId: null,

      config: {
        title: 'Hasil Radiologi',
        model_api: 'rad_hasil',
        getter: 'rad_hasil',
        setter: 'rad_hasil',
        pk_field: 'rad_hasil_id',
        frontendPaginate: false,
        filter_api: {
          id: '' // Biar datanya ngga muncul (waktu slave di rad_regis ini di kasih string kosong)
        },
        permission: {
          create: false,
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: false
        },
        slave: [
        ],
        fields: [
          // rad_hasil_id
          {
            id: 'rad_hasil_id',
            data: 'rad_hasil_id',
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
          // rad_regis_id
          {
            id: 'rad_regis_id',
            data: 'rad_regis_id',
            label: 'Registrasi Radiologi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                setter: 'rad_regis',
                getter: 'rad_regis',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'rad_regis_id',
                    display: ['nama_dokter', 'tanggal_request|date']
                  }
                }
              },
              update: {
                setter: 'rad_regis',
                getter: 'rad_regis',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_lengkap',
                    code: 'rad_regis_id',
                    display: ['nama_lengkap', 'tanggal_request']
                  }
                }
              },
              filter: true
            }
          },
          // tanggal_pemeriksaan
          {
            id: 'tanggal_pemeriksaan',
            data: 'tanggal_pemeriksaan',
            label: 'Tanggal Pemeriksaan',
            placeholder: 'Ketik Tanggal Pemeriksaan',
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'datetime', validation: ['required'] },
              update: { type: 'datetime', validation: ['required'] },
              filter: true
            }
          },
          // rad_test_id
          {
            id: 'rad_test_id',
            data: 'rad_test_id',
            label: 'Test Radiologi',
            placeholder: 'Ketik Test Radiologi',
            methods: {
              list: { view_data: 'nama_rad_test' },
              detail: { view_data: 'nama_rad_test' },
              create: {
                setter: 'rad_test',
                getter: 'rad_test',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_rad_test',
                    code: 'rad_test_id',
                    display: ['nama_rad_test']
                  }
                }
              },
              update: {
                setter: 'rad_test',
                getter: 'rad_test',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_rad_test',
                    code: 'rad_test_id',
                    display: ['nama_rad_test']
                  }
                }
              },
              filter: true
            }
          },

          // penunjang_id
          {
            id: 'penunjang_id',
            data: 'penunjang_id',
            label: 'Penunjang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_penunjang' },
              detail: { view_data: 'nama_penunjang' },
              create: {
                setter: 'penunjang',
                getter: 'penunjang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_penunjang',
                    code: 'penunjang_id',
                    display: ['nama_penunjang', 'keterangan_penunjang']
                  }
                }
              },
              update: {
                setter: 'penunjang',
                getter: 'penunjang',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_penunjang',
                    code: 'penunjang_id',
                    display: ['nama_penunjang', 'keterangan_penunjang']
                  }
                }
              },
              filter: true
            }
          },

          // hasil
          {
            id: 'hasil',
            data: 'hasil',
            label: 'Hasil',
            placeholder: 'Ketik Hasil',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: ['required'] },
              update: { type: 'text', validation: ['required'] },
              filter: true
            }
          },
          // kesan
          {
            id: 'kesan',
            data: 'kesan',
            label: 'Kesan',
            placeholder: 'Ketik Kesan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: [] },
              update: { type: 'textarea', validation: [] },
              filter: true
            }
          },
          // saran
          {
            id: 'saran',
            data: 'saran',
            label: 'Saran',
            placeholder: 'Ketik Saran',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: [] },
              update: { type: 'textarea', validation: [] },
              filter: true
            }
          },
          // file_tambahan
          {
            id: 'file_tambahan',
            data: 'file_tambahan',
            label: 'File Tambahan',
            placeholder: null,
            methods: {
              list: {
                type: 'file',
                view_data: 'file_tambahan'
              },
              detail: {
                type: 'file',
                view_data: 'file_tambahan'
              },
              create: { type: 'file', attr: [{ accept: '*' }, { limit: 1 }] },
              update: { type: 'file', attr: [{ accept: '*' }, { limit: 1 }] },
              filter: false
            }
          },
          // queue
          {
            id: 'queue',
            data: 'queue',
            label: 'Urutan',
            placeholder: 'Ketik Urutan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'number', validation: ['required'] },
              update: { type: 'number', validation: ['required'] },
              filter: true
            }
          },
          // keterangan_rad_hasil
          {
            id: 'keterangan_rad_hasil',
            data: 'keterangan_rad_hasil',
            label: 'Keterangan',
            placeholder: 'Ketik Keterangan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', validation: ['required'] },
              update: { type: 'textarea', validation: ['required'] },
              filter: true
            }
          },
          // actions
          {
            id: 'actions',
            data: 'actions',
            label: 'Aksi',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,
    }
  },
  mounted() {
    this.getDataRegis()
    this.getDataPrintRad()
  },
  methods: {
    createRadHasil() {
      console.log(this.$route.name)
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id
        this.$bvToast.show('toast-detail-createRadHasil')
        this.isLoadingSync = true
        this.syncCount = 0
        this.$_api
          .post('rad_regis/createradhasil', { id, forceUpdate: false })
          .then((res) => {
            setTimeout(() => {
              this.isLoadingSync = false
              this.syncCount++
              this.$_alert.success('Rad Hasil berhasil dibuat')

              // Refresh Slave 
              if (this.$parent.slaveList.length > 0) {
                let slave = this.$parent.slaveList[0]
                slave.rules.permission = {
                  create: false,
                  read: false,
                  update: false,
                  delete: false
                }
                console.log(slave)
                this.$parent.setActiveSlave(slave)
              }
            }, 1000)

          })
          .catch((err) => {
            setTimeout(() => {
              // this.isLoadingSync = false
              // this.$_alert.error(err)
              this.isLoadingSync = false
              this.syncCount++
              this.$refs['BASE-CRUD-rad_hasil'].$children[1].getData()
              this.$_alert.error({}, err.data.data)
            }, 1000)
          })
      } else {
        this.$_alert.error({}, 'Tidak dapat membuat hasil radiologi')
      }
    },
    getDataRegis() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id

        this.$_api.post('rad_regis/list', { id: id }).then((res) => {
          this.cetakLoading = false;
          if (res && res.data && res.data.length) {
            this.dataRegis = res.data[0]
            this.dataRegis.tanggal_ambil_sampel = moment(this.dataRegis.tanggal_ambil_sampel).local().format('YYYY-MM-DD HH:mm:ss')
            // this.printRad()
          }
          else {
            this.cetakLoading = false;
            this.$_alert.error({}, "Terjadi Kesalahan.");
          }
        })
          .catch((err) => {
            console.log(err)
            this.$_alert.error(err, "Terjadi Kesalahan.");
          })
      }
    },
    async getDataPrintRad2() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id
        this.cetakLoading = true;

        const res = await this.$_api.post('rad_hasil/list', { rad_regis_id: id })
        this.hasilTree = res.data

        const resExpertise = await this.$_api.post('/rad_expertise/list', {
          page: this.currentPage,
          perPage: this.perPage,
          ...this.filters,
          rad_regis_id: id
        })

        if (resExpertise.status === 200) {
          this.hasilExpertise = resExpertise.data
        }
      }
    },
    getDataPrintRad() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id
        this.cetakLoading = true;

        this.$_api.post('rad_hasil/list', { rad_regis_id: id }).then((res) => {
          console.log('res', res)

          this.hasilTree = res.data

        })
          .catch((err) => {
            console.log(err)
            this.cetakLoading = false;
            this.$_alert.error(err, "Terjadi Kesalahan.");

          })
      }
    },
    updateSampel() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id
        const payload = {
          tanggal_ambil_sampel: this.dataRegis.tanggal_ambil_sampel,
          id: id
        }

        if (this.dataRegis.status < 2) payload.status = 2

        this.$_api.post('rad_regis/updateSampel', payload).then(async (res) => {
          this.$_alert.success('Berhasil memperbarui')

          // REFRESH
          this.$router.push({ name: this.$route.name, query: { 'view': 'list', id: id }, params: { id: id } }).then(() => {
            this.$router.push({ name: this.$route.name, query: { 'view': 'detail', id: id }, params: { id: id } }).then(() => {

              this.$_alert.success('Berhasil memperbarui')

            })
          })

          // this.$_alert.confirm('Apakah anda ingin mencetak barcode?').then(async (res) => {
          //   if(res.isConfirmed) {
          //     await this.printBarcode()
          //   }
          // })
        }).catch((err) => {
          this.$_alert.error({}, 'Gagal memperbarui')
        })
      } else {
        this.$_alert.error({}, 'Tidak dapat memperbarui')
      }
    },
    async printBarcode() {
      let optionsss = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          '/static/assets/cetak/cetak-resume-medis.css',
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }

      //  this.$htmlToPaper(el, optionsss)
      print('print-barcode', optionsss);
    },
    async printRad() {
      await this.getDataPrintRad2()
      // this.$_alert.error({}, 'Dalam tahap pengembangan.');
      // return

      let optionsss = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          '/static/assets/cetak/paper-a4.css',
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }

      //  this.$htmlToPaper(el, optionsss)
      print('cetak-rad-hasil', optionsss);
    },

    // Expertise Modal Methods
    openExpertiseModal(rowData) {
      this.selectedRadHasilId = rowData.rowData.rad_hasil_id
      this.showExpertiseModal = true
    },

    closeExpertiseModal() {
      this.showExpertiseModal = false
      this.selectedRadHasilId = null
    }
  }
}
</script>
