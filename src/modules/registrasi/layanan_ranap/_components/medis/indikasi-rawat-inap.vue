<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-indikasi-rawat-inap style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Indikasi Rawat Inap
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="accordion-indikasi-rawat-inap" v-model="collapse" accordion="accordion-indikasi-rawat-inap" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-12">
						<s-input v-model="mData.indikasi_ranap_inap" :item="{
							label: 'Indikasi Ranap Inap',
							id: 'indikasi_ranap_inap',
							data: 'indikasi_ranap_inap',
							value: mData.indikasi_ranap_inap,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.indikasi_ranap_inap" />
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
		name: 'indikasi-rawat-inap',
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