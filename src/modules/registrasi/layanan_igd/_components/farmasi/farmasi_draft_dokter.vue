<template>
  <div>
    <template v-if="state === 'list'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="switchState('create')"><i class="ri-add-circle-line"></i>
            Tambah</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="p-3">
            <h5>- Obat Jadi</h5>
          </div>
        </div>
        <farmasi-telaah-obat-jadi-list :aResepDetail="aResepDetail" readonly="true"></farmasi-telaah-obat-jadi-list>

        <farmasi-telaah-obat-racik-list :oResep="oResep" disableEdit="true" disableAdd="true"></farmasi-telaah-obat-racik-list>
      </div>
      <div class="row px-3" v-if="aResepDetail.length">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="submitData()">Lanjutkan <i
              class="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </template>
    <template v-if="state === 'create'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bolder text-dark mb-0 pb-0">Form Tambah Resep</h6>
          <a class="btn btn-outline-primary btn-icon btn-circle" @click="switchState('list')"><i
              class="ri-arrow-go-back-line p-0"></i></a>
        </div>
        <div class="col-12 mt-3">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-12">
                  <s-input v-model="mData.awal_id_obat" :key="'awal_id_obat'" :id="'awal_id_obat'" :item="{
                    label: 'Obat',
                    id: 'awal_id_obat',
                    data: 'awal_id_obat',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: mData.awal_id_obat,
                    api: 'msBarang',
                    pointer: {
                      label: 'nama_barang',
                      code: 'ms_barang_id',
                      display: ['nama_barang']
                    },
                    param: {},
                  }" :valuee="mData.awal_id_obat" />
                </div>
                <div class="col-12">
                  <s-input v-model="mData.awal_nama_obat" :key="'awal_nama_obat'" :id="'awal_nama_obat'" :item="{
                    label: 'Nama Obat',
                    id: 'awal_nama_obat',
                    data: 'awal_nama_obat',
                    type: 'text',
                    validation: ['required'],
                    value: mData.awal_nama_obat,
                    param: {},
                  }" :valuee="mData.awal_nama_obat" :disabled="true" />
                </div>
                <div class="col-12">
                  <s-input v-model="mData.awal_harga" :key="'awal_harga'" :id="'awal_harga'" :item="{
                    label: 'Harga',
                    id: 'awal_harga',
                    data: 'awal_harga',
                    type: 'money',
                    validation: ['required'],
                    value: mData.awal_harga,
                    param: {},
                  }" :valuee="mData.awal_harga" :disabled="true" />
                </div>
                <div class="col-12">
                  <s-input v-model="mData.awal_signa" :key="'awal_signa'" :id="'awal_signa'" :item="{
                    label: 'Signa',
                    id: 'awal_signa',
                    data: 'awal_signa',
                    type: 'text',
                    validation: ['required'],
                    value: mData.awal_signa,
                    param: {},
                  }" :valuee="mData.awal_signa" />
                </div>
                <div class="col-6">
                  <s-input v-model="mData.awal_satuan" :key="'awal_satuan'" :id="'awal_satuan'" :item="{
                    label: 'Satuan',
                    id: 'awal_satuan',
                    data: 'awal_satuan',
                    type: 'text',
                    validation: ['required'],
                    value: mData.awal_satuan,
                    param: {},
                  }" :valuee="mData.awal_satuan" />
                </div>
                <div class="col-6">
                  <s-input v-model="mData.awal_qty" :key="'awal_qty'" :id="'awal_qty'" :item="{
                    label: 'Qty',
                    id: 'awal_qty',
                    data: 'awal_qty',
                    type: 'number',
                    validation: ['required'],
                    value: mData.awal_qty,
                    param: {},
                  }" :valuee="mData.awal_qty" />
                </div>
                <div class="col-12 align-self-center">
                  <button type="submit" class="btn btn-light-primary mr-3">
                    <i class="ri-save-line"></i>
                    {{ $t('global.submit') }}
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </template>
  </div>
</template>
	
<script>
  import FarmasiTelaahObatJadiList from "./farmasi_telaah_obat_jadi_list.vue";
import FarmasiTelaahObatRacikList from "./farmasi_telaah_obat_racik_list.vue";
import moment from 'moment'
moment.locale('id')

export default {
  name: 'farmasi_draft_dokter',
  components: {
    FarmasiTelaahObatJadiList,
    FarmasiTelaahObatRacikList
  },
  props: {
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    oResep: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    aResepDetail: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      mData: {},
      state: 'list'
    }
  },
  watch: {
    'mData.awal_id_obat': function (newVal, oldVal){
      this.$_api.single('msBarang', { id: newVal }, newVal).then((res) => {
          // console.log(res.data[0].nama_barang)
          this.mData.awal_nama_obat = res.data[0].nama_barang
          this.mData.awal_harga = res.data[0].harga_pokok ? parseFloat(res.data[0].harga_pokok) : 0
      })
    },
  },
  mounted() {
    console.log('aResepDetail', this.aResepDetail)
  },
  methods: {
    onSubmit(data) {
      this.mData.resep_id = this.oResep.id
      this.$_api.create('resep_detail_igd', this.mData).then((res) => {
        this.mData = {}
        this.$emit('reloadData')
        this.switchState('list')
      })
    },
    submitData() {
      console.log('tahap resep', this.oResep.tahap_resep)
      this.$emit('updateResepData', { ...this.oResep, tahap_resep: this.oResep.tahap_resep+1 })
    },
    switchState(state) {
      this.state = state
    }
  }
}
</script>