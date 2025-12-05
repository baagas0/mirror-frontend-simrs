<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Update Data Master Kelas Terapi"
        header-bg-variant="primary"
        header-text-variant="light"
        @hidden="tutupModal"
      >
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama Kelas Terapi <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('nama_kelas_terapi')"
              type="text"
              v-model="$v.is_data.nama_kelas_terapi.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
                Narkotik <span class="text-danger">*</span>
            </template>
            <b-form-radio-group
                :state="checkIfValid('is_narkotik')"
                v-model="$v.is_data.is_narkotik.$model"
                :options="options"
                class="mb-3"
            ></b-form-radio-group>
          </b-form-group>
        </b-form>
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-edit')">
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
  
  export default {
    name: "modalEdit",
    props: ["data_edit"],
    data() {
      return {
        busy: false,
        button: "Simpan",
        is_data: null,
        options: [
            {value:true, text:"Ya"},
            {value:false, text:"Tidak"}
        ],
      };
    },
    computed: {
      computed_val: {
        get() {
          return this.is_data;
        },
        set(newVal) {
          this.is_data = newVal;
        },
      },
      formString() {
        return JSON.stringify(this.data_edit, 4, null);
      },
      isValid() {
        return !this.$v.is_data.$invalid;
      },
      isDirty() {
        return this.$v.is_data.$anyDirty;
      },
    },
    watch: {
      data_edit(newVal) {
        this.is_data = newVal;
      },
    },
  
    mixins: [validationMixin],
    validations: {
      is_data: {
        nama_kelas_terapi: {
          required,
        },
        is_narkotik: {
          required,
        },
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
        axios
          .post(ipBackend + "msKelasTerapi/update", vm.is_data)
          .then((res) => {
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH MASTER KELAS TERAPI",
                showing: true,
              });
              vm.$bvModal.hide("modal-edit");
              vm.resetModal();
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
      tutupModal() {
        this.$emit("tutupModal");
      },
      resetModal() {
        this.$v.$reset();
        this.is_data = {
          nama_kelas_terapi: "",
          is_narkotik: "",
        };
      },
    },
  };
  </script>
  