import { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, X, Search } from "lucide-react";

export default function PemberianAkun() {
    const { props } = usePage();
    const flash = props.flash || {};

    // Gunakan state lokal untuk dataAkun supaya bisa diupdate setelah beri akun
    const [dataAkunState, setDataAkun] = useState(props.dataAkun || []);
    const [alert, setAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedAkun, setSelectedAkun] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, setData, post, put, processing, reset } = useForm({
        id_karyawan: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    // Flash alert handler
    useEffect(() => {
        if (flash.success) setAlert({ type: "success", message: flash.success });
        if (flash.error) setAlert({ type: "error", message: flash.error });
    }, [flash]);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing && selectedAkun.user?.id) {
            put(route("pemberian-akun.update", selectedAkun.user.id), {
                onSuccess: () => {
                    setAlert({ type: "success", message: "Akun berhasil diperbarui!" });
                    reset();
                    setShowModal(false);
                    setDataAkun(prev =>
                        prev.map(item =>
                            item.id_karyawan === selectedAkun.id_karyawan
                                ? { ...item, user: { ...item.user, ...data } }
                                : item
                        )
                    );
                },
                onError: (errors) => {
                    setAlert({ type: "error", message: Object.values(errors)[0] });
                },
            });
        } else {
            post(route("pemberian-akun.store"), {
                onSuccess: () => {
                    setAlert({ type: "success", message: "Akun berhasil dibuat!" });
                    reset();
                    setShowModal(false);
                    setDataAkun(prev =>
                        prev.map(item =>
                            item.id_karyawan === selectedAkun.id_karyawan
                                ? { ...item, user: { ...data } }
                                : item
                        )
                    );
                },
                onError: (errors) => {
                    setAlert({ type: "error", message: Object.values(errors)[0] });
                },
            });
        }
    };

    const filteredAkun = dataAkunState.filter((item) =>
        [item.nama_karyawan, item.nik_karyawan, item.no_karyawan]
            .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <AdminLayout header="Pemberian Akun">
            <Head title="Pemberian Akun" />

            {/* 🔔 Alert */}
            {alert && (
                <div
                    className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white font-medium z-50 transition-all duration-300 ${
                        alert.type === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {alert.message}
                </div>
            )}

            <div className="bg-white shadow-md rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h2 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                        Pemberian Akun IMS POS System
                    </h2>
                    <div className="flex items-center w-full sm:w-72 relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari Karyawan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
                    {filteredAkun.length > 0 ? (
                        <table className="min-w-full border-collapse text-sm text-left table-auto">
                            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-xs uppercase text-center">No</th>
                                    <th className="px-4 py-3 font-semibold text-xs uppercase">Biodata</th>
                                    <th className="px-4 py-3 font-semibold text-xs uppercase">Username</th>
                                    <th className="px-4 py-3 font-semibold text-xs uppercase">Kode Kantor</th>
                                    <th className="px-4 py-3 font-semibold text-xs uppercase text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAkun.map((item, index) => (
                                    <tr key={item.id_karyawan} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-center">{index + 1}</td>
                                        {/* Biodata */}
                                        <td className="px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                            <p><b>NO:</b> {item.no_karyawan}</p>
                                            <p><b>NIK:</b> {item.nik_karyawan}</p>
                                            <p><b>NAMA:</b> {item.nama_karyawan}</p>
                                        </td>
                                        {/* Username */}
                                        <td className="px-4 py-3 text-left">
                                            {item.user?.username || "-"}
                                        </td>
                                        {/* Kode Kantor */}
                                        <td className="px-4 py-3 text-center font-medium text-gray-700">
                                            {item.kode_kantor || "-"}
                                        </td>
                                        {/* Aksi */}
                                        <td className="px-4 py-3 text-center">
                                            {item.user ? (
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setSelectedAkun(item);
                                                        setData({
                                                            id_karyawan: item.id_karyawan,
                                                            username: item.user.username,
                                                            password: "",
                                                            password_confirmation: "",
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="px-3 py-1.5 text-sm font-semibold text-yellow-700 bg-yellow-200 hover:bg-yellow-300 rounded-lg shadow-sm transition-all duration-200 hover:scale-105"
                                                >
                                                    Edit Akun
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setSelectedAkun(item);
                                                        setData({
                                                            id_karyawan: item.id_karyawan,
                                                            username: "",
                                                            password: "",
                                                            password_confirmation: "",
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-lg shadow-sm transition-all duration-200 hover:scale-105"
                                                >
                                                    Beri Akun
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Data</h3>
                            <p className="text-sm text-gray-500">Semua karyawan sudah memiliki akun.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 🪟 Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg text-black overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-300">
                            <h3 className="text-lg font-semibold">
                                {isEditing ? "Edit Akun Karyawan" : "Buat Akun Karyawan"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-6 text-left space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-800">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData("username", e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-800">
                                    Password {isEditing && <span className="text-gray-400 text-xs">(biarkan kosong jika tidak diubah)</span>}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-800">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                                >
                                    Tutup
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
