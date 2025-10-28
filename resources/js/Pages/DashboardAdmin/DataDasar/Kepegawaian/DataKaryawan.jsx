import { useState, useEffect } from "react";
import { useForm, usePage, Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Karyawan() {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const { dataUPZ, dataKaryawan, auth } = usePage().props;

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // === FORM TAMBAH ===
    const { data, setData, post, reset, errors } = useForm({
        id_kantor: "",
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
        isDokter: "",
        kode_kantor: "",
    });

    // === FORM EDIT ===
    const editForm = useForm({
        id_karyawan: "",
        id_kantor: "",
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
        isDokter: "",
        kode_kantor: "",
    });

    // === HANDLE TAMBAH ===
    const handleAdd = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.id_kantor) newErrors.id_kantor = "UPZ wajib dipilih.";
        if (!data.no_karyawan) newErrors.no_karyawan = "No karyawan wajib diisi.";
        if (!data.nik_karyawan) newErrors.nik_karyawan = "NIK wajib diisi.";
        if (!data.nama_karyawan) newErrors.nama_karyawan = "Nama wajib diisi.";
        if (!data.email) newErrors.email = "Email wajib diisi.";
        if (!data.tlp) newErrors.tlp = "Tanggal diterima wajib diisi.";
        if (!data.pnd) newErrors.pnd = "Pendidikan wajib diisi.";
        if (!data.kelamin) newErrors.kelamin = "Jenis kelamin wajib dipilih.";
        if (!data.tmp_lahir) newErrors.tmp_lahir = "Tempat lahir wajib diisi.";
        if (!data.tgl_lahir) newErrors.tgl_lahir = "Tanggal lahir wajib diisi.";
        if (!data.sts_nikah) newErrors.sts_nikah = "Status nikah wajib diisi.";
        if (!data.tgl_diterima) newErrors.tgl_diterima = "Tanggal diterima wajib diisi.";
        if (!data.isDokter) newErrors.isDokter = "Status karyawan wajib diisi.";
        if (!data.alamat) newErrors.alamat = "Alamat wajib diisi.";
        if (!data.ket_karyawan) newErrors.ket_karyawan = "Keterangan wajib diisi.";

        setFieldErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        post(route("karyawan.store"), {
            onSuccess: () => {
                reset();
                setShowAddModal(false);
                setAlert({ type: "success", message: "Karyawan berhasil ditambahkan." });
                setFieldErrors({});
                setTimeout(() => setAlert({ type: "", message: "" }), 4000);
            },
            onError: () => {
                setAlert({ type: "error", message: "Gagal menyimpan data, periksa input Anda." });
                setTimeout(() => setAlert({ type: "", message: "" }), 4000);
            },
        });
    };

    // === HANDLE EDIT ===
    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route("karyawan.update", selectedKaryawan.id_karyawan), {
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedKaryawan(null);
                setAlert({ type: "success", message: "Perubahan berhasil disimpan." });
                setFieldErrors({});
                setTimeout(() => setAlert({ type: "", message: "" }), 4000);
            },
            onError: () => {
                setAlert({ type: "error", message: "Gagal menyimpan perubahan, periksa kembali input." });
                setTimeout(() => setAlert({ type: "", message: "" }), 4000);
            },
        });
    };

    // === HANDLE DELETE ===
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data karyawan ini?")) {
            router.delete(route("karyawan.destroy", id), {
                onSuccess: () => {
                    setAlert({
                        type: "success",
                        message: "Data karyawan berhasil dihapus.",
                    });
                    setTimeout(() => setAlert({ type: "", message: "" }), 4000);
                },
                onError: () => {
                    setAlert({
                        type: "error",
                        message: "Gagal menghapus data, coba lagi nanti.",
                    });
                    setTimeout(() => setAlert({ type: "", message: "" }), 4000);
                },
            });
        }
    };

    // === SEARCH FILTER ===
    const filteredKaryawan = dataKaryawan.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            (item.nama_karyawan || "").toLowerCase().includes(search) ||
            (item.nik_karyawan || "").toLowerCase().includes(search) ||
            (item.no_karyawan || "").toLowerCase().includes(search) ||
            (item.email || "").toLowerCase().includes(search) ||
            (item.tlp || "").toLowerCase().includes(search)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredKaryawan.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);

    return (
        <AdminLayout header="Data Karyawan">
            <Head title="Data Karyawan" />

            {alert.type === "success" && alert.message && (
            <div
                className="mb-4 p-3 rounded-md text-sm font-medium bg-green-100 text-green-700 border border-green-300"
            >
                {alert.message}
            </div>
            )}

            <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 transition-all duration-300">
                {/* HEADER + SEARCH */}
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
                            disabled={auth.user.kode_kantor !== "ADMNPST"} // ✅ disable jika bukan ADMNPST
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow
                                ${
                                    auth.user.kode_kantor === "ADMNPST"
                                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}                        >
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
                                        <p><b>Status:</b> {item.isDokter}</p>
                                        <p><b>Nikah:</b> {item.sts_nikah}</p>
                                        <p><b>Diterima:</b> {item.tgl_diterima}</p>
                                        <p><b>Keterangan:</b> {item.ket_karyawan}</p>
                                    </td>
                                    <td className="px-3 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedKaryawan(item);
                                                editForm.setData(item);
                                                setShowEditModal(true);
                                            }}
                                            className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs sm:text-sm font-medium transition-all"
                                        >
                                            Edit
                                        </button>

                                        {/* Hapus hanya muncul jika kode_kantor item berbeda dengan user login */}
                                        {item.kode_kantor !== auth.user.kode_kantor && (
                                            <button
                                                onClick={() => handleDelete(item.id_karyawan, item.nama_karyawan)}
                                                className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-xs sm:text-sm font-medium transition-all"
                                            >
                                                Hapus
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (
                    <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    {/* Empty States */}
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
                        <p className="text-sm text-gray-500">Belum ada data UPZ.</p>
                        </>
                    )}
                    </div>
                )}
                </div>
            </div>
            
            {/* PAGINATION */}
            {filteredKaryawan.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 text-center sm:text-left">
                        Menampilkan {Math.min(indexOfFirstItem + 1, filteredKaryawan.length)} - {" "}{Math.min(indexOfLastItem, filteredKaryawan.length)} dari {filteredKaryawan.length} data
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
                
            {/* === MODAL TAMBAH & EDIT === */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto">

                        {/* === ALERT ERROR === */}
                        {alert.type === "error" && alert.message && (
                            <div className="mb-4 p-3 rounded-md text-sm font-medium bg-red-100 text-red-700 border border-red-300">
                                {alert.message}
                            </div>
                        )}

                        {/* === HEADER === */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Karyawan" : "Edit Karyawan"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    setSelectedKaryawan(null);
                                }}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* === FORM === */}
                        <form
                            onSubmit={showAddModal ? handleAdd : handleEdit}
                            className="px-6 py-5 space-y-4"
                        >
                            {/* GRID INPUT */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                {/* === UPZ === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">UPZ</label>
                                    <select
                                        value={showAddModal ? data.id_kantor : editForm.data.id_kantor}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Update state form
                                            if (showAddModal) setData("id_kantor", value);
                                            else editForm.setData("id_kantor", value);

                                            // === VALIDASI ===
                                            if (value.trim() === "") {
                                                setFieldErrors((prev) => ({
                                                ...prev,
                                                id_kantor: "UPZ harus dipilih.",
                                                }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                const updated = { ...prev };
                                                delete updated.id_kantor;
                                                return updated;
                                                });
                                            }
                                        }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                        fieldErrors.id_kantor ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    >
                                        <option value="">-- Pilih UPZ --</option>
                                        {dataUPZ?.map((j) => (
                                            <option key={j.id_kantor} value={j.id_kantor}>
                                                {j.nama_kantor}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    {fieldErrors.id_dept && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.id_dept}</p>
                                    )}
                                </div>

                                {/* === No Karyawan === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No Karyawan</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.no_karyawan : editForm.data.no_karyawan}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("no_karyawan", e.target.value)
                                                : editForm.setData("no_karyawan", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, no_karyawan: "No karyawan wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.no_karyawan;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan No Karyawan"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.no_karyawan ? "border-red-500 bg-red-50" : ""
                                        }`}                                           
                                    />
                                    {fieldErrors.no_karyawan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.no_karyawan}</p>
                                    )}
                                </div>

                                {/* === NIK === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">NIK</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.nik_karyawan : editForm.data.nik_karyawan}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("nik_karyawan", e.target.value)
                                                : editForm.setData("nik_karyawan", e.target.value);
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, nik_karyawan: "NIK wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.nik_karyawan;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan NIK"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.nik_karyawan ? "border-red-500 bg-red-50" : ""
                                        }`}                                          
                                    />
                                    {fieldErrors.nik_karyawan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.nik_karyawan}</p>
                                    )}
                                </div>

                                {/* === Nama === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.nama_karyawan : editForm.data.nama_karyawan}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("nama_karyawan", e.target.value)
                                                : editForm.setData("nama_karyawan", e.target.value);
                                        }}
                                        placeholder="Nama lengkap"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.nama_karyawan ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                    {fieldErrors.nama_karyawan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.nama_karyawan}</p>
                                    )}
                                </div>

                                {/* === Email === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={showAddModal ? data.email : editForm.data.email}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("email", e.target.value)
                                                : editForm.setData("email", e.target.value);
                                        }}
                                        placeholder="Masukkan Email"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.email ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                    {fieldErrors.email && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
                                    )}
                                </div>

                                {/* === Telepon === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Telepon</label>
                                    <input
                                        type="number"
                                        value={showAddModal ? data.tlp : editForm.data.tlp}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("tlp", e.target.value)
                                                : editForm.setData("tlp", e.target.value);
                                        }}
                                        placeholder="08xxxxxxxxxx"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.tlp ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                    {fieldErrors.tlp && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.tlp}</p>
                                    )}
                                </div>

                                {/* === Pendidikan === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Pendidikan</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.pnd : editForm.data.pnd}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("pnd", e.target.value)
                                                : editForm.setData("pnd", e.target.value);
                                        }}
                                        placeholder="Contoh: S1 Ekonomi"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.pnd ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                    {fieldErrors.pnd && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.pnd}</p>
                                    )}
                                </div>

                                {/* === Jenis Kelamin === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                    <select
                                        value={showAddModal ? data.kelamin : editForm.data.kelamin}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Update state form
                                            if (showAddModal) setData("kelamin", value);
                                            else editForm.setData("kelamin", value);

                                            // === VALIDASI ===
                                            if (value.trim() === "") {
                                                setFieldErrors((prev) => ({
                                                ...prev,
                                                kelamin: "Jenis kelamin harus dipilih.",
                                                }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                const updated = { ...prev };
                                                delete updated.kelamin;
                                                return updated;
                                                });
                                            }
                                        }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                        fieldErrors.kelamin ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    >
                                        <option value="">Pilih</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>

                                    {fieldErrors.kelamin && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.kelamin}</p>
                                    )}
                                </div>

                                {/* === Tempat Lahir === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tempat Lahir</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.tmp_lahir : editForm.data.tmp_lahir}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("tmp_lahir", e.target.value)
                                                : editForm.setData("tmp_lahir", e.target.value);
                                        }}
                                        placeholder="Masukkan Tempat Lahir"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.tmp_lahir ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                    {fieldErrors.tmp_lahir && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.tmp_lahir}</p>
                                    )}
                                </div>

                                {/* === Tanggal Lahir === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                    <input
                                        type="date"
                                        value={showAddModal ? data.tgl_lahir : editForm.data.tgl_lahir}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("tgl_lahir", e.target.value)
                                                : editForm.setData("tgl_lahir", e.target.value);
                                        }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.tgl_lahir ? "border-red-500 bg-red-50" : ""
                                        }`}                                       />
                                    {fieldErrors.tgl_lahir && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.tgl_lahir}</p>
                                    )}
                                </div>

                                {/* === Status Nikah === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status Pernikahan</label>
                                    <select
                                        value={showAddModal ? data.sts_nikah : editForm.data.sts_nikah}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Update state form
                                            if (showAddModal) setData("sts_nikah", value);
                                            else editForm.setData("sts_nikah", value);

                                            // === VALIDASI ===
                                            if (value.trim() === "") {
                                                setFieldErrors((prev) => ({
                                                ...prev,
                                                sts_nikah: "Status Pernikahan harus dipilih.",
                                                }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                const updated = { ...prev };
                                                delete updated.sts_nikah;
                                                return updated;
                                                });
                                            }
                                        }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                        fieldErrors.sts_nikah ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Belum Menikah">Belum Menikah</option>
                                        <option value="Menikah">Menikah</option>
                                        <option value="Cerai">Cerai</option>
                                    </select>

                                    {fieldErrors.sts_nikah && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.sts_nikah}</p>
                                    )}

                                </div>

                                {/* === Tanggal Diterima === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tanggal Diterima</label>
                                    <input
                                        type="date"
                                        value={showAddModal ? data.tgl_diterima : editForm.data.tgl_diterima}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("tgl_diterima", e.target.value)
                                                : editForm.setData("tgl_diterima", e.target.value);
                                        }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.tgl_diterima ? "border-red-500 bg-red-50" : ""
                                        }`}                                       />
                                    {fieldErrors.tgl_diterima && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.tgl_diterima}</p>
                                    )}
                                </div>

                                {/* === Status Karyawan === */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status Karyawan</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.isDokter : editForm.data.isDokter}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("isDokter", e.target.value)
                                                : editForm.setData("isDokter", e.target.value);
                                        }}
                                        placeholder="Aktif / Nonaktif"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.sts_nikah ? "border-red-500 bg-red-50" : ""
                                        }`}                                       />
                                    {fieldErrors.sts_nikah && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.sts_nikah}</p>
                                    )}
                                </div>
                            </div>

                            {/* === Alamat === */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Alamat</label>
                                <textarea
                                    rows="3"
                                    value={showAddModal ? data.alamat : editForm.data.alamat}
                                    onChange={(e) => {
                                        showAddModal
                                            ? setData("alamat", e.target.value)
                                            : editForm.setData("alamat", e.target.value);
                                    }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.alamat ? "border-red-500 bg-red-50" : ""
                                        }`}                                   />
                                    {fieldErrors.alamat && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.alamat}</p>
                                    )}
                            </div>

                            {/* === Keterangan === */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="3"
                                    value={showAddModal ? data.ket_karyawan : editForm.data.ket_karyawan}
                                    onChange={(e) => {
                                        showAddModal
                                            ? setData("ket_karyawan", e.target.value)
                                            : editForm.setData("ket_karyawan", e.target.value);
                                    }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.ket_karyawan ? "border-red-500 bg-red-50" : ""
                                        }`}                                   />
                                    {fieldErrors.ket_karyawan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.ket_karyawan}</p>
                                    )}
                            </div>

                            {/* === TOMBOL AKSI === */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        setSelectedKaryawan(null);
                                    }}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white shadow ${
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
