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
                    <strong>Penjualan</strong>
                  </h2>
                </b-col>
              </b-row>
            </template>

            <b-alert dismissible fade :show="showing" :variant="variant">{{ msg }}</b-alert>

            <form @submit.prevent="getPenjualanList" autocomplete="off">
              <b-row v-if="isShowFilters">
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="kelas_kunjungan">Kelas Kunjungan</label>
                  <multiselect id="kelas_kunjungan" v-model="filter.kelas_kunjungan" :options="list_kelas_kunjungan" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_kelas_kunjungan" track-by="kelas_kunjungan_id" placeholder="Kelas Kunjungan" size="sm"> </multiselect>
                </b-col>
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="gudang">Gudang</label>
                  <multiselect id="gudang" v-model="filter.gudang" :options="list_gudang" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_gudang" track-by="id" placeholder="Gudang" size="sm"></multiselect>
                </b-col>
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="jenis_layanan">Jenis Layanan</label>
                  <multiselect id="jenis_layanan" v-model="filter.jenis_layanan" :options="list_jenis_layanan" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_jenis_layanan" track-by="id" placeholder="Jenis Layanan" size="sm"></multiselect>
                </b-col>
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="asuransi">Asuransi</label>
                  <multiselect id="asuransi" v-model="filter.asuransi" :options="list_asuransi" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_asuransi" track-by="id" placeholder="Asuransi" size="sm"></multiselect>
                </b-col>
              </b-row>
              <b-row v-if="isShowFilters" class="mt-4">
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="dokter">Dokter</label>
                  <multiselect id="dokter" v-model="filter.dokter" :options="list_dokter" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_dokter" track-by="ms_dokter_id" placeholder="Dokter" size="sm"></multiselect>
                </b-col>
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="no_rm">No RM</label>
                  <b-form-input v-model="filters.no_rm" placeholder="Ketik no RM" type="text"></b-form-input>
                </b-col>
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="no_kunjungan">No Kunjungan</label>
                  <b-form-input v-model="filters.no_kunjungan" placeholder="Ketik no kunjungan" type="text"></b-form-input>
                </b-col>
                <b-col cols="3" sm="3" md="3" lg="3">
                  <label for="kode_penjualan">No Penjualan</label>
                  <b-form-input v-model="filters.kode_penjualan" placeholder="Ketik kode penjualan" type="text"></b-form-input>
                </b-col>
              </b-row>

              <div class="row align-self-end" :class="[isShowFilters ? 'my-4' : 'my-0 mb-4']">
                <b-col cols="12" sm="12" md="12" lg="12">
                  <button v-if="isShowFilters" type="submit" class="btn btn-light-primary">
                    <i class="ri-save-line"></i>
                    Terapkan Filter
                  </button>
                  <div v-if="isShowFilters" @click="resetData" class="btn btn-light-danger">
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
            <!-- <b-row align-h="end" align-v="center" class="mt-3 mb-4 mr-2">
              <b-col cols="auto">
                <b-row>
                  <b-col cols="auto" class="m-0 p-0">
                    <b-button cols="6" @click="resetData()" :disabled="tableBusy" variant="danger">
                      Reset
                    </b-button>
                  </b-col>
                  <b-col cols="auto" class="m-0 p-0 ml-2">
                    <b-button @click="getDatas()" :disabled="tableBusy" variant="success">
                      Cari
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row> -->

            <b-row>
              <b-col cols="12" md="12" lg="12">
                <b-table :items="items" :fields="fields" responsive show-empty small bordered striped hover :busy="tableBusy">
                  <template #cell(is_external)="item">
                    <span class="badge badge-primary" v-if="item.item.is_external">External</span>
                    <span class="badge badge-success" v-else>Internal</span>
                  </template>
                  <template #cell(actions)="item">
                    <div class="text-nowrap">
                      <b-button variant="warning" class="mr-1" v-b-modal.modal-open-edit @click="is_data = item.item"><i class="ri-edit-2-line"></i></b-button>
                      <b-button variant="danger" class="" @click="(is_data = item.item), $bvModal.show('modal-delete-penjualan')"><i class="ri-delete-bin-2-line"></i></b-button>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="1">
                <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="md"></b-form-select>
              </b-col>
              <b-col md="5" offset-md="6">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"></b-pagination>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-delete-penjualan" size="md" centered title="Perhatian .... !!!" header-bg-variant="danger" header-text-variant="light">
      <p>Apakah anda yakin ingin Menghapus Penjualan</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-delete-penjualan')"> Tidak </b-button>
        <b-button variant="primary" @click="deletePenjualan()"> Ya </b-button>
      </template>
    </b-modal>
    <ModalOpenEdit :data="is_data" />
  </div>
</template>

<script>
import moment from "moment";
import Multiselect from "vue-multiselect";
// import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import ModalOpenEdit from "./modalOpenEdit.vue";
moment.locale("id");

