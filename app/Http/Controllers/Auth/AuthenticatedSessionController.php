<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return inertia('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'recaptcha_token' => 'required|string',
        ]);

        // verify reCAPTCHA token
        $secret = config('services.recaptcha.secret') ?: env('RECAPTCHA_SECRET_KEY');
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $request->recaptcha_token,
            'remoteip' => $request->ip(),
        ]);

        $body = $response->json();

        if (!isset($body['success']) || $body['success'] !== true || ($body['score'] ?? 0) < 0 ) {
            // For v2 checkbox, success true is enough
            throw ValidationException::withMessages([
                'recaptcha' => 'reCAPTCHA verification failed. Silakan coba lagi.',
            ]);
        }

        // Attempt login via username
        $credentials = ['username' => $request->username, 'password' => $request->password];

        if (!Auth::attempt($credentials, $request->filled('remember'))) {
            throw ValidationException::withMessages([
                'username' => 'Username atau password salah.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
