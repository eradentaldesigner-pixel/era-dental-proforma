# Mevcut uygulamaya A4 belge şablonu yaması

Bu paket yeni bir uygulama değildir. Tam `app.html` verilmez; mevcut dosyaya uygulanacak değişiklik yaması ve değişen modüller verilir.

## Uygulama

1. Mevcut GitHub çalışma kopyasında `app.html` dosyasının bulunduğu klasörü açın.
2. `app-belge-sablonu.patch` dosyasını bu klasöre kopyalayın.
3. Önce kontrol edin, ardından uygulayın:

```sh
git apply --check app-belge-sablonu.patch
git apply app-belge-sablonu.patch
```

Yama başarısızsa zorla uygulamayın: farklı bir sürüm kullanılıyor olabilir. Yama, bu çalışma sırasında yayındaki dosyayla birebir aynı olduğu doğrulanan V8 üzerinden hazırlanmıştır. Başlangıç SHA-256: `771a79ce441db21285ca413ea467f769f30c66447a74b9ddc20d2bac90d016b6`.

4. GitHub'a bu `app.html` değişikliğini gönderin; mevcut Vercel yayını tamamlanınca açık eski sekmeleri kapatıp siteyi yeniden açın.

Yama modülleri `app.html` içine gömer. İnceleme için verilen JS/CSS dosyalarını ayrıca sunucuya yüklemek gerekmez. Yeni bağımlılık, API anahtarı veya ayrı uygulama yoktur.

## Değişen kodlar

| Kod | Değişiklik |
|---|---|
| `document-template.js` / `proeraPreparePrint()` | Mevcut formu okur; ortak A4 konteynerlerini ölçerek sayfalar. |
| `document-template.css` | Ubuntu, dinamik renkler, görünüm tercihleri ve A4 baskı kuralları. |
| `document-math.js` / `CFDocumentMath` | Tam ondalık hesap, oran bazında KDV, iskonto, tutarın Türkçe yazıyla karşılığı. |
| `ubuntu-fonts.css` | Google Fonts Ubuntu 400/700 dosyalarının gömülü halleri. |
| `pdf-typography.js` | Mevcut PDF üreticisinde aynı Ubuntu fontları; başlık ve toplam metinleri. |
| `profile-fields.js` | Firma Profili'nde Slogan ve en fazla 5 opsiyonel çözüm, mevcut yükleme fonksiyonuna bağlama. |
| `saveAllSettings()` | Slogan, çözümler ve seçilen vurgu rengini mevcut firma ayarı kaydına ekler. |
| `loadCompanySettings()` | Mevcut yüklemeyi korur, yeni kontrolleri doldurur. |
| `fields`, alıcı snapshot'ı ve yükleme | Proje / Referans alanını mevcut taslak/snapshot akışında taşır. |
| Mevcut önizleme / `window.print()` / PDF build bekleme adımları | Ölçümden önce Ubuntu fontlarının yüklenmesini bekler. |

`ensureProformaNo()`, arşiv listeleme, kopyalama ve mevcut durum/onay akışları yeniden yazılmadı. Kaydet + PDF mevcut kaydetme ve yetki kontrollerini kullanmaya devam eder. Belge türü seçimi zaten bulunduğundan ikinci bir seçim eklenmedi.

## Firma Profili veritabanı alanları

Mevcut `company_settings` tablosuna `slogan text` ve `solutions jsonb` alanları bu çalışma sırasında eklendi ve sorguyla doğrulandı. Çözümler listesi veritabanında en fazla 5 maddeyle sınırlandı. Var olan firma kayıtları değiştirilmedi; yeni alanlar boş başlar. Mevcut RLS ve izin politikaları korunur.

`firma-profili-alanlari.sql` bu eklemenin kaydıdır; mevcut projede tekrar çalıştırmanız gerekmez.

## Mevcut ayarlar

