<template>
  <div>
    <b-modal id="modal-form" size="xl" centered title="Pre Order" header-bg-variant="primary" header-text-variant="light"
      @hidden="resetModal" @show="openModal">
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Supplier <span class="text-danger">*</span>
          </template>
          <multiselect id="supplier" v-model="$v.is_data.supplier.$model" :options="list_supplier" :multiple="false"
            :searchable="true" :close-on-select="true" :show-labels="false" label="nama_supplier" track-by="id"
            placeholder="-- Pilih Supplier --" :class="{ invalid: checkIfValid('supplier') === false }"></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Gudang <span class="text-danger">*</span>
          </template>
          <multiselect id="gudang" v-model="$v.is_data.gudang.$model" :options="list_gudang" :multiple="false"
            :searchable="true" :close-on-select="true" :show-labels="false" label="nama_gudang" track-by="id"
            placeholder="-- Pilih Gudang --" :class="{ invalid: checkIfValid('gudang') === false }"></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3" v-if="is_data.kode_po">
          <template v-slot:label>
            Kode PO <span class="text-danger">*</span>
          </template>
          <b-form-input type="text" v-model="is_data.kode_po" disabled></b-form-input>
        </b-form-group>
        <!-- <b-form-group label-cols-md="3">
          <template v-slot:label>
            Kode PO 
          </template>
          <b-form-input
            :state="checkIfValid('kode_po')"
            type="text"
            v-model="$v.is_data.kode_po.$model"
          ></b-form-input>
        </b-form-group> -->
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Tanggal Pre Order <span class="text-danger">*</span>
          </template>
          <date-picker id="tgl_po" style="width: 100%" format="DD-MM-YYYY" v-model="$v.is_data.tgl_po.$model"
            :state="checkIfValid('tgl_po')"></date-picker>
        </b-form-group>
        <!-- <div class="d-flex justify-content-end">
          <b-button
            class="mr-2"
            variant="danger"
            @click="resetModal"
            >Reset</b-button
          >
          <b-button
            variant="primary"
            :disabled="busy || !isValid"
            >Load</b-button
          >
        </div> -->
        <div>
          <hr>
          <div class="card card-custom" style="border: 1px solid #afafaf;">
            <div class="card-body row">
              <div class="col-6">
                <b-form-group label-cols-md="12">
                  <template v-slot:label>
                    Barang <span class="text-danger">*</span>
                  </template>
                  <multiselect id="barang" v-model="$v.is_data_sub.barang.$model" :options="list_barang" :multiple="false"
                    :searchable="true" :close-on-select="true" :show-labels="false" label="nama_barang" track-by="id"
                    placeholder="-- Pilih Barang --" :class="{ invalid: checkIfValidSub('barang') === false }"
                    :disabled="!isValid"></multiselect>
                </b-form-group>
              </div>
              <div class="col-6">
                <b-form-group label-cols-md="12">
                  <template v-slot:label>
                    Total Quantity <span class="text-danger">*</span>
                  </template>
                  <b-form-input :state="checkIfValidSub('total_qty_satuan_simpan')" type="number"
                    v-model="$v.is_data_sub.total_qty_satuan_simpan.$model" :disabled="!isValid"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-12">
                <div class="d-flex justify-content-end mb-3">
                  <b-button class="mx-1" variant="danger" @click="resetSub">Reset</b-button>
                  <b-button class="mx-1" variant="primary" :disabled="busy || !isValidSub || !isValid"
                    @click="loadSub">Load</b-button>
                </div>
              </div>
              <div class="col-12">
                <b-table :items="table_sub" :fields="fields" :filter="filter" :filter-included-fields="filterOn" responsive
                  show-empty small bordered striped hover :busy="tableBusy">
                  <template #cell(actions)="item">
                    <div class="text-nowrap">
                      <!-- <b-button
                        class="mx-1"
                        variant="warning"
                        @click="editSub(item.item)"
                        ><CIcon name="cil-pencil" /></b-button
                      > -->
                      <b-button variant="danger" @click="deleteSub(item.item)"><i class="ri-delete-bin-2-line"></i></b-button>
                    </div>
                  </template>
                </b-table>
              </div>
            </div>
          </div>

        </div>


      </b-form>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-form')">
          Batal
        </b-button>
        <b-button variant="primary" :disabled="busy || !isValid || !table_sub.length"
          @click="simpan()">{{ button }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash"
import moment from 'moment';
moment.locale('id');
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';

export default {
  name: "modalForm",
  components: {
    Multiselect,
    DatePicker,
  },
  props: [
    'data',
    'list_gudang',
    'list_supplier',
    'list_barang',
  ],
  watch: {
  },
  data() {
    return {
      sample: null,
      is_data: {
        tgl_po: null,
        // kode_po: null,
        supplier: null,
        gudang: null,
      },
      is_data_sub: {
        barang: null,
        total_qty_satuan_simpan: null,
      },

      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },
        {
          key: "nama_barang",
          label: "Barang",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_total_qty_satuan_simpan",
          label: "Total Quantity",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
        },
      ],
      table_sub: [],
      filter: null,
      filterOn: [],
      tableBusy: false,
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
    isValidSub() {
      return !this.$v.is_data_sub.$invalid;
    },
    isDirtySub() {
      return this.$v.is_data_sub.$anyDirty;
    },
  },
  mixins: [validationMixin],
  validations: {
    is_data: {
      // kode_po: { required },
      tgl_po: { required },
      supplier: { required },
      gudang: { required },
    },
    is_data_sub: {
      barang: { required },
      total_qty_satuan_simpan: { required },
    },
  },
  methods: {
    openModal() {
      const vm = this
      // console.log('ini data', vm.data)
      if (vm.data) {
        vm.resetModal()
        vm.busy = true
        vm.is_data = vm.data
        this.is_data.tgl_po = new Date(vm.tgl_po)
        //gudang
        for (let i = 0; i < this.list_gudang.length; i++) {
          const g = this.list_gudang[i];
          if (this.is_data.ms_gudang_id == g.id) {
            this.is_data.gudang = g
            break
          }
        }
        //seupplier
        for (let i = 0; i < this.list_supplier.length; i++) {
          const s = this.list_supplier[i];
          if (this.is_data.ms_suplier_id == s.id) {
            this.is_data.supplier = s
            break
          }
        }
        this.$_api
          .post("subPo/getByIdPembelian", vm.data)
          .then((res) => {
            // console.log('list sub po', res)
            for (let i = 0; i < res.data.length; i++) {
              const x = res.data[i];
              x.no = i + 1
              x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
            }

            vm.table_sub = res.data
            vm.busy = false
          }).catch(err => {
            console.log('err', err)
            vm.busy = false
          })
      }
    },
    loadSub() {
      const vm = this
      const x = vm.is_data_sub
      // console.log('ini data form ', x)
      let add = true
      //perulangan tabel pembelian
      for (let i = 0; i < vm.table_sub.length; i++) {
        const y = vm.table_sub[i];
        if (y.ms_barang_id == x.barang.id) {
          add = false
        }
      }
      if (add) {
        vm.table_sub.push({
          no: vm.table_sub.length + 1,
          // ...vm.is_data,
          // gudang_id: vm.is_data.gudang.id,
          // supplier_id: vm.is_data.supplier.id,
          ...x,
          nama_total_qty_satuan_simpan: vm.toNumeric(x.total_qty_satuan_simpan),
          ms_barang_id: x.barang.ms_barang_id,
          nama_barang: x.barang.nama_barang,
        })
        // console.log('vm.table_sub', vm.table_sub)
        vm.resetSub()
      } else {
        vm.$emit("alertFromChild", {
          variant: "warning",
          msg: "TERDAPAT BARANG YANG SAMA PADA PRE ORDER",
          showing: true,
        });
      }
    },
    editSub(x) {
      const vm = this
      vm.busy = true
      vm.resetSub()
      // console.log('ini data edit', x)
      vm.is_data_sub = x
      //barang
      for (let i = 0; i < vm.list_barang.length; i++) {
        const b = vm.list_barang[i];
        if (vm.is_data.ms_barang_id == b.id) {
          vm.is_data.barang = b
          break
        }
      }
      vm.deleteSub(x)
      vm.busy = false
    },
    deleteSub(x) {
      const vm = this
      let h = null
      for (let i = 0; i < vm.table_sub.length; i++) {
        const y = vm.table_sub[i];
        //mencari index yang dihapus
        if (y.no == x.no) {
          h = i
        }
        //mengurangi no data setelah index dihapus
        if (h !== null) {
          vm.table_sub[i].no -= 1
        }
      }
      //menghapus sesuai index
      vm.table_sub.splice(h, 1)
    },
    simpan() {
      let vm = this;
      vm.busy = true;
      vm.button = "Mohon Tunggu";
      vm.is_data.ms_gudang_id = vm.is_data.gudang.id
      vm.is_data.ms_suplier_id = vm.is_data.supplier.id
      this.$_api
        .post("pembelian/registerPo", { ...vm.is_data, id: vm.is_data.pembelian_id, sub_po: vm.table_sub })
        .then((res) => {
          console.log('ini res regsiterasi po', res)
          if (res.message == "sukses") {
            vm.button = "Simpan";
            vm.busy = false;
            vm.$v.$reset();
            vm.$emit("alertFromChild", {
              variant: "success",
              msg: "BERHASIL MENAMBAHKAN PRE ORDER",
              showing: true,
            });
            this.$bvModal.hide("modal-form");
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
      this.is_data = {
        // kode_po: null,
        tgl_po: null,
        supplier: null,
        gudang: null,
      }
      this.is_data_sub = {
        barang: null,
        total_qty_satuan_simpan: null,
      };
      this.table_sub = []
      this.$v.$reset();
    },
    resetSub() {
      this.is_data_sub = {
        barang: null,
        total_qty_satuan_simpan: null,
      };
      this.$v.is_data_sub.$reset();
    },
    checkIfValid(fieldName) {
      const field = this.$v.is_data[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    checkIfValidSub(fieldName) {
      const field = this.$v.is_data_sub[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    toNumeric(number, type) {
      let data = {}
      if (type == 'idr') data = { style: 'currency', currency: 'IDR' }
      return new Intl.NumberFormat('id-ID', data).format(number)
    }
  },
};
</script>
  