<template>
  <div id="page-suhu">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-suhu table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">No.</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Suhu</b-th>
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
                <b-form-input type="number" v-model="suhu_ibu"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in suhu" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) suhu.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.suhu }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: 'suhu',
  components: {
  },
  data() {
    return {
      tanggal_periksa: null,
      jam_periksa: null,
      suhu_ibu: null,
      list_data: [],
    }
  },
  props: {
    suhu: {
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
      this.suhu.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        suhu: vm.suhu_ibu,
      })
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.suhu_ibu = null
      
    },
  }
}
</script>

<style >
#page-suhu .table-suhu th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-suhu .table-suhu th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-suhu .table-suhu th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-suhu .table-suhu th:nth-child(4) {
  border-top-right-radius: 8px;
}
</style>

