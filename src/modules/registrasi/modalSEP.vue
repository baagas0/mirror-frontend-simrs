<template>
  <div>
    <b-modal id="modal-SEP1" @hidden="handleCloseModalSEP1" ref="modal" title="SEP" size="md" hide-footer
      header-bg-variant="info" header-text-variant="light">
      <template #modal-header>
        <h3 class="text-white">SEP</h3>
      </template>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(openModalSEP2)" autocomplete="off">
          <b-row>
            <b-col cols="12" lg="12" md="12" class="mt-2">
              <s-input groupClass="mb-0" v-model="modalSEPFields.tgl_pelayanan" :item="{
                label: 'Tanggal Pelayanan',
                id: 'tgl_pelayanan',
                data: 'tgl_pelayanan',
                type: 'date',
                validation: [''],
              }" :valuee="dateToday" />
            </b-col>
            <b-col cols="12">

              <s-input groupClass="mb-0" v-model="modalSEPFields.no_asuransi_registrasi" :item="{
                label: modalSEPFields.tipeKartu == '1' ? 'No. BPJS' : 'NIK',
                id: 'no_asuransi_registrasi',
                data: 'no_asuransi_registrasi',
                type: 'text',
                validation: ['required'],
              }" :valuee="no_asuransi_registrasi" />
            </b-col>

            <b-col cols="12">
              <b-form-group cols="6" label="Tipe Kartu">
                <b-form-radio-group v-model="modalSEPFields.tipeKartu" :options="list.tipeKartu" name="radio-inline"
                  @change="resetSelected"></b-form-radio-group>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="12" md="12" class="mt-4">
              <b-button variant="outline-info" size="lg" style="width:100%" type="submit">Cari</b-button>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </b-modal>
    <b-modal id="modal-SEP2" @hidden="handleModalSEP" ref="modal" title="SEP" size="xl" centered hide-footer
      header-bg-variant="info" header-text-variant="light">
      <template #modal-header>
        <h3 class="text-white">SEP</h3>
      </template>
      <b-row>
        <b-col cols="5" class="mt-2">
          <b-row>
            <b-col cols="12" class="d-flex flex-column mb-4">
              <h2><strong>{{ pesertaProps.nama_pasien }}</strong></h2>
              <h4><strong>No Kartu : {{ pesertaProps.no_asuransi_registrasi }}</strong></h4>
            </b-col>
          </b-row>
          <b-row class="border border-secondary rounded-lg py-6">
            <b-col cols="12" class="btn-group w-100 mb-4">
              <button @click="currentModeProfile = 1" class="btn"
                :class="currentModeProfile == 1 ? 'btn-info' : 'btn-outline-info'" type="button">Profil</button>
              <button @click="currentModeProfile = 2" class="btn"
                :class="currentModeProfile == 2 ? 'btn-info' : 'btn-outline-info'" type="button">Riwayat</button>
            </b-col>
            <b-col v-if="currentModeProfile == 1" cols="12" class="d-flex flex-column">
              <s-input groupClass="" class="mb-4" v-model="selected.peserta.nik" :item="{
                label: 'NIK',
                id: 'selected.peserta.nik',
                data: 'selected.peserta.nik',
                type: 'text',
                validation: [],
              }" :valuee="selected.peserta.nik" :disabled="true" />
              <s-input groupClass="" class="mb-4" v-model="selected.peserta.hakKelas.keterangan" :item="{
                label: 'Hak Kelas',
                id: 'selected.peserta.hakKelas.keterangan',
                data: 'selected.peserta.hakKelas.keterangan',
                type: 'text',
                validation: [],
              }" :valuee="selected.peserta.hakKelas.keterangan" :disabled="true" />
              <!-- <s-input groupClass="" class="mb-4" v-model="selected.peserta.hakKelas.keterangan" :item="{
                label: 'Asal Rujukan',
                id: 'selected.peserta.hakKelas.keterangan',
                data: 'selected.peserta.hakKelas.keterangan',
                type: 'text',
                validation: [],
              }" :valuee="selected.peserta.jenisPeserta.keterangan" :disabled="true" /> -->
              <s-input groupClass="" class="mb-4" v-model="selected.peserta.jenisPeserta.keterangan" :item="{
                label: 'Pekerjaan',
                id: 'selected.peserta.jenisPeserta.keterangan',
                data: 'selected.peserta.jenisPeserta.keterangan',
                type: 'text',
                validation: [],
              }" :valuee="selected.peserta.jenisPeserta.keterangan" :disabled="true" />
              <s-input groupClass="" class="mb-4" v-model="fields.noMR" :item="{
                label: 'No MR',
                id: 'selected.peserta.mr.noMR',
                data: 'selected.peserta.mr.noMR',
                type: 'text',
                validation: [],
              }" :valuee="pesertaProps.no_rm" />
              <s-input groupClass="" class="mb-4" v-model="fields.noTelp" :item="{
                label: 'No Telp',
                id: 'selected.peserta.mr.noTelp',
                data: 'selected.peserta.mr.noTelp',
                type: 'text',
                validation: [],
              }" :valuee="pesertaProps.no_hp_registrasi" />
            </b-col>
            <b-col v-if="currentModeProfile == 2" cols="12" class="d-flex">
              <!-- <s-input groupClass="mb-0" v-model="modalSEPFields.no_asuransi_registrasi" :item="{
                label: 'No. BPJS',
                id: 'no_asuransi_registrasi',
                data: 'no_asuransi_registrasi',
                type: 'text',
                validation: [],
              }" :valuee="no_asuransi_registrasi" :disabled="true" /> -->
              <s-input class="mr-2" groupClass="mb-0" v-model="referensiParam.tglMulai" :item="{
                label: 'Tanggal Mulai',
                id: 'tglMulai',
                data: 'tglMulai',
                type: 'date',
                validation: [],
              }" :valuee="dateDefault.startRefTglMulai" />
              <s-input groupClass="mb-0" v-model="referensiParam.tglAkhir" :item="{
                label: 'Tanggal Akhir',
                id: 'tglAkhir',
                data: 'tglAkhir',
                type: 'date',
                validation: [],
              }" :valuee="dateDefault.endRefTglMulai" />
            </b-col>
            <b-col v-if="currentModeProfile == 2" cols="12" lg="12" md="12" class="mt-2">
              <b-button variant="outline-info" size="lg" style="width:100%"
                @click="getDataHistoriPelayananPeserta">Cari</b-button>
            </b-col>
            <b-col v-if="currentModeProfile == 2" cols="12" lg="12" md="12" class="mt-2">
              <div v-if="list.historiPelayanan.length > 0"
                style="max-height: 200px; min-height: 100px; overflow-y: auto;">
                <div class="d-flex flex-column py-4"
                  :class="{ 'border-bottom pb-0': list.historiPelayanan.length > 1 && index !== list.historiPelayanan.length - 1 }"
                  v-for="(item, index) in list.historiPelayanan" :key="index">
                  <h4><strong>{{ item.noRujukan }}</strong></h4>
                  <h5>
                    <strong>
                      <span v-if="item.jnsPelayanan == 2">Rawat Jalan</span>
                      <span v-else>Rawat Inap</span>
                    </strong>
                  </h5>

                  <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column">
                      <div>No SEP</div>
                      <div>Tgl SEP</div>
                      <div>Tgl Pulang</div>
                      <div>PPK</div>
                      <div>Diagnosa</div>
                      <div v-if="jenisKunjungan == kunjungans.rajal">Poliklinik</div>
                      <div>Kelas</div>
                    </div>
                    <div class="d-flex flex-column">
                      <div>: {{ item.noSep }}</div>
                      <div>: {{ item.tglSep }}</div>
                      <div>: {{ item.tglPlgSep }}</div>
                      <div>: {{ item.ppkPelayanan }}</div>
                      <div>: {{ item.diagnosa }}</div>
                      <div v-if="jenisKunjungan == kunjungans.rajal">: {{ item.poli }}</div>
                      <div>: {{ item.kelasRawat }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="d-flex justify-items-center justify-content-center align-items-center"
                style="min-height: 100px;">
                <h4><strong>{{ infoData.historiPelayanan ? infoData.historiPelayanan : 'Data tidak ditemukan' }}</strong>
                </h4>
              </div>

            </b-col>
          </b-row>
        </b-col>
        <b-col cols="7" class="mt-2">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(submitForm)" autocomplete="off">
              <b-row>
                <b-col cols="12" class="mb-3">
                  <h3>
                    <strong>No SEP:
                      <span v-if="noSEP">{{ noSEP }}</span>
                      <span v-else>-</span>
                    </strong>
                  </h3>
                </b-col>

                <!-- <b-col cols="12" v-if="jenisKunjungan == kunjungans.rajal">
                  <label for="ppkPelayanan">PPK Pelayanan</label>
                  <multiselect id="ppkPelayanan" v-model="filters.ppkPelayanan" :options="list.ppkPelayanan"
                    :multiple="false" :internal-search="false" :searchable="true" :close-on-select="true"
                    :show-labels="false" label="nama" track-by="kode" @search-change="getReferensiPpkPelayanan"
                    @remove="onRemove('ppkPelayanan')" @select="onSelectPpkPelayanan" placeholder="Pilih PPK Pelayanan"
                    size="sm" />
                </b-col> -->
                <b-col cols="3" @click="customAlert('error')">

                  <s-input v-model="fields.asalRujukan" :key="'asalRujukan'" :id="'asalRujukan'" :item="{
                    label: 'PPK Asal',
                    id: 'asalRujukan',
                    data: 'asalRujukan',
                    type: 'lookup-radio',
                    validation: [],
                    pointer: {
                      label: 'label',
                      code: 'code',
                      list: list.asalRujukan,
                      display: ['label']
                    },
                  }" :valuee="fields.asalRujukan" :disabled="modeSubmit == modes.edit" />
                </b-col>
                <b-col cols="4" @click="customAlert('success')">
                  <s-input groupClass="mb-0" v-model="fields.tglSep" :item="{
                    label: 'Tanggal Pelayanan',
                    id: 'tglSep',
                    data: 'tglSep',
                    type: 'date',
                    validation: [''],
                  }" :valuee="dateToday" />
                </b-col>
                <b-col cols="4" class="d-flex align-items-center justify-items-end justify-content-end">
                  <b-form-checkbox id="cob" v-model="fields.cob" name="cob" value="1" unchecked-value="0">
                    COB
                  </b-form-checkbox>

                  <b-form-checkbox class="ml-4" id="katarak" v-model="fields.katarak" name="katarak" value="1"
                    unchecked-value="0">
                    Katarak
                  </b-form-checkbox>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="8" class="d-flex flex-row">
                  <div class="mr-8" >
                    <s-input groupClass="mb-0" v-model="fields.tglRujukan" :item="{
                      label: 'Tanggal Rujukan',
                      id: 'tglRujukan',
                      data: 'tglRujukan',
                      type: 'date',
                      validation: [''],
                    }" :valuee="fields.tglRujukan" :disabled="modeSubmit == modes.edit" />
                  </div>
                  <div v-if="jenisKunjungan != kunjungans.igd">
                    <s-input groupClass="mb-0" v-model="fields.ppkRujukan" 
                      :item="{
                        label: 'PPK Rujukan',
                        id: 'ppkRujukan',
                        data: 'ppkRujukan',
                        type: 'text',
                        validation: [jenisKunjungan != kunjungans.igd ? 'required' : ''],
                      }" :valuee="fields.ppkRujukan" :disabled="false" />
                  </div>
                </b-col>
                <b-col cols="4" v-if="jenisKunjungan != kunjungans.igd">
                  <s-input groupClass="mb-0" v-model="fields.noRujukan" :item="{
                    label: 'No. Rujukan',
                    id: 'noRujukan',
                    data: 'noRujukan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="fields.noRujukan" />
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <label for="kodeDPJP">DPJP</label>
                  <p class="text-danger">Dokter: {{filters.kodeDPJP.nama || '-'}}</p>
                  <multiselect id="kodeDPJP" v-model="filters.kodeDPJP" :options="list.dokterDPJP" :multiple="false"
                    :internal-search="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama"
                    track-by="kode" @search-change="getReferensiDokterDPJP" @remove="onRemove('kodeDPJP')"
                    @select="onSelectDokterDPJP" placeholder="Pilih Dokter" size="sm" />
                </b-col>
                <b-col cols="4" v-if="jenisKunjungan == kunjungans.rajal || jenisKunjungan == kunjungans.igd" class="d-flex flex-column">
                  <div class="mb-1">
                    <label for="tujuan">Poliklinik</label>
                    <p class="text-danger">Poli: {{filters.tujuan.nama || '-'}}</p>
                    <!-- {{ filters.tujuan }}
                    <pre>{{ list.tujuan }}</pre> -->
                    <multiselect id="tujuan" v-model="filters.tujuan" :options="list.tujuan" :multiple="false" :disabled="modeSubmit === modes.edit"
                      :internal-search="false" :searchable="true" :close-on-select="true" :show-labels="false"
                      label="nama" track-by="kode" @search-change="getReferensiPoli" @remove="onRemove('tujuan')"
                      @select="onSelectPoliklinik" placeholder="Pilih Poliklinik" size="sm" />
                  </div>

                  <div>
                    <b-form-checkbox id="eksekutif" v-model="fields.eksekutif" name="eksekutif" unchecked-value="0"
                      value="1">
                      Poli Eksekutif
                    </b-form-checkbox>
                  </div>
                </b-col>
                <b-col cols="4">

                  <s-input v-model="fields.tujuanKunj" :key="'tujuanKunj'" :id="'tujuanKunj'" :item="{
                    label: 'Tujuan Kunjungan',
                    id: 'tujuanKunj',
                    data: 'tujuanKunj',
                    type: 'lookup-radio',
                    validation: [],
                    pointer: {
                      label: 'label',
                      code: 'code',
                      list: list.tujuanKunj,
                      display: ['label']
                    },
                  }" :valuee="fields.tujuanKunj" :disabled="modeSubmit == modes.edit" />
                </b-col>

              </b-row>
              <b-row class="mt-3">
                <b-col cols="4">
                  <s-input groupClass="mb-0" v-model="filters.param.diagAwal" :item="{
                    label: 'Diagnosa',
                    id: 'diagAwalKode',
                    data: 'diagAwalKode',
                    type: 'text',
                    validation: ['required'],
                    placeholder: 'Masukkan kode diagnosa'
                  }" :valuee="filters.param.diagAwal" @input="getReferensiDiagnosa" />
                </b-col>
                <b-col cols="8">
                  <label for="diagAwal">Diagnosa Awal</label>
                  <multiselect id="diagAwal" v-model="filters.diagAwal" :options="list.diagAwal" :multiple="false"
                    :internal-search="true" :searchable="true" :close-on-select="true" :show-labels="false" label="nama"
                    track-by="kode" @remove="onRemove('diagAwal')" @select="onSelectDiagAwal"
                    placeholder="Masukkan kolom Diagnosa terlebih dahulu" size="sm" />
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="6" v-if="jenisKunjungan != kunjungans.igd">
                  <s-input groupClass="mb-0" v-model="fields.noSurat" :item="{
                    label: 'No. Surat Kontrol',
                    id: 'noSurat',
                    data: 'noSurat',
                    type: 'text',
                    validation: jenisKunjungan == kunjungans.ranap ? ['required'] : [],
                  }" :valuee="fields.noSurat" :disabled="modeSubmit == modes.edit" />
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="12" class="d-flex flex-row">
                  <div class="mr-8 w-50">
                    <s-input v-model="fields.lakaLantas" :key="'lakaLantas'" :id="'lakaLantas'" :item="{
                      label: 'Laka Lantas',
                      id: 'lakaLantas',
                      data: 'lakaLantas',
                      type: 'lookup-radio',
                      validation: [],
                      pointer: {
                        label: 'label',
                        code: 'code',
                        list: list.lakaLantas,
                        display: ['label']
                      },
                    }" :valuee="fields.lakaLantas" />
                  </div>
                  <div v-if="fields.lakaLantas == '1' || fields.lakaLantas == '2'">
                    <s-input groupClass="mb-0" v-model="fields.tglKejadian" :item="{
                      label: 'Tanggal Kejadian Kecelakaan',
                      id: 'tglKejadian',
                      data: 'tglKejadian',
                      type: 'date',
                      validation: [],
                      placeholder: 'Masukkan jika perlu'
                    }" />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-3" v-if="fields.lakaLantas == '1' || fields.lakaLantas == '2'">
                <b-col cols="4">
                  <label for="kdPropinsi">Provinsi</label>
                  
                  <multiselect id="kdPropinsi" v-model="filters.kdPropinsi" :options="list.kdPropinsi" :multiple="false"
                    :searchable="true" :close-on-select="true" :show-labels="false" label="nama" track-by="kode"
                    placeholder="Pilih Provinsi" @select="onSelectPropinsi" @remove="onRemove('kdPropinsi')" />
                </b-col>
                <b-col cols="4">
                  <label for="kdKabupaten">Kabupaten</label>
                  <multiselect id="kdKabupaten" v-model="filters.kdKabupaten" :options="list.kdKabupaten"
                    :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama"
                    track-by="kode" placeholder="Pilih Kabupaten" @select="onSelectKabupaten"
                    @remove="onRemove('kdKabupaten')" />
                </b-col>
                <b-col cols="4">
                  <label for="kdKecamatan">Kecamatan</label>
                  <multiselect id="kdKecamatan" v-model="filters.kdKecamatan" :options="list.kdKecamatan"
                    :multiple="false" :searchable="true" :close-on-select="true" :show-labels="false" label="nama"
                    track-by="kode" placeholder="Pilih Kecamatan" @select="onSelectKecamatan"
                    @remove="onRemove('kdKecamatan')" />
                </b-col>
              </b-row>
              <b-row class="mt-3" v-if="fields.lakaLantas == '1' || fields.lakaLantas == '2'">
                <b-col cols="12">
                  <s-input v-model="fields.keterangan" :key="'keterangan'" :id="'keterangan'" :item="{
                    label: 'Keterangan Laka Lantas',
                    id: 'keterangan',
                    data: 'keterangan',
                    type: 'textarea',
                    validation: [],
                    placeholder: 'Berikan keterangan bila perlu',
                    rows: 1
                  }" :valuee="fields.keterangan" />
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col v-if="jenisKunjungan == kunjungans.ranap" cols="3">

                  <s-input v-model="fields.klsRawatNaik" :key="'klsRawatNaik'" :id="'klsRawatNaik'" :item="{
                    label: 'Kelas Rawat Naik',
                    id: 'klsRawatNaik',
                    data: 'klsRawatNaik',
                    type: 'lookup-radio',
                    validation: [],
                    api: 'bpjs/vclaim/refrensi/getKelasRawatBypassUri',
                    pointer: {
                      label: 'nama',
                      code: 'kode',
                      display: ['kode', 'nama'],
                      headerDisplay: ['Kode', 'Nama'],
                    },
                  }" />
                </b-col>
                <b-col cols="5">
                  <s-input v-model="fields.assesmentPel" :key="'assesmentPel'" :id="'assesmentPel'" :item="{
                    label: 'Assesment Pelayanan',
                    id: 'assesmentPel',
                    data: 'assesmentPel',
                    type: 'lookup-radio',
                    validation: [],
                    pointer: {
                      label: 'label',
                      code: 'code',
                      list: list.assesmentPel,
                      display: ['label']
                    },
                  }" :valuee="fields.assesmentPel" :disabled="fields.tujuanKunj == '1'" />
                </b-col>
              </b-row>
              <b-row v-if="modeSubmit == modes.add" class="mt-3">
                <b-col cols="4">
                  <s-input v-model="fields.flagProcedure" :key="'flagProcedure'" :id="'flagProcedure'" :item="{
                    label: 'Flag Prosedur',
                    id: 'flagProcedure',
                    data: 'flagProcedure',
                    type: 'lookup-radio',
                    validation: [],
                    pointer: {
                      label: 'label',
                      code: 'code',
                      list: list.flagProcedure,
                      display: ['label']
                    },
                  }" :valuee="fields.flagProcedure" :disabled="fields.tujuanKunj == '0'" />
                </b-col>
                <b-col cols="4">
                  <s-input v-model="fields.kdPenunjang" :key="'kdPenunjang'" :id="'kdPenunjang'" :item="{
                    label: 'Penunjang',
                    id: 'kdPenunjang',
                    data: 'kdPenunjang',
                    type: 'lookup-radio',
                    validation: [],
                    pointer: {
                      label: 'label',
                      code: 'code',
                      list: list.kdPenunjang,
                      display: ['label']
                    },
                  }" :valuee="fields.kdPenunjang" :disabled="fields.tujuanKunj == '0'" />
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="4">
                  <s-input groupClass="mb-0" v-model="fields.pembiayaan" v-if="jenisKunjungan == kunjungans.ranap && fields.klsRawatNaik" :item="{
                    label: 'Pembiayaan',
                    id: 'pembiayaan',
                    data: 'pembiayaan',
                    type: 'lookup-radio',
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: list.pembiayaan
                    },
                    validation: [''],
                  }" :valuee="''" @input="fields.pembiayaan == '1' ? fields.penanggungJawab = 'Pribadi' : fields.penanggungJawab = ''" />
                </b-col>
                <b-col cols="4">
                  <s-input groupClass="mb-0" v-model="fields.penanggungJawab" v-if="jenisKunjungan == kunjungans.ranap && fields.klsRawatNaik" :item="{
                    label: 'Penanggung Jawab',
                    id: 'penanggungJawab',
                    data: 'penanggungJawab',
                    type: 'text',
                    validation: [''],
                  }" :valuee="''" />
                </b-col>
                <b-col cols="12">

                  <s-input v-model="fields.catatan" :key="'catatan'" :id="'catatan'" :item="{
                    label: 'Catatan',
                    id: 'catatan',
                    data: 'catatan',
                    type: 'textarea',
                    validation: [],
                    placeholder: 'Berikan catatan bila perlu',
                    rows: 2
                  }" :valuee="fields.catatan" />
                </b-col>

              </b-row>

              <!-- <b-row class="mt-3">
                <b-col cols="4" class="d-flex align-items-center justify-items-end">
                  <b-form-checkbox id="bypassInput" v-model="bypassInput" name="bypassInput" :unchecked-value="false"
                    :value="true">
                    Bypass (Dev)
                  </b-form-checkbox>
                </b-col>
              </b-row> -->
              <b-row class="mt-3">
                <b-col cols="12" class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center justify-content-between">
                    <b-button v-if="modeSubmit == modes.edit" block sizes="lg" variant="danger"
                      @click.prevent="deleteSEP2" class="mt-0 text-nowrap">Hapus
                      SEP</b-button>
                  </div>
                  <div class="d-flex align-items-center">
                    <b-button v-if="selected.sep.noSep" block sizes="lg" variant="success" class="ml-2 mt-0 text-nowrap"
                      @click="cetakSep('cetak-sep')">
                      <span>Cetak</span>
                    </b-button>
                    <b-button block sizes="lg" variant="primary" type="submit" class="ml-2 mt-0 text-nowrap">
                      <span v-if="modeSubmit == modes.add">Simpan Data</span>
                      <span v-else>Perbarui</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </form>
          </ValidationObserver>
        </b-col>
      </b-row>
    </b-modal>
    <div v-if="selected.sep && selected.sep.peserta" id="cetak-sep" class="content-print hidden" style="display: none;">

      <!-- <table class="custom-table">
        <tr style="border-bottom: 1px solid #000">
          <td align="center">
            <img src="/static/img/logo/baubau.png" alt="Logo" style="max-height: 60px;" />
          </td>
          <td align="center">
            <span class="text-center" style="display: flex; flex-direction: column; align-items: center;">
              <h1 style="margin-bottom: 0; font-weight: 700; font-size: 25px;">RUMAH SAKIT UMUM DAERAH BUTON SELATAN</h1>
              <p style="margin-bottom: 0; margin-top: 10px">Jl. Gajah mada kec.batauga kab.buton selatan</p>
              <p style="margin-bottom: 0; margin-top: 10px">Tlp. 085257769540</p>
            </span>
          </td>
          <td align="center">
            <img src="https://madania.co.id/wp-content/uploads/2023/08/photo.jpg" alt="Logo" style="max-height: 60px;" />
          </td>
        </tr>
      </table>

      <hr>

      <div class="w-100" style="margin-top: 5mm;position: relative;">
        <h6 style="font-size: 14pt;text-align: center;"><strong>SURAT ELEGIBILITAS PESERTA (SEP)</strong></h6>
      </div> -->

      <table class="custom-table mb-3" style="margin-bottom: 1rem;">
        <tr>
          <td align="left" style="width: 258px">
            <img src="/static/logo-bpjs.png" alt="Logo" style="max-height: 60px;" />
          </td>
          <td align="left">
            <span class="text-left" style="display: flex; flex-direction: column; align-items: left;">
              <p style="margin-bottom: 0; margin-top: 10px">SURAT ELEGIBILITAS PESERTA</p>
              <p style="margin-bottom: 0; margin-top: 10px">RSUD KAB. BUTON SELATAN</p>
            </span>
          </td>
        </tr>
      </table>

      <div class="w-100-flex">
        <div style="width: 60%;">
          <table class="custom-table">
            <tbody>
              <tr>
                <td style="width: 35mm;">No. SEP</td>
                <td style="width: 2.5mm;">:</td>
                <td><span>{{ selected.sep.noSep }}</span></td>
              </tr>

              <tr>
                <td>Tgl. SEP</td>
                <td>:</td>
                <td><span>{{ formatTranslatedDate(selected.sep.tglSep) }}</span></td>
              </tr>

              <tr>
                <td>No Kartu</td>
                <td>:</td>
                <td><span>{{ selected.sep.peserta.noKartu }}</span></td>
              </tr>

              <tr>
                <td>Nama Peserta</td>
                <td>:</td>
                <td><span>{{ selected.sep.peserta.nama }}</span></td>
              </tr>

              <tr>
                <td>Tgl Lahir</td>
                <td>:</td>
                <td><span>{{ formatTranslatedDate(selected.sep.peserta.tglLahir) }}</span></td>
              </tr>

              <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td><span>{{ selected.sep.peserta.kelamin }}</span></td>
              </tr>

              <tr>
                <td>Poli Tujuan</td>
                <td>:</td>
                <td><span>{{ selected.sep.poli }}</span></td>
              </tr>

              <tr>
                <td>Asal Faskes Tk. I</td>
                <td>:</td>
                <td><span>-</span></td>
              </tr>

              <tr>
                <td>Diagnosa Awal</td>
                <td>:</td>
                <td><span>{{ selected.sep.diagnosa }}</span></td>
              </tr>

              <tr>
                <td>Catatan</td>
                <td>:</td>
                <td><span>{{ selected.sep.catatan }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="width: 40%;display: flex;justify-content: center;align-items: center;">
          <table class="custom-table">
            <tbody>
              <tr>
                <td style="width: 35mm;">Peserta </td>
                <td style="width: 2.5mm;">:</td>
                <td><span>{{ selected.sep.peserta.jnsPeserta }}</span></td>
              </tr>

              <tr>
                <td>COB</td>
                <td>:</td>
                <td><span>{{ selected.sep.cob == '1' ? 'Ya' : 'Tidak' }}</span></td>
              </tr>

              <tr>
                <td>Jenis Rawat</td>
                <td>:</td>
                <td><span>{{ selected.sep.jnsPelayanan }}</span></td>
              </tr>

              <tr>
                <td>Kelas Rawat</td>
                <td>:</td>
                <td><span>{{ selected.sep.kelasRawat }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div class="w-100-flex">
        <div style="width: 65%;padding-right: 15mm;">
          <h6 style="font-size: 8pt;"><i>*Saya menyetujui BPJS Kesehatan menggunakan informasi Medis Pasien jika
              diperlukan</i></h6>
          <h6 style="font-size: 8pt;"><i>*SEP bukan sebagai bukti penjaminan peserta</i></h6>
        </div>
        <div style="width: 30%;display: flex;">
          <div style="width: 100%;padding: 0 2.5mm;">
            <h6>Pasien/Keluarga Pasien</h6>


            <div style="width: 100%;margin-top: 14mm;">______________</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import print from '../../components/print.js';
moment.locale('id')

export default {
  name: 'modalSEP',
  props: {
    no_asuransi_registrasi: {
      type: String,
      default: '',
    },
    modalSEP1: {
      type: Boolean,
      default: false,
    },
    modalSEP2: {
      type: Boolean,
      default: false,
    },
    pesertaProps: {
      type: Object,
      default: () => {
        return {}
      },
    },
    noSEP: {
      type: String,
      default: '',
    },
    jenisKunjungan: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      authUser: {},
      // bypassInput: false,
      kunjungans: {
        rajal: 'Rajal',
        ranap: 'Ranap',
        igd: 'IGD',
      },
      jenisPelayanan: '1',
      configAPI: {
        submit: 'sep/register',
        update: 'sep/update',
      },
      modes: {
        add: 'add',
        edit: 'edit',
      },
      modeSubmit: 'add',
      originalFields: {},
      fields: {
        noKartu: '', // no bpjs
        tglSep: '', // fixed hari ini
        ppkPelayanan: '0528R001', // RS Cokro 0146R021
        jnsPelayanan: '', // fixed dari props ranap 1, rajal 2
        klsRawatHak: '',
        klsRawatNaik: '',
        pembiayaan: '',
        penanggungJawab: '',
        noMR: '',
        asalRujukan: '2', // 1. Klinik / Puskesmas, 2. Rumah Sakit
        tglRujukan: '', // pick Tanggal Rujukan
        noRujukan: '', // fixed props No Rujukan
        ppkRujukan: '0528R001', // free text, default onSelectNoRujukan()
        catatan: '', // freetext
        diagAwal: '', // pick Diagnosa Awal
        tujuan: '', // pick Poliklinik
        eksekutif: '0',
        cob: '0', // 0 1 checklist
        katarak: '0', // 0 1 checklist
        lakaLantas: '0', // 0 1 2 3 pick Laka Lantas
        noLP: '',
        tglKejadian: '',
        keterangan: '',
        suplesi: '0',
        noSepSuplesi: '',
        kdPropinsi: '',
        kdKabupaten: '',
        kdKecamatan: '',
        tujuanKunj: '0', // 0 Normal, 1 Prosedur, 2 Konsul Dokter
        flagProcedure: '',
        kdPenunjang: '',
        assesmentPel: '',
        noSurat: '', // rujuk awal kosong, kontrol isi
        kodeDPJP: '', // pick DPJP
        dpjpLayan: '000002', // (2) samakan dengan kodeDPJP?
        noTelp: '', // props peserta
        user: 'Coba Ws',
        registrasi_id: '',
        noSep: '',
      },
      disabled: {
        pasien_id: false,
      },
      dateDefault: {
        startRefTglMulai: moment(new Date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endRefTglMulai: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      },
      dateToday: this.formatYMD(new Date),
      selected: {
        peserta: {
          noKartu: "",
          nik: "",
          nama: "",
          pisa: "",
          sex: "",
          mr: {
            noMR: null,
            noTelepon: null
          },
          tglLahir: "",
          tglCetakKartu: "",
          tglTAT: "",
          tglTMT: "",
          statusPeserta: {
            kode: "",
            keterangan: ""
          },
          provUmum: {
            kdProvider: null,
            nmProvider: null
          },
          jenisPeserta: {
            kode: "",
            keterangan: ""
          },
          hakKelas: {
            kode: "",
            keterangan: ""
          },
          umur: {
            umurSekarang: "",
            umurSaatPelayanan: ""
          },
          informasi: {
            dinsos: null,
            prolanisPRB: null,
            noSKTM: null,
            eSEP: null
          },
          cob: {
            noAsuransi: null,
            nmAsuransi: null,
            tglTMT: null,
            tglTAT: null
          }
        },
        rujukan: {
          asalFaskes: '',
          rujukan: {
            diagnosa: {
              kode: '',
              nama: '',
            },
            provPerujuk: {
              kode: '',
              nama: '',
            },
            peserta: {}
          }
        },
        sep: {}
      },
      list: {
        rujukan: [],
        dokter: [],
        dokterDPJP: [],
        diagAwal: [],
        diagnosaProgramPRB: [],
        tindakan: [],
        poli: [],
        faskes: [],
        kelasRawat: [],
        kdPropinsi: [],
        kdKabupaten: [],
        kdKecamatan: [],
        historiPelayanan: [],
        asalRujukan: [
          { code: '1', label: 'Klinik / Puskesmas' },
          { code: '2', label: 'Rumah Sakit' },
        ],
        tujuanKunj: [
          { code: '0', label: 'Normal' },
          { code: '1', label: 'Prosedur' },
          { code: '2', label: 'Konsul Dokter' },
        ],
        // diagAwal: [],
        lakaLantas: [
          { code: '0', label: 'BKLL (Bukan kecelakaan lalu lintas)' },
          { code: '1', label: 'KLL dan bukan kecelakaan kerja' },
          { code: '2', label: 'KLL dan KK' },
          { code: '3', label: 'KK (kecelakaan kerja)' }
        ],
        tujuan: [],
        ppkRujukan: [],
        ppkPelayanan: [],
        assesmentPel: [
          { code: '1', label: 'Poliklinik tidak tersedia pada hari sebelumnya' },
          { code: '2', label: 'Jam Poli telah berakhir pada hari sebelumnya' },
          { code: '3', label: 'Dokter Spesialis yang dimaksud tidak praktek pada hari sebelumnya' },
          { code: '4', label: 'Atas Instruksi RS' },
          { code: '5', label: 'Tujuan Kontrol' },
        ],
        pembiayaan: [
          { code: '1', label: 'Pribadi' },
          { code: '2', label: 'Pemberi Kerja' },
          { code: '3', label: 'Asuransi Kesehatan Tambahan' },
        ],
        kdPenunjang: [
          { code: '1', label: 'Radioterapi' },
          { code: '2', label: 'Kemoterapi' },
          { code: '3', label: 'Rehabilitasi Medik' },
          { code: '4', label: 'Rehabilitasi Psikososial' },
          { code: '5', label: 'Transfusi Darah' },
          { code: '6', label: 'Pelayanan Gigi' },
          { code: '7', label: 'Laboratorium' },
          { code: '8', label: 'USG' },
          { code: '9', label: 'Farmasi' },
          { code: '10', label: 'Lain - Lain' },
          { code: '11', label: 'MRI' },
          { code: '12', label: 'HEMODIALISA' },
        ],
        tipeKartu: [
          { text: 'BPJS', value: '1' },
          { text: 'NIK', value: '2' },
        ],
        flagProcedure: [
          { code: '0', label: 'Prosedur Tidak Berkelanjutan' },
          { code: '1', label: 'Prosedur dan Terapi Berkelanjutan' },
        ],
        klsRawatNaik: []
      },
      modalSEPFields: {
        no_asuransi_registrasi: '',
        tgl_pelayanan: '',
        tipeKartu: '1',
      },
      tipe_rujukan: {
        pcare: 'PCARE',
        rs: 'RS',
      },
      referensiParam: {
        kode: '',
        jenisFaskes: '',
        jenisPelayanan: '',
        tglPelayanan: '',
        namaObat: '',
        namaDokter: '',
        kodePropinsi: '',
        kodeKabupaten: '',
        kodeKecamatan: '',
        tglMulai: moment(new Date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
        tglAkhir: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      },
      currentModeProfile: 1,
      modeProfile: {
        profil: 1,
        riwayat: 2,
      },
      modalShowSEP1: false,
      modalShowSEP2: false,
      filters: {
        param: {
          kodeDPJP: '',
          tujuan: '',
          diagAwal: '',
          ppkRujukan: '',
          ppkPelayanan: '0146R021',
          kdPropinsi: '',
          kdKabupaten: '',
          kdKecamatan: '',
          klsRawatNaik: '',
        },
        tujuan: [],
        kodeDPJP: [],
        diagAwal: [],
        ppkRujukan: [],
        ppkPelayanan: [],
        kdPropinsi: [],
        kdKabupaten: [],
        kdKecamatan: [],
        klsRawatNaik: [],
      },
      createdSEP: {},
      isLoadingSubmit: false,
      infoData: {
        historiPelayanan: '',
      }
    }
  },
  beforeMount() {
  },
  methods: {
    formatYMD(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    formatTranslatedDate(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    switchProfileMode() {
      if (this.currentModeProfile === 'Profil') {
        this.currentModeProfile = 'Riwayat'
        this.modeProfile[0].variant = 'outline-info'
      } else {
        this.currentModeProfile = 'Profil'
        this.modeProfile[0].variant = 'info'
      }
    },
    resetForm() {
      this.modeSubmit = this.modes.add
      this.fields.flagProcedure = ''
      this.fields.kdPenunjang = ''
      this.fields.assesmentPel = ''
      // this.fields.kodeDPJP = ''
      // this.fields.tujuan = ''
      // this.fields.asalRujukan = '1'
      // this.fields.lakaLantas = '0'
      // this.fields.tujuanKunj = '0'
      // this.fields.cob = '0'
      // this.fields.katarak = '0'
      // this.fields.eksekutif = '0'
      // this.fields.suplesi = '0'
      // this.fields.noSepSuplesi = ''
      this.noSurat = ''

      this.filters.tujuan = []
      this.filters.kodeDPJP = []
      this.filters.param.tujuan = ''
      this.filters.param.kodeDPJP = ''

      this.filters.kdPropinsi = []
      this.filters.kdKabupaten = []
      this.filters.kdKecamatan = []
      this.filters.param.kdPropinsi = ''
      this.filters.param.kdKabupaten = ''
      this.filters.param.kdKecamatan = ''

      this.fields = {
        noKartu: '', // no bpjs
        tglSep: '', // fixed hari ini
        ppkPelayanan: '0146R021',
        jnsPelayanan: '', // fixed dari props ranap 1, rajal 2
        klsRawatHak: '',
        klsRawatNaik: '',
        pembiayaan: '',
        penanggungJawab: '',
        noMR: '', // (2) Dapat dari mana?
        asalRujukan: '2', // 1. Klinik / Puskesmas, 2. Rumah Sakit
        tglRujukan: '', // pick Tanggal Rujukan
        noRujukan: '', // fixed props No Rujukan
        ppkRujukan: '', // free text, default onSelectNoRujukan()
        catatan: '', // freetext
        diagAwal: '', // pick Diagnosa Awal
        tujuan: '', // pick Poliklinik
        eksekutif: '0',
        cob: '0', // 0 1 checklist
        katarak: '0', // 0 1 checklist
        lakaLantas: '0', // 0 1 2 3 pick Laka Lantas
        noLP: '',
        tglKejadian: '',
        keterangan: '',
        suplesi: '0',
        noSepSuplesi: '',
        kdPropinsi: '',
        kdKabupaten: '',
        kdKecamatan: '',
        tujuanKunj: '0', // 0 Normal, 1 Prosedur, 2 Konsul Dokter
        flagProcedure: '',
        kdPenunjang: '',
        assesmentPel: '',
        noSurat: '', // (2) kosong?
        kodeDPJP: '', // pick DPJP
        dpjpLayan: '', // (2) samakan dengan kodeDPJP?
        noTelp: '', // props peserta
        user: 'Coba Ws',
        registrasi_id: '',
        noSep: '',
      }
    },
    submitForm() {
      if (this.isLoadingSubmit) return
      this.isLoadingSubmit = true

      let param = JSON.parse(JSON.stringify(this.fields))

      this.fields.flagProcedure = this.fields.tujuanKunj == '0' ? '' : this.fields.flagProcedure
      param.flagProcedure = this.fields.tujuanKunj == '0' ? '' : this.fields.flagProcedure
      param.ppkPelayanan = '0528R001' // 0528R001 RScokro: 0146R021
      param.dpjpLayan = param.kodeDPJP
      param.diagAwal = this.filters.diagAwal.kode
      param.user = this.authUser.username

      if (this.jenisKunjungan === this.kunjungans.ranap) {
        param.tujuan = ""
        param.dpjpLayan = ""
        param.ppkRujukan = "0528R001"
        // param.klsRawatHak = this.selected.rujukan.rujukan.peserta.hakKelas.kode
        param.klsRawatHak = this.selected.peserta.hakKelas.kode
        param.klsRawatNaik = param.klsRawatNaik ? param.klsRawatNaik : ''
        param.pembiayaan = '1'
        param.penanggungJawab = 'Pribadi'
      } else if (this.jenisKunjungan === this.kunjungans.igd) {
        param.ppkRujukan = '0528R001'
        param.noRujukan = ''
        param.noSurat = ''
        param.ppkPelayanan = '0528R001'
        // param.tglRujukan = ''
        param.jnsPelayanan = '2'
      }
      else {
        param.klsRawatNaik = ""
      }

      param.assesmentPel = param.assesmentPel === null ? '' : param.assesmentPel

      console.log(param, 'param submitForm');

      let createOrUpdate = this.modeSubmit === this.modes.add ? 'DIBUAT' : 'DIPERBARUI'

      this.$_alert.confirm('Simpan Data', `Data registrasi SEP akan ${createOrUpdate}, ingin melanjutkan?`).then((res) => {
        if (res.isConfirmed) {
          if (res.value && this.modeSubmit === this.modes.add) {
            delete param.id
            delete param.noSep
            this.$_api.post(this.configAPI.submit, param).then((res) => {
              console.log(res, 'createdSEP');
              if (res.status === 200) {
                // this.resetForm()
                this.createdSEP = res.data[0]
                this.$emit('createdSEP', res.data[0])
                this.$_alert.success('Berhasil', 'SEP berhasil dibuat')
              } else {
                console.log(res, 'res createdSEP gagal');
                this.$_alert.error(res, 'Registrasi SEP Gagal', res.message)
              }
            }).catch((err) => {
              console.log(err, 'err createdSEP gagal');
              this.$_alert.error(err, err.message)
            }).finally(() => {
              this.isLoadingSubmit = false
            })
          } else if (res.value && this.modeSubmit === this.modes.edit) {
            this.$_api.post(this.configAPI.update, param).then((res) => {
              if (res.status === 200) {
                this.$emit('createdSEP', res.data[0])
                this.$_alert.success('Berhasil', res.message)
              } else {
                this.$_alert.error(res, 'Perbaruan SEP Gagal', res.message)
              }
            }).catch((err) => {
              this.$_alert.error(err, err.message)
              this.$_alert.error(err, 'Gagal', err.message)
            }).finally(() => {
              this.isLoadingSubmit = false
            })
          }
        } else {
          this.isLoadingSubmit = false
        }
      }).then(() => {
        this.getDataHistoriPelayananPeserta()
      }).finally(() => {
        this.isLoadingSubmit = false
      })
    },
    getPesertaByNoKartuModalSEP() {
      this.modalSEPFields.tipeKartu = this.noSEP ? '1' : this.modalSEPFields.tipeKartu
      let jenisKartu = ''
      jenisKartu = this.modalSEPFields.tipeKartu == '1' ? 'bpjs' : 'nik'

      this.fields.noKartu = this.modalSEPFields.tipeKartu == '1' ? this.modalSEPFields.no_asuransi_registrasi : this.pesertaProps.no_asuransi_registrasi

      let noKartu = this.modalSEPFields.no_asuransi_registrasi

      console.log(jenisKartu, 'jenisKartu');
      if (this.modalSEPFields.no_asuransi_registrasi) {
        this.$_api.post('bpjs/vclaim/peserta/getPesertaByNoKartu', {
          noKartu: noKartu,
          jenis: jenisKartu
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.selected.peserta = res.data[0].peserta
            if (res.data[0].peserta.statusPeserta.keterangan == 'AKTIF') {
              this.fields.noMR = this.pesertaProps.no_rm
              this.fields.noTelp = this.pesertaProps.no_hp_registrasi
              this.getRujukanBerdasarkanNomorKartuMultiModalSEP()
            } else {
              this.getRujukanBerdasarkanNomorKartuMultiModalSEP()
              this.$_alert.success(res.message)
            }
          } else {
            this.$_alert.success(res.message)
          }
        }).catch((err) => {
          this.$_alert.error(err, 'Gagal', err.message)
        })
      }
    },
    getRujukanBerdasarkanNomorKartuMultiModalSEP() {
      this.$_api.post('bpjs/vclaim/rujukan/getRujukanBerdasarkanNomorKartuMulti', {
        noKartu: this.modalSEPFields.no_asuransi_registrasi,
        tipe: this.tipe_rujukan.pcare
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.list.rujukan.rujukanModalSEP = res.data[0].rujukan
          if(!this.fields.tglRujukan && res.data[0].rujukan && res.data[0].rujukan.length > 0){
            this.fields.tglRujukan = res.data[0].rujukan[0].tglKunjungan
          }
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
      })
    },
    onSelectNoRujukan(data) {
      let no_rujukan = this.fields.noRujukan
      if (data) no_rujukan = data

      this.$_api.post('bpjs/vclaim/rujukan/getRujukanByNoRujukan', {
        noRujukan: no_rujukan,
        tipe: this.tipe_rujukan.pcare
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.selected.rujukan = res.data[0]
          // this.fields.tglRujukan = res.data[0].rujukan.tglKunjungan // tglRujukan bukan dari sini
          this.fields.ppkRujukan = res.data[0].rujukan.provPerujuk.kode

          this.fields.diagAwal = res.data[0].rujukan.diagnosa.kode
          this.filters.diagAwal = res.data[0].rujukan.diagnosa
          this.filters.param.diagAwal = res.data[0].rujukan.diagnosa.kode

          if (this.jenisKunjungan === this.kunjungans.ranap) {
            this.fields.klsRawatHak = res.data[0].rujukan.peserta.hakKelas.kode
          }
        }
      }).catch((err) => {
        this.$_alert.error(err, 'Gagal', err.message)
      })
    },
    openModalSEP() {
      if (!this.noSEP) {
        this.$emit('openModalSEP', 'modal-SEP1')
        this.$bvModal.show('modal-SEP1')
        this.$bvModal.hide('modal-SEP2')
      }
    },
    openModalSEP2() {
      this.$bvModal.hide('modal-SEP1')
      this.$bvModal.show('modal-SEP2')
      this.$emit('openModalSEP', 'modal-SEP2')
    },
    getReferensiDiagnosa() {
      if (this.filters.param.diagAwal.length > 2) {
        this.$_api.post('bpjs/vclaim/refrensi/getDiagnosa', {
          kode: this.filters.param.diagAwal,
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.list.diagAwal = res.data
          } else {
            this.list.diagAwal = []
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getReferensiPoli(data) {
      if (data.length > 2) {
        this.$_api.post('bpjs/vclaim/refrensi/getPoli', {
          kode: data,
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.list.tujuan = res.data
          } else {
            this.list.tujuan = []
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getReferensiDokterDPJP(data) {
      let jenisPelayanan = this.fields.jnsPelayanan
      // if (this.bypassInput) {
      //   jenisPelayanan = '1'
      // }
      if (data.length > 2) {
        this.$_api.post('bpjs/vclaim/refrensi/getDokterDPJP', {
          jenisPelayanan: jenisPelayanan,
          tglPelayanan: this.formatYMD(this.fields.tglSep),
          kode: data,
        }).then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            this.list.dokterDPJP = res.data
          } else {
            this.list.dokterDPJP = []
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getReferensiDokter(data) {
      this.$_api.post('bpjs/vclaim/refrensi/getDokter', {
        namaDokter: data,
      }).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.list.dokter = res.data[0].list
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // getSelectedFilter(kode, kdList) {
    //   console.log(kode, kdList, 'getSelectedFilter');
    //   let selected = kdList.filter((item) => {
    //     if (item.kode === kode) {
    //       return item
    //     }
    //   })
    //   return selected[0]
    // },
    getReferensiKlsRawatNaik() {
      this.$_api.post('bpjs/vclaim/refrensi/getKelasRawat').then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.list.klsRawatNaik = res.data
        } else {
          this.list.klsRawatNaik = []
          this.$_alert.error(res, 'Gagal mengambil referensi kelas rawat', res.message)
        }
      }).catch((err) => {
        console.log(err)
        this.list.klsRawatNaik = []
        this.$_alert.error(err, 'Gagal mengambil referensi kelas rawat', err.message)
      })
    },
    getReferensiPropinsi() {
      this.list.kdPropinsi = []
      this.list.kdKabupaten = []
      this.list.kdKecamatan = []

      this.$_api.post('bpjs/vclaim/refrensi/getPropinsi').then((res) => {
        console.log(res, 'res getReferensiPropinsi');
        if (res.status === 200 && res.data.length > 0) {
          this.list.kdPropinsi = res.data
          // this.filters.kdPropinsi = this.getSelectedFilter(this.fields.kdPropinsi, res.data)
          // this.filters.param.kdPropinsi = this.filters.kdPropinsi.kode
        } else {
          this.list.kdPropinsi = []
        }
      }).catch((err) => {
        console.log(err)
        this.list.kdPropinsi = []
      })
    },
    getReferensiKabupaten() {
      this.fields.kdKabupaten = ''
      this.fields.kdKecamatan = ''
      this.list.kdKabupaten = []
      this.list.kdKecamatan = []
      this.filters.param.kdKabupaten = ''
      this.filters.param.kdKecamatan = ''
      this.filters.kdKabupaten = []
      this.filters.kdKecamatan = []

      if (this.fields.kdPropinsi.length > 0) {
        this.$_api.post('bpjs/vclaim/refrensi/getKabupaten', {
          kodePropinsi: this.fields.kdPropinsi,
        }).then((res) => {
          console.log(res, 'res getKabupaten');
          if (res.status === 200 && res.data.length > 0) {
            console.log(res.data, 'res.data getKabupaten');
            this.list.kdKabupaten = res.data
            // this.filters.kdKabupaten = this.getSelectedFilter(this.fields.kdKabupaten, res.data)
            // this.filters.param.kdKabupaten = this.filters.kdKabupaten.kode
          } else {
            this.list.kdKabupaten = []
          }
        }).catch((err) => {
          console.log(err)
          this.list.kdKabupaten = []
        })
      }
    },
    getReferensiKecamatan() {
      this.fields.kdKecamatan = ''
      if (this.fields.kdKabupaten.length > 0) {
        this.$_api.post('bpjs/vclaim/refrensi/getKecamatan', {
          kodeKabupaten: this.fields.kdKabupaten,
        }).then((res) => {
          console.log(res, 'res getKecamatan');
          if (res.status === 200 && res.data.length > 0) {
            this.list.kdKecamatan = res.data
            // this.filters.kdKecamatan = this.getSelectedFilter(this.fields.kdKecamatan, res.data)
            // this.filters.param.kdKecamatan = this.filters.kdKecamatan.kode
          } else {
            this.list.kdKecamatan = []
          }
        }).catch((err) => {
          console.log(err)
          this.list.kdKecamatan = []
        })
      }
    },
    getDataHistoriPelayananPeserta() {
      this.$_api.post('bpjs/vclaim/monitoring/getDataHistoriPelayananPeserta', {
        noKartuPeserta: this.selected.peserta.noKartu,
        tglMulai: this.formatYMD(this.referensiParam.tglMulai),
        tglAkhir: this.formatYMD(this.referensiParam.tglAkhir),
      }).then((res) => {
        // this.fields.noKartu = this.modalSEPFields.no_asuransi_registrasi
        if (res.status === 200 && res.data.length > 0) {
          this.list.historiPelayanan = res.data
        } else {
          this.list.historiPelayanan = []
          this.infoData.historiPelayanan = res.message
        }
      }).catch((err) => {
        console.log(err);
        // this.$_alert.error(err, 'Gagal', err.message)
      })
    },
    onSelectDokterDPJP(selected) {
      this.filters.param.kodeDPJP = selected.kode
      this.filters.kodeDPJP = selected
      this.fields.kodeDPJP = selected.kode
    },
    onSelectDiagAwal(selected) {
      this.filters.param.diagAwal = selected.kode
      this.filters.diagAwal = selected
      this.fields.diagAwal = selected.kode
    },
    onSelectPoliklinik(selected) {
      console.log('onSelectPoliklinik', selected)
      this.filters.param.tujuan = selected.kode
      this.filters.tujuan = selected
      this.fields.tujuan = selected.kode
    },
    onSelectPropinsi(selected) {
      this.filters.kdPropinsi = selected
      this.fields.kdPropinsi = selected.kode
      this.getReferensiKabupaten()
    },
    onSelectKabupaten(selected) {
      this.filters.kdKabupaten = selected
      this.fields.kdKabupaten = selected.kode
      this.getReferensiKecamatan()
    },
    onSelectKecamatan(selected) {
      this.filters.kdKecamatan = selected
      this.fields.kdKecamatan = selected.kode
    },
    onRemove(variableName) {
      this.filters[variableName] = [];
      this.filters.param[variableName] = '';
      this.fields[variableName] = '';
    },
    getCariSep() {
      this.$_api.post('bpjs/vclaim/sep/getCariSep', {
        noSep: this.noSEP,
      }).then((res) => {
        console.log('================================================================')
        if (res.status === 200 && res.data.length > 0) {
          let data = res.data[0]
          this.selected.sep = data

          this.fields.tglSep = data.tglSep
          this.fields.noRujukan = data.noRujukan
          this.fields.catatan = data.catatan

          // this.fields.klsRawatHak = data.klsRawat
          // this.fields.diagAwal = data.diagnosa
          // this.fields.tujuan = data.poli

          // data.poli isinya cuma ada nama polinya
          console.log('mahok1')
          this.$_api.post('bpjs/vclaim/refrensi/getPoli', {
            kode: data.poli,
          }).then((res) => {
            console.log('mahok')
            if (res.data.length > 0) this.onSelectPoliklinik(res.data[0])
          });

          // data.diagnosa isinya cuma ada nama diagnosanya => harus cari code nya
          this.$_api.post('bpjs/vclaim/refrensi/getDiagnosa', {
            kode: data.diagnosa
          }).then((res) => {
            if (res.data.length > 0) this.onSelectDiagAwal(res.data[0])
          });

          // Finding lokasi kejadian
          const lok = data.lokasiKejadian
          const prop = lok.kdProp || ''
          const kab = lok.kdKab || ''
          const kec = lok.kdKec || ''
          // this.fields.kdPropinsi = prop
          // this.fields.kdKabupaten = kab
          // this.fields.kdKecamatan = kec
          // Selecting propinsiiiiiiiiiiiiiiiiiiiiiiiiiii
          let dataProvinsi = this.list.kdPropinsi.filter(m => m.kode === prop)
          if(dataProvinsi.length > 0) this.onSelectPropinsi(dataProvinsi[0])
          
          this.$_api.post('bpjs/vclaim/refrensi/getKabupaten', {
            kodePropinsi: prop,
          }).then((res) => {
            let findData = res.data.filter(m => m.kode === kab)
            if(findData.length > 0) this.onSelectKabupaten(findData[0])
          })

          this.$_api.post('bpjs/vclaim/refrensi/getKecamatan', {
            kodeKabupaten: kab,
          }).then((res) => {
            let findData = res.data.filter(m => m.kode === kec)
            if(findData.length > 0) this.onSelectKecamatan(findData[0])
          });
          
          this.fields.eksekutif = data.poliEksekutif
          this.fields.cob = data.cob
          this.fields.katarak = data.katarak
          this.fields.lakaLantas = data.kdStatusKecelakaan

          this.fields.tglKejadian = data.lokasiKejadian.tglKejadian ? data.lokasiKejadian.tglKejadian : ''
          this.fields.keterangan = data.lokasiKejadian.ketKejadian ? data.lokasiKejadian.ketKejadian : ''
          // this.fields.kdPropinsi = data.lokasiKejadian.kdProp ? data.lokasiKejadian.kdProp : ''
          // this.fields.kdKabupaten = data.lokasiKejadian.kdKab ? data.lokasiKejadian.kdKab : ''
          // this.fields.kdKecamatan = data.lokasiKejadian.kdKec ? data.lokasiKejadian.kdKec : ''

          this.fields.tujuanKunj = data.tujuanKunj.kode
          this.fields.flagProcedure = data.flagProcedure.kode

          this.fields.kdPenunjang = data.kdPenunjang.kode
          this.fields.assesmentPel = data.assesmentPel.kode
          this.fields.noSurat = data.kontrol.noSurat

          if (this.jenisKunjungan === this.kunjungans.ranap) {
            this.fields.klsRawatHak = data.klsRawat
            this.fields.kodeDPJP = data.kontrol.kdDokter
            this.filters.param.kodeDPJP = data.kontrol.kdDokter
            this.filters.kodeDPJP = {
              kode: data.kontrol.kdDokter,
              nama: data.kontrol.nmDokter,
            }

          } else {
            this.fields.kodeDPJP = data.dpjp.kdDPJP
            this.filters.param.kodeDPJP = data.dpjp.kdDPJP
            this.filters.kodeDPJP = {
              kode: data.dpjp.kdDPJP,
              nama: data.dpjp.nmDPJP,
            }
          }

          this.filters.param.tujuan = data.poli
        } else {
          // this.$_alert.error(res, 'Gagal', `No SEP: ${res.message}`)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getSepLastRequest() {
      console.log('getSepLastRequest', this.fields.registrasi_id)
      if(!this.fields.registrasi_id) {
        this.$_alert.error('Registrasi ID tidak ditemukan. (getSepLastRequest)')
        return
      }

      this.$_api.post('sep/detailsByRegistrasiId', { registrasi_id: this.fields.registrasi_id }).then(res => {
        // console.log(res)
        if (res.data.length) {
          const data = res.data[0]
          const tglRujukan = data.request && data.request.tglRujukan ? data.request.tglRujukan : ''

          if (tglRujukan === '') this.$alert.error('Tanggal rujukan tidak ditemukan.')
          else {
            this.fields.tglRujukan = tglRujukan
            // alert(tglRujukan)
          }
        } else {
          this.$_alert.error('Request SEP tidak ditemukan. (getSepLastRequest)')
        }
      })
    },
    deleteSEP2() {
      this.$_alert.confirm('Hapus SEP', `Data registrasi SEP akan dihapus, ingin melanjutkan?`).then((res) => {
        if (res.value) {
          this.$_api.post('sep/delete', {
            noSep: this.noSEP,
            user: this.fields.user,
            registrasi_id: this.fields.registrasi_id
          }).then((res) => {
            if (res.status === 200) {
              this.resetForm()
              this.$_alert.success('Berhasil', res.message)
              this.$emit('deletedSEP', this.noSEP)
            } else {
              this.$_alert.error(res, 'Gagal', res.message)
            }
          }).catch((err) => {
            this.$_alert.error(err, 'Gagal', err.message)
          }).then(() => {
            this.$bvModal.hide('modal-SEP2')
          })
        }
      })
    },
    handleModalSEP(data) {
      console.log(data, 'handleModalSEP close');
      this.$emit('closeModalSEP', data.componentId)
    },
    getAuthUser() {
      let authUser = JSON.parse(localStorage.getItem('profile'))

      if (authUser) {
        this.authUser = authUser
      }
    },
    resetSelected() {
      if (this.modalSEPFields.tipeKartu == this.list.tipeKartu[0].value) {
        this.modalSEPFields.no_asuransi_registrasi = this.pesertaProps.no_asuransi_registrasi
      } else {
        this.modalSEPFields.no_asuransi_registrasi = this.pesertaProps.no_identitas_registrasi
      }
    },
    handleCloseModalSEP1() {
      this.$bvModal.hide('modal-SEP1')
      this.modalSEPFields.tipeKartu = '1'
      this.selected.sep = {}
    },
    async cetakSep(el) {
      if (!this.selected.sep) {
        console.log(this.selected.sep)
        this.$_alert.error({}, 'Resep Obat tidak tersedia!')
        return
      }

      const options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          '/static/assets/cetak/cetak-sep.css',
        ],
        timeout: 100000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
      }

      // await this.$htmlToPaper(el, options)
      print(el, options);
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  watch: {
    modalSEP1: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        console.log(newValue, 'modalSEP1');
        if (newValue) {
          this.$bvModal.show('modal-SEP1')
          this.$bvModal.hide('modal-SEP2')
        }
      },
    },
    modalSEP2: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          if (this.$route.name == 'IGD' || this.$route.name == 'Rawat Inap' ) this.fields.asalRujukan = '2'

          this.fields.ppkRujukan = '0528R001'
          this.getPesertaByNoKartuModalSEP()
          console.log(newValue, 'modalSEP2asdadasdsad');
          this.getDataHistoriPelayananPeserta()
          this.getReferensiKlsRawatNaik()

          if (this.noSEP) {
            this.getCariSep()
          }

          this.getSepLastRequest()

          this.$bvModal.show('modal-SEP2')
          this.$bvModal.hide('modal-SEP1')
          // this.getReferensi()
        }
      },
    },
    'modalSEPFields.tgl_pelayanan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.referensiParam.tglPelayanan = moment(newValue).format('YYYY-MM-DD')
        }
      },
    },
    currentModeProfile: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue === this.modeProfile.riwayat) {
            this.getDataHistoriPelayananPeserta()
          }
        }
      },
    },
    'pesertaProps': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.modalSEPFields.no_asuransi_registrasi = newValue.no_asuransi_registrasi
          this.fields.registrasi_id = newValue.id
          this.fields.noKartu = newValue.no_asuransi_registrasi
          // this.fields.penanggungJawab = newValue.nama_penanggung
        }
      },
    },
    'pesertaProps.no_rujukan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.fields.noRujukan = newValue
          this.onSelectNoRujukan(newValue)
        }
      },
    },
    'jenisKunjungan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue == this.kunjungans.ranap) {
          this.jenisPelayanan = 1
          this.fields.jnsPelayanan = '1'
        } else {
          this.jenisPelayanan = 2
          this.fields.jnsPelayanan = '2'
        }
      },
    },
    'noSEP': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.getCariSep()
          this.fields.noSep = newValue
          this.modeSubmit = this.modes.edit
        } else {
          this.resetForm()
          this.modeSubmit = this.modes.add
        }
      },
    },
    'fields': {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.tujuanKunj == '0') {
          this.fields.kdPenunjang = ''
          this.fields.flagProcedure = ''
        }

        if (val.tujuanKunj == '1') {
          this.fields.assesmentPel = ''
        }
      },
    },
    'fields.jnsPelayanan': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (!newValue && this.jenisKunjungan) {
          this.fields.registrasi_id = this.pesertaProps.id
          this.fields.noRujukan = this.pesertaProps.no_rujukan
          // this.fields.tglRujukan = this.selected.rujukan.rujukan.tglKunjungan // tglRujukan bukan dari sini
          this.fields.ppkRujukan = this.selected.rujukan.rujukan.provPerujuk.kode
        }

        if (this.jenisKunjungan == this.kunjungans.ranap) {
          this.fields.jnsPelayanan = '1'
        } else {
          this.fields.jnsPelayanan = '2'
        }
      },
    },
    'selected.peserta.nik': {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (!newValue) {
          this.getPesertaByNoKartuModalSEP()
        }
      },
    },
    // 'modalSEPFields.tipeKartu': {
    //   deep: true,
    //   immediate: true,
    //   handler(val) {
    //     this.modalSEPFields.no_asuransi_registrasi = val == '1' ? this.pesertaProps.no_asuransi_registrasi : this.pesertaProps.no_identitas_registrasi
    //   },
    // },
  },
  mounted() {
    this.getReferensiPropinsi()
    this.getAuthUser()
  },
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
