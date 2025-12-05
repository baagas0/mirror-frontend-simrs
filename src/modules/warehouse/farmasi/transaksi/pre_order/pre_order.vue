<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header">
            <template #header>
              <div class="d-flex justify-content-between align-items-center py-3">
                <div class="d-flex align-items-start flex-column">
                  <h2 class="mb-2 font-weight-bolder text-dark">
                    Pre Order
                  </h2>
                  <div class="d-flex align-items-center">
                    <span class="text-muted font-size-sm">Manajemen Pre Order Farmasi</span>
                    <div class="mx-3">
                      <b-badge variant="secondary" class="px-3 py-2">{{ totalRows }} Total</b-badge>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="bullet bullet-bar bg-success align-self-stretch mr-2"></div>
                      <span class="text-success font-weight-bold font-size-sm">{{ getStatusCount('active') }} Aktif</span>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <b-button
                    variant="primary"
                    v-b-modal.modal-form
                    @click="is_data = ''"
                    class="font-weight-bolder shadow-sm hover:shadow-lg transition-all duration-200"
                    v-b-tooltip.hover
                    title="Tambah Pre Order Baru"
                  >
                    <i class="ri-add-circle-line font-size-h5"></i>
                    <span class="ml-2">Tambah Data</span>
                  </b-button>
                </div>
              </div>
            </template>

            <b-alert dismissible fade :show="showing" :variant="variant">{{
              msg
            }}</b-alert>
            <!-- Filter Section -->
            <div class="card-body pt-0">
              <form @submit.prevent="getListPO" autocomplete="off">
                <div v-if="isShowFilters" class="bg-light rounded p-4 mb-4">
                  <div class="d-flex align-items-center mb-4">
                    <i class="ri-filter-3-line text-primary font-size-h4 mr-2"></i>
                    <h5 class="mb-0 font-weight-bolder text-dark">Filter Data</h5>
                  </div>

                  <!-- First Row of Filters -->
                  <div class="row">
                    <b-col cols="12" md="6" lg="3" class="mb-4">
                      <label for="kode_po" class="font-weight-bold text-dark mb-2">Kode PO</label>
                      <b-form-input
                        id="kode_po"
                        v-model="filter.kode_po"
                        placeholder="Masukkan Kode PO"
                        type="text"
                        class="form-control-solid"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="12" md="6" lg="3" class="mb-4">
                      <label for="ms_suplier_id" class="font-weight-bold text-dark mb-2">Supplier</label>
                      <multiselect
                        v-model="filter.param.ms_suplier_id"
                        :options="list.list_supplier"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="nama_supplier"
                        track-by="id"
                        placeholder="Pilih Supplier"
                        id="ms_suplier_id"
                        class="multiselect-solid"
                        @select="onSelect(filter.param.ms_suplier_id, 'ms_suplier_id')"
                        @remove="onRemove(filter.param.ms_suplier_id, 'ms_suplier_id')"
                      />
                    </b-col>
                    <b-col cols="12" md="6" lg="3" class="mb-4">
                      <label for="ms_gudang_id" class="font-weight-bold text-dark mb-2">Gudang</label>
                      <multiselect
                        v-model="filter.param.ms_gudang_id"
                        :options="list.list_gudang"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="nama_gudang"
                        track-by="id"
                        placeholder="Pilih Gudang"
                        id="ms_gudang_id"
                        class="multiselect-solid"
                        @select="onSelect(filter.param.ms_gudang_id, 'ms_gudang_id')"
                        @remove="onRemove(filter.param.ms_gudang_id, 'ms_gudang_id')"
                      />
                    </b-col>
                    <b-col cols="12" md="6" lg="3" class="mb-4">
                      <label for="status_pembelian" class="font-weight-bold text-dark mb-2">Status Pembelian</label>
                      <multiselect
                        v-model="filter.param.status_pembelian"
                        :options="list.list_status_pembelian"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="text"
                        track-by="id"
                        placeholder="Pilih Status"
                        id="status_pembelian"
                        class="multiselect-solid"
                        @select="onSelect(filter.param.status_pembelian, 'status_pembelian')"
                        @remove="onRemove(filter.param.status_pembelian, 'status_pembelian')"
                      />
                    </b-col>
                  </div>

                  <!-- Second Row of Filters -->
                  <div class="row">
                    <b-col cols="12" md="6" lg="3" class="mb-4">
                      <label for="tgl_awal" class="font-weight-bold text-dark mb-2">Tanggal Awal</label>
                      <date-picker
                        id="tgl_awal"
                        style="width: 100%"
                        format="DD-MM-YYYY"
                        placeholder="Pilih tanggal awal"
                        v-model="filter.tgl_awal"
                        class="form-control-solid"
                      ></date-picker>
                    </b-col>
                    <b-col cols="12" md="6" lg="3" class="mb-4">
                      <label for="tgl_akhir" class="font-weight-bold text-dark mb-2">Tanggal Akhir</label>
                      <date-picker
                        id="tgl_akhir"
                        style="width: 100%"
                        format="DD-MM-YYYY"
                        placeholder="Pilih tanggal akhir"
                        v-model="filter.tgl_akhir"
                        class="form-control-solid"
                      ></date-picker>
                    </b-col>
                  </div>

                  <!-- Filter Action Buttons -->
                  <div class="d-flex flex-wrap gap-2 mt-4">
                    <button type="submit" class="btn btn-primary font-weight-bolder">
                      <i class="ri-search-line mr-2"></i>
                      Terapkan Filter
                    </button>
                    <button type="button" @click="resetFilter" class="btn btn-danger font-weight-bolder">
                      <i class="ri-refresh-line mr-2"></i>
                      Reset
                    </button>
                  </div>
                </div>
              </form>

              <!-- Filter Toggle Button -->
              <div class="d-flex justify-content-end mb-4">
                <button
                  class="btn btn-light-primary font-weight-bolder"
                  @click="isShowFilters = !isShowFilters"
                >
                  <i :class="isShowFilters ? 'ri-eye-off-line' : 'ri-eye-line'" class="mr-2"></i>
                  <span v-if="isShowFilters">Sembunyikan Filter</span>
                  <span v-else>Tampilkan Filter</span>
                </button>
              </div>
            </div>
            <!-- Table Section -->
            <div class="card-body pt-0">
              <div class="table-responsive">
                <b-table
                  :items="items"
                  :fields="fields"
                  responsive
                  show-empty
                  :busy="tableBusy"
                  class="table table-head-custom table-vertical-center table-bordered"
                  hover
                  striped
                >
                  <!-- Busy State Template -->
                  <template #table-busy>
                    <div class="text-center text-primary my-5">
                      <div class="spinner-border spinner-border-lg mr-2" role="status" aria-hidden="true"></div>
                      <div class="font-weight-bold font-size-lg">Memuat Data...</div>
                      <div class="text-muted">Mohon tunggu sebentar</div>
                    </div>
                  </template>

                  <!-- Empty State Template -->
                  <template #empty>
                    <div class="text-center py-8">
                      <div class="mb-4">
                        <i class="ri-inbox-line font-size-h4 text-muted"></i>
                      </div>
                      <h5 class="font-weight-bolder text-dark mb-2">Tidak Ada Data</h5>
                      <p class="text-muted">Belum ada data Pre Order yang tersedia</p>
                    </div>
                  </template>

                  <template #cell(status_pembelian)="item">
                    <div class="d-flex align-items-center justify-content-center">
                      <span
                        v-if="item.item.status_pembelian == 1"
                        class="badge badge-primary badge-pill px-4 py-2 font-weight-bolder d-flex align-items-center"
                        v-b-tooltip.hover.click="'Status Open - Pre Order dapat diedit'"
                      >
                        <div class="bullet bullet-bar bg-white align-self-stretch mr-2"></div>
                        <i class="ri-lock-unlock-line mr-1"></i>
                        Open
                      </span>
                      <span
                        v-else-if="item.item.status_pembelian == 2"
                        class="badge badge-warning badge-pill px-4 py-2 font-weight-bolder d-flex align-items-center"
                        v-b-tooltip.hover.click="'Status Locked - Pre Order dikunci, tidak dapat diedit'"
                      >
                        <div class="bullet bullet-bar bg-white align-self-stretch mr-2"></div>
                        <i class="ri-lock-line mr-1"></i>
                        Locked
                      </span>
                      <span
                        v-else-if="item.item.status_pembelian == 3"
                        class="badge badge-success badge-pill px-4 py-2 font-weight-bolder d-flex align-items-center"
                        v-b-tooltip.hover.click="'Status Closed - Pre Order telah selesai'"
                      >
                        <div class="bullet bullet-bar bg-white align-self-stretch mr-2"></div>
                        <i class="ri-shield-check-line mr-1"></i>
                        Closed
                      </span>
                    </div>
                  </template>
                  <template #cell(actions)="item">
                    <div class="d-flex justify-content-center gap-1">
                      <b-button
                        variant="primary"
                        class="btn-icon btn-sm p-2"
                        v-b-tooltip.hover.click="'Pembelian'"
                        @click="openPembelian(item.item)"
                      >
                        <i class="ri-shopping-cart-2-line font-size-lg"></i>
                      </b-button>

                      <b-button
                        v-if="item.item.status_pembelian < 2 || !havePembelian(item.item)"
                        variant="success"
                        class="btn-icon btn-sm p-2"
                        v-b-tooltip.hover.click="'Return Data'"
                        v-b-modal.modal-return
                        @click="is_data = item.item"
                      >
                        <i class="ri-refresh-line font-size-lg"></i>
                      </b-button>

                      <b-button
                        v-if="item.item.status_pembelian < 3 || !havePembelian(item.item)"
                        :disabled="item.item.status_pembelian != '1'"
                        variant="danger"
                        class="btn-icon btn-sm p-2"
                        v-b-tooltip.hover.click="'Hapus Data'"
                        v-b-modal.modal-delete
                        @click="is_data = item.item"
                      >
                        <i class="ri-delete-bin-2-line font-size-lg"></i>
                      </b-button>
                    </div>
                  </template>
                </b-table>
              </div>

              <!-- Pagination Section -->
              <div class="d-flex flex-wrap justify-content-between align-items-center mt-6">
                <div class="d-flex align-items-center">
                  <span class="text-muted font-size-sm mr-3">Menampilkan {{ items.length }} dari {{ totalRows }} data</span>
                  <b-form-group
                    class="mb-0"
                    label="Per Halaman"
                    label-for="per-page-select"
                    label-cols="auto"
                    label-class="font-weight-bold text-dark font-size-sm"
                  >
                    <b-form-select
                      id="per-page-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="sm"
                      class="form-control-solid font-size-sm"
                    ></b-form-select>
                  </b-form-group>
                </div>

                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="right"
                  first-number
                  last-number
                  class="mb-0"
                >
                  <template #first-text>
                    <i class="ri-skip-back-line"></i>
                  </template>
                  <template #prev-text>
                    <i class="ri-arrow-left-s-line"></i>
                  </template>
                  <template #next-text>
                    <i class="ri-arrow-right-s-line"></i>
                  </template>
                  <template #last-text>
                    <i class="ri-skip-forward-line"></i>
                  </template>
                </b-pagination>
              </div>
            </div>
