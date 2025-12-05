<template lang="">
  <div class="container-fluid">
    <h1 class="mb-6" style="font-weight: 600">Buku Besar</h1>
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-10">
        <s-input
          :item="{
            id: 'month',
            value: null,
            label: 'Tanggal Awal',
            placeholder: 'Pilih Tanggal Awal',
            type: 'date',
            validation: ['required'],
          }"
        />
        <s-input
          :item="{
            id: 'year',
            value: null,
            label: 'Tanggal Akhir',
            placeholder: 'Pilih Tanggal Akhir',
            type: 'date',
            validation: ['required'],
          }"
        />
      </div>

      <button type="button" class="btn btn-primary">Unduh CSV</button>
    </div>

    <div class="card card-custom">
      <div class="card-body p-3">
        <table
          class="table table-sm table-borderless mb-4"
          style="max-width: 400px"
        >
          <tbody>
            <tr>
              <td class="font-weight-bold" style="width: 160px">Saldo Awal</td>
              <td class="text-center" style="width: 10px">:</td>
              <td class="text-right text-primary">Rp. 0</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Saldo Transaksi</td>
              <td class="text-center">:</td>
              <td class="text-right text-success">Rp. 0</td>
            </tr>
            <tr>
              <td colspan="3"><hr class="my-2" /></td>
            </tr>
            <tr>
              <td class="font-weight-bold">Saldo Akhir</td>
              <td class="text-center">:</td>
              <td class="text-right text-danger">Rp. 0</td>
            </tr>
          </tbody>
        </table>

        <div class="table-responsive mb-0">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th rowspan="2" class="align-middle text-center">No</th>
                <th rowspan="2" class="align-middle text-center">ID</th>
                <th rowspan="2" class="align-middle text-center">IDGL</th>
                <th rowspan="2" class="align-middle text-center">TGL</th>
                <th rowspan="2" class="align-middle text-center">Kode COA</th>
                <th rowspan="2" class="align-middle text-center">Nama COA</th>
                <th rowspan="2" class="align-middle text-center">Nama GDG</th>
                <th colspan="2" class="align-middle text-center">Amount</th>
                <th rowspan="2" class="align-middle text-center">Remark</th>
                <th rowspan="2" class="align-middle text-center">
                  Operasional
                </th>
                <th rowspan="2" class="align-middle text-center">
                  Nama Penerima
                </th>
                <th rowspan="2" class="align-middle text-center">
                  Nama USB Penerima
                </th>
                <th colspan="2" class="align-middle text-center">Saldo</th>
              </tr>
              <tr>
                <th class="align-middle text-center">Debet</th>
                <th class="align-middle text-center">Kredit</th>

                <th class="align-middle text-center">Debet</th>
                <th class="align-middle text-center">Kredit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in dummyData" :key="idx">
                <td class="align-middle">{{ idx + 1 }}</td>
                <td class="align-middle">
                  {{ row.id }}
                </td>
                <td class="align-middle">{{ row.idgl }}</td>
                <td class="align-middle">{{ row.tgl }}</td>
                <td class="align-middle">{{ row.kode_coa }}</td>
                <td class="align-middle">{{ row.nama_coa }}</td>
                <td class="align-middle">{{ row.nama_gdg }}</td>
                <td class="align-middle text-right">{{ row.amount_debet }}</td>
                <td class="align-middle text-right">{{ row.amount_kredit }}</td>
                <td class="align-middle">{{ row.remark }}</td>
                <td class="align-middle">{{ row.operasional }}</td>
                <td class="align-middle">{{ row.nama_penerima }}</td>
                <td class="align-middle">{{ row.nama_usb_penerima }}</td>
                <td class="align-middle text-right">{{ row.saldo_debet }}</td>
                <td class="align-middle text-right">{{ row.saldo_kredit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="w-full d-flex justify-content-end align-items-center flex-wrap"
        >
          <div class="pagination d-flex flex-wrap py-2 mr-3">
            <button
              type="button"
              class="btn btn-text btn-icon btn-sm btn-secondary mr-1 my-1"
              style="height: 32.9px; width: 32.9px"
            >
              <i class="ri-skip-back-mini-line"></i>
            </button>
            <button
              type="button"
              class="btn btn-text btn-sm btn-secondary mr-1 my-1"
            >
              {{ $t("global.prev") }}
            </button>
            <button
              type="button"
              class="btn btn-text btn-sm btn-secondary mr-1 my-1"
            >
              {{ $t("global.next") }}
            </button>
            <button
              type="button"
              class="btn btn-text btn-icon btn-sm btn-secondary mr-1 my-1"
              style="height: 32.9px; width: 32.9px"
            >
              <i class="ri-skip-forward-mini-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "crud-settingKodeAkun",
  data() {
    return {
      dummyData: [
        {
          id: 6000,
          kode_coa: "1.1",
          nama_coa: "ASET LANCAR",
          idgl: "FD-0001",
          tgl: "2023-10-01",
          nama_gdg: "Gudang Utama",
          amount_debet: 1000000,
          amount_kredit: 0,
          remark: "Pembelian Aset",
          operasional: "Operasional 1",
          nama_penerima: "John Doe",
          nama_usb_penerima: "USB 1",
          saldo_debet: 1000000,
          saldo_kredit: 0,
        },
        {
          id: 6001,
          kode_coa: "1.2",
          nama_coa: "PIUTANG USAHA",
          idgl: "FD-0002",
          tgl: "2023-10-03",
          nama_gdg: "Gudang A",
          amount_debet: 500000,
          amount_kredit: 0,
          remark: "Penjualan Kredit",
          operasional: "Operasional 2",
          nama_penerima: "Jane Smith",
          nama_usb_penerima: "USB 2",
          saldo_debet: 1500000,
          saldo_kredit: 0,
        },
        {
          id: 6002,
          kode_coa: "2.1",
          nama_coa: "HUTANG DAGANG",
          idgl: "FD-0003",
          tgl: "2023-10-05",
          nama_gdg: "Gudang B",
          amount_debet: 0,
          amount_kredit: 300000,
          remark: "Pembayaran Hutang",
          operasional: "Operasional 1",
          nama_penerima: "Michael Jordan",
          nama_usb_penerima: "USB 1",
          saldo_debet: 1500000,
          saldo_kredit: 300000,
        },
        {
          id: 6003,
          kode_coa: "1.3",
          nama_coa: "PERSEDIAAN",
          idgl: "FD-0004",
          tgl: "2023-10-07",
          nama_gdg: "Gudang C",
          amount_debet: 800000,
          amount_kredit: 0,
          remark: "Pembelian Barang",
          operasional: "Operasional 3",
          nama_penerima: "Lisa Ray",
          nama_usb_penerima: "USB 3",
          saldo_debet: 2300000,
          saldo_kredit: 300000,
        },
        {
          id: 6004,
          kode_coa: "4.1",
          nama_coa: "PENDAPATAN USAHA",
          idgl: "FD-0005",
          tgl: "2023-10-08",
          nama_gdg: "Gudang Utama",
          amount_debet: 0,
          amount_kredit: 200000,
          remark: "Pendapatan Penjualan",
          operasional: "Operasional 2",
          nama_penerima: "David Miller",
          nama_usb_penerima: "USB 2",
          saldo_debet: 2300000,
          saldo_kredit: 500000,
        },
        {
          id: 6005,
          kode_coa: "5.1",
          nama_coa: "BEBAN GAJI",
          idgl: "FD-0006",
          tgl: "2023-10-10",
          nama_gdg: "Gudang B",
          amount_debet: 300000,
          amount_kredit: 0,
          remark: "Pembayaran Gaji",
          operasional: "Operasional 1",
          nama_penerima: "Emily White",
          nama_usb_penerima: "USB 1",
          saldo_debet: 2600000,
          saldo_kredit: 500000,
        },
        {
          id: 6006,
          kode_coa: "2.2",
          nama_coa: "HUTANG BANK",
          idgl: "FD-0007",
          tgl: "2023-10-11",
          nama_gdg: "Gudang D",
          amount_debet: 0,
          amount_kredit: 1000000,
          remark: "Pelunasan Pinjaman",
          operasional: "Operasional 4",
          nama_penerima: "Chris Green",
          nama_usb_penerima: "USB 4",
          saldo_debet: 2600000,
          saldo_kredit: 1500000,
        },
        {
          id: 6007,
          kode_coa: "6.1",
          nama_coa: "BEBAN OPERASIONAL",
          idgl: "FD-0008",
          tgl: "2023-10-13",
          nama_gdg: "Gudang E",
          amount_debet: 400000,
          amount_kredit: 0,
          remark: "Biaya Transportasi",
          operasional: "Operasional 3",
          nama_penerima: "Amanda Blue",
          nama_usb_penerima: "USB 3",
          saldo_debet: 3000000,
          saldo_kredit: 1500000,
        },
        {
          id: 6008,
          kode_coa: "3.1",
          nama_coa: "MODAL",
          idgl: "FD-0009",
          tgl: "2023-10-14",
          nama_gdg: "Gudang F",
          amount_debet: 0,
          amount_kredit: 2500000,
          remark: "Setor Modal",
          operasional: "Operasional 1",
          nama_penerima: "Robert King",
          nama_usb_penerima: "USB 1",
          saldo_debet: 3000000,
          saldo_kredit: 4000000,
        },
        {
          id: 6009,
          kode_coa: "1.4",
          nama_coa: "KAS",
          idgl: "FD-0010",
          tgl: "2023-10-15",
          nama_gdg: "Gudang Utama",
          amount_debet: 200000,
          amount_kredit: 0,
          remark: "Setoran Tunai",
          operasional: "Operasional 2",
          nama_penerima: "Natalie Hope",
          nama_usb_penerima: "USB 2",
          saldo_debet: 3200000,
          saldo_kredit: 4000000,
        },
      ],
    };
  },
};
</script>
