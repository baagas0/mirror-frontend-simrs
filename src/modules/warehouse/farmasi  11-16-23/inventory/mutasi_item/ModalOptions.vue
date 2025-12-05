<template>
  <div>
    <b-modal
      id="modal-options"
      size="sm"
      centered
      title="Pilih Proses"
      header-bg-variant="secondary"
      header-text-variant="light"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
    >
      <!-- <b-container>
        <b-row>
          <b-col>
            <b-button variant="outline-danger" @click="resetButton">Reset</b-button>
          </b-col>
        </b-row>
         <b-row>
          <b-col>
            <b-button variant="outline-danger" @click="resetButton">Reset</b-button>
          </b-col>
        </b-row>
      </b-container> -->

      <template #modal-footer>
        <b-container>
          <b-row class="mb-3">
            <b-col>
              <b-button v-b-tooltip.hover="'Simpan Data Mutasi'" block variant="outline-primary" @click="simpanMutasi">
                Simpan
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col>
              <b-button v-b-tooltip.hover="'Proses Data Mutasi'" block variant="outline-success" @click="prosesMutasi">
                Proses
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col>
              <b-button block variant="outline-secondary" @click="batalMutasi">
                Batal
              </b-button>
            </b-col>
          </b-row>
        </b-container>
        <!-- <b-button variant="secondary" @click="$bvModal.hide('modal-delete')">
          Tidak
        </b-button>
        <b-button variant="primary" @click="hapus()" :disabled="busy">
          {{ button }}
        </b-button> -->
      </template>
    </b-modal>
  </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
export default {
  name: "modalOptions",
  props: ["data_delete"],
  data() {
    return {
      busy: false,
      button: "Hapus",
    };
  },
  methods: {
    simpanMutasi() {
      console.log("simpan");
      this.$emit("simpanMutasi")
      this.$bvModal.hide("modal-options");
    },
    async prosesMutasi() {
      console.log("proses");
      this.$emit("prosesMutasi")
      this.$bvModal.hide("modal-options");
    },
    batalMutasi() {
      console.log("batal");
      this.$bvModal.hide("modal-options");
    }
  },
};
</script>
