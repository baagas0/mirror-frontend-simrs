const module = {
  config: {
    name: 'antrian',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Jenis Antrian', label: 'Data Jenis Antrian', icon: null, path: '/jenis_antrian', component: () => import('./jenis_antrian.vue') },
    { name: 'Register APM', label: 'Register APM', icon: null, path: '/display_apm', component: () => import('./display_apm.vue') },
    { name: 'Display Layar Loket', label: 'Display Layar Loket', icon: null, path: '/display_layar_loket', component: () => import('./display_layar_loket.vue') },
    { name: 'Display Layar Poli', label: 'Display Layar Poli', icon: null, path: '/display_layar_poli', component: () => import('./display_layar_poli.vue') },
    { name: 'Loket Antrian', label: 'Data Loket Antrian', icon: null, path: '/list_antrian_loket', component: () => import('./list_antrian/list_antrian_loket.vue') },
    { name: 'Poli Antrian', label: 'Data Poli Antrian', icon: null, path: '/list_antrian_poli', component: () => import('./list_antrian/list_antrian_poli.vue') },
    { name: 'Farmasi Antrian', label: 'Data Farmasi Antrian', icon: null, path: '/list_antrian_farmasi', component: () => import('./list_antrian/list_antrian_farmasi.vue') },
    { name: 'Kasir Antrian', label: 'Data Kasir Antrian', icon: null, path: '/list_antrian_kasir', component: () => import('./list_antrian/list_antrian_kasir.vue') },
    { name: 'Monitoring Antrol', label: 'Monitoring Antrol', icon: null, path: '/monitoring_antrol', component: () => import('./monitoring_antrol.vue') }
  ]
}
export default module
