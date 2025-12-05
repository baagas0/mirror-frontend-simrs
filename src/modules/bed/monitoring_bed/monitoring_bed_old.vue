<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-card header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>Monitoring Bed</strong>
              </h5>
            </template>
            <!-- <b-row>
                <b-col cols="12" md="12" lg="12">
                  <b-button variant="primary" v-b-modal.modal-input
                    ><i class="ri-add-line"></i> Tambah Data</b-button
                  >
                </b-col>
              </b-row> -->
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
                  label="Nama Bed"
                  label-cols-md="5"
                  label-align-md="left"
                  label-size="md"
                  style="background-color: "
                >
                  <multiselect
                    v-model="bed_id"
                    :options="options_bed"
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="nama_bed"
                    track-by="ms_bed_id"
                    placeholder="-- Pilih Bed --"
                    size="sm"
                  ></multiselect>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  label="Nama Pasien"
                  label-cols-md="5"
                  label-align-md="left"
                  label-size="md"
                  style="background-color: "
                >
                  <b-form-input
                    type="text"
                    v-model="param.nama_lengkap"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  label="No. RM"
                  label-cols-md="5"
                  label-align-md="left"
                  label-size="md"
                  style="background-color: "
                >
                  <b-form-input
                    type="text"
                    v-model="param.no_rm"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  label="Checkout"
                  label-cols-md="5"
                  label-align-md="left"
                  label-size="md"
                  style="background-color: "
                >
                  <b-form-select
                    v-model="param.status_checkout"
                    :options="optionsCheckout"
                  ></b-form-select>
                </b-form-group>
              </b-col>

              <!-- <b-col md="6" offset-md="3">
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
                </b-col> -->
            </b-row>
            <b-row>
              <b-col md="12" class="mb-4">
                <b-row>
                  <b-col md="6">
                    <b-button
                      style="width: 100%"
                      variant="success"
                      @click="cari()"
                      >Cari</b-button
                    >
                  </b-col>
                  <b-col md="6">
                    <b-button
                      style="width: 100%"
                      variant="danger"
                      @click="reset()"
                      >Reset</b-button
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>

            <!-- <pre>{{ items }}</pre> -->
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
                      @click="checkoutBed(item.item)"
                      :disabled="item.item.status_checkout !== 0"
                      ><i class="ri-logout-box-r-line"></i> Checkout</b-button
                    >
                    <b-button
                      variant="warning"
                      class="mr-1"
                      v-b-modal.modal-pindah
                      @click="(data = item.item), (edit = !edit)"
                      ><i class="ri-edit-line"></i> Pindah</b-button
                    >
                    <!-- <b-button
                        variant="danger"
                        class="mr-1"
                        v-b-tooltip.hover.click="'Hapus Data'"
                        v-b-modal.modal-delete
                        @click="data = item.item"
                        ><CIcon name="cil-trash" /> {{ item.actions }}</b-button
                      > -->
                  </template>
                  <template #cell(is_checkout)="item">
                    <h4>
                      <b-badge
                        v-if="item.item.status_checkout == 0"
                        variant="danger"
                        >{{ item.item.is_checkout }}</b-badge
                      >
                    </h4>
                    <h4>
                      <b-badge
                        v-if="item.item.status_checkout == 1"
                        variant="success"
                        >{{ item.item.is_checkout }}</b-badge
                      >
                    </h4>
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
    <!-- <modal-input 
        :option_ruang="option_ruang"
        @alertFromChild="triggerAlert($event), getDatas()" 
      /> -->
    <!-- <pre>data {{data}}</pre>
      <pre>options_kelas_kamar {{options_kelas_kamar}}</pre>
      <pre>edit {{edit}}</pre> -->
    <modal-pindah
      :data="data"
      :options_kelas_kamar="options_kelas_kamar"
      :edit="edit"
      @alertFromChild="triggerAlert($event), getDatas()"
    />
    <modal-edit
      :data="data"
      :edit="edit"
      @alertFromChild="triggerAlert($event)"
    />
    <!-- <modal-delete
        :data="data"
        @alertFromChild="triggerAlert($event), getDatas()"
      /> -->
  </div>
</template>

