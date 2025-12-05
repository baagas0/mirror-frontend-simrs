<template>
  <div class="container-fluid py-3">
    <h4 class="mb-4 fw-bold">
      🏥 Monitoring Bed Rawat Inap
    </h4>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Loading data...</p>
    </div>

    <!-- Bed list -->
    <div v-else class="row g-3">
      <div
        v-for="(item, index) in data"
        :key="item.id + index"
        class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3"
      >
        <div
          class="card shadow-sm border-0 rounded-3 h-100"
          :class="{
            'border-success': item.status_monitoring === 1,
            'border-danger': item.status_monitoring === 0
          }"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title fw-semibold mb-0">
                {{ item.nama_bed }}
              </h5>
              <span
                class="badge"
                :class="{
                  'bg-success': item.status_monitoring === 1,
                  'bg-danger': item.status_monitoring === 0
                }"
              >
                {{ item.status_monitoring === 1 ? 'Terisi' : 'Kosong' }}
              </span>
            </div>

            <p class="mb-1">
              <strong>Ruang:</strong> {{ item.nama_ruang }}
            </p>
            <p class="mb-1">
              <strong>Kamar:</strong> {{ item.nama_kamar }}
            </p>
            <p class="mb-1">
              <strong>Kelas:</strong> {{ item.nama_kelas_kamar }}
            </p>

            <hr />

            <p class="mb-1">
              <strong>Pasien:</strong> {{ item.nama_lengkap || '-' }}
            </p>
            <p class="mb-1">
              <strong>No. RM:</strong> {{ item.no_rm }}
            </p>
            <p class="mb-1">
              <strong>No. Identitas:</strong> {{ item.no_identitas_registrasi }}
            </p>
            <p class="mb-1">
              <strong>No. HP:</strong> {{ item.no_hp_registrasi }}
            </p>

            <div class="text-muted small mt-2">
              <i class="bi bi-calendar2"></i>
              Masuk: {{ formatDate(item.tgl_registrasi) }}
            </div>
            <button class="btn btn-sm btn-outline-primary mt-3" @click="viewDetail(item)">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detail -->
    <b-modal
      id="detailModal"
      ref="detailModal"
      size="lg"
      centered
      :title="`Detail Bed - ${selected.nama_bed}`"
      hide-footer
      @hidden="hideModal"
    >
      <div v-if="selected">
        <b-table-simple bordered striped hover responsive>
          <b-tbody>
            <b-tr>
              <b-td class="table-secondary font-weight-bold" style="width: 30%">Nama Pasien</b-td>
              <b-td>{{ selected.nama_lengkap || '-' }}</b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">No. RM</b-td>
              <b-td>{{ selected.no_rm || '-' }}</b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">Ruang</b-td>
              <b-td>{{ selected.nama_ruang || '-' }}</b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">Kamar</b-td>
              <b-td>{{ selected.nama_kamar || '-' }}</b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">Kelas</b-td>
              <b-td>{{ selected.nama_kelas_kamar || '-' }}</b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">Tanggal Registrasi</b-td>
              <b-td>{{ formatDate(selected.tgl_registrasi) }}</b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">Status</b-td>
              <b-td>
                <b-badge :variant="selected.status_monitoring === 1 ? 'success' : 'danger'">
                  {{ selected.status_monitoring === 1 ? 'Terisi' : 'Kosong' }}
                </b-badge>
              </b-td>
            </b-tr>
            <b-tr>
              <b-td class="table-secondary font-weight-bold">Alamat</b-td>
              <b-td>{{ selected.alamat_sekarang || '-' }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
      <div slot="modal-footer" class="w-100">
        <b-button variant="secondary" @click="hideModal">Close</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'crud-bed_monitoring',
  data() {
    return {
      data: [],
      loading: true,
      selected: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const res = await this.$_api.post('/msBed/monitoring');
        this.data = res.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    },
    viewDetail(item) {
      this.selected = item;
      this.$refs.detailModal.show();
    },
    hideModal() {
      this.$refs.detailModal.hide();
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
}

.mb-3 {
  margin-bottom: 0.75rem
}
</style>
