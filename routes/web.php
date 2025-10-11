<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('DashboardAdmin/Index');
    })->name('dashboard');

    Route::get('/perusahaan-pelaksana', function () {
        return inertia('DashboardAdmin/DataDasar/PerusahaanPelaksana');
    })->name('perusahaan-pelaksana');

    Route::get('/kepegawaian/departemen', function () {
        return inertia('DashboardAdmin/DataDasar/Kepegawaian/Departemen');
    })->name('departemen');

    Route::get('/kepegawaian/jabatan', function () {
        return inertia('DashboardAdmin/DataDasar/Kepegawaian/Jabatan');
    })->name('jabatan');

    Route::get('/kepegawaian/data-karyawan', function () {
        return inertia('DashboardAdmin/DataDasar/Kepegawaian/DataKaryawan');
    })->name('data-karyawan');

    Route::get('/kepegawaian/pemberian-akun', function () {
        return inertia('DashboardAdmin/DataDasar/Kepegawaian/PemberianAkun');
    })->name('pemberian-akun');
});


require __DIR__.'/auth.php';
