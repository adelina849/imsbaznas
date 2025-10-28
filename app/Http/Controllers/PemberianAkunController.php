<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PemberianAkunController extends Controller
{
    public function index()
    {
        $kodeKantor = Auth::user()->kode_kantor ?? null;

        // Ambil semua karyawan (baik yang sudah punya akun atau belum)
        $karyawan = Karyawan::with('user')
            ->when($kodeKantor && $kodeKantor !== 'ADMNPST', function ($query) use ($kodeKantor) {
                $query->where('kode_kantor', $kodeKantor);
            })
            ->orderBy('nama_karyawan', 'asc')
            ->get();

        return Inertia::render('DashboardAdmin/DataDasar/Kepegawaian/PemberianAkun', [
            'dataAkun' => $karyawan,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_karyawan' => 'required|exists:tb_karyawan_new,id_karyawan',
            'username' => 'required|string|min:3|max:50|unique:users,username',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $karyawan = Karyawan::find($validated['id_karyawan']);

        $user = new User();
        $user->name = $karyawan->nama_karyawan;
        $user->username = $validated['username'];
        $user->password = Hash::make($validated['password']);
        $user->kode_kantor = $karyawan->kode_kantor;
        $user->id_karyawan = $karyawan->id_karyawan;
        $user->save();

        return redirect()->route('pemberian-akun.index')->with('success', 'Akun berhasil dibuat.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'username' => 'required|string|min:3|max:50|unique:users,username,' . $id,
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $user = User::findOrFail($id);
        $user->username = $validated['username'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->back()->with('success', 'Akun berhasil diperbarui.');
    }
}
