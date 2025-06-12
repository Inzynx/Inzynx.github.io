"use strict";

/* --------- HTML-snippets per sectie -------------------------------- */
const pages = {
  portfolio: `
    <article id="portfolio">
      <h2>Portfolio</h2>
      <p>Voorbeeld-projecten &amp; write-ups:</p>
      <div class="grid">
        <div class="card">
          <img src="https://picsum.photos/400/200?1" alt="">
          <h3>Red-Team Assessment</h3>
          <p>Volledige AD-compromittatie + mitigatieplan.</p>
        </div>
        <div class="card">
          <img src="https://picsum.photos/400/200?2" alt="">
          <h3>OWASP Top-10 Audit</h3>
          <p>Code-review &amp; DAST-testing voor SaaS-platform.</p>
        </div>
        <div class="card">
          <img src="https://picsum.photos/400/200?3" alt="">
          <h3>Malware RE</h3>
          <p>Analyse &amp; IOC-documentatie van custom loader.</p>
        </div>
      </div>
    </article>`,

  blog: `
    <article id="blog">
      <h2>Blog</h2>
      <h3>01 Jun 2025 – CVE-2025-1234 Exploit</h3>
      <p>Heap-spray techniek in Win 11.</p>
      <h3>16 May 2025 – Threat Intel 101</h3>
      <p>OSINT × Sigma-rules.</p>
      <h3>02 May 2025 – Build je Homelab</h3>
      <p>Budget-friendly research setup.</p>
    </article>`,

  tips: `
    <article id="tips">
      <h2>Tips &amp; Tricks</h2>
      <ul>
        <li><strong>Nmap:</strong> <code>nmap -sC -sV -T4 10.0.0.0/24</code></li>
        <li><strong>Kerberoasting:</strong> <code>GetUserSPNs.py -request</code></li>
        <li><strong>Burp-macro:</strong> auto cookie refresh.</li>
      </ul>
    </article>`
};

/* --------- DOM --------- */
const content  = document.getElementById("content");
const navLinks = document.querySelectorAll(".nav a");

/* --------- render helper --------- */
function render(page, pushHash = true) {
  if (!pages[page]) return;
  content.innerHTML = pages[page];
  navLinks.forEach(a =>
    a.classList.toggle("active", a.dataset.page === page));
  if (pushHash) history.replaceState(null, "", `#${page}`);
}

/* --------- menu-links --------- */
navLinks.forEach(a =>
  a.addEventListener("click", e => {
    e.preventDefault();
    const page = a.dataset.page;
    render(page);
    document.getElementById(page)
            .scrollIntoView({ behavior: "smooth" });
  })
);

/* --------- deeplink support --------- */
window.addEventListener("DOMContentLoaded", () => {
  const deeplink = location.hash.slice(1);
  if (pages[deeplink]) render(deeplink, false);
});
