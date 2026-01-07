<template>
  <div>
    <template v-if="state === 'list'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="switchState('create')"><i class="ri-add-circle-line"></i> Tambah</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="p-3">
            <h5>- Obat Jadi</h5>
          </div>
        </div>
        <farmasi-telaah-obat-jadi-list :aResepDetail="aResepDetail" readonly="true"></farmasi-telaah-obat-jadi-list>

        <farmasi-telaah-obat-racik-list :oResep="oResep" disableEdit="true" disableAdd="true"></farmasi-telaah-obat-racik-list>
      </div>
      <div class="row px-3" v-if="aResepDetail.length">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-light-primary" @click="submitData()">Lanjutkan <i class="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </template>
    <template v-if="state === 'create'">
      <div class="row px-3">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bolder text-dark mb-0 pb-0">Form Tambah Resep</h6>
          <a class="btn btn-outline-primary btn-icon btn-circle" @click="switchState('list')"><i class="ri-arrow-go-back-line p-0"></i></a>
        </div>
        <div class="col-12 mt-3">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
              <div class="row">
                <div class="col-12">
                  <s-input
                    v-model="mData.awal_id_obat"
                    :key="'awal_id_obat'"
                    :id="'awal_id_obat'"
                    :item="{
                      label: 'Obat',
                      id: 'awal_id_obat',
                      data: 'awal_id_obat',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.awal_id_obat,
                      api: 'msBarang',
                      pointer: {
                        label: 'nama_barang',
                        code: 'ms_barang_id',
                        display: ['nama_barang'],
                      },
                      param: {
                        type: 'OBAT',
                      },
                    }"
                    :valuee="mData.awal_id_obat" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.produk_kfa_id"
                    :key="'produk_kfa_id'"
                    :id="'produk_kfa_id'"
                    :item="{
                      label: 'Daftar KFA',
                      id: 'produk_kfa_id',
                      data: 'produk_kfa_id',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.produk_kfa_id,
                      api: 'kfa/product',
                      pointer: {
                        label: 'name',
                        code: 'kfa_code',
                        display: ['kfa_code', 'name', 'manufacturer', 'registrar'],
                      },
                      param: {},
                    }"
                    :valuee="mData.awal_id_obat" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.awal_nama_obat"
                    :key="'awal_nama_obat'"
                    :id="'awal_nama_obat'"
                    :item="{
                      label: 'Nama Obat',
                      id: 'awal_nama_obat',
                      data: 'awal_nama_obat',
                      type: 'text',
                      validation: ['required'],
                      value: mData.awal_nama_obat,
                      param: {},
                    }"
                    :valuee="mData.awal_nama_obat" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.awal_harga"
                    :key="'awal_harga'"
                    :id="'awal_harga'"
                    :item="{
                      label: 'Harga',
                      id: 'awal_harga',
                      data: 'awal_harga',
                      type: 'money',
                      validation: ['required'],
                      value: mData.awal_harga,
                      param: {},
                    }"
                    :valuee="mData.awal_harga"
                    :disabled="true" />
                </div>
                <div class="col-12">
                  <s-input
                    v-model="mData.awal_signa"
                    :key="'awal_signa'"
                    :id="'awal_signa'"
                    :item="{
                      label: 'Signa',
                      id: 'awal_signa',
                      data: 'awal_signa',
                      type: 'text',
                      validation: ['required'],
                      value: mData.awal_signa,
                      param: {},
                    }"
                    :valuee="mData.awal_signa" />
                </div>
                <div class="col-4">
                  <s-input
                    v-model="mData.awal_aturan_pakai"
                    :key="'awal_aturan_pakai'"
                    :id="'awal_aturan_pakai'"
                    :item="{
                      label: 'Aturan Pakai',
                      id: 'awal_aturan_pakai',
                      data: 'awal_aturan_pakai',
                      type: 'lookup-radio',
                      validation: ['required'],
                      value: mData.awal_aturan_pakai,
                      pointer: {
                        label: 'label',
                        code: 'code',
                        display: ['label'],
                        list: [
                          { label: 'Tablet Sesudah Makan', code: 'Tablet Sesudah Makan' },
                          { label: 'Tablet Sebelum Makan', code: 'Tablet Sebelum Makan' },
                        ],
                      },
                      param: {},
                    }"
                    :valuee="mData.awal_aturan_pakai" />
                </div>
                <div class="col-4">
                  <s-input
                    v-model="mData.awal_satuan"
                    :key="'awal_satuan'"
                    :id="'awal_satuan'"
                    :item="{
                      label: 'Satuan',
                      id: 'awal_satuan',
                      data: 'awal_satuan',
                      type: 'text',
                      validation: ['required'],
                      value: mData.awal_satuan,
                      param: {},
                    }"
                    :valuee="mData.awal_satuan" />
                </div>
                <div class="col-4">
                  <s-input
                    v-model="mData.awal_qty"
                    :key="'awal_qty'"
                    :id="'awal_qty'"
                    :item="{
                      label: 'Qty',
                      id: 'awal_qty',
                      data: 'awal_qty',
                      type: 'number',
                      validation: ['required'],
                      value: mData.awal_qty,
                      param: {},
                    }"
                    :valuee="mData.awal_qty" />
                </div>
                <div class="col-12 align-self-center">
                  <button type="submit" class="btn btn-light-primary mr-3">
                    <i class="ri-save-line"></i>
                    {{ $t("global.submit") }}
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
import FarmasiTelaahObatJadiList from "./farmasi_telaah_obat_jadi_list.vue";
import FarmasiTelaahObatRacikList from "./farmasi_telaah_obat_racik_list.vue";
import moment from "moment";
moment.locale("id");

