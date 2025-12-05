<template>
  <div class="w-100">
    <div class="card shadow-sm border-0">
      <div class="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Daftar Permintaan Alat Steril</h5>
        <div>
          <!-- <b-button variant="primary" size="sm" @click="refreshData">
            <i class="fas fa-sync-alt mr-1"></i> Refresh
          </b-button>
          <b-button variant="success" size="sm" class="ml-2" @click="showAddModal">
            <i class="fas fa-plus mr-1"></i> Tambah Baru
          </b-button> -->
        </div>
      </div>
      <div class="card-body">
        <!-- Filter Section -->
        <div class="mb-3">
          <b-row>
            <b-col md="3">
              <b-form-group label="Kode Permintaan" label-for="filter-kode">
                <b-form-input id="filter-kode" v-model="filters.kode_permintaan" placeholder="Cari kode..." @input="refreshData"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Unit" label-for="filter-unit">
                <b-form-input id="filter-unit" v-model="filters.nama_unit" placeholder="Cari unit..." @input="refreshData"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Status" label-for="filter-status">
                <b-form-select id="filter-status" v-model="filters.status_permintaan" :options="statusOptions" @change="refreshData"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        
        <!-- Table -->
        <b-table
          striped
          bordered
          hover
          responsive
          :items="items"
          :fields="fields"
          :busy="loading"
          show-empty
          empty-text="Tidak ada data Permintaan Alat Steril"
          class="mb-0"
        >
          <template #cell(no)="data">
            {{ ((currentPage - 1) * perPage) + data.index + 1 }}
          </template>
          
          <template #cell(tanggal_permintaan)="data">
            {{ formatDate(data.item.tanggal_permintaan) }}
          </template>
          
          <template #cell(status_permintaan)="data">
            <b-badge :variant="getStatusVariant(data.item.status_permintaan)" class="mr-2">
              {{ getStatusText(data.item.status_permintaan) }}
            </b-badge>
          </template>
          <template #cell(actions)="data">
            <div class="d-flex align-items-center justify-center">
              <!-- When status is "Menunggu" -->
              <template v-if="data.item.status_permintaan === 1">
                <b-button
                  size="sm"
                  variant="outline-danger"
                  class="mr-1"
                  @click="changeStatus(data.item, 0)"
                >
                  <i class="ri-play-line"></i> Ditolak
                </b-button>
                <b-button
                  size="sm"
                  variant="outline-primary"
                  @click="changeStatus(data.item, 2)"
                >
                  <i class="ri-play-line"></i> Diproses
                </b-button>
              </template>

              <!-- When status is "Diproses" -->
              <template v-else-if="data.item.status_permintaan === 2">
                <b-button
                  size="sm"
                  variant="outline-success"
                  @click="changeStatus(data.item, 9)"
                >
                  <i class="ri-play-line"></i> Selesai
                </b-button>
              </template>

              <!-- When no change is allowed -->
              <template v-else>
                <span class="text-muted small">
                  <i class="ri-play-line"></i> Status tidak dapat diubah
                </span>
              </template>
            </div>

          </template>
          
          <template #cell(jumlah_item)="data">
            <span class="badge badge-info">{{ data.item.jumlah_item || 0 }} Item</span>
          </template>
          
          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
        <!-- Pagination -->
        <div class="mt-3">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
            @change="handlePageChange"
          ></b-pagination>
        </div>
      </div>
    </div>
  
    <!-- Detail Modal -->
    <b-modal
      id="modal-detail"
      ref="detailModal"
      size="lg"
      centered
      title="Detail Item Alat Steril"
      hide-footer
      header-bg-variant="light"
      header-border-variant="light"
    >
      <template #modal-title>
        <div class="d-flex align-items-center">
          <i class="fas fa-clipboard-list text-primary mr-2"></i>
          <span>Detail Item Alat Steril</span>
        </div>
      </template>
      
      <div v-if="selectedItem">
        <!-- Status Badge -->
        <div class="mb-4 text-center">
          <span class="d-inline-block px-4 py-2 rounded-pill" 
                :class="`bg-${getStatusVariant(selectedItem.status_permintaan)} bg-opacity-10 text-${getStatusVariant(selectedItem.status_permintaan)}`">
            <i :class="`fas fa-${getStatusIcon(selectedItem.status_permintaan)} mr-2`"></i>
            {{ getStatusText(selectedItem.status_permintaan) }}
          </span>
        </div>
        
        <!-- Item details in cards -->
        <b-row>
          <b-col md="6" sm="12" class="mb-3">
            <div class="border rounded p-3 h-100 bg-light bg-opacity-50">
              <h6 class="text-primary mb-3"><i class="fas fa-info-circle mr-2"></i>Informasi Barang</h6>
              <p class="mb-2"><strong>Nama:</strong> {{ selectedItem.nama_barang }}</p>
              <p class="mb-2"><strong>Kode Produk:</strong> {{ selectedItem.kode_produk }}</p>
              <p class="mb-0"><strong>Komposisi:</strong> {{ selectedItem.komposisi || '-' }}</p>
            </div>
          </b-col>
          
          <b-col md="6" sm="12" class="mb-3">
            <div class="border rounded p-3 h-100 bg-light bg-opacity-50">
              <h6 class="text-success mb-3"><i class="fas fa-tag mr-2"></i>Informasi Harga</h6>
              <p class="mb-2"><strong>Harga Pokok:</strong> Rp {{ formatCurrency(selectedItem.harga_pokok) }}</p>
              <p class="mb-2"><strong>Harga Tertinggi:</strong> Rp {{ formatCurrency(selectedItem.harga_tertinggi) }}</p>
              <p class="mb-0"><strong>Harga Beli Terakhir:</strong> Rp {{ formatCurrency(selectedItem.harga_beli_terahir) }}</p>
            </div>
          </b-col>
        </b-row>
        
        <hr class="my-4">
        
        <!-- Timeline for status changes -->
        <h6 class="text-secondary mb-3"><i class="fas fa-history mr-2"></i>Riwayat Status</h6>
        <div class="status-timeline mb-4">
          <div class="timeline-item" :class="{'active': selectedItem.status_permintaan >= 1}">
            <div class="timeline-icon"><i class="fas fa-clock"></i></div>
            <div class="timeline-content">
              <h6>Menunggu</h6>
              <p class="text-muted small">Item menunggu untuk diproses</p>
            </div>
          </div>
          
          <div class="timeline-item" :class="{'active': selectedItem.status_permintaan >= 2}">
            <div class="timeline-icon"><i class="fas fa-spinner"></i></div>
            <div class="timeline-content">
              <h6>Diproses</h6>
              <p class="text-muted small">Item sedang dalam proses sterilisasi</p>
            </div>
          </div>
          
          <div class="timeline-item" :class="{'active': selectedItem.status_permintaan === 9}">
            <div class="timeline-icon"><i class="fas fa-check-circle"></i></div>
            <div class="timeline-content">
              <h6>Selesai</h6>
              <p class="text-muted small">Proses sterilisasi telah selesai</p>
            </div>
          </div>
          
          <div class="timeline-item reject" :class="{'active': selectedItem.status_permintaan === 0}">
            <div class="timeline-icon"><i class="fas fa-times-circle"></i></div>
            <div class="timeline-content">
              <h6>Ditolak</h6>
              <p class="text-muted small">Permintaan sterilisasi ditolak</p>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="text-right mt-4">
          <!-- Status change buttons based on current status -->
          <template v-if="selectedItem.status_permintaan === 1">
            <b-button variant="danger" size="sm" class="mr-2" @click="changeStatus(selectedItem, 0)">
              <i class="fas fa-times-circle mr-1"></i> Tolak
            </b-button>
            <b-button variant="primary" size="sm" class="mr-2" @click="changeStatus(selectedItem, 2)">
              <i class="fas fa-spinner mr-1"></i> Proses
            </b-button>
          </template>
          
          <template v-if="selectedItem.status_permintaan === 2">
            <b-button variant="success" size="sm" class="mr-2" @click="changeStatus(selectedItem, 9)">
              <i class="fas fa-check-circle mr-1"></i> Selesai
            </b-button>
          </template>
          
          <b-button variant="secondary" size="sm" @click="$refs.detailModal.hide()">
            Tutup
          </b-button>
        </div>
      </div>
      
      <div v-else class="text-center py-4">
        <b-spinner class="mb-2"></b-spinner>
        <p>Memuat data...</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";

