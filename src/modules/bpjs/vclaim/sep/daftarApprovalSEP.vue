<template>
  <div class="d-flex flex-column w-100">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Daftar</span> Pengajuan <span
                @click="customAlert('success')">SEP</span></strong></h3>
        </b-col>
      </b-row>

      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(getPengajuanList)" autocomplete="off" class="mb-4">
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
      </ValidationObserver>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <b-table :items="list.sep" :fields="fields" responsive show-empty small bordered striped hover :busy="busy"
            style="white-space:nowrap;" class="">
            <template #cell(actions)="item">
              <div class="align-self-center"></div>
              <div class="p-2">
                <b-button @click="selectPengajuan(item)" variant="success" size="sm" class=" mr-1">Pilih</b-button>
                <!-- <b-button @click="hapusPengajuan(item)" variant="danger" size="sm" class=" ">Hapus</b-button> -->
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
  name: 'daftarApprovalSEP',
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
        sep: [],
      },
      fields: [
        {
          key: "noKartu",
          label: "No Kartu",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nama",
          label: "Nama",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglsep",
          label: "Tanggal SEP",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "jnspelayanan",
          label: "Jenis Pelayanan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "persetujuan",
          label: "Persetujuan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "status",
          label: "Status",
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
      },
      user: 'Coba W'
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY')
    },
    formatYMD(paramDate) {
      return moment(paramDate).format('YYYY-MM-DD')
    },
    getPengajuanList() {
      this.busy = true
      let month = moment(this.params.monthYear).format('MM')
      let year = moment(this.params.monthYear).format('YYYY')

      this.$_api.post('bpjs/vclaim/sep/getDataPersetujuanSEP', {
        bulan: month,
        tahun: year,
      }).then((response) => {
        this.busy = false
        if (response.status == 200) {
          this.list.sep = response.data
          this.totalRows = response.count
          this.$_alert.success(response.message)
        } else {
          this.list.sep = []
          this.totalRows = 0
          this.$_alert.error(response, 'Gagal menampilkan pengajuan', response.message)
        }
      }).catch((error) => {
        this.busy = false
        this.list.sep = []
        this.totalRows = 0

        console.log(error);
      })
    },
    resetFilter() {
      this.params = {
        monthYear: this.dateDefault.start,
      }
    },
    selectPengajuan(item) {
      console.log(item, 'selectPengajuan');
      this.$emit('selectPengajuan', item)
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
    this.getPengajuanList()
  },
  watch: {
    'isCreatedOrUpdated': {
      deep: true,
      immediate: true,
      handler: function (val, oldValue) {
        if (val) {
          console.log(val, 'isCreatedOrUpdated daftarRencanaPengajuan');
          this.getPengajuanList()
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
