<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Edit Data Tingkat Asset"
        header-bg-variant="warning"
        header-text-variant="light"
        @hidden="tutupModal"
      >
        <b-form>
            <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama<span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('name')"
              type="text"
              v-model="$v.is_data.name.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Urutan <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('sequence')"
              type="number"
              v-model="$v.is_data.sequence.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Status <span class="text-danger">*</span>
            </template>
            <b-form-select
              :options="options"
              :state="checkIfValid('status')"
              v-model="$v.is_data.status.$model"
            ></b-form-select>
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
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
import { useGetAxios } from "../../../composables/useAxios";
  export default {
    name: "modalEdit",
    props: ["data_edit", "ep_be"],
    data() {
      return {
        busy: false,
        button: "Simpan",
        is_data: {
          name: "",
          sequence: "",
          status: "",
        },
        options: [
            {value: "1", text: "Aktif"},
            {value: "0", text: "Tidak Aktif"},
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
        name: {
          required,
        },
        sequence: {
          required,
        },
        status: {
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
      async simpan() {
        let vm = this;
        if (vm.isValid) {
          vm.busy = true;
          vm.button = "Mohon Tunggu";
          // axios
          //   .post(this.ep_be + "/update", vm.is_data)
          //   .then((res) => {
          //     if (res.message == "sukses") {
          //       vm.button = "Simpan";
          //       vm.busy = false;
          //       vm.$emit("alertFromChild", {
          //         variant: "success",
          //         msg: "BERHASIL MENGUBAH DATA",
          //         showing: true,
          //       });
          //       vm.$bvModal.hide("modal-edit");
          //       vm.resetModal();
          //     } else {
          //       vm.button = "Simpan";
          //       vm.busy = false;
          //       vm.$emit("alertFromChild", {
          //         variant: "danger",
          //         msg: _.toUpper(res.message),
          //         showing: true,
          //       });
          //     }
          //   })
          //   .catch((err) => {
          //       console.log(err);
          //     vm.button = "Simpan";
          //     vm.busy = false;
          //     vm.$emit("alertFromChild", {
          //       variant: "danger",
          //       msg: "TERJADI KESALAHAN PADA SERVER",
          //       showing: true,
          //     });
          //   });

          try {
            const { res, err } = await useGetAxios(this.ep_be + "/update", vm.is_data)
            if (res) {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MEMPERBARUI DATA",
                showing: true,
              });
              this.$bvModal.hide("modal-input");
              this.resetModal();
            } else {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "danger",
                msg: _.toUpper(err.message),
                showing: true,
              });
            }
          } catch (err) {
            console.log(err);
            vm.button = "Simpan";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "danger",
              msg: "TERJADI KESALAHAN PADA SERVER",
              showing: true,
            });
          }
        }
      },
      tutupModal() {
        this.$emit("tutupModal");
      },
      resetModal() {
        this.$v.$reset();
        this.is_data = {
          name: "",
          remark: "",
          sequence: "",
          status: "",
        };
      },
    },
  };
  </script>
  