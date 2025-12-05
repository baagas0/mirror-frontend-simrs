<template>
  <div>
    <b-modal id='modal-dibayar' size='lg' centered title='Input Dibayar' header-bg-variant='primary'
      header-text-variant='light' @hidden='resetModal'>
      <b-form>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Tanggal <span class='text-danger'>*</span>
          </template>
          <s-input v-model="is_data.tgl_pembayaran_tagihan" :item="{
            id: 'tgl_pembayaran_tagihan',
            data: 'tgl_pembayaran_tagihan',
            type: 'date',
            validation: ['required']
          }" />

        </b-form-group>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Tipe Pembayaran <span class='text-danger'>*</span>
          </template>
          <multiselect :options="list_tipe_pembayaran_tagihan" v-model="is_data.tipe_pembayaran_tagihan" :multiple="false"
            :searchable="false" :close-on-select="true" :show-labels="false" label="text" track-by="value"
            placeholder="-- Tipe Pembayaran --"></multiselect>
          <!-- <s-input v-model="is_data.tipe_pembayaran_tagihan" :item="{
            type: 'select',
            validation: ['required'],
            pointer: {
              label: 'text',
              code: 'value',
              display: ['text'],
            },
            api: false,
            optionList: list_tipe_pembayaran_tagihan
          }" /> -->
        </b-form-group>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Kas <span class='text-danger'>*</span>
          </template>

          <multiselect :options="list_kas" v-model="is_data.kas" :multiple="false" :searchable="false"
            :close-on-select="true" :show-labels="false" label="name" track-by="id" placeholder="-- Kas --"></multiselect>
          <!-- <s-input v-model="is_data.kas" :item="{
            id: 'kas',
            data: 'kas',
            type: 'select',
            validation: ['required'],
            pointer: {
              label: 'name',
              code: 'id',
              display: ['name'],
            },
            api: false,
            optionList: list_kas
          }" /> -->
        </b-form-group>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nominal <span class='text-danger'>*</span>
          </template>
          <s-input v-model="is_data.jumlah_bayar_tagihan" :item="{
            id: 'jumlah_bayar_tagihan',
            data: 'jumlah_bayar_tagihan',
            type: 'money',
            validation: ['required']
          }"></s-input>
          <!-- <small class='d-block ml-1 mt-1 text-danger'>{{ is_data.nama_jumlah_bayar_tagihan }}</small> -->
        </b-form-group>
        <!-- <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Sisa Pembayaran <span class='text-danger'>*</span>
          </template>
          <s-input v-model="is_data.nama_sisa_pembayaran" :item="{
            id: 'nama_sisa_pembayaran',
            data: 'nama_sisa_pembayaran',
            type: 'money',
            validation: ['required']
          }" :disabled="true" :valuee="dataTagihan.sisa_pembayaran" />
        </b-form-group> -->
      </b-form>
      <template #modal-footer>
        <b-button variant='secondary' @click="$bvModal.hide('modal-dibayar')">
          Batal
        </b-button>
        <b-button variant='primary' :disabled='busy' @click='simpan()'>{{ button }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'modalInput',
  emits: ['getDibayar', 'changeVar'],
  props: ['dataHeader', 'listDibayar', 'dataTagihan'],
  components: {
  },
  data() {
    return {
      is_data: {
        tgl_pembayaran_tagihan: new Date(),
        kas: null,
        tipe_pembayaran_tagihan: null,
        jumlah_bayar_tagihan: 0,
        nama_jumlah_bayar_tagihan: 'Rp 0,00'
      },
      list_kas: [],
      list_tipe_pembayaran_tagihan: [
        { text: 'Tunai', value: '1' },
        { text: 'Debet / Kredit', value: '2' },
        { text: 'Client / Clientas', value: '3' }
      ],
      busy: false,
      button: 'Simpan'
    }
  },
  // mixins: [validationMixin],
  // validations: {
  //   is_data: {
  //     tgl_pembayaran_tagihan: { required },
  //     kas: { required },
  //     tipe_pembayaran_tagihan: { required },
  //     jumlah_bayar_tagihan: { required }
  //   }
  // },
  computed: {
    formString() {
      return JSON.stringify(this.is_data, null, 4)
    }
    // isValid () {
    //   return !this.$v.is_data.$invalid
    // },
    // isDirty () {
    //   return this.$v.is_data.$anyDirty
    // }
  },
  watch: {
    'is_data.jumlah_bayar_tagihan'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.is_data.nama_jumlah_bayar_tagihan = this.toNumeric(newVar, 'idr')
      }
    }
  },
  async mounted() {
    const vm = this
    await vm.getDatas()
  },
  methods: {
    // checkIfValid (fieldName) {
    //   const field = this.$v.is_data[fieldName]
    //   if (!field.$dirty) {
    //     return null
    //   }
    //   return !(field.$invalid || field.$model === '')
    // },
    async getDatas() {
      const vm = this
      // kas
      this.$_api.list('kas', {}).then((res) => {
        vm.list_kas = res.status === 200 ? res.data : []
      })
    },
    // simpan() {
    //   let vm = this;
    //   vm.busy = true;
    //   vm.button = 'Mohon Tunggu';
    //   vm.is_data.nama_tgl_pembayaran_tagihan = moment(vm.is_data.tgl_pembayaran_tagihan).format('DD-MM-YYYY')
    //   vm.is_data.nama_tipe_pembayaran_tagihan = vm.is_data.tipe_pembayaran_tagihan ? vm.is_data.tipe_pembayaran_tagihan.text : null
    //   vm.is_data.tipe_pembayaran_tagihan = vm.is_data.tipe_pembayaran_tagihan ? vm.is_data.tipe_pembayaran_tagihan.value : null
    //   vm.is_data.nama_kas = vm.is_data.kas ? vm.is_data.kas.name : null
    //   vm.is_data.kas_id = vm.is_data.kas ? vm.is_data.kas.id : null
    //   vm.$emit('changeVar', {to: 'listDibayar', data: vm.listDibayar.concat(vm.is_data)})
    //   vm.$bvModal.hide('modal-dibayar')
    //   vm.button = 'Simpan';
    //   vm.busy = false;
    // },
    async simpan() {
      let vm = this
      vm.busy = true
      vm.button = 'Mohon Tunggu'
      this.$_api.post('pembayaranTagihan/register', {
        ...vm.is_data,
        tipe_pembayaran_tagihan: vm.is_data.tipe_pembayaran_tagihan.value,
        kas_id: vm.is_data.kas.id,
        tagihan_id: vm.dataHeader.tagihan_id
      }).then((pembayaran) => {
        console.log('pembayaran', pembayaran)
        if (pembayaran.status === 200) {
          this.$_alert.success('Berhasil Manambahkan Ditanggung')
          vm.$emit('getDibayar')
          vm.$bvModal.hide('modal-dibayar')
        }
        vm.button = 'Simpan'
        vm.busy = false
      })
    },
    resetModal() {
      // this.$v.$reset()
      this.is_data = {
        nama_dibayar: '',
        tgl_pembayaran_tagihan: new Date(),
        kas: null,
        tipe_pembayaran_tagihan: null,
        jumlah_bayar_tagihan: 0,
        nama_jumlah_bayar_tagihan: 'Rp 0,00'
      }
    },
    toNumeric(number, type) {
      let data = {}
      if (type === 'no-idr') {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number).slice(3)
      } else {
        if (type === 'idr') data = { style: 'currency', currency: 'IDR' }
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    }
  }
}
</script>
