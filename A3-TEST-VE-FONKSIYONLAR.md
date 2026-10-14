# A3 — Taslak koruma / opsiyonel bulut

Bu app.html A1+A2+A3 içerir. ZIP'i çıkarıp app.html ile mevcut dosyayı değiştirin. Diğer proje dosyaları korunur. Dosya yeniden biçimlendirilmedi; kütüphane/fontlar değiştirilmedi.

## Etkin tanımlar / değişiklikler
- collectDraft(): tek tanım; belge türü ve teklif bağlamını da saklar.
- saveDraftQuietly(): ilk gövde yerel kayıt sonrası bulut kuyruğunu çağırır. Son etkin tanım secureDraftBase sarmalayıcısıdır; bu güvenlik sarmalayıcısı korunmuştur. Cihaz taslağını kapatma tercihi bulut yükleme/geri yüklemede de korunur.
- restoreDraft(): tek mevcut gövde; ortak applyDraftData() ile geri yükler. Yerel taslak yoksa manuel açma bulut taslağını denemeye yönlenir.
- applyDraftData(): yeni yardımcı; mevcut alan doldurma kodunun aynısını kullanır, proforma/teklif bağlamını düzeltir.
- bootWorkspace(): yerel taslak ardından opsiyonel bulut kontrolü; tablo eksikse yerel akış sürer.
- resetForm(): asıl proforma gövdesi ve son offerResetBase sarmalayıcısı; kaydedilmemiş değişiklik varsa silinme uyarısını açık verir.
- cfUnsaved.allow(): quote grubu varsa Kaydedilmemiş değişiklikler silinecek mesajı. cfUnsaved.quoteHasChanges() yeni sorgu. Yeni Proforma'nın son appNavigate ve startBase sarmalayıcıları bu mevcut korumayı kullanmaya devam eder.
- cfCloudDrafts.queue/restore(): yeni, opsiyonel bulut adaptörü.

Tam eski/yeni kod A3-degisiklikler.diff dosyasında.

## Veritabanı
Mevcut tablolar salt okunur şema sorgusuyla incelendi; taslak için uygun tablo bulunmadı. Bildirim tercihleri veya proforma arşivi taslak deposu olarak kullanılmadı. Canlı veritabanında hiçbir değişiklik yapılmadı. opsiyonel-bulut-taslak.sql ayrı verildi.

SQL uygulanmadan uygulama bu cihazda yerel taslakla çalışır; başka cihazda açma etkin değildir. SQL uygulanırsa yeni proforma_drafts tablosu kullanılır. Kullanıcı+şirket anahtarı, RLS ve üyelik kontrolü vardır; anonim erişim ve uygulama tarafından DELETE yoktur. Eski tablo/RPC adları veya şemaları değiştirilmez.

## Davranış
- Yerel kayıt önce yapılır; bulut ağ hatası yerel taslağı silmez.
- Bir kullanıcı/şirket için tek aktif bulut taslağı saklanır; boş formlar ve arşivdeki kayıtlar bulut taslağını ezmez.
- Başka cihazda açılışta bulut taslağı onayla geri yüklenir.
- Cihazdaki taslakla farklı bulut taslağı varsa sessiz üzerine yazılmaz; bulut taslağı korunur.
- Bulut taslağını açmadan önce yerel kopya draft anahtarına :backup:zaman damgasıyla yedeklenir.
- Çakışmada revision koşullu UPDATE sonuç vermiyorsa bulut kaydı durur; yerel kayıt sürer. Otomatik zorla üzerine yazma yoktur.
- Mevcut Taslağı Aç düğmesi korunur; B aşamasında kaldırılacak. Yerel taslak mevcutsa önce eski yerel açma akışı işler.

## Test adımları
1. Kaydedilmemiş müşteri/ürün değişikliği yapıp Yeni Proforma seçin. Kaydedilmemiş değişiklikler silinecek uyarısını görün; Vazgeç formu korumalı.
2. Düzenleyip bir saniye bekleyin. Durum yazısı yerel kaydı göstermeli; sayfayı yeniden açınca taslağı geri yükleyebilmelisiniz.
3. SQL uygulamadan deneyin: bulut kullanılamıyor bilgisi çıkabilir ama yerel taslak çalışmalı.
4. Bulut için SQL'i projede çalıştırın, siteyi yeniden açın. Yeni taslağı düzenleyip durumun bulutla eşitlendi olmasını bekleyin.
5. Aynı hesap/şirketle başka cihazda açın; bulut taslağını onaylayıp müşteri ve ürünleri karşılaştırın.
6. İki cihazda aynı taslağı açın; birinde değiştirip eşitleyin, ardından diğerinde düzenleyin. İkinci cihaz yerelde kaydetmeli, çakışmada bulutu ezmemeli.
7. Başka kullanıcı/şirketle taslak erişimini deneyin: kendi taslağı dışındakilere erişim olmamalı.
8. Kaydedilmiş arşiv belgesi ve boş yeni form bulut taslağını değiştirmemeli.

node A3-test.cjs: mock backend testleri. node A2-test.cjs ve node A1-test.cjs: önceki regresyon kontrolleri.
32 script sözdizimi, gömülü kütüphane koruma ve mock bulut kontrolleri geçti. SQL canlıya uygulanmadığı için gerçek RLS/cihazlar arası test henüz yapılmadı.

Sonraki adım A4: iptal ve kalıcı silme korumaları. Henüz uygulanmadı.
