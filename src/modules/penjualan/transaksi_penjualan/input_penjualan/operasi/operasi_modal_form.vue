<template>
  <b-modal id="modal-form-operasi-jual" size="md" centered title="Jual Barang Operasi" :header-bg-variant="dataForm.status_edit ? 'warning' : 'success'" header-text-variant="light">
    <b-form>
      <b-form-group label-cols-md="3">
        <template v-slot:label> Barang <span class="text-danger">*</span> </template>
        <b-form-input type="text" disabled v-model="dataForm.nama_barang"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label> Satuan <span class="text-danger">*</span> </template>
        <b-form-input type="text" disabled v-model="dataForm.nama_satuan"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label> Total QTY <span class="text-danger">*</span> </template>
        <b-form-input type="text" disabled v-model="dataForm.nama_qty_barang_total"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label> Harga <span class="text-danger">*</span> </template>
        <b-form-input type="text" disabled v-model="dataForm.nama_harga_barang"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label> Harga Custom <span class="text-danger">*</span> </template>
        <b-form-input type="number" v-model="dataForm.harga_barang_custom"></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{ dataForm.nama_harga_barang_custom }}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label> QTY Jual<span class="text-danger">*</span> </template>
        <b-form-input type="number" v-model="dataForm.qty_barang"></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{ dataForm.nama_qty_barang }}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label> Keterangan </template>
        <b-form-input type="text" v-model="dataForm.keterangan_penjualan_operasi"></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide('modal-form-operasi-jual')"> Tidak </b-button>
      <div v-if="isDraft == 1">
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_barang == null"> Update </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_barang == null"> Register </b-button>
      </div>
      <div v-else>
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_barang == null"> Ubah </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_barang == null"> Tambah </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import "vue2-datepicker/index.css";

