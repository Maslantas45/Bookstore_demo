<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemoController;
use App\Models\Book; // BAK BURASI ÇOK ÖNEMLİ, YAZMIYORSA EKLENMELİ

Route::get('/books', function () {
    return Book::all();
});

Route::post('/demo-reset', [DemoController::class, 'reset']);
