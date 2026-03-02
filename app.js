// ═══════════════════════════════════════════════════════
// LÖSEV SÜPER KAHRAMANIM — Application Logic
// ═══════════════════════════════════════════════════════

// ─── DATA LAYER ─────────────────────────────────────────
function getAllUsers() {
    return JSON.parse(localStorage.getItem('losevUsers') || '[]');
}

function saveAllUsers(users) {
    localStorage.setItem('losevUsers', JSON.stringify(users));
}

function getActiveUserId() {
    return localStorage.getItem('losevActiveUser') || null;
}

function setActiveUserId(id) {
    if (id) localStorage.setItem('losevActiveUser', id);
    else localStorage.removeItem('losevActiveUser');
}

function getActiveUser() {
    const id = getActiveUserId();
    if (!id) return null;
    return getAllUsers().find(u => u.id === id) || null;
}

function updateUser(updatedUser) {
    const users = getAllUsers();
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx !== -1) {
        users[idx] = updatedUser;
        saveAllUsers(users);
    }
}

// ─── SIMPLE HASH (not secure, just obfuscation) ────────
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash.toString(36);
}

// ─── TOAST ──────────────────────────────────────────────
let toastTimeout = null;
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast' + (type ? ` toast-${type}` : '');
    // Trigger reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── NAVIGATION ─────────────────────────────────────────
const screens = ['login', 'register', 'home', 'profile', 'community', 'profile-detail', 'module-detail', 'hero-upgrade', 'academy', 'minigame'];
const authedScreens = ['home', 'profile', 'community', 'profile-detail', 'module-detail', 'hero-upgrade', 'academy', 'minigame'];

function navigateTo(screenName) {
    // Hide all
    screens.forEach(s => {
        const el = document.getElementById(`screen-${s}`);
        if (el) el.classList.add('hidden');
    });

    // Show target
    const target = document.getElementById(`screen-${screenName}`);
    if (target) target.classList.remove('hidden');

    // Navbar
    const navbar = document.getElementById('main-navbar');
    const isAuthed = authedScreens.includes(screenName);

    if (navbar) {
        if (isAuthed && !['module-detail', 'hero-upgrade', 'academy'].includes(screenName)) {
            navbar.classList.remove('hidden');
            // Update active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.screen === screenName);
            });
        } else {
            navbar.classList.add('hidden');
        }
    }

    // Screen-specific init
    if (screenName === 'home') renderHome();
    if (screenName === 'profile') renderProfile();
    if (screenName === 'community') renderCommunity();
    if (screenName === 'hero-upgrade') renderUpgradeScreen();
    if (screenName === 'academy') renderAcademyScreen();
}

// ─── TEMP STATE ─────────────────────────────────────────
let regState = { avatar: '', avatarBg: '#D6E4FF', stats: {} };

function selectAvatar(btn) {
    regState.avatar = btn.dataset.avatar;
    regState.avatarBg = btn.dataset.bg;
    document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

// ─── AGE CALCULATION ──────────────────────────────────
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function getAgeGroupFromAge(age) {
    if (age <= 6) return '3-6';
    return '6-12';
}

function selectRegGender(gender) {
    regState.gender = gender;
    document.getElementById('box-boy').style.borderColor = gender === 'boy' ? 'var(--primary)' : '#E8E8F0';
    document.getElementById('box-boy').style.backgroundColor = gender === 'boy' ? 'rgba(108, 99, 255, 0.1)' : 'transparent';

    document.getElementById('box-girl').style.borderColor = gender === 'girl' ? 'var(--primary)' : '#E8E8F0';
    document.getElementById('box-girl').style.backgroundColor = gender === 'girl' ? 'rgba(108, 99, 255, 0.1)' : 'transparent';
}

// ─── AUTH: REGISTER ────────────────────────────────────
function doRegister() {
    const displayName = document.getElementById('reg-displayname').value.trim();
    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const birthDate = document.getElementById('reg-birthdate').value;

    if (!displayName) { showToast('Lütfen adını gir!', 'error'); return; }
    if (!username || username.length < 3) { showToast('Kullanıcı adı en az 3 karakter olmalı!', 'error'); return; }
    if (/[^a-z0-9_]/.test(username)) { showToast('Kullanıcı adı sadece harf, rakam ve _ içerebilir!', 'error'); return; }
    if (!password || password.length < 4) { showToast('Şifre en az 4 karakter olmalı!', 'error'); return; }
    if (!birthDate) { showToast('Lütfen doğum tarihini seç!', 'error'); return; }
    if (!regState.gender) { showToast('Lütfen cinsiyetini seç!', 'error'); return; }


    const users = getAllUsers();
    if (users.find(u => u.username === username)) {
        showToast('Bu kullanıcı adı zaten alınmış!', 'error');
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        username: username,
        password: simpleHash(password),
        displayName: displayName,
        birthDate: birthDate,
        avatar: regState.avatar || (regState.gender === 'girl' ? '👧' : '👦'), // Use selected avatar, fallback to gender emoji
        avatarBg: regState.avatarBg || '#D6E4FF', // Use selected avatarBg, fallback to default
        bio: '',
        stars: 0,
        xp: 0,
        level: 1,
        stats: { power: 1, speed: 1, intel: 1 },
        gender: regState.gender,
        lastLogin: new Date().toISOString().split('T')[0],
        streak: 1,
        createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    saveAllUsers(users);
    setActiveUserId(newUser.id);

    // Reset form
    document.getElementById('reg-displayname').value = '';
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-birthdate').value = '';
    regState = { avatar: '', avatarBg: '#D6E4FF', ageGroup: '', gender: '' };
    document.getElementById('box-boy').style.borderColor = '#E8E8F0';
    document.getElementById('box-boy').style.backgroundColor = 'transparent';
    document.getElementById('box-girl').style.borderColor = '#E8E8F0';
    document.getElementById('box-girl').style.backgroundColor = 'transparent';
    document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));

    showToast('Hoş geldin, ' + displayName + '! 🎉', 'success');
    navigateTo('home');
}

