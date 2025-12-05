<template>
  <b-modal
    id="modal-form-barang-jual"
    size="md"
    centered
    title="Jual Barang"
    :header-bg-variant="dataForm.status_edit ? 'warning' : 'success'"
    header-text-variant="light"
  >
    <b-form>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Barang <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_barang"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Satuan <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_satuan"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Total QTY <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_qty_barang_total"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="text"
          disabled
          v-model="dataForm.nama_harga_barang"
        ></b-form-input>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Harga Custom <span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.harga_barang_custom"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_harga_barang_custom}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          QTY Jual<span class="text-danger">*</span>
        </template>
        <b-form-input
          type="number"
          v-model="dataForm.qty_barang"
        ></b-form-input>
        <small class="d-block ml-1 mt-1 text-danger">{{dataForm.nama_qty_barang}}</small>
      </b-form-group>
      <b-form-group label-cols-md="3">
        <template v-slot:label>
          Keterangan
        </template>
        <b-form-input
          type="text"
          v-model="dataForm.keterangan_penjualan_barang"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide('modal-form-barang-jual')">
        Tidak
      </b-button>
      <div v-if="isDraft == 1">
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_barang == null">
          Update
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_barang == null">
          Register
        </b-button>
      </div>
      <div v-else>
        <b-button v-if="dataForm.update" variant="warning" @click="updateJual()" :disabled="busy || dataForm.qty_barang == null">
          Ubah
        </b-button>
        <b-button v-else variant="primary" @click="registerJual()" :disabled="busy || dataForm.qty_barang == null">
          Tambah
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
  
