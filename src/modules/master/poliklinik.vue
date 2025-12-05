<template lang="">
  <div class="w-100">
    <tas-base-crud ref="base-crud-poli" :config="config">

      <template v-slot:list-satu_sehat_id="rowData">
        <div class="w-100">
          <i class="ri-refresh-fill" :class="[{ 'text-success': rowData.rowData.satu_sehat_id }, { 'text-danger': !rowData.rowData.satu_sehat_id }]"></i>
        </div>
      </template>

      <template v-slot:list-table-action="rowData">
        <button class="btn btn-primary btn-circle mr-2" @click="syncSatuSehat(rowData.rowData)">
          <i class="ri-loop-left-line"></i>
          Sync IHS
        </button>
      </template>
    </tas-base-crud>
  
    <b-toast id="toast-detail-syncIhs" variant="info" solid no-auto-hide no-close-button :visible="isLoadingIhsSync">
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-center pt-2">
          <b-spinner label="Spinning" small></b-spinner>
          <strong class="mr-auto pl-3">Indonesia Health System ...</strong>
          <small class="text-muted mr-2">
            <time-ago locale="id"></time-ago>
          </small>
        </div>
      </template>
      Sedang sync dengan IHS.
      <b-progress class="mt-3" :value="0" :max="1" animated></b-progress>
    </b-toast>
  </div>
</template>

<script>
export default {
  name: 'crud-poliklinik',
  data () {
    return {
      config: {
        title: 'Daftar Poliklinik',
        model_api: 'poliklinik',
        getter: 'msPoliklinik',
        setter: 'msPoliklinik',
        pk_field: null,
        frontendPaginate: false,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // satu_sehat_id
          {
            id: 'satu_sehat_id',
            data: 'satu_sehat_id',
            label: 'Satu Sehat',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_poliklinik
          {
            id: 'nama_poliklinik',
            data: 'nama_poliklinik',
            label: 'Nama Poliklinik',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // kode_poliklinik
          {
            id: 'kode_poliklinik',
            data: 'kode_poliklinik',
            label: 'Kode Poliklinik',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          }
        ]
      },
      isLoadingIhsSync: false
    }
  },
  methods: {
    async syncSatuSehat(data) {
      try {
        const vm = this
        const organization = localStorage.getItem('organization_satu_sehat')
        this.isLoadingIhsSync = true
        let payload = {}
  
        payload = {
          uri: 'Location',
          params: {
            organization: organization,
            name: data.nama_poliklinik
          }
        }
        const find_ihs = await this.$_api.post('ihs/request', payload)
        console.log(find_ihs)
  
        const entry = find_ihs.data.entry
        if (entry && entry.length) {
          // Data exist on satu sehat
          const satu_sehat_id = entry[0].resource.id
          await this.$_api.post('msPoliklinik/update', {
            ...data,
            id: data.id,
            satu_sehat_id: satu_sehat_id
          })
  
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false
  
          // Refresh data
          vm.$refs['base-crud-poli'].$children[1].getData()
          this.$_alert.success('Data telah sync dengan satu sehat')
        } else {
          // Create new location in IHS
          payload = {
            uri: 'Location',
            method: 'post',
            data: {
              resourceType: "Location",
              identifier: [],
              status: "active",
              name: data.nama_poliklinik,
              description: data.kode_poliklinik,
              mode: "instance",
              telecom: [],
              address: {},
              physicalType: {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/location-physical-type",
                    code: "ro",
                    display: "Room"
                  }
                ]
              },
              position: {
                longitude: 0,
                latitude: 0,
                altitude: 0
              },
              managingOrganization: {
                reference: `Organization/${organization}`
              }
            }
          }
          const location = await this.$_api.post('ihs/request', payload)
          
          await this.$_api.post('msPoliklinik/update', {
            ...data,
            id: data.id,
            satu_sehat_id: location.data.id
          })
  
          // HIDE IHS TOAST
          this.isLoadingIhsSync = false
  
          // Refresh data
          vm.$refs['base-crud-poli'].$children[1].getData()
          this.$_alert.success('Data telah sync dengan satu sehat')
        }
        
      } catch (error) {
        console.log(error)
        
        // HIDE IHS TOAST
        this.isLoadingIhsSync = false

        this.$_alert.error(error.data, 'Terjadi Kesalahan', error.data.message)
      }
    }
  }
}
</script>
