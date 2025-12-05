<template>
  <div class="w-100">
    <b-card header-tag="header" class="h-100 w-100 m-0 p-0">
      <template #header>
        <b-row>
          <b-col class="align-self-center">
            <h5 class="mb-0">
              <strong>Ditanggung</strong>
            </h5>
          </b-col>
          <b-col>
            <div class="d-flex justify-content-end">
              <b-button variant="success" @click="$bvModal.show('modal-ditanggung')">Tambah Ditanggung</b-button>
            </div>
          </b-col>
        </b-row>
      </template>
      <b-row style="row-gap: 25px;">
        <b-col cols="12" md="12" lg="12">
          <b-table :items="listDitanggung" :fields="fields" :current-page="currentPage" :per-page="perPage"
            :filter="filter" :filter-included-fields="filterOn" responsive show-empty small @filtered="onFiltered"
            bordered striped hover :busy="busy" style="white-space:nowrap;" class="">
            <template #cell(no)="item">
              {{ item.index + 1 }}
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
                <b-button @click="$bvModal.show('modal-open-delete-ditanggung'), data = item.item" variant="danger"
                  size="sm"><i class="ri-delete-bin-2-line"></i></b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
        </b-col>
        <b-col md="5" offset-md="5">
          <b-pagination class="m-0 p-0" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
            size="sm"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal id="modal-open-delete-ditanggung" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning"
      header-text-variant="light">
      <p>Apakah anda yakin ingin menghapus tanggungan ini?</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-open-delete-ditanggung')">
          Tidak
        </b-button>
        <b-button variant="warning" @click="deleteDitanggung(data)" :disabled="busy">
          Ya
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  components: {
    // // Multiselect,
    // DatePicker,
  },
  name: 'master_etnis',
  emits: ['getDitanggung', 'resetData', 'changeVar'],
  props: ['dataHeader', 'dataTagihan', 'listDitanggung'],
  data() {
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
          key: 'nama_penanggung',
          label: 'Nama',
          sortable: false,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_jumlah_penanggung',
          label: 'Jumlah',
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
  mounted() {
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getDatas() {
      // const vm = this
      // console.log()
    },
    async deleteDitanggung(data) {
      let vm = this
      vm.busy = true

      this.$_api.post('penanggung/delete', { id: data.penanggung_id }).then((penanggungan) => {
        if (penanggungan.status === 200) {
          this.$_alert.success('Berhasil Menhapus Ditanggung')
          vm.$emit('getDitanggung')
          vm.$bvModal.hide('modal-open-delete-ditanggung')
        }
        vm.busy = false
      })
    },
    triggerAlert(event) {
      let vm = this
      vm.$store.commit('set_alert', event)
    },
    toNumeric(number, type) {
      let data = {}
      if (type === 'no-idr') {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number).slice(3)
      } else {
        if (type === 'idr') data = { style: 'currency', currency: 'IDR' }
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    }
  }
}
</script>
