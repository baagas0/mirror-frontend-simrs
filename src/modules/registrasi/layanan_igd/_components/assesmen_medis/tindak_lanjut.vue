<template>
  <div class="card card-custom card-sticky">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Tindak Lanjut <i class="mr-2"></i>
          <small class="">{{ dataRegistrasi.nama_lengkap }}</small>
        </h3>
      </div>
      <div class="card-toolbar">
        <div class="btn-group">
          <button type="button" class="btn btn-primary" @click="$parent.updateAssesmen('tindak_lanjut', mData)">
            <i class="ri-save-line"></i>
            Simpan
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <s-input
                v-model="mData.tindak_lanjut"
                :item="{
                  label: '',
                  id: 'tindak_lanjut',
                  data: 'tindak_lanjut',
                  value: mData.tindak_lanjut,
                  type: 'lookup-button',
                  validation: [],
                  pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      // { code: 'Lanjut Observasi', label: 'Lanjut Observasi' },
                      { code: 'Transfer Rawat Jalan', label: 'Transfer Rawat Jalan' },
                      { code: 'Transfer Rawat Inap', label: 'Transfer Rawat Inap' },
                      { code: 'Rujuk EKsternal', label: 'Rujuk EKsternal' },
                      { code: 'Pengobatan Selesai', label: 'Pengobatan Selesai' },
                      { code: 'Rujuk Internal', label: 'Rujuk Internal' },
                      { code: 'APS', label: 'APS' },
                      // { code: 'Meninggal', label: 'Meninggal' },
                    ],
                  },
                  rows: 1,
                }"
                :disabled="is_validasi"
                :valuee="mData.tindak_lanjut" />
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("id");

export default {
  name: "anamnesa",
  props: {
    is_validasi: {
      type: Boolean,
      required: true,
      default() {
        return false;
      },
    },
    objectDataAssesmen: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    mData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // mData: {}
    };
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        this.$emit("dataChange", true);
      },
    },
  },
  mounted() {},
  methods: {
    onSubmitEvaluasi() {
      this.$emit("submit", { key: "subjective", data: this.mData });
    },
  },
};
</script>
