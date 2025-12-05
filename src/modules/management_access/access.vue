<template>
  <div>
    <b-container fluid>
      <div class="container mt-3">
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <s-input v-model="role_id" :item="role_id_form" />
            </div>

            <div>
              <DualListBox :titleFirst="'Pengguna yang belum masuk ke role'" :titleSecond="'Pengguna yang sudah masuk ke role'" :source="source" :destination="destination" v-on:onChangeList="onChangeList"/>
              <div class="row p-2">

                <div class="col-sm-12">
                  <div class="btn-action select-all" @click="save()">Simpan</div>
                </div>

                <div class="col-sm-6">
                  <pre>{{source}}</pre>
                </div>
                <div class="col-sm-6">
                  <pre>{{destination}}</pre>
                </div>
              </div>
              <div class="btn btn-primary" @click="display">Logging</div>
            </div>

          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";

import DualListBox from "@/components/DualListBox/DualListBox.vue";
// import sInput from "@/components/SingleInput/SingleInput.vue";

export default {
  components: {
    DualListBox,
    // sInput
  },
  name: "access",
  watch: {
    role_id: function() {
      this.getAccess();
    }
  },
  data() {
    return {
      busy: false,
      
      role_id: "",
      role_id_form: {
        label: "Pilih Hak Akses",
        type: "lookup-radio",
        placeholder: 'Isi Pilih Hak Akses',
        api: "roles",
        pointer: {
          code: "id",
          display: ["name"]
        }
      },
      source: [
      ],
      destination: [
      ],
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    save() {
      let vm = this;
      vm.busy = true;
      let data = {user_ids: []};

      this.destination.forEach(element => {
        console.log(element);
        data.user_ids.push(element.id);
      });
      
      axios
        .post(ipBackend + "roles/registerUserAccess/"+this.role_id, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "sukses") {
            vm.busy = false;
            vm.$store.commit("set_alert", {
              variant: "success",
              msg: "BERHASIL MENDAFTARKAN AKSES PENGGUNA",
              showing: true,
            });
          } else {
            vm.busy = false;
            vm.$store.commit("set_alert", {
              variant: "danger",
              msg: _.toUpper(res.data.message),
              showing: true,
            });
          }
        })
        .catch((err) => {
          vm.button = "Simpan";
          vm.busy = false;
          vm.$emit("alertFromChild", {
            variant: "danger",
            msg: "TERJADI KESALAHAN PADA SERVER",
            showing: true,
          });
        });
    },
    async getAccess() {
      try {
        this.tableBusy = true;
        let bank = await axios.get(ipBackend + "roles/getUserAccess/" + this.role_id);

        if (bank.data) {
          console.log(bank.data)
          if(bank.data.data.unselected.list) {
            this.source = bank.data.data.unselected.list;
          }
          if(bank.data.data.selected.list) {
            this.destination = bank.data.data.selected.list;
          }
          console.log(this.source)
        } else {
          throw bank.data;
        }
      } catch (err) {
        if (err.message) {
          this.triggerAlert({
            variant: "danger",
            msg: _.toUpper(err.message),
            showing: true,
          });
        } else
          this.triggerAlert({
            variant: "danger",
            msg: _.toUpper(err),
            showing: true,
          });
      } finally {
        this.tableBusy = false;
      }
    },
    display: function() {
      console.log('role_id', this.role_id);
      console.log("source", this.source);
      console.log("destination", this.destination);
    },
    onChangeList: function({ source, destination }) {
      this.source = source;
      this.destination = destination;
    }
  }

};
</script>
