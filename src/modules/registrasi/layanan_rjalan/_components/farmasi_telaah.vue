<template>
  <div>
    <template v-if="state === 'list'">
      <div class="row">
        <div class="col-12">
          <div class="p-3">
            <h5>- Obat Jadi</h5>
          </div>
        </div>
        <farmasi-telaah-obat-jadi-list :aResepDetail="aResepDetail" ></farmasi-telaah-obat-jadi-list>
        
        <farmasi-telaah-obat-racik-list :oResep="oResep" ></farmasi-telaah-obat-racik-list>
        
      </div>
      <div class="row px-3">
        <div class="col-3">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_obat" v-model="oResep.tepat_obat" :checked="oResep.tepat_obat" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Obat
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_waktu" v-model="oResep.tepat_waktu" :checked="oResep.tepat_waktu"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Waktu
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="interaksi_obat" v-model="oResep.interaksi_obat" :checked="oResep.interaksi_obat"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Interaksi Obat
            </label>
          </div>
        </div>
        <div class="col-3">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_dosis" v-model="oResep.tepat_dosis" :checked="oResep.tepat_dosis"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Dosis
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="duplikasi" v-model="oResep.duplikasi" :checked="oResep.duplikasi"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Duplikasi
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="kontra_indikasi_lain" v-model="oResep.kontra_indikasi_lain" :checked="oResep.kontra_indikasi_lain"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Kontra Indikasi Lain
            </label>
          </div>
        </div>
        <div class="col-4">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_rute" v-model="oResep.tepat_rute" :checked="oResep.tepat_rute"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Rute
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="alergi" v-model="oResep.alergi" :checked="oResep.alergi"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Alergi
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="kesesuaian_fornas" v-model="oResep.kesesuaian_fornas" :checked="oResep.kesesuaian_fornas"  @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Kesesuaian Dengan Fornas
            </label>
          </div>
        </div>
      </div>
      <div class="row px-3" v-if="aResepDetail.length">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="submitData()">Lanjutkan <i
              class="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </template>
    <template v-if="state === 'create' || state === 'update'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bolder text-dark mb-0 pb-0">Form Telaah Resep</h6>
          <a class="btn btn-outline-primary btn-icon btn-circle" @click="switchState('list')"><i
              class="ri-arrow-go-back-line p-0"></i></a>
        </div>
        <div class="col-12 mt-3">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-12">
                  <s-input v-model="mData.final_id_obat" :key="'final_id_obat'" :id="'final_id_obat'" :item="{
                    label: 'Obat',
                    id: 'final_id_obat',
                    data: 'final_id_obat',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: mData.final_id_obat,
                    api: 'msBarang',
                    pointer: {
                      label: 'nama_barang',
                      code: 'ms_barang_id',
                      display: ['nama_barang']
                    },
                    param: {},
                  }" :valuee="mData.final_id_obat" />
                </div>
                <div class="col-12">
                  <s-input v-model="mData.final_nama_obat" :key="'final_nama_obat'" :id="'final_nama_obat'" :item="{
                    label: 'Nama Obat',
                    id: 'final_nama_obat',
                    data: 'final_nama_obat',
                    type: 'text',
                    validation: ['required'],
                    value: mData.final_nama_obat,
                    param: {},
                  }" :valuee="mData.final_nama_obat" />
                </div>
                <div class="col-12">
                  <s-input v-model="mData.final_signa" :key="'final_signa'" :id="'final_signa'" :item="{
                    label: 'Signa',
                    id: 'final_signa',
                    data: 'final_signa',
                    type: 'text',
                    validation: ['required'],
                    value: mData.final_signa,
                    param: {},
                  }" :valuee="mData.final_signa" />
                </div>
                <div class="col-12">
                  <s-input v-model="mData.final_harga" :key="'final_harga'" :id="'final_harga'" :item="{
                    label: 'Harga',
                    id: 'final_harga',
                    data: 'final_harga',
                    type: 'money',
                    validation: ['required'],
                    value: mData.final_harga,
                    param: {},
                  }" :valuee="mData.final_harga" />
                </div>
                <div class="col-6">
                  <s-input v-model="mData.final_satuan" :key="'final_satuan'" :id="'final_satuan'" :item="{
                    label: 'Satuan',
                    id: 'final_satuan',
                    data: 'final_satuan',
                    type: 'text',
                    validation: ['required'],
                    value: mData.final_satuan,
                    param: {},
                  }" :valuee="mData.final_satuan" />
                </div>
                <div class="col-6">
                  <s-input v-model="mData.final_qty" :key="'final_qty'" :id="'final_qty'" :item="{
                    label: 'Qty',
                    id: 'final_qty',
                    data: 'final_qty',
                    type: 'number',
                    validation: ['required'],
                    value: mData.final_qty,
                    param: {},
                  }" :valuee="mData.final_qty" />
                </div>
                <div class="col-4">
                  <s-input v-model="mData.final_aturan_pakai" :key="'final_aturan_pakai'" :id="'final_aturan_pakai'" :item="{
                    label: 'Aturan Pakai',
                    id: 'final_aturan_pakai',
                    data: 'final_aturan_pakai',
                    type: 'lookup-radio',
                    validation: ['required'],
                    value: mData.final_aturan_pakai,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Tablet Sesudah Makan', code: 'Tablet Sesudah Makan' },
                        { label: 'Tablet Sebelum Makan', code: 'Tablet Sebelum Makan' },
                      ]
                    },
                    param: {},
                  }" :valuee="mData.final_aturan_pakai" />
                </div>
                <div class="col-12 align-self-center">
                  <button type="submit" class="btn btn-light-primary mr-3">
                    <i class="ri-save-line"></i>
                    {{ $t('global.submit') }}
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </template>
  </div>
