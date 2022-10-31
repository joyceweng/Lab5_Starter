// explore.js

window.addEventListener('DOMContentLoaded', init);
const synth = window.speechSynthesis;
let voices = [];

function init() {
  const btn = document.querySelector('button');
  const txt = document.getElementById('text-to-speak');
  btn.addEventListener('click', () => {talk()});
  txt.addEventListener('change', updateValue);
  synth.addEventListener('voiceschanged', () => {populateVoiceList()});
}

function populateVoiceList() {
  voices = synth.getVoices();
  const voiceSelect = document.getElementById('voice-select');
  for (let i = 0; i < voices.length ; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    if (voices[i].default) {
      option.textContent += ' — DEFAULT';
    }
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

function updateValue(e) {
  const log = document.getElementById(id="text-to-speak");
  log.textContent = e.target.value;
}

function talk() {
  const voiceSelect = document.getElementById('voice-select');
  const txt = document.getElementById("text-to-speak").value;
  let utterThis = new SpeechSynthesisUtterance(txt);
  const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (let i = 0; i < voices.length ; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
  utterThis.addEventListener('start', (e) => {smileOpen()});
  utterThis.addEventListener('end', (e) => {smile()});
}

function smileOpen(e) {
  const img = document.querySelector('img[alt="Smiling face"]');
  if (synth.speaking) {
    img.src = "assets/images/smiling-open.png";
  }
}

function smile(e) {
  const img = document.querySelector('img[alt="Smiling face"]');
  if (!synth.speaking) {
    img.src = "assets/images/smiling.png";
  } 
}