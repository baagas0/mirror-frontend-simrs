<template>
  <div class="w-100">
    <tas-base-crud
      :config="config"
      :filterView="filterView"
      :hideFilter="hideFilter"
      :hideGlobalSearch="true"
    >
      <template v-slot:subtitle="data">
        <!-- <pre>
                {{ data.data.count }}
            </pre> -->
        <p class="mb-0 col-12 pl-0">
          Total Kunjungan : {{ data.data.count || "0" }}
        </p>
      </template>
      <template v-slot:list-data_diagnosa="rowData">
        <ul class="pl-3">
          <li
            v-for="(el, ix) in rowData.rowData.data_diagnosa"
            :key="'dtdiag' + ix"
          >
            {{ el.nama_diagnosa }}
          </li>
        </ul>
      </template>

      <template v-slot:top-table="data">
        <!-- <pre>{{ data }}</pre>
            <pre>{{ data.data.filters }}</pre> -->
        <div
          class="alert alert-custom alert-light-warning fade show mb-5"
          role="alert"
        >
          <div class="alert-icon"><i class="ri-progress-3-fill"></i></div>
          <div class="alert-text">Download Laporan Excel</div>
          <button
            class="btn btn-primary"
            @click="
              download(
                'laporan_harian/kunjungan_pasien_excel',
                data.data && data.data.filters ? data.data.filters : {}
              )
            "
          >
            Download
            <!-- <i class="ri-arrow-right-line"></i> -->
            <i class="ri-download-cloud-2-line"></i>
          </button>
        </div>
      </template>
    </tas-base-crud>

    <b-toast
      id="toast-download"
      variant="info"
      solid
      no-auto-hide
      no-close-button
      :visible="showToastDownload"
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-center pt-2">
          <b-spinner Radiologiel="Spinning" small></b-spinner>
          <strong class="mr-auto pl-3">Downloading File ...</strong>
          <small class="text-muted mr-2">
            <time-ago locale="id"></time-ago>
          </small>
        </div>
      </template>
      Sedang mendownload file excel.
    </b-toast>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("id");

