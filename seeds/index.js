const mongoose = require('mongoose');
const Place = require('../models/place');

mongoose
  .connect('mongodb://127.0.0.1:27017/TurkeyTour')
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log('MongoDB connection error:', err));

Place.insertMany([
  {
    author: '660beaee0057154c17604d52',
    title: 'Aspendos Antik Tiyatrosu',
    image:
      'https://cdn2.enuygun.com/media/lib/825x620/uploads/image/aspendos-33995.webp',
    description:
      'Serik’e yaklaşık 8 kilometre uzaklıkta bulunan Aspendos Antik Tiyatrosu, Romalılar tarafından M.S. 2. yüzyılda inşa edilmiş. Anadolu’da Romalılar tarafından inşa edilen tiyatrolar arasında sahnesini günümüze kadar koruyan en eski tiyatro. Bu yüzden de Antalya’da en çok ziyaretçi alan yerler arasında. 12 bin kişiyi ağırlama kapasitesine sahip tiyatroda günümüzde hala Uluslararası Aspendos Opera ve Bale Festivali gibi önemli etkinliklere ev sahipliği yapıyor.',
    location: 'Serik Antalya',
    price: 340,
  },
  {
    author: '660beaee0057154c17604d52',
    title: 'Düden Şelalesi',
    image:
      'https://cdn2.enuygun.com/media/lib/825x620/uploads/image/duden-selalesi-9540.webp',
    description:
      'Antalya Antalya’nın ilçesi Kepez’in sınırlarında konumlanan Düden Şelalesi, Antalya’nın en çok ziyaretçi alan noktalarından biri. Yaklaşık 40 kilometre yükseklikten akan suyun sesini dinlemek ve Antalya’nın sıcağında biraz olsun serinlemek için tercih edebileceğin şelale çevresinde piknik yapabileceğin alanlar bulunuyor. Piknik hazırlığı yapmadan gittiysen de üzülme şelalenin çevresinde yemek yiyebileceğin restoranlar var.',
    location: 'Kepez Antalya',
    price: 15,
  },
  {
    author: '660beaee0057154c17604d52',
    title: 'Salda Gölü',
    image:
      'https://cdn2.enuygun.com/media/lib/825x620/uploads/image/salda-golu-33998.webp',
    description:
      'Yeşilova ilçe merkezine sadece 4 kilometre uzaklıkta olan Salda Gölü, ziyaret edenlere turkuazın en güzel halini sunduğu için Türkiye’nin Maldivleri olarak anılıyor. Bir krater gölü olan Salda’nın en derin olduğu yerlerde rengi çivit mavisine dönüyor. Bir volkanik patlama sonucu oluştuğu için 184 metre derinliği var. Bu oranla da Türkiye’nin en derin gölleri arasında yer alıyor. Gölün suyunda bulunan magnezyum, soda ve kil sağlık sorunlarına da iyi geldiği için sağlık turizmi için de çok sık tercih ediliyor.',
    location: 'Yeşilova Burdur',
    price: 0,
  },
  {
    author: '660beaee0057154c17604d52',
    title: 'Antakya Arkeoloji Müzesi',
    image:
      'https://cdn2.enuygun.com/media/lib/825x620/uploads/image/hatay-arkeoloji-muzesi-37741.webp',
    description:
      'Çok zengin bir kültürel geçmişe sahip olan Hatay’ın Antakya ilçesinde konumlanan Antakya Arkeoloji Müzesi, 1930’lu yılların başında başlayıp 1940’lı yılların sonuna kadar süren araştırmalar ve kazılar sonucu ortaya çıkan eserlere ev sahipliği yapıyor. Müzenin esas zenginliğini Harbiye, Narlıca, Güzelburç ve Samandağ çevresinde yapılan kazılarda ortaya çıkan mozaikler oluşturuyor. Hatta bu müze, mozaik koleksiyonuyla dünyanın en büyük mozaik koleksiyonları arasında yer alıyor.',
    location: 'Antakya Hatay',
    price: 260,
  },
  {
    author: '660beaee0057154c17604d52',
    title: 'Taşköprü',
    image:
      'https://cdn2.enuygun.com/media/lib/825x620/uploads/image/adana-taskopru-37740.webp',
    description:
      'Seyhan ve Yüreğir’i birleştiren Taşköprü, Seyhan Nehri üzerinde konumlanıyor. Roma İmparatoru Hadrianus tarafından yaptırıldığı düşünülen köprü, birçok medeniyete ev sahipliği yapan Adana’nın simge yapılarından biri. 319 metre uzunlukta olan köprünün 21 tane kemerinin 14’ü şu an hala ayakta. Yıllar boyunca çok kez yenilenen köprü günümüzde kullanılmaya devam ediyor. Bu nedenle de Taşköprü dünya üzerinde hala kullanılan en eski köprülerden biri olarak ünlü.',
    location: 'Yüreğir Adana',
    price: 260,
  },
])
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.log(err);
  });
