import { useState } from "react";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ChevronLeft, ChevronRight, Plus, X, Search } from "lucide-react";

export default function Jabatan() {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const { dataJabatan, dataDepartemen } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedJabatan, setSelectedJabatan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // === FORM TAMBAH ===
    const { data, setData, post, reset, errors } = useForm({
        id_dept: "",
        nama_dept: "",
        kode_jabatan: "",
        nama_jabatan: "",
        ket_jabatan: "",
        hirarki: "",
        //kode_kantor: "",
    });

    // === FORM EDIT ===
    const editForm = useForm({
        id_dept: "",
        nama_dept: "",
        kode_jabatan: "",
        nama_jabatan: "",
        ket_jabatan: "",
        hirarki: "",
        //kode_kantor: "",
    });

    // === HANDLE TAMBAH ===
    const handleAdd = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.id_dept) newErrors.id_dept = "Departemen harus dipilih.";
        if (!data.kode_jabatan) newErrors.kode_jabatan = "Kode Jabatan wajib diisi.";
        if (!data.nama_jabatan) newErrors.nama_jabatan = "Nama Jabatan wajib diisi.";
        if (!data.ket_jabatan) newErrors.ket_jabatan = "Keterangan wajib diisi.";
        if (!data.hirarki) newErrors.hirarki = "Hirarki wajib diisi.";

        setFieldErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        post(route("jabatan.store"), {
            onSuccess: () => {
                reset();
                setShowAddModal(false);
                setAlert({ type: "success", message: "Jabatan berhasil ditambahkan." });
                setFieldErrors({});  
            },
            onError: () => {
                setAlert({ type: "error", message: "Terjadi kesalahan, periksa kembali input anda." });
            },
        });
    };

    // === HANDLE EDIT ===
    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route("jabatan.update", selectedJabatan.id_jabatan), {
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedJabatan(null);
            setAlert({ type: "success", message: "Perubahan berhasil disimpan." });
            setFieldErrors({});
            },
            onError: () => {
                setAlert({ type: "error", message: "Gagal menyimpan perubahan, periksa kembali input." });
            },
        });
    };

    // === HANDLE DELETE ===
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("jabatan.destroy", id), {
                onSuccess: () => {
                    setAlert({
                        type: "success",
                        message: "Jabatan berhasil dihapus.",
                    });
                },
                onError: () => {
                    setAlert({
                        type: "error",
                        message: "Gagal menghapus data, coba lagi nanti.",
                    });
                },
            });
        }
    };

    // === SEARCH FILTER ===
    const filteredJabatan = dataJabatan.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.kode_jabatan.toLowerCase().includes(search) ||
            item.nama_jabatan.toLowerCase().includes(search) ||
            item.ket_jabatan?.toLowerCase().includes(search) ||
            item.hirarki?.toString().includes(search)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredJabatan.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredJabatan.length / itemsPerPage);

    return (
        <AdminLayout header="Jabatan">
            <Head title="Jabatan" />

            {alert.type === "success" && alert.message && (
            <div
                className="mb-4 p-3 rounded-md text-sm font-medium bg-green-100 text-green-700 border border-green-300"
            >
                {alert.message}
            </div>
            )}

            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300">
                {/* === HEADER & SEARCH === */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Data Jabatan IMS POS System
                    </h2>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari jabatan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-amber-500"
                            />
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
                        >
                            <Plus className="w-4 h-4" /> Tambah
                        </button>
                    </div>
                </div>

                {/* === TABLE === */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-inner">
                {filteredJabatan.length > 0 ? (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                            {["No", "Kode Jabatan", "Nama Jabatan", "Keterangan", "Hirarki", "Kode UPZ", "Aksi"].map((h) => (
                                <th key={h} className="px-4 py-3 font-semibold text-xs uppercase text-center">{h}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                            <tr key={item.id_jabatan} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                                <td className="px-4 py-3">{item.kode_jabatan}</td>
                                <td className="px-4 py-3">{item.nama_jabatan}</td>
                                <td className="px-4 py-3">{item.ket_jabatan}</td>
                                <td className="px-4 py-3 text-center">{item.hirarki}</td>
                                <td className="px-4 py-3 text-center">{item.kode_kantor}</td>
                                <td className="px-4 py-3 text-center space-x-2">
                                <button
                                    onClick={() => {
                                    setSelectedJabatan(item);
                                    editForm.setData(item);
                                    setShowEditModal(true);
                                    }}
                                    className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id_jabatan)}
                                    className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-xs font-medium"
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

            {/* === PAGINATION === */}
            {filteredJabatan.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                        Menampilkan {Math.min(indexOfFirstItem + 1, filteredJabatan.length)} - {" "}{Math.min(indexOfLastItem, filteredJabatan.length)} dari {filteredJabatan.length} data
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
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl overflow-y-auto">
                        
                        {/* === ALERT ERROR (khusus di atas modal) === */}
                        {alert.type === "error" && alert.message && (
                            <div
                            className="mb-4 p-3 rounded-md text-sm font-medium bg-red-100 text-red-700 border border-red-300"
                            >
                            {alert.message}
                            </div>
                        )}

                        {/* === Header === */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Jabatan" : "Edit Jabatan"}
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

                        {/* === Form === */}
                            <form
                                onSubmit={showAddModal ? handleAdd : handleEdit}
                                className="px-6 py-5 space-y-4"
                            >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               
                                {/* Departemen */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Departemen</label>
                                    <select
                                        value={showAddModal ? data.id_dept : editForm.data.id_dept}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Update state form
                                            if (showAddModal) setData("id_dept", value);
                                            else editForm.setData("id_dept", value);

                                            // === VALIDASI ===
                                            if (value.trim() === "") {
                                                setFieldErrors((prev) => ({
                                                ...prev,
                                                id_dept: "Departemen harus dipilih.",
                                                }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                const updated = { ...prev };
                                                delete updated.id_dept;
                                                return updated;
                                                });
                                            }
                                        }}
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                        fieldErrors.id_dept ? "border-red-500 bg-red-50" : ""
                                        }`}
                                        disabled={showEditModal}
                                    >
                                        <option value="">-- Pilih Departemen --</option>
                                        {dataDepartemen.map((d) => (
                                        <option key={d.id_dept} value={d.id_dept}>
                                            {d.nama_dept}
                                        </option>
                                        ))}
                                    </select>

                                    {fieldErrors.id_dept && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.id_dept}</p>
                                    )}
                                </div>

                                {/* Kode Jabatan */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kode Jabatan</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.kode_jabatan : editForm.data.kode_jabatan}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("kode_jabatan", e.target.value)
                                                : editForm.setData("kode_jabatan", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, kode_jabatan: "Kode Jabatan wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.kode_jabatan;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan kode jabatan"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.kode_jabatan ? "border-red-500 bg-red-50" : ""
                                        }`}                                          
                                        readOnly={showEditModal}
                                    />
                                    {fieldErrors.kode_jabatan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.kode_jabatan}</p>
                                    )}
                                </div>
                            </div>

                            {/* Nama Jabatan */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nama Jabatan
                                </label>
                                <input
                                    type="text"
                                    value={showAddModal ? data.nama_jabatan : editForm.data.nama_jabatan}
                                    onChange={(e) =>{
                                        showAddModal
                                            ? setData("nama_jabatan", e.target.value)
                                            : editForm.setData("nama_jabatan", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, nama_jabatan: "Kode Jabatan wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.nama_jabatan;
                                                    return updated;
                                                });
                                            }
                                    }}
                                    placeholder="Masukkan nama jabatan"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.nama_jabatan ? "border-red-500 bg-red-50" : ""
                                        }`}                                  
                                        />
                                    {fieldErrors.nama_jabatan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.nama_jabatan}</p>
                                    )}
                            </div>

                            {/* Keterangan */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="3"
                                    value={showAddModal ? data.ket_jabatan : editForm.data.ket_jabatan}
                                    onChange={(e) => {
                                        showAddModal
                                            ? setData("ket_jabatan", e.target.value)
                                            : editForm.setData("ket_jabatan", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, ket_jabatan: "Kode Jabatan wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.ket_jabatan;
                                                    return updated;
                                                });
                                            }
                                    }}
                                    placeholder="Tuliskan keterangan jabatan"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.ket_jabatan ? "border-red-500 bg-red-50" : ""
                                        }`}                                  
                                        ></textarea>
                                    {fieldErrors.ket_jabatan && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.ket_jabatan}</p>
                                    )}
                            </div>

                            {/* Hirarki */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Hirarki</label>
                                <input
                                    type="number"
                                    value={showAddModal ? data.hirarki : editForm.data.hirarki}
                                    onChange={(e) => {
                                        showAddModal
                                            ? setData("hirarki", e.target.value)
                                            : editForm.setData("hirarki", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, hirarki: "Kode Jabatan wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.hirarki;
                                                    return updated;
                                                });
                                            }
                                    }}
                                    placeholder="Masukkan hirarki jabatan"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.hirarki ? "border-red-500 bg-red-50" : ""
                                        }`}                                  />
                                    {fieldErrors.hirarki && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.hirarki}</p>
                                    )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        setSelectedJabatan(null);
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
