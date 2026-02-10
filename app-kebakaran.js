/* =========================
    LOGIKA FORM KEBAKARAN
========================= */

// 1. ISI DROPDOWN PERWIRA PAS HALAMAN DIBUKA
window.addEventListener("load", () => {
    loadPerwiraDropdown("perwiraKebakaran");
});

// 2. LOGIKA OTOMATIS TANGGAL KEBAKARAN
document.getElementById("tanggalKebakaran").addEventListener("change", function() {
    if (!this.value) return;
    
    // Hitung Index Rotasi dari core.js
    const idx = getRotasiIndex(this.value);
    
    // A. SET KOMPI OTOMATIS
    const kompiOtomatis = urutanKompi[idx % 3];
    const selectKompi = document.getElementById("kompiKebakaran");
    if (selectKompi) {
        selectKompi.value = kompiOtomatis;
    }
    
    // B. SET PERWIRA OTOMATIS
    const perwiraOtomatis = getPerwiraRolling(idx);
    const selectPerwira = document.getElementById("perwiraKebakaran");
    
    if (selectPerwira) {
        selectPerwira.value = perwiraOtomatis;
        
        // Cek jika gagal set (biasanya karena dropdown belum selesai load)
        if (selectPerwira.value === "" && perwiraOtomatis !== "") {
            loadPerwiraDropdown("perwiraKebakaran");
            selectPerwira.value = perwiraOtomatis;
        }
    }
});

// 3. FUNGSI GENERATE LAPORAN KEBAKARAN
function generateLaporanKebakaran() {
    const tglInput = document.getElementById("tanggalKebakaran");
    const tgl = tglInput.value;
    if(!tgl) return alert("Pilih Tanggal!");

    // Ambil data langsung dari dropdown (bisa hasil otomatis atau manual)
    const grup = document.getElementById("kompiKebakaran").value || "-";
    const perwira = document.getElementById("perwiraKebakaran").value || "-";

    const cekNihil = (val) => (val == 0 || val == "" ? "Nihil" : val + " Jiwa");
    const formatRp = (val) => {
        if(!val || val == 0) return "Nihil";
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            maximumFractionDigits: 0 
        }).format(val);
    };

    const output = `
*Laporan Data Kejadian Kebakaran Jakarta Selatan*

*Group jaga :* ${grup}
*Hari/tanggal :* ${getHari(tgl)}

*Perwira piket 4.0.1 :*
Bpk. ${perwira}

*Terima berita :* ${document.getElementById("terimaKebakaran").value.replace(":", ".")} WIB 
*Sumber infomasi :* ${document.getElementById("sumberInfo").value}
*Nama pelapor :* ${document.getElementById("pelaporKebakaran").value}
*Nomor telpon :* ${document.getElementById("telpKebakaran").value}

*Alamat TKP :* ${document.getElementById("alamatTKP").value}
*Link Map :* ${document.getElementById("linkMaps").value}
*Acuan lokasi/titik kenal :* ${document.getElementById("acuanLokasi").value}

*Obyek yang terbakar :* ${document.getElementById("objekTerbakar").value}
*Situasi :* Pemadaman Selesai

*Pengerahan Unit:* 4.20 ${document.getElementById("unitKebakaran").value}

*Unit pertama tiba di TKP :* ${document.getElementById("unitTibaAwal").value}

*Total pengerahan unit :* ${document.getElementById("totalUnit").value} Unit
*Jumlah personil :* ${document.getElementById("personilKebakaran").value} Orang 

*Berangkat ke TKP :* ${document.getElementById("berangkatKebakaran").value.replace(":", ".")} WIB 
*Tiba di TKP :* ${document.getElementById("tibaTKP").value.replace(":", ".")} WIB
*Awal pemadaman :* ${document.getElementById("awalPadam").value.replace(":", ".")} WIB
*Api dilokalisir :* ${document.getElementById("lokalisir").value.replace(":", ".")} WIB
*Awal pendinginan :* ${document.getElementById("pendinginan").value.replace(":", ".")} WIB
*Selesai operasi pemadaman :* ${document.getElementById("selesaiKebakaran").value.replace(":", ".")} WIB

*Jumlah obyek/rumah yang terbakar :* ${document.getElementById("jumlahObjek").value}
*Obyek yang terdampak :* ${document.getElementById("objekTerdampak").value}
*Dugaan penyebab :* ${document.getElementById("penyebab").value}
*Luas area :* ± ${document.getElementById("luasArea").value} Meter
*Jumlah KK :* ${document.getElementById("jumlahKK").value} KK
*Jumlah jiwa :* ${cekNihil(document.getElementById("jumlahJiwa").value)}
*Korban luka :* ${cekNihil(document.getElementById("korbanLuka").value)}
*Korban jiwa :* ${cekNihil(document.getElementById("korbanJiwa").value)}
*Taksiran kerugian :* ± ${formatRp(document.getElementById("taksiranKerugian").value)}

*Kronologis kejadian :* ${document.getElementById("kronologisKebakaran").value}

*Demikian dilaporkan*
*Terima Kasih*
`.trim();

    document.getElementById("outputKebakaran").value = output;
}