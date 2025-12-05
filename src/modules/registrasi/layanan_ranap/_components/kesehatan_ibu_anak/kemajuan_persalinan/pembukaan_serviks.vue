<template>
  <div id="page-buka-serviks">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-buka-serviks table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">Aksi</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Besar Pembukaan</b-th>
              <b-th>Besar Penurunan</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>
                <b-button @click="simpan()" variant="success" size="sm">
                  <i class="ri-add-line"></i>
                </b-button>
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
                <b-form-select v-model="besar_pembukaan" :options="options_besar_pembukaan"></b-form-select>
              </b-td>

              <b-td>
                <b-form-select v-model="besar_penurunan" :options="options_besar_penurunan"></b-form-select>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in pembukaan_serviks" :key="idx">
              <!-- <b-td>{{ idx + 1 }}</b-td> -->
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) pembukaan_serviks.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td class="align-middle">{{ item.tanggal_periksa | parse('date') }}</b-td>
              <b-td class="align-middle">{{ item.jam_periksa }}</b-td>
              <b-td class="align-middle">{{ item.besar_pembukaan }}</b-td>
              <b-td class="align-middle">{{ item.besar_penurunan }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: 'pembukaan_serviks',
  data() {
    return {
      options_besar_pembukaan: [
        { value: 0, text: "0" },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
        { value: 7, text: "7" },
        { value: 8, text: "8" },
        { value: 9, text: "9" },
        { value: 10, text: "10" },
      ],
      options_besar_penurunan: [
        { value: 0, text: "0" },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
      ],
      besar_pembukaan: null,
      besar_penurunan: null,
      tanggal_periksa: null,
      jam_periksa: null,
      list_data: [],
    }
  },
  props: {
    pembukaan_serviks: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
  },
  // computed: {
  //   partograf_id() {
  //     return this.$store.state.partograf_id
  //   },
  // },
  mounted() {
  },
  methods: {
    simpan() {
      let vm = this

      this.pembukaan_serviks.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        besar_pembukaan: vm.besar_pembukaan,
        besar_penurunan: vm.besar_penurunan
      })

      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.besar_pembukaan = null,
      vm.besar_penurunan = null
    },
  }
}
</script>
<style >
#page-buka-serviks .table-buka-serviks th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-buka-serviks .table-buka-serviks th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-buka-serviks .table-buka-serviks th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-buka-serviks .table-buka-serviks th:nth-child(5) {
  border-top-right-radius: 8px;
}
</style>
