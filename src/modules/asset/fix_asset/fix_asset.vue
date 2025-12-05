<template>
    <div class="w-100">
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" header-bg-variant="primary" class="shadow-sm">
              <template #header>
                <h5 class="mb-0 text-white">
                  <i class="ri-building-line mr-2"></i>Manajemen Aset Tetap
                </h5>
              </template>
              <b-row class="mb-3">
                <b-col cols="12" md="8" lg="8" class="mb-2 mb-md-0">
                  <div class="d-flex flex-wrap">
                    <b-button variant="primary" v-b-modal.modal-input class="mr-2 mb-2"
                      ><i class="ri-add-circle-line"></i> <span class="d-none d-sm-inline">Tambah Data</span></b-button
                    >
                    <b-button variant="info" @click="getDatas" :disabled="tableBusy" class="mr-2 mb-2">
                      <i class="ri-refresh-line" :class="{'fa-spin': tableBusy}"></i> <span class="d-none d-sm-inline">Refresh</span>
                    </b-button>
                    <b-button variant="success" @click="exportToCSV" class="mr-2 mb-2">
                      <i class="ri-file-excel-line"></i> <span class="d-none d-sm-inline">Export</span>
                    </b-button>
                  </div>
                </b-col>
                <b-col cols="12" md="4" lg="4" class="text-md-right">
                  <h4 class="mb-0">Data Aset Tetap</h4>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="12" lg="12">
                  <hr />
                </b-col>
              </b-row>
  
              <b-alert dismissible fade :show="showing" :variant="variant" class="mt-2">{{
                msg
              }}</b-alert>
  
              <b-card class="mb-3 border-0 shadow-sm">
                <b-row align-v="center">
                  <b-col md="3" sm="6">
                    <b-input-group size="sm" class="mb-2 mb-md-0">
                      <b-input-group-prepend>
                        <span class="input-group-text">Tampilkan</span>
                      </b-input-group-prepend>
                      <b-form-select
                        v-model="perPage"
                        :options="pageOptions"
                        size="sm"
                      ></b-form-select>
                      <b-input-group-append>
                        <span class="input-group-text">data</span>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  
                  <b-col md="3" sm="6" class="mb-2 mb-md-0">
                    <b-form-select 
                      v-model="selectedFilter" 
                      :options="filterColumns"
                      size="sm"
                      class="w-100"
                    ></b-form-select>
                  </b-col>
  
                  <b-col md="6">
                    <b-input-group size="sm">
                      <b-input-group-prepend>
                        <span class="input-group-text">
                          <i class="ri-search-line"></i>
                        </span>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="filter"
                        type="search"
                        placeholder="Ketik disini untuk mencari ..."
                      ></b-form-input>
  
                      <b-input-group-append>
                        <b-button
                          :disabled="!filter"
                          @click="filter = ''"
                          variant="danger"
                          size="sm"
                          ><i class="ri-close-line"></i></b-button
                        >
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
  
              <b-row>
                <b-col cols="12" md="12" lg="12">
                  <b-table
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    responsive="sm"
                    show-empty
                    small
                    @filtered="onFiltered"
                    bordered
                    striped
                    hover
                    :busy="tableBusy"
                    sticky-header="500px"
                    class="table-responsive-fix"
                  >
                    <template #table-busy>
                      <div class="text-center my-2">
                        <b-spinner class="align-middle" variant="primary"></b-spinner>
                        <strong class="ml-2">Loading...</strong>
                      </div>
                    </template>
                    <template #empty>
                      <div class="text-center text-muted my-2">
                        <i class="ri-inbox-line" style="font-size: 1.5rem;"></i>
                        <p class="mt-2">Tidak ada data</p>
                      </div>
                    </template>
                    <template #cell(actions)="item">
                      <!-- <b-button
                        variant="warning"
                        class="mr-1"
                        v-b-tooltip.hover="'Edit Data'"
                        @click="goUpdate(item.item)"
                        ><i class="ri-edit-2-line"></i> {{ item.actions }}</b-button
                      > -->
                      <b-button
                        variant="warning"
                        class="mr-1"
                        v-b-tooltip.hover="'Edit Data'"
                        v-b-modal.modal-edit
                        @click="is_data = item.item"
                        ><i class="ri-edit-2-line"></i> {{ item.actions }}</b-button
                      >
                      <b-button
                        variant="danger"
                        class="mr-1"
                        v-b-tooltip.hover="'Hapus Data'"
                        v-b-modal.modal-delete
                        @click="is_data = item.item"
                        ><i class="ri-delete-bin-2-line"></i> {{ item.actions }}</b-button
                      >
                    </template>
                  </b-table>
                </b-col>
              </b-row>
  
              <b-row class="mt-3">
                <b-col sm="6" class="mb-2 mb-sm-0 d-flex align-items-center">
                  <div class="text-muted">
                    <strong>{{ totalRows }}</strong> data ditemukan
                  </div>
                </b-col>
                <b-col sm="6" class="d-flex justify-content-sm-end">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="mb-0 pagination-sm"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <modal-input
        :ep_be="ep_be"
        :list_gudang="list_gudang"
        :list_produsen="list_produsen"
        :list_supplier="list_supplier"
        :list_tipe_asset="list_tipe_asset"
        :list_tingkat_asset="list_tingkat_asset"
        @alertFromChild="triggerAlert($event), getDatas()"
      />
      <modal-edit
        :data_edit="is_data"
        :ep_be="ep_be"
        :list_gudang="list_gudang"
        :list_produsen="list_produsen"
        :list_supplier="list_supplier"
        :list_tipe_asset="list_tipe_asset"
        :list_tingkat_asset="list_tingkat_asset"
        @alertFromChild="triggerAlert($event)"
        @tutupModal="getDatas()"
      />
      <modal-delete
        :ep_be="ep_be"
        :data_delete="is_data"
        @alertFromChild="triggerAlert($event), getDatas()"
      />
    </div>
  </template>
  
  <script>
  import _ from "lodash";
  import ModalDelete from "./modalDelete.vue";
  import ModalInput from "./modalInput.vue";
  import ModalEdit from "./modalEdit.vue";
  import { useGetAxios } from "@/composables/useAxios.js";
  
  export default {
    components: {
      ModalInput,
      ModalDelete,
      ModalEdit,
    },
    name: "tipe_asset",
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        is_data: "",
        list_tingkat_asset: [],
        list_tipe_asset: [],
        list_gudang: [],
        list_produsen: [],
        list_supplier: [],
        ep_be: "/fixAsset",
        fields: [
          {
            key: "no",
            label: "No",
            sortDirection: "desc",
            sortable: true,
            class: "table-number text-center",
          },

          {
            key: "name",
            label: "Nama",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "masa_manfaat",
            label: "Masa Manfaat",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
            
          {
            key: "coa_fixassets",
            label: "COA Fix Asset",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "coa_akumulasi",
            label: "COA Akumulasi",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "coa_bebanpenyusutan",
            label: "COA Beban Penyusutan",
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
        items: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        tableBusy: false,
        selectedFilter: null,
        filterColumns: [
          { value: null, text: 'Semua Kolom' },
          { value: 'name', text: 'Nama' },
          { value: 'masa_manfaat', text: 'Masa Manfaat' },
          { value: 'coa_fixassets', text: 'COA Fix Asset' },
          { value: 'coa_akumulasi', text: 'COA Akumulasi' },
          { value: 'coa_bebanpenyusutan', text: 'COA Beban Penyusutan' },
        ],
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
    watch: {
      selectedFilter(newVal) {
        this.setFilterColumn();
      }
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
      setFilterColumn() {
        // Update the filterOn array based on selected column
        if (this.selectedFilter) {
          this.filterOn = [this.selectedFilter];
        } else {
          this.filterOn = [];
        }
      },
      goUpdate(data){
        let vm = this
        console.log(data, 'ini data');
        let id = data.id
        vm.is_data = data
        this.$router.push(`/asset/fix_asset/update/${id}`)

      },
      async getDatas() {
        try {
          this.tableBusy = true;
          let { res, err } = await useGetAxios(this.ep_be + "/list");
            console.log(res, 'ini ress nya');
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
        let tipe_asset = await this.$_api.post("msTypeAsset/list");
        // console.log(tipe_asset);
        this.list_tipe_asset = tipe_asset.data;
        let gudang = await this.$_api.post("msGudang/list");
        // console.log(gudang);
        this.list_gudang = gudang.data;
        let produsen = await this.$_api.post("msProdusen/list");
        // console.log(produsen);
        this.list_produsen = produsen.data;
        let supplier = await this.$_api.post("msSupplier/list");
        // console.log(supplier);
        this.list_supplier = supplier.data;
        let tingkat_asset = await this.$_api.post("tingkatAsset/list");
        // console.log(tingkat_asset);
        this.list_tingkat_asset = tingkat_asset.data;
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
      exportToCSV() {
        // Check if there's data to export
        if (this.items.length === 0) {
          this.triggerAlert({
            variant: "warning",
            msg: "TIDAK ADA DATA UNTUK DIEXPORT",
            showing: true,
          });
          return;
        }

        // Create CSV content
        const csvContent = this.createCSV(this.items);
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        
        // Create download link and trigger download
        const link = document.createElement("a");
        const filename = `fixed_assets_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`;
        
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.triggerAlert({
          variant: "success",
          msg: "DATA BERHASIL DIEXPORT",
          showing: true,
        });
      },
      createCSV(data) {
        if (!data.length) return '';

        // Get all field headers except for actions
        const headers = this.fields
          .filter(field => field.key !== 'actions')
          .map(field => field.label);

        // Create CSV header row
        let csvContent = headers.join(',') + '\\n';

        // Add data rows
        data.forEach(item => {
          const row = this.fields
            .filter(field => field.key !== 'actions')
            .map(field => {
              // Handle special characters and quotes
              const value = item[field.key] !== undefined ? item[field.key] : '';
              return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
            })
            .join(',');
          
          csvContent += row + '\\n';
        });

        return csvContent;
      },
    },
  };
  </script>
  
  <style scoped>
  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }
  
  .table-responsive-fix {
    overflow-x: auto;
  }
  
  @media (max-width: 768px) {
    .pagination {
      justify-content: center;
    }
    
    .text-md-right {
      text-align: center !important;
      margin-bottom: 1rem;
    }
    
    .d-flex.flex-wrap {
      justify-content: center;
    }
  }
  </style>
  