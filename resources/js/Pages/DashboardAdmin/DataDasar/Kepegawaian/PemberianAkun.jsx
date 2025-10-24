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

    const dataAkun = [
        {
            id_karyawan: 1,id_jabatan: "MNG",no_karyawan: "GFD00087",nik_karyawan: "3203047006040002",
            nama_karyawan: "Nurani Putri Susanti",pnd: "-",tlp: "085925833324",email: "nurani@gmail.com",
            tmp_lahir: "Cianjur",tgl_lahir: "30-06-2004",kelamin: "PEREMPUAN",sts_nikah: "LAJANG",
            alamat: "Kp Kebon Jambu 06/04 Desa Cibinonghilir",ket_karyawan: "-",tgl_diterima: "09-09-2024",
            sts_karyawan: "KARYAWAN UMUM",
        },
    ];

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

    useEffect(() => setCurrentPage(1), [searchTerm, itemsPerPage]);

    const totalPages = Math.ceil(filteredAkun.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAkun.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AdminLayout header="Pemberian Akun">
            <Head title="Pemberian Akun" />

            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300">
                {/* Header & Search */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                        Pemberian Akun IMS POS System
                    </h2>

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

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
                {filteredAkun.length > 0 ? (
                    <table className="min-w-full border-collapse text-sm text-left table-auto">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                {["NO", "FOTO PROFILE", "BIODATA", "USERNAME", "AKSI"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-semibold text-xs uppercase text-center whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                                <tr key={item.id_karyawan} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center border border-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor"
                                                 className="w-10 h-10 text-gray-600">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"/>
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed min-w-[200px]">
                                        <p><b>NO:</b> {item.no_karyawan}</p>
                                        <p><b>NIK:</b> {item.nik_karyawan}</p>
                                        <p><b>NAMA:</b> {item.nama_karyawan}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-gray-700"></td>
                                    <td className="px-4 py-3 text-center">
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
                    ) : (
                    // Empty States
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    {searchTerm ? (
                        <>
                        <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Tidak ditemukan</h3>
                        <p className="text-sm text-gray-500">
                            Tidak ada data yang cocok dengan kata kunci <b>"{searchTerm}"</b>
                        </p>
                        </>
                    ) : (
                        <>
                        <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Data</h3>
                        <p className="text-sm text-gray-500">Belum ada data Jabatan.</p>
                        </>
                    )}
                    </div>
                )}
                </div>
            </div>
            {/* Pagination */}
            {filteredAkun.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 text-center sm:text-left">
                        Menampilkan {Math.min(indexOfFirstItem + 1, filteredAkun.length)} - {" "}{Math.min(indexOfLastItem, filteredAkun.length)} dari {filteredAkun.length} data
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

            {/* Modal */}
            {showEditModal && selectedAkun && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg text-black overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-300">
                            <h3 className="text-lg font-semibold">Pemberian Akun Karyawan</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-6 py-6 text-center space-y-5">
                            <div className="flex justify-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                         className="w-12 h-12 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"/>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">{selectedAkun.nama_karyawan}</h2>
                                <p className="text-sm text-gray-700">{selectedAkun.alamat}</p>
                            </div>

                            <form className="space-y-4 text-left">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-800">
                                        Nama Pengguna / Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="*Isi dengan Nama Pengguna/Username"
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-800">
                                        Kata Sandi / Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="*Kata sandi / Password"
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-800">
                                        Konfirmasi Kata Sandi / Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="*Konfirmasi Kata Sandi / Password"
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-blue-500 gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-blue-500 transition-all"
                            >
                                Tutup
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-300 transition-all"
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
