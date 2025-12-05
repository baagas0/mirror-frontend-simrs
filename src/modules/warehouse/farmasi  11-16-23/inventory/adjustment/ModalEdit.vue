<template>
  <div>
    <b-modal
      id="modal-edit"
      size="lg"
      centered
      title="Item Adjustment"
      header-bg-variant="warning"
      header-text-variant="light"
      @hidden="tutupModal"
    >
      <b-form @submit.prevent.default>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Kode Item <span class="text-danger">*</span> </template>
          <b-form-input readonly type="text" v-model="is_data.kode_produk"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Batch <span class="text-danger">*</span> </template>
          <b-form-input readonly type="text" v-model="is_data.kode_batch"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Item <span class="text-danger">*</span> </template>
          <b-form-input readonly type="text" v-model="is_data.nama_barang"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Stock <span class="text-danger">*</span> </template>
          <b-form-input readonly type="text" v-model="is_data.qty"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Adjusment <span class="text-danger">*</span> </template>
          <b-form-input type="number" v-model.number="is_data.qty_stock_adjustment"></b-form-input>
        </b-form-group>
      </b-form>

      <template #modal-footer>
        <b-button variant="secondary" @click=tombolBatal>
          Batal
        </b-button>
        <b-button variant="primary" @click="simpan"> Simpan </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
export default {
  name: "modalEdit",
  props: ["data_edit", "data_adjustment"],
  data() {
    return {
      busy: false,
      button: "Simpan",
      is_data: "",
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
  },
  watch: {
    data_edit(newVal) {
      this.is_data = newVal;
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

      console.log(this.is_data);
      console.log(this.data_adjustment.adjustment_id);

      if (!vm.is_data.qty) {
        return vm.$emit("alertFromChild", {
          variant: "danger",
          msg: _.toUpper("qty kosong"),
          showing: true,
        });
      }
      try {
        let res = await this.$_api.post("subAdjustment/register", {
          qty_stock_adjustment: vm.is_data.qty_stock_adjustment,
          stock_id: vm.is_data.stock_id,
          adjustment_id: vm.data_adjustment.adjustment_id,
        });
        if (res.message === "sukses") {
          vm.$emit("alertFromChild", {
            variant: "success",
            msg: "BERHASIL MENGUBAH DATA",
            showing: true,
          });
          await vm.resetModal();
          vm.$bvModal.hide("modal-edit");
        } else {
          throw res.data;
        }
      } catch (err) {
        console.log(err);
        vm.$emit("alertFromChild", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true,
        });
      }
    },
    numberFormatter(value) {
      this.is_data.qty_stock_adjustment = Number(value.replace(/\D/g, ''))
      return value === '0' ? '' : this.is_data.qty_stock_adjustment.toLocaleString();
    },
    tombolBatal() {
      this.$bvModal.hide('modal-edit')
      this.resetModal()
      // this.tutupModal()
    },
    tutupModal() {
      this.$emit("tutupModal")
    },
    resetModal() {
      this.is_data = "";
    },
  },
};
</script>
