<template>
  <div class="h-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>Perhitungan</strong>
        </h5>
      </template>
      <div class="">
        <b-row class="">
          <b-col cols="4">Jumlah</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between">
              <span>Rp.</span>
              <span>{{dataPerhitungan.nama_jumlah}}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="text-danger">
          <b-col cols="4">Potongan</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between">
              <span>Rp.</span>
              <span>{{dataPerhitungan.nama_discount}}</span>
            </div>
            <b-row><b-col cols="12"><hr class="mt-1 mb-2"></b-col></b-row>
          </b-col>
        </b-row>
        <b-row class="">
          <b-col cols="4">Sub Total</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between">
              <span>Rp.</span>
              <span>{{dataPerhitungan.nama_sub_total}}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="">
          <b-col cols="4">Tax (%)</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between">
              <span></span>
              <span>{{dataPerhitungan.nama_tax_persen}}</span>
            </div>
            <b-row><b-col cols="12"><hr class="mt-1 mb-2"></b-col></b-row>
          </b-col>
        </b-row>
        <b-row class="">
          <b-col cols="4">Total</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between">
              <span>Rp.</span>
              <span>{{dataPerhitungan.nama_total}}</span>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row class="">
          <b-col cols="4">Pembayaran</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between">
              <span>Rp.</span>
              <span>{{dataPerhitungan.nama_pembayaran}}</span>
            </div>
            <b-row><b-col cols="12"><hr class="mt-1 mb-2"></b-col></b-row>
          </b-col>
        </b-row>
        <b-row class="">
          <b-col cols="4">Sisa</b-col>
          <b-col cols="auto">:</b-col>
          <b-col >
            <div class="d-flex justify-content-between" :class="{'text-danger': dataPerhitungan.sisa < 0 }">
              <span>Rp.</span>
              <span>{{dataPerhitungan.nama_sisa}}</span>
            </div>
          </b-col>
        </b-row> -->
        <b-row class="mt-2" v-if="statusTagihan || isDraft">
          <b-col cols="12">
            <b-card class="m-0 p-0">
              <template #default>
                <div v-if="statusTagihan == 2" class="m-0 p-0 d-flex">
                  <b-icon icon="check2-circle" aria-hidden="true" class="text-warning h3 m-0 p-0"></b-icon>
                  <div class="ml-1 my-auto">Tagihan Penjualan Ini Dalam Posisi lock</div>
                </div>
                <div v-else-if="statusTagihan == 3" class="m-0 p-0 d-flex">
                  <b-icon icon="check2-circle" aria-hidden="true" class="text-danger h3 m-0 p-0"></b-icon>
                  <div class="ml-1 my-auto">Tagihan Penjualan Ini Sudah Di Tutup</div>
                </div>
                <div v-else-if="isDraft" class="m-0 p-0 d-flex">
                  <b-icon icon="check2-circle" aria-hidden="true" class="text-success h3 m-0 p-0"></b-icon>
                  <div class="ml-1 my-auto">Jurnal Dalam Penjualan Ini Sudah Terupdate</div>
                </div>
              </template>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="12">
            <p class="m-0 p-0">
              <strong>
                Note : PPN berlaku untuk pennjualan item rawat jalan & umum
              </strong>
            </p>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="12" class="d-flex flex-wrap">
            <b-button class="m-1 d-flex" size="sm" variant="info" :disabled="headerBusy || !isDraft || statusTagihan > 1" @click="$bvModal.show('modal-status')">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">Draft</div>
            </b-button>
            <!-- <b-button class="m-1 d-flex" size="sm" variant="success" :disabled="headerBusy || isDraft > 1">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">Tax & Disc</div>
            </b-button> -->
            <!-- <b-button class="m-1 d-flex" size="sm" variant="primary" :disabled="headerBusy || isDraft > 1">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">Template</div>
            </b-button> -->
            <b-button class="m-1 d-flex" size="sm" variant="success" :disabled="headerBusy || isDraft > 1 || statusTagihan > 1" @click="openRegister()">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">Simpan</div>
            </b-button>
            <!-- <b-button class="m-1 d-flex" size="sm" variant="info" :disabled="headerBusy || isDraft > 1 || statusTagihan > 1" @click="$bvModal.show('modal-idgl')"> -->
            <b-button class="m-1 d-flex" size="sm" variant="info" @click="$bvModal.show('modal-idgl')">
              <b-icon icon="paperclip" aria-hidden="true"></b-icon>
              <div class="ml-1">IDGL</div>
            </b-button>
            <b-button class="m-1 d-flex" size="sm" variant="danger" @click="$emit('resetData', {local: true})" :disabled="headerBusy">
              <b-icon icon="pencil" aria-hidden="true"></b-icon>
              <div class="ml-1">Reset</div>
            </b-button>
          </b-col>
          <b-col cols="12" class="d-flex flex-wrap">
            <b-button class="m-1 text-white d-flex" size="sm" variant="warning" :disabled="headerBusy || isDraft > 1">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">PDF Rincian</div>
            </b-button>
            <b-button class="m-1 text-white d-flex" size="sm" variant="warning" :disabled="headerBusy || isDraft > 1">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">PDF Kwitansi</div>
            </b-button>
            <b-button class="m-1 text-white d-flex" size="sm" variant="warning" :disabled="headerBusy || isDraft > 1">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">Cetak Kwitansi</div>
            </b-button>
            <b-button class="m-1 text-white d-flex" size="sm" variant="warning" :disabled="headerBusy || isDraft > 1">
              <b-icon icon="folder2-open" aria-hidden="true"></b-icon>
              <div class="ml-1">Cetak Rincian</div>
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>
  
<script>
  // import axios from "axios";
  // // import { ipBackend } from "@/ipBackend";
  import "vue2-datepicker/index.css";
  
  export default {
    components: {
    },
    name: "perhitungan",
    emits: [ 'resetData', 'resetData', 'touchForm' ],
    props: [ 'data', 'dataPerhitungan', 'isDraft', 'headerBusy', 'isValid', 'isDirty', 'statusTagihan' ],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        busy: false,
      };
    },
    watch: {
    },
    computed: {
    },
    mounted() {
      // this.getDatas();
    },
    methods: {
      async openRegister(){
        const vm = this
        vm.$emit('touchForm')
        await new Promise(resolve => setTimeout(resolve, 100));
        // if(vm.isValid) 
        // await this.v$.header.$touch();
        if (vm.isValid && vm.isDirty) vm.$bvModal.show('modal-register')
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
      toNumeric(number, type){
        let data = {}
        if(type == 'no-idr') {
          return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(number).slice(3)
        }else{
          if(type == 'idr') data = {style: 'currency', currency: 'IDR'}
          return new Intl.NumberFormat('id-ID', data).format(number)
        }
      },
    },
  };
</script>
  