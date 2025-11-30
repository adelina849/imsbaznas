<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UPZController extends Controller
{
    public function baznas()
    {
        return Inertia::render('UPZ/Baznas');
    }

    public function kkma()
    {
        return Inertia::render('UPZ/KKMA');
    }


    public function kkmts()
    {
        return Inertia::render(component: 'UPZ/KKMTS');
    }

    public function kkmi()
    {
        return Inertia::render(component: 'UPZ/KKMI');
    }

    public function kkra()
    {
        return Inertia::render('UPZ/KKRA');
    }

    public function upz_cijangkar()
    {
        return Inertia::render('UPZ/UD_Cijangkar');
    }

    public function upz_sukaresmi()
    {
        return Inertia::render('UPZ/UD_Sukaresmi');
    }

    public function upz_cisaat()
    {
        return Inertia::render('UPZ/UD_Cisaat');
    }

    public function upz_gunung_guruh()
    {
        return Inertia::render('UPZ/UD_GunungGuruh');
    }
}