</template>
	
<script>
import FarmasiTelaahObatJadiList from './farmasi_telaah_obat_jadi_list.vue'
import FarmasiTelaahObatRacikList from './farmasi_telaah_obat_racik_list.vue'
import moment from 'moment'
moment.locale('id')

export default {
  name: 'farmasi_telaah',
  components: { FarmasiTelaahObatJadiList, FarmasiTelaahObatRacikList },
  props: {
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    oResep: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    objectPenjualan: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    aResepDetail: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      mData: {},
      state: 'list'
    }
  },
  watch: {
    'mData.final_id_obat': function (newVal, oldVal){
      this.$_api.single('msBarang', { id: newVal }, newVal).then((res) => {
          // console.log(res.data[0].nama_barang)
          this.mData.final_nama_obat = res.data[0].nama_barang
      })
    },
  },
  mounted() {
    // console.log('aResepDetail', this.aResepDetail)
  },
  methods: {
    onSubmit(data) {
      this.mData.resep_id = this.oResep.id
      this.$_api[this.state]('resep_detail_rjalan', this.mData).then((res) => {
        this.$emit('reloadData')
        this.switchState('list')
        this.$_alert({}, 'Data berhasil diperbarui')
      })
    },
    async submitData() {
      this.$_alert.confirm('Konfirmasi', 'anda yakin ingin melanjutkan?').then(async (status) => {
        if (status.isDismissed) return
        else {
          // Ambil data registrasi
          const ResRegistrasi = await this.$_api.post(
            "/registrasi/listKunjunganRajalPerHalaman",
            {
              registrasi_id: this.dataRegistrasi.registrasi_id,
              jumlah: 1,
              halaman: 1,
            },
            this.dataRegistrasi.registrasi_id
          );
          const registrasi = ResRegistrasi.data[0];
          
          let obat = []
          const templatePayloadIhs = {
            "resourceType": "QuestionnaireResponse",
            "questionnaire": "https://fhir.kemkes.go.id/Questionnaire/Q0007",
            "status": "completed",
            "subject": {
              reference: `Patient/${registrasi.satu_sehat_id_pasien}`,
              display: registrasi.nama_lengkap,
            },
            "encounter": {
              // "reference": "Encounter/{{Encounter_id}}"
              reference: `Encounter/${registrasi.satu_sehat_id}`,
            },
            // "authored": "2023-06-04T10:00:00+00:00",
            authored: new Date().toISOString(),
            "author": {
              // "reference": "Practitioner/N10000003",
              // "display": "Apoteker Miller"
              reference: `Practitioner/${registrasi.satu_sehat_id_dokter}`,
              display: registrasi.nama_dokter,
            },
            "source": {
              // "reference": "Patient/{{Patient_id}}"
              reference: `Patient/${registrasi.satu_sehat_id_pasien}`,
            },
            "item": [
              {
                "linkId": "1",
                "text": "Persyaratan Administrasi",
                "item": [
                  {
                    "linkId": "1.1",
                    "text": "Apakah nama, umur, jenis kelamin, berat badan dan tinggi badan pasien sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "1.2",
                    "text": "Apakah nama, nomor ijin, alamat dan paraf dokter sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "1.3",
                    "text": "Apakah tanggal resep sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "1.4",
                    "text": "Apakah ruangan/unit asal resep sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "linkId": "2",
                "text": "Persyaratan Farmasetik",
                "item": [
                  {
                    "linkId": "2.1",
                    "text": "Apakah nama obat, bentuk dan kekuatan sediaan sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "2.2",
                    "text": "Apakah dosis dan jumlah obat sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "2.3",
                    "text": "Apakah stabilitas obat sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "2.4",
                    "text": "Apakah aturan dan cara penggunaan obat sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "linkId": "3",
                "text": "Persyaratan Klinis",
                "item": [
                  {
                    "linkId": "3.1",
                    "text": "Apakah ketepatan indikasi, dosis, dan waktu penggunaan obat sudah sesuai?",
                    "answer": [
                      {
                        "valueCoding": {
                          "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          "code": "OV000052",
                          "display": "Sesuai"
                        }
                      }
                    ]
                  },
                  {
                    "linkId": "3.2",
                    "text": "Apakah terdapat duplikasi pengobatan?",
                    "answer": [
                      {
                        "valueBoolean": false
                      }
                    ]
                  },
                  {
                    "linkId": "3.3",
                    "text": "Apakah terdapat alergi dan reaksi obat yang tidak dikehendaki (ROTD)?",
                    "answer": [
                      {
                        "valueBoolean": false
                      }
                    ]
                  },
                  {
                    "linkId": "3.4",
                    "text": "Apakah terdapat kontraindikasi pengobatan?",
                    "answer": [
                      {
                        "valueBoolean": false
                      }
                    ]
                  },
                  {
                    "linkId": "3.5",
                    "text": "Apakah terdapat dampak interaksi obat?",
                    "answer": [
                      {
                        "valueBoolean": false
                      }
                    ]
                  }
                ]
              },
              {
                "linkId": "4",
                "text": "Resep yang dilakukan pengkajian resep",
                "answer": [
                  {
                    "valueReference": {
                      "reference": "MedicationRequest/{{MedicationRequest_id1}}"
                    }
                  }
                ]
              }
            ]
          }

          // OBAT JADI
          for (let resep of this.aResepDetail) {
            const id_obat = resep.final_id_obat ? resep.final_id_obat : resep.awal_id_obat
            const qty = resep.final_id_obat ? resep.final_qty : resep.awal_qty
    
            let barang_req = await this.$_api.single('msBarang', {}, id_obat)
            let barang = {}
            if (barang_req.data.length == 0) barang = {}
            else barang = barang_req.data[0]
            
            let paramPenjualan = {
              qty_barang: qty,
              harga_barang: barang.harga_pokok * qty,
              harga_barang_custom: barang.harga_pokok * qty,
              harga_pokok_barang: barang.harga_pokok * qty,
              keterangan_penjualan_barang: 'Create by assesmen medis automation (Jadi)',
              status_penjualan_barang: 1,
              penjualan_id: this.objectPenjualan.penjualan_id,
              ms_barang_id: barang.ms_barang_id,
              harga_total_barang: barang.harga_pokok,
              discount: 0,
              tax: (barang.harga_pokok * qty) * 0.12,
              total_penjualan: barang.harga_pokok * qty,
              ms_gudang_id: '0fd76213-f360-4851-9ddb-6ee684fafb63', // Gudang Utama
            }
            
            let checkobat = obat.filter(x => x.ms_barang_id == paramPenjualan.ms_barang_id)
            if(checkobat.length > 0) {
              checkobat[0].qty_barang += qty;
              checkobat[0].harga_barang += barang.harga_pokok * qty;
              checkobat[0].harga_barang_custom += barang.harga_pokok * qty;
              checkobat[0].harga_pokok_barang += barang.harga_pokok * qty;
              // checkobat[0].keterangan_penjualan_barang += 'Create by assesmen medis automation (Racik)';
              // checkobat[0].status_penjualan_barang += 1;
              // checkobat[0].penjualan_id += this.objectPenjualan.penjualan_id;
              // checkobat[0].ms_barang_id += barang.ms_barang_id;
              checkobat[0].harga_total_barang += barang.harga_pokok;
              checkobat[0].discount += 0;
              checkobat[0].tax += (barang.harga_pokok * qty) * 0.12;
              checkobat[0].total_penjualan += barang.harga_pokok * qty;
            } else {
              obat.push(paramPenjualan)
            }
            // console.log(paramPenjualan)
            // let p = await this.$_api.post('penjualanBarang/register', paramPenjualan);
            console.log('p1', paramPenjualan)

            if (resep.ihs_medication_request_id && !resep.ihs_pengkajian_obat_id) {
              const payloadIhs = { ...templatePayloadIhs };
              // const requestId = resep.ihs_medication_request_id.replace('"', '');
              const requestId = resep.ihs_medication_request_id.replace(/"/g, '');
              payloadIhs.item[3].answer[0].valueReference.reference = `MedicationRequest/${requestId}`;
              const mrRes = await this.$_api.post("ihs/request", {
                uri: "QuestionnaireResponse",
                method: "post",
                data: payloadIhs,
              });
              const updateResepDetail = {
                ...resep,
                id: resep.id_resep_detail_rjalan,
                ihs_pengkajian_obat_id: mrRes.data.id,
              }
              await this.$_api.post("resep_detail_rjalan/update", updateResepDetail);
            }
          }
          
          // OBAT RACIK
          let resep_racik = await this.$_api.post('resep_detail_rjalan/list', { resep_rjalan_id: this.oResep.id, is_racik: 1, page: 1, limit: 99999 })
          for (const rr of resep_racik.data) {
            for (let resep of rr.resep_detail_rjalans) {
              // console.log(resep)
              const id_obat = resep.final_id_obat ? resep.final_id_obat : resep.awal_id_obat
              const qty = resep.final_id_obat ? resep.final_qty : resep.awal_qty
    
              let barang_req = await this.$_api.single('msBarang', {}, id_obat)
              let barang = {}
              if (barang_req.data.length == 0) barang = {}
              else barang = barang_req.data[0]
              
              let paramPenjualan = {
                qty_barang: qty,
                harga_barang: barang.harga_pokok * qty,
                harga_barang_custom: barang.harga_pokok * qty,
                harga_pokok_barang: barang.harga_pokok * qty,
                keterangan_penjualan_barang: 'Create by assesmen medis automation (Racik)',
                status_penjualan_barang: 1,
                penjualan_id: this.objectPenjualan.penjualan_id,
                ms_barang_id: barang.ms_barang_id,
                harga_total_barang: barang.harga_pokok,
                discount: 0,
                tax: (barang.harga_pokok * qty) * 0.12,
                total_penjualan: barang.harga_pokok * qty,
                ms_gudang_id: '0fd76213-f360-4851-9ddb-6ee684fafb63', // Gudang Utama
              }

              let checkobat = obat.filter(x => x.ms_barang_id == paramPenjualan.ms_barang_id)
              if(checkobat.length > 0) {
                checkobat[0].qty_barang += qty;
                checkobat[0].harga_barang += barang.harga_pokok * qty;
                checkobat[0].harga_barang_custom += barang.harga_pokok * qty;
                checkobat[0].harga_pokok_barang += barang.harga_pokok * qty;
                // checkobat[0].keterangan_penjualan_barang += 'Create by assesmen medis automation (Racik)';
                // checkobat[0].status_penjualan_barang += 1;
                // checkobat[0].ms_barang_id += barang.ms_barang_id;
                checkobat[0].harga_total_barang += barang.harga_pokok;
                checkobat[0].discount += 0;
                checkobat[0].tax += (barang.harga_pokok * qty) * 0.12;
                checkobat[0].total_penjualan += barang.harga_pokok * qty;
              } else {
                obat.push(paramPenjualan)
              }
              // console.log(paramPenjualan)
              // let p = await this.$_api.post('penjualanBarang/register', paramPenjualan);
              console.log('p0', paramPenjualan)
            }
          }
          
          for (const r of obat) {
            await this.$_api.post('penjualanBarang/register', r);
          }

          this.$emit('updateResepData', { ...this.oResep, tahap_resep: this.oResep.tahap_resep+1, disabledConfirm: true })
        }
      })
    },
    switchState(state, data = null) {
      if(data) {
        if (!data.id) data.id = data.id_resep_detail_rjalan
        this.mData = data
      }
      this.state = state
    },
    async findBarang(id) {
      let barang = await this.$_api.single('msBarang', {}, id)

      if (barang.data.length == 0) return {}

      return barang.data
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer !important;
  }

  .card-image {
    position: relative;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .card-overlay:hover .image-overlay {
    opacity: 1;
    z-index: 1;
  }
</style>