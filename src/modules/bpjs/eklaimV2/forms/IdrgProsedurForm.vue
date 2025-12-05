<template>
  <div>
    <b-card>
      <b-card-body>
        <h5 class="card-title">Set Prosedur IDRG</h5>
        <form @submit.prevent="handleSubmit">
          <b-row>
            <b-col cols="12">
              <label>Prosedur (ICD-9-CM) - IDRG</label>
              <small class="text-danger d-flex align-items-end">* ketikkan kode</small>
              <multiselect
                v-model="selectedProsedur"
                @search-change="searchProsedur"
                :options="listProsedur"
                :multiple="true"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_prosedur"
                track-by="kode"
                placeholder="-- Pilih Prosedur --"
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
                <b-button type="submit" variant="primary" :disabled="busy || !selectedProsedur.length">
                  <i class="ri-check-line"></i>
                  {{ busy ? 'Memproses...' : 'Set Prosedur IDRG' }}
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
      selectedProsedur: [],
      listProsedur: []
    }
  },
  methods: {
    async searchProsedur(keyword) {
      if (!keyword || keyword.length < 2) return

      try {
        const res = await this.$_api.post('inacbg/search_procedures', {
          keyword
        })

        if (res.status == 200) {
          this.listProsedur = res.data.map(item => ({
            nama_prosedur: `${item[1]} - ${item[0]}`,
            nama: item[0],
            kode: item[1]
          }))
        }
      } catch (error) {
        console.error('Error searching procedures:', error)
      }
    },
    async handleSubmit() {
      this.busy = true
      try {
        const prosedurCodes = this.selectedProsedur.map(item => item.kode).join('#')

        const submitData = {
          procedure: prosedurCodes
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