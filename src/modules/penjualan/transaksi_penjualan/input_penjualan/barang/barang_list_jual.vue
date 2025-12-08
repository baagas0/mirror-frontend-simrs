<template>
  <div class="w-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>Daftar Barang Yang Dijual</strong>
        </h5>
      </template>

      <b-row>
        <b-col md="5" offset-md="7" class="mb-3">
          <b-form-input id="filter-input" v-model="filter" type="search" placeholder="cari" size="sm"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-table v-if="!busy" :items="listJual" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" responsive show-empty small @filtered="onFiltered" bordered striped hover :busy="busy" style="white-space: nowrap" class="">
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(actions)="item">
              <div v-if="listJual.length">
                <!-- {{ item.index }} -->
                <b-button class="mr-1" @click="openEditJual(item)" variant="warning" size="sm" :disabled="isDraft > 1"><i class="ri-edit-line"></i></b-button>
                <b-button @click="$bvModal.show('modal-open-delete-barang'), (data = item)" variant="danger" size="sm" :disabled="isDraft > 1"><i class="ri-delete-bin-line"></i></b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
        </b-col>
        <b-col md="5" offset-md="5">
          <b-pagination class="m-0 p-0" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal id="modal-open-delete-barang" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning" header-text-variant="light">
      <p>Apakah anda yakin ingin menghapus penjualan barang ini?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-delete-barang')"> Tidak </b-button>
        <b-button variant="warning" @click="deleteJual(data)" :disabled="busy"> Ya </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";

export default {
  components: {
    // Multiselect,
    // DatePicker,
  },
  name: "master_etnis",
  emits: ["resetData", "changeVar"],
  props: ["dataHeader", "dataPerhitungan", "listJual", "list", "isDraft", "listBarang"],
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      data: null,
      busy: false,
      //jual
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
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_satuan",
          label: "Satuan",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_harga_barang_custom",
          label: "Harga",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_qty_barang",
          label: "Quantity",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_total_harga_barang",
          label: "Total Harga",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      pageOptions: [10, 25, 50, 100],
    };
  },
  watch: {
    listJual(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.totalRows = newVar.length;
      }
    },
  },
  computed: {},
  mounted() {
    this.$emit("changeVar", { to: "fieldBarang", data: this.fields.slice(2) });
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async refreshListJual() {
      const vm = this;
      const listJualBarang = await this.$_api.post("penjualanBarang/listPenjualanBarangByPenjualanId", { penjualan_id: vm.dataHeader.penjualan_id });
      // console.log('listJualBarang', listJualBarang)
      //list jual barang
      const listJual =
        listJualBarang.status == 200
          ? await listJualBarang.data.map((x) => {
              return {
                ...x,
                total_harga_barang: x.harga_barang_custom * x.qty_barang,
                nama_qty_barang: vm.toNumeric(x.qty_barang),
                nama_harga_barang: vm.toNumeric(x.harga_barang, "idr"),
                nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, "idr"),
                nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, "idr"),
                qty_barang_total: x.total_stock_barang,
                nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
              };
            })
          : [];
      vm.$emit("changeVar", { to: "listJualBarang", data: listJual });
    },
    openEditJual(data) {
      const vm = this;
      console.log("openEditJual", data);
      vm.$bvModal.show("modal-form-barang-jual");
      vm.$emit("changeVar", { to: "dataForm", data: { ...data.item, index_jual: data.index, update: true } });
    },
    async hitungPerhitungan(newVar, oldVar) {
      const vm = this;
      const dataPerhitungan = JSON.parse(JSON.stringify(vm.dataPerhitungan));
      const totalOld = oldVar.reduce((total, item) => total + item.total_harga_barang, 0);
      const totalNew = newVar.reduce((total, item) => total + item.total_harga_barang, 0);
      const x = {};
      x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew;
      x.harga_total_barang = totalNew;
      x.discount = dataPerhitungan.discount;
      x.tax = ((x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen) / 100;
      x.total_penjualan = x.jumlah - x.discount + x.tax;
      return x;
    },
    async deleteJual(data) {
      const vm = this;
      const listJualNew = vm.listJual.filter((item) => {
        return item.ms_barang_id != data.item.ms_barang_id;
      });
      const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, vm.listJual); //jika mengguakan watch, data bisa ketinggalan
      //jika draft / penjualan sudah dibuat
      if (vm.isDraft) {
        // await new Promise(resolve => setTimeout(resolve, 100));
        const hapus = await this.$_api.post("penjualanBarang/delete", { ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: data.item.penjualan_barang_id });
        if (hapus.status == 200) {
          vm.refreshListJual();
          vm.$emit("changeVar", { to: "dataHeader", data: { ...vm.dataHeader, refresh: "listBarang" } });
          vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Delete Barang Penjualan", showing: true });
          vm.$bvModal.hide("modal-open-delete-barang");
        } else {
          vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Delete Barang Penjualan", showing: true });
        }
      } else {
        vm.$emit("changeVar", { to: "listJualBarang", data: listJualNew });
        vm.$bvModal.hide("modal-open-delete-barang");
      }
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
