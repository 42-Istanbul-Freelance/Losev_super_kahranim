const themesData = [
    {
        id: 1,
        title: 'Süper Ekibim',
        icon: '🦸‍♂️',
        isLocked: false,
        gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                question: 'Süper İyileştirici Ekibimiz Kimdir?',
                options: [
                    { text: 'Uzaylılar', image: '👽', isCorrect: false },
                    { text: 'Doktor ve Hemşireler', image: '👨‍⚕️', isCorrect: true }
                ]
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'sorting',
                question: 'Kahraman Ekibimizi ve Düşmanları Ayır!',
                dropzones: {
                    left: { type: 'hero', title: 'Kahramanlar' },
                    right: { type: 'villain', title: 'Düşmanlar' }
                },
                winTitle: 'Harika Kurtarış! 🛡️',
                winMessage: 'Doktorlar ve hemşireler bizim en büyük kahramanlarımızdır! Mikropları hep birlikte yeneceğiz.',
                winEmoji: '🦸‍♀️',
                items: [
                    { id: '1', name: 'Doktor', emoji: '👨‍⚕️', type: 'hero' },
                    { id: '2', name: 'Hemşire', emoji: '👩‍⚕️', type: 'hero' },
                    { id: '3', name: 'Mikrop', emoji: '🦠', type: 'villain' },
                    { id: '4', name: 'Pis Tozlar', emoji: '💨', type: 'villain' }
                ]
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                question: 'Süper Ekibimizin Sihirli Aletleri',
                pairs: [
                    { id: '1', image: '🩺', name: 'Sihirli Mikrofon (Stetoskop)' },
                    { id: '2', image: '🩹', name: 'Kahraman Bandı (Yara Bandı)' },
                    { id: '3', image: '🛏️', name: 'İyileşme Kapsülü (Yatak)' }
                ]
            },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    },
    {
        id: 2, title: 'Kalkanım', icon: '🛡️', isLocked: false, gameType: 'quiz',
        levels: [
            { id: 1, isLocked: false, question: 'Dışarı çıkarken taktığımız şövalye zırhımız hangisidir?', options: [{ text: 'Maske', image: '😷', isCorrect: true }, { text: 'Şapka', image: '🧢', isCorrect: false }] },
            {
                id: 2,
                isLocked: true,
                gameType: 'sorting',
                question: 'Neler Bizi Korur? Neler Bizi Hasta Eder?',
                dropzones: {
                    left: { type: 'protect', title: 'Koruyucular' },
                    right: { type: 'harm', title: 'Tehlikeler' }
                },
                winTitle: 'Mükemmel Koruma! 🛡️',
                winMessage: 'Maskemiz ve sabunumuz bizim en güçlü kalkanımızdır!',
                winEmoji: '🧼',
                items: [
                    { id: '1', name: 'Sabun', emoji: '🧼', type: 'protect' },
                    { id: '2', name: 'Maske', emoji: '😷', type: 'protect' },
                    { id: '3', name: 'Çöpler', emoji: '🗑️', type: 'harm' },
                    { id: '4', name: 'Öksürük', emoji: '🤧', type: 'harm' }
                ]
            },
            { id: 3, isLocked: true, question: 'Ziyaretçilerden bizi korumak için ne istemeliyiz?', options: [{ text: 'Ağızlarını kapatmalarını (Maske)', image: '😷', isCorrect: true }, { text: 'Bize sarılmalarını', image: '🫂', isCorrect: false }] },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    },
    {
        id: 3, title: 'Kan Damlası', icon: '❤️', isLocked: false, gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                gameType: 'sorting',
                question: 'Alyuvar Fabrikamızı Neler Hızlandırır?',
                dropzones: {
                    left: { type: 'boost', title: 'Hızlandıranlar' },
                    right: { type: 'slow', title: 'Yavaşlatanlar' }
                },
                winTitle: 'Fabrika Tam Gaz! 🏭',
                winMessage: 'Gülümsemek, moralini yüksek tutmak ve sevgi hürelerimizi hızla yeniler!',
                winEmoji: '💖',
                items: [
                    { id: '1', name: 'Gülümsemek', emoji: '😊', type: 'boost' },
                    { id: '2', name: 'Sevgi', emoji: '❤️', type: 'boost' },
                    { id: '3', name: 'Ağlamak', emoji: '😢', type: 'slow' },
                    { id: '4', name: 'Yaralanmak', emoji: '🩹', type: 'slow' }
                ]
            },
            { id: 2, isLocked: true, question: 'Laboratuvarda gücümüzü ölçmek için neye bakarlar?', options: [{ text: 'Kan Tahliline', image: '🩸', isCorrect: true }, { text: 'Boyumuza', image: '📏', isCorrect: false }] },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                question: 'Kan Hücrelerinin Görevleri',
                pairs: [
                    { id: '1', image: '🛡️', name: 'Koruyucu Şövalyeler (Akyuvar)' },
                    { id: '2', image: '🎈', name: 'Oksijen Taşıyan Balonlar (Alyuvar)' },
                    { id: '3', image: '🩹', name: 'Tamirciler (Trombosit)' }
                ]
            },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    },
    {
        id: 4, title: 'İksirlerim', icon: '💧', isLocked: false, gameType: 'quiz',
        levels: [
            { id: 1, isLocked: false, question: 'Yaramaz hücreleri uyutan şey nedir?', options: [{ text: 'Doktorun Verdiği İlaç (İksir)', image: '💊', isCorrect: true }, { text: 'Sokaktaki Şeker', image: '🍬', isCorrect: false }] },
            {
                id: 2,
                isLocked: true,
                gameType: 'sorting',
                question: 'İksirleri Abur Cuburlardan Ayır!',
                dropzones: {
                    left: { type: 'potion', title: 'Gerçek İksirler' },
                    right: { type: 'candy', title: 'Abur Cuburlar' }
                },
                winTitle: 'Harika Keskin Nişancı! 🎯',
                winMessage: 'Gerçek iksirler doktorların verdiği ilaçlar ve serumlardır. Şekerler bizi iyileştirmez.',
                winEmoji: '🧪',
                items: [
                    { id: '1', name: 'Hap', emoji: '💊', type: 'potion' },
                    { id: '2', name: 'Şurup', emoji: '🥄', type: 'potion' },
                    { id: '3', name: 'Lolipop', emoji: '🍭', type: 'candy' },
                    { id: '4', name: 'Çikolata', emoji: '🍫', type: 'candy' }
                ]
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                question: 'Sihirli Uzay Cihazları! (Hastane Eşyaları)',
                pairs: [
                    { id: '1', image: '🩻', name: 'İçimizi Çeken Gizli Fotoğraf Makinesi (Röntgen)' },
                    { id: '2', image: '🧲', name: 'Dev Uzay Gemisi Kapsülü (MR Cihazı)' },
                    { id: '3', image: '🩸', name: 'Kan Değerimizi Söyleyenen Büyüteç (Tüp)' }
                ]
            },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    },
    {
        id: 5,
        title: 'Mamalarım',
        icon: '🥦',
        isLocked: false,
        gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                gameType: 'sorting',
                question: 'Kahramanlar hangi yakıtla beslenir? Yiyecekleri Ayır!',
                dropzones: {
                    left: { type: 'healthy', title: 'Güç Verenler' },
                    right: { type: 'unhealthy', title: 'Zayıflatanlar' }
                },
                winTitle: 'Gerçek Bir Aşçısın! 👨‍🍳',
                winMessage: 'Açık şekerler veya yıkanmamış gıdalar kahraman arabanı yavaşlatır. Temiz ev yemekleri sana SÜPER GÜÇ verir!',
                winEmoji: '🥕',
                items: [
                    { id: 's1', name: 'Yıkanmış Meyve', emoji: '🍏', type: 'healthy' },
                    { id: 's2', name: 'Taze Çorba', emoji: '🥣', type: 'healthy' },
                    { id: 'u1', name: 'Açık Cips', emoji: '🍟', type: 'unhealthy' },
                    { id: 'u2', name: 'Kola', emoji: '🥤', type: 'unhealthy' }
                ]
            },
            { id: 2, isLocked: true, question: 'Süper güçlerini korumak için meyveleri nasıl yemelisin?', options: [{ text: 'Ağaçtan koptuğu gibi (Topraklı)', image: '🍎', isCorrect: false }, { text: 'Bol su ile iyice yıkanmış', image: '🍏', isCorrect: true }] },
            { id: 3, isLocked: true, question: 'Hastanede yatıyorken hangisini tüketmek çok tehlikelidir?', options: [{ text: 'Geniş açıkta satılan abur cuburlar', image: '🥨', isCorrect: true }, { text: 'Annemizin evde yaptığı taze çorba', image: '🥣', isCorrect: false }] },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    },
    {
        id: 6, title: 'Nenni Vakti', icon: '🌙', isLocked: false, gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                gameType: 'sorting',
                question: 'Uyumadan Önce Sakinleşmek mi, Yorulmak mı?',
                dropzones: {
                    left: { type: 'relax', title: 'Sakinleştirenler' },
                    right: { type: 'tire', title: 'Yoranlar' }
                },
                winTitle: 'Huzurlu Uykular! 💤',
                winMessage: 'Uyumadan önce kitap okumak ve ninni dinlemek şarj olmanı kolaylaştırır.',
                winEmoji: '🌙',
                items: [
                    { id: '1', name: 'Kitap Okumak', emoji: '📖', type: 'relax' },
                    { id: '2', name: 'Uyku Arkadaşı', emoji: '🧸', type: 'relax' },
                    { id: '3', name: 'Koşmak', emoji: '🏃', type: 'tire' },
                    { id: '4', name: 'Top Oynamak', emoji: '⚽', type: 'tire' }
                ]
            },
            { id: 2, isLocked: true, question: 'Kahramanlar yorulunca enerjilerini nerede şarj ederler?', options: [{ text: 'Yatakta (Uyku Kapsülü)', image: '🛏️', isCorrect: true }, { text: 'Arabada', image: '🚗', isCorrect: false }] },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                question: 'Uyku Kapsülü Eşyaları',
                pairs: [
                    { id: '1', image: '🛏️', name: 'Yumuşak Kapsül (Yatak)' },
                    { id: '2', image: '🧸', name: 'Uyku Arkadaşı (Oyuncak)' },
                    { id: '3', image: '🌙', name: 'Gece Lambası (Ay)' }
                ]
            },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    },
    {
        id: 7,
        title: 'Oyun Odam',
        icon: '🚀',
        isLocked: false,
        gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                gameType: 'sorting',
                question: 'Hastanede Canımız Sıkılınca Neler Yapabiliriz?',
                dropzones: {
                    left: { type: 'fun', title: 'Eğlenceli' },
                    right: { type: 'boring', title: 'Ekranlar' }
                },
                winTitle: 'Harika Fikirler! 🎨',
                winMessage: 'Hastanede yatarken sadece tabletle değil, resim çizerek ve oyuncaklarla da harika maceralar yaşayabiliriz!',
                winEmoji: '🚀',
                items: [
                    { id: '1', name: 'Boya Kalemi', emoji: '🎨', type: 'fun' },
                    { id: '2', name: 'Oyuncak', emoji: '🧸', type: 'fun' },
                    { id: '3', name: 'Telefon', emoji: '📱', type: 'boring' },
                    { id: '4', name: 'Bilgisayar', emoji: '💻', type: 'boring' }
                ]
            },
            { id: 2, isLocked: true, question: 'Çok uzun süre tablet ile oynarsak ne olur?', options: [{ text: 'Gözümüz kızarır.', image: '😵', isCorrect: true }, { text: 'Masal gemimiz uçar.', image: '📖', isCorrect: false }] },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                question: 'Sıkıntıyı Kovan Şeyler',
                pairs: [
                    { id: '1', image: '📖', name: 'Hikaye Gemisi (Masal Kitabı)' },
                    { id: '2', image: '🎨', name: 'Renk Cüceleri (Boyalar)' },
                    { id: '3', image: '🧸', name: 'Oyun Arkadaşı (Ayıcık)' }
                ]
            },
            { id: 4, isLocked: true, question: '', options: [] },
            { id: 5, isLocked: true, question: '', options: [] },
            { id: 6, isLocked: true, question: '', options: [] },
            { id: 7, isLocked: true, question: '', options: [] },
            { id: 8, isLocked: true, question: '', options: [] },
            { id: 9, isLocked: true, question: '', options: [] },
            { id: 10, isLocked: true, question: '', options: [] }
        ]
    }
];
