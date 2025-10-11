import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Departemen() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDepartemen, setSelectedDepartemen] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const dataDepartemen = [
        { id_dept: 1, kode_dept: "MNG", nama_dept: "MANAGEMENT", ket_dept: "BAGIAN MENGATUR KANTOR", hirarki: "0" },
    ];

    const filteredDepartemen = dataDepartemen.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.nama_dept.toLowerCase().includes(search) ||
            item.kode_dept.toLowerCase().includes(search) ||
            item.ket_dept.toLowerCase().includes(search)
        );
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const totalPages = Math.ceil(filteredDepartemen.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDepartemen.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AdminLayout header="Departemen">
            <Head title="Departemen" />

            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300">
                {/* HEADER + SEARCH */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">
                        Data Departemen IMS POS System
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari departemen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ring-2 ring-blue-500 ring-opacity-20 w-full sm:w-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Data
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-inner">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                {["NO", "KODE", "NAMA", "KETERANGAN", "HIRARKI", "AKSI"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-semibold text-xs uppercase whitespace-nowrap text-center sm:text-left">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                                <tr key={item.id_dept} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-center font-medium">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3">{item.kode_dept}</td>
                                    <td className="px-4 py-3">{item.nama_dept}</td>
                                    <td className="px-4 py-3">{item.ket_dept}</td>
                                    <td className="px-4 py-3 text-center">{item.hirarki}</td>
                                    <td className="px-4 py-3 text-center space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setSelectedDepartemen(item);
                                                setShowEditModal(true);
                                            }}
                                            className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs sm:text-sm font-medium transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                alert(`Hapus ${item.nama_dept}`)
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

                {/* PAGINATION */}
                {filteredDepartemen.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 text-center sm:text-left">
                            Menampilkan {Math.min(indexOfFirstItem + 1, filteredDepartemen.length)} - {" "}{Math.min(indexOfLastItem, filteredDepartemen.length)} dari {filteredDepartemen.length} data
                        </p>

                        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
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
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </button>
                                <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL TAMBAH & EDIT */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                            <h3 className="text-lg font-semibold">
                                {showAddModal ? "Tambah Departemen" : "Edit Departemen"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                }}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form className="px-6 py-5 space-y-4">
                            <div>
                                <label className="text-sm font-medium">Kode Departemen</label>
                                <input
                                    type="text"
                                    defaultValue={selectedDepartemen?.kode_dept || ""}
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan kode departemen"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Nama Departemen</label>
                                <input
                                    type="text"
                                    defaultValue={selectedDepartemen?.nama_dept || ""}
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan nama departemen"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Hirarki</label>
                                <input
                                    type="number"
                                    defaultValue={selectedDepartemen?.hirarki || ""}
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Masukkan urutan/hirarki"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Keterangan</label>
                                <textarea
                                    rows="4"
                                    defaultValue={selectedDepartemen?.ket_dept || ""}
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-y"
                                    placeholder="Tulis keterangan tugas & wewenang departemen"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                    }}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium shadow"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* === MODAL EDIT DEPARTEMEN === */}
            {showEditModal && selectedDepartemen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-300 transform scale-100 animate-fadeIn">

                {/* Header Modal */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold text-gray-800">
                    Edit Data Departemen
                    </h3>
                    <button
                    onClick={() => {
                        setShowEditModal(false);
                        setSelectedDepartemen(null);
                    }}
                    className="text-gray-500 hover:text-gray-800"
                    >
                    <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Edit */}
                <form className="px-6 py-5 space-y-4">
                    <div>
                    <label className="text-sm font-medium text-gray-700">
                        Kode Departemen
                    </label>
                    <input
                        type="text"
                        defaultValue={selectedDepartemen.kode_dept}
                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    </div>

                    <div>
                    <label className="text-sm font-medium text-gray-700">
                        Nama Departemen
                    </label>
                    <input
                        type="text"
                        defaultValue={selectedDepartemen.nama_dept}
                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    </div>

                    <div>
                    <label className="text-sm font-medium text-gray-700">
                        Hirarki/Urutan Divisi
                    </label>
                    <input
                        type="number"
                        defaultValue={selectedDepartemen.hirarki}
                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    </div>

                    <div>
                    <label className="text-sm font-medium text-gray-700">
                        Keterangan
                    </label>
                    <textarea
                        rows="4"
                        defaultValue={selectedDepartemen.ket_dept}
                        className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 resize-y"
                    ></textarea>
                    </div>

                    {/* Tombol */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                    <button
                        type="button"
                        onClick={() => {
                        setShowEditModal(false);
                        setSelectedDepartemen(null);
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium shadow transition"
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
