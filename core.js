/* =========================
   DATABASE PETUGAS & JADWAL
========================= */
const ROTASI_START = new Date(2026, 0, 1, 7, 30, 0);
const urutanKompi = ["Kompi A", "Kompi B", "Kompi C"];
const urutanPerwira = [
  "Sarono, S.E.", "H. Wirawan Aries Wibowo, S.E.", "Paryo, S.T., M.M.",
  "Anwar Kamsari, S.T.", "Ruwanto, S.H.", "H. Imbang Satriana, S.Pd., M.M.",
  "Mohammad Slamet, S.Ip.", "Poengky Hermingto, S.E.",
  "Kusnanto, S.H.", "Ngatiyo, S.E."
];

const dataPetugas = {
  "Kompi A": ["Kusumahadi/ASN","Mulyadi S/ASN","Arsuddin, S.Ip./ASN","Sigit S/ASN","Yudhi R/ASN","Wiwit S/ASN","Hanan S.S/CPNS","Kevin D.A/CPNS","Riffat A/CPNS","Bambang K/PJLP","Ibnu S/PJLP","Ismu S/PJLP","A. Ardiansyah/PJLP","A. Robbi/PJLP","Yazid NH/PJLP","Billy Y.N/PJLP","M. Abduh/PJLP","M Taufik/PJLP","Raka P/PJLP","Putu W/PJLP","M Aprizal/PJLP","F. Syihab/PJLP"],
  "Kompi B": ["Didi R, S.IP./ASN","Eko S, S.H./ASN","Doni S, S.E./ASN","Andriansyah, S.M./ASN","Aziz N, S.H./ASN","Arip R.H/ASN","Wahyu N/ASN","Adam Suryana/CPNS","Agge N/CPNS","Braja M/CPNS","Adnan S/PJLP","Amri A.R/PJLP","M. Fadli/PJLP","M. Rastu R/PJLP","Sigit R/PJLP","Chaerul B/PJLP","Ivan F/PJLP","M. Sholahudin/PJLP"],
  "Kompi C": ["Eko Prasetyo, S.H./ASN","Feri Hamdanika, SH/ASN","Muhamad Dikky Purnama/ASN","Ade Fadillah/ASN","Bayu Hario Santoso, S.Kom./ASN","Endang Hidayat/ASN","Agus Suliyanto, SE/ASN","Geza Ravi Rizky Lutviagusta/CPNS","Sultan Mahesa/CPNS","Andi Kurniawan/PJLP","Burhanudin/PJLP","Endang Nurcahya/PJLP","Frido Amirulloh/PJLP","Sahrul Gunawan/PJLP","Sukron Khairil F./PJLP","Andri Juliansyah/PJLP","M. Tegar Maulana G./PJLP","Adhiya Rizqi Amarullah/PJLP","Rohman/PJLP"]
};

/* =========================
   FUNGSI GLOBAL (CORE LOGIC)
========================= */
function getHari(tgl) {
  const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  return hari[new Date(tgl).getDay()];
}

function getRotasiIndex(tgl) {
  const [y, m, d] = tgl.split("-").map(Number);
  const selected = new Date(y, m - 1, d, 7, 30, 0);
  const diffDay = Math.floor((selected - ROTASI_START) / (1000 * 60 * 60 * 24));
  return diffDay >= 0 ? diffDay : 0;
}

function getKoordinatorByKompi(kompi) {
  const koordinator = {
    "Kompi A": `Bpk. Mulyadi, S.H\nBpk. Iskandar, S.T\nSatgas/Katon Grup A Sektor X Pesanggrahan`,
    "Kompi B": `Bpk. Kaspul Arman, S.E.\nSatgas/Katon Grup B Sektor X Pesanggrahan`,
    "Kompi C": `Bpk. Nuriyanto, S.E.\nBpk. Rudiawan, S.H.\nSatgas/Katon Grup C Sektor X Pesanggrahan`
  };
  return koordinator[kompi] || "-";
}

function pilihMenu(menu) {
  document.getElementById("menuAwal").style.display = "none";
  document.getElementById("formEvakuasi").style.display = "none";
  document.getElementById("formEdukasi").style.display = "none";

  if (menu === "evakuasi" || menu === "kebakaran") {
    document.getElementById("formEvakuasi").style.display = "block";
    if(menu === "kebakaran") document.getElementById("evakuasiInput").value = "Kebakaran ";
  } else if (menu === "edukasi") {
    document.getElementById("formEdukasi").style.display = "block";
  }
}