<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Jabatan extends Model
{
    protected $table = 'tb_jabatan';
    protected $primaryKey = 'id_jabatan';
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';
    protected $fillable = [
        'id_jabatan',
        'id_dept',
        'kode_jabatan',
        'nama_jabatan',
        'ket_jabatan',
        'hirarki',
        'tgl_insert',
        'tgl_update',
        'user',
        'user_updt',
        'kode_kantor',
    ];

    // === Membuat ID otomatis sebelum insert ===
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id_jabatan = self::generateId();
        });
    }

    // === Fungsi generate ID ===
    private static function generateId()
    {
        // Ambil tanggal sekarang
        $tanggal = now();
        $tahun = $tanggal->format('Y');
        $bulan = $tanggal->format('m');
        $hari  = $tanggal->format('d');

        // Prefix tetap
        $prefix = 'JBTN';

        // Cari ID terakhir untuk hari ini
        $lastId = DB::table('tb_jabatan')
            ->where('id_jabatan', 'like', "{$prefix}{$tahun}{$bulan}{$hari}%")
            ->orderBy('id_jabatan', 'desc')
            ->value('id_jabatan');

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
