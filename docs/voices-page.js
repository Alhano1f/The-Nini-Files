(function () {
  'use strict';

  const cast = window.NiniVoiceCast;
  const list = document.getElementById('voiceList');
  const status = document.getElementById('voiceStatus');
  const bar = document.getElementById('voiceStatusBar');
  const error = document.getElementById('voiceError');
  const stopButton = document.getElementById('stopVoice');
  let activeId = null;
  let lastId = null;
  let playbackState = 'idle';
  let ignoreNextIdle = false;
  const buttons = new Map();
  const cards = new Map();
  const stateLabels = new Map();
  const portraits = {
    alhanouf: [0, 0],
    munirah: [1, 0],
    hadeel: [2, 0],
    norah: [3, 0],
    'the old man': [0, 1],
    'old man': [0, 1],
    'the old lady': [1, 1],
    'old lady': [1, 1],
    gojo: [2, 1]
  };

  function normalize(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function setMessage(kind, message) {
    playbackState = kind;
    bar.dataset.state = kind;
    status.textContent = message;
    const isError = kind === 'error' || kind === 'unavailable';
    error.hidden = !isError;
    error.textContent = isError ? message : '';
    stopButton.hidden = !(kind === 'loading' || kind === 'playing');
    buttons.forEach((button, id) => {
      const isActive = id === activeId && (kind === 'loading' || kind === 'playing');
      const wasLast = id === lastId;
      button.textContent = isActive ? 'Stop voice' : (wasLast ? 'Replay voice' : 'Hear voice');
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      const name = button.dataset.name;
      button.setAttribute('aria-label', isActive ? 'Stop ' + name + "'s voice" : (wasLast ? 'Replay ' : 'Hear ') + name + "'s voice");
      cards.get(id).dataset.state = isActive ? kind : 'idle';
      stateLabels.get(id).textContent = isActive ? (kind === 'loading' ? 'PREPARING AUDIO' : 'NOW PLAYING') : (wasLast && kind === 'error' ? 'PLAYBACK FAILED' : wasLast && kind === 'idle' ? 'READY TO REPLAY' : 'READY TO LISTEN');
    });
  }

  function stopPlayback() {
    if (!cast) return;
    cast.stop();
    activeId = null;
    setMessage('idle', 'Playback stopped. Choose a voice to listen again.');
  }

  function onStatus(kind, message) {
    if (kind === 'idle') {
      if (ignoreNextIdle) {
        ignoreNextIdle = false;
        return;
      }
      activeId = null;
      setMessage('idle', message || 'Playback complete. Choose a voice to replay.');
    } else if (kind === 'error') {
      activeId = null;
      setMessage('error', message || 'The voice could not be played. Check your connection or Puter sign-in, then try again.');
    } else if (kind === 'loading' || kind === 'playing') {
      const name = activeId !== null && buttons.has(activeId) ? buttons.get(activeId).dataset.name : 'Voice';
      setMessage(kind, message || (kind === 'loading' ? 'Preparing ' + name + "'s voice…" : 'Playing ' + name + "'s voice."));
    }
  }

  function audition(profile) {
    if (!cast || !cast.isAvailable()) {
      setMessage('unavailable', 'Voice playback is unavailable. Check your connection and reload the page to try again.');
      return;
    }
    if (activeId === profile.id && (playbackState === 'loading' || playbackState === 'playing')) {
      stopPlayback();
      return;
    }
    activeId = profile.id;
    lastId = profile.id;
    setMessage('loading', 'Preparing ' + profile.name + "'s voice…");
    // speak() cancels prior playback and reports idle before reporting loading.
    ignoreNextIdle = true;
    try {
      const result = cast.speak({
        speaker: profile.id,
        text: profile.sample,
        moment: profile.sampleMoment,
        ...(profile.spokenSample ? { spokenText: profile.spokenSample } : {})
      });
      ignoreNextIdle = false;
      if (result && typeof result.catch === 'function') {
        result.catch((reason) => {
          if (activeId === profile.id) {
            activeId = null;
            setMessage('error', reason && reason.message ? reason.message : 'Voice playback failed. Please try again.');
          }
        });
      }
    } catch (reason) {
      ignoreNextIdle = false;
      activeId = null;
      setMessage('error', reason && reason.message ? reason.message : 'Voice playback failed. Please try again.');
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function createCard(profile, position) {
    const card = element('article', 'voice-card');
    card.dataset.state = 'idle';
    card.dataset.testid = 'card-voice-' + profile.id;
    const portrait = element('div', 'voice-card-portrait');
    portrait.setAttribute('aria-hidden', 'true');
    const key = normalize(profile.name);
    if (profile.id === 'you' || key === 'rudy') {
      portrait.classList.add('is-you');
    } else {
      const sprite = portraits[key];
      if (sprite) {
        portrait.style.setProperty('--sprite-x', (sprite[0] * 100 / 3) + '%');
        portrait.style.setProperty('--sprite-y', (sprite[1] * 100) + '%');
      }
    }
    card.append(portrait);

    const identity = element('div', 'voice-card-identity');
    identity.append(element('span', 'voice-card-number', 'VOICE ' + String(position + 1).padStart(2, '0')));
    identity.append(element('h3', '', profile.name));
    identity.append(element('span', 'voice-card-role', profile.role || 'Court witness'));
    identity.append(element('span', 'voice-card-model',
      profile.id === 'gojo' ? profile.voice + ' · JAPANESE NEURAL (PUTER)' : profile.voice + ' · ' + profile.provider.toUpperCase() + ' (PUTER)'));
    card.append(identity);

    card.append(element('p', 'voice-card-direction', profile.direction || ''));

    const action = element('div', 'voice-card-action');
    const button = element('button', 'primary', 'Hear voice');
    button.type = 'button';
    button.dataset.name = profile.name;
    button.dataset.testid = 'button-audition-' + profile.id;
    button.setAttribute('aria-label', 'Hear ' + profile.name + "'s voice");
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => audition(profile));
    const state = element('span', 'voice-card-state', 'READY TO LISTEN');
    action.append(button, state);
    card.append(action);

    const sample = element('p', 'voice-sample');
    sample.append(element('span', 'voice-sample-label', 'SAMPLE LINE'));
    sample.append(document.createTextNode('“' + (profile.sample || '') + '”'));
    card.append(sample);
    buttons.set(profile.id, button);
    cards.set(profile.id, card);
    stateLabels.set(profile.id, state);
    return card;
  }

  stopButton.addEventListener('click', stopPlayback);
  window.addEventListener('pagehide', () => { if (cast) cast.stop(); });

  if (!cast || !Array.isArray(cast.profiles) || !cast.profiles.length) {
    list.replaceChildren(element('p', 'voice-empty', 'The cast record could not be opened. Reload the page to try again.'));
    setMessage('error', 'Voice cast unavailable. Check your connection and reload this page.');
  } else {
    const fragment = document.createDocumentFragment();
    cast.profiles.forEach((profile, index) => fragment.append(createCard(profile, index)));
    list.replaceChildren(fragment);
    cast.setStatus(onStatus);
    if (!cast.isAvailable()) {
      setMessage('unavailable', 'Voice playback is unavailable. Check your connection and reload the page to try again.');
    } else {
      setMessage('idle', 'Ready to audition. Select a witness below.');
    }
  }
  list.setAttribute('aria-busy', 'false');
})();