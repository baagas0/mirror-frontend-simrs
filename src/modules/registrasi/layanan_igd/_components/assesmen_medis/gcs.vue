<template>
	<div class="card card-custom card-sticky">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					GCS <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen({key:'gcs', data:mData})">
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
            
            <div class="col-12 d-flex justify-content-center" style="flex-grow: 1;">
              <s-input v-model="mData.usia" :key="'usia'" :id="'usia'" :item="{
                label: '',
                id: 'usia',
                data: 'usia',
                type: 'lookup-button',
                validation: [],
                value: mData.usia,
                pointer: {
                  label: 'label',
                  code: 'code',
                  display: ['label'],
                  list: usia_array
                },
                param: {},
              }" :valuee="mData.usia" />
            </div>

            <div class="col-12" v-if="mData && mData.gcs && mData.gcs.code">
              <p class="text-danger">* Klik kolom untuk memilih</p>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Kriteria</th>
                      <th>Kondisi</th>
                      <th>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in mData.gcs.gcs_fields" :key="i+'table-array'">
                      <td @click="selectGcs(item)" :class="{ 'bg-warning': mData.gcs.score[`obj_${item.k}`] && mData.gcs.score[`obj_${item.k}`].key === item.key }">{{ item.kriteria }}</td>
                      <td @click="selectGcs(item)" :class="{ 'bg-warning': mData.gcs.score[`obj_${item.k}`] && mData.gcs.score[`obj_${item.k}`].key === item.key }">{{ item.kondisi }}</td>
                      <td @click="selectGcs(item)" :class="{ 'bg-warning': mData.gcs.score[`obj_${item.k}`] && mData.gcs.score[`obj_${item.k}`].key === item.key }">
                        <s-input v-model="item.value" :item="{
                          label: '',
                          id: item.kondisi,
                          data: item.kondisi,
                          value: item.value,
                          groupClass: 'mb-0',
                          type: item.type,
                          validation: [],
                          rows: 1,
                        }" :disabled="is_validasi" :valuee="item.value" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else>
              <h5>GCS Tidak ditemukan</h5>
            </div>

            <div class="col-12" v-if="mData.gcs && mData.gcs.code">

              <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert" v-if="mData && mData.gcs && mData.gcs.code">
                <div class="alert-text">{{ mData.usia ? usia_array.filter(x => x.code === mData.usia)[0].label : '-' }}</div>
                <span class="label label-lg label-warning label-pill label-inline mr-2">E:{{ mData.gcs.score.obj_e.value || 0 }} M:{{ mData.gcs.score.obj_m.value || 0 }} V:{{ mData.gcs.score.obj_v.value || 0 }}</span>

                <span class="label label-lg label-warning label-pill label-inline mr-2">
                  Skor: {{ mData.gcs.end_score }} ({{ mData.gcs.label_end_score }})
                </span>
              </div>

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
		name: 'gcs',
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
				usia_array: [
          { 
            label: 'Bayi 0-23 Bulan', code: 'bayi_0_23_bulan', score: { obj_e: {}, obj_m: {}, obj_v: {} },
            gcs_fields: [
              {kriteria: 'Mata',    k: 'e', type: 'number', kondisi: 'Tidak berespon', key: 'mata_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Terhadap Nyeri', key: 'mata_terhadap_nyeri', value: '2'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Terhadap Teriakan', key: 'mata_terhadap_teriakan', value: '3'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Spontan', key: 'mata_spontan', value: '4'},
    
              {kriteria: 'Motorik', k: 'm', type: 'number', kondisi: 'Tidak berespon', key: 'motorik_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Ekstensi', key: 'Ekstensi', value: '2'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Flexi Abnormal', key: 'motorik_flexi_abnormal', value: '3'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Fleksi Normal', key: 'motorik_fleksi_normal', value: '4'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Melokalisasi Nyeri', key: 'motorik_melokalisasi_nyeri', value: '5'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Spontan', key: 'motorik_spontan', value: '6'},
    
              {kriteria: 'Verbal',  k: 'v', type: 'number', kondisi: 'Tidak berespon', key: 'verbal_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Mata Mendengus, Gelisah', key: 'verbal_mendengus_gelisah', value: '2'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Menangis Terus Menerus dan Berteriak', key: 'verbal_menangis_terus_menerus_dan_berteriak', value: '3'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Menangis tapi masih bisa dihibur', key: 'verbal_menangis_tapi_masih_bisa_dihibur', value: '4'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Tersenyum', key: 'verbal_tersenyum', value: '5'},
    
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Afasia', key: 'verbal_afasia', value: ''},
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Terpasang ETT', key: 'verbal_terpasang_ett', value: ''},
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Terpasang Tracheostomy', key: 'verbal_terpasang_tracheostomy', value: ''},
            ]
          }, 
          { 
            label: 'Usia 2-5 Tahun', code: '2_5_tahun', score: { obj_e: {}, obj_m: {}, obj_v: {} },
            gcs_fields: [
              {kriteria: 'Mata',    k: 'e', type: 'number', kondisi: 'Tidak berespon', key: 'mata_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Terhadap Nyeri', key: 'mata_terhadap_nyeri', value: '2'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Perintah Suara', key: 'mata_perintah_suara', value: '3'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Spontan', key: 'mata_spontan', value: '4'},
    
              {kriteria: 'Motorik', k: 'm', type: 'number', kondisi: 'Tidak berespon', key: 'motorik_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Ekstensi', key: 'Ekstensi', value: '2'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Flexi Abnormal', key: 'motorik_flexi_abnormal', value: '3'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Fleksi Normal', key: 'motorik_fleksi_normal', value: '4'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Melokalisasi Nyeri', key: 'motorik_melokalisasi_nyeri', value: '5'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Spontan', key: 'motorik_spontan', value: '6'},
    
              {kriteria: 'Verbal',  k: 'v', type: 'number', kondisi: 'Tidak berespon', key: 'verbal_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Mendengus', key: 'verbal_mendengus', value: '2'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Menangis Terus Menerus dan Berteriak', key: 'verbal_menangis_terus_menerus_dan_berteriak', value: '3'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Kata Kata tidak sesuai', key: 'verbal_kata_tidak_sesuai', value: '4'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Kata-Kata/Frase Susuai', key: 'verbal_frase_sesuai', value: '5'},
    
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Afasia', key: 'verbal_afasia', value: ''},
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Terpasang ETT', key: 'verbal_terpasang_ett', value: ''},
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Terpasang Tracheostomy', key: 'verbal_terpasang_tracheostomy', value: ''},
            ]
          }, 
          { 
            label: 'Usia >5 Tahun', code: 'lebih_5_tahun', score: { obj_e: {}, obj_m: {}, obj_v: {} },
            gcs_fields: [
              {kriteria: 'Mata',    k: 'e', type: 'number', kondisi: 'Tidak berespon', key: 'mata_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Terhadap Nyeri', key: 'mata_terhadap_nyeri', value: '2'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Perintah Suara', key: 'mata_perintah_suara', value: '3'},
              {kriteria: '',        k: 'e', type: 'number', kondisi: 'Spontan', key: 'mata_spontan', value: '4'},
    
              {kriteria: 'Motorik', k: 'm', type: 'number', kondisi: 'Tidak berespon', key: 'motorik_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Ekstensi', key: 'Ekstensi', value: '2'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Flexi Abnormal', key: 'motorik_flexi_abnormal', value: '3'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Fleksi Normal', key: 'motorik_fleksi_normal', value: '4'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Melokalisasi Nyeri', key: 'motorik_melokalisasi_nyeri', value: '5'},
              {kriteria: '',        k: 'm', type: 'number', kondisi: 'Spontan', key: 'motorik_spontan', value: '6'},
    
              {kriteria: 'Verbal',  k: 'v', type: 'number', kondisi: 'Tidak berespon', key: 'verbal_tidak_berespon', value: '1'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Bersuara, kata kata tidak jelas', key: 'verbal_suara_tidak_jelas', value: '2'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Kata kata tidak sesuai', key: 'verbal_kata_tidak_sesuai', value: '3'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Disorientasi/bingung', key: 'verbal_disorientasi_bingung', value: '4'},
              {kriteria: '',        k: 'v', type: 'number', kondisi: 'Terorientasi', key: 'verbal_terorientasi', value: '5'},
    
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Afasia', key: 'verbal_afasia', value: ''},
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Terpasang ETT', key: 'verbal_terpasang_ett', value: ''},
              {kriteria: '',        k: 'v', type: 'text', kondisi: 'Kondisi Khusus - Terpasang Tracheostomy', key: 'verbal_terpasang_tracheostomy', value: ''},
            ]
          }
        ],
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
			'mData.usia': {
        handler (to, from) {
          if (to !== from) {
						console.log('here')
            const GCS = this.usia_array.filter( x => x.code === this.mData.usia)
            if(GCS.length > 0) this.mData.gcs = GCS[0]
            else {
              this.$_alert.error('GCS tidak ditemukan bedasarkan usia yang anda pilih.')
              this.mData.usia = ''
              this.mData.gcs = {}
            }
          }
        }
      },
      'mData.gcs.score': {
				deep: true,
				immediate: false,
				handler (to, from) {
          console.log('asuuuuuuuuuuuu', to)
          if (to) {

            // Object.values(this.mData.gcs.score)
            const obj_e = this.mData.gcs ? this.mData.gcs.score.obj_e : {}
            const obj_m = this.mData.gcs ? this.mData.gcs.score.obj_m : {}
            const obj_v = this.mData.gcs ? this.mData.gcs.score.obj_v : {}
  
            const obj_e_value = obj_e && obj_e.value ? obj_e.value :  0
            const obj_m_value = obj_m && obj_m.value ? obj_m.value :  0
            const obj_v_value = obj_v && obj_v.value ? obj_v.value :  0
  
            let total = parseInt(obj_e_value) + parseInt(obj_m_value) + (parseInt(obj_v_value) || 0)
            this.mData.gcs.end_score = total
  
            if (total >= 1 && total <= 3) this.mData.gcs.label_end_score = 'Coma'
            else if (total >= 4 && total <= 6) this.mData.gcs.label_end_score = 'Stupor'
            else if (total >= 7 && total <= 9) this.mData.gcs.label_end_score = 'Somnolen'
            else if (total >= 10 && total <= 11) this.mData.gcs.label_end_score = 'Delirium'
            else if (total >= 12 && total <= 13) this.mData.gcs.label_end_score = 'Apatis'
            else if (total >= 14 && total <= 15) this.mData.gcs.label_end_score = 'Compos Mentis'
            else this.mData.gcs.label_end_score = 'Tidak Diketahui'

          }

				}
			},
		},
		mounted () {
      console.log('mounted', this.mData.gcs)
      let usia = this.mData.usia

      // if(usia) {
      //   const GCS_dari_usia = this.usia_array.filter( x => x.code === usia)
      //   if(GCS_dari_usia.length > 0) this.mData.gcs = GCS_dari_usia[0]
      // }

      // CEK ADA DATA GCS NGGA
      if (this.mData.gcs && this.mData.gcs.gcs_fields && this.mData.gcs.gcs_fields.length) {
        
        let GCS = this.usia_array.filter( x => x.code === this.mData.usia)

        // MASUKIN SCORE GCS LAMA
        if(GCS.length > 0) GCS[0].score = this.mData.gcs.score
        
        // MASUKIN DATA DARI GCS SEBELUMNYA YANG UDAH DI SAVE
        // if(GCS.length > 0) GCS[0].gcs_fields = this.mData.gcs.gcs_fields


        if(GCS.length > 0) {
          GCS = GCS[0]
  
          let fields = this.mData.gcs.gcs_fields
          for (let i of GCS.gcs_fields) {
            let data_gcs = this.mData.gcs.gcs_fields.filter(x => x.key === i.key)
            // console.log(this.mData.gcs.gcs_fields, data_gcs[0].value)
            if(data_gcs.length > 0) i.value = data_gcs[0].value
          }
        }

      } else {
				console.log('masok sini')
			}
    },
		methods: {
			onSubmitEvaluasi () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			},
			selectGcs(item) {
				console.log('selectGcs')
        if (this.mData.gcs && this.mData.gcs.score[`obj_${item.k}`] && this.mData.gcs.score[`obj_${item.k}`].key === item.key) this.mData.gcs.score[`obj_${item.k}`] = {}
        else this.mData.gcs.score[`obj_${item.k}`] = item

        const obj_e = this.mData.gcs ? this.mData.gcs.score.obj_e : {}
        const obj_m = this.mData.gcs ? this.mData.gcs.score.obj_m : {}
        const obj_v = this.mData.gcs ? this.mData.gcs.score.obj_v : {}

        const obj_e_value = obj_e && obj_e.value ? obj_e.value :  0
        const obj_m_value = obj_m && obj_m.value ? obj_m.value :  0
        const obj_v_value = obj_v && obj_v.value ? obj_v.value :  0

        let total = parseInt(obj_e_value) + parseInt(obj_m_value) + (parseInt(obj_v_value) || 0)
        this.mData.gcs.end_score = total

        if (total >= 1 && total <= 3) this.mData.gcs.label_end_score = 'Coma'
        else if (total >= 4 && total <= 6) this.mData.gcs.label_end_score = 'Stupor'
        else if (total >= 7 && total <= 9) this.mData.gcs.label_end_score = 'Somnolen'
        else if (total >= 10 && total <= 11) this.mData.gcs.label_end_score = 'Delirium'
        else if (total >= 12 && total <= 13) this.mData.gcs.label_end_score = 'Apatis'
        else if (total >= 14 && total <= 15) this.mData.gcs.label_end_score = 'Compos Mentis'
        else this.mData.gcs.label_end_score = 'Tidak Diketahui'
      }
		}
	}
</script>