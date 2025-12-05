<template>
  <div class="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside"
    ref="kt_aside">
    <!--begin::Brand-->
    <div class="brand flex-column-auto" id="kt_brand">
      <!--begin::Logo-->
      <a href="/#/" class="brand-logo">
        <img alt="Logo" src="/static/img/logo/serova.png" style="width: 100%;" />
      </a>
      <!--end::Logo-->
      <!--begin::Toggle-->
      <button class="brand-toggle btn btn-sm px-0" id="kt_aside_toggle" @click="togleSecondary(!sideNavToogle)">
        <span class="svg-icon svg-icon svg-icon-xl">
          <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg-->
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <polygon points="0 0 24 0 24 24 0 24" />
              <path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z" fill="#000000" fill-rule="nonzero" transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)" />
              <path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)" />
            </g>
          </svg>
          <!--end::Svg Icon-->
        </span>
      </button>
      <!--end::Toolbar-->
    </div>
    <!--end::Brand-->
    <!--begin::Aside Menu-->
    <div class="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
      <!--begin::Menu Container-->
      <div ref="kt_aside_menu"
      id="kt_aside_menu"
      class="aside-menu my-4"
      data-menu-vertical="1"
      data-menu-scroll="1"
      data-menu-dropdown-timeout="500"
      
      >
        {{ `Active: ${asideActiveId}` }}
        <!--begin::Menu Nav-->
        <perfect-scrollbar
          class="aside-menu scroll"
          style="height: 100vh; max-height: 85vh; position: relative;"
        >
          <ul class="menu-nav">
            <template v-for="item in asideItem">
              <!-- JUDUL LV 1 -->
              <li class="menu-section" :key="`${item.id}-section`" v-if="!item.isMenu && !item.hasSub">
                <h4 class="menu-text">{{ item.title }}</h4>
                <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
              </li>

              <!-- MENU LV 1  -->
              <li class="menu-item"
                :key="item.id" aria-haspopup="true"
                v-if="item.isMenu && !item.hasSub"
                v-bind:class="{
                  'menu-item-active': $route['path'] == item.to,
                }"
                @click="togleSecondary(true)"
              >
                <router-link :to="item.to ? item.to : '/'" class="menu-link" @click="activate(item.id)">
                  <span class="svg-icon menu-icon">
                    <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
                        <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                      </g>
                    </svg>
                    <!--end::Svg Icon-->
                  </span>
                  <span class="menu-text">{{ item.title }}</span>
                </router-link>
              </li>

              <!-- SUB MENU LV 1 -->
              <li class="menu-item menu-item-submenu"
                :key="`${item.id}-menu`"
                aria-haspopup="true"
                data-menu-toggle="hover"
                v-if="item.hasSub"
                v-bind:class="{
                  'menu-item-open': (hasActiveChildren(item.to) && asideActiveId == item.id) || asideActiveId == item.id || asideActiveId.toString().includes(item.id),
                }"
                
              >
                <a href="#" class="menu-link menu-toggle" @click="togleSecondary(true); activate(item.id)">
                  <span class="svg-icon menu-icon">
                    <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
                        <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                      </g>
                    </svg>
                    <!--end::Svg Icon-->
                  </span>
                  <span class="menu-text">{{ item.title }}</span>
                  <i class="menu-arrow"></i>
                </a>
                <div class="menu-submenu">
                  <i class="menu-arrow"></i>
                  <ul class="menu-subnav">
                    <li class="menu-item menu-item-parent" aria-haspopup="true">
                      <span class="menu-link">
                        <span class="menu-text">{{ item.title }}</span>
                      </span>
                    </li>

                    <li class="menu-item menu-item-submenu"
                      v-bind:class="{
                        'menu-item-open': hasActiveChildren(item2.to) || asideActiveId == item2.id || asideActiveId.toString().includes(item2.id),
                        'menu-item-active': $route['path'] == item2.to,
                      }"
                      aria-haspopup="true"
                      v-for="(item2, index) in item.items" :key="`${item2.id}-${index}-sub-menu`"
                      
                    >
                      <!-- MENU LV 2 -->
                      <template @click="togleSecondary(true); activate(item2.id)">
                        <router-link
                          :to="item2.to ? item2.to : '/'"
                          class="menu-link"
                          
                          v-if="!item2.hasSub"
                        >
                          <i class="menu-bullet menu-bullet-dot">
                            <span></span>
                          </i>
                          <span class="menu-text">{{ item2.title }}</span>
                        </router-link>
                      </template>

                      <!-- SUB MENU LV 2 -->
                      <a
                        href="javascript:;"
                        class="menu-link menu-toggle"
                        v-if="item2.hasSub"
                        @click="togleSecondary(true); activate(item2.id)"
                      >
                        <i class="menu-bullet menu-bullet-line">
                          <span></span>
                        </i>
                        <span class="menu-text">{{ item2.title }}</span>
                        <span class="menu-label" v-if="false">
                          <span class="label label-rounded label-primary">6</span>
                        </span>
                        <i class="menu-arrow"></i>
                      </a>
                      <div class="menu-submenu">
                        <i class="menu-arrow"></i>
                        <ul class="menu-subnav">

                          <!-- MENU LV 3 -->
                          <li class="menu-item" aria-haspopup="true" v-for="(item3, index) in item2.items" :key="`${item3.id}-${index}-sub-menu`">
                            <router-link :to="item3.to ? item3.to : '/'" class="menu-link" @click="activate(item3.id)">
                              <i class="menu-bullet menu-bullet-dot">
                                <span></span>
                              </i>
                              <span class="menu-text">{{ item3.title }}</span>
                            </router-link>
                          </li>
                          
                        </ul>
                      </div>
                      
                    </li>

                  </ul>
                </div>
              </li>
            </template>
          </ul>
        </perfect-scrollbar>
        <!--end::Menu Nav-->
        <div class="pt-3 px-3">
          <a @click="logOut()" class="btn btn-light-dark btn-hover-danger font-weight-bold btn-md btn-block" style="color: #b5b5c3; background-color: rgba(63,66,84,.35)">Keluar</a>
        </div>
      </div>
      <!--end::Menu Container-->
    </div>
    <!--end::Aside Menu-->
  </div>
