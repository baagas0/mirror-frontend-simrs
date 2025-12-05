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
            <multiselect
              v-model="selectedJadwal"
              :options="listJadwal"
              placeholder="Pilih Jadwal Operasi"
              label="label"
              track-by="id"
              :allow-empty="false"
              @select="onJadwalSelected"
            >
            </multiselect>
            <button
              class="btn btn-primary ml-3"
              @click="printForm"
              :disabled="!selectedJadwal"
            >
              <i class="ri-printer-line"></i> Cetak Form
            </button>
          </div>
        </div>
      </div>
      <div class="card-body pt-2">
        <div class="alert alert-info" v-if="!selectedJadwal">
          <i class="ri-information-line"></i> Silakan pilih jadwal operasi terlebih dahulu untuk menampilkan form persetujuan tindakan operasi.
        </div>

        <!-- Form Persetujuan Tindakan Operasi -->
        <div id="printArea" class="print-area" v-if="selectedJadwal">
          <!-- Header Rumah Sakit -->
          <table class="custom-table" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td rowspan="2" style="height: 60px; text-align: center; vertical-align: middle;">
                <img src="/static/img/logo/baubau.png" alt="Logo RSUD" height="70px">
              </td>
              <td style="height: 25px; text-align: center; vertical-align: middle;">
                <h5 style="font-weight: 600; font-size: 25px; line-height: 35px; margin: 0;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h5>
              </td>
            </tr>
            <tr>
              <td style="height: 15px; text-align: center; vertical-align: middle;">
                Jl. Gajah Mada Kec. Batauga Kab. Buton Selatan, Sulawesi Tenggara
              </td>
            </tr>
            <tr class="bg-dark">
              <td colspan="2" style="text-align: center; vertical-align: middle; font-weight: 600; height: 20px; color: white;">
                FORMULIR PERSETUJUAN TINDAKAN KEDOKTERAN - INFORMED CONSENT
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px;"></div>

          <!-- Data Pasien -->
          <div class="row mb-4">
            <div class="col-12">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td width="20%"><strong>Nama Pasien</strong></td>
                    <td width="5%">:</td>
                    <td>{{ selectedJadwal.nama_lengkap || '-' }}</td>
                    <td width="20%"><strong>No. RM</strong></td>
                    <td width="5%">:</td>
                    <td>{{ selectedJadwal.no_rm || '-' }}</td>
                  </tr>
                  <tr>
                    <td><strong>Umur</strong></td>
                    <td>:</td>
                    <td>{{ selectedJadwal.umur || '-' }}</td>
                    <td><strong>Jenis Kelamin</strong></td>
                    <td>:</td>
                    <td>{{ selectedJadwal.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
                  </tr>
                  <tr>
                    <td><strong>Alamat</strong></td>
                    <td>:</td>
                    <td colspan="4">{{ selectedJadwal.alamat || '-' }}</td>
                  </tr>
                  <tr>
                    <td><strong>Tanggal Operasi</strong></td>
                    <td>:</td>
                    <td>{{ formatDateTime(selectedJadwal.tanggal_operasi) }}</td>
                    <td><strong>Ruang</strong></td>
                    <td>:</td>
                    <td>{{ selectedJadwal.nama_ruang || '-' }}</td>
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
                    <td colspan="4">{{ selectedJadwal.nama_jasa || '-' }}</td>
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
                    <td>{{ selectedJadwal.nama_dokter || '-' }}</td>
                  </tr>
                  <tr>
                    <td><strong>Pemberi informasi</strong></td>
                    <td>:</td>
                    <td>{{ selectedJadwal.nama_dokter || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PENERIMA INFORMASI -->
          <div class="row mb-4">
            <div class="col-12">
              <h6><strong>PENERIMA INFORMASI / PEMBERI PERSETUJUAN</strong></h6>
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
                        <div v-for="(diagnosa, i) in selectedJadwal.data_diagnosa" :key="i">
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
                    <td>{{ selectedJadwal.nama_jasa || '-' }}</td>
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

          <!-- DATA MAPPING OPERASI -->
          <div class="row mb-4" v-if="selectedJadwal && dataMappingOperasi.length > 0">
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
                  <tr v-for="(item, i) in dataMappingOperasi" :key="'mapping-'+i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.properties.bagian_tubuh || '-' }}</td>
                    <td>{{ item.properties.keterangan || '-' }}</td>
                    <td class="text-center">
                      <span class="badge badge-info">
                        X: {{ item.properties.lat || '-' }}, Y: {{ item.properties.lng || '-' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Informasi jika tidak ada mapping -->
          <div class="row mb-4" v-else-if="selectedJadwal">
            <div class="col-12">
              <div class="alert alert-warning">
                <i class="ri-information-line"></i>
                <strong>Informasi:</strong> Belum ada data mapping anatomi untuk operasi ini. Silakan lakukan mapping anatomi terlebih dahulu di menu <strong>Mapping Operasi</strong>.
              </div>
            </div>
          </div>

          <!-- PERNYATAAN DOKTER -->
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
                        <div class="signature-box" style="height: 60px; border-bottom: 1px solid #000;"></div>
                        <p class="mb-0 mt-1">({{ selectedJadwal.nama_dokter || 'Dokter Pelaksana' }})</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PERNYATAAN PASIEN -->
          <div class="row mb-4">
            <div class="col-12">
              <p class="mb-2"><strong>Dengan ini bahwa saya telah menerima informasi sebagimana diatas yang telah diberi tanda / paraf dikolom kanannya,dan telah memahaminya</strong></p>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td width="60%">&nbsp;</td>
                    <td width="40%">
                      <div class="text-center">
                        <p class="mb-1"><strong>Tanda tangan</strong></p>
                        <div class="signature-box" style="height: 60px; border-bottom: 1px solid #000;"></div>
                        <p class="mb-0 mt-1">({{ selectedJadwal.nama_lengkap || 'Pasien' }})</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="mb-0"><em>Nb: bila pasien tidak kompeten atau kooperatif,maka penerima informasi adalah wali atau keluarga terdekat</em></p>
            </div>
          </div>

          <!-- PERSETUJUAN TINDAKAN KEDOKTERAN -->
          <div class="row mb-4">
            <div class="col-12">
              <h6><strong>PERSETUJUAN TINDAKAN KEDOKTERAN</strong></h6>
              <p class="mb-2">Yang bertanda tangan dibawah ini saya, nama........................ hubungan dengan pasien .............................. jenis kelamin................... umur........th, alamat..............................................................................................................</p>
              <p class="mb-2">Dengan ini menyatakan persetujuan untuk dilakukan tindakan................................................................................ terhadap........... ......name...............................umur.....th, alamat..........................................................................</p>
              <p class="mb-3">Saya memahami dan perlunya manfaat tindakan tersebut sebagaimana telah dijelaskan seperti diatas kepada saya, termasuk risiko dan komplikasinya yang mungkin timbul .saya juga menyadari bahwa oleh ilmu kedokteran bukanlah ilmu pasti maka keberhasilan tindakan kedokteran bukanlah bukanlah keniscayaan, melainkan sangat bergantung kepada Tuhan Yang Maha Esa.</p>

              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td colspan="2" class="text-center"><strong>Buton Selatan, {{ getCurrentDate() }} pukul {{ getCurrentTime() }}</strong></td>
                  </tr>
                  <tr>
                    <td width="50%" class="text-center">
                      <p class="mb-1"><strong>Yang menyatakan</strong></p>
                      <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000; margin: 20px 0;"></div>
                      <p class="mb-0">({{ selectedJadwal.nama_lengkap || 'Pasien/Keluarga' }})</p>
                    </td>
                    <td width="50%" class="text-center">
                      <p class="mb-1"><strong>saksi</strong></p>
                      <div class="signature-box" style="height: 80px; border-bottom: 1px solid #000; margin: 20px 0;"></div>
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
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import moment from 'moment'
import config from '@/config'
moment.locale('id')

export default {
  name: 'persetujuan_operasi',
  components: {
    Multiselect
  },
  data() {
    return {
      selectedJadwal: null,
      listJadwal: [],
      logoUrl: config.logo.lg,
      dataMappingOperasi: []
    }
  },
  mounted() {
    this.getJadwalOperasi()
  },
  methods: {
    async getJadwalOperasi() {
      try {
        const response = await this.$_api.post('jadwal_operasi/list')
        if (response.status) {
          this.listJadwal = response.data.map(item => ({
            id: item.jadwal_operasi_id,
            label: `${item.tanggal_operasi.split('T')[0]} - ${item.nama_lengkap} (${item.no_kunjungan})`,
            ...item
          }))
        }
      } catch (error) {
        console.error('Error fetching jadwal operasi:', error)
        this.$store.commit('set_alert', {
          variant: "danger",
          msg: "Gagal memuat data jadwal operasi",
          showing: true
        })
      }
    },
    onJadwalSelected(jadwal) {
      this.selectedJadwal = jadwal
      this.loadMappingData(jadwal.jadwal_operasi_id)
    },
    formatDateTime(date) {
      return date ? moment(date).format('DD MMMM YYYY, HH:mm') : '-'
    },
    getCurrentDate() {
      return moment().format('DD MMMM YYYY')
    },
    getCurrentTime() {
      return moment().format('HH:mm')
    },
    async loadMappingData(jadwalOperasiId) {
      try {
        // Reset data mapping
        this.dataMappingOperasi = []

        if (!jadwalOperasiId) return

        // Cek apakah jadwal yang dipilih sudah ada data mapping
        if (this.selectedJadwal && this.selectedJadwal.data_mapping_operasi) {
          const existingMapping = Array.isArray(this.selectedJadwal.data_mapping_operasi)
            ? this.selectedJadwal.data_mapping_operasi
            : []

          // Format data mapping ke struktur yang konsisten
          const formattedMapping = existingMapping.map(item => {
            if (typeof item === 'object' && item !== null) {
              // If item is already in the correct GeoJSON format
              if (item.type === 'Feature' && item.geometry && item.properties) {
                return item
              }
              // If item is in a different format, convert it to GeoJSON
              else if (item.lat && item.lng) {
                return {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [item.lng, item.lat]
                  },
                  "properties": {
                    bagian_tubuh: item.bagian_tubuh || '',
                    keterangan: item.keterangan || '',
                    lat: item.lat,
                    lng: item.lng
                  }
                }
              }
            }
            return null
          }).filter(Boolean) // Remove null items

          this.dataMappingOperasi = formattedMapping
        }
      } catch (error) {
        console.error('Error loading mapping data:', error)
        this.$store.commit('set_alert', {
          variant: "warning",
          msg: "Gagal memuat data mapping operasi",
          showing: true
        })
      }
    },
    printForm() {
      if (!this.selectedJadwal) {
        this.$store.commit('set_alert', {
          variant: "warning",
          msg: "Silakan pilih jadwal operasi terlebih dahulu",
          showing: true
        })
        return
      }

      const printContent = document.getElementById('printArea').innerHTML

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
      `

      // Open print window
      const printWindow = window.open('', '_blank')
      printWindow.document.write(printHTML)
      printWindow.document.close()

      // Wait for content to load before printing
      printWindow.onload = function() {
        printWindow.print()
        printWindow.close()
      }

      this.$store.commit('set_alert', {
        variant: "success",
        msg: "Form persetujuan tindakan operasi siap untuk dicetak",
        showing: true
      })
    }
  }
}
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