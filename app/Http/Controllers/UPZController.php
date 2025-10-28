<?php

namespace App\Http\Controllers;

use App\Models\Kantor;
use App\Models\Pengaturan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UPZController extends Controller
{
    public function index()
    {
        $pengaturan = Pengaturan::orderBy('id_pengaturan')->get();

        return Inertia::render('DashboardAdmin/Index', [
            'pengaturan' => $pengaturan,
        ]);
    }

    public function indexx()
    {
        $user = Auth::user();
        $kantor = Kantor::query()
            ->when($user->kode_kantor !== 'ADMNPST', function ($q) use ($user) {
                $q->where('kode_kantor', $user->kode_kantor);
            })
            ->orderBy('id_kantor', 'asc')
            ->get();

        return Inertia::render('DashboardAdmin/DataDasar/UPZ', [
            'dataUpz' => $kantor,
            'user' => Auth::user(), // <-- kirim user login
        ]);
    }

    public function store(Request $request)
    {

        //dd($request->all());

        $validated = $request->validate([
            'kode_kantor' => 'required|unique:tb_kantor_new,kode_kantor',
            'nama_kantor' => 'required',
            'pemilik' => 'required|string',
            'kota' => 'required|string',
            'alamat' => 'required|string',
            'tlp' => 'required|string|max:35',
            'sejarah' => 'required|string',
            'ket_kantor' => 'required|string',
        ]);

        $validated['tgl_ins'] = now();
        $validated['user_updt'] = Auth::user()->name ?? 'system';
        $validated['tgl_updt'] = null;

        Kantor::create($validated);

        return redirect()->back()->with('success', 'UPZ berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $dept = Kantor::query()
            ->when($user->kode_kantor !== 'ADMNPST', function ($q) use ($user) {
                $q->where('kode_kantor', $user->kode_kantor);
            })
            ->findOrFail($id);

        $validated = $request->validate([
            'kode_kantor' => 'required|unique:tb_kantor_new,kode_kantor,' . $id . ',id_kantor',
            'nama_kantor' => 'required',
            'pemilik' => 'required|string',
            'kota' => 'required|string',
            'alamat' => 'required|string',
            'tlp' => 'required|string|max:35',
            'sejarah' => 'required|string',
            'ket_kantor' => 'required|string',
        ]);

        $validated['tgl_updt'] = now();
        $validated['user_updt'] = $user->name ?? 'system';

        $dept->update($validated);

        return redirect()->back()->with('success', 'UPZ berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $kantor = Kantor::query()
            ->when($user->kode_kantor !== 'ADMNPST', function ($q) use ($user) {
                $q->where('kode_kantor', $user->kode_kantor);
            })
            ->findOrFail($id);

        // Cegah user menghapus kantornya sendiri
        if ($kantor->kode_kantor === $user->kode_kantor) {
            return redirect()->back()->with('error', 'Anda tidak bisa menghapus kantor Anda sendiri.');
        }

        $kantor->delete();

        return redirect()->back()->with('success', 'UPZ berhasil dihapus.');
    }
}
