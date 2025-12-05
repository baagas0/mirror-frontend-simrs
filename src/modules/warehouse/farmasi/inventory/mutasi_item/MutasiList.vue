<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col cols="12" md="12" lg="12" class="px-0">
        <b-card header-tag="header" header-bg-variant="dark">
          <template #header>
            <h5 class="mb-0" style="color: #fff">
              <strong>List Mutasi</strong>
            </h5>
          </template>
          <b-alert dismissible fade :show="showing" :variant="variant">{{ msg }}</b-alert>

          <b-row>
            <b-col cols="3">
              <b-form-group>
                <label>Status Mutasi</label>
                <b-form-select
                  v-model="list_mutasi.status_mutasi"
                  :options="[{ value: '0', text: 'Batal' }, { value: '1', text: 'Dibuat' }, { value: '2', text: 'Diproses' }]"
                ></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <label>Tanggal Akhir</label>
                <b-form-datepicker
                  class="mb-2"
                  v-model="list_mutasi.tgl_awal"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <label>Tanggal Akhir</label>
                <b-form-datepicker
                  class="mb-2"
                  v-model="list_mutasi.tgl_akhir"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <label>Gudang Sumber</label>
                <b-form-select
                  v-model="list_mutasi.ms_gudang_sumber_id"
                  :options="option_gudang"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <!-- <b-col cols="3">
              <b-form-group>
                <label>ID</label>
                <b-form-input class="mb-2" v-model="form_mutasi.id"></b-form-input>
              </b-form-group>
            </b-col> -->
            
            <!-- <b-col cols="3">
              <b-form-group>
                <label>Gudang Sumber</label>
                <b-form-select
                  v-model="form_mutasi.gudang_sumber"
                  :options="option_gudang"
                  @change="listStockByGudangId('1')"
                ></b-form-select>
              </b-form-group>
            </b-col> -->
            <b-col cols="3">
              <b-form-group>
                <label>Gudang Tujuan</label>
                <b-form-select
                  v-model="list_mutasi.ms_gudang_tujuan_id"
                  :options="option_gudang"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <div class="f-flex gap-10">
            <b-button @click="filterListMutasi()" variant="primary">
              <i class="ri-filter-line"></i> Filter
            </b-button>

            <b-button @click="resetButton">
              Reset
            </b-button>
          </div>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <hr />
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-row>
                <b-col md="3" class="d-flex align-items-center justify-center">
                  <p class="mb-0"><strong>List Daftar Mutasi</strong></p>
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
                        variant="primary"
                        class="mr-1"
                        v-b-tooltip.hover="'Pilih Mutasi'"
                        @click="addData(item.item)"
                        ><i class="ri-arrow-right-s-line"></i> {{ item.actions }}</b-button
                      >

                      <b-button
                        variant="danger"
                        class="mr-1"
                        v-b-tooltip.hover="'Hapus Mutasi'"
                        :disabled="item.item.status_mutasi != 1"
                        @click="deleteData(item.item)"
                        ><i class="ri-delete-bin-line"></i> {{ item.actions }}</b-button
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

                    <template #cell(status_mutasi)="item">
                      <!-- <pre>{{item}}</pre> -->
                      <span class="label label-lg font-weight-bolder label-inline" :class="{ 
                        'label-danger': item.item.status_mutasi == 0,
                        'label-primary': item.item.status_mutasi == 1,
                        'label-success': item.item.status_mutasi == 2,
                      }">
                        {{ status_mutasi[item.item.status_mutasi] }}
                      </span>
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
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- <modal-input
      :option_barang="option_barang"
      :option_gudang="option_gudang"
      :option_pembelian="option_barang"
      @alertFromChild="triggerAlert($event), getDatas()"
    /> -->
    <modal-info
      :data_info="is_data"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    />
    <!-- <modal-edit
      :data_edit="is_data"
      @alertFromChild="triggerAlert($event)"
      @tutupModal="getDatas()"
    />
    <modal-delete
      :data_delete="is_data"
      @alertFromChild="triggerAlert($event), getDatas()"
    /> -->
  </b-container>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import ModalInfo from "./ModalInfo.vue";
// import ModalInput from "./ModalInput.vue";
// import ModalEdit from "./ModalEdit.vue";
// import ModalDelete from "./ModalDelete.vue";

import { useGetAxios } from "@/composables/useAxios.js";
import moment from "moment";
moment.locale("id");

export default {
  components: {
    ModalInfo,
    // ModalInput,
    // ModalDelete,
    // ModalEdit,
  },
  name: "master_produsen",
  props: ["option_gudang", 'refreshListMutasi'],
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      is_data: "",
      list_mutasi: {
        gudang_sumber: "",
      },

      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },

        {
          key: "unique_code",
          label: "Kode Unik",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_gudang_sumber",
          label: "Gudang Sumber",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_gudang_tujuan",
          label: "Gudang Tujuan",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "status_mutasi",
          label: "Status",
        },
        {
          key: "tanggal_dibuat",
          label: "Dibuat Tanggal",
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

      status_mutasi: { 0: 'Batal', 1: 'Dibuat', 2: 'Diproses' }
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
    'refreshListMutasi'(newVal, oldVal){
      if(newVal != oldVal){
        this.getAllMutasi()
      }
    },
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.getAllMutasi();
  },
  methods: {
    filterListMutasi () {
      this.getListMutasi();
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async getAllMutasi() {
      try {
        let res = await axios.post(ipBackend + "/mutasi/allPagination", {
          halaman: this.currentPage,
          jumlah: this.perPage,
        });
        if (res.data.message === "sukses") {
          this.items = res.data.data;
          for (let i = 0; i < this.items.length; i++) {
            const el = this.items[i];
            el.no = i + 1;
            el.unique_code = el.mutasi_id.substring(0,8);
            el.tanggal_dibuat = this.formatTanggal(el.tgl_dibuat);
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
    async getListMutasi() {
      try {
        let res = await axios.post(ipBackend + "/mutasi/ListWithParam", {
          ...this.list_mutasi,
          tgl_awal: this.list_mutasi.tgl_awal ? this.$moment(this.list_mutasi.tgl_awal).format('YYYY-MM-DD') : undefined,
          tgl_akhir: this.list_mutasi.tgl_akhir ? this.$moment(this.list_mutasi.tgl_akhir).format('YYYY-MM-DD') : undefined,
          // status_mutasi: 1,
        });
        if (res.data.message === "sukses") {
          this.items = res.data.data;
          for (let i = 0; i < this.items.length; i++) {
            const el = this.items[i];
            el.no = i + 1;
            console.log(el.createdAt);

            el.unique_code = el.mutasi_id.substring(0,8);
            el.tanggal_dibuat = this.formatTanggal(el.createdAt);
          }

          console.log(this.items)
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

    formatTanggal(params) {
      let res = moment(params).format("DD-MM-YYYY HH:mm:ss");
      return res;
    },

    resetButton() {
      // this.list_mutasi.gudang_sumber = ""
      this.list_mutasi = {}
      this.getAllMutasi()
    },

    addData(a) {
      this.$emit("mutasiById", a)
    },

    deleteData (item) {
      this.$_alert.confirm("Apakah anda yakin ingin menghapus mutasi?")
      .then((confirm) => {
        console.log(confirm)
        if(confirm.isConfirmed) {
          this.$_api.post('mutasi/delete', { id: item.mutasi_id })
          .then((res) => {
            console.log(res)
            this.$_alert.success("Mutasi berhasil dihapus.")
          })
          .catch((err) => {
            this.$_alert.error(err)
          });
        }
      })
    },

    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
