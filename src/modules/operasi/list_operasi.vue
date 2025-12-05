<template>
  <div class="w-100">
    <tas-base-crud
      ref="list-operasi"
      :config="config"
      :filterView="filterView"
      :hideFilter="hideFilter"
      :hideGlobalSearch="true"
    >
      <template v-slot:list-action-append="rowData">
        <!-- Button Download Recap -->
        <button class="btn btn-warning ml-3" @click="downloadRecap(rowData.rowData)">
          <i class="ri-download-2-line"></i>
          Download Rekap Operasi
        </button>
      </template>
      <template v-slot:subtitle="data">
        <!-- <pre>
                  {{ data.data.count }}
              </pre> -->
        <p class="mb-0 col-12 pl-0">
          Total Kunjungan : {{ data.data.count || "0" }}
        </p>
      </template>

      <template v-slot:list-data_diagnosa="rowData">
        <ul class="pl-5 mb-0">
          <li
            v-for="(el, ix) in rowData.rowData.data_diagnosa"
            :key="'dtdg' + ix"
          >
            {{ el.nama_diagnosa }}
          </li>
        </ul>
      </template>
      <template v-slot:detail-data_diagnosa="rowData">
        <ul class="pl-5 mb-0">
          <li
            v-for="(el, ix) in rowData.rowData.data_diagnosa"
            :key="'dtdg' + ix"
          >
            {{ el.nama_diagnosa }}
          </li>
        </ul>
      </template>

      <template v-slot:detail-footer="rowData">
        <intraOperasi
          v-if="rowData && rowData.rowData && rowData.rowData.jadwal_operasi_id"
          :status="rowData.rowData.status"
          :jadwal_operasi_id="rowData.rowData.jadwal_operasi_id"
        />
        
        <hasilOperasi
          v-if="rowData && rowData.rowData && rowData.rowData.jadwal_operasi_id"
          :status="rowData.rowData.status"
          :jadwal_operasi_id="rowData.rowData.jadwal_operasi_id"
        />
      </template>

      <template v-slot:list-table-action="rowData">
        <button
          class="btn btn-danger mr-1"
          @click="setListOperasi(rowData.rowData.jadwal_operasi_id, 1)"
          v-if="rowData.rowData.status === 1"
        >
          <i class="ri-close-line"></i>Set Batal
        </button>
        <button
          class="btn btn-warning mr-1"
          @click="setListOperasi(rowData.rowData.jadwal_operasi_id, 2)"
          v-if="rowData.rowData.status === 2"
        >
          <i class="ri-survey-line"></i>Set Menunggu
        </button>
        <button
          class="btn btn-primary mr-1"
          @click="setListOperasi(rowData.rowData.jadwal_operasi_id, 3)"
          v-if="rowData.rowData.status === 1"
        >
          <i class="ri-play-line"></i>Set Proses
        </button>
        <button
          class="btn btn-success mr-1"
          @click="setListOperasi(rowData.rowData.jadwal_operasi_id, 4)"
          v-if="rowData.rowData.status === 2"
        >
          <i class="ri-hospital-line"></i>Set Selesai
        </button>
      </template>
    </tas-base-crud>
  </div>
</template>

<script>
import moment from "moment";

import hasilOperasi from "./hasil_operasi.vue";
import intraOperasi from "./intra_operasi.vue";

moment.locale("id");

