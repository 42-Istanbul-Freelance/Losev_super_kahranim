// Uygulamanın varsayılan (başlangıç) durumu
const defaultProgress = {
    currentLevel: 1,
    stars: 0,
    avatar: null, // İlk girişte null ki modal açılsın
    avatarBg: 'bg-pastelBlue',
    chickHue: 'hue-rotate(0deg)',
    soundEnabled: true,
    ageGroup: null, // '2-5', '6-8', '9+'
    themes: JSON.parse(JSON.stringify(themesData))
};

// Global kullanıcı ilerleme değişkeni
let userProgress = {};

// Aktif görünüm durumu
let currentThemeId = null;
let currentLevelId = null;

// Global animasyon bekleme durumu: Haritaya dönünce yıldız çıkacak (seviye id'sini tutar)
let pendingStarLevelId = null;

// Başlangıç Yüklemesi
function initProgress() {
    const storedData = localStorage.getItem('losevAppProgress');

    if (storedData) {
        userProgress = JSON.parse(storedData);

        // Eski kayıtlara avatar garantisi ver
        if (userProgress.avatar === undefined || !userProgress.avatar) {
            userProgress.avatar = null;
        }
        if (userProgress.chickHue === undefined) {
            userProgress.chickHue = 'hue-rotate(0deg)';
        }
        if (userProgress.soundEnabled === undefined) {
            userProgress.soundEnabled = true;
        }

        // Veritabanı (data.js) üzerindeki yapısal güncellemeleri localStorage'a yedir (Merge işlemi)
        // Eğer kullanıcı daha önce eski veritabanı ile giriş yaptıysa levels dizileri eski (boş) kalıyordu.
        themesData.forEach(defaultTheme => {
            let userTheme = userProgress.themes.find(t => t.id === defaultTheme.id);
            if (!userTheme) {
                userProgress.themes.push(JSON.parse(JSON.stringify(defaultTheme)));
            } else {
                // Her zaman data.js'teki en güncel yapısal verileri alıp, kullanıcının kilit (isLocked) durumunu koruyalım.
                // Kullanıcının daha önce kilitlerini açtığı levelleri tespit et
                const openedLevelIds = userTheme.levels && userTheme.levels.length > 0
                    ? userTheme.levels.filter(l => !l.isLocked).map(l => l.id)
                    : [1]; // Varsayılan sadece level 1 açıktır

                // data.js üzerindeki taze temayı tamamen kopyala (İkonlar, oyun tipleri, sorular vb. en güncel hali)
                const updatedTheme = JSON.parse(JSON.stringify(defaultTheme));

                // Önceki kilitleri tekrar aç (Kullanıcının ilerlemesini koru)
                updatedTheme.levels.forEach(l => {
                    if (openedLevelIds.includes(l.id)) {
                        l.isLocked = false;
                    }
                });

                // Eski temasını yenisiyle değiştir
                const index = userProgress.themes.findIndex(t => t.id === defaultTheme.id);
                userProgress.themes[index] = updatedTheme;
            }
        });
        saveProgress();
    } else {
        userProgress = { ...defaultProgress };
        saveProgress();
    }

    if (!userProgress.avatar || userProgress.avatar === null || !userProgress.ageGroup) {
        // İlk defa giriyorsa veya avatar/yaş seçilmemişse ayarları zorunlu aç
        openSettings(true);
    } else {
        updateUI();
        showHome();
    }
}

// İlerlemeyi localStorage'a kaydeden fonksiyon
function saveProgress() {
    localStorage.setItem('losevAppProgress', JSON.stringify(userProgress));
}

function updateUI() {
    const starCountElement = document.getElementById('star-count');
    if (starCountElement) {
        starCountElement.textContent = userProgress.stars;
    }
    const avatarElement = document.getElementById('hero-avatar');
    if (avatarElement) {
        avatarElement.textContent = userProgress.avatar || '🧒';
        // Avatar arka planını güncelle
        avatarElement.className = `w-16 h-16 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-md ${userProgress.avatarBg || 'bg-pastelBlue'}`;
    }

    // Civciv rengini güncelle (CSS Filter ile emoji karakterinin kendi rengini değiştiriyoruz)
    const chickElement = document.getElementById('chick-character');
    if (chickElement) {
        chickElement.className = `chick-animate absolute w-32 h-32 rounded-full text-[5rem] flex items-center justify-center shadow-lg z-20 border-4 border-pastelYellow bg-white`;
        chickElement.style.filter = userProgress.chickHue || 'hue-rotate(0deg)';
    }
}

// ----------------------------------------------------
// Ayarlar Modalı Fonksiyonları
// ----------------------------------------------------
let tempSettings = {
    avatar: '🧒', // Varsayılanlar
    avatarBg: 'bg-pastelBlue',
    chickHue: 'hue-rotate(0deg)',
    soundEnabled: true
};

function openSettings(isFirstTime = false) {
    const modal = document.getElementById('settings-modal');
    modal.classList.remove('hidden');

    // Geçici ayarları mevcut ayarlara eşitle (eğer varsa)
    if (userProgress.avatar) {
        tempSettings.avatar = userProgress.avatar;
        tempSettings.avatarBg = userProgress.avatarBg;
        tempSettings.chickHue = userProgress.chickHue || 'hue-rotate(0deg)';
        tempSettings.soundEnabled = userProgress.soundEnabled !== false;
        tempSettings.ageGroup = userProgress.ageGroup || null;
    } else {
        // İlk çalışmada desc metnini göster
        document.getElementById('settings-desc').classList.remove('hidden');
    }

    // Arayüzdeki border'ları tempSettings'e göre boya
    updateSettingsUI();

    // Animasyon
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
}

function selectAvatar(avatar, bgClass) {
    tempSettings.avatar = avatar;
    tempSettings.avatarBg = bgClass;
    updateSettingsUI();
}

function selectAge(age) {
    tempSettings.ageGroup = age;
    updateSettingsUI();
}

