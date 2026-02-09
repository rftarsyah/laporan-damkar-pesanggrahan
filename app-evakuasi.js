// Ganti isi app-evakuasi.js dengan ini agar tidak bentrok
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
    { keys: ["api","kebakaran"], emoji: "🔥" },
    { keys: ["musang"], emoji: "🦡" }
  ];
  for (let r of rules) {
    if (r.keys.some(k => t.includes(k))) return " " + r.emoji;
  }
  return " ⚙️";
}

function getTemplateEvakuasi(jenis, alamatVal) {
  const j = jenis.toLowerCase();
  const loc = alamatVal || "lokasi kejadian";
  if  (j.includes("ular") || j.includes("biawak")) return {
    kronologis: `Pelapor melihat adanya hewan liar ular di (...) yang berpotensi membahayakan, kemudian melaporkan kejadian tersebut ke Sektor Pemadam Pesanggrahan. Pertugas segera menindaklanjuti laporan tersebut.`,
    tindakan: `Petugas segera menindaklanjuti leporan dan segera menuju lokasi. Petugas melakukan evakuasi menggunakan grabstick hingga hewan berhasil diamankan dan evakuasi berjalan aman.`
  };

  if (j.includes("biawak")) return {
    kronologis: `Pelapor melihat adanya hewan liar biawak di (...) yang berpotensi membahayakan, kemudian melaporkan kejadian tersebut ke Sektor Pemadam Pesanggrahan. Pertugas segera menindaklanjuti laporan tersebut.`,
    tindakan: `Petugas segera menindaklanjuti leporan dan segera menuju lokasi. Petugas melakukan evakuasi menggunakan grabstick hingga hewan berhasil diamankan dan evakuasi berjalan aman.`
  };

  if (j.includes("musang")) return {
    kronologis: `Pelapor melihat adanya hewan liar musang di (...) yang berpotensi membahayakan, kemudian melaporkan kejadian tersebut ke Sektor Pemadam Pesanggrahan. Pertugas segera menindaklanjuti laporan tersebut.`,
    tindakan: `Petugas segera menindaklanjuti leporan dan segera menuju lokasi. Petugas melakukan evakuasi menggunakan grabstick hingga hewan berhasil diamankan dan evakuasi berjalan aman.`
  };

  if (j.includes("lebah") || j.includes("tawon")) return {
    kronologis: `Pelapor melihat adanya sarang ${jenis} di (...) yang berpotensi membahayakan warga sekitar. Kemudian melaporkan kejadian tersebut ke Sektor Pemadam Pesanggrahan. Pertugas segera menindaklanjuti laporan tersebut.`,
    tindakan: `Petugas segera menindaklanjuti leporan dan segera menuju lokasi. Petugas melakukan evakuasi sarang ${jenis} menggunakan plastik dan peralatan pendukung hingga aman. Evakuasi berhasil.`
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

evakuasiInput.addEventListener("change", () => {
  const tpl = getTemplateEvakuasi(evakuasiInput.value, alamat.value || "lokasi kejadian");
  kronologis.value = tpl.kronologis;
  tindakan.value = tpl.tindakan;
});

// LOGIKA OTOMATIS TANGGAL & CHECKBOX
document.getElementById("tanggal").addEventListener("change", function() {
  const idx = getRotasiIndex(this.value);
  const kompiTerpilih = urutanKompi[idx % 3];
  
  document.getElementById("kompi").value = kompiTerpilih;
  document.getElementById("perwira").value = urutanPerwira[idx % urutanPerwira.length];

  // MUNCULKAN CHECKBOX (ID HARUS 'petugas')
  const container = document.getElementById("petugas");
  container.innerHTML = "";
  const list = dataPetugas[kompiTerpilih];
  if (list) {
    list.forEach(nama => {
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.className = "petugas-item"; cb.value = nama;
      container.appendChild(cb); container.append(" " + nama); container.appendChild(document.createElement("br"));
    });
  }
});

// GENERATE LAPORAN (MEKANISME TETAP)
function generateLaporan() {
  let petugas = [];
  document.querySelectorAll(".petugas-item:checked").forEach((p, i) => { petugas.push(`${i + 1}. ${p.value}`); });
  
  const tgl = document.getElementById("tanggal").value;
  const perwiraVal = document.getElementById("perwira").value;
  const kompiVal = document.getElementById("kompi").value;

  document.getElementById("output").value = `
*SUDIN PENANGGULANGAN KEBAKARAN DAN PENYELAMATAN JAKARTA SELATAN*

*Evakuasi ${document.getElementById("evakuasiInput").value}*${emojiEvakuasi(document.getElementById("evakuasiInput").value)}
Hari/Tgl : ${getHari(tgl)}, ${tgl}

*Kompi Jaga* : ${kompiVal}

*Nama Pelapor* : ${document.getElementById("pelapor").value}
*No Telepon* : ${document.getElementById("telepon").value}
*Alamat*
${document.getElementById("alamat").value}

*Perwira Piket 401*
${perwiraVal}

*Penanggung Jawab*
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator*
${getKoordinatorByKompi(kompiVal)}

*Pelaksanaan*
Terima : ${document.getElementById("terima").value.replace(":", ".")} WIB
Meluncur : ${document.getElementById("meluncur").value.replace(":", ".")} WIB
Selesai : ${document.getElementById("selesai").value.replace(":", ".")} WIB

*Pengerahan Personil*
${document.getElementById("jumlahPersonil").value} Personil dan ${document.getElementById("unit").value}

*Kronologis*
${document.getElementById("kronologis").value}

*Tindakan*
${document.getElementById("tindakan").value}

*Petugas*
${petugas.join("\n")}

*Demikian dilaporkan*
*Terima Kasih*`.trim();
}