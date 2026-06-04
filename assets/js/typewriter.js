"use strict";

const greeting     = "Welcome to h4ck3r.be";
const subtitleText = "Security Research  //  Red Teaming  //  Malware Analysis";

const typedText     = document.getElementById("typed-text");
const typedSubtitle = document.getElementById("typed-subtitle");
const navButtons    = document.getElementById("nav-buttons");

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

function setActiveNav(id) {
  document.querySelectorAll('.sidebar-link').forEach(function(link) {
    link.classList.remove('active');
    var nav = link.getAttribute('data-nav');
    if (nav === id || (nav === 'home' && (!id || id === 'home'))) {
      link.classList.add('active');
    }
  });
}

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
    setActiveNav('home');
    if (window.innerWidth <= 768) closeSidebar();
    return;
  }
  var section = document.getElementById(id);
  if (section) {
    section.classList.remove('hidden');
    if (updateURL) history.pushState({}, '', '#' + id);
  }
  var mainNav = id.replace('post-', '');
  if (id.indexOf('post-') === 0) mainNav = 'Blog';
  setActiveNav(mainNav);
  if (window.innerWidth <= 768) closeSidebar();
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var id = this.getAttribute('href').replace('#', '');
    var subAnchors = ['sec-bfs','sec-download','sec-auto','sec-classify','sec-analyze','sec-elevate5','sec-auth'];
    if (subAnchors.indexOf(id) !== -1) {
      e.preventDefault();
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      return;
    }
    e.preventDefault();
    showSection(id);
    window.scrollTo(0, 0);
  });
});

var toggle = document.getElementById('sidebar-toggle');
if (toggle) {
  toggle.addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

window.addEventListener('DOMContentLoaded', function() {
  var hash = window.location.hash.replace('#', '');
  if (hash) showSection(hash, false);
});
window.addEventListener('popstate', function() {
  var hash = window.location.hash.replace('#', '');
  showSection(hash, false);
});

window.addEventListener("DOMContentLoaded", function() {
  var lastTyped = localStorage.getItem("lastTyped");
  var today = new Date().toISOString().slice(0, 10);

  if (lastTyped === today) {
    typedText.textContent = greeting;
    typedSubtitle.textContent = subtitleText;
    if (navButtons) navButtons.style.opacity = "1";
  } else {
    typeWriter(greeting, typedText, 80, function() {
      typeWriter(subtitleText, typedSubtitle, 55, function() {
        localStorage.setItem("lastTyped", today);
        if (navButtons) navButtons.style.opacity = "1";
      });
    });
  }
});

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