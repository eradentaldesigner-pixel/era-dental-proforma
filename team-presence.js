// Company-scoped presence. Stale sessions expire on the server; no client clock is trusted.
let presenceIdentity='',presenceSession='',presenceCompany=null,presenceMode='online',presenceNote='',presenceActivity=Date.now(),presenceRows=[],presenceTimer=null,presenceSending=false,presenceReading=false,presenceGeneration=0,presenceReturnFocus=null;
const presenceLabels={online:'Çevrimiçi',busy:'Meşgul',away:'Uzakta',offline:'Çevrimdışı'};
function presenceState(){return document.hidden||Date.now()-presenceActivity>300000?'away':presenceMode}
function presenceReset(){
 const oldCompany=presenceCompany,oldSession=presenceSession;
 ++presenceGeneration;clearInterval(presenceTimer);presenceTimer=null;presenceIdentity='';presenceSession='';presenceCompany=null;presenceRows=[];presenceMode='online';presenceNote='';presenceSending=false;presenceReading=false;
 if(oldCompany&&oldSession&&sb&&currentUser)sb.rpc('team_presence_heartbeat',{p_company_id:oldCompany,p_session_key:oldSession,p_state:'offline',p_note:''}).then(()=>{}).catch(()=>{});
 document.getElementById('presenceOverlay')?.classList.remove('open');document.getElementById('presenceList')?.replaceChildren();
 document.querySelectorAll('[data-presence-open]').forEach(b=>{b.hidden=true});
}
async function presenceHeartbeat(state){
 if(!presenceIdentity||!currentUser||presenceSending)return;
 const gen=presenceGeneration;presenceSending=true;
 try{const {error}=await sb.rpc('team_presence_heartbeat',{p_company_id:presenceCompany,p_session_key:presenceSession,p_state:state||presenceState(),p_note:presenceNote});if(error)throw error;
 if(gen===presenceGeneration)document.getElementById('presenceConnection').textContent='Durumlar yaklaşık 30 saniyede bir güncellenir.';
 }catch(e){if(gen===presenceGeneration)document.getElementById('presenceConnection').textContent='Bağlantı kurulamadı. Durumlar güncel olmayabilir.'}finally{if(gen===presenceGeneration)presenceSending=false}
}
async function presenceLoad(){
 if(!presenceIdentity||presenceReading)return;
 const gen=presenceGeneration;presenceReading=true;
 try{const {data,error}=await sb.rpc('company_presence',{p_company_id:presenceCompany});if(error)throw error;if(gen!==presenceGeneration)return;presenceRows=data||[];presenceRender();}
 catch(e){if(gen===presenceGeneration){document.getElementById('presenceConnection').textContent='Ekip bilgileri yenilenemedi. Yeniden deneyin.';if(!presenceRows.length)document.getElementById('presenceList').textContent='Ekip bilgileri yüklenemedi.'}}
 finally{if(gen===presenceGeneration)presenceReading=false}
}
function presenceRender(){
 const search=document.getElementById('presenceSearch').value.toLocaleLowerCase('tr-TR').trim();
 const rows=presenceRows.filter(r=>(r.display_name+' '+(teamRoles[r.role]||'Şirket sahibi')).toLocaleLowerCase('tr-TR').includes(search));
 document.getElementById('presenceSummary').textContent=presenceRows.filter(r=>r.state!=='offline').length+' bağlı · '+presenceRows.length+' çalışan';
 document.getElementById('presenceList').innerHTML=rows.map(r=>'<article class="presence-person"><div class="presence-avatar">'+esc((r.display_name||'?').slice(0,1).toLocaleUpperCase('tr-TR'))+'</div><div class="presence-person-name"><b>'+esc(r.display_name)+(r.user_id===currentUser?.id?' <small>(Siz)</small>':'')+'</b><small>'+esc(r.role==='owner'?'Şirket sahibi':teamRoles[r.role]||r.role)+'</small>'+(r.note?'<p>'+esc(r.note)+'</p>':'')+'</div><span class="presence-state '+esc(r.state)+'"><i></i>'+esc(presenceLabels[r.state]||'Çevrimdışı')+'</span></article>').join('')||'<p>Eşleşen çalışan bulunamadı.</p>';
}
function presenceStart(){
 if(!currentUser||!currentCompanyId||!currentMembership){presenceReset();return}
 const key=opsKey();document.querySelectorAll('[data-presence-open]').forEach(b=>b.hidden=false);if(presenceIdentity===key)return;
 presenceReset();presenceIdentity=key;presenceCompany=currentCompanyId;presenceSession=crypto.randomUUID();presenceActivity=Date.now();
 document.getElementById('presenceMode').value='online';document.getElementById('presenceNote').value='';document.getElementById('presenceNoteLabel').hidden=true;
 document.querySelectorAll('[data-presence-open]').forEach(b=>b.hidden=false);
 presenceHeartbeat().then(presenceLoad);presenceTimer=setInterval(()=>{presenceHeartbeat();if(document.getElementById('presenceOverlay').classList.contains('open'))presenceLoad()},30000);
}
function openPresence(){
 if(!currentUser||!currentCompanyId)return;presenceStart();presenceReturnFocus=document.activeElement;
 document.getElementById('presenceOverlay').classList.add('open');document.getElementById('presenceSearch').value='';presenceRender();presenceLoad();document.getElementById('presenceSearch').focus();if(typeof setMobileMenu==='function')setMobileMenu(false);
}
function closePresence(){document.getElementById('presenceOverlay').classList.remove('open');presenceReturnFocus?.focus()}
(function(){
 const style=document.createElement('style');style.textContent='.presence-overlay{display:none;position:fixed;inset:0;z-index:17000;background:#071b3a66;padding:40px 20px;overflow:auto}.presence-overlay.open{display:flex;align-items:flex-start;justify-content:center}.presence-panel{background:#f5f8fc;border-radius:18px;width:min(760px,100%);padding:26px;color:#193456;box-shadow:0 20px 80px #06132933}.presence-head{display:flex;justify-content:space-between;align-items:start;gap:15px}.presence-head h2{margin:0 0 7px}.presence-controls{background:white;border:1px solid #dce6f2;border-radius:12px;padding:16px;display:grid;grid-template-columns:180px 1fr auto;gap:12px;align-items:end;margin:20px 0}.presence-controls label[hidden]{display:none!important}.presence-person{display:flex;align-items:center;gap:13px;background:white;padding:16px;border:1px solid #e1e9f3;border-radius:12px;margin:9px 0}.presence-avatar{width:42px;height:42px;border-radius:12px;background:#e8f1ff;color:#1766c5;display:grid;place-items:center;font-weight:800;flex:none}.presence-person-name{flex:1;min-width:0;overflow-wrap:anywhere}.presence-person-name small{display:block;color:#69809a;margin-top:5px}.presence-person-name b small{display:inline}.presence-person-name p{margin:6px 0 0;font-size:12px;color:#526781}.presence-state{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;white-space:nowrap;color:#6d7b8e}.presence-state i{width:8px;height:8px;border-radius:50%;background:currentColor}.presence-state.online{color:#158253}.presence-state.busy{color:#c34141}.presence-state.away{color:#ac7a0d}#presenceConnection{font-size:12px;line-height:1.6;color:#61758f;margin-top:15px}.presence-search{display:flex;align-items:center;gap:12px}.presence-search input{flex:1}.presence-search small{white-space:nowrap}@media(max-width:600px){.presence-overlay{padding:12px}.presence-panel{padding:18px}.presence-controls{grid-template-columns:1fr}.presence-person{padding:12px;flex-wrap:wrap}.presence-state{margin-left:55px}.presence-search{align-items:stretch;flex-direction:column}}@media print{.presence-overlay,[data-presence-open]{display:none!important}}';document.head.append(style);
 const panel=document.createElement('div');panel.id='presenceOverlay';panel.className='presence-overlay';panel.innerHTML='<section class="presence-panel" role="dialog" aria-modal="true" aria-labelledby="presenceTitle"><header class="presence-head"><div><h2 id="presenceTitle">Ekip Durumu</h2><p class="muted">Aynı şirketteki çalışanların uygulama bağlantı durumu.</p></div><button class="btn light" id="presenceClose" aria-label="Ekip durumunu kapat">Kapat</button></header><div class="presence-controls"><label>Durumum<select id="presenceMode"><option value="online">Çevrimiçi</option><option value="busy">Meşgul</option><option value="away">Uzakta</option></select></label><label id="presenceNoteLabel" hidden>Kısa durum notu<input id="presenceNote" maxlength="80" placeholder="Örn. Müşteri ziyaretindeyim"></label><button class="btn primary" id="presenceSave">Durumu kaydet</button></div><div class="presence-search"><input id="presenceSearch" placeholder="Çalışan veya rol ara" aria-label="Çalışan veya rol ara"><small id="presenceSummary"></small><button class="btn light" id="presenceRefresh">Yenile</button></div><div id="presenceList" aria-live="polite"></div><p id="presenceConnection">Durumlar yaklaşık 30 saniyede bir güncellenir.</p><p class="muted">5 dakika işlem yapılmazsa veya sekme arka plana alınırsa “Uzakta” görünür. Bağlantı kesildiğinde yaklaşık 100 saniye içinde “Çevrimdışı” olur. Bu gösterge mesai kaydı değildir.</p></section>';document.body.append(panel);
 document.getElementById('presenceClose').onclick=closePresence;panel.addEventListener('click',e=>{if(e.target===panel)closePresence()});
 document.getElementById('presenceMode').onchange=e=>{document.getElementById('presenceNoteLabel').hidden=e.target.value!=='busy'};
 document.getElementById('presenceSave').onclick=async function(){if(presenceSending)return;presenceMode=document.getElementById('presenceMode').value;presenceNote=presenceMode==='busy'?document.getElementById('presenceNote').value.trim():'';presenceActivity=Date.now();this.disabled=true;try{await presenceHeartbeat();await presenceLoad()}finally{this.disabled=false}};
 document.getElementById('presenceSearch').oninput=presenceRender;document.getElementById('presenceRefresh').onclick=presenceLoad;
 for(const nav of document.querySelectorAll('.ds-nav,.md-menu')){const b=document.createElement('button');b.type='button';b.className=nav.matches('.ds-nav')?'ds-btn':'';b.dataset.presenceOpen='';b.hidden=true;b.innerHTML='<span class="'+(nav.matches('.ds-nav')?'ds-icon':'mi')+'">'+pnIcon('customers')+'</span><span>Ekip Durumu</span>';b.onclick=openPresence;nav.prepend(b)}
 const roleBase=applyRoleNavigation;applyRoleNavigation=function(){roleBase.apply(this,arguments);presenceStart()};
 const clearBase=clearOperations;clearOperations=function(){if(!currentUser||!currentCompanyId||!currentMembership||presenceIdentity!==opsKey())presenceReset();return clearBase.apply(this,arguments)};
 const logoutBase=logoutUser;logoutUser=async function(){await presenceHeartbeat('offline');presenceReset();return logoutBase.apply(this,arguments)};
 for(const event of ['pointerdown','keydown','touchstart'])document.addEventListener(event,()=>{const wasAway=presenceState()==='away';presenceActivity=Date.now();if(wasAway&&!document.hidden&&presenceMode!=='away')presenceHeartbeat()},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)presenceActivity=Date.now();presenceHeartbeat();if(!document.hidden&&panel.classList.contains('open'))presenceLoad()});
 window.addEventListener('online',()=>{presenceHeartbeat().then(presenceLoad)});
 window.addEventListener('pagehide',()=>{presenceHeartbeat('offline')});window.addEventListener('pageshow',()=>{presenceActivity=Date.now();presenceHeartbeat()});
 document.addEventListener('keydown',e=>{if(!panel.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();closePresence()}if(e.key==='Tab'){const els=[...panel.querySelectorAll('button,input,select')].filter(el=>!el.disabled&&!el.closest('[hidden]'));const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 const topicBase=pgTopics;pgTopics=function(){const topics=topicBase();topics.push({id:'team-presence',title:'Ekip durumu',intro:'Şirketinizdeki herkes Ekip Durumu bölümünden çalışanların bağlantı durumunu görebilir.',steps:['Sol menüden Ekip Durumu’nu açın. Çalışan adı veya rolüyle arama yapabilirsiniz.','Durumum alanından Çevrimiçi, Meşgul veya Uzakta seçip kaydedin. Meşgul durumuna kısa not ekleyebilirsiniz.','Hareketsiz veya arka plandaki sekmeler uzakta; bağlantısı kesilenler yaklaşık 100 saniye sonra çevrimdışı görünür.'],tip:'Durumlar uygulamadaki bağlantıyı gösterir; mesai ve izin kaydı yerine geçmez.',links:[]});return topics};
 if(currentUser&&currentMembership)presenceStart();
})();
