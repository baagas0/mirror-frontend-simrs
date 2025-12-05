<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.triage style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Triage
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="triage" v-model="collapse" accordion="accordion-triage" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-12">
						<s-input v-model="mData.dikirim_oleh" :item="{
							label: 'Dikirim Oleh',
							id: 'dikirim_oleh',
							data: 'dikirim_oleh',
							type: 'lookup-button',
							validation: [],
							value: mData.dikirim_oleh,
							pointer: {
								label: 'label',
								code: 'code',
								display: ['label'],
								list: [
									{ label: 'Rumah Sakit', code: 'Rumah Sakit' },
									{ label: 'PPK1', code: 'PPK1' },
									{ label: 'Sendiri', code: 'Sendiri' },
								]
							},
							param: {},
						}" :valuee="mData.dikirim_oleh" />
					</div>
					<div class="col-12">
						<s-input groupClass="mb-0" v-model="mData.ms_bed_id" :item="{
							label: 'Bed',
							id: 'bed_id',
							data: 'bed_id',
							type: 'lookup-radio',
							api: 'msbed',
							getter: 'msbed',
							setter: 'msbed',
							validation: [],
							no_data_message: 'Data tidak tersedia / Bed sedang penuh',
							pointer: {
								label: 'nama_bed',
								code: 'ms_bed_id',
								display: ['nama_jenis_layanan', 'nama_kamar', 'nama_bed'],
								headerDisplay: ['Nama Layanan', 'Nama Kamar', 'Nama Bed'],
								mainParam: 'nama_bed',
							},
							param: {
								kode_jenis_layanan:'IGD',
								isAvailable:1
							}
						}" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.cara_datang" :item="{
							label: 'Cara Datang',
							id: 'cara_datang',
							data: 'cara_datang',
							type: 'lookup-button',
							validation: [],
							value: mData.cara_datang,
							pointer: {
								label: 'label',
								code: 'code',
								display: ['label'],
								list: [
									{ label: 'Berjalan', code: 'Berjalan' },
									{ label: 'Kursi Roda', code: 'Kursi Roda' },
									{ label: 'Brankar', code: 'Brankar' },
									{ label: 'Digendong', code: 'Digendong' },
								]
							},
							param: {},
						}" :valuee="mData.cara_datang" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.kasus_polisi" :item="{
							label: 'Kasus Polisi',
							id: 'kasus_polisi',
							data: 'kasus_polisi',
							type: 'lookup-button',
							validation: [],
							value: mData.kasus_polisi,
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
						}" :valuee="mData.kasus_polisi" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.pasien" :item="{
							label: 'Pasien',
							id: 'pasien',
							data: 'pasien',
							type: 'lookup-button',
							validation: [],
							value: mData.pasien,
							pointer: {
								label: 'label',
								code: 'code',
								display: ['label'],
								list: [
									{ label: 'Lama', code: 'Lama' },
									{ label: 'Baru', code: 'Baru' },
								]
							},
							param: {},
						}" :valuee="mData.pasien" />
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
		name: 'triage',
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
				collapse: true
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
			onSubmit () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			}
		}
	}
</script>