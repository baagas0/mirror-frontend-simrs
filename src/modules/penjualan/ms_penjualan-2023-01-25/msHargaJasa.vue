<template lang="">
    <tas-base-crud ref="CRUD-msHargaJasa" :config="config">
      <template v-slot:create-form>
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h5 class="card-title align-items-start flex-column">Tambah Harga Jasa</h5>
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
                    <s-input v-model="v.nama_jasa" :key="'1111'" :id="'1111'" :item="{
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
                    ]" :list="bulk_tarif" :getter="'s'" :disableAdd="true" :disableDelete="true" :tableLabel="'Daftar Racun Tikus'" />
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
        <tr>
          <th class="text-align-vertical min-w-250px" rowspan="2">
            Nama Jasa
          </th>
          <th v-for="(item, index) in bulk_tarif" :key="index" class="text-center bg-light-success" colspan="2">{{item.nama_tarif}}</th>
        </tr>
        <tr>
          <th class="min-w-150px text-center bg-light-success">Harga Beli</th>
          <th class="min-w-150px text-center bg-light-success">Harga Jual</th>
          
          <th class="min-w-150px text-center bg-light-primary">Harga Beli</th>
          <th class="min-w-150px text-center bg-light-primary">Harga Jual</th>
          
          <th class="min-w-150px text-center bg-light-warning">Harga Beli</th>
          <th class="min-w-150px text-center bg-light-warning">Harga Jual</th>

          <th class="min-w-150px text-center bg-light-danger">Harga Beli</th>
          <th class="min-w-150px text-center bg-light-danger">Harga Jual</th>
        </tr>
      </template>
      <template v-slot:list-table="rowData">
        <tr v-for="(item, i) in rowData.rowData" :key="i+'key-tr'">
          <!-- <td><pre>{{ item.real }}</pre></td> -->
          <td>{{item.real.nama_jasa}}</td>
          <!-- <td>{{ item.real.nama_fasilitas }}</td>

          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'VIP'})[0].harga_beli | parse('money') }}</td>
          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'VIP'})[0].harga_jual | parse('money') }}</td>

          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'Kelas 1'})[0].harga_beli | parse('money') }}</td>
          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'Kelas 1'})[0].harga_jual | parse('money') }}</td>
          
          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'Kelas 2'})[0].harga_beli | parse('money') }}</td>
          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'Kelas 2'})[0].harga_jual | parse('money') }}</td>
          
          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'Kelas 3'})[0].harga_beli | parse('money') }}</td>
          <td class="">{{ item.real.harga_jasa.filter((e)=>{return e.nama_tarif == 'Kelas 3'})[0].harga_jual | parse('money') }}</td> -->

        </tr>
      </template>
    </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-mshargajasa',
  data() {
    return {
      v: {},
      bulk_tarif: [],
      config: {
        title: 'Daftar Harga Jasa',
        model_api: 'msHargaJasa',
        getter: 'msHargaJasa',
        setter: 'msHargaJasa',
        pk_field: 'ms_harga_jasa_id',
        frontendPaginate: true,
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
          // {
          //   id: 'ms_tarif_id',
          //   data: 'ms_tarif_id',
          //   label: 'Tarif',
          //   placeholder: null,
          //   methods: {
          //     list: { view_data: 'nama_tarif' },
          //     detail: { view_data: 'nama_tarif' },
          //     create: false,
          //     update: false,
          //     filter: false
          //   }
          // },
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
      }
    }
  },
  mounted() {
    this.$_api.post('msTarif/list', {}).then(res => {
      for (const i of res.data) {
        this.bulk_tarif.push({
          ms_tarif_id: i.id,
          nama_tarif: i.nama_tarif,
          harga_beli: 0,
          harga_jual: 0
        })
      }
    })
  },
  methods: {
    onSubmit() {
      this.$_api.create('msJasa', this.v).then(res => {

        if (res.status === 200) {
          this.$_alert.success({ message: res.message ? res.message : 'Data berhasil disimpan' }, 'Berhasil')
          this.$children[0].getEvent('list')
        } else {
          this.$_alert.error({ message: res.message }, 'Terjadi kesalahan')
        }
      })
    }
  }
}
</script>
