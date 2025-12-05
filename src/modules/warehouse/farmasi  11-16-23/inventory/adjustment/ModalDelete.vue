<template>
  <div>
    <b-modal
      id="modal-delete"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>Apakah anda yakin akan menghapus data ini ?</p>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-delete')">
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
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
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
    async hapus() {
      let vm = this;
      vm.busy = true;
      vm.button = "Mohon Tunggu";
      try {
        let res = await this.$_api.post("subAdjustment/delete", {
          id: vm.data_delete.sub_adjustment_id
        })
        if (res.message == "sukses") {
            vm.button = "Hapus";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "success",
              msg: "BERHASIL MENGHAPUS DATA MASTER PRODUSEN",
              showing: true,
            });
            vm.$bvModal.hide("modal-delete");
        } else {
          vm.button = "Hapus";
          vm.busy = false;
          vm.$emit("alertFromChild", {
            variant: "danger",
            msg: _.toUpper(res.message),
            showing: true,
          });
        }
      } catch (err) {
        vm.button = "Hapus";
        vm.busy = false;
        vm.$emit("alertFromChild", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true,
        });
      }
      // axios
      //   .post("msProdusen/delete", vm.data_delete)
      //   .then((res) => {
      //     if (res.message == "sukses") {
      //       vm.button = "Hapus";
      //       vm.busy = false;
      //       vm.$emit("alertFromChild", {
      //         variant: "success",
      //         msg: "BERHASIL MENGHAPUS DATA MASTER PRODUSEN",
      //         showing: true,
      //       });
      //       this.$bvModal.hide("modal-delete");
      //     } else {
      //       vm.button = "Hapus";
      //       vm.busy = false;
      //       vm.$emit("alertFromChild", {
      //         variant: "danger",
      //         msg: _.toUpper(res.message),
      //         showing: true,
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     vm.button = "Hapus";
      //     vm.busy = false;
      //     vm.$emit("alertFromChild", {
      //       variant: "danger",
      //       msg: "TERJADI KESALAHAN PADA SERVER",
      //       showing: true,
      //     });
      //   });
    },
  },
};
</script>
