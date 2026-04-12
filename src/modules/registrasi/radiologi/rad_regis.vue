<template lang="">
  <div class="w-100">
    <tas-base-crud ref="crud-rad_regis" :config="buildConfig" :classes="registrasi_id ? '-' : 'container-fluid'" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch" :mockSlave="false">
      <template v-slot:list-diagnosa="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.diagnosa" :key="'a123eA' + item.id + a">{{ item.nama_diagnosa }}</li>
        </ul>
      </template>
      <template v-slot:list-list_test="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.list_test" :key="'bAWQ3R' + item.id + a">{{ item.nama_rad_test }}</li>
        </ul>
      </template>

      <template v-slot:detail-diagnosa="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.diagnosa" :key="'cAsr321' + item.id + a">{{ item.nama_diagnosa }}</li>
        </ul>
      </template>
      <template v-slot:detail-list_test="rowData">
        <ul>
          <li v-for="(item, a) in rowData.rowData.list_test" :key="'d124zswd' + item.id + a">{{ item.nama_rad_test }}</li>
        </ul>
      </template>

      <template v-slot:list-table-action="rowData">
        <button class="btn btn-primary mr-1" @click="$refs['crud-rad_regis'].getEvent('detail', rowData.rowData)"><i class="ri-information-line"></i> Lihat Request & Hasil</button>
        <button class="btn btn-info mr-1" @click="useRegistration(rowData.rowData)" v-if="(rowData.rowData.is_registrasi === false || rowData.rowData.registrasi_id == '') && rowData.rowData.status != 4"><i class="ri-hospital-line"></i> Update Kunjungan</button>
        <button v-if="rowData.rowData.status == 0" class="btn btn-danger mr-1" @click="showCancellationModal(rowData.rowData)" title="Batalkan Pemeriksaan"><i class="ri-close-line"></i> Batal</button>
        <button class="btn btn-info mr-1" @click="printLabelRadiologi(rowData.rowData)" title="Cetak Label Radiologi" v-if="rowData.rowData.status >= 0"><i class="ri-price-tag-3-line"></i> Cetak Label</button>
      </template>
      <template v-slot:list-action-append="rowData">
        <!-- Button Download Recap -->
        <button class="btn btn-warning ml-3" @click="downloadRecap(rowData.rowData)">
          <i class="ri-download-2-line"></i>
          Download Rekap Pasien
        </button>
        <!-- Download Rekap Waktu Tunggu -->
        <button class="btn btn-info ml-3" @click="downloadRecapWaktuTunggu(rowData.rowData)">
          <i class="ri-download-2-line"></i>
          Download Rekap Waktu Tunggu
        </button>
        <!-- Download Rekap Pembatalan -->
        <button class="btn btn-danger ml-3" @click="downloadRecapPembatalan(rowData.rowData)">
          <i class="ri-download-2-line"></i>
          Download Rekap Pembatalan
        </button>
        <!-- Statistik New Request -->
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

        <!-- Cancellation Alert for Status 0 and 1 -->
        <div class="alert alert-custom alert-light-danger fade show mb-5" role="alert" v-if="rowData.rowData && rowData.rowData.status <= 1">
          <div class="alert-icon"><i class="ri-alert-line"></i></div>
          <div class="alert-text"><strong>Perhatian!</strong> Registrasi ini dapat dibatalkan jika pasien tidak melanjutkan pemeriksaan.</div>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-danger" @click="showCancellationModal(rowData.rowData)"><i class="ri-close-line"></i> Batalkan Pemeriksaan</button>
            <button class="btn btn-primary" v-if="rowData.rowData.status < 1" @click="updateStatus(rowData.rowData, 1)">
              Proses
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>

        <!-- Status Cancelled Alert -->
        <div class="alert alert-custom alert-light-info fade show mb-5" role="alert" v-if="rowData.rowData && rowData.rowData.status === 4">
          <div class="alert-icon"><i class="ri-information-line"></i></div>
          <div class="alert-text">
            <strong>Registrasi Dibatalkan</strong><br />
            <small v-if="rowData.rowData.cancelled_at">
              Dibatalkan pada: {{ formatDate(rowData.rowData.cancelled_at) }}<br />
              Alasan: {{ rowData.rowData.cancelled_reason || "Tidak ada alasan" }}
            </small>
          </div>
        </div>
      </template>
    </tas-base-crud>

    <b-modal id="modal-use-registration" title="Update Kunjungan Radiologi" hide-footer>
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
      <template v-else
        ><h5 class="text-danger">Data tidak ditemukan</h5>
        <pre>{{ dataObject }}</pre>
      </template>
    </b-modal>

    <!-- Cancellation Modal -->
    <b-modal v-model="showCancelModal" size="md" title="Konfirmasi Pembatalan Registrasi" hide-footer>
      <div v-if="selectedItemForCancel">
        <!-- Patient Information -->
        <div class="alert alert-info mb-4">
          <h6 class="alert-heading"><i class="ri-user-line"></i> Informasi Pasien</h6>
          <div class="row">
            <div class="col-md-6">
              <strong>Nama:</strong> {{ selectedItemForCancel.nama_lengkap }}<br />
              <strong>No. RM:</strong> {{ selectedItemForCancel.no_rm || "-" }}
            </div>
            <div class="col-md-6">
              <strong>Tanggal Request:</strong> {{ formatDate(selectedItemForCancel.tanggal_request) }}<br />
              <strong>Penunjang:</strong> {{ selectedItemForCancel.nama_penunjang }}
            </div>
          </div>
        </div>

        <!-- Cancellation Form -->
        <form @submit.prevent="prosesPembatalan">
          <div class="form-group mb-3">
            <label for="cancellationReason"> Alasan Pembatalan <span class="text-danger">*</span> </label>
            <textarea id="cancellationReason" v-model="cancellationReason" class="form-control" rows="4" placeholder="Contoh: Pasien tidak datang, Pasien menolak pemeriksaan, dll." required minlength="10"></textarea>
            <small class="form-text text-muted">Minimal 10 karakter</small>
          </div>

          <!-- Warning -->
          <div class="alert alert-warning mb-3">
            <i class="ri-alert-line"></i>
            <strong>Perhatian!</strong> Tindakan ini akan membatalkan registrasi radiologi dan tidak dapat dibatalkan kembali.
          </div>

          <!-- Action Buttons -->
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" @click="closeCancellationModal"><i class="ri-close-line"></i> Batal</button>
            <button type="submit" class="btn btn-danger" :disabled="isCancelling || !cancellationReason || cancellationReason.length < 10">
              <i v-if="isCancelling" class="ri-loader-4-line spin"></i>
              <i v-else class="ri-close-line"></i>
              {{ isCancelling ? "Membatalkan..." : "Batalkan Pemeriksaan" }}
            </button>
          </div>
        </form>
      </div>
    </b-modal>

    <!-- Print Label Template -->
    <div id="print-label-radiologi" style="position: relative; display: none">
      <div size="A4" style="width: 100%; max-width: 300px; margin: 0 auto">
        <div style="border: 2px solid #000; padding: 15px; background: white">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 10px">
            <h5 style="margin: 0; font-size: 14px; font-weight: bold">RSUD BUTON SELATAN</h5>
            <h6 style="margin: 5px 0 0 0; font-size: 12px; font-weight: bold">LABEL RADIOLOGI</h6>
          </div>

          <!-- Patient Information -->
          <table style="width: 100%; border-collapse: collapse; font-size: 11px">
            <tr>
              <td style="padding: 3px; font-weight: bold; width: 30%">No. RM:</td>
              <td style="padding: 3px">{{ selectedDataForPrint.no_rm || "-" }}</td>
            </tr>
            <tr>
              <td style="padding: 3px; font-weight: bold; vertical-align: top">Nama:</td>
              <td style="padding: 3px">{{ selectedDataForPrint.nama_lengkap || "-" }}</td>
            </tr>
            <tr>
              <td style="padding: 3px; font-weight: bold">Tanggal:</td>
              <td style="padding: 3px">{{ formatDate(selectedDataForPrint.tanggal_request) }}</td>
            </tr>
            <tr>
              <td style="padding: 3px; font-weight: bold; vertical-align: top">Dokter:</td>
              <td style="padding: 3px">{{ selectedDataForPrint.nama_dokter || "-" }}</td>
            </tr>
          </table>

          <!-- Pemeriksaan -->
          <div style="margin: 10px 0">
            <div style="font-weight: bold; font-size: 11px; margin-bottom: 3px">Pemeriksaan:</div>
            <ul style="margin: 0; padding-left: 15px; font-size: 10px">
              <li v-for="(item, index) in selectedDataForPrint.list_test" :key="'test-' + index" style="margin: 2px 0">
                {{ item.nama_rad_test }}
              </li>
            </ul>
          </div>

          <!-- Cito Status -->
          <div style="text-align: center; margin: 10px 0">
            <span :class="selectedDataForPrint.is_cito ? 'badge' : 'badge-secondary'" :style="selectedDataForPrint.is_cito ? 'background-color: #dc3545; color: white;' : 'background-color: #6c757d; color: white;'" style="padding: 3px 8px; font-size: 10px">
              {{ selectedDataForPrint.is_cito ? "CITO" : "REGULER" }}
            </span>
          </div>

          <!-- QR Code -->
          <div style="text-align: center; margin-top: 10px; border-top: 1px solid #ccc; padding-top: 10px">
            <img :src="'https://api.qrserver.com/v1/create-qr-code?color=000000&bgcolor=FFFFFF&data=' + selectedDataForPrint.rad_regis_id + '&qzone=1&margin=0&size=100x100&ecc=L'" alt="QR Code" style="width: 80px; height: 80px" />
            <div style="font-size: 8px; margin-top: 3px">ID: {{ selectedDataForPrint.rad_regis_id ? selectedDataForPrint.rad_regis_id.substring(0, 8) : "XXXX" }}...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import print from "../../../components/print.js";

