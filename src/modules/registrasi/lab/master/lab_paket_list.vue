<template lang="">
  <tas-base-crud :config="config"></tas-base-crud>
</template>

<script>
export default {
  name: 'crud-lab_paket_list',
  data() {
    return {
      tesAsyncData: {},
      config: {
        title: 'Daftar Lab Paket List',
        model_api: 'lab_paket_list',
        getter: 'lab_paket_list',
        setter: 'lab_paket_list',
        pk_field: 'id_lab_paket_list',
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
          // id_lab_paket_list
          {
            id: 'id_lab_paket_list',
            data: 'id_lab_paket_list',
            label: 'Nama Lab Paket List',
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
                    display: ['nama_jenis_penunjang', 'nama_penunjang', 'parameter_normal', 'satuan', 'keterangan_penunjang'],
                    headerDisplay: ['Jenis Penunjang', 'Nama Penunjang', 'Parameter Normal', 'Satuan', 'Keterangan']
                  },
                  filterAPI: {
                    nama_jenis_penunjang: 'LABORATORIUM'
                  }
                },
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
                    display: ['nama_jenis_penunjang', 'nama_penunjang', 'parameter_normal', 'satuan', 'keterangan_penunjang'],
                    headerDisplay: ['Jenis Penunjang', 'Nama Penunjang', 'Parameter Normal', 'Satuan', 'Keterangan']
                  },
                  filterAPI: {
                    nama_jenis_penunjang: 'LABORATORIUM'
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
            label: 'No Urut Tampilan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'number' },
              update: { type: 'number' },
              filter: true
            }
          },
          // keterangan_lab_paket_list
          {
            id: 'keterangan_lab_paket_list',
            data: 'keterangan_lab_paket_list',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: true
            }
          },

          // NILAI RUJUKAN
          {
            id: 'operator',
            data: 'operator',
            label: 'Operator Nilai',
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
                      { label: 'Range (-)', code: '-' },
                      { label: 'Kurang dari (<)', code: '<' },
                      { label: 'Lebih dari (>)', code: '>' },
                      { label: 'Sama dengan (=)', code: '=' },
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
                      { label: 'Range (-)', code: '-' },
                      { label: 'Kurang dari (<)', code: '<' },
                      { label: 'Lebih dari (>)', code: '>' },
                      { label: 'Sama dengan (=)', code: '=' },
                    ]
                  }
                }
              },
              filter: true
            }
          },
          // nilai_r_neonatus_min
          {
            id: 'nilai_r_neonatus_min',
            data: 'nilai_r_neonatus_min',
            label: 'Neonatus',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_neonatus_max
          {
            id: 'nilai_r_neonatus_max',
            data: 'nilai_r_neonatus_max',
            label: 'Neonatus Max',
            placeholder: null,
            conditionalShow: [{ code: 'operator', operator: 'includes', value: ['-'] }],
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_bayi_min
          {
            id: 'nilai_r_bayi_min',
            data: 'nilai_r_bayi_min',
            label: 'Bayi',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_bayi_max
          {
            id: 'nilai_r_bayi_max',
            data: 'nilai_r_bayi_max',
            label: 'Bayi Max',
            placeholder: null,
            conditionalShow: [{ code: 'operator', operator: 'includes', value: ['-'] }],
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_anak_min
          {
            id: 'nilai_r_anak_min',
            data: 'nilai_r_anak_min',
            label: 'Anak',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_anak_max
          {
            id: 'nilai_r_anak_max',
            data: 'nilai_r_anak_max',
            label: 'Anak Max',
            placeholder: null,
            conditionalShow: [{ code: 'operator', operator: 'includes', value: ['-'] }],
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_d_perempuan_min
          {
            id: 'nilai_r_d_perempuan_min',
            data: 'nilai_r_d_perempuan_min',
            label: 'Dewasa Perempuan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_d_perempuan_max
          {
            id: 'nilai_r_d_perempuan_max',
            data: 'nilai_r_d_perempuan_max',
            label: 'Dewasa Perempuan Max',
            placeholder: null,
            conditionalShow: [{ code: 'operator', operator: 'includes', value: ['-'] }],
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_d_laki_min
          {
            id: 'nilai_r_d_laki_min',
            data: 'nilai_r_d_laki_min',
            label: 'Dewasa Laki',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
          // nilai_r_d_laki_max
          {
            id: 'nilai_r_d_laki_max',
            data: 'nilai_r_d_laki_max',
            label: 'Dewasa Laki Max',
            placeholder: null,
            conditionalShow: [{ code: 'operator', operator: 'includes', value: ['-'] }],
            methods: {
              list: true,
              detail: true,
              create: { type: 'text', validation: [] },
              update: { type: 'text', validation: [] },
              filter: true
            }
          },
        ]
      }
    }
  },
  // mounted () {
  //   console.log('BEFORE 1')
  //   setTimeout(async () => {
  //     console.log('BEFORE 2')
  //     let xx = await this.tesAsync()
  //     console.log('AFER 1')
  //     console.log(xx)
  //   }, 3000);
  // },
  // methods: {
  //   async tesAsync () {
  //     console.log('INIT')
  //     return this.$_api.list('bank', {}).then((res) => {
  //       return res
  //     })
  //   }
  // }
}
</script>
