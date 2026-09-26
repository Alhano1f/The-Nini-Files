# The Nini Files: The Missing Treasure

A playable pixel-art courtroom mystery. Investigate a missing silver box, question eight witnesses, match evidence to contradictions — and uncover what's inside only at the final click.

## ▶ Play

**https://alhano1f.github.io/The-Nini-Files/**

Works on desktop and phones. Optional character voices are pre-generated audio files hosted with the game (`docs/voices/`, made with the open-source Kokoro text-to-speech model). No account, sign-in or internet service is needed.

## Project layout

The game is a static website (plain HTML, CSS and JavaScript), hosted free on GitHub Pages. No build step, server or framework.

- `docs/` — the game itself. Edit files here; GitHub Pages republishes automatically on every commit to `main`.
  - `index.html` — page shell
  - `game.js` — story, evidence and game logic
  - `style.css` — all styling
  - `voice-cast.js`, `voices.html` — character voices
  - `*.png`, `*.webp`, `*.mp3` — art and sound

## Run locally

```sh
cd docs
python3 -m http.server 8000
# open http://localhost:8000
```

## Hosting settings

Settings → Pages → Deploy from a branch → `main` / `/docs`
