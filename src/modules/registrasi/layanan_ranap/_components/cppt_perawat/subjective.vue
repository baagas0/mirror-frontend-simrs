<template>
	<div class="card card-custom card-sticky mb-5">
		<div class="card-header min-h-50px">
			<div class="card-title">
				<h3 class="card-label">
					Form Subjective <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar mx-5">
				<!-- <button class="btn btn-light-primary mr-2" @click="$parent.doValidasi()">
					<i class="ki ki-check icon-sm"></i>
					Validasi Assesmen
				</button> -->
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen()">
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
						<div class="col-12">
							<s-input v-model="mData.subjective" :item="{
								label: ' ',
								id: 'subjective',
								data: 'subjective',
								value: mData.subjective,
								type: 'textarea',
								placeholder: 'Subjective',
								validation: [],
							}" :valuee="mData.subjective" />
						</div>
					</div>
					<!-- <template>
						<div class="col-12 align-self-center p-0">
							<button type="submit" class="btn btn-light-primary mr-3">
								<i class="ri-save-line"></i>
								{{ $t('global.submit') }}
							</button>
						</div>
					</template> -->
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>
	
<script>
import moment from 'moment'
moment.locale('id')

export default {
	name: 'medis_subjective',
	props: {
		dataRegistrasi: {
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
		tesss () {
			console.log(this.$parent)
		},
		onSubmitEvaluasi() {
			this.$emit('submit', { key: 'subjective', data: this.mData })
		}
	}
}
</script>