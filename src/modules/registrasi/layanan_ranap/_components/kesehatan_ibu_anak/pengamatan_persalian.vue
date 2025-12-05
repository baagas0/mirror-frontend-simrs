<template>
  <div id="page-pengamatan-persalinan">
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <!-- <b-button variant="success" class="mr-2">Buat Baru Kehamilan</b-button> -->
          <b-button variant="success">Cetak Kartu Ibu</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Data Pengamatan Persalinan</h6>
      </b-col>
      <!-- <b-col cols="12" sm="12" md="3" lg="3">
        <label>ID </label>
        <b-form-input type="text" placeholder="Otomatis" disabled></b-form-input>
      </b-col>

      <b-col cols="12" sm="12" md="3" lg="3">
        <label>Tanggal</label>
        <b-form-input type="text" placeholder="Otomatis" disabled></b-form-input>
      </b-col> -->

      <b-col cols="12" sm="12" md="6" lg="6">
        <label>Nama Pasien</label>
        <b-form-input type="text" v-model="mData.nama_pasien" placeholder="Otomatis" disabled></b-form-input>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Kartu Ibu</h6>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="7" xl="7" class="custom-table-kartu-ibu">
        <b-table-simple class="table-sm">
          <b-thead>
            <b-tr>
              <b-th>Persalinan</b-th>
              <b-th style="width:75%">Tanggal</b-th>
              <b-th>Jam</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>Kala Laten</b-td>
              <b-td>
                <b-form-datepicker
                    style="width: 100%"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    no-flip
                    locale="id"
                    v-model="mData.tgl_kala_laten"
                  ></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input
                  type="time"
                  v-model="mData.jam_kala_laten"
                ></b-form-input>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td>Kala Aktif</b-td>
              <b-td>
                <b-form-datepicker
                    style="width: 100%"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    no-flip
                    locale="id"
                    v-model="mData.tgl_kala_aktif"
                  ></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input
                  type="time"
                  v-model="mData.jam_kala_aktif"
                ></b-form-input>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td>Kala II</b-td>
              <b-td>
                <b-form-datepicker
                    style="width: 100%"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    no-flip
                    locale="id"
                    v-model="mData.tgl_kala_ii"
                  ></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input
                  type="time"
                  v-model="mData.jam_kala_ii"
                ></b-form-input>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td>Bayi Lahir</b-td>
              <b-td>
                <b-form-datepicker
                    style="width: 100%"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    no-flip
                    locale="id"
                    v-model="mData.tgl_bayi_lahir"
                  ></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input
                  type="time"
                  v-model="mData.jam_bayi_lahir"
                ></b-form-input>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td>Plasenta Lahir</b-td>
              <b-td>
                <b-form-datepicker
                    style="width: 100%"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    no-flip
                    locale="id"
                    v-model="mData.tgl_plasenta_lahir"
                  ></b-form-datepicker>
              </b-td>
              <b-td>
                <b-form-input
                  type="time"
                  v-model="mData.jam_plasenta_lahir"
                ></b-form-input>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td colspan="2">Pendahan Kala IV 2 jam Postpartum</b-td>
              <b-td>
                <div style="width:100%;display: flex;">
                  <b-form-input
                    type="number"
                    v-model="mData.pendahan_kala_iv"
                  ></b-form-input>
                  <div class="custom-box-satuan">
                    <h6>cc</h6>
                  </div>
                </div>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="5" xl="5">
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Usia Kehamilan
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
              type="number"
              v-model="mData.usia_kehamilan_persalinan"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>minggu</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Usia HPHT
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
              type="number"
              v-model="mData.usia_hpht"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>minggu</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Keadaan Ibu
          </template>
          <b-form-radio-group
            id=""
            v-model="mData.keadaan_ibu"
            class="mt-1"
          >
            <b-form-radio value="Hidup">
              <span>Hidup</span>
            </b-form-radio>
            <b-form-radio value="Mati">
              <span>Mati</span>
            </b-form-radio>
          </b-form-radio-group>
          <!-- <div style="width:100%;display: flex;flex-wrap: wrap;">
            <div style="width:33.33%;padding:0 5px;"><b-form-radio name="option-tiba" value="Hidup">Hidup</b-form-radio></div>
            <div style="width:33.33%;padding:0 5px;"><b-form-radio name="option-tiba" value="Mati">Mati</b-form-radio></div>
          </div> -->
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Keadaan Bayi
          </template>
          <b-form-radio-group
            id=""
            v-model="mData.keadaan_bayi"
            class="mt-1"
          >
            <b-form-radio value="Hidup">
              <span>Hidup</span>
            </b-form-radio>
            <b-form-radio value="Mati">
              <span>Mati</span>
            </b-form-radio>
          </b-form-radio-group>
          <!-- <div style="width:100%;display: flex;flex-wrap: wrap;">
            <div style="width:33.33%;padding:0 5px;"><b-form-radio name="option-tiba" value="Hidup">Hidup</b-form-radio></div>
            <div style="width:33.33%;padding:0 5px;"><b-form-radio name="option-tiba" value="Mati">Mati</b-form-radio></div>
          </div> -->
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            BB Bayi
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
              type="number"
              v-model="mData.berat_badan_bayi"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>gram</h6>
            </div>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Observasi</h6>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="custom-table-observasi">
        <b-table-simple bordered class="table-sm">
          <b-thead>
            <b-tr>
              <b-th style="width:35%">Tanggal</b-th>
              <b-th>Nama Pemeriksa</b-th>
              <b-th>Hasil Pemeriksaan</b-th>
              <b-th>Aksi</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>
                <date-picker
                  style="width: 100%"
                  type="datetime"
                  v-model="observasi.waktu_observasi"
                ></date-picker>
              </b-td>

              <b-td>
                <!-- <Multiselect
                  id="ms_dokter_id"
                  v-model="mData.dokter_id"
                  :options="listDokter"
                  :multiple="false"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="false"
                  label="nama_tenaga_medis"
                  track-by="tenaga_medis_id"
                  placeholder="-- Pilih Pemeriksa --"
                  size="sm"
                ></Multiselect> -->
                <s-input groupClass="mb-0" v-model="observasi.ms_dokter_id" :item="{
                  label: '',
                  id: 'ms_dokter_id',
                  data: 'ms_dokter_id',
                  type: 'lookup-radio',
                  api: 'msDokter',
                  getter: 'msDokter',
                  setter: 'msDokter',
                  validation: ['required'],
                  return_object: true,
                  pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter', 'nama_specialist'],
                    headerDisplay: ['Nama', 'Spesialis'],
                    mainParam: 'nama_dokter'
                  },
                }" />
              </b-td>

              <b-td>
                <b-form-input
                  type="text"
                  v-model="observasi.hasil_pemeriksaan"
                ></b-form-input>
              </b-td>
              <b-td>
                <b-button @click="pushObservasi()" variant="primary"><i class="ri-add-line"></i></b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>

        <b-table-simple class="table-sm">
          <b-tbody>
            <b-tr v-for="(item, idx) in mData.bulk_observasi"  :key=idx>
              <b-td style="width:35%">{{ item.waktu_observasi | parse('longDate') }}</b-td>
              <b-td>{{ item.ms_dokter_id ? item.ms_dokter_id.nama_dokter : '-' }}</b-td>
              <b-td>{{ item.hasil_pemeriksaan }}</b-td>
              <b-td class="d-flex justify-content-end">
                <b-button @click="deleteObservasi(item, idx)" variant="danger" class="m-0"><i class="ri-delete-bin-line"></i></b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;" class="custom-table-radio">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-table-simple class="table-sm">
          <b-tbody>
            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Presentasi</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group
                  id=""
                  v-model="mData.data_persalinan.presentasi"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Puncak">Puncak</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Belakang Kepala">Belakang Kepala</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Lintang / Oblique">Lintang / Oblique</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Menumbung">Menumbung</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Bokong">Bokong</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Dahi">Dahi</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Muka">Muka</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Kaki">Kaki</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Campuran">Campuran</b-form-radio></div>
                  </div>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Tempat</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group 
                  id=""
                  v-model="mData.data_persalinan.tempat"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Rumah">Rumah</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Polindes">Polindes</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Pustu">Pustu</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Puskesmas">Puskesmas</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="RB">RB</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Klinik">Klinik</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="RS">RS</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="RS ODHA">RS ODHA</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="RSIA">RSIA</b-form-radio></div>
                  </div>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Penolong</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group 
                  id=""
                  v-model="mData.data_persalinan.penolong"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Keluarga">Keluarga</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Dukun">Dukun</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Bidan">Bidan</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="dr. Spesialis">dr. Spesialis</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="dr.">dr.</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Lainnya">Lainnya</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Tidak Ada">Tidak Ada</b-form-radio></div>
                  </div>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Cara Persalinan</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group 
                  id=""
                  v-model="mData.data_persalinan.cara_persalinan"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Normal">Normal</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Vakum">Vakum</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Forceps">Forceps</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Sectio Caesaria">Sectio Caesaria</b-form-radio></div>
                  </div>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Manajemen Aktif Kalah III</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-checkbox-group 
                  id=""
                  v-model="mData.data_persalinan.manajemen_aktif_kalah"
                  class="mt-1"
                >
                  <b-form-checkbox value="Injeksi Oksitoksin">Injeksi Oksitoksin</b-form-checkbox>
                  <b-form-checkbox value="Peregangan Tali Pusat">Peregangan Tali Pusat</b-form-checkbox>
                  <b-form-checkbox value="Masase fundus uteri">Masase fundus uteri</b-form-checkbox>
                </b-form-checkbox-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Pelayanan</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-checkbox-group 
                  id=""
                  v-model="mData.data_persalinan.pelayanan"
                  class="mt-1"
                >
                  <b-form-checkbox value="IMD">IMD</b-form-checkbox>
                  <b-form-checkbox value="Menggunakan Partograf">Menggunakan Partograf</b-form-checkbox>
                  <b-form-checkbox value="Catat dibuku KIA">Catat dibuku KIA</b-form-checkbox>
                </b-form-checkbox-group>
                
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Integrasi Program</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group 
                  id=""
                  v-model="mData.data_persalinan.integrasi_program"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="ART">ART</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Obat Anti Malaria">Obat Anti Malaria</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Obat Anti B">Obat Anti B</b-form-radio></div>
                  </div>
                </b-form-radio-group>
                
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">ARV progilaksi pada bayi baru</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-input
                  type="text"
                  v-model="mData.data_persalinan.arv_progilaksi"
                ></b-form-input>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Komplikasi</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group 
                  id=""
                  v-model="mData.data_persalinan.komplikasi"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Distoria">Distoria</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="HDK">HDK</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="PPP">PPP</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Infeksi">Infeksi</b-form-radio></div>
                  </div>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Dirujuk ke -</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group 
                  id=""
                  v-model="mData.data_persalinan.dirujuk_ke"
                  class="mt-1"
                >
                  <div style="width:100%;display: flex;flex-wrap: wrap;">
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Puskesmas">Puskesmas</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="RB">RB</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="RSIA">RSIA</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Lainnya">Lainnya</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Tidak Dirujuk">Tidak Dirujuk</b-form-radio></div>
                    <div style="width:33.33%;padding:0 5px;"><b-form-radio value="Klinik">Klinik</b-form-radio></div>
                  </div>
                </b-form-radio-group>
                
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Keadaan Tiba</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group
                  id=""
                  v-model="mData.data_persalinan.keadaan_tiba"
                  class="mt-1"
                >
                  <b-form-radio value="Hidup">
                    <span>Hidup</span>
                  </b-form-radio>
                  <b-form-radio value="Mati">
                    <span>Mati</span>
                  </b-form-radio>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Keadaan Pulang</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-radio-group
                  id=""
                  v-model="mData.data_persalinan.keadaan_pulang"
                  class="mt-1"
                >
                  <b-form-radio value="Hidup">
                    <span>Hidup</span>
                  </b-form-radio>
                  <b-form-radio value="Mati">
                    <span>Mati</span>
                  </b-form-radio>
                </b-form-radio-group>
              </b-td>
            </b-tr>

            <b-tr>
              <b-td style="width:30%;vertical-align: top !important;">Alamat Bersalin</b-td>
              <b-td style="width:2%;vertical-align: top !important;">:</b-td>
              <b-td>
                <b-form-input
                  type="text"
                  v-model="mData.data_persalinan.alamat_bersalin"
                ></b-form-input>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>

      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <b-button variant="primary" style="margin-right:10px">Cetak</b-button>
          <b-button v-if="update" @click="simpanData()" variant="warning">Update</b-button>
          <b-button v-else @click="simpanData()" variant="success" :disabled="busy">
            <b-spinner v-if="busy" variant="light" label="Spinning"></b-spinner>
            <span v-else>Simpan</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>