function selectChickBg(hueFilter) {
    tempSettings.chickHue = hueFilter;
    updateSettingsUI();
}

function toggleSound() {
    tempSettings.soundEnabled = !tempSettings.soundEnabled;
    updateSettingsUI();
}

function updateSettingsUI() {
    // Avatar borderlarını güncelle
    document.querySelectorAll('.avatar-option').forEach(btn => {
        if (btn.dataset.avatar === tempSettings.avatar) {
            btn.classList.add('border-blue-500', 'scale-110');
            btn.classList.remove('border-gray-200');
        } else {
            btn.classList.remove('border-blue-500', 'scale-110');
            btn.classList.add('border-gray-200');
        }
    });

    // Civciv borderlarını güncelle
    document.querySelectorAll('.chick-option').forEach(btn => {
        if (btn.dataset.cbg === tempSettings.chickHue) {
            btn.classList.add('border-blue-500', 'scale-110');
            btn.classList.remove('border-gray-200');
        } else {
            btn.classList.remove('border-blue-500', 'scale-110');
            btn.classList.add('border-gray-200');
        }
    });

    // Yaş Seçimi borderlarını güncelle
    document.querySelectorAll('.age-option').forEach(btn => {
        if (btn.dataset.age === tempSettings.ageGroup) {
            btn.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-700', 'scale-105');
            btn.classList.remove('border-gray-200', 'bg-white', 'text-gray-700');
        } else {
            btn.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-700', 'scale-105');
            btn.classList.add('border-gray-200', 'bg-white', 'text-gray-700');
        }
    });

    // Ses Butonu Güncelle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
        soundBtn.textContent = tempSettings.soundEnabled ? '🔊' : '🔇';
        if (tempSettings.soundEnabled) {
            soundBtn.classList.add('bg-green-100', 'border-green-300');
            soundBtn.classList.remove('bg-red-100', 'border-red-300');
        } else {
            soundBtn.classList.add('bg-red-100', 'border-red-300');
            soundBtn.classList.remove('bg-green-100', 'border-green-300');
        }
        soundBtn.classList.add('p-3', 'rounded-full', 'border-2', 'shadow-sm', 'w-16', 'h-16', 'flex', 'items-center', 'justify-center');
    }
}

function saveAndCloseSettings() {
    const modal = document.getElementById('settings-modal');

    // Kaydetmek için önce validasyon yap
    if (!tempSettings.avatar || !tempSettings.ageGroup) {
        alert("Lütfen bir kahraman ve yaş grubu seçin! 🦸‍♀️");
        return;
    }

    // Kaydet
    userProgress.avatar = tempSettings.avatar;
    userProgress.avatarBg = tempSettings.avatarBg;
    userProgress.chickHue = tempSettings.chickHue || 'hue-rotate(0deg)';
    userProgress.soundEnabled = tempSettings.soundEnabled !== false;
    userProgress.ageGroup = tempSettings.ageGroup;
    saveProgress();
    updateUI();

    // Modalı Kapat
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.getElementById('settings-desc').classList.add('hidden'); // Kapatırken first-time metnini gizle

        // Eğer ilk girişte oyun ekranı gösterilmediyse, şimdi göster
        if (document.getElementById('home-view').classList.contains('hidden') && document.getElementById('theme-view').classList.contains('hidden') && document.getElementById('quiz-view').classList.contains('hidden')) {
            showHome();
        }
    }, 300);
}

function addStar(amount = 1) {
    userProgress.stars += amount;
    saveProgress();
    updateUI();
}

// Görünüm Yönetimi
const homeView = document.getElementById('home-view');
const themeView = document.getElementById('theme-view');
const quizView = document.getElementById('quiz-view');

function hideAllViews() {
    homeView.classList.add('hidden');
    themeView.classList.add('hidden');
    quizView.classList.add('hidden');
}

function showHome() {
    hideAllViews();
    homeView.classList.remove('hidden');
    renderCircleMenu();

    // Ana sayfaya dönüldüğünde body arkaplanı varsayılan degrade renklerine döner
    document.body.className = 'bg-gradient-to-br from-pastelBlue via-pastelBg to-pastelPink h-screen flex flex-col items-center overflow-hidden';
    document.body.style.removeProperty('--bg-img');

    // Civcivi merkeze al ve eski haline getir
    const chick = document.getElementById('chick-character');
    chick.style.transition = "none";
    chick.classList.add('chick-animate');
    chick.style.transform = `translate(-50%, -50%)`;
    chick.style.left = '50%';
    chick.style.top = '50%';
}

// ----------------------------------------------------
// Dairesel Menü Çizimi
// ----------------------------------------------------
function renderCircleMenu() {
    const container = document.getElementById('circle-container');
    // İçerikteki önceki butonları temizle (Civciv hariç)
    Array.from(container.children).forEach(child => {
        if (child.id !== 'chick-character') {
            child.remove();
        }
    });

    const themes = userProgress.themes;
    const total = themes.length;
    const radius = 150; // Dairenin yarıçapı
    const centerX = 190;
    const centerY = 190;

    themes.forEach((theme, index) => {
        const angle = (index / total) * (2 * Math.PI) - (Math.PI / 2); // Üstten başlat
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const btn = document.createElement('button');

        if (theme.isLocked) {
            btn.className = 'absolute w-[80px] h-[80px] rounded-full bg-gray-300 border-[4px] border-gray-400 shadow-sm flex items-center justify-center cursor-not-allowed hover:scale-105 transition-transform z-10';
            btn.innerHTML = `<span class="text-3xl">🔒</span>`;
        } else {
            btn.className = 'absolute w-[95px] h-[95px] rounded-full bg-white border-[4px] border-pastelYellow shadow-md flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all z-10 hover:bg-pastelBg';
            btn.innerHTML = `<span class="text-5xl drop-shadow-sm">${theme.icon}</span>`;

            btn.onclick = (e) => {
                const chick = document.getElementById('chick-character');
                // Kayma için bounce animasyonunu geçici kapat ve transition ekle
                chick.classList.remove('chick-animate');
                chick.style.transition = "all 0.5s ease-in-out";

                // Tıklanan butona doğru civcivi hareket ettir
                chick.style.left = `${x}px`;
                chick.style.top = `${y}px`;
                chick.style.transform = `translate(-50%, -50%) scale(0.6)`;

                // Biraz bekleyip haritayı aç
                setTimeout(() => {
                    showThemeMap(theme.id);
                }, 500);
            };
        }

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.style.transform = `translate(-50%, -50%)`;

        container.appendChild(btn);
    });
}

