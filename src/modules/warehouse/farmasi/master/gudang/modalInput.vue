<template>
    <div>
      <b-modal
        id="modal-input"
        size="lg"
        centered
        title="Tambah Data Master Gudang"
        header-bg-variant="primary"
        header-text-variant="light"
        @hidden="resetModal"
      >
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama Gudang <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('nama_gudang')"
              type="text"
              v-model="$v.is_data.nama_gudang.$model"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Tipe Gudang <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('tipe_gudang')"
              type="text"
              v-model="$v.is_data.tipe_gudang.$model"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Jenis Gudang
            </template>
            <b-form-radio-group
                v-model="is_utama"
                :options="options"
                class="mb-3"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group v-if="is_utama == '1'" label="Gudang Utama" label-cols-md="3">
            <multiselect
                :state="checkIfValid('gudang_id')"
                v-model="$v.is_data.gudang_id.$model"
                :options="gudang_utama"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_gudang"
                track-by="ms_gudang_utama_id"
                placeholder="-- Pilih Gudang --"
            ></multiselect>
          </b-form-group>

        </b-form>
        <!-- <img :src="src1" /> -->
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-input')">
            Batal
          </b-button>
          <b-button
            variant="primary"
            :disabled="busy || !isValid"
            @click="simpan()"
            >{{ button }}</b-button
          >
        </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  import _ from "lodash"
  import axios from "axios";
  import { ipBackend } from "@/ipBackend";
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
  import Multiselect from "vue-multiselect";

  export default {
    name: "modalInput",
    components: {
        Multiselect
    },
    props: ["gudang_utama"],
    data() {
      return {
        is_data: {
          nama_gudang: "",
          tipe_gudang: "",
          ms_gudang_utama_id: "",
          gudang_id: "",
        },
        is_utama: "0",
        options: [
            {value: '0', text: "Utama"},
            {value: '1', text: "Bukan"}
        ],
        
        src1: "",
        selected: null,
        busy: false,
        button: "Simpan",
      };
    },
    computed: {
      formString() {
        return JSON.stringify(this.is_data, null, 4);
      },
      isValid() {
        return !this.$v.is_data.$invalid;
      },
      isDirty() {
        return this.$v.is_data.$anyDirty;
      },
    },
    mixins: [validationMixin],
    validations: {
      is_data: {
        nama_gudang: {
          required,
        },
        tipe_gudang: {
            required,
        },
        gudang_id: {
            required: function() {
                return this.is_utama == '1' ? this.is_data.gudang_id : true;
            }
        }
      },
    },
    methods: {
      checkIfValid(fieldName) {
        const field = this.$v.is_data[fieldName];
        if (!field.$dirty) {
          return null;
        }
        return !(field.$invalid || field.$model === "");
      },
      simpan() {
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        if(vm.is_utama == '1'){
            vm.is_data.ms_gudang_utama_id = vm.is_data.gudang_id.ms_gudang_utama_id
        }
        axios
          .post(ipBackend + "msGudang/register", vm.is_data)
          .then((res) => {
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENDAFTARKAN MASTER GUDANG",
                showing: true,
              });
              this.$bvModal.hide("modal-input");
              this.resetModal();
            } else {
              vm.button = "Simpan";
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
            vm.button = "Simpan";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "danger",
              msg: "TERJADI KESALAHAN PADA SERVER",
              showing: true,
            });
          });
      },
      resetModal() {
        this.$v.$reset();
        this.is_data = {
          nama_gudang: "",
          tipe_gudang: "",
          ms_gudang_utama_id: "",
        };
        this.gudang_id = ""
        this.is_utama = "0"
      },
    },
  };
  </script>
  