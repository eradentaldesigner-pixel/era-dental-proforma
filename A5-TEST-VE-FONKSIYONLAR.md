# A5 — Harf dönüşümü

Bu app.html A1–A5 düzeltmelerini içerir. ZIP'i çıkarıp app.html dosyasını mevcut app.html ile değiştirin. Dosya yeniden biçimlendirilmedi, font/kütüphane blokları değiştirilmedi. Önceki A3/A4 SQL dosyaları pakette korunur; veritabanına bu adımda işlem yapılmadı.

## Etkin tanım
trTitleCase() dosyada bir kez tanımlıdır, üzerine atama yapılmamıştır. normalizeCustomerFields(), buyerName/buyerAddress/bidder blur işleyicileri ve applyCustomer() bu etkin tanımı kullanır. Yalnız trTitleCase() gövdesi değişti; çağıran fonksiyonlar ve diğer ekranlar değiştirilmedi.

Eski/yeni tam diff: A5-degisiklikler.diff. Yeni fonksiyon ayrı olarak harf-donusumu.js içinde de bulunur.

## Davranış
- Tüm metin tamamen büyük veya tamamen küçük değilse aynen korunur; karışık girişin boşlukları da değiştirilmez.
- Tamamen büyük/küçük giriş normal Türkçe baş harf dönüşümünü kullanır.
- CAD/CAM gibi büyük harfli slash kısaltmaları korunur; CAD/CAM DENTAL → CAD/CAM Dental.
- Harf ve rakam içeren tekil ifadeler güvenli tarafta kalmak için korunur; 3SHAPE ve NO:1 değiştirilmez.
- Vergi dairesinin mevcut büyük harf kuralı değiştirilmedi.

## Elle test
1. Müşteri adı 3Shape Dental; adres iPhone Plaza, CAD/CAM Katı; teklifi veren Burak Yavuz yazın. Her alandan çıkın: giriş aynen korunmalı.
2. burak yavuz ve BURAK YAVUZ yazın: Burak Yavuz olmalı.
3. CAD/CAM yazıp başka alana geçin: değişmemeli.
4. Kaydedin ve arşivden tekrar açın; aynı değerler saklanmalı.
5. Kayıtlı müşteriyi seçin; karışık yazılmış adı/adresi korunmalı.
6. node A5-test.cjs çalıştırın: 18 örnek ve ikinci dönüşüm testi geçmeli.

Yerel kontroller: yalnız bu fonksiyonun değiştiği byte karşılaştırması, tek etkin tanım, 32 script sözdizimi, harf testleri ve A1–A4 regresyonları geçti. Gerçek tarayıcı/kayıt testi yapılmadı.

Sonraki adım A6 — sürüm çakışması mesajı ve taslağa koruma. Henüz uygulanmadı.
