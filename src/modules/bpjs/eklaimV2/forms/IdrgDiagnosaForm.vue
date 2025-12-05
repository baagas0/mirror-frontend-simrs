<template>
  <div>
    <b-card>
      <b-card-body>
        <h5 class="card-title">Set Diagnosa IDRG</h5>
        <form @submit.prevent="handleSubmit">
          <b-row>
            <b-col cols="12">
              <label>Diagnosa (ICD-10) - IDRG</label>
              <small class="text-danger d-flex align-items-end">* ketikkan kode</small>
              <multiselect
                v-model="selectedDiagnosa"
                @search-change="searchDiagnosa"
                :options="listDiagnosa"
                :multiple="true"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_diagnosa"
                track-by="kode"
                placeholder="-- Pilih Diagnosa --"
                size="sm"
              ></multiselect>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col cols="12">
              <div class="d-flex justify-content-between">
                <b-button variant="secondary" @click="$emit('cancel')">
                  <i class="ri-close-line"></i> Batal
                </b-button>
                <b-button type="submit" variant="primary" :disabled="busy || !selectedDiagnosa.length">
                  <i class="ri-check-line"></i>
                  {{ busy ? 'Memproses...' : 'Set Diagnosa IDRG' }}
                </b-button>
              </div>
            </b-col>
          </b-row>
        </form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    nomor_sep: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      busy: false,
      selectedDiagnosa: [],
      listDiagnosa: []
    }
  },
  methods: {
    async searchDiagnosa(keyword) {
      if (!keyword || keyword.length < 2) return

      try {
        const res = await this.$_api.post('inacbg/search_diagnosis', {
          keyword
        })

        if (res.status == 200) {
          this.listDiagnosa = res.data.map(item => ({
            nama_diagnosa: `${item[1]} - ${item[0]}`,
            nama: item[0],
            kode: item[1]
          }))
        }
      } catch (error) {
        console.error('Error searching diagnosis:', error)
      }
    },
    async handleSubmit() {
      this.busy = true
      try {
        const diagnosaCodes = this.selectedDiagnosa.map(item => item.kode).join('#')

        const submitData = {
          diagnosa: diagnosaCodes
        }

        await this.$emit('submit', submitData)
      } catch (error) {
        console.error('Submit error:', error)
      } finally {
        this.busy = false
      }
    }
  }
}
</script>