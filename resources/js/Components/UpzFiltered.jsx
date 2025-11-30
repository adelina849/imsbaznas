import React from "react";

export default function UpzFiltered({ filterStart, setFilterStart, filterEnd, setFilterEnd, filterJenis, setFilterJenis, resetFilters }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 uppercase tracking-wide">
                Filter Data
            </h3>

            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                {/* Filter tanggal mulai */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="start-date">
                        Tanggal Mulai
                    </label>
                    <input
                        id="start-date"
                        type="date"
                        value={filterStart}
                        onChange={(e) => setFilterStart(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        aria-label="Pilih tanggal mulai"
                    />
                </div>

                {/* Filter tanggal akhir */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="end-date">
                        Tanggal Akhir
                    </label>
                    <input
                        id="end-date"
                        type="date"
                        value={filterEnd}
                        onChange={(e) => setFilterEnd(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        aria-label="Pilih tanggal akhir"
                    />
                </div>

                {/* Filter jenis data */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="jenis-data">
                        Jenis Data
                    </label>
                    <select
                        id="jenis-data"
                        value={filterJenis}
                        onChange={(e) => setFilterJenis(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        aria-label="Pilih jenis data"
                    >
                        <option value="all">Semua</option>
                        <option value="pengumpulan">Pengumpulan</option>
                        <option value="pendistribusian">Pendistribusian</option>
                        <option value="muzaki">Muzaki</option>
                    </select>
                </div>

                {/* Tombol Reset */}
                <div className="flex items-end">
                    <button
                        onClick={resetFilters}
                        className="w-full bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition focus:ring-2 focus:ring-gray-500"
                        aria-label="Reset semua filter"
                    >
                        Reset Filter
                    </button>
                </div>
            </div>
        </div>
    );
}