<template>
  <div class="d-flex flex-column w-100">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Daftar</span> Pulang <span
                @click="customAlert('success')">SEP</span></strong></h3>
        </b-col>
      </b-row>

      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(getPulangList)" autocomplete="off" class="mb-4">
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
                <b-button @click="selectPulang(item)" variant="success" size="sm" class=" mr-1">Pilih</b-button>
                <!-- <b-button @click="hapusPulang(item)" variant="danger" size="sm" class=" ">Hapus</b-button> -->
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
  name: 'daftarPulangSEP',
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
        filter: '',
      },
      list: {
        sep: [],
      },
      fields: [
        {
          key: "noSep",
          label: "No SEP",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "noSepUpdating",
          label: "No SEP Terbaru",
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
          key: "ppkTujuan",
          label: "PPK Tujuan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
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
          key: "tglSep",
          label: "Tanggal SEP",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglPulang",
          label: "Tanggal Pulang",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglMeninggal",
          label: "Tanggal Meninggal",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "noSurat",
          label: "No Surat",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "keterangan",
          label: "Keterangan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "user",
          label: "User",
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
    getPulangList() {
      this.busy = true
      let month = moment(this.params.monthYear).format('MM')
      let year = moment(this.params.monthYear).format('YYYY')

      this.$_api.post('bpjs/vclaim/sep/getDataUpdateTglPulangSEP', {
        bulan: month,
        tahun: year,
        filter: this.params.filter,
      }).then((response) => {
        this.busy = false
        if (response.status == 200) {
          this.list.sep = response.data
          this.totalRows = response.count
          this.$_alert.success(response.message)
        } else {
          this.list.sep = []
          this.totalRows = 0
          this.$_alert.error(response, 'Gagal menampilkan pulang', response.message)
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
    selectPulang(item) {
      console.log(item, 'selectPulang');
      this.$emit('selectPulang', item)
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
    // this.getPulangList()
  },
  watch: {
    'isCreatedOrUpdated': {
      deep: true,
      immediate: true,
      handler: function (val, oldValue) {
        if (val) {
          console.log(val, 'isCreatedOrUpdated daftarRencanaPulang');
          this.getPulangList()
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
