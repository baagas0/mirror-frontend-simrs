<template>
  <div>
    <b-modal
      id="modal-input"
      size="lg"
      centered
      title="Tambah Data Pembelian"
      header-bg-variant="primary"
      header-text-variant="light"
      @hidden="resetModal"
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
            :disabled="is_data.status"
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
            :disabled="is_data.status"
          ></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Tanggal Pre Order <span class="text-danger">*</span>
          </template>
          <date-picker
            id="tgl_po"
            style="width: 100%"
            format="DD-MM-YYYY"
            v-model="$v.is_data.tgl_po.$model"
            :state="checkIfValid('tgl_po')"
            :disabled="is_data.status"
          ></date-picker>
        </b-form-group>
        <div v-if="!is_data.status" class="d-flex justify-content-end">
          <b-button
            class="mr-2"
            variant="danger"
            @click="resetModal"
            >Reset</b-button
          >
          <b-button
            variant="primary"
            :disabled="busy || !isValid"
            @click="is_data.status = true"
            >Load</b-button
          >
        </div>
        <div v-if="is_data.status">
        <!-- <div> -->
          <hr>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Barang 
            </template>
            <multiselect
              id="barang"
              v-model="$v.is_data_sub.barang.$model"
              :options="list_barang"
              :multiple="false"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              label="nama_barang"
              track-by="id"
              placeholder="-- Pilih Barang --"
              :class="{invalid: checkIfValidSub('barang') === false}"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Total Quantity 
            </template>
            <b-form-input
              :state="checkIfValidSub('total_qty_satuan_simpan')"
              type="number"
              v-model="$v.is_data_sub.total_qty_satuan_simpan.$model"
            ></b-form-input>
          </b-form-group>

          <div class="d-flex justify-content-end mb-3">
            <b-button
              class="mx-1"
              variant="danger"
              @click="resetSub"
              >Reset</b-button
            >
            <b-button
              class="mx-1"
              variant="primary"
              :disabled="busy || !isValidSub"
              @click="loadSub"
              >Load</b-button
            >
          </div>
          <b-table
            :items="table_sub"
            :fields="fields"
            :filter="filter"
            :filter-included-fields="filterOn"
            responsive
            show-empty
            small
            bordered
            striped
            hover
            :busy="tableBusy"
          >
            <template #cell(actions)="item">
              <b-button
                variant="danger"
                @click="deleteSub(item.item)"
                ><i class="ri-delete-bin-2-line"></i></b-button
              >
            </template>
          </b-table>
        </div>


      </b-form>
      <!-- <img :src="src1" /> -->
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-input')">
          Batal
        </b-button>
        <b-button
          variant="primary"
          :disabled="busy || !isValid || !is_data.status || !table_sub.length"
          @click="simpan()"
          >{{ button }}</b-button
        >
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
    name: "modalInput",
    components: {
      Multiselect,
      DatePicker,
    },
    props: [
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
          status: false,
          tgl_po: null,
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
        table_sub: [
          // {
          //   no: 111,
          //   nama_barang: '111',
          //   total_qty_satuan_simpan: '111',
          //   nama_total_qty_satuan_simpan: '1.000',
          // },
          // {
          //   no: 222,
          //   nama_barang: '222',
          //   total_qty_satuan_simpan: '222',
          //   nama_total_qty_satuan_simpan: '2.000',
          // },
          // {
          //   no: 333,
          //   nama_barang: '333',
          //   total_qty_satuan_simpan: '333',
          //   nama_total_qty_satuan_simpan: '3.000',
          // },
        ],
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
      loadSub(){
        const vm = this
        const x = vm.is_data_sub
        console.log('ini data form ', x)
        vm.table_sub.push({
          no: vm.table_sub.length + 1,
          // ...vm.is_data,
          // gudang_id: vm.is_data.gudang.id,
          // supplier_id: vm.is_data.supplier.id,
          ...x,
          nama_total_qty_satuan_simpan: vm.toNumeric(x.total_qty_satuan_simpan),
          ms_barang_id: x.barang.id,
          nama_barang: x.barang.nama_barang,
        })
        console.log('vm.table_sub', vm.table_sub)
        vm.resetSub()
      },
      deleteSub(x){
        const vm = this
        let h = null
        for (let i = 0; i < vm.table_sub.length; i++) {
          const y = vm.table_sub[i];
          //mencari index yang dihapus
          if(y.no == x.no){
            h = i
          }
          //mengurangi no data setelah index dihapus
          if(h !== null){
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
        axios
          .post("pembelian/registerPo", {...vm.is_data, sub_po: vm.table_sub})
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
          status: false,
          tgl_po: null,
          supplier: null,
          gudang: null,
        }
        this.is_data_sub = {
          barang: null,
          total_qty_satuan_simpan: null,
        };
        this.$v.$reset();
      },
      resetSub() {
        this.is_data_sub = {
          barang: null,
          total_qty_satuan_simpan: null,
        };
        this.$v.$reset();
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
      toNumeric(number, type){
        let data = {}
        if(type == 'idr') data = {style: 'currency', currency: 'IDR'}
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    },
  };
  </script>
  