import Vue from "vue";
import moment from "moment";
import "moment-timezone";
moment.locale("id");
Vue.filter("parse", (value, id) => {
  if (id === null || id === undefined) return value;
  if (value === null || value === undefined) return value;
  let toReturn = "";
  if (id.search("-") === -1) {
    switch (id) {
      case "default":
        toReturn = value || "-";
        break;
      case "old":
        if (!value) toReturn = "0";
        else toReturn = moment().diff(value, "years", false);
        break;
      case "oldLong":
        var now = moment();

        var diffDuration = moment.duration(now.diff(value));

        var years = diffDuration.years();
        var months = diffDuration.months();
        var days = diffDuration.days();

        var result = {
          years: years,
          months: months,
          days: days,
        };

        toReturn = `${result.years} tahun ${result.months} bulan ${result.days} hari`;
        break;
      case "menu_type":
        if (value === 1) {
          toReturn = "Parent";
        } else if (value === 2) {
          toReturn = "Menu";
        } else if (value === 3) {
          toReturn = "Function";
        }
        // toReturn = value ? 'Data Aktif' : 'Non Aktif'
        break;
      case "statusPenunjang":
        if (value === 0) {
          toReturn = "New";
        } else if (value === 1) {
          toReturn = "Proses";
        } else if (value === 2) {
          toReturn = "Sample";
        } else if (value === 3) {
          toReturn = "Hasil";
        } else if (value === 4) {
          toReturn = "Cancelled";
        }
        // toReturn = value ? 'Data Aktif' : 'Non Aktif'
        break;
      case "statusTagihan":
        if (value === 1) {
          toReturn = "Open";
        } else if (value === 2) {
          toReturn = "Lock";
        } else if (value === 3) {
          toReturn = "Close";
        }
        // toReturn = value ? 'Data Aktif' : 'Non Aktif'
        break;
      case "active":
        if (typeof value == "string")
          toReturn = value === "true" ? "Data Aktif" : "Non Aktif";
        else toReturn = value ? "Data Aktif" : "Non Aktif";
        break;
      case "checkout_status":
        if (typeof value == "string")
          toReturn = value === "true" ? "Sudah Checkout" : "Belum Checkout";
        else toReturn = value ? "Sudah Checkout" : "Belum Checkout";
        break;
      case "primaryNm":
        toReturn = value == 0 ? "Utama" : "Bukan Utama";
        break;
      case "expired":
        toReturn = value === 1 ? "Aktif" : "Expired";
        break;
      case "lock":
        toReturn = value.toLowerCase() === "y" ? "Close" : "Open";
        break;
      case "is_hazard":
        toReturn = value === 1 ? "Berbahaya" : "Tidak Berbahaya";
        break;
      case "is_need_investigation":
        toReturn = value
          ? "Ya, diperlukan investigasi"
          : "Tidak memerlukan investigasi";
        break;
      case "status_code":
        if (value === "non_active") toReturn = "Non Aktif";
        else toReturn = "Data Aktif";
        break;
      case "user_status_code":
        if (value === "user_nonactive") toReturn = "Non Aktif";
        else toReturn = "Data Aktif";
        break;
      case "uppercase":
        toReturn = value.toUpperCase().split("_").join(" ");
        break;
      case "allow":
        toReturn =
          value.toLowerCase() === "y" ? "DIperbolehkan" : "Tidak diizinkan";
        break;
      case "yn":
        toReturn = value ? (value.toLowerCase() === "y" ? "Ya" : "Tidak") : "-";
        break;
      case "ynBool":
        toReturn = value ? "Ya" : "Tidak";
        break;
      case "nullValue":
        toReturn = value || "-";
        break;
      case "safe":
        toReturn = value === "safe" ? "Aman" : "Tidak Aman";
        break;
      case "conscious":
        toReturn = value === "conscious" ? "Sadar" : "Tidak Sadar";
        break;
      case "first_aid_action":
        toReturn = value === "p3k" ? "P3K" : "Rumah Sakit";
        break;
      case "action_type_accident":
        toReturn =
          value === "corrective" ? "Tindakan Perbaikan" : "Tindakan Pencegahan";
        break;
      case "fix_time_plan":
        if (value === "one_day") toReturn = "1 Hari";
        else if (value === "one_week") toReturn = "1 Minggu";
        else if (value === "less_month") toReturn = "< 1 Bulan";
        else if (value === "over_month") toReturn = "> 1 Bulan";
        else if (value === "over_year") toReturn = "> 1 Tahun";
        else toReturn = value;
        break;
      case "equipment_status":
        if (value === "usable") toReturn = "Dapat Digunakan";
        else if (value === "unusable") toReturn = "Tidak Dapat Digunakan";
        else toReturn = "Butuh Perbaikan";
        break;
      case "inspection_status":
        if (value === "waiting") toReturn = "Menunggu Verifikasi";
        else if (value === "verified") toReturn = "Terverifikasi";
        else toReturn = value;
        break;
      case "verify":
        if (value === "revision") toReturn = "Permintaan Revisi";
        else if (value === "verification_request")
          toReturn = "Pengajuan Verifikasi";
        else if (value === "appraisal_request")
          toReturn = "Permintaan Penilaian";
        else if (value === "approved") toReturn = "Disetujui";
        else if (value === "approved_with_note")
          toReturn = "Disetujui dengan Catatan";
        else if (value === "draft") toReturn = "Draft";
        else if (value === "rejected") toReturn = "Ditolak";
        else toReturn = value;
        break;
      case "number":
        toReturn = !isNaN(value) ? Number(value).toLocaleString("id") : value;
        break;
      case "number2fraction":
        toReturn = !isNaN(value)
          ? Number(value).toLocaleString("id", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : value;
        break;
      case "money":
        toReturn = !isNaN(value)
          ? "Rp. " + Number(value).toLocaleString("id")
          : value;
        break;
      case "longDate":
        if (moment(value, "YYYY-MM-DD", true))
          toReturn = moment(value, "YYYY-MM-DD").format("LL");
        else if (moment(value, "YYYY-MM-D", true).isValid())
          toReturn = moment(value, "YYYY-MM-D").format("LL");
        else toReturn = value;
        break;
      case "medDate":
        if (moment(value, "YYYY-MM-DD", true).isValid())
          toReturn = moment(value, "YYYY-MM-DD").format("DD MMM YYYY");
        else if (moment(value, "YYYY-MM-D", true).isValid())
          toReturn = moment(value, "YYYY-MM-D").format("DD MMM YYYY");
        else toReturn = value;
        break;
      case "medDateTime":
        if (moment.tz(value, "Asia/Jakarta").isValid()) toReturn = moment(value).format("LLL")
        else  toReturn = value;
        break;
      case "longDateTime":
        if (moment.tz(value, "Asia/Jakarta").isValid())
          toReturn = moment.tz(value, "Asia/Jakarta").format("LLLL");
        else if (true) toReturn = moment.tz(value, "Asia/Jakarta").format("LLLL")
        else toReturn = "asd";
        break;
      case "date":
        toReturn = moment(value).format("LL");
        break;
      case "longDateTimeUTC":
        if (moment(value, "YYYY-MM-DD", true).isValid())
          toReturn = moment(value, "YYYY-MM-DD")
            .utcOffset("+00:00")
            .format("LLLL");
        else toReturn = value;
        break;
      case "period":
        if (moment(value, "YYYY-MM-DD", true).isValid())
          toReturn = moment(value).format("MMMM YYYY");
        else toReturn = value;
        break;
      case "shortperiod":
        if (moment(value, "YYYY-MM-DD", true).isValid())
          toReturn = moment(value).format("MMM YYYY");
        else toReturn = value;
        break;
      case "numberMonth":
        toReturn = moment().set("date", 1).set("month", value).format("MMM");
        break;
      case "numberMonthLong":
        toReturn = moment().set("date", 1).set("month", value).format("MMMM");
        break;
      case "longMonth":
        if (moment(value, "YYYY-MM-DD", true).isValid())
          toReturn = moment(value).format("MMMM");
        else toReturn = value;
        break;
      case "year":
        if (moment(value, "YYYY-MM-DD", true).isValid())
          toReturn = moment(value).format("YYYY");
        else toReturn = value;
        break;
      case "hours":
        let parsed = value.split(":");
        parsed[0] = Number(parsed[0]) > 0 ? Number(parsed[0]) + " Jam" : null;
        parsed[1] = Number(parsed[1]) > 0 ? Number(parsed[1]) + " Menit" : null;
        parsed[2] = Number(parsed[2]) > 0 ? Number(parsed[2]) + " Detik" : null;
        toReturn = parsed.filter((x) => x).join(", ");
        break;
      case "time":
        toReturn = moment(value, "HH:mm:ss").format("LTS a");
        break;
      case "kelamin":
        toReturn = value.toLowerCase() === "l" ? "Laki-Laki" : "Perempuan";
        break;
      case "nfc_status":
        toReturn = value ? "Terpasang" : "Belum Terpasang";
        break;
      case "capitalize":
        toReturn = value
          .toLowerCase()
          .split("_")
          .map(
            (kebab) =>
              kebab.toLowerCase().charAt(0).toUpperCase() + kebab.slice(1)
          )
          .join(" ");
        break;
      case "company_group":
        toReturn = value.toLowerCase() === "induk" ? "Induk" : "Non Induk";
        break;
      case "operational_status":
        if (value === "idle") toReturn = "Idle";
        else if (value === "operational") toReturn = "Beroperasi";
        else toReturn = value;
        break;
      case "equipment_condition":
        // if (value === 'good') toReturn = 'Baik'
        // else if (value === 'damaged') toReturn = 'Rusak'
        // else if (value === 'lost') toReturn = 'Hilang'
        // else toReturn = value
        // break
        if (value === "usable") toReturn = "Dapat Digunakan";
        else if (value === "unusable") toReturn = "Tidak Dapat Digunakan";
        else toReturn = "Butuh Perbaikan";
        break;
      case "employment_status":
        if (value === "organik") toReturn = "Organik";
        else if (value === "os") toReturn = "Outsourcing";
        else if (value === "pkwt") toReturn = "PKWT";
        break;
      case "ownership_code":
        if (value === "unit") toReturn = "Unit";
        else if (value === "department") toReturn = "Departemen";
        else if (value === "division") toReturn = "Divisi";
        else if (value === "pusat") toReturn = "Pusat";
        else toReturn = value;
        break;
      case "status_operasi":
        if (value === 0) toReturn = "BATAL";
        else if (value === 1) toReturn = "MENUNGGU";
        else if (value === 2) toReturn = "DIPROSES";
        else if (value === 3) toReturn = "SELESAI";
        else toReturn = value;
        break;
      case "status_pengambilan":
        if (value === 0) toReturn = "Pending";
        else if (value === 1) toReturn = "Sedang Diambil";
        else if (value === 2) toReturn = "Selesai";
        else if (value === 3) toReturn = "Gagal/Dibatalkan";
        else toReturn = value;
        break;
      case "status_checkout":
        if (value === 0) toReturn = "Terpakai";
        else if (value === 1 || value === null) toReturn = "Tersedia";
        else toReturn = value;
        break;
      case "tipe_kelas_kamar": 
        if (value === 'kelas_regular') toReturn = 'Kelas Regular'
        else if (value === 'kelas_kamar_tamu') toReturn = 'Kelas Kamar Tamu'
        else toReturn = value
      default:
        toReturn = value;
    }
  } else {
    switch (id.split("-")[0]) {
      case "prefix":
        toReturn = id.split("-")[1] + " " + value;
        break;
      case "suffix":
        toReturn = value + " " + id.split("-")[1];
        break;
      default:
        toReturn = value;
    }
  }
  return toReturn;
});
export default {
  name: "filterTemplate",
};