export default {
  name: "farmasi_draft_dokter",
  components: { FarmasiTelaahObatJadiList, FarmasiTelaahObatRacikList },
  props: {
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    oResep: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    aResepDetail: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      mData: {},
      state: "list",
    };
  },
  watch: {
    "mData.awal_id_obat": function (newVal, oldVal) {
      this.$_api.single("msBarang", { id: newVal }, newVal).then((res) => {
        this.mData.awal_nama_obat = res.data[0].nama_barang;
        this.mData.awal_harga = res.data[0].harga_pokok ? parseFloat(res.data[0].harga_pokok) : 0;
      });
    },
  },
  mounted() {},
  methods: {
    onSubmit(data) {
      this.mData.resep_id = this.oResep.id;
      this.$_api.create("resep_detail_rjalan", this.mData).then((res) => {
        this.mData = {};
        this.$emit("reloadData");
        this.switchState("list");
      });
    },
    async submitData() {
      const organization = localStorage.getItem("organization_satu_sehat");

      // Ambil detail resep
      const resResep = await this.$_api.list("resep_detail_rjalan", { resep_rjalan_id: this.oResep.id }, this.oResep.id);
      const resep = resResep.data;

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

      // Loop setiap obat → buat Medication + MedicationRequest
      try {
        for (const [idx, o] of resep.filter((xx) => !xx.ihs_medication_id).entries()) {
          // 1. Payload Medication
          const medicationPayload = {
            resourceType: "Medication",
            code: {
              coding: [
                {
                  system: "http://sys-ids.kemkes.go.id/kfa",
                  code: o.produk_kfa_id,
                  display: o.final_nama_obat,
                },
              ],
            },
            status: "active",
            form: {
              coding: [
                {
                  system: "http://terminology.kemkes.go.id/CodeSystem/medication-form",
                  code: "BS013",
                  display: o.final_satuan || "Tablet",
                },
              ],
            },
            identifier: [
              {
                system: `http://sys-ids.kemkes.go.id/medication/${organization}`,
                use: "official",
                value: o.final_id_obat,
              },
            ],
            manufacturer: {
              reference: `Organization/${organization}`,
            },
            extension: [
              {
                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
                valueCodeableConcept: {
                  coding: [
                    {
                      system: "http://terminology.kemkes.go.id/CodeSystem/medication-type",
                      code: "NC",
                      display: "Non-compound",
                    },
                  ],
                },
              },
            ],
          };

          // POST Medication
          const medRes = await this.$_api.post("ihs/request", {
            uri: "Medication",
            method: "post",
            data: medicationPayload,
          });

          const medicationId = medRes.data.id;
          resep[idx].ihs_medication_id = medicationId;
          console.log("Medication created:", medicationId);

          // 2. Hitung dosage
          let frequency = 1;
          let dose = 1;
          if (o.final_signa && o.final_signa.includes("X")) {
            const parts = o.final_signa.split("X");
            frequency = parseInt(parts[0]) || 1;
            dose = parseInt(parts[1]) || 1;
          }

          // 3. Payload MedicationRequest
          const medicationRequestPayload = {
            resourceType: "MedicationRequest",
            status: "completed",
            intent: "order",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/medicationrequest-category",
                    code: "outpatient",
                    display: "Outpatient",
                  },
                ],
              },
            ],
            priority: "routine",
            medicationReference: {
              reference: `Medication/${medicationId}`,
              display: o.final_nama_obat,
            },
            subject: {
              reference: `Patient/${registrasi.satu_sehat_id_pasien}`,
              display: registrasi.nama_lengkap,
            },
            encounter: {
              reference: `Encounter/${registrasi.satu_sehat_id}`,
            },
            authoredOn: new Date().toISOString(),
            requester: {
              reference: `Practitioner/${registrasi.satu_sehat_id_dokter}`,
              display: registrasi.nama_dokter,
            },
            dosageInstruction: [
              {
                sequence: 1,
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
                      code: "TAB",
                    },
                  },
                ],
              },
            ],
            dispenseRequest: {
              quantity: {
                value: o.final_qty || 0,
                system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                unit: "TAB",
                code: "TAB",
              },
              performer: {
                reference: `Organization/${organization}`,
              },
            },

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
          };

          // POST MedicationRequest
          const mrRes = await this.$_api.post("ihs/request", {
            uri: "MedicationRequest",
            method: "post",
            data: medicationRequestPayload,
          });
          resep[idx].ihs_medication_request_id = mrRes.data.id;

          await this.$_api.post("resep_detail_rjalan/update", resep[idx]);
        }
      } catch (error) {}

      this.$emit("updateResepData", {
        ...this.oResep,
        tahap_resep: this.oResep.tahap_resep + 1,
      });
    },

    // async submitData() {
    //   const organization = localStorage.getItem("organization_satu_sehat");
    //   const resResep = await this.$_api.list(
    //     "resep_detail_rjalan",
    //     { resep_rjalan_id: this.oResep.id },
    //     this.oResep.id
    //   );
    //   const resep = resResep.data;
    //   console.log("resep", resep);

    //   const ResRegistrasi = await this.$_api.post(
    //     "/registrasi/listKunjunganRajalPerHalaman",
    //     {
    //       registrasi_id: this.dataRegistrasi.registrasi_id,
    //       jumlah: 1,
    //       halaman: 1,
    //     },
    //     this.dataRegistrasi.registrasi_id
    //   );
    //   const registrasi = ResRegistrasi.data[0];
    //   console.log("registrasi2", registrasi);

    //   const containedMeds = resep.map((o, idx) => ({
    //     resourceType: "Medication",
    //     id: o.final_id_obat,
    //     code: {
    //       coding: [
    //         {
    //           system: "http://sys-ids.kemkes.go.id/kfa",
    //           code: o.produk_kfa_id,
    //           display: o.final_nama_obat,
    //         },
    //       ],
    //     },
    //     status: "active",
    //     form: {
    //       coding: [
    //         {
    //           system:
    //             "http://terminology.kemkes.go.id/CodeSystem/medication-form",
    //           code: "BS013",
    //           display: o.final_satuan || "Tablet",
    //         },
    //       ],
    //     },
    //     identifier: [
    //       {
    //         system: `http://sys-ids.kemkes.go.id/medication/${organization}`,
    //         use: "official",
    //         value: "123456789",
    //       },
    //     ],
    //     manufacturer: {
    //       reference: `Organization/${organization}`,
    //     },
    //     ingredient: o.bahan.map((x) => {
    //       const numerator = x.kekuatan_zat_aktif.split(" ");
    //       const strength = parseFloat(numerator[0]) || 0;
    //       const uom = numerator[1] || "g";
    //       return {
    //         itemCodeableConcept: {
    //           coding: [
    //             {
    //               system: "http://sys-ids.kemkes.go.id/kfa",
    //               code: x.kfa_code,
    //               display: x.zat_aktif,
    //             },
    //           ],
    //         },
    //         isActive: true,
    //         strength: {
    //           numerator: {
    //             value: parseFloat(strength) || 0,
    //             system: "http://unitsofmeasure.org",
    //             code: uom || "g",
    //           },
    //           denominator: {
    //             value: 1,
    //             unit: "Bottle - unit of product usage",
    //             system: "http://snomed.info/sct",
    //             code: "419672006",
    //           },
    //         },
    //       };
    //     }),
    //     extension: [
    //       {
    //         url: "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
    //         valueCodeableConcept: {
    //           coding: [
    //             {
    //               system:
    //                 "http://terminology.kemkes.go.id/CodeSystem/medication-type",
    //               code: "NC",
    //               display: "Non-compound",
    //             },
    //           ],
    //         },
    //       },
    //     ],
    //   }));

    //   const dosageInstruction = resep.map((o, idx) => {
    //     let frequency = 1;
    //     let dose = 1;
    //     if (o.final_signa && o.final_signa.includes("X")) {
    //       const parts = o.final_signa.split("X");
    //       frequency = parseInt(parts[0]) || 1;
    //       dose = parseInt(parts[1]) || 1;
    //     }
    //     return {
    //       sequence: idx + 1,
    //       patientInstruction: o.final_aturan_pakai,
    //       timing: {
    //         repeat: {
    //           frequency,
    //           period: 1,
    //           periodUnit: "d",
    //         },
    //       },
    //       doseAndRate: [
    //         {
    //           doseQuantity: {
    //             value: dose,
    //             unit: o.final_satuan || "Tablet",
    //           },
    //         },
    //       ],
    //       medicationReference: {
    //         reference: o.final_id_obat,
    //         display: o.final_nama_obat,
    //       },
    //     };
    //   });

    //   // console.log('containedMedss', containedMeds);
    //   // return

    //   const payloadIhs = {
    //     resourceType: "MedicationRequest",
    //     contained: containedMeds,
    //     status: "completed",
    //     intent: "order",
    //     category: [
    //       {
    //         coding: [
    //           {
    //             system:
    //               "http://terminology.hl7.org/CodeSystem/medicationrequest-category",
    //             code: "outpatient",
    //             display: "Outpatient",
    //           },
    //         ],
    //       },
    //     ],
    //     priority: "routine",
    //     subject: {
    //       reference: `Patient/${registrasi.satu_sehat_id_pasien}`,
    //       display: registrasi.nama_lengkap,
    //     },
    //     encounter: {
    //       reference: `Encounter/${registrasi.satu_sehat_id}`,
    //     },
    //     authoredOn: new Date().toISOString(),
    //     requester: {
    //       reference: `Practitioner/${registrasi.satu_sehat_id_dokter}`,
    //       display: registrasi.nama_dokter,
    //     },
    //     dosageInstruction,
    //     dispenseRequest: {
    //       quantity: {
    //         value: resep.reduce((sum, o) => sum + (o.final_qty || 0), 0),
    //         unit: "Tablet",
    //       },
    //       performer: {
    //         reference: `Organization/${organization}`,
    //       },
    //     },
    //     identifier: [
    //       {
    //         system: `http://sys-ids.kemkes.go.id/prescription/${organization}`,
    //         use: "official",
    //         value: "123456788",
    //       },
    //       {
    //         system: `http://sys-ids.kemkes.go.id/prescription-item/${organization}`,
    //         use: "official",
    //         value: "123456788-1",
    //       },
    //     ],
    //     "medicationReference": {
    //       "reference": "#123456789",
    //       "display": "{{Medication_Name}}"
    //     },
    //   };

    //   console.log("payloadIhs", payloadIhs);

    //   const ihsObat = await this.$_api.post("ihs/request", {
    //     uri: "MedicationRequest",
    //     method: "post",
    //     data: payloadIhs,
    //   });

    //   console.log("ihsObat", ihsObat);

    //   this.$emit("updateResepData", {
    //     ...this.oResep,
    //     ihs_peresepan_obat_id: ihsObat.data.id,
    //     tahap_resep: this.oResep.tahap_resep + 1,
    //   });
    // },
    switchState(state) {
      this.state = state;
    },
  },
};
</script>
