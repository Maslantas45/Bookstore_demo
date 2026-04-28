<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'Kumarbaz',
                'author' => 'Fyodor Dostoyevski',
                'category' => 'Roman',
                'price' => 145.00,
                'rating' => 4.8,
                'reviews' => 1250,
                'image_url' => 'https://www.canyayinlari.com/productimages/120068/big/9789750751400_front_cover1.jpg'
            ],
            [
                'title' => 'Sefiller',
                'author' => 'Victor Hugo',
                'category' => 'Roman',
                'price' => 210.00,
                'rating' => 4.9,
                'reviews' => 840,
                'image_url' => 'https://cdn.timas.com.tr/urun/sefiller-9786054985326.jpg'
            ],
            [
                'title' => 'Cesur Yeni Dünya',
                'author' => 'Aldous Huxley',
                'category' => 'Bilim Kurgu',
                'price' => 165.00,
                'rating' => 4.7,
                'reviews' => 960,
                'image_url' => 'https://1k-cdn.com/resimler/kitaplar/27823_o4Hlz_1650549400.jpg'
            ]
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
