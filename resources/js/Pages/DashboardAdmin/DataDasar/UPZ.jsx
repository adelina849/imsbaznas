import { useState, useEffect } from "react";
import { useForm, usePage, Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ChevronDown, Plus, X, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function UPZ() {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showInfo, setShowInfo] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const { dataUpz, user, auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUpz, setSelectedUpz] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Form Tambah
    const { data, setData, post, reset, errors } = useForm({
        kode_kantor: "",
        nama_kantor: "",
        pemilik: "",
        kota: "",
        alamat: "",
        tlp: "",
        sejarah: "",
        ket_kantor: "",
    });

    // Form Edit
    const editForm = useForm({
        kode_kantor: "",
        nama_kantor: "",
        pemilik: "",
        kota: "",
        alamat: "",
        tlp: "",
        sejarah: "",
        ket_kantor: "",
    });

    // === HANDLE TAMBAH ===
    const handleAdd = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.kode_kantor) newErrors.kode_kantor = "Kode Kantor wajib diisi.";
        if (!data.nama_kantor) newErrors.nama_kantor = "Nama Kantor wajib diisi.";
        if (!data.pemilik) newErrors.pemilik = "Pemilik wajib diisi.";
        if (!data.kota) newErrors.kota = "Nama kota wajib diisi.";
        if (!data.alamat) newErrors.alamat = "Alamat wajib diisi.";
        if (!data.tlp) newErrors.tlp = "Nomor Telepon wajib diisi.";

        setFieldErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        post(route("upz.store"), {
            onSuccess: () => {
                reset();
                setShowAddModal(false);
                setAlert({ type: "success", message: "upz berhasil ditambahkan." });
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
        editForm.put(route("upz.update", selectedUpz.id_kantor), {
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedUpz(null);
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
            router.delete(route("upz.destroy", id), {
                onSuccess: () => {
                    setAlert({
                        type: "success",
                        message: "UPZ berhasil dihapus.",
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
    const filteredUpz = dataUpz.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.nama_kantor.toLowerCase().includes(search) ||
            item.kode_kantor.toLowerCase().includes(search) ||
            (item.ket_kantor || "").toLowerCase().includes(search)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUpz.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUpz.length / itemsPerPage);

    return (
        <AdminLayout header="UPZ">
            <Head title="UPZ" />

            {alert.type === "success" && alert.message && (
            <div
                className="mb-4 p-3 rounded-md text-sm font-medium bg-green-100 text-green-700 border border-green-300"
            >
                {alert.message}
            </div>
            )}

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

            <div className="bg-white shadow-md rounded-xl p-4 transition-all duration-300">
                {/* HEADER + SEARCH */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Data UPZ IMS POS System
                    </h2>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari UPZ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-amber-500"
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
                                }`}
                        >
                            <Plus className="w-4 h-4" /> Tambah
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-inner">
                {filteredUpz.length > 0 ? (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                {["No", "Kode UPZ", "Nama", "Informasi Kantor", "Aksi"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-semibold text-xs uppercase text-center">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item, index) => (
                                <tr key={item.id_kantor} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3">{item.kode_kantor}</td>
                                    <td className="px-4 py-3">{item.nama_kantor}</td>
                                    <td className="px-3 py-3 leading-relaxed">
                                        <p><b>Nama Pemilik:</b> {item.pemilik}</p>
                                        <p><b>Kota:</b> {item.kota}</p>
                                        <p><b>Alamat:</b> {item.alamat}</p>
                                        <p><b>No Telp:</b> {item.tlp}</p>
                                        <p><b>Sejarah:</b> {item.sejarah}</p>
                                        <p><b>Keterangan:</b> {item.ket_kantor}</p>
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

                                        {item.kode_kantor !== user.kode_kantor && (
                                            <button
                                                onClick={() => handleDelete(item.id_kantor)}
                                                className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-xs font-medium"
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
                        <p className="text-sm text-gray-500">Belum ada data Jabatan.</p>
                        </>
                    )}
                    </div>
                )}
                </div>
            </div>

            {/* PAGINATION */}
            {filteredUpz.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 text-center sm:text-left">
                        Menampilkan {Math.min(indexOfFirstItem + 1, filteredUpz.length)} - {" "}{Math.min(indexOfLastItem, filteredUpz.length)} dari {filteredUpz.length} data
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

            {/* === MODAL TAMBAH & EDIT UPZ === */}
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
                        <form 
                            onSubmit={showAddModal ? handleAdd : handleEdit}
                            className="px-6 py-5 space-y-4"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Kode UPZ */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kode UPZ</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.kode_kantor : editForm.data.kode_kantor}
                                        disabled={showEditModal}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("kode_kantor", e.target.value)
                                                : editForm.setData("kode_kantor", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, kode_kantor: "Kode KantorS wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.kode_kantor;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan kode unik UPZ"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.kode_kantor ? "border-red-500 bg-red-50" : ""
                                        }`} 
                                    />
                                    {showAddModal ? (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kode harus unik dan tidak dapat diubah setelah disimpan.
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500 mt-1">Kode tidak dapat diubah.</p>
                                    )}
                                    {fieldErrors.kode_kantor && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.kode_kantor}</p>
                                    )}
                                </div>

                                {/* Nama UPZ */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama UPZ</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.nama_kantor : editForm.data.nama_kantor}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("nama_kantor", e.target.value)
                                                : editForm.setData("nama_kantor", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, nama_kantor: "Nama Kantor wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.nama_kantor;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan nama UPZ"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.nama_kantor ? "border-red-500 bg-red-50" : ""
                                        }`}                                    
                                    />
                                    {fieldErrors.nama_kantor && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.nama_kantor}</p>
                                    )}
                                </div>

                                {/* Nama Pemilik */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nama Pemilik</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.pemilik : editForm.data.pemilik}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("pemilik", e.target.value)
                                                : editForm.setData("pemilik", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, pemilik: "Pemilik wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.pemilik;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan nama pemilik"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.pemilik ? "border-red-500 bg-red-50" : ""
                                        }`}   
                                    />
                                    {fieldErrors.pemilik && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.pemilik}</p>
                                    )}
                                </div>

                                {/* Kota */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kota Lokasi UPZ</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.kota : editForm.data.kota}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("kota", e.target.value)
                                                : editForm.setData("kota", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, kota: "Kota wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.kota;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="Masukkan nama kota"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.kota ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                    {fieldErrors.kota && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.kota}</p>
                                    )}
                                </div>
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                                <textarea
                                    rows="3"
                                        value={showAddModal ? data.alamat : editForm.data.alamat}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("alamat", e.target.value)
                                                : editForm.setData("alamat", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, alamat: "Alamat wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.alamat;
                                                    return updated;
                                                });
                                            }
                                        }}
                                    placeholder="Masukkan alamat lengkap UPZ"
                                    className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                        fieldErrors.alamat ? "border-red-500 bg-red-50" : ""
                                    }`}
                                />
                                    {fieldErrors.alamat && (
                                        <p className="text-xs text-red-600 mt-1">{fieldErrors.alamat}</p>
                                    )}
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* No. Telepon */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">No. Telepon / HP</label>
                                    <input
                                        type="number"
                                        value={showAddModal ? data.tlp : editForm.data.tlp}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("tlp", e.target.value)
                                                : editForm.setData("tlp", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, tlp: "No telepon wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.tlp;
                                                    return updated;
                                                });
                                            }
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

                                {/* Keterangan */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Keterangan Kantor</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.ket_kantor : editForm.data.ket_kantor}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("ket_kantor", e.target.value)
                                                : editForm.setData("ket_kantor", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, ket_kantor: "Keterangan kantor wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.ket_kantor;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="keterangan"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.ket_kantor ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                        {fieldErrors.ket_kantor && (
                                            <p className="text-xs text-red-600 mt-1">{fieldErrors.ket_kantor}</p>
                                        )}
                                </div>
                            </div>

                                {/* Sejarah */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Sejarah kantor</label>
                                    <input
                                        type="text"
                                        value={showAddModal ? data.sejarah : editForm.data.sejarah}
                                        onChange={(e) => {
                                            showAddModal
                                                ? setData("sejarah", e.target.value)
                                                : editForm.setData("sejarah", e.target.value)
                                            if (e.target.value.trim() === "") {
                                                setFieldErrors((prev) => ({ ...prev, sejarah: "Sejarah wajib diisi." }));
                                            } else {
                                                setFieldErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.sejarah;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        placeholder="sejarah"
                                        className={`w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                                            fieldErrors.sejarah ? "border-red-500 bg-red-50" : ""
                                        }`}
                                    />
                                        {fieldErrors.sejarah && (
                                            <p className="text-xs text-red-600 mt-1">{fieldErrors.sejarah}</p>
                                        )}
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
