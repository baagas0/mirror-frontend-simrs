<template>
  <div id="page-pengamatan-kehamilan" class="w-100">
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-button v-b-toggle.collapse-1 variant="light" block style="background-color: #D52F65;color: #fff;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">
          <div style="display: flex;justify-content: space-between;">
            <span style="font-weight:700">Riwayat Kehamilan 2</span>
            <!-- <span><CIcon name="cil-caret-bottom" /></span> -->
            <i class="ri-arrow-down-double-fill text-white"></i>
          </div>
        </b-button>
        <b-collapse visible  id="collapse-1">
          <b-card style="border: 1px solid #D3D3D3">
            <b-row>
              <p>Riwayat Kehamilan</p>
              <b-col cols="12" sm="12" md="12" lg="12" class="custom-table-riwayat">
                <b-table-simple class="table-sm">
                  <b-thead>
                    <b-tr>
                      <b-th class="table-number">No.</b-th>
                      <b-th>Faskes Asal</b-th>
                      <b-th>Nama Pasien</b-th>
                      <b-th>NIK</b-th>
                      <b-th>HPHT</b-th>
                      <b-th>Taksiran Kehamilan</b-th>
                      <b-th>G</b-th>
                      <b-th>P</b-th>
                      <b-th>A</b-th>
                      <b-th class="table-number">Aksi</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tr v-for="(item, idx) in list_riwayat" :key="idx">
                    <b-td>{{ idx + 1 }}</b-td>
                    <b-td>{{ item.nama_puskesmas }}</b-td>
                    <b-td>{{ item.nama_lengkap }}</b-td>
                    <b-td>{{ item.nik }}</b-td>
                    <b-td>{{ item.hpht }}</b-td>
                    <b-td>{{ item.taksiran_kehamilan }}</b-td>
                    <b-td>{{ item.gravida }}</b-td>
                    <b-td>{{ item.partus }}</b-td>
                    <b-td>{{ item.abortus }}</b-td>
                    <b-td><b-button variant="primary" class="mr-2" v-b-modal.modal-riwayat-pengamatan-kehamilan><CIcon name="cil-search" /></b-button></b-td>
                  </b-tr>
                </b-table-simple>
              </b-col>
            </b-row>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row class="random-card mt-3 mb-3">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-card>
          <b-row>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
              <h6 class="custom-title">Pengamatan Kehamilan</h6>
            </b-col>
          </b-row>

          <b-row style="margin-top: 15px;">

            <b-col cols="12" sm="12" md="6" lg="6">
              <!-- <b-form-group label-cols-md="4">
                <template v-slot:label>
                  Nama Kader
                </template>
                <b-form-input
                  type="text"
                  v-model="mData.pengamatan_kehamilan.nama_kader"
                ></b-form-input>
              </b-form-group>
              <b-form-group label-cols-md="4">
                <template v-slot:label>
                  Nama Dukun
                </template>
                <b-form-input
                  type="text"
                  v-model="mData.pengamatan_kehamilan.nama_dukun"
                ></b-form-input>
              </b-form-group> -->

              <b-form-group label-cols-md="4">
                <template v-slot:label>
                 Golongan Darah
                </template>
                <!-- <Multiselect
                  v-model="mData.pengamatan_kehamilan.golongan_darah"
                  :options="options_darah"
                  :multiple="false"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="false"
                  label="nama_golongan_darah"
                  track-by="id"
                  size="sm"
                ></Multiselect> -->
                <b-form-select
                  :options="options_darah"
                  v-model="mData.pengamatan_kehamilan.golongan_darah"
                ></b-form-select>
              </b-form-group>

              <b-form-group label-cols-md="4">
                <template v-slot:label>
                  Telepon / Hp
                </template>
                <b-form-input
                  type="text"
                  v-model="mData.pengamatan_kehamilan.no_telp"
                  placeholder=""
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="random-card">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <!-- <b-card-group columns> -->

          <div class="row">
            <div class="col-xl-4 col-lg-6 col-sm-12 mb-2">
              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 class="custom-title">Riwayat Pasien</h6>
                  </b-col>
                </b-row>
    
                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Riwayat Komplikasi Kebidanan
                      </template>
                      <b-form-input
                        type="text"
                        v-model="mData.riwayat_pasien.riwayat_komplikasi"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Penyakit Kronis dan Alergi
                      </template>
                      <b-form-input
                        type="text"
                        v-model="mData.riwayat_pasien.penyakit_kronis"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Riwayat Penyakit
                      </template>
                      <b-form-input
                        type="text"
                        v-model="mData.riwayat_pasien.riwayat_penyakit"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-sm-12 mb-2">
              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 class="custom-title">Riwayat Obstetrik</h6>
                  </b-col>
                </b-row>
    
                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Gravida
                      </template>
                      <b-form-input
                        type="number"
                        v-model="mData.riwayat_obstetrik.gravida"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Paritas
                      </template>
                      <b-form-input
                        type="number"
                        v-model="mData.riwayat_obstetrik.partus"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Abortus
                      </template>
                      <b-form-input
                        type="number"
                        v-model="mData.riwayat_obstetrik.abortus"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Hidup
                      </template>
                      <b-form-input
                        type="number"
                        v-model="mData.riwayat_obstetrik.hidup"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-sm-12 mb-2">
              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 class="custom-title">Rencana Persalinan</h6>
                  </b-col>
                </b-row>
    
                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Tanggal
                      </template>
                      <b-form-datepicker
                        style="width: 100%"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        locale="id"
                        no-flip
                        v-model="mData.rencana_persalinan.tanggal_rencana"
                      ></b-form-datepicker>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Penolong
                      </template>
                      <b-form-select
                        :options="option_penolong"
                        v-model="mData.rencana_persalinan.penolong"
                        placeholder="-- Pilih --"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Tempat
                      </template>
                      <b-form-select
                        :options="option_tempat"
                        v-model="mData.rencana_persalinan.tempat"
                        placeholder="-- Pilih --"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Pendamping
                      </template>
                      <b-form-select
                        :options="option_pendamping"
                        v-model="mData.rencana_persalinan.pendamping"
                        placeholder="-- Pilih --"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Transportasi
                      </template>
                      <b-form-select
                        :options="option_transportasi"
                        v-model="mData.rencana_persalinan.transportasi"
                        placeholder="-- Pilih --"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Pendonor
                      </template>
                      <b-form-select
                        :options="option_pendamping"
                        v-model="mData.rencana_persalinan.pendonor"
                        placeholder="-- Pilih --"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-sm-12 mb-2">
              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 class="custom-title">Pemeriksaan Bidan</h6>
                  </b-col>
                </b-row>
    
                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Tanggal HPHT
                      </template>
                      <b-form-datepicker
                        style="width: 100%"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="mData.pemeriksaan_bidan.tanggal_hpht"
                        right
                        no-flip
                        locale="id"
                        @input="setTaksiran(mData.pemeriksaan_bidan.tanggal_hpht)"
                      ></b-form-datepicker>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Taksiran Persalinan
                      </template>
                      <b-form-datepicker
                        style="width: 100%"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="mData.pemeriksaan_bidan.taksiran_persalinan"
                        right
                        no-flip
                        locale="id"
                        disabled
                      ></b-form-datepicker>
    
                      <!-- <b-form-input
                        v-model="mData.pemeriksaan_bidan.taksiran_persalinan"
                        disabled
                      ></b-form-input> -->
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Persalinan Sebelumnya
                      </template>
                      <b-form-datepicker
                        style="width: 100%"
                        right
                        no-flip
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="mData.pemeriksaan_bidan.persalinan_sebelumnya"
                      ></b-form-datepicker>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Buku Kia
                      </template>
                      <b-form-select
                        :options="option_buku_kia"
                        v-model="mData.pemeriksaan_bidan.buku_kia"
                        placeholder="-- Pilih --"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4" class="mt-3">
                      <template v-slot:label>
                        BB Sebelum Hamil
                      </template>
                      <div style="width: 100%;display: flex;">
                        <div style="width:100%;display: flex;">
                          <b-form-input
                             type="number"
                             v-model="mData.pemeriksaan_bidan.bb_sblm_hamil"
                             class="custom-input-text"
                          ></b-form-input>
                          <div class="custom-box-satuan">
                            <h6>kg</h6>
                          </div>
    
                        </div>
                      </div>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Tinggi Badan
                      </template>
                      <div style="width: 100%;display: flex;">
                        <div style="width:100%;display: flex;">
                          <b-form-input
                             type="number"
                             v-model="mData.pemeriksaan_bidan.tinggi_badan"
                             class="custom-input-text"
                          ></b-form-input>
                          <div class="custom-box-satuan">
                            <h6>cm</h6>
                          </div>
    
                        </div>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-sm-12 mb-2">
              <b-card>
                <b-row>
                  <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h6 class="custom-title">Resiko Kehamilan</h6>
                  </b-col>
                </b-row>
    
                <b-row style="margin-top: 15px;">
                  <b-col cols="12" sm="12" md="12" lg="12">
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Skor Ibu (KSPR)
                      </template>
                      <b-form-input
                        type="number"
                        v-model="mData.risiko_kehamilan.skor_kspr"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Resiko
                      </template>
                      <b-form-select
                        :options="options_resiko"
                        v-model="mData.risiko_kehamilan.resiko"
                      ></b-form-select>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Sebutkan Jenis Resiko Tinggi
                      </template>
                      <b-form-input
                        type="text"
                        v-model="mData.risiko_kehamilan.jenis_resiko"
                      ></b-form-input>
                    </b-form-group>
    
                    <b-form-group label-cols-md="4">
                      <template v-slot:label>
                        Resiko Kasuistik
                      </template>
                      <b-form-select
                        :options="option_kasuistik"
                        v-model="mData.risiko_kehamilan.resiko_kasuistik"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </div>




        <!-- </b-card-group> -->
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr/>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width: 100%;display: flex;justify-content: flex-end;">
          <b-button variant="light" class="mr-2">Reset</b-button>
          <b-button variant="secondary" class="mr-2" @click="printKehamilan('cetak_kehamilan')">Cetak</b-button>
          <b-button v-if="status_kia == 1" @click="updateData()" variant="warning">Update</b-button>
          <b-button v-else @click="simpanData()" variant="success">Simpan</b-button>

        </div>
      </b-col>
    </b-row>

    <!-- modal riwayat pengamatan kehamilan -->
    <b-modal id="modal-riwayat-pengamatan-kehamilan" size="xl" title="Riwayat Kehamilan">
      <div style="padding:0 15px;" >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h5 style="text-align:center"><strong>PEMERIKSAAN KEHAMILAN</strong></h5>
            <!-- <hr style="margin:10px 0;"> -->
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">ID KIA</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Dokter / Tenaga Medis</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Posyandu</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Dukun</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Telp. / Hp</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Tanggal</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Perawat / Bidan / Nutrisionist / Sanitarian</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Kader</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Golongan Darah</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>RIWAYAT PASIEN</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Riwayat Komplikasi Kebidanan</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Penyakit Kronis dan Alergi</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>RIWAYAT PASIEN</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Gravida</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Abortus</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Partus</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Hidup</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>RENCANA PERSALINAN</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Tanggal</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Tempat</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Transportasi</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Penolong</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Pendamping</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Pendonor</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>REMERIKSAAN BIDAN</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Tanggal HPHT</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Persalinan Sebelumnya</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>BB Sebelum Hamil</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Taksiran Persalinan</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Buku KIA</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Tinggi Badan</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>RESIKO</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Skor Ibu (KSPR)</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Sebutkan Jenis Resiko Tinggi</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Resiko</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Resiko Kasuistik</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h5 style="text-align:center"><strong>PEMERIKSAAN ANTENATAL</strong></h5>
            <!-- <hr style="margin:10px 0;"> -->
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="custom-table-antenashit">
              <b-table-simple responsive>
                <b-thead>
                  <b-tr>
                    <b-th rowspan="4">No</b-th>
                    <b-th colspan="6">Register</b-th>
                    <b-th colspan="16">Pemeriksaan</b-th>
                    <b-th rowspan="4">Jumlah Janin</b-th>
                    <b-th rowspan="4">Konseling</b-th>
                    <b-th rowspan="4">Status Imuninasi TT</b-th>
                    <b-th colspan="5">Pelayanan</b-th>
                    <b-th colspan="10">laboratorium</b-th>
                    <b-th colspan="55">Integrasi Program</b-th>
                    <b-th rowspan="4">Keterangan</b-th>
                  </b-tr>
                  <b-tr>
                    <b-th rowspan="3">Tanggal</b-th>
                    <b-th rowspan="3">Kunjungan</b-th>
                    <b-th rowspan="3">Cara Masuk <sup>1)</sup></b-th>
                    <b-th rowspan="3">Nama Faskes</b-th>
                    <b-th rowspan="3">Usia Kehamilan</b-th>
                    <b-th rowspan="3">Trisementer ke-</b-th>
                    <b-th colspan="8">Ibu</b-th>
                    <b-th colspan="8">Bayi</b-th>
                    <b-th rowspan="3">Injeksi b-th</b-th>
                    <b-th rowspan="3">Catat dibuku KIA</b-th>
                    <b-th rowspan="3">Stiker P4K</b-th>
                    <b-th rowspan="3">Fe (Tab/Botol)</b-th>
                    <b-th rowspan="3">PMT</b-th>
                    <b-th colspan="2">Periksa HB</b-th>
                    <b-th rowspan="3">Protein</b-th>
                    <b-th rowspan="3">Reduksi</b-th>
                    <b-th rowspan="3">Gula Darah</b-th>
                    <b-th rowspan="3">Thalasemia (+/-)</b-th>
                    <b-th rowspan="3">Sifilis (+/-)</b-th>
                    <b-th rowspan="3">HBsAg (+/-)</b-th>
                    <b-th rowspan="3">Anemia (+/-)</b-th>
                    <b-th rowspan="3">HIV (+/-)</b-th>
                    <b-th colspan="11">Pencegahan Penularan HIV dari Ibu ke Anak (PPIA)</b-th>
                    <b-th colspan="7">Pencegahan Malaria Dalam Kehamilan (PMDK)</b-th>
                    <b-th colspan="3">TB Dalam Kehamilan</b-th>
                    <b-th colspan="3">Kecacingan dalam Kehamilan</b-th>
                    <b-th colspan="3">Pencegahan PMS dalam Kehamilan</b-th>
                    <b-th colspan="9">Resiko Terdeteksi Oleh <sup>**</sup></b-th>
                    <b-th colspan="6">Komplikasi <sup>**</sup></b-th>
                    <b-th colspan="5">Kegiatan Rujukan <sup>**</sup></b-th>
                    <b-th colspan="6">Konseling dan Kelas Ibu Hamil</b-th>
                    <b-th rowspan="3">Keadaan<br />
                    Tiba (H/M)</b-th>
                    <b-th rowspan="3">Keadaan<br />
                    Pulang (H/M)</b-th>
                  </b-tr>
                  <b-tr>
                    <b-th rowspan="2">Skor Ibu KSPR</b-th>
                    <b-th rowspan="2">BB (Kg)</b-th>
                    <b-th rowspan="2">Tinggi Badan</b-th>
                    <b-th rowspan="2">b-th (mmHg)</b-th>
                    <b-th rowspan="2">LILA (cm)</b-th>
                    <b-th rowspan="2">Status Gizi <sup>2)</sup></b-th>
                    <b-th rowspan="2">TFU (cm)</b-th>
                    <b-th rowspan="2">Refleks Patella (+/-)</b-th>
                    <b-th colspan="4">Tunggal</b-th>
                    <b-th colspan="4">Jamak</b-th>
                    <b-th rowspan="2">Dilakukan <sup>*</sup></b-th>
                    <b-th rowspan="2">Hasil (gr/dl)</b-th>
                    <b-th rowspan="2">Datang dengan HIV (+/-)</b-th>
                    <b-th rowspan="2">Ditawarkan Tes</b-th>
                    <b-th rowspan="2">Dilakukan Tes</b-th>
                    <b-th rowspan="2">Hasil Tes HIV (+/-)</b-th>
                    <b-th rowspan="2">Mendapatkan ART</b-th>
                    <b-th colspan="2">Ibu hamil</b-th>
                    <b-th rowspan="2">VCT (PICT)</b-th>
                    <b-th rowspan="2">Periksa Darah</b-th>
                    <b-th rowspan="2">Serologi (+/-)</b-th>
                    <b-th rowspan="2">ARV Profilaksis</b-th>
                    <b-th rowspan="2">Diberikan Kelambu<br />
                    &nbsp;Berinsteksida</b-th>
                    <b-th colspan="2">Darah Malaria Diperiksa Ibu Hamil</b-th>
                    <b-th colspan="2">Ibu Hamil Malaria</b-th>
                    <b-th rowspan="2">Hasil Tes<br />
                    Darah Malaria (+/-)</b-th>
                    <b-th rowspan="2">Obat Kina/ACT <sup>***</sup><br />
                    &nbsp;(+/-)</b-th>
                    <b-th rowspan="2">Diperiksa<br />
                    dahak <sup>*</sup></b-th>
                    <b-th rowspan="2">TBC (+/-)</b-th>
                    <b-th rowspan="2">Obat <sup>***</sup></b-th>
                    <b-th rowspan="2">Diperiksa<br />
                    Ankylostoma</b-th>
                    <b-th rowspan="2">Ibu Hamil Tes<br />
                    (+/-)</b-th>
                    <b-th rowspan="2">Diobati</b-th>
                    <b-th rowspan="2">Diperiksa<br />
                    Hepatitis&nbsp;</b-th>
                    <b-th rowspan="2">Hasil Tes<br />
                    (+/-)</b-th>
                    <b-th rowspan="2">Diobati</b-th>
                    <b-th rowspan="2">Pasien</b-th>
                    <b-th rowspan="2">Keluarga</b-th>
                    <b-th rowspan="2">Masyarakat</b-th>
                    <b-th rowspan="2">Dukun</b-th>
                    <b-th rowspan="2">Kader</b-th>
                    <b-th rowspan="2">Bidan</b-th>
                    <b-th rowspan="2">Perawat</b-th>
                    <b-th rowspan="2">Dokter</b-th>
                    <b-th rowspan="2">DSOG</b-th>
                    <b-th rowspan="2">HDK</b-th>
                    <b-th rowspan="2">Abortus</b-th>
                    <b-th rowspan="2">Pendarahan</b-th>
                    <b-th rowspan="2">Infeksi</b-th>
                    <b-th rowspan="2">KPD</b-th>
                    <b-th rowspan="2">Lainnya</b-th>
                    <b-th rowspan="2">Puskesmas</b-th>
                    <b-th rowspan="2">RB</b-th>
                    <b-th rowspan="2">RSIA/RSB</b-th>
                    <b-th rowspan="2">RS</b-th>
                    <b-th rowspan="2">Lainnya</b-th>
                    <b-th rowspan="2">Konseling</b-th>
                    <b-th rowspan="2">materi</b-th>
                    <b-th rowspan="2">Rekomendasi Berdasarkan<br />
                    Hasil&nbsp; Pemeriksaan dan Laboratorium</b-th>
                    <b-th rowspan="2">Kelas Ibu Hamil</b-th>
                    <b-th rowspan="2">Sejak Usia Kehamilan<br />
                    &nbsp;(minggu)</b-th>
                    <b-th rowspan="2">Frekunsi</b-th>
                  </b-tr>
                  <b-tr>
                    <b-th>DJJ (x/menit)</b-th>
                    <b-th>Kepala thd PAP <sup>3)</sup></b-th>
                    <b-th>TBJ (gr)</b-th>
                    <b-th>Presentasi <sup>4)</sup></b-th>
                    <b-th>DJJ(x/menit)</b-th>
                    <b-th>Terhadap thd PAP</b-th>
                    <b-th>TBJ (gr)</b-th>
                    <b-th>Presentasi <sup>4)</sup></b-th>
                    <b-th>Persalinan Pervaginaan <sup>4)</sup></b-th>
                    <b-th>Persalinan Pravdoinan <sup>4)</sup></b-th>
                    <b-th>Diperiksa RDT</b-th>
                    <b-th>Mikroskopis</b-th>
                    <b-th>Diperiksa RDT</b-th>
                    <b-th>Mikroskopis</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                    <b-td>-</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h5 style="text-align:center"><strong>PENGAMATAN PERSALINAN</strong></h5>
            <!-- <hr style="margin:10px 0;"> -->
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>DATA PENGAMATAN PERSALINAN</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Tanggal</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Nama Pasien</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>KARTU IBU 123</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6">
            <b-table-simple>
              <b-thead>
                <b-tr>
                  <b-th>Persalinan</b-th>
                  <b-th>Tanggal</b-th>
                  <b-th>Jam</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td>Kala Laten</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Kala Aktif</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Kala II</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Bayi Lahir</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Plasenta Lahir</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td colspan="2">Pendahan Kala IV 2 Jam Postpartum</b-td>
                  <b-td>cc</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" sm="12" md="12" lg="6" xl="6" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Usia Kehamilan</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>- Minggu</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Usia HPHT</b-td>
                  <b-td>:</b-td>
                  <b-td>- Minggu</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Keadaan Ibu</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Keadaan Bayi</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Berat Badan Bayi</b-td>
                  <b-td>:</b-td>
                  <b-td>- Gram</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h6><strong>OBSERVASI</strong></h6>
            <hr style="margin:10px 0;">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <b-table-simple>
              <b-thead>
                <b-tr>
                  <b-th>Tanggal</b-th>
                  <b-th>Nama Pemeriksa</b-th>
                  <b-th>Hasil Pemeriksaan</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="custom-table-detail-riwayat">
            <b-table-simple>
              <b-tbody>
                <b-tr>
                  <b-td style="width:200px">Presentasi</b-td>
                  <b-td style="width:10px">:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Tempat</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Penolong</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Cara Persalinan</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Manajemen Aktif Kalah III</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Pelayanan</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Integrasi Program</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>ARV Progilaksi Pada Bayi Baru</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Komplikasi</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Dirujuk ke-</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>

                <b-tr>
                  <b-td>Alamat Bersalin</b-td>
                  <b-td>:</b-td>
                  <b-td>-</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <h5 style="text-align:center"><strong>PENGAMATAN NIFAS</strong></h5>
            <!-- <hr style="margin:10px 0;"> -->
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="custom-table-antenashit">
            <b-table-simple responsive>
              <b-thead>
                <b-tr>
                  <b-th rowspan="2">Tanggal PNC</b-th>
                  <b-th rowspan="2">Hari ke-KF</b-th>
                  <b-th colspan="14">Tanda Vital</b-th>
                  <b-th colspan="3">Pelayanan</b-th>
                  <b-th colspan="5">Integrasi Program</b-th>
                  <b-th colspan="4">Komplikasi <sup>**</sup></b-th>
                  <b-th colspan="5">Dirujuk ke <sup>**</sup></b-th>
                  <b-th colspan="2">Keadaan</b-th>
                  <b-th rowspan="2">Metode Kontrasepsi</b-th>
                  <b-th rowspan="2">Rencana</b-th>
                  <b-th rowspan="2">Pelaksanaan</b-th>
                </b-tr>
                <b-tr>
                  <b-th>TD (mmHg)</b-th>
                  <b-th>Suhu</b-th>
                  <b-th>Respirasi</b-th>
                  <b-th>Nadi</b-th>
                  <b-th>Pendarahan Pervaginam</b-th>
                  <b-th>Kondisi Perineum</b-th>
                  <b-th>Tanda Infeksi</b-th>
                  <b-th>Kontraksi Uteri</b-th>
                  <b-th>Pemeriksaan Jalan Lahir</b-th>
                  <b-th>Pemeriksaan Payudara</b-th>
                  <b-th>Produksi ASI</b-th>
                  <b-th>Penanganan Resiko Tinggi dan Komplikasi</b-th>
                  <b-th>Buang Air Besar</b-th>
                  <b-th>Buang Air Kecil</b-th>
                  <b-th>Catatan di Buku KIA</b-th>
                  <b-th>Fe (Tab/Botol)</b-th>
                  <b-th>Vit.A <sup>*</sup></b-th>
                  <b-th>ART (+/-)</b-th>
                  <b-th>CD4 (Komplikasi)</b-th>
                  <b-th>Anti Malaria <sup>***</sup></b-th>
                  <b-th>Anti TB <sup>***</sup></b-th>
                  <b-th>Foto Thorax (+/-)</b-th>
                  <b-th>PPP</b-th>
                  <b-th>Infeksi</b-th>
                  <b-th>HDK</b-th>
                  <b-th>Lainnya</b-th>
                  <b-th>PKM</b-th>
                  <b-th>RB</b-th>
                  <b-th>RSIA/RSB</b-th>
                  <b-th>RS</b-th>
                  <b-th>Lainnya</b-th>
                  <b-th>Tiba(H/M)</b-th>
                  <b-th>Pulang (H/M)</b-th>
                </b-tr>
              </b-thead>
            </b-table-simple>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <div id="cetak_kehamilan" style="display: none; position: relative;">
      <div class="page" size="A4">
        <div class="w-100">
          <table border="0" class="custom-table">
            <tbody>
              <tr>
                <td style="width: 15%;vertical-align: middle;border-bottom: 1px solid #333;padding-left: 1.5mm;padding-right: 1.5mm;"><img src="puskesmas-logo.png" alt="" style="width: 100%;"></td>
                <td style="width: 70%;vertical-align: middle;border-bottom: 1px solid #333;">
                  <h6 style="text-align: center;font-weight: bold;margin-bottom: 6px;font-size: 16pt;">PEMERINTAH KABUPATEN/KOTA <span>NAMA KABKOT</span> </h6>
                  <h6 style="text-align: center;font-weight: bold;margin-bottom: 6px;font-size: 16pt;"><span>DINAS KESEHATAN</span></h6>
                  <h6 style="text-align: center;font-weight: bold;margin-bottom: 6px;font-size: 16pt;">PUSKESMAS <span>NAMA PUSKESMAS</span> </h6>
                  <h6 style="text-align: center;font-weight: normal;font-size: 10pt;"><span>Jl. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, nulla</span></h6>
                  <h6 style="text-align: center;font-weight: normal;font-size: 10pt;"><span>Email : emailpuskesmas@gmil.com</span> <span>Telp. : 0987654321</span></h6>
                </td>
                <td style="width: 15%;vertical-align: middle;border-bottom: 1px solid #333;padding-left: 1.5mm;padding-right: 1.5mm;"><img src="puskesmas-logo.png" alt="" style="width: 100%;"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="w-100" style="margin-top: 5mm;">
          <h6 style="font-size: 16pt;font-weight: bold;text-align: center;">DATA KIA - KEHAMILAN</h6>
        </div>

        <div class="w-100" style="margin-top: 5mm;">
          <table border="0" class="custom-table">
              <tbody>
                  <tr>
                      <td style="width: 75mm;">Tanggal</td>
                      <td class="autowidth">:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Poli/Ruangan</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>No. eRM</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>No. RM Lama</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>NIK</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Nama</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Jenis Kelamin</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Tempat / Tanggal Lahir</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Umur</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Asuransi</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Dokter / Tenaga Medis</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Perawat / Bidan / Nutrisionist / Sanitarian</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Posyandu</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Nama Kader</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Nama Dukun</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <div class="w-100" style="margin-top: 5mm;">
          <table border="0" class="custom-table">
              <tbody>
                  <tr>
                      <td colspan="3" style="font-weight: bold;">Riwayat Pasien</td>
                  </tr>
                  <tr>
                      <td style="width: 75mm;">Riwayat Komplikasi</td>
                      <td class="autowidth">:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Penyakit Kronis dan Alergi</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <div class="w-100" style="margin-top: 5mm;">
          <table border="0" class="custom-table">
              <tbody>
                  <tr>
                      <td colspan="3" style="font-weight: bold;">Pemeriksaan Bidan</td>
                  </tr>
                  <tr>
                      <td style="width: 75mm;">Tanggal HPHT</td>
                      <td class="autowidth">:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Taksiran Persalinan</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Persalinan Sebelumnya</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Persalinan Sebelumnya</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <div class="w-100" style="margin-top: 5mm;">
          <table border="0" class="custom-table">
              <tbody>
                  <tr>
                      <td colspan="3" style="font-weight: bold;">Pemeriksaan Obstetrik</td>
                  </tr>
                  <tr>
                      <td style="width: 75mm;">Gravida</td>
                      <td class="autowidth">:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Partus</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Abortus</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Hidup</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <div class="w-100" style="margin-top: 5mm;">
          <table border="0" class="custom-table">
              <tbody>
                  <tr>
                      <td colspan="3" style="font-weight: bold;">Rencana Persalinan</td>
                  </tr>
                  <tr>
                      <td style="width: 75mm;">Tanggal</td>
                      <td class="autowidth">:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Penolong</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Tempat</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Pendamping</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Transportasi</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>

                  <tr>
                      <td>Pendonor</td>
                      <td>:</td>
                      <td><span>-</span></td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// INI PAKE KIA
