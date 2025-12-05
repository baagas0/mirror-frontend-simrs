<template>
  <div>
    <b-modal
      id="modal-input"
      size="xl"
      centered
      title="Tambah Data Pembelian"
      header-bg-variant="primary"
      header-text-variant="light"
      @hidden="resetModal"
    >
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Supplier 
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
            Gudang 
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
            No. Faktur 
          </template>
          <b-form-input
            :state="checkIfValid('no_faktur')"
            type="text"
            v-model="$v.is_data.no_faktur.$model"
            :disabled="is_data.status"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Tanggal Faktur 
          </template>
          <date-picker
            id="tgl_faktur"
            style="width: 100%"
            format="DD-MM-YYYY"
            v-model="$v.is_data.tgl_faktur.$model"
            :state="checkIfValid('tgl_faktur')"
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
              Kode Batch 
            </template>
            <b-form-input
              :state="checkIfValidSub('kode_batch')"
              type="text"
              v-model="$v.is_data_sub.kode_batch.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Satuan Beli 
            </template>
            <multiselect
              id="satuan_beli"
              v-model="$v.is_data_sub.satuan_beli.$model"
              :options="list_satuan_barang"
              :multiple="false"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              label="nama_satuan"
              track-by="id"
              placeholder="-- Pilih Satuan Beli --"
              :class="{invalid: checkIfValidSub('satuan_beli') === false}"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Harga Beli
            </template>
            <b-form-input
              :state="checkIfValidSub('harga_beli')"
              type="text"
              v-model="$v.is_data_sub.harga_beli.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Quantity Beli 
            </template>
            <b-form-input
              :state="checkIfValidSub('qty_beli')"
              type="text"
              v-model="$v.is_data_sub.qty_beli.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Total Harga Beli
            </template>
            <b-form-input
              :state="checkIfValidSub('total_harga_beli')"
              type="text"
              v-model="is_data_sub.nama_total_harga_beli"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Quantity Satuan Simpan 
            </template>
            <b-form-input
              :state="checkIfValidSub('qty_satuan_simpan')"
              type="text"
              v-model="$v.is_data_sub.qty_satuan_simpan.$model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Harga Satuan Simpan 
            </template>
            <b-form-input
              :state="checkIfValidSub('harga_per_satuan_simpan')"
              type="text"
              v-model="is_data_sub.nama_harga_per_satuan_simpan"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Total Quantity Satuan Simpan 
            </template>
            <b-form-input
              :state="checkIfValidSub('total_qty_satuan_simpan')"
              type="text"
              v-model="is_data_sub.nama_total_qty_satuan_simpan"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Tanggal Kadaluarsa 
            </template>
            <date-picker
              id="tgl_kadaluarsa"
              style="width: 100%"
              format="DD-MM-YYYY"
              v-model="$v.is_data_sub.tgl_kadaluarsa.$model"
              :state="checkIfValidSub('tgl_kadaluarsa')"
            ></date-picker>
          </b-form-group>

          <div class="d-flex justify-content-end mb-3">
            <b-button
              class="mr-2"
              variant="danger"
              @click="resetSub"
              >Reset</b-button
            >
            <b-button
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
                ><CIcon name="cil-trash" /></b-button
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
      'list_satuan_barang',
    ],
    data() {
      return {
        sample: null,
        is_data: {
          status: false,
          no_faktur: null,
          tgl_faktur: null,
          supplier: null,
          gudang: null,
        },
        is_data_sub: {
          barang: null,
          satuan_beli: null,
          kode_batch: null,
          qty_beli: null,
          qty_satuan_simpan: null,
          total_qty_satuan_simpan: null,
          harga_beli: null,
          harga_per_satuan_simpan: null,
          total_harga_beli: null,
          tgl_kadaluarsa: null,
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
            key: "kode_batch",
            label: "Kode",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_satuan_beli",
            label: "Satuan",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_beli",
            label: "Harga Beli",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_qty_beli",
            label: "QYT Beli",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_harga_beli",
            label: "Total harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_qty_satuan_simpan",
            label: "QYT",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_per_satuan_simpan",
            label: "Harga",
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
            key: "nama_tgl_kadaluarsa",
            label: "Kadaluarsa",
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
          //   no: 1,
          //   ms_barang_id: '8e8777af-9879-4e6b-8da5-0394b4229f60',
          //   nama_barang: 'Bodrex',
          //   kode_batch: 'BDR',
          //   ms_satuan_beli_id: 'afe13b5d-c21c-45b0-97cb-b75922bf72b7',
          //   nama_satuan_beli: 'Pack',
          //   harga_beli: 5000,
          //   nama_harga_beli: '5.000',
          //   qty_beli: 10,
          //   nama_qty_beli: '10',
          //   total_harga_beli: 50000,
          //   nama_total_harga_beli: '50.000',
          //   qty_satuan_simpan: 4,
          //   nama_qty_satuan_simpan: '4',
          //   harga_per_satuan_simpan: 1250,
          //   nama_harga_per_satuan_simpan: '1.250',
          //   total_qty_satuan_simpan: 400,
          //   nama_total_qty_satuan_simpan: '400',
          //   tgl_kadaluarsa: new Date(),
          //   nama_tgl_kadaluarsa: moment().format('DD/MM/YYYY'),
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
        no_faktur: { required },
        tgl_faktur: { required },
        supplier: { required },
        gudang: { required },
      },
      is_data_sub: {
        barang: { required },
        satuan_beli: { required },
        kode_batch: { required },
        qty_beli: { required },
        qty_satuan_simpan: { required },
        total_qty_satuan_simpan: { required },
        harga_beli: { required },
        harga_per_satuan_simpan: { required },
        total_harga_beli: { required },
        tgl_kadaluarsa: { required },
      },
    },
    watch: {
      'is_data_sub.barang'(newVar, oldVar){
        if(newVar != oldVar && newVar !== null){
          const x = this.is_data_sub
          x.harga_beli = newVar.harga_pokok
          x.qty_beli = 1
          x.qty_satuan_simpan = newVar.qjb
          x.satuan_beli = {id: newVar.ms_satuan_jual_id, nama_satuan: newVar.nama_satuan_jual}
          console.log(x)
          console.log(newVar)
        }
      }, 
      'is_data_sub.qty_beli'(newVar, oldVar){
        if(newVar !== oldVar && newVar !== null){
          if(this.is_data_sub.harga_beli !== null){
            this.is_data_sub.total_harga_beli = newVar * this.is_data_sub.harga_beli
            this.is_data_sub.nama_total_harga_beli = this.toNumeric(this.is_data_sub.total_harga_beli, 'idr')
          }
          if(this.is_data_sub.qty_satuan_simpan !== null){
            this.is_data_sub.total_qty_satuan_simpan = newVar * this.is_data_sub.qty_satuan_simpan
            this.is_data_sub.nama_total_qty_satuan_simpan = this.toNumeric(this.is_data_sub.total_qty_satuan_simpan)
          }
        }
      },
      'is_data_sub.qty_satuan_simpan'(newVar, oldVar){
        if(newVar !== oldVar && newVar !== null){
          if(this.is_data_sub.harga_beli !== null){
            this.is_data_sub.harga_per_satuan_simpan = this.is_data_sub.harga_beli / newVar
            this.is_data_sub.nama_harga_per_satuan_simpan = this.toNumeric(this.is_data_sub.harga_per_satuan_simpan, 'idr')
          }
          if(this.is_data_sub.qty_beli !== null){
            this.is_data_sub.total_qty_satuan_simpan = this.is_data_sub.qty_beli * newVar
            this.is_data_sub.nama_total_qty_satuan_simpan = this.toNumeric(this.is_data_sub.total_qty_satuan_simpan)
          }
        }
      },
      'is_data_sub.harga_beli'(newVar, oldVar){
        if(newVar !== oldVar && newVar !== null){
          if(this.is_data_sub.qty_beli !== null){
            this.is_data_sub.total_harga_beli = newVar * this.is_data_sub.qty_beli
            this.is_data_sub.nama_total_harga_beli = this.toNumeric(this.is_data_sub.total_harga_beli, 'idr')
          }
          if(this.is_data_sub.qty_satuan_simpan !== null){
            this.is_data_sub.harga_per_satuan_simpan = newVar / this.is_data_sub.qty_satuan_simpan
            this.is_data_sub.nama_harga_per_satuan_simpan = this.toNumeric(this.is_data_sub.harga_per_satuan_simpan, 'idr')
          }
        }
      },
    },
    methods: {
      loadSub(){
        const vm = this
        const x = vm.is_data_sub
        // console.log('ini data form ', x)
        vm.table_sub.push({
          no: vm.table_sub.length + 1,
          ...x,
          nama_qty_beli: vm.toNumeric(x.qty_beli),
          nama_harga_beli: vm.toNumeric(x.total_harga_beli, 'idr'),
          nama_qty_satuan_simpan: vm.toNumeric(x.qty_satuan_simpan),
          ms_barang_id: x.barang.id,
          // ms_satuan_id: x.satuan.id,
          nama_barang: x.barang.nama_barang,
          ms_satuan_beli_id: x.satuan_beli.id,
          nama_satuan_beli: x.satuan_beli.nama_satuan,
          tgl_kadaluarsa: moment(x.tgl_kadaluarsa).format('YYYY-MM-DD'),
          nama_tgl_kadaluarsa: moment(x.tgl_kadaluarsa).format('DD/MM/YYYY')
        })
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
          .post(ipBackend + "/pembelian/register", {...vm.is_data, sub_pembelian: vm.table_sub})
          .then((res) => {
            console.log('ini res regsiterasi pembelian', res)
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENAMBAHKAN PEMBELIAN",
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
        this.is_data = {
          status: false,
          no_faktur: null,
          tgl_faktur: null,
          supplier: null,
          gudang: null,
        }
        this.is_data_sub = {
          barang: null,
          satuan_beli: null,
          kode_batch: null,
          qty_beli: null,
          qty_satuan_simpan: null,
          total_qty_satuan_simpan: null,
          harga_beli: null,
          harga_per_satuan_simpan: null,
          total_harga_beli: null,
          tgl_kadaluarsa: null,
        };
        this.$v.$reset();
      },
      resetSub() {
        this.is_data_sub = {
          barang: null,
          satuan_beli: null,
          kode_batch: null,
          qty_beli: null,
          qty_satuan_simpan: null,
          total_qty_satuan_simpan: null,
          harga_beli: null,
          harga_per_satuan_simpan: null,
          total_harga_beli: null,
          tgl_kadaluarsa: null,
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
  