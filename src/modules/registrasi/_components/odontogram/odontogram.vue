<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md="12">
              <div class="Odontogram">

              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="12" lg="12" xl="12">
              <b-table-simple hover striped style="margin-bottom: 0;">
                <b-thead>
                  <b-tr>
                    <b-th>Nomor Gigi</b-th>
                    <b-th>Penyakit</b-th>
                  </b-tr>
                </b-thead>

                <b-tbody>
                  <b-tr v-for="(item, idx) in data_odonto" :key="idx">
                    <b-td v-if="item.parent == true"><b>{{ item.nomor_gigi }}</b></b-td>
                    <b-td v-else style="padding-left:30px;">{{ item.nomor_gigi }}</b-td>
                    <b-td>{{ item.penyakit }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col>
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Occlusi
                  </template>
                  <b-form-radio-group id="occlusi" v-model="dataAnamnesa.occlusi">
                    <b-form-radio value="normal">Normal Bite</b-form-radio>
                    <b-form-radio value="cross">Cross Bite</b-form-radio>
                    <b-form-radio value="steep">Steep Bite</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Torus Palatinus
                  </template>
                  <b-form-radio-group id="torus_palatinus" v-model="dataAnamnesa.torus_palatinus">
                    <b-form-radio value="tidak_ada">Tidak Ada</b-form-radio>
                    <b-form-radio value="kecil">Kecil</b-form-radio>
                    <b-form-radio value="sedang">Sedang</b-form-radio>
                    <b-form-radio value="besar">Besar</b-form-radio>
                    <b-form-radio value="multiple">Multiple</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Torus Mandibularis
                  </template>
                  <b-form-radio-group id="torus_mandibularis" v-model="dataAnamnesa.torus_mandibularis">
                    <b-form-radio value="tidak_ada">Tidak Ada</b-form-radio>
                    <b-form-radio value="sisi_kiri">Sisi Kiri</b-form-radio>
                    <b-form-radio value="sisi_kanan">Sisi Kanan</b-form-radio>
                    <b-form-radio value="kedua_sisi">Kedua Sisi</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Palatum
                  </template>
                  <b-form-radio-group id="palatum" v-model="dataAnamnesa.palatum">
                    <b-form-radio value="dalam">Dalam</b-form-radio>
                    <b-form-radio value="sedang">Sedang</b-form-radio>
                    <b-form-radio value="rendah">Rendah</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Diastema
                  </template>
                  <b-form-radio-group id="diastema" v-model="dataAnamnesa.diastema">
                    <b-form-radio value="tidak_ada">Tidak Ada</b-form-radio>
                    <b-form-radio value="ada">Ada</b-form-radio>
                  </b-form-radio-group>
                  <b-form-input v-model="dataAnamnesa.penjelasan_diastema" placeholder="Penjelasan"></b-form-input>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Gigi Anomali
                  </template>
                  <b-form-radio-group id="gigi_anomali" v-model="dataAnamnesa.gigi_anomali">
                    <b-form-radio value="tidak_ada">Tidak Ada</b-form-radio>
                    <b-form-radio value="ada">Ada</b-form-radio>
                  </b-form-radio-group>
                  <b-form-input v-model="dataAnamnesa.penjelasan_gigi_anomali" placeholder="Penjelasan"></b-form-input>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Lain-lain
                  </template>
                  <b-form-input v-model="dataAnamnesa.lain_lain_odontogram" placeholder="Lain-lain"></b-form-input>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <b-row>
                    <b-col cols="4">
                      <b-form-group label-cols-md="2">
                        <template v-slot:label>
                          D:
                        </template>
                        <b-form-input v-model="dataAnamnesa.lain_lain_d" placeholder="D"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group label-cols-md="2">
                        <template v-slot:label>
                          M:
                        </template>
                        <b-form-input v-model="dataAnamnesa.lain_lain_m" placeholder="M"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group label-cols-md="2">
                        <template v-slot:label>
                          F:
                        </template>
                        <b-form-input v-model="dataAnamnesa.lain_lain_f" placeholder="F"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Jumlah Foto
                  </template>
                  <b-row>
                    <b-col>
                      <b-form-input v-model="dataAnamnesa.jumlah_foto" placeholder="Jumlah"></b-form-input>
                    </b-col>
                    <b-col>
                      <b-form-radio-group id="jenis_foto" v-model="dataAnamnesa.jenis_foto">
                        <b-form-radio value="digital">Digital</b-form-radio>
                        <b-form-radio value="intraoral">Intraoral</b-form-radio>
                      </b-form-radio-group>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Jumlah Foto Rontgen
                  </template>
                  <b-row>
                    <b-col>
                      <b-form-input v-model="dataAnamnesa.jumlah_foto_rontgen" placeholder="Jumlah"></b-form-input>
                    </b-col>
                    <b-col>
                      <b-form-radio-group id="jenis_foto_rontgen" v-model="dataAnamnesa.jenis_foto_rontgen">
                        <b-form-radio value="dental">Dental</b-form-radio>
                        <b-form-radio value="pa">PA</b-form-radio>
                        <b-form-radio value="opg">OPG</b-form-radio>
                        <b-form-radio value="ceph">Ceph</b-form-radio>
                      </b-form-radio-group>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Keterangan
                  </template>
                  <b-form-textarea v-model="dataAnamnesa.keterangan" placeholder="Lain-lain"></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="12" lg="12" xl="12">
              <div style="width: 100%;display: flex;justify-content: flex-end;">
                <b-button variant="success" @click="simpanData()" :disabled="kunjunganSelesai">Simpan</b-button>
              </div>

            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- MODAL !!! -->
    <b-modal id="modal-form-odontogram" size="lg" :title="judul" header-bg-variant="primary" header-text-variant="light"
      @hidden="resetModal">
      <div class="">
        <b-form>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Keadaan Gigi
            </template>
            <b-form-select v-model="keadaan_gigi" :options="options_keadaan_gigi"
              @change="setKeadaanGigi(keadaan_gigi)"></b-form-select>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Bahan Restorasi
            </template>
            <b-form-select v-model="bahan_restorasi" :options="options_bahan_restorasi"
              @change="setBahanRestorasi(bahan_restorasi)"></b-form-select>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Restorasi
            </template>
            <b-form-select v-model="restorasi" :options="options_restorasi"
              @change="setRestorasi(restorasi)"></b-form-select>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Protesa
            </template>
            <b-form-select v-model="protesa" :options="options_protesa" @change="setProtesa(protesa)"></b-form-select>
          </b-form-group>
          <b-form-group label-cols-md="3">
            <template v-slot:label>
              Keadaan Lainnya
            </template>
            <b-form-select v-model="keadaan_lainnya" :options="options_keadaan_lainnya"
              @change="setKeadaanLain(keadaan_lainnya)"></b-form-select>
          </b-form-group>
        </b-form>
        <!-- <b-form>
              <b-form-group label-cols-md="3">
              <template v-slot:label>
                  TANGGAL DIAGNOSA <span class="text-danger">*</span>
              </template>
              <date-picker
                  style="width: 100%"
                  id="a_tanggal_diagnosa_a"
                  format="DD-MM-YYYY"
                  v-model="is_data.a_tanggal_diagnosa_a"
              ></date-picker>

              ganti warna: <select v-model="warna" @change="gantiWarna">
              <option value="">-- Pilih --</option>
              <option value="blue">biru</option>
              <option value="red">merah</option>
            </select>

            Kasih Silang: <select v-model="silang" @change="kasihSilang">
              <option value="0">tidak</option>
               <option value="1">ya</option>
             
            </select>
              </b-form-group>
          </b-form> -->
      </div>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-form-odontogram')">
          Batal
        </b-button>
        <b-button variant="primary" @click="simpan()" :disabled="kunjunganSelesai">Simpan</b-button>
      </template>
    </b-modal>
  </b-container>
</template>
<script>
import moment from 'moment';
import { SVG } from '@svgdotjs/svg.js'
import _ from 'lodash';
moment.locale('id');
export default {
  props: {
    // 'dataAnamnesa', 
    // 'kunjunganSelesai',
    kunjunganSelesai: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    },
    dataAnamnesa : {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      keadaan_gigi: null,
      options_keadaan_gigi: [
        { value: "SOU", text: "SOU (Sound)" },
        { value: "NON", text: "NON (Non Information)" },
        { value: "UNE", text: "UNE (Unerupted)" },
        { value: "PRE", text: "PRE (Partial Erupted)" },
        { value: "IMV", text: "IMV (Impact Non Visible)" },
        { value: "ANO", text: "ANO (Anomali)" },
        { value: "DIA", text: "DIA (Diastema)" },
        { value: "ATT", text: "ATT (Attrition)" },
        { value: "ABR", text: "ABR (Abrasi)" },
        { value: "CAR", text: "CAR (Caries)" },
        { value: "CFR", text: "CFR (Crown Fractured)" },
        { value: "NVT", text: "NVT (Non Vital Tooth)" },
        { value: "RRX", text: "RRX (Retained Root)" },
        { value: "MIS", text: "MIS (Missing)" },
      ],
      bahan_restorasi: null,
      options_bahan_restorasi: [
        { value: "AMF", text: "AMF (Amalgam Filling)" },
        { value: "GIF", text: "GIF (GIC/Silika)" },
        { value: "COF", text: "COF (Composite Filling)" },
        { value: "FIS", text: "FIS (Fissure Sealent)" },
        { value: "INL", text: "INL (Inlay)" },
        { value: "ONL", text: "ONL (Onlay)" },
      ],
      restorasi: null,
      options_restorasi: [
        { value: "FMC", text: "FMC (Full Metal Crown)" },
        { value: "POC", text: "POC (Porcelain Crown)" },
        { value: "MPC", text: "MPC (Metal Porcelain Crown)" },
        { value: "GMC", text: "GMC (Gold Metal Crown)" },
        { value: "RCT", text: "RCT (Root Canal Treatment)" },
        { value: "IPX", text: "IPX (Implant)" },
        { value: "MEB", text: "MEB (Metal Bridge)" },
        { value: "POB", text: "POB (Porcelain Bridge)" },
        { value: "ABU", text: "ABU (Abutment)" },
        { value: "PON", text: "PON (Pontik)" },
        { value: "FMR-RCT", text: "FMR-RCT (Full Metal Crown + Root Canal Treatment)" },
        { value: "IPX-POC", text: "IPX-POC (Implant + Porcelain Crown)" },
        { value: "POC-RCT", text: "POC-RCT (Porcelain Crown + Root Canal Treatment)" },
      ],
      protesa: null,
      options_protesa: [
        { value: "PRD/FLD", text: "PRD/FLD (Partial Denture / Full Denture)" },
        { value: "PRD", text: "PRD (Partial Denture)" },
        { value: "FLD", text: "FLD (Full Denture)" },
        { value: "ACR", text: "ACR (Acrylic)" },
      ],
      keadaan_lainnya: null,
      options_keadaan_lainnya: [
        { value: "ABS", text: "ABS (Abses)" },
        { value: "CAL", text: "CAL (Calculus)" },
        { value: "PULP", text: "PULP (Pulpitis)" },
        { value: "PER", text: "PER (Periodontitis)" },
        { value: "GIV", text: "GIV (Gingivitis)" },
        { value: "AVS", text: "AVS (Alvusi)" },
        { value: "MUC", text: "MUC (Mucoccele)" },
        { value: "ULS", text: "ULS (Alcus Decubitus)" },
        { value: "PST", text: "PST (Persistensi)" },
        { value: "STO", text: "STO (Stomatitis)" },
        { value: "TMJ", text: "TMJ (TMJ/Clicing)" },
      ],
      items: [],
      listDokter: [],
      listPerawat: [],
      data: {
        occlusi: null,
        torus_palatinus: null,
        torus_mandibularis: null,
        palatum: null,
        diastema: null,
        gigi_anomali: null,
        penjelasan_diastema: null,
        penjelasan_gigi_anomali: null,
        lain_lain_odontogram: null,
        lain_lain_d: null,
        lain_lain_f: null,
        lain_lain_m: null,
        jumlah_foto: null,
        jenis_foto: null,
        jumlah_foto_rontgen: null,
        jenis_foto_rontgen: null,
        keterangan: null,
        kunjungan_id: null,
        ms_dokter_id: null,
        ms_perawat_id: null,
        bulk_gigi: null,
      },
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },
        {
          key: "nama_tanggal",
          label: "Tanggal",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "anamnesa",
          label: "Anamnesa",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "berat_badan",
          label: "Berat Badan",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "tinggi_badan",
          label: "Tinggi Badan",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "sitole",
          label: "Sitole / Diastole",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "user",
          label: "User",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
        },
      ],
      data_odonto: [],
      warna: "",
      silang: "",
      draw: null,
      judul: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      tableBusy: false,
      indexTerpilih: false,
      indexSubGigiTerpilih: false,
      dataTemplate: [{ "nomor_gigi": "11", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "11", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "11", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "11", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "11", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "11", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "12", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "12", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "12", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "12", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "12", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "12", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "13", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "13", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "13", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "13", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "13", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "13", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "14", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "14", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "14", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "14", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "14", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "14", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "15", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "15", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "15", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "15", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "15", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "15", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "16", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "16", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "16", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "16", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "16", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "16", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "17", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "17", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "17", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "17", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "17", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "17", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "18", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "18", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "18", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "18", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "18", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "18", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "19", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "19", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "19", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "19", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "19", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "19", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "20", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "20", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "20", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "20", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "20", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "20", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "21", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "21", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "21", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "21", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "21", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "21", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "22", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "22", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "22", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "22", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "22", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "22", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "23", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "23", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "23", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "23", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "23", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "23", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "24", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "24", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "24", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "24", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "24", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "24", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "25", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "25", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "25", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "25", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "25", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "25", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "26", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "26", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "26", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "26", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "26", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "26", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "27", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "27", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "27", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "27", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "27", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "27", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "28", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "28", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "28", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "28", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "28", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "28", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "29", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "29", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "29", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "29", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "29", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "29", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "30", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "30", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "30", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "30", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "30", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "30", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "31", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "31", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "31", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "31", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "31", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "31", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "32", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "32", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "32", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "32", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "32", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "32", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "33", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "33", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "33", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "33", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "33", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "33", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "34", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "34", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "34", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "34", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "34", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "34", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "35", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "35", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "35", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "35", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "35", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "35", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "36", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "36", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "36", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "36", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "36", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "36", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "37", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "37", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "37", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "37", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "37", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "37", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "38", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "38", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "38", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "38", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "38", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "38", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "39", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "39", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "39", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "39", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "39", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "39", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "40", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "40", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "40", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "40", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "40", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "40", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "41", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "41", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "41", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "41", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "41", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "41", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "42", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "42", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "42", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "42", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "42", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "42", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "43", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "43", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "43", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "43", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "43", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "43", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "44", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "44", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "44", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "44", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "44", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "44", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "45", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "45", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "45", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "45", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "45", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "45", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "46", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "46", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "46", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "46", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "46", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "46", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "47", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "47", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "47", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "47", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "47", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "47", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "48", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "48", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "48", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "48", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "48", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "48", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "49", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "49", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "49", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "49", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "49", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "49", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "50", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "50", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "50", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "50", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "50", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "50", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "51", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "51", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "51", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "51", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "51", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "51", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "52", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "52", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "52", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "52", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "52", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "52", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "53", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "53", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "53", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "53", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "53", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "53", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "54", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "54", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "54", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "54", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "54", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "54", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "55", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "55", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "55", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "55", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "55", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "55", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "56", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "56", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "56", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "56", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "56", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "56", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "57", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "57", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "57", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "57", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "57", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "57", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "58", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "58", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "58", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "58", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "58", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "58", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "59", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "59", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "59", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "59", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "59", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "59", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "60", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "60", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "60", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "60", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "60", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "60", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "61", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "61", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "61", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "61", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "61", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "61", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "62", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "62", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "62", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "62", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "62", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "62", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "63", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "63", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "63", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "63", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "63", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "63", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "64", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "64", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "64", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "64", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "64", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "64", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "65", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "65", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "65", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "65", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "65", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "65", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "66", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "66", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "66", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "66", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "66", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "66", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "67", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "67", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "67", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "67", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "67", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "67", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "68", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "68", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "68", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "68", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "68", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "68", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "69", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "69", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "69", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "69", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "69", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "69", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "70", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "70", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "70", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "70", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "70", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "70", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "71", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "71", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "71", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "71", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "71", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "71", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "72", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "72", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "72", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "72", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "72", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "72", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "73", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "73", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "73", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "73", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "73", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "73", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "74", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "74", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "74", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "74", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "74", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "74", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "75", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "75", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "75", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "75", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "75", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "75", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "76", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "76", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "76", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "76", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "76", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "76", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "77", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "77", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "77", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "77", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "77", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "77", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "78", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "78", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "78", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "78", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "78", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "78", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "79", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "79", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "79", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "79", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "79", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "79", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "80", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "80", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "80", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "80", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "80", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "80", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "81", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "81", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "81", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "81", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "81", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "81", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "82", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "82", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "82", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "82", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "82", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "82", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "83", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "83", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "83", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "83", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "83", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "83", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "84", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "84", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "84", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "84", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "84", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "84", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "85", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "85", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "85", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "85", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "85", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "85", "posisi": "tengah", "warna": "", "penyakit": "" }] }]
    }
  },
  watch: {
    // 'dataAnamnesa': {
    //   handler(data) {
    //     // console.log('ubah dataAnamnesa', data)
    //     const vm = this
    //     vm.data.ms_dokter_id = data.ms_dokter_id
    //     vm.data.ms_perawat_id = data.ms_perawat_id
    //     vm.data.kunjungan_id = data.kunjungan_id
    //   },
    //   deep: true
    // },
  },
  async mounted() {
    const vm = this
    // vm.getDatas()
    // vm.getList()
    vm.getData()
  },
  methods: {
    async getData() {
      let vm = this
      console.log('getData bulk gigi', this.dataAnamnesa.bulk_gigi)
      if (this.dataAnamnesa.bulk_gigi) this.dataTemplate = this.dataAnamnesa.bulk_gigi

      vm.load_odontogram()
      vm.load()
      vm.$forceUpdate()

      // let odonto = await vm.$axios.get('/odontogram/details_by_kunjungan/' + vm.data.kunjungan_id)
      // console.log(odonto, 'ini res odonto');
      // if (odonto.data.data.length != 0) {
      //   vm.data = odonto.data.data[0]
      //   if (vm.data.bulk_gigi.length) {
      //     vm.dataTemplate = vm.data.bulk_gigi
      //     // console.log(vm.dataTemplate, 'ini data template');
      //     // vm.load_odontogram()
      //     vm.load()
      //     vm.$forceUpdate()
      //   }
      // } else {
      //   vm.load_odontogram()

      //   vm.$forceUpdate()
      // }
      // console.log(vm.dataTemplate, 'asfafawdawsdawfszd');
    },
    async getList() {
      const vm = this
      vm.busy = true
      try {
        //dokter
        let listDokter = await vm.$axios.post('/tenaga_medis/list', { nama_jenis_tenaga_medis: 'dokter' })
        vm.listDokter = listDokter.data.status == 200 ? listDokter.data.data : []
        //perawat
        let listPerawat = await vm.$axios.post('/tenaga_medis/list', { nama_jenis_tenaga_medis: 'perawat' })
        vm.listPerawat = listPerawat.data.status == 200 ? listPerawat.data.data : []
      } catch (err) {
        if (err.message) {
          vm.triggerAlert({ variant: "danger", msg: err.message.toUpperCase(), showing: true });
        } else {
          vm.triggerAlert({ variant: "danger", msg: err.toUpperCase(), showing: true });
        }
      } finally {
        vm.busy = false;
      }
    },
    load_odontogram() {
      let vm = this;
      if (vm.draw) {
        vm.draw.clear();
      }
      let x = 0;
      let y = 0;
      document.getElementsByClassName('Odontogram')[0].innerHTML = ''
      vm.draw = SVG().addTo('.Odontogram').size(600, 400)

      //baris 1
      for (let i = 18; i >= 11; i--) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 11 && i <= 13) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }
      x += 20
      for (let i = 21; i <= 28; i++) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 21 && i <= 23) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }

      //baris 2
      x = 96
      y = 57
      for (let i = 55; i >= 51; i--) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 51 && i <= 53) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }

      x += 20

      for (let i = 61; i <= 65; i++) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 61 && i <= 63) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }

      //baris 3
      x = 96
      y = 114
      for (let i = 85; i >= 81; i--) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 81 && i <= 83) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }

      x += 20


      for (let i = 71; i <= 75; i++) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 71 && i <= 73) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }

      //baris 4
      x = 0
      y = (114 + 57)
      for (let i = 48; i >= 41; i--) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 41 && i <= 43) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }
      x += 20
      for (let i = 31; i <= 38; i++) {

        let nested = vm.draw.nested({ x, y })
        let group = nested.group().transform({ scale: 1.4 }).data('datane', { value: { nomor: i, posisi: 0, kode: 0 } });
        if (i >= 31 && i <= 33) {
          let atas = group.polygon('10,10 30,10 23,20 17,20').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('17,20 23,20 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('23,20 30,10 30,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 17,20 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik);
        } else {
          let atas = group.polygon('10,10 30,10 25,15 15,15').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'atas', kode: 1 } }).on('click', vm.klik)
          let bawah = group.polygon('15,25 25,25 30,30 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'bawah', kode: 2 } }).on('click', vm.klik)
          let kanan = group.polygon('25,15 30,10 30,30 25,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kanan', kode: 3 } }).on('click', vm.klik)
          let kiri = group.polygon('10,10 15,15 15,25 10,30').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'kiri', kode: 4 } }).on('click', vm.klik)
          let tengah = group.polygon('15,15 25,15 25,25 15,25').fill('none').stroke({ width: 1, color: 'black' }).data('datane', { value: { parent: i, posisi: 'tengah', kode: 5 } }).on('click', vm.klik)
        }
        let text = group.text(`${i}`).amove(14, 40).font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "10" }).data('datane', { value: { parent: i, posisi: 'text', kode: 6 } })

        x += 32;
        //    y+=25;
      }

    },
    circlePath(cx, cy, r) {
      return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,1 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,1 -' + (r * 2) + ',0';
    },
    klik(e) {
      let kotak = e.target.instance
      let data = kotak.data('datane');
      let vm = this;
      // console.log(vm.dataTemplate[0], data.value.parent);
      vm.indexTerpilih = _.findIndex(vm.dataTemplate, { nomor_gigi: data.value.parent.toString() });
      // console.log(vm.indexTerpilih);
      vm.indexSubGigiTerpilih = _.findIndex(vm.dataTemplate[vm.indexTerpilih].sub_gigi, { kode: data.value.kode.toString() });
      let dt = _.find(vm.dataTemplate, { nomor_gigi: data.value.parent.toString() });
      // console.log(dt, 'ini dt nyaaaaa');
      // console.log(vm.indexSubGigiTerpilih, 'sub gigi');
      vm.judul = `Gigi Nomor: ${data.value.parent}`
      vm.$bvModal.show('modal-form-odontogram')
      if (dt.penyakit.length) {
        // let keadaan = _.find(vm.options_keadaan_gigi, {value: dt.penyakit[0]} )
        // let protesa = _.find(vm.options_protesa, {value: dt.penyakit[0]} )
        // let restorasi = _.find(vm.options_restorasi, {value: dt.penyakit[0]} )
        // let bahan_restorasi = _.find(vm.options_bahan_restorasi, {value: dt.penyakit[0]} )
        // let keadaan_lainnya = _.find(vm.options_keadaan_lainnya, {value: dt.penyakit[0]} )
        // if(keadaan){
        //   vm.keadaan_gigi = keadaan.value
        // }else if(protesa){
        //   vm.protesa = protesa.value
        // }else if(restorasi){
        //   vm.restorasi = restorasi.value
        // }else if(bahan_restorasi){
        //   vm.bahan_restorasi = bahan_restorasi.value
        // }else if(keadaan_lainnya){
        //   vm.keadaan_lainnya = keadaan_lainnya.value
        // }
        let keadaan = null
        let protesa = null
        let restorasi = null
        let bahan_restorasi = null
        let keadaan_lainnya = null
        for (let i = 0; i < dt.penyakit.length; i++) {
          let x = dt.penyakit[i];
          for (let j = 0; j < vm.options_keadaan_gigi.length; j++) {
            let y = vm.options_keadaan_gigi[j];
            if (x == y.value) {
              keadaan = y.value
              // console.log(keadaan, 'keadaan');
            }
          }
          for (let j = 0; j < vm.options_protesa.length; j++) {
            let y = vm.options_protesa[j];
            if (x == y.value) {
              protesa = y.value
              // console.log(protesa, 'protesa');
            }
          }
          for (let j = 0; j < vm.options_restorasi.length; j++) {
            let y = vm.options_restorasi[j];
            if (x == y.value) {
              restorasi = y.value
              // console.log(restorasi, 'restorasi');
            }
          }
          for (let j = 0; j < vm.options_bahan_restorasi.length; j++) {
            let y = vm.options_bahan_restorasi[j];
            if (x == y.value) {
              bahan_restorasi = y.value
              // console.log(bahan_restorasi, 'bahan_restorasi');
            }
          }
          for (let j = 0; j < vm.options_keadaan_lainnya.length; j++) {
            let y = vm.options_keadaan_lainnya[j];
            if (x == y.value) {
              keadaan_lainnya = y.value
              // console.log(keadaan_lainnya, 'keadaan_lainnya');
            }
          }
        }
        if (keadaan) {
          vm.keadaan_gigi = keadaan
        } if (protesa) {
          vm.protesa = protesa
        } if (restorasi) {
          vm.restorasi = restorasi
        } if (bahan_restorasi) {
          vm.bahan_restorasi = bahan_restorasi
        } if (keadaan_lainnya) {
          vm.keadaan_lainnya = keadaan_lainnya
        }
      }
      if (dt.sub_gigi[vm.indexSubGigiTerpilih].penyakit) {
        let keadaan = _.find(vm.options_keadaan_gigi, { value: dt.sub_gigi[vm.indexSubGigiTerpilih].penyakit })
        let protesa = _.find(vm.options_protesa, { value: dt.sub_gigi[vm.indexSubGigiTerpilih].penyakit })
        let restorasi = _.find(vm.options_restorasi, { value: dt.sub_gigi[vm.indexSubGigiTerpilih].penyakit })
        let bahan_restorasi = _.find(vm.options_bahan_restorasi, { value: dt.sub_gigi[vm.indexSubGigiTerpilih].penyakit })
        let keadaan_lainnya = _.find(vm.options_keadaan_lainnya, { value: dt.sub_gigi[vm.indexSubGigiTerpilih].penyakit })
        if (keadaan) {
          vm.keadaan_gigi = keadaan.value
        } else if (protesa) {
          vm.protesa = protesa.value
        } else if (restorasi) {
          vm.restorasi = restorasi.value
        } else if (bahan_restorasi) {
          vm.bahan_restorasi = bahan_restorasi.value
        } else if (keadaan_lainnya) {
          vm.keadaan_lainnya = keadaan_lainnya.value
        }
      }
      // this.openModal()
      // let nested = this.parent()

      //warnai satu
      // kotak.fill('blue')

      //warnai kabeh
      // nested.each(function(i, children) {
      //     this.fill({ color: 'blue' })
      // })

      //text atas
      // nested.text("NON").font({ fill: 'navy', family: 'Inconsolata', width:"0.1", size:"8" }).move(11,0)

      //lingkaran
      // nested.path(circlePath(10,10,8)).move(12,12).fill('none').stroke({ width: 1, color:'red' })

      //silang
      // nested.line(10,10,30,30).stroke({ width: 2, color:'red' })
      // nested.line(10,30,30,10).stroke({ width: 2, color:'red' })

      //garis tengah
      // nested.line(10,20,30,20).stroke({ width: 2, color:'red' })

      //garis kanan atas ke kiri bawah
      // nested.line(10,30,30,10).stroke({ width: 2, color:'red' })

      //segitiga bawah
      //  nested.polyline('15,30 25,30 20,45 15,30').stroke({ width: 2, color:'red' }).fill('none')

      //kotak luar
      //  nested.polyline('10,10 30,10 30,30 10,30 10,10').stroke({ width: 2, color:'red' }).fill('none')


    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
    load() {
      let vm = this;
      vm.load_odontogram();
      vm.data_odonto = []
      // console.log(vm.draw);
      vm.draw.each(function (i, children) {
        let d = this;

        // console.log(children, 'abcd');
        let kotak_dalam = this.children()[0].children();
        let kotak = this.children()[0];

        let data_kotak = kotak.data('datane');
        // console.log(data_kotak.value.nomor.toString());
        let dt = _.find(vm.dataTemplate, { nomor_gigi: data_kotak.value.nomor.toString() });

        if (dt) {


          if (dt.penyakit.length) {
            let penampung = {}
            penampung.nomor_gigi = dt.nomor_gigi
            penampung.penyakit = ""
            penampung.parent = true
            for (let i = 0; i < dt.penyakit.length; i++) {
              let x = dt.penyakit[i];
              if (penampung.penyakit) {
                penampung.penyakit += `, ${x}`
              } else {
                penampung.penyakit = x
              }
            }
            vm.data_odonto.push(penampung)
            console.log(vm.data_odonto, 'ini data odonto');
            for (let p = 0; p < dt.penyakit.length; p++) {
              //silang
              if (dt.penyakit[p] == 'MIS') {
                kotak.line(10, 10, 30, 30).stroke({ width: 2, color: 'black' })
                kotak.line(10, 30, 30, 10).stroke({ width: 2, color: 'black' })
              }
              if (dt.penyakit[p] == 'RRX') {
                kotak.line(10, 10, 20, 30).stroke({ width: 2, color: 'black' })
                kotak.line(20, 30, 30, 0).stroke({ width: 2, color: 'black' })
              }
              if (dt.penyakit[p] == 'PRD/FLD') {
                kotak.line(10, 10, 30, 30).stroke({ width: 2, color: 'black' })
                kotak.line(10, 30, 30, 10).stroke({ width: 2, color: 'black' })
                kotak.text("PRD/FLD").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "5" }).move(11, 0)
              }
              //lingkaran
              if (dt.penyakit[p] == 'lingkaran') {
                kotak.path(vm.circlePath(10, 10, 8)).move(12, 12).fill('none').stroke({ width: 1, color: 'black' })
              }

              //text
              if (dt.penyakit[p] == 'NON') {
                kotak.text("NON").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'UNE') {
                kotak.text("UNE").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'PRE') {
                kotak.text("PRE").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'IMV') {
                kotak.text("IMV").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'ANO') {
                kotak.text("ANO").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'ABS') {
                kotak.text("ABS").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'CAL') {
                kotak.text("CAL").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'PULP') {
                kotak.text("PULP").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'PER') {
                kotak.text("PER").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'GIV') {
                kotak.text("GIV").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'AVS') {
                kotak.text("AVS").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'MUC') {
                kotak.text("MUC").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'ULS') {
                kotak.text("ULS").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'PST') {
                kotak.text("PST").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'STO') {
                kotak.text("STO").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              if (dt.penyakit[p] == 'PRD') {
                kotak.text("PRD").font({ fill: 'navy', family: 'Inconsolata', width: "0.1", size: "8" }).move(11, 0)
              }
              //strip
              if (dt.penyakit[p] == 'strip') {
                kotak.line(10, 20, 30, 20).stroke({ width: 2, color: 'black' })
              }
              //garis kanan atas ke kiri bawah
              if (dt.penyakit[p] == 'miring') {
                kotak.line(10, 30, 30, 10).stroke({ width: 2, color: 'black' })
              }
              //segitiga bawah
              if (dt.penyakit[p] == 'NVT') {
                kotak.polyline('15,30 25,30 20,45 15,30').stroke({ width: 2, color: 'black' }).fill('none')
              }
              if (dt.penyakit[p] == 'RCT') {
                kotak.polyline('15,30 25,30 20,45 15,30').stroke({ width: 2, color: 'black' }).fill('black')
              }
              //kotak luar
              if (dt.penyakit[p] == 'FMC') {
                kotak.polyline('10,10 30,10 30,30 10,30 10,10').stroke({ width: 2, color: 'black' }).fill('none')
              }
              if (dt.penyakit[p] == 'FMR-RCT') {
                kotak.polyline('10,10 30,10 30,30 10,30 10,10').stroke({ width: 2, color: 'black' }).fill('none')
                kotak.polyline('15,30 25,30 20,45 15,30').stroke({ width: 2, color: 'black' }).fill('black')
              }
              //warna semua
              if (dt.penyakit[p] == 'INL' || dt.penyakit[p] == 'ONL') {
                kotak.each(function (i, children) {
                  this.fill({ color: 'black' })
                })
              }
              if (dt.penyakit[p] == 'MPC') {
                kotak.each(function (i, children) {
                  this.fill({ color: 'green' })
                })
              }
              if (dt.penyakit[p] == 'GMC') {
                kotak.each(function (i, children) {
                  this.fill({ color: 'red' })
                })
              }
              if (dt.penyakit[p] == 'ACR') {
                kotak.each(function (i, children) {
                  this.fill({ color: 'pink' })
                })
              }
            }
          }

          for (let l = 0; l < kotak_dalam.length; l++) {
            kotak_dalam[l].each(function (i, c) {

              //kotak2 yg ada di dalam kota besar
              let x = this;

              let data_kotak_dalam = x.data('datane');
              if (data_kotak_dalam) {
                // console.log(data_kotak_dalam[u].value.kode);
                let dt2 = _.find(dt.sub_gigi, { parent: dt.nomor_gigi.toString(), kode: data_kotak_dalam.value.kode.toString() });
                if (dt2) {
                  if (dt2.warna) {
                    // console.log(dt2, 'ini dt2');
                    let penampung = {}
                    penampung.nomor_gigi = `${dt2.parent} - ${dt2.posisi}`
                    penampung.penyakit = dt2.penyakit
                    penampung.parent = false
                    vm.data_odonto.push(penampung)
                    this[u].fill(dt2.warna)
                    // this[u].fill(dt2.warna).attr({'fill-opacity': 0.5})
                    //tambah kandel
                    // this[u].stroke({ width: 3, color:'black' })
                  } else {
                    this[u].fill('none')
                  }

                }
              }



              // console.log(vm.data_odonto, 'ini data odonto');
            })
          }

        }



      })

    },
    setKeadaanGigi(x) {
      let vm = this
      // console.log(vm.indexTerpilih, vm.indexSubGigiTerpilih);
      if (vm.indexSubGigiTerpilih >= 0) {
        if (x == "SOU") {
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].penyakit = x;
        }
        if (x == "NON") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "UNE") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "PRE") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "IMV") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ANO") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "DIA") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ATT") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ABR") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "CAR") {
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].warna = "white";
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].penyakit = x;
        }
        if (x == "CFR") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "NVT") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "RRX") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "MIS") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
      }
      // console.log( vm.dataTemplate);
    },
    setBahanRestorasi(x) {
      let vm = this
      if (vm.indexSubGigiTerpilih >= 0) {
        if (x == "AMF") {
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].penyakit = x;
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].warna = "black";
        }
        if (x == "GIF") {
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].penyakit = x;
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].warna = "green";
        }
        if (x == "COF") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "FIS") {
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].penyakit = x;
          vm.dataTemplate[vm.indexTerpilih].sub_gigi[vm.indexSubGigiTerpilih].warna = "pink";
        }
        if (x == "INL") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ONL") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
      }
    },
    setRestorasi(x) {
      let vm = this
      if (vm.indexSubGigiTerpilih >= 0) {
        if (x == "FMC") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "POC") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "MPC") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "GMC") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "RCT") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "IPX") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "MEB") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "POB") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "PON") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ABU") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "FMR-RCT") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "IPX-POC") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "POC-RCT") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
      }
    },
    setProtesa(x) {
      let vm = this
      if (vm.indexSubGigiTerpilih >= 0) {
        if (x == "PRD/FLD") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "PRD") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "FLD") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ACR") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
      }
    },
    setKeadaanLain(x) {
      let vm = this
      if (vm.indexSubGigiTerpilih >= 0) {
        if (x == "ABS") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "CAL") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "PULP") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "PER") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "GIV") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "AVS") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "MUC") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "ULS") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "PST") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "STO") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
        if (x == "TMJ") {
          vm.dataTemplate[vm.indexTerpilih].penyakit.push(x);
        }
      }
    },
    simpan() {
      let vm = this
      // console.log(vm.dataTemplate, 'ini template');
      vm.load()
      vm.$bvModal.hide('modal-form-odontogram')
      vm.resetModal()
    },
    simpanData() {
      let vm = this
      // vm.data.bulk_gigi = vm.dataTemplate
      vm.dataAnamnesa.bulk_gigi = vm.dataTemplate

      this.$emit('submit', vm.dataAnamnesa)
      // vm.$axios.post('/odontogram/registerBulk', vm.data)
      //   .then((res) => {
      //     // console.log(res, 'ini respon');
      //     if (res.data.status == 200 && res.data.message == 'sukses') {
      //       vm.dataTemplate = [{ "nomor_gigi": "11", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "11", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "11", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "11", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "11", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "11", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "12", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "12", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "12", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "12", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "12", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "12", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "13", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "13", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "13", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "13", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "13", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "13", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "14", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "14", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "14", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "14", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "14", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "14", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "15", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "15", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "15", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "15", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "15", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "15", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "16", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "16", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "16", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "16", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "16", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "16", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "17", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "17", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "17", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "17", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "17", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "17", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "18", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "18", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "18", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "18", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "18", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "18", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "19", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "19", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "19", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "19", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "19", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "19", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "20", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "20", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "20", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "20", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "20", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "20", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "21", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "21", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "21", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "21", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "21", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "21", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "22", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "22", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "22", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "22", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "22", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "22", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "23", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "23", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "23", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "23", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "23", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "23", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "24", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "24", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "24", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "24", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "24", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "24", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "25", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "25", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "25", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "25", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "25", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "25", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "26", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "26", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "26", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "26", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "26", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "26", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "27", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "27", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "27", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "27", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "27", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "27", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "28", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "28", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "28", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "28", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "28", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "28", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "29", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "29", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "29", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "29", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "29", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "29", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "30", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "30", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "30", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "30", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "30", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "30", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "31", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "31", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "31", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "31", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "31", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "31", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "32", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "32", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "32", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "32", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "32", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "32", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "33", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "33", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "33", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "33", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "33", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "33", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "34", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "34", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "34", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "34", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "34", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "34", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "35", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "35", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "35", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "35", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "35", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "35", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "36", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "36", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "36", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "36", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "36", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "36", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "37", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "37", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "37", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "37", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "37", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "37", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "38", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "38", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "38", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "38", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "38", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "38", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "39", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "39", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "39", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "39", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "39", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "39", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "40", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "40", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "40", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "40", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "40", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "40", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "41", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "41", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "41", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "41", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "41", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "41", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "42", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "42", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "42", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "42", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "42", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "42", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "43", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "43", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "43", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "43", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "43", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "43", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "44", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "44", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "44", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "44", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "44", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "44", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "45", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "45", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "45", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "45", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "45", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "45", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "46", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "46", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "46", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "46", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "46", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "46", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "47", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "47", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "47", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "47", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "47", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "47", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "48", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "48", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "48", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "48", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "48", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "48", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "49", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "49", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "49", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "49", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "49", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "49", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "50", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "50", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "50", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "50", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "50", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "50", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "51", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "51", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "51", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "51", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "51", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "51", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "52", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "52", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "52", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "52", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "52", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "52", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "53", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "53", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "53", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "53", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "53", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "53", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "54", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "54", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "54", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "54", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "54", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "54", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "55", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "55", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "55", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "55", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "55", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "55", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "56", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "56", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "56", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "56", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "56", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "56", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "57", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "57", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "57", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "57", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "57", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "57", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "58", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "58", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "58", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "58", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "58", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "58", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "59", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "59", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "59", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "59", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "59", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "59", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "60", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "60", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "60", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "60", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "60", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "60", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "61", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "61", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "61", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "61", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "61", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "61", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "62", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "62", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "62", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "62", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "62", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "62", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "63", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "63", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "63", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "63", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "63", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "63", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "64", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "64", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "64", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "64", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "64", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "64", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "65", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "65", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "65", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "65", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "65", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "65", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "66", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "66", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "66", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "66", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "66", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "66", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "67", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "67", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "67", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "67", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "67", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "67", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "68", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "68", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "68", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "68", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "68", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "68", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "69", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "69", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "69", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "69", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "69", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "69", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "70", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "70", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "70", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "70", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "70", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "70", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "71", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "71", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "71", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "71", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "71", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "71", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "72", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "72", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "72", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "72", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "72", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "72", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "73", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "73", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "73", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "73", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "73", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "73", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "74", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "74", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "74", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "74", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "74", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "74", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "75", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "75", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "75", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "75", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "75", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "75", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "76", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "76", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "76", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "76", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "76", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "76", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "77", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "77", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "77", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "77", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "77", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "77", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "78", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "78", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "78", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "78", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "78", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "78", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "79", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "79", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "79", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "79", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "79", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "79", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "80", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "80", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "80", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "80", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "80", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "80", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "81", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "81", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "81", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "81", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "81", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "81", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "82", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "82", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "82", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "82", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "82", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "82", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "83", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "83", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "83", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "83", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "83", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "83", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "84", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "84", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "84", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "84", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "84", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "84", "posisi": "tengah", "warna": "", "penyakit": "" }] }, { "nomor_gigi": "85", "penyakit": [], "sub_gigi": [{ "kode": "1", "parent": "85", "posisi": "atas", "warna": "", "penyakit": "" }, { "kode": "2", "parent": "85", "posisi": "bawah", "warna": "", "penyakit": "" }, { "kode": "3", "parent": "85", "posisi": "kanan", "warna": "", "penyakit": "" }, { "kode": "4", "parent": "85", "posisi": "kiri", "warna": "", "penyakit": "" }, { "kode": "5", "parent": "85", "posisi": "tengah", "warna": "", "penyakit": "" }] }];
      //       vm.$store.commit("set_alert", { variant: "success", msg: 'Berhasil Menyimpan Odontogram', showing: true });
      //     } else {
      //       vm.$store.commit("set_alert", { variant: "success", msg: res.data.message, showing: true });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     vm.$store.commit("set_alert", { variant: "success", msg: "TERJADI KESALAHAN PADA SERVER", showing: true });
      //   })
    },
    resetModal() {
      let vm = this;
      vm.warna = "";
      vm.bahan_restorasi = ""
      vm.keadaan_gigi = ""
      vm.restorasi = ""
      vm.keadaan_lainnya = ""
      vm.protesa = ""
      vm.silang = 0
    }
  },
}
</script>
<style>
svg.tooth {
  cursor: pointer;
  fill: white;
}

svg.tooth .to-do {
  fill: red;
}

svg.tooth .done {
  fill: blue;
}

svg.tooth .active {
  fill: gray;
}

svg.tooth polygon {
  stroke: black;
  stroke-width: 0.5;
}

polygon:hover {
  fill: lightgray;
}

rect:hover {
  fill: lightgray;
}

.tooth-wrapper {
  margin: 0 2px;
  position: relative;
}

.flex-container-justify {
  display: flex;
  justify-content: space-around;
}

.flex-container-right {
  display: flex;
  justify-content: flex-end;
}

.flex-container-left {
  display: flex;
  justify-content: flex-start;
}

.tooth {
  font-size: 6pt;
  font-weight: normal;
}



#tengah {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #222;
  position: relative;
  background-color: #b3e6f4;
}



.btn-open {
  position: absolute;
  bottom: 150px;
}

.btn-close {
  transform: translate(10px, -20px);
  padding: 0.5rem 0.7rem;
  background: #eee;
  border-radius: 50%;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1;
}

.hidden {
  display: none;
}
</style>