<template>
  <div>
    <b-modal
      id="modal-info"
      size="lg"
      centered
      title="Data Barang"
      header-bg-variant="warning"
      header-text-variant="light"
      @hidden="tutupModal"
    >
      <div v-if="items">
        <b-form v-for="val in items" :key="val.stock_id">
          <b-form-group label-cols-md="3" v-for="key in fields" :key="key">
            <template v-slot:label>
              {{ key }} <span class="text-danger">*</span>
            </template>
            <b-form-input v-model="val[key]" type="text" readonly></b-form-input>
          </b-form-group>
        </b-form>
      </div>
      <div v-else>
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label> Isinya <span class="text-danger">*</span> </template>
            <b-form-input type="text" readonly></b-form-input>
          </b-form-group>
        </b-form>
      </div>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-info')">
          Tutup
        </b-button>
        <!-- <b-button variant="primary" :disabled="busy || !isValid" @click="simpan()">
          {{ button }}
        </b-button> -->
      </template>
    </b-modal>
  </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
// import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
export default {
  name: "modalInfo",
  props: ["data_info"],
  data() {
    return {
      busy: false,
      button: "Simpan",
      is_data: null,
      items: [],
      fields: [],
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
    // isValid() {
    //   return !this.$v.is_data.$invalid;
    // },
    // isDirty() {
    //   return this.$v.is_data.$anyDirty;
    // },
  },
  watch: {
    data_info(newVal) {
      this.is_data = newVal;
      if (this.is_data !== null) {
        this.getData(this.is_data);
      }
    },
  },

  // mixins: [validationMixin],
  // validations: {
  //   is_data: {
  //     nama_produsen: {
  //       required,
  //     },
  //   },
  // },

  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.is_data[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    async getData(x) {
      let vm = this;
      vm.items = [];
      vm.fields = [];
      try {
        let res = await this.$_api.post("adjustment/detailsById/" + x.adjustment_id);
        let z = res.data;
        console.log(z);
        if (z.message === "sukses") {
          vm.items = res.data;
          for (const key in vm.items) {
            if (Object.hasOwnProperty.call(vm.items, key)) {
              const el = vm.items[key];
              // console.log(el);
              vm.fields.push(key);
            }
          }
        } else {
          throw x;
        }
      } catch (err) {
        vm.$bvModal.hide("modal-info");
        vm.$emit("alertFromChild", {
          variant: "danger",
          msg: _.toUpper(err),
          showing: true,
        });
      }
    },
    simpan() {
      let vm = this;
      // if (vm.isValid) {
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
            vm.$bvModal.hide("modal-info");
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
      // }
    },
    tutupModal() {
      this.$emit("tutupModal");
    },
    resetModal() {
      // this.$v.$reset();
      this.is_data = {
        nama_produsen: "",
      };
    },
  },
};
</script>
