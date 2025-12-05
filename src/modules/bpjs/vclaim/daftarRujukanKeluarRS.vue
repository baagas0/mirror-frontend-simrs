<template>
  <div class="d-flex flex-column w-100">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Daftar</span> Rujukan Keluar <span
                @click="customAlert('success')">RS</span></strong></h3>
        </b-col>
      </b-row>

      <form @submit.prevent="getRujukanList" autocomplete="off" class="mb-4">
        <b-row>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.tglMulai" :item="{
              label: 'Tanggal Awal',
              id: 'tglMulai',
              data: 'tglMulai',
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
          <b-table :items="list.rujukan" :fields="fields" responsive show-empty small bordered striped hover :busy="busy"
            style="white-space:nowrap;" class="">
            <template #cell(jenis_pelayanan)="item">
              {{ item.item.request.jnsPelayanan == 1 ? 'Rawat Inap (1)' : 'Rawat Jalan (2)' }}
            </template>
            <template #cell(tglRujukan)="item">
              {{ (item.item.tglRujukan) }}
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
  name: 'vclaim-rujukan-keluar',
  props: {
    isCreatedOrUpdated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dateDefault: {
        start: moment(new Date).subtract(2, 'day').startOf('day').format('YYYY-MM-DD'),
        end: moment().endOf('day').format('YYYY-MM-DD')
      },
      params: {
        tglMulai: null,
        tglAkhir: null,
      },
      list: {
        rujukan: [],
      },
      fields: [
        {
          key: "noRujukan",
          label: "No Rujukan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "tglRujukan",
          label: "Tanggal Rujukan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "jnsPelayanan",
          label: "Jenis Pelayanan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "noSep",
          label: "No SEP",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "noKartu",
          label: "No Kartu",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nama",
          label: "Nama",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "ppkDirujuk",
          label: "PPK Dirujuk",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "namaPpkDirujuk",
          label: "Nama PPK Dirujuk",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "aksi",
          label: "Aksi",
          sortDirection: "desc",
          class: "text-left",
        },
      ],
      busy: false,
      totalRows: 1,
      pageOptions: [1, 10, 25, 50, 100],
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY HH:mm')
    },
    getRujukanList() {
      this.busy = true
      this.$_api.post('bpjs/vclaim/rujukan/getRujukanKeluarRS', {
        tglMulai: this.params.tglMulai,
        tglAkhir: this.params.tglAkhir,
      }).then((res) => {
        this.busy = false
        if (res.status == 200) {
          this.list.rujukan = res.data
          this.totalRows = res.count
          this.$_alert.success('Berhasil mengambil data rujukan', res.message)
        } else {
          this.list.rujukan = []
          this.totalRows = 0
          this.$_alert.error(res, 'Gagal mengambil data rujukan', res.message)
        }
      }).catch((error) => {
        this.list.rujukan = []
        this.totalRows = 0
        this.$_alert.error(res, 'Gagal mengambil data rujukan', res.message)
        console.log(error);
      }).finally(() => {
        this.busy = false
      })
    },
    resetFilter() {
      this.params = {
        tglMulai: this.dateDefault.start,
        tglAkhir: this.dateDefault.end,
      }
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
    // this.getRujukanList()
  },
  watch: {
    'isCreatedOrUpdated': {
      deep: true,
      immediate: true,
      handler: function (val, oldValue) {
        if (val) {
          console.log(val, 'isCreatedOrUpdated daftarRencanaKontrol');
          this.getRujukanList()
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
