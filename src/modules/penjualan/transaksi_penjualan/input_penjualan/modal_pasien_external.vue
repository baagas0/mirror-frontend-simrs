<template>
  <b-modal id="modal-pasien-external" size="xl" title="Pasien External" header-bg-variant="success" header-text-variant="light" @show="openModal()" hide-footer>
    <!-- <b-container fluid> -->
    <b-card class="" header-tag="header" header-bg-variant="dark">
      <template #header>
        <h5 class="mb-0" style="color: #fff">
          <strong>Input Pasien</strong>
        </h5>
      </template>
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label> No. RM </template>
          <b-form-input :state="checkIfValid('pasien_id')" type="text" v-model="is_data.no_rm" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> NIK </template>
          <b-form-input :state="checkIfValid('NIK')" type="text" v-model="$v.is_data.NIK.$model"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Nama Pasien <span class="text-danger">*</span> </template>
          <b-form-input :state="checkIfValid('nama_penjualan_external')" type="text" v-model="$v.is_data.nama_penjualan_external.$model"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Alamat <span class="text-danger">*</span> </template>
          <b-form-input :state="checkIfValid('alamat_penjualan_external')" type="text" v-model="$v.is_data.alamat_penjualan_external.$model"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label> Keterangan </template>
          <b-form-input :state="checkIfValid('keterangan_penjualan_external')" type="text" v-model="$v.is_data.keterangan_penjualan_external.$model"></b-form-input>
        </b-form-group>
      </b-form>
      <div class="d-flex justify-content-end">
        <b-button class="mr-2" variant="warning" @click="$bvModal.hide('modal-pasien-external')"> Batal </b-button>
        <b-button class="" variant="primary" :disabled="tableBusy || !isValid" @click="$emit('pilihPasienExternal', is_data), $bvModal.hide('modal-pasien-external')"> Simpan </b-button>
      </div>
    </b-card>
    <b-card class="" header-tag="header" header-bg-variant="dark">
      <template #header>
        <h5 class="mb-0" style="color: #fff">
          <strong>Pilih Pasien</strong>
        </h5>
      </template>
      <b-row class="px-1">
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="no_rm">No RM</label>
              <b-form-input id="no_rm" v-model="filter.no_rm" debounce="300"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="NIK">NIK</label>
              <b-form-input id="NIK" v-model="filter.NIK" debounce="300"></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nama_lengkap">Nama Pasien</label>
              <b-form-input id="nama_lengkap" v-model="filter.nama_lengkap" debounce="300"></b-form-input>
            </b-col>
          </b-row>

          <!-- <b-row align-h="end" align-v="center" class="mt-3 mb-4 mr-2">
              <b-col cols="auto">
                <b-row>
                  <b-col cols="auto" class="m-0 p-0 mr-2">
                    <b-button @click="refresh()" :disabled="tableBusy" variant="danger">
                      Reset
                    </b-button>
                  </b-col>
                  <b-col cols="auto" class="m-0 p-0">
                    <b-button @click="getDataSearch()" :disabled="tableBusy" variant="success">
                      Cari
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row> -->

          <hr />
          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-table :items="items" :fields="fields" responsive show-empty small bordered striped hover :busy="tableBusy">
                <template #cell(actions)="item">
                  <b-button variant="success" @click="pilihPasien(item.item)"> <i class="ri-check-line"></i> {{ item.actions }} </b-button>
                </template>
              </b-table>
              <b-col cols="12" class="">
                <b-row>
                  <b-col md="2">
                    <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
                  </b-col>
                  <b-col md="5" offset-md="5">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="m-0 p-0"></b-pagination>
                  </b-col>
                </b-row>
              </b-col>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <!-- </b-container> -->
  </b-modal>
