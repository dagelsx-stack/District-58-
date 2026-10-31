// District +58 · service worker
// Objetivo: que la app abra SIEMPRE, con o sin internet. Con internet toma la versión nueva; sin internet usa la guardada.
const C='d58-v3',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const FU='https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap';
// Guarda la tipografía una vez (solo el bloque "latin": acentos y ñ) para que se vea igual sin internet.
async function fonts(c){try{const css=await(await fetch(FU)).text();await c.put(FU,new Response(css,{headers:{'content-type':'text/css'}}));
 const m=[...css.matchAll(/\/\* latin \*\/[^}]*?url\((https:[^)]+)\)/g)];await Promise.all(m.map(x=>fetch(x[1]).then(r=>c.put(x[1],r)).catch(()=>{})))}catch(e){}}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(C);await c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})));await fonts(c);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!/^https?:/.test(r.url))return;
 const net=fetch(r,{cache:'no-cache'}).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res});net.catch(()=>{});
 const hit=()=>caches.match(r,{ignoreVary:true,ignoreSearch:r.mode==='navigate'}).then(m=>m||(r.mode==='navigate'?caches.match('./index.html'):null));
 // Con internet lento no esperamos: a los 2,5 s usamos lo guardado.
 e.respondWith(Promise.race([net,new Promise((_,j)=>setTimeout(j,2500))]).catch(()=>hit().then(m=>m||net)))});
