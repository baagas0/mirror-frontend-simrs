<template>
  <div>
    <b-modal id="modal-status" size="md" centered title="Perhatian .... !!!" header-bg-variant="success" header-text-variant="light" hide-footer>
      <!-- <p>Apakah anda yakin akan mengubah status ?</p> -->
      <div class="">
        <b-button class="my-2 mx-1 px-3 w-100" variant="success" @click="updateStatus(1)" :disabled="busy || isDraft == 1"> Open </b-button>
        <b-button class="my-2 mx-1 px-3 w-100" variant="warning" @click="updateStatus(2)" :disabled="busy || isDraft == 2"> Lock </b-button>
      </div>
      <template #modal-footer> </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "modal_status",
  emits: ["changeVar"],
  props: ["dataHeader", "isDraft"],
  data() {
    return {
      busy: false,
    };
  },
  methods: {
    alertFromChild(value) {
      this.$emit("alertFromChild", value);
    },
    async updateStatus(status_penjualan) {
      let vm = this;
      vm.busy = true;
      const status = await this.$_api.post("penjualan/changeStatusPenjualan", { id: vm.dataHeader.penjualan_id, status_penjualan });
      // console.log('status', status)
      if (status.status == 200) {
        vm.dataHeader.status_penjualan = status_penjualan;
        vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil mengubah status penjualan", showing: true });
        vm.$bvModal.hide("modal-status");
      } else {
        vm.$store.commit("set_alert", { variant: "warning", msg: "Gagal mengubah status penjualan", showing: true });
      }
      vm.busy = false;
    },
  },
};
</script>