<!-- 
            <b-row class="align-items-end">

              <b-col md="3">
                <b-form-group label="Per Halaman" label-for="per-page-select" label-cols-md="6" label-align-md="left"
                  label-size="md" style="background-color: " class="mb-0">
                  <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="md"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="9" class="d-flex justify-content-end justify-self-end">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="md"
                  class="mb-0"></b-pagination>
              </b-col>
            </b-row> -->
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- {{is_data}} -->
    <modal-input :list_gudang="list_gudang" :list_supplier="list_supplier" :list_barang="list_barang"
      :list_satuan_barang="list_satuan_barang" @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-form :data="JSON.parse(JSON.stringify(is_data))" :list_gudang="list_gudang" :list_supplier="list_supplier"
      :list_barang="list_barang" :list_satuan_barang="list_satuan_barang"
      @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-edit :list_gudang="list_gudang" :list_supplier="list_supplier" :data_edit="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event)" @tutupModal="getDatas()" />
    <modal-sub :list_barang="list_barang" :data_sub="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event)" @tutupModal="getDatas()" />
    <modal-delete :data_delete="JSON.parse(JSON.stringify(is_data))" @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-accept-pembelian :data_accept="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-form-pembelian :data="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-return :data="JSON.parse(JSON.stringify(is_data))" @alertFromChild="triggerAlert($event), getDatas()" />
  </div>
