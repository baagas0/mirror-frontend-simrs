<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-asuransi',
  data() {
    return {
      config: {
        title: 'Daftar Asuransi',
        model_api: 'msAsuransi',
        getter: 'msAsuransi',
        setter: 'msAsuransi',
        pk_field: null,
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
          // nama_asuransi
          {
            id: 'nama_asuransi',
            data: 'nama_asuransi',
            label: 'Nama Asuransi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // tipe_asuransi
          {
            id: 'tipe_asuransi',
            data: 'tipe_asuransi',
            label: 'Tipe Asuransi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: {
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [
                      { label: 'UMUM', code: 1 },
                      { label: 'BPJS', code: 2 },
                      { label: 'ASURANSI KESEHATAN', code: 3 },
                      { label: 'ASURANSI PERUSAHAAN', code: 4 },
                      { label: 'KEMENKES', code: 5 }
                    ]
                  }
                }
              },
              update: {
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [
                      { label: 'UMUM', code: 1 },
                      { label: 'BPJS', code: 2 },
                      { label: 'ASURANSI KESEHATAN', code: 3 },
                      { label: 'ASURANSI PERUSAHAAN', code: 4 },
                      { label: 'KEMENKES', code: 5 }
                    ]
                  }
                }
              },
              filter: {
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    display: ['label'],
                    list: [
                      { label: 'UMUM', code: 1 },
                      { label: 'BPJS', code: 2 },
                      { label: 'ASURANSI KESEHATAN', code: 3 },
                      { label: 'ASURANSI PERUSAHAAN', code: 4 },
                      { label: 'KEMENKES', code: 5 }
                    ]
                  }
                }
              },
            }
          },
          // cp_telepon
          {
            id: 'cp_telepon',
            data: 'cp_telepon',
            label: 'Telepon',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // cp_nama
          {
            id: 'cp_nama',
            data: 'cp_nama',
            label: 'Nama CP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // cp_hp
          {
            id: 'cp_hp',
            data: 'cp_hp',
            label: 'Telepon CP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // cp_email
          {
            id: 'cp_email',
            data: 'cp_email',
            label: 'Email CP',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // ms_harga_id
          {
            id: 'ms_harga_id',
            data: 'ms_harga_id',
            label: 'Harga',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: {
                setter: 'msHarga',
                getter: 'msHarga',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_harga',
                    code: 'id',
                    display: ['nama_harga']
                  }
                }
              },
              update: {
                setter: 'msHarga',
                getter: 'msHarga',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_harga',
                    code: 'id',
                    display: ['nama_harga']
                  }
                }
              },
              filter: false
            }
          },
          // nama_harga
          {
            id: 'nama_harga',
            data: 'nama_harga',
            label: 'Nama Harga',
            placeholder: null,
            methods: {
              list: true,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          }
        ]
      }
    }
  }
}
</script>
