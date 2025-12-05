<template>
  <b-modal
    id="modal-pasien"
    size="xl"
    :title="'Riwayat Kunjungan ('+ (dataRegistrasi && dataRegistrasi.nama_lengkap ? dataRegistrasi.nama_lengkap : '-') +')'"
    header-bg-variant="success"
    header-text-variant="light"
    @show="openModal()"
  >
  <!-- {{ dataRegistrasi }} -->
    <b-container fluid>
      <b-row v-if="dataRegistrasi && dataRegistrasi.no_rm">
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <!-- <b-col cols="2" sm="2" md="2" lg="2">
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
            </b-col> -->
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
                
                bordered
                striped
                hover
                :busy="tableBusy"
              >
                <template #cell(actions)="item">
                  <!-- <router-link v-if="item.item.nama_jenis_layanan === 'IGD'" :to="`/registrasi/layanan_igd/triage?registrasi_id=${item.item.triage_id}`">
                    <b-button variant="primary" class="btn-sm">
                      Triage
                    </b-button>
                  </router-link>
                  <router-link v-if="item.item.nama_jenis_layanan === 'Rawat Jalan'" :to="`/registrasi/layanan_rjalan/keperawatan?registrasi_id=${item.item.registrasi_id}`">
                    <b-button variant="info" class="btn-sm">
                      Keperawatan
                    </b-button>
                  </router-link>
                  <router-link v-if="item.item.nama_jenis_layanan === 'Rawat Jalan'" :to="`/registrasi/layanan_rjalan/medis?registrasi_id=${item.item.registrasi_id}`">
                    <b-button variant="primary" class="btn-sm">
                      Medis
                    </b-button>
                  </router-link>
                  <router-link v-if="item.item.nama_jenis_layanan === 'Rawat Inap'" :to="`/registrasi/layanan_ranap/cppt?registrasi_id=${item.item.registrasi_id}`">
                    <b-button variant="success" class="btn-sm">
                      CPPT
                    </b-button>
                  </router-link> -->
                  <b-button v-if="item.item.nama_jenis_layanan === 'IGD'" variant="primary" class="btn-sm" @click="navigateTo('igd', item.item.triage_id)">
                    Triage
                  </b-button>
                  <b-button v-if="item.item.nama_jenis_layanan === 'Rawat Jalan'" variant="info" class="btn-sm" @click="navigateTo('keperawatan', item.item.registrasi_id)">
                    Keperawatan
                  </b-button>
                  <b-button v-if="item.item.nama_jenis_layanan === 'Rawat Jalan'" variant="primary" class="btn-sm" @click="navigateTo('medis', item.item.registrasi_id)">
                    Medis
                  </b-button>
                  <b-button v-if="item.item.nama_jenis_layanan === 'Rawat Inap'" variant="success" class="btn-sm" @click="navigateTo('cppt', item.item.registrasi_id)">
                    CPPT
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
      <h5 v-else >No RM tidak ditemukan</h5>
    </b-container>
  </b-modal>
</template>
<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from 'moment'
export default {
  components:{
    DatePicker,
    Multiselect,
  },
  // emit: ['pilihPasien'],
  props: ['dataRegistrasi'],
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
      //   no_rm: null,
      //   no_kunjungan: null,
      //   nama: null,
      //   nik: null,
        tanggal_awal: null,
        tanggal_akhir: null,
      //   jenis_layanan: null,
      //   ms_jenis_layanan_id: null,
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
        // {
        //   key: "actions",
        //   label: "Actions",
        //   class: "table-option-2 text-center",
        // },
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
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
          // thStyle: { width: "15rem" },
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
    // 'filter': {
    //   deep: true,
    //   handler(newVar, oldVar){
    //     if(newVar != oldVar){
    //       this.getDataSearch()
    //     }
    //   }
    // },
  },
  async mounted(){
    //jenis_layanan
    let list_jenis_layanan = await this.$_api.post("msJenisLayanan/list");
    this.list_jenis_layanan = list_jenis_layanan.status == 200 ? list_jenis_layanan.data.map(x => { return x }) : []
  },
  methods: {
    logg(item){
    },
    navigateTo(type, registrasiId) {
      let targetPath = '';
      
      switch(type) {
        case 'igd':
          targetPath = `/registrasi/layanan_igd/triage?registrasi_id=${registrasiId}`;
          break;
        case 'keperawatan':
          targetPath = `/registrasi/layanan_rjalan/keperawatan?registrasi_id=${registrasiId}`;
          break;
        case 'medis':
          targetPath = `/registrasi/layanan_rjalan/medis?registrasi_id=${registrasiId}`;
          break;
        case 'cppt':
          targetPath = `/registrasi/layanan_ranap/cppt?registrasi_id=${registrasiId}`;
          break;
      }
      
      // Always force navigation with timestamp
      // this.$router.push({
      //   path: targetPath.split('?')[0],
      //   query: { 
      //     registrasi_id: registrasiId,
      //     _t: Date.now()
      //   }
      // });

      // Close the modal first
      this.$bvModal.hide('modal-pasien');
      
      // Check if we're on the same route
      this.$router.push('/').then(() => {
        this.$router.push({
          path: targetPath,
          query: { registrasi_id: registrasiId }
        });
      });
    },
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
          no_rm: this.dataRegistrasi.no_rm,
          jumlah: vm.perPage, 
          halaman: vm.currentPage, 
        })
      .then((res) => {
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