// ----------------------------------------------------
// Tema İçi Bölüm (Map) Görünümü
// ----------------------------------------------------
function showThemeMap(themeId) {
    currentThemeId = themeId;
    hideAllViews();
    themeView.classList.remove('hidden');
    themeView.classList.add('flex');
    renderThemeMap();
}

// ----------------------------------------------------
// Harita (Yol) Çizimi (Yatay Zigzag)
// ----------------------------------------------------
function renderThemeMap() {
    const theme = userProgress.themes.find(t => t.id === currentThemeId);
    if (!theme) return;

    // Arkaplan Güncelleme: Her temaya özel pattern sınıfı yüklenir
    const patternClasses = {
        1: 'bg-yardimlasma-pattern',
        2: 'bg-paylasma-pattern',
        3: 'bg-gonulluluk-pattern',
        4: 'bg-saglik-pattern',
        5: 'bg-beslenme-pattern',
        6: 'bg-uyku-pattern',
        7: 'bg-digital-pattern'
    };

    const bgClass = patternClasses[theme.id] || 'bg-pastelBg';
    document.body.className = `${bgClass} h-screen flex flex-col items-center overflow-hidden`;
    document.body.style.removeProperty('--bg-img');

    document.getElementById('theme-title').textContent = theme.title;

    // Açık renkli temalarda siyah, koyu renkli Dijital Denge temasında beyaz scrollbar
    const scrollContainer = document.getElementById('map-scroll-container');
    if (scrollContainer) {
        if (theme.id === 7) {
            scrollContainer.classList.remove('custom-scrollbar-dark');
            scrollContainer.classList.add('custom-scrollbar');
        } else {
            scrollContainer.classList.remove('custom-scrollbar');
            scrollContainer.classList.add('custom-scrollbar-dark');
        }
    }

    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';

    const levels = theme.levels || [];

    if (levels.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'text-gray-500 font-bold mt-10 bg-white p-4 flex items-center justify-center rounded-3xl z-10 mx-auto';
        empty.textContent = 'Bu bölüm yapım aşamasında 🛠️';
        mapContainer.appendChild(empty);
        return;
    }

    levels.forEach((level, idx) => {
        const node = document.createElement('div');
        // Zikzak etkisi için daha belirgin (daha uzağa giden) translateY
        const isTop = idx % 2 === 0;
        const translateY = isTop ? '-65%' : '65%';

        node.className = `flex flex-col items-center justify-center relative z-10 min-w-[120px] snap-center`;

        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'flex flex-col items-center relative z-20';
        btnWrapper.style.transform = `translateY(${translateY})`;

        const btn = document.createElement('button');
        if (level.isLocked) {
            btn.className = 'w-24 h-24 rounded-full bg-slate-200 border-[6px] border-gray-300 shadow-md flex items-center justify-center cursor-not-allowed relative overflow-hidden';
            // Arkada flu level numarası, önde kilit
            btn.innerHTML = `<span class="absolute text-5xl font-extrabold text-gray-400 opacity-20">${idx + 1}</span><span class="relative z-10 text-4xl drop-shadow-sm pb-1">🔒</span>`;
        } else {
            // Her tema için uyumlu buton ve sınır renkleri
            const themeColors = {
                1: { bg: 'bg-pastelPink', border: 'border-pastelPinkDark', shadow: 'shadow-[0_6px_0_0_#FFAFCC]' }, // Pembe/Mor
                2: { bg: 'bg-pastelYellow', border: 'border-[#F4A261]', shadow: 'shadow-[0_6px_0_0_#E76F51]' }, // Turuncu/Sarı
                3: { bg: 'bg-[#95D5B2]', border: 'border-[#52B788]', shadow: 'shadow-[0_6px_0_0_#40916C]' }, // Yeşil
                4: { bg: 'bg-[#A2D2FF]', border: 'border-[#429EBD]', shadow: 'shadow-[0_6px_0_0_#2B7A9B]' }, // Açık Mavi
                5: { bg: 'bg-[#FFCAD4]', border: 'border-[#F28482]', shadow: 'shadow-[0_6px_0_0_#E56B6F]' }, // Şeftali
                6: { bg: 'bg-[#CDB4DB]', border: 'border-[#B298DC]', shadow: 'shadow-[0_6px_0_0_#A06CD5]' }, // Lila/Gece
                7: { bg: 'bg-pastelBlue', border: 'border-pastelBlueDark', shadow: 'shadow-[0_6px_0_0_#A2D2FF]' } // Dijital
            };

            const tCol = themeColors[theme.id] || { bg: 'bg-pastelYellow', border: 'border-pastelPinkDark', shadow: 'shadow-[0_6px_0_0_#FFAFCC]' };
            const btnColor = tCol.bg;
            const borderColors = `${tCol.border} ${tCol.shadow}`;

            btn.className = `w-28 h-28 rounded-full ${btnColor} border-8 ${borderColors} text-5xl font-extrabold text-gray-800 flex items-center justify-center hover:scale-110 active:scale-95 transition-all`;
            btn.textContent = idx + 1;
        }

        // Animasyon için özel bir id veriyoruz ki daha sonra bulabilelim
        btn.id = `level-btn-${level.id}`;

        btn.onclick = () => {
            if (!level.isLocked) {
                showQuiz(theme.id, level.id);
            }
        };

        btnWrapper.appendChild(btn);
        node.appendChild(btnWrapper);

        // Zikzak çizgileri
        if (idx < levels.length - 1) {
            // Eğer diğer bölüm de açıksa şerit altın sarısı olacak
            const isCompleted = !levels[idx + 1].isLocked;
            drawHorizontalZigzagLine(node, isTop, isCompleted);
        }

        mapContainer.appendChild(node);
    });

    // Eğer bitirilmiş bir oyun animasyonu bekliyorsa çalıştır
    if (pendingStarLevelId) {
        animateStar(pendingStarLevelId);
        pendingStarLevelId = null; // Sıfırla
    }
}

