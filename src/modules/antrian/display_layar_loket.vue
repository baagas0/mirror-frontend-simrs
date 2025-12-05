<template lang="">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light bg-success mb-3 h-70px container-fluid d-flex flex-row justify-content-between" style="border-bottom: 1px solid #858585;">

        <h2 class="font-size-h2 text-dark font-weight-bolder" href="#">RSUD BUTON SELATAN : ANTRIAN LOKET</h2>
        <h2 class="font-size-h2 text-dark font-weight-bolder" href="#">{{ dateTodayId }}</h2>

    
    </nav>

    <div class="container-fluid">
      <div class="row mb-12">
        <div class="col-9">
          <div class="video-container mr-9">
            <iframe
              src="https://www.youtube.com/embed/-q2-UNIs9dc?si=XShMu_Icp0A_Wioa"
              frameborder="0"
              controls="0"
              allowfullscreen></iframe>
          </div>
        </div>
        <div class="col-3">
          <div class="card card-custom ml-auto">
              <!--begin::Card Body-->
              <div class="card-body px-12 py-10 text-center">
                <!-- <pre>{{antrian_aktif}}</pre> -->
                  <h3 class="font-weight-bolder font-size-h2 mb-1"><a href="#" class="text-dark-50">NO ANTRIAN</a></h3>
                  <div class="text-dark-50 font-weight-bolder mb-12" style="font-size: 90px">{{ antrian_aktif.no_proses || '-' }}</div>

                  <h3 class="font-weight-bolder font-size-h2 mb-1"><a href="#" class="text-dark-50">LOKET</a></h3>
                  <div class="text-dark-50 font-weight-bolder mb-12" style="font-size: 90px">{{ antrian_aktif.loketnya || '-' }}</div>

                  <!--begin::Info-->
                  <!-- <div class="d-flex mb-6">
                      <span class="text-dark-50 flex-root font-weight-bold">Admin</span>
                      <span class="text-dark flex-root font-weight-bold">Admin</span>
                  </div> -->
                  <!--end::Info-->
              </div>
              <!--end::Card Body-->
          </div>
        </div>
      </div>
      <div v-if="isLoadingLoket"></div>
      <div v-else-if="!loketAfter || loketAfter.length == 0"></div>
      <div v-else class="row">
        <!-- <pre>{{loket}}</pre> -->
        <div class="col-3" v-for="(item, i) in loketAfter" :key="i">
          <div class="card card-custom text-center">
            <div class="card-header">
              <div class="card-title text-center w-100">
                <h3 class="card-label font-size-h2 font-weight-bolder w-100">LOKET {{ item.nama_loket }}</h3>
              </div>
            </div>
            <div class="card-body min-h-150px">
            <h3 class="font-weight-bolder text-dark-50 mb-1" style="font-size: 90px">{{ item.no_proses }}</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('id')

