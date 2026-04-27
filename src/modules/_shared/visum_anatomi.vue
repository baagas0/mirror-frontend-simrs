<template>
  <div class="card card-custom mb-5">
    <div class="card-body">
      <div class="section-banner">
        <h5 class="mb-0 font-weight-bolder">Anatomi</h5>
      </div>

      <div class="row">
        <div class="col-xl-8 col-lg-12 mb-5 mb-xl-0">
          <div class="anatomy-map-wrapper">
            <div class="anatomy-map-toolbar d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <div class="font-weight-bolder text-dark">Peta Anatomi</div>
                <small class="text-muted">Klik pada ilustrasi tubuh untuk memilih titik pemeriksaan.</small>
              </div>
              <span class="badge badge-light-primary">{{ anatomiItems.length }} titik anatomi</span>
            </div>
            <div :id="mapId" class="anatomy-map"></div>
            <div class="anatomy-map-footer">
              <small class="text-muted">
                {{ hasPickedLocation ? `Titik dipilih pada koordinat ${coordinateLabel}` : "Belum ada titik yang dipilih." }}
              </small>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-12">
          <div class="form-group">
            <label class="font-weight-bold">Bagian Tubuh <span class="text-danger">*</span></label>
            <input v-model="entryForm.bagian_tubuh" type="text" class="form-control" placeholder="Contoh: Lengan kanan, paha kiri, kepala" />
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Keterangan <span class="text-danger">*</span></label>
            <textarea v-model="entryForm.keterangan" class="form-control" rows="5" placeholder="Masukkan deskripsi luka, memar, lecet, atau hasil temuan lainnya..."></textarea>
          </div>

          <div class="form-group">
            <label class="font-weight-bold">Koordinat Titik</label>
            <input :value="coordinateLabel" type="text" class="form-control" disabled placeholder="Pilih titik pada ilustrasi anatomi" />
          </div>

          <div class="d-flex flex-wrap">
            <button type="button" class="btn btn-primary mr-2 mb-2" @click="submitEntry">
              <i :class="isEditingEntry ? 'ri-save-line' : 'ri-add-line'"></i>
              {{ isEditingEntry ? "Simpan Perubahan Titik" : "Tambah Titik Anatomi" }}
            </button>
            <button type="button" class="btn btn-light-secondary mb-2" @click="resetEntryForm">
              <i class="ri-refresh-line"></i>
              Reset Titik
            </button>
          </div>
        </div>
      </div>

      <div class="table-responsive mt-6">
        <table class="table table-bordered table-hover mb-0">
          <thead class="bg-light">
            <tr>
              <th width="60">No</th>
              <th>Bagian Tubuh</th>
              <th>Keterangan</th>
              <th width="130">Koordinat</th>
              <th width="150">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="anatomiItems.length === 0">
              <td colspan="5" class="text-center text-muted py-6">Belum ada data anatomi.</td>
            </tr>
            <tr v-for="(item, index) in anatomiItems" :key="`visum-anatomi-${index}`" :class="{ 'table-warning': entryForm.index === index }">
              <td>{{ index + 1 }}</td>
              <td>{{ item.properties.bagian_tubuh || "-" }}</td>
              <td>{{ item.properties.keterangan || "-" }}</td>
              <td>{{ formatCoordinate(item) }}</td>
              <td>
                <button type="button" class="btn btn-sm btn-warning mr-1" @click="editEntry(index)">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" class="btn btn-sm btn-danger" @click="removeEntry(index)">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ANATOMI_IMAGE_BASE_URL = "https://kotapalembang.healthical.id";

const createDefaultValue = () => ({
  data_anatomi: [],
});

const createDefaultEntryForm = () => ({
  index: null,
  bagian_tubuh: "",
  keterangan: "",
  lat: null,
  lng: null,
});

