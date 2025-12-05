<template>
  <div id="page-penyusupan">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple bordered>
          <b-thead class="table-penyusupan table-sm">
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
                <b-form-datepicker style="width: 100%"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" no-flip right locale="id"
                  v-model="tanggal_periksa"></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input type="time" v-model="jam_periksa"></b-form-input>
              </b-td>

              <b-td>
                <multiselect v-model="hasil_pemeriksaan" :options="options_hasil_pemeriksaan" :multiple="false"
                  :searchable="true" :close-on-select="true" :show-labels="false" label="nama" track-by="kode">
                </multiselect>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in penyusupan" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) penyusupan.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.kode_penyusupan }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: 'penyusupan',
  components: {
  },
  data() {
    return {
      tanggal_periksa: null,
      jam_periksa: null,
      hasil_pemeriksaan: null,
      kode_penyusupan: null,
      hasil_pemerilsaan_penyusupan: null,
      options_hasil_pemeriksaan: [
        { kode: 0, hasil: "Tulang Kepala Janin Terpisah", nama: "0 (Tulang Kepala Janin Terpisah)" },
        { kode: 1, hasil: "Tulang Kepala Janin Bersentuhan", nama: "1 (Tulang Kepala Janin Bersentuhan)" },
        { kode: 2, hasil: "Tulang Kepala Janin Tumpang Tindih tapi masih bisa dipisahkan", nama: "2 (Tulang Kepala Janin Tumpang Tindih tapi masih bisa dipisahkan)" },
        { kode: 3, hasil: "Tulang Kepala Janin Tumpang Tindih dan tidak bisa dipisahkan", nama: "3 (Tulang Kepala Janin Tumpang Tindih dan tidak bisa dipisahkan)" },
      ],
    }
  },
  props: {
    penyusupan: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
  },
  mounted() {
  },
  methods: {
    simpan() {
      let vm = this
      this.penyusupan.push({
        // partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        hasil_pemeriksaan_penyusupan: vm.hasil_pemeriksaan.hasil,
        kode_penyusupan: vm.hasil_pemeriksaan.kode,
      });
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.hasil_pemeriksaan = null
    },
  }
}
</script>
<style >
#page-penyusupan .table-penyusupan th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-penyusupan .table-penyusupan th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-penyusupan .table-penyusupan th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-penyusupan .table-penyusupan th:nth-child(4) {
  border-top-right-radius: 8px;
}
</style>
