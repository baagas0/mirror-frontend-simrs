<template>
  <div class="w-100">
    <tas-base-crud
      ref="list-operasi"
      :config="config"
      :filterView="filterView"
      :hideFilter="hideFilter"
      :hideGlobalSearch="true"
    >
      <template v-slot:list-permintaan_steril_id="rowData">
        <!-- Badge status using isCompleted(rowData.rowData) -->
        <span 
          class="label font-weight-bold label-lg label-inline label-bold"
          :class="{
            'label-light-success': isCompleted(rowData.rowData),
            'label-light-danger': isWaiting(rowData.rowData),
            'label-light-warning': isPartial(rowData.rowData)
          }"
        >
          {{ isCompleted(rowData.rowData) ? 'Selesai' : isWaiting(rowData.rowData) ? 'Menunggu' : isPartial(rowData.rowData) ? 'Proses' : 'N/A' }}
        </span>
      </template>
      <template v-slot:list-jumlah_item="rowData">
        <div class="d-flex align-items-center">
          <span 
            class="font-weight-bold" 
            :class="{
              'text-success': isCompleted(rowData.rowData),
              'text-danger': isWaiting(rowData.rowData),
              'text-warning': isPartial(rowData.rowData)
            }"
          >
            {{ rowData.rowData.jumlah_item_selesai || 0 }}/{{ rowData.rowData.jumlah_item || 0 }}
          </span>
          
          <div class="ml-2 progress-wrapper">
            <div 
              class="progress" 
              style="height: 6px; width: 60px;"
            >
              <div 
                class="progress-bar" 
                :class="{
                  'bg-success': isCompleted(rowData.rowData),
                  'bg-danger': isWaiting(rowData.rowData),
                  'bg-warning': isPartial(rowData.rowData)
                }"
                :style="`width: ${getCompletionPercentage(rowData.rowData)}%`"
                role="progressbar" 
                :aria-valuenow="getCompletionPercentage(rowData.rowData)"
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          
          <span 
            class="ml-1 small" 
            :class="{
              'text-success': isCompleted(rowData.rowData),
              'text-danger': isWaiting(rowData.rowData),
              'text-warning': isPartial(rowData.rowData)
            }"
          >
            {{ getCompletionPercentage(rowData.rowData) }}%
          </span>
        </div>
      </template>
      <template v-slot:subtitle="data">
        <p class="mb-0 col-12 pl-0">
          Total Permintaan : {{ data.data.count || "0" }}
        </p>
      </template>

      <template v-slot:detail-footer="rowData">
        <permintaan_steril_list
          v-if="rowData.rowData && rowData.rowData.permintaan_steril_id"
          :status="rowData.rowData.status_permintaan"
          :permintaan_steril_id="rowData.rowData.permintaan_steril_id"
        />
      </template>

    </tas-base-crud>
  </div>
</template>

<script>
import moment from "moment";
import permintaan_steril_list from './permintaan_steril_list.vue'

moment.locale("id");

