<template>
  <div id="page-tekanan">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-tekanan table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">No.</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Sistole</b-th>
              <b-th>Diastole</b-th>
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
                <b-form-input type="number" placeholder="mm" v-model="sistole"></b-form-input>
              </b-td>

              <b-td>
                <b-form-input type="number" placeholder="Hg" v-model="diastole"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in tekanan_darah" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) tekanan_darah.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.sistole }}</b-td>
              <b-td>{{ item.diastole }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: 'tekanan_darah',
  components: {
  },
  data() {
    return {
      tanggal_periksa: null,
      jam_periksa: null,
      sistole: null,
      diastole: null,
      list_data: [],
    }
  },
  props: {
    tekanan_darah: {
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
      this.tekanan_darah.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        sistole: vm.sistole,
        diastole: vm.diastole,
      })
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.sistole = null
      vm.diastole = null
      
    },
  }
}
</script>

<style >
#page-tekanan .table-tekanan th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-tekanan .table-tekanan th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-tekanan .table-tekanan th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-tekanan .table-tekanan th:nth-child(5) {
  border-top-right-radius: 8px;
}
</style>

