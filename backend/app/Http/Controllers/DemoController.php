<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Controller;

class DemoController extends Controller
{
    public function reset()
    {
        // Bütün tabloları siler, migrationları yeniden yapar ve seed verilerini basar.
        Artisan::call('migrate:fresh', ['--seed' => true]);

        return response()->json([
            'status' => 'success',
            'message' => 'Sistem başarıyla Altın Duruma (State 2) sıfırlandı!'
        ]);
    }
}
