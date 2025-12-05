<template>
  <div>
    <b-modal
      id="modal-edit"
      size="lg"
      centered
      title="Edit Data Master Produsen"
      header-bg-variant="warning"
      header-text-variant="light"
      @hidden="tutupModal"
    >
      <b-form @submit.prevent.default>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Nama Produsen <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('nama_produsen')"
            type="text"
            v-model="$v.is_data.nama_produsen.$model"
          ></b-form-input>
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
        >
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
      nama_produsen: {
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
      if (vm.isValid) {
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        axios
          .post("msProdusen/update", vm.is_data)
          .then((res) => {
            if (res.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH DATA",
                showing: true,
              });
              vm.$bvModal.hide("modal-edit");
              vm.resetModal();
            } else {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "danger",
                msg: _.toUpper(res.message),
                showing: true,
              });
            }
          })
          .catch((err) => {
            vm.button = "Simpan";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "danger",
              msg: "TERJADI KESALAHAN PADA SERVER",
              showing: true,
            });
          });
      }
    },
    tutupModal() {
      this.$emit("tutupModal");
    },
    resetModal() {
      this.$v.$reset();
      this.is_data = {
        nama_produsen: "",
      };
    },
  },
};
</script>
