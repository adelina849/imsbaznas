<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Jabatan;
use App\Models\Departemen;
use Inertia\Inertia;

class JabatanController extends Controller
{
    public function index()
    {
        return Inertia::render('DashboardAdmin/DataDasar/Kepegawaian/Jabatan', [
            'dataJabatan' => Jabatan::orderBy('id_jabatan', 'asc')->get(),
            'dataDepartemen' => Departemen::orderBy('nama_dept')->get(),
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
        $validated['kode_kantor'] = Auth::user()->kode_kantor ?? 'TK1';
    
        Jabatan::create($validated);

        return redirect()->back()->with('success', 'Jabatan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $jabatan = Jabatan::findOrFail($id);

        $validated = $request->validate([
            'id_dept' => 'required',
            'nama_jabatan' => 'required',
            'ket_jabatan' => 'nullable|string|max:255',
            'hirarki' => 'nullable|numeric',
        ]);

        $validated['tgl_update'] = now();
        $validated['user_updt'] = Auth::user()->name ?? 'System';

        $jabatan->update($validated);

        return redirect()->back()->with('success', 'Jabatan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Jabatan::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Jabatan berhasil dihapus.');
    }
}
