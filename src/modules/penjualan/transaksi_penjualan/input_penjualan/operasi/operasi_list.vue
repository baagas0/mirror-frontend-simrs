<template>
  <div class="h-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>Daftar Obat & BMHP</strong>
        </h5>
      </template>
      <b-row>
        <b-col md="5" offset-md="7" class="mb-3">
          <b-form-input id="filter-input" v-model="filter.nama_barang" type="search" placeholder="cari" size="sm"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-table :items="listOperasi" :fields="fields" responsive show-empty small bordered striped hover :busy="busy" style="white-space: nowrap" class="">
            <template #cell(actions)="item">
              <b-button @click="openAddJual(item)" variant="success" size="sm" :disabled="isDraft > 1"><i class="ri-shopping-cart-2-line"></i></b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
        </b-col>
        <b-col md="5" offset-md="4">
          <b-pagination class="m-0 p-0" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  components: {},
  name: "operasi_list",
  emits: ["resetData", "changeVar"],
  props: ["dataHeader", "dataPerhitungan", "dataForm", "listJual", "list", "isDraft", "listOperasi"],
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      busy: false,
      //operasi
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          class: "table-number text-center",
        },
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
        },
        {
          key: "nama_barang",
          label: "Barang",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_satuan",
          label: "Satuan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_qty_barang_total",
          label: "Total QTY",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_harga_barang",
          label: "Harga",
          sortDirection: "desc",
          class: "text-left",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: {},
      filterOn: [],
      pageOptions: [1, 10, 25, 50, 100],
    };
  },
  watch: {
    currentPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas();
      }
    },
    perPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas();
      }
    },
    "filter.nama_barang"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDatas();
      }
    },
    "dataHeader.refresh"(newVar, oldVar) {
      if (newVar != oldVar && newVar == "listOperasi") {
        this.getDatas();
        this.dataHeader.refresh = null;
      }
    },
    "dataHeader.ms_gudang_id"(newVar, oldVar) {
      if (newVar != oldVar) {
        if (!this.isDraft) this.$emit("changeVar", { to: "listJualOperasi", data: [] });
        this.getDatas();
      }
    },
    "dataHeader.ms_harga_id"(newVar, oldVar) {
      if (newVar != oldVar) {
        if (!this.isDraft) this.$emit("changeVar", { to: "listJualOperasi", data: [] });
        this.getDatas();
      }
    },
    "dataHeader.ms_tarif_id"(newVar, oldVar) {
      if (newVar != oldVar) {
        if (!this.isDraft) this.$emit("changeVar", { to: "listJualOperasi", data: [] });
        this.getDatas();
      }
    },
  },
  computed: {},
  mounted() {
    // this.getDatas();
  },
  methods: {
    async getDatas() {
      const vm = this;
      let listOperasi = [];
      if (vm.dataHeader.ms_harga_id && vm.dataHeader.ms_tarif_id && vm.dataHeader.ms_gudang_id) {
        vm.busy = true;
        // Menggunakan endpoint stock barang karena barang operasi diambil dari stock yang sama
        let master_harga_barang = await this.$_api.post("stock/listStockBarangJualPerHalaman", {
          jumlah: vm.perPage,
          halaman: vm.currentPage,
          ms_gudang_id: vm.dataHeader.ms_gudang_id,
          ms_harga_id: vm.dataHeader.ms_harga_id,
          ms_tarif_id: vm.dataHeader.ms_tarif_id,
          ...vm.filter,
        });
        
        listOperasi =
          master_harga_barang.status == 200
            ? master_harga_barang.data.map((x, idx) => {
                return {
                  ...x,
                  no: idx + 1,
                  nama_harga_barang: vm.toNumeric(x.harga_barang, "idr"),
                  nama_harga_barang_custom: vm.toNumeric(x.harga_barang, "idr"),
                  harga_barang_custom: x.harga_barang,
                  harga_pokok_barang: x.harga_pokok,
                  nama_harga_pokok_barang: vm.toNumeric(x.harga_pokok, "idr"),
                  qty_barang_total: x.qty,
                  nama_qty_barang_total: vm.toNumeric(x.qty),
                  qty_barang: 1,
                  nama_qty_barang: 1,
                  keterangan_penjualan_operasi: null,
                };
              })
            : [];
        vm.totalRows = parseInt(master_harga_barang.count);
        vm.busy = false;
      } else {
        listOperasi = [];
      }
      vm.$emit("changeVar", { to: "listOperasi", data: listOperasi });
    },
    openAddJual(data) {
      //open modal form
      const vm = this;
      vm.$bvModal.show("modal-form-operasi-jual");
      console.log("openAddJual Operasi", data);
      vm.$emit("changeVar", { to: "dataForm", data: { ...data.item, index: data.index } });
    },
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
    toNumeric(number, type) {
      let data = {};
      if (type == "no-idr") {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number).slice(3);
      } else {
        if (type == "idr") data = { style: "currency", currency: "IDR" };
        return new Intl.NumberFormat("id-ID", data).format(number);
      }
    },
  },
};
</script>