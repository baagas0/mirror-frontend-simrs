const module = {
  config: {
    name: 'master',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'asuransi', label: 'Data asuransi', icon: null, path: '/asuransi', component: () => import('./asuransi.vue') },
    { name: 'alat_medis', label: 'Data alat medis', icon: null, path: '/alat_medis', component: () => import('./alat_medis.vue') },
    { name: 'bank', label: 'Data bank', icon: null, path: '/bank', component: () => import('./bank.vue') },
    { name: 'etnis', label: 'Data etnis', icon: null, path: '/etnis', component: () => import('./etnis.vue') },
    { name: 'golongan darah', label: 'Data golongan darah', icon: null, path: '/golongan_darah', component: () => import('./golonganDarah.vue') },
    { name: 'jenis layanan', label: 'Data jenis layanan', icon: null, path: '/jenis_layanan', component: () => import('./jenisLayanan.vue') },
    { name: 'kelas kunjungan', label: 'Data kelas kunjungan', icon: null, path: '/kelas_kunjungan', component: () => import('./kelasKunjungan.vue') },
    { name: 'kualifikasi', label: 'Data kualifikasi', icon: null, path: '/kualifikasi', component: () => import('./kualifikasi.vue') },
    { name: 'layanan', label: 'Data layanan', icon: null, path: '/layanan', component: () => import('./layanan.vue') },
    { name: 'loket', label: 'Data loket', icon: null, path: '/master_loket', component: () => import('./loket.vue') },
    { name: 'pekerjaan', label: 'Data pekerjaan', icon: null, path: '/pekerjaan', component: () => import('./pekerjaan.vue') },
    { name: 'pendidikan', label: 'Data pendidikan', icon: null, path: '/pendidikan', component: () => import('./pendidikan.vue') },
    { name: 'poliklinik', label: 'Data poliklinik', icon: null, path: '/poliklinik', component: () => import('./poliklinik.vue') },
    { name: 'specialist', label: 'Data specialist', icon: null, path: '/specialist', component: () => import('./specialist.vue') },
    { name: 'diagnosa', label: 'Data diagnosa', icon: null, path: '/diagnosa', component: () => import('./diagnosa.vue') },
    { name: 'diagnosa_keperawatan', label: 'Data diagnosa keperawatan', icon: null, path: '/diagnosa_keperawatan', component: () => import('./diagnosa_keperawatan.vue') },
    { name: 'tipe_tenaga_medis', label: 'Data tipe tenaga medis', icon: null, path: '/tipe_tenaga_medis', component: () => import('./tipe_tenaga_medis.vue') },
    { name: 'jenis_penunjang', label: 'Data Jenis Penunjang', icon: null, path: '/jenis_penunjang', component: () => import('./jenis_penunjang.vue') }
  ]
}
export default module
