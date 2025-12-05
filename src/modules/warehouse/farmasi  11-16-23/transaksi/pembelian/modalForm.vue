<template>
  <div>
    <b-modal
      id="modal-form-pembelian"
      size="xl"
      centered
      title="Pembelian"
      header-bg-variant="primary"
      header-text-variant="light"
      @hidden="resetModal"
      @show="openModal"
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
            :disabled="status >= 2"
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
            :disabled="status >= 2"
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
            :disabled="status >= 2"
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
            :disabled="status >= 2"
          ></date-picker>
        </b-form-group>
        <b-form-group label-cols-md="3" v-if="is_data.kode_po">
          <template v-slot:label>
            Kode PO 
          </template>
          <b-form-input
            type="text"
            v-model="is_data.kode_po"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3" v-if="is_data.tgl_po">
          <template v-slot:label>
            Tanggal PO 
          </template>
          <date-picker
            id="nama_tgl_po"
            style="width: 100%"
            format="DD-MM-YYYY"
            v-model="is_data.nama_tgl_po"
            disabled
          ></date-picker>
        </b-form-group>
        <b-form-group label-cols-md="3" v-if="status >= 2">
          <template v-slot:label>
            Total Pembelian 
          </template>
          <b-form-input
            type="text"
            v-model="is_data.nama_total_pembelian"
            disabled
          ></b-form-input>
        </b-form-group>
        <div v-if="data.tgl_po">
          <hr>
          <h5 class="mb-3">Data PO</h5>
          <b-table
            :items="table_po"
            :fields="fields_po"
            :filter="filter"
            :filter-included-fields="filterOn"
            responsive
            show-empty
            small
            bordered
            striped
            hover
            :busy="busy"
          >
          </b-table>
        </div>
        <div>
          <div v-if="status == 1" class="">
            <hr>
            <b-form-group label-cols-md="3">
              <template v-slot:label>
                Barang <span class="text-danger">*</span>
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
                Kode Batch <span class="text-danger">*</span>
              </template>
              <b-form-input
                :state="checkIfValidSub('kode_batch')"
                type="text"
                v-model="$v.is_data_sub.kode_batch.$model"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-cols-md="3">
              <template v-slot:label>
                Satuan Beli <span class="text-danger">*</span>
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
                Harga Beli<span class="text-danger">*</span>
              </template>
              <b-form-input
                :state="checkIfValidSub('harga_beli')"
                type="text"
                v-model="$v.is_data_sub.harga_beli.$model"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-cols-md="3">
              <template v-slot:label>
                Quantity Beli <span class="text-danger">*</span>
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
                Quantity Satuan Simpan <span class="text-danger">*</span>
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
                Tanggal Kadaluarsa <span class="text-danger">*</span>
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
                v-if="is_data_sub.sub_pembelian_id"
                variant="warning"
                :disabled="busy || !isValidSub"
                @click="loadSub"
                >Simpan</b-button
              >
              <b-button
                v-else
                variant="primary"
                :disabled="busy || !isValidSub"
                @click="loadSub"
                >Load</b-button
              >
            </div>
          </div>
          <hr>
          <h5 class="mb-3">Data Pembelian</h5>
          <b-table
            :items="table_sub"
            :fields="fields_sub"
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
              <div class="text-nowrap" v-if="status == 1">
                <!-- <b-button
                  class="mx-1"
                  variant="warning"
                  @click="editSub(item.item)"
                  :disabled="status >= 2"
                  ><i class="ri-edit-2-line"></i></b-button
                > -->
                <b-button
                  variant="danger"
                  @click="deleteSub(item.item)"
                  :disabled="status >= 2"
                  ><i class="ri-delete-bin-2-line"></i></b-button
                >
              </div>
            </template>
          </b-table>
        </div>


      </b-form>
      <!-- <img :src="src1" /> -->
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-form-pembelian')">
          Batal
        </b-button>
        <b-button
          v-if="status == 1"
          variant="primary"
          :disabled="busy || !isValid || !table_sub.length"
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
      'data',
    ],
    data() {
      return {
        data_sementara: {},
        sample: null,
        is_data: {
          no_faktur: null,
          tgl_faktur: null,
          supplier: null,
          gudang: null,
        },
        is_data_sub: {
          barang: null,
          satuan_beli: null,
          kode_batch: null,
          qty_beli: 1,
          qty_satuan_simpan: 1,
          total_qty_satuan_simpan: null,
          harga_beli: null,
          harga_per_satuan_simpan: null,
          total_harga_beli: null,
          tgl_kadaluarsa: null,
        },
        
        fields_sub: [
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
            label: "Kode Batch",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_satuan",
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
            label: "QTY Beli",
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
            label: "QTY",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_per_satuan_simpan",
            label: "Harga (1 QTY)",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_qty_satuan_simpan",
            label: "Total QTY",
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
        table_sub: [],
        fields_po: [
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
            label: "Total Quantity PO",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "total_batch",
            label: "Total Batch",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_qty_beli",
            label: "Total Quantity Beli",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
        ],
        table_po: [],
        filter: null,
        filterOn: [],
        tableBusy: false,
        src1: "",
        selected: null,
        busy: false,
        button: "Simpan",
        list_gudang: [],
        list_supplier: [],
        list_barang: [],
        list_satuan_barang: [],
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
      status() {
        return this.data ? this.status_pembelian : 1;
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
        if(newVar != oldVar && newVar !== null && !this.is_data.edit_barang){
          const x = this.is_data_sub
          x.harga_beli = newVar.harga_pokok
          x.qty_beli = 1
          x.qty_satuan_simpan = newVar.qjb
          x.satuan_beli = {id: newVar.ms_satuan_jual_id, nama_satuan: newVar.nama_satuan_jual}
          // console.log(x)
          // console.log(newVar)
        }
        this.is_data.edit_barang = false
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
    async created() {
      //supplier
      let list_supplier = await this.$_api.post("msSupplier/list");
      this.list_supplier = list_supplier.status == 200 ? list_supplier.data.map(x => { return x }) : []
      //gudang
      let list_gudang = await this.$_api.post("msGudang/list");
      this.list_gudang = list_gudang.status == 200 ? list_gudang.data.map(x => { return x }) : []
      //barang
      let list_barang = await this.$_api.post("msBarang/list");
      this.list_barang = list_barang.status == 200 ? list_barang.data.map(x => { return x }) : []
      //satuan barang
      let list_satuan_barang = await this.$_api.post("msSatuanBarang/list");
      this.list_satuan_barang = list_satuan_barang.status == 200 ? list_satuan_barang.data.map(x => { return x }) : []
    },
    methods: {
      openModal(){
        const vm = this
        // console.log('ini data modal form pembelian', vm.data)
        if(vm.data){
          vm.resetModal()
          vm.busy = true
          vm.is_data = JSON.parse(JSON.stringify(vm.data))
          // ===== jika punya po =====
          if(vm.tgl_po){
            vm.is_data.nama_tgl_po = new Date(vm.tgl_po)
            // console.log('ini po ke pembelian')
            axios
            .post("subPo/getByIdPembelian", vm.data)
            .then((res)=>{
              // console.log('list sub po', res)
              for (let i = 0; i < res.data.length; i++) {
                const x = res.data[i];
                x.no = i+1
                x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
                x.total_batch = 0
                x.total_qty_beli = 0
                x.nama_total_qty_beli = '0'
              }
              vm.table_po = res.data
              // vm.busy = false
              
              // ===== get data sub pembelian =====
              axios
              .post("subPembelian/getByIdPembelian", {ms_pembelian_id: vm.pembelian_id})
              .then((res)=>{
                // console.log('list sub pembelian', res)
                for (let i = 0; i < res.data.length; i++) {
                  const x = res.data[i];
                  x.no = i+1
                  x.nama_harga_beli = vm.toNumeric(x.harga_beli, 'idr')
                  x.nama_qty_beli = vm.toNumeric(x.qty_beli)
                  x.nama_qty_satuan_simpan = vm.toNumeric(x.qty_satuan_simpan)
                  x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
                  x.nama_total_harga_beli = vm.toNumeric(x.total_harga_beli, 'idr')
                  x.nama_harga_per_satuan_simpan = vm.toNumeric(x.harga_per_satuan_simpan, 'idr')
                  x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
                  x.nama_tgl_kadaluarsa = moment(x.tgl_kadaluarsa).format('DD/MM/YYYY')
                  
                  //perulangan tabel po
                  // console.log('vm.table_po0000000000000000000000', vm.table_po)
                  for (let o = 0; o < vm.table_po.length; o++) {
                    const y = vm.table_po[o];
                    if(y.ms_barang_id == x.ms_barang_id){
                      // console.log('haloooooooooooo', o)
                      y.total_batch++
                      y.total_qty_beli = y.total_qty_beli + x.total_qty_satuan_simpan
                      y.nama_total_qty_beli = vm.toNumeric(y.total_qty_beli)
                    }
                  }
                }
                vm.table_sub = res.data
                vm.busy = false
              }).catch(err=>{
                console.log('err', err)
                vm.busy = false
              })
            }).catch(err=>{
              console.log('err', err)
              vm.busy = false
            })
          }
          // ===== data default =====
          vm.is_data.tgl_faktur = vm.tgl_faktur ? new Date(vm.tgl_faktur) : new Date()
          vm.is_data.nama_total_pembelian = vm.toNumeric(vm.total_pembelian, 'idr')
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
            if(this.is_data.ms_suplier_id == s.id){
              this.is_data.supplier = s
              break
            }
          }
        }
      },
      loadSub(){
        const vm = this
        const x = vm.is_data_sub
        // console.log('ini data form ', x.satuan_beli)
        let add = true
        //perulangan tabel pembelian
        // for (let i = 0; i < vm.table_sub.length; i++) {
        //   const y = vm.table_sub[i];
        //   if(y.ms_barang_id == x.barang.id && y.kode_batch == x.kode_batch){
        //     add = false
        //   }
        // }
        let table_po = JSON.parse(JSON.stringify(vm.table_po))
        vm.table_po = []
        //perulangan tabel po
        for (let i = 0; i < table_po.length; i++) {
          // nama_total_qty_beli
          const y = table_po[i];
          if(y.ms_barang_id == x.barang.id){
            y.total_batch++
            y.total_qty_beli = y.total_qty_beli + x.total_qty_satuan_simpan
            y.nama_total_qty_beli = vm.toNumeric(y.total_qty_beli)
          }
        }
        vm.table_po = table_po
        if(add){
          vm.table_sub.push({
            ...x,
            no: vm.table_sub.length + 1,
            nama_qty_beli: vm.toNumeric(x.qty_beli),
            nama_harga_beli: vm.toNumeric(x.total_harga_beli, 'idr'),
            nama_qty_satuan_simpan: vm.toNumeric(x.qty_satuan_simpan),
            ms_barang_id: x.barang.id,
            nama_barang: x.barang.nama_barang,
            ms_satuan_beli_id: x.satuan_beli.id,
            nama_satuan: x.satuan_beli.nama_satuan,
            tgl_kadaluarsa: moment(x.tgl_kadaluarsa).format('YYYY-MM-DD'),
            nama_tgl_kadaluarsa: moment(x.tgl_kadaluarsa).format('DD/MM/YYYY')
          })
          vm.data_sementara = {}
          vm.resetSub()
        }else{
          vm.$emit("alertFromChild", {
            variant: "warning",
            msg: "TERDAPAT BARANG DENGAN KODE BATCH YANG SAMA PADA PEMBELIAN",
            showing: true,
          });
        }
      },
      editSub(x){
        const vm = this
        vm.is_data.edit_barang = true
        vm.busy = true
        vm.resetSub()
        // console.log('ini data edit', x)
        vm.is_data_sub = {...x, barang: null, satuan_beli: null} 
        vm.is_data_sub.tgl_kadaluarsa = new Date(x.tgl_kadaluarsa)
        //barang
        for (let i = 0; i < vm.list_barang.length; i++) {
          const b = vm.list_barang[i];
          if(vm.is_data_sub.ms_barang_id == b.id){
            vm.is_data_sub.barang = b
            break
          }
        }
        //satuan
        for (let i = 0; i < vm.list_satuan_barang.length; i++) {
          const b = vm.list_satuan_barang[i];
          if(vm.is_data_sub.ms_satuan_beli_id == b.id){
            vm.is_data_sub.satuan_beli = b
            break
          }
        }
        vm.data_sementara = x
        vm.deleteSub(x)
        vm.busy = false
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
          .post("pembelian/register", {...vm.is_data, id: vm.is_data.pembelian_id, sub_pembelian: vm.table_sub})
          .then((res) => {
            console.log('ini res regsiterasi pembelian', res)
            if (res.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENAMBAHKAN PEMBELIAN",
                showing: true,
              });
              this.$bvModal.hide("modal-form-pembelian");
              if(this.$route.fullPath != '/warehouse/farmasi/transaksi/pembelian') this.$router.push('/warehouse/farmasi/transaksi/pembelian')
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
        this.table_sub = []
        this.table_po = []
        this.data_sementara = {}
        this.$v.$reset();
      },
      resetSub() {
        const vm = this
        const x = vm.data_sementara
        vm.data_sementara = {}
        // console.log(x)
        // console.log(Object.keys(x).length !== 0)
        if(Object.keys(x).length !== 0){
          // console.log('ini data form ', x)
          // console.log('ini data vm.table_sub ', vm.table_sub.length)
          vm.table_sub.push({
            ...x,
            no: vm.table_sub.length + 1,
            nama_qty_beli: vm.toNumeric(x.qty_beli),
            nama_harga_beli: vm.toNumeric(x.total_harga_beli, 'idr'),
            nama_qty_satuan_simpan: vm.toNumeric(x.qty_satuan_simpan),
            ms_barang_id: x.ms_barang_id,
            ms_satuan_beli_id: x.ms_satuan_beli_id,
            tgl_kadaluarsa: moment(x.tgl_kadaluarsa).format('YYYY-MM-DD'),
            nama_tgl_kadaluarsa: moment(x.tgl_kadaluarsa).format('DD/MM/YYYY')
          })
        }
        vm.is_data_sub = {
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
        vm.$v.$reset();
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
  