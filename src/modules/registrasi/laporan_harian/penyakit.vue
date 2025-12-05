<template>
    <div class="w-100">
    <tas-base-crud :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true" :hideColumnVisibility="true">
        <template v-slot:header-table="rowData">
            <tr class="text-muted">
                <th rowspan="2">#</th>
                <th rowspan="2" class="text-center">
                    KODE
                </th>
                <th rowspan="2" class="text-center">
                    NAMA
                </th>
                <th class="text-center" colspan="2">
                    JUMLAH
                </th>
                <th rowspan="2" class="text-center">
                    TOTAL
                </th>
            </tr>
            <tr class="text-muted">
                <th class="text-center">
                    LAKI-LAKI
                </th>
                <th class="text-center">
                    PEREMPUAN
                </th>
            </tr>
        </template>
        <!-- <template v-slot:list-table="rowData">
            <tr v-for="(item) in rowData">
                <td>#</td>
                <td class="text-center">
                    {{ item.kode_diagnosa }}
                </td>
                <td class="text-center">
                    Nama
                </td>
                <td class="text-center" rowspan="2" colspan="2">
                    Jumlah
                </td>
                <td class="text-center">
                    Laki-laki
                </td>
                <td class="text-center">
                    Perempuan
                </td>
                <td class="text-center">
                    Total
                </td>
            </tr>
        </template> -->
        <template v-slot:top-table="data">
            <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert">
                <div class="alert-icon"><i class="ri-progress-3-fill"></i></div>
                <div class="alert-text">
                    Download laporan excel
                </div>
                <button class="btn btn-primary" @click="download('laporan_harian/penyakit_excel', data.data && data.data.filters ? data.data.filters : {})">
                    Download
                    <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        </template>
    </tas-base-crud>
    <b-toast id="toast-download" variant="info" solid no-auto-hide no-close-button :visible="showToastDownload">
        <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-center pt-2">
                <b-spinner Radiologiel="Spinning" small></b-spinner>
                <strong class="mr-auto pl-3">Downloading File ...</strong>
                <small class="text-muted mr-2">
                    <time-ago locale="id"></time-ago>
                </small>
            </div>
        </template>
        Sedang mendownload file excel.
    </b-toast>
    </div>
</template>
  
<script>
import moment from 'moment'
moment.locale('id')

export default {
    name: 'penyakit',
    data() {
        return {
            showToastDownload: false,
            tesAsyncData: {},
            config: {
                title: 'Laporan Harian Penyakit',
                // model_api: 'bank',
                getter: 'laporan_harian/penyakitBypassUri',
                setter: 'laporan_harian/penyakitBypassUri',
                pk_field: null,
                frontendPaginate: false,
                permission: {
                    create: false,
                    read: false,
                    update: false,
                    delete: false
                },
                filter_api: {
                    tgl_awal: moment(new Date).format('YYYY-MM-DD'),
                    tgl_akhir: moment(new Date).format('YYYY-MM-DD'),
                },
                slave: [],
                fields: [
                    {
                        id: 'tgl_awal',
                        data: 'tgl_awal',
                        label: 'Tanggal Awal',
                        placeholder: null,
                        methods: {
                            list: false,
                            detail: false,
                            create: false,
                            update: false,
                            filter: {
                                type: 'date',
                                class: 'col-4',
                                value: moment(new Date).format('YYYY-MM-DD')
                            }
                        }
                    },
                    {
                        id: 'tgl_akhir',
                        data: 'tgl_akhir',
                        label: 'Tanggal Akhir',
                        placeholder: null,
                        methods: {
                            list: false,
                            detail: false,
                            create: false,
                            update: false,
                            filter: {
                                type: 'date',
                                class: 'col-4',
                                value: moment(new Date).format('YYYY-MM-DD')
                            }
                        }
                    },
                    // {
                    //     id: 'ms_diagnosa_id',
                    //     data: 'ms_diagnosa_id',
                    //     label: 'Diagnosa',
                    //     placeholder: null,
                    //     methods: {
                    //         list: false,
                    //         detail: false,
                    //         create: false,
                    //         update: false,
                    //         filter: {
                    //             setter: 'ms_diagnosa',
                    //             getter: 'ms_diagnosa',
                    //             type: 'lookup-radio',
                    //             option: {
                    //                 list_pointer: {
                    //                     label: 'nama_diagnosa',
                    //                     code: 'id',
                    //                     display: ['nama_diagnosa', 'kode_diagnosa'],
                    //                     headerDisplay: ['Nama', 'Diagnosa']
                    //                 }
                    //             }
                    //         }
                    //     }
                    // },
                    {
                        id: 'kode_diagnosa',
                        data: 'kode_diagnosa',
                        label: 'Kode',
                        placeholder: null,
                        methods: {
                            list: true,
                            detail: true,
                            create: false,
                            update: false,
                            filter: {
                                setter: 'ms_diagnosa',
                                getter: 'ms_diagnosa',
                                type: 'lookup-radio',
                                option: {
                                    list_pointer: {
                                        label: 'nama_diagnosa',
                                        code: 'kode_diagnosa',
                                        display: ['nama_diagnosa', 'kode_diagnosa'],
                                        headerDisplay: ['Nama', 'Diagnosa']
                                    }
                                }
                            }
                        }
                    },
                    {
                        id: 'nama_diagnosa',
                        data: 'nama_diagnosa',
                        label: 'Nama',
                        placeholder: null,
                        methods: {
                            list: true,
                            detail: true,
                            create: false,
                            update: false,
                            filter: false
                        }
                    },
                    {
                        id: 'jumlah_laki_laki',
                        data: 'jumlah_laki_laki',
                        label: 'Laki-laki',
                        placeholder: null,
                        class: 'text-center',
                        methods: {
                            list: { class: 'text-center' },
                            detail: true,
                            create: false,
                            update: false,
                            filter: false
                        }
                    },
                    {
                        id: 'jumlah_perempuan',
                        data: 'jumlah_perempuan',
                        label: 'Perempuan',
                        placeholder: null,
                        methods: {
                            list: { class: 'text-center' },
                            detail: true,
                            create: false,
                            update: false,
                            filter: false
                        }
                    },
                    {
                        id: 'jumlah_total',
                        data: 'jumlah_total',
                        label: 'Total',
                        placeholder: null,
                        methods: {
                            list: { class: 'text-center' },
                            detail: true,
                            create: false,
                            update: false,
                            filter: false
                        }
                    },
                ]
            },
            filterView: true,
            hideFilter: false
        }
    },
    // mounted () {
    //   console.log('BEFORE 1')
    //   setTimeout(async () => {
    //     console.log('BEFORE 2')
    //     let xx = await this.tesAsync()
    //     console.log('AFER 1')
    //     console.log(xx)
    //   }, 3000);
    // },
    methods: {
      async tesAsync () {
        console.log('INIT')
        return this.$_api.list('bank', {}).then((res) => {
          return res
        })
      },
        download(endpoint, filters) {
            console.log('download file', filters)
            this.showToastDownload = true
            this.$_api.downloadFile(endpoint, filters, 'Laporan Harian - Penyakit.xlsx').then((res) => {
                this.showToastDownload = false
                console.log(res)
            })
        }
    }
}
</script>
  