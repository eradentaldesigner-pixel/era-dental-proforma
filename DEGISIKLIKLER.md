# CepFirma — Metis arayüz güncellemesi (sürüm 2026-11-18.13)

Bu güncelleme `app.html` dosyasının yeni hâlidir. Uygulamanın işleyişi, veritabanı
kuralları ve PDF / baskı çıktıları korunmuştur; değişikliklerin büyük kısmı
`app.html` içinde ayrı, kaldırılabilir bloklar olarak eklenmiştir.

## Veritabanı adımları

Supabase SQL Editor'de **çalıştırıldı**. Başka bir ortama (ör. test veritabanı) kuruluyorsa
bu dosyalar orada da birer kez çalıştırılmalıdır:

1. `veritabani/2026-11-18-urun-kategori.sql` — ürünlere kategori sütunu.
2. `veritabani/2026-11-18-dosyalar.sql` — dosya yöneticisi: `company_folders`, `company_files`
   tabloları, özel `company-files` depolama alanı (dosya başına 50 MB), erişim kuralları ve
   hazır klasörler. **(çalıştırıldı)**
3. `veritabani/2026-11-18-kase-imza-kaldir.sql` — Ayarlar > Kaşe ve İmza'da **kaldırma**
   işlemi için sunucu fonksiyonu (yalnızca şirket sahibi / yönetici). **(çalıştırıldı)**
4. `veritabani/2026-11-18-plan-katilimcilar.sql` — plan / etkinliklerde **birden fazla katılımcı**
   (`calendar_events.participant_ids`). **(çalıştırıldı)**
5. `veritabani/2026-11-18-mesajlar.sql` — **Mesajlar** sayfası: `company_messages`,
   `company_message_reads` tabloları, erişim kuralları ve anlık mesaj (Realtime).

## Görünüm

- **Metis menü ve üst çubuk ayrıntıları:** menüde Metis'in Bootstrap Icons ikonları, renkli menü
  rozetleri (onay bekleyen belgeler kırmızı, açık servisler mavi, yeni özellikler yeşil "Yeni"),
  üst çubukta tam ekran düğmesi, Ctrl+K ile arama, logo yüklenemezse Metis tarzı marka kutusu
  (blok: `cf-metisui-module`; ikonlar Bootstrap Icons 1.11.3 (MIT) SVG olarak dosyaya gömülü,
  internet bağlantısı gerektirmez — üst çubuktaki tam ekran, bildirim ve rehber ikonları dahil).
- **Metis yazı ölçüleri:** sayfa başlıkları 20px/600, kart başlıkları 15px/600, özet kartı değeri
  26px/600 ve etiketi 11px büyük harf, menü / buton / form alanı / tablo hücresi 14px, tablo
  başlıkları büyük harf. PDF belge şablonlarına dokunmaz (blok: `cf-typography-style`).
- **Açık / koyu tema:** üst çubuktaki ay / güneş düğmesi; tercih cihazda hatırlanır.
  Koyu tema yalnızca ekranda uygulanır, PDF / baskı çıktıları açık renk kalır; görseller,
  logolar ve belge önizlemeleri ters çevrilmez (blok: `cf-dark-module`, `cf-dark-boot`).
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

- **Mesajlar:** ekip içi yazışma — "Genel" kanal (tüm ekip) ve kişiye özel sohbetler, anında
  düşen mesajlar, menüde okunmamış sayısı, kişi arama, eski mesajları yükleme
  (blok: `cf-messages-module`).
- **QR ile stok:** ürün tablosunda her ürüne "QR" düğmesi (etiket + yazdırma), katalogda
  "QR etiketleri" (listelenen ürünlerin A4 etiket sayfası) ve "QR okut" (kamera). Etiket telefonun
  kendi kamerasıyla okutulunca CepFirma açılır ve ürünün stok giriş / çıkış penceresi gelir
  (`app.html?stok=ÜRÜN_NO`; blok: `cf-qrstock-module`).
