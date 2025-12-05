<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="12" lg="12">
        <b-alert dismissible fade :show="showing" :variant="variant">{{ msg }}</b-alert>
      </b-col>
    </b-row>

    <b-row class="mb-6">
      <b-col cols="12" md="12" lg="12">
        <b-card header-tag="header" header-bg-variant="dark">
          <template #header>
            <h5 class="mb-0" style="color: #fff">
              <strong>Input Jurnal</strong>
            </h5>
          </template>

          <b-row>
            <b-col md="3">
              <h5 class="mb-0">Jurnal</h5>
            </b-col>

            <b-col md="2" offset-md="7" class="text-right">
              <b-button variant="outline-danger" block> Reset </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <hr />
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    IDGL <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid('idgl')"
                    type="text"
                    v-model="$v.is_data.idgl.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Judul <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid('judul')"
                    type="text"
                    v-model="$v.is_data.judul.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>

            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Tanggal <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid('tgl')"
                    type="text"
                    v-model="$v.is_data.tgl.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Kode <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid('code')"
                    type="text"
                    v-model="$v.is_data.code.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>

            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    No. Invoice <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid('no_invoice')"
                    type="text"
                    v-model="$v.is_data.no_invoice.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Keterangan <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid('remark')"
                    type="text"
                    v-model="$v.is_data.remark.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>
          <!--           
          <b-row class="mt-2">
            <b-col offset-sm="10" class="text-center">
              <b-button block variant="secondary">
                Batal
              </b-button>
            </b-col>
            <b-col class="text-center">
              <b-button
                block
                variant="primary"
                :disabled="busy || !isValid"
                @click="simpan()"
                >{{ button }}</b-button
              >
            </b-col>
          </b-row> -->
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mb-6">
      <b-col cols="12" md="12" lg="12">
        <b-card header-tag="header" header-bg-variant="dark">
          <b-row>
            <b-col md="3">
              <h5 class="mb-0">Sub Transaksi</h5>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <hr />
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="3">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    CC <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('cc')"
                    type="text"
                    v-model="$v.sub_data.cc.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
              <b-form-group label-cols-md="3">
                <template v-slot:label>
                  Kode COA <span class="text-danger">*</span>
                </template>
                <b-form-input
                  :state="checkIfValid2('coa_code')"
                  type="text"
                  v-model="$v.sub_data.coa_code.$model"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    CC Name <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('cc_name')"
                    type="text"
                    v-model="$v.sub_data.cc_name.$model"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Debet <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('amount_debet')"
                    type="text"
                    v-model="$v.sub_data.amount_debet.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>

            <b-col cols="3">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    IDGL <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('idgl')"
                    type="text"
                    v-model="$v.sub_data.idgl.$model"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Kredit <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('amount_kredit')"
                    type="text"
                    v-model="$v.sub_data.amount_kredit.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>

            <b-col cols="3">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Tanggal <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('tgl')"
                    type="text"
                    v-model="$v.sub_data.tgl.$model"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Remark <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('remark')"
                    type="text"
                    v-model="$v.sub_data.remark.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="6">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Identitas Transaksi <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('identitas_transaksi')"
                    type="text"
                    v-model="$v.sub_data.identitas_transaksi.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Tipe Penerima <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('type_penerima_id')"
                    type="text"
                    v-model="$v.sub_data.type_penerima_id.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Penerima <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('penerima_id')"
                    type="text"
                    v-model="$v.sub_data.penerima_id.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Nama Penerima <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('penerima_name')"
                    type="text"
                    v-model="$v.sub_data.penerima_name.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="4">
                  <template v-slot:label>
                    Sub Tipe Penerima <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('sub_type_penerima_id')"
                    type="text"
                    v-model="$v.sub_data.sub_type_penerima_id.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="3">
                  <template v-slot:label>
                    Sub Penerima <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('sub_penerima_id')"
                    type="text"
                    v-model="$v.sub_data.sub_penerima_id.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
            <b-col cols="4">
              <b-form>
                <b-form-group label-cols-md="4">
                  <template v-slot:label>
                    Nama Sub Penerima <span class="text-danger">*</span>
                  </template>
                  <b-form-input
                    :state="checkIfValid2('sub_penerima_name')"
                    type="text"
                    v-model="$v.sub_data.sub_penerima_name.$model"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col offset-sm="10" class="text-center">
              <b-button block variant="secondary"> Batal </b-button>
            </b-col>
            <b-col class="text-center">
              <b-button
                block
                variant="primary"
                :disabled="busy || !isValid"
                @click="simpan()"
                >{{ button }}</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mb-6">
      <b-col cols="12" md="12" lg="12">
        <b-card header-tag="header" header-bg-variant="dark">
          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-table
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                responsive
                show-empty
                small
                @filtered="onFiltered"
                bordered
                striped
                hover
                :busy="tableBusy"
                :overflow-y="true"
                class="text-nowrap"
              >
                <template #cell(actions)="item">
                  <b-button
                    variant="warning"
                    class="mr-1"
                    v-b-tooltip.hover="'Edit Data'"
                    @click="setJurnalId(item.item)"
                    ><i class="ri-edit-2-line"></i> {{ item.actions }}</b-button
                  >

                  <b-button
                    variant="danger"
                    class="mr-1"
                    v-b-tooltip.hover="'Hapus Data'"
                    v-b-modal.modal-delete
                    @click="is_data = item.item"
                    ><i class="ri-delete-bin-2-line"></i> {{ item.actions }}</b-button
                  >
                </template>
              </b-table>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col cols="4">
              <h5> Kredit : 0</h5>
            </b-col>
            
            <b-col cols="4" offset-sm="4" class="text-right">
              <h5> Debet : 0 </h5>
            </b-col>
          </b-row>

        </b-card>
      </b-col>
    </b-row>
    
    <b-row class="mb-6">
      <b-col cols="12" md="12" lg="12">
        <b-card header-tag="header" header-bg-variant="dark">
        
          <b-row>
            <b-col md="3">
              <h5 class="mb-0">Sub Transaksi Deleted</h5>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <hr />
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-table
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                responsive
                show-empty
                small
                @filtered="onFiltered"
                bordered
                striped
                hover
                :busy="tableBusy"
                :overflow-y="true"
                class="text-nowrap"
              >
                <template #cell(actions)="item">
                  <b-button
                    variant="warning"
                    class="mr-1"
                    v-b-tooltip.hover="'Edit Data'"
                    @click="setJurnalId(item.item)"
                    ><i class="ri-edit-2-line"></i> {{ item.actions }}</b-button
                  >

                  <b-button
                    variant="danger"
                    class="mr-1"
                    v-b-tooltip.hover="'Hapus Data'"
                    v-b-modal.modal-delete
                    @click="is_data = item.item"
                    ><i class="ri-delete-bin-2-line"></i> {{ item.actions }}</b-button
                  >
                </template>
              </b-table>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col cols="4">
              <h5> Kredit : 0</h5>
            </b-col>
            
            <b-col cols="4" offset-sm="4" class="text-right">
              <h5> Debet : 0 </h5>
            </b-col>
          </b-row>

        </b-card>
      </b-col>
    </b-row>

    <b-row class="mb-6">
      <b-col cols="12" md="12" lg="12">
        <b-card header-tag="header" header-bg-variant="dark" no-body>
          <b-row>
            <b-col cols="12" md="12" lg="12">
              <b-button block variant="success" size="lg"> Simpan Transaksi </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import moment from "moment";
