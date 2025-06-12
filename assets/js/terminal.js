"use strict";

const termBox   = document.getElementById('terminal');
const termText  = document.getElementById('term-text');
const termCursor= document.getElementById('term-cursor');
const loginBtn  = document.getElementById('login-btn');
const speed = 40;

/* fake ls -l output */
const files = [
  {name:'blog',       url:'/blog',       size:'1.2K'},
  {name:'portfolio',  url:'/portfolio',  size:'4.5K'},
  {name:'tools',      url:'/tools',      size:'3.7K'},
  {name:'contact',    url:'/contact',    size:'0.8K'}
];

async function type(str){ for(const c of str){ termText.textContent+=c; await sleep(speed);} }
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function boot(){
  await type('inzynx@h4ck3r:~$ su admin\n');
  await type('Password: ********\n');
  await type('admin@h4ck3r:~$ ls -l\n');
  for(const f of files){
     const line = `-rw-r--r-- 1 admin admin ${f.size.padStart(5,' ')} May 12 20:15 `;
     await type(line);
     /* inject link instead of plain text */
     termText.innerHTML += `<a class="term-link" href="${f.url}">${f.name}</a>\n`;
     await sleep(200);
  }
  termCursor.remove();
};
