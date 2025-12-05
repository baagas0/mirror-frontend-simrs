<template>
  <div>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <h6 class="custom-title">Nadi Tekanan Darah</h6>
    </b-col>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <canvas ref="nadi_tekanan"></canvas>
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
ChartJS.register(Title, Tooltip, Legend, LineController, PointElement, LineElement, CategoryScale, LinearScale, TimeScale)

export default {
  name: 'nadi_tekanan',
  data() {
    return {
      data_tekanan_darah: [],
      data_nadi: [],
      jam_awal: '2021-11-06 00:00',
      jam_akhir: '2021-11-06 17:00',
      chartnya: null,
    }
  },
  props: {
    patograf: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  watch: {
    'patograf.tekanan_darah': {
      deep: true,
      handler() {
        this.getData()
      }
    },
    'patograf.nadi': {
      deep: true,
      handler() {
        this.getData()
      }
    }
  },
  mounted () {
    this.chartnya = new ChartJS(this.$refs.nadi_tekanan, {
      type: 'line',
      data: {
        datasets: [
          {
            lineTension: 0,
            fill: false,
            label: 'Tekanan Darah',
            labelColor: 'black',
            data: [{ "x": 1697496815000, "y": "120" }, { "x": 1697496815000, "y": "70" }, { "x": null, "y": null }, { "x": 1697982187000, "y": "130" }, { "x": 1697982187000, "y": "80" }, { "x": null, "y": null }],
            borderColor: 'black',
            borderWidth: 2,
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            datalabels: {
              align: 'top',
              borderRadius: 1,
              color: 'black',
              font: {
                weight: 'bold'
              },
            }
          },
          {
            lineTension: 0,
            fill: false,
            label: 'Nadi',
            labelColor: 'black',
            data: [{ "x": 1697496815000, "y": "70" }, { "x": 1697982187000, "y": "80" }],
            borderColor: 'blue',
            borderWidth: 2,
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            datalabels: {
              align: 'end',
              borderRadius: 1,
              color: 'blue',
              font: {
                weight: 'bold'
              },
            }
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        scales: {
          x: {
            type: 'time',
            time: {
              paser: 'HH:mm',
              unit: 'hour',
              displayFormats: {
                'hour': 'HH:mm'
              },
              min: '2021-11-06 00:00',
              max: '2021-11-06 17:00'
            },
            position: 'top',
            grid: {
              color: "black"
            },
            ticks: {
              fontColor: "black"
            }
          },
          y: {
            grid: {
              color: "black"
            },
            ticks: {
              max: 180,
              fontColor: "black",
              min: 60,
              stepSize: 10
            },
            min: 60,
            max: 200
          }
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
      }
    });

    this.getData()
  },
  methods: {

    getData() {
      let vm = this
      console.log('INIT Nadi Tekanan')
      if(this.patograf.tekanan_darah.length) {
        console.log('INIT 1 Nadi Tekanan')
        let awal = `${vm.$moment(this.patograf.tekanan_darah[0].tanggal_periksa).format("YYYY-MM-DD")} 00:00`
        // vm.jam_awal = vm.$moment(awal).format("YYYY-MM-DD HH:mm")
        // vm.jam_akhir = vm.$moment(awal).add(17, 'hours').format("YYYY-MM-DD HH:mm")
        // console.log(awal, 'ini tgl awal');
        vm.chartnya.options.scales.x.min = vm.$moment(awal).format("YYYY-MM-DD HH:mm")
        vm.chartnya.options.scales.x.max = vm.$moment(awal).add(17, 'hours').format("YYYY-MM-DD HH:mm")
        vm.data_tekanan_darah = []
        for (let i = 0; i < this.patograf.tekanan_darah.length; i++) {
          let x = this.patograf.tekanan_darah[i];
          console.log('x', x)
          let tampung_tekanan = {}
          tampung_tekanan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
          tampung_tekanan.y = x.sistole
          vm.data_tekanan_darah.push(tampung_tekanan)
          
          // tampung_tekanan = {}
          // tampung_tekanan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
          // tampung_tekanan.y = x.diastole
          // vm.data_tekanan_darah.push(tampung_tekanan)
          // tampung_tekanan = {}
          // tampung_tekanan.x = null
          // tampung_tekanan.y = null
          // vm.data_tekanan_darah.push(tampung_tekanan)
        }
        vm.chartnya.data.datasets[0].data = vm.data_tekanan_darah;
  
        vm.data_nadi = []
        for (let i = 0; i < this.patograf.nadi.length; i++) {
          let x = this.patograf.nadi[i];
          console.log('xx', x)
          let tampung_tekanan = {}
          tampung_tekanan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
          tampung_tekanan.y = x.total_denyut
          vm.data_nadi.push(tampung_tekanan)
        }
        vm.chartnya.data.datasets[1].data = vm.data_nadi;
        console.log(vm.chartnya.data.datasets[1].data, 'aaaaaaaaaaaaa');
        vm.chartnya.update()
      }
      
    },
  },
}
</script>
<style>
.table-nadi td {
  border: 1px solid #555 !important;
  padding: 5px 10px !important;
}
</style>