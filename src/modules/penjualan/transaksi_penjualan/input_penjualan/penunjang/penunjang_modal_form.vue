<template>
  <b-modal
    id="modal-form-penunjang-jual"
    size="md"
    centered
    title="Jual Penunjang"
    :header-bg-variant="dataForm.status_edit ? 'warning' : 'success'"
    header-text-variant="light"
  >
  <!-- <pre>{{dataForm}}</pre> -->
    <b-form>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Penunjang <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_penunjang"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jenis <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_jenis_penunjang"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_harga_penjualan_penunjang"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga Custom <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.harga_custom_penjualan_penunjang"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_harga_custom_penjualan_penunjang}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jumlah <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.qty_penjualan_penunjang"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_qty_penjualan_penunjang}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Keterangan
        </template>
        <b-form-input
          type="text"
          v-model="dataForm.keterangan_penjualan_penunjang"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide('modal-form-penunjang-jual')">
        Tidak
      </b-button>
      <div v-if="isDraft == 1">
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_penjualan_penunjang == null">
          Update
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_penjualan_penunjang == null">
          Register
        </b-button>
      </div>
      <div v-else>
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_penjualan_penunjang == null">
          Ubah
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_penjualan_penunjang == null">
          Tambah
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
  
<script>  
  export default {
    components: {
      // Multiselect,
      // DatePicker,
    },
    name: "master_etnis",
    emits: [ 'resetData', 'changeVar' ],
    props: [ 'dataHeader', 'dataPerhitungan', 'dataForm', 'listJual', 'list', 'isDraft' ],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        busy: false,
      };
    },
    watch: {
      'dataForm.harga_custom_penjualan_penunjang'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_harga_custom_penjualan_penunjang = this.toNumeric(newVar, 'idr')
        }
      },
      'dataForm.qty_penjualan_penunjang'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_qty_penjualan_penunjang = this.toNumeric(newVar)
        }
      },
    },
    computed: {
    },
    mounted() {
      // this.getDatas();
    },
    methods: {
      async hitungPerhitungan(newVar, oldVar){
        const vm = this
        const dataPerhitungan = JSON.parse(JSON.stringify(vm.dataPerhitungan))
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_penjualan_penunjang, 0)
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_penjualan_penunjang, 0)
        const x = {}
        x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew
        x.harga_total_penunjang = totalNew
        x.discount = dataPerhitungan.discount
        x.tax = (x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen / 100
        x.total_penjualan = x.jumlah - x.discount + x.tax
        return x
      },
      async refreshListJual(){
        const vm = this
        const listJualPenunjang = await this.$_api.post("penjualan_penunjang/listPenjualanPenunjangByPenjualanId", {penjualan_id: vm.dataHeader.penjualan_id});
        //list jual penunjang
        const listJual = listJualPenunjang.status == 200 ? await listJualPenunjang.data.map(x => {return {
          ...x, 
          total_harga_penjualan_penunjang: x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang,
          nama_qty_penjualan_penunjang: vm.toNumeric(x.qty_penjualan_penunjang),
          nama_harga_penjualan_penunjang: vm.toNumeric(x.harga_penjualan_penunjang, 'idr'),
          nama_harga_custom_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang, 'idr'),
          nama_total_harga_penjualan_penunjang: vm.toNumeric(x.harga_custom_penjualan_penunjang * x.qty_penjualan_penunjang, 'idr'),
        }}) : []
        vm.$emit('changeVar', { to: 'listJualPenunjang', data: listJual })
      },
      async registerJual(){
        const vm = this
        vm.busy = true
        vm.$bvModal.hide('modal-form-penunjang-jual')
        const dataForm = JSON.parse(JSON.stringify(vm.dataForm))
        //list jual
        const listJual = JSON.parse(JSON.stringify(vm.listJual))
        const indexPenunjang = listJual.findIndex(jual => jual.penunjang_id == dataForm.penunjang_id)
        if(indexPenunjang >= 0){
          //jika penunjang sudah ada di list jual
          vm.$store.commit("set_alert", { variant: "warning", msg: "Sudah Terdapat Pada Daftar Penunjang Yang Dijual", showing: true });
        }else{
          //jual
          dataForm.total_harga_penjualan_penunjang = dataForm.qty_penjualan_penunjang * dataForm.harga_custom_penjualan_penunjang
          dataForm.nama_qty_penjualan_penunjang = vm.toNumeric(dataForm.harga_penjualan_penunjang)
          dataForm.nama_harga_custom_penjualan_penunjang = vm.toNumeric(dataForm.harga_custom_penjualan_penunjang, 'idr')
          dataForm.nama_total_harga_penjualan_penunjang = vm.toNumeric(dataForm.total_harga_penjualan_penunjang, 'idr')
          const listJualNew = listJual.concat({...dataForm, no: listJual.length+1, create: true})
          const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, listJual) //jika mengguakan watch, data bisa ketinggalan
          //jika draft / penjualan sudah dibuat
          if(vm.isDraft == 1){
            const register = await this.$_api.post("penjualan_penunjang/register", {...dataForm, ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id});
            if(register.status == 200){
              this.refreshListJual()
              vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Register Penunjang Penjualan", showing: true });
            }else{
              vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Register Penunjang Penjualan", showing: true });
            }
          }else{
            vm.$emit('changeVar', { to: 'listJualPenunjang', data: listJualNew })
          }
        }
        vm.$bvModal.hide('modal-form-penunjang-jual')
        vm.busy = false
      },
      async updateJual(){
        const vm = this
        const listJual = JSON.parse(JSON.stringify(vm.listJual))
        const listJualOld = JSON.parse(JSON.stringify(vm.listJual))
        //list jual
        listJual[vm.dataForm.index_jual].keterangan_penjualan_penunjang = vm.dataForm.keterangan_penjualan_penunjang
        listJual[vm.dataForm.index_jual].harga_custom_penjualan_penunjang = vm.dataForm.harga_custom_penjualan_penunjang
        listJual[vm.dataForm.index_jual].qty_penjualan_penunjang = vm.dataForm.qty_penjualan_penunjang
        listJual[vm.dataForm.index_jual].total_harga_penjualan_penunjang = vm.dataForm.qty_penjualan_penunjang * vm.dataForm.harga_custom_penjualan_penunjang
        listJual[vm.dataForm.index_jual].nama_qty_penjualan_penunjang = vm.toNumeric(vm.dataForm.qty_penjualan_penunjang)
        listJual[vm.dataForm.index_jual].nama_harga_custom_penjualan_penunjang = vm.toNumeric(vm.dataForm.harga_custom_penjualan_penunjang, 'idr')
        listJual[vm.dataForm.index_jual].nama_total_harga_penjualan_penunjang = vm.toNumeric(listJual[vm.dataForm.index_jual].total_harga_penjualan_penunjang, 'idr')
        const dataPerhitungan = await vm.hitungPerhitungan(listJual, listJualOld) //jika mengguakan watch, data bisa ketinggalan
        //jika draft / penjualan sudah dibuat
        if(vm.isDraft == 1){
          const update = await this.$_api.post("penjualan_penunjang/update", {...listJual[vm.dataForm.index_jual], ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: vm.dataForm.penjualan_penunjang_id});
          if(update.status == 200){
            this.refreshListJual()
            vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Update Penunjang Penjualan", showing: true });
          }else{
            vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Update Penunjang Penjualan", showing: true });
          }
        }else{
          vm.$emit('changeVar', { to: 'listJualPenunjang', data: listJual })
        }
        vm.$bvModal.hide('modal-form-penunjang-jual')
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
      toNumeric(number, type){
        let data = {}
        if(type == 'no-idr') {
          return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(number).slice(3)
        }else{
          if(type == 'idr') data = {style: 'currency', currency: 'IDR'}
          return new Intl.NumberFormat('id-ID', data).format(number)
        }
      },
    },
  };
</script>
  