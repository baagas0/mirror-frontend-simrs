const module = {
  config: {
    name: 'akuntansi',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    // Master
    { name: 'coa', label: 'Data coa', icon: null, path: '/ms_akt/coa', component: () => import('./ms_akt/coa.vue') },
    { name: 'kas', label: 'Data kas', icon: null, path: '/ms_akt/kas', component: () => import('./ms_akt/kas.vue') },
    { name: 'periode', label: 'Data periode', icon: null, path: '/ms_akt/periode', component: () => import('./ms_akt/periode.vue') },
    { name: 'tipe general ledger', label: 'Data tipe general ledger', icon: null, path: '/ms_akt/tipe_general_ledger', component: () => import('./ms_akt/tipe_general_ledger.vue') },
    { name: 'tipe penerima', label: 'Data tipe penerima', icon: null, path: '/ms_akt/tipe_penerima', component: () => import('./ms_akt/tipe_penerima.vue') },
    { name: 'setting akun', label: 'Data setting akun', icon: null, path: '/setting_kode', component: () => import('./setting_kode.vue') },

    // Transaksi
    { name: 'transaksi_akt_daftar_jurnal', label: 'Daftar Jurnal Akutansi', icon: null, path: '/transaksi_akt/daftar_jurnal', component: () => import('./transaksi/daftar_jurnal/DaftarJurnal.vue') },
    { name: 'transaksi_akt_input_jurnal', label: 'Input Jurnal Akutansi', icon: null, path: '/transaksi_akt/input_jurnal', component: () => import('./transaksi/input_jurnal/InputJurnal.vue') },
    
    // neraca
    { name: 'transaksi_akt_neraca', label: 'Neraca', icon: null, path: '/laporan/neraca', component: () => import('./laporan/neraca.vue') },
    { name: 'transaksi_akt_cashflow', label: 'Cashflow', icon: null, path: '/laporan/cashflow', component: () => import('./laporan/cashflow.vue') },
    { name: 'transaksi_akt_buku_besar', label: 'Buku Besar', icon: null, path: '/laporan/buku_besar', component: () => import('./laporan/buku_besar.vue') }
  ]
}
export default module
