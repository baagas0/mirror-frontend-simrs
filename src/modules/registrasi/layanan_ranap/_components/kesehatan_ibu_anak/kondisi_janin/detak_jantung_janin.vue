<template>
    <div id="page-detak">
      <b-row class="mt-3">
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <b-table-simple class="table-detak table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">Aksi</b-th>
              <b-th>Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Frekuensi DDJ</b-th>
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
                <b-form-input type="number" v-model="frekuensi_ddj"></b-form-input>
              </b-td>
            </b-tr>

            <b-tr v-for="(item, idx) in detak_jantung_janin" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) detak_jantung_janin.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.frekuensi_ddj }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        </b-col>
      </b-row>
    </div>  
</template>
  
  <script>

  
  export default {
    name: 'detak_jantung_janin',
    components: {
    },
    data() {
      return {
        tanggal_periksa: null,
        jam_periksa: null,
        frekuensi_ddj: null,
        list_data: [],
      }
    },
    props: {
      detak_jantung_janin: {
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
      getData(){
        let vm = this
        vm.$axios.post("/detak_jantung_janin/list", {partograf_id:vm.partograf_id})
        .then((res) => {
          if(res.data.data.length){
            // console.log(res, 'ini parto');
            vm.list_data = res.data.data
            for (let i = 0; i < vm.list_data.length; i++) {
              let x = vm.list_data[i];
              x.tanggal_periksa = vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")
            }
          }
        })
        .catch((err) => {
          vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
        })
      },
      simpan(){
        let vm = this
        this.detak_jantung_janin.push({
          partograf_id: vm.partograf_id,
          tanggal_periksa: vm.tanggal_periksa,
          jam_periksa: vm.jam_periksa,
          frekuensi_ddj: vm.frekuensi_ddj,
        })
        vm.tanggal_periksa = null
        vm.jam_periksa = null,
        vm.frekuensi_ddj = null
      },
    }  
  }
  </script>
  <style >
  #page-detak .table-detak th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
  }
  #page-detak .table-detak  th, td{
  border: 1px solid #F1F1F1 !important;
  }
  
  #page-detak .table-detak  th:nth-child(1) {
  border-top-left-radius: 8px;
  }
  
  #page-detak .table-detak th:nth-child(4) {
  border-top-right-radius: 8px;
  }
  </style>
  