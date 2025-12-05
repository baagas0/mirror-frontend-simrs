<template>
  <div>
    <b-modal id="modal-ditanggung" size="md" centered title="Input Ditanggung" header-bg-variant="primary"
      @hidden="resetModal">
      <s-input v-model="is_data.nama_penanggung" :item="{
        label: 'Nama',
        id: 'nama_penanggung',
        data: 'nama_penanggung',
        type: 'text',
        validation: ['required'],
      }" :valuee="is_data.nama_penanggung"></s-input>
      <s-input v-model="is_data.jumlah_penanggung" :item="{
        label: 'Jumlah',
        id: 'jumlah_penanggung',
        data: 'jumlah_penanggung',
        type: 'money',
        validation: ['required'],
      }" :valuee="is_data.jumlah_penanggung"></s-input>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-ditanggung')">
          Batal
        </b-button>
        <b-button variant="primary" @click="simpan()">{{ button }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'modalInput',
  emits: ['changeVar', 'getDitanggung'],
  props: ['dataHeader', 'listDitanggung', 'listBarang', 'listJasa', 'listFasilitas'],
  data() {
    return {
      is_data: {
        nama_penanggung: null,
        jumlah_penanggung: null,
        nama_jumlah_penanggung: 'Rp 0,00'
      },
      src1: '',
      selected: null,
      busy: false,
      button: 'Simpan'
    }
  },
  // mixins: [validationMixin],
  // validations: {
  //   is_data: {
  //     nama_penanggung: { required },
  //     jumlah_penanggung: { required }
  //   }
  // },
  computed: {
    formString() {
      return JSON.stringify(this.is_data, null, 4)
    },
    // isValid () {
    //   return !this.$v.is_data.$invalid
    // },
    // isDirty () {
    //   return this.$v.is_data.$anyDirty
    // }
  },
  watch: {
    'is_data.jumlah_penanggung'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.is_data.nama_jumlah_penanggung = this.toNumeric(newVar, 'idr')
      }
    }
  },
  methods: {
    checkIfValid(fieldName) {
      const field = this.$v.is_data[fieldName]
      if (!field.$dirty) {
        return null
      }
      return !(field.$invalid || field.$model === '')
    },
    async simpan() {
      let vm = this
      vm.busy = true
      vm.button = 'Mohon Tunggu'
      // vm.$emit('changeVar', {to: 'listDitanggung', data: vm.listDitanggung.concat(vm.is_data)})
      this.$_api.post('penanggung/register', { ...vm.is_data, tagihan_id: vm.dataHeader.tagihan_id }).then((penanggungan) => {
        if (penanggungan.status === 200) {
          this.$_alert.success('Berhasil Manambahkan Ditanggung')
          vm.$emit('getDitanggung')
          vm.$bvModal.hide('modal-ditanggung')
        }
        vm.button = 'Simpan'
        vm.busy = false
      })
    },
    resetModal() {
      this.$v.$reset()
      this.is_data = {
        nama_penanggung: null,
        jumlah_penanggung: null,
        nama_jumlah_penanggung: 'Rp 0,00'
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
