function playMusic() {
    const music = document.getElementById('bg-music');
  // ensure consistent default volume
  if (music) music.volume = 0.25;
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

// Configuration
const LEAF_IMAGES = [
  'assets/images/leaves/1.webp',
  'assets/images/leaves/2.webp',
  'assets/images/leaves/3.webp',
  'assets/images/leaves/4.webp',
  'assets/images/leaves/5.webp',
  'assets/images/leaves/6.webp',
  'assets/images/leaves/7.webp',
  'assets/images/leaves/8.webp',
  'assets/images/leaves/9.webp',
  'assets/images/leaves/10.webp',
];
const NUM_LEAVES = 18;          // how many simultaneous leaves
const MIN_SIZE = 30;           // px
const MAX_SIZE = 120;          // px
const MIN_DURATION = 8;        // seconds
const MAX_DURATION = 18;       // seconds
const CONTAINER_SELECTOR = '#floating-leaves';
const FRONT_THRESHOLD = 4; // leaves with z >= FRONT_THRESHOLD go to front container

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createLeaf() {
  const container = document.querySelector(CONTAINER_SELECTOR);
  if (!container) return;

  const img = document.createElement('img');
  img.className = 'leaf';
  img.draggable = false;
  img.style.width = `${rand(MIN_SIZE, MAX_SIZE)}px`;

  // pick random leaf image
  img.src = LEAF_IMAGES[Math.floor(Math.random() * LEAF_IMAGES.length)];

  // random horizontal start between -10% and 110% to allow off-screen starts
  const startX = `${rand(-10, 110)}vw`;
  // end X shifts slightly for drifting: add +-30vw from start
  const endXOffset = rand(-30, 30);
  const endX = `calc(${startX} + ${endXOffset}vw)`;

  // rotation start and end
  const rotStart = `${rand(-360, 360)}deg`;
  const rotEnd = `${rand(-1080, 1080)}deg`;

  const duration = rand(MIN_DURATION, MAX_DURATION).toFixed(2) + 's';
  const delay = rand(0, 6).toFixed(2) + 's';

  // Set CSS custom props used by keyframes
  img.style.setProperty('--start-x', startX);
  img.style.setProperty('--end-x', endX);
  img.style.setProperty('--rot-start', rotStart);
  img.style.setProperty('--rot-end', rotEnd);

  // Animation: include 'both' so 0% keyframe applies during the delay (backwards fill)
  img.style.animation = `fall ${duration} linear ${delay} both`;
  // give each leaf a slight depth by randomizing z-index within 0..4
  const z = Math.floor(rand(0, 5)); // 0..4
  img.style.zIndex = String(z);
  // depth: compute scale and blur based on z (0 back -> smaller/blurrier; 4 front -> larger/sharper)
  const scale = (0.75 + (z / 4) * 0.5).toFixed(2); // range ~0.75..1.25
  const blur = ( (1 - z / 4) * 2 ).toFixed(2) + 'px'; // range 2px..0px
  img.style.setProperty('--leaf-scale', scale);
  img.style.setProperty('--leaf-blur', blur);
  // remove conflicting transition; will-change already set via CSS
  // img.style.transition = 'transform 0.2s linear';
  // img.style.willChange = 'transform, opacity';

  // cleanup when animation ends, then respawn
  img.addEventListener('animationend', () => {
    img.remove();
    // respawn new leaf after short delay
    setTimeout(spawnLeaf, rand(200, 2000));
  });

  // If z is high (3 or 4), append to the front leaves container so it appears above the overlay
  if (z >= FRONT_THRESHOLD) {
    // make sure front leaves are visible: no blur and at least normal size
    img.style.setProperty('--leaf-blur', '0px');
    const frontScale = Math.max(parseFloat(scale), 1.0).toFixed(2);
    img.style.setProperty('--leaf-scale', frontScale);
    // bump up width slightly for front leaves
    const currentWidth = parseFloat(img.style.width) || MIN_SIZE;
    img.style.width = Math.round(currentWidth * 1.15) + 'px';
    const front = document.querySelector('#floating-leaves-front');
    if (front) front.appendChild(img);
    else container.appendChild(img);
  } else {
    container.appendChild(img);
  }
}

function spawnLeaf() {
  createLeaf();
}

// initialize N leaves staggered
function initLeaves() {
  for (let i = 0; i < NUM_LEAVES; i++) {
    setTimeout(spawnLeaf, Math.random() * 4000);
  }
}

// reduce on small screens
function shouldShowLeaves() {
  return window.innerWidth > 600; // tweak breakpoint
}

window.addEventListener('load', () => {
  if (shouldShowLeaves()) initLeaves();
  // attempt to autoplay background music (may be blocked by browser policies)
  const bg = document.getElementById('bg-music');
  const playBtnIcon = document.querySelector('#play-btn i');
  if (bg) {
    // set default volume to 25%
    bg.volume = 0.25;
    const p = bg.play();
    if (p !== undefined) {
      p.then(() => {
        // autoplay succeeded; update button to 'pause'
        if (playBtnIcon) {
          playBtnIcon.classList.remove('fa-play');
          playBtnIcon.classList.add('fa-pause');
        }
      }).catch(() => {
        // autoplay blocked; leave button as play
      });
    }
  }
});