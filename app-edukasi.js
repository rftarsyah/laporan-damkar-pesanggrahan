/* =========================
   LOGIKA FORM EDUKASI
========================= */

// Isi dropdown perwira saat halaman siap
window.addEventListener("load", () => {
  const sel = document.getElementById("perwiraEdukasi");
  if (sel && typeof urutanPerwira !== 'undefined') {
    sel.innerHTML = '<option value="">-- Pilih Perwira --</option>';
    urutanPerwira.forEach(n => {
      sel.add(new Option(n, n));
    });
  }
});

// Update otomatis Kompi, Perwira, dan Koordinator berdasarkan tanggal
document.getElementById("tanggalEdukasi").addEventListener("change", function () {
  if (!this.value) return;
  
  const idx = getRotasiIndex(this.value);
  const kompi = urutanKompi[idx % 3];
  
  document.getElementById("perwiraEdukasi").value = urutanPerwira[idx % urutanPerwira.length];
  document.getElementById("koordinatorEdukasi").value = getKoordinatorByKompi(kompi);
  document.getElementById("personilEdukasi").value = "Anggota Piket Grup " + kompi.split(" ")[1];
});

// Fungsi Generate Laporan
function generateLaporanEdukasi() {
  const tgl = document.getElementById("tanggalEdukasi").value;
  if (!tgl) {
    alert("Pilih tanggal dulu!");
    return;
  }

  const laporan = `
*SUDIN GULKARMAT KOTA ADM JAKARTA SELATAN*

*KANTOR SEKTOR X PESANGGRAHAN (4.20.01)*
        🏩 🚒🚒🚒
*Jl. Ciledug Raya Pertukangan Selatan*

*Izin Melaporkan Kegiatan Sosialisasi dan Edukasi*

*Piket* :
${kompiVal}
*Hari/Tgl* :
${getHari(tgl)}, ${tgl}

*Jenis Kegiatan* :
Sosialisasi dan Edukasi untuk anak usia dini

*Nama Sekolah* :
${document.getElementById("namaSekolah").value}

*Alamat* :
${document.getElementById("alamatSekolah").value}

*Jumlah Siswa/i* :
${document.getElementById("jumlahSiswa").value} Orang Anak

*Jumlah Guru Pendamping* :
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
Jam Mulai : ${document.getElementById("jamMulaiEdukasi").value.replace(":", ".")} WIB
Jam Selesai : ${document.getElementById("jamSelesaiEdukasi").value.replace(":", ".")} WIB

*Perwira Piket 401* :
${document.getElementById("perwiraEdukasi").value}

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