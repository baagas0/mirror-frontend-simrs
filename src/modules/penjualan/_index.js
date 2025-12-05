const module = {
  config: {
    name: 'penjualan',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'Jenis Fasilitas', label: 'Data Jenis Fasilitas', icon: null, path: '/ms_penjualan/jenis_fasilitas', component: () => import('./ms_penjualan/msJenisFasilitas.vue') },
    { name: 'Jenis Harga Fasilitas', label: 'Data Harga Fasilitas', icon: null, path: '/ms_penjualan/ms_fasilitas', component: () => import('./ms_penjualan/msHargaFasilitas.vue') },
    { name: 'Jenis Jasa', label: 'Data Jenis Jasa', icon: null, path: '/ms_penjualan/jenis_jasa', component: () => import('./ms_penjualan/msJenisJasa.vue') },
    { name: 'Jasa', label: 'Data Jasa', icon: null, path: '/ms_penjualan/ms_jasa', component: () => import('./ms_penjualan/msJasa.vue') },
    { name: 'Jenis Harga Jasa', label: 'Data Harga Jasa', icon: null, path: '/ms_penjualan/harga_jasa', component: () => import('./ms_penjualan/msHargaJasa.vue') },
    { name: 'Data Tarif', label: 'Data Tarif', icon: null, path: '/ms_penjualan/ms_tarif', component: () => import('./ms_penjualan/msTarif.vue') },
    { name: 'Data Harga', label: 'Data Harga', icon: null, path: '/ms_penjualan/ms_harga', component: () => import('./ms_penjualan/msHarga.vue') },

    { name: 'Input Penjualan', label: 'Input Penjualan', icon: null, path: '/transaksi_penjualan/input_penjualan', component: () => import('./transaksi_penjualan/input_penjualan/input_penjualan.vue') },
    { name: 'Daftar Penjualan', label: 'Daftar Penjualan', icon: null, path: '/transaksi_penjualan/daftar_penjualan', component: () => import('./transaksi_penjualan/daftar_penjualan/daftar_penjualan.vue') },
  ]
}
export default module
