<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengaturan extends Model
{
    protected $table = 'tb_pengaturan';
    protected $primaryKey = 'id_pengaturan';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id_pengaturan',
        'nama_pengaturan',
        'nilai',
        'keterangan',
        'isJenisData',
        'tgl_ins',
        'tgl_updt',
        'user_updt',
        'kode_kantor',
        'kode_hirarki',
    ];
}
