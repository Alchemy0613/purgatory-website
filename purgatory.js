document.addEventListener("DOMContentLoaded", () => {
  /* ---------- WHISPERS ---------- */
  const whispers = [
    "Not alone",
    "Do you hear it",
    "It remembers",
    "Something is wrong",
    "You brought it here",
    "It knows your name",
    "Don’t look away",
    "Behind you",
    "It’s still here"
  ];

  function createWhisper() {
    const layer = document.getElementById("whisper-layer");
    if (!layer) return;

    const w = document.createElement("div");
    w.className = "whisper";
    if (Math.random() < 0.2) w.classList.add("glitch");
    w.innerText = whispers[Math.floor(Math.random() * whispers.length)];
    w.style.top = Math.random() * 80 + "%";
    w.style.left = Math.random() * 80 + "%";
    layer.appendChild(w);

    setTimeout(() => (w.style.opacity = 1), 100);
    setTimeout(() => (w.style.opacity = 0), 6000);
    setTimeout(() => w.remove(), 10000);
  }

  setInterval(createWhisper, 8000);
  createWhisper();

  /* ---------- SCROLL FADE-IN ---------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-section").forEach(section => {
    observer.observe(section);
  });
});