// ----------------------------------------------------
// Yıldız Uçurma Animasyonu
// ----------------------------------------------------
function animateStar(levelId) {
    const originBtn = document.getElementById(`level-btn-${levelId}`);
    const targetElement = document.querySelector('.bg-pastelYellow'); // İçinde yıldız olan sarı sayaç kutusu

    if (!originBtn || !targetElement) return;

    // Hedef ve Kaynak koordinatlarını al
    const originRect = originBtn.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Yıldızı yarat
    const flyingStar = document.createElement('div');
    flyingStar.textContent = '⭐';
    flyingStar.className = 'fixed z-[9999] text-6xl drop-shadow-xl animate-flying-star pointer-events-none';

    // Başlangıç pozisyonu (Butonun tam ortası)
    const startX = originRect.left + (originRect.width / 2) - 30; // 30 = yarım boyut tahmini
    const startY = originRect.top + (originRect.height / 2) - 30;

    flyingStar.style.left = `${startX}px`;
    flyingStar.style.top = `${startY}px`;

    // Uçuş Mesafesi (Hedef Header'daki yıldız ikonunun kordinatına göre)
    const targetX = targetRect.left + 20; // 20px padding tahmini
    const targetY = targetRect.top + 10;

    const tx = targetX - startX;
    const ty = targetY - startY;

    flyingStar.style.setProperty('--tx', `${tx}px`);
    flyingStar.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(flyingStar);

    // Animasyon bitiminde olacaklar (1s animasyon süresi atamıştık)
    setTimeout(() => {
        flyingStar.remove();
        // Sayaca "pıt" efekti ver
        targetElement.classList.add('scale-125');
        setTimeout(() => {
            targetElement.classList.remove('scale-125');
        }, 200);
    }, 1000);
}

function drawHorizontalZigzagLine(parentNode, isTopToBottom, isCompleted) {
    // Görsel amaçlı yatay bağlayıcı çizgi
    const svgContainer = document.createElement('div');
    // Kutucuklar arası boşluk (gap-28 = 112px, btn = 112px => Merkezden merkeze ~ 224px).
    // Yükseklik translateY +- 65% civarı, node yüksekliğine bağlı. 160px yükseklik tam kurtarıyor.
    // md:w gibi dinamik sınıflar çizgiyi kaydırdığı için w-[240px] gibi sabit bir uzunluk, sabit h kullanıyoruz.
    svgContainer.className = 'absolute left-[50%] top-[45%] w-[240px] h-[180px] -z-10 pointer-events-none transform -translate-y-1/2 flex items-center opacity-80';

    // Tombul Çizgiler ve Renk Ayarı (Daha soft pastel renklerle)
    const strokeColor = isCompleted ? '#FEF08A' : '#BAE6FD'; // Soft Pastel Altın Sarı / Soft Pastel Mavi
    const strokeWidth = 14;  // Biraz daha yumuşak kenar
    // Yapı Bütünselliği: Düğüm (kesik çizgi) yapısı ASLA bozulmasın, sadece renk değişsin.
    const dashArray = '12 20'; // Çizgiler arası boşluklar genişledi (softlaşma)

    // filter: drop-shadow eklendi ki kenarlar glow (soft) efekti versin
    // the "path" starts from center of current button (which is relatively 0, y depending on top/bottom) 
    // to the center of next button.
    const svgPath = isTopToBottom
        ? `<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style="filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.06)); overflow:visible;"><path d="M 0 15 L 100 85" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" stroke-linecap="round" fill="none"/></svg>`
        : `<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style="filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.06)); overflow:visible;"><path d="M 0 85 L 100 15" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" stroke-linecap="round" fill="none"/></svg>`;

    svgContainer.innerHTML = svgPath;
    parentNode.appendChild(svgContainer);
}

// ----------------------------------------------------
// Quiz / Oyun Ortamı
// ----------------------------------------------------
let matchingState = { selectedLeft: null, selectedRight: null, matchedCount: 0, totalPairs: 0 };

// Helper for Dynamic Age Content
function getAgeSpecificContent(level) {
    let contentKey = 'content_2_5'; // default
    if (userProgress.ageGroup === '6-8') contentKey = 'content_6_8';
    if (userProgress.ageGroup === '9+') contentKey = 'content_9_plus';

    // Geçiş dönemi: Eski veri yapısı gelirse veya o yaş grubuna özel veri yoksa mevcutu döndür
    if (!level[contentKey]) return level;

    // Kilit durumu ve temel bilgileri yaş grubu içeriğiyle birleştirip düzleştir (flatten)
    return { ...level, ...level[contentKey] };
}

