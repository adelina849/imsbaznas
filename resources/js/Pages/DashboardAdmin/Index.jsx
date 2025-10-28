import React, { useState } from "react";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ChevronDown, Edit3, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";

export default function Dashboard({ kantor, pengaturan }) {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showInfo, setShowInfo] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // === FORM UPDATE PENGATURAN ===
    const [listPengaturan, setListPengaturan] = useState(pengaturan || []);
    const {} = useForm({
    id_pengaturan: "",
    nilai: "",
    kode_kantor: "",
    });

    const handlePengaturanChange = (id, value) => {
        setListPengaturan((prev) =>
            prev.map((item) =>
                item.id_pengaturan === id ? { ...item, nilai: value } : item
            )
        );
    };


    const handleUpdatePengaturan = (item) => {
    router.post(
        route("pengaturan.update"),
        {
        id_pengaturan: item.id_pengaturan,
        nilai: item.nilai,
        kode_kantor: item.kode_kantor,
        },
        {
        preserveScroll: true,
        onSuccess: () => {
            setAlert({
            type: "success",
            message: `✅ Pengaturan "${item.nama_pengaturan}" berhasil diperbarui.`,
            });

            // sembunyikan alert setelah 3 detik
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        },
        onError: (err) => {
            console.error("Error update pengaturan:", err);
            setAlert({
            type: "error",
            message: `❌ Gagal memperbarui "${item.nama_pengaturan}". Periksa input.`,
            });

            setTimeout(() => setAlert({ type: "", message: "" }), 4000);
        },
        }
    );
    };

    const dataChart = [
        { bulan: "Jan", transaksi: 120 },
        { bulan: "Feb", transaksi: 160 },
        { bulan: "Mar", transaksi: 140 },
        { bulan: "Apr", transaksi: 180 },
        { bulan: "Mei", transaksi: 220 },
        { bulan: "Jun", transaksi: 200 },
        { bulan: "Jul", transaksi: 250 },
        { bulan: "Agu", transaksi: 230 },
        { bulan: "Sep", transaksi: 270 },
        { bulan: "Okt", transaksi: 300 },
    ];

    return (
        <AdminLayout header="Dashboard">
            <Head title="Dashboard" />

            {alert.message && (
                <div
                    className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium shadow transition-all duration-300 ${
                        alert.type === "success"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                >
                    {alert.message}
                </div>
            )}
            
            <div className="space-y-6 sm:space-y-8">

                {/* === SECTION: MENU PENTING === */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 transition-all duration-300">
                    <div
                        className="flex flex-wrap justify-between items-center cursor-pointer select-none gap-2"
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700 leading-snug">
                            Menu - Menu dan Informasi Penting Seputar Sistem POS IMS Software
                        </h2>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                                showInfo ? "rotate-180" : ""
                            }`}
                        />
                    </div>

                    <div
                        className={`transition-all duration-700 ease-in-out overflow-hidden ${
                            showInfo ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                        }`}
                    >
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed break-words">
                            <li><b>Penjualan:</b> Transaksi → Penjualan</li>
                            <li><b>Bayar Piutang Transaksi:</b> Laporan → General → Transaksi → Klik Tombol Bayar</li>
                            <li><b>Bayar Piutang Awal:</b> Transaksi → Pemasukan → Pilih pelanggan</li>
                            <li><b>Purchase Order (PO):</b> Transaksi → Pembelian/Purchase → PO</li>
                            <li><b>Penerimaan Barang:</b> Transaksi → Pembelian → Penerimaan Produk</li>
                            <li><b>Bayar Hutang Ke Supplier:</b> Transaksi → Keuangan → Bayar Hutang</li>
                            <li><b>Mutasi IN / OUT:</b> Transaksi → Mutasi</li>
                            <li><b>Retur Pembelian / Penjualan:</b> Transaksi → Retur</li>
                            <li><b>Pemasukan & Pengeluaran:</b> Transaksi → Keuangan</li>
                        </ul>
                    </div>
                </div>

                {/* === SECTION: LOG AKTIVITAS === */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 transition-all duration-300">
                    <div
                        className="flex flex-wrap justify-between items-center cursor-pointer select-none gap-2"
                        onClick={() => setShowLogs(!showLogs)}
                    >
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700 leading-snug">
                            Log Aktivitas
                        </h2>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                                showLogs ? "rotate-180" : ""
                            }`}
                        />
                    </div>

                    <div
                        className={`transition-all duration-700 ease-in-out overflow-hidden ${
                            showLogs ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                        }`}
                    >
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed break-words">
                            <li>✅ Login berhasil pada 10 Oktober 2025 - 15:00</li>
                            <li>⚙️ Update data produk pada 10 Oktober 2025 - 15:15</li>
                            <li>🧾 Menambahkan transaksi baru pada 10 Oktober 2025 - 15:45</li>
                            <li>🔐 Logout pada 10 Oktober 2025 - 16:10</li>
                            <li>👤 User “Admin” mengubah profil perusahaan</li>
                        </ul>
                    </div>
                </div>

                {/* === PENGATURAN APLIKASI === */}
                <div className="bg-white shadow rounded-lg p-5 sm:p-6 mt-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                        Pengaturan Aplikasi
                    </h2>

                    {alert.message && (
                    <div
                        className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium shadow transition-all duration-300 ${
                        alert.type === "success"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                    >
                        {alert.message}
                    </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                            <thead className="bg-amber-500 text-white">
                                <tr>
                                    <th className="px-4 py-2 border-r border-amber-400">No</th>
                                    <th className="px-4 py-2 border-r border-amber-400">Pengaturan</th>
                                    <th className="px-4 py-2 border-r border-amber-400">Nilai</th>
                                    <th className="px-4 py-2 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {listPengaturan.map((row, index) => (
                                    <tr key={row.id_pengaturan} className="hover:bg-amber-50 transition-colors">
                                        <td className="px-4 py-2 border-r w-12 text-center font-medium">{index + 1}</td>
                                        <td className="px-4 py-2 border-r w-48 font-medium">{row.nama_pengaturan}</td>
                                        <td className="px-4 py-2 border-r">
                                            <input
                                                type="text"
                                                value={row.nilai || ""}
                                                onChange={(e) =>
                                                    handlePengaturanChange(row.id_pengaturan, e.target.value)
                                                }
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-gray-700"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleUpdatePengaturan(row)}
                                                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium px-3 py-1 rounded-md shadow transition-all"
                                                >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* === GRAFIK === */}
                <div className="bg-white shadow rounded-lg p-5 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                        Grafik Analisis Transaksi Bulanan
                    </h2>
                    <div className="h-56 sm:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataChart} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-40" />
                                <XAxis dataKey="bulan" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        fontSize: "0.85rem",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="transaksi"
                                    stroke="#F59E0B"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2, fill: "#F59E0B" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
