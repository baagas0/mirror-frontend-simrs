const module = {
  config: {
    name: 'eklaim-v2',
    icon: 'ri-file-list-3-line',
    desc: 'Eklaim V2 - New Workflow',
    layout: true
  },
  routes: [
    {
      name: 'daftar-eklaim-v2',
      label: 'Daftar Eklaim V2',
      path: '/daftar_eklaim_v2',
      component: () => import('./daftarEklaim.vue')
    },
    {
      name: 'input-eklaim-v2',
      label: 'Input Eklaim V2',
      path: '/input_eklaim_v2',
      component: () => import('./inputEklaim.vue')
    }
  ]
}
export default module