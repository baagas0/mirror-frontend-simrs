<template lang="">
  <div class="w-100">
    <tas-base-crud ref="crud-lab_regis" :config="buildConfig" @after-create="handleAfterCreate" :classes="registrasi_id ? '-' : 'container-fluid'" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" :mockSlave="false">
      <template v-slot:list-diagnosa="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.diagnosa" :key="'a123eA' + item.id + a">{{ item.nama_diagnosa }}</li>
        </ul>
      </template>
      <template v-slot:list-list_lab_paket="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.list_lab_paket" :key="'bAWQ3R' + item.id + a">{{ item.nama_lab_paket }}</li>
        </ul>
      </template>

      <template v-slot:detail-diagnosa="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.diagnosa" :key="'cAsr321' + item.id + a">{{ item.nama_diagnosa }}</li>
        </ul>
      </template>
      <template v-slot:detail-list_lab_paket="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.list_lab_paket" :key="'d124zswd' + item.id + a">{{ item.nama_lab_paket }}</li>
        </ul>
      </template>

      <template v-slot:list-table-action="rowData">
        <button class="btn btn-sm btn-info mr-1" @click="$bvModal.show('modal-server-lis')">
          <i class="ri-server-line"></i>
          Server Lis
        </button>
        <button class="btn btn-primary mr-1" @click="$refs['crud-lab_regis'].getEvent('detail', rowData.rowData)"><i class="ri-information-line"></i> Lihat Request & Hasil</button>
        <button class="btn btn-success mr-1" @click="goToPengambilanSampel(rowData.rowData)"><i class="ri-contrast-drop-2-line"></i> Pengambilan Sampel</button>
        <button class="btn btn-info mr-1" @click="useRegistration(rowData.rowData)" v-if="rowData.rowData.is_registrasi === false || rowData.rowData.registrasi_id == ''"><i class="ri-hospital-line"></i> Update Kunjungan</button>
      </template>
      <template v-slot:list-action-append="rowData">
        <div class="btn btn-icon btn-light-success pulse pulse-success ml-3" style="width: max-content; padding-left: 0.5rem; padding-right: 0.5rem">
          <span>New: {{ statistic.new || 0 }}</span>
          <span class="pulse-ring"></span>
        </div>
      </template>

      <template v-slot:detail-footer="rowData">
        <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert" v-if="rowData.rowData && !rowData.rowData.registrasi_id">
          <div class="alert-icon"><i class="ri-error-warning-line"></i></div>
          <div class="alert-text">Data request lab belum memiliki registrasi, harap update data registrasi.</div>
        </div>

        <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert" v-if="rowData.rowData && rowData.rowData.registrasi_id && rowData.rowData.status < 1">
          <div class="alert-icon"><i class="ri-progress-3-fill"></i></div>
          <div class="alert-text">Mulai proses permintaan laboratorium?</div>
          <button class="btn btn-primary" @click="updateStatus(rowData.rowData, 1)">
            Proses
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>

        <!-- trigger di pindah saat klik proses -->
        <!-- <div v-if="rowData.rowData && rowData.rowData.registrasi_id" class="alert alert-custom alert-light-success fade show mb-5" role="alert">
          <div class="alert-icon"><i class="ri-progress-3-fill"></i></div>
          <div class="alert-text">
            sync satu sehat
          </div>
          <button class="btn btn-primary"
            @click="syncSatuSehat(rowData.rowData, rowData.rowData.registrasi_id)"
          >
            Sync
            <i class="ri-arrow-right-line"></i>
          </button>
        </div> -->
      </template>
    </tas-base-crud>

    <b-modal id="modal-use-registration" title="Update Kunjungan Laboratorium" hide-footer>
      <!-- <pre>{{ dataObject }}</pre> -->
      <ValidationObserver v-slot="{ handleSubmit }" v-if="dataObject">
        <form @submit.prevent="handleSubmit(useSubmitRegistration)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <s-input
                v-model="dataObject.registrasi_id"
                :key="'registrasi_id'"
                :id="'registrasi_id'"
                :item="{
                  label: 'Kunjungan',
                  id: 'registrasi_id',
                  data: 'registrasi_id',
                  type: 'lookup-radio',
                  validation: ['required'],
                  value: dataObject.registrasi_id,
                  api: 'registrasi/listPerHalamanBypassUri',
                  pointer: {
                    label: 'nama_lengkap',
                    code: 'registrasi_id',
                    display: ['tgl_registrasi|date', 'nama_jenis_layanan', 'no_kunjungan', 'no_rm', 'nama_lengkap'],
                    headerDisplay: ['Tanggal Registrasi', 'Layanan', 'No Kunjungan', 'no_rm', 'Nama Lengkap'],
                  },
                  param: {},
                }"
                :valuee="dataObject.registrasi_id" />
            </div>
            <div class="col-12 align-self-center">
              <button type="submit" class="btn btn-light-primary mr-3">
                <i class="ri-save-line"></i>
                {{ $t("global.submit") }}
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <template v-else><h5 class="text-danger">Data tidak ditemukan</h5></template>
    </b-modal>

    <b-modal id="modal-server-lis" title="Server Laborat" hide-footer>
      <div class="mb-3">
        <div class="d-flex align-items-center">
          <span class="bullet bullet-bar bg-success align-self-stretch"></span>

          <div class="d-flex flex-column flex-grow-1 ml-3">
            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"> Request Sysmex </a>
            <span class="text-muted font-weight-bold"> Buat koneksi request ke server sysmex </span>
          </div>

          <button class="btn btn-info" @click="handleServerLis()" :disabled="showToastServerLis">
            Koneksi Server
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <div class="d-flex align-items-center">
          <span class="bullet bullet-bar bg-warning align-self-stretch"></span>

          <div class="d-flex flex-column flex-grow-1 ml-3">
            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"> Ambil Hasil Sysmex </a>
            <span class="text-muted font-weight-bold"> Ambil hasil dari server sysmex </span>
          </div>

          <button class="btn btn-info" @click="handleServerLis()" :disabled="showToastServerLis">
            Koneksi Server
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
      <hr />
      <div class="mb-3">
        <div class="d-flex align-items-center">
          <span class="bullet bullet-bar bg-success align-self-stretch"></span>

          <div class="d-flex flex-column flex-grow-1 ml-3">
            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"> Request LICA </a>
            <span class="text-muted font-weight-bold"> Buat koneksi request ke server LICA </span>
          </div>

          <button class="btn btn-info" @click="handleServerLis()" :disabled="showToastServerLis">
            Koneksi Server
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <div class="d-flex align-items-center">
          <span class="bullet bullet-bar bg-warning align-self-stretch"></span>

          <div class="d-flex flex-column flex-grow-1 ml-3">
            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"> Ambil Hasil LICA </a>
            <span class="text-muted font-weight-bold"> Ambil hasil dari server LICA </span>
          </div>

          <button class="btn btn-info" @click="handleServerLis()" :disabled="showToastServerLis">
            Koneksi Server
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
      <hr />
      <div class="mb-3">
        <div class="d-flex align-items-center">
          <span class="bullet bullet-bar bg-success align-self-stretch"></span>

          <div class="d-flex flex-column flex-grow-1 ml-3">
            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"> Request ELIMS </a>
            <span class="text-muted font-weight-bold"> Buat koneksi request ke server ELIMS </span>
          </div>

          <button class="btn btn-info" @click="handleServerLis()" :disabled="showToastServerLis">
            Koneksi Server
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <div class="d-flex align-items-center">
          <span class="bullet bullet-bar bg-warning align-self-stretch"></span>

          <div class="d-flex flex-column flex-grow-1 ml-3">
            <a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"> Ambil Hasil ELIMS </a>
            <span class="text-muted font-weight-bold"> Ambil hasil dari server ELIMS </span>
          </div>

          <button class="btn btn-info" @click="handleServerLis()" :disabled="showToastServerLis">
            Koneksi Server
            <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </b-modal>

    <b-toast id="toast-server-lis" variant="info" solid no-auto-hide no-close-button :visible="showToastServerLis">
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-center pt-2">
          <b-spinner Radiologiel="Spinning" small></b-spinner>
          <strong class="mr-auto pl-3">Request Sysmex ...</strong>
          <small class="text-muted mr-2">
            <time-ago locale="id"></time-ago>
          </small>
        </div>
      </template>
      Menghubungkan ke server sysmex.
    </b-toast>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("id");

