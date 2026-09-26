'use strict';

const cast = [
  { id: 'alhanouf', name: 'Alhanouf', index: 0, role: 'Your suspiciously prepared friend' },
  { id: 'munirah', name: 'Munirah', index: 1, role: 'The very casual eyewitness' },
  { id: 'hadeel', name: 'Hadeel', index: 2, role: 'Self-appointed evidence expert' },
  { id: 'norah', name: 'Norah', index: 3, role: 'Keeper of the suspicious timeline' },
  { id: 'old-man', name: 'The old man', index: 4, role: 'Gatekeeper, apparently' },
  { id: 'old-lady', name: 'The old lady', index: 5, role: 'Expert in extremely flexible history' },
  { id: 'gojo', name: 'Satoru Gojo', index: 6, role: 'The strongest. Allegedly helpful.' },
  { id: 'nini', name: 'Nini', index: 7, role: 'Head of the household' },
];

const evidence = [
  {
    id: 'photo',
    name: 'Hallway photograph',
    text: 'At 7:10 p.m., Munirah is photographed entering the conservatory carrying a large silver box. The wall clock is visible.',
    place: 0,
  },
  {
    id: 'seal',
    name: 'Unbroken wax seal',
    text: 'A close-up of the silver box at 7:12 p.m. Its blue wax seal is intact. It is stamped with a tiny paw.',
    place: 0,
  },
  {
    id: 'power',
    name: 'House power log',
    text: 'The house circuit monitor records uninterrupted power from 7:00 to 7:30 p.m. The hallway camera also runs continuously.',
    place: 1,
  },
  {
    id: 'gate',
    name: 'Gate camera log',
    text: 'From 6:30 to 8:00 p.m., nobody leaves the property. The only arrival is Gojo at 6:45 p.m., confidently using the wrong doorbell.',
    place: 1,
  },
  {
    id: 'care',
    name: 'Handling instructions',
    text: 'Attached to the silver box: “Keep cool. Carry level. Fragile contents. Do not open until the signal.” Written today.',
    place: 2,
  },
  {
    id: 'trolley',
    name: 'Trolley photograph',
    text: 'At 7:20 p.m., Gojo pushes the silver box toward the locked dining room on a squeaky trolley. His blindfold is unmistakable.',
    place: 2,
  },
  {
    id: 'plan',
    name: 'Folded assignment sheet',
    text: 'Written by Alhanouf: “Munirah: transfer. Hadeel: seal. Norah: lights story. Old man: gate story. Old lady: provenance. Gojo: final delivery. Nini: distraction. Wait for Rudy to solve it.”',
    place: 3,
  },
  {
    id: 'nini',
    name: 'Nini’s paw-print approval',
    text: 'A note on the back of the assignment sheet: “Nini approves the plan.” Beneath it: a blue paw print. The same blue ink is on Nini’s right paw.',
    place: 3,
  },
];

const locations = [
  { name: 'The conservatory', detail: 'A photograph and a close look at the seal.' },
  { name: 'The security desk', detail: 'Power and gate records from the house.' },
  { name: 'The service corridor', detail: 'A careful note and a very noisy trolley.' },
  { name: 'Nini’s favorite chair', detail: 'The household manager kept a paper trail.' },
];

const locationRemarks = [
  'A clock in a photograph? Clocks can be dramatic. Perhaps this one was acting.',
  'Power logs are only numbers. I prefer eyewitnesses who disagree loudly.',
  'Wheels prove movement, not motive. I have personally rolled a chair for no reason.',
  'A written plan is just an ambitious to-do list. Nini approves many things with her paws.',
];

const witnesses = [
  {
    id: 'munirah',
    name: 'Munirah',
    role: 'The very casual eyewitness',
    label: 'The delivery',
    interruption: 'Objection to all photographs. Cameras are notorious for being accurate at inconvenient moments.',
    statements: [
      'I was minding my own business. A rare and beautiful thing.',
      'I never entered the conservatory that evening.',
      'Nini seemed upset. Or hungry. With cats, there is a margin of error.',
    ],
    press: [
      'Ask me anything, Rudy. Preferably about a different evening.',
      'Not even for one second. Definitely not carrying anything.',
      'She stared at the silver box. Then at me. It felt like a performance review.',
    ],
    wrong: 1,
    proof: 'photo',
    admit: 'Fine! I carried the box into the conservatory at 7:10. But I was told to keep it level, and I never opened it. Hadeel checked the seal.',
    hint: 'Find something that places Munirah inside the conservatory.',
  },
  {
    id: 'hadeel',
    name: 'Hadeel',
    role: 'Self-appointed evidence expert',
    label: 'The broken seal',
    interruption: 'Rudy, an intact seal is exactly what a master criminal would want you to see. Somehow.',
    statements: [
      'As the unofficial expert, I examined the box at 7:12.',
      'The wax seal was already broken when I checked it at 7:12.',
      'Therefore, obviously, a criminal had been there. I watched a documentary.',
    ],
    press: [
      'Unofficial is still a kind of official. Emotionally.',
      'Completely broken. Beyond repair. A tragedy in wax.',
      'One documentary. But I took it very seriously.',
    ],
    wrong: 1,
    proof: 'seal',
    admit: 'The seal was intact. I checked it because we needed the contents untouched. Nobody had stolen anything from inside. Please do not ask who “we” is.',
    hint: 'Compare Hadeel’s exact inspection time with the close-up of the box.',
  },
  {
    id: 'norah',
    name: 'Norah',
    role: 'Keeper of the suspicious timeline',
    label: 'The blackout',
    interruption: 'Technically a working camera can still be emotionally in the dark.',
    statements: [
      'At 7:15 the whole house lost power. Every circuit went dead.',
      'That would have been the perfect moment for a thief.',
      'I know what darkness looks like. I am very qualified.',
    ],
    press: [
      'Every circuit. Not just a dim lamp. A complete power outage.',
      'A hypothetical thief. Who I hypothetically do not know.',
      'The fact that I rehearsed this does not make it untrue. Wait.',
    ],
    wrong: 0,
    proof: 'power',
    admit: 'There was no blackout. Rudy, I was asked to give you a convincing window for the theft. Apparently I chose a window with a working security camera.',
    hint: 'A claim about every circuit needs an electrical record.',
  },
  {
    id: 'old-man',
    name: 'The old man',
    role: 'Gatekeeper, apparently',
    label: 'The getaway',
    interruption: 'A stranger could have left invisibly. Gojo, please do not volunteer to demonstrate.',
    statements: [
      'I have guarded this gate for forty years. Since approximately this afternoon.',
      'A masked stranger left through the gate with the box at 7:25.',
      'Rudy, you can trust me. I own a very serious cardigan.',
    ],
    press: [
      'Experience is a state of mind, Rudy.',
      'Yes, left the property. At 7:25 precisely. Through this very gate.',
      'The cardigan has pockets. That is practically a credential.',
    ],
    wrong: 1,
    proof: 'gate',
    admit: 'Nobody left. The silver box is still somewhere inside the house. Alhanouf said I could improvise. The cardigan part was true.',
    hint: 'Check whether anyone could have left the property at 7:25.',
  },
  {
    id: 'old-lady',
    name: 'The old lady',
    role: 'Expert in extremely flexible history',
    label: 'The ancient treasure',
    interruption: 'Gold can be delicate. Have you ever asked a coin how it feels, Rudy?',
    statements: [
      'Nini inherited a fortune from an ancient feline dynasty.',
      'The contents are solid gold coins. Nothing fragile or sensitive to heat.',
      'I knew her great-grandmother. A remarkable negotiator.',
    ],
    press: [
      'A dynasty so ancient that there are no records. Very convenient.',
      'Solid gold. Rudy, you could tip the box upside down without damaging a thing.',
      'She negotiated three breakfasts a day. Respect.',
    ],
    wrong: 1,
    proof: 'care',
    admit: 'There are no ancient gold coins. I made up the royal history. Whatever is inside must stay cool and level. And Rudy, you must not see it too early.',
    hint: 'Which physical instructions would make no sense for solid gold coins?',
  },
  {
    id: 'gojo',
    name: 'Satoru Gojo',
    role: 'The strongest. Allegedly helpful.',
    label: 'The impossible transport',
    interruption: 'Perhaps the trolley teleported while Gojo walked beside it. Case solved?',
    statements: [
      'Relax. The strongest person in the room has arrived.',
      'At 7:20 I teleported the box. I never touched a trolley.',
      'Could I solve this instantly? Sure. Am I making it dramatic? Also sure.',
    ],
    press: [
      'Rudy, your objection to that statement is noted and ignored.',
      'No wheels, no pushing, no squeaking. Pure technique.',
      'Some people call it obstruction. I call it excellent pacing.',
    ],
    wrong: 1,
    proof: 'trolley',
    admit: 'Okay, I used the trolley. Even limitless power should respect “carry level.” I delivered the box to the locked dining room. On Alhanouf’s instructions.',
    hint: 'Find a visual record of Gojo at 7:20. His confidence is not evidence.',
  },
  {
    id: 'alhanouf',
    name: 'Alhanouf',
    role: 'Your suspiciously prepared friend',
    label: 'The mastermind',
    interruption: 'That handwriting could belong to anyone with my exact handwriting.',
    statements: [
      'I simply wanted justice for Nini. And maybe a little courtroom drama.',
      'None of us coordinated anything. These are all independent witnesses.',
      'Rudy, you should really solve the case before opening the dining room.',
    ],
    press: [
      'Justice, suspense, excellent presentation. The essentials.',
      'No assignments. No plan. Certainly nothing in my handwriting.',
      'For... procedural reasons. Yes. Very serious procedural reasons.',
    ],
    wrong: 1,
    proof: 'plan',
    admit: 'Rudy, you found the plan. I organized the whole mystery. Everyone played a part. There was never a thief escaping with Nini’s treasure. But there is one witness left.',
    hint: 'Look for a single document linking everyone’s role.',
  },
];

