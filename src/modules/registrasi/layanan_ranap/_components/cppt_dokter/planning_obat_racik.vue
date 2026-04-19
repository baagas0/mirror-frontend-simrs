<template>
  <div>
    <button type="button" class="btn btn-primary" v-b-modal.modal-form>Tambah Obat Racik</button>
    <div class="table-responsive mt-3">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <!-- <th>Tipe</th>
            <th>Jenis Obat</th> -->
            <th>Obat</th>
            <th>Jumlah</th>
            <th>Satuan</th>
            <th>Jumlah Dosis Sebelum</th>
            <th>Jumlah Dosis Setelah</th>
            <th>Dosis</th>
            <!-- <th>Satuan Pakai</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in obat_jadi" :key="'table-obat-racik-jadi'+i">
            <td>              
              <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2">
                <i class="ri-delete-bin-line"></i>
              </a>
            </td>
            <!-- <td>{{ item.tipe || '-'  }}</td>
            <td>{{ item.jenis_obat || '-'  }}</td> -->
            <td>{{ item.nama_obat && item.nama_obat.nama_barang ? item.nama_obat.nama_barang : '-'  }}</td>
            <td>{{ item.jumlah || '-'  }}</td>
            <td>{{ item.satuan_jual || '-'  }}</td>
            <td>{{ item.sebelum_jumlah_dosis || '-'  }}</td>
            <td>{{ item.setelah_jumlah_dosis || '-'  }}</td>
            <td>{{ item.dosis || '-'  }}</td>
            <!-- <td>{{ item.satuan_pakai || '-'  }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal id="modal-form" title="Form Racikan Obat Jadi" hide-footer size="xl">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitObatRacikanJadi)" autocomplete="off">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <!-- <div class="col-6">
                    <s-input v-model="dataObject.tipe" :key="'tipe'" :id="'tipe'" :item="{
                      label: 'Tipe',
                      id: 'tipe',
                      data: 'tipe',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: dataObject.tipe,
                      pointer: {
                        label: 'label',
                        code: 'code',
                        display: ['label'],
                        list: [
                          { label: 'Kandungan', code: 'Kandungan' },
                          { label: 'Obat', code: 'Obat' },
                        ]
                      },
                      param: {},
                    }"  :valuee="dataObject.tipe" />
                  </div>
                  <div class="col-12">
                    <s-input v-model="dataObject.jenis_obat" :key="'jenis_obat'" :id="'jenis_obat'" :item="{
                      label: 'Jenis Obat',
                      id: 'jenis_obat',
                      data: 'jenis_obat',
                      type: 'text',
                      validation: ['required'],
                      value: dataObject.jenis_obat,
                      param: {},
                    }"  :valuee="dataObject.jenis_obat || 'Obat Racik'" />
                  </div> -->
                  <div class="col-12">
                    <s-input v-model="dataObject.nama_obat" :key="'nama_obat'" :id="'nama_obat'" :item="{
                      label: 'Obat',
                      id: 'nama_obat',
                      data: 'nama_obat',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: dataObject.nama_obat,
                      api: 'msBarang',
                      return_object: true,
                      pointer: {
                        label: 'nama_barang',
                        code: 'ms_barang_id',
                        display: ['nama_barang']
                      },
                      param: {
                        type: 'OBAT'
                      },
                    }"  :valuee="dataObject.nama_obat" />
                  </div>
                  <!-- <div class="col-12">
                    <s-input v-model="dataObject.nama_obat" :key="'nama_obat'" :id="'nama_obat'" :item="{
                      label: 'Obat',
                      id: 'nama_obat',
                      data: 'nama_obat',
                      type: 'text',
                      validation: ['required'],
                      value: dataObject.nama_obat,
                      param: {},
                    }"  :valuee="dataObject.nama_obat" />
                  </div> -->
                  <div class="col-4">
                    <s-input v-model="dataObject.jumlah" :key="'jumlah'" :id="'jumlah'" :item="{
                      label: 'Jumlah',
                      id: 'jumlah',
                      data: 'jumlah',
                      hint: '',
                      type: 'number',
                      validation: ['required'],
                      value: dataObject.jumlah,
                      param: {},
                    }"  :valuee="dataObject.jumlah" />
                  </div>
                  <div class="col-8">
                    <s-input v-model="dataObject.satuan_jual" :key="'satuan_jual'" :id="'satuan_jual'" :item="{
                      label: 'Satuan',
                      id: 'satuan_jual',
                      data: 'satuan_jual',
                      hint: '',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: dataObject.satuan_jual,
                      api: 'msSatuanBarang',
                      pointer: {
                        label: 'nama_satuan',
                        code: 'nama_satuan',
                        display: ['nama_satuan'],
                      },
                      param: {},
                    }" :disabled="true" :valuee="dataObject.satuan_jual" />
                  </div>

                  <div class="col-4">
                    <s-input v-model="dataObject.sebelum_jumlah_dosis" :key="'sebelum_jumlah_dosis'" :id="'sebelum_jumlah_dosis'" :item="{
                      label: 'Sebelum jumlah Dosis',
                      id: 'sebelum_jumlah_dosis',
                      data: 'sebelum_jumlah_dosis',
                      hint: '',
                      type: 'number',
                      validation: ['required'],
                      value: dataObject.sebelum_jumlah_dosis,
                      suffix: '/Unit',
                      param: {},
                    }"  :valuee="dataObject.sebelum_jumlah_dosis" />
                  </div>
                  <div class="col-4">
                    <s-input v-model="dataObject.setelah_jumlah_dosis" :key="'setelah_jumlah_dosis'" :id="'setelah_jumlah_dosis'" :item="{
                      label: 'Setelah jumlah Dosis',
                      id: 'setelah_jumlah_dosis',
                      data: 'setelah_jumlah_dosis',
                      hint: '',
                      type: 'number',
                      validation: ['required'],
                      value: dataObject.setelah_jumlah_dosis,
                      prefix: 'Total Dosis',
                      param: {},
                    }"  :valuee="dataObject.setelah_jumlah_dosis" />
                  </div>
                  <div class="col-4">
                    <s-input v-model="dataObject.dosis" :key="'dosis'" :id="'dosis'" :item="{
                      label: 'Dosis',
                      id: 'dosis',
                      data: 'dosis',
                      hint: '',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: dataObject.dosis,
                      pointer: {
                        label: 'label',
                        code: 'code',
                        display: ['label'],
                        list: [
                          { label: 'miligram', code: 'miligram' },
                          { label: 'mililiter', code: 'mililiter' },
                          { label: 'persen', code: 'persen' },
                        ]
                      },
                      param: {},
                    }" :valuee="dataObject.dosis" />
                  </div>
                  
                  <div class="col-12 align-self-center">
                    <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                      <i class="ri-loop-right-fill"></i>
                      Reset
                    </button>
                    <button type="submit" class="btn btn-light-primary mr-3">
                      <i class="ri-save-line"></i>
                      {{ $t('global.submit') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>  
</template>
    
  <script>
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'planning_obat_racik',
    props: {
      obat_jadi: {
        type: Array,
        required: true,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        dataObject: {
          tipe: '',
          jenis_obat: '',
          nama_obat: '',
          jumlah: '',
          satuan_jual: '',
          satuan_pakai: '',
        }
      }
    },
    watch: {
      'dataObject.nama_obat': {
        deep: true,
        immediate: false,
        handler(to, from) {
          console.log('nama_obat ------------------------------')
          if (this.dataObject.nama_obat && this.dataObject.nama_obat.id) {
            this.dataObject.nama_obat.id = this.dataObject.nama_obat.ms_barang_id
            this.dataObject.satuan_jual = this.dataObject.nama_obat.nama_satuan
          }
        }
      }
    },
    mounted() {
    },
    methods: {
      onSubmitObatRacikanJadi() {
          this.$bvModal.hide('modal-form')
          
          const dataObject = Object.assign({}, this.dataObject)
          this.obat_jadi.push(dataObject)

          this.dataObject.tipe = ''
          this.dataObject.jenis_obat = ''
          this.dataObject.nama_obat = ''
          this.dataObject.jumlah = ''
          this.dataObject.aturan_pakai = ''
          this.dataObject.satuan_jual = ''
      },
      onDelete (index, keyData = '') {
        this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
          if (status.isDismissed) return
          else {
            this.obat_jadi.splice(index, 1)
          }
        });
      },
    }
  }
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  </style>
