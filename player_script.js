// 播放器脚本

// 移除欢迎界面，直接初始化播放器
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayer);
} else {
  initPlayer();
}

// 音乐库
const songs = [
  { title: '不称职的天才', artist: '王以太', src: encodeURIComponent('genius.mp3'), cover: 'album2.svg' },
  { title: '焦虑', artist: 'Asen', src: encodeURIComponent('anxiety.mp3'), cover: 'album1.svg' },
  { title: 'Chillin‘', artist: 'PO8', src: encodeURIComponent('PO8 - Chillin‘.mp3'), cover: 'album9.svg' },
  { title: 'Julie', artist: 'THOME', src: encodeURIComponent('THOME - Julie.mp3'), cover: 'album14.svg' },
  // 添加七首新歌曲
  { title: 'Most Wanted', artist: 'V.O.B/ASEN', src: encodeURIComponent('V.O.B,Green Soldier,艾志恒Asen - Most Wanted.mp3'), cover: 'album16.svg' },
  { title: 'Shape of You', artist: 'Ed Sheeran', src: encodeURIComponent('Ed Sheeran - Shape of You.mp3'), cover: 'album17.svg' },
  { title: '诗人说梦', artist: 'PO8', src: encodeURIComponent('PO8 - 诗人说梦.mp3'), cover: 'album12.svg' },
  { title: '1 AM', artist: 'THOME', src: encodeURIComponent('THOME - 1 AM.mp3'), cover: 'album7.svg' },
  { title: 'Holy Water', artist: '马伯骞Victor Ma/ATM Hanson/GALI/李玖哲', src: encodeURIComponent('马伯骞Victor Ma,ATM Hanson,GALI - HOLY WATER.mp3'), cover: 'album10.svg' },
  { title: '给奶奶的信', artist: 'Asen', src: encodeURIComponent('艾志恒Asen,付思遥 - 给奶奶的信.mp3'), cover: 'album6.svg' },
  { title: 'CYBERPUNK2021', artist: '邓典果DDG', src: encodeURIComponent('邓典果DDG - CYBERPUNK 2021.mp3'), cover: 'album3.svg' }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffleMode = false; // 随机播放模式标志
let playedSongs = []; // 存储已播放的歌曲索引
let audioCache = {}; // 音频缓存对象
let isLoading = false; // 加载状态标志

// 声明全局变量
let audioPlayer;
let footerPlayBtn;
let progressBar;
let currentTime;
let duration;
let songTitle;
let artistName;
let footerSongTitle;
let footerArtistName;
let volumeBtn;
let volumeSlider;
const loadingIndicator = document.createElement('div'); // 加载指示器
loadingIndicator.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full z-50 hidden';
loadingIndicator.textContent = '加载中...';
document.body.appendChild(loadingIndicator);

// 获取DOM元素函数
function getDOMElements() {
  audioPlayer = document.getElementById('audioPlayer');
  footerPlayBtn = document.getElementById('footerPlayBtn');
  progressBar = document.getElementById('progressBar');
  currentTime = document.getElementById('currentTime');
  duration = document.getElementById('duration');
  songTitle = document.getElementById('songTitle');
  artistName = document.getElementById('artistName');
  footerSongTitle = document.getElementById('footerSongTitle');
  footerArtistName = document.getElementById('footerArtistName');
  volumeBtn = document.getElementById('volumeBtn');
  volumeSlider = document.getElementById('volumeSlider');

  // 打印获取结果进行调试
  console.log('音频播放器元素:', audioPlayer);
  console.log('播放按钮元素:', footerPlayBtn);
}

// 初始化播放第一首歌
function initPlayer() {
  // 获取DOM元素
  getDOMElements();

  if (!audioPlayer) {
    console.error('音频播放器未找到');
    return;
  }
  
  // 移除欢迎界面
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen) {
    console.log('找到欢迎界面，设置自动移除');
    
    function removeWelcomeScreen() {
      console.log('移除欢迎界面');
      welcomeScreen.style.opacity = '0';
      setTimeout(() => {
        welcomeScreen.style.display = 'none';
        // 移除自动播放，改为提示用户手动播放
        console.log('欢迎界面已移除，请点击播放按钮开始播放音乐');
      }, 500);
    }
    
    // 3秒后自动移除欢迎界面
    setTimeout(removeWelcomeScreen, 3000);
    
    // 同时保留点击移除功能
    document.addEventListener('click', removeWelcomeScreen);
    document.addEventListener('touchstart', removeWelcomeScreen);
  } else {
    console.error('未找到欢迎界面元素');
    // 移除自动播放
    console.log('请点击播放按钮开始播放音乐');
  }
  
  loadSong(songs[currentSongIndex]);
  setupAudioSource();
  // 预加载下一首歌曲
  preloadNextSong();
}



