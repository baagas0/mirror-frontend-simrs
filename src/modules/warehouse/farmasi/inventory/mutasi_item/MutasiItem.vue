<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>Mutasi Item</strong>
              </h5>
            </template>

            <b-row>
              <b-col cols="3">
                <b-form-group>
                  <label>ID</label>
                  <b-form-input class="mb-2" v-model="form_mutasi.id" :disabled="is_disabled"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>Tanggal</label>
                  <b-form-datepicker
                    class="mb-2"
                    v-model="form_mutasi.tgl_mutasi"
                    :disabled="is_disabled"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>Gudang Sumber</label>
                  <b-form-select
                    v-model="form_mutasi.gudang_sumber"
                    :disabled="is_disabled"
                    :options="option_gudang"
                    @change="listStockByGudangId('1')"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                  <label>Gudang Tujuan</label>
                  <b-form-select
                    v-model="form_mutasi.gudang_tujuan"
                    :disabled="is_disabled"
                    :options="option_gudang"
                    @change="listStockByGudangId('2')"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <hr />
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-container fluid>
                  <b-row>
                    <b-col md="3">
                      <p>Item Transfer</p>
                    </b-col>
                    <b-col md="5" offset-md="4">
                      <b-form-group
                        label="Cari"
                        label-for="filter-input"
                        label-cols-md="3"
                        label-align-md="right"
                        label-size="md"
                      >
                        <b-input-group size="md">
                          <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            placeholder="Ketik disini untuk mencari ..."
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              :disabled="!filter"
                              @click="filter = ''"
                              variant="danger"
                              >Hapus</b-button
                            >
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="12" md="12" lg="12">
                      <b-table
                        :items="items"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        responsive
                        show-empty
                        small
                        @filtered="onFiltered"
                        bordered
                        striped
                        hover
                        :busy="tableBusy"
                      >
                        <template #cell(qty_sub)="item">
                          <b-form-group>
                            <b-form-input v-model="item.item.qty_sub" :disabled="is_disabled" type="number">
                            </b-form-input>
                          </b-form-group>
                        </template>

                        <template #cell(actions)="item">
                          <!-- <b-button
                            variant="primary"
                            class="mr-1"
                            v-b-tooltip.hover="'Pilih Stock'"
                            @click="addData(item.item)"
                            ><CIcon name="cil-caret-right" /> {{ item.actions }}</b-button
                          > -->

                          <!-- <b-button
                            variant="warning"
                            class="mr-1"
                            v-b-tooltip.hover="'Edit Data'"
                            v-b-modal.modal-edit
                            @click="is_data = item.item"
                            ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                          > -->

                            <!-- v-b-tooltip.hover="'Hapus Data'" -->
                          <b-button
                            variant="danger"
                            class="mr-1"
                            v-b-modal.modal-delete
                            :disabled="is_disabled"
                            @click="deleteData('items', item.index)"
                            ><i class="ri-delete-bin-line"></i> {{ item.actions }}</b-button
                          >
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>

                  <b-row v-if="items.length">
                    <b-col md="7" lg="6">
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
                    <b-col md="5" offset-lg="1">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                      ></b-pagination>
                    </b-col>
                  </b-row>
                </b-container>
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
              <b-col>
                <b-container fluid>
                  <b-row>
                    <b-col md="5">
                      <p>Gudang Sumber</p>
                    </b-col>

                    <b-col md="7">
                      <b-form-group
                        label="Cari"
                        label-for="filter-input"
                        label-cols-md="3"
                        label-align-md="right"
                        label-size="md"
                      >
                        <b-input-group size="md">
                          <b-form-input
                            id="filter-input"
                            v-model="filter_sumber"
                            type="search"
                            placeholder="Ketik disini untuk mencari ..."
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              :disabled="!filter_sumber"
                              @click="filter_sumber = ''"
                              variant="danger"
                              >Hapus</b-button
                            >
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="12" md="12" lg="12">
                      <b-table
                        :items="items_sumber"
                        :fields="fields_sumber"
                        :current-page="currentPage_sumber"
                        :per-page="perPage_sumber"
                        :filter="filter_sumber"
                        :filter-included-fields="filterOn_sumber"
                        responsive
                        show-empty
                        small
                        @filtered="onFiltered_sumber"
                        bordered
                        striped
                        hover
                        :busy="tableBusy_sumber"
                      >
                        <template #cell(actions)="item">
                          <b-button
                            variant="primary"
                            class="mr-1"
                            v-b-tooltip.hover="'Pilih Stock'"
                            @click="addData(item.item)"
                            :disabled="is_disabled"
                            ><i class="ri-arrow-right-s-line"></i> {{ item.actions }}</b-button
                          >

                          <!-- <b-button
                            variant="warning"
                            class="mr-1"
                            v-b-tooltip.hover="'Edit Data'"
                            v-b-modal.modal-edit
                            @click="is_data = item.item"
                            ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                          > -->

                          <!-- <b-button
                            variant="danger"
                            class="mr-1"
                            v-b-tooltip.hover="'Hapus Data'"
                            v-b-modal.modal-delete
                            @click="is_data = item.item"
                            ><CIcon name="cil-trash" /> {{ item.actions }}</b-button
                          > -->
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>

                  <b-row v-if="items_sumber.length">
                    <b-col md="7" lg="6">
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
                          v-model="perPage_sumber"
                          :options="pageOptions_sumber"
                          size="md"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="5" offset-lg="1">
                      <b-pagination
                        v-model="currentPage_sumber"
                        :total-rows="totalRows_sumber"
                        :per-page="perPage_sumber"
                        align="fill"
                        size="sm"
                      ></b-pagination>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>

              <b-col>
                <b-container fluid>
                  <b-row>
                    <b-col md="5">
                      <p>Gudang Tujuan</p>
                    </b-col>

                    <b-col md="7">
                      <b-form-group
                        label="Cari"
                        label-for="filter-input"
                        label-cols-md="3"
                        label-align-md="right"
                        label-size="md"
                      >
                        <b-input-group size="md">
                          <b-form-input
                            id="filter-input"
                            v-model="filter_tujuan"
                            type="search"
                            placeholder="Ketik disini untuk mencari ..."
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              :disabled="!filter_tujuan"
                              @click="filter_tujuan = ''"
                              variant="danger"
                              >Hapus</b-button
                            >
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="12" md="12" lg="12">
                      <b-table
                        :items="items_tujuan"
                        :fields="fields_tujuan"
                        :current-page="currentPage_tujuan"
                        :per-page="perPage_tujuan"
                        :filter="filter_tujuan"
                        :filter-included-fields="filterOn_tujuan"
                        responsive
                        show-empty
                        small
                        @filtered="onFiltered_tujuan"
                        bordered
                        striped
                        hover
                        :busy="tableBusy_tujuan"
                      >
                        <template #cell(actions)="item">
                          <!-- <b-button
                            variant="primary"
                            class="mr-1"
                            v-b-tooltip.hover="'Pilih Data'"
                            v-b-modal.modal-info
                            @click="is_data = item.item"
                            ><CIcon name="cil-info" /> {{ item.actions }}</b-button
                          >

                          <b-button
                            variant="warning"
                            class="mr-1"
                            v-b-tooltip.hover="'Edit Data'"
                            v-b-modal.modal-edit
                            @click="is_data = item.item"
                            ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                          > -->

                          <!-- <b-button
                            variant="danger"
                            class="mr-1"
                            v-b-tooltip.hover="'Hapus Data'"
                            @click="deleteData(item.item, item.index)"
                            ><i class="ri-delete-bin-line"></i> {{ item.actions }}</b-button
                          > -->
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>

                  <b-row v-if="items_tujuan.length">
                    <b-col md="7" lg="6">
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
                          v-model="perPage_tujuan"
                          :options="pageOptions_tujuan"
                          size="md"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>

                    <b-col md="5" offset-md="1">
                      <b-pagination
                        v-model="currentPage_tujuan"
                        :total-rows="totalRows_tujuan"
                        :per-page="perPage_tujuan"
                        align="fill"
                        size="sm"
                      ></b-pagination>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="12" lg="12">
                <hr />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button variant="outline-danger" @click="resetButton">Reset</b-button>
              </b-col>
              <b-col class="text-right">
                <b-button variant="primary" @click="openModal" :disabled="is_disabled">Simpan</b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <ListMutasi :option_gudang="option_gudang" :refreshListMutasi="refreshListMutasi" @mutasiById="getMutasiById" ref="getMutasi" />
      </b-row>
    </b-container>
    <!-- <modal-input
      :option_barang="option_barang"
      :option_gudang="option_gudang"
      :option_pembelian="option_barang"
      @alertFromChild="triggerAlert($event), getDatas()"
    /> -->
    <!-- <modal-info
      :data_info="is_data"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    /> -->
    <!-- <modal-edit
      :data_edit="is_data"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    />
    <modal-delete
      :data_delete="is_data"
      @alertFromChild="triggerAlert($event), getDatas()"
    /> -->
    <modal-options
      @simpanMutasi="simpanData"
      @prosesMutasi="prosesData"
      :form_mutasi="form_mutasi"
    />
    
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import ListMutasi from "./MutasiList.vue"
import ModalOptions from "./ModalOptions.vue";
// import ModalInfo from "./ModalInfo.vue";
// import ModalInput from "./ModalInput.vue";
// import ModalEdit from "./ModalEdit.vue";
// import ModalDelete from "./ModalDelete.vue";

