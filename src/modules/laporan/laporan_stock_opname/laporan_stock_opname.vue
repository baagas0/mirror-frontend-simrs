<template>
  <div>
    <b-container fluid>
      <base_table :config="config">
      </base_table>
    </b-container>
  </div>
</template>

<script>
// import base_table from '@/components/BaseTable/BaseTable';

export default {
  components: {
    // base_table
  },
  name: "laporan_stock_opname",
  data() {
    return {
      config: {
        title: "Laporan Stock Opname",
        api_uri: "msAsuransi/list",
        permisson: {
          /** Belom Berfungsi */
          create: "create-history-stock",
          update: "update-history-stock",
          delete: "delete-history-stock"
        },
        action: {
          create: false,
          update: false,
          delete: false,
          export: [
            /**
             * Belom Berfungsi 
             * File download by axios
             */
            {
              title: "Export CSV",
              variant: "warning",
              api_source: "history_stock/csv"
            }
          ]
        },
        fields: [
          {
            key: "no",
            label: "No",
            sortable: true,
            sortDirection: "desc",
            class: "table-number text-center",
            methods: {
              create: null,
              update: null,
              filter: null
            }
          },
          {
            visible: true,
            key: "nama_asuransi",
            label: "Nama Asuransi",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
            methods: {
              create: null,
              update: null,
              filter: {
                parameter: "",
                formConfig: {
                  label: "Nama Asuransi",
                  type: "input",
                  placeholder: 'Isi Nama Asuransi',

                  /** For Lookup Only */
                  api_source: "msAsuransi/list",
                  pointer: {
                    code: "id_asuransi",
                    display: ["name"]
                  }
                }
              }
            }
          },
          {
            key: "cp_nama",
            label: "CP Nama",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
            methods: {
              create: null,
              update: null,
              filter: {
                parameter: "filter_dokternya_om",
                formConfig: {
                  label: "Dokter",
                  type: "select",
                  placeholder: 'Pilih Dokter',

                  /** For Lookup Only */
                  api_source: "msDokter/list",
                  data_source: [],
                  pointer: {
                    code: "id",
                    display: ["nama_dokter"]
                  }
                }
              }
            }
          },
          {
            visible: false,
            key: "updatedAt",
            label: "",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
            methods: {
              create: null,
              update: null,
              filter: {
                parameter: "tanggal_awal",
                formConfig: {
                  label: "Tanggal Awal",
                  type: "date",
                  format: "DD-MM-YYYY",
                  placeholder: 'Pilih Tanggal',
                }
              }
            }
          },
          {
            visible: false,
            key: "updatedAt",
            label: "",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
            methods: {
              create: null,
              update: null,
              filter: {
                parameter: "tanggal_akhir",
                formConfig: {
                  label: "Tanggal Akhir",
                  type: "date",
                  format: "DD-MM-YYYY",
                  placeholder: 'Pilih Tanggal',
                }
              }
            }
          },
        ]
      }
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
