export const riwayatKunjungan = {
  title: " ",
  model_api: "registrasi/riwayatRegistrasiPasien",
  getter: "registrasi/riwayatRegistrasiPasien",
  setter: "registrasi/riwayatRegistrasiPasien",
  pk_field: null,
  frontendPaginate: true,
  filter_api: { no_rm: "" },
  permission: {
    create: false,
    read: "template-allow-all",
    update: false,
    delete: false,
  },
  slave: [],
  fields: [
    // id
    {
      id: "id",
      data: "id",
      label: "ID",
      placeholder: null,
      methods: {
        list: false,
        detail: false,
        create: false,
        update: false,
        filter: false,
      },
    },
    // registrasi_id
    {
      id: "registrasi_id",
      data: "registrasi_id",
      label: "Registrasi ID",
      placeholder: null,
      methods: {
        list: false,
      },
    },
    {
      id: "no_kunjungan",
      data: "no_kunjungan",
      label: "No Kunjungan",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "tgl_registrasi",
      data: "tgl_registrasi",
      label: "Tanggal Registrasi",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "nama_jenis_layanan",
      data: "nama_jenis_layanan",
      label: "Nama Jenis Layanan",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "nama_dokter",
      data: "nama_dokter",
      label: "Nama Dokter",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "nama_asuransi",
      data: "nama_asuransi",
      label: "Nama Asuransi",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "status_registrasi",
      data: "status_registrasi",
      label: "Status Registrasi",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "status_checkout",
      data: "status_checkout",
      label: "Status Checkout",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "nama_poliklinik",
      data: "nama_poliklinik",
      label: "Nama Poliklinik",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "nama_ruang",
      data: "nama_ruang",
      label: "Nama Ruang",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "no_rm",
      data: "no_rm",
      label: "No RM",
      placeholder: null,
      methods: {
        list: true,
      },
    },
    {
      id: "nama_lengkap",
      data: "nama_lengkap",
      label: "Nama Lengkap",
      placeholder: null,
      methods: {
        list: true,
      },
    },
  ],
};
