<template lang="">
  <div class="container-fluid">
    
    <form @submit.prevent="getData">
      <div class="row mt-3">
        <div class="col-6">
          <label class="d-block">Kata Kunci</label>
          <div class="input-icon w-100">
            <input v-model.lazy.trim="paramAPI.search" autocomplete="off" name="search" type="text" class="form-control seach-form" :placeholder="'Cari nama pasien, no RM, no kunjungan'">
            <span>
              <i class="ri-search-line text-primary"></i>
            </span>
          </div>
        </div>
        <div class="col-3">
          <s-input v-model="paramAPI.tanggal_awal" :item="{
            label: 'Tanggal Awal',
            id: 'tanggal_awal',
            data: 'tanggal_awal',
            value: paramAPI.tanggal_awal,
            type: 'date',
            class: '',
            validation: [],
          }" :valuee="paramAPI.tanggal_awal" />
        </div>
        <div class="col-3">
          <s-input v-model="paramAPI.tanggal_akhir" :item="{
            label: 'Tanggal Akhir',
            id: 'tanggal_akhir',
            data: 'tanggal_akhir',
            value: paramAPI.tanggal_akhir,
            type: 'date',
            class: '',
            validation: [],
          }" :valuee="paramAPI.tanggal_akhir" />
        </div>
        <div class="col-12">
          <button class="btn btn-primary mb-2" type="submit"><i class="ri-filter-line"></i> Filter</button>
        </div>
      </div>
    </form>
    <div class="row overflow-auto h-90vh mt-3" style="height: 80vh">
      <div class="col-md-4" v-for="(item, index) in list" :key="'list-registrasi-igd-'+index">
        <div class="card">
          <div class="card-header align-items-center border-0 ribbon ribbon-right px-3 pt-3 pb-0" :class="{ 'bg-light-warning': item.registrasi_id === registrasi_id }">
            <div class="ribbon-target bg-primary" :class="[ ribbonColor[item.nama_kelas_kunjungan] ]" style="top: 10px; right: -2px;">
              {{ item.nama_kelas_kunjungan || '-' }}
            </div>
            <h3 class="card-title align-items-start d-flex flex-column mb-3">
              <span class="font-weight-bolder text-dark font-size-lg">{{ item.nama_lengkap }}</span>
              <label class="text-muted mt-3 font-weight-bold font-size-sm">{{ item.nama_jenis_layanan }}</label>
              <label class="text-muted mt-0 font-weight-bold font-size-sm">{{ item.tgl_registrasi | parse('longDateTime') }}</label>
              <label class="text-muted mt-0 font-weight-bold font-size-sm">No. Regis {{ item.no_identitas_registrasi }}</label>
            </h3>
            <div class="separator separator-dashed separator-border-2"></div>
          </div>
          <div class="card-body p-3 pt-0" :class="{ 'bg-light-warning': item.registrasi_id === registrasi_id }">
            <p class="text-muted mb-0 pb-0 font-weight-bold font-size-sm">Bpjs {{ item.bpjs_id }}</p>
            <p class="text-muted mb-0 pb-0 font-weight-bold font-size-sm">{{ item.nama_dokter || '-' }}</p>

            <p class="text-muted mt-3 mb-0 pb-0 font-weight-bold font-size-sm">NIK {{ item.nik }}</p>
            <p class="text-muted mb-3 mb-0 font-weight-bold font-size-sm">NPWP {{ item.npwp }}</p>
            <p class="text-muted mb-0 pb-0 font-weight-bold font-size-sm">{{ item.alamat_sekarang }}</p>

            <button class="btn btn-sm btn-light-success mt-3" @click="selectData(item.registrasi_id)" v-if="hasSelectData">
              <i class="ri-reply-line"></i> Pilih Data
            </button>

          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div class="d-flex flex-wrap py-2 mr-3">
              <a href="#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" :class="{ 'disabled': detailAPI.pagination.length === 1 || paramAPI.page === 1 }" @click="paramAPI.page = paramAPI.page - 1"><i class="ki ki-bold-arrow-back icon-xs"></i></a>

              <button class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" :class="{ 'active': paramAPI.page === page }" v-for="page in detailAPI.pagination" :key="'pagination'+page" @click="paramAPI.page = page">{{ page }}</button>

              <a href="#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" :class="{ 'disabled': detailAPI.pagination.length !== 3 }" @click="paramAPI.page = paramAPI.page + 1"><i class="ki ki-bold-arrow-next icon-xs"></i></a>
          </div>
          <div class="d-flex align-items-center py-3">
              <div class="d-flex align-items-center" v-if="loading">
                <div class="mr-2 text-muted">Loading...</div>
                <div class="spinner spinner-primary mr-10"></div>
              </div>
              
              <select class="form-control form-control-sm text-primary font-weight-bold mr-4 border-0 bg-light-primary" style="width: 75px;">
                  <option value="2" :selected="paramAPI.limit === 2" @click="paramAPI.limit = 2">2</option>
                  <option value="10" :selected="paramAPI.limit === 10" @click="paramAPI.limit = 10">10</option>
                  <option value="20" :selected="paramAPI.limit === 20" @click="paramAPI.limit = 20">20</option>
                  <option value="30" :selected="paramAPI.limit === 30" @click="paramAPI.limit = 30">30</option>
                  <option value="50" :selected="paramAPI.limit === 50" @click="paramAPI.limit = 50">50</option>
                  <option value="100" :selected="paramAPI.limit === 100" @click="paramAPI.limit = 100">100</option>
              </select>
              <span class="text-muted">{{ list.length }} of {{ detailAPI.total }} records</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/* .horizontal-scrollable>.row {
    height: 100%;
    overflow: auto;
    white-space: nowrap;
  }

  .horizontal-scrollable>.row>.col-md-4 {
    display: inline-block;
    float: none;
  } */