const openingLines = [
  { speaker: 'alhanouf', text: 'Order! Nini’s silver box has vanished. A priceless treasure. Or moderately priced. Focus on the crime.' },
  { speaker: 'munirah', text: 'I told you I was nowhere near the conservatory. Why is everyone looking at me?' },
  { speaker: 'hadeel', text: 'Because the blue seal was broken! I checked at 7:12. This is basic evidence.' },
  { speaker: 'munirah', text: 'You said it was perfect ten minutes ago!' },
  { speaker: 'alhanouf', text: 'Two contradictory statements in thirty seconds. Honestly, I am proud of us.' },
  { speaker: 'norah', text: 'At 7:15 the power went out. Whoever did it used the darkness.' },
  { speaker: 'old-man', text: 'Impossible. I saw a masked stranger leave through the gate at 7:25.' },
  { speaker: 'norah', text: 'How did you see anyone during a blackout?' },
  { speaker: 'old-lady', text: 'None of you understand its value. Nini descends from royalty. The box holds ancient gold coins.' },
  { speaker: 'nini', text: 'Mrrrow.' },
  { speaker: 'gojo', text: 'Nini says the old lady is convincing. She also says I am the strongest witness.' },
  { speaker: 'alhanouf', text: 'There you have it: a blackout, a getaway, ancient gold, and a cat endorsement. Four clues. Possibly five if we count my intuition.' },
  { speaker: 'gojo', text: 'For the record, I moved the box with teleportation. Effortless. No trolley involved.' },
  { speaker: 'hadeel', text: 'Then why did I hear squeaking in the corridor?' },
  { speaker: 'alhanouf', text: 'Could have been the old man’s cardigan. We cannot rule it out.' },
  { speaker: 'old-man', text: 'My cardigan does not squeak.' },
  { speaker: 'nini', text: 'Mrrp!' },
  { speaker: 'alhanouf', text: 'See? Even Nini objects. Unless that means lunch. Rudy, you have heard everyone. Please stop this before they argue about the furniture.' },
];

const closingLines = [
  { speaker: 'you', text: 'Enough. I’ll find out what happened to Nini’s treasure.' },
  { speaker: 'alhanouf', text: 'A splendid choice. I volunteer to offer helpful commentary, dubious theories, and absolutely no obstruction.' },
  { speaker: 'nini', text: 'Mrrp.' },
];

const privateLines = [
  { speaker: 'alhanouf', text: 'Rudy, you silenced the whole room. Bold. Before you go searching, consider a much simpler theory: the box got bored and left.' },
  { speaker: 'you', text: "Boxes don't get bored." },
  { speaker: 'alhanouf', text: 'That is exactly what a box would want you to think, Rudy.' },
  { speaker: 'you', text: 'Munirah and Hadeel disagree about the seal. Norah and the old man disagree about the lights. I will check the records.' },
  { speaker: 'alhanouf', text: 'Or we could hold a vote. Eight witnesses, one cat, and absolutely no tedious timestamps.' },
  { speaker: 'you', text: 'The timestamps are why you want a vote.' },
  { speaker: 'alhanouf', text: 'Rudy is already accusing the master of ceremonies. This is going to take all evening.' },
];

const privateBranches = {
  facts: [
    { speaker: 'alhanouf', text: 'Facts? How daring. Rudy, you will find I have an explanation for almost all of them.' },
    { speaker: 'you', text: 'Almost?' },
    { speaker: 'alhanouf', text: 'A word chosen by my legal counsel. Who is also me.' },
  ],
  box: [
    { speaker: 'alhanouf', text: 'Silver. Rectangular. Very private. Nothing suspicious about me knowing that.' },
    { speaker: 'you', text: 'You sound like someone who has seen it.' },
    { speaker: 'alhanouf', text: 'I have seen many rectangles. Rudy, let us interview a few before you start investigating.' },
  ],
};

const hallLines = [
  { speaker: 'munirah', text: 'I saw someone moving down this hall. I am not volunteering a name.' },
  { speaker: 'alhanouf', text: 'A nameless hallway ghost! Finally, a theory with personality.' },
  { speaker: 'hadeel', text: 'I heard a trolley. Was it carrying the box?' },
  { speaker: 'gojo', text: 'That was the sound of limitless power. Sometimes it squeaks.' },
  { speaker: 'norah', text: 'How would anyone see a trolley in a blackout?' },
  { speaker: 'alhanouf', text: 'The trolley could have been luminous. Have we examined its emotional state?' },
  { speaker: 'old-lady', text: 'Treasure tends to attract strange stories. Especially when somebody writes the stories first.' },
  { speaker: 'old-man', text: 'I saw a stranger. The gate is also making me reconsider that statement.' },
  { speaker: 'alhanouf', text: 'The hallway is clearly haunted by an extremely organized thief. Rudy, please stop comparing the times.' },
  { speaker: 'you', text: 'The camera and gate log will settle that.' },
  { speaker: 'alhanouf', text: 'But what if the camera is biased against ghosts? A serious question. Write it down, Rudy.' },
  { speaker: 'nini', text: 'Mrrp.' },
  { speaker: 'alhanouf', text: 'Nini seconds the motion. Or requests a snack. Either way, we should delay this inquiry.' },
];

const timelineLines = [
  { speaker: 'alhanouf', text: 'Excellent collection. Now arrange the facts. Or arrange them alphabetically; I find that looks official.' },
  { speaker: 'hadeel', text: 'The photograph of the seal has a time on it. You cannot put it wherever you like.' },
  { speaker: 'alhanouf', text: 'Hadeel, please stop helping Rudy with the evidence board.' },
  { speaker: 'you', text: 'Which sequence is actually supported by the records?' },
  { speaker: 'alhanouf', text: 'One of them contains a dramatic escape. I am just saying it would make a better story.' },
];

const doorArrivalLines = [
  { speaker: 'gojo', text: 'I brought it here. Following instructions. The room was already locked when I left.' },
  { speaker: 'munirah', text: 'I carried it in. He carried it here. Nobody ran away with it.' },
  { speaker: 'alhanouf', text: 'Unless someone ran away very quietly while standing perfectly still. Think bigger, Rudy.' },
  { speaker: 'old-lady', text: 'Whatever is inside is safe, dear. It was never meant to disappear.' },
  { speaker: 'hadeel', text: 'The blue seal is intact. Whatever is in that box, nobody opened it.' },
  { speaker: 'norah', text: 'And there was never a blackout to hide an escape.' },
  { speaker: 'alhanouf', text: "We could open it now, Rudy. But then you'd miss my very carefully prepared testimony, and that would break my heart." },
  { speaker: 'old-man', text: 'The door has not been forced. I have an eye for locks and cardigans.' },
  { speaker: 'alhanouf', text: 'Perhaps the lock simply trusts the thief. We should investigate its friendships.' },
  { speaker: 'nini', text: 'Mrrrow.' },
  { speaker: 'you', text: 'Before I question you, I want a closer look at the lock and the seal.' },
];

const doorInspectionLines = [
  { speaker: 'you', text: 'The lock is untouched, the blue seal is whole, and the box is exactly where Gojo brought it.' },
  { speaker: 'alhanouf', text: 'A theory: the thief stole the idea of stealing it. Does that count, Rudy?' },
  { speaker: 'you', text: 'It counts as another attempt to delay me.' },
  { speaker: 'you', text: 'One more story to challenge, Alhanouf. Then we talk to Nini.' },
];

const state = {
  phase: 'password',
  openingIndex: 0,
  openingHistory: [],
  closingIndex: 0,
  privateIndex: 0,
  privateChoice: null,
  privateBranchIndex: 0,
  privateHistory: [],
  found: [],
  places: [],
  selectedPlace: null,
  hallSeen: false,
  hallIndex: 0,
  hallHistory: [],
  timelineIndex: 0,
  timelineHistory: [],
  doorIndex: 0,
  doorInspected: false,
  doorHistory: [],
  witness: 0,
  statement: 0,
  solved: false,
  feedback: '',
  mistakes: 0,
  activeSpeakers: [],
  transcript: [],
};

let soundOn = false;
let voiceOn = false;
const voiceCast = window.NiniVoiceCast;
let audioCtx;
const app = document.querySelector('#app');
const record = document.querySelector('#record');

function personById(id) {
  return cast.find((person) => person.id === id);
}

function portraitStyle(index) {
  const positions = [
    [0, 0],
    [33.333, 0],
    [66.666, 0],
    [100, 0],
    [0, 100],
    [33.333, 100],
    [66.666, 100],
    [100, 100],
  ];
  const [x, y] = positions[index] || positions[0];
  return `--sprite-x:${x}%;--sprite-y:${y}%`;
}

function beep() {
  if (!soundOn) return;
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(console.warn);
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.frequency.setValueAtTime(520, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(170, audioCtx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.23);
  } catch {
    // Sound is optional; the text flow remains fully playable.
  }
}

let staticSource;
function stopTvStatic() {
  if (staticSource) {
    staticSource.stop();
    staticSource = null;
  }
}
document.addEventListener('tv-glitch-stop', stopTvStatic);
document.addEventListener('tv-glitch-start', () => {
  if (!soundOn || !audioCtx || audioCtx.state !== 'running' || document.hidden) return;
  stopTvStatic();
  const duration = 1.2;
  const buffer = audioCtx.createBuffer(1, Math.ceil(audioCtx.sampleRate * duration), audioCtx.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i += 1) samples[i] = Math.random() * 2 - 1;
  const source = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  filter.type = 'lowpass';
  filter.frequency.value = 3200;
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(.012, now + .12);
  gain.gain.setValueAtTime(.012, now + .95);
  gain.gain.linearRampToValueAtTime(0, now + duration);
  staticSource = source;
  source.onended = () => {
    source.disconnect();
    filter.disconnect();
    gain.disconnect();
    if (staticSource === source) staticSource = null;
  };
  source.start(now);
  source.stop(now + duration);
});

