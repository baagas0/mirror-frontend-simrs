<template>
	<div class="card card-custom card-sticky">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					Form Pengkajian Kebutuhan Informasi dan Edukasi <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen({key:'pengkajian_ide', data:mData})" :disabled="objectDataAssesmen.is_validasi">
						<i class="ri-save-line"></i>
						Simpan
					</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
					<div class="row">

            <div class="col-6">
              <s-input v-model="mData.anggota_keluarga_yang_tinggal_bersama" :item="{
                label: 'Anggota Keluarga Yang Tinggal bersama',
                id: 'anggota_keluarga_yang_tinggal_bersama',
                data: 'anggota_keluarga_yang_tinggal_bersama',
                type: 'select',
                validation: [],
                value: mData.anggota_keluarga_yang_tinggal_bersama,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Ayah', code: 'Ayah' },
                    { label: 'Ibu', code: 'Ibu' },
                    { label: 'Anak', code: 'Anak' },
                    { label: 'Saudara', code: 'Saudara' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.anggota_keluarga_yang_tinggal_bersama" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.pendidikan_pasien_keluarga" :item="{
                label: 'Pendidikan Pasien Keluarga',
                id: 'pendidikan_pasien_keluarga',
                data: 'pendidikan_pasien_keluarga',
                type: 'lookup-radio',
                api: 'msPendidikan',
                return_object: true,
                validation: [],
                value: mData.pendidikan_pasien_keluarga,
                pointer: {
                  label: 'nama_pendidikan',
                  code: 'id',
                  display: ['nama_pendidikan']
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.pendidikan_pasien_keluarga" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.kemampuan_baca_tulis" :item="{
                label: 'Kemampuan Baca Tulis',
                id: 'kemampuan_baca_tulis',
                data: 'kemampuan_baca_tulis',
                type: 'select',
                validation: [],
                value: mData.kemampuan_baca_tulis,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Baik', code: 'Baik' },
                    { label: 'Cukup', code: 'Cukup' },
                    { label: 'Kurang', code: 'Kurang' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kemampuan_baca_tulis" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.bahasa_sehari_hari" :item="{
                label: 'Bahasa Sehari Hari',
                id: 'bahasa_sehari_hari',
                data: 'bahasa_sehari_hari',
                type: 'select',
                validation: [],
                value: mData.bahasa_sehari_hari,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Bahasa Indonesia', code: 'Bahasa Indonesia' },
                    { label: 'Sunda Masse', code: 'Sunda' },
                    { label: 'Jawa', code: 'Jawa' },
                    { label: 'Lainnya', code: 'Lainnya' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.bahasa_sehari_hari" />
            </div>
            
            <div class="col-12">
              <s-input v-model="mData.kebutuhan_penerjemah" :item="{
                label: 'Kebutuhan Penerjemah',
                id: 'kebutuhan_penerjemah',
                data: 'kebutuhan_penerjemah',
                type: 'lookup-button',
                validation: [],
                value: mData.kebutuhan_penerjemah,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [{ label: 'Ada', code: 'Ada' }, { label: 'Tidak', code: 'Tidak' }, ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kebutuhan_penerjemah" />
            </div>
            <div class="col-12">
              <s-input v-model="mData.bahasa_isyarat" :item="{
                label: 'Bahasa Isyarat',
                id: 'bahasa_isyarat',
                data: 'bahasa_isyarat',
                type: 'lookup-button',
                validation: [],
                value: mData.bahasa_isyarat,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [{ label: 'Ada', code: 'Ada' }, { label: 'Tidak', code: 'Tidak' }, ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.bahasa_isyarat" />
            </div>


            <div class="col-12">
              <span class="font-weight-bolder text-dark-75 font-size-lg">Hambatan Belajar</span>
            </div>

            <div class="col-4">
              <s-input v-model="mData.fisik" :item="{
                label: 'Fisik',
                id: 'fisik',
                data: 'fisik',
                type: 'lookup-button',
                validation: [],
                value: mData.fisik,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Ada', code: 'Ada' },
                    { label: 'Tidak', code: 'Tidak' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.fisik" />
            </div>
            <div class="col-4">
              <s-input v-model="mData.budaya" :item="{
                label: 'Budaya',
                id: 'budaya',
                data: 'budaya',
                type: 'lookup-button',
                validation: [],
                value: mData.budaya,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Ada', code: 'Ada' },
                    { label: 'Tidak', code: 'Tidak' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.budaya" />
            </div>
            <div class="col-4">
              <s-input v-model="mData.bahasa" :item="{
                label: 'Bahasa',
                id: 'bahasa',
                data: 'bahasa',
                type: 'lookup-button',
                validation: [],
                value: mData.bahasa,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Ada', code: 'Ada' },
                    { label: 'Tidak', code: 'Tidak' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.bahasa" />
            </div>
            <div class="col-12">
              <s-input v-model="mData.etnis" :item="{
                label: 'Budaya/Suku/Etnis',
                id: 'etnis',
                data: 'etnis',
                type: 'select',
                validation: [],
                value: mData.etnis,
                api: 'msEtnis',
                pointer: {
                  label: 'nama_etnis',
                  code: 'id',
                  display: ['nama_etnis'],
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.etnis" />
            </div>
            <div class="col-4">
              <s-input v-model="mData.kesediaan_menerima_edukasi" :item="{
                label: 'Kesediaan Menerima Edukasi',
                id: 'kesediaan_menerima_edukasi',
                data: 'kesediaan_menerima_edukasi',
                type: 'lookup-button',
                validation: [],
                value: mData.kesediaan_menerima_edukasi,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Ada', code: 'Ada' },
                    { label: 'Tidak', code: 'Tidak' },
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kesediaan_menerima_edukasi" />
            </div>
            <div class="col-12">
              <s-input v-model="mData.cara_edukasi" :item="{
                label: 'Cara Edukasi',
                id: 'cara_edukasi',
                data: 'cara_edukasi',
                type: 'select',
                validation: [],
                value: mData.cara_edukasi,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: [
                    { label: 'Membaca', code: 'Membaca'},
                    { label: 'Diskusi', code: 'Diskusi'},
                    { label: 'Demonstrasi', code: 'Demonstrasi'},
                    { label: 'Ceramah', code: 'Ceramah'},
                    { label: 'Observasi', code: 'Observasi'},
                    { label: 'Praktek Langsung', code: 'Praktek Langsung'},
                  ]
                },
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.cara_edukasi" />
            </div>

            <div class="col-12 row px-3">
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="hak_partisipasi_proses_layanan" v-model="mData.hak_partisipasi_proses_layanan" :checked="mData.hak_partisipasi_proses_layanan" />
                    <span></span>
                    Hak untuk berpartisipasi proses layanan
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="prosedur_pemeriksaan_penunjang" v-model="mData.prosedur_pemeriksaan_penunjang" :checked="mData.prosedur_pemeriksaan_penunjang" />
                    <span></span>
                    Prosedur Pemeriksaan Penunjang
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="pencegahan_resiko" v-model="mData.pencegahan_resiko" :checked="mData.pencegahan_resiko" />
                    <span></span>
                    Pencegahan Resiko
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="managemen_nyeri" v-model="mData.managemen_nyeri" :checked="mData.managemen_nyeri" />
                    <span></span>
                    Managemen Nyeri
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="rehabilitasi" v-model="mData.rehabilitasi" :checked="mData.rehabilitasi" />
                    <span></span>
                    Rehabilitasi
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="kebersihan_tangan" v-model="mData.kebersihan_tangan" :checked="mData.kebersihan_tangan" />
                    <span></span>
                    Kebersihan Tangan
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="proses_pemberian_inform_consent" v-model="mData.proses_pemberian_inform_consent" :checked="mData.proses_pemberian_inform_consent" />
                    <span></span>
                    Proses Pemberian Inform Consent
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="kondisi_kesehatan_diagnosa_tata" v-model="mData.kondisi_kesehatan_diagnosa_tata" :checked="mData.kondisi_kesehatan_diagnosa_tata" />
                    <span></span>
                    Kondisi Kesehatan, Diagnosa dan Tata Laksana
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="pemberian_obat" v-model="mData.pemberian_obat" :checked="mData.pemberian_obat" />
                    <span></span>
                    Pemberian Obat
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="diet_nutrisi" v-model="mData.diet_nutrisi" :checked="mData.diet_nutrisi" />
                    <span></span>
                    Diet dan Nutrisi
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="lingkungan_pasca_rawat" v-model="mData.lingkungan_pasca_rawat" :checked="mData.lingkungan_pasca_rawat" />
                    <span></span>
                    Lingkungan Yang Disiapkan Pasca Rawat
                  </label>
                </div>
              </div>

              <div class="col-6">
                <div class="checkbox-list mt-3">
                  <label class="checkbox">
                    <input type="checkbox" name="lain_lain" v-model="mData.lain_lain" :checked="mData.lain_lain" />
                    <span></span>
                    Lain Lain
                  </label>
                </div>
              </div>
              
            </div>
          </div>
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>
	
<script>
	import moment from 'moment'
	moment.locale('id')
	
	export default {
		name: 'pengkajian_ide',
		props: {
			objectDataAssesmen: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
			dataRegistrasi: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
			mData: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			}
		},
		data () {
			return {
				// mData: {}
			}
		},
		watch: {
			mData: {
				deep: true,
				immediate: false,
				handler (to, from) {
					this.$emit('dataChange', true)
				}
			}
		},
		mounted () {
		},
		methods: {
			onSubmitEvaluasi () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			}
		}
	}
</script>