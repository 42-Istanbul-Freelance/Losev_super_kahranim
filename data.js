// ═══════════════════════════════════════════════════════
// LÖSEV SÜPER KAHRAMANIM — İçerik Verileri
// ═══════════════════════════════════════════════════════

const modulesData = [
    // ──────────────────────────────────────────────────
    // 1. YARDIMLAŞMA
    // ──────────────────────────────────────────────────
    {
        id: 'yardim',
        title: 'Yardımlaşma',
        icon: '🤝',
        color: '#FFE0B2',
        colorDark: '#F57C00',
        description: 'Küçük iyilikler dünyayı değiştirir!',
        pet: { type: 'dog', name: 'Zeytin', emoji: '🐶', foodIcon: '🦴' },
        levels: [
            {
                id: 1,
                title: 'Birlikte Güçlüyüz',
                type: 'drag-drop',
                xp: 30,
                targetFood: 1,
                gameData: {
                    heroTitle: 'Yardım Et!',
                    targetEmoji: '👵',
                    successEmoji: '👵🛍️',
                    successTitle: 'Çok Naziksin!',
                    successIcon: '🤝',
                    items: [
                        { id: 'grocery', icon: '🛍️', name: 'Poşet', isGood: true, message: 'Harika! Büyüklere ve ihtiyacı olanlara yardım etmek bizi gerçek bir süper kahraman yapar! 🦸‍♂️🤝' }
                    ]
                }
            },
            { id: 2, title: 'İlk Adım', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 3, title: 'Kahramanlık', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 4, title: 'Birlikte Güçlüyüz', type: 'info', xp: 10, targetFood: 1 },
            { id: 5, title: 'Süper Yardımcı', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 6, title: 'Görev 6', type: 'info', xp: 10, targetFood: 1 },
            { id: 7, title: 'Görev 7', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 9, title: 'Görev 9', type: 'info', xp: 10, targetFood: 1 },
            { id: 10, title: 'Görev 10', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 11, title: 'Görev 11', type: 'info', xp: 10, targetFood: 1 },
            { id: 12, title: 'Görev 12', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 1 },
            { id: 15, title: 'Büyük Final', type: 'quiz', xp: 100, targetFood: 5 }
        ]
    },

    // ──────────────────────────────────────────────────
    // 2. PAYLAŞMA
    // ──────────────────────────────────────────────────
    {
        id: 'paylasma',
        title: 'Paylaşma',
        icon: '🎁',
        color: '#F3E5F5',
        colorDark: '#9C27B0',
        description: 'Paylaştıkça çoğalır!',
        pet: { type: 'squirrel', name: 'Ceviz', emoji: '🐿️', foodIcon: '🌰' },
        levels: [
            {
                id: 1,
                title: 'Paylaşmak Güzeldir',
                type: 'drag-drop',
                xp: 30,
                targetFood: 1,
                gameData: {
                    heroTitle: 'Birlikte Oyna!',
                    targetEmoji: '👦',
                    successEmoji: '👦🧸',
                    successTitle: 'Mükemmel!',
                    successIcon: '💖',
                    items: [
                        { id: 'toy', icon: '🧸', name: 'Oyuncak', isGood: true, message: 'Harika! Oyuncaklarımızı ve eşyalarımızı arkadaşlarımızla paylaştıkça mutluluğumuz daha da büyür! 🎁✨' }
                    ]
                }
            },
            { id: 2, title: 'Sıra Sende', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 3, title: 'Oyuncak Paylaşımı', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 4, title: 'Duyguları Paylaş', type: 'info', xp: 10, targetFood: 1 },
            { id: 5, title: 'Büyük Paylaşım', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 6, title: 'Görev 6', type: 'info', xp: 10, targetFood: 1 },
            { id: 7, title: 'Görev 7', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 9, title: 'Görev 9', type: 'info', xp: 10, targetFood: 1 },
            { id: 10, title: 'Görev 10', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 11, title: 'Görev 11', type: 'info', xp: 10, targetFood: 1 },
            { id: 12, title: 'Görev 12', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 1 },
            { id: 15, title: 'Büyük Final', type: 'quiz', xp: 100, targetFood: 5 }
        ]
    },

    // ──────────────────────────────────────────────────
    // 3. GÖNÜLLÜLÜK
    // ──────────────────────────────────────────────────
    {
        id: 'gonulluluk',
        title: 'Gönüllülük',
        icon: '❤️',
        color: '#FFCDD2',
        colorDark: '#E53935',
        description: 'Gönülden yapılan iyilik en güzel iyiliktir!',
        pet: { type: 'bee', name: 'Bal', emoji: '🐝', foodIcon: '🍯' },
        levels: [
            {
                id: 1,
                title: 'Doğa Dostu',
                type: 'drag-drop',
                xp: 30,
                targetFood: 1,
                gameData: {
                    heroTitle: 'Geri Dönüşüm!',
                    targetEmoji: '♻️',
                    successEmoji: '🌍✨',
                    successTitle: 'Harikasın!',
                    successIcon: '🌱',
                    items: [
                        { id: 'plastic', icon: '🥤', name: 'Çöp', isGood: true, message: 'Mükemmel! Çöpleri doğaya değil geri dönüşüme atarak hayvanları ve dünyamızı kurtardın! 🌱🌍' }
                    ]
                }
            },
            { id: 2, title: 'Kalpten Gelen', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 3, title: 'Çevremize Destek', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 4, title: 'Küçük Adımlar', type: 'info', xp: 10, targetFood: 1 },
            { id: 5, title: 'Gönüllü Kahraman', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 6, title: 'Görev 6', type: 'info', xp: 10, targetFood: 1 },
            { id: 7, title: 'Görev 7', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 9, title: 'Görev 9', type: 'info', xp: 10, targetFood: 1 },
            { id: 10, title: 'Görev 10', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 11, title: 'Görev 11', type: 'info', xp: 10, targetFood: 1 },
            { id: 12, title: 'Görev 12', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 1 },
            { id: 15, title: 'Büyük Final', type: 'quiz', xp: 100, targetFood: 5 }
        ]
    },

    // ──────────────────────────────────────────────────
    // 4. SAĞLIK VE HİJYEN
    // ──────────────────────────────────────────────────
    {
        id: 'saglik',
        title: 'Sağlık & Hijyen',
        icon: '🧼',
        color: '#E0F7FA',
        colorDark: '#00ACC1',
        description: 'Mikroplardan güçlü olabilirsin!',
        pet: { type: 'cat', name: 'Pamuk', emoji: '🐱', foodIcon: '🐟' },
        levels: [
            {
                id: 1,
                title: 'Tertemiz Eller',
                type: 'drag-drop',
                xp: 30,
                targetFood: 1,
                gameData: {
                    subType: 'wash-hands',
                    heroTitle: 'Ellerini Yıka!',
                    targetEmoji: '🖐️',
                    items: [
                        { id: 'soap', icon: '🧼', name: 'Sabun', isGood: true, message: 'Harika! Sabun mikropları hapseder. Şimdi suyla durulama vakti! 🧼✨' },
                        { id: 'water', icon: '💧', name: 'Su', isGood: true, message: 'Mükemmel! Su ve sabun birleşince ellerimiz tertemiz olur ve mikroplar gider! 🌊✨' }
                    ]
                }
            },
            { id: 2, title: 'El Yıkama', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 3, title: 'Güç Kalkanı', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 4, title: 'Süper Uyku', type: 'info', xp: 10, targetFood: 1 },
            { id: 5, title: 'Sağlık Yıldızı', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 6, title: 'Görev 6', type: 'info', xp: 10, targetFood: 1 },
            { id: 7, title: 'Görev 7', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 9, title: 'Görev 9', type: 'info', xp: 10, targetFood: 1 },
            { id: 10, title: 'Görev 10', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 11, title: 'Görev 11', type: 'info', xp: 10, targetFood: 1 },
            { id: 12, title: 'Görev 12', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 1 },
            { id: 15, title: 'Büyük Final', type: 'quiz', xp: 100, targetFood: 5 }
        ]
    },

    // ──────────────────────────────────────────────────
    // 5. BESLENME
    // ──────────────────────────────────────────────────
    {
        id: 'beslenme',
        title: 'Beslenme',
        icon: '🥗',
        color: '#E8F5E9',
        colorDark: '#43A047',
        description: 'Doğru yiyecekler süper güç verir!',
        pet: { type: 'rabbit', name: 'Zıpzıp', emoji: '🐰', foodIcon: '🥕' },
        levels: [
            {
                id: 1,
                title: 'Süper Yakıtlar',
                type: 'drag-drop',
                xp: 20,
                targetFood: 2,
                gameData: {
                    heroTitle: 'Beni Besle!',
                    items: [
                        { id: 'water', icon: '💧', name: 'Su', isGood: true, message: 'Harika! 🌊 Su vücudumuzu temizler, enerji verir ve bizi hastalıklardan korur! 🛡️' },
                        { id: 'cola', icon: '🥤', name: 'Kola', isGood: false, message: 'Dikkat! 🚫 Asitli ve çok şekerli içecekler kemiklere ve dişlere zarar verebilir! 🦷' }
                    ]
                }
            },
            { id: 2, title: 'Su Canavarı', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 3, title: 'Renkli Tabaklar', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 4, title: 'Şeker Tuzağı', type: 'info', xp: 10, targetFood: 1 },
            { id: 5, title: 'Güçlü Beden', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 6, title: 'Görev 6', type: 'info', xp: 10, targetFood: 1 },
            { id: 7, title: 'Görev 7', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 9, title: 'Görev 9', type: 'info', xp: 10, targetFood: 1 },
            { id: 10, title: 'Görev 10', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 11, title: 'Görev 11', type: 'info', xp: 10, targetFood: 1 },
            { id: 12, title: 'Görev 12', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 1 },
            { id: 15, title: 'Büyük Final', type: 'quiz', xp: 100, targetFood: 5 }
        ]
    },

    // ──────────────────────────────────────────────────
    // 6. GÜNLÜK YAŞAM ALIŞKANLIKLARI
    // ──────────────────────────────────────────────────
    {
        id: 'yasam',
        title: 'Günlük Yaşam',
        icon: '🌅',
        color: '#EDE7F6',
        colorDark: '#5E35B1',
        description: 'Küçük alışkanlıklar büyük kahramanlar yaratır!',
        pet: { type: 'owl', name: 'Bilge', emoji: '🦉', foodIcon: '🐛' },
        levels: [
            {
                id: 1,
                title: 'Uyku Vakti!',
                type: 'drag-drop',
                xp: 30,
                targetFood: 1,
                gameData: {
                    subType: 'sleep',
                    heroTitle: 'Dinlenme Zamanı!',
                    targetEmoji: '🛌',
                    items: [
                        { id: 'hero-sleep', icon: '🦸‍♂️', name: 'Kahraman', isGood: true, message: 'Harika! 🌙 Uyku sırasında vücudumuz dinlenir, beynimiz öğrendiklerini kaydeder ve büyümemize yardımcı olur! 😴✨' }
                    ]
                }
            },
            { id: 2, title: 'Duygu Durumu', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 3, title: 'Rahatlama Zamanı', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 4, title: 'Dijital Denge', type: 'info', xp: 10, targetFood: 1 },
            { id: 5, title: 'Rutin Ustası', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 6, title: 'Görev 6', type: 'info', xp: 10, targetFood: 1 },
            { id: 7, title: 'Görev 7', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 9, title: 'Görev 9', type: 'info', xp: 10, targetFood: 1 },
            { id: 10, title: 'Görev 10', type: 'quiz', xp: 40, targetFood: 2 },
            { id: 11, title: 'Görev 11', type: 'info', xp: 10, targetFood: 1 },
            { id: 12, title: 'Görev 12', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 1 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 1 },
            { id: 15, title: 'Büyük Final', type: 'quiz', xp: 100, targetFood: 5 }
        ]
    },

    // ──────────────────────────────────────────────────
    // 7. İYİLEŞME EVİM (KAHRAMAN MODU - FAZ 8)
    // ──────────────────────────────────────────────────
    {
        id: 'iyilesme',
        title: 'İyileşme Evim',
        icon: '🏥',
        color: '#FFEBEE',
        colorDark: '#E53935',
        description: 'Kahramanlar hastanede de süperdir!',
        heroMode: true, // Pet yerine kahramanın sağlığı (Health Bar) geçerli
        pet: { emoji: '🦸‍♂️', name: 'Kahraman', foodIcon: '💖' },
        levels: [
            {
                id: 1,
                title: 'Süper Kalkan',
                type: 'drag-drop',
                xp: 30,
                targetFood: 0,
                gameData: {
                    heroTitle: 'Maskemi Tak!',
                    targetEmoji: '👦',
                    successEmoji: '😷',
                    items: [
                        { id: 'mask', icon: '😷', name: 'Maske', isGood: true, message: 'Harika! 🦸‍♂️ Maskeler bizi virüslerden ve mikroplardan koruyan süper kalkanlarımızdır! 🛡️' }
                    ]
                }
            },
            { id: 2, title: 'Bakteri Avı', type: 'quiz', xp: 20, targetFood: 0 },
            { id: 3, title: 'Cesaret Rozeti', type: 'info', xp: 20, targetFood: 0 },
            { id: 4, title: 'İlaç Gücü', type: 'quiz', xp: 30, targetFood: 0 },
            { id: 5, title: 'Sihirli Uyku', type: 'info', xp: 10, targetFood: 0 },
            { id: 6, title: 'Görev 6', type: 'quiz', xp: 20, targetFood: 0 },
            { id: 7, title: 'Görev 7', type: 'info', xp: 10, targetFood: 0 },
            { id: 8, title: 'Görev 8', type: 'quiz', xp: 20, targetFood: 0 },
            { id: 9, title: 'Görev 9', type: 'quiz', xp: 20, targetFood: 0 },
            { id: 10, title: 'Görev 10', type: 'info', xp: 20, targetFood: 0 },
            { id: 11, title: 'Görev 11', type: 'quiz', xp: 30, targetFood: 0 },
            { id: 12, title: 'Görev 12', type: 'info', xp: 10, targetFood: 0 },
            { id: 13, title: 'Görev 13', type: 'quiz', xp: 20, targetFood: 0 },
            { id: 14, title: 'Görev 14', type: 'info', xp: 10, targetFood: 0 },
            { id: 15, title: 'Sağlık Şövalyesi', type: 'quiz', xp: 100, targetFood: 0 }
        ]
    }
];

