<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.accordion-pemeriksaan-fisik style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Pemeriksaan Fisik
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="accordion-pemeriksaan-fisik" v-model="collapse" accordion="accordion-pemeriksaan-fisik" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-6">
						<s-input v-model="mData.pemeriksaan_fisik" :item="{
							label: 'Pemeriksaan Fisik',
							id: 'pemeriksaan_fisik',
							data: 'pemeriksaan_fisik',
							value: mData.pemeriksaan_fisik,
							type: 'textarea',
							validation: [],
							
						}" :valuee="mData.pemeriksaan_fisik" />
					</div>
					<div class="col-6">
						<s-input v-model="mData.tanda_tanda_vital" :item="{
							label: 'Tanda Tanda Vital',
							id: 'tanda_tanda_vital',
							data: 'tanda_tanda_vital',
							value: mData.tanda_tanda_vital,
							type: 'textarea',
							validation: [],
							
						}" :valuee="mData.tanda_tanda_vital" />
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