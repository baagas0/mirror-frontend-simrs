<template>
	<div class="card card-custom card-sticky">
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
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen()">
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
						<div class="col-12">
							<s-input v-model="mData.anamnesa" :key="'anamnesa'" :id="'anamnesa'" :item="{
								label: 'Anamnesa',
								id: 'anamnesa',
								data: 'anamnesa',
								type: 'lookup-button',
								validation: ['required'],
								value: mData.anamnesa,
								pointer: {
									label: 'label',
									code: 'code',
									display: ['label'],
									list: [
										{ label: 'Auto Anamnesis', code: 'Auto Anamnesis' },
										{ label: 'Allo Anamnesis', code: 'Allo Anamnesis' },
									]
								},
								param: {},
							}" :disabled="is_validasi" :valuee="mData.anamnesa" />
						</div>
						<div class="col-12">
							<s-input v-model="mData.keluhan" :item="{
								label: 'Keluhan',
								id: 'keluhan',
								data: 'keluhan',
								value: mData.keluhan,
								type: 'text',
								validation: ['required'],
							}" :disabled="is_validasi" :valuee="mData.keluhan" />
						</div>
						<div class="col-12">
							<s-input v-model="mData.riwayat_penyakit_saat_ini" :item="{
								label: 'Riwayat Penyakit',
								id: 'riwayat_penyakit_saat_ini',
								data: 'riwayat_penyakit_saat_ini',
								value: mData.riwayat_penyakit_saat_ini,
								type: 'textarea',
								validation: ['required'],
							}" :disabled="is_validasi" :valuee="mData.riwayat_penyakit_saat_ini" />
						</div>
						<div class="col-12">
							<div class="row no-gutters mb-5 nav nav-primary nav-pills gap-8">
								<div style="flex-grow: 1;">
									<s-input v-model="mData.riwayat_penyakit" :key="'riwayat_penyakit'" :id="'riwayat_penyakit'" :item="{
									  label: 'Riwayat Penyakit Dahulu & Pengobatan',
									  id: 'riwayat_penyakit',
									  data: 'riwayat_penyakit',
									  type: 'lookup-button',
									  validation: [],
									  value: mData.riwayat_penyakit,
									  pointer: {
										label: 'label',
										code: 'code',
										display: ['label'],
										list: [{ label: 'Ada', code: 'Ada' }, { label: 'Tidak', code: 'Tidak' }, ]
									  },
									  param: {},
									}" :disabled="is_validasi" :valuee="mData.riwayat_penyakit" />
					
									<s-input v-model="mData.riwayat_penyakit_text" v-if="mData.riwayat_penyakit === 'Ada'" :item="{
									  label: '',
									  placeholder: 'Keterangan',
									  id: 'riwayat_penyakit_text',
									  data: 'riwayat_penyakit_text',
									  value: mData.riwayat_penyakit_text,
									  groupClass: 'mb-0',
									  type: 'text',
									  validation: [],
									  rows: 1,
									}" :disabled="is_validasi" :valuee="mData.riwayat_penyakit_text" />
								  </div>
								  
								  <div style="flex-grow: 1;">
									<s-input v-model="mData.riwayat_penggunaan_obat" :key="'riwayat_penggunaan_obat'" :id="'riwayat_penggunaan_obat'" :item="{
									  label: 'Riwayat Penggunaan Obat',
									  id: 'riwayat_penggunaan_obat',
									  data: 'riwayat_penggunaan_obat',
									  type: 'lookup-button',
									  validation: [],
									  value: mData.riwayat_penggunaan_obat,
									  pointer: {
										label: 'label',
										code: 'code',
										display: ['label'],
										list: [{ label: 'Ada', code: 'Ada' }, { label: 'Tidak', code: 'Tidak' }, ]
									  },
									  param: {},
									}" :disabled="is_validasi" :valuee="mData.riwayat_penggunaan_obat" />
					
									<s-input v-model="mData.riwayat_penggunaan_obat_text" v-if="mData.riwayat_penggunaan_obat === 'Ada'" :item="{
									  label: '',
									  placeholder: 'Keterangan',
									  id: 'riwayat_penggunaan_obat_text',
									  data: 'riwayat_penggunaan_obat_text',
									  value: mData.riwayat_penggunaan_obat_text,
									  groupClass: 'mb-0',
									  type: 'text',
									  validation: [],
									  rows: 1,
									}" :disabled="is_validasi" :valuee="mData.riwayat_penggunaan_obat_text" />
								  </div>
								  
								  <div style="flex-grow: 1;">
									<s-input v-model="mData.riwayat_penyakit_keluarga" :key="'riwayat_penyakit_keluarga'" :id="'riwayat_penyakit_keluarga'" :item="{
									  label: 'Riwayat Penyakit & Alergi Keluarga',
									  id: 'riwayat_penyakit_keluarga',
									  data: 'riwayat_penyakit_keluarga',
									  type: 'lookup-button',
									  validation: [],
									  value: mData.riwayat_penyakit_keluarga,
									  pointer: {
										label: 'label',
										code: 'code',
										display: ['label'],
										list: [{ label: 'Ada', code: 'Ada' }, { label: 'Tidak', code: 'Tidak' }, ]
									  },
									  param: {},
									}" :disabled="is_validasi" :valuee="mData.riwayat_penyakit_keluarga" />
					
									<s-input v-model="mData.riwayat_penyakit_keluarga_text" v-if="mData.riwayat_penyakit_keluarga === 'Ada'" :item="{
									  label: '',
									  placeholder: 'Keterangan',
									  id: 'riwayat_penyakit_keluarga_text',
									  data: 'riwayat_penyakit_keluarga_text',
									  value: mData.riwayat_penyakit_keluarga_text,
									  groupClass: 'mb-0',
									  type: 'text',
									  validation: [],
									  rows: 1,
									}" :disabled="is_validasi" :valuee="mData.riwayat_penyakit_keluarga_text" />
								  </div>
								  
								  <div style="flex-grow: 1;">
									<s-input v-model="mData.riwayat_alergi" :key="'riwayat_alergi'" :id="'riwayat_alergi'" :item="{
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
										list: [{ label: 'Ada', code: 'Ada' }, { label: 'Tidak', code: 'Tidak' }, ]
									  },
									  param: {},
									}" :disabled="is_validasi" :valuee="mData.riwayat_alergi" />
					
									<s-input v-model="mData.riwayat_alergi_text" v-if="mData.riwayat_alergi === 'Ada'" :item="{
									  label: '',
									  placeholder: 'Keterangan',
									  id: 'riwayat_alergi_text',
									  data: 'riwayat_alergi_text',
									  value: mData.riwayat_alergi_text,
									  groupClass: 'mb-0',
									  type: 'text',
									  validation: [],
									  rows: 1,
									}" :disabled="is_validasi" :valuee="mData.riwayat_alergi_text" />
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
		name: 'medis_subjective',
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