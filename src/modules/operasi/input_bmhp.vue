<template>
  <div class="w-100">

    <!-- Informasi Operasi -->
    <div class="alert alert-custom alert-light-info fade show mb-5" role="alert" v-if="hasilOperasi">
      <div class="alert-icon">
        <i class="ri-information-line"></i>
      </div>
      <div class="alert-text">
        <strong>Informasi Operasi:</strong><br>
        Tanggal: {{ formatDate(hasilOperasi.tanggal_selesai) }}<br>
        Kategori: {{ hasilOperasi.kategori }}<br>
        Status Input: <span class="badge badge-primary">{{ getStatusBadge(summary && summary.grand_total ? summary.grand_total.total_items : 0) }}</span>
      </div>
    </div>

    <!-- Summary Section -->
    <div class="row mb-5" v-if="summary">
      <div class="col-md-12">
        <div class="card card-frame">
          <div class="card-body">
            <h4 class="mb-4">Ringkasan Tagihan Operasi</h4>
            <div class="row">
              <div class="col-md-3" v-for="(item, index) in summary.summary_by_type" :key="index">
                <div class="bg-light-warning rounded p-4">
                  <div class="font-weight-bold text-dark">{{ item.jenis }}</div>
                  <div class="h4 text-warning">{{ item.jumlah_item }} Item</div>
                  <div class="text-muted">Qty: {{ item.total_qty }} | Total: {{ formatCurrency(item.total_harga) }}</div>
                </div>
              </div>
            </div>
            <div class="separator separator-dashed my-5"></div>
            <div class="row">
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-50 mr-3">
                    <div class="symbol-label bg-light-primary">
                      <i class="ri-shopping-cart-2-line text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <div class="font-weight-bold text-dark">Total Item</div>
                    <div class="text-muted">{{ summary && summary.grand_total ? summary.grand_total.total_items : 0 }} item</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-50 mr-3">
                    <div class="symbol-label bg-light-success">
                      <i class="ri-money-dollar-circle-line text-success"></i>
                    </div>
                  </div>
                  <div>
                    <div class="font-weight-bold text-dark">Total Biaya</div>
                    <div class="text-muted">{{ formatCurrency(summary && summary.grand_total ? summary.grand_total.grand_total : 0) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div class="row mb-3" v-if="selectedItems.length > 0">
      <div class="col-md-12">
        <div class="alert alert-info d-flex align-items-center justify-content-between">
          <div>
            <i class="ri-checkbox-circle-line mr-2"></i>
            <span>{{ selectedItems.length }} item terpilih</span>
          </div>
          <div class="btn-group">
            <button class="btn btn-success btn-sm" @click="bulkConfirm" :disabled="loadingBulk">
              <i class="ri-check-line mr-1"></i>
              <span v-if="loadingBulk" class="spinner-border spinner-border-sm mr-1"></span>
              Konfirmasi Semua
            </button>
            <button class="btn btn-secondary btn-sm" @click="clearSelection">
              <i class="ri-close-line mr-1"></i>
              Hapus Pilihan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tas Base CRUD Component -->
    <tas-base-crud
      ref="input-bmhp"
      :config="config"
      :filterView="false"
      :hideFilter="true"
      :hideGlobalSearch="true"
    >
      <template v-slot:subtitle="data">
        <p class="mb-0 col-12 pl-0">
          Total BMHP/Obat : {{ data.data.count || "0" }}
        </p>
      </template>

      <template v-slot:list-header-id>
        <input
          type="checkbox"
          :checked="allDraftSelected"
          :indeterminate="someDraftSelected"
          @change="toggleSelectAll"
          title="Pilih semua item draft"
        />
      </template>

      <template v-slot:list-id="rowData">
        <input
          type="checkbox"
          :checked="isItemSelected(rowData.rowData.id)"
          @change="toggleItemSelection(rowData.rowData)"
          :disabled="rowData.rowData.status !== 'draft'"
        />
      </template>

      <template v-slot:list-table-action="rowData">
        <button
          class="btn btn-sm btn-icon btn-light-success mr-1"
          @click="confirmItem(rowData.rowData)"
          v-if="rowData.rowData.status === 'draft'"
          title="Konfirmasi"
        >
          <i class="ri-check-line"></i>
        </button>
        <button
          class="btn btn-sm btn-icon btn-light-warning mr-1"
          @click="cancelItem(rowData.rowData)"
          v-if="rowData.rowData.status === 'draft' || rowData.rowData.status === 'confirmed'"
          title="Batalkan"
        >
          <i class="ri-close-line"></i>
        </button>
      </template>
    </tas-base-crud>
  </div>
</template>

<script>
import moment from 'moment'

moment.locale('id')

export default {
  name: 'input-bmhp',
  data() {
    return {
      hasilOperasi: null,
      summary: null,
      selectedItems: [],
      loadingBulk: false,
      config: {
        title: 'Verifikasi Tagihan Operasi',
        model_api: 'operasi_bmhp',
        getter: 'operasi_bmhp',
        setter: 'operasi_bmhp',
        pk_field: 'id',
        frontendPaginate: false,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        filter_api: {},
        slave: [],
        fields: [
          // id
          {
            id: 'id',
            data: 'id',
            label: ' ',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // kode_produk
          {
            id: 'kode_produk',
            data: 'barang.kode_produk',
            label: 'Kode Barang',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_barang
          {
            id: 'nama_barang',
            data: 'barang.nama_barang',
            label: 'Nama Barang',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                validation: ['required'],
                class: 'col-12',
                type: 'lookup-radio',
                setter: 'msBarang',
                getter: 'msBarang',
                option: {
                  list_pointer: {
                    label: 'nama_barang',
                    code: 'ms_barang_id',
                    display: ['nama_barang', 'kode_produk'],
                    headerDisplay: ['Nama Barang', 'Kode'],
                  },
                },
              },
              update: {
                validation: ['required'],
                class: 'col-12',
                type: 'lookup-radio',
                setter: 'msBarang',
                getter: 'msBarang',
                option: {
                  list_pointer: {
                    label: 'nama_barang',
                    code: 'ms_barang_id',
                    display: ['nama_barang', 'kode_produk'],
                    headerDisplay: ['Nama Barang', 'Kode'],
                  },
                },
              },
              filter: false
            }
          },
          // jenis
          {
            id: 'jenis',
            data: 'jenis',
            label: 'Jenis',
            placeholder: null,
            methods: {
              list: {
                class: {
                  'BMHP': 'badge badge-primary',
                  'OBAT': 'badge badge-success',
                  'ALKES': 'badge badge-warning'
                }
              },
              detail: {
                class: {
                  'BMHP': 'badge badge-primary',
                  'OBAT': 'badge badge-success',
                  'ALKES': 'badge badge-warning'
                }
              },
              create: {
                validation: ['required'],
                class: 'col-12',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'value',
                    list: [
                      { label: 'BMHP', value: 'BMHP' },
                      { label: 'Obat', value: 'OBAT' },
                      { label: 'Alkes', value: 'ALKES' }
                    ]
                  }
                }
              },
              update: {
                validation: ['required'],
                class: 'col-12',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'value',
                    list: [
                      { label: 'BMHP', value: 'BMHP' },
                      { label: 'Obat', value: 'OBAT' },
                      { label: 'Alkes', value: 'ALKES' }
                    ]
                  }
                }
              },
              filter: {
                type: 'lookup-radio',
                class: 'col-12',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'value',
                    list: [
                      { label: 'Semua', value: '' },
                      { label: 'BMHP', value: 'BMHP' },
                      { label: 'Obat', value: 'OBAT' },
                      { label: 'Alkes', value: 'ALKES' }
                    ]
                  }
                }
              }
            }
          },
          // qty
          {
            id: 'qty',
            data: 'qty',
            label: 'Quantity',
            placeholder: null,
            methods: {
              list: { transform: 'number' },
              detail: { transform: 'number' },
              create: {
                validation: ['required', 'min:1'],
                class: 'col-6',
                type: 'number'
              },
              update: {
                validation: ['required', 'min:1'],
                class: 'col-6',
                type: 'number'
              },
              filter: false
            }
          },
          // nama_satuan
          {
            id: 'nama_satuan',
            data: 'satuan.nama_satuan',
            label: 'Satuan',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // harga_satuan
          {
            id: 'harga_satuan',
            data: 'harga_satuan',
            label: 'Harga Satuan',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: {
                validation: ['required', 'min:0'],
                class: 'col-6',
                type: 'number'
              },
              update: {
                validation: ['required', 'min:0'],
                class: 'col-6',
                type: 'number'
              },
              filter: false
            }
          },
          // total_harga
          {
            id: 'total_harga',
            data: 'total_harga',
            label: 'Total Harga',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: false,
              update: false,
              filter: false
            }
          },
          // status
          {
            id: 'status',
            data: 'status',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                class: {
                  'draft': 'badge badge-secondary',
                  'confirmed': 'badge badge-success',
                  'cancelled': 'badge badge-danger'
                }
              },
              detail: {
                class: {
                  'draft': 'badge badge-secondary',
                  'confirmed': 'badge badge-success',
                  'cancelled': 'badge badge-danger'
                }
              },
              create: false,
              update: false,
              filter: {
                type: 'select',
                class: 'col-12',
                option: {
                  list_pointer: {
                    list: [
                      { label: 'Semua', value: '' },
                      { label: 'Draft', value: 'draft' },
                      { label: 'Confirmed', value: 'confirmed' },
                      { label: 'Cancelled', value: 'cancelled' }
                    ]
                  }
                }
              }
            }
          },
          // keterangan
          {
            id: 'keterangan',
            data: 'keterangan',
            label: 'Keterangan',
            placeholder: 'Tambahkan keterangan...',
            methods: {
              list: false,
              detail: true,
              create: {
                class: 'col-12',
                type: 'textarea'
              },
              update: {
                class: 'col-12',
                type: 'textarea'
              },
              filter: false
            }
          },
          // hasil_operasi_id (hidden field)
          {
            id: 'hasil_operasi_id',
            data: 'hasil_operasi_id',
            label: 'Hasil Operasi ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: {
                type: 'hidden'
              },
              update: false,
              filter: false
            }
          }
        ]
      }
    }
  },
  computed: {
    allDraftItems() {
      const tableData = this.$refs['input-bmhp'] && this.$refs['input-bmhp'].$children && this.$refs['input-bmhp'].$children[1] ? this.$refs['input-bmhp'].$children[1].tableData : []
      return tableData.filter(item => item.status === 'draft')
    },
    allDraftSelected() {
      return this.allDraftItems.length > 0 && this.allDraftItems.every(item => this.isItemSelected(item.id))
    },
    someDraftSelected() {
      return this.allDraftItems.some(item => this.isItemSelected(item.id)) && !this.allDraftSelected
    }
  },
  mounted() {
    // // Set the filter API with route params
    // this.config.filter_api = {
    //   hasil_operasi_id: this.$route.query.hasil_id
    // }

    // // Set the hidden field value for hasil_operasi_id
    // const hasilField = this.config.fields.find(field => field.id === 'hasil_operasi_id')
    // if (hasilField) {
    //   hasilField.methods.create.value = this.$route.query.hasil_id
    // }

    // this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const hasilOperasiId = this.$route.query.hasil_id
        // Load summary
        // const summaryResponse = await this.$_api.get(`operasi_bmhp/hasil-operasi/${hasilOperasiId}/summary`)
        // this.summary = summaryResponse.data

      } catch (error) {
        console.error('Error loading data:', error)
        this.$store.commit('set_alert', {
          variant: "danger",
          msg: "Gagal memuat data",
          showing: true
        })
      }
    },

    confirmItem(item) {
      this.$_alert
        .confirm('Konfirmasi Item', `Apakah Anda yakin ingin mengkonfirmasi "${item.barang && item.barang.nama_barang ? item.barang.nama_barang : ''}"?`)
        .then((res) => {
          if (res.isConfirmed) {
            this.doConfirmItem(item)
          }
        })
    },

    async doConfirmItem(item) {
      try {
        await this.$_api.post(`operasi_bmhp/${item.id}/confirm`)
        this.$_alert.success('Data berhasil dikonfirmasi')
        this.$refs['input-bmhp'].$children[1].getData()
        this.loadData()
      } catch (error) {
        console.error('Error confirming item:', error)
        this.$_alert.error({}, error.response && error.response.data ? error.response.data.message : 'Gagal mengkonfirmasi data')
      }
    },

    cancelItem(item) {
      this.$_alert
        .confirm('Batalkan Item', `Apakah Anda yakin ingin membatalkan "${item.barang && item.barang.nama_barang ? item.barang.nama_barang : ''}"?`)
        .then((res) => {
          if (res.isConfirmed) {
            this.doCancelItem(item)
          }
        })
    },

    async doCancelItem(item) {
      try {
        await this.$_api.post(`operasi_bmhp/${item.id}/cancel`)
        this.$_alert.success('Data berhasil dibatalkan')
        this.$refs['input-bmhp'].$children[1].getData()
        this.loadData()
      } catch (error) {
        console.error('Error cancelling item:', error)
        this.$_alert.error({}, error.response && error.response.data ? error.response.data.message : 'Gagal membatalkan data')
      }
    },

    formatDate(date) {
      return moment(date).format('DD MMMM YYYY HH:mm')
    },

    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value || 0)
    },

    getStatusBadge(totalItems) {
      if (totalItems === 0) return 'Belum Ada Data'
      if (totalItems > 0) return `${totalItems} Item`
      return 'Draft'
    },

    // Bulk selection methods
    toggleSelectAll() {
      if (!this.selectedItems || this.selectedItems.length === 0) {
        this.selectAllDraft()
      } else {
        this.clearSelection()
      }
    },

    selectAllDraft() {
      const tableData = this.$refs['input-bmhp'] && this.$refs['input-bmhp'].$children && this.$refs['input-bmhp'].$children[1] ? this.$refs['input-bmhp'].$children[1].tableData : []
      this.selectedItems = tableData.filter(item => item.status === 'draft')
    },

    clearSelection() {
      this.selectedItems = []
    },

    isItemSelected(itemId) {
      return this.selectedItems && this.selectedItems.some(item => item.id === itemId)
    },

    toggleItemSelection(item) {
      if (!this.selectedItems) {
        this.selectedItems = []
      }

      const index = this.selectedItems.findIndex(selectedItem => selectedItem.id === item.id)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
      } else {
        if (item.status === 'draft') {
          this.selectedItems.push(item)
        }
      }
    },

    // Bulk confirmation methods
    bulkConfirm() {
      if (!this.selectedItems || this.selectedItems.length === 0) {
        this.$_alert.warning('Tidak ada item yang dipilih untuk dikonfirmasi')
        return
      }

      const itemNames = this.selectedItems.map(item => {
        return item.barang && item.barang.nama_barang ? item.barang.nama_barang : ''
      }).filter(name => name).join(', ')

      this.$_alert
        .confirm(
          'Konfirmasi Semua Item',
          `Apakah Anda yakin ingin mengkonfirmasi ${this.selectedItems.length} item?\n\n${itemNames}`
        )
        .then((res) => {
          if (res.isConfirmed) {
            this.executeBulkConfirm()
          }
        })
    },

    async executeBulkConfirm() {
      this.loadingBulk = true

      try {
        const confirmPromises = this.selectedItems.map(item =>
          this.$_api.post(`operasi_bmhp/${item.id}/confirm`)
        )

        await Promise.all(confirmPromises)

        this.$_alert.success(`Berhasil mengkonfirmasi ${this.selectedItems.length} item`)
        this.clearSelection()

        // Refresh data
        if (this.$refs['input-bmhp'] && this.$refs['input-bmhp'].$children && this.$refs['input-bmhp'].$children[1]) {
          this.$refs['input-bmhp'].$children[1].getData()
        }
        this.loadData()

      } catch (error) {
        console.error('Error in bulk confirmation:', error)
        this.$_alert.error(
          {},
          error.response && error.response.data ? error.response.data.message : 'Gagal mengkonfirmasi data'
        )
      } finally {
        this.loadingBulk = false
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.symbol-label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>