function shout(text) {
  beep();
  const element = document.querySelector('#shout');
  element.textContent = text;
  element.classList.remove('show');
  void element.offsetWidth;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 650);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function getCurrentLine() {
  if (state.phase === 'opening') return openingLines[state.openingIndex];
  if (state.phase === 'openingClose') return closingLines[state.closingIndex];
  if (state.phase === 'private') return state.privateChoice
    ? privateBranches[state.privateChoice][state.privateBranchIndex]
    : privateLines[state.privateIndex];
  if (state.phase === 'hall') return hallLines[state.hallIndex];
  if (state.phase === 'timeline') return timelineLines[state.timelineIndex];
  if (state.phase === 'doorInvestigation') return state.doorInspected
    ? doorInspectionLines[state.doorIndex] : doorArrivalLines[state.doorIndex];
  if (state.phase === 'trial') {
    const witness = witnesses[state.witness];
    return { speaker: witness.id, text: state.solved ? witness.admit : witness.statements[state.statement] };
  }
  if (state.phase === 'nini') return state.solved
    ? { speaker: 'gojo', text: 'Correction: she approved everything. She also says you are doing very well, Rudy.' }
    : { speaker: 'nini', text: 'Mrrp. Meow. Mrrrow.' };
  return null;
}

function speakLine(line) {
  if (!voiceOn || !line) return;
  const moment = line.moment || (
    state.phase === 'openingClose' ? (line.speaker === 'you' ? 'resolve' : 'opening')
      : state.phase === 'trial' ? (state.solved ? 'admission' : 'testimony')
        : state.phase === 'nini' ? (line.speaker === 'nini' ? 'reaction' : 'translation')
          : 'opening'
  );
  voiceCast?.speak({ ...line, moment });
}

function setActiveSpeakers(ids) {
  state.activeSpeakers = [...new Set(ids.filter((id) => personById(id)))];
}

function trialSpeakers(witness) {
  return witness.id === 'alhanouf' ? [witness.id] : [witness.id, 'alhanouf'];
}

function addTranscript(speakerId, text) {
  const speaker = personById(speakerId);
  state.transcript.push({
    speakerId,
    speaker: speaker ? speaker.name : 'Rudy',
    text,
  });
  state.transcript = state.transcript.slice(-10);
}

function addOpeningHistory(line) {
  const speaker = personById(line.speaker);
  state.openingHistory.push({
    speakerId: line.speaker,
    speaker: speaker ? speaker.name : 'Rudy',
    text: line.text,
  });
}

function historyEntry(line) {
  return {
    speakerId: line.speaker,
    speaker: personById(line.speaker)?.name || 'Rudy',
    text: line.text,
  };
}

function transcriptMarkup(entries, count = 3) {
  const visible = entries.slice(-count);
  if (!visible.length) return '';
  return `<ol class="dialogueHistory" aria-label="Recent conversation">${visible.map((entry) => `
    <li class="${state.activeSpeakers.includes(entry.speakerId) ? 'is-current' : ''}">
      <span>${entry.speaker}</span><q>${entry.text}</q>
    </li>`).join('')}</ol>`;
}

function rosterMarkup(activeIds) {
  return `<div class="courtRoster" role="list" aria-label="Everyone in the courtroom">${cast.map((person) => {
    const isActive = activeIds.includes(person.id);
    return `<div class="rosterMember ${isActive ? 'is-speaking' : ''}" role="listitem" ${isActive ? 'aria-current="true"' : ''} data-testid="roster-member-${person.id}">
      <div class="portrait rosterPortrait ${person.id === 'nini' ? 'niniPortrait' : ''}" style="${portraitStyle(person.index)}" role="img" aria-label="Pixel portrait of ${person.name}"></div>
      <span>${person.name}</span>${isActive ? '<small>Speaking</small>' : ''}
    </div>`;
  }).join('')}</div>`;
}

function speakerFocusMarkup(speakerId, label = 'NOW SPEAKING') {
  if (speakerId === 'you') {
    return `<div class="speakerFocus counselFocus"><img class="youPortrait" src="you-portrait.png" alt="Pixel-art portrait of Rudy, defense counsel"><div><span>${label}</span><h2>Rudy</h2><p>Defense counsel</p></div></div>`;
  }
  const person = personById(speakerId) || cast[0];
  return `<div class="speakerFocus"><div class="portrait focusPortrait ${person.id === 'nini' ? 'niniPortrait' : ''}" style="${portraitStyle(person.index)}" role="img" aria-label="Pixel portrait of ${person.name}"></div><div><span>${label}</span><h2>${person.name}</h2><p>${person.role}</p></div></div>`;
}

function renderRoom(speakerIds, eyebrow = 'THE FULL CAST / ONE ROOM, EIGHT STORIES', sceneClass = '') {
  const spotlight = speakerIds[0] || 'alhanouf';
  return `<section class="sharedRoom ${sceneClass}" aria-label="The whole group is still in the house">
    <div class="roomBackdrop">
      <span class="roomEyebrow">${eyebrow}</span>
      ${speakerFocusMarkup(spotlight)}
    </div>
    ${rosterMarkup(speakerIds)}
  </section>`;
}

function renderPassword() {
  app.innerHTML = `<section class="passwordGate" aria-labelledby="passwordTitle">
    <div class="passwordFrame">
      <div class="passwordScene"><img src="password-cast.webp" width="1672" height="941" alt="The whole courtroom cast faces you, with Nini the cat beside them."></div>
      <div class="passwordPanel">
        <h1 id="passwordTitle">PASSWORD REQUIRED</h1>
        <p>Enter the password to begin the case.</p>
        <form id="passwordForm" novalidate>
          <input id="passwordInput" type="password" inputmode="numeric" autocomplete="off" maxlength="8" aria-label="Case password" aria-describedby="passwordError">
          <button class="passwordEnter" type="submit">ENTER</button>
        </form>
        <div class="passwordHintRow">
          <button class="passwordHintButton" type="button" data-action="password-hint">Hint</button>
          <span id="passwordHint" role="status" hidden>your birth date.</span>
        </div>
        <p id="passwordError" role="alert" hidden>Incorrect password. Try again.</p>
      </div>
    </div>
  </section>`;
}

function renderTitle() {
  app.innerHTML = `<section class="start">
    <div class="intro">
      <p class="eyebrow">A COURTROOM MYSTERY</p>
      <span class="tag">THE PEOPLE v. ABSOLUTELY EVERYONE</span>
      <h1>One cat.<br>One treasure.<br><em>Eight suspects.</em></h1>
      <p class="lead">Nini’s precious treasure has vanished. Your friends have alibis. A little too many alibis. Take the case and find the lie.</p>
      <button class="primary" type="button" data-action="enter-room" data-testid="button-enter-room">Take the case <span aria-hidden="true">→</span></button>
      <div class="fine">Investigate · Cross-examine · Present evidence<br>About 15–20 minutes · No legal experience required<br><a class="voiceStudioLink" href="voices.html">Hear the cast’s voices →</a></div>
    </div>
    <div class="sceneCover"><div class="coverCaption"><p>“Everyone here is innocent.”</p><span class="fine">Which is exactly what a room full of suspects would say.</span></div></div>
  </section>
  <div class="footerLine"><span>CASE 001 / THE MISSING TREASURE</span><span>An original fan-made courtroom mystery</span></div>`;
}

function allCharactersHaveSpoken() {
  const heard = new Set(openingLines.slice(0, state.openingIndex + 1).map((line) => line.speaker));
  return cast.every((person) => heard.has(person.id));
}

function renderOpening() {
  const line = openingLines[state.openingIndex];
  const speaker = personById(line.speaker);
  const readyToStop = state.openingIndex === openingLines.length - 1 && allCharactersHaveSpoken();
  const action = readyToStop
    ? '<button class="objection stopButton" type="button" data-action="stop-opening" data-testid="button-stop-opening">STOP! I’ll solve this.</button>'
    : '<button class="primary" type="button" data-action="next-opening" data-testid="button-next-opening">Next line <span aria-hidden="true">→</span></button>';
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">SCENE 0 / EVERYONE ARGUES</p><h2>The full room has the floor.</h2></div>
    <span class="sceneCounter">LINE ${String(state.openingIndex + 1).padStart(2, '0')} / ${openingLines.length}</span>
  </div>
  ${renderRoom([line.speaker])}
  <section class="dialoguePanel openingDialogue">
    <div class="dialoguePanelHead"><span class="eyebrow">CONVERSATION SO FAR</span><span class="fine">Advance one line at a time</span></div>
    ${transcriptMarkup(state.openingHistory, 3)}
    <article class="currentLine" aria-live="polite" aria-atomic="true">
      <span class="dialogueSpeaker">${speaker ? speaker.name : 'Rudy'}</span>
      <p>“${line.text}”</p>
    </article>
    <div class="dialogueControls">
      <span class="fine">Everyone is still in the courtroom.</span>
      <div class="dialogueNav">
        <button class="quiet" type="button" data-action="previous-opening" data-testid="button-previous-opening" ${state.openingIndex === 0 ? 'disabled' : ''}>← Previous</button>
        ${action}
      </div>
    </div>
  </section>`;
}

function renderOpeningClose() {
  const line = closingLines[state.closingIndex];
  const person = personById(line.speaker);
  const lastLine = state.closingIndex === closingLines.length - 1;
  const control = lastLine
    ? '<button class="primary" type="button" data-action="enter-private" data-testid="button-enter-private">Speak with Alhanouf <span aria-hidden="true">→</span></button>'
    : '<button class="primary" type="button" data-action="next-closing" data-testid="button-next-closing">Continue <span aria-hidden="true">→</span></button>';
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">SCENE 0 / THE ROOM GOES QUIET</p><h2>That is enough testimony for now.</h2></div>
    <span class="sceneCounter">A moment with the full cast</span>
  </div>
  ${renderRoom([line.speaker])}
  <section class="dialoguePanel openingDialogue">
    <div class="dialoguePanelHead"><span class="eyebrow">CONVERSATION SO FAR</span><span class="fine">The case is yours now</span></div>
    ${transcriptMarkup(state.openingHistory, 3)}
    <article class="currentLine" aria-live="polite" aria-atomic="true">
      <span class="dialogueSpeaker">${person ? person.name : 'Rudy'}</span>
      <p>“${line.text}”</p>
    </article>
    <div class="dialogueControls">
      <span class="fine">${lastLine ? 'Four places. Eight exhibits.' : 'The courtroom is listening.'}</span>
      <div class="dialogueNav">
        <button class="quiet" type="button" data-action="previous-closing" data-testid="button-previous-closing">← Previous</button>
        ${control}
      </div>
    </div>
  </section>`;
}

