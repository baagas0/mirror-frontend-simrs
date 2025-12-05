<template lang="">
  <div class="w-100">
    <tas-base-crud
      ref="monitoring-bed"
      :config="config"
      :filterView="filterView"
      :hideFilter="hideFilter"
      :hideGlobalSearch="hideGlobalSearch"
    >
      <template v-slot:list-table-action="rowData">
        <button
          class="btn btn-primary mr-1"
          @click="checkoutBed(rowData.rowData)"
          v-if="rowData.rowData.status_checkout === 0"
        >
          <i class="ri-logout-box-r-line"></i>Checkout
        </button>
        <button
          class="btn btn-warning mr-1"
          v-b-modal.modal-pindah
          @click="(data = rowData.rowData), (edit = !edit)"
          v-if="rowData.rowData.status_checkout === 0"
        >
          <i class="ri-edit-line"></i>Pindah
        </button>
      </template>
    </tas-base-crud>

    <modal-pindah
      :data="data"
      :options_kelas_kamar="options_kelas_kamar"
      :edit="edit"
      @alertFromChild="triggerAlert($event), getDatas()"
    />
  </div>
</template>

<script>
import ModalPindah from "./alih_bed.vue";

export default {
  name: "monitoring-bed",
  components: {
    ModalPindah,
  },
  data() {
    return {
      data: "",
      edit: false,
      options_kelas_kamar: [],
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,
      config: {
        title: "Monitoring Bed",
        model_api: "msBed/monitoringBypassUri",
        getter: "msBed/monitoringBypassUri",
        setter: "msBed/monitoringBypassUri",
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        slave: [],
        fields: [
          // nama_bed
          {
            id: "ms_bed_id",
            data: "ms_bed_id",
            label: "Nama Bed",
            placeholder: null,
            methods: {
              list: { view_data: "nama_bed" },
              detail: { view_data: "nama_bed" },
              create: {
                validation: ["required"],
                setter: "msBed",
                getter: "msBed",
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "nama_bed",
                    code: "id",
                    display: ["nama_bed"],
                  },
                },
              },
              update: {
                validation: ["required"],
                setter: "msBed",
                getter: "msBed",
                type: "lookup-radio",
                option: {
                  list_pointer: {
                    label: "nama_bed",
                    code: "id",
                    display: ["nama_bed"],
                  },
                },
              },
              filter: {
                setter: "msBed",
                getter: "msBed",
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "nama_bed",
                    code: "ms_bed_id",
                    display: ["nama_bed"],
                  },
                },
              },
            },
          },
          // no_kunjungan
          {
            id: "no_kunjungan",
            data: "no_kunjungan",
            label: "No. Kunjungan",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
          // nama_lengkap
          {
            id: "nama_lengkap",
            data: "nama_lengkap",
            label: "Nama Pasien",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: {
                type: "text",
                class: "col-4",
              },
            },
          },
          // tgl_mulai
          {
            id: "tgl_mulai",
            data: "tgl_mulai",
            label: "Tanggal Masuk",
            placeholder: null,
            methods: {
              list: { transform: "longDateTime" },
              detail: { transform: "longDateTime" },
              create: true,
              update: true,
              filter: {
                type: "date",
                class: "col-4",
              },
            },
          },
          // no_rm
          {
            id: "no_rm",
            data: "no_rm",
            label: "No. RM",
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: {
                type: "text",
                class: "col-4",
              },
            },
          },
          // is_checkout
          {
            id: "status_checkout",
            data: "status_checkout",
            label: "Status",
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: {
                  0: "label font-weight-bold label-lg label-inline label-bold label-light-danger",
                  1: "label font-weight-bold label-lg label-inline label-bold label-light-primary",
                },
                transform: "status_checkout",
              },
              detail: {
                class: {
                  0: "label font-weight-bold label-lg label-inline label-bold label-light-danger",
                  1: "label font-weight-bold label-lg label-inline label-bold label-light-primary",
                },
                transform: "status_checkout",
              },
              create: true,
              update: true,
              filter: {
                type: "lookup-radio",
                class: "col-4",
                option: {
                  list_pointer: {
                    label: "label",
                    code: "code",
                    display: ["label"],
                    list: [
                      { label: "Terpakai", code: 0 },
                      { label: "Tersedia", code: 1 },
                    ],
                  },
                },
              },
            },
          },
          // keterangan_history_bed
          {
            id: "keterangan_history_bed",
            data: "keterangan_history_bed",
            label: "Keterangan",
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false,
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getDatas()
  },
  methods: {
    async getDatas() {
      let kelas_kamar = await this.$_api.post("msKelasKamar/list");
      // console.log(kelas_kamar);
      this.options_kelas_kamar = kelas_kamar.data;

    },
    triggerAlert(ev) {
      console.log(ev);
      // this.$_alert.success("Berhasil")
      this.$_alert.success(ev.msg)
    },
    checkoutBed(monitoring) {
      console.log(monitoring.history_bed_id);
      // return
      this.$_alert
        .confirm("Apakah anda yakin ingin melakukan checkout bed?")
        .then((status) => {
          console.log(status);
          if (status.isConfirmed) {
            this.$_api
              .post("historyBed/checkout", { id: monitoring.history_bed_id })
              .then((res) => {
                this.$_alert.success("Bed berhasil checkout");
                this.getDatas();
              })
              .catch((err) => {
                console.log(err);
                this.$_alert.error(err, "Gagal checkout bed");
                this.getDatas();
              })
              .finally(() => {
                this.$refs["monitoring-bed"].$children[1].getData();
              })
          } else {
            this.$_alert.error({}, "Checkout bed dibatalkan");
          }
        });
    },
  },
};
</script>
