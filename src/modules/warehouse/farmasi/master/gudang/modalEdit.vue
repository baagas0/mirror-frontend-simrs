<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Update Data Master Golongan Obat"
        header-bg-variant="primary"
        header-text-variant="light"
        @hidden="tutupModal"
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
  import Multiselect from "vue-multiselect";

  export default {
    name: "modalEdit",
    components: {
        Multiselect
    },
    props: ["data_edit", "gudang_utama"],
    data() {
      return {
        busy: false,
        button: "Simpan",
        is_data: {
          nama_gudang: "",
          tipe_gudang: "",
          ms_gudang_utama_id: "",
          gudang_id: "",
          id: "",
        },
        is_utama: "0",
        options: [
            {value: '0', text: "Utama"},
            {value: '1', text: "Bukan"}
        ],
      };
    },
    computed: {
      computed_val: {
        get() {
          return this.is_data;
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
        this.is_utama = `${newVal.is_utama}`
        this.is_data.nama_gudang = newVal.nama_gudang
        this.is_data.tipe_gudang = newVal.tipe_gudang
        this.is_data.id = newVal.id
        if(newVal.is_utama == '1'){
            for (let i = 0; i < this.gudang_utama.length; i++) {
                let x = this.gudang_utama[i];
                if(x.ms_gudang_utama_id == newVal.ms_gudang_utama_id){
                    this.is_data.gudang_id = x
                }
            }
        }
        console.log(newVal, 'itikiwirrr');
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
        }else if(vm.is_utama == '0'){
            vm.is_data.ms_gudang_utama_id = vm.is_data.id
        }
        axios
          .post(ipBackend + "msGudang/update", vm.is_data)
          .then((res) => {
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH MASTER GUDANG",
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
          nama_golongan_barang: "",
        };
      },
    },
  };
  </script>
  