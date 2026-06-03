"use strict";

/* ── Config ── */
const greeting     = "Welcome to h4ck3r.be";
const subtitleText = "Security Research  //  Red Teaming  //  Malware Analysis";

/* ── DOM refs ── */
const typedText     = document.getElementById("typed-text");
const typedSubtitle = document.getElementById("typed-subtitle");
const navButtons    = document.getElementById("nav-buttons");

/* ── Typewriter ── */
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

/* ── Section navigation ── */
function showSection(id, updateURL) {
  if (updateURL === undefined) updateURL = true;
  var wrapper = document.querySelector('.content-wrapper');
  document.querySelectorAll('.page-section').forEach(function(s) {
    s.classList.add('hidden');
  });
  if (wrapper) wrapper.classList.add('hidden');

  if (!id || id === 'home') {
    if (wrapper) wrapper.classList.remove('hidden');
    if (updateURL) history.pushState({}, '', '/');
    return;
  }
  var section = document.getElementById(id);
  if (section) {
    section.classList.remove('hidden');
    if (updateURL) history.pushState({}, '', '#' + id);
  }
}

/* ── Bind nav links ── */
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    showSection(this.getAttribute('href').replace('#', ''));
  });
});

/* ── Bind hacker buttons ── */
document.querySelectorAll('.hacker-btn[data-section]').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    showSection(this.getAttribute('data-section'));
  });
});
document.querySelectorAll('.hacker-btn[href]').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    showSection(this.getAttribute('href').replace('#', ''));
  });
});

/* ── Deep link on load ── */
window.addEventListener('DOMContentLoaded', function() {
  var hash = window.location.hash.replace('#', '');
  if (hash) showSection(hash, false);
});
window.addEventListener('popstate', function() {
  var hash = window.location.hash.replace('#', '');
  showSection(hash, false);
});

/* ── Boot sequence ── */
window.addEventListener("DOMContentLoaded", function() {
  var lastTyped = localStorage.getItem("lastTyped");
  var today = new Date().toISOString().slice(0, 10);

  function showTopbar() {
    document.getElementById("topbar").classList.remove("hidden");
  }

  if (lastTyped === today) {
    typedText.textContent = greeting;
    typedSubtitle.textContent = subtitleText;
    if (navButtons) navButtons.style.opacity = "1";
    showTopbar();
  } else {
    typeWriter(greeting, typedText, 80, function() {
      typeWriter(subtitleText, typedSubtitle, 55, function() {
        localStorage.setItem("lastTyped", today);
        if (navButtons) navButtons.style.opacity = "1";
        showTopbar();
      });
    });
  }
});

/* ── Matrix rain background ── */
(function() {
  var canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|/\\<>~';
  var fontSize = 14;
  var columns = Math.floor(canvas.width / fontSize);
  var drops = [];
  for (var i = 0; i < columns; i++) drops[i] = Math.random() * -100;

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#b13232';
    ctx.font = fontSize + 'px monospace';

    for (var i = 0; i < drops.length; i++) {
      var text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 50);
})();