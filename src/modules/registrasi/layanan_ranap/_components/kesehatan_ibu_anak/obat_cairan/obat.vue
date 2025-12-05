<template>
  <div id="page-obat">
    <b-row class="mt-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-obat table-sm">
          <b-thead>
            <b-tr>
              <b-th class="table-number">No.</b-th>
              <b-th style="width: 200px;">Tanggal Periksa</b-th>
              <b-th>Jam Periksa</b-th>
              <b-th>Kode Obat</b-th>
              <b-th>Nama Obat</b-th>
              <b-th>Dosis</b-th>
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
                <b-form-input type="text" v-model="kode_obat" disabled></b-form-input>
              </b-td>

              <b-td>
                <Multiselect v-model="barang" :options="listBarang" :multiple="false" :searchable="true"
                  :close-on-select="true" :show-labels="false" label="nama_barang" track-by="ms_barang_id"
                  @input="set_kode(barang)"></Multiselect>
              </b-td>

              <b-td>
                <b-form-input type="text" v-model="signa"></b-form-input>
              </b-td>
            </b-tr>
            <b-tr v-for="(item, idx) in obat" :key="idx">
              <b-td>
                <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) obat.splice(idx, 1) })" variant="danger" size="sm">
                  <i class="ri-delete-bin-line"></i>
                </b-button>
              </b-td>
              <b-td>{{ item.tanggal_periksa }}</b-td>
              <b-td>{{ item.jam_periksa }}</b-td>
              <b-td>{{ item.kode_obat }}</b-td>
              <b-td>{{ item.barang && item.barang.nama_barang ? item.barang.nama_barang : item.barang }}</b-td>
              <b-td>{{ item.signa }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>


export default {
  name: 'obat',
  components: {
  },
  data() {
    return {
      tanggal_periksa: null,
      jam_periksa: null,
      barang: null,
      kode_obat: null,
      signa: null,
      list_data: [],
      listBarang: [],
    }
  },
  props: {
    obat: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
  },
  mounted() {
    // this.getData()
    this.getList()
  },
  methods: {
    set_kode(x) {
      let vm = this
      vm.kode_obat = x.kode_produk
    },
    async getList() {
      let vm = this
      let listBarang = await vm.$_api.post('/msBarang/list')
      vm.listBarang = listBarang.status == 200 ? listBarang.data.map(x => {
        return {
          ...x,
          nama: x.kode_produk + ' - ' + x.nama_barang,
        }
      }) : []
    },
    simpan() {
      let vm = this
      this.obat.push({
        partograf_id: vm.partograf_id,
        tanggal_periksa: vm.tanggal_periksa,
        jam_periksa: vm.jam_periksa,
        kode_obat: vm.kode_obat,
        barang: vm.barang,
        signa: vm.signa,
      })
      vm.tanggal_periksa = null
      vm.jam_periksa = null,
      vm.barang = null
      vm.signa = null
      vm.kode_obat = null
      
    },
  }
}
</script>

<style >
#page-obat .table-obat th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

#page-obat .table-obat th,
td {
  border: 1px solid #F1F1F1 !important;
}

#page-obat .table-obat th:nth-child(1) {
  border-top-left-radius: 8px;
}

#page-obat .table-obat th:nth-child(6) {
  border-top-right-radius: 8px;
}
</style>

  