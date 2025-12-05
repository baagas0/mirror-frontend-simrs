<template>
    <div>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <b-table-simple bordered responsive class="denyut-jatung-janin">
            <b-tbody>
              <b-tr v-for="(item, idx) in data_penyusupan" :key="idx">
                <b-td style="min-width:120px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">{{ item.text }}</b-td>
                <b-td><b>{{ item.satu }}</b></b-td>
                <b-td><b>{{ item.dua }}</b></b-td>
                <b-td><b>{{ item.tiga }}</b></b-td>
                <b-td><b>{{ item.empat }}</b></b-td>
                <b-td><b>{{ item.lima }}</b></b-td>
                <b-td><b>{{ item.enam }}</b></b-td>
                <b-td><b>{{ item.tujuh }}</b></b-td>
                <b-td><b>{{ item.delapan }}</b></b-td>
                <b-td><b>{{ item.sembilan }}</b></b-td>
                <b-td><b>{{ item.sepuluh }}</b></b-td>
                <b-td><b>{{ item.sebelas }}</b></b-td>
                <b-td><b>{{ item.duabelas }}</b></b-td>
                <b-td><b>{{ item.tigabelas }}</b></b-td>
                <b-td><b>{{ item.empatbelas }}</b></b-td>
                <b-td><b>{{ item.limabelas }}</b></b-td>
                <b-td><b>{{ item.enambelas }}</b></b-td>
                <b-td><b>{{ item.tujuhelas }}</b></b-td>
                <b-td><b>{{ item.delapanbelas }}</b></b-td>
                <b-td><b>{{ item.sembilanbelas }}</b></b-td>
                <b-td><b>{{ item.duapuluh }}</b></b-td>
                <b-td><b>{{ item.duasatu }}</b></b-td>
                <b-td><b>{{ item.duadua }}</b></b-td>
                <b-td><b>{{ item.duatiga }}</b></b-td>
                <b-td><b>{{ item.duaempat }}</b></b-td>
                <b-td><b>{{ item.dualima }}</b></b-td>
                <b-td><b>{{ item.duaenam }}</b></b-td>
                <b-td><b>{{ item.duatujuh }}</b></b-td>
                <b-td><b>{{ item.dualapan }}</b></b-td>
                <b-td><b>{{ item.duasembilan }}</b></b-td>
                <b-td><b>{{ item.tigapuluh }}</b></b-td>
              </b-tr>

                <!-- <b-tr>
                <b-td style="border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">Penyusupan</b-td>
                <b-td>1</b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                <b-td></b-td>
                </b-tr> -->
            </b-tbody>
            </b-table-simple>
        </b-col>
    </div>
  
  </template>
  
  <script>

  export default {
    name: 'tabeldenyut',
   
    components:{

    },
    data() {
      return {
        data_penyusupan: [
          {text:'Air Ketuban', satu:null, dua:null, tiga:null, empat:null,lima:null, enam:null,tujuh:null, delapan:null,sembilan:null, sepuluh:null, sebelas:null, duabelas:null,tigabelas:null, empatbelas:null,limabelas:null, enambelas:null,tujuhbelas:null, delapanbelas:null,sembilanbelas:null, duapuluh:null, duasatu:null, duadua:null,duatiga:null, duaempat:null,dualima:null, duaenam:null,duatujuh:null, dualapan:null,duasembilan:null, tigapuluh:null},
          {text:'Penyusupan', satu:null, dua:null, tiga:null, empat:null,lima:null, enam:null,tujuh:null, delapan:null,sembilan:null, sepuluh:null, sebelas:null, duabelas:null,tigabelas:null, empatbelas:null,limabelas:null, enambelas:null,tujuhbelas:null, delapanbelas:null,sembilanbelas:null, duapuluh:null, duasatu:null, duadua:null,duatiga:null, duaempat:null,dualima:null, duaenam:null,duatujuh:null, dualapan:null,duasembilan:null, tigapuluh:null},
        ],
      }
    },
    computed: {
        partograf_id(){
          return this.$store.state.partograf_id
        },
        reload(){
          return this.$store.state.reload_data
        },
      },
      watch: {
        partograf_id(newVal, oldVal){
          if(newVal != oldVal){
            if(newVal){
              this.getDataPenyusupan()
            }
          }
        },
        reload(newVal, oldVal){
          if(newVal != oldVal){
            if(newVal == "penyusupan"){
              this.getDataPenyusupan()
            }
          }
        },
      },
      methods: {
        getDataPenyusupan(){
          
          let vm = this
          vm.$axios.post("/warna_air/list_warna_air_penyusupan", {partograf_id:vm.partograf_id})
          .then((res) => {
            if(res.data.data.length){
              // console.log(res.data.data, 'penyusupann');
              vm.$store.commit('set_reload', null)
              let warna_air = res.data.data[0].warna_air
              let penyusupan = res.data.data[0].penyusupan
              for (let i = 0; i < warna_air.length; i++) {
                let x = warna_air[i];
                if(i+1 == 1){
                  vm.data_penyusupan[0].satu = x.kode_warna_air
                }else if(i+1 == 2){
                  vm.data_penyusupan[0].dua = x.kode_warna_air
                }else if(i+1 == 3){
                  vm.data_penyusupan[0].tiga = x.kode_warna_air
                }else if(i+1 == 4){
                  vm.data_penyusupan[0].empat = x.kode_warna_air
                }else if(i+1 == 5){
                  vm.data_penyusupan[0].lima = x.kode_warna_air
                }else if(i+1 == 6){
                  vm.data_penyusupan[0].enam = x.kode_warna_air
                }else if(i+1 == 7){
                  vm.data_penyusupan[0].tujuh = x.kode_warna_air
                }else if(i+1 == 8){
                  vm.data_penyusupan[0].delapan = x.kode_warna_air
                }else if(i+1 == 9){
                  vm.data_penyusupan[0].sembilan = x.kode_warna_air
                }else if(i+1 == 10){
                  vm.data_penyusupan[0].sepuluh = x.kode_warna_air
                }else if(i+1 == 11){
                  vm.data_penyusupan[0].sebelas = x.kode_warna_air
                }else if(i+1 == 12){
                  vm.data_penyusupan[0].duabelas = x.kode_warna_air
                }else if(i+1 == 13){
                  vm.data_penyusupan[0].tigabelas = x.kode_warna_air
                }else if(i+1 == 14){
                  vm.data_penyusupan[0].empatbelas = x.kode_warna_air
                }else if(i+1 == 15){
                  vm.data_penyusupan[0].limabelas = x.kode_warna_air
                }else if(i+1 == 16){
                  vm.data_penyusupan[0].enambelas = x.kode_warna_air
                }else if(i+1 == 17){
                  vm.data_penyusupan[0].tujuhbelas = x.kode_warna_air
                }else if(i+1 == 18){
                  vm.data_penyusupan[0].delapanbelas = x.kode_warna_air
                }else if(i+1 == 19){
                  vm.data_penyusupan[0].sembilanbelas = x.kode_warna_air
                }else if(i+1 == 20){
                  vm.data_penyusupan[0].duapuluh = x.kode_warna_air
                }else if(i+1 == 21){
                  vm.data_penyusupan[0].duasatu = x.kode_warna_air
                }else if(i+1 == 22){
                  vm.data_penyusupan[0].duadua = x.kode_warna_air
                }else if(i+1 == 23){
                  vm.data_penyusupan[0].duattiga = x.kode_warna_air
                }else if(i+1 == 24){
                  vm.data_penyusupan[0].duaempat = x.kode_warna_air
                }else if(i+1 == 25){
                  vm.data_penyusupan[0].dualima = x.kode_warna_air
                }else if(i+1 == 26){
                  vm.data_penyusupan[0].duaenam = x.kode_warna_air
                }else if(i+1 == 27){
                  vm.data_penyusupan[0].duatujuh = x.kode_warna_air
                }else if(i+1 == 28){
                  vm.data_penyusupan[0].dualapan = x.kode_warna_air
                }else if(i+1 == 29){
                  vm.data_penyusupan[0].duasembilan = x.kode_warna_air
                }else if(i+1 == 30){
                  vm.data_penyusupan[0].tigapuluh = x.kode_warna_air
                }
              }
              for (let i = 0; i < penyusupan.length; i++) {
                let x = penyusupan[i];
                if(i+1 == 1){
                  vm.data_penyusupan[1].satu = x.kode_penyusupan
                }else if(i+1 == 2){
                  vm.data_penyusupan[1].dua = x.kode_penyusupan
                }else if(i+1 == 3){
                  vm.data_penyusupan[1].tiga = x.kode_penyusupan
                }else if(i+1 == 4){
                  vm.data_penyusupan[1].empat = x.kode_penyusupan
                }else if(i+1 == 5){
                  vm.data_penyusupan[1].lima = x.kode_penyusupan
                }else if(i+1 == 6){
                  vm.data_penyusupan[1].enam = x.kode_penyusupan
                }else if(i+1 == 7){
                  vm.data_penyusupan[1].tujuh = x.kode_penyusupan
                }else if(i+1 == 8){
                  vm.data_penyusupan[1].delapan = x.kode_penyusupan
                }else if(i+1 == 9){
                  vm.data_penyusupan[1].sembilan = x.kode_penyusupan
                }else if(i+1 == 10){
                  vm.data_penyusupan[1].sepuluh = x.kode_penyusupan
                }else if(i+1 == 11){
                  vm.data_penyusupan[1].sebelas = x.kode_penyusupan
                }else if(i+1 == 12){
                  vm.data_penyusupan[1].duabelas = x.kode_penyusupan
                }else if(i+1 == 13){
                  vm.data_penyusupan[1].tigabelas = x.kode_penyusupan
                }else if(i+1 == 14){
                  vm.data_penyusupan[1].empatbelas = x.kode_penyusupan
                }else if(i+1 == 15){
                  vm.data_penyusupan[1].limabelas = x.kode_penyusupan
                }else if(i+1 == 16){
                  vm.data_penyusupan[1].enambelas = x.kode_penyusupan
                }else if(i+1 == 17){
                  vm.data_penyusupan[1].tujuhbelas = x.kode_penyusupan
                }else if(i+1 == 18){
                  vm.data_penyusupan[1].delapanbelas = x.kode_penyusupan
                }else if(i+1 == 19){
                  vm.data_penyusupan[1].sembilanbelas = x.kode_penyusupan
                }else if(i+1 == 20){
                  vm.data_penyusupan[1].duapuluh = x.kode_penyusupan
                }else if(i+1 == 21){
                  vm.data_penyusupan[1].duasatu = x.kode_penyusupan
                }else if(i+1 == 22){
                  vm.data_penyusupan[1].duadua = x.kode_penyusupan
                }else if(i+1 == 23){
                  vm.data_penyusupan[1].duattiga = x.kode_penyusupan
                }else if(i+1 == 24){
                  vm.data_penyusupan[1].duaempat = x.kode_penyusupan
                }else if(i+1 == 25){
                  vm.data_penyusupan[1].dualima = x.kode_penyusupan
                }else if(i+1 == 26){
                  vm.data_penyusupan[1].duaenam = x.kode_penyusupan
                }else if(i+1 == 27){
                  vm.data_penyusupan[1].duatujuh = x.kode_penyusupan
                }else if(i+1 == 28){
                  vm.data_penyusupan[1].dualapan = x.kode_penyusupan
                }else if(i+1 == 29){
                  vm.data_penyusupan[1].duasembilan = x.kode_penyusupan
                }else if(i+1 == 30){
                  vm.data_penyusupan[1].tigapuluh = x.kode_penyusupan
                }
              }
            }
          })
          .catch((err) => {
            vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
          })
        },
      },
  }
  </script>
  <style scoped>
    .table-serviks td{
     border:1px solid #555 !important;
     padding:5px 10px !important;
   }
  </style>