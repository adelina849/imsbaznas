import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ChevronDown, Edit3, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
    const [showInfo, setShowInfo] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedKantor, setSelectedKantor] = useState(null);

    const dataKantor = [
        {
            id_kantor: 1,
            kode_kantor: "YG1",
            nama_kantor: "IMS POS System",
            pemilik: "Mulyana Yusuf,ST.,MT",
            kota: "Cianjur",
            alamat:"Jl. Perintis Kemerdekaan No.42, Sirnagalih, Kec. Cilaku, Kabupaten Cianjur, Jawa Barat 43285",
            tlp: "085710867033",
            sejarah: "-",
            ket_kantor:"-",
        },
    ];

    const kantor = dataKantor[0];

    // Data grafik dummy
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

            {/* Section: Menu Penting */}
            <div className="bg-white shadow rounded-lg p-5 transition-all duration-300">
                <div
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <h2 className="text-lg font-semibold text-gray-700">
                        Menu - Menu Dan Informasi Penting Seputar System POS IMS Software
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
                        <li><b>Penjualan:</b> Transaksi → Penjualan</li>
                        <li><b>Bayar Piutang Transaksi:</b> Laporan → General → Transaksi → Klik Tombol Bayar</li>
                        <li><b>Bayar Piutang Awal:</b> Transaksi → Pemasukan → Pilih pelanggan yang membayar</li>
                        <li><b>Purchase Order (PO):</b> Transaksi → Pembelian/Purchase → PO</li>
                        <li><b>Penerimaan Barang:</b> Transaksi → Pembelian → Penerimaan Produk</li>
                        <li><b>Bayar Hutang Ke Supplier:</b> Transaksi → Keuangan → Bayar Hutang</li>
                        <li><b>Mutasi IN / OUT:</b> Transaksi → Mutasi</li>
                        <li><b>Retur Pembelian / Penjualan:</b> Transaksi → Retur</li>
                        <li><b>Pemasukan & Pengeluaran:</b> Transaksi → Keuangan</li>
                    </ul>
                </div>
            </div>

            {/* Section: Log Aktivitas */}
            <div className="bg-white shadow rounded-lg p-5 mt-6 transition-all duration-300">
                <div
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowLogs(!showLogs)}
                >
                    <h2 className="text-lg font-semibold text-gray-700">Log Aktivitas</h2>
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
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed">
                        <li>✅ Login berhasil pada 10 Oktober 2025 - 15:00</li>
                        <li>⚙️ Update data produk pada 10 Oktober 2025 - 15:15</li>
                        <li>🧾 Menambahkan transaksi baru pada 10 Oktober 2025 - 15:45</li>
                        <li>🔐 Logout pada 10 Oktober 2025 - 16:10</li>
                        <li>👤 User “Admin” mengubah profil perusahaan</li>
                    </ul>
                </div>
            </div>

            {/* Section: Profil Perusahaan */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-6">
                    Profil Perusahaan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6 shadow-lg flex flex-col justify-between transform hover:scale-[1.02] transition-all">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Ubah Data Kantor</h3>
                            <p className="text-sm opacity-90">
                                Perbarui informasi kantor seperti nama, alamat, dan kontak untuk menjaga data tetap akurat.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedKantor(kantor);
                                setShowEditModal(true);
                            }}
                            className="mt-4 inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                            <Edit3 className="w-4 h-4" />
                            Ubah Data
                        </button>
                    </div>

                    <div className="border rounded-lg p-6 bg-gray-50 text-gray-700 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Data Kantor Saat Ini
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p><b>Nama Kantor:</b> {kantor.nama_kantor}</p>
                            <p><b>Telepon:</b> {kantor.tlp}</p>
                            <p><b>Alamat:</b> {kantor.alamat}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Informasi Tambahan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg transform hover:scale-[1.02] transition-all">
                    <h3 className="text-sm font-semibold mb-1">Total Cabang</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg transform hover:scale-[1.02] transition-all">
                    <h3 className="text-sm font-semibold mb-1">Karyawan Aktif</h3>
                    <p className="text-2xl font-bold">57</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg transform hover:scale-[1.02] transition-all">
                    <h3 className="text-sm font-semibold mb-1">Transaksi Hari Ini</h3>
                    <p className="text-2xl font-bold">132</p>
                </div>
            </div>

            {/* === Grafik Analisis === */}
            <div className="bg-white shadow rounded-lg p-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Grafik Analisis Transaksi Bulanan
                </h2>
                <div className="h-64 w-full">
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
                                dot={{ r: 5, strokeWidth: 2, fill: "#F59E0B" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

                        {/* === POPUP BOX EDIT PROFIL === */}
            {showEditModal && selectedKantor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Edit Data Kantor
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form className="px-6 py-5 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Kode Kantor</label>
                                <input
                                    type="text"
                                    value={selectedKantor.kode_kantor}
                                    disabled
                                    className="w-full mt-1 bg-gray-100 border-gray-300 rounded-lg shadow-sm text-gray-600 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Nama Kantor</label>
                                <input
                                    type="text"
                                    defaultValue={selectedKantor.nama_kantor}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Pemilik/Penanggung Jawab</label>
                                <input
                                    type="text"
                                    defaultValue={selectedKantor.pemilik}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Telepon</label>
                                <input
                                    type="text"
                                    defaultValue={selectedKantor.tlp}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Kota</label>
                                <input
                                    type="text"
                                    defaultValue={selectedKantor.kota}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Alamat</label>
                                <textarea
                                    rows="3"
                                    defaultValue={selectedKantor.alamat}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 resize-y"
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Sejarah</label>
                                <textarea
                                    rows="4"
                                    defaultValue={selectedKantor.sejarah}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    rows="4"
                                    defaultValue={selectedKantor.ket_kantor}
                                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 resize-y"
                                ></textarea>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium shadow transition-all"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
