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
        <b-button class="w-100 mx-1 my-2 px-3" variant="danger" @click="closePembelian()" :disabled="busy || data.status_pembelian != 2">
          Close
        </b-button>
      </div>
      <template #modal-footer>
      </template>
    </b-modal>
    <modal-close :data="data" @alertFromChild="alertFromChild"/>
  </div>
</template>
<script>
  import _ from "lodash";
  import axios from "axios";
  import { ipBackend } from "@/ipBackend";
  import modalClose from './modalClose.vue'
  
  export default {
    name: "modalReturn",
    props: ["data"],
    components: {
      modalClose
    },
    data() {
      return {
        busy: false,
      };
    },
    methods: {
      closePembelian(){
        this.$bvModal.hide("modal-return");
        this.$bvModal.show("modal-close");
      },
      alertFromChild(value){
        this.$emit("alertFromChild", value);
      },
      updateStatus(status_pembelian){
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        axios
          .post("pembelian/changeStatus", {id: vm.pembelian_id, status_pembelian})
          .then((res) => {  
            // console.log(res)
            if (res.message == "sukses") {
              vm.button = "Hapus";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH STATUS PEMBELIAN",
                showing: true,
              });
              this.$bvModal.hide("modal-return");
              this.$bvModal.hide("modal-close");
            } else {
              vm.button = "Hapus";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "danger",
                msg: _.toUpper(res.message),
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
  