// 预加载音频文件
function preloadAudio(song) {
  if (audioCache[song.src]) {
    // 已经缓存，直接返回
    return Promise.resolve(audioCache[song.src]);
  }

  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = song.src;
    audio.preload = 'auto';
    audio.load();

    audio.onloadeddata = () => {
      audioCache[song.src] = audio;
      resolve(audio);
    };

    audio.onerror = (error) => {
      console.error('音频加载失败:', error);
      reject(error);
    };
  });
}

// 预加载下一首歌曲
function preloadNextSong() {
  let nextIndex;
  if (isShuffleMode) {
    // 随机播放模式下，获取下一首随机歌曲
    if (playedSongs.length >= songs.length) {
      playedSongs = [currentSongIndex];
    }
    do {
      nextIndex = Math.floor(Math.random() * songs.length);
    } while (playedSongs.includes(nextIndex));
  } else {
    // 顺序播放模式
    nextIndex = (currentSongIndex + 1) % songs.length;
  }

  const upcomingSong = songs[nextIndex];
  if (!audioCache[upcomingSong.src]) {
    console.log(`预加载下一首歌曲: ${upcomingSong.title}`);
    preloadAudio(upcomingSong).catch(err => {
      console.error('预加载下一首歌曲失败:', err);
    });
  }
}

// 加载歌曲 - 优化版（使用缓存）
function loadSong(song) {
  if (!song || !audioPlayer) {
    console.error('歌曲对象或音频播放器不存在');
    return;
  }

  isLoading = true;
  loadingIndicator.classList.remove('hidden');

  // 先暂停当前播放
  audioPlayer.pause();

  // 更新歌曲UI
  updateSongUI(song);

  // 使用缓存的音频或加载新音频
  preloadAudio(song)
    .then(() => {
      // 音频加载完成
      console.log('音频可以播放了');
      audioPlayer.src = song.src;
      audioPlayer.currentTime = 0;
      isLoading = false;
      loadingIndicator.classList.add('hidden');

      // 添加事件监听器以获取更多调试信息
      audioPlayer.addEventListener('loadedmetadata', function onLoadedMetadata() {
        console.log('音频元数据已加载');
        console.log('音频时长:', audioPlayer.duration);
        audioPlayer.removeEventListener('loadedmetadata', onLoadedMetadata);
      });

      audioPlayer.addEventListener('loadeddata', function onLoadedData() {
        console.log('音频数据已加载');
        audioPlayer.removeEventListener('loadeddata', onLoadedData);
      });

      audioPlayer.addEventListener('progress', function onProgress() {
        console.log('音频加载进度更新');
        if (audioPlayer.buffered.length > 0) {
          const bufferedPercent = (audioPlayer.buffered.end(0) / audioPlayer.duration) * 100;
          console.log(`已缓冲百分比: ${bufferedPercent.toFixed(2)}%`);
        }
      });

      // 如果当前是播放状态，则继续播放
      if (isPlaying) {
        audioPlayer.play().catch(error => {
          console.error('自动播放失败:', error);
          // 如果自动播放失败，设置为暂停状态
          isPlaying = false;
        });
      }
    })
    .catch(error => {
      console.error('音频加载失败:', error);
      isLoading = false;
      loadingIndicator.classList.add('hidden');
    });

  // 预加载下一首歌曲
  preloadNextSong();
}

