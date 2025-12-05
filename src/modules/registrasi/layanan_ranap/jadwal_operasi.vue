<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-ranap @selected="selectRegistrasi" />
      </div>
      <div class="col-xl-9 col-md-9 col-sm-12">
        <div
          class="card card-custom mb-5 card-sticky"
          v-if="dataRegistrasi && registrasi_id"
        >
          <div class="card-body ribbon ribbon-right">
            <div
              class="d-flex flex-row justify-content-between align-items-center"
            >
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">
                  {{ dataRegistrasi.nama_lengkap || "-" }}
                </h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">
                  RM {{ dataRegistrasi.no_rm || "-" }} /
                  {{ dataRegistrasi.tgl_registrasi | parse("date") }}
                </p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">
                  {{ dataRegistrasi.jenis_kelamin | parse("kelamin") }} /
                  {{ dataRegistrasi.tgl_lahir | parse("old") }}th
                </p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">
                  {{ dataRegistrasi.nama_dokter }}
                </p>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ123</h6>
                <h5 class="font-weight-bolder text-dark">
                  {{ dataRegistrasi.no_kunjungan }}
                </h5>
              </div>
            </div>
            <!-- <div>
              <pre>{{ dataRegistrasi }}</pre>
            </div> -->
          </div>
        </div>

        <template v-if="dataRegistrasi && registrasi_id">
          <!-- <Bmhp :dataRegistrasi="dataRegistrasi" /> -->
          <div>
            <div class="card card-custom mb-5" v-if="loading">
              <div class="card-body d-flex justify-content-center">
                <div class="spinner spinner-track spinner-primary"></div>
              </div>
            </div>

            <div
              class="animated"
              v-else-if="
                activeView == 'create' ||
                activeView == 'update' ||
                activeView == 'list'
              "
            >
              <!-- <pre>{{ fields }}</pre> -->
              <div class="card card-custom mb-5">
                <div class="card-header border-0 pt-5">
                  <h3
                    class="card-title align-items-start flex-column justify-content-center"
                  >
                    <span class="card-label font-weight-bolder text-dark"
                      >Formulir Input Jadwal Operasi</span
                    >
                  </h3>
                </div>
                <div class="card-body py-2 mt-3">
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <!-- <pre>{{ fields }}</pre> -->
                    <form
                      @submit.prevent="handleSubmit(onSubmit)"
                      autocomplete="off"
                    >
                      <div class="row">
                        <div class="col-12">
                          <div
                            class="alert alert-custom alert-light-warning fade show mb-5"
                            role="alert"
                            v-if="activeView == 'update'"
                          >
                            <div class="alert-icon">
                              <i class="ri-error-warning-line"></i>
                            </div>
                            <div class="alert-text">
                              Anda hanya dapat mengubah daftar barang.
                            </div>
                          </div>
                        </div>
                        <div class="col-4">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.tanggal_operasi"
                            :item="{
                              label: 'Tanggal Operasi',
                              id: 'tanggal_operasi',
                              data: 'tanggal_operasi',
                              type: 'date',
                              validation: ['required'],
                              formatDateView: 'DD MMM YYYY',
                            }"
                            :valuee="dateToday"
                            :disabled="activeView == 'update'"
                          />
                        </div>
                        <div class="col-4">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.waktu_mulai"
                            :item="{
                              label: 'Waktu Mulai',
                              id: 'waktu_mulai',
                              data: 'waktu_mulai',
                              type: 'time',
                              validation: ['required'],
                              formatDateView: 'HH:mm',
                            }"
                            :valuee="timeToday"
                            :disabled="activeView == 'update'"
                          />
                        </div>
                        <div class="col-4">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.waktu_selesai"
                            :item="{
                              label: 'Waktu Selesai',
                              id: 'waktu_selesai',
                              data: 'waktu_selesai',
                              type: 'time',
                              validation: ['required'],
                              formatDateView: 'HH:mm',
                            }"
                            :valuee="timeToday"
                            :disabled="activeView == 'update'"
                          />
                        </div>

                        <div class="col-6">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.ms_poliklinik_id"
                            :item="{
                              label: 'Poliklinik',
                              id: 'ms_poliklinik_id',
                              data: 'ms_poliklinik_id',
                              type: 'lookup-radio',
                              validation: ['required'],
                              api: 'msPoliklinik',

                              pointer: {
                                label: 'nama_poliklinik',
                                code: 'id',
                                display: ['nama_poliklinik', 'kode_poliklinik'],
                                headerDisplay: ['Poliklinik', 'Kode'],
                              },
                              param: {},
                            }"
                            :valuee="fields.ms_poliklinik_id"
                            :disabled="activeView == 'update'"
                          />
                        </div>
                        <div class="col-6">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.ms_dokter_id"
                            :item="{
                              label: 'Dokter',
                              id: 'ms_dokter_id',
                              data: 'ms_dokter_id',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fields.ms_dokter_id,
                              api: 'msDokter',

                              pointer: {
                                label: 'nama_dokter',
                                code: 'ms_dokter_id',
                                display: ['nama_dokter'],
                                headerDisplay: ['Dokter'],
                              },
                              param: {},
                            }"
                            :valuee="fields.ms_dokter_id"
                            :disabled="activeView == 'update'"
                          />
                        </div>
                        <div class="col-6">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.ms_jasa_id"
                            :item="{
                              label: 'Jasa',
                              id: 'ms_jasa_id',
                              data: 'ms_jasa_id',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fields.ms_jasa_id,
                              api: 'msJasa',

                              pointer: {
                                label: 'nama_jasa',
                                code: 'id',
                                display: ['nama_jasa'],
                                headerDisplay: ['Jasa'],
                              },
                              param: {},
                            }"
                            :valuee="fields.ms_jasa_id"
                            :disabled="activeView == 'update'"
                          />
                        </div>

                        <div class="col-6">
                          <s-input
                            v-model="fields.ms_kelas_kamar_id"
                            :item="{
                              label: 'Kelas Kamar',
                              id: 'ms_kelas_kamar_id',
                              data: 'ms_kelas_kamar_id',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fields.ms_kelas_kamar_id,
                              api: 'msKelasKamar',

                              pointer: {
                                label: 'nama_kelas_kamar',
                                code: 'id',
                                display: ['nama_kelas_kamar'],
                                headerDisplay: ['Kelas Kamar'],
                              },
                              param: {},
                            }"
                            :valuee="fields.ms_kelas_kamar_id"
                            :disabled="activeView == 'update'"
                          />
                        </div>
                        <div class="col-6">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.ms_ruang_id"
                            :item="{
                              label: 'Ruang',
                              id: 'ms_ruang_id',
                              data: 'ms_ruang_id',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fields.ms_ruang_id,
                              api: 'msRuang',

                              pointer: {
                                label: 'nama_ruang',
                                code: 'id',
                                display: ['nama_ruang'],
                                headerDisplay: ['Ruang'],
                              },
                              param: {
                                nama_ruang: 'Ope',
                              },
                            }"
                            :valuee="fields.ms_ruang_id"
                            :disabled="activeView == 'update'"
                          />
                        </div>

                        <!-- <div class="col-6">
                          <s-input groupClass="mb-0" v-model="fields.nama" :item="{
                            label: 'Nama',
                            id: 'nama',
                            data: 'nama',
                            type: 'text',
                            validation: [],
                          }" :disabled="true" :valuee="fields.nama" />
                        </div> -->
                        <div class="col-12">
                          <s-input
                            groupClass="mb-0"
                            v-model="fields.remark"
                            :item="{
                              label: 'Keterangan',
                              id: 'remark',
                              data: 'remark',
                              type: 'textarea',
                              validation: [],
                            }"
                            :disabled="activeView == 'update'"
                            :valuee="fields.remark"
                          />
                        </div>
                      </div>
                    </form>
                    <div class="d-flex justify-content-between py-5">
                      <div>
                        <button
                          type="submit"
                          class="btn btn-primary mr-3"
                          @click="onSubmit"
                        >
                          <i class="ri-save-line"></i>
                          Simpan
                        </button>
                      </div>
                    </div>
                  </ValidationObserver>
                </div>
              </div>

              <div class="card card-custom mb-5" v-if="data.length">
                <div class="card-body py-2 mt-3">
                  <div class="table-responsive">
                    <table class="table custom-table v-center header-center">
                      <thead>
                        <!-- <tr> -->
                        <th>#</th>
                        <th>No. Kunjungan</th>
                        <th>Nama Pasien</th>
                        <th>Umur</th>
                        <th>Jenis Kelamin</th>
                        <th>Tanggal</th>
                        <th>Mulai</th>
                        <th>Selesai</th>
                        <th>Status</th>
                        <th>Rujukan Dari</th>
                        <th>Diagnosa</th>
                        <th>Operasi</th>
                        <th>Operator</th>
                        <th>Kode OK</th>
                        <th>Nama Ruang Operasi</th>
                        <!-- </tr> -->
                      </thead>
                      <tbody>
                        <!-- <pre>{{ fields.bulk_barang }}</pre> -->
                        <!-- <pre>{{ fBarang }}</pre> -->

                        <tr
                          v-for="(item, index) in data"
                          :key="index"
                          :class="{ 'bg-light-warning': fBarangEdit }"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.no_kunjungan }}</td>
                          <td>{{ item.nama_pasien || 'nama_pasien' }}</td>
                          <td>{{ item.umur || 'umur' }}</td>
                          <td>{{ item.jenis_kelamin || 'jenis_kelamin' }}</td>
                          <td>{{ item.tanggal_operasi | parse('longDate') }}</td>
                          <td>{{ item.waktu_mulai || '-' }}</td>
                          <td>{{ item.waktu_selesai || '-' }}</td>
                          <td>
                            <span class="label font-weight-bold label-lg  label-inline label-bold" :class="[ label_light ]">
                              {{ status_jadwal(item.status) }} 
                            </span>
                          </td>
                          <td>{{ item.rujukan || '-' }}</td>
                          <td>{{ item.diagnosa || 'diagnosa' }}</td>
                          <td>{{ item.nama_jasa || 'nama_jasa' }}</td>
                          <td>{{ item.nama_dokter || 'nama_dokter' }}</td>
                          <!-- kode ok = kode ruang operasi -->
                          <td>{{ item.kode_ok || 'kode_ok' }}</td> 
                          <td>{{ item.nama_ruang || 'nama_ruang' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card card-custom mb-5" v-else>
                <div class="card-body text-center">
                  <img
                    :src="'./static/img/default/no_data_table.svg'"
                    class="max-w-250px"
                    alt=""
                  />
                  <h3 class="mt-3 font-weight-bolder text-dark">Tidak ada history</h3>
                </div>
              </div>

            </div>
          </div>
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center">
              <img
                :src="'./static/img/default/no_data_table.svg'"
                class="max-w-250px"
                alt=""
              />
              <!-- <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || '-' }}</h3> -->
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CardRegistrasiRanap from "./_components/card_registrasi_ranap.vue";
// import Bmhp from '../_components/bmhp/bmhp.vue'