</template>
  
<script>
import axios from "axios";
import moment from 'moment';
moment.locale('id');
import { ipBackend } from "@/ipBackend";
import ModalAcceptPembelian from "./modalAcceptPembelian.vue";
import ModalFormPembelian from '../pembelian/modalForm.vue'
import ModalDelete from "./modalDelete.vue";
import ModalForm from "./modalForm.vue";
import ModalInput from "./modalInput.vue";
import ModalEdit from "./modalEdit.vue";
import ModalSub from "./modalSub.vue";
import ModalReturn from "./modalReturn.vue";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';

export default {
  components: {
    DatePicker,
    ModalInput,
    ModalForm,
    ModalDelete,
    ModalAcceptPembelian,
    ModalFormPembelian,
    ModalEdit,
    ModalSub,
    ModalReturn,
  },
  name: "master_etnis",
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      is_data: "",
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: false,
          class: "text-center",
          thClass: "text-center font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
        {
          key: "kode_po",
          label: "Kode PO",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          thClass: "font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
        {
          key: "nama_supplier",
          label: "Supplier",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          thClass: "font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
        {
          key: "nama_gudang",
          label: "Gudang",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          thClass: "font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
        {
          key: "nama_tgl_po",
          label: "Tanggal PO",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          thClass: "font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
        {
          key: "status_pembelian",
          label: "Status",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
          thClass: "text-center font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
        {
          key: "actions",
          label: "Aksi",
          class: "text-center",
          thClass: "text-center font-weight-bolder text-dark",
          tdClass: "align-middle"
        },
      ],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: {
        param: {
          status_pembelian: '',
          ms_suplier_id: '',
          ms_gudang_id: '',
        },
        tgl_awal: '',
        tgl_akhir: '',
        kode_po: '',
        status_pembelian: '',
        ms_suplier_id: '',
        ms_gudang_id: '',
      },
      filterOn: [],
      tableBusy: false,
      list_gudang: [],
      list_supplier: [],
      list_barang: [],
      list_satuan_barang: [],
      list: {
        list_supplier: [],
        list_gudang: [],
        list_status_pembelian: [
          { id: '1', text: 'Open' },
          { id: '2', text: 'Lock' },
          { id: '3', text: 'Close' },
        ]
      },
      isShowFilters: true,
    };
  },
  computed: {
  },
  watch: {
    currentPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas()
      }
    },
    perPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas()
      }
    },
    // 'filter.tgl_awal'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
    // 'filter.tgl_akhir'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
    // 'filter.kode_po'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.getDatas();
    this.getFilters();
  },
  methods: {
    // onFiltered(filteredItems) {
    //   // Trigger pagination to update the number of buttons/pages due to filtering
    //   this.totalRows = filteredItems.length;
    //   this.currentPage = 1;
    // },
    async openPembelian(x) {
      const vm = this
      vm.is_data = x
      // console.log(x)
      await new Promise(resolve => setTimeout(resolve, 100));
      !x.tgl_faktur ? vm.$bvModal.show('modal-accept-pembelian') : vm.$bvModal.show('modal-form-pembelian')
    },
    havePembelian(x) {
      //jika sudah dibuatkan pembelian
      return x && x.tgl_faktur ? true : false
    },
    async getDatas() {
      this.getListPO()
      //supplier
      let list_supplier = await this.$_api.post("msSupplier/list");
      this.list_supplier = list_supplier.status == 200 ? list_supplier.data.map(x => { return x }) : []
      //gudang
      let list_gudang = await this.$_api.post("msGudang/list");
      this.list_gudang = list_gudang.status == 200 ? list_gudang.data.map(x => { return x }) : []
      //barang
      let list_barang = await this.$_api.post("msBarang/list");
      this.list_barang = list_barang.status == 200 ? list_barang.data.map(x => { return x }) : []
      //satuan barang
      let list_satuan_barang = await this.$_api.post("msSatuanBarang/list");
      this.list_satuan_barang = list_satuan_barang.status == 200 ? list_satuan_barang.data.map(x => { return x }) : []
      // console.log('list_supplier : ', list_supplier)
    },
    async getListPO() {
      this.tableBusy = true;
      await this.$_api.post("pembelian/havePo", {
        jumlah: this.perPage,
        halaman: this.currentPage,
        ...this.filter,
        // tgl_awal: this.filter.tgl_awal ? moment(this.filter.tgl_awal).format('YYYY-MM-DD'):undefined,
        tgl_akhir: this.filter.tgl_akhir ? moment(this.filter.tgl_akhir).add(23, 'hours').add(59, 'minutes') : undefined,
      }).then((res) => {
        let pembelian = res.data
        this.totalRows = Number.parseInt(res.count)
        // console.log('pembelian ', pembelian)
        this.items = pembelian;
        for (let i = 0; i < this.items.length; i++) {
          let x = this.items[i];
          x.no = i + 1 + (this.perPage * (this.currentPage - 1));
          x.nama_tgl_po = moment(x.tgl_po).format('dddd, DD-MM-YYYY')
        }
      }).catch((err) => {
        console.log(err)
      })
      this.tableBusy = false;
    },
    getFilters() {
      this.getMsSupplier()
      this.getMsGudang()
    },
    getMsSupplier() {
      this.$_api.post("msSupplier/list").then((res) => {
        this.list.list_supplier = res.data
      })
    },
    getMsGudang() {
      this.$_api.post("msGudang/list").then((res) => {
        this.list.list_gudang = res.data
      })
    },
    onSelect(selectedArray, variableName) {
      this.filter[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filter[variableName] = '';
    },
    resetFilter() {
      this.filter = {
        param: {
          ms_suplier_id: '',
          ms_gudang_id: '',
        },
        tgl_awal: '',
        tgl_akhir: '',
        kode_po: '',
        ms_suplier_id: '',
        ms_gudang_id: '',
      }
    },
    getStatusCount(status) {
      if (status === 'active') {
        return this.items.filter(item => item.status_pembelian === 1).length;
      }
      return 0;
    },
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    }
  },
};
</script>

