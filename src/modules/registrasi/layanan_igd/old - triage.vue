<template lang="">
    <tas-base-crud ref="CRUD-msHargaFasilitas" :config="config">
      <!-- <template v-slot:create-form>
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h5 class="card-title align-items-start flex-column">Tambah Harga Fasilitas</h5>
            <div class="card-toolbar">
              <a @click="$children[0].getEvent('list')" class="btn btn-outline-primary btn-icon btn-circle" v-b-tooltip.top="$t('global.go_back')">
                <i class="ri-arrow-go-back-line p-0"></i>
              </a>
            </div>
          </div>
          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
                <div class="row">
                  <div class="col-12">
                    <s-input v-model="v.nama" :item="{
                      label: 'Nama',
                      id: 'nama',
                      data: 'nama',
                      type: 'text',
                      validation: ['required'],
                      param: {},
                    }" :valuee="''" />
                  </div>

                  <div class="col-12">
                    <s-input v-model="v.nik" :item="{
                      label: 'NIK',
                      id: 'nik',
                      data: 'nik',
                      type: 'text',
                      validation: ['required'],
                      param: {},
                    }" :valuee="''" />
                  </div>

                  <div class="col-12">
                    <s-input v-model="v.tanggal" :item="{
                      label: 'Tanggal',
                      id: 'tanggal',
                      data: 'tanggal',
                      type: 'date',
                      validation: ['required'],
                      param: {},
                    }" :valuee="''" />
                  </div>

                  <div class="col-12" v-if="false">
                    <s-input v-model="v.is_registrasi" :item="{
                      label: 'Sudah Registrasi',
                      id: 'is_registrasi',
                      data: 'is_registrasi',
                      type: 'select',
                      validation: ['required'],
                      param: {},
                      pointer: {
                        label: 'label',
                        code: 'code'
                      },
                      api: false,
                      optionList: [
                        { code: false, label: 'Belum' },
                        { code: true, label: 'Sudah' },
                      ]
                    }" :valuee="''" />
                  </div>

                  <div class="col-12">
                    <h5 class="">Formulir</h5>
                    <hr>
                  </div>

                  <div class="col-12">
                    <tas-base-form-custom :field="d_form" v-model="v.asesmen"></tas-base-form-custom>
                  </div>

                  <template>
                    <div class="col-12 align-self-center">
                      <button type="submit" class="btn btn-light-primary mr-3">
                        <i class="ri-save-line"></i>
                        {{ $t('global.submit') }}
                      </button>
                    </div>
                  </template>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </template> -->
      <template v-slot:list-asesmen="data">
        <p v-for="(value, field, i) in data.rowData.asesmen" :key="field+i" class="pb-0 mb-0">
          <i class="ri-arrow-drop-right-fill"></i>
          {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
        </p>
      </template>
      <template v-slot:detail-asesmen="data">
        <p v-for="(value, field, i) in data.rowData.asesmen" :key="field+i" class="pb-0 mb-0">
          <i class="ri-arrow-drop-right-fill"></i>
          {{ field.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}: {{ value }}
        </p>
      </template>
    </tas-base-crud>
</template>

<script>
export default {
  name: 'crud-triage',
  data () {
    return {
      d_form: [],
      v: {},
      bulk_tarif: [],
      config: {
        title: 'Daftar Triage',
        model_api: 'triage',
        getter: 'triage',
        setter: 'triage',
        pk_field: 'id',
        frontendPaginate: true,
        custom_api: {
          // list: 'msHargaFasilitas/listFasilitasHargaTarifPerHalamanBypassUri'
        },
        permission: {
          create: 'template-allow-all',
          read: 'template-allow-all',
          update: 'template-allow-all',
          delete: 'template-allow-all'
        },
        slave: [
        ],
        fields: [
          // id_triage
          {
            id: 'id',
            data: 'id',
            label: 'ID',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama
          {
            id: 'nama',
            data: 'nama',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // nik
          {
            id: 'nik',
            data: 'nik',
            label: 'NIK',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: false
            }
          },
          // tgl_lahir
          {
            id: 'tgl_lahir',
            data: 'tgl_lahir',
            label: 'Tanggal Lahir',
            placeholder: null,
            methods: {
              list: { transform: 'date' },
              detail: { transform: 'date' },
              create: { type: 'date' },
              update: { type: 'date' },
              filter: { type: 'date' }
            }
          },
          // is_registrasi
          {
            id: 'is_registrasi',
            data: 'is_registrasi',
            label: 'Sudah Registrasi?',
            placeholder: null,
            methods: {
              list: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              detail: {
                order: true,
                class: { false: 'badge badge-danger', true: 'badge badge-primary' },
                transform: 'ynBool'
              },
              create: false,
              update: {
                view_data: 'active',
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Belum', code: false }
                    ]
                  }
                }
              },
              filter: {
                view_data: 'active',
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Ya', code: true },
                      { label: 'Belum', code: false }
                    ]
                  }
                }
              }
            }
          },
          // asesmen
          {
            id: 'asesmen',
            data: 'asesmen',
            label: 'JSON ASSESMEN',
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
  mounted () {
    this.$_api.post('dform_triage/list_tree', { halaman: 1, jumlah: 999999 }).then(res => {
      // let d_form = []

      let child1 = []
      for (const lv1 of res.data) {
        let child2 = []
        if (lv1.child) {
          for (const lv2 of lv1.child) {
            
          }
        }

        if (lv1.child.length > 0) child1.push({ position: lv1.position, child: child2 })
        else {
          child1.push({
            position: lv1.position,
            show: lv1.show,
            class: lv1.class_dform_triage,
            value: lv1.value,
            label: lv1.label,
            placeholder: lv1.placeholder,
            type: lv1.type_dform_triage,
            id: lv1.key,
            api: lv1.api_option ? lv1.getter : false,
            hint: lv1.keterangan,
            child: child2
          })
        }
      }
      this.d_form = child1
    })
  },
  methods: {
    getData () {

    },
    onSubmit () {
      this.$_api.create('triage', this.v).then(res => {

        if (res.status === 200) {
          this.$_alert.success({message: res.message ? res.message : 'Data berhasil disimpan'}, 'Berhasil')
          this.$children[0].getEvent('list')
        } else {
          this.$_alert.error({message: res.message}, 'Terjadi kesalahan')
        }
      })
    }
  }
}
</script>
