<template>
  <div>
    <!-- Trigger Button -->
    <b-button variant="primary" @click="openModal"> <i class="ri-list-settings-line"></i> Aturan Pakai </b-button>

    <!-- Main Modal -->
    <b-modal id="modal-aturan-pakai" size="lg" title="Master Aturan Pakai" header-bg-variant="primary" header-text-variant="light" hide-footer @show="loadData" @hidden="resetAll">
      <!-- Alert -->
      <b-alert :show="alert.show" :variant="alert.variant" dismissible @dismissed="alert.show = false" class="mb-3">
        {{ alert.msg }}
      </b-alert>

      <!-- ─── LIST VIEW ─── -->
      <template v-if="view === 'list'">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <b-button variant="success" size="sm" @click="view = 'create'"> <i class="ri-add-circle-line"></i> Tambah </b-button>
          <b-form-input v-model="search" placeholder="Cari nama aturan pakai..." size="sm" style="max-width: 250px" @input="onSearch" />
        </div>

        <b-table :items="items" :fields="fields" :busy="loading" responsive bordered striped hover small show-empty empty-text="Tidak ada data">
          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner small class="mr-2" />
              <strong>Memuat data...</strong>
            </div>
          </template>
          <template #cell(no)="row">
            {{ (currentPage - 1) * perPage + row.index + 1 }}
          </template>
          <template #cell(actions)="row">
            <b-button size="sm" variant="warning" class="mr-1" v-b-tooltip.hover="'Edit'" @click="startEdit(row.item)">
              <i class="ri-edit-2-line"></i>
            </b-button>
            <b-button size="sm" variant="danger" v-b-tooltip.hover="'Hapus'" @click="startDelete(row.item)">
              <i class="ri-delete-bin-2-line"></i>
            </b-button>
          </template>
        </b-table>

        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">Total: {{ totalRows }} data</small>
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="mb-0" @change="onPageChange" />
        </div>
      </template>

      <!-- ─── CREATE VIEW ─── -->
      <template v-else-if="view === 'create'">
        <h6 class="mb-3 font-weight-bold">Tambah Aturan Pakai</h6>
        <b-form @submit.prevent="submitCreate">
          <b-form-group label-cols-md="3">
            <template v-slot:label> Nama <span class="text-danger">*</span> </template>
            <b-form-input v-model="form.name" type="text" placeholder="Masukkan nama aturan pakai" :state="formSubmitted ? (form.name.trim() !== '' ? true : false) : null" trim />
            <b-form-invalid-feedback>Nama wajib diisi</b-form-invalid-feedback>
          </b-form-group>

          <div class="d-flex justify-content-end mt-4">
            <b-button variant="secondary" class="mr-2" @click="view = 'list'"> <i class="ri-arrow-left-line"></i> Kembali </b-button>
            <b-button type="submit" variant="primary" :disabled="busy">
              <b-spinner small v-if="busy" class="mr-1" />
              {{ busy ? "Menyimpan..." : "Simpan" }}
            </b-button>
          </div>
        </b-form>
      </template>

      <!-- ─── EDIT VIEW ─── -->
      <template v-else-if="view === 'edit'">
        <h6 class="mb-3 font-weight-bold">Edit Aturan Pakai</h6>
        <b-form @submit.prevent="submitEdit">
          <b-form-group label-cols-md="3">
            <template v-slot:label> Nama <span class="text-danger">*</span> </template>
            <b-form-input v-model="form.name" type="text" placeholder="Masukkan nama aturan pakai" :state="formSubmitted ? (form.name.trim() !== '' ? true : false) : null" trim />
            <b-form-invalid-feedback>Nama wajib diisi</b-form-invalid-feedback>
          </b-form-group>

          <div class="d-flex justify-content-end mt-4">
            <b-button variant="secondary" class="mr-2" @click="view = 'list'"> <i class="ri-arrow-left-line"></i> Kembali </b-button>
            <b-button type="submit" variant="primary" :disabled="busy">
              <b-spinner small v-if="busy" class="mr-1" />
              {{ busy ? "Menyimpan..." : "Update" }}
            </b-button>
          </div>
        </b-form>
      </template>

      <!-- ─── DELETE CONFIRMATION VIEW ─── -->
      <template v-else-if="view === 'delete'">
        <div class="text-center py-3">
          <i class="ri-error-warning-line text-danger" style="font-size: 3rem"></i>
          <h5 class="mt-3">Konfirmasi Hapus</h5>
          <p class="text-muted">
            Apakah Anda yakin ingin menghapus aturan pakai
            <strong>{{ selectedItem && selectedItem.name }}</strong
            >? <br />Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="d-flex justify-content-center mt-4">
            <b-button variant="secondary" class="mr-2" @click="view = 'list'"> <i class="ri-close-line"></i> Batal </b-button>
            <b-button variant="danger" :disabled="busy" @click="submitDelete">
              <b-spinner small v-if="busy" class="mr-1" />
              {{ busy ? "Menghapus..." : "Hapus" }}
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ms-aturan-pakai",
  data() {
    return {
      view: "list", // 'list' | 'create' | 'edit' | 'delete'
      loading: false,
      busy: false,
      formSubmitted: false,
      search: "",
      searchTimer: null,
      items: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      selectedItem: null,
      form: {
        id: null,
        name: "",
      },
      alert: {
        show: false,
        variant: "success",
        msg: "",
      },
      fields: [
        { key: "no", label: "No", class: "text-center", thStyle: { width: "60px" } },
        { key: "name", label: "Nama", sortable: true },
        { key: "actions", label: "Aksi", class: "text-center", thStyle: { width: "110px" } },
      ],
    };
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-aturan-pakai");
    },
    async loadData() {
      this.loading = true;
      try {
        const res = await this.$_api.post("msAturanPakai/list", {
          halaman: this.currentPage,
          jumlah: this.perPage,
          name: this.search || undefined,
        });
        this.items = res.data || [];
        this.totalRows = parseInt(res.count) || 0;
      } catch (err) {
        this.showAlert("danger", "Gagal memuat data");
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    onSearch() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.currentPage = 1;
        this.loadData();
      }, 400);
    },
    onPageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    startEdit(item) {
      this.selectedItem = item;
      this.form = { id: item.id, name: item.name };
      this.formSubmitted = false;
      this.view = "edit";
    },
    startDelete(item) {
      this.selectedItem = item;
      this.view = "delete";
    },
    async submitCreate() {
      this.formSubmitted = true;
      if (!this.form.name.trim()) return;
      this.busy = true;
      try {
        const res = await this.$_api.post("msAturanPakai/register", { name: this.form.name });
        if (res.status === 204) {
          this.showAlert("warning", "Data dengan nama tersebut sudah ada");
        } else {
          this.showAlert("success", "Data berhasil ditambahkan");
          this.view = "list";
          await this.loadData();
        }
      } catch (err) {
        this.showAlert("danger", "Gagal menyimpan data");
        console.error(err);
      } finally {
        this.busy = false;
      }
    },
    async submitEdit() {
      this.formSubmitted = true;
      if (!this.form.name.trim()) return;
      this.busy = true;
      try {
        const res = await this.$_api.post("msAturanPakai/update", { id: this.form.id, name: this.form.name });
        if (res.status === 204) {
          this.showAlert("warning", "Data dengan nama tersebut sudah ada");
        } else {
          this.showAlert("success", "Data berhasil diperbarui");
          this.view = "list";
          await this.loadData();
        }
      } catch (err) {
        this.showAlert("danger", "Gagal memperbarui data");
        console.error(err);
      } finally {
        this.busy = false;
      }
    },
    async submitDelete() {
      this.busy = true;
      try {
        await this.$_api.post("msAturanPakai/delete", { id: this.selectedItem.id });
        this.showAlert("success", "Data berhasil dihapus");
        this.view = "list";
        if (this.items.length === 1 && this.currentPage > 1) this.currentPage--;
        await this.loadData();
      } catch (err) {
        this.showAlert("danger", "Gagal menghapus data");
        console.error(err);
      } finally {
        this.busy = false;
      }
    },
    showAlert(variant, msg) {
      this.alert = { show: true, variant, msg };
    },
    resetAll() {
      this.view = "list";
      this.form = { id: null, name: "" };
      this.formSubmitted = false;
      this.search = "";
      this.currentPage = 1;
      this.selectedItem = null;
      this.alert = { show: false, variant: "success", msg: "" };
    },
  },
};
</script>
