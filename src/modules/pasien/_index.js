const module = {
  config: {
    name: 'pasien',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Master Rekam Medis', label: 'Master Rekam Medis', icon: null, path: '/rekam_medis', component: () => import('./rekam_medis.vue') }
  ]
}
export default module
