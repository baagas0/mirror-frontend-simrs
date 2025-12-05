const module = {
  config: {
    name: 'monitoring',
    icon: 'ri-file-list-2-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'monitoring-submission', label: 'Monitoring Submission', icon: null, path: '/monitoring-submission', component: () => import('./monitoring-submission.vue') },
    { name: 'leaderboard', label: 'Leaderboard', icon: null, path: '/leaderboard', component: () => import('./monitoring-leaderboard.vue') }
  ]
}
export default module
