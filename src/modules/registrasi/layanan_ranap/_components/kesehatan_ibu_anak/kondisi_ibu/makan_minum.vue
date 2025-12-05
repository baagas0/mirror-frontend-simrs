<template>
  <div id="page-mm">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-mm table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">No.</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Makan</b-th>
              <b-th>Minum</b-th>
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
                <b-form-input type="text" v-model="makan"></b-form-input>
              </b-td>

              <b-td>
                <b-form-input type="text" v-model="minum"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in makan_minum" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) makan_minum.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.makan }}</b-td>
              <b-td>{{ item.minum }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: 'makan_minum',
  components: {
  },
  data() {
    return {
      tanggal_periksa: null,
      jam_periksa: null,
      makan: null,
      minum: null,
      list_data: [],
    }
  },
  props: {
    makan_minum: {
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
      this.makan_minum.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        makan: vm.makan,
        minum: vm.minum,
      });
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.makan = null
      vm.minum = null
    },
  }
}
</script>

<style >
#page-mm .table-mm th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-mm .table-mm th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-mm .table-mm th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-mm .table-mm th:nth-child(5) {
  border-top-right-radius: 8px;
}
</style>

