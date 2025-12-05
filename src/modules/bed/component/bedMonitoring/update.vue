<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Edit Data Master Kamar"
        header-bg-variant="warning"
        header-text-variant="light"
      >
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama Kamar<span class="text-danger">*</span>
            </template>
            <b-form-input
              :state="checkIfValid('nama_kamar')"
              type="text"
              v-model="$v.nama_kamar.$model"
              @keydown.enter.prevent="simpan()"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Ruang <span class="text-danger">*</span>
            </template>
            <b-form-select
              v-model="$v.ms_ruang_id.$model"
              :state="checkIfValid('ms_ruang_id')"
              :options="option_ruang"
            ></b-form-select>
          </b-form-group>
        </b-form>
  
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-edit')">
            Batal
          </b-button>
          <b-button
            variant="primary"
            @click="simpan()"
          >
            {{ button }}
          </b-button>
        </template>
      </b-modal>
    </div>
  </template>
<script>
import _ from 'lodash'
export default {
  name: 'modalEdit',
  props: ['data', 'option_ruang'],
  data () {
    return {
      busy: false,
      button: 'Simpan'
    }
  },
  computed: {
    formString () {
      return JSON.stringify(this.data, null, 4)
    }
    // isValid () {
    //   return !this.$v.$invalid
    // },
    // isDirty () {
    //   return this.$v.$anyDirty
    // }
  },
  // mixins: [validationMixin],
  // validations: {
  //   data: {
  //     nama_kamar: {
  //       required
  //     },
  //     ms_ruang_id: {
  //       required
  //     }
  //   }
  // },
  methods: {
    checkIfValid (fieldName) {
      const field = this.$v.data[fieldName]
      if (!field.$dirty) {
        return null
      }
      return !(field.$invalid || field.$model === '')
    },
    simpan () {
      let vm = this
      if (true) {
        vm.busy = true
        vm.button = 'Mohon Tunggu'
        this.$_api
          .post('msKamar/update', {...vm.data, id: vm.ms_kamar_id})
          .then((res) => {
            if (res.message == 'sukses') {
              vm.button = 'Simpan'
              vm.busy = false
              vm.$emit('alertFromChild', {
                variant: 'success',
                msg: 'BERHASIL MENGUBAH DAFTAR MASTER KAMAR',
                showing: true
              })
              this.$bvModal.hide('modal-edit')
              this.type = ''
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
      }
    }
  }
}
</script>
