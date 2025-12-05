<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>Adjustment Stock</strong>
              </h5>
            </template>

            <b-alert dismissible fade :show="showing" :variant="variant">{{
              msg
            }}</b-alert>

            <b-row>
              <b-col cols="4">
                <b-form-group>
                  <label >Tanggal</label>
                  <b-form-datepicker
                    class="mb-2"
                    :disabled="disabled_gudang"
                    v-model="form_adjustment.is_tgl_adjustment"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="4" offset-lg="4">
                <b-form-group>
                  <label>Gudang</label>
                  <b-form-select
                    v-model="form_adjustment.is_gudang_id"
                    :options="option_gudang"
                    :disabled="disabled_gudang"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="text-right">
                <b-button variant="primary" @click="mulaiBuat">Buat Adjustment</b-button>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <hr />
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-container>
                  <b-row>
                    <b-col md="5">
                      <p>Daftar Item</p>
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
                        <template #cell(actions)="item">
                          <b-button
                            variant="warning"
                            class="mr-1"
                            v-b-tooltip.hover="'Edit Data'"
                            v-b-modal.modal-edit
                            @click="is_data = item.item"
                            ><i class="ri-pencil-line"></i> {{ item.actions }}</b-button
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

              <b-col>
                <b-container>
                  <b-row>
                    <b-col md="5">
                      <p>Item Adjustment</p>
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
                            v-model="filter_adjustment"
                            type="search"
                            placeholder="Ketik disini untuk mencari ..."
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              :disabled="!filter_adjustment"
                              @click="filter_adjustment = ''"
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
                        :items="items_adjustment"
                        :fields="fields_adjustment"
                        :current-page="currentPage_adjustment"
                        :per-page="perPage_adjustment"
                        :filter="filter_adjustment"
                        :filter-included-fields="filterOn_adjustment"
                        responsive
                        show-empty
                        small
                        @filtered="onFiltered_adjustment"
                        bordered
                        striped
                        hover
                        :busy="tableBusy_adjustment"
                      >
                        <template #cell(actions)="item">
                          <b-button
                            variant="danger"
                            class="mr-1"
                            v-b-tooltip.hover="'Hapus Data'"
                            v-b-modal.modal-delete
                            @click="is_data = item.item"
                            ><i class="ri-delete-bin-6-line"></i> {{ item.actions }}</b-button
                          >
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>

                  <b-row v-if="items_adjustment.length">
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
                          v-model="perPage_adjustment"
                          :options="pageOptions_adjustment"
                          size="md"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>

                    <b-col md="5" offset-md="1">
                      <b-pagination
                        v-model="currentPage_adjustment"
                        :total-rows="totalRows_adjustment"
                        :per-page="perPage_adjustment"
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
                <b-button variant="primary" @click="simpanAdjustment">Simpan</b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <modal-edit
      :data_edit="is_data"
      :data_adjustment="form_adjustment"
      @alertFromChild="
        triggerAlert($event), getListSubAdjustmentByAdjustmentId(), listStockByGudangId()
      "
      @tutupModal="getListSubAdjustmentByAdjustmentId(), listStockByGudangId()"
    />
    <modal-delete
      :data_delete="is_data"
      @alertFromChild="
        triggerAlert($event), getListSubAdjustmentByAdjustmentId(), listStockByGudangId()
      "
    />
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";

import ModalEdit from "./ModalEdit.vue";
import ModalDelete from "./ModalDelete.vue";

import { useGetAxios } from "@/composables/useAxios.js";
import moment from "moment";
moment.locale("id");

