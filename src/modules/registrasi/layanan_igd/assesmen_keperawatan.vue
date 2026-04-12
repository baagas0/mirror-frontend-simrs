<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-3 col-md-3 col-sm-12">
        <card-registrasi-igd @selected="selectRegistrasi" />
      </div>
      <div class="xl-9 col-md-9 col-sm-12 mb-5">
        <div class="card card-custom mb-5" v-if="dataRegistrasi && registrasi_id">
          <div class="card-body ribbon ribbon-right">
            <div class="ribbon-target" :class="{ 'bg-warning': !is_validasi && stateAssesmen != 'create', 'bg-success': is_validasi && stateAssesmen != 'create' }" style="top: 10px; right: 0px">{{ is_validasi ? "Sudah" : "Belum" }} Validasi</div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ dataRegistrasi.nama_lengkap || "-" }}</h5>
                <p class="text-muted mb-0 mt-3 font-weight-bold font-size-sm">RM {{ dataRegistrasi.no_rm || "-" }} / {{ dataRegistrasi.tgl_registrasi | parse("date") }}</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.jenis_kelamin | parse("kelamin") }} / {{ dataRegistrasi.tgl_lahir | parse("old") }}th</p>
                <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ dataRegistrasi.nama_dokter }}</p>

                <button class="btn btn-warning mt-3" v-if="!loadingAssesmen && !is_validasi && stateAssesmen != 'create'" @click="doValidasi()">Validasi Sekarang</button>
              </div>
              <div class="text-center">
                <h6 class="font-weight-bolder text-dark">KNJ</h6>
                <h5 class="font-weight-bolder text-dark">{{ dataRegistrasi.no_kunjungan }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-custom mb-5" v-if="loadingAssesmen">
          <div class="card-body d-flex justify-content-center">
            <div class="spinner spinner-track spinner-primary"></div>
          </div>
        </div>
        <template v-else-if="stateAssesmen === 'create' && dataRegistrasi && registrasi_id">
          <div class="card card-custom">
            <div class="card-header">
              <h3 class="card-title">Buat Assesmen Keperawatan IGD</h3>
            </div>
            <!--begin::Form-->
            <ValidationObserver v-slot="{ handleSubmit }">
              <form ref="assesmenForm" @submit.prevent="handleSubmit(createAssesmen)" autocomplete="off">
                <div class="card-body">
                  <div class="form-group mb-8">
                    <div class="alert alert-custom alert-default" role="alert">
                      <div class="alert-icon"><i class="flaticon-warning text-primary"></i></div>
                      <div class="alert-text">Isi diagnosa form dibawah ini untuk membuat assesmen keperawatan layanan IGD.</div>
                    </div>
                  </div>

                  <div class="col-6">
                    <s-input
                      v-model="param_create_assesmen.tipe_diagnosa"
                      :key="'tipe_diagnosa'"
                      :id="'tipe_diagnosa'"
                      :item="{
                        label: 'Tipe Diagnosa',
                        id: 'tipe_diagnosa',
                        data: 'tipe_diagnosa',
                        type: 'lookup-button',
                        validation: ['required'],
                        value: param_create_assesmen.tipe_diagnosa,
                        pointer: {
                          label: 'label',
                          code: 'code',
                          display: ['label'],
                          list: [
                            { label: 'ICD', code: 'ICD' },
                            { label: 'Non ICD', code: 'Non ICD' },
                          ],
                        },
                        param: {},
                      }"
                      :valuee="param_create_assesmen.tipe_diagnosa" />
                  </div>
                  <div class="col-12" v-if="param_create_assesmen.tipe_diagnosa === 'ICD'">
                    <s-input
                      v-model="param_create_assesmen.diagnosa"
                      :key="'diagnosa'"
                      :id="'diagnosa'"
                      :item="{
                        label: 'Diagnosa',
                        id: 'diagnosa',
                        data: 'diagnosa',
                        type: 'lookup-radio',
                        validation: ['required'],
                        value: param_create_assesmen.diagnosa,
                        return_object: true,
                        api: 'ms_diagnosa',
                        pointer: {
                          label: 'nama_diagnosa',
                          code: 'id',
                          display: ['kode_diagnosa', 'nama_diagnosa'],
                        },
                        param: {},
                      }"
                      :valuee="param_create_assesmen.diagnosa" />
                  </div>
                  <div class="col-12" v-else>
                    <s-input
                      v-model="param_create_assesmen.judul_diagnosa"
                      :key="'judul_diagnosa'"
                      :id="'judul_diagnosa'"
                      :item="{
                        label: 'Diagnosa',
                        id: 'judul_diagnosa',
                        data: 'judul_diagnosa',
                        type: 'text',
                        validation: ['required'],
                        value: param_create_assesmen.judul_diagnosa,
                        param: {},
                      }"
                      :valuee="param_create_assesmen.judul_diagnosa" />
                  </div>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary mr-2">Submit</button>
                </div>
              </form>
            </ValidationObserver>
            <!--end::Form-->
          </div>
        </template>
        <template v-else-if="dataRegistrasi && registrasi_id && dataAssesmen && dataAssesmen.anamnesa && dataAssesmen.pengkajian_bpsesk && dataAssesmen.pemeriksaan_fisik && dataAssesmen.gcs && dataAssesmen.pengkajian_ide && dataAssesmen.diagnosa_rencana">
          <!-- <pre>{{dataAssesmen[activeTab]}}</pre> -->
          <!-- <pre>{{ dataAssesmen }}</pre> -->
          <div class="row no-gutters mb-5 nav nav-primary nav-pills gap-8">
            <a @click="switchActiveTab('anamnesa')" :class="activeTab === 'anamnesa' ? 'btn-primary' : 'btn-outline-primary'" class="btn" style="flex-grow: 1">Anamnesa</a>
            <a @click="switchActiveTab('pengkajian_bpsesk')" :class="activeTab === 'pengkajian_bpsesk' ? 'btn-primary' : 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pengkajian Bio Psiko Sosio Ekonomi Spiritual Kultural</a>
            <a @click="switchActiveTab('pemeriksaan_fisik')" :class="activeTab === 'pemeriksaan_fisik' ? 'btn-primary' : 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pemeriksaan Fisik</a>
            <a @click="switchActiveTab('gcs')" :class="activeTab === 'gcs' ? 'btn-primary' : 'btn-outline-primary'" class="btn" style="flex-grow: 1">GCS</a>
            <a @click="switchActiveTab('pengkajian_ide')" :class="activeTab === 'pengkajian_ide' ? 'btn-primary' : 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pengkajian Kebutuhan Informasi dan Edukasi</a>
            <a @click="switchActiveTab('diagnosa_rencana')" :class="activeTab === 'diagnosa_rencana' ? 'btn-primary' : 'btn-outline-primary'" class="btn" style="flex-grow: 1">Diagnosa & rencana Perawatan</a>
          </div>
          <div class="alert alert-secondary d-flex flex-row" role="alert">
            <i class="ri-information-line"></i>
            <p class="mb-0 mt-1 ml-3">Diagnosa : {{ objectDataAssesmen.judul_diagnosa }} ({{ objectDataAssesmen.tipe_diagnosa }})</p>
          </div>
          <template v-if="activeTab === 'anamnesa'">
            <anamnesa v-if="dataAssesmen && dataAssesmen.anamnesa" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.anamnesa" @submit="updateAssesmen" @dataChange="dataChange"></anamnesa>
          </template>
          <template v-if="activeTab === 'pengkajian_bpsesk'">
            <pengkajian-bpsesk v-if="dataAssesmen && dataAssesmen.pengkajian_bpsesk" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.pengkajian_bpsesk" @submit="updateAssesmen" @dataChange="dataChange"></pengkajian-bpsesk>
          </template>
          <template v-if="activeTab === 'pemeriksaan_fisik'">
            <pemeriksaan-fisik v-if="dataAssesmen && dataAssesmen.pemeriksaan_fisik" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.pemeriksaan_fisik" @submit="updateAssesmen" @dataChange="dataChange"></pemeriksaan-fisik>
          </template>
          <template v-if="activeTab === 'gcs'">
            <gcs v-if="dataAssesmen && dataAssesmen.gcs" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.gcs" @submit="updateAssesmen" @dataChange="dataChange"></gcs>
          </template>
          <template v-if="activeTab === 'pengkajian_ide'">
            <pengkajian-ide v-if="dataAssesmen && dataAssesmen.pengkajian_ide" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.pengkajian_ide" @submit="updateAssesmen" @dataChange="dataChange"></pengkajian-ide>
          </template>
          <template v-if="activeTab === 'diagnosa_rencana'">
            <diagnosa-rencana v-if="dataAssesmen && dataAssesmen.diagnosa_rencana" :is_validasi="is_validasi" :objectDataAssesmen="objectDataAssesmen" :dataRegistrasi="dataRegistrasi" :mData="dataAssesmen.diagnosa_rencana" @submit="updateAssesmen" @dataChange="dataChange"></diagnosa-rencana>
          </template>
        </template>
        <template v-else>
          <div class="card card-custom">
            <div class="card-body text-center">
              <img :src="'./static/img/default/no_data_table.svg'" class="max-w-250px" alt="" />
              <h3 v-if="info_alert" class="mt-3 font-weight-bolder text-dark">{{ info_alert || "-" }}</h3>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CardRegistrasiIgd from "./_components/card_registrasi_igd.vue";
