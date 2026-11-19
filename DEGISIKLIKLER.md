# CepFirma — Metis arayüz güncellemesi (sürüm 2026-11-19.37)

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
6. `veritabani/2026-11-18-profil-fotografi.sql` — **profil fotoğrafı**: `avatars` depolama alanı
   (özel, 2 MB) ve `user_avatars` tablosu; fotoğrafı yalnızca aynı şirkettekiler görür.
7. `veritabani/2026-11-18-plan-yetki.sql` — **plan düzenleme yetkisi**: planı yalnızca oluşturan
   kişi ve şirket sahibi / yöneticisi değiştirir veya siler; atanan kişiler yalnızca "tamamlandı"
   durumunu ve seyahat hazırlık maddelerini işaretleyebilir (veritabanı tetikleyicisi).
8. `veritabani/2026-11-18-gorev-yanit.sql` — **görev kabul / red** (`calendar_assignment_responses`) ve
   planın **konum linki** (`calendar_events.location_url`); plan koruma kuralı konum linkini de kapsar.
9. `veritabani/2026-11-18-gorev-tamamlama.sql` — görev yanıtlarına **"tamamlandı"** durumu (isteğe bağlı not).
10. `veritabani/2026-11-18-servis-asama.sql` — Teknik Servis **aşamaları** (`technical_service_records.stage`) ve
    aşama geçmişi (`technical_service_stage_log`). Mevcut kayıtlara dokunmaz.
11. `veritabani/2026-11-19-servis-atama.sql` — Teknik Servis **teknisyen ataması ve kabul / red**
    (`assigned_by`, `assignee_status`, `assignee_reason` sütunları, `cf_service_respond` fonksiyonu).
12. `veritabani/2026-11-19-servis-sekli.sql` — Teknik Servis **servis şekli** (atölyede / yerinde / uzaktan
    bağlantı), bağlantı aracı ve bağlantı ID'si. Mevcut kayıtlar "atölyede" sayılır.
13. `veritabani/2026-11-19-servis-musteri.sql` — servis kaydının **kayıtlı müşteriye bağlantısı** (`customer_id`),
    seri numarası dizini; adı tek ve tam eşleşen mevcut kayıtlar müşteriye bağlanır.
14. `veritabani/2026-11-19-servis-ucret.sql` — Teknik Servis **ücret** (işçilik, parça, KDV, para birimi),
    **müşteri onayı** (durum, not, zaman) ve **ödeme** (durum, tarih).
15. `veritabani/2026-11-19-servis-parca.sql` — Teknik Servis **stoktan parça kullanımı** (`technical_service_parts`,
    `cf_service_use_part`, `cf_service_return_part`): stoktan düşer / geri ekler ve stok hareketi yazar.
16. `veritabani/2026-11-19-servis-imza.sql` — Teknik Servis **dijital teslim imzası** (`delivery_signature`,
    `delivery_signed_by`, `delivery_signed_at`; `cf_service_sign` fonksiyonu).

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

- **Gelen İşler:** başkasının size atadığı planlar mesaj kutusu gibi listelenir — atayanın fotoğrafı,
  "… size bir iş atadı", iş ("Dentopol – Tarama hizmeti"), zaman, yer, Sorumlu / Katılımcı / Seyahat etiketi.
  Okunmamışlar kalın ve menüde kırmızı rozetle; Tümü / Okunmamış / Yaklaşan / Geçmiş sekmeleri; dokununca
  salt okunur plan kartı. Bildirimden açılan atama Gelen İşler'in üstünde kart olarak açılır; okundu bilgisi
  bildirim zili ile ortak (blok: `cf-inbox-module`).
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

- **Teknik Servis — QR cihaz etiketi ve teslim imzası:** formda ve ayrıntıda "🏷 Etiket": servis no, müşteri, cihaz,
  seri no, kabul tarihi ve QR; 62×29 / 50×30 mm etiket yazıcısı veya A4. QR telefon kamerasıyla ya da uygulamadaki
  QR okuyucuyla okutulunca servis kaydı açılır. "✍ Müşteri imzası al": teslim alan adı + parmakla / kalemle imza;
  imza, ad ve zaman servis formu çıktısındaki "Müşteri / Teslim Alan" bölümüne basılır. (`cf-svclabel-module`)
