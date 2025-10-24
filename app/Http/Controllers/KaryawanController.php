<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    public function index()
    {
        return Inertia::render('DashboardAdmin/DataDasar/Kepegawaian/DataKaryawan', [
            'dataKaryawan' => Karyawan::with('jabatan:id_jabatan,nama_jabatan')
                ->orderBy('nama_karyawan')
                ->get(),
            'dataJabatan' => Jabatan::select('id_jabatan', 'nama_jabatan')->orderBy('nama_jabatan')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_jabatan' => 'required|exists:tb_jabatan,id_jabatan',
            'no_karyawan' => 'required|unique:tb_karyawan,no_karyawan',
            'nik_karyawan' => 'required|unique:tb_karyawan,nik_karyawan',
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
            'IsDokter' => 'nullable|string|max:50',
        ]);

        $validated['id_karyawan'] = 'KRY' . now()->format('YmdHis') . rand(100, 999);
        $validated['tgl_ins'] = now();
        $validated['user_ins'] = Auth::user()->name ?? 'System';
        $validated['tgl_updt'] = now();
        $validated['user_updt'] = Auth::user()->name ?? 'System';
        $validated['kode_kantor'] = Auth::user()->kode_kantor ?? 'TK1';

        Karyawan::create($validated);

        return redirect()->back()->with('success', 'Karyawan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $karyawan = Karyawan::findOrFail($id);

        $validated = $request->validate([
            'id_jabatan' => 'required|exists:tb_jabatan,id_jabatan',
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
            'sts_karyawan' => 'nullable|string|max:50',
        ]);

        $validated['tgl_updt'] = now();
        $validated['user_updt'] = Auth::user()->name ?? 'System';

        $karyawan->update($validated);

        return redirect()->back()->with('success', 'Data karyawan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Karyawan::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Karyawan berhasil dihapus.');
    }
}