moment.locale("id");

export default {
  name: "permintaan-steril-list",
  components: { },
  props: {
    permintaan_steril_id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      items: [],
      selectedItem: null,
      filters: {
        kode_permintaan: '',
        nama_unit: '',
        status_permintaan: null
      },
      fields: [
        { key: 'no', label: 'No', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'nama_barang', label: 'Nama Barang', sortable: true },
        { key: 'kode_produk', label: 'Kode Produk', sortable: true },
        { key: 'status_permintaan', label: 'Status', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'actions', label: 'Aksi', thClass: 'text-center', tdClass: 'text-center' },
      ],
      barangFields: [
        { key: 'no', label: 'No', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'kode_produk', label: 'Kode Produk' },
        { key: 'nama_barang', label: 'Nama Barang' },
        { key: 'komposisi', label: 'Komposisi' },
        { key: 'harga_pokok', label: 'Harga Pokok', formatter: value => `Rp ${this.formatCurrency(value)}` }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      statusOptions: [
        { value: null, text: 'Semua Status' },
        { value: 1, text: 'Menunggu' },
        { value: 2, text: 'Diproses' },
        { value: 9, text: 'Selesai' },
        { value: 0, text: 'Ditolak' }
      ]
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    async refreshData() {
      this.loading = true;
      try {
        const res = await this.$_api.post("/permintaan_steril_list/list", {
          halaman: this.currentPage,
          jumlah: this.perPage,
          permintaan_steril_id: this.permintaan_steril_id,
          ...this.filters
        });
        this.items = res.data;
        this.totalRows = res.count;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$_alert.error("Gagal memuat data");
      } finally {
        this.loading = false;
      }
    },
    
    handlePageChange(page) {
      this.currentPage = page;
      this.refreshData();
    },
    
    async viewDetail(item) {
      this.loading = true;
      try {
        const res = await this.$_api.post("/permintaanSteril/detailsById", {
          id: item.permintaan_steril_id
        });
        this.selectedItem = res.data;
        this.$refs.detailModal.show();
      } catch (error) {
        console.error("Error fetching details:", error);
        this.$_alert.error("Gagal memuat detail");
      } finally {
        this.loading = false;
      }
    },
    
    editItem(item) {
      // TODO: Implement edit functionality
      this.$_alert.info("Fitur edit akan segera tersedia");
    },
    
    deleteItem(item) {
      this.$_alert
        .confirm("Hapus Item", `Anda yakin ingin menghapus barang ${item.nama_barang}?`)
        .then((res) => {
          if (res.isConfirmed) {
            this.$_api
              .post("/permintaanSteril/delete", { 
                id: item.id,
                permintaan_steril_id: item.permintaan_steril_id 
              })
              .then(() => {
                this.$_alert.success("Item berhasil dihapus");
                this.refreshData();
              })
              .catch((err) => {
                console.error(err);
                this.$_alert.error("Gagal menghapus item");
              });
          }
        });
    },
    
    changeStatus(item, newStatus) {
      // Validate status changes according to business rules
      const currentStatus = parseInt(item.status_permintaan);
      const targetStatus = parseInt(newStatus);
      
      // Status flow validation
      let isValidChange = false;
      let errorMessage = '';
      
      if (currentStatus === 1 && (targetStatus === 0 || targetStatus === 2)) {
        isValidChange = true;
      } else if (currentStatus === 2 && targetStatus === 9) {
        isValidChange = true;
      } else {
        isValidChange = false;
        errorMessage = `Status ${this.getStatusText(currentStatus)} tidak dapat diubah menjadi ${this.getStatusText(targetStatus)}`;
      }
      
      if (!isValidChange) {
        this.$_alert.error('Perubahan Status Tidak Valid', errorMessage);
        return;
      }
      
      // Proceed with status change
      const statusText = this.getStatusText(newStatus);
                   
      this.$bvModal.msgBoxConfirm(`Anda akan mengubah status item "${item.nama_barang}" menjadi "${statusText}"?`, {
        title: `Ubah Status ke ${statusText}`,
        headerClass: `bg-${this.getStatusVariant(newStatus)} text-white`,
        okTitle: 'Ya, Ubah Status',
        cancelTitle: 'Batal',
        hideHeaderClose: false,
        centered: true,
        headerTextVariant: 'white',
        okVariant: this.getStatusVariant(newStatus),
        footerClass: 'p-2',
        bodyClass: 'pt-0',
      })
      .then(confirmed => {
        if (confirmed) {
          this.loading = true;
          
          this.$_api
            .post("/permintaan_steril_list/updateStatus", { 
              id: item.permintaan_steril_list_id,
              status_permintaan: newStatus 
            })
            .then(() => {
              // Show toast notification
              this.$bvToast.toast(`Status item "${item.nama_barang}" berhasil diubah menjadi "${statusText}"`, {
                title: 'Status Diperbarui',
                variant: this.getStatusVariant(newStatus),
                solid: true,
                autoHideDelay: 3000
              });
              
              // Refresh data
              this.refreshData();
            })
            .catch((err) => {
              console.error(err);
              this.$_alert.error(`Gagal mengubah status`, err.data.message || 'Terjadi kesalahan sistem');
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    
    showAddModal() {
      // TODO: Implement add new functionality
      this.$_alert.info("Fitur tambah akan segera tersedia");
    },
    
    formatDate(date) {
      if (!date) return "-";
      return moment(date).format("DD MMM YYYY");
    },
    
    formatCurrency(value) {
      if (!value) return "0";
      return new Intl.NumberFormat('id-ID').format(value);
    },
    
    getStatusText(status) {
      switch (parseInt(status)) {
        case 0: return "Ditolak";
        case 1: return "Menunggu";
        case 2: return "Diproses";
        case 9: return "Selesai";
        default: return "Tidak Diketahui";
      }
    },
    
    getStatusVariant(status) {
      switch (parseInt(status)) {
        case 0: return "danger";
        case 1: return "warning";
        case 2: return "primary";
        case 9: return "success";
        default: return "secondary";
      }
    },
    
    getStatusIcon(status) {
      switch (parseInt(status)) {
        case 0: return "times-circle";
        case 1: return "clock";
        case 2: return "spinner";
        case 9: return "check-circle";
        default: return "question-circle";
      }
    },
  },
};
</script>

<style scoped>
/* Card hover effect */
.card {
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Button icon styling */
.btn-icon {
  width: 2.2rem;
  height: 2.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Status badge styling */
.bg-opacity-10 {
  opacity: 0.2;
}

/* Timeline styling */
.status-timeline {
  position: relative;
  padding: 0;
}

.status-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1rem;
  width: 2px;
  background-color: #e9ecef;
  z-index: 1;
}

.timeline-item {
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 1.5rem;
  opacity: 0.6;
}

.timeline-item.active {
  opacity: 1;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #f8f9fa;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.timeline-item.active .timeline-icon {
  background-color: #ffffff;
  border-color: #28a745;
  color: #28a745;
}

.timeline-item.reject.active .timeline-icon {
  border-color: #dc3545;
  color: #dc3545;
}

.timeline-content {
  padding-top: 0.25rem;
}

.timeline-item.active .timeline-content h6 {
  font-weight: 600;
}
</style>
