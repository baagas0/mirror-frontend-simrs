<template>
  <div class="container-fluid">
      <tas-base-crud ref="base-crud-bed-monitoring" :config="config" classes="-">
        <template v-slot:list-table-action="data">
          <a v-b-tooltip.top.viewport="'Pindah Bed'" class="btn btn-icon btn-warning btn-sm" v-b-modal.modal-pindah @click="data = data.rowData; edit = !edit">
            <i class="ri-arrow-right-up-line"></i>
          </a>
        </template>
      </tas-base-crud>

      <modal-pindah
        :data="data"
        :edit="edit"
        @alertFromChild="triggerAlert($event), getDatas()"
      />
  </div>
</template>

<script>
import ModalPindah from './component/bedMonitoring/alih_bed.vue'
import ModalEdit from './component/bedMonitoring/update.vue'

export default {
  name: 'crud-bed_monitoring',
  components: {
    ModalPindah,
    ModalEdit
  },
  data () {
    return {
      edit: false,
      data: {},
      config: {
        title: 'Daftar Bed Monitoring',
        model_api: 'bed_monitoring',
        getter: 'msBed/monitoringBypassUri',
        setter: 'msBed/monitoringBypassUri',
        pk_field: null,
        frontendPaginate: true,
        permission: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        slave: [
        ],
        fields: [
          // ms_bed_monitoring_id
          {
            id: 'ms_bed_monitoring_id',
            data: 'ms_bed_monitoring_id',
            label: 'ID BedMonitoring',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_bed
          {
            id: 'nama_bed',
            data: 'nama_bed',
            label: 'Nama Bed',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // tgl_mulai
          {
            id: 'tgl_mulai',
            data: 'tgl_mulai',
            label: 'Tanggal Masuk',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: { type: 'date' }
            }
          },
          // tgl_selesai
          {
            id: 'tgl_selesai',
            data: 'tgl_selesai',
            label: 'Tanggal Selesai',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: { type: 'date' }
            }
          },
          // is_checkout
          {
            id: 'is_checkout',
            data: 'is_checkout',
            label: 'Status',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              create: true,
              update: true,
              filter: {
                view_data: 'active',
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              }
            }
          },
          // keterangan_history_bed
          {
            id: 'keterangan_history_bed',
            data: 'keterangan_history_bed',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: false
            }
          }
        ]
      }
    }
  },
  methods: {
    getDatas () {
      console.log('dataas')
    },
    triggerAlert (event) {
      // let vm = this;
      // vm.getDatas()
      // vm.$store.commit("set_alert", event);
      this.$refs['base-crud-bed-monitoring'].$children[1].getData()
      this.$_alert.success(event)
    }
  }
}
</script>
