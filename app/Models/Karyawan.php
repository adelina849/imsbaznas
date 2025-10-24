<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'tb_karyawan';
    protected $primaryKey = 'id_karyawan';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id_karyawan', 'id_jabatan', 'no_karyawan', 'nik_karyawan', 'nama_karyawan',
        'pnd', 'tlp', 'email', 'tmp_lahir', 'tgl_lahir', 'kelamin', 'sts_nikah',
        'alamat', 'ket_karyawan', 'tgl_diterima', 'IsDokter',
        'tgl_ins', 'tgl_updt', 'user_ins', 'user_updt', 'kode_kantor',
    ];

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan', 'id_jabatan');
    }
}