export default {
  name: "list-operasi",
  components: { hasilOperasi, intraOperasi },
  data() {
    return {
      showToastDownload: false,
      tesAsyncData: {},
      config: {
        title: "List Jadwal Pasien Operasi",
        // model_api: 'bank',
        getter: "jadwal_operasi",
        setter: "jadwal_operasi",
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: false,
          read: "template-allow-all",
          update: false,
          delete: false,
        },
        filter_api: {
          //   tanggal_operasi: moment(new Date()).format("YYYY-MM-DD"),
        },
        slave: [
          {
            name: 'Daftar BMHP & Obat',
            module: 'operasi/input_bmhp',
            as_param: 'jadwal_operasi_id',
            key_field: 'jadwal_operasi_id',
            overwrite: {
              filter_api: {
                'id': '',
              },
              fields: [
                // { rule: '1.methods.list', value: false },
                // { rule: '1.methods.detail', value: false },
                // { rule: '1.methods.create', value: { type: 'hidden', } },
                // { rule: '1.methods.update', value: { type: 'hidden', } },
                // { rule: '1.methods.filter', value: false },

                // { rule: '2.methods.create', value: { type: 'hidden', } },
                // { rule: '2.methods.update', value: { type: 'hidden', } },
                // { rule: '2.methods.filter', value: false },

                // { rule: '4.methods.update', value: { disabled: true } }, // Antrian
              ]
            }
          }
        ],
        fields: [
          // registrasi_id
          {
            id: "registrasi_id",
            data: "registrasi_id",
            label: "Registrasi ID",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false,
            },
          },
          // {
          //   id: "tgl_awal",
          //   data: "tgl_awal",
          //   label: "Tanggal Awal",
          //   placeholder: null,
          //   methods: {
          //     list: false,
          //     detail: false,
          //     create: false,
          //     update: false,
          //     filter: {
          //       type: "date",
          //       class: "col-4",
          //       value: moment(new Date()).format("YYYY-MM-DD"),
          //     },
          //   },
          // },
          // {
          //   id: "tgl_akhir",
          //   data: "tgl_akhir",
          //   label: "Tanggal Akhir",
          //   placeholder: null,
          //   methods: {
          //     list: false,
          //     detail: false,
          //     create: false,
          //     update: false,
          //     filter: {
          //       type: "date",
          //       class: "col-4",
          //       value: moment(new Date()).format("YYYY-MM-DD"),
          //     },
          //   },
          // },
          // {
          //   id: "tgl_registrasi",
          //   data: "tgl_registrasi",
          //   label: "Tanggal Kunjungan",
          //   placeholder: null,
          //   methods: {
          //     list: { transform: "longDateTime" },
          //     detail: { transform: "longDateTime" },
          //     create: false,
          //     update: false,
          //     filter: {
          //       type: "date",
          //       class: "col-4",
          //       value: moment(new Date()).format("YYYY-MM-DD"),
          //     },
          //   },
          // },
          {
            id: "tanggal_operasi",
            data: "tanggal_operasi",
            label: "Tanggal Operasi",
            placeholder: null,
            methods: {
              list: { transform: "longDateTime" },
              detail: { transform: "longDateTime" },
              create: false,
              update: false,
              filter: {
                type: "date",
                class: "col-4",
                // value: moment(new Date()).format("YYYY-MM-DD"),
              },
            },
          },
          // {
          //   id: "kode_booking",
          //   data: "kode_booking",
          //   label: "Kode Booking",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          {
            id: "nama_lengkap",
            data: "nama_lengkap",
            label: "Nama Pasien",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "status",
            data: "status",
            label: "Status",
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: {
                  0: "label font-weight-bold label-lg label-inline label-bold label-light-danger",
                  1: "label font-weight-bold label-lg label-inline label-bold label-light-warning",
                  2: "label font-weight-bold label-lg label-inline label-bold label-light-primary",
                  3: "label font-weight-bold label-lg label-inline label-bold label-light-success",
                },
                transform: "status_operasi",
              },
              detail: {
                class: {
                  0: "label font-weight-bold label-lg label-inline label-bold label-light-danger",
                  1: "label font-weight-bold label-lg label-inline label-bold label-light-warning",
                  2: "label font-weight-bold label-lg label-inline label-bold label-light-primary",
                  3: "label font-weight-bold label-lg label-inline label-bold label-light-success",
                },
                transform: "status_operasi",
              },
              create: false,
              update: false,
              filter: false,
              //   {
              //     type: "lookup-radio",
              //     class: "col-4",
              //     option: {
              //       list_pointer: {
              //         label: "label",
              //         code: "code",
              //         list: [
              //           {
              //             label: "BATAL",
              //             code: 0,
              //           },
              //           {
              //             label: "MENUNGGU",
              //             code: 2,
              //           },
              //           {
              //             label: "DIPROSES",
              //             code: 3,
              //           },
              //           {
              //             label: "SELESAI",
              //             code: 4,
              //           },
              //         ],
              //         display: ["label"],
              //         headerDisplay: ["Status"], // (opsional) pastikan jumlah key sama dengan 'diplay', kalau kosong tidak ada header
              //       },
              //     },
              //   },
            },
          },
          {
            id: "waktu_mulai",
            data: "waktu_mulai",
            label: "Waktu Mulai",
            placeholder: null,
            methods: {
              list: { transform: "time" },
              detail: { transform: "time" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "waktu_selesai",
            data: "waktu_selesai",
            label: "Waktu Selesai",
            placeholder: null,
            methods: {
              list: { transform: "time" },
              detail: { transform: "time" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "ms_dokter_id",
            data: "ms_dokter_id",
            label: "Operator",
            placeholder: null,
            methods: {
              list: { view_data: "nama_dokter" },
              detail: { view_data: "nama_dokter" },
              create: false,
              update: false,
              filter: {
                setter: "msDokter",
                getter: "msDokter",
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "nama_dokter",
                    code: "ms_dokter_id",
                    display: ["nama_dokter", "nama_specialist"],
                    headerDisplay: ["Nama", "Spesialis"],
                  },
                },
              },
            },
          },
          {
            id: "ms_ruang_id",
            data: "ms_ruang_id",
            label: "Ruang",
            placeholder: null,
            methods: {
              list: { view_data: "nama_ruang" },
              detail: { view_data: "nama_ruang" },
              create: false,
              update: false,
              //   filter: false,
              filter: {
                setter: "msRuang",
                getter: "msRuang",
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "nama_ruang",
                    code: "id",
                    display: ["nama_ruang"],
                    headerDisplay: ["Nama Ruang"],
                  },
                },
              },
            },
          },
          {
            id: "ms_kelas_kamar_id",
            data: "ms_kelas_kamar_id",
            label: "Kelas Kamar",
            placeholder: null,
            methods: {
              list: { view_data: "nama_kelas_kamar" },
              detail: { view_data: "nama_kelas_kamar" },
              create: false,
              update: false,
              filter: {
                setter: "msKelasKamar",
                getter: "msKelasKamar",
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "nama_kelas_kamar",
                    code: "id",
                    display: ["nama_kelas_kamar"],
                    headerDisplay: ["Nama Kelas Kamar"],
                  },
                },
              },
            },
          },
          {
            id: "ms_jasa_id",
            data: "ms_jasa_id",
            label: "Operasi / Tindakan",
            placeholder: null,
            methods: {
              list: { view_data: "nama_jasa" },
              detail: { view_data: "nama_jasa" },
              create: false,
              update: false,
              //   filter: false,
              filter: {
                setter: "msJasa",
                getter: "msJasa",
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "nama_jasa",
                    code: "id",
                    display: ["nama_jasa"],
                    headerDisplay: ["Nama Jasa"],
                  },
                },
              },
            },
          },
          {
            id: "data_diagnosa",
            data: "data_diagnosa",
            label: "Diagnosa",
            placeholder: null,
            methods: {
              list: { type: "row-slot" },
              detail: { type: "row-slot" },
              create: false,
              update: false,
              filter: false,
            },
          },
          // {
          //   id: "no_rm",
          //   data: "no_rm",
          //   label: "No. RM",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: {
          //       type: "text",
          //       class: "col-4",
          //     },
          //   },
          // },
          // {
          //   id: "nik",
          //   data: "nik",
          //   label: "NIK",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: {
          //       type: "text",
          //       class: "col-4",
          //     },
          //   },
          // },
          // {
          //   id: "jenis_kelamin",
          //   data: "jenis_kelamin",
          //   label: "Jenis Kelamin",
          //   placeholder: null,
          //   methods: {
          //     list: {
          //       order: true,
          //       class: { L: "badge badge-primary", P: "badge badge-warning" },
          //       transform: "kelamin",
          //     },
          //     detail: {
          //       order: true,
          //       class: { L: "badge badge-primary", P: "badge badge-warning" },
          //       transform: "kelamin",
          //     },
          //     create: false,
          //     update: false,
          //     filter: {
          //       type: "lookup-radio",
          //       class: "col-4",
          //       option: {
          //         list_pointer: {
          //           label: "label",
          //           code: "code",
          //           list: [
          //             {
          //               label: "Semua",
          //               code: "",
          //               description: "Kamar ini aktif",
          //             },
          //             {
          //               label: "Laki-laki",
          //               code: "L",
          //               description: "Kamar ini non aktif",
          //             },
          //             {
          //               label: "Perempuan",
          //               code: "P",
          //               description: "Kamar ini non aktif",
          //             },
          //           ],
          //           display: ["label", "code"],
          //           headerDisplay: ["Jenis Kelamin", "Kode"], // (opsional) pastikan jumlah key sama dengan 'diplay', kalau kosong tidak ada header
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   id: "tempat_lahir",
          //   data: "tempat_lahir",
          //   label: "Tempat Lahir",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "tgl_lahir",
          //   data: "tgl_lahir",
          //   label: "Tanggal Lahir",
          //   placeholder: null,
          //   methods: {
          //     list: { transform: "date" },
          //     detail: { transform: "date" },
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "tgl_lahir",
          //   data: "tgl_lahir",
          //   label: "Umur",
          //   placeholder: null,
          //   methods: {
          //     list: { transform: "oldLong" },
          //     detail: { transform: "oldLong" },
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "golongan_darah_id",
          //   data: "golongan_darah_id",
          //   label: "Gol. Darah",
          //   placeholder: null,
          //   methods: {
          //     list: { view_data: "nama_golongan_darah" },
          //     detail: { view_data: "nama_golongan_darah" },
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "pekerjaan_id",
          //   data: "pekerjaan_id",
          //   label: "Pekerjaan",
          //   placeholder: null,
          //   methods: {
          //     list: { view_data: "nama_pekerjaan" },
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "alamat_sekarang",
          //   data: "alamat_sekarang",
          //   label: "Alamat Sekarang",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "alamat_ktp",
          //   data: "alamat_ktp",
          //   label: "Alamat KTP",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "agama",
          //   data: "agama",
          //   label: "Agama",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "nama_ayah",
          //   data: "nama_ayah",
          //   label: "Nama Ayah",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "nama_asuransi",
          //   data: "nama_asuransi",
          //   label: "Asuransi",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "no_asuransi_pasien",
          //   data: "no_asuransi_pasien",
          //   label: "No. Asuransi",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "bpjs_id",
          //   data: "bpjs_id",
          //   label: "Kelas BPJS",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: { value: "Kelas 1" },
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // perusahaan_tempat_bekerja
          // {
          //   id: "perusahaan_tempat_bekerja",
          //   data: "perusahaan_tempat_bekerja",
          //   label: "Perusahaan Tempat Berkerja",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // nip
          // {
          //   id: "nip",
          //   data: "nip",
          //   label: "NIP",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // nama_pasangan
          // {
          //   id: "nama_pasangan",
          //   data: "nama_pasangan",
          //   label: "Nama Pasangan",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // nama_ayah
          // {
          //   id: "nama_ayah",
          //   data: "nama_ayah",
          //   label: "Nama Ayah",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // nama_ibu
          // {
          //   id: "nama_ibu",
          //   data: "nama_ibu",
          //   label: "Nama Ibu",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // nama_penjamin
          // {
          //   id: "nama_penjamin",
          //   data: "nama_penjamin",
          //   label: "Nama Penjamin",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // hubungan_penjamin
          // {
          //   id: "hubungan_penjamin",
          //   data: "hubungan_penjamin",
          //   label: "Hubungan Penjamin",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // sc_whatsapp
          // {
          //   id: "sc_whatsapp",
          //   data: "sc_whatsapp",
          //   label: "No Whatsapp",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // // sc_email
          // {
          //   id: "sc_email",
          //   data: "sc_email",
          //   label: "Email",
          //   placeholder: null,
          //   methods: {
          //     list: true,
          //     detail: true,
          //     create: true,
          //     update: true,
          //     filter: false,
          //   },
          // },
          // {
          //   id: "data_diagnosa",
          //   data: "data_diagnosa",
          //   label: "Diagnosa",
          //   placeholder: null,
          //   methods: {
          //     list: { type: "row-slot" },
          //     detail: { type: "row-slot" },
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          // nama_bank
          // {
          //     id: 'no_rm',
          //     data: 'no_rm',
          //     label: 'Nama Bank',
          //     placeholder: null,
          //     methods: {
          //         list: true,
          //         detail: true,
          //         create: true,
          //         update: true,
          //         filter: {
          //             setter: 'msBank',
          //             getter: 'msBank',
          //             type: 'lookup-radio',
          //             class: 'col-6',
          //             option: {
          //                 list_pointer: {
          //                     label: 'nama_bank',
          //                     code: 'id',
          //                     display: ['nama_bank']
          //                 }
          //             }
          //         }
          //     }
          // },
        ],
      },
      filterView: true,
      hideFilter: false,
    };
  },
  // mounted () {
  //   console.log('BEFORE 1')
  //   setTimeout(async () => {
  //     console.log('BEFORE 2')
  //     let xx = await this.tesAsync()
  //     console.log('AFER 1')
  //     console.log(xx)
  //   }, 3000);
  // },
  methods: {
    async tesAsync() {
      console.log("INIT");
      return this.$_api.list("bank", {}).then((res) => {
        return res;
      });
    },
    download(endpoint, filters) {
      console.log("download file", filters);
      this.showToastDownload = true;
      this.$_api
        .downloadFile(
          endpoint,
          filters,
          "Laporan Harian - Kunjungan Pasien.xlsx"
        )
        .then((res) => {
          this.showToastDownload = false;
          console.log(res);
        });
    },
    // setBatal(jadwal_operasi_id) {
    //   console.log(jadwal_operasi_id);

    //   this.$_api
    //     .post("jadwal_operasi/set_batal", { jadwal_operasi_id })
    //     .then((res) => {
    //       this.$_alert.success("Berhasil membatalkan jadwal operasi");
    //     })
    //     .catch((err) => {
    //       this.$_alert.error({}, "Gagal membatalkan jadwal operasi");
    //     });
    // },
    // setMenunggu(jadwal_operasi_id) {
    //   console.log(jadwal_operasi_id);
    // },
    // setProses(jadwal_operasi_id) {
    //   console.log(jadwal_operasi_id);
    // },
    // setSelesai(jadwal_operasi_id) {
    //   console.log(jadwal_operasi_id);
    // },
    setListOperasi(jadwal_operasi_id, code_proses) {
      let status =
        code_proses == 1
          ? "batal"
          : code_proses == 2
          ? "menunggu"
          : code_proses == 3
          ? "proses"
          : "selesai";
      let ep = `jadwal_operasi/set_${status}`;
      this.$_alert
        .confirm(`Set ${status}`, `Anda akan merubah status menjadi ${status}`)
        .then((res) => {
          if (res.isConfirmed) {
            this.$_api
              .post(ep, { jadwal_operasi_id })
              .then((res) => {
                this.$_alert.success(`Set ${status} berhasil`);
                this.$refs["list-operasi"].$children[1].getData();
              })
              .catch((err) => {
                console.log(err.data.message);
                this.$_alert.error(
                  {},
                  `${err.data.message}, set ${status} gagal`
                );
              });
          }
        });
    },

    downloadRecap() {
      this.$_api.downloadFile('/hasil_operasi/laporan/rekap/export', {}, "rekap.xlsx").then((res) => {
        this.$_alert.success('Download Rekap Berhasil')
      }).catch((err) => {
        this.$_alert.error({}, 'Download Rekap Gagal')
      })
    },
  },
};
</script>
