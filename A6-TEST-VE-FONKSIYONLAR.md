# A6 — Sürüm çakışması / form koruma

Bu app.html A1–A6 içerir. ZIP'i çıkarıp app.html ile mevcut dosyayı değiştirin. Gömülü font/kütüphaneler korundu. Yeni SQL veya tablo/RPC değişikliği yok; önceki ayrı A3/A4 SQL dosyaları pakette korunur.

## Etkin fonksiyonlar
- saveProformaAndPdf(): ilk async gövde yamalandı. Son etkin atama teklif/proforma yönlendiren offerSaveBase sarmalayıcısıdır; sarmalayıcı korunmuştur. Yalnız proformas UPDATE dalındaki company_id/id/approval_revision filtreli single() sonucu kontrol edilir.
- cfHandleProformaConflict(): yeni yardımcı; yerel taslak kayıt girişimi mesajdan önce yapılır, form yenilenmez/temizlenmez.
- collectDraft(): okunan approvalRevision değerini taslakta saklar.
- applyDraftData(): eski revision değerini geri yükler; eski onay kaydı/imza bağlamını temizler. Sunucudaki yeni sürüm varsayılarak otomatik üzerine yazılmaz.
- saveOffer()/offerRpc(): bu adımda değiştirilmedi; A6'nın tarif ettiği proforma UPDATE çakışması ele alındı.

Tam eski/yeni diff: A6-degisiklikler.diff.

## Davranış
UPDATE filtresi nedeniyle single() sıfır satır döndürdüğünde PGRST116 yakalanır. Kullanıcı mesajı tam olarak: Bu belge başka biri tarafından değiştirildi. Sayfayı yenileyip tekrar deneyin.

İlk olarak saveDraftQuietly() çağrılır. Form ve kaydedilmemiş değişiklik durumu korunur; kayıt başarılı gibi işaretlenmez. Taslak status yazısı yerel kayıt sonucunu gösterir. Tarayıcı depolaması kapalıysa veya cihaz taslağı güvenlik tercihiyle kapatılmışsa bu tercih aşılmaz; form korunur ve sayfayı yenilemeyin uyarısı çıkar. Arşiv belgesinin çakışma taslağı A3 kuralıyla bulut taslağını ezmez.

Ekleme dalında PGRST116 veya başka yetki/ağ hataları bu mesajla yanlış etiketlenmez. Kimlik/revision koşullu UPDATE mevcut şekilde kalır. SQL/RPC değiştirilmedi.

## Test adımları
1. Aynı proformayı iki kullanıcı/sekmede düzenleme modunda açın.
2. İlk sekmede bir alanı değiştirip kaydedin.
3. İkinci sekmede farklı bir müşteri notu veya ürün değişikliği girip kaydedin.
4. Türkçe çakışma mesajını görün. İkinci sekmenin girdisi, ürünler ve notlar yerinde kalmalı; taslak status yazısı yerel korumayı göstermeli.
5. Yerel taslağın kaydedildiğini kontrol ettikten sonra sayfayı yenileyip taslağı açın. Girdiler korunmalı; eski revision nedeniyle yeni sürüm otomatik ezilmemeli.
6. Güncel belgeyi arşivden açıp iki sürümü karşılaştırın; gerekli değişiklikleri güncel belgeye bilinçli olarak uygulayın.
7. Tarayıcı depolamasını engelleyerek tekrar deneyin: form korunmalı ve status yazısı yenilememe uyarısını göstermeli.
8. Yetkisiz kayıt/ağ hatası simülasyonu yapın: genel kayıt hatası görünmeli, yanlış çakışma mesajı verilmemeli.

node A6-test.cjs: gerçek kayıt gövdesiyle mock UPDATE/INSERT sonuçları, mesajdan önce taslak, form koruma ve depolama hatası kontrolü. Önceki A1–A5 testleri de pakette.
32 script sözdizimi, gömülü kütüphane ve regresyon kontrolleri geçti. Gerçek iki kullanıcı/backend testi henüz yapılmadı.

Sınır: Aynı sıfır-satır sonucu belgenin silinmesi veya erişimin artık görünmemesi halinde de oluşabilir; istemci bunu güncellemenin uygulanmadığı bir çakışma olarak güvenli biçimde ele alır.

Sonraki adım A7 — alan doğrulaması. Henüz uygulanmadı.
