/* =========================
   AMBIL ELEMENT FORM
========================= */
const dataJenis = document.getElementById("dataJenis");
const evakuasiInput = document.getElementById("evakuasiInput");
const grupJaga = document.getElementById("grupJaga");
const tanggal = document.getElementById("tanggal");

const pelapor = document.getElementById("pelapor");
const hp = document.getElementById("hp");
const alamat = document.getElementById("alamat");

const perwira = document.getElementById("perwira");

const terima = document.getElementById("terima");
const meluncur = document.getElementById("meluncur");
const selesai = document.getElementById("selesai");

const jumlahPersonil = document.getElementById("jumlahPersonil");
const unit = document.getElementById("unit");

const jenisUtama = document.getElementById("jenisUtama");
const jenisDetail = document.getElementById("jenisDetail");

const kronologis = document.getElementById("kronologis");
const tindakan = document.getElementById("tindakan");

const output = document.getElementById("output");

/* =========================
   DATA PETUGAS
========================= */
const dataPetugas = {
  "Kompi A": [
    "Kusumahadi/ASN",
    "Mulyadi S/ASN",
    "Arsuddin, S.Ip./ASN",
    "Sigit S/ASN",
    "Yudhi R/ASN",
    "Wiwit S/ASN",
    "Hanan S.S/CPNS",
    "Kevin D.A/CPNS",
    "Riffat A/CPNS",
    "Bambang K/PJLP",
    "Ibnu S/PJLP",
    "Ismu S/PJLP",
    "A. Ardiansyah/PJLP",
    "A. Robbi/PJLP",
    "Yajid M/PJLP",
    "Billy Y.N/PJLP",
    "M. Abduh/PJLP",
    "M Taufik/PJLP", 
     "Raka P/PJLP",
     "Putu W/PJLP",
     "M Aprizal/PJLP",
     "F. Syihab/PJLP"
  ],

  "Kompi B": [
    "Didi R, S.IP./ASN",
    "Eko S, S.H./ASN",
    "Doni S, S.E./ASN",
    "Andriansyah, S.M./ASN",
    "Aziz N, S.H./ASN",
    "Arip R.H/ASN",
    "Wahyu N/ASN",
    "Adam Suryana/CPNS",
    "Agge N/CPNS",
    "Braja M/CPNS",
    "Adnan S/PJLP",
    "Amri A.R/PJLP",
    "M. Fadli/PJLP",
    "M. Rastu R/PJLP",
    "Sigit R/PJLP",
    "Chaerul B/PJLP",
    "Ivan F/PJLP",
    "M. Sholahudin/PJLP"
  ],

  "Kompi C": [
    "Eko Prasetyo, S.H./ASN",
    "Feri Hamdanika, SH/ASN",
    "Muhamad Dikky Purnama/ASN",
    "Ade Fadillah/ASN",
    "Bayu Hario Santoso, S.Kom./ASN",
    "Endang Hidayat/ASN",
    "Agus Suliyanto, SE/ASN",
    "Geza Ravi Rizky Lutviagusta/CPNS",
    "Sultan Mahesa/CPNS",
    "Andi Kurniawan/PJLP",
    "Burhanudin/PJLP",
    "Endang Nurcahya/PJLP",
    "Frido Amirulloh/PJLP",
    "Sahrul Gunawan/PJLP",
    "Sukron Khairil F./PJLP",
    "Andri Juliansyah/PJLP",
    "M. Tegar Maulana G./PJLP",
    "Adhiya Rizqi Amarullah/PJLP",
    "Rohman/PJLP"
  ]
};

document.getElementById("kompi").addEventListener("change", function () {
  const container = document.getElementById("petugas");
  container.innerHTML = "";
  const list = dataPetugas[this.value];
  if (!list) return;

  list.forEach(nama => {
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "petugas";
    cb.value = nama;
    container.appendChild(cb);
    container.append(" " + nama);
    container.appendChild(document.createElement("br"));
  });
});

