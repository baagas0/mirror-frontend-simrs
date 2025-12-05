<template>
    <div id="page-nadi">
      <b-row class="mt-3">
        <b-col cols="12" sm="12" md="12" lg="12" xl="12" >
          <b-table-simple class="table-nadi table-sm">
          <b-thead >
            <b-tr>
              <b-th class="table-number">No.</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Total Denyut</b-th>
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
                <b-form-input type="text" v-model="total_denyut"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in nadi" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) nadi.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.total_denyut }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        </b-col>
      </b-row>
    </div>  
</template>
  
  <script>

  
  export default {
    name: 'nadi',
    components: {
    },
    data() {
      return {
        tanggal_periksa: null,
        jam_periksa: null,
        total_denyut: null,
        list_data: [],
      }
    },
    props: {
      nadi: {
        type: Array,
        required: true,
        default() {
          return []
        }
      },
    },
    mounted(){
      // this.getData()
    },
    methods: {
      simpan(){
        let vm = this
        this.nadi.push({
          partograf_id: vm.partograf_id,
          tanggal_periksa: vm.tanggal_periksa,
          jam_periksa: vm.jam_periksa,
          total_denyut: vm.total_denyut,
        })
        vm.tanggal_periksa = null
        vm.jam_periksa = null
        vm.total_denyut = null
      },
    }  
  }
  </script>

<style >
 #page-nadi .table-nadi th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
}
#page-nadi .table-nadi  th, td{
  border: 1px solid #F1F1F1 !important;
}

#page-nadi .table-nadi  th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-nadi .table-nadi th:nth-child(4) {
  border-top-right-radius: 8px;
}
</style>

  