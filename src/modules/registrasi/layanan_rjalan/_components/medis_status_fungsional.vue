<template>
  <div class="card card-custom">
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <b-form-group label="Penggunaan alat bantu" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="penggunaan_alat_bantu"
                  v-model="mData.penggunaan_alat_bantu"
                  :options="[
                    { text: 'Tidak', value: 'tidak' },
                    { text: 'Tongkat', value: 'tongkat' },
                    { text: 'Kursi Roda', value: 'kursi_roda' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="penggunaan_alat_bantu"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="col-12">
              <b-form-group label="Cacat Tubuh" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="cacat_tubuh"
                  v-model="mData.cacat_tubuh"
                  :options="[
                    { text: 'Tidak', value: 'tidak' },
                    { text: 'Ada', value: 'ada' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="cacat_tubuh"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="col-12" v-if="mData.cacat_tubuh === 'ada'">
              <s-input v-model="mData.cacat_tubuh_lain_lain" :item="{
                label: 'Sebutkan',
                id: 'cacat_tubuh_lain_lain',
                data: 'cacat_tubuh_lain_lain',
                type: 'text',
                validation: [],
                value: mData.cacat_tubuh_lain_lain,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.cacat_tubuh_lain_lain" />
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