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

// Zorg dat alleen de juiste sectie zichtbaar is
// Toon een specifieke sectie op basis van ID
function showSection(id, updateURL = true) {
  const typewriterWrapper = document.querySelector('.content-wrapper');

  // Verberg alle secties en typewriter
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.add('hidden');
  });
  typewriterWrapper.classList.add('hidden');

  // "home" = typewriter tonen, alles verbergen
  if (id === '' || id === 'home') {
    typewriterWrapper.classList.remove('hidden');
    if (updateURL) history.pushState({}, '', '/');
    return;
  }

  // Toon juiste sectie
  const sectionToShow = document.getElementById(id);
  if (sectionToShow) {
    sectionToShow.classList.remove('hidden');
    if (updateURL) history.pushState({}, '', `#${id}`);
  }
}

// Event listeners voor navigatielinks
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').replace('#', '');
    showSection(target);
  });
});

// Voeg event listeners toe aan menu-links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').replace('#', '');
    showSection(target);
  });
});


// Bij page load: kijk of er een hash is (#portfolio)
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    showSection(hash, false); // false → niet opnieuw pushen in history
  }
});

// Reageer op back/forward in browser
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '');
  showSection(hash, false);
});


/* ---- on load ---- */
window.addEventListener("DOMContentLoaded", () => {
  const lastTyped = localStorage.getItem("lastTyped");
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  const showTopbar = () => {
    document.getElementById("topbar").classList.remove("hidden");
  };

  if (lastTyped === today) {
    typedText.textContent = greeting;
    typedSubtitle.textContent = subtitleText;
    showTopbar(); // meteen tonen als al getypt is
  } else {
    typeWriter(greeting, typedText, 90, () => {
      typeWriter(subtitleText, typedSubtitle, 70, () => {
        localStorage.setItem("lastTyped", today);
        showTopbar(); // toon navbar pas na animatie
      });
    });
  }
});