// 切换随机播放模式
function toggleShuffleMode() {
  isShuffleMode = !isShuffleMode;
  // 更新所有随机播放图标样式
  const shuffleIcons = document.querySelectorAll('.fa-random');
  shuffleIcons.forEach(icon => {
    if (isShuffleMode) {
      icon.classList.add('text-accent'); // 添加高亮样式
      playedSongs = [currentSongIndex]; // 初始化已播放列表
      // 如果当前没有播放，则自动播放随机歌曲
      if (!isPlaying) {
        nextSong();
      }
    } else {
      icon.classList.remove('text-accent'); // 移除高亮样式
      playedSongs = []; // 清空已播放列表
    }
  });
  console.log(`随机播放模式: ${isShuffleMode ? '开启' : '关闭'}`);
}

// 下一首
function nextSong() {
  if (isShuffleMode) {
    // 如果所有歌曲都已播放，则重置已播放列表
    if (playedSongs.length >= songs.length) {
      playedSongs = [currentSongIndex];
    }
    
    // 随机选择一首未播放的歌曲
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (playedSongs.includes(randomIndex));
    
    currentSongIndex = randomIndex;
    playedSongs.push(currentSongIndex);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(songs[currentSongIndex]);
  // 预加载下一首歌曲
  preloadNextSong();
  // 如果当前是播放状态，则继续播放
  if (isPlaying) {
    setTimeout(() => {
      playSong();
    }, 500);
  }
  // 更新导航封面
  updateNavigationCovers();
}
// 暴露nextSong函数到window对象
window.nextSong = nextSong;

// 上一首
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  // 预加载上一首歌曲
  preloadNextSong();
  // 如果当前是播放状态，则继续播放
  if (isPlaying) {
    setTimeout(() => {
      playSong();
    }, 500);
  }
  // 更新导航封面
  updateNavigationCovers();
}
// 暴露prevSong函数到window对象
window.prevSong = prevSong;

// 更新导航专辑封面
function updateNavigationCovers() {
  // 获取左右专辑封面元素
  const prevAlbumCover = document.getElementById('prevAlbumCover');
  const nextAlbumCover = document.getElementById('nextAlbumCover');
  // 尝试多种选择器获取当前专辑封面
  let currentAlbumCover = document.querySelector('.current-album-cover');
  if(!currentAlbumCover) {
    currentAlbumCover = document.querySelector('.album-cover-container');
  }
  if(!currentAlbumCover) {
    currentAlbumCover = document.querySelector('#currentAlbumCover');
  }

  // 计算上一首和下一首歌曲的索引
  const prevSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  const nextSongIndex = (currentSongIndex + 1) % songs.length;

  // 获取上一首和下一首歌曲
  const prevSong = songs[prevSongIndex];
  const nextSong = songs[nextSongIndex];
  const currentSong = songs[currentSongIndex];

  // 更新上一首歌曲封面
  if (prevAlbumCover) {
    const prevCoverImg = prevAlbumCover.querySelector('img');
    const prevCoverTitle = prevAlbumCover.querySelector('div');
    if (prevCoverImg) {
      prevCoverImg.src = prevSong.cover || getDefaultCover(prevSong.title);
    }
    if (prevCoverTitle) {
      prevCoverTitle.textContent = prevSong.title;
    }
  }

  // 更新下一首歌曲封面
  if (nextAlbumCover) {
    const nextCoverImg = nextAlbumCover.querySelector('img');
    const nextCoverTitle = nextAlbumCover.querySelector('div');
    if (nextCoverImg) {
      nextCoverImg.src = nextSong.cover || getDefaultCover(nextSong.title);
    }
    if (nextCoverTitle) {
      nextCoverTitle.textContent = nextSong.title;
    }
  }

  // 更新当前专辑封面标题
  if (currentAlbumCover) {
    const currentCoverTitle = currentAlbumCover.querySelector('div');
    if (currentCoverTitle) {
      currentCoverTitle.textContent = currentSong.title;
    } else {
      // 如果找不到标题元素，尝试直接在封面元素上添加
      currentAlbumCover.setAttribute('data-title', currentSong.title);
    }
  }

  // 确保当前播放歌曲信息显示正确
  if (songTitle) {
    songTitle.textContent = currentSong.title;
  }
  if (artistName) {
    artistName.textContent = currentSong.artist;
  }
}

