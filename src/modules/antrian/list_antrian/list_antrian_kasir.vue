<template>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="12" lg="12">
          <h3 class="mb-0">
            <strong>List Antrian Kasir</strong>
          </h3>
          <b-card
            header-tag="header"
            header-bg-variant="dark"
            style="margin-top: 20px"
          >
            <b-row style="display: flex">
              <b-col cols="12" md="12" lg="12">
                <b-row>
                  <!-- <b-col cols="12" md="12" lg="12">
                    <b-card class="bg-secondary text-light">
                      <b-row>
                        <b-col cols="3" md="3" lg="3">
                          <b-form>
                            <b-form-group label-cols-md="3">
                              <template v-slot:label>
                                Poli
                              </template>
                              <multiselect
                                :options="listPoli"
                                v-model="data.idPoli"
                                :multiple="false"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="false"
                                label="nama"
                                track-by="id"
                                @input="getDokter(data.idPoli)"
                                placeholder="-- Pilih Poli --"
                                :disabled="locked"
                              ></multiselect>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col cols="6" md="6" lg="6">
                          <b-form>
                            <b-form-group label-cols-md="3">
                              <template v-slot:label>
                                Dokter
                              </template>
                              <multiselect
                                :options="listDokter"
                                v-model="data.idDokter"
                                :multiple="false"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="false"
                                label="nama"
                                track-by="id"
                                placeholder="-- Pilih Dokter --"
                                :disabled="disabledDokter"
                                @input="getJadwal(data.idDokter)"
                              ></multiselect>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col cols="3" md="3" lg="3">
                          <b-form>
                            <b-form-group label-cols-md="3">
                              <template v-slot:label>
                                Jadwal
                              </template>
                              <multiselect
                                :options="listJadwal"
                                v-model="data.jadwal_dokter_id"
                                :multiple="false"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="false"
                                label="waktunya"
                                track-by="id"
                                placeholder="-- Pilih Jadwal --"
                                :disabled="disabledJadwal"
                              ></multiselect>
                            </b-form-group>
                          </b-form>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12" md="12" lg="12">
                          <b-button
                            v-if="locked"
                            style="width: 100%"
                            variant="success"
                            @click="hapusData()"
                          >
                            <i class="ri-lock-password-line"></i> Simpan
                          </b-button>
                          <b-button
                            v-else
                            style="width: 100%"
                            variant="success"
                            @click="simpanData()"
                          >
                            Simpan
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col> -->



                  <b-col cols="9" md="9" lg="9">
                    <b-card
                      class="bg-secondary text-light"

                    >
                      <b-row>
                        <b-col cols="6" md="6" lg="6">
                          <h5><strong>Antrian</strong></h5>
                          <hr />
                          <b-table
                            :items="items"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            show-empty
                            hover
                            class="bg-light"
                          >
                            <template #cell(actions)="item">
                              <b-button
                                variant="success"
                                class="mr-1"
                                :disabled="sedang_proses"
                                @click="update(item.item)"
                                ><i class="ri-notification-line"></i>
                                {{ item.actions }}</b-button
                              >
                            </template>
                          </b-table>
                          <b-row>
                            <b-col md="8" offset-md="4">
                              <b-pagination
                                v-model="currentPage"
                                :total-rows="totalRows"
                                :per-page="perPage"
                                align="fill"
                                size="sm"
                              ></b-pagination>
                            </b-col>
                          </b-row>
                        </b-col>

                        <b-col cols="6" md="6" lg="6">
                          <h5><strong>Sedang Proses</strong></h5>
                          <hr />
                          <b-table
                            :items="itemsProses"
                            :fields="fieldsProses"
                            :current-page="currentPageProses"
                            :per-page="perPageProses"
                            responsive
                            show-empty
                            hover
                            class="bg-light"
                          >
                            <template #cell(actions)="item">
                              <b-button
                                variant="success"
                                class="mr-1"
                                v-b-tooltip.hover title="'Panggil'"
                                @click="data = item.item"
                                ><i class="ri-notification-line"></i>
                                {{ item.actions }}</b-button
                              >
                            </template>
                          </b-table>
                          <b-row>
                            <b-col md="8" offset-md="4">
                              <b-pagination
                                v-model="currentPageProses"
                                :total-rows="totalRowsProses"
                                :per-page="perPageProses"
                                align="fill"
                                size="sm"
                              ></b-pagination>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col cols="12" md="12" lg="12">
                          <h5><strong>Selesai</strong></h5>
                          <hr />
                          <b-table
                            :items="itemsSelesai"
                            :fields="fieldsSelesai"
                            :current-page="currentPageSelesai"
                            :per-page="perPageSelesai"
                            responsive
                            show-empty
                            hover
                            class="bg-light"
                          >
                            <template #cell(actions)="item">
                              <b-button
                                variant="success"
                                class="mr-1"
                                v-b-tooltip.hover title="'Panggil'"
                                @click="data = item.item"
                                ><i class="ri-notification-line"></i>
                                {{ item.actions }}</b-button
                              >
                            </template>
                          </b-table>
                          <b-row>
                            <b-col md="4" offset-md="8">
                              <b-pagination
                                v-model="currentPageSelesai"
                                :total-rows="totalRowsSelesai"
                                :per-page="perPageSelesai"
                                align="fill"
                                size="sm"
                              ></b-pagination>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                  <b-col cols="3" md="3" lg="3">
                    <b-card
                      style="
                        flex-flow: column wrap;
                        position: absolute;
                        width: 92%;
                        margin-right: 50px;
                      "
                      class="bg-secondary text-light"
                    >
                      <b-row>
                        <b-col cols="12" md="12" lg="12">
                          <h5><strong>Proses</strong></h5>
                          <hr />
                        </b-col>
                        <b-col cols="12" md="12" lg="12">
                          <b-row>
                            <b-col cols="7" md="7" lg="7">
                              <h5>
                                <strong>Kasir</strong>
                              </h5>
                            </b-col>
                            <b-col
                              cols="2"
                              md="2"
                              lg="2"
                              offset-lg="2"
                              offset-md="2"
                              offset-sm="2"
                            >
                              <b-button
                                :disabled="sedang_manggil"
                                style="justify-content;: flex-end"
                                variant="success"
                                class="mr-1"
                                @click="panggil()"
                                v-b-tooltip.hover title="'Panggil'"
                                ><i class="ri-notification-line"></i>
                              </b-button>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="12" md="12" lg="12">
                          <b-row>
                            <b-col
                              style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 250px;
                              "
                            >
                              <p style="font-size: 90px">
                                <strong>{{ no_proses }}</strong>
                              </p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col cols="12" md="12" lg="12">
                              <b-row>
                                <b-col cols="12" md="12" lg="12">
                                  <b-button
                                    style="width: 100%"
                                    variant="primary"
                                    @click="mulaiProses()"
                                  >
                                    <i class="ri-checkbox-circle-line"></i> Proses Antrian
                                  </b-button>
                                </b-col>
                              </b-row>
                              <b-row>
                                <b-col cols="6" md="6" lg="6" class="mt-2">
                                  <b-button
                                    style="width: 100%"
                                    variant="danger"
                                    @click="batalProses()"
                                    :disabled="disabledBatal"
                                  >
                                    <i class="ri-checkbox-circle-line"></i> Batal
                                  </b-button>
                                </b-col>
                                <b-col cols="6" md="6" lg="6" class="mt-2">
                                  <b-button
                                    style="width: 100%"
                                    variant="success"
                                    v-b-modal.modal-selesaiAntrian
                                    :disabled="disabledSelesai"
                                  >
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
      <b-modal
        id="modal-selesaiAntrian"
        ref="modal"
        title="Selesai Antrian"
        size="lg"
        centered
        hide-footer
        hide-header
      >
        <h2 class="text-center" style="margin-bottom:10px;">Silahkan Pilih terlebih dahulu</h2>

        <b-row>
          <b-col cols="12" lg="12" md="12" class="mt-2">
              <b-button variant="outline-primary" size="lg" style="width:100%" @click="pilihPoli()">Lanjutkan Ke Poli</b-button>
          </b-col>
          <b-col cols="12" lg="12" md="12" class="mt-2">
              <b-button variant="outline-primary" size="lg" style="width:100%" @click="pilihLayanan()">Lanjutkan Ke Layanan</b-button>
          </b-col>
          <b-col cols="12" lg="12" md="12" class="mt-2">
              <b-button variant="outline-primary" size="lg" style="width:100%" @click="selesaiAntrian()">Selesaikan Antrian</b-button>
          </b-col>
        </b-row>
      </b-modal>

      <!-- MODAL LANJUTKAN POLI -->
      <b-modal
        id="modal-pilihpoli"
        ref="modal"
        title="Selesai Antrian"
        size="lg"
        centered
        hide-footer
        hide-header
      >
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama Poli <span class="text-danger">*</span>
            </template>
            <multiselect
              :options="listPoli2"
              v-model="data2.idPoli"
              :multiple="false"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              label="nama"
              track-by="id"
              @input="getDokter2(data2.idPoli)"
              placeholder="-- Pilih Poli --"
            ></multiselect>
          </b-form-group>

          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama Dokter <span class="text-danger">*</span>
            </template>
            <multiselect
              :options="listDokter2"
              v-model="data2.idDokter"
              :multiple="false"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              label="nama"
              track-by="id"
              placeholder="-- Pilih Dokter --"
              :disabled="disabledDokter"
              @input="getJadwal2(data2.idDokter)"
            ></multiselect>
          </b-form-group>

          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Pilih Jadwal <span class="text-danger">*</span>
            </template>
            <multiselect
              :options="listJadwal2"
              v-model="data2.jadwal_dokter_id"
              :multiple="false"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              label="waktunya"
              track-by="id"
              placeholder="-- Pilih Jadwal --"
              :disabled="disabledJadwal"
            ></multiselect>
          </b-form-group>
          <b-form-group>
            <b-button @click="pindahkePoli()" style="width:100%" variant="outline-success">
              Simpan
            </b-button>
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- MODAL LANJUTKAN LAYANAN -->
      <b-modal
        id="modal-pilihlayanan"
        ref="modal"
        title="Selesai Antrian"
        size="lg"
        centered
        hide-footer
        hide-header
      >
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Nama Layanan <span class="text-danger">*</span>
            </template>
            <multiselect
              :options="listLayanan"
              v-model="data3.poli_layanan"
              :multiple="false"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              label="nama"
              track-by="id"
              placeholder="-- Pilih Layanan --"
              @input="cekPoliLayanan(data3.poli_layanan)"
            ></multiselect>
          </b-form-group>

          <b-form-group>
            <b-button @click="pindahkeLayanan()" style="width:100%" variant="outline-success">
              Simpan
            </b-button>
          </b-form-group>
        </b-form>


      </b-modal>
    </b-container>
  </template>

