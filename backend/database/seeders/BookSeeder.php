<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $books = [
            ['title' => 'Simyacı', 'author' => 'Paulo Coelho', 'category' => 'Roman', 'price' => 42.00, 'rating' => 4.8, 'reviews' => 918, 'image_url' => 'https://images.isidore.org/api/v1/image/...'],
            ['title' => 'Harry Potter', 'author' => 'J.K. Rowling', 'category' => 'Fantastik', 'price' => 88.00, 'rating' => 4.9, 'reviews' => 854, 'image_url' => '...'],
            // Buraya 5-6 tane daha gerçekçi kitap ekle kral
        ];

        foreach ($books as $book) {
            \App\Models\Book::create($book);
        }
    }
}
