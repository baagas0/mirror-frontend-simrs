<template>
  <div class="card card-custom">
    <div class="card-body p-4">
      <!-- Loading State -->
      <div class="d-flex justify-content-center" v-if="loading && !isEditing && !isViewingDetail">
        <div class="spinner spinner-track spinner-primary mr-15"></div>
      </div>

      <!-- Table View -->
      <div v-if="!isEditing && !isViewingDetail">
        <!-- Empty State -->
        <div v-if="visumList.length === 0" class="text-center py-10">
          <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
          <h5 class="font-weight-bolder mt-5">Data visum belum tersedia</h5>
          <p class="text-muted">Pasien ini belum memiliki data pemeriksaan visum</p>
          <button class="btn btn-primary mt-3" @click="startCreate">
            <i class="ri-file-add-line"></i> Buat Data Visum
          </button>
        </div>

        <!-- Visum Table -->
        <div v-else>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <h6 class="font-weight-bolder text-dark">Daftar Visum ({{ visumList.length }})</h6>
            <button class="btn btn-primary btn-sm" @click="startCreate">
              <i class="ri-add-line"></i> Tambah Data
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th width="120">No & Tanggal</th>
                  <th>Pemeriksaan</th>
                  <th>Tindakan Medis</th>
                  <th>Kesimpulan</th>
                  <th width="200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in visumList" :key="item.id">
                  <td>
                    <div class="font-weight-bolder text-dark">{{ item.nomor_urut }}</div>
                    <div class="small text-muted">
                      {{ $moment(item.tanggal_pemeriksaan).format('DD/MM/YYYY HH:mm') }}
                    </div>
                  </td>
                  <td>
                    <div v-if="item.bibir_kemaluan" class="small">
                      <strong>Bibir:</strong> {{ truncate(item.bibir_kemaluan, 30) }}
                    </div>
                    <div v-if="item.serambi_kemaluan" class="small">
                      <strong>Serambi:</strong> {{ truncate(item.serambi_kemaluan, 30) }}
                    </div>
                    <div v-if="item.selaput_dara" class="small">
                      <strong>Selaput Dara:</strong> {{ truncate(item.selaput_dara, 30) }}
                    </div>
                    <div v-if="item.liang_senggama" class="small">
                      <strong>Liang Senggama:</strong> {{ truncate(item.liang_senggama, 30) }}
                    </div>
                    <div v-if="item.perineum" class="small">
                      <strong>Perineum:</strong> {{ truncate(item.perineum, 30) }}
                    </div>
                    <div v-if="item.anus" class="small">
                      <strong>Anus:</strong> {{ truncate(item.anus, 30) }}
                    </div>
                    <div v-if="item.bagian_tubuh_lain" class="small">
                      <strong>Lainnya:</strong> {{ truncate(item.bagian_tubuh_lain, 30) }}
                    </div>
                    <div v-if="!item.bibir_kemaluan && !item.serambi_kemaluan && !item.selaput_dara && !item.liang_senggama && !item.perineum && !item.anus && !item.bagian_tubuh_lain" class="text-muted">
                      -
                    </div>
                  </td>
                  <td>
                    <div v-if="item.tes_kehamilan" class="small">
                      <strong>Tes Kehamilan:</strong> {{ truncate(item.tes_kehamilan, 30) }}
                    </div>
                    <div v-if="item.tinggi_fundus_uteri" class="small">
                      <strong>Fundus Uteri:</strong> {{ truncate(item.tinggi_fundus_uteri, 30) }}
                    </div>
                    <div v-if="item.rawat_luka" class="mt-1">
                      <span class="badge badge-success">Rawat Luka</span>
                    </div>
                    <div v-if="item.rawat_inap" class="mt-1">
                      <span class="badge badge-info">Rawat Inap</span>
                    </div>
                    <div v-if="item.penunjang_lain" class="small mt-1">
                      <strong>Penunjang:</strong> {{ truncate(item.penunjang_lain, 30) }}
                    </div>
                    <div v-if="!item.tes_kehamilan && !item.tinggi_fundus_uteri && !item.rawat_luka && !item.rawat_inap && !item.penunjang_lain" class="text-muted">
                      -
                    </div>
                  </td>
                  <td>
                    <div v-if="item.kesimpulan_pertama" class="small">
                      {{ truncate(item.kesimpulan_pertama, 50) }}
                    </div>
                    <div v-if="item.jumlah_kesimpulan > 1" class="mt-1">
                      <span class="badge badge-light-primary">+{{ item.jumlah_kesimpulan - 1 }} kesimpulan lain</span>
                    </div>
                    <div v-else class="text-muted">-</div>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-info mr-1" @click="viewDetail(item)" title="Lihat Detail">
                      <i class="ri-eye-line"></i>
                    </button>
                    <button class="btn btn-sm btn-warning mr-1" @click="editRecord(item)" title="Edit">
                      <i class="ri-edit-line"></i>
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

      <!-- Detail View -->
      <div v-if="isViewingDetail">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h6 class="font-weight-bolder text-dark">Detail Visum</h6>
          <button class="btn btn-secondary btn-sm" @click="closeDetail">
            <i class="ri-arrow-left-line"></i> Kembali
          </button>
        </div>

        <!-- Section 1: Pemeriksaan -->
        <div class="card card-custom mb-5" v-if="selectedVisum">
          <!-- <div class="card-header">
            <h5 class="mb-0 font-weight-bolder">Pemeriksaan</h5>
          </div> -->
          <div class="card-body">
            <!-- Header section -->
            <div style="background-color: #c4c4c4;padding: .7rem;margin-bottom: 1rem;">
              <h5 class="mb-0 font-weight-bolder">Pemeriksaan</h5>
              <div class="d-flex justify-content-between">
                <small class="text-black">Nomor Urut: <span class="font-weight-bolder">{{ selectedVisum.nomor_urut }}</span></small>
                <small class="text-black">Tanggal Pemeriksaan: <span class="font-weight-bolder">{{ $moment(selectedVisum.tanggal_pemeriksaan).format('DD/MM/YYYY HH:mm') }}</span></small>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3" v-if="selectedVisum.bibir_kemaluan">
                <label class="font-weight-bold">Bibir Kemaluan</label>
                <p class="text-muted mb-0">{{ selectedVisum.bibir_kemaluan }}</p>
              </div>
              <div class="col-md-6 mb-3" v-if="selectedVisum.serambi_kemaluan">
                <label class="font-weight-bold">Serambi Kemaluan</label>
                <p class="text-muted mb-0">{{ selectedVisum.serambi_kemaluan }}</p>
              </div>
              <div class="col-md-6 mb-3" v-if="selectedVisum.selaput_dara">
                <label class="font-weight-bold">Selaput Dara</label>
                <p class="text-muted mb-0">{{ selectedVisum.selaput_dara }}</p>
              </div>
              <div class="col-md-6 mb-3" v-if="selectedVisum.liang_senggama">
                <label class="font-weight-bold">Liang Senggama</label>
                <p class="text-muted mb-0">{{ selectedVisum.liang_senggama }}</p>
              </div>
              <div class="col-md-6 mb-3" v-if="selectedVisum.perineum">
                <label class="font-weight-bold">Perineum</label>
                <p class="text-muted mb-0">{{ selectedVisum.perineum }}</p>
              </div>
              <div class="col-md-6 mb-3" v-if="selectedVisum.anus">
                <label class="font-weight-bold">Anus</label>
                <p class="text-muted mb-0">{{ selectedVisum.anus }}</p>
              </div>
              <div class="col-md-12 mb-3" v-if="selectedVisum.bagian_tubuh_lain">
                <label class="font-weight-bold">Bagian Tubuh Lain</label>
                <p class="text-muted mb-0">{{ selectedVisum.bagian_tubuh_lain }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Tindakan Medis -->
        <div class="card card-custom mb-5" v-if="selectedVisum">
          <!-- <div class="card-header">
            <h5 class="mb-0 font-weight-bolder">Tindakan Medis</h5>
          </div> -->
          <div class="card-body">
            <div style="background-color: #c4c4c4;padding: .7rem;margin-bottom: 1rem;">
              <h5 class="mb-0 font-weight-bolder">Tindakan Medis</h5>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3" v-if="selectedVisum.tes_kehamilan">
                <label class="font-weight-bold">Tes Kehamilan</label>
                <p class="text-muted mb-0">{{ selectedVisum.tes_kehamilan }}</p>
              </div>
              <div class="col-md-6 mb-3" v-if="selectedVisum.tinggi_fundus_uteri">
                <label class="font-weight-bold">Tinggi Fundus Uteri</label>
                <p class="text-muted mb-0">{{ selectedVisum.tinggi_fundus_uteri }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="font-weight-bold">Rawat Luka</label>
                <p class="text-muted mb-0">
                  <span v-if="selectedVisum.rawat_luka" class="badge badge-success">Ya</span>
                  <span v-else class="badge badge-secondary">Tidak</span>
                </p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="font-weight-bold">Rawat Inap</label>
                <p class="text-muted mb-0">
                  <span v-if="selectedVisum.rawat_inap" class="badge badge-success">Ya</span>
                  <span v-else class="badge badge-secondary">Tidak</span>
                </p>
              </div>
              <div class="col-md-12 mb-3" v-if="selectedVisum.penunjang_lain">
                <label class="font-weight-bold">Penunjang Lain</label>
                <p class="text-muted mb-0">{{ selectedVisum.penunjang_lain }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Kesimpulan -->
        <div class="card card-custom" v-if="selectedVisum && selectedVisum.kesimpulan_list">
          <div class="card-body">
            <div style="background-color: #c4c4c4;padding: .7rem;margin-bottom: 1rem;">
              <h5 class="mb-0 font-weight-bolder">Kesimpulan ({{ selectedVisum.kesimpulan_list.length }})</h5>
            </div>
            <div v-if="selectedVisum.kesimpulan_list.length === 0" class="text-center py-5">
              <p class="text-muted">Tidak ada kesimpulan</p>
            </div>
            <div v-else>
              <div
                v-for="(kesimpulan, index) in selectedVisum.kesimpulan_list"
                :key="kesimpulan.id"
                class="mb-4 pb-3"
                :style="index < selectedVisum.kesimpulan_list.length - 1 ? 'border-bottom: 1px solid #eee;' : ''"
              >
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="font-weight-bolder text-dark">Kesimpulan {{ index + 1 }}</h6>
                  <small class="text-muted">
                    {{ $moment(kesimpulan.createdAt).format('DD/MM/YYYY HH:mm') }}
                  </small>
                </div>
                <p class="text-dark mb-0">{{ kesimpulan.kesimpulan }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form View (Create/Edit) -->
      <div v-if="isEditing">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h6 class="font-weight-bolder text-dark">{{ formData.id ? 'Edit Visum' : 'Buat Visum Baru' }}</h6>
          <button class="btn btn-secondary btn-sm" @click="cancelEdit">
            <i class="ri-close-line"></i> Batal
          </button>
        </div>

        <!-- Section 1: Pemeriksaan -->
        <div class="card card-custom mb-5">
          <!-- <div class="card-header">
            <h5 class="mb-0 font-weight-bolder">Pemeriksaan</h5>
          </div> -->
          <div class="card-body">
            <!-- Header section -->
            <div style="background-color: #c4c4c4;padding: .7rem;margin-bottom: 1rem;">
              <h5 class="mb-0 font-weight-bolder">Pemeriksaan</h5>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Tanggal Pemeriksaan <span class="text-danger">*</span></label>
                  <input
                    v-model="formData.tanggal_pemeriksaan"
                    type="datetime-local"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Nomor Urut</label>
                  <input
                    :value="formData.nomor_urut"
                    type="text"
                    class="form-control"
                    disabled
                    placeholder="Otomatis"
                  />
                  <small class="text-muted">Nomor urut dihasilkan otomatis (0001, 0002, ...)</small>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Bibir Kemaluan</label>
                  <textarea
                    v-model="formData.bibir_kemaluan"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan bibir kemaluan..."
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Serambi Kemaluan</label>
                  <textarea
                    v-model="formData.serambi_kemaluan"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan serambi kemaluan..."
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Selaput Dara</label>
                  <textarea
                    v-model="formData.selaput_dara"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan selaput dara..."
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Liang Senggama</label>
                  <textarea
                    v-model="formData.liang_senggama"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan liang senggama..."
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Perineum</label>
                  <textarea
                    v-model="formData.perineum"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan perineum..."
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Anus</label>
                  <textarea
                    v-model="formData.anus"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan anus..."
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="font-weight-bold">Bagian Tubuh Lain</label>
                  <textarea
                    v-model="formData.bagian_tubuh_lain"
                    class="form-control"
                    rows="2"
                    placeholder="Hasil pemeriksaan bagian tubuh lain..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Tindakan Medis -->
        <div class="card card-custom mb-5">
          <!-- <div class="card-header">
            <h5 class="mb-0 font-weight-bolder">Tindakan Medis</h5>
          </div> -->
          <div class="card-body">
            <div style="background-color: #c4c4c4;padding: .7rem;margin-bottom: 1rem;">
              <h5 class="mb-0 font-weight-bolder">Tindakan Medis</h5>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Tes Kehamilan</label>
                  <input
                    v-model="formData.tes_kehamilan"
                    type="text"
                    class="form-control"
                    placeholder="Hasil tes kehamilan..."
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Tinggi Fundus Uteri</label>
                  <input
                    v-model="formData.tinggi_fundus_uteri"
                    type="text"
                    class="form-control"
                    placeholder="Tinggi fundus uteri..."
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="font-weight-bold">Rawat Luka</label>
                  <div class="checkbox mt-4">
                    <label class="checkbox checkbox-single">
                      <input type="checkbox" v-model="formData.rawat_luka" />
                      <span> </span> &ensp; Ya
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="font-weight-bold">Rawat Inap</label>
                  <div class="checkbox mt-4">
                    <label class="checkbox checkbox-single">
                      <input type="checkbox" v-model="formData.rawat_inap" />
                      <span></span> &ensp; Ya
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">Penunjang Lain</label>
                  <input
                    v-model="formData.penunjang_lain"
                    type="text"
                    class="form-control"
                    placeholder="Penunjang lain..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Kesimpulan (Multiple) -->
        <div class="card card-custom mb-5">
          <!-- <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0 font-weight-bolder">Kesimpulan</h5>
              <button class="btn btn-primary btn-sm" @click="addKesimpulan">
                <i class="ri-add-line"></i> Tambah Kesimpulan
              </button>
            </div>
          </div> -->
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center" style="background-color: #c4c4c4;padding: .7rem;margin-bottom: 1rem;">
              <h5 class="mb-0 font-weight-bolder">Kesimpulan</h5>
              <button class="btn btn-primary btn-sm" @click="addKesimpulan">
                <i class="ri-add-line"></i> Tambah Kesimpulan
              </button>
            </div>
            <div v-if="formData.kesimpulan.length === 0" class="text-center py-5">
              <p class="text-muted">Belum ada kesimpulan. Klik "Tambah Kesimpulan" untuk menambahkan.</p>
            </div>
            <div v-else>
              <div v-for="(kesimpulan, index) in formData.kesimpulan" :key="index" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <label class="font-weight-bold">Kesimpulan {{ index + 1 }}</label>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="removeKesimpulan(index)"
                    v-if="formData.kesimpulan.length > 1"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
                <textarea
                  v-model="formData.kesimpulan[index].kesimpulan"
                  class="form-control"
                  rows="3"
                  placeholder="Masukkan kesimpulan..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary mr-2" @click="cancelEdit">
            <i class="ri-close-line"></i> Batal
          </button>
          <button class="btn btn-primary" @click="submitForm" :disabled="loading">
            <i class="ri-save-line" v-if="!loading"></i>
            <span class="spinner-border spinner-border-sm" v-if="loading"></span>
            {{ formData.id ? 'Simpan Perubahan' : 'Buat Visum' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisumForm',
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
      isViewingDetail: false,
      visumList: [],
      selectedVisum: null,
      formData: {
        id: null,
        registrasi_id: this.registrasiId,
        tanggal_pemeriksaan: '',
        nomor_urut: '',
        bibir_kemaluan: '',
        serambi_kemaluan: '',
        selaput_dara: '',
        liang_senggama: '',
        perineum: '',
        anus: '',
        bagian_tubuh_lain: '',
        tes_kehamilan: '',
        tinggi_fundus_uteri: '',
        rawat_luka: false,
        rawat_inap: false,
        penunjang_lain: '',
        kesimpulan: []
      }
    }
  },
  watch: {
    registrasiId(newVal) {
      if (newVal) {
        this.loadVisumData()
      }
    }
  },
  mounted() {
    this.loadVisumData()
  },
  methods: {
    truncate(text, length) {
      if (!text) return ''
      if (text.length <= length) return text
      return text.substring(0, length) + '...'
    },

    async loadVisumData() {
      if (!this.registrasiId) return

      this.loading = true
      try {
        const response = await this.$_api.post('visum/list', {
          registrasi_id: this.registrasiId,
          halaman: 1,
          jumlah: 999
        })

        if (response.data) {
          this.visumList = response.data
        } else {
          this.visumList = []
        }
      } catch (error) {
        console.error('Error loading visum data:', error)
        let message = 'Gagal memuat data visum'
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
      this.isViewingDetail = false
      this.resetForm()
    },

    async viewDetail(item) {
      this.loading = true
      try {
        const response = await this.$_api.post('visum/detailsById', {
          id: item.id
        })

        if (response.data) {
          this.selectedVisum = response.data
          this.isViewingDetail = true
          this.isEditing = false
        }
      } catch (error) {
        console.error('Error loading visum details:', error)
        let message = 'Gagal memuat detail visum'
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

    closeDetail() {
      this.isViewingDetail = false
      this.selectedVisum = null
    },

    async editRecord(item) {
      this.loading = true
      try {
        const response = await this.$_api.post('visum/detailsById', {
          id: item.id
        })

        if (response.data) {
          const visum = response.data
          this.formData = {
            id: visum.id,
            registrasi_id: visum.registrasi_id,
            tanggal_pemeriksaan: visum.tanggal_pemeriksaan || '',
            nomor_urut: visum.nomor_urut || '',
            bibir_kemaluan: visum.bibir_kemaluan || '',
            serambi_kemaluan: visum.serambi_kemaluan || '',
            selaput_dara: visum.selaput_dara || '',
            liang_senggama: visum.liang_senggama || '',
            perineum: visum.perineum || '',
            anus: visum.anus || '',
            bagian_tubuh_lain: visum.bagian_tubuh_lain || '',
            tes_kehamilan: visum.tes_kehamilan || '',
            tinggi_fundus_uteri: visum.tinggi_fundus_uteri || '',
            rawat_luka: visum.rawat_luka || false,
            rawat_inap: visum.rawat_inap || false,
            penunjang_lain: visum.penunjang_lain || '',
            kesimpulan: visum.kesimpulan_list ? visum.kesimpulan_list.map(k => ({
              id: k.id,
              kesimpulan: k.kesimpulan
            })) : []
          }
          this.isEditing = true
          this.isViewingDetail = false
        }
      } catch (error) {
        console.error('Error loading visum for edit:', error)
        let message = 'Gagal memuat data visum untuk edit'
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

    addKesimpulan() {
      this.formData.kesimpulan.push({
        id: null,
        kesimpulan: ''
      })
    },

    removeKesimpulan(index) {
      this.formData.kesimpulan.splice(index, 1)
    },

    async submitForm() {
      this.loading = true
      try {
        let response
        if (this.formData.id) {
          // Update existing
          response = await this.$_api.post('visum/update', {
            id: this.formData.id,
            registrasi_id: this.formData.registrasi_id,
            tanggal_pemeriksaan: this.formData.tanggal_pemeriksaan || null,
            bibir_kemaluan: this.formData.bibir_kemaluan || null,
            serambi_kemaluan: this.formData.serambi_kemaluan || null,
            selaput_dara: this.formData.selaput_dara || null,
            liang_senggama: this.formData.liang_senggama || null,
            perineum: this.formData.perineum || null,
            anus: this.formData.anus || null,
            bagian_tubuh_lain: this.formData.bagian_tubuh_lain || null,
            tes_kehamilan: this.formData.tes_kehamilan || null,
            tinggi_fundus_uteri: this.formData.tinggi_fundus_uteri || null,
            rawat_luka: this.formData.rawat_luka,
            rawat_inap: this.formData.rawat_inap,
            penunjang_lain: this.formData.penunjang_lain || null,
            kesimpulan: this.formData.kesimpulan
          })
        } else {
          // Create new
          response = await this.$_api.post('visum/register', {
            registrasi_id: this.registrasiId,
            tanggal_pemeriksaan: this.formData.tanggal_pemeriksaan || null,
            bibir_kemaluan: this.formData.bibir_kemaluan || null,
            serambi_kemaluan: this.formData.serambi_kemaluan || null,
            selaput_dara: this.formData.selaput_dara || null,
            liang_senggama: this.formData.liang_senggama || null,
            perineum: this.formData.perineum || null,
            anus: this.formData.anus || null,
            bagian_tubuh_lain: this.formData.bagian_tubuh_lain || null,
            tes_kehamilan: this.formData.tes_kehamilan || null,
            tinggi_fundus_uteri: this.formData.tinggi_fundus_uteri || null,
            rawat_luka: this.formData.rawat_luka,
            rawat_inap: this.formData.rawat_inap,
            penunjang_lain: this.formData.penunjang_lain || null,
            kesimpulan: this.formData.kesimpulan.map(k => k.kesimpulan)
          })
        }

        this.$_alert.success({}, response.message || 'Data visum berhasil disimpan')
        await this.loadVisumData()
        this.isEditing = false
        this.selectedVisum = null
      } catch (error) {
        console.error('Error saving visum data:', error)
        let message = 'Gagal menyimpan data visum'
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
        { title: 'Hapus Data Visum', text: 'Apakah Anda yakin ingin menghapus data visum ini?' },
        async () => {
          await this.deleteVisum(item)
        }
      )
    },

    async deleteVisum(item) {
      this.loading = true
      try {
        await this.$_api.post('visum/delete', {
          id: item.id
        })

        this.$_alert.success({}, 'Data visum berhasil dihapus')
        await this.loadVisumData()
      } catch (error) {
        console.error('Error deleting visum data:', error)
        let message = 'Gagal menghapus data visum'
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
        tanggal_pemeriksaan: '',
        nomor_urut: '',
        bibir_kemaluan: '',
        serambi_kemaluan: '',
        selaput_dara: '',
        liang_senggama: '',
        perineum: '',
        anus: '',
        bagian_tubuh_lain: '',
        tes_kehamilan: '',
        tinggi_fundus_uteri: '',
        rawat_luka: false,
        rawat_inap: false,
        penunjang_lain: '',
        kesimpulan: [{ id: null, kesimpulan: '' }]
      }
    }
  }
}
</script>

<style scoped>
.checkbox-single {
  margin: 0;
}
</style>
