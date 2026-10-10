/* =========================
    LOGIKA FORM EVAKUASI
========================= */

// 1. Emoji & Template Logic
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

function getTemplateEvakuasi(jenis) {
    const j = jenis.toLowerCase();
    const alamatVal = document.getElementById("alamat").value || "(...)";
    
    if  (j.includes("ular")) return {
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

// 2. Event Listeners
window.addEventListener("load", () => loadPerwiraDropdown("perwira"));

document.getElementById("evakuasiInput").addEventListener("change", function() {
    const tpl = getTemplateEvakuasi(this.value);
    document.getElementById("kronologis").value = tpl.kronologis;
    document.getElementById("tindakan").value = tpl.tindakan;
});

// LOGIKA OTOMATIS TANGGAL & CHECKBOX
document.getElementById("tanggal").addEventListener("change", function() {
    if (!this.value) return;
    
    const idx = getRotasiIndex(this.value);
    const kompiTerpilih = urutanKompi[idx % 3];
    
    // Set Input Kompi & Perwira
    document.getElementById("kompi").value = kompiTerpilih;
    document.getElementById("perwira").value = getPerwiraRolling(idx);

    // --- GENERATE CHECKBOX PETUGAS ---
    const container = document.getElementById("petugas");
    container.innerHTML = ""; // Bersihkan dulu
    
    const list = dataPetugas[kompiTerpilih];
    
    if (list) {
        list.forEach(nama => {
            const wrapper = document.createElement("label");
            wrapper.className = "petugas-item-wrapper";

            const cb = document.createElement("input");
            cb.type = "checkbox"; 
            cb.className = "petugas-item"; 
            cb.value = nama;

            const span = document.createElement("span");
            span.textContent = nama;

            wrapper.appendChild(cb);
            wrapper.appendChild(span);
            container.appendChild(wrapper);
        });
    }
});

// 3. Generate Laporan
// GANTI TEKS DI BAWAH INI DENGAN URL API YANG KAMU DAPATKAN
const URL_API_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzz7H7MrjR_3D4EVEdPcy47Cd0bAzq4XWM1GBhzbOsdtbpPJ6xoBPc31VILUqTK-XuC/exec";

async function kirimLaporanEvakuasi() {
    const tgl = document.getElementById("tanggal").value;
    if (!tgl) return alert("Pilih Tanggal terlebih dahulu!");

    // 1. Tampilkan status loading & nonaktifkan tombol
    const statusText = document.getElementById("statusEvakuasi");
    const btnSubmit = document.getElementById("btnKirimEvakuasi");
    statusText.style.display = "block";
    btnSubmit.disabled = true;
    btnSubmit.style.background = "#ccc";

    try {
        // 2. Ambil & Proses File Media
        const fileInput = document.getElementById("mediaEvakuasi");
        let fileMediaArray = [];
        if (fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                let fileBase64 = await bacaFileSebagaiBase64(fileInput.files[i]);
                fileMediaArray.push(fileBase64);
            }
        }

        // 3. Ambil data Personil Checkbox
        let petugas = [];
        document.querySelectorAll("#petugas .petugas-item:checked").forEach((p, i) => { 
            petugas.push(`${i + 1}. ${p.value}`); 
        });

        const evakuasiInput = document.getElementById("evakuasiInput").value || "Evakuasi Umum";
        const kompiVal = document.getElementById("kompi").value;
        const perwiraVal = document.getElementById("perwira").value;
        const jumlahPersonil = document.getElementById("jumlahPersonil").value;
        const unitVal = document.getElementById("unit").value;

        // 4. Siapkan Data JSON untuk API (Variabel disesuaikan dengan kode Apps Script)
        const payload = {
            tanggal: tgl,
            jenisLaporan: document.getElementById("evakuasiInput").value,
            judulKejadian: evakuasiInput,
            kompi: kompiVal,
            pelapor: document.getElementById("pelapor").value,
            noTelp: document.getElementById("telepon").value,
            alamat: document.getElementById("alamat").value,
            perwira: perwiraVal,
            waktuTerima: document.getElementById("terima").value,
            waktuMeluncur: document.getElementById("meluncur").value,
            waktuSelesai: document.getElementById("selesai").value,
            kronologi: document.getElementById("kronologis").value,
            tindakan: document.getElementById("tindakan").value,
            unit: unitVal,
            personil: (petugas.length > 0 ? petugas.join("\n") : "-"),
            media: fileMediaArray
        };

        // 5. Kirim ke Google Apps Script via POST (mode no-cors untuk Google Script)
        // 5. Kirim ke Google Apps Script via POST (menggunakan mode text/plain untuk bypass CORS)
        const response = await fetch(URL_API_APPS_SCRIPT, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8", // INI PENTING! Harus text/plain
            },
            body: JSON.stringify(payload)
        });

        // 6. Tangkap URL dari API
        const responseData = await response.json();
        
        if (responseData.status === "success") {
            // 7. Buat teks laporan WhatsApp dengan URL Drive
            const laporanWA = generateTeksWhatsAppEvakuasi(payload, petugas, responseData.linkFolder);
            document.getElementById("output").value = laporanWA;
            alert("Data berhasil tersimpan ke Spreadsheet & Drive!");
        } else {
            alert("Gagal menyimpan data: " + responseData.message);
        }

    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengirim data. Cek koneksi internet.");
    } finally {
        // 8. Kembalikan tombol seperti semula
        statusText.style.display = "none";
        btnSubmit.disabled = false;
        btnSubmit.style.background = "#e53935";
    }
}

// Pisahkan fungsi untuk menyusun teks agar lebih rapi
function generateTeksWhatsAppEvakuasi(data, daftarPetugas, linkDrive) {
    return `*SUDIN PENANGGULANGAN KEBAKARAN DAN PENYELAMATAN JAKARTA SELATAN*

*Evakuasi ${data.judulKejadian}*${emojiEvakuasi(data.judulKejadian)}
Hari/Tgl : ${getHari(data.tanggal)}

*Kompi Jaga* : ${data.kompi}

*Nama Pelapor* : ${data.pelapor}
*No Telepon* : ${data.noTelp}
*Alamat*
${data.alamat}

*Perwira Piket 401*
Bpk. ${data.perwira.split('\n')[0]}

*Penanggung Jawab*
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator*
${getKoordinatorByKompi(data.kompi)}

*Pelaksanaan*
Terima : ${data.waktuTerima.replace(":", ".")} WIB
Meluncur : ${data.waktuMeluncur.replace(":", ".")} WIB
Selesai : ${data.waktuSelesai.replace(":", ".")} WIB

*Pengerahan Personil*
${data.unit} (Total: ${data.personil.split('\n')[0]})

*Kronologis*
${data.kronologi}

*Tindakan*
${data.tindakan}

*Petugas*
${daftarPetugas.length > 0 ? daftarPetugas.join("\n") : "-"}

*Dokumentasi (Foto/Video)*
🔗 ${linkDrive}

*Demikian dilaporkan*
*Terima Kasih*`.trim();
}