function showQuiz(themeId, levelId) {
    currentThemeId = themeId;
    currentLevelId = levelId;

    hideAllViews();
    quizView.classList.remove('hidden');
    quizView.classList.add('flex');

    const theme = userProgress.themes.find(t => t.id === themeId);
    const baseLevel = theme.levels.find(l => String(l.id) === String(levelId));

    // Kullanıcının seçtiği yaş grubuna göre düzleştirilmiş seviye verisini al
    const level = getAgeSpecificContent(baseLevel);

    document.getElementById('level-indicator').textContent = levelId;

    const questionTitle = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const matchingContainer = document.getElementById('matching-container');

    optionsContainer.innerHTML = '';

    // 2-5 yaş için soru metni gösterilmez. Sadece görseller.
    if (userProgress.ageGroup === '2-5') {
        questionTitle.classList.add('hidden');
    } else {
        questionTitle.classList.remove('hidden');
    }

    if (level.gameType === 'matching') {
        if (userProgress.ageGroup !== '2-5') questionTitle.textContent = level.question || "Eşleştirme Zamanı!";
        optionsContainer.classList.add('hidden');
        document.getElementById('sorting-container').classList.add('hidden');
        matchingContainer.classList.remove('hidden');
        renderMatchingGame(level);
    } else if (level.gameType === 'sorting') {
        if (userProgress.ageGroup !== '2-5') questionTitle.textContent = level.question;
        optionsContainer.classList.add('hidden');
        matchingContainer.classList.add('hidden');
        const sortingContainer = document.getElementById('sorting-container');
        if (sortingContainer) sortingContainer.classList.remove('hidden');
        renderSortingGame(level);
    } else {
        if (userProgress.ageGroup !== '2-5') questionTitle.textContent = level.question;
        matchingContainer.classList.add('hidden');
        document.getElementById('sorting-container').classList.add('hidden');
        optionsContainer.classList.remove('hidden');
        renderQuizGame(level, optionsContainer);
    }
}

// ----------------------------------------------------
// Klasik Quiz Oyunu (2-10 Yaş Hibrit UI)
// ----------------------------------------------------
function renderQuizGame(level, container) {
    // 2-10 yaş için şıkları alt alta geniş veya yan yana (ekrana göre) alıyoruz
    container.className = 'flex flex-col gap-4 w-full h-full mt-4';

    level.options.forEach(opt => {
        const btn = document.createElement('button');
        // Eğer veri tabanından text gelmediyse (Örn: 2-5 Yaş Grubu seçimi) sadece Emoji/İkon dev boyutta basılacak.
        if (!opt.text) {
            btn.className = 'w-full h-auto min-h-[160px] bg-white border-8 border-gray-100 rounded-[30px] p-4 shadow-sm hover:border-pastelBlue hover:scale-[1.02] transition-all flex items-center justify-center active:scale-95';
            btn.innerHTML = `<span class="text-[6rem] sm:text-[8rem] drop-shadow-md bg-pastelBg rounded-3xl p-6">${opt.image}</span>`;
        } else {
            // Hibrit ve 9+ yaş için klasik Icon + Text düzeni
            btn.className = 'w-full bg-white border-8 border-gray-100 rounded-[30px] p-4 shadow-sm hover:border-pastelBlue hover:scale-[1.02] transition-all flex items-center justify-start gap-6 active:scale-95 text-left';
            btn.innerHTML = `
                <span class="text-[4rem] sm:text-[5rem] drop-shadow-md shrink-0 bg-pastelBg rounded-3xl p-2">${opt.image}</span>
                <span class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-700 leading-tight">${opt.text}</span>
            `;
        }

        btn.onclick = () => {
            handleAnswer(opt.isCorrect, false);
        };
        container.appendChild(btn);
    });
}

// ----------------------------------------------------
// Eşleştirme Oyunu
// ----------------------------------------------------
function renderMatchingGame(level) {
    const leftContainer = document.getElementById('match-left');
    const rightContainer = document.getElementById('match-right');
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';

    matchingState = { selectedLeft: null, selectedRight: null, matchedCount: 0, totalPairs: level.pairs.length };

    // Randomize the arrays to display out of order
    const leftItems = [...level.pairs].sort(() => Math.random() - 0.5);
    const rightItems = [...level.pairs].sort(() => Math.random() - 0.5);

    leftItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'match-btn w-full min-h-[100px] bg-white border-4 border-gray-200 text-6xl rounded-2xl shadow-sm transition-all flex items-center justify-center py-2';
        // Tablet vs SVG ikon desteği
        if (item.image.includes('<svg')) {
            btn.innerHTML = item.image;
        } else {
            btn.textContent = item.image;
        }
        btn.dataset.id = item.id;
        btn.onclick = () => handleMatchClick('left', btn, item.id);
        leftContainer.appendChild(btn);
    });

    rightItems.forEach(item => {
        const btn = document.createElement('button');
        // Hibrit Yaş (2-10): Metinler geri geldi, okunaklı, kalın ve kısa
        btn.className = 'match-btn w-full min-h-[100px] h-auto bg-white border-4 border-gray-200 font-extrabold text-gray-700 rounded-2xl shadow-sm transition-all flex items-center justify-center text-center leading-snug p-3 text-lg sm:text-2xl break-words whitespace-normal';
        btn.textContent = item.name;
        btn.dataset.id = item.id;
        btn.onclick = () => handleMatchClick('right', btn, item.id);
        rightContainer.appendChild(btn);
    });
}

