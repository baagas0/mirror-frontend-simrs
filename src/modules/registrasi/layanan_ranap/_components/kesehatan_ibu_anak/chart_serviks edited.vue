<template>
  <div>
    <!-- <pre>{{ patograf.pembukaan_serviks }}</pre>
    <pre>{{ chartnya.data }}</pre> -->
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <h6 class="custom-title">Pembukaan Serviks</h6>
    </b-col>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <canvas ref="serviks"></canvas>
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

// eslint-disable-next-line import/first
import moment from 'moment'
// eslint-disable-next-line import/first
import 'moment-timezone';
moment.locale('id')

export default {
  name: 'serviks',
  data() {
    return {
      dateTimeToday: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      data_waspada: [
        { x: '2021-11-06 00:00', y: 4 },
        { x: '2021-11-06 01:00', y: 5 },
        { x: '2021-11-06 02:00', y: 6 },
        { x: '2021-11-06 03:00', y: 7 },
        { x: '2021-11-06 04:00', y: 8 },
        { x: '2021-11-06 05:00', y: 9 },
        { x: '2021-11-06 06:00', y: 10 },
      ],
      data_bertindak: [
        { x: '2021-11-06 04:00', y: 4 },
        { x: '2021-11-06 05:00', y: 5 },
        { x: '2021-11-06 06:00', y: 6 },
        { x: '2021-11-06 07:00', y: 7 },
        { x: '2021-11-06 08:00', y: 8 },
        { x: '2021-11-06 09:00', y: 9 },
        { x: '2021-11-06 10:00', y: 10 },
      ],
      data_pembukaan: [],
      data_penurunan: [],
      jam_awal: '2021-11-06 00:00',
      jam_akhir: '2021-11-06 17:00',
      chartnya: '',
    }
  },
  computed: {
    partograf_id() {
      return this.$store.state.partograf_id
    },
    reload() {
      return this.$store.state.reload_data
    },
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
    'patograf.pembukaan_serviks': {
      deep: true,
      handler() {
        this.getData()
      }
    }
  },
  mounted () {
    this.chartnya = new ChartJS(this.$refs.serviks, {
      type: 'line',
      data: {
        datasets: [
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
              display: false
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
              display: false
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
            grid: {
              color: "black"
            },
          },
          y: {
            grid: {
              color: "black"
            },
            min: 0,
            max: 10,

          }
        },

      }
    });

    this.getData()
  },
  methods: {
    getData() {
      let vm = this
      console.log('INIT CHART SERVIKS')
      console.log(this.patograf)

      let awal = this.patograf.pembukaan_serviks.length ? `${this.patograf.pembukaan_serviks[0].tanggal_periksa} ${this.patograf.pembukaan_serviks[0].jam_periksa}` : this.dateTimeToday;
      console.log('awal', awal)
      
      vm.chartnya.options.scales.x.min = moment.tz(awal, 'Asia/Jakarta').format("YYYY-MM-DD HH:mm")
      vm.chartnya.options.scales.x.max = moment.tz(awal, 'Asia/Jakarta').add(17, 'hours').format("YYYY-MM-DD HH:mm")

      vm.data_pembukaan = []
      vm.data_penurunan = []
      for (let i = 0; i < this.patograf.pembukaan_serviks.length; i++) {
        let x = this.patograf.pembukaan_serviks[i];
        let tampung_pembukaan = {}
        let tampung_penurunan = {}
        tampung_pembukaan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
        tampung_penurunan.x = `${vm.$moment(x.tanggal_periksa).format("YYYY-MM-DD")} ${x.jam_periksa}`
        tampung_pembukaan.y = x.besar_pembukaan
        tampung_penurunan.y = x.besar_penurunan
        vm.data_pembukaan.push(tampung_pembukaan)
        vm.data_penurunan.push(tampung_penurunan)
      }
      vm.chartnya.data.datasets[0].data = vm.data_pembukaan
      vm.chartnya.data.datasets[1].data = vm.data_penurunan
      vm.chartnya.update()
    },
    createChart() {

    }
  },

}
</script>
<style></style>