import React from "react";

// Komponen Card tunggal
const StatCard = ({ title, value, onClick, iconPath }) => (
    <div
        className="flex-1 min-w-[200px] bg-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
        onClick={onClick}
    >
        {/* SVG inline untuk ikon */}
        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-2 text-xl">{value}</p>
    </div>
);

export default function UpzBox({ setShowAssetsModal, setShowMuzakiModal, setShowUpzModal, setShowSaldoModal }) {
    return (
        <div className="flex flex-wrap justify-between gap-4">
            {/* Kartu 1: ASSETS */}
            <StatCard
                title="ASSETS"
                value="Rp. 2.300.000.000,-"
                onClick={() => setShowAssetsModal(true)}
                iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" // CurrencyDollarIcon
            />

            {/* Kartu 2: MUZAKI/MUSTAHIK */}
            <StatCard
                title="MUZAKI/MUSTAHIK"
                value="4.500 Orang"
                onClick={() => setShowMuzakiModal(true)}
                iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" // UsersIcon
            />

            {/* Kartu 3: UPZ/KARYAWAN */}
            <StatCard
                title="UPZ/KARYAWAN"
                value="25 UPZ / 135 Orang"
                onClick={() => setShowUpzModal(true)}
                iconPath="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" // OfficeBuildingIcon
            />

            {/* Kartu 4: SALDO */}
            <StatCard
                title="SALDO"
                value="Rp. 450.000.000,-"
                onClick={() => setShowSaldoModal(true)}
                iconPath="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" // BanknotesIcon
            />
        </div>
    );
}