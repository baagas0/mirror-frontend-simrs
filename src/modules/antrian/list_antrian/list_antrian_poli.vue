<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="12" lg="12">
        <h3 class="mb-0">
          <strong>List Antrian Poli</strong>
        </h3>
        <b-card header-tag="header" header-bg-variant="dark" style="margin-top: 20px">
          <b-row style="display: flex">
            <b-col cols="12" md="12" lg="12">
              <b-row>
                <b-col cols="12" md="12" lg="12">
                  <b-card>
                    <b-row>
                      <b-col cols="3" md="3" lg="3">
                        <b-form>

                          <b-form-group label-rows-md='2'>
                            <template v-slot:label>
                              Poliklinik
                            </template>
                            <lookup-input v-model="data.ms_poliklinik_id" :multiple="false" endpoint="msPoliklinik"
                              title="Poliklinik" :pointer="{
                                label: 'nama_poliklinik',
                                code: 'id',
                                display: ['nama_poliklinik'],
                              }" @input='getDokter()' />
                          </b-form-group>
                        </b-form>
                      </b-col>
                      <b-col cols="3" md="3" lg="3">
                        <b-form>

                          <b-form-group label-rows-md='2'>
                            <template v-slot:label>
                              Dokter
                            </template>
                            <lookup-input v-model="data.ms_dokter_id" :multiple="false"
                              endpoint="jadwalDokter/listJadwalDokterByMsPoliIdBypassUri" title="Dokter" :pointer="{
                                label: 'nama_dokter',
                                code: 'ms_dokter_id',
                                display: ['nama_dokter', 'jk_dokter'],
                              }" :param="{
  tanggal: dateToday,
  ms_poliklinik_id: data.ms_poliklinik_id
}" :list="listDokter" @input='getJadwal()' :disabled="listDokter.length == 0 || !data.ms_poliklinik_id" />
                          </b-form-group>
                        </b-form>
                      </b-col>
                      <b-col cols="3" md="3" lg="3">
                        <b-form>

                          <b-form-group label-rows-md='2'>
                            <template v-slot:label>
                              Jadwal
                            </template>
                            <lookup-input v-model="data.jadwal_dokter_id" :multiple="false"
                              endpoint="jadwalDokter/listJadwalDokterByMsDokterIdBypassUri" title="Jadwal" :pointer="{
                                label: 'waktu_mulai',
                                code: 'jadwal_dokter_id',
                                display: ['waktu_mulai', 'waktu_selesai'],
                              }" :param="{
  tanggal: dateToday,
  ms_dokter_id: data.ms_dokter_id
}" :list="listJadwal" @input="selectJadwal" :disabled="listJadwal.length == 0 || !data.ms_dokter_id" />
                          </b-form-group>
                        </b-form>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12" md="12" lg="12">
                        <b-button v-if="locked" style="width: 100%" variant="success" @click="hapusData()">
                          <i class="ri-lock-password-line"></i> Buka loket baru
                        </b-button>
                        <b-button v-else :disabled="!data.ms_poliklinik_id || !data.jadwal_dokter_id" style="width: 100%"
                          variant="success" @click="simpanData()">
                          Gunakan loket
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>



                <b-col cols="9" md="9" lg="9">
                  <b-card>
                    <b-row>
                      <b-col cols="12" md="12" lg="12">
                        <div class="row justify-content-between w-100">
                          <div class="d-flex flex-column">
                            <div v-if="locked" @click="simpanData()" style="cursor: pointer;">
                              <h5><strong>Antrian</strong><i class="ri-restart-fill ml-2"></i></h5>
                            </div>
                            <div v-else>
                              <h5><strong>Antrian</strong></h5>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage"
                          show-empty hover class="bg-light">
                          <template #cell(actions)="item" class="p-0">
                            <b-button variant="success" class="" :disabled="sedang_proses" @click="update(item.item)">
                              Pilih
                            </b-button>
                          </template>
                        </b-table>
                        <b-row>
                          <b-col md="8" offset-md="4">
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                              size="sm"></b-pagination>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="12" md="12" lg="12">
                        <h5><strong>Sedang Proses</strong></h5>
                        <hr />
                        <b-table :items="itemsProses" :fields="fieldsProses" :current-page="currentPageProses"
                          :per-page="perPageProses" responsive show-empty hover class="bg-light">
                          <template #cell(actions)="item">
                            <b-button variant="success" class="mr-1" v-b-tooltip.hover title="'Panggil'"
                              @click="data = item.item">
                              <i class="ri-notification-line"></i>
                              {{ item.actions }}
                            </b-button>
                          </template>
                        </b-table>
                        <b-row>
                          <b-col md="8" offset-md="4">
                            <b-pagination v-model="currentPageProses" :total-rows="totalRowsProses"
                              :per-page="perPageProses" align="fill" size="sm"></b-pagination>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="12" md="12" lg="12">
                        <h5><strong>Selesai</strong></h5>
                        <hr />
                        <b-table :items="itemsSelesai" :fields="fieldsSelesai" :current-page="currentPageSelesai"
                          :per-page="perPageSelesai" responsive show-empty hover class="bg-light">
                          <template #cell(actions)="item">
                            <b-button variant="success" class="mr-1" v-b-tooltip.hover title="'Panggil'"
                              @click="data = item.item">
                              <i class="ri-notification-line"></i>
                              {{ item.actions }}
                            </b-button>
                          </template>
                        </b-table>
                        <b-row>
                          <b-col md="4" offset-md="8">
                            <b-pagination v-model="currentPageSelesai" :total-rows="totalRowsSelesai"
                              :per-page="perPageSelesai" align="fill" size="sm"></b-pagination>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col cols="3" md="3" lg="3">
                  <b-card style="
                        flex-flow: column wrap;
                        position: absolute;
                        width: 92%;
                        margin-right: 50px;
                      ">
                    <b-row>
                      <b-col cols="12" md="12" lg="12">
                        <h5><strong>Proses</strong></h5>
                        <hr />
                      </b-col>
                      <b-col cols="12" md="12" lg="12">
                        <b-row style="width:100%">
                          <b-col cols="8" md="8" lg="8">
                            <h5>
                              <strong>Poli {{ loketnya }}</strong>
                            </h5>
                          </b-col>
                          <b-col cols="4" md="4" lg="4">
                            <b-button :disabled="!no_proses || sedang_manggil" style="justify-content;: flex-end"
                              variant="success" class="mr-1" @click="panggil()" v-b-tooltip.hover title="'Panggil'">
                              <i class="ri-notification-line"></i>
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="12" md="12" lg="12">
                        <b-row>
                          <b-col style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 250px;
                              ">
                            <p style="font-size: 90px">
                              <strong>{{ no_proses }}</strong>
                            </p>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col cols="12" md="12" lg="12">
                            <b-row>
                              <b-col cols="12" md="12" lg="12">
                                <b-button :disabled="!no_proses" style="width: 100%" variant="primary"
                                  @click="mulaiProses()">
                                  <i class="ri-checkbox-circle-line"></i> Proses Antrian
                                </b-button>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col cols="6" md="6" lg="6" class="mt-2">
                                <b-button style="width: 100%" variant="danger" @click="batalProses()"
                                  :disabled="disabledBatal">
                                  <i class="ri-checkbox-circle-line"></i> Batal
                                </b-button>
                              </b-col>
                              <b-col cols="6" md="6" lg="6" class="mt-2">
                                <b-button style="width: 100%" variant="success" v-b-modal.modal-selesaiAntrian
                                  :disabled="disabledSelesai">
                                  <i class="ri-checkbox-circle-line"></i> Selesai
                                </b-button>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <!-- MODAL !!! -->
    <!-- MODAL SELESAI ANTRIAN -->
    <b-modal id="modal-selesaiAntrian" ref="modal" title="Selesai Antrian" size="lg" centered hide-footer hide-header>
      <h2 class="text-center" style="margin-bottom:10px;">Silahkan pilih proses selanjutnya</h2>

      <b-row>
        <b-col cols="12" lg="12" md="12" class="mt-2">
          <b-button variant="outline-primary" size="lg" style="width:100%" @click="pilihPoli()">Lanjutkan Ke
            Poli</b-button>
        </b-col>
        <b-col cols="12" lg="12" md="12" class="mt-2">
          <b-button variant="outline-primary" size="lg" style="width:100%" @click="pilihLayanan()">Lanjutkan Ke
            Layanan</b-button>
        </b-col>
        <b-col cols="12" lg="12" md="12" class="mt-2">
          <b-button variant="outline-primary" size="lg" style="width:100%" @click="pilihFarmasi()">Lanjutkan Ke
            Farmasi</b-button>
        </b-col>
        <b-col cols="12" lg="12" md="12" class="mt-2">
          <b-button variant="outline-primary" size="lg" style="width:100%" @click="pilihKasir()">Lanjutkan Ke
            Kasir</b-button>
        </b-col>
        <b-col cols="12" lg="12" md="12" class="mt-2">
          <b-button variant="outline-primary" size="lg" style="width:100%" @click="selesaiAntrian()">Selesaikan
            Antrian</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <!-- MODAL LANJUTKAN POLI -->
    <b-modal id="modal-pilihpoli" ref="modal" title="Lanjutkan ke Poli" size="lg" centered hide-footer hide-header>
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Nama Poli <span class="text-danger">*</span>
          </template>
          <lookup-input v-model="data2.ms_poliklinik_id" :multiple="false" endpoint="msPoliklinik" title="Poliklinik"
            :pointer="{
              label: 'nama_poliklinik',
              code: 'id',
              display: ['nama_poliklinik'],
            }" @input='getDokter2(data2.ms_poliklinik_id)' />
        </b-form-group>

        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Nama Dokter <span class="text-danger">*</span>
          </template>
          <lookup-input v-model="data2.ms_dokter_id" :multiple="false" title="Dokter" :pointer="{
            label: 'nama_dokter',
            code: 'ms_dokter_id',
            display: ['nama_dokter'],
          }" :list="listDokter2" endpoint="jadwalDokter/listJadwalDokterByMsPoliIdBypassUri" :param="{
  ms_poliklinik_id: data2.ms_poliklinik_id,
  tanggal: dateToday,
}" @input='getJadwal2(data2.ms_dokter_id)' :disabled="listDokter2.length == 0" />
        </b-form-group>

        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Pilih Jadwal <span class="text-danger">*</span>
          </template>
          <lookup-input v-model="data2.jadwal_dokter_id" :multiple="false" title="Dokter" :pointer="{
            label: 'waktu_mulai',
            code: 'jadwal_dokter_id',
            display: ['waktu_mulai', 'waktu_selesai', 'nama_dokter', 'jk_dokter'],
          }" :list="listJadwal2" endpoint="jadwalDokter/listJadwalDokterByMsDokterIdBypassUri" :param="{
  ms_dokter_id: data2.ms_dokter_id,
  tanggal: dateToday,
}" @input="selectJadwal2" :disabled="listJadwal2.length == 0" />
        </b-form-group>
        <b-button @click="pindahkePoli()" style="width:100%" variant="outline-success">
          Simpan
        </b-button>
      </b-form>
    </b-modal>

    <!-- MODAL LANJUTKAN LAYANAN -->
    <b-modal id="modal-pilihlayanan" ref="modal" title="Lanjutkan ke Layanan" size="lg" centered hide-footer hide-header>
      <b-form>
        <!-- <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nomor Rekam Medis <span class='text-danger'>*</span>
          </template>
          <b-form-input v-model='no_rm' type='text' @change='getDataPasien(no_rm)'></b-form-input>
        </b-form-group> -->
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nama Pasien
          </template>
          <b-form-input v-model='nama_pasien' type='text' disabled></b-form-input>
        </b-form-group>
        <!-- <b-form-group label-cols-md='3'>
          <template v-slot:label>
            No. BPJS
          </template>
          <b-form-input v-model='nomor_kartu' type='text' disabled></b-form-input>
        </b-form-group> -->
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Layanan Ruang <span class='text-danger'>*</span>
          </template>
          <lookup-input v-model="data.layanan_ruang_id" :multiple="false" endpoint="layananRuang" title="Layanan"
            :pointer="{
              label: 'nama_layanan_ruang',
              code: 'layanan_ruang_id',
              display: ['nama_layanan_ruang', 'keterangan_layanan_ruang', 'nama_layanan', 'kode_layanan'],
            }" @input='selectLayanan' />
        </b-form-group>

        <b-button @click="pindahkeLayanan()" style="width:100%" variant="outline-success">
          Simpan
        </b-button>
      </b-form>


    </b-modal>

    <!-- MODAL LANJUTKAN FARMASI -->
    <b-modal id="modal-pilihFarmasi" ref="modal" title="Lanjutkan ke Farmasi" size="lg" centered hide-footer hide-header>
      <b-form>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nama Pasien
          </template>
          <b-form-input v-model='nama_pasien' type='text' disabled></b-form-input>
        </b-form-group>

        <b-button @click="pindahkeFarmasi()" style="width:100%" variant="outline-success">
          Simpan
        </b-button>
      </b-form>


    </b-modal>

    <!-- MODAL LANJUTKAN Kasir -->
    <b-modal id="modal-pilihKasir" ref="modal" title="Lanjutkan ke Kasir" size="lg" centered hide-footer hide-header>
      <b-form>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nama Pasien
          </template>
          <b-form-input v-model='nama_pasien' type='text' disabled></b-form-input>
        </b-form-group>

        <b-button @click="pindahkeKasir()" style="width:100%" variant="outline-success">
          Simpan
        </b-button>
      </b-form>


    </b-modal>
  </b-container>
