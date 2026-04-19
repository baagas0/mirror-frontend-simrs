<template>
  <div class="card card-custom">
    <div class="card-body pt-4">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
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
                <div class="col-6">
                  <div class="w-100 d-flex justify-content-start gap-10">
                    <s-input
                      v-model="fData.diagnosa_keperawatan"
                      class="w-100"
                      :key="'diagnosa_keperawatan'"
                      :id="'diagnosa_keperawatan'"
                      :item="{
                        label: 'Diagnosa ' + tabActive,
                        id: 'diagnosa_keperawatan',
                        data: 'diagnosa_keperawatan',
                        type: 'lookup-radio',
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

                    <div class="d-flex align-items-end">
                      <button type="button" class="btn form-group btn-sm btn-light-primary" @click="$bvModal.show('modal-form-diagnosa-keperawatan')">
                        <i class="ri-add-line"></i>
                      </button>
                    </div>
                  </div>
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
                <!-- <div class="col-12">
                  <s-input v-model="fData.objective" :key="'objective'" :id="'objective'" :item="{
                    label: 'Objective',
                    id: 'objective',
                    data: 'objective',
                    type: 'text',
                    validation: ['required'],
                    value: fData.objective,
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.objective" />
                </div> -->
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
                <!-- <th>Objective</th> -->
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
                <td>{{ item.diagnosa_keperawatan && item.diagnosa_keperawatan.nama_diagnosa ? item.diagnosa_keperawatan.nama_diagnosa : "-" }}</td>
                <!-- <td></td> -->
                <td>{{ item.subjective || "-" }}</td>
                <!-- <td>{{ item.objective || '-'  }}</td> -->
                <!-- <td>{{ item.evaluasi_diagnosa || '-'  }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <b-modal ref="modal-form-diagnosa-keperawatan" id="modal-form-diagnosa-keperawatan" :centered="true" :hide-footer="true" :hide-header="true" :size="'md'">
        <h3 class="mb-3">Form Diagnosa Keperawatan</h3>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form ref="formDiagnosaKeperawatan" @submit.prevent="handleSubmit(onSubmitFormDiagnosaKeperawatan)" autocomplete="off">
            <div class="row">
              <div class="col-12">
                <s-input
                  v-model="formDiagnosaKeperawatan.kode_diagnosa"
                  :key="'kode_diagnosa'"
                  :id="'kode_diagnosa'"
                  :item="{
                    label: 'Kode Diagnosa',
                    id: 'kode_diagnosa',
                    data: 'kode_diagnosa',
                    type: 'text',
                    validation: ['required'],
                    value: formDiagnosaKeperawatan.kode_diagnosa,
                    param: {},
                  }"
                  :valuee="formDiagnosaKeperawatan.kode_diagnosa" />
              </div>
              <div class="col-12">
                <s-input
                  v-model="formDiagnosaKeperawatan.nama_diagnosa"
                  :key="'nama_diagnosa'"
                  :id="'nama_diagnosa'"
                  :item="{
                    label: 'Nama Diagnosa',
                    id: 'nama_diagnosa',
                    data: 'nama_diagnosa',
                    type: 'text',
                    validation: ['required'],
                    value: formDiagnosaKeperawatan.nama_diagnosa,
                    param: {},
                  }"
                  :valuee="formDiagnosaKeperawatan.nama_diagnosa" />
              </div>
              <div class="col-12">
                <button type="button" class="btn btn-light-secondary text-dark mr-3" @click="$bvModal.hide('modal-form-diagnosa-keperawatan')">Tutup</button>
                <button type="submit" class="btn btn-primary mr-3">
                  <i class="ri-save-line"></i>
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </b-modal>
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
      formDiagnosaKeperawatan: {
        kode_diagnosa: "",
        nama_diagnosa: "",
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
  mounted() {},
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
          this.mData[this.tabActive].splice(index, 1);
          this.$emit("submit", { key: "assesment", open_tab: "assesment", data: this.mData });
        }
      });
    },
    onSubmitEvaluasi() {
      this.fData.evaluasi_diagnosa = "Belum Teratasi";
      this.mData[this.tabActive].push(this.fData);
      this.$emit("submit", { key: "assesment", open_tab: "assesment", data: this.mData });
      this.fData = {};
    },
    onSubmitFormDiagnosaKeperawatan() {
      this.$_alert.confirm("Simpan data", "apakah anda yakin ingin menyimpan data?").then((status) => {
        if (status.isDismissed) return;
        else {
          if (this.formDiagnosaKeperawatan.kode_diagnosa === "" || this.formDiagnosaKeperawatan.nama_diagnosa === "") {
            this.$_alert.error({}, "Kode dan Nama diagnosa harus diisi");
            return;
          }
          if (this.formDiagnosaKeperawatan.kode_diagnosa.length < 3) {
            this.$_alert.error({}, "Kode minimal 3 karakter");
            return;
          }
          if (this.formDiagnosaKeperawatan.nama_diagnosa.length < 3) {
            this.$_alert.error({}, "Nama minimal 3 karakter");
            return;
          }

          this.$_api
            .create("diagnosa_keperawatan", this.formDiagnosaKeperawatan)
            .then((res) => {
              console.log("craete diagnosa_keperawatan", res);
              this.$_alert.success("Data berhasil disimpan");
              this.$bvModal.hide("modal-form-diagnosa-keperawatan");
              this.formDiagnosaKeperawatan = {
                kode_diagnosa: "",
                nama_diagnosa: "",
              };
              this.fData.diagnosa_keperawatan = res.data;
            })
            .catch((err) => {
              this.$_alert.error("Data gagal disimpan");
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
