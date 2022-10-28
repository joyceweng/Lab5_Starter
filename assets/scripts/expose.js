// expose.js

window.addEventListener('DOMContentLoaded', init);

const jsConfetti = new JSConfetti();

function init() {
  const horn = document.getElementById('horn-select');
  const btn = document.querySelector('button');
  const volume = document.getElementById('volume');

  horn.addEventListener('change', selectHorn);
  btn.addEventListener('click', (event) => {play()});
  volume.addEventListener('change', changeVol);
}

function play() {
  const volume = document.getElementById('volume');
  const horn = document.getElementById('horn-select');
  var audioAir = new Audio("assets/audio/air-horn.mp3");
  audioAir.volume = volume.value / 100;
  var audioCar = new Audio("assets/audio/car-horn.mp3");
  audioCar.volume = volume.value / 100;
  var audioParty = new Audio("assets/audio/party-horn.mp3");
  audioParty.volume = volume.value / 100;
  if (horn.value == "air-horn") {
    audioAir.play();
  } else if (horn.value == "car-horn") {    
    audioCar.play();
  } else if (horn.value == "party-horn") { 
    jsConfetti.addConfetti({
      confettiColors: [
        '#00ff00', '#ff477e', '#0000ff', '#ff85a1', '#fbb1bd', '#f9bec7',
      ],
   })
    audioParty.play();
  }
}

function selectHorn(e) {
  const img = document.querySelector('img[alt="No image selected"]');
  if (e.target.value == "air-horn") {
    img.src = "assets/images/air-horn.svg";
  } else if (e.target.value == "car-horn") {
    img.src = "assets/images/car-horn.svg";
  } else if (e.target.value == "party-horn") {
    img.src = "assets/images/party-horn.svg";
  }
}

function changeVol(e) {
  const volume = document.getElementById('volume');
  const volImg = document.querySelector('img[alt="Volume level 2"]');

  volume.value = e.target.value;
  if (e.target.value == 0) {
    volImg.src = "assets/icons/volume-level-0.svg";
  } else if (e.target.value >= 1 && e.target.value < 33) {
    volImg.src = "assets/icons/volume-level-1.svg";
  } else if (e.target.value >= 33 && e.target.value < 67) {
    volImg.src = "assets/icons/volume-level-2.svg";
  } else {
    volImg.src = "assets/icons/volume-level-3.svg";
  }
}