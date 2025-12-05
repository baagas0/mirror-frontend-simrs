const module = {
  config: {
    name: 'tagihan',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'input tagihan', label: 'Data input tagihan', icon: null, path: '/transaksi_tagihan/input_tagihan', component: () => import('./transaksi_tagihan/input_tagihan/input_tagihan.vue') },
    { name: 'daftar tagihan', label: 'Data daftar tagihan', icon: null, path: '/transaksi_tagihan/daftar_tagihan', component: () => import('./daftar_tagihan.vue') },
  ]
}
export default module
