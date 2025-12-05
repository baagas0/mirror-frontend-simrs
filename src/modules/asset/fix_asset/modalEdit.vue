<template>
    <div>
      <b-modal
        id="modal-edit"
        size="lg"
        centered
        title="Edit Data Fix Asset"
        header-bg-variant="warning"
        header-text-variant="light"
        @hidden="tutupModal"
      >
      <b-form>
            <label>
              Nama <span class="text-danger">*</span>
            </label>
            <b-form-input
              :state="checkIfValid('name')"
              type="text"
              v-model="$v.is_data.name.$model"
            ></b-form-input>
          <b-row class="pt-2">
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    IDGL <span class="text-danger">*</span>
                </label>
                <b-form-input
                    :state="checkIfValid('idgl')"
                    type="text"
                    v-model="$v.is_data.idgl.$model"
                ></b-form-input>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Kode <span class="text-danger">*</span>
                </label>
                <b-form-input
                    :state="checkIfValid('code')"
                    type="text"
                    v-model="$v.is_data.code.$model"
                ></b-form-input>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    No.Faktur <span class="text-danger">*</span>
                </label>
                <b-form-input
                    :state="checkIfValid('nofaktur')"
                    type="text"
                    v-model="$v.is_data.nofaktur.$model"
                ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Tgl. Pembelian <span class="text-danger">*</span>
                </label>
                <date-picker
                    style="width: 100%"
                    id="tglbeli"
                    format="YYYY-MM-DD"
                    :state="checkIfValid('tgl_pembelian')"
                    v-model="$v.is_data.tgl_pembelian.$model"
                    :placeholder="tglPembelian"
                ></date-picker>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Tgl. Pemakaian <span class="text-danger">*</span>
                </label>
                <date-picker
                    style="width: 100%"
                    id="tanggal"
                    format="YYYY-MM-DD"
                    :state="checkIfValid('tgl_pemakaian')"
                    v-model="$v.is_data.tgl_pemakaian.$model"
                    :placeholder="tglPemakaian"
                ></date-picker>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Tgl. Akhir Penyusutan <span class="text-danger">*</span>
                </label>
                <date-picker
                    style="width: 100%"
                    id="tanggal"
                    format="YYYY-MM-DD"
                    :state="checkIfValid('tgl_akhirpenyusutan')"
                    v-model="$v.is_data.tgl_akhirpenyusutan.$model"
                    :placeholder="tglPenyusutan"
                ></date-picker>
            </b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col cols="6" md="6" sm="6" lg="6">
                <label>
                    Perkiraan Umur (Tahun) <span class="text-danger">*</span>
                </label>
                <b-form-input
                    :state="checkIfValid('perkiraan_umur_thn')"
                    type="text"
                    v-model="$v.is_data.perkiraan_umur_thn.$model"
                ></b-form-input>
            </b-col>
            <b-col cols="6" md="6" sm="6" lg="6">
                <label>
                    Perkiraan Umur (Bulan) <span class="text-danger">*</span>
                </label>
                <b-form-input
                    :state="checkIfValid('perkiraan_umur_bln')"
                    type="text"
                    v-model="$v.is_data.perkiraan_umur_bln.$model"
                ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Nilai Sisa Ditaksir
                </label>
                <b-form-input
                    type="number"
                    v-model="is_data.nilai_sisaditaksir"
                ></b-form-input>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Nilai Asset
                </label>
                <b-form-input
                    type="number"
                    v-model="is_data.nilai_asset"
                ></b-form-input>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Nilai Penyusutan
                </label>
                <b-form-input
                    type="number"
                    v-model="is_data.nilai_penyusutan"
                ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Total Penyusutan
                </label>
                <b-form-input
                    type="number"
                    v-model="is_data.total_penyusutan"
                ></b-form-input>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Total Cicilan
                </label>
                <b-form-input
                    type="number"
                    v-model="is_data.total_cicilan"
                ></b-form-input>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Sisa Pembayaran
                </label>
                <b-form-input
                    type="number"
                    v-model="is_data.sisa_pemby"
                ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Asset Berwujud
                </label>
                <b-form-select
                    :options="options"
                    v-model="is_data.is_asetberwujud"
                ></b-form-select>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Perhitungan Susut
                </label>
                <b-form-select
                    :options="options"
                    v-model="is_data.is_perhitungansusut"
                ></b-form-select>
            </b-col>
            <b-col cols="4" md="4" sm="4" lg="4">
                <label>
                    Status
                </label>
                <b-form-select
                    :options="options_status"
                    v-model="is_data.status"
                ></b-form-select>
            </b-col>
          </b-row>
            <label class="pt-2">
              Gudang <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.is_data.gudang_id.$model"
                :options="list_gudang"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_gudang"
                track-by="id"
                placeholder="-- Pilih Gudang --"
                :state="checkIfValid('gudang_id')"
            ></multiselect>

            <label class="pt-2">
              Produsen <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.is_data.produsen_id.$model"
                :options="list_produsen"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_produsen"
                track-by="id"
                placeholder="-- Pilih Produsen --"
                :state="checkIfValid('produsen_id')"
            ></multiselect>

            <label class="pt-2">
              Supplier <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.is_data.supplier_id.$model"
                :options="list_supplier"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="nama_supplier"
                track-by="id"
                placeholder="-- Pilih Supplier --"
                :state="checkIfValid('supplier_id')"
            ></multiselect>

            <label class="pt-2">
              Tipe Asset <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.is_data.type_asset_id.$model"
                :options="list_tipe_asset"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="name"
                track-by="id"
                placeholder="-- Pilih Tipe Asset --"
                :state="checkIfValid('type_asset_id')"
                @input="addData(is_data.type_asset_id)"
            ></multiselect>

            <label class="pt-2">
              Tingkat Asset <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.is_data.tingkatasset_id.$model"
                :options="list_tingkat_asset"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="name"
                track-by="id"
                placeholder="-- Pilih Tingkat Asset --"
                :state="checkIfValid('tingkatasset_id')"
            ></multiselect>
            <label class="pt-2">
              Keterangan
            </label>
            <b-form-textarea
                v-model="is_data.remark"
            ></b-form-textarea>
        </b-form>
  
        <template #modal-footer>
          <b-button variant="secondary" @click="$bvModal.hide('modal-edit')">
            Batal
          </b-button>
          <b-button
            variant="primary"
            :disabled="busy || !isValid"
            @click="simpan()"
          >
            {{ button }}
          </b-button>
        </template>
      </b-modal>
    </div>
  </template>
  <script>
  import _ from "lodash";
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
  import Multiselect from "vue-multiselect";
  import DatePicker from "vue2-datepicker";
  import "vue2-datepicker/index.css";
  import moment from "moment"
