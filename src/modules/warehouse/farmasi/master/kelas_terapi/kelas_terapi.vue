<template>
    <div>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" header-bg-variant="dark">
              <template #header>
                <h5 class="mb-0" style="color: #fff">
                  <strong>Kelas Terapi</strong>
                </h5>
              </template>
              <b-row>
                <b-col cols="12" md="12" lg="12">
                  <b-button variant="primary" v-b-modal.modal-input
                    ><i class="ri-add-line"></i> Tambah Data</b-button
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
                        ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                      >
  
                      <b-button
                        variant="danger"
                        class="mr-1"
                        v-b-tooltip.hover="'Hapus Data'"
                        v-b-modal.modal-delete
                        @click="is_data = item.item"
                        ><CIcon name="cil-trash" /> {{ item.actions }}</b-button
                      >
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
      <modal-input @alertFromChild="triggerAlert($event), getDatas()" />
      <modal-edit
        :data_edit="is_data"
        @alertFromChild="triggerAlert($event)"
        @tutupModal="getDatas()"
      />
      <modal-delete
        :data_delete="is_data"
        @alertFromChild="triggerAlert($event), getDatas()"
      />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ipBackend } from "@/ipBackend";
  import ModalDelete from "./modalDelete.vue";
  import ModalInput from "./modalInput.vue";
  import ModalEdit from "./modalEdit.vue";
  
  export default {
    components: {
      ModalInput,
      ModalDelete,
      ModalEdit,
    },
    name: "jenis_obat",
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
            key: "nama_kelas_terapi",
            label: "Nama Kelas Terapi",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },

          {
            key: "narkotiknya",
            label: "is Narkotik",
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
    mounted() {
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
        this.tableBusy = true;
        let kelas_terapi = await axios.get(ipBackend + "msKelasTerapi/list");
  
        this.items = kelas_terapi.data.data;
        console.log(this.items);
        for (let i = 0; i < this.items.length; i++) {
          let x = this.items[i];
          x.no = i + 1;
          if(x.is_narkotik == true){
            x.narkotiknya = "Ya"
          }else {
            x.narkotiknya = "Tidak"
          }
        }
        this.totalRows = this.items.length;
        this.tableBusy = false;
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      }
    },
  };
  </script>
  