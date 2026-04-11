<template>
  <div class="card card-custom">
    <div class="card-body p-4">
      <!-- Loading State -->
      <div class="d-flex justify-content-center" v-if="loading && !isFormMode">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>

      <!-- List View -->
      <div v-if="!isFormMode">
        <!-- Empty State -->
        <div v-if="observasiList.length === 0" class="text-center py-10">
          <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
          <h5 class="font-weight-bolder mt-5">Data observasi belum tersedia</h5>
          <p class="text-muted">Pasien ini belum memiliki data observasi</p>
          <button class="btn btn-primary mt-3" @click="startCreate">
            <i class="ri-file-add-line"></i> Buat Data Observasi
          </button>
        </div>

        <!-- Observasi Table -->
        <div v-else>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <h6 class="font-weight-bolder text-dark">Daftar Observasi ({{ observasiList.length }})</h6>
            <button class="btn btn-primary btn-sm" @click="startCreate">
              <i class="ri-add-line"></i> Tambah Data
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th width="150">Mulai</th>
                  <th width="150">Selesai</th>
                  <th>Durasi</th>
                  <th>Status</th>
                  <th width="200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in observasiList" :key="item.id">
                  <td>
                    <div class="font-weight-bolder text-dark">
                      {{ $moment(item.jam_start).format('DD/MM/YYYY HH:mm') }}
                    </div>
                  </td>
                  <td>
                    <div v-if="item.jam_end" class="font-weight-bolder">
                      {{ $moment(item.jam_end).format('DD/MM/YYYY HH:mm') }}
                    </div>
                    <div v-else class="text-muted">-</div>
                  </td>
                  <td>{{ item.durasi || '-' }} jam</td>
                  <td>
                    <span v-if="item.jam_end" class="badge badge-success">Selesai</span>
                    <span v-else class="badge badge-warning">Aktif</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-info mr-1" @click="editRecord(item)" title="Edit">
                      <i class="ri-pencil-line"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" @click="confirmDelete(item)" title="Hapus">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Mode -->
      <div v-if="isFormMode">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h6 class="font-weight-bolder text-dark">{{ formData.id ? 'Edit Observasi' : 'Buat Observasi Baru' }}</h6>
          <button class="btn btn-secondary btn-sm" @click="cancelEdit">
            <i class="ri-close-line"></i> Batal
          </button>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs nav-tabs-line mb-5">
          <li class="nav-item">
            <a class="nav-link pointer" @click="switchTab('monitoring')" :class="{ active: activeTab === 'monitoring' }">
              <span class="nav-icon"><i class="flaticon2-monitor"></i></span>
              <span class="nav-text">Monitoring</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link pointer" @click="switchTab('catatan_dokter')" :class="{ active: activeTab === 'catatan_dokter' }">
              <span class="nav-icon"><i class="flaticon2-talk"></i></span>
              <span class="nav-text">Catatan Dokter</span>
            </a>
          </li>
        </ul>

        <!-- Tab Contents -->
        <div v-if="activeTab === 'monitoring'">
          <div class="alert alert-info">
            <i class="ri-information-line"></i> Tab Monitoring akan diimplementasikan pada task berikutnya
          </div>
        </div>

        <div v-if="activeTab === 'catatan_dokter'">
          <div class="alert alert-info">
            <i class="ri-information-line"></i> Tab Catatan Dokter akan diimplementasikan pada task berikutnya
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObservasiForm',
  props: {
    dataRegistrasi: {
      type: Object,
      required: true
    },
    registrasiId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      isFormMode: false,
      activeTab: 'monitoring',
      observasiList: [],
      selectedObservasi: null,
      formData: {
        id: null,
        registrasi_id: this.registrasiId,
        durasi: 24,
        jam_start: '',
        jam_end: null,
        interval_vital_sign: 1,
        catatan_dokter: '',
        infus: '',
        obat: '',
        tindakan: '',
        keputusan_akhir: ''
      }
    }
  },
  watch: {
    registrasiId(newVal) {
      if (newVal) {
        this.loadObservasiData()
      }
    }
  },
  mounted() {
    this.loadObservasiData()
  },
  methods: {
    async loadObservasiData() {
      if (!this.registrasiId) return

      this.loading = true
      try {
        const response = await this.$_api.post('observasi/list', {
          registrasi_id: this.registrasiId,
          halaman: 1,
          jumlah: 999
        })

        if (response.data) {
          this.observasiList = response.data
        } else {
          this.observasiList = []
        }
      } catch (error) {
        console.error('Error loading observasi data:', error)
        let message = 'Gagal memuat data observasi'
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message
        } else if (error.message) {
          message = error.message
        }
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    startCreate() {
      this.isFormMode = true
      this.resetForm()
    },

    switchTab(tab) {
      this.activeTab = tab
    },

    cancelEdit() {
      this.isFormMode = false
      this.resetForm()
    },

    async editRecord(item) {
      this.loading = true
      try {
        const response = await this.$_api.post('observasi/detailsById', {
          id: item.id
        })

        if (response.data) {
          const observasi = response.data
          this.selectedObservasi = observasi
          this.formData = {
            id: observasi.id,
            registrasi_id: observasi.registrasi_id,
            durasi: observasi.durasi || 24,
            jam_start: observasi.jam_start || '',
            jam_end: observasi.jam_end || null,
            interval_vital_sign: observasi.interval_vital_sign || 1,
            catatan_dokter: observasi.catatan_dokter || '',
            infus: observasi.infus || '',
            obat: observasi.obat || '',
            tindakan: observasi.tindakan || '',
            keputusan_akhir: observasi.keputusan_akhir || ''
          }
          this.isFormMode = true
        }
      } catch (error) {
        console.error('Error loading observasi for edit:', error)
        let message = 'Gagal memuat data observasi untuk edit'
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message
        } else if (error.message) {
          message = error.message
        }
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    async confirmDelete(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, 'Tidak ada data untuk dihapus')
        return
      }

      this.$_alert.confirm(
        { title: 'Hapus Data Observasi', text: 'Apakah Anda yakin ingin menghapus data observasi ini?' },
        async () => {
          await this.deleteObservasi(item)
        }
      )
    },

    async deleteObservasi(item) {
      this.loading = true
      try {
        await this.$_api.post('observasi/delete', {
          id: item.id
        })

        this.$_alert.success({}, 'Data observasi berhasil dihapus')
        await this.loadObservasiData()
      } catch (error) {
        console.error('Error deleting observasi data:', error)
        let message = 'Gagal menghapus data observasi'
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message
        } else if (error.message) {
          message = error.message
        }
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        registrasi_id: this.registrasiId,
        durasi: 24,
        jam_start: '',
        jam_end: null,
        interval_vital_sign: 1,
        catatan_dokter: '',
        infus: '',
        obat: '',
        tindakan: '',
        keputusan_akhir: ''
      }
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
