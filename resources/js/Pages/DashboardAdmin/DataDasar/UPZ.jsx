import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ChevronDown, Plus, X, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function UPZ() {
    const [showInfo, setShowInfo] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUpz, setSelectedUpz] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy data
    const dataUpz = [
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
    const filteredUpz = dataUpz.filter((item) => {
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

    const totalPages = Math.ceil(filteredUpz.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUpz.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AdminLayout header="UPZ">
            <Head title="UPZ" />

            {/* Section: Info UPZ - Tetap sama */}
            <div className="bg-white shadow rounded-lg p-5 transition-all duration-300">
                <div
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <h2 className="text-lg font-semibold text-gray-700">
                        upz
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
                            <b>Definisi Umum :</b> UPZ adalah entitas yang memiliki keahlian untuk mengerjakan pekerjaan yang telah direncanakan.
                        </li>
                        <li>
                            <b>Peran :</b> Mereka bertanggung jawab atas pelaksanaan pekerjaan di lapangan, dari persiapan hingga penyelesaian proyek.
                        </li>
                        <li>
                            <b>Jenis :</b> Dapat berbentuk PT atau perorangan dengan keahlian khusus.
                        </li>
                    </ul>
                    <p className="mt-4 text-sm text-red-600 font-medium">
                        NB : Pastikan anda setting UPZ, agar ketika terjadi transaksi kode UPZ tersetting sesuai.
                        Jika tidak maka kode UPZ akan kosong dan ini berpengaruh pada laporan.
                    </p>
                </div>
            </div>

            {/* Section: Tarik Data dari API */}
            <div className="bg-white shadow rounded-lg p-5 my-6 transition-all duration-300">
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
                        Sinkronisasi data UPZ bisa dilakukan dengan API JSON dengan format sebagai berikut:
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
            <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Data UPZ IMS POS System
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari UPZ..."
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
                </div>

                {/* Table Wrapper */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-inner">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="w-[60px] px-4 py-3 font-semibold text-xs uppercase text-center">NO</th>
                                <th className="w-[250px] px-4 py-3 font-semibold text-xs uppercase text-center">DATA UPZ</th>
                                <th className="w-[220px] px-4 py-3 font-semibold text-xs uppercase text-center">KONTAK</th>
                                <th className="w-[250px] px-4 py-3 font-semibold text-xs uppercase text-center">KETERANGAN</th>
                                <th className="w-[150px] px-4 py-3 font-semibold text-xs uppercase text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <p><b>Kode:</b> {item.kode}</p>
                                        <p><b>Nama:</b> {item.nama}</p>
                                        <p><b>No Izin:</b> {item.no_izin}</p>
                                        <p><b>Pemilik:</b> {item.pemilik}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <p><b>Kota:</b> {item.kota}</p>
                                        <p><b>Alamat:</b> {item.alamat}</p>
                                        <p><b>Telp:</b> {item.tlp}</p>
                                        <p><b>Website:</b> {item.website}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <p><b>Tanggal Berdiri:</b> {item.tgl_buka}</p>
                                        <p><b>Keterangan Kantor:</b> {item.ket_kantor}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedUpz(item);
                                                editForm.setData(item);
                                                setShowEditModal(true);
                                            }}
                                            className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id_kantor)}
                                            className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-xs font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredUpz.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-3 py-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                            Menampilkan {Math.min(indexOfFirstItem + 1, filteredUpz.length)}–{Math.min(indexOfLastItem, filteredUpz.length)} dari {filteredUpz.length}
                        </p>

                        <div className="flex items-center gap-2">
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="border border-gray-300 rounded-lg pl-2 pr-6 py-1 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                                >
                                    {[5, 10, 25, 50].map((n) => (
                                        <option key={n} value={n}>
                                            {n} / halaman
                                        </option>
                                    ))}
                                </select>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" /> Prev
                            </button>
                            <span className="text-sm text-gray-700">
                                {currentPage}/{totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty States */}
                {dataUpz.length === 0 && (
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 mt-4">
                        <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Data</h3>
                        <p className="text-sm text-gray-500">Belum ada data UPZ.</p>
                    </div>
                )}

                {filteredUpz.length === 0 && searchTerm !== "" && (
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 mt-4">
                        <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Tidak ditemukan</h3>
                        <p className="text-sm text-gray-500">
                            Tidak ada data yang cocok dengan kata kunci <b>"{searchTerm}"</b>
                        </p>
                    </div>
                )}
            </div>

            {/* === MODAL TAMBAH & EDIT UPZ === */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-300 transform scale-100 animate-fadeIn">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Data UPZ" : "Edit Data UPZ"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    setSelectedUpz(null);
                                }}
                                className="text-gray-500 hover:text-gray-800 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* === FORM === */}
                        <form className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Kode UPZ */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kode UPZ</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.kode || ""}
                                        disabled={showEditModal}
                                        placeholder="Masukkan kode unik UPZ"
                                        className={`w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                                            showEditModal ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
                                        }`}
                                    />
                                    {showAddModal ? (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kode harus unik dan tidak dapat diubah setelah disimpan.
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500 mt-1">Kode tidak dapat diubah.</p>
                                    )}
                                </div>

                                {/* Nama UPZ */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama UPZ</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.nama || ""}
                                        placeholder="Masukkan nama UPZ"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Nomor Izin */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nomor Izin / SITU / SIUP / AHU</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.no_izin || ""}
                                        placeholder="Masukkan nomor izin"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Nama Pemilik */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama Pemilik</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.pemilik || ""}
                                        placeholder="Masukkan nama pemilik"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* No. Telepon */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No. Telepon / HP</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.tlp || ""}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Website</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.website || ""}
                                        placeholder="Contoh: www.UPZ.com"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Kota */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kota Lokasi UPZ</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedUpz?.kota || ""}
                                        placeholder="Masukkan nama kota"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Tanggal Berdiri */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Berdiri</label>
                                    <input
                                        type="date"
                                        defaultValue={selectedUpz?.tgl_buka || ""}
                                        min="1900-01-01"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Alamat & Keterangan */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                                <textarea
                                    rows="3"
                                    defaultValue={selectedUpz?.alamat || ""}
                                    placeholder="Masukkan alamat lengkap UPZ"
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-y"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="3"
                                    defaultValue={selectedUpz?.ket_kantor || ""}
                                    placeholder="Tuliskan deskripsi atau informasi tambahan"
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-y"
                                />
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        setSelectedUpz(null);
                                    }}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium shadow transition text-white ${
                                        showAddModal
                                            ? "bg-amber-500 hover:bg-amber-600"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    {showAddModal ? "Simpan" : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
