const module = {
  config: {
    name: 'dashboard',
    icon: 'ri-dashboard-3-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'dashboard', label: 'Dashboard', icon: null, path: '/', component: () => import('./dashboard.vue') },
    // { name: 'dashboard Executive', label: 'Dashboard Executive', icon: null, path: '/dashboard_executive', component: () => import('./dashboard_executive.vue') },
    { name: 'dashboard-executive', label: 'Dashboard Executive', icon: null, path: '/dashboard_executive', component: () => import('./dashboard_executive.vue') }
  ]
}
export default module
