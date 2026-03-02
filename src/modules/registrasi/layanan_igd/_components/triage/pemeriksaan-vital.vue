<template>
  <b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px">
    <b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.pemeriksaan-vital style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px">
      <div class="card-title" style="padding: 0.7rem 1rem">
        <h4 class="card-label">Pemeriksaan Tanda Tanda Vital</h4>
      </div>
      <div class="card-toolbar" style="margin: 0.5rem 1rem">
        <i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
        <i class="ri-arrow-right-double-line text-white" v-else></i>
      </div>
    </b-card-header>
    <b-collapse id="pemeriksaan-vital" v-model="collapse" accordion="accordion-pemeriksaan-vital" role="tabpanel">
      <b-card-body>
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <p class="font-weight-bolder">Tanda-Tanda Vital</p>
              </div>
              <div class="col-12">
                <s-input
                  v-model="mData.kesadaran_pasien"
                  :key="'kesadaran_pasien'"
                  :id="'kesadaran_pasien'"
                  :item="{
                    label: 'Kesadaran',
                    id: 'kesadaran_pasien',
                    data: 'kesadaran_pasien',
                    type: 'lookup-radio',
                    validation: [],
                    value: mData.kesadaran_pasien,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'Compos Mentis', code: 'Compos Mentis' },
                        { label: 'Somnolen', code: 'Somnolen' },
                        { label: 'Sopor', code: 'Sopor' },
                        { label: 'Coma', code: 'Coma' },
                        { label: 'Apatis', code: 'Apatis' },
                      ],
                    },
                    param: {},
                  }"
                  :valuee="mData.kesadaran_pasien" />
              </div>
              <div class="col-6">
                <s-input
                  v-model="mData.sistolik"
                  :item="{
                    label: 'Sistolik',
                    id: 'sistolik',
                    data: 'sistolik',
                    value: mData.sistolik,
                    type: 'number',
                    suffix: 'mmhg',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.sistolik" />
              </div>
              <div class="col-6">
                <s-input
                  v-model="mData.diastolik"
                  :item="{
                    label: 'Diastolik',
                    id: 'diastolik',
                    data: 'diastolik',
                    value: mData.diastolik,
                    type: 'number',
                    suffix: 'mmhg',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.diastolik" />
              </div>
              <div class="col-6">
                <s-input
                  v-model="mData.nadi"
                  :item="{
                    label: 'Nadi',
                    id: 'nadi',
                    data: 'nadi',
                    value: mData.nadi,
                    type: 'number',
                    suffix: 'x/menit',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.nadi" />
              </div>
              <div class="col-6">
                <s-input
                  v-model="mData.pernafasan"
                  :item="{
                    label: 'Pernafasan',
                    id: 'pernafasan',
                    data: 'pernafasan',
                    value: mData.pernafasan,
                    type: 'number',
                    suffix: 'x/menit',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.pernafasan" />
              </div>
              <div class="col-12">
                <s-input
                  v-model="mData.suhu"
                  :item="{
                    label: 'Suhu',
                    id: 'suhu',
                    data: 'suhu',
                    value: mData.suhu,
                    type: 'number',
                    suffix: '&deg;C',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.suhu" />
              </div>
              <div class="col-6">
                <s-input
                  v-model="mData.sp02"
                  :item="{
                    label: 'SP02',
                    id: 'sp02',
                    data: 'sp02',
                    value: mData.sp02,
                    type: 'number',
                    suffix: '%',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.sp02" />
              </div>
              <div class="col-6">
                <s-input
                  v-model="mData.pupil"
                  :item="{
                    label: 'Pupil',
                    id: 'pupil',
                    data: 'pupil',
                    value: mData.pupil,
                    type: 'number',
                    suffix: 'mm',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.pupil" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <p class="font-weight-bolder">Pemeriksaan Lain Lain</p>
              </div>
              <div class="col-12">
                <s-input
                  v-model="mData.reaksi_cahaya"
                  :key="'reaksi_cahaya'"
                  :id="'reaksi_cahaya'"
                  :item="{
                    label: 'Reaksi Cahaya',
                    id: 'reaksi_cahaya',
                    data: 'reaksi_cahaya',
                    type: 'lookup-radio',
                    validation: [],
                    value: mData.reaksi_cahaya,
                    pointer: {
                      label: 'label',
                      code: 'code',
                      display: ['label'],
                      list: [
                        { label: 'isokor', code: 'isokor' },
                        { label: 'anisokor', code: 'anisokor' },
                      ],
                    },
                    param: {},
                  }"
                  :valuee="mData.reaksi_cahaya" />
              </div>
              <div class="col-12">
                <s-input
                  v-model="mData.tinggi_badan"
                  :item="{
                    label: 'Tinggi Badan',
                    id: 'tinggi_badan',
                    data: 'tinggi_badan',
                    value: mData.tinggi_badan,
                    type: 'number',
                    suffix: 'cm',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.tinggi_badan" />
              </div>
              <div class="col-12">
                <s-input
                  v-model="mData.berat_badan"
                  :item="{
                    label: 'Berat Badan',
                    id: 'berat_badan',
                    data: 'berat_badan',
                    value: mData.berat_badan,
                    type: 'decimal',
                    suffix: 'kg',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.berat_badan" />
              </div>
              <div class="col-12">
                <s-input
                  v-model="mData.index_masa_tubuh"
                  :item="{
                    label: 'Index Masa Tubuh',
                    id: 'index_masa_tubuh',
                    data: 'index_masa_tubuh',
                    value: mData.index_masa_tubuh,
                    type: 'text',
                    class: '',
                    validation: [],
                  }"
                  :disabled="true"
                  :valuee="mData.index_masa_tubuh" />
              </div>
              <div class="col-12">
                <!-- <s-input v-model="mData.skrining_nyeri" :key="'skrining_nyeri'" :id="'skrining_nyeri'" :item="{
										label: 'Skrining Nyeri',
										id: 'skrining_nyeri',
										data: 'skrining_nyeri',
										type: 'lookup-radio',
										validation: [],
										value: mData.skrining_nyeri,
										pointer: {
											label: 'label',
											code: 'code',
											display: ['label'],
											list: [
												{ label: 'Ada', code: 'Ada' },
												{ label: 'Tidak Ada', code: 'Tidak Ada' },
											]
										},
										param: {},
									}" :valuee="mData.skrining_nyeri" /> -->

                <!-- Scale Pain - Skala Nyeri -->
                <div class="row bordered p-2" style="border: solid 1px #c8c8c8">
                  <div class="col-12 bg-light-warning text-center mb-2">
                    <p class="font-weight-bolder mt-2 mb-2">Skala Nyeri</p>
                  </div>
                  <div class="col-12 d-flex align-items-center justify-content-center mb-2">
                    <img :src="'./static/img/icon/' + (mData.skrining_nyeri_pain_img || 'pain1') + '.png'" class="" style="width: 75px !important" alt="" />
                  </div>
                  <div class="col-12">
                    <img :src="'./static/img/icon/ScalePain.png'" class="w-100" alt="" />
                  </div>
                  <div class="col-12">
                    <vue-slider v-bind="config_slider_skrining_nyeri" v-model="mData.skrining_nyeri_pain" />
                  </div>
                </div>
              </div>
              <div class="col-12" v-if="mData.skrining_nyeri === 'Ada'">
                <s-input
                  v-model="mData.keterangan_skrining_nyeri"
                  :item="{
                    label: 'Keterangan Skrining',
                    id: 'keterangan_skrining_nyeri',
                    data: 'keterangan_skrining_nyeri',
                    value: mData.keterangan_skrining_nyeri,
                    type: 'textarea',
                    class: '',
                    validation: [],
                  }"
                  :valuee="mData.keterangan_skrining_nyeri" />
              </div>
            </div>
          </div>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import moment from "moment";
