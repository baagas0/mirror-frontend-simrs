<template>
  <div class="w-100">
    <div class="col-12" v-for="(item, i) in aResepDetail" :key="'resep-detail' + i">
      <div class="card card-custom p-3">
        <div class="card body bg-light-warning pt-0 pb-0 pr-0 pl-3">
          <div class="row align-items-center">
            <div class="col-3">
              <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.awal_id_obat ? item.awal_id_obat.substring(0, 10) : '' }}</p>
              <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.awal_nama_obat || '-' }}</h6>
            </div>
            <div class="col-3">
              <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_signa || '-' }}</p>
              <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_harga || '-' }}</p>
              <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_qty || '-' }} / {{ item.awal_satuan
                || '-' }}</p>
              <p class="mb-0 font-weight-bold font-size-sm">{{ item.awal_aturan_pakai || '-' }}</p>
            </div>
            <div class="col-6" v-if="!readonly">
              <div class="card card-custom" style="border-radius: 15px 0px 0px 15px;">
                <!-- <div class="card-image">
                  <img class="card-img-top" src="https://via.placeholder.com/150x100" alt="Card image cap">
                </div> -->
                <div class="card card-overlay body bg-light-success p-4" style="border-radius: 15px 0px 0px 15px;">
                  <div class="image-overlay pointer" style="border-radius: 15px 0px 0px 15px;">
                    <div class="d-flex align-items-center justify-content-center h-100" @click="$parent.switchState('update', item)">
                      <i class="ri-edit-2-line"></i>
                    </div>
                  </div>
                  <div class="row align-items-center">
                    <div class="col-5">
                      <p class="text-muted mb-0 font-weight-bold font-size-sm">{{ item.final_id_obat ? item.final_id_obat.substring(0, 10) : '' }}</p>
                      <h6 class="font-weight-bolder text-dark mb-0 pb-0">{{ item.final_nama_obat || '-' }}</h6>
                    </div>
                    <div class="col-5">
                      <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_signa || '-' }}</p>
                      <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_harga || '-' }}</p>
                      <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_qty || '-' }} / {{ item.final_satuan
                        || '-' }}</p>
                        <p class="mb-0 font-weight-bold font-size-sm">{{ item.final_aturan_pakai || '-' }}</p>
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
      <div class="card card-custom p-3">
        <div class="card body bg-light-warning pt-0 pb-0 pr-0 pl-3" style="height: 80px;">
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
            <div class="col-6" v-if="!readonly">
              <div class="card card-custom" style="border-radius: 15px 0px 0px 15px;">
                <div class="card body bg-light-success" style="border-radius: 15px 0px 0px 15px; height: 80px">
                  <div class="row h-100 align-items-center justify-content-center pointer" @click="$parent.switchState('create')">
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
</template>
    
  <script>
  import moment from 'moment'
  moment.locale('id')
  
  export default {
    name: 'medis_planning_obat_jadi_list',
    props: {
      aResepDetail: {
        type: Array,
        required: true,
        default() {
          return []
        }
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    watch: {
      
    },
    mounted() {
    },
    methods: {
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