// 获取默认封面
function getDefaultCover(title) {
  if (title.includes('不称职的天才')) {
    return 'album2.svg';
  } else if (title.includes('焦虑')) {
    return 'album1.svg';
  } else if (title.includes('Chillin')) {
    return 'album9.svg';
  } else if (title.includes('Julie')) {
    return 'album14.svg';
  } else {
    return 'default_cover.svg';
  }
}

// 初始化音量控制
function setupVolumeControl() {
  // 设置初始音量
  audioPlayer.volume = volumeSlider.value;

  // 更新音量图标
  function updateVolumeIcon() {
    if (audioPlayer.volume === 0) {
      volumeBtn.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
    } else if (audioPlayer.volume < 0.5) {
      volumeBtn.innerHTML = '<i class="fa fa-volume-down" aria-hidden="true"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
    }
  }

  // 监听音量滑块变化
  volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value;
    updateVolumeIcon();
  });

  // 静音/取消静音切换
  volumeBtn.addEventListener('click', function() {
    if (audioPlayer.volume > 0) {
      // 保存当前音量并静音
      volumeSlider.value = 0;
      audioPlayer.volume = 0;
    } else {
      // 恢复之前的音量
      volumeSlider.value = 0.7;
      audioPlayer.volume = 0.7;
    }
    updateVolumeIcon();
  });
}

// 设置音频源和事件监听
function setupAudioSource() {
  console.log('设置音频源和事件监听...');

  // 添加音频事件监听
  audioPlayer.addEventListener('play', function() {
    console.log('音频开始播放');
    isPlaying = true;
    footerPlayBtn.innerHTML = '<i class="fa fa-pause text-3xl" aria-hidden="true"></i>';
    footerPlayBtn.classList.remove('text-accent');
    footerPlayBtn.classList.add('text-gray-400');
  });

  audioPlayer.addEventListener('pause', function() {
    console.log('音频已暂停');
    isPlaying = false;
    footerPlayBtn.innerHTML = '<i class="fa fa-play text-3xl" aria-hidden="true"></i>';
    footerPlayBtn.classList.add('text-accent');
    footerPlayBtn.classList.remove('text-gray-400');
  });

  audioPlayer.addEventListener('ended', function() {
    console.log('音频播放结束');
    isPlaying = false;
    footerPlayBtn.innerHTML = '<i class="fa fa-play text-3xl" aria-hidden="true"></i>';
    footerPlayBtn.classList.add('text-accent');
    footerPlayBtn.classList.remove('text-gray-400');
    // 播放下一首歌曲
    nextSong();
  });

  // 添加事件监听器
  if(footerPlayBtn) {
    footerPlayBtn.addEventListener('click', togglePlay);
    console.log('播放按钮事件已绑定');
  } else {
    console.error('无法找到播放按钮');
  }
  
  // 为随机播放图标添加点击事件
  const shuffleIcons = document.querySelectorAll('.fa-random');
  shuffleIcons.forEach(icon => {
    // 确保图标所在元素可点击
    let clickableElement = icon.closest('div') || icon.parentElement;
    
    clickableElement.style.cursor = 'pointer';
    clickableElement.addEventListener('click', toggleShuffleMode);
  });

  // 简化按钮选择逻辑 - 直接选择包含特定图标的按钮
  // 下一首按钮
  let nextBtn = document.querySelector('button:has(.fa-step-forward)');
  if(nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSong();
    });
    console.log('下一首按钮事件已绑定');
  } else {
    console.error('无法找到下一首按钮');
  }

  // 上一首按钮
  let prevBtn = document.querySelector('button:has(.fa-step-backward)');
  if(prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSong();
    });
    console.log('上一首按钮事件已绑定');
  } else {
    console.error('无法找到上一首按钮');
  }

  // 备用方案 - 如果:has选择器不支持
  if(!nextBtn) {
    nextBtn = document.querySelector('.fa-step-forward').parentElement;
    if(nextBtn && nextBtn.tagName === 'BUTTON') {
      nextBtn.addEventListener('click', function() {
        nextSong();
      });
      console.log('备用下一首按钮事件已绑定');
    }
  }

  if(!prevBtn) {
    prevBtn = document.querySelector('.fa-step-backward').parentElement;
    if(prevBtn && prevBtn.tagName === 'BUTTON') {
      prevBtn.addEventListener('click', function() {
        prevSong();
      });
      console.log('备用上一首按钮事件已绑定');
    }
  }

  console.log('音频事件监听设置完成');
}