export default {
  name: "VisumAnatomi",
  props: {
    value: {
      type: Object,
      default() {
        return createDefaultValue();
      },
    },
    jenisKelamin: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      map: null,
      markersLayer: null,
      selectedPreviewMarker: null,
      mapId: `visum-anatomi-map-${Math.random().toString(36).slice(2)}`,
      entryForm: createDefaultEntryForm(),
    };
  },
  computed: {
    normalizedValue() {
      return {
        data_anatomi: Array.isArray(this.value && this.value.data_anatomi) ? this.value.data_anatomi : [],
      };
    },
    anatomiItems() {
      return this.normalizedValue.data_anatomi;
    },
    hasPickedLocation() {
      return this.entryForm.lat !== null && this.entryForm.lng !== null;
    },
    coordinateLabel() {
      if (!this.hasPickedLocation) return "-";
      return `${Number(this.entryForm.lat).toFixed(0)}, ${Number(this.entryForm.lng).toFixed(0)}`;
    },
    isEditingEntry() {
      return this.entryForm.index !== null;
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.renderMarkers();
        });
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },
  methods: {
    getOverlayImage() {
      const jenisKelamin = String(this.jenisKelamin || "").toUpperCase();
      return jenisKelamin === "L" ? "anatomi.svg" : "female_anatomi.svg";
    },
    initMap() {
      if (this.map) {
        this.map.remove();
      }

      const customCRS = L.extend(L.CRS.Simple);
      this.map = L.map(this.mapId, {
        crs: customCRS,
        zoomControl: true,
      }).setView([486.00825515690394, 350.49431991577148], 0);

      this.map.options.minZoom = 0;
      this.map.options.maxZoom = 2;

      L.imageOverlay(`${ANATOMI_IMAGE_BASE_URL}/${this.getOverlayImage()}`, [
        [0, 0],
        [1000, 1000],
      ]).addTo(this.map);

      this.markersLayer = L.layerGroup().addTo(this.map);

      this.map.on("click", (event) => {
        this.setSelectedLocation(event.latlng.lat, event.latlng.lng);
      });

      this.renderMarkers();
    },
    setSelectedLocation(lat, lng) {
      this.entryForm.lat = Number(lat);
      this.entryForm.lng = Number(lng);
      this.renderMarkers();
    },
    getFeatureCoordinates(feature) {
      const geometryCoordinates = feature && feature.geometry && Array.isArray(feature.geometry.coordinates) ? feature.geometry.coordinates : [];
      const properties = feature && feature.properties ? feature.properties : {};

      const lng = geometryCoordinates.length > 0 ? Number(geometryCoordinates[0]) : Number(properties.lng);
      const lat = geometryCoordinates.length > 1 ? Number(geometryCoordinates[1]) : Number(properties.lat);

      return {
        lat: Number.isFinite(lat) ? lat : null,
        lng: Number.isFinite(lng) ? lng : null,
      };
    },
    formatCoordinate(feature) {
      const { lat, lng } = this.getFeatureCoordinates(feature);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "-";
      return `${lat.toFixed(0)}, ${lng.toFixed(0)}`;
    },
    renderMarkers() {
      if (!this.map || !this.markersLayer) return;

      this.markersLayer.clearLayers();

      this.anatomiItems.forEach((feature, index) => {
        const { lat, lng } = this.getFeatureCoordinates(feature);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        const marker = L.circle([lat, lng], {
          radius: 7,
          color: this.entryForm.index === index ? "#ff9f1c" : "#3699FF",
          fillColor: this.entryForm.index === index ? "#ff9f1c" : "#3699FF",
          fillOpacity: 0.85,
          weight: 2,
        });

        marker.bindTooltip(`<strong>${feature.properties && feature.properties.bagian_tubuh ? feature.properties.bagian_tubuh : "Bagian Tubuh"}</strong><br>${feature.properties && feature.properties.keterangan ? feature.properties.keterangan : "-"}`, { direction: "top" });

        marker.on("click", () => {
          this.editEntry(index);
        });

        this.markersLayer.addLayer(marker);
      });

      if (this.hasPickedLocation) {
        this.selectedPreviewMarker = L.circle([this.entryForm.lat, this.entryForm.lng], {
          radius: 6,
          color: "#8950FC",
          fillColor: "#8950FC",
          fillOpacity: 0.4,
          dashArray: "6,4",
          weight: 2,
        });
        this.markersLayer.addLayer(this.selectedPreviewMarker);
      }
    },
    emitValue(items) {
      this.$emit("input", {
        data_anatomi: items,
      });
    },
    submitEntry() {
      if (!this.entryForm.bagian_tubuh || !this.entryForm.keterangan || !this.hasPickedLocation) {
        this.$_alert.error({}, "Bagian tubuh, keterangan, dan titik anatomi wajib diisi");
        return;
      }

      const nextItems = [...this.anatomiItems];
      const feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [Number(this.entryForm.lng), Number(this.entryForm.lat)],
        },
        properties: {
          bagian_tubuh: this.entryForm.bagian_tubuh.trim(),
          keterangan: this.entryForm.keterangan.trim(),
          lat: Number(this.entryForm.lat),
          lng: Number(this.entryForm.lng),
        },
      };

      if (this.isEditingEntry) {
        nextItems[this.entryForm.index] = feature;
      } else {
        nextItems.push(feature);
      }

      this.emitValue(nextItems);
      this.resetEntryForm();
    },
    editEntry(index) {
      const item = this.anatomiItems[index];
      if (!item) return;

      const { lat, lng } = this.getFeatureCoordinates(item);
      this.entryForm = {
        index,
        bagian_tubuh: item.properties && item.properties.bagian_tubuh ? item.properties.bagian_tubuh : "",
        keterangan: item.properties && item.properties.keterangan ? item.properties.keterangan : "",
        lat,
        lng,
      };

      if (this.map && Number.isFinite(lat) && Number.isFinite(lng)) {
        this.map.panTo([lat, lng]);
      }

      this.renderMarkers();
    },
    removeEntry(index) {
      this.$_alert.confirm({ title: "Hapus Titik Anatomi", text: "Apakah Anda yakin ingin menghapus titik anatomi ini?" }, () => {
        const nextItems = [...this.anatomiItems];
        nextItems.splice(index, 1);
        this.emitValue(nextItems);

        if (this.entryForm.index === index) {
          this.resetEntryForm();
        } else if (this.entryForm.index !== null && this.entryForm.index > index) {
          this.entryForm.index -= 1;
        }
      });
    },
    resetEntryForm() {
      this.entryForm = createDefaultEntryForm();
      this.renderMarkers();
    },
  },
};
</script>

<style scoped>
.section-banner {
  background-color: #c4c4c4;
  padding: 0.7rem;
  margin-bottom: 1rem;
}

.anatomy-map-wrapper {
  border: 1px solid #e4e6ef;
  border-radius: 0.42rem;
  overflow: hidden;
  background: #fff;
}

.anatomy-map-toolbar {
  padding: 1rem 1rem 0.75rem;
  border-bottom: 1px solid #eef0f8;
}

.anatomy-map {
  width: 100%;
  height: 560px;
  background-color: #fff;
  cursor: crosshair;
}

.anatomy-map-footer {
  padding: 0.75rem 1rem 1rem;
  border-top: 1px solid #eef0f8;
}

@media (max-width: 991px) {
  .anatomy-map {
    height: 420px;
  }
}
</style>
