<template>
  <div>
    <b-modal id="modal-open-edit" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning" header-text-variant="light">
      <p>Apakah anda yakin ingin mengubah penjualan ini?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-edit')"> Tidak </b-button>
        <b-button variant="primary" @click="openEdit()" :disabled="busy"> Ya </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>

export default {
  name: "modal-open-edit",
  props: ["data"],
  data() {
    return {
      busy: false,
    };
  },
  methods: {
    async openEdit() {
      const vm = this;
      console.log("open edit penjualan");
      console.log(vm.data);
      console.log("dataEditPenjualan ", localStorage.getItem("dataEditPenjualan"));

      localStorage.setItem("dataEditPenjualan", JSON.stringify(vm.data));
      vm.$bvModal.hide("modal-open-edit");
      vm.$router.push("/penjualan/transaksi_penjualan/input_penjualan");
    },
    alertFromChild(value) {
      this.$emit("alertFromChild", value);
    },
  },
};
</script>