<style scoped>
.visible {
  visibility: visible !important;
}

.invisible {
  visibility: hidden !important;
}

.container-fluid {
  padding: 0 25px !important;
  padding-bottom: 25px !important;
}

/* Custom Card Header */
.card-header {
  background: linear-gradient(to right, #ffffff, #f8f9fc);
  border-bottom: 1px solid #ebedf3;
}

/* Custom Badge Styles */
.badge {
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Custom Button Styles */
.btn-icon {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-icon:active {
  transform: translateY(0);
}

/* Custom Table Styles */
.table-head-custom th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-head-custom td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fc;
  transition: background-color 0.3s ease;
}

/* Custom Form Control Styles */
.form-control-solid {
  background-color: #f3f6f9;
  border-color: #f3f6f9;
  color: #3f4254;
  transition: all 0.3s ease;
}

.form-control-solid:focus {
  background-color: #ffffff;
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
}

/* Custom MultiSelect Styles */
.multiselect-solid .multiselect__tags {
  background-color: #f3f6f9;
  border: 1px solid #f3f6f9;
  border-radius: 0.42rem;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
}

.multiselect-solid .multiselect__tags:hover {
  background-color: #ffffff;
  border-color: #e9ecef;
}

/* Custom Filter Section */
.bg-light {
  background: linear-gradient(135deg, #f8f9fc 0%, #e9ecef 100%) !important;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Custom Bullet Styles */
.bullet {
  display: inline-block;
  width: 4px;
  height: 16px;
  border-radius: 2px;
}

.bullet-bar {
  width: 3px;
  height: 16px;
  border-radius: 2px;
}

/* Custom Tooltip Animation */
.tooltip-inner {
  background-color: #1e1e2d;
  color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

/* Custom Pagination Styles */
.pagination .page-link {
  border: none;
  margin: 0 2px;
  border-radius: 0.42rem;
  color: #3f4254;
  background-color: #f3f6f9;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
}

.pagination .page-link:hover {
  background-color: #3699ff;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(54, 153, 255, 0.3);
}

.pagination .page-item.active .page-link {
  background-color: #3699ff;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(54, 153, 255, 0.3);
}

/* Custom Alert Styles */
.alert {
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-header .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .card-header .btn {
    margin-top: 1rem;
    width: 100%;
  }

  .table-responsive {
    font-size: 0.875rem;
  }

  .btn-icon {
    padding: 0.25rem 0.5rem !important;
  }

  .badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  .d-flex.gap-1 {
    gap: 0.25rem !important;
  }

  .pagination {
    margin-top: 1rem;
    justify-content: center !important;
  }

  .multiselect-solid .multiselect__tags {
    min-height: 2.5rem;
    padding: 0.375rem 0.75rem;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    padding: 0 15px !important;
  }

  .bg-light {
    padding: 1rem !important;
  }

  .table-responsive {
    font-size: 0.8rem;
  }

  .btn-icon i {
    font-size: 1rem !important;
  }

  .card-header h2 {
    font-size: 1.5rem;
  }
}

/* Animation Classes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Loading State */
.spinner-border-lg {
  width: 3rem;
  height: 3rem;
  border-width: 0.3rem;
}

/* Custom Hover Effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Custom Status Colors */
.status-open {
  background: linear-gradient(135deg, #3699ff, #1c7ed6);
}

.status-locked {
  background: linear-gradient(135deg, #ffa800, #fd7e14);
}

.status-closed {
  background: linear-gradient(135deg, #1bc5bd, #0f887e);
}
</style>
  