// ─── AUTH: LOGIN ───────────────────────────────────────
function doLogin() {
    const username = document.getElementById('login-username').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showToast('Kullanıcı adı ve şifre gerekli!', 'error');
        return;
    }

    const users = getAllUsers();
    const user = users.find(u => u.username === username);

    if (!user || user.password !== simpleHash(password)) {
        showToast('Kullanıcı adı veya şifre hatalı!', 'error');
        return;
    }

    setActiveUserId(user.id);

    // Clear form
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';

    showToast('Tekrar hoş geldin, ' + user.displayName + '! 🚀', 'success');
    navigateTo('home');
}

// ─── AUTH: LOGOUT ──────────────────────────────────────
function doLogout() {
    setActiveUserId(null);
    showToast('Çıkış yapıldı 👋');
    navigateTo('login');
}

// ─── RENDER: HOME ──────────────────────────────────────
function renderHome() {
    const user = getActiveUser();
    if (!user) { navigateTo('login'); return; }

    const nameEl = document.getElementById('home-displayname');
    if (nameEl) nameEl.textContent = user.displayName;

    const navAvatarEl = document.getElementById('home-avatar');
    if (navAvatarEl) {
        navAvatarEl.textContent = user.avatar;
        navAvatarEl.style.background = user.avatarBg;
    }

    const starsEl = document.getElementById('home-stars');
    if (starsEl) starsEl.textContent = user.stars || 0;

    // Update bottom navbar icon based on gender
    const navProfileIcon = document.getElementById('navbar-profile-icon');
    if (navProfileIcon) {
        navProfileIcon.textContent = user.gender === 'girl' ? '👧' : '👦';
    }

    // Level & XP
    const level = Math.floor((user.xp || 0) / 100) + 1;
    const xpInLevel = (user.xp || 0) % 100;
    const levelEl = document.getElementById('user-level');
    if (levelEl) levelEl.textContent = `Seviye ${level}`;
    const xpEl = document.getElementById('user-xp');
    if (xpEl) xpEl.textContent = xpInLevel;
    const xpFill = document.getElementById('xp-fill');
    if (xpFill) xpFill.style.width = `${xpInLevel}%`;

    // Stats
    const pEl = document.getElementById('stat-power');
    if (pEl) pEl.textContent = user.stats?.power || 1;
    const sEl = document.getElementById('stat-speed');
    if (sEl) sEl.textContent = user.stats?.speed || 1;
    const iEl = document.getElementById('stat-intel');
    if (iEl) iEl.textContent = user.stats?.intel || 1;

    // Reset Hero Position
    const hero = document.getElementById('main-hero');
    if (hero) {
        hero.style.left = '50%';
        hero.style.top = '50%';
        hero.style.transform = 'translate(-50%, -50%)';
    }

    renderHeroHub(user);
}