export default {
  components:{

  },
  props: {
    // 'mData',
    mData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    // 'listDokter',
    // 'listPerawat'
  },
  data() {
    return {
      dokter: "",
      perawat: "",
      option_penolong: [
        {value: "Keluarga", text: "Keluarga"},
        {value: "Dukun", text: "Dukun"},
        {value: "Bidan", text: "Bidan"},
        {value: "dr. Umum", text: "dr. Umum"},
        {value: "dr. Spesialis", text: "dr. Spesialis"},
        {value: "Lain-lain", text: "Lain-lain"},
        {value: "Tidak ada", text: "Tidak ada"},
      ],
      options_darah: [],
      options_resiko: [
        {value: "Resiko Rendah", text: "Resiko Rendah"},
        {value: "Resiko Tinggi", text: "Resiko Tinggi"},
        {value: "Resiko Sangat Tinggi", text: "Resiko Sangat Tinggi"},
      ],
      option_tempat: [
        {value: "Rumah", text: "Rumah"},
        {value: "Polides", text: "Polides"},
        {value: "Pustu", text: "Pustu"},
        {value: "Puskesmas", text: "Puskesmas"},
        {value: "RB", text: "RB"},
        {value: "RSIA", text: "RSIA"},
        {value: "RS", text: "RS"},
        {value: "RS ODHA", text: "RS ODHA"},
        {value: "Klinik", text: "Klinik"},
      ],
      option_kasuistik: [
        {value: "HIV/AIDS", text: "HIV/AIDS"},
        {value: "HbsAg", text: "HbsAg"},
        {value: "Gangguan Kardiovaskular", text: "Gangguan Kardiovaskular"},
        {value: "Penyakit Ginjal Kronis", text: "Penyakit Ginjal Kronis"},
        {value: "Lupus", text: "Lupus"},
        {value: "Depresi", text: "Depresi"},
        {value: "Tekanan Darah Tinggi", text: "Tekanan Darah Tinggi"},
        {value: "Obesitas", text: "Obesitas"},
        {value: "Diabetes", text: "Diabetes"},
        {value: "Penyakit Tiroid", text: "Penyakit Tiroid"},
      ],
      option_pendamping: [
        {value: "Keluarga", text: "Keluarga"},
        {value: "Suami", text: "Suami"},
        {value: "Teman", text: "Teman"},
        {value: "Tetangga", text: "Tetangga"},
        {value: "Lainnya", text: "Lainnya"},
      ],
      option_transportasi: [
        {value: "Ambulan Desa", text: "Ambulan Desa"},
        {value: "Ambulan Puskesmas", text: "Ambulan Puskesmas"},
        {value: "Ambulan Swasta", text: "Ambulan Swasta"},
        {value: "Kendaraan Pribadi", text: "Kendaraan Pribadi"},
        {value: "Kendaraan Umum", text: "Kendaraan Umum"},
      ],
      option_buku_kia: [
        {value: "Memiliki", text: "Memiliki"},
        {value: "Tidak Memiliki", text: "Tidak Memiliki"},
      ],
      pengamatan_kehamilan: {
        nama_dokter: "",
        nama_perawat: "",
        ms_dokter_id: "",
        ms_perawat_id: "",
        posyandu: "",
        nama_kader: "",
        nama_dukun: "",
        golongan_darah: "",
        no_telp: "",
      },
      riwayat_pasien: {
        riwayat_komplikasi: "",
        penyakit_kronis: "",
        riwayat_penyakit: "",
      },
      riwayat_obstetrik: {
        gravida: "",
        partus: "",
        abortus: "",
        hidup: "",
      },
      rencana_persalinan: {
        tanggal_rencana: "",
        penolong: "",
        tempat: "",
        pendamping: "",
        transportasi: "",
        pendonor: "",
      },
      pemeriksaan_bidan: {
        tanggal_hpht: "",
        taksiran_persalinan: "",
        persalinan_sebelumnya: "",
        buku_kia: "",
        bb_sblm_hamil: "",
        tinggi_badan: "",
      },
      risiko_kehamilan: {
        skor_kspr: "",
        resiko: "",
        jenis_resiko: "",
        resiko_kasuistik: "",
      },
      list_riwayat: [],
      status_kia: null,
    }
  },
  mounted(){
    this.getData()
    console.log('pengamatan_kehamilan', this.mData)
    let vm = this
    // vm.pengamatan_kehamilan.posyandu = this.mData.pengamatan_kehamilan.posyandu || ''
    // vm.pengamatan_kehamilan.nama_kader = this.mData.pengamatan_kehamilan.nama_kader || ''
    // vm.pengamatan_kehamilan.nama_dukun = this.mData.pengamatan_kehamilan.nama_dukun || ''
    // vm.riwayat_pasien = {
    //   riwayat_komplikasi: this.mData.riwayat_pasien.riwayat_komplikasi || '',
    //   penyakit_kronis: this.mData.riwayat_pasien.penyakit_kronis || '',
    //   riwayat_penyakit: this.mData.riwayat_pasien.riwayat_penyakit || '',
    // }
    // vm.riwayat_obstetrik = {
    //   gravida: this.mData.riwayat_obstetrik.gravida,
    //   partus: this.mData.riwayat_obstetrik.partus,
    //   abortus: this.mData.riwayat_obstetrik.abortus,
    //   hidup: this.mData.riwayat_obstetrik.hidup,
    // }
    // vm.rencana_persalinan = {
    //   tanggal_rencana: this.mData.rencana_persalinan.tanggal_rencana || '',
    //   penolong: this.mData.rencana_persalinan.penolong || '',
    //   tempat: this.mData.rencana_persalinan.tempat || '',
    //   pendamping: this.mData.rencana_persalinan.pendamping || '',
    //   transportasi: this.mData.rencana_persalinan.transportasi || '',
    //   pendonor: this.mData.rencana_persalinan.pendonor || '',
    // }
    // vm.pemeriksaan_bidan.tanggal_hpht = this.mData.pemeriksaan_bidan.tanggal_hpht || ''
    // vm.pemeriksaan_bidan.taksiran_persalinan = this.mData.pemeriksaan_bidan.taksiran_persalinan || ''
    // vm.pemeriksaan_bidan.persalinan_sebelumnya = this.mData.pemeriksaan_bidan.persalinan_sebelumnya || ''
    // vm.pemeriksaan_bidan.buku_kia = this.mData.pemeriksaan_bidan.buku_kia || ''
    // vm.pemeriksaan_bidan.bb_sblm_hamil = this.mData.pemeriksaan_bidan.bb_sblm_hamil || ''
    // vm.risiko_kehamilan = {
    //   skor_kspr: this.mData.risiko_kehamilan || '',
    //   resiko: this.mData.risiko_kehamilan || '',
    //   jenis_resiko: this.mData.risiko_kehamilan || '',
    //   resiko_kasuistik: this.mData.risiko_kehamilan || '',
    // }
  },
  computed: {
    reset(){
        return this.$store.state.reset
      },
  },
  watch: {
    // dataAnamnesa: {
    //   handler (data) {
    //     const vm = this
    //     vm.dokter = vm.$findKey(vm.listDokter, data.ms_dokter_id, true, 'tenaga_medis_id')
    //     vm.perawat = vm.$findKey(vm.listPerawat, data.ms_perawat_id, true, 'tenaga_medis_id')
    //     vm.pengamatan_kehamilan.nama_dokter = vm.dokter.nama_tenaga_medis
    //     vm.pengamatan_kehamilan.nama_perawat = vm.perawat.nama_tenaga_medis
    //     vm.pengamatan_kehamilan.ms_dokter_id = vm.dokter.tenaga_medis_id
    //     vm.pengamatan_kehamilan.ms_perawat_id = vm.perawat.tenaga_medis_id
    //     vm.pengamatan_kehamilan.golongan_darah = vm.kunjungan.nama_golongan_darah
    //     // console.log(vm.kunjungan, 'ini kunjungan');
    //     vm.pemeriksaan_bidan.tinggi_badan = data.tinggi_badan
    //     vm.getData()
    //     vm.getList()
    //   },
    //   deep: true
    // },
    mData: {
      deep: true,
      intermediate: true,
      handler(to, from) {
        console.log('jancokkkkkkkk')
      }
    },
    reset(newVal, oldVal){
      if(newVal != oldVal){
        if(newVal == true){
          this.resetData()

        }
      }
    },
  },
  methods: {
    setTaksiran(x){
      let vm = this
      console.log(x)
      vm.mData.pemeriksaan_bidan.taksiran_persalinan = vm.$moment(x).add('280', 'days').format("YYYY-MM-DD")
      console.log('uhuy', vm.mData.pemeriksaan_bidan.taksiran_persalinan);
    },
    async getList(){
      let vm = this
      try {
        let detail = await vm.$_api.post("/kia/list", {
          rm_id: vm.kunjungan.rm_id
        })
        console.log(detail, 'ini list Riwayat');
        if(detail.data.status == 200 && detail.data.length){
            vm.list_riwayat = detail.data.data
            for (let i = 0; i < vm.list_riwayat.length; i++) {
              let x = vm.list_riwayat[i];
              x.hpht = x.pemeriksaan_bidan.tanggal_hpht
              x.taksiran_kehamilan = x.pemeriksaan_bidan.taksiran_persalinan
              x.gravida = x.riwayat_obstetrik.gravida
              x.partus = x.riwayat_obstetrik.partus
              x.abortus = x.riwayat_obstetrik.abortus
            }
        }
      } catch (error) {
          console.log(error)
      }
    },
    async getData(){
      let vm = this
      try {
            let gol_dar = await vm.$_api.post("/msGolonganDarah/list")
            vm.options_darah = []
            for (let i = 0; i < gol_dar.data.length; i++) {
              let x = gol_dar.data[i];
              let y = {}
              y.value = x.nama_golongan_darah
              y.text = x.nama_golongan_darah
              vm.options_darah.push(y)
            }
          
        } catch (error) {
            console.log(error)
        }
    },
    simpanData() {
      console.log('simpanData')
      this.$parent.$parent.updateAssesmenTambahan();
    },
    // simpanData(){
    //   let vm = this
    //   let datanya = {}
    //   // datanya.kunjungan_pertama_id = vm.kunjungan.kunjungan_id
    //   datanya.tanggal_kia = vm.$moment(new Date()).format("YYYY-MM-DD HH:mm")
    //   datanya.pengamatan_kehamilan = vm.pengamatan_kehamilan
    //   datanya.riwayat_pasien = vm.riwayat_pasien
    //   datanya.riwayat_obstetrik = vm.riwayat_obstetrik
    //   datanya.rencana_persalinan = vm.rencana_persalinan
    //   datanya.pemeriksaan_bidan = vm.pemeriksaan_bidan
    //   datanya.risiko_kehamilan = vm.risiko_kehamilan
    //   datanya.rm_id = vm.kunjungan.rm_id
    //   console.log(datanya, 'ini datanya');
    //   vm.$_api.post("/assesment_tambahan_rnap/register", { json_askep: datanya })
    //   .then((res) => {
    //     console.log(res, 'ini responya ui');
    //     if(res.data.status == 200 && res.data.message == "sukses"){
    //       vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
    //       vm.$store.commit('set_kia', res.data.id)
    //       vm.getList()
    //       vm.getData()
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // },
    updateData(){
      let vm = this
      let datanya = {}
      datanya.kunjungan_pertama_id = vm.kunjungan.kunjungan_id
      datanya.tanggal_kia = vm.$moment(new Date()).format("YYYY-MM-DD HH:mm")
      datanya.pengamatan_kehamilan = vm.pengamatan_kehamilan
      datanya.riwayat_pasien = vm.riwayat_pasien
      datanya.riwayat_obstetrik = vm.riwayat_obstetrik
      datanya.rencana_persalinan = vm.rencana_persalinan
      datanya.pemeriksaan_bidan = vm.pemeriksaan_bidan
      datanya.risiko_kehamilan = vm.risiko_kehamilan
      datanya.rm_id = vm.kunjungan.rm_id
      datanya.id = vm.$store.state.kia_id
      // console.log(datanya, 'ini datanya');
      vm.$_api.post("/kia/update", datanya)
      .then((res) => {
        // console.log(res, 'ini responya ui');
        if(res.data.status == 200 && res.data.message == "sukses"){
          vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL UPDATE DATA", showing: true})
          vm.getList()
          vm.getData()
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    resetData(){
      let vm = this
      vm.pengamatan_kehamilan.posyandu = ""
      vm.pengamatan_kehamilan.nama_kader = ""
      vm.pengamatan_kehamilan.nama_dukun = ""
      vm.riwayat_pasien = {
        riwayat_komplikasi: "",
        penyakit_kronis: "",
        riwayat_penyakit: "",
      }
      vm.riwayat_obstetrik = {
        gravida: "",
        partus: "",
        abortus: "",
        hidup: "",
      }
      vm.rencana_persalinan = {
        tanggal_rencana: "",
        penolong: "",
        tempat: "",
        pendamping: "",
        transportasi: "",
        pendonor: "",
      }
      vm.pemeriksaan_bidan.tanggal_hpht = ""
      vm.pemeriksaan_bidan.taksiran_persalinan = ""
      vm.pemeriksaan_bidan.persalinan_sebelumnya = ""
      vm.pemeriksaan_bidan.buku_kia = ""
      vm.pemeriksaan_bidan.bb_sblm_hamil = ""
      vm.risiko_kehamilan = {
        skor_kspr: "",
        resiko: "",
        jenis_resiko: "",
        resiko_kasuistik: "",
      }
      vm.update = false
    },
    async printKehamilan(val) {
      // const options = {
      //   name: '_blank',
      //   specs: [
      //     'fullscreen=yes',
      //     'titlebar=yes',
      //     'scrollbars=yes'
      //   ],
      //   styles: [
      //     // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      //     '../../../../../public/style-print-resep.css'
      //   ],
      //   timeout: 1000, // default timeout before the print window appears
      //   autoClose: true, // if false, the window will not close after printing
      //   windowTitle: window.document.title, // override the window title
      // }
      await this.getDataPengamatanKehamilan()
      // await this.$htmlToPaper(val, options);
      // await this.$htmlToPaper(val);
    },
    async getDataPengamatanKehamilan() {
      const vm = this
      let x = { kunjungan_id: vm.dataAnamnesa.kunjungan_id }
      try {
        let res = await vm.$_api.post("/cetak/cetak_kia", x)
        console.log("cetak_kia", res);
        if (res.data.status == 200) {
          vm.itemPrint = res.data.data[0]
        } else {
          vm.$store.commit("set_alert", {
            variant: "warning",
            msg: "Silahkan melengkapi data untuk melanjutkan",
            showing: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style scoped>
.random-card .card{
  background-color: #FAFAFA;
  border:1px solid #D3D3D3
}

.custom-table-riwayat th{
  background-color: #F1F1F1 !important ;
  color: #7C7C7C;
  font-weight: 600;
}

.custom-table-riwayat th, td{
 border:1px solid #F1F1F1 !important
}

.custom-table-riwayat th:nth-child(1) {
  border-top-left-radius: 8px;
}

.custom-table-riwayat th:nth-child(10) {
  border-top-right-radius: 8px;
}

.custom-table-detail-riwayat td{
  padding:2.5px 0 !important;
  border:hidden !important;
  /* color:red; */
}

.custom-table-antenashit th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
}

.custom-table-antenashit th, td{
  border: 1px solid #F1F1F1 !important;
}
</style>
