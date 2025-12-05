<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-tindakan
			style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Tindakan
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
			</div>
		</b-card-header>
		<b-collapse id="accordion-tindakan" v-model="collapse" accordion="accordion-tindakan" role="tabpanel">
			<b-card-body>
				<div class="row">
					<!-- Tindakan ------------------------------------------------------------------------------------------------------- -->
					<div class="col-12">
						<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
							<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-tindakan-procedure
								style="min-height: 0px; background-color: #bfb36d; border-radius: 10px 10px 0px 0px;">
								<div class="card-title" style="padding: 0.7rem 1rem;">
									<h4 class="card-label">
										Prosedur
									</h4>
								</div>
								<div class="card-toolbar" style="margin: .5rem 1rem;">
									<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
									<i class="ri-arrow-right-double-line text-white" v-else></i>
								</div>
							</b-card-header>
							<b-collapse id="accordion-tindakan-procedure" v-model="collapse_procedure"
								accordion="accordion-tindakan-procedure" role="tabpanel">
								<b-card-body>
									<div class="row">
										<div class="col-12">
											<ValidationObserver v-slot="{ handleSubmit }">
												<form @submit.prevent="handleSubmit(submitProcedure)" autocomplete="off">
													<div class="row">
														<div class="col-6">
															<s-input v-model="fProcedure.tipe_procedure" :key="'tipe_procedure'" :id="'tipe_procedure'"
																:item="{
																	label: 'Tipe Procedure',
																	id: 'tipe_procedure',
																	data: 'tipe_procedure',
																	type: 'lookup-radio',
																	validation: [],
																	value: fProcedure.tipe_procedure,
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
																}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)"
																:valuee="fProcedure.tipe_procedure" />
														</div>
														<div class="col-6">
															<s-input v-model="fProcedure.tindakan" :key="'tindakan'" :id="'tindakan'" :item="{
																label: 'Tindakan',
																id: 'tindakan',
																data: 'tindakan',
																type: 'lookup-radio',
																validation: [],
																value: fProcedure.tindakan,
																api: 'msJasa',
																return_object: true,
																pointer: {
																	label: 'nama_jasa',
																	code: 'ms_jasa_id',
																	display: ['nama_jasa']
																},
																param: {},
															}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)"
																:valuee="fProcedure.tindakan" />
														</div>
														<div class="col-6">
															<s-input v-model="fProcedure.procedure" :key="'procedure'" :id="'procedure'" :item="{
																label: 'Procedure',
																id: 'procedure',
																data: 'procedure',
																type: 'text',
																validation: [],
																value: fProcedure.procedure,
																param: {},
															}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)"
																:valuee="fProcedure.procedure" />
														</div>
														<div class="col-6">
															<s-input v-model="fProcedure.keterangan" :key="'keterangan'" :id="'keterangan'" :item="{
																label: 'Keterangan',
																id: 'keterangan',
																data: 'keterangan',
																type: 'text',
																validation: [],
																value: fProcedure.keterangan,
																param: {},
															}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)"
																:valuee="fProcedure.keterangan" />
														</div>
														<div class="col-12 align-self-center">
															<button type="reset" class="btn btn-light-danger mr-3">
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
														<th>Tipe Prosedur</th>
														<th>Prosedur</th>
														<th>Tindakan</th>
														<th>Keterangan</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, i) in mData.prosedur" :key="'table-prosedur' + i">
														<td>
															<a @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2"
																:class="{ 'disabled': objectDataAssesmen.is_validasi }">
																<i class="ri-delete-bin-line"></i>
															</a>
														</td>
														<td>{{ item.tipe_procedure || '-' }}</td>
														<!-- <td>{{ item.procedure || '-'  }}</td> -->
														<td>
															{{ typeof item.procedure == 'object' ? (item.procedure && item.procedure.nama_prosedur ?
																`${item.procedure.kode_prosedur} - ${item.procedure.nama_prosedur}` : '-') : item.procedure
															}}
														</td>
														<td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : '-' }}</td>
														<td>{{ item.keterangan || '-' }}</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</b-card-body>
							</b-collapse>
						</b-card>
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
	name: 'tindakan',
	props: {
		objectDataAssesmen: {
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
			// mData: {}
			collapse: false,
			collapse_procedure: true,
			collapse_obat_jadi: false,

			fProcedure: {},
			fObatJadi: {}
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
		submitProcedure() {
			this.mData.prosedur.push(this.fProcedure)
			this.fProcedure = {}
		},
		onDelete(index) {
			this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
				if (status.isDismissed) return
				else {
					this.mData.prosedur.splice(index, 1)
					// this.$emit('submit', { key: 'tindakan', data: this.mData })
				}
			});
		},
		onSubmit() {
			this.$emit('submit', { key: 'tindakan', data: this.mData })
		}
	}
}
</script>