function renderHeroHub(user) {
    const wrapper = document.getElementById('hub-modules-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    const age = calculateAge(user.birthDate);
    const ageGroup = getAgeGroupFromAge(age);

    // Position modules in a circle (Dynamic Radius for mobile)
    const containerWidth = document.querySelector('.hero-hub-container')?.offsetWidth || 360;
    const radius = Math.min(containerWidth / 2.6, 140);

    const hubModules = [...modulesData];

    hubModules.forEach((mod, i) => {
        const angle = (i * (360 / hubModules.length) - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const btn = document.createElement('div');
        btn.className = 'hub-module';

        // İyileşme (eski Akademi) modülüne özel renk verilebilir
        if (mod.id === 'iyilesme') btn.style.background = 'rgba(255, 215, 0, 0.9)';

        btn.style.left = `calc(50% + ${x}px - 40px)`;
        btn.style.top = `calc(50% + ${y}px - 40px)`;
        btn.style.animationDelay = `${i * 0.1}s`;

        btn.innerHTML = `
            <div class="hm-icon">${mod.icon}</div>
            <div class="hm-label">${mod.title}</div>
        `;

        btn.onclick = (e) => {
            moveHeroAndNavigate(mod.id, x, y);
        };
        wrapper.appendChild(btn);
    });
}

function moveHeroAndNavigate(moduleId, x, y) {
    const hero = document.getElementById('main-hero');
    if (!hero) return;

    // Move hero to module
    hero.style.left = `calc(50% + ${x}px)`;
    hero.style.top = `calc(50% + ${y}px)`;
    hero.style.transform = 'translate(-50%, -50%) scale(1.2)';

    // Wait for animation then navigate
    setTimeout(() => {
        if (moduleId === 'academy') {
            navigateTo('academy');
        } else {
            showModuleDetail(moduleId);
        }
    }, 600);
}

let globalCurrentModule = null;

// ─── RENDER: MODULE DETAIL (LEVEL MAP) ─────────────────
function showModuleDetail(moduleId) {
    const user = getActiveUser();
    if (!user) return;

    const mod = modulesData.find(m => m.id === moduleId);
    if (!mod) return;

    globalCurrentModule = moduleId;

    // Faz 6 / Faz 8: İlk açılışta modül verisini hazırlıyoruz.
    // heroMode'da olsak bile harita için `completedLevels` array'ine ihtiyaç var.
    if (!user.pets) user.pets = {};
    if (!user.pets[moduleId]) {
        user.pets[moduleId] = { food: 5, happiness: 0, completedLevels: [] };
        updateUser(user);
    }

    const petData = user.pets[moduleId];

    // Header
    const header = document.getElementById('module-detail-header');
    header.style.background = mod.colorDark;
    document.getElementById('module-detail-title').textContent = mod.title;
    document.getElementById('module-detail-desc').textContent = mod.description;
    document.getElementById('module-detail-icon').textContent = mod.icon;

    // Panel Geçişi (Pet vs Hero)
    const petPanel = document.getElementById('pet-panel-ui');
    const heroPanel = document.getElementById('hero-panel-ui');

    if (mod.heroMode) {
        petPanel.classList.add('hidden');
        heroPanel.classList.remove('hidden');

        // Hero Init
        if (!user.health) user.health = 20; // Başlangıç sağlığı (Örn: %20)

        document.getElementById('hero-panel-emoji').textContent = user.avatar;
        document.getElementById('hero-panel-name').textContent = user.displayName;
        document.getElementById('hero-health-fill').style.width = `${user.health}%`;

        const heroStatus = document.getElementById('hero-panel-status');
        // Kullanıcının "Öğrenim Durumu" için metin yerine görsel/icon (emoji) bırakıyoruz.
        if (user.health >= 80) heroStatus.innerHTML = '<span style="font-size:1.2rem;">🎓</span>';
        else if (user.health >= 50) heroStatus.innerHTML = '<span style="font-size:1.2rem;">📚</span>';
        else heroStatus.innerHTML = '<span style="font-size:1.2rem;">📖</span>';

    } else {
        petPanel.classList.remove('hidden');
        heroPanel.classList.add('hidden');

        // Pet UI
        document.getElementById('pet-emoji').textContent = mod.pet.emoji;
        document.getElementById('pet-name').textContent = mod.pet.name;
        document.getElementById('pet-food-icon').textContent = mod.pet.foodIcon;
        document.getElementById('pet-food-amount').textContent = petData.food;
        document.getElementById('pet-happiness-fill').style.width = `${petData.happiness}%`;

        const statusEl = document.getElementById('pet-status');
        if (petData.happiness > 50) {
            statusEl.textContent = 'Mutlu! 🥰';
        } else if (petData.happiness > 0) {
            statusEl.textContent = 'Uyanık! 👀';
        } else {
            statusEl.textContent = 'Zzz... 😴';
        }

        const feedBtn = document.getElementById('feed-pet-btn');
        feedBtn.disabled = petData.food <= 0 || petData.happiness >= 100;
    }

    // Level Map
    const mapContainer = document.getElementById('level-map-container');
    mapContainer.innerHTML = ''; // Temizle

    // Dinamik kıvrımlı SVG yolu oluşturma
    // Her bir düğüm (node) yaklaşık 120px dikey yer kaplayacak
    const nodeHeight = 120;
    const totalHeight = mod.levels.length * nodeHeight;
    let pathD = `M 50 0 `;

    for (let i = 0; i < mod.levels.length; i++) {
        const startY = i * nodeHeight;
        const endY = (i + 1) * nodeHeight;
        // Çift/Tek index'e göre sağa veya sola doğru kıvrım ver
        const controlX = i % 2 === 0 ? 90 : 10;
        pathD += `C ${controlX} ${startY + nodeHeight / 3}, ${controlX} ${endY - nodeHeight / 3}, 50 ${endY} `;
    }

    const svgHTML = `
    <svg class="level-path-svg" viewBox="0 0 100 ${totalHeight}" preserveAspectRatio="none" style="height: ${totalHeight}px;">
        <path fill="transparent" stroke="${mod.colorDark}" stroke-opacity="0.3" d="${pathD}" class="animated"></path>
    </svg>`;
    mapContainer.innerHTML = svgHTML;

    // Petin (Maskot) haritadaki pozisyonu bulacağız
    let petPlaced = false;

    mod.levels.forEach((lvl, index) => {
        const completedLevels = petData?.completedLevels || [];
        const isCompleted = completedLevels.includes(lvl.id);
        const isNext = !isCompleted && (index === 0 || completedLevels.includes(mod.levels[index - 1].id));
        const isLocked = !isCompleted && !isNext;

        let nodeClass = 'level-node';
        let icon = '⭐';
        if (isLocked) {
            nodeClass += ' locked';
            icon = '🔒';
        } else if (isCompleted) {
            nodeClass += ' completed';
            icon = '✔️';
        } else if (isNext) {
            nodeClass += ' active anim-pop';
            icon = lvl.type === 'quiz' ? '❓' : '💡';
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'level-node-wrapper anim-fade-up';
        wrapper.style.animationDelay = `${(index % 5) * 0.1}s`; // Stagger animation

        // Maskot/Hero yerleşimi için bilgileri ayır, mapContainer'a ayrı ekleyeceğiz
        if (isNext && !petPlaced) {
            petPlaced = true;

            const petTop = (index * 120);
            const petLeft = index % 2 === 0 ? '70%' : '30%';

            const petMarker = document.createElement('div');
            petMarker.className = 'map-pet anim-pop';
            petMarker.id = 'active-map-pet';
            petMarker.style.top = `calc(${petTop}px - 20px)`;
            petMarker.style.left = `calc(${petLeft} - 25px)`;

            const avatarEmoji = mod.heroMode ? user.avatar : mod.pet.emoji;

            petMarker.innerHTML = `
                <div class="map-pet-emoji">${avatarEmoji}</div>
                <div class="map-pet-tooltip">Buradayım!</div>
            `;
            setTimeout(() => mapContainer.appendChild(petMarker), 10);
        }

        const iconLabel = mod.heroMode ? 'Sağlık' : mod.pet.foodIcon;

        wrapper.innerHTML = `
            <div class="${nodeClass}" onclick="${isLocked || isCompleted ? '' : `handleLevelClick('${moduleId}', ${lvl.id}, '${lvl.type}', ${lvl.xp}, ${lvl.targetFood})`}">
                <div class="level-node-icon">${icon}</div>
                <div class="level-node-stars">+${lvl.xp} XP | +${lvl.targetFood} ${iconLabel}</div>
            </div>
            <div style="position:absolute; top:30%; ${index % 2 === 0 ? 'right:5%' : 'left:5%'}; font-weight:800; font-size:0.8rem; color: #666; width: 35%; text-align: ${index % 2 === 0 ? 'right' : 'left'};">
                ${lvl.title}
            </div>
        `;
        mapContainer.appendChild(wrapper);
    });

    // Eğer hepsi bittiyse maskotu son node'a koy
    if (!petPlaced && mod.levels.length > 0) {
        const lastWrapper = mapContainer.lastElementChild;
        if (lastWrapper) {
            const avatarEmoji = mod.heroMode ? user.avatar : mod.pet.emoji;
            lastWrapper.insertAdjacentHTML('afterbegin', `<div class="map-pet anim-pop"><div class="map-pet-emoji">${avatarEmoji}</div></div>`);
        }
    }

    navigateTo('module-detail');
}

// ─── PET FEEDING & LEVEL LOGIC ─────────────────────────────
function handleLevelClick(moduleId, levelId, levelType, xpAmount, foodAmount) {
    const user = getActiveUser();
    if (!user) return;

    const mod = modulesData.find(m => m.id === moduleId);
    const petData = user.pets ? user.pets[moduleId] : null;

    // Faz 6: Yem / Mutluluk Şartı (Pet Açsa Level Oynanamaz)
    // Eğer heroMode aktifse bu kontrolü atla
    if (!mod.heroMode && petData && petData.happiness < 20) {
        showToast("🐾 Önce dostunu beslemelisin!", "error");

        // Sadece küçük bir sarsıntı efekti verelim
        const petPanel = document.querySelector('.pet-panel');
        if (petPanel) {
            petPanel.style.transform = "translateX(10px)";
            setTimeout(() => petPanel.style.transform = "translateX(-10px)", 100);
            setTimeout(() => petPanel.style.transform = "translateX(10px)", 200);
            setTimeout(() => petPanel.style.transform = "translateX(0)", 300);
        }
        return;
    }

    if (levelType === 'drag-drop') {
        openMiniGame(moduleId, levelId, xpAmount, foodAmount);
    } else {
        completeLevel(moduleId, levelId, xpAmount, foodAmount);
    }
}

function completeLevel(moduleId, levelId, xpAmount, foodAmount) {
    const user = getActiveUser();
    if (!user) return;

    const mod = modulesData.find(m => m.id === moduleId);
    const intelStat = user.stats?.intel || 1;
    const bonusXp = Math.floor(xpAmount * (1 + (intelStat * 0.1)));

    // Grant XP and Food (Or Health)
    user.xp = (user.xp || 0) + bonusXp;

    if (mod.heroMode) {
        // Kahraman modu ise sağlık kazan (Maximum 100)
        user.health = Math.min(100, (user.health || 0) + foodAmount * 10);
    } else {
        user.pets[moduleId].food += foodAmount;
    }

    user.pets[moduleId].completedLevels.push(levelId);

    // Level up check
    const newLevel = Math.floor(user.xp / 100) + 1;
    if (newLevel > (user.level || 1)) {
        user.level = newLevel;
        showToast(`🎉 SEVİYE ${newLevel} OLDUN!`);
    }

    updateUser(user);

    if (mod.heroMode) {
        showToast(`+${bonusXp} XP ve +Sağlık Puanı kazandın!`);
    } else {
        showToast(`+${bonusXp} XP ve +${foodAmount} Yem kazandın!`);
    }

    // Maskotu yavaşça bir sonraki node'a kaydır (Soft Transition)
    const petElement = document.getElementById('active-map-pet');
    const nodes = document.querySelectorAll('.level-node-wrapper');
    const nextNodeIndex = user.pets[moduleId].completedLevels.length;

    if (petElement && nextNodeIndex < nodes.length) {
        petElement.style.transition = 'top 1s ease-in-out, left 1s ease-in-out';
        const petTop = (nextNodeIndex * 120);
        const petLeft = nextNodeIndex % 2 === 0 ? '70%' : '30%';

        petElement.style.top = `calc(${petTop}px - 20px)`;
        petElement.style.left = `calc(${petLeft} - 25px)`;

        // 1 saniye sonra haritayı tam yenile
        setTimeout(() => {
            showModuleDetail(moduleId);
        }, 1000);
    } else {
        // Maskot yoksa anında yenile
        showModuleDetail(moduleId);
    }
}

// ─── ETKİLEŞİMLİ MİNİ OYUN (DRAG & DROP - FAZ 7) ────────────
let activeMiniGame = null;

function openMiniGame(moduleId, levelId, xpAmount, foodAmount) {
    const mod = modulesData.find(m => m.id === moduleId);
    const lvl = mod.levels.find(l => l.id === levelId);
    if (!mod || !lvl || !lvl.gameData) return;

    activeMiniGame = {
        moduleId, levelId, xpAmount, foodAmount,
        energy: 0,
        gameData: lvl.gameData,
        petEmoji: mod.pet.emoji
    };

    // UI Setup
    document.getElementById('minigame-title').textContent = lvl.title;
    document.getElementById('minigame-instruction').textContent = lvl.gameData.heroTitle || 'Beni Besle!';

    // Eğer oyuna özel bir hedef emoji varsa onu kullan, yoksa avatar/pet emojisi.
    const avatarEmoji = lvl.gameData.targetEmoji || (mod.heroMode ? getActiveUser().avatar : mod.pet.emoji);
    document.querySelector('.hero-avatar-large').textContent = avatarEmoji;

    // Reset Energy & Feedback
    document.getElementById('minigame-energy').style.width = '0%';
    document.getElementById('minigame-energy').style.backgroundColor = 'var(--success)';
    document.getElementById('minigame-feedback').classList.add('hidden');
    document.getElementById('feedback-continue-btn').classList.add('hidden');

    const dragHint = document.getElementById('drag-hint');
    if (dragHint) dragHint.style.display = 'block';

    const itemsContainer = document.getElementById('draggable-items-container');
    itemsContainer.innerHTML = ''; // Temizle

    // Eşyaları Yarat
    lvl.gameData.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'drag-item';

        // Eğer hero-sleep ise, kullanıcının kendi avatarını göster
        if (item.id === 'hero-sleep') {
            div.textContent = getActiveUser().avatar;
        } else {
            div.textContent = item.icon;
        }

        div.draggable = true;
        div.dataset.id = item.id;
        div.dataset.isGood = item.isGood;
        div.dataset.message = item.message;

        // Desktop Events
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);

        // Mobile Touch Events
        div.addEventListener('touchstart', handleTouchStart, { passive: false });
        div.addEventListener('touchmove', handleTouchMove, { passive: false });
        div.addEventListener('touchend', handleTouchEnd);

        itemsContainer.appendChild(div);
    });

    // Dropzone Events (Desktop)
    const dropZone = document.getElementById('hero-drop-zone');
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    navigateTo('minigame');
}