- Firma adı, logo, adres, telefon, e-posta, web ve vergi bilgileri `company_settings` / Firma Profili'nden gelir. Referans belgelerin firma içerikleri kullanılmaz.
- Kurumsal renk `corpHex` / `corporate_color`; vurgu rengi mevcut görünüm tercihleri / `accent_color` üzerinden alınır.
- Kompakt / Normal / Büyük yalnız kullanıcının seçimiyle uygulanır; otomatik küçültme yoktur.
- Temiz / Çizgili / Yumuşak ve Logo, Banka, Ödeme Koşulları, Notlar, Geçerlilik, Teklifi Veren seçenekleri uygulanır.
- Ürün Kodu açıksa sütun çıkar, kapalıysa tamamen kalkar. GTİP, Marka, Model, Seri No, Menşei yalnız işaretliyse alt satırda görünür.
- Birden fazla KDV oranı varsa ürün alt satırında oran bilgisi, toplamda oran bazında KDV satırları vardır.
- Birim mevcut satırda varsa kullanılır; uygulamanın birim verisi bulunmayan satırlarda mevcut kullanımına uygun Adet gösterilir.
- İskonto mevcut formda `discount` veya `discountAmount` alanı varsa okunur. Yeni satış/iskonto kayıt sistemi eklenmedi.
- TL belgelerde kur / TL karşılığı satırları yoktur. Döviz belgelerinde mevcut kur ve kur zamanı kullanılır.
- Proforma kaşe/imza kaynağı mevcut yetkili `#paper` çıktısından alınır. Teklifte imza alanı yoktur.

## Sayfalama

Tek bir `CFDocumentTemplate.render()` önce üst bilgiyi, müşteri/belge bilgilerini ve tabloyu oluşturur. Gerçek DOM blok ölçümleri A4 içerik sınırıyla karşılaştırılır. Satır bölünmez, yeni sayfada tablo başlığı tekrarlanır. Toplamlar, açıklamalar, satıcı/ödeme bilgileri ve proforma imzaları tek alt grup olarak taşınır. Her sayfada üst bilgi ve Sayfa X / Y vardır; büyük belge başlığı yalnız ilk sayfadadır.

Bir alt grup, tek A4'ün kullanılabilir yüksekliğinden daha uzunsa okunmaz hale küçültmek yerine açık hata verir. Çok uzun açıklamaları kısaltmak veya hesap sayısını azaltmak gerekir.

## Örnekler ve doğrulama

- `ornek-7-kalem.pdf`: mevcut katalogdan türetilen kısa teklif; **Kompakt**, ayrıntılar/notlar/ödeme/banka kapalı; 1 sayfa. Katalogda bulunan 6 klinik ürün, 7 kalemlik test için bir ürün tekrarlanarak kullanılmıştır.
- `ornek-8-kalem.pdf`: son mevcut proformanın 2 ürünü 8 kaleme genişletilmiştir; **Normal**, ayrıntılar ve alt bölümler açık; 2 sayfa. Tablo ilk sayfada, alt grup ikinci sayfada.
- Örnekler QA numaralıdır ve arşive kaydedilmemiştir. Sayfa sayısı satır sayısına zorla bağlanmaz.
- `dogrulama-onizleme.html`: tarayıcıda açın. Renk, slogan, logo, font, tablo stili, kod ve logo görünürlüğünü değiştirin; ardından Yazdır / PDF düğmesini kullanın. “7 / 8 kalem testini çalıştır” gerçek tarayıcı DOM ölçümleriyle kontrolleri yeniden çalıştırır.
- `hesaplama-testleri.cjs`: Node ile `node hesaplama-testleri.cjs`; dış bağımlılık gerektirmez.

Yerel doğrulamada JS sayfalama motoru, bağımsız HTML yerleşim işleyicisinden alınan fiziksel ölçülerle çalıştırıldı; örneklerin 1/2 sayfalı PDF'leri render edilip görsel olarak incelendi. 42 hesaplama kontrolü, Türkçe sayı yazımı, tekrarlanan üst/alt bilgi, bölünmeyen alt grup ve yama uygulaması kontrol edildi.

**Sınır:** Canlı uygulamada Chromium/Safari ve telefon/WhatsApp uçtan uca denemesi bu ortamda yapılmadı. Bağımsız HTML işleyicisi tarayıcının birebir yerine geçmez. Bu nedenle tarayıcı doğrulama ekranı ve tekrar çalıştırılabilir testler pakette bulunur; canlı siteye yayımlandığı iddia edilmez.
