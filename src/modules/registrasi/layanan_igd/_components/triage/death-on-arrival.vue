<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.death-on-arrival style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Death On Arrival
				</h4>
				<span class="badge badge-sm badge-danger" v-if="mData.death_on_arrival == 'Ya'">Meninggal ({{ mData.tanggal_meninggal | parse('longDateTime') }})</span>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="death-on-arrival" v-model="collapse" accordion="accordion-death-on-arrival" role="tabpanel">
			<b-card-body>
				<div class="row">
					<!-- <div class="col-12">
						<s-input v-model="mData.death_on_arrival" :item="{
							label: '',
							id: 'death_on_arrival',
							data: 'death_on_arrival',
							type: 'lookup-button',
							validation: [],
							value: mData.death_on_arrival,
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
						}" :valuee="mData.death_on_arrival" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.kategori_mati" :item="{
							label: 'Kategori Meninggal',
							id: 'kategori_mati',
							data: 'kategori_mati',
							type: 'lookup-radio',
							validation: [],
							value: mData.kategori_mati,
							pointer: {
								label: 'label',
								code: 'code',
								display: ['label'],
								list: [
									{ label: 'Tidak ada denyut nadi', code: 'Tidak ada denyut nadi' },
									{ label: 'Ekg flat. Rc (-/-)', code: 'Ekg flat. Rc (-/-)' },
									{ label: 'Tidak ada gerakan dada', code: 'Tidak ada gerakan dada' },
								]
							},
							param: {},
						}" :valuee="mData.kategori_mati" />
					</div> -->

					<div class="col-12">
						<b-form-group label="Kategori Meninggal:">
							<b-form-checkbox-group
								id="kategori_meninggal"
								v-model="mData.kategori_meninggal"
								size="lg"
								:options="[
									{ text: 'Tidak ada denyut nadi', value: 'Tidak ada denyut nadi' },
									{ text: 'Ekg flat. Rc (-/-)', value: 'Ekg flat. Rc (-/-)' },
									{ text: 'Tidak ada gerakan dada', value: 'Tidak ada gerakan dada' },
								]"
								name="kategori_meninggal"
							></b-form-checkbox-group>
						</b-form-group>
					</div>
					<div class="col-12" v-if="mData.death_on_arrival == 'Ya'">
						<s-input v-model="mData.tanggal_meninggal" :item="{
							label: 'Tanggal Meninggal',
							id: 'tanggal_meninggal',
							data: 'tanggal_meninggal',
							type: 'datetime',
							validation: [],
							value: mData.tanggal_meninggal,
						}" :valuee="mData.tanggal_meninggal" />
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
		name: 'death-on-arrival',
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
			},
			'mData.kategori_meninggal': {
				handler (to, from) {
					if (this.mData.kategori_meninggal && this.mData.kategori_meninggal.length && this.mData.kategori_meninggal.length === 3) this.mData.death_on_arrival = 'Ya'
					else this.mData.death_on_arrival = 'Tidak'
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