function closeMiniGame() {
    activeMiniGame = null;
    navigateTo('module-detail');
}

function continueMiniGame() {
    if (!activeMiniGame) return;

    const { moduleId, levelId, xpAmount, foodAmount } = activeMiniGame;

    // Önce mini oyunu kapat ve harita ekranını visible yap (animasyonun görünmesi için CSS engine frame atlamasın)
    closeMiniGame();

    // Kazanımı ver ve harita üzerindeki animasyonu başlat
    setTimeout(() => {
        completeLevel(moduleId, levelId, xpAmount, foodAmount);
    }, 50);
}

// DRAG EVENT HANDLERS (DESKTOP)
let draggedItemInfo = null;

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    draggedItemInfo = {
        element: e.target,
        isGood: e.target.dataset.isGood === 'true',
        message: e.target.dataset.message
    };
    setTimeout(() => e.target.style.opacity = '0.5', 0);

    const dragHint = document.getElementById('drag-hint');
    if (dragHint) dragHint.style.display = 'none';
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    draggedItemInfo = null;
}

function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('hero-drop-zone').classList.add('active');
}

function handleDragLeave(e) {
    document.getElementById('hero-drop-zone').classList.remove('active');
}

function handleDrop(e) {
    e.preventDefault();
    document.getElementById('hero-drop-zone').classList.remove('active');

    if (draggedItemInfo) {
        processGameDrop(draggedItemInfo);
    }
}