export default {
  components: {},
  name: "operasi_modal_form",
  emits: ["resetData", "changeVar"],
  props: ["dataHeader", "dataPerhitungan", "dataForm", "listJual", "list", "isDraft", "listOperasi"],
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      busy: false,
    };
  },
  watch: {
    "dataForm.harga_barang_custom"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.dataForm.nama_harga_barang_custom = this.toNumeric(newVar, "idr");
      }
    },
    "dataForm.qty_barang"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.dataForm.nama_qty_barang = this.toNumeric(newVar);
      }
    },
  },
  computed: {},
  mounted() {
    // this.getDatas();
  },
  methods: {
    async hitungPerhitungan(newVar, oldVar) {
      const vm = this;
      const dataPerhitungan = JSON.parse(JSON.stringify(vm.dataPerhitungan));
      const totalOld = oldVar.reduce((total, item) => total + (item.total_harga_operasi || 0), 0);
      const totalNew = newVar.reduce((total, item) => total + (item.total_harga_operasi || 0), 0);
      const x = {};
      x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew;
      x.harga_total_operasi = totalNew;
      x.discount = dataPerhitungan.discount;
      x.tax = ((x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen) / 100;
      x.total_penjualan = x.jumlah - x.discount + x.tax;
      return x;
    },
    async refreshListJual() {
      const vm = this;
      const listJualOperasi = await this.$_api.post("penjualanOperasi/listPenjualanOperasiByPenjualanId", { penjualan_id: vm.dataHeader.penjualan_id });
      
      const listJual =
        listJualOperasi.status == 200
          ? await listJualOperasi.data.map((x) => {
              return {
                ...x,
                total_harga_operasi: x.harga_barang_custom * x.qty_barang,
                nama_qty_barang: vm.toNumeric(x.qty_barang),
                qty_barang_total: x.total_stock_barang,
                nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
                nama_harga_barang: vm.toNumeric(x.harga_barang, "idr"),
                nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, "idr"),
                nama_total_harga_operasi: vm.toNumeric(x.harga_barang_custom * x.qty_barang, "idr"),
              };
            })
          : [];
      vm.$emit("changeVar", { to: "listJualOperasi", data: listJual });
    },
    async registerJual() {
      const vm = this;
      vm.busy = true;
      vm.$bvModal.hide("modal-form-operasi-jual");
      const dataForm = JSON.parse(JSON.stringify(vm.dataForm));
      //list jual
      const listJual = JSON.parse(JSON.stringify(vm.listJual));
      const indexJualOperasi = listJual.findIndex((jual) => jual.ms_barang_id == dataForm.ms_barang_id);
      if (indexJualOperasi >= 0) {
        //jika barang sudah ada di list jual
        vm.$store.commit("set_alert", { variant: "warning", msg: "Sudah Terdapat Pada Daftar Barang Operasi Yang Dijual", showing: true });
      } else {
        //barang
        const listOperasi = JSON.parse(JSON.stringify(vm.listOperasi));
        const indexOperasi = listOperasi.findIndex((barang) => barang.ms_barang_id == dataForm.ms_barang_id);
        
        // Cek qty
        if (listOperasi[indexOperasi].qty_barang_total - dataForm.qty_barang < 0) {
          vm.$store.commit("set_alert", { variant: "warning", msg: "Menjual Barang Operasi Melebihi Total Quantity", showing: true });
        } else {
          //barang jual
          dataForm.qty_barang_total = listOperasi[indexOperasi].qty_barang_total - dataForm.qty_barang;
          dataForm.nama_qty_barang_total = vm.toNumeric(dataForm.qty_barang_total);
          dataForm.total_harga_operasi = dataForm.qty_barang * dataForm.harga_barang_custom;
          dataForm.nama_qty_barang = vm.toNumeric(dataForm.qty_barang);
          dataForm.nama_harga_barang_custom = vm.toNumeric(dataForm.harga_barang_custom, "idr");
          dataForm.nama_total_harga_operasi = vm.toNumeric(dataForm.total_harga_operasi, "idr");
          console.log("dataForm", dataForm);
          const listJualNew = listJual.concat({ ...dataForm, no: listJual.length + 1, create: true });
          const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, listJual);
          
          if (vm.isDraft == 1) {
            const register = await this.$_api.post("penjualanOperasi/register", { ...dataForm, ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id });
            if (register.status == 200) {
              this.refreshListJual();
              this.$emit("changeVar", { to: "dataHeader", data: { ...vm.dataHeader, refresh: "listOperasi" } });
              vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Register Barang Operasi Penjualan", showing: true });
            } else {
              vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Register Barang Operasi Penjualan", showing: true });
            }
          } else {
            vm.$emit("changeVar", { to: "listJualOperasi", data: listJualNew });
          }
        }
      }
      vm.$bvModal.hide("modal-form-operasi-jual");
      vm.busy = false;
    },
    async updateJual() {
      const vm = this;
      let listJual = JSON.parse(JSON.stringify(vm.listJual));
      const listJualOld = JSON.parse(JSON.stringify(vm.listJual));
      
      console.log("vm.dataForm update Operasi", vm.dataForm);
      const indexJual = listJual.findIndex((barang) => barang.ms_barang_id == vm.dataForm.ms_barang_id);
      
      // Validasi QTY
      if (listJual[indexJual].qty_barang_total - (vm.dataForm.qty_barang - listJual[vm.dataForm.index_jual].qty_barang) < 0) {
        vm.$store.commit("set_alert", { variant: "warning", msg: "Menjual Barang Operasi Melebihi Total Quantity", showing: true });
      } else {
        listJual[vm.dataForm.index_jual].qty_barang_total = listJual[indexJual].qty_barang_total - (vm.dataForm.qty_barang - listJual[vm.dataForm.index_jual].qty_barang);
        listJual[vm.dataForm.index_jual].nama_qty_barang_total = vm.toNumeric(listJual[vm.dataForm.index_jual].qty_barang_total);
        listJual[vm.dataForm.index_jual].keterangan_penjualan_operasi = vm.dataForm.keterangan_penjualan_operasi;
        listJual[vm.dataForm.index_jual].harga_barang_custom = vm.dataForm.harga_barang_custom;
        listJual[vm.dataForm.index_jual].qty_barang = vm.dataForm.qty_barang;
        listJual[vm.dataForm.index_jual].total_harga_operasi = vm.dataForm.qty_barang * vm.dataForm.harga_barang_custom;
        listJual[vm.dataForm.index_jual].nama_qty_barang = vm.toNumeric(vm.dataForm.qty_barang);
        listJual[vm.dataForm.index_jual].nama_harga_barang_custom = vm.toNumeric(vm.dataForm.harga_barang_custom, "idr");
        listJual[vm.dataForm.index_jual].nama_total_harga_operasi = vm.toNumeric(listJual[vm.dataForm.index_jual].total_harga_operasi, "idr");
        
        const dataPerhitungan = await vm.hitungPerhitungan(listJual, listJualOld);
        
        if (vm.isDraft == 1) {
          const update = await this.$_api.post("penjualanOperasi/update", { ...listJual[vm.dataForm.index_jual], ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: vm.dataForm.penjualan_operasi_id });
          
          if (update.status == 200) {
            this.refreshListJual();
            this.$emit("changeVar", { to: "dataHeader", data: { ...vm.dataHeader, refresh: "listOperasi" } });
            vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Update Barang Operasi Penjualan", showing: true });
          } else {
            vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Update Barang Operasi Penjualan", showing: true });
          }
        } else {
          vm.$emit("changeVar", { to: "listJualOperasi", data: listJual });
        }
      }
      vm.$bvModal.hide("modal-form-operasi-jual");
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