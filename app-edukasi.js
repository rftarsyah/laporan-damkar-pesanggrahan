// NAMA VARIABEL SUDAH DIUBAH MENJADI URL_API_EDUKASI AGAR TIDAK BENTROK
const URL_API_EDUKASI = "https://script.google.com/macros/s/AKfycbz8lARNn9cNgLLQjm6ESsgHYIevqDIx2nuKvU7aNDqwRmfAdwUSqRSov8z8wNfkUma0/exec";

/* =========================
    LOGIKA FORM EDUKASI
========================= */

window.addEventListener("load", () => loadPerwiraDropdown("perwiraEdukasi"));

document.getElementById("tanggalEdukasi").addEventListener("change", function () {
  if (!this.value) return;
  const idx = getRotasiIndex(this.value);
  const kompi = urutanKompi[idx % 3];
  this.dataset.kompi = kompi;
  
  // INI FUNGSI OTOMATISASI YANG KEMARIN MATI KARENA CRASH
  document.getElementById("perwiraEdukasi").value = getPerwiraRolling(idx);
  document.getElementById("koordinatorEdukasi").value = getKoordinatorByKompi(kompi);
  document.getElementById("personilEdukasi").value = "Anggota Piket Grup " + kompi.split(" ")[1];
});

async function kirimLaporanEdukasi() {
    const tglInput = document.getElementById("tanggalEdukasi");
    const tgl = tglInput.value;
    if (!tgl) return alert("Harap pilih tanggal kegiatan terlebih dahulu!");

    const statusText = document.getElementById("statusEdukasi");
    const btnSubmit = document.getElementById("btnKirimEdukasi");
    if(statusText) statusText.style.display = "block";
    if(btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.style.background = "#ccc";
    }

    try {
        const fileInput = document.getElementById("mediaEdukasi");
        let fileMediaArray = [];
        if (fileInput && fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                let fileBase64 = await bacaFileSebagaiBase64(fileInput.files[i]);
                fileMediaArray.push(fileBase64);
            }
        }

        const kompiTerpilih = tglInput.dataset.kompi || "-";
        const namaSekolah = document.getElementById("namaSekolah").value || "Nama Sekolah Tidak Diisi";
        const alamatSekolah = document.getElementById("alamatSekolah").value || "-";
        const jumlahSiswa = document.getElementById("jumlahSiswa").value || "0";
        const guruPendamping = document.getElementById("guruPendamping").value || "0";
        const tempatEdukasi = document.getElementById("tempatEdukasi").value || "-";
        const jamMulai = document.getElementById("jamMulaiEdukasi").value || "-";
        const jamSelesai = document.getElementById("jamSelesaiEdukasi").value || "-";
        const perwiraVal = document.getElementById("perwiraEdukasi").value || "-";
        const koordinatorEdukasi = document.getElementById("koordinatorEdukasi").value || "-";
        const personilEdukasi = document.getElementById("personilEdukasi").value || "-";

        const payload = {
            tanggalKegiatan: tgl,
            namaSekolah: namaSekolah,
            alamatSekolah: alamatSekolah,
            jumlahSiswa: jumlahSiswa,
            jumlahPendamping: guruPendamping,
            tempatKegiatan: tempatEdukasi,
            jamMulai: jamMulai,
            jamSelesai: jamSelesai,
            perwiraPiket: perwiraVal,
            koordinator: koordinatorEdukasi,
            personil: personilEdukasi,
            media: fileMediaArray
        };

        // FETCH SEKARANG MEMANGGIL URL_API_EDUKASI
        const response = await fetch(URL_API_EDUKASI, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8", 
            },
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        
        if (responseData.status === "success") {
            const laporanWA = generateTeksWhatsAppEdukasi(
                payload, jamMulai, jamSelesai, jumlahSiswa, guruPendamping, 
                tempatEdukasi, koordinatorEdukasi, responseData.linkFolder
            );
            document.getElementById("outputEdukasi").value = laporanWA;
            alert("Laporan Edukasi berhasil tersimpan ke Spreadsheet & Drive!");
        } else {
            alert("Gagal menyimpan data: " + responseData.message);
        }

    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengirim data. Pastikan koneksi internet stabil.");
    } finally {
        if(statusText) statusText.style.display = "none";
        if(btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.style.background = "#e53935";
        }
    }
}

function generateTeksWhatsAppEdukasi(data, jamMulai, jamSelesai, jumlahSiswa, guruPendamping, tempatEdukasi, koordinatorEdukasi, linkDrive) {
    return `*SUDIN GULKARMAT KOTA ADM JAKARTA SELATAN*

*SEKTOR X KECAMATAN PESANGGRAHAN (4.20)*
        🏩 🚒🚒🚒
*Jl. Ciledug Raya Pertukangan Selatan*

*Izin Melaporkan Kegiatan Sosialisasi dan Edukasi*

*Piket* : ${data.kompi}

*Hari/Tgl* : ${getHari(data.tanggalKegiatan)}

*Jenis Kegiatan* :
Sosialisasi dan Edukasi untuk anak usia dini

*Nama Sekolah* :
${data.namaSekolah}

*Alamat* :
${data.alamatSekolah}

*Jumlah Siswa/i* :
${jumlahSiswa} Orang Anak

*Jumlah Guru/Pendamping* :
${guruPendamping} Orang

*Materi* :
- Pemutaran video profil Kantor Sektor X Pesanggrahan
- Pengenalan nama-nama peralatan dan fungsinya
- Pengetahuan kantor/sektor/pos pelayanan yang berada di lingkungan Kec. Pesanggrahan
- Pengetahuan tugas dan fungsi petugas pemadam
- Bermain hujan buatan menggunakan unit pompa

*Tempat* :
${tempatEdukasi}

*Pelaksanaan* :
Jam Mulai : ${jamMulai.replace(":", ".")} WIB
Jam Selesai : ${jamSelesai.replace(":", ".")} WIB

*Perwira Piket 401* :
Bpk. ${data.perwiraPiket.split('\n')[0]}

*Penanggung Jawab* :
Bpk. Poengky Hermingto, S.E
Kasie Sektor X Pesanggrahan

*Koordinator* :
${koordinatorEdukasi}

*Personil* :
${data.personil.split('\nKoordinator')[0]}

*Dokumentasi (Foto/Video)* :
🔗 ${linkDrive}

*Demikian Laporan*
*TERIMA KASIH*`.trim();
}
