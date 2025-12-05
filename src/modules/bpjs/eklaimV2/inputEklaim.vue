<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header">
            <template #header>
              <b-row class="d-flex align-items-center">
                <b-col>
                  <div class="d-flex justify-content-between align-items-end">
                    <h3 class="mb-0">
                      <strong>Eklaim V2 - New Workflow</strong>
                    </h3>
                    <b-button
                      size="lg"
                      :variant="getWorkflowStatusColor()"
                      class="mt-0 ml-3 text-nowrap"
                    >{{ getWorkflowStatusText() }}</b-button>
                  </div>
                </b-col>
              </b-row>
            </template>
            <div>
              <!-- Patient Selection -->
              <b-row style="row-gap: 10px;">
                <b-col cols="12">
                  <h3 class="mb-0">
                    <strong>Data Pasien</strong>
                  </h3>
                </b-col>
                <b-col cols="12">
                  <b-button
                    block
                    size="lg"
                    variant="primary"
                    class="mt-0 text-nowrap"
                    v-b-modal.modal-registrasi-eklaim
                  >Pilih Registrasi</b-button>
                </b-col>
                <b-col cols="4" v-if="dataRegistrasi.registrasi_id">
                  <s-input v-model="dataRegistrasi.no_rm" class="mb-0" :item="{
                    label: 'No RM',
                    id: 'no_rm',
                    data: 'no_rm',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataRegistrasi.no_rm" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4" v-if="dataRegistrasi.registrasi_id">
                  <s-input v-model="dataRegistrasi.nama_lengkap" class="mb-0" :item="{
                    label: 'Pasien',
                    id: 'nama_lengkap',
                    data: 'nama_lengkap',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataRegistrasi.nama_lengkap" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4" v-if="dataRegistrasi.registrasi_id">
                  <s-input v-model="dataRegistrasi.nama_jenis_layanan" class="mb-0" :item="{
                    label: 'Jenis Layanan',
                    id: 'nama_jenis_layanan',
                    data: 'nama_jenis_layanan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataRegistrasi.nama_jenis_layanan" :disabled="true"></s-input>
                </b-col>
              </b-row>

              <!-- Workflow Progress -->
              <div v-if="workflowStatus && dataRegistrasi.registrasi_id">
                <hr class="mt-5 mb-5">
                <b-row>
                  <b-col cols="12">
                    <h3 class="mb-4">
                      <strong>Workflow Progress</strong>
                    </h3>
                  </b-col>
                  <b-col cols="12">
                    <div class="workflow-timeline">
                      <div
                        v-for="(stage, index) in workflowStages"
                        :key="stage.stage"
                        class="timeline-item"
                        :class="{
                          'active': workflowStatus.current_stage >= stage.stage,
                          'current': workflowStatus.current_stage === stage.stage,
                          'failed': stage.status === false
                        }"
                      >
                        <div class="timeline-marker">
                          <i :class="getStageIcon(stage.status, workflowStatus.current_stage, stage.stage)"></i>
                        </div>
                        <div class="timeline-content">
                          <h6>{{ stage.description }}</h6>
                          <small class="text-muted" v-if="stage.date">
                            {{ $moment(stage.date).format('LLL') }}
                          </small>
                          <b-button
                            v-if="canExecuteStage(stage.stage)"
                            size="sm"
                            :variant="getStageActionVariant(stage.stage)"
                            @click="executeStage(stage.stage)"
                            class="mt-2"
                          >
                            <i :class="getStageActionIcon(stage.stage)"></i>
                            {{ getStageActionText(stage.stage) }}
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>

              <!-- Forms for each stage -->
              <div v-if="currentStageForm && dataRegistrasi.registrasi_id">
                <hr class="mt-5 mb-5">
                <b-row>
                  <b-col cols="12">
                    <h3 class="mb-4">
                      <strong>{{ currentStageForm.title }}</strong>
                    </h3>
                  </b-col>
                </b-row>

                <!-- New Claim Form -->
                <div v-if="currentStage === 1">
                  <new-claim-form
                    :registrasi="dataRegistrasi"
                    @submit="handleNewClaim"
                    @cancel="currentStageForm = null"
                  />
                </div>

                <!-- Set Claim Data Form -->
                <div v-if="currentStage === 3">
                  <set-claim-data-form
                    :registrasi="dataRegistrasi"
                    @submit="handleSetClaimData"
                    @cancel="currentStageForm = null"
                  />
                </div>

                <!-- IDRG Diagnosa Form -->
                <div v-if="currentStage === 4">
                  <idrg-diagnosa-form
                    :nomor_sep="dataRegistrasi.no_sep"
                    @submit="handleIdrgDiagnosa"
                    @cancel="currentStageForm = null"
                  />
                </div>

                <!-- IDRG Prosedur Form -->
                <div v-if="currentStage === 5">
                  <idrg-prosedur-form
                    :nomor_sep="dataRegistrasi.no_sep"
                    @submit="handleIdrgProsedur"
                    @cancel="currentStageForm = null"
                  />
                </div>

                <!-- INACBG Diagnosa Form -->
                <div v-if="currentStage === 9">
                  <inacbg-diagnosa-form
                    :nomor_sep="dataRegistrasi.no_sep"
                    @submit="handleInacbgDiagnosa"
                    @cancel="currentStageForm = null"
                  />
                </div>

                <!-- INACBG Prosedur Form -->
                <div v-if="currentStage === 10">
                  <inacbg-prosedur-form
                    :nomor_sep="dataRegistrasi.no_sep"
                    @submit="handleInacbgProsedur"
                    @cancel="currentStageForm = null"
                  />
                </div>

                <!-- Special CMG Form (Stage 2) -->
                <div v-if="currentStage === 12">
                  <special-cmg-form
                    :nomor_sep="dataRegistrasi.no_sep"
                    :grouper-data="grouperData"
                    @submit="handleGrouperStage2"
                    @cancel="currentStageForm = null"
                  />
                </div>
              </div>

              <!-- Grouper Results -->
              <div v-if="grouperData && dataRegistrasi.registrasi_id">
                <hr class="mt-5 mb-5">
                <b-row>
                  <b-col cols="12">
                    <h3 class="mb-4">
                      <strong>Hasil Grouper</strong>
                    </h3>
                  </b-col>
                  <b-col cols="12">
                    <b-card>
                      <b-row>
                        <b-col cols="3">
                          <h6>CBG Code</h6>
                          <p class="h5">{{ grouperData.cbg ? grouperData.cbg.code : '-' }}</p>
                        </b-col>
                        <b-col cols="3">
                          <h6>Description</h6>
                          <p class="h5">{{ grouperData.cbg ? grouperData.cbg.description : '-' }}</p>
                        </b-col>
                        <b-col cols="3">
                          <h6>Tarif</h6>
                          <p class="h5">{{ formatCurrency(grouperData.cbg ? grouperData.cbg.tariff : 0) }}</p>
                        </b-col>
                        <b-col cols="3">
                          <h6>Severity Level</h6>
                          <p class="h5">{{ grouperData.severity_level || '-' }}</p>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </div>

              <!-- Final Tarif Information -->
              <div v-if="workflowStatus && workflowStatus.final_tarif">
                <hr class="mt-5 mb-5">
                <b-row>
                  <b-col cols="12">
                    <h3 class="mb-4">
                      <strong>Informasi Tarif Akhir</strong>
                    </h3>
                  </b-col>
                  <b-col cols="12">
                    <b-card>
                      <b-row>
                        <b-col cols="3">
                          <h6>Kode Tarif</h6>
                          <p class="h5">{{ workflowStatus.final_tarif.kode_tarif }}</p>
                        </b-col>
                        <b-col cols="3">
                          <h6>Tarif</h6>
                          <p class="h5">{{ formatCurrency(workflowStatus.final_tarif.tarif_tarif) }}</p>
                        </b-col>
                        <b-col cols="3">
                          <h6>CBG Code</h6>
                          <p class="h5">{{ workflowStatus.final_tarif.cbg_code }}</p>
                        </b-col>
                        <b-col cols="3">
                          <h6>Special CMG</h6>
                          <p class="h5">{{ workflowStatus.final_tarif.special_cmg || '-' }}</p>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </div>

              <!-- Action Buttons -->
              <div v-if="workflowStatus && dataRegistrasi.registrasi_id">
                <hr class="mt-5 mb-5">
                <b-row class="mt-5">
                  <b-col cols="12">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex align-items-center">
                        <b-button
                          v-if="canResetWorkflow()"
                          block
                          size="lg"
                          variant="warning"
                          class="mt-0 text-nowrap"
                          @click="resetWorkflow()"
                        >
                          <i class="ri-refresh-line"></i> Reset Workflow
                        </b-button>
                      </div>
                      <div class="d-flex align-items-center">
                        <b-button
                          v-if="canFinalize()"
                          block
                          size="lg"
                          variant="primary"
                          class="mt-0 ml-3 text-nowrap"
                          @click="finalizeClaim()"
                        >
                          <i class="ri-check-line"></i> Final Klaim
                        </b-button>
                        <b-button
                          v-if="canSendClaim()"
                          block
                          size="lg"
                          variant="success"
                          class="mt-0 ml-3 text-nowrap"
                          @click="sendClaim()"
                        >
                          <i class="ri-send-plane-line"></i> Kirim Klaim
                        </b-button>
                        <b-button
                          v-if="canCheckStatus()"
                          block
                          size="lg"
                          variant="info"
                          class="mt-0 ml-3 text-nowrap"
                          @click="checkClaimStatus()"
                        >
                          <i class="ri-search-line"></i> Cek Status
                        </b-button>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Modal Registrasi -->
    <ModalRegistrasi @pilihRegistrasi="pilihRegistrasi"/>
  </div>