</template>
<script>
import moment from "moment";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  emit: ["pilihPasienExternal"],
  props: ["dataHeader"],
  data() {
    return {
      is_data: {
        no_rm: null,
        NIK: null,
        pasien_id: null,
        nama_penjualan_external: null,
        alamat_penjualan_external: null,
        keterangan_penjualan_external: null,
      },
      filter: {
        no_rm: null,
        nama_lengkap: null,
        NIK: null,
        status_pasien: null,
      },
      optionsStatusPasien: [
        { value: "0", text: "Tidak Aktif" },
        { value: "1", text: "Aktif" },
      ],
      //tabel
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [1, 10, 25, 50, 100],
      tableBusy: false,
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          class: "table-number text-center",
        },
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
        },
        {
          key: "no_rm",
          label: "No. RM",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nik",
          label: "NIK",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_lengkap",
          label: "Nama Pasien",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_status_pasien",
          label: "Status",
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "nama_jenis_kelamin",
          label: "Jenis Kelamin",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_tanggal_lahir",
          label: "Tanggal Lahir",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "alamat_sekarang",
          label: "Alamat",
          sortDirection: "desc",
          class: "text-left",
        },
      ],
    };
  },
  computed: {
    formString() {
      return JSON.stringify(this.is_data, null, 4);
    },
    isValid() {
      return !this.$v.is_data.$invalid;
    },
    isDirty() {
      return this.$v.is_data.$anyDirty;
    },
  },
  mixins: [validationMixin],
  validations: {
    is_data: {
      pasien_id: {},
      nama_penjualan_external: { required },
      NIK: {},
      alamat_penjualan_external: { required },
      keterangan_penjualan_external: {},
    },
  },
  watch: {
    currentPage(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDataSearch();
      }
    },
    perPage(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDataSearch();
      }
    },
    "filter.no_rm"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDataSearch();
      }
    },
    "filter.nama_lengkap"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDataSearch();
      }
    },
    "filter.NIK"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDataSearch();
      }
    },
  },
  async mounted() {
    this.getDataSearch();
  },
  methods: {
    async openModal() {
      const vm = this;
      vm.is_data.no_rm = vm.dataHeader.no_rm;
      vm.is_data.NIK = vm.dataHeader.NIK;
      vm.is_data.pasien_id = vm.dataHeader.pasien_id;
      vm.is_data.nama_penjualan_external = vm.dataHeader.nama_penjualan_external;
      vm.is_data.alamat_penjualan_external = vm.dataHeader.alamat_penjualan_external;
      vm.is_data.keterangan_penjualan_external = vm.dataHeader.keterangan_penjualan_external;
    },
    async pilihPasien(data) {
      const vm = this;
      vm.is_data.no_rm = data.no_rm;
      vm.is_data.NIK = data.nik;
      vm.is_data.pasien_id = data.pasien_id;
      vm.is_data.nama_penjualan_external = data.nama_lengkap;
      vm.is_data.alamat_penjualan_external = data.alamat_sekarang;
      vm.is_data.keterangan_penjualan_external = null;
    },
    async getDataSearch() {
      const vm = this;
      vm.tableBusy = true;
      const pasien = await this.$_api.post("pasien/listPerhalaman", {
        ...vm.filter,
        halaman: vm.currentPage,
        jumlah: vm.perPage,
      });
      // console.log('pasien/listPerhalaman', pasien)
      vm.items =
        pasien.status == 200
          ? pasien.data.map((item, idx) => {
              return {
                no: idx + 1 + (this.currentPage - 1) * this.perPage,
                nama_tanggal_lahir: item.tgl_lahir ? moment(item.tgl_lahir).format("YYYY-MM-DD") : "-",
                nama_jenis_kelamin: item.jenis_kelamin == "L" ? "Laki Laki" : "Perempuan",
                nama_status_pasien: item.status_pasien == 1 ? "Aktif" : "Tidak Aktif",
                ...item,
              };
            })
          : [];
      vm.totalRows = parseInt(pasien.count);
      vm.tableBusy = false;
    },
    refresh() {
      this.filter = {
        no_rm: null,
        nama_lengkap: null,
        NIK: null,
        status_pasien: null,
      };
      this.getDataSearch();
    },
    checkIfValid(fieldName) {
      const field = this.$v.is_data[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
  },
};
</script>
