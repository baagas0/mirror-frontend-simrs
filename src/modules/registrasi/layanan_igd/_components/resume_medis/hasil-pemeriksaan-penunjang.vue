<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-hasil-pemeriksaan-penunjang style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Hasil Pemeriksaan Penunjang
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="accordion-hasil-pemeriksaan-penunjang" v-model="collapse" accordion="accordion-hasil-pemeriksaan-penunjang" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-12">
						<!-- <pre>{{ objectDataAssesmen }}</pre> -->
					</div>
					<div class="col-12">
						<div class="d-flex w-100 align-items-center justify-content-between mb-2">

							<h5 class="">Hasil Laboratorium</h5>
							<button class="btn btn-primary" @click="sync(true)" hidden>
								<i class="ri-loop-right-line"></i>
								Sync
							</button>
						</div>
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Tanggal</th>
									<th>Nama Tes</th>
									<th>Hasil</th>
									<th>Satuan</th>
									<th>Nilai Normal</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, i) in lab_hasil" :key="'hasil-pem-penunjang-lab_hasil'+i">
									<td>{{ i+1 }}</td>
									<td>{{ item.tanggal_request | parse('date') }}</td>
									<td>{{ item.nama_penunjang }}</td>
									<td>{{ item.hasil || '-' }}</td>
									<td>{{ item.satuan || '-' }}</td>
									<td>{{ item.parameter_normal || '-' }}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-12 mt-3">
						<h5 class="">Hasil Radiologi</h5>
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Tanggal</th>
									<th>Nama Tes</th>
									<th>Hasil</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, i) in hasil_radiologi" :key="'hasil-pem-penunjang-lab_hasil'+i">
									<td>{{ i+1 }}</td>
									<td>{{ item.tanggal_request | parse('date') }}</td>
									<td>{{ item.nama_penunjang }}</td>
									<td>{{ item.hasil || '-' }}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-12 mt-3">
						<div class="row">
							<!-- <div class="col-6">
								<s-input v-model="mData.radiologi" :item="{
									label: 'Radiologi',
									id: 'radiologi',
									data: 'radiologi',
									value: mData.radiologi,
									type: 'textarea',
									validation: [],
									rows: 1,
								}" :valuee="mData.radiologi" />
							</div> -->
							<div class="col-12">
								<s-input v-model="mData.diagnostik_medis" :item="{
									label: 'Diagnostik Medis',
									id: 'diagnostik_medis',
									data: 'diagnostik_medis',
									value: mData.diagnostik_medis,
									type: 'textarea',
									validation: [],
									rows: 1,
								}" :valuee="mData.diagnostik_medis" />
							</div>
						</div>
					</div>
					<div class="col-12">
						<s-input v-model="mData.penunjang_luar" :item="{
							label: 'Penunjang Luar',
							id: 'penunjang_luar',
							data: 'penunjang_luar',
							value: mData.penunjang_luar,
							type: 'textarea',
							validation: [],
							rows: 1,
						}" :valuee="mData.penunjang_luar" />
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
		name: 'pemeriksaan-fisik',
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

				lab_busy: false,
				lab_hasil: [],
				hasil_radiologi: [],
				rad_hasil_text: ''
			}
		},
		watch: {
		},
		mounted () {
			this.getData()
		},
		methods: {
			onSubmit () {
				console.log('diupdateeeeeeee')
				this.$emit('submit', { key: 'subjective', data: this.mData })
			},
			getData() {
				this.$_api.list('lab_hasil', { registrasi_id: this.objectDataAssesmen.registrasi_id }).then((res) => {
					this.lab_hasil = res.data
					this.mData.lab_hasil = this.lab_hasil
					this.lab_busy = false
					this.mData.lab_hasil = this.lab_hasil
				}).catch((err) => {
				})

				this.$_api.list('rad_hasil', { registrasi_id: this.objectDataAssesmen.registrasi_id }).then((res) => {
					this.mData.radiologi_array = res.data

					this.hasil_radiologi = res.data
					this.mData.hasil_radiologi = this.hasil_radiologi
				})
			},
		}
	}
</script>