- **Günlük Plan (Takvim > Günlük plan):** seçilen günün sade bilgi ekranı — saat, tür, yer,
  sorumlu, katılımcılar, notlar ve durum (bekliyor / devam ediyor / gecikti / tamamlandı);
  önceki / sonraki gün, "Sadece benim" filtresi, plandan forma geçiş.
- **Dosyalar (Metis dosya yöneticisi):** klasörler (Kataloglar, Broşürler, Videolar, Müzikler,
  Office Dosyaları, Görseller, Diğer + yöneticilerin açtığı klasörler), sürükle-bırak çoklu
  yükleme (türüne göre otomatik klasör), görsel / PDF / video / ses önizleme, indirme,
  7 gün geçerli **paylaşım bağlantısı**, yeniden adlandırma, taşıma, toplu işlem, kart / liste
  görünümü, arama ve kullanılan alan. "Kayıt ekleri" bölümü servis, sipariş ve organizasyon
  dosyalarını listeler. Görüntüleyici rolü yükleyemez; dosyayı yükleyen ya da yöneticiler silebilir.
- **Ekip (kullanıcılar):** üye listesi, rol dağılımı, çevrimiçi durum, bekleyen davetler;
  rol değiştirme ve çıkarma uygulamanın mevcut kurallarıyla.
- **Analitik** (Raporlar içinde sekme): gelir trendi, satış hunisi, en çok satan ürünler,
  en iyi müşteriler, görüşme kaynakları.
- **Veri Kontrolü:** eksik / tutarsız kayıtları listeler, her kaydı açıp düzeltmeye yönlendirir.

## Geliştirilen sayfalar

- **Hızlı belge (teklif / proforma) — yan yana görünüm:** geniş ekranda solda form ve belge özeti,
  sağda belgenin canlı önizlemesi (yarı yarıya); yazdıkça güncellenir. Üstteki "Yan yana"
  düğmesiyle açılıp kapanır (blok: `cf-split-style` / `cf-split-module`).
- **Ödeme şartları:** Peşin, %30 + %70, Bonus 6 Taksit, Leasing hazır düğmeleri kaldırıldı; şartlar
  elle yazılır (blok: `cf-terms-style`).
- **Ticari açıklama:** "Ticari açıklamayı notlara ekle" düğmesi firmanın 5 maddelik standart
  metnini ekler ("Siparişin kesinleşmesi, müşteri onayının yazılı olarak iletilmesiyle…").
- **Plan / etkinlik — Hızlı ziyaret (il içi):** formun üstünde "Hızlı ziyaret" / "Detaylı plan"
  seçimi. Hızlı modda yalnızca ne yapılacak (Klinik ziyareti, Demo, Tarama hizmeti, Kurulum,
  Servis…), klinik / müşteri, ilçe, gün (Bugün / Yarın…) ve saat sorulur; ulaşım, otel, transfer
  alanları gizlenir, plan yalnızca takvime yazılır. Başlık kendiliğinden oluşur
  ("Hakan Uzun Diş Kliniği – Demo"). Yeni türler: Demo, Tarama Hizmeti.
- **Ana sayfa — Bugünün planım:** kişinin bugünkü planları, yarının özeti, "+ Hızlı ziyaret" ve
  "Günlük plan" düğmeleri (blok: `cf-quickplan-module`).
- **Plan / etkinlik:** sorumlu çalışan + birden fazla katılımcı seçimi (yeşil = sorumlu, mavi =
  katılımcı); Personel alanı seçilenlerle otomatik dolar. Sorumlu ve katılımcılara "Size sorumlu
  olarak atandı / Katılımcı olarak eklendiniz" bildirimi gider, plan İşlerim ekranına düşer.
- **Giriş / kayıt:** şifre alanlarında göster / gizle (göz) düğmesi.
- **Sevkiyat:** kargo takip numarası girilen sevkiyatta "Müşteriye kargo bilgisini gönder" —
  müşterinin e-postasına firma, takip numarası ve (Yurtiçi, UPS, DHL için) takip bağlantısı
  içeren hazır bir e-posta taslağı açar (blok: `cf-plans-module`).
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

