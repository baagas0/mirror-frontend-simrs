<template>
    <div>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <b-table-simple bordered responsive style="margin-top:15px;" class="table-nadi">
                <b-tbody>
                    <b-tr v-for="(item, idx) in data_suhu" :key="idx">
                        <b-td
                            style="min-width:120px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">{{
                                item.text }}</b-td>
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
                </b-tbody>
            </b-table-simple>
        </b-col>

        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <b-table-simple bordered responsive style="margin-top:15px;" class="table-nadi">
                <b-tbody>
                    <b-tr v-for="(item, idx) in data_urine" :key="idx">
                        <b-td
                            style="min-width:120px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">{{
                                item.text }}</b-td>
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
                    <b-td style="border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">Aseton</b-td>
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
                    </b-tr>

                    <b-tr>
                    <b-td style="min-width:120px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">Volume (cc)</b-td>
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

    components: {

    },
    data() {
        return {
            data_suhu: [
                { text: 'Suhu', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
            ],
            data_urine: [
                { text: 'Protein', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
                { text: 'Aseton', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
                { text: 'Volume', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
            ],
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
        'patograf.suhu': {
            deep: true,
            handler() {
                this.getDataSuhu()
            }
        },
        'patograf.urine': {
            deep: true,
            handler() {
                this.getDataUrine()
            }
        }
    },
    mounted() {
        this.getDataSuhu()
        this.getDataUrine()
    },
    methods: {
        getDataSuhu() {
            console.log('INIT TABLE SUHU')
            let vm = this
            if (this.patograf.suhu.length) {
                //   console.log(this.patograf.suhu, 'suhuuu');
                // vm.$store.commit('set_reload', null)
                for (let i = 0; i < this.patograf.suhu.length; i++) {
                    let x = this.patograf.suhu[i];
                    if (i + 1 == 1) {
                        vm.data_suhu[0].satu = x.suhu
                    } else if (i + 1 == 2) {
                        vm.data_suhu[0].dua = x.suhu
                    } else if (i + 1 == 3) {
                        vm.data_suhu[0].tiga = x.suhu
                    } else if (i + 1 == 4) {
                        vm.data_suhu[0].empat = x.suhu
                    } else if (i + 1 == 5) {
                        vm.data_suhu[0].lima = x.suhu
                    } else if (i + 1 == 6) {
                        vm.data_suhu[0].enam = x.suhu
                    } else if (i + 1 == 7) {
                        vm.data_suhu[0].tujuh = x.suhu
                    } else if (i + 1 == 8) {
                        vm.data_suhu[0].delapan = x.suhu
                    } else if (i + 1 == 9) {
                        vm.data_suhu[0].sembilan = x.suhu
                    } else if (i + 1 == 10) {
                        vm.data_suhu[0].sepuluh = x.suhu
                    } else if (i + 1 == 11) {
                        vm.data_suhu[0].sebelas = x.suhu
                    } else if (i + 1 == 12) {
                        vm.data_suhu[0].duabelas = x.suhu
                    } else if (i + 1 == 13) {
                        vm.data_suhu[0].tigabelas = x.suhu
                    } else if (i + 1 == 14) {
                        vm.data_suhu[0].empatbelas = x.suhu
                    } else if (i + 1 == 15) {
                        vm.data_suhu[0].limabelas = x.suhu
                    } else if (i + 1 == 16) {
                        vm.data_suhu[0].enambelas = x.suhu
                    } else if (i + 1 == 17) {
                        vm.data_suhu[0].tujuhbelas = x.suhu
                    } else if (i + 1 == 18) {
                        vm.data_suhu[0].delapanbelas = x.suhu
                    } else if (i + 1 == 19) {
                        vm.data_suhu[0].sembilanbelas = x.suhu
                    } else if (i + 1 == 20) {
                        vm.data_suhu[0].duapuluh = x.suhu
                    } else if (i + 1 == 21) {
                        vm.data_suhu[0].duasatu = x.suhu
                    } else if (i + 1 == 22) {
                        vm.data_suhu[0].duadua = x.suhu
                    } else if (i + 1 == 23) {
                        vm.data_suhu[0].duattiga = x.suhu
                    } else if (i + 1 == 24) {
                        vm.data_suhu[0].duaempat = x.suhu
                    } else if (i + 1 == 25) {
                        vm.data_suhu[0].dualima = x.suhu
                    } else if (i + 1 == 26) {
                        vm.data_suhu[0].duaenam = x.suhu
                    } else if (i + 1 == 27) {
                        vm.data_suhu[0].duatujuh = x.suhu
                    } else if (i + 1 == 28) {
                        vm.data_suhu[0].dualapan = x.suhu
                    } else if (i + 1 == 29) {
                        vm.data_suhu[0].duasembilan = x.suhu
                    } else if (i + 1 == 30) {
                        vm.data_suhu[0].tigapuluh = x.suhu
                    }
                }
            }
        },
        getDataUrine() {
            console.log('INIT TABLE URIN')
            let vm = this
            if (this.patograf.urine.length) {
                //   console.log(this.patograf.urine, 'urine');
                // vm.$store.commit('set_reload', null)
                for (let i = 0; i < this.patograf.urine.length; i++) {
                    let x = this.patograf.urine[i];
                    for (let j = 0; j < vm.data_urine.length; j++) {
                        let y = vm.data_urine[j];
                        if (i + 1 == 1) {
                            if (y.text == "Protein") {
                                y.satu = x.protein
                            } else if (y.text == "Aseton") {
                                y.satu = x.aseton
                            } else if (y.text == "Volume") {
                                y.satu = x.volume
                            }
                        } else if (i + 1 == 2) {
                            if (y.text == "Protein") {
                                y.dua = x.protein
                            } else if (y.text == "Aseton") {
                                y.dua = x.aseton
                            } else if (y.text == "Volume") {
                                y.dua = x.volume
                            }
                        } else if (i + 1 == 3) {
                            if (y.text == "Protein") {
                                y.tiga = x.protein
                            } else if (y.text == "Aseton") {
                                y.tiga = x.aseton
                            } else if (y.text == "Volume") {
                                y.tiga = x.volume
                            }
                        } else if (i + 1 == 4) {
                            if (y.text == "Protein") {
                                y.empat = x.protein
                            } else if (y.text == "Aseton") {
                                y.empat = x.aseton
                            } else if (y.text == "Volume") {
                                y.empat = x.volume
                            }
                        } else if (i + 1 == 5) {
                            if (y.text == "Protein") {
                                y.lima = x.protein
                            } else if (y.text == "Aseton") {
                                y.lima = x.aseton
                            } else if (y.text == "Volume") {
                                y.lima = x.volume
                            }
                        } else if (i + 1 == 6) {
                            if (y.text == "Protein") {
                                y.enam = x.protein
                            } else if (y.text == "Aseton") {
                                y.enam = x.aseton
                            } else if (y.text == "Volume") {
                                y.enam = x.volume
                            }
                        } else if (i + 1 == 7) {
                            if (y.text == "Protein") {
                                y.tujuh = x.protein
                            } else if (y.text == "Aseton") {
                                y.tujuh = x.aseton
                            } else if (y.text == "Volume") {
                                y.tujuh = x.volume
                            }
                        } else if (i + 1 == 8) {
                            if (y.text == "Protein") {
                                y.delapan = x.protein
                            } else if (y.text == "Aseton") {
                                y.delapan = x.aseton
                            } else if (y.text == "Volume") {
                                y.delapan = x.volume
                            }
                        } else if (i + 1 == 9) {
                            if (y.text == "Protein") {
                                y.sembilan = x.protein
                            } else if (y.text == "Aseton") {
                                y.sembilan = x.aseton
                            } else if (y.text == "Volume") {
                                y.sembilan = x.volume
                            }
                        } else if (i + 1 == 10) {
                            if (y.text == "Protein") {
                                y.sepuluh = x.protein
                            } else if (y.text == "Aseton") {
                                y.sepuluh = x.aseton
                            } else if (y.text == "Volume") {
                                y.sepuluh = x.volume
                            }
                        } else if (i + 1 == 11) {
                            if (y.text == "Protein") {
                                y.sebelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.sebelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.sebelas = x.volume
                            }
                        } else if (i + 1 == 12) {
                            if (y.text == "Protein") {
                                y.duabelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.duabelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.duabelas = x.volume
                            }
                        } else if (i + 1 == 13) {
                            if (y.text == "Protein") {
                                y.tigabelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.tigabelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.tigabelas = x.volume
                            }
                        } else if (i + 1 == 14) {
                            if (y.text == "Protein") {
                                y.empatbelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.empatbelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.empatbelas = x.volume
                            }
                        } else if (i + 1 == 15) {
                            if (y.text == "Protein") {
                                y.limabelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.limabelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.limabelas = x.volume
                            }
                        } else if (i + 1 == 16) {
                            if (y.text == "Protein") {
                                y.enambelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.enambelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.enambelas = x.volume
                            }
                        } else if (i + 1 == 17) {
                            if (y.text == "Protein") {
                                y.tujuhbelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.tujuhbelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.tujuhbelas = x.volume
                            }
                        } else if (i + 1 == 18) {
                            if (y.text == "Protein") {
                                y.delapanbelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.delapanbelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.delapanbelas = x.volume
                            }
                        } else if (i + 1 == 19) {
                            if (y.text == "Protein") {
                                y.sembilanbelas = x.protein
                            } else if (y.text == "Aseton") {
                                y.sembilanbelas = x.aseton
                            } else if (y.text == "Volume") {
                                y.sembilanbelas = x.volume
                            }
                        } else if (i + 1 == 20) {
                            if (y.text == "Protein") {
                                y.duapuluh = x.protein
                            } else if (y.text == "Aseton") {
                                y.duapuluh = x.aseton
                            } else if (y.text == "Volume") {
                                y.duapuluh = x.volume
                            }
                        } else if (i + 1 == 21) {
                            if (y.text == "Protein") {
                                y.duasatu = x.protein
                            } else if (y.text == "Aseton") {
                                y.duasatu = x.aseton
                            } else if (y.text == "Volume") {
                                y.duasatu = x.volume
                            }
                        } else if (i + 1 == 22) {
                            if (y.text == "Protein") {
                                y.duadua = x.protein
                            } else if (y.text == "Aseton") {
                                y.duadua = x.aseton
                            } else if (y.text == "Volume") {
                                y.duadua = x.volume
                            }
                        } else if (i + 1 == 23) {
                            if (y.text == "Protein") {
                                y.duatiga = x.protein
                            } else if (y.text == "Aseton") {
                                y.duatiga = x.aseton
                            } else if (y.text == "Volume") {
                                y.duatiga = x.volume
                            }
                        } else if (i + 1 == 24) {
                            if (y.text == "Protein") {
                                y.duaempat = x.protein
                            } else if (y.text == "Aseton") {
                                y.duaempat = x.aseton
                            } else if (y.text == "Volume") {
                                y.duaempat = x.volume
                            }
                        } else if (i + 1 == 25) {
                            if (y.text == "Protein") {
                                y.dualima = x.protein
                            } else if (y.text == "Aseton") {
                                y.dualima = x.aseton
                            } else if (y.text == "Volume") {
                                y.dualima = x.volume
                            }
                        } else if (i + 1 == 26) {
                            if (y.text == "Protein") {
                                y.duaenam = x.protein
                            } else if (y.text == "Aseton") {
                                y.duaenam = x.aseton
                            } else if (y.text == "Volume") {
                                y.duaenam = x.volume
                            }
                        } else if (i + 1 == 27) {
                            if (y.text == "Protein") {
                                y.duatujuh = x.protein
                            } else if (y.text == "Aseton") {
                                y.duatujuh = x.aseton
                            } else if (y.text == "Volume") {
                                y.duatujuh = x.volume
                            }
                        } else if (i + 1 == 28) {
                            if (y.text == "Protein") {
                                y.dualapan = x.protein
                            } else if (y.text == "Aseton") {
                                y.dualapan = x.aseton
                            } else if (y.text == "Volume") {
                                y.dualapan = x.volume
                            }
                        } else if (i + 1 == 29) {
                            if (y.text == "Protein") {
                                y.duasembilan = x.protein
                            } else if (y.text == "Aseton") {
                                y.duasembilan = x.aseton
                            } else if (y.text == "Volume") {
                                y.duasembilan = x.volume
                            }
                        } else if (i + 1 == 30) {
                            if (y.text == "Protein") {
                                y.tigapuluh = x.protein
                            } else if (y.text == "Aseton") {
                                y.tigapuluh = x.aseton
                            } else if (y.text == "Volume") {
                                y.tigapuluh = x.volume
                            }
                        }
                    }
                }
            }
        },
    },
}
</script>
<style scoped>
.table-serviks td {
    border: 1px solid #555 !important;
    padding: 5px 10px !important;
}
</style>