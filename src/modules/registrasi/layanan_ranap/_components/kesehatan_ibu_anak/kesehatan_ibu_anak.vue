/* eslint no-use-before-define: 0 */
/* eslint-disable-line */
/* eslint-disable-next-line */
<template>
  <b-card class="">
    <div class="row no-gutters mb-5 nav nav-primary nav-pills gap-8">
      <a @click="switchActiveTab('pengamatan_kehamilan')" :class="activeTab==='pengamatan_kehamilan'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pengamatan Kehamilan</a>
      <a @click="switchActiveTab('pemeriksaan_antenatal')" :class="activeTab==='pemeriksaan_antenatal'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pemeriksaan Antenatal</a>
      <a @click="switchActiveTab('pengamatan_persalinan')" :class="activeTab==='pengamatan_persalinan'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pengamatan Persalinan</a>
      <a @click="switchActiveTab('pengamatan_nifas')" :class="activeTab==='pengamatan_nifas'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Pengamatan Nifas</a>
      <a @click="switchActiveTab('patograf')" :class="activeTab==='patograf'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Partograf</a>
      <a @click="switchActiveTab('surat_ket_lahir')" :class="activeTab==='surat_ket_lahir'? 'btn-primary': 'btn-outline-primary'" class="btn" style="flex-grow: 1">Surat Keterangan Lahir</a>
    </div>

    <!-- <fieldset :disabled="is_validasi_assesmen_tambahan"> -->
      <template v-if="activeTab === 'pengamatan_kehamilan' && assesmen && assesmen.kia">
        <PengamatanKehamilan
            :mData="assesmen.kia"
            @disabled="set_disabled($event)"
          />
      </template>
      <template v-if="activeTab === 'pemeriksaan_antenatal'">
        <!-- <PemeriksaanAntenatal :kunjungan="kunjungan" :dataAnamnesa="dataAnamnesa" :kunjunganSelesai="kunjunganSelesai"/> -->
        <PemeriksaanAntenatal
          :assesmen="assesmen"
          :mData="assesmen.pemeriksaan_antenatal"
        />
      </template>
      <template v-if="activeTab === 'pengamatan_persalinan'">
        <!-- <PengamatanPersalinan :kunjungan="kunjungan" :dataAnamnesa="dataAnamnesa" :listDokter="listDokter" :kunjunganSelesai="kunjunganSelesai"/> -->
        <PengamatanPersalinan
          :mData="assesmen.pengamatan_persalinan"
        />
        
      </template>
      <template v-if="activeTab === 'pengamatan_nifas'">
        <!-- <PengamatanNifas :kunjungan="kunjungan" :dataAnamnesa="dataAnamnesa" :kunjunganSelesai="kunjunganSelesai"/> -->
        <PengamatanNifas
          :mData="assesmen.pengamatan_nifas"
        />

      </template>
      <template v-if="activeTab === 'patograf'">
        <!-- <Partograf :kunjungan="kunjungan" :dataAnamnesa="dataAnamnesa" :kunjunganSelesai="false"/> -->
        <!-- {{ assesmen.patograf }} -->
        <Partograf :kunjungan="{}" :mData="assesmen.patograf" :kunjunganSelesai="false"/>
        <!-- <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center justify-content-center">
              <img :src="'./static/img/icon/maintenance.png'" style="width: 30%;"/>
              <h3 class="mt-3 font-weight-bolder text-dark" style="margin-left: 3rem !important;">Dalam tahap pengembangan...</h3>
            </div>
          </div>
        </div> -->
      </template>
      <template v-if="activeTab === 'surat_ket_lahir'">
        <!-- <SuratKetLahir :kunjungan="kunjungan" :dataAnamnesa="dataAnamnesa" :kunjunganSelesai="kunjunganSelesai"/> -->
        <SuratKetLahir
          :mData="assesmen.surat_ket_lahir"
        />
      </template>
    <!-- </fieldset> -->
  </b-card>
</template>
<script>

import PengamatanKehamilan from '../kesehatan_ibu_anak/pengamatan_kehamilan.vue';
import PemeriksaanAntenatal from '../kesehatan_ibu_anak/pemeriksaan_antenatal.vue';
import PengamatanPersalinan from '../kesehatan_ibu_anak/pengamatan_persalian.vue';
import PengamatanNifas from '../kesehatan_ibu_anak/pengamatan_nifas.vue';
import Partograf from '../kesehatan_ibu_anak/partograf.vue';
import SuratKetLahir from '../kesehatan_ibu_anak/surat_ket_lahir.vue';
export default {
  components: {
    PengamatanKehamilan,
    PemeriksaanAntenatal,
    PengamatanPersalinan,
    PengamatanNifas,
    Partograf,
    SuratKetLahir
  },
  props: {
    // 'dataRegistrasi',
    // 'assesmen'
    assesmen: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    dataAssesmenTambahan: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    is_validasi_assesmen_tambahan: {
      type: Boolean,
      default () {
        return true;
      }
    }
  },
  data () {
    return {
      data_kia: "",
      disabled: true,
      activeTab: 'pengamatan_kehamilan',
    }
  },
  async mounted(){

  },
  computed: {
    reset(){
        return this.$store.state.reset
      },
  },
  watch: {
    dataRegistrasi: {
      deep: true,
      intermediate: true,
      handler(to, from) {
        console.log('kia => data registrasi', to)
      }
    },
    // reset(newVal, oldVal){
    //   if(newVal != oldVal){
    //     if(newVal == true){
          
    //     }
    //   }
    // },
  },
  methods: {
    switchActiveTab(e) {
      this.activeTab = e
    },
    set_disabled(event){
      let vm = this
      vm.disabled = event
    }
  },
}
</script>

<style scoped>

</style>
