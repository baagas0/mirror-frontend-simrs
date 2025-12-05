const module = {
  config: {
    name: 'warehouse',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    // Master Warehouse
    { name: 'supplier', label: 'Data supplier', icon: null, path: '/ms_wh/supplier', component: () => import('./ms_wh/supplier.vue') },
    { name: 'satuan', label: 'Data satuan', icon: null, path: '/ms_wh/satuan', component: () => import('./ms_wh/satuan.vue') },
    { name: 'produsen', label: 'Data produsen', icon: null, path: '/ms_wh/produsen', component: () => import('./ms_wh/produsen.vue') },

    // Master Farmasi
    { name: 'barang', label: 'Data barang', icon: null, path: '/farmasi/ms_fm/barang', component: () => import('./ms_fm/barang.vue') },
    { name: 'gudang', label: 'Data gudang', icon: null, path: '/farmasi/ms_fm/gudang', component: () => import('./ms_fm/gudang.vue') },
    { name: 'kelas terapi', label: 'Data kelas_terapi', icon: null, path: '/farmasi/ms_fm/kelas_terapi', component: () => import('./ms_fm/kelas_terapi.vue') },
    { name: 'golongan_obat', label: 'Data golongan_obat', icon: null, path: '/farmasi/ms_fm/golongan_obat', component: () => import('./ms_fm/golongan_obat.vue') },
    { name: 'jenis_obat', label: 'Data jenis_obat', icon: null, path: '/farmasi/ms_fm/jenis_obat', component: () => import('./ms_fm/jenis_obat.vue') },
    { name: 'tarif_cbg', label: 'Data tarif_cbg', icon: null, path: '/farmasi/ms_fm/tarif_cbg', component: () => import('./ms_fm/tarif_cbg.vue') },

    // Transaksi Farmasi
    { name: 'Data Pre Order Farmasi', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/transaksi/pre_order', component: () => import('./farmasi/transaksi/pre_order/pre_order.vue') },
    { name: 'Data Pembelian Farmasi', label: 'Data Pembelian Farmasi', icon: null, path: '/farmasi/transaksi/pembelian', component: () => import('./farmasi/transaksi/pembelian/pembelian.vue') },
    { name: 'Data Pembayaran Farmasi', label: 'Data Pembayaran Farmasi', icon: null, path: '/farmasi/transaksi/pembayaran', component: () => import('./farmasi/transaksi/pembayaran/pembayaran.vue') },
    { name: 'Data Servis Tutup Pembelian Farmasi', label: 'Data Servis Tutup Pembelian Farmasi', icon: null, path: '/farmasi/transaksi/servis_tutup_pembelian', component: () => import('./farmasi/transaksi/pembayaran_excel/pembayaran_excel.vue') },

    // Inventory Farmasi
    { name: 'Inventory Controls', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/inventory/stock', component: () => import('./farmasi/inventory/stock/Stock.vue') },
    { name: 'Inventory Stock Opname', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/inventory/stock_opname', component: () => import('./farmasi/inventory/stock_opname/stock_opname.vue') },
    { name: 'Inventory Mutasi Item', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/inventory/mutasi_item', component: () => import('./farmasi/inventory/mutasi_item/MutasiItem.vue') },
    { name: 'Inventory Adjustment', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/inventory/adjustment', component: () => import('./farmasi/inventory/adjustment/Adjustment.vue') },
    { name: 'Inventory Receive Mutasi', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/inventory/receive_item', component: () => import('./farmasi/inventory/receive_mutasi/ReceiveItem.vue') },
    { name: 'Inventory Request Mutasi', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/inventory/request_item', component: () => import('./farmasi/inventory/request_mutasi/RequestItem.vue') },

    // Laporan Farmasi
    // { name: 'warehouse_farmasi_laporan_history_stock', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/laporan/history_stock', component: () => import('./farmasi/laporan/history_stock/history_stock.vue') },
    // { name: 'warehouse_farmasi_laporan_history_kartu_stock', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/laporan/history_kartu_stock', component: () => import('./farmasi/laporan/kartu_stock/kartu_stock.vue') },
    // { name: 'warehouse_farmasi_laporan_history_narkotik', label: 'Data Pre Order Farmasi', icon: null, path: '/farmasi/laporan/laporan_history_narkotik', component: () => import('./farmasi/laporan/laporan_narkotik/laporan_narkotik.vue') },
  ]
}
export default module
