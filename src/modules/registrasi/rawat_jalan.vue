<template>
  <div class="d-flex flex-column">
    <div class="container-fluid">
      <b-row>
        <b-col cols="12">

          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(submitForm)" autocomplete="off">
              <b-card class="" header-tag="header">
                <template #header>
                  <b-row class="d-flex align-items-center">
                    <b-col>
                      <h3 class="mb-0">
                        <strong><span @click="customAlert('error')">Registrasi</span> Rawat <span @click="customAlert('success')">Jalan</span></strong>
                      </h3>
                      <p class="mb-0">Form kunjungan untuk pasien berobat rawat jalan</p>
                    </b-col>
                    <b-col>
                      <div class="d-flex gap-10 justify-content-end">

                        <s-input groupClass="mb-0" v-model="fields.booking_id" :item="{
                          label: 'Booking',
                          id: 'booking',
                          data: 'booking',
                          type: 'lookup-radio',
                          api: 'booking',
                          getter: 'booking',
                          setter: 'booking',
                          validation: [],
                          pointer: {
                            label: 'nama_booking',
                            code: 'booking_id',
                            display: ['nama_booking', 'no_rm', 'no_rujukan', 'no_kontrol', 'tgl_jadwal|date', 'hari_jadwal', 'waktu_mulai', 'waktu_selesai', 'nama_dokter', 'nama_poliklinik'],
                            headerDisplay: ['Nama Booking', 'No. RM', 'No. Rujukan', 'No. Kontrol', 'Tanggal', 'Hari', 'Waktu Mulai', 'Waktu Selesai', 'Dokter', 'Poliklinik'],
                          },
                          param: {
                            tgl_booking: fields.tgl_registrasi ? formatYMD(fields.tgl_registrasi) : '',
                            status_booking: '1'
                          },
                        }" @input="selectedBooking" :disabled="disabled.pasien_id"/>
  
                        <s-input groupClass="mb-0" v-model="fields.antrian_loket" :item="{
                          label: 'Antrian Loket',
                          id: 'antrian_loket',
                          data: 'antrian_loket',
                          type: 'lookup-radio',
                          api: 'antrianList',
                          getter: 'antrianList',
                          setter: 'antrianList',
                          validation: [],
                          return_object: true,
                          pointer: {
                            label: 'concat_antrian_no',
                            code: 'antrian_list_id',
                            display: ['tgl_antrian|date', 'initial', 'antrian_no', 'hari_jadwal', 'waktu_mulai', 'waktu_selesai'],
                            headerDisplay: ['Tanggal', 'Initial', 'No. Antrian', 'Hari', 'Waktu Mulai', 'Waktu Selesai'],
                            mainParam: 'antrian_no',
                            customDetailApi: {
                              api: 'antrianList/list',
                              param: 'antrian_list_id',
                            }
                          },
                          param: {
                            tgl_antrian: fields.tgl_registrasi ? formatYMD(fields.tgl_registrasi) : '',
                            status_antrian: '2'
                          },
                        }" :valuee="fields.antrian_loket" :disabled="disabled.pasien_id" />

                      </div>
                    </b-col>
                  </b-row>
                </template>
                <div>
                  <b-row style="row-gap: 15px; margin-bottom: 2rem;">
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.tgl_registrasi" :item="{
                        label: 'Tanggal',
                        id: 'tgl_registrasi',
                        data: 'tgl_registrasi',
                        type: 'datetime',
                        validation: ['required'],
                        formatDateView: 'DD MMM YYYY HH:mm',
                      }" :valuee="dateToday" />
                    </b-col>
                    <b-col cols="9" class="d-flex justify-content-end">
                      <div class="w-150px d-flex flex-column align-items-center justify-content-center border-success" style="width: 150px;border:  1px solid;border-radius: 8px;border-style: dashed;">
                        <h4><strong>Kunjungan</strong></h4>
                        <h5 class="mb-0" v-if="fields.id">#{{ selected.registrasi.no_kunjungan }}</h5>
                        <h4 class="mb-0" v-else><strong>Baru</strong></h4>
                      </div>
                    </b-col>
                    <!-- <b-col v-if="fields.id" cols="12">
                      <h4><strong>No Kunjungan</strong></h4>
                      <h5 v-if="fields.id">{{ selected.registrasi.no_kunjungan }}</h5>
                    </b-col> -->
                    
                    
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.ms_jenis_layanan_id" :item="{
                        label: 'Jenis Layanan',
                        id: 'ms_jenis_layanan_id',
                        data: 'ms_jenis_layanan_id',
                        type: 'lookup-radio',
                        api: 'msJenisLayanan',
                        getter: 'msJenisLayanan',
                        setter: 'msJenisLayanan',
                        validation: ['required'],
                        pointer: {
                          label: 'nama_jenis_layanan',
                          code: 'id',
                          display: ['nama_jenis_layanan'],
                          mainParam: 'nama_jenis_layanan'
                        },
                      }" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.kelas_kunjungan_id" :item="{
                        label: 'Kelas Kunjungan',
                        id: 'kelas_kunjungan_id',
                        data: 'kelas_kunjungan_id',
                        type: 'lookup-radio',
                        api: 'kelasKunjungan',
                        getter: 'kelasKunjungan',
                        setter: 'kelasKunjungan',
                        validation: ['required'],
                        pointer: {
                          label: 'nama_kelas_kunjungan',
                          code: 'kelas_kunjungan_id',
                          display: ['nama_kelas_kunjungan'],
                          mainParam: 'nama_kelas_kunjungan'
                        },
                      }" />
                    </b-col>
                    <!-- <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.ms_dokter_id" :item="{
                        label: 'Dokter',
                        id: 'ms_dokter_id',
                        data: 'ms_dokter_id',
                        type: 'lookup-radio',
                        api: 'msDokter',
                        getter: 'msDokter',
                        setter: 'msDokter',
                        validation: ['required'],
                        pointer: {
                          label: 'nama_dokter',
                          code: 'ms_dokter_id',
                          display: ['nama_dokter', 'nama_specialist'],
                          headerDisplay: ['Nama', 'Spesialis'],
                          mainParam: 'nama_dokter'
                        },
                      }" @input="onSelectedDokter" />
                    </b-col> -->
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.ms_poliklinik_id" :item="{
                        label: 'Poliklinik',
                        id: 'ms_poliklinik_id',
                        data: 'ms_poliklinik_id',
                        type: 'lookup-radio',
                        api: 'msPoliklinik',
                        getter: 'msPoliklinik',
                        setter: 'msPoliklinik',
                        validation: [modeSubmit == modes.add ? 'required' : ''],
                        pointer: {
                          label: 'nama_poliklinik',
                          code: 'id',
                          display: ['nama_poliklinik'],
                          mainParam: 'nama_poliklinik'
                        },
                      }" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.jadwal_dokter_id" :item="{
                        label: 'Jadwal Dokter',
                        id: 'jadwal_dokter_id',
                        data: 'jadwal_dokter_id',
                        type: 'lookup-radio',
                        api: 'jadwalDokter/listJadwalDokterByMsPoliIdBypassUri',
                        getter: 'jadwalDokter/listJadwalDokterByMsPoliIdBypassUri',
                        setter: 'jadwalDokter/listJadwalDokterByMsPoliIdBypassUri',
                        validation: [modeSubmit == modes.add ? 'required' : ''],
                        pointer: {
                          label: 'nama_dokter',
                          code: 'jadwal_dokter_id',
                          display: ['waktu_mulai', 'waktu_selesai', 'nama_dokter', 'jk_dokter'],
                          headerDisplay: ['Waktu Mulai', 'Waktu Selesai', 'Nama Dokter', 'Jenis Kelamin'],
                          mainParam: 'nama_dokter'
                        },
                        param: {
                          ms_poliklinik_id: fields.ms_poliklinik_id,
                          tanggal: fields.tgl_registrasi
                        },
                      }" :valuee="fields.jadwal_dokter_id" @input="onSelectJadwalDokter" />
                    </b-col>
                    <!-- <b-col cols="3">
                      
                      tanggal: fields.tgl_registrasi,

                      <s-input groupClass="mb-0" v-model="fields.ms_spesialis_id" :item="{
                        label: 'Spesialis',
                        id: 'ms_spesialis_id',
                        data: 'ms_spesialis_id',
                        type: 'lookup-radio',
                        api: 'msSpecialist',
                        getter: 'msSpecialist',
                        setter: 'msSpecialist',
                        validation: ['required'],
                        pointer: {
                          label: 'nama_specialist',
                          code: 'id',
                          display: ['nama_specialist'],
                          mainParam: 'nama_specialist'
                        },
                      }" />
                    </b-col> -->
                    <b-col cols="12">
                      <s-input groupClass="mb-0" v-model="fields.keterangan_registrasi" :item="{
                        label: 'Keterangan Registrasi',
                        id: 'keterangan_registrasi',
                        data: 'keterangan_registrasi',
                        type: 'textarea',
                        placeholder: 'Isikan Keterangan Registrasi',
                        validation: [],
                        rows: 1
                      }" />
                    </b-col>
                  </b-row>
                  <b-row style="row-gap: 15px;">
                    <b-col cols="12">
                      <h4><strong>DATA PASIEN</strong></h4>
                    </b-col>
                  </b-row>
                  <b-row style="row-gap: 15px; margin-bottom: 2rem">
                    <b-col cols="12">
                      <s-input groupClass="mb-0" v-model="fields.pasien_id" :item="{
                        label: 'Rekam Medis',
                        id: 'pasien_id',
                        data: 'pasien_id',
                        type: 'lookup-radio',
                        api: 'pasien/listPerHalamanBypassUri',
                        getter: 'pasien/listPerHalamanBypassUri',
                        setter: 'pasien/listPerHalamanBypassUri',
                        validation: ['required'],
                        pointer: {
                          label: 'nama_lengkap',
                          code: 'pasien_id',
                          display: ['nama_lengkap', 'no_rm', 'nik', 'alamat_sekarang'],
                          headerDisplay: ['Nama', 'No. RM', 'NIK', 'Alamat Sekarang'],
                          mainParam: 'nama_lengkap',
                          customDetailApi: {
                            api: 'pasien/detailsById',
                            params: {
                              id: fields.pasien_id
                            },
                          },
                        },
                      }" @input="onSelectedPasien" :disabled="disabled.pasien_id" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.no_rm" :item="{
                        label: 'No. RM',
                        id: 'no_rm',
                        data: 'no_rm',
                        type: 'text',
                        validation: [],
                      }" :disabled="true" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.nama_pasien" :item="{
                        label: 'Nama Pasien',
                        id: 'nama_pasien',
                        data: 'nama_pasien',
                        type: 'text',
                        validation: [],
                      }" :disabled="true" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.jenis_kelamin" :item="{
                        label: 'Jenis Kelamin',
                        id: 'jenis_kelamin',
                        data: 'jenis_kelamin',
                        type: 'text',
                        validation: [],
                      }" :disabled="true" />
                    </b-col>
                    <b-col cols="3">

                      <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                        <template v-slot:label>
                          NIK
                        </template>
                      </b-form-group>
                      <b-input-group>
                        <b-form-input v-model='fields.no_identitas_registrasi' type='text' :placeholder="'NIK'"
                          :disabled="true"></b-form-input>
                        <b-input-group-append>
                          <b-button variant="info"
                            @click="getPesertaByNoKartu(fields.no_identitas_registrasi, 'nik')">Cek</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.nama_penanggung" :item="{
                        label: 'Penanggung',
                        id: 'nama_penanggung',
                        data: 'nama_penanggung',
                        type: 'text',
                        validation: [],
                      }" :disabled="true" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.alamat_sekarang" :item="{
                        label: 'Alamat Sekarang',
                        id: 'alamat_sekarang',
                        data: 'alamat_sekarang',
                        type: 'textarea',
                        placeholder: 'Isikan Alamat Sekarang',
                        validation: [],
                        rows: 1
                      }" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.no_hp_registrasi" :item="{
                        label: 'No HP',
                        id: 'no_hp_registrasi',
                        data: 'no_hp_registrasi',
                        type: 'text',
                        validation: [],
                      }" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.no_phone" :item="{
                        label: 'No Telepon',
                        id: 'no_phone',
                        data: 'no_phone',
                        type: 'text',
                        validation: [],
                      }" :disabled="true" />
                    </b-col>
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.nama_pekerjaan" :item="{
                        label: 'Pekerjaan',
                        id: 'nama_pekerjaan',
                        data: 'nama_pekerjaan',
                        type: 'text',
                        validation: [],
                      }" :disabled="true" />
                    </b-col>


                  </b-row>
                  <b-row style="row-gap: 15px;">
                    <b-col cols="12">
                      <h4><strong>DATA ASURANSI</strong></h4>
                    </b-col>
                  </b-row>
                  <b-row style="row-gap: 15px;">
                    <b-col cols="3">
                      <s-input groupClass="mb-0" v-model="fields.ms_asuransi_id" :item="{
                        label: 'Asuransi',
                        id: 'ms_asuransi_id',
                        data: 'ms_asuransi_id',
                        type: 'lookup-radio',
                        api: 'msAsuransi',
                        getter: 'msAsuransi',
                        setter: 'msAsuransi',
                        validation: ['required'],
                        pointer: {
                          label: 'nama_asuransi',
                          code: 'id',
                          display: ['nama_asuransi'],
                        },
                      }" @changes="onSelectedMsAsuransi" />
                    </b-col>
                    <b-col cols="3" v-if="conditionalFields.no_asuransi_registrasi.value">

                      <s-input v-if="fields.ms_asuransi_id != bpjs_details.id" groupClass="mb-0"
                        v-model="fields.no_asuransi_registrasi" :item="{
                          label: conditionalFields.no_asuransi_registrasi.label,
                          id: 'no_asuransi_registrasi',
                          data: 'no_asuransi_registrasi',
                          type: 'text',
                          validation: [],
                        }" />
                      <div v-else>
                        <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                          <template v-slot:label>
                            {{ conditionalFields.no_asuransi_registrasi.label }}
                          </template>
                        </b-form-group>
                        <b-input-group>
                          <b-form-input v-model='fields.no_asuransi_registrasi' type='text'
                            :placeholder="'Isikan No BPJS/Asuransi'"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="info" @click="getPesertaByNoKartu">Cek</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                    </b-col>
                    <b-col cols="3" v-if="conditionalFields.no_rujukan.value" class="d-flex flex-column">

                      <div>
                        <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                          <template v-slot:label>
                            No Rujukan
                          </template>
                        </b-form-group>
                        <b-input-group>
                          <b-form-input v-model='optionalFields.no_rujukan.text' :value="optionalFields.no_rujukan.text"
                            type='text' :placeholder="'Isikan No Rujukan'"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="info" @click="checkNoRujukan">Cek</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                      <div class="my-2 w-100 text-center">Atau</div>

                      <b-button class="w-100 mb-2" variant="info" @click="getRujukanBerdasarkanNomorKartuMulti">Cari
                        Daftar No
                        Rujukuan (No Kartu)</b-button>

                      <s-input class="w-100" v-model="optionalFields.no_rujukan.lookup" :key="'no_rujukan'"
                        :id="'no_rujukan'" :item="{
                          label: 'No Rujukan',
                          id: 'no_rujukan',
                          data: 'no_rujukan',
                          type: 'lookup-radio',
                          validation: [],
                          pointer: {
                            label: 'noKunjungan',
                            code: 'noKunjungan',
                            display: ['noKunjungan', 'tglKunjungan', 'keluhan'],
                            headerDisplay: ['No. Kunjungan', 'Tanggal', 'Keluhan'],
                            list: list.rujukan,
                            isExternalFetch: true,
                            customDetailApi: {
                              api: 'bpjs/vclaim/rujukan/getRujukanByNoRujukan',
                              params: {
                                noRujukan: optionalFields.no_rujukan.lookup,
                                tipe: 'PCARE'
                              },
                            },
                          },
                          param: {},
                        }" :disabled="list.rujukan.length === 0" :valuee="optionalFields.no_rujukan.lookup" />

                    </b-col>
                    <b-col cols="3" v-if="conditionalFields.no_kontrol.value" class="d-flex flex-column">

                      <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                        <template v-slot:label>
                          No Kontrol
                        </template>
                      </b-form-group>
                      <b-input-group>
                        <b-form-input v-model='optionalFields.no_kontrol.text' type='text'
                          :placeholder="'Isikan No Kontrol'" :value="optionalFields.no_kontrol.text"></b-form-input>
                        <b-input-group-append>
                          <b-button variant="info" @click="checkNoKontrol">Cek</b-button>
                        </b-input-group-append>
                      </b-input-group>
                      <div class="my-2 w-100 text-center">Atau</div>

                      <s-input groupClass="mb-0" v-model="filters.tglRencanaKontrol" :item="{
                        label: 'Tanggal Rencana Kontrol',
                        id: 'tglRencanaKontrol',
                        data: 'tglRencanaKontrol',
                        type: 'date',
                        validation: [],
                        formatDateView: 'DD MMM YYYY',
                      }" :valuee="filters.tglRencanaKontrol" />

                      <b-button class="w-100 mb-2" variant="info" @click="getNomorSuratKontrolByNoKartu">Cari Daftar No
                        Kontrol (No Kartu)</b-button>

                      <s-input class="w-100" v-model="optionalFields.no_kontrol.lookup" :key="'no_kontrol_lookup'"
                        :id="'no_kontrol_lookup'" :item="{
                          label: 'No Kontrol',
                          id: 'no_kontrol_lookup',
                          data: 'no_kontrol_lookup',
                          type: 'lookup-radio',
                          validation: [],
                          pointer: {
                            label: 'noSuratKontrol',
                            code: 'noSuratKontrol',
                            display: ['noSuratKontrol', 'tglRencanaKontrol', 'tglTerbitKontrol', 'namaPoliAsal', 'namaPoliTujuan', 'namaDokter', 'namaJnsKontrol'],
                            headerDisplay: ['No. Surat Kontrol', 'Tanggal Rencana Kontrol', 'Tanggal Terbit Kontrol', 'Poli Asal', 'Poli Tujuan', 'Dokter', 'Jenis Kontrol'],
                            list: list.noKontrol,
                            isExternalFetch: true,
                            customDetailApi: {
                              api: 'bpjs/vclaim/rencanaKontrol/getNomorSuratKontrol',
                              params: {
                                noSuratKontrol: optionalFields.no_kontrol.lookup
                              },
                            },
                          },
                          param: {},
                        }" :disabled="list.noKontrol.length === 0" :valuee="optionalFields.no_kontrol.lookup" />

                    </b-col>

                   
                  </b-row>
                  <b-row class="mt-2">
                    <b-col cols="6" v-if="modeSubmit === modes.edit && conditionalFields.no_sep.value">

                      <div>
                        <b-form-group style="margin-bottom:0px !important; line-height: 1.3;">
                          <template v-slot:label>
                            No SEP
                          </template>
                        </b-form-group>
                        <b-input-group>
                          <b-form-input v-model='fields.no_sep' type='text' :placeholder="'Isikan No SEP'"
                            :disabled="!isBpjsValid || !fields.no_asuransi_registrasi"></b-form-input>
                          <b-input-group-append>
                            <b-button sizes="lg" variant="info" @click="openModalSEP" class="px-8"
                              :disabled="!isBpjsValid || !fields.no_asuransi_registrasi">SEP</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                    </b-col>
                  </b-row>
                  <!-- <b-row v-if="fields.ms_asuransi_id == bpjs_details.id" class="mt-2">
                    <b-col cols="4" class="d-flex align-items-center">
                      <b-form-checkbox id="bpjs" v-model="isBpjsValid" name="bpjs" :value="true" :unchecked-value="false"
                        :disabled="true">
                        BPJS Valid
                      </b-form-checkbox>
                    </b-col>
                  </b-row> -->
                </div>
                <template #footer>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <b-button block sizes="lg" variant="success" class="mt-0 text-nowrap"
                        v-b-modal.modal-tutup-kunjungan :disabled="!fields.id"
                        @click="tutup_kunjungan.registrasi_id = fields.id">Tutup Kunjungan</b-button>

                      <b-button block sizes="lg" variant="warning" class="ml-2 mt-0 text-nowrap" :disabled="!fields.id"
                        @click="batalKunjungan(fields.id)">Batal
                        Kunjungan</b-button>

                      <b-button block sizes="lg" variant="info" class="ml-2 mt-0 text-nowrap" :disabled="!fields.no_rm"
                        @click="openRiwayatRegistrasiModal()">Riwayat Kunjungan</b-button>
                    </div>
                    <div class="d-flex align-items-center">
                      <b-button block sizes="lg" variant="danger" @click.prevent="resetForm"
                        class="mt-0 text-nowrap">Reset</b-button>
                      <b-button block sizes="lg" variant="primary" type="submit" class="ml-2 mt-0 text-nowrap">
                        <span v-if="modeSubmit == modes.add">Simpan Data</span>
                        <span v-else>Perbarui</span>
                      </b-button>
                    </div>
                  </div>


                </template>

              </b-card>

            </form>
          </ValidationObserver>
        </b-col>
      </b-row>

      <b-modal id="modal-tutup-kunjungan" title="Tutup Kunjungan" hide-footer>
        <!-- {{ tutup_kunjungan }} -->
        <!-- <form @submit.prevent="handleSubmit(tutupKunjungan)" autocomplete="off"> -->
        <b-col cols="12">
          <s-input groupClass="mb-0" v-model="tutup_kunjungan.tgl_pulang" :item="{
            label: 'Tanggal Pulang',
            id: 'tgl_pulang',
            data: 'tgl_pulang',
            type: 'datetime',
            validation: ['required'],
            formatDateView: 'DD MMM YYYY HH:mm',
          }" :valuee="dateToday" />
        </b-col>
        <b-col cols="12">
          <div class="d-flex align-items-center mt-6">
            <b-button block sizes="lg" variant="primary" @click="tutupKunjungan" class="mt-0 text-nowrap">
              Submit tutup kunjungan
            </b-button>
          </div>
        </b-col>
        <!-- </form> -->
      </b-modal>

      <ModalSEP :no_asuransi_registrasi="fields.no_asuransi_registrasi" :modalSEP1="modalSEP1" :modalSEP2="modalSEP2"
        :pesertaProps="fields" :jenisKunjungan="'Rajal'" @createdSEP="handleCreatedSEP" :noSEP="fields.no_sep"
        @deletedSEP="handleDeletedSEP" @closeModalSEP="handleCloseModalSEP" @openModalSEP="handleOpenModalSEP" />
    </div>

    <div class="container-fluid mt-8">
      <b-row>
        <b-col cols="12">
          <b-card class="" hide-header>
            <div>
              <b-row style="row-gap: 15px; margin-bottom: 2rem;">
                <b-col cols="12">
                  <DaftarKunjunganRegistrasi ref="table-daftar-kunjungan" :jenisKunjungan="'Rajal'"
                    @selectKunjungan="handleSelectKunjungan" :isCreatedOrUpdated="isCreatedOrUpdated"
                    @isCreatedOrUpdated="handleIsCreatedOrUpdated" />
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-modal id="modal-riwayat-registrasi-form" title="Riwayat Registrasi" hide-footer size="xl" body-class="p-0"  >
      <tas-base-crud ref="CRUD-riwayat-registrasi-form" :config="config_riwayat_registrasi" :classes="'w-100'" hide-detail>
        <template v-slot:list-table-action="{ rowData }">
          <router-link v-if="rowData.nama_jenis_layanan === 'IGD'" :to="`/registrasi/layanan_igd/triage?registrasi_id=${rowData.triage_id}`">
            <b-button variant="primary" class="btn-sm">
              <i class="fas fa-sync"></i> Triage
            </b-button>
          </router-link>
          <router-link v-if="rowData.nama_jenis_layanan === 'Rawat Jalan'" :to="`/registrasi/layanan_rjalan/keperawatan?registrasi_id=${rowData.registrasi_id}`">
            <b-button variant="info" class="btn-sm">
              <i class="fas fa-sync"></i> Keperawatan
            </b-button>
          </router-link>
          <router-link v-if="rowData.nama_jenis_layanan === 'Rawat Jalan'" :to="`/registrasi/layanan_rjalan/medis?registrasi_id=${rowData.registrasi_id}`">
            <b-button variant="primary" class="btn-sm">
              <i class="fas fa-sync"></i> Medis
            </b-button>
          </router-link>
          <router-link v-if="rowData.nama_jenis_layanan === 'Rawat Inap'" :to="`/registrasi/layanan_ranap/cppt?registrasi_id=${rowData.registrasi_id}`">
            <b-button variant="info" class="btn-sm">
              <i class="fas fa-sync"></i> CPPT
            </b-button>
          </router-link>
        </template>
      </tas-base-crud>
    </b-modal>

    <!-- <button @click="cek()">cek</button> -->
  </div>
