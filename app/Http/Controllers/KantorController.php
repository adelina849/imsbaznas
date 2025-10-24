<?php

namespace App\Http\Controllers;

use App\Models\Kantor;
use App\Models\Pengaturan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KantorController extends Controller
{
    public function index()
    {
        $kantor = Kantor::first();
        $pengaturan = Pengaturan::orderBy('id_pengaturan')->get();

        return Inertia::render('DashboardAdmin/Index', [
            'kantor' => $kantor,
            'pengaturan' => $pengaturan,
        ]);
    }

    public function update(Request $request)
    {
        $kantor = Kantor::find($request->id_kantor);

        $kantor->update([
            'nama_kantor' => $request->nama_kantor,
            'pemilik' => $request->pemilik,
            'kota' => $request->kota,
            'alamat' => $request->alamat,
            'tlp' => $request->tlp,
            'sejarah' => $request->sejarah,
            'ket_kantor' => $request->ket_kantor,
        ]);

        return redirect()->route('dashboard')->with('success', 'Data kantor berhasil diperbarui!');
    }
}
