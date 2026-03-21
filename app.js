// Authentication Tab Switcher logic
const tabs = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Toggle active tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Toggle active forms
        const targetFormId = tab.dataset.tab === 'login' ? 'login-form' : 'register-form';
        forms.forEach(f => {
            if (f.id === targetFormId) {
                f.classList.add('active-form');
            } else {
                f.classList.remove('active-form');
            }
        });
    });
});

// Mock Application User State
const CONSTANTS = {
    USER_KEY: 'losev_farkindalik_user'
};

const screens = {
    auth: document.getElementById('auth-screen'),
    home: document.getElementById('home-screen')
};

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const guestBtn = document.getElementById('guest-btn');

const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');

// Global State for App Engine
let currentUser = null;
let activeModule = null;
let currentQuestionIndex = 0;
let currentHearts = 3;
let selectedOptionIndex = null;
let quizQuestions = [];

const MAX_HEARTS = 3;

// Additional DOM Elements for Engine
screens.quiz = document.getElementById('quiz-screen');
screens.result = document.getElementById('result-screen');

const learningMap = document.getElementById('learning-map');
const streakCount = document.getElementById('streak-count');
const xpCount = document.getElementById('xp-count');

const quizProgress = document.getElementById('quiz-progress');
const heartCount = document.getElementById('heart-count');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const checkAnswerBtn = document.getElementById('check-answer-btn');
const quitQuizBtn = document.getElementById('quit-quiz');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMessage = document.getElementById('feedback-message');
const feedbackNextBtn = document.getElementById('feedback-next-btn');


// Initialization: check memory for existing user
const existingUser = localStorage.getItem(CONSTANTS.USER_KEY);
if (existingUser) {
    currentUser = JSON.parse(existingUser);
    showHome(currentUser.name);
}

// Event Listeners for Forms
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const name = email.split('@')[0];
    initUser(name, email);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    initUser(name, email);
});

guestBtn.addEventListener('click', () => {
    initUser("Misafir Kullanıcı", "guest");
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(CONSTANTS.USER_KEY);
    currentUser = null;
    showAuth();
});

function initUser(name, email) {
    // If it's a completely new init
    currentUser = {
        name,
        email,
        xp: 0,
        streak: 1,
        completed: [],
        lastLogin: new Date().toLocaleDateString()
    };
    saveState();
    showHome(currentUser.name);
}

function saveState() {
    if (currentUser) localStorage.setItem(CONSTANTS.USER_KEY, JSON.stringify(currentUser));
}

function showHome(name) {
    screens.auth.classList.remove('active');
    if (screens.quiz) screens.quiz.classList.remove('active');
    if (screens.result) screens.result.classList.remove('active');
    screens.home.classList.add('active');

    welcomeMessage.textContent = name;
    updateStats();
    renderMap();
}

function showAuth() {
    screens.home.classList.remove('active');
    if (screens.quiz) screens.quiz.classList.remove('active');
    if (screens.result) screens.result.classList.remove('active');
    screens.auth.classList.add('active');

    loginForm.reset();
    registerForm.reset();
}

function updateStats() {
    streakCount.textContent = currentUser.streak;
    xpCount.textContent = currentUser.xp;
}

// Map Rendering Engine
function renderMap() {
    learningMap.innerHTML = '';

    let isPrevCompleted = true; // First module always unlocked

    SEED_DATA.modules.forEach((module, i) => {
        const isCompleted = currentUser.completed.includes(module.id);
        const isLocked = !isCompleted && !isPrevCompleted;

        const node = document.createElement('div');
        node.className = 'module-node';

        const circle = document.createElement('div');
        circle.className = `module-circle ${isLocked ? 'locked' : ''}`;
        circle.textContent = module.icon;

        const label = document.createElement('div');
        label.className = 'module-label';
        label.textContent = module.title;

        node.appendChild(circle);
        node.appendChild(label);

        if (!isLocked) {
            node.addEventListener('click', () => startQuiz(module));
        }

        learningMap.appendChild(node);
        isPrevCompleted = isCompleted;
    });
}

// Quiz Flow
quitQuizBtn.addEventListener('click', () => {
    if (confirm("Görevi bırakmak istiyorsunuz. İlerlemeniz kaybedilecek, emin misiniz?")) {
        showHome(currentUser.name);
    }
});

