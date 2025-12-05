<template>
  <div>
    <b-modal
      id="modal-input"
      size="lg"
      centered
      title="Tambah Data Master Produsen"
      header-bg-variant="primary"
      header-text-variant="light"
      @hidden="resetModal"
    >
      <b-form>
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
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "modalInput",
  data() {
    return {
      is_data: {
        nama_produsen: "",
      },
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
      vm.busy = true;
      vm.button = "Mohon Tunggu";
      axios
        .post("msProdusen/register", vm.is_data)
        .then((res) => {
          if (res.message == "sukses") {
            vm.button = "Simpan";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "success",
              msg: "BERHASIL MENDAFTARKAN DATA",
              showing: true,
            });
            this.$bvModal.hide("modal-input");
            this.resetModal();
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
