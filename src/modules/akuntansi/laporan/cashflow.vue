<template lang="">
  <div class="container-fluid">
    <h1 class="mb-6" style="font-weight: 600">Laporan Cashflow</h1>
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-10">
        <s-input
          :item="{
            id: 'month',
            value: null,
            label: 'Bulan',
            placeholder: 'Pilih Bulan',
            type: 'month',
            validation: ['required'],
          }"
        />
        <s-input
          :item="{
            id: 'year',
            value: null,
            label: 'Tahun',
            placeholder: 'Pilih Tahun',
            type: 'year',
            validation: ['required'],
          }"
        />
      </div>

      <button type="button" class="btn btn-primary">Unduh CSV</button>
    </div>

    <div class="card card-custom">
      <div class="card-body p-3">
        <div class="table-responsive mb-0">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th class="align-middle text-center">Kode COA</th>
                <th class="align-middle text-center">Nama COA</th>
                <th class="align-middle text-center">Saldo Awal</th>
                <th class="align-middle text-center">Januari</th>
                <th class="align-middle text-center">Februari</th>
                <th class="align-middle text-center">Maret</th>
                <th class="align-middle text-center">April</th>
                <th class="align-middle text-center">Mei</th>
                <th class="align-middle text-center">Juni</th>
                <th class="align-middle text-center">Juli</th>
                <th class="align-middle text-center">Agustus</th>
                <th class="align-middle text-center">September</th>
                <th class="align-middle text-center">Oktober</th>
                <th class="align-middle text-center">November</th>
                <th class="align-middle text-center">Desember</th>
                <th class="align-middle text-center">2025</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in dummyData" :key="idx">
                <td class="align-middle">{{ row.kode_coa }}</td>
                <td
                  class="align-middle"
                  :style="{
                    'font-weight': row.is_main ? '700 !important' : '',
                  }"
                >
                  {{ row.nama_coa }}
                </td>
                <td class="align-middle text-right">{{ row.bulan_1.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_2.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_3.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_4.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_5.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_6.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_7.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_8.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_9.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_10.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_11.toLocaleString() }}</td>
                <td class="align-middle text-right">{{ row.bulan_12.toLocaleString() }}</td>

                <td class="align-middle text-right">{{ row.saldo_akhir.toLocaleString() }}</td>
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
            <button type="button" class="btn btn-text btn-sm btn-secondary mr-1 my-1">
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
          is_main: true,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "1.1",
          nama_coa: "ASET LANCAR",
          saldo_awal: 1000000,
          bulan_1: 200000,
          bulan_2: 150000,
          bulan_3: 300000,
          bulan_4: 250000,
          bulan_5: 400000,
          bulan_6: 350000,
          bulan_7: 450000,
          bulan_8: 500000,
          bulan_9: 600000,
          bulan_10: 700000,
          bulan_11: 800000,
          bulan_12: 900000,
          saldo_akhir: 2000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "1.1.1",
          nama_coa: "Kas dan Bank",
          saldo_awal: 500000,
          bulan_1: 100000,
          bulan_2: 80000,
          bulan_3: 120000,
          bulan_4: 90000,
          bulan_5: 110000,
          bulan_6: 95000,
          bulan_7: 105000,
          bulan_8: 115000,
          bulan_9: 125000,
          bulan_10: 135000,
          bulan_11: 145000,
          bulan_12: 155000,
          saldo_akhir: 1000000,
        },
      ],
    };
  },
};
</script>
