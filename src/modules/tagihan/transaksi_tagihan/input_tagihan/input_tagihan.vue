<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header">
            <template #header>
              <b-row class="d-flex align-items-center">
                <b-col>
                  <h3 class="mb-0">
                    <strong>Input Tagihan</strong>
                  </h3>
                </b-col>
                <b-col>
                  <div class="d-flex justify-content-end">
                    <div v-if="dataHeader.status_tagihan == status_tagihan.open" class="bg-success h6 rounded text-light px-2 py-1">Status:
                      Open</div>
                    <div v-if="dataHeader.status_tagihan == status_tagihan.lock" class="bg-warning h6 rounded text-light px-2 py-1">Status:
                      Lock</div>
                    <div v-if="dataHeader.status_tagihan == status_tagihan.close" class="bg-danger h6 rounded text-light px-2 py-1">Status:
                      Close</div>
                  </div>
                </b-col>
              </b-row>
            </template>
            <div class="">
              <b-row style="row-gap: 15px;">
                <b-col cols="3">
                  <!-- <label for="kode_tagihan">ID Tagihan</label> -->
                  <s-input v-model="dataHeader.kode_tagihan" :item="{
                    label: 'ID Tagihan',
                    id: 'kode_tagihan',
                    data: 'kode_tagihan',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataHeader.kode_tagihan" :disabled="true"></s-input>
                </b-col>
                <b-col cols="3">
                  <!-- <label for="tgl_tagihan">Tanggal Tagihan</label> -->
                  <s-input v-model="dataHeader.tgl_tagihan" :item="{
                    label: 'Tanggal Tagihan',
                    id: 'tgl_tagihan',
                    data: 'tgl_tagihan',
                    type: 'datetime',
                    validation: ['required'],
                    formatDateView: 'DD MMM YYYY HH:mm',
                  }" format="DD MMM YYYY HH:mm" :valuee="dataHeader.tgl_tagihan" :disabled="isDraft >= 2"></s-input>
                </b-col>
                <b-col cols="3">
                  <!-- <label for="jenis_layanan">Jenis Layanan</label> -->
                  <s-input v-model="dataHeader.ms_jenis_layanan_id" :item="{
                    label: 'Jenis Layanan',
                    id: 'ms_jenis_layanan_id',
                    data: 'ms_jenis_layanan_id',
                    type: 'select',
                    validation: ['required'],
                    pointer: {
                      label: 'nama_jenis_layanan',
                      code: 'id',
                      display: ['nama_jenis_layanan'],
                    },
                    optionList: list_jenis_layanan
                  }" :valuee="dataHeader.ms_jenis_layanan_id" :disabled="isDraft >= 2 || headerBusy"></s-input>
                </b-col>
                <b-col cols="3">
                  <!-- <label for="no_npwp_tagihan">NO NPWP</label> -->
                  <s-input v-model="dataHeader.no_npwp_tagihan" :item="{
                    label: 'NO NPWP',
                    id: 'no_npwp_tagihan',
                    data: 'no_npwp_tagihan',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataHeader.no_npwp_tagihan" :disabled="isDraft >= 2 || headerBusy"></s-input>
                </b-col>
                <b-col cols="3">
                  <!-- <label for="nama_tagihan">Nama</label> -->
                  <s-input v-model="dataHeader.nama_tagihan" :item="{
                    label: 'Nama Tagihan',
                    id: 'nama_tagihan',
                    data: 'nama_tagihan',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataHeader.nama_tagihan" :disabled="true"></s-input>
                </b-col>
                <b-col :cols="isAsuransiBPJS ? '2' : '3'">
                  <!-- <label for="asuransi">Asuransi</label> -->
                  <s-input v-model="dataHeader.ms_asuransi_id" :item="{
                    label: 'Asuransi',
                    id: 'asuransi',
                    data: 'asuransi',
                    type: 'select',
                    validation: ['required'],
                    pointer: {
                      label: 'nama_asuransi_harga',
                      code: 'id',
                      display: ['nama_asuransi_harga'],
                    },
                    optionList: list_asuransi
                  }" :valuee="dataHeader.ms_asuransi_id" :disabled="isDraft != 0 || headerBusy"></s-input>
                </b-col>
                <b-col cols="1" v-if="isAsuransiBPJS">
                  <!-- <label for="type_no_asuransi">Type No</label> -->
                  <s-input v-model="dataHeader.type_no_asuransi" :item="{
                    label: 'Type No',
                    id: 'type_no_asuransi',
                    data: 'type_no_asuransi',
                    type: 'select',
                    validation: ['required'],
                    pointer: {
                      label: 'text',
                      code: 'value',
                      display: ['text'],
                    },
                    optionList: list_type_no_asuransi
                  }" :valuee="dataHeader.type_no_asuransi" :disabled="isDraft >= 2"></s-input>
                </b-col>
                <b-col cols="3">
                  <!-- <label for="no_asuransi">No Asuransi</label> -->
                  <s-input v-model="dataHeader.no_asuransi" :item="{
                    label: 'No Asuransi',
                    id: 'no_asuransi',
                    data: 'no_asuransi',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataHeader.no_asuransi"
                    :disabled="Boolean(isDraft >= 2 || headerBusy || dataHeader.asuransi == null || (isAsuransiBPJS && dataHeader.type_no_asuransi == null) || isAsuransiUmum)"></s-input>
                  <!-- <b-button variant="success"
                    :disabled="isDraft >= 2 || headerBusy || dataHeader.asuransi == null || (isAsuransiBPJS && dataHeader.type_no_asuransi == null) || isAsuransiUmum"
                    @click="cekAsuransi()">cek</b-button> -->
                </b-col>
                <b-col cols="3">
                  <!-- <label for="no_sep_tagihan">NO SEP</label> -->
                  <s-input v-model="dataHeader.no_sep_tagihan" :item="{
                    label: 'NO SEP',
                    id: 'no_sep_tagihan',
                    data: 'no_sep_tagihan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataHeader.no_sep_tagihan" :disabled="isDraft >= 2"></s-input>
                  <!-- :disabled="isDraft >= 2 || headerBusy || dataHeader.asuransi == null || (isAsuransiBPJS && dataHeader.type_no_asuransi == null) || !isAsuransiBPJS" -->

                  <!-- <b-button variant="success" @click="cekSep()"
                    :disabled="isDraft >= 2 || headerBusy || dataHeader.asuransi == null || (isAsuransiBPJS && dataHeader.type_no_asuransi == null) || !isAsuransiBPJS">cek</b-button> -->

                </b-col>
                <b-col cols="2">
                  <!-- <label for="no_rm">NO RM</label> -->
                  <s-input v-model="dataHeader.no_rm" :item="{
                    label: 'NO RM',
                    id: 'no_rm',
                    data: 'no_rm',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataHeader.no_rm" :disabled="true"></s-input>
                </b-col>
                <b-col cols="1">
                  <!-- <label for="usia_pasien_tagihan">Umur</label> -->
                  <s-input v-model="dataHeader.usia_pasien_tagihan" :item="{
                    label: 'Umur',
                    id: 'usia_pasien_tagihan',
                    data: 'usia_pasien_tagihan',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataHeader.usia_pasien_tagihan" :disabled="true"></s-input>

                </b-col>
                <b-col cols="3">
                  <!-- <label for="kelas_kunjungan">Kelas Kunjungan</label> -->
                  <s-input v-model="dataHeader.kelas_kunjungan_id" :item="{
                    label: 'Kelas Kunjungan',
                    id: 'kelas_kunjungan',
                    data: 'kelas_kunjungan',
                    type: 'select',
                    validation: ['required'],
                    pointer: {
                      label: 'nama_kelas_kunjungan',
                      code: 'kelas_kunjungan_id',
                      display: ['nama_kelas_kunjungan'],
                    },
                    optionList: list_kelas_kunjungan
                  }" :valuee="dataHeader.kelas_kunjungan_id" :disabled="isDraft != 0 || headerBusy"></s-input>
                </b-col>
                <b-col cols="6">
                  <!-- <label for="keterangan_tagihan">Keterangan</label> -->
                  <s-input v-model="dataHeader.keterangan_tagihan" :item="{
                    label: 'Keterangan',
                    id: 'keterangan_tagihan',
                    data: 'keterangan_tagihan',
                    type: 'textarea',
                    validation: [''],
                  }" :valuee="dataHeader.keterangan_tagihan" :disabled="isDraft >= 2"></s-input>
                </b-col>
              </b-row>
              <div class="d-flex justify-content-end mt-3 text-nowrap">
                <b-button v-if="dataHeader.tagihan_id"
                class="mr-2" variant="info" size="md" :disabled="headerBusy"
                  @click="$bvModal.show('modal-status')">Ubah Status</b-button>
                <b-button v-if="isDraft == 1" class="mr-2" variant="warning" size="md" :disabled="headerBusy"
                  @click="$bvModal.show('modal-update')">Update</b-button>
                <b-button v-if="isDraft == 0" class="mr-2" variant="primary" size="sm" :disabled="headerBusy"
                  @click="dataHeader.pilih = 'pilihExternalHeader', $bvModal.show('modal-pasien-external')">Pasien
                  External</b-button>
                <b-button v-if="isDraft == 0" class="mr-2 text-nowrap" variant="info" size="sm" :disabled="headerBusy"
                  @click="dataHeader.pilih = 'pilihPasienInternalHeader', $bvModal.show('modal-pasien-internal')">Pasien
                  Internal (kunjungan)</b-button>
                <b-button class="mr-2" variant="danger" size="sm" :disabled="headerBusy"
                  @click="resetData(true)">Reset</b-button>
                <b-button v-if="isDraft == 0" class="" variant="success" size="sm" :disabled="headerBusy"
                  @click="$bvModal.show('modal-register')">Simpan</b-button>
              </div>
              <b-row class="">
                <b-col cols="12" class="mt-4 my-3 btn-group w-100">
                  <button @click="tab = 1" class="btn" :class="tab == 1 ? 'btn-success' : 'btn-outline-success'"
                    type="button">Tagihan</button>
                  <button v-if="!isExternal" @click="tab = 2" class="btn"
                    :class="tab == 2 ? 'btn-success' : 'btn-outline-success text-nowrap'" type="button">Internal <small style="font-size: 9px">(kunjungan)</small></button>
                  <button v-if="!isInternal" @click="tab = 3" class="btn"
                    :class="tab == 3 ? 'btn-success' : 'btn-outline-success'" type="button">External</button>
                  <button @click="tab = 4" class="btn" :class="tab == 4 ? 'btn-success' : 'btn-outline-success'"
                    type="button">Penjualan</button>
                  <button v-if="isDraft === 2" @click="tab = 5" class="btn"
                    :class="tab == 5 ? 'btn-success' : 'btn-outline-success'" type="button">Ditanggung</button>
                  <button v-if="isDraft === 2" @click="tab = 6" class="btn"
                    :class="tab == 6 ? 'btn-success' : 'btn-outline-success'" type="button">Dibayar</button>
                  <button @click="tab = 7" class="btn" :class="tab == 7 ? 'btn-success' : 'btn-outline-success'"
                    type="button">Summary</button>
                </b-col>
                <div class="w-100">
                  <div class="mx-1">
                    <Tagihan v-show="tab == 1" :dataHeader="dataHeader" :dataTagihan="dataTagihan"
                      @changeVar="changeVar" />
                    <Internal v-show="tab == 2" :isDraft="isDraft" :dataHeader="dataHeader" :dataTagihan="dataTagihan"
                      :listInternal="listInternal" :listJasa="listJasa" :listBarang="listBarang"
                      :listFasilitas="listFasilitas" @auto="auto" @changeVar="changeVar" />
                    <External v-show="tab == 3" :isDraft="isDraft" :dataHeader="dataHeader" :dataTagihan="dataTagihan"
                      :listExternal="listExternal" :listJasa="listJasa" :listBarang="listBarang"
                      :listFasilitas="listFasilitas" @auto="auto" @changeVar="changeVar" />
                    <Penjualan v-show="tab == 4" :dataHeader="dataHeader" :dataTagihan="dataTagihan"
                      :listPenjualan="listPenjualan" :listJasa="listJasa" :listBarang="listBarang"
                      :listFasilitas="listFasilitas" :isInternal="isInternal" @changeVar="changeVar" />
                    <Ditanggung v-show="tab == 5" :dataHeader="dataHeader" :dataTagihan="dataTagihan"
                      :listDitanggung="listDitanggung" @getDitanggung="getDitanggung" @changeVar="changeVar" />
                    <Dibayar v-show="tab == 6" :dataHeader="dataHeader" :dataTagihan="dataTagihan"
                      :listDibayar="listDibayar" @getDibayar="getDibayar" @changeVar="changeVar" />
                    <Summary v-show="tab == 7" :dataHeader="dataHeader" :listPenjualan="listPenjualan"
                      :listJasa="listJasa" :listBarang="listBarang" :listFasilitas="listFasilitas" :listPenunjang="listPenunjang"
                      @changeVar="changeVar" />
                  </div>
                </div>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-register" size="md" centered title="Perhatian .... !!!" header-bg-variant="success"
      header-text-variant="light">
      <p>Apakah anda yakin ingin membuat tagihan</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-register')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="simpan()">
          Ya
        </b-button>
      </template>
    </b-modal>
    <b-modal id="modal-update" size="md" centered title="Perhatian .... !!!" header-bg-variant="warning"
      header-text-variant="light">
      <p>Apakah anda yakin ingin mengubah tagihan</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-update')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="update()">
          Ya
        </b-button>
      </template>
    </b-modal>
    <ModalStatus :dataHeader="dataHeader" :dataTagihan="dataTagihan" :isDraft="isDraft" @changeVar="changeVar"
      @resetData="resetData" />
    <ModalPasienIntenal :dataHeader="dataHeader" :list_jenis_layanan="list_jenis_layanan" :list_asuransi="list_asuransi"
      :list_kelas_kunjungan="list_kelas_kunjungan" @changeVar="changeVar" @auto="auto" @getInternal="getInternal" />
    <ModalPasienExternal :dataHeader="dataHeader" :listExternal="listExternal" :listPenjualan="listPenjualan"
      :listJasa="listJasa" :listBarang="listBarang" :listFasilitas="listFasilitas"
      :list_jenis_layanan="list_jenis_layanan" :list_asuransi="list_asuransi" :list_kelas_kunjungan="list_kelas_kunjungan"
      @changeVar="changeVar" @auto="auto" />
    <!-- <ModalPasien
      :dataHeader="dataHeader"
      @pilihPasien="pilihPasien"
    /> -->
    <ModalPenjualan :dataHeader="dataHeader" :listPenjualan="listPenjualan" :listJasa="listJasa" :listBarang="listBarang"
      :listFasilitas="listFasilitas" @changeVar="changeVar" />
    <ModalDitanggung :dataHeader="dataHeader" :listDitanggung="listDitanggung" @getDitanggung="getDitanggung"
      @changeVar="changeVar" />
    <ModalDibayar :dataHeader="dataHeader" :dataTagihan="dataTagihan" :listDibayar="listDibayar" @getDibayar="getDibayar"
      @changeVar="changeVar" />
  </div>
