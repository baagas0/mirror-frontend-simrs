<template>
  <div>
    <b-modal
      id="modal-delete-diagnosa"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>Apakah anda yakin akan menghapus data ini ?</p>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-delete-diagnosa')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="hapus()" :disabled="busy">
          {{ button }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "modalDelete",
  props: ["data_delete"],
  data() {
    return {
      busy: false,
      button: "Hapus",
    };
  },
  methods: {
    hapus() {
      let vm = this;
      vm.busy = true;
      vm.button = "Mohon Tunggu";
      vm.$axios
        .post("/pool_diagnosa/delete", {id: vm.data_delete.pool_diagnosa_id})
        .then((res) => {
          if (res.data.message == "sukses") {
            vm.button = "Hapus";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "success",
              msg: "Berhasil Menghapus Diagnosa",
              showing: true,
            });
            this.$bvModal.hide("modal-delete-diagnosa");
          } else {
            vm.button = "Hapus";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "danger",
              msg: res.data.message,
              showing: true,
            });
          }
        })
        .catch((err) => {
          console.log(err)
          vm.button = "Hapus";
          vm.busy = false;
          vm.$emit("alertFromChild", {
            variant: "danger",
            msg: "TERJADI KESALAHAN PADA SERVER",
            showing: true,
          });
        });
    },
  },
};
</script>