function renderPrivate() {
  const line = getCurrentLine();
  const person = personById(line.speaker);
  const choosing = !state.privateChoice && state.privateIndex === privateLines.length - 1;
  const finished = state.privateChoice && state.privateBranchIndex === privateBranches[state.privateChoice].length - 1;
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">SCENE 1 / A PRIVATE WORD</p><h2>Alhanouf has a theory.</h2></div>
    <span class="sceneCounter">A MOMENT AWAY FROM THE ROOM</span>
  </div>
  <section class="duoStage" aria-label="Rudy and Alhanouf speaking privately">
    <div class="duoPortrait ${line.speaker === 'you' ? 'is-speaking' : ''}"><img src="you-portrait.png" alt="Rudy, the defense attorney"><span>Rudy</span></div>
    <span class="duoDivider" aria-hidden="true">✧</span>
    <div class="duoPortrait ${line.speaker === 'alhanouf' ? 'is-speaking' : ''}"><div class="portrait focusPortrait" style="${portraitStyle(0)}" role="img" aria-label="Alhanouf"></div><span>Alhanouf</span></div>
  </section>
  <section class="dialoguePanel">
    <div class="dialoguePanelHead"><span class="eyebrow">A QUIET CONVERSATION</span><span class="fine">No choice changes the evidence</span></div>
    ${transcriptMarkup(state.privateHistory, 3)}
    <article class="currentLine" aria-live="polite"><span class="dialogueSpeaker">${person ? person.name : 'Rudy'}</span><p>“${line.text}”</p></article>
    <div class="dialogueControls">
      <span class="fine">${choosing ? 'How will you answer her?' : 'The case is still yours to solve.'}</span>
      <div class="dialogueNav privateNav">
        <button class="quiet" type="button" data-action="previous-private" ${!state.privateChoice && state.privateIndex === 0 ? 'disabled' : ''}>← Previous</button>
        ${choosing ? `<button class="secondary" type="button" data-action="private-facts">With facts. I’ll inspect the house</button>
          <button class="secondary" type="button" data-action="private-box">Tell me more about this suspicious box</button>`
          : finished ? '<button class="primary" type="button" data-action="begin-investigation" data-testid="button-begin-investigation">Investigate the house →</button>'
            : '<button class="primary" type="button" data-action="next-private">Continue →</button>'}
      </div>
    </div>
  </section>`;
}

function renderHall() {
  const line = hallLines[state.hallIndex];
  const person = personById(line.speaker);
  const finished = state.hallIndex === hallLines.length - 1;
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">SCENE 3 / FOOTSTEPS IN THE HALL</p><h2>Everyone has another theory.</h2></div>
    <span class="sceneCounter">LINE ${state.hallIndex + 1} / ${hallLines.length}</span>
  </div>
  ${renderRoom([line.speaker], 'THE SERVICE CORRIDOR / THE WHOLE GROUP', 'hallRoom')}
  <section class="dialoguePanel">
    <div class="dialoguePanelHead"><span class="eyebrow">THE INTERRUPTION</span><span class="fine">Your evidence is safe in the Court Record</span></div>
    ${transcriptMarkup(state.hallHistory, 3)}
    <article class="currentLine" aria-live="polite"><span class="dialogueSpeaker">${person ? person.name : 'Rudy'}</span><p>“${line.text}”</p></article>
    <div class="dialogueControls"><span class="fine">${finished ? 'The group falls quiet as you open your notebook.' : 'The stories keep colliding.'}</span>
      <div class="dialogueNav">
        <button class="quiet" type="button" data-action="previous-hall" ${state.hallIndex === 0 ? 'disabled' : ''}>← Previous</button>
        <button class="primary" type="button" data-action="${finished ? 'leave-hall' : 'next-hall'}">${finished ? 'Keep investigating' : 'Next line →'}</button>
      </div>
    </div>
  </section>`;
}

function renderInvestigation() {
  const selected = state.selectedPlace;
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">ACT I / INVESTIGATION</p><h2>Something doesn’t add up.</h2></div>
    <button class="quiet" type="button" data-action="record" data-testid="button-record">Court record (${state.found.length}/8)</button>
  </div>
  <div class="investigationLayout">
    <section class="investigationMain">
      <div class="brief">
        <p class="eyebrow">YOUR FIRST BRIEFING</p>
        <h2>A most serious<br>feline emergency.</h2>
        <img class="briefPortrait" src="you-portrait.png" alt="You, the defense attorney, taking charge of the investigation">
        <p>Check the rooms and keep every physical exhibit, whatever Alhanouf says about it.</p>
        <div class="notebook"><h3>Defense notes</h3><p>Search all four locations and collect the eight exhibits before the witnesses have a chance to explain them away.</p></div>
      </div>
      <div class="locationsGrid" aria-label="Investigation locations">${locations.map((location, index) => {
        const searched = state.places.includes(index);
        const foundCount = evidence.filter((item) => item.place === index && state.found.includes(item.id)).length;
        return `<button class="locationCard ${searched ? 'searched' : ''}" type="button" data-inspect="${index}" data-testid="location-${index}" aria-label="${location.name}, ${searched ? 'searched' : 'search location'}" ${selected !== null ? 'disabled' : ''}>
          <span class="locationArt" data-location="${index}" aria-hidden="true"></span>
          <span class="locationScrim" aria-hidden="true"></span>
          <span class="locationMeta"><span class="num">0${index + 1} / ${searched ? 'SEARCHED' : 'INSPECT'}</span><b>${location.name}</b><span>${location.detail}</span><small>${searched ? `EXHIBITS ${foundCount}/2` : 'TWO EXHIBITS TO FIND'}</small></span>
          ${searched ? '<span class="searchedStamp" aria-hidden="true">SEARCHED</span>' : ''}
        </button>`;
      }).join('')}</div>
      ${selected !== null ? `<section class="locationDetail" id="locationDetail" aria-label="Inspecting ${locations[selected].name}">
        <div class="locationDetailArt locationArt" data-location="${selected}" role="img" aria-label="A larger pixel-art view of ${locations[selected].name}"></div>
        <div class="locationDetailBody"><p class="eyebrow">INSPECTED / ${locations[selected].name}</p>
          ${evidence.filter((item) => item.place === selected).map((item) => `<article class="foundExhibit"><h3>${item.name}</h3><p>${item.text}</p></article>`).join('')}
          <p class="locationRemark"><b>Alhanouf:</b> “${locationRemarks[selected]}”</p>
          <p class="locationRemark"><b>Rudy:</b> “I will keep the evidence.”</p>
          <button class="primary" type="button" data-action="close-location">Return to the locations →</button>
        </div>
      </section>` : ''}
      <button class="primary investigationCTA" type="button" data-action="call-witnesses" data-testid="button-call-witnesses" ${state.found.length < 8 ? 'disabled aria-describedby="evidenceProgress"' : selected !== null ? 'disabled' : ''}>
        ${state.found.length < 8 ? `Collect all evidence (${state.found.length}/8)` : 'Arrange the timeline'}
        ${state.found.length === 8 ? '<span aria-hidden="true">→</span>' : ''}
      </button>
      ${state.found.length < 8 ? `<p class="fine" id="evidenceProgress">The courtroom opens when all eight exhibits are collected.</p>` : ''}
    </section>
    <aside class="timelineAside">
      <div class="timelineHeading"><p class="eyebrow">THE CASE AT A GLANCE</p><h3>Every minute matters.</h3></div>
      ${state.found.length === evidence.length
        ? '<img class="timelineBoardImage" src="timeline-board.png" alt="The case evidence arranged on a timeline board">'
        : `<div class="timelinePending"><span class="boardSeal" aria-hidden="true">?</span><p>${state.found.length} / 8 exhibits collected</p><span class="fine">Search all four rooms to reveal the timeline.</span></div>`}
      <p class="fine">Use the Court Record to compare each detail.</p>
    </aside>
  </div>`;
}

function renderTimeline() {
  const line = timelineLines[state.timelineIndex];
  const person = personById(line.speaker);
  const ready = state.timelineIndex === timelineLines.length - 1;
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">SCENE 4 / THE TIMELINE WALL</p><h2>Put the facts in order.</h2></div>
    <button class="quiet" type="button" data-action="record">Court record · 8</button>
  </div>
  <section class="timelineStage">
    <img class="timelineBoardImage" src="timeline-board.png" alt="Pixel-art timeline board for the collected evidence">
    <div class="timelineCast" aria-label="Rudy, Alhanouf and Hadeel at the evidence board">
      <img class="${line.speaker === 'you' ? 'is-speaking' : ''}" src="you-portrait.png" alt="Rudy">
      ${['alhanouf', 'hadeel'].map((id) => `<div class="portrait ${line.speaker === id ? 'is-speaking' : ''}" style="${portraitStyle(personById(id).index)}" role="img" aria-label="${personById(id).name}"></div>`).join('')}
    </div>
  </section>
  <section class="dialoguePanel">
    <div class="dialoguePanelHead"><span class="eyebrow">THE EVIDENCE BOARD</span><span class="fine">Use the times and photographs</span></div>
    ${transcriptMarkup(state.timelineHistory, 3)}
    <article class="currentLine" aria-live="polite"><span class="dialogueSpeaker">${person ? person.name : 'Rudy'}</span><p>“${line.text}”</p></article>
    <div class="dialogueControls">
      <span class="fine">Arrange the facts before questioning anyone.</span>
      <div class="dialogueNav">
        <button class="quiet" type="button" data-action="previous-timeline" ${state.timelineIndex === 0 ? 'disabled' : ''}>← Previous</button>
        ${ready ? '' : '<button class="primary" type="button" data-action="next-timeline">Continue →</button>'}
      </div>
    </div>
    ${ready ? `<div class="timelineChoices" role="group" aria-label="Choose the supported sequence">
      <button class="secondary" type="button" data-timeline="blackout">Blackout at 7:15 → masked stranger leaves at 7:25.</button>
      <button class="secondary" type="button" data-timeline="teleport">Gojo teleports the box at 7:20 → it vanishes outside.</button>
      <button class="secondary" type="button" data-timeline="records">Munirah carries the box at 7:10 → seal intact at 7:12 → Gojo rolls it toward the dining room at 7:20 → nobody leaves.</button>
    </div>
    <div class="feedback" role="status" aria-live="polite">${state.feedback}</div>` : ''}
  </section>`;
}

