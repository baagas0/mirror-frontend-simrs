<template>
  <div>
    <b-modal
      id="modal-sub"
      size="lg"
      centered
      title="Sub Pembelian"
      header-bg-variant="primary"
      header-text-variant="light"
      hide-footer
      @hidden="tutupModal"
      @show="bukaModal"
    >
      <b-form class="" v-if="data_sub.status_pembelian == 1 || disabled">
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
            Total Quantity 
          </template>
          <b-form-input
            :state="checkIfValid('total_qty_satuan_simpan')"
            type="number"
            v-model="$v.is_data.total_qty_satuan_simpan.$model"
            :disabled="data_sub.status_pembelian != 1"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div class="my-1 d-flex justify-content-end" v-if="data_sub.status_pembelian == 1 || disabled">
        <b-button
          class="mx-1"
          variant="danger"
          @click="resetModal"
          :disabled="data_sub.status_pembelian != 1"
          >Reset</b-button
        >
        <b-button
          v-if="is_data.sub_po_id"
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
                :disabled="data_sub.status_pembelian != 1 || disabled"
                class="mx-1"
                variant="warning"
                @click="editSub(item.item)"
                ><CIcon name="cil-pencil" /></b-button
              >
              <b-button
                :disabled="data_sub.status_pembelian != 1 || disabled"
                class="mx-1"
                variant="danger"
                @click="$bvModal.show('modal-delete-sub'), dataDelete = item.item"
                ><CIcon name="cil-trash" /></b-button
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
          Delete
        </b-button>
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
  // import DatePicker from "vue2-datepicker";
  import 'vue2-datepicker/index.css';
  
  export default {
    name: "modalEdit",
    components: {
      Multiselect,
      // DatePicker,
    },
    props: [
      "data_sub",
      'list_barang',
    ],
    data() {
      return {
        busy: false,
        button: "Simpan",
        dataDelete: [],
        is_data: {
          barang: null,
          total_qty_satuan_simpan: null,
        },
        items: [],
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
      };
    },
    computed: {
      formString() {
        return JSON.stringify(this.data_sub, 4, null);
      },
      isValid() {
        return !this.$v.is_data.$invalid;
      },
      isDirty() {
        return this.$v.is_data.$anyDirty;
      },
      disabled(){
        return this.data_sub && this.data_sub.tgl_faktur ? true : false
      },
    },
    watch: {
    },
  
    mixins: [validationMixin],
    validations: {
      is_data: {
        barang: { required },
        total_qty_satuan_simpan: { required },
      },
    },
    methods: {
      bukaModal(){
        const vm = this
        console.log("halo halo", vm.data_sub)
        vm.busy = true
        axios
        .post(ipBackend + "/subPo/getByIdPembelian", vm.data_sub)
        .then((res)=>{
          // console.log('list sub po', res)
          for (let i = 0; i < res.data.data.length; i++) {
            const x = res.data.data[i];
            x.no = i+1
            x.nama_total_qty_satuan_simpan = vm.toNumeric(x.total_qty_satuan_simpan)
          }
          vm.items = res.data.data
          vm.busy = false
        }).catch(err=>{
          console.log('err', err)
          vm.busy = false
        })
        vm.resetModal()
      },
      editSub(x){
        const vm = this
        vm.busy = true
        vm.resetModal()
        // console.log('ini data edit', x)
        vm.is_data = x        
        //barang
        for (let i = 0; i < vm.list_barang.length; i++) {
          const b = vm.list_barang[i];
          if(vm.is_data.ms_barang_id == b.id){
            vm.is_data.barang = b
            break
          }
        }
        vm.busy = false
      },
      simpan() {
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        vm.is_data.pembelian_id = vm.data_sub.pembelian_id,
        vm.is_data.ms_barang_id = vm.is_data.barang.id,
        axios
          .post(ipBackend + "/subPo/register", vm.is_data)
          .then((res) => {
            // console.log('sub po register', res)
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENAMBAHKAN PRE ORDER",
                showing: true,
              });
              // vm.$bvModal.hide("modal-edit");
              vm.bukaModal();
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
      update() {
        let vm = this;
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        vm.is_data.ms_barang_id = vm.is_data.barang.id,
        vm.is_data.id = vm.is_data.sub_po_id
        axios
          .post(ipBackend + "/subPo/update", vm.is_data)
          .then((res) => {
            // console.log('ini update pre order', res)
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGUBAH PRE ORDER",
                showing: true,
              });
              // vm.$bvModal.hide("modal-edit");
              vm.bukaModal();
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
      deleteSub(){
        const vm = this;
        const x = vm.dataDelete
        vm.busy = true;
        vm.button = "Mohon Tunggu";
        x.id = x.sub_po_id
        axios
          .post(ipBackend + "/subPo/delete", x)
          .then((res) => {
            if (res.data.message == "sukses") {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$v.$reset();
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENGHAPUS PRE ORDER",
                showing: true,
              });
              vm.$bvModal.hide('modal-delete-sub')
              vm.bukaModal();
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
      tutupModal() {
        this.$emit("tutupModal");
      },
      resetModal() {
        this.is_data = {
          barang: null,
          total_qty_satuan_simpan: null,
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
        number = number || 0 
        let data = {}
        if(type == 'idr') data = {style: 'currency', currency: 'IDR'}
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    },
  };
  </script>
  