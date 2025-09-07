# Modulwahl Countdown (statisch, GitHub Pages)

Eine einzelne, statische Seite mit waldorfartigem Design und einem Countdown bis **10.09.2025, 00:00 Uhr (Europe/Berlin)**. Nach Ablauf wird automatisch weitergeleitet.

## Dateien
- `index.html` – Startseite mit Überschrift und Countdown
- `styles.css` – Design/Styles
- `script.js` – Logik (Countdown, Weiterleitung)
- `open.html` – Beispielziel nach Ablauf (kannst du ersetzen oder löschen)

## Ziel-URL einstellen
Öffne `script.js` und passe ganz oben die Konstante an:
```js
const REDIRECT_URL = "open.html"; // z.B. "open.html" oder "https://deineuni.de/modulwahl"
```

## Deployment auf GitHub Pages
1. Neues Repository anlegen (öffentlich).
2. Alle Dateien ins Repo root legen und committen.
3. In den Repo-Settings → **Pages** → Branch auf `main` (root) setzen.
4. Die Seite ist unter der angegebenen GitHub-Pages-URL erreichbar.

## Hinweise
- Die Zielzeit wird DST-sicher (Sommer-/Winterzeit) für die Zeitzone **Europe/Berlin** berechnet.
- Wenn die Seite nach Ablauf geöffnet wird, erfolgt die Weiterleitung sofort.
