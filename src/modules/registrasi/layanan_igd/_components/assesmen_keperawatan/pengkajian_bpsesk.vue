<template>
	<div class="card card-custom card-sticky">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					Pengkajian Bio Psiko Sosial Ekonomi Spiritual Kultural <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen({key:'pengkajian_bpsesk', data:mData})" :disabled="objectDataAssesmen.is_validasi">
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
              <s-input v-model="mData.aspek_biologis" :item="{
                label: 'Aspek Biologis',
                id: 'aspek_biologis',
                data: 'aspek_biologis',
                value: mData.aspek_biologis,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.aspek_biologis" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.aspek_psikologis" :item="{
                label: 'Aspek Psikologis',
                id: 'aspek_psikologis',
                data: 'aspek_psikologis',
                value: mData.aspek_psikologis,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.aspek_psikologis" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.aspek_kultural" :item="{
                label: 'Aspek Kultural',
                id: 'aspek_kultural',
                data: 'aspek_kultural',
                value: mData.aspek_kultural,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.aspek_kultural" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.aspek_sosial" :item="{
                label: 'Aspek Sosial',
                id: 'aspek_sosial',
                data: 'aspek_sosial',
                value: mData.aspek_sosial,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.aspek_sosial" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.aspek_ekonomis" :item="{
                label: 'Aspek Ekonomis',
                id: 'aspek_ekonomis',
                data: 'aspek_ekonomis',
                value: mData.aspek_ekonomis,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.aspek_ekonomis" />
            </div>
            <div class="col-6">
              <s-input v-model="mData.aspek_spiritual" :item="{
                label: 'Aspek Spiritual',
                id: 'aspek_spiritual',
                data: 'aspek_spiritual',
                value: mData.aspek_spiritual,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.aspek_spiritual" />
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