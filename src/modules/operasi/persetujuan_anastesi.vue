<template>
  <div class="container-fluid">
    <div class="card mb-1 w-100">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title mb-0 align-items-start flex-column justify-content-center">
          <span class="card-label font-weight-bolder text-dark">Assesmen Anastesi</span>
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
          Silakan pilih jadwal operasi terlebih dahulu untuk menampilkan form assesmen anastesi.
        </div>

        <div v-else>
          <div v-if="isLoadingDetail" class="card card-custom shadow-none border bg-light">
            <div class="card-body d-flex justify-content-center py-10">
              <div class="spinner spinner-track spinner-primary"></div>
            </div>
          </div>

          <div v-else class="assesmen-wrapper">
            <div class="assesmen-header mb-5">
              <p class="assesmen-breadcrumb mb-2">Operasi / Pre Operasi / Asesmen Anastesi</p>
              <h4 class="font-weight-bolder text-dark mb-1">Form Assesmen Anastesi</h4>
              <p class="text-muted mb-0">Satu jadwal operasi memiliki satu data assesmen anastesi yang dapat diperbarui kembali.</p>
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

            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-xl-7">
                  <div class="card border-0 shadow-sm mb-5 assesmen-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-file-list-3-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Riwayat</h5>
                          <p class="mb-0 text-muted">Lengkapi riwayat alergi, penyakit, dan obat rutin pasien.</p>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="font-weight-bolder">Alergi <span class="text-danger">*</span></label>
                        <input v-model.trim="fields.alergi" type="text" class="form-control" :class="inputClass('alergi')" placeholder="Contoh: Penicillin" @input="clearFieldError('alergi')" />
                        <div v-if="fieldErrors.alergi" class="invalid-feedback d-block">{{ fieldErrors.alergi }}</div>
                      </div>

                      <div class="form-group">
                        <label class="font-weight-bolder">Riwayat Penyakit <span class="text-danger">*</span></label>
                        <textarea v-model.trim="fields.riwayat_penyakit" class="form-control" :class="inputClass('riwayat_penyakit')" rows="4" placeholder="Tuliskan riwayat penyakit utama pasien" @input="clearFieldError('riwayat_penyakit')"></textarea>
                        <div v-if="fieldErrors.riwayat_penyakit" class="invalid-feedback d-block">{{ fieldErrors.riwayat_penyakit }}</div>
                      </div>

                      <div class="form-group mb-0">
                        <label class="font-weight-bolder">Obat Rutin <span class="text-danger">*</span></label>
                        <textarea v-model.trim="fields.obat_rutin" class="form-control" :class="inputClass('obat_rutin')" rows="4" placeholder="Tuliskan nama obat rutin pasien" @input="clearFieldError('obat_rutin')"></textarea>
                        <div v-if="fieldErrors.obat_rutin" class="invalid-feedback d-block">{{ fieldErrors.obat_rutin }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card border-0 shadow-sm mb-5 assesmen-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-heart-pulse-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Pemeriksaan</h5>
                          <p class="mb-0 text-muted">Isi hasil pemeriksaan fisik utama sebelum tindakan operasi.</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="font-weight-bolder">Tekanan Darah <span class="text-danger">*</span></label>
                            <div class="input-group">
                              <input v-model.trim="fields.tekanan_darah" type="text" class="form-control" :class="inputClass('tekanan_darah')" placeholder="120/80" @input="clearFieldError('tekanan_darah')" />
                              <div class="input-group-append">
                                <span class="input-group-text">mmHg</span>
                              </div>
                            </div>
                            <div v-if="fieldErrors.tekanan_darah" class="invalid-feedback d-block">{{ fieldErrors.tekanan_darah }}</div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="font-weight-bolder">Nadi <span class="text-danger">*</span></label>
                            <div class="input-group">
                              <input v-model.trim="fields.nadi" type="text" class="form-control" :class="inputClass('nadi')" placeholder="80" @input="clearFieldError('nadi')" />
                              <div class="input-group-append">
                                <span class="input-group-text">x/menit</span>
                              </div>
                            </div>
                            <div v-if="fieldErrors.nadi" class="invalid-feedback d-block">{{ fieldErrors.nadi }}</div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="font-weight-bolder">Suhu <span class="text-danger">*</span></label>
                            <div class="input-group">
                              <input v-model.trim="fields.suhu" type="text" class="form-control" :class="inputClass('suhu')" placeholder="37.0" @input="clearFieldError('suhu')" />
                              <div class="input-group-append">
                                <span class="input-group-text">&deg;C</span>
                              </div>
                            </div>
                            <div v-if="fieldErrors.suhu" class="invalid-feedback d-block">{{ fieldErrors.suhu }}</div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mb-0">
                            <label class="font-weight-bolder">Mallampati <span class="text-danger">*</span></label>
                            <select v-model="fields.mallampati" class="form-control" :class="inputClass('mallampati')" @change="clearFieldError('mallampati')">
                              <option value="">Pilih Mallampati</option>
                              <option v-for="option in mallampatiOptions" :key="option.value" :value="option.value">
                                {{ option.text }}
                              </option>
                            </select>
                            <div v-if="fieldErrors.mallampati" class="invalid-feedback d-block">{{ fieldErrors.mallampati }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-5">
                  <div class="card border-0 shadow-sm mb-5 assesmen-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-shield-check-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Resiko</h5>
                          <p class="mb-0 text-muted">Tentukan klasifikasi ASA berdasarkan kondisi pasien.</p>
                        </div>
                      </div>

                      <div class="form-group mb-0">
                        <label class="font-weight-bolder">ASA Score <span class="text-danger">*</span></label>
                        <select v-model="fields.asa_skor" class="form-control" :class="inputClass('asa_skor')" @change="clearFieldError('asa_skor')">
                          <option value="">Pilih ASA Score</option>
                          <option v-for="option in asaSkorOptions" :key="option.value" :value="option.value">
                            {{ option.text }}
                          </option>
                        </select>
                        <div v-if="fieldErrors.asa_skor" class="invalid-feedback d-block">{{ fieldErrors.asa_skor }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card border-0 shadow-sm mb-5 assesmen-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-syringe-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Rencana</h5>
                          <p class="mb-0 text-muted">Pilih jenis anastesi yang direncanakan untuk pasien.</p>
                        </div>
                      </div>

                      <div class="form-group mb-0">
                        <label class="font-weight-bolder d-block">Jenis Anastesi <span class="text-danger">*</span></label>
                        <div class="jenis-anastesi-options" :class="{ 'is-invalid': fieldErrors.jenis_anastesi }">
                          <label v-for="option in jenisAnastesiOptions" :key="option.value" class="jenis-option">
                            <input v-model="fields.jenis_anastesi" type="radio" :value="option.value" @change="clearFieldError('jenis_anastesi')" />
                            <span>{{ option.text }}</span>
                          </label>
                        </div>
                        <div v-if="fieldErrors.jenis_anastesi" class="invalid-feedback d-block">{{ fieldErrors.jenis_anastesi }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card border-0 shadow-sm mb-5 assesmen-section">
                    <div class="card-body">
                      <div class="section-heading">
                        <span class="section-icon"><i class="ri-sticky-note-line"></i></span>
                        <div>
                          <h5 class="mb-1 font-weight-bolder text-dark">Catatan</h5>
                          <p class="mb-0 text-muted">Catatan tambahan wajib diisi sebelum pasien lanjut ke tindakan operasi.</p>
                        </div>
                      </div>

                      <div class="form-group mb-0">
                        <label class="font-weight-bolder">Catatan Tambahan <span class="text-danger">*</span></label>
                        <textarea v-model.trim="fields.catatan" class="form-control" :class="inputClass('catatan')" rows="8" placeholder="Tuliskan catatan penting untuk tim operasi" @input="clearFieldError('catatan')"></textarea>
                        <small class="form-text text-muted">Data ini wajib diisi sebelum lanjut ke tindakan operasi.</small>
                        <div v-if="fieldErrors.catatan" class="invalid-feedback d-block">{{ fieldErrors.catatan }}</div>
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
                <button type="button" class="btn btn-outline-secondary mb-2" :disabled="isSubmitting" @click="goBack">Kembali</button>
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
                        <td colspan="4">{{ selectedJadwal.alamat_sekarang || "-" }}</td>
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
                        <td>{{ selectedJadwal.nama_dokter || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Pemberi informasi</strong></td>
                        <td>:</td>
                        <td>{{ selectedJadwal.nama_dokter || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6 class="text-center"><strong>EDUKASI TINDAKAN ANESTESI / PEMBIUSAN</strong></h6>

                  <p>Pembiusan pada dasarnya dibagi menjadi 3 macam yaitu: <strong>Anestesi Umum</strong>, <strong>Anestesi Regional</strong> dan <strong>Sedasi</strong>. Masing-masing jenis pembiusan memiliki kelebihan dan kekurangannya. Komplikasi yang dapat terjadi juga berbeda, seperti uraian berikut:</p>

                  <ol class="pl-3">
                    <li>
                      <strong>Anestesi Umum</strong>
                      <p>Merupakan teknik pembiusan dengan bius total, dimana pasien tidak sadar, tidak dapat dirangsang dan tidak merasa sakit. Obat bius untuk anestesi umum disuntikkan ke dalam pembuluh darah atau dengan gas anestesi yang dapat dihirup.</p>
                    </li>
                    <li>
                      <strong>Anestesi Regional (Spinal / Epidural)</strong>
                      <p>Merupakan pembiusan yang hanya meliputi daerah perut ke bawah dengan pasien tetap sadar tanpa merasakan nyeri.</p>
                    </li>
                    <li>
                      <strong>Sedasi (Sedasi Ringan, Sedang dan Dalam)</strong>
                      <p>Pada sedasi ringan pasien mengantuk tetapi masih dapat bernapas spontan. Pada sedasi sedang dan dalam pasien tidur dan tidak mudah dibangunkan.</p>
                    </li>
                  </ol>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6 class="text-center"><strong>PEMBERIAN INFORMASI</strong></h6>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="25%"><strong>Dokter Pelaksana Tindakan</strong></td>
                        <td>:</td>
                        <td>{{ selectedJadwal.nama_dokter || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Pemberi Informasi</strong></td>
                        <td>:</td>
                        <td>{{ selectedJadwal.nama_dokter || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Penerima Informasi</strong></td>
                        <td>:</td>
                        <td>{{ selectedJadwal.nama_lengkap || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th width="5%">No</th>
                        <th width="35%">Jenis Informasi</th>
                        <th>Isi Informasi</th>
                        <th width="10%">Check List (√)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Diagnosa</td>
                        <td>
                          <ul class="pl-3 mb-0">
                            <li v-for="(diagnosa, i) in selectedJadwal.data_diagnosa || []" :key="`print-diagnosa-info-${i}`">
                              {{ diagnosa.nama_diagnosa }}
                            </li>
                            <li v-if="!selectedJadwal.data_diagnosa || !selectedJadwal.data_diagnosa.length">-</li>
                          </ul>
                        </td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Tindakan Anestesi</td>
                        <td>{{ jenisAnastesiLabel }}</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Indikasi Tindakan</td>
                        <td>{{ fields.riwayat_penyakit || "-" }}</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Tujuan</td>
                        <td>Persiapan anastesi dan evaluasi kelayakan pasien sebelum tindakan operasi.</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Resiko Tindakan dan Komplikasi</td>
                        <td>ASA score {{ fields.asa_skor || "-" }} dengan catatan: {{ fields.catatan || "-" }}</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Prognosis</td>
                        <td>Berdasarkan hasil assesmen anastesi dan kondisi pasien saat ini.</td>
                        <td class="text-center">☐</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Lain-lain</td>
                        <td>Alergi: {{ fields.alergi || "-" }}</td>
                        <td class="text-center">☐</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <p class="mb-2">Dengan ini menyatakan bahwa saya (dokter) telah menerangkan hal-hal di atas secara benar, jelas dan memberi kesempatan untuk bertanya dan atau berdiskusi</p>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="60%">&nbsp;</td>
                        <td width="40%">
                          <div class="text-center">
                            <p class="mb-1"><strong>Tanda Tangan</strong></p>
                            <div class="signature-box" style="height: 60px; border-bottom: 1px solid #000"></div>
                            <p class="mb-0 mt-1">({{ selectedJadwal.nama_dokter || "Dokter" }})</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <p class="mb-2">Dengan ini menyatakan bahwa saya (pasien/keluarga pasien) telah menerima informasi dari dokter sebagaimana di atas dan telah memahaminya.</p>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="60%">&nbsp;</td>
                        <td width="40%">
                          <div class="text-center">
                            <p class="mb-1"><strong>Tanda Tangan</strong></p>
                            <div class="signature-box" style="height: 60px; border-bottom: 1px solid #000"></div>
                            <p class="mb-0 mt-1">({{ selectedJadwal.nama_lengkap || "Pasien/Keluarga" }})</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6 class="text-center"><strong>PERNYATAAN PERSETUJUAN TINDAKAN</strong></h6>

                  <p>Yang bertanda tangan di bawah ini, nama (Wali Pasien) ..................................................... Umur ................. Thn, L / P Alamat .............................................................................................................................</p>
                  <p>Dengan ini menyatakan SETUJU untuk dilakukan tindakan {{ jenisAnastesiLabel }} terhadap pasien: {{ selectedJadwal.nama_lengkap || "-" }}, Umur {{ patientAge }}, {{ genderLabel }}, No. Rekam Medis {{ selectedJadwal.no_rm || "-" }}</p>
                  <p>Saya memahami perlunya dan manfaat tindakan tersebut sebagaimana telah dijelaskan seperti di atas kepada saya, termasuk resiko dan komplikasi yang mungkin timbul, apabila tindakan tersebut dilakukan dan saya bertanggungjawab atas resiko yang terjadi atas persetujuan/penolakan tersebut dan tidak akan melakukan tuntutan apapun.</p>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td colspan="4" class="text-center">Batauga, {{ getCurrentDate() }} Jam {{ getCurrentTime() }}</td>
                      </tr>
                      <tr>
                        <td class="text-center">
                          <p class="mb-1"><strong>Yang menyatakan</strong></p>
                          <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000"></div>
                          <p class="mb-0">(........................................)</p>
                        </td>
                        <td class="text-center">
                          <p class="mb-1"><strong>Saksi Keluarga</strong></p>
                          <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000"></div>
                          <p class="mb-0">(........................................)</p>
                        </td>
                        <td class="text-center">
                          <p class="mb-1"><strong>Saksi Petugas Rumah Sakit</strong></p>
                          <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000"></div>
                          <p class="mb-0">(........................................)</p>
                        </td>
                        <td class="text-center">
                          <p class="mb-1"><strong>Dokter Anestesi</strong></p>
                          <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000"></div>
                          <p class="mb-0">(........................................)</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <h6 class="text-center"><strong>ASESMEN ANASTESI</strong></h6>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td width="25%"><strong>Alergi</strong></td>
                        <td>{{ fields.alergi || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Riwayat Penyakit</strong></td>
                        <td>{{ fields.riwayat_penyakit || "-" }}</td>
                      </tr>
                      <tr>
                        <td><strong>Obat Rutin</strong></td>
                        <td>{{ fields.obat_rutin || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h6><strong>PEMERIKSAAN FISIK</strong></h6>
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td>TD</td>
                        <td>{{ tekananDarahPrint }}</td>
                        <td>Nadi</td>
                        <td>{{ nadiPrint }}</td>
                        <td>Suhu</td>
                        <td>{{ suhuPrint }}</td>
                      </tr>
                      <tr>
                        <td>Mallampati</td>
                        <td colspan="5">{{ mallampatiLabel }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h6><strong>DIAGNOSIS ASA CLASIFICATION</strong></h6>
                  <p>
                    <strong>{{ fields.asa_skor || "-" }}</strong>
                  </p>

                  <h6><strong>PERENCANAAN ANESTESIA & SEDASI</strong></h6>
                  <p>{{ jenisAnastesiLabel }}</p>

                  <h6><strong>CATATAN</strong></h6>
                  <p>{{ fields.catatan || "-" }}</p>

                  <div class="text-right" style="margin-top: 40px">
                    <p>DPJD Anestesiologi</p>
                    <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000; width: 250px; margin-left: auto"></div>
                    <p class="mb-0">(........................................)</p>
                  </div>
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

const getDefaultFields = (jadwalOperasiId = "") => ({
  jadwal_operasi_id: jadwalOperasiId,
  alergi: "",
  riwayat_penyakit: "",
  obat_rutin: "",
  tekanan_darah: "",
  nadi: "",
  suhu: "",
  mallampati: "",
  asa_skor: "",
  jenis_anastesi: "",
  catatan: "",
});

export default {
  name: "persetujuan_anastesi",
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedJadwal: null,
      listJadwal: [],
      fields: getDefaultFields(),
      fieldErrors: {},
      isLoadingDetail: false,
      isSubmitting: false,
      mallampatiOptions: [
        { value: "1", text: "Kelas I" },
        { value: "2", text: "Kelas II" },
        { value: "3", text: "Kelas III" },
        { value: "4", text: "Kelas IV" },
      ],
      asaSkorOptions: [
        { value: "ASA I", text: "ASA I - Pasien normal yang sehat" },
        { value: "ASA II", text: "ASA II - Penyakit sistemik ringan" },
        { value: "ASA III", text: "ASA III - Penyakit sistemik berat" },
        { value: "ASA IV", text: "ASA IV - Penyakit sistemik berat yang mengancam nyawa" },
        { value: "ASA V", text: "ASA V - Pasien moribund yang kemungkinan tidak bertahan tanpa operasi" },
        { value: "ASA VI", text: "ASA VI - Pasien donor organ mati batang otak" },
        { value: "ASA IE", text: "ASA IE - ASA I dengan tindakan emergensi" },
        { value: "ASA IIE", text: "ASA IIE - ASA II dengan tindakan emergensi" },
        { value: "ASA IIIE", text: "ASA IIIE - ASA III dengan tindakan emergensi" },
        { value: "ASA IVE", text: "ASA IVE - ASA IV dengan tindakan emergensi" },
        { value: "ASA VE", text: "ASA VE - ASA V dengan tindakan emergensi" },
        { value: "ASA VIE", text: "ASA VIE - ASA VI dengan tindakan emergensi" },
      ],
      jenisAnastesiOptions: [
        { value: "general", text: "General" },
        { value: "regional", text: "Regional" },
        { value: "sedasi", text: "Sedasi" },
      ],
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
    jenisAnastesiLabel() {
      const found = this.jenisAnastesiOptions.find((option) => option.value === this.fields.jenis_anastesi);
      return found ? found.text : "-";
    },
    mallampatiLabel() {
      const found = this.mallampatiOptions.find((option) => option.value === this.fields.mallampati);
      return found ? found.text : "-";
    },
    tekananDarahPrint() {
      return this.fields.tekanan_darah ? `${this.fields.tekanan_darah} mmHg` : "-";
    },
    nadiPrint() {
      return this.fields.nadi ? `${this.fields.nadi} x/menit` : "-";
    },
    suhuPrint() {
      return this.fields.suhu ? `${this.fields.suhu} °C` : "-";
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
      await this.loadAssesmenAnastesi(jadwal.jadwal_operasi_id);
    },
    async loadAssesmenAnastesi(jadwalOperasiId) {
      this.isLoadingDetail = true;
      this.fields = getDefaultFields(jadwalOperasiId);

      try {
        const response = await this.$_api.post("operasi_assesmen_anastesi/detailsByJadwalOperasiId", {
          jadwal_operasi_id: jadwalOperasiId,
        });

        const detailData = Array.isArray(response.data) ? response.data[0] : response.data;

        if (detailData && detailData.jadwal_operasi_id) {
          this.fields = this.mapAssesmenToFields(detailData);
        } else {
          this.fields = getDefaultFields(jadwalOperasiId);
        }
      } catch (error) {
        console.error("Error fetching assesmen anastesi:", error);
        this.showAlert("warning", "Gagal memuat data assesmen anastesi");
      } finally {
        this.isLoadingDetail = false;
      }
    },
    mapAssesmenToFields(detail) {
      return {
        ...getDefaultFields(detail.jadwal_operasi_id || (this.selectedJadwal && this.selectedJadwal.jadwal_operasi_id) || ""),
        alergi: detail.alergi || "",
        riwayat_penyakit: detail.riwayat_penyakit || "",
        obat_rutin: detail.obat_rutin || "",
        tekanan_darah: detail.tekanan_darah || "",
        nadi: detail.nadi || "",
        suhu: detail.suhu || "",
        mallampati: detail.mallampati || "",
        asa_skor: detail.asa_skor || "",
        jenis_anastesi: detail.jenis_anastesi || "",
        catatan: detail.catatan || "",
      };
    },
    validateForm() {
      const errors = {};
      const requiredFields = {
        alergi: "Alergi wajib diisi",
        riwayat_penyakit: "Riwayat penyakit wajib diisi",
        obat_rutin: "Obat rutin wajib diisi",
        tekanan_darah: "Tekanan darah wajib diisi",
        nadi: "Nadi wajib diisi",
        suhu: "Suhu wajib diisi",
        mallampati: "Mallampati wajib dipilih",
        asa_skor: "ASA score wajib dipilih",
        jenis_anastesi: "Jenis anastesi wajib dipilih",
        catatan: "Catatan wajib diisi",
      };

      Object.keys(requiredFields).forEach((key) => {
        if (!this.fields[key]) {
          errors[key] = requiredFields[key];
        }
      });

      if (!this.fields.jadwal_operasi_id) {
        this.showAlert("warning", "Jadwal operasi belum terpilih");
      }

      this.fieldErrors = errors;
      return !Object.keys(errors).length && !!this.fields.jadwal_operasi_id;
    },
    buildPayload() {
      return {
        jadwal_operasi_id: this.fields.jadwal_operasi_id,
        alergi: this.fields.alergi,
        riwayat_penyakit: this.fields.riwayat_penyakit,
        obat_rutin: this.fields.obat_rutin,
        tekanan_darah: this.fields.tekanan_darah,
        nadi: this.fields.nadi,
        suhu: this.fields.suhu,
        mallampati: this.fields.mallampati,
        asa_skor: this.fields.asa_skor,
        jenis_anastesi: this.fields.jenis_anastesi,
        catatan: this.fields.catatan,
      };
    },
    async onSubmit() {
      if (!this.validateForm()) {
        this.showAlert("warning", "Mohon lengkapi seluruh field assesmen anastesi");
        return;
      }

      this.isSubmitting = true;

      try {
        await this.$_api.post("operasi_assesmen_anastesi/upsert", this.buildPayload());
        this.showAlert("success", "Assesmen anastesi berhasil disimpan");
        await this.loadAssesmenAnastesi(this.fields.jadwal_operasi_id);
      } catch (error) {
        console.error("Error saving assesmen anastesi:", error);
        this.showAlert("danger", "Gagal menyimpan assesmen anastesi");
      } finally {
        this.isSubmitting = false;
      }
    },
    goBack() {
      this.$router.push("/operasi/list_operasi");
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
    showAlert(variant, msg) {
      this.$store.commit("set_alert", {
        variant,
        msg,
        showing: true,
      });
    },
    printForm() {
      if (!this.selectedJadwal) {
        this.showAlert("warning", "Silakan pilih jadwal operasi terlebih dahulu");
        return;
      }

      const printContent = document.getElementById("printArea").innerHTML;
      const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Form Assesmen Anastesi</title>
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
            .signature-box { margin: 10px 0; }
            h4, h5, h6 { margin: 10px 0; }
            .mb-0 { margin-bottom: 0; }
            .mb-1 { margin-bottom: 5px; }
            .mb-2 { margin-bottom: 10px; }
            .mb-4 { margin-bottom: 20px; }
            .mt-1 { margin-top: 5px; }
            .pl-3 { padding-left: 15px; }
            strong { font-weight: bold; }
            em { font-style: italic; }
            ul, ol { margin: 0; padding-left: 20px; }
            .bg-dark { background-color: #333; color: white; }
            .print-area {
              background: white;
              padding: 20px;
            }
            @media print {
              body {
                margin: 10px;
              }
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

      this.showAlert("success", "Form assesmen anastesi siap untuk dicetak");
    },
  },
};
</script>

<style scoped>
.assesmen-wrapper {
  background: radial-gradient(circle at top left, rgba(54, 153, 255, 0.12), transparent 30%), linear-gradient(180deg, #f7fbff 0%, #f4f7fb 100%);
  border-radius: 24px;
  padding: 24px;
}

.assesmen-breadcrumb {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6c7293;
}

.patient-summary-card,
.assesmen-section {
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

.summary-label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6c7293;
}

.summary-value {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #181c32;
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

.jenis-anastesi-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.jenis-option {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid #dfe4ea;
  border-radius: 14px;
  background: #fff;
  cursor: pointer;
  margin-bottom: 0;
  transition: all 0.2s ease;
}

.jenis-option:hover {
  border-color: #3699ff;
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.12);
}

.jenis-option input {
  margin: 0;
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

@media (max-width: 767.98px) {
  .assesmen-wrapper {
    padding: 16px;
    border-radius: 18px;
  }

  .card-toolbar .d-flex {
    width: 100%;
  }

  .card-toolbar .multiselect {
    width: 100%;
  }

  .jenis-anastesi-options {
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
