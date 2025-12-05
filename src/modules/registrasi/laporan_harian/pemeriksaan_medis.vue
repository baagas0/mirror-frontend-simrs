<template>
    <div class="w-100">
        <tas-base-crud :config="config" :filterView="filterView" :hideFilter="hideFilter" :hideGlobalSearch="true">
            <template v-slot:subtitle="data">
                <!-- <pre>
                    {{ data.data.count }}
                </pre> -->
                <p class="mb-0 col-12 pl-0">
                    Total : {{ data.data.count || "0" }}
                </p>
            </template>
            <template v-slot:list-data_diagnosa="rowData">
                <ul class="pl-3">
                    <li v-for="(el, ix) in rowData.rowData.data_diagnosa" :key="'dtdiag' + ix">{{ el.nama_diagnosa }}</li>
                </ul>
            </template>
    
            <template v-slot:top-table="data">

                <div class="alert alert-custom alert-light-warning fade show mb-5" role="alert">
                    <div class="alert-icon"><i class="ri-progress-3-fill"></i></div>
                    <div class="alert-text">
                        Download laporan excel
                    </div>
                    <button class="btn btn-primary" @click="download('laporan_harian/pemeriksaan_medis_excel', data.data && data.data.filters ? data.data.filters : {})">
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
    name: 'pemeriksaan-medis',
    data() {
        return {
            showToastDownload: false,
            tesAsyncData: {},
            config: {
                title: 'Laporan Harian Pemeriksaan Medis',
                // model_api: 'bank',
                getter: 'laporan_harian/pemeriksaan_medisBypassUri',
                setter: 'laporan_harian/pemeriksaan_medisBypassUri',
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
                slave: [
                ],
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
                                class: 'col-8',
                                value: moment(new Date).format('YYYY-MM-DD')
                            }
                        }
                    },
                    {
                        id: 'ms_dokter_id',
                        data: 'ms_dokter_id',
                        label: 'Dokter',
                        placeholder: null,
                        methods: {
                            list: { view_data: 'nama_dokter' },
                            detail: false,
                            create: false,
                            update: false,
                            filter: {
                                setter: 'msDokter',
                                getter: 'msDokter',
                                type: 'lookup-radio',
                                class: 'col-4',
                                option: {
                                    list_pointer: {
                                        label: 'nama_dokter',
                                        code: 'ms_dokter_id',
                                        display: ['nama_dokter', 'nama_specialist'],
                                        headerDisplay: ['Nama', 'Spesialis']
                                    }
                                }
                            }
                        }
                    },
                    {
                        id: 'ms_tipe_tenaga_medis',
                        data: 'ms_tipe_tenaga_medis',
                        label: 'Tipe',
                        placeholder: null,
                        methods: {
                            list: { view_data: 'nama_tipe_tenaga_medis' },
                            detail: false,
                            create: false,
                            update: false,
                            filter: {
                                setter: 'ms_tipe_tenaga_medis',
                                getter: 'ms_tipe_tenaga_medis',
                                type: 'lookup-radio',
                                class: 'col-4',
                                option: {
                                    list_pointer: {
                                        label: 'nama_tipe_tenaga_medis',
                                        code: 'id',
                                        display: ['kode_tipe_tenaga_medis', 'nama_tipe_tenaga_medis'],
                                        headerDisplay: ['Kode', 'Nama']
                                    }
                                }
                            }
                        }
                    },
                    {
                        id: 'jml_pemeriksaan',
                        data: 'jml_pemeriksaan',
                        label: 'Jumlah Pemeriksaan',
                        placeholder: null,
                        methods: {
                            list: { class: 'w-180px' },
                            detail: false,
                            create: false,
                            update: false,
                            filter: false
                        }
                    },
                ],
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
        async tesAsync() {
            console.log('INIT')
            return this.$_api.list('bank', {}).then((res) => {
                return res
            })
        },
        download(endpoint, filters) {
            console.log('download file')
            this.showToastDownload = true
            this.$_api.downloadFile(endpoint, filters, 'Laporan Harian - Pemeriksaan Medis.xlsx').then((res) => {
                this.showToastDownload = false
                console.log(res)
            })
        }
    }
}
</script>