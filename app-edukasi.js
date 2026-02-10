/* =========================
    LOGIKA FORM EDUKASI
========================= */

// 1. Load Dropdown
window.addEventListener("load", () => loadPerwiraDropdown("perwiraEdukasi"));

// 2. Update Otomatis
document.getElementById("tanggalEdukasi").addEventListener("change", function () {
  if (!this.value) return;
  const idx = getRotasiIndex(this.value);
  const kompi = urutanKompi[idx % 3];
  this.dataset.kompi = kompi;
  
  // Set value dropdown perwira dari fungsi rolling
  document.getElementById("perwiraEdukasi").value = getPerwiraRolling(idx);
  
  document.getElementById("koordinatorEdukasi").value = getKoordinatorByKompi(kompi);
  document.getElementById("personilEdukasi").value = "Anggota Piket Grup " + kompi.split(" ")[1];
});

// 3. Fungsi utama membuat teks laporan
function generateLaporanEdukasi() {
  const tglInput = document.getElementById("tanggalEdukasi");
  const tgl = tglInput.value;
  
  // Mengambil nama kompi yang tadi disimpan (A, B, atau C)
  const kompiTerpilih = tglInput.dataset.kompi || "-"; 

  if (!tgl) {
    alert("Harap pilih tanggal kegiatan terlebih dahulu!");
    return;
  }

  // Mengambil nilai jam, jika kosong berikan strip (-)
  const jamMulai = document.getElementById("jamMulaiEdukasi").value.replace(":", ".") || "-";
  const jamSelesai = document.getElementById("jamSelesaiEdukasi").value.replace(":", ".") || "-";

  const laporan = `
*SUDIN GULKARMAT KOTA ADM JAKARTA SELATAN*

*SEKTOR X KECAMATAN PESANGGRAHAN (4.20)*
        🏩 🚒🚒🚒
*Jl. Ciledug Raya Pertukangan Selatan*

*Izin Melaporkan Kegiatan Sosialisasi dan Edukasi*

*Piket* : ${kompiTerpilih}

*Hari/Tgl* : ${getHari(tgl)}

*Jenis Kegiatan* :
Sosialisasi dan Edukasi untuk anak usia dini

*Nama Sekolah* :
${document.getElementById("namaSekolah").value}

*Alamat* :
${document.getElementById("alamatSekolah").value}

*Jumlah Siswa/i* :
${document.getElementById("jumlahSiswa").value} Orang Anak

*Jumlah Guru/Pendamping* :
${document.getElementById("guruPendamping").value} Orang

*Materi* :
- Pemutaran video profil Kantor Sektor X Pesanggrahan
- Pengenalan nama-nama peralatan dan fungsinya
- Pengetahuan kantor/sektor/pos pelayanan yang berada di lingkungan Kec. Pesanggrahan
- Pengetahuan tugas dan fungsi petugas pemadam
- Bermain hujan buatan menggunakan unit pompa

*Tempat* :
${document.getElementById("tempatEdukasi").value}

*Pelaksanaan* :
Jam Mulai : ${jamMulai} WIB
Jam Selesai : ${jamSelesai} WIB

*Perwira Piket 401* :
Bpk. ${document.getElementById("perwiraEdukasi").value}

*Penanggung Jawab* :
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator* :
${document.getElementById("koordinatorEdukasi").value}

*Personil* :
${document.getElementById("personilEdukasi").value}

*Demikian Laporan*
*TERIMA KASIH*`.trim();

  document.getElementById("outputEdukasi").value = laporan;
}