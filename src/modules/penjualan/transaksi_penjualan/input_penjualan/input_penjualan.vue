<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header" header-bg-variant="dark">
            <template #header>
              <h5 class="mb-0" style="color: #fff">
                <strong>Input Penjualan</strong>
              </h5>
            </template>
            <div class="">
              <!-- <pre>{{dataHeader}}</pre> -->
              <div class="">
                <b-row>
                  <b-col cols="3">
                    <div class="mt-1 mb-2 mr-2">
                      <div class="btn-group w-100">
                        <b-button class="btn" :variant="dataHeader.is_external === null || dataHeader.is_external === false ? 'success' : 'secondary'" size="sm" :disabled="dataHeader.is_external === true || headerBusy || isDraft > 0" @click="$bvModal.show('modal-pasien')">internal</b-button>
                        <b-button class="btn" :variant="dataHeader.is_external === null || dataHeader.is_external === true ? 'primary' : 'secondary'" size="sm" :disabled="dataHeader.is_external === false || headerBusy || isDraft > 0" @click="$bvModal.show('modal-pasien-external')">external</b-button>
                        <!-- :disabled="dataHeader.no_rm != null || headerBusy || isDraft > 0" -->
                      </div>
                    </div>
                    <div class="mt-3">
                      <label for="id_rm">No RM / No Kunjungan</label>
                      <h5 class="ml-2 my-auto">{{ dataHeader.no_rm || "-" }} / {{ dataHeader.no_kunjungan || "-" }}</h5>
                    </div>
                    <!-- <div class="mt-2">
                        <label for="id_rm">No RM</label>
                        <h5 class="ml-2 my-auto">{{dataHeader.no_rm || '-'}}</h5>
                      </div>
                      <div class="mt-2">
                        <label for="id_rm">No Kunjungan</label>
                        <h5 class="ml-2 my-auto">{{dataHeader.no_kunjungan || '-'}}</h5>
                      </div> -->
                    <div class="mt-2">
                      <label for="no_rm" :class="{ 'text-danger': !checkValidasi('nama').b }">Nama Pasien</label>
                      <h5 class="ml-2 my-auto">{{ dataHeader.nama || "-" }}</h5>
                    </div>
                    <div class="mt-2">
                      <label for="nik">NIK</label>
                      <h5 class="ml-2 my-auto">{{ dataHeader.NIK || "-" }}</h5>
                    </div>
                    <!-- <div class="mt-2">
                        <label for="nik">NIK</label>
                        <h5 class="ml-2 my-auto">{{dataHeader.NIK || '-'}}</h5>
                      </div> -->
                  </b-col>
                  <b-col cols="9">
                    <b-row style="row-gap: 15px" class="mx-1">
                      <!-- <b-col cols="12">
                          <hr>
                        </b-col> -->
                      <!-- <b-col cols="3">
                          <label for="kode_tagihan">No Tagihan / Kunjungan</label>
                          <h5>
                            <span class="text-success">{{dataHeader.kode_tagihan || '-'}}</span>
                            / {{dataHeader.no_kunjungan || '-'}}
                          </h5>
                        </b-col> -->
                      <b-col cols="3">
                        <label for="no_penjualan">No Penjualan</label>
                        <h5>{{ dataHeader.kode_penjualan || "-" }}</h5>
                      </b-col>
                      <b-col cols="3">
                        <label for="no_tagihan">No Tagihan</label>
                        <h5>{{ dataHeader.kode_tagihan || "-" }}</h5>
                      </b-col>
                      <b-col cols="6">
                        <label for="tgl_penjualan">Tanggal</label>
                        <date-picker style="width: 100%" id="tgl_penjualan1" format="DD-MM-YYYY HH:mm" v-model="dataHeader.tgl_penjualan" :state="checkValidasi('tgl_penjualan').s" :disabled="headerBusy || isDraft > 1"></date-picker>
                        <span class="text-danger">{{ checkValidasi("tgl_penjualan").m }}</span>
                      </b-col>
                      <b-col cols="4">
                        <label for="jenis_layanan">Jenis Layanan</label>
                        <multiselect id="jenis_layanan" v-model="dataHeader.jenis_layanan" :options="list_jenis_layanan" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_jenis_layanan" track-by="id" placeholder="-- Jenis Layanan --" size="sm" :disabled="dataHeader.registrasi_id != null || headerBusy || isDraft > 0" :class="{ invalid: !checkValidasi('jenis_layanan').b }"></multiselect>
                        <span class="text-danger">{{ checkValidasi("jenis_layanan").m }}</span>
                      </b-col>
                      <b-col cols="4">
                        <label for="dokter">DPJP</label>
                        <multiselect id="dokter" v-model="dataHeader.dokter" :options="list_dokter" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_dokter" track-by="ms_dokter_id" placeholder="-- DPJP --" size="sm" :class="{ invalid: !checkValidasi('dokter').b }" :disabled="headerBusy || isDraft > 0"></multiselect>
                        <span class="text-danger">{{ checkValidasi("dokter").m }}</span>
                      </b-col>
                      <b-col cols="4">
                        <label for="gudang">Gudang</label>
                        <multiselect id="gudang" v-model="dataHeader.gudang" :options="list_gudang" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_gudang" track-by="id" placeholder="-- Gudang --" size="sm" :class="{ invalid: !checkValidasi('gudang').b }" :disabled="headerBusy || isDraft > 0"></multiselect>
                        <span class="text-danger">{{ checkValidasi("gudang").m }}</span>
                      </b-col>
                      <b-col cols="4">
                        <label for="kelas">Kelas Kunjungan</label>
                        <multiselect id="kelas" v-model="dataHeader.kelas_kunjungan" :options="list_kelas_kunjungan" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_kelas" track-by="kelas_kunjungan_id" placeholder="-- Kelas --" size="sm" :class="{ invalid: !checkValidasi('kelas_kunjungan').b }" :disabled="dataHeader.registrasi_id != null || headerBusy || isDraft > 0"></multiselect>
                        <span class="text-danger">{{ checkValidasi("kelas_kunjungan").m }}</span>
                      </b-col>
                      <b-col cols="4">
                        <label for="asuransi">Asuransi</label>
                        <multiselect id="asuransi" v-model="dataHeader.asuransi" :options="list_asuransi" :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama_asuransi_harga" track-by="id" placeholder="-- Asuransi --" size="sm" :disabled="dataHeader.registrasi_id != null || headerBusy || isDraft > 0" :class="{ invalid: !checkValidasi('asuransi').b }"></multiselect>
                        <span class="text-danger">{{ checkValidasi("asuransi").m }}</span>
                      </b-col>
                      <b-col cols="4">
                        <label for="no_asuransi">No. Asuransi</label>
                        <b-form-input id="no_asuransi" v-model="dataHeader.no_asuransi" disabled :state="checkValidasi('no_asuransi').s"></b-form-input>
                        <span class="text-danger">{{ checkValidasi("no_asuransi").m }}</span>
                      </b-col>
                      <!-- <b-col cols="12">
                          <hr>
                        </b-col> -->
                    </b-row>
                  </b-col>
                </b-row>
                <b-row cols="12" class="mt-3">
                  <!-- <b-col cols="3">
                      <label for="petugas">Petugas</label>
                      <b-form-input
                        id="petugas"
                        v-model="dataHeader.petugas"
                        :state="checkValidasi('petugas').s"
                        :disabled="headerBusy || isDraft > 1"
                      ></b-form-input>
                      <span class="text-danger">{{checkValidasi('petugas').m}}</span>
                    </b-col> -->
                </b-row>
              </div>
              <b-row class="">
                <b-col cols="12" class="mt-4 my-3 btn-group w-100">
                  <button @click="tab = 1" class="btn" :class="tab == 1 ? 'btn-success' : 'btn-outline-success'" type="button">Barang</button>
                  <button @click="tab = 2" class="btn" :class="tab == 2 ? 'btn-success' : 'btn-outline-success'" type="button">Jasa</button>
                  <button @click="tab = 3" class="btn" :class="tab == 3 ? 'btn-success' : 'btn-outline-success'" type="button">Fasilitas</button>
                  <button @click="tab = 4" class="btn" :class="tab == 4 ? 'btn-success' : 'btn-outline-success'" type="button">Penunjang</button>
                </b-col>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="6" v-show="tab == 1">
                      <BarangList :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualBarang" :listBarang="listBarang" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="6" v-show="tab == 2">
                      <JasaList :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualJasa" :list="listJasa" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="6" v-show="tab == 3">
                      <FasilitasList :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualFasilitas" :list="listFasilitas" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="6" v-show="tab == 4">
                      <PenunjangList :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualPenunjang" :list="listPenunjang" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="6">
                      <Perhitungan :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :listJualPenunjang="listJualPenunjang" :listJualFasilitas="listJualFasilitas" :listJualJasa="listJualJasa" :listJualBarang="listJualBarang" :isDraft="isDraft" :statusTagihan="statusTagihan" :headerBusy="headerBusy" :isValid="isValid" :isDirty="isDirty" @touchForm="v$.dataHeader.$touch()" @changeVar="changeVar" @resetData="resetData" />
                    </b-col>
                    <b-col cols="12" v-show="tab == 1">
                      <BarangListJual :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listBarang="listJualBarang" :listJual="listJualBarang" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="12" v-show="tab == 2">
                      <JasaListJual :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualJasa" :list="listJasa" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="12" v-show="tab == 3">
                      <FasilitasListJual :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualFasilitas" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                    <b-col cols="12" v-show="tab == 4">
                      <PenunjangListJual :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualPenunjang" :isDraft="isDraft" :headerBusy="headerBusy" @changeVar="changeVar" />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <ModalIdgl :data="dataHeader" :isDraft="isDraft" @pilihPasien="pilihPasien" @changeVar="changeVar" />
    <ModalPasien :data="dataHeader" :isDraft="isDraft" @pilihPasien="pilihPasien" @changeVar="changeVar" />
    <ModalPasienExternal :dataHeader="dataHeader" :isDraft="isDraft" @pilihPasienExternal="pilihPasienExternal" @changeVar="changeVar" />
    <ModalStatus :dataHeader="dataHeader" :isDraft="isDraft" @pilihPasien="pilihPasien" @changeVar="changeVar" />
    <BarangModalForm :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listBarang="listBarang" :listJual="listJualBarang" :isDraft="isDraft" @changeVar="changeVar" />
    <FasilitasModalForm :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualFasilitas" :isDraft="isDraft" @changeVar="changeVar" />
    <PenunjangModalForm :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualPenunjang" :isDraft="isDraft" @changeVar="changeVar" />
    <JasaModalForm :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :dataForm="dataForm" :listJual="listJualJasa" :isDraft="isDraft" @changeVar="changeVar" />
    <ModalRegister :dataHeader="dataHeader" :dataPerhitungan="dataPerhitungan" :listJualPenunjang="listJualPenunjang" :listJualFasilitas="listJualFasilitas" :listJualJasa="listJualJasa" :listJualBarang="listJualBarang" :isDraft="isDraft" :headerBusy="headerBusy" :isValid="isValid" @auto="auto" @changeVar="changeVar" @resetData="resetData" />
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import PenunjangList from "./penunjang/penunjang_list.vue";
import PenunjangListJual from "./penunjang/penunjang_list_jual.vue";
import PenunjangModalForm from "./penunjang/penunjang_modal_form.vue";
import BarangList from "./barang/barang_list.vue";
import BarangListJual from "./barang/barang_list_jual.vue";
import BarangModalForm from "./barang/barang_modal_form.vue";
import FasilitasList from "./fasilitas/fasilitas_list.vue";
import FasilitasListJual from "./fasilitas/fasilitas_list_jual.vue";
import FasilitasModalForm from "./fasilitas/fasilitas_modal_form.vue";
import JasaList from "./jasa/jasa_list.vue";
import JasaListJual from "./jasa/jasa_list_jual.vue";
import JasaModalForm from "./jasa/jasa_modal_form.vue";
import Perhitungan from "./perhitungan.vue";
import ModalPasien from "./modal_pasien.vue";
import ModalPasienExternal from "./modal_pasien_external.vue";
import ModalStatus from "./modal_status.vue";
import ModalRegister from "./modal_register.vue";
import ModalIdgl from "./modal_idgl.vue";