// 切换播放/暂停
function togglePlay() {
  // 强制与音频播放器状态同步
  if (audioPlayer) {
    // 先检查按钮当前图标状态
    const isButtonPlay = footerPlayBtn.innerHTML.includes('fa-play');
    
    // 如果按钮显示播放图标，但音频正在播放，则同步状态
    if (isButtonPlay && !audioPlayer.paused) {
      console.log('按钮状态与音频播放状态不同步，强制更新按钮状态');
      isPlaying = true;
      footerPlayBtn.innerHTML = '<i class="fa fa-pause text-3xl" aria-hidden="true"></i>';
      footerPlayBtn.classList.remove('text-accent');
      footerPlayBtn.classList.add('text-gray-400');
      return;
    }
    
    // 正常切换逻辑
    if (!audioPlayer.paused) {
      pauseSong();
    } else {
      playSong();
    }
  } else {
    console.error('音频播放器未初始化');
  }
}

// 播放歌曲
function playSong() {
  console.log('尝试播放歌曲...');
  if (isLoading) {
    console.log('播放取消: 歌曲正在加载中');
    return; // 如果正在加载，不执行播放
  }

  if (!audioPlayer) {
    console.error('无法播放: 音频播放器未初始化');
    return;
  }

  if (currentSongIndex === -1 || !songs[currentSongIndex]) {
    console.error('无法播放: 当前歌曲索引无效');
    return;
  }

  console.log('当前歌曲索引:', currentSongIndex);
  console.log('当前歌曲:', songs[currentSongIndex].title);
  console.log('音频文件路径:', songs[currentSongIndex].src);

  // 确保播放前暂停所有音频
  if (!audioPlayer.paused) {
    audioPlayer.pause();
  }

  // 先设置为播放中状态
  isPlaying = true;
  footerPlayBtn.innerHTML = '<i class="fa fa-pause text-3xl" aria-hidden="true"></i>';
  footerPlayBtn.classList.remove('text-accent');
  footerPlayBtn.classList.add('text-gray-400');
  
  console.log('调用audioPlayer.play()');
  audioPlayer.play().then(() => {
    console.log('播放成功');
    // 播放成功后确认状态
    isPlaying = true;
    footerPlayBtn.innerHTML = '<i class="fa fa-pause text-3xl" aria-hidden="true"></i>';
    footerPlayBtn.classList.remove('text-accent');
    footerPlayBtn.classList.add('text-gray-400');

    // 添加播放状态监听器
    audioPlayer.addEventListener('play', function onPlay() {
      isPlaying = true;
      footerPlayBtn.innerHTML = '<i class="fa fa-pause text-3xl" aria-hidden="true"></i>';
      footerPlayBtn.classList.remove('text-accent');
      footerPlayBtn.classList.add('text-gray-400');
      audioPlayer.removeEventListener('play', onPlay);
    });

    // 添加暂停状态监听器
    audioPlayer.addEventListener('pause', function onPause() {
      isPlaying = false;
      footerPlayBtn.innerHTML = '<i class="fa fa-play text-3xl" aria-hidden="true"></i>';
      footerPlayBtn.classList.add('text-accent');
      footerPlayBtn.classList.remove('text-gray-400');
      audioPlayer.removeEventListener('pause', onPause);
    });
  }).catch(error => {
    console.error('播放失败:', error);
    // 播放失败时重置状态
    isPlaying = false;
    footerPlayBtn.innerHTML = '<i class="fa fa-play text-3xl" aria-hidden="true"></i>';
    footerPlayBtn.classList.add('text-accent');
    footerPlayBtn.classList.remove('text-gray-400');
    // 显示错误信息
    loadingIndicator.textContent = '播放失败，请重试';
    loadingIndicator.classList.remove('hidden');
    setTimeout(() => {
      loadingIndicator.classList.add('hidden');
    }, 2000);
  });
}

