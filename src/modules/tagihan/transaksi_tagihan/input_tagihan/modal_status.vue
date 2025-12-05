<template>
  <div>
    <b-modal id="modal-status" size="md" centered title="Perhatian .... !!!" header-bg-variant="success"
      header-text-variant="light" hide-footer>
      <div class="">
        <b-button class="my-2 mx-1 px-3 w-100" variant="success" @click="updateStatus(1)"
          :disabled="busy || isDraft == 1">
          Open
        </b-button>
        <b-button class="my-2 mx-1 px-3 w-100" variant="warning" @click="updateStatus(2)"
          :disabled="busy || isDraft == 2">
          Lock
        </b-button>
        <b-button class="my-2 mx-1 px-3 w-100" variant="danger"
          @click="$bvModal.hide('modal-status'), $bvModal.show('modal-close-tagihan')" :disabled="busy || isDraft == 3">
          Close
        </b-button>
      </div>
      <!-- <div class="">
        <b-button class="my-2 mx-1 px-3 w-100" variant="success" @click="updateStatus(1)">
          Open
        </b-button>
        <b-button class="my-2 mx-1 px-3 w-100" variant="warning" @click="updateStatus(2)">
          Lock
        </b-button>
        <b-button class="my-2 mx-1 px-3 w-100" variant="danger" @click="updateStatus(3)">
          Close
        </b-button>
      </div> -->
      <template #modal-footer>
      </template>
    </b-modal>
    <b-modal id="modal-close-tagihan" size="md" centered title="Perhatian .... !!!" header-bg-variant="danger"
      header-text-variant="light">
      <p>Apakah anda yakin ingin Menutup tagihan</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-close-tagihan')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="updateStatus(3)">
          Ya
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'modal_status',
  emits: ['changeVar'],
  props: ['dataHeader', 'dataTagihan', 'isDraft'],
  data() {
    return {
      busy: false,
      allow_status: {
        open: true,
        lock: true,
        close: true
      },
      draft_status: {
        open: 1,
        lock: 2,
        close: 3
      }
    }
  },
  methods: {
    alertFromChild(value) {
      this.$emit('alertFromChild', value)
    },
    async updateStatus(status_tagihan) {
      let vm = this
      vm.busy = true
      // console.log({
      //   id: vm.dataHeader.tagihan_id,
      //   status_tagihan,
      //   total_tagihan: vm.dataTagihan.total_tagihan,
      //   selisih_lebih_ditanggung_tagihan: vm.dataTagihan.selisih_tagihan > 0 ? vm.dataTagihan.total_tagihan : null,
      //   selisih_kurang_ditanggung_tagihan: vm.dataTagihan.selisih_tagihan < 0 ? vm.dataTagihan.total_tagihan : null,
      // })
      // total_tagihan, total_bayar_tagihan, selisih_lebih_ditanggung_tagihan, selisih_kurang_ditanggung_tagihan


      this.$_api.post('tagihan/closeTagihan', {
        id: vm.dataHeader.tagihan_id,
        status_tagihan,
        total_tagihan: vm.dataTagihan.total_tagihan,
        selisih_lebih_ditanggung_tagihan: vm.dataTagihan.selisih_tagihan > 0 ? vm.dataTagihan.total_tagihan : null,
        selisih_kurang_ditanggung_tagihan: vm.dataTagihan.selisih_tagihan < 0 ? vm.dataTagihan.total_tagihan : null
      }).then((status) => {
        if (status.status === 200) {
          vm.dataHeader.status_tagihan = status_tagihan
          vm.$_alert.success('Berhasil mengubah status tagihan')
          vm.$bvModal.hide('modal-status')
          vm.$bvModal.hide('modal-close-tagihan')
        } else {
          vm.$_alert.error({}, `Gagal mengubah status tagihan`, status.message)
          vm.$bvModal.hide('modal-status')
          vm.$bvModal.hide('modal-close-tagihan')
        }
        vm.busy = false
      })
    }
  },
}
</script>
