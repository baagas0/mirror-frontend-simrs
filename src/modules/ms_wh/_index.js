const module = {
  config: {
    name: 'ms_wh',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Data Supplier', label: 'Data Supplier', icon: null, path: '/ms_wh/supplier', component: () => import('./msSupplier.vue') },
    { name: 'Data Satuan Barang', label: 'Data Satuan Barang', icon: null, path: '/ms_wh/satuan', component: () => import('./msSatuanBarang.vue') },
    { name: 'Data Produsen', label: 'Data Produsen', icon: null, path: '/ms_wh/produsen', component: () => import('./msProdusen.vue') },
  ]
}
export default module