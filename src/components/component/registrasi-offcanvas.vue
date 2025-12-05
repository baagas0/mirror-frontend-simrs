<template>
  <div>
    <ul class="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4" :hidden="!$route.path.includes('layanan_igd')">
      <!--begin::Item-->
      <li class="nav-item mb-2" id="registrasi-offcanvas" data-toggle="tooltip" title="Lihat data registrasi"
      data-placement="right">
      <button class="btn btn-sm btn-icon btn-bg-light btn-icon-success btn-hover-success" @click="offcanvas.registrasi = !offcanvas.registrasi">
        <i class="flaticon2-drop"></i>
      </button>
    </li>
    <!--end::Item-->
  </ul>
  
  <!--begin::Quick Panel-->
  <div id="registrasi-offcanvas" ref="registrasi-offcanvas" class="offcanvas offcanvas-right pt-5 pb-10" :class="{ 'offcanvas-on': offcanvas.registrasi }" style="width: 65%;">
      <!--begin::Header-->
      <div class="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
        <ul class="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10"
          role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#regis-igd">Data Registrasi IGD</a>
          </li>
        </ul>
        <div class="offcanvas-close mt-n1 pr-5">
          <a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close" @click="offcanvas.registrasi = !offcanvas.registrasi">
            <i class="ki ki-close icon-xs text-muted"></i>
          </a>
        </div>
      </div>
      <!--end::Header-->
      <!--begin::Content-->
      <div class="offcanvas-content">
        <div class="tab-content">
          <!--begin::Tabpane-->
          <div class="tab-pane fade show pt-3 pr-5 mr-n5 active" id="regis-igd" role="tabpanel">
            <!-- CONTENT -->
            <igd></igd>
          </div>

        </div>
      </div>
      <!--end::Content-->
    </div>
    <!--end::Quick Panel-->

    <div :class="{ 'offcanvas-overlay': offcanvas.registrasi }" @click="closeCanvas()"></div>
  </div>
</template>
<style>
  .offcanvas.offcanvas-right {
    right: -65% !important;
    left: auto;
  }

  .offcanvas {
    width: 65% !important;
    z-index: 1001;
    position: fixed;
    top: 0;
    bottom: 0;
    -webkit-transition: left .3s ease,right .3s ease,bottom .3s ease,top .3s ease !important;
    transition: left .3s ease,right .3s ease,bottom .3s ease,top .3s ease !important;
  }

  .offcanvas.offcanvas-right.offcanvas-on {
    -webkit-transition: left .3s ease,right .3s ease,bottom .3s ease,top .3s ease !important;
    transition: left .3s ease,right .3s ease,bottom .3s ease,top .3s ease !important;
    right: 0 !important;
    left: auto;
  }
  .offcanvas-overlay {
    background: rgba(0,0,0,.5);
  }
</style>
<script>
export default {
  name: 'registrasi-offcanvas',
  components: {
    Igd: () => import('@/components/component/igd.vue')
  },
  data () {
    return {
      url: '',
      offcanvas: {
        registrasi: false
      }
    }
  },
  watch: {
  },
  mounted () {
    this.url = this.$route.path
    this.$root.$on('openCanvas', (key = '') => {
      return this.openCanvas(key)
    })
    this.$root.$on('closeCanvas', (key = '') => {
      return this.closeCanvas(key)
    })
  },
  methods: {
    openCanvas (key = '') {
      if (key !== '') {
        this.offcanvas[key] = true
      } else {
        for (const canvasKey in this.offcanvas) {
          this.offcanvas[canvasKey] = true
        }
      }
    },
    closeCanvas (key = '') {
      if (key !== '') {
        this.offcanvas[key] = false
      } else {
        for (const canvasKey in this.offcanvas) {
          this.offcanvas[canvasKey] = false
        }
      }
    }
  }
}
</script>
