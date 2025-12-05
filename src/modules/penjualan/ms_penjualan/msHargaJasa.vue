<template lang="">
    <tas-base-crud ref="CRUD-msHargaJasa" :config="config" :headerFilterView="true" :hideGlobalSearch="true"  @getMainData="handleGetMainData" :hideColumnVisibility="true" @updateFilters="handleUpdateFilters" :customDetailPagination="customDetailPagination">
      <template v-slot:create-form>
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h5 class="card-title align-items-start flex-column">Tambah Jasa</h5>
            <div class="card-toolbar">
              <a @click="goBack" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
                <i class="ri-arrow-go-back-line p-0"></i>
              </a>
            </div>
          </div>
          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                <div class="row">
                  <div class="col-12">
                    <s-input v-model.lazy.trim="v.nama_jasa" :key="'1111'" :id="'1111'" :item="{
                      label: 'Nama Jasa',
                      id: 'nama_jasa',
                      data: 'nama_jasa',
                      type: 'text',
                      validation: ['required'],
                      param: {},
                    }" :valuee="''" />
                  </div>
                  <div class="col-12">
                    <s-input v-model="v.ms_jenis_jasa_id" :key="'2222'" :id="'2222'" :item="{
                      label: 'Jenis Jasa',
                      id: 'ms_jenis_jasa_id',
                      data: 'ms_jenis_jasa_id',
                      type: 'select',
                      validation: ['required'],
                      api: 'msJenisJasa',
                      pointer: {
                        label: 'nama_jenis_jasa',
                        code: 'id',
                        display: ['nama_jenis_jasa']
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
            <h5 class="card-title align-items-start flex-column">Edit Jasa</h5>
            <div class="card-toolbar">
              <a @click="goBack" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
                <i class="ri-arrow-go-back-line p-0"></i>
              </a>
            </div>
          </div>
          <div class="card-body pt-0">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmitUpdate)" autocomplete="off">
                <div class="row">
                  <div class="d-flex flex-column justify-content-between mb-5 pl-4">
                    <div class="font-weight-boldest">Nama Jasa</div>
                    <div class="">{{ detail_jasa.nama_jasa }}</div>
                  </div>
                  <div class="col-12">
                    <table-input-array v-model="detail_jasa.harga_jasa" :key="'3333'" :id="'3333'" :label="[
                      {type: 'label', id: 'nama_tarif', label: 'Nama Tarif'},
                      {type: 'money', id: 'harga_beli', label: 'Harga Beli'},
                      {type: 'money', id: 'harga_jual', label: 'Harga Jual'},
                    ]" :list="detail_jasa.harga_jasa" :getter="'s'" :disableAdd="true" :disableDelete="true" :tableLabel="'Daftar Harga'" />
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
      <template v-slot:header-table="rowData">
        <tr v-if="!filters.ms_harga_id"></tr>
        <tr v-else>
          <th>#</th>
          <th class="text-align-vertical min-w-250px" rowspan="2">
            Nama Fasilitas
          </th>
          <th v-for="(item, index) in bulk_tarif" :key="index" class="text-center">{{item.nama_tarif}}</th>
        </tr>
      </template>
      <template v-slot:list-table="rowData">
        <tr v-if="!filters.ms_harga_id"></tr>
        <tr v-else v-for="(item, i) in main_data" :key="i+'key-tr'">
          <td>{{ parseInt(i)+1 }}</td>
          <td>{{ item.nama_jasa }}</td>
          <td v-for="(jasa, index) in item.harga_jasa" :key="index">
            <div class="d-flex flex-column justify-content-between text-nowrap px-2">
              <div class="d-flex justify-content-between">
                <div class="mr-4">Beli</div>
                <div>{{jasa.harga_beli | parse('money')}}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="mr-4">Jual</div>
                <div>{{jasa.harga_jual | parse('money')}}</div>
              </div>

            </div>
          </td>

          <td class="">
            <div class="">
              <a v-b-tooltip.top.viewport="$t('global.update')" @click="findJasa(item)"
                class="btn btn-icon btn-warning btn-sm">
                <i class="ri-edit-2-line"></i>
              </a>
              <a v-b-tooltip.top.viewport="$t('global.delete')" @click="deleteJasa(item)"
                class="btn btn-icon btn-danger btn-sm">
                <i class="ri-delete-bin-2-line"></i>
              </a>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:header-filter>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(handleGetMainData)" autocomplete="off">
            <div class="row">
              <!-- <b-col cols="3" sm="3" md="3" lg="3" class="d-flex flex-column justify-content-between">
                <label for="nama_jasa">Nama Jasa</label>
                <b-form-input id="nama_jasa" v-model="filters.nama_jasa" placeholder="Nama Jasa" type="text" size="sm"/>
              </b-col> -->
              <div class="col-3">
                <s-input v-model="filters.nama_jasa" :key="'nama_jasa'" :id="'nama_jasa'" :item="{
                  label: 'Nama Jasa',
                  id: 'nama_jasa',
                  data: 'nama_jasa',
                  type: 'text',
                  validation: [],
                  value: filters.nama_jasa,
                  param: {},
                }" :valuee="filters.nama_jasa" />
              </div>
              <div class="col-3">
                <s-input v-model="filters.ms_harga_id" :key="'ms_harga_id'" :id="'ms_harga_id'" :item="{
                  label: 'Nama Harga',
                  id: 'ms_harga_id',
                  data: 'ms_harga_id',
                  type: 'lookup-radio',
                  validation: ['required'],
                  value: filters.ms_harga_id,
                  api: 'msHarga',
                  pointer: {
                    label: 'nama_harga',
                    code: 'id',
                    display: ['nama_harga']
                  },
                  param: {},
                }" :valuee="filters.ms_harga_id" />
              </div>
              <div class="col-3 align-self-center p-0">
                <button type="submit" class="btn btn-light-primary mr-3">
                  <i class="ri-save-line"></i>
                  Terapkan Filter
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </template>
    </tas-base-crud>
