/* __placeholder__ */
export default (await import('vue')).default.extend({
name: 'crud-poliklinik',
data() {
return {
config: {
title: 'Daftar Poliklinik',
model_api: 'poliklinik',
getter: 'msPoliklinik',
setter: 'msPoliklinik',
pk_field: null,
frontendPaginate: false,
permission: {
create: 'template-allow-all',
read: 'template-allow-all',
update: 'template-allow-all',
delete: 'template-allow-all'
},
slave: [],
fields: [
// nama_poliklinik
{
id: 'nama_poliklinik',
data: 'nama_poliklinik',
label: 'Nama Poliklinik',
placeholder: null,
methods: {
list: true,
detail: true,
create: true,
update: true,
filter: true
}
},
// kode_poliklinik
{
id: 'kode_poliklinik',
data: 'kode_poliklinik',
label: 'Kode Poliklinik',
placeholder: null,
methods: {
list: true,
detail: true,
create: true,
update: true,
filter: true
}
}
]
}
};
},
methods: {
updateSatuSehat(x) {
let vm = this;
let organization_id = 'eb067162-8fdc-4eda-a2aa-de01f0e122e1';
vm.$_api.post("/satu_sehat/location/get_location", {
organization: organization_id,
name: x.nama_poliklinik
})
.then((res) => {
if (res.status == 200 && res.message == "sukses") {
if (res.data[0].entry.length) {
let id_satu_sehat = res.data[0].entry[0].resource.id;
vm.$_api.post("/ms_poli/update", {
id: x.ms_poli_id,
satu_sehat_id: id_satu_sehat,
})
.then((res) => {
if (res.status == 200 && res.message == "sukses") {
vm.$store.commit("set_alert", { variant: "success", msg: "" });
this.$_alert.success('Berhasil', 'BERHASIL UPDATE DATA SATU SEHAT');
vm.getDatas();
}
else {
this.$_alert.error({}, 'Gagal', res.message);
}
})
.catch((err) => {
this.$_alert.error({}, err.message);
});
} else {
vm.$_api.post("/satu_sehat/location/add_location", {
organization_id: organization_id,
ms_poli_id: x.ms_poli_id,
name_location: x.nama_poli,
})
.then((res) => {
// console.log(res);
if (res.status == 200 && res.message == "sukses") {
let id_satu_sehat = res.data[0].id;
vm.$_api.post("/ms_poli/update", {
id: x.ms_poli_id,
satu_sehat_id: id_satu_sehat,
})
.then((res) => {
if (res.status == 200 && res.message == "sukses") {
vm.$store.commit("set_alert", { variant: "success", msg: "" });
this.$_alert.success('Berhasil', 'BERHASIL UPDATE DATA SATU SEHAT');
vm.getDatas();
}
else {
this.$_alert.error({}, 'Gagal', res.message);
}
})
.catch((err) => {
this.$_alert.error({}, err.message);
});
} else {
this.$_alert.error({}, 'Gagal', res.message);
}
})
.catch((err) => {
this.$_alert.error({}, err.message);
});
}
} else {
this.$_alert.error({}, 'Gagal', res.message);
}
})
.catch((err) => {
console.log(err);
vm.$store.commit("set_alert", { variant: "danger", msg: err.message });
});
},
}
});
