/* Notifications only. No offline/authenticated content caching. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let p={};try{p=e.data?.json()||{}}catch(_){}e.waitUntil(self.registration.showNotification('CepFirma',{body:String(p.body||'Yeni bir bildiriminiz var.'),icon:'/icon-192.png',badge:'/icon-192.png',tag:String(p.tag||'cepfirma'),data:{url:'/app.html?notifications=1'},silent:false}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil((async()=>{const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const w of windows){const url=new URL(w.url);if(url.origin===self.location.origin&&url.pathname==='/app.html'){await w.focus();w.postMessage({type:'cepfirma-open-notifications'});return}}await self.clients.openWindow('/app.html?notifications=1')})())});