</style>
<script>
export default {
  name: 'crud-bank',
  data () {
    return {
      list: [],
      color: ['bg-primary', 'bg-warning', 'bg-danger'],
      ribbonColor: {},
      loading: false,
      paramAPI: {
        limit: 10,
        page: 1
      },
      detailAPI: {
        total: 0,
        pagination: []
      },
      registrasi_id: null,
      routeWhiteList: ['Layanan IGD keperawatan']
    }
  },
  watch: {
    paramAPI: {
      deep: true,
      immediate: true,
      handler (to, from) {
        // this.getData()
      }
    },
    registrasi_id: {
      deep: false,
      immediate: false,
      handler (to) {
        this.$router.push({ path: this.$route.path, query: { 'view': 'list' + to, registrasi_id: to }, params: { registrasi_id: to } }).catch(() => { })
      }
    },
    '$route.path' (to, from){
      this.registrasi_id = null
      // console.log(to)
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    hasSelectData () {
      let check = this.routeWhiteList.includes(this.$route.name)
      return check
    }
  },
  methods: {
    getData () {
      this.loading = true
      this.$_api.list('registrasi/listKunjunganIGDPerHalamanBypassUri', { ...this.paramAPI }).then((res) => {
        this.list = res.data

        this.detailAPI.total = res.count
        this.detailAPI.pagination = []

        const totalPages = Math.ceil(res.count / res.jumlah)
        const currentPage = res.halaman
        const paginationStart = Math.max(1, currentPage - 1)
        const paginationEnd = Math.min(totalPages, paginationStart + 2)
        this.detailAPI.pagination = Array.from({ length: paginationEnd - paginationStart + 1 }, (_, i) => i + paginationStart)

        for (const i of this.list) {
          if (!this.ribbonColor[i.nama_kelas_kunjungan]) this.ribbonColor[i.nama_kelas_kunjungan] = this.color[Math.floor(Math.random() * this.list.length)]
        }

        this.loading = false
      })
    },
    selectData (data) {
      this.registrasi_id = data

      setTimeout(() => this.$root.$emit('closeCanvas'), 150)
    }
  }
}
</script>
