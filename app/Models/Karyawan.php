<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'tb_karyawan_new';
    protected $primaryKey = 'id_karyawan';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id_karyawan', 'id_kantor', 'no_karyawan', 'nik_karyawan', 'nama_karyawan',
        'pnd', 'tlp', 'email', 'tmp_lahir', 'tgl_lahir', 'kelamin', 'sts_nikah',
        'alamat', 'ket_karyawan', 'tgl_diterima', 'isDokter',
        'tgl_ins', 'tgl_updt', 'user_ins', 'user_updt', 'kode_kantor',
    ];

    public function kantor()
    {
        return $this->belongsTo(Kantor::class, 'id_kantor', 'id_kantor');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id_karyawan', 'id_karyawan');
    }

    protected static function booted()
    {
        static::deleting(function ($karyawan) {
            // Hapus akun user terkait
            $karyawan->user()->delete();
        });
    }
}
