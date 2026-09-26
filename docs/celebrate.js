'use strict';

// Ending celebration: pixel confetti + a chiptune "Happy Birthday to You" (public-domain melody).
(() => {
  const palette = ['#f1c66d', '#ffe39a', '#3fb5a3', '#f3ecd9', '#e0584f', '#7fd1ff'];
  let songCtx;
  let songNodes = [];

  function confetti() {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'confettiCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener('resize', resize);

    const count = Math.round(Math.min(220, Math.max(90, innerWidth / 6)));
    const pieces = Array.from({ length: count }, (_, i) => {
      const fromLeft = i % 2 === 0;
      return {
        x: fromLeft ? -10 : innerWidth + 10,
        y: innerHeight * (0.45 + Math.random() * 0.4),
        vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 7),
        vy: -(8 + Math.random() * 9),
        size: 4 + Math.floor(Math.random() * 3) * 2,
        color: palette[i % palette.length],
        spin: Math.random() * Math.PI,
        spinSpeed: (Math.random() - 0.5) * 0.3,
        delay: Math.random() * 18,
      };
    });

    const start = performance.now();
    const lifetime = 5200;
    function frame(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const fade = elapsed > lifetime - 900 ? Math.max(0, (lifetime - elapsed) / 900) : 1;
      ctx.globalAlpha = fade;
      for (const p of pieces) {
        if (p.delay > 0) { p.delay -= 1; continue; }
        p.vy += 0.28;
        p.vx *= 0.985;
        p.vy = Math.min(p.vy, 4.5);
        p.x += p.vx + Math.sin((now / 300) + p.spin) * 0.6;
        p.y += p.vy;
        p.spin += p.spinSpeed;
        const w = Math.max(2, Math.round(p.size * Math.abs(Math.cos(p.spin))));
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), w, p.size); // crisp, pixel-style squares
      }
      if (elapsed < lifetime) requestAnimationFrame(frame);
      else {
        removeEventListener('resize', resize);
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  // Happy Birthday to You in G major, 3/4. [note, beats]
  const melody = [
    ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
    ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
    ['G4', .75], ['G4', .25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
    ['F5', .75], ['F5', .25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 3],
  ];
  // One bass note per bar (pickup handled by starting the bass on the first full bar).
  const bass = ['C3', 'G2', 'G2', 'C3', 'C3', 'F2', 'C3', 'G2', 'C3'];
  const semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const freq = (n) => 440 * 2 ** ((semis[n[0]] + (parseInt(n.slice(1), 10) + 1) * 12 - 69) / 12);

  function stopSong() {
    songNodes.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } });
    songNodes = [];
  }

  function song() {
    try {
      songCtx ??= new (window.AudioContext || window.webkitAudioContext)();
      if (songCtx.state === 'suspended') songCtx.resume().catch(() => {});
      stopSong();
      const beat = 0.42;
      const master = songCtx.createGain();
      master.gain.value = 0.16;
      master.connect(songCtx.destination);
      const t0 = songCtx.currentTime + 0.08;

      const tone = (type, f, at, dur, vol) => {
        const osc = songCtx.createOscillator();
        const g = songCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, at);
        g.gain.setValueAtTime(0, at);
        g.gain.linearRampToValueAtTime(vol, at + 0.015);
        g.gain.setValueAtTime(vol, at + dur * 0.7);
        g.gain.linearRampToValueAtTime(0, at + dur * 0.95);
        osc.connect(g);
        g.connect(master);
        osc.start(at);
        osc.stop(at + dur);
        songNodes.push(osc);
      };

      let t = t0;
      for (const [note, beats] of melody) {
        tone('square', freq(note), t, beats * beat, 0.5);
        t += beats * beat;
      }
      // Bass starts after the one-beat pickup, one note per 3-beat bar.
      bass.forEach((note, i) => tone('triangle', freq(note), t0 + beat + i * 3 * beat, 3 * beat * 0.9, 0.9));
      // Little sparkle on the final chord.
      ['C5', 'E5', 'G5'].forEach((n, i) => tone('triangle', freq(n) * 2, t - 3 * beat + i * 0.08, 1.2, 0.18));
    } catch {
      // Sound is optional; the ending still reads the same.
    }
  }

  window.NiniCelebrate = { confetti, song, stopSong };
})();
