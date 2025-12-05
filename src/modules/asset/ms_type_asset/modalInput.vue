<template>
    <div>
      <b-modal
        id="modal-input"
        size="lg"
        centered
        title="Tambah Data Tipe Fiskal"
        header-bg-variant="primary"
        header-text-variant="light"
        @hidden="resetModal"
      >
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('name')"
              type="text"
              v-model="$v.is_data.name.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Tipe Fiskal <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.fiskal.$model"
                :options="list_fiskal"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="name"
                track-by="id"
                placeholder="-- Pilih Tipe Fiskal --"
                :state="checkIfValid('fiskal')"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              COA Fix Asset <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.fixasset.$model"
                :options="list_coa"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_coa"
                track-by="id"
                placeholder="-- Pilih COA --"
                :state="checkIfValid('fixasset')"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              COA Akumulasi <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.akumulasi.$model"
                :options="list_coa"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_coa"
                track-by="id"
                placeholder="-- Pilih COA --"
                :state="checkIfValid('akumulasi')"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              COA Beban Penyusutan <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.bebanpenyusutan.$model"
                :options="list_coa"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_coa"
                track-by="id"
                placeholder="-- Pilih COA --"
                :state="checkIfValid('bebanpenyusutan')"
            ></multiselect>
          </b-form-group>
        </b-form>
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
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
  import Multiselect from "vue-multiselect";
import { useGetAxios } from "../../../composables/useAxios";
  export default {
    name: "modalInput",
    props: ["ep_be", "list_fiskal", "list_coa"],
    components: {
      Multiselect
    },
    data() {
      return {
        is_data: {
          name: "",
          fiskal: "",
          type_fiscal_id: "",
          fixasset: "",
          coa_fixassets: "",
          akumulasi: "",
          coa_akumulasi: "",
          bebanpenyusutan: "",
          coa_bebanpenyusutan: "",
        },
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
        name: {
          required,
        },
        fiskal: {
          required,
        },
        fixasset: {
          required,
        },
        akumulasi: {
          required,
        },
        bebanpenyusutan: {
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
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        vm.is_data.type_fiscal_id = vm.is_data.fiskal.id
        vm.is_data.coa_akumulasi = vm.is_data.akumulasi.code
        vm.is_data.coa_fixassets = vm.is_data.fixasset.code
        vm.is_data.coa_bebanpenyusutan = vm.is_data.bebanpenyusutan.code
        // console.log(vm.is_data, 'ini data');
        // axios
        //   .post(this.ep_be + "/register", vm.is_data)
        //   .then((res) => {
        //     if (res.message == "sukses") {
        //       vm.button = "Simpan";
        //       vm.busy = false;
        //       vm.$emit("alertFromChild", {
        //         variant: "success",
        //         msg: "BERHASIL MENDAFTARKAN DATA",
        //         showing: true,
        //       });
        //       this.$bvModal.hide("modal-input");
        //       this.resetModal();
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
        //     console.log(err);
        //     vm.button = "Simpan";
        //     vm.busy = false;
        //     vm.$emit("alertFromChild", {
        //       variant: "danger",
        //       msg: "TERJADI KESALAHAN PADA SERVER",
        //       showing: true,
        //     });
        //   });
        try {
          const { res, err } = await useGetAxios(this.ep_be + "/register", vm.is_data)
          if (res) {
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
      },
      resetModal() {
        this.$v.$reset();
        this.is_data = {
          name: "",
          fiskal: "",
          type_fiscal_id: "",
          fixasset: "",
          coa_fixassets: "",
          akumulasi: "",
          coa_akumulasi: "",
          bebanpenyusutan: "",
          coa_bebanpenyusutan: "",
        };
      },
    },
  };
  </script>
  