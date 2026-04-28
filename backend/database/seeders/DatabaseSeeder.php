<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Bu senin önceki kitap getirme kodun (kalsın)
        $this->call([
            BookSeeder::class,
        ]);

        // GİRİŞ YAPACAĞIMIZ ADMİN HESABI
        User::factory()->create([
            'name' => 'Admin Aga',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123456'), // Şifremiz bu
        ]);
    }
}
