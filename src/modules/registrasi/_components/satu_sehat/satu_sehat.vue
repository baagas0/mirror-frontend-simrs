<template>
  <span>
    <button
      class="btn btn-info btn-circle mt-3"
      @click="onSubmit()"
      :disabled="disabled"
    >
      <i class="ri-loop-left-line"></i>
      Sync Satu Sehat
    </button>

    <b-toast
      id="toast-detail-syncIhs"
      variant="info"
      solid
      no-auto-hide
      no-close-button
      :visible="isLoadingIhsSync"
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-center pt-2">
          <b-spinner label="Spinning" small></b-spinner>
          <strong class="mr-auto pl-3">Indonesia Health System ...</strong>
          <small class="text-muted mr-2">
            <time-ago locale="id"></time-ago>
          </small>
        </div>
      </template>
      Sedang sync dengan Satu Sehat.
      <b-progress class="mt-3" :value="0" :max="1" animated></b-progress>
    </b-toast>

    <b-modal
      id="modal-ihs-observation"
      title="Hasil Observasi Kunjungan"
      hide-footer
    >
      <!-- <pre>{{ dataObject }}</pre> -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
          <div class="row">
            <div class="col-12">
              <s-input
                v-model="value"
                :key="'value'"
                :id="'value'"
                :item="{
                  label: 'Heart rate',
                  id: 'value',
                  data: 'value',
                  type: 'number',
                  suffix: 'beats/minute',
                  validation: ['required'],
                  value: value,
                }"
                :valuee="value"
              />
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
    </b-modal>
  </span>
</template>

<script>
import moment from "moment";
moment.locale("id");

