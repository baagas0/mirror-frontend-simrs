const module = {
  config: {
    name: 'master',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'triage', label: 'Data triage', icon: null, path: '/triage', component: () => import('./triage.vue') },
    { name: 'triage options', label: 'Data triage options', icon: null, path: '/triage_options', component: () => import('./triage_options.vue') },
    { name: 'form triage', label: 'Data form triage', icon: null, path: '/form_triage', component: () => import('./form_triage.vue') }
  ]
}
export default module
