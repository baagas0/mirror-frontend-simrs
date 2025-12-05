<template>
  <div id="page-surat-ket-lahir">
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <!-- <b-button variant="success" class="mr-2">Buat Baru Kehamilan</b-button> -->
          <!-- <b-button variant="success">Cetak Kartu Ibu</b-button> -->
        </div>
      </b-col>
    </b-row>
    
    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="3" lg="3">
        <label>ID </label>
        <b-form-input type="text" placeholder="Otomatis" disabled></b-form-input>
      </b-col>

      <b-col cols="12" sm="12" md="3" lg="3">
        <label>No. BPM/RB</label>
        <b-form-input type="text" v-model="no_bpm_rb"></b-form-input>
      </b-col>

      <b-col cols="12" sm="12" md="6" lg="6">
        <label>No. SKL<span class="text-danger">*</span></label>
        <b-form-input type="text" v-model="no_skl"></b-form-input>
      </b-col>
    </b-row>

    <b-row style="margin-top: 15px;">
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <h6 class="custom-title">Kelahiran</h6>
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Nama Bayi<span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            v-model="nama_bayi"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tanggal Lahir<span class="text-danger">*</span>
          </template>
          <b-form-datepicker
            style="width: 100%"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            no-flip
            locale="id"
            v-model="tanggal_lahir_bayi"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Jenis Kelamin<span class="text-danger">*</span>
          </template>
          <b-form-select
            :options="option_jenis_kelamin"
            v-model="jenis_kelamin_bayi"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Jenis Kelahiran<span class="text-danger">*</span>
          </template>
          <b-form-select
            :options="option_jenis_kelahiran"
            v-model="jenis_kelahiran_bayi"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Kelahiran Ke<span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            v-model="kelahiran_ke"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Berat Lahir<span class="text-danger">*</span>
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
            type="text"
            class="custom-input-text"
            v-model="berat_lahir"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>gram</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Panjang Badan<span class="text-danger">*</span>
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
            type="text"
            class="custom-input-text"
            v-model="panjang_badan"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>cm</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Tempat Bersalin<span class="text-danger">*</span>
          </template>
          <b-form-select
            :options="option_tempat_bersalin"
            v-model="tempat_bersalin"
            size="sm"
          ></b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Alamat Bersalin<span class="text-danger">*</span>
          </template>
          <b-form-textarea
            rows="2"
            v-model="alamat_bersalin"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <h6 class="custom-title">Orang Tua</h6>
        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Nama Ibu<span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            v-model="data_orang_tua.nama_ibu"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Umur Ibu
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
            type="number"
            class="custom-input-text"
            v-model="data_orang_tua.umur_ibu"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>tahun</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            KTP/NIK NO 
          </template>
          <b-form-input
            type="number"
            v-model="data_orang_tua.no_ktp_ibu"
            ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pekerjaan Ibu
          </template>
          <b-form-input
            type="text"
            v-model="data_orang_tua.pekerjaan_ibu"
            ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Nama Ayah
          </template>
          <b-form-input
            type="text"
            v-model="data_orang_tua.nama_ayah"
            ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Umur Ayah
          </template>
          <div style="width:100%;display: flex;">
            <b-form-input
            type="number" class="custom-input-text"
            v-model="data_orang_tua.umur_ayah"
            ></b-form-input>
            <div class="custom-box-satuan">
              <h6>tahun</h6>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            KTP/NIK NO 
          </template>
          <b-form-input
            type="number"
            v-model="data_orang_tua.no_ktp_ayah"
            ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Pekerjaan Ayah
          </template>
          <b-form-input
            type="text"
            v-model="data_orang_tua.pekerjaan_ayah"
            ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Alamat Orang Tua
          </template>
          <b-form-textarea
            rows="2"
            v-model="data_orang_tua.alamat_bersalin"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Kecamatan
          </template>
          <b-form-input
            type="text"
            v-model="data_orang_tua.kecamatan"
            ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="4">
          <template v-slot:label>
            Kota/Kab
          </template>
          <b-form-input
            type="text"
            v-model="data_orang_tua.kota"
            ></b-form-input>
        </b-form-group>

      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl=12>
        <div style="width:100%;overflow-x:scroll">
          <b-table-simple bordered class="table-srt-kelahiran">
            <b-thead>
              <b-tr>
                <b-th>Cetak</b-th>
                <b-th>No. BPM / RB</b-th>
                <b-th>No. SKL</b-th>
                <b-th>Nama Bayi</b-th>
                <b-th>Jenis Kelamin</b-th>
                <b-th>Tanggal Lahir</b-th>
                <b-th>Tempat Kelahiran</b-th>
                <b-th>Berat Lahir</b-th>
                <b-th>Panjang Badan</b-th>
                <b-th>Jenis Kelahiran</b-th>
                <b-th>Alamat Lahir</b-th>
                <b-th>Kelahiran Ke</b-th>
                <b-th>Nama Ibu</b-th>
                <b-th>Umur Ibu</b-th>
                <b-th>NIK Ibu</b-th>
                <b-th>Pekerjaan Ibu</b-th>
                <b-th>Nama Ayah</b-th>
                <b-th>Umur Ayah</b-th>
                <b-th>NIK Ayah</b-th>
                <b-th>Pekerjaan Ayah</b-th>
                <b-th>Alamat Orang Tua</b-th>
                <b-th>Kecamatan</b-th>
                <b-th>Kota/Kab</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item, idx) in mData.data" :key="idx">
                <b-td><b-button @click="printSuratKeteranganLahir(item)"><i class="ri-printer-line"></i></b-button></b-td>
                <b-td>{{ item.no_bpm_rb }}</b-td>
                <b-td>{{ item.no_skl }}</b-td>
                <b-td>{{ item.nama_bayi }}</b-td>
                <b-td>{{ item.jenis_kelamin_bayi }}</b-td>
                <b-td>{{ $moment(item.tanggal_lahir_bayi).format("DD-MM-YYYY") }}</b-td>
                <b-td>{{ item.tempat_bersalin }}</b-td>
                <b-td>{{ item.berat_lahir }}</b-td>
                <b-td>{{ item.panjang_badan }}</b-td>
                <b-td>{{ item.jenis_kelahiran_bayi }}</b-td>
                <b-td>{{ item.alamat_bersalin }}</b-td>
                <b-td>{{ item.kelahiran_ke }}</b-td>
                <b-td>{{ item.data_orang_tua.nama_ibu }}</b-td>
                <b-td>{{ item.data_orang_tua.umur_ibu }}</b-td>
                <b-td>{{ item.data_orang_tua.no_ktp_ibu }}</b-td>
                <b-td>{{ item.data_orang_tua.pekerjaan_ibu }}</b-td>
                <b-td>{{ item.data_orang_tua.nama_ayah }}</b-td>
                <b-td>{{ item.data_orang_tua.umur_ayah }}</b-td>
                <b-td>{{ item.data_orang_tua.no_ktp_ayah }}</b-td>
                <b-td>{{ item.data_orang_tua.pekerjaan_ayah }}</b-td>
                <b-td>{{ item.data_orang_tua.alamat_bersalin }}</b-td>
                <b-td>{{ item.data_orang_tua.kecamatan }}</b-td>
                <b-td>{{ item.data_orang_tua.kota }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <hr>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div style="width:100%;display: flex;justify-content: flex-end;">
          <!-- <b-button @click="selesai()" variant="warning" class="mr-2">Buat Baru Kehamilan</b-button> -->
          <b-button variant="light" style="margin-right:10px">Reset</b-button>
          <b-button @click="simpan()" variant="success">Tambah</b-button>
        </div>
      </b-col>
    </b-row>
  
    <div style="display: none;" id="print_keterangan_lahir">
      <section class="content-print A4">
        <div class="sheet">
          <div class="w-100">
            <table border="0" class="custom-table">
            <tbody>
              <tr>
                <td style="width: 15%;vertical-align: middle;padding-left: 1.5mm;padding-right: 1.5mm;"><img src="https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg" alt="" style="width: 100%;"></td>
                <td style="width: 70%;vertical-align: middle;">
                  <h6 style="text-align: center;font-weight: bold;margin-bottom: 0;font-size: 16pt;">PEMERINTAH KABUPATEN/KOTA <span>NAMA KABKOT</span> </h6>
                  <h6 style="text-align: center;font-weight: bold;margin-bottom: 0;font-size: 16pt;"><span>DINAS KESEHATAN</span></h6>
                  <h6 style="text-align: center;font-weight: bold;margin-bottom: 0;font-size: 16pt;">PUSKESMAS <span>NAMA PUSKESMAS</span> </h6>
                  <h6 style="text-align: center;font-weight: normal;font-size: 10pt;"><span>Jl. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, nulla</span></h6>
                  <h6 style="text-align: center;font-weight: normal;font-size: 10pt;"><span>Email : emailpuskesmas@gmil.com</span> <span>Telp. : 0987654321</span></h6>
                </td>
                <td style="width: 15%;vertical-align: middle;padding-left: 1.5mm;padding-right: 1.5mm;"><img src="https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg" alt="" style="width: 100%;"></td>
              </tr>
            </tbody>
            </table>
          </div>

          <div class="w-100" style="margin-top: 2.5mm;">
            <div class="line"></div>
          </div>

          <div class="w-100" style="margin-top: 5mm;">
            <h6 style="font-size: 16pt;font-weight: bold;text-align: center;"><u>KETERANGAN LAHIR</u></h6>
            <h6 style="font-size: 14pt;text-align: center;"><span>No:123456</span></h6>
          </div>

          <div class="w-100" style="margin-top: 10mm;">
            <h6>yang bertanda tangan dibawah ini, menerangkan bahwa Pada hari ini <span>Selasa</span>, tanggal <span>17 Oktober 2023, Pukul 17:02</span> telah lahir seorang bayi </h6>
          </div>

          <div class="w-100" style="margin-top: 5mm;margin-bottom: 5mm;">
            <table class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 40mm;padding-left: 0;">Jenis Kelamin</td>
                  <td style="width: 5mm;">:</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Jenis Kelahiran</td>
                  <td>:</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Kelahiran Ke</td>
                  <td>:</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Berat Lahir</td>
                  <td>:</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Panjang Badan</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="w-100" style="margin-top: 10mm;">
            <h6>di Puskesmas</h6>
            <h6>Alamat : <span>Puskesmas1</span></h6>
            <h6>Di Beri nama :</h6>
          </div>

          <div class="custom-border-paper" style="margin-top: 10mm;"> 
            <div class="w-100-flex" style="justify-content: center;align-items: center;height: 15mm;">
              <h6 style="font-weight: bold;text-align: center;">xxxxxxxxxx</h6>
            </div>
          </div>

          <div class="w-100" style="margin-top: 10mm;">
            <h6>Dari Orang Tua</h6>
          </div>

          <div class="w-100" style="margin-top: 5mm;margin-bottom: 5mm;">
            <table class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 40mm;padding-left: 0;">Nama Ibu</td>
                  <td style="width: 5mm;">:</td>
                  <td>-</td>
                  <td style="width: 40mm;padding-left: 0;">Umur</td>
                  <td style="width: 5mm;">:</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Pekerjaan</td>
                  <td>:</td>
                  <td colspan="4">-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">KTP/NIK No.</td>
                  <td>:</td>
                  <td colspan="4">-</td>
                </tr>
              </tbody>
            </table>
            <table class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 40mm;padding-left: 0;">Nama Ayah</td>
                  <td style="width: 5mm;">:</td>
                  <td>-</td>
                  <td style="width: 40mm;padding-left: 0;">Umur</td>
                  <td style="width: 5mm;">:</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Pekerjaan</td>
                  <td>:</td>
                  <td colspan="4">-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">KTP/NIK No.</td>
                  <td>:</td>
                  <td colspan="4">-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Kecamatan</td>
                  <td>:</td>
                  <td colspan="4">-</td>
                </tr>

                <tr>
                  <td style="padding-left:0">Kab/Kota</td>
                  <td>:</td>
                  <td colspan="4">-</td>
                </tr>
              </tbody>
            </table>
          </div>


          <div class="w-100" style="margin-top: 10mm;">
            <table class="custom-table">
              <tbody>
                <tr>
                  <td style="width: 30%;">
                    <br/>
                    <h6 style="text-align: center;">Saksi 1</h6>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h6 style="text-align: center;">(..........................................)</h6>
                  </td>
                  <td style="width: 30%;">
                    <br/>
                    <h6 style="text-align: center;">Saksi 2</h6>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h6 style="text-align: center;">(..........................................)</h6>
                  </td>
                  <td style="width: 40%;">
                    <h6 style="text-align: center;"><span>KABUPATEN BANDUNG, 27 Oktober 2023</span></h6>
                    <h6 style="text-align: center;">Penolong Persalinan</h6>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h6 style="text-align: center;">(..........................................)</h6>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>

export default {
  components:{
  
  },
  // props: [
  // 'dataAnamnesa',
  // 'kunjungan',
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
      option_jenis_kelahiran: [
        {value: "Tunggal", text: "Tunggal"},
        {value: "Kembar 2", text: "Kembar 2"},
        {value: "Kembar 3", text: "Kembar 3"},
        {value: "Lainnya", text: "Lainnya"},
      ],
      option_jenis_kelamin: [
        {value: "Laki-laki", text: "Laki-laki"},
        {value: "Perempuan", text: "Perempuan"},
      ],
      option_tempat_bersalin: [
        {value: "Rumah", text: "Rumah"},
        {value: "Rumah Bidan", text: "Rumah Bidan"},
        {value: "Polindes", text: "Polindes"},
        {value: "Rumah Bersalin", text: "Rumah Bersalin"},
        {value: "Puskesmas", text: "Puskesmas"},
        {value: "Rumah Sakit", text: "Rumah Sakit"},
      ],
      nama_bayi: null,
      tanggal_lahir_bayi: null,
      jenis_kelamin_bayi: null,
      jenis_kelahiran_bayi: null,
      kelahiran_ke: null,
      berat_lahir: null,
      panjang_badan: null,
      tempat_bersalin: null,
      alamat_bersalin: null,
      no_bpm_rb: null,
      no_skl: null,
      data_orang_tua: {
        nama_ibu: null,
        umur_ibu: null,
        no_ktp_ibu: null,
        pekerjaan_ibu: null,
        nama_ayah: null,
        umur_ayah: null,
        no_ktp_ayah: null,
        pekerjaan_ayah: null,
        alamat_bersalin: null,
        kecamatan: null,
        kota: null,
      },
      busy: false,
      list_surat: [],
    }
  },
  computed: {
    kia_id(){
      return this.$store.state.kia_id
    },
  },
  watch: {
    kunjungan(newVal, oldVal){
      if(newVal != oldVal){
        console.log(newVal, 'ini newval');
        this.data_orang_tua.nama_ibu = newVal.nama_lengkap
        this.data_orang_tua.no_ktp_ibu = newVal.no_kartu
        this.data_orang_tua.umur_ibu = newVal.usia_tahun
        this.data_orang_tua.pekerjaan_ibu = newVal.pekerjaan
        this.data_orang_tua.alamat_bersalin = newVal.alamat_sekarang
        this.data_orang_tua.kecamatan = newVal.nama_kecamatan
        this.data_orang_tua.kota = newVal.nama_kota
        // this.tanggal_pengamatan_nifas = this.$moment(new Date()).format("YYYY-MM-DD HH:mm")
        // this.getData()
      }
    },
    kia_id(newVal, oldVal){
      if(newVal != oldVal){
        if(newVal){
          this.getData()
        }
      }
    },
  },
  methods: {
    simpan(){
      let vm = this
      let datanya = {}
      vm.busy = true
      datanya.nama_bayi = vm.nama_bayi
      datanya.tanggal_lahir_bayi = vm.tanggal_lahir_bayi
      datanya.jenis_kelahiran_bayi = vm.jenis_kelahiran_bayi
      datanya.jenis_kelamin_bayi = vm.jenis_kelamin_bayi
      datanya.kelahiran_ke = vm.kelahiran_ke
      datanya.berat_lahir = vm.berat_lahir
      datanya.panjang_badan = vm.panjang_badan
      datanya.tempat_bersalin = vm.tempat_bersalin
      datanya.alamat_bersalin = vm.alamat_bersalin
      datanya.no_bpm_rb = vm.no_bpm_rb
      datanya.no_skl = vm.no_skl
      datanya.data_orang_tua = vm.data_orang_tua
      datanya.kia_id = vm.$store.state.kia_id

      this.mData.data.push(datanya)
      this.$parent.$parent.updateAssesmenTambahan(true)

      // RESET DATA
      vm.nama_bayi = null
      vm.tanggal_lahir_bayi = null
      vm.jenis_kelahiran_bayi = null
      vm.jenis_kelamin_bayi = null
      vm.kelahiran_ke = null
      vm.berat_lahir = null
      vm.panjang_badan = null
      vm.tempat_bersalin = null
      vm.no_bpm_rb = null
      vm.no_skl = null
      vm.alamat_bersalin = null

      // console.log(datanya);
      // vm.$axios.post("/surat_keterangan_lahir/register", datanya)
      // .then((res) => {
      //   console.log(res, 'ini responya ui');
      //   if(res.data.status == 200 && res.data.message == "sukses"){
      //     vm.busy = false
      //     vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYIMPAN DATA", showing: true})
      //     vm.nama_bayi = null
      //     vm.tanggal_lahir_bayi = null
      //     vm.jenis_kelahiran_bayi = null
      //     vm.jenis_kelamin_bayi = null
      //     vm.kelahiran_ke = null
      //     vm.berat_lahir = null
      //     vm.panjang_badan = null
      //     vm.tempat_bersalin = null
      //     vm.no_bpm_rb = null
      //     vm.no_skl = null
      //     vm.alamat_bersalin = null
      //     vm.getData()
      //   }
      //   else{
      //     vm.busy = false
      //     vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
      //   }
      // })
      // .catch((err) => {
      //   vm.busy = false
      //   vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
      // })
    },
    async getData(){
      let vm = this
      try {
        if(vm.$store.state.kia_id != null){
          let detail = await vm.$axios.post("/surat_keterangan_lahir/list", {
          kia_id: vm.$store.state.kia_id
        })
          // console.log(detail, 'ini surat keterangan');
          if(detail.data.status == 200 && detail.data.data.length){
              vm.list_surat = detail.data.data
          }
        }
        
      } catch (error) {
          console.log(error)
      }
    },
    selesai(){
      let vm = this
      vm.$store.commit("set_reset", true)
      vm.$axios.post("kia/update", {
        id: vm.$store.state.kia_id,
        status_kia: 2
      })
      .then((res) => {
        if(res.data.status == 200 && res.data.message == "sukses"){
          vm.$store.commit("set_reset", true)
          vm.$store.commit('set_alert', {variant: 'success', msg: "BERHASIL MENYELESAIKAN KIA", showing: true})
        }else {
          vm.$store.commit('set_alert', {variant: 'danger', msg: res.data.message, showing: true})
        }
      })
      .catch((err) => {
        vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
      })
      // location.reload()
    },
    async printSuratKeteranganLahir(val) {
      const vm = this
      console.log("skl >>>>>>>>>>>", val);
      
      const options_A4 = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
        '/style-paper-a4.css',
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }

      // try {
      //   let res = await vm.$axios.post('/cetak/surat_keterangan_lahir', { id: val.id })
      //   if (res.data.status == 200) {
      //     vm.dataPrint = res.data.data[0]
          await vm.$htmlToPaper('print_keterangan_lahir', options_A4);
      //   }
      // } catch (err) {
      //   console.log(err); 
      // }
    }
  },
 
}
</script>

<style >
.table-radio-text-check table tr, td{
  border:none !important
}

.table-srt-kelahiran th{
  background-color: #D52F65 !important ;
  color: #fff;
  font-weight: 600;
}

.table-srt-kelahiran th, td{
  border: 1px solid #F1F1F1 !important;
}

.table-srt-kelahiran th:first-child {
  border-top-left-radius: 8px;
}

.table-srt-kelahiran th:last-child {
  border-top-right-radius: 8px;
}
</style>