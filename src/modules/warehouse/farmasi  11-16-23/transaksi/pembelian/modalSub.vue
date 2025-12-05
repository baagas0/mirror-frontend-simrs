<template>
  <div>
    <b-modal
      id="modal-sub"
      size="xl"
      centered
      title="Sub Pembelian"
      header-bg-variant="primary"
      header-text-variant="light"
      hide-footer
      @hidden="tutupModal"
      @show="bukaModal"
    >
      <b-form class="" v-if="data_sub.status_pembelian == 1">
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Barang 
          </template>
          <multiselect
            id="barang"
            v-model="$v.is_data.barang.$model"
            :options="list_barang"
            :multiple="false"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            label="nama_barang"
            track-by="id"
            placeholder="-- Pilih Barang --"
            :class="{invalid: checkIfValid('barang') === false}"
            :disabled="data_sub.status_pembelian != 1"
          ></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Kode Batch 
          </template>
          <b-form-input
            :state="checkIfValid('kode_batch')"
            type="text"
            v-model="$v.is_data.kode_batch.$model"
            :disabled="data_sub.status_pembelian != 1"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Satuan Beli 
          </template>
          <multiselect
            id="satuan_beli"
            v-model="$v.is_data.satuan_beli.$model"
            :options="list_satuan_barang"
            :multiple="false"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            label="nama_satuan"
            track-by="id"
            placeholder="-- Pilih Satuan Beli --"
            :class="{invalid: checkIfValid('satuan_beli') === false}"
            :disabled="data_sub.status_pembelian != 1"
          ></multiselect>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Harga Beli
          </template>
          <b-form-input
            :state="checkIfValid('harga_beli')"
            type="text"
            v-model="$v.is_data.harga_beli.$model"
            :disabled="data_sub.status_pembelian != 1"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Quantity Beli 
          </template>
          <b-form-input
            :state="checkIfValid('qty_beli')"
            type="text"
            v-model="$v.is_data.qty_beli.$model"
            :disabled="data_sub.status_pembelian != 1"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Total Harga Beli
          </template>
          <b-form-input
            :state="checkIfValid('total_harga_beli')"
            type="text"
            v-model="is_data.nama_total_harga_beli"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Quantity Satuan Simpan 
          </template>
          <b-form-input
            :state="checkIfValid('qty_satuan_simpan')"
            type="text"
            v-model="$v.is_data.qty_satuan_simpan.$model"
            :disabled="data_sub.status_pembelian != 1"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Harga Satuan Simpan 
          </template>
          <b-form-input
            :state="checkIfValid('harga_per_satuan_simpan')"
            type="text"
            v-model="is_data.nama_harga_per_satuan_simpan"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Total Quantity Satuan Simpan 
          </template>
          <b-form-input
            :state="checkIfValid('total_qty_satuan_simpan')"
            type="text"
            v-model="is_data.nama_total_qty_satuan_simpan"
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
            v-model="$v.is_data.tgl_kadaluarsa.$model"
            :state="checkIfValid('tgl_kadaluarsa')"
          :disabled="data_sub.status_pembelian != 1"
          ></date-picker>
        </b-form-group>
      </b-form>
      <div class="my-1 d-flex justify-content-end" v-if="data_sub.status_pembelian == 1">
        <b-button
          class="mx-1"
          variant="danger"
          @click="resetModal"
          :disabled="data_sub.status_pembelian != 1"
          >Reset</b-button
        >
        <b-button
          v-if="is_data.sub_pembelian_id"
          class="mx-1"
          variant="warning"
          @click="update"
          :disabled="busy || !isValid || data_sub.status_pembelian != 1"
          >Update</b-button
        >
        <b-button
          v-else
          class="mx-1"
          variant="primary"
          @click="simpan"
          :disabled="busy || !isValid || data_sub.status_pembelian != 1"
          >Simpan</b-button
        >
      </div>
      <div class="mt-3">
        <b-table
            :items="items"
            :fields="fields"
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
            <template #cell(actions)="item">
              <div class="text-nowrap">
                <b-button
                  class="mx-1"
                  variant="warning"
                  :disabled="data_sub.status_pembelian != 1"
                  @click="editSub(item.item)"
                  ><i class="ri-edit-2-line"></i></b-button
                >
                <b-button
                  class="mx-1"
                  variant="danger"
                  @click="$bvModal.show('modal-delete-sub'), dataDelete = item.item"
                  :disabled="data_sub.status_pembelian != 1"
                  ><i class="ri-delete-bin-2-line"></i></b-button
                >
              </div>
            </template>
          </b-table>
      </div>
    </b-modal>
    <b-modal
      id="modal-delete-sub"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>Apakah anda yakin akan menghapus data ini ?</p>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-delete-sub')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="deleteSub()" :disabled="busy">
          {{ button }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import _ from "lodash";
  import axios from "axios";
  import moment from 'moment';
  moment.locale('id');
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
      "data_sub",
      'list_barang',
      'list_satuan_barang',
    ],
    data() {
      return {
        busy: false,
        button: "Simpan",
        dataDelete: {},
        is_data: {
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
        items: [
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
      };
    },
    mixins: [validationMixin],
    validations: {
      is_data: {
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
    computed: {
      formString() {
        return JSON.stringify(this.data_sub, 4, null);
      },
      isValid() {
        // console.log('this.$v.is_data', this.$v.is_data)
        return !this.$v.is_data.$invalid;
      },
      isDirty() {
        return this.$v.is_data.$anyDirty;
      },
    },
    watch: {
      'is_data.barang'(newVar, oldVar){
        if(newVar != oldVar && newVar !== null && !this.is_data.sub_pembelian_id){
          const x = this.is_data
          x.harga_beli = newVar.harga_pokok
          x.qty_beli = 1
          x.qty_satuan_simpan = newVar.qjb
          x.satuan_beli = {id: newVar.ms_satuan_jual_id, nama_satuan: newVar.nama_satuan_jual}
          // console.log(x)
          // console.log(newVar)
        }
      }, 
      'is_data.qty_beli'(newVar, oldVar){
        if(newVar !== oldVar && newVar !== null){
          if(this.is_data.harga_beli !== null){
            this.is_data.total_harga_beli = newVar * this.is_data.harga_beli
            this.is_data.nama_total_harga_beli = this.toNumeric(this.is_data.total_harga_beli, 'idr')
          }
          if(this.is_data.qty_satuan_simpan !== null){
            this.is_data.total_qty_satuan_simpan = newVar * this.is_data.qty_satuan_simpan
            this.is_data.nama_total_qty_satuan_simpan = this.toNumeric(this.is_data.total_qty_satuan_simpan)
          }
        }
      },
      'is_data.qty_satuan_simpan'(newVar, oldVar){
        if(newVar !== oldVar && newVar !== null){
          if(this.is_data.harga_beli !== null){
            this.is_data.harga_per_satuan_simpan = this.is_data.harga_beli / newVar
            this.is_data.nama_harga_per_satuan_simpan = this.toNumeric(this.is_data.harga_per_satuan_simpan, 'idr')
          }
          if(this.is_data.qty_beli !== null){
            this.is_data.total_qty_satuan_simpan = this.is_data.qty_beli * newVar
            this.is_data.nama_total_qty_satuan_simpan = this.toNumeric(this.is_data.total_qty_satuan_simpan)
          }
        }
      },
      'is_data.harga_beli'(newVar, oldVar){
        if(newVar !== oldVar && newVar !== null){
          if(this.is_data.qty_beli !== null){
            this.is_data.total_harga_beli = newVar * this.is_data.qty_beli
            this.is_data.nama_total_harga_beli = this.toNumeric(this.is_data.total_harga_beli, 'idr')
          }
          if(this.is_data.qty_satuan_simpan !== null){
            this.is_data.harga_per_satuan_simpan = newVar / this.is_data.qty_satuan_simpan
            this.is_data.nama_harga_per_satuan_simpan = this.toNumeric(this.is_data.harga_per_satuan_simpan, 'idr')
          }
        }
      },
    },
  
    methods: {
      bukaModal(){
        const vm = this
        vm.busy = true
        console.log("halo halo", vm.data_sub)
        axios
        .post("subPembelian/getByIdPembelian", {ms_pembelian_id: vm.data_sub.pembelian_id})
        .then((res)=>{
          console.log('list sub pembelian', res)
          for (let i = 0; i < res.data.length; i++) {
            const x = res.data[i];
            x.no = i+1
            x.nama_harga_beli = vm.toNumeric(x.harga_beli, 'dir')
            x.nama_qty_beli = vm.toNumeric(x.qty_beli)
            x.nama_qty_satuan_simpan = vm.toNumeric(x.qty_satuan_simpan)
            x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
            x.nama_total_harga_beli = vm.toNumeric(x.total_harga_beli, 'idr')
            x.nama_harga_per_satuan_simpan = vm.toNumeric(x.harga_per_satuan_simpan, 'idr')
            x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
            x.nama_tgl_kadaluarsa = moment(x.tgl_kadaluarsa).format('DD/MM/YYYY')
          }
          vm.busy = false
          vm.items = res.data
        }).catch(err=>{
          vm.busy = false
          console.log('err', err)
        })
        vm.resetModal()
      },
      editSub(x){
        const vm = this
        vm.busy = true
        this.resetModal()
        // console.log('ini data edit', x)
        this.is_data = {...x, barang: null, satuan_beli: null} 
        this.is_data.tgl_kadaluarsa = new Date(x.tgl_kadaluarsa)
        //barang
        for (let i = 0; i < this.list_barang.length; i++) {
          const b = this.list_barang[i];
          if(this.is_data.ms_barang_id == b.id){
            this.is_data.barang = b
            break
          }
        }
        //satuan
        for (let i = 0; i < this.list_satuan_barang.length; i++) {
          const b = this.list_satuan_barang[i];
          if(this.is_data.ms_satuan_beli_id == b.id){
            this.is_data.satuan_beli = b
            break
          }
        }
        vm.busy = false
      },
      update() {
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        vm.is_data.id = vm.is_data.sub_pembelian_id
        vm.is_data.tgl_kadaluarsa = moment(vm.is_data.tgl_kadaluarsa).format('YYYY-MM-DD')
        vm.is_data.ms_barang_id = vm.is_data.barang.id
        vm.is_data.ms_satuan_beli_id = vm.is_data.satuan_beli.id
        vm.is_data.barang = null
        vm.is_data.satuan_beli = null
        axios
          .post("subPembelian/update", vm.is_data)
          .then((res) => {
            if (res.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH SUB PEMBELIAN",
                showing: true,
              });
              vm.bukaModal();
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
      simpan() {
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        vm.is_data.ms_pembelian_id = vm.data_sub.pembelian_id,
        vm.is_data.tgl_kadaluarsa = moment(vm.is_data.tgl_kadaluarsa).format('YYYY-MM-DD')
        vm.is_data.ms_barang_id = vm.is_data.barang.id
        vm.is_data.ms_satuan_beli_id = vm.is_data.satuan_beli.id
        vm.is_data.barang = null
        vm.is_data.satuan_beli = null
        axios
          .post("subPembelian/register", vm.is_data)
          .then((res) => {
            console.log('res register', res)
            if (res.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENAMBAH SUB PEMBELIAN",
                showing: true,
              });
              vm.bukaModal();
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
      deleteSub(){
        const vm = this;
        const x = vm.dataDelete
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        x.id = x.sub_pembelian_id
        axios
          .post("subPembelian/delete", x)
          .then((res) => {
            if (res.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGHAPUS SUB PEMBELIAN",
                showing: true,
              });
              vm.$bvModal.hide('modal-delete-sub')
              vm.bukaModal();
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
        }
        this.$v.$reset();
      },
      checkIfValid(fieldName) {
        const field = this.$v.is_data[fieldName];
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
  