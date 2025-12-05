<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="12" lg="12">
        <b-card header-tag="header" header-bg-variant="dark">
          <template #header>
            <h5 class="mb-0" style="color: #fff">
              <strong>Daftar Jurnal</strong>
            </h5>
          </template>
          <b-alert dismissible fade :show="showing" :variant="variant">{{ msg }}</b-alert>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-button variant="primary" @click="goInputJurnal"
                ><i class="ri-add-circle-line p-0"></i> Tambah Data</b-button
              >
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
                    <p>List Daftar Mutasi</p>
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
                      <template #cell(actions)="item">
                        <b-button
                            variant="warning"
                            class="mr-1"
                            v-b-tooltip.hover="'Edit Data'"
                            @click="setJurnalId(item.item)"
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

                <b-row>
                  <b-col md="4" lg="2">
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
                  <b-col md="4" lg="6" offset-md="4">
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
        </b-card>
      </b-col>
    </b-row>

    <!-- <modal-input
      @alertFromChild="triggerAlert($event), getDatas()"
    />
    <modal-edit
      :data_edit="is_data"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    /> -->
    <modal-delete
      :data_delete="is_data"
      @alertFromChild="triggerAlert($event), getDatas()"
    />
  </b-container>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
// import ModalInput from "./ModalInput.vue";
// import ModalEdit from "./ModalEdit.vue";
import ModalDelete from "./ModalDelete.vue";

import moment from "moment";
moment.locale("id");

export default {
  components: {
    // ModalInput,
    // ModalEdit,
    ModalDelete,
  },
  name: "akuntasi_periode",
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
          key: "idgl",
          label: "IDGL",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "tgl",
          label: "Tanggal",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "judul",
          label: "Judul",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "no_invoice",
          label: "No. Invoice",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "remark",
          label: "Remark",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "amount_debet",
          label: "Debet",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "amount_kredit",
          label: "Kredit",
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
      //   option_gudang: [],

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
      try {
        let res = await this.$_api.post("transaksi/list");
        if (res.message === "sukses") {
          this.items = res.data;
          for (let i = 0; i < this.items.length; i++) {
            const el = this.items[i];
            el.no = i + 1;
            el.tgl_sync = this.formatTanggal(el.tgl_sync);
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

    goInputJurnal() {
      this.$router.push({ path: "/akuntansi/transaksi_akt/input_jurnal"})
    },
    async setJurnalId(data_jurnal) {
      console.log(data_jurnal);
      await localStorage.setItem("jnl_dt", JSON.stringify(data_jurnal.id))
      await this.goInputJurnal()
    },
    formatTanggal(params) {
      let tgl_fmt = moment(params).format("DD-MM-YYYY HH:mm:ss");
      return tgl_fmt;
    },

    resetButton() {
      this.list_mutasi.gudang_sumber = ""
      this.getDatas()
    },

    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