// TOUCH EVENT HANDLERS (MODERN MOBILE DRAG)
let touchDraggedElement = null;

function handleTouchStart(e) {
    touchDraggedElement = e.target;
    draggedItemInfo = {
        element: e.target,
        isGood: e.target.dataset.isGood === 'true',
        message: e.target.dataset.message
    };
    e.target.style.opacity = '0.8';
    e.target.style.position = 'absolute';
    e.target.style.zIndex = '1000';

    const dragHint = document.getElementById('drag-hint');
    if (dragHint) dragHint.style.display = 'none';

    // Elementi touch kordinatlarına taşı
    const touch = e.touches[0];
    moveElementTo(e.target, touch.clientX, touch.clientY);
}

function handleTouchMove(e) {
    e.preventDefault(); // Ekran scrollunu engelle
    const touch = e.touches[0];
    moveElementTo(touchDraggedElement, touch.clientX, touch.clientY);

    // Dropzone üstünde duruyor mu hesapla
    const dropZone = document.getElementById('hero-drop-zone');
    const dropRect = dropZone.getBoundingClientRect();

    if (
        touch.clientX >= dropRect.left &&
        touch.clientX <= dropRect.right &&
        touch.clientY >= dropRect.top &&
        touch.clientY <= dropRect.bottom
    ) {
        dropZone.classList.add('active');
    } else {
        dropZone.classList.remove('active');
    }
}

function handleTouchEnd(e) {
    if (!touchDraggedElement) return;

    const touch = e.changedTouches[0];
    const dropZone = document.getElementById('hero-drop-zone');
    const dropRect = dropZone.getBoundingClientRect();

    dropZone.classList.remove('active');
    touchDraggedElement.style.opacity = '1';
    touchDraggedElement.style.position = 'static';
    touchDraggedElement.style.zIndex = 'auto';
    touchDraggedElement.style.transform = 'none';

    // Dropzone içerisine mi bırakıldı?
    if (
        touch.clientX >= dropRect.left &&
        touch.clientX <= dropRect.right &&
        touch.clientY >= dropRect.top &&
        touch.clientY <= dropRect.bottom
    ) {
        processGameDrop(draggedItemInfo);
    }

    touchDraggedElement = null;
    draggedItemInfo = null;
}