export default {
  name: "kunjungan-pasien",
  data() {
    return {
      showToastDownload: false,
      tesAsyncData: {},
      config: {
        title: "Laporan Harian Kunjungan Pasien",
        // model_api: 'bank',
        getter: "laporan_harian/kunjungan_pasienBypassUri",
        setter: "laporan_harian/kunjungan_pasienBypassUri",
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        filter_api: {
          tgl_awal: moment(new Date()).format("YYYY-MM-DD"),
          tgl_akhir: moment(new Date()).format("YYYY-MM-DD"),
        },
        slave: [],
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
          {
            id: "tgl_registrasi",
            data: "tgl_registrasi",
            label: "Tanggal Kunjungan",
            placeholder: null,
            methods: {
              list: { transform: "longDateTime" },
              detail: { transform: "longDateTime" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "ms_jenis_layanan_id",
            data: "ms_jenis_layanan_id",
            label: "Jenis Layanan",
            placeholder: null,
            methods: {
              list: { view_data: "nama_jenis_layanan" },
              detail: { view_data: "nama_jenis_layanan" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "tgl_awal",
            data: "tgl_awal",
            label: "Tanggal Awal",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                type: "date",
                class: "col-4",
                value: moment(new Date()).format("YYYY-MM-DD"),
              },
            },
          },
          {
            id: "tgl_akhir",
            data: "tgl_akhir",
            label: "Tanggal Akhir",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                type: "date",
                class: "col-4",
                value: moment(new Date()).format("YYYY-MM-DD"),
              },
            },
          },
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
              filter: {
                type: "text",
                class: "col-4",
              },
            },
          },
          {
            id: "no_rm",
            data: "no_rm",
            label: "No. RM",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: {
                type: "text",
                class: "col-4",
              },
            },
          },
          {
            id: "nik",
            data: "nik",
            label: "NIK",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: {
                type: "text",
                class: "col-4",
              },
            },
          },
          {
            id: "jenis_kelamin",
            data: "jenis_kelamin",
            label: "Jenis Kelamin",
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { L: "badge badge-primary", P: "badge badge-warning" },
                transform: "kelamin",
              },
              detail: {
                order: true,
                class: { L: "badge badge-primary", P: "badge badge-warning" },
                transform: "kelamin",
              },
              create: false,
              update: false,
              filter: {
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    list: [
                      {
                        label: "Semua",
                        code: "",
                        description: "Kamar ini aktif",
                      },
                      {
                        label: "Laki-laki",
                        code: "L",
                        description: "Kamar ini non aktif",
                      },
                      {
                        label: "Perempuan",
                        code: "P",
                        description: "Kamar ini non aktif",
                      },
                    ],
                    display: ["label", "code"],
                    headerDisplay: ["Jenis Kelamin", "Kode"], // (opsional) pastikan jumlah key sama dengan 'diplay', kalau kosong tidak ada header
                  },
                },
              },
            },
          },
          {
            id: "tempat_lahir",
            data: "tempat_lahir",
            label: "Tempat Lahir",
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
            id: "tgl_lahir",
            data: "tgl_lahir",
            label: "Tanggal Lahir",
            placeholder: null,
            methods: {
              list: { transform: "date" },
              detail: { transform: "date" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "tgl_lahir",
            data: "tgl_lahir",
            label: "Umur",
            placeholder: null,
            methods: {
              list: { transform: "oldLong" },
              detail: { transform: "oldLong" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "golongan_darah_id",
            data: "golongan_darah_id",
            label: "Gol. Darah",
            placeholder: null,
            methods: {
              list: { view_data: "nama_golongan_darah" },
              detail: { view_data: "nama_golongan_darah" },
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "pekerjaan_id",
            data: "pekerjaan_id",
            label: "Pekerjaan",
            placeholder: null,
            methods: {
              list: { view_data: "nama_pekerjaan" },
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
          {
            id: "alamat_sekarang",
            data: "alamat_sekarang",
            label: "Alamat Sekarang",
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
            id: "alamat_ktp",
            data: "alamat_ktp",
            label: "Alamat KTP",
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
            id: "agama",
            data: "agama",
            label: "Agama",
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
            id: "nama_ayah",
            data: "nama_ayah",
            label: "Nama Ayah",
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
            id: "nama_asuransi",
            data: "nama_asuransi",
            label: "Asuransi",
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
            id: "no_asuransi_pasien",
            data: "no_asuransi_pasien",
            label: "No. Asuransi",
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
            id: "bpjs_id",
            data: "bpjs_id",
            label: "Kelas BPJS",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { value: "Kelas 1" },
              update: true,
              filter: false,
            },
          },
          // perusahaan_tempat_bekerja
          {
            id: "perusahaan_tempat_bekerja",
            data: "perusahaan_tempat_bekerja",
            label: "Perusahaan Tempat Berkerja",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // nip
          {
            id: "nip",
            data: "nip",
            label: "NIP",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // nama_pasangan
          {
            id: "nama_pasangan",
            data: "nama_pasangan",
            label: "Nama Pasangan",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // nama_ayah
          {
            id: "nama_ayah",
            data: "nama_ayah",
            label: "Nama Ayah",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // nama_ibu
          {
            id: "nama_ibu",
            data: "nama_ibu",
            label: "Nama Ibu",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // nama_penjamin
          {
            id: "nama_penjamin",
            data: "nama_penjamin",
            label: "Nama Penjamin",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // hubungan_penjamin
          {
            id: "hubungan_penjamin",
            data: "hubungan_penjamin",
            label: "Hubungan Penjamin",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // sc_whatsapp
          {
            id: "sc_whatsapp",
            data: "sc_whatsapp",
            label: "No Whatsapp",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // sc_email
          {
            id: "sc_email",
            data: "sc_email",
            label: "Email",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false,
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
  },
};
</script>
