import React from "react";

// Data kegiatan dummy (dipindahkan dari file utama agar komponen dapat berdiri sendiri)
export const kegiatanData = [
    {
        tanggal: "21 April 1990",
        kategori: "KKMA",
        judul: "Peletakan Batu Pertama RSB",
        deskripsi: "RSB atau **Rencana Strategis Bisnis** adalah sebuah dokumen perencanaan yang memuat ...",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "15 Mei 2023",
        kategori: "UPZ DESA CISAAT",
        judul: "Distribusi Zakat Fitrah",
        deskripsi: "Kegiatan ini melibatkan penyaluran zakat kepada mustahik di wilayah Cicurug dengan total penerima 200 orang.",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "10 Juni 2023",
        kategori: "UPZ DESA SUKARESMI",
        judul: "Sosialisasi Pengumpulan Infaq",
        deskripsi: "Acara ini bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya infaq dalam pembangunan sosial.",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "21 April 1990",
        kategori: "KKMI",
        judul: "Peletakan Batu Pertama RSB",
        deskripsi: "RSB atau **Rencana Strategis Bisnis** adalah sebuah dokumen perencanaan yang memuat ...",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "15 Mei 2023",
        kategori: "UPZ DESA GUNUNG GURUH",
        judul: "Distribusi Zakat Fitrah",
        deskripsi: "Kegiatan ini melibatkan penyaluran zakat kepada mustahik di wilayah Cicurug dengan total penerima 200 orang.",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "10 Juni 2023",
        kategori: "UPZ DESA SUKARESMI",
        judul: "Sosialisasi Pengumpulan Infaq",
        deskripsi: "Acara ini bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya infaq dalam pembangunan sosial.",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "21 April 1990",
        kategori: "KKMTS",
        judul: "Peletakan Batu Pertama RSB",
        deskripsi: "RSB atau **Rencana Strategis Bisnis** adalah sebuah dokumen perencanaan yang memuat ...",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "15 Mei 2023",
        kategori: "KKRA",
        judul: "Distribusi Zakat Fitrah",
        deskripsi: "Kegiatan ini melibatkan penyaluran zakat kepada mustahik di wilayah Cicurug dengan total penerima 200 orang.",
        image: "assets/baznas.jpg"
    },
    {
        tanggal: "10 Juni 2023",
        kategori: "UPZ DESA CIJANGKAR",
        judul: "Sosialisasi Pengumpulan Infaq",
        deskripsi: "Acara ini bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya infaq dalam pembangunan sosial.",
        image: "assets/baznas.jpg"
    },
];

export default function UpzKegiatan({ data = [], showKategori = true }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="font-bold text-lg text-gray-800 mb-4 uppercase tracking-wide">
                Kegiatan Terbaru
            </h2>

            <div className="space-y-4">
                {data.map((kegiatan, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 p-2 border-b border-gray-300 transition cursor-pointer"
                    >
                        {/* Gambar */}
                        <div className="flex-shrink-0 w-full sm:w-28 h-20 border border-gray-400">
                            <img
                                src={kegiatan.image}
                                alt={`Kegiatan ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Teks */}
                        <div className="flex-1 p-2 border border-gray-600">
                            <p className="text-base text-black mb-1">
                                {/* Tanggal */}
                                <span className="text-red-600 underline decoration-red-600 decoration-wavy">
                                    {kegiatan.tanggal}
                                </span>

                                {/* Kategori hanya tampil jika showKategori = true */}
                                {showKategori && (
                                    <>
                                        {" | "}
                                        <span className="underline decoration-red-600 decoration-wavy">
                                            {kegiatan.kategori}
                                        </span>
                                    </>
                                )}

                                {/* Judul */}
                                {" | "}
                                <span className="font-bold underline decoration-red-600 decoration-wavy">
                                    {kegiatan.judul}
                                </span>
                            </p>

                            {/* Deskripsi */}
                            <p className="text-sm text-black leading-relaxed">
                                {kegiatan.deskripsi}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