// 暂停歌曲
function pauseSong() {
  console.log('尝试暂停歌曲...');
  
  if (audioPlayer) {
    // 先暂停音频
    audioPlayer.pause();
    console.log('歌曲已暂停');
  } else {
    console.error('无法暂停: 音频播放器未初始化');
  }
  
  // 确保音频暂停后再更新状态
  setTimeout(() => {
    isPlaying = false;
    footerPlayBtn.innerHTML = '<i class="fa fa-play text-3xl" aria-hidden="true"></i>';
    // 添加按钮样式更新
    footerPlayBtn.classList.add('text-accent');
    footerPlayBtn.classList.remove('text-gray-400');
  }, 100);
}

// 更新歌曲UI
function updateSongUI(song) {
  // 更新歌曲信息
  if (songTitle) {
    songTitle.textContent = song.title;
  }
  
  if (artistName) {
    artistName.textContent = song.artist;
  }
  
  if (footerSongTitle) {
    footerSongTitle.textContent = song.title;
  }
  
  if (footerArtistName) {
    footerArtistName.textContent = song.artist;
  }
  // 更新专辑封面
  const currentAlbumCover = document.getElementById('currentAlbumCover');
  const footerCover = document.getElementById('footerAlbumCover');
  
  if (currentAlbumCover && currentAlbumCover.querySelector('img')) {
    if (song.cover) {
      currentAlbumCover.querySelector('img').src = song.cover;
    } else {
      // 根据歌曲标题选择不同的封面
      currentAlbumCover.querySelector('img').src = getDefaultCover(song.title);
    }
  }

  // 更新左右专辑封面
  updateNavigationCovers();
  
  if (footerCover) {
    if (song.cover) {
      footerCover.src = song.cover;
    } else {
      footerCover.src = getDefaultCover(song.title);
    }
  }
  // 加载歌词
  if (window.lyricsDisplay) {
    window.lyricsDisplay.loadLyrics(song.title);
  }
  
  // 确保只设置一次进度条功能
  if (typeof progressBarSetupDone === 'undefined') {
    setupProgressBar();
    progressBarSetupDone = true;
  }
  
  // 当音频元数据加载完成后更新持续时间
  audioPlayer.onloadedmetadata = function() {
    const minutes = Math.floor(audioPlayer.duration / 60);
    const seconds = Math.floor(audioPlayer.duration % 60);
    if (duration) {
      duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };
  
  // 更新导航封面
  updateNavigationCovers();
  
  console.log('加载歌曲完成');
  console.log('----------------------------------------');
}

// 自动播放修复
function setupAutoPlayFix() {
  // 显示播放提示
  const playPrompt = document.createElement('div');
  playPrompt.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl';
  playPrompt.innerHTML = `
    <div class="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl max-w-xs">
      <i class="fa fa-music text-4xl mb-4 text-white"></i>
      <h3 class="text-xl font-bold mb-2 text-white">点击任意位置开始播放</h3>
      <p class="text-white/70 mb-6">左滑可切换到《焦虑》</p>
    </div>
  `;
  document.body.appendChild(playPrompt);

  // 点击页面任意位置后播放音乐并隐藏提示
  function handleUserInteraction() {
    playSong();
    playPrompt.remove();
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);
  }

  document.addEventListener('click', handleUserInteraction);
  document.addEventListener('touchstart', handleUserInteraction);
}

