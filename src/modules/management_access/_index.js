const module = {
  config: {
    name: 'management_access',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Menu', label: 'Dashboard Summary', icon: null, path: '/menu', component: () => import('./menu.vue') },
    { name: 'Hak Akses', label: 'Dashboard Hak Akses', icon: null, path: '/ms_role', component: () => import('./role.vue') },
    { name: 'Pengguna', label: 'Dashboard Pengguna', icon: null, path: '/ms_user', component: () => import('./users.vue') },
    { name: 'Access', label: 'Dashboard Access', icon: null, path: '/access', component: () => import('./access.vue') }
  ]
}
export default module
