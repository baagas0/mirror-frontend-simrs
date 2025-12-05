<template>
  <b-modal
    id="modal-pasien"
    size="xl"
    title="List Kunjungan (Pasien Internal)"
    header-bg-variant="success"
    header-text-variant="light"
    @show="openModal()"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="2" sm="2" md="2" lg="2">
              <label for="no_rm">No. RM</label>
              <b-form-input
                id="no_rm"
                v-model="filter.no_rm"
                debounce="500"
              ></b-form-input>
            </b-col>
            <b-col cols="2" sm="2" md="2" lg="2">
              <label for="no_kunjungan">No. Kunjungan</label>
              <b-form-input
                id="no_kunjungan"
                v-model="filter.no_kunjungan"
                debounce="500"
              ></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nik">NIK</label>
              <b-form-input
                id="nik"
                v-model="filter.nik"
                debounce="500"
              ></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="nama">Nama Pasien</label>
              <b-form-input
                id="nama"
                v-model="filter.nama"
                debounce="500"
              ></b-form-input>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="jenis_layanan">Jenis Layanan</label>
              <multiselect
                id="jenis_layanan"
                v-model="filter.jenis_layanan"
                :options="list_jenis_layanan"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_jenis_layanan"
                track-by="id"
                placeholder="Jenis Layanan"
              ></multiselect>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="tanggal_awal">Awal</label>
              <date-picker
                id="tanggal_awal"
                style="width: 100%"
                format="DD-MM-YYYY"
                placeholder="akhir"
                v-model="filter.tanggal_awal"
              ></date-picker>
            </b-col>
            <b-col cols="4" sm="4" md="4" lg="4">
              <label for="tanggal_akhir">Akhir</label>
              <date-picker
                id="tanggal_akhir"
                style="width: 100%"
                format="DD-MM-YYYY"
                placeholder="akhir"
                v-model="filter.tanggal_akhir"
              ></date-picker>
            </b-col>
          </b-row>

          <b-row align-h="end" align-v="center" class="mt-3 mb-4 mr-2">
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
          </b-row>

          <hr>
          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-table
                :items="items"
                :fields="fields"
                responsive
                show-empty
                small
                bordered
                striped
                hover
                :busy="tableBusy"
              >
                <template #cell(actions)="item">
                  <b-button
                    variant="success"
                    v-b-tooltip.hover="'Pilih Data'"
                    @click="$emit('pilihPasien', item.item), $bvModal.hide('modal-pasien')"
                  >
                    <i class="ri-check-line"></i> {{ item.actions }}
                  </b-button>
                </template>
              </b-table>
            </b-col>
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
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import axios from "axios";
// import { ipBackend } from "@/ipBackend";
// import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from 'moment'
export default {
  components:{
    DatePicker,
    // Multiselect,
  },
  emit: ['pilihPasien'],
  props: ['data'],
  data() {
    return {
      optionsStatusPasien: [
        {value: '0', text: 'Tidak Aktif'},
        {value: '1', text: 'Aktif'},
      ],
      //tabel
      list_jenis_layanan: [],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: {
        no_rm: null,
        no_kunjungan: null,
        nama: null,
        nik: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        jenis_layanan: null,
        ms_jenis_layanan_id: null,
      },
      pageOptions: [10, 25, 50, 100],
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
          key: "no_kunjungan",
          label: "No. Kunjungan",
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
          key: "nama_jenis_layanan",
          label: "Jenis Layanan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama_tgl_registrasi",
          label: "Tanggal Kunjungan",
          sortDirection: "desc",
          class: "text-left",
        },
      ],
    }
  },
  watch: {
    'currentPage'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'perPage'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.no_rm'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.no_kunjungan'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.nama'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.nik'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.tanggal_awal'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.tanggal_akhir'(newVar, oldVar){
      if(newVar != oldVar){
        this.getDataSearch()
      }
    },
    'filter.jenis_layanan'(newVar, oldVar){
      if(newVar != oldVar){
        this.filter.ms_jenis_layanan_id = newVar.id
        this.getDataSearch()
      }
    },
  },
  async mounted(){
    //jenis_layanan
    let list_jenis_layanan = await this.$_api.post("msJenisLayanan/list");
    this.list_jenis_layanan = list_jenis_layanan.status == 200 ? list_jenis_layanan.data.map(x => { return x }) : []
    console.log('list_jenis_layanan', list_jenis_layanan)
  },
  methods: {
    async openModal(){
      this.getDataSearch()
    },
    getDataSearch(){
      const vm = this
      vm.tableBusy = true
      this.$_api
      .post("registrasi/listPerHalaman", {
          ...vm.filter,
          // ms_asuransi_id: vm.asuransi ? vm.asuransi.id : null,
          jumlah: vm.perPage, 
          halaman: vm.currentPage, 
        })
      .then((res) => {
          // console.log('registrasi/listPerHalaman', res);            
          vm.items = res.status == 200 ? res.data.map((item, idx) => {return {
            no: idx + 1 + (this.currentPage - 1) * this.perPage,
            nama_tgl_registrasi: item.tgl_registrasi ? moment(item.tgl_registrasi).format("YYYY-MM-DD") : '-',
            nama_jenis_kelamin: item.jenis_kelamin == 'L' ? 'Laki Laki' : 'Perempuan',
            nama_status_pasien: item.status_pasien == 1 ? 'Aktif' : 'Tidak Aktif',
            ...item
          }}) : []
          vm.totalRows = parseInt(res.count)
          vm.tableBusy = false
      })
      .catch((err) => {
          console.log(err)
      });
    },
    refresh(){
      this.filter = {
        no_rm: null,
        no_kunjungan: null,
        nama: null,
        nik: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        jenis_layanan: null,
        ms_jenis_layanan_id: null,
      }
      this.getDataSearch()
    }
  },
}
</script>