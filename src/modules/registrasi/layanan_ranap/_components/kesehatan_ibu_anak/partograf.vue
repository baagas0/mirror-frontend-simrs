<template>
  <div id="page-partograf">
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <!-- <b-button variant="success" class="mr-2">Buat Baru Kehamilan</b-button> -->
          <!-- <b-button variant="success">Cetak Kartu Ibu</b-button> -->
        </div>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Informasi Ibu</h6>
      </b-col>

      <b-col cols="12" sm="12" md="6" lg="6">
        <!-- <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal
          </template>
          <b-form-input type="text" disabled v-model="mData.tanggal_partograf"></b-form-input>
        </b-form-group> -->

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Nama
          </template>
          <b-form-input type="text" v-model="mData.nama_pasien" disabled></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Gravida
          </template>
          <b-form-input type="text" v-model="mData.gravida" disabled></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Paritas
          </template>
          <b-form-input type="text" v-model="mData.paritas" disabled></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Abortus
          </template>
          <b-form-input type="text" v-model="mData.abortus" disabled></b-form-input>
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="12" md="6" lg="6">
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal Rawat
          </template>
          <b-form-datepicker style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" no-flip right locale="id"
            v-model="mData.tanggal_rawat"></b-form-datepicker>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pukul Rawat
          </template>
          <b-form-input type="time" v-model="mData.jam_rawat"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal Mules
          </template>
          <b-form-datepicker style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" no-flip right locale="id"
            v-model="mData.tanggal_mules"></b-form-datepicker>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pukul Mules
          </template>
          <b-form-input type="time" v-model="mData.jam_mules"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal Ketuban Pecah
          </template>
          <b-form-datepicker style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" no-flip right locale="id"
            v-model="mData.tanggal_ketuban_pecah"></b-form-datepicker>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pukul Kebutuban Pecah
          </template>
          <b-form-input type="time" v-model="mData.jam_ketuban_pecah"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width: 100%;display: flex;justify-content: flex-end;">
          <b-button v-if="update" @click="updateData()" :disabled="busy" variant="warning" class="mr-2">Update</b-button>
          <b-button v-else @click="simpanParto()" :disabled="busy" variant="success">Simpan</b-button>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Detail Partograf</h6>
      </b-col>

      <b-col cols="12" sm="12" md="6" lg="6">
        <b-button variant="primary" :disabled="disabledButton" block v-b-modal.modal-kemajuan-persalinan>Kemajuan
          Persalinan</b-button>
        <b-button variant="primary" :disabled="disabledButton" block v-b-modal.modal-kondisi-janin>Kondisi
          Janin</b-button>
        <b-button variant="primary" :disabled="disabledButton" block v-b-modal.modal-kondisi-ibu>Kondisi Ibu</b-button>
      </b-col>

      <b-col cols="12" sm="12" md="6" lg="6">
        <b-button variant="primary" :disabled="disabledButton" block v-b-modal.modal-obat-cairan>Obat & Cairan</b-button>
        <b-button variant="primary" :disabled="disabledButton" block v-b-modal.modal-catatan-persalinan>Catatan
          Persalinan</b-button>
        <b-button variant="primary" :disabled="disabledButton" block
          v-b-modal.modal-pemantauan>Pemantauan Kala IV</b-button>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Partograf</h6>
      </b-col>
      <BarChart style="width:100%" :patograf="mData" />
    </b-row>

    <!-- modal kemajuan persalinan -->
    <b-modal id="modal-kemajuan-persalinan" title="Kemajuan Persalinan" centered header-bg-variant="primary" header-text-variant="light" hide-footer size="lg" @hide="$parent.$parent.updateAssesmenTambahan(silent = true)">
      <p>Pembukaan Serviks</p>
      <PembukaanServiks :pembukaan_serviks="mData.pembukaan_serviks" />

      <p>Kontraksi Uterus</p>
      <KontraksiUterus :kontraksi_uterus="mData.kontraksi_uterus" />

    </b-modal>

    <!-- modal kondisi janin -->
    <b-modal id="modal-kondisi-janin" title="Kondisi Janin" centered header-bg-variant="primary" header-text-variant="light" hide-footer size="lg" @hide="$parent.$parent.updateAssesmenTambahan(silent = true)">
      <p>Detak Jantung Janin</p>
      <DetakJantungJanin :detak_jantung_janin="mData.detak_jantung_janin" />

      <p>Penyusupan</p>
      <Penyusupan :penyusupan="mData.penyusupan" />

      <p>Warna Air</p>
      <WarnaAir :warna_air="mData.warna_air" />
      
    </b-modal>

    <!-- modal kondisi ibu -->
    <b-modal id="modal-kondisi-ibu" title="Kondisi Ibu" centered header-bg-variant="primary" header-text-variant="light" hide-footer size="lg" @hide="$parent.$parent.updateAssesmenTambahan(silent = true)">
      <p>Nadi</p>
      <Nadi :nadi="mData.nadi" />
      <p>Tekanan Darah</p>
      <TekananDarah :tekanan_darah="mData.tekanan_darah" />
      <p>Suhu</p>
      <Suhu :suhu="mData.suhu" />
      <p>Urine</p>
      <Urine :urine="mData.urine" />
      <p>Makan & Minum</p>
      <MakanMinum :makan_minum="mData.makan_minum" />
      
    </b-modal>

    <!-- modal obat & cairan -->
    <b-modal id="modal-obat-cairan" title="Obat & Cairan" centered header-bg-variant="primary" header-text-variant="light" hide-footer size="lg" @hide="$parent.$parent.updateAssesmenTambahan(silent = true)">
      <p>Obat</p>
      <Obat :obat="mData.obat" />
      <p>Cairan</p>
      <Cairan :cairan="mData.cairan" />
      
    </b-modal>

    <!-- modal catatan persalinan -->
    <b-modal id="modal-catatan-persalinan" title="Catatan Persalinan" centered header-bg-variant="primary" header-text-variant="light" hide-footer size="lg"  @hide="$parent.$parent.updateAssesmenTambahan(silent = true)">
      <p>Catatan Persalinan</p>
      <CatatanPersalinan :catatan_persalinan="mData.catatan_persalinan" />
      <p>Kala I</p>
      <KalaSatu :kala_satu="mData.kala_satu" />
      <p>Kala II</p>
      <KalaDua :kala_dua="mData.kala_dua" />
      <p>Kala III</p>
      <KalaTiga :kala_tiga="mData.kala_tiga" />
      <p>Kala IV</p>
      <KalaEmpat :kala_empat="mData.kala_empat" />
      <p>Bayi Baru Lahir</p>
      <BayiLahir :bayi_lahir="mData.bayi_lahir" />

    </b-modal>

    <!-- modal pemantauan -->
    <b-modal id="modal-pemantauan" title="Pemantauan Kala IV" centered header-bg-variant="primary" header-text-variant="light" hide-footer size="xl">
      <b-row class="mt-3">
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <b-table-simple class="table-pemantauan table-sm">
            <b-thead>
              <b-tr>
                <b-th class="table-number">No.</b-th>
                <b-th style="width:200px">Tanggal Periksa</b-th>
                <b-th>Jam Periksa</b-th>
                <b-th>Sistole</b-th>
                <b-th>Diastole</b-th>
                <b-th>Nadi</b-th>
                <b-th>Suhu</b-th>
                <b-th>Tinggi Fundus Uteri</b-th>
                <b-th>Kontraksi Uterus</b-th>
                <b-th>Jml Urin</b-th>
                <b-th>Jml Darah Keluar</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td>
                  <b-button :disabled="busy" @click="simpanPemantauan()" variant="success" size="sm">
                    <i class="ri-add-line"></i>
                  </b-button>
                </b-td>
                <b-td>
                  <b-form-datepicker style="width: 100%"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" no-flip right locale="id"
                    v-model="data_pemantauan.tanggal_periksa"></b-form-datepicker>
                </b-td>
                <b-td>
                  <b-form-input type="time" v-model="data_pemantauan.jam_periksa"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input placeholder="mm" type="number" v-model="data_pemantauan.sistole"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input placeholder="Hg" type="number" v-model="data_pemantauan.diastole"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input type="number" v-model="data_pemantauan.nadi"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input type="number" v-model="data_pemantauan.suhu"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input type="number" v-model="data_pemantauan.tinggi_fundus"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input type="number" v-model="data_pemantauan.kontraksi_uterus"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input type="number" v-model="data_pemantauan.jumlah_urin"></b-form-input>
                </b-td>

                <b-td>
                  <b-form-input placeholder="ml" type="number"
                    v-model="data_pemantauan.jumlah_darah_keluar"></b-form-input>
                </b-td>
              </b-tr>

              <b-tr v-for="(item, idx) in mData.kala_lima" :key="idx">
                <b-td>
                  <b-button @click="$_alert.confirm('Yakin ingin menghapus?').then(function(s) { if (s.isConfirmed) mData.kala_lima.splice(idx, 1) })" variant="danger" size="sm">
                    <i class="ri-delete-bin-line"></i>
                  </b-button>
                </b-td>
                <b-td>{{ item.tanggal_periksa }}</b-td>
                <b-td>{{ item.jam_periksa }}</b-td>
                <b-td>{{ item.sistole }}</b-td>
                <b-td>{{ item.diastole }}</b-td>
                <b-td>{{ item.nadi }}</b-td>
                <b-td>{{ item.suhu }}</b-td>
                <b-td>{{ item.tinggi_fundus }}</b-td>
                <b-td>{{ item.kontraksi_uterus }}</b-td>
                <b-td>{{ item.jumlah_urine }}</b-td>
                <b-td>{{ item.jumlah_darah_keluar }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import PembukaanServiks from "./kemajuan_persalinan/pembukaan_serviks.vue";
import KontraksiUterus from "./kemajuan_persalinan/kontraksi_uterus.vue";
import DetakJantungJanin from "./kondisi_janin/detak_jantung_janin.vue";
import Penyusupan from "./kondisi_janin/penyusupan.vue";
import WarnaAir from "./kondisi_janin/warna_air.vue";
import Nadi from "./kondisi_ibu/nadi.vue";
import TekananDarah from "./kondisi_ibu/tekanan_darah.vue";
import Suhu from "./kondisi_ibu/suhu.vue";
import Urine from "./kondisi_ibu/urine.vue";
import MakanMinum from "./kondisi_ibu/makan_minum.vue";
import Obat from "./obat_cairan/obat.vue";
import Cairan from "./obat_cairan/cairan.vue";
import CatatanPersalinan from "./catatan_persalinan/catatan_persalinan.vue";
import KalaSatu from "./catatan_persalinan/kala_satu.vue";
import KalaDua from "./catatan_persalinan/kala_dua.vue";
import KalaTiga from "./catatan_persalinan/kala_tiga.vue";
import KalaEmpat from "./catatan_persalinan/kala_empat.vue";
import BayiLahir from "./catatan_persalinan/bayi_lahir.vue";
import BarChart from './chart_partograf.vue'
export default {
  name: 'App',
  props: [
    'mData',
    'kunjungan',
  ],
  components: {
    PembukaanServiks,
    KontraksiUterus,
    DetakJantungJanin,
    Penyusupan,
    WarnaAir,
    Nadi,
    Suhu,
    TekananDarah,
    Urine,
    MakanMinum,
    Obat,
    Cairan,
    CatatanPersalinan,
    KalaSatu,
    KalaDua,
    KalaTiga,
    KalaEmpat,
    BayiLahir,
    BarChart
  },
  data() {
    return {
      data_partograf: {
        tanggal_partograf: null,
        nama_pasien: null,
        gravida: null,
        abortus: null,
        paritas: null,
        tanggal_rawat: null,
        jam_rawat: null,
        tanggal_mules: null,
        jam_mules: null,
        tanggal_ketuban_pecah: null,
        jam_ketuban_pecah: null,
      },
      busy: false,
      disabledButton: false,
      tembak: false,
      list_data: [],
      data_pemantauan: {
        partograf_id: null,
        tanggal_periksa: null,
        jam_periksa: null,
        sistole: null,
        diastole: null,
        nadi: null,
        suhu: null,
        tinggi_fundus: null,
        kontraksi_uterus: null,
        jumlah_urine: null,
        jumlah_darah_keluar: null
      },
      update: false,
    }
  },
  computed: {
    gpa() {
      return this.$store.state.gpa
    },
    partograf_id() {
      return this.$store.state.partograf_id
    },
    kia_id() {
      return this.$store.state.kia_id
    },
    reset() {
      return this.$store.state.reset
    },
  },
  // watch: {
  //   reset(newVal, oldVal) {
  //     if (newVal != oldVal) {
  //       if (newVal == true) {
  //         // this.disabled = true
  //         this.resetData()
  //       }
  //     }
  //   },
  //   kunjungan(newVal, oldVal) {
  //     if (newVal != oldVal) {
  //       this.data_partograf.nama_pasien = this.kunjungan.nama_lengkap

  //     }
  //   },
  //   kia_id(newVal, oldVal) {
  //     if (newVal != oldVal) {
  //       if (newVal) {
  //         this.getData()
  //       }
  //     }
  //   },
  // },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let vm = this
    },
    simpanParto () {
      this.$parent.$parent.updateAssesmenTambahan(true)
    },
    // simpanParto() {
    //   let vm = this
    //   vm.busy = true
    //   vm.data_partograf.kia_id = vm.$store.state.kia_id
    //   vm.data_partograf.kunjungan_id = vm.kunjungan.kunjungan_id
    //   // console.log(vm.data_partograf, 'ini parto');
    //   vm.$axios.post("/partograf/register", vm.data_partograf)
    //     .then((res) => {
    //       // console.log(res, 'ini responya ui');
    //       if (res.data.status == 200 && res.data.message == "sukses") {
    //         vm.busy = false
    //         vm.disabledButton = false
    //         vm.update = true
    //         vm.$store.commit("set_partograf", res.data.data.id)
    //         vm.$store.commit('set_alert', { variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true })
    //       }
    //       else {
    //         vm.busy = false
    //         vm.$store.commit('set_alert', { variant: 'danger', msg: res.data.message, showing: true })
    //       }
    //     })
    //     .catch((err) => {
    //       vm.busy = false
    //       vm.$store.commit('set_alert', { variant: 'danger', msg: err.message, showing: true })
    //     })
    // },
    // updateData() {
    //   let vm = this
    //   vm.busy = true
    //   vm.data_partograf.kia_id = vm.$store.state.kia_id
    //   vm.data_partograf.kunjungan_id = vm.kunjungan.kunjungan_id
    //   vm.data_partograf.id = vm.$store.state.partograf_id
    //   // console.log(vm.data_partograf, 'ini parto');
    //   vm.$axios.post("/partograf/register", vm.data_partograf)
    //     .then((res) => {
    //       // console.log(res, 'ini responya ui');
    //       if (res.data.status == 200 && res.data.message == "sukses") {
    //         vm.busy = false
    //         vm.$store.commit('set_alert', { variant: 'success', msg: "BERHASIL MENGUPDATE DATA", showing: true })
    //       }
    //       else {
    //         vm.busy = false
    //         vm.$store.commit('set_alert', { variant: 'danger', msg: res.data.message, showing: true })
    //       }
    //     })
    //     .catch((err) => {
    //       vm.busy = false
    //       vm.$store.commit('set_alert', { variant: 'danger', msg: err.message, showing: true })
    //     })
    // },
    // getDataPemantauan() {
    //   let vm = this
    //   vm.$axios.post("/pemantauan_kala_iv/list", { partograf_id: vm.partograf_id })
    //     .then((res) => {
    //       if (res.data.data.length) {
    //         // console.log(res, 'ini parto');
    //         vm.list_data = res.data.data
    //         for (let i = 0; i < vm.list_data.length; i++) {
    //           let x = vm.list_data[i];
    //           if (x.tanggal_periksa) {
    //             x.tanggal_periksa = vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")
    //           }
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       vm.$store.commit('set_alert', { variant: 'danger', msg: err.message, showing: true })
    //     })
    // },
    simpanPemantauan() {
      let vm = this
      // console.log(vm.hasil_pemeriksaan, 'lha to');
      this.mData.kala_lima.push(vm.data_pemantauan)

      vm.data_pemantauan = {
        partograf_id: null,
        tanggal_periksa: null,
        jam_periksa: null,
        sistole: null,
        diastole: null,
        nadi: null,
        suhu: null,
        tinggi_fundus: null,
        kontraksi_uterus: null,
        jumlah_urine: null,
        jumlah_darah_keluar: null
      }
      
    },
    resetData() {
      let vm = this
      vm.data_partograf = {
        tanggal_partograf: null,
        nama_pasien: null,
        gravida: null,
        abortus: null,
        paritas: null,
        tanggal_rawat: null,
        jam_rawat: null,
        tanggal_mules: null,
        jam_mules: null,
        tanggal_ketuban_pecah: null,
        jam_ketuban_pecah: null,
      }
      vm.data_pemantauan = {
        partograf_id: null,
        tanggal_periksa: null,
        jam_periksa: null,
        sistole: null,
        diastole: null,
        nadi: null,
        suhu: null,
        tinggi_fundus: null,
        kontraksi_uterus: null,
        jumlah_urine: null,
        jumlah_darah_keluar: null
      }
      vm.update = false
    }
  },
}
</script>
<style >
.table-pemantauan th {
  background-color: #D52F65 !important;
  color: #fff;
  font-weight: 600;
}

.table-pemantauan th,
td {
  border: 1px solid #F1F1F1 !important;
}

.table-pemantauan th:nth-child(1) {
  border-top-left-radius: 8px;
}

.table-pemantauan th:nth-child(10) {
  border-top-right-radius: 8px;
}
</style>
