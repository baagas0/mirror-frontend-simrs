<template>
  <div id="page-urine">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-urine table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">No.</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Protein</b-th>
              <b-th>Glukosa</b-th>
              <b-th>Aseton</b-th>
              <b-th>Volume</b-th>
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
                <b-form-select :options="options_protein" v-model="protein"></b-form-select>
              </b-td>
              <b-td>
                <b-form-select :options="options_glukosa" v-model="glukosa"></b-form-select>
              </b-td>
              <b-td>
                <b-form-select :options="options_aseton" v-model="aseton"></b-form-select>
              </b-td>
              <b-td>
                <b-form-input type="number" v-model="volume"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in urine" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) urine.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.protein }}</b-td>
              <b-td>{{ item.glukosa }}</b-td>
              <b-td>{{ item.aseton }}</b-td>
              <b-td>{{ item.volume }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: 'urine',
  components: {
  },
  data() {
    return {
      options_protein: [
        { value: "-", text: "-" },
        { value: "+", text: "+" },
        { value: "++", text: "++" },
        { value: "+++", text: "+++" },
        { value: "++++", text: "++++" },
      ],
      options_glukosa: [
        { value: "-", text: "-" },
        { value: "+", text: "+" },
        { value: "++", text: "++" },
        { value: "+++", text: "+++" },
        { value: "++++", text: "++++" },
      ],
      options_aseton: [
        { value: "-", text: "-" },
        { value: "+", text: "+" },
      ],
      volume: null,
      tanggal_periksa: null,
      jam_periksa: null,
      protein: "-",
      glukosa: "-",
      aseton: "-",
      list_data: [],
    }
  },
  props: {
    urine: {
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
      this.urine.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        protein: vm.protein,
        glukosa: vm.glukosa,
        volume: vm.volume,
        aseton: vm.aseton,
      })
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.aseton = "-"
      vm.protein = "-"
      vm.glukosa = "-"
      vm.volume = null
      
    },
  }
}
</script>

<style >
#page-urine .table-urine th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-urine .table-urine th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-urine .table-urine th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-urine .table-urine th:nth-child(4) {
  border-top-right-radius: 8px;
}
</style>