function renderTrial() {
  const witness = witnesses[state.witness];
  const activeIds = state.activeSpeakers.length ? state.activeSpeakers : [witness.id];
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">ACT II / CROSS-EXAMINATION</p><h2>${witness.label}</h2></div>
    <button class="quiet" type="button" data-action="record" data-testid="button-record">Court record · 8</button>
  </div>
  ${renderRoom(activeIds, 'THE WITNESS LIST / EVERYONE IS STILL HERE')}
  <div class="trialLayout">
    <section class="dialoguePanel trialDialogue">
      <div class="dialoguePanelHead">
        <span class="eyebrow">WITNESS ${state.witness + 1} OF ${witnesses.length + 1} / ${witness.name}</span>
        <span class="fine">${witness.role}</span>
      </div>
      ${transcriptMarkup(state.transcript, 3)}
      <div class="statementHeader">
        <span class="statementNo">TESTIMONY / ${state.statement + 1} OF 3</span>
        <div class="stepper">
          <button class="quiet" type="button" data-move="-1" aria-label="Previous statement" ${state.statement === 0 || state.solved ? 'disabled' : ''}>← Previous</button>
          <button class="quiet" type="button" data-move="1" aria-label="Next statement" ${state.statement === 2 || state.solved ? 'disabled' : ''}>Next →</button>
        </div>
      </div>
      <p class="testimony" aria-live="polite">“${witness.statements[state.statement]}”</p>
      <aside class="trialInterruption" aria-label="${witness.id === 'alhanouf' ? 'Alhanouf adds' : `Alhanouf interrupts ${witness.name}`}">
        <span>${witness.id === 'alhanouf' ? 'ALHANOUF ADDS' : `ALHANOUF INTERRUPTS ${witness.name.toUpperCase()}`}</span>
        <p>“${witness.interruption}”</p>
      </aside>
      <div class="actions">
        <button class="secondary" type="button" data-action="press" ${state.solved ? 'disabled' : ''}>Hold it! / Press</button>
        <button class="objection" type="button" data-action="present" ${state.solved ? 'disabled' : ''}>Present evidence</button>
        <button class="quiet" type="button" data-action="hint" ${state.solved ? 'disabled' : ''}>Hint</button>
        <button class="quiet" type="button" data-action="hear-interruption" ${voiceOn ? '' : 'disabled'}>Hear her · Alhanouf</button>
      </div>
      <div class="feedback trialFeedback" role="status" aria-live="polite">${state.feedback}</div>
      ${state.solved ? `<button class="primary nextWitness" type="button" data-action="next-witness" data-testid="button-next-witness">${state.witness === witnesses.length - 1 ? 'Call Nini to the stand' : 'Next witness'} <span aria-hidden="true">→</span></button>` : ''}
      <p class="fine trialTip">Press any statement for a response. Match an exhibit to the exact claim it contradicts.</p>
    </section>
    <aside class="timelineAside trialTimeline">
      <div class="timelineHeading"><p class="eyebrow">THE WITNESS LIST</p><h3>Seven stories. One paper trail.</h3></div>
      <div class="witnessProgress">${[...witnesses.map((item) => item.name), 'Nini'].map((name, index) => `
        <div class="witnessRow ${index === state.witness ? 'active' : ''} ${index < state.witness ? 'resolved' : ''}">
          <span>${name}</span><small>${index < state.witness ? '✓ Resolved' : index === state.witness ? 'On stand' : 'Waiting'}</small>
        </div>`).join('')}
      </div>
      <img class="timelineBoardImage" src="timeline-board.png" alt="The collected timeline photographs and records arranged on a case board">
      <p class="fine">Wrong exhibits earn a hint, never a game over.</p>
    </aside>
  </div>`;
}

function renderNini() {
  const activeIds = state.activeSpeakers.length ? state.activeSpeakers : ['nini', 'gojo'];
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">ACT II / THE FINAL WITNESS</p><h2>The alleged victim.</h2></div>
    <button class="quiet" type="button" data-action="record" data-testid="button-record">Court record · 8</button>
  </div>
  ${renderRoom(activeIds, 'THE WITNESS LIST / THE LAST VOICE')}
  <div class="trialLayout">
    <section class="dialoguePanel trialDialogue">
      <div class="dialoguePanelHead"><span class="eyebrow">NINI / HEAD OF HOUSEHOLD</span><span class="fine">Final witness</span></div>
      ${transcriptMarkup(state.transcript, 4)}
      <div class="statementHeader"><span class="statementNo">THE QUESTION</span></div>
      <p class="testimony niniTestimony">“${state.solved ? 'Mrrp.' : 'Mrrp. Meow. Mrrrow.'}”</p>
      <p class="translation"><b>Gojo, translating with unjustified confidence:</b> “${state.solved ? 'Correction: she approved everything. She also says you are doing very well, Rudy.' : 'She says: I knew nothing about this plan. I am an innocent victim. Also, Rudy, your shoelace looks delicious.'}”</p>
      <p class="fine">Everyone followed Alhanouf’s plan. But was Nini really unaware?</p>
      <div class="actions">
        <button class="objection" type="button" data-action="present" ${state.solved ? 'disabled' : ''}>Present evidence</button>
        <button class="quiet" type="button" data-action="nini-hint" ${state.solved ? 'disabled' : ''}>Hint</button>
        <button class="quiet" type="button" data-action="hear-japanese" ${voiceOn ? '' : 'disabled'}>Japanese · Gojo</button>
      </div>
      <div class="feedback trialFeedback" role="status" aria-live="polite">${state.feedback}</div>
      ${state.solved ? '<button class="primary nextWitness" type="button" data-action="verdict" data-testid="button-deliver-verdict">Deliver your verdict <span aria-hidden="true">→</span></button>' : ''}
    </section>
    <aside class="timelineAside trialTimeline">
      <div class="timelineHeading"><p class="eyebrow">THE WITNESS LIST</p><h3>Every voice accounted for.</h3></div>
      <div class="witnessProgress">${[...witnesses.map((item) => item.name), 'Nini'].map((name, index) => `
        <div class="witnessRow ${index === witnesses.length ? 'active' : 'resolved'}">
          <span>${name}</span><small>${index === witnesses.length ? 'On stand' : '✓ Resolved'}</small>
        </div>`).join('')}
      </div>
      <img class="timelineBoardImage" src="timeline-board.png" alt="The full set of case photographs and records on the evidence board">
      <p class="fine">The Court Record has every exhibit you collected.</p>
    </aside>
  </div>`;
}

function renderVerdict() {
  app.innerHTML = `<section class="conclusion verdictScreen">
    <p class="eyebrow">ACT III / THE DEFENSE’S CLOSING ARGUMENT</p>
    <h2>Who stole Nini’s treasure?</h2>
    <p>Seven invented stories. One willing cat. A box that never left the house.</p>
    <div class="choices">
      <button class="secondary" type="button" data-verdict="stranger">A masked stranger stole it and escaped.</button>
      <button class="secondary" type="button" data-verdict="gojo">Gojo stole it using a supernatural technique.</button>
      <button class="secondary" type="button" data-verdict="plan">Nobody. Alhanouf organized a staged theft, and everyone played along.</button>
    </div>
    <div class="feedback" role="status" aria-live="polite">${state.feedback}</div>
  </section>`;
}