</template>

<script>
import userProfile from './../default-page/profile-user'
import myAction from './../default-page/my-action'
export default {
  name: 'aside-left',
  components: { userProfile, myAction },
  data () {
    return {
      sideNavToogle: true,
      secondaryItems: [],
      secondaryDesc: null,
      openedPrimary: null,
      profile: JSON.parse(localStorage.getItem('profile')),
      key: 1,
      color: ['#a4b6b9', '#0074C8', '#0AAB41', '#D42B21', '#FFAE33'],
      icon: {
        action: './static/img/icon/my-action.svg',
        profile: './static/img/icon/my-action.svg'
      },
      asideActiveId: '',
      asideItem: [
        {
          id: 1,
          title: 'Summary',
          isMenu: false
        },
        {
          id: 2,
          title: 'Dashboard',
          to: '/dahsboard',
          isMenu: true
        }
      ]
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: false,
      handler (t, f) {
        if (t.name !== f.name) {
          let openModule = this.$store.state.modules.filter(x => x.routes.some(y => y.name === t.name))[0]
          if (openModule) {
            this.$store.commit('set', ['unknownRoute', false, true])
          } else this.$store.commit('set', ['unknownRoute', true, true])
        }
      }
    }
  },
  beforeMount () {
    this.getMenu()
  },
  methods: {
    getMenu () {
      this.$_api['get']('/menu/list/build', {})
        .then((res) => {
          // this.asideItem = res.data[0]._children.map((m) => {
          //   return m
          // })
          let menu = []
          for (const item of res.data[0]._children) {
            let menu2 = []
            if (item._children.length) {
              for (const item2 of item._children) {
                let menu3 = []
                if (item2._children.length) {
                  for (const item3 of item2._children) {
                    menu3.push({
                      id: item3.code,
                      title: item3.name,
                      to: item3.to,
                      isMenu: true,
                      hasSub: !!item3._children.length,
                      items: []
                    })
                  }
                }
                menu2.push({
                  id: item2.code,
                  title: item2.name,
                  to: item2.to,
                  isMenu: true,
                  hasSub: !!item2._children.length,
                  items: menu3
                })
              }
            }
            menu.push({
              id: item.code,
              title: item.name,
              to: item.to,
              isMenu: true,
              hasSub: !!item._children.length,
              items: menu2
            })
          }
          this.asideItem = menu
        })
        .catch(() => {
          this._alert.error('error', 'Tidak dapat mengambil data menu')
        })
    },
    logOut () {
      this.$router.push({ path: '/login' })
      localStorage.clear()
      this.$store.replaceState({
        sideNavPrimary: false,
        sideNavSecondary: false,
        sideNavMobile: false
      })
      // this.$_sys.togleClass('kt_body', 'aside-minimize', true)
    },
    mouseEnter () {
      if (document.body.classList.contains('aside-fixed')) {
        if (this.outsideTm) {
          clearTimeout(this.outsideTm)
          this.outsideTm = null
        }

        // if the left aside menu is minimized
        if (document.body.classList.contains('aside-minimize')) {
          document.body.classList.add('aside-minimize-hover')

          // show the left aside menu
          document.body.classList.remove('aside-minimize')
        }
      }
    },
    mouseLeave () {
      if (document.body.classList.contains('aside-fixed')) {
        if (this.insideTm) {
          clearTimeout(this.insideTm)
          this.insideTm = null
        }

        if (document.querySelector('.aside-menu .scroll')) {
          document.querySelector('.aside-menu .scroll').scrollTop = 0
        }

        // if the left aside menu is expand
        if (document.body.classList.contains('aside-minimize-hover')) {
          // hide back the left aside menu
          document.body.classList.remove('aside-minimize-hover')
          document.body.classList.add('aside-minimize')
        }
      }
    },
    hasActiveChildren (match) {
      return this.$route['path'].indexOf(match) !== -1
    },
    activate (el, tes = 'fals') {
      let codeSplit = el.split('_')
      let level = codeSplit.length

      if (level > 1 && this.asideActiveId === el) {
        let newCodeSplit = []
        for (let i = 0; i < (codeSplit.length - 1); i++) {
          newCodeSplit.push(codeSplit[i])
        }
        this.asideActiveId = newCodeSplit.join('_')
      } else if (this.asideActiveId === el) {
        this.asideActiveId = ''
      } else {
        this.asideActiveId = el
      }
    },
    openSecondary (child, name, item, redirect = true) {
      this.openedPrimary = name
      this.secondaryDesc = item.desc
      this.secondaryItems = child.filter(x => !x.hidden)
      if (this.secondaryItems.length > 1) this.togleSecondary(true)
      else if (this.secondaryItems.length === 1) {
        this.togleSecondary(false)
        if (redirect && this.$route.name !== this.secondaryItems[0].name) this.$router.push({ name: this.secondaryItems[0].name, query: { view: 'list' } })
      } else this.togleSecondary(false)
    },
    togleSecondary (val) {
      if (val) {
        this.$_sys.togleClass('kt_body', 'aside-minimize', false)
        // this.$store.commit('set', ['sideNavSecondary', true])
        this.sideNavToogle = true
      } else {
        this.$_sys.togleClass('kt_body', 'aside-minimize', true)
        // this.$store.commit('set', ['sideNavSecondary', false])
        this.sideNavToogle = false
      }
    },
    createLink (s) {
      if (this.$route.name !== s.name || this.$route.query.view !== 'list') {
        return { name: s.name, query: { view: 'list' } }
      } else return { query: { view: 'list' } }
    },
    hideSideNav (s, event) {
      this.$store.commit('set', ['sideNavMobile', false])
      this.$_sys.togleClass('kt_aside', 'aside-on', false)
      if (s.attr) {
        if (s.attr.hideNav) this.togleSecondary(false)
      }
    },
    async reloadModule () {
      await this.$store.dispatch('setModule')
      try {
        await this.$router.push({ name: 'main-module' })
      } catch (error) {
        console.log(error)
      }
      location.reload()
    }
  },
  computed: {
  },
  mounted () {
    document.onreadystatechange = () => {
      if (document.querySelector('.ps__rail-y')) {
        // document.querySelector('.ps__rail-y').classList.add('display-none')
      }
    }
  }
}
</script>