function handleMatchClick(side, element, id) {
    if (element.classList.contains('matched')) return; // Zaten eşleşmiş

    // Önceden seçilmişleri temizle (Sadece aynı taraftakileri)
    const siblings = element.parentElement.children;
    for (let el of siblings) {
        if (!el.classList.contains('matched')) {
            el.classList.remove('selected');
        }
    }
    element.classList.add('selected');

    // Durumu güncelle
    if (side === 'left') {
        matchingState.selectedLeft = { element, id };
    } else {
        matchingState.selectedRight = { element, id };
    }

    // İki taraf da seçildiyse kontrol et
    if (matchingState.selectedLeft && matchingState.selectedRight) {
        if (matchingState.selectedLeft.id === matchingState.selectedRight.id) {
            // Eşleşti
            matchingState.selectedLeft.element.classList.remove('selected');
            matchingState.selectedRight.element.classList.remove('selected');
            matchingState.selectedLeft.element.classList.add('matched');
            matchingState.selectedRight.element.classList.add('matched');

            matchingState.matchedCount++;

            // Seçimleri sıfırla
            matchingState.selectedLeft = null;
            matchingState.selectedRight = null;

            // Oyun Bitti mi?
            if (matchingState.matchedCount === matchingState.totalPairs) {
                setTimeout(() => {
                    const isDigitalTheme = currentThemeId === 7;
                    let modalMessage = 'Bölümü başarıyla tamamladın!';

                    if (isDigitalTheme) {
                        modalMessage = `
                        <div class="flex flex-col items-center justify-center text-center px-2 py-4">
                            <!-- Local klasöre kopyalanmış resmi kullanıyoruz -->
                            <img src="./assets/digital_benefits.png" alt="Dijital Aletler" class="w-[280px] h-[280px] object-cover rounded-3xl shadow-md mb-6 border-[10px] border-pastelYellow">
                            <p class="text-3xl text-gray-800 leading-tight font-extrabold mb-4">
                                Harika Bir İş Çıkardın! 🎉
                            </p>
                            <p class="text-xl font-bold text-gray-600 bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                                Tablet ve telefonlar yeni şeyler öğrenmen için <b>süper yardımcılarındır!</b> Süresi bitince dinlenmeyi unutma! 🦸‍♂️📱
                            </p>
                        </div>
                    `;
                    } else if (currentThemeId === 1 && currentLevelId === 1) { // Süper Kahraman Ekibim
                        modalMessage = `
                        <div class="flex flex-col items-center justify-center text-center px-2 py-4">
                            <p class="text-3xl text-gray-800 leading-tight font-extrabold mb-4 mt-2">
                                Süper Ekibi Tanıdın! 🦸‍♀️🦸‍♂️
                            </p>
                            <p class="text-xl font-bold text-gray-600 bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
                                Hastanedeki doktorlar ve hemşireler senin <b>süper kahraman ekibindir!</b> Birlikte harikasınız! 🤝
                            </p>
                        </div>
                    `;
                    } else if (currentThemeId === 1 && currentLevelId === 2) { // Doktorların Sihirli Aletleri
                        modalMessage = `
                        <div class="flex flex-col items-center justify-center text-center px-2 py-4">
                            <p class="text-3xl text-gray-800 leading-tight font-extrabold mb-4 mt-2">
                                Süper Aletleri Öğrendin! 🩺✨
                            </p>
                            <p class="text-xl font-bold text-gray-600 bg-green-50 p-4 rounded-2xl border-2 border-green-200">
                                Aletlerden korkmana gerek yok! Hepsi seni iyileştiren ve <b>kalbini dinleyen özel sihirli araçlardır!</b> 🌟
                            </p>
                        </div>
                    `;
                    } else if (currentThemeId === 4 && currentLevelId === 4) { // Uzay Cihazları (MR, Röntgen)
                        modalMessage = `
                        <div class="flex flex-col items-center justify-center text-center px-2 py-4">
                            <p class="text-3xl text-gray-800 leading-tight font-extrabold mb-4 mt-2">
                                Uzay Cihazları Dedektifi! 🧲🚀
                            </p>
                            <p class="text-xl font-bold text-gray-600 bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
                                Gürültülü MR makineleri aslında içimizi kontrol eden <b>dost canlısı uzay gemileridir!</b> Kahramanlar sesten korkmaz! 🛡️
                            </p>
                        </div>
                    `;
                    } else if (currentThemeId === 7 && currentLevelId === '1') { // Uzay Odam 
                        modalMessage = `
                        <div class="flex flex-col items-center justify-center text-center px-2 py-4">
                            <p class="text-3xl text-gray-800 leading-tight font-extrabold mb-4 mt-2">
                                Uzay Odanı Keşfettin! 🚀🎨
                            </p>
                            <p class="text-xl font-bold text-gray-600 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
                                Hastanedeki odan senin <b>hayal uzayındır!</b> Sadece tabletle kalma, bol bol resim çizip kitap oku! 🎨📖
                            </p>
                        </div>
                    `;
                    }

                    // Skoru vb kaydet, bir sonraki leveli aç (ama yıldızı burada animasyonsuz update ediyor addStar. Animasyon haritada olacak)
                    handleAnswer(true, true);

                    showModal('Tebrikler!', modalMessage, 'Haritaya Dön 🚀', true, '🎉', () => {
                        // Modal butona tıklanınca Tema haritasına dönsün ve animasyon başlasın
                        pendingStarLevelId = currentLevelId; // Hangi levelelın içindeydik onu kaydediyoruz
                        showThemeMap(currentThemeId);
                        closeModal();
                    });
                }, 500);
            }
        } else {
            // Hatalı eşleşme, 500ms bekle ve sıfırla
            const leftEl = matchingState.selectedLeft.element;
            const rightEl = matchingState.selectedRight.element;

            leftEl.classList.add('border-red-400', 'bg-red-50');
            rightEl.classList.add('border-red-400', 'bg-red-50');

            setTimeout(() => {
                leftEl.classList.remove('selected', 'border-red-400', 'bg-red-50');
                rightEl.classList.remove('selected', 'border-red-400', 'bg-red-50');
            }, 600);

            matchingState.selectedLeft = null;
            matchingState.selectedRight = null;
        }
    }
}

// Planting (Ağaç Dikme) oyunu kaldırıldı.

