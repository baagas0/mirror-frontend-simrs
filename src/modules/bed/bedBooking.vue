<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-bed_booking',
  data() {
    return {
      config: {
        title: 'Daftar Bed Booking',
        model_api: 'bed_booking',
        getter: 'bedBooking',
        setter: 'bedBooking',
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
          // ms_bed_booking_id
          {
            id: 'ms_bed_booking_id',
            data: 'ms_bed_booking_id',
            label: 'ID Kamar',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          // nama_bed_booking
          {
            id: 'nama_bed_booking',
            data: 'nama_bed_booking',
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
          // ms_bed_id
          {
            id: 'ms_bed_id',
            data: 'ms_bed_id',
            label: 'Nama Bed',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_bed' },
              detail: true,
              create: {
                setter: 'msBed',
                getter: 'msBed',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_bed',
                    code: 'ms_bed_id',
                    display: ['nama_bed']
                  }
                }
              },
              update: {
                setter: 'msBed',
                getter: 'msBed',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'nama_bed',
                    code: 'ms_bed_id',
                    display: ['nama_bed']
                  }
                }
              },
              filter: true
            }
          }
        ]
      }
    }
  }
}
</script>
