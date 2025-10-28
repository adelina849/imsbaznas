<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\Kantor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('DashboardAdmin/DataDasar/Kepegawaian/DataKaryawan', [
            'dataKaryawan' => Karyawan::with('kantor:id_kantor,nama_kantor')
                ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
                ->orderBy('nama_karyawan')
                ->get(),
            'dataUPZ' => Kantor::query()
                ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
                ->select('id_kantor', 'nama_kantor', 'kode_kantor')
                ->orderBy('nama_kantor')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_kantor' => 'required|exists:tb_kantor_new,id_kantor',
            'no_karyawan' => 'required|unique:tb_karyawan_new,no_karyawan',
            'nik_karyawan' => 'required|unique:tb_karyawan_new,nik_karyawan',
            'nama_karyawan' => 'required',
            'pnd' => 'nullable|string|max:100',
            'tlp' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'tmp_lahir' => 'nullable|string|max:50',
            'tgl_lahir' => 'nullable|date',
            'kelamin' => 'nullable|string|max:20',
            'sts_nikah' => 'nullable|string|max:30',
            'alamat' => 'nullable|string',
            'ket_karyawan' => 'nullable|string',
            'tgl_diterima' => 'nullable|date',
            'isDokter' => 'nullable|string|max:15',
        ]);

        // ✅ Ambil data kantor dari id_kantor
        $kantor = Kantor::where('id_kantor', $validated['id_kantor'])->first();

        $validated['id_karyawan'] = 'KRY' . now()->format('YmdHis') . rand(100, 999);
        $validated['tgl_ins'] = now();
        $validated['user_ins'] = Auth::user()->name ?? 'System';
        $validated['tgl_updt'] = now();
        $validated['user_updt'] = Auth::user()->name ?? 'System';
        $validated['kode_kantor'] = $kantor->kode_kantor ?? null; // ✅ ambil dari tabel kantor

        Karyawan::create($validated);

        return redirect()->back()->with('success', 'Karyawan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $karyawan = Karyawan::query()
            ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
            ->findOrFail($id);

        $validated = $request->validate([
            'id_kantor' => 'required|exists:tb_kantor_new,id_kantor',
            'nama_karyawan' => 'required',
            'pnd' => 'nullable|string|max:100',
            'tlp' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'tmp_lahir' => 'nullable|string|max:50',
            'tgl_lahir' => 'nullable|date',
            'kelamin' => 'nullable|string|max:20',
            'sts_nikah' => 'nullable|string|max:30',
            'alamat' => 'nullable|string',
            'ket_karyawan' => 'nullable|string',
            'tgl_diterima' => 'nullable|date',
            'isDokter' => 'nullable|string|max:15',
        ]);

        // ✅ Ambil ulang kode_kantor dari id_kantor yang dipilih di form
        $kantor = Kantor::where('id_kantor', $validated['id_kantor'])->first();

        $validated['kode_kantor'] = $kantor->kode_kantor ?? null; // ✅ fix ambil dari kantor
        $validated['tgl_updt'] = now();
        $validated['user_updt'] = $user->name ?? 'System';

        $karyawan->update($validated);

        return redirect()->back()->with('success', 'Data karyawan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $karyawan = Karyawan::findOrFail($id);

        if ($karyawan->kode_kantor === 'ADMNPST') {
            return redirect()->back()->with('error', 'Data karyawan pusat tidak bisa dihapus.');
        }

        if ($user->kode_kantor !== 'ADMNPST' && $karyawan->kode_kantor !== $user->kode_kantor) {
            return redirect()->back()->with('error', 'Anda tidak memiliki akses untuk menghapus karyawan ini.');
        }

        $karyawan->delete(); // otomatis hapus user terkait karena booted()

        return redirect()->back()->with('success', 'Karyawan dan akun terkait berhasil dihapus.');
    }
}
