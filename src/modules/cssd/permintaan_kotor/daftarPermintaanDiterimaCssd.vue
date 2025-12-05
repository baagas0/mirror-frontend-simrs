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
                    <strong>Penerimaan Alat Steril</strong>
                  </h3>
                </b-col>
                <b-col class="text-right">
                  <b-button variant="primary" @click="showInputModal">
                    <i class="ri-add-line"></i> Permintaan Baru
                  </b-button>
                </b-col>
              </b-row>
            </template>
            <div>
              <!-- Filter Form -->
              <form @submit.prevent="getData" autocomplete="off" class="mb-4">
                <b-row style="row-gap: 10px;">
                  <b-col cols="3">
                    <s-input v-model="dataFilter.nama_unit" :item="{
                      label: 'Unit Pengirim',
                      id: 'nama_unit',
                      data: 'nama_unit',
                      type: 'text',
                      validation: [''],
                    }" :valuee="dataFilter.nama_unit" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="2">
                    <s-input v-model="dataFilter.tanggal_permintaan" :item="{
                      id: 'tanggal_permintaan',
                      show: true,
                      class: '', attr: null,
                      value: null,
                      label: 'Tanggal Permintaan',
                      placeholder: 'Isikan tanggal',
                      type: 'date',
                      validation: ['']
                    }" :valuee="dataFilter.tanggal_permintaan" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="3">
                    <s-input v-model="dataFilter.search" :item="{
                      label: 'Pencarian',
                      id: 'search',
                      data: 'search',
                      type: 'text',
                      validation: [''],
                    }" :valuee="dataFilter.search" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="2" class="d-flex align-items-end">
                    <button type="submit" class="btn btn-light-primary">
                      <i class="ri-search-line"></i>
                      Cari
                    </button>
                    <div @click="resetFilter" class="btn btn-light-danger ml-2">
                      <i class="ri-refresh-line"></i>
                      Reset
                    </div>
                  </b-col>
                </b-row>
              </form>

              <!-- Data Table -->
              <b-row class="mt-4">
                <b-col cols="12" md="12" lg="12">
                  <b-table
                    :items="listPermintaan"
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
                    <template #cell(tanggal_permintaan)="item">
                      {{ $moment(item.item.tanggal_permintaan).format('LL') }}
                    </template>
                    <template #cell(status_permintaan)="item">
                      <b-badge
                        :variant="getStatusVariant(item.item.status_permintaan)"
                        class="mr-1"
                      >
                        {{ getStatusText(item.item.status_permintaan) }}
                      </b-badge>
                    </template>
                    <template #cell(actions)="item">
                      <b-button-group>
                        <b-button
                          @click="viewDetail(item.item)"
                          variant="info"
                          size="sm"
                          title="Lihat Detail"
                        >
                          <i class="ri-eye-line"></i>
                        </b-button>
                        <b-button
                          @click="editItem(item.item)"
                          variant="warning"
                          size="sm"
                          title="Edit"
                        >
                          <i class="ri-edit-line"></i>
                        </b-button>
                        <b-button
                          v-if="item.item.status_permintaan < 4"
                          @click="updateStatus(item.item)"
                          variant="success"
                          size="sm"
                          title="Update Status"
                        >
                          <i class="ri-refresh-line"></i>
                        </b-button>
                        <b-button
                          @click="deleteItem(item.item)"
                          variant="danger"
                          size="sm"
                          title="Hapus"
                        >
                          <i class="ri-delete-bin-line"></i>
                        </b-button>
                      </b-button-group>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <!-- Pagination -->
              <b-row class="d-flex justify-content-between mt-4">
                <b-col cols="2">
                  <b-form-select
                    id="per-page-select"
                    v-model="dataFilter.jumlah"
                    :options="[10, 25, 50, 100]"
                    size="sm"
                  />
                </b-col>
                <b-col cols="5">
                  <b-pagination
                    class="m-0 p-0"
                    v-model="dataFilter.halaman"
                    :total-rows="totalRows"
                    :per-page="dataFilter.jumlah"
                    align="fill"
                    size="sm"
                  ></b-pagination>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Input Modal -->
    <b-modal
      id="input-modal"
      size="xl"
      :title="isEdit ? 'Edit Permintaan' : 'Permintaan Baru'"
      hide-footer
      @hidden="resetForm"
    >
      <InputPermintaan
        :is-edit="isEdit"
        :edit-data="editData"
        @success="handleInputSuccess"
        @cancel="hideInputModal"
      />
    </b-modal>

    <!-- Status Update Modal -->
    <b-modal
      id="status-modal"
      title="Update Status"
      hide-footer
    >
      <div>
        <p>Apakah Anda yakin ingin mengubah status permintaan ini?</p>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="secondary" @click="hideStatusModal">Batal</b-button>
          <b-button variant="primary" @click="confirmUpdateStatus" class="ml-2">
            Ya, Ubah
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import InputPermintaan from './inputPermintaan2.vue'

