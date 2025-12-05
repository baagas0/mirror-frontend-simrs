<template>
  <b-modal
    id="modal-idgl"
    size="xl"
    title="IDGL"
    header-bg-variant="success"
    header-text-variant="light"
    @show="openModal()"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-row>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="idgl_id">ID</label>
              <b-form-input
                id="idgl_id"
                v-model="filter.idgl_id"
                debounce="300"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="idgl">IDGL</label>
              <b-form-input
                id="idgl"
                v-model="filter.idgl"
                debounce="300"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="tanggal_idgl">Tanggal</label>
              <date-picker
                id="tanggal_idgl"
                style="width: 100%"
                format="DD-MM-YYYY"
                placeholder="tanggal"
                v-model="filter.tanggal_idgl"
              ></date-picker>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="no_invoice">NO. Invoice</label>
              <b-form-input
                id="no_invoice"
                v-model="filter.no_invoice"
                debounce="300"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="judul">Judul</label>
              <b-form-input
                id="judul"
                v-model="filter.judul"
                debounce="300"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="keterangan">Keterangan</label>
              <b-form-input
                id="keterangan"
                v-model="filter.keterangan"
                debounce="300"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="type">Type</label>
              <b-form-input
                id="type"
                v-model="filter.type"
                debounce="300"
              ></b-form-input>
            </b-col>
            <b-col cols="3" sm="3" md="3" lg="3">
              <label for="interesting_by">Inserting By</label>
              <b-form-input
                id="interesting_by"
                v-model="filter.interesting_by"
                debounce="300"
              ></b-form-input>
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
                    @click="$emit('pilihPasien', item.item), $bvModal.hide('modal-idgl')"
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
import moment from 'moment'
export default {
  components:{
    // DatePicker,
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
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: {
        no_rm: null,
        no_kunjungan: null,
        nama: null,
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
          ms_jenis_layanan_id: vm.jenis_layanan ? vm.jenis_layanan.id : null,
          ms_asuransi_id: vm.asuransi ? vm.asuransi.id : null,
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
      }
      this.getDataSearch()
    }
  },
}
</script>