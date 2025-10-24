import { useState, useEffect } from "react";
import { useForm, usePage, Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Karyawan() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { props } = usePage();
    const dataKaryawan = props.dataKaryawan || [];

    // State form pakai useForm
    const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
        id_karyawan: "",
        id_jabatan: "",
        no_karyawan: "",
        nik_karyawan: "",
        nama_karyawan: "",
        pnd: "",
        tlp: "",
        email: "",
        tmp_lahir: "",
        tgl_lahir: "",
        kelamin: "",
        sts_nikah: "",
        alamat: "",
        ket_karyawan: "",
        tgl_diterima: "",
        sts_karyawan: "",
    });

    const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log("Mengirim data ke backend:", data);

    post(route("karyawan.store"), {
        preserveScroll: true,
        onSuccess: () => {
        window.alert("✅ Data karyawan berhasil disimpan!");
        reset();
        setShowAddModal(false);
        },
        onError: (errors) => {
        console.error("🧩 ERROR DETAIL:", errors);
        window.alert("❌ Gagal menyimpan data, periksa input!");
        },
    });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route("karyawan.update", data.id_karyawan), {
            onSuccess: () => {
                reset();
                setShowEditModal(false);
            },
        });
    };

        const handleEdit = (item) => {
            setData({
                id_karyawan: item.id_karyawan,
                id_jabatan: item.id_jabatan,
                no_karyawan: item.no_karyawan || "",
                nik_karyawan: item.nik_karyawan || "",
                nama_karyawan: item.nama_karyawan || "",
                pnd: item.pnd || "",
                tlp: item.tlp || "",
                email: item.email || "",
                tmp_lahir: item.tmp_lahir || "",
                tgl_lahir: item.tgl_lahir || "",
                kelamin: item.kelamin || "",
                sts_nikah: item.sts_nikah || "",
                alamat: item.alamat || "",
                ket_karyawan: item.ket_karyawan || "",
                tgl_diterima: item.tgl_diterima || "",
                sts_karyawan: item.sts_karyawan || "",
            });
            setSelectedKaryawan(item);
            setShowEditModal(true);
        };

    const handleDelete = (id, nama) => {
        if (confirm(`Yakin ingin menghapus ${nama}?`)) {
            destroy(route("karyawan.destroy", id));
        }
    };

    const filteredKaryawan = dataKaryawan.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.id_jabatan.toLowerCase().includes(search) ||
            item.no_karyawan.toLowerCase().includes(search) ||
            item.nik_karyawan.toLowerCase().includes(search) ||
            (item.nama_karyawan || "").toLowerCase().includes(search) ||
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
                {filteredKaryawan.length > 0 ? (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                {["NO", "FOTO PROFILE", "BIODATA", "ALAMAT", "KETERANGAN", "AKSI"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-semibold text-xs uppercase whitespace-nowrap text-center sm:text-left">
                                        {h}
                                    </th>
                                ))}
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
                                            className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs sm:text-sm font-medium transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id_karyawan, item.nama_karyawan)}
                                            className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-xs sm:text-sm font-medium transition-all"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (
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
                
            {/* === MODAL TAMBAH & EDIT (Responsive Lengkap) === */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-300 transform scale-100 animate-fadeIn">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Data Karyawan" : "Edit Data Karyawan"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    reset();
                                    setSelectedKaryawan(null);
                                }}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form
                            onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit}
                            className="px-6 py-5 space-y-4"
                        >
                            {/* Grid Input */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/* Jabatan */}
<div>
  <label className="text-sm font-medium text-gray-700">Jabatan</label>
  <select
    value={data.id_jabatan}
    onChange={(e) => setData("id_jabatan", e.target.value)}
    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
  >
    <option value="">Pilih Jabatan</option>
    {props.dataJabatan?.map((jabatan) => (
      <option key={jabatan.id_jabatan} value={jabatan.id_jabatan}>
        {jabatan.nama_jabatan}
      </option>
    ))}
  </select>
  {errors.id_jabatan && (
    <p className="text-red-500 text-xs mt-1">{errors.id_jabatan}</p>
  )}
</div>

                                {/* No Karyawan */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No Karyawan</label>
                                    <input
                                        type="text"
                                        value={data.no_karyawan}
                                        onChange={(e) => setData("no_karyawan", e.target.value)}
                                        placeholder="Masukkan No Karyawan"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    {errors.no_karyawan && (
                                        <p className="text-red-500 text-xs mt-1">{errors.no_karyawan}</p>
                                    )}
                                </div>

                                {/* NIK */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">NIK</label>
                                    <input
                                        type="text"
                                        value={data.nik_karyawan}
                                        onChange={(e) => setData("nik_karyawan", e.target.value)}
                                        placeholder="Masukkan NIK"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    {errors.nik_karyawan && (
                                        <p className="text-red-500 text-xs mt-1">{errors.nik_karyawan}</p>
                                    )}
                                </div>

                                {/* Nama */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama</label>
                                    <input
                                        type="text"
                                        value={data.nama_karyawan}
                                        onChange={(e) => setData("nama_karyawan", e.target.value)}
                                        placeholder="Nama lengkap"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    {errors.nama_karyawan && (
                                        <p className="text-red-500 text-xs mt-1">{errors.nama_karyawan}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        placeholder="Masukkan Email"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Telepon */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No. Telepon</label>
                                    <input
                                        type="text"
                                        value={data.tlp}
                                        onChange={(e) => setData("tlp", e.target.value)}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    {errors.tlp && (
                                        <p className="text-red-500 text-xs mt-1">{errors.tlp}</p>
                                    )}
                                </div>

                                {/* Pendidikan */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Pendidikan</label>
                                    <input
                                        type="text"
                                        value={data.pnd}
                                        onChange={(e) => setData("pnd", e.target.value)}
                                        placeholder="Contoh: S1 Teknik Informatika"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                    <select
                                        value={data.kelamin}
                                        onChange={(e) => setData("kelamin", e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                    <input
                                        type="date"
                                        value={data.tgl_lahir || ""}
                                        onChange={(e) => setData("tgl_lahir", e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Tempat Lahir */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tempat Lahir</label>
                                    <input
                                        type="text"
                                        value={data.tmp_lahir}
                                        onChange={(e) => setData("tmp_lahir", e.target.value)}
                                        placeholder="Masukkan Tempat Lahir"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Status Pernikahan */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status Pernikahan</label>
                                    <select
                                        value={data.sts_nikah}
                                        onChange={(e) => setData("sts_nikah", e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Belum Menikah">Belum Menikah</option>
                                        <option value="Menikah">Menikah</option>
                                        <option value="Cerai">Cerai</option>
                                    </select>
                                </div>

                                {/* Tanggal Diterima */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Diterima</label>
                                    <input
                                        type="date"
                                        value={data.tgl_diterima || ""}
                                        onChange={(e) => setData("tgl_diterima", e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Status Karyawan */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status Karyawan</label>
                                    <input
                                        type="text"
                                        value={data.sts_karyawan}
                                        onChange={(e) => setData("sts_karyawan", e.target.value)}
                                        placeholder="Aktif / Nonaktif"
                                        className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Alamat</label>
                                <textarea
                                    rows="3"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-y"
                                />
                            </div>

                            {/* Keterangan */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="3"
                                    value={data.ket_karyawan}
                                    onChange={(e) => setData("ket_karyawan", e.target.value)}
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
                                        reset();
                                        setSelectedKaryawan(null);
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
