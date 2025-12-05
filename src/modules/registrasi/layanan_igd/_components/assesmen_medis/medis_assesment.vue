<template>
  <div class="card card-custom">
    <div class="card-body pt-4">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <ul class="nav nav-tabs nav-tabs-line mb-5">
                <li class="nav-item">
                  <a class="nav-link pointer" @click="switchTab('diagnosa')"
                    :class="{ 'active': tabActive === 'diagnosa' }">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Diagnosa</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <s-input v-model="fData.tipe_diagnosa" :key="'tipe_diagnosa'" :id="'tipe_diagnosa'" :item="{
                    label: 'Tipe Diagnosa',
                    id: 'tipe_diagnosa',
                    data: 'tipe_diagnosa',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: fData.tipe_diagnosa,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'ICD', code: 'ICD' },
                        { label: 'Non ICD', code: 'Non ICD' },
                      ]
                    },
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.tipe_diagnosa" />
                </div>
                <div class="col-6" v-if="fData.tipe_diagnosa === 'ICD'">
                  <s-input v-model="fData.diagnosa" :key="'diagnosa'" :id="'diagnosa'" :item="{
                    label: 'Diagnosa',
                    id: 'diagnosa',
                    data: 'diagnosa',
                    type: 'lookup-radio',
                    validation: fData.tipe_diagnosa === 'ICD' ? ['required'] : [],
                    value: fData.diagnosa,
                    return_object: true,
                    api: 'ms_diagnosa',
                    pointer: {
                      label: 'nama_diagnosa',
                      code: 'id',
                      display: ['kode_diagnosa', 'nama_diagnosa'],
                      headerDisplay: ['Kode', 'Nama']
                    },
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.diagnosa_medis" />
                </div>
                <div class="col-6" v-else>
                  <s-input v-model="fData.diagnosa" :key="'diagnosa'" :id="'diagnosa'" :item="{
                    label: 'Diagnosa',
                    id: 'diagnosa',
                    data: 'diagnosa',
                    type: 'text',
                    validation: ['required'],
                    value: fData.diagnosa,
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.diagnosa" />
                </div>
                <div class="col-12">
                  <s-input v-model="fData.keterangan" :key="'keterangan'" :id="'keterangan'" :item="{
                    label: 'Keterangan',
                    id: 'keterangan',
                    data: 'keterangan',
                    type: 'text',
                    validation: ['required'],
                    value: fData.keterangan,
                    param: {},
                  }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.keterangan" />
                </div>
                <div class="col-12 align-self-center">
                  <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                    <i class="ri-loop-right-fill"></i>
                    Reset
                  </button>
                  <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                    <i class="ri-save-line"></i>
                    {{ $t('global.submit') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <div class="row">
        
        <div class="col-12">
          <hr>
        </div>
        <div class="col-12" v-if="tabActive === 'diagnosa'">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipe Diagnosa</th>
                <th>Diagnosa</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in mData[tabActive]" :key="'table'+tabActive+i">
                <td>              
                  <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ 'disabled': objectDataAssesmen.is_validasi }">
                    <i class="ri-delete-bin-line"></i>
                  </a>
                </td>
                <td>{{ item.tipe_diagnosa || '-'  }}</td>
                <td>{{ typeof item.diagnosa == 'object' ? (item.diagnosa && item.diagnosa.nama_diagnosa ? item.diagnosa.nama_diagnosa : '-') : item.diagnosa }}</td>
                <td>{{ item.keterangan || '-'  }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
          
    </div>
  </div>
</template>
  
<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'medis_assesment',
  props: {
    is_validasi: {
      type: Boolean,
      required: true,
      default() {
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
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // mData: {}
      tabActive: 'diagnosa',
      fData: {}
    }
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        this.handleData()
        // this.$emit('dataChange', true)
      }
    },
    'fData.tipe_diagnosa': {
      handler(to, from) {
        console.log(to)
        if (to !== from) {
          if (to === 'ICD') this.fData.diagnosa = {}
          else if (to === 'Non ICD') this.fData.diagnosa = ''
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    resetForm () {
      this.fData = {}
      this.$refs.assesmenForm.reset();
    },
    handleData() {
      console.log('handleData')
      if (!this.mData.medis) this.mData.medis = []
      if (!this.mData.kebidanan) this.mData.kebidanan = []
    },
    switchTab(key) {
      this.tabActive = key
    },
    onDelete (index) {
      this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
        if (status.isDismissed) return
        else {
          this.mData[this.tabActive].splice(index, 1)
          this.$emit('submit', { key: 'assesment', open_tab: 'assesment', data: this.mData })
        }
      });
    },
    onSubmitEvaluasi() {
      this.fData.evaluasi_diagnosa = 'Belum Teratasi'

      if (!this.mData[this.tabActive]) this.mData[this.tabActive] = []

      console.log(this.tabActive, this.mData)
      this.mData[this.tabActive].push(this.fData)
      console.log(this.mData[this.tabActive])
      // this.resetForm()
      this.$emit('submit', { key: 'assesment', open_tab: 'assesment', data: this.mData })
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>