export default {
  components: {
    Multiselect,
    // DatePicker,
    ModalOpenEdit,
  },
  name: "daftar_penjualan",
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
          key: "kode_penjualan",
          label: "No. Penjualan",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "no_kunjungan",
          label: "No. Kunjungan",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "no_rm",
          label: "No. Rm",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama",
          label: "Pasien",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "NIK",
          label: "NIK",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_jenis_layanan",
          label: "Jenis Layanan",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_kelas_kunjungan",
          label: "Kelas Kunjungan",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_asuransi",
          label: "Asuransi",
          sortable: false,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "is_external",
          label: "Pasien",
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
      filters: {
        no_rm: "",
        no_kunjungan: "",
        kode_penjualan: "",
      },
      filterOn: [],
      tableBusy: false,
      list_gudang: [],
      list_jenis_layanan: [],
      list_asuransi: [],
      list_kelas_kunjungan: [],
      list_dokter: [],
      isShowFilters: true,
    };
  },
  computed: {},
  watch: {
    currentPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas();
      }
    },
    perPage(newVar, oldVar) {
      if (newVar != oldVar && newVar) {
        this.getDatas();
      }
    },
    // 'filter.kelas_kunjungan'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
    // 'filter.gudang'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
    // 'filter.jenis_layanan'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
    // 'filter.asuransi'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
    // 'filter.dokter'(newVar, oldVar) {
    //   if (newVar != oldVar) {
    //     this.getDatas()
    //   }
    // },
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    async getDatas() {
      await this.getPenjualanList();
      //gudang
      let list_gudang = await this.$_api.post("msGudang/list");
      this.list_gudang =
        list_gudang.status == 200
          ? list_gudang.data.map((x) => {
              return x;
            })
          : [];
      //jenis layanan
      let list_jenis_layanan = await this.$_api.post("msJenisLayanan/list");
      this.list_jenis_layanan =
        list_jenis_layanan.status == 200
          ? list_jenis_layanan.data.map((x) => {
              return x;
            })
          : [];
      //asuransi
      let list_asuransi = await this.$_api.post("msAsuransi/list");
      this.list_asuransi = list_asuransi.status == 200 ? list_asuransi.data : [];
      //kelas kunjungan
      let list_kelas_kunjungan = await this.$_api.post("KelasKunjungan/list");
      this.list_kelas_kunjungan =
        list_kelas_kunjungan.status == 200
          ? list_kelas_kunjungan.data.map((x) => {
              return { ...x, nama_kelas: `${x.nama_kelas_kunjungan} - ${x.nama_tarif}` };
            })
          : [];
      //dokter
      // let list_dokter = await this.$_api.post("msDokter/list");
      // this.list_dokter = list_dokter.status == 200 ? list_dokter.data : []
      let list_dokter = await this.$_api.post("msDokter/list");
      this.list_dokter = list_dokter.status == 200 ? list_dokter.data : [];
    },
    async getPenjualanList() {
      this.tableBusy = true;
      await this.$_api
        .post("penjualan/list", {
          jumlah: this.perPage,
          halaman: this.currentPage,
          kelas_kunjungan_id: this.filter.kelas_kunjungan ? this.filter.kelas_kunjungan.kelas_kunjungan_id : null,
          ms_gudang_id: this.filter.gudang ? this.filter.gudang.id : null,
          ms_asuransi_id: this.filter.asuransi ? this.filter.asuransi.id : null,
          ms_jenis_layanan_id: this.filter.jenis_layanan ? this.filter.jenis_layanan.id : null,
          ms_dokter_id: this.filter.dokter ? this.filter.dokter.ms_dokter_id : null,
          no_rm: this.filters.no_rm,
          no_kunjungan: this.filters.no_kunjungan,
          kode_penjualan: this.filters.kode_penjualan,
        })
        .then((res) => {
          const penjualan = res.data;
          this.totalRows = Number.parseInt(res.count);

          this.items = penjualan;
          for (let i = 0; i < this.items.length; i++) {
            let x = this.items[i];
            x.no = i + 1 + this.perPage * (this.currentPage - 1);
            x.nama_tgl_faktur = moment(x.tgl_faktur).format("dddd, DD-MM-YYYY");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.tableBusy = false;
    },
    async deletePenjualan() {
      const vm = this;
      const penjualan = await this.$_api.post("penjualan/delete", { id: vm.is_data.penjualan_id });
      console.log("deletePenjualan", penjualan);
      if (penjualan.status == 200) {
        vm.getDatas();
        vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Menghapus Penjualan", showing: true });
        vm.$bvModal.hide("modal-delete-penjualan");
      }
    },
    resetData() {
      const vm = this;
      vm.filter = {};
      vm.filters = {
        no_rm: "",
        no_kunjungan: "",
        kode_penjualan: "",
      };
    },
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
