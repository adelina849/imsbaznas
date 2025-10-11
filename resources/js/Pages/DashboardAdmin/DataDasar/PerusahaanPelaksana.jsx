import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ChevronDown, Plus, X, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function PerusahaanPelaksana() {
    const [showInfo, setShowInfo] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPelaksana, setSelectedPelaksana] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy data
    const dataPelaksana = [
        {
            id: 1,
            kode: "3170015",
            nama: "CV. MEGA SETIA ABADI",
            no_izin: "0220003862573",
            pemilik: "DANI HERMAWAN S.Pd",
            kota: "Cianjur",
            alamat: "BTN GUNTENG BLOK AG NOMOR 10 RT.004 RW.007 DESA BOJONG KECAMATAN KARANGTENGAH KABUPATEN CIANJUR",
            tlp: "087720018514",
            website: "cv.megasetiaabadi@gmail.com",
            tgl_buka: "2025-10-11",
            ket_kantor: "NOTARIS : ANDRIE NUGRAHA, S.H.,M.Kn. dan Nama Notaris : LINDA SRI ARYANI SYARIF, SH., M.Kn",
        },
        {
            id: 2,
            kode: "3170022",
            nama: "PT. SINAR TEKNIK MANDIRI",
            no_izin: "0220001237890",
            pemilik: "RIZKY SAPUTRA",
            kota: "Bandung",
            alamat: "Jl. Merdeka No. 12 Bandung",
            tlp: "081234567890",
            website: "pusakakujangpasundan@gmail.com",
            tgl_buka: "2024-08-15",
            ket_kantor: "NOTARIS : BUDI HARTONO, S.H., M.Kn",
        },
        {
            id: 3,
            kode: "1170022",
            nama: "PT. SINAR TEKNIK MANDIRI",
            no_izin: "0220001237890",
            pemilik: "RIZKY SAPUTRA",
            kota: "Bandung",
            alamat: "Jl. Merdeka No. 12 Bandung",
            tlp: "081234567890",
            website: "pusakakujangpasundan@gmail.com",
            tgl_buka: "2024-08-15",
            ket_kantor: "NOTARIS : BUDI HARTONO, S.H., M.Kn",
        },
        {
            id: 4,
            kode: "3130022",
            nama: "PT. SINAR TEKNIK MANDIRI",
            no_izin: "0220001237890",
            pemilik: "RIZKY SAPUTRA",
            kota: "Bandung",
            alamat: "Jl. Merdeka No. 12 Bandung",
            tlp: "081234567890",
            website: "pusakakujangpasundan@gmail.com",
            tgl_buka: "2024-08-15",
            ket_kantor: "NOTARIS : BUDI HARTONO, S.H., M.Kn",
        },
        {
            id: 5,
            kode: "3170622",
            nama: "PT. SINAR TEKNIK MANDIRI",
            no_izin: "0220001237890",
            pemilik: "RIZKY SAPUTRA",
            kota: "Bandung",
            alamat: "Jl. Merdeka No. 12 Bandung",
            tlp: "081234567890",
            website: "pusakakujangpasundan@gmail.com",
            tgl_buka: "2024-08-15",
            ket_kantor: "NOTARIS : BUDI HARTONO, S.H., M.Kn",
        },
        {
            id: 6,
            kode: "3370022",
            nama: "PT. SINAR TEKNIK MANDIRI",
            no_izin: "0220001237890",
            pemilik: "RIZKY SAPUTRA",
            kota: "Bandung",
            alamat: "Jl. Merdeka No. 12 Bandung",
            tlp: "081234567890",
            website: "pusakakujangpasundan@gmail.com",
            tgl_buka: "2024-08-15",
            ket_kantor: "NOTARIS : BUDI HARTONO, S.H., M.Kn",
        },
    ];

    // Filter hasil berdasarkan searchTerm
    const filteredPelaksana = dataPelaksana.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.nama.toLowerCase().includes(search) ||
            item.kode.toLowerCase().includes(search) ||
            item.pemilik.toLowerCase().includes(search) ||
            item.kota.toLowerCase().includes(search) ||
            item.no_izin.toLowerCase().includes(search)
        );
    });

    // Pagination logic
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const totalPages = Math.ceil(filteredPelaksana.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPelaksana.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AdminLayout header="Perusahaan Pelaksana">
            <Head title="Perusahaan Pelaksana" />

            {/* Section: Info Perusahaan Pelaksana - Tetap sama */}
            <div className="bg-white shadow rounded-lg p-5 transition-all duration-300">
                <div
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <h2 className="text-lg font-semibold text-gray-700">
                        Perusahaan Pelaksana
                    </h2>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                            showInfo ? "rotate-180" : ""
                        }`}
                    />
                </div>

                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                        showInfo ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                >
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed">
                        <li>
                            <b>Definisi Umum :</b> Perusahaan pelaksana adalah entitas yang memiliki keahlian untuk mengerjakan pekerjaan yang telah direncanakan.
                        </li>
                        <li>
                            <b>Peran :</b> Mereka bertanggung jawab atas pelaksanaan pekerjaan di lapangan, dari persiapan hingga penyelesaian proyek.
                        </li>
                        <li>
                            <b>Jenis :</b> Dapat berbentuk PT atau perorangan dengan keahlian khusus.
                        </li>
                    </ul>
                    <p className="mt-4 text-sm text-red-600 font-medium">
                        NB : Pastikan anda setting perusahaan pelaksana, agar ketika terjadi transaksi kode perusahaan tersetting sesuai.
                        Jika tidak maka kode pelaksana akan kosong dan ini berpengaruh pada laporan.
                    </p>
                </div>
            </div>

            {/* Section: Tarik Data dari API */}
            <div className="bg-white shadow rounded-lg p-5 mt-6 transition-all duration-300">
                <div
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowLogs(!showLogs)}
                >
                    <h2 className="text-lg font-semibold text-gray-700">
                        Tarik data dari API
                    </h2>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                            showLogs ? "rotate-180" : ""
                        }`}
                    />
                </div>

                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                        showLogs ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                >
                    <p className="text-gray-700 text-sm mb-3">
                        Sinkronisasi data pelaksana bisa dilakukan dengan API JSON dengan format sebagai berikut:
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <p className="font-semibold text-gray-800 mb-2">
                            Contoh Response [POST]
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li><b>kode_pelaksana</b>: "MSA"</li>
                            <li><b>nama_pelaksana</b>: "CV. MEGA SETIA ABADI"</li>
                            <li><b>no_izin</b>: "MSA000001032"</li>
                            <li><b>pic_pemilik</b>: "DANI HERMAWAN S.Pd"</li>
                            <li><b>kota</b>: "Cianjur"</li>
                            <li><b>alamat</b>: "Jl. Cangklek Nomor 61, Cugenang"</li>
                            <li><b>tlp</b>: "087720018514"</li>
                            <li><b>tanggal_buka</b>: "2025-02-18"</li>
                            <li><b>keterangan</b>: "-"</li>
                        </ul>
                    </div>

                    <label className="text-sm font-medium text-gray-700 block mb-2">
                        URL API/JSON
                    </label>
                    <div className="flex gap-3 items-center">
                        <input
                            type="text"
                            placeholder="https://appmsa.com/retrieve/pelaksana"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ring-2 ring-red-500 ring-opacity-20">
                            PROSES
                        </button>
                    </div>
                </div>
            </div>

            {/* === SECTION: TABEL DATA  === */}
            <div className="bg-white shadow-md rounded-xl p-4 mt-6 transition-all duration-300 max-w-none">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-xl font-bold text-gray-800">
                        Data Perusahaan Pelaksana IMS POS System
                    </h2>

                    {/* Search Bar */}
                    <div className="flex items-center w-full sm:w-72 relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari perusahaan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ring-2 ring-blue-500 ring-opacity-20"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Data
                    </button>
                </div>

                <div className="w-full mx-0 overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
                    <table className="min-w-full w-full border-collapse text-sm text-left table-auto">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-center text-gray-800 whitespace-nowrap">
                                    NO
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-left text-gray-800 whitespace-nowrap">
                                    DATA PERUSAHAAN
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-left text-gray-800 whitespace-nowrap">
                                    KONTAK
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-left text-gray-800 whitespace-nowrap">
                                    KETERANGAN
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-center text-gray-800 whitespace-nowrap">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {currentItems.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`transition-all duration-200 ${
                                        (indexOfFirstItem + index) % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }`}
                                >
                                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 whitespace-nowrap">
                                        {indexOfFirstItem + index + 1}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                        <p><b>Kode:</b> {item.kode}</p>
                                        <p><b>Nama:</b> {item.nama}</p>
                                        <p><b>No Izin:</b> {item.no_izin}</p>
                                        <p><b>Pemilik:</b> {item.pemilik}</p>
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                        <p><b>Kota:</b> {item.kota}</p>
                                        <p><b>Alamat:</b> {item.alamat}</p>
                                        <p><b>Telp:</b> {item.tlp}</p>
                                        <p><b>Website:</b> {item.website}</p>
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                        <p><b>Tanggal Berdiri:</b> {item.tgl_buka}</p>
                                        <p><b>Keterangan Kantor:</b> {item.ket_kantor}</p>
                                    </td>

                                    <td className="px-4 py-3 text-center space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setSelectedPelaksana(item);
                                                setShowEditModal(true);
                                            }}
                                            className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105 rounded-full transition-all duration-200 shadow-sm"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => alert(`Hapus ${item.nama}`)}
                                            className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 rounded-full transition-all duration-200 shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredPelaksana.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                            Showing {Math.min(indexOfFirstItem + 1, filteredPelaksana.length)} to{" "}
                            {Math.min(indexOfLastItem, filteredPelaksana.length)} of {filteredPelaksana.length} entries
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5 per halaman</option>
                                <option value={10}>10 per halaman</option>
                                <option value={25}>25 per halaman</option>
                                <option value={50}>50 per halaman</option>
                            </select>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md min-w-[100px] text-center">
                                    Halaman {currentPage} dari {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {dataPelaksana.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 mt-4">
                        <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Belum Ada Data
                        </h3>
                        <p className="text-sm text-gray-500">
                            Belum ada data perusahaan pelaksana. Klik "Tambah Data" untuk menambahkan yang pertama.
                        </p>
                    </div>
                ) : filteredPelaksana.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 mt-4">
                        <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">
                            Tidak ditemukan
                        </h3>
                        <p className="text-sm text-gray-500">
                            Tidak ada data yang cocok dengan kata kunci "<b>{searchTerm}</b>"
                        </p>
                    </div>
                ) : null}
            </div>

            {/* Modal Tambah Data */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    {/* Overlay Scrollable Container */}
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Tambah Data Pelaksana
                            </h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form className="px-6 py-5 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kode Perusahaan Pelaksana
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="*Masukkan Kode Perusahaan pelaksana"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Kode harus unik dan tidak dapat dihapus setelah disimpan.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nama Perusahaan Pelaksana
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="*Masukkan Nama Perusahaan Pelaksana"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nomor Izin/SITU/SIUP/AHU
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="*Masukkan Nomor Izin/SITU/SIUP/AHU"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    No. Telpon / HP
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan No Telpon/HP"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Website
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan Nama Website"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kota Lokasi Perusahaan
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan Kota Lokasi Perusahaan"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Alamat Lengkap Perusahaan
                                </label>
                                <textarea
                                    rows="3"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 leading-relaxed resize-y"
                                    placeholder="Masukkan Alamat Lengkap Perusahaan"
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Tanggal Pembukaan/Berdiri Perusahaan
                                </label>
                                <input
                                    type="date"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    min="1900-01-01"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Keterangan
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 leading-relaxed resize-y"
                                    placeholder="Isikan lengkap tentang Perusahaan Pelaksana"
                                ></textarea>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium shadow transition-all"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit Data */}
            {showEditModal && selectedPelaksana && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    {/* Overlay Scrollable Container */}
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Edit Data Pelaksana
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form className="px-6 py-5 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kode Perusahaan Pelaksana
                                </label>
                                <input
                                    type="text"
                                    value={selectedPelaksana.kode || ""}
                                    disabled
                                    className="w-full mt-1 bg-gray-100 border-gray-300 rounded-lg shadow-sm text-gray-600 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Kode tidak dapat diubah.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nama Perusahaan Pelaksana
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedPelaksana.nama}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="*Masukkan Nama Perusahaan Pelaksana"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nomor Izin/SITU/SIUP/AHU
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedPelaksana.no_izin}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="*Masukkan Nomor Izin/SITU/SIUP/AHU"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nama Pemilik
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedPelaksana.pemilik}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="*Masukkan Nama Pemilik"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    No. Telpon / HP
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedPelaksana.tlp}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan No Telpon/HP"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Website
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedPelaksana.website}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan Nama Website"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Kota Lokasi Perusahaan
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedPelaksana.kota}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan Kota Lokasi Perusahaan"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Alamat Lengkap Perusahaan
                                </label>
                                <textarea
                                    rows="3"
                                    defaultValue={selectedPelaksana.alamat}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 leading-relaxed resize-y"
                                    placeholder="Masukkan Alamat Lengkap Perusahaan"
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Tanggal Pembukaan/Berdiri Perusahaan
                                </label>
                                <input
                                    type="date"
                                    defaultValue={selectedPelaksana.tgl_buka}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    min="1900-01-01"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Keterangan
                                </label>
                                <textarea
                                    rows="4"
                                    defaultValue={selectedPelaksana.ket_kantor}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 leading-relaxed resize-y"
                                    placeholder="Isikan lengkap tentang Perusahaan Pelaksana"
                                ></textarea>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium shadow transition-all"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
