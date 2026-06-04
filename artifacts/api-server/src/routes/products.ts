import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

const router: Router = Router();
const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "diafon2024";

const SEED_PRODUCTS = [
  { slug: "goruntulu-diafon-43", name: 'Görüntülü Diafon Seti 4.3"', category: "goruntulu", brand: "Audio", images: JSON.stringify(["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["4.3\" Renkli TFT Ekran", "Gece görüşlü kamera", "Hafıza fotoğraf", "Kapı kilit kontrolü"]), short_desc: "Ekonomik ve güvenilir görüntülü diafon seti. 4.3 inç renkli TFT ekran ve gece görüş kamerası ile güvenli giriş kontrolü.", long_desc: '<h2>Görüntülü Diafon Seti 4.3"</h2><p>Audio marka bu ekonomik görüntülü diafon seti, apartman ve daire girişleri için ideal bir çözüm sunar. 4.3 inç renkli TFT ekranı sayesinde kapıda bekleyen kişiyi net bir şekilde görebilirsiniz.</p><h3>Özellikler</h3><ul><li>4.3" Renkli TFT ekran ile net görüntü</li><li>Gece görüşlü IR kamera ile 24 saat güvenlik</li><li>Hafızaya fotoğraf kaydetme özelliği</li><li>Kapı kilidi elektriksel kontrol çıkışı</li><li>2 yıl yazılı garanti</li></ul><h3>Kurulum</h3><p>Diafon İstanbul ekibi tarafından profesyonel kurulum yapılmaktadır. Kurulum süresi ortalama 2-4 saattir.</p>', tag: "Çok Satan", tag_color: "bg-primary text-white", rating: 5, featured: true, sort_order: 1 },
  { slug: "goruntulu-diafon-7", name: 'Görüntülü Diafon Seti 7"', category: "goruntulu", brand: "Netelsan", images: JSON.stringify(["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["7\" Dokunmatik Ekran", "HD kamera 1080p", "Çoklu daire desteği", "Akıllı ev entegrasyonu"]), short_desc: "7 inç dokunmatik ekranlı, 1080p HD kameralı premium görüntülü diafon seti.", long_desc: "<h2>Görüntülü Diafon Seti 7\"</h2><p>Netelsan'ın yeni nesil 7 inç dokunmatik ekranlı bu cihaz, modern apartmanlar için üst düzey güvenlik ve konfor sağlar.</p><h3>Özellikler</h3><ul><li>7\" Full HD dokunmatik TFT ekran</li><li>1080p HD kamera çözünürlüğü</li><li>Aynı panele bağlı çoklu daire desteği</li><li>Akıllı ev sistemleriyle entegrasyon</li><li>2 yıl yazılı garanti</li></ul>", tag: "Yeni", tag_color: "bg-emerald-500 text-white", rating: 5, featured: true, sort_order: 2 },
  { slug: "ip-goruntulu-diafon", name: "IP Görüntülü Diafon", category: "goruntulu", brand: "Nade", images: JSON.stringify(["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Wi-Fi bağlantı", "Mobil uygulama", "Uzaktan izleme", "SIP protokolü"]), short_desc: "Wi-Fi destekli, telefonunuzdan izleyip açabileceğiniz IP görüntülü diafon sistemi.", long_desc: "<h2>IP Görüntülü Diafon</h2><p>Nade markalı bu IP görüntülü diafon, akıllı telefon entegrasyonu sayesinde dünyanın herhangi bir yerinden kapınızı izlemenizi ve açmanızı sağlar.</p><h3>Özellikler</h3><ul><li>Wi-Fi ile kablosuz bağlantı</li><li>iOS ve Android mobil uygulama</li><li>Uzaktan izleme ve kapı açma</li><li>SIP protokolü desteği</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 3 },
  { slug: "villa-goruntulu-set", name: "Villa Görüntülü Set", category: "goruntulu", brand: "Multitek", images: JSON.stringify(["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["2 dış panel", "2 iç monitor", "Anahtar kilit", "Şifre girişi"]), short_desc: "Villalar için tasarlanmış çift dış panelli, çift iç monitörlü görüntülü diafon seti.", long_desc: "<h2>Villa Görüntülü Set</h2><p>Multitek'in villa tipi görüntülü diafon seti, büyük konutlar ve müstakil evler için tasarlanmıştır. İki ayrı giriş noktasını kontrol edebilirsiniz.</p><h3>Özellikler</h3><ul><li>2 adet dış çağrı paneli</li><li>2 adet iç monitor</li><li>Mekanik anahtar kilit çıkışı</li><li>PIN şifreli giriş</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 5, featured: false, sort_order: 4 },
  { slug: "cok-katli-apartman-seti", name: "Çok Katlı Apartman Seti", category: "goruntulu", brand: "Audio", images: JSON.stringify(["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["20+ daire kapasitesi", "Merkezi panel", "Güç kaynağı dahil", "Garanti 2 yıl"]), short_desc: "20 daire ve üzeri apartmanlar için komple görüntülü diafon paketi. Merkezi panel ve güç kaynağı dahil.", long_desc: "<h2>Çok Katlı Apartman Seti</h2><p>Audio markalı bu set, büyük apartmanlar için özel tasarlanmıştır. 20 ve üzeri daire kapasiteli merkezi panel sistemi ile tüm binanın güvenliğini tek noktadan yönetebilirsiniz.</p><h3>Özellikler</h3><ul><li>20+ daire kapasiteli sistem</li><li>Merkezi giriş paneli</li><li>Dahili güç kaynağı</li><li>Genişleme modülü desteği</li><li>2 yıl yazılı garanti</li></ul>", tag: "Popüler", tag_color: "bg-amber-500 text-white", rating: 5, featured: true, sort_order: 5 },
  { slug: "kablosuz-goruntulu-set", name: "Kablosuz Görüntülü Set", category: "goruntulu", brand: "Nade", images: JSON.stringify(["https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Wi-Fi çalışma", "Pil veya şebeke", "Kolay montaj", "Mobil bildirim"]), short_desc: "Kablo gerektirmeyen Wi-Fi tabanlı görüntülü diafon. Pil veya şebeke ile çalışır, kurulum son derece kolaydır.", long_desc: "<h2>Kablosuz Görüntülü Set</h2><p>Kablo döşemek istemeyenler için ideal çözüm. Nade markalı bu kablosuz set, Wi-Fi üzerinden çalışır ve telefon uygulamasıyla bildirim gönderir.</p><h3>Özellikler</h3><ul><li>Kablosuz Wi-Fi bağlantı</li><li>Pil veya elektrik şebekesi ile çalışma</li><li>Hızlı ve kolay kurulum</li><li>Anlık mobil bildirim</li><li>1 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 6 },
  { slug: "sesli-diafon-seti-tekli", name: "Sesli Diafon Seti Tekli", category: "goruntusuz", brand: "Audio", images: JSON.stringify(["https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["1 daire için", "Bas-konuş sistemi", "Basit montaj", "Uzun ömürlü"]), short_desc: "Tek daire kullanımı için ekonomik sesli diafon seti. Bas-konuş sistemi ile pratik iletişim.", long_desc: "<h2>Sesli Diafon Seti Tekli</h2><p>En ekonomik sesli interkom çözümü. Audio markalı tekli set, tek daireli konutlar ve küçük işyerleri için idealdir.</p><h3>Özellikler</h3><ul><li>1 daire için tek panel sistem</li><li>Bas-konuş (PTT) ses iletişimi</li><li>Kolay ve hızlı montaj</li><li>Uzun ömürlü dayanıklı malzeme</li><li>1 yıl garanti</li></ul>", tag: "En Ekonomik", tag_color: "bg-emerald-500 text-white", rating: 4, featured: false, sort_order: 10 },
  { slug: "cok-aboneli-sesli-set", name: "Çok Aboneli Sesli Set", category: "goruntusuz", brand: "Netelsan", images: JSON.stringify(["https://images.unsplash.com/photo-1580587771525-4e5e26e0b7c4?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["10+ daire", "Merkezi panel", "Dahili hat", "Kapı açma rölesi"]), short_desc: "10 ve üzeri daire için merkezi sesli diafon sistemi. Dahili hat ve kapı açma rölesi dahil.", long_desc: "<h2>Çok Aboneli Sesli Set</h2><p>Netelsan'ın çok aboneli sesli diafon seti, orta ve büyük ölçekli apartmanlar için uygun maliyetli bir güvenlik çözümüdür.</p><h3>Özellikler</h3><ul><li>10 ve üzeri daire kapasitesi</li><li>Merkezi çağrı paneli</li><li>Dahili iletişim hattı</li><li>Elektrikli kapı açma rölesi</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 5, featured: false, sort_order: 11 },
  { slug: "handsfree-sesli-diafon", name: "Handsfree Sesli Diafon", category: "goruntusuz", brand: "Multitek", images: JSON.stringify(["https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Ahizesiz konuşma", "Yüksek ses kalitesi", "Gürültü filtresi", "Duvar montajı"]), short_desc: "Ahize gerektirmeyen handsfree sesli diafon sistemi. Gürültü filtreli kristal berraklığında ses.", long_desc: "<h2>Handsfree Sesli Diafon</h2><p>Multitek'in handsfree sesli diafon cihazı, ahize tutmadan rahat konuşma imkânı sunar. Gürültü filtresi sayesinde çevre seslerden etkilenmez.</p><h3>Özellikler</h3><ul><li>Handsfree (eller serbest) konuşma</li><li>Geniş bantlı yüksek ses kalitesi</li><li>Dijital gürültü filtresi</li><li>Duvar montajlı şık tasarım</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 12 },
  { slug: "ahizeli-daire-telefonu", name: "Ahizeli Daire Telefonu", category: "telefonlar", brand: "Audio", images: JSON.stringify(["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Standart ahize", "Tüm sistemlerle uyumlu", "Kapı açma butonu", "LED gösterge"]), short_desc: "Standart ahizeli daire içi diafon telefonu. Tüm marka diafon sistemleriyle uyumlu.", long_desc: "<h2>Ahizeli Daire Telefonu</h2><p>Audio markalı standart ahizeli daire telefonu, mevcut diafon altyapısıyla sorunsuz çalışır. LED göstergesi ile çağrı bildirimi sağlar.</p><h3>Özellikler</h3><ul><li>Klasik ahizeli tasarım</li><li>Evrensel sistem uyumluluğu</li><li>Tek tuş kapı açma</li><li>Çağrı LED göstergesi</li><li>1 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 20 },
  { slug: "handsfree-daire-cihazi", name: "Handsfree Daire Cihazı", category: "telefonlar", brand: "Nade", images: JSON.stringify(["https://images.unsplash.com/photo-1596003906949-67221c37965c?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Ahizesiz", "Ses seviyesi ayarı", "Şık tasarım", "Beyaz/Siyah renk"]), short_desc: "Ahizesiz modern tasarımlı daire içi diafon cihazı. Ses seviyesi ayarı ve şık görünümüyle öne çıkar.", long_desc: "<h2>Handsfree Daire Cihazı</h2><p>Nade'nin handsfree daire cihazı, modern ve minimalist tasarımıyla evinizin iç dekorasyonuyla uyum sağlar.</p><h3>Özellikler</h3><ul><li>Ahize gerektirmeyen handsfree yapı</li><li>Ayarlanabilir ses seviyesi</li><li>Modern minimalist tasarım</li><li>Beyaz ve Siyah renk seçeneği</li><li>2 yıl garanti</li></ul>", tag: "Yeni", tag_color: "bg-emerald-500 text-white", rating: 5, featured: false, sort_order: 21 },
  { slug: "tekli-cagri-paneli", name: "Tekli Çağrı Paneli", category: "zil-panelleri", brand: "Audio", images: JSON.stringify(["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["1 buton", "Paslanmaz çelik", "IP54 korumalı", "Led aydınlatma"]), short_desc: "Tek butonlu paslanmaz çelik çağrı paneli. IP54 korumalı, dış hava koşullarına dayanıklı.", long_desc: "<h2>Tekli Çağrı Paneli</h2><p>Audio markalı tekli çağrı paneli, tekli konutlar ve küçük işyerleri için sade ve sağlam bir çözüm sunar.</p><h3>Özellikler</h3><ul><li>Tek butonlu kompakt tasarım</li><li>Paslanmaz çelik gövde</li><li>IP54 toz ve yağmur koruması</li><li>Karanlıkta görünür LED aydınlatma</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 30 },
  { slug: "cok-aboneli-cagri-paneli", name: "Çok Aboneli Çağrı Paneli", category: "zil-panelleri", brand: "Netelsan", images: JSON.stringify(["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["12/24 buton seçeneği", "İsim kartlıklı", "Yağmur korumalı", "Gece ışığı"]), short_desc: "12 veya 24 buton seçenekli, isim kartlıklı çok aboneli giriş çağrı paneli.", long_desc: "<h2>Çok Aboneli Çağrı Paneli</h2><p>Netelsan'ın apartman tipi çağrı paneli, çok daireli binalara özel tasarlanmıştır. Modüler yapısı sayesinde ihtiyaca göre büyütülebilir.</p><h3>Özellikler</h3><ul><li>12 veya 24 buton seçeneği</li><li>İsim kartlıklı her buton</li><li>Yağmura dayanıklı IP65 yapı</li><li>Gece aydınlatmalı arka ışık</li><li>2 yıl garanti</li></ul>", tag: "Popüler", tag_color: "bg-amber-500 text-white", rating: 5, featured: false, sort_order: 31 },
  { slug: "sifreli-giris-paneli", name: "Şifreli Giriş Paneli", category: "zil-panelleri", brand: "Multitek", images: JSON.stringify(["https://images.unsplash.com/photo-1574114783-e81f6c1c77e5?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["PIN kodu girişi", "100 kullanıcı", "Saldırı alarmı", "Paslanmaz"]), short_desc: "100 kullanıcı kapasiteli PIN şifreli giriş paneli. Saldırı alarmı ve paslanmaz çelik gövde.", long_desc: "<h2>Şifreli Giriş Paneli</h2><p>Multitek'in şifreli giriş paneli, yüksek güvenlik gerektiren konut ve işyerlerine uygun bir çözümdür.</p><h3>Özellikler</h3><ul><li>PIN kodu ile güvenli giriş</li><li>100 farklı kullanıcı tanımlama</li><li>Ardışık hatalı giriş alarmı</li><li>Paslanmaz çelik gövde</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 5, featured: false, sort_order: 32 },
  { slug: "kartli-gecis-sistemi", name: "Kartlı Geçiş Sistemi", category: "giris-kontrol", brand: "Multitek", images: JSON.stringify(["https://images.unsplash.com/photo-1609771700714-7c9a2ec9c49a?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Mifare kart okuyucu", "500 kart kapasitesi", "Zaman kısıtlama", "Raporlama"]), short_desc: "500 kart kapasiteli Mifare teknolojili kartlı geçiş sistemi. Zaman kısıtlama ve raporlama özellikli.", long_desc: "<h2>Kartlı Geçiş Sistemi</h2><p>Multitek'in RFID kartlı geçiş sistemi, site ve apartman yönetimleri için gelişmiş erişim kontrolü sağlar.</p><h3>Özellikler</h3><ul><li>Mifare 13.56 MHz kart okuyucu</li><li>500 kart kapasitesi</li><li>Saat ve gün bazlı erişim kısıtlama</li><li>Detaylı giriş-çıkış raporlama</li><li>3 yıl garanti</li></ul>", tag: "Çok Satan", tag_color: "bg-primary text-white", rating: 5, featured: true, sort_order: 40 },
  { slug: "biyometrik-parmak-izi", name: "Biyometrik Parmak İzi", category: "giris-kontrol", brand: "Nade", images: JSON.stringify(["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["500 parmak izi", "Hızlı okuma 0.5s", "Yedek PIN kodu", "Anti-spoofing"]), short_desc: "500 parmak izi kapasiteli biyometrik giriş sistemi. 0.5 saniyede okuma ve sahte parmak engelleme.", long_desc: "<h2>Biyometrik Parmak İzi Sistemi</h2><p>Nade'nin biyometrik parmak izi sistemi, en üst düzey güvenliği sağlar. Kart veya anahtar taşımadan güvenli giriş imkânı sunar.</p><h3>Özellikler</h3><ul><li>500 kişi parmak izi kapasitesi</li><li>0.5 saniye hızlı tanımlama</li><li>Yedek PIN kodu girişi</li><li>Sahte parmak izi engelleme (Anti-spoofing)</li><li>3 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 5, featured: false, sort_order: 41 },
  { slug: "elektromanyetik-kilit", name: "Elektromanyetik Kilit", category: "giris-kontrol", brand: "Audio", images: JSON.stringify(["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["600 kg tutma gücü", "12V DC", "Yatay/Dikey montaj", "LED gösterge"]), short_desc: "600 kg tutma gücüne sahip 12V DC elektromanyetik kilit. Yatay veya dikey montaj seçeneğiyle her kapıya uyar.", long_desc: "<h2>Elektromanyetik Kilit</h2><p>Audio markalı elektromanyetik kilit, yüksek güvenlik gerektiren kapılar için güçlü ve güvenilir bir çözümdür.</p><h3>Özellikler</h3><ul><li>600 kg manyetik tutma kuvveti</li><li>12V DC çalışma voltajı</li><li>Hem yatay hem dikey montaj desteği</li><li>Kilitlenme durumu LED göstergesi</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 42 },
  { slug: "ip-dome-kamera-2mp", name: "IP Dome Kamera 2MP", category: "kamera", brand: "Netelsan", images: JSON.stringify(["https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["1080p Full HD", "Gece görüşü 30m", "IP66 su geçirmez", "H.265 sıkıştırma"]), short_desc: "1080p Full HD çözünürlüklü, 30 metre gece görüşlü IP66 korumalı dome IP kamera.", long_desc: "<h2>IP Dome Kamera 2MP</h2><p>Netelsan'ın 2 megapiksel IP dome kamerası, iç ve dış mekânlar için yüksek kaliteli güvenlik görüntüsü sağlar.</p><h3>Özellikler</h3><ul><li>2MP 1080p Full HD çözünürlük</li><li>30 metre gece görüşü</li><li>IP66 toz ve su sızdırmazlık</li><li>H.265/H.264 video sıkıştırma</li><li>2 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 4, featured: false, sort_order: 50 },
  { slug: "4-kamerali-nvr-set", name: "4 Kameralı NVR Set", category: "kamera", brand: "Nade", images: JSON.stringify(["https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["4 IP kamera dahil", "4 kanal NVR", "2TB HDD", "Uzak izleme"]), short_desc: "4 adet IP kamera, 4 kanal NVR kayıt cihazı ve 2TB HDD içeren hazır güvenlik kamera paketi.", long_desc: "<h2>4 Kameralı NVR Set</h2><p>Nade'nin hazır NVR seti, küçük ve orta ölçekli işletmeler ile apartmanlar için eksiksiz güvenlik kamera çözümü sunar.</p><h3>Özellikler</h3><ul><li>4 adet Full HD IP kamera</li><li>4 kanal NVR kayıt cihazı</li><li>2TB dahili sabit disk (30+ gün kayıt)</li><li>Uzaktan mobil izleme</li><li>3 yıl garanti</li></ul>", tag: "Hazır Paket", tag_color: "bg-cyan-500 text-white", rating: 5, featured: false, sort_order: 51 },
  { slug: "ptz-speed-dome-kamera", name: "PTZ Speed Dome Kamera", category: "kamera", brand: "Multitek", images: JSON.stringify(["https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["360° döner", "30x optik zoom", "Otomatik takip", "IR 100m"]), short_desc: "360° dönebilen, 30x optik zoomlu, otomatik hedef takipli profesyonel PTZ kamera.", long_desc: "<h2>PTZ Speed Dome Kamera</h2><p>Multitek'in PTZ speed dome kamerası, geniş alanları tek noktadan izlemek için profesyonel çözüm sunar.</p><h3>Özellikler</h3><ul><li>360° tam dönüş kapasitesi</li><li>30x optik zoom</li><li>Otomatik hareket takibi</li><li>100 metre IR gece görüşü</li><li>3 yıl garanti</li></ul>", tag: null, tag_color: null, rating: 5, featured: false, sort_order: 52 },
  { slug: "kucuk-apartman-paketi", name: "Küçük Apartman Paketi", category: "paket", brand: "Diafon İstanbul", images: JSON.stringify(["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Sesli diafon sistemi", "Kablo dahil", "Montaj dahil", "1 yıl garanti"]), short_desc: "6-10 daireli apartmanlar için komple sesli diafon paketi. Kablo ve montaj dahil, 1 yıl garanti.", long_desc: "<h2>Küçük Apartman Paketi</h2><p>6-10 daireli küçük apartmanlar için hazırladığımız bu komple paket, tüm malzeme ve işçiliği kapsar.</p><h3>Paket İçeriği</h3><ul><li>6-10 aboneli sesli diafon sistemi</li><li>Gerekli kablo ve bağlantı malzemeleri</li><li>Profesyonel kurulum işçiliği</li><li>1 yıl yazılı garanti</li></ul><h3>Neden Paket Almalısınız?</h3><p>Paket satın alımında tüm malzeme ve işçilik tek fiyata dahil olduğundan sürpriz maliyet çıkmaz.</p>", tag: "6-10 Daire", tag_color: "bg-primary text-white", rating: 5, featured: true, sort_order: 60 },
  { slug: "orta-olcek-apartman-paketi", name: "Orta Ölçek Apartman Paketi", category: "paket", brand: "Diafon İstanbul", images: JSON.stringify(["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["Görüntülü diafon", "Kablo yenileme", "Montaj dahil", "2 yıl garanti"]), short_desc: "10-20 daireli apartmanlar için görüntülü diafon paketi. Kablo yenileme ve montaj dahil, 2 yıl garanti.", long_desc: "<h2>Orta Ölçek Apartman Paketi</h2><p>10-20 daireli apartmanlar için özel hazırlanmış bu paket, eski kablo altyapısını yenileyerek modern görüntülü diafon sistemine geçişi sağlar.</p><h3>Paket İçeriği</h3><ul><li>10-20 aboneli görüntülü diafon sistemi</li><li>Komple kablo yenileme</li><li>Profesyonel kurulum işçiliği</li><li>2 yıl yazılı garanti</li></ul>", tag: "10-20 Daire", tag_color: "bg-primary text-white", rating: 5, featured: true, sort_order: 61 },
  { slug: "site-buyuk-bina-paketi", name: "Site & Büyük Bina Paketi", category: "paket", brand: "Diafon İstanbul", images: JSON.stringify(["https://images.unsplash.com/photo-1580587771525-4e5e26e0b7c4?w=800&h=600&fit=crop&q=80"]), features: JSON.stringify(["IP diafon sistemi", "Tam kablo altyapısı", "Akıllı ev entegrasyonu", "3 yıl garanti"]), short_desc: "20+ daireli büyük siteler için IP diafon paketi. Tam altyapı, akıllı ev entegrasyonu ve 3 yıl garanti.", long_desc: "<h2>Site & Büyük Bina Paketi</h2><p>20 ve üzeri daireli büyük siteler ile çok bloklu konut projeleri için hazırladığımız premium paket, en ileri teknoloji IP diafon sistemini kapsar.</p><h3>Paket İçeriği</h3><ul><li>IP tabanlı görüntülü diafon sistemi</li><li>Tam kablo altyapısı kurulumu</li><li>Akıllı ev sistemleriyle entegrasyon</li><li>3 yıl yazılı garanti</li></ul>", tag: "20+ Daire", tag_color: "bg-primary text-white", rating: 5, featured: false, sort_order: 62 },
];

router.get("/products", async (req, res): Promise<void> => {
  try {
    const rows = await db.select().from(productsTable).orderBy(asc(productsTable.sort_order), asc(productsTable.id));
    const category = typeof req.query["category"] === "string" ? req.query["category"] : null;
    const filtered = category ? rows.filter((r) => r.category === category) : rows;
    res.json(filtered);
  } catch (err) {
    req.log.error(err, "Failed to fetch products");
    res.status(500).json({ error: "Ürünler yüklenemedi." });
  }
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  try {
    const slug = req.params["slug"];
    const rows = await db.select().from(productsTable).where(eq(productsTable.slug, slug));
    if (rows.length === 0) {
      res.status(404).json({ error: "Ürün bulunamadı." });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    req.log.error(err, "Failed to fetch product");
    res.status(500).json({ error: "Ürün yüklenemedi." });
  }
});

const productBody = z.object({
  password: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  brand: z.string().default(""),
  short_desc: z.string().default(""),
  long_desc: z.string().default(""),
  images: z.string().default("[]"),
  features: z.string().default("[]"),
  tag: z.string().nullable().default(null),
  tag_color: z.string().nullable().default(null),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

router.post("/products/seed", async (req, res): Promise<void> => {
  const pw = typeof req.body?.password === "string" ? req.body.password : "";
  if (pw !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }
  try {
    const existing = await db.select().from(productsTable);
    if (existing.length > 0) {
      res.json({ ok: true, seeded: 0, message: "Veriler zaten mevcut." });
      return;
    }
    await db.insert(productsTable).values(SEED_PRODUCTS);
    res.json({ ok: true, seeded: SEED_PRODUCTS.length });
  } catch (err) {
    req.log.error(err, "Seed failed");
    res.status(500).json({ error: "Seed başarısız." });
  }
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = productBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Geçersiz istek.", details: parsed.error.flatten() });
    return;
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }
  const { password: _pw, ...values } = parsed.data;
  try {
    const rows = await db.insert(productsTable).values(values).returning();
    res.json(rows[0]);
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "23505") {
      res.status(409).json({ error: "Bu slug zaten kullanımda." });
      return;
    }
    req.log.error(err, "Failed to create product");
    res.status(500).json({ error: "Ürün eklenemedi." });
  }
});

router.put("/products/:slug", async (req, res): Promise<void> => {
  const parsed = productBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Geçersiz istek." });
    return;
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }
  const { password: _pw, ...values } = parsed.data;
  const slug = req.params["slug"];
  try {
    const rows = await db.update(productsTable).set(values).where(eq(productsTable.slug, slug)).returning();
    if (rows.length === 0) {
      res.status(404).json({ error: "Ürün bulunamadı." });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    req.log.error(err, "Failed to update product");
    res.status(500).json({ error: "Ürün güncellenemedi." });
  }
});

router.delete("/products/:slug", async (req, res): Promise<void> => {
  const pw = typeof req.query["password"] === "string" ? req.query["password"] : "";
  if (pw !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }
  const slug = req.params["slug"];
  try {
    await db.delete(productsTable).where(eq(productsTable.slug, slug));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to delete product");
    res.status(500).json({ error: "Ürün silinemedi." });
  }
});

export default router;
