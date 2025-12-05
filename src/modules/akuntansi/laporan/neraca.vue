<template>
  <div class="container-fluid">
    <h1 class="mb-6 font-weight-bold text-primary">Laporan Neraca</h1>
    <div class="d-flex align-items-center justify-content-between flex-wrap mb-4">
      <div class="d-flex align-items-center gap-3 flex-wrap">
        <s-input
          :item="{
            id: 'month',
            value: null,
            label: 'Bulan',
            placeholder: 'Pilih Bulan',
            type: 'month',
            validation: ['required'],
          }"
          class="mr-2"
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
      <button type="button" class="btn btn-primary shadow-sm">
        <i class="ri-download-2-line mr-2"></i>Unduh CSV
      </button>
    </div>

    <div class="card card-custom shadow-sm">
      <div class="card-body p-3">
        <div class="table-responsive mb-0">
          <table class="table table-hover table-bordered table-sm">
            <thead class="thead-light">
              <tr>
                <th rowspan="2" class="align-middle text-center">Tahun</th>
                <th rowspan="2" class="align-middle text-center">Bulan</th>
                <th rowspan="2" class="align-middle text-center">Kode COA</th>
                <th rowspan="2" class="align-middle text-center">Nama COA</th>
                <th rowspan="2" class="align-middle text-center">Saldo Awal</th>
                <th colspan="2" class="text-center">Laporan Neraca</th>
                <th rowspan="2" class="align-middle text-center">Saldo Akhir</th>
              </tr>
              <tr>
                <th class="align-middle text-center">Debet</th>
                <th class="align-middle text-center">Kredit</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in dummyData"
                :key="idx"
                :class="row.is_main ? 'table-primary font-weight-bold' : ''"
              >
                <td class="align-middle text-center">{{ row.tahun }}</td>
                <td class="align-middle text-center">{{ row.bulan }}</td>
                <td class="align-middle text-center">{{ row.kode_coa }}</td>
                <td class="align-middle" :style="{ 'font-weight': row.is_main ? '700' : '' }">
                  {{ row.nama_coa }}
                </td>
                <td class="align-middle text-right">
                  {{ row.saldo_awal.toLocaleString() }}
                </td>
                <td class="align-middle text-right text-success">
                  {{ row.debet.toLocaleString() }}
                </td>
                <td class="align-middle text-right text-danger">
                  {{ row.kredit.toLocaleString() }}
                </td>
                <td class="align-middle text-right font-weight-bold">
                  {{ row.saldo_akhir.toLocaleString() }}
                </td>
              </tr>
              <tr v-if="dummyData.length === 0">
                <td colspan="8" class="text-center text-muted">Tidak ada data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end align-items-center flex-wrap mt-3">
          <div class="pagination d-flex flex-wrap py-2 mr-3">
            <button
              type="button"
              class="btn btn-light btn-icon btn-sm mr-1 my-1"
              style="height: 32.9px; width: 32.9px"
            >
              <i class="ri-skip-back-mini-line"></i>
            </button>
            <button
              type="button"
              class="btn btn-light btn-sm mr-1 my-1"
            >
              {{ $t("global.prev") }}
            </button>
            <button
              type="button"
              class="btn btn-light btn-sm mr-1 my-1"
            >
              {{ $t("global.next") }}
            </button>
            <button
              type="button"
              class="btn btn-light btn-icon btn-sm mr-1 my-1"
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
          saldo_awal: 500000000,
          debet: 100000000,
          kredit: 50000000,
          saldo_akhir: 550000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "1.1.1",
          nama_coa: "Kas dan Bank",
          saldo_awal: 200000000,
          debet: 50000000,
          kredit: 20000000,
          saldo_akhir: 230000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "1.1.2",
          nama_coa: "Piutang Pasien",
          saldo_awal: 150000000,
          debet: 30000000,
          kredit: 10000000,
          saldo_akhir: 170000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "1.1.3",
          nama_coa: "Persediaan Obat",
          saldo_awal: 150000000,
          debet: 20000000,
          kredit: 20000000,
          saldo_akhir: 150000000,
        },
        {
          is_main: true,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "2.1",
          nama_coa: "KEWAJIBAN LANCAR",
          saldo_awal: 300000000,
          debet: 50000000,
          kredit: 20000000,
          saldo_akhir: 330000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "2.1.1",
          nama_coa: "Hutang Biaya",
          saldo_awal: 100000000,
          debet: 20000000,
          kredit: 10000000,
          saldo_akhir: 110000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "2.1.2",
          nama_coa: "Hutang Gaji",
          saldo_awal: 120000000,
          debet: 20000000,
          kredit: 5000000,
          saldo_akhir: 135000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "2.1.3",
          nama_coa: "Hutang Obat ke Supplier",
          saldo_awal: 80000000,
          debet: 10000000,
          kredit: 5000000,
          saldo_akhir: 85000000,
        },
        {
          is_main: true,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "3.1",
          nama_coa: "EKUITAS",
          saldo_awal: 400000000,
          debet: 0,
          kredit: 0,
          saldo_akhir: 400000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "3.1.1",
          nama_coa: "Modal Disetor",
          saldo_awal: 300000000,
          debet: 0,
          kredit: 0,
          saldo_akhir: 300000000,
        },
        {
          is_main: false,
          tahun: 2025,
          bulan: "Januari",
          kode_coa: "3.1.2",
          nama_coa: "Laba Ditahan",
          saldo_awal: 100000000,
          debet: 0,
          kredit: 0,
          saldo_akhir: 100000000,
        },
      ],
    };
  },
};
</script>

<style scoped>
.table-primary {
  background-color: #e3f2fd !important;
}
.font-weight-bold {
  font-weight: 700 !important;
}
.text-primary {
  color: #0056b3 !important;
}
</style>