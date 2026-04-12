const module = {
  config: {
    name: "operasi",
    icon: "ri-map-line",
    desc: "Serova SIMRS",
    layout: true,
  },
  routes: [
    { name: "List Operasi", label: "List Operasi", icon: null, path: "/list_operasi", component: () => import("./list_operasi.vue") },
    { name: "Mapping Operasi", label: "Mapping Operasi", icon: null, path: "/mapping_operasi", component: () => import("./mapping_operasi.vue") },
    { name: "Persetujuan Operasi", label: "Persetujuan Operasi", icon: null, path: "/persetujuan_operasi", component: () => import("./persetujuan_operasi.vue") },
    { name: "Persetujuan Anastesi", label: "Persetujuan Anastesi", icon: null, path: "/persetujuan_anastesi", component: () => import("./persetujuan_anastesi.vue") },
    { name: "Input BMHP Operasi", label: "Input BMHP Operasi", icon: null, path: "/input_bmhp", component: () => import("./input_bmhp.vue") },
  ],
};
export default module;
