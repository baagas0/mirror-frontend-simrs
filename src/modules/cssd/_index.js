const module = {
  config: {
    name: 'cssd',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Penerimaan Alat Steril', label: 'Penerimaan Alat Steril', icon: null, path: '/permintaan_steril', component: () => import('./permintaan_steril.vue') },

    {
      name: 'daftar-permintaan-kotor-1',
      label: 'Daftar Permintaan',
      path: '/permintaan_kotor_v1/daftar_permintaan',
      component: () => import('./permintaan_kotor/daftarPermintaan.vue')
    },
    {
      name: 'daftar-permintaan-kotor-2',
      label: 'Daftar Permintaan Diterima CSSD',
      path: '/permintaan_kotor/daftar_diterima_cssd',
      component: () => import('./permintaan_kotor/daftarPermintaanDiterimaCssd.vue')
    },
    {
      name: 'input-permintaan-kotor-3',
      label: 'Input Permintaan',
      path: '/permintaan_kotor/input_permintaan',
      component: () => import('./permintaan_kotor/pageInputPermintaan2.vue')
    },
    {
      name: 'detail-permintaan-kotor-4',
      label: 'Detail Permintaan',
      path: '/permintaan_kotor/detail_permintaan',
      component: () => import('./permintaan_kotor/detailPermintaan.vue')
    },
    {
      name: 'dashboard-permintaan-kotor-5',
      label: 'Dashboard',
      path: '/permintaan_kotor/dashboard_permintaan',
      component: () => import('./permintaan_kotor/dashboardPermintaan.vue')
    }
  ]
}
export default module
