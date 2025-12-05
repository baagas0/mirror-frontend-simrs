<template>
  <b-modal
    id="modal-register"
    size="xl"
    centered
    title="Register Penjualan"
    header-bg-variant="success"
    header-text-variant="light"
  >
    <div class="mx-2 mb-4">
      <b-form>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Jumlah <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            class="text-right"
            v-model="dataPerhitungan.nama_jumlah"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Potongan <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="number"
            class="text-right"
            v-model="dataPerhitungan.discount"
          ></b-form-input>
          <small class="text-right d-block mr-2 mt-1 text-danger">{{dataPerhitungan.nama_discount}}</small>
        </b-form-group>
        <hr>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            SubTotal <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            class="text-right"
            v-model="dataPerhitungan.nama_sub_total"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Tax (%) <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="number"
            class="text-right"
            v-model="dataPerhitungan.tax_persen"
          ></b-form-input>
          <small class="text-right d-block mr-2 mt-1 text-danger">{{dataPerhitungan.nama_tax_persen}}</small>
        </b-form-group>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Total <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            class="text-right"
            v-model="dataPerhitungan.nama_total_penjualan"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- <b-form-group label-cols-md="3">
          <template v-slot:label>
            Pembayaran <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="number"
            class="text-right"
            v-model="dataPerhitungan.pembayaran"
          ></b-form-input>
          <small class="text-right d-block mr-2 mt-1 text-danger">{{dataPerhitungan.nama_pembayaran}}</small>
        </b-form-group>
        <hr>
        <b-form-group label-cols-md="3">
          <template v-slot:label>
            Sisa <span class="text-danger">*</span>
          </template>
          <b-form-input
            type="text"
            :class="{'text-danger': dataPerhitungan.sisa < 0 }"
            class="text-right"
            v-model="dataPerhitungan.nama_sisa"
            disabled
          ></b-form-input>
        </b-form-group> -->
      </b-form>
    </div>
    <b-card class="" header-tag="header" header-bg-variant="light" >
      <template #header>
        <h5 class="mb-0" style="">
          <strong>Fasilitas</strong>
        </h5>
      </template>
      <b-table
        :items="listJualFasilitas"
        :fields="fieldFasilitas"
        responsive
        show-empty
        small
        bordered
        striped
        hover
        style="white-space:nowrap;"
        class=""
      >
        <template #cell(no)="item">
          {{item.index+1}}
        </template>
      </b-table>
    </b-card>
    <b-card class="" header-tag="header" header-bg-variant="light" >
      <template #header>
        <h5 class="mb-0" style="">
          <strong>Jasa</strong>
        </h5>
      </template>
      <b-table
        :items="listJualJasa"
        :fields="fieldJasa"
        responsive
        show-empty
        small
        bordered
        striped
        hover
        style="white-space:nowrap;"
        class=""
      >
        <template #cell(no)="item">
          {{item.index+1}}
        </template>
      </b-table>
    </b-card>
    <b-card class="" header-tag="header" header-bg-variant="light" >
      <template #header>
        <h5 class="mb-0" style="">
          <strong>Barang</strong>
        </h5>
      </template>
      <b-table
        :items="listJualBarang"
        :fields="fieldBarang"
        responsive
        show-empty
        small
        bordered
        striped
        hover
        style="white-space:nowrap;"
        class=""
      >
        <template #cell(no)="item">
          {{item.index+1}}
        </template>
      </b-table>
    </b-card>
    <template #modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide('modal-register')">
        Batal
      </b-button>
      <!-- <b-button variant="primary" @click="register()" :disabled="!bulk_barang.length && !bulk_fasilitas && !bulk_jasa || dataPerhitungan.sisa < 0"> -->
      <b-button v-if="isDraft == 0" variant="primary" @click="register()" :disabled="busy || (!listJualFasilitas.length && !listJualJasa.length && !listJualBarang.length)">
        Save
      </b-button>
      <b-button v-if="isDraft == 1" variant="warning" @click="update()" :disabled="busy">
        Update
      </b-button>
    </template>
  </b-modal>
</template>
  
