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
import { useGetAxios } from "../../../composables/useAxios";
  export default {
    name: "modalDelete",
    props: ["data_delete", "ep_be"],
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
        // axios
        //   .post(this.ep_be + "/delete", vm.data_delete)
        //   .then((res) => {
        //     if (res.message == "sukses") {
        //       vm.button = "Hapus";
        //       vm.busy = false;
        //       vm.$emit("alertFromChild", {
        //         variant: "success",
        //         msg: "BERHASIL MENGHAPUS DATA FIX ASSET",
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
        //     console.log(err);
        //     vm.button = "Hapus";
        //     vm.busy = false;
        //     vm.$emit("alertFromChild", {
        //       variant: "danger",
        //       msg: "TERJADI KESALAHAN PADA SERVER",
        //       showing: true,
        //     });
        //   });
        try {
          const { res } = await useGetAxios(this.ep_be + "/delete", vm.data_delete)
          if (res) {
            vm.button = "Hapus";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "success",
              msg: "BERHASIL MENGHAPUS DATA",
              showing: true,
            });
            this.$bvModal.hide("modal-delete");
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
          console.log(err);
          vm.button = "Hapus";
          vm.busy = false;
          vm.$emit("alertFromChild", {
            variant: "danger",
            msg: "TERJADI KESALAHAN PADA SERVER",
            showing: true,
          });
        }
      },
    },
  };
  </script>
  