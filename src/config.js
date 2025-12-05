const app = {
  name: 'SIM RS',
  desc: 'Sistem Informasi Rumah Sakit',
  fullname: 'RSUD Buton Selatan',
  company: 'Jl. Gajah mada  kec.batauga kab.buton selatan, sulawesi tenggara',
  guide: 'https://google.com',
  site: 'https://serova.id',
  code: 'Serova',
  logo: {
    sm: './static/img/logo/baubau.png',
    md: './static/img/logo/baubau.png',
    lg: './static/img/logo/baubau.png'
  },
  server: {
    stagging: 'http://serova.id:8080/',
    development: 'http://serova.id:8080/',
    production: 'http://serova.id:8080/',
    demo: 'http://serova.id:8080/'
  },
  // server: {
  //   stagging: 'http://localhost:8071/',
  //   development: 'http://localhost:8071/',
  //   production: 'http://localhost:8071/',
  //   demo: 'http://localhost:8071/'
  // },
  sso: {
    stagging: 'https://pmis-v2.pttas.net/api/',
    development: 'https://pmis-v2.pttas.net/api/',
    production: '?????',
    demo: 'https://pmis-v2.pttas.net/api/'
  },
  download: {
    android: 'https://play.google.com/store/',
    ios: 'https://www.apple.com/id/app-store/'
  },
  options: {
    allowRegister: false,
    forgetPassword: false,
    autofill: false,
    myAction: true,
    asideRight: false,
    sso: false
  }
}

// =========================================================
// File CUSTOM Variable SCSS
// static\assets\sass\components\_variables.demo.scss
// =========================================================

export default app
