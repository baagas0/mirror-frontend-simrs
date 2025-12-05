<template>
  <div class="card card-custom">
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <b-form-group label="Status Gizi Pediatri:" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  size="lg"
                  id="radio-group-1"
                  v-model="mData.status_gizi"
                  :options="[
                    { text: 'Gizi Kurang', value: 'gizi_kurang' },
                    { text: 'Gizi Cukup', value: 'gizi_cukup' },
                    { text: 'Gizi Lebih', value: 'gizi_lebih' },
                  ]"
                  :aria-describedby="ariaDescribedby"
                  name="status_gizi"
                ></b-form-radio-group>
              </b-form-group>
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