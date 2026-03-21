// data.js - Eğitici ve Oyunlaştırılmış İçerik Verileri

// Bu içerikler LÖSEV'in çözmek istediği 3 ana probleme odaklanarak hazırlanmıştır:
// 1. Etkileşim Eksikliği (Oyunlaştırma ile çözüldü)
// 2. Bilgi Kirliliği (Doğrulanmış bilgilerle kalkan oluşturuldu)
// 3. Empati Kurma (Özel olarak modüllere eklendi)

const SEED_DATA = {
    modules: [
        {
            id: 1,
            title: "Gizli Düşman: Mitler ve Gerçekler",
            icon: "🧬",
            description: "İnternetteki bilgi kirliliğine karşı doğru ve bilimsel bilgilerin kalkanını kuşan.",
            questions: [
                {
                    text: "İnternette sıkça karşılaşılan 'Lösemi dokunarak veya havadan bulaşabilir' iddiası doğru mudur?",
                    options: [
                        { text: "Evet, fiziksel temasla bulaşabilir, uzak durulmalıdır.", isCorrect: false, explanation: "İddia asılsızdır! Lösemi hücresel ve genetik temelli olup, kesinlikle bulaşıcı değildir." },
                        { text: "Kalabalık ortamlarda havadan geçebilir.", isCorrect: false, explanation: "Asılsız! Grip gibi yayılmaz, kanser türleri kişiden kişiye bulaşmaz." },
                        { text: "Kesinlikle yanlıştır. Lösemi bulaşıcı bir hastalık değildir.", isCorrect: true, explanation: "Harika! Doğrulanmış bilgi kalkanını başarıyla kullandın. Hastalarla güvenle vakit geçirebiliriz." }
                    ]
                },
                {
                    text: "Özellikle otobüs ve parklarda maske takan lösemi hastaları gördüğümüzde ne düşünmeliyiz?",
                    options: [
                        { text: "Ağır bir virüs taşıdıklarını düşünüp uzaklaşmalıyız.", isCorrect: false, explanation: "Bu tamamen bilgi kirliliğine dayalı bir yanılgıdır." },
                        { text: "Bağışıklık sistemleri zayıf olduğu için kendilerini dış ortamdaki mikroplardan koruduklarını bilmeliyiz.", isCorrect: true, explanation: "Mükemmel! Kemoterapi süreci bağışıklığı zayıflatır. Maskeleri hastalık yaymak için değil, sizi onlardan değil, kendilerini sizdeki mikroplardan korumak içindir." },
                        { text: "Hava kirliliğinden korunmak istediklerini düşünmeliyiz.", isCorrect: false, explanation: "Temel sebep hava kirliliği değil, enfeksiyon riskidir." }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Erken Teşhis Hayat Kurtarır",
            icon: "⏱️",
            description: "Belirtileri zamanında fark ederek bir hayat kahramanı ol.",
            questions: [
                {
                    text: "Aşağıdakilerden hangisi çocuklarda löseminin erken belirtilerinden biri olabilir?",
                    options: [
                        { text: "Normalden çok fazla su içmesi", isCorrect: false, explanation: "Bu daha çok diyabet gibi başka hastalıkların belirtisi olabilir." },
                        { text: "Sürekli devam eden yorgunluk, halsizlik ve deride oluşan açıklanamayan morluklar", isCorrect: true, explanation: "Doğru teşhis! Geçmeyen yorgunluk, ateş ve nedensiz morluklar fark edildiğinde hemen bir uzmana danışılmalıdır." },
                        { text: "Tatlı krizine girmesi", isCorrect: false, explanation: "Sağlıksız beslenme alışkanlığıdır, bir belirti değildir." }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "Empati Köprüsü",
            icon: "🤝",
            description: "Tedavi gören bireylere ve ailelerine doğru psikolojik desteği sağlama yolları.",
            questions: [
                {
                    text: "Tedavi nedeniyle saçları dökülen bir arkadaşımız sınıfa geri döndüğünde ona nasıl yaklaşmalıyız?",
                    options: [
                        { text: "Hastalığını sık sık hatırlatıp çok geçmiş olsun demeliyiz.", isCorrect: false, explanation: "Sürekli hastalıktan bahsetmek bireyi yorabilir ve psikolojik olarak iyileşmesini yavaşlatabilir." },
                        { text: "Sıradan bir günmüş gibi, arkadaşlığımıza ve normal oyunlarımıza kaldığımız yerden devam etmeliyiz.", isCorrect: true, explanation: "Tebrikler! Hastaların en çok arzuladığı şey acınmak değil, sosyal hayata dışlanmadan, normal bir şekilde entegre olabilmektir." },
                        { text: "Saçları hakkında yorum yapıp moral vermeye çalışmalıyız.", isCorrect: false, explanation: "Fiziksel değişimler üzerine değil, karakterleri ve dostlukları üzerine odaklanılmalıdır." }
                    ]
                }
            ]
        }
    ]
};
