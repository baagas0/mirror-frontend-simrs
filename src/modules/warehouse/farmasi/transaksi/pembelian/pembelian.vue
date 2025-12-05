<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header">
            <template #header>
              <b-row>
                <b-col class="align-self-center">
              <h2 class="mb-0">
                <strong>Pembelian</strong>
              </h2>
              </b-col>
              <b-col class="align-self-center d-flex justify-content-end">
                <b-button variant="primary" v-b-modal.modal-form-pembelian @click="is_data = ''">
                  <i
                    class="ri-add-circle-line p-0"></i> Tambah Data</b-button>
                    </b-col>
                    </b-row>
            </template>

            <b-alert dismissible fade :show="showing" :variant="variant">{{
              msg
            }}</b-alert>

            <form @submit.prevent="getListPembelian" autocomplete="off">
            <b-row v-if="isShowFilters">

              <b-col cols="12">
                
                <div class="row align-self-end">
                  <b-col cols="3" sm="3" md="3" lg="3">
                    <label for="no_faktur">No Faktur</label>
                    <b-form-input id="no_faktur" v-model="filter.no_faktur" placeholder="No Faktur" type="text" size="sm"></b-form-input>
                  </b-col>
                  <b-col cols="3" sm="3" md="3" lg="3">
                    <label for="ms_suplier_id">Supplier</label>
                    <multiselect
                      v-model="filter.param.ms_suplier_id"
                      :options="list.list_supplier"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="nama_supplier"
                      track-by="id"
                      placeholder="Pilih Supplier"
                      size="sm"
                      id="ms_suplier_id"
                      @select="onSelect(filter.param.ms_suplier_id, 'ms_suplier_id')"
                      @remove="onRemove(filter.param.ms_suplier_id, 'ms_suplier_id')"
                    />
                  </b-col>
                  <b-col cols="3" sm="3" md="3" lg="3">
                    <label for="ms_gudang_id">Gudang</label>
                    <multiselect
                      v-model="filter.param.ms_gudang_id"
                      :options="list.list_gudang"
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      label="nama_gudang"
                      track-by="id"
                      placeholder="Pilih Gudang"
                      size="sm"
                      id="ms_gudang_id"
                      @select="onSelect(filter.param.ms_gudang_id, 'ms_gudang_id')"
                      @remove="onRemove(filter.param.ms_gudang_id, 'ms_gudang_id')"
                    />
                  </b-col>
                </div>
              </b-col>
            </b-row>
            
            <b-row v-if="isShowFilters" class="mt-2">
              <b-col cols="12">

                  <div class="row align-self-end">
                    <b-col cols="3" sm="3" md="3" lg="3">
                    
                      <label for="tgl_awal">Awal</label>
                      <date-picker id="tgl_awal" style="width: 100%" format="DD-MM-YYYY" placeholder="Pilih tanggal awal"
                        v-model="filter.tgl_awal"></date-picker>

                    </b-col>
                    <b-col cols="3" sm="3" md="3" lg="3">
                      <label for="tgl_akhir">Akhir</label>
                      <date-picker id="tgl_akhir" style="width: 100%" format="DD-MM-YYYY" placeholder="Pilih tanggal akhir"
                        v-model="filter.tgl_akhir"></date-picker>
                        </b-col>
                  </div>
              </b-col>
            </b-row>

            <div class="row align-self-end" :class="[isShowFilters ? 'my-4' : 'my-0 mb-4']">
              <b-col cols="12" sm="12" md="12" lg="12">
                <button v-if="isShowFilters" type="submit" class="btn btn-light-primary">
                  <i class="ri-save-line"></i>
                  Terapkan Filter
                </button>
                <div v-if="isShowFilters" @click="resetFilter" class="btn btn-light-danger">
                  <i class="ri-loop-right-line"></i>
                  Reset
                </div>
                <div class="btn btn-light-info" @click="isShowFilters = !isShowFilters">
                  <span v-if="isShowFilters"><i class="ri-eye-off-line"></i>Hide Filter</span>
                  <span v-else><i class="ri-eye-line"></i>Show Filter</span>
                </div>
              </b-col>
            </div>
            </form>

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-table :items="items" :fields="fields" responsive show-empty small bordered striped hover
                  :busy="tableBusy">
                  <template #cell(status_pembelian)="item">
                    <b-button v-if="item.item.status_pembelian == 1" type="button" class="btn btn-success"
                      v-b-tooltip.hover="'Open'">Open</b-button>
                    <b-button v-else-if="item.item.status_pembelian == 2" type="button" class="btn btn-warning"
                      v-b-tooltip.hover="'Lock'">Lock</b-button>
                    <b-button v-else-if="item.item.status_pembelian == 3" type="button" class="btn btn-danger"
                      v-b-tooltip.hover="'Close'">Close</b-button>
                  </template>
                  <template #cell(actions)="item">
                    <div class="text-nowrap">
                      <b-button variant="primary" class="mr-1" v-b-tooltip.hover="'Pembelian'"
                        v-b-modal.modal-form-pembelian @click="is_data = item.item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-archive" viewBox="0 0 16 16">
                          <path
                            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                      </b-button>
                      <!-- <b-button
                        variant="info"
                        class="mr-1"
                        v-b-tooltip.hover="'Sub Pembelian'"
                        v-b-modal.modal-sub
                        @click="is_data = item.item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                          </svg>
                        </b-button
                      > -->
                      <b-button v-if="item.item.status_pembelian < 3" :disabled="item.item.status_pembelian == '3'"
                        variant="success" class="mr-1" v-b-tooltip.hover="'Return Data'" v-b-modal.modal-return
                        @click="is_data = item.item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                          <path
                            d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                      </b-button>
                      <!-- <b-button
                        v-if="item.item.status_pembelian < 3"
                        :disabled="item.item.status_pembelian != '1'"
                        variant="warning"
                        class="mr-1"
                        v-b-tooltip.hover="'Edit Data'"
                        v-b-modal.modal-edit
                        @click="is_data = item.item"
                        ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                      > -->
                      <b-button v-if="item.item.status_pembelian < 3" :disabled="item.item.status_pembelian != '1'"
                        variant="danger" class="mr-1" v-b-tooltip.hover="'Hapus Data'" v-b-modal.modal-delete
                        @click="is_data = item.item">
                        <i class="ri-delete-bin-2-line"></i>
                      </b-button>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-row>

            <b-row class="d-flex justify-content-between">
              <b-col md="3">
                <b-form-group label="Per Halaman" label-for="per-page-select" label-cols-md="6" label-align-md="left"
                  label-size="md" style="background-color: ">
                  <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="md"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                  size="sm"></b-pagination>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <modal-form-pembelian :data="JSON.parse(JSON.stringify(is_data))" :list_gudang="list_gudang"
      :list_supplier="list_supplier" :list_barang="list_barang" :list_satuan_barang="list_satuan_barang"
      @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-input :list_gudang="list_gudang" :list_supplier="list_supplier" :list_barang="list_barang"
      :list_satuan_barang="list_satuan_barang" @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-edit :list_gudang="list_gudang" :list_supplier="list_supplier" @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()" />
    <modal-sub :list_barang="list_barang" :list_satuan_barang="list_satuan_barang"
      :data_sub="JSON.parse(JSON.stringify(is_data))" @alertFromChild="triggerAlert($event)" @tutupModal="getDatas()" />
    <modal-delete :data_delete="JSON.parse(JSON.stringify(is_data))" @alertFromChild="triggerAlert($event), getDatas()" />
    <modal-return :data="JSON.parse(JSON.stringify(is_data))" @alertFromChild="triggerAlert($event), getDatas()" />
  </div>
