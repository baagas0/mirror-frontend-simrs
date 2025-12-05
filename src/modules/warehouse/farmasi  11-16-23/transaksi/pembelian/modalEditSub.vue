<template>
  <div>
    <b-modal
      id="modal-edit-sub"
      size="lg"
      centered
      title="Update Data Master Sub Pembelian"
      header-bg-variant="primary"
      header-text-variant="light"
      @hidden="tutupModal"
    >
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Supplier <span class="text-danger">*</span>
          </template>
          <multiselect
            id="supplier"
            v-model="$v.is_data.supplier.$model"
            :options="list_supplier"
            :multiple="false"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            label="nama_supplier"
            track-by="id"
            placeholder="-- Pilih Supplier --"
            :class="{invalid: checkIfValid('supplier') === false}"
          ></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Gudang <span class="text-danger">*</span>
          </template>
          <multiselect
            id="gudang"
            v-model="$v.is_data.gudang.$model"
            :options="list_gudang"
            :multiple="false"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            label="nama_gudang"
            track-by="id"
            placeholder="-- Pilih Gudang --"
            :class="{invalid: checkIfValid('gudang') === false}"
          ></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            No. Faktur <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('no_faktur')"
            type="text"
            v-model="$v.is_data.no_faktur.$model"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Tanggal Faktur <span class="text-danger">*</span>
          </template>
          <date-picker
            id="tgl_faktur"
            style="width: 100%"
            format="DD-MM-YYYY"
            v-model="$v.is_data.tgl_faktur.$model"
            :state="checkIfValid('tgl_faktur')"
          ></date-picker>
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
  import DatePicker from "vue2-datepicker";
  import 'vue2-datepicker/index.css';
  
  export default {
    name: "modalEdit",
    components: {
      Multiselect,
      DatePicker,
    },
    props: [
      "data_edit",
      'list_gudang',
      'list_supplier',
    ],
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
        //gudang
        for (let i = 0; i < this.list_gudang.length; i++) {
          const g = this.list_gudang[i];
          if(this.is_data.ms_gudang_id == g.id){
            this.is_data.gudang = g
            break
          }
        }
        //seupplier
        for (let i = 0; i < this.list_supplier.length; i++) {
          const s = this.list_supplier[i];
          if(this.is_data.ms_supplier_id == s.id){
            this.is_data.supplier = s
            break
          }
        }
      },
    },
  
    mixins: [validationMixin],
    validations: {
      is_data: {
        no_faktur: { required },
        tgl_faktur: { required },
        supplier: { required },
        gudang: { required },
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
          .post("msGolonganBarang/update", vm.is_data)
          .then((res) => {
            if (res.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH MASTER PEMBELIAN",
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
        this.is_data = {
          no_faktur: null,
          tgl_faktur: null,
          supplier: null,
          gudang: null,
        }
        this.$v.$reset();
      },
    },
  };
  </script>
  