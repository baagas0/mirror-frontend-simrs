<template>
  <b-modal
    id="modal-form-jasa-jual"
    size="md"
    centered
    title="Jual Jasa"
    :header-bg-variant="dataForm.status_edit ? 'warning' : 'success'"
    header-text-variant="light"
  >
    <b-form>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jasa <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_jasa"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jenis <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_jenis_jasa"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_harga_jasa"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga Custom <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.harga_jasa_custom"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_harga_jasa_custom}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Jumlah <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.qty_jasa"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_qty_jasa}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Dokter <span class="text-danger">*</span>
        </template>
        <multiselect
          id="kelas"
          v-model="dataForm.jasa_dokter"
          :options="listJasaDokter"
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          label="nama_dokter"
          track-by="jasa_dokter_id"
          placeholder="dokter"
          size="sm"
        ></multiselect>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Keterangan
        </template>
        <b-form-input
          type="text"
          v-model="dataForm.keterangan_penjualan_jasa"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide('modal-form-jasa-jual')">
        Tidak
      </b-button>
      <div v-if="isDraft == 1">
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_jasa == null">
          Update
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_jasa == null">
          Register
        </b-button>
      </div>
      <div v-else>
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_jasa == null">
          Ubah
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_jasa == null">
          Tambah
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
  
<script>
  import axios from "axios";
  // import { ipBackend } from "@/ipBackend";
  // import Multiselect from "vue-multiselect";
  // import DatePicker from "vue2-datepicker";
  import "vue2-datepicker/index.css";
  
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
        listJasaDokter: [],
      };
    },
    watch: {
      dataForm(newVar, oldVar){
        if(newVar != oldVar){
          const vm = this
          //gudang
          axios.post("jasaDokter/listJasaDokterByMsJasaId", {ms_jasa_id: newVar.ms_jasa_id}).then(x => {
            vm.listJasaDokter = x.status == 200 ? x.data : []
          })
        }
      },
      'dataForm.harga_jasa_custom'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_harga_jasa_custom = this.toNumeric(newVar, 'idr')
        }
      },
      'dataForm.qty_jasa'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_qty_jasa = this.toNumeric(newVar)
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
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_jasa, 0)
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_jasa, 0)
        const x = {}
        x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew
        x.harga_total_jasa = totalNew
        x.discount = dataPerhitungan.discount
        x.tax = (x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen / 100
        x.total_penjualan = x.jumlah - x.discount + x.tax
        return x
      },
      async refreshListJual(){
        const vm = this
        const listJualJasa = await this.$_api.post("penjualanJasa/listPenjualanJasaByPenjualanId", {penjualan_id: vm.dataHeader.penjualan_id});
        // console.log('listJualJasa', listJualJasa)
        //list jual jasa
        const listJual = listJualJasa.status == 200 ? await listJualJasa.data.map(x => {return {
          ...x, 
          total_harga_jasa: x.harga_jasa_custom * x.qty_jasa,
          nama_qty_jasa: vm.toNumeric(x.qty_jasa),
          nama_harga_jasa: vm.toNumeric(x.harga_jasa, 'idr'),
          nama_harga_jasa_custom: vm.toNumeric(x.harga_jasa_custom, 'idr'),
          nama_total_harga_jasa: vm.toNumeric(x.harga_jasa_custom * x.qty_jasa, 'idr'),
        }}) : []
        vm.$emit('changeVar', {to: 'listJualJasa', data: listJual })
      },
      async registerJual(){
        const vm = this
        vm.busy = true
        vm.$bvModal.hide('modal-form-jasa-jual')
        const dataForm = JSON.parse(JSON.stringify(vm.dataForm))
        //list jual
        const listJual = JSON.parse(JSON.stringify(vm.listJual))
        const indexJasa = listJual.findIndex(jual => jual.ms_jasa_id == dataForm.ms_jasa_id)
        if(indexJasa >= 0){
          //jika jasa sudah ada di list jual
          vm.$store.commit("set_alert", { variant: "warning", msg: "Sudah Terdapat Pada Daftar Jasa Yang Dijual", showing: true });
        }else{
          //jual
          dataForm.total_harga_jasa = dataForm.qty_jasa * dataForm.harga_jasa_custom
          dataForm.nama_qty_jasa = vm.toNumeric(dataForm.qty_jasa)
          dataForm.nama_harga_jasa_custom = vm.toNumeric(dataForm.harga_jasa_custom, 'idr')
          dataForm.nama_total_harga_jasa = vm.toNumeric(dataForm.total_harga_jasa, 'idr')
          const listJualNew = listJual.concat({...dataForm, no: listJual.length+1, create: true})
          const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, listJual) //jika mengguakan watch, data bisa ketinggalan
          //jika draft / penjualan sudah dibuat
          if(vm.isDraft == 1){
            const register = await this.$_api.post("penjualanJasa/register", {...dataForm, ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id});
            if(register.status == 200){
              this.refreshListJual()
              vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Register Jasa Penjualan", showing: true });
            }else{
              vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Register Jasa Penjualan", showing: true });
            }
          }else{
            vm.$emit('changeVar', {to: 'listJualJasa', data: listJualNew })
          }
        }
        vm.$bvModal.hide('modal-form-jasa-jual')
        vm.busy = false
      },
      async updateJual(){
        const vm = this
        let listJual = JSON.parse(JSON.stringify(vm.listJual))
        const listJualOld = JSON.parse(JSON.stringify(vm.listJual))
        //list jual
        listJual[vm.dataForm.index_jual].keterangan_penjualan_jasa = vm.dataForm.keterangan_penjualan_jasa
        listJual[vm.dataForm.index_jual].harga_jasa_custom = vm.dataForm.harga_jasa_custom
        listJual[vm.dataForm.index_jual].qty_jasa = vm.dataForm.qty_jasa
        listJual[vm.dataForm.index_jual].total_harga_jasa = vm.dataForm.qty_jasa * vm.dataForm.harga_jasa_custom
        listJual[vm.dataForm.index_jual].nama_qty_jasa = vm.toNumeric(vm.dataForm.qty_jasa)
        listJual[vm.dataForm.index_jual].nama_harga_jasa_custom = vm.toNumeric(vm.dataForm.harga_jasa_custom, 'idr')
        listJual[vm.dataForm.index_jual].nama_total_harga_jasa = vm.toNumeric(listJual[vm.dataForm.index_jual].total_harga_jasa, 'idr')
        const dataPerhitungan = await vm.hitungPerhitungan(listJual, listJualOld) //jika mengguakan watch, data bisa ketinggalan
        vm.$emit('changeVar', {to: 'listJualJasa', data: listJual })
        //jika draft / penjualan sudah dibuat
        if(vm.isDraft == 1){
          const update = await this.$_api.post("penjualanJasa/update", {...listJual[vm.dataForm.index_jual], ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: vm.dataForm.penjualan_jasa_id});
          if(update.status == 200){
            this.refreshListJual()
            vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Update Jasa Penjualan", showing: true });
          }else{
            vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Update Jasa Penjualan", showing: true });
          }
        }else{
          vm.$emit('changeVar', {to: 'listJualJasa', data: listJual })
        }
        vm.$bvModal.hide('modal-form-jasa-jual')
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
  