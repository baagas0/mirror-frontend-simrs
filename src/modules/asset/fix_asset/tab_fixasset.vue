<template>
    <div>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="12" lg="12" class="mt-2">
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
          </b-col>
        </b-row>
      </b-container>
      
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ipBackend } from "@/ipBackend";
  
  export default {
    name: "tab_fixasset",
    props: ["data_fixasset"],
    data() {
      return {
        showing: false,
        variant: "success",
        msg: "",
        is_data: "",
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
    },
    methods: {
      triggerAlert(event) {
        let vm = this;
        vm.$store.commit("set_alert", event);
      },
    },
  };
  </script>
  