import React, { useEffect } from "react";

// Fungsi untuk memformat mata uang (misal: 100000 -> 100.000)
const formatRupiah = (number) => {
    if (!number) return '0';
    // Menghilangkan koma jika ada, lalu menambahkan titik sebagai pemisah ribuan
    return String(number).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// --- Komponen SaldoTable (Digunakan di SaldoModal) ---
const SaldoTable = ({ data, kode, type }) => (
    <div className="mb-6 border-b border-gray-400">
        {/* Table Header */}
        <div className="flex justify-between items-center bg-gray-100 p-2 border-b-2 border-black">
            <h4 className="font-bold text-sm text-gray-700">{kode}</h4>
            <button className="bg-gray-300 hover:bg-gray-400 text-xs px-2 py-1 rounded">CETAK</button>
        </div>
        
        {/* Table Content (RESPONSIVE: overflow-x-auto) */}
        <div className="overflow-x-auto">
            {/* min-w-[700px] memaksa tabel memiliki lebar minimum agar dapat discroll di mobile */}
            <table className="min-w-[700px] w-full text-xs">
                <thead>
                    <tr className="border-b border-black">
                        <th className="w-10 p-2 text-left">No</th>
                        <th className="w-20 p-2 text-left">Tanggal</th>
                        <th className="w-24 p-2 text-left">No.Ref</th>
                        <th className="w-40 p-2 text-left">Keterangan</th>
                        <th className="w-20 p-2 text-left">No.Dept</th>
                        <th className="w-24 p-2 text-right">Debit</th>
                        <th className="w-24 p-2 text-right">Kredit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-2">{item.no}</td>
                            <td className="p-2">{item.tanggal}</td>
                            <td className="p-2">{item.no_ref}</td>
                            <td className="p-2 truncate max-w-[150px]">{item.keterangan}</td>
                            <td className="p-2">{item.no_dept}</td>
                            <td className="p-2 font-mono text-right">{formatRupiah(item.debit)}</td>
                            <td className="p-2 font-mono text-right">{formatRupiah(item.kredit)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Subtotal & Total (Menggunakan Flexbox responsif) */}
        <div className="text-right text-xs font-semibold">
            {/* Subtotal */}
            <div className="flex justify-end border-t border-gray-400 bg-blue-50/50">
                {/* Penyesuaian lebar untuk alignment di desktop/mobile */}
                <div className="flex-1 sm:w-1/4 p-2 text-left sm:text-right">SubTotal</div>
                <div className="w-1/3 sm:w-[100px] p-2">{formatRupiah(type.subtotal.debit)}</div>
                <div className="w-1/3 sm:w-[100px] p-2">{formatRupiah(type.subtotal.kredit)}</div>
                <div className="w-1/3 sm:w-[100px] p-2">{formatRupiah(type.subtotal.saldo)}</div>
            </div>
            {/* Total */}
            <div className="flex justify-end border-t-2 border-black bg-blue-100">
                <div className="flex-1 sm:w-1/4 p-2 text-left sm:text-right">Total</div>
                <div className="w-1/3 sm:w-[100px] p-2">{formatRupiah(type.total.debit)}</div>
                <div className="w-1/3 sm:w-[100px] p-2">{formatRupiah(type.total.kredit)}</div>
                <div className="w-1/3 sm:w-[100px] p-2 font-extrabold">{formatRupiah(type.total.saldo)}</div>
            </div>
        </div>
    </div>
);


// --- Modal Wrapper (Fungsi untuk mengunci scroll) ---
const ModalWrapper = ({ isVisible, onClose, title, subtitle, totalValue, totalLabel, children, maxWidth = "max-w-4xl" }) => {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden"; // Disable scroll halaman
        } else {
            document.body.style.overflow = "auto"; // Enable scroll lagi
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className={`bg-white rounded-xl shadow-2xl w-full ${maxWidth} transition-all transform duration-300`}>
                {/* Header Modal */}
                <div className="bg-green-600 text-white p-4 rounded-t-xl text-center shadow-md">
                    <h3 className="text-xl font-bold uppercase">{title}</h3>
                    {totalValue && <p className="text-2xl font-extrabold mt-1">{totalLabel || ""} {totalValue}</p>}
                    {subtitle && <p className="text-sm font-medium mt-1">{subtitle}</p>}
                </div>

                {/* Konten Modal */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>

                {/* Footer Modal (Tombol Tutup) */}
                <div className="p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};


// ==========================================================
// === MODAL UTAMA ===
// ==========================================================

export const AssetsModal = ({ isVisible, onClose, assets }) => {
    return (
        <ModalWrapper
            isVisible={isVisible}
            onClose={onClose}
            title="TOTAL ASSETS SETELAH PENYUSUTAN"
            totalValue="Rp. 1.250.000.000,-"
            maxWidth="max-w-4xl"
        >
            {/* Pencarian */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Pencarian....."
                    className="w-full border-b-2 border-double border-black p-2 focus:outline-none"
                />
            </div>

            {/* List Assets */}
            <div className="space-y-4">
                {assets.map((asset, index) => (
                    <div key={index} className="p-4 border-2 border-green-400 bg-green-50 rounded-lg flex flex-col sm:flex-row gap-4 transition transform hover:scale-[1.01] hover:bg-green-100">
                        {/* Box Gambar */}
                        <div className="flex-shrink-0 w-full sm:w-40 h-28 sm:h-24 flex items-center justify-center mx-auto sm:mx-0">
                            <img
                                src={asset.image}
                                alt={asset.nama}
                                className="w-full h-full object-contain" 
                            />
                        </div>
                        {/* Detail Asset */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 text-sm md:text-base gap-2">
                            <div className="font-semibold space-y-1">
                                <p>KODE</p><p>NAMA</p><p>TGL BELI/INPUT</p><p>PIC</p><p>NOMINAL</p><p>PENYUSUTAN</p><p>ASAL</p>
                            </div>
                            <div className="space-y-1 text-right sm:text-left">
                                <p>: {asset.kode}</p><p>: <span className="text-red-600 font-medium">{asset.nama}</span></p><p>: <span className="text-red-600 font-medium">{asset.tanggal}</span></p><p>: {asset.pic}</p><p>: <span className="text-red-600 font-medium">{asset.nominal}</span></p><p>: <span className="text-red-600 font-medium">{asset.penyusutan}</span></p><p>: {asset.asal}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ModalWrapper>
    );
};

export const MuzakiModal = ({ isVisible, onClose, data }) => {
    // Filter Muzaki (Warna Hijau) dan Mustahik (Warna Merah)
    const renderList = (type) => (
        <div className="space-y-3">
            <h4 className="text-lg font-bold text-gray-700">{type} Terbaru:</h4>
            {data.filter(item => item.jenis === type).map((item, i) => (
                <div
                    key={i}
                    className={`p-3 border rounded-lg flex justify-between text-sm transition transform hover:scale-[1.01] ${type === 'Muzaki' ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}
                >
                    <div>
                        <p className="font-semibold text-gray-800">{item.nama}</p>
                        <p className="text-xs text-gray-500">{item.tanggal}</p>
                    </div>
                    <p className={`font-bold ${type === 'Muzaki' ? 'text-green-700' : 'text-red-700'}`}>
                        {item.jumlah}
                    </p>
                </div>
            ))}
        </div>
    );

    return (
        <ModalWrapper
            isVisible={isVisible}
            onClose={onClose}
            title="RINCIAN MUZAKI & MUSTAHIK"
            subtitle={`Total Data: ${data.length} Orang`}
            maxWidth="max-w-3xl"
        >
            {/* Pencarian */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari Muzaki atau Mustahik..."
                    className="w-full border-b-2 border-double border-gray-400 p-2 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderList('Muzaki')}
                {renderList('Mustahik')}
            </div>
        </ModalWrapper>
    );
};

export const UpzModal = ({ isVisible, onClose, upz = [] }) => {
    const data = Array.isArray(upz) ? upz : [];

    return (
        <ModalWrapper
            isVisible={isVisible}
            onClose={onClose}
            title="DETAIL UPZ & KARYAWAN"
            totalValue={`${data.filter(item => item.jabatan === 'Unit Pengumpul Zakat').length} UPZ / ${data.filter(item => item.jabatan !== 'Unit Pengumpul Zakat').length} KARYAWAN`}
            totalLabel="Total:"
            maxWidth="max-w-4xl"
        >
            {/* Pencarian */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Pencarian....."
                    className="w-full border-b-2 border-double border-black p-2 focus:outline-none"
                />
            </div>

            {/* List UPZ/Karyawan */}
            <div className="space-y-4">
                {data.map((asset, index) => (
                    <div key={index} className="p-4 border-2 border-green-400 bg-green-50 rounded-lg flex flex-col sm:flex-row gap-4 transition transform hover:scale-[1.01] hover:bg-green-100">
                        {/* Box Gambar */}
                        <div className="flex-shrink-0 w-full sm:w-40 h-28 sm:h-24 flex items-center justify-center mx-auto sm:mx-0">
                            <img
                                src={asset.image}
                                alt={asset.nama}
                                className="w-full h-full object-contain" 
                            />
                        </div>
                        {/* Detail */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 text-sm md:text-base gap-2">
                            <div className="font-semibold space-y-1">
                                <p>NAMA</p><p>JABATAN</p><p>JENIS KELAMIN</p><p>TEMPAT LAHIR</p><p>TANGGAL LAHIR</p><p>TLP/EMAIL</p><p>ALAMAT</p>
                            </div>
                            <div className="space-y-1 text-right sm:text-left">
                                <p>: {asset.nama}</p><p>: <span className="text-red-600 font-medium">{asset.jabatan}</span></p><p>: <span className="text-red-600 font-medium">{asset.kelamin}</span></p><p>: {asset.tmp_lahir}</p><p>: <span className="text-red-600 font-medium">{asset.tgl_lahir}</span></p><p>: <span className="text-red-600 font-medium">{asset.tlp_email}</span></p><p>: {asset.alamat}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ModalWrapper>
    );
};

export const SaldoModal = ({ isVisible, onClose, saldoData }) => {
    return (
        <ModalWrapper
            isVisible={isVisible}
            onClose={onClose}
            title="TOTAL SALDO PER 21 APRIL 2025"
            totalValue="Rp. 250.000.000,-"
            maxWidth="max-w-6xl"
        >
            {/* Pencarian */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Pencarian....."
                    className="w-full border-b-2 border-double border-black p-2 focus:outline-none"
                />
            </div>
            
            {/* Judul Buku Besar */}
            <div className="text-center mb-6">
                <h4 className="font-bold border-b border-black inline-block text-lg">BUKU BESAR Kelompok Kerja Madrasah Aliyah</h4>
                <p className="text-sm">PER 2025-11-01 SAMPAI 2025-11-24</p>
            </div>

            {/* Konten Buku Besar */}
            {saldoData.map((group, index) => (
                <SaldoTable 
                    key={index}
                    kode={group.kode}
                    data={group.transaksi}
                    type={group}
                />
            ))}
        </ModalWrapper>
    );
};