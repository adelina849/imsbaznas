<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckSession
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            // Kalau session habis, redirect ke login
            return redirect()->route('login')->with('session_expired', true);
        }

        return $next($request);
    }
}
