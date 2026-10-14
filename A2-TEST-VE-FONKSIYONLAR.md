# A2 — Numara yalnız kayıtta

Bu dosya A1 + A2 düzeltmelerini içerir. Yüklediğiniz 2,3 MB sürüm esas alınmıştır; font/kütüphaneler korunmuştur. ZIP'i çıkarıp app.html dosyasını mevcut app.html ile değiştirin; ZIP'i siteye yüklemeyin.

## Etkin fonksiyonlar ve değişiklik
- startNewProforma(): ana async gövdeden ensureProformaNo() kaldırıldı. Son etkin atama hızlı editör scriptindeki startBase sarmalayıcısıdır; teklif, kaydedilmemiş değişiklik ve telefon biçimlendirme sarmalayıcıları da korunmuştur.
- copyCurrentProforma(): ana proforma gövdesinden numara alma kaldırıldı; mesaj artık numaranın kayıtta verileceğini söyler. Son etkin atama offerCopyBase sarmalayıcısıdır; teklif dalı korunmuştur.
- bootWorkspace(): ilk girişte boş form için numara alma kaldırıldı; taslak geri yükleme değişmedi.
- Müşteriler ekranındaki “bu müşteriyle yeni proforma” işleyicisi: numara alma kaldırıldı.
- saveProformaAndPdf(): ensureProformaNo() çağrısı manuel kur onayının sonrasına alındı. Son etkin atama teklif/proforma yönlendirme sarmalayıcısıdır; asıl proforma gövdesi değiştirilmiştir.
- render() ilk gövdesi ve eski prepare() çıktısı: boş numarayı yalnız gösterimde yer tutucuyla gösterir. Son A4 çıktı gövdesinin mevcut Taslak gösterimi korunmuştur.
- no input: placeholder Kayıtta otomatik verilecek. Value boş kalır; sahte numara kaydedilmez.
- ensureProformaNo(): tanımı değişmedi; tek çağrısı kayıt akışındadır. Mevcut numarayı yeniden kullanma davranışı korundu.

Tam eski/yeni kod: A2-degisiklikler.diff. A1 hesaplama düzeltmeleri bu dosyada korunmuştur. Supabase tablo/RPC/şema değişmedi.

## Elle test
1. Yeni Proforma açın. Numara alanı boş/yer tutuculu olmalı. Aynı işlemi birkaç kez tekrarlayın; next_proforma_number_for_company RPC çağrısı olmamalı.
2. Müşteri/ürün ekleyin; taslağın otomatik kayıt/geri yüklemesini ve önizlemeyi deneyin. Numara gerektirmeden çalışmalı.
3. Kaydedilmiş proformayı kopyalayın. Müşteri/ürün korunmalı, yeni numara boş olmalı.
4. Kayıt yapın. O anda RPC bir kez çağrılmalı ve gerçek numara görünmeli.
5. Aynı kaydı güncelleyin; yeni numara alınmamalı.
6. Kur onayından vazgeçin: numara alınmamalı.
7. RPC başarılı fakat belge kaydı başarısız olduğunda, aynı açık formda yeniden kaydetmeyi deneyin: alınmış numara yeniden kullanılmalı.
8. Arşivden eski belge açın: eski numarası değişmemeli. Eski taslaklarda önceden alınmış numaralar korunur.

## Otomatik test
node A2-test.cjs — gerçek fonksiyon gövdeleriyle mock RPC üzerinde açılış/kopyalama/iptal/kayıt hatası ve yeniden deneme testleri.
node A1-test.cjs — önceki 204 satır hesap kontrolü.
31 script sözdizimi kontrolü ve gömülü kütüphane koruma kontrolü geçti. Gerçek tarayıcı/backend testi yapılmadı.

Sınır: Numara RPC'si ve belge kaydı mevcut sistemde iki ayrı işlemdir. Numara alındıktan sonra hatalı form tamamen terk edilirse sayaçta boşluk yine kalabilir. Bunun tamamen önlenmesi işlemsel backend/RPC değişikliği ister; bu adımda şema veya RPC değiştirilmedi.

Sonraki adım A3: taslak koruma ve cihazlar arası taslak. Henüz uygulanmadı.