function moveElementTo(el, x, y) {
    if (!el) return;
    el.style.left = (x - el.offsetWidth / 2) + 'px';
    el.style.top = (y - el.offsetHeight / 2) + 'px';
}

function processGameDrop(info) {
    if (!activeMiniGame) return;

    const energyBar = document.getElementById('minigame-energy');
    const gameData = activeMiniGame.gameData;

    // Özel Oyun Mantığı: El Yıkama (Soap -> Water)
    if (gameData.subType === 'wash-hands') {
        const dropZoneAvatar = document.querySelector('.hero-avatar-large');

        if (info.element.dataset.id === 'soap') {
            activeMiniGame.energy = 50;
            energyBar.style.width = '50%';
            energyBar.style.backgroundColor = 'var(--secondary)';
            dropZoneAvatar.innerHTML = '<span style="position:relative;">🖐️<span style="position:absolute; top:0; left:0; font-size:1.5rem;">🧼</span></span>';
            showMiniGameFeedback("Köpük Zamanı!", info.message, "var(--success)", "🧼");
            info.element.style.display = 'none';
            activeMiniGame.soapApplied = true;
        } else if (info.element.dataset.id === 'water') {
            if (activeMiniGame.soapApplied) {
                activeMiniGame.energy = 100;
                energyBar.style.width = '100%';
                energyBar.style.backgroundColor = 'var(--success)';
                dropZoneAvatar.innerHTML = '✨🖐️✨';
                document.getElementById('feedback-continue-btn').classList.remove('hidden');
                showMiniGameFeedback("Harika!", info.message, "var(--success)", "✨", true);
                info.element.style.display = 'none';

                // Konfeti fırlat
                const effect = document.createElement('div');
                effect.className = 'food-effect anim-float-up';
                effect.textContent = '🎉';
                effect.style.left = '50%';
                effect.style.top = '50%';
                document.getElementById('hero-drop-zone').appendChild(effect);
                setTimeout(() => effect.remove(), 1000);

            } else {
                // Sabun sürmeden su tutarsa hata/uyarı ver
                activeMiniGame.energy = 0;
                energyBar.style.width = '0%';
                energyBar.style.backgroundColor = 'var(--error)';
                showMiniGameFeedback("Bekle!", "Önce sabun kullanmalısın! 🧼", "var(--error)", "⚠️");

                // Titreme
                const dropZone = document.getElementById('hero-drop-zone');
                dropZone.style.animation = 'eat-wobble 0.3s ease';
                setTimeout(() => dropZone.style.animation = 'none', 300);
            }
        }
        return;
    }

    // Özel Oyun Mantığı: Uyku (Hero -> Bed)
    if (gameData.subType === 'sleep') {
        if (info.element.dataset.id === 'hero-sleep') {
            const dropZoneAvatar = document.querySelector('.hero-avatar-large');
            activeMiniGame.energy = 100;
            energyBar.style.width = '100%';
            energyBar.style.backgroundColor = 'var(--success)';

            // Yatakta uyuyan kahraman
            dropZoneAvatar.innerHTML = `<span style="position:relative;">🛌<span style="position:absolute; top:-10px; right:0; font-size:1.5rem;">😴</span></span>`;

            document.getElementById('feedback-continue-btn').classList.remove('hidden');
            showMiniGameFeedback("İyi Uykular!", info.message, "var(--success)", "🌙", true);
            info.element.style.display = 'none';

            // Konfeti fırlat
            const effect = document.createElement('div');
            effect.className = 'food-effect anim-float-up';
            effect.textContent = '✨';
            effect.style.left = '50%';
            effect.style.top = '50%';
            document.getElementById('hero-drop-zone').appendChild(effect);
            setTimeout(() => effect.remove(), 1000);

        }
        return;
    }

    if (info.isGood) {
        // Doğru seçim
        activeMiniGame.energy = 100;
        energyBar.style.width = '100%';
        energyBar.style.backgroundColor = 'var(--success)';

        // Eğer oyuna özel bir successEmoji (Başarı emojisi) tanımlanmışsa (Maske, Paylaşma vs.)
        if (activeMiniGame.gameData.successEmoji) {
            const dropZoneAvatar = document.querySelector('.hero-avatar-large');
            dropZoneAvatar.innerHTML = activeMiniGame.gameData.successEmoji;

            // Konfeti fırlat
            const effect = document.createElement('div');
            effect.className = 'food-effect anim-float-up';
            effect.textContent = activeMiniGame.gameData.successEffect || '🎉';
            effect.style.left = '50%';
            effect.style.top = '50%';
            document.getElementById('hero-drop-zone').appendChild(effect);
            setTimeout(() => effect.remove(), 1000);
        }

        const successTitle = activeMiniGame.gameData.successTitle || "Harika!";
        const successIcon = activeMiniGame.gameData.successIcon || "✨";

        document.getElementById('feedback-continue-btn').classList.remove('hidden');
        showMiniGameFeedback(successTitle, info.message, "var(--success)", successIcon, true);
        info.element.style.display = 'none'; // Sürüklenebilir öğeyi gizle


    } else {
        // Yanlış seçim
        activeMiniGame.energy = Math.max(0, activeMiniGame.energy - 20);
        energyBar.style.width = `${activeMiniGame.energy}%`;
        energyBar.style.backgroundColor = 'var(--error)';

        // Titreme efekti
        const dropZone = document.getElementById('hero-drop-zone');
        dropZone.style.animation = 'eat-wobble 0.3s ease';
        setTimeout(() => dropZone.style.animation = 'none', 300);

        showMiniGameFeedback("Dikkat!", info.message, "var(--error)", "⚠️");
    }
}