export default {
  components: {
    ModalEdit,
    ModalDelete,
  },
  name: "master_produsen",
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      is_data: "",
      form_adjustment: {
        is_gudang_id: "",
        is_tgl_adjustment: "",
        is_kode_adjustment: "",
        is_status_adjustment: null,
        qty_stock_adjustment: "",
        adjustment_id: "",
        stock_id: "",
      },
      disabled_gudang: false,

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
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
          // thStyle: { width: "20%" },
        },
      ],
      fields_adjustment: [
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
          key: "qty_stock_adjustment",
          label: "Opname",
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

      items: [],
      items_adjustment: [],

      option_barang: [],
      option_gudang: [],
      option_pembelian: [],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      tableBusy: false,

      totalRows_adjustment: 1,
      currentPage_adjustment: 1,
      perPage_adjustment: 10,
      pageOptions_adjustment: [10, 25, 50, 100],
      filter_adjustment: null,
      filterOn_adjustment: [],
      tableBusy_adjustment: false,
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
    onFiltered_adjustment(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows_adjustment = filteredItems.length;
      this.currentPage_adjustment = 1;
    },

    mulaiBuat() {
      if (!this.form_adjustment.is_tgl_adjustment || !this.form_adjustment.is_gudang_id) {
        return this.triggerAlert({
          variant: "danger",
          msg: _.toUpper("tanggal dan gudang tidak boleh kosong"),
          showing: true,
        });
      } else {
        this.listStockByGudangId()
        this.createAdjustment()
      }
    },

    getToday() {
      this.form_adjustment.is_tgl_adjustment = moment().format("YYYY-MM-DD");
      // console.log(this.form_adjustment.is_tgl_adjustment);
    },
    async msGudang() {
      let { res, err } = await useGetAxios("/msGudang/list" , {});
      console.log('msGudang', res, err)
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
    async listStockByGudangId() {
      this.items = [];

      try {
        let res = await axios.post(ipBackend + "/stock/listStockByGudangId", {
          ms_gudang_id: this.form_adjustment.is_gudang_id,
        });
        let x = res.data;
        if (x.message === "sukses") {
          if (!x.data.length) {
            this.items = [];
            throw "tidak ada item";
          } else {
            this.items = x.data;
            for (let i = 0; i < this.items.length; i++) {
              let x = this.items[i];
              x.no = i + 1;
            }
            this.totalRows = this.items.length;
            this.disabled_gudang = true;
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
    async createAdjustment() {
      this.items_adjustment = [];

      try {
        let res = await axios.post(ipBackend + "/adjustment/register", {
          tgl_adjusment: this.form_adjustment.is_tgl_adjustment,
          status_adjustment: 1,
          ms_gudang_id: this.form_adjustment.is_gudang_id,
          idgl_tambah: null,
          idgl_kurang: null,
        });
        console.log("create adjustment", res);
        let x = res.data;
        if (x.message === "sukses") {
          this.form_adjustment.adjustment_id = x.data.id;
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

    async getListSubAdjustmentByAdjustmentId() {
      try {
        let res = await axios.post(
          ipBackend + "/subAdjustment/listSubAdjustmentByAdjustmentId",
          {
            adjustment_id: this.form_adjustment.adjustment_id,
          }
        );
        if (res.data.message === "sukses") {
          this.items_adjustment = res.data.data;
          for (let i = 0; i < this.items_adjustment.length; i++) {
            const el = this.items_adjustment[i];
            el.no = i + 1;
          }
        } else {
          throw res.data;
        }
      } catch (err) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },

    async simpanAdjustment() {
      try {
        let res = await axios.post(ipBackend + "/adjustment/simpanAdjustment", {
          adjustment_id: this.form_adjustment.adjustment_id,
        });
        if (res.data.message === "sukses") {
          this.triggerAlert({
            variant: "success",
            msg: _.toUpper("BERHASIL MENYIMPAN DATA"),
            showing: true,
          });
          this.resetButton();
        } else {
          throw res.data;
        }
      } catch (err) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },

    resetButton() {
      this.items = [];
      this.items_adjustment = [];
      this.disabled_gudang = false;
      this.form_adjustment = {
        is_gudang_id: "",
        // is_tgl_adjustment: "",
        is_kode_adjustment: "",
        is_status_adjustment: "",
      };
    },

    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
