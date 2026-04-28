<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Book::create([
            'title' => 'Saatleri Ayarlama Enstitüsü',
            'author' => 'Ahmet Hamdi Tanpınar',
            'price' => 185.00
        ]);

        \App\Models\Book::create([
            'title' => 'Benim Adım Kırmızı',
            'author' => 'Orhan Pamuk',
            'price' => 210.00
        ]);

        \App\Models\Book::create([
            'title' => 'Beyaz Kale',
            'author' => 'Orhan Pamuk',
            'price' => 195.50
        ]);
    }
}