- **QR okut — kamera açılıyor ama okumuyordu:** kamera yüksek çözünürlük ve sürekli netlemeyle
  açılır; görüntünün ortası tam çözünürlükte taranır; tarayıcının kendi okuyucusu yalnızca QR'ı
  gerçekten destekliyorsa kullanılır, jsQR her zaman yedekte çalışır. Ek yollar: "Fotoğrafla okut"
  (telefonun kamerasıyla çekilen fotoğraftan okur) ve "Listeden seç".
- **QR çalışmıyordu ("bileşen yüklenemedi / internet" uyarısı):** QR çizme ve okuma bileşenleri
  internetten (cdnjs / jsDelivr) yükleniyordu; ağ veya reklam engelleyici bunları engelleyince QR
  açılmıyordu. İkisi de artık dosyaya gömülü (`cf-qr-libs`), internet bağlantısı gerektirmez.
- **Proforma sayfa düzeni:** belge tek sayfaya sığmayınca kapanış bölümünün tamamı 2. sayfaya
  atılıyor, 1. sayfanın yarısı boş kalıyordu. Artık açıklamalar / toplamlar, firma ve banka
  bilgileri, imzalar sırayla yerleştirilir; sığan kısım 1. sayfada kalır.
- **Plan formu boşluğa tıklayınca kapanıyordu:** plan, servis, görüşme ve müşteri formları artık
  pencere dışına tıklanınca kapanmaz (girilen bilgi kaybolmaz); Kapat düğmesiyle kapanır.
- **Saat seçimi:** tarayıcının saat penceresi yerine saat + dakika listesi (5 dakikalık adımlar,
  "Saat yok" ve temizle düğmesi); kayıtlı 11:26 gibi saatler de korunur.
- **Gereksiz şifre önerileri:** İlçe / adres gibi alanlarda tarayıcı kayıtlı şifre öneriyordu —
  giriş alanları ayrı bir forma bağlandı, öneriler yalnızca giriş ekranında çıkar.
- **Bildirimler:** şirkete sonradan katılan kişi, kendisi katılmadan önce oluşmuş ortak
  bildirimleri (stok, onay, sipariş, talep) artık görmez; sınır `company_members.created_at`.
- **Proforma IBAN:** banka satırı hesabın para birimiyle başlar (`TL IBAN`, `EUR IBAN`, `USD IBAN`);
  "TR" eksik girilmiş 24 haneli IBAN'lara TR eklenir ve 4'lü gruplar halinde yazılır.
- **Bildirimler:** onaylanmış proformalar için "İncelemenizi bekliyor" bildirimleri okunmamış
  olarak kalıyor ve zildeki sayıyı şişiriyordu — artık belge onay beklemiyorsa gösterilmez.
- **Ayarlar > Şirket logosu:** kaldırma eklendi ("Ayarları Kaydet" ile kaydedilir; onaylanmış
  eski proformalar logolarını korur, logo dosyası silinmez).
- **Ayarlar > Kaşe ve İmza:** kaldırma eklendi (sunucu fonksiyonu: yukarıda 3. adım).
- **Ayarlar > Bildirimler sekmesi:** tıklanınca arkadaki ayar ekranı boş kalıyordu — düzeltildi.
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
  `<meta name="cf-version" content="2026-11-18.13">` — sonraki yayınlarda bu değeri artırın.
- Inter yazı tipi Google Fonts'tan yüklenir.

## Geri alma

Eklenen her özellik `app.html` içinde kendi `id`'li bloğundadır (`cf-…-module`, `cf-…-style`).
Bir bloğu silmek o özelliği kaldırır. Uygulama kodunda yapılan küçük değişiklikler
(ürün kaydına kategori, proforma–müşteri bağlantısı, müşteri kartı koruması) dosyada
"CepFirma düzeltme" açıklamasıyla işaretlidir.