- **Teknik Servis — stoktan parça:** formda "Stoktan kullanılan parçalar": parça adı / koduyla seçilip adet girilir,
  onaydan sonra stoktan düşer ve stok hareketlerine "TS-… servisinde kullanıldı" yazılır; stok yetersizse eklenmez.
  "Stoğa geri al" ile iade. Servis parçaları önce listelenir; işaretsiz ürünleri yalnızca yönetici kullanabilir.
  Parça toplamı (liste fiyatı) "Parça" ücretine aktarılabilir; servis formu çıktısında parçalar listelenir.
  (`cf-svcparts-module`)
- **Teknik Servis — ücret, müşteri onayı ve ödeme:** formda "Ücret ve Müşteri Onayı" bölümü (işçilik + parça,
  KDV, TL / € / $, anlık toplam; onay: gerekmez / bekleniyor / onaylandı / reddedildi + not; ödeme: ücretsiz /
  ödenmedi / ödendi). Garanti kapsamında → onay gerekmez, ücretsiz. Onay gelince aşama "Onarımda"ya geçer; garanti
  dışı işte onaysız onarıma / teslime geçerken uyarır. WhatsApp "Onay isteği"ne tahmini tutar, "Cihaz hazır"a
  ödenecek tutar eklenir. Listede "Onay bekliyor" / "Ödenmedi", ayrıntıda ücret özeti, filtrede "Ödemesi bekleyen",
  servis formu çıktısında "Ücret ve müşteri onayı" bölümü. (`cf-svccost-module`)
- **Teknik Servis — müşteri bağlantısı ve cihaz geçmişi:** "Kayıtlı müşteriden seç" kaydı müşteriye bağlar
  (silinmiş müşteriler listede çıkmaz); ad elle yazılıp tek bir kayıtlı müşteriyle tam eşleşirse "Bu müşteriye bağla"
  önerilir; bağlı kayıtta "Müşteri geçmişi" kısayolu. Müşteri geçmişi servisleri bağlantıdan da bulur. Aynı seri
  numaralı cihazın önceki servisleri formda ve ayrıntı panelinde ("⚠ Bu cihaz daha önce N kez servise geldi"),
  tıklayınca o kayıt açılır. (`cf-svccust-module`)
- **Teknik Servis — uzaktan bağlantı ve yerinde servis:** formun başında "Servis şekli" (Cihaz servise geldi /
  Yerinde / Uzaktan bağlantı). Uzaktan bağlantıda bağlantı aracı (AnyDesk, TeamViewer, RustDesk…) ve bağlantı ID'si
  (şifre saklanmaz). Aşama adları şekle göre ("Talep alındı → Uzaktan inceleniyor → … → Çözüldü"), tarih alanı
  "Talep / Çözüm tarihi", aksesuar alanı gizlenir. Listede "🖥 Uzaktan" / "📍 Yerinde" etiketi, filtrede servis şekli,
  WhatsApp metinleri uzaktan / yerinde servise göre. Telefonda "Müşteriye mesaj" düğmesi simgeye küçüldü.
  Servis formundaki durum rozeti aşama adını gösterir. (`cf-svcmode-module`)
- **Teknik Servis — teknisyen ataması:** sorumlu hesap seçilip kaydedilince teknisyenin telefonuna bildirim
  ("… size bir servis işi atadı · TS-… · müşteri · cihaz · ACİL"). Gelen İşler'in üstünde "Servis işlerim";
  "Kabul et" / "Reddet (sebep)" → atayana bildirim, yanıt bekleyenler rozete eklenir. Servis listesinde ve ayrıntıda
  teknisyenin yanıtı ve red sebebi. Teknisyen aşamayı "Hazır, teslim bekliyor" yapınca atayana bildirim. Bildirime
  dokununca servis formu açılır. Supabase fonksiyonu `cepfirma-push` (action: service) ve `push-sw.js` güncellendi.
  (`cf-svcassign-module`)
- **Teknik Servis — müşteriye mesaj:** ayrıntıda ve formda "💬 Müşteriye mesaj": aşamaya göre hazır WhatsApp metni
  (teslim alındı, onay isteği, parça bekleniyor, hazır, teslim edildi, yapılamadı…), düzenlenebilir, kopyalanabilir.
