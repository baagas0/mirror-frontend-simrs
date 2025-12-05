<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Edit Data Tipe Asset"
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
              Tipe Fiskal <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.type_fiscal_id.$model"
                :options="list_fiskal"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="name"
                track-by="id"
                placeholder="-- Pilih Tipe Fiskal --"
                :state="checkIfValid('type_fiscal_id')"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              COA Fix Asset <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.coa_fixassets.$model"
                :options="list_coa"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_coa"
                track-by="id"
                placeholder="-- Pilih COA --"
                :state="checkIfValid('coa_fixassets')"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              COA Akumulasi <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.coa_akumulasi.$model"
                :options="list_coa"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_coa"
                track-by="id"
                placeholder="-- Pilih COA --"
                :state="checkIfValid('coa_akumulasi')"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              COA Beban Penyusutan <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="$v.is_data.coa_bebanpenyusutan.$model"
                :options="list_coa"
                :disabled="false"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_coa"
                track-by="id"
                placeholder="-- Pilih COA --"
                :state="checkIfValid('coa_bebanpenyusutan')"
            ></multiselect>
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
    props: ["data_edit", "ep_be", "list_fiskal", "list_coa"],
    components: {
      Multiselect
    },
    data() {
      return {
        busy: false,
        button: "Simpan",
        is_data: null
      };
    },
    computed: {
        computed_val: {
            get(){
                return this.is_data
            },
            set(newVal){
                this.is_data = newVal
            }
        },
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
        data_edit(newVal, oldVal) {
            if(newVal != oldVal && newVal){
                this.is_data = newVal;
                // console.log(newVal)
                for (let i = 0; i < this.list_coa.length; i++) {
                    let x = this.list_coa[i];
                    if(x.code == this.is_data.coa_akumulasi){
                        this.is_data.coa_akumulasi = x
                    }
                    if(x.code == this.is_data.coa_fixassets){
                        this.is_data.coa_fixassets = x
                    }
                    if(x.code == this.is_data.coa_bebanpenyusutan){
                        this.is_data.coa_bebanpenyusutan = x
                    }
                }
                for (let i = 0; i < this.list_fiskal.length; i++) {
                    let x = this.list_fiskal[i];
                    if(x.id == this.is_data.type_fiscal_id){
                        this.is_data.type_fiscal_id = x
                    }
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
        type_fiscal_id: {
          required,
        },
        coa_fixassets: {
          required,
        },
        coa_akumulasi: {
          required,
        },
        coa_bebanpenyusutan: {
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
          vm.is_data.type_fiscal_id = vm.is_data.type_fiscal_id.id
          vm.is_data.coa_akumulasi = vm.is_data.coa_akumulasi.code
          vm.is_data.coa_fixassets = vm.is_data.coa_fixassets.code
          vm.is_data.coa_bebanpenyusutan = vm.is_data.coa_bebanpenyusutan.code
          console.log(vm.is_data, 'ini data');
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
    },
  };
  </script>
  