<template>
	<div class="card card-custom card-sticky">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					Early Warning System <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<div class="btn-group">
					<!-- <button type="button" class="btn btn-primary" @click="$parent.updateAssesmen('ews', mData)">
						<i class="ri-save-line"></i>
						Simpan
					</button> -->
				</div>
			</div>
		</div>
		<div class="card-body">
			<div class="row">
				<!-- <div class="col-12 d-flex justify-content-center" style="flex-grow: 1;">
					<s-input v-model="mData.usia" :key="'usia'" :id="'usia'" :item="{
						label: '',
						id: 'usia',
						data: 'usia',
						type: 'lookup-button',
						validation: [],
						value: mData.usia,
						pointer: {
							label: 'label',
							code: 'code',
							display: ['label'],
							list: arr_ews
						},
						param: {},
					}" :valuee="mData.usia" />
				</div> -->

				<!-- <div class="col-12">
							<div class="card">
								<div class="card-body p-3">
									<div class="d-flex flex-row align-items-center justify-content-between">
										<div>
											<span class="font-weight-bolder text-dark-75 font-size-lg">LOW</span>
											<p class="mb-0">Pantau dan Periksa ulang skor EWS tiap 4 jam</p>
										</div>
										<div>
											<s-input v-model="mData.skor_ews" :key="'skor_ews'" :id="'skor_ews'" :item="{
												label: 'Skor EWS',
												id: 'skor_ews',
												data: 'skor_ews',
												type: 'number',
												groupClass: 'mb-0',
												validation: [],
												value: mData.skor_ews,
												param: {},
											}" :valuee="mData.skor_ews" />
										</div>
									</div>
								</div>
							</div> 
            </div> -->
				
				<div class="col-12">
					<div class="alert alert-custom alert-light-warning fade show mb-5" role="alert">
						<i class="ri-error-warning-line mr-3"></i>
						<div class="alert-text">Periksa EWS setiap 4 jam sekali</div>
					</div>
				</div>

				<div class="col-12 mt-3">
					<ValidationObserver v-slot="{ handleSubmit }">
						<form @submit.prevent="handleSubmit(onSubmitEws)" autocomplete="off">
							<div class="row">
								<div class="col-12">
									<s-input v-model="fData.tanggal" :key="'tanggal'" :id="'tanggal'" :item="{
										label: 'Tanggal & Waktu',
										id: 'tanggal',
										data: 'tanggal',
										type: 'datetime',
										validation: ['required'],
										value: fData.tanggal,
										formatDateView: 'DD MMM YYYY HH:mm',
									}" :valuee="dateToday" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.rr" :key="'rr'" :id="'rr'" :item="{
										label: 'Respiration Rate',
										id: 'rr',
										data: 'rr',
										type: 'lookup-radio',
										validation: [],
										value: fData.rr,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'rr')
										},
										param: {},
									}" :valuee="fData.rr" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.oxygen_saturations" :key="'oxygen_saturations'" :id="'oxygen_saturations'" :item="{
										label: 'Oxygen Saturation',
										id: 'oxygen_saturations',
										data: 'oxygen_saturations',
										type: 'lookup-radio',
										validation: [],
										value: fData.oxygen_saturations,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'oxygen_saturations')
										},
										param: {},
									}" :valuee="fData.oxygen_saturations" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.any_suplemental_oxygen" :key="'any_suplemental_oxygen'" :id="'any_suplemental_oxygen'" :item="{
										label: 'Any Suplemental Oxygen',
										id: 'any_suplemental_oxygen',
										data: 'any_suplemental_oxygen',
										type: 'lookup-radio',
										validation: [],
										value: fData.any_suplemental_oxygen,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'any_suplemental_oxygen')
										},
										param: {},
									}" :valuee="fData.any_suplemental_oxygen" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.temperature" :key="'temperature'" :id="'temperature'" :item="{
										label: 'Temperature',
										id: 'temperature',
										data: 'temperature',
										type: 'lookup-radio',
										validation: [],
										value: fData.temperature,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'temperature')
										},
										param: {},
									}" :valuee="fData.temperature" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.systolic_bp" :key="'systolic_bp'" :id="'systolic_bp'" :item="{
										label: 'Systolic BP',
										id: 'systolic_bp',
										data: 'systolic_bp',
										type: 'lookup-radio',
										validation: [],
										value: fData.systolic_bp,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'systolic_bp')
										},
										param: {},
									}" :valuee="fData.systolic_bp" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.heart_rate" :key="'heart_rate'" :id="'heart_rate'" :item="{
										label: 'Heart Rate',
										id: 'heart_rate',
										data: 'heart_rate',
										type: 'lookup-radio',
										validation: [],
										value: fData.heart_rate,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'heart_rate')
										},
										param: {},
									}" :valuee="fData.heart_rate" />
								</div>
								<div class="col-6">
									<s-input v-model="fData.level_of_consiousness" :key="'level_of_consiousness'" :id="'level_of_consiousness'" :item="{
										label: 'Level Of Consciousness',
										id: 'level_of_consiousness',
										data: 'level_of_consiousness',
										type: 'lookup-radio',
										validation: [],
										value: fData.level_of_consiousness,
										return_object: true,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: news_option.filter((x) => x.group === 'level_of_consiousness')
										},
										param: {},
									}" :valuee="fData.level_of_consiousness" />
								</div>
							</div>

							<!-- Submit -->
							<template>
								<div class="col-12 align-self-center p-0 mt-3">
									<button type="submit" class="btn btn-primary mr-3 w-100">
										<i class="ri-save-line"></i>
										Tambah
									</button>
								</div>
							</template>

						</form>
					</ValidationObserver>
				</div>

				<div class="col-12 mt-3">
					<div class="table-responsive">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th class="text-center">#</th>
									<th>Tanggal & Waktu</th>
									<th>Respiration Rate</th>
									<th>Oxygen Saturation</th>
									<th>Any Suplemental Oxygen </th>
									<th>Temperature</th>
									<th>Systolic BP </th>
									<th>Heart Rate </th>
									<th>Level Of Consciousness </th>
									<th>Score</th>
								</tr>
							</thead>
	
							<tbody>
								<tr v-if="mData && mData.data_ews && mData.data_ews.length" v-for="(item, index) in mData.data_ews" :key="'table-ews'+index">
									<td class="text-center">
										<button class="btn btn-danger btn-sm" @click="onDeleteEws(index)">
											<i class="ri-delete-bin-line"></i>
										</button>
									</td>
									<td>{{ item.tanggal | parse(longDateTime) }}</td>
									<td>{{ item.rr && item.rr.label ? item.rr.label : '-' }}</td>
									<td>{{ item.oxygen_saturations && item.oxygen_saturations.label ? item.oxygen_saturations.label : '-' }}</td>
									<td>{{ item.any_suplemental_oxygen && item.any_suplemental_oxygen.label ? item.any_suplemental_oxygen.label : '-' }}</td>
									<td>{{ item.temperature && item.temperature.label ? item.temperature.label : '-' }}</td>
									<td>{{ item.systolic_bp && item.systolic_bp.label ? item.systolic_bp.label : '-' }}</td>
									<td>{{ item.heart_rate && item.heart_rate.label ? item.heart_rate.label : '-' }}</td>
									<td>{{ item.level_of_consiousness && item.level_of_consiousness.label ? item.level_of_consiousness.label : '-' }}</td>
									<td>{{ item.score }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>
	
<script>
import moment from 'moment'
moment.locale('id')

export default {
	name: 'pemeriksaan_fisik',
	props: {
		is_validasi: {
			type: Boolean,
			required: true,
			default() {
				return false
			}
		},
		objectDataAssesmen: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		},
		dataRegistrasi: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		},
		mData: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			// eslint-disable-next-line standard/array-bracket-even-spacing
			arr_ews: [
				{ label: 'NEWS', code: 'NEWS' },
				// { label: 'PEWS', code: 'PEWS' }, 
				// { label: 'NEWTT', code: 'NEWTT' }, 
				// { label: 'MEOWS', code: 'MEOWS' } 
			],

			dateToday: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
			news_option: [
				{ group: 'rr', code: 'form_rr_1', value: 3, label: '≤ 8' },
				{ group: 'rr', code: 'form_rr_2', value: 1, label: '9 - 11' },
				{ group: 'rr', code: 'form_rr_3', value: 0, label: '12 - 20' },
				{ group: 'rr', code: 'form_rr_4', value: 2, label: '21 - 24' },
				{ group: 'rr', code: 'form_rr_5', value: 3, label: '≥ 25' },

				{ group: 'oxygen_saturations', code: 'form_oxygen_saturations_1', value: 3, label: '≤ 91' },
				{ group: 'oxygen_saturations', code: 'form_oxygen_saturations_2', value: 2, label: '92 - 93' },
				{ group: 'oxygen_saturations', code: 'form_oxygen_saturations_3', value: 1, label: '94 - 95' },
				{ group: 'oxygen_saturations', code: 'form_oxygen_saturations_4', value: 0, label: '≥ 96' },

				{ group: 'any_suplemental_oxygen', code: 'form_any_suplemental_oxygen_1', value: 2, label: 'Yes' },
				{ group: 'any_suplemental_oxygen', code: 'form_any_suplemental_oxygen_2', value: 0, label: 'No' },

				{ group: 'temperature', code: 'form_temperature_1', value: 3, label: '≤ 35.0' },
				{ group: 'temperature', code: 'form_temperature_2', value: 1, label: '35.1 - 36.0' },
				{ group: 'temperature', code: 'form_temperature_3', value: 0, label: '36.1 - 38.0' },
				{ group: 'temperature', code: 'form_temperature_4', value: 1, label: '38.1 - 39.0' },
				{ group: 'temperature', code: 'form_temperature_5', value: 2, label: '≥ 39.1' },

				{ group: 'systolic_bp', code: 'form_systolic_bp_1', value: 3, label: '≤ 90' },
				{ group: 'systolic_bp', code: 'form_systolic_bp_2', value: 2, label: '91 - 100' },
				{ group: 'systolic_bp', code: 'form_systolic_bp_3', value: 1, label: '101 - 110' },
				{ group: 'systolic_bp', code: 'form_systolic_bp_4', value: 0, label: '111 - 219' },
				{ group: 'systolic_bp', code: 'form_systolic_bp_5', value: 3, label: '≥ 220' },

				{ group: 'heart_rate', code: 'form_heart_rate_1', value: 3, label: '≤ 40' },
				{ group: 'heart_rate', code: 'form_heart_rate_2', value: 1, label: '41 - 50' },
				{ group: 'heart_rate', code: 'form_heart_rate_3', value: 0, label: '51 - 90' },
				{ group: 'heart_rate', code: 'form_heart_rate_4', value: 1, label: '91 - 110' },
				{ group: 'heart_rate', code: 'form_heart_rate_5', value: 2, label: '111 - 130' },
				{ group: 'heart_rate', code: 'form_heart_rate_6', value: 3, label: '≥ 131' },

				{ group: 'level_of_consiousness', code: 'form_level_of_consiousness_5',  value: 0, label: 'A' },
				{ group: 'level_of_consiousness', code: 'form_level_of_consiousness_5',  value: 3, label: 'V, P, or U' },
			],
			fData: {
				tanggal: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
				rr: {},
				oxygen_saturations: {},
				any_suplemental_oxygen: {},
				temperature: {},
				systolic_bp: {},
				heart_rate: {},
				level_of_consiousness: {},
				score: 0,
			}
		}
	},
	watch: {
		mData: {
			deep: true,
			immediate: false,
			handler(to, from) {
				this.$emit('dataChange', true)
			}
		}
	},
	mounted() {
	},
	methods: {
		onSubmitEvaluasi() {
			this.$emit('submit', { key: 'subjective', data: this.mData })
		},
		reset() {
			this.fData = {
				tanggal: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
				rr: {},
				oxygen_saturations: {},
				any_suplemental_oxygen: {},
				temperature: {},
				systolic_bp: {},
				heart_rate: {},
				level_of_consiousness: {},
				score: 0,
			}
		},
		onSubmitEws() {
			let score = 0
			if (this.fData.rr && this.fData.rr.value) score += this.fData.rr.value
			if (this.fData.oxygen_saturations && this.fData.oxygen_saturations.value) score += this.fData.oxygen_saturations.value
			if (this.fData.any_suplemental_oxygen && this.fData.any_suplemental_oxygen.value) score += this.fData.any_suplemental_oxygen.value
			if (this.fData.temperature && this.fData.temperature.value) score += this.fData.temperature.value
			if (this.fData.systolic_bp && this.fData.systolic_bp.value) score += this.fData.systolic_bp.value
			if (this.fData.heart_rate && this.fData.heart_rate.value) score += this.fData.heart_rate.value
			if (this.fData.level_of_consiousness && this.fData.level_of_consiousness.value) score += this.fData.level_of_consiousness.value

			this.fData.score = score
			this.mData.data_ews.push(this.fData);
			this.$emit('submit', { key: 'ews', data: this.mData })
			this.reset();

		},
		onDeleteEws(index) {
			this.$_alert.confirm('Anda yakin ingin menghapus data?').then((res) => {
				if(res.isConfirmed) {
					this.mData.data_ews.splice(index, 1)
					this.$emit('submit', { key: 'ews', data: this.mData })
				}
			})
		}
	}
}
</script>