/* =========================
   UTIL
========================= */
function getHari(tgl) {
  const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  return hari[new Date(tgl).getDay()];
}

function getShiftIndex(tanggalInput) {
  const baseDate = new Date("2026-01-01T07:30:00");
  const selected = new Date(tanggalInput + "T07:30:00");
  const diffHari = Math.floor((selected - baseDate) / (1000 * 60 * 60 * 24));
  return diffHari >= 0 ? diffHari : 0;
}

function getKompiOtomatis(tanggalInput) {
  const idx = getShiftIndex(tanggalInput);
  return kompiList[idx % 3];
}

function getPerwiraOtomatis(tanggalInput) {
  const idx = getShiftIndex(tanggalInput);
  return jadwalPerwira[idx % jadwalPerwira.length];
}


/* =========================
   EMOJI
========================= */
function emojiEvakuasi(text) {
  const t = text.toLowerCase();
  const rules = [
    { keys: ["ular"], emoji: "🐍" },
    { keys: ["kucing"], emoji: "🐱" },
    { keys: ["lebah","tawon"], emoji: "🐝" },
    { keys: ["biawak"], emoji: "🦎" },
    { keys: ["banjir"], emoji: "🚣" },
    { keys: ["kunci mobil"], emoji: "🚗" },
    { keys: ["kunci"], emoji: "🔑" },
    { keys: ["hp"], emoji: "📱" },
    { keys: ["cincin"], emoji: "💍" },
    { keys: ["pohon"], emoji: "🌳" },
    { keys: ["api","kebakaran"], emoji: "🔥" }
  ];
  for (let r of rules) {
    if (r.keys.some(k => t.includes(k))) return " " + r.emoji;
  }
  return " ⚙️";
}

/* =========================
   TEMPLATE OTOMATIS
========================= */
function getTemplateEvakuasi(jenis, alamatText) {
  const j = jenis.toLowerCase();

  if (j.includes("ular") || j.includes("biawak")) return {
    kronologis: `Pelapor melihat adanya hewan berbahaya di ${alamat.value} yang berpotensi membahayakan, kemudian melaporkan kejadian tersebut ke Sektor Pemadam Pesanggrahan.`,
    tindakan: `Petugas melakukan evakuasi menggunakan grabstick hingga hewan berhasil diamankan dan evakuasi berjalan aman.`
  };

  if (j.includes("lebah") || j.includes("tawon")) return {
    kronologis: `Pelapor melihat adanya sarang ${jenis} di ${alamat.value} yang berpotensi membahayakan warga sekitar.`,
    tindakan: `Petugas melakukan evakuasi sarang ${jenis} menggunakan plastik dan peralatan pendukung hingga aman.`
  };

  if (j.includes("kucing")) return {
    kronologis: `Pelapor melaporkan adanya kucing yang terjebak di pohon atau genteng rumah di ${alamat.value}.`,
    tindakan: `Petugas mengevakuasi kucing menggunakan tangga lipat dan jaring pengaman hingga berhasil dievakuasi.`
  };

  if (j.includes("cincin")) return {
    kronologis: `Pelapor datang langsung ke Kantor Damkar Sektor Pesanggrahan untuk permintaan evakuasi lepas cincin akibat jari mengalami pembengkakan.`,
    tindakan: `Petugas memotong cincin menggunakan gerinda mini hingga cincin terbelah dua dan terlepas dengan aman.`
  };

  if (j.includes("banjir")) return {
    kronologis: `Terjadi genangan air di ${alamat.value} akibat intensitas hujan yang tinggi sehingga mengganggu aktivitas warga.`,
    tindakan: `Petugas melakukan penyedotan dan pengalihan air menggunakan mesin pompa portable ke saluran air terdekat.`
  };

  if (j.includes("hp") || j.includes("kunci")) return {
    kronologis: `Pelapor melaporkan ${jenis} yang terjatuh ke area sempit seperti got atau celah bangunan di ${alamat.value}.`,
    tindakan: `Petugas melakukan evakuasi menggunakan grabstick dan kawat elastis hingga barang berhasil diamankan.`
  };

  if (j.includes("kunci mobil")) return {
    kronologis: `Pelapor melaporkan kunci mobil tertinggal di dalam kendaraan di ${alamat.value} sehingga kendaraan terkunci.`,
    tindakan: `Petugas melakukan pembukaan pintu kendaraan menggunakan air wedge dan kawat variasi hingga kunci berhasil diambil.`
  };

  if (j.includes("mobil") || j.includes("motor")) return {
    kronologis: `Kendaraan mengalami kendala operasional di ${alamat.value} sehingga membutuhkan bantuan evakuasi.`,
    tindakan: `Petugas melakukan penanganan dan evakuasi kendaraan menggunakan peralatan pendukung hingga aman.`
  };

  if (j.includes("pohon")) return {
    kronologis: `Warga melaporkan adanya pohon tumbang di ${alamat.value} yang mengganggu akses dan membahayakan.`,
    tindakan: `Petugas melakukan pemotongan dan pembersihan pohon tumbang hingga situasi aman dan terkendali.`
  };

  if (j.includes("kebakaran")) return {
    kronologis: `Terjadi kebakaran di ${alamat.value} yang dilaporkan oleh warga sekitar.`,
    tindakan: `Petugas melakukan pemadaman menggunakan peralatan pemadam hingga api berhasil dipadamkan dan situasi aman.`
  };

  return {
    kronologis: `Pelapor melaporkan adanya kejadian di ${alamat.value} yang membutuhkan penanganan.`,
    tindakan: `Petugas melakukan penanganan sesuai kondisi di lapangan hingga kegiatan berjalan aman dan lancar.`
  };
}

