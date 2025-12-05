<template>
	<div class="card card-custom">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					Form Subjective <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<!-- <button class="btn btn-light-primary mr-2" @click="$parent.doValidasi()" v-if="!objectDataAssesmen.is_validasi">
					<i class="ki ki-check icon-sm"></i>
					Validasi Assesmen
				</button> -->
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="onSubmitEvaluasi()" :disabled="objectDataAssesmen.is_validasi">
						<i class="ri-save-line"></i>
						Simpan
					</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			
			<ValidationObserver v-slot="{ handleSubmit }">
				<form ref="keperawatan_subjective_form" @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
					<div class="row">
						<div class="col-12">
							<s-input v-model="mData.tujuan_kunjungan" :key="'tujuan_kunjungan'" :id="'tujuan_kunjungan'" :item="{
								label: 'Tujuan Kunjungan',
								id: 'tujuan_kunjungan',
								data: 'tujuan_kunjungan',
								type: 'lookup-radio',
								validation: ['required'],
								value: mData.tujuan_kunjungan,
								pointer: {
									label: 'label',
									code: 'code',
									display: ['label'],
									list: [
										{ label: 'Berobat', code: 'berobat' },
										{ label: 'Kontrol Rutin', code: 'Kontrol Rutin' },
										{ label: 'Pasca Rawat', code: 'Pasca Rawat' },
										{ label: 'Rujukan Internal', code: 'Rujukan Internal' },
										{ label: 'Imunisasi', code: 'Imunisasi' },
										{ label: 'Konsultasi', code: 'Konsultasi' }
									]
								},
								param: {},
							}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.tujuan_kunjungan" />
						</div>
						<div class="col-12">
							<s-input v-model="mData.keluhan_utama" :item="{
								label: 'Keluhan Utama',
								id: 'keluhan_utama',
								data: 'keluhan_utama',
								value: mData.keluhan_utama,
								type: 'text',
								validation: ['required'],
							}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.keluhan_utama" />
						</div>
						<div class="col-12">
							<s-input v-model="mData.riwayat_kesehatan_saat_ini" :item="{
								label: 'Riwayat Kesehatan Saat Ini',
								id: 'riwayat_kesehatan_saat_ini',
								data: 'riwayat_kesehatan_saat_ini',
								value: mData.riwayat_kesehatan_saat_ini,
								type: 'text',
								validation: ['required'],
							}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.riwayat_kesehatan_saat_ini" />
						</div>

						<div class="col-12">
              <b-form-group label="Perasaan" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="perasaan"
                  v-model="mData.perasaan"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Cemas', value: 'cemas' },
                    { text: 'Takut', value: 'takut' },
                    { text: 'Marah', value: 'marah' },
                    { text: 'Sedih', value: 'sedih' },
                    { text: 'Lain Lain', value: 'lain_lain' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="perasaan"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12" v-if="mData.perasaan === 'lain_lain'">
              <s-input v-model="mData.perasaan_lain_lain" :item="{
                label: 'lain Lain',
                id: 'perasaan_lain_lain',
                data: 'perasaan_lain_lain',
                type: 'text',
                validation: [],
                value: mData.perasaan_lain_lain,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.perasaan_lain_lain" />
            </div>

            <div class="col-12">
              <b-form-group label="Bunuh Diri" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  size="lg"
                  id="kecenderungan_bunuh_diri"
                  v-model="mData.kecenderungan_bunuh_diri"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Kecenderungan Bunuh Diri', value: 'kecenderungan_bunuh_diri' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="kecenderungan_bunuh_diri"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="col-12">
              <b-form-group label="Masalah Perilaku" label-class="" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="masalah_perilaku"
                  v-model="mData.masalah_perilaku"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Tidak Ada', value: 'tidak_ada' },
                    { text: 'Ada', value: 'ada' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="masalah_perilaku"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="col-12" v-if="mData.masalah_perilaku === 'ada'">
              <s-input v-model="mData.masalah_perilaku_text" :item="{
                label: 'Sebutkan',
                id: 'masalah_perilaku_text',
                data: 'masalah_perilaku_text',
                type: 'text',
                validation: [],
                value: mData.masalah_perilaku_text,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.masalah_perilaku_text" />
            </div>

						<div class="col-12">
              <b-form-group label="Status Pernikahan" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="status_pernikahan"
                  v-model="mData.status_pernikahan"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Belum Nikah', value: 'belum_nikah' },
                    { text: 'Menikah', value: 'menikah' },
                    { text: 'Cerai', value: 'cerai' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="status_pernikahan"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12">
              <b-form-group label="Hubungan pasien dengan anggota keluarga" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="hubungan_keluarga"
                  v-model="mData.hubungan_keluarga"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Baik', value: 'baik' },
                    { text: 'Tidak Baik', value: 'tidak_baik' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="hubungan_keluarga"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12">
              <b-form-group label="Tempat Tinggal" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="tempat_tinggal"
                  v-model="mData.tempat_tinggal"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Rumah Sendiri', value: 'rumah_sendiri' },
                    { text: 'Rumah Keluarga', value: 'rumah_keluarga' },
                    { text: 'Panti', value: 'panti' },
                    { text: 'Lain Lain', value: 'lain_lain' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="tempat_tinggal"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12" v-if="mData.tempat_tinggal === 'lain_lain'">
              <s-input v-model="mData.tempat_tinggal_lain_lain" :item="{
                label: 'lain Lain',
                id: 'tempat_tinggal_lain_lain',
                data: 'tempat_tinggal_lain_lain',
                type: 'text',
                validation: [],
                value: mData.tempat_tinggal_lain_lain,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.tempat_tinggal_lain_lain" />
            </div>

						<div class="col-12">
              <b-form-group label="Penggunaan alat bantu" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="penggunaan_alat_bantu"
                  v-model="mData.penggunaan_alat_bantu"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Tidak', value: 'tidak' },
                    { text: 'Tongkat', value: 'tongkat' },
                    { text: 'Kursi Roda', value: 'kursi_roda' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="penggunaan_alat_bantu"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="col-12">
              <b-form-group label="Cacat Tubuh" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="cacat_tubuh"
                  v-model="mData.cacat_tubuh"
									:disabled="objectDataAssesmen.is_validasi"
                  :options="[
                    { text: 'Tidak', value: 'tidak' },
                    { text: 'Ada', value: 'ada' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="cacat_tubuh"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="col-12" v-if="mData.cacat_tubuh === 'ada'">
              <s-input v-model="mData.cacat_tubuh_lain_lain" :item="{
                label: 'Sebutkan',
                id: 'cacat_tubuh_lain_lain',
                data: 'cacat_tubuh_lain_lain',
                type: 'text',
                validation: [],
                value: mData.cacat_tubuh_lain_lain,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.cacat_tubuh_lain_lain" />
            </div>

            <div class="col-12">
							<div class="row">
								<div class="col-4">
									<s-input v-model="mData.riwayat_penyakit_dahulu_pengobatan" :item="{
										label: 'Riwayat Penyakit Dahulu & Pengobatan',
										id: 'riwayat_penyakit_dahulu_pengobatan',
										data: 'riwayat_penyakit_dahulu_pengobatan',
										type: 'lookup-button',
										validation: [],
										value: mData.riwayat_penyakit_dahulu_pengobatan,
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
									}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.riwayat_penyakit_dahulu_pengobatan" />

									<s-input v-model="mData.riwayat_penyakit_dahulu_pengobatan_text" v-if="mData.riwayat_penyakit_dahulu_pengobatan == 'Ada'" :item="{
										label: '',
										placeholder: 'Keterangan',
										id: 'riwayat_penyakit_dahulu_pengobatan_text',
										data: 'riwayat_penyakit_dahulu_pengobatan_text',
										type: 'text',
										validation: [],
										value: mData.riwayat_penyakit_dahulu_pengobatan_text,
										param: {},
									}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.riwayat_penyakit_dahulu_pengobatan_text" />

								</div>
								<div class="col-4">
									<s-input v-model="mData.riwayat_alergi" :item="{
										label: 'Riwayat Alergi',
										id: 'riwayat_alergi',
										data: 'riwayat_alergi',
										type: 'lookup-button',
										validation: [],
										value: mData.riwayat_alergi,
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
									}" :disabled="objectDataAssesmen.is_validasi" @input="mData.riwayat_alergi === 'Tidak' ? mData.riwayat_pembedahan = 'Tidak' : ''" :valuee="mData.riwayat_alergi" />

									<s-input v-model="mData.riwayat_alergi_text" v-if="mData.riwayat_alergi == 'Ada'" :item="{
										label: '',
										placeholder: 'Keterangan',
										id: 'riwayat_alergi_text',
										data: 'riwayat_alergi_text',
										type: 'text',
										validation: [],
										value: mData.riwayat_alergi_text,
										param: {},
									}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.riwayat_alergi_text" />
								</div>
								<div class="col-4">
									<s-input v-model="mData.riwayat_pembedahan" :item="{
										label: 'Riwayat Pembedahan',
										id: 'riwayat_pembedahan',
										data: 'riwayat_pembedahan',
										type: 'lookup-button',
										validation: [],
										value: mData.riwayat_pembedahan,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: [
												{ label: 'Ya', code: 'Ya' },
												{ label: 'Tidak', code: 'Tidak' },
											]
										},
										param: {},
									}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.riwayat_pembedahan" />

									<s-input v-model="mData.riwayat_pembedahan_text" v-if="mData.riwayat_pembedahan == 'Ya'" :item="{
										label: '',
										placeholder: 'Keterangan',
										id: 'riwayat_pembedahan_text',
										data: 'riwayat_pembedahan_text',
										type: 'text',
										validation: [],
										value: mData.riwayat_pembedahan_text,
										param: {},
									}" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.riwayat_pembedahan_text" />
								</div>

							</div>
						</div>
					</div>
					<!-- <template>
						<div class="col-12 align-self-center p-0">
							<button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
								<i class="ri-save-line"></i>
								{{ $t('global.submit') }}
							</button>
						</div>
					</template> -->
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>
	
<script>
	import moment from 'moment'
	moment.locale('id')
	
	export default {
		name: 'keperawatan_subjective',
		props: {
            is_validasi: {
				type: Boolean,
				required: true,
				default () {
					return false
				}
			},
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