import { useGetAxios } from "../../../composables/useAxios";
  export default {
    name: "modalEdit",
    props: ["data_edit", "ep_be", "list_gudang", "list_produsen", "list_supplier", "list_tipe_asset", "list_tingkat_asset"],
    components: {
      Multiselect,
      DatePicker
    },
    data() {
      return {
        busy: false,
        button: "Simpan",
        is_data: {
          name: "",
          idgl: "",
          code: "",
          nofaktur: "",
          tgl_pembelian: "",
          tgl_pemakaian: "",
          tgl_akhirpenyusutan: "",
          perkiraan_umur_thn: "",
          perkiraan_umur_bln: "",
          nilai_sisaditaksir: "",
          nilai_asset: "",
          nilai_penyusutan: "",
          total_cicilan: "",
          total_penyusutan: "",
          sisa_pemby:"",
          is_asetberwujud: "",
          is_perhitungansusut: "",
          status:"1",
          gudang: "",
          produsen: "",
          supplier: "",
          tipe_asset: "",
          tingkat_asset: "",
          gudang_id: "",
          produsen_id: "",
          supplier_id: "",
          type_asset_id: "",
          coa_fixasset: "",
          coa_akumulasi: "",
          coa_bebanpenyusutan: "",
          type_fiscal_id: "",
          masa_manfaat: "",
          tarif_penyusutan: "",
          metode_penyusutan_id: "",
          tingkatasset_id: "",
          remark: "",
        },
        tglPemakaian: "",
        tglPembelian: "",
        tglPenyusutan: "",
        options:[
            {value:false, text:"Tidak"},
            {value:true, text:"Ya"},
        ],
        options_status: [
            {value:"1", text:"Aktif"},
            {value:"2", text:"Terjual"},
            {value:"3", text:"Hilang"},
            {value:"4", text:"Rusak"},
        ],
      };
    },
    computed: {
      computed_val: {
        get(){
            return this.is_data
        },
        set(newVal){
            this.is_data = newVal
        }
      },
      formString() {
        return JSON.stringify(this.is_data, null, 4);
      },
      isValid() {
        return !this.$v.is_data.$invalid;
      },
      isDirty() {
        return this.$v.is_data.$anyDirty;
      },
    },
    watch: {
        data_edit(newVal, oldVal) {
            if(newVal != oldVal && newVal){
                this.is_data = newVal;
                console.log(newVal)
                this.tglPemakaian = moment(this.is_data.tgl_pemakaian).format("YYYY-MM-DD")
                this.tglPembelian = moment(this.is_data.tgl_pembelian).format("YYYY-MM-DD")
                this.tglPenyusutan = moment(this.is_data.tgl_akhirpenyusutan).format("YYYY-MM-DD")
                for (let i = 0; i < this.list_gudang.length; i++) {
                    let x = this.list_gudang[i];
                    if(x.id == this.is_data.gudang_id){
                        this.is_data.gudang_id = x
                    }
                }
                for (let i = 0; i < this.list_produsen.length; i++) {
                    let x = this.list_produsen[i];
                    if(x.id == this.is_data.produsen_id){
                        this.is_data.produsen_id = x
                    }
                }
                for (let i = 0; i < this.list_supplier.length; i++) {
                    let x = this.list_supplier[i];
                    if(x.id == this.is_data.supplier_id){
                        this.is_data.supplier_id = x
                    }
                }
                for (let i = 0; i < this.list_tipe_asset.length; i++) {
                    let x = this.list_tipe_asset[i];
                    if(x.id == this.is_data.type_asset_id){
                        this.is_data.type_asset_id = x
                    }
                }
                for (let i = 0; i < this.list_tingkat_asset.length; i++) {
                    let x = this.list_tingkat_asset[i];
                    if(x.id == this.is_data.tingkatasset_id){
                        this.is_data.tingkatasset_id = x
                    }
                }
            }
        },

    },
  
    mixins: [validationMixin],
    validations: {
      is_data: {
        name: {
          required,
        },
        idgl: {
          required,
        },
        code: {
          required,
        },
        nofaktur: {
          required,
        },
        tgl_pembelian: {
          required,
        },
        tgl_akhirpenyusutan: {
          required,
        },
        tgl_pemakaian: {
          required,
        },
        perkiraan_umur_bln: {
          required,
        },
        perkiraan_umur_thn: {
          required,
        },
        gudang_id: {
          required,
        },
        produsen_id: {
          required,
        },
        supplier_id: {
          required,
        },
        type_asset_id: {
          required,
        },
        tingkatasset_id: {
          required,
        },
      },
    },
    methods: {
      checkIfValid(fieldName) {
        const field = this.$v.is_data[fieldName];
        if (!field.$dirty) {
          return null;
        }
        return !(field.$invalid || field.$model === "");
      },
      addData(data){
        console.log(data);
        let vm = this
        vm.is_data.type_fiscal_id = data.type_fiscal_id
        vm.is_data.coa_akumulasi = data.coa_akumulasi
        vm.is_data.coa_bebanpenyusutan = data.coa_bebanpenyusutan
        vm.is_data.coa_fixasset = data.coa_fixassets
        vm.is_data.masa_manfaat = data.type_fiscal_masa_manfaat
        vm.is_data.tarif_penyusutan = data.type_fiscal_tarif_penyusutan
        vm.is_data.metode_penyusutan_id = data.type_fiscal_metode_penyusutan_id
      },
      async simpan() {
        let vm = this;
        if (vm.isValid) {
          vm.busy = true;
          vm.button = "Mohon Tunggu";
          vm.is_data.gudang_id = vm.is_data.gudang_id.id
          vm.is_data.produsen_id = vm.is_data.produsen_id.id
          vm.is_data.supplier_id = vm.is_data.supplier_id.id
          vm.is_data.tingkatasset_id = vm.is_data.tingkatasset_id.id
          vm.is_data.type_asset_id = vm.is_data.type_asset_id.id
          // console.log(vm.is_data, 'ini data');
          // axios
          //   .post(this.ep_be + "/update", vm.is_data)
          //   .then((res) => {
          //     console.log(res, 'ini res');
          //     if (res.message == "sukses") {
          //       vm.button = "Simpan";
          //       vm.busy = false;
          //       vm.$emit("alertFromChild", {
          //         variant: "success",
          //         msg: "BERHASIL MENGUBAH DATA",
          //         showing: true,
          //       });
          //       vm.$bvModal.hide("modal-edit");
          //     } else {
          //       vm.button = "Simpan";
          //       vm.busy = false;
          //       vm.$emit("alertFromChild", {
          //         variant: "danger",
          //         msg: _.toUpper(res.message),
          //         showing: true,
          //       });
          //     }
          //   })
          //   .catch((err) => {
          //       console.log(err);
          //     vm.button = "Simpan";
          //     vm.busy = false;
          //     vm.$emit("alertFromChild", {
          //       variant: "danger",
          //       msg: "TERJADI KESALAHAN PADA SERVER",
          //       showing: true,
          //     });
          //   });
          try {
            const { res } = await useGetAxios(this.ep_be + "/update", vm.is_data)
            if (res) {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "success",
                msg: "BERHASIL MENDAFTARKAN DATA",
                showing: true,
              });
              this.$bvModal.hide("modal-input");
              this.resetModal();
            } else {
              vm.button = "Simpan";
              vm.busy = false;
              vm.$emit("alertFromChild", {
                variant: "danger",
                msg: _.toUpper(res.message),
                showing: true,
              });
            }
          } catch (err) {
            console.log(err);
            vm.button = "Simpan";
            vm.busy = false;
            vm.$emit("alertFromChild", {
              variant: "danger",
              msg: "TERJADI KESALAHAN PADA SERVER",
              showing: true,
            });
          }
        }
      },
      resetModal() {
        this.$v.$reset();
        this.is_data = {
            name: "",
          idgl: "",
          code: "",
          nofaktur: "",
          tgl_pembelian: "",
          tgl_pemakaian: "",
          tgl_akhirpenyusutan: "",
          perkiraan_umur_thn: "",
          perkiraan_umur_bln: "",
          nilai_sisaditaksir: "",
          nilai_asset: "",
          nilai_penyusutan: "",
          total_cicilan: "",
          total_penyusutan: "",
          sisa_pemby:"",
          is_asetberwujud: "",
          is_perhitungansusut: "",
          status:"1",
          gudang: "",
          produsen: "",
          supplier: "",
          tipe_asset: "",
          tingkat_asset: "",
          gudang_id: "",
          produsen_id: "",
          supplier_id: "",
          type_asset_id: "",
          coa_fixasset: "",
          coa_akumulasi: "",
          coa_bebanpenyusutan: "",
          type_fiscal_id: "",
          masa_manfaat: "",
          tarif_penyusutan: "",
          metode_penyusutan_id: "",
          tingkatasset_id: "",
          remark: "",
        };
      },
      tutupModal() {
        this.$emit("tutupModal");
      },
    },
  }
  
  </script>
  