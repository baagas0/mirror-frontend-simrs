<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header">
            <template #header>
              <b-row class="d-flex align-items-center">
                <b-col>
                  <h3 class="mb-0">
                    <strong>Daftar Eklaim V2 (New Workflow)</strong>
                  </h3>
                </b-col>
                <b-col class="text-right">
                  <b-button variant="primary" @click="refreshData">
                    <i class="ri-refresh-line"></i> Refresh
                  </b-button>
                </b-col>
              </b-row>
            </template>
            <div>
              <form @submit.prevent="getData" autocomplete="off">
                <b-row style="row-gap: 10px;">
                  <b-col cols="4">
                    <s-input groupClass="mb-0" v-model="dataFilter.kelas_kunjungan_id" class="mb-0" :item="{
                      label: 'Pilih Kelas Kunjungan',
                      id: 'kelas_kunjungan_id',
                      data: 'kelas_kunjungan_id',
                      type: 'lookup-radio',
                      api: 'kelasKunjungan',
                      getter: 'kelasKunjungan',
                      setter: 'kelasKunjungan',
                      validation: ['required'],
                      pointer: {
                        label: 'nama_kelas_kunjungan',
                        code: 'id',
                        display: ['nama_kelas_kunjungan'],
                        mainParam: 'nama_kelas_kunjungan'
                      },
                    }" />
                  </b-col>
                  <b-col cols="4">
                    <s-input v-model="dataFilter.nama" :item="{
                      label: 'No. RM / No. SEP / Nama',
                      id: 'nama',
                      data: 'nama',
                      type: 'text',
                      validation: [''],
                    }" :valuee="dataFilter.nama" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="4">
                    <s-input v-model="dataFilter.tanggal" :item="{
                      id: 'datetime',
                      show: true,
                      class: '', attr: null,
                      value: null,
                      label: 'Tanggal',
                      placeholder: 'Isikan tanggal',
                      type: 'datetime',
                      validation: ['']
                    }" :valuee="dataFilter.tanggal" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <div class="row align-self-end mt-4">
                      <b-col cols="12" sm="12" md="12" lg="12">
                        <button type="submit" class="btn btn-light-primary">
                          <i class="ri-save-line"></i>
                          Terapkan Filter
                        </button>
                        <div @click="resetFilter" class="btn btn-light-danger">
                          <i class="ri-loop-right-line"></i>
                          Reset
                        </div>
                      </b-col>
                    </div>
                  </b-col>
                </b-row>
              </form>
              <b-row class="mt-6">
                <b-col cols="12" md="12" lg="12">
                  <b-table
                    :items="listRegistrasi"
                    :fields="fields"
                    responsive
                    show-empty
                    small
                    bordered
                    striped
                    hover
                    :busy="busy"
                    style="white-space:nowrap;"
                    class=""
                  >
                    <template #cell(tgl_registrasi)="item">
                      {{ item.item.nama_tgl_registrasi }}
                    </template>
                    <template #cell(workflow_status)="item">
                      <b-badge
                        :variant="getWorkflowStatusVariant(item.item.workflow_status)"
                        class="mr-1"
                      >
                        {{ getWorkflowStatusText(item.item.workflow_status) }}
                      </b-badge>
                      <div v-if="item.item.current_stage" class="small text-muted">
                        Stage: {{ item.item.current_stage }}
                      </div>
                    </template>
                    <template #cell(actions)="item">
                      <b-button-group>
                        <b-button
                          @click="pilih(item.item)"
                          variant="primary"
                          size="sm"
                          :disabled="!item.item.registrasi_id || !item.item.no_sep"
                        >
                          <i class="ri-play-line"></i> Mulai Eklaim
                        </b-button>
                        <b-button
                          v-if="item.item.nomor_sep"
                          @click="viewWorkflow(item.item)"
                          variant="info"
                          size="sm"
                        >
                          <i class="ri-flow-chart"></i> Workflow
                        </b-button>
                      </b-button-group>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-row class="d-flex justify-content-between">
                <b-col cols="2">
                  <b-form-select id="per-page-select" v-model="dataFilter.jumlah" :options="[10, 25, 50, 100]" size="sm" />
                </b-col>
                <b-col cols="5">
                  <b-pagination class="m-0 p-0" v-model="dataFilter.halaman" :total-rows="totalRows" :per-page="dataFilter.jumlah"
                    align="fill" size="sm"></b-pagination>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Workflow Status Modal -->
    <b-modal id="workflow-modal" size="xl" title="Workflow Status" hide-footer>
      <div v-if="selectedWorkflow">
        <b-row>
          <b-col cols="12">
            <h5>Informasi Pasien</h5>
            <b-table :items="[selectedWorkflow]" :fields="patientInfoFields" small bordered>
            </b-table>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="12">
            <h5>Workflow Stages</h5>
            <b-table :items="selectedWorkflow.stages" :fields="workflowFields" small bordered>
              <template #cell(status)="item">
                <b-badge :variant="item.item.status ? 'success' : 'secondary'">
                  {{ item.item.status ? 'Selesai' : 'Belum' }}
                </b-badge>
              </template>
              <template #cell(date)="item">
                {{ item.item.date ? $moment(item.item.date).format('LLL') : '-' }}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row class="mt-4" v-if="selectedWorkflow.kode_tarif">
          <b-col cols="12">
            <h5>Informasi Tarif</h5>
            <b-card>
              <b-row>
                <b-col cols="3"><strong>Kode Tarif:</strong></b-col>
                <b-col cols="3">{{ selectedWorkflow.kode_tarif }}</b-col>
                <b-col cols="3"><strong>Tarif:</strong></b-col>
                <b-col cols="3">{{ formatCurrency(selectedWorkflow.tarif_tarif) }}</b-col>
              </b-row>
              <b-row v-if="selectedWorkflow.cbg_code">
                <b-col cols="3"><strong>CBG Code:</strong></b-col>
                <b-col cols="3">{{ selectedWorkflow.cbg_code }}</b-col>
                <b-col cols="3"><strong>Special CMG:</strong></b-col>
                <b-col cols="3">{{ selectedWorkflow.special_cmg || '-' }}</b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      busy: false,
      listRegistrasi: [],
      totalRows: 0,
      dataFilter: {
        halaman: 1,
        jumlah: 10,
        nama: '',
        tanggal: '',
        kelas_kunjungan_id: '',
      },
      selectedWorkflow: null,
      fields: [
        {
          key: "tgl_registrasi",
          label: "Tanggal Registrasi",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "no_rm",
          label: "No. RM",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "no_sep",
          label: "No. SEP",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_lengkap",
          label: "Pasien",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_asuransi",
          label: "Asuransi",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_jenis_layanan",
          label: "Jenis Layanan",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "workflow_status",
          label: "Status Workflow",
          class: "align-middle text-left",
        },
        {
          key: "actions",
          label: "Aksi",
          class: "align-middle table-option-2 text-center",
        },
      ],
      patientInfoFields: [
        { key: "nomor_sep", label: "No. SEP" },
        { key: "tagihan_id", label: "ID Tagihan" },
        { key: "current_stage", label: "Stage Saat Ini" },
        { key: "overall_status", label: "Status Overall" }
      ],
      workflowFields: [
        { key: "stage", label: "Stage" },
        { key: "name", label: "Nama Stage" },
        { key: "status", label: "Status" },
        { key: "date", label: "Tanggal" },
        { key: "hasRequest", label: "Request" },
        { key: "hasResponse", label: "Response" }
      ]
    }
  },
  computed: {

  },
  watch: {
    'dataFilter.halaman'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData()
      }
    },
    'dataFilter.jumlah'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dataFilter.halaman = 1 // Reset to first page
        this.getData()
      }
    }
  },
  async mounted() {
    const vm = this
    await vm.getData()
  },
  methods: {
    formatCurrency(value) {
      if (!value) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value)
    },
    getWorkflowStatusVariant(status) {
      const variants = {
        'COMPLETED': 'success',
        'PROCESSING': 'warning',
        'FAILED': 'danger',
        'PENDING': 'secondary'
      }
      return variants[status] || 'secondary'
    },
    getWorkflowStatusText(status) {
      const texts = {
        'COMPLETED': 'Selesai',
        'PROCESSING': 'Proses',
        'FAILED': 'Gagal',
        'PENDING': 'Pending'
      }
      return texts[status] || 'Unknown'
    },
    async pilih(data){
      const vm = this
      vm.busy = false
      try {
        console.log('Mulai eklaim untuk registrasi:', data)
        vm.$router.push({
          path: './input_eklaim_v2',
          query: {
            registrasi_id: data.registrasi_id,
            no_rm: data.no_rm,
            nama_pasien: data.nama_lengkap
          }
        })
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async viewWorkflow(data){
      const vm = this
      vm.busy = true
      try {
        const res = await vm.$_api.post('inacbg/workflow/history', {
          nomor_sep: data.no_sep
        })
        if(res.status == 200){
          vm.selectedWorkflow = res.data
          vm.$bvModal.show('workflow-modal')
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
    async getData(){
      const vm = this
      vm.busy = true
      try {
        console.log('vm.dataFilter', vm.dataFilter)

        // Get registrasi data
        const registrasiRes = await vm.$_api.post('registrasi/list', {
          halaman: vm.dataFilter.halaman,
          jumlah: vm.dataFilter.jumlah,
          kelas_kunjungan_id: vm.dataFilter.kelas_kunjungan_id,
          nama: vm.dataFilter.nama,
          tanggal: vm.dataFilter.tanggal
        })

        if(registrasiRes.status == 200){
          vm.listRegistrasi = registrasiRes.data.map(registrasi => {
            return {
              ...registrasi,
              nama_tgl_registrasi: vm.$moment(registrasi.tgl_registrasi).format("LL"),
              workflow_status: 'PENDING', // Default status, will be updated from backend
              current_stage: 0
            }
          })

          // Get workflow status for each registrasi that has SEP
          for (let i = 0; i < vm.listRegistrasi.length; i++) {
            const registrasi = vm.listRegistrasi[i];
            if (registrasi.no_sep) {
              try {
                const workflowRes = await vm.$_api.post('inacbg/workflow/status', {
                  nomor_sep: registrasi.no_sep
                })
                if(workflowRes.status == 200 && workflowRes.data) {
                  vm.listRegistrasi[i].workflow_status = workflowRes.data.overall_status
                  vm.listRegistrasi[i].current_stage = workflowRes.data.current_stage
                }
              } catch (error) {
                console.log(`No workflow found for SEP: ${registrasi.no_sep}`)
              }
            }
          }

          vm.totalRows = registrasiRes.count
        } else {
          vm.$_alert.error(registrasiRes.message)
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async refreshData(){
      const vm = this
      await vm.getData()
    },
    resetFilter() {
      const vm = this
      vm.dataFilter = {
        halaman: 1,
        jumlah: 10,
        nama: '',
        tanggal: '',
        kelas_kunjungan_id: '',
      }
      vm.getData()
    },
  },
}
</script>