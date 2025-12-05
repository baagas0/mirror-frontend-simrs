
const module = {
  config: {
    name: 'bpjs',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'VClaim Referensi', label: 'Referensi', icon: null, path: '/vclaim/referensi', component: () => import('./vclaim/referensi.vue') },

    { name: 'VClaim SEP', label: 'SEP', icon: null, path: '/vclaim/sep/log', component: () => import('./vclaim/sep/log.vue') },
    { name: 'SEP Fingerprint', label: 'SEP Fingerprint', icon: null, path: '/vclaim/sep/fingerprint', component: () => import('./vclaim/sep/fingerprint.vue') },
    { name: 'SEP Internal', label: 'SEP Internal', icon: null, path: '/vclaim/sep/internal', component: () => import('./vclaim/sep/internal.vue') },
    { name: 'SEP Approval', label: 'SEP Approval', icon: null, path: '/vclaim/sep/approval', component: () => import('./vclaim/sep/approval.vue') },
    { name: 'SEP Pulang', label: 'SEP Pulang', icon: null, path: '/vclaim/sep/pulang', component: () => import('./vclaim/sep/pulang.vue') },

    { name: 'Rujukan Keluar RS', label: 'Rujukan Keluar RS', icon: null, path: '/vclaim/rujukan/keluar', component: () => import('./vclaim/rujukanKeluarRS.vue') },
    { name: 'Rujukan Khusus', label: 'Rujukan Khusus', icon: null, path: '/vclaim/rujukan/khusus', component: () => import('./vclaim/rujukanKhusus.vue') },

    { name: 'VClaim Rencana Kontrol/SPRI', label: 'Rencana Kontrol/SPRI', icon: null, path: '/vclaim/kontrol', component: () => import('./vclaim/kontrol.vue') },
    
    { name: 'daftar eklaim', label: 'Daftar Eklaim', icon: null, path: '/eklaim/daftar_eklaim', component: () => import('./eklaim/daftarEklaim/daftarEklaim.vue') },
    { name: 'input tagigan eklaim', label: 'Input Tagihan Eklaim', icon: null, path: '/eklaim/input_tagihan_eklaim', component: () => import('./eklaim/inputTagihan/inputTagihan.vue') },
    { name: 'input pasien eklaim', label: 'Input Pasien Eklaim', icon: null, path: '/eklaim/input_pasien_eklaim', component: () => import('./eklaim/inputPasien/inputPasien.vue') },

    {
      name: 'daftar-eklaim-v2',
      label: 'Daftar Eklaim V2',
      path: '/eklaimV2/daftar_eklaim_v2',
      component: () => import('./eklaimV2/daftarEklaim.vue')
    },
    {
      name: 'input-eklaim-v2',
      label: 'Input Eklaim V2',
      path: '/eklaimV2/input_eklaim_v2',
      component: () => import('./eklaimV2/inputEklaim.vue')
    }
  ]
}
export default module
