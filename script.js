const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEl =  document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist:'Jacinto Design'
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    music.play();
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}

// Pause
function pauseSong() {
    music.pause();
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong(): playSong());

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    } 
    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressbar(e) {
    if(isPlaying){
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Update song duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration elemnt to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate Display for Current Time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function moveProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressbar);
progressContainer.addEventListener('click',moveProgressBar);