function startQuiz(module) {
    activeModule = module;
    quizQuestions = module.questions;
    currentQuestionIndex = 0;
    currentHearts = MAX_HEARTS;
    selectedOptionIndex = null;

    heartCount.textContent = currentHearts;
    updateProgress();
    showQuestion();

    // Switch screen
    screens.home.classList.remove('active');
    screens.quiz.classList.add('active');
}

function updateProgress() {
    const pt = (currentQuestionIndex / quizQuestions.length) * 100;
    quizProgress.style.width = `${pt}%`;
}

function showQuestion() {
    selectedOptionIndex = null;
    checkAnswerBtn.disabled = true;
    checkAnswerBtn.textContent = "Kontrol Et";
    optionsContainer.innerHTML = '';

    const q = quizQuestions[currentQuestionIndex];
    questionText.textContent = q.text;

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span class="quiz-opt-num">${idx + 1}</span> <span>${opt.text}</span>`;
        btn.addEventListener('click', () => selectOption(idx, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(index, btnNode) {
    if (document.querySelector('.quiz-option.evaluated')) return; // Prevent double clicks

    document.querySelectorAll('.quiz-option').forEach(b => {
        b.classList.add('evaluated');
        b.classList.remove('selected');
    });

    selectedOptionIndex = index;
    btnNode.classList.add('selected');

    evaluateAnswer(); // Immediately evaluate
}

checkAnswerBtn.addEventListener('click', evaluateAnswer);

function evaluateAnswer() {
    if (selectedOptionIndex === null) return;

    const q = quizQuestions[currentQuestionIndex];
    const opt = q.options[selectedOptionIndex];
    const selectedBtn = document.querySelectorAll('.quiz-option')[selectedOptionIndex];

    feedbackOverlay.classList.remove('hidden', 'correct', 'wrong');
    feedbackOverlay.style.transform = 'translateY(0)';

    const centerPopup = document.getElementById('center-butterfly-popup');
    if (centerPopup) centerPopup.style.display = 'none';

    if (opt.isCorrect) {
        selectedBtn.classList.add('correct-anim');
        feedbackOverlay.classList.add('correct');
        feedbackTitle.textContent = "Doğrulandı ✅";

        // Ortada belirip kaybolan kelebek animasyonu
        if (centerPopup) {
            centerPopup.style.display = 'block';
            centerPopup.classList.remove('popup-anim');
            void centerPopup.offsetWidth; // trigger reflow (animasyonu baştan başlat)
            centerPopup.classList.add('popup-anim');
            setTimeout(() => {
                centerPopup.style.display = 'none';
            }, 1500);
        }
    } else {
        selectedBtn.classList.add('wrong-anim');
        feedbackOverlay.classList.add('wrong');
        feedbackTitle.textContent = "Hatalı Bilgi ❌";
        currentHearts--;

        // Yanlış seçeneğin tekrar eski rengine dönmesi
        setTimeout(() => {
            selectedBtn.classList.remove('wrong-anim');
        }, 1000);
        heartCount.textContent = currentHearts;
    }

    feedbackMessage.textContent = opt.explanation;
}

feedbackNextBtn.addEventListener('click', () => {
    feedbackOverlay.style.transform = 'translateY(100%)';
    setTimeout(() => {
        feedbackOverlay.classList.add('hidden');

        if (currentHearts <= 0) {
            alert("Deneme hakkınız doldu. Bilgilerinizi tazeleyerek bu bölümü tekrar deneyebilirsiniz.");
            showHome(currentUser.name);
            return;
        }

        currentQuestionIndex++;
        updateProgress();

        if (currentQuestionIndex >= quizQuestions.length) {
            finishQuiz();
        } else {
            showQuestion();
        }
    }, 300);
});

function finishQuiz() {
    const xpEarned = 10 + (currentHearts * 5); // Base 10 + 5 per heart
    currentUser.xp += xpEarned;

    if (!currentUser.completed.includes(activeModule.id)) {
        currentUser.completed.push(activeModule.id);
    }

    saveState();

    document.getElementById('earned-xp').textContent = `+${xpEarned}`;
    screens.quiz.classList.remove('active');
    screens.result.classList.add('active');
}

document.getElementById('finish-lesson-btn').addEventListener('click', () => {
    showHome(currentUser.name);
});
