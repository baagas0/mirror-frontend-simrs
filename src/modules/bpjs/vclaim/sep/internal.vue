<template lang="">
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong><span @click="customAlert('error')">Daftar</span> <span @click="customAlert('success')">SEP</span> Internal</strong></h3>
        </b-col>
      </b-row>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(getSEPInternal)" autocomplete="off">
          <b-row>
            <b-col cols="3">
              <s-input v-model="params.noSep" :item="{
                label: 'No SEP',
                id: 'noSep',
                data: 'noSep',
                api: false,
                type: 'text',
                validation: ['required'],
              }" :valuee="params.noSep" />
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
            <!-- <template #cell(tglRencanaSepInternal)="item">
              <div class="align-self-center">
                {{ item.item.tglRencanaSepInternal ? formatTranslatedDate(item.item.tglRencanaSepInternal) : '' }}</div>
            </template> -->
            <template #cell(tglrujukinternal)="item">
              <div class="align-self-center">
                {{ item.item.tglrujukinternal ? formatTranslatedDate(item.item.tglrujukinternal) : '' }}</div>
            </template>
            <template #cell(tglsep)="item">
              <div class="align-self-center">
                {{ item.item.tglsep ? formatTranslatedDate(item.item.tglsep) : '' }}</div>
            </template>
            <template #cell(actions)="item">
              <div class="align-self-center"></div>
              <div class="p-2">
                <b-button @click="hapusSepInternal(item)" variant="danger" size="sm" class=" ">Hapus</b-button>
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
  name: 'vclaim-sep-internal',
  data() {
    return {
      dateDefault: {
        start: moment(new Date).subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      params: {
        jumlah: 10,
        halaman: 1,
        noSep: '',
        tglAwal: null,
        tglAkhir: null,
      },
      list: {
        sep: [],
        filter: [
          { label: 'Tanggal Entri', code: '1' },
          { label: 'Tanggal Rencana SepInternal', code: '2' },
        ],
      },
      fields: [
        // "tujuanrujuk": "SAR",
        // "nmtujuanrujuk": "SARAF",
        // "nmpoliasal": "PENYAKIT DALAM",
        // "tglrujukinternal": "2020-11-19",
        // "nosep": "0905R0031020V000397",
        // "nosepref": "0905R0031120V004160",
        // "ppkpelsep": "0905R003",
        // "nokapst": "0000038761391",
        // "tglsep": "2020-10-02",
        // "nosurat": "0905R0031120N000922",
        // "flaginternal": "0",
        // "kdpoliasal": "0000038761391",
        // "kdpolituj": "SAR",
        // "kdpenunjang": "0",
        // "nmpenunjang": null,
        // "diagppk": "I15",
        // "kddokter": "24271",
        // "nmdokter": "dr. Nurhayana Lubis, Sp.S",
        // "flagprosedur": null,
        // "opsikonsul": "1",
        // "flagsep": "False",
        // "fuser": "0905R003_anhar",
        // "fdate": "2020-11-19",
        // "nmdiag": "Secondary hypertension"
        {
          key: "nosep",
          label: "No SEP",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nmpoliasal",
          label: "Poliklinik Asal",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nmtujuanrujuk",
          label: "Poliklinik Tujuan",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "tglrujukinternal",
          label: "Tanggal Rujuk Internal",
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
          key: "nmdiag",
          label: "Diagnosa",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nmdokter",
          label: "Dokter",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nokapst",
          label: "No Kartu",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nosepref",
          label: "No SEP Referensi",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nosurat",
          label: "No Surat SepInternal",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "fuser",
          label: "User",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "fdate",
          label: "Tanggal",
          sortDirection: "desc",
          class: "text-left align-middle",
        },
        {
          key: "nmdiag",
          label: "Diagnosa",
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
    getSEPInternal() {
      this.busy = true
      this.$_api.post('bpjs/vclaim/sep/getSEPinternal', {
        noSep: this.params.noSep,
      }).then((response) => {
        this.busy = false
        if (response.status == 200) {
          this.list.sep = response.data
          this.totalRows = response.count
          this.$_alert.success(response.message)
        } else {
          this.list.sep = []
          this.totalRows = 0
          this.$_alert.error(response, 'Gagal mengambil data', response.message)
        }
      }).catch((error) => {
        this.busy = false
        console.log(error);
      })
    },
    resetFilter() {
      this.params = {
        noSep: '',
      }
    },
    hapusSepInternal(item) {
      console.log(item, 'hapusSepInternal');
      this.$_alert.confirm('Hapus Data', `Data SEP internal dengan No SEP ${item.item.nosep} akan dihapus. Ingin melanjutkan?`).then((res) => {
        if (res.value) {
          // noSep, noSurat, tglRujukanInternal, kdPoliTuj, user, registrasi_id

          let authUser = JSON.parse(localStorage.getItem('profile'))
          if (authUser) {
            this.authUser = authUser
            this.user = authUser.username
          }

          this.$_api.post('sep/deleteInternal', {
            noSep: item.item.nosep,
            noSurat: item.item.nosurat,
            tglRujukanInternal: item.item.tglrujukinternal,
            kdPoliTuj: item.item.kdpolituj,
            registrasi_id: item.item.registrasi_id,
            user: this.user,
          }).then((res) => {
            if (res.status == 200) {
              this.getSEPInternal()
              this.$_alert.success(res.message)
            } else {
              this.$_alert.error(res, 'Gagal menghapus', res.message)
            }
          }).catch((error) => {
            console.log(error);
          })
        }
      })
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
    // this.getSEPInternal()
  },
  watch: {
    'params.jumlah': function (val) {
      this.getSEPInternal()
    },
    'params.halaman': function (val) {
      this.getSEPInternal()
    },
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