</template>

<script>
export default {
  name: 'CRUD-msHargaJasa',
  data() {
    return {
      v: {},
      bulk_tarif: [],
      filters: {
        param: {
          ms_harga_id: '',
          nama_jasa: '',
        },
        ms_harga_id: null,
        nama_jasa: '',
        template_filters: {
          page: 1,
          limit: 10,
        },
      },
      config: {
        title: 'Daftar Jasa',
        model_api: '',
        getter: '',
        setter: '',
        custom_api: {
          list: 'msHargaJasa/listMsHargaJasaPerHalamanBypassUri',
          delete: 'msJasa'
        },
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // id_jenis_harga
          {
            id: 'id',
            data: 'id',
            label: 'id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'nama_jasa',
            data: 'nama_jasa',
            label: 'Nama Jasa',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          {
            id: 'ms_jenis_jasa_id',
            data: 'ms_jenis_jasa_id',
            label: 'Jenis Jasa',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jenis_jasa' },
              detail: { view_data: 'nama_jenis_jasa' },
              create: true,
              update: true,
              filter: true
            }
          },
        ]
      },
      detail_jasa: [],
      main_data: [],
      is_initialed: false,
      list_jasa: [],
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
  },
  watch: {
    filters: {
      deep: true,
      immediate: true,
      handler(to, from) {
        this.handleGetMainData()
      }
    },
  },
  methods: {
    onSubmit() {
      this.$_api.create('msJasa', this.v).then(res => {

        if (res.status === 200) {
          this.$_alert.success('Data berhasil disimpan', res.message)
          this.$children[0].getEvent('list')
        } else {
          this.$_alert.error(null, 'Terjadi kesalahan', res.message)
        }
        this.handleGetMainData()
      })
    },
    onSubmitUpdate() {
      let bulk_ms_harga_jasa = this.detail_jasa.harga_jasa
      for (const i of bulk_ms_harga_jasa) {
        i.id = i.ms_harga_jasa_id
        delete i.ms_harga_jasa_id
      }

      let param = {
        id: this.detail_jasa.id,
        nama_jasa: this.detail_jasa.nama_jasa,
        ms_jenis_jasa_id: this.detail_jasa.ms_jenis_jasa_id,
        bulk_ms_harga_Jasa: bulk_ms_harga_jasa
      }

      this.$_api.customCreate('msHargaJasa/updateBulk', param).then(res => {

        if (res.status === 200) {
          this.$_alert.success(null, 'Data berhasil disimpan')
          this.$children[0].getEvent('list')
          this.handleGetMainData()
        } else {
          this.$_alert.error(null, 'Terjadi kesalahan')
        }
      })
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
    findJasa(item) {
      this.$refs['CRUD-msHargaJasa'].$children[1].emitEvent('update', item)
      this.detail_jasa = item

      for (const i in this.detail_jasa.harga_jasa) {
        if (!this.detail_jasa.harga_jasa[i].ms_harga_jasa_id) {
          this.detail_jasa.harga_jasa.splice(i, 1)
        }
      }
    },
    handleGetMainData(data) {
      this.getListMsharga(data)
    },
    deleteJasa(item) {
      let param = {
        id: item.ms_jasa_id
      }

      this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api.post('msJasa/delete', param).then(res => {
            if (res.status === 200) {
              this.$_alert.success(null, 'Data berhasil disimpan', res.message)
              this.handleGetMainData()
            } else {
              this.$_alert.error(null, 'Terjadi kesalahan', res.message)
            }
          })
        }
      })
    },
    getListMsharga(data) {
      if(!this.filters.ms_harga_id) return

      this.customDetailPagination.page = this.filters.template_filters.page
      this.customDetailPagination.limit = this.filters.template_filters.limit

      if (data) {
        this.filters.template_filters.page = data.paramAPI.page
        this.filters.template_filters.limit = data.paramAPI.limit
      }

      this.$_api.post('msHargaJasa/listMsHargaJasaPerHalaman', {
        halaman: this.filters.template_filters.page,
        jumlah: this.filters.template_filters.limit,
        ms_harga_id: this.filters.ms_harga_id,
        nama_jasa: this.filters.nama_jasa,
      }).then(res => {
        this.list_jasa = res.data

        if (this.filters.ms_harga_id) {
          this.main_data = []

          let listData = []
          listData = this.list_jasa

          for (const i in listData) {
            this.main_data[i] = listData[i]
          }

          for (const i in this.main_data) {
            let hargaJasaIDs = []
            this.main_data[i].id = this.main_data[i].ms_jasa_id
            for (const j in this.main_data[i].harga_jasa) {
              hargaJasaIDs.push(this.main_data[i].harga_jasa[j].ms_tarif_id)
            }

            for (const j in this.bulk_tarif) {
              if (!hargaJasaIDs.includes(this.bulk_tarif[j].ms_tarif_id)) {
                this.main_data[i].harga_jasa.push({
                  ms_tarif_id: this.bulk_tarif[j].ms_tarif_id,
                  nama_tarif: this.bulk_tarif[j].nama_tarif,
                  harga_beli: 0,
                  harga_jual: 0,
                  ms_harga_jasa_id: this.bulk_tarif[j].ms_harga_jasa_id
                })
              }
            }

            this.main_data[i].harga_jasa = this.main_data[i].harga_jasa.sort((a, b) => {
              return a.nama_tarif.localeCompare(b.nama_tarif)
            })
          }
          if (data) {
            this.filters.template_filters.page = data.paramAPI.page
            this.filters.template_filters.limit = data.paramAPI.limit
          }
          this.customDetailPagination.mainDataLength = listData.length
          this.customDetailPagination.total = parseInt(res.count)
        }
      })
    },
    goBack() {
      this.$children[0].getEvent('list')
      this.handleGetMainData()
    },
    handleUpdateFilters(data) {
      this.filters.template_filters = data
    },
  }
}
</script>
