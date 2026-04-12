<template>
  <div class="container-fluid">
    <div class="card mb-1 w-100">
      <div class="card-header border-0 pt-5">
        <h3 class="card-title mb-0 align-items-start flex-column justify-content-center">
          <span class="card-label font-weight-bolder text-dark">Assesmen Pra Sedasi</span>
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
          <!-- ASESMEN PRA SEDASI -->
          <!-- ========================================================= -->
          <div class="row mb-4">
            <div class="col-12">
              <h6 class="text-center"><strong>ASESMEN PRA SEDASI</strong></h6>

              <!-- KAJIAN SISTEM -->
              <h6><strong>DIISI OLEH DOKTER</strong></h6>
              <h6><strong>KAJIAN SISTEM</strong></h6>

              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>Hilangnya gigi</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Sakit dada</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Masalah mobilisasi leher</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Denyut jantung tidak normal</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Leher pendek</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Muntah</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Batuk</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Susah kencing</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Infeksi saluran nafas atas</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Kejang</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Kelainan tulang belakang</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Pingsan</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Sedang hamil</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Obesitas</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                  </tr>
                  <tr>
                    <td>Stroke</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td colspan="3"></td>
                  </tr>
                </tbody>
              </table>

              <p><strong>Keterangan:</strong> ........................................................................................................................................................................................</p>

              <!-- PEMERIKSAAN FISIK -->
              <h6><strong>PEMERIKSAAN FISIK</strong></h6>

              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>Tinggi</td>
                    <td>............... cm</td>
                    <td>Berat</td>
                    <td>............... Kg</td>
                    <td>TD</td>
                    <td>............... mmHg</td>
                  </tr>
                  <tr>
                    <td>Nadi</td>
                    <td>............... x/menit</td>
                    <td>Suhu</td>
                    <td>............... °C</td>
                    <td colspan="2"></td>
                  </tr>
                </tbody>
              </table>

              <!-- KEADAAN UMUM -->
              <h6><strong>KEADAAN UMUM</strong></h6>

              <p>Skor mallampati : .........................................................................................................................</p>
              <p>Paru-paru : .....................................................................................................................................</p>
              <p>Jantung : ........................................................................................................................................</p>
              <p>Abdomen : ....................................................................................................................................</p>
              <p>Ekstremitas : .................................................................................................................................</p>
              <p>Neurologi (bila dapat diperiksa) : ..............................................................................................</p>
              <p>Keterangan : .................................................................................................................................</p>

              <!-- LAB -->
              <h6><strong>LABORATORIUM (bila tersedia)</strong></h6>

              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>Hb / Ht</td>
                    <td>........................</td>
                    <td>Leukosit</td>
                    <td>........................</td>
                  </tr>
                  <tr>
                    <td>CT / BT</td>
                    <td>........................</td>
                    <td>Trombosit</td>
                    <td>........................</td>
                  </tr>
                  <tr>
                    <td>Glukosa Darah</td>
                    <td>........................</td>
                    <td>Na / Cl</td>
                    <td>........................</td>
                  </tr>
                  <tr>
                    <td>Tes Kehamilan</td>
                    <td>........................</td>
                    <td>Ureum</td>
                    <td>........................</td>
                  </tr>
                  <tr>
                    <td>Kalium</td>
                    <td>........................</td>
                    <td>Kreatinin</td>
                    <td>........................</td>
                  </tr>
                </tbody>
              </table>

              <!-- ASA -->
              <h6><strong>DIAGNOSIS ASA CLASIFICATION</strong></h6>

              <p>1. ........................................................................ ☐ ASA 1 Pasien normal yang sehat</p>
              <p>........................................................................ ☐ ASA 2 Pasien dengan penyakit sistemik ringan</p>
              <p>2. ........................................................................ ☐ ASA 3 Pasien dengan penyakit sistemik berat</p>
              <p>........................................................................ ☐ ASA 4 Pasien dengan penyakit sistemik berat yang mengancam nyawa</p>

              <!-- PERENCANAAN -->
              <h6><strong>PERENCANAAN ANESTESIA & SEDASI</strong></h6>

              <p>☐ Sedasi : .................................................................................................................................</p>
              <p>☐ G A : .......................................................................................................................................</p>
              <p>☐ Regional : ☐ S A B ☐ Epidural ☐ Kaudal ☐ Blok Perifer</p>

              <!-- PERSIAPAN -->
              <h6><strong>PERSIAPAN PRA ANESTESI</strong></h6>

              <p>Puasa mulai : Jam ................. Tanggal .......................</p>
              <p>Rencana tiba di OK : Jam ................. Tanggal .......................</p>
              <p>Rencana Operasi : Jam ................. Tanggal .......................</p>

              <div class="text-right" style="margin-top: 40px">
                <p>DPJD Anestesiologi</p>
                <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000; width: 250px; margin-left: auto"></div>
                <p class="mb-0">(........................................)</p>
              </div>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- ASESMEN PRA SEDASI (LANJUTAN) -->
          <!-- ========================================================= -->
          <div class="row mb-4">
            <div class="col-12">
              <h6 class="text-center"><strong>ASESMEN PRA SEDASI (LANJUTAN)</strong></h6>

              <h6><strong>DI ISI OLEH PASIEN</strong></h6>

              <!-- KEBIASAAN -->
              <h6><strong>KEBIASAAN</strong></h6>

              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>Merokok</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Sebanyak ................................</td>
                  </tr>
                  <tr>
                    <td>Alcohol</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Sebanyak ................................</td>
                  </tr>
                  <tr>
                    <td>Kopi / Teh / Cola</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Sebanyak ................................</td>
                  </tr>
                  <tr>
                    <td>Olahraga rutin</td>
                    <td class="text-center">Y ☐</td>
                    <td class="text-center">T ☐</td>
                    <td>Sebanyak ................................</td>
                  </tr>
                </tbody>
              </table>

              <!-- PENGOBATAN -->
              <h6><strong>PENGOBATAN</strong></h6>

              <p>Obat resep : ..............................................................................................................................</p>
              <p>Obat bebas (Vitamin, herbal) : ...............................................................................................</p>
              <p>Penggunaan Aspirin rutin : Y ☐ T ☐ Dosis dan frekuensi : .............................................</p>
              <p>Obat anti sakit : Y ☐ T ☐ Dosis dan frekuensi : ...............................................................</p>
              <p>Alergi obat : Y ☐ T ☐ Daftar obat dan tipe reaksi : ........................................................</p>
              <p>Alergi makanan : ......................................................................................................................</p>

              <!-- RIWAYAT -->
              <h6><strong>RIWAYAT PENYAKIT PASIEN</strong></h6>

              <p>Perdarahan yang tidak normal : Y ☐ T ☐</p>
              <p>Pembekuan darah tidak normal : Y ☐ T ☐</p>
              <p>Sakit maag : Y ☐ T ☐</p>
              <p>Anemia : Y ☐ T ☐</p>
              <p>Asma : Y ☐ T ☐</p>
              <p>Diabetes : Y ☐ T ☐</p>
              <p>Pingsan : Y ☐ T ☐</p>

              <p>Jelaskan penyakit yang dijawab "YA" :</p>
              <p>......................................................................................................................................................</p>

              <p>Apakah pasien pernah mendapatkan transfusi darah ? Y ☐ T ☐</p>
              <p>Apakah pasien pernah diperiksa untuk diagnosis HIV ? Y ☐ T ☐</p>
              <p>Hasil pemeriksaan HIV : Positif ☐ Negatif ☐</p>

              <p>Apakah pasien memakai: Lensa Kontak Y ☐ T ☐ Kacamata Y ☐ T ☐ Alat bantu dengar Y ☐ T ☐ Gigi palsu Y ☐ T ☐</p>

              <p>Riwayat operasi, tahun dan jenis operasi :</p>
              <p>......................................................................................................................................................</p>

              <p>Tanggal terakhir kali periksa kesehatan ke dokter :</p>
              <p>......................................................................................................................................................</p>

              <!-- KHUSUS PEREMPUAN -->
              <h6><strong>KHUSUS PASIEN PEREMPUAN</strong></h6>

              <p>Jumlah kehamilan ........................ Jumlah anak ........................</p>
              <p>Menstruasi terakhir ........................ Menyusui Y ☐ T ☐</p>
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