function showMiniGameFeedback(title, message, color, icon, isFinal = false) {
    const popup = document.getElementById('minigame-feedback');
    const titleEl = document.getElementById('feedback-title');
    const messageEl = document.getElementById('feedback-message');
    const iconEl = document.getElementById('feedback-icon');

    titleEl.textContent = title;
    titleEl.style.color = color;
    messageEl.textContent = message;
    iconEl.textContent = icon;

    popup.classList.remove('hidden');

    // Eğer "Devam Et" butonu kapalıysa (yani oyun bitmediyse/ara adımsa)
    // VEYA isFinal zorunlu olarak false ise otomatik kapat.
    const continueBtn = document.getElementById('feedback-continue-btn');
    if (!isFinal && continueBtn.classList.contains('hidden')) {
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 2000);
    }
}

function feedPet() {
    if (!globalCurrentModule) return;

    const user = getActiveUser();
    if (!user) return;

    const petData = user.pets[globalCurrentModule];
    if (petData.food <= 0 || petData.happiness >= 100) return;

    petData.food -= 1;
    petData.happiness += 20; // Each food gives 20% happiness
    if (petData.happiness > 100) petData.happiness = 100;

    updateUser(user);

    // Trigger animations (Faz 6 Görsel Geribildirim)
    const petEmoji = document.getElementById('pet-emoji');
    if (petEmoji) {
        petEmoji.classList.remove('pet-eat');
        void petEmoji.offsetWidth; // Trigger reflow
        petEmoji.classList.add('pet-eat');

        // Uçuşan kalpler/yıldızlar efekti
        const effect = document.createElement('div');
        effect.textContent = ['💖', '✨', '😋', '🪄'][Math.floor(Math.random() * 4)];
        effect.style.position = 'absolute';
        effect.style.left = '50%';
        effect.style.top = '0';
        effect.style.fontSize = '2rem';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'float-up 1s ease-out forwards';

        const wrapper = document.querySelector('.pet-avatar-wrapper');
        if (wrapper) wrapper.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }
    // Update UI immediately
    document.getElementById('pet-food-amount').textContent = petData.food;
    document.getElementById('pet-happiness-fill').style.width = `${petData.happiness}%`;

    const statusEl = document.getElementById('pet-status');
    if (petData.happiness > 50) {
        statusEl.textContent = 'Mutlu! 🥰';
    } else {
        statusEl.textContent = 'Uyanık! 👀';
    }

    const feedBtn = document.getElementById('feed-pet-btn');
    feedBtn.disabled = petData.food <= 0 || petData.happiness >= 100;

    showToast('Harika! Dostunu besledin. 💖');
}

// ─── RENDER: PROFILE ───────────────────────────────────
function renderProfile() {
    const user = getActiveUser();
    if (!user) { navigateTo('login'); return; }

    document.getElementById('profile-avatar').textContent = user.avatar;
    document.getElementById('profile-avatar').style.background = user.avatarBg;
    document.getElementById('profile-displayname').textContent = user.displayName;
    document.getElementById('profile-username').textContent = '@' + user.username;
    document.getElementById('profile-bio').textContent = user.bio || 'Henüz bir bio eklenmedi.';
    const age = calculateAge(user.birthDate);
    document.getElementById('profile-stars').textContent = user.stars || 0;
    document.getElementById('profile-age-group').textContent = age + ' Yaş';
    document.getElementById('edit-bio').value = user.bio || '';
}

// ─── RENDER: UPGRADE ──────────────────────────────────
function renderUpgradeScreen() {
    const user = getActiveUser();
    if (!user) return;

    document.getElementById('upgrade-stars').textContent = user.stars || 0;

    // Update button states
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        if (user.stars < 5) {
            btn.disabled = true;
            btn.textContent = 'Yetersiz ⭐';
        } else {
            btn.disabled = false;
            btn.textContent = '5 ⭐';
        }
    });

    // Update screen-stats if needed
}

function upgradeStat(statType) {
    const user = getActiveUser();
    if (!user || user.stars < 5) return;

    user.stars -= 5;
    if (!user.stats) user.stats = { power: 1, speed: 1, intel: 1 };

    user.stats[statType] = (user.stats[statType] || 1) + 1;

    updateUser(user);
    showToast(`${statType.toUpperCase()} Geliştirildi! 🚀`, 'success');
    renderUpgradeScreen();
}