export default {
  components: {
    Multiselect,
    DatePicker,
    ModalPasien,
    ModalPasienExternal,
    ModalStatus,
    ModalRegister,
    ModalIdgl,

    PenunjangList,
    PenunjangListJual,
    PenunjangModalForm,
    BarangList,
    BarangListJual,
    BarangModalForm,
    FasilitasList,
    FasilitasListJual,
    FasilitasModalForm,
    JasaList,
    JasaListJual,
    JasaModalForm,
    Perhitungan,
  },
  name: "input_penjualan",
  setup() {
    return { v$: useVuelidate({ $lazy: true, $autoDirty: true }) };
  },
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      tab: 1,
      headerBusy: false,
      dataForm: {},
      is_data: {},
      dataPerhitungan: {
        jumlah: 0,
        discount: 0,
        sub_total: 0,
        tax_persen: 12,
        tax: 0,
        total: 0,
        pembayaran: 0,
        sisa: 0,

        nama_jumlah: "0,00",
        nama_discount: "",
        nama_sub_total: "0,00",
        nama_tax_persen: "12% / 0,00",
        nama_total: "0,00",
        nama_total_penjualan: "0,00",
        nama_pembayaran: "",
        nama_sisa: "0,00",
      },
      dataHeader: {
        //data_pasien
        penjualan_id: null,
        no_rm: null,
        NIK: null,
        nama: null,
        kode_tagihan: null,
        no_kunjungan: null,
        ms_harga_id: null,
        ms_tarif_id: null,
        ms_gudang_id: null,
        registrasi_id: null,
        status_penjualan: 0,
        status_tagihan: 0,
        is_external: null,

        //data header
        kelas_kunjungan: null,
        tgl_penjualan: new Date(),
        jenis_layanan: null,
        tipe_pembayaran: null,
        gudang: null,

        petugas: null,
        dokter: null,
        kas_bank: null,
        asuransi: null,
        no_asuransi: null,

        refresh: null,
      },
      list_gudang: [],
      list_jenis_layanan: [],
      list_kelas_kunjungan: [],
      list_tipe_pembayaran: [],
      list_dokter: [],
      list_kas_bank: [],
      list_asuransi: [],
      listJualPenunjang: [],
      listPenunjang: [],
      listJualFasilitas: [],
      listFasilitas: [],
      listJualJasa: [],
      listJasa: [],
      listJualBarang: [],
      listBarang: [],
      fieldFasilitas: [],
      fieldJasa: [],
      fieldBarang: [],
      bulk_fasilitas: [],
      bulk_jasa: [],
      bulk_barang: [],
    };
  },
  validations: {
    dataHeader: {
      nama: { required },
      kelas_kunjungan: {},
      tgl_penjualan: { required },
      jenis_layanan: {},
      tipe_pembayaran: {},
      gudang: { required },

      petugas: {},
      dokter: { required },
      kas_bank: {},
      asuransi: { required },
      no_asuransi: {},
    },
  },
  computed: {
    isValid() {
      return !this.v$.dataHeader.$invalid;
    },
    isDirty() {
      return this.v$.dataHeader.$anyDirty;
    },
    isDraft() {
      return this.dataHeader.status_penjualan;
    },
    statusTagihan() {
      return this.dataHeader.status_tagihan;
    },
  },
  watch: {
    "dataHeader.kelas_kunjungan"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.dataHeader.ms_tarif_id = newVar ? newVar.ms_tarif_id : null;
        this.dataHeader.kelas_kunjungan_id = newVar ? newVar.kelas_kunjungan : null;
      }
    },
    "dataHeader.asuransi"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.dataHeader.ms_harga_id = newVar ? newVar.ms_harga_id : null;
        this.dataHeader.ms_asuransi_id = newVar ? newVar.id : null;
      }
    },
    "dataHeader.gudang"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.dataHeader.ms_gudang_id = newVar ? newVar.id : null;
      }
    },
    listJualBarang(newVar, oldVar) {
      if (newVar != oldVar) {
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_barang, 0);
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_barang, 0);
        this.dataPerhitungan.jumlah = this.dataPerhitungan.jumlah + totalNew - totalOld;
        this.dataPerhitungan.harga_total_barang = totalNew;
      }
    },
    listJualPenunjang(newVar, oldVar) {
      if (newVar != oldVar) {
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_penjualan_penunjang || 0, 0);
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_penjualan_penunjang || 0, 0);
        this.dataPerhitungan.jumlah = this.dataPerhitungan.jumlah + totalNew - totalOld;
        this.dataPerhitungan.harga_total_penunjang = totalNew;
      }
    },
    listJualFasilitas(newVar, oldVar) {
      if (newVar != oldVar) {
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_fasilitas, 0);
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_fasilitas, 0);
        this.dataPerhitungan.jumlah = this.dataPerhitungan.jumlah + totalNew - totalOld;
        this.dataPerhitungan.harga_total_fasilitas = totalNew;
      }
    },
    listJualJasa(newVar, oldVar) {
      if (newVar != oldVar) {
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_jasa, 0);
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_jasa, 0);
        this.dataPerhitungan.jumlah = this.dataPerhitungan.jumlah + totalNew - totalOld;
        this.dataPerhitungan.harga_total_jasa = totalNew;
      }
    },
    "dataPerhitungan.jumlah"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.refreshPerhitungan();
        // this.dataPerhitungan.total = newVar
        // this.dataPerhitungan.total_penjualan = newVar
        // this.dataPerhitungan.sub_total = newVar - this.dataPerhitungan.discount
        // this.dataPerhitungan.nama_jumlah = this.toNumeric(newVar, 'no-idr')
        // this.dataPerhitungan.nama_sub_total = this.toNumeric(this.dataPerhitungan.sub_total, 'no-idr')
        // this.dataPerhitungan.nama_total = this.toNumeric(newVar, 'no-idr')
        // this.dataPerhitungan.nama_total_penjualan = this.toNumeric(newVar, 'no-idr')
        // //tax
        // let nominal = this.dataPerhitungan.sub_total * this.dataPerhitungan.tax_persen / 100
        // let hasil = this.dataPerhitungan.sub_total + nominal
        // this.dataPerhitungan.tax = nominal
        // this.dataPerhitungan.total = hasil
        // this.dataPerhitungan.total_penjualan = hasil
        // this.dataPerhitungan.nama_total = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_total_penjualan = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_tax_persen = this.toNumeric(this.dataPerhitungan.tax_persen) + '%' + ' / ' + this.toNumeric(nominal, 'no-idr')
        // //pembayaran
        // hasil = this.dataPerhitungan.pembayaran - this.dataPerhitungan.total
        // this.dataPerhitungan.sisa = hasil
        // this.dataPerhitungan.nama_sisa = this.toNumeric(hasil, 'no-idr')
      }
    },
    "dataPerhitungan.discount"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.refreshPerhitungan();
        // let hasil = this.dataPerhitungan.jumlah - this.dataPerhitungan.discount
        // this.dataPerhitungan.sub_total = hasil
        // this.dataPerhitungan.nama_sub_total = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_discount = this.toNumeric(newVar, 'no-idr')
        // //tax
        // let nominal = this.dataPerhitungan.sub_total * this.dataPerhitungan.tax_persen / 100
        // hasil = this.dataPerhitungan.sub_total + nominal
        // this.dataPerhitungan.tax = nominal
        // this.dataPerhitungan.total = hasil
        // this.dataPerhitungan.total_penjualan = hasil
        // this.dataPerhitungan.nama_total = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_total_penjualan = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_tax_persen = this.toNumeric(this.dataPerhitungan.tax_persen) + '%' + ' / ' + this.toNumeric(nominal, 'no-idr')
        // //pembayaran
        // hasil = this.dataPerhitungan.pembayaran - this.dataPerhitungan.total
        // this.dataPerhitungan.sisa = hasil
        // this.dataPerhitungan.nama_sisa = this.toNumeric(hasil, 'no-idr')
      }
    },
    "dataPerhitungan.tax_persen"(newVar, oldVar) {
      if (newVar != oldVar) {
        this.refreshPerhitungan();
        // let nominal = this.dataPerhitungan.sub_total * newVar / 100
        // let hasil = this.dataPerhitungan.sub_total + nominal
        // this.dataPerhitungan.tax = nominal
        // this.dataPerhitungan.total = hasil
        // this.dataPerhitungan.total_penjualan = hasil
        // this.dataPerhitungan.nama_total = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_total_penjualan = this.toNumeric(hasil, 'no-idr')
        // this.dataPerhitungan.nama_tax_persen = this.toNumeric(newVar) + '%' + ' / ' + this.toNumeric(nominal, 'no-idr')
        // //pembayaran
        // hasil = this.dataPerhitungan.pembayaran - this.dataPerhitungan.total
        // this.dataPerhitungan.sisa = hasil
        // this.dataPerhitungan.nama_sisa = this.toNumeric(hasil, 'no-idr')
      }
    },
    // 'dataPerhitungan.pembayaran'(newVar, oldVar){
    //   if(newVar != oldVar){
    //     let hasil = newVar - this.dataPerhitungan.total
    //     this.dataPerhitungan.sisa = hasil
    //     this.dataPerhitungan.nama_sisa = this.toNumeric(hasil, 'no-idr')
    //     this.dataPerhitungan.nama_pembayaran = this.toNumeric(newVar, 'no-idr')
    //   }
    // },
  },
  async mounted() {
    const vm = this;
    await vm.getDatas();
    await vm.auto();
  },
  methods: {
    async refreshPerhitungan() {
      const vm = this;
      //jumlah
      vm.dataPerhitungan.nama_jumlah = vm.toNumeric(vm.dataPerhitungan.jumlah, "no-idr");
      //potongan / discount
      vm.dataPerhitungan.nama_discount = vm.toNumeric(vm.dataPerhitungan.discount, "no-idr");
      //sub total
      vm.dataPerhitungan.sub_total = vm.dataPerhitungan.jumlah - vm.dataPerhitungan.discount;
      vm.dataPerhitungan.nama_sub_total = vm.toNumeric(vm.dataPerhitungan.sub_total, "no-idr");
      //tax
      //tax = tax nominal
      if (vm.dataPerhitungan.tax && !vm.dataPerhitungan.tax_persen) {
        //untuk draf mendapatkan persen
        vm.dataPerhitungan.tax_persen = (vm.dataPerhitungan.tax / vm.dataPerhitungan.sub_total) * 100;
      }
      vm.dataPerhitungan.tax = (vm.dataPerhitungan.sub_total * vm.dataPerhitungan.tax_persen) / 100;
      vm.dataPerhitungan.nama_tax_persen = vm.toNumeric(vm.dataPerhitungan.tax_persen) + "%" + " / " + vm.toNumeric(vm.dataPerhitungan.tax, "no-idr");
      //total
      vm.dataPerhitungan.total = vm.dataPerhitungan.sub_total + vm.dataPerhitungan.tax;
      vm.dataPerhitungan.total_penjualan = vm.dataPerhitungan.total;
      vm.dataPerhitungan.nama_total = vm.toNumeric(vm.dataPerhitungan.total, "no-idr");
      vm.dataPerhitungan.nama_total_penjualan = vm.toNumeric(vm.dataPerhitungan.total, "no-idr");
      //pembayaran
      // hasil = vm.dataPerhitungan.pembayaran - vm.dataPerhitungan.total
      // vm.dataPerhitungan.sisa = hasil
      // vm.dataPerhitungan.nama_sisa = vm.toNumeric(hasil, 'no-idr')
    },
    async auto() {
      const vm = this;
      const local = JSON.parse(localStorage.getItem("dataEditPenjualan"));
      // localStorage.setItem('dataEditPenjualan', null);
      if (local) {
        vm.headerBusy = true;
        console.log("local", local);
        const penjualan = await this.$_api.post("penjualan/detailsById", { id: local.penjualan_id });
        console.log("penjualan", penjualan);
        if (penjualan.status == 200 && penjualan.data.length) {
          const data = penjualan.data[0];
          vm.dataHeader.NIK = data.NIK;
          vm.dataHeader.kode_penjualan = data.kode_penjualan;
          vm.dataHeader.kode_tagihan = data.kode_tagihan;
          vm.dataHeader.no_kunjungan = data.no_kunjungan;
          vm.dataHeader.nama_tipe_pembayaran = data.tipe_pembayaran_penjualan;
          vm.dataHeader.penjualan_id = data.penjualan_id;
          vm.dataHeader.ms_dokter_id = data.ms_dokter_id;
          vm.dataHeader.ms_gudang_id = data.ms_gudang_id;
          // vm.dataHeader.gudang = data.ms_gudang_id
          vm.dataHeader.kelas_kunjungan_id = data.kelas_kunjungan_id;
          vm.dataHeader.ms_asuransi_id = data.ms_asuransi_id;
          vm.dataHeader.status_penjualan = data.status_penjualan;
          vm.dataHeader.status_tagihan = data.status_tagihan;
          vm.dataHeader.tgl_penjualan = new Date(data.tgl_penjualan);
          vm.dataHeader.is_external = data.is_external;
          vm.dataHeader.is_external ? await vm.pilihPasienExternal(data) : await vm.pilihPasien(data);
          vm.dataHeader.ms_jenis_layanan_id = data.ms_jenis_layanan_id;
          vm.dataHeader.ms_asuransi_id = data.ms_asuransi_id;
          //jenis layanan
          if (vm.dataHeader.ms_jenis_layanan_id) {
            const indexJenisLayanan = vm.list_jenis_layanan.findIndex((x) => x.id == vm.dataHeader.ms_jenis_layanan_id);
            if (indexJenisLayanan != -1) vm.dataHeader.jenis_layanan = vm.list_jenis_layanan[indexJenisLayanan];
          }
          //penunjang
          if (data.penunjang) {
            vm.listJualPenunjang = await data.penunjang.map((x) => {
              return {
                ...x,
                nama_harga: vm.toNumeric(x.harga_penjualan_penunjang, "idr"),
                total_harga_penjualan_penunjang: x.harga_custom_penjualan_penunjang || 0 * x.qty_penjualan_penunjang || 0,
                nama_qty_penjualan_penunjang: vm.toNumeric(x.qty_penjualan_penunjang || 0),
                nama_harga_penjualan_penunjang: vm.toNumeric(x.harga_penjualan_penunjang, "idr"),
                nama_harga_custom_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang, "idr"),
                nama_total_harga_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang || 0, "idr"),
              };
            });
          }
          //fasilitas
          vm.listJualFasilitas = await data.fasilitas.map((x) => {
            return {
              ...x,
              nama_harga: vm.toNumeric(x.harga_fasilitas, "idr"),
              total_harga_fasilitas: x.harga_fasilitas_custom * x.qty_fasilitas,
              nama_qty_fasilitas: vm.toNumeric(x.qty_fasilitas),
              nama_harga_fasilitas: vm.toNumeric(x.harga_fasilitas, "idr"),
              nama_harga_fasilitas_custom: vm.toNumeric(x.harga_fasilitas_custom, "idr"),
              nama_total_harga_fasilitas: vm.toNumeric(x.harga_fasilitas_custom * x.qty_fasilitas, "idr"),
            };
          });
          //jasa
          vm.listJualJasa = await data.jasa.map((x) => {
            return {
              ...x,
              total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
              nama_qty_jasa: vm.toNumeric(x.qty_jasa),
              nama_harga_jasa: vm.toNumeric(x.harga_jasa, "idr"),
              nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, "idr"),
              nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, "idr"),
            };
          });
          //barang
          vm.listJualBarang = await data.barang.map((x) => {
            return {
              ...x,
              total_harga_barang: x.harga_barang_custom * x.qty_barang,
              qty_barang_total: x.total_stock_barang,
              nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
              nama_qty_barang: vm.toNumeric(x.qty_barang),
              nama_harga_barang: vm.toNumeric(x.harga_barang, "idr"),
              nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, "idr"),
              nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, "idr"),
            };
          });
          //perhitungan
          vm.dataPerhitungan.discount = data.discount;
          vm.dataPerhitungan.tax_persen = 0;
          vm.dataPerhitungan.tax = data.tax;
          vm.dataPerhitungan.tax_persen = (data.total_penjualan + data.discount - data.tax) / data.tax;
          //dpjp
          if (vm.dataHeader.ms_dokter_id) {
            const index = vm.list_dokter.findIndex((x) => x.ms_dokter_id == vm.dataHeader.ms_dokter_id);
            if (index != -1) vm.dataHeader.dokter = vm.list_dokter[index];
          }
          //gudang
          if (vm.dataHeader.ms_gudang_id) {
            const index = vm.list_gudang.findIndex((x) => x.id == vm.dataHeader.ms_gudang_id);
            if (index != -1) vm.dataHeader.gudang = vm.list_gudang[index];
          }
          //asuransi
          if (vm.dataHeader.ms_asuransi_id) {
            const index = vm.list_asuransi.findIndex((x) => x.id == vm.dataHeader.ms_asuransi_id);
            if (index != -1) vm.dataHeader.asuransi = vm.list_asuransi[index];
          }
          //kelas kunjungan
          if (vm.dataHeader.kelas_kunjungan_id) {
            const index = vm.list_kelas_kunjungan.findIndex((x) => x.kelas_kunjungan_id == vm.dataHeader.kelas_kunjungan_id);
            if (index != -1) vm.dataHeader.kelas_kunjungan = vm.list_kelas_kunjungan[index];
          }
        }
        vm.refreshPerhitungan();
        vm.headerBusy = false;
      }
    },
    async getDatas() {
      const vm = this;
      vm.headerBusy = true;
      //gudang
      let list_gudang = await this.$_api.post("msGudang/list");
      vm.list_gudang = list_gudang.status == 200 ? list_gudang.data : [];
      //dokter
      // let list_dokter = await this.$_api.post("123msDokter/list");
      // vm.list_dokter = list_dokter.status == 200 ? list_dokter.data : []
      let list_dokter = await this.$_api.post("msDokter/list");
      vm.list_dokter = list_dokter.status == 200 ? list_dokter.data : [];
      //jenis layanan
      let list_jenis_layanan = await this.$_api.post("msJenisLayanan/list");
      vm.list_jenis_layanan = list_jenis_layanan.status == 200 ? list_jenis_layanan.data : [];
      //asuransi
      let list_asuransi = await this.$_api.post("msAsuransi/list");
      this.list_asuransi =
        list_asuransi.status == 200
          ? list_asuransi.data.map((x) => {
              return { ...x, nama_asuransi_harga: `${x.nama_asuransi} - ${x.nama_harga}` };
            })
          : [];
      //kelas kunjungan
      let list_kelas_kunjungan = await this.$_api.post("KelasKunjungan/list");
      this.list_kelas_kunjungan =
        list_kelas_kunjungan.status == 200
          ? list_kelas_kunjungan.data.map((x) => {
              return { ...x, nama_kelas: `${x.nama_kelas_kunjungan} - ${x.nama_tarif}` };
            })
          : [];

      // console.log('list_jenis_layanan', list_jenis_layanan)
      // console.log('list_kelas_kunjungan', list_kelas_kunjungan)

      vm.headerBusy = false;
    },
    async pilihPasien(data) {
      const vm = this;
      vm.headerBusy = true;
      console.log("pilih pasien", data);
      vm.dataHeader.nama = data.nama || data.nama_lengkap;
      vm.dataHeader.NIK = data.nik;
      vm.dataHeader.no_asuransi = data.no_asuransi_registrasi;
      vm.dataHeader.no_kunjungan = data.no_kunjungan;
      vm.dataHeader.ms_harga_id = data.ms_harga_id;
      vm.dataHeader.kelas_kunjungan_id = data.kelas_kunjungan_id;
      vm.dataHeader.ms_jenis_layanan_id = data.ms_jenis_layanan_id;
      vm.dataHeader.ms_asuransi_id = data.ms_asuransi_id;
      vm.dataHeader.ms_tarif_id = data.ms_tarif_id;
      vm.dataHeader.no_rm = data.no_rm;
      vm.dataHeader.registrasi_id = data.registrasi_id;
      vm.dataHeader.ms_dokter_id = data.ms_dokter_id;
      vm.dataHeader.is_external = false;
      console.log("data Header pilihPasien(): ", vm.dataHeader);
      //kelas kunjungan
      if (vm.dataHeader.kelas_kunjungan_id) {
        const indexKelasKunjungan = vm.list_kelas_kunjungan.findIndex((x) => x.kelas_kunjungan_id == vm.dataHeader.kelas_kunjungan_id);
        if (indexKelasKunjungan != -1) vm.dataHeader.kelas_kunjungan = vm.list_kelas_kunjungan[indexKelasKunjungan];
      }
      //jenis layanan
      if (vm.dataHeader.ms_jenis_layanan_id) {
        const indexJenisLayanan = vm.list_jenis_layanan.findIndex((x) => x.id == vm.dataHeader.ms_jenis_layanan_id);
        if (indexJenisLayanan != -1) vm.dataHeader.jenis_layanan = vm.list_jenis_layanan[indexJenisLayanan];
      }
      //asuransi
      if (vm.dataHeader.ms_asuransi_id) {
        const indexAsuransi = vm.list_asuransi.findIndex((x) => x.id == vm.dataHeader.ms_asuransi_id);
        if (indexAsuransi != -1) vm.dataHeader.asuransi = vm.list_asuransi[indexAsuransi];
      }
      //dokter
      if (vm.dataHeader.ms_dokter_id) {
        const indexDokter = vm.list_dokter.findIndex((x) => x.ms_dokter_id == vm.dataHeader.ms_dokter_id);
        if (indexDokter != -1) vm.dataHeader.dokter = vm.list_dokter[indexDokter];
      }
      // console.log('pilih pasien ', data)
      vm.headerBusy = false;
    },
    async pilihPasienExternal(data) {
      console.log("pilihPasienExternal", data);
      const vm = this;
      //jika draft
      if (data.penjualan_external_id) {
        const penjualanExternal = await this.$_api.post("penjualanExternal/detailsById/" + data.penjualan_external_id);
        if (penjualanExternal.status == 200) data = penjualanExternal.data[0];
        // console.log('penjualanExternal', penjualanExternal)
      }
      vm.dataHeader.no_rm = data.no_rm;
      vm.dataHeader.NIK = data.NIK;
      vm.dataHeader.pasien_id = data.pasien_id;
      vm.dataHeader.nama = data.nama_penjualan_external;
      vm.dataHeader.nama_penjualan_external = data.nama_penjualan_external;
      vm.dataHeader.alamat_penjualan_external = data.alamat_penjualan_external;
      vm.dataHeader.keterangan_penjualan_external = data.keterangan_penjualan_external;
      vm.dataHeader.is_external = true;
    },
    resetData(data) {
      console.log("=============== resetData ==========");
      const vm = this;
      if (data && data.local) localStorage.setItem("dataEditPenjualan", null);
      vm.headerBusy = true;
      vm.dataPerhitungan = {
        jumlah: vm.dataPerhitungan.jumlah,
        discount: 0,
        sub_total: 0,
        tax_persen: 12,
        total: 0,
        pembayaran: 0,
        sisa: 0,

        nama_jumlah: "0,00",
        nama_discount: "",
        nama_sub_total: "0,00",
        nama_tax: "12% / 0,00",
        nama_total: "0,00",
        nama_total_penjualan: "0,00",
        nama_pembayaran: "",
        nama_sisa: "0,00",
      };

      vm.dataHeader = {
        //data_pasien
        penjualan_id: null,
        no_rm: null,
        NIK: null,
        nama: null,
        kode_tagihan: null,
        no_kunjungan: null,
        ms_harga_id: null,
        ms_tarif_id: null,
        ms_gudang_id: null,
        registrasi_id: null,
        status_penjualan: 0,
        status_tagihan: 0,
        is_external: null,

        //data header
        kelas_kunjungan: null,
        tgl_penjualan: new Date(),
        jenis_layanan: null,
        tipe_pembayaran: null,
        gudang: null,

        petugas: null,
        dokter: null,
        kas_bank: null,
        asuransi: null,
        no_asuransi: null,

        refresh: null,
      };
      vm.listJualPenunjang = [];
      vm.listPenunjang = [];
      vm.listJualFasilitas = [];
      vm.listFasilitas = [];
      vm.listJualJasa = [];
      vm.listJasa = [];
      vm.listJualBarang = [];
      vm.listBarang = [];
      vm.v$.$reset();
      vm.headerBusy = false;
    },
    async changeVar(data) {
      if (Array.isArray(data.data)) this[data.to] = [];
      await new Promise((resolve) => setTimeout(resolve, 100));
      // await new Promise(resolve => setTimeout(resolve, 1000));
      this[data.to] = data.data;
      // console.log('changeVar ', data)
    },
    parse(data) {
      return JSON.parse(JSON.stringify(data));
    },
    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
    toNumeric(number, type) {
      let data = {};
      if (type == "no-idr") {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number).slice(3);
      } else {
        if (type == "idr") data = { style: "currency", currency: "IDR" };
        return new Intl.NumberFormat("id-ID", data).format(number);
      }
    },
    checkValidasi(fieldName) {
      const field = this.v$.dataHeader[fieldName];
      const x = field.$error === true && field.$errors.length ? field.$errors[0].$validator : "";
      // console.log(fieldName, ' - ', x)
      if (x == "required") {
        return { b: false, s: false, m: "* Data wajib diisi" };
      } else if (x == "email") {
        return { b: false, s: false, m: "* Data harus berbentuk email" };
      } else if (x == "numeric") {
        return { b: false, s: false, m: "* Data harus terdiri hanxa dari angka" };
      } else if (x == "minLength") {
        return { b: false, s: false, m: `* Data belum mencapai minimal digits` };
      } else if (x == "maxLength") {
        return { b: false, s: false, m: `* Data melebihi maksimal digits` };
      } else if (x == "alphaNum") {
        return { b: false, s: false, m: `* Data tidak boleh mengandung spasi atau simbol` };
      } else if (x == "official") {
        return { b: false, s: false, m: `* Data tidak boleh mengandung spasi atau simbol` };
      } else {
        return { b: true, s: null, m: null };
      }
    },
  },
};
</script>
