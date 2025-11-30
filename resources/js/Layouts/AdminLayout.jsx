import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { ChevronLeft, ChevronRight, LogOut, User, Home, Database, Building2, Users2, ChevronDown, ClipboardList, Menu, X, Search } from "lucide-react";

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Computed state untuk expanded (teks dan submenu visible)
    const isExpanded = sidebarOpen || mobileSidebarOpen;

    // State untuk menu bertingkat
    const [openDataDasar, setOpenDataDasar] = useState(false);
    const [openKepegawaian, setOpenKepegawaian] = useState(false);

    // State untuk pencarian
    const [searchQuery, setSearchQuery] = useState("");

    // === Aktif Route Checker ===
    const isKepegawaianActive =
        route().current("departemen.index") ||
        route().current("jabatan.index") ||
        route().current("karyawan.index") ||
        route().current("pemberian-akun");

    const isDataDasarActive =
        route().current("home.indexx") ||
        isKepegawaianActive ||
        route().current("departemen.index") ||
        route().current("jabatan.index") ||
        route().current("karyawan.index") ||
        route().current("pemberian-akun.index");

    // Fungsi untuk memeriksa apakah menu cocok dengan query pencarian
    const matchesSearch = (name) => {
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Overlay untuk mobile sidebar */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* === SIDEBAR === */}
            <aside
                className={`
                    ${isExpanded ? "w-64" : "w-20"}
                    bg-green-700 border-r border-green-500 transition-all duration-300 flex flex-col pt-8
                    fixed inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0
                    ${mobileSidebarOpen ? "translate-x-0" : ""}
                    ${sidebarOpen ? "lg:w-64" : "lg:w-20"}
                `}
            >
                {/* Header Sidebar */}
                <div className="flex items-center justify-between p-4 border-b border-green-500">
                    <Link href="/" className="flex items-center gap-2 flex-1">
                        <ApplicationLogo className="h-8 w-auto" />
                        {isExpanded && (
                            <span className="font-semibold text-white text-lg">
                                Admin
                            </span>
                        )}
                    </Link>
                    <div className="flex items-center gap-2">
                        {/* Tombol close untuk mobile */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:flex items-center justify-center p-1 rounded hover:bg-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110"
                        >
                            <div
                                className={`transition-all duration-300 ease-in-out transform ${
                                    sidebarOpen ? "rotate-180 opacity-80" : "rotate-0 opacity-100"
                                }`}
                            >
                                {sidebarOpen ? (
                                    <X className="h-5 w-5 text-white" />
                                ) : (
                                    <Menu className="h-5 w-5 text-white" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Kolom Pencarian */}
                {isExpanded && (
                    <div className="p-3 border-b border-green-500">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                            <input
                                type="text"
                                placeholder="Cari nama menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-yellow-400 rounded-md bg-green-600 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                    </div>
                )}

                {/* Wrapper untuk scrollbar di kiri */}
                <div style={{ direction: 'rtl', overflowY: 'scroll', flex: 1 }}>
                    {/* === NAV MENU === */}
                    <nav style={{ direction: 'ltr' }} className="p-3 space-y-1">
                        {/* Dashboard */}
                        {matchesSearch("Beranda") && (
                            <Link
                                href={route("dashboard")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("dashboard")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Home className="h-5 w-5 text-white" />
                                {isExpanded && <span>Beranda</span>}
                            </Link>
                        )}

                        {/* === MENU DATA DASAR === */}
                        {(matchesSearch("Data Dasar") || matchesSearch("UPZ") || matchesSearch("Kepegawaian") || matchesSearch("Departemen") || matchesSearch("Jabatan") || matchesSearch("Data Karyawan") || matchesSearch("Pemberian Akun")) && (
                            <div>
                                <button
                                    onClick={() => setOpenDataDasar(!openDataDasar)}
                                    className={`w-full flex items-center justify-between p-2 rounded-md text-white transition-all 
                                        ${openDataDasar || isDataDasarActive ? "bg-yellow-400 font-semibold" : "hover:bg-yellow-400"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Database className="h-5 w-5 text-white" />
                                        {isExpanded && <span>Data Dasar</span>}
                                    </div>
                                    {isExpanded && (
                                        <ChevronDown
                                            className={`h-4 w-4 text-white transition-transform duration-300 ${
                                                openDataDasar ? "rotate-180" : ""
                                            }`}
                                        />
                                    )}
                                </button>

                                {/* ===== Submenu Data Dasar ===== */}
                                <div className={`space-y-1 overflow-hidden transition-all duration-500 ${openDataDasar && isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                                    
                                    {/* UPZ */}
                                    {matchesSearch("UPZ") && (
                                        <Link
                                            href={route("home.indexx")}
                                            className={`flex items-center gap-2 pl-6 py-1.5 text-sm hover:text-yellow-300 ${
                                                route().current("home.indexx") ? "text-yellow-400 font-semibold rounded-md px-2" : "text-white"
                                            }`}
                                        >
                                            <Building2 className="h-4 w-4 text-white" />
                                            <span>UPZ</span>
                                        </Link>
                                    )}

                                    {/* Kepegawaian */}
                                    {(matchesSearch("Kepegawaian") || matchesSearch("Departemen") || matchesSearch("Jabatan") || matchesSearch("Data Karyawan") || matchesSearch("Pemberian Akun")) && (
                                        <div>
                                            <button
                                                onClick={() => setOpenKepegawaian(!openKepegawaian)}
                                                className={`w-full flex items-center justify-between pl-6 py-1.5 text-sm transition-all ${
                                                    isKepegawaianActive ? "text-yellow-400 font-semibold" : "text-white hover:text-yellow-300"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Users2 className="h-4 w-4 text-white" />
                                                    <span>Kepegawaian</span>
                                                </div>
                                                {isExpanded && (
                                                    <ChevronDown
                                                        className={`h-3 w-3 text-white transition-transform duration-300 ${openKepegawaian ? "rotate-180" : ""}`}
                                                    />
                                                )}
                                            </button>

                                            {/* ===== Submenu Kepegawaian ===== */}
                                            <div className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all duration-500 ${
                                                openKepegawaian ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                                }`}>
                                                {matchesSearch("Departemen") && (
                                                    <Link
                                                        href={route("departemen.index")}
                                                        className={`flex items-center gap-2 text-xs hover:text-yellow-300 ${
                                                            route().current("departemen.index")
                                                                ? "text-yellow-400 font-semibold"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        <ClipboardList className="h-3.5 w-3.5 text-white" />
                                                        <span>Departemen</span>
                                                    </Link>
                                                )}

                                                {matchesSearch("Jabatan") && (
                                                    <Link
                                                        href={route("jabatan.index")}
                                                        className={`flex items-center gap-2 text-xs hover:text-yellow-300 ${
                                                            route().current("jabatan.index")
                                                                ? "text-yellow-400 font-semibold"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        <ClipboardList className="h-3.5 w-3.5 text-white" />
                                                        <span>Jabatan</span>
                                                    </Link>
                                                )}

                                                {matchesSearch("Data Karyawan") && (
                                                    <Link
                                                        href={route("karyawan.index")}
                                                        className={`flex items-center gap-2 text-xs hover:text-yellow-300 ${
                                                            route().current("karyawan.index")
                                                                ? "text-yellow-400 font-semibold"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        <ClipboardList className="h-3.5 w-3.5 text-white" />
                                                        <span>Data Karyawan</span>
                                                    </Link>
                                                )}

                                                {matchesSearch("Pemberian Akun") && (
                                                    <Link
                                                        href={route("pemberian-akun.index")}
                                                        className={`flex items-center gap-2 text-xs hover:text-yellow-300 ${
                                                            route().current("pemberian-akun.index")
                                                                ? "text-yellow-400 font-semibold"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        <ClipboardList className="h-3.5 w-3.5 text-white" />
                                                        <span>Pemberian Akun</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* BAZNAS */}
                        {matchesSearch("BAZNAS") && (
                            <Link
                                href={route("baznas")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("baznas")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>BAZNAS</span>}
                            </Link>
                        )}

                        {/* KKMA */}
                        {matchesSearch("KKMA") && (
                            <Link
                                href={route("kkma")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("kkma")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>KKMA</span>}
                            </Link>
                        )}

                        {/* KKMTS */}
                        {matchesSearch("KKMTS") && (
                            <Link
                                href={route("kkmts")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("kkmts")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>KKMTS</span>}
                            </Link>
                        )}

                        {/* KKMI */}
                        {matchesSearch("KKMI") && (
                            <Link
                                href={route("kkmi")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("kkmi")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>KKMI</span>}
                            </Link>
                        )}

                        {/* KKRA */}
                        {matchesSearch("KKRA") && (
                            <Link
                                href={route("kkra")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("kkra")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>KKRA</span>}
                            </Link>
                        )}

                        {/* UPZ DESA CIJANGKAR */}
                        {matchesSearch("UPZ DESA CIJANGKAR") && (
                            <Link
                                href={route("upz_cijangkar")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("upz_cijangkar")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>UPZ DESA CIJANGKAR</span>}
                            </Link>
                        )}

                        {/* UPZ DESA SUKARESMI */}
                        {matchesSearch("UPZ DESA SUKARESMI") && (
                            <Link
                                href={route("upz_sukaresmi")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("upz_sukaresmi")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>UPZ DESA SUKARESMI</span>}
                            </Link>
                        )}

                        {/* UPZ DESA CISAAT */}
                        {matchesSearch("UPZ DESA CISAAT") && (
                            <Link
                                href={route("upz_cisaat")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("upz_cisaat")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>UPZ DESA CISAAT</span>}
                            </Link>
                        )}

                        {/* UPZ DESA GUNUNG GURUH */}
                        {matchesSearch("UPZ DESA GUNUNG GURUH") && (
                            <Link
                                href={route("upz_gunung_guruh")}
                                className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-yellow-400 ${
                                    route().current("upz_gunung_guruh")
                                        ? "bg-yellow-500 font-semibold"
                                        : ""
                                }`}
                            >
                                <Building2 className="h-5 w-5 text-white" />
                                {isExpanded && <span>UPZ DESA GUNUNG GURUH</span>}
                            </Link>
                        )}
                    </nav>
                </div>
            </aside>

            {/* === MAIN AREA === */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300
                    ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}
                `}
            >
                {/* RUNNING TEXT */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-1 overflow-hidden">
                    <marquee scrollamount="6" className="text-sm font-medium">
                        NB: Pastikan format number pemisah ribuan adalah koma (,). Hal
                        ini akan berpengaruh terhadap format angka ketika di export
                        seperti file Excel dll.
                    </marquee>
                </div>

                {/* NAVBAR */}
                <nav className="bg-green-700 border-b border-green-500 h-20 flex items-center justify-between px-6 mt-4">
                    <div className="flex items-center gap-4">
                        {/* Tombol hamburger untuk mobile */}
                        <button
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                            className="lg:hidden p-1 rounded hover:bg-yellow-400"
                        >
                            <Menu className="h-6 w-6 text-white" />
                        </button>
                        <h1 className="text-white font-semibold text-lg">
                            {header || "Dashboard"}
                        </h1>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 text-white hover:text-yellow-300"
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                                alt={user.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span>{user.name}</span>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                                <Link
                                    href={route("profile.edit")}
                                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-100"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-100"
                                >
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