/* =========================
   AUTO ISI TEMPLATE
========================= */
evakuasiInput.addEventListener("change", () => {
  const tpl = getTemplateEvakuasi(evakuasiInput.value, alamat.value || "lokasi kejadian");
  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});

/* =========================
   SATGAS
========================= */
function getKoordinatorByKompi(kompi) {
  if (kompi === "Kompi A") {
    return `Bpk. Mulyadi, S.H
Bpk. Iskandar, S.T
Satgas/Katon Grup A Sektor X Pesanggrahan`;
  }

  if (kompi === "Kompi B") {
    return `Bpk. Kaspul Arman, S.E.
Satgas/Katon Grup B Sektor X Pesanggrahan`;
  }

  if (kompi === "Kompi C") {
    return `Bpk. Nuriyanto, S.E.
Bpk. Rudiawan, S.H.
Satgas/Katon Grup C Sektor X Pesanggrahan`;
  }

  return "-";
}


/* =========================
   GENERATE LAPORAN 
========================= */
function generateLaporan() {
  let petugas = [];
  document.querySelectorAll(".petugas:checked").forEach((p, i) => {
    petugas.push(`${i + 1}. ${p.value}`);
  });

  const pj = perwira.options[perwira.selectedIndex];
  const jabatan = pj?.getAttribute("data-jabatan") || "";

  const kompiDipilih = document.getElementById("kompi").value;
  const koordinator = getKoordinatorByKompi(kompiDipilih);

  output.value = `
*SUDIN PENANGGULANGAN KEBAKARAN DAN PENYELAMATAN JAKARTA SELATAN*

*Evakuasi ${evakuasiInput.value}*${emojiEvakuasi(evakuasiInput.value)}
Hari/Tgl : ${getHari(tanggal.value)}, ${tanggal.value}

*Kompi Jaga* : ${kompi.value}

*Nama Pelapor* : ${pelapor.value}
*NO.Telp* : ${hp.value}
*Alamat*
${alamat.value}

*Perwira Piket 401*
${perwira.value}
${jabatan}

*Penanggung Jawab*
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator*
${koordinator}

*Pelaksanaan*
Terima : ${terima.value.replace(":", ".")} WIB
Meluncur : ${meluncur.value.replace(":", ".")} WIB
Selesai : ${selesai.value.replace(":", ".")} WIB

*Pengerahan Personil*
${jumlahPersonil.value} Personil dan ${unit.value}

*Kronologis*
${kronologis.value}

*Tindakan*
${tindakan.value}

*Petugas*
${petugas.join("\n")}

*Demikian dilaporkan, 86-8.1.3*
`.trim();
}

