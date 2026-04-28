<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemoController;
use App\Models\Book;

/*
|--------------------------------------------------------------------------
| Arama ve Listeleme Rotası (Az önce sorduğun kısım)
|--------------------------------------------------------------------------
*/
Route::get('/books', function (Request $request) {
    // React'tan gelen '?search=harry' gibi bir kelime var mı diye bakar
    $query = $request->query('search');

    // Eğer arama kutusuna bir şey yazılmışsa:
    if ($query) {
        return Book::where('title', 'LIKE', "%{$query}%")
            ->orWhere('author', 'LIKE', "%{$query}%")
            ->get();
    }

    // Arama yapılmamışsa bütün kitapları yollar
    return Book::all();
});

/*
|--------------------------------------------------------------------------
| Senin Meşhur "Admin Reset" Butonunun Rotası
|--------------------------------------------------------------------------
*/
Route::post('/demo-reset', [DemoController::class, 'reset']);

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// --- ADMİN GİRİŞ ROTASI (Token Üretir) ---
Route::post('/login', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    // Şifre veya email yanlışsa kov
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Bilgiler yanlış aga'], 401);
    }

    // Doğruysa Token oluştur ve gönder
    $token = $user->createToken('admin-token')->plainTextToken;
    return response()->json(['token' => $token]);
});

// --- KİTAP EKLEME ROTASI (Sadece Token'ı olan girebilir) ---
Route::middleware('auth:sanctum')->post('/books', function (Request $request) {
    $book = \App\Models\Book::create([
        'title' => $request->title,
        'author' => $request->author,
        'category' => $request->category ?? 'Genel',
        'price' => $request->price,
        'image_url' => $request->image_url,
    ]);

    return response()->json(['message' => 'Kitap başarıyla eklendi!', 'book' => $book]);
});
