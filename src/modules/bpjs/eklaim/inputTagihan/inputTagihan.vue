<template>
  <div class="w-100">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <b-card class="" header-tag="header">
            <template #header>
              <b-row class="d-flex align-items-center">
                <b-col>
                  <div class="d-flex justify-content-between align-items-end">
                    <h3 class="mb-0">
                      <strong>Eklaim</strong>
                    </h3>
                    <b-button 
                      sizes="lg" 
                      :variant="setStatus.color" 
                      class="mt-0 ml-3 text-nowrap"
                    >{{setStatus.message}}</b-button>
                  </div>
                </b-col>
              </b-row>
            </template>
            <div>
              <b-row style="row-gap: 10px;">
                <b-col cols="12">
                  <b-button 
                    block 
                    sizes="lg" 
                    variant="primary" 
                    class="mt-0 text-nowrap"
                    v-b-modal.modal-tagihan-eklaim 
                  >Pilih Tagihan</b-button>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataTagihan.no_rm" class="mb-0" :item="{
                    label: 'No RM',
                    id: 'no_rm',
                    data: 'no_rm',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataTagihan.no_rm" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataTagihan.nama_tagihan" class="mb-0" :item="{
                    label: 'Pasien',
                    id: 'nama_tagihan',
                    data: 'nama_tagihan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataTagihan.nama_tagihan" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataTagihan.nama_jenis_layanan" class="mb-0" :item="{
                    label: 'Jenis Layanan',
                    id: 'nama_jenis_layanan',
                    data: 'nama_jenis_layanan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataTagihan.nama_jenis_layanan" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataTagihan.nama_asuransi" class="mb-0" :item="{
                    label: 'Asuransi',
                    id: 'nama_asuransi',
                    data: 'nama_asuransi',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataTagihan.nama_asuransi" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataTagihan.nama_tgl_tagihan" class="mb-0" :item="{
                    label: 'Tanggal Tagihan',
                    id: 'nama_tgl_tagihan',
                    data: 'nama_tgl_tagihan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataTagihan.nama_tgl_tagihan" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataTagihan.total_tagihan" class="mb-0" :item="{
                    label: 'Total Tagihan',
                    id: 'total_tagihan',
                    data: 'total_tagihan',
                    type: 'text',
                    validation: [''],
                  }" :valuee="dataTagihan.total_tagihan" :disabled="true"></s-input>
                </b-col>
              </b-row>
              <hr class="mt-5 mb-5">
              <b-row style="row-gap: 10px;">
                <b-col cols="3">
                  <s-input v-model="dataEklaim.jenis_rawat" :key="'jenis_rawat'" :id="'jenis_rawat'" :item="{
                    label: 'Jenis Rawat',
                    id: 'jenis_rawat',
                    data: 'jenis_rawat',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.jenis_rawat,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: listJenisRawat
                    },
                    param: {},
                  }" :valuee="dataEklaim.jenis_rawat" />
                </b-col>
               <!-- dataEklaim.dokter {{dataEklaim.dokter}} || dr. Sitti Wahidah, M.Kes, Sp.S -->
                <b-col cols="3">
                  <label for="dokter">Dokter <span class="text-danger">*</span></label>
                  <multiselect
                    id="dokter"
                    v-model="dataEklaim.dokter"
                    :options="listDokter"
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="nama_dokter"
                    placeholder="-- Pilih Dokter --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.nomor_kartu" class="mb-0" :item="{
                    label: 'No Kartu',
                    id: 'nomor_kartu',
                    data: 'nomor_kartu',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataEklaim.nomor_kartu" :disabled="true"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.nomor_sep" class="mb-0" :item="{
                    label: 'No SEP',
                    id: 'nomor_sep',
                    data: 'nomor_sep',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataEklaim.nomor_sep" :disabled="true"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.tgl_masuk" class="mb-0" :item="{
                    id: 'tgl_masuk',
                    show: true,
                    class: '', attr: null,
                    value: null,
                    label: 'Tanggal Masuk',
                    placeholder: 'Isikan tanggal masuk',
                    type: 'datetime',
                    formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                    validation: ['required']
                  }" :valuee="dataEklaim.tgl_masuk" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.tgl_pulang" class="mb-0" :item="{
                    id: 'tgl_pulang',
                    show: true,
                    class: '', attr: null,
                    value: null,
                    label: 'Tanggal Pulang',
                    placeholder: 'Isikan tanggal pulang',
                    type: 'datetime',
                    formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                    validation: ['required'],
                  }" :valuee="dataEklaim.tgl_pulang" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.cara_masuk" :key="'cara_masuk'" :id="'cara_masuk'" :item="{
                    label: 'Cara Masuk',
                    id: 'cara_masuk',
                    data: 'cara_masuk',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.cara_masuk,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Rujukan FKTP', code: 'gp' },
                        { label: 'Rujukan FKRTL', code: 'hosp-trans' },
                        { label: 'Rujukan Spesialis', code: 'mp' },
                        { label: 'Dari Rawat Jalan', code: 'outp' },
                        { label: 'Dari Rawat Inap', code: 'inp' },
                        { label: 'Dari Rawat Darurat', code: 'emd' },
                        { label: 'Lahir di RS', code: 'born' },
                        { label: 'Rujukan Panti Jompo', code: 'nursing' },
                        { label: 'Rujukan dari RS Jiwa', code: 'psych' },
                        { label: 'Rujukan Fasilitas Rehab', code: 'rehab' },
                        { label: 'Lain-lain', code: 'other' },
                      ]
                    },
                    param: {},
                  }" :valuee="dataEklaim.cara_masuk" />
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.discharge_status" :key="'discharge_status'" :id="'discharge_status'" :item="{
                    label: 'Cara Pulang',
                    id: 'discharge_status',
                    data: 'discharge_status',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.discharge_status,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Atas persetujuan dokter', code: '1' },
                        { label: 'Dirujuk', code: '2' },
                        { label: 'Atas permintaan sendiri', code: '3' },
                        { label: 'Meninggal', code: '4' },
                        { label: 'Lain-lain', code: '5' },
                      ]
                    },
                    param: {},
                  }" :valuee="dataEklaim.discharge_status" />
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.kelas_rawat" :key="'kelas_rawat'" :id="'kelas_rawat'" :item="{
                    label: 'Kelas Rawat',
                    id: 'kelas_rawat',
                    data: 'kelas_rawat',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.kelas_rawat,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: listKelasRawat,
                    },
                    param: {},
                  }" :valuee="dataEklaim.kelas_rawat" />
                </b-col>
                <b-col cols="3">
                  <!-- <s-input v-model="dataEklaim.birth_weight" class="mb-0" :item="{
                    label: 'Berat Lahir (gr)',
                    id: 'birth_weight',
                    data: 'birth_weight',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataEklaim.birth_weight" :disabled="false"></s-input> -->
                  <s-input v-model="dataEklaim.birth_weight" :item="{
                    label: 'Berat Lahir (gr)',
                    id: 'birth_weight',
                    data: 'birth_weight',
                    type: 'number',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.birth_weight" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.adl_sub_acute" class="mb-0" :item="{
                    label: 'ADL Sub Acute',
                    id: 'adl_sub_acute',
                    data: 'adl_sub_acute',
                    type: 'number',
                    validation: ['required'],
                  }" :valuee="dataEklaim.adl_sub_acute" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.adl_chronic" class="mb-0" :item="{
                    label: 'ADL Chronic',
                    id: 'adl_chronic',
                    data: 'adl_chronic',
                    type: 'number',
                    validation: ['required'],
                  }" :valuee="dataEklaim.adl_chronic" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.kode_tarif" :key="'kode_tarif'" :id="'kode_tarif'" :item="{
                    label: 'Jenis Tarif',
                    id: 'kode_tarif',
                    data: 'kode_tarif',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.kode_tarif,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: listTarif,
                    },
                    param: {},
                  }" :valuee="dataEklaim.kode_tarif" />
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.dializer_single_use" :key="'dializer_single_use'" :id="'dializer_single_use'" :item="{
                    label: 'Dializer Single Use',
                    id: 'dializer_single_use',
                    data: 'dializer_single_use',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.dializer_single_use,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Single Use', code: '1' },
                        { label: 'Multiple Use', code: '0' },
                      ]
                    },
                    param: {},
                  }" :valuee="dataEklaim.dializer_single_use" />
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.kantong_darah" :item="{
                    label: 'Kantong Darah	',
                    id: 'kantong_darah',
                    data: 'kantong_darah',
                    type: 'number',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.kantong_darah" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3">
                  <s-input v-model="dataEklaim.tarif_poli_eks" :item="{
                    label: 'Tarif Poli EKS	',
                    id: 'tarif_poli_eks',
                    data: 'tarif_poli_eks',
                    type: 'number',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_poli_eks" :disabled="false"></s-input>
                </b-col>
                <b-col cols="12"><hr class="mx-0 my-2"></b-col>
                <b-col cols="12" class="d-flex">
                  <b-form-checkbox
                    class="align-self-center font-weight-bold"
                    id="icu_indikator"
                    v-model="dataEklaim.icu_indikator"
                    name="icu_indikator"
                    value="1"
                    unchecked-value="0"
                  >
                    Ada rawat intensif (ICU)
                  </b-form-checkbox>
                </b-col>
                <b-col :cols="dataEklaim.ventilator.use_ind == '1' ? '2' : '12'" v-if="dataEklaim.icu_indikator == '1'" class="">
                  <b-form-checkbox
                    id="use_ind"
                    v-model="dataEklaim.ventilator.use_ind"
                    name="use_ind"
                    value="1"
                    unchecked-value="0"
                  >
                    Ventilator
                  </b-form-checkbox>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.icu_indikator == '1' && dataEklaim.ventilator.use_ind == '1'">
                  <s-input v-model="dataEklaim.ventilator.start_dttm" class="mb-0" :item="{
                    id: 'start_dttm',
                    show: true,
                    class: '', attr: null,
                    value: null,
                    label: 'Tanggal Mulai',
                    placeholder: 'Isikan tanggal mulai',
                    type: 'datetime',
                    formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                    validation: ['required']
                  }" :valuee="dataEklaim.ventilator.start_dttm" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.icu_indikator == '1' && dataEklaim.ventilator.use_ind == '1'">
                  <s-input v-model="dataEklaim.ventilator.stop_dttm" class="mb-0" :item="{
                    id: 'stop_dttm',
                    show: true,
                    class: '', attr: null,
                    value: null,
                    label: 'Tanggal Selesai',
                    placeholder: 'Isikan tanggal selesai',
                    type: 'datetime',
                    formatDateView: 'DD MMMM YYYY, HH:mm:ss',
                    validation: ['required']
                  }" :valuee="dataEklaim.ventilator.stop_dttm" :disabled="false"></s-input>
                </b-col>
                <b-col cols="2" v-if="dataEklaim.icu_indikator == '1' && dataEklaim.ventilator.use_ind == '1'">
                  <s-input v-model="dataEklaim.ventilator_hour" class="mb-0" :item="{
                    label: 'Ventilator Hour (jam)',
                    id: 'ventilator_hour',
                    data: 'ventilator_hour',
                    type: 'number',
                    validation: ['required'],
                  }" :valuee="dataEklaim.ventilator_hour" :disabled="true"></s-input>
                </b-col>
                <b-col cols="2" v-if="dataEklaim.icu_indikator == '1' && dataEklaim.ventilator.use_ind == '1'">
                  <s-input v-model="dataEklaim.icu_los" class="mb-0" :item="{
                    label: 'ICU LOS (hari)',
                    id: 'icu_los',
                    data: 'icu_los',
                    type: 'number',
                    validation: ['required'],
                  }" :valuee="dataEklaim.icu_los" :disabled="true"></s-input>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.icu_indikator == '1'" class="d-flex">
                  <b-form-checkbox
                    class="align-self-end mb-3"
                    id="icu_tekanan_negatif"
                    v-model="dataEklaim.episode.icu_tekanan_negatif"
                    name="icu_tekanan_negatif"
                    value="1"
                    unchecked-value="0"
                    @change="dataEklaim.episode.icu_tekanan_negatif_hari = dataEklaim.episode.icu_tekanan_negatif == '0' ? 0 : 1"
                  >
                    ICU tekanan negatif dengan ventilator
                  </b-form-checkbox>
                </b-col>
                <b-col cols="1" v-if="dataEklaim.icu_indikator == '1'">
                  <s-input v-model="dataEklaim.episode.icu_tekanan_negatif_hari" class="mb-0" :item="{
                    label: 'Hari',
                    id: 'icu_tekanan_negatif_hari',
                    data: 'icu_tekanan_negatif_hari',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataEklaim.episode.icu_tekanan_negatif_hari" :disabled="dataEklaim.episode.icu_tekanan_negatif == '0'"></s-input>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.icu_indikator == '1'" class="d-flex">
                  <b-form-checkbox
                    class="align-self-end mb-3"
                    id="icu_tanpa_tekanan_negatif"
                    v-model="dataEklaim.episode.icu_tanpa_tekanan_negatif"
                    name="icu_tanpa_tekanan_negatif"
                    value="1"
                    unchecked-value="0"
                    @change="dataEklaim.episode.icu_tanpa_tekanan_negatif_hari = dataEklaim.episode.icu_tanpa_tekanan_negatif == '0' ? 0 : 1"
                  >
                    ICU tanpa tekanan negatif
                  </b-form-checkbox>
                </b-col>
                <b-col cols="1" v-if="dataEklaim.icu_indikator == '1'">
                  <s-input v-model="dataEklaim.episode.icu_tanpa_tekanan_negatif_hari" class="mb-0" :item="{
                    label: 'Hari',
                    id: 'icu_tanpa_tekanan_negatif_hari',
                    data: 'icu_tanpa_tekanan_negatif_hari',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataEklaim.episode.icu_tanpa_tekanan_negatif_hari" :disabled="dataEklaim.episode.icu_tanpa_tekanan_negatif == '0'"></s-input>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.icu_indikator == '1'" class="d-flex">
                  <b-form-checkbox
                    class="align-self-end mb-3"
                    id="isolasi_tekanan_negatif"
                    v-model="dataEklaim.episode.isolasi_tekanan_negatif"
                    name="isolasi_tekanan_negatif"
                    value="1"
                    unchecked-value="0"
                    @change="dataEklaim.episode.isolasi_tekanan_negatif_hari = dataEklaim.episode.isolasi_tekanan_negatif == '0' ? 0 : 1"
                  >
                    Isolasi tekanan negatif
                  </b-form-checkbox>
                </b-col>
                <b-col cols="1" v-if="dataEklaim.icu_indikator == '1'">
                  <s-input v-model="dataEklaim.episode.isolasi_tekanan_negatif_hari" class="mb-0" :item="{
                    label: 'Hari',
                    id: 'isolasi_tekanan_negatif_hari',
                    data: 'isolasi_tekanan_negatif_hari',
                    type: 'text',
                    validation: ['required'],
                  }" :valuee="dataEklaim.episode.isolasi_tekanan_negatif_hari" :disabled="dataEklaim.episode.isolasi_tekanan_negatif == '0'"></s-input>
                </b-col>
                <b-col cols="12"><hr class="mx-0 my-2"></b-col>
                <b-col cols="12" class="d-flex">
                  <b-form-checkbox
                    class="align-self-center font-weight-bold"
                    id="upgrade_class_ind"
                    v-model="dataEklaim.upgrade_class_ind"
                    name="upgrade_class_ind"
                    value="1"
                    unchecked-value="0"
                  >
                    Upgrade kelas
                  </b-form-checkbox>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.upgrade_class_ind == '1'">
                  <s-input v-model="dataEklaim.upgrade_class_class" :key="'upgrade_class_class'" :id="'upgrade_class_class'" :item="{
                    label: 'Upgrade Ke kelas',
                    id: 'upgrade_class_class',
                    data: 'upgrade_class_class',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.upgrade_class_class,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Kelas 1', code: 'kelas_1' },
                        { label: 'Kelas 2', code: 'kelas_2' },
                        { label: 'VIP', code: 'vip' },
                        { label: 'VVIP', code: 'vvip' },
                      ]
                    },
                    param: {},
                  }" :valuee="dataEklaim.upgrade_class_class" />
                </b-col>
                <b-col cols="3" v-if="dataEklaim.upgrade_class_ind == '1'">
                  <s-input v-model="dataEklaim.upgrade_class_los" :item="{
                    label: 'Lama Upgrade Kelas	',
                    id: 'upgrade_class_los',
                    data: 'upgrade_class_los',
                    type: 'number',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.upgrade_class_los" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.upgrade_class_ind == '1'">
                  <s-input v-model="dataEklaim.add_payment_pct" :item="{
                    label: 'Tambahan Biaya Upgrade Kelas	',
                    id: 'add_payment_pct',
                    data: 'add_payment_pct',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.add_payment_pct" :disabled="false"></s-input>
                </b-col>
                <b-col cols="3" v-if="dataEklaim.upgrade_class_ind == '1'">
                  <s-input v-model="dataEklaim.upgrade_class_payor" :key="'upgrade_class_payor'" :id="'upgrade_class_payor'" :item="{
                    label: 'Upgrade Kelas Payor',
                    id: 'upgrade_class_payor',
                    data: 'upgrade_class_payor',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: dataEklaim.upgrade_class_payor,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Peserta', code: 'peserta' },
                        { label: 'Pemberi Kerja', code: 'pemberi_kerja' },
                        { label: 'Asuransi Tambahan', code: 'asuransi_tambahan' },
                      ]
                    },
                    param: {},
                  }" :valuee="dataEklaim.upgrade_class_payor" />
                </b-col>
              </b-row>
              <hr class="mt-5 mb-5">
              <b-row style="row-gap: 10px;">
                <b-col cols="12">
                  <h3 class="mb-0">
                    <strong>Data Tagihan</strong>
                  </h3>
                </b-col>
                <b-col cols="12">
                  <s-input v-model="dataEklaim.x_tarif_rumah_sakit" class="mb-0" :item="{
                    label: 'Tarif Rumah Sakit',
                    id: 'x_tarif_rumah_sakit',
                    data: 'x_tarif_rumah_sakit',
                    type: 'money',
                    validation: [],
                  }" :valuee="dataEklaim.x_tarif_rumah_sakit" :disabled="true"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.prosedur_non_bedah" class="mb-0" :item="{
                    label: 'Prosedur Non Bedah',
                    id: 'prosedur_non_bedah',
                    data: 'prosedur_non_bedah',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.prosedur_non_bedah" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.prosedur_bedah" class="mb-0" :item="{
                    label: 'Prosedur Bedah	',
                    id: 'prosedur_bedah',
                    data: 'prosedur_bedah',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.prosedur_bedah" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.konsultasi" class="mb-0" :item="{
                    label: 'Konsultasi',
                    id: 'konsultasi',
                    data: 'konsultasi',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.konsultasi" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.tenaga_ahli" class="mb-0" :item="{
                    label: 'Tenaga Ahli',
                    id: 'tenaga_ahli',
                    data: 'tenaga_ahli',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.tenaga_ahli" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.keperawatan" class="mb-0" :item="{
                    label: 'Keperawatan',
                    id: 'keperawatan',
                    data: 'keperawatan',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.keperawatan" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.penunjang" class="mb-0" :item="{
                    label: 'Penunjang',
                    id: 'penunjang',
                    data: 'penunjang',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.penunjang" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.radiologi" class="mb-0" :item="{
                    label: 'Radiologi',
                    id: 'radiologi',
                    data: 'radiologi',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.radiologi" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.laboratorium" class="mb-0" :item="{
                    label: 'Laboratorium',
                    id: 'laboratorium',
                    data: 'laboratorium',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.laboratorium" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.pelayanan_darah" class="mb-0" :item="{
                    label: 'Pelayanan Darah',
                    id: 'pelayanan_darah',
                    data: 'pelayanan_darah',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.pelayanan_darah" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.rehabilitasi" class="mb-0" :item="{
                    label: 'Rehabilitasi',
                    id: 'rehabilitasi',
                    data: 'rehabilitasi',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.rehabilitasi" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.kamar" class="mb-0" :item="{
                    label: 'Kamar / Akomodasi',
                    id: 'kamar',
                    data: 'kamar',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.kamar" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.rawat_intensif" class="mb-0" :item="{
                    label: 'Rawat Intensif	',
                    id: 'rawat_intensif',
                    data: 'rawat_intensif',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.rawat_intensif" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.obat" class="mb-0" :item="{
                    label: 'Obat',
                    id: 'obat',
                    data: 'obat',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.obat" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.obat_kronis" class="mb-0" :item="{
                    label: 'Obat Kronis',
                    id: 'obat_kronis',
                    data: 'obat_kronis',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.obat_kronis" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.obat_kemoterapi" class="mb-0" :item="{
                    label: 'Obat Kemoterapi',
                    id: 'obat_kemoterapi',
                    data: 'obat_kemoterapi',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.obat_kemoterapi" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.alkes" class="mb-0" :item="{
                    label: 'Alkes',
                    id: 'alkes',
                    data: 'alkes',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.alkes" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.bmhp" class="mb-0" :item="{
                    label: 'BMHP',
                    id: 'bmhp',
                    data: 'bmhp',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.bmhp" :disabled="false"></s-input>
                </b-col>
                <b-col cols="4">
                  <s-input v-model="dataEklaim.tarif_rs.sewa_alat" class="mb-0" :item="{
                    label: 'Sewa Alat	',
                    id: 'sewa_alat',
                    data: 'sewa_alat',
                    type: 'money',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.tarif_rs.sewa_alat" :disabled="false"></s-input>
                </b-col>
              </b-row>
              <hr class="mt-5 mb-5">
              <b-row style="row-gap: 10px;">
                <b-col cols="12">
                  <h3 class="mb-0">
                    <strong>Coding IDRG</strong>
                  </h3>
                </b-col>
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <label for="idrg_diagnosa">Diagnosa (ICD-10)</label>
                    <small class="text-danger d-flex align-items-end">* ketikkan kode</small>
                  </div>
                  <multiselect
                    id="idrg_diagnosa"
                    v-model="dataEklaim.idrg_diagnosa"
                    @search-change="getIdrgDiagnosa"
                    :options="listIdrgDiagnosa"
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="nama_diagnosa"
                    track-by="kode"
                    placeholder="-- Pilih Diagnosa --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <label for="idrg_prosedur">Prosedur (ICD-9-CM)</label>
                    <small class="text-danger d-flex align-items-end">* ketikkan kode</small>
                  </div>
                  <multiselect
                    id="idrg_prosedur"
                    v-model="dataEklaim.idrg_prosedur"
                    @search-change="getIdrgProsedur"
                    :options="listIdrgProsedur"
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="nama_prosedur"
                    track-by="kode"
                    placeholder="-- Pilih Prosedur --"
                    size="sm"
                  ></multiselect>
                </b-col>
              </b-row>
              <hr class="mt-5 mb-5">
              <b-row style="row-gap: 10px;">
                <b-col cols="12">
                  <h3 class="mb-0">
                    <strong>Coding UNU Grouper</strong>
                  </h3>
                </b-col>
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <label for="ms_diagnosa_id">Diagnosa (ICD-10)</label>
                    <small class="text-danger d-flex align-items-end">* ketikkan kode</small>
                  </div>
                  <multiselect
                    id="ms_diagnosa_id"
                    v-model="dataEklaim.x_diagnosa"
                    @search-change="getDiagnosa"
                    :options="listDiagnosa"
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="nama_diagnosa"
                    track-by="kode"
                    placeholder="-- Pilih Diagnosa --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <label for="ms_prosedur_id">Prosedur (ICD-9-CM)</label>
                    <small class="text-danger d-flex align-items-end">* ketikkan kode</small>
                  </div>
                  <multiselect
                    id="ms_prosedur_id"
                    v-model="dataEklaim.x_prosedur"
                    @search-change="getProsedur"
                    :options="listProsedur"
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="nama_prosedur"
                    track-by="kode"
                    placeholder="-- Pilih Prosedur --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <!-- <b-col cols="12">
                  <s-input groupClass="mb-0" v-model="dataEklaim.x_diagnosa" class="m-0" :item="{
                    label: 'Diagnosa (ICD-10)',
                    id: 'x_diagnosa',
                    data: 'x_diagnosa',
                    type: 'lookup-radio',
                    api: 'eklaim/search_diagnosisBypassUri',
                    getter: 'eklaim/search_diagnosisBypassUri',
                    setter: 'eklaim/search_diagnosisBypassUri',
                    validation: [''],
                    pointer: {
                      label: 'nama_jenis_layanan',
                      code: 'id',
                      display: ['nama_jenis_layanan'],
                      mainParam: 'nama_jenis_layanan'
                    },
                  }" />
                </b-col>
                <b-col cols="12">
                  <s-input groupClass="mb-0" v-model="dataEklaim.x_prosedur" class="m-0" :item="{
                    label: 'Prosedur (ICD-9-CM)',
                    id: 'x_prosedur',
                    data: 'x_prosedur',
                    type: 'lookup-radio',
                    api: 'msJenisLayanan',
                    getter: 'msJenisLayanan',
                    setter: 'msJenisLayanan',
                    return_object: true,
                    validation: [''],
                    pointer: {
                      label: 'nama_jenis_layanan',
                      code: 'id',
                      display: ['nama_jenis_layanan'],
                      mainParam: 'nama_jenis_layanan'
                    },
                  }" />
                </b-col>
                <b-col cols="12">
                  <b-button-group class="mr-3" v-for="(item, key) in dataEklaim.listProsedur" :key="key">
                    <b-button variant="info">{{item.nama_jenis_layanan}}</b-button>
                    <b-button variant="danger" @click="dataEklaim.listProsedur.splice(key, 1)"><i class="ml-1 ri-delete-bin-2-fill"></i></b-button>
                  </b-button-group>
                </b-col> -->
                <!-- dataEklaim.listProsedur
                {{dataEklaim.listProsedur}} -->
              </b-row>
              <hr class="mt-5 mb-5">
              <b-row style="row-gap: 10px;">
                <b-col cols="12">
                  <h3 class="mb-0">
                    <strong>Data Klinis</strong>
                  </h3>
                </b-col>
                <b-col cols="6">
                  <s-input v-model="dataEklaim.sistole" :item="{
                    label: 'Sistole	',
                    id: 'sistole',
                    data: 'sistole',
                    type: 'number',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.sistole" :disabled="false"></s-input>
                </b-col>
                <b-col cols="6">
                  <s-input v-model="dataEklaim.diastole" :item="{
                    label: 'Diastole	',
                    id: 'diastole',
                    data: 'diastole',
                    type: 'number',
                    validation: ['required', 'numeric'],
                  }" :valuee="dataEklaim.diastole" :disabled="false"></s-input>
                </b-col>
                <hr class="mt-5 mb-5">
              </b-row>
              <b-row class="mt-5">
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <b-button 
                        v-if="statusEklaim > 1 && statusEklaim < 6"
                        block 
                        sizes="lg" 
                        variant="danger" 
                        class="mt-0 text-nowrap"
                        @click="hapusEklaim()"
                      >Hapus Eklaim</b-button>
                    </div>
                    <div class="d-flex align-items-center">
                      <b-button 
                        v-if="statusEklaim == 1"
                        block 
                        sizes="lg" 
                        variant="primary" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="buatEklaim()"
                      >Simpan</b-button>
                      <b-button 
                        v-if="statusEklaim > 1 && statusEklaim < 5"
                        block 
                        sizes="lg" 
                        variant="warning" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="buatEklaim()"
                      >Update</b-button>
                      <b-button 
                        v-if="statusEklaim > 1 && statusEklaim < 5"
                        block 
                        sizes="lg" 
                        variant="success" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="kirimGrouper()"
                      >Grouper</b-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="statusEklaim != 1" style="row-gap: 10px;" class="align-items-center">
                <b-col cols="12"><hr class="mt-5 mb-5"></b-col>
              <!-- <b-row style="row-gap: 10px;" class=""> -->
                <b-col cols="12">
                  <h3 class="mb-0">
                    <strong>Hasil Grouper E-Klaim v5</strong>
                  </h3>
                </b-col>
                <b-col cols="3"><h6>Info</h6></b-col>
                <b-col cols="9">
                  {{`
                    ${$moment(dataEklaim.tgl_masuk).format('LLLL')}
                    ${dataEklaim.kelas_rawat ? ' - ' + findKey(listKelasRawat, dataEklaim.kelas_rawat, 'code').label : ''}
                    ${dataEklaim.kode_tarif ? ' - ' + findKey(listTarif, dataEklaim.kode_tarif, 'code').label : ''}
                  `}}
                </b-col>
                <!-- <b-col cols="9">INACBG @ 19 Des 2023 23:31 •• Kelas C •• Tarif : TARIF RS KELAS C PEMERINTAH</b-col> -->
                <b-col cols="3"><h6>Jenis Rawat	</h6> </b-col>
                <b-col cols="9">{{`${dataEklaim.jenis_rawat ? findKey(listJenisRawat, dataEklaim.jenis_rawat, 'code').label : ''}`}}</b-col>
                <!-- <b-col cols="9">Rawat Jalan Regular</b-col> -->
                <b-col cols="3"><h6>Group	</h6></b-col>
                <b-col cols="5">{{dataGrouper.group}}</b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">{{dataGrouper.codeGroup}}</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">{{dataGrouper.tarifGroup}}</b-col>
                  </b-row>
                </b-col>
                <b-col cols="3"><h6>Sub Acute	</h6></b-col>
                <b-col cols="5">{{dataGrouper.subAcute}}</b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">{{dataGrouper.codeSubAcute}}</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">{{dataGrouper.tarifSubAcute}}</b-col>
                  </b-row>
                </b-col>
                <b-col cols="3"><h6>Chronic	</h6></b-col>
                <b-col cols="5">{{dataGrouper.chronic}}</b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">{{dataGrouper.codeChronic}}</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">{{dataGrouper.tarifChronic}}</b-col>
                  </b-row>
                </b-col>
                <b-col cols="3"><h6 id="prosedure_grouper">Special Procedure</h6></b-col>
                <b-col cols="5">
                  <multiselect
                    id="prosedure_grouper"
                    v-model="dataGrouper.prosedure"
                    :options="listProcedurGouper"
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="name"
                    placeholder="-- Pilih Special Procedure --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">-</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">0</b-col>
                  </b-row>
                </b-col>
                <b-col cols="3"><h6 id="prothesis_grouper">Special Prosthesis</h6></b-col>
                <b-col cols="5">
                  <multiselect
                    id="prothesis_grouper"
                    v-model="dataGrouper.prosedure"
                    :options="listProsthesisGouper"
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="name"
                    placeholder="-- Pilih Special Prosthesis --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">-</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">0</b-col>
                  </b-row>
                </b-col>
                <b-col cols="3"><h6 id="investigation_grouper">Special Investigation</h6></b-col>
                <b-col cols="5">
                  <multiselect
                    id="investigation_grouper"
                    v-model="dataGrouper.prosedure"
                    :options="listInvestigationGouper"
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="name"
                    placeholder="-- Pilih Special Investigation --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">-</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">0</b-col>
                  </b-row>
                </b-col>
                <b-col cols="3"><h6>Special Drug</h6></b-col>
                <b-col cols="5">
                  <multiselect
                    id="investigation_grouper"
                    v-model="dataGrouper.prosedure"
                    :options="listSpecialDrugGrouper"
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    label="name"
                    placeholder="-- Pilih Special Investigation --"
                    size="sm"
                  ></multiselect>
                </b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap">
                    <b-col cols="5">-</b-col>
                    <b-col cols="2" class="text-right">Rp</b-col>
                    <b-col cols="5" class="text-right">0</b-col>
                  </b-row>
                </b-col>
                <b-col cols="8"><h6>debug</h6></b-col>
                <b-col cols="4">
                  <b-row class="flex-nowrap text-right">
                    <b-col cols="7">Total  Rp</b-col>
                    <!-- <b-col cols="2"></b-col> -->
                    <b-col cols="5">1,735,200</b-col>
                  </b-row>
                </b-col>
                <hr class="mt-5 mb-5">
              </b-row>
              <b-row v-if="statusEklaim != 1" class="mt-5">
                <b-col cols="12">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <b-button 
                        block 
                        sizes="lg" 
                        variant="primary" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="cetakEklaim()"
                      >Cetak Eklaim</b-button>
                      <b-button 
                        block 
                        sizes="lg" 
                        variant="success" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="kirimEklaim()"
                      >Kirim Eklaim</b-button>
                    </div>
                    <div class="d-flex align-items-center">
                      <b-button 
                        block 
                        sizes="lg" 
                        variant="primary" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="finalEklaim()"
                      >Final Eklaim</b-button>
                      <b-button 
                        block 
                        sizes="lg" 
                        variant="warning" 
                        class="mt-0 ml-3 text-nowrap"
                        @click="editUlang()"
                      >Edit Ulang</b-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <pre>{{ dataEklaim }}</pre>
    </b-container>
    <ModalTagihan @pilihTagihan="pilihTagihan"/>
  </div>
