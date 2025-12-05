const module = {
  config: {
    name: 'bed',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Master Bed', label: 'Master Bed', icon: null, path: '/bed', component: () => import('./master_bed.vue') },
    { name: 'Master Ruang', label: 'Master Ruang', icon: null, path: '/ruang', component: () => import('./msRuang.vue') },
    { name: 'History Bed', label: 'History Bed', icon: null, path: '/history_bed', component: () => import('./historyBed.vue') },
    { name: 'Master Kamar', label: 'Master Kamar', icon: null, path: '/kamar', component: () => import('./msKamar.vue') },
    { name: 'Master Kelas Kamar', label: 'Master Kelas Kamar', icon: null, path: '/kelas_kamar', component: () => import('./msKelasKamar.vue') },
    { name: 'Master Kelas Kamar Sir Online', label: 'Master Kelas Kamar Sir Online', icon: null, path: '/kelas_kamar_sirsonline', component: () => import('./msKelasKamarSirOnline.vue') },
    { name: 'Master Ruang Applicare', label: 'Master Ruang Applicare', icon: null, path: '/ruang_aplicares', component: () => import('./ruangAplicares.vue') },
    { name: 'Master Golongan Kelas Applicare', label: 'Master Golongan Kelas Applicare', icon: null, path: '/golongan_kelas_aplicares', component: () => import('./msGolonganKelasAplicares.vue') },
    { name: 'Master Bed Booking', label: 'Master Bed Booking', icon: null, path: '/bed_booking', component: () => import('./bedBooking.vue') },
    // { name: 'Master Bed Monitoring', label: 'Master Bed Monitoring', icon: null, path: '/monitoring', component: () => import('./bedMonitoring.vue') },
    { name: 'Master Bed Monitoring', label: 'Master Bed Monitoring', icon: null, path: '/monitoring', component: () => import('./monitoring_bed/monitoring_bed.vue') },
  ]
}
export default module
