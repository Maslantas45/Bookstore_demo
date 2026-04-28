<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    // Laravel'e "Bu alanların dışarıdan doldurulmasına izin veriyorum" diyoruz
    protected $fillable = [
        'title',
        'author',
        'category',
        'price',
        'image_url',
        'rating',
        'reviews'
    ];
}
