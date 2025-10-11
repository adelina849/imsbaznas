import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Karyawan() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const dataKaryawan = [
        {
            id_karyawan: 1,id_jabatan: "MNG",no_karyawan: "GFD00087",nik_karyawan: "3203047006040002",
            nama_karyawan: "Nurani Putri Susanti",pnd: "-",tlp: "085925833324",email: "nurani@gmail.com",
            tmp_lahir: "Cianjur",tgl_lahir: "2004-06-30",kelamin: "Perempuan",sts_nikah: "Belum Menikah",
            alamat: "Kp Kebon Jambu 06/04 Desa Cibinonghilir",ket_karyawan: "-",tgl_diterima: "2024-09-09",
            sts_karyawan: "KARYAWAN UMUM",
        },
    ];

    const filteredKaryawan = dataKaryawan.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.id_jabatan.toLowerCase().includes(search) ||
            item.no_karyawan.toLowerCase().includes(search) ||
            item.nik_karyawan.toLowerCase().includes(search) ||
            item.nama_karyawan.toLowerCase().includes(search) ||
            item.tlp.toLowerCase().includes(search) ||
            item.email.toLowerCase().includes(search) ||
            item.tmp_lahir.toLowerCase().includes(search) ||
            item.tgl_lahir.toLowerCase().includes(search) ||
            item.kelamin.toLowerCase().includes(search) ||
            item.sts_nikah.toLowerCase().includes(search) ||
            item.alamat.toLowerCase().includes(search) ||
            item.ket_karyawan.toLowerCase().includes(search)
        );
    });

    useEffect(() => setCurrentPage(1), [searchTerm, itemsPerPage]);
    const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredKaryawan.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AdminLayout header="Data Karyawan">
            <Head title="Data Karyawan" />

            <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Data Karyawan IMS POS System
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari Karyawan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Data
                        </button>
                    </div>
                </div>

                {/* Table Wrapper */}
                <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                <th className="px-3 py-3 text-xs sm:text-sm font-bold text-center whitespace-nowrap">NO</th>
                                <th className="px-3 py-3 text-xs sm:text-sm font-bold whitespace-nowrap">FOTO PROFILE</th>
                                <th className="px-3 py-3 text-xs sm:text-sm font-bold whitespace-nowrap">BIODATA</th>
                                <th className="px-3 py-3 text-xs sm:text-sm font-bold whitespace-nowrap">ALAMAT</th>
                                <th className="px-3 py-3 text-xs sm:text-sm font-bold whitespace-nowrap">KETERANGAN</th>
                                <th className="px-3 py-3 text-xs sm:text-sm font-bold text-center whitespace-nowrap">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                                <tr key={item.id_karyawan} className="hover:bg-gray-50">
                                    <td className="px-3 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-3 py-3">
                                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-10 h-10 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"
                                                />
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 leading-relaxed">
                                        <p><b>No:</b> {item.no_karyawan}</p>
                                        <p><b>NIK:</b> {item.nik_karyawan}</p>
                                        <p><b>Nama:</b> {item.nama_karyawan}</p>
                                        <p><b>Pendidikan:</b> {item.pnd}</p>
                                    </td>
                                    <td className="px-3 py-3 leading-relaxed">
                                        <p><b>Telp:</b> {item.tlp}</p>
                                        <p><b>Email:</b> {item.email}</p>
                                        <p><b>Kelamin:</b> {item.kelamin}</p>
                                        <p><b>TTL:</b> {item.tmp_lahir}, {item.tgl_lahir}</p>
                                        <p><b>Alamat:</b> {item.alamat}</p>
                                    </td>
                                    <td className="px-3 py-3 leading-relaxed">
                                        <p><b>Status:</b> {item.sts_karyawan}</p>
                                        <p><b>Nikah:</b> {item.sts_nikah}</p>
                                        <p><b>Diterima:</b> {item.tgl_diterima}</p>
                                        <p><b>Keterangan:</b> {item.ket_karyawan}</p>
                                    </td>
                                    <td className="px-3 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedKaryawan(item);
                                                setShowEditModal(true);
                                            }}
                                            className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full transition-all"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => alert(`Hapus ${item.nama_karyawan}`)}
                                            className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-all"
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
                {filteredKaryawan.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-3 py-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                            Menampilkan {Math.min(indexOfFirstItem + 1, filteredKaryawan.length)}–{Math.min(indexOfLastItem, filteredKaryawan.length)} dari {filteredKaryawan.length}
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
            </div>

            {/* === MODAL TAMBAH & EDIT (Responsive Lengkap) === */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-300">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Data Karyawan" : "Edit Data Karyawan"}
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
                            {/* === Grid Utama === */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No Karyawan</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedKaryawan?.no_karyawan || ""}
                                        placeholder="Masukkan No Karyawan"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">NIK</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedKaryawan?.nik_karyawan || ""}
                                        placeholder="Masukkan NIK"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedKaryawan?.nama_karyawan || ""}
                                        placeholder="Nama lengkap"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={selectedKaryawan?.email || ""}
                                        placeholder="Masukkan Email"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No. Telepon</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedKaryawan?.tlp || ""}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Pendidikan</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedKaryawan?.pnd || ""}
                                        placeholder="Contoh: S1 Teknik Informatika"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                    <select
                                        defaultValue={selectedKaryawan?.kelamin || ""}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                    <input
                                        type="date"
                                        defaultValue={selectedKaryawan?.tgl_lahir || ""}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status Karyawan</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedKaryawan?.sts_karyawan || ""}
                                        placeholder="Contoh: Aktif / Cuti / Keluar"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status Pernikahan</label>
                                    <select
                                        defaultValue={selectedKaryawan?.sts_nikah || ""}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Belum Menikah">Belum Menikah</option>
                                        <option value="Menikah">Menikah</option>
                                        <option value="Cerai">Cerai</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Diterima</label>
                                    <input
                                        type="date"
                                        defaultValue={selectedKaryawan?.tgl_diterima || ""}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Alamat & Keterangan */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Alamat</label>
                                    <textarea
                                        rows="3"
                                        defaultValue={selectedKaryawan?.alamat || ""}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-y"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                    <textarea
                                        rows="3"
                                        defaultValue={selectedKaryawan?.ket_karyawan || ""}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-y"
                                    />
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                    }}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
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
        </AdminLayout>
    );
}
