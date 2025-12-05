<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-msHargaJasa',
  data() {
    return {
      config: {
        title: 'Daftar Harga Jasa',
        model_api: 'msHargaJasa',
        getter: 'msHargaJasa',
        setter: 'msHargaJasa',
        // pk_field: 'ms_harga_jasa_id',
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
          // ms_harga_id
          {
            id: 'ms_harga_id',
            data: 'ms_harga_id',
            label: 'Harga',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_harga' },
              detail: { view_data: 'nama_harga' },
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
          // ms_jasa_id
          {
            id: 'ms_jasa_id',
            data: 'ms_jasa_id',
            label: 'Jasa',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_jasa' },
              detail: { view_data: 'nama_jasa' },
              create: {
                setter: 'msJasa',
                getter: 'msJasa',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jasa',
                    code: 'id',
                    display: ['nama_jasa']
                  }
                }
              },
              update: {
                setter: 'msJasa',
                getter: 'msJasa',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_jasa',
                    code: 'id',
                    display: ['nama_jasa']
                  }
                }
              },
              filter: false
            }
          },
          // ms_tarif_id
          {
            id: 'ms_tarif_id',
            data: 'ms_tarif_id',
            label: 'Tarif',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_tarif' },
              detail: { view_data: 'nama_tarif' },
              create: {
                setter: 'msTarif',
                getter: 'msTarif',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tarif',
                    code: 'id',
                    display: ['nama_tarif']
                  }
                }
              },
              update: {
                setter: 'msTarif',
                getter: 'msTarif',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_tarif',
                    code: 'id',
                    display: ['nama_tarif']
                  }
                }
              },
              filter: false
            }
          },
          // harga_beli
          {
            id: 'harga_beli',
            data: 'harga_beli',
            label: 'Harga Beli',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: { type: 'money' },
              update: { type: 'money' },
              filter: false
            }
          },
          // harga_jual
          {
            id: 'harga_jual',
            data: 'harga_jual',
            label: 'Harga Beli',
            placeholder: null,
            methods: {
              list: { transform: 'money' },
              detail: { transform: 'money' },
              create: { type: 'money' },
              update: { type: 'money' },
              filter: false
            }
          },
          // keterangan
          {
            id: 'keterangan',
            data: 'keterangan',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: { transform: 'textarea' },
              detail: { transform: 'textarea' },
              create: false,
              update: false,
              filter: false
            }
          },
        ]
      }
    }
  }
}
</script>
