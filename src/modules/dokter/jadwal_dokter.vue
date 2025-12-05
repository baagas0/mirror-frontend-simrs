<template lang="">
  <div>
    <tas-base-crud :config="config" :filterView="false" :hideFilter="hideFilter" :hideGlobalSearch="hideGlobalSearch">
      <template v-slot:list-action="data">
        <button @click="handleSyncJadwal()" class="mr-3 btn btn-warning btn-sm">
          <i class="ri-arrow-right-up-line"></i>
          Sync Jadwal Dokter
        </button>
      </template>
    </tas-base-crud>
    <b-toast id="toast-server-lis" variant="info" solid no-auto-hide no-close-button :visible="showToastSyncJadwal">
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-center pt-2">
          <b-spinner Radiologiel="Spinning" small></b-spinner>
          <strong class="mr-auto pl-3">Sync Data Dokter Hari Ini ...</strong>
          <small class="text-muted mr-2">
            <time-ago locale="id"></time-ago>
          </small>
        </div>
      </template>
      Sedang melakukan sinkronisasi data jadwal dokter hari ini. Silakan tunggu ... {{ showToastSyncJadwal}}
    </b-toast>
  </div>
</template>

<script>
export default {
  name: 'crud-jadwal-dokter',
  data() {
    return {
      config: {
        title: 'Daftar Jadwal Dokter',
        model_api: 'jadwalDokter',
        getter: 'jadwalDokter',
        setter: 'jadwalDokter',
        // custom_api: {
        //   list: 'jadwalDokter/listPerHalamanBypassUri'
        // },
        pk_field: 'jadwal_dokter_id',
        frontendPaginate: false,
        permission: {
          create: false,
          read: 'template-allow-all',
          update: false,
          delete: false
        },
        filter_api: {
          // limit: 9999999,
          tes: '89asd',
        },
        slave: [
        ],
        fields: [
          // ms_dokter_id
          {
            id: 'ms_dokter_id',
            data: 'ms_dokter_id',
            label: 'ms dokter id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // id
          {
            id: 'id',
            data: 'id',
            label: 'id',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // tgl_jadwal
          {
            id: 'tgl_jadwal',
            data: 'tgl_jadwal',
            label: 'Tanggal',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: false,
              update: false,
              filter: { type: 'date' }
            }
          },
          // hari_jadwal
          {
            id: 'hari_jadwal',
            data: 'hari_jadwal',
            label: 'Hari',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // waktu_mulai
          {
            id: 'waktu_mulai',
            data: 'waktu_mulai',
            label: 'Waktu Mulai',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // waktu_selesai
          {
            id: 'waktu_selesai',
            data: 'waktu_selesai',
            label: 'Waktu Selesai',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // quota
          {
            id: 'quota',
            data: 'quota',
            label: 'Quota Keseluruhan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // quota_jkn
          {
            id: 'quota_jkn',
            data: 'quota_jkn',
            label: 'Quota JKN',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // quota_booking
          {
            id: 'quota_booking',
            data: 'quota_booking',
            label: 'Quota Booking',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // initial
          {
            id: 'initial',
            data: 'initial',
            label: 'Initial',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: false,
              update: false,
              filter: false
            }
          },
          // ms_poliklinik_id
          {
            id: 'ms_poliklinik_id',
            data: 'ms_poliklinik_id',
            label: 'Poliklinik',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_poliklinik' },
              detail: { view_data: 'nama_poliklinik' },
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                setter: 'msPoliklinik',
                getter: 'msPoliklinik',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_poliklinik',
                    code: 'id',
                    display: ['nama_poliklinik'],
                    mainParam: 'nama_poliklinik'
                  },
                },
              }
            }
          },
          // ms_dokter_id
          {
            id: 'ms_dokter_id',
            data: 'ms_dokter_id',
            label: 'Dokter',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_dokter' },
              detail: { view_data: 'nama_dokter' },
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter'],
                    mainParam: 'nama_dokter'
                  }
                }
              }
            }
          },
          // ms_jenis_layanan_id
          {
            id: 'ms_jenis_layanan_id',
            data: 'ms_jenis_layanan_id',
            label: 'Jenis Layanan',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jenis_layanan' },
              detail: { view_data: 'nama_jenis_layanan' },
              create: false,
              update: false,
              filter: {
                class: 'col-12 col-lg-3 col-md-6',
                setter: 'msJenisLayanan',
                getter: 'msJenisLayanan',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jenis_layanan',
                    code: 'id',
                    display: ['nama_jenis_layanan'],
                    mainParam: 'nama_jenis_layanan'
                  }
                }
              }
            }
          }
        ]
      },
      hideFilter: false,
      filterView: true,
      hideGlobalSearch: true,

      showToastSyncJadwal: false,
    }
  },
  methods: {
    async handleSyncJadwal() {
      this.showToastSyncJadwal = true

      // Get current date in YYYY-MM-DD format
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentDay = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

      await this.$_api.post(`jadwalDokter/syncJadwal`, {
        tanggal: formattedDate
      })

      this.$_alert.success('Sync data jadwal berhasil, please reload the page to see the changes.')
      setTimeout(() => {
        this.showToastSyncJadwal = false
        window.location.reload()
      },  1500)
    }
  },
}
</script>
