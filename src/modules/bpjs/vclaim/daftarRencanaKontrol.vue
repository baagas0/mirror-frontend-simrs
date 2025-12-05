<template>
  <div class="d-flex flex-column w-100">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Daftar</span> <span
                @click="customAlert('success')">Rencana</span> Kontrol/SPRI</strong></h3>
        </b-col>
      </b-row>

      <form @submit.prevent="getRencanaKontrolList" autocomplete="off" class="mb-4">
        <b-row>
          <b-col cols="3">
            <s-input v-model="params.filter" :item="{
              label: 'Jenis Filter',
              id: 'filter',
              data: 'filter',
              api: false,
              type: 'select',
              validation: [],
              pointer: {
                label: 'label',
                code: 'code',
                display: ['label'],
              },
              optionList: list.filter,
              placeholder: 'Pilih Jenis Filter',
            }" :valuee="params.filter" />
          </b-col>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.tglAwal" :item="{
              label: 'Tanggal Awal',
              id: 'tglAwal',
              data: 'tglAwal',
              type: 'date',
              validation: [],
            }" :valuee="dateDefault.start" />
          </b-col>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.tglAkhir" :item="{
              label: 'Tanggal Akhir',
              id: 'tglAkhir',
              data: 'tglAkhir',
              type: 'date',
              validation: [],
            }" :valuee="dateDefault.end" />
          </b-col>

          <b-col cols="12" sm="12" md="12" lg="12">
            <div class="row align-self-end mt-2">
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
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-table :items="list.sep" :fields="fields" responsive show-empty small bordered striped hover :busy="busy"
            style="white-space:nowrap;" class="">
            <template #cell(tglRencanaKontrol)="item">
              <div class="align-self-center">
                {{ item.item.tglRencanaKontrol ? formatTranslatedDate(item.item.tglRencanaKontrol) : '' }}</div>
            </template>
            <template #cell(tglTerbitKontrol)="item">
              <div class="d-flex align-items-center">
                {{ item.item.tglTerbitKontrol ? formatTranslatedDate(item.item.tglTerbitKontrol) : '' }}</div>
            </template>
            <template #cell(tglSEP)="item">
              <div class="align-self-center">
                {{ item.item.tglSEP ? formatTranslatedDate(item.item.tglSEP) : '' }}</div>
            </template>
            <template #cell(actions)="item">
              <div class="align-self-center"></div>
              <div class="p-2">
                <b-button @click="selectKontrol(item)" variant="success" size="sm" class=" mr-1">Perbarui</b-button>
                <b-button @click="hapusKontrol(item)" variant="danger" size="sm" class=" ">Hapus</b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <b-row class="d-flex justify-content-between">
        <b-col cols="2">
          <b-form-select id="per-page-select" v-model="params.jumlah" :options="[10, 25, 50, 100]" size="sm" />
        </b-col>
        <b-col cols="5">
          <b-pagination class="m-0 p-0" v-model="params.halaman" :total-rows="totalRows" :per-page="params.jumlah"
            align="fill" size="sm"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'daftarRencanaKontrol',
  props: {
    isCreatedOrUpdated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dateDefault: {
        start: moment(new Date).subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      params: {
        jumlah: 10,
        halaman: 1,
        filter: '1',
        tglAwal: null,
        tglAkhir: null,
      },
      list: {
        sep: [],
        filter: [
          { label: 'Tanggal Entri', code: '1' },
          { label: 'Tanggal Rencana Kontrol', code: '2' },
        ],
      },
      fields: [
        {
          key: "noSuratKontrol",
          label: "No Surat Kontrol",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "jnsPelayanan",
          label: "Jenis Pelayanan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "namaJnsKontrol",
          label: "Jenis Kontrol",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglRencanaKontrol",
          label: "Tanggal Rencana Kontrol",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglTerbitKontrol",
          label: "Tanggal Terbit Kontrol",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglSEP",
          label: "Tanggal SEP",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "noSepAsalKontrol",
          label: "No SEP Asal Kontrol",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "noKartu",
          label: "No BPJS",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "namaDokter",
          label: "Dokter",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "namaPoliAsal",
          label: "Poli Asal",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "namaPoliTujuan",
          label: "Poli Tujuan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "actions",
          label: "Aksi",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
      ],
      busy: false,
      totalRows: 1,
      pageOptions: [1, 10, 25, 50, 100],
      selected: {
        details: null,
      },
      user: 'Coba W',
      authUser: {},
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY')
    },
    formatYMD(paramDate) {
      return moment(paramDate).format('YYYY-MM-DD')
    },
    getRencanaKontrolList() {
      this.busy = true
      this.$_api.post('bpjs/vclaim/rencanaKontrol/getDataNomorSuratKontrol', {
        halaman: this.params.halaman,
        jumlah: this.params.jumlah,
        filter: this.params.filter,
        tglAwal: this.formatYMD(this.params.tglAwal),
        tglAkhir: this.formatYMD(this.params.tglAkhir),
      }).then((response) => {
        if (response.status == 200) {
          this.list.sep = response.data
          this.totalRows = response.count
          this.$_alert.success(response.message)
        } else {
          this.$_alert.error(response, 'Gagal mengambil data', response.message)
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.busy = false
      })
    },
    resetFilter() {
      this.params = {
        jumlah: 10,
        halaman: 1,
        filter: '1',
        tglAwal: this.dateDefault.start,
        tglAkhir: this.dateDefault.end,
      }
    },
    selectKontrol(item) {
      this.$emit('selectKontrol', item)
    },
    hapusKontrol(item) {
      console.log(item, 'hapusKontrol');
      this.$_alert.confirm('Hapus Data', `Data ${item.item.namaJnsKontrol} dengan No Surat Kontrol ${item.item.noSuratKontrol} akan dihapus. Ingin melanjutkan?`).then((res) => {
        if (res.value) {
          this.$_api.post('bpjs/vclaim/rencanaKontrol/deleteRencanaKontrol', {
            noSuratKontrol: item.item.noSuratKontrol,
            user: this.user,
          }).then((res) => {
            if (res.status == 200) {
              this.$_alert.success(res.message)
              this.getRencanaKontrolList()
            } else {
              this.$_alert.error(res, 'Gagal menghapus data', res.message)
            }
          }).catch((error) => {
            console.log(error);
          })
        }
      })
    },
    getAuthUser() {
      let authUser = JSON.parse(localStorage.getItem('profile'))

      if (authUser) {
        this.authUser = authUser
        this.user = authUser.username
      }
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
    this.getRencanaKontrolList()
  },
  watch: {
    'params.jumlah': function (val) {
      this.getRencanaKontrolList()
    },
    'params.halaman': function (val) {
      this.getRencanaKontrolList()
    },
    'isCreatedOrUpdated': {
      deep: true,
      immediate: true,
      handler: function (val, oldValue) {
        if (val) {
          console.log(val, 'isCreatedOrUpdated daftarRencanaKontrol');
          this.getRencanaKontrolList()
          this.$emit('isCreatedOrUpdated', false)
        }
      },
    },
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
