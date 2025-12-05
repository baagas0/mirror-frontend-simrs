<template>
  <div>
    <b-card>
      <b-card-body>
        <h5 class="card-title">Set Special CMG (Stage 2)</h5>
        <form @submit.prevent="handleSubmit">
          <b-row>
            <b-col cols="12">
              <label>Special CMG</label>
              <small class="text-danger d-flex align-items-end">* pilih special procedure</small>
              <multiselect
                v-model="selectedSpecialCmg"
                :options="listSpecialCmg"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="name"
                track-by="code"
                placeholder="-- Pilih Special CMG --"
                size="sm"
              ></multiselect>
            </b-col>
            <b-col cols="12" class="mt-3" v-if="selectedSpecialCmg">
              <b-alert show variant="info">
                <h6>Detail Special CMG:</h6>
                <p><strong>Kode:</strong> {{ selectedSpecialCmg.code }}</p>
                <p><strong>Deskripsi:</strong> {{ selectedSpecialCmg.description }}</p>
                <p><strong>Tipe:</strong> {{ selectedSpecialCmg.type }}</p>
              </b-alert>
            </b-col>
            <b-col cols="12" class="mt-3">
              <b-alert show variant="warning">
                <i class="ri-information-line"></i>
                Form ini opsional. Jika tidak ada special procedure, bisa dilewati dengan tombol "Lewati".
              </b-alert>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col cols="12">
              <div class="d-flex justify-content-between">
                <div>
                  <b-button variant="warning" @click="skipStage" :disabled="busy">
                    <i class="ri-skip-forward-line"></i> Lewati
                  </b-button>
                  <b-button variant="secondary" @click="$emit('cancel')" class="ml-2">
                    <i class="ri-close-line"></i> Batal
                  </b-button>
                </div>
                <b-button type="submit" variant="primary" :disabled="busy || !selectedSpecialCmg">
                  <i class="ri-check-line"></i>
                  {{ busy ? 'Memproses...' : 'Set Special CMG' }}
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
    },
    grouperData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      busy: false,
      selectedSpecialCmg: null,
      listSpecialCmg: []
    }
  },
  watch: {
    grouperData: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.special_cmg) {
          this.listSpecialCmg = newVal.special_cmg.map(item => ({
            ...item,
            name: `${item.code} - ${item.description}`
          }))
        }
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.busy = true
      try {
        const submitData = {
          special_cmg: this.selectedSpecialCmg.code
        }

        await this.$emit('submit', submitData)
      } catch (error) {
        console.error('Submit error:', error)
      } finally {
        this.busy = false
      }
    },
    skipStage() {
      this.$emit('cancel')
    }
  }
}
</script>