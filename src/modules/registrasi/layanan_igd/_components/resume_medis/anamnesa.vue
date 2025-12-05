<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.anamnesa style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Anamnesa
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="anamnesa" v-model="collapse" accordion="accordion-anamnesa" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-6">
						<s-input v-model="mData.anamnesa" :item="{
							label: 'Anamnesa',
							id: 'anamnesa',
							data: 'anamnesa',
							value: mData.anamnesa,
							type: 'textarea',
							validation: [],
							rows: 1,
						}" :valuee="mData.anamnesa" />
					</div>
					<div class="col-6">
						<s-input v-model="mData.keluhan_utama" :item="{
							label: 'Keluhan Utama',
							id: 'keluhan_utama',
							data: 'keluhan_utama',
							value: mData.keluhan_utama,
							type: 'textarea',
							validation: [],
							rows: 1,
						}" :valuee="mData.keluhan_utama" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.riwayat_penyakit_saat_ini" :item="{
							label: 'Riwayat Penyakit Sekarang',
							id: 'riwayat_penyakit_saat_ini',
							data: 'riwayat_penyakit_saat_ini',
							value: mData.riwayat_penyakit_saat_ini,
							type: 'textarea',
							validation: [],
							rows: 1,
						}" :valuee="mData.riwayat_penyakit_saat_ini" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.riwayat_kesehatan" :item="{
							label: 'Riwayat Kesehatan',
							id: 'riwayat_kesehatan',
							data: 'riwayat_kesehatan',
							value: mData.riwayat_kesehatan,
							type: 'textarea',
							validation: [],
							rows: 1,
						}" :valuee="mData.riwayat_kesehatan" />
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
		name: 'anamnesa',
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