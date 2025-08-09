function control() {
    const arm = document.getElementById('arm');
    const vinyl = document.getElementById('vinyl');
    const music = document.getElementById('music');
    if (arm && vinyl) {
        const rotated = arm.classList.toggle('arm-rotated');
        if (rotated) {
            vinyl.classList.add('stopped');
            music.pause();
        } else {
            // Wait for arm transition to finish before spinning vinyl
            setTimeout(() => {
                vinyl.classList.remove('stopped');
                music.play();
            }, 600); // match CSS transition duration
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const vinyl = document.getElementById('vinyl');
    const arm = document.getElementById('arm');
    const music = document.getElementById('music');
    if (vinyl) {
        vinyl.addEventListener('click', control);
    }
    if (arm) {
        arm.addEventListener('click', control);
    }

    // Animate disc out from cover on cover click (support multiple records)
    document.querySelectorAll('.record').forEach(recordDiv => {
        const cover = recordDiv.querySelector('.cover');
        const discWrapper = recordDiv.querySelector('.disc-wrapper');
        if (cover && discWrapper) {
            cover.addEventListener('click', () => {
                discWrapper.classList.toggle('out');
            });
        }
    });

    // Per-disc playlist and vinyl replacement logic
    const discConfigs = [
        {
            wrapperId: 'discwrap1',
            vinylImg: 'assets/images/vinyl_1.webp',
            playlist: [
                'assets/audio/playlist1/track1.mp3',
                'assets/audio/playlist1/track2.mp3',
                'assets/audio/playlist1/track3.mp3',
                'assets/audio/playlist1/track4.mp3',
                'assets/audio/playlist1/track5.mp3',
                'assets/audio/playlist1/track6.mp3',
                'assets/audio/playlist1/track7.mp3',
                'assets/audio/playlist1/track8.mp3'
            ]
        },
        {
            wrapperId: 'discwrap2',
            vinylImg: 'assets/images/vinyl_2.webp',
            playlist: [
                'assets/audio/playlist2/track1.mp3',
                'assets/audio/playlist2/track2.mp3',
                'assets/audio/playlist2/track3.mp3',
                'assets/audio/playlist2/track4.mp3',
                'assets/audio/playlist2/track5.mp3',
                'assets/audio/playlist2/track6.mp3',
                'assets/audio/playlist2/track7.mp3',
                'assets/audio/playlist2/track8.mp3'
            ]
        },
        {
            wrapperId: 'discwrap3',
            vinylImg: 'assets/images/vinyl_3.webp',
            playlist: [
                // Add playlist3 tracks here if available
                'assets/audio/playlist3/track1.mp3'
            ]
        }
    ];

    discConfigs.forEach((config, idx) => {
        const wrapper = document.getElementById(config.wrapperId);
        if (!wrapper) return;
        // Add click event to play button overlay (on wrapper when out and hovered)
        wrapper.addEventListener('click', function(e) {
            // Only trigger if out and hovered (simulate play button click)
            if (!wrapper.classList.contains('out')) return;
            // Check if mouse is over the play button area
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Play button is roughly centered, radius 3vh
            const centerX = rect.width/2 + 3; // matches CSS left: calc(50% + 3px)
            const centerY = rect.height/2;
            const r = Math.sqrt((x-centerX)*(x-centerX)+(y-centerY)*(y-centerY));
            if (r > rect.width*0.3) return; // Only trigger if click is near center

            // Set playlist and vinyl
            currentTrack = 0;
            playlist.length = 0;
            config.playlist.forEach(t => playlist.push(t));
            if (playlist.length > 0) {
                music.src = playlist[0];
                music.currentTime = 0;
                music.play();
            }
            // Replace vinyl image
            if (vinyl) {
                vinyl.src = config.vinylImg;
                vinyl.classList.remove('stopped');
            }
            // Arm animation
            if (arm) {
                arm.classList.remove('arm-rotated');
            }
            // Slide disc back in after play
            setTimeout(() => {
                wrapper.classList.remove('out');
            }, 200); // allow a short delay for feedback
            e.stopPropagation();
        });
    });

    // Playlist functionality: play next song in assets/audio/playlist2/ when current ends
    const playlist = [
        'assets/audio/playlist2/track1.mp3',
        'assets/audio/playlist2/track2.mp3',
        'assets/audio/playlist2/track3.mp3',
        'assets/audio/playlist2/track4.mp3',
        'assets/audio/playlist2/track5.mp3',
        'assets/audio/playlist2/track6.mp3',
        'assets/audio/playlist2/track7.mp3',
        'assets/audio/playlist2/track8.mp3'
    ];
    let currentTrack = 0;
    if (music && arm && vinyl) {
        music.addEventListener('ended', () => {
            arm.classList.add('arm-rotated');
            vinyl.classList.add('stopped');
            // Play next track if available
            currentTrack++;
            if (currentTrack < playlist.length) {
                music.src = playlist[currentTrack];
                music.currentTime = 0;
                setTimeout(() => {
                    arm.classList.remove('arm-rotated');
                    vinyl.classList.remove('stopped');
                    music.play();
                }, 600); // match arm transition
            } else {
                // Optionally loop playlist
                // currentTrack = 0;
                // music.src = playlist[currentTrack];
                // music.currentTime = 0;
                // setTimeout(() => {
                //     arm.classList.remove('arm-rotated');
                //     vinyl.classList.remove('stopped');
                //     music.play();
                // }, 600);
            }
        });
        // Ensure first track is loaded
        music.src = playlist[currentTrack];
    }

    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    if (music && progressBar) {
        music.addEventListener('timeupdate', () => {
            const percent = (music.currentTime / music.duration) * 100;
            progressBar.style.width = percent + '%';
        });
        music.addEventListener('ended', () => {
            progressBar.style.width = '0%';
        });
    }

    // Make progress bar seekable
    if (progressContainer && music) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            music.currentTime = percent * music.duration;
        });

        // Optional: support drag-to-seek
        let seeking = false;
        progressContainer.addEventListener('mousedown', (e) => {
            seeking = true;
            seek(e);
        });
        window.addEventListener('mousemove', (e) => {
            if (seeking) seek(e);
        });
        window.addEventListener('mouseup', () => {
            seeking = false;
        });

        function seek(e) {
            const rect = progressContainer.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percent = x / rect.width;
            music.currentTime = percent * music.duration;
        }
    }
});