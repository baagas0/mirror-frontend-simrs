<template>
	<div class="card card-custom card-sticky">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					Lapor DPJP <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen('lapor_dpjb', mData)">
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
							<div class="card">
								<div class="card-header p-4">
									<div class="card-title mb-0">
										<h5 class="card-label mb-0">Lapor DPJP 1</h5>
									</div>
								</div>
								<div class="card-body p-4">
									<div class="row">
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp1_dokter_id" :item="{
												label: 'DPJP (Dokter)',
												id: 'lapor_dpjp1_dokter_id',
												data: 'lapor_dpjp1_dokter_id',
												value: mData.lapor_dpjp1_dokter_id,
												type: 'select',
												validation: [],
												api: 'msDokter',
												pointer: {
													label: 'nama_dokter',
													code: 'ms_dokter_id'
												},
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp1_dokter_id" />
										</div>
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp1_saran" :item="{
												label: 'DPJP (Dokter)',
												id: 'lapor_dpjp1_saran',
												data: 'lapor_dpjp1_saran',
												value: mData.lapor_dpjp1_saran,
												type: 'select',
												validation: [],
												pointer: {
													label: 'label',
													code: 'code',
													list: [
														{ label: 'Rawat Inap', code: 'Rawat Inap' },
														{ label: 'Rawat Jalan', code: 'Rawat Jalan' },
													]
												},
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp1_saran" />
										</div>
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp1_keterangan" :item="{
												label: 'Keterangan',
												id: 'lapor_dpjp1_keterangan',
												data: 'lapor_dpjp1_keterangan',
												value: mData.lapor_dpjp1_keterangan,
												type: 'text',
												validation: [],
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp1_keterangan" />
										</div>
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp1_terapi_pemeriksaan_penunjang" :item="{
												label: 'Terapi & Pemeriksaan Penunjang',
												id: 'lapor_dpjp1_terapi_pemeriksaan_penunjang',
												data: 'lapor_dpjp1_terapi_pemeriksaan_penunjang',
												value: mData.lapor_dpjp1_terapi_pemeriksaan_penunjang,
												type: 'textarea',
												validation: [],
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp1_terapi_pemeriksaan_penunjang" />
										</div>
									</div>
								</div>
							</div>
						</div>
            
						<div class="col-6">
							<div class="card">
								<div class="card-header p-4">
									<div class="card-title mb-0">
										<h5 class="card-label mb-0">Lapor DPJP 2</h5>
									</div>
								</div>
								<div class="card-body p-4">
									<div class="row">
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp2_dokter_id" :item="{
												label: 'DPJP (Dokter)',
												id: 'lapor_dpjp2_dokter_id',
												data: 'lapor_dpjp2_dokter_id',
												value: mData.lapor_dpjp2_dokter_id,
												type: 'select',
												validation: [],
												api: 'msDokter',
												pointer: {
													label: 'nama_dokter',
													code: 'ms_dokter_id'
												},
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp2_dokter_id" />
										</div>
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp2_saran" :item="{
												label: 'DPJP (Dokter)',
												id: 'lapor_dpjp2_saran',
												data: 'lapor_dpjp2_saran',
												value: mData.lapor_dpjp2_saran,
												type: 'select',
												validation: [],
												pointer: {
													label: 'label',
													code: 'code',
													list: [
														{ label: 'Rawat Inap', code: 'Rawat Inap' },
														{ label: 'Rawat Jalan', code: 'Rawat Jalan' },
													]
												},
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp2_saran" />
										</div>
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp2_keterangan" :item="{
												label: 'Keterangan',
												id: 'lapor_dpjp2_keterangan',
												data: 'lapor_dpjp2_keterangan',
												value: mData.lapor_dpjp2_keterangan,
												type: 'text',
												validation: [],
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp2_keterangan" />
										</div>
										<div class="col-12">
											<s-input v-model="mData.lapor_dpjp2_terapi_pemeriksaan_penunjang" :item="{
												label: 'Terapi & Pemeriksaan Penunjang',
												id: 'lapor_dpjp2_terapi_pemeriksaan_penunjang',
												data: 'lapor_dpjp2_terapi_pemeriksaan_penunjang',
												value: mData.lapor_dpjp2_terapi_pemeriksaan_penunjang,
												type: 'textarea',
												validation: [],
												rows: 1,
											}" :disabled="is_validasi" :valuee="mData.lapor_dpjp2_terapi_pemeriksaan_penunjang" />
										</div>
									</div>
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