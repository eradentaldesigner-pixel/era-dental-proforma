# CepFirma — Metis arayüz güncellemesi (sürüm 2026-11-18.1)

Bu güncelleme `app.html` dosyasının yeni hâlidir. Uygulamanın işleyişi, veritabanı
kuralları ve PDF / baskı çıktıları korunmuştur; değişikliklerin büyük kısmı
`app.html` içinde ayrı, kaldırılabilir bloklar olarak eklenmiştir.

## Yükleme öncesi tek adım (yapıldı)

Ürün kategorileri için veritabanına bir sütun eklendi:
`veritabani/2026-11-18-urun-kategori.sql` — Supabase SQL Editor'de **çalıştırıldı**.
Başka bir ortama (ör. test veritabanı) kuruluyorsa bu dosya orada da bir kez çalıştırılmalıdır.

## Görünüm

- **Metis teması:** beyaz sol menü, nötr gri tonlar, ince çizgili kartlar, Inter yazı tipi,
  Metis butonları, form alanları, tablolar ve sekmeler (blok: `cf-metis-theme`).
- **Metis efektleri:** özet kartlarında yükselme, butonlarda hafif kalkma, sayfa / pencere /
  menü açılış animasyonları, bildirim rozetlerinde nabız. "Hareketi azalt" ayarına uyar
  (blok: `cf-effects`).

## Menü (22 → 14 öğe)

Çalışma alanı · Satış · Ürün ve servis · Operasyon · Yönetim grupları (blok: `cf-nav-module`).

| Önce | Şimdi |
|---|---|
| Verilen Teklifler + Proformalar | **Belgeler** (sekmeli) |
| Raporlar + Analitik | **Raporlar** (sekmeli) |
| Ekip ve Roller + Kullanıcılar + Ekip Durumu | **Ekip** |
| Firma Ayarları + Hesap Güvenliği | **Ayarlar** |
| Menüde "Yeni Teklif" + ana sayfada "+ Yeni kayıt" | Üst çubukta tek **+ Yeni** |
| Stok Kontrolü | **Ürünler** sayfasına yönlenir |

Her öğe uygulamanın kendi rol yetkilerine göre görünür (9 rolün tamamı test edildi).

## Yeni sayfalar

- **Dosyalar:** servis ekleri, fatura / irsaliye PDF'leri, organizasyon belgeleri tek yerde;
  önizleme, indirme, kayda gitme (salt okunur).
- **Ekip (kullanıcılar):** üye listesi, rol dağılımı, çevrimiçi durum, bekleyen davetler;
  rol değiştirme ve çıkarma uygulamanın mevcut kurallarıyla.
- **Analitik** (Raporlar içinde sekme): gelir trendi, satış hunisi, en çok satan ürünler,
  en iyi müşteriler, görüşme kaynakları.
- **Veri Kontrolü:** eksik / tutarsız kayıtları listeler, her kaydı açıp düzeltmeye yönlendirir.

## Geliştirilen sayfalar

- **Ürünler:** Metis tarzı tablo (görsel, kategori, fiyat + KDV, stok rozeti, sıralama,
  sayfalama), özet kartları, stok sağlığı ve kategori dağılımı, tablodan **± Stok**
  (giriş / satış / demo / iade / sayım düzeltme) ve **kategori** atama. "Klasik görünüm" korunur.
- **Ürün kategorileri:** form alanı, tablo sütunu, filtre, hızlı atama
  (hazır: Ağız İçi Tarayıcı, Masaüstü Tarayıcı, 3D Yazıcı, Reçine, Yedek Parça, Aksesuar,
  Sarf Malzeme, Yazılım; yeni kategori yazılabilir).
- **Siparişler:** sipariş trendi, aşama dağılımı, teslim oranı; tıklanabilir aşama sayaçları.
- **Takvim:** kompakt etkinlik etiketleri, bugün vurgusu, "+N daha", ay özeti,
  tür filtresi, yaklaşan etkinlikler.
- **Raporlar:** Metis renk paleti, teklif aktivitesi alan grafiği.

## Hata düzeltmeleri

- Katalogdaki **marka ve stok filtreleri hiç süzmüyordu** (bir CSS kuralı gizlenen satırları
  gösteriyordu) — düzeltildi.
- Raporlar menü öğesi açıkken **vurgulanmıyordu** — düzeltildi.
- **Proformalar müşteri kartına bağlanmıyordu** (`customer_id` hiç yazılmıyordu) — artık
  kaydedilen her düzenlenebilir proforma güvenli eşleşmeyle müşteri kartına bağlanır.
- Belge kaydedilirken **aynı vergi numaralı başka bir müşteri kartının adı eziliyordu** —
  artık ad farklıysa kart değiştirilmez ve uyarı gösterilir.

## Teknik

- **Yeni sürüm uyarısı:** site güncellendiğinde açık sekmelerde "Yeni sürüm hazır" çubuğu
  çıkar (yalnızca dosya başlık bilgisi sorulur). Dosya başında sürüm etiketi:
  `<meta name="cf-version" content="2026-11-18.1">` — sonraki yayınlarda bu değeri artırın.
- Inter yazı tipi Google Fonts'tan yüklenir.

## Geri alma

Eklenen her özellik `app.html` içinde kendi `id`'li bloğundadır (`cf-…-module`, `cf-…-style`).
Bir bloğu silmek o özelliği kaldırır. Uygulama kodunda yapılan küçük değişiklikler
(ürün kaydına kategori, proforma–müşteri bağlantısı, müşteri kartı koruması) dosyada
"CepFirma düzeltme" açıklamasıyla işaretlidir.
