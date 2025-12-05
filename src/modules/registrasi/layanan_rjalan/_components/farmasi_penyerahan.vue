<template>
  <div>
    <template v-if="state === 'list'">
      <div class="row">
        <div class="col-12">
          <div class="p-3">
            <h5>- Obat Jadi</h5>
          </div>
        </div>
        <div class="col-12" v-for="(item, i) in aResepDetail" :key="'resep-detail' + i">
          <div class="card card-custom p-3">
            <div class="card body bg-light-warning pt-0 pb-0 pr-0 pl-3">
              <div class="row align-items-center">
                <div class="col-3">
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.awal_id_obat ? item.awal_id_obat.substring(0, 10) : '' }}</p>
                  <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.awal_nama_obat || '-' }}</h6>
                </div>
                <div class="col-3">
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_signa || '-' }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_harga || '-' }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_qty || '-' }} / {{ item.awal_satuan
                    || '-' }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_aturan_pakai || '-' }}</p>
                </div>
                <div class="col-6">
                  <div class="card card-custom" style="border-radius: 15px 0px 0px 15px;">
                    <div class="card body bg-light-success p-4" style="border-radius: 15px 0px 0px 15px;">
                      <div class="row align-items-center">
                        <div class="col-5">
                          <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.final_id_obat ? item.final_id_obat.substring(0, 10) : '' }}</p>
                          <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.final_nama_obat || '-' }}</h6>
                        </div>
                        <div class="col-5">
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_signa || '-' }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_harga || '-' }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_qty || '-' }} / {{ item.final_satuan
                            || '-' }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_aturan_pakai || '-' }}</p>
                        </div>
                        <div class="col-2 align-items-start">
                          <label class="checkbox checkbox-outline checkbox-danger">
                            <input type="checkbox" :name="'status_resep_detail_rjalan'+item.id" v-model="item.status_resep_detail_rjalan" :disabled="oResep.tahap_resep > 4" :checked="item.status_resep_detail_rjalan"  @change="updateResepDetail(item)" />
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <farmasi-telaah-obat-racik-list :oResep="oResep" :disableAdd="true" :disableEdit="true" :showChecklist="true" :enableChecklist="oResep.tahap_resep > 4"></farmasi-telaah-obat-racik-list>

      </div>
      <div class="row px-3">
        <div class="col-3">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_obat" v-model="oResep.tepat_obat" :disabled="oResep.tahap_resep > 4" :checked="oResep.tepat_obat" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Obat
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_waktu" v-model="oResep.tepat_waktu" :disabled="oResep.tahap_resep > 4" :checked="oResep.tepat_waktu" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Waktu
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="interaksi_obat" v-model="oResep.interaksi_obat" :disabled="oResep.tahap_resep > 4" :checked="oResep.interaksi_obat" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Interaksi Obat
            </label>
          </div>
        </div>
        <div class="col-3">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_dosis" v-model="oResep.tepat_dosis" :disabled="oResep.tahap_resep > 4" :checked="oResep.tepat_dosis" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Dosis
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="duplikasi" v-model="oResep.duplikasi" :disabled="oResep.tahap_resep > 4" :checked="oResep.duplikasi" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Duplikasi
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="kontra_indikasi_lain" v-model="oResep.kontra_indikasi_lain" :disabled="oResep.tahap_resep > 4" :checked="oResep.kontra_indikasi_lain" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Kontra Indikasi Lain
            </label>
          </div>
        </div>
        <div class="col-4">
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="tepat_rute" v-model="oResep.tepat_rute" :disabled="oResep.tahap_resep > 4" :checked="oResep.tepat_rute" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Tepat Rute
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="alergi" v-model="oResep.alergi" :disabled="oResep.tahap_resep > 4" :checked="oResep.alergi" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Alergi
            </label>
          </div>
          <div class="checkbox-list mt-3">
            <label class="checkbox">
              <input type="checkbox" name="kesesuaian_fornas" v-model="oResep.kesesuaian_fornas" :disabled="oResep.tahap_resep > 4" :checked="oResep.kesesuaian_fornas" @change="$emit('updateResepData', { ...oResep })" />
              <span></span>
              Kesesuaian Dengan Fornas
            </label>
          </div>
        </div>
      </div>
      <div class="row px-3" v-if="aResepDetail.length && oResep.tahap_resep === 4">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="submitData()">Proses Penyerahan <i
              class="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </template>
    <template v-if="state === 'create'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bolder text-dark mb-0 pb-0">Form Tambah Resep</h6>
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
                      code: 'id',
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
import FarmasiTelaahObatRacikList from './farmasi_telaah_obat_racik_list.vue'
import moment from 'moment'
moment.locale('id')

