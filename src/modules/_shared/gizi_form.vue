<template>
  <div class="card card-custom">
    <div class="card-body p-4">
      <!-- Loading State -->
      <div class="d-flex justify-content-center" v-if="loading && !isEditing">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>

      <!-- Table View -->
      <div v-if="!isEditing">
        <!-- Empty State -->
        <div v-if="giziList.length === 0" class="text-center py-10">
          <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
          <h5 class="font-weight-bolder mt-5">Data gizi belum tersedia</h5>
          <p class="text-muted">Pasien ini belum memiliki data diet dan nutrisi</p>
          <button class="btn btn-primary mt-3" @click="startCreate">
            <i class="ri-file-add-line"></i> Buat Data Diet
          </button>
        </div>

        <!-- Gizi Table -->
        <div v-else>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <h6 class="font-weight-bolder text-dark">Daftar Gizi ({{ giziList.length }})</h6>
            <button class="btn btn-primary btn-sm" @click="startCreate">
              <i class="ri-add-line"></i> Tambah Data
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Jenis Diet</th>
                  <th>Nutrisi</th>
                  <th>Larangan Makan</th>
                  <th>Jadwal Makan</th>
                  <th>Status</th>
                  <th width="150">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in giziList" :key="index">
                  <td>
                    <div v-if="item.nama_jenis_diet" class="font-weight-bold">{{ item.nama_jenis_diet }}</div>
                    <small class="text-muted" v-if="item.kode_jenis_diet">{{ item.kode_jenis_diet }}</small>
                    <div v-else class="text-muted">-</div>
                  </td>
                  <td>
                    <div v-if="item.nama_nutrisi" class="font-weight-bold">{{ item.nama_nutrisi }}</div>
                    <small class="text-muted" v-if="item.kode_nutrisi">{{ item.kode_nutrisi }}</small>
                    <div v-else class="text-muted">-</div>
                  </td>
                  <td>
                    <div v-if="item.nama_larangan_makan" class="font-weight-bold">{{ item.nama_larangan_makan }}</div>
                    <small class="text-muted" v-if="item.kode_larangan_makan">{{ item.kode_larangan_makan }}</small>
                    <div v-else class="text-muted">-</div>
                  </td>
                  <td>
                    <span v-if="item.jadwal_makan && item.jadwal_makan.length > 0" class="badge badge-primary">
                      {{ item.jadwal_makan.join(', ') }}
                    </span>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td>
                    <span v-if="item.status_diet === 'baru'" class="badge badge-info">Baru</span>
                    <span v-else-if="item.status_diet === 'aktif'" class="badge badge-success">Aktif</span>
                    <span v-else-if="item.status_diet === 'revisi'" class="badge badge-warning">Revisi</span>
                    <span v-else class="badge badge-secondary">{{ item.status_diet }}</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-warning mr-1" @click="editRecord(item)">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" @click="confirmDelete(item)">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form View -->
      <div v-else>
        <form @submit.prevent="submitForm">
          <div class="row">
            <!-- Left Column: Basic Info -->
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label>Jenis Diet</label>
                <select
                  v-model="formData.kode_jenis_diet"
                  class="form-control"
                  @change="onJenisDietChange"
                >
                  <option value="">-- Pilih Jenis Diet --</option>
                  <option v-for="item in jenisDietOptions" :key="item.code" :value="item.code">
                    {{ item.label }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Nutrisi</label>
                <select
                  v-model="formData.kode_nutrisi"
                  class="form-control"
                  @change="onNutrisiChange"
                >
                  <option value="">-- Pilih Nutrisi --</option>
                  <option v-for="item in nutrisiOptions" :key="item.code" :value="item.code">
                    {{ item.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Right Column: Restrictions & Schedule -->
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label>Larangan Makan</label>
                <select
                  v-model="formData.kode_larangan_makan"
                  class="form-control"
                  @change="onLaranganMakanChange"
                >
                  <option value="">-- Pilih Larangan Makan --</option>
                  <option v-for="item in laranganMakanOptions" :key="item.code" :value="item.code">
                    {{ item.label }}
                  </option>
                </select>
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
                <button type="button" class="btn btn-secondary mr-2" @click="cancelEdit">
                  <i class="ri-close-line"></i> Batal
                </button>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <i class="ri-save-line" v-if="!loading"></i>
                  <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                  {{ formData.id ? 'Simpan Perubahan' : 'Buat Data Diet' }}
                </button>
              </div>
            </div>
          </div>
        </form>
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
      giziList: [],
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
      jadwalPagi: false,
      jadwalSiang: false,
      jadwalSore: false,
      jadwalMalam: false,
      jenisDietOptions: [
        { label: 'Anjuran peningkatan cairan', code: '113148007' },
        { label: 'Diet rendah garam', code: '226208002' },
        { label: 'Diet rendah lemak', code: '226211005' },
        { label: 'Diet rendah gula', code: '226210006' },
        { label: 'Diet tinggi protein', code: '226209005' },
        { label: 'Diet diabetes', code: '226212003' },
        { label: 'Diet penurunan berat badan', code: '226213008' },
        { label: 'Diet penambahan berat badan', code: '703977005' },
        { label: 'Diet tinggi serat', code: '226215001' },
        { label: 'Diet cair', code: '225373002' },
        { label: 'Diet lunak', code: '225372007' },
        { label: 'Diet bubur / lumat', code: '225374008' },
      ],
      nutrisiOptions: [
        { label: 'Air mineral', code: '444695006' },
        { label: 'Karbohidrat', code: '226356002' },
        { label: 'Protein', code: '226358001' },
        { label: 'Lemak', code: '226359009' },
        { label: 'Natrium', code: '226360004' },
        { label: 'Vitamin', code: '226357006' },
        { label: 'Cairan', code: '226361000' },
      ],
      laranganMakanOptions: [
        { label: 'Soft drink (Minuman bersoda)', code: '1296980001' },
        { label: 'Fast food (Makanan cepat saji)', code: '227415009' },
        { label: 'Fried food (Makanan gorengan)', code: '227416005' },
        { label: 'Processed meat (Daging olahan)', code: '227417001' },
        { label: 'High sugar food (Makanan tinggi gula)', code: '227418006' },
        { label: 'Salty snack (Makanan tinggi garam)', code: '227419003' },
        { label: 'Caffeinated drink (Minuman berkafein)', code: '227420009' },
        { label: 'Alcoholic beverage (Minuman beralkohol)', code: '227421008' },
      ]
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
          jumlah: 999
        })

        if (response.data) {
          this.giziList = response.data
        } else {
          this.giziList = []
        }
      } catch (error) {
        console.error('Error loading gizi data:', error)
        let message = 'Gagal memuat data gizi'
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
    },

    editRecord(item) {
      this.populateForm(item)
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

        this.$_alert.success({}, response.message || 'Data gizi berhasil disimpan')
        await this.loadGiziData()
        this.isEditing = false
      } catch (error) {
        console.error('Error saving gizi data:', error)
        let message = 'Gagal menyimpan data gizi'
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

    cancelEdit() {
      this.isEditing = false
      this.resetForm()
    },

    async confirmDelete(item) {
      if (!item || !item.id) {
        this.$_alert.error({}, 'Tidak ada data untuk dihapus')
        return
      }

      this.$_alert.confirm(
        { title: 'Hapus Data Diet', text: 'Apakah Anda yakin ingin menghapus data diet ini?' },
        async () => {
          await this.deleteGizi(item)
        }
      )
    },

    async deleteGizi(item) {
      this.loading = true
      try {
        await this.$_api.post('gizi/delete', {
          id: item.id
        })

        this.$_alert.success({}, 'Data gizi berhasil dihapus')
        await this.loadGiziData()
      } catch (error) {
        console.error('Error deleting gizi data:', error)
        let message = 'Gagal menghapus data gizi'
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

    onJenisDietChange() {
      if (this.formData.kode_jenis_diet) {
        const selected = this.jenisDietOptions.find(item => item.code === this.formData.kode_jenis_diet)
        if (selected) {
          this.formData.kode_jenis_diet = selected.code
          this.formData.nama_jenis_diet = selected.label
        }
      } else {
        this.formData.nama_jenis_diet = ''
      }
    },

    onNutrisiChange() {
      if (this.formData.kode_nutrisi) {
        const selected = this.nutrisiOptions.find(item => item.code === this.formData.kode_nutrisi)
        if (selected) {
          this.formData.kode_nutrisi = selected.code
          this.formData.nama_nutrisi = selected.label
        }
      } else {
        this.formData.nama_nutrisi = ''
      }
    },

    onLaranganMakanChange() {
      if (this.formData.kode_larangan_makan) {
        const selected = this.laranganMakanOptions.find(item => item.code === this.formData.kode_larangan_makan)
        if (selected) {
          this.formData.kode_larangan_makan = selected.code
          this.formData.nama_larangan_makan = selected.label
        }
      } else {
        this.formData.nama_larangan_makan = ''
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
