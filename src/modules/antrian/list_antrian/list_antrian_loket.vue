<template>
  <b-container fluid>
    <div class="row" v-if="false">
      <div class="col-6">
        <s-input v-model="panggil_nomor" :key="'awal_signa'" :id="'awal_signa'" :item="{
          label: 'Panggil Nomor',
          id: 'panggil_nomor',
          data: 'panggil_nomor',
          type: 'text',
          validation: ['required'],
          value: panggil_nomor,
          param: {},
        }" :valuee="panggil_nomor" />
      </div>
      <div class="col-6">
        <button class="btn btn-primary" @click="panggil_suara()">Panggil</button>
      </div>
    </div>
    <b-row>
      <b-col cols='12' md='12' lg='12'>
        <h3 class='mb-0'>
          <strong>List Antrian Loket</strong>
        </h3>
        <b-card header-tag='header' header-bg-variant='dark' style='margin-top: 20px'>
          <b-row style='display: flex'>
            <b-col cols='12' sm='12' md='12' lg='12'>
              <b-row>
                <b-col cols='9' sm='9' md='9' lg='9'>
                  <b-card>
                    <b-row>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <h5><strong>Proses antrian</strong></h5>
                        <hr />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols='12' sm='12' md='6' lg='4'>
                        <b-form>
                          <b-form-group label-rows-md='2'>
                            <template v-slot:label>
                              Loket
                            </template>
                            <lookup-input :disabled="locked" v-model="ms_loket_id" :multiple="false" endpoint="msLoket"
                              title="Loket" :pointer="{
                                label: 'nama_loket',
                                code: 'id',
                                display: ['nama_loket'],
                              }" />
                          </b-form-group>
                        </b-form>
                      </b-col>
                      <!-- <b-col cols='12' sm='12' md='6' lg='4'>
                        <b-form>
                          <b-form-group label-rows-md='2'>
                            <template v-slot:label>
                              Booking
                            </template>
                            <lookup-input :disabled="locked" v-model="booking_id" :multiple="false" endpoint="booking"
                              title="Loket" :pointer="{
                                label: 'nama_booking',
                                code: 'booking_id',
                                display: ['nama_booking'],
                              }" :validation="['required']" />
                          </b-form-group>
                        </b-form>
                      </b-col> -->
                    </b-row>
                    <b-row>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <b-button v-if='locked' style='width: 100%' variant='success' @click='hapusData()'>
                          <i class="ri-git-repository-private-line"></i> Buka loket baru
                        </b-button>
                        <b-button v-else :disabled="!ms_loket_id" style='width: 100%' variant='success'
                          @click='simpanData()'>
                          Gunakan loket
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>

                <b-col cols='3' sm='3' md='3' lg='3'>
                  <b-card style='
                      flex-flow: column wrap;
                      height: max-content;
                      position: absolute;
                      width: 92%;
                      margin-right: 50px;
                    '>
                    <b-row>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <h5><strong>Proses</strong></h5>
                        <hr />
                        <!-- <div style='display: flex'>
                          <div>

                          </div>
                          <div>

                          </div>
                        </div> -->
                      </b-col>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <b-row>
                          <b-col cols='6' sm='6' md='6' lg='6'>
                            <h5>
                              <strong>Loket {{ loketnya }}</strong>
                            </h5>
                          </b-col>
                          <b-col cols='2' md='2' lg='2' sm='2' offset-lg='3' offset-md='3' offset-sm='3'>
                            <b-button :disabled='sedang_manggil' style='justify-content;: flex-end' variant='success'
                              @click='panggil()'><i class="ri-notification-4-line"></i>
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <b-row>
                          <b-col style='
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              height: 300px;
                            '>
                            <p style='font-size: 90px'>
                              <strong>{{ no_proses }}</strong>
                            </p>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col cols='12' sm='12' md='12' lg='12'>
                            <b-row>
                              <b-col cols='12' sm='12' md='12' lg='12'>
                                <b-button style='width: 100%' variant='primary' @click='mulaiProses()'
                                  :disabled="!no_proses">
                                  <i class="ri-check-line"></i> Proses Antrian
                                </b-button>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col cols='6' sm='6' md='6' lg='6' class='mt-2'>
                                <b-button style='width: 100%' variant='danger' @click='batalProses()'
                                  :disabled='disabledBatal'>
                                  <i class="ri-check-line"></i> Batal
                                </b-button>
                              </b-col>
                              <b-col cols='6' sm='6' md='6' lg='6' class='mt-2'>
                                <b-button style='width: 100%' variant='success' v-b-modal.modal-selesaiAntrian
                                  :disabled='disabledSelesai'>
                                  <i class="ri-check-line"></i> Selesai
                                </b-button>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>

                <b-col cols='9' sm='9' md='9' lg='9'>
                  <b-card>
                    <b-row>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <h5><strong>Antrian</strong></h5>
                        <hr />
                        <!-- <b-col cols='6' sm='6' md='6' lg='6'>
                          <b-form>
                            <b-form-group label-cols-md='2'>
                              <template v-slot:label>
                                Poli
                              </template>

                              <lookup-input :disabled="!locked" v-model="idPolinya" :multiple="false"
                                endpoint="msPoliklinik" title="Loket" :pointer="{
                                  label: 'nama_poliklinik',
                                  code: 'id',
                                  display: ['nama_poliklinik'],
                                }" />
                            </b-form-group>
                          </b-form>
                        </b-col> -->
                      </b-col>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <b-table :items='items' :fields='fields' :current-page='currentPage' :per-page='perPage'
                          show-empty hover class='bg-light'>
                          <template #cell(actions)='item'>
                            <b-button variant="success" class="" :disabled="sedang_proses" @click="update(item.item)">
                              Pilih
                            </b-button>
                            <!-- <b-button
                              variant='danger'
                              
                              v-b-tooltip.hover=''Hapus Data''
                              v-b-modal.modal-delete
                              @click='dataHapus = item.item'
                              ><CIcon name='cil-trash' /> {{ item.actions }}</b-button
                            > -->
                          </template>
                        </b-table>
                        <b-row>
                          <b-col md='8' offset-md='4'>
                            <b-pagination v-model='currentPage' :total-rows='totalRows' :per-page='perPage' align='fill'
                              size='sm'></b-pagination>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <h5><strong>Sedang Proses</strong></h5>
                        <hr />
                        <b-table :items='itemsProses' :fields='fieldsProses' :current-page='currentPageProses'
                          :per-page='perPageProses' responsive show-empty hover class='bg-light'>
                          <template #cell(actions)='item'>
                            <b-button variant='success' @click='data = item.item'><i class="ri-notification-4-line"></i>
                              {{ item.actions }}</b-button>
                          </template>
                        </b-table>
                        <b-row>
                          <b-col md='8' offset-md='4'>
                            <b-pagination v-model='currentPageProses' :total-rows='totalRowsProses'
                              :per-page='perPageProses' align='fill' size='sm'></b-pagination>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols='12' sm='12' md='12' lg='12'>
                        <h5><strong>Selesai</strong></h5>
                        <hr />
                        <b-table :items='itemsSelesai' :fields='fieldsSelesai' :current-page='currentPageSelesai'
                          :per-page='perPageSelesai' responsive show-empty hover class='bg-light'>
                          <template #cell(actions)='item'>
                            <b-button variant='success' @click='data = item.item'><i class="ri-notification-4-line"></i>
                              {{ item.actions }}</b-button>

                          </template>
                        </b-table>
                        <b-row>
                          <b-col md='4' offset-md='8'>
                            <b-pagination v-model='currentPageSelesai' :total-rows='totalRowsSelesai'
                              :per-page='perPageSelesai' align='fill' size='sm'></b-pagination>
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
    <b-modal id='modal-selesaiAntrian' ref='modal' title='Selesai Antrian' size='lg' centered hide-footer hide-header>
      <h2 class='text-center' style='margin-bottom:10px;'>Silahkan Silahkan pilih proses selanjutnya</h2>

      <b-row>
        <b-col cols='12' lg='12' md='12' class='mt-2'>
          <b-button variant='outline-primary' size='lg' style='width:100%' @click='pilihPoli()'>Lanjutkan Ke
            Poli</b-button>
        </b-col>
        <!-- DARI BACKEND, TIDAK BISA MASUK KE LAYANAN LANGSUNG -->
        <!-- <b-col cols='12' lg='12' md='12' class='mt-2'>
          <b-button variant='outline-primary' size='lg' style='width:100%' @click='pilihLayanan()'>Lanjutkan Ke
            Layanan</b-button>
        </b-col> -->
        <b-col cols='12' lg='12' md='12' class='mt-2'>
          <b-button variant='outline-primary' size='lg' style='width:100%' @click='selesaiAntrian()'>Selesaikan
            Antrian</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <!-- MODAL LANJUTKAN POLI -->
    <b-modal id='modal-pilihpoli' ref='modal' title='Selesai Antrian' size='lg' centered hide-footer hide-header>
      <b-form>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nomor Rekam Medis <span class='text-danger'>*</span>
          </template>
          <b-form-input v-model='no_rm' type='text' @change='getDataPasien(no_rm)'></b-form-input>
        </b-form-group>
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
            Nama Poli <span class='text-danger'>*</span>
          </template>
          <lookup-input v-model="data.idPoli" :multiple="false" endpoint="msPoliklinik" title="Poliklinik" :pointer="{
            label: 'nama_poliklinik',
            code: 'id',
            display: ['nama_poliklinik'],
          }" @input='getDokter()' />
        </b-form-group>

        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nama Dokter <span class='text-danger'>*</span>
          </template>
          <lookup-input v-model="data.idDokter" :multiple="false" title="Dokter" :pointer="{
            label: 'nama_dokter',
            code: 'ms_dokter_id',
            display: ['nama_dokter'],
          }" :list="listDokter" endpoint="jadwalDokter/listJadwalDokterByMsPoliIdBypassUri" :param="{
  ms_poliklinik_id: data.idPoli,
  tanggal: tanggal,
}" @input='getJadwal(data.idDokter)' :disabled="listDokter.length == 0" />
        </b-form-group>

        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Pilih Jadwal <span class='text-danger'>*</span>
          </template>
          <lookup-input v-model="data.jadwal_dokter_id" :multiple="false" title="Dokter" :pointer="{
            label: 'waktu_mulai',
            code: 'jadwal_dokter_id',
            display: ['waktu_mulai', 'waktu_selesai', 'nama_dokter', 'jk_dokter'],
          }" :list="listJadwal" endpoint="jadwalDokter/listJadwalDokterByMsDokterIdBypassUri" :param="{
  ms_dokter_id: data.idDokter,
  tanggal: tanggal,
}" @input="selectJadwal" :disabled="listJadwal.length == 0" />
        </b-form-group>

        <b-button :disabled='disabledPoli' @click='pindahkePoli()' style='width:100%' variant='outline-success'>
          Simpan
        </b-button>
      </b-form>


    </b-modal>

    <!-- MODAL LANJUTKAN LAYANAN -->
    <b-modal id='modal-pilihlayanan' ref='modal' title='Selesai Antrian' size='lg' centered hide-footer hide-header>
      <b-form>
        <b-form-group label-cols-md='3'>
          <template v-slot:label>
            Nomor Rekam Medis <span class='text-danger'>*</span>
          </template>
          <b-form-input v-model='no_rm' type='text' @change='getDataPasien(no_rm)'></b-form-input>
        </b-form-group>
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

        <b-button @click='pindahkeLayanan()' style='width:100%' variant='outline-success'>
          Simpan
        </b-button>
      </b-form>
    </b-modal>

  </b-container>
