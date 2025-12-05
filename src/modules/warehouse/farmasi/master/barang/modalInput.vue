<template>
  <div>
    <b-modal
      id="modal-input"
      size="lg"
      centered
      title="Tambah Data Master Barang"
      header-bg-variant="primary"
      header-text-variant="light"
      @hidden="resetModal"
    >
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Nama Barang <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('nama_barang')"
            type="text"
            v-model="$v.is_data.nama_barang.$model"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Kelas Terapi <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.ms_kelas_terapi_id.$model"
            :options="option_kelas_terapi"
            :state="checkIfValid('ms_kelas_terapi_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Golongan Barang <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.ms_golongan_barang_id.$model"
            :options="option_golongan_barang"
            :state="checkIfValid('ms_golongan_barang_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Produsen <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.ms_produsen_id.$model"
            :options="option_produsen"
            :state="checkIfValid('ms_produsen_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Jenis Obat <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.ms_jenis_obat_id.$model"
            :options="option_jenis_obat"
            :state="checkIfValid('ms_jenis_obat_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Satuan Barang <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.ms_satuan_barang_id.$model"
            :options="option_satuan_barang"
            :state="checkIfValid('ms_satuan_barang_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Satuan Jual <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.ms_satuan_jual_id.$model"
            :options="option_satuan_barang"
            :state="checkIfValid('ms_satuan_jual_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Kode Produk <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('kode_produk')"
            type="text"
            v-model="$v.is_data.kode_produk.$model"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            QJB <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('qjb')"
            type="number"
            v-model="$v.is_data.qjb.$model"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Komposisi <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('komposisi')"
            type="text"
            v-model="$v.is_data.komposisi.$model"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Formula <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="$v.is_data.formula_id.$model"
            :options="option_formula"
            :state="checkIfValid('formula_id')"
          ></b-form-select>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Harga Pokok <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('harga_pokok')"
            type="number"
            v-model="$v.is_data.harga_pokok.$model"
          ></b-form-input>
        </b-form-group>
        <!-- <b-form-group label-cols-md="3">
          <template v-slot:label>
            Harga Tertinggi <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('harga_tertinggi')"
            type="number"
            v-model="$v.is_data.harga_tertinggi.$model"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Harga Beli Terakhir <span class="text-danger">*</span>
          </template>
          <b-form-input
            :state="checkIfValid('harga_beli_terakhir')"
            type="number"
            v-model="$v.is_data.harga_beli_terakhir.$model"
          ></b-form-input>
        </b-form-group> -->

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
  
  export default {
    name: "modalInput",
    props: [
      'option_satuan_barang',
      'option_kelas_terapi',
      'option_golongan_barang',
      'option_produsen',
      'option_jenis_obat',
      'option_formula',
    ],
    data() {
      return {
        is_data: {
          nama_barang: null,
          ms_satuan_barang_id: null,
          ms_kelas_terapi_id: null,
          ms_golongan_barang_id: null,
          ms_produsen_id: null,
          ms_jenis_obat_id: null,
          ms_satuan_jual_id: null,
          kode_produk: null,
          qjb: null,
          komposisi: null,
          formula_id: null,
          harga_pokok: null,
          // harga_tertinggi: null,
          // harga_beli_terakhir: null,
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
        nama_barang: { required },
        ms_satuan_barang_id: { required },
        ms_kelas_terapi_id: { required },
        ms_golongan_barang_id: { required },
        ms_produsen_id: { required },
        ms_jenis_obat_id: { required },
        ms_satuan_jual_id: { required },
        kode_produk: { required },
        qjb: { required },
        komposisi: {  },
        formula_id: {  },
        harga_pokok: { required },
        // harga_tertinggi: { required },
        // harga_beli_terakhir: { required },
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
          .post(ipBackend + "msBarang/register", vm.is_data)
          .then((res) => {
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENDAFTARKAN MASTER BARANG",
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
          nama_barang: null,
          ms_satuan_barang_id: null,
          ms_kelas_terapi_id: null,
          ms_golongan_barang_id: null,
          ms_produsen_id: null,
          ms_jenis_obat_id: null,
          ms_satuan_jual_id: null,
          kode_produk: null,
          qjb: null,
          komposisi: null,
          formula_id: null,
          harga_pokok: null,
          harga_tertinggi: null,
          harga_beli_terakhir: null,
        };
      },
    },
  };
</script>
  