export default {
  components: {
    InputPermintaan
  },
  data() {
    return {
      busy: false,
      isEdit: false,
      editData: null,
      selectedData: null,
      listPermintaan: [],
      totalRows: 0,
      dashboard: {},
      dataFilter: {
        halaman: 1,
        jumlah: 10,
        nama_unit: '',
        tanggal_permintaan: '',
        status_permintaan: '',
        search: ''
      },
      fields: [
        {
          key: "kode_permintaan",
          label: "Kode Permintaan",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_unit",
          label: "Unit",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "tanggal_permintaan",
          label: "Tanggal",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "status_permintaan",
          label: "Status",
          class: "align-middle text-center",
        },
        {
          key: "keterangan",
          label: "Keterangan",
          class: "align-middle text-left",
          thStyle: "width: 300px;",
        },
        {
          key: "created_by_name",
          label: "Dibuat Oleh",
          class: "align-middle text-left",
        },
        {
          key: "actions",
          label: "Aksi",
          class: "align-middle table-option-2 text-center",
        },
      ],
    }
  },
  watch: {
    'dataFilter.halaman'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData()
      }
    },
    'dataFilter.jumlah'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dataFilter.halaman = 1
        this.getData()
      }
    }
  },
  async mounted() {
    const vm = this
    await vm.getDashboard()
    await vm.getData()
  },
  methods: {
    getStatusVariant(status) {
      const variants = {
        1: 'warning',
        2: 'info',
        3: 'secondary',
        4: 'success'
      }
      return variants[status] || 'secondary'
    },
    getStatusText(status) {
      const texts = {
        1: 'Menunggu',
        2: 'Diterima Unit CSSD',
        3: 'Proses Sterilisasi',
        4: 'Selesai'
      }
      return texts[status] || 'Unknown'
    },
    async getDashboard() {
      const vm = this
      try {
        const res = await vm.$_api.post('permintaan_kotor/dashboard')
        if (res.status == 200) {
          vm.dashboard = res.data
        }
      } catch (error) {
        console.error('Error getting dashboard:', error)
      }
    },
    async getData() {
      const vm = this
      vm.busy = true
      try {
        console.log('Filter:', vm.dataFilter)
        const res = await vm.$_api.post('permintaan_kotor/list', {
          ...vm.dataFilter,
          diterima_unit_cssd: true
        })
        if (res.status == 200) {
          vm.listPermintaan = res.data
          vm.totalRows = res.count
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
    showInputModal() {
      this.isEdit = false
      this.editData = null
      this.$bvModal.show('input-modal')
    },
    hideInputModal() {
      this.$bvModal.hide('input-modal')
    },
    async viewDetail(data) {
      this.$router.push({
        name: 'detail-permintaan-kotor-4',
        query: { id: data.id }
      })

      // this.$router.push('/cssd/permintaan_kotor_v1/daftar_permintaan?id=' + data.id)
    },
    editItem(data) {
      this.isEdit = true
      this.editData = data
      this.$bvModal.show('input-modal')
    },
    updateStatus(data) {
      this.selectedData = data
      this.$bvModal.show('status-modal')
    },
    hideStatusModal() {
      this.$bvModal.hide('status-modal')
    },
    async confirmUpdateStatus() {
      if (!this.selectedData) return

      this.busy = true
      try {
        const res = await this.$_api.post('permintaan_kotor/updateStatus', {
          id: this.selectedData.id,
          status_permintaan: this.selectedData.status_permintaan < 4 ? this.selectedData.status_permintaan + 1 : 4
        })
        if (res.status == 200) {
          this.$_alert.success('Status berhasil diubah')
          await this.getData()
          await this.getDashboard()
        } else {
          this.$_alert.error(res.message)
        }
      } catch (error) {
        this.$_alert.error('Terjadi Kesalahan System')
        console.log(error)
      } finally {
        this.busy = false
        this.hideStatusModal()
      }
    },
    async deleteItem(data) {
      const vm = this
      vm.$_alert.confirm('Apakah Anda yakin ingin menghapus data ini?').then(async (result) => {
        if (result.isConfirmed) {
          vm.busy = true
          try {
            const res = await vm.$_api.post('permintaan_kotor/delete', { id: data.id })
            if (res.status == 200) {
              vm.$_alert.success('Data berhasil dihapus')
              await vm.getData()
              await vm.getDashboard()
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
    async handleInputSuccess() {
      await this.getData()
      await this.getDashboard()
      this.hideInputModal()
    },
    resetFilter() {
      const vm = this
      vm.dataFilter = {
        halaman: 1,
        jumlah: 10,
        nama_unit: '',
        tanggal_permintaan: '',
        status_permintaan: '',
        search: ''
      }
      vm.getData()
    },
    resetForm() {
      this.isEdit = false
      this.editData = null
    },
  },
}
</script>

<style scoped>
.card-body h2 {
  font-size: 2rem;
  font-weight: bold;
}

.card-body small {
  font-size: 0.875rem;
}
</style>