</template>
  
<script>
import axios from "axios";
import moment from 'moment';
moment.locale('id');
import { ipBackend } from "@/ipBackend";
import ModalDelete from "./modalDelete.vue";
import ModalFormPembelian from "./modalForm.vue";
import ModalInput from "./modalInput.vue";
import ModalEdit from "./modalEdit.vue";
import ModalSub from "./modalSub.vue";
import ModalReturn from "./modalReturn.vue";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';

export default {
  components: {
    DatePicker,
    ModalFormPembelian,
    ModalInput,
    ModalDelete,
    ModalEdit,
    ModalSub,
    ModalReturn,
  },
  name: "master_etnis",
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      is_data: "",
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: false,
          class: "table-number text-center",
        },
        {
          key: "kode_po",
          label: "Kode PO",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "no_faktur",
          label: "No. Faktur",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_supplier",
          label: "Supplier",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_gudang",
          label: "Gudang",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_tgl_faktur",
          label: "Tanggal Faktur",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "status_pembelian",
          label: "Status",
          sortable: false,
          sortDirection: "desc",
          class: "table-option-2 text-center",
        },
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
        },
      ],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: {
        param: {
          ms_suplier_id: '',
          ms_gudang_id: '',
        },
        tgl_awal: '',
        tgl_akhir: '',
        no_faktur: '',
        ms_suplier_id: '',
        ms_gudang_id: '',
      },
      filterOn: [],
      tableBusy: false,
      list_gudang: [],
      list_supplier: [],
      list_barang: [],
      list_satuan_barang: [],
      list: {
        list_supplier: [],
        list_gudang: [],
      },
      isShowFilters: true,
    };
  },
  computed: {
  },
  watch: {
    currentPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas()
      }
    },
    perPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas()
      }
    },
  },
  mounted() {
    this.getDatas();
    this.getFilters();
  },
  methods: {
    async getDatas() {
      this.getListPembelian()
      //supplier
      let list_supplier = await this.$_api.post(ipBackend + "/msSupplier/list");
      this.list_supplier = list_supplier.data.status == 200 ? list_supplier.data.map(x => { return x }) : []
      //gudang
      let list_gudang = await this.$_api.post(ipBackend + "/msGudang/list");
      this.list_gudang = list_gudang.data.status == 200 ? list_gudang.data.map(x => { return x }) : []
      //barang
      let list_barang = await this.$_api.post(ipBackend + "/msBarang/list");
      this.list_barang = list_barang.data.status == 200 ? list_barang.data.map(x => { return x }) : []
      //satuan barang
      let list_satuan_barang = await this.$_api.post(ipBackend + "/msSatuanBarang/list");
      this.list_satuan_barang = list_satuan_barang.data.status == 200 ? list_satuan_barang.data.map(x => { return x }) : []
      // console.log('list_supplier : ', list_supplier)
    },
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
    async getListPembelian() {
      this.tableBusy = true;
      await this.$_api.post("pembelian/haveSub", {
        jumlah: this.perPage,
        halaman: this.currentPage,
        ...this.filter,
        // tgl_awal: this.filter.tgl_awal ? moment(this.filter.tgl_awal).format('YYYY-MM-DD'):undefined,
        tgl_akhir: this.filter.tgl_akhir ? moment(this.filter.tgl_akhir).add(23, 'hours').add(59, 'minutes') : undefined,
      }).then((res) => {
        let pembelian = res.data
        this.totalRows = Number.parseInt(res.count)
        // console.log("ini pembelian ", pembelian)
        this.items = pembelian;
        for (let i = 0; i < this.items.length; i++) {
          let x = this.items[i];
          x.no = i + 1 + (this.perPage * (this.currentPage - 1));
          x.nama_tgl_faktur = moment(x.tgl_faktur).format('dddd, DD-MM-YYYY')
        }
      })
      this.tableBusy = false;
    },
    resetData() {
      this.filter.tgl_awal = null
      this.filter.tgl_akhir = null
      this.filter.no_faktur = null
    },
    getFilters(){
      this.getMsSupplier()
      this.getMsGudang()
    },
    getMsSupplier(){
      this.$_api.post("msSupplier/list").then((res) => {
        this.list.list_supplier = res.data
      })
    },
    getMsGudang(){
      this.$_api.post("msGudang/list").then((res) => {
        this.list.list_gudang = res.data
      })
    },
    onSelect(selectedArray, variableName) {
      this.filter[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filter[variableName] = '';
    },
    resetFilter() {
      this.filter = {
        param: {
          ms_suplier_id: '',
          ms_gudang_id: '',
        },
        tgl_awal: '',
        tgl_akhir: '',
        no_faktur: '',
        ms_suplier_id: '',
        ms_gudang_id: '',
      }
    },
  },
};
</script>
  