export default {
  components:{
  
  },
  // props: [
  // 'dataAnamnesa',
  // 'kunjungan',
  // 'listDokter',
  // ],
  props: {
    mData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
  },
  data() {
    return {
      nama_pasien: null,
      tgl_kala_laten: null,
      jam_kala_laten: null,
      tgl_kala_aktif: null,
      jam_kala_aktif: null,
      tgl_kala_ii: null,
      jam_kala_ii: null,
      tgl_bayi_lahir: null,
      jam_bayi_lahir: null,
      tgl_plasenta_lahir: null,
      jam_plasenta_lahir: null,
      pendahan_kala_iv: null,
      usia_kehamilan_persalinan: null,
      usia_hpht: null,
      keadaan_ibu: null,
      keadaan_bayi: null,
      berat_badan_bayi: null,
      data_persalinan: {
        presentasi: null,
        tempat: null,
        penolong: null,
        cara_persalinan: null,
        manajemen_aktif_kalah: [],
        pelayanan: [],
        integrasi_program: null,
        arv_progilaksi: null,
        komplikasi: null,
        dirujuk_ke: null,
        keadaan_tiba: null,
        keadaan_pulang: null,
        alamat_bersalin: null,
      },
      data_observasi: [],
      waktu_observasi: null,
      dokter_id: null,
      hasil_pemeriksaan: null,
      busy: false,
      invalid: false,
      update: false,

      observasi: {},
    }
  },
  computed: {
    usia_(){
      return this.$store.state.usia_kehamilan
    },
    kia_id(){
      return this.$store.state.kia_id
    },
  },
  watch: {
    // kia_id(newVal, oldVal){
    //   if(newVal != oldVal){
    //     if(newVal){
    //       this.getData()
    //     }
    //   }
    // },
    usia_(newVal, oldVal){
      if(newVal != oldVal){
        if(!this.usia_hpht){
          this.usia_hpht = this.usia_
        }
      }
    },
    // kunjungan(newVal, oldVal){
    //   if(newVal != oldVal){
    //     // console.log(this.dataAnamnesa, 'agduawgbgukcfagsukchbasikkhcdawwgbduka');
    //     this.nama_pasien = this.kunjungan.nama_lengkap
    //   }
    // },
  },
  methods: {
    simpanData() {
      console.log('simpanData')
      this.$parent.$parent.updateAssesmenTambahan();
    },
    simpan(){
      let vm = this
      vm.busy = true
      // console.log(vm.data_persalinan, 'ini');
      let data = {}
      let kosong = 0
      data.tanggal_pengamatan_persalinan = vm.$moment(new Date()).format("YYYY-MM-DD")
      if(vm.tgl_kala_laten && vm.jam_kala_laten){
        data.kala_laten = `${vm.$moment(vm.tgl_kala_laten).format("YYYY-MM-DD")} ${vm.jam_kala_laten}`
      }else{
        kosong += 1
        data.kala_laten = null
      }
      if(vm.tgl_kala_aktif && vm.jam_kala_aktif){
        data.kala_aktif = `${vm.$moment(vm.tgl_kala_aktif).format("YYYY-MM-DD")} ${vm.jam_kala_aktif}`
      }else{
        kosong += 1
        data.kala_aktif = null
      }
      if(vm.tgl_kala_ii && vm.jam_kala_ii){
        data.kala_ii = `${vm.$moment(vm.tgl_kala_ii).format("YYYY-MM-DD")} ${vm.jam_kala_ii}`
      }else{
        kosong += 1
        data.kala_ii = null
      }
      if(vm.tgl_bayi_lahir && vm.jam_bayi_lahir){
        data.bayi_lahir = `${vm.$moment(vm.tgl_bayi_lahir).format("YYYY-MM-DD")} ${vm.jam_bayi_lahir}`
      }else{
        kosong += 1
        data.bayi_lahir = null
      }
      if(vm.tgl_plasenta_lahir && vm.jam_plasenta_lahir){
        data.plasenta_lahir = `${vm.$moment(vm.tgl_plasenta_lahir).format("YYYY-MM-DD")} ${vm.jam_plasenta_lahir}`
      }else{
        kosong += 1
        data.plasenta_lahir = null
      }
      // data.kala_aktif = `${vm.$moment(vm.tgl_kala_aktif).format("YYYY-MM-DD")} ${vm.jam_kala_aktif}`
      // data.kala_ii = `${vm.$moment(vm.tgl_kala_ii).format("YYYY-MM-DD")} ${vm.jam_kala_ii}`
      // data.bayi_lahir = `${vm.$moment(vm.tgl_bayi_lahir).format("YYYY-MM-DD")} ${vm.jam_bayi_lahir}`
      // data.plasenta_lahir = `${vm.$moment(vm.tgl_plasenta_lahir).format("YYYY-MM-DD")} ${vm.jam_plasenta_lahir}`
      data.pendahan_kala_iv = vm.pendahan_kala_iv
      data.usia_kehamilan = vm.usia_kehamilan_persalinan
      data.usia_hpht = vm.usia_hpht
      data.keadaan_ibu = vm.keadaan_ibu
      data.keadaan_bayi = vm.keadaan_bayi
      data.berat_badan_bayi = vm.berat_badan_bayi
      data.data_persalinan = vm.data_persalinan
      data.kia_id = vm.$store.state.kia_id
      data.bulk_observasi = vm.data_observasi
      // console.log(data, 'ini final data');
      if(kosong != 0){
        vm.$store.commit('set_alert', {variant: 'danger', msg: "SILAHKAN LENGKAPI DATA KARTU IBU TERLEBIH DAHULU.", showing: true})
      }else {
        vm.$axios.post("/pengamatan_persalinan/register_bulk", data)
        .then((res) => {
          // console.log(res, 'ini responya ui');
          if(res.data.status == 200 && res.data.message == "sukses"){
            vm.busy = false
            vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
          }
          else{
            vm.busy = false
            vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
          }
        })
        .catch((err) => {
          vm.busy = false
          vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
        })
      }
    },
    pushObservasi() {
      let vm = this
      // let tampung = {}
      // tampung.dokter_id = vm.dokter_id.tenaga_medis_id
      // tampung.nama_pemeriksa = vm.dokter_id.nama_tenaga_medis
      // tampung.waktu_observasi = vm.$moment(vm.waktu_observasi).format("YYYY-MM-DD HH:mm:ss")
      // tampung.hasil_pemeriksaan = vm.hasil_pemeriksaan
      // vm.data_observasi.push(tampung)
      // vm.dokter_id = null
      // vm.waktu_observasi = null
      // vm.hasil_pemeriksaan = null


      this.mData.bulk_observasi.push(this.observasi)
      this.observasi = {}
    },
    deleteObservasi(item, idx) {
      this.mData.bulk_observasi.splice(idx, 1)
      // this.$store.commit('set_alert', {variant: 'danger', msg: 'Observasi telah dihapus', showing: true})
      this.$_alert.success('Observasi telah dihapus');
      this.simpanData()
    },
    async getData(){
      let vm = this
      try {
        if(vm.$store.state.kia_id != null){
          let detail = await vm.$axios.post("/pengamatan_persalinan/list", {
          kia_id: vm.$store.state.kia_id
        })
          // console.log(detail, 'ini persalinan');
          if(detail.data.status == 200 && detail.data.data.length){
              let data = detail.data.data[0]
              vm.update = true
              if(data.kala_laten){
                vm.tgl_kala_laten = vm.$moment(data.kala_laten).format("YYYY-MM-DD")
                vm.jam_kala_laten = vm.$moment(data.kala_laten).format("HH:mm")
              }
              if(data.kala_aktif){
                vm.tgl_kala_aktif = vm.$moment(data.kala_aktif).format("YYYY-MM-DD")
                vm.jam_kala_aktif = vm.$moment(data.kala_aktif).format("HH:mm")
              }
              if(data.kala_ii){
                vm.tgl_kala_ii = vm.$moment(data.kala_ii).format("YYYY-MM-DD")
                vm.jam_kala_ii = vm.$moment(data.kala_ii).format("HH:mm")
              }
              if(data.bayi_lahir){
                vm.tgl_bayi_lahir = vm.$moment(data.bayi_lahir).format("YYYY-MM-DD")
                vm.jam_bayi_lahir = vm.$moment(data.bayi_lahir).format("HH:mm")
              }
              if(data.plasenta_lahir){
                vm.tgl_plasenta_lahir = vm.$moment(data.plasenta_lahir).format("YYYY-MM-DD")
                vm.jam_plasenta_lahir = vm.$moment(data.plasenta_lahir).format("HH:mm")
              }
              if(data.usia_kehamilan){
                  vm.usia_kehamilan_persalinan = data.usia_kehamilan
              }
              if(data.usia_hpht){
                  vm.usia_hpht = data.usia_hpht
              }else{
                vm.usia_hpht = vm.usia_
              }
              if(data.keadaan_ibu){
                  vm.keadaan_ibu = data.keadaan_ibu
              }
              if(data.keadaan_bayi){
                  vm.keadaan_bayi = data.keadaan_bayi
              }
              if(data.berat_badan_bayi){
                  vm.berat_badan_bayi = data.berat_badan_bayi
              }
              if(data.data_persalinan){
                  vm.data_persalinan = data.data_persalinan
              }
              if(data.data_observasi){
                  vm.data_observasi = data.data_observasi
                  for (let i = 0; i < vm.data_observasi.length; i++) {
                    let x = vm.data_observasi[i];
                    if(x.waktu_observasi){
                      x.waktu_observasi = vm.$moment(x.waktu_observasi).format("YYYY-MM-DD HH:mm:ss")
                    }
                  }
              }
              
          }
        }
        
      } catch (error) {
          console.log(error)
      }
    },
    resetData(){
      let vm = this
      vm.nama_pasien = null,
      vm.tgl_kala_laten = null,
      vm.jam_kala_laten = null,
      vm.tgl_kala_aktif = null,
      vm.jam_kala_aktif = null,
      vm.tgl_kala_ii = null,
      vm.jam_kala_ii = null,
      vm.tgl_bayi_lahir = null,
      vm.jam_bayi_lahir = null,
      vm.tgl_plasenta_lahir = null,
      vm.jam_plasenta_lahir = null,
      vm.pendahan_kala_iv = null,
      vm.usia_kehamilan_persalinan = null,
      vm.usia_hpht = null,
      vm.keadaan_ibu = null,
      vm.keadaan_bayi = null,
      vm.berat_badan_bayi = null,
      vm.data_persalinan = {
        presentasi: null,
        tempat: null,
        penolong: null,
        cara_persalinan: null,
        manajemen_aktif_kalah: [],
        pelayanan: [],
        integrasi_program: null,
        arv_progilaksi: null,
        komplikasi: null,
        dirujuk_ke: null,
        keadaan_tiba: null,
        keadaan_pulang: null,
        alamat_bersalin: null,
      }
      vm.data_observasi = [],
      vm.waktu_observasi = null
      vm.dokter_id = null
      vm.hasil_pemeriksaan = null
    },
  }
}
</script>

<style scoped>
.custom-table-kartu-ibu th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
}

.custom-table-kartu-ibu th, td{
 border:1px solid #F1F1F1 !important
}

.custom-table-kartu-ibu th:nth-child(1) {
  border-top-left-radius: 8px;
}

.custom-table-kartu-ibu th:nth-child(3) {
  border-top-right-radius: 8px;
}

.custom-table-observasi th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
}

.custom-table-observasi th, td{
 border:1px solid #F1F1F1 !important
}

.custom-table-observasi th:nth-child(1) {
  border-top-left-radius: 8px;
}

.custom-table-observasi th:nth-child(4) {
  border-top-right-radius: 8px;
}

.custom-table-radio td{
  border:hidden !important
}
</style>