</template>

<script>
import ModalPasienIntenal from './internal/modal_pasien_internal.vue'
import ModalPasienExternal from './external/modal_pasien_external.vue'
import ModalStatus from './modal_status.vue'
import Tagihan from './tagihan/tagihan.vue'
import Internal from './internal/internal.vue'
import External from './external/external.vue'
import Summary from './summary/summary.vue'
import Penjualan from './penjualan/penjualan.vue'
import ModalPenjualan from './penjualan/modal_penjualan.vue'
import Ditanggung from './ditanggung/ditanggung.vue'
import ModalDitanggung from './ditanggung/modal_ditanggung.vue'
import Dibayar from './dibayar/dibayar.vue'
import ModalDibayar from './dibayar/modal_dibayar.vue'

import moment from 'moment'
moment.locale('id')

export default {
  components: {

    ModalPasienIntenal,
    ModalPasienExternal,
    ModalStatus,

    Tagihan,
    Internal,
    External,
    Summary,
    Penjualan,
    ModalPenjualan,
    Ditanggung,
    ModalDitanggung,
    Dibayar,
    ModalDibayar
  },
  name: 'input_penjualan',
  // setup () { return { v$: useVuelidate({ $lazy: true, $autoDirty: true }) } },
  data() {
    return {
      showing: false,
      variant: 'success',
      msg: '',
      tab: 1,
      headerBusy: false,
      // form
      dataHeader: {
        status_tagihan: 0,
        tgl_tagihan: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        usia_pasien_tagihan: null,
        kode_tagihan: null,
        nama_tagihan: null,
        no_rm: null,
        jenis_layanan: null,
        kelas_kunjungan: null,
        asuransi: null,
        type_no_asuransi: null,
        no_asuransi: null,
        status_no_asuransi: null,
        no_sep_tagihan: null,
        status_no_sep_tagihan: null,
        keterangan_tagihan: null,
        no_npwp_tagihan: null,
      },
      dataTagihan: {
        jumlah: 0,
        discount: 0,
        sub_total: 0,
        tax_persen: 0,
        tax_nominal: 0,
        total_tagihan: 0,

        total_ditanggung: 0,
        selisih_tagihan: 0,

        total_tagihan_akhir: 0,
        total_pembayaran: 0,
        sisa_pembayaran: 0,
        total_semua_pembayaran: 0,
        kurang_pembayaran: 0,

        // nama
        nama_jumlah: '0,00',
        nama_discount: '0,00',
        nama_sub_total: '0,00',
        nama_tax_persen: '0%',
        nama_tax_nominal: '0,00',
        nama_total_tagihan: '0,00',

        nama_total_ditanggung: '0,00',
        nama_selisih_tagihan: '0,00',

        nama_total_tagihan_akhir: '0,00',
        nama_total_pembayaran: '0,00',
        nama_sisa_pembayaran: '0,00',

        nama_total_semua_pembayaran: '0.00',
        nama_kurang_pembayaran: '0.00',
      },
      // table
      listInternal: [],
      listExternal: [],
      listPenjualan: [],
      listDitanggung: [],
      listDibayar: [],
      listJasa: [],
      listBarang: [],
      listFasilitas: [],
      listPenunjang: [],
      // form
      list_type_no_asuransi: [],
      list_kelas_kunjungan: [],
      list_asuransi: [],
      list_jenis_layanan: [],
      status_tagihan: {
        open: 1,
        lock: 2,
        close: 3
      }
    }
  },
  // validations: {
  //   dataHeader: {
  //     kode_tagihan: { },
  //     nama_tagihan: { },
  //     no_rm: { },
  //     kelas_kunjungan: { required },
  //     tgl_tagihan: { required },
  //     jenis_layanan: { required },
  //     asuransi: { required },
  //     type_no_asuransi: {
  //       required: (value, sibiling, vm) => { return vm.isAsuransiBPJS && sibiling.asuransi ? value : true }
  //     },
  //     no_asuransi: {
  //       // required: (value, sibiling, vm) => { return vm.isAsuransiBPJS && sibiling.asuransi ? value : true },
  //       required: (value, sibiling, vm) => { return sibiling.asuransi && !vm.isAsuransiUmum ? value : true },
  //       validasiNoAsuransi: (value, sibiling, vm) => { return sibiling.asuransi && !vm.isAsuransiUmum ? sibiling.status_no_asuransi : true }
  //     },
  //     no_sep_tagihan: {
  //       required: (value, sibiling, vm) => { return vm.isAsuransiBPJS && sibiling.asuransi ? value : true }
  //     },
  //     keterangan_tagihan: { },
  //     no_npwp_tagihan: { }
  //   }
  // },
  computed: {
    isValid() {
      return true
      // return !this.v$.dataHeader.$invalid
    },
    isDirty() {
      return true
      // return this.v$.dataHeader.$anyDirty
    },
    isDraft() {
      return this.dataHeader.status_tagihan
    },
    isAsuransiBPJS() {
      let t = this.list_asuransi.filter((f) => { return f.id === this.dataHeader.asuransi })
      return this.dataHeader.asuransi && t.length && t.tipe_asuransi === 2
    },
    isAsuransiUmum() {
      let t = this.list_asuransi.filter((f) => { return f.id === this.dataHeader.asuransi })
      return this.dataHeader.asuransi && t.length && t.tipe_asuransi === 1
    },
    isInternal() {
      return this.listInternal.length > 0
    },
    isExternal() {
      return this.listExternal.length > 0
    },
    dataSimpan() {
      const vm = this
      return {
        ...vm.dataHeader,
        ms_asuransi_id: vm.dataHeader.asuransi ? vm.dataHeader.asuransi.id : null,
        kelas_kunjungan_id: vm.dataHeader.kelas_kunjungan ? vm.dataHeader.kelas_kunjungan.kelas_kunjungan_id : null,
        ms_jenis_layanan_id: vm.dataHeader.jenis_layanan ? vm.dataHeader.jenis_layanan.id : null,
        bulk_penjualan: vm.listPenjualan,
        total_tagihan: vm.dataTagihan.total_tagihan,
        total_bayar_tagihan: 0
        // selisih_lebih_ditanggung_tagihan: 0,
        // selisih_kurang_ditanggung_tagihan: 0,
      }
    }
  },
  watch: {
    listPenjualan(newVar, oldVar) {
      if (newVar !== oldVar) {
        const vm = this
        // const totalOld = oldVar.reduce((total, item) => total + parseFloat(item.jumlah || '0'), 0)
        // const totalNew = newVar.reduce((total, item) => total + parseFloat(item.jumlah || '0'), 0)
        // vm.dataTagihan.jumlah = vm.dataTagihan.jumlah - totalOld + totalNew
        // vm.dataTagihan.total_penjualan = totalNew
        // vm.dataTagihan.nama_total_penjualan = vm.toNumeric(totalNew, 'no-idr')
        vm.dataTagihan.jumlah = newVar.reduce((total, item) => total + parseFloat(item.jumlah || '0'), 0)
        vm.dataTagihan.discount = newVar.reduce((total, item) => total + parseFloat(item.discount || '0'), 0)
        vm.dataTagihan.tax = newVar.reduce((total, item) => total + parseFloat(item.tax || '0'), 0)
        vm.dataTagihan.total_tagihan = newVar.reduce((total, item) => total + parseFloat(item.total_penjualan || '0'), 0)
        this.refreshDataTagihan()
      }
    },
    listDitanggung(newVar, oldVar) {
      if (newVar !== oldVar) {
        const vm = this
        const totalOld = oldVar.reduce((total, item) => total + parseFloat(item.jumlah_penanggung || '0'), 0)
        const totalNew = newVar.reduce((total, item) => total + parseFloat(item.jumlah_penanggung || '0'), 0)
        vm.dataTagihan.total_ditanggung = vm.dataTagihan.total_ditanggung - totalOld + totalNew
        vm.dataTagihan.nama_total_ditanggung = vm.toNumeric(totalNew, 'no-idr')
        this.refreshDataTagihan()
      }
    },
    listDibayar(newVar, oldVar) {
      if (newVar !== oldVar) {
        const vm = this
        const totalOld = oldVar.reduce((total, item) => total + parseFloat(item.jumlah_bayar_tagihan || '0'), 0)
        const totalNew = newVar.reduce((total, item) => total + parseFloat(item.jumlah_bayar_tagihan || '0'), 0)
        vm.dataTagihan.total_pembayaran = vm.dataTagihan.total_pembayaran - totalOld + totalNew
        vm.dataTagihan.nama_total_pembayaran = vm.toNumeric(totalNew, 'no-idr')
        this.refreshDataTagihan()
      }
    },
    // isAsuransiBPJS(newVar, oldVar) {
    //   if (newVar !== oldVar && newVar) {
    //     this.list_type_no_asuransi = [{ text: 'No BPJS', value: 'bpjs' }, { text: 'NIK', value: 'nik' }]
    //     // console.log(this.dataHeader.type_no_asuransi)
    //     if (this.dataHeader.type_no_asuransi == null) this.dataHeader.type_no_asuransi = this.list_type_no_asuransi[0]
    //   }
    // },
    'dataHeader.asuransi'(newVar, oldVar) {
      if (newVar !== oldVar && oldVar != null) {
        this.dataHeader.status_no_asuransi = false
        this.dataHeader.no_asuransi = null
        this.dataHeader.status_no_sep_tagihan = false
        this.dataHeader.no_sep_tagihan = null
      }
    },
    'dataHeader.no_asuransi'(newVar, oldVar) {
      if (newVar !== oldVar) {
        if (oldVar != null) {
          this.dataHeader.status_no_asuransi = false
          this.dataHeader.status_no_sep_tagihan = false
          this.dataHeader.no_sep_tagihan = null
        }
        // this.cekAsuransi()
      }
    },
    'dataHeader.no_sep_tagihan'(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.dataHeader.status_no_sep_tagihan = false
        // this.cekSep()
      }
    }
  },
  async mounted() {
    const vm = this
    await vm.getDatas()
    await vm.auto()
  },
  methods: {
    async auto(data) {
      const vm = this
      vm.headerBusy = true
      const local = JSON.parse(localStorage.getItem('dataEditTagihan'))
      // if (data && data.reset) // localStorage.setItem('dataEditTagihan', null);
      if (local) {
        vm.resetData()
        console.log(local, 'localabc');
        console.log(local.tagihan_id, 'localabc2');
        await new Promise(resolve => setTimeout(resolve, 500))
        // const tagihan = await this.$_api.post('tagihan/detailsById/'+local.tagihan_id)
        this.$_api.single('tagihan', '', local.tagihan_id).then((tagihan) => {
          console.log(tagihan, 'tagihan detail abc');
          const data = tagihan.data[0]
          // header
          console.log(data, 'data header abc');
          vm.dataHeader.tagihan_id = data.tagihan_id
          vm.dataHeader.status_tagihan = data.status_tagihan
          vm.dataHeader.usia_pasien_tagihan = data.usia_pasien_tagihan ? data.usia_pasien_tagihan : 0
          vm.dataHeader.kode_tagihan = data.kode_tagihan
          vm.dataHeader.nama_tagihan = data.nama_tagihan
          vm.dataHeader.keterangan_tagihan = data.keterangan_tagihan
          vm.dataHeader.no_rm = data.no_rm
          vm.dataHeader.no_asuransi = data.no_asuransi
          vm.dataHeader.no_npwp_tagihan = data.no_npwp_tagihan
          vm.dataHeader.no_sep_tagihan = data.no_sep_tagihan
          vm.dataHeader.kelas_kunjungan_id = data.kelas_kunjungan_id
          vm.dataHeader.ms_jenis_layanan_id = data.ms_jenis_layanan_id
          vm.dataHeader.ms_asuransi_id = data.ms_asuransi_id
          vm.dataHeader.asuransi = data.ms_asuransi_id

          // jenis layanan
          if (vm.dataHeader.ms_jenis_layanan_id) {
            const indexJenisLayanan = vm.list_jenis_layanan.findIndex(x => x.id == vm.dataHeader.ms_jenis_layanan_id)
            if (indexJenisLayanan != -1) vm.dataHeader.ms_jenis_layanan_id = vm.list_jenis_layanan[indexJenisLayanan].id
          }
          // // asuransi
          // if (vm.dataHeader.ms_asuransi_id) {
          //   const index = vm.list_asuransi.findIndex(x => x.id == vm.dataHeader.ms_asuransi_id)
          //   if (index != -1) vm.dataHeader.asuransi = vm.list_asuransi[index].id
          // }

          console.log(vm.dataHeader, 'data header abc2');
          // kelas kunjungan
          // if (vm.dataHeader.kelas_kunjungan_id) {
          //   for (let i = 0; i < vm.list_kelas_kunjungan.length; i++) {
          //     const element = vm.list_kelas_kunjungan[i];
          //       console.log(element, 'element abc');
          //     if (element.kelas_kunjungan_id == vm.dataHeader.kelas_kunjungan_id) {
          //       vm.dataHeader.kelas_kunjungan = element
          //       break
          //     }
          //   }
          //   // const index = vm.list_kelas_kunjungan.findIndex(x => x.kelas_kunjungan_id == vm.dataHeader.kelas_kunjungan_id)
          //   // if (index != -1) vm.dataHeader.kelas_kunjungan = vm.list_kelas_kunjungan[index]
          // }

          vm.getInternal()
          vm.getExternal()
          vm.getPenjualan()
          vm.getSummary()
          vm.getDitanggung()
          vm.getDibayar()
        })
        // console.log('detail tagihan', tagihan)
      }
      vm.headerBusy = false
    },
    async getDatas() {
      const vm = this
      // jenis layanan
      this.$_api.post('msJenisLayanan/list', {}).then((list_jenis_layanan) => {
        console.log(list_jenis_layanan);
        vm.list_jenis_layanan = list_jenis_layanan.status === 200 ? list_jenis_layanan.data : []
      })
      // asuransi
      this.$_api.post('msAsuransi/list', {}).then((list_asuransi) => {
        console.log(list_asuransi);
        vm.list_asuransi = list_asuransi.status === 200 ? list_asuransi.data.map(x => { return { ...x, nama_asuransi_harga: `${x.nama_asuransi} - ${x.nama_harga}` } }) : []
      })
      // kelas kunjungan
      this.$_api.post('KelasKunjungan/list', {}).then((list_kelas_kunjungan) => {
        console.log(list_kelas_kunjungan);
        vm.list_kelas_kunjungan = list_kelas_kunjungan.status === 200 ? list_kelas_kunjungan.data.map(x => { return { ...x, nama_kelas: `${x.nama_kelas_kunjungan} - ${x.nama_tarif}` } }) : []
      })
    },
    async getSummary() {
      const vm = this
      console.log('getSummary', vm.dataHeader)
      this.$_api.post('tagihan/detailsSumary', { id: vm.dataHeader.tagihan_id }).then((summary) => {
        if (summary.status === 200) {
          console.log(summary, 'summaryabc');
          const data = summary.data[0]
          vm.listBarang = data.barang.map(x => {
            return {
              ...x,
              total_harga_barang: x.harga_barang_custom * x.qty_barang,
              qty_barang_total: x.total_stock_barang,
              nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
              nama_qty_barang: vm.toNumeric(x.qty_barang),
              nama_harga_barang: vm.toNumeric(x.harga_barang, 'idr'),
              nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, 'idr'),
              nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, 'idr')
            }
          })
          vm.listFasilitas = data.fasilitas.map(x => {
            return {
              ...x,
              nama_harga: vm.toNumeric(x.harga_fasilitas, 'idr'),
              total_harga_fasilitas: x.harga_fasilitas_custom * x.qty_fasilitas,
              nama_qty_fasilitas: vm.toNumeric(x.qty_fasilitas),
              nama_harga_fasilitas: vm.toNumeric(x.harga_fasilitas, 'idr'),
              nama_harga_fasilitas_custom: vm.toNumeric(x.harga_fasilitas_custom, 'idr'),
              nama_total_harga_fasilitas: vm.toNumeric(x.harga_fasilitas_custom * x.qty_fasilitas, 'idr')
            }
          })
          vm.listPenunjang = data.penunjang ? data.penunjang.map(x => {
            return {
              ...x,
              nama_harga: vm.toNumeric(x.harga_penjualan_penunjang, 'idr'),
              total_harga_penjualan_penunjang: x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang,
              nama_qty_penjualan_penunjang: vm.toNumeric(x.qty_penjualan_penunjang),
              nama_harga_penjualan_penunjang: vm.toNumeric(x.harga_penjualan_penunjang, 'idr'),
              nama_harga_custom_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang, 'idr'),
              nama_total_harga_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang, 'idr')
            }
          }) : []
          vm.listJasa = data.jasa.map(x => {
            return {
              ...x,
              total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
              nama_qty_jasa: vm.toNumeric(x.qty_jasa),
              nama_harga_jasa: vm.toNumeric(x.harga_jasa, 'idr'),
              nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, 'idr'),
              nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, 'idr')
            }
          })
        }
      })
      // console.log('summary', summary)
    },
    async getInternal() {
      const vm = this
      this.$_api.post('poolRegistrasi/listPoolRegistrasiByTagihanId', { tagihan_id: vm.dataHeader.tagihan_id }).then((internal) => {
        vm.listInternal = internal.status === 200 ? internal.data.map(x => {
          return {
            ...x,
            nama_tgl_registrasi: moment(x.tgl_registrasi).format('DD-MM-YYYY')
          }
        }) : []
      })
      // console.log('internal', internal)
    },
    async getExternal() {
      const vm = this
      this.$_api.post('poolExternal/listPoolExternalByTagihanId', { tagihan_id: vm.dataHeader.tagihan_id }).then((external) => {
        vm.listExternal = external.status === 200 ? external.data : []
      })
    },
    async getPenjualan() {
      const vm = this
      console.log("getPenjualan")
      // penjualan
      this.$_api.post('penjualan/listPenjualanByTagihanId', { tagihan_id: vm.dataHeader.tagihan_id }).then((penjualan) => {
        vm.listPenjualan = penjualan.status == 200 ? penjualan.data.map(x => {
          return {
            ...x,
            nama_total_penjualan: vm.toNumeric(x.total_penjualan, 'idr'),
            jumlah: x.total_penjualan + x.discount - x.tax
          }
        }) : []
      })
    },
    async getDitanggung() {
      const vm = this
      this.$_api.post('penanggung/listPenanggungByTagihanId', { tagihan_id: vm.dataHeader.tagihan_id }).then((ditanggung) => {
        vm.listDitanggung = ditanggung.status === 200 ? ditanggung.data.map(x => {
          return {
            ...x,
            nama_jumlah_penanggung: vm.toNumeric(x.jumlah_penanggung, 'idr')
          }
        }) : []
      })
    },
    async getDibayar() {
      const vm = this
      this.$_api.post('pembayaranTagihan/listPembayaranTagihanByTagihanId', { tagihan_id: vm.dataHeader.tagihan_id }).then((dibayar) => {
        console.log(dibayar, 'dibayar tagihan');
        vm.listDibayar = dibayar.status === 200 ? dibayar.data.map(x => {
          return {
            ...x,
            nama_jumlah_bayar_tagihan: vm.toNumeric(x.jumlah_bayar_tagihan, 'idr'),
            nama_tgl_pembayaran_tagihan: moment(x.tgl_pembayaran_tagihan).format('DD-MM-YYYY'),
            // nama_kas
            nama_tipe_pembayaran_tagihan: x.tipe_pembayaran_tagihan === 1 ? 'Tunai' : x.tipe_pembayaran_tagihan === 2 ? 'Debet / Kredit' : 'Client / Clientas'

            // tgl_pembayaran_tagihan
            // kas
            // tipe_pembayaran_tagihan
            // jumlah_bayar_tagihan
            // nama_jumlah_bayar_tagihan
          }
        }) : []
      })
    },
    async cekAsuransi() {
      const vm = this
      vm.dataHeader.status_no_asuransi = false
      // vm.dataHeader.no_asuransi = null
      if (this.dataHeader.no_asuransi) {
        if (vm.isAsuransiBPJS) {
          // const res = await this.$_api.post('bpjs/getPesertaByNoKartu', {no_kartu: vm.dataHeader.no_asuransi, jenis: vm.dataHeader.type_no_asuransi.value})
          this.$_api.post('bpjs/getPesertaByNoKartu', { no_kartu: vm.dataHeader.no_asuransi, jenis: vm.dataHeader.type_no_asuransi.value }).then((res) => {
            if (res.status === 200) {
              vm.dataHeader.no_asuransi = res.data[0].peserta.noKartu
              vm.dataHeader.type_no_asuransi = { text: 'No BPJS', value: 'bpjs' }
              this.$_alert.success('No Asuransi Tersedia')
              vm.dataHeader.status_no_asuransi = true
            } else {
              this.$_alert.error({}, res.message)
            }
          })
        } else {
          this.$_alert.error({}, 'cek asuransi selain bpjs belum dibuat')
          vm.dataHeader.status_no_asuransi = true
        }
      } else {
        // vm.$store.commit("set_alert", { variant: "danger", msg: 'Data Tidak Valid');
      }
      // vm.v$.dataHeader.no_asuransi.$reset()
      // vm.v$.dataHeader.no_asuransi.$touch()
    },
    async cekSep() {
      const vm = this
      // console.log("jalannnnnnn")
      vm.dataHeader.status_no_sep_tagihan = false
      // vm.dataHeader.no_sep_tagihan = null
      if (this.dataHeader.no_sep_tagihan) {
        if (vm.isAsuransiBPJS) {
          this.$_api.post('bpjs/getCariSep', { no_sep: vm.dataHeader.no_sep_tagihan }).then((res) => {
            if (res.status === 200) {
              // vm.dataHeader.no_sep_tagihan = res.data[0].peserta.noKartu
              this.$_alert.success('No SEP Tersedia')
              vm.dataHeader.status_no_sep_tagihan = true
            } else {
              this.$_alert.error({}, res.message)
            }
          })
        } else {
          this.$_alert.error({}, 'cek sep selain bpjs belum dibuat')
          vm.dataHeader.status_no_sep_tagihan = true
        }
      } else {
        // vm.$store.commit("set_alert", { variant: "danger", msg: 'Data Tidak Valid');
      }
      // vm.v$.dataHeader.no_sep_tagihan.$reset()
      // vm.v$.dataHeader.no_sep_tagihan.$touch()
    },
    async simpan() {
      const vm = this
      const dataSimpan = this.dataSimpan
      let valid = true
      
      if (!dataSimpan.pasien_id) valid = false
      if (!dataSimpan.kelas_kunjungan_id) valid = false
      if (!dataSimpan.ms_asuransi_id) valid = false
      if (!dataSimpan.ms_jenis_layanan_id) valid = false

      if (valid) {
        vm.busy = true
        await this.$_api.post('tagihan/register', dataSimpan).then(async (register) => {
          console.log('ini register', register)
          if (register.status === 200) {
            this.$_alert.success('Berhasil Membuat Tagihan')
            vm.$bvModal.hide('modal-register')
            const data = register.data
            localStorage.setItem('dataEditTagihan', JSON.stringify({ ...data, tagihan_id: data.id }))
            console.log('{...data, tagihan_id: data.id})', { ...data, tagihan_id: data.id })
            await new Promise(resolve => setTimeout(resolve, 500))
            vm.auto()
          } else {
            this.$_alert.error({}, register.message)
          }
          vm.busy = false
        })
      } else {
        vm.$bvModal.hide('modal-register')
        this.$_alert.error({}, 'Data Tidak Valid')
      }
    },
    async update() {
      const vm = this
      // this.v$.dataHeader.$touch()
      if (vm.isValid && vm.isDirty) {
        vm.busy = true
        // const update = await this.$_api.post('tagihan/update', {
        //   ms_jenis_layanan_id: vm.dataHeader.ms_jenis_layanan_id ? vm.dataHeader.ms_jenis_layanan_id.id : null,
        //   tgl_tagihan: vm.dataHeader.tgl_tagihan,
        //   no_npwp_tagihan: vm.dataHeader.no_npwp_tagihan,
        //   no_asuransi: vm.dataHeader.no_asuransi,
        //   no_sep_tagihan: vm.dataHeader.no_sep_tagihan,
        //   keterangan_tagihan: vm.dataHeader.keterangan_tagihan,
        //   id: vm.dataHeader.tagihan_id
        // })
        this.$_api.post('tagihan/update', {
          ms_jenis_layanan_id: vm.dataHeader.ms_jenis_layanan_id ? vm.dataHeader.ms_jenis_layanan_id : null,
          kelas_kunjungan_id: vm.dataHeader.kelas_kunjungan_id ? vm.dataHeader.kelas_kunjungan_id : null,
          tgl_tagihan: vm.dataHeader.tgl_tagihan,
          no_npwp_tagihan: vm.dataHeader.no_npwp_tagihan,
          no_asuransi: vm.dataHeader.no_asuransi,
          no_sep_tagihan: vm.dataHeader.no_sep_tagihan,
          keterangan_tagihan: vm.dataHeader.keterangan_tagihan,
          id: vm.dataHeader.tagihan_id
        }).then((update) => {
          if (update.status === 200) {
            vm.$emit('resetData')
            this.$_alert.success('Berhasil Mengubah Tagihan')
            vm.$bvModal.hide('modal-update')
            vm.auto()
          } else {
            this.$_alert.error({}, update.message)
          }
          vm.busy = false
        })
      } else {
        vm.$bvModal.hide('modal-update')
        this.$_alert.error({}, 'Data Tidak Valid')
      }
    },
    resetData(local) {
      // console.log("=============== resetData ==========")
      const vm = this
      if (local) localStorage.setItem('dataEditTagihan', null)
      vm.dataHeader = {
        status_tagihan: 0,
        tgl_tagihan: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        usia_pasien_tagihan: null,
        kode_tagihan: null,
        nama_tagihan: null,
        no_rm: null,
        jenis_layanan: null,
        kelas_kunjungan: null,
        asuransi: null,
        type_no_asuransi: null,
        no_asuransi: null,
        status_no_asuransi: null,
        no_sep_tagihan: null,
        status_no_sep_tagihan: null,
        keterangan_tagihan: null,
        no_npwp_tagihan: null
      }
      // table
      vm.listInternal = []
      vm.listExternal = []
      vm.listPenjualan = []
      vm.listDitanggung = []
      vm.listDibayar = []
      vm.listJasa = []
      vm.listBarang = []
      vm.listFasilitas = []
      // vm.v$.$reset()
    },
    async changeVar(data) {
      console.log('cokkkkkkkkkk')
      if (Array.isArray(data.data)) this[data.to] = []
      await new Promise(resolve => setTimeout(resolve, 100))
      // await new Promise(resolve => setTimeout(resolve, 1000));
      this[data.to] = data.data
      console.log('changeVar ', data)
      if (data.to === 'listPenjualan') {
        // this.getSummary()
        console.log('listInternal', this.listInternal)
        this.getSummaryByAllRegistration()
      }
    },
    async getSummaryByAllRegistration() {
      const vm = this
      const listInternal = this.listInternal

      for (const item of listInternal) {
        const registrasi_id = item.registrasi_id

        const res = await this.$_api.post('tagihan/detailsSumaryByRegistrasiId', { registrasi_id });
        console.log('getSummaryByAllRegistration', res)

        if(res.data.length) {

          const data = res.data[0]
          vm.listBarang = data.barang.map(x => {
            return {
              ...x,
              total_harga_barang: x.harga_barang_custom * x.qty_barang,
              qty_barang_total: x.total_stock_barang,
              nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
              nama_qty_barang: vm.toNumeric(x.qty_barang),
              nama_harga_barang: vm.toNumeric(x.harga_barang, 'idr'),
              nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, 'idr'),
              nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, 'idr')
            }
          })
          vm.listFasilitas = data.fasilitas.map(x => {
            return {
              ...x,
              nama_harga: vm.toNumeric(x.harga_fasilitas, 'idr'),
              total_harga_fasilitas: x.harga_fasilitas_custom * x.qty_fasilitas,
              nama_qty_fasilitas: vm.toNumeric(x.qty_fasilitas),
              nama_harga_fasilitas: vm.toNumeric(x.harga_fasilitas, 'idr'),
              nama_harga_fasilitas_custom: vm.toNumeric(x.harga_fasilitas_custom, 'idr'),
              nama_total_harga_fasilitas: vm.toNumeric(x.harga_fasilitas_custom * x.qty_fasilitas, 'idr')
            }
          })
          vm.listPenunjang = data.penunjang ? data.penunjang.map(x => {
            return {
              ...x,
              nama_harga: vm.toNumeric(x.harga_penjualan_penunjang, 'idr'),
              total_harga_penjualan_penunjang: x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang,
              nama_qty_penjualan_penunjang: vm.toNumeric(x.qty_penjualan_penunjang),
              nama_harga_penjualan_penunjang: vm.toNumeric(x.harga_penjualan_penunjang, 'idr'),
              nama_harga_custom_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang, 'idr'),
              nama_total_harga_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang, 'idr')
            }
          }) : []
          vm.listJasa = data.jasa.map(x => {
            return {
              ...x,
              total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
              nama_qty_jasa: vm.toNumeric(x.qty_jasa),
              nama_harga_jasa: vm.toNumeric(x.harga_jasa, 'idr'),
              nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, 'idr'),
              nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, 'idr')
            }
          })
          
        }

      }
    },
    parse(data) {
      return JSON.parse(JSON.stringify(data))
    },
    triggerAlert(event) {
      let vm = this
      vm.$store.commit('set_alert', event)
    },
    toNumeric(number, type) {
      let data = {}
      if (type === 'no-idr') {
        if (number < 0) {
          data = { style: 'currency', currency: 'IDR' }
          return '-' + new Intl.NumberFormat('id-ID', data).format(number * -1).slice(3)
        } else {
          return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number).slice(3)
        }
      } else {
        if (type === 'idr') data = { style: 'currency', currency: 'IDR' }
        return new Intl.NumberFormat('id-ID', data).format(number)
      }
    },
    async refreshDataTagihan() {
      const vm = this
      // //console.log('vm.dataTagihan.tax', vm.dataTagihan.tax)
      // jumlah
      vm.dataTagihan.nama_jumlah = vm.toNumeric(vm.dataTagihan.jumlah, 'no-idr')
      // sub total
      vm.dataTagihan.sub_total = vm.dataTagihan.jumlah - vm.dataTagihan.discount
      vm.dataTagihan.nama_sub_total = vm.toNumeric(vm.dataTagihan.sub_total, 'no-idr')
      // discount
      vm.dataTagihan.nama_discount = vm.toNumeric(vm.dataTagihan.discount, 'no-idr')
      // tax nominal
      vm.dataTagihan.nama_tax_nominal = vm.toNumeric(vm.dataTagihan.tax, 'no-idr')
      // tax persen
      vm.dataTagihan.tax_persen = vm.dataTagihan.tax ? vm.dataTagihan.tax / vm.dataTagihan.sub_total * 100 : 0
      // vm.dataTagihan.tax_persen = vm.dataTagihan.sub_total / vm.dataTagihan.tax
      vm.dataTagihan.nama_tax_persen = vm.toNumeric(vm.dataTagihan.tax_persen) + '%'
      // total tagihan
      vm.dataTagihan.nama_total_tagihan = vm.toNumeric(vm.dataTagihan.total_tagihan, 'no-idr')
      // selisih tagihan
      vm.dataTagihan.selisih_tagihan = vm.dataTagihan.total_ditanggung - vm.dataTagihan.total_tagihan
      vm.dataTagihan.nama_selisih_tagihan = vm.toNumeric(vm.dataTagihan.selisih_tagihan, 'no-idr')
      if (vm.dataTagihan.selisih_tagihan < 0) vm.dataTagihan.nama_selisih_tagihan = '(' + vm.dataTagihan.nama_selisih_tagihan + ')'
      // sisa pembayaran
      vm.dataTagihan.sisa_pembayaran = vm.dataTagihan.total_ditanggung - vm.dataTagihan.total_pembayaran
      vm.dataTagihan.nama_sisa_pembayaran = vm.toNumeric(vm.dataTagihan.sisa_pembayaran, 'no-idr')

      // Total pembayaran
      vm.dataTagihan.total_semua_pembayaran = vm.dataTagihan.total_ditanggung + vm.dataTagihan.total_semua_pembayaran
      vm.dataTagihan.nama_total_semua_pembayaran = vm.toNumeric(vm.dataTagihan.total_semua_pembayaran, 'no-idr')

      // Kekurangan pembayaran
      vm.dataTagihan.kurang_pembayaran = vm.dataTagihan.selisih_tagihan + vm.dataTagihan.total_pembayaran
      vm.dataTagihan.nama_kurang_pembayaran = vm.toNumeric(vm.dataTagihan.kurang_pembayaran, 'no-idr')
      if (vm.dataTagihan.kurang_pembayaran < 0) vm.dataTagihan.nama_kurang_pembayaran = '(' + vm.dataTagihan.nama_kurang_pembayaran + ')'

    },
    checkValidasi(fieldName) {

    }
  },
  beforeDestroy() {
    localStorage.setItem('dataEditTagihan', null)
  }
}
</script>
