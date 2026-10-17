/* Notifications only. No offline/authenticated content caching. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/* Yalnızca bilinen biçimdeki, aynı kaynaklı adres kabul edilir; gelen veriye güvenilmez. */
function target(data){const task=String(data?.task||''),company=String(data?.company_id||'');if(UUID.test(task)&&UUID.test(company))return {url:'/app.html?notifications=1&task='+task+'&company='+company,task,company};return {url:'/app.html?notifications=1',task:'',company:''}}
self.addEventListener('push',e=>{let p={};try{p=e.data?.json()||{}}catch(_){}const t=target(p.data);e.waitUntil(self.registration.showNotification('CepFirma',{body:String(p.body||'Yeni bir bildiriminiz var.'),icon:'/icon-192.png',badge:'/icon-192.png',tag:String(p.tag||'cepfirma'),data:t,silent:false}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const t=target(e.notification.data);e.waitUntil((async()=>{const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const w of windows){const url=new URL(w.url);if(url.origin===self.location.origin&&url.pathname==='/app.html'){await w.focus();w.postMessage({type:'cepfirma-open-notifications',task:t.task,company_id:t.company});return}}await self.clients.openWindow(t.url)})())});