function renderDoorInvestigation() {
  const lines = state.doorInspected ? doorInspectionLines : doorArrivalLines;
  const line = lines[state.doorIndex];
  const person = personById(line.speaker);
  const finished = state.doorIndex === lines.length - 1;
  app.innerHTML = `<div class="phasebar">
    <div><p class="eyebrow">SCENE 5A / THE LOCKED DINING ROOM</p><h2>The box is still sealed.</h2></div>
    <span class="sceneCounter">${state.doorInspected ? 'CLOSER LOOK' : 'AT THE DOOR'} / ${state.doorIndex + 1} OF ${lines.length}</span>
  </div>
  ${renderRoom([line.speaker], 'THE WHOLE GROUP / AT THE DINING-ROOM DOOR')}
  <section class="preDoorScene" aria-label="The still-sealed box outside the dining room">
    <div class="doorArt"><img src="dining-door.png" alt="Nini beside a sealed silver box, a trolley and the untouched dining-room door"></div>
    <div class="dialoguePanel">
      <div class="dialoguePanelHead"><span class="eyebrow">THE LOCK AND THE SEAL</span><span class="fine">Do not open the box yet</span></div>
      ${transcriptMarkup(state.doorHistory, 3)}
      <article class="currentLine" aria-live="polite"><span class="dialogueSpeaker">${person ? person.name : 'Rudy'}</span><p>“${line.text}”</p></article>
      <div class="dialogueControls"><span class="fine">${state.doorInspected ? 'The lock and seal tell the same story.' : 'Everyone can see the box. Its contents remain hidden.'}</span>
        <div class="dialogueNav">
          <button class="quiet" type="button" data-action="previous-door" ${!state.doorInspected && state.doorIndex === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="primary" type="button" data-action="${finished ? state.doorInspected ? 'call-alhanouf' : 'inspect-door' : 'next-door'}">
            ${finished ? state.doorInspected ? 'Call Alhanouf back to the floor →' : 'Inspect the lock and seal →' : 'Next line →'}
          </button>
        </div>
      </div>
    </div>
  </section>`;
}

function renderDoor() {
  app.innerHTML = `<section class="doorScene">
    <div class="doorArt"><img src="dining-door.png" alt="Nini sits beside a sealed silver box outside the closed dining-room door"></div>
    <div class="doorCaption">
      <p class="eyebrow">VERDICT / NOT GUILTY: NO THEFT OCCURRED</p>
      <h2>One last thing, Rudy.</h2>
      <div class="doorDialogue">
        <p><b>Alhanouf:</b> “Rudy, you caught every lie. The box was never stolen. And honestly… it was never Nini’s treasure.”</p>
        <p><b>Munirah:</b> “We carried it carefully.”<br><b>Hadeel:</b> “We kept it sealed.”<br><b>Norah:</b> “We kept Rudy busy.”<br><b>The old lady:</b> “I gave an award-worthy performance.”<br><b>The old man:</b> “I brought my good cardigan.”<br><b>Gojo:</b> “I did all the heavy lifting. Literally.”</p>
      </div>
      <p>Everyone gathers at the dining-room door. Nini sits beside the silver box, looking extremely pleased with herself.</p>
      <button class="primary revealButton" type="button" data-action="reveal" data-testid="button-open-box">Open the silver box</button>
    </div>
  </section>`;
}

function renderEnding() {
  window.NiniGift?.preload();
  app.innerHTML = `<section class="ending">
    <p class="eyebrow">CASE CLOSED / SURPRISE!</p>
    <img class="cakeArt" src="final-cake.png" alt="A pixel-art birthday cake with candles">
    <h1>The treasure was<br><em>your birthday cake.</em></h1>
    <p class="lead">Happy birthday, Rudy! We lied about the theft. We exaggerated the danger. We even put a cat on the witness stand.</p>
    <p class="lead">But this part is true: you’re loved. And we would stage an entire courtroom drama just to make you smile.</p>
    <p class="signatures">With love, Alhanouf<br>With highly questionable testimony, the old lady, the old man &amp; Gojo<br>With full executive approval, Nini</p>
    <p class="fine">Nini has been cleared of all charges. Except being the real boss.</p>
    <div class="endingActions">
      <button class="quiet" type="button" data-action="birthday-song" data-testid="button-birthday-song">♪ Play the birthday song</button>
      <button class="secondary giftButton" type="button" data-action="special-gift" data-testid="button-extra-gift">🎁 Extra gift</button>
      <button class="primary" type="button" data-action="restart" data-testid="button-play-again">Play again</button>
    </div>
  </section>`;
}

function render() {
  document.body.classList.toggle('passwordMode', state.phase === 'password');
  switch (state.phase) {
    case 'password':
      renderPassword();
      break;
    case 'title':
      renderTitle();
      break;
    case 'opening':
      renderOpening();
      break;
    case 'openingClose':
      renderOpeningClose();
      break;
    case 'private':
      renderPrivate();
      break;
    case 'investigate':
      renderInvestigation();
      break;
    case 'hall':
      renderHall();
      break;
    case 'timeline':
      renderTimeline();
      break;
    case 'trial':
      renderTrial();
      break;
    case 'doorInvestigation':
      renderDoorInvestigation();
      break;
    case 'nini':
      renderNini();
      break;
    case 'verdict':
      renderVerdict();
      break;
    case 'door':
      renderDoor();
      break;
    case 'ending':
      renderEnding();
      break;
    default:
      state.phase = 'password';
      renderPassword();
  }
}

function enterOpening() {
  state.phase = 'opening';
  state.openingIndex = 0;
  state.openingHistory = [];
  state.feedback = '';
  setActiveSpeakers([openingLines[0].speaker]);
  render();
  speakLine(openingLines[0]);
  scrollToTop();
}