<script>
// import this.$_api from "this.$_api";
import { ipBackend } from "@/ipBackend";
//   import ModalDelete from "./modalDelete.vue";
import Multiselect from "vue-multiselect";
import ModalPindah from "./alih_bed.vue";
import ModalEdit from "./update.vue";
import moment from "moment";
moment.locale("ID");
export default {
  components: {
    ModalPindah,
    //   ModalDelete,
    ModalEdit,
    Multiselect,
  },
  name: "master_kamar",
  data() {
    return {
      showing: false,
      variant: "success",
      param: {
        status_checkout: "",
        // no_kunjungan: "",
        nama_lengkap: "",
        no_rm: "",
        ms_bed_id: "",
        halaman: "",
        jumlah: "",
      },
      bed_id: "",
      options_bed: [],
      options_kelas_kamar: [],
      msg: "",
      data: "",
      edit: false,
      optionsMonitoring: [
        { value: "0", text: "False" },
        { value: "1", text: "True" },
      ],
      optionsCheckout: [
        { value: "0", text: "Belum" },
        { value: "1", text: "Sudah" },
      ],
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },

        {
          key: "nama_bed",
          label: "Nama Bed",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },

        {
          key: "no_kunjungan",
          label: "No Kunjungan",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_lengkap",
          label: "Nama Pasien",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },

        {
          key: "tgl_masuk",
          label: "Tanggal Masuk",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },

        // {
        //   key: "tgl_keluar",
        //   label: "Tanggal Keluar",
        //   sortable: true,
        //   sortDirection: "desc",
        //   class: "text-left",
        // },

        //   {
        //     key: "statusbednya",
        //     label: "Status",
        //     sortable: true,
        //     sortDirection: "desc",
        //     class: "text-left",
        //   },

        {
          key: "is_checkout",
          label: "Status",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },

        {
          key: "keterangan_history_bed",
          label: "Keterangan",
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
      option_ruang: [],
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
    currentPage: {
      handler(newVal, oldVal) {
        console.log(newVal);
        this.getDatas()
      },
      deep: true,
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
    cari() {
      let vm = this;
      vm.param.ms_bed_id = vm.bed_id.ms_bed_id;
      vm.getDatas();
    },
    reset() {
      let vm = this;
      vm.param.status_checkout = "";
      vm.bed_id = "";
      vm.param.ms_bed_id = "";
      vm.param.nama_lengkap = "";
      vm.param.no_rm = "";
      vm.getDatas();
    },
    checkoutBed(monitoring) {
      console.log(monitoring.history_bed_id);
      // return
      this.$_alert
        .confirm("Apakah anda yakin ingin melakukan checkout bed?")
        .then((status) => {
          console.log(status);
          if (status.isConfirmed) {
            this.$_api
              .post("historyBed/checkout", { id: monitoring.history_bed_id })
              .then((response) => {
                this.$_alert.success("Bed berhasil checkout");
                this.getDatas();
              })
              .then((err) => {
                console.log(err);
                this.$_alert.error(err, "Gagal checkout bed");
                this.getDatas();
              });
          } else {
            this.$_alert.error({}, "Checkout bed dibatalkan");
          }
        });
    },
    async getDatas() {
      let vm = this;
      this.tableBusy = true;
      vm.param.halaman = vm.currentPage;
      vm.param.jumlah = vm.perPage;

      console.log(vm.currentPage);
      console.log(vm.param.halaman);
      let bed = await this.$_api.post("msBed/list");
      // console.log(bed, 'ini res bed');
      this.options_bed = bed.data;
      let kamar = await this.$_api.post("msBed/monitoring", vm.param);
      // console.log(kamar, 'ini ress monitoring');
      this.items = kamar.data;
      for (let i = 0; i < this.items.length; i++) {
        let x = this.items[i];
        x.no = i + 1;
        if (x.tgl_mulai == null) {
          x.tgl_masuk = "-";
        } else {
          x.tgl_masuk = moment(x.tgl_mulai).format("DD MMMM YYYY HH.mm");
        }
        if (x.tgl_selesai == null) {
          x.tgl_keluar = "-";
        } else {
          x.tgl_keluar = moment(x.tgl_selesai).format("DD MMMM YYYY HH.mm");
        }
        if (x.status_checkout == 0) {
          x.is_checkout = "Terpakai";
        } else if (x.status_checkout == 1) {
          x.is_checkout = "Tersedia";
        }
      }
      this.totalRows = kamar.count;
      this.tableBusy = false;

      let kelas_kamar = await this.$_api.post("msKelasKamar/list");
      // console.log(kelas_kamar);
      this.options_kelas_kamar = kelas_kamar.data;

      // let bed = await this.$_api.get(ipBackend + "msBed/list");
      //   console.log(bed, 'ini res bed');
      //   this.options_bed = bed.data.data;

      console.log(">>>>>>>>>>>>>>>", this.items);
    },
    triggerAlert(event) {
      let vm = this;
      vm.getDatas();
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
