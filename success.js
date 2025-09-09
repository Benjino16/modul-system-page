/* =============================================
   Erfolgsseite – Partikel-Hintergrund + Button-Link
   =============================================
   KONFIGURATION:
   - Linkziel für den Button (z. B. zur Umfrage) hier setzen:
   ============================================= */
const SURVEY_URL = "https://beispiel.de/deine-umfrage"; // <— HIER anpassen

// Button-Link setzen
const retryBtn = document.getElementById('retryBtn');
if (retryBtn && SURVEY_URL) {
  retryBtn.setAttribute('href', SURVEY_URL);
}

// ---------- Partikel-Hintergrund (Canvas) ----------
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d', { alpha: true });

let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
let W = 0, H = 0;

function resize() {
  W = Math.floor(window.innerWidth);
  H = Math.floor(window.innerHeight);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resize, { passive: true });
resize();

// Sanfte, organische Partikel
const COUNT = Math.min(120, Math.floor(W * H / 16000)); // Skalierung nach Fläche, gedeckelt
const particles = [];
const palette = [
  'rgba(156,200,182,0.45)', // Blattgrün
  'rgba(185,162,210,0.40)', // Lavendel
  'rgba(255,255,255,0.35)'  // Licht
];

function rand(a, b) { return a + Math.random() * (b - a); }

for (let i = 0; i < COUNT; i++) {
  particles.push({
    x: rand(0, W),
    y: rand(0, H),
    r: rand(0.6, 2.2),
    a: rand(0, Math.PI * 2),
    speed: rand(0.08, 0.35),
    turn: rand(0.001, 0.004),
    color: palette[i % palette.length]
  });
}

let last = performance.now();
function tick(now) {
  const dt = Math.min(33, now - last); // ms
  last = now;

  // clear with soft fade to create trails
  ctx.fillStyle = 'rgba(245,239,230,0.06)'; // nahe --bg-1
  ctx.fillRect(0, 0, W, H);

  for (const p of particles) {
    p.a += p.turn * dt;
    const vx = Math.cos(p.a) * p.speed * dt;
    const vy = Math.sin(p.a) * p.speed * dt;

    p.x += vx;
    p.y += vy;

    // Wrap-around
    if (p.x < -5) p.x = W + 5;
    if (p.x > W + 5) p.x = -5;
    if (p.y < -5) p.y = H + 5;
    if (p.y > H + 5) p.y = -5;

    // Draw
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  requestAnimationFrame(tick);
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!prefersReduced.matches) {
  requestAnimationFrame(tick);
} else {
  // Bei reduzierter Bewegung: statisches, leichtes Muster
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
}
