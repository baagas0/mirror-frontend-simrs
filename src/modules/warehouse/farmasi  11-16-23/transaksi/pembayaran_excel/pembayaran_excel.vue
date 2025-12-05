<template>
    <div class="w-100">
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card header-tag="header" header-bg-variant="dark">
              <template #header>
                <h5 class="mb-0" style="color: #fff">
                  <strong>Service Tutup Pembelian</strong>
                </h5>
              </template>
              <b-row>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <b-col cols="12" md="12" lg="12" sm="12">
                        <label>ID</label>
                        <b-form-input 
                            v-model="data.kode_serv_pembelian"
                            type="text"
                            disabled
                        ></b-form-input>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" sm="12" class="mt-2">
                        <label>Tanggal</label>
                        <date-picker
                            id="tgl_masuk"
                            style="width: 100%"
                            format="YYYY-MM-DD"
                            v-model="data.tanggal_serv_pembelian"
                            :placeholder="tanggal_serv_pembelian_ph"
                        ></date-picker>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" sm="12" class="mt-2">
                        <label>Tipe Pembayaran</label>
                        <b-form-select
                            v-model="data.tipe_bayar"
                            :options="optionsPembayaran"
                        ></b-form-select>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" sm="12" class="mt-2">
                        <label>Kas</label>
                        <multiselect
                            id="kas"
                            v-model="data.kas"
                            :options="list_kas"
                            :multiple="false"
                            :searchable="true"
                            :close-on-select="true"
                            :show-labels="false"
                            label="name"
                            track-by="id"
                            placeholder="-- Pilih Kas --"
                            :state="checkValidasi('kas').s"
                        ></multiselect>
                        <span class="text-danger">{{checkValidasi('kas').m}}</span>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" sm="12" class="mt-2">
                        <label>Keterangan</label>
                        <b-form-textarea
                            v-model="data.keterangan"
                        ></b-form-textarea>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" sm="12" class="mt-2">
                        <label>Pilih File Excel</label>
                        <b-form-file 
                            ref="file1"
                            type="file"
                            @input="handleFile()"
                        ></b-form-file>
                    </b-col>
                    <b-col cols="12" md="12" lg="12" sm="12" class="mt-5" offset-lg="8" offset-md="8">
                        <b-button
                            @click="reset()"
                            variant="light"
                            style="margin-right:20px"
                            
                            >Reset
                        </b-button>
                        <b-button
                            @click="simpan()"
                            variant="primary"
                            style="margin-right:20px"
                            
                            >Simpan
                        </b-button>
                    </b-col>
                </b-col>
                <b-col cols="8" md="8" lg="8" sm="8">
                    <b-card>
                        <h5><strong>Daftar Pembelian dari Excel</strong></h5>
                        <hr />
                        <b-table
                            :items="itemsExcel"
                            :fields="fieldsExcel"
                            :current-page="currentPageExcel"
                            :per-page="perPageExcel"
                            responsive
                            show-empty
                            hover
                            class="bg-light"
                        >
                        </b-table>
                        <b-row>
                            <b-col md="8" offset-md="4">
                            <b-pagination
                                v-model="currentPageExcel"
                                :total-rows="totalRowsExcel"
                                :per-page="perPageExcel"
                                align="fill"
                                size="sm"
                            ></b-pagination>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
              </b-row>
              <hr />
              <b-row>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <label>ID</label>
                    <b-form-input 
                        v-model="dataFilter.kode_serv_pembelian"
                        type="text"
                    ></b-form-input>
                </b-col>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <label>Tipe Pembayaran</label>
                    <b-form-select
                        v-model="dataFilter.tipe_pembayaran"
                        :options="optionsPembayaran"
                    ></b-form-select>
                </b-col>
                <b-col cols="4" md="4" lg="4" sm="4">
                    <label>Kas</label>
                    <multiselect
                        id="kas_filter"
                        v-model="dataFilter.kas"
                        :options="list_kas"
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        label="nama_kas"
                        track-by="id"
                        placeholder="-- Pilih Kas --"
                        :state="checkValidasi('kas').s"
                    ></multiselect>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="12" lg="12" sm="12" class="mt-4">
                  <b-card>
                    <h5><strong>List Service Tutup Pembelian</strong></h5>
                      <hr />
                      <b-table
                        :items="items"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        responsive
                        show-empty
                        hover
                        class="bg-light"
                      >
                      <template #cell(actions)="item">
                      <b-button
                        variant="warning"
                        class="mr-1"
                        v-b-tooltip.hover="'View Data'"
                        @click="setItem(item.item)"
                        ><i class="ri-edit-2-line"></i> {{ item.actions }}</b-button
                      >
                    </template>
                      </b-table>
                      <b-row>
                        <b-col md="8" offset-md="4">
                          <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            size="sm"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
    const numeral = require("numeral")
    import _ from "lodash"
    import axios from "axios";
    import { ipBackend } from "@/ipBackend";
    import Multiselect from "vue-multiselect";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
    import moment from "moment"
    import { required } from "vuelidate/lib/validators";
    import useVuelidate from '@vuelidate/core';
    moment.locale("ID")
    export default {
      components: {
        Multiselect,
        DatePicker,
      },
      name: "pembayaran",
      setup() { return { v$: useVuelidate({ $lazy: true, $autoDirty: true }) } },
      data() {
        return {
          gudang: "",
          showError: false,
          list_kas: [],
          list_pembelian: [],
          file1: "",
          tanggal_serv_pembelian_ph: "",
          dataFilter: {
            kode_serv_pembelian: null,
            tipe_pembayaran: "1",
            kas_id: null,
            kas: "",
          },
          data: {
            tanggal_serv_pembelian: null,
            tipe_bayar: "1",
            keterangan: "",
            kas_id: "",
            kas: "",
            kode_serv_pembelian: "",
            file1: "",
          },
          optionsPembayaran: [
            {value: 1, text: "Tunai"},
            {value: 2, text: "Debet / Kredit"},
            {value: 3, text: "Client / Clientas"},
          ],
          fieldsExcel: [
            {
              key: "no",
              label: "No",
              sortDirection: "desc",
              sortable: true,
              class: "table-number text-center",
            },
  
            {
              key: "no_faktur",
              label: "No. Faktur",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "nama_supplier",
              label: "Nama Supllier",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "nama_gudang",
              label: "Gudang",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },

            {
              key: "keterangan",
              label: "Keterangan",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
          ],
          items: [],

          fields: [
            {
              key: "no",
              label: "No",
              sortDirection: "desc",
              sortable: true,
              class: "table-number text-center",
            },
  
            {
              key: "kode_serv_pembelian",
              label: "ID",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "tipe_bayar",
              label: "Tipe Pembayaran",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
  
            {
              key: "nama_kas",
              label: "KAS",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },

            {
              key: "keterangan",
              label: "Keterangan",
              sortable: true,
              sortDirection: "desc",
              class: "text-left",
            },
            {
            key: "actions",
            label: "Actions",
            class: "table-option-2 text-center",
            thStyle: {width: "10%"}
          },
          ],
          itemsExcel: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,
          totalRowsExcel: 1,
          currentPageExcel: 1,
          perPageExcel: 5,
          filter: null,
          filterOn: [],
          tableBusy: false,
        };
      },
      computed: {
        formString() {
        return JSON.stringify(this.data, null, 4);
        },
        isValid() {
        return !this.v$.$invalid;
        },
        isDirty() {
        return this.v$.$anyDirty;
        },
    },
    validations: {
        data: {
            kas: {required},
        },
    },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.getDatas();
      },
      methods: {
        formater(value){
            let x = numeral(value).format('0,0')
            return value == '0' ? '' : x
        },
        handleFile() {
          this.file1 = this.$refs.file1.files[0];
          console.log(this.$refs.file1.files[0].name, "iki2");
          console.log(this.file1, 'ini filenya oi');
        },
        setItem(x){
            let vm = this
            console.log(x);
            let kas = x.kas_id
            vm.kode_serv_pembelian = x.kode_serv_pembelian
            vm.tipe_pembayaran = x.tipe_pembayaran
            for (let i = 0; i < vm.list_kas.length; i++) {
                let y = vm.list_kas[i];
                if(y.id == kas){
                    vm.kas = y
                }
            }
            axios.post("servPembelian/listPembelianByKodeServPembelian", {kode_serv_pembelian:x.kode_serv_pembelian})
            .then((res) => {
                console.log(res, 'ini ress');
                vm.itemsExcel = res.data
                for (let i = 0; i < vm.itemsExcel.length; i++) {
                    let x = vm.itemsExcel[i];
                    x.no = i+1
                }
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async getDataFilter(){
            let vm = this
            let list_pembelian = await this.$_api.post("servPembelian/list", vm.dataFilter);
            vm.items = list_pembelian.status == 200 ? list_pembelian.data.map(x => { return x }) : []
            for (let i = 0; i < vm.items.length; i++) {
                let x = vm.items[i];
                x.no = i+1
                if(x.tipe_pembayaran == 1){
                    x.tipe_bayar = "TUNAI"
                }else if(x.tipe_pembayaran == 2){
                    x.tipe_bayar = "Debit/Kredit"
                }else if(x.tipe_pembayaran == 3){
                    x.tipe_bayar = "Client/Clientas"
                }
            }
        },
        async getDatas() {
          let vm = this
          
          vm.tanggal_serv_pembelian = moment(new Date()).format("YYYY-MM-DD HH:mm")
          vm.tanggal_serv_pembelian_ph = moment(new Date()).format("YYYY-MM-DD HH:mm")
          let list_kas = await this.$_api.post("kas/list");
          vm.list_kas = list_kas.status == 200 ? list_kas.data.map(x => { return x }) : []
          
          let list_pembelian = await this.$_api.post("servPembelian/list", vm.dataFilter);
          vm.items = list_pembelian.status == 200 ? list_pembelian.data.map(x => { return x }) : []
            for (let i = 0; i < vm.items.length; i++) {
                let x = vm.items[i];
                x.no = i+1
                if(x.tipe_pembayaran == 1){
                    x.tipe_bayar = "TUNAI"
                }else if(x.tipe_pembayaran == 2){
                    x.tipe_bayar = "Debit/Kredit"
                }else if(x.tipe_pembayaran == 3){
                    x.tipe_bayar = "Client/Clientas"
                }
            }

          console.log(vm.list_pembelian, 'pembelian');

        },
        async simpan(){
            let vm = this
            await this.v$.$touch();
            if (vm.isValid && vm.isDirty) {
                let formData = new FormData()
                formData.append("tanggal_serv_pembelian", vm.tanggal_serv_pembelian);
                formData.append("tipe_pembayaran", vm.tipe_bayar);
                formData.append("kas_id", vm.kas.id);
                formData.append("keterangan", vm.keterangan);
                formData.append("file1", vm.file1)
                axios.post("servPembelian/registerPembayaranExcel", formData)
                .then((res) => {
                    console.log(res, 'ini ress');
                if (res.message == "sukses") {
                    vm.kode_serv_pembelian = res.data[0].data_pembayaran.kode_serv_pembelian
                    vm.itemsExcel = res.data[0].data_pembelian
                    for (let i = 0; i < vm.itemsExcel.length; i++) {
                        let x = vm.itemsExcel[i];
                        x.no = i+1
                    }
                    vm.totalRowsExcel = res.data[0].data_pembelian.length
                    vm.busy = false;
                    vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: "BERHASIL MENAMBAHKAN PEMBAYARAN PEMBELIAN",
                    });
                    vm.getDataFilter()
                } else {
                    vm.button = "Simpan";
                    vm.busy = false;
                    vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: _.toUpper(res.message),
                    });
                }
                })
                .catch((err) => {
                    console.log(err);
                    vm.button = "Simpan";
                    vm.busy = false;
                    vm.$store.commit("set_alert", {
                        variant: "success",
                        msg: "TERJADI KESALAHAN PADA SERVER",
                    });
                });
            } else {
                console.log('itikiwir');
                this.showError = true;
            }
        },
        reset(){
            let vm = this
            vm.kode_serv_pembelian = ""
            vm.kas = ""
            vm.keterangan = null
        },
        checkValidasi(fieldName) {
            const field = this.v$.data[fieldName];
            const x = field.$error === true && field.$errors.length ? field.$errors[0].$validator : '' ;
            // console.log(fieldName, ' - ', x)
            if (this.showError) {
                // console.log('sampe sini');
                if (x == 'required') {
                return { b: false, s: false, m: '* Data wajib diisi' }
                } else if (x == 'email') {
                return { b: false, s: false, m: '* Data harus berbentuk email' }
                } else if (x == 'numeric') {
                return { b: false, s: false, m: '* Data harus terdiri hanxa dari angka' }
                } else if (x == 'minLength') {
                return { b: false, s: false, m: `* Data belum mencapai minimal digits` }
                } else if (x == 'maxLength') {
                return { b: false, s: false, m: `* Data melebihi maksimal digits` }
                } else if (x == 'alphaNum') {
                return { b: false, s: false, m: `* Data tidak boleh mengandung spasi atau simbol` }
                } else if (x == 'official') {
                return { b: false, s: false, m: `* Data tidak boleh mengandung spasi atau simbol` }
                } else if (x == 'validasiNoKontrolRujukan'){
                return { b: false, s: false, m: '* Isi no rujukan / no kontrol' }
                } else if (x == 'validasiPoliLayanan'){
                return { b: false, s: false, m: '* Isi Layanan / Poliklinik' }
                } else if (x == 'validasiNoAsuransi'){
                return { b: false, s: false, m: '* No Asuransi Tidak Valid' }
                } else if (x == 'validasiNoAntrian'){
                return { b: false, s: false, m: '* No Antrian Tidak Valid' }
                } else if (x == 'validasiNoRujukan'){
                return { b: false, s: false, m: '* No Rujukan Tidak Valid' }
                } else if (x == 'validasiNoKontrol'){
                return { b: false, s: false, m: '* No Kontrol Tidak Valid' }
                } else if (x == 'kuotaDokter'){
                return { b: false, s: false, m: '* Kuota Habis' }
                } else {
                return { b: true, s: null, m: null }
                }
            } else {
                return { b: true, s: null, m: null }
            }
        },
    },
  };
  </script>
  