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
                <strong>Inventory Controls</strong>
              </h2>
              </b-col>
                    </b-row>
            </template>
            <!-- <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-button variant="primary" v-b-modal.modal-input
                  ><i class="ri-add-line"></i> Tambah Data</b-button
                >
              </b-col>
            </b-row> -->
            <!-- <b-row>
              <b-col cols="6" md="6" lg="6">
                <s-input v-model="filterData.nama_barang" :item="{
                    label: 'Nama Barang',
                    id: 'nama_barang',
                    data: 'nama_barang',
                    value: filterData.nama_barang,
                    type: 'text',
                    class: '',
                    validation: [],
                  }" :valuee="filterData.nama_barang" />
              </b-col>
              <b-col cols="6" md="6" lg="6">
                <s-input v-model="filterData.nama_gudang" :item="{
                    label: 'Nama Gudang',
                    id: 'nama_gudang',
                    data: 'nama_gudang',
                    value: filterData.nama_gudang,
                    type: 'text',
                    class: '',
                    validation: [],
                  }" :valuee="filterData.nama_gudang" />
              </b-col>
              <b-col cols="12" md="12" lg="12">
                <div class="col-12 align-self-center p-0">
                  <button type="button" class="btn btn-light-primary mr-3" @click="getDatas()">
                    <i class="ri-save-line"></i>
                    Terapkan Filter
                  </button>
                </div>
                <hr />
              </b-col>
            </b-row> -->

            <b-alert dismissible fade :show="showing" :variant="variant">{{
              msg
            }}</b-alert>

            <form @submit.prevent="getStockList" autocomplete="off">
            <b-row v-if="isShowFilters">

              <b-col cols="12">
                
                <div class="row align-self-end">
                  <b-col cols="3" sm="3" md="3" lg="3">
                    <label for="nama_barang">Nama Barang</label>
                    <b-form-input id="nama_barang" v-model="filterData.nama_barang" placeholder="Nama Barang" type="text" size="sm"></b-form-input>
                  </b-col>
                  <b-col cols="3" sm="3" md="3" lg="3">
                    <s-input v-model="filterData.ms_gudang_id" :key="'ms_gudang_id'" :id="'ms_gudang_id'" :item="{
                      label: 'Gudang',
                      id: 'ms_gudang_id',
                      data: 'ms_gudang_id',
                      type: 'lookup-radio',
                      api: 'msGudang',
                      getter: 'msGudang',
                      setter: 'msGudang',
                      validation: [''],
                      pointer: {
                        label: 'nama_gudang',
                        code: 'id',
                        display: ['nama_gudang'],
                        mainParam: 'nama_gudang'
                      },
                    }" />
                  </b-col>
                  <!-- <b-col cols="3" sm="3" md="3" lg="3">
                    <label for="nama_gudang">Nama Gudang</label>
                    <b-form-input id="nama_gudang" v-model="filterData.nama_gudang" placeholder="Nama Gudang" type="text" size="sm"></b-form-input>
                  </b-col> -->
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

            <!-- <b-row>
              <b-col cols="12" class="d-flex justify-content-end">
                <b-form-group label="Cari" label-for="filter-input" label-cols-md="3" label-align-md="right"
                  label-size="md">
                  <b-input-group size="md">
                    <b-form-input id="filter-input" v-model="filter" type="search"
                      placeholder="Ketik disini untuk mencari ..."></b-form-input>

                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''" variant="danger">Hapus</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row> -->

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
                  :filter-included-fields="filterOn" responsive show-empty small @filtered="onFiltered" bordered striped
                  hover :busy="tableBusy">
                  <template #cell(actions)="item">
                    <b-button variant="primary" class="mr-1" v-b-tooltip.hover="'Detail Data'" v-b-modal.modal-info
                      @click="is_data = item.item">
                      <i class="ri-information-line p-0"></i> {{ item.actions }}
                    </b-button>

                    <!-- <b-button
                      variant="warning"
                      class="mr-1"
                      v-b-tooltip.hover="'Edit Data'"
                      v-b-modal.modal-edit
                      @click="is_data = item.item"
                      ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                    >

                    <b-button
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

            <b-row class="align-items-center">
              <b-col md="3">
                <b-form-group class="mb-0" label="Per Halaman" label-for="per-page-select" label-cols-md="6" label-align-md="left"
                  label-size="md" style="background-color: ">
                  <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="md"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0 w-75" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                  size="sm"></b-pagination>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- <modal-input
      :option_barang="option_barang"
      :option_gudang="option_gudang"
      :option_pembelian="option_barang"
      @alertFromChild="triggerAlert($event), getDatas()"
    /> -->
    <modal-info :data_info="is_data" @alertFromChild="triggerAlert($event)" @tutupModal="getDatas()" />
    <!-- <modal-edit
      :data_edit="is_data"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    />
    <modal-delete
      :data_delete="is_data"
      @alertFromChild="triggerAlert($event), getDatas()"
    /> -->
  </div>
</template>

<script>
import _ from "lodash";
import ModalInfo from "./ModalInfo.vue";
// import ModalInput from "./ModalInput.vue";
// import ModalEdit from "./ModalEdit.vue";
// import ModalDelete from "./ModalDelete.vue";

import { useGetAxios } from "@/composables/useAxios.js";

export default {
  components: {
    ModalInfo,
    // ModalInput,
    // ModalDelete,
    // ModalEdit,
  },
  name: "master_produsen",
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
          sortable: true,
          class: "table-number text-center",
        },

        {
          key: "nama_barang",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_gudang",
          label: "Gudang",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "jumlah_barang",
          label: "Jumlah Barang",
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

      filterData: {
        nama_barang: "",
        nama_gudang: "",
        ms_gudang_id: "",
      },
      isShowFilters: true,
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
    this.getDatas();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async getDatas() {
      await this.msBarang();
      await this.msGudang();
      await this.pembelian();
      await this.getStockList();
    },

    async getStockList() {
      try {
        this.tableBusy = true;
        let { res, err } = await useGetAxios("/stock/list", this.filterData);
        if (!res) {
          throw err;
        } else {
          this.items = res;
          for (let i = 0; i < this.items.length; i++) {
            let x = this.items[i];
            x.no = i + 1;
          }
          this.totalRows = this.items.length;
        }
      } catch (err) {
        if (err.message) {
          this.triggerAlert({
            variant: "danger",
            msg: _.toUpper(err.message),
            showing: true,
          });
        } else {
          this.triggerAlert({
            variant: "danger",
            msg: _.toUpper(err),
            showing: true,
          });
        }
      } finally {
        this.tableBusy = false;
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
          x.id = x.ms_gudang_utama_id;
        });
      }
    },
    async pembelian() {
      // let { res, err } = await this.$_api.list("pembelian");
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
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
    onSelect(selectedArray, variableName) {
      this.filter[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filter[variableName] = '';
    },
    resetFilter() {
      this.filterData = {
        nama_barang: "",
        nama_gudang: "",
        ms_gudang_id: "",
      };
    },
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 0 25px !important;
  padding-bottom: 25px !important;
}
</style>