// ─── RENDER: COMMUNITY ─────────────────────────────────
function renderCommunity() {
    const user = getActiveUser();
    if (!user) { navigateTo('login'); return; }

    const users = getAllUsers();
    const container = document.getElementById('community-list');
    container.innerHTML = '';

    if (users.length === 0) {
        container.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1">
                <div class="empty-icon">🌱</div>
                <p>Henüz başka kahraman yok.</p>
            </div>
        `;
        return;
    }

    users.forEach((u, i) => {
        const card = document.createElement('div');
        card.className = 'community-card anim-fade-up';
        card.style.animationDelay = `${i * 0.08}s`;
        card.innerHTML = `
        <div class="cc-avatar" style="background:${u.avatarBg}">${u.avatar}</div>
            <div class="cc-name">${u.displayName}</div>
            <div class="cc-username">@${u.username}</div>
            <div class="cc-age">${calculateAge(u.birthDate)} Yaş</div>
    `;
        card.onclick = () => showProfileDetail(u.id);
        container.appendChild(card);
    });
}

// ─── RENDER: PROFILE DETAIL ────────────────────────────
function showProfileDetail(userId) {
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return;

    document.getElementById('detail-avatar').textContent = user.avatar;
    document.getElementById('detail-avatar').style.background = user.avatarBg;
    document.getElementById('detail-displayname').textContent = user.displayName;
    document.getElementById('detail-username').textContent = '@' + user.username;
    document.getElementById('detail-bio').textContent = user.bio || '';
    const age = calculateAge(user.birthDate);
    document.getElementById('detail-stars').textContent = user.stars || 0;
    document.getElementById('detail-age-group').textContent = age + ' Yaş';
    document.getElementById('detail-about').textContent = user.bio || 'Bu kahraman henüz bir şey yazmamış.';

    navigateTo('profile-detail');
}

// ─── RENDER: ACADEMY (FAZ 3) ──────────────────────────
let academyState = { currentMission: null, solvedCount: 0 };

function renderAcademyScreen() {
    const user = getActiveUser();
    if (!user) return;
    const sEl = document.getElementById('academy-stars');
    if (sEl) sEl.textContent = user.stars || 0;

    const today = new Date().toISOString().split('T')[0];
    if (user.lastAcademyDay === today) {
        const container = document.getElementById('game-container');
        if (container) {
            container.innerHTML = `
        <div class="text-center">
                    <h3>Harika iş çıkardın! 🌟</h3>
                    <p>Bugünkü süper yakıtını aldın. Yarın yeni eğitimler için bekliyoruz!</p>
                </div>
        `;
        }
    }
}

function startDailyMission() {
    const mission = academyMissions[Math.floor(Math.random() * academyMissions.length)];
    academyState.currentMission = mission;
    academyState.solvedCount = 0;

    const container = document.getElementById('game-container');
    if (!container) return;
    container.innerHTML = `<h4>${mission.title}</h4> <p>${mission.description}</p>`;

    if (mission.type === 'match') renderMatchGame(mission, container);
    if (mission.type === 'fill') renderFillGame(mission, container);
}

function renderMatchGame(mission, container) {
    const grid = document.createElement('div');
    grid.className = 'match-grid';
    const shuffledItems = [...mission.pairs].sort(() => Math.random() - 0.5);
    const shuffledPowers = [...mission.pairs].sort(() => Math.random() - 0.5);
    container.appendChild(grid);
    let selectedItem = null;
    shuffledItems.forEach(p => {
        const div = document.createElement('div');
        div.className = 'match-item';
        div.textContent = p.item;
        div.onclick = () => {
            document.querySelectorAll('.match-item').forEach(i => i.style.borderColor = '#ddd');
            div.style.borderColor = 'var(--primary)';
            selectedItem = p;
        };
        grid.appendChild(div);
    });
    shuffledPowers.forEach(p => {
        const div = document.createElement('div');
        div.className = 'match-target';
        div.textContent = p.power;
        div.onclick = () => {
            if (selectedItem && selectedItem.power === p.power) {
                div.style.background = 'var(--success)';
                div.style.color = '#fff';
                div.textContent = '✅';
                div.onclick = null;
                academyState.solvedCount++;
                if (academyState.solvedCount === mission.pairs.length) completeAcademyMission();
            } else {
                showToast('Tekrar dene kahraman!', 'info');
            }
        };
        grid.appendChild(div);
    });
}

function renderFillGame(mission, container) {
    let html = mission.text;
    Object.keys(mission.options).forEach(key => {
        let select = `<select class="inline-select" onchange="checkFill(this, '${key}')">
        <option value="">Seç...</option>
            ${mission.options[key].map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>`;
        html = html.replace(`[${key}]`, select);
    });
    const div = document.createElement('div');
    div.className = 'fill-text';
    div.innerHTML = html;
    container.appendChild(div);
}

function checkFill(select, key) {
    if (select.value === academyState.currentMission.correct[key]) {
        select.style.borderColor = 'var(--success)';
        select.disabled = true;
        academyState.solvedCount++;
        if (academyState.solvedCount === Object.keys(academyState.currentMission.correct).length) {
            completeAcademyMission();
        }
    }
}

function completeAcademyMission() {
    const user = getActiveUser();
    user.stars += 5;
    user.xp += 50;
    user.lastAcademyDay = new Date().toISOString().split('T')[0];
    updateUser(user);
    const dialog = hospitalDialogs.launch[Math.floor(Math.random() * hospitalDialogs.launch.length)];
    const docDial = document.getElementById('doctor-dialog');
    if (docDial) docDial.textContent = dialog;
    const reward = document.getElementById('academy-reward');
    if (reward) reward.classList.remove('hidden');
}

function launchHero() {
    document.getElementById('academy-reward').classList.add('hidden');
    navigateTo('home');
    setTimeout(() => {
        const hero = document.getElementById('main-hero');
        if (hero) {
            hero.classList.add('launching');
            showToast('MAGERA EVİNDEN SÜPER UÇUŞ! 🚀', 'success');
            setTimeout(() => {
                hero.classList.remove('launching');
                renderHome();
            }, 1200);
        }
    }, 100);
}

// ─── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const activeUser = getActiveUser();
    if (activeUser) {
        navigateTo('home');
    } else {
        navigateTo('login');
    }
});
