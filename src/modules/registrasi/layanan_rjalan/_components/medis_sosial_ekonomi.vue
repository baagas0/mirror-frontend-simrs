<template>
  <div class="card card-custom">
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <b-form-group label="Status Pernikahan" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="status_pernikahan"
                  v-model="mData.status_pernikahan"
                  :options="[
                    { text: 'Belum Nikah', value: 'belum_nikah' },
                    { text: 'Menikah', value: 'menikah' },
                    { text: 'Cerai', value: 'cerai' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="status_pernikahan"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12">
              <b-form-group label="Hubungan pasien dengan anggota keluarga" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="hubungan_keluarga"
                  v-model="mData.hubungan_keluarga"
                  :options="[
                    { text: 'Baik', value: 'baik' },
                    { text: 'Tidak Baik', value: 'tidak_baik' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="hubungan_keluarga"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12">
              <b-form-group label="Tempat Tinggal" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="tempat_tinggal"
                  v-model="mData.tempat_tinggal"
                  :options="[
                    { text: 'Rumah Sendiri', value: 'rumah_sendiri' },
                    { text: 'Rumah Keluarga', value: 'rumah_keluarga' },
                    { text: 'Panti', value: 'panti' },
                    { text: 'Lain Lain', value: 'lain_lain' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="tempat_tinggal"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12" v-if="mData.tempat_tinggal === 'lain_lain'">
              <s-input v-model="mData.tempat_tinggal_lain_lain" :item="{
                label: 'lain Lain',
                id: 'tempat_tinggal_lain_lain',
                data: 'tempat_tinggal_lain_lain',
                type: 'text',
                validation: [],
                value: mData.tempat_tinggal_lain_lain,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.tempat_tinggal_lain_lain" />
            </div>
          </div>
          <template>
            <div class="col-12 align-self-center p-0">
              <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                <i class="ri-save-line"></i>
                {{ $t('global.submit') }}
              </button>
            </div>
          </template>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
  
<script>
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'keperawatan_planning',
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
        // console.log(data)
        this.$emit('submit', { key: 'planning', data: this.mData })
      }
    }
  }
</script>