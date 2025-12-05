<template>
  <div class="d-flex flex-column w-100">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong>Daftar Rujukan Khusus</strong></h3>
        </b-col>
      </b-row>

      <form @submit.prevent="getRujukanList" autocomplete="off" class="mb-4">
        <b-row>
          <b-col cols="3" class="d-flex flex-row">
            <s-input class="mr-4" groupClass="mb-0" v-model="params.monthYear" :item="{
              label: 'Bulan Tahun',
              id: 'monthYear',
              data: 'monthYear',
              type: 'month',
              validation: ['required'],
            }" :valuee="dateDefault.start" />
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
              {{ formatTranslatedDate(item.item.tglRujukan) }}
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
  name: 'vclaim-rujukan-khusus',
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
        monthYear: '',
      },
      list: {
        rujukan: [],
      },
      fields: [
        {
          key: "norujukan",
          label: "No Rujukan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nokapst",
          label: "No Kartu",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "nmpst",
          label: "Nama Pasien",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "diagppk",
          label: "Diagnosa",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "tglrujukan_awal",
          label: "Tanggal Rujukan Awal",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "tglrujukan_berakhir",
          label: "Tanggal Rujukan Berakhir",
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
      let month = moment(this.params.monthYear).format('MM')
      let year = moment(this.params.monthYear).format('YYYY')

      this.$_api.post('bpjs/vclaim/rujukan/getRujukanKhusus', {
        bulan: month,
        tahun: year,
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
        monthYear: dateDefault.start,
      }
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
