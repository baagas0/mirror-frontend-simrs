<template>
  <div>
    <serviks :patograf="patograf"></serviks>
    <tabelServiks :patograf="patograf"></tabelServiks>
    <detakjantung_janin :patograf="patograf"></detakjantung_janin>
    <tabelDenyutJantung :patograf="patograf"></tabelDenyutJantung>
    <nadi_tekanan :patograf="patograf"></nadi_tekanan>
    <tabelNadi :patograf="patograf"></tabelNadi>
  </div>
</template>

<script>
import serviks from './chart_serviks edited.vue'
import detakjantung_janin from './chart_denyut_jantung_janin.vue'
import nadi_tekanan from './chart_nadi_tekanan.vue'
import tabelServiks from './tabel_serviks.vue'
import tabelDenyutJantung from './tabel_denyut_jantung.vue'
import tabelNadi from './tabel_nadi.vue'

export default {
  name: 'patograf',

  components: {
    serviks,
    detakjantung_janin,
    nadi_tekanan,
    tabelServiks,
    tabelDenyutJantung,
    tabelNadi
  },
  props: {
    patograf: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>
td {
  border: 1px solid red !important;
  padding: 5px 10px !important;
}
</style>