<template>
  <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px">
    <b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-planning style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px">
      <div class="card-title" style="padding: 0.7rem 1rem">
        <h4 class="card-label">Planning</h4>
      </div>
      <div class="card-toolbar" style="margin: 0.5rem 1rem">
        <i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
        <i class="ri-arrow-right-double-line text-white" v-else></i>
      </div>
    </b-card-header>
    <b-collapse id="accordion-planning" v-model="collapse" accordion="accordion-planning" role="tabpanel">
      <b-card-body>
        <div class="row">
          <div class="col-12">
            <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px">
              <b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-planning-procedure style="min-height: 0px; background-color: #bfb36d; border-radius: 10px 10px 0px 0px">
                <div class="card-title" style="padding: 0.7rem 1rem">
                  <h4 class="card-label">Prosedur</h4>
                </div>
                <div class="card-toolbar" style="margin: 0.5rem 1rem">
                  <i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
                  <i class="ri-arrow-right-double-line text-white" v-else></i>
                </div>
              </b-card-header>
              <b-collapse id="accordion-planning-procedure" v-model="collapse_procedure" accordion="accordion-planning-procedure" role="tabpanel">
                <b-card-body>
                  <div class="row">
                    <div class="col-12">
                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(submitProcedure)" autocomplete="off">
                          <div class="row">
                            <div class="col-6">
                              <s-input
                                v-model="fProcedure.tipe_procedure"
                                :key="'tipe_procedure'"
                                :id="'tipe_procedure'"
                                :item="{
                                  label: 'Tipe Procedure',
                                  id: 'tipe_procedure',
                                  data: 'tipe_procedure',
                                  type: 'lookup-radio',
                                  validation: [],
                                  value: fProcedure.tipe_procedure,
                                  pointer: {
                                    label: 'label',
                                    code: 'code',
                                    display: ['label'],
                                    list: [
                                      { label: 'ICD', code: 'ICD' },
                                      { label: 'Non ICD', code: 'Non ICD' },
                                    ],
                                  },
                                  param: {},
                                }"
                                :valuee="fProcedure.tipe_procedure" />
                            </div>
                            <div class="col-6">
                              <s-input
                                v-model="fProcedure.tindakan"
                                :key="'tindakan'"
                                :id="'tindakan'"
                                :item="{
                                  label: 'Tindakan',
                                  id: 'tindakan',
                                  data: 'tindakan',
                                  type: 'lookup-radio',
                                  validation: [],
                                  value: fProcedure.tindakan,
                                  api: 'msJasa',
                                  return_object: true,
                                  pointer: {
                                    label: 'nama_jasa',
                                    code: 'ms_jasa_id',
                                    display: ['nama_jasa'],
                                  },
                                  param: {},
                                }"
                                :valuee="fProcedure.tindakan" />
                            </div>
                            <div class="col-6">
                              <s-input
                                v-model="fProcedure.procedure"
                                :key="'procedure'"
                                :id="'procedure'"
                                :item="{
                                  label: 'Procedure',
                                  id: 'procedure',
                                  data: 'procedure',
                                  type: 'text',
                                  validation: [],
                                  value: fProcedure.procedure,
                                  param: {},
                                }"
                                :valuee="fProcedure.procedure" />
                            </div>
                            <div class="col-6">
                              <s-input
                                v-model="fProcedure.keterangan"
                                :key="'keterangan'"
                                :id="'keterangan'"
                                :item="{
                                  label: 'Keterangan',
                                  id: 'keterangan',
                                  data: 'keterangan',
                                  type: 'text',
                                  validation: [],
                                  value: fProcedure.keterangan,
                                  param: {},
                                }"
                                :valuee="fProcedure.keterangan" />
                            </div>
                            <div class="col-12 align-self-center">
                              <button type="reset" class="btn btn-light-danger mr-3">
                                <i class="ri-loop-right-fill"></i>
                                Reset
                              </button>
                              <button type="submit" class="btn btn-light-primary mr-3">
                                <i class="ri-save-line"></i>
                                {{ $t("global.submit") }}
                              </button>
                            </div>
                          </div>
                        </form>
                      </ValidationObserver>
                    </div>
                    <div class="col-12">
                      <hr />
                    </div>
                    <div class="col-12">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tipe Prosedur</th>
                            <th>Prosedur</th>
                            <th>Tindakan</th>
                            <th>Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, i) in mData.prosedur" :key="'table-prosedur' + i">
                            <td>
                              <a href="#" @click="onDelete(i, 'prosedur')" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                                <i class="ri-delete-bin-line"></i>
                              </a>
                            </td>
                            <td>{{ item.tipe_procedure || "-" }}</td>
                            <!-- <td>{{ item.procedure || '-'  }}</td> -->
                            <td>
                              {{ typeof item.procedure == "object" ? (item.procedure && item.procedure.nama_prosedur ? `${item.procedure.kode_prosedur} - ${item.procedure.nama_prosedur}` : "-") : item.procedure }}
                            </td>
                            <td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : "-" }}</td>
                            <td>{{ item.keterangan || "-" }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>

          <div class="col-12">
            <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px">
              <b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-planning-obat_jadi style="min-height: 0px; background-color: #bfb36d; border-radius: 10px 10px 0px 0px">
                <div class="card-title" style="padding: 0.7rem 1rem">
                  <h4 class="card-label">Obat Jadi</h4>
                </div>
                <div class="card-toolbar" style="margin: 0.5rem 1rem">
                  <i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
                  <i class="ri-arrow-right-double-line text-white" v-else></i>
                </div>
              </b-card-header>
              <b-collapse id="accordion-planning-obat_jadi" v-model="collapse_obat_jadi" accordion="accordion-planning-obat_jadi" role="tabpanel">
                <b-card-body>
                  <div class="row">
                    <div class="col-12">
                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(submitObatJadi)" autocomplete="off">
                          <div class="row">
                            <!-- <div class="col-6">
                              <s-input v-model="fObatJadi.tipe" :key="'tipe'" :id="'tipe'" :item="{
                                label: 'Tipe',
                                id: 'tipe',
                                data: 'tipe',
                                type: 'lookup-radio',
                                validation: [],
                                value: fObatJadi.tipe,
                                pointer: {
                                  label: 'label',
                                  code: 'code',
                                  display: ['label'],
                                  list: [
                                    { label: 'Kandungan', code: 'Kandungan' },
                                    { label: 'Obat', code: 'Obat' },
                                  ]
                                },
                                param: {},
                              }" :valuee="fObatJadi.tipe" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="fObatJadi.jenis_obat" :key="'jenis_obat'" :id="'jenis_obat'" :item="{
                                label: 'Jenis Obat',
                                id: 'jenis_obat',
                                data: 'jenis_obat',
                                type: 'text',
                                validation: [],
                                value: fObatJadi.jenis_obat,
                                param: {},
                              }" :valuee="fObatJadi.jenis_obat || 'Obat Jadi'" />
                            </div> -->
                            <div class="col-12">
                              <s-input
                                v-model="fObatJadi.nama_obat"
                                :key="'nama_obat'"
                                :id="'nama_obat'"
                                :item="{
                                  label: 'Obat',
                                  id: 'nama_obat',
                                  data: 'nama_obat',
                                  type: 'lookup-radio',
                                  validation: [],
                                  value: fObatJadi.nama_obat,
                                  api: 'msBarang',
                                  return_object: true,
                                  pointer: {
                                    label: 'nama_barang',
                                    code: 'ms_barang_id',
                                    display: ['nama_barang'],
                                  },
                                  param: {},
                                }"
                                :valuee="fObatJadi.nama_obat" />
                            </div>
                            <!-- <div class="col-12">
                              <s-input v-model="fObatJadi.nama_obat" :key="'nama_obat'" :id="'nama_obat'" :item="{
                                label: 'Obat',
                                id: 'nama_obat',
                                data: 'nama_obat',
                                type: 'text',
                                validation: [],
                                value: fObatJadi.nama_obat,
                                param: {},
                              }" :valuee="fObatJadi.nama_obat" />
                            </div> -->
                            <div class="col-12">
                              <div class="row">
                                <div class="col-6">
                                  <div class="row">
                                    <div class="col-12">
                                      <s-input
                                        v-model="fObatJadi.jumlah"
                                        :key="'jumlah'"
                                        :id="'jumlah'"
                                        :item="{
                                          label: 'Jumlah',
                                          id: 'jumlah',
                                          data: 'jumlah',
                                          hint: '',
                                          type: 'number',
                                          validation: [],
                                          value: fObatJadi.jumlah,
                                          param: {},
                                        }"
                                        :valuee="fObatJadi.jumlah" />
                                    </div>
                                    <div class="col-12">
                                      <s-input
                                        v-model="fObatJadi.signa"
                                        :key="'signa'"
                                        :id="'signa'"
                                        :item="{
                                          label: 'Signa',
                                          id: 'signa',
                                          data: 'signa',
                                          hint: '',
                                          type: 'text',
                                          validation: [],
                                          value: fObatJadi.signa,
                                          param: {},
                                        }"
                                        :valuee="fObatJadi.signa" />
                                    </div>
                                    <!-- <div class="col-6">
                                      <s-input v-model="fObatJadi.aturan_pakai" :key="'aturan_pakai'" :id="'aturan_pakai'" :item="{
                                        label: 'Aturan Pakai',
                                        id: 'aturan_pakai',
                                        data: 'aturan_pakai',
                                        type: 'lookup-radio',
                                        validation: [],
                                        value: fObatJadi.aturan_pakai,
                                        pointer: {
                                          label: 'label',
                                          code: 'code',
                                          display: ['label'],
                                          list: [
                                            { label: 'Tablet Sesudah Makan', code: 'Tablet Sesudah Makan' },
                                            { label: 'Tablet Sebelum Makan', code: 'Tablet Sebelum Makan' },
                                          ]
                                        },
                                        param: {},
                                      }" :valuee="fObatJadi.aturan_pakai" />
                                    </div> -->
                                    <div class="col-6 d-flex gap-6">
                                      <s-input
                                        v-model="fObatJadi.aturan_pakai"
                                        :key="'aturan_pakai'"
                                        :id="'aturan_pakai'"
                                        :item="{
                                          label: 'Aturan Pakai',
                                          id: 'aturan_pakai',
                                          data: 'aturan_pakai',
                                          type: 'lookup-radio',
                                          validation: ['required'],
                                          value: fObatJadi.aturan_pakai,
                                          api: 'msAturanPakai',
                                          return_object: false,
                                          pointer: {
                                            label: 'name',
                                            code: 'name',
                                            display: ['name'],
                                          },
                                          param: {
                                            type: 'OBAT',
                                          },
                                        }"
                                        :disabled="objectDataAssesmen.is_validasi"
                                        :valuee="fObatJadi.aturan_pakai" />
                                      <div>
                                        <label for="asda">&ensp;</label>
                                        <ms-aturan-pakai />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="row">
                                    <div class="col-12">
                                      <s-input
                                        v-model="fObatJadi.satuan_jual"
                                        :key="'satuan_jual'"
                                        :id="'satuan_jual'"
                                        :item="{
                                          label: 'Satuan Jual',
                                          id: 'satuan_jual',
                                          data: 'satuan_jual',
                                          hint: '',
                                          type: 'lookup-radio',
                                          validation: [],
                                          value: fObatJadi.satuan_jual,
                                          api: 'msSatuanBarang',
                                          pointer: {
                                            label: 'nama_satuan',
                                            code: 'nama_satuan',
                                            display: ['nama_satuan'],
                                          },
                                          param: {},
                                        }"
                                        :valuee="fObatJadi.satuan_jual" />
                                    </div>
                                    <div class="col-12">
                                      <s-input
                                        v-model="fObatJadi.satuan_pakai"
                                        :key="'satuan_pakai'"
                                        :id="'satuan_pakai'"
                                        :item="{
                                          label: 'Satuan Pakai',
                                          id: 'satuan_pakai',
                                          data: 'satuan_pakai',
                                          hint: '',
                                          type: 'lookup-radio',
                                          validation: [],
                                          value: fObatJadi.satuan_pakai,
                                          api: 'msSatuanBarang',
                                          pointer: {
                                            label: 'nama_satuan',
                                            code: 'nama_satuan',
                                            display: ['nama_satuan'],
                                          },
                                          param: {},
                                        }"
                                        :valuee="fObatJadi.satuan_pakai" />
                                    </div>
                                    <div class="col-12">
                                      <s-input
                                        v-model="fObatJadi.signa_manual"
                                        :key="'signa_manual'"
                                        :id="'signa_manual'"
                                        :item="{
                                          label: 'Signa Manual',
                                          id: 'signa_manual',
                                          data: 'signa_manual',
                                          hint: '',
                                          type: 'text',
                                          validation: [],
                                          value: fObatJadi.signa_manual,
                                          param: {},
                                        }"
                                        :valuee="fObatJadi.signa_manual" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-12 align-self-center">
                              <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                                <i class="ri-loop-right-fill"></i>
                                Reset
                              </button>
                              <button type="submit" class="btn btn-light-primary mr-3">
                                <i class="ri-save-line"></i>
                                {{ $t("global.submit") }}
                              </button>
                            </div>
                          </div>
                        </form>
                      </ValidationObserver>
                    </div>
                    <div class="col-12">
                      <hr />
                    </div>
                    <div class="col-12">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <!-- <th>Tipe</th>
                            <th>Jenis Obat</th> -->
                            <th>Obat</th>
                            <th>Jumlah</th>
                            <th>Signa</th>
                            <th>Aturan Pakai</th>
                            <th>Satuan Jual</th>
                            <th>Satuan Pakai</th>
                            <th>Signa Manual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, i) in mData.obat_jadi" :key="'table' + i">
                            <td>
                              <a href="#" @click="onDelete(i, 'obat_jadi')" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                                <i class="ri-delete-bin-line"></i>
                              </a>
                            </td>
                            <!-- <td>{{ item.tipe || '-'  }}</td>
                            <td>{{ item.jenis_obat || '-'  }}</td> -->
                            <td>{{ item.nama_obat && item.nama_obat.nama_barang ? item.nama_obat.nama_barang : "-" }}</td>
                            <td>{{ item.jumlah || "-" }}</td>
                            <td>{{ item.signa || "-" }}</td>
                            <td>{{ item.aturan_pakai || "-" }}</td>
                            <td>{{ item.satuan_jual || "-" }}</td>
                            <td>{{ item.satuan_pakai || "-" }}</td>
                            <td>{{ item.signa_manual || "-" }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import moment from "moment";
moment.locale("id");

import MsAturanPakai from "../../../../../components/component/ms_aturan_pakai.vue";

export default {
  name: "planning",
  components: {
    MsAturanPakai,
  },
  props: {
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
      collapse: false,
      collapse_procedure: true,
      collapse_obat_jadi: false,

      fProcedure: {},
      fObatJadi: {},
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
    submitObatJadi() {
      this.mData.obat_jadi.push(this.fObatJadi);
      this.fObatJadi = {};
    },
    submitProcedure() {
      this.mData.prosedur.push(this.fProcedure);
      this.fProcedure = {};
    },
    onSubmit() {
      this.$emit("submit", { key: "subjective", data: this.mData });
    },
    onDelete(index, key) {
      this.$_alert.confirm("Hapus data", "apakah anda yakin ingin menghapus data?").then((status) => {
        if (status.isDismissed) return;
        else {
          this.mData[key].splice(index, 1);
          // this.$emit('submit', { key: 'tindakan', data: this.mData })
        }
      });
    },
  },
};
</script>
