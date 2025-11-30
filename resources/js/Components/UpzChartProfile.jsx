import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Formatter untuk Tooltip chart (menampilkan nilai dalam format jutaan)
const tooltipFormatter = (value, name) => [`${value}M`, name];

export default function UpzChartProfile({ filteredData, filterJenis, title }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            {/* === CHART === */}
            <div className="bg-white shadow-lg rounded-xl p-6 col-span-7 border border-gray-200">
                <h2 className="text-center font-bold text-xl text-gray-800 mb-6 uppercase tracking-wide">
                    {title || "Grafik Pengelolaan ZIS"}
                </h2>

                <div style={{ height: "420px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={tooltipFormatter} />
                            <Legend />

                            {(filterJenis === "pengumpulan" || filterJenis === "all") && (
                                <Bar dataKey="pengumpulan" fill="#2563eb" radius={[4, 4, 0, 0]} name="Pengumpulan" />
                            )}
                            {(filterJenis === "pendistribusian" || filterJenis === "all") && (
                                <Bar dataKey="pendistribusian" fill="#f97316" radius={[4, 4, 0, 0]} name="Pendistribusian" />
                            )}
                            {(filterJenis === "muzaki" || filterJenis === "all") && (
                                <Bar dataKey="muzaki" fill="#6b7280" radius={[4, 4, 0, 0]} name="Muzaki" />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* === PROFIL === */}
            <div className="bg-white shadow-lg rounded-xl p-6 col-span-3 flex flex-col gap-4 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 text-center uppercase tracking-wide">
                    Profil
                </h3>

                <div className="flex flex-col items-start text-gray-700 text-sm space-y-3 leading-relaxed">
                    <p>
                        <span className="font-semibold">Nama:</span><br />
                        Dr. H. Unang Sudarma
                    </p>
                    <p>
                        <span className="font-semibold">Telepon:</span><br />
                        (0266) 0393482
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span><br />
                        info@baznassukabumi.go.id
                    </p>
                    <p>
                        <span className="font-semibold">Alamat:</span><br />
                        Jl. Raya Cisaat No. 43, Kabupaten Sukabumi, Jawa Barat
                    </p>
                </div>
            </div>
        </div>
    );
}