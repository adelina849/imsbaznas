import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { ChevronLeft, ChevronRight, LogOut, User, Home, Database, Building2, Users2, ChevronDown, ClipboardList, Menu, X, } from "lucide-react";

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


    // === Aktif Route Checker ===
    const isKepegawaianActive =
        route().current("departemen.index") ||
        route().current("jabatan.index") ||
        route().current("karyawan.index") ||
        route().current("pemberian-akun");

    const isDataDasarActive =
        route().current("upz.indexx") ||
        isKepegawaianActive ||
        route().current("departemen.index") ||
        route().current("jabatan.index") ||
        route().current("karyawan.index") ||
        route().current("pemberian-akun.index");


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
                    bg-white border-r border-gray-200 transition-all duration-300 flex flex-col pt-8
                    fixed inset-y-0 left-0 z-50 transform -translate-x-full lg:static lg:z-auto lg:translate-x-0
                    ${mobileSidebarOpen ? "translate-x-0" : ""}
                    lg:w-${sidebarOpen ? "64" : "20"}
                    transition-transform duration-300 ease-in-out
                `}
            >
                {/* Header Sidebar */}
                <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/" className="flex items-center gap-2 flex-1">
                        <ApplicationLogo className="h-8 w-auto" />
                        {isExpanded && (
                            <span className="font-semibold text-gray-800 text-lg">
                                Admin
                            </span>
                        )}
                    </Link>
                    <div className="flex items-center gap-2">
                        {/* Tombol close untuk mobile */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:flex items-center justify-center p-1 rounded hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110"
                        >
                            <div
                                className={`transition-all duration-300 ease-in-out transform ${
                                    sidebarOpen ? "rotate-180 opacity-80" : "rotate-0 opacity-100"
                                }`}
                            >
                                {sidebarOpen ? (
                                    <X className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <Menu className="h-5 w-5 text-gray-600" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* === NAV MENU === */}
                <nav className="flex-1 p-3 space-y-1">
                    {/* Dashboard */}
                    <Link
                        href={route("dashboard")}
                        className={`flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                            route().current("dashboard")
                                ? "bg-gray-200 font-semibold"
                                : ""
                        }`}
                    >
                        <Home className="h-5 w-5" />
                        {isExpanded && <span>Beranda</span>}
                    </Link>

                    {/* === MENU DATA DASAR === */}
                    <div>
                        <button
                            onClick={() => setOpenDataDasar(!openDataDasar)}
                            className={`w-full flex items-center justify-between p-2 rounded-md text-gray-700 transition-all 
                                ${openDataDasar || isDataDasarActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}
                        >
                            <div className="flex items-center gap-3">
                                <Database className="h-5 w-5" />
                                {isExpanded && <span>Data Dasar</span>}
                            </div>
                            {isExpanded && (
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${
                                        openDataDasar ? "rotate-180" : ""
                                    }`}
                                />
                            )}
                        </button>

                        {/* ===== Submenu Data Dasar ===== */}
                        <div className={`space-y-1 overflow-hidden transition-all duration-500 ${openDataDasar && isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                            
                            {/* UPZ */}
                            <Link
                                href={route("upz.indexx")}
                                className={`flex items-center gap-2 pl-6 py-1.5 text-sm hover:text-amber-600 ${
                                    route().current("upz.indexx") ? "text-amber-700 font-semibold rounded-md px-2" : "text-gray-600"
                                }`}
                            >
                                <Building2 className="h-4 w-4" />
                                <span>UPZ</span>
                            </Link>

                            {/* Kepegawaian */}
                            <div>
                                <button
                                    onClick={() => setOpenKepegawaian(!openKepegawaian)}
                                    className={`w-full flex items-center justify-between pl-6 py-1.5 text-sm transition-all ${
                                        isKepegawaianActive ? "text-amber-700 font-semibold" : "text-gray-600 hover:text-amber-600"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Users2 className="h-4 w-4" />
                                        <span>Kepegawaian</span>
                                    </div>
                                    {isExpanded && (
                                        <ChevronDown
                                            className={`h-3 w-3 text-gray-500 transition-transform duration-300 ${openKepegawaian ? "rotate-180" : ""}`}
                                        />
                                    )}
                                </button>

                                {/* ===== Submenu Kepegawaian ===== */}
                                <div className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all duration-500 ${
                                    openKepegawaian ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    <Link
                                        href={route("departemen.index")}
                                        className={`flex items-center gap-2 text-xs hover:text-amber-600 ${
                                            route().current("departemen.index")
                                                ? "text-amber-700 font-semibold"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        <ClipboardList className="h-3.5 w-3.5" />
                                        <span>Departemen</span>
                                    </Link>

                                    <Link
                                        href={route("jabatan.index")}
                                        className={`flex items-center gap-2 text-xs hover:text-amber-600 ${
                                            route().current("jabatan.index")
                                                ? "text-amber-700 font-semibold"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        <ClipboardList className="h-3.5 w-3.5" />
                                        <span>Jabatan</span>
                                    </Link>

                                    <Link
                                        href={route("karyawan.index")}
                                        className={`flex items-center gap-2 text-xs hover:text-amber-600 ${
                                            route().current("karyawan.index")
                                                ? "text-amber-700 font-semibold"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        <ClipboardList className="h-3.5 w-3.5" />
                                        <span>Data Karyawan</span>
                                    </Link>

                                    <Link
                                        href={route("pemberian-akun.index")}
                                        className={`flex items-center gap-2 text-xs hover:text-amber-600 ${
                                            route().current("pemberian-akun.index")
                                                ? "text-amber-700 font-semibold"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        <ClipboardList className="h-3.5 w-3.5" />
                                        <span>Pemberian Akun</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* === MAIN AREA === */}
            <div className="flex-1 flex flex-col">
                {/* RUNNING TEXT */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-1 overflow-hidden">
                    <marquee scrollamount="6" className="text-sm font-medium">
                        NB: Pastikan format number pemisah ribuan adalah koma (,). Hal
                        ini akan berpengaruh terhadap format angka ketika di export
                        seperti file Excel dll.
                    </marquee>
                </div>

                {/* NAVBAR */}
                <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 mt-6">
                    <div className="flex items-center gap-4">
                        {/* Tombol hamburger untuk mobile */}
                        <button
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                            className="lg:hidden p-1 rounded hover:bg-gray-100"
                        >
                            <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                        <h1 className="text-gray-800 font-semibold text-lg">
                            {header || "Dashboard"}
                        </h1>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
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
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
