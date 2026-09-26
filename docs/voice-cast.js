'use strict';

(() => {
  const profiles = [
    {
      id: 'you', gender: 'f', pitch: 1.0, rate: 1.0, name: 'Rudy', provider: 'openai', voice: 'sage', role: 'Defense counsel',
      direction: 'Young, mid-range, warm and grounded. Observe before speaking; grow firmer with each discovery. Deliver STOP cleanly and decisively.',
      sampleMoment: 'resolve',
      performance: {
        resolve: 'Cut through the noise with one sharp STOP. Take a breath, then finish with calm, protective conviction rather than shouting.',
      },
      sample: 'STOP! Enough. I’ll find out what happened to Nini’s treasure.',
    },
    {
      id: 'alhanouf', gender: 'f', pitch: 1.25, rate: 1.1, name: 'Alhanouf', provider: 'openai', voice: 'coral', role: 'The theatrical ringleader',
      direction: 'Quick, theatrical, mischievous jester who interrupts. Playful changes in pitch, faux authority and absurd explanations. Briefly flustered when caught; genuinely warm at the end.',
      sampleMoment: 'opening',
      performance: {
        opening: 'Enter with a flourish; put on mock courtroom authority, then undercut the drama with a sly, amused aside.',
        testimony: 'Perform polished innocence a little too eagerly; let every grand claim sound like a playful performance.',
        pressed: 'A flash of flustered panic slips through, then recover with an absurdly confident excuse.',
        interruption: 'Jump in just a little too quickly, relishing the joke and the attention.',
        admission: 'Start caught off guard; laugh at the absurdity, then soften into sincere affection at the end.',
      },
      sample: 'Order! Nini’s silver box has vanished. A priceless treasure. Or moderately priced. Focus on the crime.',
    },
    {
      id: 'munirah', gender: 'f', pitch: 1.15, rate: 1.15, name: 'Munirah', provider: 'openai', voice: 'shimmer', role: 'The nervous eyewitness',
      direction: 'Friendly, warm and nervous. Deliver the alibi a little too quickly, with awkward pauses and relief after admitting the truth.',
      sampleMoment: 'opening',
      performance: {
        opening: 'Rush through the alibi, hesitate, then let the final question rise with genuine nerves.',
        testimony: 'Begin friendly and breezy but hurry past the suspicious detail; leave a small awkward pause.',
        pressed: 'Try to sound certain, stumble for half a beat, then hurry to finish.',
        admission: 'Blurt out the truth, exhale with relief, and become noticeably warmer and slower.',
      },
      sample: 'I told you I was nowhere near the conservatory. Why is everyone looking at me?',
    },
    {
      id: 'hadeel', gender: 'f', pitch: 1.1, rate: 1.05, name: 'Hadeel', provider: 'openai', voice: 'nova', role: 'The forensic expert',
      direction: 'Bright, articulate and crisp, like a self-appointed forensic expert. Stress evidence and precise times, then lose composure when contradicted.',
      sampleMoment: 'opening',
      performance: {
        opening: 'Deliver the evidence and exact time with bright precision; land the last sentence like a triumphant conclusion.',
        testimony: 'Lead with crisp certainty, emphasizing each time and exhibit as if presenting a scientific finding.',
        pressed: 'Start confidently, then let the justification wobble and speed up.',
        admission: 'The confident lecture falls apart; become briefly flustered and finish in a small, embarrassed voice.',
      },
      sample: 'Because the blue seal was broken! I checked at 7:12. This is basic evidence.',
    },
    {
      id: 'norah', gender: 'f', pitch: 1.3, rate: 0.98, name: 'Norah', provider: 'openai', voice: 'alloy', role: 'The timeline keeper',
      direction: 'Measured, analytical, rehearsed chronology. Become more clipped and faster when her story unravels.',
      sampleMoment: 'opening',
      performance: {
        opening: 'Lay out the timeline with a clear, lightly lilting voice; mark the time precisely and pause before the accusation.',
        testimony: 'Keep the bright, feminine tone and an almost metronomic rhythm, as though the chronology has been rehearsed too often.',
        pressed: 'The neat rhythm breaks; shorten the phrases and speak just a little faster, with an audible nervous lift.',
        admission: 'Let the rehearsed certainty collapse into warm, dry self-awareness and a rueful final beat.',
      },
      sample: 'At 7:15 the power went out. Whoever did it used the darkness.',
    },
    {
      id: 'old-man', gender: 'm', pitch: 0.6, rate: 0.85, name: 'The old man', provider: 'openai', voice: 'onyx', role: 'The alleged gatekeeper',
      direction: 'Low, grave, solemn and dry. Treat a cardigan like a credential; keep a straight face even while admitting the story was invented.',
      sampleMoment: 'opening',
      performance: {
        opening: 'Speak with grave certainty, pause before the exact time, and never acknowledge how ridiculous the story is.',
        testimony: 'Make each claim sound like sworn testimony; give the cardigan line the same solemn weight.',
        pressed: 'Double down with stern precision and a faintly offended edge.',
        admission: 'Admit everything completely deadpan; finish the cardigan joke with quiet pride.',
      },
      sample: 'Impossible. I saw a masked stranger leave through the gate at 7:25.',
    },
    {
      id: 'old-lady', gender: 'f', pitch: 0.85, rate: 0.85, name: 'The old lady', provider: 'openai', voice: 'ballad', role: 'The dynasty historian',
      direction: 'Rich, warm storyteller delivery. Long theatrical pauses about the feline dynasty; delighted rather than ashamed to be caught.',
      sampleMoment: 'opening',
      performance: {
        opening: 'Invite the room into a grand story; linger on royalty and reveal the gold coins with relish.',
        testimony: 'Stretch the imagined history with affectionate grandeur and well-placed theatrical pauses.',
        pressed: 'Stay warmly amused, as if the objection is another welcome part of the story.',
        admission: 'Confess with delight rather than shame, then turn gently protective about the box.',
      },
      sample: 'None of you understand its value. Nini descends from royalty. The box holds ancient gold coins.',
    },
    {
      id: 'gojo', gender: 'm', pitch: 0.9, rate: 0.95, name: 'Gojo', provider: 'aws-polly', voice: 'Takumi', engine: 'neural', language: 'ja-JP', role: 'The strongest witness',
      direction: 'Smooth, unhurried Japanese. An easy, almost amused admission when the trolley is shown. Original synthetic voice, not the anime performance.',
      sampleMoment: 'admission',
      sample: 'Okay, I used the trolley. Even limitless power should respect “carry level.”',
      spokenSample: 'ああ、台車は使ったよ。いくら強くても、箱を運ぶときは無理をしない。',
    },
  ];

  // Each entry matches an English subtitle actually used by the game.
  const japaneseDialogue = new Map([
    ['Nini says the old lady is convincing. She also says I am the strongest witness.', 'ニニはおばあさんの話に説得力があるって。僕が一番強い証人だとも言ってるよ。'],
    ['For the record, I moved the box with teleportation. Effortless. No trolley involved.', '記録のために言っておくけど、箱は瞬間移動で運んだ。簡単だったよ。台車なんて使ってない。'],
    ['That was the sound of limitless power. Sometimes it squeaks.', 'あれは無限の力の音だよ。たまにきしむんだ。'],
    ['I brought it here. Following instructions. The room was already locked when I left.', '指示どおりここまで運んだよ。僕が離れるときには、部屋にはもう鍵がかかっていた。'],
    ['Relax. The strongest person in the room has arrived.', '落ち着いて。この部屋で一番強い僕が来たんだから。'],
    ['At 7:20 I teleported the box. I never touched a trolley.', '七時二十分に箱を瞬間移動させた。台車には触ってないよ。'],
    ['Could I solve this instantly? Sure. Am I making it dramatic? Also sure.', '今すぐ解決できるかって？　もちろん。大げさにしてるかって？　それももちろん。'],
    ['Rudy, your objection to that statement is noted and ignored.', 'ルディ、その異議は聞いたよ。でも無視するね。'],
    ['No wheels, no pushing, no squeaking. Pure technique.', '車輪も押す力も、きしむ音もない。純粋に術だけだよ。'],
    ['Some people call it obstruction. I call it excellent pacing.', '邪魔してるって言う人もいるけど、僕は最高の演出だと思うね。'],
    ['Okay, I used the trolley. Even limitless power should respect “carry level.” I delivered the box to the locked dining room. On Alhanouf’s instructions.', 'わかったよ、台車を使った。どんなに強くても、箱は水平に運ばないとね。アルハヌーフに頼まれて、鍵のかかった食堂の前まで届けたんだ。'],
    ['She says: I knew nothing about this plan. I am an innocent victim. Also, Rudy, your shoelace looks delicious.', 'ニニによると、計画のことは何も知らない、私は無実の被害者だって。それから、ルディ、君の靴ひもがおいしそうらしいよ。'],
    ['Correction: she approved everything. She also says you are doing very well, Rudy.', '訂正するよ。ニニは全部承認してたって。それと、君はよくやってるってさ、ルディ。'],
  ]);

  let generation = 0;
  let pending;
  let audio;
  let catTurn = 0;
  let report = () => {};
  const synth = window.speechSynthesis;

  // Every character line has a pre-generated clip in voices/ (see voice-manifest.js).
  // The browser's built-in speech is only a fallback for lines without a clip.

  function hasBrowserVoices() {
    return !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  }

  function isAvailable() {
    return typeof window.Audio === 'function' || hasBrowserVoices();
  }

  const femaleHints = /female|woman|samantha|victoria|karen|moira|tessa|fiona|zira|susan|hazel|serena|allison|ava|kate|libby|sonia|aria|jenny|google uk english female|google us english/i;
  const maleHints = /\bmale\b|\bman\b|daniel|david|alex|fred|george|mark|james|guy|ryan|thomas|oliver|arthur|rishi|google uk english male/i;

  function allVoices() { return hasBrowserVoices() ? synth.getVoices() : []; }

  function pickVoice(profile, lang) {
    const voices = allVoices();
    const matching = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(lang));
    if (!matching.length) return null;
    const hint = profile.gender === 'm' ? maleHints : femaleHints;
    const other = profile.gender === 'm' ? femaleHints : maleHints;
    const preferred = matching.filter((v) => hint.test(v.name) && !(profile.gender === 'm' && femaleHints.test(v.name)));
    const neutral = matching.filter((v) => !other.test(v.name));
    const pool = preferred.length ? preferred : (neutral.length ? neutral : matching);
    // Give characters sharing a gender different voices when the device has several.
    const sameGender = profiles.filter((p) => p.gender === profile.gender);
    return pool[sameGender.indexOf(profile) % pool.length];
  }

  function release(element) {
    if (!element) return;
    element.onended = null;
    element.onerror = null;
    element.pause();
    const source = element.currentSrc || element.src;
    if (source?.startsWith('blob:')) URL.revokeObjectURL(source);
    element.removeAttribute('src');
    element.load();
  }

  function stop() {
    generation += 1;
    clearTimeout(pending);
    pending = undefined;
    if (audio) {
      release(audio);
      audio = null;
    }
    if (hasBrowserVoices()) synth.cancel();
    report('idle', '');
  }

  function playCatVoice() {
    const ticket = generation;
    const clipNumber = (catTurn++ % 4) + 1;
    let clip;
    try {
      clip = new Audio(new URL(`cat-sound-${clipNumber}.mp3`, document.baseURI).href);
      clip.volume = .85;
      audio = clip;
      clip.onended = () => {
        release(clip);
        if (audio === clip) audio = null;
        if (ticket === generation) report('idle', '');
      };
      clip.onerror = () => {
        release(clip);
        if (audio === clip) audio = null;
        if (ticket === generation) report('error', 'Nini’s cat sound could not play. Her subtitle is still visible.');
      };
      report('loading', 'Loading Nini’s cat sound…');
      Promise.resolve(clip.play())
        .then(() => { if (ticket === generation) report('playing', 'Playing Nini’s cat sound…'); })
        .catch((error) => {
          if (ticket !== generation) return;
          release(clip);
          if (audio === clip) audio = null;
          console.error('Nini cat sound failed:', error);
          report('error', 'Nini’s cat sound could not play. Her subtitle is still visible.');
        });
    } catch (error) {
      if (clip) { release(clip); if (audio === clip) audio = null; }
      console.error('Nini cat sound failed:', error);
      report('error', 'Nini’s cat sound could not play. Her subtitle is still visible.');
    }
  }

  const momentTweaks = { pressed: [1.06, 1.08], admission: [0.95, 0.92], opening: [1, 1], testimony: [1, 1] };

  function speakWithBrowser(line, profile, ticket) {
    if (!hasBrowserVoices()) {
      report('error', 'Voices are unavailable in this browser. You can still read every subtitle.');
      return;
    }
    let spokenText = line.spokenText || line.text;
    let voice = null;
    if (profile.id === 'gojo') {
      const japanese = line.spokenText || japaneseDialogue.get(line.text);
      const jaVoice = japanese ? pickVoice(profile, 'ja') : null;
      if (jaVoice) { spokenText = japanese; voice = jaVoice; } else spokenText = line.text;
    }
    if (!voice) voice = pickVoice(profile, 'en');
    const utterance = new SpeechSynthesisUtterance(spokenText.replace(/[“”]/g, ''));
    const [pitchMul, rateMul] = momentTweaks[line.moment] || [1, 1];
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || 'en-US';
    utterance.pitch = Math.min(2, Math.max(0, profile.pitch * pitchMul));
    utterance.rate = Math.min(2, Math.max(0.5, profile.rate * rateMul));
    utterance.onstart = () => { if (ticket === generation) report('playing', `Playing ${profile.name}…`); };
    utterance.onend = () => { if (ticket === generation) report('idle', ''); };
    utterance.onerror = (event) => {
      if (ticket !== generation || event.error === 'interrupted' || event.error === 'canceled') return;
      console.error('Browser voice failed:', event.error);
      report('error', 'The voice could not be played. Subtitles remain available.');
    };
    synth.speak(utterance);
  }

  function localClip(line, profile) {
    const file = window.NiniVoiceManifest?.[`${profile.id}|${line.text}`];
    return file ? new URL(`voices/${file}`, document.baseURI).href : null;
  }

  async function speakLocal(src, profile, ticket) {
    const clip = new Audio(src);
    audio = clip;
    clip.onended = () => {
      release(clip);
      if (audio === clip) audio = null;
      if (ticket === generation) report('idle', '');
    };
    clip.onerror = () => {
      release(clip);
      if (audio === clip) audio = null;
      if (ticket === generation) report('error', 'The voice could not play. Subtitles remain available.');
    };
    await clip.play();
    if (ticket === generation) report('playing', `Playing ${profile.name}…`);
  }

  function speak(line) {
    stop();
    if (!line?.text) return;
    if (line.speaker === 'nini') {
      playCatVoice();
      return;
    }
    const profile = profiles.find((person) => person.id === line.speaker);
    if (!profile) {
      report('error', 'No voice is assigned to this speaker.');
      return;
    }
    if (!isAvailable()) {
      report('error', 'Voices are unavailable in this browser. You can still read every subtitle.');
      return;
    }
    const ticket = generation;
    const src = localClip(line, profile);
    report('loading', `Loading ${profile.name}’s voice…`);
    pending = setTimeout(async () => {
      pending = undefined;
      if (ticket !== generation) return;
      if (!src) { speakWithBrowser(line, profile, ticket); return; }
      try {
        await speakLocal(src, profile, ticket);
      } catch (error) {
        if (ticket !== generation) return;
        if (audio) { release(audio); audio = null; }
        if (error?.name === 'NotAllowedError') {
          report('error', 'Tap anywhere, then try again: the browser blocked audio.');
          return;
        }
        console.warn('Local voice failed; using a browser voice instead:', error);
        speakWithBrowser(line, profile, ticket);
      }
    }, 60);
  }

  // Some browsers load their voice list asynchronously.
  if (hasBrowserVoices()) {
    synth.getVoices();
    synth.addEventListener?.('voiceschanged', () => synth.getVoices());
  }

  window.NiniVoiceCast = {
    profiles,
    isAvailable,
    setStatus(callback) { report = callback; },
    speak,
    stop,
  };
})();