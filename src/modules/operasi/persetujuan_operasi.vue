<template>
  <div class="container-fluid">
    <div class="card mb-1 w-100">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title mb-0 align-items-start flex-column justify-content-center">
          <span class="card-label font-weight-bolder text-dark">Persetujuan Tindakan Operasi</span>
        </h3>
        <div class="card-toolbar my-0 align-items-center">
          <div class="d-flex align-items-center flex-wrap">
            <label class="mr-3 mb-2 mb-md-0">Pilih Jadwal Operasi:</label>
            <multiselect v-model="selectedJadwal" :options="listJadwal" placeholder="Pilih Jadwal Operasi" label="label" track-by="id" :allow-empty="false" @select="onJadwalSelected" />
          </div>
        </div>
      </div>
      <div class="card-body pt-2">
        <div v-if="!selectedJadwal" class="alert alert-info">
          <i class="ri-information-line"></i>
          Silakan pilih jadwal operasi terlebih dahulu untuk menampilkan form persetujuan tindakan operasi.
        </div>

        <div v-else>
          <div v-if="isLoadingDetail" class="card card-custom shadow-none border bg-light">
            <div class="card-body d-flex justify-content-center py-10">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>

          <div v-else class="persetujuan-wrapper">
            <div class="persetujuan-header mb-5">
              <p class="persetujuan-breadcrumb mb-2">Operasi / Pre Operasi / Persetujuan Operasi</p>
              <h4 class="font-weight-bolder text-dark mb-1">Form Persetujuan Tindakan Operasi</h4>
              <p class="text-muted mb-0">Satu jadwal operasi hanya memiliki satu data persetujuan yang dapat diperbarui kembali.</p>
            </div>

            <div class="card border-0 shadow-sm mb-5 patient-summary-card">
              <div class="card-body">
                <div class="d-flex align-items-center mb-4">
                  <div class="summary-icon mr-3">
                    <i class="ri-user-3-line"></i>
                  </div>
                  <div>
                    <h5 class="mb-1 font-weight-bolder text-dark">Ringkasan Pasien</h5>
                    <p class="mb-0 text-muted">Data pasien diambil dari jadwal operasi yang dipilih.</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="summary-item">
                      <span class="summary-label">No. RM</span>
                      <span class="summary-value">{{ selectedJadwal.no_rm || "-" }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="summary-item">
                      <span class="summary-label">Nama Pasien</span>
                      <span class="summary-value">{{ selectedJadwal.nama_lengkap || "-" }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="summary-item">
                      <span class="summary-label">Usia</span>
                      <span class="summary-value">{{ patientAge }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="summary-item">
                      <span class="summary-label">Jenis Kelamin</span>
                      <span class="summary-value">{{ genderLabel }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="summary-item">
                      <span class="summary-label">Tanggal Operasi</span>
                      <span class="summary-value">{{ formatDate(selectedJadwal.tanggal_operasi) }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="summary-item">
                      <span class="summary-label">Ruang</span>
                      <span class="summary-value">{{ selectedJadwal.nama_ruang || "-" }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="alert alert-warning mb-5" v-if="!dataMappingOperasi.length">
              <i class="ri-information-line"></i>
              Data mapping anatomi operasi belum tersedia. Form tetap bisa disimpan, dan hasil cetak akan menampilkan informasi bahwa mapping belum ada.
            </div>

            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-xl-7">
                  <div class="card border-0 shadow-sm mb-5 persetujuan-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-stethoscope-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Dokter</h5>
                          <p class="mb-0 text-muted">Tentukan dokter pelaksana dan dokter pemberi informasi untuk persetujuan tindakan operasi.</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mb-4">
                            <s-input
                              groupClass="mb-0"
                              v-model="fields.dokter_pelaksana_id"
                              :item="{
                                label: 'Dokter Pelaksana',
                                type: 'lookup-radio',
                                api: 'msDokter',
                                validation: [],
                                pointer: {
                                  label: 'nama_dokter',
                                  code: 'ms_dokter_id',
                                  display: ['nama_dokter', 'nama_specialist'],
                                  headerDisplay: ['Nama', 'Spesialis'],
                                },
                                param: {
                                  kode_tipe_tenaga_medis: 'Dr',
                                },
                              }"
                              :valuee="fields.dokter_pelaksana_id"
                              @input="onDokterPelaksanaSelected" />
                            <div v-if="fieldErrors.dokter_pelaksana_id" class="invalid-feedback d-block">{{ fieldErrors.dokter_pelaksana_id }}</div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mb-4">
                            <s-input
                              groupClass="mb-0"
                              v-model="fields.dokter_pemberi_informasi_id"
                              :item="{
                                label: 'Dokter Pemberi Informasi',
                                type: 'lookup-radio',
                                api: 'msDokter',
                                validation: [],
                                pointer: {
                                  label: 'nama_dokter',
                                  code: 'ms_dokter_id',
                                  display: ['nama_dokter', 'nama_specialist'],
                                  headerDisplay: ['Nama', 'Spesialis'],
                                },
                                param: {
                                  kode_tipe_tenaga_medis: 'Dr',
                                },
                              }"
                              :valuee="fields.dokter_pemberi_informasi_id"
                              @input="onDokterPemberiInformasiSelected" />
                            <div v-if="fieldErrors.dokter_pemberi_informasi_id" class="invalid-feedback d-block">{{ fieldErrors.dokter_pemberi_informasi_id }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card border-0 shadow-sm mb-5 persetujuan-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-user-heart-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Pemberi Persetujuan</h5>
                          <p class="mb-0 text-muted">Isi identitas pihak yang menerima informasi dan memberikan keputusan persetujuan tindakan.</p>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="font-weight-bolder">Nama Pemberi Persetujuan <span class="text-danger">*</span></label>
                        <input v-model.trim="fields.nama_pemberi_persetujuan" type="text" class="form-control" :class="inputClass('nama_pemberi_persetujuan')" placeholder="Masukkan nama pemberi persetujuan" @input="clearFieldError('nama_pemberi_persetujuan')" />
                        <div v-if="fieldErrors.nama_pemberi_persetujuan" class="invalid-feedback d-block">{{ fieldErrors.nama_pemberi_persetujuan }}</div>
                      </div>

                      <div class="form-group mb-0">
                        <label class="font-weight-bolder">Hubungan dengan Pasien <span class="text-danger">*</span></label>
                        <input v-model.trim="fields.hub_pemberi_persetujuan" type="text" class="form-control" :class="inputClass('hub_pemberi_persetujuan')" placeholder="Contoh: Orang Tua / Suami / Istri / Anak" @input="clearFieldError('hub_pemberi_persetujuan')" />
                        <div v-if="fieldErrors.hub_pemberi_persetujuan" class="invalid-feedback d-block">{{ fieldErrors.hub_pemberi_persetujuan }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-5">
                  <div class="card border-0 shadow-sm mb-5 persetujuan-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-checkbox-circle-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Pernyataan Persetujuan</h5>
                          <p class="mb-0 text-muted">Pilih status akhir persetujuan tindakan operasi dengan nilai boolean eksplisit.</p>
                        </div>
                      </div>

                      <div class="form-group mb-0">
                        <label class="font-weight-bolder d-block">Status Persetujuan <span class="text-danger">*</span></label>
                        <div class="persetujuan-choice-grid" :class="{ 'is-invalid': fieldErrors.pernyataan_setuju }">
                          <label class="persetujuan-choice persetujuan-choice--agree">
                            <input v-model="fields.pernyataan_setuju" type="radio" :value="true" @change="clearFieldError('pernyataan_setuju')" />
                            <span>
                              <strong>Setuju</strong>
                              <small>Pasien/keluarga menyetujui tindakan</small>
                            </span>
                          </label>

                          <label class="persetujuan-choice persetujuan-choice--reject">
                            <input v-model="fields.pernyataan_setuju" type="radio" :value="false" @change="clearFieldError('pernyataan_setuju')" />
                            <span>
                              <strong>Tidak Setuju</strong>
                              <small>Pasien/keluarga menolak tindakan</small>
                            </span>
                          </label>
                        </div>
                        <div v-if="fieldErrors.pernyataan_setuju" class="invalid-feedback d-block">{{ fieldErrors.pernyataan_setuju }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card border-0 shadow-sm mb-5 persetujuan-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-file-list-2-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Ringkasan Persetujuan</h5>
                          <p class="mb-0 text-muted">Preview singkat data yang akan ikut muncul pada hasil cetak formulir.</p>
                        </div>
                      </div>

                      <div class="summary-box mb-3">
                        <span class="summary-box-label">Dokter Pelaksana</span>
                        <span class="summary-box-value">{{ dokterPelaksanaNama || "-" }}</span>
                      </div>

                      <div class="summary-box mb-3">
                        <span class="summary-box-label">Dokter Pemberi Informasi</span>
                        <span class="summary-box-value">{{ dokterPemberiInformasiNama || "-" }}</span>
                      </div>

                      <div class="summary-box mb-3">
                        <span class="summary-box-label">Pemberi Persetujuan</span>
                        <span class="summary-box-value">{{ fields.nama_pemberi_persetujuan || "-" }}</span>
                      </div>

                      <div class="summary-box mb-3">
                        <span class="summary-box-label">Hubungan dengan Pasien</span>
                        <span class="summary-box-value">{{ fields.hub_pemberi_persetujuan || "-" }}</span>
                      </div>

                      <div class="summary-box mb-0">
                        <span class="summary-box-label">Status</span>
                        <span class="summary-box-value" :class="persetujuanStatusClass">{{ persetujuanStatusText }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-wrap align-items-center">
                <button type="submit" class="btn btn-success mr-3 mb-2" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner spinner-white spinner-right mr-2"></span>
                  Simpan
                </button>
                <button class="btn btn-primary ml-md-3 mt-2 mt-md-0" @click="printForm" :disabled="!selectedJadwal || isLoadingDetail"><i class="ri-printer-line"></i> Cetak Form</button>
              </div>
            </form>

            <div id="printArea" class="print-area d-none">
              <table class="custom-table" style="width: 100%; border-collapse: collapse">
                <tr>
                  <td rowspan="2" style="height: 60px; text-align: center; vertical-align: middle">
                    <img src="/static/img/logo/baubau.png" alt="Logo RSUD" height="70px" />
                  </td>
                  <td style="height: 25px; text-align: center; vertical-align: middle">
                    <h5 style="font-weight: 600; font-size: 25px; line-height: 35px; margin: 0">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h5>
                  </td>
                </tr>
                <tr>
                  <td style="height: 15px; text-align: center; vertical-align: middle">Jl. Gajah Mada Kec. Batauga Kab. Buton Selatan, Sulawesi Tenggara</td>
                </tr>
                <tr class="bg-dark">
                  <td colspan="2" style="text-align: center; vertical-align: middle; font-weight: 600; height: 20px; color: white">FORMULIR PERSETUJUAN TINDAKAN KEDOKTERAN - INFORMED CONSENT</td>
                </tr>
              </table>
              <div style="margin-top: 20px"></div>

              <div class="row mb-4">
                <div class="col-12">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="20%"><strong>Nama Pasien</strong></td>
                        <td width="5%">:</td>
                        <td>{{ selectedJadwal.nama_lengkap || "-" }}</td>
                        <td width="20%"><strong>No. RM</strong></td>
                        <td width="5%">:</td>
                        <td>{{ selectedJadwal.no_rm || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Umur</strong></td>
                        <td>:</td>
                        <td>{{ patientAge }}</td>
                        <td><strong>Jenis Kelamin</strong></td>
                        <td>:</td>
                        <td>{{ genderLabel }}</td>
                      </tr>
                      <tr>
                        <td><strong>Alamat Sekarang</strong></td>
                        <td>:</td>
                        <td colspan="4">{{ patientAddress }}</td>
                      </tr>
                      <tr>
                        <td><strong>Tanggal Operasi</strong></td>
                        <td>:</td>
                        <td>{{ formatDateTime(selectedJadwal.tanggal_operasi) }}</td>
                        <td><strong>Ruang</strong></td>
                        <td>:</td>
                        <td>{{ selectedJadwal.nama_ruang || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Diagnosa</strong></td>
                        <td>:</td>
                        <td colspan="4">
                          <ul class="pl-3 mb-0">
                            <li v-for="(diagnosa, i) in selectedJadwal.data_diagnosa || []" :key="`print-diagnosa-${i}`">
                              {{ diagnosa.nama_diagnosa }}
                            </li>
                            <li v-if="!selectedJadwal.data_diagnosa || !selectedJadwal.data_diagnosa.length">-</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Tindakan Operasi</strong></td>
                        <td>:</td>
                        <td colspan="4">{{ selectedJadwal.nama_jasa || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6><strong>PEMBERI INFORMASI</strong></h6>
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="25%"><strong>Dokter pelaksana tindakan</strong></td>
                        <td>:</td>
                        <td>{{ dokterPelaksanaNama || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Pemberi informasi</strong></td>
                        <td>:</td>
                        <td>{{ dokterPemberiInformasiNama || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6><strong>PENERIMA INFORMASI / PEMBERI PERSETUJUAN</strong></h6>
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="25%"><strong>Nama</strong></td>
                        <td>:</td>
                        <td>{{ fields.nama_pemberi_persetujuan || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Hubungan dengan pasien</strong></td>
                        <td>:</td>
                        <td>{{ fields.hub_pemberi_persetujuan || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th width="5%">No</th>
                        <th width="25%">Jenis informasi</th>
                        <th>Isi informasi</th>
                        <th width="10%">Tandai</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Diagnosis</td>
                        <td>
                          <span v-if="selectedJadwal.data_diagnosa && selectedJadwal.data_diagnosa.length > 0">
                            <div v-for="(diagnosa, i) in selectedJadwal.data_diagnosa" :key="`diagnosa-info-${i}`">
                              {{ diagnosa.nama_diagnosa }}
                            </div>
                          </span>
                          <span v-else>-</span>
                        </td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Dasar diagnosis</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Tindakan kedokteran</td>
                        <td>{{ selectedJadwal.nama_jasa || "-" }}</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Indikasi tindakan</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Tata cara</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Tujuan</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Risiko</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>Komplikasi</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>Prognosis</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>Alternatif dan risiko lain-lain</td>
                        <td>-</td>
                        <td class="text-center">☐</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4" v-if="dataMappingOperasi.length > 0">
                <div class="col-12">
                  <h6><strong>DATA MAPPING ANATOMI OPERASI</strong></h6>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th width="5%">No</th>
                        <th width="25%">Bagian Tubuh</th>
                        <th width="45%">Keterangan</th>
                        <th width="25%">Lokasi (Koordinat)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in dataMappingOperasi" :key="`mapping-${i}`">
                        <td>{{ i + 1 }}</td>
                        <td>{{ item.properties.bagian_tubuh || "-" }}</td>
                        <td>{{ item.properties.keterangan || "-" }}</td>
                        <td class="text-center">
                          <span class="badge badge-info"> X: {{ item.properties.lat || "-" }}, Y: {{ item.properties.lng || "-" }} </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4" v-else>
                <div class="col-12">
                  <div class="alert alert-warning">
                    <i class="ri-information-line"></i>
                    <strong>Informasi:</strong> Belum ada data mapping anatomi untuk operasi ini. Silakan lakukan mapping anatomi terlebih dahulu di menu <strong>Mapping Operasi</strong>.
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <p class="mb-2"><strong>Dengan ini menyatakan bahwa saya telah menerangkan hal-hal diatas secara benar dan jelas serta memberikan kesempatan untuk bertanya dan atau berdiskusi</strong></p>
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="60%">&nbsp;</td>
                        <td width="40%">
                          <div class="text-center">
                            <p class="mb-1"><strong>Tanda tangan</strong></p>
                            <div class="signature-box" style="height: 60px; border-bottom: 1px solid #000"></div>
                            <p class="mb-0 mt-1">({{ dokterPemberiInformasiNama || "Dokter Pemberi Informasi" }})</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <p class="mb-2"><strong>Dengan ini bahwa saya telah menerima informasi sebagimana diatas yang telah diberi tanda / paraf dikolom kanannya, dan telah memahaminya</strong></p>
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="60%">&nbsp;</td>
                        <td width="40%">
                          <div class="text-center">
                            <p class="mb-1"><strong>Tanda tangan</strong></p>
                            <div class="signature-box" style="height: 60px; border-bottom: 1px solid #000"></div>
                            <p class="mb-0 mt-1">({{ fields.nama_pemberi_persetujuan || "Pemberi Persetujuan" }})</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="mb-0"><em>Nb: bila pasien tidak kompeten atau kooperatif, maka penerima informasi adalah wali atau keluarga terdekat</em></p>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6>
                    <strong>{{ persetujuanHeading }}</strong>
                  </h6>
                  <p class="mb-2">
                    Yang bertanda tangan dibawah ini saya,
                    <strong>{{ fields.nama_pemberi_persetujuan || "........................................" }}</strong
                    >, hubungan dengan pasien <strong>{{ fields.hub_pemberi_persetujuan || "........................................" }}</strong
                    >.
                  </p>
                  <p class="mb-2">
                    Dengan ini menyatakan <strong>{{ persetujuanVerb }}</strong> untuk dilakukan tindakan
                    <strong>{{ selectedJadwal.nama_jasa || "........................................" }}</strong>
                    terhadap pasien
                    <strong>{{ selectedJadwal.nama_lengkap || "-" }}</strong
                    >, umur <strong>{{ patientAge }}</strong
                    >, alamat <strong>{{ patientAddress }}</strong
                    >.
                  </p>
                  <p class="mb-3">{{ persetujuanDescription }}</p>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td colspan="2" class="text-center">
                          <strong>Buton Selatan, {{ getCurrentDate() }} pukul {{ getCurrentTime() }}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" class="text-center">
                          <p class="mb-1"><strong>Yang menyatakan</strong></p>
                          <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000; margin: 20px 0"></div>
                          <p class="mb-0">({{ fields.nama_pemberi_persetujuan || "Pasien/Keluarga" }})</p>
                        </td>
                        <td width="50%" class="text-center">
                          <p class="mb-1"><strong>saksi</strong></p>
                          <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000; margin: 20px 0"></div>
                          <p class="mb-0">(..........................................)</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import moment from "moment";

moment.locale("id");

const getDefaultFields = (jadwalOperasiId = "", dokterId = "") => ({
  jadwal_operasi_id: jadwalOperasiId,
  dokter_pelaksana_id: dokterId || "",
  dokter_pemberi_informasi_id: dokterId || "",
  nama_pemberi_persetujuan: "",
  hub_pemberi_persetujuan: "",
  pernyataan_setuju: null,
});

export default {
  name: "persetujuan_operasi",
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedJadwal: null,
      listJadwal: [],
      dataMappingOperasi: [],
      fields: getDefaultFields(),
      fieldErrors: {},
      isLoadingDetail: false,
      isSubmitting: false,
      dokterPelaksanaNama: "",
      dokterPemberiInformasiNama: "",
    };
  },
  computed: {
    genderLabel() {
      if (!this.selectedJadwal || !this.selectedJadwal.jenis_kelamin) {
        return "-";
      }

      return this.selectedJadwal.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan";
    },
    patientAge() {
      if (!this.selectedJadwal) {
        return "-";
      }

      if (this.selectedJadwal.umur) {
        return this.selectedJadwal.umur;
      }

      return this.formatAge(this.selectedJadwal.tgl_lahir);
    },
    patientAddress() {
      return (this.selectedJadwal && (this.selectedJadwal.alamat_sekarang || this.selectedJadwal.alamat)) || "-";
    },
    persetujuanHeading() {
      if (this.fields.pernyataan_setuju === false) {
        return "PENOLAKAN TINDAKAN KEDOKTERAN";
      }

      return "PERSETUJUAN TINDAKAN KEDOKTERAN";
    },
    persetujuanVerb() {
      if (this.fields.pernyataan_setuju === false) {
        return "TIDAK SETUJU";
      }

      if (this.fields.pernyataan_setuju === true) {
        return "SETUJU";
      }

      return "........................................";
    },
    persetujuanDescription() {
      if (this.fields.pernyataan_setuju === false) {
        return "Saya memahami bahwa tindakan tersebut telah dijelaskan kepada saya, termasuk manfaat, risiko, dan komplikasi yang mungkin timbul, dan dengan ini saya menyatakan penolakan atas tindakan kedokteran tersebut dengan penuh kesadaran.";
      }

      return "Saya memahami dan perlunya manfaat tindakan tersebut sebagaimana telah dijelaskan seperti diatas kepada saya, termasuk risiko dan komplikasinya yang mungkin timbul. Saya juga menyadari bahwa oleh ilmu kedokteran bukanlah ilmu pasti maka keberhasilan tindakan kedokteran bukanlah keniscayaan, melainkan sangat bergantung kepada Tuhan Yang Maha Esa.";
    },
    persetujuanStatusText() {
      if (this.fields.pernyataan_setuju === true) {
        return "Setuju";
      }

      if (this.fields.pernyataan_setuju === false) {
        return "Tidak Setuju";
      }

      return "-";
    },
    persetujuanStatusClass() {
      if (this.fields.pernyataan_setuju === true) {
        return "text-success";
      }

      if (this.fields.pernyataan_setuju === false) {
        return "text-danger";
      }

      return "text-muted";
    },
  },
  mounted() {
    this.getJadwalOperasi();
  },
  methods: {
    async getJadwalOperasi() {
      try {
        const response = await this.$_api.post("jadwal_operasi/list");

        if (response.status) {
          this.listJadwal = response.data.map((item) => ({
            id: item.jadwal_operasi_id,
            label: `${item.tanggal_operasi.split("T")[0]} - ${item.nama_lengkap} (${item.no_kunjungan})`,
            ...item,
          }));
        }
      } catch (error) {
        console.error("Error fetching jadwal operasi:", error);
        this.showAlert("danger", "Gagal memuat data jadwal operasi");
      }
    },
    async onJadwalSelected(jadwal) {
      this.selectedJadwal = jadwal;
      this.fieldErrors = {};
      this.loadMappingData(jadwal.jadwal_operasi_id);
      await this.loadPersetujuanOperasi(jadwal.jadwal_operasi_id);
    },
    async loadPersetujuanOperasi(jadwalOperasiId) {
      this.isLoadingDetail = true;
      this.setDefaultFormState(jadwalOperasiId);

      try {
        const response = await this.$_api.post("operasi_persetujuan/detailsByJadwalOperasiId", {
          jadwal_operasi_id: jadwalOperasiId,
        });

        const detailData = Array.isArray(response.data) ? response.data[0] : response.data;

        if (detailData && detailData.jadwal_operasi_id) {
          this.fields = this.mapPersetujuanToFields(detailData);
          this.dokterPelaksanaNama = this.extractDoctorName(detailData, "dokter_pelaksana", this.fields.dokter_pelaksana_id);
          this.dokterPemberiInformasiNama = this.extractDoctorName(detailData, "dokter_pemberi_informasi", this.fields.dokter_pemberi_informasi_id);
        }

        await this.syncDoctorNames();
      } catch (error) {
        console.error("Error fetching persetujuan operasi:", error);
        this.showAlert("warning", "Gagal memuat data persetujuan operasi");
      } finally {
        this.isLoadingDetail = false;
      }
    },
    setDefaultFormState(jadwalOperasiId) {
      const defaultDokterId = this.selectedJadwal && this.selectedJadwal.ms_dokter_id ? this.selectedJadwal.ms_dokter_id : "";
      this.fields = getDefaultFields(jadwalOperasiId, defaultDokterId);
      this.dokterPelaksanaNama = defaultDokterId ? this.selectedJadwal.nama_dokter || "" : "";
      this.dokterPemberiInformasiNama = defaultDokterId ? this.selectedJadwal.nama_dokter || "" : "";
    },
    mapPersetujuanToFields(detail) {
      return {
        ...getDefaultFields(detail.jadwal_operasi_id || (this.selectedJadwal && this.selectedJadwal.jadwal_operasi_id) || ""),
        dokter_pelaksana_id: detail.dokter_pelaksana_id || "",
        dokter_pemberi_informasi_id: detail.dokter_pemberi_informasi_id || "",
        nama_pemberi_persetujuan: detail.nama_pemberi_persetujuan || "",
        hub_pemberi_persetujuan: detail.hub_pemberi_persetujuan || "",
        pernyataan_setuju: detail.pernyataan_setuju === true ? true : detail.pernyataan_setuju === false ? false : null,
      };
    },
    extractDoctorName(detail, relationKey, dokterId) {
      if (detail[relationKey] && detail[relationKey].nama_dokter) {
        return detail[relationKey].nama_dokter;
      }

      if (dokterId && this.selectedJadwal && dokterId === this.selectedJadwal.ms_dokter_id) {
        return this.selectedJadwal.nama_dokter || "";
      }

      return "";
    },
    async syncDoctorNames() {
      await Promise.all([this.ensureDoctorName("dokterPelaksanaNama", this.fields.dokter_pelaksana_id), this.ensureDoctorName("dokterPemberiInformasiNama", this.fields.dokter_pemberi_informasi_id)]);
    },
    async ensureDoctorName(target, dokterId) {
      if (!dokterId) {
        this[target] = "";
        return;
      }

      if (this.selectedJadwal && dokterId === this.selectedJadwal.ms_dokter_id && this.selectedJadwal.nama_dokter && !this[target]) {
        this[target] = this.selectedJadwal.nama_dokter;
      }

      if (this[target]) {
        return;
      }

      try {
        const response = await this.$_api.post("msDokter/detailsById", {
          id: dokterId,
        });

        if (response.status === 200 && response.data.length > 0) {
          this[target] = response.data[0].nama_dokter || "";
        }
      } catch (error) {
        console.error("Error resolving doctor name:", error);
      }
    },
    onDokterPelaksanaSelected(dokterId) {
      this.clearFieldError("dokter_pelaksana_id");
      this.dokterPelaksanaNama = "";
      this.ensureDoctorName("dokterPelaksanaNama", dokterId);
    },
    onDokterPemberiInformasiSelected(dokterId) {
      this.clearFieldError("dokter_pemberi_informasi_id");
      this.dokterPemberiInformasiNama = "";
      this.ensureDoctorName("dokterPemberiInformasiNama", dokterId);
    },
    validateForm() {
      const errors = {};

      if (!this.fields.jadwal_operasi_id) {
        this.showAlert("warning", "Jadwal operasi belum terpilih");
      }

      if (!this.fields.dokter_pelaksana_id) {
        errors.dokter_pelaksana_id = "Dokter pelaksana wajib dipilih";
      }

      if (!this.fields.dokter_pemberi_informasi_id) {
        errors.dokter_pemberi_informasi_id = "Dokter pemberi informasi wajib dipilih";
      }

      if (!this.fields.nama_pemberi_persetujuan) {
        errors.nama_pemberi_persetujuan = "Nama pemberi persetujuan wajib diisi";
      }

      if (!this.fields.hub_pemberi_persetujuan) {
        errors.hub_pemberi_persetujuan = "Hubungan dengan pasien wajib diisi";
      }

      if (this.fields.pernyataan_setuju !== true && this.fields.pernyataan_setuju !== false) {
        errors.pernyataan_setuju = "Status persetujuan wajib dipilih";
      }

      this.fieldErrors = errors;
      return !Object.keys(errors).length && !!this.fields.jadwal_operasi_id;
    },
    buildPayload() {
      return {
        jadwal_operasi_id: this.fields.jadwal_operasi_id,
        dokter_pelaksana_id: this.fields.dokter_pelaksana_id,
        dokter_pemberi_informasi_id: this.fields.dokter_pemberi_informasi_id,
        nama_pemberi_persetujuan: this.fields.nama_pemberi_persetujuan,
        hub_pemberi_persetujuan: this.fields.hub_pemberi_persetujuan,
        pernyataan_setuju: this.fields.pernyataan_setuju,
      };
    },
    async onSubmit() {
      if (!this.validateForm()) {
        this.showAlert("warning", "Mohon lengkapi seluruh field persetujuan tindakan operasi");
        return;
      }

      this.isSubmitting = true;

      try {
        await this.$_api.post("operasi_persetujuan/upsert", this.buildPayload());
        this.showAlert("success", "Persetujuan tindakan operasi berhasil disimpan");
        await this.loadPersetujuanOperasi(this.fields.jadwal_operasi_id);
      } catch (error) {
        console.error("Error saving persetujuan operasi:", error);
        this.showAlert("danger", "Gagal menyimpan persetujuan tindakan operasi");
      } finally {
        this.isSubmitting = false;
      }
    },
    clearFieldError(field) {
      if (this.fieldErrors[field]) {
        this.$delete(this.fieldErrors, field);
      }
    },
    inputClass(field) {
      return this.fieldErrors[field] ? "is-invalid" : "";
    },
    formatDate(date) {
      return date ? moment(date).format("DD MMMM YYYY") : "-";
    },
    formatDateTime(date) {
      return date ? moment(date).format("DD MMMM YYYY, HH:mm") : "-";
    },
    formatAge(date) {
      if (!date) {
        return "-";
      }

      const birthDate = moment(date);
      if (!birthDate.isValid()) {
        return "-";
      }

      const years = moment().diff(birthDate, "years");
      return `${years} Th.`;
    },
    getCurrentDate() {
      return moment().format("DD MMMM YYYY");
    },
    getCurrentTime() {
      return moment().format("HH:mm");
    },
    async loadMappingData(jadwalOperasiId) {
      try {
        this.dataMappingOperasi = [];

        if (!jadwalOperasiId) return;

        if (this.selectedJadwal && this.selectedJadwal.data_mapping_operasi) {
          const existingMapping = Array.isArray(this.selectedJadwal.data_mapping_operasi) ? this.selectedJadwal.data_mapping_operasi : [];

          const formattedMapping = existingMapping
            .map((item) => {
              if (typeof item === "object" && item !== null) {
                if (item.type === "Feature" && item.geometry && item.properties) {
                  return item;
                }

                if (item.lat && item.lng) {
                  return {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [item.lng, item.lat],
                    },
                    properties: {
                      bagian_tubuh: item.bagian_tubuh || "",
                      keterangan: item.keterangan || "",
                      lat: item.lat,
                      lng: item.lng,
                    },
                  };
                }
              }

              return null;
            })
            .filter(Boolean);

          this.dataMappingOperasi = formattedMapping;
        }
      } catch (error) {
        console.error("Error loading mapping data:", error);
        this.showAlert("warning", "Gagal memuat data mapping operasi");
      }
    },
    showAlert(variant, msg) {
      this.$store.commit("set_alert", {
        variant,
        msg,
        showing: true,
      });
    },
    async printForm() {
      if (!this.selectedJadwal) {
        this.showAlert("warning", "Silakan pilih jadwal operasi terlebih dahulu");
        return;
      }

      await this.syncDoctorNames();

      const printContent = document.getElementById("printArea").innerHTML;

      const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Form Persetujuan Tindakan Operasi</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              line-height: 1.4;
              margin: 20px;
            }
            .custom-table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 1rem;
            }
            .custom-table td, .custom-table th {
              border: 1px solid #000;
              padding: 5px;
              vertical-align: top;
            }
            .badge {
              padding: 4px 8px;
              font-size: 10px;
              border-radius: 3px;
              background-color: #17a2b8;
              color: white;
            }
            .table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 1rem;
            }
            .table td, .table th {
              border: 1px solid #000;
              padding: 5px;
              vertical-align: top;
            }
            .text-center { text-align: center; }
            .signature-box {
              margin: 10px 0;
            }
            h4, h5, h6 { margin: 10px 0; }
            .mb-0 { margin-bottom: 0; }
            .mb-1 { margin-bottom: 5px; }
            .mb-2 { margin-bottom: 10px; }
            .mb-3 { margin-bottom: 15px; }
            .mb-4 { margin-bottom: 20px; }
            .mt-1 { margin-top: 5px; }
            .pl-3 { padding-left: 15px; }
            strong { font-weight: bold; }
            em { font-style: italic; }
            ul { margin: 0; padding-left: 20px; }
            .bg-dark { background-color: #333; color: white; }
            .print-area {
              background: white;
              padding: 20px;
            }
            @media print {
              body { margin: 10px; }
              .no-print { display: none; }
              .print-area {
                background: white;
                box-shadow: none;
                border: none;
                margin: 0;
                padding: 10px;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(printHTML);
      printWindow.document.close();

      printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
      };

      this.showAlert("success", "Form persetujuan tindakan operasi siap untuk dicetak");
    },
  },
};
</script>

<style scoped>
.persetujuan-wrapper {
  background: radial-gradient(circle at top left, rgba(54, 153, 255, 0.12), transparent 30%), linear-gradient(180deg, #f7fbff 0%, #f4f7fb 100%);
  border-radius: 24px;
  padding: 24px;
}

.persetujuan-breadcrumb {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6c7293;
}

.patient-summary-card,
.persetujuan-section {
  border-radius: 20px;
}

.summary-icon,
.section-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3699ff 0%, #187de4 100%);
  color: #fff;
  font-size: 20px;
}

.summary-item {
  padding: 16px;
  border-radius: 16px;
  background: #f9fafc;
  border: 1px solid #e5eaef;
  min-height: 100%;
}

.summary-label,
.summary-box-label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6c7293;
}

.summary-value,
.summary-box-value {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #181c32;
}

.summary-box {
  padding: 16px;
  border-radius: 16px;
  background: #f9fafc;
  border: 1px solid #e5eaef;
}

.section-heading {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
}

.section-heading .section-icon {
  margin-right: 14px;
  flex-shrink: 0;
}

.persetujuan-choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.persetujuan-choice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid #dfe4ea;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  margin-bottom: 0;
  transition: all 0.2s ease;
}

.persetujuan-choice:hover {
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.12);
}

.persetujuan-choice--agree:hover {
  border-color: #0bb783;
}

.persetujuan-choice--reject:hover {
  border-color: #f64e60;
}

.persetujuan-choice input {
  margin-top: 4px;
}

.persetujuan-choice span {
  display: flex;
  flex-direction: column;
}

.persetujuan-choice small {
  color: #6c7293;
  margin-top: 4px;
}

.form-control,
.input-group-text {
  min-height: 44px;
}

.print-area {
  background: white;
  padding: 20px;
}

.print-area h4,
.print-area h5,
.print-area h6 {
  margin: 15px 0;
  text-align: center;
}

.print-area .table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 15px;
}

.print-area .table td,
.print-area .table th {
  border: 1px solid #000;
  padding: 8px;
  vertical-align: top;
}

.print-area .signature-box {
  border-bottom: 1px solid #000;
  margin: 20px 0;
  min-height: 60px;
}

.print-area p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.print-area .alert {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.print-area .alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

.print-area .badge {
  padding: 4px 8px;
  font-size: 10px;
  border-radius: 3px;
  background-color: #17a2b8;
  color: white;
}

@media (max-width: 767.98px) {
  .persetujuan-wrapper {
    padding: 16px;
    border-radius: 18px;
  }

  .card-toolbar .d-flex {
    width: 100%;
  }

  .card-toolbar .multiselect {
    width: 100%;
  }

  .persetujuan-choice-grid {
    grid-template-columns: 1fr;
  }
}

@media print {
  .no-print {
    display: none !important;
  }

  .print-area {
    background: white;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 10px;
  }

  body {
    font-size: 11px;
    line-height: 1.3;
  }
}
</style>