// ===============================
// EVENT LISTENER (PALING BAWAH)
// ===============================

// 1. saat pilih jenis evakuasi
document.getElementById("evakuasiInput").addEventListener("change", () => {
  const jenis = evakuasiInput.value;
  const alamatText = alamat.value.trim() || "lokasi kejadian";

  if (!jenis) return;

  const tpl = getTemplateEvakuasi(jenis, alamatText);
  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});

// 2. saat alamat diketik
document.getElementById("alamat").addEventListener("input", () => {
  if (!evakuasiInput.value) return;

  const tpl = getTemplateEvakuasi(
    evakuasiInput.value,
    alamat.value.trim() || "lokasi kejadian"
  );

  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});

/* =========================
   ROTASI OTOMATIS 07.30
   (KOMPI & PERWIRA)
========================= */

// ====== KONFIGURASI DASAR ======
const ROTASI_START = new Date(2026, 0, 1, 7, 30, 0); // 1 Jan 2026 07.30 WIB

// urutan kompi
const urutanKompi = ["Kompi A", "Kompi B", "Kompi C"];

// urutan perwira (SUMBER KEBENARAN)
const urutanPerwira = [
  "Sarono, S.E.",
  "H. Wirawan Aries Wibowo, S.E.",
  "Paryo, S.T., M.M.",
  "Anwar Kamsari, S.T.",
  "Ruwanto, S.H.",
  "H. Imbang Satriana, S.Pd., M.M.",
  "Mohammad Slamet, S.Ip.",
  "Poengky Hermingto, S.E.",
  "Sjukri, S.Sos., M.Si.",
  "Kusnanto, S.H.",
  "Ngatiyo, S.E.",
];

// ====== FLAG MANUAL ======
let kompiManual = false;
let perwiraManual = false;

// ====== HITUNG INDEX ROTASI (FIX) ======
function getRotasiIndex(tgl) {
  // parsing aman YYYY-MM-DD
  const [y, m, d] = tgl.split("-").map(Number);

  // hari piket dimulai jam 07.30
  const selected = new Date(y, m - 1, d, 7, 30, 0);

  const diffDay = Math.floor(
    (selected - ROTASI_START) / (1000 * 60 * 60 * 24)
  );

  return diffDay >= 0 ? diffDay : 0;
}

// ====== SET OTOMATIS KOMPI ======
function setKompiOtomatis() {
  if (kompiManual) return;
  if (!tanggal.value) return;

  const idx = getRotasiIndex(tanggal.value);
  const kompi = urutanKompi[idx % urutanKompi.length];

  const kompiSelect = document.getElementById("kompi");
  kompiSelect.value = kompi;
  kompiSelect.dispatchEvent(new Event("change"));
}

// ====== SET OTOMATIS PERWIRA ======
function setPerwiraOtomatis() {
  if (perwiraManual) return;
  if (!tanggal.value) return;

  const idx = getRotasiIndex(tanggal.value);
  const namaPerwira = urutanPerwira[idx % urutanPerwira.length];

  for (let opt of perwira.options) {
    if (opt.value === namaPerwira) {
      perwira.value = opt.value;
      break;
    }
  }
}

// ====== EVENT LISTENER ======

// jika tanggal diubah → kembali otomatis
tanggal.addEventListener("change", () => {
  kompiManual = false;
  perwiraManual = false;
  setKompiOtomatis();
  setPerwiraOtomatis();
});