export default {
  name: "list-operasi",
  components: { permintaan_steril_list },
  data() {
    return {
      showToastDownload: false,
      tesAsyncData: {},
      config: {
        title: "Permintaan Alat Steril",
        getter: "permintaan_steril",
        setter: "permintaan_steril",
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: "template-allow-all",
          read: "template-allow-all",
          update: false,
          delete: true,
        },
        filter_api: {
          //   tanggal_operasi: moment(new Date()).format("YYYY-MM-DD"),
        },
        slave: [],
        fields: [
          {
            id: "tanggal_permintaan",
            data: "tanggal_permintaan",
            label: "Tanggal Permintaan",
            placeholder: null,
            methods: {
              list: { transform: "longDateTime" },
              detail: { transform: "longDateTime" },
              create: { type: 'date', validation: ['required'], value: moment(new Date).format('YYYY-MM-DD') },
              update: { type: 'date', validation: ['required'], value: moment(new Date).format('YYYY-MM-DD') },
              filter: {
                type: "date",
                class: "col-4",
              },
            },
          },
          {
            id: "kode_permintaan",
            data: "kode_permintaan",
            label: "Kode Permintaan",
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
            id: "nama_unit",
            data: "nama_unit",
            label: "Nama Unit",
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
            id: "jumlah_item",
            data: "jumlah_item",
            label: "Jumlah Barang",
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: true,
              create: true,
              update: true,
              filter: false,
            },
          },
          // {
          //   id: "status_permintaan",
          //   data: "status_permintaan",
          //   label: "Status",
          //   placeholder: null,
          //   methods: {
          //     list: {
          //       order: true,
          //       class: {
          //         0: "label font-weight-bold label-lg label-inline label-bold label-light-danger",
          //         1: "label font-weight-bold label-lg label-inline label-bold label-light-warning",
          //         2: "label font-weight-bold label-lg label-inline label-bold label-light-primary",
          //         3: "label font-weight-bold label-lg label-inline label-bold label-light-success",
          //       },
          //       transform: "status_operasi",
          //     },
          //     detail: {
          //       class: {
          //         0: "label font-weight-bold label-lg label-inline label-bold label-light-danger",
          //         1: "label font-weight-bold label-lg label-inline label-bold label-light-warning",
          //         2: "label font-weight-bold label-lg label-inline label-bold label-light-primary",
          //         3: "label font-weight-bold label-lg label-inline label-bold label-light-success",
          //       },
          //       transform: "status_operasi",
          //     },
          //     create: false,
          //     update: false,
          //     filter: false,
          //   },
          // },
          {
            id: "barang_list",
            data: "barang_list",
            label: "Barang",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: {
                setter: 'msBarang',
                getter: 'msBarang',
                type: 'lookup-checkbox',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_barang',
                    code: 'ms_barang_id',
                    display: ['nama_barang', 'kode_produk', 'nama_produsen'],
                    headerDisplay: ['Nama Barang', 'Kode Produk', 'Nama Produsen'],
                  },
                  filterAPI: {
                    nama_jenis_penunjang: 'LABORATORIUM',
                    type: 'Alat Medis',
                  },
                  filter: [
                    { type: 'text', label: 'Nama Barang', key: 'nama_barang' },
                  ]
                }
              },
              update: true,
              filter: false,
            },
          },
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
    // Helper methods for completion status styling
    getCompletionPercentage(rowData) {
      if (!rowData.jumlah_item || rowData.jumlah_item === 0) return 0;
      const completed = rowData.jumlah_item_selesai || 0;
      const total = rowData.jumlah_item || 0;
      return Math.round((completed / total) * 100);
    },
    
    isCompleted(rowData) {
      return (rowData.jumlah_item_selesai || 0) === (rowData.jumlah_item || 0) && 
             (rowData.jumlah_item || 0) > 0;
    },
    
    isWaiting(rowData) {
      return (rowData.jumlah_item_selesai || 0) === 0 && (rowData.jumlah_item || 0) > 0;
    },
    
    isPartial(rowData) {
      const completed = rowData.jumlah_item_selesai || 0;
      const total = rowData.jumlah_item || 0;
      return completed > 0 && completed < total;
    },
    
    async tesAsync() {
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
    // setBatal(permintaan_steril_id) {
    //   console.log(permintaan_steril_id);

    //   this.$_api
    //     .post("jadwal_operasi/set_batal", { permintaan_steril_id })
    //     .then((res) => {
    //       this.$_alert.success("Berhasil membatalkan jadwal operasi");
    //     })
    //     .catch((err) => {
    //       this.$_alert.error({}, "Gagal membatalkan jadwal operasi");
    //     });
    // },
    // setMenunggu(permintaan_steril_id) {
    //   console.log(permintaan_steril_id);
    // },
    // setProses(permintaan_steril_id) {
    //   console.log(permintaan_steril_id);
    // },
    // setSelesai(permintaan_steril_id) {
    //   console.log(permintaan_steril_id);
    // },
    setPermintaanSteril(permintaan_steril_id, code_proses) {
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
              .post(ep, { permintaan_steril_id })
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
  },
};
</script>

<style scoped>
.progress-wrapper {
  display: flex;
  align-items: center;
}

.progress {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  border-radius: 10px;
  transition: width 0.6s ease;
}

/* Pulse animation for waiting items */
@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

.text-danger.font-weight-bold {
  animation: pulse 1.5s infinite;
}

/* Make the progress bar slightly glossy */
.progress-bar.bg-success {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.1));
}

.progress-bar.bg-warning {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.1));
}

.progress-bar.bg-danger {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.1));
}
</style>
