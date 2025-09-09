/* =============================================
   Modulwahl Countdown – getrennte Dateien
   =============================================
   KONFIGURATION:
   - Zielzeit (Europe/Berlin): 10.09.2025, 00:00
   - Weiterleitungs-URL anpassen: REDIRECT_URL
   ============================================= */

const REDIRECT_URL = "https://benjino.limesurvey.net/389524?lang=de-easy"; // z.B. "open.html" oder "https://deineuni.de/modulwahl"
const TARGET_UTC_MS = berlinInstantFromWall(2025, 9, 10, 0, 0, 0);

// Utility: Berlin-Offset ermitteln (DST-sicher)
function berlinOffsetMs(atDate){
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  const parts = dtf.formatToParts(atDate).reduce((acc, p) => (acc[p.type] = p.value, acc), {});
  const utcLike = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return utcLike - atDate.getTime();
}

// Wandelt Berliner "Wanduhr"-Zeit in UTC-Millis um
function berlinInstantFromWall(y, m, d, h = 0, mi = 0, s = 0){
  let guess = Date.UTC(y, m - 1, d, h, mi, s);
  const offset = berlinOffsetMs(new Date(guess));
  return guess - offset;
}

// Ziel: 10. September 2025, 00:00 Uhr (Europe/Berlin)

const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const elNote = document.getElementById('statusNote');
const headline = document.getElementById('headline');

function pad(n){ return String(n).padStart(2, '0'); }

function redirect(){
  if (REDIRECT_URL && typeof REDIRECT_URL === 'string' && REDIRECT_URL.trim().length > 0){
    window.location.href = REDIRECT_URL;
  }
}

function update(){
  const now = Date.now();
  const diff = TARGET_UTC_MS - now;

  // Wenn Zeit abgelaufen ist: sofort weiterleiten
  if (diff <= 0){
    redirect();
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  elDays.textContent = pad(days);
  elHours.textContent = pad(hours);
  elMinutes.textContent = pad(minutes);
  elSeconds.textContent = pad(seconds);

  const dateFmt = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Berlin'
  });
  elNote.textContent = 'Zielzeit: ' + dateFmt.format(new Date(TARGET_UTC_MS)) + ' (Berlin)';
  document.title = `Noch ${days}·${pad(hours)}·${pad(minutes)}·${pad(seconds)} – Modulwahl`;
}

// Initial + Intervall
update();
const ticker = setInterval(update, 1000);
// Bei Rückkehr in den Tab neu berechnen
document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
