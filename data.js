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
                gameType: 'quiz',
                content_2_5: {
                    question: 'Süper Ekibi Bul!',
                    options: [
                        { image: '👽', isCorrect: false },
                        { image: '👨‍⚕️', isCorrect: true }
                    ],
                    winTitle: 'Süper!',
                    winMessage: 'Doktorlar bizimle!',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🦸‍♂️'
                },
                content_6_8: {
                    question: 'Süper İyileştirici Ekibimiz Kimdir?',
                    options: [
                        { text: 'Uzaylılar', image: '👽', isCorrect: false },
                        { text: 'Doktor ve Hemşireler', image: '👨‍⚕️', isCorrect: true }
                    ],
                    winTitle: 'Süper Ekibini Tanıdın! 🦸‍♂️🦸‍♀️',
                    winMessage: 'Doktor ve hemşireler senin <b>süper kahraman takımındır!</b>',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🤝'
                },
                content_9_plus: {
                    question: 'Hastanede tedavimizi yürüten uzman ekip kimlerden oluşur?',
                    options: [
                        { text: 'Sadece Yüzücüler', image: '🏊', isCorrect: false },
                        { text: 'Doktor, Hemşire, Psikolog', image: '🏥', isCorrect: true }
                    ],
                    winTitle: 'Harika Analiz! 🔬',
                    winMessage: 'Doktorlar, hemşireler ve laboratuvar uzmanları, hücrelerini yenilemek ve seni hızla sağlığına kavuşturmak için yıllarca bilimsel eğitim almış uzman bir ekiptir.',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🎖️'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'sorting',
                content_2_5: {
                    question: 'Kahramanları Ayır!',
                    dropzones: { left: { type: 'hero', title: 'Kahraman' }, right: { type: 'villain', title: 'Pislik' } },
                    items: [{ id: '1', name: 'Doktor', emoji: '👨‍⚕️', type: 'hero' }, { id: '2', name: 'Hemşire', emoji: '👩‍⚕️', type: 'hero' }, { id: '3', name: 'Mikrop', emoji: '🦠', type: 'villain' }, { id: '4', name: 'Toz', emoji: '💨', type: 'villain' }],
                    winTitle: 'Başardın!',
                    winMessage: 'Kahramanlar kazandı!',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🦸‍♀️'
                },
                content_6_8: {
                    question: 'Kahraman Ekibimizi ve Düşmanları Ayır!',
                    dropzones: { left: { type: 'hero', title: 'Kahramanlar' }, right: { type: 'villain', title: 'Düşmanlar' } },
                    items: [{ id: '1', name: 'Doktor', emoji: '👨‍⚕️', type: 'hero' }, { id: '2', name: 'Hemşire', emoji: '👩‍⚕️', type: 'hero' }, { id: '3', name: 'Mikrop', emoji: '🦠', type: 'villain' }, { id: '4', name: 'Pis Tozlar', emoji: '💨', type: 'villain' }],
                    winTitle: 'Harika Kurtarış! 🛡️',
                    winMessage: 'Doktorlar ve hemşireler mikropları yener!',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🛡️'
                },
                content_9_plus: {
                    question: 'Bağışıklık Destekçilerini ve Tehditleri Sınıflandır',
                    dropzones: { left: { type: 'hero', title: 'Bağışıklık Desteği' }, right: { type: 'villain', title: 'Enfeksiyon Riski' } },
                    items: [{ id: '1', name: 'Uzman Hekim', emoji: '👨‍⚕️', type: 'hero' }, { id: '2', name: 'Steril İlaçlar', emoji: '💉', type: 'hero' }, { id: '3', name: 'Bakteriler', emoji: '🦠', type: 'villain' }, { id: '4', name: 'Hava Kirliliği', emoji: '💨', type: 'villain' }],
                    winTitle: 'Mükemmel Sınıflandırma! 🔬',
                    winMessage: 'Tedavi sürecinde bağışıklık sistemimiz (akyuvarlar) hassaslaşır. Bu yüzden doktorların sağladığı steril ortamlar ve ilaçlar bizim en büyük destekçimizdir.',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🧬'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                content_2_5: {
                    question: 'Aletleri Eşleştir!',
                    pairs: [{ id: '1', image: '🩺', name: 'Mikrofon' }, { id: '2', image: '🩹', name: 'Bant' }, { id: '3', image: '🛏️', name: 'Yatak' }],
                    winTitle: 'Harika!',
                    winMessage: 'Hepsi eşleşti!',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🧩'
                },
                content_6_8: {
                    question: 'Süper Ekibimizin Aletleri',
                    pairs: [{ id: '1', image: '🩺', name: 'Sihirli Mikrofon (Stetoskop)' }, { id: '2', image: '🩹', name: 'Kahraman Bandı' }, { id: '3', image: '🛏️', name: 'İyileşme Kapsülü' }],
                    winTitle: 'Sihirli Aleti Bildin! 🩺',
                    winMessage: 'Stetoskop doktorların <b>süper kulaklığıdır!</b> Kalbinin sesini dinlerler.',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '🎵'
                },
                content_9_plus: {
                    question: 'Tıbbi Cihazları ve İşlevlerini Eşleştir',
                    pairs: [{ id: '1', image: '🩺', name: 'Stetoskop (Kalp Dinler)' }, { id: '2', image: '🩹', name: 'Steril Yara Bandı' }, { id: '3', image: '🛏️', name: 'Hasta Yatağı' }],
                    winTitle: 'Ekipmanlar Hazır! 🏥',
                    winMessage: 'Stetoskop gibi tıbbi cihazlar, doktorların akciğer ve kalp ritmini dinleyerek vücudunun ne kadar hızlı iyileştiğini ölçmesini sağlayan bilimsel araçlardır.',
                    bgClass: 'bg-blue-50', borderClass: 'border-blue-200', winEmoji: '📈'
                }
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
            {
                id: 1,
                isLocked: false,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Maskeyi Bul!',
                    options: [{ image: '😷', isCorrect: true }, { image: '🧢', isCorrect: false }],
                    winEmoji: '🛡️', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                },
                content_6_8: {
                    question: 'Şövalye Kalkanımız Hangisi?',
                    options: [{ text: 'Maske', image: '😷', isCorrect: true }, { text: 'Şapka', image: '🧢', isCorrect: false }],
                    winTitle: 'Mükemmel!', winMessage: 'Maskemiz bizi görünmez tehlikelerden korur!',
                    winEmoji: '🛡️', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                },
                content_9_plus: {
                    question: 'Havadaki partiküllerden korunmak için dışarı çıkarken hangi tıbbi ekipmanı kullanırız?',
                    options: [{ text: 'Medikal Maske', image: '😷', isCorrect: true }, { text: 'Kumaş Şapka', image: '🧢', isCorrect: false }],
                    winTitle: 'Doğru Seçim! 🛡️', winMessage: 'Medikal maskeler havadaki gözle görülmeyen mikroorganizmaların solunum yolumuza girmesini engelleyen bir kalkandır.',
                    winEmoji: '😷', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'sorting',
                content_2_5: {
                    question: 'Koruyucuları Ayır!',
                    dropzones: { left: { type: 'protect', title: 'Koruyucu' }, right: { type: 'harm', title: 'Pislik' } },
                    items: [{ id: '1', name: 'Sabun', emoji: '🧼', type: 'protect' }, { id: '2', name: 'Maske', emoji: '😷', type: 'protect' }, { id: '3', name: 'Çöp', emoji: '🗑️', type: 'harm' }, { id: '4', name: 'Öksürük', emoji: '🤧', type: 'harm' }],
                    winEmoji: '🧼', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                },
                content_6_8: {
                    question: 'Neler Bizi Korur? Neler Bizi Hasta Eder?',
                    dropzones: { left: { type: 'protect', title: 'Koruyucular' }, right: { type: 'harm', title: 'Tehlikeler' } },
                    items: [{ id: '1', name: 'Sabun', emoji: '🧼', type: 'protect' }, { id: '2', name: 'Maske', emoji: '😷', type: 'protect' }, { id: '3', name: 'Çöpler', emoji: '🗑️', type: 'harm' }, { id: '4', name: 'Öksürük', emoji: '🤧', type: 'harm' }],
                    winTitle: 'Harika Kurtarış! 🛡️', winMessage: 'Maskemiz ve sabunumuz bizim en güçlü kalkanımızdır!',
                    winEmoji: '🧼', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                },
                content_9_plus: {
                    question: 'Hijyen Sağlayanlar ve Enfeksiyon Kaynaklarını Ayır',
                    dropzones: { left: { type: 'protect', title: 'Hijyen' }, right: { type: 'harm', title: 'Enfeksiyon Kaynağı' } },
                    items: [{ id: '1', name: 'Antibakteriyel Sabun', emoji: '🧼', type: 'protect' }, { id: '2', name: 'Cerrahi Maske', emoji: '😷', type: 'protect' }, { id: '3', name: 'Atıklar', emoji: '🗑️', type: 'harm' }, { id: '4', name: 'Damlacık', emoji: '🤧', type: 'harm' }],
                    winTitle: 'Mükemmel Koruma! 🛡️', winMessage: 'Ellerimizi sabunla yıkamak ve maske takmak, bağışıklığımızın ilk savunma hattıdır.',
                    winEmoji: '✨', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Güvenli Ziyaretçi Nasıl Olur?',
                    options: [{ image: '😷', isCorrect: true }, { image: '🫂', isCorrect: false }],
                    winEmoji: '🛡️', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                },
                content_6_8: {
                    question: 'Ziyaretçilerden bizi korumak için ne istemeliyiz?',
                    options: [{ text: 'Ağızlarını kapatmalarını (Maske)', image: '😷', isCorrect: true }, { text: 'Bize sarılmalarını', image: '🫂', isCorrect: false }],
                    winTitle: 'Güvendesin! 🛡️', winMessage: 'Maske takan ziyaretçiler seni mikroplardan korur!',
                    winEmoji: '🛡️', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                },
                content_9_plus: {
                    question: 'Ziyaretçilerle temas kurarken dikkat etmemiz gereken en önemli önlem nedir?',
                    options: [{ text: 'Maske Takmalarını İstemek', image: '😷', isCorrect: true }, { text: 'Fiziksel Temasta Bulunmak', image: '🫂', isCorrect: false }],
                    winTitle: 'Bilinçli Davranış! 🧤', winMessage: 'Sosyal mesafe kurallarına uymak ve maske takmak enflasyon/enfeksiyon riskini en aza indirir.',
                    winEmoji: '🛡️', bgClass: 'bg-orange-50', borderClass: 'border-orange-200'
                }
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
        id: 3, title: 'Kan Damlası', icon: '❤️', isLocked: false, gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                gameType: 'sorting',
                content_2_5: {
                    question: 'Kalbi Mutlu Edenleri Seç',
                    dropzones: { left: { type: 'boost', title: 'Mutlu' }, right: { type: 'slow', title: 'Üzgün' } },
                    items: [{ id: '1', name: 'Gülümse', emoji: '😊', type: 'boost' }, { id: '2', name: 'Sevgi', emoji: '❤️', type: 'boost' }, { id: '3', name: 'Ağlamak', emoji: '😢', type: 'slow' }, { id: '4', name: 'Yara', emoji: '🩹', type: 'slow' }],
                    winEmoji: '💖', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                },
                content_6_8: {
                    question: 'Alyuvar Fabrikamızı Neler Hızlandırır?',
                    dropzones: { left: { type: 'boost', title: 'Hızlandıranlar' }, right: { type: 'slow', title: 'Yavaşlatanlar' } },
                    items: [{ id: '1', name: 'Gülümsemek', emoji: '😊', type: 'boost' }, { id: '2', name: 'Sevgi', emoji: '❤️', type: 'boost' }, { id: '3', name: 'Ağlamak', emoji: '😢', type: 'slow' }, { id: '4', name: 'Yaralanmak', emoji: '🩹', type: 'slow' }],
                    winTitle: 'Fabrika Tam Gaz! 🏭', winMessage: 'Gülümsemek ve moralini yüksek tutmak sevgi hücrelerini hızla yeniler!',
                    winEmoji: '💖', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                },
                content_9_plus: {
                    question: 'Kan Hücrelerinin Üretimini Psikolojik Olarak Neler Etkiler?',
                    dropzones: { left: { type: 'boost', title: 'Pozitif Uyarıcılar' }, right: { type: 'slow', title: 'Stres Faktörleri' } },
                    items: [{ id: '1', name: 'Mutluluk', emoji: '😊', type: 'boost' }, { id: '2', name: 'Destek', emoji: '❤️', type: 'boost' }, { id: '3', name: 'Stres', emoji: '😢', type: 'slow' }, { id: '4', name: 'Travma', emoji: '🩹', type: 'slow' }],
                    winTitle: 'Harika Eşleşme! 🧠', winMessage: 'Vücudumuzdaki endorfin (mutluluk hormonu) salgılanması iyileşme sürecini hızlandırır.',
                    winEmoji: '🧪', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Kan Ölçer Aleti Seç',
                    options: [{ image: '🩸', isCorrect: true }, { image: '📏', isCorrect: false }],
                    winEmoji: '❤️', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                },
                content_6_8: {
                    question: 'Laboratuvarda gücümüzü ölçmek için neye bakarlar?',
                    options: [{ text: 'Kan Tahliline', image: '🩸', isCorrect: true }, { text: 'Boyumuza', image: '📏', isCorrect: false }],
                    winTitle: 'Doğru Bildin! 🩸', winMessage: 'Kan tahlili senin kahramanlık puan tablon! Ne kadar güçlendiğini oradan anlarlar.',
                    winEmoji: '🩸', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                },
                content_9_plus: {
                    question: 'Doktorlar kandaki hücre miktarını ölçmek için hangi medikal testi yaparlar?',
                    options: [{ text: 'Kan Tahlili (Hemogram)', image: '🩸', isCorrect: true }, { text: 'Boy ve Kilo Ölçümü', image: '📏', isCorrect: false }],
                    winTitle: 'Teşhis Doğru! 🔬', winMessage: 'Hemogram (Tam Kan Sayımı) testi, hücrelerimizin sayısını ölçen en objektif tıbbi testtir.',
                    winEmoji: '📝', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                content_2_5: {
                    question: 'Hücreleri Eşle!',
                    pairs: [{ id: '1', image: '🛡️', name: 'Akyuvar' }, { id: '2', image: '🎈', name: 'Alyuvar' }, { id: '3', image: '🩹', name: 'Trombosit' }],
                    winEmoji: '❤️', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                },
                content_6_8: {
                    question: 'Kan Hücrelerinin Görevleri',
                    pairs: [{ id: '1', image: '🛡️', name: 'Koruyucu Şövalyeler (Akyuvar)' }, { id: '2', image: '🎈', name: 'Oksijen Taşıyan Balonlar (Alyuvar)' }, { id: '3', image: '🩹', name: 'Tamirciler (Trombosit)' }],
                    winTitle: 'Mükemmel!', winMessage: 'Kanımızdaki bu süper kahramanlar birlikte çok güçlüdür!',
                    winEmoji: '🩸', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                },
                content_9_plus: {
                    question: 'Kan Hücrelerini İşlevleriyle Eşleştir',
                    pairs: [{ id: '1', image: '🛡️', name: 'Akyuvar (Savunma Sistemi)' }, { id: '2', image: '🎈', name: 'Alyuvar (Oksijen Taşıyıcı)' }, { id: '3', image: '🩹', name: 'Trombosit (Pıhtılaşma/Onarım)' }],
                    winTitle: 'Harika Biyoloji Bilgisi!', winMessage: 'Kan hücreleri kemik iliğinde üretilir. Bizim vücut kimyamız için her biri özel bir görev üstlenir.',
                    winEmoji: '🧫', bgClass: 'bg-red-50', borderClass: 'border-red-200'
                }
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
            {
                id: 1,
                isLocked: false,
                gameType: 'quiz',
                content_2_5: {
                    question: 'İlacı Bul',
                    options: [{ image: '💊', isCorrect: true }, { image: '🍬', isCorrect: false }],
                    winEmoji: '🧪', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                },
                content_6_8: {
                    question: 'Yaramaz hücreleri uyutan gerçek iksir hangisidir?',
                    options: [{ text: 'Doktorun Verdiği İlaç', image: '💊', isCorrect: true }, { text: 'Şeker', image: '🍬', isCorrect: false }],
                    winTitle: 'Harika İksir! 🧪', winMessage: 'İlaçlar yaramaz hücreleri uyutur!',
                    winEmoji: '💊', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                },
                content_9_plus: {
                    question: 'Patojenleri yok etmek için bilim insanlarının tasarladığı tedavi yöntemi hangisidir?',
                    options: [{ text: 'Tıbbi İlaçlar/Antibiyotikler', image: '💊', isCorrect: true }, { text: 'Şekerlemeler', image: '🍬', isCorrect: false }],
                    winTitle: 'Kesin Tedavi! 🧪', winMessage: 'İlaçlar doğru zamanda ve dozda alındığında enfeksiyonları yok eden bilimsel ajanlardır.',
                    winEmoji: '🔬', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'sorting',
                content_2_5: {
                    question: 'İlaçları Ayır',
                    dropzones: { left: { type: 'potion', title: 'İlaç' }, right: { type: 'candy', title: 'Şeker' } },
                    items: [{ id: '1', name: 'Hap', emoji: '💊', type: 'potion' }, { id: '2', name: 'Şurup', emoji: '🥄', type: 'potion' }, { id: '3', name: 'Lolipop', emoji: '🍭', type: 'candy' }, { id: '4', name: 'Çikolata', emoji: '🍫', type: 'candy' }],
                    winEmoji: '🧪', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                },
                content_6_8: {
                    question: 'Gerçek İksirleri Abur Cuburlardan Ayır!',
                    dropzones: { left: { type: 'potion', title: 'Gerçek İksirler' }, right: { type: 'candy', title: 'Abur Cuburlar' } },
                    items: [{ id: '1', name: 'Hap', emoji: '💊', type: 'potion' }, { id: '2', name: 'Şurup', emoji: '🥄', type: 'potion' }, { id: '3', name: 'Lolipop', emoji: '🍭', type: 'candy' }, { id: '4', name: 'Çikolata', emoji: '🍫', type: 'candy' }],
                    winTitle: 'Keskin Nişancı! 🎯', winMessage: 'Gerçek iksirler doktorların verdiği ilaçlar ve serumlardır. Şekerler bizi iyileştirmez.',
                    winEmoji: '🧪', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                },
                content_9_plus: {
                    question: 'Tıbbi Tedavileri ve Besin Değeri Olmayan Gıdaları Ayır',
                    dropzones: { left: { type: 'potion', title: 'Medikal Tedavi' }, right: { type: 'candy', title: 'Basit Şeker' } },
                    items: [{ id: '1', name: 'Kapsül Türleri', emoji: '💊', type: 'potion' }, { id: '2', name: 'Sıvı İlaç', emoji: '🥄', type: 'potion' }, { id: '3', name: 'Şekerleme', emoji: '🍭', type: 'candy' }, { id: '4', name: 'İşlenmiş Gıda', emoji: '🍫', type: 'candy' }],
                    winTitle: 'Doğru Sınıflandırma! 👩‍⚕️', winMessage: 'İlaçlar aktif etken maddeler içerirken, basit şekerler bağışıklık sistemine yersiz yük bindirir.',
                    winEmoji: '🧪', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                content_2_5: {
                    question: 'Cihazları Eşle',
                    pairs: [{ id: '1', image: '🩻', name: 'Röntgen' }, { id: '2', image: '🧲', name: 'MR' }, { id: '3', image: '🩸', name: 'Tüp' }],
                    winEmoji: '🧪', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                },
                content_6_8: {
                    question: 'Hastane Eşyalarını Keşfet',
                    pairs: [{ id: '1', image: '🩻', name: 'Fotoğraf Makinesi (Röntgen)' }, { id: '2', image: '🧲', name: 'Uzay Gemisi (MR Cihazı)' }, { id: '3', image: '🩸', name: 'Büyüteç (Test Tüpü)' }],
                    winTitle: 'Teknoloji Uzmanı! 🤖', winMessage: 'Hastaneler dev uzay üsleri gibidir. Cihazlar içini görmeyi sağlar.',
                    winEmoji: '🧲', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                },
                content_9_plus: {
                    question: 'Tıbbi Görüntüleme ve Analiz Cihazları',
                    pairs: [{ id: '1', image: '🩻', name: 'X-Ray (Kemik Görüntüleme)' }, { id: '2', image: '🧲', name: 'MR (Manyetik Rezonans)' }, { id: '3', image: '🩸', name: 'Laboratuvar Tüpü' }],
                    winTitle: 'Tomografi Başarılı! 💻', winMessage: 'MR ve Röntgen gibi görüntüleme cihazları, doktorlara vücudumuzun içinin anatomik haritasını çıkarır.',
                    winEmoji: '⚙️', bgClass: 'bg-purple-50', borderClass: 'border-purple-200'
                }
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
                content_2_5: {
                    question: 'Güçlü Yemekleri Seç',
                    dropzones: { left: { type: 'healthy', title: 'Güç' }, right: { type: 'unhealthy', title: 'Kötü' } },
                    items: [{ id: 's1', name: 'Elma', emoji: '🍏', type: 'healthy' }, { id: 's2', name: 'Çorba', emoji: '🥣', type: 'healthy' }, { id: 'u1', name: 'Cips', emoji: '🍟', type: 'unhealthy' }, { id: 'u2', name: 'Kola', emoji: '🥤', type: 'unhealthy' }],
                    winEmoji: '🥦', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                },
                content_6_8: {
                    question: 'Kahramanlar hangi yakıtla beslenir? Yiyecekleri Ayır!',
                    dropzones: { left: { type: 'healthy', title: 'Güç Verenler' }, right: { type: 'unhealthy', title: 'Zayıflatanlar' } },
                    items: [{ id: 's1', name: 'Meyve', emoji: '🍏', type: 'healthy' }, { id: 's2', name: 'Taze Çorba', emoji: '🥣', type: 'healthy' }, { id: 'u1', name: 'Açık Cips', emoji: '🍟', type: 'unhealthy' }, { id: 'u2', name: 'Kola', emoji: '🥤', type: 'unhealthy' }],
                    winTitle: 'Aşçı! 👨‍🍳', winMessage: 'Temiz ev yemekleri sana SÜPER GÜÇ verir!',
                    winEmoji: '🥕', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                },
                content_9_plus: {
                    question: 'Bağışıklık Güçlendirici ve Yıpratıcı Gıdaları Ayır',
                    dropzones: { left: { type: 'healthy', title: 'Vitamin Kaynağı' }, right: { type: 'unhealthy', title: 'İşlenmiş Gıda' } },
                    items: [{ id: 's1', name: 'Sebze/Meyve', emoji: '🍏', type: 'healthy' }, { id: 's2', name: 'Ev Çorbası', emoji: '🥣', type: 'healthy' }, { id: 'u1', name: 'Paketli Ürünler', emoji: '🍟', type: 'unhealthy' }, { id: 'u2', name: 'Asitli İçecek', emoji: '🥤', type: 'unhealthy' }],
                    winTitle: 'Sağlıklı Diyet! 🥗', winMessage: 'Kimyasal madde içeren işlenmiş gıdalar yerine organikler hücre yenilenmesini destekler.',
                    winEmoji: '🥑', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Temiz Elmayı Seç',
                    options: [{ image: '🍎', isCorrect: false }, { image: '🍏', isCorrect: true }],
                    winEmoji: '🥦', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                },
                content_6_8: {
                    question: 'Süper güçlerini korumak için meyveleri nasıl yemelisin?',
                    options: [{ text: 'Ağaçtan koptuğu gibi', image: '🍎', isCorrect: false }, { text: 'Bol su ile yıkanmış', image: '🍏', isCorrect: true }],
                    winTitle: 'Temiz Yakıt! 🍏', winMessage: 'Meyveleri yıkamak üstündeki pislikleri yok eder.',
                    winEmoji: '🍏', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                },
                content_9_plus: {
                    question: 'Tarımsal ilaç kalıntılarından korunmak için meyveleri tüketmeden önce ne yapmalıyız?',
                    options: [{ text: 'Doğrudan Tüketmek', image: '🍎', isCorrect: false }, { text: 'Sirke veya Bol Su İle Yıkamak', image: '🍏', isCorrect: true }],
                    winTitle: 'Hijyenik Tüketim! 🧼', winMessage: 'Gıdaların üzerindeki pestisitler bağışıklık sistemine zarar vermesin diye dezenfekte edilmelidir.',
                    winEmoji: '🚿', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Hangisi Kötü?',
                    options: [{ image: '🥨', isCorrect: true }, { image: '🥣', isCorrect: false }],
                    winEmoji: '🥦', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                },
                content_6_8: {
                    question: 'Hastanede yatıyorken hangisini tüketmek çok tehlikelidir?',
                    options: [{ text: 'Açıkta satılan abur cuburlar', image: '🥨', isCorrect: true }, { text: 'Annemizin yaptığı sıcak çorba', image: '🥣', isCorrect: false }],
                    winTitle: 'Dikkatli Kahraman! 🛑', winMessage: 'Açıkta satılan gıdalar mikroplarin oyun alanıdır. Ev yemeği ise şifadır.',
                    winEmoji: '🥣', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                },
                content_9_plus: {
                    question: 'Enfeksiyon riskinin en yüksek olduğu açık ortam ürünlerinden hangisinden tedbir amaçlı uzak durmalıyız?',
                    options: [{ text: 'Açıkta Satılan Gıdalar', image: '🥨', isCorrect: true }, { text: 'Güvenilir Ev Yapımı Çorba', image: '🥣', isCorrect: false }],
                    winTitle: 'Risk Yönetimi! 🛡️', winMessage: 'Bağışıklık sisteminin hassas dönemlerde, açık gıdalar mide-bağırsak enfeksiyonlarına sebep olabilir.',
                    winEmoji: '🦠', bgClass: 'bg-green-50', borderClass: 'border-green-200'
                }
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
        id: 6, title: 'Nenni Vakti', icon: '🌙', isLocked: false, gameType: 'quiz',
        levels: [
            {
                id: 1,
                isLocked: false,
                gameType: 'sorting',
                content_2_5: {
                    question: 'Uykuyu Getirenleri Seç',
                    dropzones: { left: { type: 'relax', title: 'Uyku' }, right: { type: 'tire', title: 'Oyun' } },
                    items: [{ id: '1', name: 'Kitap', emoji: '📖', type: 'relax' }, { id: '2', name: 'Ayıcık', emoji: '🧸', type: 'relax' }, { id: '3', name: 'Koşmak', emoji: '🏃', type: 'tire' }, { id: '4', name: 'Top', emoji: '⚽', type: 'tire' }],
                    winEmoji: '💤', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                },
                content_6_8: {
                    question: 'Uyumadan Önce Sakinleşmek mi, Yorulmak mı?',
                    dropzones: { left: { type: 'relax', title: 'Sakinleştirenler' }, right: { type: 'tire', title: 'Yoranlar' } },
                    items: [{ id: '1', name: 'Kitap Okumak', emoji: '📖', type: 'relax' }, { id: '2', name: 'Uyku Arkadaşı', emoji: '🧸', type: 'relax' }, { id: '3', name: 'Koşmak', emoji: '🏃', type: 'tire' }, { id: '4', name: 'Top Oynamak', emoji: '⚽', type: 'tire' }],
                    winTitle: 'Huzurlu Uykular! 💤', winMessage: 'Uyumadan önce kitap okumak ve ninni dinlemek şarj olmanı kolaylaştırır.',
                    winEmoji: '🌙', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                },
                content_9_plus: {
                    question: 'Uyku Öncesi Uyarıcıları Sınıflandır',
                    dropzones: { left: { type: 'relax', title: 'Sakinleştirici' }, right: { type: 'tire', title: 'Aşırı Uyarıcı' } },
                    items: [{ id: '1', name: 'Hikaye Okumak', emoji: '📖', type: 'relax' }, { id: '2', name: 'Dinlenmek', emoji: '🧸', type: 'relax' }, { id: '3', name: 'Koşuşturmak', emoji: '🏃', type: 'tire' }, { id: '4', name: 'Fiziksel Efor', emoji: '⚽', type: 'tire' }],
                    winTitle: 'Uyku Hijyeni! 🛌', winMessage: 'Kaliteli bir uyku, hücre yenilenmesi için şarttır. Uyumadan önce bedeni yoran değil, sakinleştiren aktiviteler yapmak gerekir.',
                    winEmoji: '💤', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Nerede Uyuyoruz?',
                    options: [{ image: '🛏️', isCorrect: true }, { image: '🚗', isCorrect: false }],
                    winEmoji: '🌙', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                },
                content_6_8: {
                    question: 'Kahramanlar yorulunca enerjilerini nerede şarj ederler?',
                    options: [{ text: 'Yatakta (Uyku Kapsülü)', image: '🛏️', isCorrect: true }, { text: 'Arabada', image: '🚗', isCorrect: false }],
                    winTitle: 'Tatlı Rüyalar! 🛏️', winMessage: 'Yatağın senin sihirli şarj istasyonundur.',
                    winEmoji: '🌙', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                },
                content_9_plus: {
                    question: 'Vücudumuzun hastalıklara karşı direncini toparladığı birincil dinlenme alanı neresidir?',
                    options: [{ text: 'Yatakta Karanlık ve Sessiz Ortam', image: '🛏️', isCorrect: true }, { text: 'Hareket Halinde Kenarda', image: '🚗', isCorrect: false }],
                    winTitle: 'Doğru Cevap! 🛌', winMessage: 'Karanlık ve sessiz bir odada uyumak, hücreleri onaran melatonin hormonunun salgılanmasını artırır.',
                    winEmoji: '💤', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                content_2_5: {
                    question: 'Uyku Arkadaşlarını Eşle',
                    pairs: [{ id: '1', image: '🛏️', name: 'Yatak' }, { id: '2', image: '🧸', name: 'Oyuncak' }, { id: '3', image: '🌙', name: 'Ay' }],
                    winEmoji: '💤', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                },
                content_6_8: {
                    question: 'Uyku Kapsülü Eşyaları',
                    pairs: [{ id: '1', image: '🛏️', name: 'Yumuşak Kapsül (Yatak)' }, { id: '2', image: '🧸', name: 'Uyku Arkadaşı (Oyuncak)' }, { id: '3', image: '🌙', name: 'Gece Lambası (Ay)' }],
                    winTitle: 'Her Şey Hazır! 🌟', winMessage: 'Uyku vaktin geldi kahraman!',
                    winEmoji: '⭐', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                },
                content_9_plus: {
                    question: 'Kaliteli Bir Uyku İçin Gerekenleri Eşleştir',
                    pairs: [{ id: '1', image: '🛏️', name: 'Ortopedik Dinlenme' }, { id: '2', image: '🧸', name: 'Psikolojik Rahatlık' }, { id: '3', image: '🌙', name: 'Karanlık Ortam' }],
                    winTitle: 'Mükemmel Hazırlık! 🌌', winMessage: 'Kaliteli ve düzenli bir uyku bağışıklık sisteminin en güçlü ilacıdır.',
                    winEmoji: '🌙', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200'
                }
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
                content_2_5: {
                    question: 'Oyunları Seç',
                    dropzones: { left: { type: 'fun', title: 'Oyun' }, right: { type: 'boring', title: 'Ekran' } },
                    items: [{ id: '1', name: 'Boya', emoji: '🎨', type: 'fun' }, { id: '2', name: 'Oyuncak', emoji: '🧸', type: 'fun' }, { id: '3', name: 'Telefon', emoji: '📱', type: 'boring' }, { id: '4', name: 'Tablet', emoji: '💻', type: 'boring' }],
                    winEmoji: '🎨', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                },
                content_6_8: {
                    question: 'Hastanede Canımız Sıkılınca Neler Yapabiliriz?',
                    dropzones: { left: { type: 'fun', title: 'Eğlenceli' }, right: { type: 'boring', title: 'Ekranlar' } },
                    items: [{ id: '1', name: 'Boya Kalemi', emoji: '🎨', type: 'fun' }, { id: '2', name: 'Oyuncak', emoji: '🧸', type: 'fun' }, { id: '3', name: 'Telefon', emoji: '📱', type: 'boring' }, { id: '4', name: 'Bilgisayar', emoji: '💻', type: 'boring' }],
                    winTitle: 'Harika Fikirler! 🎨', winMessage: 'Hastanede yatarken sadece tabletle değil, resim çizerek ve oyuncaklarla da harika maceralar yaşayabiliriz!',
                    winEmoji: '🚀', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                },
                content_9_plus: {
                    question: 'Yaratıcı ve Pasif Aktiviteleri Ayır',
                    dropzones: { left: { type: 'fun', title: 'Yaratıcı Aktivite' }, right: { type: 'boring', title: 'Pasif Ekran' } },
                    items: [{ id: '1', name: 'Resim Çizmek', emoji: '🎨', type: 'fun' }, { id: '2', name: 'Eğitici Oyun', emoji: '🧸', type: 'fun' }, { id: '3', name: 'Sürekli Telefon', emoji: '📱', type: 'boring' }, { id: '4', name: 'Sürekli Tablet', emoji: '💻', type: 'boring' }],
                    winTitle: 'Zihinsel Gelişim! 🧠', winMessage: 'Üretken aktiviteler beyin hücrelerini (nöronları) geliştirir, uzun süreli ekran dikkat dağınıklığına yol açar.',
                    winEmoji: '🎨', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                }
            },
            {
                id: 2,
                isLocked: true,
                gameType: 'quiz',
                content_2_5: {
                    question: 'Ekrana Çok Bakarsak?',
                    options: [{ image: '😵', isCorrect: true }, { image: '📖', isCorrect: false }],
                    winEmoji: '🚀', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                },
                content_6_8: {
                    question: 'Çok uzun süre tablet ile oynarsak ne olur?',
                    options: [{ text: 'Gözümüz kızarır.', image: '😵', isCorrect: true }, { text: 'Masal gemimiz uçar.', image: '📖', isCorrect: false }],
                    winTitle: 'Dikkat! 👀', winMessage: 'Ekranlar eğlencelidir ama çok fazla bakarsak gözlerimizi ağrıtır.',
                    winEmoji: '👀', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                },
                content_9_plus: {
                    question: 'Mavi ekrana aşırı maruz kalmanın fiziksel sağlığımız üzerindeki belirgin zararı nedir?',
                    options: [{ text: 'Göz kuruluğu ve kızarıklık', image: '😵', isCorrect: true }, { text: 'Odaklanma artışı', image: '📖', isCorrect: false }],
                    winTitle: 'Bilinçli Teknoloji! 💻', winMessage: 'Elektronik cihazların yaydığı mavi ışık, uyku kalitesini bozar. Ekran süresini sınırlı tutmalıyız.',
                    winEmoji: '📱', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                }
            },
            {
                id: 3,
                isLocked: true,
                gameType: 'matching',
                content_2_5: {
                    question: 'Eğlenceleri Eşle',
                    pairs: [{ id: '1', image: '📖', name: 'Kitap' }, { id: '2', image: '🎨', name: 'Boya' }, { id: '3', image: '🧸', name: 'Oyuncak' }],
                    winEmoji: '🚀', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                },
                content_6_8: {
                    question: 'Sıkıntıyı Kovan Şeyler',
                    pairs: [{ id: '1', image: '📖', name: 'Hikaye Gemisi (Masal Kitabı)' }, { id: '2', image: '🎨', name: 'Renk Cüceleri (Boyalar)' }, { id: '3', image: '🧸', name: 'Oyun Arkadaşı (Ayıcık)' }],
                    winTitle: 'Harika Seçimler! 🎈', winMessage: 'Hastane odasını bir macera parkına çevirebilirsin!',
                    winEmoji: '🧸', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                },
                content_9_plus: {
                    question: 'Sanatsal ve Edebi Araçları Eşleştir',
                    pairs: [{ id: '1', image: '📖', name: 'Edebiyat ve Hayal Gücü' }, { id: '2', image: '🎨', name: 'Görsel Sanatlar ve Boya' }, { id: '3', image: '🧸', name: 'Psikolojik Rahatlama Objesi' }],
                    winTitle: 'Sanatçı Ruhu! 🖼️', winMessage: 'Sanat ve edebiyatla uğraşmak zihni rahatlatır ve morali yükselterek hastalıktan uzaklaştırır.',
                    winEmoji: '🎭', bgClass: 'bg-pink-50', borderClass: 'border-pink-200'
                }
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
