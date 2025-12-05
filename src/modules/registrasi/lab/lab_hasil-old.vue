<template lang="">
  <tas-base-crud :config="config">
    <template v-slot:list-action>
        <button class="btn btn-warning btn-circle mr-2" @click="createLabHasil()" :disabled="$route.name !== 'Lab Regis'">
          <i class="ri-refresh-line p-0"></i>
          Buat Lab Hasil
        </button>
        <b-toast id="toast-detail-createLabHasil" variant="info" solid no-auto-hide no-close-button :visible="isLoadingSync">
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-center pt-2">
              <b-spinner label="Spinning" small></b-spinner>
              <strong class="mr-auto pl-3">Lab Hasil ...</strong>
              <small class="text-muted mr-2">
                <time-ago locale="id"></time-ago>
              </small>
            </div>
          </template>
          Sedang membuat lab hasil
          <b-progress class="mt-3" :value="syncCount" :max="1" animated></b-progress>
        </b-toast>
    </template>
  </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-lab_hasil',
  data() {
    return {
      isLoadingSync: false,
      syncCount: 0,
      config: {
        title: 'Daftar Lab Hasil',
        model_api: 'lab_hasil',
        getter: 'lab_hasil',
        setter: 'lab_hasil',
        pk_field: 'id_lab_hasil',
        frontendPaginate: true,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
          
        ],
        fields: [
          // id_lab_hasil
          {
            id: 'id_lab_hasil',
            data: 'id_lab_hasil',
            label: 'ID Lab Hasil',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // lab_paket_id
          {
            id: 'lab_paket_id',
            data: 'lab_paket_id',
            label: 'Lab Paket',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_lab_paket' },
              detail: { view_data: 'nama_lab_paket' },
              create: {
                setter: 'lab_paket',
                getter: 'lab_paket',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_lab_paket',
                    code: 'id_lab_paket',
                    display: ['nama_lab_paket', 'keterangan_lab_paket']
                  }
                }
              },
              update: {
                setter: 'lab_paket',
                getter: 'lab_paket',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_lab_paket',
                    code: 'id_lab_paket',
                    display: ['nama_lab_paket', 'keterangan_lab_paket']
                  }
                }
              },
              filter: true
            }
          },
          // penunjang_id
          {
            id: 'penunjang_id',
            data: 'penunjang_id',
            label: 'Penunjang',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_penunjang' },
              detail: { view_data: 'nama_penunjang' },
              create: {
                setter: 'penunjang',
                getter: 'penunjang',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_penunjang',
                    code: 'penunjang_id',
                    display: ['nama_penunjang', 'keterangan_penunjang']
                  }
                }
              },
              update: {
                setter: 'penunjang',
                getter: 'penunjang',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_penunjang',
                    code: 'penunjang_id',
                    display: ['nama_penunjang', 'keterangan_penunjang']
                  }
                }
              },
              filter: true
            }
          },
          // queue
          {
            id: 'queue',
            data: 'queue',
            label: 'Antrian',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // hasil
          {
            id: 'hasil',
            data: 'hasil',
            label: 'Hasil',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // is_normal
          {
            id: 'is_normal',
            data: 'is_normal',
            label: 'Normal',
            placeholder: null,
            methods: {
              list: {
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Tidak', code: false }
                    ]
                  }
                }
              },
              filter: false
            }
          },
          
        ]
      }
    }
  },
  mounted () {
    console.log(this.$route.query.id)
  },
  methods: {
    createLabHasil () {
      console.log(this.$route)
      if (this.$route.name === 'Lab Regis' && this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id
        this.$bvToast.show('toast-detail-createLabHasil')
        this.isLoadingSync = true
        this.syncCount = 0
        this.$_api
          .post('lab_regis/createLabHasil', {id})
          .then((res) => {
            setTimeout(() => {
              this.isLoadingSync = false
              this.syncCount++
              this.$_alert.success('Lab Hasil berhasil dibuat')
              // this.$refs['sync-module'].$children[1].getData()
            }, 1000)
            
          })
          .catch((err) => {
            setTimeout(() => {
              // this.isLoadingSync = false
              // this.$_alert.error(err)
              this.isLoadingSync = false
              this.syncCount++
              // this.$refs['sync-module'].$children[1].getData()
              this.$_alert.error({}, err.data.data)
            }, 1000)
          })
      } else {
        this.$_alert.error({}, 'Tidak dapat membuat lab hasil')
      }
    },
  }
}
</script>
