<template>
  <div class="h-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>Daftar Penunjang</strong>
        </h5>
      </template>
      <b-row>
        <b-col md="5" offset-md="7" class="mb-3">
          <b-form-input
            id="filter-input"
            v-model="filter.nama_penunjang"
            type="search"
            placeholder="cari"
            size="sm"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-table
            :items="items"
            :fields="fields"
            responsive
            show-empty
            small
            bordered
            striped
            hover
            :busy="busy"
            style="white-space:nowrap;"
            class=""
          >
            <template #cell(actions)="item">
              <b-button
                @click="openAddJual(item)"
                variant="success"
                size="sm"
                :disabled="isDraft > 1"
                ><i class="ri-shopping-cart-2-line"></i></b-button
              >
            </template>
          </b-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-col>
        <b-col md="5" offset-md="4">
          <b-pagination
            class="m-0 p-0"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
  
<script>
  export default {
    components: {
    },
    name: "master_etnis",
    emits: [ 'resetData', 'changeVar' ],
    props: [ 'dataHeader', 'dataPerhitungan', 'dataForm', 'listJual', 'list', 'isDraft' ],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        busy: false,
        fields: [
          {
            key: "no",
            label: "No",
            sortDirection: "desc",
            class: "table-number text-center",
          },
          {
            key: "actions",
            label: "Actions",
            class: "table-option-2 text-center",
          },
          {
            key: "nama_penunjang",
            label: "Penunjang",
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_jenis_penunjang",
            label: "Jenis",
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga",
            label: "Harga",
            sortDirection: "desc",
            class: "text-left",
          },
        ],
        items: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        filter: {},
        filterOn: [],
        pageOptions: [10, 25, 50, 100],
      };
    },
    watch: {
      currentPage(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.getDatas()
        }
      },
      perPage(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.getDatas()
        }
      },
      'filter.nama_penunjang'(newVar, oldVar){
        if(newVar != oldVar){
          this.getDatas()
        }
      },
      'dataHeader.ms_harga_id'(newVar, oldVar){
        if(newVar != oldVar){
          if(!this.isDraft) this.$emit('changeVar', { to: 'listJualPenunjang', data: [] })
          this.getDatas()
        }
      },
      'dataHeader.ms_tarif_id'(newVar, oldVar){
        if(newVar != oldVar){
          if(!this.isDraft) this.$emit('changeVar', { to: 'listJualPenunjang', data: [] })
          this.getDatas()
        }
      },
    },
    computed: {
    },
    mounted() {
      // this.getDatas();
    },
    methods: {
      async getDatas() {
        const vm = this
        if (vm.dataHeader.ms_harga_id && vm.dataHeader.ms_tarif_id) {
          vm.busy = true;
          let master_harga_penjualan_penunjang = await this.$_api.post("ms_harga_penunjang/list", {
            jumlah: vm.perPage, 
            halaman: vm.currentPage, 
            ms_harga_id: vm.dataHeader.ms_harga_id,
            ms_tarif_id: vm.dataHeader.ms_tarif_id,
            ...vm.filter,
          });
          vm.items = master_harga_penjualan_penunjang.status == 200 ? master_harga_penjualan_penunjang.data.map((x, idx) => { return {
            ...x,
            no: idx + 1,
            harga_penjualan_penunjang: x.harga_jual_penunjang,
            nama_harga_penjualan_penunjang: vm.toNumeric(x.harga_jual_penunjang, 'idr'),
            harga_custom_penjualan_penunjang: x.harga_jual_penunjang,
            qty_penjualan_penunjang: 1,
            keterangan_penjualan_penunjang: null,
          } }) : []
          vm.totalRows = parseInt(master_harga_penjualan_penunjang.count);
          vm.busy = false;
        }else{
          vm.items = []
        }
      },
      openAddJual(data){
        //open modal form
        const vm = this
        vm.$bvModal.show('modal-form-penunjang-jual')
        vm.$emit('changeVar', {to: 'dataForm', data: {...data.item, index: data.index}})
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
      toNumeric(number, type){
        let data = {}
        if(type == 'no-idr') {
          return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(number).slice(3)
        }else{
          if(type == 'idr') data = {style: 'currency', currency: 'IDR'}
          return new Intl.NumberFormat('id-ID', data).format(number)
        }
      },
    },
  };
</script>
  