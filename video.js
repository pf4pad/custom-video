const player = document.querySelector('.video-player');
const video = document.querySelector('.movie');
const poster = player.querySelector('.poster');
const controlPanel = document.querySelector('.btn-video');
const buttonPlay = player.querySelector('.btn-video');
const changeBtnPlay = player.querySelector('.play');

const btnVolume = player.querySelector('.btn-volume ');
const buttonFullScr = player.querySelector('.button-full-screen');
const ranges = player.querySelectorAll('.range');
const currTime = player.querySelector('.curr-time');
const durationTime = player.querySelector('.duration-time');
const progressVideo = document.querySelector('.progress-video');
const rangeVolume = document.querySelector('.volume');


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
  } else {
    buttonPlay.classList.remove('visually-hidden');
    buttonPlay.classList.remove('button-pause');
    buttonPlay.classList.add('button-play');
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
buttonPlay.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
btnVolume.addEventListener('click', videoMute);