const module = {
  config: {
    name: 'warehouse',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'warehouse_farmasi_laporan_laporan_pembelian', label: 'Data Pre Order Farmasi', icon: null, path: '/laporan_pembelian', component: () => import('./laporan_pembelian/laporan_pembelian.vue') },
    { name: 'warehouse_farmasi_laporan_laporan_adjustment', label: 'Data Pre Order Farmasi', icon: null, path: '/laporan_adjustment', component: () => import('./laporan_adjusment/laporan_adjusment.vue') },
    { name: 'warehouse_farmasi_laporan_laporan_stock_opname', label: 'Data Pre Order Farmasi', icon: null, path: '/laporan_stock_opname', component: () => import('./laporan_stock_opname/laporan_stock_opname.vue') },
  ]
}
export default module