import moment from "moment";
moment.locale("id");

export default {
  name: "layanan_rjalan_medis",
  components: {
    CardRegistrasiRanap,
    // Bmhp
  },
  data() {
    return {
      loading: false,

      dataRegistrasi: {},
      registrasi_id: "",

      dateToday: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      timeToday: moment(new Date()).format("HH:mm:ss"),
      activeView: "create", // 'list',
      activeID: null,
      fBarangEdit: false,
      fBarang: {
        index: null,
        id: null,
        barang: {},
        ms_barang_id: "",
        qty_barang: "",
        nama_barang: "",
        harga_barang: "",
        harga_barang_custom: "",
        harga_pokok_barang: "",
      },
      fields: {
        // is_bmhp: true,
        // is_external: false,
        // jenis_rawat: 'RJALAN',
        // harga_total_barang: 0,
        // harga_total_jasa: 0,
        // harga_total_fasilitas: 0,
        // discount: 0,
        // tax: 0,
        // total_penjualan: 0,
        // status_penjualan: 1,

        // ms_gudang_id: '', // Gudang Utama

        // tgl_penjualan: '',
        // NIK: '',
        // nama: '',
        // registrasi_id: '',
        // kelas_kunjungan_id: '',
        // ms_asuransi_id: '',
        // ms_dokter_id: '',
        // ms_jenis_layanan_id: '',

        // ms_harga_id: '',
        // ms_tarif_id: '',

        // remark: '',
        // no_kunjungan: '',
        // no_rm: '',

        // nama_penjualan_external: '',
        // alamat_penjualan_external: '',
        // keterangan_penjualan_external: '',
        // pasien_id: '',

        // bulk_fasilitas: [],
        // bulk_jasa: [],
        // bulk_barang: [],
        // bulk_penunjang: []

        registrasi_id: "",
        ms_kelas_kamar_id: "",
        ms_ruang_id: "",
        tanggal_operasi: "",
        waktu_mulai: "",
        waktu_selesai: "",
        ms_dokter_id: "",
        ms_jasa_id: "",
        remark: "",
        ms_poliklinik_id: "",
      },
      data: [],
      label_light: 'label-light-info'
    };
  },
  watch: {
    registrasi_id: {
      async handler(to, from) {},
    },
    activeView: {
      deep: false,
      immediate: false,
      handler(to) {
        if (to === "create" || to === "update") this.initForm();
        if (to && this.$route.query.view !== to) {
          this.$router
            .push({
              name: this.$route.name,
              query: { view: to, id: this.activeID },
              params: { id: this.activeID },
            })
            .catch(() => {});
        }
      },
    },
    $route: {
      deep: true,
      immediate: true,
      handler(to) {
        if (to.query.view) {
          this.activeView = to.query.view;
          this.activeID = to.query.id;
        } else {
          this.activeView = "list";
          this.activeID = null;
        }

        if (to.query.view === "create" || to.query.view === "update")
          this.initForm();
        if (to.query.view === "list") this.getData();
      },
    },
  },
  computed: {
    total_barang() {
      if (
        this.fields &&
        this.fields.bulk_barang &&
        this.fields.bulk_barang.length
      )
        return this.fields.bulk_barang.reduce(
          (acc, curr) => acc + parseFloat(curr.total_harga_barang),
          0
        );
      else return 0;
    },
  },
  mounted() {},
  methods: {
    async selectRegistrasi(e, switch_tab = true) {
      this.dataRegistrasi = e;
      console.log(this.dataRegistrasi, "<<<<<<<<<<<<<<<<<<<<<");
      this.registrasi_id = e.registrasi_id || "";
      if (!this.registrasi_id) return;

      this.getData();

      this.fields.registrasi_id = this.registrasi_id;
      this.fields.ms_dokter_id = this.dataRegistrasi.ms_dokter_id;
      this.fields.ms_kelas_kamar_id = this.dataRegistrasi.kelas_kunjungan_id;
      // this.initForm()
      this.$router
        .push({ name: this.$route.name, query: { view: "list" } })
        .catch(() => {});
    },
    async initForm() {
      if (this.activeView === "update") return;

      const pasien_request = await this.$_api.single(
        "pasien",
        {},
        this.dataRegistrasi.pasien_id
      );
      if (pasien_request.data.length === 0) {
        this.$_alert.error(
          "Pasien Tidak Ditemukan | Penjualan tidak dapat dibuat"
        );
        return;
      }

      // this.fields.ms_harga_id = this.dataRegistrasi.ms_harga_id;
      // this.fields.ms_tarif_id = this.dataRegistrasi.ms_tarif_id;

      // this.fields.bulk_barang = [];
      // this.harga_total_barang = 0;
      // this.total_penjualan = 0;

      // const pasien = pasien_request.data[0];
      // delete this.fields.id;
      // this.fields.tgl_penjualan = this.dataRegistrasi.tgl_registrasi;
      // this.fields.NIK = pasien.nik;
      // this.fields.nama = pasien.nama_lengkap;
      // this.fields.ms_gudang_id = "";
      // this.fields.remark = "";
      // this.fields.registrasi_id = this.dataRegistrasi.registrasi_id;
      // this.fields.kelas_kunjungan_id = this.dataRegistrasi.kelas_kunjungan_id;
      // this.fields.ms_asuransi_id = this.dataRegistrasi.ms_asuransi_id;
      // this.fields.ms_dokter_id = this.dataRegistrasi.ms_dokter_id;
      // this.fields.ms_jenis_layanan_id = this.dataRegistrasi.ms_jenis_layanan_id;

      // this.resetBarang();
    },
    editForm(item) {
      // console.log('editForm', item)
      // console.log(item.remark)
      (this.activeView = "update"),
        (this.fields = JSON.parse(JSON.stringify({ ...item })));
      console.log("fields", this.fields);
      // this.fields.is_bmhp = item.is_bmhp
      // this.fields.is_external = item.is_external
      // this.fields.jenis_rawat = item.jenis_rawat
      // this.fields.harga_total_barang = item.harga_total_barang
      // this.fields.harga_total_jasa = item.harga_total_jasa
      // this.fields.harga_total_fasilitas = item.harga_total_fasilitas
      // this.fields.discount = item.discount
      // this.fields.tax = item.tax
      // this.fields.total_penjualan = item.total_penjualan
      // this.fields.status_penjualan = item.status_penjualan
      // this.fields.ms_gudang_id = item.ms_gudang_id
      // this.fields.tgl_penjualan = item.tgl_penjualan
      // this.fields.NIK = item.NIK
      // this.fields.nama = item.nama
      // this.fields.registrasi_id = item.registrasi_id
      // this.fields.kelas_kunjungan_id = item.kelas_kunjungan_id
      // this.fields.ms_asuransi_id = item.ms_asuransi_id
      // this.fields.ms_dokter_id = item.ms_dokter_id
      // this.fields.ms_jenis_layanan_id = item.ms_jenis_layanan_id
      // this.fields.ms_harga_id = item.ms_harga_id
      // this.fields.ms_tarif_id = item.ms_tarif_id
      // this.fields.remark = item.remark
      // this.fields.bulk_barang = item.bulk_barang
    },
    async onSubmit() {
      console.log(this.fields);
      const res_penjualan = await this.$_api.post(
        "jadwal_operasi/register",
        this.fields
      );
      if (res_penjualan.status != 200)
        this.$_alert.error(res_penjualan, "", res_penjualan.message);
      else this.$_alert.success("Jadwal Operasi Berhasil Dibuat");
    },
    getData() {
      this.loading = true;
      this.$_api
        .post("jadwal_operasi/list", { registrasi_id: this.registrasi_id })
        .then((res) => {
          this.data = res.data;
          this.loading = false;
          this.fields.ms_dokter_id = this.dataRegistrasi.ms_dokter_id;
        })
        .catch((err) => {
          this.$_alert.error(err, "Terjadi kesalahan server");
          // consol.elog(err)
        });
    },
    deleteForm(item) {
      this.$_alert
        .confirm(
          "Yakin ingin menghapus?",
          "Data yang telah dihapus tidak dapat dikembalikan"
        )
        .then((res) => {
          if (res.isConfirmed) {
            this.$_api.post("penjualan/delete", { id: item.id }).then(() => {
              this.getData();
              this.$_alert.success("Berhasil menghapus data");
            });
          }
        });
    },
    status_jadwal(a) {
      this.label_light = a == 0 ? 'label-light-danger' : a == 1 ? 'label-light-warning' : a == 2 ? 'label-light-primary' : a == 3 ? "label-light-success" : "label-light-secondary"
      return a == 0 ? 'BATAL' : a == 1 ? 'MENUNGGU' : a == 2 ? 'DIPROSES' : a == 3 ? "SELESAI" : "-"
    },

  },
};
</script>
