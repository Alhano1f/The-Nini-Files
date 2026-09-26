'use strict';

(() => {
  const overlay = document.querySelector('#tvGlitch');
  const canvas = document.querySelector('#tvNoiseCanvas');
  const context = canvas?.getContext('2d');
  if (!overlay || !context) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer = 0;
  let image;

  function resize() {
    canvas.width = Math.max(1, Math.ceil(window.innerWidth / 5));
    canvas.height = Math.max(1, Math.ceil(window.innerHeight / 5));
    image = context.createImageData(canvas.width, canvas.height);
  }

  function draw() {
    const pixels = image.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const gray = 38 + Math.random() * 205;
      const tint = Math.random();
      pixels[i] = tint < .02 ? 84 : gray;
      pixels[i + 1] = tint < .02 ? 228 : gray;
      pixels[i + 2] = tint < .02 ? 244 : gray;
      pixels[i + 3] = 30 + Math.random() * 106;
    }
    context.putImageData(image, 0, 0);
    context.fillStyle = 'rgba(255,242,208,.6)';
    context.fillRect(Math.random() * canvas.width / 2, Math.random() * canvas.height, canvas.width * .6, 2);
  }

  function schedule() {
    if (document.hidden || reducedMotion.matches) return;
    timer = window.setTimeout(flash, 15000 + Math.random() * 10000);
  }

  function stop() {
    window.clearTimeout(timer);
    overlay.classList.remove('is-active');
    document.dispatchEvent(new Event('tv-glitch-stop'));
  }

  function flash() {
    if (document.hidden || reducedMotion.matches) return;
    overlay.classList.add('is-active');
    document.dispatchEvent(new Event('tv-glitch-start'));
    let frames = 0;
    function refresh() {
      draw();
      frames += 1;
      timer = window.setTimeout(frames < 12 ? refresh : () => {
        stop();
        schedule();
      }, 100);
    }
    refresh();
  }

  function sync() {
    stop();
    schedule();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  schedule();
})();