</template>

<script>
// import this.$_api from "this.$_api";
// // import { ipBackend } from "@/ipBackend";
import moment from 'moment'
moment.locale('id')
// // import Multiselect from "vue-multiselect";
export default {
  name: 'jenis_antrian',
  components: {
    // // Multiselect,
  },
  data() {
    return {
      data: {
        ms_poliklinik_id: '',
        idDokter: '',
        jadwal_dokter_id: '',
        antrian_id: '',
        tgl_antrian: '',
        is_master: 1,
        poli_layanan: '',
        initial: '',
        antrian_no: '',
        status_antrian: '',
        ms_loket_id: '',
        jenis_antrian_id: '',
        booking_id: '',
        kode_booking_bpjs: '',
        registrasi_id: '',
        layanan_ruang_id: ''
      },
      data2: {
        ms_poliklinik_id: '',
        ms_dokter_id: '',
        jadwal_dokter_id: ''
      },
      data3: {
        poli_layanan: ''
      },
      dokter_id: '',
      jadwal_id: '',
      poli_layanan: '',
      disabledDokter: true,
      disabledJadwal: true,
      disabledBatal: true,
      disabledSelesai: true,
      locked: false,
      sedang_manggil: false,
      sedang_proses: false,
      on_process: false,
      no_proses: '',
      loketnya: '',
      kode_poli: '',
      kode_booking: '',
      no_panggilan: '',
      kode_panggilan: '',
      booking_id: null,
      listPoli: [],
      listDokter: [],
      listDokter2: [],
      listJadwal: [],
      listJadwal2: [],
      listLayanan: [],
      fields: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          sortable: true,
          class: 'table-number text-center'
        },

        {
          key: 'no_antrian',
          label: 'No. Antrian',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },

        {
          key: 'nama_lengkap',
          label: 'Nama Pasien',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },

        {
          key: 'actions',
          label: 'Actions',
          class: 'table-option-2 text-center'
        }
      ],
      fieldsProses: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          sortable: true,
          class: 'table-number text-center'
        },

        {
          key: 'no_antrian',
          label: 'No. Antrian',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },

        {
          key: 'nama_lengkap',
          label: 'Nama Pasien',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
      ],
      fieldsSelesai: [
        {
          key: 'no',
          label: 'No',
          sortDirection: 'desc',
          sortable: true,
          class: 'table-number text-center'
        },

        {
          key: 'no_antrian',
          label: 'No. Antrian',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },

        {
          key: 'nama_lengkap',
          label: 'Nama Pasien',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
      ],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      itemsSelesai: [],
      totalRowsSelesai: 1,
      currentPageSelesai: 1,
      perPageSelesai: 5,
      itemsProses: [],
      totalRowsProses: 1,
      currentPageProses: 1,
      perPageProses: 5,
      tableBusy: false,
      dateToday: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      detail_antrian: [],
      detail_jadwal: [],
      detail_jadwal2: [],
      detail_layanan: [],
      disabledCekAntrian: true,
      status_antrian: {
        dibuat: 1,
        proses: 2,
        selesai: 9
      },
      poli_layanan: {
        loket: 1,
        poli: 2,
        layanan: 3,
        farmasi: 4,
        kasir: 5,
      },
      nama_pasien: '',
      no_rm: '',
      nomor_kartu: '',
      room_id: 'antrian_loket',
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
    // Set the initial number of items
    // this.$socket.emit('joinRoom', this.room_id)
    this.totalRows = this.items.length
    this.getDatas()
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    update(data) {
      this.detail_antrian = data
      this.data.antrian_id = data.antrian_list_id
      this.data.booking_id = data.booking_id
      this.data.ms_loket_id = data.ms_loket_id
      this.data.tgl_antriann = data.tgl_antrian

      this.nama_pasien = data.nama_lengkap

      console.log(data, 'ini datanyaaaaaaaaaaaaaaaaaaaa')
      // console.log(this.listPoli, 'ini list poli');
      this.kode_booking = data.kodebooking
      this.booking_id = data.booking_id
      this.data.antrian_id = data.antrian_list_id
      this.no_proses = data.antrian_no
      this.no_panggilan = `${data.antrian_no}`
      this.kode_panggilan = data.initial
      for (let i = 0; i < this.listPoli.length; i++) {
        let x = this.listPoli[i]
        if (x.id == data.ms_poliklinik_id) {
          this.kode_poli = x.kode_poliklinik
          // console.log(this.kode_poli, 'ini kode poli');
        }
      }
    },
    mulaiProses() {
      this.$socket.emit('panggilPoliLayanan', {
        id: this.data.antrian_id,
        status_antrian: this.status_antrian.proses,
        jadwal_dokter_id: this.data.jadwal_dokter_id,
        booking_id: this.data.booking_id,
        poli_layanan: this.poli_layanan.poli,
      }, this.room_id)
      this.sedang_proses = true
      this.on_process = true
      this.disabledBatal = false
      this.disabledSelesai = false
    },
    batalProses() {
      this.$socket.emit('panggilPoliLayanan', {
        id: this.data.antrian_id,
        status_antrian: this.status_antrian.dibuat,
        jadwal_dokter_id: this.data.jadwal_dokter_id,
        booking_id: this.data.booking_id,
        poli_layanan: this.poli_layanan.poli
      }, this.room_id)
      this.disabledBatal = true
      this.disabledSelesai = true
      this.sedang_proses = false
      this.on_process = false
    },
    selesaiAntrian() {
      //   console.log(this.data.antrian_id, "ini antrian");
      this.$socket.emit('panggilPoliLayanan', {
        id: this.data.antrian_id,
        status_antrian: this.status_antrian.selesai,
        layanan_ruang_id: this.data.layanan_ruang_id,
        jadwal_dokter_id: this.data.jadwal_dokter_id,
        booking_id: this.data.booking_id,
      }, this.room_id)
      this.no_proses = ''
      this.no_panggilan = ''
      this.kode_panggilan = ''
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true
      this.disabledSelesai = true
      this.data.antrian_id = ''
      this.$bvModal.hide('modal-selesaiAntrian')
    },
    simpanData() {
      if (this.data.ms_poliklinik_id && this.data.jadwal_dokter_id) {
        this.locked = true
        for (let i = 0; i < this.listPoli.length; i++) {
          let x = this.listPoli[i]
          if (x.id == this.data.ms_poliklinik_id) {
            this.loketnya = x.nama_poliklinik
          }
        }
        this.$_api
          .post('antrianList/list', {
            tgl_antrian: this.dateToday,
            status_antrian: this.status_antrian.dibuat,
            poli_layanan: this.poli_layanan.poli,
            ms_poliklinik_id: this.data.ms_poliklinik_id,
            jadwal_dokter_id: this.data.jadwal_dokter_id
          })
          .then((res) => {
            this.items = res.data
            for (let i = 0; i < this.items.length; i++) {
              let x = this.items[i]
              x.no = i + 1
              x.no_antrian = `${x.initial}${x.antrian_no}`
            }
            this.totalRows = this.items.length
            console.log(this.items, 'items dibuat simpan Data')
          })
          .catch((err) => {
            console.log(err)
          })
        this.$_api
          .post('antrianList/list', {
            tgl_antrian: this.dateToday,
            status_antrian: this.status_antrian.proses,
            poli_layanan: this.poli_layanan.poli,
            ms_poliklinik_id: this.data.ms_poliklinik_id,
            jadwal_dokter_id: this.data.jadwal_dokter_id
          })
          .then((res) => {
            this.itemsProses = res.data
            for (let i = 0; i < this.itemsProses.length; i++) {
              let x = this.itemsProses[i]
              x.no = i + 1
              x.no_antrian = `${x.initial}${x.antrian_no}`
              if (this.data.ms_poliklinik_id == x.ms_poliklinik_id) {
                console.log(x, 'ini x');
                this.detail_antrian = x
                this.data.antrian_id = x.antrian_list_id
                this.data.ms_loket_id = x.ms_loket_id
                this.no_proses = x.no_antrian
                this.no_panggilan = `${x.antrian_no}`
                this.kode_panggilan = x.initial
                this.booking_id = x.booking_id
                this.sedang_proses = true
                this.on_process = true
                this.disabledBatal = false
                this.disabledSelesai = false
              }
              for (let j = 0; j < this.listPoli.length; j++) {
                let o = this.listPoli[j]
                if (o.id == this.data.ms_poliklinik_id) {
                  this.kode_poli = o.kdAntrean
                }
              }
            }
            this.totalRowsProses = this.itemsProses.length
            console.log(this.itemsProses, 'items Proses')
            console.log(this.kode_panggilan, 'kode panggilan')
          })
          .catch((err) => {
            console.log(err)
          })
        this.$_api
          .post('antrianList/list', {
            tgl_antrian: this.dateToday,
            status_antrian: this.status_antrian.selesai,
            poli_layanan: this.poli_layanan.poli,
            ms_poliklinik_id: this.data.ms_poliklinik_id,
            jadwal_dokter_id: this.data.jadwal_dokter_id
          })
          .then((res) => {
            this.itemsSelesai = res.data
            for (let i = 0; i < this.itemsSelesai.length; i++) {
              let x = this.itemsSelesai[i]
              x.no = i + 1
              x.no_antrian = `${x.initial}${x.antrian_no}`
            }
            this.totalRowsSelesai = this.itemsSelesai.length
            console.log(this.itemsSelesai, 'items selesai')
          })
          .catch((err) => {
            console.log(err)
          })
      }

    },
    cekPoliLayanan(x) {
      console.log(x, 'ini x')
      if (x.kdAntrean == 'FM') {
        this.poli_layanan = 4
      } else if (x.kdAntrean == 'KS') {
        this.poli_layanan = 3
      } else if (x.kdAntrean == 'L') {
        this.poli_layanan = 5
      } else if (x.kdAntrean == 'K') {
        this.poli_layanan = 6
      } else if (x.kdAntrean == 'G') {
        this.poli_layanan = 7
      }
      // console.log(this.poli_layanan);
    },

    pindahkePoli() {
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true

      this.data.antrian_id = this.detail_antrian.antrian_list_id
      this.data.tgl_antrian = this.detail_antrian.tgl_antrian
      this.data.poli_layanan = this.poli_layanan.poli
      this.data.jadwal_dokter_id = this.detail_jadwal.jadwal_dokter_id
      this.data.status_antrian = this.status_antrian.dibuat
      this.data.ms_loket_id = this.data.ms_loket_id
      // this.data.initial = this.detail_jadwal.kode_poliklinik
      this.data.initial = this.detail_antrian.initial
      this.data.antrian_no = this.detail_antrian.antrian_no
      this.data.jenis_antrian_id = this.detail_antrian.jenis_antrian_id
      this.data.booking_id = this.detail_antrian.booking_id
      this.data.registrasi_id = this.detail_antrian.registrasi_id
      this.data.layanan_ruang_id = this.detail_antrian.layanan_ruang_id

      console.log('this.data', this.data)
      console.log('this.detail_antrian', this.detail_antrian)
      this.pindahAntrian(this.data)

      console.log(this.data, 'ini data pindah ke poli');

      this.$bvModal.hide('modal-pilihpoli')
    },
    pindahkeLayanan() {
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true

      console.log(this.detail_antrian, 'ini detail antrian');
      console.log(this.detail_layanan, 'ini detail layanan');

      this.data.antrian_id = this.detail_antrian.antrian_list_id
      this.data.tgl_antrian = this.detail_antrian.tgl_antrian
      this.data.poli_layanan = this.poli_layanan.layanan
      this.data.jadwal_dokter_id = this.data.jadwal_dokter_id
      this.data.status_antrian = this.status_antrian.dibuat
      this.data.ms_loket_id = this.data.ms_loket_id
      // this.data.initial = this.detail_jadwal.kode_poliklinik
      this.data.initial = this.detail_antrian.initial

      this.data.antrian_no = this.detail_antrian.antrian_no
      this.data.jenis_antrian_id = this.detail_antrian.jenis_antrian_id
      this.data.booking_id = this.detail_antrian.booking_id
      this.data.registrasi_id = this.detail_antrian.registrasi_id
      this.data.layanan_ruang_id = this.detail_layanan.layanan_ruang_id

      console.log(this.data, 'ini data pindah ke layanan');

      this.pindahAntrian(this.data)
      this.no_proses = ''
      this.$bvModal.hide('modal-pilihlayanan')
    },
    async pindahkeFarmasi() {
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true

      this.data.antrian_id = this.detail_antrian.antrian_list_id
      this.data.tgl_antrian = this.detail_antrian.tgl_antrian
      this.data.poli_layanan = this.poli_layanan.farmasi
      this.data.jadwal_dokter_id = this.data.jadwal_dokter_id
      this.data.status_antrian = this.status_antrian.dibuat
      this.data.ms_loket_id = this.data.ms_loket_id
      // this.data.initial = this.detail_jadwal.kode_poliklinik
      this.data.initial = this.detail_antrian.initial

      this.data.antrian_no = this.detail_antrian.antrian_no
      this.data.jenis_antrian_id = this.detail_antrian.jenis_antrian_id
      this.data.booking_id = this.detail_antrian.booking_id
      this.data.registrasi_id = this.detail_antrian.registrasi_id
      this.data.layanan_ruang_id = this.detail_layanan ? this.detail_layanan.layanan_ruang_id : ''
      this.data.kode_booking_bpjs = this.detail_antrian.kode_booking_bpjs

      await this.$_api.post('/bpjs/antrean_rs/updateWaktuAntrean', {
        kode_booking: this.detail_antrian.kode_booking_bpjs,
        task_id: 5
      });
      await this.$_api.post('/bpjs/antrean_rs/updateWaktuAntrean', {
        kode_booking: this.detail_antrian.kode_booking_bpjs,
        task_id: 6
      });
      this.pindahAntrian(this.data)
      this.no_proses = ''
      this.$bvModal.hide('modal-pilihFarmasi')
    },
    pindahkeKasir() {
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true

      this.data.antrian_id = this.detail_antrian.antrian_list_id
      this.data.tgl_antrian = this.detail_antrian.tgl_antrian
      this.data.poli_layanan = this.poli_layanan.kasir
      this.data.jadwal_dokter_id = this.data.jadwal_dokter_id
      this.data.status_antrian = this.status_antrian.dibuat
      this.data.ms_loket_id = this.data.ms_loket_id
      // this.data.initial = this.detail_jadwal.kode_poliklinik
      this.data.initial = this.detail_antrian.initial

      this.data.antrian_no = this.detail_antrian.antrian_no
      this.data.jenis_antrian_id = this.detail_antrian.jenis_antrian_id
      this.data.booking_id = this.detail_antrian.booking_id
      this.data.registrasi_id = this.detail_antrian.registrasi_id
      this.data.layanan_ruang_id = this.detail_layanan.layanan_ruang_id
      this.data.kode_booking_bpjs = this.detail_antrian.kode_booking_bpjs

      this.pindahAntrian(this.data)
      this.no_proses = ''
      this.$bvModal.hide('modal-pilihKasir')
    },
    pindahAntrian(data) {
      this.$socket.emit('pindahAntrian', {
        antrian_id: data.antrian_id,
        tgl_antrian: data.tgl_antrian,
        is_master: data.is_master,
        poli_layanan: data.poli_layanan,
        initial: data.initial,
        antrian_no: data.antrian_no,
        status_antrian: data.status_antrian,
        jadwal_dokter_id: data.jadwal_dokter_id,
        ms_loket_id: data.ms_loket_id,
        jenis_antrian_id: data.jenis_antrian_id,
        booking_id: data.booking_id,
        kode_booking_bpjs: data.kode_booking_bpjs,
        registrasi_id: data.registrasi_id,
        layanan_ruang_id: data.layanan_ruang_id
      }, this.room_id)
    },
    hapusData() {
      this.locked = false
      this.items = []
      this.itemsSelesai = []
      this.data.ms_poliklinik_id = ''
      this.data.ms_dokter_id = ''
      this.data.jadwal_dokter_id = ''
      this.data.ms_poliklinik_id = ''
      this.loketnya = ''
      this.no_proses = ''
      this.sedang_proses = false
    },
    async getDatas() {
      let poli = await this.$_api.post('msPoliklinik/list')
      for (let i = 0; i < poli.data.length; i++) {
        let x = poli.data[i]
        if (x.kuota == '999') {
          this.listLayanan.push(x)
        } else {
          this.listPoli.push(x)
        }
      }
    },
    getDokter() {
      this.data.ms_dokter_id = ''
      this.data.jadwal_dokter_id = ''
      this.data.ms_poliklinik_id = this.data.ms_poliklinik_id
      this.$_api.post('jadwalDokter/listJadwalDokterByMsPoliId', {
        tanggal: this.dateToday,
        ms_poliklinik_id: this.data.ms_poliklinik_id
      })
        .then((res) => {
          console.log(res, 'ini ress getDokter');
          if (res.data.length == 0 && res.message == 'sukses') {
            this.showing = true
            this.variant = 'danger'
            this.msg = 'Tidak ada jadwal dokter hari ini di poli ini.'
            setTimeout(() => {
              this.showing = false
            }, 2500)
          } else if (res.data.length != 0 && res.message == 'sukses') {
            this.listDokter = res.data
            this.disabledDokter = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDokter2(x) {
      this.data2.ms_dokter_id = ''
      this.data2.jadwal_dokter_id = ''
      this.data2.ms_poliklinik_id = x
      this.$_api.post('jadwalDokter/listJadwalDokterByMsPoliId', {
        tanggal: this.dateToday,
        ms_poliklinik_id: this.data2.ms_poliklinik_id
      })
        .then((res) => {
          if (res.data.length == 0 && res.message == 'sukses') {
            this.showing = true
            this.variant = 'danger'
            this.msg = 'Tidak ada jadwal dokter hari ini di poli ini.'
            setTimeout(() => {
              this.showing = false
            }, 2500)
          } else if (res.data.length != 0 && res.message == 'sukses') {
            this.listDokter2 = res.data
            this.disabledDokter = false
          }
          console.log(res, 'ini ress')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getJadwal() {
      this.data.jadwal_dokter_id = ''
      this.$_api.post('jadwalDokter/listJadwalDokterByMsPoliId', {
        tanggal: this.dateToday,
        ms_poliklinik_id: this.data.ms_poliklinik_id,
        dokter_id: this.data.ms_dokter_id
      })
        .then((res) => {
          console.log(res, 'ini ress getJadwal')
          if (res.data.length != 0 && res.message == 'sukses') {
            this.listJadwal = res.data
            this.disabledJadwal = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getJadwal2(x) {
      this.data2.jadwal_dokter_id = ''
      this.$_api.post('jadwalDokter/listJadwalDokterByMsPoliId', {
        tanggal: this.dateToday,
        ms_poliklinik_id: this.data2.ms_poliklinik_id,
        dokter_id: this.data2.ms_dokter_id
      })
        .then((res) => {
          console.log(res, 'ini ress getJadwal2')
          if (res.data.length != 0 && res.message == 'sukses') {
            this.listJadwal2 = res.data
            this.disabledJadwal = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    selectJadwal(e) {
      this.$_api.post('jadwalDokter/detailsById', {
        id: e
      })
        .then((res) => {
          console.log(res, 'ini detail jadwal');
          this.detail_jadwal = res.data[0]
          this.room_id = res.data[0].ms_poliklinik_id
          this.$socket.emit('joinRoom', this.room_id)
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(e, 'ini selected jadwal');
    },
    selectJadwal2(e) {
      this.$_api.post('jadwalDokter/detailsById', {
        id: e
      })
        .then((res) => {
          console.log(res, 'ini detail jadwal2');
          this.detail_jadwal = res.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(e, 'ini selected jadwal2');
    },
    selectLayanan(e) {
      this.$_api.post('layananRuang/detailsById', {
        id: e
      })
        .then((res) => {
          console.log(res, 'ini detail layanan');
          this.detail_layanan = res.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(e, 'ini selected layanan');
    },
    pilihPoli() {
      this.$bvModal.hide('modal-selesaiAntrian')
      this.$bvModal.show('modal-pilihpoli')
    },
    pilihLayanan() {
      this.$bvModal.hide('modal-selesaiAntrian')
      this.$bvModal.show('modal-pilihlayanan')
    },
    pilihFarmasi() {
      this.$bvModal.hide('modal-selesaiAntrian')
      this.$bvModal.show('modal-pilihFarmasi')
    },
    pilihKasir() {
      this.$bvModal.hide('modal-selesaiAntrian')
      this.$bvModal.show('modal-pilihKasir')
    },
    kodenya() {
      let kode = new Audio(
        require(`../../../assets/sound/sound/${this.kode_panggilan[0].toLowerCase()}.wav`)
      )

      if (this.kode_panggilan.length == 1) {
        kode.play()
      } else if (this.kode_panggilan.length == 2) {
        let kode2 = new Audio(
          require(`../../../assets/sound/sound/${this.kode_panggilan[1].toLowerCase()}.wav`)
        )
        kode.play()
        setTimeout(() => {
          kode2.play()
        }, 700)
      } else if (this.kode_panggilan.length == 3) {
        let kode2 = new Audio(
          require(`../../../assets/sound/sound/${this.kode_panggilan[1].toLowerCase()}.wav`)
        )
        let kode3 = new Audio(
          require(`../../../assets/sound/sound/${this.kode_panggilan[2].toLowerCase()}.wav`)
        )
        kode.play()
        setTimeout(() => {
          kode2.play()
          setTimeout(() => {
            kode3.play()
          }, 700)
        }, 700)
      }
    },
    panggil() {
      console.log('panggil=============================================', this.detail_antrian)
      this.$socket.emit('panggilPoliLayanan', {
        ...this.detail_antrian,
        id: this.data.antrian_id,
        tgl_antriann: this.data.tgl_antrian,
      }, this.room_id)

      // this.sedang_manggil = true
      // this.sedang_proses = true
      // let nomor_antrian = new Audio(
      //   require(`../../../assets/sound/sound/nomor_antrian.wav`)
      // )
      // // let kode = new Audio(
      // //   require(`../../../assets/sound/sound/${this.kode_panggilan}.wav`)
      // // );
      // console.log('this.no_panggilan', this.no_panggilan.length)
      // if (this.no_panggilan.length == 1) {
      //   console.log(`../../../assets/sound/sound/${this.no_panggilan.toLowerCase()}.wav`)
      //   let audio = new Audio(
      //     require(`../../../assets/sound/sound/${this.no_panggilan.toLowerCase()}.wav`)
      //   )
      //   nomor_antrian.play()
      //   setTimeout(() => {
      //     this.kodenya()
      //     setTimeout(() => {
      //       audio.play()
      //       this.lokete()
      //     }, 2000)
      //   }, 2500)
      // } else if (this.no_panggilan.length == 2) {
      //   if (this.no_panggilan == 10 || this.no_panggilan == 11) {
      //     let audio = new Audio(
      //       require(`../../../assets/sound/sound/${this.no_panggilan}.wav`)
      //     )
      //     nomor_antrian.play()
      //     setTimeout(() => {
      //       this.kodenya()
      //       setTimeout(() => {
      //         audio.play()
      //         this.lokete()
      //       }, 2000)
      //     }, 2500)
      //   } else if (this.no_panggilan[0] == 1) {
      //     let kesatu = new Audio(
      //       require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //     )
      //     let kedua = new Audio(
      //       require(`../../../assets/sound/sound/belas.wav`)
      //     )
      //     nomor_antrian.play()
      //     setTimeout(() => {
      //       this.kodenya()
      //       setTimeout(() => {
      //         kesatu.play()
      //         setTimeout(() => {
      //           kedua.play()
      //           this.lokete()
      //         }, 2000)
      //       }, 2000)
      //     }, 2500)
      //   } else if (this.no_panggilan[0] != 1) {
      //     if (this.no_panggilan[1] == 0) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             this.lokete()
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               this.lokete()
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     }
      //   }
      // } else if (this.no_panggilan.length == 3) {
      //   if (this.no_panggilan == 100) {
      //     let audio = new Audio(
      //       require(`../../../assets/sound/sound/seratus.wav`)
      //     )
      //     nomor_antrian.play()
      //     setTimeout(() => {
      //       this.kodenya()
      //       setTimeout(() => {
      //         audio.play()
      //         this.lokete()
      //       }, 2000)
      //     }, 2500)
      //   } else if (this.no_panggilan[0] == 1) {
      //     if (
      //       (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 0) ||
      //       (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 1)
      //     ) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/seratus.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}${this.no_panggilan[2]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             this.lokete()
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else if (this.no_panggilan[2] == 0) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/seratus.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               this.lokete()
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else if (this.no_panggilan[1] == 0) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/seratus.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             this.lokete()
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/seratus.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       )
      //       let keempat = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               setTimeout(() => {
      //                 keempat.play()
      //                 this.lokete()
      //               }, 2000)
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     }
      //   } else if (this.no_panggilan[0] != 1) {
      //     if (
      //       (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 0) ||
      //       (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 1)
      //     ) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/ratus.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}${this.no_panggilan[2]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               this.lokete()
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else if (this.no_panggilan[1] == 0 && this.no_panggilan[2] == 0) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/ratus.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             this.lokete()
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else if (this.no_panggilan[1] == 0) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/ratus.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               this.lokete()
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else if (this.no_panggilan[2] == 0) {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/ratus.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //       )
      //       let keempat = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               setTimeout(() => {
      //                 keempat.play()
      //                 this.lokete()
      //               }, 2000)
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     } else {
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
      //       )
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/ratus.wav`)
      //       )
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //       )
      //       let keempat = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       )
      //       let kelima = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
      //       )
      //       nomor_antrian.play()
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           kesatu.play()
      //           setTimeout(() => {
      //             kedua.play()
      //             setTimeout(() => {
      //               ketiga.play()
      //               setTimeout(() => {
      //                 keempat.play()
      //                 setTimeout(() => {
      //                   kelima.play()
      //                   this.lokete()
      //                 }, 2000)
      //               }, 2000)
      //             }, 2000)
      //           }, 2000)
      //         }, 2000)
      //       }, 2500)
      //     }
      //   }
      // }
      // this.sedang_manggil = false
    },
    lokete() {
      let loket = new Audio(require(`../../../assets/sound/sound/di_poli.wav`))
      setTimeout(() => {
        loket.play()
        this.nama_loket()
      }, 2000)
    },
    nama_loket() {
      let i = this.kode_poli

      let nama_loket = new Audio(
        require(`../../../assets/sound/sound/${i}.wav`)
      )

      setTimeout(() => {
        nama_loket.play()
        this.sedang_manggil = false
        if (this.on_process == false) {
          this.sedang_proses = false
        }
      }, 1500)
    },
    triggerAlert(event) {
      this.showing = event.showing
      this.variant = event.variant
      this.msg = event.msg
      setTimeout(() => {
        this.showing = false
      }, 4000)
    }
  },
  created() {
    this.$socket.off('refresh_register_apm')
    this.$socket.on('refresh_register_apm', (data) => {
      console.log(data, 'ini refresh_register_apm')
      if (this.locked == true) {
        this.simpanData()
      }
    }, this.room_id)

    this.$socket.off('refresh_admin')
    this.$socket.on('refresh_admin', (data) => {
      console.log(data, 'refresh admin')
      if (this.locked == true) {
        this.simpanData()
      }
    }, this.room_id)
    this.$socket.off('refresh_layar')
    this.$socket.on('refresh_layar', (data) => {
      console.log(data, 'refresh layarrrrrrrrrrrr')
      if (this.locked == true) {
        this.simpanData()
      }
    }, this.room_id)
    this.$socket.off('refresh_pindah_antrian_rajal_loket')
    this.$socket.on('refresh_pindah_antrian_rajal_loket', (data) => {
      console.log(data, 'refresh refresh_pindah_antrian_rajal_loket')
      if (this.locked == true) {
        this.simpanData()
      }
    }, this.room_id)
    this.$socket.off('refresh_pindah_antrian')
    this.$socket.on('refresh_pindah_antrian', (data) => {
      console.log(data, 'refresh refresh_pindah_antrian')
      if (this.locked == true) {
        this.simpanData()
      }
    }, this.room_id)
  },
}
</script>
<style scoped>
.box-panggilan {
  width: 275px;
  height: 440px;
  left: 905px;
  top: 37px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
}
</style>
