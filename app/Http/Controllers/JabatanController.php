<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Jabatan;
use App\Models\Departemen;
use Inertia\Inertia;

class JabatanController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('DashboardAdmin/DataDasar/Kepegawaian/Jabatan', [
            'dataJabatan' => Jabatan::query()
                ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
                ->orderBy('id_jabatan', 'asc')
                ->get(),
            'dataDepartemen' => Departemen::query()
                ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
                ->orderBy('nama_dept')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_dept' => 'required',
            'kode_jabatan' => 'required|unique:tb_jabatan,kode_jabatan',
            'nama_jabatan' => 'required',
            'ket_jabatan' => 'nullable|string|max:255',
            'hirarki' => 'nullable|numeric',
        ]);

        $validated['tgl_insert'] = now();
        $validated['user'] = Auth::user()->name ?? 'System';
        $validated['kode_kantor'] = Auth::user()->kode_kantor;
    
        Jabatan::create($validated);

        return redirect()->back()->with('success', 'Jabatan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $jabatan = Jabatan::query()
            ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
            ->findOrFail($id);

        $validated = $request->validate([
            'id_dept' => 'required',
            'nama_jabatan' => 'required',
            'ket_jabatan' => 'nullable|string|max:255',
            'hirarki' => 'nullable|numeric',
        ]);

        $validated['tgl_update'] = now();
        $validated['user_updt'] = $user->name ?? 'System';

        $jabatan->update($validated);

        return redirect()->back()->with('success', 'Jabatan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $user = Auth::user();

        Jabatan::query()
            ->when($user->kode_kantor !== 'ADMNPST', fn($q) => $q->where('kode_kantor', $user->kode_kantor))
            ->findOrFail($id)
            ->delete();

        return redirect()->back()->with('success', 'Jabatan berhasil dihapus.');
    }
}
