<template lang="">
  <tas-base-crud ref="crud-daftar_tagihan" :config="config" :headerFilterView="true" :hideGlobalSearch="true">
    
      <template v-slot:header-filter>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(checkFilter)" autocomplete="off">

            <div class="row align-self-end">
              <b-col cols="3" sm="3" md="3" lg="3">
              <h3><strong>Filter</strong></h3>
              </b-col>
            </div>

            <div v-if="isShowFilters" class="row align-self-end">
              <b-col cols="3" sm="3" md="3" lg="3">
                <label for="ms_asuransi_id">Asuransi</label>
                <multiselect id="ms_asuransi_id" v-model="filters.param.ms_asuransi_id" :options="list.list_ms_asuransi" :multiple="false" :internal-search="false"
                  :searchable="true"  :close-on-select="true" :show-labels="false" label="nama_asuransi" track-by="id"
                  @search-change="getMsAsuransi" @remove="onRemove(filters.param.ms_asuransi_id, 'ms_asuransi_id')" @select="onSelect(filters.param.ms_asuransi_id, 'ms_asuransi_id')" placeholder="Pilih Asuransi" size="sm"></multiselect>
              </b-col>
              <b-col cols="3" sm="3" md="3" lg="3">
                <label for="kelas_kunjungan_id">Kelas Kunjungan</label>
                <multiselect id="kelas_kunjungan_id" v-model="filters.param.kelas_kunjungan_id" :options="list.list_kelas_kunjungan"
                  :multiple="false" :internal-search="false" :searchable="true"  :close-on-select="true" :show-labels="false" label="nama_kelas_kunjungan"
                  track-by="kelas_kunjungan_id" @search-change="getKelasKunjungan" @remove="onRemove(filters.param.kelas_kunjungan_id, 'kelas_kunjungan_id')" @select="onSelect(filters.param.kelas_kunjungan_id, 'kelas_kunjungan_id')" placeholder="Pilih Kelas Kunjungan" size="sm"></multiselect>
              </b-col>
              <b-col cols="3" sm="3" md="3" lg="3">
                <label for="ms_jenis_layanan_id">Jenis Layanan</label>
                <multiselect id="ms_jenis_layanan_id" v-model="filters.param.ms_jenis_layanan_id" :options="list.list_ms_jenis_layanan"
                  :multiple="false" :internal-search="false" :searchable="true"  :close-on-select="true" :show-labels="false" label="nama_jenis_layanan"
                  track-by="id" @search-change="getJenisLayanan" @remove="onRemove(filters.param.ms_jenis_layanan_id, 'ms_jenis_layanan_id')" @select="onSelect(filters.param.ms_jenis_layanan_id, 'ms_jenis_layanan_id')" placeholder="Pilih Jenis Layanan" size="sm"></multiselect>
              </b-col>
              <b-col cols="3" sm="3" md="3" lg="3">
              </b-col>
            </div>
              
            <div v-if="isShowFilters" class="row align-self-end mt-4">
              <b-col cols="3" sm="3" md="3" lg="3">
                <label for="nama_lengkap">Nama Pasien</label>
                <b-form-input id="nama_lengkap" v-model="filters.nama_lengkap" placeholder="Nama Pasien" type="text" size="sm"></b-form-input>
              </b-col>
              <b-col cols="3" sm="3" md="3" lg="3">
                <label for="kode_tagihan">Kode Tagihan</label>
                <b-form-input id="kode_tagihan" v-model="filters.kode_tagihan" placeholder="No Tagihan" type="text" size="sm"></b-form-input>
              </b-col>
            </div>

            <div class="row align-self-end" :class="[!isShowFilters ? 'mt-0': 'mt-4']">
              <b-col cols="12" sm="12" md="12" lg="12">
                <button v-if="isShowFilters" type="submit" class="btn btn-light-primary">
                  <i class="ri-save-line"></i>
                  Terapkan Filter
                </button>
                <div v-if="isShowFilters" @click="resetFilter" class="btn btn-light-danger">
                  <i class="ri-loop-right-line"></i>
                  Reset
                </div>
                <div class="btn btn-light-info" @click="hideFilter">
                  <span v-if="isShowFilters"><i class="ri-eye-off-line"></i>Hide Filter</span>
                  <span v-else><i class="ri-eye-line"></i>Show Filter</span>
                </div>
              </b-col>
            </div>
          </form>
        </ValidationObserver>
      </template>
      
    <template v-slot:list-table-action="data">
      <a class="btn btn-icon btn-warning btn-sm" @click="openEdit(data.rowData)">
        <i class="ri-edit-2-line"></i>
      </a>
        <!-- <a v-b-tooltip.top.viewport="$t('global.delete')" class="btn btn-icon btn-danger btn-sm">
          <i class="ri-delete-bin-2-line"></i>
        </a> -->
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-daftar_tagihan',
  data() {
    return {
      config: {
        title: 'Daftar Tagihan',
        model_api: 'tagihan',
        getter: 'tagihan',
        setter: 'tagihan',
        custom_api: {
          list: 'tagihan/listPerHalamanBypassUri'
        },
        pk_field: 'tagihan_id',
        frontendPaginate: false,
        permission: {
          create: false,
          read: false,
          update: false,
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // kode_tagihan
          {
            id: 'kode_tagihan',
            data: 'kode_tagihan',
            label: 'No Tagihan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // no_rm
          {
            id: 'no_rm',
            data: 'no_rm',
            label: 'No RM',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // nama_tagihan
          {
            id: 'nama_tagihan',
            data: 'nama_tagihan',
            label: 'Pasien',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // nama_jenis_layanan
          {
            id: 'nama_jenis_layanan',
            data: 'nama_jenis_layanan',
            label: 'Jenis Layanan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // nama_kelas_kunjungan
          {
            id: 'nama_kelas_kunjungan',
            data: 'nama_kelas_kunjungan',
            label: 'Kelas Kunjungan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // nama_asuransi
          {
            id: 'nama_asuransi',
            data: 'nama_asuransi',
            label: 'Asuransi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // status_tagihan
          {
            id: 'status_tagihan',
            data: 'status_tagihan',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                class: { 1: 'badge badge-success', 2: 'badge badge-warning', 3: 'badge badge-danger' },
                transform: 'statusTagihan'
              },
              detail: {
                class: { 1: 'badge badge-success', 2: 'badge badge-warning', 3: 'badge badge-danger' },
                transform: 'statusTagihan'
              },
              create: false,
              update: false,
              filter: false
            }
          }
        ]
      },
      filters: {
        param: {
          ms_asuransi_id: '',
          kelas_kunjungan_id: '',
          ms_jenis_layanan_id: '',
        },
        ms_asuransi_id: null,
        kelas_kunjungan_id: null,
        ms_jenis_layanan_id: null,
        nama_lengkap: '',
        kode_tagihan: '',
        status_pembayaran: '',
      },
      list: {
        list_ms_asuransi: [],
        list_kelas_kunjungan: [],
        list_pasien: [],
        list_ms_jenis_layanan: [],
        list_status_tagihan: [
          { id: 1, name: 'Belum lunas' },
          { id: 2, name: 'Lunas' },
        ]
      },
      isShowFilters: true,
    }
  },
  mounted() {
    this.getFilters()
  },
  methods: {
    async openEdit(data) {
      const vm = this

      localStorage.setItem('dataEditTagihan', JSON.stringify(data))
      vm.$bvModal.hide('modal-open-edit')
      vm.$router.push('/tagihan/transaksi_tagihan/input_tagihan')
    },
    async deleteTagihan() {
      const vm = this
      this.$_api.post('tagihan/delete', { id: vm.is_data.tagihan_id }).then((tagihan) => {
        if (tagihan.status === 200) {
          vm.getDatas()
        }
      })
    },
    checkFilter() {
      this.$refs['crud-daftar_tagihan'].$children[1].getData(this.filters)
    },
    getFilters() {
      this.getMsAsuransi()
      this.getKelasKunjungan()
      this.getJenisLayanan()
    },
    getMsAsuransi(nama_asuransi) {
      this.$_api.post('msAsuransi/list', {
        jumlah: 20,
        nama_asuransi: nama_asuransi
      }).then((res) => {
        this.list.list_ms_asuransi = res.data
      })
    },
    getKelasKunjungan(nama_kelas_kunjungan) {
      this.$_api.post('kelasKunjungan/list', {
        jumlah: 20,
        nama_kelas_kunjungan: nama_kelas_kunjungan
      }).then((res) => {
        this.list.list_kelas_kunjungan = res.data
      })
    },
    getJenisLayanan(nama_jenis_layanan) {
      this.$_api.post('msJenisLayanan/list', {
        jumlah: 20,
        nama_jenis_layanan: nama_jenis_layanan
      }).then((res) => {
        this.list.list_ms_jenis_layanan = res.data
      })
    },
    onSelect(selectedArray, variableName) {
      this.filters[variableName] = selectedArray.id;
    },
    onRemove(selectedArray, variableName) {
      this.filters[variableName] = '';
    },
    resetFilter() {
      this.filters = {
        param: {
          ms_asuransi_id: '',
          kelas_kunjungan_id: '',
          ms_jenis_layanan_id: '',
        },
        ms_asuransi_id: null,
        kelas_kunjungan_id: null,
        ms_jenis_layanan_id: null,
        nama_lengkap: '',
        kode_tagihan: '',
        status_pembayaran: '',
      }
    },
    hideFilter() {
      this.isShowFilters = !this.isShowFilters
    },
  }
}
</script>
