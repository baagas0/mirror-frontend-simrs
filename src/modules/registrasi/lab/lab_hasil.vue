<template lang="">
  <div class="w-100">
    <tas-base-crud ref="BASE-CRUD-lab_hasil" :config="config">
      <template v-slot:list-nilai_r_d_perempuan_min="rowData">
        <span v-if="(rowData.rowData.operator === '>' || rowData.rowData.operator === '<') && !rowData.rowData.nilai_r_d_perempuan_max"> {{ rowData.rowData.operator }} </span>
        <span>{{ rowData.rowData.nilai_r_d_perempuan_min }}</span>
        <span v-if="rowData.rowData.operator === '-'"> {{ rowData.rowData.operator }} </span>
        <span v-if="rowData.rowData.nilai_r_d_perempuan_max && !['>', '<', '-'].includes(rowData.rowData.operator)">-</span>
        <span>{{ rowData.rowData.nilai_r_d_perempuan_max }}</span>
      </template>
      <template v-slot:detail-nilai_r_d_perempuan_min="rowData">
        <span v-if="(rowData.rowData.operator === '>' || rowData.rowData.operator === '<') && !rowData.rowData.nilai_r_d_perempuan_max"> {{ rowData.rowData.operator }} </span>
        <span>{{ rowData.rowData.nilai_r_d_perempuan_min }}</span>
        <span v-if="rowData.rowData.operator === '-'"> {{ rowData.rowData.operator }} </span>
        <span v-if="rowData.rowData.nilai_r_d_perempuan_max && !['>', '<', '-'].includes(rowData.rowData.operator)">-</span>
        <span>{{ rowData.rowData.nilai_r_d_perempuan_max }}</span>
      </template>

      <template v-slot:list-nilai_r_d_laki_min="rowData">
        <span v-if="(rowData.rowData.operator === '>' || rowData.rowData.operator === '<') && !rowData.rowData.nilai_r_d_laki_max"> {{ rowData.rowData.operator }} </span>
        <span>{{ rowData.rowData.nilai_r_d_laki_min }}</span>
        <span v-if="rowData.rowData.operator === '-'"> {{ rowData.rowData.operator }} </span>
        <span v-if="rowData.rowData.nilai_r_d_laki_max && !['>', '<', '-'].includes(rowData.rowData.operator)">-</span>
        <span>{{ rowData.rowData.nilai_r_d_laki_max }}</span>
      </template>
      <template v-slot:detail-nilai_r_d_laki_min="rowData">
        <span v-if="(rowData.rowData.operator === '>' || rowData.rowData.operator === '<') && !rowData.rowData.nilai_r_d_laki_max"> {{ rowData.rowData.operator }} </span>
        <span>{{ rowData.rowData.nilai_r_d_laki_min }}</span>
        <span v-if="rowData.rowData.operator === '-'"> {{ rowData.rowData.operator }} </span>
        <span v-if="rowData.rowData.nilai_r_d_laki_max && !['>', '<', '-'].includes(rowData.rowData.operator)">-</span>
        <span>{{ rowData.rowData.nilai_r_d_laki_max }}</span>
      </template>
      <template v-slot:list-action>
        <button class="btn btn-primary mr-2" :class="{ cetakLoading: 'spinner spinner-white spinner-right' }" @click="printLab()" :disabled="dataRegis.status < 1">
          <i class="ri-printer-line"></i>
          Cetak Lab
        </button>
        <button class="btn btn-info btn-circle mr-2" @click="goToPengambilanSampel()" :disabled="dataRegis.status < 1">
          <i class="ri-contrast-drop-2-line"></i>
          Pengambilan Sampel
        </button>
        <button class="btn btn-warning btn-circle mr-2" @click="createLabHasil()" :disabled="dataRegis.status < 1">
          <i class="ri-refresh-line p-0"></i>
          Buat Lab Hasil
        </button>

        <b-modal id="modal-sampel" title="Pengambilan Sampel" hide-footer>
          <s-input
            groupClass="mb-0"
            v-model="dataRegis.tanggal_ambil_sampel"
            :item="{
              label: 'Tanggal',
              id: 'tanggal_ambil_sampel',
              data: 'tanggal_ambil_sampel',
              type: 'datetime',
              validation: ['required'],
              formatDateView: 'DD MMM YYYY HH:mm',
            }"
            :valuee="dataRegis.tanggal_ambil_sampel" />

          <div class="d-flex gap-10">
            <button type="submit" class="btn btn-primary mr-3 w-100" @click="updateSampel()">
              <i class="ri-save-line"></i>
              Simpan
            </button>

            <button type="submit" class="btn btn-warning mr-3 w-100" :disabled="!dataRegis.tanggal_ambil_sampel" @click="printBarcode()">
              <i class="ri-printer-line"></i>
              Cetak Barcode
            </button>
          </div>
        </b-modal>
        <b-toast id="toast-detail-createLabHasil" variant="info" solid no-auto-hide no-close-button :visible="isLoadingSync">
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-center pt-2">
              <b-spinner label="Spinning" small></b-spinner>
              <strong class="mr-auto pl-3">Lab Hasil ...</strong>
              <small class="text-muted mr-2">
                <time-ago locale="id"></time-ago>
              </small>
            </div>
          </template>
          Sedang membuat lab hasil
          <b-progress class="mt-3" :value="syncCount" :max="1" animated></b-progress>
        </b-toast>
      </template>
    </tas-base-crud>

    <div id="print-barcode" style="display: none">
      <section class="content-print paper-58">
        <div class="sheet">
          <div class="w-100" style="border: 1px solid black; padding: 5%">
            <div style="width: 90%; height: 21mm; background-color: ; border: 1px solid black">
              <div style="width: 100%; display: flex">
                <div style="width: 50%">
                  <table border="0" class="custom-table">
                    <tbody>
                      <tr>
                        <td style="width: 8mm; font-size: 6pt">No. RM</td>
                        <td style="width: 0.5mm; font-size: 6pt">:</td>
                        <td style="font-size: 6pt">{{ dataRegis.no_rm }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="width: 50%">
                  <table border="0" class="custom-table">
                    <tbody>
                      <tr>
                        <td style="width: 10mm; font-size: 6pt">Tgl Lahir</td>
                        <td style="width: 0.5mm; font-size: 6pt">:</td>
                        <td style="font-size: 6pt">{{ dataRegis.tgl_lahir | parse("date") }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="w-100">
                <table border="0" class="custom-table">
                  <tbody>
                    <tr>
                      <td style="width: 8mm; font-size: 6pt">Nama</td>
                      <td style="width: 0.5mm; font-size: 6pt">:</td>
                      <td style="font-size: 6pt">{{ dataRegis.nama_lengkap }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="w-100-flex" style="justify-content: center; align-items: center">
                <div style="width: 96%; height: 8mm; display: flex; justify-content: center; align-items: center; border: 1px solid black">
                  <img :src="'https://api.qrserver.com/v1/create-qr-code?color=000000&bgcolor=FFFFFF&data=' + dataRegis.tanggal_ambil_sampel + '&qzone=1&margin=0&size=250x250&ecc=L'" alt="" style="width: 8mm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div id="cetak-lab-hasil" style="position: relative; display: none">
      <section class="content-print A4">
        <div class="sheet w-100">
          <div class="w-100" style="margin-top: 5mm">
            <h6 style="text-align: center; font-weight: bold; font-size: 12pt">HASIL LABORATORIUM</h6>
          </div>

          <div class="w-100" style="margin-top: 4mm">
            <table border="1" class="custom-table" style="font-size: 9pt">
              <tbody>
                <tr>
                  <!-- KIRI -->
                  <td style="width: 50%; vertical-align: top">
                    <table border="0" class="custom-table">
                      <tr>
                        <td>Nomor RM</td>
                        <td>:</td>
                        <td>{{ dataRegis.no_rm || "-" }}</td>
                      </tr>
                      <tr>
                        <td>No. Lab</td>
                        <td>:</td>
                        <td>{{ dataRegis.no_lab || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Nama Pasien</td>
                        <td>:</td>
                        <td>{{ dataRegis.nama_lengkap || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>{{ dataRegis.alamat_sekarang || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Umur / JK</td>
                        <td>:</td>
                        <td>
                          {{ dataRegis.tgl_lahir | parse("old") }} /
                          {{ dataRegis.jenis_kelamin | parse("kelamin") }}
                        </td>
                      </tr>
                      <tr>
                        <td>Dokter Pengantar</td>
                        <td>:</td>
                        <td>{{ dataRegis.nama_dokter || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Dokter Pengambil Hasil</td>
                        <td>:</td>
                        <td>{{ dataRegis.nama_dokter_pengambil_hasil || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Diagnosa</td>
                        <td>:</td>
                        <td>{{ dataRegis.diagnosa && dataRegis.diagnosa.length > 0 ? dataRegis.diagnosa.map((x) => x.nama_diagnosa).join(", ") : "-" }}</td>
                      </tr>
                    </table>
                  </td>

                  <!-- KANAN -->
                  <td style="width: 50%; vertical-align: top">
                    <table border="0" class="custom-table">
                      <tr>
                        <td>Ruang</td>
                        <td>:</td>
                        <td>{{ dataRegis.ruang || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Kelas</td>
                        <td>:</td>
                        <td>{{ dataRegis.kelas || "-" }}</td>
                      </tr>
                      <tr>
                        <td>No. Spesimen</td>
                        <td>:</td>
                        <td>{{ dataRegis.no_spesimen || "-" }}</td>
                      </tr>
                      <tr>
                        <td>Jam Terima Order</td>
                        <td>:</td>
                        <td>{{ dataRegis.tanggal_request | parse("longDateTime") }}</td>
                      </tr>
                      <tr>
                        <td>Selesai</td>
                        <td>:</td>
                        <td>{{ dataRegis.tanggal_selesai | parse("longDateTime") }}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="w-100" style="margin-top: 5mm">
            <table border="1" class="custom-table" style="font-size: 9pt">
              <thead>
                <tr>
                  <th style="width: 30%">PEMERIKSAAN</th>
                  <th style="width: 15%">HASIL</th>
                  <th style="width: 15%">SATUAN</th>
                  <th style="width: 20%">NILAI NORMAL</th>
                  <th style="width: 20%">KETERANGAN</th>
                </tr>
              </thead>

              <tbody v-for="(item, index) in hasilTree" :key="index">
                <!-- KATEGORI -->
                <tr>
                  <td colspan="5" style="font-weight: bold">
                    {{ item.nama_lab_paket }}
                  </td>
                </tr>

                <!-- SUB KATEGORI (contoh: URINE LENGKAP + ANALYZER) -->
                <tr v-if="item.sub_title">
                  <td colspan="5" style="padding-left: 4mm; font-style: italic">
                    {{ item.sub_title }}
                  </td>
                </tr>

                <!-- DETAIL PEMERIKSAAN -->
                <tr v-for="(h, i) in item.child" :key="i">
                  <td style="padding-left: 6mm">{{ h.nama_penunjang }}</td>
                  <td>{{ h.hasil }}</td>
                  <td>{{ h.satuan }}</td>
                  <td>P: {{ h.nilai_r_d_perempuan_min }} / L: {{ h.nilai_r_d_laki_min }}</td>
                  <td>{{ h.keterangan_lab_hasil }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="w-100" style="margin-top: 5mm">
            <table border="0" class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 50%"></td>
                  <td style="width: 50%">
                    <h6 style="text-align: center">
                      <span>Busel, {{ dateToday | parse("longDate") }}</span>
                    </h6>
                    <h6 style="text-align: center">Dokter yang memeriksa,</h6>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h6 style="text-align: center">
                      <span>{{ dataRegis.nama_dokter_pengambil_hasil || "-" }}</span>
                    </h6>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table td,
.custom-table th {
  padding: 2mm;
  vertical-align: top;
}

.custom-table th {
  text-align: center;
  font-weight: bold;
}
</style>

<script>
import print from "../../../components/print.js";

import moment from "moment";
moment.locale("id");

export default {
  name: "crud-lab_hasil",
  data() {
    return {
      dateToday: moment(new Date()).format("YYYY-MM-DD"),
      isLoadingSync: false,
      syncCount: 0,
      cetakLoading: false,
      dataRegis: {},
      hasilTree: [],
      config: {
        title: "Daftar Lab Hasil",
        model_api: "lab_hasil",
        getter: "lab_hasil",
        setter: "lab_hasil",
        pk_field: "id_lab_hasil",
        frontendPaginate: true,
        permission: {
          create: false,
          read: "template-allow-all",
          update: "template-allow-all",
          delete: false,
        },
        slave: [],
        fields: [
          // id_lab_hasil
          {
            id: "id_lab_hasil",
            data: "id_lab_hasil",
            label: "ID Lab Hasil",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false,
            },
          },
          // lab_paket_id
          {
            id: "lab_paket_id",
            data: "lab_paket_id",
            label: "Lab Paket",
            placeholder: null,
            methods: {
              list: { view_data: "nama_lab_paket" },
              detail: { view_data: "nama_lab_paket" },
              create: {
                setter: "lab_paket",
                getter: "lab_paket",
                type: "lookup-radio",
                validation: [],
                option: {
                  list_pointer: {
                    label: "nama_lab_paket",
                    code: "id_lab_paket",
                    display: ["nama_lab_paket", "keterangan_lab_paket"],
                  },
                },
              },
              update: {
                setter: "lab_paket",
                getter: "lab_paket",
                type: "lookup-radio",
                validation: [],
                option: {
                  list_pointer: {
                    label: "nama_lab_paket",
                    code: "id_lab_paket",
                    display: ["nama_lab_paket", "keterangan_lab_paket"],
                  },
                },
              },
              filter: true,
            },
          },
          // penunjang_id
          {
            id: "penunjang_id",
            data: "penunjang_id",
            label: "Penunjang",
            placeholder: null,
            methods: {
              list: { view_data: "nama_penunjang" },
              detail: { view_data: "nama_penunjang" },
              create: {
                setter: "penunjang",
                getter: "penunjang",
                type: "lookup-radio",
                validation: [],
                option: {
                  list_pointer: {
                    label: "nama_penunjang",
                    code: "penunjang_id",
                    display: ["nama_penunjang", "keterangan_penunjang"],
                  },
                },
              },
              update: {
                setter: "penunjang",
                getter: "penunjang",
                type: "lookup-radio",
                validation: [],
                option: {
                  list_pointer: {
                    label: "nama_penunjang",
                    code: "penunjang_id",
                    display: ["nama_penunjang", "keterangan_penunjang"],
                  },
                },
              },
              filter: true,
            },
          },
          // nama_lab_paket
          {
            id: "nama_lab_paket",
            data: "nama_lab_paket",
            label: "Lab Paket",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
          // queue
          // {
          //   id: 'queue',
          //   data: 'queue',
          //   label: 'Antrian',
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: true
          //   }
          // },
          // hasil
          {
            id: "hasil",
            data: "hasil",
            label: "Hasil",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: "textarea" },
              update: { type: "textarea" },
              filter: true,
            },
          },
          // satuan
          {
            id: "satuan",
            data: "satuan",
            label: "Satuan",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: {
                setter: "satuan",
                getter: "satuan",
                type: "lookup-radio",
                validation: [],
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    list: [
                      { label: "/uL", code: "/uL", description: "/uL" },
                      { label: "gr/dL", code: "gr/dL", description: "gr/dL" },
                      { label: "Juta/µL", code: "Juta/µL", description: "Juta/µL" },
                      { label: "fL", code: "fL", description: "fL" },
                      { label: "Pg", code: "Pg", description: "Pg" },
                      { label: "%", code: "%", description: "%" },
                      { label: "mg/dL", code: "mg/dL", description: "mg/dL" },
                      { label: "U/l", code: "U/l", description: "U/l" },
                      { label: "mmol/L", code: "mmol/L", description: "mmol/L" },
                      { label: "LPB", code: "LPB", description: "LPB" },
                      { label: "LPK", code: "LPK", description: "LPK" },
                      { label: "µIu/mL", code: "µIu/mL", description: "µIu/mL" },
                      { label: "pmol/L", code: "pmol/L", description: "pmol/L" },
                      { label: "ng/mL", code: "ng/mL", description: "ng/mL" },
                      { label: "Menit", code: "Menit", description: "Menit" },
                      { label: "-", code: "-", description: "-" },
                    ],
                    display: ["label", "code"],
                    headerDisplay: ["Label Satuan", ""], // (opsional) pastikan jumlah key sama dengan 'diplay', kalau kosong tidak ada header
                  },
                },
              },
              filter: true,
            },
          },
          // parameter_normal
          // {
          //   id: 'parameter_normal',
          //   data: 'parameter_normal',
          //   label: 'Parameter Normal',
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: true
          //   }
          // },
          // is_normal
          {
            id: "is_normal",
            data: "is_normal",
            label: "Normal",
            placeholder: null,
            methods: {
              list: {
                class: { false: "badge badge-danger", true: "badge badge-primary" },
                transform: "ynBool",
              },
              detail: {
                class: { false: "badge badge-danger", true: "badge badge-primary" },
                transform: "ynBool",
              },
              create: {
                type: "radio",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    list: [
                      { label: "Ya", code: true },
                      { label: "Tidak", code: false },
                    ],
                  },
                },
              },
              update: {
                type: "radio",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
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
          // keterangan_lab_hasil
          {
            id: "keterangan_lab_hasil",
            data: "keterangan_lab_hasil",
            label: "Keterangan",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: "textarea" },
              update: { type: "textarea" },
              filter: true,
            },
          },
          {
            id: "operator",
            data: "operator",
            label: "Operator Nilai",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: {
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Range (-)", code: "-" },
                      { label: "Kurang dari (<)", code: "<" },
                      { label: "Lebih dari (>)", code: ">" },
                      { label: "Sama dengan (=)", code: "=" },
                    ],
                  },
                },
              },
              update: {
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Range (-)", code: "-" },
                      { label: "Kurang dari (<)", code: "<" },
                      { label: "Lebih dari (>)", code: ">" },
                      { label: "Sama dengan (=)", code: "=" },
                    ],
                  },
                },
              },
              filter: true,
            },
          },
          // nilai_r_d_perempuan_min
          {
            id: "nilai_r_d_perempuan_min",
            data: "nilai_r_d_perempuan_min",
            label: "Dewasa Perempuan",
            placeholder: null,
            methods: {
              list: { type: "row-slot" },
              detail: { type: "row-slot" },
              create: { type: "decimal", validation: [] },
              update: { type: "decimal", validation: [] },
              filter: true,
            },
          },
          // nilai_r_d_perempuan_max
          {
            id: "nilai_r_d_perempuan_max",
            data: "nilai_r_d_perempuan_max",
            label: "Dewasa Perempuan Max",
            placeholder: null,
            conditionalShow: [{ code: "operator", operator: "includes", value: ["-"] }],
            methods: {
              list: false,
              detail: false,
              create: { type: "decimal", validation: [] },
              update: { type: "decimal", validation: [] },
              filter: true,
            },
          },
          // nilai_r_d_laki_min
          {
            id: "nilai_r_d_laki_min",
            data: "nilai_r_d_laki_min",
            label: "Dewasa Laki",
            placeholder: null,
            methods: {
              list: { type: "row-slot" },
              detail: { type: "row-slot" },
              create: { type: "decimal", validation: [] },
              update: { type: "decimal", validation: [] },
              filter: true,
            },
          },
          // nilai_r_d_laki_max
          {
            id: "nilai_r_d_laki_max",
            data: "nilai_r_d_laki_max",
            label: "Dewasa Laki Max",
            placeholder: null,
            conditionalShow: [{ code: "operator", operator: "includes", value: ["-"] }],
            methods: {
              list: false,
              detail: false,
              create: { type: "decimal", validation: [] },
              update: { type: "decimal", validation: [] },
              filter: true,
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getDataPrintLab();
    this.getDataRegis();
  },
  methods: {
    createLabHasil() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id;
        this.$bvToast.show("toast-detail-createLabHasil");
        this.isLoadingSync = true;
        this.syncCount = 0;
        this.$_api
          .post("lab_regis/createLabHasil", { id, forceUpdate: false })
          .then((res) => {
            setTimeout(() => {
              this.isLoadingSync = false;
              this.syncCount++;
              this.$_alert.success("Lab Hasil berhasil dibuat");

              // Refresh Slave
              if (this.$parent.slaveList.length > 0) {
                let slave = this.$parent.slaveList[0];
                slave.rules.permission = {
                  create: false,
                  read: false,
                  update: false,
                  delete: false,
                };
                // console.log(slave)
                this.$parent.setActiveSlave(slave);
              }
            }, 1000);
          })
          .catch((err) => {
            setTimeout(() => {
              // this.isLoadingSync = false
              // this.$_alert.error(err)
              this.isLoadingSync = false;
              this.syncCount++;
              this.$refs["BASE-CRUD-lab_hasil"].$children[1].getData();
              this.$_alert.error({}, err.data.data);
            }, 1000);
          });
      } else {
        this.$_alert.error({}, "Tidak dapat membuat lab hasil");
      }
    },
    getDataRegis() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id;
        this.$_api
          .post("lab_regis/list", { id: id })
          .then((res) => {
            this.cetakLoading = false;
            if (res && res.data && res.data.length) {
              this.dataRegis = res.data[0];
              this.dataRegis.tanggal_ambil_sampel = moment(this.dataRegis.tanggal_ambil_sampel).local().format("YYYY-MM-DD HH:mm:ss");
              // this.printLab()
            } else {
              this.cetakLoading = false;
              this.$_alert.error({}, "Terjadi Kesalahan.");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$_alert.error(err, "Terjadi Kesalahan. (Err:400)");
          });
      }
    },
    async getDataPrintLab2() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id;
        this.cetakLoading = true;

        const res = await this.$_api.post("lab_hasil/list", { lab_regis_id: id });

        const groupedData = res.data.reduce((groups, item) => {
          const { lab_paket_id, nama_lab_paket, keterangan_lab_paket } = item.list_lab_paket[0];

          if (!groups[lab_paket_id]) {
            groups[lab_paket_id] = {
              lab_paket_id,
              nama_lab_paket,
              keterangan_lab_paket,
              child: [],
            };
          }

          groups[lab_paket_id].child.push(item);

          return groups;
        }, {});

        this.hasilTree = Object.values(groupedData);
      }
    },
    getDataPrintLab() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id;
        this.cetakLoading = true;

        this.$_api
          .post("lab_hasil/list", { lab_regis_id: id })
          .then((res) => {
            console.log("res", res);

            const groupedData = res.data.reduce((groups, item) => {
              const { lab_paket_id, nama_lab_paket, keterangan_lab_paket } = item.list_lab_paket[0];

              if (!groups[lab_paket_id]) {
                groups[lab_paket_id] = {
                  lab_paket_id,
                  nama_lab_paket,
                  keterangan_lab_paket,
                  child: [],
                };
              }

              groups[lab_paket_id].child.push(item);

              return groups;
            }, {});

            this.hasilTree = Object.values(groupedData);

            //
          })
          .catch((err) => {
            console.log(err);
            this.cetakLoading = false;
            this.$_alert.error(err, "Terjadi Kesalahan.");
          });
      }
    },
    updateSampel() {
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id;
        const payload = {
          tanggal_ambil_sampel: this.dataRegis.tanggal_ambil_sampel,
          id: id,
        };

        if (this.dataRegis.status < 2) payload.status = 2;

        this.$_api
          .post("lab_regis/updateSampel", payload)
          .then(async (res) => {
            this.$_alert.success("Berhasil memperbarui");

            // REFRESH
            this.$router.push({ name: this.$route.name, query: { view: "list", id: id }, params: { id: id } }).then(() => {
              this.$router.push({ name: this.$route.name, query: { view: "detail", id: id }, params: { id: id } }).then(() => {
                this.$_alert.success("Berhasil memperbarui");
              });
            });

            // this.$_alert.confirm('Apakah anda ingin mencetak barcode?').then(async (res) => {
            //   if(res.isConfirmed) {
            //     await this.printBarcode()
            //   }
            // })
          })
          .catch((err) => {
            this.$_alert.error({}, "Gagal memperbarui");
          });
      } else {
        this.$_alert.error({}, "Tidak dapat memperbarui");
      }
    },
    async printBarcode() {
      let optionsss = {
        name: "_blank",
        specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
        styles: ["/static/assets/cetak/paper-58.css"],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      };

      //  this.$htmlToPaper(el, optionsss)
      print("print-barcode", optionsss);
    },
    async printLab() {
      await this.getDataPrintLab2();

      let optionsss = {
        name: "_blank",
        specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
        styles: ["/static/assets/cetak/paper-a4.css"],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      };

      //  this.$htmlToPaper(el, optionsss)
      print("cetak-lab-hasil", optionsss);
    },
    goToPengambilanSampel() {
      // Navigate to pengambilan sampel module with lab_regis_id parameter
      this.$router.push({
        name: "Lab Pengambilan Sampel",
        params: {
          lab_regis_id: this.$route.query.id,
        },
      });
    },
  },
};
</script>
