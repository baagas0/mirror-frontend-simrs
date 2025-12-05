<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>Pre Order</strong>
              </h5>
            </template>
            <b-row>
              <b-col cols="12" md="12" lg="12">
                <!-- <b-button variant="primary" v-b-modal.modal-input
                  ><i class="ri-add-circle-line p-0"></i> Tambah Data</b-button
                > -->
                <b-button variant="primary" v-b-modal.modal-form @click="is_data = ''"
                  ><i class="ri-add-circle-line p-0"></i> Tambah Data</b-button
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="12" lg="12">
                <hr />
              </b-col>
            </b-row>

            <b-alert dismissible fade :show="showing" :variant="variant">{{
              msg
            }}</b-alert>

            <b-row>
              <b-col md="3">
                <b-form-group
                  label="Per Halaman"
                  label-for="per-page-select"
                  label-cols-md="6"
                  label-align-md="left"
                  label-size="md"
                  style="background-color: "
                >
                  <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="md"
                  ></b-form-select>
                </b-form-group>
              </b-col>

              <b-col md="6" offset-md="3">
                <b-form-group
                  label=""
                  label-for="filter-input"
                  label-cols-md="0"
                  label-align-md="right"
                  label-size="xl"
                >
                  <div class="d-flex">
                    <div class="mr-2 w-100">
                      <date-picker
                        id="tgl_awal"
                        style="width: 100%"
                        format="DD-MM-YYYY"
                        placeholder="awal"
                        v-model="filter.tgl_awal"
                      ></date-picker>
                    </div>
                    <div class="mr-2 w-100">
                      <date-picker
                        id="tgl_akhir"
                        style="width: 100%"
                        format="DD-MM-YYYY"
                        placeholder="akhir"
                        v-model="filter.tgl_akhir"
                      ></date-picker>
                    </div>
                    <b-input-group class="w-100">
                      <b-form-input
                        id="filter-input"
                        v-model="filter.kode_po"
                        type="search"
                        placeholder="Kode"
                        debounce="500"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button
                          :disabled="!filter"
                          @click="filter = {}"
                          variant="danger"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                          </b-button
                        >
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-table
                  :items="items"
                  :fields="fields"
                  responsive
                  show-empty
                  small
                  bordered
                  striped
                  hover
                  :busy="tableBusy"
                >
                  <template #cell(status_pembelian)="item">
                    <!-- have pembelian -->
                    <!-- <b-button v-if="item.item.tgl_faktur" type="button" class="mr-2" variant="primary" v-b-tooltip.hover="'Pembelian'"></b-button>
                    <b-button v-else type="button" class="mr-2" variant="info" v-b-tooltip.hover="'Pre Order'"></b-button> -->
                    <!-- status -->
                    <b-button v-if="item.item.status_pembelian == 1" type="button" class="btn btn-success" v-b-tooltip.hover="'Open'"></b-button>
                    <b-button v-else-if="item.item.status_pembelian == 2" type="button" class="btn btn-warning" v-b-tooltip.hover="'Lock'"></b-button>
                    <b-button v-else-if="item.item.status_pembelian == 3" type="button" class="btn btn-danger" v-b-tooltip.hover="'Close'"></b-button>
                  </template>
                  <template #cell(actions)="item">
                    <div class="text-nowrap">
                      <!-- | {{havePembelian(item.item)}} | || {{item.item.tgl_faktur}} -->
                      <b-button
                        v-if="!havePembelian(item.item)"
                        variant="primary"
                        class="mx-1"
                        v-b-tooltip.hover="'Pre Order'"
                        v-b-modal.modal-form
                        @click="is_data = item.item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                          </svg>
                        </b-button
                      >
                      <!-- <b-button
                        variant="info"
                        class="mx-1"
                        v-b-tooltip.hover="'Sub Pre Order'"
                        v-b-modal.modal-sub
                        @click="is_data = item.item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                          </svg>
                        </b-button
                        v-if="!havePembelian(item.item)"
                        :disabled="item.item.status_pembelian >= 2"
                      > -->
                      <b-button
                        variant="info"
                        class="mx-1"
                        v-b-tooltip.hover="'Pembelian'"
                        @click="openPembelian(item.item)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                          </svg>
                        </b-button
                      >
                      <b-button
                        v-if="item.item.status_pembelian < 3 || !havePembelian(item.item)"
                        variant="success"
                        class="mx-1"
                        v-b-tooltip.hover="'Return Data'"
                        v-b-modal.modal-return
                        @click="is_data = item.item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                          </svg>
                        </b-button
                      >
                      <!-- <b-button
                        v-if="item.item.status_pembelian < 3"
                        :disabled="item.item.status_pembelian != '1' || havePembelian(item.item)"
                        variant="warning"
                        class="mx-1"
                        v-b-tooltip.hover="'Edit Data'"
                        v-b-modal.modal-edit
                        @click="is_data = item.item"
                        ><i class="ri-edit-2-line"></i> {{ item.actions }}</b-button
                      > -->
                      <b-button
                        v-if="item.item.status_pembelian < 3 || !havePembelian(item.item)"
                        :disabled="item.item.status_pembelian != '1'"
                        variant="danger"
                        class="mx-1"
                        v-b-tooltip.hover="'Hapus Data'"
                        v-b-modal.modal-delete
                        @click="is_data = item.item"
                        ><i class="ri-delete-bin-2-line"></i> {{ item.actions }}</b-button
                      >
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="5" offset-md="7">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                ></b-pagination>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- {{is_data}} -->
    <modal-input 
      :list_gudang="list_gudang"
      :list_supplier="list_supplier"
      :list_barang="list_barang"
      :list_satuan_barang="list_satuan_barang"
      @alertFromChild="triggerAlert($event), getDatas()" 
    />
    <modal-form 
      :data="JSON.parse(JSON.stringify(is_data))"
      :list_gudang="list_gudang"
      :list_supplier="list_supplier"
      :list_barang="list_barang"
      :list_satuan_barang="list_satuan_barang"
      @alertFromChild="triggerAlert($event), getDatas()" 
    />
    <modal-edit
      :list_gudang="list_gudang"
      :list_supplier="list_supplier"
      :data_edit="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    />
    <modal-sub
      :list_barang="list_barang"
      :data_sub="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    />
    <modal-delete
      :data_delete="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event), getDatas()"
    />
    <modal-accept-pembelian
      :data_accept="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event), getDatas()"
    />
    <modal-form-pembelian
      :data="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event), getDatas()" 
    />
    <modal-return 
      :data="JSON.parse(JSON.stringify(is_data))"
      @alertFromChild="triggerAlert($event), getDatas()" 
    />
  </div>