export default {
  name: "satu_sehat",
  props: {
    dataRegistrasi: { type: Object, required: true },
    disabled: { type: Boolean, required: true },
    heart_rates: { type: Array, required: true },
  },
  data() {
    return {
      isLoadingIhsSync: false,
      actCode: {
        RINAP: {
          code: "IMP",
          display: "inpatient encounter",
        },
        IGD: {
          code: "EMER",
          display: "emergency",
        },
        RAJAL: {
          code: "AMB",
          display: "ambulatory",
        },
      },
      value: 0,
    };
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      this.$bvModal.hide("modal-ihs-observation");
      this.syncSatuSehat(this.dataRegistrasi);
    },
    async syncSatuSehat(data) {
      try {
        this.isLoadingIhsSync = true;
        let encounter_id = data.satu_sehat_id_registrasi;

        let organization = localStorage.getItem("organization_satu_sehat");
        if (
          !organization ||
          organization == "null" ||
          organization == "undefined"
        ) {
          const ihs = await this.$_api.post("ihs/organization_id", {});
          localStorage.setItem(
            "organization_satu_sehat",
            ihs.data.organization_id
          );
          // this.$_alert.error({}, 'Sync Gagal', 'Organisasi ID tidak ditemukan, login ulang untuk mendapatkan organisasi ID')
          // this.isLoadingIhsSync = false
          // return
        }

        if (data.satu_sehat_id_registrasi == null) {
          const encounter = await this.syncSatuSehatEncounter(data);
          encounter_id = encounter.data.id;
          data.satu_sehat_id = encounter.data.id;
          data.satu_sehat_id_registrasi = encounter.data.id;
        } else console.info("encounter telah sync");

        if (data.satu_sehat_condition_id_registrasi == null) {
          const condition = await this.syncSatuSehatCondition(
            data,
            encounter_id
          );
          data.satu_sehat_condition_id = condition.data.id;
          data.satu_sehat_condition_id_registrasi = condition.data.id;
        } else console.info("condition telah sync");

        if (data.satu_sehat_observation_id_registrasi == null) {
          for (let i = 0; i < this.heart_rates.length; i++) {
            const heart_rate = this.heart_rates[i];

            const observation = await this.syncSatuSehatObservasi(
              data,
              encounter_id,
              heart_rate
            );
            data.satu_sehat_observation_id = observation.data.id;
            data.satu_sehat_observation_id_registrasi = observation.data.id;
          }
        } else console.info("obervation telah sync");

        console.log("data", data);
        if (data.satu_sehat_request_service_id == null) {
          await this.syncSatuSehatProcedureRajal(data, encounter_id);
        } else {
          console.info("service request dan procedure telah sync");
        }

        if (data.satu_sehat_tindak_lanjut_id == null) {
          await this.syncSatuSehatPlanningRajal(data, encounter_id);
        } else {
          console.info("tindak lanjut telah sync");
        }

        if (data.satu_sehat_clinical_impression_id == null) {
          await this.syncSatuSehatClinicalImpressionRajal(data, encounter_id);
        } else {
          console.info("clinical impression telah sync");
        }

        if (data.satu_sehat_diet_id == null) {
          try {
            await this.syncSatuSehatDietRajal(data, encounter_id);
          } catch (error) {
            console.error("gagal sync diet", error);
          }
        } else {
          console.info("diet telah sync");
        }

        if (data.satu_sehat_kontrol_kembali_id == null) {
          try {
            await this.syncSatuSehatKontrolRajal(data, encounter_id);
          } catch (error) {
            console.error("gagal sync kontrol", error);
          }
        } else {
          console.info("kontrol telah sync");
        }

        if (data.satu_sehat_alleri_intoleran_id == null) {
          try {
            await this.syncSatuSehatAlergiIntoleranRajal(data, encounter_id);
          } catch (error) {
            console.error("gagal sync alergi intoleran", error);
          }
        } else {
          console.info("alergi intoleran telah sync");
        }

        this.isLoadingIhsSync = false;
        this.$_alert.success("Berhasil sync data dengan Satu Sehat");
      } catch (error) {
        console.error("gagal", error);
        // this.isLoadingIhsSync = false
        // this.$bvToast.hide('toast-detail-syncIhs')
      }
    },
    async syncSatuSehatEncounter(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const organization = localStorage.getItem("organization_satu_sehat");

          let payload = {};

          if (data.satu_sehat_id_pasien == null) {
            //
            this.$_alert.error({}, "Pasien belum sync dengan satu sehat.");
            this.isLoadingIhsSync = false;
            return reject("Pasien belum sync dengan satu sehat");
          }

          if (data.satu_sehat_id_dokter == null) {
            //
            this.$_alert.error({}, "Dokter belum sync dengan satu sehat.");
            this.isLoadingIhsSync = false;
            return reject("Dokter belum sync dengan satu sehat");
          }

          if (data.satu_sehat_id_registrasi === null) {
            // Create new location in IHS
            const status = "arrived";
            payload = {
              uri: "Encounter",
              method: "post",
              data: {
                resourceType: "Encounter",
                status: status,
                class: {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                  code: this.actCode[data.kode_jenis_layanan].code,
                  display: this.actCode[data.kode_jenis_layanan].display,
                },
                subject: {
                  reference: `Patient/${data.satu_sehat_id_pasien}`,
                  display: data.nama_lengkap,
                },
                participant: [
                  {
                    type: [
                      {
                        coding: [
                          {
                            system:
                              "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                            code: "ATND",
                            display: "attender",
                          },
                        ],
                      },
                    ],
                    individual: {
                      reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                      display: data.nama_dokter,
                    },
                  },
                ],
                period: {
                  start: data.tgl_registrasi,
                },
                // location: [
                //   {
                //     location: {
                //       reference: "Location/b017aa54-f1df-4ec2-9d84-8823815d7228",
                //       display: "Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G"
                //     }
                //   }
                // ],
                statusHistory: [
                  {
                    status: "arrived",
                    period: {
                      start: data.tgl_registrasi,
                    },
                  },
                ],
                serviceProvider: {
                  reference: `Organization/${organization}`,
                },
                identifier: [
                  {
                    system: `http://sys-ids.kemkes.go.id/encounter/${organization}`,
                    value: "" + data.no_kunjungan,
                  },
                ],
              },
            };

            if (data.kode_jenis_layanan === "RAJAL") {
              payload.data.location = [
                {
                  location: {
                    reference: `Location/${data.satu_sehat_id_poliklinik}`,
                    display: data.nama_poliklinik,
                  },
                },
              ];
            } else {
              const poli = await this.$_api.post("msPoliklinik/list", {
                nama_poliklinik: "UGD",
              });
              if (
                poli.data &&
                poli.data.length > 0 &&
                poli.data[0].satu_sehat_id
              ) {
                payload.data.location = [
                  {
                    location: {
                      reference: `Location/${poli.data[0].satu_sehat_id}`,
                      display: poli.data[0].nama_poliklinik,
                    },
                  },
                ];
              } else {
                this.$_alert.error({}, "Poli UGD Tidak ditemukan.");
                this.isLoadingIhsSync = false;
                return reject("Poli UGD Tidak ditemukan.");
              }
            }

            const encounter = await this.$_api.post("ihs/request", payload);

            await this.$_api.post("registrasi/updateSatuSehat", {
              ...data,
              id: data.registrasi_id,
              satu_sehat_id: encounter.data.id,
              satu_sehat_status: "arrived",
              satu_sehat_last_payload: payload.data,
            });

            // HIDE IHS TOAST
            this.isLoadingIhsSync = false;

            resolve(encounter);
          } else {
            this.$_alert.error({}, "IHS sudah tersedia.");

            // HIDE IHS TOAST
            this.isLoadingIhsSync = false;
            return reject("IHS sudah tersedia.");
          }
        } catch (error) {
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false;

          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatCondition(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          // GET DIAGNOSA
          const diagnosa = await this.$_api.post(
            "registrasi/list_diagnosa_by_registrasi_id",
            { registrasi_id: data.registrasi_id }
          );
          const diagnosa_data = diagnosa.data.map((x) => {
            return {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: x.kode_diagnosa,
              display: x.nama_diagnosa,
            };
          });

          if (diagnosa_data.length === 0) {
            return resolve({ data: { id: null } });
            // return resolve('Sync dihentikan karena ICD-10 kosong, silahkan tambahkan terlebih dahulu')
            // const x = await this.$_alert.confirm('Diagnosa ICD-10 kosong, anda ingin melanjutkan?')
            // if (!x.isConfirmed) {
            //   this.isLoadingIhsSync = false
            //   return reject('Sync dihentikan karena ICD-10 kosong, silahkan tambahkan terlebih dahulu')
            // }
          }

          let payload = {
            uri: "Condition",
            method: "post",
            data: {
              resourceType: "Condition",
              clinicalStatus: {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/condition-clinical",
                    code: "active",
                    display: "Active",
                  },
                ],
              },
              category: [
                {
                  coding: [
                    {
                      system:
                        "http://terminology.hl7.org/CodeSystem/condition-category",
                      code: "encounter-diagnosis",
                      display: "Encounter Diagnosis",
                    },
                  ],
                },
              ],
              code: {
                coding: diagnosa_data.length ? diagnosa_data : [],
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
                display: data.nama_lengkap,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
                display: `Kunjungan ${data.nama_lengkap}`,
              },
            },
          };

          const condition = await this.$_api.post("ihs/request", payload);

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_condition_id: condition.data.id,
          });

          // HIDE IHS TOAST
          this.isLoadingIhsSync = false;

          resolve(condition);
        } catch (error) {
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false;

          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatObservasi(data, encounter_id, heart_rate) {
      return new Promise(async (resolve, reject) => {
        try {
          let payload = {
            uri: "Observation",
            method: "post",
            data: {
              resourceType: "Observation",
              status: "final",
              category: [
                {
                  coding: [
                    {
                      system:
                        "http://terminology.hl7.org/CodeSystem/observation-category",
                      code: "vital-signs",
                      display: "Vital Signs",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "8867-4",
                    display: "Heart rate",
                  },
                ],
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
              },
              performer: [
                {
                  reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                },
              ],
              encounter: {
                reference: `Encounter/${encounter_id}`,
                display: `Pemeriksaan Heart rate ${data.nama_lengkap}`,
              },
              effectiveDateTime: heart_rate.date,
              issued: heart_rate.date,
              valueQuantity: {
                value: parseInt(heart_rate.value),
                unit: "beats/minute",
                system: "http://unitsofmeasure.org",
                code: "/min",
              },
            },
          };

          const observation = await this.$_api.post("ihs/request", payload);

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_observation_id: observation.data.id,
          });

          // return;
          resolve(observation);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          this.isLoadingIhsSync = false;
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatProcedureRajal(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const organization = localStorage.getItem("organization_satu_sehat");
          const startDate = new Date(data.tgl_registrasi).toISOString();

          let dataMedis = await this.$_api.list("assesment_medis_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataMedis.data.length === 0) {
            return resolve({ data: { id: null } });
          }

          const medis = dataMedis.data[0].json_assesment_medis_rjalan;

          let payloadServiceRequest = {
            uri: "ServiceRequest",
            method: "post",
            data: {
              resourceType: "ServiceRequest",
              identifier: [
                {
                  system: `http://sys-ids.kemkes.go.id/servicerequest/${organization}`,
                  value: "101010",
                },
              ],
              status: "active",
              intent: "original-order",
              priority: "routine",
              category: [
                {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: "409063005",
                      display: "Counseling",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://hl7.org/fhir/sid/icd-9-cm",
                    code: "88.78",
                    display: "Diagnostic ultrasound of gravid uterus",
                  },
                  // {
                  //   system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
                  //   code: "12017.PC013",
                  //   display: "Konseling Individu",
                  // },
                ],
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
              },
              occurrenceDateTime: startDate,
              authoredOn: startDate,
              requester: {
                reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                display: `${data.nama_dokter}`,
              },
              performer: [
                {
                  reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                  display: `${data.nama_dokter}`,
                },
              ],
              reasonCode: [
                {
                  // coding: [
                  //   {
                  //     system: "http://hl7.org/fhir/sid/icd-10",
                  //     code: "3617",
                  //     display: "Abdominal-coronary artery bypass",
                  //   },
                  // ],
                  coding: medis.assesment.diagnosa
                    .filter((x) => x.tipe_diagnosa !== "Non ICD")
                    .map((x) => ({
                      system: "http://hl7.org/fhir/sid/icd-10",
                      code: x.diagnosa.kode_diagnosa,
                      display: x.diagnosa.nama_diagnosa,
                    })),
                },
              ],
              note: [
                {
                  text: "Pasien melakukan konseling terkait masalah penyakitnya",
                },
              ],
            },
          };

          // console.log('medis', medis)
          // return;
          const serviceRequest = await this.$_api.post(
            "ihs/request",
            payloadServiceRequest
          );

          let payloadProcedure = {
            uri: "Procedure",
            method: "post",
            data: {
              resourceType: "Procedure",
              basedOn: [
                {
                  reference:
                    "ServiceRequest/03660b3d-d792-4b43-8705-4148e94d4d58",
                },
              ],
              status: "completed",
              category: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "409063005",
                    display: "Counseling",
                  },
                ],
              },
              code: {
                coding: [
                  {
                    system: "http://hl7.org/fhir/sid/icd-9-cm",
                    code: "88.78",
                    display: "Diagnostic ultrasound of gravid uterus",
                  },
                  {
                    system: "http://snomed.info/sct",
                    code: "445142003",
                    display: "Counseling about disease",
                  },
                ],
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
                display: data.nama_lengkap,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
              },
              performedPeriod: {
                start: startDate,
                end: startDate,
              },
              performer: [
                {
                  actor: {
                    reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                    display: `${data.nama_dokter}`,
                  },
                },
              ],
              reasonCode: [
                {
                  coding: medis.assesment.diagnosa.map((x) => ({
                    system: "http://hl7.org/fhir/sid/icd-10",
                    code: x.diagnosa.kode_diagnosa,
                    display: x.diagnosa.nama_diagnosa,
                  })),
                },
              ],
              note: [
                {
                  text: "Konseling keresahan pasien karena diagnosis",
                },
              ],
            },
          };

          const resProcedure = await this.$_api.post(
            "ihs/request",
            payloadProcedure
          );

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_request_service_id: serviceRequest.data.id,
            satu_sehat_procedure_id: resProcedure.data.id,
          });
          console.log("serviceRequest", serviceRequest);

          resolve(resProcedure);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          this.isLoadingIhsSync = false;
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatPlanningRajal(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const organization = localStorage.getItem("organization_satu_sehat");
          const startDate = new Date(data.tgl_registrasi).toISOString();

          let dataMedis = await this.$_api.list("assesment_medis_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataMedis.data.length === 0) {
            return resolve({ data: { id: null } });
          }

          const medis = dataMedis.data[0].json_assesment_medis_rjalan;

          let dataKep = await this.$_api.list("assesment_keperawatan_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataKep.data.length === 0) {
            return resolve({ data: { id: null } });
          }

          const kep = dataKep.data[0].json_assesment_keperawatan_rjalan;

          console.log("kep", kep);

          const note =
            kep && kep.planning && kep.planning.rencana
              ? kep.planning.rencana
              : undefined;
          if (!note) {
            return resolve({ data: { id: null } });
          }

          let payloadServiceRequest = {
            uri: "ServiceRequest",
            method: "post",
            data: {
              resourceType: "ServiceRequest",
              identifier: [
                {
                  system: `http://sys-ids.kemkes.go.id/servicerequest/${organization}`,
                  value: "00001",
                },
              ],
              status: "active",
              intent: "original-order",
              priority: "routine",
              category: [
                {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: "3457005",
                      display: "Patient referral",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "185389009",
                    display: "Follow-up visit",
                  },
                ],
                text: note,
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
              },
              occurrenceDateTime: startDate,
              authoredOn: startDate,
              requester: {
                reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                display: `${data.satu_sehat_nama_dokter}`,
              },
              performer: [
                {
                  reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                  display: `${data.satu_sehat_nama_dokter}`,
                },
              ],
              reasonCode: [
                {
                  // "coding": [
                  //   {
                  //     "system": "http://hl7.org/fhir/sid/icd-10",
                  //     "code": "A91",
                  //     "display": "Dengue haemorrhagic fever"
                  //   }
                  // ]
                  coding: medis.assesment.diagnosa
                    .filter((x) => x.tipe_diagnosa !== "Non ICD")
                    .map((x) => ({
                      system: "http://hl7.org/fhir/sid/icd-10",
                      code: x.diagnosa.kode_diagnosa,
                      display: x.diagnosa.nama_diagnosa,
                    })),
                },
              ],
              locationReference: [
                {
                  reference: `Location/${data.satu_sehat_id_poliklinik}`,
                  display: data.nama_poliklinik,
                },
              ],
              patientInstruction: note,
            },
          };
          const serviceRequest = await this.$_api.post(
            "ihs/request",
            payloadServiceRequest
          );

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_tindak_lanjut_id: serviceRequest.data.id,
          });
          console.log("serviceRequest", serviceRequest);

          resolve(serviceRequest);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          this.isLoadingIhsSync = false;
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatClinicalImpressionRajal(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          let dataMedis = await this.$_api.list("assesment_medis_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataMedis.data.length === 0) {
            return resolve({ data: { id: null } });
          }

          const medis = dataMedis.data[0].json_assesment_medis_rjalan;

          // Ambil data subjective
          const keluhanUtama = medis.subjective.keluhan_utama || "-";
          const riwayat = medis.subjective.riwayat_kesehatan_saat_ini || "-";

          // Ambil data objective
          const pemeriksaanFisik = medis.objective.pemeriksaan_fisik || "-";
          const nadi = medis.objective.nadi
            ? `${medis.objective.nadi} x/menit`
            : "-";
          const suhu = medis.objective.suhu
            ? `${medis.objective.suhu} °C`
            : "-";
          const sistolik = medis.objective.sistolik || "-";
          const diastolik = medis.objective.diastolik || "-";
          const bb = medis.objective.berat_badan || "-";
          const tb = medis.objective.tinggi_badan || "-";
          const imt = medis.objective.index_masa_tubuh || "-";
          const gizi = medis.objective.status_gizi || "-";

          // Ambil diagnosis (kalau ada)
          let diagnosisText = "";
          if (medis.assesment.keperawatan.length > 0) {
            const diag = medis.assesment.keperawatan[0];
            diagnosisText = `Diagnosis keperawatan: ${diag.diagnosa_keperawatan.nama_diagnosa} (${diag.diagnosa_keperawatan.kode_diagnosa}), status: ${diag.evaluasi_diagnosa}.`;
          }

          // Buat summary narasi
          const summary = `Pasien datang dengan keluhan utama: ${keluhanUtama}. 
          Riwayat kesehatan saat ini: ${riwayat}. 
          Pemeriksaan fisik: ${pemeriksaanFisik}, nadi ${nadi}, suhu ${suhu}, tekanan darah ${sistolik}/${diastolik} mmHg, BB ${bb} kg, TB ${tb} cm, IMT ${imt} (${gizi}). 
          ${diagnosisText}`
            .replace(/\s+/g, " ")
            .trim();

          let payload = {
            uri: "ClinicalImpression",
            method: "post",
            data: {
              resourceType: "ClinicalImpression",
              status: "completed",
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "44808001",
                    display: "Clinical assessment",
                  },
                ],
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
                display: data.nama_lengkap,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
              },
              effectiveDateTime: new Date().toISOString(),
              date: new Date().toISOString(),
              assessor: {
                reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                display: data.nama_dokter,
              },
              summary: summary,
              prognosisCodeableConcept: [
                {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: "170968001",
                      display: "Prognosis good",
                    },
                  ],
                },
              ],
            },
          };

          const clinicalImpression = await this.$_api.post(
            "ihs/request",
            payload
          );

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_clinical_impression_id: clinicalImpression.data.id,
          });

          resolve(clinicalImpression);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
        }
      });
    },
    async syncSatuSehatDietRajal(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const startDate = new Date(data.tgl_registrasi).toISOString();

          let dataMedis = await this.$_api.list("assesment_medis_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataMedis.data.length === 0) {
            return resolve({ data: { id: null } });
          }
          const medis = dataMedis.data[0].json_assesment_medis_rjalan;

          if (!medis.planning) {
            return resolve({ data: { id: null } });
          }

          let diet_exclude_food_nutrient = medis.planning
            .diet_exclude_food_nutrient
            ? medis.planning.diet_exclude_food_nutrient.split("|")
            : ["", ""];
          let diet_nutrient = medis.planning.diet_nutrient
            ? medis.planning.diet_nutrient.split("|")
            : ["", ""];
          let diet_type = medis.planning.diet_type
            ? medis.planning.diet_type.split("|")
            : ["", ""];

          let payloadDiet = {
            uri: "NutritionOrder",
            method: "post",
            data: {
              resourceType: "NutritionOrder",
              status: "active",
              intent: "proposal",
              patient: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
              },
              dateTime: startDate,
              orderer: {
                reference: `Practitioner/${data.satu_sehat_id_dokter}`,
              },
              excludeFoodModifier: [
                {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: diet_exclude_food_nutrient[0],
                      display: diet_exclude_food_nutrient[1],
                    },
                  ],
                },
              ],
              oralDiet: {
                type: [
                  {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: diet_type[0],
                        display: diet_type[1],
                      },
                    ],
                  },
                ],
                nutrient: [
                  {
                    modifier: {
                      coding: [
                        {
                          system: "http://snomed.info/sct",
                          code: diet_nutrient[0],
                          display: diet_nutrient[1],
                        },
                      ],
                    },
                    amount: {
                      value: 2,
                      unit: "L",
                      system: "http://unitsofmeasure.org",
                      code: "L",
                    },
                  },
                ],
              },
            },
          };
          const dietRequest = await this.$_api.post("ihs/request", payloadDiet);

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_diet_id: dietRequest.data.id,
          });
          console.log("dietRequest", dietRequest);

          resolve(dietRequest);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          this.isLoadingIhsSync = false;
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatKontrolRajal(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const organization_id = localStorage.getItem(
            "organization_satu_sehat"
          );
          const startDate = new Date(data.tgl_registrasi).toISOString();

          let dataMedis = await this.$_api.list("assesment_medis_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataMedis.data.length === 0) {
            return resolve({ data: { id: null } });
          }
          const medis = dataMedis.data[0].json_assesment_medis_rjalan;

          if (!medis.planning) {
            return resolve({ data: { id: null } });
          }
          if (!medis.planning.tindak_lanjut_kontrol) {
            return resolve({ data: { id: null } });
          }

          let payloadDiet = {
            uri: "ServiceRequest",
            method: "post",
            data: {
              resourceType: "ServiceRequest",
              identifier: [
                {
                  system: `http://sys-ids.kemkes.go.id/servicerequest/${organization_id}`,
                  value: "00001",
                },
              ],
              status: "active",
              intent: "original-order",
              priority: "routine",
              category: [
                {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: "3457005",
                      display: "Patient referral",
                    },
                  ],
                },
              ],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "185389009",
                    display: "Follow-up visit",
                  },
                ],
                text: `Kontrol ${medis.planning.tindak_lanjut_kontrol}`,
              },
              subject: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
              },
              occurrenceDateTime: startDate,
              authoredOn: startDate,
              requester: {
                reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                display: `${data.nama_dokter}`,
              },
              performer: [
                {
                  reference: `Practitioner/${data.satu_sehat_id_dokter}`,
                  display: `${data.nama_dokter}`,
                },
              ],
              reasonCode: [
                {
                  coding: medis.assesment.diagnosa
                    .filter((x) => x.tipe_diagnosa !== "Non ICD")
                    .map((x) => ({
                      system: "http://hl7.org/fhir/sid/icd-10",
                      code: x.diagnosa.kode_diagnosa,
                      display: x.diagnosa.nama_diagnosa,
                    })),
                },
              ],
              locationReference: [
                {
                  reference: `Location/${data.satu_sehat_id_poliklinik}`,
                  display: data.nama_poliklinik,
                },
              ],
              patientInstruction: `Kontrol setelah ${medis.planning.tindak_lanjut_kontrol} istirahat di rumah. Dalam keadaan darurat dapat menghubungi hotline Fasyankes`,
            },
          };
          const ihsRequest = await this.$_api.post("ihs/request", payloadDiet);

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_kontrol_kembali_id: ihsRequest.data.id,
          });
          console.log("ihsRequest", ihsRequest);

          resolve(ihsRequest);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          this.isLoadingIhsSync = false;
          reject("Terjadi Kesalahan");
        }
      });
    },
    async syncSatuSehatAlergiIntoleranRajal(data, encounter_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const organization_id = localStorage.getItem(
            "organization_satu_sehat"
          );
          const startDate = new Date(data.tgl_registrasi).toISOString();

          let dataMedis = await this.$_api.list("assesment_medis_rjalan", {
            registrasi_id: data.registrasi_id,
            page: 1,
            limit: 99999,
          });
          if (dataMedis.data.length === 0) {
            return resolve({ data: { id: null } });
          }
          const medis = dataMedis.data[0].json_assesment_medis_rjalan;

          if (!medis.subjective) {
            return resolve({ data: { id: null } });
          }
          if (!medis.subjective.riwayat_alergi_kfa_id) {
            return resolve({ data: { id: null } });
          }

          const coding = medis.subjective.riwayat_alergi_kfa_id.split("|");
          if (coding.length < 2) {
            return resolve({ data: { id: null } });
          }

          let payloadDiet = {
            uri: "AllergyIntolerance",
            method: "post",
            data: {
              resourceType: "AllergyIntolerance",
              identifier: [
                {
                  system: `http://sys-ids.kemkes.go.id/allergy/${organization_id}`,
                  use: "official",
                  value: "2024011234888",
                },
              ],
              clinicalStatus: {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                    code: "active",
                    display: "Active",
                  },
                ],
              },
              verificationStatus: {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                    code: "confirmed",
                    display: "Confirmed",
                  },
                ],
              },
              category: ["medication"],
              code: {
                coding: [
                  {
                    system: "http://sys-ids.kemkes.go.id/kfa",
                    code: coding[0],
                    display: coding[1],
                  },
                ],
                text: medis.subjective.riwayat_alergi_text,
              },
              patient: {
                reference: `Patient/${data.satu_sehat_id_pasien}`,
                display: data.nama_lengkap,
              },
              encounter: {
                reference: `Encounter/${encounter_id}`,
                display:
                  `Kunjungan ${data.nama_lengkap} di hari Kamis, 22 Desember 2022`,
              },
              recordedDate: startDate,
              recorder: {
                reference: `Practitioner/${data.satu_sehat_id_dokter}`,
              },
            },
            // data: {
            //   resourceType: "ServiceRequest",
            //   identifier: [
            //     {
            //       system: `http://sys-ids.kemkes.go.id/servicerequest/${organization_id}`,
            //       value: "00001",
            //     },
            //   ],
            //   status: "active",
            //   intent: "original-order",
            //   priority: "routine",
            //   category: [
            //     {
            //       coding: [
            //         {
            //           system: "http://snomed.info/sct",
            //           code: "3457005",
            //           display: "Patient referral",
            //         },
            //       ],
            //     },
            //   ],
            //   code: {
            //     coding: [
            //       {
            //         system: "http://snomed.info/sct",
            //         code: "185389009",
            //         display: "Follow-up visit",
            //       },
            //     ],
            //     text: `Kontrol ${medis.planning.tindak_lanjut_kontrol}`,
            //   },
            //   subject: {
            //     reference: `Patient/${data.satu_sehat_id_pasien}`,
            //   },
            //   encounter: {
            //     reference: `Encounter/${encounter_id}`,
            //   },
            //   occurrenceDateTime: startDate,
            //   authoredOn: startDate,
            //   requester: {
            //     reference: `Practitioner/${data.satu_sehat_id_dokter}`,
            //     display: `${data.nama_dokter}`,
            //   },
            //   performer: [
            //     {
            //       reference: `Practitioner/${data.satu_sehat_id_dokter}`,
            //       display: `${data.nama_dokter}`,
            //     },
            //   ],
            //   reasonCode: [
            //     {
            //       coding: medis.assesment.diagnosa
            //         .filter((x) => x.tipe_diagnosa !== "Non ICD")
            //         .map((x) => ({
            //           system: "http://hl7.org/fhir/sid/icd-10",
            //           code: x.diagnosa.kode_diagnosa,
            //           display: x.diagnosa.nama_diagnosa,
            //         })),
            //     },
            //   ],
            //   locationReference: [
            //     {
            //       reference: `Location/${data.satu_sehat_id_poliklinik}`,
            //       display: data.nama_poliklinik,
            //     },
            //   ],
            //   patientInstruction:
            //     `Kontrol setelah ${medis.planning.tindak_lanjut_kontrol} istirahat di rumah. Dalam keadaan darurat dapat menghubungi hotline Fasyankes`,
            // },
          };
          const ihsRequest = await this.$_api.post("ihs/request", payloadDiet);

          await this.$_api.post("registrasi/updateSatuSehat", {
            ...data,
            id: data.registrasi_id,
            satu_sehat_alleri_intoleran_id: ihsRequest.data.id,
          });
          console.log("ihsRequest", ihsRequest);

          resolve(ihsRequest);
        } catch (error) {
          this.$_alert.error(
            error.data,
            "Terjadi Kesalahan",
            error.data.message
          );
          this.isLoadingIhsSync = false;
          reject("Terjadi Kesalahan");
        }
      });
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
