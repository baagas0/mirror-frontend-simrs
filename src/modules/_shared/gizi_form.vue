<template>
  <div class="card card-custom">
    <div class="card-header p-3 pb-0">
      <div class="card-title">
        <h5 class="font-weight-bolder text-dark">Data Gizi Pasien</h5>
      </div>
    </div>
    <div class="card-body p-4">
      <!-- Loading State -->
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!existingGiziData && !isEditing" class="text-center py-10">
        <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
        <h5 class="font-weight-bolder mt-5">Data gizi belum tersedia</h5>
        <p class="text-muted">Pasien ini belum memiliki data diet dan nutrisi</p>
        <button class="btn btn-primary mt-3" @click="startCreate">
          <i class="ri-file-add-line"></i> Buat Data Diet
        </button>
      </div>

      <!-- Form State -->
      <div v-else>
        <form @submit.prevent="submitForm">
          <div class="row">
            <!-- Left Column: Basic Info -->
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label>Kode Jenis Diet</label>
                <input
                  v-model="formData.kode_jenis_diet"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan kode jenis diet"
                />
              </div>

              <div class="form-group">
                <label>Nama Jenis Diet</label>
                <input
                  v-model="formData.nama_jenis_diet"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama jenis diet"
                />
              </div>

              <div class="form-group">
                <label>Kode Nutrisi</label>
                <input
                  v-model="formData.kode_nutrisi"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan kode nutrisi"
                />
              </div>

              <div class="form-group">
                <label>Nama Nutrisi</label>
                <input
                  v-model="formData.nama_nutrisi"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama nutrisi"
                />
              </div>
            </div>

            <!-- Right Column: Restrictions & Schedule -->
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label>Kode Larangan Makan</label>
                <input
                  v-model="formData.kode_larangan_makan"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan kode larangan makan"
                />
              </div>

              <div class="form-group">
                <label>Nama Larangan Makan</label>
                <input
                  v-model="formData.nama_larangan_makan"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama larangan makan"
                />
              </div>

              <div class="form-group">
                <label>Status Diet <span class="text-danger">*</span></label>
                <select v-model="formData.status_diet" class="form-control" required>
                  <option value="baru">Baru</option>
                  <option value="aktif">Aktif</option>
                  <option value="revisi">Revisi</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Description Full Width -->
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label>Deskripsi</label>
                <textarea
                  v-model="formData.deskripsi"
                  class="form-control"
                  rows="3"
                  placeholder="Masukkan deskripsi tambahan..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Jadwal Makan Checkbox Group -->
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label>Jadwal Makan <span class="text-danger">*</span></label>
                <div class="checkbox-inline">
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" v-model="jadwalPagi" @change="updateJadwalMakan" />
                    <span></span>Pagi
                  </label>
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" v-model="jadwalSiang" @change="updateJadwalMakan" />
                    <span></span>Siang
                  </label>
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" v-model="jadwalSore" @change="updateJadwalMakan" />
                    <span></span>Sore
                  </label>
                  <label class="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" v-model="jadwalMalam" @change="updateJadwalMakan" />
                    <span></span>Malam
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-end mt-5">
                <button type="button" class="btn btn-secondary mr-2" @click="cancelEdit" v-if="isEditing">
                  <i class="ri-close-line"></i> Batal
                </button>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <i class="ri-save-line" v-if="!loading"></i>
                  <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                  {{ isEditing ? 'Simpan Perubahan' : 'Buat Data Diet' }}
                </button>
              </div>
            </div>
          </div>
        </form>

        <!-- Delete Button (Only in Edit Mode with Existing Data) -->
        <div class="row" v-if="isEditing && existingGiziData">
          <div class="col-12">
            <hr />
            <button class="btn btn-danger" @click="confirmDelete">
              <i class="ri-delete-bin-line"></i> Hapus Data Diet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GiziForm',
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
      isEditing: false,
      formData: {
        id: null,
        registrasi_id: this.registrasiId,
        kode_jenis_diet: '',
        nama_jenis_diet: '',
        kode_nutrisi: '',
        nama_nutrisi: '',
        kode_larangan_makan: '',
        nama_larangan_makan: '',
        deskripsi: '',
        jadwal_makan: [],
        status_diet: 'baru'
      },
      existingGiziData: null,
      jadwalPagi: false,
      jadwalSiang: false,
      jadwalSore: false,
      jadwalMalam: false
    }
  },
  watch: {
    registrasiId(newVal) {
      if (newVal) {
        this.loadGiziData()
      }
    }
  },
  mounted() {
    this.loadGiziData()
  },
  methods: {
    async loadGiziData() {
      if (!this.registrasiId) return

      this.loading = true
      try {
        const response = await this.$_api.post('gizi/list', {
          registrasi_id: this.registrasiId,
          halaman: 1,
          jumlah: 10
        })

        if (response.data && response.data.length > 0) {
          this.existingGiziData = response.data[0]
          this.populateForm(this.existingGiziData)
        } else {
          this.existingGiziData = null
          this.resetForm()
        }
      } catch (error) {
        console.error('Error loading gizi data:', error)
        this.$_alert.error({}, 'Gagal memuat data gizi')
      } finally {
        this.loading = false
      }
    },

    startCreate() {
      this.isEditing = true
      this.resetForm()
    },

    populateForm(data) {
      this.formData = {
        id: data.id,
        registrasi_id: data.registrasi_id,
        kode_jenis_diet: data.kode_jenis_diet || '',
        nama_jenis_diet: data.nama_jenis_diet || '',
        kode_nutrisi: data.kode_nutrisi || '',
        nama_nutrisi: data.nama_nutrisi || '',
        kode_larangan_makan: data.kode_larangan_makan || '',
        nama_larangan_makan: data.nama_larangan_makan || '',
        deskripsi: data.deskripsi || '',
        jadwal_makan: data.jadwal_makan || [],
        status_diet: data.status_diet || 'baru'
      }

      // Set checkbox states
      this.jadwalPagi = this.formData.jadwal_makan.includes('Pagi')
      this.jadwalSiang = this.formData.jadwal_makan.includes('Siang')
      this.jadwalSore = this.formData.jadwal_makan.includes('Sore')
      this.jadwalMalam = this.formData.jadwal_makan.includes('Malam')

      this.isEditing = true
    },

    updateJadwalMakan() {
      this.formData.jadwal_makan = []
      if (this.jadwalPagi) this.formData.jadwal_makan.push('Pagi')
      if (this.jadwalSiang) this.formData.jadwal_makan.push('Siang')
      if (this.jadwalSore) this.formData.jadwal_makan.push('Sore')
      if (this.jadwalMalam) this.formData.jadwal_makan.push('Malam')
    },

    async submitForm() {
      // Validate at least one jadwal makan selected
      if (this.formData.jadwal_makan.length === 0) {
        this.$_alert.error({}, 'Pilih minimal 1 jadwal makan')
        return
      }

      this.loading = true
      try {
        let response
        if (this.formData.id) {
          // Update existing
          response = await this.$_api.post('gizi/update', this.formData)
        } else {
          // Create new
          response = await this.$_api.post('gizi/register', this.formData)
        }

        this.$_alert.success({}, response.data.message || 'Data gizi berhasil disimpan')
        await this.loadGiziData()
        this.isEditing = true
      } catch (error) {
        console.error('Error saving gizi data:', error)
        const message = error.response?.data?.message || 'Gagal menyimpan data gizi'
        this.$_alert.error({}, message)
      } finally {
        this.loading = false
      }
    },

    cancelEdit() {
      this.isEditing = false
      if (this.existingGiziData) {
        this.populateForm(this.existingGiziData)
      } else {
        this.resetForm()
      }
    },

    async confirmDelete() {
      if (!this.existingGiziData || !this.existingGiziData.id) {
        this.$_alert.error({}, 'Tidak ada data untuk dihapus')
        return
      }

      this.$_alert.confirm(
        { title: 'Hapus Data Diet', text: 'Apakah Anda yakin ingin menghapus data diet ini?' },
        async () => {
          await this.deleteGizi()
        }
      )
    },

    async deleteGizi() {
      this.loading = true
      try {
        await this.$_api.post('gizi/delete', {
          id: this.existingGiziData.id
        })

        this.$_alert.success({}, 'Data gizi berhasil dihapus')
        await this.loadGiziData()
        this.isEditing = false
      } catch (error) {
        console.error('Error deleting gizi data:', error)
        this.$_alert.error({}, 'Gagal menghapus data gizi')
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        registrasi_id: this.registrasiId,
        kode_jenis_diet: '',
        nama_jenis_diet: '',
        kode_nutrisi: '',
        nama_nutrisi: '',
        kode_larangan_makan: '',
        nama_larangan_makan: '',
        deskripsi: '',
        jadwal_makan: [],
        status_diet: 'baru'
      }
      this.jadwalPagi = false
      this.jadwalSiang = false
      this.jadwalSore = false
      this.jadwalMalam = false
    }
  }
}
</script>

<style scoped>
.checkbox-inline {
  display: flex;
  gap: 20px;
}

.checkbox-inline .checkbox {
  margin: 0;
}
</style>