</template>

<script>
import moment from 'moment'
import DaftarKunjunganRegistrasi from './daftarKunjunganRegistrasi.vue'
import ModalSEP from './modalSEP.vue'
moment.locale('id')

export default {
  name: 'rawat-jalan',
  components: {
    DaftarKunjunganRegistrasi,
    ModalSEP,
  },
  data() {
    return {
      tutup_kunjungan: {
        tgl_pulang: '',
        registrasi_id: ''
      },

      antrianList: [],
      configAPI: {
        submit: 'registrasi/registerRajal',
        update: 'registrasi/update',
      },
      modes: {
        add: 'add',
        edit: 'edit',
      },
      modeSubmit: 'add',
      fields: {
        id: '',
        pasien_id: '',
        tgl_registrasi: '',
        // ms_jenis_layanan_id: 'fbf39a84-2d21-46ac-831d-b0449150f821', // ID nya layanan rawat jalan
        booking: {},
        ms_jenis_layanan_id: '',
        kelas_kunjungan_id: '',
        ms_dokter_id: '',
        ms_spesialis_id: '',
        keterangan_registrasi: '',
        no_rm: '',
        nama_pasien: '',
        jenis_kelamin: '',
        ms_asuransi_id: '',
        no_identitas_registrasi: '',
        nama_penanggung: '',
        alamat_sekarang: '',
        no_hp_registrasi: '',
        no_phone: '',
        nama_pekerjaan: '',
        no_asuransi_registrasi: '',
        no_rujukan: '',
        no_kontrol: '',
        booking_id: '',
        antrian_loket_id: '',
        antrian_loket: '',
        no_antrian: '',
        no_sep: '',
        jadwal_dokter_id: '',
        ms_poliklinik_id: '',

        is_master: 1,
        antrian_id: null,
        tgl_antrian: null,
        poli_layanan: null,
        initial: null,
        antrian_no: null,
        // jadwal_dokter_id: '',
        jenis_antrian_id: null,
        // booking_id: '',
        // no_identitas_registrasi: '',
      },
      optionalFields: {
        no_rujukan: {
          lookup: '',
          text: ''
        },
        no_kontrol: {
          lookup: '',
          text: ''
        },
      },
      conditionalFields: {
        no_asuransi_registrasi: {
          label: 'No. Asuransi / BPJS',
          value: false
        },
        no_rujukan: {
          value: false
        },
        no_kontrol: {
          value: false
        },
        no_sep: {
          value: false
        },
      },
      disabled: {
        pasien_id: false,
      },
      bpjs_details: {
        id: null,
      },
      umum_details: {
        id: null,
      },
      isBpjsValid: false,
      dateToday: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      selected: {
        pasien_id: {
          no_rm: '',
          nama_lengkap: '',
          jenis_kelamin: '',
          umur: '',
          nik: '',
          nama_penjamin: '',
          alamat_sekarang: '',
          sc_whatsapp: '',
          no_telepon: '',
          nama_pekerjaan: '',
          no_asuransi_pasien: '',
          jadwal_dokter_id: '',
          ms_poliklinik_id: '',
        },
        peserta: {},
        pesertaModalSEP: {},
        rujukan: {},
        ms_dokter_id: {
          ms_specialist_id: '',
        },
        ms_asuransi_id: {},
        booking_id: {},
        antrian_loket_id: {},
        registrasi: {},
        jadwal_dokter_id: {},
        ms_poliklinik_id: {},
      },
      list: {
        rujukan: [],
        rujukanModalSEP: [],
        noKontrol: [],
        ms_poliklinik_id: [],
      },
      tipe_rujukan: {
        pcare: 'PCARE',
        rs: 'RS',
      },
      filters: {
        tglRencanaKontrol: moment(new Date).format('YYYY-MM-DD'),
      },
      modalSEP1: false,
      modalSEP2: false,
      createdSEP: {},
      isCreatedOrUpdated: false,
      isLoadingSubmit: false,

      // SOCKET
      room_id: 'antrian_loket',

      // PENJUALAN
      penjualan: {
        is_external: false,
        jenis_rawat: 'RAJAL',
        harga_total_barang: 0,
        harga_total_jasa: 0,
        harga_total_fasilitas: 0,
        discount: 0,
        tax: 0,
        total_penjualan: 0,
        status_penjualan: 1,

        ms_gudang_id: '0fd76213-f360-4851-9ddb-6ee684fafb63', // Gudang Utama

        tgl_penjualan: '',
        NIK: '',
        nama: '',
        registrasi_id: '',
        kelas_kunjungan_id: '',
        ms_asuransi_id: '',
        ms_dokter_id: '',
        ms_jenis_layanan_id: '',
        // no_kunjungan: '',
        // no_rm: '',
        
        // nama_penjualan_external: '',
        // alamat_penjualan_external: '',
        // keterangan_penjualan_external: '',
        // pasien_id: '',

        bulk_fasilitas: [],
        bulk_jasa: [],
        bulk_barang: [],
        bulk_penunjang: []
      },

      config_riwayat_registrasi: {
        title: ' ',
        model_api: 'registrasi/riwayatRegistrasiPasien',
        getter: 'registrasi/riwayatRegistrasiPasien',
        setter: 'registrasi/riwayatRegistrasiPasien',
        pk_field: null,
        frontendPaginate: true,
        filter_api: { no_rm: '' },
        permission: {
          create: false,
          read: 'template-allow-all',
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // id
          {
            id: 'id',
            data: 'id',
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // registrasi_id
          {
            id: 'registrasi_id',
            data: 'registrasi_id',
            label: 'Registrasi ID',
            placeholder: null,
            methods: {
              list: false
            }
          },
          {
            id: 'no_kunjungan',
            data: 'no_kunjungan',
            label: 'No Kunjungan',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'tgl_registrasi',
            data: 'tgl_registrasi',
            label: 'Tanggal Registrasi',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_jenis_layanan',
            data: 'nama_jenis_layanan',
            label: 'Nama Jenis Layanan',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_dokter',
            data: 'nama_dokter',
            label: 'Nama Dokter',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_asuransi',
            data: 'nama_asuransi',
            label: 'Nama Asuransi',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'status_registrasi',
            data: 'status_registrasi',
            label: 'Status Registrasi',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'status_checkout',
            data: 'status_checkout',
            label: 'Status Checkout',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_poliklinik',
            data: 'nama_poliklinik',
            label: 'Nama Poliklinik',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_ruang',
            data: 'nama_ruang',
            label: 'Nama Ruang',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'no_rm',
            data: 'no_rm',
            label: 'No RM',
            placeholder: null,
            methods: {
              list: true
            }
          },
          {
            id: 'nama_lengkap',
            data: 'nama_lengkap',
            label: 'Nama Lengkap',
            placeholder: null,
            methods: {
              list: true
            }
          },
        ]
      },
    }
  },
  beforeMount() {
    this.getBPJSIDonMsAsuransi()
    this.getUmumIDonMsAsuransi()
  },
  mounted() {
    this.$socket.emit('joinRoom', this.room_id)
    this.fields.ms_jenis_layanan_id = 'fbf39a84-2d21-46ac-831d-b0449150f821'
    this.fields.kelas_kunjungan_id = '55c16de4-33e8-4fab-b27e-8f56b5c51724'
  },
  created() {
    this.$socket.off('refresh_admin_pendaftaran')
    this.$socket.on('refresh_admin_pendaftaran', async (callback) => {

      // if(callback.status == 200) this.$_alert.success('Pendaftaran Berhasil Dibuat')
      // else this.$_alert.error(callback.message)

      if (callback.status == 200) {
        this.$_alert.success('Pendaftaran Berhasil Dibuat')

        const registrasi = callback.registrasi
        
        const pasien_request = await this.$_api.single('pasien', {}, registrasi.pasien_id);
        if (pasien_request.data.length === 0) {
          this.$_alert.error('Pasien Tidak Ditemukan | Penjualan tidak dapat dibuat')
          return
        }
        
        const pasien = pasien_request.data[0]

        let penjualan = this.penjualan
        penjualan.tgl_penjualan = registrasi.tgl_registrasi
        penjualan.NIK = pasien.nik
        penjualan.nama = pasien.nama_lengkap
        penjualan.registrasi_id = registrasi.id
        penjualan.kelas_kunjungan_id = registrasi.kelas_kunjungan_id
        penjualan.ms_asuransi_id = registrasi.ms_asuransi_id
        penjualan.ms_dokter_id = registrasi.ms_dokter_id
        penjualan.ms_jenis_layanan_id = registrasi.ms_jenis_layanan_id
        // fields.no_rm
        // fields.nama_pasien
        // fields.no_identitas_registrasi

        this.$_api.post('penjualan/registerBulk', penjualan).then((response) => {
          this.$_alert.success('Penjualan kunjungan ini telah dibuat')
          this.resetForm()
        })
      } else {
        this.$_alert.error(callback, 'Pendaftaran Gagal Dibuat', callback.message)
      }
    });
  },
  methods: {
    openRiwayatRegistrasiModal() {
      this.config_riwayat_registrasi.filter_api = { no_rm: this.fields.no_rm }
      this.$bvModal.show('modal-riwayat-registrasi-form')
      this.$refs['CRUD-riwayat-registrasi-form'].getList()
    },
    async selectedBooking() {
      // this.fields.booking_id = this.selected.booking_id.booking_id
      // this.fields.booking_id = this.selected.booking_id.booking_id
      const booking_id = this.fields.booking_id
      if (!booking_id) return

      const antrianList = await this.$_api.post('antrianList/list', { booking_id })
        if (antrianList.data && antrianList.data.length) this.fields.antrian_loket = antrianList.data[0]
        else this.$_alert.error({}, 'Booking tidak memiliki antrian.')

      const booking = await this.$_api.post('booking/list', { booking_id })
        if (booking.data && booking.data.length) {
          this.fields.pasien_id = booking.data[0].pasien_id
          this.onSelectedPasien(this.fields.pasien_id)
        }
      
    },
    batalKunjungan(registrasi_id) {
      this.$_alert.confirm('Apakah anda yakin ingin membatalkan kunjungan?').then((status) => {
        if (status.isConfirmed) {
          this.$_api.post('registrasi/batalKunjungan', { registrasi_id: registrasi_id }).then((response) => {
            this.$_alert.success('Berhasil batalkan kunjungan')
            this.resetForm()
            this.$refs['table-daftar-kunjungan'].getDaftarKunjungan();
          }).catch((error) => {
            this.$_alert.error(error, 'Gagal Batalkan Kunjungan', error.message)
          })
        } else {
          this.$_alert.info('Batalkan kunjungan dibatalkan')
        }
      })
    },
    tutupKunjungan() {
      this.$_api.post('registrasi/tutupKunjungan', { ...this.tutup_kunjungan }).then((response) => {
        this.$_alert.success('Berhasil tutup kunjungan')
        this.resetForm()
        this.$refs['table-daftar-kunjungan'].getDaftarKunjungan();
      }).catch((error) => {
        this.$_alert.error(error, 'Gagal Tutup Kunjungan', error.message)
      })
    },
    resetForm() {
      this.modeSubmit = this.modes.add
      this.fields = {
        id: '',
        pasien_id: '',
        tgl_registrasi: this.dateToday,
        ms_jenis_layanan_id: 'fbf39a84-2d21-46ac-831d-b0449150f821', // RAwAT JALAN
        kelas_kunjungan_id: '55c16de4-33e8-4fab-b27e-8f56b5c51724',
        ms_dokter_id: '',
        ms_spesialis_id: '',
        keterangan_registrasi: '',
        no_rm: '',
        nama_pasien: '',
        jenis_kelamin: '',
        ms_asuransi_id: '',
        no_identitas_registrasi: '',
        nama_penanggung: '',
        alamat_sekarang: '',
        no_hp_registrasi: '',
        no_phone: '',
        nama_pekerjaan: '',
        no_asuransi_registrasi: '',
        no_rujukan: null,
        no_kontrol: '',
        booking_id: '',
        antrian_loket_id: null,
        no_antrian: null,
        no_sep: null,
        jadwal_dokter_id: '',
        is_master: 1,

        antrian_id: null,
        tgl_antrian: null,
        poli_layanan: null,
        initial: null,
        antrian_no: null,
        jenis_antrian_id: null,
      }
      this.selected = {
        pasien_id: {
          no_rm: '',
          nama_lengkap: '',
          jenis_kelamin: '',
          umur: '',
          nik: '',
          nama_penjamin: '',
          alamat_sekarang: '',
          sc_whatsapp: '',
          no_telepon: '',
          nama_pekerjaan: '',
          no_asuransi_pasien: '',
        },
        peserta: {},
        rujukan: {},
        ms_dokter_id: {
          ms_specialist_id: '',
        },
        ms_asuransi_id: {},
        booking_id: {},
        antrian_loket_id: {},
        registrasi: {},
        jadwal_dokter_id: {},
      }
      this.list = {
        rujukan: [],
        noKontrol: [],
      }
      this.isBpjsValid = false

      this.optionalFields = {
        no_rujukan: {
          lookup: '',
          text: ''
        },
        no_kontrol: {
          lookup: '',
          text: ''
        },
      }
    },
    cek() {
      let user = JSON.parse(localStorage.getItem('profile'))
    },
    submitForm() {
      if (this.isLoadingSubmit) return
      this.isLoadingSubmit = true

      let param = JSON.parse(JSON.stringify(this.fields))

      let createOrUpdate = this.modeSubmit === this.modes.add ? 'DIBUAT' : 'DIPERBARUI'
      this.$_alert.confirm('Simpan Data', `Data registrasi rawat jalan akan ${createOrUpdate}, ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed) {

          if (this.optionalFields.no_rujukan.lookup) {
            param.no_rujukan = this.optionalFields.no_rujukan.lookup
            this.fields.no_rujukan = this.optionalFields.no_rujukan.lookup
          } else if (this.optionalFields.no_rujukan.text) {
            param.no_rujukan = this.optionalFields.no_rujukan.text
            this.fields.no_rujukan = this.optionalFields.no_rujukan.text
          } else if (!this.optionalFields.no_rujukan.lookup && !this.optionalFields.no_rujukan.text) {
            param.no_rujukan = ''
            this.fields.no_rujukan = ''
          }

          if (this.optionalFields.no_kontrol.text) {
            param.no_kontrol = this.optionalFields.no_kontrol.text
            this.fields.no_kontrol = this.optionalFields.no_kontrol.text
          } else if (this.optionalFields.no_kontrol.lookup) {
            param.no_kontrol = this.optionalFields.no_kontrol.lookup
            this.fields.no_kontrol = this.optionalFields.no_kontrol.lookup
          } else if (!this.optionalFields.no_kontrol.lookup && !this.optionalFields.no_kontrol.text) {
            param.no_kontrol = ''
            this.fields.no_kontrol = ''
          }

          let userLS = JSON.parse(localStorage.getItem('profile'))
          param.username = userLS && userLS.username ? userLS.username : 'admin'
          if (res.value && this.modeSubmit === this.modes.add) {
            delete param.id
            if (!param.tgl_antrian) param.tgl_antrian = param.tgl_registrasi

            const keyToBeNull = ["antrian_loket_id", "no_antrian", "no_rujukan", "no_antrian", "no_sep"]
            keyToBeNull.forEach((key) => {
              if (param[key] === '') param[key] = null
            })

            let paramSocket = JSON.parse(JSON.stringify(param))
            paramSocket.poli_layanan = 2
            if(!paramSocket.initial && this.selected.jadwal_dokter_id && this.selected.jadwal_dokter_id.initial_jadwal) paramSocket.initial = this.selected.jadwal_dokter_id.initial_jadwal
            this.$socket.emit('registrasiAdminRajal', paramSocket, this.room_id)

            // this.$_api.post(this.configAPI.submit, param).then((res) => {
            //   if (res.status == 200) {
            //     this.$_alert.success('Registrasi berhasil dibuat', res.message)

            //     // Emit ke socket buat antrian
            //     let data = res.data
            //     this.$socket.emit('pindahAntrianRajalLoket', {
            //       // antrian_id: data.antrian_id,
            //       tgl_antrian: data.tgl_registrasi,
            //       // is_master: data.is_master,
            //       // poli_layanan: data.poli_layanan,
            //       poli_layanan: '2', // 2 = RAJAL
            //       // initial: data.initial,
            //       // antrian_no: data.antrian_no,
            //       // status_antrian: data.status_antrian, // kalau ngga salah isinya 1/2
            //       jadwal_dokter_id: param.jadwal_dokter_id,
            //       // ms_loket_id: data.ms_loket_id,
            //       jenis_antrian_id: '65a97cbd-1e6d-47be-92e9-07d18a29a6fa', // Ini ID Milik jenis_antrian Rawat Jalan
            //       // booking_id: data.booking_id,
            //       booking_id: null, // Kan bukan booking ya
            //       // kode_booking_bpjs: data.kode_booking_bpjs,
            //       // layanan_ruang_id: data.layanan_ruang_id
            //     }, this.room_id)
            //   } else {
            //     this.$_alert.error(res, 'Pembuatan Registrasi Gagal', res.message)
            //   }
            // }).catch((err) => {
            //   this.$_alert.error(err, 'Gagal', err.message)
            // })
          } else if (res.value && this.modeSubmit === this.modes.edit) {

            this.$_api.post(this.configAPI.update, param).then((res) => {
              if (res.status === 200) {
                this.$_alert.success('Registrasi berhasil diperbarui', res.message)
              } else {
                this.$_alert.error(res, 'Perbaruan Registrasi Gagal', res.message)
              }
            }).catch((err) => {
              this.$_alert.error(err, 'Gagal', err.message)
            })
          }
        }
      }).finally(() => {
        this.isLoadingSubmit = false
        this.isCreatedOrUpdated = true
      })

    },
    getBPJSIDonMsAsuransi() {
      let tipe_bpjs = 2
      this.$_api.post('msAsuransi/list', {
        tipe_asuransi: tipe_bpjs,
      }).then((res) => {
        this.bpjs_details = res.data[0]
      })
    },
    getUmumIDonMsAsuransi() {
      let tipe_umum = 1
      this.$_api.post('msAsuransi/list', {
        tipe_asuransi: tipe_umum,
      }).then((res) => {
        this.umum_details = res.data[0]
      })
    },
    onSelectedPasien(data) {
      this.$_api.post('pasien/detailsById', {
        id: data
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selected.pasien_id = res.data[0]
          this.fields.no_rm = res.data[0].no_rm
          this.fields.nama_pasien = res.data[0].nama_lengkap
          this.fields.jenis_kelamin = res.data[0].jenis_kelamin
          this.fields.no_identitas_registrasi = res.data[0].nik
          this.fields.nama_penanggung = res.data[0].nama_penjamin
          this.fields.alamat_sekarang = res.data[0].alamat_sekarang
          this.fields.no_hp_registrasi = res.data[0].sc_whatsapp
          this.fields.no_phone = res.data[0].no_telepon
          this.fields.nama_pekerjaan = res.data[0].nama_pekerjaan
          this.fields.no_asuransi_registrasi = res.data[0].no_asuransi_pasien

          this.fields.tgl_lahir = res.data[0].tgl_lahir
        }
      })
    },
    onSelectedDokter(data) {
      this.$_api.post('msDokter/detailsById', {
        id: data
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selected.ms_dokter_id = res.data[0]
          this.fields.ms_spesialis_id = res.data[0].ms_specialist_id
        }
      })
    },
    onSelectedMsAsuransi(data) {
      if (data == this.bpjs_details.id && !this.fields.no_asuransi_registrasi) {
        this.fields.no_asuransi_registrasi = this.selected.pasien_id.no_asuransi_pasien
      } else if (data == this.umum_details.id) {
        this.fields.no_asuransi_registrasi = ''
      } else if (!this.fields.no_asuransi_registrasi) {
        this.fields.no_asuransi_registrasi = this.selected.pasien_id.no_asuransi_pasien
      }
    },
    onSelectJadwalDokter(data) {
      this.$_api.post('jadwalDokter/detailsById', {
        id: data
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selected.jadwal_dokter_id = res.data[0]
          this.fields.ms_dokter_id = res.data[0].ms_dokter_id
          this.fields.initial = res.data[0].initial_jadwal
          this.fields.ms_specialist_id = res.data[0].ms_specialist_id
          this.fields.ms_spesialis_id = res.data[0].ms_specialist_id
        }
      })
    },
    getPesertaByNoKartu(data, tipe = 'bpjs') {
      let no_asuransi_registrasi = this.fields.no_asuransi_registrasi
      if (data && typeof data === 'string') no_asuransi_registrasi = data

      this.isBpjsValid = false

      if (no_asuransi_registrasi) {
        this.$_api.post('bpjs/vclaim/peserta/getPesertaByNoKartu', {
          noKartu: no_asuransi_registrasi,
          jenis: tipe
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.selected.peserta = res.data[0].peserta
            if (this.selected.peserta.statusPeserta.keterangan == 'AKTIF') {
              let keterangan = tipe == 'bpjs' ? 'Data BPJS aktif' : 'Data BPJS aktif berdasarkan NIK'
              this.$_alert.success(keterangan)
              // this.getRujukanBerdasarkanNomorKartuMulti()
              this.isBpjsValid = true
            } else {
              this.$_alert.success(this.selected.peserta.statusPeserta.keterangan)
            }
          } else {
            this.$_alert.error(res, 'Validasi BPJS Gagal', res.message)
          }
        }).catch((err) => {
          this.$_alert.error(err, 'Gagal', err.message)
        })
      } else {
        this.$_alert.success('No. Kartu tidak boleh kosong')
      }
    },
    getRujukanBerdasarkanNomorKartuMulti() {

      this.$_api.post('bpjs/vclaim/rujukan/getRujukanBerdasarkanNomorKartuMulti', {
        noKartu: this.fields.no_asuransi_registrasi,
        tipe: this.tipe_rujukan.pcare
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.list.rujukan = res.data[0].rujukan
          this.$_alert.success('No Rujukan Tersedia')
        } else {
          this.list.rujukan = []
          this.$_alert.error(res, 'Gagal mengambil no rujukan', res.message)
        }
      }).catch((err) => {
        this.list.rujukan = []
        this.$_alert.error(err, 'Gagal mengambil no rujukan', err.message)
      })
    },
    onSelectNoRujukan(data) {
      let no_rujukan = this.fields.no_rujukan
      if (data) no_rujukan = data

      this.$_api.post('bpjs/vclaim/rujukan/getRujukanByNoRujukan', {
        noRujukan: no_rujukan,
        tipe: this.tipe_rujukan.pcare
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selected.rujukan = res.data[0]
          this.$_alert.success(res.message)
        } else {
          this.$_alert.success(res.message)
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
      })
    },
    checkNoRujukan() {
      if (this.optionalFields.no_rujukan.text) {
        this.$_api.post('bpjs/vclaim/rujukan/getRujukanByNoRujukan', {
          noRujukan: this.optionalFields.no_rujukan.text,
          tipe: this.tipe_rujukan.pcare
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.selected.rujukan = res.data[0]
            let rujukan = res.data[0]
            if (rujukan && rujukan.rujukan && rujukan.rujukan.provPerujuk && rujukan.rujukan.provPerujuk.kode) this.fields.id_faskes_perujuk = rujukan.rujukan.provPerujuk.kode

            this.$_alert.success('No Rujukan Tersedia')
          } else {
            this.$_alert.error(res, 'Validasi No Rujukan Gagal', res.message)
          }
        }).catch((err) => {
          this.$_alert.error(err, 'Validasi No Rujukan Gagal', err.message)
        })
      } else {
        let err = {
          status: 201,
        }
        this.$_alert.success('No Rujukan tidak boleh kosong')
      }
    },
    checkNoKontrol() {
      let noKontrol = this.optionalFields.no_kontrol.text ? this.optionalFields.no_kontrol.text : this.optionalFields.no_kontrol.lookup ? this.optionalFields.no_kontrol.lookup : ''
      if (noKontrol) {
        this.$_api.post('bpjs/vclaim/rencanaKontrol/getNomorSuratKontrol', {
          noSuratKontrol: this.optionalFields.no_kontrol.text
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.selected.rujukan = res.data[0]
            this.$_alert.success('No Kontrol Tersedia')
          } else {
            this.$_alert.error(res, 'Validasi No Kontrol Gagal', res.message)
          }
        }).catch((err) => {
          this.$_alert.error(err, 'Validasi No Kontrol Gagal', err.message)
        })
      } else {
        let err = {
          status: 201,
        }
        this.$_alert.success('No Kontrol tidak boleh kosong')
      }
    },
    openModalSEP() {
      if (this.fields.no_asuransi_registrasi && this.isBpjsValid && !this.fields.no_sep) {
        this.modalSEP1 = true
        this.modalSEP2 = false
        this.$bvModal.show('modal-SEP1')
        this.$bvModal.hide('modal-SEP2')
      } else if (this.fields.no_asuransi_registrasi && this.isBpjsValid && this.fields.no_sep) {
        this.modalSEP1 = false
        this.modalSEP2 = true
        this.$bvModal.show('modal-SEP2')
        this.$bvModal.hide('modal-SEP1')
      } else {
        this.$_alert.success('No. Asuransi tidak valid')
      }
    },
    handleSelectKunjungan(item) {
      let real = item.item
      this.selected.registrasi = real

      this.fields.id = real.registrasi_id
      this.fields.pasien_id = real.pasien_id

      this.onSelectedPasien(real.pasien_id)

      this.fields.tgl_registrasi = moment(real.tgl_registrasi).format('YYYY-MM-DD HH:mm:ss')
      this.fields.ms_jenis_layanan_id = real.ms_jenis_layanan_id
      this.fields.kelas_kunjungan_id = real.kelas_kunjungan_id
      this.fields.ms_dokter_id = real.ms_dokter_id

      this.onSelectedDokter(real.ms_dokter_id)

      this.fields.ms_spesialis_id = real.ms_specialist_id
      this.fields.keterangan_registrasi = real.keterangan_registrasi
      this.fields.no_rm = real.no_rm
      this.fields.nama_pasien = real.nama_lengkap
      this.fields.jenis_kelamin = real.jenis_kelamin
      this.fields.no_identitas_registrasi = real.no_identitas_registrasi
      this.fields.nama_penanggung = real.nama_penjamin
      this.fields.alamat_sekarang = real.alamat_sekarang
      this.fields.no_hp_registrasi = real.sc_whatsapp
      this.fields.no_phone = real.no_telepon
      this.fields.nama_pekerjaan = real.nama_pekerjaan
      this.fields.ms_asuransi_id = real.ms_asuransi_id
      this.fields.no_asuransi_registrasi = real.no_asuransi_registrasi
      this.fields.no_rujukan = real.no_rujukan

      this.fields.ms_poliklinik_id = real.ms_poliklinik_id
      this.fields.jadwal_dokter_id = real.jadwal_dokter_id

      this.fields.tgl_lahir = real.tgl_lahir

      this.optionalFields.no_rujukan.text = real.no_rujukan
      this.optionalFields.no_rujukan.lookup = real.no_rujukan

      this.optionalFields.no_kontrol.text = real.no_kontrol
      this.optionalFields.no_kontrol.lookup = real.no_kontrol

      if (real.ms_asuransi_id == this.bpjs_details.id) {
        this.getPesertaByNoKartu(real.no_asuransi_registrasi)
      }
      // this.onSelectNoRujukan(real.no_rujukan)

      this.fields.no_kontrol = real.no_kontrol
      this.fields.booking_id = real.booking_id
      this.fields.antrian_loket_id = real.antrian_loket_id
      this.fields.antrian_id = real.antrian_loket_id
      this.fields.no_antrian = real.no_antrian

      this.fields.no_sep = real.no_sep
      this.modeSubmit = this.modes.edit
    },
    handleCreatedSEP(data) {
      this.createdSEP = data
      this.fields.no_sep = data.noSep
      this.isCreatedOrUpdated = true
      this.modalSEP1 = false
      this.modalSEP2 = false
      // this.$bvModal.hide('modal-SEP2')
      // this.$bvModal.hide('modal-SEP1')
    },
    handleDeletedSEP(data) {
      this.fields.no_sep = ''
      this.isCreatedOrUpdated = true
      this.modalSEP1 = false
      this.modalSEP2 = false
      this.$bvModal.hide('modal-SEP2')
      this.$bvModal.hide('modal-SEP1')
    },
    handleIsCreatedOrUpdated() {
      this.isCreatedOrUpdated = false
    },
    handleCloseModalSEP(data) {
      if (data == 'modal-SEP1') {
        this.modalSEP1 = false
      } else {
        this.modalSEP2 = false
      }
    },
    handleOpenModalSEP(data) {
      if (data == 'modal-SEP1') {
        this.modalSEP1 = true
        this.modalSEP2 = false
      } else if (data == 'modal-SEP2') {
        this.modalSEP2 = true
        this.modalSEP1 = false
      }
    },
    getNomorSuratKontrolByNoKartu() {
      // bulan, tahun, noKartu, filter
      // Bulan. Contoh: Januari => 01
      // filter => 1: tanggal entri, 2: tanggal rencana kontrol
      // tglRencanaKontrol
      let bulan = moment(this.filters.tglRencanaKontrol).format('MM')
      let tahun = moment(this.filters.tglRencanaKontrol).format('YYYY')

      this.$_api.post('bpjs/vclaim/rencanaKontrol/getNomorSuratKontrolByNoKartu', {
        noKartu: this.fields.no_asuransi_registrasi,
        bulan: bulan,
        tahun: tahun,
        filter: '2',
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.list.noKontrol = res.data
          this.$_alert.success(res.message)
        } else {
          this.list.noKontrol = []
          this.$_alert.error(res, 'Gagal mengambil surat kontrol', res.message)
        }
      }).catch((err) => {
        this.list.noKontrol = []
        this.$_alert.error(err, 'Gagal mengambil surat kontrol', err.message)
      })
    },
    formatYMD(date) {
      if (date) {
        return moment(date).format('YYYY-MM-DD')
      }
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  watch: {
    selected: {
      handler: function (val, oldVal) {
        if (val.ms_dokter_id && val.ms_dokter_id.ms_specialist_id) {
          this.fields.ms_spesialis_id = val.ms_dokter_id.ms_specialist_id
        }
      },
      deep: true
    },
    fields: {
      handler: function (val, oldVal) {
        if (val.ms_asuransi_id && this.fields.pasien_id) {
          this.onSelectedMsAsuransi()
          if (val.ms_asuransi_id == this.bpjs_details.id) {
            this.conditionalFields.no_asuransi_registrasi.value = true
            this.conditionalFields.no_asuransi_registrasi.label = 'No. BPJS'
            this.conditionalFields.no_rujukan.value = true
            this.conditionalFields.no_kontrol.value = true
            this.conditionalFields.no_sep.value = true
          } else if (val.ms_asuransi_id == this.umum_details.id) {
            this.conditionalFields.no_asuransi_registrasi.value = false
            this.conditionalFields.no_rujukan.value = false
            this.conditionalFields.no_kontrol.value = false
            this.conditionalFields.no_sep.value = false
          } else {
            this.conditionalFields.no_asuransi_registrasi.value = true
            this.conditionalFields.no_asuransi_registrasi.label = 'No. Asuransi'
            this.conditionalFields.no_rujukan.value = false
            this.conditionalFields.no_kontrol.value = false
            this.conditionalFields.no_sep.value = false
          }
        } else {
          this.conditionalFields.no_asuransi_registrasi.value = false
          this.fields.no_asuransi_registrasi = ''
          this.conditionalFields.no_rujukan.value = false
          this.conditionalFields.no_kontrol.value = false
          this.conditionalFields.no_sep.value = false
        }

        if (val.no_rujukan && !this.selected.rujukan) {
          this.onSelectNoRujukan()
        }

      },
      deep: true
    },
    'fields.no_rujukan': {
      handler: function (val, oldVal) {
        if (!val && this.selected.registrasi) {
          this.fields.no_rujukan = this.selected.registrasi.no_rujukan
        }
      },
      deep: true,
      immediate: true
    },
    'fields.antrian_loket': {
      handler: function (to, from) {
        if (to) {
          this.fields.is_master = null
          if (to.antrian_list_id) this.fields.antrian_id = to.antrian_list_id
          if (to.tgl_antrian) this.fields.tgl_antrian = to.tgl_antrian
          if (to.poli_layanan) this.fields.poli_layanan = to.poli_layanan
          if (to.initial) this.fields.initial = to.initial
          if (to.antrian_no) this.fields.antrian_no = to.antrian_no
          if (to.jadwal_dokter_id) this.fields.jadwal_dokter_id = to.jadwal_dokter_id
          if (to.jenis_antrian_id) this.fields.jenis_antrian_id = to.jenis_antrian_id
          if (to.booking_id) this.fields.booking_id = to.booking_id
          if (to.no_identitas_registrasi) this.fields.no_identitas_registrasi = to.no_identitas_registrasi
        } else {
          this.fields.is_master = 1
          this.fields.antrian_id = null
          this.fields.tgl_antrian = null
          this.fields.poli_layanan = null
          this.fields.initial = null
          this.fields.antrian_no = null
          this.fields.jadwal_dokter_id = null
          this.fields.jenis_antrian_id = null
          this.fields.booking_id = null
          this.fields.no_identitas_registrasi = null
        }
      },
      deep: true,
      immediate: true
    },
    conditionalFields: {
      handler: function (val, oldVal) {
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            if (!element.value) {
              this.fields[key] = ''
            }
          }
        }
      },
      deep: true
    },
    modeSubmit: function (val, oldVal) {
      if (val === this.modes.add) {
        this.disabled.pasien_id = false
        this.fields.id = ''
        this.fields.no_sep = ''
      } else if (val === this.modes.edit) {
        this.disabled.pasien_id = true
      }
    },
    'createdSEP': {
      handler: function (val, oldVal) {
        if (val && val.no_sep) {
          this.fields.no_sep = val.noSep
        }
      },
      deep: true,
      immediate: true
    },
    // 'list.rujukan': {
    //   handler: function (val, oldVal) {
    //     if (!!val && val.length > 0) {
    //       for (let i = 0; i < val.length; i++) {
    //         const element = val[i];
    //         if (element.noKunjungan == this.fields.no_rujukan) {
    //           this.selected.rujukan = element
    //           this.fields.no_rujukan = element.noKunjungan
    //         }
    //       }
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
