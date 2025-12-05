<template>
  <div>
    <b-modal
      id="modal-accept-pembelian"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="info"
      header-text-variant="light"
      @show="openModal"
    >
      <p>Apakah anda yakin akan membuat pembelian dari pre order ini ?</p>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-accept-pembelian')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="accept()" :disabled="busy">
          {{ button }}
        </b-button>
      </template>
    </b-modal>
    <!-- <modal-form-pembelian
      :data="data_accept"
      @alertFromChild="triggerAlert($event), getDatas()" 
    /> -->
  </div>
</template>
<script>
  // import _ from "lodash";
  // import axios from "axios";
  // import { ipBackend } from "@/ipBackend";
  // import ModalFormPembelian from '../pembelian/modalForm.vue'
  export default {
    name: "modalDelete",
    props: ["data_accept"],
    components:{
      // ModalFormPembelian,
    },
    data() {
      return {
        busy: false,
        button: "Ya",
        list_gudang: [],
        list_supplier: [],
        list_barang: [],
        list_satuan_barang: [],
      };
    },
    methods: {
      async openModal(){
        const vm = this
        vm.busy = true
        // vm.data_accept.poToPembelian = true
        // console.log('111111111', vm.data_accept.status_pembelian == 3, vm.data_accept)
        // await new Promise(resolve => setTimeout(resolve, 100));
        // if(vm.data_accept.tgl_faktur) await vm.accept()
        vm.busy = false
      },
      async accept() {
        let vm = this;
        // console.log('vm.data_accept', vm.data_accept)
        const x = vm.data_accept
        x.tgl_faktur = new Date()
        // localStorage.setItem('pembelian_id', vm.data_accept.pembelian_id)
        // console.log('pembelian id', localStorage.getItem('pembelian_id'))
        vm.$bvModal.hide('modal-accept-pembelian')
        vm.$bvModal.show('modal-form-pembelian')
      },
    },
  };
  </script>
  