<template>
    <div>
      <b-modal
        id="modal-form"
        size="lg"
        title="Tambah Data Odontogram"
        header-bg-variant="primary"
        header-text-variant="light"
        @hidden="resetModal"
      >
        <div class="">
          <b-form>
            <b-form-group label-cols-md="3">
              <template v-slot:label>
                TANGGAL DIAGNOSA <span class="text-danger">*</span>
              </template>
              <date-picker
                style="width: 100%"
                id="a_tanggal_diagnosa_a"
                format="DD-MM-YYYY"
                v-model="is_data.a_tanggal_diagnosa_a"
              ></date-picker>
            </b-form-group>
          </b-form>
        </div>
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-input-icd-x')">
            Batal
          </b-button>
          <b-button
            variant="primary"
            :disabled="busy"
            @click="simpan()"
            >{{ button }}</b-button
          >
        </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  moment.locale('id');
  import 'moment/locale/id';
  export default {
    name: "modalInput",
    props: [],
    data() {
      return {
        is_data: {
          a_tanggal_diagnosa_a: '',
          a_icd_x_a: '',
          a_deskripsi_icd_x_a: '',
          a_jenis_diagnosa_a: '',
          a_jenis_kasus_a: '',
        },
        // },
        busy: false,
        button: "Simpan",
      };
    },
    computed: {},
    async mounted() {},
    methods: {
      simpan() {},
      
    },
  };
  </script>
  