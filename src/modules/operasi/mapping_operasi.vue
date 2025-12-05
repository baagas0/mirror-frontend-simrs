<template>
  <div class="container-fluid ">
    <div class="card mb-1 w-100">
      <div @click="load()" class="card-header border-0 pt-5">
        <h3 class="card-title mb-0 align-items-start flex-column justify-content-center">
          <span class="card-label font-weight-bolder text-dark">Mapping Operasi</span>
        </h3>
        <div class="card-toolbar my-0 align-items-center">
          <div class="d-flex align-items-center">
            <label class="mr-3">Pilih Jadwal Operasi:</label>
            <multiselect
              v-model="selectedJadwal"
              :options="listJadwal"
              placeholder="Pilih Jadwal Operasi"
              label="label"
              track-by="jadwal_operasi_id"
              :allow-empty="false"
              @select="onJadwalSelected"
            >
            </multiselect>
          </div>
        </div>
      </div>
      <div class="card-body pt-2">
        <div class="alert alert-info" v-if="!selectedJadwal">
          <i class="ri-information-line"></i> Silakan pilih jadwal operasi terlebih dahulu sebelum melakukan mapping anatomi.
        </div>
        <div class="row">
          <div class="col-12">
            <div class="mapContainer" id="mapContainer" style="z-index: 1;"></div>
          </div>
        </div>
        <div class="row" v-if="selectedJadwal">
          <div class="col-12">
            <hr>
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5>Daftar Mapping Anatomi</h5>
                <small class="text-muted" v-if="mData.data_anatomi.length > 0">
                  <i class="ri-information-line"></i>
                  {{ mData.data_anatomi.length }} data mapping {{ selectedJadwal && selectedJadwal.data_mapping_operasi ? 'sudah ada' : 'ditambahkan' }}
                </small>
              </div>
              <div>
                <button
                  class="btn btn-secondary btn-sm mr-2"
                  @click="resetMappingData"
                  v-if="mData.data_anatomi.length > 0"
                >
                  <i class="ri-refresh-line"></i> Reset Data
                </button>
                <button
                  id="saveMappingOperasi"
                  class="btn btn-primary"
                  @click="saveMappingOperasi"
                  :disabled="mData.data_anatomi.length === 0"
                >
                  <i class="ri-save-line"></i> Simpan Mapping Operasi
                </button>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bagian Tubuh</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in mData.data_anatomi" :key="'table'+tabActive+i">
                  <td>
                    <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" >
                      <i class="ri-delete-bin-line"></i>
                    </a>
                  </td>
                  <td>{{ item.properties.bagian_tubuh || '-'  }}</td>
                  <td>{{ item.properties.keterangan || '-'  }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
  
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import moment from 'moment'
moment.locale('id')

export default {
  name: 'mapping_operasi',
  components: {
    Multiselect
  },
  props: {
  },
  data() {
    return {
      mData: {
        data_anatomi: []
      },
      fData: {},
      map: null,
      listAnatomi: [],
      geojsonAnatomi: null,
      collapse: false,
      selectedJadwal: null,
      listJadwal: [],
      tabActive: 0,
    }
  },
  watch: {
    // 'objectDataAssesmen.id': {
    //   deep: true,
    //   immediate: true,
    //   handler(to, from) {
    //     console.log('objectDataAssesmen changed')
    //     setTimeout(async() => {
    //       // console.log(this.dataRegistrasi)
    //       await this.set_map()
    //       await this.getDataAnatomi()
    //     }, 300);
    //   }
    // },
    // mData: {
    //   deep: true,
    //   immediate: false,
    //   handler(to, from) {
    //     this.handleData()
    //     // this.$emit('dataChange', true)
    //   }
    // }
  },
  mounted() {
    this.getJadwalOperasi()
  },
  methods: {
    async load() {
      if (this.selectedJadwal) {
        await this.set_map()
        // Wait a bit for map to be fully initialized before rendering data
        setTimeout(() => {
          this.getDataAnatomi()
        }, 500)
      }
    },
    async getJadwalOperasi() {
      try {
        const response = await this.$_api.post('jadwal_operasi/list')
        if (response.status) {
          this.listJadwal = response.data.map(item => ({
            id: item.jadwal_operasi_id,
            label: `${item.tanggal_operasi.split('T')[0]} - (${item.jenis_kelamin}) ${item.nama_lengkap} (${item.no_kunjungan})`,
            ...item
          }))
        }
      } catch (error) {
        console.error('Error fetching jadwal operasi:', error)
        this.$store.commit('set_alert', {
          variant: "danger",
          msg: "Gagal memuat data jadwal operasi",
          showing: true
        })
      }
    },
    onJadwalSelected(jadwal) {
      this.selectedJadwal = jadwal
      this.loadExistingMappingData()
      // Load map after data is loaded so existing mapping points will be visible
      this.$nextTick(() => {
        this.load()
      })
    },
    loadExistingMappingData() {
      // Reset data terlebih dahulu
      this.mData.data_anatomi = []

      // Load data mapping operasi yang sudah ada dari jadwal yang dipilih
      if (this.selectedJadwal && this.selectedJadwal.data_mapping_operasi) {
        try {
          const existingMapping = Array.isArray(this.selectedJadwal.data_mapping_operasi)
            ? this.selectedJadwal.data_mapping_operasi
            : []

          // Ensure each mapping item has the correct structure
          const formattedMapping = existingMapping.map(item => {
            if (typeof item === 'object' && item !== null) {
              // If item is already in the correct GeoJSON format
              if (item.type === 'Feature' && item.geometry && item.properties) {
                return item
              }
              // If item is in a different format, convert it to GeoJSON
              else if (item.lat && item.lng) {
                return {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [item.lng, item.lat]
                  },
                  "properties": {
                    bagian_tubuh: item.bagian_tubuh || '',
                    keterangan: item.keterangan || '',
                    lat: item.lat,
                    lng: item.lng
                  }
                }
              }
            }
            return null
          }).filter(Boolean) // Remove null items

          this.mData.data_anatomi = formattedMapping

          if (formattedMapping.length > 0) {
            this.$store.commit('set_alert', {
              variant: "info",
              msg: `Ditemukan ${formattedMapping.length} data mapping operasi yang sudah ada`,
              showing: true
            })
          }
        } catch (error) {
          console.error('Error loading existing mapping data:', error)
          this.$store.commit('set_alert', {
            variant: "warning",
            msg: "Gagal memuat data mapping operasi yang sudah ada",
            showing: true
          })
        }
      }
    },
    resetMappingData() {
      this.mData.data_anatomi = []
      if (this.map && this.geojsonAnatomi) {
        this.geojsonAnatomi.clearLayers()
      }

      // Clear map layers if they exist
      if (this.map && this.bunder_bunder) {
        this.bunder_bunder.clearLayers()
      }
    },
    async saveMappingOperasi() {
      if (!this.selectedJadwal) {
        this.$store.commit('set_alert', {
          variant: "warning",
          msg: "Silakan pilih jadwal operasi terlebih dahulu",
          showing: true
        })
        return
      }

      if (this.mData.data_anatomi.length === 0) {
        this.$store.commit('set_alert', {
          variant: "warning",
          msg: "Tidak ada data mapping anatomi untuk disimpan",
          showing: true
        })
        return
      }

      try {
        const payload = {
          jadwal_operasi_id: this.selectedJadwal.jadwal_operasi_id,
          mapping_operasi: this.mData.data_anatomi
        }

        const response = await this.$_api.post('hasil_operasi/update_mapping_operasi', payload)

        if (response.status) {
          this.$store.commit('set_alert', {
            variant: "success",
            msg: "Mapping operasi berhasil disimpan",
            showing: true
          })

          this.$emit('submit', {
            key: 'mapping_operasi',
            data: payload
          })
        } else {
          throw new Error(response.message || 'Gagal menyimpan mapping operasi')
        }
      } catch (error) {
        console.error('Error saving mapping operasi:', error)
        this.$store.commit('set_alert', {
          variant: "danger",
          msg: error.message || "Gagal menyimpan mapping operasi",
          showing: true
        })
      }
    },
    resetForm () {
      this.fData = {}
    },
    handleData() {
      console.log('handleData')
    },
    onDelete(index) {
      this.$_alert.confirm('Hapus data', 'apakah anda yakin ingin menghapus data?').then((status) => {
        if (status.isDismissed) return
        else {
          this.mData.data_anatomi.splice(index, 1)
        }
      });
    },
    async getDataAnatomi(){
      console.log('getDataAnatomi')
      let vm = this

      // Make sure map and geojsonAnatomi are ready
      if (!vm.map || !vm.geojsonAnatomi) {
        console.log('Map or geojsonAnatomi not ready, retrying...')
        setTimeout(() => {
          vm.getDataAnatomi()
        }, 200)
        return
      }

      let anatomi = this.mData.data_anatomi
      console.log('Processing anatomi data:', anatomi)

      if (!anatomi || anatomi.length === 0) {
        console.log('No anatomi data to display')
        return
      }

      // Clear existing layers first
      vm.geojsonAnatomi.clearLayers()
      if (vm.bunder_bunder) {
        vm.bunder_bunder.clearLayers()
      }

      vm.listAnatomi = []

      vm.geojsonAnatomi.addData(anatomi);
      console.log('Added data to geojsonAnatomi:', anatomi)

      vm.geojsonAnatomi.eachLayer(function (layer) {
        console.log('Processing layer:', layer)

        // Make sure we have valid coordinates
        if (!layer.getLatLng) {
          console.warn('Layer has no getLatLng method, skipping')
          return
        }

        let latLng = layer.getLatLng()
        if (!latLng || !latLng.lat || !latLng.lng) {
          console.warn('Layer has invalid coordinates, skipping')
          return
        }

        let newLayer = L.circle(latLng, 5)

        // Ensure properties exist
        let properties = layer.feature ? layer.feature.properties : {}

        newLayer.bindPopup(`<div id="depan"><label class="control-label col-sm-5" hidden><strong>ID: </strong></label>
          <input type="text" id="index" hidden value="${properties.index || ''}">
            <label class="control-label col-sm-5"><strong>Bagian Tubuh: </strong></label>
            <input type="text" class="bagian_tubuh" value="${properties.bagian_tubuh || ''}">

            <label class="control-label col-sm-5"><strong>Keterangan: </strong></label>
            <textarea class="keterangan" rows="6">${properties.keterangan || ''}</textarea>
        <input style="display: none;" type="text" id="lat" name="lat" value="${latLng.lat.toFixed(0)}" />
        <input style="display: none;" type="text" id="lng" name="lng" value="${latLng.lng.toFixed(0)}" />
        <div class="form-group">
          <div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn tombol_hapus btn-danger">Hapus</button></div>
          <div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="tombol_update btn btn-primary trigger-submit" onclick="()=>{console.log(this)}">Submit</button></div>
        </div></div>`);

        newLayer.on('click', function (e) {
          vm.popup_event(newLayer._leaflet_id);
        });

        // Add to both geojson and bunder_bunder layers
        vm.geojsonAnatomi.addLayer(newLayer)
        if (vm.bunder_bunder) {
          vm.bunder_bunder.addLayer(newLayer)
        }

        // Add to listAnatomi for table display
        vm.listAnatomi.push({
          bagian_tubuh: properties.bagian_tubuh || '',
          keterangan: properties.keterangan || ''
        })
      });

      console.log('Finished processing anatomi layers. Total layers:', vm.listAnatomi.length)
    },
    async set_map() {
      let vm = this;

      return new Promise((resolve, reject) => {
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

        L.imageOverlay(ip + `/${this.selectedJadwal.jenis_kelamin.toLowerCase() === 'l' ? '' : 'female_'}anatomi.svg`, [
          [0, 0],
          [1000, 1000],
        ]).addTo(vm.map);

        // Wait for map to be fully loaded
        vm.map.whenReady(() => {
          vm.bunder_bunder = L.layerGroup()

          vm.map.on('click', function (params) {
            // Cek apakah jadwal operasi sudah dipilih
            if (!vm.selectedJadwal) {
              vm.$store.commit('set_alert', {
                variant: "warning",
                msg: "Silakan pilih jadwal operasi terlebih dahulu",
                showing: true
              })
              return
            }

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
          resolve()
        })
      })
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
          
          if (!vm.selectedJadwal) {
            vm.$store.commit('set_alert', { variant: "warning", msg: "Silakan pilih jadwal operasi terlebih dahulu", showing: true })
            return
          }

          if (datanya.bagian_tubuh && datanya.keterangan) {

            // PROSES TAMBAH ANATOMI ASSESMEN
            const data = {
              bagian_tubuh: datanya.bagian_tubuh,
              keterangan: datanya.keterangan,
              lat: datanya.lat,
              lng: datanya.lng,
            }

            vm.mData.data_anatomi.push({
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [data.lng, data.lat]
              },
              "properties": data
            })

            // Close layer popup
            let closebtn = document.getElementsByClassName('leaflet-popup-close-button')
            for (var ii=0;ii<closebtn.length; ii++) {
              closebtn[ii].click();
            }

            vm.$store.commit('set_alert', { variant: "success", msg: "Anatomi berhasil ditambahkan.", showing: true })
            // this.saveMappingOperasi();
            document.getElementById('saveMappingOperasi').click();
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
            
            vm.$emit('submit', { key: 'anatomi', open_tab: 'anatomi', data: vm.mData }).then(() => {
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

<style scoped>
.pointer {
  cursor: pointer;
}

#mapContainer {
  width: 100%;
  height: 800px;
  background-color: white;
  border: 1px solid black;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-between {
  justify-content: space-between;
}

.mr-3 {
  margin-right: 1rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
