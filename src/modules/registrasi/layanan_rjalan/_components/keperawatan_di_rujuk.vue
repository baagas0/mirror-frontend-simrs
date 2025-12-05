<template>
  <div class="card card-custom">
    <div class="card-body">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <s-input v-model="mData.rujuk" :key="'rujuk'" :id="'rujuk'" :item="{
                label: 'Rujuk',
                id: 'rujuk',
                data: 'rujuk',
                type: 'textarea',
                validation: [],
                value: mData.rujuk,
                param: {},
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.rujuk" />
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
    name: 'keperawatan_di_rujuk',
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
        this.$emit('submit', { key: 'di_rujuk', data: this.mData })
      }
    }
  }
</script>