// scripts.js

// Get references to the HTML elements
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const volumeControl = document.getElementById('volumeControl');
const progress = document.getElementById('progress');

// References to song and artist display elements
const songNameDisplay = document.getElementById('songName');
const artistNameDisplay = document.getElementById('artistName');

// Playlist of music tracks (replace these URLs with your actual tracks or URLs)
const playlist = [
    { name: "Who Says...", artist: "Salena Gomez", url: "audio/S.mp3" },
    { name: "Kahna", artist: "Bahubali", url: "audio/ss.mp3" },
    { name: "Unknow", artist: "Artist 3", url: "audio/sss.mp3" }
];

let currentTrackIndex = 0;

// Function to update the audio source to the current track in the playlist
function updateTrack() {
    const currentTrack = playlist[currentTrackIndex];
    audio.src = currentTrack.url;
    document.title = `${currentTrack.name} - ${currentTrack.artist}`; // Optional: Set document title to the current track
    
    // Update the song name and artist on the page
    songNameDisplay.textContent = currentTrack.name;
    artistNameDisplay.textContent = currentTrack.artist;
    artistNameDisplay.style.fontStyle = "italic";

    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
}

// Play the audio
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    }
});

// Pause the audio
pauseButton.addEventListener('click', () => {
    audio.pause();
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
});

// Change the volume
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Update the progress bar as the audio plays
audio.addEventListener('timeupdate', () => {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progress.value = progressValue;
});

// Allow the user to seek by clicking the progress bar
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Handle the "Next" button
nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Loop to the first track when reaching the end
    updateTrack();
});

// Handle the "Previous" button
prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; // Loop to the last track when going backwards
    updateTrack();
});

// Initialize the first track
updateTrack();
