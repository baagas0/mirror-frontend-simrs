<template>
  <div>
    <b-row class="mb-2">
      <b-col cols="12">
        <h3><strong>Daftar Kunjungan</strong></h3>
      </b-col>
    </b-row>
    <form @submit.prevent="getDaftarKunjungan" autocomplete="off">
      <b-row>
        <b-col cols="3">
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
        </b-col>
        <b-col cols="3">
          <s-input groupClass="mb-0" v-model="category.keyword" :item="{
            label: 'Kata Kunci',
            id: 'keyword',
            data: 'keyword',
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
        <b-col cols="3">
          <s-input groupClass="mb-0" v-model="params.ms_dokter_id" :item="{
            label: 'Dokter',
            id: 'ms_poliklinik_id',
            data: 'ms_poliklinik_id',
            type: 'lookup-radio',
            api: 'msDokter',
            getter: 'msDokter',
            setter: 'msDokter',
            validation: [''],
            pointer: {
              label: 'nama_dokter',
              code: 'ms_dokter_id',
              display: ['nama_dokter', 'nama_specialist'],
              headerDisplay: ['Nama', 'Spesialis'],
              mainParam: 'nama_dokter'
            },
          }" />
        </b-col>
        <b-col cols="3">
          <s-input v-model="params.status_registrasi" :item="{
            label: 'Status Registrasi',
            id: 'params_current',
            data: 'params_current',
            type: 'select',
            validation: [],
            pointer: {
              label: 'label',
              code: 'code',
              display: ['label'],
            },
            optionList: [
              { label: 'Batal', code: '0' },
              { label: 'Baru', code: '1' },
              { label: 'Proses', code: '2' },
              { label: 'Selesai', code: '9' },
            ],
            placeholder: 'Pilih Kategori',
          }" />
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
        <!-- RAJAL ----------------------------------------------------------- -->
        <b-table v-if="jenisKunjungan == kunjungans.rajal" :items="list.rajal" :fields="fields" responsive show-empty
          small bordered striped hover :busy="busy" style="white-space:nowrap;" class="">
          <template #cell(tgl_registrasi)="item">
            {{ formatTranslatedDate(item.item.tgl_registrasi) }}
          </template>
          <template #cell(status_registrasi)="item">
            <span class="label label-lg font-weight-bolder label-inline label-danger" v-if="item.item.status_registrasi == 0">Batal Kunjungan</span>
            <span class="label label-lg font-weight-bolder label-inline label-primary" v-else-if="item.item.status_registrasi == 1">Baru Dibuat</span>
            <span class="label label-lg font-weight-bolder label-inline label-warning" v-else-if="item.item.status_registrasi == 2">Proses</span>
            <span class="label label-lg font-weight-bolder label-inline label-success" v-else-if="item.item.status_registrasi == 9">Selesai</span>
          </template>
          <template #cell(actions)="item">
            <b-button @click="openRiwayatRegistrasiModal(item.item)" variant="info" size="sm">Riwayat Registrasi</b-button>
            <b-button @click="openRegistrasiModal(item.item)" variant="warning" size="sm" >File Tambahan</b-button>
            <b-button @click="selectKunjungan(item)" variant="success" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9">Perbarui</b-button>
            <b-button @click="openConvertToRanapModal(item.item)" variant="primary" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9">Rawat Inap</b-button>
            <!-- <b-button @click="hapusKunjungan(item)" variant="danger" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9" class=" ">Hapus</b-button> -->
          </template>
        </b-table>
        <!-- RANAP ----------------------------------------------------------- -->
        <b-table v-if="jenisKunjungan == kunjungans.ranap" :items="list.ranap" :fields="fields" responsive show-empty
          small bordered striped hover :busy="busy" style="white-space:nowrap;" class="">
          <template #cell(tgl_registrasi)="item">
            {{ formatTranslatedDate(item.item.tgl_registrasi) }}
          </template>
          <template #cell(status_registrasi)="item">
            <span class="label label-lg font-weight-bolder label-inline label-danger" v-if="item.item.status_registrasi == 0">Batal Kunjungan</span>
            <span class="label label-lg font-weight-bolder label-inline label-primary" v-else-if="item.item.status_registrasi == 1">Baru Dibuat</span>
            <span class="label label-lg font-weight-bolder label-inline label-warning" v-else-if="item.item.status_registrasi == 2">Proses</span>
            <span class="label label-lg font-weight-bolder label-inline label-success" v-else-if="item.item.status_registrasi == 9">Selesai</span>
          </template>
          <template #cell(actions)="item">
            <b-button @click="openRiwayatRegistrasiModal(item.item)" variant="info" size="sm">Riwayat Registrasi</b-button>
            <b-button @click="openRegistrasiModal(item.item)" variant="warning" size="sm" >File Tambahan</b-button>
            <b-button @click="selectKunjungan(item)" variant="success" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9">Perbarui</b-button>
            <!-- <b-button @click="hapusKunjungan(item)" variant="danger" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9" class=" ">Hapus</b-button> -->
          </template>
        </b-table>
        <!-- IGD ----------------------------------------------------------- -->
        <b-table v-if="jenisKunjungan == kunjungans.igd" :items="list.igd" :fields="fields" responsive show-empty small
          bordered striped hover :busy="busy" style="white-space:nowrap;" class="">
          <template #cell(tgl_registrasi)="item">
            {{ formatTranslatedDate(item.item.tgl_registrasi) }}
          </template>
          <template #cell(status_registrasi)="item">
            <span class="label label-lg font-weight-bolder label-inline label-danger" v-if="item.item.status_registrasi == 0">Batal Kunjungan</span>
            <span class="label label-lg font-weight-bolder label-inline label-primary" v-else-if="item.item.status_registrasi == 1">Baru Dibuat</span>
            <span class="label label-lg font-weight-bolder label-inline label-warning" v-else-if="item.item.status_registrasi == 2">Proses</span>
            <span class="label label-lg font-weight-bolder label-inline label-success" v-else-if="item.item.status_registrasi == 9">Selesai</span>
          </template>
          <template #cell(actions)="item">
            <b-button @click="openRiwayatRegistrasiModal(item.item)" variant="info" size="sm">Riwayat Registrasi</b-button>
            <b-button @click="openRegistrasiModal(item.item)" variant="warning" size="sm" >File Tambahan</b-button>
            <b-button @click="selectKunjungan(item)" variant="success" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9">Perbarui</b-button>
            <b-button @click="openConvertToRanapModal(item.item)" variant="primary" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9">Rawat Inap</b-button>
            <!-- <b-button @click="hapusKunjungan(item)" variant="danger" size="sm" :disabled="item.item.tgl_pulang !== null || item.item.status_registrasi == 0 || item.item.status_registrasi == 9" class=" ">Hapus</b-button> -->
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-row class="d-flex justify-content-between">
      <b-col cols="2">
        <b-form-select id="per-page-select" v-model="params.jumlah" :options="[10, 25, 50, 100]" size="sm" />
      </b-col>
      <b-col cols="5">
        <b-pagination class="m-0 p-0" v-model="params.halaman" :total-rows="totalRows" :per-page="params.jumlah" align="fill" size="sm"></b-pagination>
      </b-col>
    </b-row>

    <b-modal id="modal-registrasi-upload" title="File Tambahan Registrasi Upload" hide-footer size="xl" body-class="p-0"  >
      <tas-base-crud ref="CRUD-registrasi-upload" :config="config_registrasi_upload" :classes="'w-100'" hide-detail>
        <template v-slot:list-nama_file="rowData">
          <a :href="rowData.rowData.url" target="__blank" class="btn btn-sm btn-warning">Lihat File</a>
          <!-- <button class="btn btn-sm btn-warning" v-b-modal.modal-registrasi-upload-view @click="url_file=rowData.rowData.url">Lihat File</button> -->
        </template>
      </tas-base-crud>
    </b-modal>
    <b-modal id="modal-riwayat-registrasi" title="Riwayat Registrasi" hide-footer size="xl" body-class="p-0"  >
      <tas-base-crud ref="CRUD-riwayat-registrasi" :config="config_riwayat_registrasi" :classes="'w-100'" hide-detail>
      </tas-base-crud>
    </b-modal>
    <b-modal id="modal-registrasi-upload-view" title="File" hide-footer size="sm" body-class="p-0" style="display: flex;justify-content: center;height: 100%;">
      <img :src="url_file" class="img img-thumbnail" alt="">
    </b-modal>

    <b-modal id="modal-convert-to-ranap" title="Konversi Rawat Jalan ke Rawat Inap" hide-footer size="lg" body-class="p-0">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(convertToRanap)" autocomplete="off">
          <div class="p-4">
            <b-row>
              <b-col cols="12">
                <div class="alert alert-info">
                  <strong>Kunjungan Terpilih:</strong> {{ selectedRajal ? selectedRajal.no_kunjungan : '' }} - {{ selectedRajal ? selectedRajal.nama_lengkap : '' }}
                </div>
              </b-col>
            </b-row>
            <b-row style="row-gap: 15px;">
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.ms_kelas_kamar_id" :item="{
                  label: 'Kelas Kamar',
                  id: 'ms_kelas_kamar_id',
                  data: 'ms_kelas_kamar_id',
                  type: 'lookup-radio',
                  api: 'msKelasKamar',
                  getter: 'msKelasKamar',
                  setter: 'msKelasKamar',
                  validation: ['required'],
                  pointer: {
                    label: 'nama_kelas_kamar',
                    code: 'id',
                    display: ['nama_kelas_kamar', 'keterangan_kelas_kamar'],
                    headerDisplay: ['Nama Kelas', 'Keterangan'],
                    mainParam: 'nama_kelas_kamar'
                  },
                }" @input="onSelectedKelasKamar" />
              </b-col>
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.ms_bed_id" :item="{
                  label: 'Bed',
                  id: 'ms_bed_id',
                  data: 'ms_bed_id',
                  type: 'lookup-radio',
                  api: 'msbed/detailsByKelasIdBypassUri',
                  getter: 'msbed/detailsByKelasIdBypassUri',
                  setter: 'msbed/detailsByKelasIdBypassUri',
                  validation: ['required'],
                  no_data_message: 'Data tidak tersedia / Bed sedang penuh',
                  pointer: {
                    label: 'nama_bed',
                    code: 'ms_bed_id',
                    display: ['nama_kamar', 'nama_bed'],
                    headerDisplay: ['Nama Kamar', 'Nama Bed'],
                    mainParam: 'nama_bed',
                  },
                  param: {
                    ms_kelas_kamar_id: convertForm.ms_kelas_kamar_id,
                    ms_jenis_layanan_id: convertForm.ms_jenis_layanan_id,
                    isAvailable: true
                  }
                }" />
              </b-col>
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.tanggal_mulai" :item="{
                  label: 'Tanggal Mulai',
                  id: 'tanggal_mulai',
                  data: 'tanggal_mulai',
                  type: 'datetime',
                  validation: ['required'],
                  formatDateView: 'DD MMM YYYY HH:mm',
                }" :valuee="formatTranslatedDate(new Date, 'YYYY-MM-DD HH:mm:ss')" />
              </b-col>
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.kelas_kunjungan_id" :item="{
                  label: 'Kelas Kunjungan',
                  id: 'kelas_kunjungan_id',
                  data: 'kelas_kunjungan_id',
                  type: 'lookup-radio',
                  api: 'kelasKunjungan',
                  getter: 'kelasKunjungan',
                  setter: 'kelasKunjungan',
                  validation: ['required'],
                  pointer: {
                    label: 'nama_kelas_kunjungan',
                    code: 'kelas_kunjungan_id',
                    display: ['nama_kelas_kunjungan'],
                    mainParam: 'nama_kelas_kunjungan'
                  },
                }" />
              </b-col>
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.ms_jenis_layanan_id" :item="{
                  label: 'Jenis Layanan',
                  id: 'ms_jenis_layanan_id',
                  data: 'ms_jenis_layanan_id',
                  type: 'lookup-radio',
                  api: 'msJenisLayanan',
                  getter: 'msJenisLayanan',
                  setter: 'msJenisLayanan',
                  validation: ['required'],
                  pointer: {
                    label: 'nama_jenis_layanan',
                    code: 'id',
                    display: ['nama_jenis_layanan'],
                    mainParam: 'nama_jenis_layanan'
                  },
                }" />
              </b-col>
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.ms_spesialis_id" :item="{
                  label: 'Spesialis',
                  id: 'id',
                  data: 'ms_spesialis_id',
                  type: 'lookup-radio',
                  api: 'msSpecialist',
                  getter: 'msSpecialist',
                  setter: 'msSpecialist',
                  validation: ['required'],
                  pointer: {
                    label: 'nama_specialist',
                    code: 'id',
                    display: ['nama_specialist'],
                    mainParam: 'nama_specialist'
                  },
                }" />
              </b-col>
              <b-col cols="6">
                <s-input groupClass="mb-0" v-model="convertForm.ms_dokter_id" :item="{
                  label: 'Dokter',
                  id: 'ms_dokter_id',
                  data: 'ms_dokter_id',
                  type: 'lookup-radio',
                  api: 'msDokter',
                  getter: 'msDokter',
                  setter: 'msDokter',
                  validation: ['required'],
                  pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter', 'nama_specialist'],
                    headerDisplay: ['Nama', 'Spesialis'],
                    mainParam: 'nama_dokter'
                  },
                }" />
              </b-col>
              <b-col cols="12">
                <s-input groupClass="mb-0" v-model="convertForm.catatan_pindah" :item="{
                  label: 'Catatan Pindah',
                  id: 'catatan_pindah',
                  data: 'catatan_pindah',
                  type: 'textarea',
                  placeholder: 'Isikan catatan pemindahan dari rawat jalan ke rawat inap',
                  validation: [],
                  rows: 3
                }" />
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="12" class="d-flex justify-content-end">
                <b-button variant="secondary" @click="$bvModal.hide('modal-convert-to-ranap')" class="mr-2">Batal</b-button>
                <b-button variant="primary" type="submit" :disabled="isConverting">
                  <span v-if="isConverting">
                    <b-spinner small></b-spinner> Memproses...
                  </span>
                  <span v-else>
                    <i class="ri-hospital-line"></i> Konversi ke Rawat Inap
                  </span>
                </b-button>
              </b-col>
            </b-row>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>

  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: "daftarKunjunganRegistrasi",
  props: {
    jenisKunjungan: {
      type: String,
      default: 'Rajal',
      required: true,
    },
    isCreatedOrUpdated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      kunjungans: {
        rajal: 'Rajal',
        ranap: 'Ranap',
        igd: 'IGD',
      },
      dateDefault: {
        start: moment(new Date).subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      params: {
        halaman: 1,
        jumlah: 10,
        no_rm: null,
        no_kunjungan: null,
        nama: null,
        no_asuransi: null,
        ms_asuransi_id: null,
        dibuat_oleh: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        ms_dokter_id: null,
        status_registrasi: null,
        status_antrian: null,
        ms_poliklinik_id: null,
      },
      category: {
        current: '',
        keyword: '',
        rajal: {
          no_rm: 'no_rm',
          no_kunjungan: 'no_kunjungan',
          nama: 'nama',
          no_asuransi: 'no_asuransi',
        },
        ranap: {
          no_rm: 'no_rm',
          no_kunjungan: 'no_kunjungan',
          nama: 'nama',
          tagihan_id: 'tagihan_id',
          no_asuransi: 'no_asuransi',
        },
        igd: {
          no_rm: 'no_rm',
          no_kunjungan: 'no_kunjungan',
          nama: 'nama',
          tagihan_id: 'tagihan_id',
          no_asuransi: 'no_asuransi',
        },
      },
      filters: {
      },
      list: {
        rajal: [],
        ranap: [],
        igd: [],
        category: {
          current: [],
          rajal: [
            { label: 'No. RM', code: 'no_rm' },
            { label: 'No. Kunjungan', code: 'no_kunjungan' },
            { label: 'Nama Pasien', code: 'nama' },
            { label: 'No. Asuransi', code: 'no_asuransi' },
          ],
          ranap: [
            { label: 'No. RM', code: 'no_rm' },
            { label: 'No. Kunjungan', code: 'no_kunjungan' },
            { label: 'Nama Pasien', code: 'nama' },
            { label: 'No. Asuransi', code: 'no_asuransi' },
            { label: 'ID Tagihan', code: 'tagihan_id' },
          ],
          igd: [
            { label: 'No. RM', code: 'no_rm' },
            { label: 'No. Kunjungan', code: 'no_kunjungan' },
            { label: 'Nama Pasien', code: 'nama' },
            { label: 'ID Tagihan', code: 'tagihan_id' },
            { label: 'No. Asuransi', code: 'no_asuransi' },
          ],
        }
      },
      busy: false,
      fields: [
        {
          key: "tgl_registrasi",
          label: "Tanggal Registrasi",
          sortDirection: "desc",
          class: "align-middle table-number text-center",
        },
        {
          key: "no_kunjungan",
          label: "No. Kunjungan",
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
          key: "nama_lengkap",
          label: "Nama Pasien",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "no_hp_registrasi",
          label: "No. HP",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "no_rujukan",
          label: "No. Rujukan",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "status_registrasi",
          label: "Status",
          sortDirection: "desc",
          class: "align-middle text-left",
        },
        {
          key: "actions",
          label: "Aksi",
          class: "align-middle table-option-2 text-center",
        },
      ],
      totalRows: 1,
      pageOptions: [1, 10, 25, 50, 100],
      url_file: '',
      selectedRajal: null,
      isConverting: false,
      convertForm: {
        registrasi_id: '',
        ms_bed_id: '',
        tanggal_mulai: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        kelas_kunjungan_id: '',
        ms_jenis_layanan_id: 'accb7057-7ab7-4bd2-b4b9-b63753d6d151', // Default Rawat Inap
        ms_spesialis_id: '',
        ms_dokter_id: '',
        catatan_pindah: ''
      },
      config_registrasi_upload: {
        title: ' ',
        model_api: 'registrasi_upload',
        getter: 'registrasi_upload',
        setter: 'registrasi_upload',
        pk_field: null,
        frontendPaginate: true,
        filter_api: { registrasi_id: '99999999' },
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // id
          {
            id: 'id',
            data: 'id',
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // registrasi_id
          {
            id: 'registrasi_id',
            data: 'registrasi_id',
            label: 'Registrasi ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: { type: 'hidden', value: '99999999' },
              update: { type: 'hidden', value: '' },
              filter: true
            }
          },
          // judul
          {
            id: 'judul',
            data: 'judul',
            label: 'Judul',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { validation: ['required'] },
              update: { validation: ['required'] },
              filter: true
            }
          },
          // judul
          {
            id: 'judul',
            data: 'judul',
            label: 'Judul',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: true
            }
          },
          // nama_file
          {
            id: 'nama_file',
            data: 'nama_file',
            label: 'Nama File',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: true,
              create: {
                validation: ['required'],
                type: 'file',
                attr: [{ accept: 'image/*' }, { limit: 5, max: 1 }],
              },
              update: {
                type: 'file'
              },
              filter: true
            }
          },
          // keterangan
          {
            id: 'keterangan',
            data: 'keterangan',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'textarea'
              },
              update: {
                type: 'textarea'
              },
              filter: true
            }
          }
        ]
      },
      config_riwayat_registrasi: {
        title: ' ',
        model_api: 'registrasi/riwayatRegistrasiPasien',
        getter: 'registrasi/riwayatRegistrasiPasien',
        setter: 'registrasi/riwayatRegistrasiPasien',
        pk_field: null,
        frontendPaginate: true,
        filter_api: { no_rm: '' },
        permission: {
          create: false,
          read: 'template-allow-all',
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // id
          {
            id: 'id',
            data: 'id',
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // registrasi_id
          {
            id: 'registrasi_id',
            data: 'registrasi_id',
            label: 'Registrasi ID',
            placeholder: null,
            methods: {
              list: false
            }
          },
          {
            id: 'no_kunjungan',
            data: 'no_kunjungan',
            label: 'No Kunjungan',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'tgl_registrasi',
            data: 'tgl_registrasi',
            label: 'Tanggal Registrasi',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_jenis_layanan',
            data: 'nama_jenis_layanan',
            label: 'Nama Jenis Layanan',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_dokter',
            data: 'nama_dokter',
            label: 'Nama Dokter',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_asuransi',
            data: 'nama_asuransi',
            label: 'Nama Asuransi',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'status_registrasi',
            data: 'status_registrasi',
            label: 'Status Registrasi',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'status_checkout',
            data: 'status_checkout',
            label: 'Status Checkout',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_poliklinik',
            data: 'nama_poliklinik',
            label: 'Nama Poliklinik',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_ruang',
            data: 'nama_ruang',
            label: 'Nama Ruang',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'no_rm',
            data: 'no_rm',
            label: 'No RM',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_lengkap',
            data: 'nama_lengkap',
            label: 'Nama Lengkap',
            placeholder: null,
            methods: {
              list: true
            }
          },
        ]
      }
    }
  },
  mounted() {
    this.getDaftarKunjungan()
    // this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
    //   console.log('Modal is about to be shown', bvEvent, modalId)
    //   if (modalId === 'modal-registrasi-upload') this.config_registrasi_upload.filter_api = { evaluasi_id: to }
    // })
  },
  methods: {
    openRegistrasiModal(item) {
      // console.log(registrasi_id)
      this.config_registrasi_upload.filter_api = { registrasi_id: item.registrasi_id }
      this.config_registrasi_upload.fields[1].methods.create.value = item.registrasi_id
      this.$bvModal.show('modal-registrasi-upload')
    },
    openRiwayatRegistrasiModal(item) {
      this.config_riwayat_registrasi.filter_api = { no_rm: item.no_rm }
      this.$bvModal.show('modal-riwayat-registrasi')
      this.$refs['CRUD-riwayat-registrasi'].getList()
    },
    checkFilter() {
      console.log('checkFilter');
    },
    resetFilter() {
      this.params = {
        halaman: 1,
        jumlah: 10,
        no_rm: null,
        no_kunjungan: null,
        nama: null,
        no_asuransi: null,
        ms_asuransi_id: null,
        dibuat_oleh: null,
        tanggal_awal: this.dateDefault.start,
        tanggal_akhir: this.dateDefault.end,
        ms_dokter_id: null,
        status_registrasi: null,
        status_antrian: null,
        ms_poliklinik_id: null,
      }
    },
    getDaftarKunjungan() {
      this.busy = true

      if (this.jenisKunjungan == this.kunjungans.rajal) {
        this.$_api.post('registrasi/listKunjunganRajalPerHalaman', {
          halaman: this.params.halaman,
          jumlah: this.params.jumlah,
          no_rm: this.params.no_rm,
          no_kunjungan: this.params.no_kunjungan,
          nama: this.params.nama,
          no_asuransi: this.params.no_asuransi,
          ms_asuransi_id: this.params.ms_asuransi_id,
          dibuat_oleh: this.params.dibuat_oleh,
          tanggal_awal: moment(this.params.tanggal_awal).format('YYYY-MM-DD'),
          tanggal_akhir: moment(this.params.tanggal_akhir).format('YYYY-MM-DD'),
          ms_dokter_id: this.params.ms_dokter_id,
          status_registrasi: this.params.status_registrasi,
          status_antrian: this.params.status_antrian,
          ms_poliklinik_id: this.params.ms_poliklinik_id,
        })
          .then(res => {
            this.list.rajal = res.data
            this.totalRows = res.count
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.busy = false
          })
      } else if (this.jenisKunjungan == this.kunjungans.ranap) {
        this.$_api.post('registrasi/listKunjunganInapPerHalaman', {
          halaman: this.params.halaman,
          jumlah: this.params.jumlah,
          no_rm: this.params.no_rm,
          no_kunjungan: this.params.no_kunjungan,
          nama: this.params.nama,
          no_asuransi: this.params.no_asuransi,
          ms_asuransi_id: this.params.ms_asuransi_id,
          dibuat_oleh: this.params.dibuat_oleh,
          tanggal_awal: moment(this.params.tanggal_awal).format('YYYY-MM-DD'),
          tanggal_akhir: moment(this.params.tanggal_akhir).format('YYYY-MM-DD'),
          dokter_id: this.params.ms_dokter_id,
          status_registrasi: this.params.status_registrasi,
          status_antrian: this.params.status_antrian,
          ms_poliklinik_id: this.params.ms_poliklinik_id,
        })
          .then(res => {
            this.list.ranap = res.data
            this.totalRows = res.count
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.busy = false
          })
      } else if (this.jenisKunjungan == this.kunjungans.igd) {
        this.$_api.post('registrasi/listKunjunganIGDPerHalaman', {
          halaman: this.params.halaman,
          jumlah: this.params.jumlah,
          no_rm: this.params.no_rm,
          nama: this.params.nama,
          no_asuransi: this.params.no_asuransi,
          ms_asuransi_id: this.params.ms_asuransi_id,
          dibuat_oleh: this.params.dibuat_oleh,
          tanggal_awal: moment(this.params.tanggal_awal).format('YYYY-MM-DD'),
          tanggal_akhir: moment(this.params.tanggal_akhir).format('YYYY-MM-DD'),
          dokter_id: this.params.ms_dokter_id,
          status_registrasi: this.params.status_registrasi,
        })
          .then(res => {
            this.list.igd = res.data
            this.totalRows = res.count
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.busy = false
          })
      }
    },
    selectKunjungan(item) {
      this.$emit('selectKunjungan', item)
    },
    hapusKunjungan(item) {
      console.log(item, 'hapusKunjungan');
      this.$_alert.confirm('Hapus Data', `Data kunjungan akan dihapus. Ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed) {
          this.$_api.post('registrasi/delete', {
            id: item.item.registrasi_id,
          }).then((res) => {
            if (res.status == 200) {
              this.$_alert.success(res.message)
              this.getDaftarKunjungan()
            } else {
              this.$_alert.error(res, 'Gagal menghapus data kunjungan', res.message)
            }
          }).catch((error) => {
            console.log(error);
            this.$_alert.error(error, 'Gagal menghapus data kunjungan', error.message)
          })
        }
      })
    },
    formatTranslatedDate(paramDate, format = 'DD MMM YYYY HH:mm') {
      return moment(paramDate).format(format)
    },
    openConvertToRanapModal(item) {
      console.log('===> daftarKunjunganRegistrasi.vue:941 ~ item', item);
      this.selectedRajal = item
      this.convertForm.registrasi_id = item.registrasi_id
      this.resetConvertForm()
      this.$bvModal.show('modal-convert-to-ranap')
    },
    resetConvertForm() {
      this.convertForm = {
        registrasi_id: this.selectedRajal ? this.selectedRajal.registrasi_id : '',
        ms_bed_id: '',
        tanggal_mulai: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        kelas_kunjungan_id: '',
        ms_jenis_layanan_id: 'accb7057-7ab7-4bd2-b4b9-b63753d6d151', // Default Rawat Inap
        ms_spesialis_id: this.selectedRajal ? this.selectedRajal.ms_spesialis_id : '',
        ms_dokter_id: this.selectedRajal ? this.selectedRajal.ms_dokter_id : '',
        catatan_pindah: ''
      }
    },
    onSelectedKelasKamar(data) {
      // Reset bed selection when kelas kamar changes
      this.convertForm.ms_bed_id = ''
    },
    async convertToRanap() {
      if (this.isConverting) return

      this.isConverting = true

      try {
        const payload = {
          registrasi_id: this.convertForm.registrasi_id,
          ms_bed_id: this.convertForm.ms_bed_id,
          tanggal_mulai: this.convertForm.tanggal_mulai,
          kelas_kunjungan_id: this.convertForm.kelas_kunjungan_id,
          ms_jenis_layanan_id: this.convertForm.ms_jenis_layanan_id,
          ms_spesialis_id: this.convertForm.ms_spesialis_id,
          ms_dokter_id: this.convertForm.ms_dokter_id,
          catatan_pindah: this.convertForm.catatan_pindah
        }

        const response = await this.$_api.post('registrasi/convertRajalToRanap', payload)

        if (response.status === 200) {
          this.$_alert.success('Konversi ke Rawat Inap berhasil', response.message)
          this.$bvModal.hide('modal-convert-to-ranap')
          this.getDaftarKunjungan() // Refresh the table
        } else {
          this.$_alert.error(response, 'Konversi Gagal', response.message)
        }
      } catch (error) {
        console.error('Convert to Ranap Error:', error)
        this.$_alert.error(error, 'Konversi Gagal', error.message || 'Terjadi kesalahan saat mengkonversi ke rawat inap')
      } finally {
        this.isConverting = false
      }
    },
  },
  watch: {
    category: {
      handler(val, oldVal) {
        if (val.current) {
          this.params[val.current] = this.category.keyword

          let categories = []
          if (this.jenisKunjungan == this.kunjungans.rajal) {
            categories = [this.category.rajal.no_rm, this.category.rajal.no_kunjungan, this.category.rajal.nama, this.category.rajal.no_asuransi]
          } else if (this.jenisKunjungan == this.kunjungans.ranap) {
            categories = [this.category.ranap.no_rm, this.category.ranap.no_kunjungan, this.category.ranap.nama, this.category.ranap.no_asuransi, this.category.ranap.tagihan_id]
          } else if (this.jenisKunjungan == this.kunjungans.igd) {
            categories = [this.category.igd.no_rm, this.category.igd.no_kunjungan, this.category.igd.nama, this.category.igd.no_asuransi]
          }

          for (const key in this.params) {
            if (key != val.current && categories.includes(key)) {
              this.params[key] = null
            }
          }
        }
      },
      deep: true,
    },
    'params.halaman'(newVar, oldVar) {
      if (newVar != oldVar) {
        this.getDaftarKunjungan()
      }
    },
    'params.jumlah'(newVar, oldVar) {
      this.params.halaman = 1
      if (newVar != oldVar) {
        this.getDaftarKunjungan()
      }
    },
    jenisKunjungan: {
      deep: true,
      immediate: true,
      handler(val, oldVal) {
        if (val == this.kunjungans.rajal) {
          this.list.category.current = []
          this.list.category.current = this.list.category.rajal
        } else if (val == this.kunjungans.ranap) {
          this.list.category.current = []
          this.list.category.current = this.list.category.ranap
        }
      },
    },
    'isCreatedOrUpdated': {
      handler: function (val, oldVal) {
        if (val) {
          this.getDaftarKunjungan()
          this.$emit('isCreatedOrUpdated', false)
        }
      },
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}

#modal-registrasi-upload-view {
  display: flex;
  justify-content: center;
  height: 100%;
}
</style>
