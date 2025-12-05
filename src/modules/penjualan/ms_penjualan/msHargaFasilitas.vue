<template lang="">
    <tas-base-crud ref="CRUD-msHargaFasilitas" :config="config" :hideColumnVisibility="true" @getMainData="handleGetMainData" :headerFilterView="true" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" @updateFilters="handleUpdateFilters" :customDetailPagination="customDetailPagination">
      <template v-slot:create-form>
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h5 class="card-title align-items-start flex-column">Tambah Fasilitas</h5>
            <div class="card-toolbar">
              <a @click="$children[0].getEvent('list')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
                <i class="ri-arrow-go-back-line p-0"></i>
              </a>
            </div>
          </div>
          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                <div class="row">
                  <div class="col-12">
                    <s-input v-model="v.nama_fasilitas" :key="'1111'" :id="'1111'" :item="{
                      label: 'Nama Fasilitas',
                      id: 'nama_fasilitas',
                      data: 'nama_fasilitas',
                      type: 'text',
                      validation: ['required'],
                      param: {},
                    }" :valuee="''" />
                  </div>

                  <div class="col-12">
                    <s-input v-model="v.ms_jenis_fasilitas_id" :key="'2222'" :id="'2222'" :item="{
                      label: 'Jenis Fasilitas',
                      id: 'ms_jenis_fasilitas_id',
                      data: 'ms_jenis_fasilitas_id',
                      type: 'select',
                      validation: ['required'],
                      api: 'msJenisFasilitas',
                      pointer: {
                        label: 'nama_jenis_fasilitas',
                        code: 'id',
                        display: ['nama_jenis_fasilitas']
                      },
                      param: {},
                    }" :valuee="''" />
                  </div>

                  <div class="col-12">
                    <table-input-array v-model="v.bulk_tarif" :key="'3333'" :id="'3333'" :label="[
                      {type: 'label', id: 'nama_tarif', label: 'Nama Tarif'},
                      {type: 'money', id: 'harga_beli', label: 'Harga Beli'},
                      {type: 'money', id: 'harga_jual', label: 'Harga Jual'},
                    ]" :list="bulk_tarif" :getter="'s'" :disableAdd="true" :disableDelete="true" :tableLabel="'Daftar Harga'" />
                  </div>

                  <template>
                    <div class="col-12 align-self-center">
                      <button type="submit" class="btn btn-light-primary mr-3">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </template>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </template>
      <template v-slot:update-form="rowData">
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h5 class="card-title align-items-start flex-column">Edit Fasilitas</h5>
            <div class="card-toolbar">
              <a @click="$children[0].getEvent('list')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
                <i class="ri-arrow-go-back-line p-0"></i>
              </a>
            </div>
          </div>
          <div class="card-body pt-0">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmitUpdate)" autocomplete="off">
                <div class="row">
                  <div class="d-flex flex-column justify-content-between mb-5 pl-4">
                    <div class="font-weight-boldest">Nama Fasilitas</div>
                    <div class="">{{ detail_fasilitas.nama_fasilitas }}</div>
                  </div>
                  <div class="col-12">
                    <table-input-array v-model="detail_fasilitas.harga_fasilitas" :key="'3333'" :id="'3333'" :label="[
                      {type: 'label', id: 'nama_tarif', label: 'Nama Tarif'},
                      {type: 'money', id: 'harga_beli', label: 'Harga Beli'},
                      {type: 'money', id: 'harga_jual', label: 'Harga Jual'},
                    ]" :list="detail_fasilitas.harga_fasilitas" :getter="'s'" :disableAdd="true" :disableDelete="true" :tableLabel="'Daftar Harga'" />
                  </div>

                  <template>
                    <div class="col-12 align-self-center">
                      <button type="submit" class="btn btn-light-primary mr-3">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </template>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </template>
      
      <template v-slot:header-filter>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(handleGetMainData)" autocomplete="off">

            <div class="row align-self-end">
              <b-col cols="3" sm="3" md="3" lg="3">
              <h3><strong>Filter</strong></h3>
              </b-col>
            </div>

            <div v-if="isShowFilters" class="row align-self-end">
              <b-col cols="3" sm="3" md="3" lg="3" class="d-flex flex-column justify-content-between">
                <label for="nama_lengkap">Nama Fasilitas</label>
                <b-form-input id="nama_lengkap" v-model="filters.nama_fasilitas" placeholder="Nama Fasilitas" type="text" size="sm"/>
              </b-col>
              <b-col cols="3" sm="3" md="3" lg="3">
                <label for="ms_harga_id">Jenis Harga</label>
                <multiselect id="ms_harga_id" v-model="filters.param.ms_harga_id" :options="list.list_ms_harga"
                  :multiple="false" :internal-search="false" :searchable="true"  :close-on-select="true" :show-labels="false" label="nama_harga"
                  track-by="id" @search-change="getMsHarga" @remove="onRemove(filters.param.ms_harga_id, 'ms_harga_id')" @select="onSelect(filters.param.ms_harga_id, 'ms_harga_id')" placeholder="Pilih Jenis Harga" size="sm"></multiselect>
              </b-col>
              <b-col cols="3" sm="3" md="3" lg="3">
              </b-col>
            </div>

            <div class="row align-self-end" :class="[!isShowFilters ? 'mt-0': 'mt-4']">
              <b-col cols="12" sm="12" md="12" lg="12">
                <button v-if="isShowFilters" type="submit" class="btn btn-light-primary">
                  <i class="ri-save-line"></i>
                  Terapkan Filter
                </button>
                <div v-if="isShowFilters" @click="resetFilter" class="btn btn-light-danger">
                  <i class="ri-loop-right-line"></i>
                  Reset
                </div>
                <div class="btn btn-light-info" @click="hideFilters">
                  <span v-if="isShowFilters"><i class="ri-eye-off-line"></i>Hide Filter</span>
                  <span v-else><i class="ri-eye-line"></i>Show Filter</span>
                </div>
              </b-col>
            </div>
          </form>
        </ValidationObserver>
      </template>
      
      <template v-slot:header-table="rowData">
        <tr>
          <th>#</th>
          <th class="text-align-vertical min-w-250px" rowspan="2">
            Nama Fasilitas
          </th>
          <th v-for="(item, index) in bulk_tarif" :key="index" class="text-center">{{item.nama_tarif}}</th>
        </tr>
      </template>
      <template v-slot:list-table="rowData">
        <tr v-for="(item, i) in main_data" :key="i+'key-tr'">
          <td>{{ parseInt(i)+1 }}</td>
          <td>{{ item.nama_fasilitas }}</td>
          <td v-for="(fasilitas, index) in item.harga_fasilitas" :key="index">
            <div class="d-flex flex-column justify-content-between text-nowrap px-2">
              <div class="d-flex justify-content-between">
                <div class="mr-4">Beli</div>
                <div>{{fasilitas.harga_beli | parse('money')}}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="mr-4">Jual</div>
                <div>{{fasilitas.harga_jual | parse('money')}}</div>
              </div>

            </div>
          </td>

          <td class="action-table sticky-right">
            <div class="action-button">
              <a v-b-tooltip.top.viewport="$t('global.update')" @click="findFasilitas(item)"
                class="btn btn-icon btn-warning btn-sm">
                <i class="ri-edit-2-line"></i>
              </a>
              <a v-b-tooltip.top.viewport="$t('global.delete')" @click="deleteFasilitas(item)"
                class="btn btn-icon btn-danger btn-sm">
                <i class="ri-delete-bin-2-line"></i>
              </a>
            </div>
          </td>
        </tr>
      </template>
    </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-jenis_fasilitas',
  data() {
    return {
      v: {},
      bulk_tarif: [],
      config: {
        title: 'Daftar Harga Fasilitas',
        model_api: 'jenis_fasilitas',
        getter: 'msHargaFasilitas',
        setter: 'msHargaFasilitas',
        pk_field: null,
        frontendPaginate: false,
        custom_api: {
          list: 'msHargaFasilitas/listFasilitasHargaTarifPerHalamanBypassUri',
          delete: 'msFasilitas'
        },
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // id_jenis_fasilitas
          {
            id: 'id',
            data: 'id',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: false,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          }
        ]
      },
      hideGlobalSearch: true,
      hideFilter: true,
      main_data: {},
      detail_fasilitas: [],
      isShowFilters: true,
      filters: {
        param: {
          ms_harga_id: ''
        },
        template_filters: {
          page: 1,
          limit: 10,
        },
        nama_fasilitas: '',
        ms_harga_id: null,
      },
      list: {
        list_ms_harga: [],
      },
      list_fasilitas: [],
      customDetailPagination: {
        page: 1,
        limit: 100,
        total: 0,
        mainDataLength: 0
      }
    }
  },
  mounted() {
    this.getTarif()
    this.getFilters()
  },
  methods: {
    onSubmit() {
      this.$_api.create('msFasilitas', this.v).then(res => {

        if (res.status === 200) {
          this.$_alert.success('Berhasil', res.message ? res.message : 'Data berhasil disimpan')
          this.$children[0].getEvent('list')
        } else {
          this.$_alert.error({ message: res.message }, 'Terjadi kesalahan')
        }
        this.handleGetMainData()
      })
    },
    onSubmitUpdate() {
      let bulk_ms_harga_fasilitas = this.detail_fasilitas.harga_fasilitas
      for (const i of bulk_ms_harga_fasilitas) {
        i.id = i.ms_harga_fasilitas_id
        delete i.ms_harga_fasilitas_id
      }

      let param = {
        id: this.detail_fasilitas.id,
        nama_fasilitas: this.detail_fasilitas.nama_fasilitas,
        ms_jenis_fasilitas_id: this.detail_fasilitas.ms_jenis_fasilitas_id,
        bulk_ms_harga_fasilitas: bulk_ms_harga_fasilitas
      }

      this.$_api.customCreate('msHargaFasilitas/updateBulk', param).then(res => {

        if (res.status === 200) {
          this.$_alert.success('Berhasil', res.message ? res.message : 'Data berhasil disimpan')
          this.$children[0].getEvent('list')
        } else {
          this.$_alert.error(null, 'Terjadi kesalahan')
        }
        this.handleGetMainData()
      })
    },
    deleteFasilitas(item) {
      console.log(item);
      let param = {
        id: item.id
      }
      this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api.post('msFasilitas/delete', param).then(res => {
            if (res.status === 200) {
              this.$_alert.success('Berhasil', res.message ? res.message : 'Data berhasil dihapus')
              this.$children[0].getEvent('list')
            } else {
              this.$_alert.error({ message: res.message }, 'Terjadi kesalahan')
            }
            this.handleGetMainData()
          })
        }
      })
      // this.$refs['CRUD-msHargaFasilitas'].$children[1].deleteData(param)
    },
    getTarif() {
      this.$_api.post('msTarif/list', {}).then(res => {
        let sortedRes = res.data.sort((a, b) => {
          return a.nama_tarif.localeCompare(b.nama_tarif)
        })
        for (const i of sortedRes) {
          this.bulk_tarif.push({
            ms_tarif_id: i.id,
            nama_tarif: i.nama_tarif,
            harga_beli: 0,
            harga_jual: 0
          })
        }
      })
    },
    findTarif(data, ms_tarif_id, key) {
      let d = data.filter((x) => { return x.ms_tarif_id === ms_tarif_id })

      if (d.length) return d[0][key]
      else return 0
    },
    findFasilitas(item) {
      this.$refs['CRUD-msHargaFasilitas'].$children[1].emitEvent('update', item)
      this.detail_fasilitas = item

      for (const i in this.detail_fasilitas.harga_fasilitas) {
        if (!this.detail_fasilitas.harga_fasilitas[i].ms_harga_fasilitas_id) {
          this.detail_fasilitas.harga_fasilitas.splice(i, 1)
        }
      }
    },
    async getFilters() {
      await this.getMsHarga()
    },
    async getMsHarga(nama_harga) {
      await this.$_api.post('msHarga/list', {
        halaman: 1,
        jumlah: 100,
        nama_harga: nama_harga
      }).then(res => {
        this.list.list_ms_harga = res.data
      })
    },
    checkFilter() {
      this.$refs['CRUD-msHargaFasilitas'].$children[1].getData(this.filters)
    },
    onSelect(selectedArray, variableName) {
      this.filters[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filters[variableName] = '';
    },
    resetFilter() {
      this.filters = {
        param: {
          ms_harga_id: '',
        },
        ms_harga_id: null,
        nama_fasilitas: '',
        template_filters: {
          page: 1,
          limit: 10,
        },
      }
    },
    hideFilters() {
      this.isShowFilters = !this.isShowFilters
    },
    handleGetMainData(data) {
      // console.log(data, 'data param api');
      this.getListMsHargaFasilitas(data)
    },
    async getListMsHargaFasilitas(data) {
      // console.log(data, 'data param api2');
      this.customDetailPagination.page = this.filters.template_filters.page
      this.customDetailPagination.limit = this.filters.template_filters.limit

      if (data) {
        this.filters.template_filters.page = data.paramAPI.page
        this.filters.template_filters.limit = data.paramAPI.limit
      }

      await this.$_api.post('msHargaFasilitas/listFasilitasHargaTarifPerHalaman', {
        halaman: this.filters.template_filters.page,
        jumlah: this.filters.template_filters.limit,
        nama_fasilitas: this.filters.nama_fasilitas,
        ms_harga_id: this.filters.ms_harga_id
      }).then(res => {
        this.list_fasilitas = res.data

        this.main_data = {}

        let listData = []
        listData = this.list_fasilitas

        for (const i in listData) {
          this.main_data[i] = listData[i]
        }

        for (const i in this.main_data) {
          let hargaJasaIDs = []
          this.main_data[i].id = this.main_data[i].ms_fasilitas_id
          for (const j in this.main_data[i].harga_fasilitas) {
            hargaJasaIDs.push(this.main_data[i].harga_fasilitas[j].ms_tarif_id)
          }

          for (const j in this.bulk_tarif) {
            if (!hargaJasaIDs.includes(this.bulk_tarif[j].ms_tarif_id)) {
              this.main_data[i].harga_fasilitas.push({
                ms_tarif_id: this.bulk_tarif[j].ms_tarif_id,
                nama_tarif: this.bulk_tarif[j].nama_tarif,
                harga_beli: 0,
                harga_jual: 0,
                ms_harga_fasilitas_id: this.bulk_tarif[j].ms_harga_fasilitas_id
              })
            }
          }

          this.main_data[i].harga_fasilitas = this.main_data[i].harga_fasilitas.sort((a, b) => {
            return a.nama_tarif.localeCompare(b.nama_tarif)
          })
        }

        if (data) {
          this.filters.template_filters.page = data.paramAPI.page
          this.filters.template_filters.limit = data.paramAPI.limit
        }
        this.customDetailPagination.mainDataLength = listData.length
        this.customDetailPagination.total = parseInt(res.count)
      }).catch(err => {
        console.log(err);
      })
    },
    goBack() {
      this.$children[0].getEvent('list')
      this.handleGetMainData()
    },
    handleUpdateFilters(data) {
      this.filters.template_filters = data
    },
  },
}
</script>