// 滑动切换歌曲功能
function setupSwipeNavigation() {
  console.log('初始化滑动导航功能');
  let startX = 0;
  let isDragging = false;

  function handleStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    console.log(`开始拖动，起始位置: ${startX}`);
  }

  function handleMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diffX = currentX - startX;
    const threshold = 50; // 触发滑动的阈值

    // 添加拖动时的视觉反馈
    if (Math.abs(diffX) > 10) {
      document.body.classList.add('opacity-80');
      if (diffX < 0) {
        document.body.classList.add('translate-x-[-5px]');
        document.body.classList.remove('translate-x-[5px]');
      } else {
        document.body.classList.add('translate-x-[5px]');
        document.body.classList.remove('translate-x-[-5px]');
      }
    }
  }

  function handleEnd(e) {
    if (!isDragging) return;
    const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    const diffX = endX - startX;
    const threshold = 50; // 触发滑动的阈值

    if (diffX < -threshold) {
      // 左滑 - 下一首歌
      nextSong();
      // 添加视觉反馈，持续5秒
      document.body.classList.add('opacity-70', 'translate-x-[-10px]', 'transition-all', 'duration-500');
      setTimeout(() => {
        document.body.classList.remove('opacity-70', 'translate-x-[-10px]');
      }, 5000);
    } else if (diffX > threshold) {
      // 右滑 - 上一首歌
      prevSong();
      // 添加视觉反馈，持续5秒
      document.body.classList.add('opacity-70', 'translate-x-[10px]', 'transition-all', 'duration-500');
      setTimeout(() => {
        document.body.classList.remove('opacity-70', 'translate-x-[10px]');
      }, 5000);
    }

    // 移除拖动时的视觉反馈
    document.body.classList.remove('opacity-80', 'translate-x-[-5px]', 'translate-x-[5px]');

    isDragging = false;
  }

  // 添加事件监听器
  document.addEventListener('touchstart', handleStart, { passive: true });
  document.addEventListener('touchmove', handleMove, { passive: true });
  document.addEventListener('touchend', handleEnd, { passive: true });
  document.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('mouseleave', handleEnd);
}

// 进度条功能实现 - 优化版
function setupProgressBar() {
  // 获取DOM元素
  const progressBar = document.getElementById('progressBar');
  const progressContainer = progressBar ? progressBar.parentElement : null;
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');
  const progressHandle = document.getElementById('progressHandle');

  // 验证DOM元素
  if (!progressContainer || !progressBar || !progressHandle) {
    console.error('无法找到进度条元素');
    return;
  }

  // 更新进度条和时间显示
  function updateProgress() {
    if (audioPlayer && !isNaN(audioPlayer.duration)) {
      const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${percent}%`;
      progressHandle.style.left = `${percent - 1}%`; // 调整手柄位置使其居中

      // 更新时间显示
      const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
      const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
      currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    }
  }

  // 设置音频元数据加载完成后的处理
  audioPlayer.addEventListener('loadedmetadata', function() {
    const minutes = Math.floor(audioPlayer.duration / 60);
    const seconds = Math.floor(audioPlayer.duration % 60);
    durationDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    updateProgress();
  });

  // 监听timeupdate事件更新进度
  audioPlayer.addEventListener('timeupdate', updateProgress);

  // 监听音频跳转事件
  audioPlayer.addEventListener('seeked', function() {
    // 手动更新进度条以确保同步
    updateProgress();
  });

  // 点击进度条跳转
  progressContainer.addEventListener('click', function(e) {
    e.preventDefault();

    if (!audioPlayer) {
      return;
    }

    // 检查音频状态
    if (audioPlayer.readyState < 2) {
      return;
    }

    // 计算点击位置
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // 确保点击位置有效
    if (clickX < 0 || clickX > width) {
      return;
    }

    // 计算跳转时间
    const seekTime = (clickX / width) * audioPlayer.duration;

    // 尝试设置.currentTime
    try {
      // 设置新时间
      audioPlayer.currentTime = seekTime;
    } catch (e) {
    }
  });
}

// 初始化播放器相关功能
function initPlayerScript() {
  setupVolumeControl();
  setupSwipeNavigation();
  // setupAutoPlayFix(); // 禁用自动播放修复，避免全屏提示界面
  
  // 添加调试日志
  console.log('播放器初始化完成');
  console.log('当前歌曲:', songs[currentSongIndex].title);
  console.log('音频文件路径:', songs[currentSongIndex].src);
  
  // 检查音频文件是否存在
  fetch(songs[currentSongIndex].src)
      .then(response => {
        if (response.ok) {
          console.log('音频文件存在');
        } else {
          console.error('音频文件不存在或无法访问');
        }
      })
      .catch(error => {
        console.error('检查音频文件时出错:', error);
      });
}

document.addEventListener('DOMContentLoaded', initPlayer);
