const module = {
  config: {
    name: 'master',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Data Dokter', label: 'Data dokter', icon: null, path: '/data_dokter', component: () => import('./data_dokter.vue') },
    { name: 'Master Jadwal Dokter', label: 'Master Jadwal Dokter', icon: null, path: '/ms_jadwal_dokter', component: () => import('./ms_jadwal_dokter.vue') },
    { name: 'Jadwal Dokter', label: 'Jadwal Dokter', icon: null, path: '/jadwal_dokter', component: () => import('./jadwal_dokter.vue') }
  ]
}
export default module