// ----------------------------------------------------
// Genelleştirilmiş Sınıflandırma (Sorting) Oyunu
// ----------------------------------------------------
function renderSortingGame(level) {
    const sortingItemsContainer = document.getElementById('sorting-items');
    const leftZone = document.getElementById('dropzone-healthy'); // ID'yi legacy bırakıp, logic değiştirildi
    const rightZone = document.getElementById('dropzone-unhealthy');

    const leftTitle = document.getElementById('dropzone-left-title');
    const rightTitle = document.getElementById('dropzone-right-title');

    // Dinamik başlık atama (data.js üzerinden gelecek)
    if (userProgress.ageGroup === '2-5') {
        if (leftTitle) leftTitle.classList.add('hidden');
        if (rightTitle) rightTitle.classList.add('hidden');
    } else {
        if (leftTitle && level.dropzones && level.dropzones.left) {
            leftTitle.classList.remove('hidden');
            leftTitle.textContent = level.dropzones.left.title;
        }
        if (rightTitle && level.dropzones && level.dropzones.right) {
            rightTitle.classList.remove('hidden');
            rightTitle.textContent = level.dropzones.right.title;
        }
    }

    // Dropzone içerik kutularını al
    const leftContent = leftZone.querySelector('.drop-content');
    const rightContent = rightZone.querySelector('.drop-content');

    // Başlangıç ekranını temizle
    sortingItemsContainer.innerHTML = '';
    leftContent.innerHTML = '';
    rightContent.innerHTML = '';

    // Sürüklenen elementin referansı
    let draggedElement = null;
    let correctSortCount = 0;
    const totalItems = level.items.length;

    // Şıkları rastgele diz
    const randomItems = [...level.items].sort(() => Math.random() - 0.5);

    randomItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'w-24 sm:w-28 text-5xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform bg-white/80 p-2 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col items-center justify-center break-words';
        div.draggable = true;
        div.dataset.id = item.id;
        div.dataset.type = item.type; // 'healthy' or 'unhealthy'

        const isToddler = userProgress.ageGroup === '2-5';
        const nameSpanClass = isToddler ? 'hidden' : 'text-xs sm:text-sm font-bold text-gray-600 mt-1 text-center w-full leading-tight px-1 break-words';
        const emojiSizeClass = isToddler ? 'text-7xl mb-2' : '';

        div.innerHTML = `<span class="${emojiSizeClass}">${item.emoji}</span><span class="${nameSpanClass}">${item.name || ''}</span>`;

        // Drag Events (Masaüstü)
        div.ondragstart = (e) => {
            draggedElement = div;
            e.dataTransfer.setData('text/plain', item.id);
            setTimeout(() => div.classList.add('opacity-50', 'scale-90'), 0);
        };
        div.ondragend = () => {
            div.classList.remove('opacity-50', 'scale-90');
            draggedElement = null;
        };

        // Touch Events (Mobil)
        let initialX, initialY, currentX, currentY;
        let isDraggingTouch = false;

        div.addEventListener('touchstart', (e) => {
            draggedElement = div;
            div.classList.add('absolute', 'z-50', 'scale-110');
            isDraggingTouch = true;
            initialX = e.touches[0].clientX - (div.offsetLeft || 0); // initial offset fix
            initialY = e.touches[0].clientY - (div.offsetTop || 0);
        }, { passive: false });

        div.addEventListener('touchmove', (e) => {
            if (!isDraggingTouch) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;

            // Ortalayarak taşı
            div.style.left = `${currentX - div.offsetWidth / 2}px`;
            div.style.top = `${currentY - div.offsetHeight / 2}px`;
        }, { passive: false });

        div.addEventListener('touchend', (e) => {
            if (!isDraggingTouch) return;
            isDraggingTouch = false;
            div.classList.remove('absolute', 'z-50', 'scale-110');
            div.style.left = '';
            div.style.top = '';

            const touch = e.changedTouches[0];

            // Check collisions with dropzones manually for touch
            const checkCollision = (zoneElement) => {
                const rect = zoneElement.getBoundingClientRect();
                return (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                    touch.clientY >= rect.top && touch.clientY <= rect.bottom);
            };

            if (checkCollision(leftZone)) {
                handleDropAttempt(div, level.dropzones.left.type, leftContent);
            } else if (checkCollision(rightZone)) {
                handleDropAttempt(div, level.dropzones.right.type, rightContent);
            }
            draggedElement = null;
        });

        sortingItemsContainer.appendChild(div);
    });

    // Dropzone Events (Masaüstü)
    const setupDropzone = (zone, expectedType, contentContainer) => {
        zone.ondragover = (e) => {
            e.preventDefault();
            zone.classList.add('brightness-95', 'scale-[1.02]');
        };
        zone.ondragleave = () => {
            zone.classList.remove('brightness-95', 'scale-[1.02]');
        };
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('brightness-95', 'scale-[1.02]');
            if (draggedElement) {
                handleDropAttempt(draggedElement, expectedType, contentContainer);
            }
        };
    };

    if (level.dropzones) {
        setupDropzone(leftZone, level.dropzones.left.type, leftContent);
        setupDropzone(rightZone, level.dropzones.right.type, rightContent);
    }

    function handleDropAttempt(itemElement, expectedType, targetContainer) {
        const itemType = itemElement.dataset.type;

        if (itemType === expectedType) {
            // Doğru eşleşme
            itemElement.draggable = false;
            itemElement.classList.remove('cursor-grab', 'active:cursor-grabbing', 'hover:scale-110');
            itemElement.classList.add('cursor-default', 'bg-green-100', 'border-green-400', 'scale-95'); // Başarı stili

            // Clone the element cleanly for the dropzone to remove absolute positioning bugs from touch
            itemElement.style.position = 'relative';
            itemElement.style.left = '0';
            itemElement.style.top = '0';

            targetContainer.appendChild(itemElement);
            correctSortCount++;

            // Oyun bitti mi?
            if (correctSortCount === totalItems) {
                setTimeout(handleSortingWin, 500);
            }
        } else {
            // Yanlış eşleşme (Sallanma animasyonu)
            itemElement.classList.add('animate-shake', 'bg-red-100', 'border-red-400');
            setTimeout(() => {
                itemElement.classList.remove('animate-shake', 'bg-red-100', 'border-red-400');
            }, 500);

            // Reset position if touch failed
            itemElement.style.position = 'relative';
            itemElement.style.left = '0';
            itemElement.style.top = '0';
        }
    }

    function handleSortingWin() {
        let modalMessage = level.winMessage || 'Tümünü doğru gruplandırdın!'; // Dinamik winMessage eklendi
        let modalTitle = level.winTitle || 'Tebrikler! 🎉';

        handleAnswer(true, true);
        showModal(modalTitle, modalMessage, 'İlerle 🚀', true, level.winEmoji || '🎊', () => {
            pendingStarLevelId = currentLevelId;
            showThemeMap(currentThemeId);
            closeModal();
        });
    }
}

