<template>
    <div class="w-100">
      <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
        <template #header>
          <h5 class="mb-0">
            <strong>Daftar Jasa Yang Dijual</strong>
          </h5>
        </template>

        <b-row>      
          <b-col md="5" offset-md="7" class="mb-3">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="cari"
              size="sm"
            ></b-form-input>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-table
              v-if="!busy"
              :items="listJual"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filter-included-fields="filterOn"
              responsive
              show-empty
              small
              @filtered="onFiltered"
              bordered
              striped
              hover
              :busy="busy"
              style="white-space:nowrap;"
              class=""
            >
              <template #cell(no)="item">
                {{item.index+1}}
              </template>
              <template #cell(actions)="item">
                <div v-if="listJual.length">
                  <b-button
                    class="mr-1"
                    @click="openEditJual(item)"
                    variant="warning"
                    size="sm"
                    :disabled="isDraft > 1"
                    ><b-icon icon="pencil"></b-icon></b-button
                  >
                  <b-button
                    @click="$bvModal.show('modal-open-delete-jasa'), data = item"
                    variant="danger"
                    size="sm"
                    :disabled="isDraft > 1"
                    ><b-icon icon="trash"></b-icon></b-button
                  >
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-col>
          <b-col md="5" offset-md="5">
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
      <b-modal
        id="modal-open-delete-jasa"
        size="md"
        centered
        title="Perhatian .... !!!"
        header-bg-variant="warning"
        header-text-variant="light"
      >
        <p>Apakah anda yakin ingin menghapus penjualan jasa ini?</p>
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-open-delete-jasa')">
            Tidak
          </b-button>
          <b-button variant="warning" @click="deleteJual(data)" :disabled="busy">
            Ya
          </b-button>
        </template>
      </b-modal>
    </div>
</template>
  
<script>
  export default {
    components: {
    },
    name: "master_etnis",
    emits: [ 'resetData', 'changeVar' ],
    props: [ 'dataHeader', 'dataPerhitungan', 'listJual', 'list', 'isDraft'],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        busy: false,
        data: null,
        //jual
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
            key: "nama_jasa",
            label: "Jasa",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_jasa_custom",
            label: "Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_qty_jasa",
            label: "Quantity",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_harga_jasa",
            label: "Total Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        filter: null,
        filterOn: [],
        pageOptions: [10, 25, 50, 100],
      };
    },
    watch: {
      listJual(newVar, oldVar){
        if(newVar != oldVar && newVar){
          this.totalRows = newVar.length
        }
      },
    },
    computed: {
    },
    mounted() {
      this.$emit('changeVar', {to: 'fieldJasa', data: this.fields.slice(2)})
    },
    methods: {
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      openEditJual(data){
        const vm = this
        vm.$bvModal.show('modal-form-jasa-jual')
        vm.$emit('changeVar', {to: 'dataForm', data: {...item, index_jual: data.index, update: true }})
      },
      async refreshListJual(){
        const vm = this
        const listJualJasa = await this.$_api.post("penjualanJasa/listPenjualanJasaByPenjualanId", {penjualan_id: vm.dataHeader.penjualan_id});
        // console.log('listJualJasa', listJualJasa)
        //list jual jasa
        const listJual = listJualJasa.status == 200 ? await listJualJasa.map(x => {return {
          ...x, 
          total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
          nama_qty_jasa: vm.toNumeric(x.qty_jasa),
          nama_harga_jasa: vm.toNumeric(x.harga_jasa, 'idr'),
          nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, 'idr'),
          nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, 'idr'),
        }}) : []
        vm.$emit('changeVar', {to: 'listJualJasa', data: listJual })
      },
      async hitungPerhitungan(newVar, oldVar){
        const vm = this
        const dataPerhitungan = JSON.parse(JSON.stringify(vm.dataPerhitungan))
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_jasa, 0)
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_jasa, 0)
        const x = {}
        x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew
        x.harga_total_jasa = totalNew
        x.discount = dataPerhitungan.discount
        x.tax = (x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen / 100
        x.total_penjualan = x.jumlah - x.discount + x.tax
        return x
      },
      async deleteJual(data){
        const vm = this
        const listJualNew = vm.listJual.filter(item=>{return item.ms_jasa_id != data.item.ms_jasa_id})
        const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, vm.listJual)  //jika mengguakan watch, data bisa ketinggalan
        //jika draft / penjualan sudah dibuat
        if(vm.isDraft){
          await new Promise(resolve => setTimeout(resolve, 100));
          const hapus = await this.$_api.post("penjualanJasa/delete", {...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: data.item.penjualan_jasa_id});
          if(hapus.status == 200){
            vm.refreshListJual()
            vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Delete Jasa Penjualan", showing: true });
            vm.$bvModal.hide('modal-open-delete-jasa')
          }else{
            vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Delete Jasa Penjualan", showing: true });
          }
        }else{
          vm.$emit('changeVar', { to: 'listJualJasa', data: listJualNew })
          vm.$bvModal.hide('modal-open-delete-jasa')
        }
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
  