<template>
  <div class="w-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <h5 class="mb-0">
          <strong>External</strong>
        </h5>
      </template>
      <b-row style="row-gap: 25px;">
        <b-col cols="12" v-if="isDraft == 1">
          <div class="d-flex justify-content-end">
            <b-button variant="success" @click="dataHeader.pilih = 'pilihExternal', $bvModal.show('modal-pasien-external')">Tambah External</b-button>
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="12">
          <b-table
            :items="listExternal"
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
              <div>
                <!-- <b-button
                  class="mr-1"
                  @click="openEditJual(item)"
                  variant="warning"
                  size="sm"
                  :disabled="isDraft > 1"
                  ><i class="ri-edit-2-line"></i></b-button
                > -->
                <b-button
                  @click="$bvModal.show('modal-open-delete-external'), data = item.item"
                  variant="danger"
                  size="sm"
                  :disabled="isDraft > 1"
                  ><i class="ri-delete-bin-2-line"></i></b-button
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
      id="modal-open-delete-external"
      size="md"
      centered
      title="Perhatian .... !!!"
      header-bg-variant="warning"
      header-text-variant="light"
    >
      <p>Apakah anda yakin ingin menghapus external ini?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-delete-external')">
          Tidak
        </b-button>
        <b-button variant="warning" @click="deleteExternal(data)" :disabled="busy">
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
  name: 'master_etnis',
  emits: [ 'resetData', 'changeVar', 'auto' ],
  props: [ 'dataHeader', 'isDraft', 'dataTagihan', 'listExternal', 'listBarang', 'listJasa', 'listFasilitas' ],
  data () {
    return {
      showing: false,
      variant: 'success',
      msg: '',
      busy: false,
      fields: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          sortable: false,
          class: 'table-number text-center'
        },
        {
          key: 'kode_penjualan',
          label: 'No. Penjualan',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'no_rm',
          label: 'No. Rm',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama',
          label: 'Pasien',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'NIK',
          label: 'NIK',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'table-option-2 text-center'
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      pageOptions: [10, 25, 50, 100]
    }
  },
  watch: {
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getDatas () {
      // const vm = this
      // //console.log()
    },
    // async deleteExternal(data){
    //   const vm = this
    //   //console.log('deleteExternal', data)
    //   vm.$emit('changeVar', { to: 'listExternal', data: vm.listExternal.filter(item=>{return item.external_id != data.item.external_id}) })
    //   //jika draft / external sudah dibuat
    //   if(vm.isDraft){
    //     // await new Promise(resolve => setTimeout(resolve, 100));
    //     // const hapus = await this.$_api.post("externalBarang/delete", {...vm.dataPerhitungan, external_id: vm.dataHeader.external_id, id: data.item.external_barang_id});
    //     // if(hapus.status == 200){
    //     //   vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Delete Barang External");
    //     //   vm.$bvModal.hide('modal-open-delete-external')
    //     // }else{
    //     //   vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Delete Barang External");
    //     // }
    //   }else{
    //     vm.$bvModal.hide('modal-open-delete-external')
    //   }
    // },
    async deleteExternal (data) {
      const vm = this
      console.log('data external', data)
      this.$_api.post('poolExternal/delete', { id: data.pool_external_id }).then((register) => {
        if (register.status === 200) {
          this.$_alert.success('Berhasil Menghapus Internal')
          vm.$bvModal.hide('modal-open-delete-external')
          vm.$emit('auto')
        }
      })
    },
    triggerAlert (event) {
      let vm = this
      vm.$store.commit('set_alert', event)
    },
    toNumeric (number, type) {
      let data = {}
      if (type === 'no-idr') {
        return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(number).slice(3)
      } else {
        if (type === 'idr') data = {style: 'currency', currency: 'IDR'}
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    }
  }
}
</script>
