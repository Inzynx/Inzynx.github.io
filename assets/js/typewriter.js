"use strict";

/* ---- teksten ---- */
const greeting     = "Hi I'm Inzynx";
const subtitleText = "Pentester • Cybersecurity Researcher • Malware Developer";

/* ---- DOM refs ---- */
const typedText     = document.getElementById("typed-text");
const typedSubtitle = document.getElementById("typed-subtitle");

/* ---- typewriter helper ---- */
function typeWriter(text, el, speed, done) {
  let i = 0;
  el.textContent = "";
  el.classList.add("cursor");

  (function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, speed);
    } else {
      el.classList.remove("cursor");
      done && done();
    }
  })();
}

/* ---- on load ---- */
window.addEventListener("DOMContentLoaded", () => {
  typeWriter(greeting, typedText, 90, () => {
    typeWriter(subtitleText, typedSubtitle, 70);
  });
});