moment.locale("id");

export default {
  name: "input_jurnal",
  data() {
    return {
      showing: false,
      variant: "success",
      msg: "",
      is_data: {
        idgl: "",
        tgl: "",
        judul: "",
        no_invoice: "",
        remark: "",
        code: "",
        sub_transaksi: "",
      },
      sub_data: {
        cc: "",
        cc_name: "",
        idgl: "",
        tgl: "",
        coa_code: "",
        amount_debet: "",
        amount_kredit: "",
        remark: "",
        identitas_transaksi: "",
        type_penerima_id: "",
        penerima_id: "",
        penerima_name: "",
        sub_type_penerima_id: "",
        sub_penerima_id: "",
        sub_penerima_name: "",
      },
      fields: [
        {
          key: "no",
          label: "No",
          sortDirection: "desc",
          sortable: true,
          class: "table-number text-center",
        },
        {
          key: "cc",
          label: "CC",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          // thStyle: { width: "40rem" },
        },
        {
          key: "cc_name",
          label: "CC Name",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          // thStyle: { width: "15rem" },
        },
        {
          key: "idgl",
          label: "IDGL",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          // thStyle: { width: "35rem" },
        },
        {
          key: "tgl",
          label: "Tanggal",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          // thStyle: { width: "10rem" },
        },
        {
          key: "coa_code",
          label: "COA Code",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "amount_debet",
          label: "Debet",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "amount_kredit",
          label: "Kredit",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "remark",
          label: "Remark",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "identitas_transaksi",
          label: "Identitas Transaksi",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "type_penerima_id",
          label: "Tipe Penerima",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "penerima_id",
          label: "Penerima",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "penerima_name",
          label: "Nama Penerima",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "sub_type_penerima_id",
          label: "Sub Tipe Penerima",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "sub_penerima_id",
          label: "Sub Penerima",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },
        {
          key: "sub_penerima_name",
          label: "Nama Sub Penerima",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
        },

        {
          key: "actions",
          label: "Actions",
          class: "table-option-2 text-center",
          // thStyle: { width: "15rem" },
        },
      ],
      items: [],
      items_sub: [],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      tableBusy: false,

      busy: false,
      button: "Buat",
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
    isValid() {
      return !this.$v.is_data.$invalid;
    },
    isDirty() {
      return this.$v.is_data.$anyDirty;
    },
  },
  mixins: [validationMixin],
  validations: {
    is_data: {
      idgl: {
        required,
      },
      tgl: {
        required,
      },
      judul: {
        required,
      },
      no_invoice: {
        required,
      },
      remark: {
        required,
      },
      code: {
        required,
      },
      sub_transaksi: {
        required,
      },
    },

    sub_data: {
      cc: {
        required,
      },
      cc_name: {
        required,
      },
      idgl: {
        required,
      },
      tgl: {
        required,
      },
      coa_code: {
        required,
      },
      amount_debet: {
        required,
      },
      amount_kredit: {
        required,
      },
      remark: {
        required,
      },
      identitas_transaksi: {
        required,
      },
      type_penerima_id: {
        required,
      },
      penerima_id: {
        required,
      },
      penerima_name: {
        required,
      },
      sub_type_penerima_id: {
        required,
      },
      sub_penerima_id: {
        required,
      },
      sub_penerima_name: {
        required,
      },
    },
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.checkStorage();
    // this.getOptions();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    checkIfValid(fieldName) {
      const field = this.$v.is_data[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    checkIfValid2(fieldName) {
      const field = this.$v.sub_data[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },

    async checkStorage() {
      if (localStorage.getItem("jnl_dt") !== null) {
        let x = await localStorage.getItem("jnl_dt");
        await this.getDatas(x);
        await localStorage.removeItem("jnl_dt");
      }
    },

    async getDatas(x) {
      try {
        let id = JSON.parse(x)
        let res = await this.$_api.post("transaksi/detailsById/" + x);
        if (res.message === "sukses") {
          this.items_sub = res.data;
          for (let i = 0; i < this.items_sub.length; i++) {
            const el = this.items_sub[i];
            el.no = i + 1;
            el.tgl_sync = this.formatTanggal(el.tgl_sync);
          }
        } else {
          throw res.data;
        }
      } catch (err) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },
    async getOptions() {
      try {
        let res = await this.$_api.post("subTransaksi/list");
        if (res.message === "sukses") {
          this.items = res.data;
          console.log(this.items);
          for (let i = 0; i < this.items.length; i++) {
            const el = this.items[i];
            el.no = i + 1;
            el.tgl_sync = this.formatTanggal(el.tgl_sync);
          }
        } else {
          throw res.data;
        }
      } catch (err) {
        this.triggerAlert({
          variant: "danger",
          msg: _.toUpper(err.message ? err.message : err),
          showing: true,
        });
      }
    },

    formatTanggal(params) {
      let tgl_fmt = moment(params).format("DD-MM-YYYY HH:mm:ss");
      return tgl_fmt;
    },

    resetButton() {
      this.list_mutasi.gudang_sumber = "";
      this.getDatas();
    },

    triggerAlert(event) {
      let vm = this;
      vm.$store.commit("set_alert", event);
    },
  },
};
</script>