</template>
  
<script>
  import axios from "axios";
  import moment from 'moment';
  moment.locale('id');
  import { ipBackend } from "@/ipBackend";
  import ModalAcceptPembelian from "./modalAcceptPembelian.vue";
  import ModalFormPembelian from '../pembelian/modalForm.vue'
  import ModalDelete from "./modalDelete.vue";
  import ModalForm from "./modalForm.vue";
  import ModalInput from "./modalInput.vue";
  import ModalEdit from "./modalEdit.vue";
  import ModalSub from "./modalSub.vue";
  import ModalReturn from "./modalReturn.vue";
  import DatePicker from "vue2-datepicker";
  import 'vue2-datepicker/index.css';
  
  export default {
    components: {
      DatePicker,
      ModalInput,
      ModalForm,
      ModalDelete,
      ModalAcceptPembelian,
      ModalFormPembelian,
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
            label: "Kode",
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
            key: "nama_tgl_po",
            label: "Tanggal",
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
        filter: {},
        filterOn: [],
        tableBusy: false,
        list_gudang: [],
        list_supplier: [],
        list_barang: [],
        list_satuan_barang: [],
      };
    },
    computed: {
    },
    watch: {
      currentPage(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.getDatas()
        }
      },
      perPage(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.getDatas()
        }
      },
      'filter.tgl_awal'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.tgl_akhir'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'filter.kode_po'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      this.getDatas();
    },
    methods: {
      // onFiltered(filteredItems) {
      //   // Trigger pagination to update the number of buttons/pages due to filtering
      //   this.totalRows = filteredItems.length;
      //   this.currentPage = 1;
      // },
      async openPembelian(x){
        const vm = this
        vm.is_data = x
        // console.log(x)
        await new Promise(resolve => setTimeout(resolve, 100));
        !x.tgl_faktur ? vm.$bvModal.show('modal-accept-pembelian') : vm.$bvModal.show('modal-form-pembelian')
      },
      havePembelian(x){
        //jika sudah dibuatkan pembelian
        return x && x.tgl_faktur ? true : false
      },
      async getDatas() {
        const vm = this
        vm.tableBusy = true;
        let pembelian = await this.$_api.post("pembelian/havePo", {
          jumlah: vm.perPage, 
          halaman: vm.currentPage, 
          ...vm.filter,
          // tgl_awal: vm.filter.tgl_awal ? moment(vm.filter.tgl_awal).format('YYYY-MM-DD'):undefined,
          tgl_akhir: vm.filter.tgl_akhir ? moment(vm.filter.tgl_akhir).add(23, 'hours').add(59, 'minutes'):undefined,
        });
        vm.totalRows = Number.parseInt(pembelian.count)
        // console.log('pembelian ', pembelian)
        this.items = pembelian.data;
        for (let i = 0; i < this.items.length; i++) {
          let x = this.items[i];
          x.no = i + 1 + (vm.perPage * (vm.currentPage - 1));
          x.nama_tgl_po = moment(x.tgl_po).format('dddd, DD-MM-YYYY')
        }
        // this.totalRows = this.items.length;
        this.tableBusy = false;
        
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
        // console.log('list_supplier : ', list_supplier)
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      }
    },
  };
</script>

<style scoped>
  .visible {
    visibility: visible !important;
  }
  .invisible {
    visibility: hidden !important;
  }

</style>
  