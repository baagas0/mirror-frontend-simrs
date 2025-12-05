<template>
  <div class="w-100">
    <tas-base-crud ref="crud-pengambilan-sampel" :config="buildConfig" :filterView="false" :hideFilter="false" :hideGlobalSearch="false">

      <template v-slot:list-header>
        <!-- TOmbol back -->
        <button v-if="$route.params.lab_regis_id" class="btn btn-sm btn-secondary mr-2 mb-3" @click="$router.replace({ name: 'Lab Regis' })">
          <i class="ri-arrow-left-line"></i> Kembali ke Registrasi Lab
        </button>
      </template>

      <!-- Custom List Fields -->
      <template v-slot:list-status_pengambilan="rowData">
        <span class="badge" :class="getStatusClass(rowData.rowData.status_pengambilan)">
          {{ getStatusText(rowData.rowData.status_pengambilan) }}
        </span>
      </template>

      <template v-slot:list-petugasAmbil="rowData">
        {{ rowData.rowData.petugasAmbil ? rowData.rowData.petugasAmbil.nama_dokter : '-' }}
      </template>

      <template v-slot:list-labRegis="rowData">
        <div v-if="rowData.rowData.labRegis">
          <div>{{ rowData.rowData.labRegis.keterangan_lab_regis || '-' }}</div>
          <small class="text-muted">{{ rowData.rowData.labRegis.dokter ? rowData.rowData.labRegis.dokter.nama_dokter : '-' }}</small>
        </div>
        <div v-else>-</div>
      </template>

      <!-- Custom Detail Fields -->
      <template v-slot:detail-status_pengambilan="rowData">
        <span class="badge badge-lg" :class="getStatusClass(rowData.rowData.status_pengambilan)">
          {{ getStatusText(rowData.rowData.status_pengambilan) }}
        </span>
      </template>

      <!-- Action Buttons -->
      <template v-slot:list-table-action="rowData">
        <!-- <button class="btn btn-sm btn-info mr-1" @click="$refs['crud-pengambilan-sampel'].getEvent('detail', rowData.rowData)">
          <i class="ri-information-line"></i> Detail
        </button> -->

        <!-- Start Button -->
        <button v-if="rowData.rowData.status_pengambilan === 0"
                class="btn btn-sm btn-success mr-1"
                @click="startPengambilan(rowData.rowData)">
          <i class="ri-play-line"></i> Mulai
        </button>

        <!-- Finish Button -->
        <button v-if="rowData.rowData.status_pengambilan === 1"
                class="btn btn-sm btn-primary mr-1"
                @click="finishPengambilan(rowData.rowData)">
          <i class="ri-check-line"></i> Selesai
        </button>

        <!-- Cancel Button -->
        <button v-if="rowData.rowData.status_pengambilan === 0 || rowData.rowData.status_pengambilan === 1"
                class="btn btn-sm btn-warning mr-1"
                @click="cancelPengambilan(rowData.rowData)">
          <i class="ri-close-line"></i> Batal
        </button>

        <!-- Sync Satu Sehat -->
        <!-- <button v-if="!rowData.rowData.is_sync_satu_sehat"
                class="btn btn-sm btn-secondary mr-1"
                @click="syncSatuSehat(rowData.rowData)">
          <i class="ri-refresh-line"></i> Sync
        </button> -->
      </template>

      <!-- Detail Footer Actions -->
      <template v-slot:detail-footer="rowData">
        <div class="d-flex gap-10" v-if="rowData && rowData.rowData">
          <button v-if="rowData.rowData.status_pengambilan === 0"
                  class="btn btn-success"
                  @click="startPengambilan(rowData.rowData)">
            <i class="ri-play-line"></i> Mulai Pengambilan
          </button>

          <button v-if="rowData.rowData.status_pengambilan === 1"
                  class="btn btn-primary"
                  @click="finishPengambilan(rowData.rowData)">
            <i class="ri-check-line"></i> Selesai Pengambilan
          </button>

          <button v-if="rowData.rowData.status_pengambilan === 0 || rowData.rowData.status_pengambilan === 1"
                  class="btn btn-warning"
                  @click="cancelPengambilan(rowData.rowData)">
            <i class="ri-close-line"></i> Batalkan
          </button>

          <!-- <button v-if="!rowData.rowData.is_sync_satu_sehat"
                  class="btn btn-secondary"
                  @click="syncSatuSehat(rowData.rowData)">
            <i class="ri-refresh-line"></i> Sync ke Satu Sehat
          </button> -->

          <span v-if="rowData.rowData.is_sync_satu_sehat" class="badge badge-success">
            <i class="ri-checkbox-circle-line"></i> Sudah Sync
          </span>
        </div>
      </template>
    </tas-base-crud>

    <!-- Modal for Start Pengambilan -->
    <b-modal id="modal-start-pengambilan" title="Mulai Pengambilan Sampel" hide-footer>
      <ValidationObserver v-slot="{ handleSubmit }" ref="formStart">
        <form @submit.prevent="handleSubmit(submitStartPengambilan)">
          <s-input groupClass="mb-3" v-model="startForm.petugas_ambil_id" :item="{
            label: 'Petugas Pengambil',
            id: 'petugas_ambil_id',
            data: 'petugas_ambil_id',
            type: 'lookup-radio',
            validation: ['required'],
            api: 'msDokter',
            pointer: {
              label: 'nama_dokter',
              code: 'ms_dokter_id',
              display: ['nama_dokter', 'nama_specialist'],
              headerDisplay: ['Nama', 'Spesialis']
            }
          }" />

          <div class="d-flex gap-10">
            <button type="submit" class="btn btn-primary w-100" :disabled="loading">
              <i class="ri-play-line" v-if="!loading"></i>
              <i class="ri-loader-4-line animate-spin" v-else></i>
              Mulai Pengambilan
            </button>
            <button type="button" class="btn btn-secondary w-100" @click="$bvModal.hide('modal-start-pengambilan')">
              Batal
            </button>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>

    <!-- Modal for Finish Pengambilan -->
    <b-modal id="modal-finish-pengambilan" title="Selesaikan Pengambilan Sampel" size="lg" hide-footer>
      <ValidationObserver v-slot="{ handleSubmit }" ref="formFinish">
        <form @submit.prevent="handleSubmit(submitFinishPengambilan)">
          <div class="row">
            <div class="col-md-6">
              <s-input groupClass="mb-3" v-model="finishForm.volume_sampel" :item="{
                label: 'Volume Sampel',
                id: 'volume_sampel',
                data: 'volume_sampel',
                type: 'text',
                placeholder: 'Contoh: 5ml, 10cc'
              }" />
            </div>
            <div class="col-md-6">
              <s-input groupClass="mb-3" v-model="finishForm.kondisi_sampel" :item="{
                label: 'Kondisi Sampel',
                id: 'kondisi_sampel',
                data: 'kondisi_sampel',
                type: 'text',
                placeholder: 'Contoh: Baik, Cukup Baik'
              }" />
            </div>
            <div class="col-md-6">
              <s-input groupClass="mb-3" v-model="finishForm.lokasi_ambil" :item="{
                label: 'Lokasi Pengambilan',
                id: 'lokasi_ambil',
                data: 'lokasi_ambil',
                type: 'text',
                placeholder: 'Contoh: Ruang 1, Lantai 2'
              }" />
            </div>
            <div class="col-md-6">
              <s-input groupClass="mb-3" v-model="finishForm.tipe_sampel" :item="{
                label: 'Tipe Sampel',
                id: 'tipe_sampel',
                data: 'tipe_sampel',
                type: 'text',
                placeholder: 'Contoh: Darah, Urine'
              }" />
            </div>
            <div class="col-md-6">
              <s-input groupClass="mb-3" v-model="finishForm.no_rak" :item="{
                label: 'No. Rak',
                id: 'no_rak',
                data: 'no_rak',
                type: 'text',
                placeholder: 'Contoh: A-1, B-2'
              }" />
            </div>
            <div class="col-md-6">
              <s-input groupClass="mb-3" v-model="finishForm.suhu_penyimpanan" :item="{
                label: 'Suhu Penyimpanan',
                id: 'suhu_penyimpanan',
                data: 'suhu_penyimpanan',
                type: 'text',
                placeholder: 'Contoh: 2-8°C, -20°C'
              }" />
            </div>
            <div class="col-12">
              <s-input groupClass="mb-3" v-model="finishForm.catatan_pengambilan" :item="{
                label: 'Catatan Pengambilan',
                id: 'catatan_pengambilan',
                data: 'catatan_pengambilan',
                type: 'textarea',
                rows: 3
              }" />
            </div>
          </div>

          <div class="d-flex gap-10">
            <button type="submit" class="btn btn-primary w-100" :disabled="loading">
              <i class="ri-check-line" v-if="!loading"></i>
              <i class="ri-loader-4-line animate-spin" v-else></i>
              Selesaikan Pengambilan
            </button>
            <button type="button" class="btn btn-secondary w-100" @click="$bvModal.hide('modal-finish-pengambilan')">
              Batal
            </button>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>

    <!-- Modal for Cancel Pengambilan -->
    <b-modal id="modal-cancel-pengambilan" title="Batalkan Pengambilan Sampel" hide-footer>
      <ValidationObserver v-slot="{ handleSubmit }" ref="formCancel">
        <form @submit.prevent="handleSubmit(submitCancelPengambilan)">
          <s-input groupClass="mb-3" v-model="cancelForm.keterangan" :item="{
            label: 'Alasan Pembatalan',
            id: 'keterangan',
            data: 'keterangan',
            type: 'textarea',
            rows: 3,
            validation: ['required'],
            placeholder: 'Masukkan alasan pembatalan'
          }" />

          <div class="d-flex gap-10">
            <button type="submit" class="btn btn-warning w-100" :disabled="loading">
              <i class="ri-close-line" v-if="!loading"></i>
              <i class="ri-loader-4-line animate-spin" v-else></i>
              Batalkan Pengambilan
            </button>
            <button type="button" class="btn btn-secondary w-100" @click="$bvModal.hide('modal-cancel-pengambilan')">
              Tutup
            </button>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      currentData: null,
      startForm: {
        petugas_ambil_id: ''
      },
      finishForm: {
        volume_sampel: '',
        kondisi_sampel: '',
        lokasi_ambil: '',
        tipe_sampel: '',
        no_rak: '',
        suhu_penyimpanan: '',
        catatan_pengambilan: ''
      },
      cancelForm: {
        keterangan: ''
      },
      filterView: [
        {
          label: 'Status Pengambilan',
          key: 'status_pengambilan',
          type: 'select',
          options: [
            { value: '', label: 'Semua' },
            { value: 0, label: 'Pending' },
            { value: 1, label: 'Sedang Diambil' },
            { value: 2, label: 'Selesai' },
            { value: 3, label: 'Gagal/Dibatalkan' }
          ]
        },
        {
          label: 'Tanggal Mulai',
          key: 'tanggal_mulai',
          type: 'date'
        },
        {
          label: 'Tanggal Selesai',
          key: 'tanggal_selesai',
          type: 'date'
        },
        {
          label: 'Petugas',
          key: 'petugas_ambil_id',
          type: 'lookup',
          api: 'dokter/listPerHalaman',
          pointer: {
            label: 'nama_dokter',
            code: 'id'
          }
        }
      ],
      hideFilter: false,
      hideGlobalSearch: false
    }
  },
  mounted() {
    // Handle route parameters from navigation
    if (this.$route.params.lab_regis_id) {
      console.log('===> lab_pengambilan_sampel.vue:309 ~ lab_regis_id', this.$route.params.lab_regis_id);
      // Pre-fill lab_regis_id when coming from lab_regis
      this.$nextTick(() => {
        console.log('===> lab_pengambilan_sampel.vue:313 ~', this.$refs['crud-pengambilan-sampel']);
        if (this.$refs['crud-pengambilan-sampel'] && this.$refs['crud-pengambilan-sampel'].$children[1]) {
          setTimeout(() => {

            console.log('===> lab_pengambilan_sampel.vue:316 ~ ' );
            this.$refs['crud-pengambilan-sampel'].$children[1].form.lab_regis_id = this.$route.params.lab_regis_id
            this.$refs['crud-pengambilan-sampel'].$children[1].filter_api = {
              lab_regis_id: this.$route.params.lab_regis_id
            }
          }, 500)
        }
      })
    }
  },
  computed: {
    buildConfig() {
      return {
        model_api: 'lab_pengambilan_sampel',
        getter: 'lab_pengambilan_sampel',
        setter: 'lab_pengambilan_sampel',
        pk_field: 'id',
        title: 'Pengambilan Sampel Laboratorium',
        subtitle: 'Manajemen Pengambilan Sampel Laboratorium',
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        filter_api: {
          lab_regis_id: this.$route.params.lab_regis_id ? this.$route.params.lab_regis_id : null
        },
        fields: [
          {
            id: 'id',
            data: 'id',
            label: 'ID',
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
            id: 'lab_regis_id',
            data: 'lab_regis_id',
            label: 'Registrasi Lab',
            placeholder: 'Pilih Registrasi Lab',
            methods: {
              list: { view_data: 'labRegis.keterangan_lab_regis' },
              detail: { view_data: 'labRegis.keterangan_lab_regis' },
              create: {
                setter: 'lab_regis',
                getter: 'lab_regis',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'keterangan_lab_regis',
                    code: 'id_lab_regis',
                    display: ['nama_lengkap', 'keterangan_lab_regis', 'createdAt|date'],
                    headerDisplay: ['Nama Pasien', 'Keterangan', 'Tanggal']
                  },
                  api: 'lab_regis/listPerHalaman',
                  param: {}
                }
              },
              update: {
                setter: 'lab_regis',
                getter: 'lab_regis',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'keterangan_lab_regis',
                    code: 'id_lab_regis',
                    display: ['nama_lengkap', 'keterangan_lab_regis', 'createdAt|date'],
                    headerDisplay: ['Nama Pasien', 'Keterangan', 'Tanggal']
                  },
                  api: 'lab_regis/listPerHalaman',
                  param: {}
                }
              },
              filter: {
                setter: 'lab_regis',
                getter: 'lab_regis',
                type: 'lookup',
                option: {
                  list_pointer: {
                    label: 'keterangan_lab_regis',
                    code: 'id'
                  },
                  api: 'lab_regis/listPerHalaman'
                }
              }
            }
          },
          {
            id: 'petugas_ambil_id',
            data: 'petugas_ambil_id',
            label: 'Petugas Pengambil',
            placeholder: 'Pilih Petugas',
            methods: {
              list: { view_data: 'petugasAmbil.nama_dokter' },
              detail: { view_data: 'petugasAmbil.nama_dokter' },
              create: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter', 'nama_specialist'],
                    headerDisplay: ['Nama', 'Spesialis']
                  },
                  api: 'msDokter/list',
                  param: {}
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
                    display: ['nama_dokter', 'nama_specialist'],
                    headerDisplay: ['Nama', 'Spesialis']
                  },
                  api: 'msDokter/list',
                  param: {}
                }
              },
              filter: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup',
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id'
                  },
                  api: 'msDokter/list'
                }
              }
            }
          },
          {
            id: 'tanggal_ambil',
            data: 'tanggal_ambil',
            label: 'Tanggal Ambil',
            placeholder: 'Pilih Tanggal Pengambilan',
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date', validation: ['required'], value: this.$moment(new Date).format('YYYY-MM-DD') },
              update: { type: 'date', validation: ['required'] },
              filter: { type: 'date' }
            }
          },
          {
            id: 'volume_sampel',
            data: 'volume_sampel',
            label: 'Volume Sampel',
            placeholder: 'Volume sampel (contoh: 5ml)',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: true
            }
          },
          {
            id: 'kondisi_sampel',
            data: 'kondisi_sampel',
            label: 'Kondisi Sampel',
            placeholder: 'Kondisi sampel',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: true
            }
          },
          {
            id: 'lokasi_ambil',
            data: 'lokasi_ambil',
            label: 'Lokasi Pengambilan',
            placeholder: 'Lokasi pengambilan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: true
            }
          },
          {
            id: 'tipe_sampel',
            data: 'tipe_sampel',
            label: 'Tipe Sampel',
            placeholder: 'Tipe sampel',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: true
            }
          },
          {
            id: 'no_rak',
            data: 'no_rak',
            label: 'No. Rak',
            placeholder: 'Nomor rak penyimpanan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: true
            }
          },
          {
            id: 'suhu_penyimpanan',
            data: 'suhu_penyimpanan',
            label: 'Suhu Penyimpanan',
            placeholder: 'Suhu penyimpanan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'text' },
              update: { type: 'text' },
              filter: true
            }
          },
          {
            id: 'catatan_pengambilan',
            data: 'catatan_pengambilan',
            label: 'Catatan Pengambilan',
            placeholder: 'Catatan pengambilan',
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea', rows: 3 },
              update: { type: 'textarea', rows: 3 },
              filter: true
            }
          },
          {
            id: 'status_pengambilan',
            data: 'status_pengambilan',
            label: 'Status Pengambilan',
            placeholder: 'Status pengambilan',
            methods: {
              list: {
                class: { 0: 'badge badge-warning', 1: 'badge badge-info', 2: 'badge badge-success', 3: 'badge badge-danger' },
                transform: 'status_pengambilan'
              },
              detail: {
                class: { 0: 'badge badge-warning', 1: 'badge badge-info', 2: 'badge badge-success', 3: 'badge badge-danger' },
                transform: 'status_pengambilan'
              },
              create: false,
              update: false,
              filter: {
                type: 'select',
                option: {
                  list: [
                    { value: '', label: 'Semua' },
                    { value: 0, label: 'Pending' },
                    { value: 1, label: 'Sedang Diambil' },
                    { value: 2, label: 'Selesai' },
                    { value: 3, label: 'Gagal/Dibatalkan' }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    statusPengambilan(status) {
      const texts = {
        0: 'Pending',
        1: 'Sedang Diambil',
        2: 'Selesai',
        3: 'Gagal/Dibatalkan'
      }
      return texts[status] || 'Unknown'
    },
    getStatusClass(status) {
      const classes = {
        0: 'badge-warning',
        1: 'badge-info',
        2: 'badge-success',
        3: 'badge-danger'
      }
      return classes[status] || 'badge-secondary'
    },
    getStatusText(status) {
      const texts = {
        0: 'Pending',
        1: 'Sedang Diambil',
        2: 'Selesai',
        3: 'Gagal/Dibatalkan'
      }
      return texts[status] || 'Unknown'
    },
    async startPengambilan(data) {
      this.currentData = data
      this.startForm = {
        petugas_ambil_id: data.petugas_ambil_id || ''
      }
      this.$bvModal.show('modal-start-pengambilan')
    },
    async submitStartPengambilan() {
      this.loading = true
      try {
        const response = await this.$_api.post(`lab_pengambilan_sampel/${this.currentData.id}/start`, {
          petugas_ambil_id: this.startForm.petugas_ambil_id
        })

        this.$_alert.success(response.message || 'Pengambilan sampel berhasil dimulai')
        this.$bvModal.hide('modal-start-pengambilan')
        // this.$refs['crud-pengambilan-sampel'].refreshTable()
        console.log('===> lab_pengambilan_sampel.vue:644 ~ submitStartPengambilan ~ this.$refs[crud-pengambilan-sampel]', this.$refs['crud-pengambilan-sampel']);
        this.$refs['crud-pengambilan-sampel'].$children[1].getData()
      } catch (error) {
        console.log('===> lab_pengambilan_sampel.vue:650 ~ error', error);
        this.$_alert.error((error.response && error.response.data && error.response.data.message) || 'Gagal memulai pengambilan sampel')
      } finally {
        this.loading = false
      }
    },
    async finishPengambilan(data) {
      this.currentData = data
      this.finishForm = {
        volume_sampel: data.volume_sampel || '',
        kondisi_sampel: data.kondisi_sampel || '',
        lokasi_ambil: data.lokasi_ambil || '',
        tipe_sampel: data.tipe_sampel || '',
        no_rak: data.no_rak || '',
        suhu_penyimpanan: data.suhu_penyimpanan || '',
        catatan_pengambilan: data.catatan_pengambilan || ''
      }
      this.$bvModal.show('modal-finish-pengambilan')
    },
    async submitFinishPengambilan() {
      this.loading = true
      try {
        const response = await this.$_api.post(`lab_pengambilan_sampel/${this.currentData.id}/finish`, this.finishForm)

        this.$_alert.success(response.message || 'Pengambilan sampel berhasil diselesaikan')
        this.$bvModal.hide('modal-finish-pengambilan')
        // setTimeout(() => window.location.reload(), 500)
        // this.$refs['crud-pengambilan-sampel'].refreshTable()
        this.$refs['crud-pengambilan-sampel'].$children[1].getData()
      } catch (error) {
        this.$_alert.error((error.response && error.response.data && error.response.data.message) || 'Gagal menyelesaikan pengambilan sampel')
      } finally {
        this.loading = false
      }
    },
    async cancelPengambilan(data) {
      this.currentData = data
      this.cancelForm = {
        keterangan: ''
      }
      this.$bvModal.show('modal-cancel-pengambilan')
    },
    async submitCancelPengambilan() {
      this.loading = true
      try {
        const response = await this.$_api.post(`lab_pengambilan_sampel/${this.currentData.id}/cancel`, {
          keterangan: this.cancelForm.keterangan
        })

        this.$_alert.success(response.message || 'Pengambilan sampel berhasil dibatalkan')
        this.$bvModal.hide('modal-cancel-pengambilan')
        // setTimeout(() => window.location.reload(), 500)
        // this.$refs['crud-pengambilan-sampel'].refreshTable()
        this.$refs['crud-pengambilan-sampel'].$children[1].getData()
      } catch (error) {
        this.$_alert.error((error.response && error.response.data && error.response.data.message) || 'Gagal membatalkan pengambilan sampel')
      } finally {
        this.loading = false
      }
    },
    async syncSatuSehat(data) {
      try {
        this.loading = true
        const response = await this.$_api.post(`lab_pengambilan_sampel/${data.id}/sync-satu-sehat`)

        this.$_alert.success(response.message || 'Data berhasil disinkronkan ke Satu Sehat')
        // setTimeout(() => window.location.reload(), 500)
        // this.$refs['crud-pengambilan-sampel'].refreshTable()
        this.$refs['crud-pengambilan-sampel'].$children[1].getData()
      } catch (error) {
        this.$_alert.error((error.response && error.response.data && error.response.data.message) || 'Gagal sinkronisasi ke Satu Sehat')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>