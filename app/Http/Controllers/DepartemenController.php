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
        $user = Auth::user();

        $departemen = Departemen::query()
            ->when($user->kode_kantor !== 'ADMNPST', function ($q) use ($user) {
                $q->where('kode_kantor', $user->kode_kantor);
            })
            ->orderBy('hirarki', 'asc')
            ->get();

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
        ]);

        $validated['tgl_ins'] = now();
        $validated['user_ins'] = Auth::user()->name ?? 'system';
        $validated['kode_kantor'] = Auth::user()->kode_kantor;

        Departemen::create($validated);

        return redirect()->back()->with('success', 'Departemen berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $dept = Departemen::query()
            ->when($user->kode_kantor !== 'ADMNPST', function ($q) use ($user) {
                $q->where('kode_kantor', $user->kode_kantor);
            })
            ->findOrFail($id);

        $validated = $request->validate([
            'kode_dept' => 'required',
            'nama_dept' => 'required',
            'ket_dept' => 'nullable|string',
            'hirarki' => 'nullable|integer',
        ]);

        $validated['tgl_updt'] = now();
        $validated['user_updt'] = $user->name ?? 'system';

        $dept->update($validated);

        return redirect()->back()->with('success', 'Departemen berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $user = Auth::user();

        Departemen::query()
            ->when($user->kode_kantor !== 'ADMNPST', function ($q) use ($user) {
                $q->where('kode_kantor', $user->kode_kantor);
            })
            ->findOrFail($id)
            ->delete();

        return redirect()->back()->with('success', 'Departemen berhasil dihapus.');
    }
}
