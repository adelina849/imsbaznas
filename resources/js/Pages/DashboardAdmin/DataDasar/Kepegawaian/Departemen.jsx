import { useState } from "react";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Departemen() {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const { dataDepartemen } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDepartemen, setSelectedDepartemen] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Form Tambah
    const { data, setData, post, reset, errors } = useForm({
        kode_dept: "",
        nama_dept: "",
        ket_dept: "",
        hirarki: "",
        kode_kantor: "",
    });

    // Form Edit
    const editForm = useForm({
        kode_dept: "",
        nama_dept: "",
        ket_dept: "",
        hirarki: "",
        kode_kantor: "",
    });

    // === HANDLE TAMBAH ===
    const handleAdd = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.kode_dept) newErrors.kode_dept = "Kode departemen wajib diisi.";
        if (!data.nama_dept) newErrors.nama_dept = "Nama departemen wajib diisi.";
        if (!data.ket_dept) newErrors.ket_dept = "Keterangan wajib diisi.";
        if (!data.hirarki) newErrors.hirarki = "Hirarki wajib diisi.";

        setFieldErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        post(route("departemen.store"), {
            onSuccess: () => {
                reset();
                setShowAddModal(false);
                setAlert({ type: "success", message: "Departemen berhasil ditambahkan." });
                setFieldErrors({});
                setTimeout(() => setAlert({ type: "", message: "" }), 4000);         
            },
            onError: () => {
                setAlert({ type: "error", message: "Terjadi kesalahan, periksa kembali input anda." });
                setTimeout(() => setAlert({ type: "", message: "" }), 4000);
            },
        });
    };

    // === HANDLE EDIT ===
    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route("departemen.update", selectedDepartemen.id_dept), {
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedDepartemen(null);
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
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("departemen.destroy", id), {
                onSuccess: () => {
                    setAlert({
                        type: "success",
                        message: "Departemen berhasil dihapus.",
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
    const filteredDepartemen = dataDepartemen.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.nama_dept.toLowerCase().includes(search) ||
            item.kode_dept.toLowerCase().includes(search) ||
            (item.ket_dept || "").toLowerCase().includes(search)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDepartemen.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDepartemen.length / itemsPerPage);

    return (
        <AdminLayout header="Departemen">
            <Head title="Departemen" />

            {alert.type === "success" && alert.message && (
            <div
                className="mb-4 p-3 rounded-md text-sm font-medium bg-green-100 text-green-700 border border-green-300"
            >
                {alert.message}
            </div>
            )}

            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300">
                {/* HEADER + SEARCH */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Data Departemen IMS POS System
                    </h2>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari departemen..."
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

                {/* TABLE */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-inner">
                {filteredDepartemen.length > 0 ? (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                {["No", "Kode", "Nama", "Keterangan", "Hirarki", "Kode UPZ", "Aksi"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-semibold text-xs uppercase text-center">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                                <tr key={item.id_dept} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3">{item.kode_dept}</td>
                                    <td className="px-4 py-3">{item.nama_dept}</td>
                                    <td className="px-4 py-3">{item.ket_dept}</td>
                                    <td className="px-4 py-3 text-center">{item.hirarki}</td>
                                    <td className="px-4 py-3 text-center">{item.kode_kantor}</td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedDepartemen(item);
                                                editForm.setData(item);
                                                setShowEditModal(true);
                                            }}
                                            className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-xs font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id_dept)}
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
                        <p className="text-sm text-gray-500">Belum ada data Jabatan.</p>
                        </>
                    )}
                    </div>
                )}
                </div>
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

            {/* === MODAL TAMBAH & EDIT DEPARTEMEN === */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-300 transform scale-100 animate-fadeIn">  
                        
                        {/* === ALERT ERROR (khusus di atas modal) === */}
                        {alert.type === "error" && alert.message && (
                            <div
                            className="mb-4 p-3 rounded-md text-sm font-medium bg-red-100 text-red-700 border border-red-300"
                            >
                            {alert.message}
                            </div>
                        )}

                        {/* === Header === */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {showAddModal ? "Tambah Departemen" : "Edit Departemen"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    setSelectedDepartemen(null);
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
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kode Departemen</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.kode_dept : editForm.data.kode_dept}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("kode_dept", e.target.value)
                                                : editForm.setData("kode_dept", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, kode_dept: "Kode departemen wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.kode_dept;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan kode departemen"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.kode_dept ? "border-red-500 bg-red-50" : ""
                                        }`}                                       
                                        //readOnly={showEditModal} // kode tidak bisa diubah saat edit
                                    />
                                    {fieldErrors.kode_dept && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.kode_dept}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Nama Departemen
                                    </label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.nama_dept : editForm.data.nama_dept}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("nama_dept", e.target.value)
                                                : editForm.setData("nama_dept", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, nama_dept: "Nama departemen wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.nama_dept;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan nama departemen"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.nama_dept ? "border-red-500 bg-red-50" : ""
                                        }`}                                    
                                    />
                                    {fieldErrors.nama_dept && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.nama_dept}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="4"
                                    value={showAddModal ? data.ket_dept : editForm.data.ket_dept}
                                    onChange={(e) => {
                                        showAddModal
                                            ? setData("ket_dept", e.target.value)
                                            : editForm.setData("ket_dept", e.target.value)
                                        if (e.target.value.trim() === "") {
                                            setFieldErrors((prev) => ({ ...prev, ket_dept: "Keterangan wajib diisi." }));
                                        } else {
                                            setFieldErrors((prev) => {
                                                const updated = { ...prev };
                                                delete updated.ket_dept;
                                                return updated;
                                            });
                                        }
                                    }}
                                    placeholder="Tulis keterangan tugas & wewenang departemen"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.ket_dept ? "border-red-500 bg-red-50" : ""
                                        }`}                                     
                                ></textarea>
                                    {fieldErrors.ket_dept && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.ket_dept}</p>
                                    )}
                            </div>

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
                                            setFieldErrors((prev) => ({ ...prev, hirarki: "Nama departemen wajib diisi." }));
                                        } else {
                                            setFieldErrors((prev) => {
                                                const updated = { ...prev };
                                                delete updated.hirarki;
                                                return updated;
                                            });
                                        }
                                    }}
                                    placeholder="Masukkan urutan/hirarki"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.hirarki ? "border-red-500 bg-red-50" : ""
                                        }`}                                     
                                />
                                    {fieldErrors.hirarki && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.hirarki}</p>
                                    )}
                            </div>


                            {/* Tombol Aksi */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        setSelectedDepartemen(null);
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