export default {
  name: "crud-rad_regis",
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
      // Cancellation modal data
      showCancelModal: false,
      selectedItemForCancel: null,
      cancellationReason: "",
      isCancelling: false,

      // Print label data
      selectedDataForPrint: {},

      config: {
        title: "Registrasi Radiologi",
        model_api: "rad_regis",
        getter: "rad_regis",
        setter: "rad_regis",
        pk_field: "rad_regis_id",
        frontendPaginate: false,
        permission: {
          create: "template-allow-all",
          // read: 'template-allow-all',
          read: false,
          update: "template-allow-all",
          delete: "template-allow-all",
        },
        slave: [
          {
            name: "Daftar Hasil Radiologi",
            module: "registrasi/radiologi/rad_hasil",
            as_param: "rad_regis_id",
            key_field: "rad_regis_id",
            overwrite: {
              filter_api: {
                id: "",
              },
              permission: {
                create: false,
                read: false,
                update: false,
                delete: false,
              },
              fields: [
                { rule: "1.methods.list", value: false },
                { rule: "1.methods.detail", value: false },
                { rule: "1.methods.create", value: { type: "hidden" } },
                { rule: "1.methods.update", value: { type: "hidden" } },
                { rule: "1.methods.filter", value: false },
              ],
            },
          },
        ],
        filter_api: {
          registrasi_id: "",
        },
        fields: [
          // rad_regis_id
          {
            id: "rad_regis_id",
            data: "rad_regis_id",
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
              list: { transform: "date" },
              detail: { transform: "date" },
              create: { type: "date", validation: ["required"] },
              update: { type: "date", validation: ["required"] },
              filter: { type: "date" },
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
                class: { 0: "badge badge-success", 1: "badge badge-warning", 2: "badge badge-primary", 3: "badge badge-info", 4: "badge badge-danger" },
                transform: "statusPenunjang",
              },
              detail: {
                class: { 0: "badge badge-success", 1: "badge badge-warning", 2: "badge badge-primary", 3: "badge badge-info", 4: "badge badge-danger" },
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
                type: "radio",
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
              update: {
                type: "radio",
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
                },
              },
              filter: false,
            },
          },
          // no_kunjungan
          {
            id: "no_kunjungan",
            data: "no_kunjungan",
            label: "No Kunjungan",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
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
          // ms_dokter_id
          {
            id: "ms_dokter_id",
            data: "ms_dokter_id",
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

          // list_test
          {
            id: "list_test",
            data: "list_test",
            label: "Daftar Pemeriksaan",
            placeholder: "Pilih Daftar Pemeriksaan",
            methods: {
              list: { type: "row-slot" },
              detail: { type: "row-slot" },
              create: {
                setter: "rad_test",
                getter: "rad_test",
                type: "lookup-checkbox",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_rad_test",
                    code: "rad_test_id",
                    display: ["nama_rad_test"],
                    headerDisplay: ["Nama RAD Test"],
                    render_view: (data, rowData) => {
                      let child = "";
                      if (rowData.rad_test_list) {
                        for (const item of rowData.rad_test_list) {
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
                setter: "rad_test",
                getter: "rad_test",
                type: "lookup-checkbox",
                validation: ["required"],
                option: {
                  list_pointer: {
                    label: "nama_rad_test",
                    code: "rad_test_id",
                    display: ["nama_rad_test"],
                    headerDisplay: ["Nama RAD Test"],
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
          // proyeksi
          {
            id: "proyeksi",
            data: "proyeksi",
            label: "Proyeksi",
            placeholder: "Ketik Proyeksi",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // kv
          {
            id: "kv",
            data: "kv",
            label: "KV",
            placeholder: "Ketik KV",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // mas
          {
            id: "mas",
            data: "mas",
            label: "mAS",
            placeholder: "Ketik mAS",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // ffd
          {
            id: "ffd",
            data: "ffd",
            label: "FFD",
            placeholder: "Ketik FFD",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // bsf
          {
            id: "bsf",
            data: "bsf",
            label: "BSF",
            placeholder: "Ketik BSF",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // inak
          {
            id: "inak",
            data: "inak",
            label: "Inak",
            placeholder: "Ketik Inak",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // jumlah_penyinaran
          {
            id: "jumlah_penyinaran",
            data: "jumlah_penyinaran",
            label: "Jumlah Penyinaran",
            placeholder: "Ketik Jumlah Penyinaran",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // dosis_radiasi
          {
            id: "dosis_radiasi",
            data: "dosis_radiasi",
            label: "Dosis Radiasi",
            placeholder: "Ketik Dosis Radiasi",
            methods: {
              list: true,
              detail: true,
              create: { type: "text", validation: [] },
              update: { type: "text", validation: [] },
              filter: false,
            },
          },
          // keterangan_rad_regis
          {
            id: "keterangan_rad_regis",
            data: "keterangan_rad_regis",
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
          // lis
          // {
          //   id: 'lis',
          //   data: 'lis',
          //   label: 'LIS',
          //   placeholder: 'Pilih LIS',
          //   methods: {
          //     list: {
          //       type: 'row-slot',
          //     },
          //     detail: {
          //       type: 'row-slot',
          //     },
          //     create: false,
          //     update: false,
          //     filter: false
          //   }
          // },
        ],
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,

      detail_status: 1,
      dataObject: {
        registrasi_id: "",
      },
      showToastServerLis: false,

      intervalStatistic: null,
      statistic: {
        new: 0,
      },
    };
  },
  watch: {
    "$route.query.view": {
      handler: function (val) {
        let query = this.$route.query;
        if (val && query.view && query.view === "detail" && query.id) {
          // console.log(query.id)
          this.handleSlaveOverride(query.id);
        }
      },
      immediate: true,
    },
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
        fields[6] = {
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

    labelDataReady() {
      return this.selectedDataForPrint && this.selectedDataForPrint.rad_regis_id && this.selectedDataForPrint.nama_lengkap;
    },
  },
  mounted() {
    this.getStatistic();

    this.intervalStatistic = setInterval(() => {
      console.log("Interval statistic start");
      this.getStatistic();
    }, 10000);
  },
  beforeDestroy() {
    // destroyed  in Vue 2
    console.log("Interval statistic cleared");
    clearInterval(this.intervalStatistic);
  },
  methods: {
    useRegistration(data) {
      this.$bvModal.show("modal-use-registration");
      // this.registrasi_id = false;
      this.dataObject = data;
      if (data.registrasi_id) this.dataObject.registrasi_id = data.registrasi_id;
      else this.dataObject.registrasi_id = "";

      // this.$_alert.confirm('Konfirmasi', 'Apakah anda yakin ingin menggunakan registrasi radiologi ini?').then((res) => {
      //   if (res.isConfirmed) {
      //     this.$_api.update('rad_regis', { ...data, id: data.rad_regis_id, is_registrasi: true }).then((res) => {
      //       this.$refs['crud-rad_regis'].$children[1].getData();
      //     });`
      //   }
      // })
    },
    useSubmitRegistration() {
      this.$_alert.confirm("Konfirmasi", "Apakah anda yakin ingin menggunakan kunjungan ini?").then((res) => {
        if (res.isConfirmed) {
          this.$_api
            .update("rad_regis", { ...this.dataObject, id: this.dataObject.rad_regis_id, is_registrasi: true })
            .then((res) => {
              this.$refs["crud-rad_regis"].$children[1].getData();
              this.$bvModal.hide("modal-use-registration");
            })
            .catch((err) => {
              this.$refs["crud-rad_regis"].$children[1].getData();
              this.$bvModal.hide("modal-use-registration");
            });
        } else {
          this.$bvModal.hide("modal-use-registration");
        }
      });
    },
    handleSlaveOverride(id) {
      this.$_api.post("rad_regis/detailsById", { id: id, data: { id } }).then((res) => {
        console.log("ttttttttttttttttttttttttttttttt", res, this.config.slave[0]);
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
        } else {
          this.config.slave[0].overwrite.permission = {
            create: false,
            read: false,
            update: false,
            delete: false,
          };
          this.config.slave[0].overwrite.filter_api.id = "";
          this.$_alert.error({}, "Hasil radiologi tidak dapat isi sebelum kunjungan diperbarui");
        }
        this.$refs["crud-rad_regis"].moduleChange(this.config);
      });
    },
    updateRadRegis(data) {
      console.log(this.$refs["crud-rad_regis"]);

      return;
      this.$_api
        .update("rad_regis", { ...data, id: data.rad_regis_id })
        .then((res) => {
          this.$_alert.success("Berhasil memperbarui");
        })
        .catch((err) => {
          this.$_alert.error({}, "Gagal memperbarui");
        });
    },
    updateStatus(data, status) {
      const base = this.$refs["crud-rad_regis"].$children[1];

      // base.getData(data.rad_regis_id, false)
      // console.log(
      //   base.$children
      // )
      // base.$children[0].getDataRegis()

      const currentID = this.$route.query.id;
      this.$_alert.confirm("Anda yakin ingin memproses?").then((x) => {
        if (x.isConfirmed) {
          this.$_api
            .update("rad_regis", { ...data, id: data.rad_regis_id, status })
            .then((res) => {
              // REFRESH
              this.$router.push({ name: this.$route.name, query: { view: "list", id: currentID }, params: { id: currentID } }).then(() => {
                this.$router.push({ name: this.$route.name, query: { view: "detail", id: currentID }, params: { id: currentID } }).then(() => {
                  this.$_alert.success("Berhasil memperbarui");
                });
              });
            })
            .catch((err) => {
              this.$_alert.error({}, "Gagal memperbarui");
            });
        }
      });
    },

    // Cancellation Methods
    showCancellationModal(item) {
      console.log("===> rad_regis.vue:999 ~ item", item);
      // Validate if item can be cancelled
      if (item.status > 1) {
        this.$_alert.error({}, "Terjadi Kesalahan", "Registrasi tidak dapat dibatalkan karena sudah dalam proses pemeriksaan.");
        return;
      }

      this.selectedItemForCancel = item;
      this.cancellationReason = "";
      this.showCancelModal = true;
    },

    closeCancellationModal() {
      this.showCancelModal = false;
      this.selectedItemForCancel = null;
      this.cancellationReason = "";
      this.isCancelling = false;
    },

    async prosesPembatalan() {
      if (!this.selectedItemForCancel || !this.cancellationReason || this.cancellationReason.length < 10) {
        this.$_alert.error("Alasan pembatalan harus diisi minimal 10 karakter");
        return;
      }

      this.isCancelling = true;

      try {
        const response = await this.$_api.post("rad_regis/cancel", {
          id: this.selectedItemForCancel.rad_regis_id,
          reason: this.cancellationReason,
        });

        if (response.status === 200) {
          this.$_alert.success("Registrasi radiologi berhasil dibatalkan");

          // Close modal and reset data
          this.closeCancellationModal();

          // Refresh data
          this.$refs["crud-rad_regis"].$children[1].getData();
        } else {
          this.$_alert.error(response.message || "Gagal membatalkan registrasi");
        }
      } catch (error) {
        console.error("Error cancelling registration:", error);

        // Handle specific error messages
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || error.response.data.error;
          this.$_alert.error(errorMessage || "Terjadi kesalahan saat membatalkan registrasi");
        } else {
          this.$_alert.error("Terjadi kesalahan saat membatalkan registrasi");
        }
      } finally {
        this.isCancelling = false;
      }
    },

    formatDate(date) {
      if (!date) return "-";
      return this.$moment(date).format("DD MMM YYYY HH:mm");
    },

    getStatistic() {
      this.$_api.post("rad_regis/statistic").then((res) => {
        this.statistic = res.data;
      });
    },

    downloadRecap() {
      this.$_api
        .downloadFile("rad_expertise/patient-recap/export-excel", {}, "rekap.xlsx")
        .then((res) => {
          this.$_alert.success("Download Rekap Berhasil");
        })
        .catch((err) => {
          this.$_alert.error({}, "Download Rekap Gagal");
        });
    },

    downloadRecapWaktuTunggu() {
      this.$_api
        .downloadFile("rad_expertise/waiting-time-analysis/export-excel", {}, "rekap-waktu-tunggu.xlsx")
        .then((res) => {
          this.$_alert.success("Download Rekap Waktu Tunggu Berhasil");
        })
        .catch((err) => {
          this.$_alert.error({}, "Download Rekap Waktu Tunggu Gagal");
        });
    },
    downloadRecapPembatalan() {
      this.$_api
        .downloadFile("rad_expertise/cancellation-analysis/export-excel", {}, "rekap-pembatalan.xlsx")
        .then((res) => {
          this.$_alert.success("Download Rekap Pembatalan Berhasil");
        })
        .catch((err) => {
          this.$_alert.error({}, "Download Rekap Pembatalan Gagal");
        });
    },

    // Print Label Radiologi
    printLabelRadiologi(data) {
      if (!data) {
        this.$_alert.error({}, "Data tidak tersedia untuk cetak label");
        return;
      }

      this.selectedDataForPrint = data;

      // Ensure list_test exists
      if (!this.selectedDataForPrint.list_test) {
        this.selectedDataForPrint.list_test = [];
      }

      this.$nextTick(() => {
        this.printLabel();
      });
    },

    async printLabel() {
      if (!this.labelDataReady) {
        this.$_alert.error({}, "Data label tidak lengkap, tidak dapat mencetak");
        return;
      }

      let options = {
        name: "_blank",
        specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
        styles: ["/static/assets/cetak/paper-a4.css"],
        timeout: 1000,
        autoClose: true,
        windowTitle: window.document.title,
      };

      print("print-label-radiologi", options);
    },
  },
};
</script>
