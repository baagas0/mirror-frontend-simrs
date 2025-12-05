<template>
  <div class="w-100 p-2">
    <!-- <h5 class="font-weight-bolder text-dark mb-0 pb-0">Tagihan</h5> -->
    <b-row>
      <b-col cols="4">
        <b-card class="h-100 w-100 m-0 p-0">
          <b-row>
            <b-col cols="12">
              <h6>Total Tagihan</h6>
            </b-col>
            <b-col cols="6">Jumlah</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_jumlah }}</div>
              </div>
            </b-col>
            <b-col cols="6">Potongan</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_discount }}</div>
              </div>
            </b-col>
            <b-col cols="6">Sub Total</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_sub_total }}</div>
              </div>
            </b-col>
            <b-col cols="6">Tax (%)</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div></div>
                <div>{{ dataTagihan.nama_tax_persen }} / {{ dataTagihan.nama_tax_nominal }}</div>
                <!-- <div>{{dataTagihan.nama_tax_nominal}}</div> -->
              </div>
            </b-col>
            <b-col cols="12">
              <hr class="mt-1 mb-2">
            </b-col>
            <b-col cols="6">Total Tagihan</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_total_tagihan }}</div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card class="h-100 w-100 m-0 p-0">
          <b-row>
            <b-col cols="12">
              <h6>Ditanggung</h6>
            </b-col>
            <b-col cols="6">Total Ditanggung</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_total_ditanggung }}</div>
              </div>
            </b-col>
            <b-col cols="6">Total Tagihan</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_total_tagihan }}</div>
              </div>
            </b-col>
            <b-col cols="12"><br></b-col>
            <b-col cols="12"><br></b-col>
            <b-col cols="12">
              <hr class="mt-1 mb-2">
            </b-col>
            <b-col cols="6" :class="dataTagihan.selisih_tagihan > 0 ? 'text-success' : 'text-danger'">Selisih
              Tagihan</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between"
                :class="dataTagihan.selisih_tagihan > 0 ? 'text-success' : 'text-danger'">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_selisih_tagihan }}</div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card class="h-100 w-100 m-0 p-0">
          <b-row>
            <b-col cols="12">
              <h6>Pembayaran</h6>
            </b-col>
            <b-col cols="6" class="">Total Ditanggung</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between ">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_total_ditanggung }}</div>
              </div>
            </b-col>
            <!-- <b-col cols="6">Total Tagihan</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{dataTagihan.nama_total_tagihan}}</div>
              </div>
            </b-col>
            <b-col cols="6" :class="dataTagihan.selisih_tagihan > 0 ? 'text-success' : 'text-danger'">Selisih Tagihan</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between" :class="dataTagihan.selisih_tagihan > 0 ? 'text-success' : 'text-danger'">
                <div>Rp.</div>
                <div>{{dataTagihan.nama_selisih_tagihan}}</div>
              </div>
            </b-col> -->
            <b-col cols="6">Total Pembayaran</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_total_pembayaran }}</div>
              </div>
            </b-col>
            <b-col cols="12"><br></b-col>
            <b-col cols="12"><br></b-col>
            <b-col cols="12">
              <hr class="mt-1 mb-2">
            </b-col>
            <!-- <b-col cols="6">Sisa Pembayaran</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_sisa_pembayaran }}</div>
              </div>
            </b-col> -->
            
            <!-- <b-col cols="6">Total</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_total_semua_pembayaran }}</div>
              </div>
            </b-col> -->
            
            <b-col cols="6" :class="dataTagihan.kurang_pembayaran >= 0 ? 'text-success' : 'text-danger'">Kekurangan Pembayaran</b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-between" :class="dataTagihan.kurang_pembayaran >= 0 ? 'text-success' : 'text-danger'">
                <div>Rp.</div>
                <div>{{ dataTagihan.nama_kurang_pembayaran }}</div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import axios from "axios";
// // import { ipBackend } from "@/ipBackend";
// // import Multiselect from "vue-multiselect";
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";

export default {
  components: {
    // // Multiselect,
    // DatePicker,
  },
  name: 'master_etnis',
  emits: ['resetData', 'changeVar'],
  props: ['dataHeader', 'dataTagihan'],
  data() {
    return {
      showing: false,
      variant: 'success',
      msg: '',
      busy: false
    }
  },
  watch: {
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    getDatas() {
      // const vm = this
      // console.log()
    },
    triggerAlert(event) {
      let vm = this
      vm.$store.commit('set_alert', event)
    },
    toNumeric(number, type) {
      let data = {}
      if (type === 'no-idr') {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number).slice(3)
      } else {
        if (type === 'idr') data = { style: 'currency', currency: 'IDR' }
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    }
  }
}
</script>
