<template>
  <div id="page-warna">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-warna table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">Aksi</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Hasil Pemeriksaan</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>
                <b-button @click="simpan()" variant="success" size="sm"><i class="ri-add-line"></i></b-button>
              </b-td>
              <b-td>
                <b-form-datepicker
                style="width: 100%"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                no-flip
                right
                locale="id"
                v-model="tanggal_periksa"
              ></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input
                  type="time"
                  v-model="jam_periksa"
                ></b-form-input>
              </b-td>

              <b-td>
                <Multiselect v-model="hasil_pemeriksaan" 
                  :options="options_hasil_pemeriksaan"
                  :multiple="false"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="false"
                  label="nama"
                  track-by="kode"
                ></Multiselect>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in warna_air" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) warna_air.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.kode_warna_air }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>  
</template>

<script>


export default {
  name: 'warna_air',
  components: {
  },
  data() {
      return {
        tanggal_periksa: null,
        jam_periksa: null,
        hasil_pemeriksaan: null,
        kode_warna_air: null,
        hasil_pemerilsaan_warna_air: null,
        options_hasil_pemeriksaan: [
          {kode: "U", hasil: "Ketuban Belum Pecah", nama: "U (Ketuban Belum Pecah)"},
          {kode: "J", hasil: "Ketuban Pecah dan Air Jernih", nama: "J (Ketuban Pecah dan Air Jernih)"},
          {kode: "M", hasil: "Ketuban Pecah dan Air Bercampur Mekonium", nama: "M (Ketuban Pecah dan Air Bercampur Mekonium)"},
          {kode: "D", hasil: "Ketuban Pecah dan Air Bercampur Darah", nama: "D (Ketuban Pecah dan Air Bercampur Darah)"},
          {kode: "K", hasil: "Ketuban Pecah tetapi Air Kering", nama: "K (Ketuban Pecah tetapi Air Kering)"},
        ],
        list_data: [],
      }
    },
    props: {
      warna_air: {
        type: Array,
        required: true,
        default() {
          return []
        }
      },
    },
    mounted(){
    },
    methods: {
      simpan(){
        let vm = this
        this.warna_air.push({
          partograf_id: vm.partograf_id,
          tanggal_periksa: vm.tanggal_periksa,
          jam_periksa: vm.jam_periksa,
          hasil_pemeriksaan_warna_air: vm.hasil_pemeriksaan.hasil,
          kode_warna_air: vm.hasil_pemeriksaan.kode,
        })
        vm.tanggal_periksa = null
        vm.jam_periksa = null,
        vm.hasil_pemeriksaan = null
        
      },
    }
}
</script>

<style >
  #page-warna .table-warna th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
  }
  #page-warna .table-warna  th, td{
  border: 1px solid #F1F1F1 !important;
  }
  
  #page-warna .table-warna  th:nth-child(1) {
  border-top-left-radius: 8px;
  }
  
  #page-warna .table-warna th:nth-child(4) {
  border-top-right-radius: 8px;
  }
  </style>