import { useGetAxios } from "@/composables/useAxios.js";

export default {
  components: {
    ListMutasi,
    ModalOptions,
    // ModalInfo,
    // ModalInput,
    // ModalDelete,
    // ModalEdit,
  },
  name: "mutasi_item",
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      is_data: "",
      refreshListMutasi: 0,

      is_disabled: false,
      form_mutasi: {
        id: "",
        tgl_mutasi: "",
        gudang_sumber: "",
        gudang_tujuan: "",
      },

      option_barang: [],
      option_gudang: [],
      option_pembelian: [],

      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },

        {
          key: "kode_produk",
          label: "Kode",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "kode_batch",
          label: "Batch",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_barang",
          label: "Barang",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "qty",
          label: "Stock",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "qty_sub",
          label: "Mutasi",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          thStyle: { width: "20%" },
        },

        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
          // thStyle: { width: "20%" },
        },
      ],
      fields_sumber: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },

        {
          key: "kode_produk",
          label: "Kode",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "kode_batch",
          label: "Batch",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_barang",
          label: "Barang",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "qty",
          label: "Stock",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
          // thStyle: { width: "20%" },
        },
      ],
      fields_tujuan: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },

        {
          key: "kode_produk",
          label: "Kode",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "kode_batch",
          label: "Batch",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_barang",
          label: "Barang",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "qty",
          label: "Stock",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        // {
        //   key: "actions",
        //   label: "Actions",
        //   class: "table-option-2 text-center",
        //   thStyle: { width: "20%" },
        // },
      ],

      items: [],
      items_sumber: [],
      items_tujuan: [],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      tableBusy: false,

      totalRows_sumber: 1,
      currentPage_sumber: 1,
      perPage_sumber: 10,
      pageOptions_sumber: [10, 25, 50, 100],
      filter_sumber: null,
      filterOn_sumber: [],
      tableBusy_sumber: false,

      totalRows_tujuan: 1,
      currentPage_tujuan: 1,
      perPage_tujuan: 10,
      pageOptions_tujuan: [10, 25, 50, 100],
      filter_tujuan: null,
      filterOn_tujuan: [],
      tableBusy_tujuan: false,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.msGudang();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onFiltered_sumber(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows_sumber = filteredItems.length;
      this.currentPage_sumber = 1;
    },
    onFiltered_tujuan(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows_tujuan = filteredItems.length;
      this.currentPage_tujuan = 1;
    },

    async msGudang() {
      let { res, err } = await useGetAxios("/msGudang/list");
      if (!res) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err),
          showing: true,
        });
      } else {
        this.option_gudang = res;
        this.option_gudang.forEach((x) => {
          x.text = x.nama_gudang;
          x.value = x.id;
        });
      }
    },

    async listStockByGudangId(a) {
      let gudang_id = "";
      // let _var = ""
      if (a === "1") {
        // _var = "_sumber"
        // this["items" + _var] = [];
        this.items_sumber = [];
        gudang_id = this.form_mutasi.gudang_sumber;
      } else {
        this.items_tujuan = [];
        gudang_id = this.form_mutasi.gudang_tujuan;
      }

      try {
        let res = await axios.post(ipBackend + "/stock/listStockByGudangId", {
          ms_gudang_id: gudang_id,
        });
        let x = res.data;
        if (x.message === "sukses") {
          if (!x.data.length) {
            if (a === "1") {
              this.items_sumber = [];
            } else {
              this.items_tujuan = [];
            }
          } else {
            for (let i = 0; i < x.data.length; i++) {
              let el = x.data[i];
              el.no = i + 1;
            }
            if (a === "1") {
              this.items_sumber = x.data;
              this.totalRows_sumber = this.items_sumber.length;
            } else {
              this.items_tujuan = x.data;
              this.totalRows_tujuan = this.items_tujuan.length;
            }
          }
        } else {
          throw x;
        }
      } catch (err) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },

    async msBarang() {
      let { res, err } = await useGetAxios("/msBarang/list");
      if (!res) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err),
          showing: true,
        });
      } else {
        this.option_barang = res;
        this.option_barang.forEach((x) => {
          x.text = x.nama_barang;
          x.id = x.ms_barang_id;
        });
      }
    },

    async pembelian() {
      let { res, err } = await useGetAxios("/pembelian/list");
      if (!res) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err),
          showing: true,
        });
      } else {
        this.option_pembelian = res;
        this.option_pembelian.forEach((x, i) => {
          x.text = "pembelian " + i;
          x.id = x.pembelian_id;
        });
      }
    },

    addData(a) {
      let obj = Object.assign({}, a);
      obj.no = this.items.length + 1;
      this.items.push(obj);
    },
    deleteData(name, index) {
      const vm = this
      vm[name].splice(index, 1)
    },
    openModal() {
      console.log("ads");
      this.$bvModal.show("modal-options");
    },
    async simpanData() {
      let formMutasi = {
        ms_gudang_sumber_id: this.form_mutasi.gudang_sumber,
        ms_gudang_tujuan_id: this.form_mutasi.gudang_tujuan,
        sub_mutasi: this.items,
      };
      console.log("form mutasi", formMutasi);
  
      try {
        if(this.form_mutasi.gudang_sumber && this.form_mutasi.gudang_tujuan && this.items.length > 0){
          let res = await axios.post(ipBackend + "/mutasi/createMutasi", formMutasi);
          if (res.data.message === "sukses") {
            console.log(res.data.data);
            this.resetButton();
            this.$refs.getMutasi.getAllMutasi()
          } else {
            throw res.data;
          }
        }else{
          this.$store.commit("set_alert", {
            variant: "warning",
            msg: _.toUpper('Data Tidak Valid'),
          });
        }
      } catch (err) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },

    async prosesData() {

      const form = this.form_mutasi
      console.log('jalan')

      if(!form.id) {
        this.$_alert.error('Mutasi tidak ditemukan')
        return
      }

      if(!form.tgl_mutasi) {
        this.$_alert.error('Tanggal mutasi tidak ditemukan.')
        return
      }

      console.log("proses data");
      this.$_api.post('mutasi/proses', { 
        id: this.form_mutasi.id, 
        tanggal_mutasi: this.form_mutasi.tgl_mutasi 
      }).then((res) => {
        console.log("Proses Mutasiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        console.log('res', res)
        this.refreshListMutasi++
        if(res.status == 200){
          this.$_alert.success('Berhasil melakukan mutasi.')
          this.listStockByGudangId('1')
          this.listStockByGudangId('2')
        }else{
          console.log('res.message', res.message)
          // this.$_alert.error(res)
          this.$_alert.error({}, 'Error', res.message)
          // this.$store.commit("set_alert", {
          //   variant: "warning",
          //   msg: _.toUpper(res.message),
          // });
        }
      })
      .catch((err) => {
        console.log('err', err)
        this.$_alert.error(err)
      })
    },

    async getMutasiById(a) {
      console.log("getMutasiById", a.mutasi_id);
      try {
        // let res = await axios.post(ipBackend + "mutasi/listWithParam", {
        //   id: a.mutasi_id
        // })
        // if (res.data.message === "sukses") {
        //   console.log(res.data.data);
        //   this.form_mutasi.id = a.mutasi_id
        // } else {
        //   throw res.data;
        // }

        console.log('getMutasiById xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', a.mutasi_id);
        const req = await this.$_api.post('mutasi/detailsById', { id: a.mutasi_id });
        const data = req.data
        console.log(data)

        if (req.message !== "sukses") throw data

        this.form_mutasi.id = data.mutasi_id
        this.form_mutasi.tgl_mutasi = data.tanggal_mutasi
        this.form_mutasi.gudang_sumber = data.ms_gudang_utama_id_sumber
        this.form_mutasi.gudang_tujuan = data.ms_gudang_utama_id_tujuan
        this.form_mutasi.status_mutasi = data.status_mutasi
        if(this.form_mutasi && this.form_mutasi.status_mutasi && this.form_mutasi.status_mutasi != 1) this.is_disabled = true
        else this.is_disabled = false

        this.items = data.subMutasi.map((x, index) => { return { ...x, id: x.sub_mutasi_id, no: index+1 } })
        this.listStockByGudangId('1')
        this.listStockByGudangId('2')
        // this.form_mutasi.tgl_mutasi = data.tanggal_mutasi
        // this.form_mutasi.tgl_mutasi = data.tanggal_mutasi
        // this.form_mutasi.tgl_mutasi = data.tanggal_mutasi
        // this.form_mutasi.tgl_mutasi = data.tanggal_mutasi

      } catch (err) {
        console.error(err)
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },

    resetButton() {
      this.items = [];
      this.items_sumber = [];
      this.items_tujuan = [];
      this.is_disabled = false
      this.form_mutasi = {
        gudang_sumber: "",
        gudang_tujuan: "",
      };
    },
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
