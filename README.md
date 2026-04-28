# 📚 KitapÜssü - Verilerim Şekil Önümden Çekil

Bu proje, bozulmuş verileri temizleyerek sistemi "Pazarlama Demosu" (Golden State) durumuna geri getiren bir mekanizmayı temsil etmektedir. Proje, bir kitabevi online satış sitesi senaryosu üzerine kurulmuştur.

## 👤 Hazırlayan
**Muhsin** - Bilgisayar Mühendisliği Öğrencisi

---

## 🛠️ Kullanılan Teknolojiler

### Backend
* **PHP 8.x / Laravel 11**
* **Sanctum** (JWT / Token Bazlı Güvenlik)
* **MySQL**

### Frontend
* **React.js (Vite)**
* **Axios** (API İstekleri)
* **React-Router-DOM** (Sayfalar Arası Geçiş)

---

## 🚀 Kurulum Adımları

### 1. Backend Kurulumu
1. XAMPP veya benzeri bir MySQL sunucusunu başlatın.
2. Terminalde `backend` klasörüne gidin.
3. Bağımlılıkları yüklemek için şu komutu çalıştırın:
   `composer install`
4. Veritabanını sıfırlayıp "Altın Verileri" yüklemek için:
   `php artisan migrate:fresh --seed`
5. Sunucuyu başlatın:
   `php artisan serve`

### 2. Frontend Kurulumu
1. Yeni bir terminal açıp `frontend` klasörüne gidin.
2. Paketleri yükleyin:
   `npm install`
3. Uygulamayı başlatın:
   `npm run dev`

---

## 💡 Demo Senaryosu ve Mekanizma

Ödevde istenen **State 1 -> State 2** geçişi şu şekilde simüle edilir:

### 🔴 State 1: Bad/Junk Data (Kirli Veri)
Sisteme admin paneli üzerinden anlamsız, hatalı veya test amaçlı girilmiş çöplerin (örn: "asdasd" isimli kitaplar, 999.999 TL fiyatlar vb.) olduğu durumdur. Müşteriye sunulmaması gereken bozuk yapıyı temsil eder.

### 🟢 State 2: Good/Golden State (Satışa Hazır Demo)
Bu bozuk sistemi düzeltmek ve mekanizmayı tetiklemek için:
1. `http://localhost:5173/login` adresinden giriş yapın (Admin: `admin@admin.com` | Şifre: `123456`).
2. Admin panelindeki **Demoyu Görüntüle** butonuna tıklayın.
3. Sayfanın en altındaki **SİSTEMİ SIFIRLA** butonuna basın.

**Mekanizma Nasıl Çalışır?** Bu buton tetiklendiğinde arka plandaki API, `migrate:fresh --seed` mantığıyla çalışarak tüm veritabanını temizler. Ardından önceden belirlenmiş "Kumarbaz", "Sefiller", "Cesur Yeni Dünya" gibi gerçekçi demo verilerini (Seeder) sisteme geri yükler. Vitrine dönüldüğünde sistem tamamen satışa hazır, temiz bir hale gelmiş olur.