function advanceOpening() {
  if (state.openingIndex >= openingLines.length - 1) return;
  addOpeningHistory(openingLines[state.openingIndex]);
  state.openingIndex += 1;
  const line = openingLines[state.openingIndex];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function previousOpening() {
  if (state.phase !== 'opening' || state.openingIndex === 0) return;
  state.openingIndex -= 1;
  state.openingHistory.pop();
  const line = openingLines[state.openingIndex];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function stopOpening() {
  if (state.openingIndex !== openingLines.length - 1 || !allCharactersHaveSpoken()) return;
  addOpeningHistory(openingLines[state.openingIndex]);
  state.phase = 'openingClose';
  state.closingIndex = 0;
  setActiveSpeakers([closingLines[0].speaker]);
  shout('HOLD IT!');
  render();
  speakLine(closingLines[0]);
  scrollToTop();
}

function advanceClosing() {
  if (state.closingIndex >= closingLines.length - 1) return;
  addOpeningHistory(closingLines[state.closingIndex]);
  state.closingIndex += 1;
  const line = closingLines[state.closingIndex];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function previousClosing() {
  if (state.phase !== 'openingClose') return;
  state.openingHistory.pop();
  if (state.closingIndex === 0) {
    state.phase = 'opening';
    const line = openingLines[state.openingIndex];
    setActiveSpeakers([line.speaker]);
    render();
    speakLine(line);
    scrollToTop();
    return;
  }
  state.closingIndex -= 1;
  const line = closingLines[state.closingIndex];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function enterPrivate() {
  if (state.phase !== 'openingClose' || state.closingIndex !== closingLines.length - 1) return;
  state.phase = 'private';
  state.privateIndex = 0;
  state.privateChoice = null;
  state.privateBranchIndex = 0;
  state.privateHistory = [];
  setActiveSpeakers(['alhanouf']);
  render();
  speakLine(privateLines[0]);
  scrollToTop();
}

function advancePrivate() {
  if (state.phase !== 'private') return;
  const lines = state.privateChoice ? privateBranches[state.privateChoice] : privateLines;
  const index = state.privateChoice ? state.privateBranchIndex : state.privateIndex;
  if (index >= lines.length - 1) return;
  state.privateHistory.push(historyEntry(lines[index]));
  if (state.privateChoice) state.privateBranchIndex += 1;
  else state.privateIndex += 1;
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function previousPrivate() {
  if (state.phase !== 'private') return;
  if (state.privateChoice && state.privateBranchIndex > 0) {
    state.privateBranchIndex -= 1;
  } else if (state.privateChoice) {
    state.privateChoice = null;
  } else if (state.privateIndex > 0) {
    state.privateIndex -= 1;
  } else {
    return;
  }
  state.privateHistory.pop();
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function choosePrivate(choice) {
  if (state.phase !== 'private' || state.privateChoice || state.privateIndex !== privateLines.length - 1 || !privateBranches[choice]) return;
  state.privateHistory.push(historyEntry(privateLines[state.privateIndex]));
  state.privateChoice = choice;
  state.privateBranchIndex = 0;
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function beginInvestigation() {
  if (state.phase !== 'private' || !state.privateChoice || state.privateBranchIndex !== privateBranches[state.privateChoice].length - 1) return;
  voiceCast?.stop();
  state.phase = 'investigate';
  state.selectedPlace = null;
  state.feedback = '';
  render();
  scrollToTop();
}

function inspectLocation(index) {
  if (!Number.isInteger(index) || index < 0 || index >= locations.length || state.phase !== 'investigate' || state.selectedPlace !== null) return;
  const items = evidence.filter((item) => item.place === index);
  if (!state.places.includes(index)) {
    state.places.push(index);
    state.found.push(...items.map((item) => item.id));
  }
  state.selectedPlace = index;
  render();
  speakLine({ speaker: 'alhanouf', text: locationRemarks[index] });
  document.querySelector('#locationDetail')?.scrollIntoView({ block: 'nearest' });
}

function closeLocation() {
  if (state.phase !== 'investigate' || state.selectedPlace === null) return;
  state.selectedPlace = null;
  if (!state.hallSeen && state.places.length >= 2) {
    enterHall();
    return;
  }
  voiceCast?.stop();
  render();
}

function enterHall() {
  state.phase = 'hall';
  state.hallSeen = true;
  state.hallIndex = 0;
  state.hallHistory = [];
  setActiveSpeakers([hallLines[0].speaker]);
  render();
  speakLine(hallLines[0]);
  scrollToTop();
}

function advanceHall() {
  if (state.phase !== 'hall' || state.hallIndex >= hallLines.length - 1) return;
  state.hallHistory.push(historyEntry(hallLines[state.hallIndex]));
  state.hallIndex += 1;
  const line = hallLines[state.hallIndex];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function previousHall() {
  if (state.phase !== 'hall' || state.hallIndex === 0) return;
  state.hallIndex -= 1;
  state.hallHistory.pop();
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function leaveHall() {
  if (state.phase !== 'hall' || state.hallIndex !== hallLines.length - 1) return;
  voiceCast?.stop();
  state.phase = 'investigate';
  render();
  scrollToTop();
}

function startTimeline() {
  if (state.phase !== 'investigate' || state.selectedPlace !== null || !state.hallSeen || state.found.length !== evidence.length) return;
  state.phase = 'timeline';
  state.timelineIndex = 0;
  state.timelineHistory = [];
  state.feedback = '';
  setActiveSpeakers([timelineLines[0].speaker]);
  render();
  speakLine(timelineLines[0]);
  scrollToTop();
}

function advanceTimeline() {
  if (state.phase !== 'timeline' || state.timelineIndex >= timelineLines.length - 1) return;
  state.timelineHistory.push(historyEntry(timelineLines[state.timelineIndex]));
  state.timelineIndex += 1;
  const line = timelineLines[state.timelineIndex];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function previousTimeline() {
  if (state.phase !== 'timeline' || state.timelineIndex === 0) return;
  state.timelineIndex -= 1;
  state.timelineHistory.pop();
  state.feedback = '';
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function chooseTimeline(choice) {
  if (state.phase !== 'timeline' || state.timelineIndex !== timelineLines.length - 1) return;
  if (choice === 'records') {
    shout('HOLD IT!');
    startTrial();
    return;
  }
  if (!['blackout', 'teleport'].includes(choice)) return;
  state.mistakes += 1;
  state.feedback = choice === 'blackout'
    ? 'Alhanouf: “An excellent theory. Shame about the working camera and the empty gate log. Try again.”'
    : 'Alhanouf: “I admire the confidence. The photograph shows a trolley, and nobody left the house. Try again.”';
  setActiveSpeakers(['alhanouf']);
  render();
  speakLine({ speaker: 'alhanouf', text: choice === 'blackout'
    ? 'An excellent theory. Shame about the working camera and the empty gate log. Try again.'
    : 'I admire the confidence. The photograph shows a trolley, and nobody left the house. Try again.' });
}

function openRecord(presenting = false) {
  document.querySelector('#recordHelp').textContent = presenting
    ? 'Select the exhibit that contradicts the exact statement.'
    : 'Every exhibit you have collected. Read the times and wording carefully.';
  document.querySelector('#evidenceList').innerHTML = evidence
    .filter((item) => state.found.includes(item.id))
    .map((item, index) => `<article class="evidence" data-testid="evidence-${item.id}">
      <div class="exhibit">EXHIBIT ${String(index + 1).padStart(2, '0')}</div>
      <h3>${item.name}</h3><p>${item.text}</p>
      ${presenting ? `<button class="primary" type="button" data-proof="${item.id}">Present this</button>` : ''}
    </article>`)
    .join('') || '<p>No evidence collected yet.</p>';
  if (!record.open) record.showModal();
}

function startTrial() {
  if (state.phase !== 'timeline' || state.found.length !== evidence.length) return;
  state.phase = 'trial';
  state.witness = 0;
  state.statement = 0;
  state.solved = false;
  state.feedback = '';
  state.transcript = [];
  const witness = witnesses[state.witness];
  setActiveSpeakers(trialSpeakers(witness));
  render();
  speakLine({ speaker: witness.id, text: witness.statements[0] });
  scrollToTop();
}

function presentEvidence(id) {
  if (!state.found.includes(id) || state.solved || !['trial', 'nini'].includes(state.phase)) return false;
  const presentedFromRecord = record.open;
  if (record.open) record.close();
  let admission;

  if (state.phase === 'nini') {
    if (id === 'nini') {
      state.solved = true;
      state.feedback = 'The paw print matches the blue ink on Nini’s right paw.';
      addTranscript('nini', 'Mrrp.');
      addTranscript('gojo', 'Correction: she approved everything. She also says you are doing very well, Rudy.');
      addTranscript('alhanouf', 'This sounds incriminating, but I insist it is merely theatrical.');
      setActiveSpeakers(['nini', 'gojo', 'alhanouf']);
      admission = { speaker: 'nini', text: 'Mrrp.' };
      shout('OBJECTION!');
    } else {
      state.mistakes += 1;
      state.feedback = 'That connects the humans, but what proves Nini personally approved the plan? Look for her own mark.';
      setActiveSpeakers(['nini', 'gojo']);
    }
  } else {
    const witness = witnesses[state.witness];
    if (id === witness.proof && state.statement === witness.wrong) {
      state.solved = true;
      state.feedback = 'The exhibit contradicts the exact false statement.';
      addTranscript(witness.id, witness.admit);
      addTranscript('alhanouf', 'This sounds incriminating, but I insist it is merely theatrical.');
      setActiveSpeakers([witness.id, 'alhanouf']);
      admission = { speaker: witness.id, text: witness.admit };
      shout('OBJECTION!');
    } else {
      state.mistakes += 1;
      state.feedback = id === witness.proof
        ? 'Right exhibit, wrong statement. Use the arrows to find the exact claim this evidence disproves.'
        : 'The court needs a direct contradiction. Match the witness’s exact claim to a time, record, or instruction in your evidence.';
      setActiveSpeakers(trialSpeakers(witness));
    }
  }

  render();
  if (presentedFromRecord) {
    app.querySelector(state.solved
      ? (state.phase === 'nini' ? '[data-action="verdict"]' : '[data-action="next-witness"]')
      : '[data-action="present"]')?.focus();
  }
  if (admission) speakLine(admission);
  return state.solved;
}

function nextWitness() {
  if (!state.solved) return;
  state.solved = false;
  state.statement = 0;
  state.feedback = '';
  if (state.witness === witnesses.length - 2) {
    enterDoorInvestigation();
    return;
  }
  if (state.witness === witnesses.length - 1) {
    state.phase = 'nini';
    state.transcript.push({ speakerId: 'nini', speaker: 'Nini', text: 'Mrrp. Meow. Mrrrow.' });
    state.transcript.push({ speakerId: 'gojo', speaker: 'Satoru Gojo', text: 'She says: I knew nothing about this plan. I am an innocent victim. Also, Rudy, your shoelace looks delicious.' });
    state.transcript = state.transcript.slice(-10);
    setActiveSpeakers(['nini', 'gojo']);
    render();
    speakLine({ speaker: 'nini', text: 'Mrrp. Meow. Mrrrow.' });
    scrollToTop();
    return;
  }

  state.witness += 1;
  const witness = witnesses[state.witness];
  setActiveSpeakers(trialSpeakers(witness));
  render();
  speakLine({ speaker: witness.id, text: witness.statements[0] });
  scrollToTop();
}

function enterDoorInvestigation() {
  state.phase = 'doorInvestigation';
  state.doorIndex = 0;
  state.doorInspected = false;
  state.doorHistory = [];
  setActiveSpeakers([doorArrivalLines[0].speaker]);
  render();
  speakLine(doorArrivalLines[0]);
  scrollToTop();
}

function advanceDoor() {
  if (state.phase !== 'doorInvestigation') return;
  const lines = state.doorInspected ? doorInspectionLines : doorArrivalLines;
  if (state.doorIndex >= lines.length - 1) return;
  state.doorHistory.push(historyEntry(lines[state.doorIndex]));
  state.doorIndex += 1;
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function previousDoor() {
  if (state.phase !== 'doorInvestigation') return;
  if (state.doorIndex > 0) {
    state.doorIndex -= 1;
  } else if (state.doorInspected) {
    state.doorInspected = false;
    state.doorIndex = doorArrivalLines.length - 1;
  } else {
    return;
  }
  state.doorHistory.pop();
  const line = getCurrentLine();
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function inspectDoor() {
  if (state.phase !== 'doorInvestigation' || state.doorInspected || state.doorIndex !== doorArrivalLines.length - 1) return;
  state.doorHistory.push(historyEntry(doorArrivalLines[state.doorIndex]));
  state.doorInspected = true;
  state.doorIndex = 0;
  const line = doorInspectionLines[0];
  setActiveSpeakers([line.speaker]);
  render();
  speakLine(line);
}

function callAlhanouf() {
  if (state.phase !== 'doorInvestigation' || !state.doorInspected || state.doorIndex !== doorInspectionLines.length - 1) return;
  state.phase = 'trial';
  state.witness = witnesses.length - 1;
  state.statement = 0;
  state.solved = false;
  state.feedback = '';
  const witness = witnesses[state.witness];
  setActiveSpeakers(trialSpeakers(witness));
  render();
  speakLine({ speaker: witness.id, text: witness.statements[0] });
  scrollToTop();
}

function hint() {
  if (state.phase !== 'trial' || state.solved) return;
  const witness = witnesses[state.witness];
  state.feedback = witness.hint;
  setActiveSpeakers(trialSpeakers(witness));
  render();
}

function chooseVerdict(choice) {
  if (state.phase !== 'verdict') return;
  if (choice === 'plan') {
    voiceCast?.stop();
    state.phase = 'door';
    state.feedback = '';
    shout('NOT GUILTY!');
    render();
    scrollToTop();
    return;
  }

  state.mistakes += 1;
  state.feedback = choice === 'stranger'
    ? 'The gate log shows nobody left the property. Reconsider the evidence: was there a real escape?'
    : 'The trolley photograph and assignment sheet explain Gojo’s delivery. He helped move the box; he did not steal it.';
  render();
}

function resetGame() {
  voiceCast?.stop();
  state.phase = 'opening';
  state.openingIndex = 0;
  state.openingHistory = [];
  state.closingIndex = 0;
  state.privateIndex = 0;
  state.privateChoice = null;
  state.privateBranchIndex = 0;
  state.privateHistory = [];
  state.found = [];
  state.places = [];
  state.selectedPlace = null;
  state.hallSeen = false;
  state.hallIndex = 0;
  state.hallHistory = [];
  state.timelineIndex = 0;
  state.timelineHistory = [];
  state.doorIndex = 0;
  state.doorInspected = false;
  state.doorHistory = [];
  state.witness = 0;
  state.statement = 0;
  state.solved = false;
  state.feedback = '';
  state.mistakes = 0;
  state.activeSpeakers = [];
  state.transcript = [];
  enterOpening();
}

function handleAction(actionName) {
  switch (actionName) {
    case 'password-hint':
      if (state.phase === 'password') document.querySelector('#passwordHint').hidden = false;
      break;
    case 'enter-room':
      if (state.phase === 'title') enterOpening();
      break;
    case 'next-opening':
      advanceOpening();
      break;
    case 'previous-opening':
      previousOpening();
      break;
    case 'stop-opening':
      stopOpening();
      break;
    case 'next-closing':
      advanceClosing();
      break;
    case 'previous-closing':
      previousClosing();
      break;
    case 'enter-private':
      enterPrivate();
      break;
    case 'next-private':
      advancePrivate();
      break;
    case 'previous-private':
      previousPrivate();
      break;
    case 'private-facts':
      choosePrivate('facts');
      break;
    case 'private-box':
      choosePrivate('box');
      break;
    case 'begin-investigation':
      beginInvestigation();
      break;
    case 'close-location':
      closeLocation();
      break;
    case 'next-hall':
      advanceHall();
      break;
    case 'previous-hall':
      previousHall();
      break;
    case 'leave-hall':
      leaveHall();
      break;
    case 'record':
      openRecord();
      break;
    case 'call-witnesses':
      startTimeline();
      break;
    case 'next-timeline':
      advanceTimeline();
      break;
    case 'previous-timeline':
      previousTimeline();
      break;
    case 'next-door':
      advanceDoor();
      break;
    case 'previous-door':
      previousDoor();
      break;
    case 'inspect-door':
      inspectDoor();
      break;
    case 'call-alhanouf':
      callAlhanouf();
      break;
    case 'press': {
      if (state.phase !== 'trial' || state.solved) return;
      const witness = witnesses[state.witness];
      const text = witness.press[state.statement];
      state.feedback = '';
      addTranscript(witness.id, text);
      setActiveSpeakers(trialSpeakers(witness));
      shout('HOLD IT!');
      render();
      app.querySelector('[data-action="press"]')?.focus();
      speakLine({ speaker: witness.id, text, moment: 'pressed' });
      break;
    }
    case 'present':
      if (!state.solved) openRecord(true);
      break;
    case 'hint':
      hint();
      break;
    case 'hear-interruption':
      if (state.phase === 'trial' && voiceOn) {
        speakLine({ speaker: 'alhanouf', text: witnesses[state.witness].interruption, moment: 'interruption' });
      }
      break;
    case 'hear-japanese':
      if (state.phase === 'nini' && voiceOn) {
        speakLine({ speaker: 'gojo', text: state.solved
          ? 'Correction: she approved everything. She also says you are doing very well, Rudy.'
          : 'She says: I knew nothing about this plan. I am an innocent victim. Also, Rudy, your shoelace looks delicious.' });
      }
      break;
    case 'next-witness':
      nextWitness();
      break;
    case 'nini-hint':
      if (state.phase !== 'nini' || state.solved) return;
      state.feedback = 'Nini cannot write a witness statement. What could she stamp instead?';
      setActiveSpeakers(['nini']);
      render();
      break;
    case 'verdict':
      if (!state.solved || state.phase !== 'nini') return;
      voiceCast?.stop();
      state.phase = 'verdict';
      state.feedback = '';
      render();
      scrollToTop();
      break;
    case 'reveal':
      if (state.phase !== 'door') return;
      voiceCast?.stop();
      state.phase = 'ending';
      shout('SURPRISE!');
      render();
      scrollToTop();
      window.NiniCelebrate?.confetti();
      if (soundOn || voiceOn) setTimeout(() => window.NiniCelebrate?.song(), 900);
      break;
    case 'special-gift':
      voiceCast?.stop();
      window.NiniGift?.start();
      break;
    case 'birthday-song':
      window.NiniCelebrate?.song();
      window.NiniCelebrate?.confetti();
      break;
    case 'restart':
      window.NiniCelebrate?.stopSong();
      resetGame();
      break;
    default:
      break;
  }
}

app.addEventListener('submit', (event) => {
  if (event.target.id !== 'passwordForm' || state.phase !== 'password') return;
  event.preventDefault();
  const input = document.querySelector('#passwordInput');
  if (input.value.trim() === '12102002') {
    state.phase = 'title';
    render();
    scrollToTop();
  } else {
    document.querySelector('#passwordError').hidden = false;
    input.focus();
    input.select();
  }
});

app.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.action) handleAction(button.dataset.action);
  if (button.dataset.inspect !== undefined) inspectLocation(Number(button.dataset.inspect));
  if (button.dataset.move !== undefined && state.phase === 'trial' && !state.solved) {
    const direction = Number(button.dataset.move);
    state.statement = Math.max(0, Math.min(2, state.statement + direction));
    state.feedback = '';
    const witness = witnesses[state.witness];
    setActiveSpeakers(trialSpeakers(witness));
    render();
    (app.querySelector(`[data-move="${direction}"]:not(:disabled)`)
      || app.querySelector(`[data-move="${-direction}"]:not(:disabled)`))?.focus();
    speakLine({ speaker: witness.id, text: witness.statements[state.statement] });
  }
  if (button.dataset.timeline) chooseTimeline(button.dataset.timeline);
  if (button.dataset.verdict) chooseVerdict(button.dataset.verdict);
});

record.addEventListener('click', (event) => {
  const button = event.target.closest('[data-proof]');
  if (button) presentEvidence(button.dataset.proof);
});

document.querySelector('#closeRecord').onclick = () => record.close();
let catSounds;
import('./cat-sounds.js')
  .then(({ createCatSounds }) => {
    catSounds = createCatSounds(() => audioCtx, () => soundOn);
  })
  .catch(error => console.error('Unable to load cat sounds:', error));

document.querySelector('#sound').onclick = () => {
  soundOn = !soundOn;
  if (!soundOn) stopTvStatic();
  const button = document.querySelector('#sound');
  button.textContent = soundOn ? 'Sound on' : 'Sound off';
  button.setAttribute('aria-pressed', String(soundOn));
  beep();
  catSounds?.sync();
};

const voiceButton = document.querySelector('#voice');
const voiceStatus = document.querySelector('#voiceStatus');
const voiceNote = 'Nini uses local cat sounds. Every other character has their own recorded synthetic voice.';
voiceButton.disabled = !voiceCast;
voiceButton.textContent = voiceCast ? 'Voices off' : 'Voices unavailable';
voiceButton.title = voiceNote;
voiceButton.setAttribute('aria-pressed', 'false');
voiceCast?.setStatus((kind, message) => {
  voiceStatus.textContent = voiceOn ? (message || voiceNote) : '';
  voiceStatus.dataset.state = kind;
});
voiceButton.onclick = () => {
  if (!voiceCast) return;
  voiceOn = !voiceOn;
  voiceButton.textContent = voiceOn ? 'Voices on' : 'Voices off';
  voiceButton.setAttribute('aria-pressed', String(voiceOn));
  voiceStatus.textContent = voiceOn
    ? (voiceCast.isAvailable() ? voiceNote : 'Voices are unavailable in this browser; Nini’s cat sounds still work.')
    : '';
  document.querySelectorAll('[data-action="hear-interruption"], [data-action="hear-japanese"]').forEach((button) => {
    button.disabled = !voiceOn;
  });
  if (voiceOn) speakLine(getCurrentLine());
  else voiceCast.stop();
};

try {
  document.modelContext?.registerTool({
    name: 'read_case_state',
    description: 'Read the current visible phase, testimony, and collected evidence without revealing future story content.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
    execute: () => ({
      phase: state.phase,
      witness: state.phase === 'trial' ? witnesses[state.witness].name : state.phase === 'nini' ? 'Nini' : undefined,
      statement: state.phase === 'trial' ? witnesses[state.witness].statements[state.statement] : state.phase === 'nini' ? 'Mrrp. Meow. Mrrrow.' : undefined,
      evidence: evidence.filter((item) => state.found.includes(item.id)),
      feedback: state.feedback,
    }),
  });
  document.modelContext?.registerTool({
    name: 'present_case_evidence',
    description: 'Present a collected exhibit against the current testimony. This can advance the case.',
    inputSchema: {
      type: 'object',
      properties: { exhibitId: { type: 'string' } },
      required: ['exhibitId'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false },
    execute: (input) => {
      if (!input || typeof input.exhibitId !== 'string' || !state.found.includes(input.exhibitId) || !['trial', 'nini'].includes(state.phase) || state.solved) {
        throw new Error('Select a collected exhibit during an unresolved testimony.');
      }
      return { contradictionProved: presentEvidence(input.exhibitId), feedback: state.feedback };
    },
  });
} catch {
  // The game runs without optional model-context tools.
}

render();