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
                    <strong>Detail Permintaan Alat Steril</strong>
                  </h3>
                </b-col>
                <b-col class="text-right">
                  <b-button variant="secondary" @click="goBack">
                    <i class="ri-arrow-left-line"></i> Kembali
                  </b-button>
                </b-col>
              </b-row>
            </template>
            <div v-if="!busy && detailData">
              <!-- Request Information -->
              <b-row class="mb-4">
                <b-col cols="12">
                  <b-card bg-variant="light" class="mb-3">
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-file-info-line"></i> Informasi Permintaan
                      </h5>
                    </template>
                    <b-row>
                      <b-col cols="6">
                        <p><strong>Kode Permintaan:</strong> {{ detailData.kode_permintaan }}</p>
                        <p><strong>Unit Pengirim:</strong> {{ detailData.nama_unit }}</p>
                        <p><strong>Tanggal Permintaan:</strong> {{ $moment(detailData.tanggal_permintaan).format('LL') }}</p>
                      </b-col>
                      <b-col cols="6">
                        <p><strong>Status:</strong>
                          <b-badge :variant="getStatusVariant(detailData.status_permintaan)" class="ml-2">
                            {{ getStatusText(detailData.status_permintaan) }}
                          </b-badge>
                        </p>
                        <p><strong>Dibuat Oleh:</strong> {{ detailData.created_by_name || '-' }}</p>
                        <p><strong>Tanggal Dibuat:</strong> {{ $moment(detailData.created_at).format('LLL') }}</p>
                      </b-col>
                    </b-row>
                    <b-row v-if="detailData.keterangan">
                      <b-col cols="12">
                        <p><strong>Keterangan:</strong></p>
                        <p class="ml-3">{{ detailData.keterangan }}</p>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <!-- Items Table -->
              <b-row class="mb-4">
                <b-col cols="12">
                  <b-card bg-variant="light">
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-list-check"></i> Daftar Barang
                      </h5>
                    </template>
                    <b-table
                      :items="detailData.items"
                      :fields="itemFields"
                      responsive
                      show-empty
                      small
                      bordered
                      striped
                      hover
                    >
                      <template #cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                      <template #cell(jumlah)="data">
                        <span class="text-center font-weight-bold">{{ data.item.jumlah }}</span>
                      </template>
                      <template #empty>
                        <div class="text-center py-3">
                          <p class="text-muted">Tidak ada barang dalam permintaan ini</p>
                        </div>
                      </template>
                    </b-table>
                  </b-card>
                </b-col>
              </b-row>

              <!-- Status Timeline -->
              <b-row class="mb-4">
                <b-col cols="12">
                  <b-card bg-variant="light">
                    <template #header>
                      <h5 class="mb-0">
                        <i class="ri-time-line"></i> Timeline Status
                      </h5>
                    </template>
                    <div class="timeline-container">
                      <div class="timeline-step" :class="{ active: detailData.status_permintaan >= 1, completed: detailData.status_permintaan > 1 }">
                        <div class="timeline-icon">
                          <i class="ri-time-line"></i>
                        </div>
                        <div class="timeline-content">
                          <h6>Menunggu</h6>
                          <small>Permintaan dibuat</small>
                        </div>
                      </div>
                      <div class="timeline-step" :class="{ active: detailData.status_permintaan >= 2, completed: detailData.status_permintaan > 2 }">
                        <div class="timeline-icon">
                          <i class="ri-truck-line"></i>
                        </div>
                        <div class="timeline-content">
                          <h6>Diterima Unit CSSD</h6>
                          <small>Barang diterima di unit CSSD</small>
                        </div>
                      </div>
                      <div class="timeline-step" :class="{ active: detailData.status_permintaan >= 3, completed: detailData.status_permintaan > 3 }">
                        <div class="timeline-icon">
                          <i class="ri-loader-4-line"></i>
                        </div>
                        <div class="timeline-content">
                          <h6>Proses Sterilisasi</h6>
                          <small>Sedang diproses di CSSD</small>
                        </div>
                      </div>
                      <div class="timeline-step" :class="{ active: detailData.status_permintaan >= 4 }">
                        <div class="timeline-icon">
                          <i class="ri-check-line"></i>
                        </div>
                        <div class="timeline-content">
                          <h6>Selesai</h6>
                          <small>Sterilisasi selesai</small>
                        </div>
                      </div>
                    </div>
                  </b-card>
                </b-col>
              </b-row>

              <!-- Action Buttons -->
              <b-row>
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <b-button variant="warning" @click="editData" v-if="detailData.status_permintaan < 2">
                      <i class="ri-edit-line"></i> Edit Permintaan
                    </b-button>
                    <div>
                      <b-button
                        variant="success"
                        @click="updateStatus"
                        v-if="detailData.status_permintaan < 4"
                      >
                        <i class="ri-refresh-line"></i> Update Status
                      </b-button>
                      <b-button
                        variant="danger"
                        @click="deleteData"
                        class="ml-2"
                        v-if="detailData.status_permintaan < 2"
                      >
                        <i class="ri-delete-bin-line"></i> Hapus
                      </b-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>

            <!-- Loading State -->
            <div v-if="busy" class="text-center py-5">
              <b-spinner variant="primary" label="Loading..."></b-spinner>
              <p class="mt-2">Memuat data...</p>
            </div>

            <!-- Empty State -->
            <div v-if="!busy && !detailData" class="text-center py-5">
              <i class="ri-file-line" style="font-size: 3rem; color: #ccc;"></i>
              <h5 class="mt-3">Data tidak ditemukan</h5>
              <p class="text-muted">Permintaan yang Anda cari tidak tersedia.</p>
              <b-button variant="primary" @click="goBack">
                <i class="ri-arrow-left-line"></i> Kembali
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

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
export default {
  data() {
    return {
      busy: true,
      detailData: null,
      itemFields: [
        {
          key: 'index',
          label: '#',
          class: 'text-center',
          thStyle: 'width: 50px;'
        },
        {
          key: 'nama_barang',
          label: 'Nama Barang',
          class: 'text-left'
        },
        {
          key: 'kode_produk',
          label: 'Kode Produk',
          class: 'text-left'
        },
        {
          key: 'satuan',
          label: 'Satuan',
          class: 'text-center'
        },
        {
          key: 'jumlah',
          label: 'Jumlah',
          class: 'text-center'
        },
        {
          key: 'keterangan',
          label: 'Keterangan',
          class: 'text-left'
        }
      ]
    }
  },
  async mounted() {
    await this.getDetailData()
  },
  methods: {
    async getDetailData() {
      const id = this.$route.query.id
      if (!id) {
        this.$_alert.error('ID permintaan tidak valid')
        this.goBack()
        return
      }

      this.busy = true
      try {
        const res = await this.$_api.post('permintaan_kotor/detailsById', { id })
        if (res.status == 200) {
          this.detailData = res.data
        } else {
          this.$_alert.error(res.message || 'Gagal memuat data')
          this.goBack()
        }
      } catch (error) {
        console.error('Error getting detail data:', error)
        this.$_alert.error('Terjadi kesalahan saat memuat data')
        this.goBack()
      } finally {
        this.busy = false
      }
    },
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
    goBack() {
      this.$router.push({ name: 'daftar-permintaan-kotor' })
    },
    editData() {
      if (!this.detailData) return
      this.$router.push({
        name: 'input-permintaan-kotor',
        query: { id: this.detailData.id, edit: true }
      })
    },
    updateStatus() {
      if (!this.detailData) return
      this.$bvModal.show('status-modal')
    },
    hideStatusModal() {
      this.$bvModal.hide('status-modal')
    },
    async confirmUpdateStatus() {
      if (!this.detailData) return

      this.busy = true
      try {
        const res = await this.$_api.post('permintaan_kotor/updateStatus', {
          id: this.detailData.id,
          status_permintaan: this.detailData.status_permintaan < 4 ? this.detailData.status_permintaan + 1 : 4
        })
        if (res.status == 200) {
          this.$_alert.success('Status berhasil diubah')
          await this.getDetailData()
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
    deleteData() {
      if (!this.detailData) return

      this.$_alert.confirm('Apakah Anda yakin ingin menghapus data ini?').then(async (result) => {
        if (result.isConfirmed) {
          this.busy = true
          try {
            const res = await this.$_api.post('permintaan_kotor/delete', { id: this.detailData.id })
            if (res.status == 200) {
              this.$_alert.success('Data berhasil dihapus')
              this.goBack()
            } else {
              this.$_alert.error(res.message)
            }
          } catch (error) {
            this.$_alert.error('Terjadi Kesalahan System')
            console.log(error)
          } finally {
            this.busy = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.timeline-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 20px 0;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 50px;
  right: 50px;
  height: 2px;
  background: #e9ecef;
  z-index: 1;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.timeline-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.timeline-step.active .timeline-icon {
  background: #007bff;
  color: white;
}

.timeline-step.completed .timeline-icon {
  background: #28a745;
  color: white;
}

.timeline-content {
  text-align: center;
}

.timeline-content h6 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.timeline-content small {
  font-size: 12px;
  color: #6c757d;
}

.timeline-step.active .timeline-content h6,
.timeline-step.completed .timeline-content h6 {
  color: #212529;
}

@media (max-width: 768px) {
  .timeline-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .timeline-container::before {
    left: 30px;
    right: auto;
    top: 60px;
    bottom: 40px;
    width: 2px;
    height: auto;
  }

  .timeline-step {
    flex-direction: row;
    margin-bottom: 30px;
    width: 100%;
  }

  .timeline-content {
    text-align: left;
    margin-left: 15px;
  }
}
</style>