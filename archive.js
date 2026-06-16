/* ================================
   TYPEWRITER EFFECT
================================ */
function typeWriter(text, elementId, speed = 65) {
  let i = 0;

  function type() {
    if (i < text.length) {
      document.getElementById(elementId).innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed + Math.random() * 120);
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  typeWriter("Whisper Archive", "archiveTitle");
  cycleWhispers();
  startStaticFlicker();
});


/* ================================
   ROTATING WHISPER PHRASES
================================ */
const whisperPhrases = [
  "channel 13",
  "ridge-line anomaly",
  "unresolved signal",
  "the static is listening",
  "do not turn around",
  "classified transmission",
  "the ridge remembers",
  "they walk after dark",
  "echoes of the missing",
  "the mountain keeps secrets"
];

function cycleWhispers() {
  const archive = document.querySelector(".archive-page");

  let index = 0;

  setInterval(() => {
    archive.style.setProperty(
      "--whisper-text",
      `"${whisperPhrases[index]} • ${whisperPhrases[(index + 1) % whisperPhrases.length]} • ${whisperPhrases[(index + 2) % whisperPhrases.length]}"`
    );
    index = (index + 1) % whisperPhrases.length;
  }, 8000);
}


/* ================================
   RADIO STATIC FLICKER
================================ */
function startStaticFlicker() {
  const page = document.querySelector(".archive-page");

  setInterval(() => {
    page.classList.add("static-flicker");
    setTimeout(() => page.classList.remove("static-flicker"), 120);
  }, Math.random() * 6000 + 4000);
}
