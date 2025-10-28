<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Kantor extends Model
{
    protected $table = 'tb_kantor_new';
    protected $primaryKey = 'id_kantor';
    public $incrementing = false; // karena id_kantor bukan auto increment
    public $timestamps = false;

    protected $fillable = [
        //'id_kantor',
        'kode_kantor',
        'nama_kantor',
        'pemilik',
        'kota',
        'alamat',
        'tlp',
        'sejarah',
        'ket_kantor',
        'tgl_ins',
        'tgl_updt',
        'user_updt',
    ];

    // === Membuat ID otomatis sebelum insert ===
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id_kantor = self::generateId($model->kode_kantor);
        });
    }

    // === Fungsi generate ID ===
    private static function generateId($kode_kantor)
    {
        // Ambil tanggal sekarang
        $tanggal = now();
        $tahun = $tanggal->format('Y');
        $bulan = $tanggal->format('m');
        $hari  = $tanggal->format('d');

        // Ambil prefix (ON + kode_kantor)
        $prefix = 'ON' . strtoupper($kode_kantor);

        // Cari urutan terakhir untuk hari ini
        $lastId = DB::table('tb_kantor_new')
            ->where('id_kantor', 'like', "{$prefix}{$tahun}{$bulan}{$hari}%")
            ->orderBy('id_kantor', 'desc')
            ->value('id_kantor');

        // Ambil nomor urut terakhir
        if ($lastId) {
            $lastNumber = intval(substr($lastId, -5));
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        // Format jadi 5 digit
        $formattedNumber = str_pad($nextNumber, 5, '0', STR_PAD_LEFT);

        // Gabungkan semua
        return "{$prefix}{$tahun}{$bulan}{$hari}{$formattedNumber}";
    }
}
