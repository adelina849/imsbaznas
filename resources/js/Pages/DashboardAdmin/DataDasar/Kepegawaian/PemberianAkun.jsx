import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Akun() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAkun, setSelectedAkun] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy data
    const dataAkun = [
        {
            id_karyawan: 1,id_jabatan: "MNG",no_karyawan: "GFD00087",nik_karyawan: "3203047006040002",
            nama_karyawan: "Nurani Putri Susanti",pnd: "-",tlp: "085925833324",email: "nurani@gmail.com",
            tmp_lahir: "Cianjur",tgl_lahir: "30-06-2004",kelamin: "PEREMPUAN",sts_nikah: "LAJANG",
            alamat: "Kp Kebon Jambu 06/04 Desa Cibinonghilir",ket_karyawan: "-",tgl_diterima: "09-09-2024",
            sts_karyawan: "KARYAWAN UMUM",
        }
    ];

    // Filter hasil berdasarkan searchTerm
    const filteredAkun = dataAkun.filter((item) => {
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

    // Pagination logic
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const totalPages = Math.ceil(filteredAkun.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAkun.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AdminLayout header="Pemberian Akun">
            <Head title="Pemberian Akun"/>
            {/* === SECTION: TABEL DATA  === */}
            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300 max-w-none">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-xl font-bold text-gray-800">
                        Pemberian Akun IMS POS System
                    </h2>

                    {/* Search Bar */}
                    <div className="flex items-center w-full sm:w-72 relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari Akun..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="w-full mx-0 overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
                    <table className="min-w-full w-full border-collapse text-sm text-left table-auto">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-center text-gray-800 whitespace-nowrap">
                                    NO
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-left text-gray-800 whitespace-nowrap">
                                    FOTO PROFILE
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-left text-gray-800 whitespace-nowrap">
                                    BIODATA
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-left text-gray-800 whitespace-nowrap">
                                    USERNAME
                                </th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-center text-gray-800 whitespace-nowrap">
                                    AKSI
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
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-12 h-12 text-gray-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"
                                                />
                                            </svg>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                        <p><b>NO:</b> {item.no_karyawan}</p>
                                        <p><b>NIK:</b> {item.nik_karyawan}</p>
                                        <p><b>NAMA:</b> {item.nama_karyawan}</p>
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">

                                    </td>

                                    <td className="px-4 py-3 text-center whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setSelectedAkun(item);
                                                setShowEditModal(true);
                                            }}
                                            className="px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-lg shadow-sm transition-all duration-200 hover:scale-105"
                                        >
                                            Beri Akun
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredAkun.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                            Showing {Math.min(indexOfFirstItem + 1, filteredAkun.length)} to{" "}
                            {Math.min(indexOfLastItem, filteredAkun.length)} of {filteredAkun.length} entries
                        </div>
                        <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Tampilkan</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-lg pl-2 pr-6 py-1.5 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-gray-600">/ halaman</span>
                        </div>
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

                {dataAkun.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 mt-4">
                        <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Belum Ada Data
                        </h3>
                        <p className="text-sm text-gray-500">
                            Belum ada data Akun.
                        </p>
                    </div>
                ) : filteredAkun.length === 0 ? (
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
            
            {/* Modal Pemberian akun */}
            {showEditModal && selectedAkun && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg text-black overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-300">
                            <h3 className="text-lg font-semibold">
                                Pemberian Akun Karyawan
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6 text-center space-y-5">
                            {/* Foto Profil */}
                            <div className="flex justify-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-12 h-12 text-gray-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Nama & Alamat */}
                            <div>
                                <h2 className="text-xl font-bold">{selectedAkun.nama_karyawan}</h2>
                                <p className="text-sm text-black/90">{selectedAkun.alamat}</p>
                            </div>

                            {/* Form */}
                            <form className="space-y-4 text-left">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">
                                        Nama Pengguna / Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="*Isi dengan Nama Pengguna/Username"
                                        className="w-full px-3 py-2 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">
                                        Kata Sandi / Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="*Kata sandi / Password"
                                        className="w-full px-3 py-2 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">
                                        Konfirmasi Kata Sandi / Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="*Konfirmasi Kata Sandi / Password"
                                        className="w-full px-3 py-2 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-between items-center px-6 py-4 bg-blue-500 border-t border-blue">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-blue-500 transition-all"
                            >
                                Tutup
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-300 transition-all"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}