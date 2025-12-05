<template>
  <div>
    <form @submit.prevent="handleSubmit" autocomplete="off">
      <b-row>
        <b-col cols="6">
          <s-input v-model="formData.nama_unit" :item="{
            label: 'Nama Unit *',
            id: 'nama_unit',
            data: 'nama_unit',
            type: 'text',
            validation: ['required'],
          }" :valuee="formData.nama_unit" :disabled="busy"></s-input>
        </b-col>
        <b-col cols="6">
          <s-input v-model="formData.tanggal_permintaan" :item="{
            id: 'tanggal_permintaan',
            show: true,
            class: '',
            attr: null,
            value: null,
            label: 'Tanggal Permintaan *',
            placeholder: 'Isikan tanggal permintaan',
            type: 'date',
            validation: ['required'],
          }" :valuee="formData.tanggal_permintaan" :disabled="busy"></s-input>
        </b-col>
        <b-col cols="12">
          <s-input v-model="formData.keterangan" :item="{
            label: 'Keterangan',
            id: 'keterangan',
            data: 'keterangan',
            type: 'textarea',
            validation: [],
          }" :valuee="formData.keterangan" :disabled="busy"></s-input>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col cols="12">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5>Item Permintaan</h5>
            <b-button size="sm" variant="success" @click="addItem">
              <i class="ri-add-line"></i> Tambah Item
            </b-button>
          </div>
        </b-col>
      </b-row>

      <!-- Items Table -->
      <b-row>
        <b-col cols="12">
          <b-table
            :items="formData.items"
            :fields="itemFields"
            responsive
            show-empty
            small
            bordered
            hover
            class="mb-4"
          >
            <template #cell(jumlah)="item">
              <b-form-input
                type="number"
                v-model="item.item.jumlah"
                min="1"
                @change="updateItemTotal()"
                size="sm"
              />
            </template>
            <template #cell(actions)="item">
              <b-button
                variant="danger"
                size="sm"
                @click="removeItem(item.index)"
                title="Hapus Item"
              >
                <i class="ri-delete-bin-line"></i>
              </b-button>
            </template>
            <template #empty>
              <div class="text-center py-3">
                <p class="text-muted">Belum ada item ditambahkan</p>
                <b-button size="sm" variant="success" @click="addItem">
                  <i class="ri-add-line"></i> Tambah Item Pertama
                </b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <!-- Item Selection Modal -->
      <b-modal
        id="barang-modal"
        title="Pilih Barang"
        size="lg"
        hide-footer
        @hidden="resetBarangForm"
      >
        <form @submit.prevent="selectBarang" autocomplete="off">
          <b-row>
            <b-col cols="12">
              <s-input
                v-model="barangFilter.search"
                :item="{
                  label: 'Cari Barang',
                  id: 'search',
                  data: 'search',
                  type: 'text',
                  validation: [''],
                }"
                :valuee="barangFilter.search"
                :disabled="busy"
              ></s-input>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col cols="12">
              <b-table
                :items="listBarang"
                :fields="barangFields"
                responsive
                show-empty
                small
                bordered
                hover
                :busy="busyBarang"
                selectable
                select-mode="single"
                @row-selected="onBarangSelected"
                class="mb-2"
                style="max-height: 400px; overflow-y: auto;"
              >
                <template #cell(qty_per_rs)="item">
                  <span class="text-success" v-if="item.item.qty_per_rs > 0">{{ item.item.qty_per_rs }}</span>
                  <span class="text-danger" v-else>0</span>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col cols="12" class="text-right">
              <b-button variant="secondary" @click="hideBarangModal">Batal</b-button>
              <b-button type="submit" variant="primary" class="ml-2" :disabled="busy || !selectedBarang">
                Pilih
              </b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>

      <!-- Form Actions -->
      <b-row class="mt-4">
        <b-col cols="12">
          <div class="d-flex justify-content-between">
            <b-button variant="secondary" @click="$emit('cancel')" :disabled="busy">
              <i class="ri-close-line"></i> Batal
            </b-button>
            <b-button type="submit" variant="primary" :disabled="busy || !formData.items.length">
              <i class="ri-save-line"></i>
              {{ busy ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan') }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      busy: false,
      busyBarang: false,
      selectedBarang: null,
      listItemIndex: null,
      barangFilter: {
        search: ''
      },
      listBarang: [],
      formData: {
        nama_unit: '',
        tanggal_permintaan: '',
        keterangan: '',
        items: []
      },
      itemFields: [
        {
          key: 'index',
          label: '#',
          class: 'text-center'
        },
        {
          key: 'nama_barang',
          label: 'Nama Barang',
          class: 'text-left'
        },
        {
          key: 'kode_produk',
          label: 'Kode Produk',
          class: 'text-left'
        },
        {
          key: 'jumlah',
          label: 'Jumlah',
          class: 'text-center'
        },
        {
          key: 'keterangan',
          label: 'Keterangan',
          class: 'text-left',
          thStyle: 'width: 200px;'
        },
        {
          key: 'actions',
          label: 'Aksi',
          class: 'text-center'
        }
      ],
      barangFields: [
        {
          key: 'nama_barang',
          label: 'Nama Barang',
          sortable: true,
          class: 'text-left'
        },
        {
          key: 'kode_produk',
          label: 'Kode Produk',
          sortable: true,
          class: 'text-left'
        },
        // {
        //   key: 'satuan',
        //   label: 'Satuan',
        //   class: 'text-left'
        // },
        {
          key: 'qty_per_rs',
          label: 'Stok',
          class: 'text-center'
        }
      ]
    }
  },
  watch: {
    editData: {
      immediate: true,
      handler(newVal) {
        console.log('===> InputPermintaan.vue:263 ~ this.isEdit', this.isEdit);
        console.log('===> InputPermintaan.vue:263 ~ newVal', newVal);
        if (newVal && this.isEdit) {
          this.formData = {
            ...newVal,
            tanggal_permintaan: this.$moment(newVal.tanggal_permintaan).format('YYYY-MM-DD'),
            items: newVal.items || []
          }
        }
      }
    }
  },
  mounted() {
    if (!this.isEdit) {
      this.formData.tanggal_permintaan = this.$moment().format('YYYY-MM-DD')
    }
    this.getBarangList()
  },
  methods: {
    addItem() {
      this.listItemIndex = null
      this.$bvModal.show('barang-modal')
    },
    removeItem(index) {
      this.formData.items.splice(index, 1)
      this.updateItemTotal()
    },
    updateItemTotal() {
      // Update indexes
      this.formData.items = this.formData.items.map((item, index) => ({ ...item, index }))
    },
    onBarangSelected(items) {
      if (items.length > 0) {
        this.selectedBarang = items[0]
      } else {
        this.selectedBarang = null
      }
    },
    async selectBarang() {
      if (!this.selectedBarang) {
        this.$_alert.warning('Silakan pilih barang terlebih dahulu')
        return
      }

      const itemData = {
        ms_barang_id: this.selectedBarang.ms_barang_id,
        nama_barang: this.selectedBarang.nama_barang,
        kode_produk: this.selectedBarang.kode_produk,
        satuan: this.selectedBarang.satuan,
        jumlah: 1,
        keterangan: ''
      }

      if (this.listItemIndex !== null) {
        // Update existing item
        this.formData.items[this.listItemIndex] = { ...itemData, index: this.listItemIndex }
      } else {
        // Add new item
        this.formData.items.push(itemData)
      }

      this.updateItemTotal()
      this.hideBarangModal()
    },
    hideBarangModal() {
      this.$bvModal.hide('barang-modal')
      this.resetBarangForm()
    },
    resetBarangForm() {
      this.selectedBarang = null
      this.listItemIndex = null
      this.barangFilter.search = ''
    },
    async getBarangList() {
      this.busyBarang = true
      try {
        const res = await this.$_api.post('msBarang/list', {
          halaman: 1,
          jumlah: 50,
          search: this.barangFilter.search,
          type: 'Alat Medis'
        })
        if (res.status == 200) {
          this.listBarang = res.data
        } else {
          this.$_alert.error(res.message)
        }
      } catch (error) {
        console.error('Error getting barang list:', error)
      } finally {
        this.busyBarang = false
      }
    },
    async handleSubmit() {
      if (!this.formData.nama_unit || !this.formData.tanggal_permintaan || this.formData.items.length === 0) {
        this.$_alert.warning('Harap lengkapi semua field yang wajib diisi')
        return
      }

      this.busy = true
      try {
        const submitData = {
          ...this.formData,
          items: this.formData.items.map(item => ({
            ms_barang_id: item.ms_barang_id,
            jumlah: item.jumlah,
            keterangan: item.keterangan || null
          }))
        }

        let res
        if (this.isEdit) {
          res = await this.$_api.post('permintaan_kotor/update', {
            id: this.editData.id,
            ...submitData
          })
        } else {
          res = await this.$_api.post('permintaan_kotor/register', submitData)
        }

        if (res.status == 200) {
          this.$_alert.success(`Data permintaan berhasil ${this.isEdit ? 'diupdate' : 'disimpan'}`)
          this.$emit('success', res.data)
        } else {
          this.$_alert.error(res.message)
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        this.$_alert.error('Terjadi kesalahan saat menyimpan data')
      } finally {
        this.busy = false
      }
    }
  }
}
</script>