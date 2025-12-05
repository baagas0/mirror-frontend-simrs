const module = {
  config: {
    name: 'master',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Ruang Layanan', label: 'Data Ruang Layanan', icon: null, path: '/', component: () => import('./ruang_layanan.vue') }
  ]
}
export default module
