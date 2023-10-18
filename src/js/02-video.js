import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo('vimeo-player');

function saveCurrentTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}


function restoreCurrentTime() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    vimeoPlayer.setCurrentTime(currentTime).then(() => {
      console.log('Video time restored:', currentTime);
    });
  }
}

const updateCurrentTime = throttle((data) => {
  saveCurrentTime(data.seconds);
}, 1000);

vimeoPlayer.on('timeupdate', updateCurrentTime);
vimeoPlayer.ready().then(restoreCurrentTime); 
