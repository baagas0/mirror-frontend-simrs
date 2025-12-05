<template>
  <div>
    <b-modal
      id="modal-close"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="danger"
      header-text-variant="light"
      @show="showModal"
    >
      <p>Apakah anda yakin akan menyelesaikan pembelian ini ?</p>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Tanggal 
        </template>
        <date-picker
          id="tgl_masuk"
          style="width: 100%"
          format="DD-MM-YYYY"
          v-model="$v.is_data.tgl_masuk.$model"
        ></date-picker>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          <!-- Ubah HPP  -->
        </template>
        <div  class="form-check">
          <input 
            id="ubah_harga_pokok"
            name="ubah_harga_pokok"
            type="checkbox"
            class="form-check-input" 
            v-model="$v.is_data.ubah_harga_pokok.$model"
          >
          <label class="form-check-label" style="margin-top: 3px;" for="ubah_harga_pokok">
            Ubah HPP
          </label>
        </div>
      </b-form-group>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-close')">
          Tidak
        </b-button>
        <b-button variant="danger" @click="closed()" :disabled="busy || !isValid">
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
  import DatePicker from "vue2-datepicker";
  import 'vue2-datepicker/index.css';
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
  // import moment from 'moment';
  
  export default {
    name: "modalReturn",
    props: ["data"],
    components: {
      DatePicker,
    },
    data() {
      return {
        busy: false,
        is_data: {
          tgl_masuk: new Date(),
          ubah_harga_pokok: true,
        }
      };
    },
    mixins: [validationMixin],
    validations: {
      is_data: {
        tgl_masuk: { required },
        ubah_harga_pokok: { required },
      },
    },
    computed: {
      isValid() {
        return !this.$v.is_data.$invalid;
      },
      isDirty() {
        return this.$v.is_data.$anyDirty;
      },
    },
    methods: {
      showModal(){
        // this.$emit("alertFromChild", {
        //   variant: "danger",
        //   msg: "TERJADI KESALAHAN PADA SERVER",
        //   showing: true,
        // });
      },
      closed(){
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        axios
          // .post("pembelian/closed", {id: vm.pembelian_id, tgl_masuk: moment(vm.is_data.tgl_masuk).format('YYYY-MM-DD'), ubah_harga_pokok: vm.is_data.ubah_harga_pokok})
          .post("pembelian/closed", {id: vm.pembelian_id, ...vm.is_data})
          .then((res) => {
            console.log('ini result close', res)
            if (res.message == "sukses") {
              vm.button = "Hapus";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENUTUP PEMBELIAN",
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
      reset(){
        this. is_data = {
          tgl_masuk: new Date(),
          ubah_harga_pokok: true,
        }
      }
    },
  };
  </script>
  