<script>
import moment from 'moment'
moment.locale('ID')
export default {
  name: 'jenis_antrian',
  components: {
  },
  data () {
    return {
      data: {
        idPoli: '',
        idDokter: '',
        jadwal_dokter_id: ''
      },
      data2: {
        idPoli: '',
        idDokter: '',
        jadwal_dokter_id: ''
      },
      data3: {
        poli_layanan: ''
      },
      poli_id: '',
      poli_id2: '',
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
      no_panggilan: '',
      kode_panggilan: '',
      booking_id: null,
      jenis_antrian_id: null,
      listPoli: [],
      listPoli2: [],
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
          key: 'nama_pasien',
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
          key: 'nama_loket',
          label: 'Loket',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        }
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
          key: 'nama_pasien',
          label: 'Nama Pasien',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'nama_loket',
          label: 'Loket',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        }
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
      tableBusy: false
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.getDatas()
    this.simpanData()
  },
  created () {
    this.$socket.off('refresh_admin')
    this.$socket.on('refresh_admin', (data) => {
      console.log(data, 'refresh adminnnnnnnnnnnnn')
      this.simpanData()
    })
    this.$socket.off('refresh_layar')
    this.$socket.on('refresh_layar', (data) => {
      console.log(data, 'refresh layarrrrrrrrrrrr')
      this.simpanData()
    })
    this.$socket.off('refresh_register_mandiri')
    this.$socket.on('refresh_register_mandiri', (data) => {
      console.log(data)
      this.simpanData()
    })
    this.$socket.on('refresh_antrian_layanan', (data) => {
      console.log(data)
      this.simpanData()
    })
    this.$socket.off('refresh_register_APM_mandiri')
    this.$socket.on('refresh_register_APM_mandiri', (data) => {
      console.log(data)
      this.simpanData()
    })
    this.$socket.off('refresh_antrian_loket')
    this.$socket.on('refresh_antrian_loket', (data) => {
      console.log(data, 'ini dataa')
      if (this.locked == true) {
        this.simpanData()
      }
    })
  },
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    update (data) {
      let vm = this
      // console.log(data, 'ini datanyaaaaaaaaaaaaaaaaaaaa');
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      this.$socket.emit('panggil', {
        id: data.antrian_list_id,
        status_antrian: '0',
        antrian_no: data.antrian_no,
        initial: data.initial,
        no_antrian: data.no_antrian,
        tanggal_antrian: tgl,
        poli_layanan: 3,
        booking_id: data.booking_id
      }, data.poli_id)
      vm.booking_id = data.booking_id
      vm.antrian_id = data.antrian_list_id
      vm.no_proses = data.no_antrian
      vm.no_panggilan = `${data.antrian_no}`
      vm.kode_panggilan = data.initial
      for (let i = 0; i < vm.listPoli.length; i++) {
        let x = vm.listPoli[i]
        if (x.id == data.poli_id) {
          vm.kode_poli = x.kdAntrean
          // console.log(vm.kode_poli, 'ini kode poli');
        }
      }

      vm.panggil()
      // setTimeout(() => {
      //   vm.panggil();
      // }, 2000);
    },
    mulaiProses () {
      let vm = this
      vm.$socket.emit('panggil', {
        poli_layanan: 3,
        id: vm.antrian_id,
        status_antrian: '1',
        booking_id: vm.booking_id
      })
      vm.sedang_proses = true
      vm.on_process = true
      vm.disabledBatal = false
      vm.disabledSelesai = false
    },
    batalProses () {
      let vm = this
      vm.$socket.emit('panggil', {
        poli_layanan: 3,
        id: vm.antrian_id,
        status_antrian: '0',
        booking_id: vm.booking_id
      })
      vm.disabledBatal = true
      vm.disabledSelesai = true
      vm.sedang_proses = false
      vm.on_process = false
    },
    selesaiAntrian () {
      let vm = this
      //   console.log(vm.antrian_id, "ini antrian");
      vm.$socket.emit('panggil', {
        poli_layanan: 3,
        id: vm.antrian_id,
        status_antrian: '2',
        booking_id: vm.booking_id
      })
      vm.no_proses = ''
      vm.no_panggilan = ''
      vm.kode_panggilan = ''
      vm.sedang_proses = false
      vm.on_process = false
      vm.disabledBatal = true
      vm.disabledSelesai = true
      vm.antrian_id = ''
      vm.$bvModal.hide('modal-selesaiAntrian')
      // this.$_api
      //   .post("antrian_loket/update", {
      //     id: vm.antrian_id,
      //     status_antrian: 2,
      //     master_loket_id: vm.loket_id,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     vm.no_proses = "";
      //     vm.no_panggilan = "";
      //     vm.kode_panggilan = "";
      //     vm.sedang_proses = false;
      //     vm.antrian_id = "";
      //     vm.simpanData();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    simpanData () {
      let vm = this
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      this.$_api
        .post('antrian_list/list', {
          tanggal_antrian: tgl,
          status_antrian: '0',
          poli_layanan: 3
        })
        .then((res) => {
          vm.items = res.data
          for (let i = 0; i < vm.items.length; i++) {
            let x = vm.items[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
          }
          vm.totalRows = vm.items.length
          console.log(vm.items)
        })
        .catch((err) => {
          console.log(err)
        })
      this.$_api
        .post('antrian_list/list', {
          tanggal_antrian: tgl,
          status_antrian: '2',
          poli_layanan: 3
        })
        .then((res) => {
          vm.itemsSelesai = res.data
          for (let i = 0; i < vm.itemsSelesai.length; i++) {
            let x = vm.itemsSelesai[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
          }
          vm.totalRowsSelesai = vm.itemsSelesai.length
          console.log(vm.itemsSelesai, 'items selesai')
        })
        .catch((err) => {
          console.log(err)
        })
      this.$_api
        .post('antrian_list/list', {
          tanggal_antrian: tgl,
          status_antrian: '1',
          poli_layanan: 3
        })
        .then((res) => {
          vm.itemsProses = res.data
          for (let i = 0; i < vm.itemsProses.length; i++) {
            let x = vm.itemsProses[i]
            x.no = i + 1
            x.no_antrian = `${x.initial}${x.antrian_no}`
            vm.antrian_id = x.antrian_list_id
            vm.no_proses = x.no_antrian
            vm.no_panggilan = `${x.antrian_no}`
            vm.kode_panggilan = x.initial
            vm.booking_id = x.booking_id
            vm.sedang_proses = true
            vm.on_process = true
            vm.disabledBatal = false
            vm.disabledSelesai = false
            for (let j = 0; j < vm.listPoli.length; j++) {
              let o = vm.listPoli[j]
              if (o.id == vm.poli_id) {
                vm.kode_poli = o.kdAntrean
              }
            }
          }
          vm.totalRowsProses = vm.itemsProses.length
          console.log(vm.itemsProses, 'items Proses')
          console.log(vm.kode_panggilan, 'kode panggilan')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cekPoliLayanan (x) {
      let vm = this
      // console.log(x, 'ini x');
      if (x.kdAntrean == 'FM') {
        vm.poli_layanan = 4
      } else if (x.kdAntrean == 'KS') {
        vm.poli_layanan = 3
      } else if (x.kdAntrean == 'L') {
        vm.poli_layanan = 5
      } else if (x.kdAntrean == 'K') {
        vm.poli_layanan = 6
      } else if (x.kdAntrean == 'G') {
        vm.poli_layanan = 7
      }
      // console.log(vm.poli_layanan);
    },
    pindahkePoli () {
      let vm = this
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      let datanya = {}
      datanya.poli_id = vm.data2.idPoli.id
      datanya.jadwal_dokter_id = vm.data2.jadwal_dokter_id.id
      datanya.initial = vm.kode_panggilan
      datanya.antrian_no = vm.no_panggilan
      datanya.tanggal_antrian = tgl
      datanya.poli_layanan = 1
      datanya.is_master = 0
      datanya.id_antrian_list = vm.antrian_id
      // console.log(datanya);
      vm.$socket.emit('registerMandiri', datanya)
      vm.no_proses = ''
      vm.sedang_proses = false
      vm.$bvModal.hide('modal-pilihpoli')
    },
    pindahkeLayanan () {
      let vm = this
      let tgl = moment(new Date()).format('YYYY-MM-DD')
      let datanya = {}
      // datanya.poli_id = vm.data2.idPoli.id
      // datanya.jadwal_dokter_id = vm.data2.jadwal_dokter_id.id
      datanya.initial = vm.kode_panggilan
      datanya.antrian_no = vm.no_panggilan
      datanya.tanggal_antrian = tgl
      datanya.poli_layanan = vm.poli_layanan
      datanya.is_master = 0
      datanya.id_antrian_list = vm.antrian_id
      // console.log(datanya);
      vm.$socket.emit('registerAntrianLayanan', datanya)
      vm.no_proses = ''
      vm.sedang_proses = false
      vm.$bvModal.hide('modal-pilihlayanan')
    },
    hapusData () {
      let vm = this
      vm.locked = false
      vm.items = []
      vm.itemsSelesai = []
      vm.idPoli = ''
      vm.idDokter = ''
      vm.jadwal_dokter_id = ''
      vm.poli_id = ''
      vm.loketnya = ''
      vm.no_proses = ''
      vm.sedang_proses = false
    },
    async getDatas () {
      let vm = this
      let poli = await this.$_api.post('purworejo/listPoli')
      for (let i = 0; i < poli.data.length; i++) {
        let x = poli.data[i]
        if (x.kuota == '999') {
          vm.listLayanan.push(x)
        } else {
          vm.listPoli.push(x)
          vm.listPoli2.push(x)
        }
      }
      // vm.listPoli = poli.data.data
      // vm.listPoli2 = poli.data.data
      // console.log(vm.listPoli,"duhdekduhdek");
    },
    getDokter (x) {
      let vm = this
      let tanggal = moment().format('YYYY-MM-DD')
      vm.idDokter = ''
      vm.jadwal_dokter_id = ''
      vm.poli_id = x.id
      this.$_api.post('jadwal_dokter/listDokterByTanggalPoli', {
        tanggal: tanggal,
        poli_id: x.id
      })
        .then((res) => {
          if (res.data.length == 0 && res.message == 'sukses') {
            vm.showing = true
            vm.variant = 'danger'
            vm.msg = 'Tidak ada jadwal dokter hari ini di poli ini.'
            setTimeout(() => {
              vm.showing = false
            }, 3000)
          } else if (res.data.length != 0 && res.message == 'sukses') {
            vm.listDokter = res.data
            vm.disabledDokter = false
          }
          console.log(res, 'ini ress')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDokter2 (x) {
      let vm = this
      let tanggal = moment().format('YYYY-MM-DD')
      vm.data2.idDokter = ''
      vm.data2.jadwal_dokter_id = ''
      vm.poli_id2 = x.id
      this.$_api.post('jadwal_dokter/listDokterByTanggalPoli', {
        tanggal: tanggal,
        poli_id: x.id
      })
        .then((res) => {
          if (res.data.length == 0 && res.message == 'sukses') {
            vm.showing = true
            vm.variant = 'danger'
            vm.msg = 'Tidak ada jadwal dokter hari ini di poli ini.'
            setTimeout(() => {
              vm.showing = false
            }, 3000)
          } else if (res.data.length != 0 && res.message == 'sukses') {
            vm.listDokter2 = res.data
            vm.disabledDokter = false
          }
          console.log(res, 'ini ress')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getJadwal (x) {
      let vm = this
      let tanggal = moment().format('YYYY-MM-DD')
      vm.jadwal_dokter_id = ''
      this.$_api.post('jadwal_dokter/listJadwalByDokterTanggalPoli', {
        tanggal: tanggal,
        poli_id: vm.poli_id,
        dokter_id: x.id
      })
        .then((res) => {
          if (res.data.length != 0 && res.message == 'sukses') {
            vm.listJadwal = res.data
            for (let i = 0; i < vm.listJadwal.length; i++) {
              let x = vm.listJadwal[i]
              let wkt_mulai = moment(x.waktu_mulai).format('HH.mm')
              let wkt_selesai = moment(x.waktu_selesai).format('HH.mm')
              x.waktunya = `${wkt_mulai} - ${wkt_selesai}`
            }
            vm.disabledJadwal = false
          }
          console.log(res, 'ini ress')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getJadwal2 (x) {
      let vm = this
      let tanggal = moment().format('YYYY-MM-DD')
      vm.data2.jadwal_dokter_id = ''
      this.$_api.post('jadwal_dokter/listJadwalByDokterTanggalPoli', {
        tanggal: tanggal,
        poli_id: vm.poli_id2,
        dokter_id: x.id
      })
        .then((res) => {
          if (res.data.length != 0 && res.message == 'sukses') {
            vm.listJadwal2 = res.data
            for (let i = 0; i < vm.listJadwal2.length; i++) {
              let x = vm.listJadwal2[i]
              let wkt_mulai = moment(x.waktu_mulai).format('HH.mm')
              let wkt_selesai = moment(x.waktu_selesai).format('HH.mm')
              x.waktunya = `${wkt_mulai} - ${wkt_selesai}`
            }
            vm.disabledJadwal = false
          }
          console.log(res, 'ini ress')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pilihPoli () {
      let vm = this
      vm.$bvModal.hide('modal-selesaiAntrian')
      vm.$bvModal.show('modal-pilihpoli')
    },
    pilihLayanan () {
      let vm = this
      vm.$bvModal.hide('modal-selesaiAntrian')
      vm.$bvModal.show('modal-pilihlayanan')
    },
    kodenya () {
      let vm = this
      let kode = new Audio(
        require(`../../../assets/sound/sound/${vm.kode_panggilan[0]}.wav`)
      )

      if (vm.kode_panggilan.length == 1) {
        kode.play()
      } else if (vm.kode_panggilan.length == 2) {
        let kode2 = new Audio(
          require(`../../../assets/sound/sound/${vm.kode_panggilan[1]}.wav`)
        )
        kode.play()
        setTimeout(() => {
          kode2.play()
        }, 500)
      }
      // for (let i = 0; i < vm.kode_panggilan.length; i++) {
      //   let kode = new Audio(
      //     require(`../../../assets/sound/sound/${vm.kode_panggilan[i]}.wav`)
      //   );
      //   setTimeout(() => {
      //     kode.play()
      //   }, 500);
      // }
    },
    panggil () {
      this.sedang_manggil = true
      this.sedang_proses = true
      let nomor_antrian = new Audio(
        require(`../../../assets/sound/sound/nomor_antrian.wav`)
      )
        // let kode = new Audio(
        //   require(`../../../assets/sound/sound/${this.kode_panggilan}.wav`)
        // );
      if (this.no_panggilan.length == 1) {
        let audio = new Audio(
          require(`../../../assets/sound/sound/${this.no_panggilan}.wav`)
        )
        nomor_antrian.play()
        setTimeout(() => {
          this.kodenya()
          setTimeout(() => {
            audio.play()
            this.lokete()
          }, 1000)
        }, 2000)
      } else if (this.no_panggilan.length == 2) {
        if (this.no_panggilan == 10 || this.no_panggilan == 11) {
          let audio = new Audio(
            require(`../../../assets/sound/sound/${this.no_panggilan}.wav`)
          )
          nomor_antrian.play()
          setTimeout(() => {
            this.kodenya()
            setTimeout(() => {
              audio.play()
              this.lokete()
            }, 1000)
          }, 2000)
        } else if (this.no_panggilan[0] == 1) {
          let kesatu = new Audio(
            require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
          )
          let kedua = new Audio(
            require(`../../../assets/sound/sound/belas.wav`)
          )
          nomor_antrian.play()
          setTimeout(() => {
            this.kodenya()
            setTimeout(() => {
              kesatu.play()
              setTimeout(() => {
                kedua.play()
                this.lokete()
              }, 1000)
            }, 1000)
          }, 2000)
        } else if (this.no_panggilan[0] != 1) {
          if (this.no_panggilan[1] == 0) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/puluh.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  this.lokete()
                }, 1000)
              }, 1000)
            }, 2000)
          } else {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/puluh.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    this.lokete()
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          }
        }
      } else if (this.no_panggilan.length == 3) {
        if (this.no_panggilan == 100) {
          let audio = new Audio(
            require(`../../../assets/sound/sound/seratus.wav`)
          )
          nomor_antrian.play()
          setTimeout(() => {
            this.kodenya()
            setTimeout(() => {
              audio.play()
              this.lokete()
            }, 1000)
          }, 2000)
        } else if (this.no_panggilan[0] == 1) {
          if (
            (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 0) ||
              (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 1)
          ) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/seratus.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}${this.no_panggilan[2]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  this.lokete()
                }, 1000)
              }, 1000)
            }, 2000)
          } else if (this.no_panggilan[2] == 0) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/seratus.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/puluh.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    this.lokete()
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          } else if (this.no_panggilan[1] == 0) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/seratus.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  this.lokete()
                }, 1000)
              }, 1000)
            }, 2000)
          } else {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/seratus.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/puluh.wav`)
            )
            let keempat = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    setTimeout(() => {
                      keempat.play()
                      this.lokete()
                    }, 1000)
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          }
        } else if (this.no_panggilan[0] != 1) {
          if (
            (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 0) ||
              (this.no_panggilan[1] == 1 && this.no_panggilan[2] == 1)
          ) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/ratus.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}${this.no_panggilan[2]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    this.lokete()
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          } else if (this.no_panggilan[1] == 0 && this.no_panggilan[2] == 0) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/ratus.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  this.lokete()
                }, 1000)
              }, 1000)
            }, 2000)
          } else if (this.no_panggilan[1] == 0) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/ratus.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    this.lokete()
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          } else if (this.no_panggilan[2] == 0) {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/ratus.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
            )
            let keempat = new Audio(
              require(`../../../assets/sound/sound/puluh.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    setTimeout(() => {
                      keempat.play()
                      this.lokete()
                    }, 1000)
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          } else {
            let kesatu = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[0]}.wav`)
            )
            let kedua = new Audio(
              require(`../../../assets/sound/sound/ratus.wav`)
            )
            let ketiga = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[1]}.wav`)
            )
            let keempat = new Audio(
              require(`../../../assets/sound/sound/puluh.wav`)
            )
            let kelima = new Audio(
              require(`../../../assets/sound/sound/${this.no_panggilan[2]}.wav`)
            )
            nomor_antrian.play()
            setTimeout(() => {
              this.kodenya()
              setTimeout(() => {
                kesatu.play()
                setTimeout(() => {
                  kedua.play()
                  setTimeout(() => {
                    ketiga.play()
                    setTimeout(() => {
                      keempat.play()
                      setTimeout(() => {
                        kelima.play()
                        this.lokete()
                      }, 1000)
                    }, 1000)
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 2000)
          }
        }
      }
      //    else if (this.no_panggilan.length == 4) {
      //     if (this.no_panggilan == 1000) {
      //       let audio = new Audio(
      //         require(`../../../assets/sound/sound/seribu.wav`)
      //       );
      //       nomor_antrian.play();
      //       setTimeout(() => {
      //         audio.play();
      //         this.loket();
      //       }, 2000);
      //     } else if (this.no_panggilan[0] == 1) {
      //       if (this.no_panggilan[1] == 0 && this.no_panggilan[2] == 0) {
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
      //         (this.no_panggilan[1] == 0 &&
      //           this.no_panggilan[2] == 1 &&
      //           this.no_panggilan[3] == 0) ||
      //         (this.no_panggilan[1] == 0 &&
      //           this.no_panggilan[2] == 1 &&
      //           this.no_panggilan[3] == 1)
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
    lokete () {
      let loket = new Audio(require(`../../../assets/sound/sound/silahkan.wav`))
      setTimeout(() => {
        loket.play()
        this.nama_loket()
      }, 1000)
    },
    nama_loket () {
      let nama_loket = new Audio(
        require(`../../../assets/sound/sound/ke.wav`)
      )

      let farm = new Audio(
        require(`../../../assets/sound/sound/kasir.wav`)
      )
      setTimeout(() => {
        nama_loket.play()
        setTimeout(() => {
          farm.play()
        }, 1000)
        this.sedang_manggil = false
        if (this.on_process == false) {
          this.sedang_proses = false
        }
      }, 1500)
    },
    triggerAlert (event) {
      let vm = this
      vm.showing = event.showing
      vm.variant = event.variant
      vm.msg = event.msg
      setTimeout(() => {
        vm.showing = false
      }, 4000)
    }
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
  </style>