export default {
  name: "crud-lab_regis",
  props: {
    registrasi_id: {
      type: String,
      required: false,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      config: {
        title: "Registrasi Laboratorium",
        model_api: "lab_regis",
        getter: "lab_regis",
        setter: "lab_regis",
        pk_field: "id_lab_regis",
        frontendPaginate: false,
        permission: {
          create: "template-allow-all",
          // read: 'template-allow-all',
          read: false,
          update: "template-allow-all",
          delete: "template-allow-all",
        },
        filter_api: {
          registrasi_id: "",
        },
        slave: [
          {
            name: "Daftar Hasil Laboratorium",
            module: "registrasi/lab/lab_hasil",
            as_param: "lab_regis_id",
            key_field: "id_lab_regis",
            overwrite: {
              filter_api: {
                id: "",
              },
              fields: [
                { rule: "1.methods.list", value: false },
                { rule: "1.methods.detail", value: false },
                { rule: "1.methods.create", value: { type: "hidden" } },
                { rule: "1.methods.update", value: { type: "hidden" } },
                { rule: "1.methods.filter", value: false },

                // { rule: '2.methods.create', value: { type: 'hidden', } },
                // { rule: '2.methods.update', value: { type: 'hidden', } },
                // { rule: '2.methods.filter', value: false },

                // { rule: '4.methods.update', value: { disabled: true } }, // Antrian
              ],
            },
          },
        ],
        fields: [
          // id_lab_regis
          {
            id: "id_lab_regis",
            data: "id_lab_regis",
            label: "ID Diagnosa",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false,
            },
          },
          // tanggal_request
          {
            id: "tanggal_request",
            data: "tanggal_request",
            label: "Tanggal Request",
            placeholder: "Ketik Tanggal Request",
            methods: {
              list: { transform: "datetime" },
              detail: { transform: "datetime" },
              create: { type: "datetime", validation: ["required"], value: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") },
              update: { type: "datetime", validation: ["required"], value: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") },
              filter: { type: "datetime" },
            },
          },
          // status
          {
            id: "status",
            data: "status",
            label: "Status",
            placeholder: "Pilih Status",
            methods: {
              list: {
                class: { 0: "badge badge-success", 1: "badge badge-warning", 2: "badge badge-primary", 3: "badge badge-info" },
                transform: "statusPenunjang",
              },
              detail: {
                class: { 0: "badge badge-success", 1: "badge badge-warning", 2: "badge badge-primary", 3: "badge badge-info" },
                transform: "statusPenunjang",
              },
              create: false,
              update: false,
              filter: false,
            },
          },
          // is_registrasi
          {
            id: "is_registrasi",
            data: "is_registrasi",
            label: "Sudah Registrasi Kunjungan?",
            placeholder: "Pilih Registrasi",
            methods: {
              list: {
                class: { true: "badge badge-success", false: "badge badge-danger" },
                transform: "ynBool",
              },
              detail: {
                class: { true: "badge badge-success", false: "badge badge-danger" },
                transform: "ynBool",
              },
              create: {
                type: "lookup-radio",
                value: false,
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Ada Kunjungan", code: true },
                      { label: "Belum ada kunjungan", code: false },
                    ],
                  },
                  toggle_field: [{ id: "registrasi_id", item: "show", toggle: [true, false], value: true }],
                },
              },
              update: false,
              // update: {
              //   type: 'lookup-radio',
              //   option: {
              //     list_pointer: {
              //       label: 'label',
              //       code: 'code',
              //       display: ['label'],
              //       list: [{ label: 'Ada Kunjungan', code: true }, { label: 'Belum ada kunjungan', code: false }]
              //     }
              //   }
              // },
              filter: false,
            },
          },
          // no_rm
          {
            id: "no_rm",
            data: "no_rm",
            label: "No RM",
            placeholder: "Ketik No RM",
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: true,
            },
          },
          // registrasi_id
          {
            id: "registrasi_id",
            data: "registrasi_id",
            label: "Kunjungan",
            placeholder: "Ketik Kunjungan",
            methods: {
              list: { view_data: "nama_lengkap" },
              detail: { view_data: "nama_lengkap" },
              create: {
                setter: "registrasi/listPerHalamanBypassUri",
                getter: "registrasi/listPerHalamanBypassUri",
                type: "lookup-radio",
                validation: ["required"],
                // value: '9414ac24-f9c1-455d-9ffb-c186124e033e',
                option: {
                  list_pointer: {
                    label: "nama_lengkap",
                    code: "registrasi_id",
                    display: ["tgl_registrasi|date", "nama_jenis_layanan", "no_kunjungan", "no_rm", "nama_lengkap"],
                    headerDisplay: ["Tanggal Registrasi", "Layanan", "No Kunjungan", "No. RM", "Nama Lengkap"],
                  },
                  filter: [
                    { type: "date", label: "Tanggal Awal", key: "tanggal_awal" },
                    { type: "date", label: "Tanggal Akhir", key: "tanggal_akhir" },
                    // { type: 'text', label: 'No Kunjungan', key: 'no_kunjungan' },
                    { type: "text", label: "Nama Lengkap", key: "nama_lengkap" },
                  ],
                },
              },
              update: false,
              // update: {
              //   setter: 'registrasi/listPerHalamanBypassUri',
              //   getter: 'registrasi/listPerHalamanBypassUri',
              //   type: 'lookup-radio',
              //   validation: ['required'],
              //   option: {
              //     list_pointer: {
              //       label: 'nama_lengkap',
              //       code: 'registrasi_id',
              //       display: ['tgl_registrasi|date', 'nama_jenis_layanan', 'no_kunjungan','no_rm','nama_lengkap'],
              //       headerDisplay: ['Tanggal Registrasi', 'Layanan', 'No Kunjungan', 'no_rm','Nama Lengkap']
              //     },
              //     filter: [
              //       { type: 'date', label: 'Tanggal Awal', key: 'tanggal_awal' },
              //       { type: 'date', label: 'Tanggal Akhir', key: 'tanggal_akhir' },
              //       // { type: 'text', label: 'No Kunjungan', key: 'no_kunjungan' },
              //       { type: 'text', label: 'Nama Lengkap', key: 'nama_lengkap' },
              //     ]
              //   }
              // },
              filter: {
                setter: "registrasi/listPerHalamanBypassUri",
                getter: "registrasi/listPerHalamanBypassUri",
                type: "lookup-radio",
                validation: [],
                option: {
                  list_pointer: {
                    label: "nama_lengkap",
                    code: "registrasi_id",
                    display: ["tgl_registrasi|date", "nama_jenis_layanan", "no_kunjungan", "no_rm", "nama_lengkap"],
                    headerDisplay: ["Tanggal Registrasi", "Layanan", "No Kunjungan", "No. RM", "Nama Lengkap"],
                  },
                  filter: [
                    { type: "date", label: "Tanggal Awal", key: "tanggal_awal" },
                    { type: "date", label: "Tanggal Akhir", key: "tanggal_akhir" },
                    // { type: 'text', label: 'No Kunjungan', key: 'no_kunjungan' },
                    { type: "text", label: "Nama Lengkap", key: "nama_lengkap" },
                  ],
                },
              },
            },
          },
          // no_kunjungan
          {
            id: "no_kunjungan",
            data: "no_kunjungan",
            label: "No Kunjungan",
            placeholder: "Ketik No Kunjungan",
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
          // nama_jenis_layanan
          {
            id: "nama_jenis_layanan",
            data: "nama_jenis_layanan",
            label: "Jenis Layanan",
            placeholder: "Ketik Jenis Layanan",
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
          // dokter_id
          {
            id: "dokter_id",
            data: "dokter_id",
            label: "Dokter Pengantar",
            placeholder: "Ketik Dokter Pengantar",
            methods: {
              list: { view_data: "nama_dokter" },
              detail: { view_data: "nama_dokter" },
              create: {
                setter: "msDokter",
                getter: "msDokter",
                type: "lookup-radio",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_dokter",
                    code: "ms_dokter_id",
                    display: ["nama_dokter"],
                  },
                },
              },
              update: {
                setter: "msDokter",
                getter: "msDokter",
                type: "lookup-radio",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_dokter",
                    code: "ms_dokter_id",
                    display: ["nama_dokter"],
                  },
                },
              },
              filter: false,
            },
          },
          {
            id: "dokter_pengambil_hasil_id",
            data: "dokter_pengambil_hasil_id",
            label: "Pengambil Hasil",
            placeholder: "Ketik Nama Pengambil Hasil",
            methods: {
              list: { view_data: "nama_dokter_pengambil_hasil" },
              detail: { view_data: "nama_dokter_pengambil_hasil" },
              create: {
                setter: "msDokter",
                getter: "msDokter",
                type: "lookup-radio",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_dokter",
                    code: "ms_dokter_id",
                    display: ["nama_dokter"],
                  },
                },
              },
              update: {
                setter: "msDokter",
                getter: "msDokter",
                type: "lookup-radio",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_dokter",
                    code: "ms_dokter_id",
                    display: ["nama_dokter"],
                  },
                },
              },
              filter: false,
            },
          },
          // diagnosa
          {
            id: "diagnosa",
            data: "diagnosa",
            label: "Daftar Diagnosa",
            placeholder: "Ketik Diagnosa",
            methods: {
              list: { type: "row-slot" },
              detail: { type: "row-slot" },
              create: {
                setter: "ms_diagnosa",
                getter: "ms_diagnosa",
                type: "lookup-checkbox",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "kode_diagnosa",
                    code: "id",
                    display: ["kode_diagnosa", "nama_diagnosa"],
                  },
                },
              },
              update: {
                setter: "ms_diagnosa",
                getter: "ms_diagnosa",
                type: "lookup-checkbox",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "kode_diagnosa",
                    code: "id",
                    display: ["kode_diagnosa", "nama_diagnosa"],
                  },
                },
              },
              filter: false,
            },
          },
          // list_lab_paket
          {
            id: "list_lab_paket",
            data: "list_lab_paket",
            label: "Daftar Lab Paket",
            placeholder: "Pilih Daftar Lab Paket",
            methods: {
              list: { type: "row-slot" },
              detail: { type: "row-slot" },
              create: {
                setter: "lab_paket",
                getter: "lab_paket",
                type: "lookup-checkbox",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_lab_paket",
                    code: "id_lab_paket",
                    display: ["nama_lab_paket", "keterangan_lab_paket"],
                    headerDisplay: ["Nama LAB Test"],
                    render_view: (data, rowData) => {
                      let child = "";
                      if (rowData.penunjang) {
                        for (const item of rowData.penunjang) {
                          child += `<li>${item.nama_penunjang}</li>`;
                        }
                      } else {
                        // child += `<li>-</li>`
                      }
                      return `
                        <p class="mb-0">${data}</p>
                        <ul>
                          ${child}
                        </ul>
                      `;
                    },
                  },
                  filter: [{ type: "text", label: "Nama Penunjang", key: "nama_penunjang" }],
                },
              },
              update: {
                setter: "lab_paket",
                getter: "lab_paket",
                type: "lookup-checkbox",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_lab_paket",
                    code: "id_lab_paket",
                    display: ["nama_lab_paket", "keterangan_lab_paket"],
                  },
                },
              },
              filter: false,
            },
          },

          // klinis
          {
            id: "klinis",
            data: "klinis",
            label: "Klinis",
            placeholder: "Ketik Klinis",
            methods: {
              list: true,
              detail: true,
              create: { type: "textarea", validation: ["required"] },
              update: { type: "textarea", validation: ["required"] },
              filter: false,
            },
          },
          // is_cito
          {
            id: "is_cito",
            data: "is_cito",
            label: "Cito",
            placeholder: "Ketik Cito",
            methods: {
              list: {
                class: { true: "badge badge-success", false: "badge badge-secondary" },
                transform: "ynBool",
              },
              detail: {
                class: { true: "badge badge-success", false: "badge badge-secondary" },
                transform: "ynBool",
              },
              create: {
                type: "radio",
                value: false,
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Ya", code: true },
                      { label: "Tidak", code: false },
                    ],
                  },
                },
              },
              update: {
                type: "radio",
                value: false,
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Ya", code: true },
                      { label: "Tidak", code: false },
                    ],
                  },
                },
              },
              filter: false,
            },
          },
          // is_puasa
          {
            id: "is_puasa",
            data: "is_puasa",
            label: "Puasa",
            placeholder: "Ketik Puasa",
            methods: {
              list: {
                class: { true: "badge badge-success", false: "badge badge-danger" },
                transform: "ynBool",
              },
              detail: {
                class: { true: "badge badge-success", false: "badge badge-danger" },
                transform: "ynBool",
              },
              create: {
                type: "radio",
                value: false,
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Ya", code: true },
                      { label: "Tidak", code: false },
                    ],
                  },
                },
              },
              update: {
                type: "radio",
                value: false,
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Ya", code: true },
                      { label: "Tidak", code: false },
                    ],
                  },
                },
              },
              filter: false,
            },
          },
          // keterangan_lab_regis
          {
            id: "keterangan_lab_regis",
            data: "keterangan_lab_regis",
            label: "Keterangan",
            placeholder: "Ketik Keterangan",
            methods: {
              list: true,
              detail: true,
              create: { type: "textarea", validation: ["required"] },
              update: { type: "textarea", validation: ["required"] },
              filter: false,
            },
          },
        ],
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,

      dataObject: {
        registrasi_id: "",
      },
      objHasRegistrasi: false,
      showToastServerLis: false,

      intervalStatistic: null,
      statistic: {
        new: 0,
      },
    };
  },
  computed: {
    buildConfig() {
      const fields = JSON.parse(JSON.stringify(this.config.fields));
      if (this.registrasi_id) {
        fields[3] = {
          id: "is_registrasi",
          data: "is_registrasi",
          label: "Sudah Registrasi Kunjungan?",
          placeholder: "Pilih Registrasi",
          methods: {
            list: {
              class: { true: "badge badge-success", false: "badge badge-danger" },
              transform: "ynBool",
            },
            detail: {
              class: { true: "badge badge-success", false: "badge badge-danger" },
              transform: "ynBool",
            },
            create: {
              type: "hidden",
              value: true,
            },
            update: false,
            filter: false,
          },
        };
        fields[5] = {
          id: "registrasi_id",
          data: "registrasi_id",
          label: "Kunjungan",
          placeholder: "Ketik Kunjungan",
          methods: {
            list: { view_data: "nama_lengkap" },
            detail: { view_data: "nama_lengkap" },
            create: {
              type: "hidden",
              validation: [],
              // value: '9414ac24-f9c1-455d-9ffb-c186124e033e',
              value: this.registrasi_id,
            },
            update: false,
            filter: false,
          },
        };
      }
      return { ...this.config, filter_api: { registrasi_id: this.registrasi_id }, fields: fields };
    },
  },
  watch: {
    "$route.query.view": {
      handler: function (val) {
        let query = this.$route.query;
        if (val && query.view && query.view === "detail" && query.id) {
          this.objHasRegistrasi = false;
          this.handleSlaveOverride(query.id);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.getStatistic();

    this.intervalStatistic = setInterval(() => {
      this.getStatistic();
    }, 10000);
  },
  beforeDestroy() {
    // destroyed  in Vue 2
    clearInterval(this.intervalStatistic);
  },
  methods: {
    async syncSatuSehat(row, registrasi_id) {
      try {
        const organization = localStorage.getItem("organization_satu_sehat");
        const registrasiData = await this.$_api.post("/registrasi/detailsById", { id: registrasi_id });
        const registrasi = registrasiData.data[0];
        console.log("registrasi", registrasi);
        const performedPeriod = new Date(row.createdAt);
        let satu_sehat_puasa_id = row.satu_sehat_puasa_id;

        // integrate procedure satu sehat
        if (!row.satu_sehat_puasa_id) {
          const puasa = await this.$_api.post("/ihs/request", {
            method: "post",
            uri: "Procedure",
            data: {
              resourceType: "Procedure",
              status: row.is_puasa ? "completed" : "not-done",
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "103693007",
                    display: "Diagnostic procedure",
                  },
                ],
                text: "Prosedur diagnostik",
              },
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "792805006",
                    display: "Fasting",
                  },
                ],
              },
              subject: {
                reference: `Patient/${registrasi.satu_sehat_pasien}`,
                display: `${registrasi.nama_lengkap}`,
              },
              encounter: {
                reference: `Encounter/${registrasi.satu_sehat_id_registrasi}`, //satu_sehat_id dari encounter
              },
              performedPeriod: {
                start: performedPeriod.toISOString(),
                end: performedPeriod.toISOString(),
              },
              performer: [
                {
                  actor: {
                    reference: `Practitioner/${registrasi.satu_sehat_dokter}`,
                    display: `${registrasi.nama_dokter}`,
                  },
                },
              ],
              note: [
                {
                  text: row.is_puasa ? "Pasien berpuasa 8 jam sebelum pengambilan sampel" : "Pasien tidak perlu berpuasa terlebih dahulu",
                },
              ],
            },
          });
          satu_sehat_puasa_id = puasa.data.id;
          console.log("puasa", puasa);
        }

        // integrate service request satu sehat
        if (!row.satu_sehat_puasa_id) {
          const puasa = await this.$_api.post("/ihs/request", {
            method: "post",
            uri: "ServiceRequest",
            data: {
              resourceType: "ServiceRequest",
              identifier: [
                {
                  system: `http://sys-ids.kemkes.go.id/servicerequest/${organization}`,
                  value: "00001",
                },
              ],
              status: "active",
              intent: "original-order",
              priority: "routine",
              category: [
                {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: "108252007",
                      display: "Laboratory procedure",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "55231-5",
                    display: "Electrolytes panel - Blood",
                  },
                  {
                    system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
                    code: "30484",
                    display: "ELEKTROLIT DARAH (NA, K, CL)",
                  },
                ],
                text: "Panel Elektrolit - Na, K, Cl",
              },
              subject: {
                reference: `Patient/${registrasi.satu_sehat_pasien}`,
              },
              encounter: {
                reference: `Encounter/${registrasi.satu_sehat_id_registrasi}`,
              },
              occurrenceDateTime: performedPeriod.toISOString(),
              authoredOn: performedPeriod.toISOString(),
              requester: {
                reference: `Practitioner/${registrasi.satu_sehat_dokter}`,
                display: `${registrasi.nama_dokter}`,
              },
              performer: [
                {
                  reference: `Practitioner/${registrasi.satu_sehat_dokter}`,
                  display: `${registrasi.nama_dokter}`,
                },
              ],
              reasonCode: [
                {
                  text: "Paket pemeriksaan laborat",
                },
              ],
              note: [
                {
                  text: "Pasien tidak perlu berpuasa terlebih dahulu",
                },
              ],
              supportingInfo: [
                {
                  reference: `Procedure/${satu_sehat_puasa_id}`,
                },
              ],
            },
          });
          console.log("puasa", puasa);
        }

        this.$_alert.success("Berhasil menyinkronkan data ke Satu Sehat");
      } catch (error) {
        console.log(error);
        this.$_alert.error({}, "Gagal menyinkronkan data ke Satu Sehat");
      }
    },
    useRegistration(data) {
      this.$bvModal.show("modal-use-registration");
      // this.registrasi_id = false;
      this.dataObject = data;
      if (data.registrasi_id) this.dataObject.registrasi_id = data.registrasi_id;
      else this.dataObject.registrasi_id = "";

      // this.$_alert.confirm('Konfirmasi', 'Apakah anda yakin ingin menggunakan registrasi laboratorium ini?').then((res) => {
      //   if (res.isConfirmed) {
      //     this.$_api.update('lab_regis', { ...data, id: data.lab_regis_id, is_registrasi: true }).then((res) => {
      //       this.$refs['crud-lab_regis'].$children[1].getData();
      //     });`
      //   }
      // })
    },
    useSubmitRegistration() {
      this.$_alert.confirm("Konfirmasi", "Apakah anda yakin ingin menggunakan kunjungan ini?").then((res) => {
        if (res.isConfirmed) {
          this.$_api
            .update("lab_regis", { ...this.dataObject, id: this.dataObject.id_lab_regis, is_registrasi: true })
            .then((res) => {
              this.$refs["crud-lab_regis"].$children[1].getData();
              this.$bvModal.hide("modal-use-registration");
            })
            .catch((err) => {
              this.$refs["crud-lab_regis"].$children[1].getData();
              this.$bvModal.hide("modal-use-registration");
            });
        } else {
          this.$bvModal.hide("modal-use-registration");
        }
      });
    },
    handleSlaveOverride(id) {
      this.$_api.post("lab_regis/detailsById", { id: id, data: { id } }).then((res) => {
        if (res.data.length === 0) {
          return;
        }

        const regis = res.data[0];
        if (regis.is_registrasi && regis.registrasi_id != "") {
          this.config.slave[0].overwrite.permission = {
            create: "template-allow-all",
            read: "template-allow-all",
            update: "template-allow-all",
            delete: "template-allow-all",
          };
          this.config.slave[0].overwrite.filter_api.id = "";
          this.objHasRegistrasi = true;
        } else {
          this.config.slave[0].overwrite.permission = {
            create: false,
            read: false,
            update: false,
            delete: false,
          };
          this.config.slave[0].overwrite.filter_api.id = "";
          this.objHasRegistrasi = false;
          // this.$_alert.error({}, 'Hasil laboratorium tidak dapat isi sebelum kunjungan diperbarui')
        }
        this.$refs["crud-lab_regis"].moduleChange(this.config);
      });
    },
    updateLabRegis(data) {
      this.$_api
        .update("lab_regis", { ...data, id: data.id_lab_regis })
        .then((res) => {
          this.$_alert.success("Berhasil memperbarui");
        })
        .catch((err) => {
          this.$_alert.error({}, "Gagal memperbarui");
        });
    },
    updateStatus(data, status) {
      const currentID = this.$route.query.id;
      this.$_alert
        .confirm("Anda yakin ingin memproses?")
        .then((x) => {
          if (x.isConfirmed) {
            this.$_api
              .update("lab_regis", { ...data, id: data.id_lab_regis, status })
              .then(async (res) => {
                // Puasa
                // await this.syncSatuSehat(data, data.registrasi_id);

                // REFRESH
                this.$router.push({ name: this.$route.name, query: { view: "list", id: currentID }, params: { id: currentID } }).then(() => {
                  this.$router.push({ name: this.$route.name, query: { view: "detail", id: currentID }, params: { id: currentID } }).then(() => {
                    this.$_alert.success("Berhasil memperbarui");
                  });
                });
              })
              .catch((err) => {
                console.log("===> lab_regis.vue:1100 ~ err", err);
                this.$_alert.error({}, "Gagal memperbarui");
              });
          }
        })
        .catch((err) => {
          console.log("===> lab_regis.vue:1105 ~ err", err);
        });
    },
    handleServerLis() {
      this.showToastServerLis = true;

      setTimeout(() => {
        this.showToastServerLis = false;
        this.$_alert.success("Koneksi ke server berhasil");
      }, 1500);
    },
    getStatistic() {
      this.$_api.post("lab_regis/statistic").then((res) => {
        this.statistic = res.data;
      });
    },
    async handleAfterCreate(data) {
      // request ke ihs
    },
    goToPengambilanSampel(data) {
      console.log("===> lab_regis.vue:1122 ~ data", data);
      // Navigate to pengambilan sampel module with lab_regis_id parameter
      this.$router.push({
        name: "Lab Pengambilan Sampel",
        params: {
          lab_regis_id: data.id_lab_regis,
        },
      });
    },
  },
};
</script>
