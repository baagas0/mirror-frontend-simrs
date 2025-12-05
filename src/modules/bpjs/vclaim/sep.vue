<template>
  <div class="d-flex flex-column w-100 container-fluid">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong>Log SEP</strong></h3>
        </b-col>
      </b-row>

      <form @submit.prevent="getSepList" autocomplete="off" class="mb-4">
        <b-row>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.registrasi_id" :item="{
              label: 'Registrasi',
              id: 'registrasi_id',
              data: 'registrasi_id',
              type: 'lookup-radio',
              api: 'registrasi/listPerHalamanBypassUri',
              getter: 'registrasi',
              setter: 'registrasi',
              validation: [''],
              pointer: {
                label: 'nama_lengkap',
                code: 'registrasi_id',
                display: ['nama_lengkap', 'no_identitas_registrasi', 'tgl_registrasi', 'no_sep', 'no_asuransi_registrasi'],
                headerDisplay: ['Nama Pasien', 'NIK', 'Tanggal Registrasi', 'No SEP', 'No BPJS'],
                mainParam: 'nama'
              },
            }" />
          </b-col>
          <b-col cols="3">
            <s-input v-model="params.jenis_pelayanan" :item="{
              label: 'Jenis Pelayanan',
              id: 'jenis_pelayanan',
              data: 'jenis_pelayanan',
              type: 'select',
              validation: [],
              pointer: {
                label: 'label',
                code: 'code',
                display: ['label'],
              },
              optionList: list.jenis_pelayanan,
              placeholder: 'Pilih Jenis Pelayanan',
            }" />
          </b-col>
          <!-- <b-col cols="3">
          <s-input v-model="category.current" :item="{
            label: 'Kategori',
            id: 'category_current',
            data: 'category_current',
            type: 'select',
            validation: [],
            pointer: {
              label: 'label',
              code: 'code',
              display: ['label'],
            },
            optionList: list.category.current,
            placeholder: 'Pilih Kategori',
          }" />
        </b-col> -->
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.external_rm" :item="{
              label: 'Eksternal RM',
              id: 'external_rm',
              data: 'external_rm',
              type: 'text',
              validation: [],
            }" />
          </b-col>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.no_sep" :item="{
              label: 'No SEP',
              id: 'no_sep',
              data: 'no_sep',
              type: 'text',
              validation: [],
            }" />
          </b-col>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.keterangan_sep" :item="{
              label: 'Keterangan SEP',
              id: 'keterangan_sep',
              data: 'keterangan_sep',
              type: 'text',
              validation: [],
            }" />
          </b-col>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.tanggal_awal" :item="{
              label: 'Tanggal Awal',
              id: 'tanggal_awal',
              data: 'tanggal_awal',
              type: 'date',
              validation: [],
            }" :valuee="dateDefault.start" />
          </b-col>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.tanggal_akhir" :item="{
              label: 'Tanggal Akhir',
              id: 'tanggal_akhir',
              data: 'tanggal_akhir',
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
            <template #cell(jenis_pelayanan)="item">
              {{ item.item.request.jnsPelayanan == 1 ? 'Rawat Inap (1)' : 'Rawat Jalan (2)' }}
            </template>
            <template #cell(external_rm)="item">
              {{ item.item.request.noMR }}
            </template>
            <template #cell(user)="item">
              {{ item.item.request.user }}
            </template>
            <template #cell(tgl_sep)="item">
              {{ formatTranslatedDate(item.item.request.tglSep) }}
            </template>
            <template #cell(created_at)="item">
              {{ formatTranslatedDate(item.item.createdAt) }}
            </template>
            <template #cell(updated_at)="item">
              {{ formatTranslatedDate(item.item.updatedAt) }}
            </template>
            <template #cell(aksi)="item">
              <b-button size="sm" @click="selectDetails(item.item)" variant="primary">Detail</b-button>
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

    <b-modal id="modal-details" title="Detail SEP" size="lg" hide-footer>
      <pre class="m-0">{{ selected.details }}</pre>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'vclaim-referensi',
  data() {
    return {
      dateDefault: {
        start: moment(new Date).subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      params: {
        jumlah: 10,
        halaman: 1,
        keterangan_sep: null,
        no_sep: null,
        registrasi_id: null,
        tanggal_awal: null,
        tanggal_akhir: null,
      },
      list: {
        sep: [],
        jenis_pelayanan: [
          { label: 'Rawat Inap', code: '1' },
          { label: 'Rawat Jalan', code: '2' },
        ],
      },
      fields: [
        {
          key: "no_sep",
          label: "No SEP",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "jenis_pelayanan",
          label: "Jenis Pelayanan",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "external_rm",
          label: "Eksternal RM",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "keterangan_sep",
          label: "Keterangan SEP",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "user",
          label: "Pembuat",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "tgl_sep",
          label: "Tanggal SEP",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "created_at",
          label: "Dibuat Pada",
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "updated_at",
          label: "Diubah Pada",
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
      selected: {
        details: null,
      }
    }
  },
  methods: {
    formatTranslatedDate(paramDate) {
      return moment(paramDate).format('DD MMM YYYY HH:mm')
    },
    getSepList() {
      this.busy = true
      this.$_api.post('sep/list', {
        halaman: this.params.halaman,
        jumlah: this.params.jumlah,
        keterangan_sep: this.params.keterangan_sep,
        no_sep: this.params.no_sep,
        registrasi_id: this.params.registrasi_id,
        tanggal_awal: this.params.tanggal_awal,
        tanggal_akhir: this.params.tanggal_akhir,
      }).then((response) => {
        this.busy = false
        this.list.sep = response.data
        this.totalRows = response.count
      }).catch((error) => {
        this.busy = false
        console.log(error);
      })
    },
    resetFilter() {
      this.params = {
        jumlah: 10,
        halaman: 1,
        keterangan_sep: null,
        no_sep: null,
        registrasi_id: null,
        tanggal_awal: this.dateDefault.start,
        tanggal_akhir: this.dateDefault.end,
      }
    },
    selectDetails(item) {
      this.$bvModal.show('modal-details')
      this.selected.details = item
    }
  },
  mounted() {
    this.getSepList()
  },
  watch: {
    'params.jumlah': function (val) {
      this.getSepList()
    },
    'params.halaman': function (val) {
      this.getSepList()
    },
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
