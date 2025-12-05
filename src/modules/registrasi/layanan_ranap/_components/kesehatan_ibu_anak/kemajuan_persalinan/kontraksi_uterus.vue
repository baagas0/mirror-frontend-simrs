<template>
  <div id="page-uterus">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-uterus table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">Aksi</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Jumlah Kontraksi</b-th>
              <b-th>Lama Kontraksi</b-th>
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
                <b-form-select v-model="jumlah_kontraksi" :options="jml_kontraksi"></b-form-select>
              </b-td>

              <b-td>
                <b-form-input type="number" placeholder="Lama Kontraksi" v-model="lama_kontraksi"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in kontraksi_uterus" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) kontraksi_uterus.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.jumlah_kontraksi }}</b-td>
              <b-td>{{ item.lama_kontraksi }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>


export default {
  name: 'kontraksi_uterus',
  components: {
  },
  data() {
    return {
      jml_kontraksi: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
      ],
      tanggal_periksa: null,
      jam_periksa: null,
      jumlah_kontraksi: 1,
      lama_kontraksi: null,
    }
  },
  props: {
    kontraksi_uterus: {
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
      this.kontraksi_uterus.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        jumlah_kontraksi: vm.jumlah_kontraksi,
        lama_kontraksi: vm.lama_kontraksi
      });
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.jumlah_kontraksi = 1,
      vm.lama_kontraksi = null
    },
  }
}
</script>
<style >
#page-uterus .table-uterus th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-uterus .table-uterus th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-uterus .table-uterus th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-uterus .table-uterus th:nth-child(5) {
  border-top-right-radius: 8px;
}
</style>