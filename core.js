/* =========================
   DATABASE PETUGAS & JADWAL
========================= */
const ROTASI_START = new Date(2026, 0, 1, 7, 30, 0);
const urutanKompi = ["Kompi A", "Kompi B", "Kompi C"];
/* =========================
    DATABASE PERWIRA (15 Orang)
========================= */
/* =========================
    DATABASE PERWIRA (15 Orang)
========================= */
const urutanPerwira = [
  { nama: "Ngatiyo, S.E.", jabatan: "Kasie Sektor II Setiabudi" }, // Index 0
  { nama: "Sarono, S.E.", jabatan: "Kasie Sektor III Mampang Prapatan" },
  { nama: "H. Wirawan Aries Wibowo, S.E.", jabatan: "Kasie Sektor IV Pasar Minggu" },
  { nama: "Paryo, S.T., M.M.", jabatan: "Kasie Sektor V Kebayoran Lama" },
  { nama: "Anwar Kamsari, S.T.", jabatan: "Kasie Sektor VI Cilandak" },
  { nama: "Ruwanto, S.H.", jabatan: "Kasie Sektor VII Kebayoran Baru" },
  { nama: "H. Imbang Satriana, S.Pd., M.M.", jabatan: "Kasie Sektor VIII Pancoran" },
  { nama: "Mohammad Slamet, S.Ip.", jabatan: "Kasie Sektor IX Jagakarsa" },
  { nama: "Poengky Hermingto, S.E.", jabatan: "Kasie Sektor X Pesanggrahan" },
  { nama: "Kusnanto, S.H.", jabatan: "Kasie Sektor I Tebet" }, // Index 9 (Tepat untuk 9 Feb)

  // 5 Perwira Tambahan (Hanya muncul di pilihan manual)
  { nama: "H. Asril Rizal, S.Sos.", jabatan: "Kasudin Jakarta Selatan" },
  { nama: "Sjukri, S.Sos., M.Si.", jabatan: "Kasie Ops Dalkarmat" },
  { nama: "Dwi Ratna Swadharma, S.Pd. M.A", jabatan: "Kasie Tata Usaha" },
  { nama: "Sutaka, S.E., M.M.", jabatan: "Kasie Sarana" },
  { nama: "Yuni Eka Lestari, S.T.", jabatan: "Kasie Pencegahan" }
];

// Fungsi Rolling: Hanya memutar 10 orang pertama
function getPerwiraRolling(idx) {
  const p = urutanPerwira[idx % 10]; // Angka 10 adalah batas rolling
  return `${p.nama}\n${p.jabatan}`;
}

// Fungsi Load Dropdown (Supaya semua nama muncul di pilihan)
function loadPerwiraDropdown(idElemen) {
  const sel = document.getElementById(idElemen);
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Pilih Perwira --</option>';
  urutanPerwira.forEach(p => {
    const val = `${p.nama}\n${p.jabatan}`;
    sel.add(new Option(p.nama, val));
  });
}

const dataPetugas = {
  "Kompi A": ["Kusumahadi/ASN","Mulyadi S/ASN","Arsuddin, S.Ip./ASN","Sigit S/ASN","Yudhi R/ASN","Wiwit S/ASN","Hanan S.S/CPNS","Kevin D.A/CPNS","Riffat A/CPNS","Bambang K/PJLP","Ibnu S/PJLP","Ismu S/PJLP","A. Ardiansyah/PJLP","A. Robbi/PJLP","Yazid NH/PJLP","Billy Y.N/PJLP","M. Abduh/PJLP","M Taufik/PJLP","Raka P/PJLP","Putu W/PJLP","M Aprizal/PJLP","F. Syihab/PJLP"],
  "Kompi B": ["Didi R, S.IP./ASN","Eko S, S.H./ASN","Doni S, S.E./ASN","Andriansyah, S.M./ASN","Aziz N, S.H./ASN","Arip R.H/ASN","Wahyu N/ASN","Adam Suryana/CPNS","Agge N/CPNS","Braja M/CPNS","Adnan S/PJLP","Amri A.R/PJLP","M. Fadli/PJLP","M. Rastu R/PJLP","Sigit R/PJLP","Chaerul B/PJLP","Ivan F/PJLP","M. Sholahudin/PJLP"],
  "Kompi C": ["Eko Prasetyo, S.H./ASN","Feri Hamdanika, SH/ASN","Muhamad Dikky Purnama/ASN","Ade Fadillah/ASN","Bayu Hario Santoso, S.Kom./ASN","Endang Hidayat/ASN","Agus Suliyanto, SE/ASN","Geza Ravi Rizky Lutviagusta/CPNS","Sultan Mahesa/CPNS","Andi Kurniawan/PJLP","Burhanudin/PJLP","Endang Nurcahya/PJLP","Frido Amirulloh/PJLP","Sahrul Gunawan/PJLP","Sukron Khairil F./PJLP","Andri Juliansyah/PJLP","M. Tegar Maulana G./PJLP","Adhiya Rizqi Amarullah/PJLP","Rohman/PJLP"]
};

/* =========================
   FUNGSI GLOBAL (CORE LOGIC)
========================= */
function getHari(tgl) {
  if (!tgl) return "";
  
  // Pecah tanggal (YYYY-MM-DD) agar tidak bergeser karena zona waktu
  const [tahunInput, bulanInput, tanggalInput] = tgl.split("-").map(Number);
  const d = new Date(tahunInput, bulanInput - 1, tanggalInput);
  
  // Nama Hari
  const daftarHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const namaHari = daftarHari[d.getDay()];

  // Nama Bulan
  const daftarBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const namaBulan = daftarBulan[d.getMonth()];

  const tanggal = d.getDate();
  const tahun = d.getFullYear();

  // Hasil: Senin, 9 Februari 2026
  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
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
  // Sembunyikan semua form dulu
  document.getElementById("menuAwal").style.display = "none";
  document.getElementById("formEvakuasi").style.display = "none";
  document.getElementById("formEdukasi").style.display = "none";
  document.getElementById("formKebakaran").style.display = "none";

  if (menu === "evakuasi") {
    document.getElementById("formEvakuasi").style.display = "block";
    document.getElementById("judulForm").innerText = "🚑 Laporan Evakuasi";
  } else if (menu === "kebakaran") {
    document.getElementById("formKebakaran").style.display = "block";
    // Inisialisasi dropdown perwira khusus kebakaran saat form dibuka
    loadPerwiraDropdown("perwiraKebakaran");
  } else if (menu === "edukasi") {
    document.getElementById("formEdukasi").style.display = "block";
  }
}

/* =========================
   FUNGSI COPY TO CLIPBOARD
========================= */
function copyText(idElemen) {
  const textOutput = document.getElementById(idElemen);
  
  if (!textOutput.value) {
    alert("Generate laporannya dulu, baru bisa di-copy!");
    return;
  }

  // Proses Copy
  textOutput.select();
  textOutput.setSelectionRange(0, 99999); // Untuk HP
  
  try {
    navigator.clipboard.writeText(textOutput.value);
    alert("Laporan berhasil disalin ke WhatsApp!");
  } catch (err) {
    // Fallback jika browser lama
    document.execCommand("copy");
    alert("Laporan berhasil disalin!");
  }
}