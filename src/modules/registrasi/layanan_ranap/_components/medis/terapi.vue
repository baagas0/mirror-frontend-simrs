<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-terapi style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Terapi
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="accordion-terapi" v-model="collapse" accordion="accordion-terapi" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-6">
						<s-input v-model="mData.terapi_obat_jadi" :item="{
							label: 'Terapi Obat Jadi',
							id: 'terapi_obat_jadi',
							data: 'terapi_obat_jadi',
							value: mData.terapi_obat_jadi,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.terapi_obat_jadi" />
					</div>
					<div class="col-6">
						<s-input v-model="mData.terapi_obat_racik" :item="{
							label: 'Terapi Obat Racik',
							id: 'terapi_obat_racik',
							data: 'terapi_obat_racik',
							value: mData.terapi_obat_racik,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.terapi_obat_racik" />
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
		name: 'terapi',
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
				collapse: false
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