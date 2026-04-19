<template>
  <div class="card card-custom">
    <div class="card-body pt-4">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <!-- <div class="col-12">
              <s-input v-model="fData.rencana_perawatan" :item="{
                label: 'Rencana Perawatan',
                id: 'rencana_perawatan',
                data: 'rencana_perawatan',
                type: 'textarea',
                validation: ['required'],
                value: fData.rencana_perawatan,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.rencana_perawatan" />
            </div> -->

            <div class="col-12">
              <ul class="nav nav-tabs nav-tabs-line mb-5">
                <li class="nav-item">
                  <a class="nav-link pointer" @click="switchTab('keperawatan')" :class="{ active: tabActive === 'keperawatan' }">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Keperawatan</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link pointer" @click="switchTab('kebidanan')" :class="{ active: tabActive === 'kebidanan' }">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Kebidanan</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6" v-if="tabActive === 'keperawatan'">
                  <s-input
                    v-model="fData.diagnosa_keperawatan"
                    :item="{
                      label: 'Diagnosa ' + tabActive.charAt(0).toUpperCase() + tabActive.slice(1),
                      id: 'diagnosa_keperawatan',
                      data: 'diagnosa_keperawatan',
                      type: 'lookup-checkbox',
                      validation: ['required'],
                      value: fData.diagnosa_keperawatan,
                      return_object: true,
                      api: 'diagnosa_keperawatan',
                      pointer: {
                        label: 'nama_diagnosa',
                        code: 'id',
                        display: ['kode_diagnosa', 'nama_diagnosa'],
                        headerDisplay: ['Kode', 'Nama'],
                      },
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="fData.diagnosa_keperawatan" />
                </div>
                <div class="col-12" v-else-if="tabActive === 'kebidanan'">
                  <s-input
                    v-model="fData.nama_diagnosa"
                    :key="'nama_diagnosa'"
                    :id="'nama_diagnosa'"
                    :item="{
                      label: 'Diagnosa ' + tabActive.charAt(0).toUpperCase() + tabActive.slice(1),
                      id: 'nama_diagnosa',
                      data: 'nama_diagnosa',
                      type: 'text',
                      validation: ['required'],
                      value: fData.nama_diagnosa,
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="fData.nama_diagnosa" />
                </div>

                <div class="col-12">
                  <s-input
                    v-model="fData.subjective"
                    :key="'subjective'"
                    :id="'subjective'"
                    :item="{
                      label: 'Subjective',
                      id: 'subjective',
                      data: 'subjective',
                      type: 'text',
                      validation: ['required'],
                      value: fData.subjective,
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="fData.subjective" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="fData.objective"
                    :key="'objective'"
                    :id="'objective'"
                    :item="{
                      label: 'Objective',
                      id: 'objective',
                      data: 'objective',
                      type: 'text',
                      validation: ['required'],
                      value: fData.objective,
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="fData.objective" />
                </div>
                <div class="col-12 align-self-center">
                  <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                    <i class="ri-loop-right-fill"></i>
                    Reset
                  </button>
                  <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                    <i class="ri-save-line"></i>
                    {{ $t("global.submit") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <div class="row">
        <div class="col-12">
          <hr />
        </div>
        <div class="col-12">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Diagnosa</th>
                <th>Subjective</th>
                <th>Objective</th>
                <!-- <th>Evaluasi Diagnosa</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in mData[tabActive]" :key="'table' + tabActive + i">
                <td>
                  <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                    <i class="ri-delete-bin-line"></i>
                  </a>
                </td>
                <td>
                  <ul>
                    <li v-for="(diagnosa, i) in item.diagnosa_keperawatan" :key="'diagnosa' + i">{{ diagnosa.nama_diagnosa }} ({{ diagnosa.kode_diagnosa }})</li>
                  </ul>
                </td>
                <!-- <td></td> -->
                <td>{{ item.subjective || "-" }}</td>
                <td>{{ item.objective || "-" }}</td>
                <!-- <td>{{ item.evaluasi_diagnosa || '-'  }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("id");

export default {
  name: "keperawatan_assesment",
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
      tabActive: "keperawatan",
      fData: {
        diagnosa_keperawatan: "",
      },
    };
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        this.handleData();
        // this.$emit('dataChange', true)
      },
    },
  },
  mounted() {
    const tab_diagnosa_rencana = localStorage.getItem("tab_diagnosa_rencana");
    if (tab_diagnosa_rencana) {
      this.switchTab(tab_diagnosa_rencana);
      localStorage.removeItem("tab_diagnosa_rencana");
    }
  },
  methods: {
    resetForm() {
      // this.fData = {}
      // this.$refs.assesmenForm.reset();
    },
    handleData() {
      console.log("handleData");
      if (!this.mData.keperawatan) this.mData.keperawatan = [];
      if (!this.mData.kebidanan) this.mData.kebidanan = [];
    },
    switchTab(key) {
      this.tabActive = key;
      this.fData.diagnosa_keperawatan = {};
      this.fData.subjective = "";
      this.fData.objective = "";
    },
    onDelete(index) {
      this.$_alert.confirm("Hapus data", "apakah anda yakin ingin menghapus data?").then((status) => {
        if (status.isDismissed) return;
        else {
          localStorage.setItem("tab_diagnosa_rencana", this.tabActive);
          this.mData[this.tabActive].splice(index, 1);
          this.$emit("submit", { key: "diagnosa_rencana", data: this.mData });
        }
      });
    },
    onSubmitEvaluasi() {
      localStorage.setItem("tab_diagnosa_rencana", this.tabActive);
      this.fData.evaluasi_diagnosa = "Belum Teratasi";
      this.mData[this.tabActive].push(this.fData);
      this.$emit("submit", { key: "diagnosa_rencana", data: this.mData });
      this.fData = {};
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
