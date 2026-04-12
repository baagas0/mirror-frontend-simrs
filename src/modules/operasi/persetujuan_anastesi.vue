<template>
  <div class="container-fluid">
    <div class="card mb-1 w-100">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title mb-0 align-items-start flex-column justify-content-center">
          <span class="card-label font-weight-bolder text-dark">Persetujuan Tindakan Operasi</span>
        </h3>
        <div class="card-toolbar my-0 align-items-center">
          <div class="d-flex align-items-center">
            <label class="mr-3">Pilih Jadwal Operasi:</label>
            <multiselect v-model="selectedJadwal" :options="listJadwal" placeholder="Pilih Jadwal Operasi" label="label" track-by="id" :allow-empty="false" @select="onJadwalSelected"> </multiselect>
            <button class="btn btn-primary ml-3" @click="printForm" :disabled="!selectedJadwal"><i class="ri-printer-line"></i> Cetak Form</button>
          </div>
        </div>
      </div>
      <div class="card-body pt-2">
        <div class="alert alert-info" v-if="!selectedJadwal"><i class="ri-information-line"></i> Silakan pilih jadwal operasi terlebih dahulu untuk menampilkan form persetujuan tindakan operasi.</div>

        <!-- Form Persetujuan Tindakan Operasi -->
        <div id="printArea" class="print-area" v-if="selectedJadwal">
          <!-- Header Rumah Sakit -->
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

          <!-- Data Pasien -->
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
                    <td>{{ selectedJadwal.umur || "-" }}</td>
                    <td><strong>Jenis Kelamin</strong></td>
                    <td>:</td>
                    <td>{{ selectedJadwal.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan" }}</td>
                  </tr>
                  <tr>
                    <td><strong>Alamat</strong></td>
                    <td>:</td>
                    <td colspan="4">{{ selectedJadwal.alamat || "-" }}</td>
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
                        <li v-for="(diagnosa, i) in selectedJadwal.data_diagnosa" :key="i">
                          {{ diagnosa.nama_diagnosa }}
                        </li>
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

          <!-- PEMBERI INFORMASI -->
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

          <!-- asd -->
          <!-- ========================================================= -->
          <!-- EDUKASI TINDAKAN ANESTESI / PEMBIUSAN -->
          <!-- ========================================================= -->
          <div class="row mb-4">
            <div class="col-12">
              <h6 class="text-center"><strong>EDUKASI TINDAKAN ANESTESI / PEMBIUSAN</strong></h6>

              <p>Pembiusan pada dasarnya dibagi menjadi 3 macam yaitu: <strong>Anestesi Umum</strong>, <strong>Anestesi Regional</strong> dan <strong>Sedasi</strong>. Masing-masing jenis pembiusan memiliki kelebihan dan kekurangannya. Komplikasi yang dapat terjadi juga berbeda, seperti uraian berikut:</p>

              <ol class="pl-3">
                <li>
                  <strong>Anestesi Umum</strong>
                  <p>Merupakan teknik pembiusan dengan bius total, dimana pasien tidak sadar, tidak dapat dirangsang dan tidak merasa sakit. Obat bius untuk anestesi umum disuntikkan ke dalam pembuluh darah atau dengan gas anestesi yang dapat dihirup.</p>
                  <ul>
                    <li><strong>Kelebihan:</strong> saat operasi pasien tidak sadar, tidak nyeri, lama pembiusan dapat disesuaikan dengan lamanya operasi.</li>
                    <li><strong>Kelemahan:</strong> sebelum operasi pasien wajib berpuasa dan pasca operasi pasien harus sadar penuh sebelum bisa diberi minum.</li>
                    <li>
                      <strong>Komplikasi / efek samping:</strong>
                      <ul>
                        <li>Mual, muntah, menggigil, pusing, mengantuk, sakit tenggorokan</li>
                        <li>Aspirasi (masuknya isi lambung ke paru-paru)</li>
                        <li>Kesulitan pemasangan alat bantu napas</li>
                        <li>Alergi obat anestesi</li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Anestesi Regional (Spinal / Epidural)</strong>
                  <p>Merupakan pembiusan yang hanya meliputi daerah perut ke bawah dengan pasien tetap sadar tanpa merasakan nyeri.</p>
                  <ul>
                    <li><strong>Kelebihan:</strong> bila tidak mual/muntah pasca bedah bisa langsung minum/makan.</li>
                    <li><strong>Kelemahan:</strong> pasca bedah berbaring dan tidak boleh duduk ± 6 jam.</li>
                    <li>
                      <strong>Komplikasi / efek samping:</strong>
                      <ul>
                        <li>Mual, muntah</li>
                        <li>Sakit kepala</li>
                        <li>Kesulitan buang air kecil</li>
                        <li>Alergi obat</li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Sedasi (Sedasi Ringan, Sedang dan Dalam)</strong>
                  <p>Pada sedasi ringan pasien mengantuk tetapi masih dapat bernapas spontan. Pada sedasi sedang dan dalam pasien tidur dan tidak mudah dibangunkan.</p>
                  <ul>
                    <li><strong>Kelebihan:</strong> pasien dalam keadaan mengantuk dan tidur selama tindakan.</li>
                    <li><strong>Kelemahan:</strong> sebelum tindakan sedasi wajib berpuasa.</li>
                    <li>
                      <strong>Komplikasi:</strong>
                      <ul>
                        <li>Mual, muntah, menggigil, pusing</li>
                        <li>Alergi obat</li>
                        <li>Aspirasi</li>
                        <li>Kemungkinan pemasangan alat bantu napas</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>

              <p><strong>Analgesia pasca bedah:</strong></p>
              <ul>
                <li>Intravena</li>
                <li>Oral</li>
                <li>Epidural</li>
              </ul>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- PEMBERIAN INFORMASI -->
          <!-- ========================================================= -->
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
                    <td>-</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Tindakan Anestesi</td>
                    <td>Anestesi Umum / Regional / Sedasi</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Indikasi Tindakan</td>
                    <td>-</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Tujuan</td>
                    <td>-</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Resiko Tindakan dan Komplikasi</td>
                    <td>Terlampir di lembar edukasi</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Prognosis</td>
                    <td>-</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td rowspan="3">7</td>
                    <td>a. Anestesi Umum</td>
                    <td>Resusitasi s/d Perawatan ke ICU</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>b. Regional (SAB / Epidural)</td>
                    <td>Anestesi Umum s/d Resusitasi</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>c. Sedasi</td>
                    <td>Intubasi s/d Resusitasi</td>
                    <td class="text-center">☐</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Lain-lain</td>
                    <td>-</td>
                    <td class="text-center">☐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- PERNYATAAN DOKTER -->
          <!-- ========================================================= -->
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

          <!-- ========================================================= -->
          <!-- PERNYATAAN PASIEN -->
          <!-- ========================================================= -->
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

              <p class="mb-0">
                <em> Bila pasien tidak kompeten atau tidak mau/bisa menerima informasi, maka penerima informasi adalah wali atau keluarga terdekat. </em>
              </p>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- PERNYATAAN PERSETUJUAN TINDAKAN -->
          <!-- ========================================================= -->
          <div class="row mb-4">
            <div class="col-12">
              <h6 class="text-center"><strong>PERNYATAAN PERSETUJUAN TINDAKAN</strong></h6>

              <p>Yang bertanda tangan di bawah ini, nama (Wali Pasien) ..................................................... Umur ................. Thn, L / P Alamat .............................................................................................................................</p>

              <p>Dengan ini menyatakan SETUJU untuk dilakukan tindakan ..................................................... Terhadap pasien: Nama ....................................................., Umur ................. thn, L / P, No. Rekam Medis .....................................................</p>

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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import moment from "moment";
import config from "@/config";
moment.locale("id");

export default {
  name: "persetujuan_operasi",
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedJadwal: null,
      listJadwal: [],
      logoUrl: config.logo.lg,
      dataMappingOperasi: [],
    };
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
        this.$store.commit("set_alert", {
          variant: "danger",
          msg: "Gagal memuat data jadwal operasi",
          showing: true,
        });
      }
    },
    onJadwalSelected(jadwal) {
      this.selectedJadwal = jadwal;
      this.loadMappingData(jadwal.jadwal_operasi_id);
    },
    formatDateTime(date) {
      return date ? moment(date).format("DD MMMM YYYY, HH:mm") : "-";
    },
    getCurrentDate() {
      return moment().format("DD MMMM YYYY");
    },
    getCurrentTime() {
      return moment().format("HH:mm");
    },
    async loadMappingData(jadwalOperasiId) {
      try {
        // Reset data mapping
        this.dataMappingOperasi = [];

        if (!jadwalOperasiId) return;

        // Cek apakah jadwal yang dipilih sudah ada data mapping
        if (this.selectedJadwal && this.selectedJadwal.data_mapping_operasi) {
          const existingMapping = Array.isArray(this.selectedJadwal.data_mapping_operasi) ? this.selectedJadwal.data_mapping_operasi : [];

          // Format data mapping ke struktur yang konsisten
          const formattedMapping = existingMapping
            .map((item) => {
              if (typeof item === "object" && item !== null) {
                // If item is already in the correct GeoJSON format
                if (item.type === "Feature" && item.geometry && item.properties) {
                  return item;
                }
                // If item is in a different format, convert it to GeoJSON
                else if (item.lat && item.lng) {
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
            .filter(Boolean); // Remove null items

          this.dataMappingOperasi = formattedMapping;
        }
      } catch (error) {
        console.error("Error loading mapping data:", error);
        this.$store.commit("set_alert", {
          variant: "warning",
          msg: "Gagal memuat data mapping operasi",
          showing: true,
        });
      }
    },
    printForm() {
      if (!this.selectedJadwal) {
        this.$store.commit("set_alert", {
          variant: "warning",
          msg: "Silakan pilih jadwal operasi terlebih dahulu",
          showing: true,
        });
        return;
      }

      const printContent = document.getElementById("printArea").innerHTML;

      // Create print-friendly HTML
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

      // Open print window
      const printWindow = window.open("", "_blank");
      printWindow.document.write(printHTML);
      printWindow.document.close();

      // Wait for content to load before printing
      printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
      };

      this.$store.commit("set_alert", {
        variant: "success",
        msg: "Form persetujuan tindakan operasi siap untuk dicetak",
        showing: true,
      });
    },
  },
};
</script>

<style scoped>
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
