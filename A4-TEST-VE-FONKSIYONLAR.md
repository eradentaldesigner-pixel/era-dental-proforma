# A4 — İptal / kalıcı silme koruması

Bu dosya A1+A2+A3+A4 içerir. ZIP içindeki app.html dosyasını mevcut app.html ile değiştirin. Font ve kütüphane blokları korunmuştur; dosya yeniden biçimlendirilmedi.

## Etkin tanımlar / değişen fonksiyonlar
- deleteArchivedProforma(): dosyada tek tanım var; sonradan üzerine atama yok. Hem arşiv tablosu hem yan panel bu fonksiyonu kullanır. Varsayılan action cancel; kalıcı silme action delete.
- cfArchiveIsApproved(), cfArchiveActions(): yeni yardımcılar; hem status Onaylandı hem approval_state approved koruma sağlar.
- loadArchive(): mevcut son UI sarmalayıcıları korunur; ilk gövdedeki Sil butonu ortak İptal et/Kalıcı sil aksiyonlarına bağlanır.
- Yan panel display(): eski Sil butonu ve onclick'i ortak aksiyonlarla değiştirilir. Bu IIFE içindeki display diğer ekranlardaki aynı adlı fonksiyonlardan bağımsızdır.
- statusClass(), statusLabel(): İptal edildi değeri tanınır.
- approvalStatus(): iptal durumu mevcut approval_state eşlemesinin önünde gösterilir.
- approvalActions(): iptal edilmiş kayıtta onay aksiyonları gizlenir.

Tam eski/yeni kod A4-degisiklikler.diff dosyasındadır.

## Davranış
Onaylanmış belge iptal veya kalıcı silme yapmaz; UI'da korunuyor bilgisi gösterilir. Onaysız belgede İptal et kaydı arşivde tutar. Kalıcı sil düğmesi yalnız owner/admin için görünür ve iki ayrı onay ister. Yetki ve belge durumu fonksiyon girişinde de denetlenir. Belge işlem öncesinde company_id ile yeniden okunur; istek aynı company_id/id/revision ve onaysız durum koşullarıyla gönderilir. Sıfır satır sonuç sürüm çakışması olarak gösterilir. Alakasız açık formun onay bağlamı temizlenmez.

## Sunucu kısıtı — ayrı SQL
Mevcut sunucuda guard_proforma_approval() doğrudan status değişimini engelliyor. Bu yüzden İptal edildi işleminin çalışması için A4-opsiyonel-sunucu-korumasi.sql gerekir. Canlı veritabanına uygulanmadı. SQL olmadan uygulamanın diğer işlevleri devam eder; iptal reddedildiğinde kayıt silinmez, SQL gerektiği açıklanır.

SQL mevcut tablo veya RPC adını değiştirmez. Mevcut onay guard'ına yalnızca içerik değiştirmeden, onaysız kaydı iptal etme istisnası ekler. İptal edilmiş kayıtların yeniden düzenlenmesini/onaya gönderilmesini engeller. Kalıcı silmeye restrictive RLS ekleyerek mevcut manager silme yetkisini owner/admin ile daraltır ve onaylı belgeyi sunucuda da korur. Mevcut operasyon kilidi ve audit trigger'ları korunur. SQL herhangi bir satırı değiştirmez/silmez. Beklenen guard sürümü bulunamazsa transaction hata verir; değişiklik uygulanmaz. Aynı SQL'i yeniden çalıştırmak gerekmez.

A3 bulut taslak SQL'i de pakette korunmuştur; bu iki SQL farklı özellikler içindir.

## Elle test (deneme kaydı kullanın)
1. Satış/manager rolüyle arşivi açın: İptal et görünmeli, Kalıcı sil görünmemeli.
2. Onaylanmış proforma satırında Onaylı belge korunuyor olmalı. Fonksiyonu elle çağırınca da işlem engellenmeli.
3. Onaysız deneme kaydında İptal et seçin. Vazgeç kayıt durumunu korumalı.
4. SQL uygulanmadan onaylayın: sunucu engeli açıklanmalı, kayıt korunmalı.
5. SQL uygulandıktan sonra onaylayın: İptal edildi görünmeli, kayıt ve ürünler arşivde kalmalı, onay düğmeleri görünmemeli.
6. owner/admin ile başka bir deneme kaydında Kalıcı sil seçin; ilk onayı kabul edip ikinciyi reddedin: kayıt kalmalı.
7. İki onayı da yalnız silinebilir deneme kaydında kabul edin; kayıt kaldırılmalı.
8. İki kullanıcı aynı kaydı açıp biri onaylasın; diğeri eski ekrandan silmeyi denesin. Yeniden okuma/koşullu istek silmeyi engellemeli. Operasyona aktarılmış kayıtlar mevcut sunucu kilidini korumalı.

## Yerel testler
node A4-test.cjs — mock backend üzerinde onay koruması, rol, iptal, iki onay, sürüm çakışması ve SQL-eksik geri dönüşü.
node A1-test.cjs / A2-test.cjs / A3-test.cjs — önceki adımların regresyonları.
32 script sözdizimi ve gömülü kütüphane koruma kontrolleri geçti. Gerçek veride silme/iptal ve SQL/RLS testi yapılmadı.

Sonraki adım A5 — otomatik büyük/küçük harf dönüşümü. Henüz uygulanmadı.