</template>

<script>
import ModalRegistrasi from './modalRegistrasi.vue'
import NewClaimForm from './forms/NewClaimForm.vue'
import SetClaimDataForm from './forms/SetClaimDataForm.vue'
import IdrgDiagnosaForm from './forms/IdrgDiagnosaForm.vue'
import IdrgProsedurForm from './forms/IdrgProsedurForm.vue'
import InacbgDiagnosaForm from './forms/InacbgDiagnosaForm.vue'
import InacbgProsedurForm from './forms/InacbgProsedurForm.vue'
import SpecialCmgForm from './forms/SpecialCmgForm.vue'

export default {
  components: {
    ModalRegistrasi,
    NewClaimForm,
    SetClaimDataForm,
    IdrgDiagnosaForm,
    IdrgProsedurForm,
    InacbgDiagnosaForm,
    InacbgProsedurForm,
    SpecialCmgForm,
  },
  props: [],
  data() {
    return {
      busy: false,
      dataRegistrasi: {},
      workflowStatus: null,
      grouperData: null,
      currentStage: null,
      currentStageForm: null,
      workflowStages: [
        { stage: 1, description: 'Buat Klaim Baru' },
        { stage: 2, description: 'Update Data Pasien (Opsional)' },
        { stage: 3, description: 'Set Data Klaim' },
        { stage: 4, description: 'Set Diagnosa IDRG' },
        { stage: 5, description: 'Set Prosedur IDRG' },
        { stage: 6, description: 'Grouper IDRG Stage 1' },
        { stage: 7, description: 'Final Grouper IDRG' },
        { stage: 8, description: 'Import IDRG ke INACBG' },
        { stage: 9, description: 'Set Diagnosa INACBG (Opsional)' },
        { stage: 10, description: 'Set Prosedur INACBG (Opsional)' },
        { stage: 11, description: 'Grouper INACBG Stage 1' },
        { stage: 12, description: 'Grouper INACBG Stage 2 (Opsional)' },
        { stage: 13, description: 'Final Grouper INACBG' },
        { stage: 14, description: 'Final Klaim' },
        { stage: 15, description: 'Kirim Klaim Individual' },
        { stage: 16, description: 'Cek Status Klaim (Opsional)' }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  async mounted() {
    const vm = this
    if (vm.$route.query.registrasi_id) {
      await vm.loadRegistrasi(vm.$route.query.registrasi_id)
    }
  },
  methods: {
    formatCurrency(value) {
      if (!value) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value)
    },
    getWorkflowStatusColor() {
      if (!this.workflowStatus) return 'secondary'
      const colors = {
        'COMPLETED': 'success',
        'PROCESSING': 'warning',
        'FAILED': 'danger',
        'PENDING': 'secondary'
      }
      return colors[this.workflowStatus.overall_status] || 'secondary'
    },
    getWorkflowStatusText() {
      if (!this.workflowStatus) return 'Belum Mulai'
      const texts = {
        'COMPLETED': 'Selesai',
        'PROCESSING': 'Sedang Proses',
        'FAILED': 'Gagal',
        'PENDING': 'Pending'
      }
      return texts[this.workflowStatus.overall_status] || 'Unknown'
    },
    getStageIcon(status, currentStage, stage) {
      if (status === false) return 'ri-close-circle-fill text-danger'
      if (currentStage >= stage) return 'ri-check-circle-fill text-success'
      if (currentStage === stage) return 'ri-time-fill text-warning'
      return 'ri-circle-line text-muted'
    },
    getStageActionVariant(stage) {
      const variants = {
        1: 'primary',
        3: 'primary',
        4: 'primary',
        5: 'primary',
        6: 'success',
        7: 'success',
        8: 'info',
        9: 'primary',
        10: 'primary',
        11: 'success',
        12: 'warning',
        13: 'success',
        14: 'primary',
        15: 'success',
        16: 'info'
      }
      return variants[stage] || 'primary'
    },
    getStageActionIcon(stage) {
      const icons = {
        1: 'ri-add-line',
        3: 'ri-settings-3-line',
        4: 'ri-stethoscope-line',
        5: 'ri-tools-line',
        6: 'ri-calculator-line',
        7: 'ri-check-double-line',
        8: 'ri-upload-cloud-line',
        9: 'ri-stethoscope-line',
        10: 'ri-tools-line',
        11: 'ri-calculator-line',
        12: 'ri-magic-line',
        13: 'ri-check-double-line',
        14: 'ri-shield-check-line',
        15: 'ri-send-plane-line',
        16: 'ri-search-line'
      }
      return icons[stage] || 'ri-play-line'
    },
    getStageActionText(stage) {
      const texts = {
        1: 'Buat Klaim',
        3: 'Set Data',
        4: 'Set Diagnosa',
        5: 'Set Prosedur',
        6: 'Proses Grouper',
        7: 'Final IDRG',
        8: 'Import',
        9: 'Set Diagnosa',
        10: 'Set Prosedur',
        11: 'Proses Grouper',
        12: 'Set Special CMG',
        13: 'Final',
        14: 'Final Klaim',
        15: 'Kirim',
        16: 'Cek Status'
      }
      return texts[stage] || 'Execute'
    },
    canExecuteStage(stage) {
      if (!this.workflowStatus || !this.dataRegistrasi.registrasi_id) return false
      const next_available_stages = this.workflowStatus.next_available_stages || []
      return next_available_stages.some(s => s.stage === stage)
    },
    canResetWorkflow() {
      return this.workflowStatus && this.workflowStatus.current_stage > 0
    },
    canFinalize() {
      return this.workflowStatus && this.workflowStatus.current_stage >= 13 && this.workflowStatus.current_stage < 14
    },
    canSendClaim() {
      return this.workflowStatus && this.workflowStatus.current_stage >= 14 && this.workflowStatus.current_stage < 15
    },
    canCheckStatus() {
      return this.workflowStatus && this.workflowStatus.current_stage >= 15
    },
    async loadRegistrasi(registrasi_id) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('registrasi/detailsById', { id: registrasi_id })
        if (res.status == 200) {
          vm.dataRegistrasi = res.data[0] || {}
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async loadWorkflowStatus() {
      const vm = this
      if (!vm.dataRegistrasi.no_sep) return

      try {
        const res = await vm.$_api.post('inacbg/workflow/status', {
          nomor_sep: vm.dataRegistrasi.no_sep
        })
        if (res.status == 200) {
          vm.workflowStatus = res.data
          // Update stage status
          vm.workflowStages.forEach(stage => {
            const stages = vm.workflowStatus.stages || []
            const stageData = stages.find(s => s.stage === stage.stage)
            if (stageData) {
              stage.status = stageData.status
              stage.date = stageData.date
            }
          })
          // Auto-refresh grouper data if stage 6 or 11 is completed
          if (vm.workflowStatus.current_stage >= 6) {
            await vm.loadGrouperData()
          }
        }
      } catch (error) {
        console.log('===> inputEklaim.vue:538 ~ error', error);
        console.log('No workflow status found')
      }
    },
    async loadGrouperData() {
      const vm = this
      if (!vm.dataRegistrasi.no_sep) return

      try {
        const res = await vm.$_api.post('inacbg/get_claim_data', {
          nomor_sep: vm.dataRegistrasi.no_sep
        })
        if (res.status == 200 && res.data) {
          vm.grouperData = res.data
        }
      } catch (error) {
        console.log('No grouper data found')
      }
    },
    async pilihRegistrasi(data) {
      const vm = this
      vm.busy = false
      try {
        await vm.loadRegistrasi(data.registrasi_id)
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
      } finally {
        vm.busy = false
      }
    },
    executeStage(stage) {
      this.currentStage = stage
      this.currentStageForm = {
        title: this.workflowStages.find(s => s.stage === stage).description,
        stage: stage
      }
    },
    async handleNewClaim(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/new_claim', {
          registrasi_id: vm.dataRegistrasi.registrasi_id,
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Klaim berhasil dibuat')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async handleSetClaimData(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/set_claim_data', {
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Data klaim berhasil diset')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async handleIdrgDiagnosa(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/idrg_diagnosa_set', {
          nomor_sep: vm.dataRegistrasi.no_sep,
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Diagnosa IDRG berhasil diset')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async handleIdrgProsedur(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/idrg_prosedur_set', {
          nomor_sep: vm.dataRegistrasi.no_sep,
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Prosedur IDRG berhasil diset')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async handleInacbgDiagnosa(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/inacbg_diagnosa_set', {
          nomor_sep: vm.dataRegistrasi.no_sep,
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Diagnosa INACBG berhasil diset')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async handleInacbgProsedur(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/inacbg_prosedur_set', {
          nomor_sep: vm.dataRegistrasi.no_sep,
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Prosedur INACBG berhasil diset')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async handleGrouperStage2(data) {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/grouper_inacbg_stage_2', {
          nomor_sep: vm.dataRegistrasi.no_sep,
          ...data
        })
        if (res.status == 200) {
          vm.$_alert.success('Grouper Stage 2 berhasil')
          vm.currentStageForm = null
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async resetWorkflow() {
      const vm = this
      vm.$_alert.confirm('Apakah Anda yakin ingin reset workflow?').then(async (result) => {
        if (result.isConfirmed) {
          vm.busy = true
          try {
            const res = await vm.$_api.post('inacbg/workflow/reset', {
              nomor_sep: vm.dataRegistrasi.no_sep,
              reset_to_stage: 0
            })
            if (res.status == 200) {
              vm.$_alert.success('Workflow berhasil direset')
              await vm.loadWorkflowStatus()
            } else {
              vm.$_alert.error(res.message)
            }
          } catch (error) {
            vm.$_alert.error('Terjadi Kesalahan System')
            console.log(error)
          } finally {
            vm.busy = false
          }
        }
      })
    },
    async finalizeClaim() {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/claim_final', {
          nomor_sep: vm.dataRegistrasi.no_sep,
          coder_nik: '123123123123' // Default, get from user session
        })
        if (res.status == 200) {
          vm.$_alert.success('Klaim berhasil di-final')
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async sendClaim() {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/send_claim_individual', {
          nomor_sep: vm.dataRegistrasi.no_sep
        })
        if (res.status == 200) {
          vm.$_alert.success('Klaim berhasil dikirim')
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async checkClaimStatus() {
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/get_claim_status', {
          nomor_sep: vm.dataRegistrasi.no_sep
        })
        if (res.status == 200) {
          vm.$_alert.success('Status klaim berhasil diambil')
          await vm.loadWorkflowStatus()
        } else {
          vm.$_alert.error(res.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    }
  },
}
</script>

<style scoped>
.workflow-timeline {
  position: relative;
  padding: 0;
  list-style: none;
}

.timeline-item {
  position: relative;
  padding-left: 40px;
  margin-bottom: 20px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 30px;
  bottom: -20px;
  width: 2px;
  background-color: #e9ecef;
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.timeline-item.active .timeline-marker {
  border-color: #28a745;
  background-color: #28a745;
  color: white;
}

.timeline-item.current .timeline-marker {
  border-color: #ffc107;
  background-color: #ffc107;
  color: white;
}

.timeline-item.failed .timeline-marker {
  border-color: #dc3545;
  background-color: #dc3545;
  color: white;
}

.timeline-content h6 {
  margin: 0 0 5px 0;
  font-weight: 600;
}

.timeline-content small {
  display: block;
  margin-bottom: 10px;
}
</style>