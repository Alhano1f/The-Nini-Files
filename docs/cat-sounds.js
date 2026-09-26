export function createCatSounds(getContext, isEnabled) {
  const buffers = new Map();
  let timer;
  let source;
  let generation = 0;

  function allowed() {
    return isEnabled() && !document.hidden;
  }

  function stop() {
    generation += 1;
    clearTimeout(timer);
    if (source) {
      source.stop();
      source = null;
    }
  }

  function schedule() {
    if (allowed()) timer = setTimeout(play, 15000 + Math.random() * 20000);
  }

  async function play() {
    const version = generation;
    const context = getContext();
    if (!allowed() || !context) return;
    try {
      const index = 1 + Math.floor(Math.random() * 4);
      let buffer = buffers.get(index);
      if (!buffer) {
        const response = await fetch(new URL(`cat-sound-${index}.mp3`, import.meta.url));
        if (!response.ok) throw new Error(`Cat audio request failed: ${response.status}`);
        buffer = await context.decodeAudioData(await response.arrayBuffer());
        buffers.set(index, buffer);
      }
      if (version !== generation || !allowed()) return;
      if (context.state !== 'running') {
        schedule();
        return;
      }
      const clip = context.createBufferSource();
      const gain = context.createGain();
      clip.buffer = buffer;
      gain.gain.value = .7;
      clip.connect(gain);
      gain.connect(context.destination);
      source = clip;
      clip.onended = () => {
        clip.disconnect();
        gain.disconnect();
        if (source === clip) source = null;
        if (version === generation) schedule();
      };
      clip.start(context.currentTime, 0, 5);
      clip.stop(context.currentTime + 5);
    } catch (error) {
      console.error('Unable to play cat sound:', error);
      if (version === generation) schedule();
    }
  }

  function sync() {
    stop();
    schedule();
  }
  document.addEventListener('visibilitychange', sync);
  sync();
  return { sync };
}