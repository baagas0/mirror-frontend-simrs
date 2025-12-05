<template>
  <div class="card card-custom">
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <b-form-group label="Perasaan" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="perasaan"
                  v-model="mData.perasaan"
                  :options="[
                    { text: 'Cemas', value: 'cemas' },
                    { text: 'Takut', value: 'takut' },
                    { text: 'Marah', value: 'marah' },
                    { text: 'Sedih', value: 'sedih' },
                    { text: 'Lain Lain', value: 'lain_lain' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="perasaan"
                ></b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-12" v-if="mData.perasaan === 'lain_lain'">
              <s-input v-model="mData.perasaan_lain_lain" :item="{
                label: 'lain Lain',
                id: 'perasaan_lain_lain',
                data: 'perasaan_lain_lain',
                type: 'text',
                validation: [],
                value: mData.perasaan_lain_lain,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.perasaan_lain_lain" />
            </div>

            <div class="col-12">
              <b-form-group label="Bunuh Diri" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  size="lg"
                  id="kecenderungan_bunuh_diri"
                  v-model="mData.kecenderungan_bunuh_diri"
                  :options="[
                    { text: 'Kecenderungan Bunuh Diri', value: 'kecenderungan_bunuh_diri' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="kecenderungan_bunuh_diri"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="col-12">
              <b-form-group label="Masalah Perilaku" label-class="" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="masalah_perilaku"
                  v-model="mData.masalah_perilaku"
                  :options="[
                    { text: 'Tidak Ada', value: 'tidak_ada' },
                    { text: 'Ada', value: 'ada' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="masalah_perilaku"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="col-12" v-if="mData.masalah_perilaku === 'ada'">
              <s-input v-model="mData.masalah_perilaku_text" :item="{
                label: 'Sebutkan',
                id: 'masalah_perilaku_text',
                data: 'masalah_perilaku_text',
                type: 'text',
                validation: [],
                value: mData.masalah_perilaku_text,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.masalah_perilaku_text" />
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