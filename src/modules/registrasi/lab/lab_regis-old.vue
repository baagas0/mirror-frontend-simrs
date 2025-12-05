<template lang="">
  <div class="w-100">
    <tas-base-crud ref="sync-module" :config="config">
      <template v-slot:list-diagnosa="data">
        <p v-for="(value, field, i) in data.rowData.diagnosa" :key="field+i" class="pb-0 mb-0">
          <i class="ri-arrow-drop-right-fill"></i>
          {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
        </p>
      </template>
      <template v-slot:list-list_lab_paket="data">
        <p v-for="(value, field, i) in data.rowData.list_lab_paket" :key="'list_lab_paket'+field+i" class="pb-0 mb-0">
          <i class="ri-arrow-drop-right-fill"></i>
          Nama Lab ({{ field+1 }}): {{value.nama_lab_paket}}
        </p>
      </template>
  
      <template v-slot:detail-diagnosa="data">
        <p v-for="(value, field, i) in data.rowData.diagnosa" :key="field+i" class="pb-0 mb-0">
          <i class="ri-arrow-drop-right-fill"></i>
          {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
        </p>
      </template>
      <template v-slot:detail-list_lab_paket="data">
        <p v-for="(value, field, i) in data.rowData.list_lab_paket" :key="'list_lab_paket'+field+i" class="pb-0 mb-0">
          <i class="ri-arrow-drop-right-fill"></i>
          Nama Lab ({{ field+1 }}): {{value.nama_lab_paket}}
        </p>
      </template>
  
      <template v-slot:list-table-action="data">
        <button class="btn btn-sm btn-warning btn-circle mr-2" v-if="parseInt(data.rowData.tot_lab_hasil) === 0" @click="createLabHasil(data.rowData.id_lab_regis)"><i class="ri-refresh-line p-0"></i> buat lab hasil</button>
      </template>

      <template v-slot:detail-footer="data">
        
      </template>
    </tas-base-crud>
    <b-toast id="toast-createLabHasil" variant="info" solid no-auto-hide no-close-button :visible="isLoadingSync">
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
  </div>
</template>

<script>
export default {
  name: 'crud-lab_regis',
  data() {
    return {
      isLoadingSync: false,
      syncCount: 0,
      config: {
        title: 'Daftar Lab Regis',
        model_api: 'lab_regis',
        getter: 'lab_regis',
        setter: 'lab_regis',
        pk_field: null,
        frontendPaginate: true,
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
          {
            name: 'Lab Hasil',
            module: 'registrasi/lab/lab_hasil',
            as_param: 'lab_regis_id',
            key_field: 'id_lab_regis',
            overwrite: {
              fields: [
                // { rule: '1.methods.list', value: false },
                // { rule: '1.methods.filter', value: false }
              ]
            }
          }
        ],
        fields: [
          // id_lab_regis
          {
            id: 'id_lab_regis',
            data: 'id_lab_regis',
            label: 'Nama Bank',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // dokter_id
          {
            id: 'dokter_id',
            data: 'dokter_id',
            label: 'Nama Dokter',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_dokter' },
              detail: { view_data: 'nama_dokter' },
              create: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter']
                  }
                }
              },
              update: {
                setter: 'msDokter',
                getter: 'msDokter',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_dokter',
                    code: 'ms_dokter_id',
                    display: ['nama_dokter']
                  }
                }
              },
              filter: true
            }
          },
          // tanggal_request
          {
            id: 'tanggal_request',
            data: 'tanggal_request',
            label: 'Tanggal Permintaan',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: true
            }
          },
          // list_lab_paket
          {
            id: 'list_lab_paket',
            data: 'list_lab_paket',
            label: 'Daftar Lab Paket',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: {
                setter: 'lab_paket',
                getter: 'lab_paket',
                type: 'lookup-checkbox',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_lab_paket',
                    code: 'id_lab_paket',
                    display: ['nama_lab_paket']
                  }
                }
              },
              update: {
                setter: 'lab_paket',
                getter: 'lab_paket',
                type: 'lookup-checkbox',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_lab_paket',
                    code: 'id_lab_paket',
                    display: ['nama_lab_paket']
                  }
                }
              },
              filter: true
            }
          },
          // klinis
          {
            id: 'klinis',
            data: 'klinis',
            label: 'Klinis',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // is_cito
          {
            id: 'is_cito',
            data: 'is_cito',
            label: 'Cito',
            hint: 'Apakah Cito?',
            placeholder: null,
            methods: {
              list: { class: { false: 'badge badge-danger', true: 'badge badge-primary' }, transform: 'ynBool' },
              detail: { class: { false: 'badge badge-danger', true: 'badge badge-primary' }, transform: 'ynBool' },
              create: {
                type: 'radio',
                value: false,
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
                value: false,
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
          // is_registrasi
          {
            id: 'is_registrasi',
            data: 'is_registrasi',
            label: 'Registrasi',
            hint: 'Apakah Sudah Registrasi?',
            placeholder: null,
            methods: {
              list: { class: { false: 'badge badge-danger', true: 'badge badge-primary' }, transform: 'ynBool' },
              detail: { class: { false: 'badge badge-danger', true: 'badge badge-primary' }, transform: 'ynBool' },
              create: {
                type: 'radio',
                value: false,
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
                value: false,
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
          // keterangan_lab_regis
          {
            id: 'keterangan_lab_regis',
            data: 'keterangan_lab_regis',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: false
            }
          },
          // diagnosa
          {
            id: 'diagnosa',
            data: 'diagnosa',
            label: 'Diagnosa',
            placeholder: null,
            methods: {
              list: { type: 'row-slot' },
              detail: { type: 'row-slot' },
              create: { type: 'dynamic-json' },
              update: { type: 'dynamic-json' },
              filter: true
            }
          }
        ]
      }
    }
  },
  watch: {
    syncCount: {
      immediate: false,
      deep: false,
      handler (e) {
        setTimeout(() => {
          this.isLoadingSync = false
          this.$refs['sync-module'].$children[1].getData()
        }, 1000)
      }
    }
  },
  methods: {
    createLabHasil (id) {
      this.$bvToast.show('toast-createLabHasil')
      this.isLoadingSync = true
      this.syncCount = 0
      this.$_api
        .post('lab_regis/createLabHasil', {id})
        .then((res) => {
          setTimeout(() => {
            // this.isLoadingSync = false
            this.syncCount++
            this.$refs['sync-module'].$children[1].getData()
          }, 1000)
          
        })
        .catch((err) => {
          // this.isLoadingSync = false
          // this.$_alert.error(err)
          this.isLoadingSync = false
          this.syncCount++
          this.$refs['sync-module'].$children[1].getData()
          this.$_alert.error({}, err.data.data)
        })
    },
  }
}
</script>