- **Teknik Servis — aşamalar:** Teslim alındı → Arıza tespiti → Müşteri onayı bekleniyor → Parça bekleniyor →
  Onarımda → Hazır, teslim bekliyor → Teslim edildi / Yapılamadı-iade. Aşama seçilince eski durum alanı otomatik
  eşlenir (raporlar, ana sayfa sayıları bozulmaz). Özet kutuları ve filtre aşamalara göre; durum geçmişinde aşama
  değişiklikleri ve kimin yaptığı. "Teslim edildi" seçilince teslim tarihi bugün olarak dolar.
  Veritabanı: `veritabani/2026-11-18-servis-asama.sql`. (`cf-svcstage-module`)
- **Teknik Servis — kaç gündür serviste:** listede, kartlarda ve ayrıntıda "N gündür serviste" (4–7 gün sarı,
  7 günden fazla kırmızı), teslim edilenlerde "N günde". "7+ gündür serviste" kutusu ve filtresi; ana sayfada
  "Benden beklenenler"e uzun bekleyen cihazlar düşer. Bu kısım SQL olmadan da çalışır.
- **Ana sayfa sadeleşti:** yalnızca yarım kalan belge uyarısı ve iş akışı bölümleri kalır. Grafikler yalnızca
  Raporlar > Analitik'te; Yaklaşan Planlar, Satış / Operasyon / Stok panelleri, Ekip durumu, Bugünün planım ve eski
  "İşlerim" düğmesi kaldırıldı. Karar bekleyen talepler "Benden beklenenler"e, döviz kuru "Kısa özet"e taşındı.
  "Ekip bugün"de planı olmayan kişi "🏢 Ofiste" görünür (varsa yarının planı altında); "+ Hızlı ziyaret" düğmesi.
- **Ana sayfa — firmanın iş akışı:** (1) Benden beklenenler: onay bekleyen proformalar, reddedilen / 24 saattir
  yanıtsız görevler, takip günü geçen görüşme ve servisler; (2) Satış akışı: Teklif → Proforma → Onay bekliyor →
  Onaylandı → Sipariş → Sevkiyatta, adet ve tutar, geciken aşama sarı; (3) Ekip bugün: kimin hangi işte olduğu ve
  görev durumu; (4) Son hareketler: son 3 günde firmada olanlar; (5) Kısa özet: bu ay proforma toplamı ve geçen
  aya göre değişim, kritik stok, açık servis. Çalışanlar yalnızca kendi işlerini görür, tutarlar gizlenir.
  Eski saat / hava, sayı kartları ve Öncelikli İşler gizlendi (blok: `cf-homeflow-module`).
- **İşi tamamladım:** görevi kabul eden kişi kartta "✓ İşi tamamladım" der (isteğe bağlı not); plan takvimde
  tamamlandı olur, işi atayana uygulama içi ve telefon bildirimi gider ("Görkem Köksel görevi tamamladı · … · Not: …").
  Yanlışlıkla basılırsa "Tamamlanmadı, geri al". İşi atayan kartta "✓✓ işi tamamladı" ve notu görür; Gelen İşler'de
  "Tamamladınız" etiketi. `cepfirma-push.ts` yeniden Deploy edilmeli.
- **Hızlandırma:** sayfa 3,75 MB → 2,23 MB (sıkıştırılmış indirme ~1,24 MB → ~0,8 MB). Büyük bileşenler
  `vendor/` klasörüne taşındı ve yalnızca gerektiğinde yüklenir: grafikler (ApexCharts), takvim (FullCalendar),
  QR (qrcode-generator, jsQR), PDF (html2canvas, jsPDF). Sitedeki dosyaya ulaşılamazsa internet yedeği
  kullanılır. **`vendor/` klasörü de GitHub'a (app.html'in yanına) yüklenmeli.**
- **Mobil uygulama görünümü:** alt sekme çubuğu Ana Sayfa · Gelen İşler · Takvim · Mesajlar · Menü (okunmamış
  sayıları ile; Teklifler menüde "Belgeler"). Telefonda tablolar kart görünümüne geçer (Müşteriler, Ürünler,
  Servis, Ekip, Veri Kontrolü). Sohbet ekranı üst ve alt çubuk arasında tam ekran. Plan kartı ve QR penceresi
  alttan açılan sayfa. iPhone alt çentiği için boşluk. 18 sayfa 375 px genişlikte taşmasız
  (blok: `cf-mobile-module`).
