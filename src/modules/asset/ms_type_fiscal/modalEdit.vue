<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Edit Data Tipe Fiskal"
        header-bg-variant="warning"
        header-text-variant="light"
        @hidden="tutupModal"
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
              Masa Manfaat (Tahun) <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('masa_manfaat')"
              type="number"
              v-model="$v.is_data.masa_manfaat.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Tarif Penyusutan (%) <span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('tarif_penyusutan')"
              type="number"
              v-model="$v.is_data.tarif_penyusutan.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Metode Penyusutan <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.penyusutan.$model"
                :options="list_penyusutan"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="name"
                track-by="id"
                placeholder="-- Pilih Metode Penyusutan --"
                :state="checkIfValid('penyusutan')"
                @input="itikiwir(is_data.penyusutan)"
            ></multiselect>
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
  import Multiselect from "vue-multiselect";
import { useGetAxios } from "../../../composables/useAxios";
  export default {
    name: "modalEdit",
    props: ["data_edit", "ep_be", "list_penyusutan"],
    components: {
      Multiselect
    },
    data() {
      return {
        busy: false,
        button: "Simpan",
        is_data: {
          name: "",
          masa_manfaat: "",
          tarif_penyusutan: "",
          penyusutan: "",
          metode_penyusutan_id: "",
          status: "",
        },
        options: [
            {value: "1", text: "Aktif"},
            {value: "0", text: "Tidak Aktif"},
        ],
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
    watch: {
      data_edit() {
        this.is_data = this.data_edit;
        for (let i = 0; i < this.list_penyusutan.length; i++) {
          let x = this.list_penyusutan[i];
          if(x.id == this.is_data.metode_penyusutan_id){
            this.is_data.penyusutan = x
          }
        }
      },
    },
  
    mixins: [validationMixin],
    validations: {
      is_data: {
        name: {
          required,
        },
        masa_manfaat: {
          required,
        },
        tarif_penyusutan: {
          required,
        },
        penyusutan: {
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
          vm.is_data.metode_penyusutan_id = vm.is_data.penyusutan.id
          // console.log(vm.is_data, 'ini data');
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
            const { res } = await useGetAxios(this.ep_be + "/update", vm.is_data)
            if (res) {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH DATA",
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
          masa_manfaat: "",
          status: "",
        };
      },
    },
  };
  </script>
  