export default {
  name: 'display_layar_loket',
  data() {
    return {
      config: 'abc',
      loket: [],
      loketAfter: [],
      antrian_aktif: {
        no_proses: '-',
        loketnya: '-',
        initial: '',
        antrian_no: '',
      },
      antrian_terakhir: {},
      intervalWaktu: null,
      waktu: 0,
      callback_refresh_layar: {
        antrian_list_id: '',
        ms_loket_id: '',
      },
      dateToday: moment(new Date).format('YYYY-MM-DD'),
      dateTodayId: moment(new Date).format('LL'),
      poli_layanan: {
        loket: 1,
      },
      status_antrian: {
        dibuat: 1,
        proses: 2,
        selesai: 9
      },
      antrian_detail_response: {},
      isLoadingLoket: true,

      sedang_manggil: false,
    }
  },
  mounted() {
    // Set the initial number of items
    // this.totalRows = this.items.length
    // this.getDatas()
    this.$socket.emit('joinRoom', 'antrian_loket')
    this.getMsLoket()
    this.getLatestAntrian()

    this.intervalWaktu = setInterval((i) => {
      if (this.waktu > 100) this.waktu = this.waktu - 100
    }, 100)
  },
  created() {
    // this.panggil_suara()
    // this.$socket.off('refresh_admin_loket')
    // this.$socket.on('refresh_admin_loket', (data) => {
    //   console.log(data, 'SOCKET ON refresh_admin_loket')
    //   // this.panggil(data.data)
    // })
    // this.$socket.off('refresh_layar')
    // this.$socket.on('refresh_layar', (data) => {
    //   console.log(data, 'refresh layarrrrrrrrrrrr')
    //   // this.panggil(data.data)
    // })
    this.$socket.off('refresh_layar_loket')
    this.$socket.on('refresh_layar_loket', async (data) => {
      console.log(data, 'refresh refresh_layar_loket')
      await this.panggil(data.data)
    })
    this.$socket.off('error')
    this.$socket.on('error', (data) => {
      console.log(data, 'ini socket error')
    })
  },
  beforeDestroy() {
    console.log('Socket oFFFF beforeDestroy')

    this.$socket.off('refresh_layar_loket')
    this.$socket.off('error')

    clearInterval(this.intervalWaktu)
    if (this.$route.path === '/antrian/display-layar-loket') window.location.reload()
  },
  methods: {
    async panggil(data) {
      this.callback_refresh_layar.antrian_list_id = data.id
      this.callback_refresh_layar.ms_loket_id = data.ms_loket_id

      await this.getMsLoketDetail(data.ms_loket_id)
      await this.getAntrianDetail(data.ms_loket_id)
    },
    panggil_suara(waktu_mulai = 0, nomor, ke = 'loket', tujuan) {
      console.log(`ke:${ke}`)
      console.log(`tujuan:${tujuan}`)
      this.sedang_manggil = true
      tujuan = tujuan.replace(/\D/g,'');

      let input = nomor
      let output = ''

      const match = input.match(/([A-Za-z]+)([0-9]+)/);
      if (match) {
        const letterPart = match[1];
        const numberPart = parseInt(match[2]);

        output = letterPart + ' ' + this.convertToWords(numberPart);
        console.log(`PANGGIL 1: ${output}, KE: ${ke}, TUJUAN: ${tujuan}`)
        if (ke && tujuan) output = output + ` ${ke} ${tujuan}`
      } else {
        output = `Format input tidak valid: ${input}`;
        this.$_alert.error({}, output)
        return
      }

      console.log(`PANGGIL 2: ${output}, TUJUAN: ${tujuan}`)


      let show_error = false
      let waktu = waktu_mulai
      for (const file of output.split(' ')) {
        let filepath = require(`../../assets/sound/sound/${file}.wav`)
        let audio = new Audio(filepath);

        setTimeout(() => {
          audio.play()
            .catch((err) => {
              if (show_error === false) {
                this.$_alert.error({}, 'Error Play', err)
                show_error = true
              }
            })
        }, waktu)
        waktu = waktu + 1200
      }

      setTimeout(() => {
        this.sedang_manggil = false
        // this.sedang_proses = false
      }, (waktu + 500));

      // this.waktu = this.waktu - waktu
      // console.log(`END WAKTU: ${waktu}`)
      return waktu
    },
    convertToWords: function (number) {
      const words = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const teens = ['10', '11', '2 belas', '3 belas', '4 belas', '5 belas', '6 belas', '7 belas', '8 belas', '9 belas'];
      const tens = ['', '10', '2 puluh', '3 puluh', '4 puluh', '5 puluh', '6 puluh', '7 puluh', '8 puluh', '9 puluh'];

      let result = '';

      if (number === 0) {
        return 'nol';
      }

      if (number < 10) {
        result = words[number];
      } else if (number < 20) {
        result = teens[number - 10];
      } else if (number < 100) {
        const tensDigit = Math.floor(number / 10);
        const onesDigit = number % 10;

        result = tens[tensDigit];
        if (onesDigit !== 0) {
          result += ' ' + words[onesDigit];
        }
      } else if (number < 1000) {
        const hundredsDigit = Math.floor(number / 100);
        const remainder = number % 100;

        result = (words[hundredsDigit] == 1 ? 'se' : words[hundredsDigit] + ' ') + 'ratus';
        if (remainder !== 0) {
          result += ' ' + this.convertToWords(remainder);
        }
      } else {
        result = 'angka terlalu besar untuk diubah';
      }

      return result;
    },
    async getMsLoketDetail(ms_loket_id) {
      this.$_api.post('msLoket/detailsById', {
        id: ms_loket_id
      })
        .then((res) => {
          console.log(res, 'ini detail loket');
          this.antrian_aktif.loketnya = res.data[0].nama_loket

          const resultLoket = this.loketAfter.find((item) => {
            return item.id == ms_loket_id
          })

          resultLoket.loketnya = this.antrian_aktif.loketnya
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getAntrianDetail(ms_loket_id) {
      this.$_api.post('antrianList/list', {
        antrian_list_id: this.callback_refresh_layar.antrian_list_id
      })
        .then((res) => {
          this.antrian_detail_response = res.data[0]

          this.antrian_aktif.initial = res.data[0].initial
          this.antrian_aktif.antrian_no = res.data[0].antrian_no
          this.antrian_aktif.no_proses = `${this.antrian_aktif.initial}${this.antrian_aktif.antrian_no}`

          const resultLoket = this.loketAfter.find((item) => {
            return item.id == ms_loket_id
          })

          console.log(res, 'ini detail antrian');
          console.log(resultLoket, 'ini resultLoket');

          resultLoket.no_proses = this.antrian_aktif.no_proses

          if (this.antrian_detail_response.poli_layanan == this.poli_layanan.loket) {

            this.$store.commit("set_alert", {
              variant: 'info',
              position: 'center',
              toast: false,
              msg: `LOKET ${this.antrian_aktif.loketnya}`,
              text: `Antrian ${this.antrian_aktif.no_proses}`
            });

            console.log('antrian aktif', this.antrian_aktif)
            let waktu = this.panggil_suara(this.waktu, this.antrian_aktif.no_proses, 'loket', this.antrian_aktif.loketnya)
            this.waktu = waktu
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMsLoket() {
      this.isLoadingLoket = true

      this.$_api.list('msLoket', {}).then((res) => {
        this.loket = res.data
        // this.loket = this.sortByProperty(this.loket, 'nama_loket');

        for (let i = 0; i < this.loket.length; i++) {
          let eachLoket = this.loket[i];
          console.log(eachLoket, 'ini eachLoket');

          this.$_api.post('antrianList/list', {
            tgl_antrian: this.dateToday,
            poli_layanan: this.poli_layanan.loket,
            status_antrian: this.status_antrian.proses,
            ms_loket_id: eachLoket.id,
          })
            .then((res) => {
              let antrianList = res

              if (antrianList.count > 0) {
                this.loket[i].no_proses = `${antrianList.data[0].initial}${antrianList.data[0].antrian_no}`
                this.loketAfter.push(this.loket[i])
                this.loketAfter.sort((a, b) => b.nama_loket.localeCompare(a.nama_loket));

                // this.antrian_terakhir[eachLoket.id] = {
                //   ms_loket_id: eachLoket.id,
                //   no_proses: `${antrianList.data[0].initial}${antrianList.data[0].antrian_no}`,
                //   loketnya: eachLoket.nama_loket,
                // }
              } else {
                this.$_api.post('antrianList/list', {
                  tgl_antrian: this.dateToday,
                  poli_layanan: this.poli_layanan.loket,
                  status_antrian: this.status_antrian.selesai,
                  ms_loket_id: eachLoket.id,
                })
                  .then((res) => {
                    let antrianList = res

                    if (antrianList.count > 0) {
                      this.loket[i].no_proses = `${antrianList.data[0].initial}${antrianList.data[0].antrian_no}`
                      this.loketAfter.push(this.loket[i])
                      this.loketAfter.sort((a, b) => b.nama_loket.localeCompare(a.nama_loket));

                      // this.antrian_terakhir[eachLoket.id] = {
                      //   ms_loket_id: eachLoket.id,
                      //   no_proses: `${antrianList.data[0].initial}${antrianList.data[0].antrian_no}`,
                      //   loketnya: eachLoket.nama_loket,
                      // }
                    } else {
                      this.loket[i].no_proses = '-'
                      this.loketAfter.push(this.loket[i])
                      this.loketAfter.sort((a, b) => b.nama_loket.localeCompare(a.nama_loket));

                      // this.antrian_terakhir[eachLoket.id] = {
                      //   ms_loket_id: eachLoket.id,
                      //   no_proses: '-',
                      //   loketnya: eachLoket.nama_loket,
                      // }
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }).catch((err) => {
        this.$_alert(err)
      }).finally(() => {
        this.isLoadingLoket = false
      })

    },
    getMsLoket2() {
      this.isLoadingLoket = true

      this.$_api.list('msLoket', {}).then((res) => {
        this.loket = res.data
        for (let i = 0; i < this.loket.length; i++) {
          let eachLoket = this.loket[i];

          this.$_api.post('antrianList/list', {
            tgl_antrian: this.dateToday,
            poli_layanan: this.poli_layanan.loket,
            status_antrian: this.status_antrian.proses,
            ms_loket_id: eachLoket.id,
          })
            .then((res) => {
              let antrianList = res.data

              if (antrianList.length > 0) {
                this.loket[i].no_proses = `${antrianList[0].initial}${antrianList[0].antrian_no}`

                this.antrian_terakhir[eachLoket.id] = {
                  ms_loket_id: eachLoket.id,
                  no_proses: `${antrianList[0].initial}${antrianList[0].antrian_no}`,
                  loketnya: eachLoket.nama_loket,
                }
              } else {
                this.$_api.post('antrianList/list', {
                  tgl_antrian: this.dateToday,
                  poli_layanan: this.poli_layanan.loket,
                  status_antrian: this.status_antrian.selesai,
                  ms_loket_id: eachLoket.id,
                })
                  .then((res) => {
                    let antrianList = res.data

                    if (antrianList.length > 0) {
                      this.loket[i].no_proses = `${antrianList[0].initial}${antrianList[0].antrian_no}`

                      this.antrian_terakhir[eachLoket.id] = {
                        ms_loket_id: eachLoket.id,
                        no_proses: `${antrianList[0].initial}${antrianList[0].antrian_no}`,
                        loketnya: eachLoket.nama_loket,
                      }
                    } else {
                      this.loket[i].no_proses = '-'

                      this.antrian_terakhir[eachLoket.id] = {
                        ms_loket_id: eachLoket.id,
                        no_proses: '-',
                        loketnya: eachLoket.nama_loket,
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }).catch((err) => {
        this.$_alert(err)
      }).finally(() => {
        this.isLoadingLoket = false
      })
    },
    getLatestAntrian() {
      this.$_api.post('antrianList/list', {
        tgl_antrian: this.dateToday,
        poli_layanan: this.poli_layanan.loket,
        status_antrian: this.status_antrian.proses,
      })
        .then((res) => {
          let antrianList = res

          if (antrianList.count > 0) {
            for (let i = 0; i < antrianList.count; i++) {
              const loket = antrianList.data[antrianList.count - 1];

              const resultLoket = this.loket.find((item) => {
                return item.id == loket.ms_loket_id
              })

              this.antrian_aktif = {
                no_proses: `${loket.initial}${loket.antrian_no}`,
                loketnya: resultLoket.nama_loket,
              }
            }

          } else {
            this.getLatestAntrianOnSelesai()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLatestAntrianOnSelesai() {

      this.$_api.post('antrianList/list', {
        tgl_antrian: this.dateToday,
        poli_layanan: this.poli_layanan.loket,
        status_antrian: this.status_antrian.selesai,
      })
        .then((res) => {
          let antrianList = res

          if (antrianList.count > 0) {
            for (let i = 0; i < antrianList.count; i++) {
              const loket = antrianList.data[antrianList.count - 1];

              const resultLoket = this.loket.find((item) => {
                return item.id == loket.ms_loket_id
              })
              // let resultLoket = loket.nama_loket

              this.antrian_aktif = {
                no_proses: `${loket.initial}${loket.antrian_no}`,
                loketnya: resultLoket.nama_loket,
              }
            }
          } else {
            this.antrian_aktif = {
              no_proses: '-',
              loketnya: '-',
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    sortByProperty(array, property, ascending = true) {
      const compareFunction = (a, b) => {
        const comparison = a[property].localeCompare(b[property]);
        return ascending ? comparison : -comparison;
      };

      return array.slice().sort(compareFunction);
    },
    sortFields(array, sortArray) {
      return array.slice().sort((a, b) => sortArray.indexOf(a.id) + sortArray.indexOf(b.id))
    }
  },
  watch: {
    // loket(newVar, oldVar) {
    //   console.log(oldVar, 'ini oldVar');
    //   console.log(newVar, 'ini newVar');
    //   this.loketAfter = newVar
    //   if (newVar.length > 0) {
    //     this.loketAfter = newVar
    //   }
    // },
    loketAfter(newVar, oldVar) {
      // console.log(oldVar, 'ini oldVar');
      // console.log(newVar, 'ini newVar');

      // if (newVar.length > 0 && this.loket[0].hasOwnProperty('no_proses')) {
      //   this.loketAfter = newVar
      // }
    },
  }
}
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100%;
}

.video-container iframe {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
</style>