- **Görev kabul / red:** atanan kişi iş kartında "Kabul et" / "Reddet" seçer (red için sebep zorunlu,
  yanıt sonradan değiştirilebilir). Yanıt işi atayana uygulama içinde ("Görkem görevi reddetti · … · Sebep: …")
  ve telefona gider; bildirime dokununca plan açılır, başka birine atanabilir. İşi atayan kişi kartta ve plan
  formunda herkesin yanıtını görür; Gelen İşler'de "Yanıt bekliyor / Kabul ettiniz / Reddettiniz" etiketi.
- **Konum linki:** plan formunda "Konum linki" (Google Maps bağlantısı yapıştır veya "Adresten oluştur");
  iş kartında "📍 Haritada aç" (link yoksa adresten "Haritada ara") (blok: `cf-respond-module`;
  `cepfirma-push.ts` yeni `respond` işlemi ile yeniden Deploy edilmeli).
- **Bildirimden doğrudan plan kartı:** atanan kişi bildirime dokununca takvim sayfası açılmadan, mesaj
  gibi bir kartta işi görür (ne, ne zaman, nerede, kimler, not, seyahat). Plana atanmış kişi yönetici olsa
  bile planı yalnızca oluşturan düzenler. Telefon bildirimi `app.html?plan=NO` ile doğrudan kartı açar
  (`cepfirma-push.ts` yeniden Deploy edilmeli).
- **Telefona plan ataması bildirimi (uygulama kapalıyken):** plan kaydedilince yeni eklenen sorumlu /
  katılımcılara telefon bildirimi gider: "CepFirma — Dentopol – Tarama hizmeti / Yarın 10:00 · Beykoz ·
  Sorumlu olarak atandınız". Sunucu fonksiyonu `supabase-fonksiyon/cepfirma-push.ts` güncellendi
  (yeni `assign` işlemi; mevcut hatırlatma ve test bildirimleri aynen çalışır). Supabase > Edge Functions >
  cepfirma-push içine yapıştırılıp Deploy edilmelidir.
- **Plan özeti ve konuyla ilgili bildirimler:** plana atanan kişi bildirime / plana tıklayınca
  düzenleme formu yerine salt okunur "Plan özeti" görür (ne, ne zaman, nerede, sorumlu, katılımcılar,
  not, seyahat planı: ulaşım, gidiş / dönüş, otel, transfer, hazırlık). Bildirim metni:
  "Dentopol – Tarama hizmeti · Yarın 10:00 · Beykoz · Sorumlu olarak atandınız"; seyahatlerde
  "Seyahat" ibaresi. Uygulama açıkken yeni atamada cihazda "CepFirma" başlıklı bildirim
  (izin verildiyse). Takvimde sürükle-bırak yalnızca oluşturan / yönetici için (blok: `cf-plansum-module`).
- **Sneat bileşenleri (Metis görünümü korunarak):**
  - **Profil fotoğrafı:** Ayarlar'da "Profil fotoğrafı" kartı (yükle / kaldır, otomatik kare kırpma);
    fotoğraf üst çubukta, sol menüde, Ekip, Mesajlar ve plan katılımcılarında görünür
    (blok: `cf-avatar-module`).
  - **Grafikler (ApexCharts 3.54.1, MIT, dosyaya gömülü):** ana sayfa ve Analitik'te "Belge özeti"
    (son 6 ay proforma / teklif sütun grafiği) ve "Proforma durumu" (halka grafik).
  - **Extended UI:** ince özel kaydırma çubukları, metin ayırıcı (`.cf-divider`).
  - **Bildirimler ve ipuçları:** ikonlu, kapatılabilir bildirim kartları; ikon düğmelerinde
    koyu baloncuk ipucu (blok: `cf-sneatui-module`).
- **Takvim — yeni görünüm (Sneat tarzı, FullCalendar):** solda + Yeni Plan, küçük ay takvimi
  (planlı günler noktalı), renkli tür filtreleri ve "Sadece benim planlarım"; sağda Ay / Hafta /
  Gün / Ajanda. Boş güne veya saate tıklayınca (sürükleyerek saat aralığı seçilebilir) yeni plan,
  plana tıklayınca plan formu açılır; yetkili kişi planı sürükleyip bırakarak tarih / saat
  değiştirebilir. Telefonda Ajanda görünümüyle açılır. "Klasik görünüm" ile eski takvime dönülür.
  FullCalendar 6.1.15 (MIT) dosyaya gömülü (blok: `cf-fc-style` / `cf-fullcalendar-lib` / `cf-fc-module`).
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

