// Open Gift Box
function openGift() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    
    introScreen.style.transition = 'opacity 0.8s ease';
    introScreen.style.opacity = '0';
    
    setTimeout(() => {
        introScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        initAudio();
    }, 800);
}

// Web Audio API Ambient Synthesizer
let audioCtx;
let isPlaying = false;
let timerId = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playGuitarChord() {
    if (!audioCtx) return;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C Major Melodic Notes
    notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.15);
        
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.15 + 2.5);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + i * 0.15);
        osc.stop(audioCtx.currentTime + i * 0.15 + 2.5);
    });
}

function toggleMusic() {
    initAudio();
    const btn = document.getElementById('music-toggle');
    
    if (!isPlaying) {
        isPlaying = true;
        btn.innerText = '⏸ Pause Music';
        playGuitarChord();
        timerId = setInterval(playGuitarChord, 3500);
    } else {
        isPlaying = false;
        btn.innerText = '🎵 Play Music';
        clearInterval(timerId);
    }
}

// Rose Burst Effect
function bloomRose(event, element) {
    element.style.transform = 'scale(1.5) rotate(15deg)';
    setTimeout(() => {
        element.style.transform = 'scale(1) rotate(0deg)';
    }, 300);

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerText = '💖';
        heart.style.left = (event.clientX + (Math.random() * 60 - 30)) + 'px';
        heart.style.top = (event.clientY + (Math.random() * 60 - 30)) + 'px';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1500);
    }
}
// Handle Reply Form secara Interaktif di Frontend
function handleReply(event) {
    event.preventDefault();
    
    const name = document.getElementById('replyName').value;
    const decision = document.getElementById('replyDecision').value;
    const alertBox = document.getElementById('reply-alert');
    const form = document.getElementById('replyForm');
    
    alertBox.innerText = `Terima kasih ${name}! Pesan kamu ("${decision}") berhasil terkirim ❤️`;
    alertBox.classList.remove('hidden');
    
    form.reset();
}