<template lang="">
  <div class="container-fluid row">
    <div class="col-12">
      <!-- OVERVIEW Registrasi -->
      <div v-if="registrasi" class="card card-custom bgi-no-repeat gutter-b dropright evaluasi-keperawatan-active" >
        <div class="card-body d-flex align-items-center p-3">
            <div class="py-2 w-100">
                <div class="d-flex flex-row justify-content-start align-items-center" style="gap: 5px">
                  <div class="label label-pill label-inline label-warning">{{ registrasi.nama_asuransi }}</div>
                  <p class="text-white font-size-md pb-0 mb-0 ">{{ registrasi.no_identitas_registrasi }}</p>
                </div>
                <h3 class="text-white font-weight-bolder">Pasien : {{ registrasi.nama_lengkap }}</h3>

                <div class="d-flex flex-row justify-content-between align-items-center">
                  <div>
                    <p class="text-white font-size-lg pb-0 mb-0">{{ registrasi.nama_jenis_layanan }}</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between h-50px">
          <div class="d-flex flex-row align-items-center justify-content-between">
            <!-- DAFTAR EVALUASI -->
            <h5 class="font-weight-bolder text-dark mb-0 pb-0">EVALUASI KEPERAWATAN</h5>
            
          </div>
        </div>
        <div class="card-body p-3">
          <div class="">
            <div class="d-flex flex-row justify-content-between">
              <button class="btn btn btn-primary h-40px mb-3" @click="action('create-evaluasi', null)" :disabled="!op.registrasi_id">
                <i class="ri-add-circle-line p-0"></i>
                Tambah
              </button>
            </div>
          </div>
          
          <div v-if="!op.registrasi_id && listEvaluasiKeperawatan.length === 0" class="flex-grow-1 bg-danger p-8 rounded-xl flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: auto 70%; background-image: url(https://preview.keenthemes.com/metronic/theme/html/demo10/dist/assets/media/svg/humans/custom-3.svg)">
            <h4 class="text-inverse-danger mt-2 font-weight-bolder">Oooops...</h4>
            <p class="text-inverse-danger my-6">
                Pilih dulu registrasi terlebih dahulu
            </p>
          </div>

          <template v-for="(item, i) in listEvaluasiKeperawatan">
            <div :key="'list-evaluasi-keperawatan'+i" class="card card-custom bgi-no-repeat gutter-b dropright" :class="{ 'evaluasi-keperawatan-active': item.status_evaluasi_keperawatan, 'bg-gray-500': !item.status_evaluasi_keperawatan, 'card-active': evaluasiActiveID === item.id }">
              <!--begin::Body-->
              <div class="card-body d-flex align-items-center p-3" style="cursor: pointer" @click="$refs['action-evaluasi-'+item.id][0].show()">
                  <div class="py-2 w-100">
                      <div class="d-flex flex-row justify-content-start align-items-center" style="gap: 5px">
                        <div class="label label-pill label-inline" :class="{ 'label-warning': item.status_evaluasi_keperawatan, 'label-danger': !item.status_evaluasi_keperawatan }">{{ item.status_evaluasi_keperawatan ? 'Aktif' : 'Non Aktif' }}</div>
                        <p class="text-white font-size-md pb-0 mb-0 ">{{ item.waktu_evaluasi | parse('longDateTime') }}</p>
                      </div>
                      <!-- <h3 class="text-white font-weight-bolder">{{ item.user.username || '-' }}</h3> -->
                      <h3 class="text-white font-weight-bolder">{{ item.ms_dokter ? item.ms_dokter.nama_dokter : '-' }}</h3>
  
                      <div class="d-flex flex-row justify-content-between align-items-center">
                        <div>
                          <p class="text-white font-size-lg pb-0 mb-0">{{ item.tindak_lanjut }}</p>
                        </div>
                        <b-dropdown dropright text="Pilih Evaluasi" :ref="'action-evaluasi-'+item.id" variant="primary" class="m-2" toggle-class="btn-sm p-1" >
                          <b-dropdown-item @click="action('update-evaluasi', item.id)" :disabled="!item.status_evaluasi_keperawatan">Edit</b-dropdown-item>
                          <b-dropdown-item @click="action('implementasi', item.id)">Implementasi</b-dropdown-item>
                        </b-dropdown>
                      </div>
                  </div>
              </div>
              <!--end::Body-->
            </div>
          </template>

        </div>
      </div>
    </div>
    <div class="col-8">

      <div class="card">
        <div class="card-header p-3 d-flex flex-row align-items-center justify-content-between h-50px" style="">
          <h5 class="font-weight-bolder text-dark mb-0 pb-0">{{ stage === 'create-evaluasi' || stage === 'update-evaluasi' ? 'FORM EVALUASI' : 'IMPLEMENTASI KEPERAWATAN' }}</h5>
          <a class="btn btn-sm btn-outline-primary btn-icon btn-circle" v-if="stageImplementasi == 'create' || stageImplementasi == 'update'" @click="stageImplementasi = 'list'">
            <i class="ri-arrow-go-back-line p-0"></i>
          </a>
        </div>
        <div class="card-body p-3">
          <template v-if="stage == 'create-evaluasi' || stage == 'update-evaluasi'">
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
                  <div class="row">
                    <div class="col-6">
                      <!-- <s-input v-model="vEvaluasi.perawat_id" :item="{
                        label: 'Perawat',
                        id: 'perawat_id',
                        data: 'perawat_id',
                        type: 'select',
                        validation: ['required'],
                        value: evaluasiActiveData.perawat_id,
                        param: {},
                        pointer: {
                          label: 'username',
                          code: 'id',
                          display: ['username']
                        },
                        api: 'users',
                      }" :valuee="evaluasiActiveData.perawat_id" /> -->
                      <s-input v-model="vEvaluasi.perawat_id" :key="'2222'" :id="'2222'" :item="{
                        label: 'Perawat',
                        id: 'perawat_id',
                        data: 'perawat_id',
                        type: 'lookup-radio',
                        validation: ['required'],
                        value: evaluasiActiveData.perawat_id,
                        api: 'msDokter',
                        pointer: {
                          label: 'nama_dokter',
                          code: 'ms_dokter_id',
                          display: ['nama_tipe_tenaga_medis', 'nama_dokter', 'nik_dokter', 'npwp_dokter'],
                          headerDisplay: ['Tipe Tenaga Medis', 'Nama dokter', 'NIK', 'NPWP']
                        },
                        param: {
                          kode_tipe_tenaga_medis: 'PRW'
                        },
                      }" :valuee="evaluasiActiveData.perawat_id" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="vEvaluasi.waktu_evaluasi" :item="{
                        label: 'Waktu Evaluasi',
                        id: 'waktu_evaluasi',
                        data: 'waktu_evaluasi',
                        value: evaluasiActiveData.waktu_evaluasi,
                        type: 'datetime',
                        validation: ['required'],
                        formatDateView: 'DD MMM YYYY HH:mm',
                      }" :valuee="evaluasiActiveData.waktu_evaluasi" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="vEvaluasi.tindak_lanjut" :item="{
                        label: 'Tindak lanjut',
                        id: 'tindak_lanjut',
                        data: 'tindak_lanjut',
                        type: 'select',
                        validation: ['required'],
                        value: evaluasiActiveData.tindak_lanjut,
                        param: {},
                        pointer: {
                          label: 'label',
                          code: 'code'
                        },
                        api: false,
                        optionList: [
                          { code: 'Lanjut Perawatan', label: 'Lanjut Perawatan' },
                          { code: 'Berhenti Perawatan', label: 'Berhenti Perawatan' },
                        ]
                      }" :valuee="evaluasiActiveData.tindak_lanjut" />
                    </div>
                    <div class="col-6">
                      <s-input v-model="vEvaluasi.status_evaluasi_keperawatan" :item="{
                        label: 'Status Evaluasi',
                        id: 'status_evaluasi_keperawatan',
                        data: 'status_evaluasi_keperawatan',
                        type: 'select',
                        validation: ['required'],
                        value: evaluasiActiveData.status_evaluasi_keperawatan,
                        param: {},
                        pointer: {
                          label: 'label',
                          code: 'code'
                        },
                        api: false,
                        optionList: [
                          { code: true, label: 'Aktif' },
                          { code: false, label: 'Tidak Aktif' },
                        ]
                      }" :valuee="evaluasiActiveData.status_evaluasi_keperawatan" />
                    </div>
                    <div class="col-12">
                      <s-input v-model="vEvaluasi.catatan" :item="{
                        label: 'Catatan',
                        id: 'catatan',
                        data: 'catatan',
                        value: evaluasiActiveData.catatan,
                        type: 'textarea',
                        validation: ['required'],
                      }" :valuee="evaluasiActiveData.catatan" />
                    </div>
                  </div>
                  <template>
                    <div class="col-12 align-self-center p-0">
                      <button type="submit" class="btn btn-light-primary mr-3">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </template>
                </form>
            </ValidationObserver>
          </template>
          <template v-else-if="stage === 'implementasi' || stageImplementasi === null">
            <template v-if="stageImplementasi === 'create' || stageImplementasi === 'update'">
              <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(onSubmitImplementasi)" autocomplete="off">
                    <!-- <tas-base-form-custom :field="d_form_tree" v-model="vImplementasi.implementasi_keperawatan_igd"></tas-base-form-custom> -->
                    <div class="row">
                      <div class="col-12">
                        <s-input v-model="vImplementasi.implementasi_keperawatan_igd.waktu_implementasi" :item="{
                          label: 'Tanggal Implementasi',
                          id: 'waktu_implementasi',
                          data: 'waktu_implementasi',
                          type: 'datetime',
                          validation: [],
                        }" :valuee="vImplementasi.implementasi_keperawatan_igd.waktu_implementasi" />
                      </div>
                      <div class="col-6">
                        <s-input v-model="vImplementasi.implementasi_keperawatan_igd.diagnosa" :item="{
                          label: 'Diagnosa',
                          id: 'diagnosa',
                          data: 'diagnosa',
                          type: 'lookup-radio',
                          validation: ['required'],
                          value: vImplementasi.implementasi_keperawatan_igd.diagnosa,
                          return_object: true,
                          api: 'ms_diagnosa',
                          pointer: {
                            label: 'nama_diagnosa',
                            code: 'id',
                            display: ['nama_diagnosa']
                          },
                          param: {},
                        }" :valuee="vImplementasi.implementasi_keperawatan_igd.diagnosa" />
                      </div>
                      <div class="col-12">
                        <s-input v-model="vImplementasi.implementasi_keperawatan_igd.jenis_implementasi" :item="{
                          label: 'Jenis Implementasi',
                          id: 'jenis_implementasi',
                          data: 'jenis_implementasi',
                          type: 'text',
                          validation: [],
                        }" :valuee="vImplementasi.implementasi_keperawatan_igd.jenis_implementasi" />
                      </div>
                      <div class="col-12">
                        <s-input v-model="vImplementasi.implementasi_keperawatan_igd.respon_pasien" :item="{
                          label: 'Respon Pasien',
                          id: 'respon_pasien',
                          data: 'respon_pasien',
                          type: 'text',
                          validation: [],
                        }" :valuee="vImplementasi.implementasi_keperawatan_igd.respon_pasien" />
                      </div>
                      <div class="col-12">
                        <s-input v-model="vImplementasi.implementasi_keperawatan_igd.tindak_lanjut" :item="{
                          label: 'Tindak Lanjut',
                          id: 'tindak_lanjut',
                          data: 'tindak_lanjut',
                          type: 'textarea',
                          validation: [],
                        }" :valuee="vImplementasi.implementasi_keperawatan_igd.tindak_lanjut" />
                      </div>
                    </div>

                    <template>
                      <div class="col-12 align-self-center p-0">
                        <button type="submit" class="btn btn-light-primary mr-3">
                          <i class="ri-save-line"></i>
                          {{ $t('global.submit') }}
                        </button>
                      </div>
                    </template>
                  </form>
              </ValidationObserver>
            </template>
            <template v-else-if="stageImplementasi === 'list' || stageImplementasi === null">

              <!-- OVERVIEW EVALUASI -->
              <div class="card card-custom bgi-no-repeat gutter-b dropright" v-if="evaluasiActiveData.id" :class="{ 'evaluasi-keperawatan-active': evaluasiActiveData.status_evaluasi_keperawatan, 'bg-gray-500': !evaluasiActiveData.status_evaluasi_keperawatan }">
                <div class="card-body d-flex align-items-center p-3" style="cursor: pointer">
                    <div class="py-2 w-100">
                        <div class="d-flex flex-row justify-content-start align-items-center" style="gap: 5px">
                          <div class="label label-pill label-inline" :class="{ 'label-warning': evaluasiActiveData.status_evaluasi_keperawatan, 'label-danger': !evaluasiActiveData.status_evaluasi_keperawatan }">{{ evaluasiActiveData.status_evaluasi_keperawatan ? 'Aktif' : 'Non Aktif' }}</div>
                          <p class="text-white font-size-md pb-0 mb-0 ">{{ evaluasiActiveData.waktu_evaluasi | parse('longDateTime') }}</p>
                        </div>
                        <h3 class="text-white font-weight-bolder">{{ 'Nama perawat' }}</h3>
                        <h3 class="text-white font-weight-bolder">{{ evaluasiActiveData.ms_dokter ? evaluasiActiveData.ms_dokter.nama_dokter : '-' }}</h3>
    
                        <div class="d-flex flex-row justify-content-between align-items-center">
                          <div>
                            <p class="text-white font-size-lg pb-0 mb-0">{{ evaluasiActiveData.tindak_lanjut }}</p>
                          </div>
                        </div>
                    </div>
                </div>
              </div>

              <hr>
              <div class="d-flex flex-row justify-content-end" v-if="evaluasiActiveData.status_evaluasi_keperawatan">
                <button class="btn btn btn-primary h-40px mb-3" @click="actionImplementasi('create', {})">
                  <i class="ri-add-circle-line p-0"></i>
                  Tambah
                </button>
              </div>
              <!-- DATA IMPLEMENTASI -->
              <template v-for="(item, i) in listImplementasiKeperawatan">
                <div :key="'list-implementasi-'+i" class="d-flex align-items-center bg-light-success rounded p-5 mb-3">
                  
  
                  <!--begin::Title-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                      <div class="w-100">
                        <div>
                          <p class="mb-2"><strong>{{ item.implementasi_keperawatan_igd.waktu_implementasi | parse('longDateTime') }}</strong></p>
                          <h5 class="font-weight-bolder text-warning mb-0 pb-0">{{ item.implementasi_keperawatan_igd.diagnosa ? item.implementasi_keperawatan_igd.diagnosa.nama_diagnosa : '-' }} ({{ item.implementasi_keperawatan_igd.diagnosa ? item.implementasi_keperawatan_igd.diagnosa.kode_diagnosa : '-' }})</h5>
                          <p class="mb-0"><span class="text-primary">Jenis Implementasi:</span> {{ item.implementasi_keperawatan_igd.jenis_implementasi }}</p>
                          <p class="mb-0"><span class="text-primary">Tindak Lanjut:</span> {{ item.implementasi_keperawatan_igd.tindak_lanjut }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Title-->

                  <!-- DELETE IMPLEMENTASI -->
                  <span class="svg-icon svg-icon-success mr-3" style="cursor: pointer" @click="deleteData('implementasi_keperawatan_igd', item)" v-if="evaluasiActiveData.status_evaluasi_keperawatan"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo7/dist/../src/media/svg/icons/Home/Trash.svg-->
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
                        <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                        <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                      </g>
                    </svg><!--end::Svg Icon-->
                  </span>

                  <!-- EDIT IMPLEMENTASI -->
                  <span class="svg-icon svg-icon-success mr-3" style="cursor: pointer" @click="actionImplementasi('update', item)" v-if="evaluasiActiveData.status_evaluasi_keperawatan">
                      <span class="svg-icon svg-icon-sm"><!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Communication/Write.svg-->
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24"></rect>
                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "></path>
                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                            </g>
                        </svg><!--end::Svg Icon-->
                      </span>
                  </span>
                  <!--end::Icon-->
  
                  <!--begin::Lable-->
                  <!-- <span class="font-weight-bolder text-success py-1 font-size-lg">{{ item.createdAt | parse('date') }}</span> -->
                  <!--end::Lable-->
                </div>
              </template>

              <!-- DATA IMPLEMENTASI KOSONG -->
              <!-- <div class="card card-custom card-stretch gutter-b" v-if="listImplementasiKeperawatan.length === 0"> -->
                <!--begin::Body-->

              <div class="card-body d-flex align-items-center py-0 mt-8" v-if="evaluasiActiveData.id === undefined">
                <div class="d-flex flex-column flex-grow-1 py-2 py-lg-5">
                    <a  class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 text-hover-primary">Pilih evaluasi terlebih dahulu...</a>
                    <!-- <span class="font-weight-bold text-muted text-hover-primary font-size-lg" :class="!evaluasiActiveData.status_evaluasi_keperawatan? 'cursor-not-allowed': 'cursor-pointer'">Bikin dulu yuk <i class="ri-arrow-right-line"></i></span> -->
                </div>
                <!-- <img src="https://preview.keenthemes.com/metronic/theme/html/demo7/dist/assets/media/svg/avatars/014-girl-7.svg" alt="" class="align-self-end h-100px"> -->
              </div>

              <div class="card-body d-flex align-items-center py-0 mt-8" v-else-if="listImplementasiKeperawatan.length === 0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-5">
                      <a  class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 text-hover-primary">Implementasi tidak ditemukan, klik tombol tambah untuk membuat implementasi...</a>
                      <!-- <span class="font-weight-bold text-muted text-hover-primary font-size-lg" :class="!evaluasiActiveData.status_evaluasi_keperawatan? 'cursor-not-allowed': 'cursor-pointer'">Bikin dulu yuk <i class="ri-arrow-right-line"></i></span> -->
                  </div>
                  <!-- <img src="https://preview.keenthemes.com/metronic/theme/html/demo7/dist/assets/media/svg/avatars/014-girl-7.svg" alt="" class="align-self-end h-100px"> -->
              </div>
                
                <!--end::Body-->
              <!-- </div> -->

            </template>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>


<style>
.card-active {
  border-left: 4.5px solid #dfd429 !important;
}

.evaluasi-keperawatan-active {
  background-color: #4AB58E !important;
  background-position: calc(100% + 1rem) bottom;
  background-size: 20% auto;
  background-image: url(https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/humans/custom-1.svg)
}

.evaluasi-keperawatan-non-active {
  background-color: #4AB58E;
}

.dropdown-menu.show {
  position: absolute;
  transition: ease-in;
  transform: translate3d(345px, 150px, 0px);
  top: 0px;
  left: 0px;
  will-change: transform;
}

.my-custom-toggle {
  color: black;
  text-decoration: none;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-not-allowed {
  cursor: not-allowed;
}
</style>
<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'crud-triage',
  data() {
    return {
      stage: null,
      stageImplementasi: null,

      evaluasiActiveID: 0,
      evaluasiActiveData: {},
      implementasiActiveID: 0,
      implementasiActiveData: {},

      d_form: [],
      d_form_tree: [],

      listEvaluasiKeperawatan: [],
      listImplementasiKeperawatan: [],

      op: { registrasi_id: 0 },

      vEvaluasi: {},
      vImplementasi: {
        implementasi_keperawatan_igd: {
          waktu_implementasi: moment(new Date).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      registrasi: {},

      bulk_tarif: []
    }
  },
  watch: {
    'op.registrasi_id': {
      deep: true,
      immediate: false,
      handler(to, from) {
        this.vEvaluasi.registrasi_id = to
        this.getRegistrasi()
        this.getEvaluasiKeperawatan()
      }
    },
    '$route': {
      deep: true,
      immediate: true,
      handler(to) {
        this.listEvaluasiKeperawatan = []
        this.listImplementasiKeperawatan = []
        this.stage = null
        this.stageImplementasi = null
        this.evaluasiActiveID = null

        this.op.registrasi_id = this.$route.query.registrasi_id
      }
    }
  },
  mounted() {
    this.$_api.post('dform_triage/list_tree', { halaman: 1, jumlah: 999999 }).then(res => {
      this.d_form = res.data

      this.d_form_tree = this.buildDForm(res.data)
    })

    this.$root.$emit('openCanvas')
  },
  methods: {
    actionImplementasi(stage, item) {
      this.stageImplementasi = stage

      if (stage === 'update') {
        this.implementasiActiveID = item.id
        this.implementasiActiveData = item
        // this.d_form_tree = this.buildDForm(this.d_form, item.implementasi_keperawatan_igd)
        this.vImplementasi = item
      } else {
        this.implementasiActiveID = 0
        this.implementasiActiveData = {}
        // this.d_form_tree = this.buildDForm(this.d_form, {})
        this.vImplementasi.implementasi_keperawatan_igd = {
          waktu_implementasi: moment(new Date).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    action(stage, evaluasiID) {
      this.stage = stage

      this.evaluasiActiveID = evaluasiID
      this.vImplementasi.evaluasi_id = this.evaluasiActiveID

      if (stage === 'update-evaluasi') {
        this.evaluasiActiveData = this.listEvaluasiKeperawatan.filter((e) => { return e.id === evaluasiID })[0]
        this.vEvaluasi = this.evaluasiActiveData
      } else {
        if (evaluasiID) this.evaluasiActiveData = this.listEvaluasiKeperawatan.filter((e) => { return e.id === evaluasiID })[0]
        else this.evaluasiActiveData = {}
      }

      if (stage === 'create-evaluasi') {
        this.vEvaluasi = {}
        this.vEvaluasi.registrasi_id = this.$route.query.registrasi_id
        this.vEvaluasi.waktu_evaluasi = moment().format('Y-M-D H:m:s')
        this.evaluasiActiveData.waktu_evaluasi = moment().format('Y-M-D H:m:s')
      }

      if (stage === 'implementasi') this.getImplementasiKeperawatan()
      if (stage === 'implementasi') {
        this.stageImplementasi = 'list'
      }
    },
    getRegistrasi() {
      this.$_api.single(`registrasi`, {}, this.vEvaluasi.registrasi_id).then((res) => {
        if (res.data.length) this.registrasi = res.data[0]
        // else this.$_alert.error({}, 'Registrasi tidak ditemukan')
      }).catch((err) => {
        this.$_alert.error(err, 'Registrasi tidak ditemukan')
      })
    },
    getEvaluasiKeperawatan() {
      if (!this.op.registrasi_id) return

      this.$_api.post('evaluasi_keperawatan/getWithImplementasi', { halaman: 1, jumlah: 999999, registrasi_id: this.op.registrasi_id }).then(res => {
        console.log('fetch evaluasi keperawatan')
        // for (const item of res.data) {
        // moment(item.waktu_evaluasi).format('YYYY-MM-DD hh:mm:ss')
        // }
        for (const key in res.data) {
          if (Object.hasOwnProperty.call(res.data, key)) {
            const e = res.data[key]
            res.data[key].waktu_evaluasi = moment(e.waktu_evaluasi).format('YYYY-MM-DD hh:mm:ss')
          }
        }
        this.listEvaluasiKeperawatan = res.data
        if (this.evaluasiActiveID) this.getImplementasiKeperawatan()
      })
    },
    getImplementasiKeperawatan() {
      // if (!this.op.registrasi_id) return
      if (!this.evaluasiActiveID) {
        this.$_alert.error({}, 'evaluasi id tidak ditermukan!')
        return
      }

      this.listImplementasiKeperawatan = this.listEvaluasiKeperawatan.filter((e) => {
        return e.id === this.evaluasiActiveID
      })[0].implementasi

      // this.$_api.post('implementasi_keperawatan_igd/list', { halaman: 1, jumlah: 999999, registrasi_id: this.op.registrasi_id, evaluasi_id: this.evaluasiActiveID }).then(res => {
      //   this.listImplementasiKeperawatan = res.data
      // })
    },
    onSubmitEvaluasi() {
      if (!this.vEvaluasi.registrasi_id) this.$_alert.error({ message: 'Silahkan pilih registrasi' }, 'Terjadi kesalahan')

      this.$_api.post(`evaluasi_keperawatan/${this.stage === 'create-evaluasi' ? 'register' : 'update'}`, this.vEvaluasi).then(res => {

        this.getEvaluasiKeperawatan()
        if (res.status === 200) {
          this.$_alert.success({ message: res.message ? res.message : 'Data berhasil disimpan' }, 'Berhasil')
          this.stage = null
        } else {
          this.$_alert.error({ message: res.message }, 'Terjadi kesalahan')
        }
      })
    },
    onSubmitImplementasi() {
      if (!this.vEvaluasi.registrasi_id) this.$_alert.error({ message: 'Silahkan pilih registrasi' }, 'Terjadi kesalahan')

      this.$_api.post(`implementasi_keperawatan_igd/${this.stageImplementasi === 'create' ? 'register' : 'update'}`, this.vImplementasi).then(res => {

        this.getEvaluasiKeperawatan()
        if (res.status === 200) {
          this.$_alert.success({ message: res.message ? res.message : 'Data berhasil disimpan' }, 'Berhasil')
          this.stage = 'implementasi'
          this.stageImplementasi = 'list'
        } else {
          this.$_alert.error({ message: res.message }, 'Terjadi kesalahan')
        }
      })
    },
    deleteData(endpoint, data) {
      this.$_alert.confirm('Hapus Permanen', 'Data yang sudah dihapus tidak dapat dikembalikan, lanjutkan ?').then((result) => {
        if (result.isConfirmed) {
          this.$_api.delete(endpoint, { ...data }).then(res => {
            this.getEvaluasiKeperawatan()
            this.$_alert.success(null, res.message)
          }).catch(err => {
            this.$_alert.error(err)
          })
        }
      })
    },
    buildDForm(data, value = {}) {
      console.table('buildForm', data)
      let child1 = []
      for (const lv1 of data) {
        let child2 = []
        if (lv1.child) {
          for (const lv2 of lv1.child) {

          }
        }

        if (lv1.child.length > 0) child1.push({ position: lv1.position, child: child2 })
        else {
          child1.push({
            position: lv1.position,
            show: lv1.show,
            class: lv1.class_dform_triage,
            value: value[lv1.key] || (lv1.value || ''),
            label: lv1.label,
            // value: 'tess',
            placeholder: lv1.placeholder,
            type: lv1.type_dform_triage,
            id: lv1.key,
            api: lv1.api_options ? lv1.getter : false,
            hint: lv1.keterangan,
            pointer: this.pointerBuild(lv1.type_dform_triage, lv1.api_options ? lv1.getter : false, lv1.dform_triage_options),
            child: child2
          })
        }
      }
      console.log('buildForm chilld', child1)
      return child1
    },
    pointerBuild(type, api, dform_triage_options) {
      let lookupType = ['lookup-radio']
      if (!lookupType.includes(type)) return {}

      if (api) {
        return {
          // dform_triage_options,
          label: dform_triage_options.length ? dform_triage_options[0].label_options : '',
          code: dform_triage_options.length ? dform_triage_options[0].code_options : '',
          display: dform_triage_options.length ? [dform_triage_options[0].label_options] : [''],
        }
      } else {
        let list = []
        dform_triage_options.map((map) => {
          list.push({
            label: map.label_options,
            code: map.code_options,
          })
        })
        return {
          label: 'label',
          code: 'code',
          display: ['label'],
          list: list
        }
      }
    },
  }
}
</script>
