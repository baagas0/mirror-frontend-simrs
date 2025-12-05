<template>
  <div>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <h6 class="custom-title">Denyut Jantung Janin</h6>
    </b-col>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <canvas ref="jantung_bayi"></canvas>
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
  name: 'jantung_bayi',
  data() {
    return {
      data_detak_jantung: [],
      jam_awal: '2021-11-06 00:00',
      jam_akhir: '2021-11-06 17:00',
      chartnya: '',
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
  computed: {
    // partograf_id() {
    //   return this.$store.state.partograf_id
    // },
    // reload() {
    //   return this.$store.state.reload_data
    // },
  },
  watch: {
    'patograf.detak_jantung_janin': {
      deep: true,
      handler() {
        this.getData()
      }
    }
  },
  mounted () {
    this.chartnya = new ChartJS(this.$refs.jantung_bayi, {
      type: 'line',
      data: {
        datasets: [
          {
            lineTension: 0,
            labelColor: 'black',
            label: 'Detak Jantung Janin (x/menit)',
            data: [{ x: '2024-01-29 01:01', y:'87' }],
            borderColor: 'black',
            borderWidth: 2,
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 0,
            pointRadius: 4,
            datalabels: {
              display: false
            }
          },

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
            min: "2024-01-29 00:00:00",//iso diganti moment contoh e  moment('2024-01-29 00:00')
            max: "2024-01-29 17:00:00",//iso diganti moment contoh e  moment('2024-01-29 00:00').add(17, 'hours')
            position: 'top',
            time: {
              unit: 'hour',
              paser: 'HH:mm',
              displayFormats: {
                hour: "HH:mm"
              }
            },
            grid: {
              color: "black"
            },
          },
          y: {
            grid: {
              color: "black"
            },
            min: 80,
            max: 200,

          }
        },

      }
    });
    // this.getData()
  },
  methods: {
    getData() {
      let vm = this
      console.log('INIT CHART DENYUT JANTUNG JANIN',this.patograf.detak_jantung_janin)
      if (this.patograf.detak_jantung_janin.length) {
        // console.log(this.patograf.detak_jantung_janin, 'detak jantung');
        let awal = `${vm.$moment(this.patograf.detak_jantung_janin[0].tanggal_periksa).format("YYYY-MM-DD")} ${this.patograf.detak_jantung_janin[0].jam_periksa}`
        // vm.jam_awal = vm.$moment(awal).format("YYYY-MM-DD HH:mm")
        // vm.jam_akhir = vm.$moment(awal).add(17, 'hours').format("YYYY-MM-DD HH:mm")

        vm.chartnya.options.scales.x.min = vm.$moment(awal).format("YYYY-MM-DD HH:mm")
        vm.chartnya.options.scales.x.max = vm.$moment(awal).add(17, 'hours').format("YYYY-MM-DD HH:mm")
        vm.data_detak_jantung = []
        for (let i = 0; i < this.patograf.detak_jantung_janin.length; i++) {
          let x = this.patograf.detak_jantung_janin[i];
          let tampung_pembukaan = {}
          tampung_pembukaan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
          tampung_pembukaan.y = x.frekuensi_ddj
          vm.data_detak_jantung.push(tampung_pembukaan)
        }

        vm.chartnya.data.datasets[0].data = vm.data_detak_jantung;
        // console.log(vm.chartnya, 'aaaaaaaaaaaaa');
        console.log('vm.chartnya.data.datasets[0].data', vm.chartnya.data.datasets[0].data)
        vm.chartnya.update()
      }
    },
  },
}
</script>

<style>
.denyut-jatung-janin td {
  border: 1px solid #555 !important;
  padding: 5px 10px !important;
}
</style>
   