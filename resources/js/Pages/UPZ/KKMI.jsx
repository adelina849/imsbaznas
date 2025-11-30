import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout"; 
import UpzFiltered from "@/Components/UpzFiltered";
import UpzChartProfile from "@/Components/UpzChartProfile";
import UpzBox from "@/Components/UpzBox";
import UpzKegiatan, { kegiatanData } from "@/Components/UpzKegiatan";
import { AssetsModal, MuzakiModal, UpzModal, SaldoModal } from "@/Components/UpzModal";

// ==========================================================
// ===                  DATA DUMMY                        ===
// ==========================================================

const assetsData = [
    {
        image: "assets/baznas.jpg",
        kode: "UPZ-0000001",
        nama: "Komputer Kantor",
        tanggal: "01 Januari 2025",
        pic: "Andi Muhamad Ilham",
        nominal: "Rp. 15.000.000,-",
        penyusutan: "Rp. 2.500.000,-",
        asal: "RNY Computer",
    },
    {
        image: "assets/baznas.jpg",
        kode: "UPZ-0000002",
        nama: "Kendaraan Operasional",
        tanggal: "10 Februari 2025",
        pic: "Budi Santoso",
        nominal: "Rp. 120.000.000,-",
        penyusutan: "Rp. 10.000.000,-",
        asal: "Dealer Maju Jaya",
    },
    {
        image: "assets/baznas.jpg",
        kode: "UPZ-0000003",
        nama: "Printer Laser",
        tanggal: "05 Maret 2025",
        pic: "Citra Dewi",
        nominal: "Rp. 5.000.000,-",
        penyusutan: "Rp. 500.000,-",
        asal: "Toko Elektronik",
    },
];

const muzakiData = [
    { nama: "Ahmad Riyadi", jenis: "Muzaki", jumlah: "Rp 1.000.000", tanggal: "01 April 2025" },
    { nama: "Siti Rahayu", jenis: "Mustahik", jumlah: "Rp 500.000", tanggal: "05 April 2025" },
    { nama: "Budi Hartono", jenis: "Muzaki", jumlah: "Rp 2.500.000", tanggal: "10 April 2025" },
    { nama: "Yulianti", jenis: "Mustahik", jumlah: "Rp 750.000", tanggal: "12 April 2025" },
    { nama: "Joko Susilo", jenis: "Muzaki", jumlah: "Rp 500.000", tanggal: "15 April 2025" },
    { nama: "Rina Wijaya", jenis: "Mustahik", jumlah: "Rp 400.000", tanggal: "20 April 2025" },
];

const upzKaryawanData = [
    {
        image: "assets/baznas.jpg",
        nama: "UPZ Cibatu",
        jabatan: "Unit Pengumpul Zakat",
        kelamin: "Laki-laki",
        tmp_lahir: "Sukabumi",
        tgl_lahir: "01/01/2010",
        tlp_email: "upz.cibatu@baznas.id",
        alamat: "Jl. Cibatu No. 1",
    },
    {
        image: "assets/baznas.jpg",
        nama: "UPZ Cikole",
        jabatan: "Unit Pengumpul Zakat",
        kelamin: "Laki-laki",
        tmp_lahir: "Bandung",
        tgl_lahir: "15/03/2012",
        tlp_email: "upz.cikole@baznas.id",
        alamat: "Jl. Cikole No. 5",
    },
    {
        image: "assets/baznas.jpg",
        nama: "Fajar Pratama",
        jabatan: "Staf Keuangan",
        kelamin: "Laki-laki",
        tmp_lahir: "Jakarta",
        tgl_lahir: "10/05/1995",
        tlp_email: "fajar@baznas.id",
        alamat: "Jl. Jakarta No. 10",
    },
];

const kegiatanKKMI = kegiatanData.filter(
    item => item.kategori === "KKMI"
);

