<template>
  <b-modal
    id="modal-form-fasilitas-jual"
    size="md"
    centered
    title="Jual Fasilitas"
    :header-bg-variant="dataForm.status_edit ? 'warning' : 'success'"
    header-text-variant="light"
  >
    <b-form>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Fasilitas <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_fasilitas"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jenis <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_jenis_fasilitas"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_harga_fasilitas"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga Custom <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.harga_fasilitas_custom"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_harga_fasilitas_custom}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jumlah <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.qty_fasilitas"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_qty_fasilitas}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Keterangan
        </template>
        <b-form-input
          type="text"
          v-model="dataForm.keterangan_penjualan_fasilitas"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide('modal-form-fasilitas-jual')">
        Tidak
      </b-button>
      <div v-if="isDraft == 1">
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_fasilitas == null">
          Update
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_fasilitas == null">
          Register
        </b-button>
      </div>
      <div v-else>
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_fasilitas == null">
          Ubah
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_fasilitas == null">
          Tambah
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
  
<script>
  import axios from "axios";
  // import { ipBackend } from "@/ipBackend";
  // // import Multiselect from "vue-multiselect";
  // import DatePicker from "vue2-datepicker";
  import "vue2-datepicker/index.css";
  
  export default {
    components: {
      // // Multiselect,
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
      'dataForm.harga_fasilitas_custom'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_harga_fasilitas_custom = this.toNumeric(newVar, 'idr')
        }
      },
      'dataForm.qty_fasilitas'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_qty_fasilitas = this.toNumeric(newVar)
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
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_fasilitas, 0)
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_fasilitas, 0)
        const x = {}
        x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew
        x.harga_total_fasilitas = totalNew
        x.discount = dataPerhitungan.discount
        x.tax = (x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen / 100
        x.total_penjualan = x.jumlah - x.discount + x.tax
        return x
      },
      async refreshListJual(){
        const vm = this
        const listJualFasilitas = await this.$_api.post("penjualanFasilitas/listPenjualanFasilitasByPenjualanId", {penjualan_id: vm.dataHeader.penjualan_id});
        //list jual fasilitas
        const listJual = listJualFasilitas.status == 200 ? await listJualFasilitas.data.map(x => {return {
          ...x, 
          total_harga_fasilitas: x.harga_fasilitas_custom * x.qty_fasilitas,
          nama_qty_fasilitas: vm.toNumeric(x.qty_fasilitas),
          nama_harga_fasilitas: vm.toNumeric(x.harga_fasilitas, 'idr'),
          nama_harga_fasilitas_custom: vm.toNumeric(x.harga_fasilitas_custom, 'idr'),
          nama_total_harga_fasilitas: vm.toNumeric(x.harga_fasilitas_custom * x.qty_fasilitas, 'idr'),
        }}) : []
        vm.$emit('changeVar', {to: 'listJualFasilitas', data: listJual })
      },
      async registerJual(){
        const vm = this
        vm.busy = true
        vm.$bvModal.hide('modal-form-fasilitas-jual')
        const dataForm = JSON.parse(JSON.stringify(vm.dataForm))
        //list jual
        const listJual = JSON.parse(JSON.stringify(vm.listJual))
        const indexFasilitas = listJual.findIndex(jual => jual.ms_fasilitas_id == dataForm.ms_fasilitas_id)
        if(indexFasilitas >= 0){
          //jika fasilitas sudah ada di list jual
          vm.$store.commit("set_alert", { variant: "warning", msg: "Sudah Terdapat Pada Daftar Fasilitas Yang Dijual", showing: true });
        }else{
          //jual
          dataForm.total_harga_fasilitas = dataForm.qty_fasilitas * dataForm.harga_fasilitas_custom
          dataForm.nama_qty_fasilitas = vm.toNumeric(dataForm.qty_fasilitas)
          dataForm.nama_harga_fasilitas_custom = vm.toNumeric(dataForm.harga_fasilitas_custom, 'idr')
          dataForm.nama_total_harga_fasilitas = vm.toNumeric(dataForm.total_harga_fasilitas, 'idr')
          const listJualNew = listJual.concat({...dataForm, no: listJual.length+1, create: true})
          const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, listJual) //jika mengguakan watch, data bisa ketinggalan
          //jika draft / penjualan sudah dibuat
          if(vm.isDraft == 1){
            const register = await this.$_api.post("penjualanFasilitas/register", {...dataForm, ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id});
            if(register.status == 200){
              this.refreshListJual()
              vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Register Fasilitas Penjualan", showing: true });
            }else{
              vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Register Fasilitas Penjualan", showing: true });
            }
          }else{
            vm.$emit('changeVar', {to: 'listJualFasilitas', data: listJualNew })
          }
        }
        vm.$bvModal.hide('modal-form-fasilitas-jual')
        vm.busy = false
      },
      async updateJual(){
        const vm = this
        const listJual = JSON.parse(JSON.stringify(vm.listJual))
        const listJualOld = JSON.parse(JSON.stringify(vm.listJual))
        //list jual
        listJual[vm.dataForm.index_jual].keterangan_penjualan_fasilitas = vm.dataForm.keterangan_penjualan_fasilitas
        listJual[vm.dataForm.index_jual].harga_fasilitas_custom = vm.dataForm.harga_fasilitas_custom
        listJual[vm.dataForm.index_jual].qty_fasilitas = vm.dataForm.qty_fasilitas
        listJual[vm.dataForm.index_jual].total_harga_fasilitas = vm.dataForm.qty_fasilitas * vm.dataForm.harga_fasilitas_custom
        listJual[vm.dataForm.index_jual].nama_qty_fasilitas = vm.toNumeric(vm.dataForm.qty_fasilitas)
        listJual[vm.dataForm.index_jual].nama_harga_fasilitas_custom = vm.toNumeric(vm.dataForm.harga_fasilitas_custom, 'idr')
        listJual[vm.dataForm.index_jual].nama_total_harga_fasilitas = vm.toNumeric(listJual[vm.dataForm.index_jual].total_harga_fasilitas, 'idr')
        const dataPerhitungan = await vm.hitungPerhitungan(listJual, listJualOld) //jika mengguakan watch, data bisa ketinggalan
        //jika draft / penjualan sudah dibuat
        if(vm.isDraft == 1){
          const update = await this.$_api.post("penjualanFasilitas/update", {...listJual[vm.dataForm.index_jual], ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: vm.dataForm.penjualan_fasilitas_id});
          if(update.status == 200){
            this.refreshListJual()
            vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Update Fasilitas Penjualan", showing: true });
          }else{
            vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Update Fasilitas Penjualan", showing: true });
          }
        }else{
          vm.$emit('changeVar', {to: 'listJualFasilitas', data: listJual })
        }
        vm.$bvModal.hide('modal-form-fasilitas-jual')
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
  