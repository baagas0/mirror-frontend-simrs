<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.anamnesa style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Anamnesa
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="anamnesa" v-model="collapse" accordion="accordion-anamnesa" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-6">
						<s-input v-model="mData.anamnesa" :item="{
							label: 'Anamnesa',
							id: 'anamnesa',
							data: 'anamnesa',
							value: mData.anamnesa,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.anamnesa" />
					</div>
					<div class="col-6">
						<s-input v-model="mData.keluhan_utama" :item="{
							label: 'Keluhan Utama',
							id: 'keluhan_utama',
							data: 'keluhan_utama',
							value: mData.keluhan_utama,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.keluhan_utama" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.riwayat_penyakit_saat_ini" :item="{
							label: 'Riwayat Penyakit Sekarang',
							id: 'riwayat_penyakit_saat_ini',
							data: 'riwayat_penyakit_saat_ini',
							value: mData.riwayat_penyakit_saat_ini,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.riwayat_penyakit_saat_ini" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.riwayat_kesehatan" :item="{
							label: 'Riwayat Kesehatan',
							id: 'riwayat_kesehatan',
							data: 'riwayat_kesehatan',
							value: mData.riwayat_kesehatan,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.riwayat_kesehatan" />
					</div>
					<div class="col-12">
						<s-input v-model="mData.riwayat_perjalanan_penyakit" :item="{
							label: 'Riwayat Perjalanan Penyakit',
							id: 'riwayat_perjalanan_penyakit',
							data: 'riwayat_perjalanan_penyakit',
							value: mData.riwayat_perjalanan_penyakit,
							type: 'textarea',
							validation: [],
							rows: 4,
						}" :disabled="objectDataAssesmen.validasi_dokter ? objectDataAssesmen.validasi_dokter : (objectDataAssesmen.validasi_casemix ? objectDataAssesmen.validasi_casemix : false)" :valuee="mData.riwayat_perjalanan_penyakit" />
					</div>
					<div class="col-12 mb-3">
						<p class="font-weight-bolder">Anatomi Tubuh</p>
						<div class="mapContainer" id="mapContainer" style="z-index: 1;"></div>
					</div>
					<div class="col-12">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Bagian Tubuh</th>
									<th>Keterangan</th>
								</tr>
							</thead>
							<tbody v-if="listAnatomi.length">
								<tr v-for="(item, i) in listAnatomi" :key="'table-anatomi'+i">
									<td>              
										<a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" >
											<i class="ri-delete-bin-line"></i>
										</a>
									</td>
									<td>{{ item && item.properties ? item.properties.bagian_tubuh : '-' }}</td>
									<td>{{ item && item.properties ? item.properties.keterangan : '-' }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
	
<script>
	import moment from 'moment'
	import L from "leaflet";
	import "leaflet/dist/leaflet.css";
	
	moment.locale('id')

	export default {
		name: 'anamnesa',
		props: {
			dataRegistrasi: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
			objectDataAssesmen: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
			mData: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			}
		},
		data () {
			return {
				// mData: {}
				collapse: true,
				map: null,
				listAnatomi: [],
				geojsonAnatomi: null
			}
		},
		watch: {
			'objectDataAssesmen.resume_medis_ranap_id': {
				deep: true,
				immediate: true,
				handler(to, from) {
					console.log('objectDataAssesmen changed')
					setTimeout(async () => {
						await this.set_map()
						await this.getDataAnatomi()
					}, 500);
				}
			},
			mData: {
				deep: true,
				immediate: false,
				handler (to, from) {
					// this.$emit('dataChange', true)
					console.log('mData cok', to)
				}
			}
		},
		 async mounted () {
			// await this.set_map()
			// await this.getDataAnatomi()
		},
		methods: {
			onSubmit () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			},
			onDelete (index) {
				this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
					if (status.isDismissed) return
					else {
						this.mData.data_anatomi.splice(index, 1)
						this.$emit('submit', { key: 'anamnesa', open_tab: 'anamnesa', data: this.mData })
					}
				});
			},
			async getDataAnatomi(){
				console.log('getDataAnatomi')
				let vm = this
				console.log(this.geojsonAnatomi)
				// let anatomi = await vm.$axios.post("/anatomi_tubuh/list", {
				//   anamnesa_id : vm.dataForm.anamnesa_id
				// });

				let anatomi = this.mData.data_anatomi
				if(anatomi === undefined) anatomi = []
				
				vm.listAnatomi = []
				for (let i = 0; i < anatomi.length; i++) {
					let x = anatomi[i];
					x.properties.index = i
					let penampung = {}
					penampung.bagian_tubuh = x.properties.bagian_tubuh
					penampung.keterangan = x.properties.keterangan
					vm.listAnatomi.push(x)
				}
				vm.geojsonAnatomi.clearLayers()
		
				vm.geojsonAnatomi.addData(anatomi);
				console.log('anatomiiiiiii', anatomi)
			
				vm.geojsonAnatomi.eachLayer(function (layer) {
					console.log('layer', layer)
					vm.map.removeLayer(layer);
			
					let newLayer = L.circle(layer.getLatLng(), 5)
					
					newLayer.bindPopup(`<div id="depan"><label class="control-label col-sm-5" hidden><strong>ID: </strong></label>
						<input type="text" id="index" hidden value="${layer.feature.properties.index}">
							<label class="control-label col-sm-5"><strong>Bagian Tubuh: </strong></label>
							<input type="text" class="bagian_tubuh" value="${layer.feature.properties.bagian_tubuh}">
					
							<label class="control-label col-sm-5"><strong>Keterangan: </strong></label>
							<textarea class="keterangan" rows="6">${layer.feature.properties.keterangan}</textarea>
					<input style="display: none;" type="text" id="lat" name="lat" value="${layer.getLatLng().lat.toFixed(0)}" />
					<input style="display: none;" type="text" id="lng" name="lng" value="${layer.getLatLng().lng.toFixed(0)}" />
					<div class="form-group">
						<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn tombol_hapus btn-danger">Hapus</button></div>
						<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="tombol_update btn btn-primary trigger-submit" onclick="()=>{console.log(this)}">Submit</button></div>
					</div></div>'`);
					newLayer.on('click', function (e) {
						e
						vm.popup_event(newLayer._leaflet_id);
					});
					console.log('addLayer')
					vm.geojsonAnatomi.addLayer(newLayer)
					
				});
			},
			async set_map() {
				console.log('set_map calleddddddddddddddddddddddddddddddd')
				let vm = this;

				new Promise((resolve, reject) => {
					let ip = 'https://kotapalembang.healthical.id'
					if (vm.map) {
						vm.map.remove();
					}
		
					var customCRS = L.extend(L.CRS.Simple);
					vm.map = L.map("mapContainer", {
						crs: customCRS,
					}).setView([486.00825515690394, 350.49431991577148], 0);
		
					vm.map.options.minZoom = 0;
					vm.map.options.maxZoom = 2;
					
					if (vm.dataRegistrasi.jenis_kelamin == "P") {
						L.imageOverlay(ip + '/female_anatomi.svg', [
							[0, 0],
							[1000, 1000],
						]).addTo(vm.map);
					} else if (vm.dataRegistrasi.jenis_kelamin == "L") {
						L.imageOverlay(ip + '/anatomi.svg', [
							[0, 0],
							[1000, 1000],
						]).addTo(vm.map);
					}
		
					vm.bunder_bunder = L.layerGroup()
					vm.map.on('click', function (params) {
						// console.log(params);
						let popupContent =
							'<div id="depan">' +
		
		
							'<label class="control-label col-sm-5"><strong>Bagian Tubuh: </strong></label>' +
							'<input type="text" class="bagian_tubuh">' +
		
							'<label class="control-label col-sm-5"><strong>Keterangan: </strong></label>' +
							'<textarea class="keterangan" rows="6"></textarea>' +
		
							'<input style="display: none;" type="text" id="lat" name="lat" value="' + params.latlng.lat.toFixed(0) + '" />' +
							'<input style="display: none;" type="text" id="lng" name="lng" value="' + params.latlng.lng.toFixed(0) + '" />' +
							'<div class="form-group">' +
							'<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn tombol_batal">Batal</button></div>' +
							'<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="tombol btn btn-primary trigger-submit" onclick="()=>{console.log(this)}">Submit</button></div>' +
							'</div></div>';
						vm.bunder = L.circle(params.latlng, 5).addTo(vm.map).bindPopup(popupContent);
		
						vm.bunder_bunder.addLayer(vm.bunder);
						vm.bunder.openPopup();
		
						vm.popup_event(vm.bunder._leaflet_id);
		
						vm.bunder.on('click', function () {
		
							vm.popup_event(this._leaflet_id);
						})
					})
		
					vm.geojsonAnatomi = L.geoJSON().addTo(vm.map);
					console.log('set_map end init')
					resolve()
				})
				//  this.getDataAnatomi()
			},
			popup_event(leaflet_id) {
				let vm = this;
				let tombol = document.getElementsByClassName('tombol');

				for (var j = 0; j < tombol.length; j++) {

					tombol[j].addEventListener('click', function (e) {
						console.log('tombol popup event', e.target)
						e.target.disabled = true
						
						let form = this.parentNode.parentNode.parentNode;
						let datanya = {}
						for (var i = 0; i < form.childNodes.length; i++) {

							if (form.childNodes[i].className == "bagian_tubuh") {
								console.log(form.childNodes[i].value);
								datanya.bagian_tubuh = form.childNodes[i].value
							}

							if (form.childNodes[i].className == "keterangan") {
								console.log(form.childNodes[i].value);
								datanya.keterangan = form.childNodes[i].value
							}

							if (form.childNodes[i].id == "lat") {
								console.log(form.childNodes[i].value);
								datanya.lat = form.childNodes[i].value
							}

							if (form.childNodes[i].id == "lng") {
								console.log(form.childNodes[i].value);
								datanya.lng = form.childNodes[i].value
							}

						}
						
						if (datanya.bagian_tubuh && datanya.keterangan) {

							// PROSES TAMBAH ANATOMI ASSESMEN
							let data = {
								bagian_tubuh: datanya.bagian_tubuh,
								keterangan: datanya.keterangan,
								lat: datanya.lat,
								lng: datanya.lng,
							}

							if(!vm.mData.data_anatomi || vm.mData.data_anatomi === undefined) vm.mData.data_anatomi = []
							
							vm.listAnatomi.push({
								"type": "Feature",
								"geometry": {
									"type": "Point",
									"coordinates": [data.lng, data.lat]
								},
								"properties": data
							})
							vm.mData.anamnesa = '123123123'
							vm.mData.data_anatomi = vm.listAnatomi
							console.log(vm.mData)
							// tombol[j].props('disabled', true)

							// Close layer popup
							let closebtn = document.getElementsByClassName('leaflet-popup-close-button')
							for (var ii=0;ii<closebtn.length; ii++) {
								closebtn[ii].click();
							}

							vm.$store.commit('set_alert', { variant: "warning", msg: "Anatomi berhasil ditambahkan.", showing: true })
							// vm.$emit('submit', { key: 'anamnesa', open_tab: 'anamnesa', data: vm.mData })
							// vm.$parent.updateAssesmen()
							
						} else {
							vm.$store.commit('set_alert', { variant: "warning", msg: "GAGAL, DATA TIDAK LENGKAP", showing: true })
						}
					});
				}

				var tombol_batal = document.getElementsByClassName('tombol_batal');
				for (let i = 0; i < tombol_batal.length; i++) {

					tombol_batal[i].addEventListener('click', function () {

						vm.bunder_bunder.eachLayer(function (layer) {

							if (leaflet_id == layer._leaflet_id) {
								vm.bunder_bunder.removeLayer(layer);
								vm.map.removeLayer(layer)
							}
						})

					});
				}


				let tombol_update = document.getElementsByClassName('tombol_update');

				for (var i = 0; i < tombol_update.length; i++) {

					tombol_update[i].addEventListener('click', function (e) {
						console.log('tombol popup event', e.target)
						e.target.disabled = true

						let form = this.parentNode.parentNode.parentNode;
						let datanya = {}
						for (var i = 0; i < form.childNodes.length; i++) {
							console.log('form.childNodes[i].id', form.childNodes[i].id)
							if (form.childNodes[i].className == "bagian_tubuh") {
								console.log(form.childNodes[i].value);
								datanya.bagian_tubuh = form.childNodes[i].value
							}

							if (form.childNodes[i].className == "keterangan") {
								console.log(form.childNodes[i].value);
								datanya.keterangan = form.childNodes[i].value
							}

							if (form.childNodes[i].id == "lat") {
								console.log(form.childNodes[i].value);
								datanya.lat = form.childNodes[i].value
							}

							if (form.childNodes[i].id == "lng") {
								console.log(form.childNodes[i].value);
								datanya.lng = form.childNodes[i].value
							}
							if (form.childNodes[i].id == "index") {
								console.log(form.childNodes[i].value);
								datanya.index = form.childNodes[i].value
							}
						}
						console.log(datanya, 'ini ini ini ini');
						if (datanya.index && datanya.bagian_tubuh && datanya.keterangan) {
							// PROSES TAMBAH ANATOMI ASSESMEN
							const data = {
								bagian_tubuh: datanya.bagian_tubuh,
								keterangan: datanya.keterangan,
								lat: datanya.lat,
								lng: datanya.lng,
							}

							vm.mData.data_anatomi[datanya.index] = {
								"type": "Feature",
								"geometry": {
									"type": "Point",
									"coordinates": [data.lng, data.lat]
								},
								"properties": data
							}
							
							vm.$emit('submit', { key: 'anamnesa', open_tab: 'anamnesa', data: vm.mData }).then(() => {
								vm.close_popup()
								vm.getDataAnatomi();
							})

						} else {
							vm.$store.commit('set_alert', { variant: "warning", msg: "GAGAL, DATA TIDAK LENGKAP", showing: true })
						}
					});
				}

				var tombol_hapus = document.getElementsByClassName('tombol_hapus');
				for (let j = 0; j < tombol_hapus.length; j++) {

					tombol_hapus[j].addEventListener('click', function () {

						vm.bunder_bunder.eachLayer(function (layer) {

							if (leaflet_id == layer._leaflet_id) {
								vm.bunder_bunder.removeLayer(layer);
								vm.map.removeLayer(layer)
							}
						})


						vm.map.eachLayer(function (layer) {
							if (leaflet_id == layer._leaflet_id) {
								vm.map.removeLayer(layer)
							}
						});

						let form = this.parentNode.parentNode.parentNode;
						let index = "";
						for (var i = 0; i < form.childNodes.length; i++) {
							if (form.childNodes[i].id == "index") {
								console.log(form.childNodes[i].value);
								index = form.childNodes[i].value
							}
						}
						
						vm.onDelete(index);
						vm.close_popup()
					});


				}
			},
		}
	}
</script>
<style>
#mapContainer {
  width: 100%;
  height: 800px;
  background-color: white;
  border: 1px solid black;
}
</style>