<template>
    <div>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12">
            <b-card>
                <b-row>
                    <b-col cols="2" md="2" lg="2">
                        <label>ID</label>
                        <b-form-input 
                            type="text"
                        ></b-form-input>
                    </b-col>
                    <b-col cols="1" md="1" lg="1">
                        <label>IDGL</label>
                        <b-form-input 
                            type="text"
                        ></b-form-input>
                    </b-col>
                    <b-col cols="3" md="3" lg="3">
                        <label class="text-dark">TOTAL PENYUSUTAN</label>
                        <h4>RP.</h4>
                    </b-col>
                    <b-col cols="3" md="3" lg="3">
                        <label class="text-dark">TOTAL CICILAN</label>
                        <h4>RP.</h4>
                    </b-col>
                    <b-col cols="3" md="3" lg="3">
                        <label class="text-dark">SISA PEMBAYARAN</label>
                        <h4>RP.</h4>
                    </b-col>
                </b-row>
            </b-card>
            <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" class="mt-1 btn-group">
                    <button @click="tab = 1" class="btn" :class="tab == 1 ? 'btn-success' : 'btn-outline-success' " type="button">FIX ASSET</button>
                    <button @click="tab = 2" class="btn" :class="tab == 2 ? 'btn-success' : 'btn-outline-success' " type="button">PENYUSUTAN</button>
                    <button @click="tab = 3" class="btn" :class="tab == 3 ? 'btn-success' : 'btn-outline-success' " type="button">HISTORY</button>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" v-show="tab == 1">
                    <TabFixAsset 
                        :data_asset="data_asset"
                    />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="12" v-show="tab == 2">
                    <TabPenyusutan 
                        :data_penyusutan="data_penyusutan"
                    />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="12" v-show="tab == 3">
                    <TabHistory 
                        :data_history="data_history"
                    />
                </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
      
    </div>
  </template>
  
  <script>
  import _ from "lodash";
  import axios from "axios";
  import TabFixAsset from "./tab_fixasset.vue"
  import TabPenyusutan from "./tab_penyusutan.vue"
  import TabHistory from "./tab_history.vue"
  import { ipBackend } from "@/ipBackend";
  import { useGetAxios } from "@/composables/useAxios.js";
  
  export default {
    components: {
      TabFixAsset,
      TabPenyusutan,
      TabHistory,
    },
    name: "tipe_asset",
    data() {
      return {
        tab: 1,
        showing: false,
        variant: "success",
        msg: "",
        is_data: "",
        data_asset: "",
        data_penyusutan: "",
        data_history: "",
        list_tingkat_asset: [],
        list_tipe_asset: [],
        list_gudang: [],
        list_produsen: [],
        list_supplier: [],
        ep_be: "fixAsset",
      };
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter((f) => f.sortable)
          .map((f) => {
            return { text: f.label, value: f.key };
          });
      },
    },
    async mounted() {
      // Set the initial number of items
      this.getDatas();
    },
    methods: {
      async getDatas() {
        try {
            console.log('sampe sini');
          let id = this.$route.params.id
          let { res, err } = await useGetAxios(this.ep_be + "/detailsById/" + id);
            console.log(res, 'ini ress nya');
          if (!res) {
            throw err;
          } else {
            // this.items = res;
            // for (let i = 0; i < this.items.length; i++) {
            //   let x = this.items[i];
            //   x.no = i + 1;
            // }
            // this.totalRows = this.items.length;
          }
        } catch (err) {
          if (err.message) {
            this.triggerAlert({
              variant: "danger",
              msg: _.toUpper(err.message),
              showing: true,
            });
          } else {
            this.triggerAlert({
              variant: "danger",
              msg: _.toUpper(err),
              showing: true,
            });
          }
        } finally {
          this.tableBusy = false;
        }
        let tipe_asset = await this.$_api.post("msTypeAsset/list");
        // console.log(tipe_asset);
        this.list_tipe_asset = tipe_asset.data;
        let gudang = await this.$_api.post("msGudang/list");
        // console.log(gudang);
        this.list_gudang = gudang.data;
        let produsen = await this.$_api.post("msProdusen/list");
        // console.log(produsen);
        this.list_produsen = produsen.data;
        let supplier = await this.$_api.post("msSupplier/list");
        // console.log(supplier);
        this.list_supplier = supplier.data;
        let tingkat_asset = await this.$_api.post("tingkatAsset/list");
        // console.log(tingkat_asset);
        this.list_tingkat_asset = tingkat_asset.data;
      },
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
    },
  };
  </script>
  