// Data transaksi saldo dummy
const saldoData = [
    {
        kode: "1.1.01 (Kas)",
        transaksi: [
            { no: 1, tanggal: "2025-11-14", no_ref: "00001/UM/11/2025", keterangan: "setor bulan november", no_dept: "", debit: "100.000", kredit: "" },
            { no: 2, tanggal: "2025-11-14", no_ref: "00001/UK/14/11/2025/KKMA", keterangan: "Setoran Ke baznas untuk desember", no_dept: "", debit: "", kredit: "50.000" },
        ],
        subtotal: { debit: "100.000", kredit: "50.000", saldo: "50.000" },
        total: { debit: "100.000", kredit: "50.000", saldo: "50.000" }
    },
    {
        kode: "3.2 (Dana Infaq/Sedekah)",
        transaksi: [
            { no: 1, tanggal: "2025-11-14", no_ref: "00001/UM/11/2025", keterangan: "-", no_dept: "", debit: "100.000", kredit: "" },
            { no: 2, tanggal: "2025-11-14", no_ref: "00001/UM/11/2025", keterangan: "setor bulan november", no_dept: "", debit: "100.000", kredit: "" },
            { no: 3, tanggal: "2025-11-14", no_ref: "00001/UK/14/11/2025/KKMA", keterangan: "Setoran Ke baznas untuk desember", no_dept: "", debit: "", kredit: "50.000" },
        ],
        subtotal: { debit: "200.000", kredit: "50.000", saldo: "150.000" },
        total: { debit: "200.000", kredit: "50.000", saldo: "150.000" }
    }
];

    const originalData = [
        { bulan: "JANUARI", tanggal: "2025-01-15", pengumpulan: 1.2, pendistribusian: 1.5, muzaki: 1.0 },
        { bulan: "FEBRUARI", tanggal: "2025-02-10", pengumpulan: 1.6, pendistribusian: 1.3, muzaki: 1.0 },
        { bulan: "MARET", tanggal: "2025-03-08", pengumpulan: 1.4, pendistribusian: 0.8, muzaki: 0.8 },
        { bulan: "APRIL", tanggal: "2025-04-12", pengumpulan: 1.5, pendistribusian: 0.7, muzaki: 2.0 },
    ];

// ==========================================================
// === KOMPONEN UTAMA DASHBOARD ===
// ==========================================================

export default function BaznasDashboardSection() {
    // === STATE UNTUK MODAL ===
    const [showAssetsModal, setShowAssetsModal] = useState(false);
    const [showMuzakiModal, setShowMuzakiModal] = useState(false);    
    const [showUpzModal, setShowUpzModal] = useState(false);      
    const [showSaldoModal, setShowSaldoModal] = useState(false); 

    // === STATE UNTUK FILTER CHART ===
    const [filterStart, setFilterStart] = useState("");
    const [filterEnd, setFilterEnd] = useState("");
    const [filterJenis, setFilterJenis] = useState("all");

    // === LOGIKA FILTER (dengan useMemo) ===
    const filteredData = useMemo(() => {
        return originalData.filter((item) => {
            const tgl = new Date(item.tanggal);
            if (filterStart && tgl < new Date(filterStart)) return false;
            if (filterEnd && tgl > new Date(filterEnd)) return false;
            return true;
        });
    }, [filterStart, filterEnd]);

    // Fungsi reset filter
    const resetFilters = () => {
        setFilterStart("");
        setFilterEnd("");
        setFilterJenis("all");
    };

    return (
        <AdminLayout header="KKMI"> 
            <Head title="KKMI" /> 

            <div className="space-y-6 sm:space-y-8">
                {/* 1. FILTER SECTION */}
                <UpzFiltered
                    filterStart={filterStart}
                    setFilterStart={setFilterStart}
                    filterEnd={filterEnd}
                    setFilterEnd={setFilterEnd}
                    filterJenis={filterJenis}
                    setFilterJenis={setFilterJenis}
                    resetFilters={resetFilters}
                />

                {/* 2. CHART & PROFIL SECTION */}
                <UpzChartProfile
                    filteredData={filteredData}
                    filterJenis={filterJenis}
                    title="Grafik Pengelolaan ZIS KKMI"
                />

                {/* 3. CARD STATISTIK SECTION */}
                <UpzBox
                    setShowAssetsModal={setShowAssetsModal}
                    setShowMuzakiModal={setShowMuzakiModal}
                    setShowUpzModal={setShowUpzModal}
                    setShowSaldoModal={setShowSaldoModal}
                />
                
                {/* 4. KEGIATAN TERBARU SECTION */}
                <UpzKegiatan data={kegiatanKKMI} showKategori={false} />
            </div>

            {/* KOMPONEN MODAL DITAMPILKAN DI AKHIR */}
            <AssetsModal
                isVisible={showAssetsModal}
                onClose={() => setShowAssetsModal(false)}
                assets={assetsData}
            />
            <MuzakiModal
                isVisible={showMuzakiModal}
                onClose={() => setShowMuzakiModal(false)}
                data={muzakiData}
            />
            <UpzModal
                isVisible={showUpzModal}
                onClose={() => setShowUpzModal(false)}
                upz={upzKaryawanData}
            />
            <SaldoModal
                isVisible={showSaldoModal}
                onClose={() => setShowSaldoModal(false)}
                saldoData={saldoData}
            />
        </AdminLayout>
    );
}