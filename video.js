const player = document.querySelector('.video-player');
const video = document.querySelector('.movie');
const poster = player.querySelector('.poster');
const controlPanel = document.querySelector('.btn-video');
const buttonPlay = player.querySelector('.btn-video');
const changeBtnPlay = player.querySelector('.btn-play');
const btnVolume = player.querySelector('.btn-volume ');
const buttonFullScr = player.querySelector('.button-full-screen');
const ranges = player.querySelectorAll('.range');

const progressVideo = document.querySelector('.progress');
const rangeVolume = document.querySelector('.volume');

let mousedown = false

function togglePlay() {
  if (video.paused)
    video.play();
  else
    video.pause();
}

function updateButton() { // Меняем иконки Play или Pause
  if (!video.paused) {
    buttonPlay.classList.add('visually-hidden');
    buttonPlay.classList.remove('button-play');
    buttonPlay.classList.add('button-pause');
    poster.classList.add('visually-hidden');
    changeBtnPlay.classList.add('pause')
    changeBtnPlay.classList.remove('play')
  } else {
    buttonPlay.classList.remove('visually-hidden');
    buttonPlay.classList.remove('button-pause');
    buttonPlay.classList.add('button-play');
    changeBtnPlay.classList.add('play')
    changeBtnPlay.classList.remove('pause')
  }
}

function videoMute() {
  if (video.volume == 0) {
    video.volume = rangeVolume.value / 100;
    btnVolume.classList.remove('mute');
    btnVolume.classList.add('btn-volume-play');

  } else {
    video.volume = 0;
    btnVolume.classList.add('mute');
    btnVolume.classList.remove('btn-volume-play');
  }
}

// Изменение звука
function volumeUpdate(e) { // Изменяем уровень громкости при использовании range
  let volume = e.offsetX / rangeVolume.offsetWidth;
  volume = Math.floor(volume * 100) / 100;
  if (volume < 0.95)
    volume += 0.05;
  else if (volume >= 0.95)
    volume = 1;
  else if (volume > 0.05)
    volume -= 0.05;
  if (volume <= 0.05)
    volume = 0;
  video.volume = volume;
  rangeVolume.value = volume * 100
  rangeVolume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volume * 100}%, #c8c8c8 ${volume * 100}%, #c8c8c8 100%)`

  if (video.volume == 0) {
    btnVolume.classList.remove('btn-volume-play');
    btnVolume.classList.add('mute');
  } else {
    btnVolume.classList.remove('mute');
    btnVolume.classList.add('btn-volume-play');
  }
}


// Отображаем время воспроизведения
function videoProgress() {
  progress = ((Math.floor(video.currentTime) / Math.floor(video.duration)) * 100);
  progressVideo.value = progress;
  progressVideo.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress}%, #c8c8c8 ${progress}%, #c8c8c8 100%)`
}
buttonPlay.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
changeBtnPlay.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
changeBtnPlay.addEventListener('pause', updateButton);
changeBtnPlay.addEventListener('play', updateButton);
btnVolume.addEventListener('click', videoMute);
rangeVolume.addEventListener('click', volumeUpdate);
rangeVolume.addEventListener('mousemove', (e) => mousedown && volumeUpdate(e));
rangeVolume.addEventListener('mousedown', () => mousedown = true);
rangeVolume.addEventListener('mouseup', () => mousedown = false);
video.addEventListener('timeupdate', videoProgress);