// jika kompi diganti manual
document.getElementById("kompi").addEventListener("change", () => {
  kompiManual = true;
});

// jika perwira diganti manual
perwira.addEventListener("change", () => {
  perwiraManual = true;
});

// auto set saat halaman dibuka
window.addEventListener("load", () => {
  if (tanggal.value) {
    setKompiOtomatis();
    setPerwiraOtomatis();
  }
});

function pilihMenu(menu) {
  document.getElementById("menuAwal").style.display = "none";
  document.getElementById("formEvakuasi").style.display = "none";
  document.getElementById("formEdukasi").style.display = "none";

  if (menu === "evakuasi" || menu === "kebakaran") {
    document.getElementById("formEvakuasi").style.display = "block";
  }

  if (menu === "edukasi") {
    document.getElementById("formEdukasi").style.display = "block";
  }
}

/* =========================
   ROTASI OTOMATIS 07.30
========================= */

// 1️⃣ BASE ROTASI (WAJIB PALING ATAS)
const ROTASI_START = new Date(2026, 0, 19, 7, 30, 0);

// 2️⃣ URUTAN KOMPI
const urutanKompi = ["Kompi A", "Kompi B", "Kompi C"];

// 3️⃣ URUTAN PERWIRA
const urutanPerwira = [
  "Poengky Hermingto, S.E.",
  "Sjukri, S.Sos., M.Si.",
  "Kusnanto, S.H.",
  "Ngatiyo, S.E.",
  "Sarono, S.E.",
  "H. Wirawan Aries Wibowo, S.E.",
  "Paryo, S.T., M.M.",
  "Anwar Kamsari, S.T.",
  "Ruwanto, S.H.",
  "H. Imbang Satriana, S.Pd., M.M.",
  "Mohammad Slamet, S.Ip."
];

// 4️⃣ BARU FUNGSI
function getRotasiIndex(tgl) {
  const [y, m, d] = tgl.split("-").map(Number);
  const selected = new Date(y, m - 1, d, 7, 30, 0);
  const diffDay = Math.floor((selected - ROTASI_START) / (1000 * 60 * 60 * 24));
  return diffDay >= 0 ? diffDay : 0;
}


function generateLaporanEdukasi() {
  const tgl = document.getElementById("tanggalEdukasi").value;
  const hari = tgl ? getHari(tgl) : "";

  const laporan = `
*SUDIN GULKARMAT KOTA ADM JAKARTA SELATAN*

*KANTOR SEKTOR X PESANGGRAHAN (4.20.01)*
        🏩 🚒🚒🚒
*Jl. Ciledug Raya Pertukangan Selatan*

*Izin Melaporkan Kegiatan Sosialisasi dan Edukasi*

*Piket* :
${document.getElementById("koordinatorEdukasi").value || "-"}

*Hari/Tgl* :
${hari}, ${tgl}

*Jenis Kegiatan*
Sosialisasi dan Edukasi untuk anak usia dini

*Nama Sekolah* :
${document.getElementById("namaSekolah").value}

*Alamat* :
${document.getElementById("alamatSekolah").value}

*Jumlah Siswa/i* :
${document.getElementById("jumlahSiswa").value}

*Guru Pendamping* :
${document.getElementById("guruPendamping").value}

*Materi* :
- Pemutaran video profil Kantor Sektor X Pesanggrahan
- Pengenalan nama-nama peralatan dan fungsinya
- Pengetahuan kantor/sektor/pos pelayanan di Kec. Pesanggrahan
- Pengetahuan tugas dan fungsi petugas pemadam
- Bermain hujan buatan menggunakan unit pompa

*Tempat* :
${document.getElementById("tempatEdukasi").value}

*Pelaksanaan* :
Jam Mulai : ${document.getElementById("jamMulaiEdukasi").value} WIB
Jam Selesai : ${document.getElementById("jamSelesaiEdukasi").value} WIB

*Perwira Piket 401* :
${document.getElementById("perwiraEdukasi").value || "-"}

*Penanggung Jawab* :
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator* :
${document.getElementById("koordinatorEdukasi").value}

*Personil* :
${document.getElementById("personilEdukasi").value}

*Demikian Laporan*
*TERIMA KASIH*
`.trim();

  document.getElementById("outputEdukasi").value = laporan;
}

