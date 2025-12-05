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
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen()" :disabled="objectDataAssesmen.is_validasi">
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
		name: 'anamnesa',
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