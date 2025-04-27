const button = document.getElementById('celebrateBtn');
const music = document.getElementById('bg-music');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Set your birthday date here:
const birthdayDate = new Date("2025-05-10T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = birthdayDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').textContent = "🎂 It's your Birthday! 🎉";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('countdown').textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s until your Birthday! 🎈`;
  }
}

setInterval(updateCountdown, 1000);

button.addEventListener('click', () => {
  createBalloons(30);
  startFireworks();
  popup.classList.remove('hidden');
  music.play();
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Balloons
function createBalloons(num) {
  for (let i = 0; i < num; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`;
    balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';
    document.body.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 8000);
  }
}

// Fireworks
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startFireworks() {
  let particles = [];
  const colors = ['#ff4b5c', '#56cfe1', '#ffbc42', '#9d4edd', '#43aa8b'];

  function createFirework(x, y) {
    const numParticles = 50;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: x,
        y: y,
        speed: Math.random() * 5 + 2,
        angle: Math.random() * 2 * Math.PI,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }
  }

  createFirework(canvas.width / 2, canvas.height / 2);

  const interval = setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
  }, 5000);

  animate();

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.alpha > 0);

    for (let p of particles) {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
