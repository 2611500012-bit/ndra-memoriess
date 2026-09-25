const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const seek = document.getElementById('seek');
const currentTimeLabel = document.getElementById('currentTime');
const durationLabel = document.getElementById('duration');
const muteButton = document.getElementById('muteButton');
const record = document.querySelector('.record');
const notice = document.getElementById('audioNotice');

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

playButton.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      notice.textContent = 'Audio sedang diputar.';
    } catch {
      notice.textContent = 'Audio belum tersedia. Pastikan file lagu ada dan path sumber audio sudah benar.';
    }
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playIcon.textContent = 'Ⅱ';
  playButton.setAttribute('aria-label', 'Jeda');
  record.classList.add('playing');
});
audio.addEventListener('pause', () => {
  playIcon.textContent = '▶';
  playButton.setAttribute('aria-label', 'Putar');
  record.classList.remove('playing');
});
audio.addEventListener('loadedmetadata', () => durationLabel.textContent = formatTime(audio.duration));
audio.addEventListener('timeupdate', () => {
  currentTimeLabel.textContent = formatTime(audio.currentTime);
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    const progress = audio.currentTime / audio.duration * 100;
    seek.value = progress;
    seek.style.setProperty('--progress', progress + '%');
  }
});
audio.addEventListener('error', () => {
  notice.textContent = 'Audio tidak dapat dimuat. Tambahkan file lagu Anda lalu sesuaikan path source di index.html.';
});
seek.addEventListener('input', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = seek.value / 100 * audio.duration;
});
muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? '×' : '♫';
  muteButton.setAttribute('aria-label', audio.muted ? 'Nyalakan suara' : 'Bisukan suara');
});