// Eski Academy Dialogları (Şimdilik saklanabilir veya kullanılabilir)
const hospitalDialogs = {
    launch: [
        "Süper yakıt yüklendi! Şimdi uçma zamanı! 🚀",
        "Doktorunun yardımıyla kalkanların %100! 🛡️",
        "Bu meyveler sana süper hız verdi! ⚡"
    ]
};

// ═══════════════════════════════════════════════════════
// ÖRNEK TOPLULUK PROFİLLERİ (Sabit kahramanlar)
// ═══════════════════════════════════════════════════════
const SAMPLE_HEROES = [
    {
        id: 'sample_1',
        displayName: 'Elif Yıldız',
        username: 'elifyildiz',
        avatar: '🦸‍♀️',
        avatarBg: '#FFD6E0',
        gender: 'girl',
        birthDate: '2014-03-15',
        bio: 'Her gün biraz daha güçlüyüm! 💪',
        stars: 48,
        xp: 320,
        status: '🍎 Bugün sağlıklı bir besin olarak elma yedim! Çok lezzetliydi.',
        statusEmoji: '🍎',
        statusTime: 'Bugün',
        streaks: { nutrition: 12, medication: 15, activity: 8 },
        streakHistory: {}, // dolu gözükecek
        isSample: true
    },
    {
        id: 'sample_2',
        displayName: 'Can Kahraman',
        username: 'cankahraman',
        avatar: '🦸‍♂️',
        avatarBg: '#D6E4FF',
        gender: 'boy',
        birthDate: '2013-07-22',
        bio: 'Süper kahramanlar asla pes etmez!',
        stars: 62,
        xp: 580,
        status: '🎨 Bugün resim yaptım! Hastanedeki hemşire ablama çiçek çizdim 🌸',
        statusEmoji: '🎨',
        statusTime: 'Bugün',
        streaks: { nutrition: 5, medication: 20, activity: 5 },
        streakHistory: {},
        isSample: true
    },
    {
        id: 'sample_3',
        displayName: 'Zeynep Güneş',
        username: 'zeynepgunes',
        avatar: '🦸‍♀️',
        avatarBg: '#FFF3CD',
        gender: 'girl',
        birthDate: '2015-11-08',
        bio: 'Güneş gibi parlıyorum her gün! ☀️',
        stars: 31,
        xp: 210,
        status: '💊 Bugün ilaçlarımı zamanında aldım ve doktorum çok mutlu oldu! 👨‍⚕️',
        statusEmoji: '💊',
        statusTime: 'Bugün',
        streaks: { nutrition: 7, medication: 30, activity: 3 },
        streakHistory: {},
        isSample: true
    },
    {
        id: 'sample_4',
        displayName: 'Ahmet Fırtına',
        username: 'ahmetfirtina',
        avatar: '🦸‍♂️',
        avatarBg: '#D6FFE4',
        gender: 'boy',
        birthDate: '2012-05-30',
        bio: 'Fırtına gibi hızlı, kahraman gibi güçlü!',
        stars: 87,
        xp: 740,
        status: '🏥 Bugün doktora ve hemşirelere teşekkür ettim ve onları çok sevdiğimi söyledim! ❤️',
        statusEmoji: '🏥',
        statusTime: 'Bugün',
        streaks: { nutrition: 14, medication: 14, activity: 14 },
        streakHistory: {},
        isSample: true
    },
    {
        id: 'sample_5',
        displayName: 'Ayşe Işık',
        username: 'ayseisik',
        avatar: '🦸‍♀️',
        avatarBg: '#F3E8FF',
        gender: 'girl',
        birthDate: '2016-01-12',
        bio: 'Küçük ama güçlüyüm! ✨',
        stars: 19,
        xp: 95,
        status: '🚶 Bugün koridorda 10 dakika yürüdüm, harika hissettim! Yarın daha çok yürüyeceğim!',
        statusEmoji: '🚶',
        statusTime: 'Bugün',
        streaks: { nutrition: 3, medication: 6, activity: 4 },
        streakHistory: {},
        isSample: true
    }
];

