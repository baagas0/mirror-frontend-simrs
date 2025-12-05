<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header">
            <template #header>
              <b-row class="d-flex align-items-center">
                <b-col>
                  <h3 class="mb-0">
                    <strong>Daftar Eklaim</strong>
                  </h3>
                </b-col>
              </b-row>
            </template>
            <div>
              <form @submit.prevent="getData" autocomplete="off">
                <b-row style="row-gap: 10px;">
                  <b-col cols="4">
                    <s-input groupClass="mb-0" v-model="dataFilter.kelas_kunjungan_id" class="mb-0" :item="{
                      label: 'Pilih Kelas Kunjungan',
                      id: 'kelas_kunjungan_id',
                      data: 'kelas_kunjungan_id',
                      type: 'lookup-radio',
                      api: 'kelasKunjungan',
                      getter: 'kelasKunjungan',
                      setter: 'kelasKunjungan',
                      validation: ['required'],
                      pointer: {
                        label: 'nama_kelas_kunjungan',
                        code: 'id',
                        display: ['nama_kelas_kunjungan'],
                        mainParam: 'nama_kelas_kunjungan'
                      },
                    }" />
                  </b-col>
                  <b-col cols="4">
                    <s-input v-model="dataFilter.nama" :item="{
                      label: 'No. RM / No. SEP / Nama',
                      id: 'nama',
                      data: 'nama',
                      type: 'text',
                      validation: [''],
                    }" :valuee="dataFilter.nama" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="4">
                    <s-input v-model="dataFilter.tanggal" :item="{
                      id: 'datetime',
                      show: true,
                      class: '', attr: null,
                      value: null,
                      label: 'Tanggal',
                      placeholder: 'Isikan tanggal',
                      type: 'datetime',
                      validation: ['']
                    }" :valuee="dataFilter.tanggal" :disabled="false"></s-input>
                  </b-col>
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <div class="row align-self-end mt-4">
                      <b-col cols="12" sm="12" md="12" lg="12">
                        <button type="submit" class="btn btn-light-primary">
                          <i class="ri-save-line"></i>
                          Terapkan Filter
                        </button>
                        <div @click="resetFilter" class="btn btn-light-danger">
                          <i class="ri-loop-right-line"></i>
                          Reset
                        </div>
                      </b-col>
                    </div>
                  </b-col>
                </b-row>
              </form>
              <b-row class="mt-6">
                <b-col cols="12" md="12" lg="12">
                  <b-table 
                    :items="listTagihan" 
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
                    <template #cell(tgl_tagihan)="item">
                      {{ item.item.nama_tgl_tagihan }}
                    </template>
                    <template #cell(actions)="item">
                      <b-button @click="pilih(item.item)" variant="primary" size="sm" >Eklaim</b-button>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-row class="d-flex justify-content-between">
                <b-col cols="2">
                  <b-form-select id="per-page-select" v-model="dataFilter.jumlah" :options="[10, 25, 50, 100]" size="sm" />
                </b-col>
                <b-col cols="5">
                  <b-pagination class="m-0 p-0" v-model="dataFilter.halaman" :total-rows="totalRows" :per-page="dataFilter.jumlah"
                    align="fill" size="sm"></b-pagination>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: [
  ],
  data() {
    return {
      busy: false,
      listTagihan: [],
      totalRows: 0,
      dataFilter: {
        halaman: 1,
        jumlah: 10,
        nama: '',
        tanggal: '',
        kelas_kunjungan_id: '',
      },
      fields: [
        {
          key: "tgl_tagihan",
          label: "Tanggal Tagihan",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "no_rm",
          label: "No. RM",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "no_sep_tagihan",
          label: "No. SEP",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_tagihan",
          label: "Pasien",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_asuransi",
          label: "Asuransi",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "nama_jenis_layanan",
          label: "Jenis Layanan",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "total_tagihan",
          label: "Tagihan",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "actions",
          label: "Aksi",
          class: "align-middle table-option-2 text-center",
        },
      ],
    }
  },
  computed: {
    
  },
  watch: {
  },
  async mounted() {
    const vm = this
    await vm.getData()
  },
  methods: {
    async pilih(data){
      const vm = this
      vm.busy = false
      try {
        console.log(data)
        vm.$router.push({ path: './input_tagihan_eklaim', query: { tagihan_id: data.tagihan_id } })
      } catch (error) {
        vm.$_alert.success('Terjadi Kelasalahan System')
        console.log(error)
      } finally {
        vm.busy = false
      }
    },
    async getData(){
      const vm = this
      vm.busy = false
      try {
        console.log('vm.dataFilter', vm.dataFilter)
        const res = await vm.$_api.post('tagihan/listTagihanBPJS', {
          halaman: vm.dataFilter.halaman,
          jumlah: vm.dataFilter.jumlah,
          kelas_kunjungan_id: vm.dataFilter.kelas_kunjungan_id,
        })
        if(res.status == 200){
          vm.listTagihan = res.data.map(x=>{
            return {
              ...x,
              nama_tgl_tagihan: vm.$moment(x.tgl_tagihan).format("LL"),
            }
          })
          vm.totalRows = res.count
        }else {
          vm.$_alert.success(res.message)
        }
      } catch (error) {
        vm.$_alert.success('Terjadi Kelasalahan System')
        // console.log(error)
      } finally {
        vm.busy = false
      }
    },
    resetFilter() {
      const vm = this
      vm.dataFilter = {
        halaman: 1,
        jumlah: 10,
        nama: '',
        tanggal: '',
        kelas_kunjungan_id: '',
      }
      vm.getData()
    },
  },
}
</script>