<?php

namespace App\Http\Controllers;

use App\Models\Pengaturan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PengaturanController extends Controller
{
public function update(Request $request)
    {
        $validated = $request->validate([
            'id_pengaturan' => 'required',
            'nilai' => 'required|string|max:255',
        ]);

        $pengaturan = Pengaturan::find($validated['id_pengaturan']);

        if (!$pengaturan) {
            return response()->json(['message' => 'Pengaturan tidak ditemukan.'], 404);
        }

        $pengaturan->update([
            'nilai' => $validated['nilai'],
            'tgl_updt' => now(),
            'user_updt' => Auth::user()->name ?? 'system',
        ]);

        return back()->with('success', 'Pengaturan berhasil diperbarui!');
    }
}
