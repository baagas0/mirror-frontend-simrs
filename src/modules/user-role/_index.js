const module = {
  config: {
    name: 'users',
    icon: 'ri-user-line',
    desc: 'Digunakan untuk mendaftarkan, menonaktifkan, dan mengatur hak akses pengguna dan master data di Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'users', label: 'Daftar Pengguna', icon: null, path: '/users', component: () => import('./users.vue') },
    { name: 'role-group', icon: null, path: '/role-group', component: () => import('./role-group.vue') },
    { name: 'role', icon: null, path: '/role', component: () => import('./role.vue') },
    { name: 'permissions', icon: null, path: '/permissions', component: () => import('./permissions.vue') }
  ]
}
export default module
