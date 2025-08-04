function playMusic() {
    const music = document.getElementById('bg-music');
    if (music.paused) {
        music.play();
        document.querySelector('#play-btn i').classList.remove('fa-play');
        document.querySelector('#play-btn i').classList.add('fa-pause');
    } else {
        music.pause();
        document.querySelector('#play-btn i').classList.remove('fa-pause');
        document.querySelector('#play-btn i').classList.add('fa-play');
    }
}