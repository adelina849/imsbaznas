<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KantorAccessMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if ($user && $user->kode_kantor !== 'ADMNPST') {
            // Jika bukan pusat, sisipkan kode_kantor user ke request
            $request->merge(['kode_kantor' => $user->kode_kantor]);
        }

        return $next($request);
    }
}
