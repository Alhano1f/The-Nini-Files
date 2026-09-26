'use strict';

// Ending bonus: "Special gift" — the cast dances to the cats' birthday song, then… a jump scare.
(() => {
  const BEAT = 0.5; // the song is ~120 BPM
  const SONG_FALLBACK_SECONDS = 36.8;
  const art = {
    stage: 'gift-stage.webp',
    girlFront: 'gift-girl-front.webp',
    girlSide: 'gift-girl-side.webp',
    cat1: 'gift-cat-1.webp',
    cat2: 'gift-cat-2.webp',
    peek: 'gift-cat-peek.webp',
    scare: 'gift-scare.webp',
  };

  let overlay;
  let audio;
  let ctx;
  let raf = 0;
  let timers = [];
  let screamNodes = [];
  let running = false;
  let preloaded = false;

  const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function preload() {
    if (preloaded) return;
    preloaded = true;
    Object.values(art).forEach((src) => { const img = new Image(); img.src = src; });
    const a = new Audio();
    a.preload = 'auto';
    a.src = 'gift-song.mp3';
  }

  function later(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'giftOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'The special gift: a birthday dance');
    overlay.innerHTML = `
      <div class="giftStage" style="background-image:url('${art.stage}')"></div>
      <div class="giftLights" aria-hidden="true"></div>
      <p class="giftTitle">THE SPECIAL GIFT<br><span>from the cats</span></p>
      <div class="giftDancers" aria-hidden="true">
        <img class="giftGirl" src="${art.girlFront}" alt="">
        <img class="giftCat" src="${art.cat1}" alt="">
      </div>
      <img class="giftPeek" src="${art.peek}" alt="" aria-hidden="true">
      <div class="giftDark" aria-hidden="true"></div>
      <div class="giftScare" aria-hidden="true"><img src="${art.scare}" alt=""></div>
      <div class="giftAfter">
        <p class="eyebrow">GOTCHA.</p>
        <h2>Happy birthday, Rudy!</h2>
        <p class="lead">That was the last surprise. Probably.</p>
        <div class="endingActions">
          <button class="quiet" type="button" data-gift="again">Watch again</button>
          <button class="primary" type="button" data-gift="close">Back to the cake</button>
        </div>
      </div>
      <button class="giftSkip quiet" type="button" data-gift="close" aria-label="Close the gift">×</button>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (event) => {
      const action = event.target.closest('[data-gift]')?.dataset.gift;
      if (action === 'close') close();
      if (action === 'again') { close(); start(); }
    });
  }

  function onKey(event) {
    if (event.key === 'Escape') close();
  }

  function unlockAudioContext() {
    try {
      ctx ??= new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      // A silent blip while we still have the click gesture keeps iOS happy later.
      const src = ctx.createBufferSource();
      src.buffer = ctx.createBuffer(1, 1, 22050);
      src.connect(ctx.destination);
      src.start();
    } catch { ctx = null; }
  }

  function start() {
    if (running) return;
    running = true;
    preload();
    window.NiniCelebrate?.stopSong();
    unlockAudioContext();

    buildOverlay();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('giftOpen');
    requestAnimationFrame(() => overlay.classList.add('is-in'));

    audio = new Audio('gift-song.mp3');
    audio.volume = 1;
    let ended = false;
    const finish = () => { if (!ended && running) { ended = true; scareSequence(); } };
    audio.addEventListener('ended', finish);
    const playing = audio.play();
    if (playing?.catch) playing.catch(() => later(finish, SONG_FALLBACK_SECONDS * 1000));
    audio.addEventListener('error', () => later(finish, 1500));

    window.NiniCelebrate?.confetti();
    overlay.querySelector('.giftSkip').focus({ preventScroll: true });
    dance();
  }

  function dance() {
    const girl = overlay.querySelector('.giftGirl');
    const cat = overlay.querySelector('.giftCat');
    const peek = overlay.querySelector('.giftPeek');
    const lights = overlay.querySelector('.giftLights');
    const calm = reducedMotion();
    const started = performance.now();
    let lastBeat = -1;
    let lastHalf = -1;

    function frame(now) {
      if (!running || overlay.classList.contains('is-scary')) return;
      const t = audio && !audio.paused && audio.currentTime > 0 ? audio.currentTime : (now - started) / 1000;
      const beat = Math.floor(t / BEAT);
      const half = Math.floor(t / (BEAT / 2));
      const phase = (t % BEAT) / BEAT;
      const bounce = Math.abs(Math.sin(Math.PI * phase));
      const bar = Math.floor(beat / 4);

      if (beat !== lastBeat) {
        lastBeat = beat;
        // Girl steps: front, side, front, side (mirrored every other bar).
        girl.src = beat % 2 ? art.girlSide : art.girlFront;
        girl.dataset.flip = beat % 2 && bar % 2 ? '1' : '0';
        lights.style.setProperty('--hue', String((beat * 47) % 360));
        lights.classList.toggle('flash', beat % 2 === 0);
      }
      if (half !== lastHalf) {
        lastHalf = half;
        cat.src = half % 2 ? art.cat2 : art.cat1;
      }

      const amp = calm ? 4 : 26;
      const sway = calm ? 0 : Math.sin((Math.PI * t) / (BEAT * 2)) * 6;
      const flip = girl.dataset.flip === '1' ? -1 : 1;
      girl.style.transform = `translateY(${-bounce * amp}px) rotate(${sway}deg) scaleX(${flip})`;
      cat.style.transform = `translateY(${-bounce * amp * 0.8}px) rotate(${-sway * 1.4}deg)`;

      // Nini peeks in from the corner twice during the song.
      const peeking = (t > 11 && t < 16) || (t > 26 && t < 31);
      peek.classList.toggle('is-peeking', peeking);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  function scareSequence() {
    if (!running) return;
    const stage = overlay;
    stage.classList.add('is-ending'); // freeze + lights flicker out
    later(() => stage.classList.add('is-dark'), 1700);
    later(() => {
      if (!running) return;
      cancelAnimationFrame(raf);
      stage.classList.add('is-scary');
      if (!reducedMotion()) stage.classList.add('is-shaking');
      scream();
      navigator.vibrate?.([300, 60, 400]);
    }, 2900);
    later(() => stage.classList.remove('is-shaking'), 4700);
    later(() => {
      stage.classList.add('is-after');
      stage.querySelector('.giftAfter .primary')?.focus({ preventScroll: true });
    }, 5600);
  }

  // A synthesized screech: detuned sawtooth "voice" with wobble, a noise blast and a low boom.
  function scream() {
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const t = ctx.currentTime + 0.02;
      const out = ctx.createGain();
      out.gain.value = 0.95;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10;
      comp.ratio.value = 6;
      const shaper = ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let i = 0; i < curve.length; i++) {
        const x = (i / (curve.length - 1)) * 2 - 1;
        curve[i] = Math.tanh(x * 4);
      }
      shaper.curve = curve;
      shaper.connect(comp);
      comp.connect(out);
      out.connect(ctx.destination);

      const track = (node) => { screamNodes.push(node); return node; };

      // Screech voices
      const lfo = track(ctx.createOscillator());
      lfo.frequency.value = 27;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 70;
      lfo.connect(lfoGain);
      [1, 1.06, 1.49, 2.02].forEach((ratio, i) => {
        const osc = track(ctx.createOscillator());
        osc.type = i === 3 ? 'square' : 'sawtooth';
        const f = osc.frequency;
        f.setValueAtTime(380 * ratio, t);
        f.exponentialRampToValueAtTime(1150 * ratio, t + 0.18);
        f.exponentialRampToValueAtTime(900 * ratio, t + 1.2);
        f.exponentialRampToValueAtTime(260 * ratio, t + 2.3);
        lfoGain.connect(f);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(i === 3 ? 0.12 : 0.28, t + 0.03);
        g.gain.setValueAtTime(i === 3 ? 0.12 : 0.28, t + 1.4);
        g.gain.exponentialRampToValueAtTime(0.001, t + 2.4);
        osc.connect(g);
        g.connect(shaper);
        osc.start(t);
        osc.stop(t + 2.5);
      });
      lfo.start(t);
      lfo.stop(t + 2.5);

      // Noise blast
      const len = Math.floor(ctx.sampleRate * 2.2);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const noise = track(ctx.createBufferSource());
      noise.buffer = buf;
      const band = ctx.createBiquadFilter();
      band.type = 'bandpass';
      band.Q.value = 1.2;
      band.frequency.setValueAtTime(3200, t);
      band.frequency.exponentialRampToValueAtTime(700, t + 2);
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.9, t);
      ng.gain.exponentialRampToValueAtTime(0.001, t + 2.1);
      noise.connect(band);
      band.connect(ng);
      ng.connect(shaper);
      noise.start(t);

      // Low boom
      const boom = track(ctx.createOscillator());
      boom.type = 'sine';
      boom.frequency.setValueAtTime(90, t);
      boom.frequency.exponentialRampToValueAtTime(28, t + 1.1);
      const bg = ctx.createGain();
      bg.gain.setValueAtTime(1, t);
      bg.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
      boom.connect(bg);
      bg.connect(comp);
      boom.start(t);
      boom.stop(t + 1.4);
    } catch {
      // Sound is optional; the picture is scary enough.
    }
  }

  function close() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    timers = [];
    screamNodes.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } });
    screamNodes = [];
    if (audio) { audio.pause(); audio.src = ''; audio = null; }
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('giftOpen');
    overlay?.remove();
    overlay = null;
    document.querySelector('[data-action="special-gift"]')?.focus({ preventScroll: true });
  }

  window.NiniGift = { start, close, preload };
})();