</template>

<script>
import ModalTagihan from './modalTagihan.vue'
export default {
  components: {
    ModalTagihan,
  },
  props: [
  ],
  data() {
    return {
      busy: false,
      statusEklaim: 0, // 0 = belum memilih, 1 = belum dibuat, 2 = sudah dibuat, 3 = grouper, 4 = final eklaim, 5 = kirim eklaim server
      listDiagnosa: [],
      listProsedur: [],
      listIdrgDiagnosa: [],
      listIdrgProsedur: [],
      listProsedurGrouper: [],
      listDokter: [],
      listTarif: [
        { label: 'TARIF RS KELAS A PEMERINTAH', code: 'AP' },
        { label: 'TARIF RS KELAS A SWASTA', code: 'AS' },
        { label: 'TARIF RS KELAS B PEMERINTAH', code: 'BP' },
        { label: 'TARIF RS KELAS B SWASTA', code: 'BS' },
        { label: 'TARIF RS KELAS C PEMERINTAH', code: 'CP' },
        { label: 'TARIF RS KELAS C SWASTA', code: 'CS' },
        { label: 'TARIF RS KELAS D PEMERINTAH', code: 'DP' },
        { label: 'TARIF RS KELAS D SWASTA', code: 'DS' },
        { label: 'TARIF RSUPN CIPTO MANGUNKUSUMO', code: 'RSCM' },
        { label: 'TARIF RSJPD HARAPAN KITA', code: 'RSJP' },
        { label: 'TARIF RS KANKER DHARMAIS', code: 'RSD' },
        { label: 'TARIF RSAB HARAPAN KITA', code: 'RSAB' },
      ],
      listKelasRawat: [
        { label: 'Kelas 1', code: '1' },
        { label: 'Kelas 2', code: '2' },
        { label: 'Kelas 3', code: '3' },
      ],
      listJenisRawat: [
        { label: 'Rawat Inap', code: '1' },
        { label: 'Rawat Jalan', code: '2' },
        { label: 'Rawat IGD', code: '3' },
      ],
      listProcedurGouper: [],
      listProsthesisGouper: [],
      listInvestigationGouper: [],
      listSpecialDrugGrouper: [],
      dataTagihan: {},
      dataEklaim: {
        dokter: null,
        episode: {
          icu_tekanan_negatif: false,
          icu_tekanan_negatif_hari: "0",
          icu_tanpa_tekanan_negatif: false,
          icu_tanpa_tekanan_negatif_hari: "0",
          isolasi_tekanan_negatif: false,
          isolasi_tekanan_negatif_hari: "0",
        },
        x_cara_bayar: '',
        x_no_peserta: '',
        nomor_kartu: '',
        nomor_sep: '',
        cob_cd: '',
        jenis_rawat: '2',
        x_kelas_ekslusif: '',
        x_kelas_hak: '',
        tgl_masuk: '', 
        tgl_pulang: '',
        x_umur: '',
        cara_masuk: 'other',
        icu_indikator: '0',
        icu_los: '',
        ventilator_hour: '',
        ventilator: {
          use_ind: '0',
          start_dttm: '', 
          stop_dttm: '',
        },
        kelas_rawat: '',
        birth_weight: '',
        x_adl_score: '',
        adl_sub_acute: '0',
        adl_chronic: '0',
        discharge_status: '5',
        x_dpjp: '',
        kode_tarif: '',
        x_pasien_tb: '',
        upgrade_class_ind: '0',
        upgrade_class_class: '',
        upgrade_class_los: '',
        upgrade_class_payor: '',
        add_payment_pct: '',
        dializer_single_use: '',
        kantong_darah: '',
        tarif_poli_eks: '',

        // tagihan
        x_tarif_rumah_sakit: '',
        tarif_rs: {
          prosedur_non_bedah: 0,
          prosedur_bedah: 0,
          konsultasi: 0,
          tenaga_ahli: 0,
          keperawatan: 0,
          penunjang: 0,
          radiologi: 0,
          laboratorium: 0,
          pelayanan_darah: 0,
          rehabilitasi: 0,
          kamar: 0,
          rawat_intensif: 0,
          obat: 0,
          obat_kronis: 0,
          obat_kemoterapi: 0,
          alkes: 0,
          bmhp: 0,
          sewa_alat: 0,
        },

        // grouper
        x_diagnosa: [],
        x_prosedur: [],
        listDiagnosa: [],
        listProsedur: [],

        // idrg
        idrg_diagnosa: [],
        idrg_prosedur: [],

        // klinis
        sistole: 0,
        diastole: 0,
      },
      dataGrouper: {
        info: '',
        jenis_rawat: '',
        group: '',
        codeGroup: '',
        tarifGroup: 0,
        subAcute: '',
        codeSubAcute: '',
        tarifSubAcute: 0,
        chronic: '',
        codeChronic: '',
        tarifChronic: 0,
        prosedure: [],
        prosthesis: [],
        investigation: [],
        drug: [],
      },
    }
  },
  computed: {
    setStatus(){
      const vm = this
      switch (vm.statusEklaim) {
        case 1:
          return { color: 'warning', message: 'Belum Dibuat' }
        case 2:
          return { color: 'success', message: 'Sudah Dibuat' }
        case 3:
          return { color: 'success', message: 'Grouper' }
        case 4:
          return { color: 'danger', message: 'Final Eklaim' }
        case 5:
          return { color: 'primary', message: 'Kirim Eklaim Ke Data Center' }
        default:
          return { color: 'warning', message: 'Belum Pilih Tagihan' }
      }
    }
  },
  watch: {
    'dataEklaim.x_prosedur'(newVal, oldVal){
      if(newVal && newVal != oldVal){
        // const vm = this
        // let status = true
        // for (let i = 0; i < vm.dataEklaim.listProsedur.length; i++) {
        //   const x = vm.dataEklaim.listProsedur[i];
        //   if(x.id == newVal.id){
        //     status = false
        //   }
        // }
        // if(status){
        //   vm.dataEklaim.listProsedur.push(newVal)
        // }
        // vm.dataEklaim.x_prosedur = ''
      }
    },
    'dataEklaim.ventilator.start_dttm'(newVal, oldVal){
      if(newVal != oldVal){
        const vm = this
        if(newVal){
          const selisihWaktu = vm.$moment(vm.dataEklaim.ventilator.stop_dttm).diff(vm.$moment(vm.dataEklaim.ventilator.start_dttm));
          const selisihJam = vm.$moment.duration(selisihWaktu).asHours();
          const selisihHari = vm.$moment.duration(selisihWaktu).asDays();
          vm.dataEklaim.icu_los = selisihHari
          vm.dataEklaim.ventilator_hour = selisihJam
        }else{
          vm.dataEklaim.ventilator.start_dttm = vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    'dataEklaim.ventilator.stop_dttm'(newVal, oldVal){
      if(newVal != oldVal){
        const vm = this
        if(newVal){
          const selisihWaktu = vm.$moment(vm.dataEklaim.ventilator.stop_dttm).diff(vm.$moment(vm.dataEklaim.ventilator.start_dttm));
          const selisihJam = vm.$moment.duration(selisihWaktu).asHours();
          const selisihHari = vm.$moment.duration(selisihWaktu).asDays();
          vm.dataEklaim.icu_los = selisihHari
          vm.dataEklaim.ventilator_hour = selisihJam
        }else{
          vm.dataEklaim.ventilator.start_dttm = vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    'dataEklaim.tarif_rs': {
      handler(data) {
        const vm = this
        vm.dataEklaim.x_tarif_rumah_sakit = 0
        for (const key in vm.dataEklaim.tarif_rs) {
          vm.dataEklaim.x_tarif_rumah_sakit += vm.dataEklaim.tarif_rs[key]
        }
      },
      deep: true
    },
    'dataGrouper': {
      handler() {
        const vm = this
        vm.kirimGrouper2()
      },
      deep: true
    },
  },
  async mounted() {
    const vm = this
    await vm.refresh()
    await vm.getData()
    await vm.getTagihan()
  },
  methods: {
    findKey(array, value, key) {
      return this.$findKey(array, value, key)
    },
    async getTagihan(){
      const vm = this
      vm.busy = false
      try {
        const res = await vm.$_api.post('tagihan/listTagihanBPJS', {tagihan_id: vm.$route.query.tagihan_id})
        if(res.status == 200 && res.data.length > 0){
          vm.pilihTagihan(res.data[0])
        }
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async pilihTagihan(data){
      const vm = this
      vm.busy = false
      try {
        vm.statusEklaim = 1
        vm.dataTagihan = data
        vm.getEklaim()
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async getDiagnosa(keyword){
      const vm = this
      vm.busy = false
      try {
        const res = await vm.$_api.post('inacbg/search_diagnosis', {
          keyword,
        })
        let listDiagnosa = []
        if(res.status == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const x = res.data[i];
            listDiagnosa.push({
              nama_diagnosa: `${x[1]} - ${x[0]}`,
              nama: x[0],
              kode: x[1],
            })
          }
        }
        vm.listDiagnosa = listDiagnosa
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async getIdrgDiagnosa(keyword){
      const vm = this
      vm.busy = false
      try {
        const res = await vm.$_api.post('inacbg/search_diagnosis', {
          keyword,
        })
        let listIdrgDiagnosa = []
        if(res.status == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const x = res.data[i];
            listIdrgDiagnosa.push({
              nama_diagnosa: `${x[1]} - ${x[0]}`,
              nama: x[0],
              kode: x[1],
            })
          }
        }
        vm.listIdrgDiagnosa = listIdrgDiagnosa
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async getIdrgProsedur(keyword){
      const vm = this
      vm.busy = false
      try {
        const res = await vm.$_api.post('inacbg/search_procedures', {
          keyword,
        })
        let listIdrgProsedur = []
        if(res.status == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const x = res.data[i];
            listIdrgProsedur.push({
              nama_prosedur: `${x[1]} - ${x[0]}`,
              nama: x[0],
              kode: x[1],
            })
          }
        }
        vm.listIdrgProsedur = listIdrgProsedur
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async getProsedur(keyword){
      const vm = this
      vm.busy = false
      try {
        const res = await vm.$_api.post('inacbg/search_procedures', {
          keyword,
        })
        let listProsedur = []
        if(res.status == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const x = res.data[i];
            listProsedur.push({
              nama_prosedur: `${x[1]} - ${x[0]}`,
              nama: x[0],
              kode: x[1],
            })
          }
        }
        vm.listProsedur = listProsedur
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async getProsedurGrouper(keyword){
      const vm = this
      vm.busy = false
      try {
        const res = await vm.$_api.post('inacbg/search_procedures_inagrouper', {
          keyword,
        })
        let listProsedurGrouper = []
        if(res.status == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const x = res.data[i];
            listProsedurGrouper.push({
              nama_prosedur: `${x[1]} - ${x[0]}`,
              nama: x[0],
              kode: x[1],
            })
          }
        }
        vm.listProsedurGrouper = listProsedurGrouper
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async getEklaim(){
      const vm = this
      vm.busy = false
      try {
        await vm.refresh()
        if(vm.dataTagihan.no_sep_tagihan){
          const res = await vm.$_api.post('historyEklaim/list', {
            nomor_sep: vm.dataTagihan.no_sep_tagihan,
          })
          if(res.status == 200){
            if(res.data.length > 0){
              vm.statusEklaim = 2
              vm.$_alert.success('Eklaim Tersedia')
              const data = res.data[0].request_eklaim.data
              vm.dataEklaim = {
                dokter: null,
                episode: {
                  icu_tekanan_negatif: false,
                  icu_tekanan_negatif_hari: "0",
                  icu_tanpa_tekanan_negatif: false,
                  icu_tanpa_tekanan_negatif_hari: "0",
                  isolasi_tekanan_negatif: false,
                  isolasi_tekanan_negatif_hari: "0",
                },
                x_cara_bayar: '',
                x_no_peserta: '',
                nomor_kartu: data.nomor_kartu,
                nomor_sep: data.nomor_sep,
                cob_cd: data.cob_cd,
                jenis_rawat: data.jenis_rawat,
                x_kelas_ekslusif: data.x_kelas_ekslusif,
                x_kelas_hak: data.x_kelas_hak,
                tgl_masuk: vm.$moment(data.tgl_masuk).format('YYYY-MM-DD HH:mm:ss'),
                tgl_pulang: vm.$moment(data.tgl_pulang).format('YYYY-MM-DD HH:mm:ss'),
                x_umur: data.x_umur,
                cara_masuk: data.cara_masuk,
                icu_indikator: data.icu_indikator,
                icu_los: data.icu_los,
                ventilator_hour: data.ventilator_hour,
                ventilator: {
                  use_ind: data.ventilator.use_ind,
                  start_dttm: vm.$moment(data.ventilator.start_dttm).format('YYYY-MM-DD HH:mm:ss'), 
                  stop_dttm: vm.$moment(data.ventilator.stop_dttm).format('YYYY-MM-DD HH:mm:ss'),
                },
                kelas_rawat: data.kelas_rawat,
                birth_weight: data.birth_weight,
                x_adl_score: data.x_adl_score,
                adl_sub_acute: data.adl_sub_acute,
                adl_chronic: data.adl_chronic,
                discharge_status: data.discharge_status,
                x_dpjp: data.x_dpjp,
                kode_tarif: data.kode_tarif,
                x_pasien_tb: data.x_pasien_tb,
                upgrade_class_ind: data.upgrade_class_ind,
                upgrade_class_class: data.upgrade_class_class,
                upgrade_class_los: data.upgrade_class_los,
                upgrade_class_payor: data.upgrade_class_payor,
                add_payment_pct: data.add_payment_pct,
                dializer_single_use: data.dializer_single_use,
                kantong_darah: data.kantong_darah,
                tarif_poli_eks: data.tarif_poli_eks,
  
                // tagihan
                x_tarif_rumah_sakit: '',
                tarif_rs: data.tarif_rs, //object
  
                // grouper
                x_diagnosa: [],
                x_prosedur: [],
                listDiagnosa: [],
                listProsedur: [],

                // idrg
                idrg_diagnosa: [],
                idrg_prosedur: [],

                // klinis
                sistole: data.sistole,
                diastole: data.diastole,
              }
              //episode
              const episode = data.episodes.split(/[;#]/)
              vm.dataEklaim.episode = {
                icu_tekanan_negatif: episode[0] == 7 ? true : false,
                icu_tekanan_negatif_hari: episode[1],
                icu_tanpa_tekanan_negatif: episode[2] == 9 ? true : false,
                icu_tanpa_tekanan_negatif_hari: episode[3],
                isolasi_tekanan_negatif: episode[4] == 11 ? true : false,
                isolasi_tekanan_negatif_hari: episode[5],
              }
              const resEklaim = await vm.$_api.post('eklaim/get_claim_data', {
                nomor_sep: vm.dataEklaim.nomor_sep,
              })
              if(resEklaim.status == 200 ){
                //diagnosa
                const diagnosa = resEklaim.respon_eklaim.response.data.diagnosa.split('#')
                for (let i = 0; i < diagnosa.length; i++) {
                  const x = diagnosa[i];
                  const res = await vm.$_api.post('eklaim/search_diagnosis', {keyword: x})
                  if(res.status == 200) {
                    for (let u = 0; u < res.data.length; u++) {
                      const y = res.data[u];
                      if(y[1] == x){
                        vm.dataEklaim.x_diagnosa.push({
                          nama_diagnosa: `${y[1]} - ${y[0]}`,
                          nama: y[0],
                          kode: y[1],
                        })
                      }
                    }
                  }
                }
                //procedure
                const procedure = resEklaim.respon_eklaim.response.data.procedure.split('#')
                for (let i = 0; i < procedure.length; i++) {
                  const x = procedure[i];
                  const res = await vm.$_api.post('inacbg/search_procedures', {keyword: x})
                  if(res.status == 200) {
                    for (let u = 0; u < res.data.length; u++) {
                      const y = res.data[u];
                      if(y[1] == x){
                        vm.dataEklaim.x_prosedur.push({
                          nama_prosedur: `${y[1]} - ${y[0]}`,
                          nama: y[0],
                          kode: y[1],
                        })
                      }
                    }
                  }
                }
                vm.dataEklaim.dokter = vm.$findKey(vm.listDokter, resEklaim.respon_eklaim.response.data.nama_dokter, 'nama_dokter')
              }
              //grouper
              if(res.data[0].grouping_stage_one){
                vm.statusEklaim = 3
                const dataGroupOne = res.data[0].grouping_stage_one.response
                vm.dataGrouper = {
                  info: '',
                  jenis_rawat: '',
                  group: dataGroupOne.cbg.description || '',
                  codeGroup: dataGroupOne.cbg.code || '',
                  tarifGroup: dataGroupOne.cbg.tariff || 0,
                  subAcute: dataGroupOne.sub_acute.description || '',
                  codeSubAcute: dataGroupOne.sub_acute.code || '',
                  tarifSubAcute: dataGroupOne.sub_acute.tariff || 0,
                  chronic: dataGroupOne.chronic.description || '',
                  codeChronic: dataGroupOne.chronic.code || '',
                  tarifChronic: dataGroupOne.chronic.tariff || 0,
                  prosedure: [],
                  prosthesis: [],
                  investigation: [],
                  drug: [],
                }

                // if(false){
                  vm.listProcedurGouper = []
                  vm.listProsthesisGouper = []
                  vm.listInvestigationGouper = []
                  for (let i = 0; i < dataGroupOne.special_cmg.length; i++) {
                    const dataListGouper = dataGroupOne.special_cmg[i];
                    if(dataListGouper.code){
                      dataListGouper.name = `${dataListGouper.code} - ${dataListGouper.description}`
                      switch (dataListGouper.type) {
                        case 'Special Procedure':
                          vm.listProcedurGouper.push(dataListGouper)
                          break;
                        case 'Special Prosthesis':
                          vm.listProsthesisGouper.push(dataListGouper)
                          break;
                        case 'Special Investigation':
                          vm.listInvestigationGouper.push(dataListGouper)                        
                          break;
                        case 'Special Drug':
                          vm.listSpecialDrugGrouper.push(dataListGouper)                        
                          break;
                        default:
                          break;
                      }
                    }
                  }
                // }
              }
            }
          }else{
            vm.$_alert.error(res.message.toUpperCase())
          }
        }
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async getData(){
      const vm = this
      vm.busy = false
      try {
        const listDokter = await vm.$_api.post('msDokter/list', {halaman: 1, jumlah: 1000, limit: 1000})
        vm.listDokter = listDokter.data.map(x => {
          return {
            ...x,
            nama_dokter: x.nama_dokter.toUpperCase(),
          }
        })
      } catch (error) {
        vm.$_alert.error('Terjadi Kelasalahan System')
      } finally {
        vm.busy = false
      }
    },
    async buatEklaim(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        //diagnosa
        let listDiagnosa = []
        let diagnosa = ''
        for (let i = 0; i < x.x_diagnosa.length; i++) {
          const item = x.x_diagnosa[i];
          listDiagnosa.push(item.kode)
        }
        diagnosa = listDiagnosa.join('#')
        //prosedure
        let listProsedure = []
        let prosedure = ''
        for (let i = 0; i < x.x_prosedur.length; i++) {
          const item = x.x_prosedur[i];
          listProsedure.push(item.kode)
        }
        prosedure = listProsedure.join('#')
        //idrg diagnosa
        let listIdrgDiagnosa = []
        let idrg_diagnosa = ''
        for (let i = 0; i < x.idrg_diagnosa.length; i++) {
          const item = x.idrg_diagnosa[i];
          listIdrgDiagnosa.push(item.kode)
        }
        idrg_diagnosa = listIdrgDiagnosa.join('#')
        //idrg prosedure
        let listIdrgProsedure = []
        let idrg_prosedure = ''
        for (let i = 0; i < x.idrg_prosedur.length; i++) {
          const item = x.idrg_prosedur[i];
          listIdrgProsedure.push(item.kode)
        }
        idrg_prosedure = listIdrgProsedure.join('#')
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_rm: vm.dataTagihan.no_rm,
          nama_pasien: vm.dataTagihan.nama_tagihan,

          "nomor_sep": x.nomor_sep,
          "nomor_kartu": x.nomor_kartu,
          "tgl_masuk": vm.$moment(x.tgl_masuk).format('YYYY-MM-DD HH:mm:ss'),
          "tgl_pulang": vm.$moment(x.tgl_pulang).format('YYYY-MM-DD HH:mm:ss'),
          "cara_masuk": x.cara_masuk,
          "discharge_status": x.discharge_status,
          "jenis_rawat": x.jenis_rawat,
          "kelas_rawat": x.kelas_rawat,
          "adl_sub_acute": x.adl_sub_acute,
          "adl_chronic": x.adl_chronic,
          "icu_indikator": x.icu_indikator, // sebagai flag tampil ventilator 0 / 1
          "icu_los": x.icu_los, //hari ventilator
          "ventilator_hour": x.ventilator_hour, //otomatis start_dttm - stop_dttm
          "ventilator": { // jika rawat inap ventilator keluar
            "use_ind": x.ventilator.use_ind, //flag centilator
            "start_dttm": vm.$moment(x.ventilator.start_dttm).format('YYYY-MM-DD HH:mm:ss'),
            "stop_dttm": vm.$moment(x.ventilator.stop_dttm).format('YYYY-MM-DD HH:mm:ss'),
          },
          "upgrade_class_ind": x.upgrade_class_ind,
          "upgrade_class_class": x.upgrade_class_class,
          "upgrade_class_los": x.upgrade_class_los,
          "upgrade_class_payor": x.upgrade_class_payor, // peserta / pemberi_kerja / asuransi_tambahan
          "add_payment_pct": x.add_payment_pct,
          "birth_weight": x.birth_weight,
          "sistole": x.sistole,
          "diastole": x.diastole,
          "diagnosa": diagnosa,
          "procedure": prosedure,
          "diagnosa_inagrouper": diagnosa,
          "procedure_inagrouper": prosedure,
          "idrg_diagnosa": idrg_diagnosa,
          "idrg_prosedure": idrg_prosedure,
          // "diagnosa": "S71.0#A00.1",
          // "procedure": "81.52#88.38#86.22",
          // "diagnosa_inagrouper": "S71.0#A00.1",
          // "procedure_inagrouper": "81.52#88.38#86.22+3#86.22",
          "tarif_rs": {
            "prosedur_non_bedah": x.tarif_rs.prosedur_non_bedah || 0,
            "prosedur_bedah": x.tarif_rs.prosedur_bedah || 0,
            "konsultasi": x.tarif_rs.konsultasi || 0,
            "tenaga_ahli": x.tarif_rs.tenaga_ahli || 0,
            "keperawatan": x.tarif_rs.keperawatan || 0,
            "penunjang": x.tarif_rs.penunjang || 0,
            "radiologi": x.tarif_rs.radiologi || 0,
            "laboratorium": x.tarif_rs.laboratorium || 0,
            "pelayanan_darah": x.tarif_rs.pelayanan_darah || 0,
            "rehabilitasi": x.tarif_rs.rehabilitasi || 0,
            "kamar": x.tarif_rs.kamar || 0,
            "rawat_intensif": x.tarif_rs.rawat_intensif || 0,
            "obat": x.tarif_rs.obat || 0,
            "obat_kronis": x.tarif_rs.obat_kronis || 0,
            "obat_kemoterapi": x.tarif_rs.obat_kemoterapi || 0,
            "alkes": x.tarif_rs.alkes || 0,
            "bmhp": x.tarif_rs.bmhp || 0,
            "sewa_alat": x.tarif_rs.sewa_alat || 0,
          },
          //default 0
          "pemulasaraan_jenazah": "0", 
          "kantong_jenazah": "0", 
          "peti_jenazah": "0",
          "plastik_erat": "0",
          "desinfektan_jenazah": "0",
          "mobil_jenazah": "0",
          "desinfektan_mobil_jenazah": "0",
          "covid19_status_cd": "0",
          "nomor_kartu_t": "nik", 
          "episodes": "1;12#2;3#6;5", //diisi di bawah
          "covid19_cc_ind": "0", 
          "covid19_rs_darurat_ind": "0", 
          "covid19_co_insidense_ind": "0", 
          "covid19_penunjang_pengurang":{
            "lab_asam_laktat" : "0",
            "lab_procalcitonin" : "0",
            "lab_crp" : "0",
            "lab_kultur" : "0",
            "lab_d_dimer" : "0",
            "lab_pt" : "0",
            "lab_aptt" : "0",
            "lab_waktu_pendarahan" : "0",
            "lab_anti_hiv" : "0",
            "lab_analisa_gas" : "0",
            "lab_albumin" : "0",
            "rad_thorax_ap_pa" : "0"
          },
          "terapi_konvalesen": "",
          "akses_naat": "",
          "isoman_ind": "0",
          "bayi_lahir_status_cd": '0',
          //default 0
          "dializer_single_use": x.dializer_single_use, // doc
          "kantong_darah": x.kantong_darah, // input number
          "apgar":{ //input number semua / doc
            "menit_1":{
              "appearance": 1,
              "pulse": 2,
              "grimace": 1,
              "activity": 1, 
              "respiration": 1
            },
            "menit_5": {
              "appearance": 2,
              "pulse": 2,
              "grimace": 2,
              "activity": 2,
              "respiration": 2
            }
          },
        "persalinan": { // doc
          "usia_kehamilan": "22", //minggu
          "gravida": "2",
          "partus": "4",
          "abortus": "2",
          "onset_kontraksi": "induksi",
          "delivery": [] //array kosong
        },
        "tarif_poli_eks": x.tarif_poli_eks, // input number
        "nama_dokter": x.dokter ? x.dokter.nama_dokter : null, //dari ms_dokter
        "kode_tarif": x.kode_tarif,
        "payor_id": "3",  //default
        "payor_cd": "JKN", //default
        "cob_cd": "#", //default
        "coder_nik": "123123123123" //default
        }

        // menghitung episodes
        const icu_tekanan_negatif = vm.dataEklaim.episode.icu_tekanan_negatif
        const icu_tekanan_negatif_hari = vm.dataEklaim.episode.icu_tekanan_negatif_hari
        const icu_tanpa_tekanan_negatif = vm.dataEklaim.episode.icu_tanpa_tekanan_negatif
        const icu_tanpa_tekanan_negatif_hari = vm.dataEklaim.episode.icu_tanpa_tekanan_negatif_hari
        const isolasi_tekanan_negatif = vm.dataEklaim.episode.isolasi_tekanan_negatif
        const isolasi_tekanan_negatif_hari = vm.dataEklaim.episode.isolasi_tekanan_negatif_hari
        const firstCol = parseInt(icu_tekanan_negatif) === 1 ? 7 : 8
        const secondCol = parseInt(icu_tanpa_tekanan_negatif) === 1 ? 9 : 10
        const thirdCol = parseInt(isolasi_tekanan_negatif) === 1 ? 11 : 12
        data.episodes = `${firstCol};${icu_tekanan_negatif_hari}#${secondCol};${icu_tanpa_tekanan_negatif_hari}#${thirdCol};${isolasi_tekanan_negatif_hari}`;
        // ICU
        if(x.icu_indikator === '1'){
          data.icu_indikator = x.icu_indikator
          data.ventilator.use_ind = x.ventilator.use_ind // flag centilator
          if (x.ventilator.use_ind === '1') {
            data.icu_los = x.icu_los //hari ventilator
            data.ventilator_hour = x.ventilator_hour //otomatis start_dttm - stop_dttm
            data.ventilator.start_dttm = vm.$moment(x.ventilator.start_dttm).format('YYYY-MM-DD HH:mm:ss')
            data.ventilator.stop_dttm = vm.$moment(x.ventilator.stop_dttm).format('YYYY-MM-DD HH:mm:ss')
            
          }
        }
        const res = await vm.$_api.post('eklaim/set_claim_data', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil membuat eklaim')
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async kirimGrouper(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_sep: x.nomor_sep,
          // special_cmg
        }
        const res = await vm.$_api.post('eklaim/grouper', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil Melakukan Grouper')
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async kirimGrouper2(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        if(vm.dataTagihan.tagihan_id && x.nomor_sep && vm.statusEklaim >= 3){
          const special_cmg = 'RR04#YY01'
          // const special_cmg = vm.dataGrouper.prosedure.kode
          const data = {
            tagihan_id: vm.dataTagihan.tagihan_id,
            nomor_sep: x.nomor_sep,
            special_cmg,
          }
          const res = await vm.$_api.post('eklaim/grouper2', data)
          if(res.status == 200){
            vm.$_alert.success('Berhasil Melakukan Grouper Kedua')
          }else {
            vm.$_alert.error(res.message)
          }
          // vm.getEklaim()
        }
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async finalEklaim(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_sep: x.nomor_sep,
          coder_nik: '123123123123',
        }
        const res = await vm.$_api.post('eklaim/claim_final', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil Mengubah Ke Final Eklaim')
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async editUlang(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_sep: x.nomor_sep,
        }
        const res = await vm.$_api.post('eklaim/reedit_claim', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil Melakukan Edit Ulang')
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async kirimEklaim(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_sep: x.nomor_sep,
          // special_cmg
        }
        const res = await vm.$_api.post('eklaim/send_claim', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil Mengirim Eklaim Ke Data Center')
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async cetakEklaim(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_sep: x.nomor_sep,
          // special_cmg
        }
        const res = await vm.$_api.post('eklaim/claim_print', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil Mengeprint')
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async hapusEklaim(){
      const vm = this
      vm.busy = false
      try {
        const x = vm.dataEklaim
        const data = {
          tagihan_id: vm.dataTagihan.tagihan_id,
          nomor_sep: x.nomor_sep,
          coder_nik: '123123123123',
        }
        const res = await vm.$_api.post('eklaim/delete_claim', data)
        if(res.status == 200){
          vm.$_alert.success('Berhasil Menghapus Eklaim')
          vm.refresh()
          vm.dataTagihan = {}
        }else {
          vm.$_alert.error(res.message)
        }
        vm.getEklaim()
      } catch (error) {
        if(error.data && error.data.message){
          vm.$_alert.success(error.data.message)
        }else{
          vm.$_alert.success('Terjadi Kelasalahan System')
        }
      } finally {
        vm.busy = false
      }
    },
    async refresh(){
      const vm = this
      // vm.dataEklaim = {
      //   // "nomor_sep": "0001R0016120507422",
      //   // "nomor_kartu": "233333",
      //   // "tgl_masuk": "2023-01-25 12:55:00",
      //   // "tgl_pulang": "2023-01-31 09:55:00",
      //   "cara_masuk": "gp",
      //   "jenis_rawat": "1",
      //   "kelas_rawat": "1",
      //   "adl_sub_acute": "15",
      //   "adl_chronic": "12",
      //   "icu_indikator": "1",
      //   "icu_los": "2",
      //   "ventilator_hour": "5",
      //   // "ventilator": {
      //   //   "use_ind": "1",
      //   //   "start_dttm": "2023-01-26 12:55:00",
      //   //   "stop_dttm": "2023-01-26 17:50:00"
      //   // },
      //   "upgrade_class_ind": "1",
      //   "upgrade_class_class": "vip",
      //   "upgrade_class_los": "5",
      //   "upgrade_class_payor": "peserta",
      //   "add_payment_pct": "35",
      //   "birth_weight": "0",
      //   "sistole": 120,
      //   "diastole": 70,
      //   "discharge_status": "1",
      //   "diagnosa": "S71.0#A00.1",
      //   "procedure": "81.52#88.38#86.22",
      //   "diagnosa_inagrouper": "S71.0#A00.1",
      //   "procedure_inagrouper": "81.52#88.38#86.22+3#86.22",
      //   "tarif_rs": {
      //     "prosedur_non_bedah": "300000",
      //     "prosedur_bedah": "20000000",
      //     "konsultasi": "300000",
      //     "tenaga_ahli": "200000",
      //     "keperawatan": "80000",
      //     "penunjang": "1000000",
      //     "radiologi": "500000",
      //     "laboratorium": "600000",
      //     "pelayanan_darah": "150000",
      //     "rehabilitasi": "100000",
      //     "kamar": "6000000",
      //     "rawat_intensif": "2500000",
      //     "obat": "100000",
      //     "obat_kronis": "1000000",
      //     "obat_kemoterapi": "5000000",
      //     "alkes": "500000",
      //     "bmhp": "400000",
      //     "sewa_alat": "210000"
      //   },
      //   "pemulasaraan_jenazah": "1",
      //   "kantong_jenazah": "1",
      //   "peti_jenazah": "1",
      //   "plastik_erat": "1",
      //   "desinfektan_jenazah": "1",
      //   "mobil_jenazah": "0",
      //   "desinfektan_mobil_jenazah": "0",
      //   "covid19_status_cd": "1",
      //   "nomor_kartu_t": "nik",
      //   "episodes": "1;12#2;3#6;5",
      //   "covid19_cc_ind": "1",
      //   "covid19_rs_darurat_ind": "1",
      //   "covid19_co_insidense_ind": "1",
      //   "covid19_penunjang_pengurang": {
      //     "lab_asam_laktat": "1",
      //     "lab_procalcitonin": "1",
      //     "lab_crp": "1",
      //     "lab_kultur": "1",
      //     "lab_d_dimer": "1",
      //     "lab_pt": "1",
      //     "lab_aptt": "1",
      //     "lab_waktu_pendarahan": "1",
      //     "lab_anti_hiv": "1",
      //     "lab_analisa_gas": "1",
      //     "lab_albumin": "1",
      //     "rad_thorax_ap_pa": "0"
      //   },
      //   "terapi_konvalesen": "1000000",
      //   "akses_naat": "C",
      //   "isoman_ind": "0",
      //   "bayi_lahir_status_cd": 1,
      //   "dializer_single_use": "0",
      //   "kantong_darah": 1,
      //   "apgar": {
      //     "menit_1": {
      //       "appearance": 1,
      //       "pulse": 2,
      //       "grimace": 1,
      //       "activity": 1,
      //       "respiration": 1
      //     },
      //     "menit_5": {
      //       "appearance": 2,
      //       "pulse": 2,
      //       "grimace": 2,
      //       "activity": 2,
      //       "respiration": 2
      //     }
      //   },
      //   "persalinan": {
      //     "usia_kehamilan": "22",
      //     "gravida": "2",
      //     "partus": "4",
      //     "abortus": "2",
      //     "onset_kontraksi": "induksi",
      //     "delivery": [
      //       {
      //         "delivery_sequence": "1",
      //         "delivery_method": "vaginal",
      //         "delivery_dttm": "2023-01-21 17:01:33",
      //         "letak_janin": "kepala",
      //         "kondisi": "livebirth",
      //         "use_manual": "1",
      //         "use_forcep": "0",
      //         "use_vacuum": "1"
      //       },
      //       {
      //         "delivery_sequence": "2",
      //         "delivery_method": "vaginal",
      //         "delivery_dttm": "2023-01-21 17:03:49",
      //         "letak_janin": "lintang",
      //         "kondisi": "livebirth",
      //         "use_manual": "1",
      //         "use_forcep": "0",
      //         "use_vacuum": "0"
      //       }
      //     ]
      //   },
      //   "tarif_poli_eks": "100000",
      //   "nama_dokter": "RUDY, DR",
      //   "kode_tarif": "CP",
      //   "payor_id": "3",
      //   "payor_cd": "JKN",
      //   "cob_cd": "0001",
      //   "coder_nik": "123123123123",
      //   dokter: '',
      //   episode: {
      //     icu_tekanan_negatif: false,
      //     icu_tekanan_negatif_hari: "0",
      //     icu_tanpa_tekanan_negatif: false,
      //     icu_tanpa_tekanan_negatif_hari: "0",
      //     isolasi_tekanan_negatif: false,
      //     isolasi_tekanan_negatif_hari: "0",
      //   },
      //   x_cara_bayar: '',
      //   x_no_peserta: '',
      //   nomor_kartu: vm.dataTagihan.no_asuransi || '',
      //   nomor_sep: vm.dataTagihan.no_sep_tagihan || '',
      //   // cob_cd: '',
      //   // jenis_rawat: '2',
      //   x_kelas_ekslusif: '',
      //   x_kelas_hak: '',
      //   tgl_masuk: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'), 
      //   tgl_pulang: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      //   x_umur: vm.dataTagihan.usia_pasien_tagihan,
      //   // cara_masuk: 'other',
      //   // icu_indikator: '0',
      //   // icu_los: '',
      //   // ventilator_hour: '',
      //   ventilator: {
      //     use_ind: '1',
      //     start_dttm: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'), 
      //     stop_dttm: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      //   },
      //   // kelas_rawat: '',
      //   // birth_weight: '',
      //   x_adl_score: '',
      //   // adl_sub_acute: '0',
      //   // adl_chronic: '0',
      //   // discharge_status: '5',
      //   x_dpjp: '',
      //   // kode_tarif: '',
      //   x_pasien_tb: '',
      //   // upgrade_class_ind: '0',
      //   // upgrade_class_class: '',
      //   // upgrade_class_los: '',
      //   // upgrade_class_payor: '',
      //   // add_payment_pct: '',
      //   // dializer_single_use: '',
      //   // kantong_darah: '',
      //   // tarif_poli_eks: '',

      //   // tagihan
      //   x_tarif_rumah_sakit: '',
      //   // tarif_rs: {
      //   //   prosedur_non_bedah: 0,
      //   //   prosedur_bedah: 0,
      //   //   konsultasi: 0,
      //   //   tenaga_ahli: 0,
      //   //   keperawatan: 0,
      //   //   penunjang: 0,
      //   //   radiologi: 0,
      //   //   laboratorium: 0,
      //   //   pelayanan_darah: 0,
      //   //   rehabilitasi: 0,
      //   //   kamar: 0,
      //   //   rawat_intensif: 0,
      //   //   obat: 0,
      //   //   obat_kronis: 0,
      //   //   obat_kemoterapi: 0,
      //   //   alkes: 0,
      //   //   bmhp: 0,
      //   //   sewa_alat: 0,
      //   // },

      //   // grouper
      //   x_diagnosa: [],
      //   x_prosedur: [],
      //   listDiagnosa: [],
      //   listProsedur: [],

      //   // klinis
      //   // sistole: 0,
      //   // diastole: 0,
      // }

      vm.dataEklaim = {
        dokter: '',
        episode: {
          icu_tekanan_negatif: false,
          icu_tekanan_negatif_hari: "0",
          icu_tanpa_tekanan_negatif: false,
          icu_tanpa_tekanan_negatif_hari: "0",
          isolasi_tekanan_negatif: false,
          isolasi_tekanan_negatif_hari: "0",
        },
        x_cara_bayar: '',
        x_no_peserta: '',
        nomor_kartu: vm.dataTagihan.no_asuransi || '',
        nomor_sep: vm.dataTagihan.no_sep_tagihan || '',
        cob_cd: '',
        jenis_rawat: '2',
        x_kelas_ekslusif: '',
        x_kelas_hak: '',
        tgl_masuk: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'), 
        tgl_pulang: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        x_umur: vm.dataTagihan.usia_pasien_tagihan,
        cara_masuk: 'other',
        icu_indikator: '0',
        icu_los: '',
        ventilator_hour: '',
        ventilator: {
          use_ind: '0',
          start_dttm: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'), 
          stop_dttm: vm.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        },
        kelas_rawat: '',
        birth_weight: '',
        x_adl_score: '',
        adl_sub_acute: '0',
        adl_chronic: '0',
        discharge_status: '5',
        x_dpjp: '',
        kode_tarif: '',
        x_pasien_tb: '',
        upgrade_class_ind: '0',
        upgrade_class_class: '',
        upgrade_class_los: '',
        upgrade_class_payor: '',
        add_payment_pct: '',
        dializer_single_use: '',
        kantong_darah: '',
        tarif_poli_eks: '',

        // tagihan
        x_tarif_rumah_sakit: '',
        tarif_rs: {
          prosedur_non_bedah: 0,
          prosedur_bedah: 0,
          konsultasi: 0,
          tenaga_ahli: 0,
          keperawatan: 0,
          penunjang: 0,
          radiologi: 0,
          laboratorium: 0,
          pelayanan_darah: 0,
          rehabilitasi: 0,
          kamar: 0,
          rawat_intensif: 0,
          obat: 0,
          obat_kronis: 0,
          obat_kemoterapi: 0,
          alkes: 0,
          bmhp: 0,
          sewa_alat: 0,
        },

        // grouper
        x_diagnosa: [],
        x_prosedur: [],
        listDiagnosa: [],
        listProsedur: [],

        // idrg
        idrg_diagnosa: [],
        idrg_prosedur: [],

        // klinis
        sistole: 0,
        diastole: 0,
      }

      vm.dataGrouper = {
        info: '',
        jenis_rawat: '',
        group: '',
        codeGroup: '',
        tarifGroup: 0,
        subAcute: '',
        codeSubAcute: '',
        tarifSubAcute: 0,
        chronic: '',
        codeChronic: '',
        tarifChronic: 0,
        prosedure: [],
        prosthesis: [],
        investigation: [],
        drug: [],
      }
    }
  },
}
</script>