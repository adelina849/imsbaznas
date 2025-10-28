<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UPZController;
use App\Http\Controllers\PengaturanController;
use App\Http\Controllers\DepartemenController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\PemberianAkunController;


use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');


Route::middleware(['auth','verified', 'check.session', 'kantor'])->group(function () {
    Route::get('/dashboard', [UPZController::class, 'index'])->name('dashboard');
    Route::post('/pengaturan/update', [PengaturanController::class, 'update'])->name('pengaturan.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::get('/upz', [UPZController::class, 'indexx'])->name('upz.indexx');
    Route::post('/upz', [UPZController::class, 'store'])->name('upz.store');
    Route::put('/upz/{id}', [UPZController::class, 'update'])->name('upz.update');
    Route::delete('/upz/{id}', [UPZController::class, 'destroy'])->name('upz.destroy');

    Route::get('/kepegawaian/departemen', [DepartemenController::class, 'index'])->name('departemen.index');
    Route::post('/kepegawaian/departemen', [DepartemenController::class, 'store'])->name('departemen.store');
    Route::put('/kepegawaian/departemen/{id}', [DepartemenController::class, 'update'])->name('departemen.update');
    Route::delete('/kepegawaian/departemen/{id}', [DepartemenController::class, 'destroy'])->name('departemen.destroy');

    Route::get('/kepegawaian/jabatan', [JabatanController::class, 'index'])->name('jabatan.index');
    Route::post('/kepegawaian/jabatan', [JabatanController::class, 'store'])->name('jabatan.store');
    Route::put('/kepegawaian/jabatan/{id}', [JabatanController::class, 'update'])->name('jabatan.update');
    Route::delete('/kepegawaian/jabatan/{id}', [JabatanController::class, 'destroy'])->name('jabatan.destroy');

    Route::get('/kepegawaian/data-karyawan', [KaryawanController::class, 'index'])->name('karyawan.index');
    Route::post('/kepegawaian/data-karyawan', [KaryawanController::class, 'store'])->name('karyawan.store');
    Route::put('/kepegawaian/data-karyawan/{id}', [KaryawanController::class, 'update'])->name('karyawan.update');
    Route::delete('/kepegawaian/data-karyawan/{id}', [KaryawanController::class, 'destroy'])->name('karyawan.destroy');

    Route::get('/kepegawaian/pemberian-akun', [PemberianAkunController::class, 'index'])->name('pemberian-akun.index');
    Route::post('/kepegawaian/pemberian-akun', [PemberianAkunController::class, 'store'])->name('pemberian-akun.store');
    Route::put('/pemberian-akun/{id}', [PemberianAkunController::class, 'update'])->name('pemberian-akun.update');
    
});


require __DIR__.'/auth.php';
