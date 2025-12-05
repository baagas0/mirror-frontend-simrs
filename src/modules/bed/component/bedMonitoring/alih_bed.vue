<template>
  <div>
    <b-modal id="modal-pindah" size="lg" centered title="Pindah Bed" header-bg-variant="warning"
      header-text-variant="light">
      <b-form>
        <s-input v-model="dataEdit.tgl_mulai" :item="{
          label: 'Tanggal Masuk',
          type: 'datetime',
          validation: ['required']
        }"></s-input>

        <s-input v-model="dataEdit.kelas_kamar" :item="{
          id: 'kelas_kamar',
          data: 'kelas_kamar',
          label: 'Kelas Kamar',
          type: 'lookup-radio',
          validation: ['required'],
          api: 'msKelasKamar',
          pointer: {
            label: 'nama_kelas_kamar',
            code: 'id',
            display: ['nama_kelas_kamar']
          }
        }" :disabled="kelasnya"></s-input>

        <s-input v-model="bed" :item="{
          label: 'Bed',
          type: 'lookup-radio',
          validation: ['required'],
          api: 'msBed/detailsByKelasIdBypassUri',
          pointer: {
            label: 'nama_bed',
            code: 'ms_bed_id',
            display: ['nama_bed']
          },
          param: paramBed
        }"></s-input>

        <s-input v-model="dataEdit.keterangan_history_bed" :item="{
          label: 'Keterangan',
          type: 'textarea',
          validation: ['required']
        }"></s-input>

      </b-form>

      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-pindah')">
          Batal
        </b-button>
        <b-button variant="primary" @click="simpan()">
          {{ button }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import _ from 'lodash'
// import axios from "axios";
// // import { ipBackend } from "@/ipBackend";
// // import Multiselect from "vue-multiselect";
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";
// import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";

import moment from 'moment'
moment.locale('ID')

export default {
  name: 'modalEdit',
  components: {
  },
  props: ['data', 'edit', 'options_kelas_kamar'],
  data () {
    return {
      kelas_kamar: '',
      bed: '',
      paramBed: {},
      options_bed: [],
      dataEdit: {
        ms_bed_id: '',
        registrasi_id: '',
        keterangan_history_bed: '',
        tgl_mulai: '',
        status_checkout: 0,
        status_monitoring: 1,
        kelas_kamar: ''
      },
      busy: false,
      button: 'Simpan'
    }
  },
  computed: {
    kelasnya () {
      if (!this.kelas_kamar) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    // edit: function (newVal, oldVal) {
    //   if (oldVal != newVal) {
    //     let vm = this
    //   }
    // },
    // 'data': {
    //   handler (to) {
    //   }
    // },
    'dataEdit.kelas_kamar': {
      deep: true,
      immediate: true,
      handler (to) {

        this.paramBed = {
          ms_kelas_kamar_id: to,
          ms_jenis_layanan_id: this.jenis_layanan_id,
          status_bed: 1,
          isAvailable: true
        }
        console.log(this.dataEdit.kelas_kamar)
      }
    }
  },
  methods: {
    simpan () {
      console.log('submitttttttttttttttt')
      let vm = this
      vm.busy = true
      vm.button = 'Mohon Tunggu'
      vm.dataEdit.ms_bed_id = vm.bed.ms_bed_id
      vm.dataEdit.registrasi_id = vm.registrasi_id
      this.$_api
        .post('historyBed/alihBed', vm.dataEdit)
        .then((res) => {
          console.log(res)
          if (res.message == 'sukses') {
            vm.button = 'Simpan'
            vm.busy = false
            vm.$emit('alertFromChild', {
              variant: 'success',
              msg: 'BERHASIL MEMINDAHKAN BED',
              showing: true
            })
            this.$bvModal.hide('modal-pindah')
            this.type = ''
            vm.resetModal()
          } else {
            vm.button = 'Simpan'
            vm.busy = false
            vm.$emit('alertFromChild', {
              variant: 'danger',
              msg: _.toUpper(res.message),
              showing: true
            })
          }
        })
        .catch((err) => {
          console.log(err)
          vm.button = 'Simpan'
          vm.busy = false
          vm.$emit('alertFromChild', {
            variant: 'danger',
            msg: 'TERJADI KESALAHAN PADA SERVER',
            showing: true
          })
        })
    },
    resetModal () {
      this.dataEdit = {
        ms_bed_id: '',
        registrasi_id: '',
        keterangan_history_bed: '',
        tgl_mulai: '',
        status_checkout: 0,
        status_monitoring: 1
      }
      this.bed = ''
      this.kelas_kamar = ''
    }
  }
}
</script>