</template>

<script>
import moment from 'moment'
moment.locale('id')
// import this.$_api from 'this.$_api';
// import { 'http://serova.id:8020/' } from '@/'http://serova.id:8020/'';
// import moment from 'moment';
// import Multiselect from 'vue-multiselect';
// moment.locale('ID');
export default {
  name: 'jenis_antrian',
  components: {
    // // Multiselect,
  },
  data() {
    return {
      panggil_nomor: 'A1',
      data: {
        idPoli: '',
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
      dataHapus: '',
      room_id: 'antrian_loket',
      poli_id: '',
      idPolinya: '',
      booking_id: '',
      nama_pasien: '',
      disabledDokter: true,
      disabledJadwal: true,
      disabledBatal: true,
      disabledSelesai: true,
      keDisabled: true,
      locked: false,
      sedang_manggil: false,
      sedang_proses: false,
      on_process: false,
      no_proses: '',
      angka_antrean: '',
      loketnya: '',
      no_panggilan: '',
      kode_panggilan: '',
      jenis_antrian_id: null,
      listPoli: [],
      listDokter: [],
      listJadwal: [],
      listLayanan: [],
      antrian_id: '',
      jenis_antrian: [],
      ms_loket_id: null,
      loket: [],
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
          key: 'nama_loket',
          label: 'Loket',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
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
          key: 'nama_loket',
          label: 'Loket',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
      ],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      itemsSelesai: [],
      totalRowsSelesai: 1,
      currentPageSelesai: 1,
      tampilui: false,
      perPageSelesai: 5,
      itemsProses: [],
      totalRowsProses: 1,
      currentPageProses: 1,
      perPageProses: 5,
      tableBusy: false,
      jenis_pasien: '',
      optionsJenisPasien: [
        { value: 'JKN', text: 'JKN' },
        { value: 'NON JKN', text: 'NON JKN' }
      ],
      nomor_kartu: '',
      pasien_baru: '',
      optionsPasienBaru: [
        { value: '1', text: 'Ya' },
        { value: '0', text: 'Tidak' }
      ],
      no_rm: '',
      nomor_refrensi: '',
      keterangan: '',
      createdLoket: false,
      tanggal: moment().format('YYYY-MM-DD HH:mm:ss'),
      detail_antrian: [],
      detail_jadwal: [],
      detail_layanan: [],
      disabledCekAntrian: true,
      status_antrian: {
        batal: 0,
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
    },
    disabledPoli() {
      if (this.data.idDokter && this.data.jadwal_dokter_id && this.data.idPoli && this.no_rm) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.getDatas()
    this.$socket.emit('joinRoom', this.room_id)
  },
  created() {
    this.$socket.off('refresh_admin_loket')
    this.$socket.on('refresh_admin_loket', (data) => {
      console.log(data, 'refresh adminnnnnnnnnnnnn')
      if (this.idPolinya) {
        this.getListAntrianLoket(this.idPolinya)
        this.getListAntrianProses()
        this.getListAntrianSelesai()
      }
      else {
        this.simpanData()
      }
    }, this.room_id)
    this.$socket.off('refresh_layar')
    this.$socket.on('refresh_layar', (data) => {
      console.log(data, 'refresh layarrrrrrrrrrrr')
      if (this.idPolinya) {
        this.getListAntrianLoket(this.idPolinya)
        this.getListAntrianProses()
        this.getListAntrianSelesai()
      }
      else {
        this.simpanData()
      }
    }, this.room_id)
    this.$socket.off('refresh_apm_loket')
    this.$socket.on('refresh_apm_loket', (data) => {
      console.log(data, 'ini dataa')
      if (this.locked === true) {
        if (this.idPolinya) {
          this.getListAntrianLoket(this.idPolinya)
          this.getListAntrianProses()
          this.getListAntrianSelesai()
        } else {
          this.simpanData()
        }
      }
    }, this.room_id)
    this.$socket.off('refresh_pindah_antrian')
    this.$socket.on('refresh_pindah_antrian', (data) => {
      console.log(data, 'ini socket refresh_pindah_antrian')
      if (this.locked === true) {
        if (this.idPolinya) {
          this.getListAntrianLoket(this.idPolinya)
          this.getListAntrianProses()
          this.getListAntrianSelesai()
        } else {
          this.simpanData()
        }
      }
    }, this.room_id)
  },
  methods: {
    panggil_suara(nomor, ke, tujuan) {
      // ke = 'loket'
      // tujuan = '1'

      let input = nomor
      let output = ''

      const match = input.match(/([A-Za-z]+)([0-9]+)/);
      if (match) {
        const letterPart = match[1];
        const numberPart = parseInt(match[2]);

        output = letterPart + ' ' + this.convertToWords(numberPart);

        if (ke && tujuan) output = output + ` ${ke} ${tujuan}`
      } else {
        output = 'Format input tidak valid';
        this.$_alert.error({}, output)
        return
      }

      let waktu = 0
      for (const file of output.split(' ')) {
        let filepath = require(`../../../assets/sound/sound/${file}.wav`)
        let audio = new Audio(filepath);

        setTimeout(() => {
          audio.play();
        }, waktu)
        waktu = waktu + 1200
      }

      setTimeout(() => {
        this.sedang_manggil = false
        this.sedang_proses = false
      }, (waktu + 500))
      console.log(`END WAKTU: ${waktu}`)
    },
    convertToWords: function (number) {
      const words = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const teens = ['10', '11', '2 belas', '3 belas', '4 belas', '5 belas', '6 belas', '7 belas', '8 belas', '9 belas'];
      const tens = ['', '10', '2 puluh', '3 puluh', '4 puluh', '5 puluh', '6 puluh', '7 puluh', '8 puluh', '9 puluh'];

      let result = '';

      if (number === 0) {
        return 'nol';
      }

      if (number < 10) {
        result = words[number];
      } else if (number < 20) {
        result = teens[number - 10];
      } else if (number < 100) {
        const tensDigit = Math.floor(number / 10);
        const onesDigit = number % 10;

        result = tens[tensDigit];
        if (onesDigit !== 0) {
          result += ' ' + words[onesDigit];
        }
      } else if (number < 1000) {
        const hundredsDigit = Math.floor(number / 100);
        const remainder = number % 100;

        result = (words[hundredsDigit] == 1 ? 'se' : words[hundredsDigit] + ' ') + 'ratus';
        if (remainder !== 0) {
          result += ' ' + this.convertToWords(remainder);
        }
      } else {
        result = 'angka terlalu besar untuk diubah';
      }

      return result;
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    update(data) {
      let vm = this
      this.detail_antrian = data
      console.log(data, 'ini datanyaaaaaaaaaaaaaaaaaaaa');
      // console.log({
      //   ms_loket_id: vm.ms_loket_id,
      //   status_antrian: this.status_antrian.dibuat,
      //   id: data.antrian_list_id,
      //   antrian_no: data.antrian_no,
      //   initial: data.initial,
      //   no_antrian: data.no_antrian,
      // })
      this.$socket.emit('panggilLoket', {
        id: data.antrian_list_id,
        ms_loket_id: vm.ms_loket_id,
        poli_layanan: this.poli_layanan.loket,
        // booking_id: data.booking_id
      }, this.room_id)
      vm.antrian_id = data.antrian_list_id
      vm.no_proses = data.no_antrian
      vm.no_panggilan = `${data.antrian_no}`
      vm.kode_panggilan = data.initial
      // vm.panggil()
      // setTimeout(() => {
      //   vm.panggil();
      // }, 2000);
    },
    getAntrianDetail() {
    },
    mulaiProses() {
      let vm = this
      vm.$socket.emit('panggilLoket', {
        id: vm.antrian_id,
        status_antrian: this.status_antrian.proses,
        ms_loket_id: vm.ms_loket_id,
      }, this.room_id)
      vm.sedang_proses = true
      vm.on_process = true
      vm.disabledBatal = false
      vm.disabledSelesai = false
    },
    batalProses() {
      let vm = this
      vm.$socket.emit('panggilLoket', {
        id: vm.antrian_id,
        status_antrian: this.status_antrian.batal,
        ms_loket_id: vm.ms_loket_id,
      }, this.room_id)
      vm.disabledBatal = true
      vm.disabledSelesai = true
      vm.sedang_proses = false
      vm.on_process = false
      vm.no_proses = ''
    },
    selesaiAntrian() {
      let vm = this
      //   console.log(vm.antrian_id, 'ini antrian');
      vm.sedang_proses = false
      vm.on_process = false
      vm.disabledBatal = true
      vm.disabledSelesai = true
      vm.$socket.emit('panggilLoket', {
        id: vm.antrian_id,
        status_antrian: this.status_antrian.selesai,
        ms_loket_id: vm.ms_loket_id,
      }, this.room_id)
      vm.no_proses = ''
      vm.no_panggilan = ''
      vm.kode_panggilan = ''
      vm.antrian_id = ''
      vm.$bvModal.hide('modal-selesaiAntrian')
      // this.$_api
      //   .post('antrian_loket/update', {
      //     id: vm.antrian_id,
      //     status_antrian: this.status_antrian.proses,
      //     ms_loket_id: vm.ms_loket_id,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     vm.no_proses = '';
      //     vm.no_panggilan = '';
      //     vm.kode_panggilan = '';
      //     vm.sedang_proses = false;
      //     vm.antrian_id = '';
      //     vm.simpanData();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    async getDataPasien(x) {
      this.$_api.post('member/cekPasien', {
        no: x
      })
        .then((res) => {
          let result = res.data
          if (result.length > 0) {
            console.log(res, 'ini data pasien');
            this.nama_pasien = result[0].nama_lengkap
            this.nomor_kartu = result[0].bpjs_id
          }
        })
        .catch((err) => {
          console.log(err)
        })
      // vm.nama_pasien = pasien.data[0].namaPasien
      // vm.nomor_kartu = pasien.data[0].noBpjs
    },
    selectJadwal(e) {
      this.$_api.post('jadwalDokter/detailsById', {
        id: e
      })
        .then((res) => {
          console.log(res, 'ini detail jadwal');
          this.detail_jadwal = res.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(e, 'ini selected jadwal');
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
    async pindahkePoli() {
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true
      console.log('this.detail_antrian', this.detail_antrian);
      await this.$_api.post('/bpjs/antrean_rs/updateWaktuAntrean', {
        kode_booking: this.detail_antrian.kode_booking_bpjs,
        task_id: 2
      });
      await this.$_api.post('/bpjs/antrean_rs/updateWaktuAntrean', {
        kode_booking: this.detail_antrian.kode_booking_bpjs,
        task_id: 3
      });

      this.data.antrian_id = this.detail_antrian.antrian_list_id
      this.data.tgl_antrian = this.detail_antrian.tgl_antrian
      this.data.poli_layanan = this.poli_layanan.poli
      this.data.jadwal_dokter_id = this.detail_jadwal.jadwal_dokter_id
      this.data.status_antrian = this.status_antrian.dibuat
      this.data.ms_loket_id = this.ms_loket_id
      this.data.initial = this.detail_jadwal.kode_poliklinik
      this.data.antrian_no = this.detail_antrian.antrian_no
      this.data.jenis_antrian_id = this.detail_antrian.jenis_antrian_id
      this.data.booking_id = this.detail_antrian.booking_id
      this.data.registrasi_id = this.detail_antrian.registrasi_id
      this.data.layanan_ruang_id = this.detail_antrian.layanan_ruang_id
      this.data.kode_booking_bpjs = this.detail_antrian.kode_booking_bpjs
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
      this.data.ms_loket_id = this.ms_loket_id
      this.data.initial = this.detail_layanan.kode_layanan
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
    pindahAntrian(data) {
      console.log(data, 'ini data pindah antrian');
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
    pindahAntrianRajalLoket(data) {
      console.log(data, 'ini data pindah antrian');
      this.$socket.emit('pindahAntrianRajalLoket', {
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
        layanan_ruang_id: data.layanan_ruang_id
      }, this.room_id)
    },
    resetData() {
      this.data.idDokter = ''
      this.data.idPoli = ''
      this.data.jadwal_dokter_id = ''
      this.data.layanan_ruang_id = ''

      this.data.antrian_id = ''
      this.data.tgl_antrian = ''
      this.data.is_master = 1
      this.data.poli_layanan = ''
      this.data.initial = ''
      this.data.antrian_no = ''
      this.data.status_antrian = ''
      this.data.ms_loket_id = ''
      this.data.jenis_antrian_id = ''
      this.data.booking_id = ''
      this.data.kode_booking_bpjs = ''
      this.data.registrasi_id = ''

      this.detail_jadwal = []
      this.detail_antrian = []
      this.detail_layanan = []
    },
    getListAntrianProses() {
      let vm = this
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: tgl,
          poli_layanan: this.poli_layanan.loket,
          status_antrian: this.status_antrian.proses
        })
        .then((res) => {
          vm.itemsProses = res.data
          for (let i = 0; i < vm.itemsProses.length; i++) {
            let x = vm.itemsProses[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
            if (vm.ms_loket_id === x.ms_loket_id) {
              vm.detail_antrian = x
              vm.antrian_id = x.antrian_list_id
              vm.no_proses = x.no_antrian
              vm.no_panggilan = `${x.antrian_no}`
              vm.kode_panggilan = x.initial
              vm.sedang_proses = true
              vm.on_process = true
              vm.disabledBatal = false
              vm.disabledSelesai = false
              vm.booking_id = x.booking_id
            }
            for (let j = 0; j < vm.listPoli.length; j++) {
              let y = vm.listPoli[j]
              if (x.poli_id === y.id) {
                // console.log('aaaaaaaaaaaa');
                x.nama_poli = y.nama
              }
            }
          }
          vm.totalRowsProses = vm.itemsProses.length
          console.log(vm.itemsProses, 'items Proses')
          //   console.log(vm.kode_panggilan, vm.no_panggilan);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getListAntrianSelesai() {
      let vm = this
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: tgl,
          poli_layanan: this.poli_layanan.loket,
          status_antrian: this.status_antrian.selesai
        })
        .then((res) => {
          vm.itemsSelesai = res.data
          for (let i = 0; i < vm.itemsSelesai.length; i++) {
            let x = vm.itemsSelesai[i]
            x.no = i + 1
            x.no_antrian = `${x.kode_jenis_antrian}${x.antrian_no}`
            for (let j = 0; j < vm.listPoli.length; j++) {
              let y = vm.listPoli[j]
              if (x.poli_id === y.id) {
                // console.log('aaaaaaaaaaaa');
                x.nama_poli = y.nama
              }
            }
          }
          vm.totalRowsSelesai = vm.itemsSelesai.length
          console.log(vm.itemsSelesai, 'items selesai')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getListAntrianLoket(x) {
      let vm = this
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      let poli_id = ''
      console.log(x, 'ini poli')
      if (vm.idPolinya != null) {
        poli_id = vm.idPolinya.id
      }
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: tgl,
          poli_layanan: this.poli_layanan.loket,
          status_antrian: '1',
          poli_id: poli_id
        })
        .then((res) => {
          vm.items = res.data
          for (let i = 0; i < vm.items.length; i++) {
            let x = vm.items[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
            for (let j = 0; j < vm.listPoli.length; j++) {
              let y = vm.listPoli[j]
              if (x.poli_id === y.id) {
                x.nama_poli = y.nama
              }
            }
          }
          vm.totalRows = vm.items.length
          console.log(vm.items)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    simpanData() {
      for (let i = 0; i < this.loket.length; i++) {
        let x = this.loket[i]
        if (x.value === this.ms_loket_id) {
          this.data.ms_loket_id = this.ms_loket_id
          this.loketnya = x.text
        }
      }

      this.locked = true
      this.keDisabled = false
      this.sedang_proses = false
      this.on_process = false
      this.disabledBatal = true

      this.$_api
        .post('antrianList/list', {
          tgl_antrian: this.tanggal,
          poli_layanan: this.poli_layanan.loket,
          status_antrian: this.status_antrian.dibuat
        })
        .then((res) => {
          this.items = res.data
          console.log(this.items, 'ihiy')
          for (let i = 0; i < this.items.length; i++) {
            let x = this.items[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
          }
          this.totalRows = this.items.length
          console.log(this.items)
        })
        .catch((err) => {
          console.log(err)
        })
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: this.tanggal,
          poli_layanan: this.poli_layanan.loket,
          status_antrian: this.status_antrian.proses
        })
        .then((res) => {
          this.itemsProses = res.data
          for (let i = 0; i < this.itemsProses.length; i++) {
            let x = this.itemsProses[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
            if (this.ms_loket_id === x.ms_loket_id) {
              this.detail_antrian = x
              this.antrian_id = x.antrian_list_id
              this.no_proses = x.no_antrian
              this.no_panggilan = `${x.antrian_no}`
              this.kode_panggilan = x.initial
              this.sedang_proses = true
              this.on_process = true
              this.disabledBatal = false
              this.disabledSelesai = false
              this.booking_id = x.booking_id
            }
            for (let j = 0; j < this.listPoli.length; j++) {
              let y = this.listPoli[j]
              if (x.poli_id === y.id) {
                // console.log('aaaaaaaaaaaa');
                x.nama_poli = y.nama
              }
            }
          }
          this.totalRowsProses = this.itemsProses.length
          console.log(this.itemsProses, 'items Proses')
          //   console.log(this.kode_panggilan, this.no_panggilan);
        })
        .catch((err) => {
          console.log(err)
        })
      this.$_api
        .post('antrianList/list', {
          tgl_antrian: this.tanggal,
          poli_layanan: this.poli_layanan.loket,
          status_antrian: this.status_antrian.selesai
        })
        .then((res) => {
          this.itemsSelesai = res.data
          for (let i = 0; i < this.itemsSelesai.length; i++) {
            let x = this.itemsSelesai[i]
            x.no = i + 1
            x.no_antrian = `${x.kode_jenis_antrian}${x.antrian_no}`
            for (let j = 0; j < this.listPoli.length; j++) {
              let y = this.listPoli[j]
              if (x.poli_id === y.id) {
                x.nama_poli = y.nama
              }
            }
          }
          this.totalRowsSelesai = this.itemsSelesai.length
          console.log(this.itemsSelesai, 'items selesai')
        })
        .catch((err) => {
          console.log(err)
        })
      this.createdLoket = false
    },
    hapusData() {
      this.locked = false
      this.keDisabled = true
      this.items = []
      this.itemsSelesai = []
      this.jenis_antrian_id = null
      this.ms_loket_id = null
      this.loketnya = ''
      this.no_proses = ''
      this.sedang_proses = false
      this.totalRows = 0
      this.totalRowsProses = 0
      this.totalRowsSelesai = 0
    },
    async getDatas() {
      let vm = this
      this.$_api.post('jenisAntrian/list').then((jenis_antrian) => {
        for (let i = 0; i < jenis_antrian.data.length; i++) {
          let x = jenis_antrian.data[i]
          let y = {}
          y.text = x.nama_jenis_antrian
          y.value = x.id
          vm.jenis_antrian.push(y)
        }
        console.log(jenis_antrian, 'ini res jenis antrian')
        this.$_api.post('msLoket/list').then((loket) => {
          for (let i = 0; i < loket.data.length; i++) {
            let x = loket.data[i]
            let y = {}
            y.text = x.nama_loket
            y.value = x.id

            vm.loket.push(y)
          }
          this.$_api.post('msPoliklinik/list').then((poli) => {
            for (let i = 0; i < poli.data.length; i++) {
              let x = poli.data[i]
              let y = {}
              y.text = x.nama_poliklinik
              y.value = x.id

              vm.listPoli.push(y)
            }
            // vm.listPoli = poli.data
            console.log(poli, 'ini res poli')
          })
        })
      })
      //   console.log('duhdekduhdek');
    },
    getDokter() {
      let vm = this
      vm.idDokter = ''
      vm.jadwal_dokter_id = ''
      vm.poli_id = vm.data.idPoli
      this.$_api.post('jadwalDokter/listJadwalDokterByMsPoliId', {
        tanggal: vm.tanggal,
        ms_poliklinik_id: vm.data.idPoli
      })
        .then((res) => {
          if (res.length === 0 && res.message === 'sukses') {
            vm.showing = true
            vm.variant = 'danger'
            vm.msg = 'Tidak ada jadwal dokter hari ini di poli ini.'
            setTimeout(() => {
              vm.showing = false
            }, 3000)
          } else if (res.length != 0 && res.message === 'sukses') {
            vm.listDokter = res.data
            vm.disabledDokter = false
          }
          console.log(res, 'ini ress get dokter')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getJadwal() {
      let vm = this
      vm.jadwal_dokter_id = ''
      this.$_api.post('jadwalDokter/listJadwalDokterByMsDokterId', {
        tanggal: vm.tanggal,
        ms_dokter_id: vm.data.idDokter
      })
        .then((res) => {
          if (res.length != 0 && res.message === 'sukses') {
            vm.listJadwal = res.data
            vm.disabledJadwal = false
          }
          console.log(res, 'ini ress get jadwal')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pilihPoli() {
      let vm = this
      vm.$bvModal.hide('modal-selesaiAntrian')
      vm.$bvModal.show('modal-pilihpoli')
    },
    pilihLayanan() {
      let vm = this
      vm.$bvModal.hide('modal-selesaiAntrian')
      vm.$bvModal.show('modal-pilihlayanan')
    },
    kodenya() {
      let vm = this

      console.log(vm.kode_panggilan, 'ini kode panggilan');

      // let kode = new Audio(
      //   require(`../../../assets/sound/sound/${vm.kode_panggilan}.wav`)
      // );

      // if (vm.kode_panggilan.length === 1) {
      //   kode.play()
      // } else if (vm.kode_panggilan.length === 2) {
      //   let kode2 = new Audio(
      //     require(`../../../assets/sound/sound/${vm.kode_panggilan[1]}.wav`)
      //   );
      //   kode.play()
      //   setTimeout(() => {
      //     kode2.play()
      //   }, 500);
      // }
    },
    panggil() {
      this.$socket.emit('panggilLoket', {
        id: this.detail_antrian.antrian_list_id,
        status_antrian: this.status_antrian.dibuat,
        ms_loket_id: this.ms_loket_id,
      }, this.room_id)

      // SUARA TIDAK MUNCUL DISINI -> EMIT UNTUK KE DISPLAY
      // this.sedang_manggil = true
      // this.sedang_proses = true
      // this.panggil_suara(this.no_proses, 'loket', this.loketnya)

      // START COMMENT YANG DULU ========================================================================
      // if (this.no_panggilan.length === 1) {
      //   // nomor_antrian.play();
      //   setTimeout(() => {
      //     this.kodenya()
      //     setTimeout(() => {
      //       // audio.play();
      //       this.lokete()
      //     }, 1000)
      //   }, 2000)
      // } else if (this.no_panggilan.length === 2) {
      //   if (this.no_panggilan === 10 || this.no_panggilan === 11) {
      //     // nomor_antrian.play();
      //     setTimeout(() => {
      //       this.kodenya()
      //       setTimeout(() => {
      //         // audio.play();
      //         this.lokete()
      //       }, 1000)
      //     }, 2000)
      //   } else if (this.no_panggilan[0] === 1) {
      //     // nomor_antrian.play();
      //     setTimeout(() => {
      //       this.kodenya()
      //       setTimeout(() => {
      //         // kesatu.play();
      //         setTimeout(() => {
      //           // kedua.play();
      //           this.lokete()
      //         }, 1000)
      //       }, 1000)
      //     }, 2000)
      //   } else if (this.no_panggilan[0] != 1) {
      //     if (this.no_panggilan[1] === 0) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             this.lokete()
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               this.lokete()
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     }
      //   }
      // } else if (this.no_panggilan.length === 3) {
      //   if (this.no_panggilan === 100) {
      //     // nomor_antrian.play();
      //     setTimeout(() => {
      //       this.kodenya()
      //       setTimeout(() => {
      //         // audio.play();
      //         this.lokete()
      //       }, 1000)
      //     }, 2000)
      //   } else if (this.no_panggilan[0] === 1) {
      //     if (
      //       (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 0) ||
      //       (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 1)
      //     ) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             this.lokete()
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else if (this.no_panggilan[2] === 0) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               this.lokete()
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else if (this.no_panggilan[1] === 0) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             this.lokete()
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               setTimeout(() => {
      //                 // keempat.play();
      //                 this.lokete()
      //               }, 1000)
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     }
      //   } else if (this.no_panggilan[0] != 1) {
      //     if (
      //       (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 0) ||
      //       (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 1)
      //     ) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               this.lokete()
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else if (this.no_panggilan[1] === 0 && this.no_panggilan[2] === 0) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             this.lokete()
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else if (this.no_panggilan[1] === 0) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               this.lokete()
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else if (this.no_panggilan[2] === 0) {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               setTimeout(() => {
      //                 // keempat.play();
      //                 this.lokete()
      //               }, 1000)
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     } else {
      //       // nomor_antrian.play();
      //       setTimeout(() => {
      //         this.kodenya()
      //         setTimeout(() => {
      //           // kesatu.play();
      //           setTimeout(() => {
      //             // kedua.play();
      //             setTimeout(() => {
      //               // ketiga.play();
      //               setTimeout(() => {
      //                 // keempat.play();
      //                 setTimeout(() => {
      //                   // kelima.play();
      //                   this.lokete()
      //                 }, 1000)
      //               }, 1000)
      //             }, 1000)
      //           }, 1000)
      //         }, 1000)
      //       }, 2000)
      //     }
      //   }
      // }
      // END COMMENT YANG DULU ========================================================================
      //    else if (this.no_panggilan.length === 4) {
      //     if (this.no_panggilan === 1000) {
      //       let audio = new Audio(
      //         require(`../../../assets/sound/sound/seribu.wav`)
      //       );
      // nomor_antrian.play();
      //       setTimeout(() => {
      // audio.play();
      //         this.loket();
      //       }, 2000);
      //     } else if (this.no_panggilan[0] === 1) {
      //       if (this.no_panggilan[1] === 0 && this.no_panggilan[2] === 0) {
      //         let kesatu = new Audio(
      //           require(`../../../assets/sound/sound/seribu.wav`)
      //         );
      //         let kedua = new Audio(
      //           require(`../../../assets/sound/sound/${this.no_panggilan[3]}.wav`)
      //         );
      //         nomor_antrian.play();
      //         setTimeout(() => {
      //           kesatu.play();
      //           setTimeout(() => {
      //             kedua.play();
      //             this.loket();
      //           }, 1000);
      //         }, 2000);
      //       } else if (
      //         (this.no_panggilan[1] === 0 &&
      //           this.no_panggilan[2] === 1 &&
      //           this.no_panggilan[3] === 0) ||
      //         (this.no_panggilan[1] === 0 &&
      //           this.no_panggilan[2] === 1 &&
      //           this.no_panggilan[3] === 1)
      //       ) {
      //         let kesatu = new Audio(
      //           require(`../../../assets/sound/sound/seribu.wav`)
      //         );
      //         let kedua = new Audio(
      //           require(`../../../assets/sound/sound/${this.no_panggilan[2]}${this.no_panggilan[3]}.wav`)
      //         );
      //         nomor_antrian.play();
      //         setTimeout(() => {
      //           kesatu.play();
      //           setTimeout(() => {
      //             kedua.play();
      //             this.loket();
      //           }, 1000);
      //         }, 2000);
      //       }
      //       let kesatu = new Audio(
      //         require(`../../../assets/sound/sound/seribu.wav`)
      //       );
      //       let kedua = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
      //       );
      //       let ketiga = new Audio(
      //         require(`../../../assets/sound/sound/ratus.wav`)
      //       );
      //       let keempat = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
      //       );
      //       let kelima = new Audio(
      //         require(`../../../assets/sound/sound/puluh.wav`)
      //       );
      //       let keenam = new Audio(
      //         require(`../../../assets/sound/sound/${this.no_panggilan[3]}.wav`)
      //       );
      //       nomor_antrian.play();
      //       setTimeout(() => {
      //         kesatu.play();
      //         setTimeout(() => {
      //           kedua.play();
      //           setTimeout(() => {
      //             ketiga.play();
      //             setTimeout(() => {
      //               keempat.play();
      //               setTimeout(() => {
      //                 kelima.play();
      //                 setTimeout(() => {
      //                   keenam.play();
      //                   this.loket();
      //                 }, 1000);
      //               }, 1000);
      //             }, 1000);
      //           }, 1000);
      //         }, 1000);
      //       }, 2000);
      //     }
      //   }
    },
    lokete() {
      console.log('lokete')
      this.$_alet.error({}, 'tess')
      let loket = new Audio(require(`../../../assets/sound/sound/loket.wav`));
      setTimeout(() => {
        loket.play();
        this.nama_loket();
      }, 1000);
    },
    nama_loket() {
      let i = this.loketnya;
      let nama_loket = new Audio(
        require(`../../../assets/sound/sound/${i}.wav`)
      );
      setTimeout(() => {
        nama_loket.play();
        this.sedang_manggil = false;
        if (this.on_process === false) {
          this.sedang_proses = false
        }
      }, 1000);
    },
    // lokete() {
    //   setTimeout(() => {
    //     loket.play();
    //     this.nama_loket()
    //   }, 1000)
    // },
    // nama_loket() {
    //   setTimeout(() => {
    //     nama_loket.play();
    //     console.log('tekan kene')
    //     this.sedang_manggil = false
    //     if (this.on_process === false) {
    //       console.log('masuk if')
    //       this.sedang_proses = false
    //     }
    //   }, 1000)
    // },
    // kodenya(){
    //   let vm = this
    //   let kode = new Audio(
    //     require(`../../../assets/sound/sound/${vm.kode_panggilan[0]}.wav`)
    //   );

    //   if(vm.kode_panggilan.length === 1){
    //     kode.play()
    //   }else if(vm.kode_panggilan.length === 2){
    //     let kode2 = new Audio(
    //       require(`../../../assets/sound/sound/${vm.kode_panggilan[1]}.wav`)
    //     );
    //     kode.play()
    //     setTimeout(() => {
    //       kode2.play()
    //     }, 500);
    //   }
    // },
    // panggil() {
    //   this.sedang_manggil = true;
    //   this.sedang_proses = true
    //   let nomor_antrian = new Audio(
    //     require(`../../../assets/sound/sound/nomor_antrian.wav`)
    //   );
    //   if (this.no_panggilan.length === 1) {
    //     let audio = new Audio(
    //       require(`../../../assets/sound/sound/${this.no_panggilan}.wav`)
    //     );
    //     nomor_antrian.play();
    //     setTimeout(() => {
    //       this.kodenya()
    //       setTimeout(() => {
    //         audio.play();
    //         this.lokete();
    //       }, 1000);
    //     }, 2000);
    //   } else if (this.no_panggilan.length === 2) {
    //     if (this.no_panggilan === 10 || this.no_panggilan === 11) {
    //       let audio = new Audio(
    //         require(`../../../assets/sound/sound/${this.no_panggilan}.wav`)
    //       );
    //       nomor_antrian.play();
    //       setTimeout(() => {
    //         this.kodenya()
    //         setTimeout(() => {
    //           audio.play();
    //           this.lokete();
    //         }, 1000);
    //       }, 2000);
    //     } else if (this.no_panggilan[0] === 1) {
    //       let kesatu = new Audio(
    //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //       );
    //       let kedua = new Audio(
    //         require(`../../../assets/sound/sound/belas.wav`)
    //       );
    //       nomor_antrian.play();
    //       setTimeout(() => {
    //         this.kodenya()
    //         setTimeout(() => {
    //           kesatu.play();
    //           setTimeout(() => {
    //             kedua.play();
    //             this.lokete();
    //           }, 1000);
    //         }, 1000);
    //       }, 2000);
    //     } else if (this.no_panggilan[0] != 1) {
    //       if (this.no_panggilan[1] === 0) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/puluh.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               this.lokete();
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/puluh.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 this.lokete();
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       }
    //     }
    //   } else if (this.no_panggilan.length === 3) {
    //     if (this.no_panggilan === 100) {
    //       let audio = new Audio(
    //         require(`../../../assets/sound/sound/seratus.wav`)
    //       );
    //       nomor_antrian.play();
    //       setTimeout(() => {
    //         this.kodenya()
    //         setTimeout(() => {
    //           audio.play();
    //           this.lokete();
    //         }, 1000);
    //       }, 2000);
    //     } else if (this.no_panggilan[0] === 1) {
    //       if (
    //         (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 0) ||
    //         (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 1)
    //       ) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/seratus.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}${this.no_panggilan[2]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               this.lokete();
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else if (this.no_panggilan[2] === 0) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/seratus.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/puluh.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 this.lokete();
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else if (this.no_panggilan[1] === 0) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/seratus.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               this.lokete();
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/seratus.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/puluh.wav`)
    //         );
    //         let keempat = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 setTimeout(() => {
    //                   keempat.play();
    //                   this.lokete();
    //                 }, 1000);
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       }
    //     } else if (this.no_panggilan[0] != 1) {
    //       if (
    //         (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 0) ||
    //         (this.no_panggilan[1] === 1 && this.no_panggilan[2] === 1)
    //       ) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/ratus.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}${this.no_panggilan[2]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 this.lokete();
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else if (this.no_panggilan[1] === 0 && this.no_panggilan[2] === 0) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/ratus.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               this.lokete();
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else if (this.no_panggilan[1] === 0) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/ratus.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 this.lokete();
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else if (this.no_panggilan[2] === 0) {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/ratus.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //         );
    //         let keempat = new Audio(
    //           require(`../../../assets/sound/sound/puluh.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 setTimeout(() => {
    //                   keempat.play();
    //                   this.lokete();
    //                 }, 1000);
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       } else {
    //         let kesatu = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
    //         );
    //         let kedua = new Audio(
    //           require(`../../../assets/sound/sound/ratus.wav`)
    //         );
    //         let ketiga = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //         );
    //         let keempat = new Audio(
    //           require(`../../../assets/sound/sound/puluh.wav`)
    //         );
    //         let kelima = new Audio(
    //           require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
    //         );
    //         nomor_antrian.play();
    //         setTimeout(() => {
    //           this.kodenya()
    //           setTimeout(() => {
    //             kesatu.play();
    //             setTimeout(() => {
    //               kedua.play();
    //               setTimeout(() => {
    //                 ketiga.play();
    //                 setTimeout(() => {
    //                   keempat.play();
    //                   setTimeout(() => {
    //                     kelima.play();
    //                     this.lokete();
    //                   }, 1000);
    //                 }, 1000);
    //               }, 1000);
    //             }, 1000);
    //           }, 1000);
    //         }, 2000);
    //       }
    //     }
    //   }
    //   //    else if (this.no_panggilan.length === 4) {
    //   //     if (this.no_panggilan === 1000) {
    //   //       let audio = new Audio(
    //   //         require(`../../../assets/sound/sound/seribu.wav`)
    //   //       );
    //   //       nomor_antrian.play();
    //   //       setTimeout(() => {
    //   //         audio.play();
    //   //         this.loket();
    //   //       }, 2000);
    //   //     } else if (this.no_panggilan[0] === 1) {
    //   //       if (this.no_panggilan[1] === 0 && this.no_panggilan[2] === 0) {
    //   //         let kesatu = new Audio(
    //   //           require(`../../../assets/sound/sound/seribu.wav`)
    //   //         );
    //   //         let kedua = new Audio(
    //   //           require(`../../../assets/sound/sound/${this.no_panggilan[3]}.wav`)
    //   //         );
    //   //         nomor_antrian.play();
    //   //         setTimeout(() => {
    //   //           kesatu.play();
    //   //           setTimeout(() => {
    //   //             kedua.play();
    //   //             this.loket();
    //   //           }, 1000);
    //   //         }, 2000);
    //   //       } else if (
    //   //         (this.no_panggilan[1] === 0 &&
    //   //           this.no_panggilan[2] === 1 &&
    //   //           this.no_panggilan[3] === 0) ||
    //   //         (this.no_panggilan[1] === 0 &&
    //   //           this.no_panggilan[2] === 1 &&
    //   //           this.no_panggilan[3] === 1)
    //   //       ) {
    //   //         let kesatu = new Audio(
    //   //           require(`../../../assets/sound/sound/seribu.wav`)
    //   //         );
    //   //         let kedua = new Audio(
    //   //           require(`../../../assets/sound/sound/${this.no_panggilan[2]}${this.no_panggilan[3]}.wav`)
    //   //         );
    //   //         nomor_antrian.play();
    //   //         setTimeout(() => {
    //   //           kesatu.play();
    //   //           setTimeout(() => {
    //   //             kedua.play();
    //   //             this.loket();
    //   //           }, 1000);
    //   //         }, 2000);
    //   //       }
    //   //       let kesatu = new Audio(
    //   //         require(`../../../assets/sound/sound/seribu.wav`)
    //   //       );
    //   //       let kedua = new Audio(
    //   //         require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
    //   //       );
    //   //       let ketiga = new Audio(
    //   //         require(`../../../assets/sound/sound/ratus.wav`)
    //   //       );
    //   //       let keempat = new Audio(
    //   //         require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
    //   //       );
    //   //       let kelima = new Audio(
    //   //         require(`../../../assets/sound/sound/puluh.wav`)
    //   //       );
    //   //       let keenam = new Audio(
    //   //         require(`../../../assets/sound/sound/${this.no_panggilan[3]}.wav`)
    //   //       );
    //   //       nomor_antrian.play();
    //   //       setTimeout(() => {
    //   //         kesatu.play();
    //   //         setTimeout(() => {
    //   //           kedua.play();
    //   //           setTimeout(() => {
    //   //             ketiga.play();
    //   //             setTimeout(() => {
    //   //               keempat.play();
    //   //               setTimeout(() => {
    //   //                 kelima.play();
    //   //                 setTimeout(() => {
    //   //                   keenam.play();
    //   //                   this.loket();
    //   //                 }, 1000);
    //   //               }, 1000);
    //   //             }, 1000);
    //   //           }, 1000);
    //   //         }, 1000);
    //   //       }, 2000);
    //   //     }
    //   //   }
    // },
    // lokete() {
    //   let loket = new Audio(require(`../../../assets/sound/sound/loket.wav`));
    //   setTimeout(() => {
    //     loket.play();
    //     this.nama_loket();
    //   }, 1000);
    // },
    // nama_loket() {
    //   let i = this.loketnya;
    //   let nama_loket = new Audio(
    //     require(`../../../assets/sound/sound/${i}.wav`)
    //   );
    //   setTimeout(() => {
    //     nama_loket.play();
    //     this.sedang_manggil = false;
    //     if(this.on_process === false){
    //       this.sedang_proses = false
    //     }
    //   }, 1000);
    // },
    triggerAlert(event) {
      let vm = this
      vm.showing = event.showing
      vm.variant = event.variant
      vm.msg = event.msg
      setTimeout(() => {
        vm.showing = false
      }, 4000)
    }
  },
  beforeDestroy() {
    this.$socket.off('refresh_admin_loket')
    this.$socket.off('refresh_layar')
    this.$socket.off('refresh_apm_loket')
    this.$socket.off('refresh_pindah_antrian')
  }
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

#modal-selesaiAntrian {
  max-width: max-content;
}
</style>
