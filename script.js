// Buka Kado + Play Musik
function openGift() {
    const giftLid = document.getElementById('gift-lid');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');

    // Animasi tutup kado terangkat
    if (giftLid) giftLid.classList.add('open');

    // Putar audio jika file MP3 tersedia
    if (audio) {
        audio.play().catch(err => {
            console.log("Autoplay memerlukan file song.mp3 di folder repo", err);
            playFallbackSynth();
        });
        const btn = document.getElementById('music-toggle');
        if (btn) btn.innerText = '⏸ Pause Music';
    }

    setTimeout(() => {
        introScreen.style.transition = 'opacity 0.8s ease';
        introScreen.style.opacity = '0';
        
        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 800);
    }, 400);
}

// Toggle Play / Pause Audio
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');

    if (audio && audio.src && !audio.paused) {
        audio.pause();
        btn.innerText = '🎵 Play Music';
    } else if (audio && audio.src) {
        audio.play().then(() => {
            btn.innerText = '⏸ Pause Music';
        }).catch(() => {
            playFallbackSynth();
            btn.innerText = '⏸ Pause Music';
        });
    } else {
        playFallbackSynth();
    }
}

// Sound Synthesizer Cadangan jika file song.mp3 belum dimasukkan
let synthInterval = null;
let isSynthPlaying = false;

function playFallbackSynth() {
    const btn = document.getElementById('music-toggle');
    if (isSynthPlaying) {
        clearInterval(synthInterval);
        isSynthPlaying = false;
        if (btn) btn.innerText = '🎵 Play Music';
        return;
    }

    isSynthPlaying = true;
    if (btn) btn.innerText = '⏸ Pause Music';

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playNotes() {
        const notes = [220.00, 277.18, 329.63, 440.00];
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.2);
            
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime + i * 0.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.2 + 2.5);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start(audioCtx.currentTime + i * 0.2);
            osc.stop(audioCtx.currentTime + i * 0.2 + 2.5);
        });
    }

    playNotes();
    synthInterval = setInterval(playNotes, 3800);
}

// Efek Letupan Mawar
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

// Handle Form Balasan
function handleReply(event) {
    event.preventDefault();
    
    const name = document.getElementById('replyName').value;
    const decision = document.getElementById('replyDecision').value;
    const alertBox = document.getElementById('reply-alert');
    const form = document.getElementById('replyForm');
    
    alertBox.innerText = `Terima kasih ${name}! Balasan kamu ("${decision}") berhasil terkirim ❤️`;
    alertBox.classList.remove('hidden');
    
    form.reset();
}