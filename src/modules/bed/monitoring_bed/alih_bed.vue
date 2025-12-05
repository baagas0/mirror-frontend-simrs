<template>
    <div>
      <b-modal
        id="modal-pindah"
        size="lg"
        centered
        title="Pindah Bed"
        header-bg-variant="warning"
        header-text-variant="light"
      >
        <b-form>
            <b-form-group label-cols-md="3">
                <template v-slot:label>
                Tanggal Masuk<span class="text-danger">*</span>
                </template>
                <date-picker
                    style="width: 100%"
                    id="tanggal"
                    format="DD-MM-YYYY HH:mm"
                    show-hour
                    show-minute
                    type="datetime"
                    v-model="dataEdit.tgl_mulai"
                ></date-picker>
            </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Kelas Kamar <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="kelas_kamar"
                :options="options_kelas_kamar"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_kelas_kamar"
                track-by="id"
                placeholder="-- Pilih Kelas Kamar --"
                size="sm"
                @input="getBedForm(kelas_kamar)"
            ></multiselect>
          </b-form-group>
  
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Bed <span class="text-danger">*</span>
            </template>
            <multiselect
                v-model="bed"
                :options="options_bed"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_bed"
                track-by="ms_bed_id"
                :disabled="kelasnya"
                placeholder="-- Pilih Kelas Terlebih Dahulu --"
            ></multiselect>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Keterangan <span class="text-danger">*</span>
            </template>
            <b-form-input
              v-model="dataEdit.keterangan_history_bed"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-form>
  
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-pindah')">
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
  import _ from "lodash";
  import axios from "axios";
  import { ipBackend } from "@/ipBackend";
  import Multiselect from "vue-multiselect";
  import DatePicker from "vue2-datepicker";
  import "vue2-datepicker/index.css";
  // import { validationMixin } from "vuelidate";
  // import { required } from "vuelidate/lib/validators";

  import moment from "moment"
  moment.locale("ID")
  export default {
    name: "modalEdit",
    components: {
      Multiselect,
      DatePicker,
    },
    props: ["data", 'edit', 'options_kelas_kamar'],
    data() {
      return {
        kelas_kamar: "",
        bed: "",
        options_bed: [],
        dataEdit: {
            ms_bed_id: "",
            registrasi_id: "",
            keterangan_history_bed: "",
            tgl_mulai: "",
            status_checkout: 0,
            status_monitoring: 1,
        },
        busy: false,
        button: "Simpan",
      };
    },
    computed: {
    //   formString() {
    //     return JSON.stringify(this.data, null, 4);
    //   },
    //   isValid() {
    //     return !this.$v.data.$invalid;
    //   },
    //   isDirty() {
    //     return this.$v.data.$anyDirty;
    //   },
        kelasnya(){
            if(!this.kelas_kamar){
                return true
            }else {
                return false
            }
        }
    },
    // mixins: [validationMixin],
    // validations: {
    //   data: {
    //     nama_kamar: {
    //       required,
    //     },
    //     ms_ruang_id: {
    //       required,
    //     },
    //   },
    // },
    watch: {
      edit: function (newVal, oldVal) {
          if (oldVal != newVal) {
            let vm = this
            console.log(vm.data, 'ini datanya');
          }
      },
    },
    methods: {
      // checkIfValid(fieldName) {
      //   const field = this.$v.data[fieldName];
      //   if (!field.$dirty) {
      //     return null;
      //   }
      //   return !(field.$invalid || field.$model === "");
      // },
      async getBedForm(x){
        let vm = this
        console.log(x, 'ini x');
        vm.bed = ""
        let param = {}
        param.ms_kelas_kamar_id = x.id
        param.ms_jenis_layanan_id = vm.jenis_layanan_id
        param.status_bed = 1
        param.isAvailable = true
        let bed = await axios.post(ipBackend + '/msBed/detailsByKelasId', param);
        vm.options_bed = bed.data.data
        console.log(bed, 'ini bed');
      },
      simpan() {
        console.log('cok')
        let vm = this;
          vm.busy = true;
          vm.button = "Mohon Tunggu";
          vm.dataEdit.ms_bed_id = vm.bed.ms_bed_id
          vm.dataEdit.registrasi_id = vm.data.registrasi_id
          axios
            .post(ipBackend + "/historyBed/alihBed", vm.dataEdit)
            .then((res) => {
              console.log('res', res)
              if (res.data.message == "sukses") {
                vm.button = "Simpan";
                vm.busy = false;
                // vm.$emit("alertFromChild", {
                //   variant: "success",
                //   msg: "BERHASIL MEMINDAHKAN BED",
                //   showing: true,
                // });
                vm.$emit('alertFromChild', {})
                this.$_alert.success('Berhasil memindahkan bed.')
                this.$bvModal.hide("modal-pindah");
                this.data.type = "";
                vm.resetModal()
              } else {
                vm.button = "Simpan";
                vm.busy = false;
                this.$_alert.error({}, res.data.message)
                // vm.$emit("alertFromChild", {
                //   variant: "danger",
                //   msg: _.toUpper(res.data.message),
                //   showing: true,
                // });
                vm.$emit('alertFromChild', {})
              }
            })
            .catch((err) => {
              console.log('err', err.response.data.message)
              if (err.response && err.response.data && err.response.data.message) {
                this.$_alert.error({}, err.response.data.message)
              } else {
                this.$_alert.error({}, "Terjadi kesalahan pada server.")
              }

              vm.button = "Simpan";
              vm.busy = false;
              // vm.$emit("alertFromChild", {
              //   variant: "danger",
              //   msg: "TERJADI KESALAHAN PADA SERVER",
              //   showing: true,
              // });
              vm.$emit('alertFromChild', {})
            });
      },
      resetModal() {
        this.dataEdit = {
            ms_bed_id: "",
            registrasi_id: "",
            keterangan_history_bed: "",
            tgl_mulai: "",
            status_checkout: 0,
            status_monitoring: 1,
        };
        this.bed = ""
        this.kelas_kamar = ""
      },
    },
  };
  </script>
  