export default {
  name: 'farmasi_penyerahan',
  components: { FarmasiTelaahObatRacikList },
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
    console.log('aResepDetail', this.aResepDetail)
  },
  methods: {
    onSubmit(data) {
      this.mData.resep_id = this.oResep.id
      this.$_api.create('resep_detail_rjalan', this.mData).then((res) => {
        this.switchState('list')
        this.$emit('reloadData')
      })
    },
    updateResepDetail (data) {
      this.$_api.update('resep_detail_rjalan', data).then((res) => {
        this.switchState('list')
        this.$emit('reloadData')
      })
    },
    async submitData() {
      console.log('submitData', this.aResepDetail);
      const organization = localStorage.getItem("organization_satu_sehat");

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

      console.log('proces resep 0', this.aResepDetail);
      try {

        for (const [idx, o] of this.aResepDetail.filter((xx) => xx.ihs_medication_id && xx.ihs_medication_request_id).entries()) {
          console.log('proces resep 1');
          const dResep = { ...o };
          let frequency = 1;
          let dose = 1;
          if (o.final_signa && o.final_signa.includes("X")) {
            const parts = o.final_signa.split("X");
            frequency = parseInt(parts[0]) || 1;
            dose = parseInt(parts[1]) || 1;
          }
  
          const medicationRequestPayload = {
            resourceType: "MedicationDispense",
            status: "completed",
            // intent: "order",
            "category": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/fhir/CodeSystem/medicationdispense-category",
                  "code": "community",
                  "display": "Community"
                }
              ]
            },
            medicationReference: {
              reference: `Medication/${o.ihs_medication_id.replace(/"/g, '')}`,
              display: o.final_nama_obat,
            },
            subject: {
              reference: `Patient/${registrasi.satu_sehat_id_pasien}`,
              display: registrasi.nama_lengkap,
            },
            context: {
              reference: `Encounter/${registrasi.satu_sehat_id}`,
            },
            // authoredOn: new Date().toISOString(),
            // requester: {
            //   reference: `Practitioner/${registrasi.satu_sehat_id_dokter}`,
            //   display: registrasi.nama_dokter,
            // },
            dosageInstruction: [
              {
                sequence: 1,
                "additionalInstruction": [
                  {
                    "coding": [
                      {
                        "system": "http://snomed.info/sct",
                        "code": "418577003",
                        "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed"
                      }
                    ]
                  }
                ],
                patientInstruction: o.final_aturan_pakai,
                timing: {
                  repeat: {
                    frequency,
                    period: 1,
                    periodUnit: "d",
                  },
                },
                doseAndRate: [
                  {
                    doseQuantity: {
                      system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                      value: dose,
                      unit: "TAB",
                      code: "TAB"
                    },
                  },
                ],
              },
            ],
            // dispenseRequest: {
            //   quantity: {
            //     value: o.final_qty || 0,
            //     system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
            //     unit: "TAB",
            //     code: "TAB"
            //   },
            //   performer: {
            //     reference: `Organization/${organization}`,
            //   },
            // },
            
            identifier: [
              {
                system: `http://sys-ids.kemkes.go.id/prescription/${organization}`,
                use: "official",
                value: `${this.oResep.id}`,
              },
              {
                system: `http://sys-ids.kemkes.go.id/prescription-item/${organization}`,
                use: "official",
                value: `${this.oResep.id}-${idx + 1}`,
              },
            ],
  
            // "identifier": [
            //   {
            //     "system": "http://sys-ids.kemkes.go.id/prescription/{{Org_id}}",
            //     "use": "official",
            //     "value": "123456788"
            //   },
            //   {
            //     "system": "http://sys-ids.kemkes.go.id/prescription-item/{{Org_id}}",
            //     "use": "official",
            //     "value": "123456788-1"
            //   }
            // ],
            // "status": "completed",
            // "category": {
            //   "coding": [
            //     {
            //       "system": "http://terminology.hl7.org/fhir/CodeSystem/medicationdispense-category",
            //       "code": "community",
            //       "display": "Community"
            //     }
            //   ]
            // },
            // "medicationReference": {
            //   "reference": "Medication/{{Medication_ForDispense}}",
            //   "display": "{{Medication_Name}}"
            // },
            // "subject": {
            //   "reference": "Patient/{{Patient_id}}",
            //   "display": "{{Patient_Name}}"
            // },
            // "context": {
            //   "reference": "Encounter/{{Encounter_id}}"
            // },
            "performer": [
              {
                "actor": {
                  "reference": "Practitioner/12931433848",
                  "display": "Rahmawati Nursafitri"
                }
              }
            ],
            "location": {
              "reference": "Location/a7e79ede-ba00-49de-94b6-2ae833726dcd",
              "display": "Farmasi Umum"
            },
            "authorizingPrescription": [
              {
                "reference": `MedicationRequest/${o.ihs_medication_request_id.replace(/"/g, '')}`,
              }
            ],
            "quantity": {
              "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
              "code": "TAB",
              "value": o.final_qty || 0
            },
            "daysSupply": {
              "value": 30,
              "unit": "Day",
              "system": "http://unitsofmeasure.org",
              "code": "d"
            },
            "whenPrepared": "2023-08-31T03:27:00+00:00",
            "whenHandedOver": "2023-08-31T03:27:00+00:00",
            // "dosageInstruction": [
            //   {
            //     "sequence": 1,
            //     "additionalInstruction": [
            //       {
            //         "coding": [
            //           {
            //             "system": "http://snomed.info/sct",
            //             "code": "418577003",
            //             "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed"
            //           }
            //         ]
            //       }
            //     ],
            //     "patientInstruction": "4 tablet perhari, diminum setiap hari tanpa jeda sampai prose pengobatan berakhir",
            //     "timing": {
            //       "repeat": {
            //         "frequency": 1,
            //         "period": 1,
            //         "periodUnit": "d"
            //       }
            //     },
            //     "doseAndRate": [
            //       {
            //         "type": {
            //           "coding": [
            //             {
            //               "system": "http://terminology.hl7.org/CodeSystem/dose-rate-type",
            //               "code": "ordered",
            //               "display": "Ordered"
            //             }
            //           ]
            //         },
            //         "doseQuantity": {
            //           "value": 4,
            //           "unit": "TAB",
            //           "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
            //           "code": "TAB"
            //         }
            //       }
            //     ]
            //   }
            // ]
          };
  
          console.log('medicationRequestPayload', medicationRequestPayload);
          const medicationDispense = await this.$_api.post('ihs/request', {
            uri: 'MedicationDispense',
            method: 'post',
            data: medicationRequestPayload
          });
          console.log('medicationDispense', medicationDispense);
  
          await this.$_api.post("resep_detail_rjalan/update", {
            ...dResep,
            id: dResep.id_resep_detail_rjalan,
            ihs_pengeluaran_obat_id: medicationDispense.data.id
          });
        }
      } catch (error) {
        console.log('error proses resep', error);
      }
      this.$emit('updateResepData', { ...this.oResep, tahap_resep: this.oResep.tahap_resep+1 })
    },
    switchState(state) {
      this.state = state
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>