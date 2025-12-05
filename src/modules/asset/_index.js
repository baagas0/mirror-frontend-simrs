const module = {
  config: {
    name: 'asset',
    icon: 'ri-map-line',
    desc: 'Serova SIMRS',
    layout: true
  },
  routes: [
    { name: 'ms_asset_fix_asset', label: 'Data tingkat asset', icon: null, path: '/fix_asset', component: () => import('./fix_asset/fix_asset.vue') },
    // Master
    { name: 'ms_asset_tingkat_asset', label: 'Data tingkat asset', icon: null, path: '/ms_asset/tingkat_asset', component: () => import('./tingkat_asset/tingkat_asset.vue') },
    { name: 'ms_asset_ms_type_asset', label: 'Data ms_type asset', icon: null, path: '/ms_asset/ms_type_asset', component: () => import('./ms_type_asset/ms_type_asset.vue') },
    { name: 'ms_asset_metode_penyusutan', label: 'Data tingkat asset', icon: null, path: '/ms_asset/metode_penyusutan', component: () => import('./ms_metode_penyusutan/ms_metode_penyusutan.vue') },
    { name: 'ms_asset_ms_type_fiscal', label: 'Data tingkat asset', icon: null, path: '/ms_asset/ms_type_fiscal', component: () => import('./ms_type_fiscal/ms_type_fiscal.vue') },
  ]
}
export default module
