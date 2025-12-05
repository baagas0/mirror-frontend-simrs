<template>
  <div>
    <!-- <tas-header-mobile-component /> -->
    <div class="d-flex flex-column flex-root">
      <div class="d-flex flex-row flex-column-fluid page">
        <!--begin::Aside-->
        <tas-aside-left-component />
        <div v-if="$store.state.sideNavMobile" @click="hideMobileMenu()" class="aside-overlay"
          style="z-index: 1025 !important;"></div>
        <!--end::Aside-->
        <div class="d-flex flex-column flex-row-fluid wrapper pt-0" id="kt_wrapper">
          <!--begin::Header-->

          <!-- <tas-header-component></tas-header-component> -->
          <!--begin::Content-->
          <div class="content d-flex flex-column flex-column-fluid pt-md-5" id="kt_content">
            <div class="d-flex flex-column-fluid">
              <div class="container-fluid">
                <tas-top-bar></tas-top-bar>
              </div>
            </div>
            <div class="d-flex flex-column-fluid pt-md-5">
              <router-view />
            </div>
          </div>
          <!--end::Content-->
          <!--begin::Footer-->
          <tas-footer-component v-if="hideFooter.includes($route.name)" />
          <!--end::Footer-->
        </div>
      </div>
    </div>

    <registrasi-offcanvas></registrasi-offcanvas>
    <!--begin::Scrolltop-->
    <div id="kt_scrolltop" class="scrolltop">
      <span class="svg-icon">
        <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Up-2.svg-->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
          viewBox="0 0 24 24" version="1.1">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
            <path
              d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z"
              fill="#000000" fill-rule="nonzero" />
          </g>
        </svg>
        <!--end::Svg Icon-->
      </span>
    </div>
    <!-- <tas-aside-right-component v-if="$_config.options.asideRight" /> -->

    <div class="popup-overlay " :class="{ 'show': showOverlay }" @click="showOverlay = false">
      <div class="d-flex justify-content-center align-items-center h-100">
        <!-- <kbd>⌘</kbd>  -->
        <!-- <span class="text-white" style="font-size: 90px;">+</span>  -->
        <h1 class="text-white">Press</h1>
        <kbd>F2</kbd>
        <h1 class="text-white">Untuk melakukan pencarian menu.</h1>
      </div>
    </div>

    <div class="popup-overlay " :class="{ 'show': showSearch }">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="quick-search quick-search-dropdown quick-search-has-result" style="width: 30%;" id="kt_quick_search_dropdown">
          <div class="quick-search-form">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span
                    class="svg-icon svg-icon-lg"><!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/General/Search.svg--><svg
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                      height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"></rect>
                        <path
                          d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                          fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                        <path
                          d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                          fill="#000000" fill-rule="nonzero"></path>
                      </g>
                    </svg><!--end::Svg Icon--></span> </span>
              </div>
              <input type="text" class="form-control text-white" ref="menuSearch" v-model="menuSearch" autofocus placeholder="Search...">
              <div class="input-group-append">
                <span class="input-group-text" @click="showSearch = false">
                  <i class="quick-search-close ki ki-close icon-sm text-muted" style="display: flex;" v-if="loadingSearch === false"></i>
                  <div class="spinner spinner-track spinner-primary" v-else></div>
                </span>
              </div>
            </div>
          </div>

          <!--begin::Scroll-->
          <div class="quick-search-wrapper scroll ps ps--active-y" data-scroll="true" data-height="325"
            data-mobile-height="200" style="height: 325px; overflow: hidden;">
            <div class="quick-search-result">
              <!--begin::Message-->
              <div class="text-muted" v-if="searchResult.length === 0">
                No record found
              </div>
              <!--end::Message-->

              <!--begin::Section-->
              <div class="font-size-sm text-primary font-weight-bolder text-uppercase mb-2" v-if="searchResult.length > 0">
                Daftar menu
              </div>
              <div class="mb-10" v-if="searchResult.length > 0">
                <!-- <pre>{{searchResult}}</pre> -->
                <div class="d-flex align-items-center flex-grow-1 mt-5 mb-5" v-for="(item, i) in searchResult" :key="'search-content' + i" v-if="item.type === 2" @click="selectResult(item)">
                  <div class="symbol symbol-30 bg-transparent flex-shrink-0">
                    <img
                      src="https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/files/doc.svg"
                      alt="">
                  </div>
                  <div class="d-flex flex-column ml-3 mt-3 mb-2">
                    <a href="#" class="font-size-xl font-weight-bold text-white text-hover-primary">
                      {{ item.name }}
                    </a>
                    <span class="font-size-sm font-weight-bold text-muted">
                      {{ item.code }}
                    </span>
                  </div>
                </div>
                
              </div>
              <!--end::Section-->
            </div>
            <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
              <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps__rail-y" style="top: 0px; right: 0px; height: 325px;">
              <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 126px;"></div>
            </div>
          </div>
          <!--end::Scroll-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-dashboard-layout',
  components: {
    TasHeaderMobileComponent: () => import('@/components/tas-header-mobile.vue'),
    TasAsideLeftComponent: () => import('@/components/tas-aside-left.vue'),
    TasAsideRightComponent: () => import('@/components/tas-aside-right.vue'),
    TasFooterComponent: () => import('@/components/tas-footer.vue'),
    TasHeaderComponent: () => import('@/components/tas-header.vue'),
    TasSubheaderComponent: () => import('@/components/tas-subheader.vue'),
    TasTopBar: () => import('@/components/tas-top-bar.vue'),
    RegistrasiOffcanvas: () => import('@/components/component/registrasi-offcanvas.vue')
  },
  data() {
    return {
      showOverlay: false,
      showSearch: false,
      loadingSearch: false,
      menuSearch: '',
      searchResult: [],

      pressKey: '',
      hideFooter: ['summary-dashboard']
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onKeydown);

    setTimeout(() => {
      let so = localStorage.getItem('showOverlay')

      if (so === null || so === false) {
        this.showOverlay = true
        localStorage.setItem('showOverlay', true)

        setTimeout(() => {
          this.showOverlay = false
        }, 3000)
      }
    }, 500)
  },
  watch: {
    pressKey: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          if (val === 'F2') {
            this.menuSearch = ''
            this.showSearch = true
            this.searchResult = []

            this.$refs["menuSearch"].focus()
          }
          if (val === 'Escape') this.showSearch = false
        } else this.showSearch = false
      },
    },
    menuSearch: {
      handler: function (val, oldVal) {
        if(val.length <= 3) return

        this.loadingSearch = true
        this.$_api.list('menu', { search: val }).then((res) => {
          this.searchResult = res.data
          this.loadingSearch = false
        })
      }
    }
  },
  methods: {
    onKeydown(event) {
      this.pressKey = event.key

      setTimeout(() => {
        this.pressKey = ''
      }, 2000)
    },
    selectResult (item) {
      this.$router.push({ path: item.route })
      this.showSearch = false
    },
    hideMobileMenu() {
      this.$store.commit('set', ['sideNavMobile', false])
      this.$_sys.togleClass('kt_aside', 'aside-on', false)
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.685);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -9998;
  display: block;
  overflow-y: hidden;
  overflow-x: hidden;
  transition: .5s ease !important;
  opacity: 0;
}

.popup-overlay.show {
  z-index: 9998;
  opacity: 1 !important;
}

kbd {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.1em 0.5em;
  margin: 0 0.2em;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset;
  background-color: #908c8c;

  margin: 2rem;
  font-size: 5rem;
}</style>