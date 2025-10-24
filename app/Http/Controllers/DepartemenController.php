<?php

namespace App\Http\Controllers;

use App\Models\Departemen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepartemenController extends Controller
{
    public function index()
    {
        $departemen = Departemen::orderBy('hirarki', 'asc')->get();

        return Inertia::render('DashboardAdmin/DataDasar/Kepegawaian/Departemen', [
            'dataDepartemen' => $departemen,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_dept' => 'required|unique:tb_dept,kode_dept',
            'nama_dept' => 'required',
            'ket_dept' => 'nullable|string',
            'hirarki' => 'nullable|integer',
            'kode_kantor' => 'nullable|string|max:10',
        ]);

        $validated['tgl_ins'] = now();
        $validated['user_ins'] = Auth::user()->name ?? 'system';
        $validated['tgl_updt'] = null;
        $validated['user_updt'] = null;
        $validated['kode_kantor'] = Auth::user()->kode_kantor ?? 'TK1';


        Departemen::create($validated);

        return redirect()->back()->with('success', 'Departemen berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $dept = Departemen::findOrFail($id);

        $validated = $request->validate([
            'kode_dept' => 'required',
            'nama_dept' => 'required',
            'ket_dept' => 'nullable|string',
            'hirarki' => 'nullable|integer',
            'kode_kantor' => 'nullable|string|max:10',
        ]);

        $validated['tgl_updt'] = now();
        $validated['user_updt'] = Auth::user()->name ?? 'system';

        $dept->update($validated);

        return redirect()->back()->with('success', 'Departemen berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Departemen::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Departemen berhasil dihapus.');
    }
}
