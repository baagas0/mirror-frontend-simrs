<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-assesmen-diagnosa style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Diagnosa
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="accordion-assesmen-diagnosa" v-model="collapse_diagnosa" accordion="accordion-assesmen-diagnosa" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-12">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form @submit.prevent="handleSubmit(submitDiagnosa)" autocomplete="off">
								<div class="row">
									<div class="col-6">
										<s-input v-model="fData.tipe_diagnosa" :key="'tipe_diagnosa'" :id="'tipe_diagnosa'" :item="{
											label: 'Tipe Diagnosa',
											id: 'tipe_diagnosa',
											data: 'tipe_diagnosa',
											type: 'lookup-radio',
											validation: [],
											value: fData.tipe_diagnosa,
											pointer: {
												label: 'label',
												code: 'code',
												display: ['label'],
												list: [
													{ label: 'ICD', code: 'ICD' },
													{ label: 'Non ICD', code: 'Non ICD' },
												]
											},
											param: {},
										}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="fData.tipe_diagnosa" />
									</div>
									<div class="col-6" v-if="fData.tipe_diagnosa === 'ICD'">
										<s-input v-model="fData.diagnosa" :key="'diagnosa'" :id="'diagnosa'" :item="{
											label: 'Diagnosa',
											id: 'diagnosa',
											data: 'diagnosa',
											type: 'lookup-radio',
											validation: fData.tipe_diagnosa === 'ICD' ? [] : [],
											value: fData.diagnosa,
											return_object: true,
											api: 'ms_diagnosa',
											pointer: {
												label: 'nama_diagnosa',
												code: 'id',
												display: ['kode_diagnosa', 'nama_diagnosa'],
												headerDisplay: ['Kode', 'Nama']
											},
											param: {},
										}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="fData.diagnosa_medis" />
									</div>
									<div class="col-6" v-else>
										<s-input v-model="fData.diagnosa" :key="'diagnosa'" :id="'diagnosa'" :item="{
											label: 'Diagnosa',
											id: 'diagnosa',
											data: 'diagnosa',
											type: 'text',
											validation: [],
											value: fData.diagnosa,
											param: {},
										}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="fData.diagnosa" />
									</div>
									<div class="col-12">
										<s-input v-model="fData.keterangan" :key="'keterangan'" :id="'keterangan'" :item="{
											label: 'Keterangan',
											id: 'keterangan',
											data: 'keterangan',
											type: 'text',
											validation: [],
											value: fData.keterangan,
											param: {},
										}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="fData.keterangan" />
									</div>
									<div class="col-12 align-self-center">
										<button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
											<i class="ri-loop-right-fill"></i>
											Reset
										</button>
										<button type="submit" class="btn btn-light-primary mr-3">
											<i class="ri-save-line"></i>
											{{ $t('global.submit') }}
										</button>
									</div>
								</div>
							</form>
						</ValidationObserver>
					</div>
					<div class="col-12">
						<hr>
					</div>
					<div class="col-12">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Tipe Diagnosa</th>
									<th>Diagnosa</th>
									<th>Keterangan</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="mData && mData.diagnosa" v-for="(item, i) in mData.diagnosa" :key="'table'+i">
									<td>              
										<a @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ 'disabled': objectDataAssesmen.is_validasi }">
											<i class="ri-delete-bin-line"></i>
										</a>
									</td>
									<td>{{ item.tipe_diagnosa || '-'  }}</td>
									<td>{{ typeof item.diagnosa == 'object' ? (item.diagnosa && item.diagnosa.nama_diagnosa ? item.diagnosa.nama_diagnosa : '-') : item.diagnosa }}</td>
									<td>{{ item.keterangan || '-'  }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
	
<script>
	import moment from 'moment'
	moment.locale('id')
	
	export default {
		name: 'assesmen',
		props: {
			objectDataAssesmen: {
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
				collapse: false,
				collapse_diagnosa: true,

				fData: {}
			}
		},
		watch: {
			mData: {
				deep: true,
				immediate: false,
				handler (to, from) {
					this.$emit('dataChange', true)
				}
			},
			'fData.tipe_diagnosa': {
				handler(to, from) {
					console.log('to',to)
					if (to !== from) {
						if (to === 'ICD') this.fData.diagnosa = {}
						else if (to === 'Non ICD') this.fData.diagnosa = ''
					}
				}
			}
		},
		mounted () {
		},
		methods: {
			submitDiagnosa () {
				console.log('submitDiagnosa', this.mData.diagnosa)
				this.mData.diagnosa.push(this.fData)
				this.fData = {
					tipe_diagnosa: '',
					diagnosa: '',
					keterangan: '',
				}
			},
			onDelete (index) {
				this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
					if (status.isDismissed) return
					else {
						this.mData.diagnosa.splice(index, 1)
						// this.$emit('submit', { key: 'tindakan', data: this.mData })
					}
				});
			},
			onSubmit () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			}
		}
	}
</script>