import KeperawatanPlanning from "./_components/assesmen_keperawatan/keperawatan_planning.vue";
import Anamnesa from "./_components/assesmen_keperawatan/anamnesa.vue";
import PengkajianBpsesk from "./_components/assesmen_keperawatan/pengkajian_bpsesk.vue";
import PemeriksaanFisik from "./_components/assesmen_keperawatan/pemeriksaan_fisik.vue";
import Gcs from "./_components/assesmen_keperawatan/gcs.vue";
import PengkajianIde from "./_components/assesmen_keperawatan/pengkajian_ide.vue";
import DiagnosaRencana from "./_components/assesmen_keperawatan/diagnosa_rencana.vue";

import moment from "moment";
moment.locale("id");

export default {
  name: "layanan_igd_keperawatan",
  components: { CardRegistrasiIgd, KeperawatanPlanning, Anamnesa, PengkajianBpsesk, PemeriksaanFisik, Gcs, PengkajianIde, DiagnosaRencana },
  data() {
    return {
      info_alert: "",
      loadingAssesmen: false,
      endpoint: "assesment_keperawatan_igd",

      dataRegistrasi: {},
      registrasi_id: "",

      is_validasi: false,
      objectDataAssesmen: {},
      dataAssesmen: {
        //   subjective: {},
        //   objective: {},
        //   assesment: {},
        //   planning: {}
      },
      json_assesment_keperawatan_igd: {},

      dataChangeStatus: false,
      stateAssesmen: "update",
      activeTab: "subjective",

      param_create_assesmen: {
        tipe_diagnosa: "ICD",
        diagnosa: "", // Temporary
        ms_diagnosa_id: null,
        judul_diagnosa: "",
        registrasi_id: "",
        is_validasi: false,
        json_assesment_keperawatan_igd: {},
      },
    };
  },
  watch: {},
  mounted() {},
  methods: {
    async selectRegistrasi(e, open_tab = "anamnesa") {
      console.log("open tab", open_tab);
      // console.log('selecRegistrasi')
      // if (this.dataRegistrasi && this.dataRegistrasi.registrasi_id && this.dataRegistrasi.registrasi_id === e.registrasi_id) {
      //   this.dataRegistrasi = {}
      //   this.registrasi_id = ''
      //   this.objectDataAssesmen = {}
      //   this.dataAssesmen = {}
      //   this.json_assesment_keperawatan_igd = {}
      //   return
      // }
      this.dataRegistrasi = e;
      this.registrasi_id = e.registrasi_id || "";
      if (!this.registrasi_id) return;

      this.loadingAssesmen = true;

      // CEK 1: Cek apakah assesmen medis sudah ada
      const assesmenMedis = await this.$_api.list("assesment_medis_igd", {
        registrasi_id: e.registrasi_id,
        page: 1,
        limit: 99999,
      });

      if (assesmenMedis.data.length === 0) {
        this.errorMessage = "Assesmen medis tidak ditemukan!";
        this.$_alert.error({}, "Assesmen medis tidak ditemukan!");
        this.dataRegistrasi = {};
        this.registrasiId = "";
        return;
      }

      const dataAssesmenMedis = assesmenMedis.data[0];

      // CEK 2: Cek apakah assesmen medis sudah divalidasi
      if (dataAssesmenMedis.is_validasi === false) {
        this.errorMessage = "Assesmen medis belum divalidasi!";
        this.$_alert.error({}, "Assesmen medis belum divalidasi!");
        this.dataRegistrasi = {};
        this.registrasiId = "";
        return;
      }

      // CEK 3: Cek apakah kunjungan ini sudah punya penjualan
      const penjualan = await this.$_api.post("penjualan/list", {
        registrasi_id: e.registrasi_id,
      });
      if (penjualan.data.length === 0) {
        this.info_alert = "Penjualan tidak ditemukan!";
        this.$_alert.error({}, "Penjualan tidak ditemukan");
        this.dataAssesmen = {};
        this.objectDataAssesmen = {};
        return;
      }

      this.$_api
        .list(this.endpoint, { registrasi_id: e.registrasi_id })
        .then((res) => {
          // if (res.data.length) this.dataAssesmen = res.data[0]
          // else this.createAssesmen()

          let json_assesment_keperawatan_igd = {
            anamnesa: {},
            pengkajian_bpsesk: {}, // Pengkajian Bio Psiko Sosio Ekonomi Spiritual Kultural
            pemeriksaan_fisik: {},
            gcs: {},
            pengkajian_ide: {}, // Pengkajian Kebutuhan Informasi dan Edukasi
            diagnosa_rencana: {},
          };
          this.json_assesment_keperawatan_igd = json_assesment_keperawatan_igd;

          let assesmen = res.data.filter((x) => x.registrasi_id === e.registrasi_id);
          if (assesmen.length) {
            this.stateAssesmen = "update";
            let a = assesmen[0].json_assesment_keperawatan_igd ? assesmen[0].json_assesment_keperawatan_igd : json_assesment_keperawatan_igd;

            if (!a.pemeriksaan_fisik) a.pemeriksaan_fisik = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_kulit) a.pemeriksaan_fisik.pemeriksaan_kulit = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_kuku) a.pemeriksaan_fisik.pemeriksaan_kuku = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_kepala) a.pemeriksaan_fisik.pemeriksaan_kepala = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_wajah) a.pemeriksaan_fisik.pemeriksaan_wajah = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_mata) a.pemeriksaan_fisik.pemeriksaan_mata = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_telinga) a.pemeriksaan_fisik.pemeriksaan_telinga = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_hidung_dan_sinus) a.pemeriksaan_fisik.pemeriksaan_hidung_dan_sinus = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_mulut_dan_bibir) a.pemeriksaan_fisik.pemeriksaan_mulut_dan_bibir = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_leher) a.pemeriksaan_fisik.pemeriksaan_leher = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_dada_dan_punggung) a.pemeriksaan_fisik.pemeriksaan_dada_dan_punggung = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_kardiovaskuler) a.pemeriksaan_fisik.pemeriksaan_kardiovaskuler = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_dada_dan_aksila) a.pemeriksaan_fisik.pemeriksaan_dada_dan_aksila = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_abdomen_perut) a.pemeriksaan_fisik.pemeriksaan_abdomen_perut = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_ekstermitas_atas) a.pemeriksaan_fisik.pemeriksaan_ekstermitas_atas = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_ekstermitas_bawah) a.pemeriksaan_fisik.pemeriksaan_ekstermitas_bawah = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_genitalia_pria) a.pemeriksaan_fisik.pemeriksaan_genitalia_pria = {};
            if (!a.pemeriksaan_fisik.pemeriksaan_genitalia_wanita) a.pemeriksaan_fisik.pemeriksaan_genitalia_wanita = {};

            this.dataAssesmen = a;

            this.objectDataAssesmen = assesmen[0];
            this.objectDataAssesmen.json_assesment_keperawatan_igd = a;

            this.is_validasi = assesmen[0].is_validasi || false;
            if (open_tab) this.switchActiveTab(open_tab);
            // this.dataChange = false
          }
          // else this.createAssesmen()
          else {
            this.stateAssesmen = "create";
            this.is_validasi = null;
            this.param_create_assesmen = {
              tipe_diagnosa: "ICD",
              diagnosa: "", // Temporary
              ms_diagnosa_id: null,
              judul_diagnosa: "",
              registrasi_id: "",
              is_validasi: false,
              json_assesment_keperawatan_igd: {},
            };
          }
          setTimeout(() => {
            this.loadingAssesmen = false;
          }, 500);
        })
        .catch((err) => {
          this.loadingAssesmen = false;
          this.$_alert.error({}, "Tidak dapat mengambil data assesmen!");
        });
    },
    createAssesmen() {
      const def = {
        registrasi_id: this.registrasi_id,
        json_assesment_keperawatan_igd: this.json_assesment_keperawatan_igd,
      };

      if (this.param_create_assesmen.ms_diagnosa_id === "") this.param_create_assesmen.ms_diagnosa_id = null;

      let param = { ...this.param_create_assesmen, ...def };
      if (this.param_create_assesmen.tipe_diagnosa === "ICD") {
        param.ms_diagnosa_id = this.param_create_assesmen.diagnosa.id;
        param.judul_diagnosa = this.param_create_assesmen.diagnosa.nama_diagnosa;
      } else {
        param.ms_diagnosa_id = null;
        // param.judul_diagnosa = ''
      }
      console.log(param);
      // return
      this.$_api.create(this.endpoint, param).then((res) => {
        // this.dataAssesmen = res.data.json_assesment_keperawatan_igd
        // this.dataAssesmen = param.json_assesment_keperawatan_igd
        this.selectRegistrasi(this.dataRegistrasi);
        this.stateAssesmen = "update";
      });
    },
    updateAssesmen(data) {
      // console.log('key', key)
      console.log("data", data);

      let payload = this.objectDataAssesmen;
      payload.json_assesment_keperawatan_igd[data.key] = data.data;
      payload.id = payload.assesment_keperawatan_igd_id;
      this.$_api
        .update(this.endpoint, payload)
        .then((res) => {
          this.selectRegistrasi(this.dataRegistrasi, data.key);
          this.dataChangeStatus = false;
          this.$_alert.success("Berhasil memperbarui data");
          // if (data.open_tab) this.switchActiveTab(data.open_tab)
          // else this.switchActiveTab('subjective')
        })
        .catch((err) => {
          this.dataChangeStatus = false;
        });
    },
    doValidasi() {
      if (this.objectDataAssesmen.is_validasi) {
        this.$_alert.error({}, "Data sudah divalidasi!");
        return;
      }

      const validation = [
        // { tab: 'subjective', key: 'keluhan_utama', required: true, type: 'string', message: 'Subjective - Keluhan Utama tidak boleh kosong.' },
        // { tab: 'subjective', key: 'tujuan_kunjungan', required: true, type: 'string', message: 'Subjective - Tujuan Kunjugan tidak boleh kosong.' },
        // { tab: 'subjective', key: 'riwayat_kesehatan_saat_ini', required: true, type: 'string', message: 'Subjective - Riwayat Kesehatan tidak boleh kosong.' },
        // { tab: 'objective', key: 'nadi', required: true, type: 'string', message: 'Objective - Nadi tidak boleh kosong.' },
        // { tab: 'objective', key: 'suhu', required: true, type: 'string', message: 'Objective - Suhu tidak boleh kosong.' },
        // { tab: 'objective', key: 'sistolik', required: true, type: 'string', message: 'Objective - Sistolik tidak boleh kosong.' },
        // { tab: 'objective', key: 'diastolik', required: true, type: 'string', message: 'Objective - Diastolik tidak boleh kosong.' },
        // { tab: 'objective', key: 'kesadaran', required: true, type: 'string', message: 'Objective - Kesadaran tidak boleh kosong.' },
        // { tab: 'objective', key: 'pernafasan', required: true, type: 'string', message: 'Objective - Pernafasan tidak boleh kosong.' },
        // { tab: 'objective', key: 'berat_badan', required: true, type: 'string', message: 'Objective - Berat Badan tidak boleh kosong.' },
        // { tab: 'objective', key: 'keadaan_umum', required: true, type: 'string', message: 'Objective - Keadaan Umum tidak boleh kosong.' },
        // { tab: 'objective', key: 'tinggi_badan', required: true, type: 'string', message: 'Objective - Tinggi Badan tidak boleh kosong.' },
        // { tab: 'objective', key: 'lingkar_kepala', required: true, type: 'string', message: 'Objective - Lingkar Kepala tidak boleh kosong.' },
        // // { tab: 'objective', key: 'skrining_nyeri', required: true, type: 'string', message: 'Objective - Skrining Nyeri tidak boleh kosong.' },
        // { tab: 'objective', key: 'index_masa_tubuh', required: true, type: 'string', message: 'Objective - IMT tidak boleh kosong.' },
        // { tab: 'objective', key: 'pemeriksaan_fisik', required: true, type: 'string', message: 'Objective - Pemeriksaan Fisik tidak boleh kosong.' },
        // // { tab: 'assesment', key: 'kebidanan', required: true, type: 'array', message: 'Assesment - Kebidanan tidak boleh kosong.' },
        // // { tab: 'assesment', key: 'keperawatan', required: true, type: 'array', message: 'Assesment - Keperawatan tidak boleh kosong.' },
        // { tab: 'planning', key: 'rencana', required: false, type: 'string', message: 'Planning - Rencana tidak boleh kosong.' },
      ];

      // CHECK VALIDASI
      for (const v of validation) {
        if (v.required) {
          if (this.dataAssesmen[v.tab] && this.dataAssesmen[v.tab][v.key]) {
            const value = this.dataAssesmen[v.tab][v.key];
            const type = typeof value;
            if (v.type === "string") {
              if (!value || value == undefined || value == "") {
                console.log(`${v.tab} ${v.key}`, { type: type, value: value });
                this.$_alert.error({}, v.message);
                return;
              }
            } else if (v.type === "array") {
              if (!Array.isArray(value) || value.length === 0) {
                console.log(`${v.tab} ${v.key}`, { type: type, length: v.length, value: value });
                this.$_alert.error({}, v.message);
                return;
              }
            }
          } else {
            this.$_alert.error({}, v.message);
            return;
          }
        }
      }

      this.$_alert.confirm("Validasi data", "apakah anda yakin ingin menvalidasi data assesmen?").then((status) => {
        if (status.isDismissed) return;
        else {
          this.objectDataAssesmen.is_validasi = true;
          this.updateAssesmen(this.dataAssesmen);
        }
      });
    },
    dataChange(status) {
      this.dataChangeStatus = status;
    },
    switchActiveTab(e) {
      this.dataAssesmen[e] = this.objectDataAssesmen.json_assesment_keperawatan_igd[e];
      this.dataChangeStatus = false;
      this.activeTab = e;
      if (e === "diagnosa_rencana") {
        if (!this.dataAssesmen[e].keperawatan) this.dataAssesmen[e].keperawatan = [];
        if (!this.dataAssesmen[e].kebidanan) this.dataAssesmen[e].kebidanan = [];
      }
      // this.$nextTick().then(res => {
      //   this.getAllData()
      // })
    },
  },
};
</script>
