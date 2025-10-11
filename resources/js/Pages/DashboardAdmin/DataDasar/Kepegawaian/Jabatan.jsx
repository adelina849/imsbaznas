import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {ChevronLeft,ChevronRight,Plus,X,Search,} from "lucide-react";

export default function Jabatan() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedJabatan, setSelectedJabatan] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy data
    const dataJabatan = [
        {
            id_jabatan: 1,
            id_dept: "MNG",
            kode_jabatan: "M-001",
            nama_jabatan: "MANAGEMEN",
            ket_jabatan:
                "Memegang otoritas tertinggi dalam menjalankan aplikasi/system secara menyeluruh",
            hirarki: "0",
        },
    ];

    // Filter hasil berdasarkan searchTerm
    const filteredJabatan = dataJabatan.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.id_dept.toLowerCase().includes(search) ||
            item.kode_jabatan.toLowerCase().includes(search) ||
            item.nama_jabatan.toLowerCase().includes(search) ||
            item.ket_jabatan.toLowerCase().includes(search) ||
            item.hirarki.toLowerCase().includes(search)
        );
    });

    // Pagination logic
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const totalPages = Math.ceil(filteredJabatan.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredJabatan.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <AdminLayout header="Jabatan">
            <Head title="Jabatan" />

            {/* === SECTION: TABEL DATA === */}
            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300">
                {/* Header dan Search Bar */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">
                        Data Jabatan IMS POS System
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2">
                        {/* Search */}
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari jabatan..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Tombol Tambah */}
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ring-2 ring-blue-500 ring-opacity-20 w-full sm:w-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Data
                        </button>
                    </div>
                </div>

                {/* === TABEL DATA === */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
                    <table className="min-w-full text-sm text-left table-auto">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                {[
                                    "NO",
                                    "DEPARTEMEN",
                                    "KODE",
                                    "NAMA",
                                    "KETERANGAN",
                                    "HIRARKI",
                                    "JUMLAH AKSES",
                                    "AKSI",
                                ].map((head, i) => (
                                    <th
                                        key={i}
                                        className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${
                                            i === 0
                                                ? "text-center"
                                                : "text-left"
                                        } whitespace-nowrap`}
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {currentItems.map((item, index) => (
                                <tr
                                    key={item.id_jabatan}
                                    className={`transition-all duration-200 ${
                                        (indexOfFirstItem + index) % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }`}
                                >
                                    <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap">
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    <td className="px-4 py-3">{item.id_dept}</td>
                                    <td className="px-4 py-3">
                                        {item.kode_jabatan}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.nama_jabatan}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.ket_jabatan}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.hirarki}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {item.hirarki}
                                    </td>
                                    <td className="px-4 py-3 text-center space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setSelectedJabatan(item);
                                                setShowEditModal(true);
                                            }}
                                            className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs sm:text-sm font-medium transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                alert(`Hapus ${item.nama_jabatan}`)
                                            }
                                            className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-xs sm:text-sm font-medium transition-all"
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
                {filteredJabatan.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 py-3 bg-gray-50 rounded-lg gap-3">
                        <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                            Menampilkan{" "}
                            {Math.min(
                                indexOfFirstItem + 1,
                                filteredJabatan.length
                            )}{" "}
                            -{" "}
                            {Math.min(
                                indexOfLastItem,
                                filteredJabatan.length
                            )}{" "}
                            dari {filteredJabatan.length} data
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
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

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.max(p - 1, 1))
                                    }
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 px-2 sm:px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Prev
                                </button>
                                <span className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                                    {currentPage}/{totalPages}
                                </span>
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(p + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 px-2 sm:px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* === MODAL TAMBAH & EDIT JABATAN === */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-300 transform scale-100 animate-fadeIn">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Data Jabatan" : "Edit Data Jabatan"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    setSelectedJabatan(null);
                                }}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* === FORM === */}
                        <form className="px-6 py-5 space-y-4">
                            {/* Grid Input */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Departemen</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedJabatan?.id_dept || ""}
                                        placeholder="Masukkan Departemen"
                                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kode Jabatan</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedJabatan?.kode_jabatan || ""}
                                        placeholder="Masukkan Kode Jabatan"
                                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Nama Jabatan</label>
                                <input
                                    type="text"
                                    defaultValue={selectedJabatan?.nama_jabatan || ""}
                                    placeholder="Masukkan Nama Jabatan"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="4"
                                    defaultValue={selectedJabatan?.ket_jabatan || ""}
                                    placeholder="Tambahkan keterangan (opsional)"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 resize-y"
                                ></textarea>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Hirarki</label>
                                <input
                                    type="number"
                                    defaultValue={selectedJabatan?.hirarki || ""}
                                    placeholder="Masukkan Hirarki Jabatan"
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            {/* === Tombol Aksi === */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        setSelectedJabatan(null);
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
