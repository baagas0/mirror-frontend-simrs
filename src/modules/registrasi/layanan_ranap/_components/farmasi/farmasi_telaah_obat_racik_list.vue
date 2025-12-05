<template>
  <div class="w-100">
    <div class="col-12" v-if="dataResepDetail.length">
      <div class="p-3">
        <h5>- Obat Racik</h5>
      </div>
    </div>
    <div class="col-12" v-else>
      <div class="p-3 text-danger">
        <h5>- Tidak ada obat racikan</h5>
      </div>
    </div>

    <div class="col-12" v-for="(racik, i) in dataResepDetail" :key="'resep-racik-detail' + i">
      <!-- <pre>{{ disableEdit }}</pre> -->
      <div class="card card-custom p-3">
        <div class="card body bg-light-primary pt-2 pb-2 pr-2 pl-2">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="row d-flex align-items-center" style="height: 60px;">
                <div class="col-4">
                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ racik.id.substring(0, 6) || '' }}</p>
                  <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ racik.nama_racik || '' }}</h6>
                </div>
                <div class="col-8 d-flex justify-content-between">
                  <p class="mb-0 font-weight-bold font-size-sm" :class="{ 'text-danger': racik.kronis }">{{ racik.kronis ? 'Obat Kronis' : 'Bukan Obat Kronis' }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ racik.signa || '-' }}</p>
                  <p class="mb-0 font-weight-bold font-size-sm">{{ racik.qty || '-' }} / {{ racik.satuan || '-' }}</p>
                </div>
              </div>
            </div>
            <div class="col-12 pl-6">
              <div class="row">
                <div class="col-12 mt-3" v-for="(item, a) in racik.resep_detail_rnaps" :key="'resep-racik-detail-obat-jadi'+a">
                  <div class="card card-custom p-0 ml-12">
                    <div class="card body bg-light-warning pt-0 pb-0 pr-0 pl-3">
                      <div class="row align-items-center">
                        <div class="col-3">
                          <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.awal_id_obat ? item.awal_id_obat.substring(0, 10) : '-' }}</p>
                          <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.awal_nama_obat || '-' }}</h6>
                        </div>
                        <div class="col-3">
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_signa || '-' }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_harga | parse('money') }}</p>
                          <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_qty || '-' }} / {{ item.awal_satuan || '-' }}</p>
                        </div>
                        <div class="col-6">
                          <div class="card card-custom" style="border-radius: 15px 0px 0px 15px;">
                            <div class="card card-overlay body bg-light-success p-4" style="border-radius: 15px 0px 0px 15px;">
                              <div class="image-overlay pointer" style="border-radius: 15px 0px 0px 15px;" v-if="!disableEdit">
                                <div class="d-flex align-items-center justify-content-center h-100" @click="$parent.switchState('update', item)">
                                  <i class="ri-edit-2-line"></i>
                                </div>
                              </div>
                              <div class="row align-items-center">
                                <div class="col-5">
                                  <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.final_id_obat ? item.final_id_obat.substring(0, 10) : '-' }}</p>
                                  <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.final_nama_obat || '-' }}</h6>
                                </div>
                                <div class="col-5">
                                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_signa || '-' }}</p>
                                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_harga | parse('money') }}</p>
                                  <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_qty || '-' }} / {{ item.final_satuan || '-' }}</p>
                                </div>
                                <div class="col-2 align-items-start" v-if="showChecklist">
                                  <label class="checkbox checkbox-outline checkbox-danger">
                                    <input type="checkbox" :name="'status_resep_detail_rnap'+item.id" v-model="item.status_resep_detail_rnap" :disabled="enableChecklist" :checked="item.status_resep_detail_rnap"  @change="$parent.updateResepDetail(item)" />
                                    <span></span>
                                  </label>
                                </div>
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-3" v-if="!disableAdd">
                  <div class="card card-custom p-0 ml-12">
                    <div class="card body bg-light-warning pt-0 pb-0 pr-0 pl-3" style="height: 60px;">
                      <div class="row align-items-center">
                        <div class="col-3">
                          <p class="text-muted mb-0 font-weight-bold font-size-sm"></p>
                          <h6 class="font-weight-bolder text-dark mb-0 pb-0"></h6>
                        </div>
                        <div class="col-3">
                          <p class="mb-0 font-weight-bold font-size-sm"></p>
                          <p class="mb-0 font-weight-bold font-size-sm"></p>
                          <p class="mb-0 font-weight-bold font-size-sm"></p>
                        </div>
                        <div class="col-6">
                          <div class="card card-custom" style="border-radius: 15px 0px 0px 15px;">
                            <div class="card body bg-light-success" style="border-radius: 15px 0px 0px 15px; height: 60px">
                              <div class="row h-100 align-items-center justify-content-center pointer" @click="$parent.switchState('create', { resep_racik_id: racik.id, final_signa: '-' })">
                                <i class="ri-add-fill"></i>
                              </div>
                            </div>
              
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
    </div>
  </div>  
</template>
    
  <script>
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'medis_planning_obat_jadi_list',
    props: {
      oResep: {
        type: Object,
        required: true,
        default() {
          return []
        }
      },
      disableEdit: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      },
      disableAdd: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      },
      showChecklist: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      },
      enableChecklist: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        dataResepDetail: [],
      }
    },
    watch: {
      'oResep.id': {
        handler(to, from) {
          console.log('farmasi_telaah_obat_racik_list watch')
          this.findDetailResep()
        }
      }
    },
    mounted() {
      console.log('farmasi_telaah_obat_racik_list mounted', this.oResep)
      this.findDetailResep();
    },
    methods: {
      findDetailResep () {
        this.$_api.post('resep_detail_rnap/list', { resep_rnap_id: this.oResep.id, is_racik: 1, page: 1, limit: 99999 }).then((res) => {
          this.dataResepDetail = res.data
          for (let a of this.dataResepDetail) {
            for (let b of a.resep_detail_rnaps) {
              if(b.final_signa === null) b.final_signa = '-' 
            }
          }
        })
      },
    }
  }
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer !important;
  }

  .card-image {
    position: relative;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .card-overlay:hover .image-overlay {
    opacity: 1;
    z-index: 1;
  }
</style>