moment.locale("id");

export default {
  name: "pemeriksaan-vital",
  components: {
    VueSlider,
  },
  props: {
    objectDataAssesmen: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    mData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // mData: {}
      collapse: true,
      config_slider_skrining_nyeri: {
        breakpoints: [1, 2, 5, 8, 10],
        dotSize: 14,
        width: "auto",
        height: 4,
        contained: false,
        direction: "ltr",
        data: null,
        dataLabel: "label",
        dataValue: "value",
        min: 0,
        max: 10,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: "active",
        tooltipPlacement: "top",
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },
    };
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        this.$emit("dataChange", true);
      },
    },
    "mData.skrining_nyeri_pain": function (to, oldVal) {
      let pain_img = "pain_1";

      if (to < 1) pain_img = "pain1";
      else if (to >= 1 && to < 3) pain_img = "pain2";
      else if (to >= 3 && to < 5) pain_img = "pain3";
      else if (to >= 5 && to < 7) pain_img = "pain4";
      else if (to >= 7 && to < 9) pain_img = "pain5";
      else if (to >= 9) pain_img = "pain6";

      this.mData.skrining_nyeri_pain_img = pain_img;
    },
    "mData.tinggi_badan": function (newVal, oldVal) {
      console.log("te", this.mData);
      let bb = this.mData.berat_badan;
      let tb = this.mData.tinggi_badan / 100;
      let v = bb && tb ? bb / (tb * tb) : 0;
      this.mData.index_masa_tubuh = v.toFixed(2);
    },
    "mData.berat_badan": function (newVal, oldVal) {
      console.log("te1", this.mData);
      let bb = this.mData.berat_badan;
      let tb = this.mData.tinggi_badan / 100;
      let v = bb && tb ? bb / (tb * tb) : 0;
      this.mData.index_masa_tubuh = v.toFixed(2);
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$emit("submit", { key: "subjective", data: this.mData });
    },
  },
};
</script>
