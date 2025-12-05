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
        <b-card no-body class="mb-1" v-for="(val, idx) in items" :key="val.stock_id">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle="`accordion-${idx + 1}`" variant="secondary"
              >Batch {{ val.kode_batch }}</b-button
            >
          </b-card-header>
          <b-collapse
            :id="`accordion-${idx + 1}`"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-form>
                <b-form-group label-cols-md="3" v-for="key in fields" :key="key">
                  <template v-slot:label>
                    {{ key }} <span class="text-danger">*</span>
                  </template>
                  <b-form-input v-model="val[key]" type="text" readonly></b-form-input>
                </b-form-group>
              </b-form>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- <b-form v-for="(val) in items" :key="val.stock_id">
                <b-form-group label-cols-md="3" v-for="key in fields" :key="key">
                  <template v-slot:label>
                    {{ key }} <span class="text-danger">*</span>
                  </template>
                  <b-form-input v-model="val[key]" type="text" readonly></b-form-input>
                </b-form-group>
              </b-form> -->
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
        <b-button variant="secondary" @click="$bvModal.hide('modal-info')"> Tutup </b-button>
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
      let vm = this
      vm.items = [];
      vm.fields = [];
      try {
        let res = await axios.post(ipBackend + "/stock/detailStockBarangByGudang", {
          ms_barang_id: x.ms_barang_id,
          ms_gudang_id: x.ms_gudang_id,
        });
        let z = res.data;
        if (z.message === "sukses") {
          vm.items = res.data.data;
          for (const key in vm.items[0]) {
            if (Object.hasOwnProperty.call(vm.items[0], key)) {
              const el = vm.items[0][key];
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
        .post(ipBackend + "/msProdusen/update", vm.is_data)
        .then((res) => {
          if (res.data.message == "sukses") {
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
              msg: _.toUpper(res.data.message),
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
