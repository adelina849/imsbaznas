<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Departemen extends Model
{
    use HasFactory;

    protected $table = 'tb_dept';
    protected $primaryKey = 'id_dept';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id_dept',
        'kode_dept',
        'nama_dept',
        'ket_dept',
        'hirarki',
        'tgl_ins',
        'tgl_updt',
        'user_ins',
        'user_updt',
        'kode_kantor',
    ];

    // === Membuat ID otomatis sebelum insert ===
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id_dept = self::generateId($model->kode_dept);
        });
    }

    // === Fungsi generate ID ===
    private static function generateId($kode_dept)
    {
        // Ambil tanggal sekarang
        $tanggal = now();
        $tahun = $tanggal->format('Y');
        $bulan = $tanggal->format('m');
        $hari  = $tanggal->format('d');

        // Ambil prefix (ON + kode_dept)
        $prefix = 'ON' . strtoupper($kode_dept);

        // Cari urutan terakhir untuk hari ini
        $lastId = DB::table('tb_dept')
            ->where('id_dept', 'like', "{$prefix}{$tahun}{$bulan}{$hari}%")
            ->orderBy('id_dept', 'desc')
            ->value('id_dept');

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
