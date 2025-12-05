<template lang="">
  <div class="w-100">
    <tas-base-crud :config="{ ...config, filter_api: { tipe_kelas_kamar: 'kelas_regular' } }">
      <template v-slot:list-tipe_kelas_kamar="rowData">
        <div>
          <span v-if="rowData.rowData.tipe_kelas_kamar === 'kelas_regular'">Kelas Regular</span>
          <span v-else-if="rowData.rowData.tipe_kelas_kamar === 'kelas_kamar_tamu'">Kelas Kamar Tamu</span>
          <span v-else>-</span>
        </div>
      </template>
      <template v-slot:detail-tipe_kelas_kamar="rowData">
        <div>
          <span v-if="rowData.rowData.tipe_kelas_kamar === 'kelas_regular'">Kelas Regular</span>
          <span v-else-if="rowData.rowData.tipe_kelas_kamar === 'kelas_kamar_tamu'">Kelas Kamar Tamu</span>
          <span v-else>-</span>
        </div>
      </template>
    </tas-base-crud>
    <tas-base-crud :config="{ ...config, title: 'Daftar Kelas Kamar Tamu', filter_api: { tipe_kelas_kamar: 'kelas_kamar_tamu' }, permission: { create: false, read: 'template-allow-all', update: 'template-allow-all', delete: 'template-allow-all' } }">
      <template v-slot:list-tipe_kelas_kamar="rowData">
        <div>
          <span v-if="rowData.rowData.tipe_kelas_kamar === 'kelas_regular'">Kelas Regular</span>
          <span v-else-if="rowData.rowData.tipe_kelas_kamar === 'kelas_kamar_tamu'">Kelas Kamar Tamu</span>
          <span v-else>-</span>
        </div>
      </template>
      <template v-slot:detail-tipe_kelas_kamar="rowData">
        <div>
          <span v-if="rowData.rowData.tipe_kelas_kamar === 'kelas_regular'">Kelas Regular</span>
          <span v-else-if="rowData.rowData.tipe_kelas_kamar === 'kelas_kamar_tamu'">Kelas Kamar Tamu</span>
          <span v-else>-</span>
        </div>
      </template>
    </tas-base-crud>
  </div>
</template>

<script>
export default {
  name: 'crud-kelas_kamar',
  data () {
    return {
      config: {
        title: 'Daftar Kelas Kamar Regular',
        model_api: 'kelas_kamar',
        getter: 'msKelasKamar',
        setter: 'msKelasKamar',
        pk_field: 'kelas_kamar_id',
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
          // id
          {
            id: 'id',
            data: 'id',
            label: 'ID KelasKamar',
            placeholder: null,
            methods: {
              list: false,
              detail: false,
              create: false,
              update: false,
              filter: false
            }
          },
          {
            id: 'tipe_kelas_kamar',
            data: 'tipe_kelas_kamar',
            label: 'Tipe Kelas Kamar',
            placeholder: null,
            methods: {
              list: { type: 'row-slot', transform: 'tipe_kelas_kamar' },
              detail: { type: 'row-slot', transform: 'tipe_kelas_kamar' },
              create: {
                id: 'tipe_kelas_kamar',
                show: true,
                class: '', attr: null,
                setter: '',
                getter: '',
                type: 'lookup-radio',
                value: '',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Kelas Regular', code: 'kelas_regular', 'description': 'Kamar Regular' },
                      { label: 'Kelas Kamar Tamu', code: 'kelas_kamar_tamu', 'description': 'Kamar Tamu' }
                    ],
                    display: ['label', 'description'],
                    headerDisplay: ['Label', '', 'Deskripsi'] // (opsional) pastikan jumlah key sama dengan 'diplay', kalau kosong tidak ada header
                  }
                }
              },
              update: {
                id: 'tipe_kelas_kamar',
                show: true,
                class: '', attr: null,
                setter: '',
                getter: '',
                type: 'lookup-radio',
                value: '',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Kelas Regular', code: 'kelas_regular', 'description': 'Kamar Regular' },
                      { label: 'Kelas Kamar Tamu', code: 'kelas_kamar_tamu', 'description': 'Kamar Tamu' }
                    ],
                    display: ['label', 'description'],
                    headerDisplay: ['Label', '', 'Deskripsi'] // (opsional) pastikan jumlah key sama dengan 'diplay', kalau kosong tidak ada header
                  }
                }
              },
              filter: false
            }
          },
          // ms_fasilitas_id
          {
            id: 'ms_fasilitas_id',
            data: 'ms_fasilitas_id',
            label: 'Fasilitas',
            placeholder: null,
            methods: {
              list: { view_data: 'nama_fasilitas', transform: 'default' },
              detail: { view_data: 'nama_fasilitas' },
              create: {
                setter: 'msFasilitas',
                getter: 'msFasilitas',
                type: 'lookup-radio',
                validation: [],
                option: {
                  list_pointer: {
                    label: 'nama_fasilitas',
                    code: 'ms_fasilitas_id',
                    display: ['nama_jenis_fasilitas', 'nama_fasilitas'],
                    headerDisplay: ['Jenis Fasilitas', 'Nama Fasilitas']
                  }
                }
              },
              update: {
                setter: 'msFasilitas',
                getter: 'msFasilitas',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'nama_fasilitas',
                    code: 'ms_fasilitas_id',
                    display: ['nama_jenis_fasilitas', 'nama_fasilitas'],
                    headerDisplay: ['Jenis Fasilitas', 'Nama Fasilitas']
                  }
                }
              },
              filter: true
            }
          },
          // nama_kelas_kamar
          {
            id: 'nama_kelas_kamar',
            data: 'nama_kelas_kamar',
            label: 'Nama',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: true,
              update: true,
              filter: true
            }
          },
          // keterangan_kelas_kamar
          {
            id: 'keterangan_kelas_kamar',
            data: 'keterangan_kelas_kamar',
            label: 'Keterangan',
            placeholder: null,
            methods: {
              list: true,
              detail: true,
              create: { type: 'textarea' },
              update: { type: 'textarea' },
              filter: { type: 'textarea' }
            }
          }
        ]
      }
    }
  }
}
</script>
