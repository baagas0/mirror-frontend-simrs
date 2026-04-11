const module = {
  config: {
    name: 'registrasi',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'IGD', label: 'IGD', icon: null, path: '/igd', component: () => import('./igd.vue') },
    { name: 'Rawat Inap', label: 'Rawat Inap', icon: null, path: '/rawat_inap', component: () => import('./rawat_inap.vue') },
    { name: 'Rawat Jalan', label: 'Rawat Jalan', icon: null, path: '/rawat_jalan', component: () => import('./rawat_jalan.vue') },

    // ROUTE LAB
    { name: 'Master Lab Paket', label: 'Master Lab Paket', icon: null, path: '/lab/master/lab_paket', component: () => import('./lab/master/lab_paket.vue') },
    { name: 'Master Lab Paket List', label: 'Master Lab Paket List', icon: null, path: '/lab/master/lab_paket_list', component: () => import('./lab/master/lab_paket_list.vue') },
    { name: 'Master Penunjang', label: 'Master Penunjang', icon: null, path: '/lab/master/penunjang', component: () => import('./lab/master/penunjang.vue') },
    { name: 'Lab Regis', label: 'Lab Regis', icon: null, path: '/lab/lab_regis', component: () => import('./lab/lab_regis.vue') },
    { name: 'Lab Pengambilan Sampel', label: 'Lab Pengambilan Sampel', icon: null, path: '/lab/lab_pengambilan_sampel/:lab_regis_id', component: () => import('./lab/lab_pengambilan_sampel.vue') },
    { name: 'Lab Hasil', label: 'Lab Hasil', icon: null, path: '/lab/lab_hasil', component: () => import('./lab/lab_hasil.vue') },
    { name: 'Laporan Pemeriksaan', label: 'Laporan Pemeriksaan', icon: null, path: '/lab/laporan_pemeriksaan_laboratorium', component: () => import('./lab/laporan_pemeriksaan_laboratorium.vue') },
    { name: 'Laporan Laboratorium', label: 'Laporan Laboratorium', icon: null, path: '/lab/lab_laporan', component: () => import('./lab/lab_laporan.vue') },
    { name: 'Laporan Waktu Tunggu Lab', label: 'Laporan Waktu Tunggu Lab', icon: null, path: '/lab/lab_laporan_waktu_tunggu', component: () => import('./lab/lab_laporan_waktu_tunggu.vue') },
    { name: 'Pembatalan Lab', label: 'Pembatalan Lab', icon: null, path: '/lab/lab_pembatalan', component: () => import('./lab/lab_pembatalan.vue') },
    { name: 'Laporan Pembatalan Lab', label: 'Laporan Pembatalan Lab', icon: null, path: '/lab/lab_laporan_pembatalan', component: () => import('./lab/lab_laporan_pembatalan.vue') },
    
    // Layanan IGD
    { name: 'Layanan IGD Triage', label: 'Layanan IGD Triage', icon: null, path: '/layanan_igd/triage', component: () => import('./layanan_igd/triage.vue') },
    { name: 'Layanan IGD keperawatan', label: 'Layanan IGD keperawatan', icon: null, path: '/layanan_igd/implementasi_keperawatan', component: () => import('./layanan_igd/implementasi_keperawatan.vue') },
    { name: 'Layanan IGD assesmen keperawatan', label: 'Layanan IGD assesmen keperawatan', icon: null, path: '/layanan_igd/assesmen_keperawatan', component: () => import('./layanan_igd/assesmen_keperawatan.vue') },
    { name: 'Layanan IGD assesmen medis', label: 'Layanan IGD assesmen medis', icon: null, path: '/layanan_igd/assesmen_medis', component: () => import('./layanan_igd/assesmen_medis.vue') },
    { name: 'Layanan IGD Farmasi', label: 'Layanan IGD Farmasi', icon: null, path: '/layanan_igd/farmasi', component: () => import('./layanan_igd/farmasi.vue') },
    { name: 'Layanan IGD Gizi', label: 'Layanan IGD Gizi', icon: null, path: '/layanan_igd/gizi', component: () => import('./layanan_igd/gizi.vue') },
    { name: 'Layanan IGD Visum', label: 'Layanan IGD Visum', icon: null, path: '/layanan_igd/visum', component: () => import('./layanan_igd/visum.vue') },
    { name: 'Layanan IGD Observasi', label: 'Layanan IGD Observasi', icon: null, path: '/layanan_igd/observasi', component: () => import('./layanan_igd/observasi.vue') },
    { name: 'Layanan IGD resume medis', label: 'Layanan IGD resume medis', icon: null, path: '/layanan_igd/resume_medis', component: () => import('./layanan_igd/medis.vue') },
    { name: 'BMHP IGD', label: 'Input BMHP IGD', icon: null, path: '/layanan_igd/bmhp', component: () => import('./layanan_igd/bmhp.vue') },
    { name: 'Layanan Labolatorium IGD', label: 'Layanan Labolatorium IGD', icon: null, path: '/layanan_igd/lab_regis', component: () => import('./layanan_igd/lab_regis_igd.vue') },
    { name: 'Layanan Radiologi IGD', label: 'Layanan Radiologi IGD', icon: null, path: '/layanan_igd/rad_regis', component: () => import('./layanan_igd/rad_regis_igd.vue') },

    // Layanan R Jalan
    { name: 'Layanan RJalan Keperawatan', label: 'Layanan RJalan Keperawatan', icon: null, path: '/layanan_rjalan/keperawatan', component: () => import('./layanan_rjalan/keperawatan.vue') },
    { name: 'Layanan RJalan Medis', label: 'Layanan RJalan Medis', icon: null, path: '/layanan_rjalan/medis', component: () => import('./layanan_rjalan/medis.vue') },
    { name: 'Layanan RJalan Farmasi', label: 'Layanan RJalan Farmasi', icon: null, path: '/layanan_rjalan/farmasi', component: () => import('./layanan_rjalan/farmasi.vue') },
    { name: 'Layanan RJalan Gizi', label: 'Layanan RJalan Gizi', icon: null, path: '/layanan_rjalan/gizi', component: () => import('./layanan_rjalan/gizi.vue') },
    { name: 'Layanan RJalan Visum', label: 'Layanan RJalan Visum', icon: null, path: '/layanan_rjalan/visum', component: () => import('./layanan_rjalan/visum.vue') },
    { name: 'BMHP Rjalan', label: 'Input BMHP Rjalan', icon: null, path: '/layanan_rjalan/bmhp', component: () => import('./layanan_rjalan/bmhp.vue') },
    { name: 'Layanan Labolatorium Rjalan', label: 'Layanan Labolatorium Rjalan', icon: null, path: '/layanan_rjalan/lab_regis', component: () => import('./layanan_rjalan/lab_regis_igd.vue') },
    { name: 'Layanan Radiologi Rjalan', label: 'Layanan Radiologi Rjalan', icon: null, path: '/layanan_rjalan/rad_regis', component: () => import('./layanan_rjalan/rad_regis_igd.vue') },

    // Layanan R Inap
    { name: 'Layanan RInap CPPT', label: 'Layanan RInap CPPT', icon: null, path: '/layanan_ranap/cppt', component: () => import('./layanan_ranap/cppt.vue') },
    { name: 'Layanan RInap Keperawatan', label: 'Layanan RInap Keperawatan', icon: null, path: '/layanan_ranap/ev_im_keperawatan', component: () => import('./layanan_ranap/ev_im_keperawatan.vue') },
    { name: 'Layanan RInap resume medis', label: 'Layanan RInap resume medis', icon: null, path: '/layanan_ranap/resume_medis', component: () => import('./layanan_ranap/medis.vue') },
    { name: 'Layanan RInap casemix resume medis', label: 'Layanan RInap casemix resume medis', icon: null, path: '/layanan_ranap/casemix_resume_medis', component: () => import('./layanan_ranap/casemix_medis.vue') },
    { name: 'Layanan RInap Farmasi', label: 'Layanan RInap Farmasi', icon: null, path: '/layanan_ranap/farmasi', component: () => import('./layanan_ranap/farmasi.vue') },
    { name: 'Layanan RInap Gizi', label: 'Layanan RInap Gizi', icon: null, path: '/layanan_ranap/gizi', component: () => import('./layanan_ranap/gizi.vue') },
    { name: 'Layanan RInap Visum', label: 'Layanan RInap Visum', icon: null, path: '/layanan_ranap/visum', component: () => import('./layanan_ranap/visum.vue') },
    { name: 'BMHP RInap', label: 'Input BMHP RInap', icon: null, path: '/layanan_ranap/bmhp', component: () => import('./layanan_ranap/bmhp.vue') },
    { name: 'Layanan Labolatorium RInap', label: 'Layanan Labolatorium RInap', icon: null, path: '/layanan_ranap/lab_regis', component: () => import('./layanan_ranap/lab_regis_igd.vue') },
    { name: 'Layanan Radiologi RInap', label: 'Layanan Radiologi RInap', icon: null, path: '/layanan_ranap/rad_regis', component: () => import('./layanan_ranap/rad_regis_igd.vue') },

    { name: 'Jadwal Operasi', label: 'Jadwal Operasi', icon: null, path: '/layanan_ranap/jadwal_operasi', component: () => import('./layanan_ranap/jadwal_operasi.vue') },

    // Radiologi
    { name: 'Tes Radiologi', label: 'Tes Radiologi', icon: null, path: '/radiologi/master/rad_test', component: () => import('./radiologi/master/rad_test.vue') },
    { name: 'List Tes Radiologi', label: 'List Tes Radiologi', icon: null, path: '/radiologi/master/test_list', component: () => import('./radiologi/master/rad_test_list.vue') },
    { name: 'Radiologi Regis', label: 'Radiologi Regis', icon: null, path: '/radiologi/rad_regis', component: () => import('./radiologi/rad_regis.vue') },
    { name: 'Hasil Radiologi', label: 'Hasil Radiologi', icon: null, path: '/radiologi/rad_hasil', component: () => import('./radiologi/rad_hasil.vue') },
    // { name: 'Hasil Radiologi dengan Expertise', label: 'Hasil Radiologi dengan Expertise', icon: null, path: '/radiologi/rad_hasil_with_expertise', component: () => import('./radiologi/rad_hasil_with_expertise.vue') },
    { name: 'Expertise Radiologi', label: 'Expertise Radiologi', icon: null, path: '/radiologi/rad_expertise', component: () => import('./radiologi/rad_expertise.vue') },
    
    // Laporan EMR
    { name: 'Laporan EMR', label: 'Laporan EMR', icon: null, path: '/laporan/harian_medis', component: () => import('./laporan_emr/laporan_medis.vue') },
    { name: 'Laporan Harian Kunjungan Pasien', label: 'Laporan Harian Kunjungan Pasien', icon: null, path: '/laporan_harian/kunjungan_pasien', component: () => import('./laporan_harian/kunjungan_pasien.vue') },
    { name: 'Laporan Harian Kunjungan BPJS', label: 'Laporan Harian Kunjungan BPJS', icon: null, path: '/laporan_harian/kunjungan_bpjs', component: () => import('./laporan_harian/kunjungan_pasien_bpjs.vue') },
    { name: 'Laporan Harian Penyakit', label: 'Laporan Harian Penyakit', icon: null, path: '/laporan_harian/penyakit', component: () => import('./laporan_harian/penyakit.vue') },
    { name: 'Laporan Harian Pemeriksaan Medis', label: 'Laporan Harian Pemeriksaan Medis', icon: null, path: '/laporan_harian/pemeriksaan_medis', component: () => import('./laporan_harian/pemeriksaan_medis.vue') },
  ]
}
export default module
