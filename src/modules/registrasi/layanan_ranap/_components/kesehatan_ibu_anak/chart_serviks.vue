<template>
    <div>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h6 class="custom-title">Pembukaan Serviks</h6>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <canvas ref="serviks"></canvas >
      </b-col>
      
    </div>
    
  </template>
     
     <script>
     // import { Line as garis } from 'vue-chartjs/legacy'
     
     import {
       Chart as ChartJS,
       CategoryScale,
       LinearScale,
       PointElement,
       LineElement,
       Title,
       Tooltip,
       Legend,
       TimeScale,
       LineController
     } from 'chart.js'
     import 'chartjs-adapter-moment';
     ChartJS.register(Title, Tooltip, Legend, LineController, PointElement,LineElement, CategoryScale, LinearScale, TimeScale)
     
     export default {
       name: 'serviks',
      
     mounted(){
      this.chartnya = new ChartJS(this.$refs.serviks, {
            type: 'line',
            data: {
                datasets: [
                  {
                    lineTension: 0,
                    labelColor: 'black',
                    label: 'Waspada',
                    data: this.data_waspada,
                  borderColor: 'blue',
                  borderWidth: 2,
                  pointBorderWidth: 5,
                  pointHoverRadius: 10,
                  pointHoverBorderWidth: 0,
                  pointRadius: 0,
                  datalabels: {
                      display:false
                  }
                },
                {
                  lineTension: 0,
                  labelColor: 'black',
                  label: 'Bertindak',
                    data: this.data_bertindak,
                  borderColor: 'red',
                  borderWidth: 2,
                  pointBorderWidth: 5,
                  pointHoverRadius: 10,
                  pointHoverBorderWidth: 0,
                  pointRadius: 0,
                  datalabels: {
                      display:false
                    }
                },
                {
                  lineTension: 0,
                  labelColor: 'black',
                  label: 'Besar Pembukaan',
                    data: this.data_pembukaan,
                  borderColor: 'green',
                  borderWidth: 2,
                  pointBorderWidth: 5,
                  pointHoverRadius: 10,
                  pointHoverBorderWidth: 0,
                  pointRadius: 3,
                  datalabels: {
                      display:false
                  }
                },
                {
                  lineTension: 0,
                  labelColor: 'black',
                  label: 'Besar Penurunan',
                    data: this.data_penurunan,
                  borderColor: 'brown',
                  borderWidth: 2,
                  pointBorderWidth: 5,
                  pointHoverRadius: 10,
                  pointHoverBorderWidth: 0,
                  pointRadius: 3,
                  datalabels: {
                      display:false
                  }
                }
              ]
            },
            options: {
              animation: {
                  duration: 0
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                      fontColor: 'grey',
                      boxWidth: 10
                  }
                },
              },
              scales: {
                x: {
                  type: 'time',
                  min: this.jam_awal,//iso diganti moment contoh e  moment('2023-10-20 00:00')
                  max: this.jam_akhir,//iso diganti moment contoh e  moment('2023-10-20 00:00').add(17, 'hours')
                position: 'top',
                  time: {
                    unit: 'hour',
                    paser: 'HH:mm',
                    displayFormats: {
                    hour: "HH:mm"
                }
                  },
                  grid:{
                    color:"black"
                  },
                },
                y: {
                  grid:{
                    color:"black"
                  },
                  min: 0,
                  max: 10,
                
                }
              },
              
            }
          });
     },
      data() {
        return {
          data_waspada: [
            // {x: '2021-11-06 00:00', y: 4},
            // {x: '2021-11-06 01:00', y: 5},
            // {x: '2021-11-06 02:00', y: 6},
            // {x: '2021-11-06 03:00', y: 7},
            // {x: '2021-11-06 04:00', y: 8},
            // {x: '2021-11-06 05:00', y: 9},
            // {x: '2021-11-06 06:00', y: 10},
          ],
          data_bertindak: [
            // {x: '2021-11-06 04:00', y: 4},
            // {x: '2021-11-06 05:00', y: 5},
            // {x: '2021-11-06 06:00', y: 6},
            // {x: '2021-11-06 07:00', y: 7},
            // {x: '2021-11-06 08:00', y: 8},
            // {x: '2021-11-06 09:00', y: 9},
            // {x: '2021-11-06 10:00', y: 10},
          ],
          data_pembukaan: [],
          data_penurunan: [],
          jam_awal: '2021-11-06 00:00',
          jam_akhir: '2021-11-06 17:00',
          chartnya: null,
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
              this.getData()
            }
          }
        },
        reload(newVal, oldVal){
          if(newVal != oldVal){
            if(newVal == "serviks"){
              this.getData()
            }
          }
        },
      },
      methods: {
        getData(){
          let vm = this
          vm.$axios.post("/pembukaan_serviks/list", {partograf_id:vm.partograf_id})
          .then((res) => {
            if(res.data.data.length){
              // console.log(res.data.data, 'serviksssssssssss');
              vm.$store.commit('set_reload', null)
              let awal = `${vm.$moment(res.data.data[0].tanggal_periksa).format("YYYY-MM-DD")} ${res.data.data[0].jam_periksa}`
              vm.chartnya.options.scales.x.min = vm.$moment(awal).format("YYYY-MM-DD HH:mm")
              vm.chartnya.options.scales.x.max = vm.$moment(awal).add(17, 'hours').format("YYYY-MM-DD HH:mm")
              // vm.data_waspada = []
              // for (let i = 0; i < 7; i++) {
              //   let y = 4
              //   let tampung = {}
              //   tampung.x = vm.$moment(awal).add(i, 'hours').format("YYYY-MM-DD HH:mm")
              //   tampung.y = y + i
              //   vm.data_waspada.push(tampung)
              // }
              // vm.chartnya.data.datasets[0].data = vm.data_waspada
              // let jam_bertindak = vm.$moment(awal).add(4, 'hours').format("YYYY-MM-DD HH:mm")
              // vm.data_bertindak = []
              // for (let i = 0; i < 7; i++) {
              //   let y = 4
              //   let tampung = {}
              //   tampung.x = vm.$moment(jam_bertindak).add(i, 'hours').format("YYYY-MM-DD HH:mm")
              //   tampung.y = y + i
              //   vm.data_bertindak.push(tampung)
              // }
              vm.chartnya.data.datasets[1].data = vm.data_bertindak
              vm.data_pembukaan= []
              vm.data_penurunan= []
              for (let i = 0; i < res.data.data.length; i++) {
                let x = res.data.data[i];
                let tampung_pembukaan = {}
                let tampung_penurunan = {}
                tampung_pembukaan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
                tampung_penurunan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
                tampung_pembukaan.y = x.besar_pembukaan
                tampung_penurunan.y = x.besar_penurunan
                vm.data_pembukaan.push(tampung_pembukaan)
                vm.data_penurunan.push(tampung_penurunan)
              }
              vm.chartnya.data.datasets[2].data = vm.data_pembukaan
              vm.chartnya.data.datasets[3].data = vm.data_penurunan
              vm.chartnya.update()
              
            }
          })
          .catch((err) => {
            vm.$store.commit('set_alert', {variant: 'danger', msg: err.message, showing: true})
          })
        },
        createChart(){
          
        }
      },
      
     }
     </script>
     <style>
     
   </style>