// ═══════════════════════════════════════════════════════
// GÜNLÜK GERÇEK HAYAT GÖREVLERİ
// ═══════════════════════════════════════════════════════
const DAILY_MISSIONS = [
    // 💙 Şükran / Takdir
    {
        id: 'thank_doctor',
        category: 'Şükran',
        categoryColor: '#43C6AC',
        emoji: '💙',
        title: 'Doktoruma Teşekkür',
        task: 'Bugün doktoruna veya hemşirene gidip "Sağ olun, size güveniyorum" de. Bu kartı onlara göster!',
        cardText: '💙 Bugün bana baktığın için çok teşekkür ederim! Sen benim süper kahramanımsın! 🦸',
        showTo: 'Doktor veya Hemşire',
        xp: 20,
        badgeHint: '💙 Sevgi Elçisi rozetine ilerliyorsun!'
    },
    {
        id: 'thank_parent',
        category: 'Şükran',
        categoryColor: '#43C6AC',
        emoji: '🤗',
        title: 'Aileme Teşekkür',
        task: 'Yanındaki aile üyesine bir sarılma ver ve "Seninle burada olman beni güçlendiriyor" de!',
        cardText: '🤗 Seninle burada olmak beni çok güçlü hissettiriyor. Seni çok seviyorum! ❤️',
        showTo: 'Aile üyesi',
        xp: 15,
        badgeHint: null
    },
    // 🌟 Sosyal Bağ
    {
        id: 'smile_challenge',
        category: 'Sosyal Bağ',
        categoryColor: '#F093FB',
        emoji: '😊',
        title: 'Gülümseme Görevi',
        task: 'Bugün karşına çıkan ilk 3 kişiye içten bir gülümseme ver! Bu kartı yanında taşı.',
        cardText: '😊 Bu kart benim "Bugün 3 kişiyi gülümsetme" görevim! Sen de gülümser misin? 🌟',
        showTo: 'Herhangi biri',
        xp: 15,
        badgeHint: null
    },
    {
        id: 'share_drawing',
        category: 'Yaratıcılık',
        categoryColor: '#F7971E',
        emoji: '🎨',
        title: 'Çizimini Paylaş',
        task: 'Bugün bir şey çiz — bir çiçek, kahraman, ya da ne istersen — ve yanındaki birine göster!',
        cardText: '🎨 Bu benim bugünkü çizimim! Umuyorum ki seni de gülümsetir 🌸',
        showTo: 'Hemşire veya aile',
        xp: 15,
        badgeHint: null
    },
    // 💊 Sağlık
    {
        id: 'breathing_exercise',
        category: 'Nefes & Rahatlama',
        categoryColor: '#6C63FF',
        emoji: '🧘',
        title: 'Nefes Egzersizi Göster',
        task: 'Hemşirenle birlikte 3 derin nefes al: burundan 4 say, 4 tut, ağızdan 4 say. Bu kartı göster!',
        cardText: '🧘 Birlikte nefes egzersizi yapabilir miyiz? Doktorum bunu önce söyledi, çok iyi hissettiriyor!',
        showTo: 'Hemşire veya aile',
        xp: 20,
        badgeHint: null
    },
    {
        id: 'medication_reminder',
        category: 'Sağlıklı Alışkanlık',
        categoryColor: '#FF6B6B',
        emoji: '💊',
        title: 'İlaç Hatırlatıcı',
        task: 'Hemşirene bugünkü ilaçlarını aldığını söyle. Bu kartı göster ve onaylamasını iste!',
        cardText: '💊 Bugün ilaçlarımı aldım! Beni onaylıyor musun? ✅',
        showTo: 'Hemşire',
        xp: 20,
        badgeHint: '💊 İlaç Şampiyonu rozetine yaklaşıyorsun!'
    },
    {
        id: 'healthy_food_share',
        category: 'Sağlıklı Beslenme',
        categoryColor: '#43C6AC',
        emoji: '🥗',
        title: 'Sağlıklı Besin Kahraman',
        task: 'Bugün sağlıklı bir şey yerliysen doktoruna veya hemşirene söyle. Bu kartı göster!',
        cardText: '🥗 Bugün sağlıklı bir şey yedim! Benim için mutlu musun? 😊',
        showTo: 'Doktor veya Hemşire',
        xp: 15,
        badgeHint: null
    },
    // 💪 Cesaret
    {
        id: 'brave_question',
        category: 'Cesaret',
        categoryColor: '#FFD200',
        emoji: '🦁',
        title: 'Cesur Soru',
        task: 'Bugün doktoruna veya hemşirene merak ettiğin bir soruyu sor! Bu kartı göster ve soruyu belirt.',
        cardText: '🦁 Sana sormak istediğim bir şey var... Bana cevaplar mısın? Merak etmek cesaret ister!',
        showTo: 'Doktor veya Hemşire',
        xp: 25,
        badgeHint: null
    },
    {
        id: 'hero_pose',
        category: 'Süper Kahraman',
        categoryColor: '#6C63FF',
        emoji: '🦸',
        title: 'Süper Kahraman Pozu',
        task: 'Ayağa kalk (ya da yatarken bile olsa!), avuçlarını bele koy ve "Ben güçlüyüm!" de! Yanındaki kişiye göster!',
        cardText: '🦸 Bu benim süper kahraman pozum! Bugün ben güçlüyüm! Sen de bir poz yapar mısın?',
        showTo: 'Herhangi biri',
        xp: 15,
        badgeHint: null
    },
    // 🌙 Huzur
    {
        id: 'sleep_prep',
        category: 'İyi Uyku',
        categoryColor: '#191654',
        emoji: '🌙',
        title: 'Uyku Hazırlığı',
        task: 'Bu gece yatmadan önce hemşirene veya aile üyene "İyi geceler, sizi seviyorum" de. Bu kartı göster!',
        cardText: '🌙 Bu gece iyi geceler demek istedim! Sizi çok seviyorum 💜',
        showTo: 'Aile veya hemşire',
        xp: 10,
        badgeHint: null
    }
];
