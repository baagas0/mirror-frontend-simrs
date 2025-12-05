<template>
  <div>
    <b-modal
      id="modal-return"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="success"
      header-text-variant="light"
      hide-footer
    >
      <div class="">
        <b-button class="w-100 mx-1 my-2 px-3" variant="success" @click="updateStatus('1')" :disabled="busy || data.status_pembelian != 2">
          Open
        </b-button>
        <b-button class="w-100 mx-1 my-2 px-3" variant="warning" @click="updateStatus('2')" :disabled="busy || data.status_pembelian != 1">
          Lock
        </b-button>
        <!-- <b-button class="mx-1 px-3" variant="danger" @click="closePembelian()" :disabled="busy || data.status_pembelian != 2">
          Close
        </b-button> -->
      </div>
      <template #modal-footer>
        <!-- <b-button variant="secondary" @click="$bvModal.hide('modal-return')">
          Tidak
        </b-button> -->
      </template>
    </b-modal>
    <b-modal
      id="modal-accept"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>Apakah anda yakin akan menyelesaikan pembelian ini ?</p>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-accept')">
          Tidak
        </b-button>
        <b-button variant="danger" @click="updateStatus('3')" :disabled="busy">
          Close Pembelian
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
    name: "modalReturn",
    props: ["data"],
    data() {
      return {
        busy: false,
      };
    },
    methods: {
      closePembelian(){
        this.$bvModal.show("modal-accept");
      },
      updateStatus(status_pembelian){
      //   console.log('ubah status ', status)
      // },
      // kembali() {
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        axios
          .post(ipBackend + "/pembelian/changeStatus", {id: vm.data.pembelian_id, status_pembelian})
          .then((res) => {
            console.log(res)
            if (res.data.message == "sukses") {
              vm.button = "Hapus";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH STATUS PEMBELIAN",
                showing: true,
              });
              this.$bvModal.hide("modal-return");
              this.$bvModal.hide("modal-accept");
            } else {
              vm.button = "Hapus";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "danger",
                msg: _.toUpper(res.data.message),
                showing: true,
              });
            }
          })
          .catch((err) => {
            console.log(err);
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
  