document.getElementById("tanggalEdukasi").addEventListener("change", function () {
  if (!this.value) return;

  const kompi = getKompiOtomatis(this.value);
  const perwiraNama = getPerwiraOtomatis(this.value);

  document.getElementById("kompiEdukasi").value = kompi;
  const koordinatorField = document.getElementById("koordinatorEdukasi");

if (kompi === "Kompi A") {
  koordinatorField.value = `Bpk. Mulyadi, S.H
Bpk. Iskandar, S.T
Satgas/Katon Grup A Sektor X Pesanggrahan`;
}
else if (kompi === "Kompi B") {
  koordinatorField.value = `Bpk. Kaspul Arman, S.E.
Satgas/Katon Grup B Sektor X Pesanggrahan`;
}
else if (kompi === "Kompi C") {
  koordinatorField.value = `Bpk. Nuriyanto, S.E.
Bpk. Rudiawan, S.H.
Satgas/Katon Grup C Sektor X Pesanggrahan`;
}

  document.getElementById("perwiraEdukasi").value = perwiraNama;
});

// ===============================
// MENU AWAL NAVIGASI
// ===============================
function pilihMenu(menu) {
  const menuAwal = document.getElementById("menuAwal");
  const formEvakuasi = document.getElementById("formEvakuasi");
  const formEdukasi = document.getElementById("formEdukasi");

  if (!menuAwal || !formEvakuasi || !formEdukasi) {
    console.error("Elemen menu / form tidak ditemukan");
    return;
  }

  menuAwal.style.display = "none";
  formEvakuasi.style.display = "none";
  formEdukasi.style.display = "none";

  if (menu === "kebakaran" || menu === "evakuasi") {
    formEvakuasi.style.display = "block";
  }

  if (menu === "edukasi") {
    formEdukasi.style.display = "block";
  }
}

/* =========================
   AUTO ISI EDUKASI
========================= */

// isi dropdown perwira edukasi (sekali aja)
(function isiPerwiraEdukasi() {
  const select = document.getElementById("perwiraEdukasi");
  if (!select) return;

  jadwalPerwira.forEach(nama => {
    const opt = document.createElement("option");
    opt.value = nama;
    opt.textContent = nama;
    select.appendChild(opt);
  });
})();

document.getElementById("tanggalEdukasi").addEventListener("change", function () {
  if (!this.value) return;

  // === KOMPI OTOMATIS ===
  const kompi = getKompiOtomatis(this.value);

  // === PERWIRA OTOMATIS ===
  const perwiraNama = getPerwiraOtomatis(this.value);
  document.getElementById("perwiraEdukasi").value = perwiraNama;

  // === KOORDINATOR OTOMATIS ===
  const koordinatorField = document.getElementById("koordinatorEdukasi");

  if (kompi === "Kompi A") {
    koordinatorField.value = `Bpk. Mulyadi, S.H
Bpk. Iskandar, S.T
Satgas/Katon Grup A Sektor X Pesanggrahan`;
  } 
  else if (kompi === "Kompi B") {
    koordinatorField.value = `Bpk. Kaspul Arman, S.E.
Satgas/Katon Grup B Sektor X Pesanggrahan`;
  } 
  else if (kompi === "Kompi C") {
    koordinatorField.value = `Bpk. Nuriyanto, S.E.
Bpk. Rudiawan, S.H.
Satgas/Katon Grup C Sektor X Pesanggrahan`;
  }

  // === PERSONIL OTOMATIS ===
  document.getElementById("personilEdukasi").value =
    "Anggota Piket Grup " + kompi.split(" ")[1];
});





