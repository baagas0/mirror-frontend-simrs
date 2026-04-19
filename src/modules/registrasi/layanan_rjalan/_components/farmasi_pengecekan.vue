<template>
  <div>
    <template v-if="state === 'list'">
      <div class="row">
        <div class="col-12">
          <div class="p-3">
            <h5>- Obat Jadi</h5>
          </div>
        </div>
        <div class="col-12" v-for="(item, i) in aResepDetail" :key="'resep-detail' + i">
          <div class="card card-custom p-3">
            <div class="card body bg-light-warning pt-0 pb-0 pr-0 pl-3">
              <div class="row align-items-center">
                <div class="col-3">
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.awal_id_obat ? item.awal_id_obat.substring(0, 10) : "" }}</p>
                  <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.awal_nama_obat || "-" }}</h6>
                </div>
                <div class="col-3">
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_signa || "-" }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_harga || "-" }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_qty || "-" }} / {{ item.awal_satuan || "-" }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_aturan_pakai || "-" }}</p>
                </div>
                <div class="col-6">
                  <div class="card card-custom" style="border-radius: 15px 0px 0px 15px">
                    <div class="card body bg-light-success p-4" style="border-radius: 15px 0px 0px 15px">
                      <div class="row align-items-center">
                        <div class="col-5">
                          <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.final_id_obat ? item.final_id_obat.substring(0, 10) : "" }}</p>
                          <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.final_nama_obat || "-" }}</h6>
                        </div>
                        <div class="col-5">
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_signa || "-" }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_harga || "-" }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_qty || "-" }} / {{ item.final_satuan || "-" }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_aturan_pakai || "-" }}</p>
                        </div>
                        <div class="col-2 align-items-start">
                          <label class="checkbox checkbox-outline checkbox-danger">
                            <input type="checkbox" :name="'status_resep_detail_rjalan' + item.id" v-model="item.status_resep_detail_rjalan" :checked="item.status_resep_detail_rjalan" @change="updateResepDetail(item)" />
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <farmasi-telaah-obat-racik-list :oResep="oResep" :disableAdd="true" :disableEdit="true" :showChecklist="true" :enableChecklist="true"></farmasi-telaah-obat-racik-list>
      </div>
      <div class="row px-3">
        <div class="col-3">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_obat" v-model="oResep.tepat_obat" :checked="oResep.tepat_obat" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Obat
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_waktu" v-model="oResep.tepat_waktu" :checked="oResep.tepat_waktu" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Waktu
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="interaksi_obat" v-model="oResep.interaksi_obat" :checked="oResep.interaksi_obat" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Interaksi Obat
            </label>
          </div>
        </div>
        <div class="col-3">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_dosis" v-model="oResep.tepat_dosis" :checked="oResep.tepat_dosis" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Dosis
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="duplikasi" v-model="oResep.duplikasi" :checked="oResep.duplikasi" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Duplikasi
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="kontra_indikasi_lain" v-model="oResep.kontra_indikasi_lain" :checked="oResep.kontra_indikasi_lain" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Kontra Indikasi Lain
            </label>
          </div>
        </div>
        <div class="col-4">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_rute" v-model="oResep.tepat_rute" :checked="oResep.tepat_rute" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Rute
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="alergi" v-model="oResep.alergi" :checked="oResep.alergi" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Alergi
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="kesesuaian_fornas" v-model="oResep.kesesuaian_fornas" :checked="oResep.kesesuaian_fornas" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Kesesuaian Dengan Fornas
            </label>
          </div>
        </div>
      </div>
      <div class="row px-3" v-if="aResepDetail.length">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="submitData()">Proses Pengecekan <i class="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </template>
    <template v-if="state === 'create'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bolder text-dark mb-0 pb-0">Form Tambah Resep</h6>
          <a class="btn btn-outline-primary btn-icon btn-circle" @click="switchState('list')"><i class="ri-arrow-go-back-line p-0"></i></a>
        </div>
        <div class="col-12 mt-3">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-12">
                  <s-input
                    v-model="mData.final_id_obat"
                    :key="'final_id_obat'"
                    :id="'final_id_obat'"
                    :item="{
                      label: 'Obat',
                      id: 'final_id_obat',
                      data: 'final_id_obat',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.final_id_obat,
                      api: 'msBarang',
                      pointer: {
                        label: 'nama_barang',
                        code: 'id',
                        display: ['nama_barang'],
                      },
                      param: {},
                    }"
                    :valuee="mData.final_id_obat" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.final_nama_obat"
                    :key="'final_nama_obat'"
                    :id="'final_nama_obat'"
                    :item="{
                      label: 'Nama Obat',
                      id: 'final_nama_obat',
                      data: 'final_nama_obat',
                      type: 'text',
                      validation: ['required'],
                      value: mData.final_nama_obat,
                      param: {},
                    }"
                    :valuee="mData.final_nama_obat" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.final_signa"
                    :key="'final_signa'"
                    :id="'final_signa'"
                    :item="{
                      label: 'Signa',
                      id: 'final_signa',
                      data: 'final_signa',
                      type: 'text',
                      validation: ['required'],
                      value: mData.final_signa,
                      param: {},
                    }"
                    :valuee="mData.final_signa" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.final_harga"
                    :key="'final_harga'"
                    :id="'final_harga'"
                    :item="{
                      label: 'Harga',
                      id: 'final_harga',
                      data: 'final_harga',
                      type: 'money',
                      validation: ['required'],
                      value: mData.final_harga,
                      param: {},
                    }"
                    :valuee="mData.final_harga" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.final_satuan"
                    :key="'final_satuan'"
                    :id="'final_satuan'"
                    :item="{
                      label: 'Satuan',
                      id: 'final_satuan',
                      data: 'final_satuan',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.final_satuan,
                      api: 'msSatuanBarang',
                      pointer: {
                        label: 'nama_satuan',
                        code: 'nama_satuan',
                        display: ['nama_satuan'],
                      },
                      param: {},
                    }"
                    :valuee="mData.final_satuan" />
                </div>
                <div class="col-6">
                  <s-input
                    v-model="mData.final_qty"
                    :key="'final_qty'"
                    :id="'final_qty'"
                    :item="{
                      label: 'Qty',
                      id: 'final_qty',
                      data: 'final_qty',
                      type: 'number',
                      validation: ['required'],
                      value: mData.final_qty,
                      param: {},
                    }"
                    :valuee="mData.final_qty" />
                </div>
                <!-- <div class="col-4">
                  <s-input
                    v-model="mData.final_aturan_pakai"
                    :key="'final_aturan_pakai'"
                    :id="'final_aturan_pakai'"
                    :item="{
                      label: 'Aturan Pakai',
                      id: 'final_aturan_pakai',
                      data: 'final_aturan_pakai',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.final_aturan_pakai,
                      pointer: {
                        label: 'label',
                        code: 'code',
                        display: ['label'],
                        list: [
                          { label: 'Tablet Sesudah Makan', code: 'Tablet Sesudah Makan' },
                          { label: 'Tablet Sebelum Makan', code: 'Tablet Sebelum Makan' },
                        ],
                      },
                      param: {},
                    }"
                    :valuee="mData.final_aturan_pakai" />
                </div> -->
                <div class="col-4 d-flex gap-6">
                  <s-input
                    v-model="mData.final_aturan_pakai"
                    :key="'final_aturan_pakai'"
                    :id="'final_aturan_pakai'"
                    :item="{
                      label: 'Aturan Pakai',
                      id: 'final_aturan_pakai',
                      data: 'final_aturan_pakai',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.final_aturan_pakai,
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
                    :valuee="mData.final_aturan_pakai" />
                  <div>
                    <label for="asda">&ensp;</label>
                    <ms-aturan-pakai />
                  </div>
                </div>
                <div class="col-12 align-self-center">
                  <button type="submit" class="btn btn-light-primary mr-3">
                    <i class="ri-save-line"></i>
                    {{ $t("global.submit") }}
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import FarmasiTelaahObatRacikList from "./farmasi_telaah_obat_racik_list.vue";

import moment from "moment";
moment.locale("id");

export default {
  name: "farmasi_pengecekan",
  components: { FarmasiTelaahObatRacikList },
  props: {
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    oResep: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    aResepDetail: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      mData: {},
      state: "list",
    };
  },
  watch: {
    "mData.final_id_obat": function (newVal, oldVal) {
      this.$_api.single("msBarang", { id: newVal }, newVal).then((res) => {
        // console.log(res.data[0].nama_barang)
        this.mData.final_nama_obat = res.data[0].nama_barang;
      });
    },
  },
  mounted() {
    console.log("aResepDetail", this.aResepDetail);
  },
  methods: {
    onSubmit(data) {
      this.mData.resep_id = this.oResep.id;
      this.$_api.create("resep_detail_rjalan", this.mData).then((res) => {
        this.switchState("list");
        this.$emit("reloadData");
      });
    },
    updateResepDetail(data) {
      this.$_api.update("resep_detail_rjalan", data).then((res) => {
        this.switchState("list");
        this.$emit("reloadData");
      });
    },
    submitData() {
      this.$emit("updateResepData", { ...this.oResep, tahap_resep: this.oResep.tahap_resep + 1 });
    },
    switchState(state) {
      this.state = state;
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
