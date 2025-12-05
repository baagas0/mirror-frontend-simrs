<template>
  <div class="d-flex flex-column w-100">
    <b-card class="" hide-header>

      <b-row class="mb-2">
        <b-col cols="12">
          <h3><strong>Cari Rujukan Berdasarkan No Rujukan</strong></h3>
        </b-col>
      </b-row>

      <form @submit.prevent="sendNoRujukan" autocomplete="off" class="mb-4">
        <b-row>
          <b-col cols="3">
            <s-input groupClass="mb-0" v-model="params.noRujukan" :item="{
              label: 'No. Rujukan',
              id: 'noRujukan',
              data: 'noRujukan',
              type: 'text',
              validation: [],
            }" />
          </b-col>

          <b-col cols="12" sm="12" md="12" lg="12">
            <div class="row align-self-end mt-2">
              <b-col cols="12" sm="12" md="12" lg="12">
                <button type="submit" class="btn btn-light-primary">
                  <i class="ri-save-line"></i>
                  Cari
                </button>
              </b-col>
            </div>
          </b-col>
        </b-row>
      </form>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'vclaim-rujukan-keluar',
  props: {
    isCreatedOrUpdated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dateDefault: {
        start: moment(new Date).subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      params: {
        noRujukan: '',
      },
      busy: false,
    }
  },
  methods: {
    sendNoRujukan() {
      this.$emit('sendNoRujukan', this.params.noRujukan)
    },
    customAlert(icon = 'error') {
      this.$_alert.custom('Gagal', 'Keterangan?', icon, 0, false, false)
    },
  },
  mounted() {
    // this.getRujukanList()
  },
  watch: {
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 0.5rem !important;
}
</style>