- **Teknik Servis:** telefonda / dar ekranda kayda dokununca ayrıntıya kayar, "‹ Listeye dön" düğmesi eklendi
  (önceden ayrıntı ekranın dışında açılıyordu). "Acil" kayıtlar listede, kartlarda ve ayrıntıda kırmızı rozetle
  görünür. Kayıt numarası tek satır; arama, durum ve "Yenile" tek satırda; özet kutuları sıkılaştı.
  Servis sorumlusu tek alan oldu: hesap seçilince ad otomatik dolar, hesabı olmayan biri için "Diğer (hesabı yok)".
  Teknisyen adı boş ama hesap atanmış kayıtlarda listede hesabın adı gösterilir. (`cf-svcfix-module`)
- **Talepler ve Onaylar:** menüde iki satıra taşan ad kısaldı ("Talepler"), menü yazıları tek satır, "Yeni" rozetleri
  küçüldü (Gelen İşler'de kaldırıldı). Sayfada sıkışan filtre satırı (arama kutusu 26 px'e düşüyordu) düzenlendi:
  arama tam genişlik, altında durum ve "Yenile". Seçili sekme belirgin, gereksiz boşluk ve çift çerçeve kaldırıldı.
  Telefonda talebe dokununca ayrıntıya gider, "‹ Listeye dön" düğmesi (blok: `cf-reqfix-module`).
- **Mobil alt çubuk yanlış sekmeyi gösteriyordu** (Talepler açıkken "Takvim"): artık açık sayfaya göre doğru sekme,
  listede olmayan sayfalarda "Menü".
- **Menü sürekli yeniden diziliyordu (pil / ısınma):** çalışma alanı yenilemesi, talepler modülünün başlığı her
  seferinde silip kurması ve menü düzenleyicinin her şeyi baştan dizmesi birbirini tetikliyordu (boşta 5 saniyede
  2.600+ değişiklik → ~100). Menüde iki kez görünen "Ekip" ve fazladan "EKİP VE TALEPLER" başlığı da düzeldi.
- **Mobil Proformalar / Teklifler kartlarında işlem düğmeleri harf harf kırılıyordu** ("Ko-py-al-a"): düğme içeren
  satırlarda etiket üstte, düğmeler tam genişlikte iki sütunlu düzende; düğme yazıları hiçbir yerde harf harf
  bölünmez. Tüm sayfalar telefonda sıkışan yazı için tarandı.
- **Telefon bildirimi plan kartını açmıyordu:** sitedeki `push-sw.js` sunucunun gönderdiği plan bağlantısını
  yok sayıyordu. Güncellenen `push-sw.js` yalnızca `/app.html?plan=SAYI` biçimini kabul eder ve kartı açar
  (uygulama açıksa `cepfirma-open-plan` mesajıyla). **`push-sw.js` de GitHub'a yüklenmeli.**
- **Gereksiz sürekli işlem (pil):** mobil tablo kartları ve alt çubuk kendi değişikliklerini tekrar tetikliyordu;
  boşta 6 saniyede 489 sayfa değişikliği → 84'e indi.
- **Mobil hızlı belge:** "Yan yana" düğmesi telefonda görünüyordu, gizlendi.
- **Mobil plan formu:** Kaydet düğmesi formun altında sabit; uzun formda aşağı kaydırmak gerekmez.
- **Mobilde Mesajlar / Gelen İşler açılmıyordu:** sayfa açılıyor ama menü kapanmadığı için üstünde kalıyordu;
  menüden açılan her sayfada menü artık kapanır.
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
  `<meta name="cf-version" content="2026-11-19.37">` — sonraki yayınlarda bu değeri artırın.
- Inter yazı tipi Google Fonts'tan yüklenir.

## Geri alma

Eklenen her özellik `app.html` içinde kendi `id`'li bloğundadır (`cf-…-module`, `cf-…-style`).
Bir bloğu silmek o özelliği kaldırır. Uygulama kodunda yapılan küçük değişiklikler
(ürün kaydına kategori, proforma–müşteri bağlantısı, müşteri kartı koruması) dosyada
"CepFirma düzeltme" açıklamasıyla işaretlidir.