<script>
  export default {
    components: {
    },
    name: "master_etnis",
    emits: [ 'resetData', 'changeVar' ],
    props: [ 'dataHeader', 'dataPerhitungan', 'dataForm', 'listJual', 'list', 'isDraft', 'listBarang' ],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        busy: false,
      };
    },
    watch: {
      'dataForm.harga_barang_custom'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_harga_barang_custom = this.toNumeric(newVar, 'idr')
        }
      },
      'dataForm.qty_barang'(newVar, oldVar){
        if (newVar != oldVar) {
          this.dataForm.nama_qty_barang = this.toNumeric(newVar)
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
        const totalOld = oldVar.reduce((total, item) => total + item.total_harga_barang, 0)
        const totalNew = newVar.reduce((total, item) => total + item.total_harga_barang, 0)
        const x = {}
        x.jumlah = dataPerhitungan.jumlah - totalOld + totalNew
        x.harga_total_barang = totalNew
        x.discount = dataPerhitungan.discount
        x.tax = (x.jumlah - dataPerhitungan.discount) * dataPerhitungan.tax_persen / 100
        x.total_penjualan = x.jumlah - x.discount + x.tax
        return x
      },
      async refreshListJual(){
        const vm = this
        const listJualBarang = await this.$_api.post("penjualanBarang/listPenjualanBarangByPenjualanId", {penjualan_id: vm.dataHeader.penjualan_id});
        console.log('listJualBarang', listJualBarang)
        //list jual barang
        const listJual = listJualBarang.status == 200 ? await listJualBarang.map(x => {return {
          ...x, 
          total_harga_barang: x.harga_barang_custom * x.qty_barang,
          nama_qty_barang: vm.toNumeric(x.qty_barang),
          qty_barang_total: x.total_stock_barang,
          nama_qty_barang_total: vm.toNumeric(x.total_stock_barang),
          nama_harga_barang: vm.toNumeric(x.harga_barang, 'idr'),
          nama_harga_barang_custom: vm.toNumeric(x.harga_barang_custom, 'idr'),
          nama_total_harga_barang: vm.toNumeric(x.harga_barang_custom * x.qty_barang, 'idr'),
        }}) : []
        vm.$emit('changeVar', {to: 'listJualBarang', data: listJual })
      },
      async registerJual(){
        const vm = this
        vm.busy = true
        vm.$bvModal.hide('modal-form-barang-jual')
        const dataForm = JSON.parse(JSON.stringify(vm.dataForm))
        //list jual
        const listJual = JSON.parse(JSON.stringify(vm.listJual))
        const indexJualBarang = listJual.findIndex(jual => jual.ms_barang_id == dataForm.ms_barang_id)
        if(indexJualBarang >= 0){
          //jika barang sudah ada di list jual
          vm.$store.commit("set_alert", { variant: "warning", msg: "Sudah Terdapat Pada Daftar Barang Yang Dijual", showing: true });
        }else{
          //barang
          const listBarang = JSON.parse(JSON.stringify(vm.listBarang))
          const indexBarang = listBarang.findIndex(barang => barang.ms_barang_id == dataForm.ms_barang_id)
          if(listBarang[indexBarang].qty_barang_total - dataForm.qty_barang < 0){
            vm.$store.commit("set_alert", { variant: "warning", msg: "Menjual Barang Melebihi Total Quantity", showing: true });
          }else{
            // listBarang[indexBarang].qty_barang_total -= dataForm.qty_barang
            // listBarang[indexBarang].nama_qty_barang_total = vm.toNumeric(listBarang[indexBarang].qty_barang_total)
            // vm.$emit('changeVar', {to: 'listBarang', data: listBarang })
            //barang jual 
            dataForm.qty_barang_total = listBarang[indexBarang].qty_barang_total - dataForm.qty_barang
            dataForm.nama_qty_barang_total = vm.toNumeric(dataForm.qty_barang_total)
            dataForm.total_harga_barang = dataForm.qty_barang * dataForm.harga_barang_custom
            dataForm.nama_qty_barang = vm.toNumeric(dataForm.qty_barang)
            dataForm.nama_harga_barang_custom = vm.toNumeric(dataForm.harga_barang_custom, 'idr')
            dataForm.nama_total_harga_barang = vm.toNumeric(dataForm.total_harga_barang, 'idr')
            const listJualNew = listJual.concat({...dataForm, no: listJual.length+1, create: true})
            const dataPerhitungan = await vm.hitungPerhitungan(listJualNew, listJual) //jika mengguakan watch, data bisa ketinggalan
            //jika draft / penjualan sudah dibuat
            if(vm.isDraft == 1){
              const register = await this.$_api.post("penjualanBarang/register", {...dataForm, ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id});
              if(register.status == 200){
                this.refreshListJual()
                this.$emit('changeVar', {to: 'dataHeader', data: {...vm.dataHeader, refresh: 'listBarang'} })
                vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Register Barang Penjualan", showing: true });
              }else{
                vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Register Barang Penjualan", showing: true });
              }
            }else{
              vm.$emit('changeVar', {to: 'listJualBarang', data: listJualNew })
            }
          }
        }
        vm.$bvModal.hide('modal-form-barang-jual')
        vm.busy = false
      },
      async updateJual(){
        const vm = this
        let listJual = JSON.parse(JSON.stringify(vm.listJual))
        const listJualOld = JSON.parse(JSON.stringify(vm.listJual))
        //barang
        // const listBarang = JSON.parse(JSON.stringify(vm.listBarang))
        const indexJual = listJual.findIndex(barang => barang.ms_barang_id == vm.dataForm.ms_barang_id)
        if(listJual[indexJual].qty_barang_total - (vm.dataForm.qty_barang - listJual[vm.dataForm.index_jual].qty_barang) < 0){
          vm.$store.commit("set_alert", { variant: "warning", msg: "Menjual Jual Melebihi Total Quantity", showing: true });
        }else{
          //list barang
          // listJual[indexJual].qty_barang_total -= vm.dataForm.qty_barang - listJual[vm.dataForm.index_jual].qty_barang
          // listJual[indexJual].nama_qty_barang_total = vm.toNumeric(listJual[indexJual].qty_barang_total)
          // vm.$emit('changeVar', {to: 'listJual', data: listJual })
          //list barang jual
          listJual[vm.dataForm.index_jual].qty_barang_total = listJual[indexJual].qty_barang_total - (vm.dataForm.qty_barang - listJual[vm.dataForm.index_jual].qty_barang)
          listJual[vm.dataForm.index_jual].nama_qty_barang_total = vm.toNumeric(listJual[vm.dataForm.index_jual].qty_barang_total)
          listJual[vm.dataForm.index_jual].keterangan_penjualan_barang = vm.dataForm.keterangan_penjualan_barang
          listJual[vm.dataForm.index_jual].harga_barang_custom = vm.dataForm.harga_barang_custom
          listJual[vm.dataForm.index_jual].qty_barang = vm.dataForm.qty_barang
          listJual[vm.dataForm.index_jual].total_harga_barang = vm.dataForm.qty_barang * vm.dataForm.harga_barang_custom
          listJual[vm.dataForm.index_jual].nama_qty_barang = vm.toNumeric(vm.dataForm.qty_barang)
          listJual[vm.dataForm.index_jual].nama_harga_barang_custom = vm.toNumeric(vm.dataForm.harga_barang_custom, 'idr')
          listJual[vm.dataForm.index_jual].nama_total_harga_barang = vm.toNumeric(listJual[vm.dataForm.index_jual].total_harga_barang, 'idr')
          const dataPerhitungan = await vm.hitungPerhitungan(listJual, listJualOld) //jika mengguakan watch, data bisa ketinggalan
          // console.log("halo dare update biasa")
          //jika draft / penjualan sudah dibuat
          if(vm.isDraft == 1){
            // await new Promise(resolve => setTimeout(resolve, 100));
            // vm.$emit('changeVar', {to: 'listJualBarang', data: [] })
//"{"penjualan_barang_id":"155d2b1b-2b23-40bb-8a82-dcf737dc9e26","id":"155d2b1b-2b23-40bb-8a82-dcf737dc9e26","qty_barang":"4","harga_barang":1598632.4160000002,"harga_barang_custom":1598632.4160000002,"harga_pokok_barang":999145.26,"keterangan_penjualan_barang":"test","status_penjualan_barang":1,"createdAt":"2023-04-10T08:17:02.399Z","updatedAt":"2023-04-10T08:17:31.897Z","deletedAt":null,"penjualan_id":"a0a0de6e-0108-4920-b9d6-0a2f8bd11568","ms_barang_id":"1054dd3d-52d5-4ace-9a76-fefdaef4a6f6","nama_barang":"Panadol","kode_produk":"D123","qjb":12,"harga_pokok":999145.26,"harga_tertinggi":84804.88,"harga_beli_terahir":84464.11,"ms_jenis_obat_id":"6ca220bc-2f32-4109-9064-3af77dce3787","nama_jenis_obat":"Jenis Obat 1","komposisi":"air gula teh","ms_satuan_jual_id":"ae2d06da-009c-4fb7-b686-00085808127f","nama_satuan":"Tablet","ms_gudang_id":"59a5e130-abe9-45f7-8458-b159301d1403","nama_gudang":"GUDANG SAYA","tipe_gudang":"GUDANG ","total_stock_barang":245,"total_harga_barang":6394529.664000001,"nama_qty_barang":"4","qty_barang_total":246,"nama_qty_barang_total":"246","nama_harga_barang":"Rp 1.598.632,42","nama_harga_barang_custom":"Rp 1.598.632,42","nama_total_harga_barang":"Rp 6.394.529,66","jumlah":7094529.664000001,"harga_total_barang":7094529.664000001,"discount":10000,"tax":708452.9663999996,"total_penjualan":7792982.6304}"
            // id, qty_barang, harga_barang, harga_barang_custom, harga_pokok_barang, keterangan_penjualan_barang, status_penjualan_barang, penjualan_id, ms_barang_id, harga_total_barang, discount, tax, total_penjualan
            const update = await this.$_api.post("penjualanBarang/update", {...listJual[vm.dataForm.index_jual], ...dataPerhitungan, penjualan_id: vm.dataHeader.penjualan_id, id: vm.dataForm.penjualan_barang_id});
            // console.log('update barang', update)
            if(update.status == 200){
              this.refreshListJual()
              this.$emit('changeVar', {to: 'dataHeader', data: {...vm.dataHeader, refresh: 'listBarang'} })
              vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Update Barang Penjualan", showing: true });
            }else{
              vm.$store.commit("set_alert", { variant: "danger", msg: "Gagal Update Barang Penjualan", showing: true });
            }
          }else{
            vm.$emit('changeVar', {to: 'listJualBarang', data: listJual })
          }
        }
        vm.$bvModal.hide('modal-form-barang-jual')
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
  