<script>
  export default {
    components: {
    },
    name: "modal_register",
    emits: [ 'resetData', 'auto' ],
    props: [ 'dataHeader', 'dataPerhitungan', 'isDraft', 'headerBusy', 'listJualJasa', 'listJualFasilitas', 'listJualBarang' ],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        busy: false,
        fieldFasilitas:[
          {
            key: "no",
            label: "No",
            sortDirection: "desc",
            class: "table-number text-center",
          },
          {
            key: "nama_fasilitas",
            label: "Fasilitas",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_fasilitas_custom",
            label: "Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_qty_fasilitas",
            label: "Quantity",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_harga_fasilitas",
            label: "Total Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
        ],
        fieldJasa:[
          {
            key: "no",
            label: "No",
            sortDirection: "desc",
            class: "table-number text-center",
          },
          {
            key: "nama_jasa",
            label: "Jasa",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_jasa_custom",
            label: "Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_qty_jasa",
            label: "Quantity",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_harga_jasa",
            label: "Total Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
        ],
        fieldBarang: [
          {
            key: "no",
            label: "No",
            sortDirection: "desc",
            class: "table-number text-center",
          },
          {
            key: "nama_barang",
            label: "Barang",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_satuan",
            label: "Satuan",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_harga_barang_custom",
            label: "Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_qty_barang",
            label: "Quantity",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
          {
            key: "nama_total_harga_barang",
            label: "Total Harga",
            sortable: true,
            sortDirection: "desc",
            class: "text-left",
          },
        ],
      };
    },
    watch: {
    },
    computed: {
    },
    mounted() {
      // this.getDatas();
    },
    methods: {
      async register(){
        // is_external, jenis_rawat, external_penjualan_id
        const vm = this
        vm.busy = true
        const bulk_fasilitas = vm.listJualFasilitas.map(x => {return {
          ms_fasilitas_id: x.ms_fasilitas_id, 
          keterangan_penjualan_fasilitas: x.keterangan_penjualan_fasilitas, 
          harga_fasilitas: x.harga_fasilitas, 
          harga_fasilitas_custom: x.harga_fasilitas_custom, 
          qty_fasilitas: x.qty_fasilitas,
        }})
        const bulk_jasa = vm.listJualJasa.map(x => {return {
          ms_jasa_id: x.ms_jasa_id, 
          keterangan_penjualan_jasa: x.keterangan_penjualan_jasa, 
          harga_jasa: x.harga_jasa, 
          harga_jasa_custom: x.harga_jasa_custom, 
          qty_jasa: x.qty_jasa,
        }})
        const bulk_barang = vm.listJualBarang.map(x => {return {
          ms_barang_id: x.ms_barang_id, 
          keterangan_penjualan_barang: x.keterangan_penjualan_barang, 
          harga_pokok_barang: x.harga_pokok_barang, 
          harga_barang: x.harga_barang, 
          harga_barang_custom: x.harga_barang_custom, 
          qty_barang: x.qty_barang,
        }})
        const register = await this.$_api.post("penjualan/registerBulk", {
          ...vm.dataHeader,
          ...vm.dataPerhitungan,
          status_penjualan: 1,
          ms_asuransi_id: vm.dataHeader.asuransi ? vm.dataHeader.asuransi.id : null,
          kelas_kunjungan_id: vm.dataHeader.kelas_kunjungan ? vm.dataHeader.kelas_kunjungan.kelas_kunjungan_id : null,
          ms_gudang_id: vm.dataHeader.gudang ? vm.dataHeader.gudang.id : null,
          ms_dokter_id: vm.dataHeader.dokter ? vm.dataHeader.dokter.ms_dokter_id : null,
          ms_jenis_layanan_id: vm.dataHeader.jenis_layanan ? vm.dataHeader.jenis_layanan.id : null,
          jenis_rawat: vm.dataHeader.jenis_layanan ? vm.dataHeader.jenis_layanan.kode_jenis_layanan : null,
          bulk_fasilitas,
          bulk_jasa,
          bulk_barang,
        });
        if(register.status == 200){
          vm.$emit('resetData')
          vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Membuat Penjualan", showing: true });
          vm.$bvModal.hide('modal-register')
          const data = register.data
          localStorage.setItem('dataEditPenjualan', JSON.stringify({...data, penjualan_id: data.id}));
          await new Promise(resolve => setTimeout(resolve, 500));
          vm.$emit('auto')
        }else{
          vm.$store.commit("set_alert", { variant: "danger", msg: register.message, showing: true });
        }
        console.log('ini register', register)
        vm.busy = false
      },
      async update(){
        const vm = this
        vm.busy = true
        // console.log(vm.dataHeader)
        const update = await this.$_api.post("penjualan/update", {
          ...vm.dataHeader,
          ...vm.dataPerhitungan,
          id: vm.dataHeader.penjualan_id,
        })
        console.log('ini update', update)
        if(update.status == 200){
          vm.$emit('resetData')
          vm.$store.commit("set_alert", { variant: "success", msg: "Berhasil Merubah Penjualan", showing: true });
          vm.$bvModal.hide('modal-register')
          const data = update.data
          localStorage.setItem('dataEditPenjualan', JSON.stringify({...data, penjualan_id: vm.dataHeader.penjualan_id}));
          await new Promise(resolve => setTimeout(resolve, 500));
          vm.$emit('auto')
        }else{
          vm.$store.commit("set_alert", { variant: "danger", msg: update.message, showing: true });
        }
        vm.busy = false
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
  