<template lang="">
  <tas-base-crud ref="CRUD-penunjang" :config="config" :hideColumnVisibility="true" @getMainData="handleGetMainData" :headerFilterView="true" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" @updateFilters="handleUpdateFilters" :customDetailPagination="customDetailPagination">
    <template v-slot:create-form>
      <div class="card card-custom">
        <div class="card-header border-0 pt-5">
          <h5 class="card-title align-items-start flex-column">Tambah Penunjang</h5>
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
                  <s-input v-model="v.nama_penunjang" :key="'1111'" :id="'1111'" :item="{
                    label: 'Nama Penunjang',
                    id: 'nama_penunjang',
                    data: 'nama_penunjang',
                    type: 'text',
                    validation: ['required'],
                    param: {},
                  }" :valuee="''" />
                </div>
                
                <!-- <div class="col-12">
                  <s-input v-model="v.parameter_normal" :key="'2222'" :id="'2222'" :item="{
                    label: 'Parameter Normal',
                    id: 'parameter_normal',
                    data: 'parameter_normal',
                    type: 'text',
                    validation: [],
                    param: {},
                  }" :valuee="''" />
                </div> -->
                <!-- <div class="col-12">
                  <s-input v-model="v.satuan" :key="'2222'" :id="'2222'" :item="{
                    label: 'Satuan',
                    id: 'satuan',
                    data: 'satuan',
                    type: 'text',
                    validation: [],
                    param: {},
                  }" :valuee="''" />
                </div> -->
                
                <div class="col-12">
                  <div class="separator separator-dashed my-5"></div>
                  <h6 class="text-dark font-weight-bold mb-3">Detail Penunjang</h6>
                </div>

                <div class="col-12">
                  <s-input v-model="v.jenis_penunjang_id" :key="'2222'" :id="'2222'" :item="{
                    label: 'Jenis Penunjang',
                    id: 'jenis_penunjang_id',
                    data: 'jenis_penunjang_id',
                    type: 'select',
                    validation: ['required'],
                    api: 'jenis_penunjang',
                    pointer: {
                      label: 'nama_jenis_penunjang',
                      code: 'id',
                      display: ['nama_jenis_penunjang']
                    },
                    param: {},
                  }" :valuee="''" />
                </div>
                <div class="col-12">
                  <s-input v-model="v.tarif_cbg_id" :key="'2222'" :id="'2222'" :item="{
                    label: 'Tarif CBG',
                    id: 'tarif_cbg_id',
                    data: 'tarif_cbg_id',
                    type: 'select',
                    validation: ['required'],
                    api: 'tarif_cbg',
                    pointer: {
                      label: 'nama_tarif_cbg',
                      code: 'id',
                      display: ['nama_tarif_cbg']
                    },
                    param: {},
                  }" :valuee="''" />
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-md-3">
                      <s-input v-model="v.kode_loinc" :key="'kode_loinc'" :id="'kode_loinc'" :item="{
                        label: 'Kode Loinc',
                        id: 'kode_loinc',
                        data: 'kode_loinc',
                        type: 'text',
                        validation: [],
                        param: {},
                      }" :valuee="''" />
                    </div>
                    <div class="col-md-9">
                      <s-input v-model="v.nama_loinc" :key="'nama_loinc'" :id="'nama_loinc'" :item="{
                        label: 'Nama Loinc',
                        id: 'nama_loinc',
                        data: 'nama_loinc',
                        type: 'text',
                        validation: [],
                        param: {},
                      }" :valuee="''" />
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <table-input-array v-model="v.bulk_tarif" :key="'3333'" :id="'3333'" :label="[
                    {type: 'label', id: 'nama_tarif', label: 'Nama Tarif'},
                    {type: 'money', id: 'harga_beli_penunjang', label: 'Harga Beli'},
                    {type: 'money', id: 'harga_jual_penunjang', label: 'Harga Jual'},
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
          <h5 class="card-title align-items-start flex-column">Edit Penunjang</h5>
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
                <!-- <div class="d-flex flex-column justify-content-between mb-5 pl-4">
                  <div class="font-weight-boldest">Nama Penunjang</div>
                  <div class="">{{ detail_penunjang.nama_penunjang }}</div>
                </div> -->

                <!-- <pre>{{detail_penunjang}}</pre>
                <hr>
                <pre>{{ v }}</pre> -->
                
                <div class="col-12">
                  <s-input v-model="v.nama_penunjang" :key="'1111'" :id="'1111'" :item="{
                    label: 'Nama Penunjang',
                    id: 'nama_penunjang',
                    data: 'nama_penunjang',
                    type: 'text',
                    validation: ['required'],
                    param: {},
                  }" :disabled="true" :valuee="detail_penunjang.nama_penunjang" />
                </div>
                
                <!-- <div class="col-12">
                  <s-input v-model="v.parameter_normal" :key="'2222'" :id="'2222'" :item="{
                    label: 'Parameter Normal',
                    id: 'parameter_normal',
                    data: 'parameter_normal',
                    type: 'text',
                    validation: [],
                    param: {},
                  }" :valuee="detail_penunjang.parameter_normal" />
                </div> -->

                <div class="col-12">
                  <div class="separator separator-dashed my-5"></div>
                  <h6 class="text-dark font-weight-bold mb-3">Detail Penunjang</h6>
                </div>

                <div class="col-12">
                  <s-input v-model="v.jenis_penunjang_id" :key="'2222'" :id="'2222'" :item="{
                    label: 'Jenis Penunjang',
                    id: 'jenis_penunjang_id',
                    data: 'jenis_penunjang_id',
                    type: 'select',
                    validation: ['required'],
                    api: 'jenis_penunjang',
                    pointer: {
                      label: 'nama_jenis_penunjang',
                      code: 'id',
                      display: ['nama_jenis_penunjang']
                    },
                    param: {},
                  }" :disabled="true" :valuee="detail_penunjang.jenis_penunjang_id" />
                </div>
                <div class="col-12">
                  <s-input v-model="v.tarif_cbg_id" :key="'2222'" :id="'2222'" :item="{
                    label: 'Tarif CBG',
                    id: 'tarif_cbg_id',
                    data: 'tarif_cbg_id',
                    type: 'select',
                    validation: ['required'],
                    api: 'tarif_cbg',
                    pointer: {
                      label: 'nama_tarif_cbg',
                      code: 'id',
                      display: ['nama_tarif_cbg']
                    },
                    param: {},
                  }" :valuee="detail_penunjang.tarif_cbg_id" />
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-md-3">
                      <s-input v-model="v.kode_loinc" :key="'kode_loinc'" :id="'kode_loinc'" :item="{
                        label: 'Kode Loinc',
                        id: 'kode_loinc',
                        data: 'kode_loinc',
                        type: 'text',
                        validation: [],
                        param: {},
                      }" :valuee="detail_penunjang.kode_loinc" />
                    </div>
                    <div class="col-md-9">
                      <s-input v-model="v.nama_loinc" :key="'nama_loinc'" :id="'nama_loinc'" :item="{
                        label: 'Nama Loinc',
                        id: 'nama_loinc',
                        data: 'nama_loinc',
                        type: 'text',
                        validation: [],
                        param: {},
                      }" :valuee="detail_penunjang.nama_loinc" />
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <table-input-array v-model="detail_penunjang.harga_penunjang" :key="'3333'" :id="'3333'" :label="[
                    {type: 'label', id: 'nama_tarif', label: 'Nama Tarif'},
                    {type: 'money', id: 'harga_beli_penunjang', label: 'Harga Beli'},
                    {type: 'money', id: 'harga_jual_penunjang', label: 'Harga Jual'},
                  ]" :list="detail_penunjang.harga_penunjang" :getter="'s'" :disableAdd="true" :disableDelete="true" :tableLabel="'Daftar Harga'" />
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
              <label for="nama_lengkap">Nama Penunjang</label>
              <b-form-input id="nama_lengkap" v-model="filters.nama_penunjang" placeholder="Nama Penunjang" type="text" size="sm"/>
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
          Nama Penunjang
        </th>
        <th class="text-align-vertical min-w-250px" rowspan="2">
          Jenis Penunjang
        </th>
        <th class="text-align-vertical min-w-250px" rowspan="2">
          Harga
        </th>
        <th v-for="(item, index) in bulk_tarif" :key="index" class="text-center">{{item.nama_tarif}}</th>
        <th class="text-align-vertical" rowspan="2">
          &nbsp;Aksi
        </th>
      </tr>
    </template>
    <template v-slot:list-table="rowData">
      <tr v-for="(itemm, i) in main_data" :key="i+'key-tr'" style="position: relative;">
        <td>{{ parseInt(i)+1 }}</td>
        <td>{{ itemm.nama_penunjang }}</td>
        <td>{{ itemm.nama_jenis_penunjang }}</td>
        <td>{{ itemm.nama_harga }}</td>
        <td v-for="(penunjang, indexx) in itemm.harga_penunjang" :key="indexx">
          <div class="d-flex flex-column justify-content-between text-nowrap px-2">
            <div class="d-flex justify-content-between">
              <div class="mr-4">Beli</div>
              <div>{{penunjang.harga_beli_penunjang | parse('money')}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="mr-4">Jual</div>
              <div>{{penunjang.harga_jual_penunjang | parse('money')}}</div>
            </div>

          </div>
        </td>

        <!-- <td class="action-table sticky-right">
          <div class="action-button">
            <a v-b-tooltip.top.viewport="$t('global.update')" @click="findPenunjang(itemm)"
              class="btn btn-icon btn-warning btn-sm">
              <i class="ri-edit-2-line"></i>
            </a>
            <a v-b-tooltip.top.viewport="$t('global.delete')" @click="deletePenunjang(itemm)"
              class="btn btn-icon btn-danger btn-sm">
              <i class="ri-delete-bin-2-line"></i>
            </a>
          </div>
        </td> -->
        <td class="">
          <div class="d-flex justify-content-end " style="gap: 0.5rem;">
            <!-- <a v-b-tooltip.top.viewport="$t('global.update')" @click="findPenunjang(itemm)"
              class="btn btn-light-info">
              <i class="ri-eye-line">Edit Harga</i>
            </a> -->
            <a v-b-tooltip.top.viewport="$t('global.detail')" class="btn font-size-sm font-weight-bold btn-info btn-sm" @click="detailPenunjang(itemm)">
                      <i class="ri-information-line p-0"></i> Lihat Detail </a>
            <a v-b-tooltip.top.viewport="$t('global.update')" @click="findPenunjang(itemm)"
              class="btn btn-icon btn-warning btn-sm" style="width: 42px; height: 32px;">
              <i class="ri-edit-2-line"></i>
            </a>
            <a v-b-tooltip.top.viewport="$t('global.delete')" @click="deletePenunjang(itemm)"
              class="btn btn-icon btn-danger btn-sm" style="width: 42px; height: 32px;">
              <i class="ri-delete-bin-2-line"></i>
            </a>
          </div>
        </td>
      </tr>
    </template>
    <template v-slot:detail-bottom="rowData">
      <div class="card card-custom mt-6">
        <!-- <div class="card-header border-0 pt-5">
          <h5 class="card-title align-items-start flex-column">Detail Penunjang</h5>
          <div class="card-toolbar">
            <a @click="$children[0].getEvent('list')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
              <i class="ri-arrow-go-back-line p-0"></i>
            </a>
          </div>
        </div> -->
        <div class="card-body">
          <div class="row" v-if="rowData">
            <!-- Basic Information -->
            <div class="col-12 mb-5">
              <div class="separator separator-dashed mb-5"></div>
              <h6 class="text-dark font-weight-bold mb-3">Informasi Dasar</h6>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row" @click="loggg(rowData)">
                    <label class="col-4 col-form-label font-weight-bold">Nama Penunjang:</label>
                    <div class="col-8">
                      <span class="form-control-plaintext">{{ rowData.rowData.nama_penunjang || '-' }}</span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-4 col-form-label font-weight-bold">Parameter Normal:</label>
                    <div class="col-8">
                      <span class="form-control-plaintext">{{ rowData.rowData.parameter_normal || '-' }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-4 col-form-label font-weight-bold">Satuan:</label>
                    <div class="col-8">
                      <span class="form-control-plaintext">{{ rowData.rowData.satuan || '-' }}</span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-4 col-form-label font-weight-bold">Jenis Penunjang:</label>
                    <div class="col-8">
                      <span class="form-control-plaintext">{{ rowData.rowData.nama_jenis_penunjang || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price Information -->
            <div class="col-12">
              <div class="separator separator-dashed my-5"></div>
              <h6 class="text-dark font-weight-bold mb-3">Daftar Harga</h6>
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center">#</th>
                      <th>Nama Tarif</th>
                      <th class="text-right">Harga Beli</th>
                      <th class="text-right">Harga Jual</th>
                      <th class="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(harga, index) in detail_penunjang.harga_penunjang" :key="index">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>
                        <span class="font-weight-bold">{{ harga.nama_tarif }}</span>
                      </td>
                      <td class="text-right">
                        <span class="text-primary font-weight-bold">
                          {{ harga.harga_beli_penunjang | parse('money') }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="text-success font-weight-bold">
                          {{ harga.harga_jual_penunjang | parse('money') }}
                        </span>
                      </td>
                      <td class="text-center">
                        <span v-if="harga.harga_jual_penunjang > 0" class="label label-success label-inline">Aktif</span>
                        <span v-else class="label label-light-warning label-inline">Tidak Aktif</span>
                      </td>
                    </tr>
                    <tr v-if="!detail_penunjang.harga_penunjang || detail_penunjang.harga_penunjang.length === 0">
                      <td colspan="5" class="text-center text-muted">Tidak ada data harga</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-else class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <p class="mt-3 text-muted">Memuat detail penunjang...</p>
          </div>
        </div>
      </div>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
name: 'crud-jenis_penunjang',
data() {
  return {
    v: {
      operator: '-',
      nilai_r_neonatus_min: 0,
      nilai_r_neonatus_max: 0,
      nilai_r_bayi_min: 0,
      nilai_r_bayi_max: 0,
      nilai_r_anak_min: 0,
      nilai_r_anak_max: 0,
      nilai_r_d_perempuan_min: 0,
      nilai_r_d_perempuan_max: 0,
      nilai_r_d_laki_min: 0,
      nilai_r_d_laki_max: 0,
    },
    bulk_tarif: [],
    config: {
      title: 'Daftar Harga Penunjang',
      model_api: 'jenis_penunjang',
      getter: 'penunjang',
      setter: 'penunjang',
      pk_field: null,
      frontendPaginate: false,
      custom_api: {
        list: 'penunjang',
        delete: 'penunjang'
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
        // id_jenis_penunjang
        {
          id: 'id',
          data: 'id',
          label: 'Nama',
          placeholder: null,
          methods: {
            list: false,
            detail: false,
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
    detail_penunjang: [],
    isShowFilters: true,
    filters: {
      param: {
        ms_harga_id: ''
      },
      template_filters: {
        page: 1,
        limit: 10,
      },
      nama_penunjang: '',
      ms_harga_id: null,
    },
    list: {
      list_ms_harga: [],
    },
    list_penunjang: [],
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
  loggg(data) {
    console.log(data);
  },
  onSubmit() {
    this.$_api.post('penunjang/register', this.v).then(res => {

      if (res.status === 200) {
        this.$_alert.success('Berhasil', res.message ? res.message : 'Data berhasil disimpan')
        this.$children[0].getEvent('list')
      } else {
        this.$_alert.error({ message: res.message }, 'Terjadi kesalahan')
      }
      this.handleGetMainData()
    })
    .catch((err) => {
      console.log(err)
      this.$_alert.error(err)
    })
  },
  onSubmitUpdate() {
    let bulk_ms_harga_penunjang = this.detail_penunjang.harga_penunjang

    for (const i of bulk_ms_harga_penunjang) {
      i.id = i.ms_harga_penunjang
      // delete i.ms_harga_penunjang
      delete i.nama_tarif
    }
    
    // UPDATE HARGA
    this.$_api.customCreate('ms_harga_penunjang/updateBulk', {bulk_ms_harga_penunjang}).then(res => {

      // Update Penunjang
      this.$_api.update('penunjang', { ...this.v, id: this.detail_penunjang.penunjang_id }).then((res) => {
        if (res.status === 200) {
          this.$_alert.success('Berhasil', res.message ? res.message : 'Data berhasil disimpan')
          this.$children[0].getEvent('list')
        } else {
          this.$_alert.error(null, 'Terjadi kesalahan')
        }
        this.handleGetMainData()
      })
    })
  },
  deletePenunjang(item) {
    console.log(item);
    let param = {
      id: item.penunjang_id
    }
    this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
      if (result.isConfirmed) {
        //harganya ga ikut ke hapus hehehe
        this.$_api.post('penunjang/delete', param).then(res => {
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
    // this.$refs['CRUD-penunjang'].$children[1].deleteData(param)
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
          harga_beli_penunjang: 0,
          harga_jual_penunjang: 0
        })
      }
    })
  },
  findTarif(data, ms_tarif_id, key) {
    let d = data.filter((x) => { return x.ms_tarif_id === ms_tarif_id })

    if (d.length) return d[0][key]
    else return 0
  },
  detailPenunjang(item) {
    this.$refs['CRUD-penunjang'].$children[1].emitEvent('detail', item)
    this.detail_penunjang = item
    // console.log(this.detail_penunjang);
  },
  findPenunjang(itemx) {
    console.log('===> penunjang.vue:896 ~ itemx', itemx);
    // console.log(itemx);
    this.$refs['CRUD-penunjang'].$children[1].emitEvent('update', itemx)
    this.detail_penunjang = itemx
    // // console.log(this.detail_penunjang);
    // for (const i in this.detail_penunjang.harga_penunjang) {
    //   if (!this.detail_penunjang.harga_penunjang[i].ms_harga_penunjang_id) {
    //     this.detail_penunjang.harga_penunjang.splice(i, 1)
    //   }
    // }
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
    this.$refs['CRUD-penunjang'].$children[1].getData(this.filters)
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
      nama_penunjang: '',
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
    this.getListMsHargaPenunjang(data)
  },
  async getListMsHargaPenunjang(data) {
    // console.log(data, 'data param api2');
    this.customDetailPagination.page = this.filters.template_filters.page
    this.customDetailPagination.limit = this.filters.template_filters.limit

    if (data) {
      this.filters.template_filters.page = data.paramAPI.page
      this.filters.template_filters.limit = data.paramAPI.limit
    }

    await this.$_api.post('ms_harga_penunjang/listPenunjangHargaTarifPerHalaman', {
      halaman: this.filters.template_filters.page,
      jumlah: this.filters.template_filters.limit,
      nama_penunjang: this.filters.nama_penunjang,
      ms_harga_id: this.filters.ms_harga_id
    }).then(res => {
      this.list_penunjang = res.data

      this.main_data = {}

      let listData = []
      listData = this.list_penunjang

      for (const i in listData) {
        this.main_data[i] = listData[i]
      }

      for (const i in this.main_data) {
        let hargaJasaIDs = []
        this.main_data[i].id = this.main_data[i].ms_penunjang_id
        for (const j in this.main_data[i].harga_penunjang) {
          hargaJasaIDs.push(this.main_data[i].harga_penunjang[j].ms_tarif_id)
        }

        for (const j in this.bulk_tarif) {
          if (!hargaJasaIDs.includes(this.bulk_tarif[j].ms_tarif_id)) {
            this.main_data[i].harga_penunjang.push({
              ms_tarif_id: this.bulk_tarif[j].ms_tarif_id,
              nama_tarif: this.bulk_tarif[j].nama_tarif,
              harga_beli_penunjang: 0,
              harga_jual_penunjang: 0,
              ms_harga_penunjang_id: this.bulk_tarif[j].ms_harga_penunjang_id
            })
          }
        }

        this.main_data[i].harga_penunjang = this.main_data[i].harga_penunjang.sort((a, b) => {
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
  formatDate(date) {
    if (!date) return '-'
    try {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return date
    }
  },
},
}
</script>
<style>
.limit-table .vs__dropdown-toggle {
  border: 1px solid #e4e6ef;
  min-width: 70px;
}

.limit-table .vs__open-indicator {
  fill: #d3d6e2;
}

.v-separator {
  border-right: 2px solid #e4e6ef;
  height: calc(1.5em + 1.3rem);
}
</style>
<style scoped>
.sticky {
  position: sticky !important;
  left: 0 !important;
  background-color: var(--bg-primary);
  z-index: 2;
  max-width: 350px;
  min-width: 250px;
  /* width: 200px; */
}

.sticky-right {
  position: sticky !important;
  right: 0 !important;
  z-index: 2;
}

.pagination-text {
  width: 80px;
  text-align: center;
}

.seach-form {
  border-radius: 18px;
}

.img-table {
  height: 50px;
  width: 50px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
}

.table-hover tbody tr:hover td {
  color: var(--text-theme);
  background-color: var(--bg-secondary) !important;
}

.action-table {
  width: 1%;
  height: 100%;
  white-space: nowrap;
  text-align: right;
  position: relative;
}

.action-table .action-button {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 5px;
  background-color: transparent;
  transform: translate(0, -50%);
  height: 100%;
  transition: all 0.5s ease;
  opacity: 0;
  padding: 1rem;
}

.action-table .action-button a {
  margin-right: 0.25em;
}

.table-hover tbody tr:hover td.action-table .action-button {
  opacity: 1;
  background-color: var(--bg-secondary) !important;
}

.sort-table {
  transition: all 0.5s ease;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translate(0, -50%);
}

.table-head-custom th {
  background-color: var(--bg-secondary) !important;
  color: var(--text-theme);
}

.table-head-custom th span {
  color: var(--text-theme);
}
</style>