// ----------------------------------------------------
// Sonraki Bölümü Açma Mantığı
// ----------------------------------------------------
function unlockNextLevel() {
    const themeIndex = userProgress.themes.findIndex(t => t.id === currentThemeId);
    if (themeIndex === -1) return;

    const theme = userProgress.themes[themeIndex];
    if (!theme.levels) return;

    const levelIndex = theme.levels.findIndex(l => String(l.id) === String(currentLevelId));

    // Eğer bu bölüm son bölüm değilse, sonrakinin kilidini aç
    if (levelIndex !== -1 && levelIndex < theme.levels.length - 1) {
        userProgress.themes[themeIndex].levels[levelIndex + 1].isLocked = false;
        saveProgress();
    }
}

// ----------------------------------------------------
// Cevap Kontrolü
// ----------------------------------------------------
function handleAnswer(isCorrect, isMatchingGame = false) {
    if (isCorrect) {
        addStar(1);
        unlockNextLevel();
        // Eşleştirme oyununun kendi özel tebrikler ekranı ve animasyon lojiği var renderMatchingGame içinde
        if (!isMatchingGame && (currentThemeId !== 7 || !currentLevelId.toString().startsWith('matching'))) {
            const theme = userProgress.themes.find(t => t.id === currentThemeId);
            const baseLevel = theme.levels.find(l => String(l.id) === String(currentLevelId));
            const level = getAgeSpecificContent(baseLevel);

            let customTitle = level.winTitle || 'Doğru Cevap!';
            let customDesc = level.winMessage || 'Harikasın, 1 Yıldız kazandın! ⭐';
            let bgClass = level.bgClass || 'bg-blue-50';
            let borderClass = level.borderClass || 'border-blue-200';
            let customEmoji = level.winEmoji || '🎉';

            const richModalHTML = `
                <div class="flex flex-col items-center justify-center text-center px-2 py-4">
                    <p class="text-2xl sm:text-3xl text-gray-800 leading-tight font-extrabold mb-4 mt-2">
                        ${customTitle}
                    </p>
                    <p class="text-xl font-bold text-gray-600 ${bgClass} p-4 rounded-2xl border-2 ${borderClass}">
                        ${customDesc}
                    </p>
                </div>
            `;

            showModal('Tebrikler!', richModalHTML, 'Haritaya Dön', true, customEmoji, () => {
                pendingStarLevelId = currentLevelId;
                showThemeMap(currentThemeId);
                closeModal();
            });
        }
    } else {
        showModal('Oops!', 'Bir daha dene, sen yapabilirsin!', 'Tekrar Dene', false, '💡');
    }
}

// ----------------------------------------------------
// Ortak Fonksiyonlar (UI Modal)
// ----------------------------------------------------
const modalOverlay = document.getElementById('modal-overlay');
const modalBox = document.getElementById('modal-box');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc'); // Changed from modal-message to modal-desc
const modalBtn = document.getElementById('modal-btn');
const modalEmoji = document.getElementById('modal-emoji');
let modalSuccessMode = false;

// Modal Yönetimi
function showModal(title, desc, btnText, isSuccess, emojiStr = '🎉', onBtnClickCallback = null) {
    if (userProgress.ageGroup === '2-5') {
        modalTitle.classList.add('hidden');
        modalDesc.classList.add('hidden');
        modalBtn.textContent = isSuccess ? '🚀' : '🔁';
        modalEmoji.className = 'text-9xl mb-4 drop-shadow-lg'; // Make emoji giant for toddlers
    } else {
        modalTitle.classList.remove('hidden');
        modalDesc.classList.remove('hidden');
        modalEmoji.className = 'text-6xl mb-4 drop-shadow-md';
        modalTitle.textContent = title;
        modalDesc.innerHTML = desc; // Use innerHTML for rich content
        modalBtn.textContent = btnText;
    }

    modalEmoji.textContent = emojiStr;
    modalSuccessMode = isSuccess;

    // Buton Rengi
    if (isSuccess) {
        modalBtn.className = 'mt-8 w-full py-4 text-2xl font-extrabold rounded-full bg-pastelYellow border-4 border-pastelPinkDark text-gray-800 shadow-md active:scale-95';
    } else {
        modalBtn.className = 'mt-8 w-full py-4 text-2xl font-extrabold rounded-full bg-pastelPink border-4 border-gray-200 text-gray-800 shadow-md active:scale-95';
    }

    // Önceki Event Listener'ları temizle
    modalBtn.onclick = null;

    if (onBtnClickCallback) {
        modalBtn.onclick = onBtnClickCallback;
    } else {
        // Varsayılan onClose Davranışı
        modalBtn.onclick = () => {
            closeModal();
            if (isSuccess) {
                // Basit davranışta da haritaya dön
                pendingStarLevelId = currentLevelId;
                showThemeMap(currentThemeId);
            }
        };
    }

    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('flex');

    // Giriş Animasyonu
    setTimeout(() => {
        modalOverlay.classList.remove('opacity-0');
        modalBox.classList.remove('scale-50');
    }, 10);
}

function closeModal() {
    modalOverlay.classList.add('opacity-0');
    modalBox.classList.add('scale-50');

    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        // The default success action is now handled by the modalBtn.onclick in showModal
    }, 300);
}

// Başlangıç tetiklemesi
document.addEventListener('DOMContentLoaded', () => {
    initProgress();
});
